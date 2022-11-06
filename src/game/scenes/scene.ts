import { convertPixelToHex, hex, point } from '../../lib/hex.js'
import { click } from '../../lib/events.js'
import render from '../../lib/canvasRenderer.js'
import playerPiece from '../pieces/playerPiece.js'
import boardPiece from '../pieces/boardPiece.js'
import store, { actions } from '../store'
import { selectEnemy, selectPlayer } from '../game'
import { lerp } from '../../lib/utilities'
import enemyPiece from '../pieces/enemyPiece'
import { Tile } from '../../types'

store.dispatch(actions.startGame, {
    boardSize: 4,
    playerStart: hex(0, 0, 0),
})

// let x = 0
// let y = 0
// let enemyX = 0
// let enemyY = 0

render((board: Tile[]) => {
    const player = selectPlayer(board)
    const enemy = selectEnemy(board)

    // x = lerp(x, player.x, 0.1)
    // y = lerp(y, player.y, 0.1)
    playerPiece({ x: player.x, y: player.y })

    // enemyX = lerp(enemyX, enemy.x, 0.1)
    // enemyY = lerp(enemyY, enemy.y, 0.1)
    enemyPiece({ x: enemy.x, y: enemy.y })
    boardPiece(board)
})

click((action: { x: number; y: number }) => {
    const hex = convertPixelToHex(point(action.x, action.y))
    store.dispatch(actions.moveCharacter, { hex, type: 'player' })
    store.dispatch(actions.moveCharacter, { hex, type: 'enemy' })
})
