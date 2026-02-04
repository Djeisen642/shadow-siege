import { Renderer } from './Renderer';
import { Input } from './Input';
import { LightSpell } from '../entities/LightSpell';
import { Enemy } from '../entities/Enemy';
import { Tower } from '../entities/Tower';
import { ResourceNode } from '../entities/ResourceNode';
import { Castle } from '../entities/Castle';
import { Entity } from '../entities/Entity';

interface GameEffect {
  type: string;
  life: number;
  color?: string;
  sx?: number;
  sy?: number;
  ex?: number;
  ey?: number;
}

export class Game {
  canvas: HTMLCanvasElement;
  renderer: Renderer;
  input: Input;
  entities: Entity[];
  effects: GameEffect[];
  lastTime: number;
  isGameOver: boolean;
  resources: { gold: number; mana: number };
  uiGold: HTMLElement | null;
  uiMana: HTMLElement | null;
  castle: Castle;
  enemySpawnTimer: number;
  resourceSpawnTimer: number;
  ActionMode: string | null;

  constructor() {
    this.canvas = document.getElementById('gameCanvas') as HTMLCanvasElement;
    this.renderer = new Renderer(this.canvas);
    this.input = new Input(this.canvas);

    this.entities = [];
    this.effects = [];
    this.lastTime = 0;
    this.isGameOver = false;
    this.ActionMode = null;

    this.resources = {
      gold: 250,
      mana: 100,
    };

    this.uiGold = document.getElementById('gold-count');
    this.uiMana = document.getElementById('mana-count');

    this.castle = new Castle(this, this.renderer.width / 2, this.renderer.height / 2);
    this.entities.push(this.castle);

    this.input.addListener((type, data) => this.handleInput(type, data));
    this.setupUI();

    this.enemySpawnTimer = 0;
    this.resourceSpawnTimer = 0;

    requestAnimationFrame((ts) => this.loop(ts));
  }

  setupUI() {
    document
      .getElementById('btn-light')
      ?.addEventListener('click', () => this.setActionMode('CAST_LIGHT'));
    document
      .getElementById('btn-tower-melee')
      ?.addEventListener('click', () => this.setActionMode('BUILD_MELEE'));
    document
      .getElementById('btn-tower-ranged')
      ?.addEventListener('click', () => this.setActionMode('BUILD_RANGED'));

    // Global key listener for ESC
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') this.setActionMode(null);
    });
  }

  setActionMode(mode: string | null) {
    this.ActionMode = mode;
    document.querySelectorAll('.control-btn').forEach((b) => b.classList.remove('active'));

    if (mode === 'CAST_LIGHT') document.getElementById('btn-light')?.classList.add('active');
    if (mode === 'BUILD_MELEE') document.getElementById('btn-tower-melee')?.classList.add('active');
    if (mode === 'BUILD_RANGED')
      document.getElementById('btn-tower-ranged')?.classList.add('active');
  }

  handleInput(type: string, data: any) {
    if (this.isGameOver) return;

    if (type === 'contextmenu') {
      this.setActionMode(null);
      return;
    }

    if (type === 'mousedown') {
      if (this.ActionMode === 'CAST_LIGHT') {
        if (this.resources.mana >= 10) {
          this.resources.mana -= 10;
          this.entities.push(new LightSpell(this, data.x, data.y));
          // PERSISTENT: Do NOT clear ActionMode
        }
      } else if (this.ActionMode === 'BUILD_MELEE') {
        if (this.resources.gold >= 50) {
          this.resources.gold -= 50;
          this.entities.push(new Tower(this, data.x, data.y, 'MELEE'));
          // PERSISTENT
        }
      } else if (this.ActionMode === 'BUILD_RANGED') {
        if (this.resources.gold >= 100) {
          this.resources.gold -= 100;
          this.entities.push(new Tower(this, data.x, data.y, 'RANGED'));
          // PERSISTENT
        }
      } else {
        // Check for clicks on Resource Nodes
        // Reverse iterate to click top ones first (though rarely overlaps)
        for (let i = this.entities.length - 1; i >= 0; i--) {
          const ent = this.entities[i];
          if (ent instanceof ResourceNode) {
            if (ent.checkClick(data.x, data.y)) {
              break; // Handled
            }
          }
        }
      }
    }
  }

  gameOver() {
    this.isGameOver = true;
    alert('GAME OVER! The Shadow has consumed you.');
    location.reload();
  }

  loop(timestamp: number) {
    const deltaTime = Math.min((timestamp - this.lastTime) / 1000, 0.1); // Cap dt
    this.lastTime = timestamp;

    if (!this.isGameOver) {
      this.update(deltaTime);
    }
    this.draw();

    requestAnimationFrame((ts) => this.loop(ts));
  }

  update(deltaTime: number) {
    // Spawning Logic
    this.enemySpawnTimer -= deltaTime;
    if (this.enemySpawnTimer <= 0) {
      this.spawnEnemy();
      this.enemySpawnTimer = 3.0; // Every 3 seconds
    }

    this.resourceSpawnTimer -= deltaTime;
    if (this.resourceSpawnTimer <= 0) {
      this.spawnResource();
      this.resourceSpawnTimer = 5.0; // Every 5 seconds
    }

    // Regen Mana
    if (this.resources.mana < 100) {
      this.resources.mana += 5 * deltaTime;
    }

    // Clean dead entities
    this.entities = this.entities.filter((e) => !e.markedForDeletion);
    this.effects = this.effects.filter((e) => {
      e.life -= deltaTime;
      return e.life > 0;
    });

    // Update all
    for (const entity of this.entities) {
      entity.update(deltaTime);
    }

    // Update UI
    if (this.uiGold) this.uiGold.textContent = Math.floor(this.resources.gold).toString();
    if (this.uiMana) this.uiMana.textContent = Math.floor(this.resources.mana).toString();
  }

  spawnEnemy() {
    // Spawn at random edge
    let x, y;
    if (Math.random() < 0.5) {
      x = Math.random() < 0.5 ? -10 : this.renderer.width + 10;
      y = Math.random() * this.renderer.height;
    } else {
      x = Math.random() * this.renderer.width;
      y = Math.random() < 0.5 ? -10 : this.renderer.height + 10;
    }
    this.entities.push(new Enemy(this, x, y));
  }

  spawnResource() {
    const x = Math.random() * (this.renderer.width - 100) + 50;
    const y = Math.random() * (this.renderer.height - 100) + 50;
    this.entities.push(new ResourceNode(this, x, y));
  }

  draw() {
    this.renderer.clear();
    this.renderer.drawEntities(this.entities);

    // Draw effects
    const ctx = this.renderer.ctx;
    ctx.save();
    for (const effect of this.effects) {
      if (
        effect.type === 'line' &&
        effect.color &&
        effect.sx !== undefined &&
        effect.sy !== undefined &&
        effect.ex !== undefined &&
        effect.ey !== undefined
      ) {
        ctx.strokeStyle = effect.color;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(effect.sx, effect.sy);
        ctx.lineTo(effect.ex, effect.ey);
        ctx.stroke();
      }
    }
    ctx.restore();

    this.renderer.drawLighting(this.entities);
    this.renderer.drawOverlays(this.entities);
  }

  // Geometric check for lighting
  isPointLit(x: number, y: number) {
    for (const entity of this.entities) {
      if (entity.lightRadius > 0) {
        const dx = x - entity.x;
        const dy = y - entity.y;
        if (dx * dx + dy * dy < entity.lightRadius * entity.lightRadius) {
          return true;
        }
      }
    }
    return false;
  }
}
