import test from "ava"
import { getAllNeighbors, hex } from "../../lib/hex.js"
import { generateTile, generatePlayer, generateEnemy } from '../../game/pieces.js'

test('generate a tile with hexagon', t => {
    t.deepEqual(
        generateTile(hex(0, 0, 0), {}),
        {
            hex: { q: 0, r: 0, s: 0 },
            neighbors: getAllNeighbors(hex(0, 0, 0)),
            props: {},
        }
    )
})

test('generate a player piece', t => {
    t.deepEqual(
        generatePlayer(),
        { type: 'player', health: 3 }
    )
})

test('generate enemy piece', t => {
    t.deepEqual(
        generateEnemy(),
        { type: 'enemy', health: 1 }
    )
})


