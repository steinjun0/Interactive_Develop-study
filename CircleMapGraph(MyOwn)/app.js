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
    this.temp = 0;
    this.pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;

    this.mousePos = new Point(
      document.body.clientWidth,
      document.body.clientHeight,
      0,
      0
    );
    this.mousePrevPos = null;
    this.mouseClickPos = new Point(
      document.body.clientWidth,
      document.body.clientHeight,
      0,
      0
    );
    this.isMouseClicked = false;
    this.ctxOrigin = { x: 0, y: 0 };
    this.curItem = null;

    this.items = [];
    this.numSubTree = 3;
    this.circles = [];
    this.lines = [];
    this.trees = [];
    this.subTrees = [[]];
    let j = 0;
    this.parentNode = new Circle(
      document.body.clientWidth,
      document.body.clientHeight,
      new Point(document.body.clientWidth, document.body.clientHeight, 0, 0),
      25
    );
    for (let i = 0; i < this.numSubTree; i++) {
      this.trees[i] = new Tree(
        new Point(document.body.clientWidth, document.body.clientHeight, 0, 0),
        document.body.clientWidth,
        document.body.clientHeight,
        3,
        25,
        (Math.PI / 1.5) * i,
        200
      );
      this.subTrees[i] = [];
      for (j = 0; j < 3; j++) {
        this.subTrees[i][j] = new Tree(
          new Point(
            document.body.clientWidth,
            document.body.clientHeight,
            this.trees[i].childNode[j].x - document.body.clientWidth / 2,
            this.trees[i].childNode[j].y - document.body.clientHeight / 2
          ),
          document.body.clientWidth,
          document.body.clientHeight,
          3,
          12.5,
          (Math.PI / 1.5) * i,
          200
        );
      }
    }

    window.addEventListener("resize", this.resize.bind(this), false);
    this.resize();
    window.requestAnimationFrame(this.animate.bind(this));

    document.addEventListener("pointerdown", this.onDown.bind(this), false);
    document.addEventListener("pointermove", this.onMove.bind(this), false);
    document.addEventListener("pointerup", this.onUp.bind(this), false);
  }

  resize() {
    this.stageWidth = document.body.clientWidth;
    this.stageHeight = document.body.clientHeight;

    this.canvas.width = this.stageWidth * this.pixelRatio;
    this.canvas.height = this.stageHeight * this.pixelRatio;
    this.ctx.scale(this.pixelRatio, this.pixelRatio);

    this.ctx.shadowOffsetX = 0;
    this.ctx.shadowOffsetY = 3;
    this.ctx.shadowBlur = 6;
    this.ctx.shadowColor = `rgba(0,0,0,0.5)`;
  }

  animate() {
    window.requestAnimationFrame(this.animate.bind(this));
    this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);
    this.parentNode.draw(this.ctx);
    for (let i = 0; i < this.trees.length; i++) {
      this.trees[i].draw(this.ctx);
      if (!this.trees[i].isLineGrowingUp()) {
        for (let j = 0; j < this.subTrees[i].length; j++) {
          this.subTrees[i][j].draw(this.ctx);
        }
      }
      // for (let j = 0; j < this.subTrees[i].length; j++) {
      //   this.subTrees[i][j].draw(this.ctx);
      // }
    }
  }

  onDown(e) {
    this.mouseClickPos.setPos(e.clientX, e.clientY);
    console.log("mouse click!!!", this.mouseClickPos);
    this.isMouseClicked = true;
  }

  onMove(e) {
    if (this.isMouseClicked === true) {
      if (this.mousePrevPos === null) {
        this.mousePrevPos = this.mouseClickPos;
      }
      let dx = e.clientX - this.mousePrevPos.x;
      let dy = e.clientY - this.mousePrevPos.y;
      this.mousePrevPos.setPos(e.clientX, e.clientY);
      this.ctxOrigin = { x: this.ctxOrigin.x + dx, y: this.ctxOrigin.y + dy };
      console.log("mouse move!!", dx, dy);
      this.ctx.translate(dx, dy);
    }
  }

  onUp(e) {
    this.isMouseClicked = false;
    this.mousePrevPos = null;
  }
}

window.onload = () => {
  new App();
};
