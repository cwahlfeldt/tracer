import { convertPixelToHex, hex, point } from '../../lib/hex.js'
import { click } from '../../lib/events.js'
import render from '../../lib/canvasRenderer.js'
import playerPiece from '../pieces/playerPiece.js'
import boardPiece from '../pieces/boardPiece.js'
import Game, { selectEnemy, selectPlayer } from '../game'
import { lerp } from '../../lib/utilities'
import enemyPiece from '../pieces/enemyPiece'

const game = Game([]).createBoard(4).spawnPlayer(hex(0, 0, 0)).spawnEnemy()

const staticBoard = game.result()

let x = 0
let y = 0
let enemyX = 0
let enemyY = 0

const gameLogic = () => {
    const board = game.result()
    const player = selectPlayer(board)
    const enemy = selectEnemy(board)

    x = lerp(x, player.x, 0.1)
    y = lerp(y, player.y, 0.1)
    playerPiece({ x: x, y: y })

    enemyX = lerp(enemyX, enemy.x, 0.1)
    enemyY = lerp(enemyY, enemy.y, 0.1)
    enemyPiece({ x: enemyX, y: enemyY })
    boardPiece(staticBoard)
}
render(gameLogic)

click((action: { x: number; y: number }) => {
    const hex = convertPixelToHex(point(action.x, action.y))
    game.moveCharacter(hex, 'player')
    setTimeout(() => game.moveCharacter(hex, 'enemy'), 300)
    render(gameLogic, (anim: any) => cancelAnimationFrame(anim))
})
