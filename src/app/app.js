import PingTu from 'src/core/PingTu'
import { click } from 'src/utils/event'
import './app.scss'
import html from './app.html'

const src = 'https://i.loli.net/2020/02/06/AC4znORfSHvxjFM.jpg'
const $app = document.querySelector('.app')
const levelObj = {
    3: '一级难度',
    4: '二级难度',
    5: '三级难度',
    6: '四级难度'
}
let level = 3

const img = new Image()
img.onload = function() {
    const options = {
        img: this,
        width: 300,
        height: 300,
        row: level,
        col: level
    }
    const pingTu = window.pingTu = new PingTu(options)

    $app.innerHTML = html
    // 需重新替换html后才能找到以下元素
    const $wrap = $app.querySelector('.wrap')
    const $preview = $app.querySelector('.preview')
    const $btnImg = $app.querySelector('.img')
    const $btnInput = $app.querySelector('input')
    const $btnLevel = $app.querySelector('.level')
    const $btnReset = $app.querySelector('.reset')

    $wrap.appendChild(pingTu.$el)
    $preview.src = src

    $btnInput.addEventListener('change', e => {
        changeImage(e.target.files[0], pingTu, $preview)
    })

    $btnImg.addEventListener(click, e => {
        // 解决pc手机模式时无动画的问题，因为给页面添加了阻止ios回弹功能
        e.stopPropagation()
    })

    $btnLevel.addEventListener(click, e => {
        // 解决pc手机模式时无动画的问题，因为给页面添加了阻止ios回弹功能
        e.stopPropagation()
        setTimeout(() => {
            changeLevel(pingTu, $btnLevel)
        }, 100)
    })

    $btnReset.addEventListener(click, e => {
        // 解决pc手机模式时无动画的问题，因为给页面添加了阻止ios回弹功能
        e.stopPropagation()
        pingTu.resetBlocks()
    })
}
img.src = src

function changeImage(file, pingTu, $preview) {
    const reader = new FileReader()
    reader.onload = function(e) {
        const src = e.target.result
        const img = new Image()
        img.onload = function() {
            pingTu.changeImage(this)
        }
        img.src = src
        $preview.src = src
    }
    reader.readAsDataURL(file)
}

function changeLevel(pingTu, $btnLevel) {
    if (++level > 6) {
        level = 3
    }
    pingTu.changeLevel(level, level)
    $btnLevel.innerText = levelObj[level]
}
