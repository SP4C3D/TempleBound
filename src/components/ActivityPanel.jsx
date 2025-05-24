import React from "react";

export default function ActivityPanel({ updateStats, checkGameOver }) {
  const actions = [
    { label: "Eat", changes: { food: +10, hygiene: -5 } },
    { label: "Sleep", changes: { energy: +20, hygiene: -10, food: -5 } },
    { label: "Clean", changes: { hygiene: +15, energy: -5 } },
    { label: "Play", changes: { mood: +20, energy: -10, food: -5 } },
  ];

  return (
    <div className="activity-panel">
      {actions.map(({ label, changes }) => (
        <button
          key={label}
          onClick={() => {
            updateStats(changes);
            checkGameOver();
          }}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
