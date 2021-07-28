export class Circle {
  constructor(stageWidth, stageHeight, centerDx, centerDy, radius) {
    this.maxRadius = radius;
    this.radius = 1;
    const diameter = this.radius * 2;
    this.centerDx = centerDx;
    this.centerDy = centerDy;
    this.x = stageWidth / 2 + centerDx;
    this.y = stageHeight / 2 + centerDy;
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
    this.x = stageWidth / 2 + this.centerDx;
    this.y = stageHeight / 2 + this.centerDy;
  }
  growUp() {
    if (this.radius < this.maxRadius) {
      this.radius += this.radius * 0.15;
    }
  }
}
