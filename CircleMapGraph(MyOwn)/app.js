import { Circle } from "./circle.js";
import { Point } from "./point.js";
import { Tree } from "./tree.js";
import { Mouse } from "./mouse.js";
class App {
  constructor() {
    this.canvas = document.createElement("canvas");
    document.body.appendChild(this.canvas);
    this.ctx = this.canvas.getContext("2d");
    this.temp = 0;
    this.pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;
    this.mouse = new Mouse();
    this.curItem = null;

    this.items = [];
    this.numSubTree = 7;
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

    document.addEventListener(
      "pointerdown",
      this.mouse.onDown.bind(this.mouse),
      false
    );
    document.addEventListener(
      "pointermove",
      this.mouse.onMove.bind(this.mouse, this.ctx),
      false
    );
    document.addEventListener(
      "pointerup",
      this.mouse.onUp.bind(this.mouse, this.ctx),
      false
    );
    document.addEventListener(
      "wheel",
      this.mouse.onWheel.bind(
        this.mouse,
        this.ctx,
        this.stageWidth,
        this.stageHeight
      ),
      false
    );
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
}

window.onload = () => {
  new App();
};
