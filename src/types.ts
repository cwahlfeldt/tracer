export interface Hex {
    q: number
    r: number
    s: number
}

export interface Character {
    type: 'player' | 'enemy'
    health: number
}

export interface Item {
    type: string
}

export type Props = Character & Item

export interface Tile {
    hex: Hex
    props: { [key: string]: Props }
}

export type Board = readonly Tile[]
