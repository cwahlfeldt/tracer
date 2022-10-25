import { convertHexToPixel, hex } from '../lib/hex.js'
import { Hex } from '../types'
import { lerp } from '../lib/utilities'

export default class Player {
    public hex: Hex
    public lastHex: Hex
    public health: number
    public x: number
    public y: number

    constructor() {
        const initHex = hex(0,0,0)
        const initPoint = convertHexToPixel(initHex)

        this.hex = initHex
        this.lastHex = initHex
        this.health = 3
        this.x = initPoint.x
        this.y = initPoint.y
    }

    public movePlayer(hex) {
        const {x, y} = convertHexToPixel(hex)
        this.lastHex = this.hex
        this.hex = hex
        this.x = x
        this.y = y
    }

    // public lerpPlayer() {
    //     let {x, y} = convertHexToPixel(this.lastHex)
    //     this.x = lerp(x, this.x, 0.1)
    //     this.y = lerp(y, this.y, 0.1)
    // }

    public heal(amt = 1) {
        this.health = this.health + amt
    }

    public hurt(dmg = 1) {
        this.health = this.health - dmg
    }
}
