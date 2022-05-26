import test from "ava"
import {generateBoard, putPieceOnBoard} from "../../game/board.js"
import {generatePlayer} from "../../game/pieces.js"
import {hex} from "../../lib/hex.js"
import {gameReducer, initialState, startGame} from "../../state/store.js"

test('should return initial state', t => {
    t.deepEqual(
        gameReducer(undefined, {}),
        initialState.board
    )
})

test('initialize a game boardPiece', t => {
    const player = generatePlayer()
    const board = generateBoard(1)
    const expectedBoard = putPieceOnBoard(player, hex(0, 0, 0), board)
    const newState = gameReducer(initialState.board, startGame({
        boardSize: 1,
        playerLocation: hex(0, 0, 0),
        numOfEnemies: 1,
    }))

    t.deepEqual(
        newState,
        expectedBoard
    )
})