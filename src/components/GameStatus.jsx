function GameStatus({ status, turn }) {
  return (
    <div className="game-status">
      <h2>{status}</h2>
      <p className="turn-indicator">
        Current turn: <span className={`turn-${turn}`}>{turn === 'white' ? 'White' : 'Black'}</span>
      </p>
    </div>
  )
}

export default GameStatus
