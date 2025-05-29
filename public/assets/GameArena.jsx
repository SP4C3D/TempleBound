import React, { useState, useEffect } from "react";

export default function GameArena({ character }) {
  const [charPosition, setCharPosition] = useState({
    px: { x: 0, y: 0 },
    percent: { x: 0, y: 0 }
  });

  const [keys, setKeys] = useState({
    w: false, a: false, s: false, d: false,
    ArrowUp: false, ArrowDown: false, ArrowLeft: false, ArrowRight: false,
  });

  const [direction, setDirection] = useState('Down'); // Initial direction for idling
  const [isMoving, setIsMoving] = useState(false);   // Tracks if any movement key is pressed

  useEffect(() => {
    const handleKeyDown = (e) => {
      const key = e.key.toLowerCase();
      const directionalKeys = ['w', 'a', 's', 'd', 'arrowup', 'arrowdown', 'arrowleft', 'arrowright'];
      if (directionalKeys.includes(key)) {
        setKeys(prevKeys => {
          const newKeys = { ...prevKeys, [key]: true };
          // Set isMoving to true if any directional key is now pressed
          if (!isMoving) setIsMoving(true); 
          return newKeys;
        });
      }
    };

    const handleKeyUp = (e) => {
      const key = e.key.toLowerCase();
      const directionalKeys = ['w', 'a', 's', 'd', 'arrowup', 'arrowdown', 'arrowleft', 'arrowright'];
      if (directionalKeys.includes(key)) {
        setKeys(prevKeys => {
          const newKeys = { ...prevKeys, [key]: false };
          // Check if ALL directional keys are released
          const anyKeyStillPressed = directionalKeys.some(dKey => newKeys[dKey]);
          if (!anyKeyStillPressed) {
            setIsMoving(false); 
          }
          return newKeys;
        });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [isMoving]);

  const speed = 1;

  useEffect(() => {
    let animationFrameId;
    const gameLoop = () => {
      setCharPosition(prev => {
        const gameContainer = document.getElementById('game-box');
        if (!gameContainer) return prev;

        const containerWidth = gameContainer.clientWidth;
        const containerHeight = gameContainer.clientHeight;

        let newPxX = prev.px.x;
        let newPxY = prev.px.y;
        
        if (keys.w || keys.ArrowUp) {
          newPxY -= speed;
          setDirection('Up'); // Last pressed vertical direction
        } else if (keys.s || keys.ArrowDown) {
          newPxY += speed;
          setDirection('Down'); // Last pressed vertical direction
        }
        if (keys.a || keys.ArrowLeft) {
          newPxX -= speed;
          setDirection('Left'); // Last pressed horizontal direction (overrides vertical if both pressed)
        } else if (keys.d || keys.ArrowRight) {
          newPxX += speed;
          setDirection('Right'); // Last pressed horizontal direction (overrides vertical if both pressed)
        }
        
        const charWidth = containerWidth * 0.05;
        const charHeight = containerHeight * 0.05;

        newPxX = Math.max(0, Math.min(newPxX, containerWidth - charWidth));
        newPxY = Math.max(0, Math.min(newPxY, containerHeight - charHeight));

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
  }, [keys, direction, isMoving]); 

  let animationSuffix = isMoving ? '' : 'Stand'; 
  
  const characterImageSrc = `/assets/${character}/${animationSuffix}${direction}.gif`;

  return (
    <div className="game-wrapper">
      <div id="game-box" className="position-relative border rounded">
        <img 
          id="character" 
          src={characterImageSrc} 
          alt="Character" 
          className="position-absolute" 
          style={{ top: `${charPosition.percent.y}%`, left: `${charPosition.percent.x}%`, width: "5%" }} 
        />
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