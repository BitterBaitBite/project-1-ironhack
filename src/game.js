const Game = {
	// PROPERTIES //

	// Global game properties
	canvas: undefined,
	context: undefined,
	width: undefined,
	height: undefined,
	FPS: 60,
	framesCounter: 0,
	secondsCounter: 0,

	// DOM properties
	gameOver: document.getElementById('game-over-container'),
	resetButton: document.querySelector('.replay'),
	scoreElement: document.querySelector('.score'),
	insectElement: document.querySelector('.insect'),
	satisfiedElement: document.querySelector('.satisfied'),
	trashElement: document.querySelector('.trash'),

	// Audio properties
	musicController: document.getElementById('musicAudio'),
	backgroundAudio: document.getElementById('backgroundAudio'),
	kitchenAudio: document.getElementById('kitchenAudio'),
	cockroachAudio: document.getElementById('cockroachAudio'),
	trashAudio: document.getElementById('trashAudio'),
	clientAudio: document.getElementById('clientAudio'),

	// Drawing properties
	background: undefined,
	walls: undefined,
	player: undefined,
	interactMargin: 20,
	trashCan: undefined,

	// Game logic properties
	kitchens: [],
	cockroaches: [],
	clients: [],
	typesOfFood: ['curry', 'meat', 'dessert'],
	numberOfClients: 4,
	cockroachTimer: 10,

	finishedClients: 0, // clientes insatisfechos
	totalScore: 0,
	insectScore: 0,
	satisfiedScore: 0,
	trashScore: 0,
	GAME_OVER_TIMER: 120,

	// Alert properties
	alertCall: undefined,
	alertFood: undefined,
	alertCockroachAlive: undefined,
	alertAngry: undefined,
	alertSatisfied: undefined,

	keys: {
		KeyW: 'w',
		KeyA: 'a',
		KeyS: 's',
		KeyD: 'd',
		KeyE: 'e',
		KeyF: 'f',
		SPACE: ' ',
	},

	keyWDown: false,
	keySDown: false,
	keyADown: false,
	keyDDown: false,
	keyEDown: false,
	keyFDown: false,
	SPACEDown: false,

	pressed: false,

	// INITIALITATION //

	init() {
		this.canvas = document.getElementById('myCanvas');
		this.context = this.canvas.getContext('2d');
		this.setDimensions();
		this.alertCall = new Image();
		this.alertCall.src = 'img/tiles/call-player-alert.png';
		this.alertFood = new Image(); // se crea el src al alertar la comida, dependiendo de la comida deseada
		this.alertCockroachAlive = new Image();
		this.alertCockroachAlive.src = 'img/tiles/cockroach-alert.png';

		this.alertAngry = new Image();
		this.alertAngry.src = 'img/tiles/angry-alert.png';
		this.alertSatisfied = new Image();
		this.alertSatisfied.src = 'img/tiles/satisfied-client-alert.png';

		this.musicController.volume = 0.2;
		this.backgroundAudio.volume = 0.4;

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

			if (e.key.toLowerCase() === this.keys.KeyF && !this.pressed) {
				this.keyFDown = true;
				this.pressed = true;
			}

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
			if (e.key.toLowerCase() === this.keys.KeyF) {
				this.keyFDown = false;
				this.pressed = false;
			}

			e.key.toLowerCase() === this.keys.SPACE ? (this.SPACEDown = false) : null;
		};

		this.resetButton.onclick = (e) => {
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

		this.insectScore = 0;
		this.trashScore = 0;
		this.satisfiedScore = 0;
		this.totalScore = 0;

		this.canvas.classList.remove('hidden');
	},

	start() {
		this.reset();
		this.setEventListeners();
		this.musicController.play();
		this.backgroundAudio.play();
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

			if (this.framesCounter % 60 === 0 && this.secondsCounter % this.cockroachTimer === 0) {
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

			this.context.fillStyle = 'white';
			this.context.font = '30px Arial';
			this.context.fillText(
				/* this.framesCounter + ' - ' +  */ this.secondsCounter /*  + ' - ' + this.totalScore */ + ' - ' + this.satisfiedScore,
				20,
				40
			);

			if (this.secondsCounter == this.GAME_OVER_TIMER || this.finishedClients >= 3) {
				/* cambiar */
				this.clear();
				if (this.finishedClients >= 3) this.gameOver.classList.add('lost');

				this.gameOver.classList.remove('hidden');
				this.canvas.classList.add('hidden');

				this.scoreElement.textContent = Math.floor(this.totalScore);
				this.insectElement.textContent = this.insectScore;
				this.satisfiedElement.textContent = this.satisfiedScore;
				this.trashElement.textContent = this.trashScore;

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

		this.createClients();
	},

	createBackground() {
		this.background = new Image();
		this.background.src = 'img/tiles/floor.png';
		this.walls = {
			left: new Image(),
			right: new Image(),
			top: new Image(),
			bottom: new Image(),
		};

		this.walls.left.src = 'img/tiles/barra-lat.png';
		this.walls.right.src = 'img/tiles/barra-lat.png';
		this.walls.top.src = 'img/tiles/barra-sup.png';
		this.walls.bottom.src = 'img/tiles/barra-sup.png';
	},

	createPlayer() {
		this.player = new Player(this.context, 210, this.height / 2, 64, 92, 10, 'Adam_idle.png');
	},

	createTrashCan() {
		this.trashCan = new TrashCan(this.context, 120, this.height - 120, 108 / 2, 108 / 2, 'tiles/trashcan.png');
	},

	createKitchens() {
		this.typesOfFood.forEach((el, i) => {
			this.kitchens.push(
				new Kitchen(
					this.context,
					this.kitchenAudio,
					64 + (i % 2) * 64 * 4,
					64 + (Math.floor(i / 2) * this.canvas.height) / this.typesOfFood.length,
					256 / 1.8,
					128 / 1.8,
					'tiles/kitchen.png',
					el
				)
			);
		});
	},

	createCockroach() {
		let randomX = Math.floor(Math.random() * this.width);
		let randomY = Math.floor(Math.random() * (this.height - 64) + 64);

		this.cockroaches.push(new Cockroach(this.context, randomX, randomY, 128 / 2, 128 / 2, 2, 'anim/BeetleMove.png'));
	},

	createClients() {
		for (let i = 0; i < this.numberOfClients; i++) {
			this.clients.push(
				new Client(
					this.context,
					this.clientAudio,
					this.canvas.width / 2 + 64 * 2 + (i % 2) * 64 * 4,
					this.canvas.height / this.numberOfClients +
						Math.floor(i / 2) * (this.canvas.height - this.canvas.height / this.numberOfClients - 64 * this.numberOfClients),
					64 * 1.2,
					64 * 1.2,
					this.typesOfFood,
					'tiles/table.png'
				)
			);
		}
	},

	// DRAW METHODS //

	clear() {
		this.context.clearRect(0, 0, this.width, this.height);
	},

	drawAll() {
		this.drawBackground();

		this.cockroaches.forEach((el) => el.draw(this.framesCounter));

		this.trashCan.draw();
		this.kitchens.forEach((el) => el.draw());
		this.clients.forEach((el) => el.draw());

		this.player.draw(this.framesCounter);
	},

	drawBackground() {
		const tileWidth = 32 * 2;
		this.context.fillStyle = 'lightgrey';
		this.context.fillRect(0, 0, this.width, this.height);
		for (let i = 0; i < this.canvas.width / tileWidth; i++) {
			for (let j = 0; j < this.canvas.height / tileWidth; j++) {
				this.context.drawImage(this.background, i * tileWidth, j * tileWidth, tileWidth, tileWidth);
				this.context.drawImage(this.walls.left, 0 - tileWidth, j * tileWidth);
				this.context.drawImage(this.walls.right, this.canvas.width - tileWidth / 2, j * tileWidth);
			}
			this.context.drawImage(this.walls.top, i * tileWidth - tileWidth, 0 - tileWidth);
			this.context.drawImage(this.walls.bottom, i * tileWidth, this.canvas.height - tileWidth / 2);
		}
	},

	callPlayer() {
		if (this.framesCounter % 60 === 0 && this.secondsCounter % 5 === 0) {
			let randomIndex = Math.floor(Math.random() * this.clients.length);
			this.clients[randomIndex].callPlayer();
		}
	},

	alertCockroach() {
		if (this.cockroaches.length > 0) {
			this.context.drawImage(
				this.alertCockroachAlive,
				this.player.position.x + this.player.size.w / 2 - 400 / 12,
				this.player.position.y + this.player.size.h / 2 - 297 / 4,
				400 / 6,
				297 / 6
			);
		}
	},

	alertClient() {
		this.clients.forEach((el) => {
			if (el.pendingWaiter && !el.pendingFood && !el.finished) {
				this.context.drawImage(
					this.alertCall,
					el.position.x + el.size.w / 2 - 400 / 16,
					el.position.y - el.size.h / 2 - 8,
					400 / 8,
					297 / 8
				);
			}

			if (el.finished) {
				if (!el.scored) {
					this.totalScore += el.score;
					if (el.satisfied) this.satisfiedScore++;
					el.scored = true;
				}

				if (el.satisfied) {
					this.context.drawImage(
						this.alertSatisfied,
						el.position.x + el.size.w / 2 - 400 / 16,
						el.position.y - el.size.h / 2 - 10,
						400 / 8,
						312 / 8
					);
				} else
					this.context.drawImage(
						this.alertAngry,
						el.position.x + el.size.w / 2 - 400 / 16,
						el.position.y - el.size.h / 2 - 10,
						400 / 8,
						312 / 8
					);
			}
		});
	},

	alertWantedFood() {
		this.clients.forEach((el) => {
			if (!el.pendingWaiter && el.pendingFood) {
				this.alertFood.src = `img/tiles/dish-${el.wantedFood}-alert.png`;
				this.context.drawImage(
					this.alertFood,
					el.position.x + el.size.w / 2 - 400 / 16,
					el.position.y - el.size.h / 2 - 10,
					400 / 8,
					312 / 8
				);
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
		if (obj.position.x < 0 + 64) obj.position.x = 64;
		else if (obj.position.x + obj.size.w > this.width - 32) obj.position.x = this.width - obj.size.w - 32;

		if (obj.position.y < 0 + 32) obj.position.y = 0 + 32;
		else if (obj.position.y + obj.size.h > this.height - 32) obj.position.y = this.height - obj.size.h - 32;
	},

	calculateMovement() {
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
			if (this.keyFDown && this.cockroaches.length <= 0 && this.pressed) {
				this.player.serveFood(this.trashCan);
				this.keyFDown = false;
				this.trashScore++;
				this.playTrashCan();
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
				this.cockroaches.splice(index, 1);
				this.insectScore++;
				this.playCockroachDeath();
			}
		}
	},

	collisionClient(client) {
		if (this.isCollision(client, this.player) && !client.finished) {
			if (this.keyEDown && this.clients.length > 0 && client.pendingWaiter && !client.pendingFood && this.cockroaches.length <= 0) {
				client.receivePlayer(this.framesCounter);
			}

			if (this.keyFDown && this.clients.length > 0 && !client.pendingWaiter && client.pendingFood && this.cockroaches.length <= 0) {
				if (this.player.food != undefined && client.receiveFood(this.player.food.typeOfFood)) {
					this.player.serveFood(client);
				}
			}
		}
	},

	// AUDIO AND SOUND EFFECTS //

	playCockroachDeath() {
		this.cockroachAudio.play();
	},

	playTrashCan() {
		this.trashAudio.play();
	},
};
