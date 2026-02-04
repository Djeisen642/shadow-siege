import { Game } from './engine/Game.js';

window.addEventListener('DOMContentLoaded', () => {
  const game = new Game();
  window.game = game; // Debug access
  console.log("Shadow Siege Engine Started");
});
