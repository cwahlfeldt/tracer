import { dhx, hx } from '../../board.js'

export default function selectPlayer(state) {
    console.log(state)
    const player = state.pieces.player
    return state.board[dhx(player.hex)]
}