import { describe, it, assert } from 'vitest'
import { gameBoard } from '../lib/exampleBoardState.js'
import { startGame } from './game'
import { hex } from '../lib/hex'

const testBoard: any = startGame(1, hex(0, 0, 0), hex(0, -1, 1))

describe('Game rules', () => {
    it('should initialize a game board', () => {
        assert.deepEqual(testBoard, gameBoard)
    })
})
