import * as toolkitRaw from '@reduxjs/toolkit'
const { createSlice, configureStore } = toolkitRaw.default ?? toolkitRaw
import { generateBoard, putPieceOnBoard, putPiecesOnBoard } from '../game/board.js'
import { generateEnemy, generatePlayer } from '../game/pieces.js'
import { getAllNeighbors, hex } from '../lib/hex.js'
import { findPlayer } from './selectors.js'

export const initialState = {
    board: [
        {
            hex: hex(0, 0, 0),
            neighbors: getAllNeighbors(hex(0, 0, 0)),
            props: { player: generatePlayer() },
        },
    ],
}

const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        startGame: (state, { payload }) => {
            const player = generatePlayer()
            const enemy = generateEnemy()
            const board = generateBoard(payload.boardSize)

            state.board = putPiecesOnBoard(
                [player, enemy, enemy],
                [hex(0,0,0), hex(1, -1, 0), hex(-1, 1, 0)],
                board
            )
        },
        movePlayer: (state, { payload }) => {
            const board = state.board
            const player = findPlayer(board).props.player

            state.board = putPieceOnBoard(player, payload, board)
        },
    },
})

const store = configureStore({ reducer: gameSlice.reducer })

export const { startGame, movePlayer } = gameSlice.actions
export const gameReducer = gameSlice.reducer
export default store
