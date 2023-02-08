import { CTX, ROOT } from './consts.js'
import store from '../game/store.ts'

export default function render(gameLogicHook) {
    let anim = requestAnimationFrame(draw)

    store.subscribe(() => {
        // cancelAnimationFrame(anim)
        draw()
    })

    function draw() {
        cleanup()
        gameLogicHook(store.getState())
        // anim = requestAnimationFrame(draw)
    }

    function cleanup() {
        ROOT.width = window.innerWidth
        ROOT.height = window.innerHeight
        CTX.clearRect(0, 0, ROOT.width, ROOT.height)
        CTX.translate(ROOT.width * 0.5, ROOT.height * 0.5)
    }
}
