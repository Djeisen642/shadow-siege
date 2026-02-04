/**
 * Represents the current action the player is performing.
 * - 'CAST_LIGHT': Clicking will spawn a LightSpell.
 * - 'BUILD_MELEE': Clicking will spawn a Melee Tower.
 * - 'BUILD_RANGED': Clicking will spawn a Ranged Tower.
 * - null: No active tool selected (default state).
 */
export type ActionMode = 'CAST_LIGHT' | 'BUILD_MELEE' | 'BUILD_RANGED' | null;

export type TowerType = 'MELEE' | 'RANGED';

/**
 * Resource costs for various actions.
 * - Gold is used for Towers.
 * - Mana is used for Spells.
 */
export const COSTS = {
  LIGHT_SPELL: 10, // Mana cost
  TOWER_MELEE: 50, // Gold cost
  TOWER_RANGED: 100, // Gold cost
} as const;

/**
 * Configuration for Tower capabilities.
 * - RANGE: Radius in pixels.
 * - DAMAGE: Health deducted from enemy per hit.
 * - FIRE_RATE: Cooldown in seconds between attacks (Lower is faster).
 */
export const TOWER_STATS = {
  MELEE: {
    RANGE: 60, // Short range
    DAMAGE: 20, // High damage
    FIRE_RATE: 0.5, // Fast attack speed
  },
  RANGED: {
    RANGE: 200, // Long range
    DAMAGE: 10, // Lower damage
    FIRE_RATE: 1.5, // Slow attack speed
  },
} as const;

/**
 * Timers for spawning events (in Seconds).
 */
export const SPAWN_RATES = {
  ENEMY: 3.0, // Time between enemy spawns
  RESOURCE: 5.0, // Time between resource node spawns
} as const;

/**
 * Base Game Configuration
 */
export const GAME_CONFIG = {
  STARTING_GOLD: 250,
  STARTING_MANA: 100,
  MAX_MANA: 100,
} as const;

/**
 * Entity Statistics and Properties
 */
export const CASTLE_STATS = {
  RADIUS: 30,
  LIGHT_RADIUS: 200,
  HEALTH: 100,
} as const;

export const ENEMY_STATS = {
  RADIUS: 10,
  SPEED: 40, // Pixels per second
  HEALTH: 30,
  DAMAGE: 10, // Damage dealt to castle
  VALUE: 10, // Gold reward
} as const;

export const RESOURCE_STATS = {
  RADIUS: 12,
  VALUE: 25, // Gold amount
} as const;

export const LIGHT_SPELL_STATS = {
  DURATION: 10.0, // Seconds
  MAX_RADIUS: 150,
} as const;

/**
 * Mana regenerated per second.
 */
export const MANA_REGEN = 5;

/**
 * Centralized color palette for the game.
 */
export const COLORS = {
  BACKGROUND: '#222',
  LIGHT_MASK: 'rgba(0, 0, 0, 0.95)',

  // Entities
  CASTLE: '#fff',
  CASTLE_BASE: '#444',
  ENEMY: '#f00',
  TOWER_MELEE: '#44f',
  TOWER_RANGED: '#4f4',
  RESOURCE_NODE: '#d4af37',
  RESOURCE_FLOAT: '#ffd700',
  LIGHT_SPELL: '#fff',

  // UI / Health
  HEALTH_BAR_BG: 'red',
  HEALTH_BAR_FG: 'lime',
  HEALTH_BAR_ENEMY_FG: 'green',

  // Effects
  EFFECT_MELEE: 'cyan',
  EFFECT_RANGED: 'yellow',
  RANGE_RING: 'rgba(255, 255, 255, 0.6)',
  LIGHT_RING: 'rgba(255, 255, 200, 0.1)',
} as const;
