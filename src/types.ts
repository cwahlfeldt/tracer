export interface Hex {
    q: number
    r: number
    s: number
}

export interface Character {
    type: 'player' | 'enemy' | string
    health: number
}

export interface Item {
    type: string
}

export type Props = Character & Item

export type Piece = { [key: string]: Props }

export interface Tile {
    hex: Hex
    props: Piece
}

export type Board = readonly Tile[] | readonly []
