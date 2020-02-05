import { isMobile } from './ua'

const mousedown = isMobile ? 'touchstart' : 'mousedown'
const mousemove = isMobile ? 'touchmove' : 'mousemove'
const mouseup = isMobile ? 'touchend' : 'mouseup'

export default {
    mousedown,
    mousemove,
    mouseup
}

export {
    mousedown,
    mousemove,
    mouseup
}
