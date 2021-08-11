export class Circle {
  constructor(centerPoint, radius, color, cmpName = "", marketCap = "") {
    this.maxRadius = radius;
    this.radius = 1;
    this.color = color;
    const diameter = this.radius * 2;
    this.centerPoint = centerPoint;
    this.x = centerPoint.x;
    this.y = centerPoint.y;
    this.scale = 1;
    this.finishScaleUp = false;
    this.finishMoveOn = false;
    this.cmpName = cmpName;
    this.marketCap = marketCap;
    this.isSubtreeOpened = false;
  }
  draw(ctx) {
    this.growUp();
    // ctx.strokeStyle = "#FBE7C6";
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.save();
    ctx.fillStyle = "#ffffff";
    ctx.font = `100 ${this.radius / 4}px Noto Sans KR`;
    ctx.fillText(this.cmpName, this.x - this.radius * 0.9, this.y);
    ctx.fillText(
      this.marketCap,
      this.x - this.radius * 0.9,
      this.y + this.radius / 4
    );
    ctx.restore();
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
  isClicked(clickX, clickY, stageWidth, stageHeight) {
    function distance(x1, y1, x2, y2) {
      return (x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1);
    }
    if (distance(clickX, clickY, this.x, this.y) < this.radius * this.radius) {
      console.log("isClicked");
      this.isSubtreeOpened = !this.isSubtreeOpened;
      return true;
    } else return false;
  }
  focusOn(ctx, stageWidth, stageHeight) {
    function scaleUP(scale, x, y, radius) {
      scale *= 1.05;
      ctx.translate(x, y);
      ctx.scale(scale, scale);
      ctx.translate(-x, -y);
      return radius * 2 * ctx.getTransform().a * 5 < stageHeight;
    }

    let absoluteCenterX =
      (stageWidth / 2 - ctx.getTransform().e) / ctx.getTransform().d;
    let absoluteCenterY =
      (stageHeight / 2 - ctx.getTransform().f) / ctx.getTransform().d;
    // console.log("absoluteCenterX", absoluteCenterX);
    // console.log("stageWidth / 2", stageWidth / 2);
    // console.log("ctx.getTransform().e", ctx.getTransform().e);
    // console.log("ctx.getTransform().d", ctx.getTransform().d);

    function moveOn(absoluteCenterX, absoluteCenterY, x, y, ctx) {
      console.log(
        "Math.abs(absoluteCenterX - x)",
        Math.abs(absoluteCenterX - x)
      );
      console.log("(absoluteCenterX - x) / 10", (absoluteCenterX - x) / 10);
      // console.log(
      //   "Math.abs(absoluteCenterY - y)",
      //   Math.abs(absoluteCenterY - y)
      // );
      // console.log("absoluteCenterX", absoluteCenterX);
      // console.log("x", x);
      ctx.translate((absoluteCenterX - x) / 10, (absoluteCenterY - y) / 10);
      return (
        Math.abs(absoluteCenterX - x) > 10 || Math.abs(absoluteCenterY - y) > 10
      );
    }
    if (!this.finishScaleUp) {
      this.finishScaleUp = !scaleUP(this.scale, this.x, this.y, this.radius);
    }
    if (!this.finishMoveOn) {
      this.finishMoveOn = !moveOn(
        absoluteCenterX,
        absoluteCenterY,
        this.x,
        this.y,
        ctx
      );
    }
    if (!this.finishScaleUp || !this.finishMoveOn) {
      setTimeout(() => {
        this.focusOn(ctx, stageWidth, stageHeight);
      }, 17);
    } else {
      this.scale = 1;
    }
  }
}
