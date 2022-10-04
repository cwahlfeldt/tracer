import store, { movePlayer, startGame } from '../state/store.js'
import { convertHexToPixel, convertPixelToHex, hex, hexShapedHashGrid, point } from '../lib/hex.js'
import { getMousePos } from '../lib/canvasUtilities.js'
import { lerp } from '../lib/utilities.js'
import { click } from '../lib/events.js'
import { findPlayer, selectEnemies, selectPlayer } from '../state/selectors.js'
import render from './renderer.js'
import playerPiece from '../pieces/playerPiece.js'
import boardPiece from '../pieces/boardPiece.js'
import enemyPiece from '../pieces/enemyPiece.js'
import { generatePlayer } from '../game/pieces.js'
import { placePiece } from '../game/game.js'

const playerStartHex = hex(0, 0, 0)
let { x, y } = convertHexToPixel(playerStartHex)

store.dispatch(
    startGame({
        boardSize: 4,
        playerLocation: playerStartHex,
    })
)

// const grid = hexShapedHashGrid(2)
// const player = generatePlayer()
// const {board = placePiece(grid, player, hex(0,0,0))

const {board} = store.getState()

render((state) => {
    const player = selectPlayer(state)
    // const enemies = selectEnemies(state)
    const playerX = player.location.x
    const playerY = player.location.y

    x = lerp(x, playerX, 0.1)
    y = lerp(y, playerY, 0.1)

    boardPiece(board)
    // enemies.forEach((enemy) => {
    //     enemyPiece(point(enemy.location.x, enemy.location.y))
    // })
    playerPiece(point(x, y))
})

click((event) => {
    const { x, y } = getMousePos(event)
    const hex = convertPixelToHex(point(x, y))
    store.dispatch(movePlayer(hex))
})
