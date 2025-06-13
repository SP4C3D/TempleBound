import React, { useState } from "react";
import StartScreen from "./components/StartScreen";
import GameArena from "./components/GameArena";
import StatusBar from "./components/StatusBar";
import ControlActivity from "./components/ControlActivity";
import TempleMapArena from "./components/TempleMapArena";
import HomeMapArena from "./components/HomeMapArena";
import RiverPostMapArena from "./components/RiverPostMapArena";
import GateMapArena from "./components/GateMapArena";
import HallMapArena from "./components/HallMapArena";
import "./App.css";

export default function App() {
  const [username, setUsername] = useState("");
  const [started, setStarted] = useState(false);
  const [character, setCharacter] = useState("Frisk");
  const [gameOver, setGameOver] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionGif, setTransitionGif] = useState(null);
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
  const [keys, setKeys] = useState({
      w: false, a: false, s: false, d: false,
      ArrowUp: false, ArrowDown: false, ArrowLeft: false, ArrowRight: false,
    });

  const triggerTransition = (gifPath, callback) => {
    setIsTransitioning(true);
    setTransitionGif(gifPath);

    setTimeout(() => {
      setIsTransitioning(false);
      setTransitionGif(null);
      if (callback) callback();
    }, 2500); // adjust duration to match your GIF length
  };

  const handleStart = (name, char) => {
    setUsername(name);
    setCharacter(char);
    setStarted(true);
  }
  
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

      // Check for game over
      if (
        updated.food <= 0 ||
        updated.energy <= 0 ||
        updated.hygiene <= 0 ||
        updated.mood <= 0
      ) {
        setGameOver(true);
      }

      return updated;
    });
  }
};


  const handleLocationChange = (loc) => {
      setCurrentLocation(loc);
  };


  if (!started) return <StartScreen onStart={handleStart} />;

  return(
    <>
      <div className="container py-4">
        <div className="row g-4">
          <div className="col-lg-8 col-12">
            {gameOver}
            <StatusBar username={username} gameOver={gameOver} setGameOver={setGameOver} money={money} setMoney={setMoney} updateStats={updateStats} stats={stats}/>
            {mapMode === 'world' && (
              <GameArena character={character} keys={keys} setKeys={setKeys} gameOver={gameOver} onLocationChange={handleLocationChange} entryLocation={worldEntryLocation}/>
            )}
            {mapMode === 'home' && (
              <HomeMapArena character={character} keys={keys} setKeys={setKeys} gameOver={gameOver} onLocationChange={handleLocationChange}/>
            )}
            {mapMode === 'temple'&& (
              <TempleMapArena character={character} keys={keys} setKeys={setKeys} gameOver={gameOver} onLocationChange={handleLocationChange}/>
            )}
            {mapMode === 'riverPost' && (
              <RiverPostMapArena character={character} keys={keys} setKeys={setKeys} gameOver={gameOver} onLocationChange={handleLocationChange}/>
            )}
            {(mapMode === 'gate') && (
              <GateMapArena character={character} keys={keys} setKeys={setKeys} gameOver={gameOver} onLocationChange={handleLocationChange}/>
            )}
            {(mapMode === 'hall') && (
              <HallMapArena character={character} keys={keys} setKeys={setKeys} gameOver={gameOver} onLocationChange={handleLocationChange}/>
            )}
            {isTransitioning && (
              <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark bg-opacity-75 d-flex justify-content-center align-items-center" style={{ zIndex: 10 }}>
                {transitionGif && (<img src={transitionGif} alt="Transition Animation" style={{ maxHeight: "80%", maxWidth: "80%" }} />)}
              </div>
            )}
          </div>
          <div className="col-lg-4 col-12">
            <ControlActivity currentLocation={currentLocation} updateStats={updateStats} mapMode={mapMode} money={money} setMoney={setMoney} triggerTransition={triggerTransition} keys={keys} setKeys={setKeys}/>
          </div>
        </div>
      </div>
    </>
  )
}