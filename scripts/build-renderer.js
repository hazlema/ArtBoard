#!/usr/bin/env node
import { readFileSync, writeFileSync } from 'fs';
import { execSync } from 'child_process';

// Read version from package.json
const pkg = JSON.parse(readFileSync('./package.json', 'utf-8'));
const version = pkg.version;
const versionShort = version.split('.').slice(0, 2).join('.'); // e.g., "1.1"

// Update reference.html with current version
const referenceHtmlPath = './src/renderer/reference.html';
let referenceHtml = readFileSync(referenceHtmlPath, 'utf-8');
referenceHtml = referenceHtml.replace(
  /<h1 class="app-name">ArtBoard v[\d.]+<\/h1>/,
  `<h1 class="app-name">ArtBoard v${versionShort}</h1>`
);
writeFileSync(referenceHtmlPath, referenceHtml);

// Check if --watch flag is passed
const isWatch = process.argv.includes('--watch');

// Build with version injected
const watchFlag = isWatch ? '--watch --no-clear-screen' : '';
const cmd = `bun build src/renderer/app.ts --outfile=src/renderer/app.browser.js --target=browser --format=esm --define APP_VERSION='"${version}"' ${watchFlag}`;
console.log(`Building renderer with version: ${version}${isWatch ? ' (watch mode)' : ''}`);
execSync(cmd, { stdio: 'inherit' });
