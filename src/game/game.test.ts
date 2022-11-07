import { describe, it, assert } from 'vitest'
import { gameBoard } from '../lib/exampleBoardState.js'
import Game from './game'
import { hex } from '../lib/hex'

describe('Game rules', () => {
    it('should initialize a game board', () => {
        const board: any = Game([])
            .startGame(1, hex(0, 0, 0), hex(0, -1, 1))
            .result()
        assert.deepEqual(board, gameBoard)
    })
})
