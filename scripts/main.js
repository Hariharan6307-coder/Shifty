import {Player} from "./player.js";
import { Enemy } from "./enemy.js";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 800
canvas.height = 600

const gridSize = 50;
const enemySpawnTime = 2;

class MainGame {
  constructor() {
    this.player = new Player(ctx, "../images/player/player.png", "../images/player/eye.png");
    this.enemyGroup = [];

    this.getMousePos();
    this.timeNow = 0;
    this.setTime = 0;
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

  generateEnemies() {
    let side = Math.floor(Math.random() * 4);
    let margin = 100;

    let x, y;

    switch (side) {
      case 0: // Left Side
        x = -margin;
        y = Math.random() * canvas.height;
        break;
      case 1: // Top Side
        x = Math.random() * canvas.width;
        y = -margin;
        break;
      case 2: // Right Side
        x = canvas.width + margin;
        y = Math.random() * canvas.height;
        break;
      case 3: // Bottom Side
        x = Math.random() * canvas.width;
        y = canvas.height + margin;
        break;
    }

    if (this.timeNow - this.setTime >= enemySpawnTime * 1000) {
      let enemy = new Enemy(ctx, this.player, x, y);
      this.enemyGroup.push(enemy);
      this.setTime = this.timeNow;
    }
  }

  checkCollisions(timeStamp) {
    this.enemyGroup = this.enemyGroup.filter((enemy) => {
      enemy.update(timeStamp);
      return (
        !enemy.isHit
      );
    });
    this.player.checkEnemyCollisions(this.enemyGroup);
  }

  update(timeStamp) {
    ctx.fillStyle = "#1C253C";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    this.drawGrid();

    this.player.update(this.mousePos);
    this.generateEnemies();
    this.checkCollisions(timeStamp);
  }

  gameLoop = (timeStamp) => {
    this.timeNow = timeStamp;
    this.update(timeStamp)
    requestAnimationFrame(this.gameLoop);
  }
}

const mainGame = new MainGame();
mainGame.gameLoop();

