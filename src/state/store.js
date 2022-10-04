import * as toolkitRaw from '@reduxjs/toolkit'
import { putPieceOnBoard } from '../game/board.js'
import { generateEnemy, generatePlayer } from '../game/pieces.js'
import { hex, hexShapedHashGrid } from '../lib/hex.js'
import { findPlayer } from './selectors.js'
import { placePiece } from '../game/game.js'

const { createSlice, configureStore, current } =
    toolkitRaw.default ?? toolkitRaw

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
            state.board = placePiece(
                hexShapedHashGrid(2),
                player,
                hex(0, 0, 0)
            )
        },

        movePlayer: (state, { payload }) => {
            const board = state.board
            const player = findPlayer(board)
            // const graph = convertBoardToGraph(board)
            // const path = findPath(graph, player.hex, payload)
            console.log(payload)
            state.board = placePiece(board, player, payload)
        },
    },
})

const store = configureStore({ reducer: gameSlice.reducer })

export const { startGame, movePlayer } = gameSlice.actions
export const gameReducer = gameSlice.reducer
export default store
