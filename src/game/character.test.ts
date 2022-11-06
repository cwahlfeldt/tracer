import { describe, it, assert } from 'vitest'
import { Board } from '../types'
import { startGame } from './game'
import { hex } from '../lib/hex'
import moveCharacter from './character'

export const moveCharacterBoard: Board = [
    {
        hex: { q: -1, r: 0, s: 1 },
        props: {},
    },
    {
        hex: { q: -1, r: 1, s: 0 },
        props: { player: { type: 'player', health: 3 } },
    },
    {
        hex: { q: 0, r: -1, s: 1 },
        props: {},
    },
    {
        hex: { q: 0, r: 0, s: 0 },
        props: {},
    },
    {
        hex: { q: 0, r: 1, s: -1 },
        props: {},
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
        const gameBoard = startGame(1, hex(0, 0, 0), hex(0, -1, 1))
        const movePlayerBoard = moveCharacter({
            board: gameBoard,
            hex: hex(0, -1, 1),
            characterType: 'player',
        })
        assert.deepEqual(gameBoard, movePlayerBoard)
    })
})
