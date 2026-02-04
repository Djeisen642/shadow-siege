import { Entity } from './Entity';
import type { Game } from '../engine/Game';
import { COLORS, ENEMY_STATS } from '../engine/Constants';

export class Enemy extends Entity {
  speed: number;
  health: number;
  value: number;
  targetBase: { x: number; y: number };

  constructor(game: Game, x: number, y: number) {
    super(game, x, y);
    this.speed = ENEMY_STATS.SPEED;
    this.radius = ENEMY_STATS.RADIUS;
    this.health = ENEMY_STATS.HEALTH;
    this.value = ENEMY_STATS.VALUE;
    this.color = COLORS.ENEMY;
    // Assuming base is center for now, or use game.castle coords if available in constructor
    this.targetBase = { x: game.renderer.width / 2, y: game.renderer.height / 2 };
  }

  update(deltaTime: number) {
    if (this.health <= 0) {
      this.markedForDeletion = true;
      this.game.resources.gold += this.value;
      return;
    }

    // Move towards castle
    if (!this.game.castle) return;

    const dx = this.game.castle.x - this.x;
    const dy = this.game.castle.y - this.y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist > this.game.castle.radius) {
      this.x += (dx / dist) * this.speed * deltaTime;
      this.y += (dy / dist) * this.speed * deltaTime;
    } else {
      // Reached base - deal damage
      this.game.castle.takeDamage(ENEMY_STATS.DAMAGE);
      this.markedForDeletion = true;
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    // Only draw if lit!
    const isLit = this.game.isPointLit(this.x, this.y);

    if (isLit) {
      ctx.fillStyle = this.color;
      ctx.beginPath();
      // Draw Square for enemy
      ctx.rect(this.x - this.radius, this.y - this.radius, this.radius * 2, this.radius * 2);
      ctx.fill();

      // Health bar
      ctx.fillStyle = COLORS.HEALTH_BAR_BG;
      ctx.fillRect(this.x - 10, this.y - 15, 20, 3);
      ctx.fillStyle = COLORS.HEALTH_BAR_ENEMY_FG;
      ctx.fillRect(this.x - 10, this.y - 15, 20 * (this.health / ENEMY_STATS.HEALTH), 3);
    }
  }
}
