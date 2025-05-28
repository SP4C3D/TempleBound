import React, { useEffect, useRef, useState } from "react";

export default function Character({ updateStats, checkGameOver, character }) {
  const [charPosition, setCharPosition] = useState({
  px: { x: 0, y: 0 },     // Pixel position (for movement calculations)
  percent: { x: 0, y: 0 }  // Percentage position (for rendering)
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

useEffect(() => {
  const handleKeyDown = (e) => {
    const key = e.key.toLowerCase();
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
      
      if (keys.w || keys.ArrowUp) newPxY -= speed;
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

  const [direction, setDirection] = useState('Down');
  
  return (
    <img
      src={`/assets/${character}/${direction}.gif`}
      alt="character"
      style={{
        position: "absolute",
        top: `${charPosition.percent.y}%`,
        left: `${charPosition.percent.x}%`,
        width: "5%",
        transition: "top 0.05s linear, left 0.05s linear",
      }}
    />
  );
}
