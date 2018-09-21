const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

ctx.fillStyle = '#BADA55';
ctx.strokeStyle = 'tomato';
ctx.lineCap = 'round';


let isDrawing = false;
let lastX = 0;
let lastY = 0;
function draw(e) {
  if (isDrawing) {
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(e.x, e.y);
    ctx.stroke();
    console.log(e);
  }
}

canvas.addEventListener('mousedown', (e) => {
  isDrawing = true;
  [ lastX, lastY ] = [ e.]
  console.log(e);
}
  
);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', () => isDrawing = false);
canvas.addEventListener('mouseout', () => isDrawing = false);