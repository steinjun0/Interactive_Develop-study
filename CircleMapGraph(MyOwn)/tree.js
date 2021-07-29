import { Circle } from "./circle.js";
import { Line } from "./line.js";
import { Point } from "./point.js";

export class Tree {
  constructor(
    centerPoint,
    stageWidth,
    stageHeight,
    numChild,
    size,
    rotateAngle,
    radius
  ) {
    this.centerPoint = centerPoint;
    this.numChild = numChild;
    this.rotateAngle = rotateAngle;
    this.parentNode = new Circle(
      stageWidth,
      stageHeight,
      this.centerPoint,
      size
    );
    this.lines = [];
    this.childNode = [];
    for (let i = 0; i < numChild; i++) {
      let childNodeX =
        this.centerPoint.centerDx +
        radius *
          Math.cos(
            rotateAngle + (Math.PI / 4) * ((i - numChild / 2) / (numChild / 2))
          );
      let childNodeY =
        this.centerPoint.centerDy +
        radius *
          Math.sin(
            rotateAngle + (Math.PI / 4) * ((i - numChild / 2) / (numChild / 2))
          );

      let tempPosition = new Point(
        stageWidth,
        stageHeight,
        childNodeX,
        childNodeY
      );
      this.childNode[i] = new Circle(
        stageWidth,
        stageHeight,
        tempPosition,
        size / 2
      );
      this.lines[i] = new Line(2, this.centerPoint, tempPosition);
    }
  }
  draw(ctx) {
    for (let i = 0; i < this.childNode.length; i++) {
      this.lines[i].draw(ctx);
    }
    // this.parentNode.draw(ctx);
    for (let i = 0; i < this.childNode.length; i++) {
      if (!this.lines[i].isGrowingUp()) {
        this.childNode[i].draw(ctx);
      }
    }
  }
  getLineTimeFunction(t) {
    let dx = this.endPoint.x - this.startPoint.x;
    let dy = this.endPoint.y - this.startPoint.y;
    let x = this.startPoint.x + dx * t;
    let y = this.startPoint.y + dy * t;
    return [x, y];
  }
}
