import { describe, it, assert } from 'vitest'
import { blankBoard } from '../data/testBoardData'
import clone from '../lib/clone'
import { hex } from '../lib/hex'
import { Board, Character, Hex, Piece, Tile } from '../types'
import {
    convertBoardToGraph,
    createPath,
    findIndexOfTile,
    findTileWithProp,
    generateBoard,
    putPieceOnBoard,
} from './board'

const playerPiece: Piece = { player: { type: 'player', health: 3 } }

describe('Board creation', () => {
    it('create a board', () => {
        const initializedBoard: Board = generateBoard(1)
        assert.deepEqual(initializedBoard, blankBoard)
    })

    it('can put piece on board', () => {
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
                props: {},
            },
            {
                hex: { q: 0, r: 0, s: 0 },
                props: {
                    player: { type: 'player', health: 3 },
                },
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

        const initializedBoard: Board = generateBoard(1)

        assert.deepEqual(
            putPieceOnBoard(initializedBoard, playerPiece, hex(0, 0, 0)),
            expectedBoard
        )
    })

    it('can put 2 pieces on board', () => {
        const expectedBoard: Board = [
            {
                hex: { q: -1, r: 0, s: 1 },
                props: {},
            },
            {
                hex: { q: -1, r: 1, s: 0 },
                props: {
                    enemyOne: { type: 'enemy', health: 1 },
                },
            },
            {
                hex: { q: 0, r: -1, s: 1 },
                props: {},
            },
            {
                hex: { q: 0, r: 0, s: 0 },
                props: {
                    player: { type: 'player', health: 3 },
                },
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

        const initializedBoard: Board = generateBoard(1)
        const enemyPiece: Piece = { enemyOne: { type: 'enemy', health: 1 } }
        const boardWithPlayer = putPieceOnBoard(
            initializedBoard,
            playerPiece,
            hex(0, 0, 0)
        )

        const boardWithPlayerAndEnemy = putPieceOnBoard(
            boardWithPlayer,
            enemyPiece,
            hex(-1, 1, 0)
        )

        assert.deepEqual(boardWithPlayerAndEnemy, expectedBoard)
    })

    it('can put 3 pieces on board', () => {
        const expectedBoard: Board = [
            {
                hex: { q: -1, r: 0, s: 1 },
                props: {
                    enemyTwo: { type: 'enemy', health: 1 },
                },
            },
            {
                hex: { q: -1, r: 1, s: 0 },
                props: {
                    enemyOne: { type: 'enemy', health: 1 },
                },
            },
            {
                hex: { q: 0, r: -1, s: 1 },
                props: {},
            },
            {
                hex: { q: 0, r: 0, s: 0 },
                props: {
                    player: { type: 'player', health: 3 },
                },
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

        const initializedBoard: Board = generateBoard(1)
        const enemyPiece: Piece = { enemyOne: { type: 'enemy', health: 1 } }
        const enemyTwoPiece: Piece = { enemyTwo: { type: 'enemy', health: 1 } }

        const boardWithPlayer = putPieceOnBoard(
            initializedBoard,
            playerPiece,
            hex(0, 0, 0)
        )

        const boardWithPlayerAndEnemy = putPieceOnBoard(
            boardWithPlayer,
            enemyPiece,
            hex(-1, 1, 0)
        )

        const boardWithPlayerAndTwoEnemies = putPieceOnBoard(
            boardWithPlayerAndEnemy,
            enemyTwoPiece,
            hex(-1, 0, 1)
        )

        assert.deepEqual(boardWithPlayerAndTwoEnemies, expectedBoard)

        const tryToMovePieceOnBoard = putPieceOnBoard(
            boardWithPlayerAndTwoEnemies,
            enemyPiece,
            hex(-1, 0, 1)
        )

        assert.deepEqual(tryToMovePieceOnBoard, expectedBoard)
    })

    it('can find index of a tile', () => {
        const h = hex(0, 0, 0)
        const initializedBoard: Board = generateBoard(1)

        assert.equal(findIndexOfTile(initializedBoard, h), 3)
    })

    it('should return -1 if cant find index of tile', () => {
        const h = hex(5, -5, 0)
        const initializedBoard: Board = generateBoard(1)

        assert.equal(findIndexOfTile(initializedBoard, h), -1)
    })

    it('can find path from one hex to another', () => {
        const smallBoard: Board = generateBoard(1)
        const mediumBoard: Board = generateBoard(4)

        const startHex = hex(0, 0, 0)
        const endHex = hex(1, 0, -1)
        const mdEndHex = hex(3, 0, -3)

        assert.deepEqual(createPath(smallBoard, startHex, endHex), [
            hex(1, 0, -1),
        ])

        assert.deepEqual(createPath(mediumBoard, startHex, mdEndHex), [
            hex(1, 0, -1),
            hex(2, 0, -2),
            hex(3, 0, -3),
        ])
    })

    it('should return start hex if end hex is out of bounds', () => {
        const mediumBoard: Board = generateBoard(4)
        const outOfBoundsHex = hex(9, -9, 0)

        assert.deepEqual(
            createPath(mediumBoard, hex(0, 0, 0), outOfBoundsHex),
            [hex(0, 0, 0)]
        )
    })

    it('can convert a board to an array of indexes and there relations or whats called a graph', () => {
        const initializedBoard: Board = generateBoard(1)
        const graph = convertBoardToGraph(initializedBoard)
        const expectedGraph = [
            [2, 1, 3],
            [0, 3, 4],
            [0, 3, 5],
            [0, 2, 5, 1, 4, 6],
            [1, 3, 6],
            [2, 3, 6],
            [3, 5, 4],
        ]

        assert.deepEqual(graph, expectedGraph)
    })

    it('can find a tile with a given prop', () => {
        const initBoard: Board = generateBoard(1)
        const board = putPieceOnBoard(initBoard, playerPiece, hex(0, 0, 0))
        const expectedTile: Tile = {
            hex: hex(0, 0, 0),
            props: { player: { type: 'player', health: 3 } },
        }

        assert.deepEqual(findTileWithProp(board, 'player'), expectedTile)
        assert.equal(findTileWithProp(initBoard, 'enemyOne'), undefined)
    })
})
