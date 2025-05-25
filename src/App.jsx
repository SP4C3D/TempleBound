// App.jsx
import React, { useState } from "react";
import GameMap from "./components/GameMap";
import StatsPanel from "./components/StatsPanel";
import ActivityPanel from "./components/ActivityPanel";

function StartScreen({ onStart }) {
  const characters = ["Frisk", "Chara"];
  const [index, setIndex] = useState(0);
  const [name, setName] = useState("");

  const handleNext = () => setIndex((prev) => (prev + 1) % characters.length);
  const handlePrev = () => setIndex((prev) => (prev - 1 + characters.length) % characters.length);

  const selected = characters[index];

  return (
    <div className="start-screen text-center" style={{ padding: "2rem", color: "white" }}>
      <h1 className="mb-3" style={{ fontFamily: 'PressStart2P, monospace' }}>TempleBound</h1>
      <img src="/assets/Logo.png" alt="logo" style={{ width: 100, height: 100 }} className="mb-4" />
      <div className="d-flex justify-content-center align-items-center mb-4">
        <button className="btn btn-outline-light me-2" onClick={handlePrev}>⟵</button>
        <img src={`/assets/${selected}/down.gif`} alt={selected} style={{ width: 100, height: 100 }} />
        <button className="btn btn-outline-light ms-2" onClick={handleNext}>⟶</button>
      </div>
      <input
        type="text"
        className="form-control w-50 mx-auto mb-3"
        placeholder="Enter your name here"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button className="btn btn-primary" onClick={() => onStart(name, selected)}>Choose</button>
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

  if (!started) return <StartScreen onStart={handleStart} />;

  return (
    <div className="app">
      {gameOver ? (
        <GameOverScreen />
      ) : (
        <>
          <Timer />
          <StatsPanel {...{ food, energy, hygiene, mood, money }} />
          <GameMap updateStats={updateStats} checkGameOver={checkGameOver} character={character} />
          <ActivityPanel updateStats={updateStats} checkGameOver={checkGameOver} />
        </>
      )}
    </div>
  );
}
