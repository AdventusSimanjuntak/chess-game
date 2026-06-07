import { PIECE_VALUES, POSITION_BONUS } from '../utils/constants'

/**
 * Hard Bot - Minimax Algorithm with Alpha-Beta Pruning
 * Uses minimax search with depth 3 and position evaluation
 */
export function getHardMove(game, depth = 3) {
  const moves = game.moves()
  
  if (moves.length === 0) {
    return null
  }
  
  let bestMove = null
  let bestValue = -Infinity
  const isMaximizing = game.turn() === 'w'
  
  for (const move of moves) {
    game.move(move)
    const value = minimax(game, depth - 1, -Infinity, Infinity, !isMaximizing)
    game.undo()
    
    if (value > bestValue) {
      bestValue = value
      bestMove = move
    }
  }
  
  return bestMove
}

function minimax(game, depth, alpha, beta, isMaximizing) {
  if (depth === 0 || game.isGameOver()) {
    return evaluatePosition(game)
  }
  
  const moves = game.moves()
  
  if (isMaximizing) {
    let maxEval = -Infinity
    for (const move of moves) {
      game.move(move)
      const evaluation = minimax(game, depth - 1, alpha, beta, false)
      game.undo()
      maxEval = Math.max(maxEval, evaluation)
      alpha = Math.max(alpha, evaluation)
      if (beta <= alpha) {
        break // Alpha-beta pruning
      }
    }
    return maxEval
  } else {
    let minEval = Infinity
    for (const move of moves) {
      game.move(move)
      const evaluation = minimax(game, depth - 1, alpha, beta, true)
      game.undo()
      minEval = Math.min(minEval, evaluation)
      beta = Math.min(beta, evaluation)
      if (beta <= alpha) {
        break // Alpha-beta pruning
      }
    }
    return minEval
  }
}

function evaluatePosition(game) {
  // Check for game over conditions
  if (game.isCheckmate()) {
    return game.turn() === 'w' ? -10000 : 10000
  }
  if (game.isDraw() || game.isStalemate()) {
    return 0
  }
  
  let score = 0
  const board = game.board()
  
  // Evaluate material and position
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      const piece = board[i][j]
      if (piece) {
        const pieceValue = PIECE_VALUES[piece.type]
        const positionValue = getPositionValue(piece.type, i, j, piece.color)
        const totalValue = pieceValue + positionValue
        
        score += piece.color === 'w' ? totalValue : -totalValue
      }
    }
  }
  
  // Add mobility bonus (number of legal moves)
  const mobilityBonus = game.moves().length * 0.1
  score += game.turn() === 'w' ? mobilityBonus : -mobilityBonus
  
  return score
}

function getPositionValue(pieceType, row, col, color) {
  if (!POSITION_BONUS[pieceType]) {
    return 0
  }
  
  // Flip row for black pieces
  const adjustedRow = color === 'w' ? row : 7 - row
  return POSITION_BONUS[pieceType][adjustedRow][col] || 0
}
