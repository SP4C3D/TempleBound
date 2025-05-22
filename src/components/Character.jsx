import React, { useEffect, useState } from "react";

export default function Character({ updateStats, checkGameOver }) {
  const [x, setX] = useState(200);
  const [y, setY] = useState(200);
  const [direction, setDirection] = useState("standdown");

  const speed = 5;

  useEffect(() => {
    const handleKeyDown = (e) => {
      let moved = false;
      switch (e.key) {
        case "ArrowUp":
        case "w":
          setY((y) => y - speed);
          setDirection("up");
          moved = true;
          break;
        case "ArrowDown":
        case "s":
          setY((y) => y + speed);
          setDirection("down");
          moved = true;
          break;
        case "ArrowLeft":
        case "a":
          setX((x) => x - speed);
          setDirection("left");
          moved = true;
          break;
        case "ArrowRight":
        case "d":
          setX((x) => x + speed);
          setDirection("right");
          moved = true;
          break;
        default:
          break;
      }
      if (moved) checkGameOver();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [checkGameOver]);

  return (
    <img
      src={`/Assets/Frisk/${direction}.gif`}
      alt="character"
      style={{ position: "absolute", left: x, top: y, width: "50px", height: "50px" }}
    />
  );
}