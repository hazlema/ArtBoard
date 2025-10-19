import {
  ActiveSelection,
  Canvas,
  Image,
  Point,
  type FabricObject,
  type TPointerEvent,
  type TPointerEventInfo,
} from 'fabric';

// APP_VERSION is injected at build time via --define flag in package.json
declare const APP_VERSION: string;

type FabricImage = InstanceType<typeof Image>;

type FabricCanvas = InstanceType<typeof Canvas>;
type CanvasState = ReturnType<FabricCanvas['toJSON']> & { updatedAt?: string };
type AssetDescriptor = {
  workspace: string;
  filename: string;
  relativePath: string;
  fileUrl: string;
  path: string;
  absolutePath: string;
};
type InlineAssetPayload = {
  name?: string;
  mimeType?: string;
  data: Uint8Array;
};
type AssetIngestRequest = {
  files?: string[];
  urls?: string[];
  inlineFiles?: InlineAssetPayload[];
};
type AssetIngestFailure = {
  source: string;
  reason: 'auth' | 'network' | 'unsupported' | 'unknown';
  message?: string;
};
type AssetIngestResult = {
  assets: AssetDescriptor[];
  failures: AssetIngestFailure[];
};
type ClipboardInspectResult = {
  canPaste: boolean;
  hasImage: boolean;
  hasFile: boolean;
  hasUrl: boolean;
};
type AssetUpdateEvent = {
  workspace: string;
  relativePath: string;
  updatedAt?: string | null;
  sizeBytes?: number;
  version?: number;
};

declare global {
  interface Window {
    workspaceAPI: {
      list: () => Promise<string[]>;
      create: (name: string) => Promise<string>;
      load: (workspace: string) => Promise<CanvasState | null>;
      save: (workspace: string, state: CanvasState) => Promise<void>;
      rename: (current: string, nextName: string) => Promise<string>;
      remove: (workspace: string) => Promise<boolean>;
      ingest: (
        workspace: string,
        payload: AssetIngestRequest,
      ) => Promise<AssetIngestResult>;
      capture: (workspace: string) => Promise<AssetDescriptor | null>;
      readAsset: (workspace: string, relativePath: string) => Promise<string>;
      openAssetViewer: (payload: { workspace: string; relativePath: string }) => Promise<void>;
    };
    electronAPI: {
      on: (
        channel: string,
        listener: (...args: unknown[]) => void,
      ) => () => void;
      openExternal?: (url: string) => Promise<boolean> | boolean | void;
      inspectClipboard?: () => Promise<ClipboardInspectResult>;
      readClipboardAssets?: () => Promise<AssetIngestRequest | null | undefined>;
    };
  }
}

const isElectronEnvironment = Boolean(
  (window as Window & { process?: { versions?: { electron?: string } } }).process?.versions?.electron,
);

const browserWindow = window as Window & {
  workspaceAPI?: Window['workspaceAPI'];
  electronAPI?: Window['electronAPI'];
};

const appNameElement = document.querySelector<HTMLSpanElement>('#app-name')!;
const workspaceMenuToggle =
  document.querySelector<HTMLButtonElement>('#workspace-menu-toggle')!;
const workspaceDropdown =
  workspaceMenuToggle.closest<HTMLElement>('[data-footer-dropdown]')!;
const workspaceCreatePanelButton = document.querySelector<HTMLButtonElement>(
  '#workspace-create-panel',
)!;
const workspaceList = document.querySelector<HTMLUListElement>('#workspace-list')!;
const activeWorkspaceLabel =
  document.querySelector<HTMLSpanElement>('#active-workspace-label')!;
const openSettingsFromPanelButton = document.querySelector<HTMLButtonElement>(
  '#open-settings-from-panel',
)!;
const pageMenuToggle =
  document.querySelector<HTMLButtonElement>('#page-menu-toggle')!;
const pageDropdown =
  pageMenuToggle.closest<HTMLElement>('[data-footer-dropdown]')!;
const pageList = document.querySelector<HTMLUListElement>('#page-list')!;
const pageCreateButton =
  document.querySelector<HTMLButtonElement>('#page-create')!;
const pageIndicator = document.querySelector<HTMLSpanElement>('#page-indicator')!;
const pageNavBack =
  document.querySelector<HTMLButtonElement>('#page-nav-back')!;
const pageNavForward =
  document.querySelector<HTMLButtonElement>('#page-nav-forward')!;
const zoomMenuToggle =
  document.querySelector<HTMLButtonElement>('#zoom-menu-toggle')!;
const zoomDropdown =
  zoomMenuToggle.closest<HTMLElement>('[data-footer-dropdown]')!;
const zoomMenu = document.querySelector<HTMLDivElement>('#zoom-menu')!;
const zoomIndicator = document.querySelector<HTMLSpanElement>('#zoom-indicator')!;
const settingsWorkspaceList = document.querySelector<HTMLUListElement>(
  '#settings-workspace-list',
)!;
const settingsWorkspaceCreateButton = document.querySelector<HTMLButtonElement>(
  '#settings-workspace-create',
)!;
const settingsPageList = document.querySelector<HTMLUListElement>(
  '#settings-page-list',
)!;
const settingsPageCreateButton = document.querySelector<HTMLButtonElement>(
  '#settings-page-create',
)!;
const captureButton =
  document.querySelector<HTMLButtonElement>('#capture-screenshot')!;
const captureFeedback =
  document.querySelector<HTMLSpanElement>('#capture-feedback')!;
const openSettingsButton =
  document.querySelector<HTMLButtonElement>('#open-settings')!;
const settingsModal =
  document.querySelector<HTMLDialogElement>('#settings-modal')!;
const settingsClose =
  document.querySelector<HTMLButtonElement>('#settings-close')!;
const openReferenceButton =
  document.querySelector<HTMLButtonElement>('#open-reference')!;
const referenceModal =
  document.querySelector<HTMLDialogElement>('#reference-modal')!;
const referenceClose =
  document.querySelector<HTMLButtonElement>('#reference-close')!;
const tabButtons = Array.from(
  document.querySelectorAll<HTMLButtonElement>('.tab-btn'),
);
const panels = Array.from(
  document.querySelectorAll<HTMLElement>('.settings-panel'),
);
const settingsCloseX =
  document.querySelector<HTMLButtonElement>('#settings-close-x')!;
const contextMenu =
  document.querySelector<HTMLDivElement>('#canvas-context-menu')!;
const contextMenuPasteButton = contextMenu.querySelector<HTMLButtonElement>(
  'button[data-action="paste"]',
)!;
const contextMenuNavigateButton = contextMenu.querySelector<HTMLButtonElement>(
  'button[data-action="navigate"]',
)!;
const contextMenuMoveButton = contextMenu.querySelector<HTMLButtonElement>(
  'button[data-action="move"]',
)!;
const contextMenuBringFrontButton = contextMenu.querySelector<HTMLButtonElement>(
  'button[data-action="front"]',
)!;
const contextMenuSendBackButton = contextMenu.querySelector<HTMLButtonElement>(
  'button[data-action="back"]',
)!;
const contextMenuDeleteButton = contextMenu.querySelector<HTMLButtonElement>(
  'button[data-action="delete"]',
)!;
const contextSubmenu =
  document.querySelector<HTMLDivElement>('#canvas-context-submenu')!;
const contextMenuSelectionItems = Array.from(
  contextMenu.querySelectorAll<HTMLElement>('[data-visibility="selection"]'),
);
const contextMenuEmptyItems = Array.from(
  contextMenu.querySelectorAll<HTMLElement>('[data-visibility="empty"]'),
);
const contextSubmenuTitle = document.querySelector<HTMLSpanElement>(
  '#context-menu-submenu-title',
)!;
const contextSubmenuList =
  document.querySelector<HTMLUListElement>('#context-menu-page-list')!;
const contextSubmenuEmpty = document.querySelector<HTMLParagraphElement>(
  '#context-menu-submenu-empty',
)!;
const dropProgress =
  document.querySelector<HTMLDivElement>('#drop-progress')!;
const dropProgressTitle =
  document.querySelector<HTMLParagraphElement>('#drop-progress-title')!;
const dropProgressSubtitle =
  document.querySelector<HTMLParagraphElement>('#drop-progress-subtitle')!;
const workspaceCreateModal =
  document.querySelector<HTMLDialogElement>('#workspace-create-modal')!;
const workspaceCreateForm =
  document.querySelector<HTMLFormElement>('#workspace-create-form')!;
const workspaceCreateInput =
  document.querySelector<HTMLInputElement>('#workspace-create-input')!;
const workspaceCreateSubmit =
  document.querySelector<HTMLButtonElement>('#workspace-create-submit')!;
const workspaceCreateCancel =
  document.querySelector<HTMLButtonElement>('#workspace-create-cancel')!;
const workspaceCreateError =
  document.querySelector<HTMLParagraphElement>('#workspace-create-error')!;
const pageCreateModal =
  document.querySelector<HTMLDialogElement>('#page-create-modal')!;
const pageCreateForm =
  document.querySelector<HTMLFormElement>('#page-create-form')!;
const pageCreateInput =
  document.querySelector<HTMLInputElement>('#page-create-input')!;
const pageCreateSubmit =
  document.querySelector<HTMLButtonElement>('#page-create-submit')!;
const pageCreateCancel =
  document.querySelector<HTMLButtonElement>('#page-create-cancel')!;
const pageCreateError =
  document.querySelector<HTMLParagraphElement>('#page-create-error')!;
const displaySelectModal =
  document.querySelector<HTMLDialogElement>('#display-select-modal')!;
const displaySelectForm =
  document.querySelector<HTMLFormElement>('#display-select-form')!;
const displaySelectList =
  document.querySelector<HTMLUListElement>('#display-select-list')!;
const displaySelectCancel =
  document.querySelector<HTMLButtonElement>('#display-select-cancel')!;
const renameModal =
  document.querySelector<HTMLDialogElement>('#rename-modal')!;
const renameForm =
  document.querySelector<HTMLFormElement>('#rename-form')!;
const renameTitle =
  document.querySelector<HTMLHeadingElement>('#rename-title')!;
const renameInput =
  document.querySelector<HTMLInputElement>('#rename-input')!;
const renameSubmit =
  document.querySelector<HTMLButtonElement>('#rename-submit')!;
const renameCancel =
  document.querySelector<HTMLButtonElement>('#rename-cancel')!;
const renameError =
  document.querySelector<HTMLParagraphElement>('#rename-error')!;
const confirmModal =
  document.querySelector<HTMLDialogElement>('#confirm-modal')!;
const confirmForm =
  document.querySelector<HTMLFormElement>('#confirm-form')!;
const confirmTitle =
  document.querySelector<HTMLHeadingElement>('#confirm-title')!;
const confirmMessage =
  document.querySelector<HTMLParagraphElement>('#confirm-message')!;
const confirmSubmit =
  document.querySelector<HTMLButtonElement>('#confirm-submit')!;
const confirmCancel =
  document.querySelector<HTMLButtonElement>('#confirm-cancel')!;

const canvasElement =
  document.querySelector<HTMLCanvasElement>('#artboard')!;
const fabricCanvas = new Canvas(canvasElement, {
  backgroundColor: '#1f1f1f',
  selection: true,
  preserveObjectStacking: true,
});

const originalToObject = Image.prototype.toObject;
Image.prototype.toObject = function toObjectWithMeta(
  propertiesToInclude?: string[],
) {
  const base = propertiesToInclude ? [...propertiesToInclude] : [];
  if (!base.includes('artboardMeta')) {
    base.push('artboardMeta');
  }
  const serialized = originalToObject.call(
    this,
    base,
  ) as ReturnType<typeof originalToObject> & {
    artboardMeta?: { workspace: string; relativePath: string };
    src?: string;
  };
  const meta = this.get('artboardMeta') as
    | { workspace: string; relativePath: string }
    | undefined;
  if (meta) {
    serialized.artboardMeta = meta;
    const encodedPath = meta.relativePath
      .split('/')
      .map((segment) => encodeURIComponent(segment))
      .join('/');
    serialized.src = `artboard://${encodeURIComponent(meta.workspace)}/${encodedPath}`;
    if (meta.absolutePath) {
      serialized.artboardMeta.absolutePath = meta.absolutePath;
    }
  } else {
    delete serialized.src;
  }
  return serialized;
};

const originalFromObject = Image.fromObject.bind(Image);
Image.fromObject = function fromObjectWithMeta(object: Record<string, unknown>, options?: unknown) {
  const meta = object.artboardMeta as
    | { workspace: string; relativePath: string }
    | undefined;

  const applyMeta = (img: FabricImage | null) => {
    if (img && meta) {
      img.set('artboardMeta', meta);
    }
    return img;
  };

  if (meta?.workspace && meta?.relativePath) {
    return window.workspaceAPI
      .readAsset(meta.workspace, meta.relativePath)
      .then((dataUrl) => {
        console.debug('Hydrating asset', {
          workspace: meta.workspace,
          relativePath: meta.relativePath,
          preview: dataUrl.slice(0, 64),
          absolutePath: meta.absolutePath,
        });
        const extendedObject = {
          ...object,
          src: dataUrl,
        };
        return originalFromObject(extendedObject, options);
      })
      .then(applyMeta)
      .catch((error) => {
        console.error('Failed to hydrate image asset', meta, error);
        return null;
      });
  }

  const result = originalFromObject(object, options);
  if (result && typeof (result as Promise<FabricImage | null>).then === 'function') {
    return (result as Promise<FabricImage | null>).then(applyMeta);
  }

  return Promise.resolve(applyMeta(result as FabricImage | null));
};

let activeWorkspace: string | null = null;
let pendingSave: number | null = null;
let suppressSaves = false;
let currentWorkspaces: string[] = [];
let contextMenuVisible = false;
let contextSubmenuVisible = false;
let contextSubmenuMode: 'move' | 'navigate' | null = null;
let contextSubmenuActivator: HTMLButtonElement | null = null;
let captureFeedbackTimer: number | null = null;
let workspaceCreateInFlight = false;
let activeDropdown: HTMLElement | null = null;
let dropProgressHideTimer: number | null = null;
let currentZoom = 1;
let spaceKeyPressed = false;
let isPanning = false;
let panStart: { x: number; y: number } | null = null;
const pendingAssetRefreshes = new Map<string, Promise<void>>();

type PageItem = { id: string; name: string };
type StoredPageDocument = { id: string; name: string; state?: CanvasState | null };
type WorkspaceSerializedState = CanvasState & {
  pages?: StoredPageDocument[];
  activePageId?: string | null;
  nextPageNumber?: number;
};

const BROWSER_PLACEHOLDER_IMAGE =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGNgYAAAAAMAAWgmWQ0AAAAASUVORK5CYII=';

type BrowserWorkspaceEntry = {
  slug: string;
  name: string;
  state: WorkspaceSerializedState;
};

function slugifyWorkspaceName(name: string, existing: Set<string>): string {
  const base = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  const fallback = base || 'workspace';
  let candidate = fallback;
  let counter = 2;
  while (existing.has(candidate)) {
    candidate = `${fallback}-${counter++}`;
  }
  return candidate;
}

function createInitialWorkspaceState(name: string): WorkspaceSerializedState {
  const pageId = 'page-1';
  const baseState = {
    version: 'browser-preview',
    objects: [],
    background: '#1f1f1f',
  } as CanvasState;
  return {
    ...baseState,
    pages: [
      {
        id: pageId,
        name: `${name} Page`,
        state: { ...baseState },
      },
    ],
    activePageId: pageId,
    nextPageNumber: 2,
  };
}

function createBrowserWorkspaceAPI(): Window['workspaceAPI'] {
  const workspaces = new Map<string, BrowserWorkspaceEntry>();

  const ensureDefault = () => {
    if (workspaces.size === 0) {
      const slug = 'default';
      workspaces.set(slug, {
        slug,
        name: 'Default Workspace',
        state: createInitialWorkspaceState('Default Workspace'),
      });
    }
  };

  return {
    async list() {
      ensureDefault();
      return Array.from(workspaces.keys());
    },
    async create(name: string) {
      const existing = new Set(workspaces.keys());
      const slug = slugifyWorkspaceName(name, existing);
      workspaces.set(slug, {
        slug,
        name,
        state: createInitialWorkspaceState(name),
      });
      return slug;
    },
    async load(workspace: string) {
      ensureDefault();
      return workspaces.get(workspace)?.state ?? null;
    },
    async save(workspace: string, state: CanvasState) {
      const document = { ...(state as WorkspaceSerializedState) };
      const entry = workspaces.get(workspace);
      if (entry) {
        entry.state = document;
        return;
      }
      workspaces.set(workspace, {
        slug: workspace,
        name: workspace,
        state: document,
      });
    },
    async rename(current: string, nextName: string) {
      const entry = workspaces.get(current);
      if (!entry) {
        throw new Error(`Workspace "${current}" not found`);
      }
      const existing = new Set(workspaces.keys());
      existing.delete(current);
      const slug = slugifyWorkspaceName(nextName, existing);
      workspaces.delete(current);
      entry.slug = slug;
      entry.name = nextName;
      workspaces.set(slug, entry);
      return slug;
    },
    async remove(workspace: string) {
      return workspaces.delete(workspace);
    },
    async ingest() {
      console.info('workspaceAPI.ingest is unavailable in browser preview');
      return { assets: [], failures: [] };
    },
    async capture() {
      console.info('workspaceAPI.capture is unavailable in browser preview');
      return null;
    },
    async readAsset() {
      return BROWSER_PLACEHOLDER_IMAGE;
    },
    async openAssetViewer() {
      console.info('workspaceAPI.openAssetViewer is unavailable in browser preview');
    },
  };
}

if (!isElectronEnvironment) {
  if (!browserWindow.workspaceAPI) {
    browserWindow.workspaceAPI = createBrowserWorkspaceAPI();
  }
  if (!browserWindow.electronAPI) {
    browserWindow.electronAPI = {
      on: () => () => undefined,
      openExternal: () => false,
      inspectClipboard: async () => ({
        canPaste: false,
        hasImage: false,
        hasFile: false,
        hasUrl: false,
      }),
      readClipboardAssets: async () => ({ files: [], urls: [], inlineFiles: [] }),
    };
  }
}

let pages: PageItem[] = [{ id: 'page-1', name: 'Page 1' }];
let pageStates: Record<string, CanvasState> = {};
let nextPageNumber = 2;
let activePageId: string | null = pages[0].id;

const PREFERENCES_KEY = 'artboard:preferences';
type Preferences = {
  activeWorkspace: string | null;
  activePageId: string | null;
  pages: PageItem[];
  nextPageNumber: number;
  zoom: number;
};

let preferences: Preferences = {
  activeWorkspace: null,
  activePageId,
  pages: pages.map((page) => ({ ...page })),
  nextPageNumber,
  zoom: currentZoom,
};

loadPreferences();

function resizeCanvas() {
  const content = document.querySelector<HTMLElement>('.content');
  if (!content) return;

  const rect = content.getBoundingClientRect();

  // Preserve viewport transform during resize (setWidth/setHeight reset it)
  const vpt = fabricCanvas.viewportTransform?.slice() as [number, number, number, number, number, number] | undefined;
  console.log('resizeCanvas - BEFORE resize, vpt:', vpt);

  fabricCanvas.setWidth(rect.width);
  fabricCanvas.setHeight(rect.height);

  console.log('resizeCanvas - AFTER setWidth/Height, vpt is now:', fabricCanvas.viewportTransform);

  // Restore viewport transform after resize
  if (vpt) {
    fabricCanvas.setViewportTransform(vpt);
    console.log('resizeCanvas - RESTORED vpt to:', vpt);
  }

  fabricCanvas.renderAll();
  console.log('resizeCanvas - AFTER renderAll, final vpt:', fabricCanvas.viewportTransform);
}

function scheduleSave() {
  console.log('scheduleSave called', {
    activeWorkspace,
    suppressSaves,
  });
  if (!activeWorkspace || suppressSaves) return;
  if (pendingSave) {
    window.clearTimeout(pendingSave);
  }
  console.log('scheduleSave queued', {
    activeWorkspace,
    suppressSaves,
  });
  pendingSave = window.setTimeout(async () => {
    try {
      const state = persistActivePageState({ force: true }) ?? captureCanvasState();
      const serialized = serializeWorkspace(state);
      console.log('Saving workspace state', {
        workspace: activeWorkspace,
        objectCount: Array.isArray(state.objects) ? state.objects.length : 0,
        pageCount: pages.length,
        activePageId,
      });
      await window.workspaceAPI.save(activeWorkspace!, serialized as CanvasState);
    } catch (error) {
      console.error('Failed to save workspace state', error);
    } finally {
      pendingSave = null;
    }
  }, 500);
}

async function flushPendingSave(): Promise<void> {
  if (!activeWorkspace) {
    if (pendingSave) {
      window.clearTimeout(pendingSave);
      pendingSave = null;
    }
    return;
  }

  if (!pendingSave) {
    return;
  }

  window.clearTimeout(pendingSave);
  pendingSave = null;

  try {
    const state = persistActivePageState({ force: true }) ?? captureCanvasState();
    const serialized = serializeWorkspace(state);
    console.log('Flushing workspace state', {
      workspace: activeWorkspace,
      objectCount: Array.isArray(state.objects) ? state.objects.length : 0,
      pageCount: pages.length,
      activePageId,
    });
    await window.workspaceAPI.save(activeWorkspace, serialized as CanvasState);
  } catch (error) {
    console.error('Failed to flush workspace state', error);
  }
}

function updateActiveWorkspaceLabel() {
  if (activeWorkspace) {
    activeWorkspaceLabel.textContent = activeWorkspace;
  } else {
    activeWorkspaceLabel.textContent = 'Workspace';
  }
}

function highlightActiveWorkspace() {
  const lists = [workspaceList, settingsWorkspaceList];
  lists.forEach((list) => {
    Array.from(list.children).forEach((node) => {
      const item = node as HTMLLIElement;
      const isActive = item.dataset.workspace === activeWorkspace;
      item.classList.toggle('active', isActive);
      const badge = item.querySelector('.workspace-list__badge');
      const meta = item.querySelector('.workspace-list__meta');
      if (isActive) {
        if (!badge) {
          const newBadge = document.createElement('span');
          newBadge.className = 'workspace-list__badge';
          newBadge.textContent = 'Active';
          meta?.appendChild(newBadge);
        }
      } else if (badge) {
        badge.remove();
      }
    });
  });
  updateActiveWorkspaceLabel();
}

function normalizePages(value: unknown): PageItem[] {
  if (!Array.isArray(value)) {
    return [];
  }
  const seen = new Set<string>();
  return value
    .map((entry) => {
      if (!entry || typeof entry !== 'object') {
        return null;
      }
      const candidate = entry as { id?: unknown; name?: unknown };
      const rawId =
        typeof candidate.id === 'string'
          ? candidate.id.trim()
          : typeof candidate.id === 'number'
            ? String(candidate.id)
            : '';
      if (!rawId || seen.has(rawId)) {
        return null;
      }
      seen.add(rawId);
      const rawName =
        typeof candidate.name === 'string'
          ? candidate.name.trim()
          : '';
      return {
        id: rawId,
        name: rawName || rawId,
      };
    })
    .filter((item): item is PageItem => Boolean(item));
}

function ensurePageDefaults(): void {
  if (pages.length === 0) {
    pages = [{ id: 'page-1', name: 'Page 1' }];
    nextPageNumber = Math.max(nextPageNumber, 2);
  }
  if (!pages.some((page) => page.id === activePageId)) {
    activePageId = pages[0]?.id ?? null;
  }
  if (!activePageId && pages.length > 0) {
    activePageId = pages[0].id;
  }
}

function loadPreferences() {
  let storedPreferences: Partial<Preferences> | null = null;
  try {
    const stored = localStorage.getItem(PREFERENCES_KEY);
    if (stored) {
      storedPreferences = JSON.parse(stored) as Partial<Preferences>;
    }
  } catch (error) {
    console.warn('Failed to load preferences', error);
  }

  if (storedPreferences) {
    if (typeof storedPreferences.activeWorkspace === 'string') {
      const trimmed = storedPreferences.activeWorkspace.trim();
      preferences.activeWorkspace = trimmed ? trimmed : null;
    } else if (storedPreferences.activeWorkspace === null) {
      preferences.activeWorkspace = null;
    }
    const parsedPages = normalizePages(storedPreferences.pages);
    if (parsedPages.length > 0) {
      pages = parsedPages;
    }
    if (
      storedPreferences.zoom &&
      typeof storedPreferences.zoom === 'number' &&
      Number.isFinite(storedPreferences.zoom)
    ) {
      const sanitized = Math.min(Math.max(storedPreferences.zoom, 0.1), 4);
      preferences.zoom = sanitized;
      currentZoom = sanitized;
    }
  }

  const storedNextPageNumber =
    storedPreferences &&
    typeof storedPreferences.nextPageNumber === 'number' &&
    Number.isFinite(storedPreferences.nextPageNumber)
      ? Math.max(Math.floor(storedPreferences.nextPageNumber), 2)
      : null;

  let candidateActivePageId: string | null =
    storedPreferences && typeof storedPreferences.activePageId === 'string'
      ? storedPreferences.activePageId
      : null;

  const derivedNext = pages.reduce((max, page) => {
    const match = /(\d+)$/.exec(page.id);
    if (!match) {
      return max;
    }
    const value = Number(match[1]);
    if (!Number.isFinite(value)) {
      return max;
    }
    return Math.max(max, value + 1);
  }, Math.max(pages.length + 1, 2));

  nextPageNumber = Math.max(
    derivedNext,
    storedNextPageNumber ?? 2,
    pages.length + 1,
    2,
  );

  if (candidateActivePageId && !pages.some((page) => page.id === candidateActivePageId)) {
    candidateActivePageId = null;
  }
  activePageId = candidateActivePageId ?? pages[0]?.id ?? null;

  ensurePageDefaults();
  syncPreferencesWithPages();
}

function syncPreferencesWithPages(): void {
  preferences.activeWorkspace = activeWorkspace;
  preferences.activePageId = activePageId;
  preferences.pages = pages.map((page) => ({ ...page }));
  preferences.nextPageNumber = Math.max(nextPageNumber, pages.length + 1, 2);
  preferences.zoom = currentZoom;
}

function savePreferences() {
  syncPreferencesWithPages();
  try {
    localStorage.setItem(PREFERENCES_KEY, JSON.stringify(preferences));
  } catch (error) {
    console.warn('Failed to save preferences', error);
  }
}

function isMouseLikeEvent(event: TPointerEvent): event is MouseEvent | PointerEvent {
  return 'button' in event && typeof event.button === 'number';
}

function isMiddleButtonEvent(event: TPointerEvent): boolean {
  if ('buttons' in event && typeof event.buttons === 'number' && (event.buttons & 4) === 4) {
    return true;
  }
  if (isMouseLikeEvent(event)) {
    return event.button === 1 || event.button === 2 || event.button === 4;
  }
  if ('which' in event && typeof (event as MouseEvent).which === 'number') {
    return (event as MouseEvent).which === 2;
  }
  return false;
}

function getPointerPosition(event: TPointerEvent): { x: number; y: number } | null {
  if ('clientX' in event && 'clientY' in event) {
    return { x: event.clientX, y: event.clientY };
  }
  if ('touches' in event && event.touches.length > 0) {
    const touch = event.touches[0];
    return { x: touch.clientX, y: touch.clientY };
  }
  if ('changedTouches' in event && event.changedTouches.length > 0) {
    const touch = event.changedTouches[0];
    return { x: touch.clientX, y: touch.clientY };
  }
  return null;
}

function preventPointerDefault(event: TPointerEvent): void {
  if (typeof event.preventDefault === 'function') {
    event.preventDefault();
  }
}

function getActiveCanvasObjects(): FabricObject[] {
  return fabricCanvas.getActiveObjects();
}

function reapplySelection(objects: FabricObject[]): void {
  if (objects.length === 0) {
    fabricCanvas.discardActiveObject();
    return;
  }

  if (objects.length === 1) {
    fabricCanvas.setActiveObject(objects[0]);
    return;
  }

  const selection = new ActiveSelection(objects, { canvas: fabricCanvas });
  fabricCanvas.setActiveObject(selection);
}

function buildAssetCacheKey(workspace: string, relativePath: string): string {
  return `${workspace}::${relativePath}`;
}

function clearCachedAssetState(workspace: string, relativePath: string): void {
  Object.values(pageStates).forEach((state) => {
    if (!state || typeof state !== 'object') {
      return;
    }
    const objects = Array.isArray((state as { objects?: unknown[] }).objects)
      ? ((state as { objects?: unknown[] }).objects as Record<string, unknown>[])
      : [];
    objects.forEach((object) => {
      if (!object || typeof object !== 'object') {
        return;
      }
      const meta = (object as { artboardMeta?: { workspace?: string; relativePath?: string } }).artboardMeta;
      if (meta?.workspace === workspace && meta.relativePath === relativePath) {
        if ('src' in object) {
          delete (object as { src?: unknown }).src;
        }
      }
    });
  });
}

async function refreshCanvasAsset(relativePath: string): Promise<number> {
  if (!activeWorkspace) {
    return 0;
  }

  const candidates = fabricCanvas
    .getObjects()
    .filter((object): object is FabricImage => {
      if (object.type !== 'image') {
        return false;
      }
      const meta = extractAssetMeta(object);
      return meta?.workspace === activeWorkspace && meta.relativePath === relativePath;
    });

  if (candidates.length === 0) {
    return 0;
  }

  const activeSelection = fabricCanvas.getActiveObjects();
  const dataUrl = await window.workspaceAPI.readAsset(activeWorkspace, relativePath);
  const crossOrigin = dataUrl.startsWith('data:') ? undefined : 'anonymous';

  await Promise.all(
    candidates.map(async (image) => {
      const scaleX = image.scaleX ?? 1;
      const scaleY = image.scaleY ?? 1;
      await image.setSrc(dataUrl, crossOrigin ? { crossOrigin } : undefined);
      image.scaleX = scaleX;
      image.scaleY = scaleY;
      image.dirty = true;
      image.setCoords();
    }),
  );

  if (activeSelection.length > 0) {
    fabricCanvas.discardActiveObject();
    reapplySelection(activeSelection);
  }

  fabricCanvas.renderAll();
  return candidates.length;
}

function handleWorkspaceAssetUpdated(event: unknown): void {
  if (!event || typeof event !== 'object') {
    return;
  }
  const payload = event as AssetUpdateEvent;
  if (!payload.workspace || !payload.relativePath) {
    return;
  }
  if (payload.workspace !== activeWorkspace) {
    return;
  }

  const key = buildAssetCacheKey(payload.workspace, payload.relativePath);
  const existing = pendingAssetRefreshes.get(key);
  if (existing) {
    void existing.finally(() => {
      handleWorkspaceAssetUpdated(payload);
    });
    return;
  }

  const task = (async () => {
    try {
      clearCachedAssetState(payload.workspace, payload.relativePath);
      const updatedCount = await refreshCanvasAsset(payload.relativePath);
      if (updatedCount > 0) {
        persistActivePageState({ force: true });
        scheduleSave();
        setCaptureFeedback('Canvas updated with latest asset', 'info', 2000);
      }
    } catch (error) {
      console.error('Failed to refresh asset instances', payload, error);
    } finally {
      pendingAssetRefreshes.delete(key);
    }
  })();

  pendingAssetRefreshes.set(key, task);
}

function hideContextSubmenu(): void {
  if (!contextSubmenuVisible) return;
  contextSubmenu.style.visibility = 'hidden';
  contextSubmenu.hidden = true;
  contextSubmenuVisible = false;
  if (contextSubmenuActivator) {
    contextSubmenuActivator.setAttribute('aria-expanded', 'false');
    contextSubmenuActivator = null;
  }
  contextSubmenuMode = null;
  contextSubmenuList.replaceChildren();
  contextSubmenuList.hidden = false;
  contextSubmenuEmpty.hidden = true;
  contextSubmenu.style.left = '-9999px';
  contextSubmenu.style.top = '-9999px';
}

function renderPageSubmenuOptions(mode: 'move' | 'navigate'): { hasOptions: boolean } {
  const candidates = pages.filter((page) => page.id !== activePageId);
  const items = candidates.map((page) => {
    const item = document.createElement('li');
    item.dataset.pageId = page.id;

    const button = document.createElement('button');
    button.type = 'button';
    button.dataset.pageId = page.id;
    button.dataset.mode = mode;
    button.setAttribute('role', 'menuitem');
    button.textContent = page.name;

    item.appendChild(button);
    return item;
  });

  contextSubmenuList.replaceChildren(...items);
  const hasOptions = items.length > 0;
  contextSubmenuList.hidden = !hasOptions;
  contextSubmenuEmpty.hidden = hasOptions;
  return { hasOptions };
}

function positionContextSubmenu(): void {
  const rect = contextMenu.getBoundingClientRect();
  const margin = 8;

  contextSubmenu.style.visibility = 'hidden';
  contextSubmenu.hidden = false;
  contextSubmenu.style.left = `${rect.right + margin}px`;
  contextSubmenu.style.top = `${rect.top}px`;

  const submenuRect = contextSubmenu.getBoundingClientRect();
  let left = rect.right + margin;
  let top = rect.top;

  if (left + submenuRect.width > window.innerWidth - margin) {
    left = rect.left - submenuRect.width - margin;
  }
  if (left < margin) {
    left = margin;
  }

  if (top + submenuRect.height > window.innerHeight - margin) {
    top = window.innerHeight - submenuRect.height - margin;
  }
  if (top < margin) {
    top = margin;
  }

  contextSubmenu.style.left = `${left}px`;
  contextSubmenu.style.top = `${top}px`;
  contextSubmenu.style.visibility = '';
}

function showMoveToPageSubmenu(): void {
  if (!contextMenuVisible) return;
  const selection = getActiveCanvasObjects();
  if (selection.length === 0) {
    hideContextSubmenu();
    return;
  }
  contextSubmenuMode = 'move';
  contextSubmenuActivator = contextMenuMoveButton;
  contextMenuMoveButton.setAttribute('aria-expanded', 'true');
  contextSubmenuTitle.textContent = 'Move to Page';
  const { hasOptions } = renderPageSubmenuOptions('move');

  positionContextSubmenu();
  contextSubmenuVisible = true;

  if (!hasOptions) {
    contextSubmenu.focus({ preventScroll: true });
    return;
  }

  const firstButton = contextSubmenuList.querySelector<HTMLButtonElement>('button');
  firstButton?.focus({ preventScroll: true });
}

function showNavigateToPageSubmenu(): void {
  if (!contextMenuVisible) return;
  if (pages.length <= 1) {
    hideContextSubmenu();
    return;
  }

  contextSubmenuMode = 'navigate';
  contextSubmenuActivator = contextMenuNavigateButton;
  contextMenuNavigateButton.setAttribute('aria-expanded', 'true');
  contextSubmenuTitle.textContent = 'Go to Page';
  const { hasOptions } = renderPageSubmenuOptions('navigate');

  positionContextSubmenu();
  contextSubmenuVisible = true;

  if (!hasOptions) {
    contextSubmenu.focus({ preventScroll: true });
    return;
  }

  const firstButton = contextSubmenuList.querySelector<HTMLButtonElement>('button');
  firstButton?.focus({ preventScroll: true });
}

function hideContextMenu(): void {
  if (!contextMenuVisible) return;
  hideContextSubmenu();
  contextMenu.style.visibility = 'hidden';
  contextMenu.hidden = true;
  contextMenuVisible = false;
  contextMenuMoveButton.setAttribute('aria-expanded', 'false');
  contextMenuNavigateButton.setAttribute('aria-expanded', 'false');
}

function showContextMenu(
  x: number,
  y: number,
  options: { selectionCount: number; canPaste: boolean },
): void {
  const hasSelection = options.selectionCount > 0;
  updateContextMenuVisibility(hasSelection, options.canPaste);
  if (hasSelection) {
    updateContextMenuMoveAvailability();
  } else {
    updateContextMenuNavigateAvailability();
  }

  contextMenu.hidden = false;
  contextMenu.style.visibility = 'hidden';
  contextMenu.style.left = `${x}px`;
  contextMenu.style.top = `${y}px`;

  const rect = contextMenu.getBoundingClientRect();
  const margin = 8;
  let adjustedX = x;
  let adjustedY = y;

  if (rect.right > window.innerWidth - margin) {
    adjustedX = window.innerWidth - rect.width - margin;
  }
  if (rect.bottom > window.innerHeight - margin) {
    adjustedY = window.innerHeight - rect.height - margin;
  }
  if (adjustedX < margin) {
    adjustedX = margin;
  }
  if (adjustedY < margin) {
    adjustedY = margin;
  }

  contextMenu.style.left = `${adjustedX}px`;
  contextMenu.style.top = `${adjustedY}px`;
  contextMenu.style.visibility = '';
  contextMenuVisible = true;
  contextMenuMoveButton.setAttribute('aria-expanded', 'false');
  contextMenuNavigateButton.setAttribute('aria-expanded', 'false');
  hideContextSubmenu();
  requestAnimationFrame(() => {
    contextMenu.focus({ preventScroll: true });
  });
}

function setMenuItemVisibility(element: Element, visible: boolean): void {
  if (!(element instanceof HTMLElement)) {
    return;
  }
  element.hidden = !visible;
  element.setAttribute('aria-hidden', String(!visible));
  element.style.display = visible ? '' : 'none';
}

function applyMenuButtonState(button: HTMLButtonElement, enabled: boolean): void {
  button.disabled = !enabled;
  button.setAttribute('aria-disabled', String(!enabled));
}

function updateContextMenuVisibility(hasSelection: boolean, canPaste: boolean): void {
  contextMenuSelectionItems.forEach((item) => {
    const show = hasSelection;
    setMenuItemVisibility(item, show);
    if (item instanceof HTMLButtonElement) {
      applyMenuButtonState(item, show);
      if (item === contextMenuBringFrontButton) {
        item.title = show ? 'Bring selection to front' : 'Select an object to adjust layering';
      } else if (item === contextMenuSendBackButton) {
        item.title = show ? 'Send selection to back' : 'Select an object to adjust layering';
      } else if (item === contextMenuDeleteButton) {
        item.title = show ? 'Delete selection' : 'Select an object to delete';
      }
    }
  });

  contextMenuEmptyItems.forEach((item) => {
    const show = !hasSelection;
    setMenuItemVisibility(item, show);
    if (item instanceof HTMLButtonElement) {
      if (item === contextMenuPasteButton) {
        applyMenuButtonState(item, canPaste);
        contextMenuPasteButton.title = canPaste
          ? 'Paste image from clipboard'
          : 'Clipboard does not contain an image';
      } else {
        applyMenuButtonState(item, show);
      }
    }
  });
}

async function handleContextMenuPaste(): Promise<void> {
  if (!activeWorkspace) {
    setCaptureFeedback('Select a workspace before pasting.', 'error', 2200);
    return;
  }
  if (!window.electronAPI?.readClipboardAssets) {
    document.execCommand('paste');
    return;
  }

  try {
    const clipboardPayload = await window.electronAPI.readClipboardAssets();
    const files = clipboardPayload?.files ?? [];
    const urls = clipboardPayload?.urls ?? [];
    const inlineFiles = (clipboardPayload?.inlineFiles ?? [])
      .map((entry) => ({
        ...entry,
        data:
          entry.data instanceof Uint8Array
            ? entry.data
            : entry.data
                ? Uint8Array.from(entry.data as ArrayLike<number>)
                : new Uint8Array(),
      }))
      .filter((entry) => entry.data.length > 0);

    const total = files.length + urls.length + inlineFiles.length;
    if (total === 0) {
      showDropProgress('Nothing to paste', 'Clipboard did not contain an image.');
      hideDropProgress(1600);
      return;
    }

    showDropProgress(
      total > 1 ? 'Importing assets…' : DROP_PROGRESS_DEFAULT_TITLE,
      total > 1 ? `Processing ${total} items…` : PASTE_PROGRESS_SUBTITLE,
    );

    await ingestAndHandleAssets(
      activeWorkspace,
      { files, urls, inlineFiles },
      {
        sourceLabel: 'paste',
        failureTitle: 'Paste failed',
        failureSubtitle:
          'We could not add this clipboard content. Check the logs for details.',
        emptyMessage: 'Clipboard did not contain new assets.',
      },
    );
  } catch (error) {
    console.error('Failed to read clipboard contents', error);
    showDropProgress('Paste failed', 'Unable to read clipboard contents.');
    hideDropProgress(2400);
  }
}

function captureCanvasState(): CanvasState {
  const state = fabricCanvas.toJSON(['artboardMeta']) as CanvasState;
  // Preserve viewport transform (pan/zoom position)
  state.viewportTransform = fabricCanvas.viewportTransform?.slice() as [number, number, number, number, number, number] | undefined;
  console.log('Capturing canvas state with viewportTransform:', state.viewportTransform, 'zoom:', fabricCanvas.getZoom());
  return state;
}

function cloneCanvasState(state: CanvasState): CanvasState {
  return JSON.parse(JSON.stringify(state)) as CanvasState;
}

function createBlankCanvasState(): CanvasState {
  const base = captureCanvasState();
  base.objects = [];
  return base;
}

function moveSelectionToPage(targetPageId: string): void {
  if (!activePageId || activePageId === targetPageId) {
    return;
  }

  const selection = getActiveCanvasObjects();
  if (selection.length === 0) {
    return;
  }

  const serialized = selection.map((object) =>
    object.toObject(['artboardMeta']),
  ) as CanvasState['objects'];

  selection.forEach((object) => {
    fabricCanvas.remove(object);
  });
  fabricCanvas.discardActiveObject();
  fabricCanvas.requestRenderAll();

  persistActivePageState({ force: true });

  const existingTargetState = pageStates[targetPageId];
  const baseState = existingTargetState
    ? cloneCanvasState(existingTargetState)
    : createBlankCanvasState();

  const targetObjects = Array.isArray(baseState.objects) ? baseState.objects.slice() : [];
  baseState.objects = targetObjects.concat(serialized);
  baseState.updatedAt = new Date().toISOString();
  pageStates[targetPageId] = baseState;

  const pageName = pages.find((page) => page.id === targetPageId)?.name ?? 'page';
  setCaptureFeedback(`Moved selection to ${pageName}`, 'success', 3000);
  scheduleSave();
  hideContextMenu();
}

function persistActivePageState(options?: { force?: boolean }): CanvasState | null {
  if (!activePageId) {
    return null;
  }
  if (suppressSaves && !options?.force) {
    return pageStates[activePageId] ?? null;
  }
  const state = captureCanvasState();
  pageStates[activePageId] = state;
  return state;
}

async function loadPageState(pageId: string | null): Promise<void> {
  if (!pageId) {
    fabricCanvas.clear();
    fabricCanvas.discardActiveObject();
    fabricCanvas.renderAll();
    return;
  }

  suppressSaves = true;
  try {
    const stored = pageStates[pageId];
    console.log('Loading page state for', pageId, 'viewportTransform in stored:', stored?.viewportTransform);
    if (stored && Array.isArray(stored.objects)) {
      await fabricCanvas.loadFromJSON(stored);
    } else {
      fabricCanvas.clear();
    }
    fabricCanvas.discardActiveObject();
    fabricCanvas.renderAll();

    // Restore viewport transform AFTER render to prevent it from being overwritten
    if (stored?.viewportTransform && Array.isArray(stored.viewportTransform)) {
      console.log('Restoring viewportTransform:', stored.viewportTransform);
      fabricCanvas.setViewportTransform(stored.viewportTransform as [number, number, number, number, number, number]);
      fabricCanvas.requestRenderAll();
    }
  } catch (error) {
    console.error('Failed to load page state', pageId, error);
    fabricCanvas.clear();
    fabricCanvas.discardActiveObject();
    fabricCanvas.renderAll();
  } finally {
    suppressSaves = false;
  }
}

function extractCanvasState(document: WorkspaceSerializedState | null | undefined): CanvasState | null {
  if (!document || typeof document !== 'object') {
    return null;
  }
  const { pages: _pages, activePageId: _active, nextPageNumber: _next, ...rest } = document;
  const candidate = rest as CanvasState;
  if (candidate && Array.isArray((candidate as { objects?: unknown[] }).objects)) {
    return candidate;
  }
  return null;
}

function parseWorkspaceDocument(
  document: WorkspaceSerializedState | null | undefined,
): {
  pages: PageItem[];
  pageStates: Record<string, CanvasState>;
  activePageId: string | null;
  nextPageNumber: number;
} {
  const pageStatesMap: Record<string, CanvasState> = {};
  const pageItems: PageItem[] = [];

  const storedPages = Array.isArray(document?.pages) ? document!.pages : [];
  let sourcePages = storedPages;
  if (sourcePages.length === 0) {
    const fallbackState = extractCanvasState(document);
    if (fallbackState) {
      sourcePages = [{ id: 'page-1', name: 'Page 1', state: fallbackState }];
    } else {
      sourcePages = [{ id: 'page-1', name: 'Page 1', state: null }];
    }
  }

  sourcePages.forEach((entry, index) => {
    const id =
      entry && typeof entry.id === 'string' && entry.id.trim()
        ? entry.id.trim()
        : `page-${index + 1}`;
    const name =
      entry && typeof entry.name === 'string' && entry.name.trim()
        ? entry.name.trim()
        : `Page ${index + 1}`;
    if (entry?.state && typeof entry.state === 'object' && Array.isArray(entry.state.objects)) {
      pageStatesMap[id] = entry.state as CanvasState;
    }
    pageItems.push({ id, name });
  });

  const derivedNext = pageItems.reduce((max, page) => {
    const match = /(\d+)$/.exec(page.id);
    if (!match) {
      return max;
    }
    const value = Number(match[1]);
    if (!Number.isFinite(value)) {
      return max;
    }
    return Math.max(max, value + 1);
  }, Math.max(pageItems.length + 1, 2));

  const nextNumber = Math.max(document?.nextPageNumber ?? 2, derivedNext);
  let activeId = document?.activePageId ?? null;
  if (!activeId || !pageItems.some((page) => page.id === activeId)) {
    activeId = pageItems[0]?.id ?? null;
  }

  return {
    pages: pageItems,
    pageStates: pageStatesMap,
    activePageId: activeId,
    nextPageNumber: nextNumber,
  };
}

function buildStoredPages(): StoredPageDocument[] {
  return pages.map((page) => ({
    id: page.id,
    name: page.name,
    state: pageStates[page.id] ?? null,
  }));
}

function serializeWorkspace(state: CanvasState): WorkspaceSerializedState {
  return {
    ...state,
    pages: buildStoredPages(),
    activePageId,
    nextPageNumber,
  };
}

function deleteSelectedObjects(): void {
  const objects = getActiveCanvasObjects();
  if (objects.length === 0) {
    return;
  }
  objects.forEach((object) => {
    fabricCanvas.remove(object);
  });
  fabricCanvas.discardActiveObject();
  fabricCanvas.requestRenderAll();
  scheduleSave();
  hideContextMenu();
}

function adjustSelectionStack(direction: 'forward' | 'backward' | 'front' | 'back'): void {
  const objects = getActiveCanvasObjects();
  if (objects.length === 0) {
    return;
  }

  const uniqueObjects = Array.from(new Set(objects));
  const allObjects = fabricCanvas.getObjects();
  const byAscendingIndex = uniqueObjects
    .slice()
    .sort((a, b) => allObjects.indexOf(a) - allObjects.indexOf(b));
  const byDescendingIndex = [...byAscendingIndex].reverse();

  if (direction === 'front') {
    byAscendingIndex.forEach((object) => {
      fabricCanvas.bringObjectToFront(object);
    });
  } else if (direction === 'back') {
    byDescendingIndex.forEach((object) => {
      fabricCanvas.sendObjectToBack(object);
    });
  } else {
    const sequence = direction === 'forward' ? byDescendingIndex : byAscendingIndex;
    sequence.forEach((object) => {
      if (direction === 'forward') {
        fabricCanvas.bringObjectForward(object);
      } else {
        fabricCanvas.sendObjectBackwards(object);
      }
    });
  }

  fabricCanvas.discardActiveObject();
  reapplySelection(uniqueObjects);
  fabricCanvas.requestRenderAll();
  scheduleSave();
  hideContextMenu();
}

function isEditableTarget(target: EventTarget | null): boolean {
  if (!target || !(target instanceof HTMLElement)) {
    return false;
  }
  const editableTags = ['input', 'textarea', 'select'];
  if (editableTags.includes(target.tagName.toLowerCase())) {
    return true;
  }
  if (target.isContentEditable) {
    return true;
  }
  return false;
}

async function handleCanvasContextMenu(event: MouseEvent): Promise<void> {
  const target = fabricCanvas.findTarget(event, false);
  if (target) {
    const active = getActiveCanvasObjects();
    if (!active.includes(target)) {
      fabricCanvas.setActiveObject(target);
    }
  } else {
    fabricCanvas.discardActiveObject();
    fabricCanvas.requestRenderAll();
  }

  event.preventDefault();
  const selectionCount = getActiveCanvasObjects().length;
  let canPaste = false;
  if (window.electronAPI?.inspectClipboard) {
    try {
      const inspection = await window.electronAPI.inspectClipboard();
      canPaste = Boolean(inspection?.canPaste || inspection?.hasImage || inspection?.hasFile || inspection?.hasUrl);
    } catch (error) {
      console.warn('Clipboard inspect failed', error);
    }
  }

  hideContextMenu();
  showContextMenu(event.clientX, event.clientY, { selectionCount, canPaste });
}

function extractAssetMeta(object: FabricObject | undefined | null):
  | { workspace: string; relativePath: string }
  | null {
  if (!object || typeof object.get !== 'function') {
    return null;
  }
  const meta = object.get('artboardMeta') as
    | { workspace: string; relativePath: string }
    | undefined;
  if (!meta?.workspace || !meta.relativePath) {
    return null;
  }
  return meta;
}

function handleImageDoubleClick(event: TPointerEventInfo<MouseEvent>) {
  const target = event.target as FabricObject | undefined;
  const meta = extractAssetMeta(target);
  if (!meta) {
    return;
  }
  void window.workspaceAPI
    .openAssetViewer({ workspace: meta.workspace, relativePath: meta.relativePath })
    .catch((error) => {
      console.error('Failed to open asset viewer', error);
    });
}

function handleWorkspaceCreate(): void {
  openWorkspaceCreateModal();
}

function resetWorkspaceCreateModal() {
  workspaceCreateForm.reset();
  workspaceCreateError.textContent = '';
  workspaceCreateInput.disabled = false;
  workspaceCreateSubmit.disabled = false;
  workspaceCreateCancel.disabled = false;
}

function openWorkspaceCreateModal() {
  resetWorkspaceCreateModal();
  if (!workspaceCreateModal.open) {
    workspaceCreateModal.showModal();
  }
  requestAnimationFrame(() => {
    workspaceCreateInput.focus();
  });
}

function closeWorkspaceCreateModal() {
  if (workspaceCreateModal.open) {
    workspaceCreateModal.close();
  }
}

async function createWorkspaceWithName(name: string): Promise<void> {
  const trimmed = name.trim();
  if (!trimmed) {
    throw new Error('Workspace name is required');
  }
  const slug = await window.workspaceAPI.create(trimmed);
  await populateWorkspaces(slug);
  closeActiveDropdown();
}

async function populateWorkspaces(preferred?: string) {
  let workspaces = await window.workspaceAPI.list();
  if (workspaces.length === 0) {
    const created = await window.workspaceAPI.create('default');
    workspaces = [created];
  }

  const fallbackCandidates = [
    preferred,
    preferences.activeWorkspace,
    activeWorkspace,
    workspaces[0],
  ].filter((value): value is string => Boolean(value && workspaces.includes(value)));

  renderWorkspaceList(workspaces);

  const target = fallbackCandidates[0] ?? workspaces[0];
  if (target) {
    await loadWorkspace(target);
  } else {
    highlightActiveWorkspace();
  }
}

async function loadWorkspace(workspace: string) {
  await flushPendingSave();
  activeWorkspace = workspace;
  suppressSaves = true;

  const rawState = (await window.workspaceAPI.load(workspace)) as WorkspaceSerializedState | null;
  const parsed = parseWorkspaceDocument(rawState);

  pages = parsed.pages;
  pageStates = parsed.pageStates;
  nextPageNumber = parsed.nextPageNumber;
  activePageId = null;

  renderPages();
  updateActiveWorkspaceLabel();
  highlightActiveWorkspace();

  suppressSaves = false;

  const targetPageId = parsed.activePageId ?? pages[0]?.id ?? null;
  if (targetPageId) {
    await setActivePage(targetPageId, { persist: false, schedule: false });
  } else {
    fabricCanvas.clear();
    fabricCanvas.discardActiveObject();
    fabricCanvas.renderAll();
  }

  syncPreferencesWithPages();
  savePreferences();
}

function handleTabChange(targetTab: string) {
  tabButtons.forEach((button) => {
    const isActive = button.dataset.tab === targetTab;
    button.classList.toggle('tab-btn--active', isActive);
    button.setAttribute('aria-selected', isActive ? 'true' : 'false');
  });
  panels.forEach((panel) => {
    const isActive = panel.dataset.panel === targetTab;
    panel.classList.toggle('settings-panel--active', isActive);
  });
}

function renderWorkspaceList(workspaces: string[]) {
  currentWorkspaces = [...workspaces];
  workspaceList.replaceChildren(
    ...workspaces.map((workspace) => {
      const item = document.createElement('li');
      item.dataset.workspace = workspace;
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'menu-item';
      button.textContent = workspace;
      item.appendChild(button);
      if (workspace === activeWorkspace) {
        item.classList.add('active');
      }
      return item;
    }),
  );
  renderSettingsWorkspaceList(workspaces);
  highlightActiveWorkspace();
}

function renderSettingsWorkspaceList(workspaces: string[]) {
  const disableDelete = workspaces.length <= 1;
  settingsWorkspaceList.replaceChildren(
    ...workspaces.map((workspace) => {
      const item = document.createElement('div');
      item.className = 'settings-list-item';
      item.dataset.workspace = workspace;

      const isActive = workspace === activeWorkspace;
      if (isActive) {
        item.classList.add('settings-list-item--active');
      }

      const info = document.createElement('div');
      info.className = 'list-item-info';

      const icon = document.createElement('span');
      icon.className = 'item-icon';
      icon.textContent = '✨';

      const details = document.createElement('div');
      details.className = 'item-details';

      const name = document.createElement('span');
      name.className = 'item-name';
      name.textContent = workspace;

      details.appendChild(name);
      info.append(icon, details);

      const actions = document.createElement('div');
      actions.className = 'list-item-actions';

      const renameButton = document.createElement('button');
      renameButton.type = 'button';
      renameButton.className = 'icon-btn icon-btn--small';
      renameButton.dataset.action = 'rename';
      renameButton.title = 'Rename';
      renameButton.textContent = '✏️';

      const deleteButton = document.createElement('button');
      deleteButton.type = 'button';
      deleteButton.className = 'icon-btn icon-btn--small icon-btn--danger';
      deleteButton.dataset.action = 'delete';
      deleteButton.title = 'Delete';
      deleteButton.textContent = '🗑️';
      if (disableDelete) {
        deleteButton.disabled = true;
        deleteButton.title = 'Keep at least one workspace';
      }

      actions.append(renameButton, deleteButton);
      item.append(info, actions);
      return item;
    }),
  );
}

function updatePageIndicator(): void {
  const activePage = pages.find((page) => page.id === activePageId);
  pageIndicator.textContent = activePage ? activePage.name : 'Pages';
  updatePageNavButtons();
}

function updatePageNavButtons(): void {
  const pageIndex = pages.findIndex((page) => page.id === activePageId);
  const hasPrev = pageIndex > 0;
  const hasNext = pageIndex >= 0 && pageIndex < pages.length - 1;
  pageNavBack.disabled = !hasPrev;
  pageNavForward.disabled = !hasNext;
}

const DROP_PROGRESS_DEFAULT_TITLE = 'Importing asset…';
const DROP_PROGRESS_DEFAULT_SUBTITLE = 'Hang tight while we place it on the canvas.';
const PASTE_PROGRESS_SUBTITLE = 'Processing clipboard contents…';

function showDropProgress(
  title = DROP_PROGRESS_DEFAULT_TITLE,
  subtitle = DROP_PROGRESS_DEFAULT_SUBTITLE,
): void {
  if (dropProgressHideTimer) {
    window.clearTimeout(dropProgressHideTimer);
    dropProgressHideTimer = null;
  }
  dropProgressTitle.textContent = title;
  dropProgressSubtitle.textContent = subtitle;
  dropProgress.classList.remove('is-hidden');
  dropProgress.setAttribute('aria-hidden', 'false');
}

function updateDropProgress(subtitle: string): void {
  dropProgressSubtitle.textContent = subtitle;
}

function hideDropProgress(delay = 0, reset = true): void {
  const performHide = () => {
    dropProgress.classList.add('is-hidden');
    dropProgress.setAttribute('aria-hidden', 'true');
    if (reset) {
      dropProgressTitle.textContent = DROP_PROGRESS_DEFAULT_TITLE;
      dropProgressSubtitle.textContent = DROP_PROGRESS_DEFAULT_SUBTITLE;
    }
    dropProgressHideTimer = null;
  };

  if (dropProgressHideTimer) {
    window.clearTimeout(dropProgressHideTimer);
    dropProgressHideTimer = null;
  }

  if (delay > 0) {
    dropProgressHideTimer = window.setTimeout(performHide, delay);
  } else {
    performHide();
  }
}

function clampZoom(value: number): number {
  return Math.min(Math.max(value, 0.1), 4);
}

function formatZoom(value: number): string {
  return `${Math.round(value * 100)}%`;
}

function updateZoomIndicator(): void {
  zoomIndicator.textContent = formatZoom(currentZoom);
}

type ZoomPoint = Point | { x: number; y: number };

function setCanvasZoom(
  value: number,
  options?: { announce?: boolean; persist?: boolean; point?: ZoomPoint; resetPan?: boolean },
): void {
  const next = clampZoom(value);
  currentZoom = next;

  if (options?.point) {
    const focusPoint = options.point instanceof Point
      ? options.point
      : new Point(options.point.x, options.point.y);
    fabricCanvas.zoomToPoint(focusPoint, next);
  } else {
    // Preserve viewport transform pan position unless explicitly told to reset
    const vpt = fabricCanvas.viewportTransform?.slice() as [number, number, number, number, number, number] | undefined;

    fabricCanvas.setZoom(next);

    // Only reset pan if explicitly requested (resetPan: true), otherwise preserve it
    if (options?.resetPan && vpt) {
      const transform = fabricCanvas.viewportTransform;
      if (transform) {
        transform[4] = 0;
        transform[5] = 0;
      }
    } else if (vpt) {
      // Restore the pan position, but update the zoom
      const transform = fabricCanvas.viewportTransform;
      if (transform) {
        transform[0] = next; // scale x
        transform[3] = next; // scale y
        transform[4] = vpt[4]; // pan x
        transform[5] = vpt[5]; // pan y
      }
    }
  }
  fabricCanvas.renderAll();
  updateZoomIndicator();
  if (options?.persist ?? true) {
    savePreferences();
  }
  if (options?.announce) {
    setCaptureFeedback(`Zoom ${formatZoom(next)}`, 'info', 1500);
  }
}

function resetZoom(options?: { announce?: boolean; persist?: boolean }) {
  setCanvasZoom(1, { ...options, resetPan: true });
}

function fitToScreen(options?: { announce?: boolean; persist?: boolean }) {
  const objects = fabricCanvas.getObjects();

  if (objects.length === 0) {
    // No objects, just reset zoom
    resetZoom(options);
    return;
  }

  // Calculate bounding box of all objects
  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;

  objects.forEach((obj) => {
    const bounds = obj.getBoundingRect();
    minX = Math.min(minX, bounds.left);
    minY = Math.min(minY, bounds.top);
    maxX = Math.max(maxX, bounds.left + bounds.width);
    maxY = Math.max(maxY, bounds.top + bounds.height);
  });

  const objectsWidth = maxX - minX;
  const objectsHeight = maxY - minY;
  const objectsCenterX = minX + objectsWidth / 2;
  const objectsCenterY = minY + objectsHeight / 2;

  // Get canvas dimensions
  const canvasWidth = fabricCanvas.getWidth();
  const canvasHeight = fabricCanvas.getHeight();

  // Add padding (10% on each side)
  const padding = 0.1;
  const availableWidth = canvasWidth * (1 - padding * 2);
  const availableHeight = canvasHeight * (1 - padding * 2);

  // Calculate zoom to fit
  const zoomX = availableWidth / objectsWidth;
  const zoomY = availableHeight / objectsHeight;
  const zoom = Math.min(zoomX, zoomY);

  // Clamp zoom to valid range
  const clampedZoom = clampZoom(zoom);

  // Calculate pan to center objects
  const viewportCenterX = canvasWidth / 2;
  const viewportCenterY = canvasHeight / 2;
  const panX = viewportCenterX - objectsCenterX * clampedZoom;
  const panY = viewportCenterY - objectsCenterY * clampedZoom;

  // Apply zoom and pan
  currentZoom = clampedZoom;
  fabricCanvas.setZoom(clampedZoom);
  const transform = fabricCanvas.viewportTransform;
  if (transform) {
    transform[4] = panX;
    transform[5] = panY;
  }
  fabricCanvas.renderAll();
  updateZoomIndicator();

  if (options?.persist ?? true) {
    savePreferences();
  }
  if (options?.announce) {
    setCaptureFeedback(`Fit to screen (${formatZoom(clampedZoom)})`, 'info', 1500);
  }
}

function closeActiveDropdown() {
  if (!activeDropdown) return;
  const trigger = activeDropdown.querySelector<HTMLButtonElement>('.footer-trigger');
  trigger?.setAttribute('aria-expanded', 'false');
  activeDropdown.classList.remove('is-open');
  activeDropdown = null;
}

function openDropdown(container: HTMLElement) {
  if (activeDropdown === container) {
    closeActiveDropdown();
    return;
  }
  closeActiveDropdown();
  const trigger = container.querySelector<HTMLButtonElement>('.footer-trigger');
  trigger?.setAttribute('aria-expanded', 'true');
  container.classList.add('is-open');
  activeDropdown = container;
}

function setCaptureFeedback(
  message: string | null,
  tone: 'info' | 'success' | 'error' = 'info',
  timeoutMs?: number,
): void {
  if (captureFeedbackTimer) {
    window.clearTimeout(captureFeedbackTimer);
    captureFeedbackTimer = null;
  }

  const baseClass = 'footer-status';
  if (!message) {
    captureFeedback.textContent = '';
    captureFeedback.className = `${baseClass} is-hidden`;
    return;
  }

  const toneClass = `${baseClass}--${tone}`;
  captureFeedback.textContent = message;
  captureFeedback.className = `${baseClass} ${toneClass}`;

  if (typeof timeoutMs === 'number' && timeoutMs > 0) {
    captureFeedbackTimer = window.setTimeout(() => {
      setCaptureFeedback(null);
    }, timeoutMs);
  }
}

function updateContextMenuMoveAvailability(): void {
  const availableTargets = pages.filter((page) => page.id !== activePageId);
  const disabled = availableTargets.length === 0;
  applyMenuButtonState(contextMenuMoveButton, !disabled);
  contextMenuMoveButton.title = disabled
    ? 'Create another page to move items'
    : 'Move selection to another page';
  if (disabled) {
    hideContextSubmenu();
  }
}

function updateContextMenuNavigateAvailability(): void {
  const disabled = pages.length <= 1;
  applyMenuButtonState(contextMenuNavigateButton, !disabled);
  contextMenuNavigateButton.title = disabled
    ? 'Create another page to navigate'
    : 'Jump to another page';
  if (disabled && contextSubmenuMode === 'navigate') {
    hideContextSubmenu();
  }
}

function renderPages() {
  pageList.replaceChildren(
    ...pages.map((page) => {
      const item = document.createElement('li');
      item.dataset.page = page.id;
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'menu-item';
      button.textContent = page.name;
      item.appendChild(button);
      if (page.id === activePageId) {
        item.classList.add('active');
      }
      return item;
    }),
  );

  settingsPageList.replaceChildren(
    ...pages.map((page) => {
      const item = document.createElement('div');
      item.className = 'settings-list-item';
      item.dataset.page = page.id;

      const isActive = page.id === activePageId;
      if (isActive) {
        item.classList.add('settings-list-item--active');
      }

      const info = document.createElement('div');
      info.className = 'list-item-info';

      const icon = document.createElement('span');
      icon.className = 'item-icon';
      icon.textContent = '📄';

      const details = document.createElement('div');
      details.className = 'item-details';

      const name = document.createElement('span');
      name.className = 'item-name';
      name.textContent = page.name;

      details.appendChild(name);
      info.append(icon, details);

      const actions = document.createElement('div');
      actions.className = 'list-item-actions';

      const renameButton = document.createElement('button');
      renameButton.type = 'button';
      renameButton.className = 'icon-btn icon-btn--small';
      renameButton.dataset.action = 'rename';
      renameButton.title = 'Rename';
      renameButton.textContent = '✏️';

      const deleteButton = document.createElement('button');
      deleteButton.type = 'button';
      deleteButton.className = 'icon-btn icon-btn--small icon-btn--danger';
      deleteButton.dataset.action = 'delete';
      deleteButton.title = 'Delete';
      deleteButton.textContent = '🗑️';
      if (pages.length <= 1) {
        deleteButton.disabled = true;
        deleteButton.title = 'Keep at least one page';
      }

      actions.append(renameButton, deleteButton);
      item.append(info, actions);
      return item;
    }),
  );
  updatePageIndicator();
  updatePageNavButtons();
  updateContextMenuMoveAvailability();
  updateContextMenuNavigateAvailability();
}

function handlePageCreate(): void {
  openPageCreateModal();
}

function resetPageCreateModal() {
  pageCreateForm.reset();
  pageCreateError.textContent = '';
  pageCreateInput.disabled = false;
  pageCreateSubmit.disabled = false;
  pageCreateCancel.disabled = false;
  pageCreateInput.placeholder = `Page ${nextPageNumber}`;
}

function openPageCreateModal() {
  resetPageCreateModal();
  if (!pageCreateModal.open) {
    pageCreateModal.showModal();
  }
  requestAnimationFrame(() => {
    pageCreateInput.focus();
  });
}

function closePageCreateModal() {
  if (pageCreateModal.open) {
    pageCreateModal.close();
  }
  resetPageCreateModal();
}

async function createPageWithName(name: string): Promise<void> {
  persistActivePageState({ force: true });
  const pageNumber = nextPageNumber;
  nextPageNumber += 1;
  const page: PageItem = {
    id: `page-${pageNumber}`,
    name: name || `Page ${pageNumber}`,
  };
  pages.push(page);
  delete pageStates[page.id];

  // Hide context submenu if it's showing page lists (they're now stale)
  if (contextSubmenuVisible && (contextSubmenuMode === 'move' || contextSubmenuMode === 'navigate')) {
    hideContextSubmenu();
  }

  await setActivePage(page.id, { persist: false, schedule: false });
  syncPreferencesWithPages();
  savePreferences();
  scheduleSave();
}

// Rename modal helpers
type RenameContext =
  | { type: 'workspace'; name: string }
  | { type: 'page'; pageId: string; name: string };

let currentRenameContext: RenameContext | null = null;

function resetRenameModal() {
  renameForm.reset();
  renameError.textContent = '';
  renameInput.disabled = false;
  renameSubmit.disabled = false;
  renameCancel.disabled = false;
  currentRenameContext = null;
}

function openRenameModal(context: RenameContext) {
  resetRenameModal();
  currentRenameContext = context;

  if (context.type === 'workspace') {
    renameTitle.textContent = 'Rename Workspace';
    renameInput.value = context.name;
  } else {
    renameTitle.textContent = 'Rename Page';
    renameInput.value = context.name;
  }

  if (!renameModal.open) {
    renameModal.showModal();
  }
  requestAnimationFrame(() => {
    renameInput.select();
    renameInput.focus();
  });
}

function closeRenameModal() {
  if (renameModal.open) {
    renameModal.close();
  }
  resetRenameModal();
}

async function handleRenameSubmit(): Promise<void> {
  if (!currentRenameContext) return;

  const trimmed = renameInput.value.trim();
  if (!trimmed) {
    renameError.textContent = 'Name cannot be empty';
    return;
  }

  renameInput.disabled = true;
  renameSubmit.disabled = true;
  renameCancel.disabled = true;
  renameError.textContent = '';

  try {
    if (currentRenameContext.type === 'workspace') {
      const slug = await window.workspaceAPI.rename(currentRenameContext.name, trimmed);
      await populateWorkspaces(slug);
      closeRenameModal();
    } else {
      renamePage(currentRenameContext.pageId, trimmed);
      closeRenameModal();
    }
  } catch (error) {
    console.error('Rename failed', error);
    renameError.textContent = error instanceof Error ? error.message : 'Failed to rename';
    renameInput.disabled = false;
    renameSubmit.disabled = false;
    renameCancel.disabled = false;
  }
}

// Confirm modal helpers
function showConfirmModal(options: { title: string; message: string }): Promise<boolean> {
  return new Promise((resolve) => {
    confirmTitle.textContent = options.title;
    confirmMessage.textContent = options.message;

    const handleSubmit = (event: Event) => {
      event.preventDefault();
      cleanup();
      confirmModal.close();
      resolve(true);
    };

    const handleCancel = () => {
      cleanup();
      confirmModal.close();
      resolve(false);
    };

    const cleanup = () => {
      confirmForm.removeEventListener('submit', handleSubmit);
      confirmCancel.removeEventListener('click', handleCancel);
      confirmModal.removeEventListener('cancel', handleCancel);
    };

    confirmForm.addEventListener('submit', handleSubmit);
    confirmCancel.addEventListener('click', handleCancel);
    confirmModal.addEventListener('cancel', handleCancel);

    confirmModal.showModal();
  });
}

async function showDisplaySelectModal(): Promise<number | null> {
  return new Promise((resolve) => {
    const handleSelection = (displayId: number) => {
      displaySelectModal.close();
      displaySelectList.replaceChildren();
      resolve(displayId);
    };

    const handleCancel = () => {
      displaySelectModal.close();
      displaySelectList.replaceChildren();
      resolve(null);
    };

    window.workspaceAPI.getDisplays().then((displays) => {
      if (displays.length === 1) {
        resolve(displays[0].id);
        return;
      }

      displaySelectList.replaceChildren(
        ...displays.map((display) => {
          const item = document.createElement('li');
          const button = document.createElement('button');
          button.type = 'button';
          button.textContent = display.label;
          button.addEventListener('click', () => handleSelection(display.id));
          item.appendChild(button);
          return item;
        }),
      );

      displaySelectCancel.onclick = handleCancel;
      displaySelectModal.oncancel = handleCancel;

      displaySelectModal.showModal();
    });
  });
}

async function setActivePage(
  pageId: string,
  options?: { persist?: boolean; schedule?: boolean },
): Promise<void> {
  if (!pages.some((page) => page.id === pageId)) {
    return;
  }
  if (activePageId === pageId) {
    return;
  }

  const shouldPersist = options?.persist ?? true;
  const shouldSchedule = options?.schedule ?? true;

  if (shouldPersist) {
    persistActivePageState({ force: true });
  }

  activePageId = pageId;
  renderPages();

  await loadPageState(pageId);

  syncPreferencesWithPages();
  savePreferences();

  if (shouldSchedule) {
    scheduleSave();
  }
}

function renamePage(pageId: string, name: string) {
  const page = pages.find((p) => p.id === pageId);
  if (!page) return;
  page.name = name;

  // Hide context submenu if it's showing page lists (they're now stale)
  if (contextSubmenuVisible && (contextSubmenuMode === 'move' || contextSubmenuMode === 'navigate')) {
    hideContextSubmenu();
  }

  renderPages();
  syncPreferencesWithPages();
  savePreferences();
  scheduleSave();
}

async function deletePage(pageId: string): Promise<void> {
  if (pages.length <= 1) return;
  persistActivePageState({ force: true });
  pages = pages.filter((page) => page.id !== pageId);
  delete pageStates[pageId];

  // Hide context submenu if it's showing page lists (they're now stale)
  if (contextSubmenuVisible && (contextSubmenuMode === 'move' || contextSubmenuMode === 'navigate')) {
    hideContextSubmenu();
  }

  const wasActivePage = pageId === activePageId;
  const targetPageId = pages.some((page) => page.id === activePageId)
    ? activePageId
    : pages[0]?.id ?? null;

  if (targetPageId) {
    if (wasActivePage) {
      // Deleted the active page, need to switch to another page
      await setActivePage(targetPageId, { persist: false, schedule: false });
    } else {
      // Deleted a non-active page, just update the UI
      renderPages();
    }
  } else {
    // No pages left (shouldn't happen due to length check, but handle it)
    activePageId = null;
    renderPages();
    fabricCanvas.clear();
    fabricCanvas.discardActiveObject();
    fabricCanvas.renderAll();
  }

  syncPreferencesWithPages();
  savePreferences();
  scheduleSave();
}

function activateNextPage(): void {
  if (!activePageId) return;
  const index = pages.findIndex((page) => page.id === activePageId);
  if (index === -1) return;
  const next = pages[index + 1];
  if (next) {
    void setActivePage(next.id);
  }
}

function activatePreviousPage(): void {
  if (!activePageId) return;
  const index = pages.findIndex((page) => page.id === activePageId);
  if (index <= 0) return;
  const prev = pages[index - 1];
  if (prev) {
    void setActivePage(prev.id);
  }
}

function refreshSettingsModal() {
  renderSettingsWorkspaceList(currentWorkspaces);
  renderPages();
}

function wireEvents() {
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  window.electronAPI.on('workspace:asset-updated', (payload) => {
    handleWorkspaceAssetUpdated(payload);
  });

  const dropdowns: Array<{ trigger: HTMLButtonElement; container: HTMLElement }> = [
    { trigger: workspaceMenuToggle, container: workspaceDropdown },
    { trigger: pageMenuToggle, container: pageDropdown },
    { trigger: zoomMenuToggle, container: zoomDropdown },
  ];

  dropdowns.forEach(({ trigger, container }) => {
    trigger.addEventListener('click', (event) => {
      event.preventDefault();
      openDropdown(container);
    });
  });

  workspaceCreatePanelButton.addEventListener('click', () => {
    closeActiveDropdown();
    handleWorkspaceCreate();
  });

  workspaceCreateForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (workspaceCreateInFlight) return;
    const value = workspaceCreateInput.value.trim();
    if (!value) {
      workspaceCreateError.textContent = 'Enter a workspace name';
      workspaceCreateInput.focus();
      return;
    }
    workspaceCreateError.textContent = '';
    workspaceCreateInFlight = true;
    workspaceCreateInput.disabled = true;
    workspaceCreateSubmit.disabled = true;
    workspaceCreateCancel.disabled = true;
    try {
      await createWorkspaceWithName(value);
      closeWorkspaceCreateModal();
      setCaptureFeedback('Workspace created', 'success', 2500);
    } catch (error) {
      console.error('Failed to create workspace', error);
      workspaceCreateError.textContent =
        error instanceof Error ? error.message : 'Failed to create workspace';
      workspaceCreateInput.focus();
    } finally {
      workspaceCreateInFlight = false;
      workspaceCreateInput.disabled = false;
      workspaceCreateSubmit.disabled = false;
      workspaceCreateCancel.disabled = false;
    }
  });

  workspaceCreateCancel.addEventListener('click', (event) => {
    event.preventDefault();
    closeWorkspaceCreateModal();
  });

  pageCreateForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const value = pageCreateInput.value.trim();
    const pageName = value || `Page ${nextPageNumber}`;
    pageCreateError.textContent = '';
    pageCreateInput.disabled = true;
    pageCreateSubmit.disabled = true;
    pageCreateCancel.disabled = true;
    try {
      await createPageWithName(pageName);
      closePageCreateModal();
    } catch (error) {
      console.error('Failed to create page', error);
      pageCreateError.textContent =
        error instanceof Error ? error.message : 'Failed to create page';
      pageCreateInput.focus();
    } finally {
      pageCreateInput.disabled = false;
      pageCreateSubmit.disabled = false;
      pageCreateCancel.disabled = false;
    }
  });

  pageCreateCancel.addEventListener('click', (event) => {
    event.preventDefault();
    closePageCreateModal();
  });

  renameForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    await handleRenameSubmit();
  });

  renameCancel.addEventListener('click', (event) => {
    event.preventDefault();
    closeRenameModal();
  });

  renameModal.addEventListener('cancel', (event) => {
    event.preventDefault();
    closeRenameModal();
  });

  renameModal.addEventListener('close', () => {
    resetRenameModal();
  });

  workspaceCreateModal.addEventListener('cancel', (event) => {
    event.preventDefault();
    closeWorkspaceCreateModal();
  });

  pageCreateModal.addEventListener('cancel', (event) => {
    event.preventDefault();
    closePageCreateModal();
  });

  workspaceCreateModal.addEventListener('close', () => {
    workspaceCreateInFlight = false;
    resetWorkspaceCreateModal();
  });

  openSettingsFromPanelButton.addEventListener('click', () => {
    closeActiveDropdown();
    refreshSettingsModal();
    handleTabChange('workspaces');
    settingsModal.showModal();
  });

  openSettingsButton.addEventListener('click', () => {
    closeActiveDropdown();
    refreshSettingsModal();
    handleTabChange('workspaces');
    settingsModal.showModal();
  });

  settingsWorkspaceList.addEventListener('click', async (event) => {
    const target = event.target as HTMLElement;

    // Check if the clicked element is an action button first
    const actionButton = target.matches('button[data-action]')
      ? target as HTMLButtonElement
      : target.closest<HTMLButtonElement>('button[data-action]');

    if (actionButton) {
      event.stopPropagation();
      const item = actionButton.closest<HTMLDivElement>('[data-workspace]');
      if (!item) return;
      const workspace = item.dataset.workspace ?? '';
      if (!workspace) return;

      const action = actionButton.dataset.action;
      if (action === 'rename') {
        openRenameModal({ type: 'workspace', name: workspace });
        return;
      }
      if (action === 'delete') {
        if (currentWorkspaces.length <= 1) {
          return;
        }
        const confirmed = await showConfirmModal({
          title: 'Delete Workspace',
          message: `Delete workspace "${workspace}"? This will remove its saved images.`,
        });
        if (!confirmed) return;
        actionButton.disabled = true;
        try {
          await window.workspaceAPI.remove(workspace);
          await populateWorkspaces();
        } catch (error) {
          console.error('Failed to delete workspace', error);
        } finally {
          actionButton.disabled = false;
        }
        return;
      }
      return;
    }

    // If no action button was clicked, check if clicking on item to switch workspace
    const item = target.closest<HTMLDivElement>('[data-workspace]');
    if (!item) return;
    const workspace = item.dataset.workspace ?? '';
    if (!workspace) return;

    if (workspace !== activeWorkspace) {
      await loadWorkspace(workspace);
    }
  });

  workspaceList.addEventListener('click', async (event) => {
    const item = (event.target as HTMLElement).closest<HTMLLIElement>('li[data-workspace]');
    if (!item) return;
    const workspace = item.dataset.workspace ?? '';
    if (!workspace) return;
    closeActiveDropdown();
    if (workspace !== activeWorkspace) {
      await loadWorkspace(workspace);
    }
  });

  pageList.addEventListener('click', (event) => {
    const target = (event.target as HTMLElement).closest<HTMLLIElement>('li[data-page]');
    if (!target) return;
    const pageId = target.dataset.page ?? '';
    if (!pageId) return;
    closeActiveDropdown();
    void setActivePage(pageId);
  });

  pageNavBack.addEventListener('click', () => {
    activatePreviousPage();
  });

  pageNavForward.addEventListener('click', () => {
    activateNextPage();
  });

  pageCreateButton.addEventListener('click', () => {
    closeActiveDropdown();
    handlePageCreate();
  });

  settingsWorkspaceCreateButton.addEventListener('click', handleWorkspaceCreate);

  settingsPageCreateButton.addEventListener('click', () => {
    handlePageCreate();
  });

  settingsPageList.addEventListener('click', async (event) => {
    const target = event.target as HTMLElement;

    // Check if the clicked element is an action button first
    const actionButton = target.matches('button[data-action]')
      ? target as HTMLButtonElement
      : target.closest<HTMLButtonElement>('button[data-action]');

    if (actionButton) {
      event.stopPropagation();
      const item = actionButton.closest<HTMLDivElement>('[data-page]');
      if (!item) return;
      const pageId = item.dataset.page ?? '';
      if (!pageId) return;

      const action = actionButton.dataset.action;
      if (action === 'rename') {
        const page = pages.find((p) => p.id === pageId);
        if (!page) return;
        openRenameModal({ type: 'page', pageId, name: page.name });
        return;
      }
      if (action === 'delete') {
        if (pages.length <= 1) return;
        const page = pages.find((p) => p.id === pageId);
        const confirmed = await showConfirmModal({
          title: 'Delete Page',
          message: `Delete page "${page?.name ?? 'this page'}"? This cannot be undone.`,
        });
        if (!confirmed) return;
        void deletePage(pageId);
        return;
      }
      return;
    }

    // If no action button, check if clicking on the item itself to switch page
    const item = target.closest<HTMLDivElement>('[data-page]');
    if (!item) return;
    const pageId = item.dataset.page ?? '';
    if (!pageId) return;

    void setActivePage(pageId);
  });

  zoomMenu.addEventListener('click', (event) => {
    const button = (event.target as HTMLElement).closest<HTMLButtonElement>('button[data-zoom]');
    if (!button) return;
    const value = button.dataset.zoom ?? '';
    if (value === 'fit') {
      fitToScreen({ announce: true });
    } else if (value === 'reset') {
      resetZoom({ announce: true });
    } else {
      const numeric = Number(value);
      if (Number.isFinite(numeric)) {
        setCanvasZoom(numeric, { announce: true });
      }
    }
    closeActiveDropdown();
  });

  contextMenu.addEventListener('click', (event) => {
    const button = (event.target as HTMLElement).closest<HTMLButtonElement>('button[data-action]');
    if (!button) return;
    event.preventDefault();
    event.stopPropagation();
    const action = button.dataset.action;
    if (action === 'paste') {
      hideContextMenu();
      void handleContextMenuPaste();
      return;
    }
    if (action === 'navigate') {
      if (!button.disabled) {
        showNavigateToPageSubmenu();
      }
      return;
    }
    if (action === 'move') {
      if (!button.disabled) {
        showMoveToPageSubmenu();
      }
      return;
    }
    if (action === 'front') {
      hideContextMenu();
      adjustSelectionStack('front');
      return;
    }
    if (action === 'back') {
      hideContextMenu();
      adjustSelectionStack('back');
      return;
    }
    if (action === 'delete') {
      hideContextMenu();
      deleteSelectedObjects();
    }
  });

  contextMenu.addEventListener('contextmenu', (event) => {
    event.preventDefault();
  });

  contextMenu.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && contextMenuVisible) {
      event.preventDefault();
      hideContextMenu();
    }
  });

  contextSubmenuList.addEventListener('click', (event) => {
    const button = (event.target as HTMLElement).closest<HTMLButtonElement>('button[data-page-id]');
    if (!button) return;
    event.preventDefault();
    event.stopPropagation();
    const pageId = button.dataset.pageId ?? '';
    if (!pageId) return;
    if (contextSubmenuMode === 'navigate') {
      hideContextMenu();
      void setActivePage(pageId);
      return;
    }
    moveSelectionToPage(pageId);
    hideContextMenu();
  });

  contextSubmenuList.addEventListener('keydown', (event) => {
    const target = event.target as HTMLElement;
    if (!(target instanceof HTMLButtonElement)) {
      return;
    }
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      const buttons = Array.from(
        contextSubmenuList.querySelectorAll<HTMLButtonElement>('button[data-page-id]'),
      );
      const index = buttons.indexOf(target);
      if (index === -1) return;
      const delta = event.key === 'ArrowDown' ? 1 : -1;
      const next = buttons[index + delta] ?? buttons[(delta === 1 ? 0 : buttons.length - 1)];
      next?.focus({ preventScroll: true });
      return;
    }
    if (event.key === 'Escape') {
      event.preventDefault();
      hideContextMenu();
    }
  });

  const upperCanvas = fabricCanvas.upperCanvasEl as HTMLCanvasElement;
  upperCanvas.addEventListener('contextmenu', handleCanvasContextMenu);
  canvasElement.addEventListener('contextmenu', handleCanvasContextMenu);

  const handleWheelZoom = (event: WheelEvent) => {
    const target = event.target as HTMLElement | null;
    const isCanvasTarget =
      target === canvasElement ||
      (target instanceof HTMLElement && canvasElement.contains(target)) ||
      target === upperCanvas ||
      (target instanceof HTMLElement && upperCanvas.contains(target));
    if (!isCanvasTarget) {
      return;
    }
    const baseFactor = event.ctrlKey || event.metaKey ? 1.04 : 1.08;
    const factor = event.deltaY < 0 ? baseFactor : 1 / baseFactor;
    const pointer = fabricCanvas.getPointer(event, true);
    setCanvasZoom(currentZoom * factor, { announce: false, point: pointer });
    event.preventDefault();
  };

  upperCanvas.addEventListener('wheel', handleWheelZoom, { passive: false });
  canvasElement.addEventListener('wheel', handleWheelZoom, { passive: false });

  document.addEventListener('pointerdown', (event) => {
    const target = event.target as Node | null;
    if (
      activeDropdown &&
      (!target || !activeDropdown.contains(target))
    ) {
      closeActiveDropdown();
    }
    if (contextMenuVisible) {
      if (target && (contextMenu.contains(target) || contextSubmenu.contains(target))) {
        return;
      }
      hideContextMenu();
    }
  });

  document.addEventListener(
    'scroll',
    () => {
      if (contextMenuVisible) {
        hideContextMenu();
      }
    },
    true,
  );

  window.addEventListener('resize', hideContextMenu);
  window.addEventListener('blur', hideContextMenu);

  captureButton.addEventListener('click', async () => {
    if (!activeWorkspace) return;
    captureButton.disabled = true;
    captureButton.classList.add('is-loading');
    setCaptureFeedback('Choose a display then drag to capture…', 'info');
    try {
      const displayId = await showDisplaySelectModal();
      if (displayId === null) {
        setCaptureFeedback('Screenshot canceled', 'info', 2000);
        return;
      }

      const asset = await window.workspaceAPI.capture(activeWorkspace, displayId);
      if (asset) {
        await addImageAsset(asset);
        setCaptureFeedback('Screenshot added to workspace', 'success', 4000);
      } else {
        setCaptureFeedback('Screenshot canceled', 'info', 2000);
      }
    } catch (error) {
      console.error('Failed to capture screenshot', error);
      setCaptureFeedback('Failed to capture screenshot', 'error', 4000);
    } finally {
      captureButton.classList.remove('is-loading');
      captureButton.disabled = false;
    }
  });

  settingsClose.addEventListener('click', () => {
    settingsModal.close();
  });

  settingsCloseX.addEventListener('click', () => {
    settingsModal.close();
  });

  openReferenceButton.addEventListener('click', () => {
    closeActiveDropdown();
    referenceModal.showModal();
  });

  referenceClose.addEventListener('click', () => {
    referenceModal.close();
  });

  referenceModal.addEventListener('click', (event) => {
    if (event.target === referenceModal) {
      referenceModal.close();
    }
  });

  tabButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const tab = button.dataset.tab ?? 'workspaces';
      handleTabChange(tab);
    });
  });

  fabricCanvas.on('object:added', scheduleSave);
  fabricCanvas.on('object:removed', scheduleSave);
  fabricCanvas.on('object:modified', scheduleSave);
  fabricCanvas.on('selection:created', hideContextMenu);
  fabricCanvas.on('selection:updated', hideContextMenu);
  fabricCanvas.on('selection:cleared', hideContextMenu);
  fabricCanvas.on('mouse:dblclick', handleImageDoubleClick);

  const endPan = () => {
    if (!isPanning) return;
    isPanning = false;
    panStart = null;
    fabricCanvas.setCursor(spaceKeyPressed ? 'grab' : 'default');
    fabricCanvas.selection = true;
  };

  fabricCanvas.on('mouse:down', (event: TPointerEventInfo) => {
    const pointerEvent = event.e;
    if (!spaceKeyPressed && !isMiddleButtonEvent(pointerEvent)) {
      return;
    }
    const startPoint = getPointerPosition(pointerEvent);
    if (!startPoint) {
      return;
    }
    isPanning = true;
    panStart = startPoint;
    fabricCanvas.setCursor('grabbing');
    fabricCanvas.selection = false;
    preventPointerDefault(pointerEvent);
  });

  fabricCanvas.on('mouse:move', (event: TPointerEventInfo) => {
    if (!isPanning || !panStart) {
      return;
    }
    const pointerEvent = event.e;
    const pointerPosition = getPointerPosition(pointerEvent);
    if (!pointerPosition) {
      return;
    }
    const deltaX = pointerPosition.x - panStart.x;
    const deltaY = pointerPosition.y - panStart.y;
    if (deltaX === 0 && deltaY === 0) {
      return;
    }
    fabricCanvas.relativePan(new Point(deltaX, deltaY));
    panStart = pointerPosition;
    preventPointerDefault(pointerEvent);
  });

  fabricCanvas.on('mouse:up', () => {
    endPan();
  });

  fabricCanvas.on('mouse:out', () => {
    endPan();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      if (contextMenuVisible) {
        event.preventDefault();
        hideContextMenu();
        return;
      }
      if (activeDropdown) {
        event.preventDefault();
        closeActiveDropdown();
        return;
      }
    }
    const target = event.target as HTMLElement | null;
    const isEditable = isEditableTarget(target);
    if (event.code === 'Space' && !spaceKeyPressed && !isEditable) {
      spaceKeyPressed = true;
      fabricCanvas.setCursor(isPanning ? 'grabbing' : 'grab');
      event.preventDefault();
      return;
    }
    if (event.key === 'PageUp' || event.key === 'PageDown') {
      event.preventDefault();
      const factor = event.key === 'PageUp' ? 1.15 : 1 / 1.15;
      setCanvasZoom(currentZoom * factor, { announce: true });
      return;
    }
    if ((event.key === 'ArrowRight' || event.key === 'ArrowLeft') && event.ctrlKey && pages.length > 0) {
      event.preventDefault();
      if (!activePageId) {
        void setActivePage(pages[0].id);
        return;
      }
      const index = pages.findIndex((page) => page.id === activePageId);
      if (index === -1) {
        void setActivePage(pages[0].id);
        return;
      }
      const delta = event.key === 'ArrowRight' ? 1 : -1;
      const nextIndex = (index + delta + pages.length) % pages.length;
      void setActivePage(pages[nextIndex].id);
      return;
    }
    if ((event.key === 'Delete' || event.key === 'Backspace') && !isEditable) {
      if (getActiveCanvasObjects().length > 0) {
        event.preventDefault();
        deleteSelectedObjects();
      }
    }
  });

  document.addEventListener('keyup', (event) => {
    if (event.code === 'Space') {
      spaceKeyPressed = false;
      if (!isPanning) {
        fabricCanvas.setCursor('default');
      }
    }
  });

  document.addEventListener('dragover', (event) => {
    event.preventDefault();
    if (event.dataTransfer) {
      event.dataTransfer.dropEffect = 'copy';
    }
  });

  document.addEventListener('drop', async (event) => {
    event.preventDefault();
    if (!activeWorkspace) return;

    const { files, urls, inlineFiles } = await collectDataTransferPayload(
      event.dataTransfer,
      { label: 'Drop' },
    );
    console.debug('Drop payload', {
      files,
      urls,
      inlineFiles: inlineFiles.length,
    });
    if (files.length === 0 && urls.length === 0 && inlineFiles.length === 0) {
      return;
    }

    const dropCount = files.length + urls.length + inlineFiles.length;
    showDropProgress(
      dropCount > 1 ? 'Importing assets…' : DROP_PROGRESS_DEFAULT_TITLE,
      dropCount > 1
        ? `Processing ${dropCount} items…`
        : DROP_PROGRESS_DEFAULT_SUBTITLE,
    );

    await ingestAndHandleAssets(activeWorkspace, { files, urls, inlineFiles }, {
      sourceLabel: 'drop',
      failureTitle: 'Import failed',
      failureSubtitle: 'We could not add these files. Check the logs for details.',
      emptyMessage: 'Nothing new to add.',
    });
  });

  document.addEventListener('paste', async (event) => {
    if (!activeWorkspace) return;
    const target = event.target as HTMLElement | null;
    if (isEditableTarget(target)) {
      return;
    }

    const transfer = event.clipboardData;
    if (!transfer) {
      return;
    }

    const types = Array.from(transfer.types ?? []);
    const hasImageItem = Array.from(transfer.items ?? []).some(
      (item) => item.kind === 'file' && item.type.startsWith('image/'),
    );
    const hasImageFile = Array.from(transfer.files ?? []).some((file) =>
      file.type.startsWith('image/'),
    );
    const hasFilesType = types.includes('Files');
    const hasImageType = types.some((type) => type.startsWith('image/'));

    if (!hasImageItem && !hasImageFile && !hasFilesType && !hasImageType) {
      return;
    }

    event.preventDefault();

    const { files, urls, inlineFiles } = await collectDataTransferPayload(transfer, {
      label: 'Paste',
    });
    console.debug('Paste payload', {
      files,
      urls,
      inlineFiles: inlineFiles.length,
    });

    const pasteCount = files.length + urls.length + inlineFiles.length;
    if (pasteCount === 0) {
      showDropProgress('Nothing to paste', 'Clipboard did not contain an image.');
      hideDropProgress(1600);
      return;
    }

    showDropProgress(
      pasteCount > 1 ? 'Importing assets…' : DROP_PROGRESS_DEFAULT_TITLE,
      pasteCount > 1 ? `Processing ${pasteCount} items…` : PASTE_PROGRESS_SUBTITLE,
    );

    await ingestAndHandleAssets(activeWorkspace, { files, urls, inlineFiles }, {
      sourceLabel: 'paste',
      failureTitle: 'Paste failed',
      failureSubtitle: 'We could not add this clipboard content. Check the logs for details.',
      emptyMessage: 'Clipboard did not contain new assets.',
    });
  });
}

async function bootstrap() {
  // Set app name with version (limit to major.minor)
  const versionShort = APP_VERSION.split('.').slice(0, 2).join('.');
  appNameElement.textContent = `ArtBoard v${versionShort}`;

  // Set about panel version
  const aboutVersionElement = document.getElementById('about-version');
  if (aboutVersionElement) {
    aboutVersionElement.textContent = `Version ${versionShort}`;
  }

  wireEvents();
  await populateWorkspaces();
  renderPages();
  updatePageIndicator();
  setCanvasZoom(currentZoom, { persist: false });
}

void bootstrap();

export {};

async function ingestAndHandleAssets(
  workspace: string,
  payload: AssetIngestRequest,
  context: {
    sourceLabel: string;
    failureTitle: string;
    failureSubtitle: string;
    emptyMessage: string;
  },
): Promise<void> {
  const { sourceLabel, failureTitle, failureSubtitle, emptyMessage } = context;
  try {
    const ingestResult = await window.workspaceAPI.ingest(workspace, payload);
    const assets = Array.isArray(ingestResult)
      ? ingestResult
      : ingestResult?.assets ?? [];
    const failures = Array.isArray(ingestResult)
      ? []
      : ingestResult?.failures ?? [];
    console.debug(`Ingested ${sourceLabel} assets`, { assets, failures });

    if (assets.length === 0 && failures.length === 0) {
      updateDropProgress(emptyMessage);
      hideDropProgress(900);
      return;
    }

    if (assets.length > 0) {
      updateDropProgress(
        assets.length > 1
          ? `Placing ${assets.length} assets on the canvas…`
          : 'Placing asset on the canvas…',
      );

      for (const asset of assets) {
        try {
          await addImageAsset(asset);
        } catch (error) {
          console.error('Failed to add image asset', asset, error);
        }
      }
    }

    if (failures.length > 0) {
      handleIngestFailures(failures, assets.length);
      return;
    }

    dropProgressTitle.textContent = assets.length > 1 ? 'Assets added!' : 'Asset added!';
    updateDropProgress('All set.');
    hideDropProgress(900);
  } catch (error) {
    console.error(`Failed to ingest ${sourceLabel} assets`, error);
    dropProgressTitle.textContent = failureTitle;
    updateDropProgress(failureSubtitle);
    hideDropProgress(2400);
  }
}

async function collectDataTransferPayload(
  transfer: DataTransfer | null,
  context: { label: string },
): Promise<{
  files: string[];
  urls: string[];
  inlineFiles: InlineAssetPayload[];
}> {
  const { label } = context;
  const types = Array.from(transfer?.types ?? []);
  console.debug(`${label} types`, types);

  const filePaths = new Set<string>();
  const inlineFiles: InlineAssetPayload[] = [];
  const inlineBlobCandidates: File[] = [];

  for (const file of Array.from(transfer?.files ?? [])) {
    const candidatePath = (file as File & { path?: string }).path;
    if (candidatePath && candidatePath.trim()) {
      filePaths.add(candidatePath);
      continue;
    }
    inlineBlobCandidates.push(file);
  }

  const uriList = transfer?.getData('text/uri-list') ?? '';
  const text = transfer?.getData('text/plain') ?? '';
  const html = transfer?.getData('text/html') ?? '';

  if (uriList || text || html) {
    console.debug(`${label} raw payload`, {
      uriList: uriList.slice(0, 512),
      text: text.slice(0, 512),
      html: html.slice(0, 512),
    });
  }

  const fileCandidates = new Set<string>();
  const candidateUrls = new Set<string>();
  const dataUrlCandidates = new Set<string>();

  const collectDataUriCandidate = (value: string): boolean => {
    if (!value || !value.startsWith('data:')) {
      return false;
    }
    dataUrlCandidates.add(value);
    return true;
  };

  const addUrlCandidate = (value: string) => {
    if (!value) {
      return;
    }
    if (collectDataUriCandidate(value)) {
      return;
    }
    expandDropUrlCandidates(value).forEach((candidate) => {
      candidateUrls.add(candidate);
    });
  };

  uriList
    .split(/\r?\n/)
    .map((value) => value.trim())
    .filter(Boolean)
    .forEach((value) => {
      if (value.startsWith('file://')) {
        fileCandidates.add(value);
        return;
      }
      addUrlCandidate(value);
    });

  const plain = text.trim();
  if (plain) {
    if (plain.startsWith('file://')) {
      fileCandidates.add(plain);
    } else {
      extractUrlsFromText(plain).forEach((candidate) => {
        addUrlCandidate(candidate);
      });
      addUrlCandidate(plain);
    }
  }

  if (html) {
    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      doc.querySelectorAll('img[src]').forEach((img) => {
        const src = img.getAttribute('src');
        if (!src) return;
        if (src.startsWith('file://')) {
          fileCandidates.add(src);
        } else if (!collectDataUriCandidate(src) && isHttpUrl(src)) {
          addUrlCandidate(src);
        }
      });
      doc.querySelectorAll('a[href]').forEach((anchor) => {
        const href = anchor.getAttribute('href');
        if (!href) return;
        if (href.startsWith('file://')) {
          fileCandidates.add(href);
        } else if (!collectDataUriCandidate(href) && isHttpUrl(href)) {
          addUrlCandidate(href);
        }
      });
      doc.querySelectorAll('img, source, [data-src], [data-url], [data-href], [data-large-src], [data-fullsize]').forEach((element) => {
        Array.from(element.attributes)
          .filter((attr) => /src|href|url/i.test(attr.name))
          .map((attr) => attr.value)
          .filter(Boolean)
          .forEach((value) => {
            if (value.startsWith('file://')) {
              fileCandidates.add(value);
              return;
            }
            if (!collectDataUriCandidate(value) && isHttpUrl(value)) {
              addUrlCandidate(value);
            }
          });
      });
      doc.querySelectorAll('[srcset]').forEach((element) => {
        const srcset = element.getAttribute('srcset');
        if (!srcset) return;
        extractSrcsetUrls(srcset).forEach((candidate) => {
          if (candidate.startsWith('file://')) {
            fileCandidates.add(candidate);
          } else if (!collectDataUriCandidate(candidate) && isHttpUrl(candidate)) {
            addUrlCandidate(candidate);
          }
        });
      });
      doc.querySelectorAll('meta[itemprop="image"], meta[property="og:image"], meta[name="og:image"], meta[name="twitter:image"]').forEach((meta) => {
        const content = meta.getAttribute('content');
        if (!content) return;
        if (content.startsWith('file://')) {
          fileCandidates.add(content);
        } else if (!collectDataUriCandidate(content) && isHttpUrl(content)) {
          addUrlCandidate(content);
        }
      });
    } catch (error) {
      console.warn('Failed to parse dropped HTML', error);
    }
  }

  const normalizedFilePaths = Array.from(fileCandidates).map((value) =>
    fileUrlToPath(value),
  );

  for (const value of dataUrlCandidates) {
    const inline = await createInlineAssetFromDataUrl(value);
    if (inline) {
      inlineFiles.push(inline);
    }
  }

  console.debug('Candidate aggregator', {
    fileCandidates: Array.from(fileCandidates),
    httpCandidates: Array.from(candidateUrls),
  });

  const inlineBlobResults = await Promise.all(
    inlineBlobCandidates.map(async (file) => {
      try {
        if (file.size === 0) {
          console.debug('Skipped inline file with zero size', {
            name: file.name,
            type: file.type,
          });
          return null;
        }
        const arrayBuffer = await file.arrayBuffer();
        if (arrayBuffer.byteLength === 0) {
          console.debug('Skipped inline file with empty buffer', {
            name: file.name,
            type: file.type,
          });
          return null;
        }
        console.debug('Collected inline file from File', {
          name: file.name,
          type: file.type,
          size: arrayBuffer.byteLength,
        });
        return {
          name: file.name || undefined,
          mimeType: file.type || undefined,
          data: new Uint8Array(arrayBuffer),
        } satisfies InlineAssetPayload;
      } catch (error) {
        console.warn('Failed to read dropped file blob', error);
        return null;
      }
    }),
  );

  inlineBlobResults
    .filter((entry): entry is InlineAssetPayload => Boolean(entry))
    .forEach((entry) => {
      inlineFiles.push(entry);
    });

  return {
    files: Array.from(new Set([...filePaths, ...normalizedFilePaths])),
    urls: Array.from(candidateUrls),
    inlineFiles,
  };
}

function handleIngestFailures(failures: AssetIngestFailure[], succeededCount: number): void {
  if (failures.length === 0) {
    return;
  }

  const hasSuccesses = succeededCount > 0;
  const chatGptFailures = failures.filter((failure) => isChatGPTContentUrl(failure.source));

  if (chatGptFailures.length > 0) {
    dropProgressTitle.textContent = hasSuccesses ? 'Some assets need attention' : 'Sign-in required';
    updateDropProgress(
      'ChatGPT requires an authenticated browser session. We opened the link in your browser—choose Download there, then drag the saved file into Artboard.',
    );
    const link = chatGptFailures[0]?.source;
    if (link && window.electronAPI?.openExternal) {
      void window.electronAPI.openExternal(link);
    }
    hideDropProgress(6400);
    return;
  }

  dropProgressTitle.textContent = hasSuccesses ? 'Some assets skipped' : 'Import incomplete';
  const summary = failures
    .map((failure) => failure.message || failure.source)
    .slice(0, 2)
    .join('\n');
  updateDropProgress(summary || 'One or more items could not be imported.');
  hideDropProgress(4800);
}

async function createInlineAssetFromDataUrl(
  value: string,
): Promise<InlineAssetPayload | null> {
  try {
    const response = await fetch(value);
    const arrayBuffer = await response.arrayBuffer();
    if (arrayBuffer.byteLength === 0) {
      return null;
    }
    const mimeTypeHeader = response.headers.get('content-type') ?? '';
    const mimeType =
      mimeTypeHeader ||
      (() => {
        const match = /^data:([^;,]+)/i.exec(value);
        return match && match[1] ? match[1] : '';
      })();
    return {
      name: extractDataUrlFilename(value),
      mimeType: mimeType || undefined,
      data: new Uint8Array(arrayBuffer),
    };
  } catch (error) {
    console.warn('Failed to decode dropped data URL', error);
    return null;
  }
}

function extractDataUrlFilename(value: string): string | undefined {
  const match =
    /;(?:name|filename)\*?=(?:UTF-8''|")?([^;",]+)"?/i.exec(value) ??
    /;(?:name|filename)=([^;,]+)/i.exec(value);
  if (!match || !match[1]) {
    return undefined;
  }
  const cleaned = match[1].trim().replace(/^"(.*)"$/, '$1');
  try {
    return decodeURIComponent(cleaned);
  } catch {
    return cleaned;
  }
}

function isChatGPTContentUrl(value: string): boolean {
  try {
    const host = new URL(value).hostname.toLowerCase();
    return host.endsWith('chatgpt.com') || host.endsWith('chat.openai.com');
  } catch {
    return value.includes('chatgpt.com');
  }
}

function extractUrlsFromText(value: string): string[] {
  if (!value) {
    return [];
  }
  const pattern = /\bhttps?:\/\/[^\s"'<>]+/gi;
  const results = new Set<string>();
  let match: RegExpExecArray | null;
  while ((match = pattern.exec(value)) !== null) {
    if (match[0]) {
      results.add(match[0]);
    }
  }
  return Array.from(results);
}

function extractSrcsetUrls(value: string): string[] {
  if (!value) {
    return [];
  }
  return value
    .split(',')
    .map((part) => part.trim().split(/\s+/)[0])
    .filter(Boolean);
}

function isHttpUrl(value: string): boolean {
  try {
    const parsed = new URL(value);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
}

function expandDropUrlCandidates(raw: string): string[] {
  const trimmed = raw?.trim();
  if (!trimmed) {
    return [];
  }
  if (!isHttpUrl(trimmed)) {
    return [];
  }

  const result = new Set<string>();
  result.add(trimmed);

  try {
    const parsed = new URL(trimmed);
    extractGoogleImageTargets(parsed).forEach((candidate) => {
      if (isHttpUrl(candidate)) {
        result.add(candidate);
      }
    });
  } catch {
    // ignore parsing issues
  }

  return Array.from(result);
}

function extractGoogleImageTargets(url: URL): string[] {
  const host = url.hostname.toLowerCase();
  if (!host.includes('google') || !url.pathname.includes('/imgres')) {
    return [];
  }

  const params = url.searchParams;
  const results = new Set<string>();
  const primary = params.get('imgurl');
  if (primary) {
    results.add(primary);
  }
  const secondary = params.get('imgrefurl');
  if (secondary) {
    results.add(secondary);
  }
  const third = params.get('imgsrc');
  if (third) {
    results.add(third);
  }

  return Array.from(results);
}

function fileUrlToPath(value: string): string {
  try {
    const url = new URL(value);
    let pathname = decodeURIComponent(url.pathname);
    if (/^\/[a-zA-Z]:/.test(pathname)) {
      pathname = pathname.slice(1);
    }
    return pathname;
  } catch {
    return value;
  }
}

async function addImageAsset(asset: AssetDescriptor): Promise<void> {
  const dataUrl = await window.workspaceAPI.readAsset(
    asset.workspace,
    asset.relativePath,
  );
  console.debug('Workspace asset read', {
    workspace: asset.workspace,
    relativePath: asset.relativePath,
    preview: dataUrl.slice(0, 64),
    absolutePath: asset.absolutePath ?? asset.path,
  });
  const isDataUrl = dataUrl.startsWith('data:');

  console.debug('Loading asset into Fabric', {
    workspace: asset.workspace,
    relativePath: asset.relativePath,
    isDataUrl,
  });

  const options = isDataUrl ? {} : { crossOrigin: 'anonymous' };

  const img = await Image.fromURL(dataUrl, options);
  if (!img) {
    throw new Error(
      `Fabric returned null image for ${asset.workspace}/${asset.relativePath}`,
    );
  }

  const center = fabricCanvas.getCenter();
  img.set({
    left: center.left,
    top: center.top,
    originX: 'center',
    originY: 'center',
  });

  img.set('artboardMeta', {
    workspace: asset.workspace,
    relativePath: asset.relativePath,
    absolutePath: asset.absolutePath ?? asset.path,
  });

  fabricCanvas.add(img);
  suppressSaves = false;
  console.debug('Canvas objects after add', fabricCanvas.getObjects().length);
  fabricCanvas.setActiveObject(img);
  fabricCanvas.renderAll();
  scheduleSave();
  console.debug('Asset added to Fabric', {
    id: img.id,
    width: img.getScaledWidth(),
    height: img.getScaledHeight(),
  });
}
