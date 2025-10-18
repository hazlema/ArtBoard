import { app } from 'electron';
import { randomUUID } from 'node:crypto';
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const WORKSPACES_DIR = 'workspace-data';
const IMAGES_DIR = 'images';
const METADATA_FILE = 'metadata.json';
const REMOTE_IMAGE_MAX_BYTES = 30 * 1024 * 1024; // 30 MB
const INLINE_ASSET_MIN_BYTES = 32;
const IMAGE_MIME_EXTENSION_MAP: Record<string, string> = {
  'image/png': '.png',
  'image/apng': '.apng',
  'image/jpeg': '.jpg',
  'image/jpg': '.jpg',
  'image/pjpeg': '.jpg',
  'image/gif': '.gif',
  'image/webp': '.webp',
  'image/svg+xml': '.svg',
  'image/avif': '.avif',
  'image/bmp': '.bmp',
  'image/x-ms-bmp': '.bmp',
  'image/x-icon': '.ico',
  'image/vnd.microsoft.icon': '.ico',
  'image/heic': '.heic',
  'image/heif': '.heif',
  'image/tiff': '.tiff',
  'image/x-tiff': '.tiff',
};
const ALLOWED_IMAGE_EXTENSIONS = new Set([
  '.png',
  '.apng',
  '.jpg',
  '.jpeg',
  '.gif',
  '.webp',
  '.svg',
  '.avif',
  '.bmp',
  '.ico',
  '.heic',
  '.heif',
  '.tiff',
  '.tif',
  '.jfif',
  '.pjpeg',
  '.pjp',
  '.xbm',
]);

type WorkspaceState = Record<string, unknown>;
type InlineAssetPayload = {
  name?: string;
  mimeType?: string;
  data: unknown;
};

type AssetIngestRequest = {
  files?: string[];
  urls?: string[];
  inlineFiles?: InlineAssetPayload[];
};

type AssetIngestFailureReason = 'auth' | 'network' | 'unsupported' | 'unknown';

type AssetIngestFailure = {
  source: string;
  reason: AssetIngestFailureReason;
  message?: string;
};

type AssetIngestResult = {
  assets: AssetDescriptor[];
  failures: AssetIngestFailure[];
};

type AssetDescriptor = {
  workspace: string;
  filename: string;
  path: string;
  absolutePath: string;
  relativePath: string;
  fileUrl: string;
};

type AssetDetail = AssetDescriptor & {
  sizeBytes: number;
  createdAt?: string;
  updatedAt?: string;
  format: string;
};

class RemoteAssetError extends Error {
  readonly source: string;
  readonly reason: AssetIngestFailureReason;

  constructor(source: string, reason: AssetIngestFailureReason, message: string, options?: { cause?: unknown }) {
    super(message);
    this.name = 'RemoteAssetError';
    this.source = source;
    this.reason = reason;
    if (options?.cause !== undefined) {
      // @ts-expect-error Node <20 compatibility
      this.cause = options.cause;
    }
  }
}

export class WorkspaceManager {
  private rootPath: string | null = null;

  private getDefaultState(): WorkspaceState {
    return {
      objects: [],
      updatedAt: new Date().toISOString(),
    };
  }

  private async resolveRoot(): Promise<string> {
    if (this.rootPath) {
      return this.rootPath;
    }

    const basePath = app.getPath('userData');
    const resolved = path.join(basePath, WORKSPACES_DIR);
    this.rootPath = resolved;
    return resolved;
  }

  private async resolveWorkspaceDir(workspace: string): Promise<string> {
    const root = await this.resolveRoot();
    return path.join(root, workspace);
  }

  private async ensureImagesDir(workspace: string): Promise<string> {
    const workspaceDir = await this.resolveWorkspaceDir(workspace);
    const imagesDir = path.join(workspaceDir, IMAGES_DIR);
    await fs.mkdir(imagesDir, { recursive: true });
    return imagesDir;
  }

  async ensureRoot(): Promise<void> {
    const root = await this.resolveRoot();
    await fs.mkdir(root, { recursive: true });
  }

  private async ensureUniqueWorkspaceSlug(slug: string): Promise<string> {
    const root = await this.resolveRoot();
    let candidate = slug;
    let suffix = 1;
    while (true) {
      try {
        await fs.access(path.join(root, candidate));
        candidate = `${slug}-${suffix}`;
        suffix += 1;
      } catch {
        return candidate;
      }
    }
  }

  async listWorkspaces(): Promise<string[]> {
    await this.ensureRoot();
    const entries = await fs.readdir(await this.resolveRoot(), {
      withFileTypes: true,
    });

    return entries
      .filter((entry) => entry.isDirectory())
      .map((entry) => entry.name)
      .sort();
  }

  async createWorkspace(name: string): Promise<string> {
    const baseSlug = this.slugify(name);
    const slug = await this.ensureUniqueWorkspaceSlug(baseSlug);
    const workspaceDir = await this.resolveWorkspaceDir(slug);
    await fs.mkdir(path.join(workspaceDir, IMAGES_DIR), { recursive: true });

    const metadataPath = path.join(workspaceDir, METADATA_FILE);
    try {
      await fs.access(metadataPath);
    } catch {
      await fs.writeFile(
        metadataPath,
        JSON.stringify(this.getDefaultState(), null, 2),
        'utf8',
      );
    }

    return slug;
  }

  async renameWorkspace(current: string, nextName: string): Promise<string> {
    const currentSlug = this.slugify(current);
    const targetBase = this.slugify(nextName);
    if (targetBase === currentSlug) {
      return currentSlug;
    }
    const targetSlug = await this.ensureUniqueWorkspaceSlug(targetBase);

    if (currentSlug === targetSlug) {
      return currentSlug;
    }

    const currentDir = await this.resolveWorkspaceDir(currentSlug);
    const targetDir = await this.resolveWorkspaceDir(targetSlug);

    await fs.rename(currentDir, targetDir);
    return targetSlug;
  }

  async deleteWorkspace(name: string): Promise<void> {
    const slug = this.slugify(name);
    const workspaceDir = await this.resolveWorkspaceDir(slug);
    await fs.rm(workspaceDir, { recursive: true, force: true });
  }

  async loadWorkspace(workspace: string): Promise<WorkspaceState> {
    const workspaceDir = await this.resolveWorkspaceDir(workspace);
    const metadataPath = path.join(workspaceDir, METADATA_FILE);

    try {
      const contents = await fs.readFile(metadataPath, 'utf8');
      return JSON.parse(contents) as WorkspaceState;
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
        const fallback = this.getDefaultState();
        await this.saveWorkspace(workspace, fallback);
        return fallback;
      }
      throw error;
    }
  }

  async saveWorkspace(
    workspace: string,
    data: unknown,
  ): Promise<void> {
    await this.ensureImagesDir(workspace);
    const workspaceDir = await this.resolveWorkspaceDir(workspace);

    const state = {
      ...((typeof data === 'object' && data !== null
        ? (data as WorkspaceState)
        : {}) as WorkspaceState),
      updatedAt: new Date().toISOString(),
    };

    const objectCount = Array.isArray(
      (state as { objects?: unknown[] }).objects,
    )
      ? ((state as { objects?: unknown[] }).objects as unknown[]).length
      : 0;
    console.log(
      `[WorkspaceManager] saveWorkspace ${workspace} objects=${objectCount}`,
    );

    await fs.writeFile(
      path.join(workspaceDir, METADATA_FILE),
      JSON.stringify(state, null, 2),
      'utf8',
    );
  }

  async ingestAssets(
    workspace: string,
    payload: AssetIngestRequest,
  ): Promise<AssetIngestResult> {
    const imagesDir = await this.ensureImagesDir(workspace);
    const assets: AssetDescriptor[] = [];
    const failures: AssetIngestFailure[] = [];
    const files = Array.isArray(payload.files)
      ? payload.files
          .map((entry) => (typeof entry === 'string' ? entry : null))
          .filter((entry): entry is string => Boolean(entry && entry.trim()))
      : [];
    const urls = Array.isArray(payload.urls)
      ? payload.urls
          .map((entry) => (typeof entry === 'string' ? entry : null))
          .filter((entry): entry is string => Boolean(entry && entry.trim()))
      : [];
    const inlineCandidates = this.normalizeInlineAssetEntries(payload.inlineFiles);
    const attemptedRemotes = new Set<string>();

    for (const rawPath of files) {
      if (!rawPath) continue;
      let source = rawPath.trim();
      if (!source) continue;
      if (source.startsWith('file://')) {
        try {
          source = fileURLToPath(source);
        } catch (error) {
          console.warn(`Failed to resolve file URL ${source}`, error);
          continue;
        }
      }
      const filename = await this.generateUniqueName(
        imagesDir,
        path.basename(source),
      );
      const destPath = path.join(imagesDir, filename);
      try {
        await fs.copyFile(source, destPath);
        assets.push(this.describeAsset(workspace, destPath, filename));
      } catch (error) {
        console.warn(`Failed to copy file ${source}`, error);
        failures.push({
          source,
          reason: 'network',
          message: 'Unable to copy the file from disk.',
        });
      }
    }

    for (const url of urls) {
      const candidates = this.expandRemoteUrlCandidates(url);
      if (candidates.length === 0) {
        failures.push({
          source: url,
          reason: 'unsupported',
          message: 'The dropped link is not a direct image URL.',
        });
        continue;
      }
      let downloaded: AssetDescriptor | null = null;
      const candidateFailures: AssetIngestFailure[] = [];
      for (const candidate of candidates) {
        if (attemptedRemotes.has(candidate)) {
          continue;
        }
        attemptedRemotes.add(candidate);
        try {
          downloaded = await this.downloadRemoteAsset(workspace, candidate);
          break;
        } catch (error) {
          const failure = this.normalizeRemoteFailure(candidate, error);
          candidateFailures.push(failure);
          console.warn(`Failed to download asset from ${candidate}`, error);
        }
      }
      if (downloaded) {
        assets.push(downloaded);
      } else if (candidateFailures.length > 0) {
        failures.push(candidateFailures[candidateFailures.length - 1]);
      }
    }

    for (const entry of inlineCandidates) {
      if (!entry) {
        continue;
      }
      const { buffer, name, mimeType } = entry;
      if (buffer.byteLength === 0) {
        continue;
      }
      if (buffer.byteLength < INLINE_ASSET_MIN_BYTES) {
        console.warn(
          `Skipping inline asset${name ? ` "${name}"` : ''} due to suspiciously small payload (${buffer.byteLength} bytes)`,
        );
        failures.push({
          source: name ?? 'inline-asset',
          reason: 'unsupported',
          message: 'The dropped item did not include the actual image data.',
        });
        continue;
      }
      if (buffer.byteLength > REMOTE_IMAGE_MAX_BYTES) {
        console.warn(
          `Skipping inline asset${name ? ` "${name}"` : ''} due to size (${buffer.byteLength} bytes)`,
        );
        failures.push({
          source: name ?? 'inline-asset',
          reason: 'unsupported',
          message: 'The dropped item is larger than the allowed limit (30 MB).',
        });
        continue;
      }
      const normalizedMime = mimeType ? mimeType.trim().toLowerCase() : '';
      const extensionHint = name ? this.getExtensionFromUrl(name) : null;
      if (
        normalizedMime &&
        !this.isAcceptableImageContentType(normalizedMime, extensionHint)
      ) {
        console.warn(
          `Skipping inline asset${name ? ` "${name}"` : ''} due to unsupported content type ${normalizedMime}`,
        );
        failures.push({
          source: name ?? 'inline-asset',
          reason: 'unsupported',
          message: 'Unsupported image content type.',
        });
        continue;
      }
      try {
        const descriptor = await this.saveImageBuffer(
          workspace,
          buffer,
          this.inferExtension(name ?? '', normalizedMime, extensionHint),
          name,
        );
        assets.push(descriptor);
      } catch (error) {
        console.warn(
          `Failed to persist inline asset${name ? ` "${name}"` : ''}`,
          error,
        );
        failures.push({
          source: name ?? 'inline-asset',
          reason: 'network',
          message: 'We could not save the inline asset to disk.',
        });
      }
    }

    return { assets, failures };
  }

  async saveImageBuffer(
    workspace: string,
    buffer: Buffer,
    extension = '.png',
    preferredName?: string,
  ): Promise<AssetDescriptor> {
    const imagesDir = await this.ensureImagesDir(workspace);
    const normalizedExtension = this.normalizeExtension(extension);
    const baseName =
      this.sanitizeFilenameBase(preferredName) ??
      this.sanitizeFilenameBase(randomUUID()) ??
      'asset';
    const filename = await this.generateUniqueName(
      imagesDir,
      `${baseName}${normalizedExtension}`,
    );
    const destPath = path.join(imagesDir, filename);
    await fs.writeFile(destPath, buffer);
    return this.describeAsset(workspace, destPath, filename);
  }

  private normalizeRemoteFailure(source: string, error: unknown): AssetIngestFailure {
    if (error instanceof RemoteAssetError) {
      return {
        source,
        reason: error.reason,
        message: error.message,
      };
    }
    const message =
      error instanceof Error
        ? error.message
        : typeof error === 'string'
          ? error
          : 'Unable to download the remote asset.';
    return {
      source,
      reason: 'unknown',
      message,
    };
  }

  async getAssetDescriptor(
    workspace: string,
    relativePath: string,
  ): Promise<AssetDescriptor> {
    const normalized = relativePath.replace(/\\\\+/g, '/');
    const assetPath = await this.resolveAssetPath(workspace, normalized);
    const filename = path.basename(assetPath);
    return this.describeAsset(workspace, assetPath, filename, normalized);
  }

  async getAssetDetail(
    workspace: string,
    relativePath: string,
  ): Promise<AssetDetail> {
    const descriptor = await this.getAssetDescriptor(workspace, relativePath);
    const stats = await fs.stat(descriptor.absolutePath);
    const format = path.extname(descriptor.filename).replace('.', '').toLowerCase();
    return {
      ...descriptor,
      sizeBytes: stats.size,
      createdAt: stats.birthtime?.toISOString?.() ?? undefined,
      updatedAt: stats.mtime?.toISOString?.() ?? undefined,
      format: format || 'unknown',
    };
  }

  private slugify(input: string): string {
    const trimmed = input.trim().toLowerCase();
    const slug = trimmed
      .replace(/[^a-z0-9-_]+/gi, '-')
      .replace(/-{2,}/g, '-')
      .replace(/^-+|-+$/g, '');
    return slug.length > 0 ? slug : 'workspace';
  }

  private async generateUniqueName(
    directory: string,
    filename: string,
  ): Promise<string> {
    const base = filename.replace(/\s+/g, '-');
    const { name, ext } = path.parse(base);
    let candidate = `${name || 'asset'}${ext || ''}`;
    let counter = 1;

    while (true) {
      try {
        await fs.access(path.join(directory, candidate));
        const suffix = `-${counter}`;
        candidate = `${name || 'asset'}${suffix}${ext || ''}`;
        counter += 1;
      } catch {
        return candidate;
      }
    }
  }

  private describeAsset(
    workspace: string,
    assetPath: string,
    filename: string,
    relativeOverride?: string,
  ): AssetDescriptor {
    const relativePath = (relativeOverride ?? path.posix.join(IMAGES_DIR, filename)).replace(/\\+/g, '/');
    const encodedPath = relativePath
      .split('/')
      .map((segment) => encodeURIComponent(segment))
      .join('/');
    const fileUrl = `artboard://${encodeURIComponent(workspace)}/${encodedPath}`;
    return {
      workspace,
      filename,
      path: assetPath,
      absolutePath: assetPath,
      relativePath,
      fileUrl,
    };
  }

  private normalizeInlineAssetEntries(
    payload: InlineAssetPayload[] | undefined,
  ): Array<{ buffer: Buffer; name?: string; mimeType?: string }> {
    if (!Array.isArray(payload)) {
      return [];
    }
    const results: Array<{ buffer: Buffer; name?: string; mimeType?: string }> = [];
    for (const entry of payload) {
      if (!entry || typeof entry !== 'object') {
        continue;
      }
      const buffer = this.coerceInlineDataToBuffer(
        (entry as { data?: unknown }).data,
      );
      if (!buffer || buffer.byteLength === 0) {
        continue;
      }
      results.push({
        buffer,
        name: typeof entry.name === 'string' ? entry.name : undefined,
        mimeType: typeof entry.mimeType === 'string' ? entry.mimeType : undefined,
      });
    }
    return results;
  }

  private coerceInlineDataToBuffer(data: unknown): Buffer | null {
    if (!data) {
      return null;
    }
    if (Buffer.isBuffer(data)) {
      return Buffer.from(data);
    }
    if (data instanceof Uint8Array) {
      return Buffer.from(data);
    }
    if (ArrayBuffer.isView(data)) {
      const view = data as ArrayBufferView;
      return Buffer.from(view.buffer, view.byteOffset, view.byteLength);
    }
    if (data instanceof ArrayBuffer) {
      return Buffer.from(new Uint8Array(data));
    }
    if (Array.isArray(data) && data.every((value) => typeof value === 'number')) {
      return Buffer.from(data);
    }
    return null;
  }

  private expandRemoteUrlCandidates(raw: string): string[] {
    const trimmed = raw?.trim();
    if (!trimmed) {
      return [];
    }

    let parsed: URL;
    try {
      parsed = new URL(trimmed);
    } catch {
      return [];
    }

    if (!['http:', 'https:'].includes(parsed.protocol)) {
      return [];
    }

    const results = new Set<string>();
    results.add(parsed.toString());

    this.extractGoogleImageCandidates(parsed).forEach((candidate) => {
      try {
        const normalized = new URL(candidate, parsed).toString();
        const normalizedUrl = new URL(normalized);
        if (['http:', 'https:'].includes(normalizedUrl.protocol)) {
          results.add(normalizedUrl.toString());
        }
      } catch {
        // ignore malformed expansion candidates
      }
    });

    return Array.from(results);
  }

  private extractGoogleImageCandidates(url: URL): string[] {
    const hostname = url.hostname.toLowerCase();
    if (!hostname.endsWith('google.com')) {
      return [];
    }
    if (!url.pathname.includes('/imgres')) {
      return [];
    }

    const params = url.searchParams;
    const values = new Set<string>();
    const primary = params.get('imgurl');
    if (primary) {
      values.add(primary);
    }
    const secondary = params.get('imgrefurl');
    if (secondary) {
      values.add(secondary);
    }
    const third = params.get('imgsrc');
    if (third) {
      values.add(third);
    }
    return Array.from(values);
  }

  private async downloadRemoteAsset(
    workspace: string,
    url: string,
  ): Promise<AssetDescriptor> {
    if (!url) {
      throw new RemoteAssetError('', 'unsupported', 'The remote URL is missing.');
    }

    let parsed: URL;
    try {
      parsed = new URL(url);
    } catch (error) {
      console.warn(`Invalid URL provided: ${url}`);
      throw new RemoteAssetError(
        url,
        'unsupported',
        'The dropped link is not a valid URL.',
        { cause: error },
      );
    }

    if (!['http:', 'https:'].includes(parsed.protocol)) {
      throw new RemoteAssetError(
        parsed.toString(),
        'unsupported',
        'Only HTTP(S) URLs can be imported.',
      );
    }

    const normalizedUrl = parsed.toString();

    let response: Response;
    try {
      response = await fetch(normalizedUrl, {
        redirect: 'follow',
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Artboard/1.0 Safari/537.36',
          Accept: 'image/avif,image/webp,image/apng,image/*,*/*;q=0.8',
        },
      });
    } catch (error) {
      console.warn(`Fetch failed for ${normalizedUrl}`, error);
      throw new RemoteAssetError(
        normalizedUrl,
        'network',
        'We could not reach the remote server.',
        { cause: error },
      );
    }

    if (!response.ok || !response.body) {
      const isAuthStatus = response.status === 401 || response.status === 403;
      const reason: AssetIngestFailureReason = isAuthStatus ? 'auth' : 'network';
      const message =
        reason === 'auth' && this.isChatGPTContentHost(parsed)
          ? 'ChatGPT requires that you open this link in your browser before downloading.'
          : isAuthStatus
            ? 'Authentication is required to download this file.'
            : `Unexpected response code (${response.status}).`;
      console.warn(`Unexpected response for ${normalizedUrl}: ${response.status}`);
      throw new RemoteAssetError(response.url || normalizedUrl, reason, message);
    }

    const finalUrl = response.url || normalizedUrl;

    const contentLengthHeader = response.headers.get('content-length');
    if (contentLengthHeader) {
      const parsedLength = Number(contentLengthHeader);
      if (Number.isFinite(parsedLength) && parsedLength > REMOTE_IMAGE_MAX_BYTES) {
        console.warn(
          `Skipping download for ${finalUrl} due to size (${parsedLength} bytes)`,
        );
        throw new RemoteAssetError(
          finalUrl,
          'unsupported',
          'The remote file is larger than the 30 MB limit.',
        );
      }
    }

    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    if (buffer.byteLength === 0) {
      console.warn(`Received empty payload for ${finalUrl}`);
      throw new RemoteAssetError(finalUrl, 'unsupported', 'The remote server returned empty data.');
    }
    if (buffer.byteLength > REMOTE_IMAGE_MAX_BYTES) {
      console.warn(
        `Skipping persisted buffer for ${finalUrl} due to size (${buffer.byteLength} bytes)`,
      );
      throw new RemoteAssetError(
        finalUrl,
        'unsupported',
        'The downloaded file is larger than the 30 MB limit.',
      );
    }

    const contentTypeHeader = response.headers.get('content-type') ?? '';
    const normalizedContentType = contentTypeHeader.split(';')[0].trim().toLowerCase();

    const extFromUrl = this.getExtensionFromUrl(finalUrl);
    if (
      normalizedContentType &&
      !this.isAcceptableImageContentType(normalizedContentType, extFromUrl)
    ) {
      console.warn(
        `Skipping ${finalUrl} due to unsupported content type ${normalizedContentType}`,
      );
      throw new RemoteAssetError(
        finalUrl,
        'unsupported',
        `Unsupported content type: ${normalizedContentType || 'unknown'}.`,
      );
    }

    const extension = this.inferExtension(finalUrl, normalizedContentType, extFromUrl);
    const filenameHint =
      this.parseContentDispositionFilename(response.headers.get('content-disposition')) ??
      this.extractFilenameFromUrl(finalUrl);

    return this.saveImageBuffer(workspace, buffer, extension, filenameHint ?? undefined);
  }

  private inferExtension(
    sourceUrl: string,
    contentType: string,
    fallbackExtension?: string | null,
  ): string {
    const normalizedType = contentType.trim().toLowerCase();
    if (normalizedType) {
      const mapped = IMAGE_MIME_EXTENSION_MAP[normalizedType];
      if (mapped) {
        return mapped;
      }
      if (normalizedType.startsWith('image/')) {
        const subtype = normalizedType.split('/')[1] ?? '';
        if (subtype.includes('svg')) return '.svg';
        if (subtype.includes('jpeg')) return '.jpg';
        if (subtype.includes('pjpeg')) return '.jpg';
        if (subtype.includes('pjp')) return '.jpg';
        if (subtype.includes('x-icon')) return '.ico';
        if (subtype.includes('vnd.microsoft.icon')) return '.ico';
        if (subtype.includes('tiff')) return '.tiff';
        const sanitized = subtype.replace(/[^a-z0-9]+/gi, '');
        if (sanitized) {
          const candidate = `.${sanitized}`;
          if (this.isSupportedExtension(candidate)) {
            return candidate;
          }
        }
      }
    }

    if (fallbackExtension && this.isSupportedExtension(fallbackExtension)) {
      return fallbackExtension;
    }

    const urlExt = this.getExtensionFromUrl(sourceUrl);
    if (urlExt) {
      return urlExt;
    }

    return '.png';
  }

  async resolveAssetPath(workspace: string, relativePath: string): Promise<string> {
    const workspaceDir = await this.resolveWorkspaceDir(workspace);
    const normalized = path.normalize(relativePath);
    const fullPath = path.join(workspaceDir, normalized);
    if (!fullPath.startsWith(workspaceDir)) {
      throw new Error('Invalid asset path');
    }
    return fullPath;
  }

  async readAssetDataUrl(
    workspace: string,
    relativePath: string,
  ): Promise<string> {
    const filePath = await this.resolveAssetPath(workspace, relativePath);
    const buffer = await fs.readFile(filePath);
    const mime = this.getMimeType(relativePath);
    const base64 = buffer.toString('base64');
    return `data:${mime};base64,${base64}`;
  }

  private getMimeType(relativePath: string): string {
    const ext = path.extname(relativePath).toLowerCase();
    switch (ext) {
      case '.png':
        return 'image/png';
      case '.jpg':
      case '.jpeg':
        return 'image/jpeg';
      case '.gif':
        return 'image/gif';
      case '.webp':
        return 'image/webp';
      case '.svg':
        return 'image/svg+xml';
      default:
        return 'application/octet-stream';
    }
  }

  private getExtensionFromUrl(sourceUrl: string): string | null {
    const evaluate = (value: string | null | undefined): string | null => {
      if (!value) {
        return null;
      }
      const ext = path.extname(value).toLowerCase();
      if (ext && this.isSupportedExtension(ext)) {
        return ext;
      }
      return null;
    };

    try {
      const pathname = new URL(sourceUrl).pathname;
      const candidate = evaluate(pathname);
      if (candidate) {
        return candidate;
      }
    } catch {
      // ignore malformed URLs and fall back to raw value parsing
    }

    return evaluate(sourceUrl);
  }

  private isChatGPTContentHost(url: URL): boolean {
    const host = url.hostname.toLowerCase();
    return host.endsWith('chatgpt.com') || host.endsWith('chat.openai.com');
  }

  private extractFilenameFromUrl(sourceUrl: string): string | null {
    try {
      const pathname = new URL(sourceUrl).pathname;
      const base = path.basename(pathname);
      return base ? decodeURIComponent(base) : null;
    } catch {
      return null;
    }
  }

  private parseContentDispositionFilename(header: string | null): string | null {
    if (!header) {
      return null;
    }

    const filenameStarMatch = /filename\*\s*=\s*(?:UTF-8''|"?)([^";]+)"?/i.exec(header);
    if (filenameStarMatch && filenameStarMatch[1]) {
      try {
        return decodeURIComponent(filenameStarMatch[1].trim());
      } catch {
        return filenameStarMatch[1].trim();
      }
    }

    const filenameMatch = /filename\s*=\s*"?([^";]+)"?/i.exec(header);
    if (filenameMatch && filenameMatch[1]) {
      return filenameMatch[1].trim();
    }

    return null;
  }

  private normalizeExtension(ext: string): string {
    const trimmed = ext ? ext.trim().toLowerCase() : '';
    if (!trimmed) {
      return '.png';
    }
    const value = trimmed.startsWith('.') ? trimmed : `.${trimmed}`;
    return this.isSupportedExtension(value) ? value : '.png';
  }

  private sanitizeFilenameBase(value?: string | null): string | null {
    if (!value) {
      return null;
    }
    const parsedName = path.parse(value).name.trim();
    if (!parsedName) {
      return null;
    }
    const normalized = parsedName
      .replace(/[^a-z0-9-_]+/gi, '-')
      .replace(/-{2,}/g, '-')
      .replace(/^-+|-+$/g, '')
      .toLowerCase();
    return normalized || null;
  }

  private isSupportedExtension(ext: string): boolean {
    return ALLOWED_IMAGE_EXTENSIONS.has(ext);
  }

  private isAcceptableImageContentType(
    contentType: string,
    urlExtension: string | null,
  ): boolean {
    if (!contentType) {
      return true;
    }
    if (contentType.startsWith('image/')) {
      return true;
    }
    if (
      contentType === 'application/octet-stream' ||
      contentType === 'binary/octet-stream'
    ) {
      return true;
    }
    if (
      (contentType === 'text/plain' ||
        contentType === 'application/xml' ||
        contentType === 'text/xml') &&
      urlExtension === '.svg'
    ) {
      return true;
    }
    return false;
  }
}

export type {
  AssetDescriptor as WorkspaceAssetDescriptor,
  AssetDetail,
  AssetIngestRequest,
  AssetIngestFailure,
  AssetIngestResult,
};
