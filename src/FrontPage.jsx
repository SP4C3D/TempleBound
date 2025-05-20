import './style.css';

export default function FrontPage() {
  function startGame() {
    // Navigate to the game (replace with React Router later)
    window.location.href = "/TempleBound";
  }

  return (
    <div className="front-page">
      <div className="logo">TempleBound</div>
      <button onClick={startGame}>Start</button>
    </div>
  );
}
