import {createSelector} from "@reduxjs/toolkit";
import {convertHexToPixel} from "../lib/hex.js";
import {findPlayerTile} from "../game/board.js";

export const selectPlayer = createSelector(
    state => findPlayerTile(state.board),
    tile => ({
        ...tile.props.player,
        location: convertHexToPixel(tile.hex)
    })
)
