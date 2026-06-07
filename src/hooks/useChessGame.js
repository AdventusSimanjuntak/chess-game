import { useState, useCallback } from 'react'
import { Chess } from 'chess.js'
import soundManager from '../utils/soundManager'

export function useChessGame() {
  const [game, setGame] = useState(new Chess())
  const [position, setPosition] = useState(game.fen())
  const [moveHistory, setMoveHistory] = useState([])
  const [gameStatus, setGameStatus] = useState({
    isGameOver: false,
    isCheck: false,
    isCheckmate: false,
    isStalemate: false,
    isDraw: false,
    winner: null,
    turn: 'white'
  })

  const updateGameStatus = useCallback((chessGame) => {
    const turn = chessGame.turn() === 'w' ? 'white' : 'black'
    const isGameOver = chessGame.isGameOver()
    const isCheck = chessGame.isCheck()
    const isCheckmate = chessGame.isCheckmate()
    const isStalemate = chessGame.isStalemate()
    const isDraw = chessGame.isDraw()
    
    let winner = null
    if (isCheckmate) {
      winner = turn === 'white' ? 'black' : 'white'
    }

    setGameStatus({
      isGameOver,
      isCheck,
      isCheckmate,
      isStalemate,
      isDraw,
      winner,
      turn
    })
  }, [])

  const makeMove = useCallback((move) => {
    try {
      const gameCopy = new Chess(game.fen())
      
      // Try to make the move - chess.js will handle all rules
      const result = gameCopy.move(move)
      
      if (result === null) {
        // Move failed - illegal move
        soundManager.playIllegal()
        return false
      }
      
      // Move successful
      setGame(gameCopy)
      setPosition(gameCopy.fen())
      
      // Update move history
      setMoveHistory(prev => [...prev, result.san])
      
      // Play appropriate sound based on game state
      if (gameCopy.isCheckmate() || gameCopy.isDraw() || gameCopy.isStalemate()) {
        soundManager.playGameOver()
      } else if (gameCopy.isCheck()) {
        soundManager.playCheck()
      } else if (result.captured) {
        soundManager.playCapture()
      } else {
        soundManager.playMove()
      }
      
      updateGameStatus(gameCopy)
      return true
    } catch (error) {
      console.error('Invalid move:', error)
      soundManager.playIllegal()
      return false
    }
  }, [game, updateGameStatus])

  const resetGame = useCallback(() => {
    const newGame = new Chess()
    setGame(newGame)
    setPosition(newGame.fen())
    setMoveHistory([])
    updateGameStatus(newGame)
  }, [updateGameStatus])

  const isValidMove = useCallback((from, to) => {
    const moves = game.moves({ verbose: true })
    return moves.some(move => move.from === from && move.to === to)
  }, [game])

  return {
    game,
    position,
    gameStatus,
    moveHistory,
    makeMove,
    resetGame,
    isValidMove
  }
}
