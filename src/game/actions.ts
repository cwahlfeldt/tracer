import { generateBoard, putPieceOnBoard } from './gameBoard'
import { convertHexToPixel, hex } from '../lib/hex'
import { Hex, Character, Tile } from '../types'
import { createSelector } from 'reselect'

export function startGame(
    boardSize: number = 1,
    playerStart: Hex = hex(0, 0, 0)
) {
    const board: Tile[] = generateBoard(boardSize)
    const player: Character = { type: 'player', health: 3 }

    return putPieceOnBoard(board, playerStart, player)
}

function findPlayerTile(board): Tile {
    return board.find((tile) => 'player' in tile.props)
}

export function movePlayer(board, hex) {
    const player: Character = findPlayerTile(board).props['player']
    return putPieceOnBoard(board, hex, player)
}

export const selectPlayer = createSelector(
    (board) => board,
    (board) => {
        const tile = findPlayerTile(board)
        const {x, y} = convertHexToPixel(tile.hex)
        return {
            hex: tile.hex,
            health: tile.props['player'].health,
            x,
            y
        }
    }
)
