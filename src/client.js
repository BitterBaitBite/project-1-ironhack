class Client extends Entity {
	constructor(context, positionX, positionY, width, height, typesOfFood, imageUrl) {
		super(context, positionX, positionY, width, height, imageUrl);

		this.typesOfFood = typesOfFood;
		this.wantedFood = undefined;

		this.pendingWaiter = false;
		this.pendingFood = false;
		this.eating = false;
		this.finished = false;

		this.MAX_TIME = 10;

		this.time = 0;
	}

	callPlayer() {
		if (!this.pendingWaiter && !this.pendingFood && !this.eating) this.pendingWaiter = true;
	}

	receivePlayer() {
		let random = Math.floor(Math.random() * this.typesOfFood.length);

		this.pendingWaiter = false;
		this.pendingFood = true;

		this.wantedFood = this.typesOfFood[random];

		this.time = 0;
	}

	receiveFood(food) {
		console.log(food, ' - ', this.wantedFood);

		let correctFood = food === this.wantedFood;

		if (correctFood) {
			this.pendingFood = false;
			this.eating = true;
			this.time = 0;
		}

		return correctFood;
	}

	update() {
		if (!this.finished && !this.eating) {
			if (this.pendingWaiter || this.pendingFood) this.time++;
			console.log(this.time);

			if (this.time >= this.MAX_TIME) {
				this.pendingFood = false;
				this.pendingWaiter = false;
				this.eating = false;
				this.finished = true;
				return true;
			}
		}
		return false;
	}
}
