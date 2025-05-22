// App.jsx
import React, { useState } from "react";
import GameMap from "./components/GameMap";
import StatsPanel from "./components/StatsPanel";
import ActivityPanel from "./components/ActivityPanel";
import GameOverScreen from "./components/GameOverScreen";
import Timer from "./components/Timer";

export default function App() {
  const [food, setFood] = useState(50);
  const [energy, setEnergy] = useState(50);
  const [hygiene, setHygiene] = useState(50);
  const [mood, setMood] = useState(50);
  const [money, setMoney] = useState(100);
  const [gameOver, setGameOver] = useState(false);

  const updateStats = (changes) => {
    setFood((f) => Math.min(100, Math.max(0, f + (changes.food || 0))));
    setEnergy((e) => Math.min(100, Math.max(0, e + (changes.energy || 0))));
    setHygiene((h) => Math.min(100, Math.max(0, h + (changes.hygiene || 0))));
    setMood((m) => Math.min(100, Math.max(0, m + (changes.mood || 0))));
    setMoney((m) => m + (changes.money || 0));
  };

  const checkGameOver = () => {
    if (food <= 0 || energy <= 0 || hygiene <= 0 || mood <= 0) {
      setGameOver(true);
    }
  };

  return (
    <div className="app">
      {gameOver ? (
        <GameOverScreen />
      ) : (
        <>
          <Timer />
          <StatsPanel {...{ food, energy, hygiene, mood, money }} />
          <GameMap updateStats={updateStats} checkGameOver={checkGameOver} />
          <ActivityPanel updateStats={updateStats} checkGameOver={checkGameOver} />
        </>
      )}
    </div>
  );
}
