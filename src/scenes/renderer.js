import { CTX, ROOT } from '../lib/consts.js'
import store from '../state/store.js'
let start = Date.now()

export default function render(gameLogicHook, animationHook) {
    let anim = null

    draw()

    store.subscribe(() => {
        start = Date.now()
        cancelAnimationFrame(anim)
        draw()
    })

    function draw() {
        let clock = Date.now()

        cleanup()

        gameLogicHook(store.getState(), anim)

        if (clock - start >= 4000) {
            return
        }

        anim = requestAnimationFrame(draw)

        if (typeof animationHook !== 'undefined') {
            animationHook(anim)
        }
    }

    function cleanup() {
        ROOT.width = window.innerWidth
        ROOT.height = window.innerHeight
        CTX.clearRect(0, 0, ROOT.width, ROOT.height)
        CTX.translate(ROOT.width * 0.5, ROOT.height * 0.5)
    }
}
