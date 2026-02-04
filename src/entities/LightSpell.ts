import { Entity } from './Entity';
import { Game } from '../engine/Game';
import { COLORS, LIGHT_SPELL_STATS } from '../engine/Constants';

export class LightSpell extends Entity {
  life: number;
  maxLife: number;

  constructor(game: Game, x: number, y: number) {
    super(game, x, y);
    this.life = LIGHT_SPELL_STATS.DURATION;
    this.maxLife = LIGHT_SPELL_STATS.DURATION;
    this.lightRadius = 0; // Starts at 0, grows
    this.color = COLORS.LIGHT_SPELL;
  }

  update(deltaTime: number) {
    this.life -= deltaTime;
    if (this.life <= 0) {
      this.markedForDeletion = true;
      return;
    }

    // Animation: Grow fast, stay, then shrink
    const targetRadius = LIGHT_SPELL_STATS.MAX_RADIUS;

    // Fade out logic
    if (this.life < 5.0) {
      // Shrink in last 5 seconds
      this.lightRadius = targetRadius * (this.life / 5.0);
    } else {
      // Grow / check stability
      if (this.lightRadius < targetRadius) {
        this.lightRadius += 500 * deltaTime; // Grow speed
        if (this.lightRadius > targetRadius) this.lightRadius = targetRadius;
      }
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    // Optional: Draw a small rune or orb at the center
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
    ctx.fill();
  }
}
