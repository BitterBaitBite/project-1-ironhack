const Game = {
	// PROPERTIES //

	canvas: undefined,
	context: undefined,
	width: undefined,
	height: undefined,
	FPS: 60,
	framesCounter: 0,
	secondsCounter: 0,

	background: undefined,
	player: undefined,
	food: undefined, //temp
	trashCan: undefined,
	kitchen: undefined,
	cockroaches: [],
	clients: [],

	typesOfFood: ['principal', 'postre'],

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
	SPACEDown: false,

	pressed: false,

	// INITIALITATION //

	init() {
		this.canvas = document.getElementById('myCanvas');
		this.context = this.canvas.getContext('2d');
		this.setDimensions();
		this.start();
	},

	setDimensions() {
		this.width = window.innerWidth;
		this.height = window.innerHeight - 5;
		this.canvas.setAttribute('width', this.width);
		this.canvas.setAttribute('height', this.height);
	},

	setEventListeners() {
		document.onkeydown = (e) => {
			e.key.toLowerCase() === this.keys.KeyW ? (this.keyWDown = true) : null;
			e.key.toLowerCase() === this.keys.KeyA ? (this.keyADown = true) : null;
			e.key.toLowerCase() === this.keys.KeyS ? (this.keySDown = true) : null;
			e.key.toLowerCase() === this.keys.KeyD ? (this.keyDDown = true) : null;

			if (e.key.toLowerCase() === this.keys.KeyE && !this.pressed) {
				this.keyEDown = true;
				this.pressed = true;
			}
			e.key.toLowerCase() === this.keys.KeyF ? (this.keyFDown = true) : null;
			e.key.toLowerCase() === this.keys.KeyG ? (this.keyGDown = true) : null;
			e.key.toLowerCase() === this.keys.SPACE ? (this.SPACEDown = true) : null;
		};

		document.onkeyup = (e) => {
			e.key.toLowerCase() === this.keys.KeyW ? (this.keyWDown = false) : null;
			e.key.toLowerCase() === this.keys.KeyA ? (this.keyADown = false) : null;
			e.key.toLowerCase() === this.keys.KeyS ? (this.keySDown = false) : null;
			e.key.toLowerCase() === this.keys.KeyD ? (this.keyDDown = false) : null;

			if (e.key.toLowerCase() === this.keys.KeyE) {
				this.keyEDown = false;
				this.pressed = false;
			}
			e.key.toLowerCase() === this.keys.KeyF ? (this.keyFDown = false) : null;
			e.key.toLowerCase() === this.keys.KeyG ? (this.keyGDown = false) : null;
			e.key.toLowerCase() === this.keys.SPACE ? (this.SPACEDown = false) : null;
		};
	},

	// EXECUTION //

	start() {
		this.setEventListeners();
		this.createAll();
		this.drawAll();

		this.interval = setInterval(() => {
			if (this.framesCounter % 60 === 0) {
				this.framesCounter = 0;
				this.secondsCounter++;
			}

			this.clear();
			this.moveAll();
			this.detectAllCollisions();
			this.kitchen.updateKitchen(this.framesCounter);
			// if (this.kitchen.food !== undefined) this.food = this.kitchen.getFood(); // reinstancia siempre la comida

			if (this.framesCounter % 60 === 0 && this.secondsCounter % 30 === 0) {
				this.createCockroach();
			}

			if (this.framesCounter % 60 === 0 && this.secondsCounter % 5 === 0) {
				let randomIndex = Math.floor(Math.random() * this.clients.length);
				console.log('Intentando llamar a la mesa', randomIndex);
				this.clients[randomIndex].callPlayer();
			}

			this.drawAll();
			this.alertCockroach();
			this.alertClient();
			this.alertWantedFood();

			this.context.save();
			this.context.fillStyle = 'white';
			this.context.font = '30px Arial';
			this.context.fillText(this.framesCounter + ' - ' + this.secondsCounter, 20, 40);
			this.context.restore();

			this.framesCounter++;
		}, 1000 / this.FPS);
	},

	// CREATE METHODS //

	createAll() {
		this.createBackground();

		this.createPlayer();

		this.createFood(); // temp

		this.createTrashCan();
		this.createKitchen();

		this.createClient(); // temp
		this.createClient(); // temp
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
		this.trashCan = new TrashCan(this.context, 120, this.height - 120, 100, 64, 'Bush.png'); // position temporal
	},

	createKitchen() {
		this.kitchen = new Kitchen(this.context, this.width - 200, this.height - 200, 180, 135, 'Tree.png', 'postre');
	},

	createCockroach() {
		let randomX = Math.floor(Math.random() * this.width);
		let randomY = Math.floor(Math.random() * this.height);

		this.cockroaches.push(new Cockroach(this.context, randomX, randomY, 80, 60, 2, 'Dead.png'));
	},

	createClient() {
		this.clients.push(new Client(this.context, 300 * this.clients.length + 100, 100, 102, 102, this.typesOfFood, 'Crate.png'));
	},

	// DRAW METHODS //

	clear() {
		this.context.clearRect(0, 0, this.width, this.height);
	},

	drawAll() {
		this.drawBackground();

		this.cockroaches.forEach((el) => el.draw());

		if (this.food !== undefined) this.food.draw(); // temp
		this.trashCan.draw();
		this.kitchen.draw(this.framesCounter);
		this.clients.forEach((el) => el.draw());

		this.player.draw();
	},

	drawBackground() {
		// this.context.restore();
		this.context.fillStyle = 'lightgrey';
		this.context.fillRect(0, 0, this.width, this.height);
		// this.context.save();
	},

	alertCockroach() {
		if (this.cockroaches.length > 0) {
			this.context.fillStyle = 'red';

			this.context.beginPath();
			this.context.arc(this.player.position.x + 90, this.player.position.y + 80, 12, 0, Math.PI * 2);
			this.context.fill();
			this.context.closePath();

			this.context.fillRect(this.player.position.x + 80, this.player.position.y, 20, 60);
		}
	},

	alertClient() {
		this.clients.forEach((el) => {
			if (el.pendingWaiter && !el.pendingFood) {
				this.context.fillStyle = 'red';

				this.context.beginPath();
				this.context.arc(el.position.x + 70, el.position.y + 50, 12, 0, Math.PI * 2);
				this.context.fill();
				this.context.closePath();

				this.context.fillRect(el.position.x + 60, el.position.y - 30, 20, 60);
			}
		});
	},

	alertWantedFood() {
		this.clients.forEach((el) => {
			if (!el.pendingWaiter && el.pendingFood) {
				this.context.fillStyle = 'blue';
				this.context.fillRect(el.position.x + 60, el.position.y - 30, 40, 40);
			}
		});
	},

	// MOVEMENT AND UPDATE METHODS //

	moveAll() {
		if (this.player.position.x < 0) this.player.position.x = 0;
		else if (this.player.position.x + this.player.size.w > this.width) this.player.position.x = this.width - this.player.size.w;

		if (this.player.position.y < 0) this.player.position.y = 0;
		else if (this.player.position.y + this.player.size.h > this.height) this.player.position.y = this.height - this.player.size.h;

		this.player.move(this.calculateMovement().x, this.calculateMovement().y);

		this.cockroaches.forEach((el) => {
			if (el.position.x < 0) el.position.x = 0;
			else if (el.position.x + el.size.w > this.width) el.position.x = this.width - el.size.w;

			if (el.position.y < 0) el.position.y = 0;
			else if (el.position.y + el.size.h > this.height) el.position.y = this.height - el.size.h;

			el.move(this.framesCounter);
		});
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

	// COLLISIONS LOGIC //

	detectAllCollisions() {
		//.some( elm => elm === "teo") .every(elm => "teo")

		this.collisionFood();
		this.collisionTrashCan();
		this.collisionKitchen();
		this.cockroaches.some((cockroach, index) => this.collisionCockroach(cockroach, index));
		this.clients.some((client, index) => this.collisionClient(client, index));
	},

	collisionFood() {
		// if (this.food !== undefined) {
		// 	if (
		// 		this.food.position.x < this.player.position.x + this.player.size.w &&
		// 		this.food.position.x + this.food.size.w > this.player.position.x &&
		// 		this.food.position.y < this.player.position.y + this.player.size.h &&
		// 		this.food.size.h + this.food.position.y > this.player.position.y
		// 	) {
		// 		if (this.keyFDown  && this.cockroaches.length <= 0) this.player.takeFood(this.food);
		// 	}
		// }
	},

	collisionTrashCan() {
		if (
			this.trashCan.position.x < this.player.position.x + this.player.size.w &&
			this.trashCan.position.x + this.trashCan.size.w > this.player.position.x &&
			this.trashCan.position.y < this.player.position.y + this.player.size.h &&
			this.trashCan.size.h + this.trashCan.position.y > this.player.position.y
		) {
			if (this.keyFDown && this.cockroaches.length <= 0) {
				this.player.serveFood(this.trashCan);

				this.food = undefined;
			}
		}
	},

	collisionKitchen() {
		if (
			this.kitchen.position.x < this.player.position.x + this.player.size.w &&
			this.kitchen.position.x + this.kitchen.size.w > this.player.position.x &&
			this.kitchen.position.y < this.player.position.y + this.player.size.h &&
			this.kitchen.size.h + this.kitchen.position.y > this.player.position.y
		) {
			if (this.keyEDown && this.pressed && this.cockroaches.length <= 0) {
				this.kitchen.startCooking(this.food === undefined);
				this.keyEDown = false;
			}
			if (this.keyFDown && this.cockroaches.length <= 0) {
				if (this.kitchen.food !== undefined) this.food = this.kitchen.getFood();
				this.player.takeFood(this.food);
			}
		}
	},

	collisionCockroach(cockroach, index) {
		if (
			cockroach.position.x < this.player.position.x + this.player.size.w &&
			cockroach.position.x + cockroach.size.w > this.player.position.x &&
			cockroach.position.y < this.player.position.y + this.player.size.h &&
			cockroach.size.h + cockroach.position.y > this.player.position.y
		) {
			if (this.SPACEDown) {
				console.log('Pisando a la cucaracha');
				this.cockroaches.splice(index, 1);
			}
		}
	},

	collisionClient(client, index) {
		if (
			client.position.x < this.player.position.x + this.player.size.w &&
			client.position.x + client.size.w > this.player.position.x &&
			client.position.y < this.player.position.y + this.player.size.h &&
			client.size.h + client.position.y > this.player.position.y
		) {
			if (this.keyEDown && this.clients.length > 0 && client.pendingWaiter && !client.pendingFood) {
				client.receivePlayer();
			}

			if (this.keyFDown && this.clients.length > 0 && !client.pendingWaiter && client.pendingFood && this.food != undefined) {
				console.log('Intentando servir comida');

				if (client.receiveFood(this.player.food.typeOfFood)) {
					this.player.serveFood();
					this.food = undefined;
				}
			}
		}
	},
};
