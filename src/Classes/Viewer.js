import Animator from './Animator'
import { rpms, play_delay, width, height } from '../config.json'
export default class Viewer {
    constructor(imageArray, numberOfImagesPerView) {
        this.imageArray = imageArray
        this.numberOfImagesPerView = numberOfImagesPerView
        this.imageViewsArray = []
        this.buildViews()
    }

    buildViews() {
        var imageIndex = 0
        var imageViewIndex = 0
        var actualImageIndex = 0
        this.imageViewsArray[imageViewIndex] = []
        while (actualImageIndex < this.imageArray.length) {
            if (imageIndex === this.numberOfImagesPerView) {
                imageIndex = 0
                imageViewIndex++
                this.imageViewsArray[imageViewIndex] = []
            }
            this.imageViewsArray[imageViewIndex][imageIndex] = this.imageArray[
                actualImageIndex
            ]

            imageIndex++
            actualImageIndex++
        }
    }

    startAnimator(ctx, display) {
        const self = this
        self.ctx = ctx
        self.display = display
        self.animate = new Animator(
            self.numberOfImagesPerView,
            rpms,
            play_delay
        )
        self.currentImageIndex = 0
        self.currentViewIndex = 0
        self.animate.updateHook(() => {
            self.draw()
            self.currentImageIndex++
            if (self.currentImageIndex === self.numberOfImagesPerView)
                self.currentImageIndex = 0
        })
    }
    draw() {
        var imageToDraw = this.imageViewsArray[this.currentViewIndex][
            this.currentImageIndex
        ]

        var drawRatio
        if (imageToDraw.width > imageToDraw.height) {
            drawRatio = width / imageToDraw.width
        } else {
            drawRatio = height / imageToDraw.height
        }
        var drawHeight = imageToDraw.height * drawRatio
        var drawWidth = imageToDraw.width * drawRatio
        this.ctx.drawImage(imageToDraw, 0, 0, drawWidth, drawHeight)
    }
    getCurrentView() {
        return this.currentViewIndex
    }
    getTotalViews() {
        return this.imageViewsArray.length
    }
    getTotalImagesPerView() {
        return this.imageViewsArray[0].length
    }
    getCurrentIndex() {
        return this.currentImageIndex
    }
    setView(view) {
        this.currentViewIndex = view
    }
    setImageIndex(index) {
        this.currentImageIndex = index
    }
    pause() {
        this.animate.stopLoop()
    }
    isPaused() {
        return this.animate.isPaused()
    }
    startplay() {
        this.animate.startLoop()
    }
    stepForward() {
        this.currentImageIndex++
        if (this.currentImageIndex === this.numberOfImagesPerView)
            this.currentImageIndex = 0
        this.draw()
    }
    stepBackward() {
        this.currentImageIndex--
        if (this.currentImageIndex < 0)
            this.currentImageIndex = this.numberOfImagesPerView - 1
        this.draw()
    }
    tiltUp() {
        this.currentViewIndex--
        if (this.currentViewIndex < 0) this.currentViewIndex = 0
        this.draw()
    }
    tiltDown() {
        this.currentViewIndex++
        if (this.currentViewIndex >= this.imageViewsArray.length)
            this.currentViewIndex = this.imageViewsArray.length - 1
        this.draw()
    }
}
