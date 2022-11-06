import {ROOT} from './consts.js'
import { getMousePos } from './canvasUtilities.js'

export const click = (action) => {
    ROOT.addEventListener('click', (e) => {
       action(getMousePos(e))
    })
}

export const hover = (action) => {
    ROOT.addEventListener('mousemove', (e) => {
        action(e)
    })
}
