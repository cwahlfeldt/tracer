import { loopHexBoard } from '../board.js'
import { CTX } from '../../lib/consts.js'
import { convertHexToPixel, hexCorners } from '../../lib/hex.js'

function drawHexagon(hex) {
    const corners = hexCorners(hex)

    CTX.beginPath()
    corners.forEach((corner) => {
        CTX.lineTo(corner.x, corner.y)
    })
    CTX.lineTo(corners[0].x, corners[0].y)

    CTX.lineWidth = 2
    CTX.strokeStyle = '#3f3f3f'
    CTX.stroke()
    CTX.fillStyle = 'rgba(42, 160, 216, 0.7)'
    CTX.fill()
    CTX.closePath()
}

function drawHexIndexes(tile, index) {
    const corners = hexCorners(tile.hex)

    CTX.beginPath()
    corners.forEach((corner) => {
        CTX.lineTo(corner.x, corner.y)
    })
    CTX.lineTo(corners[0].x, corners[0].y)

    CTX.fillStyle = 'black'
    CTX.font = '16px sans-serif'
    CTX.textAlign = 'center'
    CTX.fillText(
        index,
        convertHexToPixel(tile.hex).x,
        convertHexToPixel(tile.hex).y
    )
    CTX.closePath()
}

export default function boardPiece(map) {
    loopHexBoard(map, (hex, index) => {
        drawHexagon(hex)
    })
    // map.forEach((tile, index) => {
    //     // drawHexIndexes(tile, index)
    // })
}
