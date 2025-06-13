import React from "react";

export default function GameOverScreen({ onRetry }) {
  return (
    <div id="gameover" className="position-absolute top-0 end-0 bottom-0 start-0 bg-dark bg-opacity-75 d-flex flex-column justify-content-center align-items-center">
      <img 
        src="assets/gameover.png" 
        alt="Game Over" 
        className="mb-4" 
        style={{ width: "40%" }} 
      />
      <button 
        className="btn btn-danger btn-lg mt-3"
        onClick={onRetry}
        style={{
          padding: "10px 30px",
          fontSize: "1.5rem",
          fontWeight: "bold",
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0,0,0,0.3)"
        }}
      >
        RETRY
      </button>
    </div>
  );
}