import {Player} from "./player.js";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 800
canvas.height = 600

const gridSize = 50;

function drawGrid() {
  ctx.strokeStyle = "#cccccc";
  ctx.lineWidth = 1;

  for (let x = 0; x <= canvas.width; x += gridSize) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, canvas.height);
    ctx.stroke();
  }

  for (let y = 0; y <= canvas.height; y += gridSize) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(canvas.width, y);
    ctx.stroke();
  }
}

const player = new Player(ctx, "../images/player/player.png", canvas.width / 2, canvas.height / 2);

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawGrid();
  player.update()

  requestAnimationFrame(gameLoop);
}

gameLoop();