import { test, expect } from 'vitest'
import { deepEqual } from './utilities.js'

test(`does deep equal util work`, () => {
    expect(deepEqual({ x: 1 }, { x: 1 })).eq(true)
    expect(
        deepEqual(
            { x: { y: { arr: [1, 2, 3] } } },
            { x: { y: { arr: [1, 2, 3] } } }
        )
    ).eq(true)
})
