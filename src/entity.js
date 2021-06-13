//Collider (solid)

class Entity {
	constructor(context, positionX, positionY, width, height, imageUrl) {
		this.context = context;
		this.position = { x: positionX, y: positionY };
		this.size = { w: width, h: height };
		this.image = undefined;
		this.imageUrl = imageUrl;

		this.solid = false;

		this.init();
	}

	init() {
		this.image = new Image();
		this.image.src = `img/${this.imageUrl}`;
	}

	draw() {
		// considerar un draw genérico para todos los entities
	}
}
