import { convertHexToPixel, hex, hexShapedHashGrid } from '../lib/hex.js'
import { dhx, placePiece } from './board.js'
import { lerp } from '../lib/utilities'
import { Hex, Player, Tile } from '../types'

export default class Game {
    public playerHex: Hex
    public player: Player
    public board: Tile[]
    public turn: string
    private playerX: number
    private playerY: number

    constructor() {
        const grid = hexShapedHashGrid(3)

        this.player = { health: 3 }
        this.playerHex = hex(0, 0, 0)
        this.board = placePiece(grid, this.player, this.playerHex)
        this.turn = 'PLAYER'

        const {x, y} = convertHexToPixel(this.playerHex)
        this.playerX = x
        this.playerY = y
    }

    private getTile(hex) {
        return this.board[dhx(hex)]
    }

    private setTile(hex, props) {
        this.board[dhx(hex)].props = props
    }

    public getBoard() {
        return this.board
    }

    public selectPlayer() {
        const player = this.player
        const { x, y } = convertHexToPixel(this.playerHex)
        const hex = this.playerHex
        this.playerX = lerp(this.playerX, x, 0.1)
        this.playerY = lerp(this.playerY, y, 0.1)
        return { player, hex, x: this.playerX, y: this.playerY }
    }

    public movePlayer(hex) {
        const currentPlayerTileProps = this.getTile(this.playerHex).props
        delete currentPlayerTileProps.player
        this.setTile(hex, this.player)
        this.playerHex = hex
    }
}
