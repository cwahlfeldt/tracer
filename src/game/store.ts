import { createStore } from '../lib/store'
import { generateBoard } from './board'
import { startGame } from './game'
import character from './character'
import clone from '../lib/clone'
import { Tile } from '../types'

export const actions = {
    startGame: { type: 'startGame' },
    moveCharacter: { type: 'moveCharacter' },
}

function reducer(
    state: Tile[] = generateBoard(1),
    action: { type: string },
    payload: any
) {
    switch (action.type) {
        case 'startGame':
            return startGame(payload.boardSize, payload.playerStart)
        case 'moveCharacter':
            return character({
                board: state,
                hex: payload.hex,
                characterType: payload.type,
            })
        default:
            return state
    }
}

const store = createStore(reducer)
export default store
