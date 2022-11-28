import { Board } from '../types'

export const blankBoard: Board = [
    {
        hex: { q: -1, r: 0, s: 1 },
        props: {},
    },
    {
        hex: { q: -1, r: 1, s: 0 },
        props: {},
    },
    {
        hex: { q: 0, r: -1, s: 1 },
        props: {},
    },
    {
        hex: { q: 0, r: 0, s: 0 },
        props: {},
    },
    {
        hex: { q: 0, r: 1, s: -1 },
        props: {},
    },
    {
        hex: { q: 1, r: -1, s: 0 },
        props: {},
    },
    {
        hex: { q: 1, r: 0, s: -1 },
        props: {},
    },
]

export const gameBoard: Board = [
    {
        hex: { q: -1, r: 0, s: 1 },
        props: {},
    },
    {
        hex: { q: -1, r: 1, s: 0 },
        props: {},
    },
    {
        hex: { q: 0, r: -1, s: 1 },
        props: {
            enemyOne: { type: 'enemyOne', health: 1 },
        },
    },
    {
        hex: { q: 0, r: 0, s: 0 },
        props: {
            player: { type: 'player', health: 3 },
        },
    },
    {
        hex: { q: 0, r: 1, s: -1 },
        props: {},
    },
    {
        hex: { q: 1, r: -1, s: 0 },
        props: {},
    },
    {
        hex: { q: 1, r: 0, s: -1 },
        props: {},
    },
]
