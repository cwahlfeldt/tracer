import { findTileWithProp, putPieceOnBoard, generateBoard } from './board'
import { convertHexToPixel, hex, shuffleGrid } from '../lib/hex'
import { Hex, Character, Board } from '../types'
import { createSelector } from 'reselect'
import { randomInt } from '../lib/random'
import moveCharacter from './character'
import memoize from 'fast-memoize'

export function startGame(
    boardSize: number = 1,
    playerStart: Hex = hex(0, 0, 0),
    enemyStart?: Hex,
    doShuffle: boolean = false
) {
    const board: Board = generateBoard(boardSize, doShuffle)
    const player: Character = { type: 'player', health: 3 }
    const enemy: Character = { type: 'enemy', health: 1 }

    const enemyBoard = putPieceOnBoard(
        board,
        enemy,
        enemyStart || board[randomInt(0, board.length - 1)].hex
    )
    return putPieceOnBoard(enemyBoard, player, playerStart)
}

export const selectPlayer = createSelector(
    (board: Board) => board,
    (board: Board) => {
        const { hex, props } = findTileWithProp(board, 'player')
        const { x, y } = convertHexToPixel(hex)
        const health = props['player'].health

        return { hex, health, x, y }
    }
)

export const _selectPlayer = memoize((board: Board) => {
    const { hex, props } = findTileWithProp(board, 'player')
    const { x, y } = convertHexToPixel(hex)
    const health = props['player'].health

    return { hex, health, x, y }
})

export const _selectEnemy = memoize((board: Board) => {
    const { hex, props } = findTileWithProp(board, 'enemy')
    const { x, y } = convertHexToPixel(hex)
    const health = props['enemy'].health

    return { hex, health, x, y }
})

export const selectEnemy = createSelector(
    (board: Board) => board,
    (board: Board) => {
        const { hex, props } = findTileWithProp(board, 'enemy')
        const { x, y } = convertHexToPixel(hex)
        const health = props['enemy'].health

        return { hex, health, x, y }
    }
)

const player: Character = { type: 'player', health: 3 }
const enemy: Character = { type: 'enemy', health: 1 }

export default function Game(board: Board = generateBoard(1)) {
    return {
        startGame: (
            boardSize: number = 1,
            playerStart: Hex = hex(0, 0, 0),
            enemyStart?: Hex,
            doShuffle: boolean = false
        ) => Game(startGame(boardSize, playerStart, enemyStart, doShuffle)),

        createBoard: (size: number = 1, shuffle: boolean = false) =>
            Game(generateBoard(size, shuffle)),

        spawnPlayer: (hex: Hex) => Game(putPieceOnBoard(board, player, hex)),

        spawnEnemy: (hex: Hex, type?: string) =>
            Game(putPieceOnBoard(board, enemy, hex)),

        moveCharacter: (hex: Hex, characterType: string) =>
            Game(
                moveCharacter({
                    board: board || generateBoard(1),
                    hex,
                    characterType,
                })
            ),

        result: (): Board => board,
    }
}
