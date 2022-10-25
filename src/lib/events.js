import {ROOT} from './consts.js'

export const click = (action) => {
    ROOT.addEventListener('click', (e) => {
       action(e)
    })
}

export const hover = (action) => {
    ROOT.addEventListener('mousemove', (e) => {
        action(e)
    })
}
