export class Player {
  constructor(imgSrc, x, y) {
    this.image = new Image();
    this.image.src = imgSrc;
    this.pos = {x: x, y: y}

    this.speed = 5;
  }

  move(pos) {
    let oldPos = this.pos;
    let newPos = pos;

    let dx = newPos.x - oldPos.x;
    let dy = newPos.y - oldPos.y;

    let hyp = Math.hypot(dx, dy);

    this.pos.x += (dx / hyp) * this.speed;
    this.pos.y += (dy / hyp) * this.speed;
  }

  draw(ctx) {
    ctx.drawImage(this.image, (this.pos.x + (this.image.width / 2)), this.pos.y);
  }

  update(ctx) {
    this.draw(ctx)
  }
}