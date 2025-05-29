# SnakeGame React Component

An interactive and lightweight Snake game implemented as a reusable React component, **designed to entertain users during content loading screens**. This component uses HTML Canvas and React Hooks to deliver a retro gaming experience within your UI.

## What’s Inside?

- `SnakeGame.tsx` – The core **Snake game component**
- `ProgressBarLoader.tsx` – A demo component that shows how to integrate Snake as a **loading screen**
- Additional files – App setup, Tailwind styling, etc., for running the full demo
---

## Features

- Classic Snake game mechanics
- Arrow key controls
- Food generation and growth
- Real-time score and high score tracking
- Collision detection (self and wall)
- Increasing speed after each food collected
- **Styled with Tailwind CSS**

---

## Use Case

This component was specifically created to be embedded into **loading screens** of web applications, giving users something interactive to engage with while content loads in the background.

Example use case:
```tsx
{progress < 100 ? <SnakeGame isRunning={true} /> : <MainContent />}
```

## Installation of the component

1. Add Tailwind CSS to your project
Follow the official Tailwind CSS guide if you haven't already (https://tailwindcss.com/docs/installation/framework-guides)
2. Add the SnakeGame component
Save the component as SnakeGame.tsx in your project and import it:
```tsx
import SnakeGame from './SnakeGame';

<SnakeGame isRunning={true} />
```

## Running the demo locally

1. Clone repository
2. Open the terminal in the demo folder
3. Install dependencies
```
npm install
```
4. Start the local development server
```
npm run dev
```

## Props
- **isRunning**: boolean flag that start or stops the game loop. Used to pause during loading.

## Game Mechanics
- Movement: Arrow keys (↑ ↓ ← →)
- Snake movement: Head moves forward, body follows
- Food mechanics: Food spawns at random grid positions
- Score: +1 points per food, shown in top bar
- Collision: Game resets on self or wall collision
