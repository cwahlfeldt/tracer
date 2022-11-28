import {
    areHexagonsEqual,
    getAllNeighbors,
    hexShapedGrid,
    shuffleGrid,
} from '../lib/hex.js'
import { Board, Hex, Props, Tile } from '../types'
import { findPath } from '../lib/pathFinding'
import { randomInt } from '../lib/random.js'

export function generateBoard(size: number, doShuffle: boolean = false): Board {
    const grid = doShuffle
        ? shuffleGrid(hexShapedGrid(size))
        : hexShapedGrid(size)

    return grid.map((h: Hex) => ({
        hex: h,
        props: {},
    }))
}

export function putPieceOnBoard(board: Board, piece: Props, hex?: Hex): Board {
    if (!board.some((t) => areHexagonsEqual(t.hex, hex))) {
        return board
    }

    if (!hex) {
        board[randomInt(0, board.length - 1)].props[piece.type] = piece
    }

    return board.map((tile) => {
        delete tile.props[piece.type]

        if (areHexagonsEqual(tile.hex, hex)) {
            tile.props[piece.type] = piece
        }

        return tile
    })
}

export function putPiecesOnBoard(pieces: any, hexes: Hex[], board: Board) {
    let newBoard = board

    hexes.forEach((hex) => {
        if (pieces.length <= 0) return newBoard

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

    if (startIndex === -1 || endIndex === -1) return [startHex]

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
