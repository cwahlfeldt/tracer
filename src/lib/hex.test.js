import { assert, describe, expect, it } from 'vitest'
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
} from './hex.js'

const hexA = hex(0, 1, -1)
const hexB = hex(-1, 0, 1)

describe('Hex library', () => {
    it('can create a hex structure', () => {
        assert.deepEqual(hex(-1, 1, 0), {
            q: -1,
            r: 1,
            s: 0,
        })
    })

    it('should ensure summing coordinates should always equal 0', () => {
        assert.isTrue(hexA.q + hexA.r + hexA.s === 0)
        assert.isTrue(hexB.q + hexB.r + hexB.s === 0)
    })

    it(`can add hexagons`, () => {
        assert.deepEqual(addHex(hexA, hexB), hex(-1, 1, 0))
    })

    it(`can subtract hexagons`, () => {
        assert.deepEqual(
            subtractHex(hexA, hexB),
            hex(1, 1, -2)
        )
    })

    it(`can multiply hexagons`, () => {
        assert.deepEqual(
            multiplyHex(hexA, 2),
            hex(0, 2, -2)
        )
    })

    it(`can test equality of hexagons`, () => {
        const testHex = hex(0, 1, -1)
        const sameHex = hex(0, 1, -1)
        assert.isTrue(areHexagonsEqual(testHex, sameHex))
    })

    it(`can get length of hexagon`, () => {
        assert.isTrue(lengthOfHex(hexA) === 1)
    })

    it(`get distance between 2 hexagons`, () => {
        assert.isTrue(
            distanceBetweenHexes(hexA, hexB) === 2
        )
    })

    it(`can get a neighboring hex`, () => {
        assert.deepEqual(
            hexNeighbor(hexA, DIRECTIONS.north),
            hex(0, 0, 0)
        )
    })

    it(`can create point structure`, () => {
        assert.deepEqual(point(1, 1), { x: 1, y: 1 })
    })

    it(`can create layout of hexagons`, () => {
        assert.deepEqual(layout(point(6, 6), point(0, 0)), {
            size: { x: 6, y: 6 },
            origin: { x: 0, y: 0 },
        })
    })

    it(`can convert hexagons to pixels`, () => {
        const hexC = hex(0, 0, 0)
        const hexD = hex(4, 0, -4)
        assert.deepEqual(
            convertHexToPixel(hexC),
            point(0, 0)
        )
        assert.deepEqual(
            convertHexToPixel(hexD),
            point(240, 138)
        )
    })

    it(`can convert pixels to hexagon`, () => {
        const testHex = hex(4, 0, -4)
        const diffHex = hex(1, 0, -1)
        const pixelPoint = convertHexToPixel(testHex)
        const diffPixelPoint = convertHexToPixel(diffHex)
        assert.deepEqual(
            convertPixelToHex(pixelPoint),
            hex(4, 0, -4)
        )
        assert.deepEqual(
            convertPixelToHex(diffPixelPoint),
            hex(1, 0, -1)
        )
    })

    it(`can get the corner offset of a hexagon`, () => {
        assert.deepEqual(
            getCornerOffset(4),
            point(-21, -35)
        )
    })

    it(`can create hexagon corner points`, () => {
        const testHex = hex(4, 0, -4)
        assert.deepEqual(hexCorners(testHex), [
            point(280, 138),
            point(260, 172),
            point(220, 172),
            point(200, 138),
            point(219, 103),
            point(260, 103),
        ])
    })

    it(`can get all hex neighbors`, () => {
        const testHex = hex(6, -6, 0)
        assert.deepEqual(getAllNeighbors(testHex), [
            hex(5, -6, 1),
            hex(6, -7, 1),
            hex(7, -7, 0),
            hex(5, -5, 0),
            hex(6, -5, -1),
            hex(7, -6, -1),
        ])
    })

    it(`can lerp a hex`, () => {
        assert.deepEqual(
            hexLerp(hexA, hexB, 0),
            hex(0, 1, -1)
        )
    })

    it(`can create a line from one hex to another`, () => {
        assert.deepEqual(hexLine(hexA, hexB), [
            hex(0, 1, -1),
            hex(0, 0, 0),
            hex(-1, 0, 1),
        ])
    })
})
