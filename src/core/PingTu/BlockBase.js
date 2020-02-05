export default class BlockBase {
    constructor() {
        this.arrow = {
            left: undefined,
            top: undefined,
            right: undefined,
            bottom: undefined
        }
    }

    setArrow({ left, right, top, bottom }) {
        this.arrow = { left, right, top, bottom }
    }
}
