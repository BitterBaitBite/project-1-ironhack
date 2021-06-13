class Food extends Entity {
	constructor(context, positionX, positionY, width, height, imageUrl, typeOfFood) {
		super(context, positionX, positionY, width, height, imageUrl);
		this.position.x = positionX;
		this.position.y = positionY;
		this.typeOfFood = typeOfFood;

		this.tmpSize = { w: width, h: height };
	}

	disappear() {
		this.tmpSize = this.size;
		this.position = { x: 0, y: 0 };
		this.size = { w: 0, h: 0 };
	}

	draw() {
		this.context.drawImage(this.image, this.position.x, this.position.y, this.size.w, this.size.h);
	}
}
