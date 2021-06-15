class Player extends Entity {
	constructor(context, positionX, positionY, width, height, speed, imageUrl) {
		super(context, positionX, positionY, width, height, imageUrl);

		this.speed = speed;

		this.food = undefined;
		this.nextToFood = false;
	}

	move(velX, velY, trashCan, kitchens, clients) {
		let vel = this.normalize(velX, velY);

		if (!this.isCollision(trashCan, kitchens, clients, vel.x, vel.y)) {
			this.position.x += vel.x;
			this.position.y += vel.y;
		}
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

	draw() {
		this.context.fillStyle = 'red';
		this.context.fillRect(this.position.x, this.position.y, 100, 100);

		// this.context.drawImage(this.image, this.position.x - this.size.w / 2, this.position.y, this.size.w + 80, this.size.h);
		if (this.food !== undefined) {
			this.food.position = this.position;
			this.food.draw();
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
