import test from 'ava'
import {
    DIRECTIONS,
    hex,
    addHex,
    subtractHex,
    areHexagonsEqual,
    multiplyHex,
    lengthOfHex,
    distanceBetweenHexes,
    hexNeighbor,
    point,
    layout,
    convertHexToPixel,
    convertPixelToHex,
    getCornerOffset,
    hexCorners,
    getAllNeighbors,
    hexLine,
    hexLerp,

} from '../../lib/hex.js'

const hexA = hex(0, 1, -1)
const hexB = hex(-1, 0, 1)

test(`can create a hexagon`, t => {
    t.deepEqual(hex(-1, 1, 0), {q: -1, r: 1, s: 0})
})

test(`hex coords must equal zero`, t => {
    t.truthy(hexA.q + hexA.r + hexA.s === 0)
    t.truthy(hexB.q + hexB.r + hexB.s === 0)
});

test(`can add hexagons`, t => {
    t.deepEqual(
        addHex(hexA, hexB),
        hex(-1, 1, 0)
    )
})

test(`can subtract hexagons`, t => {
    t.deepEqual(
        subtractHex(hexA, hexB),
        hex(1, 1, -2)
    )
})

test(`can multiply hexagons`, t => {
    t.deepEqual(
        multiplyHex(hexA, 2),
        hex(0, 2, -2)
    )
})

test(`are hexagons equal`, t => {
    const testHex = hex(0, 1, -1)
    const sameHex = hex(0, 1, -1)
    t.truthy(areHexagonsEqual(testHex, sameHex))
})

test(`get length of hexagon`, t => {
    t.truthy(lengthOfHex(hexA) === 1)
})

test(`get distance between 2 hexagons`, t => {
    t.truthy(distanceBetweenHexes(hexA, hexB) === 2)
})

test(`get hex neighbor`, t => {
    t.deepEqual(
        hexNeighbor(hexA, DIRECTIONS.north),
        hex(0, 0, 0)
    )
})

test(`can create point`, t => {
    t.deepEqual(
        point(1, 1),
        {x: 1, y: 1}
    )
})

test(`can create layout`, t => {
    t.deepEqual(
        layout(point(6, 6), point(0, 0)),
        {
            size: {x: 6, y: 6},
            origin: {x: 0, y: 0}
        }
    )
})

test(`convert hexagons to pixels`, t => {
    const hexC = hex(0, 0, 0)
    const hexD = hex(4, 0, -4)
    t.deepEqual(
        convertHexToPixel(hexC),
        point(0, 0)
    )
    t.deepEqual(
        convertHexToPixel(hexD),
        point(240, 138)
    )
})

test(`convert pixels to hexagon`, t => {
    const testHex = hex(4, 0, -4)
    const diffHex = hex(1, 0, -1)
    const pixelPoint = convertHexToPixel(testHex)
    const diffPixelPoint = convertHexToPixel(diffHex)
    t.deepEqual(
        convertPixelToHex(pixelPoint),
        hex(4, 0, -4)
    )
    t.deepEqual(
        convertPixelToHex(diffPixelPoint),
        hex(1, 0, -1)
    )
})

test(`get the corner offset of a hexagon`, t => {
    t.deepEqual(
        getCornerOffset(4),
        point(-21, -35)
    )
})

test(`create hexagon corner points`, t => {
    const testHex = hex(4, 0, -4)
    t.deepEqual(
        hexCorners(testHex),
        [
            point(280, 138),
            point(260, 172),
            point(220, 172),
            point(200, 138),
            point(219, 103),
            point(260, 103),
        ]
    )
})

test(`get all hex neighbors`, t => {
    const testHex = hex(6, -6, 0)
    t.deepEqual(
        getAllNeighbors(testHex),
        [
            hex(5, -6, 1),
            hex(6, -7, 1),
            hex(7, -7, 0),
            hex(5, -5, 0),
            hex(6, -5, -1),
            hex(7, -6, -1),
        ]
    )
})

test(`lerp a hex`, t => {
    t.deepEqual(
        hexLerp(hexA, hexB, 0),
        hex(0, 1, -1)
    )
})

test(`create a line from one hex to another`, t => {
    t.deepEqual(
        hexLine(hexA, hexB),
        [
            hex(0,1,-1),
            hex(0,0,0),
            hex(-1,0,1),
        ]
    )
})