import { getBeginnerMove } from './beginnerBot'
import { getMediumMove } from './mediumBot'
import { getHardMove } from './hardBot'
import { getGrandmasterMove } from './grandmasterBot'

/**
 * Main bot engine dispatcher
 * Selects the appropriate bot based on difficulty level
 */
export function getBotMove(game, level) {
  switch (level) {
    case 'beginner':
      return getBeginnerMove(game)
    case 'medium':
      return getMediumMove(game)
    case 'hard':
      return getHardMove(game)
    case 'grandmaster':
      return getGrandmasterMove(game)
    default:
      return getBeginnerMove(game)
  }
}
