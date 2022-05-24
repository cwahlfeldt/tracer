import test from "ava"
import {generateBoard, putPlayerOnBoard} from "../../game/board.js"
import {generatePlayer} from "../../game/pieces.js"
import {hex} from "../../lib/hex.js"
import {initializeBoard, gameReducer, initialState, initializePlayer} from "../../store/store.js"

test('should return initial state', t => {
    t.deepEqual(
        gameReducer(undefined, {}),
        initialState
    )
})

test('initialize a game board', t => {
    const player = generatePlayer()
    const board = generateBoard(1)
    const expectedBoard = putPlayerOnBoard(player, board, hex(0, 0, 0))
    const newState = gameReducer(initialState, initializeBoard({
        size: 1,
        playerLocation: hex(0, 0, 0),
    }))

    t.deepEqual(
        newState,
        expectedBoard
    )
})

// test('initialize a player piece on the board', t => {
//     const board = generateBoard(1)
//     const player = generatePlayer()
//     const expectedBoard = putPlayerOnBoard(player, board, hex(0, 0, 0))
//     const newState = gameReducer(initialState, initializePlayer(hex(0, 0, 0)))
//
//     t.deepEqual(newState, expectedBoard)
// })