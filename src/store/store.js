import * as toolkitRaw from '@reduxjs/toolkit';
const { createSlice, configureStore, current } = toolkitRaw.default ?? toolkitRaw;
import {generateBoard, putPieceOnBoard} from "../game/board.js";
import {generatePlayer} from "../game/pieces.js";
import {getAllNeighbors, hex} from "../lib/hex.js";

export const initialState = [
    {
        hex: hex(0, 0, 0),
        neighbors: getAllNeighbors(hex(0, 0, 0)),
        props: {player: generatePlayer()},
    }
]

const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        startGame: (state, {payload}) => {
            const player = generatePlayer()
            const board = generateBoard(payload.boardSize)
            return putPieceOnBoard(player, payload.playerLocation, board)
        },
    }
})

const store = configureStore({reducer: gameSlice.reducer})

export const { startGame } = gameSlice.actions
export const gameReducer = gameSlice.reducer
export default store