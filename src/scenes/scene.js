import store, {movePlayer, startGame} from "../state/store.js"
import {getMousePos} from "../lib/canvasUtilities.js"
import playerPiece from "../pieces/playerPiece.js"
import boardPiece from "../pieces/boardPiece.js"
import {convertPixelToHex, hex, point} from "../lib/hex.js"
import {selectPlayer} from "../state/selectors.js"
import {lerp} from "../lib/utilities.js"

const root = document.getElementById("game")
const ctx = root.getContext("2d")

store.dispatch(startGame({
    boardSize: 3,
    playerLocation: hex(0, 0, 0),
}))

const { board } = store.getState()
const player = selectPlayer(store.getState())
let {x, y} = player.location
let anim = null

render()

function render() {
    cleanup()

    const player = selectPlayer(store.getState())

    x = lerp(x, player.location.x, 0.1)
    y = lerp(y, player.location.y, 0.1)

    boardPiece(ctx, board)
    playerPiece(ctx, {x, y})

    anim = requestAnimationFrame(render)
    if (x === player.location.x && y === player.location.y)
        cancelAnimationFrame(anim)
}

store.subscribe(() => {
    cancelAnimationFrame(anim)
    render()
})

function cleanup() {
    root.width = window.innerWidth
    root.height = window.innerHeight
    ctx.clearRect(0, 0, root.width, root.height)
    ctx.translate(root.width * 0.5, root.height * 0.5)
}

root.addEventListener('click', event => {
    const { x, y } = getMousePos(ctx, event)
    store.dispatch(movePlayer(convertPixelToHex(point(x, y))))
})