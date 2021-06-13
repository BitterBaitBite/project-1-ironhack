const Game = {
	canvas: undefined,
	context: undefined,
	width: undefined,
	height: undefined,
	FPS: 60,
	framesCounter: 0,

	background: undefined,
	player: undefined,
	food: undefined, //temp
	trashCan: undefined,
	kitchen: undefined,

	keys: {
		KeyW: 'w',
		KeyA: 'a',
		KeyS: 's',
		KeyD: 'd',
		KeyE: 'e',
		KeyF: 'f',
		SPACE: ' ',
		KeyR: 'r',
		KeyG: 'g',
	},

	keyWDown: false,
	keySDown: false,
	keyADown: false,
	keyDDown: false,
	keyEDown: false,
	keyFDown: false,
	keyGDown: false,

	pressed: false,

	init() {
		this.canvas = document.getElementById('myCanvas');
		this.context = this.canvas.getContext('2d');
		this.setDimensions();
		this.start();
	},

	setDimensions() {
		this.width = window.innerWidth - 20;
		this.height = window.innerHeight - 22;
		this.canvas.setAttribute('width', this.width);
		this.canvas.setAttribute('height', this.height);
	},

	setEventListeners() {
		document.onkeydown = (e) => {
			e.key === this.keys.KeyW ? (this.keyWDown = true) : null;
			e.key === this.keys.KeyA ? (this.keyADown = true) : null;
			e.key === this.keys.KeyS ? (this.keySDown = true) : null;
			e.key === this.keys.KeyD ? (this.keyDDown = true) : null;

			if (e.key === this.keys.KeyE && !this.pressed) {
				this.keyEDown = true;
				this.pressed = true;
			}
			e.key === this.keys.KeyF ? (this.keyFDown = true) : null;
			e.key === this.keys.KeyG ? (this.keyGDown = true) : null;
		};

		document.onkeyup = (e) => {
			e.key === this.keys.KeyW ? (this.keyWDown = false) : null;
			e.key === this.keys.KeyA ? (this.keyADown = false) : null;
			e.key === this.keys.KeyS ? (this.keySDown = false) : null;
			e.key === this.keys.KeyD ? (this.keyDDown = false) : null;

			if (e.key === this.keys.KeyE) {
				this.keyEDown = false;
				this.pressed = false;
			}
			e.key === this.keys.KeyF ? (this.keyFDown = false) : null;
			e.key === this.keys.KeyG ? (this.keyGDown = false) : null;
		};
	},

	start() {
		this.setEventListeners();
		this.createAll();
		this.drawAll();

		this.interval = setInterval(() => {
			this.framesCounter % 60 === 0 ? (this.framesCounter = 0) : null;

			this.clear();
			this.moveAll();
			this.detectCollision();
			this.kitchen.updateKitchen(this.framesCounter);
			if (this.kitchen.food !== undefined) this.food = this.kitchen.getFood();
			this.drawAll();

			this.context.save();
			this.context.fillStyle = 'white';
			this.context.font = '30px Arial';
			this.context.fillText(this.framesCounter, 20, 20);
			this.context.restore();

			this.framesCounter++;
		}, 1000 / this.FPS);
	},

	createAll() {
		this.createBackground();

		this.createPlayer();
		this.createFood(); // temp
		this.createTrashCan();
		this.createKitchen();
	},

	drawAll() {
		this.drawBackground();

		this.player.draw();
		if (this.food !== undefined) this.food.draw(); // temp
		this.trashCan.draw();
		this.kitchen.draw(this.framesCounter);
	},

	clear() {
		this.context.clearRect(0, 0, this.width, this.height);
	},

	moveAll() {
		this.player.move(this.calculateMovement().x, this.calculateMovement().y);
	},

	calculateMovement() {
		// (x, y) -> (x+x2, y+y2)
		let velX = 0;
		let velY = 0;

		if (this.keyADown) velX += -1;
		if (this.keyDDown) velX += 1;
		if (this.keyWDown) velY += -1;
		if (this.keySDown) velY += 1;

		return { x: velX, y: velY };
	},

	createBackground() {
		this.background = new Image();
		this.background.src = 'img/Crate.png';
	},

	createPlayer() {
		this.player = new Player(this.context, this.width / 2, this.height / 2, 100, 200, 10, 'Idle.png');
	},

	// temp
	createFood() {
		// let randomX = Math.floor(Math.random() * this.width);
		// let randomY = Math.floor(Math.random() * this.height);
		// this.food = new Food(this.context, randomX - 100, randomY - 50, 100, 50, 'Skeleton.png', 'Ratatouille');
	},

	createTrashCan() {
		this.trashCan = new TrashCan(this.context, 60, this.height - 120, 100, 64, 'Bush.png'); // position temporal
	},

	createKitchen() {
		this.kitchen = new Kitchen(this.context, this.width - 200, this.height - 200, 180, 135, 'Tree.png', 'Postre');
	},

	drawBackground() {
		// this.context.restore();
		this.context.fillStyle = 'lightgrey';
		this.context.fillRect(0, 0, this.width, this.height);
		// this.context.save();
	},

	detectCollision() {
		if (this.food !== undefined) {
			if (
				this.food.position.x < this.player.position.x + this.player.size.w &&
				this.food.position.x + this.food.size.w > this.player.position.x &&
				this.food.position.y < this.player.position.y + this.player.size.h &&
				this.food.size.h + this.food.position.y > this.player.position.y
			) {
				if (this.keyFDown) this.player.takeFood(this.food);
			}
		}

		if (
			this.trashCan.position.x < this.player.position.x + this.player.size.w &&
			this.trashCan.position.x + this.trashCan.size.w > this.player.position.x &&
			this.trashCan.position.y < this.player.position.y + this.player.size.h &&
			this.trashCan.size.h + this.trashCan.position.y > this.player.position.y
		) {
			if (this.keyFDown) this.player.serveFood(this.trashCan);
		}

		if (
			this.kitchen.position.x < this.player.position.x + this.player.size.w &&
			this.kitchen.position.x + this.kitchen.size.w > this.player.position.x &&
			this.kitchen.position.y < this.player.position.y + this.player.size.h &&
			this.kitchen.size.h + this.kitchen.position.y > this.player.position.y
		) {
			if (this.keyEDown && this.pressed) {
				this.kitchen.startCooking();
				this.keyEDown = false;
			}
		}
	},
};
