import React, { useState } from "react";
import StartScreen from "./components/StartScreen";
import GameArena from "./components/GameArena";
import StatusBar from "./components/StatusBar";
import ControlActivity from "./components/ControlActivity";
import TempleMapArena from "./components/TempleMapArena";
import HomeMapArena from "./components/HomeMapArena";
import RiverPostMapArena from "./components/RiverPostMapArena";
import "./App.css";

export default function App() {
  const [username, setUsername] = useState("");
  const [started, setStarted] = useState(false);
  const [character, setCharacter] = useState("Frisk");
  const [gameOver, setGameOver] = useState(false);
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
              <GameArena character={character} gameOver={gameOver} onLocationChange={handleLocationChange} entryLocation = {worldEntryLocation}/>
            )}
            {mapMode === 'home' && (
              <HomeMapArena character={character} onLocationChange={handleLocationChange}/>
            )}
            {mapMode === 'temple'&& (
              <TempleMapArena character={character} onLocationChange={handleLocationChange}/>
            )}
            {mapMode === 'riverPost' && (
              <RiverPostMapArena character={character} onLocationChange={handleLocationChange}/>
            )}
          </div>
          <div className="col-lg-4 col-12">
            <ControlActivity currentLocation={currentLocation} updateStats={updateStats} mapMode={mapMode} money={money} setMoney={setMoney}/>
          </div>
        </div>
      </div>
    </>
  )
}