import * as toolkitRaw from '@reduxjs/toolkit';
const { createSlice, configureStore, current } = toolkitRaw.default ?? toolkitRaw;
import {generateBoard, putPlayerOnBoard} from "../game/board.js";
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
        initializeBoard: (state, {payload: {
            size = 1,
            playerLocation = hex(0, 0, 0),
        }}) => {
            const player = generatePlayer()
            const board = generateBoard(size)
            return putPlayerOnBoard(player, board, playerLocation)
        },
    }
})

const store = configureStore({reducer: gameSlice.reducer})

export const { initializeBoard, initializePlayer } = gameSlice.actions
export const gameReducer = gameSlice.reducer
export default store