import MouseManager from './MouseManager'
export default class Controller {
    constructor(
        parent,
        viewer,
        playDelay = 3,
        xRotateDistance = 50,
        yRotatDistance = 150
    ) {
        this.parent = parent
        this.viewer = viewer
        this.xRotateDistance = xRotateDistance
        this.yRotateDistance = yRotatDistance
        this.mouseManager = new MouseManager(parent)
        this.playDelay = playDelay * 1000
        this.playAgain = Date.now()
    }

    engage() {
        var travelDistance = {
            x: 0,
            y: 0
        }
        this.mouseManager.mouseWheelHook((deltaY) => {
            this.viewer.pause()
            this.playAgain = Date.now() + this.playDelay
            if (deltaY > 0) this.viewer.stepBackward()
            else this.viewer.stepForward()
        })
        this.mouseManager.mouseMoveHook((button) => {
            if (this.mouseManager.isDragging()) {
                travelDistance.x +=
                    this.mouseManager.getLastMousePosition().x -
                    this.mouseManager.getMousePosition().x
                travelDistance.y +=
                    this.mouseManager.getLastMousePosition().y -
                    this.mouseManager.getMousePosition().y
                if (travelDistance.x < -this.xRotateDistance) {
                    travelDistance.x = 0
                    this.viewer.stepBackward()
                } else if (travelDistance.x > this.xRotateDistance) {
                    travelDistance.x = 0
                    this.viewer.stepForward()
                }
                if (travelDistance.y < -this.yRotateDistance) {
                    travelDistance.y = 0
                    this.viewer.tiltDown()
                } else if (travelDistance.y > this.yRotateDistance) {
                    travelDistance.y = 0
                    this.viewer.tiltUp()
                }
                this.viewer.pause()
            }
        })
    }
}
