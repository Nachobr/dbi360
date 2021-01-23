/**
 * 360/20 = 18 degrees per rotation
 * 18 * 20 total images per minute
 * 360 images per minute
 * divide by 60 to get images per second
 * 360/60 = 6
 * 1000 milliseconds / 6 images per second
 *
 *
 *
 */

var lastTime;

export default class Animator {
  constructor(numberOfImages, rpms = 20, playDelay = 3) {
    this.numberOfImages = numberOfImages;
    this.rpms = rpms; //How often to change photos in seconds
    this.pause = false;
    this.playDelay = playDelay * 1000;
    this.newPlayTime = Date.now();
    this.loopHook = () => {};
    this.init();
  }

  updateHook(callback) {
    this.loopHook = callback;
  }

  init() {
    const self = this;
    var timer = 0;
    var imagesPerMinute = this.numberOfImages * this.rpms;

    var imagesPerSecond = imagesPerMinute / 60;
    var millisecondsBetweenTicks = 1000 / imagesPerSecond;
    function loop(now) {
      if (lastTime === undefined) lastTime = now;
      var deltaTime = now - lastTime;
      lastTime = now;
      timer += deltaTime;
      if (timer >= millisecondsBetweenTicks) {
        timer = 0;
        if (!self.pause) {
          self.loopHook();
        } else {
          if (now > self.newPlayTime) {
            self.pause = false;
          }
        }
      }
      requestAnimationFrame(loop);
    }
    requestAnimationFrame(loop);
  }

  stopLoop() {
    this.newPlayTime = lastTime + this.playDelay;
    this.pause = true;
  }

  startLoop() {
    this.pause = false;
  }
  isPaused() {
    return this.pause;
  }
}
