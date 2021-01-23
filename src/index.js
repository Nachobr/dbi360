import regeneratorRuntime from 'regenerator-runtime'
import UIInject from './Classes/UI/UIInject'
import ImageUploader from './Classes/ImageUploader'
import FileManager from './Classes/FileManager'
import Viewer from './Classes/Viewer'
import Display from './Classes/Display'
import Controller from './Classes/Controller'
import {
    wrapper_id,
    backend_parent_element,
    width,
    height,
    mouse_x,
    mouse_y,
    default_images_per_angle
} from './config.json'

const parentElement = document.querySelector(backend_parent_element)
const uiInject = new UIInject(parentElement, wrapper_id)
const fileInput = uiInject.getConfigInput()
const imageInput = uiInject.getImageInput()
const display = new Display(uiInject.getApp(), width, height)
const ctx = display.getContext()
FileManager.openProject(fileInput).then((jsonc) => {
    console.log(jsonc)
})

const imageUploader = new ImageUploader(imageInput)
imageUploader.onImagesLoaded().then((images) => {
    const viewer = new Viewer(images, default_images_per_angle)
    viewer.startAnimator(ctx, display)
    const controller = new Controller(
        display.getCanvas(),
        viewer,
        mouse_x,
        mouse_y
    )
    controller.engage()
})
