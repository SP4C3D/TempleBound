import React from "react";

export default function InventoryModal({ items }) {
  return (
    <div
      className="modal fade"
      id="backpackModal"
      tabIndex="-1"
      aria-labelledby="backpackModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">

          {/* Modal Header */}
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="backpackModalLabel">Backpack Items</h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>

          {/* Modal Body */}
          <div className="modal-body">
            <div className="text-center mb-4">
              <img
                src="Assets/itemFishing.png"
                alt="Fishing Rod"
                style={{ height: "100px" }}
              />
            </div>

            <div className="row row-cols-6 justify-content-center">
              {/* Render inventory items */}
              {items?.map((item, idx) => (
                <div className="col text-center" key={idx}>
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{ height: "50px" }}
                  />
                  <br />
                  {item.count}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
