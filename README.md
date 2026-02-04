# Shadow Siege

A fantasy tower defense game built with **TypeScript** and **Vite**, focusing on lighting mechanics and survival. Powered by the **Bun** runtime.

## 🎮 How to Play

The world is consumed by darkness. You must defend your Castle against the relentless siege.

1.  **Light the Way**: Use your **Light Spell (1)** to reveal the map.
2.  **Gather Resources**: Reveal **Gold Nodes** to automatically collect them.
3.  **Build Defenses**:
    - **Melee Tower (2)**: Short range, high damage. Can attack enemies in the dark.
    - **Ranged Tower (3)**: Long range. **Can only attack enemies that are revealed by light.**
4.  **Survive**: Enemies will pathfind to your Castle. Don't let your health reach zero!

## 🛠️ Development

### Prerequisites

- [Bun](https://bun.sh) (v1.0+)

### Installation

```bash
bun install
```

### Running Locally

```bash
bun dev
```

Open `http://localhost:5173` in your browser.

### Linting & Formatting

```bash
bun run lint      # Check for errors
bun run format    # Fix formatting
```

## 🏗️ Tech Stack

- **Runtime**: Bun
- **Language**: TypeScript
- **Engine**: Custom Game Loop (Canvas API)
- **Build Tool**: Vite
- **Code Quality**: ESLint (Flat Config) + Prettier

## 🔮 Future Roadmap

- [ ] Wave System & Difficulty Scaling
- [ ] Multiple Enemy Types
- [ ] Sound Effects & Music
- [ ] Permanent Upgrades
