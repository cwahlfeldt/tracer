import { getAllNeighbors, hexShapedHashGrid } from '../lib/hex.js'
import { findPlayer } from '../state/selectors.js'

export function dhx(h) {
    return JSON.stringify(h)
}

export function hx(h) {
    return JSON.parse(h)
}

export function mapHexBoard(board, callback) {
    const map = Object.entries(board).map(([h, data]) => {
        const result = callback(hx(h), data)
        return [h, result]
    })

    return Object.fromEntries(map)
}

export function filterHexBoard(board, callback) {
    const filtered = Object.entries(board).filter(([h, data]) => {
        return callback(hx(h), data)
    })

    return Object.fromEntries(filtered)
}

export function loopHexBoard(board, callback) {
    const b = board
    for (const h in b) {
        callback(hx(h), b[h])
    }
}

export function placePiece(board, piece, hex) {
    let newBoard = board
    if (piece.type === 'player') {
        console.log(newBoard)
        const player = findPlayer(newBoard)
        if (player) {
            newBoard[dhx(player.hex)].props = {}
        }
    }
    newBoard[dhx(hex)].props[piece.type] = piece
    return newBoard
}

const BoardBuilder = (board = hexShapedHashGrid(1)) => ({
    placePiece: (h, piece) =>
        BoardBuilder(() => {
            board[dhx(h)].props[piece.type] = piece
            return board
        }),

    placePieces: (pieces, hexes) =>
        BoardBuilder((board) => {
            hexes.forEach((h, i) => {
                if (pieces <= 0) {
                    return board
                }

                board[dhx(h)].props[pieces[i].type] = pieces.pop()
            })

            return board
        }),

    map: (callback) => BoardBuilder(mapHexBoard(board, callback)),

    filter: (callback) => BoardBuilder(filterHexBoard(board, callback)),

    build: () => board,
})

export default BoardBuilder
