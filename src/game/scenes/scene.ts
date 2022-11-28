import { convertPixelToHex, hex, point } from '../../lib/hex.js'
import { click } from '../../lib/events.js'
import render from '../../lib/canvasRenderer.js'
import playerPiece from '../pieces/playerPiece.js'
import boardPiece from '../pieces/boardPiece.js'
import { GameBuilder, selectEnemy, selectPlayer } from '../game'
import enemyPiece from '../pieces/enemyPiece'

const Game = GameBuilder([]).createBoard(6).spawnPlayer(hex(0, 0, 0))
const enemyTypes = ['enemyOne', 'enemyTwo', 'enemyThree', 'enemyFour']

enemyTypes.forEach((type) => Game.spawnEnemy(type))

const staticBoard = Game.build()

const gameLogic = () => {
    const board = Game.build()
    const player = selectPlayer(board)

    boardPiece(staticBoard)

    enemyTypes.forEach((type) => {
        const { x, y } = selectEnemy(board, type)
        enemyPiece({ x, y })
    })

    playerPiece({ x: player.x, y: player.y })
}

render(gameLogic)

click((action: { x: number; y: number }) => {
    const hex = convertPixelToHex(point(action.x, action.y))
    Game.moveCharacter(hex, 'player')
    enemyTypes.forEach((type) => Game.moveCharacter(hex, type))
    render(gameLogic, (a: any) => cancelAnimationFrame(a))
})
