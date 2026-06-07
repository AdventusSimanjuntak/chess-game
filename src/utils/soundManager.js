/**
 * Sound Manager with Web Audio API
 * Generates sounds programmatically - no external files needed
 */

class SoundManager {
  constructor() {
    this.audioContext = null
    this.enabled = this.loadSoundPreference()
    this.unlocked = false
  }

  loadSoundPreference() {
    try {
      const stored = localStorage.getItem('chess_sound_enabled')
      return stored !== null ? JSON.parse(stored) : true
    } catch (error) {
      return true
    }
  }

  saveSoundPreference(enabled) {
    try {
      localStorage.setItem('chess_sound_enabled', JSON.stringify(enabled))
      this.enabled = enabled
    } catch (error) {
      console.error('Error saving sound preference:', error)
    }
  }

  toggleSound() {
    this.enabled = !this.enabled
    this.saveSoundPreference(this.enabled)
    
    if (this.enabled && !this.unlocked) {
      this.unlockAudio()
    }
    
    return this.enabled
  }

  isSoundEnabled() {
    return this.enabled
  }

  /**
   * Initialize AudioContext (required for browser autoplay policies)
   */
  unlockAudio() {
    if (this.unlocked) return
    
    try {
      if (!this.audioContext) {
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)()
      }
      
      // Resume context if suspended
      if (this.audioContext.state === 'suspended') {
        this.audioContext.resume()
      }
      
      this.unlocked = true
      console.log('🔊 Audio unlocked successfully')
    } catch (error) {
      console.warn('Could not unlock audio:', error.message)
    }
  }

  /**
   * Play a tone with specified frequency and duration
   */
  playTone(frequency, duration, type = 'sine') {
    if (!this.enabled) return
    if (!this.audioContext) {
      this.unlockAudio()
    }
    if (!this.audioContext) return

    try {
      const oscillator = this.audioContext.createOscillator()
      const gainNode = this.audioContext.createGain()
      
      oscillator.connect(gainNode)
      gainNode.connect(this.audioContext.destination)
      
      oscillator.frequency.value = frequency
      oscillator.type = type
      
      // Envelope for smooth sound
      const now = this.audioContext.currentTime
      gainNode.gain.setValueAtTime(0, now)
      gainNode.gain.linearRampToValueAtTime(0.3, now + 0.01)
      gainNode.gain.exponentialRampToValueAtTime(0.01, now + duration)
      
      oscillator.start(now)
      oscillator.stop(now + duration)
    } catch (error) {
      console.warn('Could not play tone:', error.message)
    }
  }

  /**
   * Play a chord (multiple frequencies)
   */
  playChord(frequencies, duration) {
    frequencies.forEach(freq => this.playTone(freq, duration))
  }

  playMove() {
    console.log('🎵 Playing move sound')
    // Simple click sound - short high tone
    this.playTone(800, 0.05, 'sine')
  }

  playCapture() {
    console.log('🎵 Playing capture sound')
    // Capture sound - two tones descending
    this.playTone(600, 0.08, 'square')
    setTimeout(() => this.playTone(400, 0.08, 'square'), 50)
  }

  playCheck() {
    console.log('🎵 Playing check sound')
    // Check sound - alert tone
    this.playTone(1000, 0.1, 'sine')
    setTimeout(() => this.playTone(1200, 0.1, 'sine'), 100)
  }

  playGameOver() {
    console.log('🎵 Playing game over sound')
    // Game over - chord progression
    this.playChord([523, 659, 784], 0.3) // C major chord
    setTimeout(() => this.playChord([494, 622, 740], 0.4), 300) // B major chord
  }

  playIllegal() {
    console.log('🎵 Playing illegal move sound')
    // Error sound - low buzz
    this.playTone(200, 0.15, 'sawtooth')
  }
}

// Create singleton instance
const soundManager = new SoundManager()

export default soundManager
