import React, { useState, useEffect } from "react";
import StartScreen from "./components/StartScreen";
import GameArena from "./components/GameArena";
import StatusBar from "./components/StatusBar";
import ControlActivity from "./components/ControlActivity";
import TempleMapArena from "./components/TempleMapArena";
import HomeMapArena from "./components/HomeMapArena";
import RiverPostMapArena from "./components/RiverPostMapArena";
import GateMapArena from "./components/GateMapArena";
import HallMapArena from "./components/HallMapArena";
import GameOverScreen from "./components/GameOverScreen";
import "./App.css";

export default function App() {
  const [username, setUsername] = useState("");
  const [started, setStarted] = useState(false);
  const [character, setCharacter] = useState("Frisk");
  const [gameOver, setGameOver] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionGif, setTransitionGif] = useState(null);
  const [inventory, setInventory] = useState({
    apple: 1,
    music: 2,
    drink: 2,
    fish : 1
  });
  const [stats, setStats] = useState({
    food: 50,
    energy: 50,
    hygiene: 50,
    mood: 50,
  });
  const [money, setMoney] = useState(1000);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [mapMode, setMapMode] = useState('world');
  const [worldEntryLocation, setWorldEntryLocation] = useState(null);
  const [playTime, setPlayTime] = useState(0);
  const [keys, setKeys] = useState({
    w: false, a: false, s: false, d: false,
    ArrowUp: false, ArrowDown: false, ArrowLeft: false, ArrowRight: false,
  });

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (gameOver) return;
      const key = e.key.toLowerCase();
      if (key === 'w' || key === 'arrowup') setKeys(prev => ({ ...prev, w: true, ArrowUp: true }));
      else if (key === 'a' || key === 'arrowleft') setKeys(prev => ({ ...prev, a: true, ArrowLeft: true }));
      else if (key === 's' || key === 'arrowdown') setKeys(prev => ({ ...prev, s: true, ArrowDown: true }));
      else if (key === 'd' || key === 'arrowright') setKeys(prev => ({ ...prev, d: true, ArrowRight: true }));
    };

    const handleKeyUp = (e) => {
      const key = e.key.toLowerCase();
      if (key === 'w' || key === 'arrowup') setKeys(prev => ({ ...prev, w: false, ArrowUp: false }));
      else if (key === 'a' || key === 'arrowleft') setKeys(prev => ({ ...prev, a: false, ArrowLeft: false }));
      else if (key === 's' || key === 'arrowdown') setKeys(prev => ({ ...prev, s: false, ArrowDown: false }));
      else if (key === 'd' || key === 'arrowright') setKeys(prev => ({ ...prev, d: false, ArrowRight: false }));
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [gameOver]);

  useEffect(() => {
    let timer;
    if (started && !gameOver) {
      timer = setInterval(() => setPlayTime(prev => prev + 1), 1000);
    }
    return () => clearInterval(timer);
  }, [started, gameOver]);

  const triggerTransition = (gifPath, callback) => {
    setIsTransitioning(true);
    setTransitionGif(gifPath);

    setTimeout(() => {
      setIsTransitioning(false);
      setTransitionGif(null);
      if (callback) callback();
    }, 2500);
  };

  const handleStart = (name, char) => {
    setUsername(name);
    setCharacter(char);
    setStarted(true);
    setPlayTime(0);
  };

  const handleRetry = () => {
    setStarted(false);
    setGameOver(false);
    setStats({ food: 50, energy: 50, hygiene: 50, mood: 50 });
    setMoney(1000);
    setInventory({ apple: 1, music: 2, drink: 2, fish: 1 });
    setCurrentLocation(null);
    setMapMode('world');
    setWorldEntryLocation(null);
    setPlayTime(0);
    setKeys({ w: false, a: false, s: false, d: false, ArrowUp: false, ArrowDown: false, ArrowLeft: false, ArrowRight: false });
  };

  const updateStats = (type, value) => {
    if (type === 'mapMode') {
      if (value === 'world') {
        if (mapMode === 'temple') setWorldEntryLocation('Temple');
        else if (mapMode === 'home') setWorldEntryLocation('Home');
        else if (mapMode === 'riverPost') setWorldEntryLocation('River Post');
        else if (mapMode === 'gate') setWorldEntryLocation('Gate');
        else if (mapMode === 'hall') setWorldEntryLocation('Hall');
        else setWorldEntryLocation(null);
      }
      setMapMode(value);
    } else {
      setStats(prev => {
        const newValue = Math.max(Math.min(prev[type] + value, 100), 0);
        const updated = { ...prev, [type]: newValue };
        if (updated.food <= 0 || updated.energy <= 0 || updated.hygiene <= 0 || updated.mood <= 0) setGameOver(true);
        return updated;
      });
    }
  };

  const handleLocationChange = (loc) => setCurrentLocation(loc);

  if (!started) return <StartScreen onStart={handleStart} />;

  return (
    <>
      <div className="container py-4">
        <div className="row g-4">
          <div className="col-lg-8 col-12">
            {!gameOver && (
              <StatusBar username={username} gameOver={gameOver} setGameOver={setGameOver} money={money} setMoney={setMoney} updateStats={updateStats} stats={stats} inventory={inventory} setInventory={setInventory} />
            )}
            {gameOver ? (
              <GameOverScreen onRetry={handleRetry} money={money} stats={stats} playTime={playTime} />
            ) : (
              <>
                {mapMode === 'world' && <GameArena character={character} keys={keys} setKeys={setKeys} gameOver={gameOver} onLocationChange={handleLocationChange} entryLocation={worldEntryLocation} setInventory={setInventory} money={money} stats={stats} playTime={playTime} onRetry={handleRetry} />}
                {mapMode === 'home' && <HomeMapArena character={character} keys={keys} setKeys={setKeys} gameOver={gameOver} onLocationChange={handleLocationChange} money={money} stats={stats} playTime={playTime} onRetry={handleRetry} />}
                {mapMode === 'temple' && <TempleMapArena character={character} keys={keys} setKeys={setKeys} gameOver={gameOver} onLocationChange={handleLocationChange} money={money} stats={stats} playTime={playTime} onRetry={handleRetry} />}
                {mapMode === 'riverPost' && <RiverPostMapArena character={character} keys={keys} setKeys={setKeys} gameOver={gameOver} onLocationChange={handleLocationChange} money={money} stats={stats} playTime={playTime} onRetry={handleRetry} />}
                {mapMode === 'gate' && <GateMapArena character={character} keys={keys} setKeys={setKeys} gameOver={gameOver} onLocationChange={handleLocationChange} money={money} stats={stats} playTime={playTime} onRetry={handleRetry} />}
                {mapMode === 'hall' && <HallMapArena character={character} keys={keys} setKeys={setKeys} gameOver={gameOver} onLocationChange={handleLocationChange} money={money} stats={stats} playTime={playTime} onRetry={handleRetry} />}
              </>
            )}
            {isTransitioning && (
              <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark bg-opacity-75 d-flex justify-content-center align-items-center" style={{ zIndex: 10 }}>
                {transitionGif && <img src={transitionGif} alt="Transition Animation" style={{ maxHeight: "80%", maxWidth: "80%" }} />}
              </div>
            )}
          </div>
          {!gameOver && (
            <div className="col-lg-4 col-12">
              <ControlActivity currentLocation={currentLocation} updateStats={updateStats} mapMode={mapMode} money={money} setMoney={setMoney} triggerTransition={triggerTransition} keys={keys} setKeys={setKeys} inventory={inventory} setInventory={setInventory} />
            </div>
          )}
        </div>
      </div>
    </>
  );
}