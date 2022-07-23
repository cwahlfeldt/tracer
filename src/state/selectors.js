import { createSelector } from '@reduxjs/toolkit'
import { convertHexToPixel } from '../lib/hex.js'

export const findPlayer = (board) => {
    return board.filter((tile) => 'player' in tile.props)[0]
}

export const selectPlayer = createSelector(
    (state) => state.board,
    (board) => {
        const tile = findPlayer(board)
        return {
            ...tile.props.player,
            location: convertHexToPixel(tile.hex),
        }
    }
)
