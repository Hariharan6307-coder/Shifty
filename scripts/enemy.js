import { Bullet } from "./bullet.js";

const eyeDisplacement = 7;

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
  }

  eyeMovement(playerPos) {
    let x = this.pos.x - playerPos.x;
    let y = this.pos.y - playerPos.y;
    this.eyeRotationAngle = Math.atan2(x, y);
  }

  fire() {
    this.eyeMovement(this.player.pos);
    if (this.timeNow - this.setTime >= 2000) {
      let bullet = new Bullet(this.ctx, this.pos.x, this.pos.y, this.eyeRotationAngle);
      this.bulletGroup.push(bullet);
      this.setTime = this.timeNow;
    }

    this.bulletGroup.forEach((bullet) => {
      bullet.update();
    })
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