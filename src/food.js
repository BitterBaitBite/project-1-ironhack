class Food extends Entity {
	constructor(context, positionX, positionY, width, height, imageUrl, typeOfFood) {
		super(context, positionX, positionY, width, height, imageUrl);

		this.typeOfFood = typeOfFood;

		this.tmpSize = { w: width, h: height };
	}

	disappear() {
		this.tmpSize = this.size;
		this.position = { x: 0, y: 0 };
		this.size = { w: 0, h: 0 };
	}
}
