import { describe, it, assert } from 'vitest'
import { gameBoard } from '../lib/exampleBoardState.js'
import Game from './game'
import { hex } from '../lib/hex'

describe('Game rules', () => {
    it('should initialize a game board', () => {
        const board: any = Game([])
            .createBoard(1)
            .spawnPlayer(hex(0, 0, 0))
            .spawnEnemy(hex(0, -1, 1))
            .result()

        assert.deepEqual(board, gameBoard)
    })
})
