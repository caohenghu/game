// 不能通过userAgent来判断，因为ipad能打开桌面网站，就无法知道是ipad
const isMobile = 'ontouchstart' in document

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
