export class Circle {
  constructor(stageWidth, stageHeight, centerPoint, radius) {
    this.maxRadius = radius;
    this.radius = 1;
    const diameter = this.radius * 2;
    this.centerPoint = centerPoint;
    this.x = centerPoint.x;
    this.y = centerPoint.y;
  }
  draw(ctx) {
    this.growUp();
    // ctx.strokeStyle = "#FBE7C6";
    ctx.fillStyle = "#ff523b";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.fill();
    // ctx.stroke();
  }
  resize(stageWidth, stageHeight) {
    this.centerPoint.resize(stageWidth, stageHeight);
    this.x = this.centerPoint.x;
    this.y = this.centerPoint.y;
  }
  growUp() {
    if (this.radius < this.maxRadius) {
      this.radius += this.radius * 0.15;
    }
  }
  isGrowingUp() {
    if (this.radius < this.maxRadius) return true;
    else return false;
  }
}
