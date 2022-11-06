import {
    areHexagonsEqual,
    getAllNeighbors,
    hexShapedGrid,
    shuffleGrid,
} from '../lib/hex.js'
import { Board, Hex, Props, Tile } from '../types'
import { findPath } from '../lib/pathFinding'

export function generateBoard(size: number, doShuffle: boolean = false) {
    const grid = doShuffle
        ? shuffleGrid(hexShapedGrid(size))
        : hexShapedGrid(size)

    return grid.map((h: Hex) => ({
        hex: h,
        props: {},
    }))
}

export function putPieceOnBoard(board: Board, piece: Props, hex: Hex) {
    if (!board.some((t) => areHexagonsEqual(t.hex, hex))) {
        return board
    }

    return board.map((tile) => {
        if (piece.type === 'player' && 'player' in tile.props) {
            delete tile.props['player']
        }

        if (areHexagonsEqual(tile.hex, hex)) {
            tile.props[`${piece.type}`] = piece
        }

        return tile
    })
}

export function putPiecesOnBoard(pieces: any, hexes: Hex[], board: Board) {
    let newBoard = board

    hexes.forEach((hex) => {
        if (pieces.length <= 0) {
            return newBoard
        }

        newBoard = putPieceOnBoard(newBoard, pieces.pop(), hex)
    })

    return newBoard
}

export function findIndexOfTile(board: Board, hex: Hex) {
    return board.findIndex((t) => areHexagonsEqual(t.hex, hex))
}

export function createPath(board: Board, startHex: Hex, endHex: Hex) {
    const startIndex = findIndexOfTile(board, startHex)
    const endIndex = findIndexOfTile(board, endHex)
    const graph = convertBoardToGraph(board)
    const path = findPath(graph, startIndex, endIndex)

    return path.map((tileIndex) => board[tileIndex].hex)
}

export function convertBoardToGraph(board: Board) {
    return board.map((tile) => {
        return getAllNeighbors(tile.hex)
            .map((neighbor) =>
                board.findIndex((t) => areHexagonsEqual(t.hex, neighbor))
            )
            .filter((index) => index !== -1)
    })
}

export function findTileWithProp(
    board: Board,
    propType: string = 'player'
): Tile {
    return board.find((tile) => propType in tile.props)!
}
