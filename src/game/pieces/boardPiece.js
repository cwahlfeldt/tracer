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

function drawHexIndexes(hex, index) {
    const corners = hexCorners(hex)

    CTX.beginPath()
    corners.forEach((corner) => {
        CTX.lineTo(corner.x, corner.y)
    })
    CTX.lineTo(corners[0].x, corners[0].y)

    CTX.fillStyle = 'black'
    CTX.font = '12px sans-serif'
    CTX.textAlign = 'center'
    CTX.fillText(
        `${hex.q}, ${hex.r}, ${hex.s}`,
        convertHexToPixel(hex).x,
        convertHexToPixel(hex).y
    )
    CTX.closePath()
}

export default function boardPiece(map) {
    map.forEach(({ hex }, index) => {
        drawHexagon(hex)
        // drawHexIndexes(hex, index)
    })
}
