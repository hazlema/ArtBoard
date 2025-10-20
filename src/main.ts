import {
  app,
  BrowserWindow,
  ipcMain,
  protocol,
  dialog,
  screen,
  clipboard,
  nativeImage,
  Menu,
  shell,
} from 'electron';
import { Buffer } from 'node:buffer';
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { randomUUID } from 'node:crypto';

import {
  WorkspaceManager,
  type WorkspaceAssetDescriptor,
  type AssetDetail,
  type AssetIngestRequest,
} from './workspace/manager.js';

const isDev = process.env.NODE_ENV !== 'production';

const workspaceManager = new WorkspaceManager();

let mainWindow: BrowserWindow | null = null;
type ScreenshotsInstance = {
  startCapture: () => Promise<void>;
  once: (
    event: 'ok' | 'save' | 'cancel',
    listener: (...args: unknown[]) => void,
  ) => ScreenshotsInstance;
  removeListener: (
    event: 'ok' | 'save' | 'cancel',
    listener: (...args: unknown[]) => void,
  ) => ScreenshotsInstance;
};

let screenshotsInstance: ScreenshotsInstance | null = null;
let screenshotsInitPromise: Promise<ScreenshotsInstance> | null = null;
let captureInFlight = false;
let protocolRegistered = false;

type ClipboardInspectResult = {
  canPaste: boolean;
  hasImage: boolean;
  hasFile: boolean;
  hasUrl: boolean;
};

const APP_STATE_FILE = 'app-state.json';

type AppState = {
  windowBounds?: {
    width: number;
    height: number;
  };
};

let appState: AppState = {};
let appStateLoaded = false;
let appStateSaveTimer: ReturnType<typeof setTimeout> | null = null;

const getAppStatePath = () => path.join(app.getPath('userData'), APP_STATE_FILE);

async function ensureAppStateLoaded(): Promise<void> {
  if (appStateLoaded) {
    return;
  }
  appStateLoaded = true;
  try {
    const raw = await fs.readFile(getAppStatePath(), 'utf8');
    const parsed = JSON.parse(raw) as AppState;
    if (parsed && typeof parsed === 'object') {
      appState = { ...appState, ...parsed };
    }
  } catch (error) {
    if ((error as NodeJS.ErrnoException)?.code !== 'ENOENT') {
      console.warn('Failed to load persisted app state', error);
    }
  }
}

async function persistAppState(): Promise<void> {
  try {
    const targetPath = getAppStatePath();
    await fs.mkdir(path.dirname(targetPath), { recursive: true });
    await fs.writeFile(targetPath, JSON.stringify(appState, null, 2), 'utf8');
  } catch (error) {
    console.warn('Failed to save app state', error);
  }
}

function scheduleSaveAppState(): void {
  if (appStateSaveTimer) {
    clearTimeout(appStateSaveTimer);
  }
  appStateSaveTimer = setTimeout(() => {
    appStateSaveTimer = null;
    void persistAppState();
  }, 500);
}

function captureWindowBounds(window: BrowserWindow): void {
  const [rawWidth, rawHeight] = window.getSize();
  const width = Math.max(Math.floor(rawWidth), 600);
  const height = Math.max(Math.floor(rawHeight), 480);
  appState.windowBounds = { width, height };
  scheduleSaveAppState();
}

function formatDisplayLabel(display: Electron.Display, index: number): string {
  const size = `${display.size.width}x${display.size.height}`;
  const scale = display.scaleFactor ? ` @${display.scaleFactor}x` : '';
  const primarySuffix = display.id === screen.getPrimaryDisplay().id ? ' (Primary)' : '';
  const label = display.label || `Display ${index + 1}`;
  return `${label} ${size}${scale}${primarySuffix}`;
}

function getDisplayList(): Array<{ id: number; label: string }> {
  const displays = screen.getAllDisplays();
  return displays.map((display, index) => ({
    id: display.id,
    label: formatDisplayLabel(display, index),
  }));
}

function getDisplayById(id: number): Electron.Display | null {
  return screen.getAllDisplays().find(d => d.id === id) ?? null;
}

async function loadNativeImageForAsset(asset: AssetDetail): Promise<Electron.NativeImage> {
  let image = nativeImage.createFromPath(asset.absolutePath);
  if (!image.isEmpty()) {
    return image;
  }
  const buffer = await fs.readFile(asset.absolutePath);
  image = nativeImage.createFromBuffer(buffer);
  if (image.isEmpty()) {
    throw new Error(`Unable to decode image at ${asset.absolutePath}`);
  }
  return image;
}

// Asset viewer window functionality removed - now uses modal

// Register custom protocol before app ready
if (protocol && protocol.registerSchemesAsPrivileged) {
  protocol.registerSchemesAsPrivileged([
    {
      scheme: 'artboard',
      privileges: {
        secure: true,
        standard: true,
        bypassCSP: true,
        corsEnabled: true,
        supportFetchAPI: true,
        stream: true,
      },
    },
  ]);
}

const resolveDistPath = (...segments: string[]) => {
  const appPath = app.getAppPath();
  const baseDir = path.join(appPath, 'dist');
  return path.join(baseDir, ...segments);
};

const getRendererEntry = () => resolveDistPath('renderer', 'index.html');
const getAssetViewerEntry = () => resolveDistPath('renderer', 'asset-viewer.html');

const getPreloadPath = () => resolveDistPath('preload.cjs');

function registerWorkspaceProtocol() {
  if (protocolRegistered) return;
  protocol.registerFileProtocol('artboard', (request, callback) => {
    void (async () => {
      try {
        const url = new URL(request.url);
        const workspace = decodeURIComponent(url.hostname);
        const segments = url.pathname
          .split('/')
          .filter(Boolean)
          .map((segment) => decodeURIComponent(segment));
        const pathname = segments.join(path.sep);
        const filePath = await workspaceManager.resolveAssetPath(
          workspace,
          pathname,
        );
        console.debug('artboard:// resolved', request.url, '->', filePath);
        callback(filePath);
      } catch (error) {
        console.error('Failed to resolve artboard asset', request.url, error);
        callback({ error: -6 });
      }
    })();
  });
  protocolRegistered = true;
}

async function ensureScreenshotsInstance(): Promise<ScreenshotsInstance> {
  if (screenshotsInstance) {
    return screenshotsInstance;
  }
  if (!screenshotsInitPromise) {
    screenshotsInitPromise = import('electron-screenshots').then((mod) => {
      const ScreenshotsCtor = (
        mod as {
          default?: new (options?: Record<string, unknown>) => ScreenshotsInstance;
        }
      ).default;
      if (!ScreenshotsCtor) {
        throw new Error(
          'electron-screenshots module missing default export',
        );
      }
      const instance = new ScreenshotsCtor();
      screenshotsInstance = instance;
      return instance;
    });
  }
  return screenshotsInitPromise;
}

async function captureScreenshot(
  workspace: string,
  displayId?: number,
): Promise<WorkspaceAssetDescriptor | null> {
  const instance = await ensureScreenshotsInstance();
  if (captureInFlight) {
    throw new Error('Screenshot capture already in progress');
  }
  captureInFlight = true;

  let targetDisplay: Electron.Display | null = null;

  if (displayId !== undefined) {
    targetDisplay = getDisplayById(displayId);
  } else {
    const displays = screen.getAllDisplays();
    if (displays.length > 0) {
      targetDisplay = displays[0];
    }
  }

  if (!targetDisplay) {
    captureInFlight = false;
    return null;
  }

  const originalGetCursorScreenPoint = screen.getCursorScreenPoint;
  screen.getCursorScreenPoint = () => {
    const bounds = targetDisplay.bounds;
    return {
      x: Math.floor(bounds.x + bounds.width / 2),
      y: Math.floor(bounds.y + bounds.height / 2),
    };
  };

  const windowRef = mainWindow && !mainWindow.isDestroyed() ? mainWindow : null;
  const windowState = windowRef
    ? {
        wasVisible: windowRef.isVisible(),
        wasFocused: windowRef.isFocused(),
        previousOpacity:
          typeof windowRef.getOpacity === 'function' ? windowRef.getOpacity() : 1,
        ignoredMouseEvents: false,
      }
    : null;

  if (windowRef && windowState?.wasVisible) {
    windowRef.blur();
    if (typeof windowRef.setIgnoreMouseEvents === 'function') {
      windowRef.setIgnoreMouseEvents(true);
      windowState.ignoredMouseEvents = true;
    }
    if (typeof windowRef.setOpacity === 'function') {
      windowRef.setOpacity(0);
    } else {
      windowRef.hide();
    }
  }

  const restoreWindow = () => {
    if (!windowRef || windowRef.isDestroyed() || !windowState) {
      return;
    }
    if (windowState.ignoredMouseEvents && typeof windowRef.setIgnoreMouseEvents === 'function') {
      windowRef.setIgnoreMouseEvents(false);
    }
    if (typeof windowRef.setOpacity === 'function') {
      windowRef.setOpacity(windowState.previousOpacity ?? 1);
    }
    if (windowState.wasVisible) {
      windowRef.show();
      if (windowState.wasFocused) {
        windowRef.focus();
      }
    }
  };

  try {
    return await new Promise((resolve, reject) => {
      const cleanup = () => {
        captureInFlight = false;
        restoreWindow();
        instance.removeListener('ok', handleOk);
        instance.removeListener('save', handleSave);
        instance.removeListener('cancel', handleCancel);
      };

      const handleBuffer = async (buffer: unknown) => {
        try {
          const nodeBuffer = Buffer.isBuffer(buffer)
            ? buffer
            : buffer instanceof Uint8Array
              ? Buffer.from(buffer)
              : Buffer.from(buffer as ArrayBuffer);
          const asset = await workspaceManager.saveImageBuffer(
            workspace,
            nodeBuffer,
          );
          resolve(asset);
        } catch (error) {
          reject(error);
        } finally {
          cleanup();
        }
      };

      const handleOk = (_event: unknown, buffer: unknown) => {
        void handleBuffer(buffer);
      };

    const handleSave = (event: { preventDefault?: () => void }, buffer: unknown) => {
      event?.preventDefault?.();
      void handleBuffer(buffer);
    };

    const handleCancel = () => {
      cleanup();
      resolve(null);
    };

    instance.once('ok', handleOk);
    instance.once('save', handleSave);
    instance.once('cancel', handleCancel);

      instance
        .startCapture()
        .catch((error) => {
          cleanup();
          reject(error);
        });
    });
  } finally {
    screen.getCursorScreenPoint = originalGetCursorScreenPoint;
  }
}
async function createWindow() {
  await ensureAppStateLoaded();
  await workspaceManager.ensureRoot();

  const defaultWidth = 1280;
  const defaultHeight = 800;
  const storedBounds = appState.windowBounds;
  const width =
    storedBounds && typeof storedBounds.width === 'number' && Number.isFinite(storedBounds.width)
      ? Math.max(Math.floor(storedBounds.width), 600)
      : defaultWidth;
  const height =
    storedBounds && typeof storedBounds.height === 'number' && Number.isFinite(storedBounds.height)
      ? Math.max(Math.floor(storedBounds.height), 480)
      : defaultHeight;

  mainWindow = new BrowserWindow({
    width,
    height,
    backgroundColor: '#333333',
    title: 'Artboard',
    autoHideMenuBar: true,
    icon: path.join(app.getAppPath(), 'assets', 'icons', 'icons', 'png', '256x256.png'),
    webPreferences: {
      preload: getPreloadPath(),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });
  mainWindow.setMenuBarVisibility(false);

  Menu.setApplicationMenu(null);

  await mainWindow.loadFile(getRendererEntry());

  const handleResize = () => {
    if (mainWindow) {
      captureWindowBounds(mainWindow);
    }
  };

  mainWindow.on('resize', handleResize);
  mainWindow.on('close', () => {
    if (mainWindow) {
      captureWindowBounds(mainWindow);
    }
  });

  captureWindowBounds(mainWindow);

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  // Register Ctrl+D / Cmd+D to toggle DevTools
  mainWindow.webContents.on('before-input-event', (event, input) => {
    if ((input.control || input.meta) && input.key.toLowerCase() === 'd') {
      event.preventDefault();
      if (mainWindow?.webContents.isDevToolsOpened()) {
        mainWindow.webContents.closeDevTools();
      } else {
        mainWindow?.webContents.openDevTools({ mode: 'detach' });
      }
    }
  });
}

function registerIpcHandlers() {
  ipcMain.handle('workspace:list', () => workspaceManager.listWorkspaces());
  ipcMain.handle('workspace:create', (_event, name: string) =>
    workspaceManager.createWorkspace(name),
  );
  ipcMain.handle('workspace:get-state', (_event, workspace: string) =>
    workspaceManager.loadWorkspace(workspace),
  );
  ipcMain.handle(
    'workspace:save-state',
    (_event, workspace: string, payload: unknown) =>
      workspaceManager.saveWorkspace(workspace, payload),
  );
  ipcMain.handle(
    'workspace:ingest-assets',
    (_event, workspace: string, payload: unknown) =>
      workspaceManager.ingestAssets(
        workspace,
        (payload ?? {}) as AssetIngestRequest,
      ),
  );
  ipcMain.handle(
    'workspace:rename',
    (_event, current: string, nextName: string) =>
      workspaceManager.renameWorkspace(current, nextName),
  );
  ipcMain.handle('workspace:delete', async (_event, workspace: string) => {
    await workspaceManager.deleteWorkspace(workspace);
    return true;
  });
  ipcMain.handle('workspace:get-displays', () => getDisplayList());
  ipcMain.handle(
    'workspace:capture-screenshot',
    (_event, workspace: string, displayId?: number) => captureScreenshot(workspace, displayId),
  );
  ipcMain.handle(
    'workspace:read-asset',
    (_event, workspace: string, relativePath: string) =>
      workspaceManager.readAssetDataUrl(workspace, relativePath),
  );
   ipcMain.handle(
     'workspace:get-asset-detail',
     (_event, workspace: string, relativePath: string) =>
       workspaceManager.getAssetDetail(workspace, relativePath),
   );
   ipcMain.handle(
     'workspace:asset-exists',
     async (_event, workspace: string, relativePath: string) => {
       try {
         const assetPath = await workspaceManager.resolveAssetPath(workspace, relativePath);
         await fs.access(assetPath);
         return true;
       } catch {
         return false;
       }
     },
   );

  ipcMain.handle(
    'workspace:update-asset',
    async (_event, workspace: string, relativePath: string, buffer: Uint8Array) => {
      try {
        // Get the existing asset path
        const assetPath = await workspaceManager.resolveAssetPath(workspace, relativePath);

        // Overwrite the existing file with the new buffer
        await fs.writeFile(assetPath, Buffer.from(buffer));

        // Get updated asset details
        const updatedAsset = await workspaceManager.getAssetDetail(workspace, relativePath);

        // Notify the renderer that the asset has been updated
        if (mainWindow && !mainWindow.isDestroyed()) {
          mainWindow.webContents.send('workspace:asset-updated', {
            workspace,
            relativePath,
          });
        }

        return updatedAsset;
      } catch (error) {
        console.error('Failed to update asset', error);
        throw error;
      }
    },
  );

  ipcMain.handle('app:open-external', (_event, url: string) => {
    if (typeof url === 'string' && url.trim()) {
      void shell.openExternal(url);
      return true;
    }
    return false;
  });
  ipcMain.handle('clipboard:inspect', () => inspectClipboardForPaste());
  ipcMain.handle('clipboard:read-assets', () => readClipboardAssets());
}

function inspectClipboardForPaste(): ClipboardInspectResult {
  try {
    const image = clipboard.readImage();
    const hasImage = !image.isEmpty();
    const formats = clipboard.availableFormats();
    const hasFileFormat = formats.some((format) => {
      const normalized = format.toLowerCase();
      return (
        normalized === 'public.file-url' ||
        normalized === 'text/uri-list' ||
        normalized === 'files' ||
        normalized === 'file://'
      );
    });
    const text = clipboard.readText().trim();
    const hasUrl = isHttpUrl(text) || text.startsWith('data:image');
    const fileUrl = clipboard.read('public.file-url')?.trim();
    const fileBuffer = clipboard.readBuffer('CF_HDROP');
    const hasFile = Boolean(fileUrl) || hasFileFormat || (fileBuffer && fileBuffer.length > 0);
    const canPaste = hasImage || hasFile || hasUrl;
    return { canPaste, hasImage, hasFile, hasUrl };
  } catch (error) {
    console.warn('Clipboard inspection failed', error);
    return { canPaste: false, hasImage: false, hasFile: false, hasUrl: false };
  }
}

function readClipboardAssets(): AssetIngestRequest {
  const result: AssetIngestRequest = {
    files: [],
    urls: [],
    inlineFiles: [],
  };

  try {
    const image = clipboard.readImage();
    if (!image.isEmpty()) {
      const buffer = image.toPNG();
      result.inlineFiles?.push({
        name: `pasted-image-${Date.now()}.png`,
        mimeType: 'image/png',
        data: Uint8Array.from(buffer),
      });
    }

    const fileUrl = clipboard.read('public.file-url')?.trim();
    if (fileUrl) {
      result.files?.push(fileUrl);
    }

    const uriList = clipboard.read('text/uri-list');
    if (uriList) {
      uriList
        .split(/\r?\n/)
        .map((value) => value.trim())
        .filter(Boolean)
        .forEach((value) => {
          if (value.startsWith('file://')) {
            result.files?.push(value);
          } else if (isHttpUrl(value)) {
            result.urls?.push(value);
          }
        });
    }

    const text = clipboard.readText().trim();
    if (text) {
      const dataUrl = parseClipboardDataUrl(text);
      if (dataUrl) {
        result.inlineFiles?.push({
          name: `clipboard-image-${Date.now()}${dataUrl.extension}`,
          mimeType: dataUrl.mimeType,
          data: Uint8Array.from(dataUrl.buffer),
        });
      } else if (isHttpUrl(text)) {
        result.urls?.push(text);
      }
    }
  } catch (error) {
    console.warn('Failed to read clipboard assets', error);
  }

  if (result.files) {
    result.files = Array.from(new Set(result.files));
  }
  if (result.urls) {
    result.urls = Array.from(new Set(result.urls));
  }
  if (result.inlineFiles) {
    result.inlineFiles = result.inlineFiles.filter((entry) => {
      const data = entry?.data as Uint8Array | undefined;
      return Boolean(data && data.length > 0);
    });
  }

  return result;
}

function parseClipboardDataUrl(value: string):
  | { mimeType: string; buffer: Buffer; extension: string }
  | null {
  const trimmed = value.trim();
  const match = /^data:([^;]+);base64,(.+)$/i.exec(trimmed);
  if (!match) {
    return null;
  }
  const mimeType = match[1];
  try {
    const buffer = Buffer.from(match[2], 'base64');
    if (buffer.length === 0) {
      return null;
    }
    const extension = extensionFromMime(mimeType);
    return { mimeType, buffer, extension };
  } catch {
    return null;
  }
}

function extensionFromMime(mimeType: string): string {
  const normalized = mimeType.toLowerCase();
  if (normalized.includes('png')) return '.png';
  if (normalized.includes('jpeg') || normalized.includes('jpg')) return '.jpg';
  if (normalized.includes('webp')) return '.webp';
  if (normalized.includes('gif')) return '.gif';
  if (normalized.includes('svg')) return '.svg';
  return '.png';
}

function isHttpUrl(value: string): boolean {
  if (!value) {
    return false;
  }
  try {
    const parsed = new URL(value.trim());
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
}

app.whenReady().then(async () => {
  registerWorkspaceProtocol();
  registerIpcHandlers();

  await createWindow();

  app.on('activate', async () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      await createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (appStateSaveTimer) {
    clearTimeout(appStateSaveTimer);
    appStateSaveTimer = null;
  }
  void persistAppState();
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
