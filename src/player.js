class Player extends Entity {
	constructor(context, positionX, positionY, width, height, speed, imageUrl) {
		super(context, positionX, positionY, width, height, imageUrl);

		this.position.x -= this.size.w / 2;
		this.position.y -= this.size.h / 2;

		this.speed = speed;
		this.blocked = false;

		this.food = undefined;
		this.nextToFood = false;
	}

	move(velX, velY) {
		// Normalizamos:
		let length = Math.sqrt(velX * velX + velY * velY);

		if (length != 0) {
			velX /= length;
			velY /= length;
		}

		velX *= this.speed;
		velY *= this.speed;

		this.position.x += velX;
		this.position.y += velY;

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
			console.log('Estoy tratando de dejar comida');
			if (obj instanceof TrashCan) {
				console.log('Estoy dejando comida en la papelera');
				const newFood = this.food;
				newFood.position = { x: this.position.x, y: this.position.y + 150 }; // tmp

				this.food.disappear();
				this.food = undefined;
			} else {
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
