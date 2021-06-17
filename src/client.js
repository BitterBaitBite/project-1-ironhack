class Client extends Entity {
	constructor(context, audio, positionX, positionY, width, height, typesOfFood, imageUrl) {
		super(context, positionX, positionY, width, height, imageUrl);

		this.typesOfFood = typesOfFood;
		this.wantedFood = undefined;

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

	draw() {
		this.context.drawImage(this.image, this.position.x, this.position.y, this.size.w, this.size.h);
	}
}
