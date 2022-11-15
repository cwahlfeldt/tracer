import { describe, it, assert } from 'vitest'
import { blankBoard } from '../lib/exampleBoardState'
import { startGame } from './game'
import { hex } from '../lib/hex'
import { Board } from '../types'
import { generateBoard } from './board'

describe('Board creation', () => {
    it('create a board', () => {
        const initializedBoard: Board = generateBoard(1, false)
        assert.deepEqual(initializedBoard, blankBoard)
    })

    // it('move player to one tile', () => {
    //     const initializedBoard: Board = startGame(
    //         1,
    //         hex(0, 0, 0),
    //         hex(0, -1, 1)
    //     )
    // })
})
