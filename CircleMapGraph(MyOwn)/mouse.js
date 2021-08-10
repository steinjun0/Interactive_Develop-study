import { Point } from "./point.js";
export class Mouse {
  constructor(pixelRatio) {
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
    this.pixelRatio = pixelRatio;
  }
  resize(pixelRatio) {
    this.pixelRatio = pixelRatio;
  }
  getPixelComputedPos(e) {
    let mousePos = { clientX: 0, clientY: 0 };
    mousePos.clientX = this.pixelRatio * e.clientX;
    mousePos.clientY = this.pixelRatio * e.clientY;
    return mousePos;
  }
  onDown(e) {
    let mousePos = this.getPixelComputedPos(e);
    this.mouseClickPos.setPos(mousePos.clientX, mousePos.clientY);
    this.isMouseClicked = true;
  }

  onMove(ctx, e) {
    let mousePos = this.getPixelComputedPos(e);
    if (this.isMouseClicked === true) {
      if (this.mousePrevPos === null) {
        this.mousePrevPos = this.mouseClickPos;
      }
      let dx = mousePos.clientX - this.mousePrevPos.x;
      let dy = mousePos.clientY - this.mousePrevPos.y;
      dx /= ctx.getTransform().a;
      dy /= ctx.getTransform().a;
      this.mousePrevPos.setPos(mousePos.clientX, mousePos.clientY);
      this.ctxOrigin = { x: this.ctxOrigin.x + dx, y: this.ctxOrigin.y + dy };
      ctx.translate(dx, dy);
    }
  }

  onUp() {
    this.isMouseClicked = false;
    this.mousePrevPos = null;
  }
  onWheel(ctx, stageWidth, stageHeight, e) {
    console.log("ctx.getTransform()", ctx.getTransform());
    console.log("ctx.getTransform().a", ctx.getTransform().a);
    let scale = 1;
    let transX = (stageWidth / 2 - ctx.getTransform().e) / ctx.getTransform().a;
    let transY =
      (stageHeight / 2 - ctx.getTransform().f) / ctx.getTransform().a;
    ctx.translate(transX, transY);
    if (e.deltaY < 0) {
      scale = 1.1;
      ctx.scale(1.1, 1.1);
    } else {
      scale = 0.9;
      ctx.scale(0.9, 0.9);
    }
    ctx.translate(-transX, -transY);
    console.log((stageWidth / 2 - ctx.getTransform().e) / ctx.getTransform().a);
  }
}
