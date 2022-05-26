import {convertHexToPixel, hexCorners} from "../lib/hex.js";

function drawHexagon(ctx, tile) {
    const corners = hexCorners(tile.hex)

    ctx.beginPath()
    corners.forEach(corner => {
        ctx.lineTo(corner.x, corner.y)
    })
    ctx.lineTo(corners[0].x, corners[0].y)

    ctx.lineWidth = 2
    ctx.strokeStyle = '#3f3f3f'
    ctx.stroke()
    ctx.fillStyle = 'rgba(42, 160, 216, 0.5)'
    ctx.fill()
    ctx.closePath()
}

function drawHexIndexes(ctx, tile, index) {
    const corners = hexCorners(tile.hex)

    ctx.beginPath()
    corners.forEach(corner => {
        ctx.lineTo(corner.x, corner.y)
    })
    ctx.lineTo(corners[0].x, corners[0].y)

    ctx.fillStyle = 'black'
    ctx.font = '16px sans-serif';
    ctx.textAlign = 'center'
    ctx.fillText(index, convertHexToPixel(tile.hex).x, convertHexToPixel(tile.hex).y);
    ctx.closePath()
}

export default function boardPiece(ctx, map) {
    map.forEach((tile, index) => {
        drawHexagon(ctx, tile)
        drawHexIndexes(ctx, tile, index)
    })
}