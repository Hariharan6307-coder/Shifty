export class Player {
  constructor(ctx, imgSrc, eyeImgSrc, x, y) {
    this.ctx = ctx
    this.image = new Image();
    this.eyeImage = new Image();

    this.image.src = imgSrc;
    this.eyeImage.src = eyeImgSrc;
    this.pos = {x: x, y: y}

    this.speed = 5;
    this.rotationSpeed = 2;
    this.rotationEyeDisplacement = 7;


    this.rotationAngle = 0;
    this.eyeRotationAngle = 0;

    this.direction = {
      forward: false,
      right: false,
      left: false
    }

    this.keys = {};
    document.addEventListener('keydown', (e) => {
      this.keys[e.key] = true;
    });
    document.addEventListener('keyup', (e) => {
      this.keys[e.key] = false;
    })
  }

  move() {
    this.direction.forward = false;
    this.direction.down = false;
    this.direction.right = false;
    this.direction.left = false;
    if (this.keys['w'] || this.keys['W']) {
      this.direction.forward = true;
    }
    if (this.keys['a'] || this.keys['A']) {
      this.direction.left = true;
    }
    if (this.keys['d'] || this.keys['D']) {
      this.direction.right = true;
    }

    if (this.direction.left) this.rotationAngle -= this.rotationSpeed;
    if (this.direction.right) this.rotationAngle += this.rotationSpeed;

    if (this.direction.forward) {
      this.pos.x += this.speed * Math.sin(this.rotationAngle * Math.PI / 180);
      this.pos.y -= this.speed * Math.cos(this.rotationAngle * Math.PI / 180);
    }
  }

  eyeMovement(mousePos) {
    let x = this.pos.x - mousePos.x;
    let y = this.pos.y - mousePos.y;
    this.eyeRotationAngle = Math.atan2(x, y);
  }

  draw() {
    this.ctx.save();
    this.ctx.translate(this.pos.x, this.pos.y);
    this.ctx.rotate(this.rotationAngle * Math.PI / 180);
    this.ctx.drawImage(this.image, -this.image.width / 2, -56);
    this.ctx.restore();

    this.ctx.save();
    this.ctx.translate(this.pos.x, this.pos.y);
    this.ctx.drawImage(this.eyeImage, -this.eyeImage.width / 2 - this.rotationEyeDisplacement * Math.sin(this.eyeRotationAngle),
                       -this.eyeImage.height / 2 - this.rotationEyeDisplacement * Math.cos(this.eyeRotationAngle));
    this.ctx.restore();
  }

  update(mousePos) {
    this.draw()
    this.move()
    this.eyeMovement(mousePos)
  }
}