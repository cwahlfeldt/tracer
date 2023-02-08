import { createStore } from '../lib/store'
import { generateBoard } from './board'
import { Board } from '../types'
import clone from '../lib/clone'
import { startGame, moveCharacter } from './game'

export const actions = {
    startGame: { type: 'startGame' },
    moveCharacter: { type: 'moveCharacter' },
}

function reducer(
    s: Board = generateBoard(1),
    action: { type: string },
    payload: any
) {
    const state = clone(s)

    switch (action.type) {
        case 'startGame':
            return startGame()
        case 'moveCharacter':
            return moveCharacter(state, payload.hex, payload.type)
        default:
            return state
    }
}

const store = createStore(reducer)
export default store
