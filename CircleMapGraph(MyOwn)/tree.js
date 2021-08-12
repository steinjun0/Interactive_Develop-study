import { Circle } from "./circle.js";
import { Line } from "./line.js";
import { Point } from "./point.js";

export class Tree {
  constructor(
    centerPoint,
    stageWidth,
    stageHeight,
    numChild,
    data,
    rotateAngle,
    maxAngle,
    radius
  ) {
    this.centerPoint = centerPoint;
    this.numChild = numChild;
    this.rotateAngle = rotateAngle;
    this.maxAngle = maxAngle;
    this.childBetweenAngle = maxAngle / numChild;
    this.lines = [];
    this.childNode = [];
    this.childAngle = [];
    this.subTrees = [];
    for (let i = 0; i < numChild; i++) {
      this.childAngle[i] = this.rotateAngle - this.childBetweenAngle * (i - 1);
      let childNodeX =
        this.centerPoint.centerDx + radius * Math.cos(this.childAngle[i]);
      let childNodeY =
        this.centerPoint.centerDy + radius * Math.sin(this.childAngle[i]);

      let tempPosition = new Point(
        stageWidth,
        stageHeight,
        childNodeX,
        childNodeY
      );
      this.childNode[i] = new Circle(
        tempPosition,
        data[i].size,
        // "#ff423b",
        data[i].color,
        data[i].name,
        data[i].money
      );
      this.lines[i] = new Line(2, this.centerPoint, tempPosition);
    }
  }
  draw(ctx, isSubtreeOpened) {
    for (let i = 0; i < this.childNode.length; i++) {
      this.lines[i].isShowing = isSubtreeOpened;
      this.lines[i].draw(ctx);
    }
    for (let i = 0; i < this.childNode.length; i++) {
      if (!this.lines[i].isChanging()) {
        this.childNode[i].isShowing = isSubtreeOpened;
        this.childNode[i].draw(ctx);
      }
    }
  }
  resize(stageWidth, stageHeight) {
    for (let i = 0; i < this.childNode.length; i++) {
      this.lines[i].resize(stageWidth, stageHeight);
      this.childNode[i].resize(stageWidth, stageHeight);
    }
  }
  getLineTimeFunction(t) {
    let dx = this.endPoint.x - this.startPoint.x;
    let dy = this.endPoint.y - this.startPoint.y;
    let x = this.startPoint.x + dx * t;
    let y = this.startPoint.y + dy * t;
    return [x, y];
  }
  isChanging() {
    return (
      this.childNode[this.childNode.length - 1].isChanging() ||
      this.lines[this.childNode.length - 1].isChanging()
    );
  }
  isLineGrowingUp() {
    return this.lines[this.childNode.length - 1].isChanging();
  }
  checkClick(e, ctx, stageWidth, stageHeight) {
    // console.log("checkClick", e.clientX);
    for (let i = 0; i < this.childNode.length; i++) {
      if (!this.lines[i].isChanging()) {
        if (
          this.childNode[i].isClicked(
            (e.clientX - ctx.getTransform().e) / ctx.getTransform().d,
            (e.clientY - ctx.getTransform().f) / ctx.getTransform().d,
            stageWidth,
            stageHeight
          )
        ) {
          this.childNode[i].focusOn(ctx, stageWidth, stageHeight);
        }
      }
    }
  }
}
