import {createSelector} from "@reduxjs/toolkit";
import {convertHexToPixel} from "../lib/hex.js";

export const selectPlayer = createSelector(
    state => state.board,
    board => {
        const tile = board.filter(tile => 'player' in tile.props)[0]
        return {
            ...tile.props.player,
            location: convertHexToPixel(tile.hex)
        }
    }
)
