import { useState, useEffect } from 'react'
import { loadPreferences, savePreferences } from '../utils/storage'
import soundManager from '../utils/soundManager'

function Menu({ onStartGame }) {
  const [gameMode, setGameMode] = useState('pvp')
  const [botLevel, setBotLevel] = useState('beginner')
  const [playerColor, setPlayerColor] = useState('white')

  useEffect(() => {
    // Load saved preferences
    const prefs = loadPreferences()
    if (prefs) {
      setGameMode(prefs.gameMode || 'pvp')
      setBotLevel(prefs.botLevel || 'beginner')
      setPlayerColor(prefs.playerColor || 'white')
    }
  }, [])

  const handleStartGame = () => {
    const settings = { gameMode, botLevel, playerColor }
    savePreferences(settings)
    
    // Unlock audio on start game
    soundManager.unlockAudio()
    
    onStartGame(settings)
  }

  return (
    <div className="menu-container">
      <h1>♟️ Chess Game</h1>
      
      <div className="menu-section">
        <h2>Game Mode</h2>
        <div className="radio-group">
          <label>
            <input
              type="radio"
              name="gameMode"
              value="pvp"
              checked={gameMode === 'pvp'}
              onChange={(e) => setGameMode(e.target.value)}
            />
            Player vs Player
          </label>
          <label>
            <input
              type="radio"
              name="gameMode"
              value="pvbot"
              checked={gameMode === 'pvbot'}
              onChange={(e) => setGameMode(e.target.value)}
            />
            Player vs Bot
          </label>
        </div>
      </div>

      {gameMode === 'pvbot' && (
        <div className="menu-section">
          <h2>Bot Level</h2>
          <div className="radio-group">
            <label>
              <input
                type="radio"
                name="botLevel"
                value="beginner"
                checked={botLevel === 'beginner'}
                onChange={(e) => setBotLevel(e.target.value)}
              />
              Beginner
            </label>
            <label>
              <input
                type="radio"
                name="botLevel"
                value="medium"
                checked={botLevel === 'medium'}
                onChange={(e) => setBotLevel(e.target.value)}
              />
              Medium
            </label>
            <label>
              <input
                type="radio"
                name="botLevel"
                value="hard"
                checked={botLevel === 'hard'}
                onChange={(e) => setBotLevel(e.target.value)}
              />
              Hard
            </label>
            <label>
              <input
                type="radio"
                name="botLevel"
                value="grandmaster"
                checked={botLevel === 'grandmaster'}
                onChange={(e) => setBotLevel(e.target.value)}
              />
              Grandmaster
            </label>
          </div>
        </div>
      )}

      {gameMode === 'pvbot' && (
        <div className="menu-section">
          <h2>Play as</h2>
          <div className="radio-group">
            <label>
              <input
                type="radio"
                name="playerColor"
                value="white"
                checked={playerColor === 'white'}
                onChange={(e) => setPlayerColor(e.target.value)}
              />
              White
            </label>
            <label>
              <input
                type="radio"
                name="playerColor"
                value="black"
                checked={playerColor === 'black'}
                onChange={(e) => setPlayerColor(e.target.value)}
              />
              Black
            </label>
          </div>
        </div>
      )}

      <button className="start-button" onClick={handleStartGame}>
        Start Game
      </button>
    </div>
  )
}

export default Menu