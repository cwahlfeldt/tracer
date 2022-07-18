import store, { movePlayer, startGame } from '../state/store.js'
import { convertHexToPixel, convertPixelToHex, hex, point } from '../lib/hex.js'
import { getMousePos } from '../lib/canvasUtilities.js'
import { lerp } from '../lib/utilities.js'
import { click } from '../lib/events.js'
import { selectPlayer } from '../state/selectors.js'
import render from './renderer.js'
import playerPiece from '../pieces/playerPiece.js'
import boardPiece from '../pieces/boardPiece.js'

const playerStartHex = hex(0, 0, 0)
let { x, y } = convertHexToPixel(playerStartHex)

store.dispatch(
    startGame({
        boardSize: 4,
        playerLocation: playerStartHex,
    })
)

render((state) => {
    const player = selectPlayer(state)
    const playerX = player.location.x
    const playerY = player.location.y

    x = lerp(x, playerX, 0.1)
    y = lerp(y, playerY, 0.1)

    boardPiece(state.board)
    playerPiece(point(x, y))
})

click((event) => {
    const { x, y } = getMousePos(event)
    const hex = convertPixelToHex(point(x, y))
    store.dispatch(movePlayer(hex))
})
