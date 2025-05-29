import React, { useState, useEffect } from "react";
import GameOverScreen from "./GameOverScreen";

export default function GameArena({ character, gameOver }) {
  const [charPosition, setCharPosition] = useState({
    px: { x: 0, y: 0 },
    percent: { x: 0, y: 0 },
  });

  const [keys, setKeys] = useState({
    w: false, a: false, s: false, d: false,
    ArrowUp: false, ArrowDown: false, ArrowLeft: false, ArrowRight: false,
  });

  const [direction, setDirection] = useState("Down");
  const [isMoving, setIsMoving] = useState(false);

  const speed = 1;

  // --- Handle key presses ---
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (gameOver) return;

      const key = e.key.toLowerCase();
      if (Object.keys(keys).includes(key)) {
        setKeys(prev => {
          const updated = { ...prev, [key]: true };
          setIsMoving(true);
          return updated;
        });
      }
    };

    const handleKeyUp = (e) => {
      const key = e.key.toLowerCase();
      if (Object.keys(keys).includes(key)) {
        setKeys(prev => {
          const updated = { ...prev, [key]: false };
          const stillMoving = Object.values(updated).some(v => v);
          setIsMoving(stillMoving);
          return updated;
        });
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [gameOver]);

  // --- Game loop movement ---
  useEffect(() => {
    let animationFrameId;

    const gameLoop = () => {
      if (gameOver) return;

      setCharPosition(prev => {
        const gameContainer = document.getElementById("game-box");
        if (!gameContainer) return prev;

        const containerWidth = gameContainer.clientWidth;
        const containerHeight = gameContainer.clientHeight;

        let newPxX = prev.px.x;
        let newPxY = prev.px.y;

        if (keys.w || keys.ArrowUp) {
          newPxY -= speed;
          setDirection("Up");
        } else if (keys.s || keys.ArrowDown) {
          newPxY += speed;
          setDirection("Down");
        }

        if (keys.a || keys.ArrowLeft) {
          newPxX -= speed;
          setDirection("Left");
        } else if (keys.d || keys.ArrowRight) {
          newPxX += speed;
          setDirection("Right");
        }

        const charWidth = containerWidth * 0.05;
        const charHeight = containerHeight * 0.05;

        newPxX = Math.max(0, Math.min(newPxX, containerWidth - charWidth));
        newPxY = Math.max(0, Math.min(newPxY, containerHeight - charHeight));

        const newPercentX = (newPxX / containerWidth) * 100;
        const newPercentY = (newPxY / containerHeight) * 100;

        return {
          px: { x: newPxX, y: newPxY },
          percent: { x: newPercentX, y: newPercentY },
        };
      });

      animationFrameId = requestAnimationFrame(gameLoop);
    };

    if (!gameOver) gameLoop();
    return () => cancelAnimationFrame(animationFrameId);
  }, [keys, gameOver]);

  // --- Animation suffix for idle or moving state ---
  const animationSuffix = isMoving ? "" : "Stand";
  const characterImageSrc = `/assets/${character}/${animationSuffix}${direction}.gif`;

  return (
    <div className="game-wrapper position-relative">
      <div id="game-box" className="position-relative border rounded">
        <img
          id="character"
          src={characterImageSrc}
          alt="Character"
          className="position-absolute"
          style={{
            top: `${charPosition.percent.y}%`,
            left: `${charPosition.percent.x}%`,
            width: "5%",
          }}
        />
        {/* Zones */}
        <div id="Home" className="location position-absolute ratio ratio-1x1" style={{ top: "13%", left: "7%", width: "6%" }}></div>
        <div id="Hall" className="location position-absolute ratio ratio-1x1" style={{ bottom: "28%", left: "16%", width: "7%" }}></div>
        <div id="River Post" className="location position-absolute ratio ratio-1x1" style={{ top: "42%", right: "12%", width: "8%" }}></div>
        <div id="Gate" className="location position-absolute ratio ratio-1x1" style={{ bottom: "13%", left: "42%", width: "7%" }}></div>
        <div id="Temple" className="location position-absolute ratio ratio-1x1" style={{ top: "24%", left: "42%", width: "11%" }}></div>
        <div id="Time Chamber" className="location position-absolute ratio ratio-1x1" style={{ top: "37%", left: "1%", width: "8%" }}></div>
        <div id="Cheat Trigger" className="location position-absolute ratio ratio-1x1" style={{ top: "0%", left: "98%", width: "2%" }}></div>
      </div>

      {/* Game Over Overlay */}
      {gameOver && (
        <div className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-dark bg-opacity-75">
          <GameOverScreen />
        </div>
      )}
    </div>
  );
}
