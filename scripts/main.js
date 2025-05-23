import {Player} from "./player.js";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 800
canvas.height = 600

const player = new Player("../images/player/playerMove1.png", canvas.width / 2, canvas.height / 2);

let mouseX = 0;
let mouseY = 0;
let mousePos = {};
canvas.addEventListener("mousemove", ((event) => {
  const rect = canvas.getBoundingClientRect();
  mouseX = event.clientX - rect.left;
  mouseY = event.clientY - rect.top;
  mousePos = {x: mouseX, y: mouseY};
}));

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  player.update(ctx, mousePos);

  requestAnimationFrame(gameLoop);
}

gameLoop();