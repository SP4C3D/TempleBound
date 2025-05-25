import React from "react";
import Character from "./Character";

export default function GameMap({ updateStats, checkGameOver, character }) {
  return (
    <div id="game-box" className="map-area" style={{ position: "relative", width: "100%", height: "400px", background: "url('/Assets/bgGame.jpg')", backgroundSize: "cover" }}>
      <Character updateStats={updateStats} checkGameOver={checkGameOver} character={character} />
    </div>
  );
}