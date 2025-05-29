import React, { useState, useEffect } from "react";
export default function GameArena({character}){
  const [charPosition, setCharPosition] = useState({
    px: { x: 0, y: 0 },     // Pixel position (for movement calculations)
    percent: { x: 0, y: 0 }   // Percentage position (for rendering)
  });

  const [keys, setKeys] = useState({
    // WASD
    w: false,
    a: false,
    s: false,
    d: false,
    // Arrow Keys
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false,
  });

    const [direction, setDirection] = useState('Down');

  useEffect(() => {
    const handleKeyDown = (e) => {
      const key = e.key;
      if (['w', 'a', 's', 'd', 'arrowup', 'arrowdown', 'arrowleft', 'arrowright'].includes(key)) {
        setKeys(prevKeys => ({ ...prevKeys, [key]: true }));
      }
    };

    const handleKeyUp = (e) => {
      const key = e.key.toLowerCase();
      if (['w', 'a', 's', 'd', 'arrowup', 'arrowdown', 'arrowleft', 'arrowright'].includes(key)) {
        setKeys(prevKeys => ({ ...prevKeys, [key]: false }));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  const speed = 1;

  useEffect(() => {
    let animationFrameId;
    const gameLoop = () => {
      setCharPosition(prev => {
        const gameContainer = document.getElementById('game-box');
        if (!gameContainer) return prev;

        const containerWidth = gameContainer.clientWidth;
        const containerHeight = gameContainer.clientHeight;

        // Calculate new position in pixels
        let newPxX = prev.px.x;
        let newPxY = prev.px.y;

        if (keys.w || keys.ArrowUp) newPxY -= speed ;
        if (keys.s || keys.ArrowDown) newPxY += speed;
        if (keys.a || keys.ArrowLeft) newPxX -= speed;
        if (keys.d || keys.ArrowRight) newPxX += speed;

        // Apply boundaries in pixels (account for character size)
        const charWidth = containerWidth * 0.05; // 5% of container
        const charHeight = containerHeight * 0.05;

        newPxX = Math.max(0, Math.min(newPxX, containerWidth - charWidth));
        newPxY = Math.max(0, Math.min(newPxY, containerHeight - charHeight));

        // Convert to percentages
        const newPercentX = (newPxX / containerWidth) * 100;
        const newPercentY = (newPxY / containerHeight) * 100;

        return {
          px: { x: newPxX, y: newPxY },
          percent: { x: newPercentX, y: newPercentY }
        };
      });
      animationFrameId = requestAnimationFrame(gameLoop);
    };

    gameLoop();
    return () => cancelAnimationFrame(animationFrameId);
  }, [keys]);

  return (
    <div className="game-wrapper">
      <div id="game-box" className="position-relative border rounded">
        <img id="character" src={`/assets/${character}/${direction}.gif`} alt="Character" className="position-absolute" style={{ top: `${charPosition.percent.y}%`, left: `${charPosition.percent.x}%`, width: "5%" }} />
        <div id="Home" className="location position-absolute ratio ratio-1x1" style={{ top: "13%", left: "7%", width: "6%" }}></div>
        <div id="Hall" className="location position-absolute ratio ratio-1x1" style={{ bottom: "28%", left: "16%", width: "7%" }}></div>
        <div id="River Post" className="location position-absolute ratio ratio-1x1" style={{ top: "42%", right: "12%", width: "8%" }}></div>
        <div id="Gate" className="location position-absolute ratio ratio-1x1" style={{ bottom: "13%", left: "42%", width: "7%" }}></div>
        <div id="Temple" className="location position-absolute ratio ratio-1x1" style={{ top: "24%", left: "42%", width: "11%" }}></div>
        <div id="Time Chamber" className="location position-absolute ratio ratio-1x1" style={{ top: "37%", left: "1%", width: "8%" }}></div>
        <div id="Cheat Trigger" className="location position-absolute ratio ratio-1x1" style={{ top: "0%", left: "98%", width: "2%" }}></div>
        <div id="gameover" className="position-absolute top-0 end-0 bottom-0 start-0 bg-dark bg-opacity-75 d-none">
          <img src="Assets/gameover.png" alt="Game Over" className="position-absolute top-50 start-50 translate-middle" style={{ width: "40%" }} />
        </div>
      </div>
    </div>
  );
}