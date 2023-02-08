import { Board, Hex, Tile } from '../types'
import { createPath, findTileWithProp, putPieceOnBoard } from './board'
import { areHexagonsEqual, getAllNeighbors } from '../lib/hex'
import clone from '../lib/clone'

export interface Character {
    board: Board
    hex: Hex
    characterType: string
}

export default function moveCharacter({
    board,
    hex,
    characterType,
}: Character) {
    const tile = findTileWithProp(board, characterType)
    const character = { [characterType]: { ...tile.props[characterType] } }
    const path = createPath(board, tile.hex, hex)
    let currentTurnsBoard = putPieceOnBoard(board, character, path[0])

    if (characterType === 'player') {
        const nextBoard = clone(currentTurnsBoard)
        const playersNeighbors = getAllNeighbors(path[0]).map((hex) => {
            return JSON.stringify(hex)
        })

        const playersNeighborTiles = nextBoard.filter((t: Tile) => {
            const strHex = JSON.stringify(t.hex)
            return (
                playersNeighbors.includes(strHex) &&
                t.props['player'] === undefined
            )
        })

        const enemyTile = playersNeighborTiles.find((t: Tile) =>
            Object.keys(t.props).find(
                (key: any) => t.props[key].type === 'enemy'
            )
        )

        if (enemyTile !== undefined) {
            currentTurnsBoard = nextBoard.map((tile: Tile) => {
                if (areHexagonsEqual(tile.hex, enemyTile.hex)) tile.props = {}
                return tile
            })
        }
    }

    return currentTurnsBoard
}
