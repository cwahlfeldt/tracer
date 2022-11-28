import { findTileWithProp, putPieceOnBoard, generateBoard } from './board'
import { convertHexToPixel } from '../lib/hex'
import { Hex, Character, Board } from '../types'
import { randomInt } from '../lib/random'
import moveCharacter from './character'
import memoize from 'fast-memoize'

export const selectPlayer = (board: Board) => {
    const { hex, props } = findTileWithProp(board, 'player')
    const { x, y } = convertHexToPixel(hex)
    const health = props['player'].health

    return { hex, health, x, y }
}

export const selectEnemy = (board: Board, type: string = 'enemyOne') => {
    const { hex, props } = findTileWithProp(board, type)
    const { x, y } = convertHexToPixel(hex)
    const health = props[type].health

    return { hex, health, x, y }
}

const player: Character = { type: 'player', health: 3 }
const enemy = (type: string = 'enemyOne'): Character => ({ type, health: 1 })

export function GameBuilder(board: Board = generateBoard(1)) {
    return {
        createBoard: (size: number = 1, shuffle: boolean = false) =>
            GameBuilder(generateBoard(size, shuffle)),

        spawnPlayer: (hex: Hex) =>
            GameBuilder(putPieceOnBoard(board, player, hex)),

        spawnEnemy: (type: string = 'enemyOne', hex?: Hex) =>
            GameBuilder(
                putPieceOnBoard(
                    board,
                    enemy(type),
                    hex || board[randomInt(0, board.length - 1)].hex
                )
            ),

        moveCharacter: (hex: Hex, characterType: string) =>
            GameBuilder(
                moveCharacter({
                    board: board,
                    hex,
                    characterType,
                })
            ),

        build: (): Board => board,
    }
}
