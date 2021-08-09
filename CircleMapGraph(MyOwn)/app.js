import { Circle } from "./circle.js";
import { Point } from "./point.js";
import { Tree } from "./tree.js";
import { Mouse } from "./mouse.js";
class App {
  constructor() {
    this.canvas = document.createElement("canvas");
    document.body.appendChild(this.canvas);
    this.ctx = this.canvas.getContext("2d");
    this.temp = 0;
    this.pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;
    this.mouse = new Mouse();
    this.curItem = null;

    this.numParent = 1; // 중앙 노드의 개수(추후 중앙 노드가 여러 개 생길 수 있기 때문에 변수를 미리 생성)
    this.numSubTree = 7; // 중앙 노드가 가질 subTree의 개수
    this.mainTrees = []; // 중앙 노드의 tree
    this.mainTreesData = [
      [
        { size: 10 },
        { size: 20 },
        { size: 42 },
        { size: 12 },
        { size: 27 },
        { size: 8 },
        { size: 10 },
      ],
    ];
    this.subTrees = [[]]; // 중앙 노드가 가질 subTree들
    this.subTreesData = [
      [
        [{ size: 10 }, { size: 4 }, { size: 9 }],
        [{ size: 4 }, { size: 15 }, { size: 6 }],
        [{ size: 10 }, { size: 6 }, { size: 10 }],
        [{ size: 3 }, { size: 5 }, { size: 8 }],
        [{ size: 10 }, { size: 17 }, { size: 10 }],
        [{ size: 4 }, { size: 8 }, { size: 10 }],
        [{ size: 13 }, { size: 10 }, { size: 9 }],
      ],
    ];
    let j,
      i = 0; // for문에 사용될 변수들

    // 중앙 노드 생성(최초 시작하는 tree이기 때문에, 최고 parent node는 직접 생성해 주어야한다.)
    // (Tree는 parent노드가 없고, child nodes와 branch만 가지고 있다)
    this.parentNode = new Circle(
      new Point(document.body.clientWidth, document.body.clientHeight, 0, 0),
      100,
      "#621bff"
    );

    for (i = 0; i < this.numParent; i++) {
      // 중앙 노드의 tree 선언(추후 중앙 노드가 여러 개 생길 수 있기 때문에 for문으로 생성)
      this.mainTrees[i] = new Tree(
        new Point(document.body.clientWidth, document.body.clientHeight, 0, 0),
        document.body.clientWidth,
        document.body.clientHeight,
        this.numSubTree,
        this.mainTreesData[i],
        ((2 * Math.PI) / this.numSubTree) * i,
        Math.PI / 0.5,
        200
      );
      // subTrees 객체 생성
      this.subTrees[i] = [];
      for (j = 0; j < this.numSubTree; j++) {
        this.subTrees[i][j] = new Tree(
          new Point(
            document.body.clientWidth,
            document.body.clientHeight,
            this.mainTrees[i].childNode[j].x - document.body.clientWidth / 2,
            this.mainTrees[i].childNode[j].y - document.body.clientHeight / 2
          ),
          document.body.clientWidth,
          document.body.clientHeight,
          3,
          this.subTreesData[i][j],
          this.mainTrees[i].childAngle[j],
          Math.PI / 2,
          200
        );
      }
    }

    // 화면 사이즈에 반응하도록 listener 설정
    window.addEventListener("resize", this.resize.bind(this), false);
    this.resize();

    // 마우스 이벤트 연결
    document.addEventListener(
      "pointerdown",
      this.mouse.onDown.bind(this.mouse),
      false
    );
    document.addEventListener(
      "pointerdown",
      this.focusOnNode.bind(this),
      false
    );

    // for (let i = 0; i < this.numParent; i++) {
    //   for (let j = 0; j < this.numSubTree; j++) {
    //     document.addEventListener(
    //       "pointerdown",
    //       this.subTrees[i][j].checkClick(
    //         this.subTrees[i][j],
    //         this.ctx,
    //         this.stageWidth,
    //         this.stageHeight
    //       ),
    //       false
    //     );
    //   }
    // }

    document.addEventListener(
      "pointermove",
      this.mouse.onMove.bind(this.mouse, this.ctx),
      false
    );
    document.addEventListener(
      "pointerup",
      this.mouse.onUp.bind(this.mouse, this.ctx),
      false
    );
    document.addEventListener(
      "wheel",
      this.mouse.onWheel.bind(
        this.mouse,
        this.ctx,
        this.stageWidth,
        this.stageHeight
      ),
      false
    );

    // 애니메이션 시작
    window.requestAnimationFrame(this.animate.bind(this));
  }

  // 화면 크기에 맞춰서 반응시키는 코드
  resize() {
    // document 사이즈를 화면 사이즈로 가져온다.
    // 추후 vue에 넣거나 document.body에 다른 항목을 추가하게 된다면 변경해야함
    this.stageWidth = document.body.clientWidth;
    this.stageHeight = document.body.clientHeight;

    // 픽셀 비율에 맞춰서 canvas의 픽셀 개수를 설정
    this.canvas.width = this.stageWidth * this.pixelRatio;
    this.canvas.height = this.stageHeight * this.pixelRatio;
    // 그에 맞춰서 scale up(scale up 해도 화면에 보여지는 픽셀의 수는 같은가? *2 한다고 픽셀 개수가 절반이 되지 않는가?)
    this.ctx.scale(this.pixelRatio, this.pixelRatio);

    // canvas context에 그림자 설정
    this.ctx.shadowOffsetX = 0;
    this.ctx.shadowOffsetY = 3;
    this.ctx.shadowBlur = 6;
    this.ctx.shadowColor = `rgba(0,0,0,0.5)`;

    // 중앙 노드(Circle 객체), mainTree, subTrees resize
    // 즉 화면에 그려진 모든 객체들 resize함수 실행
    this.parentNode.resize(this.stageWidth, this.stageHeight);
    for (let i = 0; i < this.mainTrees.length; i++) {
      this.mainTrees[i].resize(this.stageWidth, this.stageHeight);
      if (!this.mainTrees[i].isLineGrowingUp()) {
        for (let j = 0; j < this.subTrees[i].length; j++) {
          this.subTrees[i][j].resize(this.stageWidth, this.stageHeight);
        }
      }
      // for (let j = 0; j < this.subTrees[i].length; j++) {
      //   this.subTrees[i][j].draw(this.ctx);
      // }
    }
  }

  animate() {
    window.requestAnimationFrame(this.animate.bind(this)); // 재귀 함수 형태의 animation 함수
    // 이전 프레임을 지우기 위한 clearRect
    // canvas의 중심이 이동하기 때문에 넓은 범위로 삭제함
    this.ctx.clearRect(
      -this.stageWidth * 2000,
      -this.stageHeight * 2000,
      this.stageWidth * 4000,
      this.stageHeight * 4000
    );

    // canvas의 모든 객체 draw
    this.parentNode.draw(this.ctx);
    for (let i = 0; i < this.mainTrees.length; i++) {
      this.mainTrees[i].draw(this.ctx);
      if (!this.mainTrees[i].isLineGrowingUp()) {
        for (let j = 0; j < this.subTrees[i].length; j++) {
          this.subTrees[i][j].draw(this.ctx);
        }
      }
      // for (let j = 0; j < this.subTrees[i].length; j++) {
      //   this.subTrees[i][j].draw(this.ctx);
      // }
    }
    // console.log("e f", this.ctx.getTransform().e, this.ctx.getTransform().f);
    // console.log("ctx.getTransform()", this.ctx.getTransform());
    // console.log(
    //   -this.parentNode.x +
    //     (this.stageWidth / 2 - this.ctx.getTransform().e) /
    //       this.ctx.getTransform().d
    // );
    // this.ctx.fillStyle = "#00ff00";
    // this.ctx.beginPath();
    // this.ctx.arc(
    //   (this.stageWidth / 2 - this.ctx.getTransform().e) /
    //     this.ctx.getTransform().d,
    //   (this.stageHeight / 2 - this.ctx.getTransform().f) /
    //     this.ctx.getTransform().d,
    //   10,
    //   0,
    //   2 * Math.PI
    // );
    this.ctx.fill();
  }

  focusOnNode(e) {
    if (
      this.parentNode.isClicked(
        (e.clientX - this.ctx.getTransform().e) / this.ctx.getTransform().d,
        (e.clientY - this.ctx.getTransform().f) / this.ctx.getTransform().d,
        this.stageWidth,
        this.stageHeight
      )
    ) {
      this.parentNode.focusOn(this.ctx, this.stageWidth, this.stageHeight);
    } else {
      for (let i = 0; i < this.numParent; i++) {
        if (
          this.mainTrees[i].checkClick(
            e,
            this.ctx,
            this.stageWidth,
            this.stageHeight
          )
        ) {
          this.mainTrees[i].focusOn(
            this.ctx,
            this.stageWidth,
            this.stageHeight
          );
          break;
        }
        for (let j = 0; j < this.numSubTree; j++) {
          if (
            this.subTrees[i][j].checkClick(
              e,
              this.ctx,
              this.stageWidth,
              this.stageHeight
            )
          ) {
            this.subTrees[i][j].focusOn(
              this.ctx,
              this.stageWidth,
              this.stageHeight
            );
            break;
          }
        }
      }
    }
  }
}

window.onload = () => {
  new App();
};
