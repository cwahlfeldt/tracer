import * as toolkitRaw from '@reduxjs/toolkit';
const { createSlice, configureStore, current } = toolkitRaw.default ?? toolkitRaw;
import {convertBoardToGraph, findPlayerTile, generateBoard, putPieceOnBoard} from "../game/board.js";
import {generatePlayer} from "../game/pieces.js";
import {areHexagonsEqual, getAllNeighbors, hex} from "../lib/hex.js";
import {findPath} from "../lib/pathFinding.js";

export const initialState = {
    board: [
        {
            hex: hex(0, 0, 0),
            neighbors: getAllNeighbors(hex(0, 0, 0)),
            props: {player: generatePlayer()},
        }
    ]
}

const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        startGame: (state, {payload}) => {
            const player = generatePlayer()
            const board = generateBoard(payload.boardSize)
            return {board: putPieceOnBoard(player, payload.playerLocation, board)}
        },
        movePlayer: (state, {payload}) => {
            const board = state.board
            const player = findPlayerTile(board).props.player

            state.board = putPieceOnBoard(player, payload, board)
        }
    }
})

const store = configureStore({reducer: gameSlice.reducer})

export const { startGame, movePlayer } = gameSlice.actions
export const gameReducer = gameSlice.reducer
export default store