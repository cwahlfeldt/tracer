import { describe, it, assert } from 'vitest'
import { GameBuilder } from './game'
import { hex } from '../lib/hex'
import { Board } from '../types.js'
import { gameBoard } from '../data/testBoardData.js'

describe('Game rules', async () => {
    it('should initialize a game board', () => {
        const board: Board = GameBuilder([])
            .createBoard(1)
            .spawnPlayer(hex(0, 0, 0))
            .spawnEnemy('enemyOne', hex(0, -1, 1))
            .build()

        assert.deepEqual(board, gameBoard)
    })
})
