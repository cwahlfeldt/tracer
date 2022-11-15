import { findTileWithProp, putPieceOnBoard, generateBoard } from './board'
import { convertHexToPixel, hex, shuffleGrid } from '../lib/hex'
import { Hex, Character, Board } from '../types'
import { randomInt } from '../lib/random'
import moveCharacter from './character'
import memoize from 'fast-memoize'

export const selectPlayer = memoize((board: Board) => {
    const { hex, props } = findTileWithProp(board, 'player')
    const { x, y } = convertHexToPixel(hex)
    const health = props['player'].health

    return { hex, health, x, y }
})

export const selectEnemy = memoize((board: Board) => {
    const { hex, props } = findTileWithProp(board, 'enemy')
    const { x, y } = convertHexToPixel(hex)
    const health = props['enemy'].health

    return { hex, health, x, y }
})

const player: Character = { type: 'player', health: 3 }
const enemy: Character = { type: 'enemy', health: 1 }

export default function Game(board: Board = generateBoard(1)) {
    return {
        createBoard: (size: number = 1, shuffle: boolean = false) =>
            Game(generateBoard(size, shuffle)),

        spawnPlayer: (hex: Hex) => Game(putPieceOnBoard(board, player, hex)),

        spawnEnemy: (hex?: Hex) =>
            Game(
                putPieceOnBoard(
                    board,
                    enemy,
                    hex || board[randomInt(0, board.length - 1)].hex
                )
            ),

        moveCharacter: (hex: Hex, characterType: string) =>
            Game(
                moveCharacter({
                    board: board,
                    hex,
                    characterType,
                })
            ),

        result: (): Board => board,
    }
}
