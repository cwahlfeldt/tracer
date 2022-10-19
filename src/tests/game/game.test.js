import test from 'ava'
import BoardBuilder from '../../game/board.js'
import {hex} from '../../lib/hex.js'
import { getAllNeighbors } from '../../lib/hex.js'
import { generatePlayer } from '../../game/pieces.js'

const simplestBoard = {
    '{"q":0,"r":0,"s":0}' : {neighbors: getAllNeighbors(hex(0,0,0)),  props: {}},
    '{"q":0,"r":-1,"s":1}': {neighbors: getAllNeighbors(hex(0,-1,1)), props: {}},
    '{"q":0,"r":1,"s":-1}': {neighbors: getAllNeighbors(hex(0,1,-1)), props: {}},
    '{"q":1,"r":-1,"s":0}': {neighbors: getAllNeighbors(hex(1,-1,0)), props: {}},
    '{"q":-1,"r":1,"s":0}': {neighbors: getAllNeighbors(hex(-1,1,0)), props: {}},
    '{"q":1,"r":0,"s":-1}': {neighbors: getAllNeighbors(hex(1,0,-1)), props: {}},
    '{"q":-1,"r":0,"s":1}': {neighbors: getAllNeighbors(hex(-1,0,1)), props: {}},
}

const boardWithPlayer = {
    '{"q":0,"r":0,"s":0}' : {neighbors: getAllNeighbors(hex(0,0,0)),  props: {}},
    '{"q":0,"r":-1,"s":1}': {neighbors: getAllNeighbors(hex(0,-1,1)), props: {}},
    '{"q":0,"r":1,"s":-1}': {neighbors: getAllNeighbors(hex(0,1,-1)), props: {}},
    '{"q":1,"r":-1,"s":0}': {neighbors: getAllNeighbors(hex(1,-1,0)), props: {}},
    '{"q":-1,"r":1,"s":0}': {neighbors: getAllNeighbors(hex(-1,1,0)), props: {}},
    '{"q":1,"r":0,"s":-1}': {neighbors: getAllNeighbors(hex(1,0,-1)), props: {player: generatePlayer()}},
    '{"q":-1,"r":0,"s":1}': {neighbors: getAllNeighbors(hex(-1,0,1)), props: {}},
}

test('can create board', t => {
    const board = BoardBuilder().build()
    t.deepEqual(board, simplestBoard)
})

test('can place player piece', t => {
    const player = generatePlayer()
    const board = BoardBuilder()
        .placePiece(hex(1,0,-1), player)
        .build()

    console.log(board)

    t.deepEqual(board, boardWithPlayer)
})
