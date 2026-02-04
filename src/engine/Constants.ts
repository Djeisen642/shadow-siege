export type ActionMode = 'CAST_LIGHT' | 'BUILD_MELEE' | 'BUILD_RANGED' | null;
export type TowerType = 'MELEE' | 'RANGED';

export const COSTS = {
  LIGHT_SPELL: 10,
  TOWER_MELEE: 50,
  TOWER_RANGED: 100,
} as const;

export const TOWER_STATS = {
  MELEE: {
    RANGE: 60,
    DAMAGE: 20,
    FIRE_RATE: 0.5,
  },
  RANGED: {
    RANGE: 200,
    DAMAGE: 10,
    FIRE_RATE: 1.5,
  },
} as const;

export const SPAWN_RATES = {
  ENEMY: 3.0,
  RESOURCE: 5.0,
} as const;

export const MANA_REGEN = 5;
