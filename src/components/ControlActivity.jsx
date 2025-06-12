export default function ControlActivity({currentLocation, updateStats, mapMode, money, setMoney}){
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
    case 'eat':
      updateStats('food', 20); // Increase food by 20
      updateStats('energy', 5); // Small energy boost
      break;
    case 'sleep':
      updateStats('energy', 50); // Significant energy boost
      updateStats('mood', 10);  // Improve mood
      updateStats('hygiene', -10); // Maybe a little less clean after sleep
      break;
    case 'chores':
      updateStats('mood', -5); // Chores might slightly decrease mood
      updateStats('energy', -20);
      updateStats('hygiene', -10);
      setMoney(prev => prev + 200); // Gain money from chores
      break;
    case 'pray':
      updateStats('mood', 15); // Praying improves mood
      updateStats('energy', -5); // Slight energy cost
      break;
    case 'fish':
      const fishCaught = Math.floor(Math.random() * 5) + 1; // Random fish count
      alert(`You caught ${fishCaught} fish!`);
      setMoney(prev => prev + fishCaught * 50); // Gain money based on fish caught
      break;
    case 'buy':
      if (money >= 500) {
        setMoney(prev => prev - 500); // Deduct money for buying items
        alert("You bought some items!");
      } else {
        alert("Not enough money to buy items!");
      }
      break;
    case 'pleasure':
      updateStats('mood', 50); // Increase mood significantly
      updateStats('energy', -20); // Decrease energy
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
        <div id="actHall" className={`d-grid ${currentLocation === 'Hall' ? '' : 'd-none'}`}>
          <button id="btnRelax" className="btn btn-sm btn-primary mb-2">Relax</button>
          <button id="btnSweep" className="btn btn-sm btn-primary mb-2">
            <span className="d-inline-block" tabIndex="0" data-bs-toggle="popover" data-bs-placement="bottom" data-bs-trigger="hover focus" data-bs-content="You will gain 500 money for Sweeping the hall">
              <i className="fas fa-info-circle"></i>
            </span> Sweep the Hall
          </button>
          <button id="btnMerch" className="btn btn-sm btn-primary mb-2">
            <span className="d-inline-block" tabIndex="0" data-bs-toggle="popover" data-bs-placement="bottom" data-bs-trigger="hover focus" data-bs-content="You will need 500 money on buying merchandise">
              <i className="fas fa-info-circle"></i>
            </span> Buy Merchandise
          </button>
        </div>
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
        <div id="actGate" className={`d-grid ${currentLocation === 'Gate' ? '' : 'd-none'}`}>
          {/* <button id="btnPolish" className="btn btn-sm btn-primary mb-2">
            <span className="d-inline-block" tabIndex="0" data-bs-toggle="popover" data-bs-placement="bottom" data-bs-trigger="hover focus" data-bs-content="You will get 500 money for Polishing the gate">
              <i className="fas fa-info-circle"></i>
            </span> Polish the Gate
          </button>
          <button id="btnExercise" className="btn btn-sm btn-primary mb-2">Exercise</button> */}
        </div>
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