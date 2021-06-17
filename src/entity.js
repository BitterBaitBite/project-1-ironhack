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
		this.context.drawImage(this.image, this.position.x, this.position.y, this.size.w, this.size.h);
	}
}
