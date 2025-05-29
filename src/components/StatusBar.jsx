import Timer from "./Timer";

export default function Statusbar({username}){
  return (
  <div className="bg-light rounded bg-opacity-50 shadow p-3 mb-3">
      <Timer username={username} />
      <div className="d-flex w-100">
        <div className="flex-fill text-truncate">
          <span id="Timer"></span>
        </div>
        <div className="text-muted small text-nowrap">
          <i className="fas fa-coins"></i> <span id="money">1000</span>
        </div>
      </div>
      <div className="row row-cols-lg-4 row-cols-2 mt-3">
        <div className="col d-flex">
          <i className="fas fa-utensils text-success text-end me-1"></i>
          <div className="progress mb-2 flex-fill border border-secondary-subtle">
            <div id="food-bar" className="progress-bar bg-success" style={{ width: "50%" }}></div>
          </div>
        </div>
        <div className="col d-flex">
          <i className="fas fa-bed text-info me-1"></i>
          <div className="progress flex-fill border border-secondary-subtle">
            <div id="energy-bar" className="progress-bar bg-info" style={{ width: "50%" }}></div>
          </div>
        </div>
        <div className="col d-flex">
          <i className="fas fa-star-of-life text-warning me-1"></i>
          <div className="progress flex-fill border border-secondary-subtle">
            <div id="hygiene-bar" className="progress-bar bg-warning" style={{ width: "50%" }}></div>
          </div>
        </div>
        <div className="col d-flex">
          <i className="fas fa-smile text-primary text-end me-1" style={{ width: "20px" }}></i>
          <div className="progress flex-fill border border-secondary-subtle">
            <div id="mood-bar" className="progress-bar bg-primary" style={{ width: "50%" }}></div>
          </div>
        </div>
      </div>
    </div>
  );
}