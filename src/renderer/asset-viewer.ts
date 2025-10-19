type AssetDescriptor = {
  id: string;
  workspace: string;
  relativePath: string;
  absolutePath: string;
  fileUrl: string;
  fileName: string;
  format: string;
  sizeBytes: number;
  updatedAt?: string;
};

type ViewerData = AssetDescriptor & {
  createdAt?: string;
};

type AssetUpdateResponse =
  | { success: true; asset: ViewerData }
  | { success: false; error?: string };

declare global {
  interface Window {
    assetViewerAPI?: {
      ready: () => void;
      onAssetData: (listener: (payload: ViewerData) => void) => void;
      copyToClipboard: (payload: { id: string }) => Promise<boolean>;
      saveAs: (payload: { id: string }) => Promise<boolean>;
      convert: (
        payload: { id: string; format: 'png' | 'jpeg' | 'webp' },
      ) => Promise<boolean>;
      resize: (
        payload: { id: string; width: number; height: number; lockAspect?: boolean },
      ) => Promise<AssetUpdateResponse>;
      crop: (
        payload: {
          id: string;
          x: number;
          y: number;
          width: number;
          height: number;
          data?: Uint8Array | ArrayBuffer;
          format?: string;
        },
      ) => Promise<AssetUpdateResponse>;
    };
  }
}

const viewerRoot = document.querySelector<HTMLDivElement>('#viewer')!;
const imageElement = document.querySelector<HTMLImageElement>('#asset-image')!;
const nameElement = document.querySelector<HTMLHeadingElement>('#asset-name')!;
const pathElement = document.querySelector<HTMLParagraphElement>('#asset-path')!;
const formatElement = document.querySelector<HTMLSpanElement>('#meta-format')!;
const dimensionElement =
  document.querySelector<HTMLSpanElement>('#meta-dimensions')!;
const sizeElement = document.querySelector<HTMLSpanElement>('#meta-size')!;
const workspaceElement =
  document.querySelector<HTMLSpanElement>('#meta-workspace')!;
const relativeElement =
  document.querySelector<HTMLSpanElement>('#meta-relative')!;
const updatedElement = document.querySelector<HTMLSpanElement>('#meta-updated')!;

const feedbackElement =
  document.querySelector<HTMLOutputElement>('#action-feedback')!;

const cropPanel = document.querySelector<HTMLDivElement>('#crop-panel')!;
const saveAsModal = document.querySelector<HTMLDialogElement>('#save-as-modal')!;
const resizeModal = document.querySelector<HTMLDialogElement>('#resize-modal')!;

const convertForm = document.querySelector<HTMLFormElement>('#convert-form')!;
const convertFormat = document.querySelector<HTMLSelectElement>('#convert-format')!;
const resizeForm = document.querySelector<HTMLFormElement>('#resize-form')!;
const resizeWidth = document.querySelector<HTMLInputElement>('#resize-width')!;
const resizeHeight = document.querySelector<HTMLInputElement>('#resize-height')!;
const resizeLock = document.querySelector<HTMLInputElement>('#resize-lock-aspect')!;
const cropForm = document.querySelector<HTMLFormElement>('#crop-form')!;
const cropX = document.querySelector<HTMLInputElement>('#crop-x')!;
const cropY = document.querySelector<HTMLInputElement>('#crop-y')!;
const cropWidth = document.querySelector<HTMLInputElement>('#crop-width')!;
const cropHeight = document.querySelector<HTMLInputElement>('#crop-height')!;
const cropOverlay = document.querySelector<HTMLDivElement>('#crop-overlay')!;
const cropSelectionElement =
  document.querySelector<HTMLDivElement>('#crop-selection')!;
const cropSelectionLabel =
  document.querySelector<HTMLSpanElement>('#crop-selection-label')!;
const cropApplyButton = document.querySelector<HTMLButtonElement>('#crop-apply')!;

const copyButton = document.querySelector<HTMLButtonElement>('#action-copy')!;
const saveAsButton = document.querySelector<HTMLButtonElement>('#action-save-as')!;
const resizeButton = document.querySelector<HTMLButtonElement>('#action-resize')!;
const cropButton = document.querySelector<HTMLButtonElement>('#action-crop')!;

let currentAsset: ViewerData | null = null;
let naturalWidth = 0;
let naturalHeight = 0;

const SUPPORTED_RESIZE_FORMATS = new Set(['png', 'jpg', 'jpeg', 'webp']);

type CropSelection = { x: number; y: number; width: number; height: number };
type CropHandle = 'n' | 's' | 'e' | 'w' | 'nw' | 'ne' | 'sw' | 'se';
type CropDragState =
  | {
      mode: 'create';
      origin: { x: number; y: number };
      pointerId: number;
    }
  | {
      mode: 'move';
      origin: { x: number; y: number };
      start: CropSelection;
      pointerId: number;
    }
  | {
      mode: 'resize';
      origin: { x: number; y: number };
      start: CropSelection;
      handle: CropHandle;
      pointerId: number;
    };

let cropModeActive = false;
let activeSelection: CropSelection | null = null;
let cropDragState: CropDragState | null = null;
let cropPointerId: number | null = null;
let imageRect: DOMRect | null = null;
let overlayRect: DOMRect | null = null;

const MIN_CROP_SIZE = 2;

function formatBytes(bytes: number): string {
  if (!Number.isFinite(bytes) || bytes <= 0) {
    return '—';
  }
  const units = ['B', 'KB', 'MB', 'GB'];
  let value = bytes;
  let unit = 0;
  while (value >= 1024 && unit < units.length - 1) {
    value /= 1024;
    unit += 1;
  }
  return `${value.toFixed(value >= 100 ? 0 : value >= 10 ? 1 : 2)} ${units[unit]}`;
}

function openModal(dialog: HTMLDialogElement) {
  if (!dialog.open) {
    dialog.showModal();
  }
}

function closeModal(dialog: HTMLDialogElement) {
  if (dialog.open) {
    dialog.close();
  }
}

function showCropPanel() {
  cropPanel.classList.remove('hidden');
}

function hidePanels() {
  closeModal(saveAsModal);
  closeModal(resizeModal);
    cropPanel.classList.add('hidden');
  }

function updateCropButton() {
  if (cropModeActive) {
    cropButton.textContent = 'End Crop';
    cropButton.classList.add('is-active');
    cropButton.dataset.tone = 'alert';
  } else {
    cropButton.textContent = 'Crop Selection…';
    cropButton.classList.remove('is-active');
    cropButton.removeAttribute('data-tone');
  }
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

function canonicalFormat(format: string | undefined): string {
  if (!format) return 'png';
  const lower = format.toLowerCase();
  return lower === 'jpg' ? 'jpeg' : lower;
}

function getMimeForFormat(format: string): { mime: string; quality?: number } {
  switch (format) {
    case 'jpeg':
      return { mime: 'image/jpeg', quality: 0.92 };
    case 'webp':
      return { mime: 'image/webp', quality: 0.92 };
    case 'png':
    default:
      return { mime: 'image/png' };
  }
}

function copySelection(selection: CropSelection): CropSelection {
  return { ...selection };
}

function normalizeSelection(
  x: number,
  y: number,
  width: number,
  height: number,
): CropSelection {
  if (naturalWidth <= 0 || naturalHeight <= 0) {
    return { x: 0, y: 0, width: 0, height: 0 };
  }
  const limitedWidth = Math.max(MIN_CROP_SIZE, Math.min(width, naturalWidth));
  const limitedHeight = Math.max(MIN_CROP_SIZE, Math.min(height, naturalHeight));
  const normalizedX = clamp(x, 0, naturalWidth - limitedWidth);
  const normalizedY = clamp(y, 0, naturalHeight - limitedHeight);
  return {
    x: normalizedX,
    y: normalizedY,
    width: limitedWidth,
    height: limitedHeight,
  };
}

function selectionFromPoints(a: { x: number; y: number }, b: { x: number; y: number }): CropSelection {
  const left = Math.min(a.x, b.x);
  const top = Math.min(a.y, b.y);
  const right = Math.max(a.x, b.x);
  const bottom = Math.max(a.y, b.y);
  return normalizeSelection(left, top, right - left, bottom - top);
}

function refreshCropMetrics(): boolean {
  imageRect = imageElement.getBoundingClientRect();
  overlayRect = cropOverlay.getBoundingClientRect();
  return Boolean(
    imageRect &&
      overlayRect &&
      imageRect.width > 0 &&
      imageRect.height > 0 &&
      overlayRect.width > 0 &&
      overlayRect.height > 0,
  );
}

function naturalFromPointer(event: PointerEvent, allowOutside = false): { x: number; y: number } | null {
  if (!imageRect || imageRect.width === 0 || imageRect.height === 0) {
    return null;
  }
  if (naturalWidth <= 0 || naturalHeight <= 0) {
    return null;
  }
  if (
    !allowOutside &&
    (event.clientX < imageRect.left ||
      event.clientX > imageRect.right ||
      event.clientY < imageRect.top ||
      event.clientY > imageRect.bottom)
  ) {
    return null;
  }
  const displayX = clamp(event.clientX - imageRect.left, 0, imageRect.width);
  const displayY = clamp(event.clientY - imageRect.top, 0, imageRect.height);
  const naturalX = (displayX / imageRect.width) * naturalWidth;
  const naturalY = (displayY / imageRect.height) * naturalHeight;
  return {
    x: clamp(naturalX, 0, naturalWidth),
    y: clamp(naturalY, 0, naturalHeight),
  };
}

function selectionToDisplay(selection: CropSelection): { left: number; top: number; width: number; height: number } | null {
  if (!imageRect || !overlayRect || naturalWidth <= 0 || naturalHeight <= 0) {
    return null;
  }
  const scaleX = imageRect.width / naturalWidth;
  const scaleY = imageRect.height / naturalHeight;
  const offsetX = imageRect.left - overlayRect.left;
  const offsetY = imageRect.top - overlayRect.top;
  return {
    left: offsetX + selection.x * scaleX,
    top: offsetY + selection.y * scaleY,
    width: Math.max(selection.width * scaleX, 1),
    height: Math.max(selection.height * scaleY, 1),
  };
}

function pointInsideSelection(selection: CropSelection, point: { x: number; y: number }): boolean {
  const right = selection.x + selection.width;
  const bottom = selection.y + selection.height;
  return point.x >= selection.x && point.x <= right && point.y >= selection.y && point.y <= bottom;
}

function syncCropFormWithSelection(selection: CropSelection | null): void {
  if (selection) {
    cropX.value = String(Math.round(selection.x));
    cropY.value = String(Math.round(selection.y));
    cropWidth.value = String(Math.round(selection.width));
    cropHeight.value = String(Math.round(selection.height));
  } else {
    cropX.value = '0';
    cropY.value = '0';
    cropWidth.value = naturalWidth ? String(Math.round(naturalWidth)) : '0';
    cropHeight.value = naturalHeight ? String(Math.round(naturalHeight)) : '0';
  }
}

function renderSelection(selection: CropSelection | null): void {
  activeSelection = selection;
  if (!cropModeActive) {
    cropSelectionElement.hidden = true;
    cropOverlay.dataset.hasSelection = 'false';
    return;
  }
  if (!selection) {
    cropSelectionElement.hidden = true;
    cropOverlay.dataset.hasSelection = 'false';
    syncCropFormWithSelection(null);
    return;
  }
  if (!refreshCropMetrics()) {
    cropSelectionElement.hidden = true;
    cropOverlay.dataset.hasSelection = 'false';
    return;
  }
  const display = selectionToDisplay(selection);
  if (!display) {
    cropSelectionElement.hidden = true;
    cropOverlay.dataset.hasSelection = 'false';
    return;
  }
  cropSelectionElement.hidden = false;
  cropOverlay.dataset.hasSelection = 'true';
  cropSelectionElement.style.transform = `translate(${display.left}px, ${display.top}px)`;
  cropSelectionElement.style.width = `${display.width}px`;
  cropSelectionElement.style.height = `${display.height}px`;
  cropSelectionLabel.textContent = `${Math.round(selection.width)} × ${Math.round(selection.height)} px`;
  syncCropFormWithSelection(selection);
}

function resizeSelection(start: CropSelection, handle: CropHandle, pointer: { x: number; y: number }): CropSelection {
  let left = start.x;
  let top = start.y;
  let right = start.x + start.width;
  let bottom = start.y + start.height;

  switch (handle) {
    case 'nw':
      left = clamp(pointer.x, 0, right - MIN_CROP_SIZE);
      top = clamp(pointer.y, 0, bottom - MIN_CROP_SIZE);
      break;
    case 'n':
      top = clamp(pointer.y, 0, bottom - MIN_CROP_SIZE);
      break;
    case 'ne':
      right = clamp(pointer.x, left + MIN_CROP_SIZE, naturalWidth);
      top = clamp(pointer.y, 0, bottom - MIN_CROP_SIZE);
      break;
    case 'e':
      right = clamp(pointer.x, left + MIN_CROP_SIZE, naturalWidth);
      break;
    case 'se':
      right = clamp(pointer.x, left + MIN_CROP_SIZE, naturalWidth);
      bottom = clamp(pointer.y, top + MIN_CROP_SIZE, naturalHeight);
      break;
    case 's':
      bottom = clamp(pointer.y, top + MIN_CROP_SIZE, naturalHeight);
      break;
    case 'sw':
      left = clamp(pointer.x, 0, right - MIN_CROP_SIZE);
      bottom = clamp(pointer.y, top + MIN_CROP_SIZE, naturalHeight);
      break;
    case 'w':
      left = clamp(pointer.x, 0, right - MIN_CROP_SIZE);
      break;
  }

  return normalizeSelection(left, top, right - left, bottom - top);
}

function enterCropMode(): void {
  if (!currentAsset) {
    return;
  }
  if (naturalWidth <= 0 || naturalHeight <= 0) {
    setFeedback('Image not ready for cropping', 'error');
    return;
  }

  cropModeActive = true;
  updateCropButton();
  closeModal(saveAsModal);
  closeModal(resizeModal);
  cropOverlay.hidden = false;
  cropOverlay.dataset.active = 'true';
  cropOverlay.setAttribute('aria-hidden', 'false');
  cropSelectionElement.hidden = !activeSelection;
  showCropPanel();
  setFeedback('Drag on the image to select the crop area. Press Enter or click Apply to confirm.', 'info');
  syncCropFormWithSelection(activeSelection);
  requestAnimationFrame(() => {
    refreshCropMetrics();
    renderSelection(activeSelection);
  });
}

function exitCropMode(options?: { resetSelection?: boolean }): void {
  if (options?.resetSelection) {
    activeSelection = null;
  }
  if (cropPointerId !== null && cropOverlay.hasPointerCapture(cropPointerId)) {
    cropOverlay.releasePointerCapture(cropPointerId);
  }
  cropPointerId = null;
  cropDragState = null;
  cropOverlay.classList.remove('is-dragging');
  cropModeActive = false;
  updateCropButton();
  cropOverlay.dataset.active = 'false';
  cropOverlay.dataset.hasSelection = 'false';
  cropOverlay.hidden = true;
  cropOverlay.setAttribute('aria-hidden', 'true');
  cropSelectionElement.hidden = true;
  cropPanel.classList.add('hidden');
  syncCropFormWithSelection(activeSelection);
}

function nudgeSelection(dx: number, dy: number): void {
  if (!cropModeActive || !activeSelection) {
    return;
  }
  const moved = normalizeSelection(
    activeSelection.x + dx,
    activeSelection.y + dy,
    activeSelection.width,
    activeSelection.height,
  );
  renderSelection(moved);
}

async function applyCrop(selectionOverride?: CropSelection): Promise<void> {
  try {
    const asset = ensureAsset();
    const selection = selectionOverride ?? activeSelection;
    if (!selection) {
      setFeedback('Select an area to crop first', 'error');
      return;
    }

    const x = Math.round(selection.x);
    const y = Math.round(selection.y);
    const width = Math.round(selection.width);
    const height = Math.round(selection.height);

    if (width <= 0 || height <= 0) {
      setFeedback('Crop area must be larger than zero', 'error');
      return;
    }

    const normalizedFormat = canonicalFormat(asset.format);
    if (!SUPPORTED_RESIZE_FORMATS.has(normalizedFormat)) {
      setFeedback(`Crop not supported for ${asset.format.toUpperCase()} images`, 'error');
      return;
    }

    if (!imageElement.complete || naturalWidth === 0 || naturalHeight === 0) {
      setFeedback('Image still loading, try again in a moment', 'error');
      return;
    }

    // Use Canvas API to crop the image (handles WebP and other formats better than Electron's nativeImage)
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext('2d');
    if (!context) {
      setFeedback('Canvas rendering is not supported in this environment', 'error');
      return;
    }

    // Draw the cropped portion of the image
    context.imageSmoothingEnabled = false; // No smoothing for cropping
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(
      imageElement,
      x, y, width, height,  // Source rectangle (crop area)
      0, 0, width, height   // Destination rectangle (entire canvas)
    );

    const { mime, quality } = getMimeForFormat(normalizedFormat);
    const blob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob(resolve, mime, quality),
    );
    if (!blob) {
      setFeedback('Unable to generate cropped image', 'error');
      return;
    }
    const buffer = new Uint8Array(await blob.arrayBuffer());

    const response = await window.assetViewerAPI?.crop({
      id: asset.id,
      x,
      y,
      width,
      height,
      data: buffer,
      format: normalizedFormat,
    });

    if (!response?.success || !response.asset) {
      if (response?.error) {
        setFeedback(`Crop failed: ${response.error}`, 'error');
      } else {
        setFeedback('Crop cancelled', 'info');
      }
      return;
    }
    handleAssetData(response.asset);
    setFeedback('Image cropped', 'success');
  } catch (error) {
    console.error('Crop failed', error);
    setFeedback('Crop failed', 'error');
  }
}

function handleCropPointerDown(event: PointerEvent): void {
  if (!cropModeActive) {
    return;
  }
  if (!refreshCropMetrics()) {
    return;
  }
  const pointer = naturalFromPointer(event);
  if (!pointer) {
    return;
  }

  const target = event.target as HTMLElement | null;
  const handle = (target?.dataset.handle as CropHandle | undefined) ?? undefined;

  event.preventDefault();
  cropPointerId = event.pointerId;
  cropOverlay.setPointerCapture(event.pointerId);
  cropOverlay.classList.add('is-dragging');

  if (handle && activeSelection) {
    cropDragState = {
      mode: 'resize',
      origin: pointer,
      start: copySelection(activeSelection),
      handle,
      pointerId: event.pointerId,
    };
    return;
  }

  if (activeSelection && pointInsideSelection(activeSelection, pointer)) {
    cropDragState = {
      mode: 'move',
      origin: pointer,
      start: copySelection(activeSelection),
      pointerId: event.pointerId,
    };
    return;
  }

  cropDragState = {
    mode: 'create',
    origin: pointer,
    pointerId: event.pointerId,
  };
  renderSelection(normalizeSelection(pointer.x, pointer.y, MIN_CROP_SIZE, MIN_CROP_SIZE));
}

function handleCropPointerMove(event: PointerEvent): void {
  if (!cropModeActive || !cropDragState) {
    return;
  }
  const pointer = naturalFromPointer(event, true);
  if (!pointer) {
    return;
  }

  if (cropDragState.mode === 'create') {
    renderSelection(selectionFromPoints(cropDragState.origin, pointer));
    return;
  }

  if (cropDragState.mode === 'move') {
    const dx = pointer.x - cropDragState.origin.x;
    const dy = pointer.y - cropDragState.origin.y;
    const moved = normalizeSelection(
      cropDragState.start.x + dx,
      cropDragState.start.y + dy,
      cropDragState.start.width,
      cropDragState.start.height,
    );
    renderSelection(moved);
    return;
  }

  if (cropDragState.mode === 'resize') {
    const resized = resizeSelection(cropDragState.start, cropDragState.handle, pointer);
    renderSelection(resized);
  }
}

function finalizeCropPointer(event: PointerEvent | null): void {
  if (!cropDragState) {
    return;
  }
  if (cropPointerId !== null && cropOverlay.hasPointerCapture(cropPointerId)) {
    cropOverlay.releasePointerCapture(cropPointerId);
  }
  cropPointerId = null;
  cropOverlay.classList.remove('is-dragging');

  if (event && cropDragState.mode === 'create') {
    const pointer = naturalFromPointer(event, true) ?? cropDragState.origin;
    renderSelection(selectionFromPoints(cropDragState.origin, pointer));
  }

  cropDragState = null;
}

function handleCropPointerUp(event: PointerEvent): void {
  if (!cropModeActive) {
    return;
  }
  finalizeCropPointer(event);
}

function handleCropPointerCancel(event: PointerEvent): void {
  finalizeCropPointer(event);
}
function setFeedback(message: string, tone: 'info' | 'success' | 'error' = 'info') {
  feedbackElement.dataset.tone = tone;
  feedbackElement.textContent = message;
}

function handleAssetData(asset: ViewerData) {
  currentAsset = asset;
  viewerRoot.dataset.loading = 'false';

  nameElement.textContent = asset.fileName;
  pathElement.textContent = asset.absolutePath;
  formatElement.textContent = asset.format.toUpperCase();
  sizeElement.textContent = formatBytes(asset.sizeBytes);
  workspaceElement.textContent = asset.workspace;
  relativeElement.textContent = asset.relativePath;
  updatedElement.textContent = asset.updatedAt
    ? new Date(asset.updatedAt).toLocaleString()
    : '—';

  exitCropMode({ resetSelection: true });
  hidePanels();
  setFeedback('');

  const cacheToken = Date.now();
  imageElement.src = `${asset.fileUrl}?v=${cacheToken}`;
}

function ensureAsset(): ViewerData {
  if (!currentAsset) {
    throw new Error('Asset not loaded yet');
  }
  return currentAsset;
}

updateCropButton();

copyButton.addEventListener('click', async () => {
  try {
    const asset = ensureAsset();
    await window.assetViewerAPI?.copyToClipboard({ id: asset.id });
    setFeedback('Copied to clipboard', 'success');
  } catch (error) {
    console.error('Failed to copy asset', error);
    setFeedback('Copy failed', 'error');
  }
});

saveAsButton.addEventListener('click', () => {
  exitCropMode({ resetSelection: false });
  closeModal(resizeModal);
  openModal(saveAsModal);
  setFeedback('');
});

resizeButton.addEventListener('click', () => {
  if (!currentAsset) return;
  exitCropMode({ resetSelection: false });
  closeModal(saveAsModal);
  resizeWidth.value = String(naturalWidth || 0);
  resizeHeight.value = String(naturalHeight || 0);
  openModal(resizeModal);
  setFeedback('');
});

cropButton.addEventListener('click', () => {
  if (cropModeActive) {
    void applyCrop();
  } else {
    hidePanels();
    enterCropMode();
  }
});

cropApplyButton.addEventListener('click', () => {
  void applyCrop();
});

cropOverlay.addEventListener('pointerdown', handleCropPointerDown);
cropOverlay.addEventListener('pointermove', handleCropPointerMove);
cropOverlay.addEventListener('pointerup', handleCropPointerUp);
cropOverlay.addEventListener('pointercancel', handleCropPointerCancel);
cropOverlay.addEventListener('lostpointercapture', () => {
  cropDragState = null;
  cropPointerId = null;
  cropOverlay.classList.remove('is-dragging');
});

window.addEventListener('keydown', (event) => {
  if (!cropModeActive) {
    return;
  }
  const target = event.target as HTMLElement | null;
  if (
    target &&
    (target.tagName === 'INPUT' ||
      target.tagName === 'TEXTAREA' ||
      target.tagName === 'SELECT' ||
      target.isContentEditable)
  ) {
    return;
  }
  if (event.key === 'Escape') {
    event.preventDefault();
    exitCropMode({ resetSelection: false });
    hidePanels();
    setFeedback('');
    return;
  }
  if (event.key === 'Enter') {
    event.preventDefault();
    void applyCrop();
    return;
  }
  const step = event.shiftKey ? 10 : 1;
  switch (event.key) {
    case 'ArrowUp':
      event.preventDefault();
      nudgeSelection(0, -step);
      break;
    case 'ArrowDown':
      event.preventDefault();
      nudgeSelection(0, step);
      break;
    case 'ArrowLeft':
      event.preventDefault();
      nudgeSelection(-step, 0);
      break;
    case 'ArrowRight':
      event.preventDefault();
      nudgeSelection(step, 0);
      break;
  }
});

Array.from(document.querySelectorAll<HTMLButtonElement>('[data-close-panel]')).forEach(
  (button) => {
    button.addEventListener('click', () => {
      if (button.dataset.closePanel === 'crop') {
        exitCropMode({ resetSelection: false });
      }
      hidePanels();
      setFeedback('');
    });
  },
);

Array.from(document.querySelectorAll<HTMLButtonElement>('[data-close-modal]')).forEach(
  (button) => {
    button.addEventListener('click', () => {
      const target = button.dataset.closeModal;
      if (target === 'save-as') {
        closeModal(saveAsModal);
      } else if (target === 'resize') {
        closeModal(resizeModal);
      }
      setFeedback('');
    });
  },
);

saveAsModal.addEventListener('cancel', () => {
  setFeedback('');
});

resizeModal.addEventListener('cancel', () => {
  setFeedback('');
});

convertForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  try {
    const asset = ensureAsset();
    const format = convertFormat.value as 'png' | 'jpeg' | 'webp';
    const result = await window.assetViewerAPI?.convert({ id: asset.id, format });
    if (result) {
      setFeedback(`Saved as ${format.toUpperCase()}`, 'success');
    } else {
      setFeedback('Save cancelled', 'info');
    }
    hidePanels();
  } catch (error) {
    console.error('Convert failed', error);
    setFeedback('Conversion failed', 'error');
  }
});

resizeLock.addEventListener('change', () => {
  if (!resizeLock.checked || !naturalWidth || !naturalHeight) {
    return;
  }
  const width = Number(resizeWidth.value || naturalWidth);
  const aspect = naturalHeight / naturalWidth;
  resizeHeight.value = String(Math.round(width * aspect));
});

resizeWidth.addEventListener('input', () => {
  if (!resizeLock.checked || !naturalWidth) {
    return;
  }
  const width = Number(resizeWidth.value || naturalWidth);
  const aspect = naturalHeight / naturalWidth;
  resizeHeight.value = String(Math.max(1, Math.round(width * aspect)));
});

resizeForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  try {
    const asset = ensureAsset();
    const width = Number(resizeWidth.value);
    const height = Number(resizeHeight.value);
    if (!Number.isFinite(width) || !Number.isFinite(height) || width <= 0 || height <= 0) {
      setFeedback('Invalid resize dimensions', 'error');
      return;
    }
    const normalizedFormat = canonicalFormat(asset.format);
    if (!SUPPORTED_RESIZE_FORMATS.has(normalizedFormat)) {
      setFeedback(`Resize not supported for ${asset.format.toUpperCase()} images`, 'error');
      return;
    }

    if (!imageElement.complete || naturalWidth === 0 || naturalHeight === 0) {
      setFeedback('Image still loading, try again in a moment', 'error');
      return;
    }

    const canvas = document.createElement('canvas');
    canvas.width = Math.round(width);
    canvas.height = Math.round(height);
    const context = canvas.getContext('2d');
    if (!context) {
      setFeedback('Canvas rendering is not supported in this environment', 'error');
      return;
    }
    context.imageSmoothingEnabled = true;
    context.imageSmoothingQuality = 'high';
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(imageElement, 0, 0, canvas.width, canvas.height);

    const { mime, quality } = getMimeForFormat(normalizedFormat);
    const blob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob(resolve, mime, quality),
    );
    if (!blob) {
      setFeedback('Unable to generate resized image', 'error');
      return;
    }
    const buffer = new Uint8Array(await blob.arrayBuffer());

    const response = await window.assetViewerAPI?.resize({
      id: asset.id,
      width,
      height,
      lockAspect: resizeLock.checked,
      data: buffer,
      format: normalizedFormat,
    });
    if (!response?.success || !response.asset) {
      if (response?.error) {
        setFeedback(`Resize failed: ${response.error}`, 'error');
      } else {
        setFeedback('Resize cancelled', 'info');
      }
      return;
    }
    handleAssetData(response.asset);
    setFeedback(`Resized to ${width}×${height}`, 'success');
    hidePanels();
  } catch (error) {
    console.error('Resize failed', error);
    setFeedback('Resize failed', 'error');
  }
});

cropForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  if (!cropModeActive) {
    enterCropMode();
  }
  const xValue = Number(cropX.value);
  const yValue = Number(cropY.value);
  const widthValue = Number(cropWidth.value);
  const heightValue = Number(cropHeight.value);
  if (
    !Number.isFinite(xValue) ||
    !Number.isFinite(yValue) ||
    !Number.isFinite(widthValue) ||
    !Number.isFinite(heightValue)
  ) {
    setFeedback('Invalid crop bounds', 'error');
    return;
  }
  const selection = normalizeSelection(xValue, yValue, widthValue, heightValue);
  renderSelection(selection);
  await applyCrop(selection);
});

imageElement.addEventListener('load', () => {
  naturalWidth = imageElement.naturalWidth;
  naturalHeight = imageElement.naturalHeight;
  dimensionElement.textContent = naturalWidth && naturalHeight ? `${naturalWidth} × ${naturalHeight}` : '—';
  if (resizeLock.checked) {
    resizeWidth.value = String(naturalWidth);
    resizeHeight.value = String(naturalHeight);
  }
  if (cropModeActive) {
    requestAnimationFrame(() => {
      refreshCropMetrics();
      renderSelection(activeSelection);
    });
  } else {
    syncCropFormWithSelection(activeSelection);
  }
});

if (window.assetViewerAPI?.onAssetData) {
  window.assetViewerAPI.onAssetData((asset) => {
    handleAssetData(asset);
  });
  window.assetViewerAPI.ready();
}
