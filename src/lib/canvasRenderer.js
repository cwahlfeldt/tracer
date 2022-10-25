import { CTX, ROOT } from './consts.js'
import store from '../game/store.ts'

export default function render(gameLogicHook, animationHook) {
    // let anim = null

    draw()

    store.subscribe(() => {
        draw()
        // cancelAnimationFrame(anim)
    })

    function draw() {
        cleanup()

        gameLogicHook(store.getState())
        //
        // anim = requestAnimationFrame(draw)
        //
        // if (typeof animationHook !== 'undefined') {
        //     animationHook(anim)
        // }
        //
        // if (typeof keepAnimating !== 'undefined' && !keepAnimating) {
        //     cancelAnimationFrame(anim)
        // }
    }

    function cleanup() {
        ROOT.width = window.innerWidth
        ROOT.height = window.innerHeight
        CTX.clearRect(0, 0, ROOT.width, ROOT.height)
        CTX.translate(ROOT.width * 0.5, ROOT.height * 0.5)
    }
}
