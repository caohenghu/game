import Board from './Board'
import BlockNormal from './BlockNormal'
import BlockNull from './BlockNull'

export default class PingTu {
    constructor(options) {
        const { img, width, height, row, col } = options
        this.img = img
        this.width = width
        this.height = height
        this.row = row
        this.col = col
        this.$el = document.createElement('div')
        this.blocks = []
        this.board = null

        this.render()
        this.renderBoard()
        this.renderBlocks()
        this.resetBlocks()
    }

    render() {
        Object.assign(this.$el.style, {
            position: 'relative',
            width: this.width + 'px',
            marginTop: '30px',
            background: '#756780',
            border: '3px solid #fff'
        })
    }

    renderBoard() {
        const { width, height, row, col } = this
        const options = { width, height, row, col }
        this.board = new Board(options)
        this.$el.appendChild(this.board.$el)
    }

    renderBlocks() {
        const { width, height, row, col, img, blocks, $el } = this
        const blockWidth = width / col
        const blockHeight = height / row
        const imgWidth = img.width / col
        const imgHeight = img.height / row

        for (let i = 0; i < row; i++) {
            for (let j = 0; j < col; j++) {
                if (i === this.row - 1 && j === this.col - 1) {
                    break
                }
                const options = {
                    sourcePos: [j, i],
                    width: blockWidth,
                    height: blockHeight,
                    img,
                    imgWidth,
                    imgHeight,
                    parent: this
                }
                const block = new BlockNormal(options)
                blocks.push(block)
                $el.appendChild(block.$el)
            }
        }
        blocks.push(new BlockNull())
    }

    isSuccess() {
        let result = true
        this.blocks.forEach(item => {
            if (item instanceof BlockNormal && (item.sourcePos[0] !== item.nowPos[0] || item.sourcePos[1] !== item.nowPos[1])) {
                result = false
            }
        })
        if (result) {
            setTimeout(() => {
                alert('挑战成功')
            }, 300)
        }
    }

    resetBlocks() {
        // const blocks = this.blocks.slice()
        const blocks = this.blocks.slice(0, -1).sort(() => Math.random() > 0.5 ? 1 : -1)
        const matrix = []
        for (let i = 0; i < this.row; i++) {
            const rows = []
            for (let j = 0; j < this.col; j++) {
                if (i === this.row - 1 && j === this.col - 1) {
                    rows.push(this.blocks[this.blocks.length - 1])
                    break
                }
                const block = blocks[0]
                block.setPos(j, i)
                rows.push(block)
                blocks.shift()
            }
            matrix.push(rows)
        }

        matrix.forEach((rows, i) => {
            rows.forEach((block, j) => {
                const arrow = {
                    left: rows[j - 1],
                    right: rows[j + 1],
                    top: (matrix[i - 1] || [])[j],
                    bottom: (matrix[i + 1] || [])[j]
                }
                block.setArrow(arrow)
            })
        })
    }

    setSize() {
        const ratio = this.img.width / this.img.height
        let width = 300
        let height = 300
        if (ratio > 1) {
            height = width / ratio
        } else {
            width = height * ratio
        }
        this.width = width
        this.height = height
    }

    changeImage(img) {
        this.img = img
        this.setSize()
        this.render()
        this.clearBlocks()
        this.renderBlocks()
        this.resetBlocks()
        this.clearBoard()
        this.renderBoard()
    }

    changeLevel(row, col) {
        this.row = row
        this.col = col
        this.clearBlocks()
        this.renderBlocks()
        this.resetBlocks()
        this.clearBoard()
        this.renderBoard()
    }

    clearBlocks() {
        this.blocks.forEach(block => {
            if (block instanceof BlockNormal) {
                this.$el.removeChild(block.$el)
            }
        })
        this.blocks = []
    }

    clearBoard() {
        this.$el.removeChild(this.board.$el)
        this.board = null
    }
}
