import PingTu from './core/PingTu'
import imgGo from 'src/images/bg.jpg'

const img = new Image()
img.onload = function() {
    const options = {
        img: this,
        width: 300,
        height: 300,
        row: 4,
        col: 4
    }
    const pingTu = window.pingTu = new PingTu(options)
    const app = document.querySelector('.app')
    const btn = document.createElement('span')
    btn.className = 'btn'
    btn.textContent = '重新开始'
    app.appendChild(btn)
    app.appendChild(img)
    app.appendChild(pingTu.div)

    btn.addEventListener('click', () => {
        pingTu.refresh()
    })
}
img.src = imgGo
