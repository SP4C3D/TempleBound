export default function ControlActivity({currentLocation}){
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

  return (
    <div className="p-3 bg-white bg-opacity-75 rounded shadow h-100 position-relative">
      <div className="d-flex w-100">
        <div className="flex-fill">
          <h6 className="mb-1">Available Activities</h6>
        </div>
        <div id="location-text" className={`pb-1 ${currentLocation ? '' : 'd-none'}`}>
          <i className="fas fa-map-marker-alt"></i>
          <span id="location-text">{currentLocation}</span>
        </div>
      </div>
      <div id="activity-buttons" style={{ height: "120px" }}>
         <div id="actHome" className={`d-grid ${currentLocation === 'Home' ? '' : 'd-none'}`}>
          <button id="btnEat" className="btn btn-sm btn-primary mb-2">Eat</button>
          <button id="btnSleep" className="btn btn-sm btn-primary mb-2">Sleep</button>
          <button id="btnChores" className="btn btn-sm btn-primary mb-2">
            <span className="d-inline-block" tabIndex="0" data-bs-toggle="popover" data-bs-placement="bottom" data-bs-trigger="hover focus" data-bs-content="You will get 250 money for doing chores">
              <i className="fas fa-info-circle"></i>
            </span> Do Chores
          </button>
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
        <div id="actRiverPost" className={`d-grid ${currentLocation === 'River Post' ? '' : 'd-none'}`}>
          <button id="btnSight" className="btn btn-sm btn-primary mb-2">Sightseeing</button>
          <button id="btnFish" className="btn btn-sm btn-primary mb-2">
            <span className="d-inline-block" tabIndex="0" data-bs-toggle="popover" data-bs-placement="bottom" data-bs-trigger="hover focus" data-bs-content="You will need 500 money to go fishing">
              <i className="fas fa-info-circle"></i>
            </span> Fishing
          </button>
          <button id="btnToilet" className="btn btn-sm btn-primary mb-2">Go to Toilet</button>
        </div>
        <div id="actGate" className={`d-grid ${currentLocation === 'Gate' ? '' : 'd-none'}`}>
          <button id="btnPolish" className="btn btn-sm btn-primary mb-2">
            <span className="d-inline-block" tabIndex="0" data-bs-toggle="popover" data-bs-placement="bottom" data-bs-trigger="hover focus" data-bs-content="You will get 500 money for Polishing the gate">
              <i className="fas fa-info-circle"></i>
            </span> Polish the Gate
          </button>
          <button id="btnExercise" className="btn btn-sm btn-primary mb-2">Exercise</button>
        </div>
        <div id="actTemple" className={`d-grid ${currentLocation === 'Temple' ? '' : 'd-none'}`}>
          <button id="btnPray" className="btn btn-sm btn-primary mb-2">Pray</button>
          <button id="btnWash" className="btn btn-sm btn-primary mb-2">Wash</button>
          <button id="btnMeditate" className="btn btn-sm btn-primary mb-2">Meditate</button>
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
          <i id="dUp" className="fas fa-caret-up position-absolute start-50 top-0 translate-middle-x dpad" onMouseDown={() => mouseDown('dUp')} onMouseUp={() => mouseUp('dUp')} style={{ fontSize: "58pt" }}></i>
          <i id="dRt" className="fas fa-caret-right position-absolute top-50 translate-middle-y dpad" onMouseDown={() => mouseDown('dRt')} onMouseUp={() => mouseUp('dRt')} style={{ fontSize: "58pt", right: "1.5rem" }}></i>
          <i id="dDn" className="fas fa-caret-down position-absolute start-50 translate-middle-x dpad" onMouseDown={() => mouseDown('dDn')} onMouseUp={() => mouseUp('dDn')} style={{ fontSize: "58pt", bottom: ".2rem" }}></i>
          <i id="dLt" className="fas fa-caret-left position-absolute top-50 translate-middle-y dpad" onMouseDown={() => mouseDown('dLt')} onMouseUp={() => mouseUp('dLt')} style={{ fontSize: "58pt", left: "1.5rem" }}></i>
        </div>
      </div>
  );
}