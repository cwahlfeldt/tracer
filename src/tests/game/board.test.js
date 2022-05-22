import test from "ava"
import {generateBoard, putPlayerOnBoard} from "../../game/board.js";
import {generatePlayer, generateTile} from "../../game/pieces.js";
import {hex} from "../../lib/hex.js";

test('create board with tiles', t => {
        t.deepEqual(
        generateBoard(1),
        [
            generateTile(hex(-1, 0, 1)),
            generateTile(hex(-1, 1, 0)),
            generateTile(hex(0, -1, 1)),
            generateTile(hex(0, 0, 0)),
            generateTile(hex(0, 1, -1)),
            generateTile(hex(1, -1, 0)),
            generateTile(hex(1, 0, -1)),
        ]
    )
})

test('place a player piece on the board', t => {
    const board = generateBoard(1)
    const player = generatePlayer()
    t.deepEqual(
        putPlayerOnBoard(player, board, hex(0, 0, 0)),
        [
            generateTile(hex(-1, 0, 1)),
            generateTile(hex(-1, 1, 0)),
            generateTile(hex(0, -1, 1)),
            generateTile(hex(0, 0, 0), {player}),
            generateTile(hex(0, 1, -1)),
            generateTile(hex(1, -1, 0)),
            generateTile(hex(1, 0, -1)),
        ]
    )
})

test('ensure there is only one player on the board', t => {
    const board = generateBoard(1)
    const player = generatePlayer()
    const playerBoard = putPlayerOnBoard(player, board, hex(0, 0, 0))
    t.deepEqual(
        putPlayerOnBoard(player, playerBoard, hex(-1, 1, 0)),
        [
            generateTile(hex(-1, 0, 1)),
            generateTile(hex(-1, 1, 0), {player}),
            generateTile(hex(0, -1, 1)),
            generateTile(hex(0, 0, 0)),
            generateTile(hex(0, 1, -1)),
            generateTile(hex(1, -1, 0)),
            generateTile(hex(1, 0, -1)),
        ]
    )
})