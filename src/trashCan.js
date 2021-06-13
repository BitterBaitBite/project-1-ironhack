class TrashCan extends Entity {
	constructor(context, positionX, positionY, width, height, imageUrl) {
		super(context, positionX, positionY, width, height, imageUrl);
		this.position.x = positionX;
		this.position.y = positionY;
		this.blocked = false;
	}
	ReceiveTrash() {
		/* if (camarero suelta comida)
        comida desaparece */
	}
	draw() {
		this.context.drawImage(this.image, this.position.x, this.position.y);
	}
}
