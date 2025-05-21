import React from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";

export default function FrontPage() {
  const navigate = useNavigate();

  function handleStartClick() {
    navigate("/TempleBound");
  }

  return (
    <div className="front-page">
      <img className="logo" src="assets/Logo.png" alt="Game Logo" />
      <h1>TempleBound</h1>
      <button onClick={handleStartClick}>Start Game</button>
    </div>
  );
}
