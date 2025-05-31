import {Player} from "./player.js";
import { Enemy } from "./enemy.js";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 800
canvas.height = 600

const gridSize = 50;

class MainGame {
  constructor() {
    this.player = new Player(ctx, "../images/player/player.png", "../images/player/eye.png");
    this.enemyGroup = [];

    let enemy = new Enemy(ctx, this.player, 400, 300);
    this.enemyGroup.push(enemy);

    this.getMousePos();
  }

  drawGrid() {
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

  getMousePos() {
    this.mousePos = {x: 0, y: 0};
    canvas.addEventListener("mousemove", (event) => {
      const rect = canvas.getBoundingClientRect();
      this.mousePos.x = event.clientX - rect.left;
      this.mousePos.y = event.clientY - rect.top;
    });
  }

  checkCollisions(timeStamp) {
    this.enemyGroup.forEach((enemy) => {
      enemy.update(timeStamp);
      this.player.checkBulletCollisions(enemy.bulletGroup);
    });
    this.player.checkEnemyCollisions(this.enemyGroup);
  }

  update(timeStamp) {
    ctx.fillStyle = "#1C253C";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    this.drawGrid();

    this.checkCollisions(timeStamp);

    this.player.update(this.mousePos);
  }

  gameLoop = (timeStamp) => {
    this.update(timeStamp)
    requestAnimationFrame(this.gameLoop);
  }
}

const mainGame = new MainGame();
mainGame.gameLoop();

