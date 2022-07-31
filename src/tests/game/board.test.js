import test from 'ava'
import {
    generateBoard,
    putPieceOnBoard,
    putPiecesOnBoard,
} from '../../game/board.js'
import {
    generateEnemy,
    generatePlayer,
    generateTile,
} from '../../game/pieces.js'
import { hex } from '../../lib/hex.js'

test('create boardPiece with tiles', (t) => {
    t.deepEqual(generateBoard(1), [
        generateTile(hex(-1, 0, 1)),
        generateTile(hex(-1, 1, 0)),
        generateTile(hex(0, -1, 1)),
        generateTile(hex(0, 0, 0)),
        generateTile(hex(0, 1, -1)),
        generateTile(hex(1, -1, 0)),
        generateTile(hex(1, 0, -1)),
    ])
})

test('place a playerPiece piece on the boardPiece', (t) => {
    const board = generateBoard(1)
    const player = generatePlayer()
    t.deepEqual(putPieceOnBoard(player, hex(0, 0, 0), board), [
        generateTile(hex(-1, 0, 1)),
        generateTile(hex(-1, 1, 0)),
        generateTile(hex(0, -1, 1)),
        generateTile(hex(0, 0, 0), { player }),
        generateTile(hex(0, 1, -1)),
        generateTile(hex(1, -1, 0)),
        generateTile(hex(1, 0, -1)),
    ])
})

test('ensure there is only one playerPiece on the board', (t) => {
    const board = generateBoard(1)
    const player = generatePlayer()
    const playerBoard = putPieceOnBoard(player, hex(0, 0, 0), board)
    t.deepEqual(putPieceOnBoard(player, hex(-1, 1, 0), playerBoard), [
        generateTile(hex(-1, 0, 1)),
        generateTile(hex(-1, 1, 0), { player }),
        generateTile(hex(0, -1, 1)),
        generateTile(hex(0, 0, 0)),
        generateTile(hex(0, 1, -1)),
        generateTile(hex(1, -1, 0)),
        generateTile(hex(1, 0, -1)),
    ])
})

test('place an enemy on the boardPiece', (t) => {
    const board = generateBoard(1)
    const enemy = generateEnemy()
    t.deepEqual(putPieceOnBoard(enemy, hex(0, 1, -1), board), [
        generateTile(hex(-1, 0, 1)),
        generateTile(hex(-1, 1, 0)),
        generateTile(hex(0, -1, 1)),
        generateTile(hex(0, 0, 0)),
        generateTile(hex(0, 1, -1), { enemy }),
        generateTile(hex(1, -1, 0)),
        generateTile(hex(1, 0, -1)),
    ])
})

test('put multiple pieces on the board', (t) => {
    const board = generateBoard(1)
    const enemy = generateEnemy()
    const boardWithPieces = putPiecesOnBoard(
        [enemy, enemy],
        [hex(0, 0, 0), hex(0, -1, 1)],
        board
    )
    t.deepEqual(boardWithPieces, [
        generateTile(hex(-1, 0, 1)),
        generateTile(hex(-1, 1, 0)),
        generateTile(hex(0, -1, 1), { enemy }),
        generateTile(hex(0, 0, 0), { enemy }),
        generateTile(hex(0, 1, -1)),
        generateTile(hex(1, -1, 0)),
        generateTile(hex(1, 0, -1)),
    ])
})

test('cant put pieces of the same type on the same tile', (t) => {
    const board = generateBoard(1)
    const enemy = generateEnemy()
    const boardWithPieces = putPiecesOnBoard(
        [enemy, enemy],
        [hex(0, 0, 0), hex(0, 0, 0)],
        board
    )
    t.deepEqual(boardWithPieces, [
        generateTile(hex(-1, 0, 1)),
        generateTile(hex(-1, 1, 0)),
        generateTile(hex(0, -1, 1)),
        generateTile(hex(0, 0, 0), { enemy }),
        generateTile(hex(0, 1, -1)),
        generateTile(hex(1, -1, 0)),
        generateTile(hex(1, 0, -1)),
    ])
})
// test('pieces of the same type cannot exist on the same tile', t => {
//     const board = generateBoard(1)
//     const enemy = generateEnemy()
//         const
//     t.deepEqual(
//         Board(board)
//             .putPiece(enemy, hex(0, 0, 0))
//             .putPiece(enemy, hex(0, 0, 0))
//             .result(),
//         [
//             generateTile(hex(-1, 0, 1)),
//             generateTile(hex(-1, 1, 0)),
//             generateTile(hex(0, -1, 1)),
//             generateTile(hex(0, 0, 0), {enemy}),
//             generateTile(hex(0, 1, -1)),
//             generateTile(hex(1, -1, 0)),
//             generateTile(hex(1, 0, -1)),
//         ]
//     )
// })
