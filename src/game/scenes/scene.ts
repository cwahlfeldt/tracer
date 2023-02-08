import { convertPixelToHex, point } from '../../lib/hex.js'
import { click } from '../../lib/events.js'
import render from '../../lib/canvasRenderer.js'
import playerPiece from '../pieces/playerPiece.js'
import boardPiece from '../pieces/boardPiece.js'
import { selectEnemy, selectPlayer, _selectPlayer, _selectEnemy } from '../game'
import enemyPiece from '../pieces/enemyPiece'
import store, { actions } from '../store'
import { Board } from '../../types'
//
// const Game = GameBuilder([]).createBoard(6, true)
const enemyTypes = ['enemyOne', 'enemyTwo', 'enemyThree', 'enemyFour']
store.dispatch(actions.startGame)
//
// enemyTypes.forEach((type) => Game.spawnEnemy(type))
// Game.spawnPlayer()

const staticBoard = store.getState()
console.log(staticBoard)

render((board: Board) => {
    const player = _selectPlayer(board)

    boardPiece(board)

    playerPiece({ x: player.x, y: player.y })

    enemyTypes.forEach((type) => {
        const { x, y } = _selectEnemy(board, type)
        enemyPiece({ x, y })
    })
})

click((action: { x: number; y: number }) => {
    const board = store.getState()
    const hex = convertPixelToHex(point(action.x, action.y))
    // const player = _selectPlayer(board)

    store.dispatch(actions.moveCharacter, { hex, type: 'player' })

    enemyTypes.forEach((type, i) => {
        store.dispatch(actions.moveCharacter, {
            hex,
            type,
        })
    })
})
