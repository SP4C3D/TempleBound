import React from "react";

export default function GameOverScreen({ onRetry, money, stats, playTime }) {
  // Calculate score based only on money and time
  const calculateScore = () => {
    // 1. Money component (1 point per 10 money)
    const moneyScore = money / 10;
    
    // 2. Time component (1 point per 10 seconds)
    const timeScore = playTime / 10;
    
    // Combine components with weights (60% money, 40% time)
    const totalScore = (moneyScore * 0.6) + (timeScore * 0.4);
    
    return Math.floor(totalScore);
  };

  // Format play time to MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const finalScore = calculateScore();

  return (
    <div id="gameover" className="position-absolute top-0 end-0 bottom-0 start-0 bg-dark bg-opacity-75 d-flex flex-column justify-content-center align-items-center p-4 text-white">
      {/* Game Over Title Image */}
      <img 
        src="assets/gameover.png" 
        alt="Game Over" 
        className="mb-4" 
        style={{ width: "60%", maxWidth: "400px" }} 
      />
      
      {/* Stats Container */}
      <div className="stats-container bg-dark bg-opacity-90 p-4 rounded mb-4" style={{ width: "90%", maxWidth: "500px" }}>
        <h3 className="text-center mb-3">Game Statistics</h3>
        
        <div className="stat-row mb-2">
          <span className="stat-label">Money Collected:</span>
          <span className="stat-value">${money.toLocaleString()}</span>
        </div>
        
        <div className="stat-row mb-2">
          <span className="stat-label">Time Survived:</span>
          <span className="stat-value">{formatTime(playTime)}</span>
        </div>
        
        <div className="stat-row mb-2">
          <span className="stat-label">Final Score:</span>
          <span className="stat-value fw-bold">{finalScore.toLocaleString()}</span>
        </div>
      </div>
      
      {/* Retry Button */}
      <button 
        className="btn btn-danger btn-lg mt-3 px-5 py-3 fw-bold"
        onClick={onRetry}
        style={{
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0,0,0,0.3)",
          fontSize: "1.2rem",
          minWidth: "200px"
        }}
      >
        RETRY
      </button>

      {/* Optional CSS in JS */}
      <style jsx>{`
        .stat-row {
          display: flex;
          justify-content: space-between;
          padding: 8px 0;
          border-bottom: 1px solid #444;
        }
        .stat-label {
          color: #aaa;
        }
        .stat-value {
          font-weight: 500;
        }
        .stats-container {
          border: 1px solid #444;
        }
      `}</style>
    </div>
  );
}