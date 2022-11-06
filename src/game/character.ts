import { Board, Hex } from '../types'
import { createPath, findTileWithProp, putPieceOnBoard } from './board'

interface character {
    board: Board
    hex: Hex
    characterType: string
}

export default function moveCharacter({
    board,
    hex,
    characterType,
}: character) {
    const tile = findTileWithProp(board, characterType)
    const character = tile.props[characterType]
    const path = createPath(board, tile.hex, hex)

    return putPieceOnBoard(board, character, path[0])
}
