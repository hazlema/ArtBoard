# Artboard App - Tech Stack & Implementation Guide

## Project Overview
Building a desktop artboard application where users can drag reference images from the web and capture screenshots from any region of their screen.

---

## Stack Details

- **Canvas Library**: Fabric.js v6.7
- **State Management**: TypeScript with strict mode
- **UI Framework**: Vanilla JS with TypeScript
- **Workspace Storage**: JSON files per workspace (Node.js fs.promises in main process)
- **JavaScript runtime**: Bun v1.3
- **Desktop Framework**: Electron v38
- **Build Tool**: Bun's native bundler
- **Screenshot Library**: electron-screenshots v0.5.27
- **Packaging**: electron-builder v26

## Core Technologies

### Runtime & Build Tools
- **Bun v1.3** - JavaScript runtime, package manager, and build tool
  - Full ES Modules (ESM) support
  - TypeScript support out of the box
  - Fast bundling (60% faster on macOS)
  - `"type": "module"` in package.json
  - `"module": "Preserve"` in tsconfig.json

### Desktop Framework
- **Electron v38** - Cross-platform desktop app framework
  - Multi-process architecture (main, preload, renderer)
  - Main process runs Node.js (uses CJS modules)
  - Renderer process runs Chromium (uses ESM modules)
  - Custom protocol support (`artboard://`)
  - IPC communication via `contextBridge`
  - Native features: clipboard, dialogs, screenshots

### Language
- **TypeScript** - Type-safe JavaScript
  - Modern ES module syntax
  - Bun has native TypeScript support (no extra transpilation needed)

---

## Key Features & Libraries

### Screenshot Functionality
**Primary Option: `electron-screenshots`**
- ✅ Purpose-built for Electron
- ✅ Provides native-feeling selection overlay UI
- ✅ User drags to select region
- ✅ Cross-platform (Windows, Mac, Linux)
- ✅ Returns captured image as buffer

```typescript
import screenshots from 'electron-screenshots';

// Trigger screenshot selection
screenshots.startCapture();

// Listen for the result
screenshots.on('ok', (e, buffer, bounds) => {
  // buffer is the image data
  // bounds has {x, y, width, height}
  // Add to your artboard
});
```

## Project Setup

### Installation
```bash
# Install Bun (if not already installed)
curl -fsSL https://bun.sh/install | bash

# Create project
mkdir artboard-app
cd artboard-app
bun init

# Install dependencies
bun install electron electron-screenshots
bun install -D @types/node
```

### Project Structure
```
artboard/
├── src/
│   ├── main.ts                 # Electron main process (950 lines)
│   ├── preload.ts              # Preload bridge script (137 lines)
│   ├── workspace/
│   │   └── manager.ts          # WorkspaceManager class (982 lines)
│   └── renderer/
│       ├── index.html          # Main artboard UI
│       ├── asset-viewer.html   # Asset viewer window UI
│       ├── app.ts              # Main renderer logic (Fabric.js canvas)
│       ├── asset-viewer.ts     # Asset viewer logic (image manipulation)
│       ├── app.browser.js      # Bundled renderer output
│       └── styles.css
├── dist/                       # Build output
│   ├── main.cjs                # Main process (CJS)
│   ├── preload.cjs             # Preload script (CJS)
│   └── renderer/               # Renderer files (ESM)
├── workspace-data/             # User workspace data (gitignored)
├── release/                    # Packaged builds (gitignored)
├── package.json
├── tsconfig.json
├── CLAUDE.md                   # AI assistant guidance
└── TASKS.md                    # Development checklist
```

### Workspace Storage Layout
```
workspace-data/
├── default/
│   ├── images/             # Downloaded assets dropped into the workspace
│   │   ├── screenshot-1.png
│   │   ├── reference-2.jpg
│   │   └── pasted-image-3.png
│   └── metadata.json       # Fabric.js canvas state (objects, positions, z-index)
└── concept-client/
    ├── images/
    │   ├── logo-mockup.png
    │   └── ui-reference.webp
    └── metadata.json
```

**Storage Details:**
- Each workspace gets its own folder inside `workspace-data/` (located in Electron's userData directory)
- New images dropped or captured save into `workspace-data/<workspace>/images/` with unique filenames
- `metadata.json` contains:
  - `objects`: Array of Fabric.js serialized canvas objects
  - `updatedAt`: ISO timestamp of last modification
- Assets are referenced using custom `artboard://` protocol URLs in Fabric.js
- WorkspaceManager handles all file operations, validation, and unique naming

### package.json
```json
{
  "name": "artboard",
  "type": "module",
  "main": "dist/main.cjs",
  "scripts": {
    "dev": "rm -rf dist && bun run build && electron .",
    "build": "rm -rf dist && bun run build:main && bun run build:renderer",
    "build:main": "bun build src/main.ts --outfile=dist/main.cjs --target=node --format=cjs --external electron --external electron-screenshots && bun build src/preload.ts --outfile=dist/preload.cjs --target=node --format=cjs --external electron",
    "build:renderer": "rm -rf dist/renderer && bun run browser:bundle && bun build src/renderer/index.html src/renderer/asset-viewer.html --outdir=dist/renderer --target=browser --splitting",
    "browser:bundle": "bun build src/renderer/app.ts --outfile=src/renderer/app.browser.js --target=browser --format=esm",
    "browser:watch": "bun build src/renderer/app.ts --outfile=src/renderer/app.browser.js --target=browser --format=esm --watch --no-clear-screen",
    "start": "electron .",
    "pack:linux": "rm -rf dist && bun run build && electron-builder --linux AppImage",
    "pack:win": "rm -rf dist && bun run build && electron-builder --win nsis --x64",
    "pack:mac": "rm -rf dist && bun run build && electron-builder --mac zip --x64"
  },
  "dependencies": {
    "electron-screenshots": "^0.5.27",
    "fabric": "^6.7.1"
  },
  "devDependencies": {
    "@types/bun": "latest",
    "@types/node": "^24.7.2",
    "electron": "^38.2.2",
    "electron-builder": "^26.0.12",
    "typescript": "^5.9.3"
  }
}
```

### tsconfig.json
```json
{
  "compilerOptions": {
    "target": "ESNext",
    "module": "Preserve",
    "moduleResolution": "bundler",
    "esModuleInterop": true,
    "strict": true,
    "skipLibCheck": true,
    "outDir": "./dist",
    "rootDir": "./src"
  },
  "include": ["src/**/*"]
}
```

---

## Implementation Notes

### Electron + ESM
- Electron supports ES modules in v28+
- Your main process can use full ESM syntax
- Renderer process typically uses a bundler (Vite/Webpack) or Bun's bundler

### Build System Details
- **Main process MUST be CJS**: Electron's main process requires CommonJS (`--format=cjs`)
- **Preload MUST be CJS**: Preload scripts also require CommonJS format
- **Renderer uses ESM**: Browser environment supports ES modules
- **External dependencies**: `electron` and `electron-screenshots` must be marked as `--external`
- **Dynamic import for screenshots**: Use lazy import to handle CJS module in ESM context
  ```typescript
  const instance = await import('electron-screenshots').then(mod => new mod.default());
  ```

### Screen Capture Workflow
1. User clicks "Capture Screenshot" button in artboard
2. **Multi-display detection**: If multiple displays exist, show selection dialog
3. **Window hiding**: Main window opacity set to 0 (or hidden entirely)
4. **Cursor positioning**: `screen.getCursorScreenPoint` mocked to center on target display
5. **Screenshot overlay**: `electron-screenshots` overlay launched on selected display
6. User drags to select screen region
7. **Capture events**: Listen for `ok`, `save`, or `cancel` events
8. **Buffer processing**: PNG buffer saved via `WorkspaceManager.saveImageBuffer()`
9. **Window restoration**: Main window restored to previous state
10. **Canvas update**: Renderer receives `AssetDescriptor` with `artboard://` URL and adds to Fabric.js

**Implementation notes:**
- Screenshot capture uses singleton pattern with lazy initialization
- `captureInFlight` flag prevents concurrent captures
- Window state (visibility, opacity, focus) fully restored after capture
- Cleanup handlers ensure proper resource management

### Drag & Drop Images from Web
The app supports multiple asset ingestion methods:

**1. Drag & Drop**
- Listen for `dragover`, `dragenter`, `dragleave`, `drop` events on canvas
- Handle local files (`file://` URLs or File objects)
- Handle remote URLs (HTTP/HTTPS)
- Handle inline images (data URLs)

**2. Clipboard Paste**
- `Ctrl/Cmd+V` triggers clipboard inspection
- Supports pasted images (PNG buffer)
- Supports copied file paths (`public.file-url`, `text/uri-list`)
- Supports data URLs from clipboard

**3. Asset Processing**
- All assets route through `workspaceAPI.ingest(workspace, payload)`
- `AssetIngestRequest` contains: `files`, `urls`, `inlineFiles`
- WorkspaceManager handles:
  - Local file copying
  - Remote URL fetching (30MB limit, redirect following)
  - Google Images URL extraction (imgurl, imgrefurl, imgsrc params)
  - Content-Type validation
  - Unique filename generation
  - Buffer persistence

**4. Special URL Handling**
- **Google Images**: Extracts actual image URL from search result links
- **ChatGPT**: Detects ChatGPT content hosts and provides auth-specific error messages
- **Content-Type checking**: Only downloads image MIME types or `application/octet-stream`
- **SVG handling**: Accepts `text/plain`, `application/xml`, `text/xml` if extension is `.svg`

**5. Asset Descriptor**
All ingested assets return `AssetDescriptor`:
```typescript
{
  workspace: string;
  filename: string;
  relativePath: string;  // e.g., "images/screenshot-1.png"
  fileUrl: string;       // e.g., "artboard://workspace-name/images/screenshot-1.png"
  absolutePath: string;  // Full filesystem path
}
```

### Workspace Persistence Workflow
1. **Initialization**: Resolve workspace folder under `workspace-data/` in Electron's userData directory
2. **Directory creation**: Ensure `images/` subdirectory exists
3. **Asset ingestion**: Use `workspaceAPI.ingest()` to normalize assets (copy local files, fetch remote URLs)
4. **Unique naming**: Generate unique filenames to prevent overwrites (e.g., `image-1.png`, `image-2.png`)
5. **Canvas updates**: Add images to Fabric.js canvas using `artboard://` protocol URLs
6. **Debounced saves**: Canvas state saved to `metadata.json` after 500ms of inactivity
7. **Serialization**: Fabric.js `toJSON()` serializes all canvas objects
8. **Workspace loading**: On app start, `loadFromJSON()` hydrates canvas from `metadata.json`
9. **Asset updates**: Asset viewer modifications broadcast to all windows via IPC events

**Custom Protocol Resolution:**
```typescript
// Fabric.js canvas uses:
fabric.Image.fromURL('artboard://workspace-name/images/asset.png')

// Main process resolves to:
/path/to/userData/workspace-data/workspace-name/images/asset.png
```

### Workspace Management UI
- The right-hand workspace panel slides open on demand (or stays pinned if the preference is enabled) and lists workspaces, pages, and quick actions.
- Hover the screen edge to reopen the panel; inactivity auto-retracts it after a configurable delay.
- Settings modal mirrors these controls, letting you create/rename/delete workspaces or pages and adjust panel behavior (auto-hide delay, pinned state).

### Settings Modal
- **Workspaces tab**: Lists all workspaces with inline rename/delete actions
- **Workspace operations**: `workspaceAPI.create()`, `rename()`, `remove()`
- **Pages tab**: Multi-page canvas support (placeholder)
- **Settings tab**: Panel behavior, zoom preferences
- **About tab**: App version, credits, links

### Asset Viewer Windows
Separate window for detailed image inspection and manipulation:

**Features:**
- **Viewing**: Full-resolution image display with metadata
- **Copy**: Copy image to system clipboard (`Ctrl/Cmd+C`)
- **Save As**: Export to filesystem with format selection
- **Convert**: Convert between PNG, JPEG, WebP formats
- **Resize**: Change dimensions with aspect ratio lock
- **Crop**: Interactive crop tool with drag handles

**Implementation:**
- Each viewer window has unique token for asset tracking
- Registry maps window IDs and tokens to asset data
- IPC handlers: `asset-viewer:copy`, `save`, `convert`, `resize`, `crop`
- Image operations use Electron's `nativeImage` APIs
- Asset updates broadcast to all windows via `workspace:asset-updated` events
- Viewer windows have independent lifecycle from main window

**Resize workflow:**
- Renderer uses canvas to resize image client-side
- Sends resized buffer to main process
- Main process writes buffer and refreshes asset metadata
- Update event notifies all windows of new dimensions/size

**Crop workflow:**
- Interactive crop overlay with 8 resize handles (n, s, e, w, nw, ne, sw, se)
- Real-time preview of crop region
- Main process performs crop using `nativeImage.crop()`
- Result saved in original format (PNG/JPEG/WebP preserved)

---

## Bonus Bun v1.3 Features (if needed)

### AI Agent-Friendly Tooling
- Bun v1.3 ships quieter `bun test` output for coding assistants—set `AGENT=1` (or `CLAUDECODE=1`) when triggering automated tests from an AI workflow.
- `bun init` can scaffold assistant guides like `CLAUDE.md`; this project maintains `agents.md` with Bun-specific rules for collaborators and agents.

### Workspace File Helpers
**Note**: Main process uses Node.js `fs.promises` (not Bun APIs) because Electron main process is Node-based.

```typescript
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { app } from 'electron';

const basePath = path.join(app.getPath('userData'), 'workspace-data');

export async function saveWorkspace(workspace: string, data: WorkspaceState) {
  const workspaceDir = path.join(basePath, workspace);
  await fs.mkdir(path.join(workspaceDir, 'images'), { recursive: true });
  const state = { ...data, updatedAt: new Date().toISOString() };
  await fs.writeFile(
    path.join(workspaceDir, 'metadata.json'),
    JSON.stringify(state, null, 2),
    'utf8'
  );
}

export async function loadWorkspace(workspace: string) {
  const metadataPath = path.join(basePath, workspace, 'metadata.json');
  const contents = await fs.readFile(metadataPath, 'utf8');
  return JSON.parse(contents) as WorkspaceState;
}
```

### Renderer Workspace Bridge
**Type-safe IPC communication via preload script:**

```typescript
// Ingest assets (files, URLs, clipboard data)
const result = await window.workspaceAPI.ingest(activeWorkspace, {
  files: droppedFilePaths,      // Local file paths or file:// URLs
  urls: droppedUrls,            // HTTP/HTTPS URLs
  inlineFiles: [                // Clipboard images or data URLs
    { name: 'pasted.png', mimeType: 'image/png', data: uint8Array }
  ]
});

// Handle successful ingestion
for (const asset of result.assets) {
  // asset.fileUrl uses artboard:// protocol
  fabric.Image.fromURL(asset.fileUrl, (img) => {
    canvas.add(img);
  });
}

// Handle failures with user feedback
for (const failure of result.failures) {
  console.warn(`Failed to ingest ${failure.source}: ${failure.message}`);
  // failure.reason: 'auth' | 'network' | 'unsupported' | 'unknown'
}

// Capture screenshot
const screenshot = await window.workspaceAPI.capture(activeWorkspace);
if (screenshot) {
  fabric.Image.fromURL(screenshot.fileUrl, (img) => {
    canvas.add(img);
  });
}

// Open asset viewer
await window.workspaceAPI.openAssetViewer({
  workspace: activeWorkspace,
  relativePath: 'images/screenshot-1.png'
});
```

### File Storage (S3 for cloud sync)
```typescript
import { s3 } from 'bun';

await s3.file('artboard-1.png').write(imageBuffer);
```

### WebSocket (for real-time collaboration)
Built-in WebSocket support with automatic compression

---

## Current Status

**✅ Completed:**
1. ✅ Project structure with Bun + Electron + TypeScript
2. ✅ Electron multi-process architecture (main, preload, renderer)
3. ✅ Fabric.js canvas implementation with persistence
4. ✅ Screenshot capture with multi-display support
5. ✅ Drag & drop for files and URLs (including Google Images)
6. ✅ Clipboard paste support (images, files, URLs)
7. ✅ Workspace management (create, rename, delete, list)
8. ✅ Asset viewer windows with image manipulation tools
9. ✅ Custom `artboard://` protocol for asset loading
10. ✅ Debounced canvas state persistence
11. ✅ Window bounds persistence across sessions
12. ✅ IPC communication with type-safe preload bridge
13. ✅ Multi-platform packaging (Linux, Windows, macOS)

**🚧 In Progress / Future:**
- Multi-page canvas support
- Real-time collaboration (WebSocket)
- Cloud sync (S3 or similar)
- Annotations and drawing tools
- Export workspace as image/PDF
- Keyboard shortcuts and accessibility

See `TASKS.md` for the current phase checklist and upcoming work items.

---

## Resources

- [Bun Documentation](https://bun.sh/docs)
- [Bun v1.3 Release Notes](https://bun.com/blog/bun-v1.3)
- [Electron Documentation](https://www.electronjs.org/docs)
- [Fabric.js Documentation](http://fabricjs.com/docs/)
- [electron-screenshots GitHub](https://github.com/nashaofu/electron-screenshots)
- [electron-builder Documentation](https://www.electron.build/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)

## Key Files Reference

- **[src/main.ts](src/main.ts)** - Main process (950 lines): Window management, IPC handlers, screenshot capture
- **[src/preload.ts](src/preload.ts)** - Preload bridge (137 lines): Type-safe IPC API exposure
- **[src/workspace/manager.ts](src/workspace/manager.ts)** - WorkspaceManager (982 lines): Asset ingestion, persistence
- **[src/renderer/app.ts](src/renderer/app.ts)** - Main renderer: Fabric.js canvas, drag-and-drop, UI
- **[src/renderer/asset-viewer.ts](src/renderer/asset-viewer.ts)** - Asset viewer: Image manipulation tools
- **[CLAUDE.md](CLAUDE.md)** - Comprehensive architecture documentation for AI assistants

---

Good luck with your build! 🚀
