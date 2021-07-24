export class Point {
  constructor(index, x, y) {
    this.x = x;
    this.y = y;
    this.index = index;
    this.fixedY = y;
    this.speed = 0.1;
    this.cur = 0;
    // this.max = Math.random() * 100 + 150;
    this.max = 150;
  }

  update() {
    this.cur += this.speed;
    this.y = this.fixedY + Math.sin(this.cur + this.index) * this.max;
  }
  draw(ctx) {
    ctx.fillStyle = "#FF2222";
    ctx.beginPath();
    ctx.arc(this.x, this.y, 5, 0, 2 * Math.PI);
    ctx.fill();
  }
}
