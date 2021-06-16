class Player extends Entity {
	constructor(context, positionX, positionY, width, height, speed, imageUrl) {
		super(context, positionX, positionY, width, height, imageUrl);

		this.speed = speed;
		this.runningImage = undefined;
		this.faceTo = 3; // 0 - right | 1 - up | 2 - left | 3 - down
		this.idle = true;

		this.food = undefined;
		this.nextToFood = false;

		this.init();
	}

	init() {
		this.image = new Image();
		this.image.src = `img/anim/${this.imageUrl}`;
		this.image.frames = 6;
		this.image.framesIndex = 0;

		this.runningImage = new Image();
		this.runningImage.src = `img/anim/Adam_run.png`;
		this.runningImage.frames = 4;
		this.runningImage.framesIndex = 0;
	}

	move(velX, velY, trashCan, kitchens, clients) {
		let vel = this.normalize(velX, velY);

		if (!this.isCollision(trashCan, kitchens, clients, vel.x, vel.y)) {
			this.position.x += vel.x;
			this.position.y += vel.y;
		}

		this.idle = false;
		this.updateFaceTo(vel);
	}

	isCollision(trashCan, kitchens, clients, velX, velY) {
		let collision = false;

		if (
			trashCan.position.x < this.position.x + this.size.w + velX &&
			trashCan.position.x + trashCan.size.w > this.position.x + velX &&
			trashCan.position.y < this.position.y + this.size.h + velY &&
			trashCan.size.h + trashCan.position.y > this.position.y + velY
		) {
			collision = true;
		}

		kitchens.forEach((el) => {
			if (
				el.position.x < this.position.x + this.size.w + velX &&
				el.position.x + el.size.w > this.position.x + velX &&
				el.position.y < this.position.y + this.size.h + velY &&
				el.size.h + el.position.y > this.position.y + velY
			) {
				collision = true;
			}
		});

		clients.forEach((el) => {
			if (
				el.position.x < this.position.x + this.size.w + velX &&
				el.position.x + el.size.w > this.position.x + velX &&
				el.position.y < this.position.y + this.size.h + velY &&
				el.size.h + el.position.y > this.position.y + velY
			) {
				collision = true;
			}
		});

		return collision;
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

	// 0 - right | 1 - up | 2 - left | 3 - down
	updateFaceTo(vel) {
		if (vel.x > 0) this.faceTo = 0;
		else if (vel.x < 0) this.faceTo = 2;
		else if (vel.y < 0) this.faceTo = 1;
		else if (vel.y > 0) this.faceTo = 3;
		else this.idle = true;
	}

	draw(framesCounter) {
		// width = 1536 px
		// fraction width = 384px
		// frame width = 64px
		if (this.idle) {
			this.context.drawImage(
				this.image,
				this.faceTo * 384 + this.image.framesIndex * Math.floor(this.image.width / 4 / this.image.frames), //1152 - 1216 => 64px
				0,
				Math.floor(this.image.width / 4 / this.image.frames),
				128,
				this.position.x,
				this.position.y - 36,
				this.size.w,
				this.size.h + 32
			);
		} else {
			this.context.drawImage(
				this.runningImage,
				this.faceTo * 384 + this.image.framesIndex * Math.floor(this.image.width / 4 / this.image.frames), //1152 - 1216 => 64px
				0,
				Math.floor(this.image.width / 4 / this.image.frames),
				128,
				this.position.x,
				this.position.y - 36,
				this.size.w,
				this.size.h + 32
			);
		}

		if (this.food !== undefined) {
			this.food.position = this.position;
			this.food.draw();
		}

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

	takeFood(food) {
		if (this.food === undefined) {
			this.food = food;
		}
	}

	serveFood(obj = null) {
		if (this.food !== undefined) {
			if (obj instanceof TrashCan) {
				console.log('Estoy tirando la comida');

				this.food.disappear();
				this.food = undefined;
			} else if (obj instanceof Client) {
				console.log('Sirvo comida');

				this.food.disappear();
				this.food = undefined;
			}
		}
	}
}
