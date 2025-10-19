import { contextBridge, ipcRenderer } from 'electron';
import type { AssetDetail } from './workspace/manager.js';

type AssetUpdateResponse = {
  success: boolean;
  asset?: AssetDetail;
  error?: string;
};

type WorkspaceState = unknown;

type AssetDescriptor = {
  workspace: string;
  filename: string;
  relativePath: string;
  fileUrl: string;
  path: string;
  absolutePath: string;
};

type OpenAssetViewerPayload = {
  workspace: string;
  relativePath: string;
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

type ClipboardInspectResult = {
  canPaste: boolean;
  hasImage: boolean;
  hasFile: boolean;
  hasUrl: boolean;
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

contextBridge.exposeInMainWorld('workspaceAPI', {
  list: () => ipcRenderer.invoke('workspace:list') as Promise<string[]>,
  create: (name: string) =>
    ipcRenderer.invoke('workspace:create', name) as Promise<string>,
  load: (workspace: string) =>
    ipcRenderer.invoke('workspace:get-state', workspace) as Promise<WorkspaceState>,
  save: (workspace: string, state: WorkspaceState) =>
    ipcRenderer.invoke('workspace:save-state', workspace, state) as Promise<void>,
  rename: (current: string, nextName: string) =>
    ipcRenderer.invoke(
      'workspace:rename',
      current,
      nextName,
    ) as Promise<string>,
  remove: (workspace: string) =>
    ipcRenderer.invoke('workspace:delete', workspace) as Promise<boolean>,
  ingest: (workspace: string, payload: AssetIngestRequest) =>
    ipcRenderer.invoke(
      'workspace:ingest-assets',
      workspace,
      payload,
    ) as Promise<AssetIngestResult>,
  getDisplays: () =>
    ipcRenderer.invoke('workspace:get-displays') as Promise<Array<{ id: number; label: string }>>,
  capture: (workspace: string, displayId?: number) =>
    ipcRenderer.invoke(
      'workspace:capture-screenshot',
      workspace,
      displayId,
    ) as Promise<AssetDescriptor | null>,
  readAsset: (workspace: string, relativePath: string) =>
    ipcRenderer.invoke(
      'workspace:read-asset',
      workspace,
      relativePath,
    ) as Promise<string>,
  openAssetViewer: (payload: OpenAssetViewerPayload) =>
    ipcRenderer.invoke('workspace:open-asset-viewer', payload) as Promise<void>,
});

contextBridge.exposeInMainWorld('electronAPI', {
  on: (channel: string, listener: (...args: unknown[]) => void) => {
    ipcRenderer.on(channel, (_event, ...args) => listener(...args));
    return () => ipcRenderer.removeAllListeners(channel);
  },
  openExternal: (url: string) =>
    ipcRenderer.invoke('app:open-external', url) as Promise<boolean>,
  inspectClipboard: () =>
    ipcRenderer.invoke('clipboard:inspect') as Promise<ClipboardInspectResult>,
  readClipboardAssets: () =>
    ipcRenderer.invoke('clipboard:read-assets') as Promise<AssetIngestRequest>,
});

contextBridge.exposeInMainWorld('assetViewerAPI', {
  ready: () => {
    ipcRenderer.send('asset-viewer:ready');
  },
  onAssetData: (listener: (payload: unknown) => void) => {
    const handler = (_event: Electron.IpcRendererEvent, payload: unknown) => {
      listener(payload);
    };
    ipcRenderer.on('asset-viewer:data', handler);
    return () => ipcRenderer.removeListener('asset-viewer:data', handler);
  },
  copyToClipboard: (payload: { id: string }) =>
    ipcRenderer.invoke('asset-viewer:copy', payload) as Promise<boolean>,
  saveAs: (payload: { id: string }) =>
    ipcRenderer.invoke('asset-viewer:save', payload) as Promise<boolean>,
  convert: (payload: { id: string; format: 'png' | 'jpeg' | 'webp' }) =>
    ipcRenderer.invoke('asset-viewer:convert', payload) as Promise<boolean>,
  resize: (
    payload: {
      id: string;
      width: number;
      height: number;
      lockAspect?: boolean;
      data: Uint8Array;
      format: string;
    },
  ) =>
    ipcRenderer.invoke('asset-viewer:resize', payload) as Promise<AssetUpdateResponse>,
  crop: (payload: { id: string; x: number; y: number; width: number; height: number }) =>
    ipcRenderer.invoke('asset-viewer:crop', payload) as Promise<AssetUpdateResponse>,
});
