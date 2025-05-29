import React from "react";

export default function GameOverScreen() {
  return (
    <div id="gameover" className="position-absolute top-0 end-0 bottom-0 start-0 bg-dark bg-opacity-75">
          <img src="assets/gameover.png" alt="Game Over" className="position-absolute top-50 start-50 translate-middle" style={{ width: "40%" }} />
    </div>
  );
}
