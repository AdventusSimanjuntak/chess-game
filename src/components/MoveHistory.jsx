function MoveHistory({ moves }) {
  return (
    <div className="move-history">
      <h3>Move History</h3>
      <div className="moves-list">
        {moves.length === 0 ? (
          <p className="no-moves">No moves yet</p>
        ) : (
          <div className="moves-grid">
            {moves.map((move, index) => {
              const moveNumber = Math.floor(index / 2) + 1
              const isWhiteMove = index % 2 === 0
              
              return (
                <div key={index} className="move-item">
                  {isWhiteMove && <span className="move-number">{moveNumber}.</span>}
                  <span className={`move-notation ${isWhiteMove ? 'white-move' : 'black-move'}`}>
                    {move}
                  </span>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default MoveHistory
