import { placePiece } from '../../board.js'
import clone from '../../../lib/clone.js'

export default function movePlayer(state, { type, payload }) {
    if (type === movePlayer.name) {
        let newState = clone(state)
        newState.board = placePiece(
            state.board,
            state.pieces.player,
            payload.hex
        )
        newState.pieces.player = payload.hex
        return newState
    }
    return state
}