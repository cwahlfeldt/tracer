import * as toolkitRaw from '@reduxjs/toolkit'
const { createSlice, configureStore, current } =
    toolkitRaw.default ?? toolkitRaw
import {
    convertBoardToGraph,
    generateBoard,
    putPieceOnBoard,
    putPiecesOnBoard,
} from '../game/board.js'
import { generateEnemy, generatePlayer } from '../game/pieces.js'
import { hexShapedHashGrid, getAllNeighbors, hex } from '../lib/hex.js'
import { findPath } from '../lib/pathFinding.js'
import { findPlayer } from './selectors.js'
import BoardBuilder, { dhx, placePiece } from '../game/game.js'

const startHex = hex(0, 0, 0)
export const initialState = {
    /* board: [ */
    /*     { */
    /*         hex: hex(0, 0, 0), */
    /*         neighbors: getAllNeighbors(hex(0, 0, 0)), */
    /*         props: { player: generatePlayer() }, */
    /*     }, */
    /* ], */
    board: {},
}

const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        startGame: (state, { payload }) => {
            const player = generatePlayer()
            const enemy = generateEnemy()
            const boardWithPlayer = placePiece(
                hexShapedHashGrid(3),
                player,
                hex(0, 0, 0)
            )

            state.board = boardWithPlayer
        },

        movePlayer: (state, { payload }) => {
            const board = state.board
            const player = findPlayer(board)
            // const graph = convertBoardToGraph(board)
            // const path = findPath(graph, player.hex, payload)
            state.board = putPieceOnBoard(player, payload, board)
        },
    },
})

const store = configureStore({ reducer: gameSlice.reducer })

export const { startGame, movePlayer } = gameSlice.actions
export const gameReducer = gameSlice.reducer
export default store
