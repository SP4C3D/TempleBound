import React, { useState } from "react";
import StartScreen from "./components/StartScreen";
import GameArena from "./components/GameArena";
import StatusBar from "./components/StatusBar";
import ControlActivity from "./components/ControlActivity";
import "./App.css";
import GameOverScreen from "./components/GameOverScreen";

export default function App() {
  const [username, setUsername] = useState("");
  const [started, setStarted] = useState(false);
  const [character, setCharacter] = useState("Frisk");
  const [gameOver, setGameOver] = useState(false);
  const handleStart = (name, char) => {
    setUsername(name);
    setCharacter(char);
    setStarted(true);
  }
  const[currentLocation, setCurrentLocation] = useState(null);

  if (!started) return <StartScreen onStart={handleStart} />;

  return(
    <>
      <div className="container py-4">
        <div className="row g-4">
          <div className="col-lg-8 col-12">
            {gameOver}
            <StatusBar username={username} gameOver={gameOver} setGameOver={setGameOver}/>
            <GameArena character={character} gameOver={gameOver} onLocationChange={(location) => setCurrentLocation(location)}/>
          </div>
          <div className="col-lg-4 col-12">
            <ControlActivity currentLocation={currentLocation}/>
          </div>
        </div>
      </div>
    </>
  )
}