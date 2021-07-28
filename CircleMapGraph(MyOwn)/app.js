// import { Point } from './point.js';
// import { Dialog } from './dialog.js';
import { Circle } from "./circle.js";
import { Line } from "./line.js";
import { Point } from "./point.js";
import { Tree } from "./tree.js";
class App {
  constructor() {
    this.canvas = document.createElement("canvas");
    document.body.appendChild(this.canvas);
    this.ctx = this.canvas.getContext("2d");

    this.pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;

    // this.mousePos = new Point();
    this.curItem = null;

    this.items = [];
    this.total = 3;

    // for (let i = 0; i < this.total; i++) {
    //     this.items[i] = new Dialog();
    // }
    this.circles = [];
    this.lines = [];
    this.trees = [];
    // this.tree = new Tree(
    //   new Point(document.body.clientWidth, document.body.clientHeight, 0, 0),
    //   document.body.clientWidth,
    //   document.body.clientHeight,
    //   5,
    //   Math.PI * 0,
    //   150
    // );
    this.positions = [
      new Point(
        document.body.clientWidth,
        document.body.clientHeight,
        0,
        -86.6
      ),
      new Point(
        document.body.clientWidth,
        document.body.clientHeight,
        -100,
        86.6
      ),
      new Point(
        document.body.clientWidth,
        document.body.clientHeight,
        100,
        86.6
      ),
    ];
    for (let i = 0; i < this.total; i++) {
      this.trees[i] = new Tree(
        new Point(document.body.clientWidth, document.body.clientHeight, 0, 0),
        document.body.clientWidth,
        document.body.clientHeight,
        3,
        (Math.PI / 1.5) * i,
        200
      );
    }
    for (let i = 0; i < this.total; i++) {
      this.circles[i] = new Circle(
        document.body.clientWidth,
        document.body.clientHeight,
        this.positions[i],
        50
      );
    }
    for (let i = 0; i < this.total; i++) {
      this.lines[i] = new Line(
        2,
        this.positions[i],
        this.positions[i + 1] ? this.positions[i + 1] : this.positions[0],
        50
      );
    }

    window.addEventListener("resize", this.resize.bind(this), false);
    this.resize();
    window.requestAnimationFrame(this.animate.bind(this));

    // document.addEventListener('pointerdown', this.onDown.bind(this), false);
    // document.addEventListener('pointermove', this.onMove.bind(this), false);
    // document.addEventListener('pointerup', this.onUp.bind(this), false);
  }

  resize() {
    this.stageWidth = document.body.clientWidth;
    this.stageHeight = document.body.clientHeight;

    this.canvas.width = this.stageWidth * this.pixelRatio;
    this.canvas.height = this.stageHeight * this.pixelRatio;
    this.ctx.scale(this.pixelRatio, this.pixelRatio);
    // this.circle1.resize(this.stageWidth, this.stageHeight);
    // this.circle2.resize(this.stageWidth, this.stageHeight);
    // this.circle3.resize(this.stageWidth, this.stageHeight);
    this.ctx.shadowOffsetX = 0;
    this.ctx.shadowOffsetY = 3;
    this.ctx.shadowBlur = 6;
    this.ctx.shadowColor = `rgba(0,0,0,0.5)`;

    for (let i = 0; i < this.circles.length; i++) {
      this.circles[i].resize(this.stageWidth, this.stageHeight);
    }
    for (let i = 0; i < this.lines.length; i++) {
      this.lines[i].resize(this.stageWidth, this.stageHeight);
    }
  }

  animate() {
    window.requestAnimationFrame(this.animate.bind(this));

    this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);
    if (!this.circles[0].isGrowingUp()) {
      for (let i = 0; i < this.lines.length; i++) {
        // this.lines[i].draw(this.ctx);
      }
    }
    for (let i = 0; i < this.circles.length; i++) {
      // this.circles[i].draw(this.ctx);
    }

    for (let i = 0; i < this.trees.length; i++) {
      this.trees[i].draw(this.ctx);
    }
  }

  onDown(e) {
    // this.mousePos.x = e.clientX;
    // this.mousePos.y = e.clientY;
    // for (let i = this.items.length - 1; i >= 0; i--) {
    //     const item = this.items[i].down(this.mousePos.clone());
    //     if (item) {
    //         this.curItem = item;
    //         const index = this.items.indexOf(item);
    //         this.items.push(this.items.splice(index, 1)[0]);
    //         break;
    //     }
    // }
  }

  onMove(e) {
    // this.mousePos.x = e.clientX;
    // this.mousePos.y = e.clientY;
    // for (let i = 0; i < this.items.length; i++) {
    //     this.items[i].move(this.mousePos.clone());
    // }
  }

  onUp(e) {
    // this.curItem = null;
    // for (let i = 0; i < this.items.length; i++) {
    //     this.items[i].up();
    // }
  }
}

window.onload = () => {
  new App();
};
