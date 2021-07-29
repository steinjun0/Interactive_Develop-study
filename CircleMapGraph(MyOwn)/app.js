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
    this.scale = 1;
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
    this.numSubTree = 0;
    this.circles = [];
    this.lines = [];
    this.trees = [];
    this.subTrees = [[]];
    let j = 0;
    this.parentNode = new Circle(
      document.body.clientWidth,
      document.body.clientHeight,
      new Point(document.body.clientWidth, document.body.clientHeight, 0, 0),
      100
    );
    for (let i = 0; i < 1; i++) {
      this.trees[i] = new Tree(
        new Point(document.body.clientWidth, document.body.clientHeight, 0, 0),
        document.body.clientWidth,
        document.body.clientHeight,
        this.numSubTree,
        25,
        ((2 * Math.PI) / this.numSubTree) * i,
        Math.PI / 0.5,
        200
      );
      this.subTrees[i] = [];
      for (j = 0; j < this.numSubTree; j++) {
        console.log("this.trees[i].childAngle[j]", this.trees[i].childAngle[j]);
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
          this.trees[i].childAngle[j],
          Math.PI / 2,
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
    document.addEventListener("wheel", this.onWheel.bind(this), false);
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

    this.parentNode.resize(this.stageWidth, this.stageHeight);
    for (let i = 0; i < this.trees.length; i++) {
      this.trees[i].resize(this.stageWidth, this.stageHeight);
      if (!this.trees[i].isLineGrowingUp()) {
        for (let j = 0; j < this.subTrees[i].length; j++) {
          this.subTrees[i][j].resize(this.stageWidth, this.stageHeight);
        }
      }
      // for (let j = 0; j < this.subTrees[i].length; j++) {
      //   this.subTrees[i][j].draw(this.ctx);
      // }
    }
  }

  animate() {
    window.requestAnimationFrame(this.animate.bind(this));
    this.ctx.clearRect(
      -this.stageWidth * 20,
      -this.stageHeight * 20,
      this.stageWidth * 40,
      this.stageHeight * 40
    );
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
      dx /= this.scale;
      dy /= this.scale;
      this.mousePrevPos.setPos(e.clientX, e.clientY);
      this.ctxOrigin = { x: this.ctxOrigin.x + dx, y: this.ctxOrigin.y + dy };
      this.ctx.translate(dx, dy);
    }
  }

  onUp(e) {
    this.isMouseClicked = false;
    this.mousePrevPos = null;
  }
  onWheel(e) {
    let scale = 1;
    if (e.deltaY < 0) {
      scale = 1.1;
      this.scale *= 1.1;
    } else {
      scale = 0.9;
      this.scale *= 0.9;
    }
    this.ctx.translate(this.stageWidth / 2, this.stageHeight / 2);
    this.ctx.scale(scale, scale);
    this.ctx.translate(-this.stageWidth / 2, -this.stageHeight / 2);
  }
}

window.onload = () => {
  new App();
};
