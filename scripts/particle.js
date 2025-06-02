export class Particle {
  constructor(ctx, x, y) {
    this.ctx = ctx;
    this.pos = {x: x, y: y};
    this.radius = Math.ceil(Math.random() * 5);
    this.color = "white";
    this.vel = Math.ceil(Math.random() * 5);
    this.angle = Math.random() * 360 * Math.PI / 180;
    this.alpha = 1;
    this.friction = 0.03;
  }

  draw() {
    this.ctx.save();
    this.ctx.globalAlpha = this.alpha;
    this.ctx.beginPath();
    this.ctx.arc(this.pos.x, this.pos.y, this.radius, 0, 2 * Math.PI);
    this.ctx.fillStyle = this.color;
    this.ctx.fill();
    this.ctx.restore();
  }

  spread() {
    this.pos.x += this.vel * Math.cos(this.angle);
    this.pos.y += this.vel * Math.sin(this.angle);
  }

  update() {
    this.draw();
    this.spread();

    this.vel *= this.friction;
    if (this.vel < 0.001) this.vel = 0;

    if (this.vel < 1) this.alpha -= 0.05;
    if (this.alpha <= 0) this.alpha = 0;
  }
}

const enemyParticleSize = 7;
const enemyParticleVel = 10;
const enemyParticleFriction = 0.04;
export class EnemyParticle extends Particle {
  constructor(ctx, x, y) {
    super(ctx, x, y);
    this.radius = Math.ceil(Math.random() * enemyParticleSize);
    this.color = Math.random() > 0.5 ? "#E45359": "#432F2C";
    this.vel = Math.ceil(Math.random() * enemyParticleVel);
    this.friction = (1 - enemyParticleFriction);
  }
}

const playerParticleSize = 7;
const playerParticleVel = 10;
const playerParticleFriction = 0.04;
export class PlayerParticle extends Particle {
  constructor(ctx, x, y) {
    super(ctx, x, y);
    this.radius = Math.ceil(Math.random() * playerParticleSize);
    this.color = "#48B47E";
    this.vel = Math.ceil(Math.random() * playerParticleVel);
    this.friction = (1 - playerParticleFriction);
  }
}