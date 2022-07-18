import {ROOT} from './consts.js'

export const click = (action) => {
    ROOT.addEventListener('click', (e) => {
       action(e)
    })
}
