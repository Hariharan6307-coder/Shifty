import { EnemyParticle, PlayerParticle, RocketParticle } from "./particle.js";

const eyeDisplacement = 7;
const angularVelocity = 5;
const angularAcceleration = 0.5;
const angularFriction = 0.1; 

const acceleration = 1;
const velocity = 7;
const friction = 0.05;

const collisionRadius = 40;

const noOfEnemyParticles = 100;
const noOfPlayerParticles = 100;
const noOfRocketParticles = 3;


export class Player {
  constructor(ctx, imgSrc, eyeImgSrc) {
    this.ctx = ctx
    this.image = new Image();
    this.eyeImage = new Image();

    this.image.src = imgSrc;
    this.eyeImage.src = eyeImgSrc;

    this.pos = {x: 100, y: 100};
    this.vel = 0;
    this.acc = 0;
    this.particles = [];

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
      this.direction.forward = true;
    }

    if (this.angularVel > angularVelocity) this.angularVel = angularVelocity;
    if (this.angularVel < -angularVelocity) this.angularVel = -angularVelocity;

    if (this.angularAcc == 0) {
      this.angularVel *= (1 - angularFriction);
      if (Math.abs(this.angularVel) < 0.001) this.angularVel = 0;
    }

    this.angularVel += this.angularAcc;
    this.rotationAngle += this.angularVel;

    this.acc = 0;
    if (this.direction.forward) this.acc = acceleration;

    if (this.vel > velocity) this.vel = velocity;

    if (this.acc == 0) this.vel *= (1 - friction);

    this.vel += this.acc;

    this.pos.x += this.vel * Math.sin(this.rotationAngle * Math.PI / 180);
    this.pos.y -= this.vel * Math.cos(this.rotationAngle * Math.PI / 180);
  }

  generateRocketParticles () {
    if (this.direction.forward) {
      for (let i = 0; i < noOfRocketParticles; i++) {
        this.particles.push(new RocketParticle(this.ctx, 
          this.pos.x + 40 * Math.sin((this.rotationAngle - 138) * Math.PI / 180), 
          this.pos.y - 40 * Math.cos((this.rotationAngle - 138) * Math.PI / 180), 
          this.rotationAngle + 90));

        this.particles.push(new RocketParticle(this.ctx,
          this.pos.x + 40 * Math.sin((this.rotationAngle + 138) * Math.PI / 180),
          this.pos.y - 40 * Math.cos((this.rotationAngle + 138) * Math.PI / 180),
          this.rotationAngle + 90));
      }
    }
  }

  eyeMovement(mousePos) {
    let x = this.pos.x - mousePos.x;
    let y = this.pos.y - mousePos.y;
    this.eyeRotationAngle = Math.atan2(x, y);
  }

  checkBulletCollisions(bulletGroup) {
    bulletGroup.forEach((bullet) => {
      let dx = this.pos.x - bullet.pos.x;
      let dy = this.pos.y - bullet.pos.y;
      let distance = Math.sqrt(dx * dx + dy * dy);

      if (distance <= collisionRadius + bullet.image.width / 2) {
        for (let i = 0; i < noOfPlayerParticles; i++) {
          this.particles.push(new PlayerParticle(this.ctx, this.pos.x, this.pos.y));
        }
        this.pos.x = 100;
        this.pos.y = 100;
        bullet.isHit = true;
      }
    });
  }

  updateParticles() {
    this.particles = this.particles.filter((particle) => {
      particle.update();
      return particle.alpha;
    });
  }

  checkEnemyCollisions(enemyGroup) {
    enemyGroup.forEach((enemy) => {
      let dx = this.pos.x - enemy.pos.x;
      let dy = this.pos.y - enemy.pos.y;
      let distance = Math.sqrt(dx * dx + dy * dy);

      if (distance <= collisionRadius + enemy.collisionRadius) {
        enemy.isHit = true;

        for (let i = 0; i < noOfEnemyParticles; i++) {
          this.particles.push(new EnemyParticle(this.ctx, enemy.pos.x, enemy.pos.y));
        }
      }
    });

  }

  drawCollisionCircle() {
    this.ctx.beginPath();
    this.ctx.arc(this.pos.x, this.pos.y, collisionRadius, 0, 2 * Math.PI);
    this.ctx.stroke();
    this.ctx.fillStyle = 'white';
    this.ctx.fill();
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

    //this.drawCollisionCircle();
  }

  update(mousePos) {
    this.generateRocketParticles();
    this.updateParticles();
    this.draw()
    this.move()
    this.eyeMovement(mousePos)
    //this.updateParticles();
  }
}