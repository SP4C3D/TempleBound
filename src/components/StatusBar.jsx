import React, { useEffect, useState } from "react";

import Timer from "./Timer";

export default function Statusbar({ username, gameOver, setGameOver}) {
  const [startTime] = useState(new Date());
  const [virtualTime, setVirtualTime] = useState(new Date(startTime));
  const [stats, setStats] = useState({
    food: 100,
    energy: 100,
    hygiene: 100,
    mood: 100,
  });
  

  useEffect(() => {
    if (gameOver) return;
    const interval = setInterval(() => {
      // Advance virtual time by 1 minute
      setVirtualTime((prev) => new Date(prev.getTime() + 60000));

      // Decrease stats every virtual minute (customize as needed)
      setStats((prev) => {
        const updatedStats = {
          food: Math.max(prev.food - 0.5, 0),
          energy: Math.max(prev.energy - 0.3, 0),
          hygiene: Math.max(prev.hygiene - 0.15, 0),
          mood: Math.max(prev.mood - 0.2, 0),
        };

        if (
          updatedStats.food <= 0 ||
          updatedStats.energy <= 0 ||
          updatedStats.hygiene <= 0 ||
          updatedStats.mood <= 0
        ) {
          setGameOver(true);
          clearInterval(interval);
        }

        return updatedStats;
      });
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
          <i className="bi bi-coin"></i> <span id="money">1000</span>
        </div>
      </div>

      <div className="row row-cols-lg-4 row-cols-2 mt-3">
        <StatusBarItem icon="bi bi-egg-fried text-success" value={stats.food} barId="food-bar" barColor="bg-success" />
        <StatusBarItem icon="bi bi-moon-stars text-info" value={stats.energy} barId="energy-bar" barColor="bg-info" />
        <StatusBarItem icon="bi bi-droplet-half text-warning" value={stats.hygiene} barId="hygiene-bar" barColor="bg-warning" />
        <StatusBarItem icon="bi bi-emoji-smile text-primary" value={stats.mood} barId="mood-bar" barColor="bg-primary" />
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
