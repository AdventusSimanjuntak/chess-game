import { useEffect, useState } from 'react'
import { Chessboard } from 'react-chessboard'
import { useChessGame } from '../hooks/useChessGame'
import { getBotMove } from '../engine/botEngine'
import GameControls from './GameControls'
import GameStatus from './GameStatus'
import MoveHistory from './MoveHistory'
import soundManager from '../utils/soundManager'

function GameScreen({ gameSettings, onBackToMenu }) {
  const { position, gameStatus, makeMove, resetGame, game, moveHistory } = useChessGame()
  const [soundEnabled, setSoundEnabled] = useState(soundManager.isSoundEnabled())

  // Unlock audio on component mount
  useEffect(() => {
    soundManager.unlockAudio()
  }, [])

  // Bot makes move automatically after player's move
  useEffect(() => {
    if (gameSettings.gameMode === 'pvbot' && !gameStatus.isGameOver) {
      const currentTurn = gameStatus.turn === 'white' ? 'w' : 'b'
      const botColor = gameSettings.playerColor === 'white' ? 'b' : 'w'
      
      if (currentTurn === botColor) {
        // Add small delay for better UX
        const timer = setTimeout(() => {
          const botMoveStr = getBotMove(game, gameSettings.botLevel)
          if (botMoveStr) {
            makeMove(botMoveStr)
          }
        }, 500)
        
        return () => clearTimeout(timer)
      }
    }
  }, [gameStatus.turn, gameSettings, gameStatus.isGameOver, game, makeMove])

  const handlePieceDrop = (sourceSquare, targetSquare) => {
    // Unlock audio on first interaction
    soundManager.unlockAudio()
    
    // Check if it's player's turn in PvBot mode
    if (gameSettings.gameMode === 'pvbot') {
      const playerColor = gameSettings.playerColor === 'white' ? 'w' : 'b'
      const currentTurn = gameStatus.turn === 'white' ? 'w' : 'b'
      
      if (playerColor !== currentTurn) {
        return false
      }
    }

    // Try the move with promotion to queen (will be ignored if not a promotion move)
    // chess.js will validate everything: legal moves, en passant, castling, etc.
    const move = {
      from: sourceSquare,
      to: targetSquare,
      promotion: 'q' // Always include promotion, chess.js ignores if not needed
    }

    return makeMove(move)
  }

  const handleRestart = () => {
    resetGame()
  }

  const toggleSound = () => {
    const newState = soundManager.toggleSound()
    setSoundEnabled(newState)
    soundManager.unlockAudio()
  }

  const handleTestSound = () => {
    console.log('🧪 Test sound clicked')
    console.log('AudioContext state:', soundManager.audioContext?.state)
    console.log('soundEnabled:', soundManager.enabled)
    soundManager.unlockAudio()
    console.log('playMove called')
    soundManager.playMove()
  }

  const getStatusMessage = () => {
    if (gameStatus.isCheckmate) {
      return `Checkmate! ${gameStatus.winner === 'white' ? 'White' : 'Black'} wins!`
    }
    if (gameStatus.isStalemate) {
      return 'Stalemate! Game is a draw.'
    }
    if (gameStatus.isDraw) {
      return 'Draw! Game over.'
    }
    if (gameStatus.isCheck) {
      return `Check! ${gameStatus.turn === 'white' ? 'White' : 'Black'}'s turn`
    }
    return `${gameStatus.turn === 'white' ? 'White' : 'Black'}'s turn`
  }

  return (
    <div className="game-screen">
      <div className="game-header">
        <GameStatus status={getStatusMessage()} turn={gameStatus.turn} />
        <div className="header-controls">
          <button 
            className="test-sound-button" 
            onClick={handleTestSound}
            title="Test Sound"
          >
            🎵 Test
          </button>
          <button 
            className="sound-toggle" 
            onClick={toggleSound}
            title={soundEnabled ? 'Sound On' : 'Sound Off'}
          >
            {soundEnabled ? '🔊' : '🔇'}
          </button>
        </div>
      </div>

      <div className="game-content">
        <div className="board-section">
          <div className="board-container">
            <Chessboard 
              position={position}
              onPieceDrop={handlePieceDrop}
              boardOrientation={gameSettings.playerColor}
              arePiecesDraggable={!gameStatus.isGameOver}
              customBoardStyle={{
                borderRadius: '4px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.5)'
              }}
              customLightSquareStyle={{ backgroundColor: '#eeeed2' }}
              customDarkSquareStyle={{ backgroundColor: '#769656' }}
            />
          </div>
        </div>

        <div className="info-section">
          <div className="game-info">
            <h3>Game Info</h3>
            <p><strong>Mode:</strong> {gameSettings.gameMode === 'pvp' ? 'Player vs Player' : 'Player vs Bot'}</p>
            {gameSettings.gameMode === 'pvbot' && (
              <>
                <p><strong>Bot Level:</strong> {gameSettings.botLevel.charAt(0).toUpperCase() + gameSettings.botLevel.slice(1)}</p>
                <p><strong>Playing as:</strong> {gameSettings.playerColor.charAt(0).toUpperCase() + gameSettings.playerColor.slice(1)}</p>
              </>
            )}
          </div>

          <MoveHistory moves={moveHistory} />

          <GameControls 
            onRestart={handleRestart}
            onBackToMenu={onBackToMenu}
          />
        </div>
      </div>
    </div>
  )
}

export default GameScreen
