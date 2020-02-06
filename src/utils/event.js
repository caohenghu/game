import { isMobile } from './ua'

const click = isMobile ? 'touchstart' : 'click'
const mousedown = isMobile ? 'touchstart' : 'mousedown'
const mousemove = isMobile ? 'touchmove' : 'mousemove'
const mouseup = isMobile ? 'touchend' : 'mouseup'

export default {
    mousedown,
    mousemove,
    mouseup
}

export {
    click,
    mousedown,
    mousemove,
    mouseup
}
