class Kitchen extends Entity {
	constructor(context, positionX, positionY, width, height, imageUrl, typeOfFood) {
		super(context, positionX, positionY, width, height, imageUrl);

		this.food = undefined;
		this.typeOfFood = typeOfFood;
		this.time = 0;
		this.imgCooking = undefined;
		this.imgEmpty = undefined;
		this.imgKnife = undefined;
		this.cooking = false;

		this.currentInteractions = 0;
		this.MAX_FOOD = 1;
		this.MAX_INTERACTIONS = 1;
		this.init();
	}
	init() {
		this.image = new Image();
		this.image.src = `img/${this.imageUrl}`;
		this.imgCooking = new Image();
		this.imgEmpty = new Image();
		this.imgKnife = new Image();
		this.imgCooking.src = 'img/tiles/cooking-pan.png';
		this.imgEmpty.src = 'img/tiles/empty-pan.png';
		this.imgKnife.src = 'img/tiles/cooking-knife.png';
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
			this.food = new Food(
				this.context,
				this.position.x + this.size.w / 2,
				this.position.y,
				104 / 2,
				68 / 2,
				'tiles/dish-empty.png',
				this.typeOfFood
			);
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
		if (!this.cooking && this.food == undefined) {
			this.context.drawImage(this.imgEmpty, this.position.x + 15, this.position.y - 10, 88 / 2, 88 / 2);
			this.context.drawImage(this.imgKnife, this.position.x + this.size.w / 2 + 10, this.position.y + 5, 100 / 2, 72 / 2);
		}
		if (this.food !== undefined) this.food.draw();

		if (this.cooking) {
			this.context.drawImage(this.imgCooking, this.position.x + 15, this.position.y - 10, 88 / 2, 88 / 2);
		}
	}
}
