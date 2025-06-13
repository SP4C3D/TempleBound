// Combined GameArena Component with Game Over Support, Location Detection, and Random Crate Drops

import React, { useState, useEffect, useRef, useCallback } from "react";
import GameOverScreen from "./GameOverScreen";

export default function GameArena({ character, keys, setKeys, gameOver, onLocationChange, entryLocation, setInventory, money, stats, playTime, onRetry }) {
  const [charPosition, setCharPosition] = useState({
    px: { x: 0, y: 0 },
    percent: { x: 0, y: 0 },
  });
  const [direction, setDirection] = useState("Down");
  const [isMoving, setIsMoving] = useState(false);
  const [currentLocationName, setCurrentLocationName] = useState(null);
  const [crates, setCrates] = useState([]);

  const gameBoxRef = useRef(null);
  const locationElementRefs = useRef({});
  const crateItems = ["apple", "music", "drink"];

  const setLocationRef = useCallback((node, name) => {
    if (node) {
      locationElementRefs.current[name] = node;
    } else {
      delete locationElementRefs.current[name];
    }
  }, []);

  const locationNames = useRef([
    'Home', 'Hall', 'River Post', 'Gate', 'Temple'
  ]);

  const hasInitialized = useRef(false);

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

  // Random Crate Dropper
  useEffect(() => {
    const interval = setInterval(() => {
      if (!gameBoxRef.current) return;
      const item = crateItems[Math.floor(Math.random() * crateItems.length)];
      const left = Math.random() * 90 + 5;
      const top = Math.random() * 80 + 5;
      setCrates(prev => [...prev, { id: Date.now(), item, left, top }]);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let animationFrameId;

    const gameLoop = () => {
      if (gameOver) return;
      setCharPosition(prev => {
        const gameContainer = gameBoxRef.current;
        const allRefsSet = locationNames.current.every(name => locationElementRefs.current[name]);
        if (!gameContainer || !allRefsSet) return prev;

        if (!hasInitialized.current && entryLocation && locationElementRefs.current[entryLocation]) {
          const gameBoxRect = gameBoxRef.current.getBoundingClientRect();
          const boxWidth = gameBoxRef.current.clientWidth;
          const boxHeight = gameBoxRef.current.clientHeight;
          const target = locationElementRefs.current[entryLocation].getBoundingClientRect();
          const centerX = (target.left + target.right) / 2 - gameBoxRect.left;
          const centerY = (target.top + target.bottom) / 2 - gameBoxRect.top;
          const locationOffsets = {
            Temple: { x: -3, y: -5 }, 
            Home: { x: -2, y: -7 },
            "River Post": { x: -5, y: -4 },
            Gate: { x: -2, y: -6},
            Hall: { x: -4, y: -6},
          };
          const offset = locationOffsets[entryLocation] || { x: 0, y: 0 };
          const rawXPercent = (centerX / boxWidth) * 100;
          const rawYPercent = (centerY / boxHeight) * 100;
          const finalXPercent = Math.min(100, Math.max(0, rawXPercent + offset.x));
          const finalYPercent = Math.min(100, Math.max(0, rawYPercent + offset.y));
          hasInitialized.current = true;
          return {
            px: {
              x: (finalXPercent / 100) * boxWidth,
              y: (finalYPercent / 100) * boxHeight,
            },
            percent: { x: finalXPercent, y: finalYPercent }
          };
        }

        const containerWidth = gameContainer.clientWidth;
        const containerHeight = gameContainer.clientHeight;
        const gameBoxRect = gameContainer.getBoundingClientRect();

        let newPxX = prev.px.x;
        let newPxY = prev.px.y;

        if (keys.w || keys.ArrowUp) newPxY -= speed, setDirection("Up");
        else if (keys.s || keys.ArrowDown) newPxY += speed, setDirection("Down");
        if (keys.a || keys.ArrowLeft) newPxX -= speed, setDirection("Left");
        else if (keys.d || keys.ArrowRight) newPxX += speed, setDirection("Right");

        const charWidth = containerWidth * 0.05;
        const charHeight = containerHeight * 0.12;
        newPxX = Math.max(0, Math.min(newPxX, containerWidth - charWidth));
        newPxY = Math.max(0, Math.min(newPxY, containerHeight - charHeight));
        const newPercentX = (newPxX / containerWidth) * 100;
        const newPercentY = (newPxY / containerHeight) * 100;

        const charRect = {
          left: newPxX,
          top: newPxY,
          right: newPxX + charWidth,
          bottom: newPxY + charHeight
        };

        // Crate Collision Check
        crates.forEach(crate => {
          const crateLeft = (crate.left / 100) * containerWidth;
          const crateTop = (crate.top / 100) * containerHeight;
          const crateRect = {
            left: crateLeft,
            top: crateTop,
            right: crateLeft + containerWidth * 0.05,
            bottom: crateTop + containerHeight * 0.05
          };
          if (
            charRect.left < crateRect.right &&
            charRect.right > crateRect.left &&
            charRect.top < crateRect.bottom &&
            charRect.bottom > crateRect.top
          ) {
            setCrates(prev => prev.filter(c => c.id !== crate.id));
            if (typeof setInventory === "function") {
              setInventory(prev => ({
                ...prev,
                [crate.item]: (prev[crate.item] || 0) + 1
              }));
            }
          }
        });

        // Location detection
        let detectedLocation = null;
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
          if (onLocationChange) onLocationChange(detectedLocation);
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
  }, [keys, gameOver, currentLocationName, onLocationChange, crates]);

  const animationSuffix = isMoving ? "" : "Stand";
  const characterImageSrc = `/assets/${character}/${animationSuffix}${direction}.gif`;

  return (
    <div className="game-wrapper">
      <div id="game-box" className="position-relative border rounded world" ref={gameBoxRef}>
        <img
          id="character"
          src={characterImageSrc}
          alt="Character"
          className="position-absolute"
          style={{ top: `${charPosition.percent.y}%`, left: `${charPosition.percent.x}%`, width: "5%" }}
        />

        {/* Crates */}
        {crates.map(crate => (
          <img
            key={crate.id}
            src={`/assets/item${crate.item.charAt(0).toUpperCase() + crate.item.slice(1)}.png`}
            alt={crate.item}
            className="position-absolute"
            style={{ width: "2%", top: `${crate.top}%`, left: `${crate.left}%`, zIndex: 5 }}
          />
        ))}

        {/* Location zones */}
        <div id="Home" ref={node => setLocationRef(node, 'Home')} className="location position-absolute" style={{ top: "13%", left: "7%", width: "6%", aspectRatio: "1" }}></div>
        <div id="Hall" ref={node => setLocationRef(node, 'Hall')} className="location position-absolute" style={{ bottom: "28%", left: "16%", width: "7%", aspectRatio: "1" }}></div>
        <div id="River Post" ref={node => setLocationRef(node, 'River Post')} className="location position-absolute" style={{ top: "42%", right: "12%", width: "8%", aspectRatio: "1" }}></div>
        <div id="Gate" ref={node => setLocationRef(node, 'Gate')} className="location position-absolute" style={{ bottom: "13%", left: "42%", width: "7%", aspectRatio: "1" }}></div>
        <div id="Temple" ref={node => setLocationRef(node, 'Temple')} className="location position-absolute" style={{ top: "24%", left: "42%", width: "11%", aspectRatio: "1" }}></div>

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
