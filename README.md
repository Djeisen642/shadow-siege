# Shadow Siege

A fantasy tower defense game built with **Vanilla JavaScript** and **Vite**, focusing on lighting mechanics and survival.

![Shadow Siege Gameplay](./public/gameplay.png) *(Screenshot placeholder)*

## 🎮 How to Play

The world is consumed by darkness. You must defend your Castle against the relentless siege.

1.  **Light the Way**: Use your **Light Spell (1)** to reveal the map.
2.  **Gather Resources**: Reveal **Gold Nodes** to automatically collect them.
3.  **Build Defenses**:
    *   **Melee Tower (2)**: Short range, high damage. Can attack enemies in the dark.
    *   **Ranged Tower (3)**: Long range. **Can only attack enemies that are revealed by light.**
4.  **Survive**: Enemies will pathfind to your Castle. Don't let your health reach zero!

## 🛠️ Development

### Prerequisites
*   Node.js (v16+)
*   npm

### Installation

```bash
npm install
```

### Running Locally

```bash
npm run dev
```
Open `http://localhost:5173` in your browser.

## 🏗️ Tech Stack
*   **Engine**: Custom Vanilla JS Game Loop (Canvas API)
*   **Build Tool**: Vite
*   **Storage**: None (Session based)

## 🔮 Future Roadmap
*   [ ] Sound Effects & Music
*   [ ] Multiple Enemy Types
*   [ ] Wave System
*   [ ] Permanent Upgrades
