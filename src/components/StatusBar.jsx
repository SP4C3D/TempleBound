import React, { useEffect, useState } from "react";
import Timer from "./Timer";

export default function StatusBar({ username, gameOver, setGameOver, money, setMoney, updateStats, stats, inventory, setInventory }) {
  const [startTime] = useState(new Date());
  const [virtualTime, setVirtualTime] = useState(new Date(startTime));

  useEffect(() => {
    if (gameOver) return;
    const interval = setInterval(() => {
      setVirtualTime((prev) => new Date(prev.getTime() + 60000));
      updateStats("food", -0.5);
      updateStats("energy", -0.3);
      updateStats("hygiene", -0.15);
      updateStats("mood", -0.2);
    }, 1000);

    return () => clearInterval(interval);
  }, [gameOver]);

  const useItem = (item) => {
    if (inventory[item] <= 0) return;

    switch (item) {
      case "apple":
        updateStats("food", 10);
        break;
      case "music":
        updateStats("mood", 15);
        break;
      case "drink":
        updateStats("energy", 20);
        break;
      default:
        break;
    }

    setInventory(prev => ({
      ...prev,
      [item]: prev[item] - 1
    }));
  };

  const getItemCount = () => Object.values(inventory).reduce((acc, val) => acc + val, 0);

  return (
    <>
      <div className="bg-light rounded bg-opacity-50 shadow p-3 mb-3">
        <Timer username={username} virtualTime={virtualTime} startTime={startTime} />

        <div className="d-flex w-100">
          <div
            className="text-muted small flex-fill text-truncate"
            data-bs-toggle="modal"
            data-bs-target="#backpackModal"
            style={{ cursor: "pointer" }}
          >
            <i className="bi bi-backpack3-fill"></i> {getItemCount()} items
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

      {/* Modal */}
      <div className="modal fade" id="backpackModal" tabIndex="-1" aria-labelledby="backpackModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="backpackModalLabel">Backpack Items</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="row row-cols-6 justify-content-center">
                {inventory.apple > 0 && (
                  <div className="col text-center" onClick={() => useItem("apple")} style={{ cursor: "pointer" }}>
                    <img src="/assets/itemApple.png" alt="Apple" style={{ height: "50px" }} /><br />
                    {inventory.apple}
                  </div>
                )}
                {inventory.music > 0 && (
                  <div className="col text-center" onClick={() => useItem("music")} style={{ cursor: "pointer" }}>
                    <img src="/assets/itemMusic.png" alt="Music" style={{ height: "50px" }} /><br />
                    {inventory.music}
                  </div>
                )}
                {inventory.drink > 0 && (
                  <div className="col text-center" onClick={() => useItem("drink")} style={{ cursor: "pointer" }}>
                    <img src="/assets/itemDrink.png" alt="Energy Drink" style={{ height: "50px" }} /><br />
                    {inventory.drink}
                  </div>
                )}
                {inventory.fish > 0 && (
                  <div className="col text-center">
                    <img src="/assets/itemFish.png" alt="Fish" style={{ height: "50px" }} /><br />
                    {inventory.fish}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
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
