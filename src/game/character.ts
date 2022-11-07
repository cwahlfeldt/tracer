import { Board, Hex } from '../types'
import { createPath, findTileWithProp, putPieceOnBoard } from './board'

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
    const character = tile.props[characterType]
    const path = createPath(board, tile.hex, hex)

    return putPieceOnBoard(board, character, path[0])
}
