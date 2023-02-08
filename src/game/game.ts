import { findTileWithProp } from './board'
import { convertHexToPixel } from '../lib/hex'
import { Board, Hex } from '../types'
import { createSelector } from '@reduxjs/toolkit'
import { GameBuilder } from './builder'

export const selectPlayer = (board: Board) => {
    const { hex, props } = findTileWithProp(board, 'player')
    const { x, y } = convertHexToPixel(hex)
    const health = props['player'].health

    return { hex, health, x, y }
}

export const _selectPlayer = createSelector(
    (board: Board) => board,
    (board: Board) => {
        const { hex, props } = findTileWithProp(board, 'player')
        const { x, y } = convertHexToPixel(hex)
        const health = props['player'].health

        return { hex, health, x, y }
    }
)

export const selectEnemy = (board: Board, type: string = 'enemyOne') => {
    const { hex, props } = findTileWithProp(board, type)
    const { x, y } = convertHexToPixel(hex)
    const health = props[type].health

    return { hex, health, x, y }
}
export const _selectEnemy = createSelector(
    (board: Board, type: string) => ({ board, type }),
    ({ board, type }) => {
        const { hex, props } = findTileWithProp(board, type)
        const { x, y } = convertHexToPixel(hex)
        const health = props[type].health

        return { hex, health, x, y }
    }
)

export const startGame = () => {
    const Game = GameBuilder([]).createBoard(6, true)
    const enemyTypes = ['enemyOne', 'enemyTwo', 'enemyThree', 'enemyFour']

    enemyTypes.forEach((type) => Game.spawnEnemy(type))
    Game.spawnPlayer()

    return Game.build()
}

export const moveCharacter = (board: Board, hex: Hex, type: string) => {
    return GameBuilder(board).moveCharacter(hex, 'player').build()
}
