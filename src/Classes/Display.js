export default class Display {
  constructor(parent, width, height) {
    this.parent = parent;
    this.width = width;
    this.height = height;
    this.canvas = document.createElement("canvas");
    this.canvas.width = width;
    this.canvas.height = height;
    this.ctx = this.canvas.getContext("2d");
    this.parent.appendChild(this.canvas);
  }

  //Getters

  getCanvas() {
    return this.canvas;
  }
  getContext() {
    return this.ctx;
  }
  getWidth() {
    return this.width;
  }
  getHeight() {
    return this.height;
  }
}
