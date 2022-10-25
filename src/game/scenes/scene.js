import { convertPixelToHex, hex, point } from '../../lib/hex.js'
import { getMousePos } from '../../lib/canvasUtilities.js'
import { click } from '../../lib/events.js'
import render from '../../lib/canvasRenderer.js'
import playerPiece from '../pieces/playerPiece.js'
import boardPiece from '../pieces/boardPiece.js'
import store, { actions } from '../store.ts'
import { selectPlayer } from '../actions.ts'

store.dispatch(actions.startGame, {boardSize: 3, playerStart: hex(0,0,0)})

render((board) => {
    const { x, y } = selectPlayer(board)
    boardPiece(board)
    playerPiece({ x, y })
})

click((event) => {
    const { x, y } = getMousePos(event)
    const hex = convertPixelToHex(point(x, y))

    store.dispatch(actions.movePlayer, hex)
})
