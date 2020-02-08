import BlockBase from './BlockBase'
import BlockNull from './BlockNull'
import event from 'src/utils/event'

export default class BlockNormal extends BlockBase {
    constructor(options) {
        super()
        const { sourcePos, width, height, img, imgWidth, imgHeight, parent } = options
        this.sourcePos = sourcePos
        this.nowPos = []
        this.img = img
        this.imgWidth = imgWidth
        this.imgHeight = imgHeight
        this.width = width
        this.height = height
        this.parent = parent
        this.$el = document.createElement('canvas')
        this.render()
        this.bindEvent()
    }

    render() {
        const { $el, img, sourcePos, imgWidth, imgHeight, width, height } = this
        const ctx = $el.getContext('2d')
        $el.className = 'block'
        $el.width = width * devicePixelRatio
        $el.height = height * devicePixelRatio
        ctx.drawImage(img, sourcePos[0] * imgWidth, sourcePos[1] * imgHeight, imgWidth, imgHeight, 0, 0, $el.width, $el.height)
    }

    setPos(x, y) {
        this.nowPos = [x, y]
        Object.assign(this.$el.style, {
            position: 'absolute',
            left: this.nowPos[0] * this.width + 'px',
            top: this.nowPos[1] * this.height + 'px',
            width: this.width + 'px',
            height: this.height + 'px'
        })
    }

    bindEvent() {
        const { $el } = this
        $el.addEventListener(event.mousedown, e1 => {
            e1.preventDefault()

            const offsetX = $el.offsetLeft
            const offsetY = $el.offsetTop
            const pageX = e1.pageX || e1.touches[0].pageX
            const pageY = e1.pageY || e1.touches[0].pageY
            const startX = pageX
            const startY = pageY

            const mousemove = e2 => {
                const pageX = e2.pageX || e2.touches[0].pageX
                const pageY = e2.pageY || e2.touches[0].pageY
                const distanceX = pageX - startX
                const distanceY = pageY - startY
                let left = offsetX
                let top = offsetY

                if (this.arrow.left instanceof BlockNull && distanceX < 0) {
                    left = offsetX + Math.max(distanceX, -this.width)
                } else if (this.arrow.right instanceof BlockNull && distanceX > 0) {
                    left = offsetX + Math.min(distanceX, this.width)
                } else if (this.arrow.top instanceof BlockNull && distanceY < 0) {
                    top = offsetY + Math.max(distanceY, -this.height)
                } else if (this.arrow.bottom instanceof BlockNull && distanceY > 0) {
                    top = offsetY + Math.min(distanceY, this.height)
                }

                Object.assign($el.style, {
                    left: left + 'px',
                    top: top + 'px'
                })
            }
            const mouseup = e3 => {
                const pageX = e3.pageX || e3.changedTouches[0].pageX
                const pageY = e3.pageY || e3.changedTouches[0].pageY
                const distanceX = pageX - startX
                const distanceY = pageY - startY
                let left = offsetX
                let top = offsetY

                if (this.arrow.left instanceof BlockNull && distanceX < 0) {
                    left = offsetX - this.width
                    this.setAllArrow('left')
                } else if (this.arrow.right instanceof BlockNull && distanceX > 0) {
                    left = offsetX + this.width
                    this.setAllArrow('right')
                } else if (this.arrow.top instanceof BlockNull && distanceY < 0) {
                    top = offsetY - this.height
                    this.setAllArrow('top')
                } else if (this.arrow.bottom instanceof BlockNull && distanceY > 0) {
                    top = offsetY + this.height
                    this.setAllArrow('bottom')
                }

                Object.assign($el.style, {
                    left: left + 'px',
                    top: top + 'px'
                })

                if (left !== offsetX || top !== offsetY) {
                    this.parent.isSuccess()
                }

                document.removeEventListener(event.mousemove, mousemove)
                document.removeEventListener(event.mouseup, mouseup)
            }
            document.addEventListener(event.mousemove, mousemove)
            document.addEventListener(event.mouseup, mouseup)
        })
    }

    setAllArrow(type) {
        let blockNull = null
        const tmepLeft = this.arrow.left
        const tmepRight = this.arrow.right
        const tmepTop = this.arrow.top
        const tmepBottom = this.arrow.bottom

        if (type === 'left' || type === 'right') {
            if (type === 'left') {
                blockNull = this.arrow.left

                blockNull.arrow.left && (blockNull.arrow.left.arrow.right = this)

                this.arrow.right && (this.arrow.right.arrow.left = blockNull)

                this.arrow.left = blockNull.arrow.left
                this.arrow.right = blockNull

                blockNull.arrow.left = this
                blockNull.arrow.right = tmepRight

                this.nowPos[0]--
            } else {
                blockNull = this.arrow.right

                blockNull.arrow.right && (blockNull.arrow.right.arrow.left = this)

                this.arrow.left && (this.arrow.left.arrow.right = blockNull)

                this.arrow.left = blockNull
                this.arrow.right = blockNull.arrow.right

                blockNull.arrow.left = tmepLeft
                blockNull.arrow.right = this

                this.nowPos[0]++
            }

            blockNull.arrow.top && (blockNull.arrow.top.arrow.bottom = this)
            blockNull.arrow.bottom && (blockNull.arrow.bottom.arrow.top = this)

            this.arrow.top && (this.arrow.top.arrow.bottom = blockNull)
            this.arrow.bottom && (this.arrow.bottom.arrow.top = blockNull)

            this.arrow.top = blockNull.arrow.top
            this.arrow.bottom = blockNull.arrow.bottom

            blockNull.arrow.top = tmepTop
            blockNull.arrow.bottom = tmepBottom
        } else {
            if (type === 'top') {
                blockNull = this.arrow.top

                blockNull.arrow.top && (blockNull.arrow.top.arrow.bottom = this)

                this.arrow.bottom && (this.arrow.bottom.arrow.top = blockNull)

                this.arrow.top = blockNull.arrow.top
                this.arrow.bottom = blockNull

                blockNull.arrow.top = this
                blockNull.arrow.bottom = tmepBottom

                this.nowPos[1]--
            } else {
                blockNull = this.arrow.bottom

                blockNull.arrow.bottom && (blockNull.arrow.bottom.arrow.top = this)

                this.arrow.top && (this.arrow.top.arrow.bottom = blockNull)

                this.arrow.bottom = blockNull.arrow.bottom
                this.arrow.top = blockNull

                blockNull.arrow.bottom = this
                blockNull.arrow.top = tmepTop

                this.nowPos[1]++
            }
            blockNull.arrow.left && (blockNull.arrow.left.arrow.right = this)
            blockNull.arrow.right && (blockNull.arrow.right.arrow.left = this)

            this.arrow.left && (this.arrow.left.arrow.right = blockNull)
            this.arrow.right && (this.arrow.right.arrow.left = blockNull)

            this.arrow.left = blockNull.arrow.left
            this.arrow.right = blockNull.arrow.right

            blockNull.arrow.left = tmepLeft
            blockNull.arrow.right = tmepRight
        }
    }
}
