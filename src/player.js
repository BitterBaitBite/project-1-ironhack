class Player extends Entity {
	constructor(context, positionX, positionY, width, height, speed, imageUrl) {
		super(context, positionX, positionY, width, height, imageUrl);

		this.position.x -= this.size.w / 2;
		this.position.y -= this.size.h / 2;

		this.speed = speed;

		this.food = undefined;
		this.nextToFood = false;
	}

	move(velX, velY) {
		if (this.position.x < 0) this.position.x = 0;
		if (this.position.x + this.size.w > this.context.width) this.position.x = this.context.width;
		if (this.position.x < 0) this.position.x = 0;
		if (this.position.x < 0) this.position.x = 0;

		let vel = this.normalize(velX, velY);

		this.position.x += vel.x;
		this.position.y += vel.y;

		//controlar colisiones con solidos
	}

	interact() {
		if (!this.blocked) {
			/* 
                      if(estoy al lado de la cocina) {
                              activo la cocina;
                      } else if (estoy al lado del cliente && cliente tiene exclamación) {
                              cliente me pide comida
                      }
                  */
		}
	}

	foodInteract() {
		if (!this.blocked) {
			/* 
                        if(estoy al lado de la cocina && hay comida && no llevo comida)
                              cojo la comida
                        else if (estoy al lado del cliente && cliente ha pedido comida && comida = comida pedida)
                              dejo la comida
                  */
		}
	}

	killCockroach() {
		/* 
                  if(estoy al lado de la cucaracha && cucaracha está viva)
                        mato cucarachad
            */
	}

	block() {
		/* 
                  if(cucaracha está viva)
                        this.blocked = false
            */
		this.blocked = true;
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
		// this.context.fillStyle = 'lightblue';
		// this.context.fillRect(this.position.x, this.position.y, this.size.w, this.size.h);

		this.context.drawImage(this.image, this.position.x - this.size.w / 2, this.position.y, this.size.w + 80, this.size.h);
		if (this.food !== undefined) {
			this.food.position = this.position;
		}
	}

	takeFood(food) {
		if (this.food === undefined) {
			this.food = food;
		}

		/*
            if(estoy frente a la cocina)
                  cojo la comida y vacío la cocina
            else
                  no hago nada
            */
	}

	serveFood(obj = null) {
		if (this.food !== undefined) {
			if (obj instanceof TrashCan) {
				console.log('Estoy tirando la comida');
				const newFood = this.food;
				newFood.position = { x: this.position.x, y: this.position.y + 150 }; // tmp

				this.food.disappear();
				this.food = undefined;
			} else {
				console.log('entro aquí');
				const newFood = this.food;
				newFood.position = { x: this.position.x, y: this.position.y + 150 }; // tmp

				this.food = undefined;
			}
		}

		/* 
            if(estoy frente a una mesa && la comida coincide con la comanda)
                  dejo la comida en la mesa y vacío el this.food
            else if (estoy frente a la papelera)
                  vacío el this.food
            else
                  no hago nada
            */
	}
}
