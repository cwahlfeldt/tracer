import { hex } from '../../lib/hex.js'
import { exampleBoardState } from '../../lib/exampleBoardState.js'

const initialState = {
    board: exampleBoardState,
    pieces: {
        player: {
            health: 3,
            hex: hex(0, 0, 0),
        },
        enemy1: hex(1, 0, -1),
    },
}

export default initialState