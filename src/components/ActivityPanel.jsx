import React from "react";

export default function ActivityPanel({ updateStats, checkGameOver }) {
  return (
    <div className="p-3 bg-white bg-opacity-75 rounded shadow h-100 position-relative">
      <div className="d-flex w-100">
        <div className="flex-fill">
          <h6 className="mb-1">Available Activities</h6>
        </div>
        <div id="location-text" className="d-none pb-1">
          <i className="fas fa-map-marker-alt"></i>
          <span id="location-text"></span>
        </div>
      </div>
      <div id="activity-buttons" style={{ height: "120px" }}>
        <div id="actHome" className="d-grid d-none">
          <button id="btnEat" onClick={() => updateStats({ food: 10 })} className="btn btn-sm btn-primary mb-2">Eat</button>
          <button id="btnSleep" onClick={() => updateStats({ energy: 10 })} className="btn btn-sm btn-primary mb-2">Sleep</button>
          <button id="btnChores" onClick={() => updateStats({ money: 250 })} className="btn btn-sm btn-primary mb-2">
            <span className="d-inline-block" tabIndex="0" data-bs-toggle="popover" data-bs-placement="bottom" data-bs-trigger="hover focus" data-bs-content="You will get 250 money for doing chores">
              <i className="fas fa-info-circle"></i>
            </span> Do Chores
          </button>
        </div>
        <div id="actHall" className="d-grid d-none">
          <button id="btnRelax" onClick={() => updateStats({ mood: 10 })} className="btn btn-sm btn-primary mb-2">Relax</button>
          <button id="btnSweep" onClick={() => updateStats({ money: 500 })} className="btn btn-sm btn-primary mb-2">
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
        <div id="actRiverPost" className="d-grid d-none">
          <button id="btnSight" className="btn btn-sm btn-primary mb-2">Sightseeing</button>
          <button id="btnFish" className="btn btn-sm btn-primary mb-2">
            <span className="d-inline-block" tabIndex="0" data-bs-toggle="popover" data-bs-placement="bottom" data-bs-trigger="hover focus" data-bs-content="You will need 500 money to go fishing">
              <i className="fas fa-info-circle"></i>
            </span> Fishing
          </button>
          <button id="btnToilet" className="btn btn-sm btn-primary mb-2">Go to Toilet</button>
        </div>
        <div id="actGate" className="d-grid d-none">
          <button id="btnPolish" className="btn btn-sm btn-primary mb-2">
            <span className="d-inline-block" tabIndex="0" data-bs-toggle="popover" data-bs-placement="bottom" data-bs-trigger="hover focus" data-bs-content="You will get 500 money for Polishing the gate">
              <i className="fas fa-info-circle"></i>
            </span> Polish the Gate
          </button>
          <button id="btnExercise" className="btn btn-sm btn-primary mb-2">Exercise</button>
        </div>
        <div id="actTemple" className="d-grid d-none">
          <button id="btnPray" className="btn btn-sm btn-primary mb-2">Pray</button>
          <button id="btnWash" className="btn btn-sm btn-primary mb-2">Wash</button>
          <button id="btnMeditate" className="btn btn-sm btn-primary mb-2">Meditate</button>
        </div>
        <div id="actTime" className="d-grid d-none">
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
        <img src={"./assets/dpad.png"} alt="D-PAD" className="opacity-50" />
        <i id="dUp" className="fas fa-caret-up position-absolute start-50 top-0 translate-middle-x dpad" onMouseDown={() => mouseDown('dUp')} onMouseUp={() => mouseUp('dUp')} style={{ fontSize: "58pt" }}></i>
        <i id="dRt" className="fas fa-caret-right position-absolute top-50 translate-middle-y dpad" onMouseDown={() => mouseDown('dRt')} onMouseUp={() => mouseUp('dRt')} style={{ fontSize: "58pt", right: "1.5rem" }}></i>
        <i id="dDn" className="fas fa-caret-down position-absolute start-50 translate-middle-x dpad" onMouseDown={() => mouseDown('dDn')} onMouseUp={() => mouseUp('dDn')} style={{ fontSize: "58pt", bottom: ".2rem" }}></i>
        <i id="dLt" className="fas fa-caret-left position-absolute top-50 translate-middle-y dpad" onMouseDown={() => mouseDown('dLt')} onMouseUp={() => mouseUp('dLt')} style={{ fontSize: "58pt", left: "1.5rem" }}></i>
      </div>
    </div>
  );
}