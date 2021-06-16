class Cockroach extends Entity {
	constructor(context, positionX, positionY, width, height, speed, imageUrl) {
		super(context, positionX, positionY, width, height, imageUrl);

		this.speed = speed;
		this.runningImage = undefined;
		this.time = 0;
		this.stop = true;
		this.faceTo = 0; // 0 - down | 1 - left | 2 - right | 3 - up

		this.randomX = Math.floor(Math.random() * (this.speed + this.speed) - this.speed);
		this.randomY = Math.floor(Math.random() * (this.speed + this.speed) - this.speed);

		this.init();
	}

	init() {
		this.image = new Image();
		this.image.src = `img/${this.imageUrl}`;
		this.image.frames = 4;
		this.image.framesIndex = 0;
	}

	move(framesCounter) {
		if (framesCounter % 59 == 0 && this.time % 2 == 0) {
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

		let vel = this.normalize(this.randomX, this.randomY);

		this.position.x += vel.x;
		this.position.y += vel.y;

		this.updateFaceTo(vel);

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

	// 0 - down | 1 - left | 2 - right | 3 - up
	updateFaceTo(vel) {
		if (vel.x > 0) this.faceTo = 2;
		else if (vel.x < 0) this.faceTo = 1;
		else if (vel.y < 0) this.faceTo = 3;
		else if (vel.y > 0) this.faceTo = 0;
	}

	draw(framesCounter) {
		this.context.drawImage(
			this.image,
			this.image.framesIndex * Math.floor(this.image.width / this.image.frames),
			this.faceTo * Math.floor(this.image.height / this.image.frames),
			Math.floor(this.image.width / this.image.frames),
			this.image.height / this.image.frames,
			this.position.x,
			this.position.y,
			this.size.w,
			this.size.h
		);

		this.animateSprite(framesCounter);
	}

	animateSprite(framesCounter) {
		if (framesCounter % this.image.frames == 0) {
			this.image.framesIndex++;
		}
		if (this.image.framesIndex >= this.image.frames) {
			this.image.framesIndex = 0;
		}
	}
}
