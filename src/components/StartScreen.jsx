import React, { useState, useEffect } from "react";

export default function StartScreen({ onStart }) {
  const characters = ["Frisk", "Chara"];
  const [index, setIndex] = useState(0);
  const [name, setName] = useState("");

  const handleNext = () => setIndex((prev) => (prev + 1) % characters.length);
  const handlePrev = () => setIndex((prev) => (prev - 1 + characters.length) % characters.length);

  const selected = characters[index];

  const [transitioning, setTransitioning] = useState(false);
  const [bgIndex, setBgIndex] = useState(index);

  const handleChange = (dir) => {
    setTransitioning(true);
    setTimeout(() => {
      if (dir === "next") handleNext();
      else handlePrev();
      setBgIndex((prev) => (dir === "next" ? (prev + 1) % characters.length : (prev - 1 + characters.length) % characters.length));
      setTransitioning(false);
    }, 300);
  };

  return (
    <div
      className={`start-screen text-center${transitioning ? " fade-bg" : ""} container-fluid d-flex align-items-center justify-content-center`}
      style={{
        minHeight: "100vh",
        color: "blue",
        backgroundImage: `url('/assets/${characters[bgIndex]} bg.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        transition: "background-image 0.3s ease"
      }}
    >
      <div className="w-100">
        <h1 className="mb-3" style={{ fontFamily: 'PressStart2P, monospace' }}>TempleBound</h1>
        <img src="/assets/Logo.png" className="mb-4" alt="logo" />
        <div id="CharacterSelect" className="d-flex justify-content-center align-items-center mb-4 flex-wrap">
          <button className="btn btn-outline-light me-2 flex-shrink-0" onClick={() => handleChange("prev")} disabled={transitioning} > ⟵ </button>
          <div className={`character-img-wrapper${transitioning ? " fade-char" : ""} mx-2`} style={{ maxWidth: 180, width: "100%" }}>
            <img src={`/assets/${selected} no bg.png`} alt={selected} style={{ width: "100%", maxWidth: 180, height: "auto" }} />
          </div>
          <button className="btn btn-outline-light ms-2 flex-shrink-0" onClick={() => handleChange("next")} disabled={transitioning} > ⟶ </button>
        </div>
        <input type="text" className="form-control w-75 w-md-50 mx-auto mb-3" placeholder="Enter your name here" value={name} onChange={(e) => setName(e.target.value)} />
        <button className="btn btn-primary w-100 w-md-auto" onClick={() => onStart(name, selected)} disabled={transitioning}>Choose</button>
      </div>
    </div>
  );
}