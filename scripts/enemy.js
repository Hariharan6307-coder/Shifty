import { Bullet } from "./bullet.js";

const speed = 5;
const acceleration = 0.2;
const friction = 0.05;
const timeBetweenBullets = 2;
const playerDistance = 350;
const collisionRadius = 40;

export class Enemy {
  constructor(ctx, player, x, y) {
    this.ctx = ctx;
    this.image = new Image();
    this.player = player

    this.image.src = "../images/enemies/enemy.png";

    this.pos = {x: x, y: y};
    this.eyeRotationAngle = 0;
    this.vel = 0;
    this.acc = acceleration;

    this.bulletGroup = [];

    this.setTime = 0;
    this.timeNow = 0;
    this.timeInterval = timeBetweenBullets;

    this.isHit = false;
    this.collisionRadius = collisionRadius;
    this.speedMultiplier = 1;
  }

  eyeMovement(playerPos) {
    let x = (this.pos.x - playerPos.x);
    let y = (this.pos.y - playerPos.y);
    this.eyeRotationAngle = Math.atan2(y, x) - Math.PI / 2;
  }

  moveTowardsPlayer(playerPos) {
    let xDistance = (this.pos.x - playerPos.x);
    let yDistance = (this.pos.y - playerPos.y);
    let distance = Math.sqrt(xDistance * xDistance + yDistance * yDistance);

    if (distance > playerDistance) {
      this.vel += this.acc;

      if (this.vel >= speed) {
        this.vel = speed;
      }
    }
    else {
      this.vel *= (1 - friction);
      if (this.vel < 0.001) {
        this.vel = 0;
      }
    }

    this.vel *= this.speedMultiplier;
    this.pos.x += this.vel * Math.sin(this.eyeRotationAngle);
    this.pos.y -= this.vel * Math.cos(this.eyeRotationAngle);
  }

  fire() {
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

  drawCollisionCircle() {
    this.ctx.beginPath();
    this.ctx.arc(this.pos.x, this.pos.y, this.collisionRadius, 0, 2 * Math.PI);
    this.ctx.stroke();
    this.ctx.fillStyle = 'white';
    this.ctx.fill();
  }

  draw() {
    this.ctx.save();
    this.ctx.translate(this.pos.x, this.pos.y);
    this.ctx.rotate(this.eyeRotationAngle);
    this.ctx.drawImage(this.image, -this.image.width / 2, -this.image.height / 2);
    this.ctx.restore();

    //this.drawCollisionCircle();
  }

  update(timeNow) {
    this.timeNow = timeNow;
    this.eyeMovement(this.player.pos);
    this.moveTowardsPlayer(this.player.pos);
    this.fire();
    this.draw();
  }
}