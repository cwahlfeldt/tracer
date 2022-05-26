import store, {startGame} from "../state/store.js"
import {getMousePos} from "../lib/canvasUtilities.js"
import playerPiece from "../pieces/playerPiece.js"
import boardPiece from "../pieces/boardPiece.js"
import {hex} from "../lib/hex.js";
import {selectPlayer} from "../state/selectors.js";

const root = document.getElementById("game")
const ctx = root.getContext("2d")

store.dispatch(startGame({
    boardSize: 3,
    playerLocation: hex(0, 0, 0),
}))
const { board } = store.getState()
const player = selectPlayer(store.getState())

render()
function render() {
    cleanup()
    boardPiece(ctx, board)
    playerPiece(ctx, player.location)
}

function cleanup() {
    root.width = window.innerWidth
    root.height = window.innerHeight
    ctx.clearRect(0, 0, root.width, root.height);
    ctx.translate(root.width * 0.5, root.height * 0.5)
}

root.addEventListener('click', event => {
    const { x, y } = getMousePos(ctx, event)
})