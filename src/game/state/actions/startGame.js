import { hexShapedHashGrid } from '../../../lib/hex.js'
import { generatePlayer } from '../../pieces.js'
import { placePiece } from '../../board.js'
import clone from '../../../lib/clone.js'
import initialState from '../initialState.js'

export default function startGame(state = initialState, { type, payload }) {
    if (type === 'startGame') {
        let newState = clone(state)
        const grid = hexShapedHashGrid(2)
        const player = generatePlayer()
        newState.board = placePiece(grid, player, payload)
        newState.pieces.player = {health: 3, hex: payload}
        return newState
    }
    return state
}
