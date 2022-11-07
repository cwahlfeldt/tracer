import { CTX, ROOT } from './consts.js'
import store from '../game/store.ts'

export default function render(gameLogicHook, animationHook) {
    let anim
    draw()
    //
    // store.subscribe(() => {
    //     draw()
    // })

    function draw() {
        cleanup()
        gameLogicHook()
        anim = requestAnimationFrame(draw)
        if (animationHook) {
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
