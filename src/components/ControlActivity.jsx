export default function ControlActivity({currentLocation, updateStats, mapMode, money, setMoney, triggerTransition, keys, setKeys, inventory, setInventory}) {
  const dpadImage = "/assets/dpad.png";

  const mouseDown = (direction) => {
    console.log(`Mouse down on ${direction}`);
    // Implement logic to update 'keys' state based on D-pad input
    switch (direction) {
      case 'dUp': setKeys(prev => ({ ...prev, w: true, ArrowUp: true })); break;
      case 'dDn': setKeys(prev => ({ ...prev, s: true, ArrowDown: true })); break;
      case 'dLt': setKeys(prev => ({ ...prev, a: true, ArrowLeft: true })); break;
      case 'dRt': setKeys(prev => ({ ...prev, d: true, ArrowRight: true })); break;
      default: break;
    }
  };

  const mouseUp = (direction) => {
    console.log(`Mouse up on ${direction}`);
    switch (direction) {
      case 'dUp': setKeys(prev => ({ ...prev, w: false, ArrowUp: false })); break;
      case 'dDn': setKeys(prev => ({ ...prev, s: false, ArrowDown: false })); break;
      case 'dLt': setKeys(prev => ({ ...prev, a: false, ArrowLeft: false })); break;
      case 'dRt': setKeys(prev => ({ ...prev, d: false, ArrowRight: false })); break;
      default: break;
    }
  };

const handleActivityClick = (activityType) => {
  console.log(`Activity: ${activityType}`);
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
    case 'EnterGate':
      updateStats('mapMode', 'gate');
      break;
    case 'EnterHall':
      updateStats('mapMode', 'hall');
      break;
    case 'eat':
      updateStats('food', 20);
      updateStats('energy', 5);
      break;
    case 'sleep':
      triggerTransition("/assets/tidur.gif", () => {
        updateStats('energy', 50);
        updateStats('mood', 10);  
        updateStats('hygiene', -10);
      });
      break;
    case 'Sword':
      triggerTransition("/assets/Sword.gif", () => {
        updateStats('mood', 5);
      });
      break;
    case 'polish':
      triggerTransition("/assets/Sweep.gif", () => {
        updateStats('hygiene', -5);
        updateStats('energy', -5);
        updateStats('mood', 10);
        setMoney(prev => prev + 100);
      });
      break;
    case 'sit':
      triggerTransition("/assets/Chair.gif", () => {
        updateStats('mood', 5);
        updateStats('energy', 10);
        updateStats('hygiene', -5);
      });
    case 'chores':
      triggerTransition("/assets/Sweep.gif", () => {
        updateStats('mood', -5);
        updateStats('energy', -20);
        updateStats('hygiene', -10);
        setMoney(prev => prev + 200);
      });
      break;
    case 'pray':
      triggerTransition("/assets/pray.gif", () => {
        updateStats('mood', 20);
        updateStats('energy', -5);
      });
      break;
    case 'cook':
      triggerTransition("/assets/cook.gif", () => {
        updateStats('food', 20);
        updateStats('energy', -10);
        updateStats('hygiene', -5);
      });
    break;
    case 'Nap':
      triggerTransition("/assets/tidur.gif", () => {
        updateStats('mood', 10);
        updateStats('energy', 10);
      });
      break;
    case 'fish':
      triggerTransition("/assets/pancing.gif", () => {
        setInventory(prev => ({
          ...prev,
          fish: (prev.fish || 0) + 1
        }));
      });
      break;
    case 'buy':
      if (money >= 500) {
      triggerTransition("/assets/trade.gif", () => {
        setMoney(prev => prev - 500);
        setInventory(prev => ({
          ...prev,
          drink: (prev.drink || 0) + 1,
          apple: (prev.apple || 0) + 1
        }));
      });
      } else {
        alert("Not enough money to buy items!");
      }
      break;
    case 'sell':
      if (inventory.fish > 0) {
      triggerTransition("/assets/trade.gif", () => {
        setInventory(prev => ({
          ...prev,
          fish: prev.fish - 1
        }));
        setMoney(prev => prev + 100);
      });
      } else {
        alert("You have no fish to sell!");
      }
      break;
    case 'read':
      triggerTransition("/assets/Read.gif", () => {
        updateStats('mood', 10);
        updateStats('energy', -5);
      });
      break;
    case 'wash':
      triggerTransition("/assets/shower.gif", () => {
        updateStats('hygiene', 20);
        updateStats('energy', -5);
        updateStats('mood', 5);
      });
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

      <div id="activity-buttons" style={{ height: "120px" }}>
         <div id="actHome" className={`d-grid ${currentLocation === 'Home' || mapMode === 'home' ? '' : 'd-none'}`}>
          {mapMode !== 'home' &&  currentLocation === 'Home' && (
            <button id="btnHomeEnt"className="btn btn-sm btn-primary mb-2" onClick={() => handleActivityClick('home')}>Enter Home</button>
          )}
          {mapMode === 'home' && currentLocation === 'Exit Home' && (
            <button className="btn btn-sm btn-danger mb-2" onClick={() => updateStats('mapMode', 'world')}>Leave Home</button>
          )}
          {mapMode === 'home' && currentLocation === 'Bed' && (
              <button id="btnSleep" className="btn btn-sm btn-primary mb-2" onClick={() => handleActivityClick('sleep')}>Sleep</button>
          )}
          {mapMode === 'home' && currentLocation === 'Bed' && (
            <button id="btnPray" className="btn btn-sm btn-primary mb-2" onClick={() => handleActivityClick('pray')}>Pray</button>
          )}
          {mapMode === 'home' && currentLocation === 'Drawer' && (
            <button id="btnChores" className="btn btn-sm btn-primary mb-2" onClick={() => handleActivityClick('chores')}>Dust the Drawer</button>
          )}
          {mapMode === 'home' && currentLocation === 'Kitchen' && (
            <button id="btnChores" className="btn btn-sm btn-primary mb-2" onClick={() => handleActivityClick('cook')}>Cook & Eat</button>
          )}
        </div>

        <div id="actHall" className={`d-grid ${currentLocation === 'Hall' || mapMode === 'hall' ? '' : 'd-none'}`}>
          {mapMode !== 'hall' &&  currentLocation === 'Hall' && (
            <button id="btnHallEnt"className="btn btn-sm btn-primary mb-2" onClick={() => handleActivityClick('EnterHall')}>Enter Hall</button>
          )}
          {currentLocation === 'ExitHall' && (
            <button className="btn btn-sm btn-danger mb-2" onClick={() => updateStats('mapMode', 'world')}>Leave Hall</button>
          )}
          {currentLocation === 'Sword' && (
            <button id="btnHallEnt"className="btn btn-sm btn-primary mb-2" onClick={() => handleActivityClick('Sword')}>Admire Sword</button>
          )}
          {currentLocation === 'Sofa' && (
            <button id="btnHallEnt"className="btn btn-sm btn-primary mb-2" onClick={() => handleActivityClick('Nap')}>Take a Nap</button>
          )}
        </div>

        <div id="actRiverPost" className={`d-grid ${currentLocation === 'River Post' || mapMode === 'riverPost' ? '' : 'd-none'}`}>
          {mapMode !== 'riverPost' && currentLocation === 'River Post' && (
            <button id="btnEntRiverPost" className="btn btn-sm btn-primary mb-2" onClick={() => handleActivityClick('riverpost')}>Enter River Post</button>
          )}
          {mapMode === 'riverPost' && currentLocation === 'Exit River Post' && (
            <button className="btn btn-sm btn-danger mb-2" onClick={() => updateStats('mapMode', 'world')}>Leave River Post</button>
          )}
          {mapMode === 'riverPost' && currentLocation === 'Placeholer' && (
            <button id="btnPleasure" className="btn btn-sm btn-primary mb-2" onClick={() => handleActivityClick('pleasure')}>Pleasure</button>
          )}
          {mapMode === 'riverPost' && currentLocation === 'Fishing Spot' && (
            <button id="btnFish" className="btn btn-sm btn-primary mb-2" onClick={() => handleActivityClick('fish')}>Fish</button>
          )}
          {mapMode === 'riverPost' && currentLocation === 'Store' && (
            <button id="btnBuy" className="btn btn-sm btn-primary mb-2" onClick={() => handleActivityClick('buy')}>Buy Items!</button>
          )}
          {mapMode === 'riverPost' && currentLocation === 'Store' && (
            <button id="btnBuy" className="btn btn-sm btn-primary mb-2" onClick={() => handleActivityClick('sell')}>Sell Fish!</button>
          )}
        </div>
        
        <div id="actGate" className={`d-grid ${currentLocation === 'Gate' || mapMode === 'gate' ? '' : 'd-none'}`}>
          { mapMode !== 'gate' && currentLocation === 'Gate' && (
          <button id="btnPolish" className="btn btn-sm btn-primary mb-2"  onClick={() => handleActivityClick('EnterGate')}>Enter Gate</button>)}
          {currentLocation === 'ExitGate' && (
            <button className="btn btn-sm btn-danger mb-2" onClick={() => updateStats('mapMode', 'world')}>Leave Gate</button>)}
          {currentLocation === 'Pillar' && (
            <button id="btnPolish" className="btn btn-sm btn-primary mb-2" onClick={() => handleActivityClick('polish')}>Sweep Pillar</button>
          )}
          {currentLocation === 'Bench' && (
            <button id='btnBench' className="btn btn-sm btn-primary mb-2" onClick={() => handleActivityClick('sit')}>Sit on Bench</button>
          )}
          {currentLocation === 'Bucket' && (
            <button id='btnBench' className="btn btn-sm btn-primary mb-2" onClick={() => handleActivityClick('wash')}>Quick Rinse</button>
          )}
        </div>

        <div id="actTemple" className={`d-grid ${currentLocation === 'Temple' || mapMode === 'temple' ? '' : 'd-none'}`}>
          {mapMode !== 'temple' && currentLocation === 'Temple' && (
            <button id="btnEntTemple" className="btn btn-sm btn-primary mb-2" onClick={() => handleActivityClick('temple')}>Enter Temple</button>)}
          {mapMode === 'temple' && currentLocation === 'ExitTemp' && (
            <button className="btn btn-sm btn-danger mb-2" onClick={() => updateStats('mapMode', 'world')}>Leave Temple</button>)}
          {mapMode === 'temple' && currentLocation === 'Statue' && (
            <button id="btnStatue" className="btn btn-sm btn-primary mb-2" onClick={() => handleActivityClick('pray')}>Pray</button>)}
          {mapMode === 'temple' && currentLocation === 'OldTable' && (
            <button id="btnChores" className="btn btn-sm btn-primary mb-2" onClick={() => handleActivityClick('chores')}>Clean Table</button>)}
          {mapMode === 'temple' && currentLocation === 'Lectern' && (
            <button id="btnAltar" className="btn btn-sm btn-primary mb-2" onClick={() => handleActivityClick('read')}>Read</button>)}
        </div>

        <div id="actTime" className={`d-grid ${currentLocation === 'Time' ? '' : 'd-none'}`}>
          <button id="btnTimeSkip" className="btn btn-sm btn-primary mb-2">Skip 23 Hours</button>
            <button id="btnRefresh" className="btn btn-sm btn-primary mb-2">Refill All Stats</button>
            <button id="btnRich" className="btn btn-sm btn-primary mb-2">
              <span className="d-inline-block" tabIndex="0" data-bs-toggle="popover" data-bs-placement="bottom" data-bs-trigger="hover focus" data-bs-content="You will gain 100k">
                <i className="fas fa-info-circle"></i>
              </span> Get Rich
            </button>
          </div>
        </div>
        <div style={{ height: "235px" }}></div>
        <div className="position-absolute start-50 translate-middle-x" style={{ bottom: "1.5rem" }}>
          <img src={dpadImage} alt="D-PAD" className="opacity-50" />
          <i 
            id="dUp"
            className="fas fa-caret-up position-absolute start-50 top-0 translate-middle-x dpad"
            onMouseDown={() => mouseDown('dUp')}
            onMouseUp={() => mouseUp('dUp')}
            style={{ fontSize: "58pt", cursor: "pointer" }}
          ></i>
          <i 
            id="dRt"
            className="fas fa-caret-right position-absolute top-50 translate-middle-y dpad"
            onMouseDown={() => mouseDown('dRt')}
            onMouseUp={() => mouseUp('dRt')}
            style={{ fontSize: "58pt", right: "1.5rem", cursor: "pointer" }}
          ></i>
          <i 
            id="dDn"
            className="fas fa-caret-down position-absolute start-50 translate-middle-x dpad"
            onMouseDown={() => mouseDown('dDn')}
            onMouseUp={() => mouseUp('dDn')}
            style={{ fontSize: "58pt", bottom: "0.2rem", cursor: "pointer" }}
          ></i>
          <i 
            id="dLt"
            className="fas fa-caret-left position-absolute top-50 translate-middle-y dpad"
            onMouseDown={() => mouseDown('dLt')}
            onMouseUp={() => mouseUp('dLt')}
            style={{ fontSize: "58pt", left: "1.5rem", cursor: "pointer" }}
          ></i>
        </div>
      </div>
  );
}