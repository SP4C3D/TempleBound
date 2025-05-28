import React from "react";

export default function StatsPanel({ food, energy, hygiene, mood, money }) {
  return (
    <div className="bg-light rounded bg-opacity-50 shadow p-3 mb-3">
      <span id="greeting"></span>, <span id="player-name" className="fw-bold"></span>!
      <div className="d-flex w-100">
        <div className="flex-fill text-truncate">
          <span id="Timer"></span>
        </div>
        <div className="text-muted small text-nowrap">
          <i className="fas fa-coins"></i> <span id="money">{money}</span>
        </div>
      </div>
      <div className="row row-cols-lg-4 row-cols-2 mt-3">
        <div className="col d-flex">
          <i className="fas fa-utensils text-success text-end me-1"></i>
          <div className="progress mb-2 flex-fill border border-secondary-subtle">
            <div id="food-bar" className="progress-bar bg-success" style={{ width: `${food}%` }}></div>
          </div>
        </div>
        <div className="col d-flex">
          <i className="fas fa-bed text-info me-1"></i>
          <div className="progress flex-fill border border-secondary-subtle">
            <div id="energy-bar" className="progress-bar bg-info" style={{ width: `${energy}%` }}></div>
          </div>
        </div>
        <div className="col d-flex">
          <i className="fas fa-star-of-life text-warning me-1"></i>
          <div className="progress flex-fill border border-secondary-subtle">
            <div id="hygiene-bar" className="progress-bar bg-warning" style={{ width: `${hygiene}%` }}></div>
          </div>
        </div>
        <div className="col d-flex">
          <i className="fas fa-smile text-primary text-end me-1" style={{ width: "20px" }}></i>
          <div className="progress flex-fill border border-secondary-subtle">
            <div id="mood-bar" className="progress-bar bg-primary" style={{ width: `${mood}%` }}></div>
          </div>
        </div>
      </div>
    </div>
  );
}