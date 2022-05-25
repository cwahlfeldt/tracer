import { getAllNeighbors, hex } from "../lib/hex.js";

export const generateTile = (h = hex(0, 0, 0), props = {}) => ({
    hex: h,
    neighbors: getAllNeighbors(h),
    props,
})

export const generatePlayer = () => ({ type: 'player', health: 3 })

export const generateEnemy = () => ({ type: 'enemy', health: 1 })
