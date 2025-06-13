import React, { useState, useEffect, useRef, useCallback } from "react";
import GameOverScreen from "./GameOverScreen";

export default function HomeMapArena({ character, gameOver, onLocationChange, keys }) {
  const [charPosition, setCharPosition] = useState({
    px: { x: 0, y: 0 },
    percent: { x: 52, y: 71 },
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
    'Bed', 'Broom', 'ExitHome', 'Fridge'
  ]);

  // Handle keyboard input
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (gameOver) return;

      const key = e.key.toLowerCase();
      if (['w', 'a', 's', 'd', 'arrowup', 'arrowdown', 'arrowleft', 'arrowright'].includes(key)) {
        setIsMoving(true);
      }
    };

    const handleKeyUp = (e) => {
      const key = e.key.toLowerCase();
      if (['w', 'a', 's', 'd', 'arrowup', 'arrowdown', 'arrowleft', 'arrowright'].includes(key)) {
        const stillMoving = Object.values(keys).some(v => v);
        setIsMoving(stillMoving);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [gameOver, keys]);

  // Handle D-pad movement
  useEffect(() => {
    if (keys.w || keys.ArrowUp) {
      setDirection("Up");
      setIsMoving(true);
    } else if (keys.s || keys.ArrowDown) {
      setDirection("Down");
      setIsMoving(true);
    } else if (keys.a || keys.ArrowLeft) {
      setDirection("Left");
      setIsMoving(true);
    } else if (keys.d || keys.ArrowRight) {
      setDirection("Right");
      setIsMoving(true);
    } else {
      setIsMoving(false);
    }
  }, [keys]);

  const speed = 1 * (window.innerWidth < 768 ? 0.5 : 1);
  const hasInitialized = useRef(false);

  useEffect(() => {
    let animationFrameId;

    const gameLoop = () => {
      if (gameOver) return;

      setCharPosition(prev => {
        if (!hasInitialized.current) {
          hasInitialized.current = true;
          return {
            px: {
              x: gameBoxRef.current.clientWidth * 0.52,
              y: gameBoxRef.current.clientHeight * 0.60,
            },
            percent: {
              x: 52,
              y: 60,
            }
          };
        }

        const gameContainer = gameBoxRef.current;
        const allRefsSet = locationNames.current.every(name => locationElementRefs.current[name]);

        if (!gameContainer || !allRefsSet) return prev;

        const containerWidth = gameContainer.clientWidth;
        const containerHeight = gameContainer.clientHeight;
        const gameBoxRect = gameContainer.getBoundingClientRect();

        let newPxX = prev.px.x;
        let newPxY = prev.px.y;

        // Movement logic (now uses both keyboard and D-pad inputs)
        if (keys.w || keys.ArrowUp) {
          newPxY -= speed;
        } else if (keys.s || keys.ArrowDown) {
          newPxY += speed;
        }

        if (keys.a || keys.ArrowLeft) {
          newPxX -= speed;
        } else if (keys.d || keys.ArrowRight) {
          newPxX += speed;
        }

        const charWidth = containerWidth * 0.05;
        const charHeight = containerHeight * 0.12;

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
      <div id="game-box" className="position-relative border rounded home" ref={gameBoxRef}>
        <img
          id="character"
          src={characterImageSrc}
          alt="Character"
          className="position-absolute"
          style={{ top: `${charPosition.percent.y}%`, left: `${charPosition.percent.x}%`, width: "5%" }}
        />

        {/* Location zones */}
        <div id="Bed" ref={node => setLocationRef(node, 'Bed')} className="location position-absolute bg-danger" style={{ top: "13%", left: "7%", width: "6%", aspectRatio: "1" }}></div>
        <div id="Broom" ref={node => setLocationRef(node, 'Broom')} className="location position-absolute bg-danger" style={{ bottom: "48%", left: "86%", width: "7%", aspectRatio: "1" }}></div>
        <div id="Fridge" ref={node => setLocationRef(node, 'Fridge')} className="location position-absolute" style={{ top: "22%", right: "62%", width: "8%", aspectRatio: "1" }}></div>
        <div id="ExitHome" ref={node => setLocationRef(node, 'ExitHome')} className="location position-absolute bg-danger" style={{ bottom: "29%", left: "52%", width: "7%", aspectRatio: "1" }}></div>

        {/* Game over screen overlay */}
        {gameOver && <GameOverScreen />}
      </div>
    </div>
  );
}