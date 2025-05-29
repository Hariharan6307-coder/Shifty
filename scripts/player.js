const eyeDisplacement = 7;
const angularVelocity = 7;
const angularAcceleration = 0.5;
const angularFriction = 0.98;

const velocity = 5;

export class Player {
  constructor(ctx, imgSrc, eyeImgSrc) {
    this.ctx = ctx
    this.image = new Image();
    this.eyeImage = new Image();

    this.image.src = imgSrc;
    this.eyeImage.src = eyeImgSrc;

    this.pos = {x: 400, y: 300};
    this.vel = {x: 0, y: 0};

    this.angularVel = 0;
    this.angularAcc = 0;

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
    this.direction.right = false;
    this.direction.left = false;
    this.direction.forward = false;
    if (this.keys['w'] || this.keys['W']) {
      this.direction.forward = true;
    }
    if (this.keys['a'] || this.keys['A']) {
      this.direction.left = true;
    }
    if (this.keys['d'] || this.keys['D']) {
      this.direction.right = true;
    }

    this.angularAcc = 0;
    if (this.direction.left) {
      this.angularAcc = -angularAcceleration;
    };
    if (this.direction.right) {
      this.angularAcc = angularAcceleration;
    };
    if (this.direction.right && this.direction.left) {
      this.angularAcc = 0;
    }

    if (this.angularVel > angularVelocity) this.angularVel = angularVelocity;
    if (this.angularVel < -angularVelocity) this.angularVel = -angularVelocity;

    if (this.angularAcc == 0) {
      this.angularVel *= angularFriction;
      if (Math.abs(this.angularVel) < 0.001) this.angularVel = 0;
    }

    this.angularVel += this.angularAcc;
    this.rotationAngle += this.angularVel;

    if (this.direction.forward) {
      this.pos.x += velocity * Math.sin(this.rotationAngle * Math.PI / 180);
      this.pos.y -= velocity * Math.cos(this.rotationAngle * Math.PI / 180);
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
    this.ctx.drawImage(this.eyeImage, -this.eyeImage.width / 2 - eyeDisplacement * Math.sin(this.eyeRotationAngle),
                       -this.eyeImage.height / 2 - eyeDisplacement * Math.cos(this.eyeRotationAngle));
    this.ctx.restore();
  }

  update(mousePos) {
    this.draw()
    this.move()
    this.eyeMovement(mousePos)
  }
}