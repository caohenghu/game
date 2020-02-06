export default class Board {
    constructor(options) {
        const { width, height, row, col } = options
        this.width = width
        this.height = height
        this.row = row
        this.col = col
        this.$el = document.createElement('div')

        this.render()
    }

    render() {
        const { $el, width, height, row, col } = this
        const tdWidth = width / col
        const tdHeight = height / row

        Object.assign($el.style, {
            position: 'relative',
            display: 'table',
            pointerEvents: 'none'
        })

        for (let i = 0; i < row; i++) {
            const $tr = document.createElement('div')
            Object.assign($tr.style, {
                display: 'table-row'
            })
            for (let j = 0; j < col; j++) {
                const $td = document.createElement('div')
                Object.assign($td.style, {
                    display: 'table-cell',
                    width: tdWidth + 'px',
                    height: tdHeight + 'px',
                    border: '1px solid #fff',
                    boxSizing: 'border-box'
                })
                $tr.appendChild($td)
            }
            $el.appendChild($tr)
        }
    }
}
