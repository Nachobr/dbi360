export default class UIInject {
    constructor(parent, wrapper_id) {
        this.app = document.createElement('div')
        this.app.id = wrapper_id
        
        this.imageInput = this.addImageInput()
        this.viewsInput = this.addViewsInput()
        //Create a New Display (canvas)
        this.app.appendChild(this.configInput)
        this.app.appendChild(this.imageInput)
        this.app.appendChild(this.viewsInput)
        parent.appendChild(this.app)
    }

    addConfigInput() {
        const configInput = document.createElement('input')
        configInput.type = 'file'
        return configInput
    }
    addImageInput() {
        const imageInput = document.createElement('input')
        imageInput.multiple = true
        imageInput.type = 'file'
        return imageInput
    }
    addViewsInput() {
        const viewInput = document.createElement('input')
        viewInput.type = 'number'
        viewInput.max = 3
        viewInput.min = 1
        viewInput.value = 1
        return viewInput
    }
    getApp() {
        return this.app
    }
    getConfigInput() {
        return this.configInput
    }
    getImageInput() {
        return this.imageInput
    }
}
