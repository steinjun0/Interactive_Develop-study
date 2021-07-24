import { Point } from "./point.js";
import { WaveGroup } from "./wavegroup.js";

class App {
  constructor() {
    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext("2d");

    document.body.appendChild(this.canvas);

    this.wavegroup = new WaveGroup();

    window.addEventListener("resize", this.resize.bind(this), false);
    this.resize();

    // this.ball = new Ball(this.stageWidth, this.stageHeight, 60, 10);
    // this.block = new Block(700, 30, 300, 450);

    window.requestAnimationFrame(this.animate.bind(this));
  }

  resize() {
    this.stageWidth = document.body.clientWidth;
    this.stageHeight = document.body.clientHeight;

    this.canvas.width = this.stageWidth * 2;
    this.canvas.height = this.stageHeight * 2;
    this.ctx.scale(2, 2);

    this.wavegroup.resize(this.stageWidth, this.stageHeight);
  }

  animate(t) {
    window.requestAnimationFrame(this.animate.bind(this));
    this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);

    this.wavegroup.draw(this.ctx);
    // this.point.draw(this.ctx, this.stageWidth, this.stageHeight);

    // this.block.draw(this.ctx, this.stageWidth, this.stageHeight);
    // this.ball.draw(this.ctx, this.stageWidth, this.stageHeight, this.block);
  }
}

window.onload = () => {
  new App();
};
