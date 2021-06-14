class Kitchen extends Entity {
	constructor(context, positionX, positionY, width, height, imageUrl, typeOfFood) {
		super(context, positionX, positionY, width, height, imageUrl);

		this.food = undefined;
		this.typeOfFood = typeOfFood;
		this.time = 0;

		this.cooking = false;

		this.currentInteractions = 0;
		this.MAX_FOOD = 1;
		this.MAX_INTERACTIONS = 1;
	}

	startCooking(noFoodInGame) {
		if (this.currentInteractions < this.MAX_INTERACTIONS && noFoodInGame && this.food == undefined) {
			console.log('Cocinando');
			this.cooking = true;
			this.time = 0;
			this.currentInteractions++;
		}
	}

	updateKitchen(framesCounter) {
		if (framesCounter % 60 === 0) this.time++;

		if (this.time >= 5 && this.cooking) {
			this.food = new Food(this.context, this.position.x, this.position.y + this.size.h, 100, 50, 'Skeleton.png', this.typeOfFood);
			this.currentInteractions--;
			this.cooking = false;
		}
	}

	getFood() {
		let tmpFood = this.food;
		this.food = undefined;
		return tmpFood;
	}

	draw() {
		this.context.drawImage(this.image, this.position.x, this.position.y, this.size.w, this.size.h);
		if (this.food !== undefined) this.food.draw();
	}
}
