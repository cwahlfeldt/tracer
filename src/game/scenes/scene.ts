import { convertPixelToHex, hex, point } from '../../lib/hex.js'
import { click } from '../../lib/events.js'
import render from '../../lib/canvasRenderer.js'
import playerPiece from '../pieces/playerPiece.js'
import boardPiece from '../pieces/boardPiece.js'
import store, { actions } from '../store'
import Game, {
    _selectEnemy,
    _selectPlayer,
    selectEnemy,
    selectPlayer,
} from '../game'
import { lerp } from '../../lib/utilities'
import enemyPiece from '../pieces/enemyPiece'
import { Tile } from '../../types'

// store.dispatch(actions.startGame, {
//     boardSize: 4,
//     playerStart: hex(0, 0, 0),
// })

const game = Game([])
    .createBoard(4)
    .spawnPlayer(hex(0, 0, 0))
    .spawnEnemy(hex(0, 1, -1))

const staticBoard = game.result()

let x = 0
let y = 0
let enemyX = 0
let enemyY = 0

const gameLogic = () => {
    const board = game.result()
    const player = _selectPlayer(board)
    const enemy = _selectEnemy(board)

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
    game.moveCharacter(hex, 'player').moveCharacter(hex, 'enemy')
    render(gameLogic, (anim: any) => cancelAnimationFrame(anim))
    // store.dispatch(actions.moveCharacter, { hex, type: 'player' })
    // store.dispatch(actions.moveCharacter, { hex, type: 'enemy' })
})
