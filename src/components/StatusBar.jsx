import React, { useEffect, useState } from "react";

import Timer from "./Timer";

export default function StatusBar({ username, gameOver, setGameOver, money, setMoney, updateStats, stats }) {
  const [startTime] = useState(new Date());
  const [virtualTime, setVirtualTime] = useState(new Date(startTime));

  useEffect(() => {
    if (gameOver) return;
    const interval = setInterval(() => {
      setVirtualTime((prev) => new Date(prev.getTime() + 60000));

      // Call updateStats to decrement each stat
      updateStats("food", -0.5);
      updateStats("energy", -0.3);
      updateStats("hygiene", -0.15);
      updateStats("mood", -0.2);
    }, 1000);

    return () => clearInterval(interval);
  }, [gameOver]);

  return (
    <div className="bg-light rounded bg-opacity-50 shadow p-3 mb-3">
      <Timer username={username} virtualTime={virtualTime} startTime={startTime} />

      <div className="d-flex w-100">
        <div className="flex-fill text-truncate">
          <span id="Timer"></span>
        </div>
        <div className="text-muted small text-nowrap">
          <i className="fas fa-coins"></i> <span id="money">{money}</span>
        </div>
      </div>

      <div className="row row-cols-lg-4 row-cols-2 mt-3">
        <StatusBarItem icon="fas fa-utensils text-success" value={stats.food} barId="food-bar" barColor="bg-success" />
        <StatusBarItem icon="fas fa-bed text-info" value={stats.energy} barId="energy-bar" barColor="bg-info" />
        <StatusBarItem icon="fas fa-star-of-life text-warning" value={stats.hygiene} barId="hygiene-bar" barColor="bg-warning" />
        <StatusBarItem icon="fas fa-smile text-primary" value={stats.mood} barId="mood-bar" barColor="bg-primary" />
      </div>
    </div>
  );
}

function StatusBarItem({ icon, value, barId, barColor }) {
  return (
    <div className="col d-flex">
      <i className={`${icon} me-1`}></i>
      <div className="progress flex-fill border border-secondary-subtle">
        <div
          id={barId}
          className={`progress-bar ${barColor}`}
          style={{ width: `${value}%` }}
        ></div>
      </div>
    </div>
  );
}