import { Entity } from '../entities/Entity';
import { COLORS } from './Constants';

export class Renderer {
  // ...

  clear() {
    this.ctx.fillStyle = COLORS.BACKGROUND;
    this.ctx.fillRect(0, 0, this.width, this.height);
  }

  // ...

  drawLighting(entities: Entity[]) {
    // 1. Fill the light mask with darkness (Fog of War)
    this.lightCtx.globalCompositeOperation = 'source-over';
    this.lightCtx.fillStyle = COLORS.LIGHT_MASK;
    this.lightCtx.fillRect(0, 0, this.width, this.height);

    // ...

    for (const entity of entities) {
      if (entity.lightRadius > 0) {
        this.lightCtx.beginPath();
        // Gradient for soft edges
        const g = this.lightCtx.createRadialGradient(
          entity.x,
          entity.y,
          0,
          entity.x,
          entity.y,
          entity.lightRadius
        );
        g.addColorStop(0, 'rgba(0, 0, 0, 1)');
        g.addColorStop(1, 'rgba(0, 0, 0, 0)');

        this.lightCtx.fillStyle = g;
        this.lightCtx.arc(entity.x, entity.y, entity.lightRadius, 0, Math.PI * 2);
        this.lightCtx.fill();
      }
    }

    // 3. Draw the mask onto the main canvas
    this.ctx.save();
    this.ctx.drawImage(this.lightCanvas, 0, 0);
    this.ctx.restore();
  }

  drawOverlays(entities: Entity[]) {
    for (const entity of entities) {
      if (entity.drawOverlay) {
        this.ctx.save();
        entity.drawOverlay!(this.ctx);
        this.ctx.restore();
      }
    }
  }

  isPointLit(_x: number, _y: number) {
    // Check the alpha value of the light mask at this point
    // If alpha is high (dark), it's not lit. If alpha is low (transparent), it is lit.
    // Performance note: getImageData is slow. We might need optimization later (e.g., geometric checks).
    // For now, let's stick to geometric checks for "Lit" status based on entities,
    // because reading pixels every frame for every enemy is too slow.
    return false; // Deprecated for direct geometric check in Game logic
  }
}
