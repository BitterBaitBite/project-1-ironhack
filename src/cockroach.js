class Cockroach extends Entity {
	constructor(context, positionX, positionY, width, height, speed, imageUrl) {
		super(context, positionX, positionY, width, height, imageUrl);

		this.speed = speed;
		this.time = 0;
		this.stop = true;

		this.randomX = Math.floor(Math.random() * (this.speed + this.speed) - this.speed);
		this.randomY = Math.floor(Math.random() * (this.speed + this.speed) - this.speed);
	}

	move(framesCounter) {
		if (framesCounter % 59 == 0 && this.time % 2 == 0) {
			console.log('Entrando');
			this.time = 0;

			if (this.stop) {
				this.randomX = Math.floor(Math.random() * (this.speed + this.speed) - this.speed);
				this.randomY = Math.floor(Math.random() * (this.speed + this.speed) - this.speed);
			} else {
				this.randomX = 0;
				this.randomY = 0;
			}

			this.stop = !this.stop;
		}

		// let length = Math.sqrt(this.randomX * this.randomX + this.randomY * this.randomY);

		// if (length != 0) {
		// 	this.randomX /= length;
		// 	this.randomY /= length;
		// }

		// this.randomX *= this.speed;
		// this.randomY *= this.speed;

		let vel = this.normalize(this.randomX, this.randomY);

		this.position.x += vel.x;
		this.position.y += vel.y;

		if (framesCounter % 59 == 0) this.time++;
	}

	normalize(velX, velY) {
		let length = Math.sqrt(velX * velX + velY * velY);

		if (length != 0) {
			velX /= length;
			velY /= length;
		}

		velX *= this.speed;
		velY *= this.speed;

		return { x: velX, y: velY };
	}

	// draw() {
	// 	this.context.drawImage(this.image, this.position.x, this.position.y, this.size.w, this.size.h);
	// }
}
