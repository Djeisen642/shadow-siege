# Shadow Siege - Implementation Plan - TypeScript Migration

## Goal
Migrate the existing Vanilla JS codebase to TypeScript to improve code quality, catch errors (likem `frie` vs `fire`), and provide better autocomplete.

## Proposed Changes

### 1. Configuration
- Install `typescript` and `vite-plugin-checker` (optional).
- Create `tsconfig.json`.

### 2. Rename Files
- `src/main.js` -> `src/main.ts`
- `src/engine/*.js` -> `src/engine/*.ts`
- `src/entities/*.js` -> `src/entities/*.ts`

### 3. Updates
- Update `index.html` to reference `main.ts`.
- Add type annotations to core classes (`Game`, `Entity`, `Renderer`).
- Fix any immediate type errors.

## Verification Plan
- Build the project (`npm run build`).
- Verify the game runs same as before.

# Shadow Siege - Implementation Plan

## Goal Description
Build a fantasy tower defense game where the player must gather resources and defend against enemies in a dark environment. Key mechanics include a "Fog of War" style darkness that hides enemies, light spells to reveal them, and varied tower types (close combat vs ranged).

## User Review Required
> [!NOTE]
> I will be using **Vite** with **Vanilla JavaScript** to ensure a performant and modern development environment without the overhead of a heavy framework, as this is a game loop-centric application.

## Proposed Changes

### Project Structure
I will create a new project using `vite` in the current directory.

#### [NEW] [index.html](file:///home/jasondev/code/shadow-siege/index.html)
- Main entry point, contains the `<canvas>` element and UI overlays.

#### [NEW] [src/main.js](file:///home/jasondev/code/shadow-siege/src/main.js)
- Bootstraps the game engine.

#### [NEW] [src/engine/Game.js](file:///home/jasondev/code/shadow-siege/src/engine/Game.js)
- Core game loop (requestAnimationFrame).
- Manages Game State (Resources, Lives, Wave info).
- Handles the entity list.

#### [NEW] [src/engine/Renderer.js](file:///home/jasondev/code/shadow-siege/src/engine/Renderer.js)
- Handles Clear/Draw cycle.
- **Lighting System**: 
    - Draws a dark overlay (Fog of War).
    - Subtracts "light" circles (Spells, Buildings).
    - Draws a dark overlay (Fog of War).
    - Subtracts "light" circles (Spells, Buildings).
    - **CRITICAL**: Exports a helper `isPointLit(x, y)` for game logic to check if an enemy is targetable.
- **Overlay System**: Draws UI elements (Range Rings, Floating Text) *on top* of the darkness so they remain visible.

#### [NEW] [src/engine/Input.js](file:///home/jasondev/code/shadow-siege/src/engine/Input.js)
- Mouse interactions for building and casting spells.

#### [NEW] [src/entities/Entity.js](file:///home/jasondev/code/shadow-siege/src/entities/Entity.js)
- Base class for all game objects.

#### [NEW] [src/entities/LightSpell.js](file:///home/jasondev/code/shadow-siege/src/entities/LightSpell.js)
- **Lifecycle**: Has a `lifetime` (e.g., 5 seconds).
- **Dimming**: `radius` or `intensity` decreases as `lifetime` approaches 0.
- Registered with the `Renderer` to punch holes in the darkness.

#### [NEW] [src/entities/ResourceNode.js](file:///home/jasondev/code/shadow-siege/src/entities/ResourceNode.js)
- Spawned randomly in the dark.
#### [NEW] [src/entities/ResourceNode.js](file:///home/jasondev/code/shadow-siege/src/entities/ResourceNode.js)
- Spawned randomly in the dark.
- **Auto-Collection**: If the node becomes Lit (via Light Spell or Tower light), it triggers a "Collected" state.
- **Visuals**: Fades out, floats up, and shows "+Amount" text.

#### [NEW] [src/entities/Enemy.js](file:///home/jasondev/code/shadow-siege/src/entities/Enemy.js)
- Movement logic (Flow Field pathfinding towards base).
- Health and resource drop on death.

#### [NEW] [src/entities/Tower.js](file:///home/jasondev/code/shadow-siege/src/entities/Tower.js)
- Logic for targeting enemies.
- Two types:
    - **Melee**: Always active, short range. Attacks anything that gets too close (even in dark).
    - **Ranged**: Long range, but **ONLY fires if the target is in a Lit / Revealed area**. This implements the "Siege" feel where you must light up targets to kill them at a distance.
- **Visuals**: Draw a faint circle indicating the attack range.

#### [NEW] [src/ui/UIManager.js](file:///home/jasondev/code/shadow-siege/src/ui/UIManager.js)
- Updates DOM elements for resources and buttons.

## Verification Plan

### Automated Tests
- N/A for this initial game prototype (visual nature makes unit testing less immediate, focus is on gameplay loop).

### Manual Verification
1.  **Start the Dev Server**: Run `npm run dev`.
2.  **Visual Check**:
    - Verify the screen is mostly dark.
    - Click to cast a "Light Spell" and verify it reveals the area.
3.  **Gameplay Loop**:
    - Spawn enemies (debug or auto).
    - Place a Tower.
    - Verify ranged towers only shoot when enemies are lit.
    - Verify resources increase when enemies are killed.

## Distribution Strategy (Steam & Cross-Platform)
To achieve the goal of a cross-platform Steam release, we will easily wrap this web application later using **Electron** or **Tauri**.
- **Cross-Platform**: These tools bundle the web code into native executables for Windows, macOS, and Linux.
- **Steam Integration**: Libraries like `greenworks` (for Electron) or native Rust crates (for Tauri) allow integration with Steamworks SDK (Achievements, Cloud Saves, etc.).
- **Strategy**: We will build the Core Game as a web app first for rapid iteration. Once mechanics are solid, we will wrap it for distribution.
#### [NEW] [src/entities/Castle.js](file:///home/jasondev/code/shadow-siege/src/entities/Castle.js)
- Implements the "Base" that enemies attack.
- Has `health` (Player Lives).
- Game Over when health <= 0.
- Centered on screen.

#### [MODIFY] [src/engine/Game.js](file:///home/jasondev/code/shadow-siege/src/engine/Game.js)
- **Selection Logic**: Modify `handleInput` to keep `ActionMode` active after use.
- **Cancellation**: Add `RightClick` or `Escape` listener to clear `ActionMode`.
- **Game Over**: Check Castle health.

#### [MODIFY] [src/entities/Enemy.js](file:///home/jasondev/code/shadow-siege/src/entities/Enemy.js)
- Update targeting to find `Castle` entity specifically instead of arbitrary point.

## Verification Plan

### Manual Verification
4.  **Siege Logic**:
    - Verify centralized Castle exists.
    - Verify enemies move towards it and damage it (reduce lives/health).
5.  **UI/UX**:
    - Select "Light", cast multiple times without re-selecting.
    - Right-click to cancel selection.
