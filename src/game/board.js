import {areHexagonsEqual, hexShapedGrid} from "../lib/hex.js";
import {generateTile} from "./pieces.js";

export const generateBoard = (size) => {
    const grid = hexShapedGrid(size)
    return grid.map(h => generateTile(h))
}

export const putPlayerOnBoard = (player, board, hex) => {
    return board.map(tile => {
        if ('player' in tile.props) {
            delete tile.props.player
        }

        if (areHexagonsEqual(tile.hex, hex)) {
            tile.props.player = player
        }
        return tile
    })
}