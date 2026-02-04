import { Game } from './engine/Game';

declare global {
  interface Window {
    game: Game;
  }
}

window.addEventListener('DOMContentLoaded', () => {
  const game = new Game();
  window.game = game; // Debug access
  console.log('Shadow Siege Engine Started');
});
