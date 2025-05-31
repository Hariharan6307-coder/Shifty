const speed = 7;

export class Bullet {
  constructor(ctx, x, y, rotationAngle) {
    this.ctx = ctx;
    this.image = new Image();

    this.image.src = "../images/enemies/bullet.png";

    this.pos = {x: x, y: y};
    this.vel = speed;
    this.rotationAngle = rotationAngle;

    this.isHit = false;
  }

  move() {
    this.pos.x -= this.vel * Math.sin(this.rotationAngle);
    this.pos.y -= this.vel * Math.cos(this.rotationAngle);
  }

  draw() {
    this.ctx.drawImage(this.image, this.pos.x - this.image.width / 2, this.pos.y - this.image.height / 2);
  }

  update() {
    this.draw();
    this.move();
  }
}