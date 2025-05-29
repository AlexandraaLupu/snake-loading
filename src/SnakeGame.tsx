import React, { useEffect, useRef, useState } from "react";

type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT" | null;

interface SnakeGameProps {
  isRunning: boolean;
}

const SnakeGame: React.FC<SnakeGameProps> = ({ isRunning }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
  const [food, setFood] = useState({ x: 15, y: 15 });
  const [direction, setDirection] = useState<Direction>(null);
  const [speed, setSpeed] = useState(200);
  const [lastDirection, setLastDirection] = useState<Direction>(null);
  const [lastLostTime, setLastLostTime] = useState<Date | null>(null);
  const [resetCount, setResetCount] = useState(0);

  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);

  const gridSize = 20;

  const handleGameOver = () => {
    setResetCount((prev) => prev + 1);
  };

  // Reset game
  useEffect(() => {
    setSnake([{ x: 10, y: 10 }]);
    setFood({ x: 15, y: 15 });
    setDirection(null);
    setLastDirection(null);
    setSpeed(200);
    setScore(0);
  }, [resetCount]);

  

  useEffect(() => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, 400, 400);

    ctx.fillStyle = "#f0f0f0";
    ctx.fillRect(0, 0, 400, 400);

    // Snake drawing
    ctx.fillStyle = "green";
    snake.forEach((part) => {
      ctx.fillRect(
        part.x * gridSize,
        part.y * gridSize,
        gridSize - 2,
        gridSize - 2
      );
    });
    // Food drawing
    ctx.fillStyle = "red";
    ctx.fillRect(
      food.x * gridSize,
      food.y * gridSize,
      gridSize - 2,
      gridSize - 2
    );
  }, [snake, food]);

  // Handle key presses for direction changes
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      const keyMap: Record<string, Direction> = {
        ArrowUp: "UP",
        ArrowDown: "DOWN",
        ArrowLeft: "LEFT",
        ArrowRight: "RIGHT",
      };
      const newDir = keyMap[e.key];
      if (!newDir) return;

      const isValidMove =
        !lastDirection || // First move
        (newDir === "UP" && lastDirection !== "DOWN") ||
        (newDir === "DOWN" && lastDirection !== "UP") ||
        (newDir === "LEFT" && lastDirection !== "RIGHT") ||
        (newDir === "RIGHT" && lastDirection !== "LEFT");

      if (isValidMove) {
        // Clear message on first move
        if (!lastDirection) {
          setLastLostTime(null);
        }
        setDirection(newDir);
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [lastDirection]);

  // Main game loop
  useEffect(() => {
    if (!isRunning || !direction) return;

    const interval = setInterval(() => {
      setSnake((prev) => {
        const head = { ...prev[0] };
        // Move head in the current direction
        switch (direction) {
          case "UP":
            head.y -= 1;
            break;
          case "DOWN":
            head.y += 1;
            break;
          case "LEFT":
            head.x -= 1;
            break;
          case "RIGHT":
            head.x += 1;
            break;
        }

        const newSnake = [head, ...prev];

        // Check food
        if (head.x === food.x && head.y === food.y) {
          const newSpeed = Math.max(50, speed - 20);
          setSpeed(newSpeed);
          setScore((prev) => {
            const newScore = prev + 0.5;
            setHighScore((hs) => Math.max(hs, newScore));
            return newScore;
          });
          setFood({
            x: Math.floor(Math.random() * 20),
            y: Math.floor(Math.random() * 20),
          });
        } else {
          newSnake.pop(); // Move without growing
        }

        // Collision
        const hitWall = head.x < 0 || head.y < 0 || head.x >= 20 || head.y >= 20;
        const hitSelf = newSnake
          .slice(1)
          .some((p) => p.x === head.x && p.y === head.y);
        if (hitWall || hitSelf) {
          setLastLostTime(new Date());
          handleGameOver();
          return prev;
        }

        setLastDirection(direction);
        return newSnake;
      });
    }, speed);

    return () => clearInterval(interval);
  }, [direction, isRunning]);

  return (
    <div>
      <div
        className={`flex justify-center text-lg text-red-400 italic transition-opacity duration-300 ${
          lastLostTime ? "opacity-100" : "opacity-0"
        }`}
      >
        You lost! Try again...
      </div>
      <div className="flex justify-between text-sm w-[400px] mb-2 px-1">
        <div>🍎 Score: {score}</div>
        <div>🏆 High Score: {highScore}</div>
      </div>
      <canvas
        ref={canvasRef}
        width={400}
        height={400}
        className="border border-black rounded"
      />
    </div>
  );
};

export default SnakeGame;
