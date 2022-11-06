import { describe, assert, it } from 'vitest'
import { buildPath, searchPath } from './pathFinding.js'

const testGraphOfNeighbors = [
    [1, 4],
    [0, 5, 2],
    [1, 6, 3],
    [2, 7],
    [0, 5],
    [4, 1, 6],
    [5, 2, 7],
    [6, 3],
]
const start = 0
const finish = 7
const expectedSearch = {
    0: 1,
    1: 0,
    2: 1,
    3: 2,
    4: 0,
    5: 1,
    6: 5,
    7: 6,
    start: 0,
}

describe('Pathfinding', () => {
    it('can search path', (t) => {
        assert.deepEqual(
            searchPath(testGraphOfNeighbors, start, finish),
            expectedSearch
        )
    })

    it('can find path', (t) => {
        const searchA = searchPath(
            testGraphOfNeighbors,
            start,
            finish
        )
        assert.deepEqual(
            buildPath(searchA, start, finish),
            [1, 5, 6, 7]
        )

        const searchB = searchPath(
            testGraphOfNeighbors,
            3,
            5
        )
        assert.deepEqual(
            buildPath(searchB, 3, 5),
            [2, 1, 5]
        )
    })
})
