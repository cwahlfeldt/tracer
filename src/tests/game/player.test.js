import test from "ava";
import {movePlayer} from "../../game/player.js";
import {generateBoard} from "../../game/board.js";
import {generatePlayer, generateTile} from "../../game/pieces.js";
import {hex} from "../../lib/hex.js";

test('move player to nearest clicked tile', t => {
    t.deepEqual(
        movePlayer(player, board, hex(-1, 1, 0)),
        [
            generateTile(hex(-1, 0, 1)),
            generateTile(hex(-1, 1, 0), {player: generatePlayer()}),
            generateTile(hex(0, -1, 1)),
            generateTile(hex(0, 0, 0)),
            generateTile(hex(0, 1, -1)),
            generateTile(hex(1, -1, 0)),
            generateTile(hex(1, 0, -1)),
        ]
    )
})