export class Point {
  constructor(stageWidth, stageHeight, centerDx, centerDy) {
    this.x = stageWidth / 2 + centerDx;
    this.y = stageHeight / 2 + centerDy;
    this.centerDx = centerDx;
    this.centerDy = centerDy;
  }
  resize(stageWidth, stageHeight) {
    this.x = stageWidth / 2 + this.centerDx;
    this.y = stageHeight / 2 + this.centerDy;
  }
}
