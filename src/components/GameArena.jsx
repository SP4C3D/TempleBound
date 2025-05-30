// Combined GameArena Component with Game Over Support and Location Detection

import { useState, useEffect, useRef, useCallback } from "react";
import GameOverScreen from "./GameOverScreen";

export default function GameArena({ character, gameOver, onLocationChange }) {
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
  const [currentLocationName, setCurrentLocationName] = useState(null);

  const gameBoxRef = useRef(null);
  const locationElementRefs = useRef({});

  const setLocationRef = useCallback((node, name) => {
    if (node) {
      locationElementRefs.current[name] = node;
    } else {
      delete locationElementRefs.current[name];
    }
  }, []);

  const locationNames = useRef([
    'Home', 'Hall', 'River Post', 'Gate', 'Temple', 'Time Chamber', 'Cheat Trigger'
  ]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (gameOver) return;

      const key = e.key;
      const lowerKey = key.toLowerCase();
      if (
        key === "ArrowUp" ||
        key === "ArrowDown" ||
        key === "ArrowLeft" ||
        key === "ArrowRight"
      ) {
        e.preventDefault();
      }
      if (keys.hasOwnProperty(key)) {
        setKeys(prev => ({ ...prev, [key]: true }));
        setIsMoving(true);
      } else if (keys.hasOwnProperty(lowerKey)) {
        setKeys(prev => ({ ...prev, [lowerKey]: true }));
        setIsMoving(true);
      }
    };

    const handleKeyUp = (e) => {
      const key = e.key;
      const lowerKey = key.toLowerCase();
      if (
        key === "ArrowUp" ||
        key === "ArrowDown" ||
        key === "ArrowLeft" ||
        key === "ArrowRight"
      ) {
        e.preventDefault();
      }
      if (keys.hasOwnProperty(key)) {
        setKeys(prev => {
          const updated = { ...prev, [key]: false };
          const stillMoving = Object.values(updated).some(v => v);
          setIsMoving(stillMoving);
          return updated;
        });
      } else if (keys.hasOwnProperty(lowerKey)) {
        setKeys(prev => {
          const updated = { ...prev, [lowerKey]: false };
          const stillMoving = Object.values(updated).some(v => v);
          setIsMoving(stillMoving);
          return updated;
        });
      }
    };

    window.addEventListener("keydown", handleKeyDown, { passive: false });
    window.addEventListener("keyup", handleKeyUp, { passive: false });

    return () => {
      window.removeEventListener("keydown", handleKeyDown, { passive: false });
      window.removeEventListener("keyup", handleKeyUp, { passive: false });
    };
  }, [gameOver]);

  const speed = 1;

  useEffect(() => {
    let animationFrameId;

    const gameLoop = () => {
      if (gameOver) return;

      setCharPosition(prev => {
        const gameContainer = gameBoxRef.current;
        const allRefsSet = locationNames.current.every(name => locationElementRefs.current[name]);

        if (!gameContainer || !allRefsSet) return prev;

        const containerWidth = gameContainer.clientWidth;
        const containerHeight = gameContainer.clientHeight;
        const gameBoxRect = gameContainer.getBoundingClientRect();

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

        let detectedLocation = null;

        const charRect = {
          left: newPxX,
          top: newPxY,
          right: newPxX + charWidth,
          bottom: newPxY + charHeight
        };

        locationNames.current.forEach(locName => {
          const locElement = locationElementRefs.current[locName];
          if (locElement) {
            const locRect = locElement.getBoundingClientRect();
            const relativeLocRect = {
              left: locRect.left - gameBoxRect.left,
              top: locRect.top - gameBoxRect.top,
              right: locRect.right - gameBoxRect.left,
              bottom: locRect.bottom - gameBoxRect.top
            };

            if (
              charRect.left < relativeLocRect.right &&
              charRect.right > relativeLocRect.left &&
              charRect.top < relativeLocRect.bottom &&
              charRect.bottom > relativeLocRect.top
            ) {
              detectedLocation = locName;
            }
          }
        });

        if (detectedLocation !== currentLocationName) {
          setCurrentLocationName(detectedLocation);
          if (onLocationChange) {
            onLocationChange(detectedLocation);
          }
        }

        return {
          px: { x: newPxX, y: newPxY },
          percent: { x: newPercentX, y: newPercentY }
        };
      });

      animationFrameId = requestAnimationFrame(gameLoop);
    };

    gameLoop();
    return () => cancelAnimationFrame(animationFrameId);
  }, [keys, gameOver, currentLocationName, onLocationChange]);

  const animationSuffix = isMoving ? "" : "Stand";
  const characterImageSrc = `/assets/${character}/${animationSuffix}${direction}.gif`;

  return (
    <div className="game-wrapper">
      <div id="game-box" className="position-relative border rounded" ref={gameBoxRef}>
        <img
          id="character"
          src={characterImageSrc}
          alt="Character"
          className="position-absolute"
          style={{ top: `${charPosition.percent.y}%`, left: `${charPosition.percent.x}%`, width: "5%" }}
        />

        {/* Location zones */}
        <div id="Home" ref={node => setLocationRef(node, 'Home')} className="location position-absolute" style={{ top: "13%", left: "7%", width: "6%", aspectRatio: "1" }}></div>
        <div id="Hall" ref={node => setLocationRef(node, 'Hall')} className="location position-absolute" style={{ bottom: "28%", left: "16%", width: "7%", aspectRatio: "1" }}></div>
        <div id="River Post" ref={node => setLocationRef(node, 'River Post')} className="location position-absolute" style={{ top: "42%", right: "12%", width: "8%", aspectRatio: "1" }}></div>
        <div id="Gate" ref={node => setLocationRef(node, 'Gate')} className="location position-absolute" style={{ bottom: "13%", left: "42%", width: "7%", aspectRatio: "1" }}></div>
        <div id="Temple" ref={node => setLocationRef(node, 'Temple')} className="location position-absolute" style={{ top: "24%", left: "42%", width: "11%", aspectRatio: "1" }}></div>
        <div id="Time Chamber" ref={node => setLocationRef(node, 'Time Chamber')} className="location position-absolute" style={{ top: "37%", left: "1%", width: "8%", aspectRatio: "1" }}></div>
        <div id="Cheat Trigger" ref={node => setLocationRef(node, 'Cheat Trigger')} className="location position-absolute" style={{ top: "0%", left: "98%", width: "2%", aspectRatio: "1" }}></div>

        {/* Game over screen overlay */}
        {gameOver && <GameOverScreen />}
      </div>
    </div>
  );
}
