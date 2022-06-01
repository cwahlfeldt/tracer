import { getAllNeighbors, hex } from "../lib/hex.js";

export const generateTile = (h = hex(0, 0, 0), props = {}) => ({
    hex: h,
    neighbors: getAllNeighbors(h),
    props,
})

export const generatePlayer = () => ({ type: 'player', health: 3 })

export const generateEnemy = () => ({ type: 'enemy', health: 1 })

export const placePiece = (p, h, b) => {
    let board = b
    board[JSON.stringify(h)] = {
        ...board[JSON.stringify(h)],
        props: {
            ...board[JSON.stringify(h)].props,
            [p.type]: p,
        }
    }
    return board
}