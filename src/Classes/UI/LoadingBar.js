import { addStyle } from './Styler'
export default class LoadingBar {
    constructor(parent, { frame, bar }) {
        this.progress = 0
        this.parent = parent
        this.frame = document.createElement('div')
        this.bar = document.createElement('div')
        addStyle(this.frame, frame)
        addStyle(this.bar, bar)
    }
}
