const Game = {
  canvas: undefined,
  ctx: undefined,
  width: undefined,
  height: undefined,
  FPS: 60,
  framesCounter: 0,

  background: undefined,
  player: undefined,

  keys: {
    KeyW: "w",
    KeyA: "a",
    KeyS: "s",
    KeyD: "d",
    KeyE: "e",
    KeyF: "f",
    SPACE: " ",
    KeyR: "r",
    KeyG: "g",
  },

  init() {
    this.canvas = document.getElementById("myCanvas");
    this.ctx = this.canvas.getContext("2d");
    this.setDimensions();
    this.start();
  },

  setDimensions() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.canvas.setAttribute("width", this.width);
    this.canvas.setAttribute("height", this.height);
  },

  setEventListeners() {
    document.onkeydown = (e) => {
      e.key === this.keys.KeyW ? console.log("Entrando en evento", this.keys.KeyW) : null;
      e.key === this.keys.KeyA ? console.log("Entrando en evento", this.keys.KeyA) : null;
      e.key === this.keys.KeyS ? console.log("Entrando en evento", this.keys.KeyS) : null;
      e.key === this.keys.KeyD ? console.log("Entrando en evento", this.keys.KeyD) : null;
      e.key === this.keys.SPACE ? console.log("Entrando en evento", this.keys.SPACE) : null;

      e.key === this.keys.KeyE ? console.log("Entrando en evento", this.keys.KeyE) : null;
      e.key === this.keys.KeyF ? console.log("Entrando en evento", this.keys.KeyF) : null;
      e.key === this.keys.KeyR ? console.log("Entrando en evento", this.keys.KeyR) : null;
      e.key === this.keys.KeyG ? console.log("Entrando en evento", this.keys.KeyG) : null;
    };
  },

  start() {
    this.setEventListeners();
    this.create();
    this.drawAll();

    this.interval = setInterval(() => {}, 1000 / this.FPS);
  },

  create() {
    this.player = new Player(this.ctx, this.width / 2, this.height / 2, 100, 200, 10, "logo.png");
  },

  drawAll() {
    this.player.draw();
  },

  clear() {
    this.ctx.clearRect(0, 0, this.width, this.height);
  },
};
