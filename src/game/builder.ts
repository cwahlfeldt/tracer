import { Board, Hex, Piece } from '../types'
import { generateBoard, putPieceOnBoard } from './board'
import { randomInt } from '../lib/random'
import moveCharacter from './character'

const player: Piece = { player: { type: 'player', health: 3 } }
const enemy = (key: string = 'enemyOne'): Piece => ({
    [key]: { type: 'enemy', health: 1 },
})

export function GameBuilder(board: Board) {
    return {
        createBoard: (size: number = 1, shuffle: boolean = false) =>
            GameBuilder(generateBoard(size, shuffle)),

        spawnPlayer: (hex?: Hex) =>
            GameBuilder(
                putPieceOnBoard(
                    board,
                    player,
                    hex || board[randomInt(0, board.length - 1)].hex
                )
            ),

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
                    board,
                    hex,
                    characterType,
                })
            ),

        build: (): Board => board,
    }
}
