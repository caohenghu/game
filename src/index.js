import PingTu from './core/PingTu'
import { click } from 'src/utils/event'
import { isIOS } from 'src/utils/ua'

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
    const $app = document.querySelector('div')
    const previewStyle = `
        display: flex;
        align-items: center;
        justify-content: space-between;
    `
    const imgStyle = `
        box-sizing: border-box;
        width: 160px;
        border: 4px solid #fff;
    `
    const btnsStyle = `
        display: flex;
        flex-direction: column;
        justify-content: center;
        height: 160px;
    `
    const btnStyle = `
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 110px;
        height: 36px;
        font-size: 16px;
        color: #fff;
        background: #E6A153;
        border: 2px solid #fff;
        border-radius: 18px;
    `
    const preview = `
        <div class="wrap">
            <div style="${previewStyle}">
                <img style="${imgStyle}" src=${this.src}>
                <div style="${btnsStyle}">
                    <span class="btnReset" style="${btnStyle}">重新开始</span>
                </div>
            </div>
        </div>
    `
    $app.innerHTML = preview

    $app.querySelector('.wrap').appendChild(pingTu.$el)

    // $app.querySelector('.btnImg').addEventListener(click, () => {
    //     alert('研发中，敬请期待')
    // })

    // $app.querySelector('.btnLevel').addEventListener(click, () => {
    //     alert('研发中，敬请期待')
    // })

    $app.querySelector('.btnReset').addEventListener(click, () => {
        pingTu.refresh()
    })

    // 阻止ios下拉回弹效果
    if (isIOS) {
        $app.addEventListener('touchstart', e => e.preventDefault())
    }
}
img.src = 'https://i.loli.net/2020/02/06/AC4znORfSHvxjFM.jpg'
