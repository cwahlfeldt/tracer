import test from "ava"
import {generateBoard, putPieceOnBoard} from "../../game/board.old.js"
import {generatePlayer, generateTile} from "../../game/pieces.js"
import {hex} from "../../lib/hex.js"
import {gameReducer, initialState, movePlayer, startGame} from "../../game/state/store.js"

test('should return initial state', t => {
    t.deepEqual(
        gameReducer(undefined, {}),
        initialState
    )
})

test('initialize a game boardPiece', t => {
    const player = generatePlayer()
    const board = generateBoard(1)
    const expectedBoard = {board: putPieceOnBoard(player, hex(0, 0, 0), board)}
    const newState = gameReducer(initialState, startGame({
        boardSize: 1,
        playerLocation: hex(0, 0, 0),
    }))

    t.deepEqual(
        newState,
        expectedBoard
    )
})

test('move player on board', t => {
    const state = gameReducer(initialState, startGame({
        boardSize: 1,
        playerLocation: hex(0, 0, 0),
    }))
    const newState = gameReducer(state, movePlayer(hex(0, 1, -1)))
    const player = generatePlayer()
    t.deepEqual(
        newState,
        {
            board: [
                generateTile(hex(-1, 0, 1)),
                generateTile(hex(-1, 1, 0)),
                generateTile(hex(0, -1, 1)),
                generateTile(hex(0, 0, 0)),
                generateTile(hex(0, 1, -1), {player}),
                generateTile(hex(1, -1, 0)),
                generateTile(hex(1, 0, -1)),
            ]
        }
    )
})