# Sound Files for Chess Game

This directory should contain the following MP3 sound files for the chess game:

## Required Sound Files

1. **move.mp3** - Played when a piece moves normally
2. **capture.mp3** - Played when a piece captures another piece
3. **check.mp3** - Played when a king is in check
4. **game-over.mp3** - Played when the game ends (checkmate, stalemate, or draw)
5. **illegal.mp3** - Played when an illegal move is attempted

## File Specifications

- **Format:** MP3
- **Recommended duration:** 0.5 - 1.5 seconds
- **Recommended volume:** Normalized to prevent clipping
- **Sample rate:** 44.1kHz or 48kHz

## Where to Get Sound Files

You can download free chess sound effects from:

1. **Freesound.org** - https://freesound.org/
   - Search for: "chess move", "chess capture", "chess check"
   
2. **Mixkit** - https://mixkit.co/free-sound-effects/
   - Browse game sound effects
   
3. **Zapsplat** - https://www.zapsplat.com/
   - Free sound effects library

4. **Chess.com Sounds** (for reference only, do not copy)
   - Listen to chess.com sounds for inspiration
   - Create or find similar sounds from free sources

## Installation

1. Download or create the 5 MP3 files
2. Rename them exactly as listed above
3. Place them in this directory: `public/sounds/`
4. Restart the development server if running

## Important Notes

- The game will work WITHOUT these files
- Sound manager has error handling for missing files
- If files are missing, warnings will appear in browser console
- Users can toggle sound on/off in the game interface
- Sound preference is saved in localStorage

## Testing Sounds

After adding the files:

1. Start the game
2. Click "Start Game" to unlock audio (browser requirement)
3. Make moves to test sounds:
   - Normal move → move.mp3
   - Capture → capture.mp3
   - Check → check.mp3
   - Checkmate/Draw → game-over.mp3
   - Illegal move → illegal.mp3
4. Use the sound toggle (🔊/🔇) to test on/off functionality

## Troubleshooting

**Sounds not playing?**
- Check browser console for errors
- Ensure files are named correctly (case-sensitive)
- Verify files are in MP3 format
- Try clicking on the board to unlock audio
- Check if sound toggle is ON (🔊)
- Verify browser allows audio playback

**Files not found?**
- Path should be: `public/sounds/move.mp3` etc.
- Files must be in the `public` directory
- Restart dev server after adding files