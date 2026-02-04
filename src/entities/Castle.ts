import { Entity } from './Entity';
import type { Game } from '../engine/Game';
import { COLORS, CASTLE_STATS } from '../engine/Constants';

export class Castle extends Entity {
  health: number;
  maxHealth: number;

  constructor(game: Game, x: number, y: number) {
    super(game, x, y);
    this.radius = CASTLE_STATS.RADIUS;
    this.health = CASTLE_STATS.HEALTH;
    this.maxHealth = CASTLE_STATS.HEALTH;
    this.color = COLORS.CASTLE;
    // Castle emits some light
    this.lightRadius = CASTLE_STATS.LIGHT_RADIUS;
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
    ctx.fillStyle = COLORS.CASTLE_BASE;
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
    ctx.fillStyle = COLORS.HEALTH_BAR_BG;
    ctx.fillRect(this.x - 25, this.y - 40, 50, 6);
    ctx.fillStyle = COLORS.HEALTH_BAR_FG;
    ctx.fillRect(this.x - 25, this.y - 40, 50 * hpPct, 6);
  }
}
