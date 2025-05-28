import React, { useEffect, useState } from "react";

export default function Character({ updateStats, checkGameOver, character }) {
  const [position, setPosition] = useState({ x: 5, y: 5 });
  const [direction, setDirection] = useState("standdown");

  const speed = 0.5; // movement in percent

  useEffect(() => {
    const handleKeyDown = (e) => {
      const key = e.key.toLowerCase();
      let moved = false;

      setPosition((prev) => {
        let newX = prev.x;
        let newY = prev.y;

        if (key === "arrowup" || key === "w") {
          newY = Math.max(0, newY - speed);
          setDirection("up");
          moved = true;
        } else if (key === "arrowdown" || key === "s") {
          newY = Math.min(95, newY + speed);
          setDirection("down");
          moved = true;
        } else if (key === "arrowleft" || key === "a") {
          newX = Math.max(0, newX - speed);
          setDirection("left");
          moved = true;
        } else if (key === "arrowright" || key === "d") {
          newX = Math.min(95, newX + speed);
          setDirection("right");
          moved = true;
        }

        return { x: newX, y: newY };
      });

      if (moved) checkGameOver();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [checkGameOver]);

  return (
    <img
      src={`/Assets/${character}/${direction}.gif`}
      alt="character"
      style={{
        position: "absolute",
        top: `${position.y}%`,
        left: `${position.x}%`,
        width: "5%",
        transition: "top 0.1s, left 0.1s",
      }}
    />
  );
}
