import { Game } from './engine/Game.js';

window.addEventListener('DOMContentLoaded', () => {
  const game = new Game();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (window as any).game = game; // Debug access
  console.log('Shadow Siege Engine Started');
});
