import * as toolkitRaw from '@reduxjs/toolkit';
const { createSlice, configureStore, current } = toolkitRaw.default ?? toolkitRaw;
import {boardGraph, findPlayer, genBoard, generateBoard, hexGraph, putPieceOnBoard} from "../game/board.js";
import {generatePlayer, placePiece} from "../game/pieces.js";
import {areHexagonsEqual, getAllNeighbors, hex} from "../lib/hex.js";
import {findPath} from "../lib/pathFinding.js";
import {objFilter} from "../lib/utilities";

export const initialState = {
    board: [
        {
            hex: hex(0, 0, 0),
            neighbors: getAllNeighbors(hex(0, 0, 0)),
            props: {player: generatePlayer()},
        }
    ],
    graph: {},
}

const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        startGame: (state, {payload}) => {
            const board = genBoard(payload.boardSize)
            const player = generatePlayer()
            state = {board: placePiece(player, payload.playerLocation, board)}
            console.log(state)
        },
        movePlayer: (state, {payload}) => {
            const board = state.board
            const player = findPlayer(board)
            // const player = playerTile.props.player
            // const playerTileIndex = board.findIndex(tile => areHexagonsEqual(tile.hex, playerTile.hex))
            // const destinationTileIndex = board.findIndex(tile => areHexagonsEqual(tile.hex, payload))
            // const path = findPath(graph, playerTileIndex, destinationTileIndex)
            // console.log(path)
            state.board[JSON.stringify(player.hex)] = {player}
            console.log(state)

            // state.board = placePiece(player, payload, board)
        }
    }
})

const store = configureStore({reducer: gameSlice.reducer})

export const { startGame, movePlayer } = gameSlice.actions
export const gameReducer = gameSlice.reducer
export default store