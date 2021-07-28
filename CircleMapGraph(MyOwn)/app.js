// import { Point } from './point.js';
// import { Dialog } from './dialog.js';
import { Circle } from "./circle.js";
class App {
  constructor() {
    this.canvas = document.createElement("canvas");
    document.body.appendChild(this.canvas);
    this.ctx = this.canvas.getContext("2d");

    this.pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;

    // this.mousePos = new Point();
    this.curItem = null;

    this.items = [];
    this.total = 3;

    // for (let i = 0; i < this.total; i++) {
    //     this.items[i] = new Dialog();
    // }
    this.circles = [];
    this.positions = [
      { x: 0, y: -86.6 },
      { x: -100, y: 86.6 },
      { x: 100, y: 86.6 },
    ];
    for (let i = 0; i < this.total; i++) {
      this.circles[i] = new Circle(
        document.body.clientWidth,
        document.body.clientHeight,
        this.positions[i].x,
        this.positions[i].y,
        50
      );
    }

    window.addEventListener("resize", this.resize.bind(this), false);
    this.resize();
    window.requestAnimationFrame(this.animate.bind(this));

    // document.addEventListener('pointerdown', this.onDown.bind(this), false);
    // document.addEventListener('pointermove', this.onMove.bind(this), false);
    // document.addEventListener('pointerup', this.onUp.bind(this), false);
  }

  resize() {
    this.stageWidth = document.body.clientWidth;
    this.stageHeight = document.body.clientHeight;

    this.canvas.width = this.stageWidth * this.pixelRatio;
    this.canvas.height = this.stageHeight * this.pixelRatio;
    this.ctx.scale(this.pixelRatio, this.pixelRatio);
    // this.circle1.resize(this.stageWidth, this.stageHeight);
    // this.circle2.resize(this.stageWidth, this.stageHeight);
    // this.circle3.resize(this.stageWidth, this.stageHeight);
    this.ctx.shadowOffsetX = 0;
    this.ctx.shadowOffsetY = 3;
    this.ctx.shadowBlur = 6;
    this.ctx.shadowColor = `rgba(0,0,0,0.5)`;

    for (let i = 0; i < this.circles.length; i++) {
      this.circles[i].resize(this.stageWidth, this.stageHeight);
    }
  }

  animate() {
    window.requestAnimationFrame(this.animate.bind(this));

    this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);
    // this.circle1.draw(this.ctx);
    // this.circle2.draw(this.ctx);
    // this.circle3.draw(this.ctx);
    this.ctx.save();
    this.ctx.shadowColor = "rgba(0,0,0,0)";
    this.ctx.lineWidth = 2;
    this.ctx.beginPath();
    this.ctx.strokeStyle = "#eb6aff";
    this.ctx.moveTo(
      this.stageWidth / 2 + this.positions[0].x,
      this.stageHeight / 2 + this.positions[0].y
    );
    this.ctx.lineTo(
      this.stageWidth / 2 + this.positions[1].x,
      this.stageHeight / 2 + this.positions[1].y
    );
    this.ctx.lineTo(
      this.stageWidth / 2 + this.positions[2].x,
      this.stageHeight / 2 + this.positions[2].y
    );
    this.ctx.lineTo(
      this.stageWidth / 2 + this.positions[0].x,
      this.stageHeight / 2 + this.positions[0].y
    );
    // this.ctx.fill();
    this.ctx.stroke();
    this.ctx.closePath();
    this.ctx.restore();
    for (let i = 0; i < this.circles.length; i++) {
      this.circles[i].draw(this.ctx);
    }

    // if (this.curItem) {
    //     this.ctx.fillStyle = `#ff4338`;
    //     this.ctx.strokeStyle = `#ff4338`;

    //     this.ctx.beginPath();
    //     this.ctx.arc(this.mousePos.x, this.mousePos.y, 8, Math.PI * 0, Math.PI * 2);
    //     this.ctx.fill();

    //     this.ctx.beginPath();
    //     this.ctx.arc(this.curItem.centerPos.x, this.curItem.centerPos.y, 8, 0, Math.PI * 2);
    //     this.ctx.fill();

    //     this.ctx.beginPath();
    //     this.ctx.moveTo(this.mousePos.x, this.mousePos.y);
    //     this.ctx.lineTo(this.curItem.centerPos.x, this.curItem.centerPos.y);
    //     this.ctx.stroke();
    // }
  }

  onDown(e) {
    // this.mousePos.x = e.clientX;
    // this.mousePos.y = e.clientY;
    // for (let i = this.items.length - 1; i >= 0; i--) {
    //     const item = this.items[i].down(this.mousePos.clone());
    //     if (item) {
    //         this.curItem = item;
    //         const index = this.items.indexOf(item);
    //         this.items.push(this.items.splice(index, 1)[0]);
    //         break;
    //     }
    // }
  }

  onMove(e) {
    // this.mousePos.x = e.clientX;
    // this.mousePos.y = e.clientY;
    // for (let i = 0; i < this.items.length; i++) {
    //     this.items[i].move(this.mousePos.clone());
    // }
  }

  onUp(e) {
    // this.curItem = null;
    // for (let i = 0; i < this.items.length; i++) {
    //     this.items[i].up();
    // }
  }
}

window.onload = () => {
  new App();
};
