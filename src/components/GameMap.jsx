import React from "react";
import Character from "./Character";

export default function GameMap({ updateStats, checkGameOver, character }) {
  return (
    <div className="game-wrapper">
      <div id="game-box" className="position-relative border rounded">
        <Character character={character} updateStats={updateStats} checkGameOver={checkGameOver} />

        <div id="Home" className="location position-absolute ratio ratio-1x1" style={{ top: "13%", left: "7%", width: "6%" }}></div>
        <div id="Hall" className="location position-absolute ratio ratio-1x1" style={{ bottom: "28%", left: "16%", width: "7%" }}></div>
        <div id="River Post" className="location position-absolute ratio ratio-1x1" style={{ top: "42%", right: "12%", width: "8%" }}></div>
        <div id="Gate" className="location position-absolute ratio ratio-1x1" style={{ bottom: "13%", left: "42%", width: "7%" }}></div>
        <div id="Temple" className="location position-absolute ratio ratio-1x1" style={{ top: "24%", left: "42%", width: "11%" }}></div>
        <div id="Time Chamber" className="location position-absolute ratio ratio-1x1" style={{ top: "37%", left: "1%", width: "8%" }}></div>
        <div id="Cheat Trigger" className="location position-absolute ratio ratio-1x1" style={{ top: "0%", left: "98%", width: "2%" }}></div>

        <div id="gameover" className="position-absolute top-0 end-0 bottom-0 start-0 bg-dark bg-opacity-75 d-none">
          <img src="/Assets/gameover.png" alt="Game Over" className="position-absolute top-50 start-50 translate-middle" style={{ width: "40%" }} />
        </div>
      </div>
    </div>
  );
}
