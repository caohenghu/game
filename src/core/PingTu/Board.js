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
            zIndex: 1,
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
                    boxSizing: 'border-box'
                })
                if (j !== 0) {
                    Object.assign($td.style, {
                        borderLeft: '1px solid #fff'
                    })
                }
                if (i !== 0) {
                    Object.assign($td.style, {
                        borderTop: '1px solid #fff'
                    })
                }
                $tr.appendChild($td)
            }
            $el.appendChild($tr)
        }
    }
}
