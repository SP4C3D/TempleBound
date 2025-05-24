import React from "react";

export default function GameOverScreen() {
  return (
    <div className="game-over" style={{ textAlign: "center", padding: "2rem" }}>
      <h1>Game Over</h1>
      <p>Your stats dropped too low!</p>
    </div>
  );
}
