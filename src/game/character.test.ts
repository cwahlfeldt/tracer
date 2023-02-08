import { describe, it, assert } from 'vitest'
import { Board } from '../types'
import { hex } from '../lib/hex'
import { GameBuilder } from './builder'

export const moveCharacterBoard: Board = [
    {
        hex: { q: -1, r: 0, s: 1 },
        props: {},
    },
    {
        hex: { q: -1, r: 1, s: 0 },
        props: {},
    },
    {
        hex: { q: 0, r: -1, s: 1 },
        props: { player: { type: 'player', health: 3 } },
    },
    {
        hex: { q: 0, r: 0, s: 0 },
        props: {},
    },
    {
        hex: { q: 0, r: 1, s: -1 },
        props: { enemyOne: { type: 'enemy', health: 1 } },
    },
    {
        hex: { q: 1, r: -1, s: 0 },
        props: {},
    },
    {
        hex: { q: 1, r: 0, s: -1 },
        props: {},
    },
]

describe('Character interactions', () => {
    it('should be able to move a character', () => {
        const board = GameBuilder([])
            .createBoard(1)
            .spawnPlayer(hex(0, 0, 0))
            .spawnEnemy('enemyOne', hex(0, 1, -1))
            .moveCharacter(hex(0, -1, 1), 'player')
            .build()

        assert.deepEqual(board, moveCharacterBoard)
    })

    it('enemy should follow player', () => {
        const expectedBoard: Board = [
            {
                hex: { q: -1, r: 0, s: 1 },
                props: {},
            },
            {
                hex: { q: -1, r: 1, s: 0 },
                props: {},
            },
            {
                hex: { q: 0, r: -1, s: 1 },
                props: { player: { type: 'player', health: 3 } },
            },
            {
                hex: { q: 0, r: 0, s: 0 },
                props: { enemyOne: { type: 'enemy', health: 1 } },
                // ^^ initial player location
            },
            {
                hex: { q: 0, r: 1, s: -1 },
                props: {}, // initial enemy location
            },
            {
                hex: { q: 1, r: -1, s: 0 },
                props: {},
            },
            {
                hex: { q: 1, r: 0, s: -1 },
                props: {},
            },
        ]

        const moveTo = hex(0, -1, 1)
        const board = GameBuilder([])
            .createBoard(1)
            .spawnPlayer(hex(0, 0, 0))
            .spawnEnemy('enemyOne', hex(0, 1, -1))
            .moveCharacter(moveTo, 'player')
            .moveCharacter(moveTo, 'enemyOne')
            .build()

        assert.deepEqual(board, expectedBoard)
    })
})
