import React from 'react';

export default function ControlActivity({ 
  currentLocation, 
  updateStats, 
  mapMode, 
  money, 
  setMoney,
  keys,        // State untuk menyimpan status tombol
  setKeys     // Fungsi untuk mengupdate state tombol
}) {
  const dpadImage = "/assets/dpad.png";

  // Fungsi untuk menangani saat tombol D-pad ditekan
  const handleDpadDown = (direction) => {
    switch (direction) {
      case 'up':
        setKeys(prev => ({ ...prev, w: true, ArrowUp: true }));
        break;
      case 'down':
        setKeys(prev => ({ ...prev, s: true, ArrowDown: true }));
        break;
      case 'left':
        setKeys(prev => ({ ...prev, a: true, ArrowLeft: true }));
        break;
      case 'right':
        setKeys(prev => ({ ...prev, d: true, ArrowRight: true }));
        break;
      default:
        break;
    }
  };

  // Fungsi untuk menangani saat tombol D-pad dilepas
  const handleDpadUp = (direction) => {
    switch (direction) {
      case 'up':
        setKeys(prev => ({ ...prev, w: false, ArrowUp: false }));
        break;
      case 'down':
        setKeys(prev => ({ ...prev, s: false, ArrowDown: false }));
        break;
      case 'left':
        setKeys(prev => ({ ...prev, a: false, ArrowLeft: false }));
        break;
      case 'right':
        setKeys(prev => ({ ...prev, d: false, ArrowRight: false }));
        break;
      default:
        break;
    }
  };

  const handleActivityClick = (activityType) => {
    switch (activityType) {
      case 'home':
        updateStats('mapMode', 'home');
        break;
      case 'temple':
        updateStats('mapMode', 'temple');
        break;
      case 'riverpost':
        updateStats('mapMode', 'riverPost');
        break;
      case 'eat':
        updateStats('food', 20);
        updateStats('energy', 5);
        break;
      case 'sleep':
        updateStats('energy', 50);
        updateStats('mood', 10);
        updateStats('hygiene', -10);
        break;
      case 'chores':
        updateStats('mood', -5);
        updateStats('energy', -20);
        updateStats('hygiene', -10);
        setMoney(prev => prev + 200);
        break;
      case 'pray':
        updateStats('mood', 15);
        updateStats('energy', -5);
        break;
      case 'fish':
        const fishCaught = Math.floor(Math.random() * 5) + 1;
        alert(`You caught ${fishCaught} fish!`);
        setMoney(prev => prev + fishCaught * 50);
        break;
      case 'buy':
        if (money >= 500) {
          setMoney(prev => prev - 500);
          alert("You bought some items!");
        } else {
          alert("Not enough money to buy items!");
        }
        break;
      case 'pleasure':
        updateStats('mood', 50);
        updateStats('energy', -20);
        break;
      default:
        break;
    }
  };

  return (
    <div className="p-3 bg-white bg-opacity-75 rounded shadow h-100 position-relative">
      <div className="d-flex w-100">
        <div className="flex-fill">
          <h6 className="mb-1">Available Activities</h6>
        </div>
        <div id="location-text" className={`pb-1 ${currentLocation ? '' : 'd-none'}`}>
          <i className="fas fa-map-marker-alt me-2"></i>
          <span id="location-text">{currentLocation}</span>
        </div>
      </div>
      
      {/* Activity Buttons */}
      <div id="activity-buttons" style={{ height: "120px" }}>
        {/* Home Activities */}
        <div id="actHome" className={`d-grid ${currentLocation === 'Home' || mapMode === 'home' ? '' : 'd-none'}`}>
          {mapMode !== 'home' && currentLocation === 'Home' && (
            <button id="btnHomeEnt" className="btn btn-sm btn-primary mb-2" onClick={() => handleActivityClick('home')}>Enter Home</button>
          )}
          {mapMode === 'home' && currentLocation === 'ExitHome' && (
            <button className="btn btn-sm btn-danger mb-2" onClick={() => updateStats('mapMode', 'world')}>Leave Home</button>
          )}
          {mapMode === 'home' && currentLocation === 'Bed' && (
            <button id="btnSleep" className="btn btn-sm btn-primary mb-2" onClick={() => handleActivityClick('sleep')}>Sleep</button>
          )}
          {mapMode === 'home' && currentLocation === 'Broom' && (
            <button id="btnChores" className="btn btn-sm btn-primary mb-2" onClick={() => handleActivityClick('chores')}>Sweep The House</button>
          )}
        </div>

        {/* River Post Activities */}
        <div id="actRiverPost" className={`d-grid ${currentLocation === 'River Post' || mapMode === 'riverPost' ? '' : 'd-none'}`}>
          {mapMode !== 'riverPost' && currentLocation === 'River Post' && (
            <button id="btnEntRiverPost" className="btn btn-sm btn-primary mb-2" onClick={() => handleActivityClick('riverpost')}>Enter River Post</button>
          )}
          {mapMode === 'riverPost' && currentLocation === 'ExitRiverPost' && (
            <button className="btn btn-sm btn-danger mb-2" onClick={() => updateStats('mapMode', 'world')}>Leave River Post</button>
          )}
          {mapMode === 'riverPost' && currentLocation === 'Placeholer' && (
            <button id="btnPleasure" className="btn btn-sm btn-primary mb-2" onClick={() => handleActivityClick('pleasure')}>Pleasure</button>
          )}
          {mapMode === 'riverPost' && currentLocation === 'FishingSpot' && (
            <button id="btnFish" className="btn btn-sm btn-primary mb-2" onClick={() => handleActivityClick('fish')}>Fish</button>
          )}
          {mapMode === 'riverPost' && currentLocation === 'Store' && (
            <button id="btnBuy" className="btn btn-sm btn-primary mb-2" onClick={() => handleActivityClick('buy')}>
              <span className="d-inline-block" tabIndex="0" data-bs-toggle="popover" data-bs-placement="bottom" data-bs-trigger="hover focus" data-bs-content="You can buy items here">
                <i className="fas fa-info-circle"></i>
              </span> Buy Items
            </button>
          )}
        </div>

        {/* Temple Activities */}
        <div id="actTemple" className={`d-grid ${currentLocation === 'Temple' || mapMode === 'temple' ? '' : 'd-none'}`}>
          {mapMode !== 'temple' && currentLocation === 'Temple' && (
            <button id="btnEntTemple" className="btn btn-sm btn-primary mb-2" onClick={() => handleActivityClick('temple')}> Enter Temple</button>)}
          {mapMode === 'temple' && currentLocation === 'ExitTemp' && (
            <button className="btn btn-sm btn-danger mb-2" onClick={() => updateStats('mapMode', 'world')}>Leave Temple</button>)}
          {mapMode === 'temple' && currentLocation === 'Statue' && (
            <button id="btnStatue" className="btn btn-sm btn-primary mb-2" onClick={() => handleActivityClick('pray')}>Pray</button>)}
          {mapMode === 'temple' && currentLocation === 'OldTable' && (
            <button id="btnChores" className="btn btn-sm btn-primary mb-2" onClick={() => handleActivityClick('chores')}>Clean Table</button>)}
          {mapMode === 'temple' && currentLocation === 'Altar' && (
            <button id="btnAltar" className="btn btn-sm btn-primary mb-2" onClick={() => handleActivityClick('pray')}>Pray at Altar</button>)}
        </div>
      </div>

      {/* D-pad Controls */}
      <div style={{ height: "235px" }}></div>
      <div className="position-absolute start-50 translate-middle-x" style={{ bottom: "1.5rem" }}>
        <img src={dpadImage} alt="D-PAD" className="opacity-50" />
        
        {/* Up Button */}
        <i 
          id="dUp"
          className="fas fa-caret-up position-absolute start-50 top-0 translate-middle-x dpad"
          onMouseDown={() => handleDpadDown('up')}
          onMouseUp={() => handleDpadUp('up')}
          onTouchStart={() => handleDpadDown('up')}
          onTouchEnd={() => handleDpadUp('up')}
          style={{ fontSize: "58pt", cursor: "pointer" }}
        ></i>
        
        {/* Right Button */}
        <i 
          id="dRt"
          className="fas fa-caret-right position-absolute top-50 translate-middle-y dpad"
          onMouseDown={() => handleDpadDown('right')}
          onMouseUp={() => handleDpadUp('right')}
          onTouchStart={() => handleDpadDown('right')}
          onTouchEnd={() => handleDpadUp('right')}
          style={{ fontSize: "58pt", right: "1.5rem", cursor: "pointer" }}
        ></i>
        
        {/* Down Button */}
        <i 
          id="dDn"
          className="fas fa-caret-down position-absolute start-50 translate-middle-x dpad"
          onMouseDown={() => handleDpadDown('down')}
          onMouseUp={() => handleDpadUp('down')}
          onTouchStart={() => handleDpadDown('down')}
          onTouchEnd={() => handleDpadUp('down')}
          style={{ fontSize: "58pt", bottom: "0.2rem", cursor: "pointer" }}
        ></i>
        
        {/* Left Button */}
        <i 
          id="dLt"
          className="fas fa-caret-left position-absolute top-50 translate-middle-y dpad"
          onMouseDown={() => handleDpadDown('left')}
          onMouseUp={() => handleDpadUp('left')}
          onTouchStart={() => handleDpadDown('left')}
          onTouchEnd={() => handleDpadUp('left')}
          style={{ fontSize: "58pt", left: "1.5rem", cursor: "pointer" }}
        ></i>
      </div>
    </div>
  );
}