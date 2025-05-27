import React, { useState } from "react";
import GameMap from "./components/GameMap";
import StatsPanel from "./components/StatsPanel";
import ActivityPanel from "./components/ActivityPanel";
import Timer from "./components/Timer";
import "./App.css";
// import GameOverScreen from "./components/GameOverScreen";

function StartScreen({ onStart }) {
  const characters = ["Frisk", "Chara"];
  const [index, setIndex] = useState(0);
  const [name, setName] = useState("");

  const handleNext = () => setIndex((prev) => (prev + 1) % characters.length);
  const handlePrev = () => setIndex((prev) => (prev - 1 + characters.length) % characters.length);

  const selected = characters[index];

  const [transitioning, setTransitioning] = useState(false);
  const [bgIndex, setBgIndex] = useState(index);

  const handleChange = (dir) => {
    setTransitioning(true);
    setTimeout(() => {
      if (dir === "next") handleNext();
      else handlePrev();
      setBgIndex((prev) => (dir === "next" ? (prev + 1) % characters.length : (prev - 1 + characters.length) % characters.length));
      setTransitioning(false);
    }, 300);
  };

  return (
    <div
      className={`start-screen text-center${transitioning ? " fade-bg" : ""} container-fluid d-flex align-items-center justify-content-center`}
      style={{
        minHeight: "100vh",
        color: "blue",
        backgroundImage: `url('/assets/${characters[bgIndex]} bg.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        transition: "background-image 0.3s ease"
      }}
    >
      <div className="w-100">
        <h1 className="mb-3" style={{ fontFamily: 'PressStart2P, monospace' }}>TempleBound</h1>
        <img src="/assets/Logo.png" className="mb-4" alt="logo" />
        <div id="CharacterSelect" className="d-flex justify-content-center align-items-center mb-4 flex-wrap">
          <button className="btn btn-outline-light me-2 flex-shrink-0" onClick={() => handleChange("prev")} disabled={transitioning} > ⟵ </button>
          <div className={`character-img-wrapper${transitioning ? " fade-char" : ""} mx-2`} style={{ maxWidth: 180, width: "100%" }}>
            <img src={`/assets/${selected} no bg.png`} alt={selected} style={{ width: "100%", maxWidth: 180, height: "auto" }} />
          </div>
          <button className="btn btn-outline-light ms-2 flex-shrink-0" onClick={() => handleChange("next")} disabled={transitioning} > ⟶ </button>
        </div>
        <input type="text" className="form-control w-75 w-md-50 mx-auto mb-3" placeholder="Enter your name here" value={name} onChange={(e) => setName(e.target.value)} />
        <button className="btn btn-primary w-100 w-md-auto" onClick={() => onStart(name, selected)} disabled={transitioning}>Choose</button>
      </div>
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
          <Timer username={username} />
          <StatsPanel {...{ food, energy, hygiene, mood, money }} />
          <GameMap updateStats={updateStats} checkGameOver={checkGameOver} character={character} />
          <ActivityPanel updateStats={updateStats} checkGameOver={checkGameOver} />
        </>
      )}
    </div>
  );
}
