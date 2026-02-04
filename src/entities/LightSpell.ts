import { Entity } from './Entity';
import type { Game } from '../engine/Game';

export class LightSpell extends Entity {
  life: number;
  maxLife: number;

  constructor(game: Game, x: number, y: number) {
    super(game, x, y);
    this.lightRadius = 150;
    this.life = 10.0; // Seconds
    this.maxLife = 10.0;
  }

  update(deltaTime: number) {
    this.life -= deltaTime;
    if (this.life <= 0) {
      this.markedForDeletion = true;
      return;
    }

    // Smooth fade out
    // Keep full brightness for first 50%, then fade
    const ratio = this.life / this.maxLife;
    if (ratio < 0.5) {
      this.lightRadius = 150 * (ratio * 2); // Linear fade from 150 to 0 over last half of life
    } else {
      this.lightRadius = 150;
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    // Optional: Draw a small rune or orb at the center
    ctx.fillStyle = '#fff';
    ctx.beginPath();
    ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
    ctx.fill();
  }
}
