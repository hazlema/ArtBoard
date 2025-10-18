# Artboard

Artboard is a **free, open-source, multi-platform** desktop app for capturing, remixing, and sharing creative ideas. Drag in assets from your favorite tools (or your clipboard), organize them across pages, and iterate quickly—whether you are on macOS, Windows, or Linux.

> **Beta status:** Artboard is currently in beta. Bugs and missing polish are expected. If you hit something unexpected, please open a ticket so we can fix it quickly.

---

## Highlights

- **Multi-platform ready** – The same experience on macOS, Windows, and Linux. Electron packages are available for each OS.
- **Creative capture** – Drop files, paste images, or snap screenshots directly onto the canvas.
- **Workspace aware** – Organize ideas into workspaces and pages, and jump between them with context menus and shortcuts.
- **100% open source** – No subscriptions, no license keys—just clone, build, and use.
- **Community driven** – Feedback and contributions are welcome; report bugs, propose features, and help shape the roadmap.

---

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) v1.3 or newer  
- [Node.js](https://nodejs.org/) (used by Electron)  
- [Git](https://git-scm.com/)  
- macOS, Windows, or Linux (x64)

### Install dependencies

```bash
bun install
```

### Run in development

```bash
# Rebuild the main + renderer bundles, then launch Electron
bun run electron:run
```

During development, the renderer bundle can be rebuilt with:

```bash
bun run browser:bundle      # One-off build
bun run browser:watch       # Rebuild on change
```

---

## Packaging

Artboard ships with convenience scripts for generating platform-specific installers. Each script cleans the `dist` directory, rebuilds the app, and invokes `electron-builder` with the appropriate targets.

| Target   | Command                     | Output                                                     |
|----------|-----------------------------|------------------------------------------------------------|
| Linux    | `bun run pack:linux`        | AppImage (`release/Artboard-*-x86_64.AppImage`)            |
| Windows  | `bun run pack:win`          | NSIS installer (`release/Artboard Setup *.exe`)            |
| macOS    | `bun run pack:mac`          | ZIP archive (`release/Artboard-*-mac.zip`)                 |
| All      | `bun run pack:all`          | AppImage, NSIS, and macOS ZIP in a single pass             |

> **Note:** macOS binaries must be built on macOS if you intend to sign or notarize them. Windows installers require Windows-specific tooling when codesigning.

---

## Reporting Bugs & Feedback

This release is a **beta**. If you encounter issues:

1. Open a ticket in the issue tracker (e.g. `https://github.com/<your-org>/<repo>/issues`).
2. Include reproduction steps, screenshots, logs, and platform details.
3. Watch for updates—fixes are prioritized based on community feedback.

---

## Contributing

We welcome pull requests and discussions:

1. Fork the repository and create a feature branch.
2. Run `bun run build` to ensure the bundles compile.
3. Add tests or notes where appropriate.
4. Submit a PR and link to any related tickets.

Before submitting, please run the platform-specific packaging script relevant to your changes if they touch build tooling.

---

## License

Artboard is open source. See the repository’s `LICENSE` file for details.

---

Thanks for trying Artboard! Your feedback keeps the project moving—please report any rough edges so we can smooth them out quickly.
