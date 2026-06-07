import { getHardMove } from './hardBot'

/**
 * Grandmaster Bot - Enhanced Minimax
 * Uses deeper search (depth 5) with same evaluation as Hard bot
 * This provides significantly stronger play than Hard bot
 */
export function getGrandmasterMove(game) {
  // Use minimax with depth 5 for stronger play
  // This takes longer but provides much better moves
  return getHardMove(game, 5)
}
