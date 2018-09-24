const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const COLORS = ['#e74c3c', '#1abc9c', '#3498db', '#2c3e50'];
const SIZES = [10, 25, 50];

const colorTools = document.querySelector('.color-tools');
const sizeTools = document.querySelector('.size-tools');

function createColorsMarkup() {
  colorTools.innerHTML = COLORS
    .map(color => `<li data-color="${color}" style="background-color: ${color}"></li>`)
    .join('');
}

function createSizeMarkup() {
  sizeTools.innerHTML = SIZES
    .map(size => `<li data-size="${size}" style="width: ${size}px; height: ${size}px"></li>`)
    .join('');
}

createColorsMarkup();
createSizeMarkup();

