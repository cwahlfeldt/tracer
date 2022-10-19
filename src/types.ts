export interface Hex {
    q: number
    r: number
    s: number
}

export interface Player {
    health: number
}

export interface Enemy {
    health: number
}

export interface Tile {
    neighbors: Hex[]
    props: Player | Enemy
}
