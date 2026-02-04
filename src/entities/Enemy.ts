import { Entity } from './Entity';
import type { Game } from '../engine/Game';

export class Enemy extends Entity {
  speed: number;
  health: number;
  value: number;
  targetBase: { x: number; y: number };

  constructor(game: Game, x: number, y: number) {
    super(game, x, y);
    this.speed = 30; // pixels per second
    this.health = 30;
    this.value = 10; // Gold value
    this.radius = 8;
    this.color = '#f00';
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
      this.game.castle.takeDamage(10);
      this.markedForDeletion = true;
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    // Only draw if lit!
    const isLit = this.game.isPointLit(this.x, this.y);

    // Debug: Draw invisible enemies as faint grey? 
    // No, for "Shadow Siege" feeling, they should be INVISIBLE if not lit.
    // But for a web game, maybe a tiny hint or fully invisible.

    if (isLit) {
      ctx.fillStyle = this.color;
      ctx.beginPath();
      // Draw Square for enemy
      ctx.rect(this.x - this.radius, this.y - this.radius, this.radius * 2, this.radius * 2);
      ctx.fill();

      // Health bar
      ctx.fillStyle = 'red';
      ctx.fillRect(this.x - 10, this.y - 15, 20, 3);
      ctx.fillStyle = 'green';
      ctx.fillRect(this.x - 10, this.y - 15, 20 * (this.health / 30), 3);
    }
    // Else: completely invisible in the dark overlay
  }
}
