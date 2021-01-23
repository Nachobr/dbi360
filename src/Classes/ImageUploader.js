var loadedImageArray = []
var files = []
export default class ImageUplaoder {
    constructor(input) {
        this.input = input
        this.files = []
        const self = this
        this.input.onchange = (e) => {
            self.parseInputImages(e)
        }
    }
    nextImage() {
        var file = files[loadedImageArray.length]
        if (file === undefined) return

        //Only pics
        var picReader = new FileReader()
        picReader.addEventListener('load', (e) => {
            this.imageLoading(e)
        })
        //Read the image
        picReader.readAsDataURL(file)
    }
    //Parse all the images from the input whenever we detect new images
    parseInputImages(e) {
        loadedImageArray = []
        const self = this
        if (window.File && window.FileList && window.FileReader) {
            files = e.target.files
            self.nextImage(files)
        } else {
            console.log('Your browser does not support File API')
        }
    }

    imageLoading(e) {
        const self = this
        var { result } = e.target
        var loadingImage = new Image()
        loadingImage.src = result

        loadingImage.onload = (event) => {
            self.loadedImage(event)
        }
    }

    loadedImage(event) {
        loadedImageArray.push(event.target)
        this.nextImage()
    }

    async onImagesLoaded() {
        const self = this
        var timeout
        return new Promise((resolve, reject) => {
            function checkProgress() {
                if (self.getProgress() === 100) {
                    clearTimeout(timeout)
                    console.log(loadedImageArray)
                    resolve(loadedImageArray)
                } else {
                    timeout = setTimeout(checkProgress, 0)
                }
            }
            checkProgress()
        })
    }
    //Getters

    getProgress() {
        var progress = Math.floor(loadedImageArray.length / files.length) * 100
        return progress
    }

    static getLoadedImageArray() {
        return loadedImageArray
    }

    //Setters
}
