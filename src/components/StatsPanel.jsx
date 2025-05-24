import React from "react";

export default function StatsPanel({ food, energy, hygiene, mood, money }) {
  return (
    <div className="stats-panel">
      <p>Money: {money}</p>
      <div>Food: <div style={{ width: `${food}%`, backgroundColor: "green", height: "10px" }} /></div>
      <div>Energy: <div style={{ width: `${energy}%`, backgroundColor: "blue", height: "10px" }} /></div>
      <div>Hygiene: <div style={{ width: `${hygiene}%`, backgroundColor: "orange", height: "10px" }} /></div>
      <div>Mood: <div style={{ width: `${mood}%`, backgroundColor: "purple", height: "10px" }} /></div>
    </div>
  );
}