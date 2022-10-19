import { CTX, ROOT } from './consts.js'
import store from '../game/state/gameState.js'

export default function render(gameLogicHook, animationHook) {
    let anim = null

    store.subscribe(() => {
        console.log(store.getState())
    })

    draw()

    function draw() {
        cleanup()
        const state = store.getState()

        gameLogicHook(state, anim)

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
