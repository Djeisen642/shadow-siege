import { Entity } from './Entity';
import type { Game } from '../engine/Game';

export class Castle extends Entity {
  health: number;
  maxHealth: number;

  constructor(game: Game, x: number, y: number) {
    super(game, x, y);
    this.radius = 30;
    this.health = 100;
    this.maxHealth = 100;
    this.color = '#fff';
    // Castle emits some light
    this.lightRadius = 80;
  }

  takeDamage(amount: number) {
    this.health -= amount;
    // Visual shake or flash could go here
    if (this.health <= 0) {
      this.game.gameOver();
    }
  }

  update(_deltaTime: number) {
    // Castle doesn't move, but could regenerate health here
  }

  draw(ctx: CanvasRenderingContext2D) {
    // Draw Base
    ctx.fillStyle = '#444';
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();

    // Draw Keep
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.rect(this.x - 15, this.y - 15, 30, 30);
    ctx.fill();

    // Health Bar
    const hpPct = Math.max(0, this.health / this.maxHealth);
    ctx.fillStyle = 'red';
    ctx.fillRect(this.x - 25, this.y - 40, 50, 6);
    ctx.fillStyle = 'lime';
    ctx.fillRect(this.x - 25, this.y - 40, 50 * hpPct, 6);
  }
}
