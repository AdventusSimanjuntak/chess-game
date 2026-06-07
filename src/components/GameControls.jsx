function GameControls({ onRestart, onBackToMenu }) {
  return (
    <div className="game-controls">
      <button className="control-button" onClick={onRestart}>
        Restart Game
      </button>
      <button className="control-button" onClick={onBackToMenu}>
        Back to Menu
      </button>
    </div>
  )
}

export default GameControls
