export interface Hex {
    q: number
    r: number
    s: number
}

export interface Character {
    type: string
    health: number
}

export interface Tile {
    hex: Hex
    neighbors: Hex[]
    props: Character | {}
}
