import {Player} from "./player.js";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 800
canvas.height = 600

const player = new Player("../images/player/playerMove1.png", 10, 10);

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  player.update(ctx);
  requestAnimationFrame(gameLoop)
}

gameLoop();