import { PIECE_VALUES } from '../utils/constants'
import { getBeginnerMove } from './beginnerBot'

/**
 * Medium Bot - Capture Priority
 * Prioritizes capturing the highest value piece
 * Falls back to random move if no captures available
 */
export function getMediumMove(game) {
  const moves = game.moves({ verbose: true })
  
  if (moves.length === 0) {
    return null
  }
  
  // Filter moves that capture pieces
  const captureMoves = moves.filter(move => move.captured)
  
  if (captureMoves.length > 0) {
    // Find the capture with highest piece value
    const bestCapture = captureMoves.reduce((best, move) => {
      const captureValue = PIECE_VALUES[move.captured]
      const bestValue = PIECE_VALUES[best.captured]
      return captureValue > bestValue ? move : best
    })
    
    return bestCapture.san
  }
  
  // No captures available, fall back to random move
  return getBeginnerMove(game)
}
