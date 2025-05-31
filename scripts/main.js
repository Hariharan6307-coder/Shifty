import {Player} from "./player.js";
import { Enemy } from "./enemy.js";

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

let mouseX = 0;
let mouseY = 0;
let mousePos = {};
canvas.addEventListener("mousemove", (event) => {
  const rect = canvas.getBoundingClientRect();
  mouseX = event.clientX - rect.left;
  mouseY = event.clientY - rect.top;
  mousePos = {x: mouseX, y: mouseY}
});


const player = new Player(ctx, "../images/player/player.png", "../images/player/eye.png");
const enemy = new Enemy(ctx, player, 400, 300);

function gameLoop(timeStamp) {
  ctx.fillStyle = "#1C253C";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  drawGrid();
  enemy.update(timeStamp);
  player.update(mousePos);

  player.checkBulletCollisions(enemy.bulletGroup);

  requestAnimationFrame(gameLoop);
}

gameLoop();