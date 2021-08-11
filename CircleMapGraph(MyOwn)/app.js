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
    // this.pixelRatio = 2;
    this.mouse = new Mouse();
    this.curItem = null;

    this.numParent = 1; // 중앙 노드의 개수(추후 중앙 노드가 여러 개 생길 수 있기 때문에 변수를 미리 생성)
    this.numSubTree = 4; // 중앙 노드가 가질 subTree의 개수
    this.mainTrees = []; // 중앙 노드의 tree
    this.mainTreesData = [
      [
        {
          name: "현대제철",
          money: "6조 7,524억원",
          size: 10 * Math.log(60.75),
          color: "#ff423b",
        },
        {
          name: "현대차",
          money: "47조 2,207억원",
          size: 10 * Math.log(470.22),
          color: "#112233",
        },
        {
          name: "기아",
          money: "34조 9,423억원",
          size: 10 * Math.log(340),
          color: "#112233",
        },
        {
          name: "hmm",
          money: "16조 738억원",
          size: 10 * Math.log(160),
          color: "#42ff3b",
        },
        { size: 27 },
        { size: 8 },
        { size: 10 },
      ],
    ];
    this.subTrees = [[]]; // 중앙 노드가 가질 subTree들
    this.subTreesData = [
      [
        [
          { name: "동국제강", money: "1조 8,896억원", size: 10 * Math.log(18) },
          {
            name: "KG동부제철",
            money: "1조 6,301억원",
            size: 10 * Math.log(16),
          },
          { name: "고려제강", money: "5,543억원", size: 10 * Math.log(5) },
        ],
        [],
        [],
        [
          { name: "팬오션", money: "3조 9,825억원", size: 10 * Math.log(39) },
          {
            name: "대우조선해양",
            money: "3조 3,099억원",
            size: 10 * Math.log(33),
          },
          { name: "대한해운", money: "9,575억원", size: 10 * Math.log(10) },
          { name: "KSS해운", money: "2,690억원", size: 10 * Math.log(2) },
        ],
        [{ size: 10 }, { size: 6 }, { size: 10 }],
        [{ size: 3 }, { size: 5 }, { size: 8 }],
        [{ size: 10 }, { size: 17 }, { size: 10 }],
        [{ size: 4 }, { size: 8 }, { size: 10 }],
        [{ size: 13 }, { size: 10 }, { size: 9 }],
      ],
    ];
    let j,
      i = 0; // for문에 사용될 변수들

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
      // Tree는 subTree멤버를 배열의 형태로 가진다.
      for (j = 0; j < this.numSubTree; j++) {
        for (let k = 0; k < this.subTreesData[i][j].length; k++) {
          this.subTreesData[i][j][k].color = this.mainTreesData[i][j].color;
        }
        this.mainTrees[i].subTrees[j] = new Tree(
          new Point(
            document.body.clientWidth,
            document.body.clientHeight,
            this.mainTrees[i].childNode[j].x - document.body.clientWidth / 2,
            this.mainTrees[i].childNode[j].y - document.body.clientHeight / 2
          ),
          document.body.clientWidth,
          document.body.clientHeight,
          this.subTreesData[i][j].length,
          this.subTreesData[i][j],
          this.mainTrees[i].childAngle[j],
          Math.PI / 2,
          200
        );
      }
    }

    // 중앙 노드 생성(최초 시작하는 tree이기 때문에, 최고 parent node는 직접 생성해 주어야한다.)
    // (Tree는 parent노드가 없고, child nodes와 branch만 가지고 있다)
    this.parentNode = new Circle(
      new Point(document.body.clientWidth, document.body.clientHeight, 0, 0),
      10 * Math.log(2950),
      "#621bff",
      "포스코",
      "29조 4,256억원",
      this.mainTrees[i]
    );

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
        this.canvas.width,
        this.canvas.height
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

    console.log("this.pixelRatio", this.pixelRatio);
    console.log("window.devicePixelRatio", window.devicePixelRatio);

    // 픽셀 비율에 맞춰서 canvas의 픽셀 개수를 설정
    this.canvas.width = this.stageWidth * this.pixelRatio;
    this.canvas.height = this.stageHeight * this.pixelRatio;
    // 그에 맞춰서 scale up(scale up 해도 화면에 보여지는 픽셀의 수는 같은가? *2 한다고 픽셀 개수가 절반이 되지 않는가?)
    this.ctx.scale(this.pixelRatio, this.pixelRatio);
    this.mouse.resize(this.pixelRatio);

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
        for (let j = 0; j < this.mainTrees[i].subTrees.length; j++) {
          this.mainTrees[i].subTrees[j].resize(
            this.stageWidth,
            this.stageHeight
          );
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
    // this.ctx.fill();

    // canvas의 모든 객체 draw
    this.parentNode.draw(this.ctx);
    for (let i = 0; i < this.mainTrees.length; i++) {
      if (this.parentNode.isSubtreeOpened === true) {
        this.mainTrees[i].draw(this.ctx);
      }
      if (!this.mainTrees[i].isLineGrowingUp()) {
        for (let j = 0; j < this.mainTrees[i].subTrees.length; j++) {
          if (this.mainTrees[i].childNode[j].isSubtreeOpened === true) {
            this.mainTrees[i].subTrees[j].draw(this.ctx);
          }
        }
      }
    }
  }

  focusOnNode(e) {
    let mousePos = { clientX: 0, clientY: 0 };
    mousePos.clientX = this.pixelRatio * e.clientX;
    mousePos.clientY = this.pixelRatio * e.clientY;
    // console.log("e.clientX", e.clientX);
    // console.log(mousePos);
    console.log("this.canvas.width", this.canvas.width);
    console.log("this.stageWidth", this.stageWidth);
    console.log(this.pixelRatio);
    if (
      this.parentNode.isClicked(
        (mousePos.clientX - this.ctx.getTransform().e) /
          this.ctx.getTransform().d,
        (mousePos.clientY - this.ctx.getTransform().f) /
          this.ctx.getTransform().d
      )
    ) {
      this.parentNode.focusOn(
        this.ctx,
        this.stageWidth * this.pixelRatio,
        this.stageHeight * this.pixelRatio
      );
    } else {
      for (let i = 0; i < this.numParent; i++) {
        if (
          this.mainTrees[i].checkClick(
            mousePos,
            this.ctx,
            this.canvas.width,
            this.canvas.height
          )
        ) {
          this.mainTrees[i].focusOn(
            this.ctx,
            this.canvas.width,
            this.canvas.height
          );
          break;
        }
        for (let j = 0; j < this.numSubTree; j++) {
          if (
            this.mainTrees[i].subTrees[j].checkClick(
              mousePos,
              this.ctx,
              this.canvas.width,
              this.canvas.height
            )
          ) {
            this.mainTrees[i].subTrees[j].focusOn(
              this.ctx,
              this.canvas.width,
              this.canvas.height
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
