// var timer = document.getElementById('timer');
// var toggleBtn = document.getElementById('toggle');
// var resetBtn = document.getElementById('reset');

class Timer {
  constructor() {
    this.on = false;
    this.time = 0;
    this.interval = null;
    this.offset = null;
    this.seconds = 0;
    this.min = 0;
  }

  update() {
    if (this.on) {
      this.time += this.delta();
      const { time } = this;
      this.seconds = new Date(time).getSeconds();
      if (this.seconds === 59) {
        this.min += 1;
      }
    }
  }

  delta() {
    const currentTime = Date.now();
    const timePassed = currentTime - this.offset; // calculate elapsed time in milliseconds
    this.offset = currentTime;

    return timePassed;
  }

  start() {
    if (!this.on) {
      this.interval = setInterval(this.update.bind(this), 1000);
      this.offset = Date.now(); // current time in milliseconds
      this.on = true;
    }
  }

  stop() {
    clearInterval(this.interval);
    this.offset = null;
    this.on = false;
    return {
      minutes: this.min,
      seconds: this.seconds,
    };
  }

  reset() {
    if (!this.isOn) {
      this.time = 0;
      this.update();
    }
  }
}

export default Timer;
