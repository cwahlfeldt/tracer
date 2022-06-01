import {createSelector} from "@reduxjs/toolkit";
import {convertHexToPixel} from "../lib/hex.js";
import {findPlayer} from "../game/board.js";

export const selectPlayer = createSelector(
    state => state.board,
    board => {
        const tile = findPlayer(board)
        return {
            ...tile.props.player,
            location: convertHexToPixel(tile.hex)
        }
    }
)
