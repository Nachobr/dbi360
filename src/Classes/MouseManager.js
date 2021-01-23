var mouseMoveEvents = []
var mouseWheelEvents = []
var mouseDownEvents = []
var mouseUpEvents = []
var mousePosition = { x: 0, y: 0 }
var lastMousePosition = { x: 0, y: 0 }
var mouseStartPosition = { ...mousePosition }
var mouseEndPosition = { ...mousePosition }
var mouseDragging = false

function mouseMove({ target, clientX, clientY }) {
    var rect = target.getBoundingClientRect()
    lastMousePosition = mousePosition
    mousePosition = {
        x: clientX - rect.left,
        y: clientY - rect.top
    }

    mouseMoveEvents.forEach((mouseEventCallback) => {
        mouseEventCallback(mousePosition)
    })
}
function mouseWheel(event) {
    event.preventDefault()
    mouseWheelEvents.forEach((mouseEventCallback) => {
        mouseEventCallback(event.deltaY)
    })
}
function mouseDown(e) {
    const { button } = e
    e.preventDefault()
    mouseDragging = true
    mouseStartPosition = mousePosition
    mouseDownEvents.forEach((mouseEventCallback) => {
        mouseEventCallback(button)
    })
}
function mouseUp({ button }) {
    mouseDragging = false
    mouseEndPosition = mousePosition
    mouseUpEvents.forEach((mouseEventCallback) => {
        mouseEventCallback(button)
    })
}

export default class MouseManager {
    constructor(canvas) {
        this.canvas = canvas
        document.addEventListener('mousemove', mouseMove)
        canvas.addEventListener('wheel', mouseWheel)
        canvas.addEventListener('mousedown', mouseDown)
        document.addEventListener('mouseup', mouseUp)
    }
    mouseMoveHook(callback) {
        mouseMoveEvents.push(callback)
    }
    mouseDownHook(callback) {
        triggerxDistance = 0
        triggeryDistance = 0
        mouseDownEvents.push(callback)
    }
    mouseUpHook(callback) {
        mouseUpEvents.push(callback)
    }
    mouseWheelHook(callback) {
        mouseWheelEvents.push(callback)
    }
    getMousePosition() {
        return mousePosition
    }
    getLastMousePosition() {
        return lastMousePosition
    }
    getDistance() {
        var xdist = mouseStartPosition.x - mousePosition.x
        var ydist = mouseStartPosition.y - mousePosition.y
        return Math.sqrt(xdist * xdist + ydist * ydist)
    }
    getxDirection() {
        if (lastMousePosition.x > mousePosition.x) return -1
        return 1
    }
    getyDirection() {
        if (lastMousePosition.y > mousePosition.y) return -1
        return 1
    }
    isDragging() {
        return mouseDragging
    }
}
