import React, { useState, useEffect, useRef, useCallback } from "react";
import GameOverScreen from "./GameOverScreen";

export default function GateMapArena({ character, keys, setKeys, gameOver, onLocationChange, money, stats, playTime, onRetry }) {
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
    'Pillar-1', 'Pillar-2', 'Bench', 'ExitGate-1', 'ExitGate-2', 'Bucket-2', 'Bucket-1'
  ]);

  useEffect(() => {
    const isAnyKeyActive = Object.values(keys).some(v => v === true);
    setIsMoving(isAnyKeyActive);
  }, [keys]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (gameOver) return;

      const key = e.key;
      if (keys.hasOwnProperty(key)) {
        setKeys(prev => ({ ...prev, [key]: true }));
        setIsMoving(true);
      }
    };

    const handleKeyUp = (e) => {
      const key = e.key;
      if (keys.hasOwnProperty(key)) {
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
                    x: gameBoxRef.current.clientWidth * 0.47,
                    y: gameBoxRef.current.clientHeight * 0.85,
                },
                percent: {
                    x: 0,
                    y: 0,
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
            )  if (locName.startsWith('Pillar')) {
                detectedLocation = 'Pillar';
              } else if (locName.startsWith('ExitGate')) {
                detectedLocation = 'ExitGate';
              } else if (locName.startsWith('Bucket')) {
                detectedLocation = 'Bucket';
              } else {
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
      <div id="game-box" className="position-relative border rounded Gate" ref={gameBoxRef}>
        <img
          id="character"
          src={characterImageSrc}
          alt="Character"
          className="position-absolute"
          style={{ top: `${charPosition.percent.y}%`, left: `${charPosition.percent.x}%`, width: "5%" }}
        />

        {/* Location zones */}
        <div id="Pillar-1" ref={node => setLocationRef(node, 'Pillar-1')} className="location position-absolute" style={{ top: "29%", left: "35%", width: "8%", height: "32%" }}></div>
        <div id="Pillar-2" ref={node => setLocationRef(node, 'Pillar-2')} className="location position-absolute" style={{ top: "29%", left: "58%", width: "8%", height: "32%" }}></div>
        <div id="Bench" ref={node => setLocationRef(node, 'Bench')} className="location position-absolute" style={{ bottom: "18%", left: "69%", width: "7%", aspectRatio: "1" }}></div>
        <div id="ExitGate-2" ref={node => setLocationRef(node, 'ExitGate-2')} className="location position-absolute" style={{ bottom: "3%", left: "46%", width: "9%", aspectRatio: "1" }}></div>
        <div id="ExitGate-1" ref={node => setLocationRef(node, 'ExitGate-1')} className="location position-absolute" style={{ top: "3%", left: "46%", width: "9%", aspectRatio: "1" }}></div>
        <div id="Bucket-2" ref={node => setLocationRef(node, 'Bucket-2')} className="location position-absolute" style={{ top: "35%", left: "26%", width: "5%", aspectRatio: "1" }}></div>
        <div id="Bucket-1" ref={node => setLocationRef(node, 'Bucket-1')} className="location position-absolute" style={{ bottom: "22%", left: "30%", width: "5%", aspectRatio: "1" }}></div>

        {/* Game over screen overlay */}
        {gameOver && (
          <GameOverScreen
            onRetry={onRetry}
            money={money}
            stats={stats}
            playTime={playTime}
          />
        )}
      </div>
    </div>
  );
}