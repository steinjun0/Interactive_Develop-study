export class Line {
  constructor(lineWidth, startPoint, endPoint) {
    this.lineWidth = lineWidth;
    this.startPoint = startPoint;
    this.endPoint = endPoint;
    this.x = startPoint.x;
    this.y = startPoint.y;
    this.t = 0;
    this.isShowing = false;
  }
  draw(ctx) {
    ctx.save();
    ctx.globalCompositeOperation = "destination-over";
    ctx.lineWidth = this.lineWidth;
    ctx.beginPath();
    ctx.strokeStyle = "#eb6aff";
    if (this.isShowing) {
      if (this.t < 1) {
        this.t += 0.05;
        [this.x, this.y] = this.getLineTimeFunction(this.t);
      } else {
        this.t = 1;
      }
    } else {
      if (this.t <= 1 && this.t >= 0) {
        this.t -= 0.05;
        [this.x, this.y] = this.getLineTimeFunction(this.t);
      } else {
        this.t = 0;
      }
    }
    ctx.moveTo(this.startPoint.x, this.startPoint.y);
    ctx.lineTo(this.x, this.y);
    ctx.stroke();
    ctx.restore();
  }
  getLineTimeFunction(t) {
    let dx = this.endPoint.x - this.startPoint.x;
    let dy = this.endPoint.y - this.startPoint.y;
    let x = this.startPoint.x + dx * t;
    let y = this.startPoint.y + dy * t;
    return [x, y];
  }
  resize(stageWidth, stageHeight) {
    this.startPoint.resize(stageWidth, stageHeight);
    this.endPoint.resize(stageWidth, stageHeight);
    this.x = this.endPoint.x;
    this.y = this.endPoint.y;
  }
  isChanging() {
    return this.t < 1;
  }
}
