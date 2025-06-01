import { Bullet } from "./bullet.js";

const eyeDisplacement = 0;
const timeBetweenBullets = 2;

export class Enemy {
  constructor(ctx, player, x, y) {
    this.ctx = ctx;
    this.image = new Image();
    this.player = player

    this.image.src = "../images/enemies/enemy.png";

    this.pos = {x: x, y: y};
    this.eyeRotationAngle = 0;

    this.bulletGroup = [];

    this.setTime = 0;
    this.timeNow = 0;
    this.timeInterval = timeBetweenBullets;

    this.isHit = false;
  }

  eyeMovement(playerPos) {
    let x = (this.pos.x - playerPos.x);
    let y = (this.pos.y - playerPos.y);
    this.eyeRotationAngle = Math.atan2(y, x) - Math.PI / 2;
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
    this.ctx.save();
    this.ctx.translate(this.pos.x, this.pos.y);
    this.ctx.rotate(this.eyeRotationAngle);
    this.ctx.drawImage(this.image, -this.image.width / 2, -this.image.height / 2);
    this.ctx.restore();
    //this.ctx.drawImage(this.image, this.pos.x - this.image.width / 2, this.pos.y - this.image.height / 2);
  }

  update(timeNow) {
    this.timeNow = timeNow;
    this.fire();
    this.draw();
  }
}