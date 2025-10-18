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

type ViewerRegistryEntry = {
  token: string;
  asset: AssetDetail;
  windowId: number;
};

type AssetUpdateResponse =
  | { success: true; asset: AssetDetail }
  | { success: false; error?: string };

type ClipboardInspectResult = {
  canPaste: boolean;
  hasImage: boolean;
  hasFile: boolean;
  hasUrl: boolean;
};

const assetViewerWindows = new Map<number, ViewerRegistryEntry>();
const assetViewerTokens = new Map<string, ViewerRegistryEntry>();

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
  return `${index + 1}. ${label} ${size}${scale}${primarySuffix}`;
}

async function selectCaptureDisplay(): Promise<Electron.Display | null> {
  const displays = screen.getAllDisplays();
  if (displays.length === 0) {
    return null;
  }
  if (displays.length === 1) {
    return displays[0];
  }

  const buttons = displays.map((display, index) => formatDisplayLabel(display, index));
  const windowForDialog = BrowserWindow.getFocusedWindow() ?? mainWindow ?? undefined;
  const dialogTarget = windowForDialog ?? undefined;
  const { response } = await dialog.showMessageBox(dialogTarget, {
    type: 'question',
    buttons: [...buttons, 'Cancel'],
    defaultId: 0,
    cancelId: buttons.length,
    title: 'Select Display',
    message: 'Which display would you like to capture?',
    detail: 'Choose the screen to capture, then draw the region you want to add to your workspace.',
    normalizeAccessKeys: true,
  });

  if (response === buttons.length) {
    return null;
  }

  return displays[response] ?? null;
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

function getViewerEntryByToken(token: string): ViewerRegistryEntry | undefined {
  return assetViewerTokens.get(token);
}

function removeViewerEntry(entry: ViewerRegistryEntry) {
  assetViewerTokens.delete(entry.token);
  assetViewerWindows.delete(entry.windowId);
}

async function openAssetViewerWindow(payload: { workspace: string; relativePath: string }): Promise<void> {
  try {
    const asset = await workspaceManager.getAssetDetail(payload.workspace, payload.relativePath);
    const viewerWindow = new BrowserWindow({
      width: 1280,
      height: 760,
      minWidth: 900,
      minHeight: 600,
      backgroundColor: '#111111',
      title: `Asset • ${asset.filename}`,
      autoHideMenuBar: true,
      show: false,
      webPreferences: {
        preload: getPreloadPath(),
        contextIsolation: true,
        nodeIntegration: false,
      },
    });

    const entry: ViewerRegistryEntry = {
      token: randomUUID(),
      asset,
      windowId: viewerWindow.webContents.id,
    };

    assetViewerWindows.set(viewerWindow.webContents.id, entry);
    assetViewerTokens.set(entry.token, entry);

    viewerWindow.on('closed', () => {
      removeViewerEntry(entry);
    });

    await viewerWindow.loadFile(getAssetViewerEntry());
    viewerWindow.once('ready-to-show', () => {
      viewerWindow.show();
    });
  } catch (error) {
    console.error('Failed to open asset viewer', error);
  }
}

function registerAssetViewerHandlers() {
  ipcMain.on('asset-viewer:ready', (event) => {
    const entry = assetViewerWindows.get(event.sender.id);
    if (!entry) {
      return;
    }
    event.sender.send('asset-viewer:data', {
      ...entry.asset,
      id: entry.token,
      fileName: entry.asset.filename,
    });
  });

  ipcMain.handle('asset-viewer:copy', async (_event, payload: { id: string }) => {
    const entry = getViewerEntryByToken(payload.id);
    if (!entry) {
      return false;
    }
    try {
      const image = await loadNativeImageForAsset(entry.asset);
      clipboard.writeImage(image);
      return true;
    } catch (error) {
      console.error('Copy to clipboard failed', error);
      return false;
    }
  });

  ipcMain.handle('asset-viewer:save', async (event, payload: { id: string }) => {
    const entry = getViewerEntryByToken(payload.id);
    if (!entry) {
      return false;
    }
    const browserWindow = BrowserWindow.fromWebContents(event.sender) ?? undefined;
    const { canceled, filePath } = await dialog.showSaveDialog(browserWindow, {
      defaultPath: entry.asset.filename,
      filters: [
        { name: `${entry.asset.format.toUpperCase()} Image`, extensions: [entry.asset.format || 'png'] },
        { name: 'All Files', extensions: ['*'] },
      ],
    });
    if (canceled || !filePath) {
      return false;
    }
    await fs.copyFile(entry.asset.absolutePath, filePath);
    return true;
  });

  ipcMain.handle('asset-viewer:convert', async (event, payload: { id: string; format: 'png' | 'jpeg' | 'webp' }) => {
    const entry = getViewerEntryByToken(payload.id);
    if (!entry) {
      return false;
    }
    const targetExt = payload.format === 'jpeg' ? 'jpg' : payload.format;
    const browserWindow = BrowserWindow.fromWebContents(event.sender) ?? undefined;
    const defaultName = `${path.parse(entry.asset.filename).name}.${targetExt}`;
    const { canceled, filePath } = await dialog.showSaveDialog(browserWindow, {
      defaultPath: defaultName,
      filters: [
        { name: `${payload.format.toUpperCase()} Image`, extensions: [targetExt] },
        { name: 'All Files', extensions: ['*'] },
      ],
    });
    if (canceled || !filePath) {
      return false;
    }
    try {
      const image = await loadNativeImageForAsset(entry.asset);
      let buffer: Buffer;
      switch (payload.format) {
        case 'jpeg':
          buffer = image.toJPEG(92);
          break;
        case 'webp':
          buffer = image.toWEBP(92);
          break;
        case 'png':
        default:
          buffer = image.toPNG();
          break;
      }
      await fs.writeFile(filePath, buffer);
      return true;
    } catch (error) {
      console.error('Convert failed', error);
      dialog.showErrorBox('Convert Failed', String(error));
      return false;
    }
  });

  ipcMain.handle(
    'asset-viewer:resize',
    async (
      _event,
      payload: {
        id: string;
        width: number;
        height: number;
        lockAspect?: boolean;
        data?: Uint8Array | ArrayBuffer;
        format?: string;
      },
    ) => {
    const entry = getViewerEntryByToken(payload.id);
    if (!entry) {
      return { success: false } as AssetUpdateResponse;
    }
    try {
      const data = payload.data;
      if (!data) {
        return {
          success: false,
          error: 'No resized image data provided',
        } as AssetUpdateResponse;
      }

      let buffer: Buffer;
      if (data instanceof Uint8Array) {
        buffer = Buffer.from(data);
      } else if (data instanceof ArrayBuffer) {
        buffer = Buffer.from(new Uint8Array(data));
      } else {
        return {
          success: false,
          error: 'Unsupported image payload format',
        } as AssetUpdateResponse;
      }

      await fs.writeFile(entry.asset.absolutePath, buffer);

      const updatedAsset = await workspaceManager.getAssetDetail(
        entry.asset.workspace,
        entry.asset.relativePath,
      );
      entry.asset = updatedAsset;

      const updateEvent = {
        workspace: updatedAsset.workspace,
        relativePath: updatedAsset.relativePath,
        updatedAt: updatedAsset.updatedAt,
        sizeBytes: updatedAsset.sizeBytes,
        version: Date.now(),
      };
      BrowserWindow.getAllWindows().forEach((window) => {
        if (!window.isDestroyed()) {
          window.webContents.send('workspace:asset-updated', updateEvent);
        }
      });

      return {
        success: true,
        asset: updatedAsset,
      } as AssetUpdateResponse;
    } catch (error) {
      console.error('Resize failed', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : String(error),
      } as AssetUpdateResponse;
    }
  },
  );

  ipcMain.handle(
    'asset-viewer:crop',
    async (
      _event,
      payload: { id: string; x: number; y: number; width: number; height: number },
    ) => {
      const entry = getViewerEntryByToken(payload.id);
      if (!entry) {
        return { success: false };
      }
      try {
        const image = await loadNativeImageForAsset(entry.asset);
        const bounds = image.getSize();
        const x = Math.max(0, Math.floor(payload.x));
        const y = Math.max(0, Math.floor(payload.y));
        const width = Math.max(1, Math.floor(payload.width));
        const height = Math.max(1, Math.floor(payload.height));
        const cropWidth = Math.min(width, Math.max(1, bounds.width - x));
        const cropHeight = Math.min(height, Math.max(1, bounds.height - y));
        const cropped = image.crop({
          x,
          y,
          width: cropWidth,
          height: cropHeight,
        });
        if (cropped.isEmpty()) {
          throw new Error('Resulting crop is empty');
        }

        const defaultExt = path.extname(entry.asset.filename).replace('.', '') || 'png';
        let buffer: Buffer;
        switch (defaultExt.toLowerCase()) {
          case 'jpg':
          case 'jpeg':
            buffer = cropped.toJPEG(92);
            break;
          case 'webp':
            buffer = cropped.toWEBP(92);
            break;
          default:
            buffer = cropped.toPNG();
            break;
        }

        await fs.writeFile(entry.asset.absolutePath, buffer);

        const updatedAsset = await workspaceManager.getAssetDetail(
          entry.asset.workspace,
          entry.asset.relativePath,
        );
        entry.asset = updatedAsset;

        const updateEvent = {
          workspace: updatedAsset.workspace,
          relativePath: updatedAsset.relativePath,
          updatedAt: updatedAsset.updatedAt,
          sizeBytes: updatedAsset.sizeBytes,
          version: Date.now(),
        };
        BrowserWindow.getAllWindows().forEach((window) => {
          if (!window.isDestroyed()) {
            window.webContents.send('workspace:asset-updated', updateEvent);
          }
        });

        return {
          success: true,
          asset: updatedAsset,
        };
      } catch (error) {
        console.error('Crop failed', error);
        dialog.showErrorBox('Crop Failed', String(error));
        return {
          success: false,
          error: error instanceof Error ? error.message : String(error),
        };
      }
    },
  );
}

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
): Promise<WorkspaceAssetDescriptor | null> {
  const instance = await ensureScreenshotsInstance();
  if (captureInFlight) {
    throw new Error('Screenshot capture already in progress');
  }
  captureInFlight = true;

  const targetDisplay = await selectCaptureDisplay();
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

  if (isDev) {
    mainWindow.webContents.openDevTools({ mode: 'detach' });
  }
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
  ipcMain.handle(
    'workspace:capture-screenshot',
    (_event, workspace: string) => captureScreenshot(workspace),
  );
  ipcMain.handle(
    'workspace:read-asset',
    (_event, workspace: string, relativePath: string) =>
      workspaceManager.readAssetDataUrl(workspace, relativePath),
  );
  ipcMain.handle(
    'workspace:open-asset-viewer',
    (_event, payload: { workspace: string; relativePath: string }) =>
      openAssetViewerWindow(payload),
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
  registerAssetViewerHandlers();
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
