import { areHexagonsEqual, hexShapedGrid } from '../lib/hex.js'
import { generateTile } from './pieces.js'

export const generateBoard = (size) => {
    const grid = hexShapedGrid(size)
    return grid.map((h) => generateTile(h))
}

export const putPieceOnBoard = (board, hex, piece) => {
    if (!board.some((t) => areHexagonsEqual(t.hex, hex))) {
        return board
    }

    return board.map((tile) => {
        if (piece.type === 'player' && 'player' in tile.props) {
            delete tile.props.player
        }

        if (areHexagonsEqual(tile.hex, hex)) {
            tile.props[`${piece.type}`] = piece
        }

        return tile
    })
}

export const putPiecesOnBoard = (pieces, hexes, board) => {
    let newBoard = board

    hexes.forEach((hex) => {
        if (pieces.length <= 0) {
            return newBoard
        }

        newBoard = putPieceOnBoard(newBoard, hex, pieces.pop())
    })

    return newBoard
}

export function convertBoardToGraph(board) {
    return board.map((tile) => {
        return tile.neighbors.map((neighbor) =>
            board.findIndex((t) => areHexagonsEqual(t.hex, neighbor))
        )
    })
}
