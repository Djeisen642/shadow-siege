import { Entity } from './Entity';
import type { Game } from '../engine/Game';
import { COLORS, RESOURCE_STATS } from '../engine/Constants';

export class ResourceNode extends Entity {
  value: number;
  type: string;
  isCollected: boolean;
  animAlpha: number;
  animY: number;

  constructor(game: Game, x: number, y: number) {
    super(game, x, y);
    this.radius = RESOURCE_STATS.RADIUS;
    this.value = RESOURCE_STATS.VALUE; // Gold
    this.color = COLORS.RESOURCE_NODE;
    this.type = 'GOLD';

    // Animation State
    this.isCollected = false;
    this.animAlpha = 1.0;
    this.animY = 0;
  }

  update(deltaTime: number) {
    if (this.markedForDeletion) return;

    // Auto-collection logic
    if (!this.isCollected) {
      if (this.game.isPointLit(this.x, this.y)) {
        this.isCollected = true;
        this.game.resources.gold += this.value;
        // Don't delete yet, wait for animation
      }
    } else {
      // Animate
      this.animAlpha -= deltaTime * 1.5; // Fade over ~0.7s
      this.animY -= 30 * deltaTime; // Float up

      if (this.animAlpha <= 0) {
        this.markedForDeletion = true;
      }
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    if (this.isCollected) {
      if (this.animAlpha > 0) {
        ctx.globalAlpha = Math.max(0, this.animAlpha);
        ctx.fillStyle = COLORS.RESOURCE_FLOAT; // Brighter gold
        ctx.beginPath();
        // Star shape or diamond
        ctx.moveTo(this.x, this.y - this.radius + this.animY);
        ctx.lineTo(this.x + this.radius, this.y + this.animY);
        ctx.lineTo(this.x, this.y + this.radius + this.animY);
        ctx.lineTo(this.x - this.radius, this.y + this.animY);
        ctx.fill();
        ctx.globalAlpha = 1.0;
      }
    } else if (this.game.isPointLit(this.x, this.y)) {
      ctx.fillStyle = this.color;
      ctx.beginPath();
      // Diamond shape
      ctx.moveTo(this.x, this.y - this.radius);
      ctx.lineTo(this.x + this.radius, this.y);
      ctx.lineTo(this.x, this.y + this.radius);
      ctx.lineTo(this.x - this.radius, this.y);
      ctx.fill();
    }
  }

  drawOverlay(ctx: CanvasRenderingContext2D) {
    if (this.isCollected) {
      ctx.save();
      ctx.globalAlpha = Math.max(0, this.animAlpha);
      ctx.fillStyle = COLORS.RESOURCE_FLOAT;
      ctx.font = 'bold 16px sans-serif';
      ctx.fillText(`+${this.value}`, this.x - 10, this.y - 20 + this.animY);
      ctx.restore();
    }
  }

  checkClick(_x: number, _y: number) {
    return false;
  }
}
