export class Player {
  constructor(imgSrc, x, y) {
    this.image = new Image();
    this.image.src = imgSrc;
    this.x = x;
    this.y = y

    this.imgIsLoaded = false;

    this.image.onload = () => {
      this.imgIsLoaded = true;
    }
  }

  draw(ctx) {
    if (this.imgIsLoaded) {
      ctx.drawImage(this.image, this.x, this.y);
    }
  }

  update(ctx) {
    this.draw(ctx)
  }
}