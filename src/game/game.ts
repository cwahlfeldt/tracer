import { hex, hexShapedHashGrid } from '../lib/hex.js'
import { dhx, placePiece } from './board.js'
import Player from './player'
import { Tile, Hex } from '../types'

export default class Game {
    public player: Player
    public board: Tile[]
    public selectedHex: Hex
    public turn: string

    constructor() {
        const grid = hexShapedHashGrid(3)
        const player = new Player()

        this.selectedHex = hex(0,0,0)
        this.player = player
        this.board = placePiece(grid, this.player.health, this.player.hex)
        this.turn = 'PLAYER'
    }

    private getTile(hex) {
        return this.board[dhx(hex)]
    }

    private setTile(hex, props) {
        this.board[dhx(hex)].props = props
    }

    public movePlayer(hex) {
        const currentPlayerTileProps = this.getTile(this.player.hex).props
        delete currentPlayerTileProps.player
        this.setTile(hex, this.player)
        this.player.movePlayer(hex)
    }
}
