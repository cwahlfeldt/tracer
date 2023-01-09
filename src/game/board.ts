import {
    areHexagonsEqual,
    getAllNeighbors,
    hex,
    hexShapedGrid,
    shuffleGrid,
} from '../lib/hex.js'
import { Board, Hex, Piece, Props, Tile } from '../types'
import { findPath } from '../lib/pathFinding'
import { randomInt } from '../lib/random.js'
import clone from '../lib/clone'

export function generateBoard(size: number, doShuffle: boolean = false): Board {
    const grid = doShuffle
        ? shuffleGrid(hexShapedGrid(size))
        : hexShapedGrid(size)

    return grid.map((h: Hex) => ({
        hex: h,
        props: {},
    }))
}

export function getPieceKey(piece: Piece) {
    return Object.keys(piece)[0]
}

export function putPieceOnBoard(board: Board, piece: Piece, hex?: Hex): Board {
    if (!board.some((t) => areHexagonsEqual(t.hex, hex))) {
        return board
    }

    const pieceKey = getPieceKey(piece)
    const props = board.find((t) => areHexagonsEqual(t.hex, hex))?.props

    if (
        props &&
        Object.keys(props).find(
            (key) => props[key].type === piece[pieceKey].type
        )
    ) {
        return board
    }

    if (!hex) {
        board[randomInt(0, board.length - 1)].props[pieceKey] = piece[pieceKey]
    }

    const newBoard = board.map((tile) => {
        delete tile.props[pieceKey]

        if (areHexagonsEqual(tile.hex, hex)) {
            tile.props[pieceKey] = piece[pieceKey]
        }

        return tile
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
