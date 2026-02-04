import { Entity } from './Entity';
import type { Game } from '../engine/Game';
import type { Enemy } from './Enemy';
import { TOWER_STATS, type TowerType } from '../engine/Constants';

export class Tower extends Entity {
  type: TowerType;
  radius: number;
  range: number;
  damage: number;
  cooldown: number;
  fireRate: number;
  lightRadius: number;

  constructor(game: Game, x: number, y: number, type: TowerType) {
    super(game, x, y);
    this.type = type;
    this.radius = 15;

    const stats = TOWER_STATS[type];
    this.range = stats.RANGE;
    this.damage = stats.DAMAGE;
    this.fireRate = stats.FIRE_RATE;
    this.cooldown = 0;

    this.color = type === 'MELEE' ? '#44f' : '#4f4';

    // Ranged towers have a small light radius themselves?
    // Let's say yes, they emit a weak light.
    this.lightRadius = 40;
  }

  update(deltaTime: number) {
    this.cooldown -= deltaTime;

    if (this.cooldown <= 0) {
      // Find target
      const target = this.findTarget();
      if (target) {
        this.fire(target);
        this.cooldown = this.fireRate;
      }
    }
  }

  findTarget(): Enemy | null {
    // Brute force search (optimize with spatial hash later if needed)
    let bestDist = this.range * this.range;
    let bestTarget: Enemy | null = null;

    for (const entity of this.game.entities) {
      // Check if it's an enemy (duck typing or check constructor name)
      if (entity.constructor.name !== 'Enemy') continue;
      if (entity.markedForDeletion) continue;

      const dx = entity.x - this.x;
      const dy = entity.y - this.y;
      const distSq = dx * dx + dy * dy;

      if (distSq <= this.range * this.range) {
        // VISIBILITY CHECK
        // Melee: Can attack in dark? Yes (as per plan)
        // Ranged: Can ONLY attack if target is Lit
        if (this.type === 'RANGED') {
          if (!this.game.isPointLit(entity.x, entity.y)) {
            continue; // Can't see it!
          }
        }

        if (distSq < bestDist) {
          bestDist = distSq;
          bestTarget = entity as Enemy;
        }
      }
    }
    return bestTarget;
  }

  fire(target: Enemy) {
    // Instant hit for melee, Projectile for Ranged?
    // Simplified: Instant hit for now, draw a line.
    target.health -= this.damage;

    // Visual effect
    this.game.effects.push({
      type: 'line',
      sx: this.x,
      sy: this.y,
      ex: target.x,
      ey: target.y,
      color: this.type === 'MELEE' ? 'cyan' : 'yellow',
      life: 0.1,
    });
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();

    // Draw Light Radius (if any)
    if (this.lightRadius > 0) {
      ctx.strokeStyle = 'rgba(255, 255, 200, 0.1)';
      ctx.setLineDash([5, 5]);
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.lightRadius, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);
    }
  }

  drawOverlay(ctx: CanvasRenderingContext2D) {
    // Range Ring - visible on top of darkness
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)'; // Brighter
    ctx.lineWidth = 2; // Thicker
    ctx.setLineDash([10, 10]); // Dashed
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.range, 0, Math.PI * 2);
    ctx.stroke();
    ctx.setLineDash([]);
  }
}
