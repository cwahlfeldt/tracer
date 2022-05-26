import {roundCubeCoords, deepEqual, throwError, lerp} from './utilities.js'

const {PI, sqrt, abs, cos, max, sin, round} = Math;

export const ORIENTATION = {
    f0: 3.0 / 2.0, f1: 0.0, f2: sqrt(3.0) / 2.0, f3: sqrt(3.0),
    b0: 2.0 / 3.0, b1: 0.0, b2: -1.0 / 3.0, b3: sqrt(3.0) / 3.0,
    startAngle: 0.0
}

export const DIRECTIONS = {
    northWest: hex(-1, 0, 1),
    north:     hex(0, -1, 1),
    northEast: hex(1, -1, 0),
    southWest: hex(-1, 1, 0),
    south:     hex(0, 1, -1),
    southEast: hex(1, 0, -1),
}

export const SIZE = 40
export const ORIGIN = 0
export const LAYOUT = layout(
    point(SIZE, SIZE),
    point(ORIGIN, ORIGIN)
)

export function hex(q, r, s) {
    if (q + r + s !== 0)
        throwError('q + r + s must equal 0')

    if (q === -0) q = 0
    if (r === -0) r = 0
    if (s === -0) s = 0

    return {q, r, s}
}

export function fracHexagon(q, r, s) {
    if (round(q + r + s) !== 0)
        throwError('q + r + s must equal 0')

    return {q, r, s}
}

export function areHexagonsEqual(hexA, hexB) {
    return deepEqual(hexA, hexB)
}

export function addHex(hexA, hexB)  {
    return hex(
        hexA.q + hexB.q,
        hexA.r + hexB.r,
        hexA.s + hexB.s
   )
}

export function subtractHex(hexA, hexB)  {
    return hex(
        hexA.q - hexB.q,
        hexA.r - hexB.r,
        hexA.s - hexB.s
   )
}

export function multiplyHex(h, multiplyBy)  {
    return hex(
        h.q * multiplyBy,
        h.r * multiplyBy,
        h.s * multiplyBy
   )
}

export function lengthOfHex(h) {
    return (abs(h.q) + abs(h.r) + abs(h.s)) / 2
}

export function distanceBetweenHexes(hexA, hexB) {
    return lengthOfHex(subtractHex(hexA, hexB))
}

export function hexNeighbor(h, direction) {
    return addHex(h, direction)
}

export function getAllNeighbors(h) {
    return Object.keys(DIRECTIONS).map(key => {
        return hexNeighbor(h, DIRECTIONS[key])
    })
}

export function point(x, y) {
    return {x, y}
}

export function layout(size, origin) {
    return {
        size: point(size.x, size.y),
        origin: point(origin.x, origin.y)
    }
}

export function convertHexToPixel(hex) {
    const M = ORIENTATION
    const x = ((M.f0 * hex.q) + (M.f1 * hex.r)) * LAYOUT.size.x
    const y = ((M.f2 * hex.q) + (M.f3 * hex.r)) * LAYOUT.size.y
    return point(Math.floor(x + LAYOUT.origin.x), Math.floor(y + LAYOUT.origin.y))
}

export function convertPixelToHex(pixelPoint) {
    const M = ORIENTATION
    const pt = point(
        (pixelPoint.x - LAYOUT.origin.x) / LAYOUT.size.x,
        (pixelPoint.y - LAYOUT.origin.y) / LAYOUT.size.y,
    )
    const q = M.b0 * pt.x + M.b1 * pt.y;
    const r = M.b2 * pt.x + M.b3 * pt.y;
    const roundedHexCoords = roundCubeCoords(q, r, -q - r)
    return hex(
        roundedHexCoords.q,
        roundedHexCoords.r,
        roundedHexCoords.s
    )
}

export function getCornerOffset(corner) {
    const size = LAYOUT.size
    const angle = 2.0 * PI * (ORIENTATION.startAngle + corner) / 6
    return point(
        Math.floor(size.x * cos(angle)),
        Math.floor(size.y * sin(angle))
    )
}

export function hexCorners(h) {
    const corners = []
    const center = convertHexToPixel(h)
    for (let i = 0; i < 6; i++) {
        const offset = getCornerOffset(i)
        corners.push(point(
            center.x + offset.x,
            center.y + offset.y
        ))
    }
    return corners
}

export function roundHex(fracHex) {
    const {q, r, s} = roundCubeCoords(fracHex.q, fracHex.r, fracHex.s)
    return hex(q, r, s)
}

export function hexLerp(a, b, t) {
    return roundHex(
        fracHexagon(
            lerp(a.q, b.q, t),
            lerp(a.r, b.r, t),
            lerp(a.s, b.s, t)
        )
    )
}

export function hexLine(hexA, hexB) {
    const N = distanceBetweenHexes(hexA, hexB)
    const step = 1.0 / max(N, 1)

    let results = []
    for (let i = 0; i <= N; i++) {
        results.push(hexLerp(hexA, hexB, i * step))
    }

    return results
}

export function hexShapedGrid(radius) {
    let grid = []
    for (let q = -radius; q <= radius; q++) {
        const r1 = Math.max(-radius, -q - radius)
        const r2 = Math.min(radius, -q + radius)
        for (let r = r1; r <= r2; r++) {
            grid.push(hex(q, r, -q - r))
        }
    }
    return grid
}
