/**
 * 获取随机数
 * @param min
 * @param max
 * @returns {number}
 */
function getRandom(min, max) {
    let choose = max - min + 1
    return Math.floor(Math.random() * choose + min)
}

export {
    getRandom
}
