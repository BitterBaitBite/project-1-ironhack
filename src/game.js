const Game = {
	// PROPERTIES //

	canvas: undefined,
	context: undefined,
	width: undefined,
	height: undefined,
	FPS: 60,
	framesCounter: 0,
	secondsCounter: 0,
	GAME_OVER_TIMER: 60,
	gameOver: document.getElementById('game-over-container'),
	resetButton: document.querySelector('button'),

	background: undefined,
	walls: undefined,
	player: undefined,
	interactMargin: 20,
	trashCan: undefined,
	kitchens: [],
	cockroaches: [],
	clients: [],
	finishedClients: 0, // clientes insatisfechos

	typesOfFood: ['curry', 'meat', 'dessert'],

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

		this.resetButton.onclick = (e) => {
			console.log('Click en botón');
			this.gameOver.classList.add('hidden');
			this.init();
		};
	},

	// EXECUTION //

	reset() {
		this.secondsCounter = 0;
		this.framesCounter = 0;
		this.background = undefined;
		this.player = undefined;
		this.interactMargin = 20;
		this.trashCan = undefined;
		this.kitchens = new Array();
		this.cockroaches = new Array();
		this.clients = new Array();
		this.finishedClients = 0;
	},

	start() {
		this.reset();
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
			this.kitchens.forEach((el) => el.updateKitchen(this.framesCounter));

			if (this.framesCounter % 60 === 0 && this.secondsCounter % 30 === 0) {
				this.createCockroach();
			}

			if (this.framesCounter % 60 === 0)
				this.clients.forEach((el) => {
					if (el.update()) {
						this.finishedClients++;
					}
				});

			this.callPlayer(this.framesCounter);

			this.drawAll();
			this.alertCockroach();
			this.alertClient();
			this.alertWantedFood();

			this.context.save();
			this.context.fillStyle = 'white';
			this.context.font = '30px Arial';
			this.context.fillText(this.framesCounter + ' - ' + this.secondsCounter, 20, 40);
			this.context.restore();

			if (this.secondsCounter == this.GAME_OVER_TIMER || this.finishedClients >= 20) { /* cambiar */
				this.clear();
				if (this.finishedClients >= 3) this.gameOver.classList.add('lost');

				this.gameOver.classList.remove('hidden');

				clearInterval(this.interval);
			}

			this.framesCounter++;
		}, 1000 / this.FPS);
	},

	// CREATE METHODS //

	createAll() {
		this.createBackground();

		this.createPlayer();

		this.createTrashCan();
		this.createKitchens();

		this.createClients(); // temp
	},

	createBackground() {
		this.background = new Image();
		this.background.src = 'img/tiles/floor.png';
		this.walls = {
			left: new Image(),
			right: new Image(),
			top: new Image(),
			bottom: new Image(),
		}

		this.walls.left.src = 'img/tiles/barra-lat.png';
		this.walls.right.src = 'img/tiles/barra-lat.png';
		this.walls.top.src = 'img/tiles/barra-sup.png';
		this.walls.bottom.src = 'img/tiles/barra-sup.png';


	},

	createPlayer() {
		this.player = new Player(this.context, 210, this.height / 2, 100, 100, 10, 'Idle.png');
	},

	createTrashCan() {
		this.trashCan = new TrashCan(this.context, 120, this.height - 120, 100, 64, 'Bush.png'); // position temporal
	},

	createKitchens() {
		this.typesOfFood.forEach((el, i) => {
			this.kitchens.push(new Kitchen(this.context, 32 + i % 2 * 32 * 8, Math.floor(i / 2) * this.canvas.height / 2, 256 / 2, 128 / 2, 'tiles/kitchen.png', el))
		})
	},

	createCockroach() {
		let randomX = Math.floor(Math.random() * this.width);
		let randomY = Math.floor(Math.random() * this.height);

		this.cockroaches.push(new Cockroach(this.context, randomX, randomY, 80, 60, 2, 'Dead.png'));
	},

	createClients() {
		this.clients.push(new Client(this.context, this.canvas.width / 2 + 32 * 2, 120, 32 * 2, 32 * 2, this.typesOfFood, 'tiles/table.png'));
		this.clients.push(new Client(this.context, this.canvas.width / 2 + 32 * 2 + 32 * 4, 120, 32 * 2, 32 * 2, this.typesOfFood, 'tiles/table.png'));
		this.clients.push(new Client(this.context, this.canvas.width / 2 + 32 * 2, 120 + 32 * 6, 32 * 2, 32 * 2, this.typesOfFood, 'tiles/table.png'));
		this.clients.push(new Client(this.context, this.canvas.width / 2 + 32 * 2 + 32 * 4, 120 + 32 * 6, 32 * 2, 32 * 2, this.typesOfFood, 'tiles/table.png'));
	},

	// DRAW METHODS //

	clear() {
		this.context.clearRect(0, 0, this.width, this.height);
	},

	drawAll() {
		this.drawBackground();

		this.cockroaches.forEach((el) => el.draw());

		this.trashCan.draw();
		this.kitchens.forEach((el) => el.draw());
		this.clients.forEach((el) => el.draw());

		this.player.draw();
	},

	drawBackground() {
		// this.context.restore();
		const tileWidth = 32 * 2
		this.context.fillStyle = 'lightgrey';
		this.context.fillRect(0, 0, this.width, this.height);
		for (let i = 0; i < this.canvas.width / tileWidth; i++) {


			for (let j = 0; j < this.canvas.height / tileWidth; j++) {

				this.context.drawImage(this.background, i * tileWidth, j * tileWidth, tileWidth, tileWidth)
				this.context.drawImage(this.walls.left, 0, j * tileWidth)
				this.context.drawImage(this.walls.right, this.canvas.width - tileWidth / 2, j * tileWidth)

			}
			this.context.drawImage(this.walls.top, i * tileWidth, 0)
			this.context.drawImage(this.walls.bottom, i * tileWidth, this.canvas.height - tileWidth / 2)


		}


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

	callPlayer() {
		if (this.framesCounter % 60 === 0 && this.secondsCounter % 5 === 0) {
			let randomIndex = Math.floor(Math.random() * this.clients.length);
			console.log('Intentando llamar a la mesa', randomIndex);
			this.clients[randomIndex].callPlayer();
		}
	},

	alertClient() {
		this.clients.forEach((el) => {
			if (el.pendingWaiter && !el.pendingFood && !el.finished) {
				this.context.fillStyle = 'red';

				this.context.beginPath();
				this.context.arc(el.position.x + 70, el.position.y + 50, 12, 0, Math.PI * 2);
				this.context.fill();
				this.context.closePath();

				this.context.fillRect(el.position.x + 60, el.position.y - 30, 20, 60);
			}

			if (el.finished) {
				this.context.fillStyle = 'red';

				this.context.beginPath();
				this.context.arc(el.position.x, el.position.y, el.size.w / 2, 0, Math.PI * 2);
				this.context.fill();
				this.context.closePath();
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
		this.solidCanvasCollision(this.player);

		this.previousPosition = this.player.position;

		this.player.move(this.calculateMovement().x, this.calculateMovement().y, this.trashCan, this.kitchens, this.clients);

		this.moveCockroaches();
	},

	moveCockroaches() {
		this.cockroaches.forEach((el) => {
			this.solidCanvasCollision(el);

			el.move(this.framesCounter);
		});
	},

	solidCanvasCollision(obj) {
		if (obj.position.x < 0) obj.position.x = 0;
		else if (obj.position.x + obj.size.w > this.width) obj.position.x = this.width - obj.size.w;

		if (obj.position.y < 0) obj.position.y = 0;
		else if (obj.position.y + obj.size.h > this.height) obj.position.y = this.height - obj.size.h;
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

	isCollision(obj1, obj2) {
		return (
			obj1.position.x - this.interactMargin < obj2.position.x + obj2.size.w &&
			obj1.position.x + obj1.size.w + this.interactMargin > obj2.position.x &&
			obj1.position.y - this.interactMargin < obj2.position.y + obj2.size.h &&
			obj1.size.h + obj1.position.y + this.interactMargin > obj2.position.y
		);
	},

	detectAllCollisions() {
		this.collisionTrashCan();
		this.kitchens.some((kitchen) => this.collisionKitchen(kitchen));
		this.cockroaches.some((cockroach, index) => this.collisionCockroach(cockroach, index));
		this.clients.some((client) => this.collisionClient(client));
	},

	collisionTrashCan() {
		if (this.isCollision(this.trashCan, this.player)) {
			if (this.keyFDown && this.cockroaches.length <= 0) {
				this.player.serveFood(this.trashCan);
			}
		}
	},

	collisionKitchen(kitchen) {
		if (this.isCollision(kitchen, this.player)) {
			if (this.keyEDown && this.pressed && this.cockroaches.length <= 0) {
				kitchen.startCooking(kitchen.food === undefined);
				this.keyEDown = false;
			}
			if (this.keyFDown && this.cockroaches.length <= 0) {
				if (kitchen.food !== undefined && this.player.food === undefined) {
					this.player.takeFood(kitchen.getFood());
				}
			}
		}
	},

	collisionCockroach(cockroach, index) {
		if (this.isCollision(cockroach, this.player)) {
			if (this.SPACEDown) {
				console.log('Pisando a la cucaracha');
				this.cockroaches.splice(index, 1);
			}
		}
	},

	collisionClient(client) {
		if (this.isCollision(client, this.player) && !client.finished) {
			if (this.keyEDown && this.clients.length > 0 && client.pendingWaiter && !client.pendingFood) {
				client.receivePlayer(this.framesCounter);
			}

			if (this.keyFDown && this.clients.length > 0 && !client.pendingWaiter && client.pendingFood) {
				console.log('Intentando servir comida');

				if (this.player.food != undefined && client.receiveFood(this.player.food.typeOfFood)) {
					this.player.serveFood(client);
				}
			}
		}
	},
};
