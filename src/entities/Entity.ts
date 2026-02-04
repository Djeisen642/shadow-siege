import type { Game } from '../engine/Game';

export class Entity {
  game: Game;
  x: number;
  y: number;
  markedForDeletion: boolean;
  lightRadius: number;
  radius: number; // Collision radius
  color: string;

  constructor(game: Game, x: number, y: number) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.markedForDeletion = false;
    this.lightRadius = 0; // 0 means no light
    this.radius = 10; // Collision radius
    this.color = '#fff';
  }

  // Optional methods for duck typing
  drawOverlay?(ctx: CanvasRenderingContext2D): void;

  update(_deltaTime: number) {
    // Override me
  }

  draw(_ctx: CanvasRenderingContext2D) {
    // Override me
  }
}
