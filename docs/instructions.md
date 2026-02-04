# Project Instructions & Development Guidelines

This document serves as a reference for the development patterns, architectural decisions, and workflows established for **Shadow Siege**.

## 1. Codebase Standards

### Magic Values & Constants

- **Do NOT use magic numbers or strings** in the game logic.
- All configuration values must be defined in `src/engine/Constants.ts`.
- **Naming Convention**: Use `UPPER_SNAKE_CASE` for constants (e.g., `GAME_CONFIG`, `ENEMY_STATS`).
- **Grouping**: Group related constants into exported objects (e.g., `TOWER_STATS.MELEE` vs `TOWER_STATS.RANGED`).

### Colors

- **Do NOT hardcode hex codes or color names** (e.g., `'red'`, `'#f00'`) in entity files or the renderer.
- All colors must be defined in the `COLORS` object in `src/engine/Constants.ts`.
- Use semantic names where possible (e.g., `HEALTH_BAR_FG` is better than `LIME`).

### Type Safety

- **Avoid `any`**. Use strictly defined interfaces and Types.
- **Global Augmentation**: `window.game` is typed in `src/main.ts` for debugging. Do not cast `window as any`.

### Linting & Formatting

- The project uses **ESLint** (Flat Config) and **Prettier**.
- Run `bun run lint` to check for specific TypeScript or code style issues.
- Run `bun run format` before committing to ensure consistent styling.

## 2. Deployment

### GitHub Pages

- The project is configured to deploy to GitHub Pages automatically via GitHub Actions.
- **Vite Config**: The `base` property in `vite.config.js` is set to `/shadow-siege/` to support the subdirectory deployment.
- **Workflow**: `.github/workflows/deploy.yml` builds the app using Bun and pushes to the Pages environment.
- **Repository Settings**: Ensure "Pages" source is set to "GitHub Actions" in the repository settings.

## 3. Architecture Overview

### Game Loop

- **Game.ts**: The central hub. Manages `Entities`, `Renderer`, `Input`, and the game loop (`requestAnimationFrame`).
- **Entities**: All game objects (`Tower`, `Enemy`, etc.) extend the abstract `Entity` class.
- **Renderer**: Handles all Canvas 2D API calls. It separates "Main" drawing from "Lighting/Shadow" drawing.

### Lighting System

- **Fog of War**: The `Renderer` draws a black rectangle over the screen.
- **Lights**: Entities with a `lightRadius` "punch holes" in this black layer using `globalCompositeOperation = 'destination-out'`.
- **Logic**: Gameplay logic (e.g., Tower targeting, Resource collection) checks strictly against this lighting status via `game.isPointLit(x, y)`.
