/**
 * 判断windows平台
 */
const isWin = ['Win32', 'Windows'].includes(navigator.platform)

/**
 * 判断mac平台
 */
const isMac = ['Mac68K', 'MacPPC', 'Macintosh', 'MacIntel'].includes(navigator.platform)

/**
 * 判断Chrome
 */
const isChrome = /Chrome/.test(navigator.userAgent)

/**
 * 判断Firefox
 */
const isFirefox = /Firefox/.test(navigator.userAgent)

/**
 * 判断Safari
 */
const isSafari = /Safari/.test(navigator.userAgent)

/**
 * 判断Edge
 */
const isEdge = /Edge/.test(navigator.userAgent)

/**
 * 判断微信
 */
const isWeixin = /MicroMessenger/i.test(navigator.userAgent)

/**
 * 判断android
 */
const isAndroid = /Android/i.test(navigator.userAgent)

/**
 * 判断ios
 */
const isIOS = /ipad|iphone/i.test(navigator.userAgent)

/**
 * 判断手机
 */
const isMobile = isAndroid || isIOS

/**
 * 判断iframe
 */
const isIframe = window.top !== window

/**
 * 获取Chrome的版本号
 */
function getChromeVersion() {
    return Number(/Chrome\/(\d+)/.exec(navigator.userAgent)[1])
}

export {
    isWin,
    isMac,
    isChrome,
    isFirefox,
    isSafari,
    isEdge,
    isWeixin,
    isAndroid,
    isIOS,
    isMobile,
    isIframe,
    getChromeVersion
}
