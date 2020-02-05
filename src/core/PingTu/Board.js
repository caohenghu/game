export default class Board {
    constructor(options) {
        const { width, height, row, col } = options
        this.width = width
        this.height = height
        this.row = row
        this.col = col
        this.canvas = document.createElement('canvas')

        this.render()
    }

    render() {
        const { canvas, width, height, row, col } = this
        const ctx = canvas.getContext('2d')

        canvas.width = width + 1
        canvas.height = height + 1
        Object.assign(canvas.style, {
            position: 'relative',
            pointerEvents: 'none'
        })

        ctx.strokeStyle = 'green'

        for (let i = 0; i <= row; i++) {
            const lineEnd = i * height / row + 0.5
            ctx.moveTo(0, lineEnd)
            ctx.lineTo(width, lineEnd)
            ctx.stroke()
        }

        for (let i = 0; i <= col; i++) {
            const lineEnd = i * width / col + 0.5
            ctx.moveTo(lineEnd, 0)
            ctx.lineTo(lineEnd, width)
            ctx.stroke()
        }
    }
}
