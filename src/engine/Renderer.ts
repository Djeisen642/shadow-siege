import { Entity } from '../entities/Entity';
import { COLORS } from './Constants';

export class Renderer {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  width: number;
  height: number;
  lightCanvas: HTMLCanvasElement;
  lightCtx: CanvasRenderingContext2D;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d')!;
    this.width = canvas.width;
    this.height = canvas.height;

    // Light mask canvas
    this.lightCanvas = document.createElement('canvas');
    this.lightCtx = this.lightCanvas.getContext('2d')!;

    this.resize();
    window.addEventListener('resize', () => this.resize());
  }

  resize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.canvas.width = this.width;
    this.canvas.height = this.height;

    this.lightCanvas.width = this.width;
    this.lightCanvas.height = this.height;
  }

  clear() {
    this.ctx.fillStyle = COLORS.BACKGROUND;
    this.ctx.fillRect(0, 0, this.width, this.height);
  }

  drawEntities(entities: Entity[]) {
    // Sort by z-index or type if needed
    for (const entity of entities) {
      this.ctx.save();
      entity.draw(this.ctx);
      this.ctx.restore();
    }
  }

  drawLighting(entities: Entity[]) {
    // 1. Fill the light mask with darkness (Fog of War)
    this.lightCtx.globalCompositeOperation = 'source-over';
    this.lightCtx.fillStyle = COLORS.LIGHT_MASK;
    this.lightCtx.fillRect(0, 0, this.width, this.height);

    // 2. Punch holes for lights
    this.lightCtx.globalCompositeOperation = 'destination-out';

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
        entity.drawOverlay(this.ctx);
        this.ctx.restore();
      }
    }
  }

  isPointLit(_x: number, _y: number) {
    return false; // Deprecated for direct geometric check in Game logic
  }
}
