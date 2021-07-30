export class Circle {
  constructor(stageWidth, stageHeight, centerPoint, radius) {
    this.maxRadius = radius;
    this.radius = 1;
    const diameter = this.radius * 2;
    this.centerPoint = centerPoint;
    this.x = centerPoint.x;
    this.y = centerPoint.y;
    this.scale = 1;
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
  focusUp(ctx, stageWidth, stageHeight) {
    // console.log("focusUp");
    // console.log(stageWidth);
    // console.log(this.radius * 2);
    // console.log(stageWidth < this.radius * 2);

    // for (
    //   let scale = 1;
    //   this.radius * 2 * ctx.getTransform().a * 2 < stageWidth;
    //   scale = 1.1
    // ) {
    //   console.log(scale);
    //   ctx.translate(stageWidth / 2, stageHeight / 2);
    //   ctx.scale(scale, scale);
    //   ctx.translate(-stageWidth / 2, -stageHeight / 2);
    // }
    console.log("stageWidth / 2", stageWidth / 2);
    console.log("this.x", this.x);
    this.scale += 0.001;
    ctx.translate(this.x, this.y);
    ctx.scale(this.scale, this.scale);
    ctx.translate(-this.x, -this.y);
    let absoluteCenterX =
      (stageWidth / 2 - ctx.getTransform().e) / ctx.getTransform().d;
    let absoluteCenterY =
      (stageHeight / 2 - ctx.getTransform().f) / ctx.getTransform().d;
    ctx.translate(
      (absoluteCenterX - this.x) / 10,
      (absoluteCenterY - this.y) / 10
    );
    if (this.radius * 2 * ctx.getTransform().a * 2 < stageWidth) {
      setTimeout(() => {
        this.focusUp(ctx, stageWidth, stageHeight);
      }, 10);
    } else {
      this.scale = 1;
    }
  }
}
