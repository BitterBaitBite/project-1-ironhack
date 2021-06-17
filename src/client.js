class Client extends Entity {
	constructor(context, audio, positionX, positionY, width, height, typesOfFood, imageUrl) {
		super(context, positionX, positionY, width, height, imageUrl);

		this.typesOfFood = typesOfFood;
		this.wantedFood = undefined;

		this.charIdleImage = undefined;
		this.charSitImage = undefined;

		this.foodImage = undefined;

		this.pendingWaiter = false;
		this.pendingFood = false;
		this.eating = false;
		this.finished = false;
		this.scored = false;
		this.satisfied = false;

		this.audio = audio;

		this.score = 0;

		this.MAX_TIME = 15;

		this.time = 0;

		this.init();
	}

	init() {
		let random = Math.floor(Math.random() * 3) + 1;

		this.image = new Image();
		this.image.src = `img/${this.imageUrl}`;

		this.charIdleImage = new Image();
		this.charIdleImage.src = `img/anim/char${random}_idle.png`;
		this.charIdleImage.frames = 6;
		this.charIdleImage.framesIndex = 0;

		this.charSitImage = new Image();
		this.charSitImage.src = `img/anim/char${random}_sit.png`;
		this.charSitImage.frames = 6;
		this.charSitImage.framesIndex = 0;

		this.foodImage = new Image();
	}

	callPlayer() {
		if (!this.pendingWaiter && !this.pendingFood && !this.eating) {
			this.pendingWaiter = true;
			this.audio.play();
		}
	}

	receivePlayer() {
		let random = Math.floor(Math.random() * this.typesOfFood.length);

		this.pendingWaiter = false;
		this.pendingFood = true;

		this.wantedFood = this.typesOfFood[random];

		this.foodImage.src = `img/tiles/dish-${this.wantedFood}.png`;

		this.score += 300 / this.time;

		this.time = 0;
	}

	receiveFood(food) {
		let correctFood = food === this.wantedFood;

		if (correctFood) {
			this.pendingFood = false;
			this.eating = true;
			this.score += 300 / this.time;
			this.time = 0;
		}

		return correctFood;
	}

	update() {
		if (!this.finished) {
			if (this.pendingWaiter || this.pendingFood || this.eating) this.time++;

			if (this.time >= this.MAX_TIME) {
				if (this.eating) {
					this.score += 100;
					this.satisfied = true;
					this.eating = false;
				}
				this.pendingFood = false;
				this.pendingWaiter = false;
				this.finished = true;
				this.audio.play();
				return true;
			}
		}
		return false;
	}

	draw(framesCounter) {
		this.context.drawImage(this.image, this.position.x, this.position.y, this.size.w + 56, this.size.h);

		if (this.eating) {
			this.context.drawImage(
				this.foodImage,
				this.position.x + 42,
				this.position.y + 17,
				this.foodImage.width * 0.39,
				this.foodImage.height * 0.32
			);
		}

		// 768 total width
		// 128 total height
		// 384 fraction width
		// 64
		this.context.drawImage(
			this.charSitImage,
			384 + this.charSitImage.framesIndex * Math.floor(this.charSitImage.width / 2 / this.charSitImage.frames),
			0,
			Math.floor(this.charSitImage.width / 2 / this.charSitImage.frames),
			128,
			this.position.x + 84,
			this.position.y - this.size.h / 2 + 2,
			(this.charSitImage.width / 8) * 0.7,
			this.charSitImage.height * 0.7
		);

		this.animateSprite(framesCounter);
	}

	animateSprite(framesCounter) {
		if (framesCounter % this.charSitImage.frames == 0) {
			this.charSitImage.framesIndex++;
		}
		if (this.charSitImage.framesIndex >= this.charSitImage.frames) {
			this.charSitImage.framesIndex = 0;
		}
	}
}
