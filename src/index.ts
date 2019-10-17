// import "./styles.css";
// import R from "ramda";

interface Itask {
  (ctx: CanvasRenderingContext2D): void;
}

interface IdrawRectOptions {
  width: number;
  height: number;
  x: number;
  y: number;
  fillColor: string;
  strokeColor: string;
}

class TaskContainer {
  private tasks: Array<Itask>;
  constructor() {
    this.tasks = [];
  }
  addTask(action) {
    this.tasks.push(action);
    return this;
  }
  getTasks() {
    return this.tasks;
  }
}

const setCtx = (id: string): CanvasRenderingContext2D => {
  const canvas = document.querySelector("#" + id) as HTMLCanvasElement;
  const ctx = canvas.getContext("2d");
  return ctx;
};

const drawFillRect = (drawRectOptions: IdrawRectOptions) => (
  ctx: CanvasRenderingContext2D
) => {
  let { x, y, width, height, strokeColor, fillColor } = drawRectOptions;
  ctx.strokeStyle = strokeColor;
  ctx.fillStyle = fillColor;
  ctx.fillRect(x, y, width, height);
  ctx.strokeRect(x, y, width, height);
};

const drawARedTask = drawFillRect({
  width: 200,
  height: 200,
  x: 10,
  y: 10,
  fillColor: "#FF0000",
  strokeColor: "#000000"
});

const drawBlueTask = drawFillRect({
  width: 200,
  height: 200,
  x: 100,
  y: 100,
  fillColor: "#0000FF",
  strokeColor: "#000000"
});

const render = (ctx: CanvasRenderingContext2D) => (tasks: Array<Itask>) => {
  tasks.forEach(task => {
    task(ctx);
  });
};

const clear = (ctx: CanvasRenderingContext2D) => () => {
  ctx.clearRect(0, 0, 10000, 10000);
};

let Ctx = setCtx("app");

let t = new TaskContainer();
t.addTask(drawARedTask).addTask(drawBlueTask);
let renderWithCtx = render(Ctx);
let clearWithCtx = clear(Ctx);

requestAnimationFrame(() => {
  clearWithCtx();
  renderWithCtx(t.getTasks());
});
