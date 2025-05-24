// App.jsx
import React, { useState, useEffect } from "react";
import GameMap from "./components/GameMap";
import StatsPanel from "./components/StatsPanel";
import ActivityPanel from "./components/ActivityPanel";
import GameOverScreen from "./components/GameOverScreen";
import Timer from "./components/Timer";

function StartScreen({ onStart }) {
  const [name, setName] = useState("");
  const [character, setCharacter] = useState("Frisk");

  return (
    <div className="start-screen" style={{ padding: "2rem" }}>
      <h2>Welcome to the Game</h2>
      <label>
        Enter your name:
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <br />
      <label>
        Choose character:
        <select value={character} onChange={(e) => setCharacter(e.target.value)}>
          <option value="Frisk">Frisk</option>
          <option value="Chara">Chara</option>
          <option value="Asriel">Asriel</option>
        </select>
      </label>
      <br />
      <button onClick={() => onStart(name, character)}>Start Game</button>
    </div>
  );
}

function GameOverScreen() {
  return (
    <div className="game-over" style={{ textAlign: "center", padding: "2rem" }}>
      <h1>Game Over</h1>
      <p>Your stats dropped too low!</p>
    </div>
  );
}

import { format } from "date-fns";

function Timer() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const totalMinutes = count;
  const day = Math.floor(totalMinutes / 1440) + 1;
  const time = new Date(0, 0, 0, 0, totalMinutes % 1440);

  return (
    <div className="timer">
      Day {day} | {format(time, "HH:mm")}
    </div>
  );
}



export default function App() {
  const [started, setStarted] = useState(false);
  const [username, setUsername] = useState("");
  const [character, setCharacter] = useState("Frisk");
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

  const handleStart = (name, char) => {
    setUsername(name);
    setCharacter(char);
    setStarted(true);
  };

  return !started ? (
    <StartScreen onStart={handleStart} />
  ) : (
    <div className="app">
      {gameOver ? (
        <GameOverScreen />
      ) : (
        <>
          <Timer />
          <StatsPanel {...{ food, energy, hygiene, mood, money }} />
          <GameMap updateStats={updateStats} checkGameOver={checkGameOver} />
          <ActivityPanel updateStats={updateStats} checkGameOver={checkGameOver} />
          <p>Character: {character}</p>
        </>
      )}
    </div>
  );
}