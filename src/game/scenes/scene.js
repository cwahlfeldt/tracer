import {
    convertPixelToHex,
    point,
} from '../../lib/hex.js'
import { getMousePos } from '../../lib/canvasUtilities.js'
import { click } from '../../lib/events.js'
import render from '../../lib/canvasRenderer.js'
import playerPiece from '../pieces/playerPiece.js'
import boardPiece from '../pieces/boardPiece.js'
import Game from '../game.ts'

const game = new Game()
const board = game.getBoard()

render(() => {
    let {x, y} = game.selectPlayer()
    boardPiece(board)
    playerPiece({x, y})
})

click((event) => {
    const { x, y } = getMousePos(event)
    const hex = convertPixelToHex(point(x, y))
    game.movePlayer(hex)
})
