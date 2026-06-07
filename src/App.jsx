import { useState } from 'react'
import Menu from './components/Menu'
import GameScreen from './components/GameScreen'

function App() {
  const [currentScreen, setCurrentScreen] = useState('menu')
  const [gameSettings, setGameSettings] = useState({
    gameMode: 'pvp',
    botLevel: 'beginner',
    playerColor: 'white'
  })

  const handleStartGame = (settings) => {
    setGameSettings(settings)
    setCurrentScreen('game')
  }

  const handleBackToMenu = () => {
    setCurrentScreen('menu')
  }

  return (
    <div className="app">
      {currentScreen === 'menu' ? (
        <Menu onStartGame={handleStartGame} />
      ) : (
        <GameScreen 
          gameSettings={gameSettings}
          onBackToMenu={handleBackToMenu}
        />
      )}
    </div>
  )
}

export default App
