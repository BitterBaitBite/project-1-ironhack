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
	draw() {
		this.image.src = `img/tiles/dish-${this.typeOfFood}.png`;
		this.context.drawImage(this.image, this.position.x + 10, this.position.y, this.size.w, this.size.h);
	}
}
