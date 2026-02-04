export class Entity {
  constructor(game, x, y) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.markedForDeletion = false;
    this.lightRadius = 0; // 0 means no light
    this.radius = 10; // Collision radius
    this.color = '#fff';
  }

  update(deltaTime) {
    // Override me
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
  }
}
