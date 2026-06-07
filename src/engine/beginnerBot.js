/**
 * Beginner Bot - Random Legal Move
 * Selects a random legal move from all available moves
 */
export function getBeginnerMove(game) {
  const moves = game.moves()
  
  if (moves.length === 0) {
    return null
  }
  
  const randomIndex = Math.floor(Math.random() * moves.length)
  return moves[randomIndex]
}
