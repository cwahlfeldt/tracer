import { createSelector } from '@reduxjs/toolkit'
import { convertHexToPixel } from '../lib/hex.js'

export const findPlayer = (board) => {
    return board.filter((tile) => 'player' in tile.props)[0]
}

export const findEnemies = (board) => {
    return board.filter((tile) => 'enemy' in tile.props)
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

export const selectEnemies = createSelector(
    (state) => state.board,
    (board) => {
        const tiles = findEnemies(board)
        return tiles.map(tile => {
            return {
                ...tile.props.enemy,
                location: convertHexToPixel(tile.hex),
            }
        })
    }
)
