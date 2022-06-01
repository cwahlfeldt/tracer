import { areHexagonsEqual, hexShapedGrid } from "../lib/hex.js"
import { generateTile } from "./pieces.js"
import {objFilter} from "../lib/utilities.js";

export const generateBoard = (size) => {
    const grid = hexShapedGrid(size)
    return grid.map(h => generateTile(h))
}

export const genBoard = (size) => {
    const grid = hexShapedGrid(size)
    return grid.reduce((map, hex) => {
        map[JSON.stringify(hex)] = generateTile(hex)
        return map
    }, {})
}

export const putPieceOnBoard = (piece, hex, board) => {
    return board.map(tile => {
        if (piece.type === 'player' && 'player' in tile.props) {
            delete tile.props.player
        }

        if (areHexagonsEqual(tile.hex, hex)) {
            tile.props[`${piece.type}`] = piece
        }

        return tile
    })
}

export const Board = (board = generateBoard(1)) => ({
    putPiece: (piece, location) => Board(putPieceOnBoard(piece, location, board)),
    result: () => board,
})

export function boardGraph(board) {
    return board.map((tile) => {
        return tile.neighbors.map(neighbor => board.findIndex(t => areHexagonsEqual(t.hex, neighbor)))
    })
}

export function hexGraph(board) {
    return board.reduce((obj, tile) => ({ ...obj, [JSON.stringify(tile.hex)]: tile.neighbors }))
}

export const findPlayer = (board) => {
    return Object.values(objFilter(board, tile => 'player' in tile.props))[0]
}