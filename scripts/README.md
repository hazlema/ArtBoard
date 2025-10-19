# Build Scripts

## build-renderer.js

Builds the renderer process and automatically injects the version from `package.json`.

### Features:
- Reads version from `package.json`
- Injects version as `APP_VERSION` constant at build time
- Automatically updates `src/renderer/reference.html` with the version
- Supports watch mode with `--watch` flag

### How it works:
1. Reads `version` from `package.json` (e.g., "1.1.0")
2. Creates short version (e.g., "1.1") for display
3. Updates reference.html header with current version
4. Builds renderer with `--define APP_VERSION='"1.1.0"'`

### Usage:
```bash
bun run browser:bundle    # Build once
bun run browser:watch     # Build and watch for changes
```

### Updating the version:
**Just change it in one place:**
```json
// package.json
{
  "version": "1.2.0"  // ← Only update this!
}
```

Then run `bun run build` and the version will automatically appear as:
- Footer: "ArtBoard v1.2"
- Reference guide: "ArtBoard v1.2"
