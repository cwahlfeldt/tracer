import { createStore } from '../lib/store'
import { generateBoard } from './gameBoard'
import { movePlayer, startGame } from './actions'
import clone from '../lib/clone'

export const actions = {
    startGame: {type: 'startGame'},
    movePlayer: {type: 'movePlayer'},
}

function reducer(state = generateBoard(1), action, payload: any) {
    const board = clone(state)
    switch(action.type) {
        case 'startGame': return startGame(payload.boardSize, payload.playerStart)
        case 'movePlayer': return movePlayer(board, payload)
        default: return state
    }
}

const store = createStore(reducer)
export default store