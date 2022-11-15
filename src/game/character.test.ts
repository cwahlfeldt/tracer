import { describe, it, assert } from 'vitest'
import { Board } from '../types'
import Game, { selectEnemy, selectPlayer } from './game'
import { hex } from '../lib/hex'
import moveCharacter from './character'
import { findPath } from '../lib/pathFinding'
import { createPath } from './board'

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
        props: { enemy: { type: 'enemy', health: 1 } },
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
        const board = Game([])
            .createBoard(1)
            .spawnPlayer(hex(0, 0, 0))
            .spawnEnemy(hex(0, 1, -1))
            .moveCharacter(hex(0, -1, 1), 'player')
            .result()

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
                props: { enemy: { type: 'enemy', health: 1 } },
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
        const board = Game([])
            .createBoard(1)
            .spawnPlayer(hex(0, 0, 0))
            // console.log(board.result())
            .spawnEnemy(hex(0, 1, -1))
            // console.log(board.result())
            .moveCharacter(moveTo, 'player')
            // console.log(board.result())
            .moveCharacter(moveTo, 'enemy')
            .result()
        // console.log(board.result())

        console.log(board) // console.log(createPath(board, hex(0, 1, -1), hex(0, -1, 1))[0])
        // console.log(createPath(board, hex(0, 0, 0), hex(0, -1, 1))[0])
        // console.log(
        //     moveCharacter({ board, hex: moveTo, characterType: 'enemy' })
        // )
        // console.log(selectEnemy(board.result()))

        // console.log(board.result())
        // console.log(selectPlayer(board))
        // console.log(selectEnemy(board))
        assert.deepEqual(board, expectedBoard)
    })
})
