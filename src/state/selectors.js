import { createSelector } from '@reduxjs/toolkit'
import BoardBuilder, { filterHexBoard, hx } from '../game/game.js'
import { convertHexToPixel } from '../lib/hex.js'
import memoize from 'fast-memoize'

export const findPlayer = (board) => {
    const filteredBoardTiles = filterHexBoard(board, (hex, { props }) => {
        return 'player' in props
    })
    const playerHex = Object.keys(filteredBoardTiles)[0]
    const playerTile = board[playerHex]
    if (typeof playerTile === 'undefined') {
        return false
    }
    return {
        ...playerTile.props.player,
        hex: hx(playerHex),
        location: convertHexToPixel(hx(playerHex)),
    }
}

// export const findPlayer = memoize(fPlayer)
//
// export const findEnemies = (board) => {
//     return board.filter((tile) => 'enemy' in tile.props)
// }

const selectBoard = state => state.board
export const selectPlayer = createSelector(
    selectBoard,
    (board) => findPlayer(board)
)
//
// export const selectEnemies = createSelector(
//     (state) => state.board,
//     (board) => {
//         const tiles = findEnemies(board)
//         return tiles.map((tile) => {
//             return {
//                 ...tile.props.enemy,
//                 location: convertHexToPixel(tile.hex),
//             }
//         })
//     }
// )
