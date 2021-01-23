export default class LoadingBar {
    constructor(parent) {
        this.progress = 0
        this.parent = parent
        this.frame = document.createElement('div')
        this.bar = document.createElement('div')
    }
}
