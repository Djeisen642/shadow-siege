import { Entity } from './Entity.js';

export class LightSpell extends Entity {
  constructor(game, x, y) {
    super(game, x, y);
    this.lifetime = 5.0; // Seconds
    this.maxLifetime = 5.0;
    this.maxRadius = 150;
    this.lightRadius = this.maxRadius;
    this.color = 'rgba(255, 255, 200, 0.5)';
    this.radius = 5; // Small visible center
  }

  update(deltaTime) {
    this.lifetime -= deltaTime;
    if (this.lifetime <= 0) {
      this.markedForDeletion = true;
    }

    // Dimming effect: shrink radius and maybe flicker
    const lifeRatio = this.lifetime / this.maxLifetime;

    // Non-linear fade for better feel (stays bright then drops off)
    // ease-in-out cubic
    this.lightRadius = this.maxRadius * (lifeRatio * lifeRatio * (3 - 2 * lifeRatio));
  }

  draw(ctx) {
    // Optional: Draw a small rune or orb at the center
    ctx.fillStyle = '#fff';
    ctx.beginPath();
    ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
    ctx.fill();
  }
}
