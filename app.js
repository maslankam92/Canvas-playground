const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const colorTools = document.querySelector('.color-tools');
const sizeTools = document.querySelector('.size-tools');
const clearTool = document.querySelector('.extra-tools .clear');
const surpriseTool = document.querySelector('.extra-tools .surprise');
const COLORS = ['#2c3e50', '#e74c3c', '#1abc9c', '#3498db'];
const SIZES = [10, 25, 50];

let currentColor = COLORS[0];
let currentSize = SIZES[0];
let isDrawing = false;
let surpriseToolMode = false;
let sizeUp = true;
let lastX = [0, 0];
let lastY = [0, 0];

ctx.lineCap = 'round';
ctx.lineJoin = 'round';
ctx.lineWidth = currentSize;
ctx.strokeStyle = currentColor;

function createColorsMarkup() {
  colorTools.innerHTML = COLORS
    .map(color => `
      <li class="${currentColor === color ? 'current' : ''}" 
        data-color="${color}" 
        onclick="changeColor(this.dataset.color)" 
        style="background-color: ${color}">
      </li>`)
    .join('');
}

function createSizeMarkup() {
  sizeTools.innerHTML = SIZES
    .map(size => `
      <li class="${currentSize === size ? 'current' : ''}"
        data-size="${size}" 
        onclick="changeSize(this.dataset.size)"
        style="width: ${size}px; height: ${size}px; background-color: ${currentColor}">
      </li>`)
    .join('');
}

createColorsMarkup();
createSizeMarkup();

function keepDrawing(e) {
  if (isDrawing) {
    ctx.beginPath();
    ctx.lineWidth = currentSize;
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(e.offsetX, e.offsetY);
    [ lastX, lastY ] = [ e.offsetX, e.offsetY ];
    ctx.stroke();
  }

  if (surpriseToolMode) {
    ctx.strokeStyle = `hsl(${e.offsetX}, 100%, 50%)`;
    getSurpriseLineWidth();
  }
}

function getSurpriseLineWidth() {
  sizeUp ? currentSize++ : currentSize--;
  if (currentSize >= SIZES[2]) {
    sizeUp = false;
  } else if (currentSize <= SIZES[0]) {
    sizeUp = true;
  }
}

function startDrawing(e) {
  isDrawing = true;
  [ lastX, lastY ] = [ e.offsetX, e.offsetY ];
}

function stopDrawing() {
  isDrawing = false;
}

function changeColor(newColor) {
  if (surpriseToolMode) {
    resetToDefault();
  }
  colorTools.querySelector(`li[data-color="${currentColor}"]`).classList.remove('current');
  colorTools.querySelector(`li[data-color="${newColor}"]`).classList.add('current');
  ctx.strokeStyle = currentColor = newColor;
  createSizeMarkup();
}

function changeSize(newSize) {
  if (surpriseToolMode) {
    resetToDefault();
  }
  sizeTools.querySelector(`li[data-size="${currentSize}"]`).classList.remove('current');
  sizeTools.querySelector(`li[data-size="${newSize}"]`).classList.add('current');
  ctx.lineWidth = currentSize = newSize;
}

function setSurpriseTool() {
  surpriseToolMode = true;
  surpriseTool.classList.add('current');
  sizeTools.querySelector(`li[data-size="${currentSize}"]`).classList.remove('current');
  colorTools.querySelector(`li[data-color="${currentColor}"]`).classList.remove('current');
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function resetToDefault() {
  surpriseToolMode = false;
  ctx.strokeStyle = currentColor;
  ctx.lineWidth = currentSize = SIZES[0];
  surpriseTool.classList.remove('current');
  colorTools.querySelector(`li[data-color="${currentColor}"]`).classList.add('current');
  sizeTools.querySelector(`li[data-size="${currentSize}"]`).classList.add('current');
  createSizeMarkup();
}

canvas.addEventListener('mousemove', keepDrawing);
canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mouseleave', stopDrawing);
canvas.addEventListener('mouseup', stopDrawing);
surpriseTool.addEventListener('click', setSurpriseTool);
clearTool.addEventListener('click', clearCanvas);