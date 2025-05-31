import { Bullet } from "./bullet.js";

const eyeDisplacement = 7;
const timeBetweenBullets = 2;

export class Enemy {
  constructor(ctx, player, x, y) {
    this.ctx = ctx;
    this.image = new Image();
    this.eyeImage = new Image();
    this.player = player

    this.image.src = "../images/enemies/enemy.png";
    this.eyeImage.src = "../images/enemies/eye.png";

    this.pos = {x: x, y: y};
    this.eyeRotationAngle = 0;

    this.bulletGroup = [];

    this.setTime = 0;
    this.timeNow = 0;
    this.timeInterval = timeBetweenBullets;
  }

  eyeMovement(playerPos) {
    let x = this.pos.x - playerPos.x;
    let y = this.pos.y - playerPos.y;
    this.eyeRotationAngle = Math.atan2(x, y);
  }

  fire() {
    this.eyeMovement(this.player.pos);
    if (this.timeNow - this.setTime >= this.timeInterval * 1000) {
      let bullet = new Bullet(this.ctx, this.pos.x, this.pos.y, this.eyeRotationAngle);
      this.bulletGroup.push(bullet);
      this.setTime = this.timeNow;
    }

    this.bulletGroup = this.bulletGroup.filter((bullet) => {
      bullet.update();
      return (
        bullet.pos.x >= 0 && bullet.pos.x <= this.ctx.canvas.width &&
        bullet.pos.y >= 0 && bullet.pos.y <= this.ctx.canvas.height &&
        !bullet.isHit
      );
    });
  }

  draw() {
    this.ctx.drawImage(this.image, this.pos.x - this.image.width / 2, this.pos.y - this.image.height / 2);
    this.ctx.drawImage(this.eyeImage, 
                       this.pos.x - this.eyeImage.width / 2 - eyeDisplacement * Math.sin(this.eyeRotationAngle), 
                       this.pos.y - this.eyeImage.height / 2 - eyeDisplacement * Math.cos(this.eyeRotationAngle));
  }

  update(timeNow) {
    this.timeNow = timeNow;
    this.draw();
    this.fire();
  }
}