class Client extends Entity {
	constructor(context, positionX, positionY, width, height, typesOfFood, imageUrl) {
		super(context, positionX, positionY, width, height, imageUrl);

		this.typesOfFood = typesOfFood;
		this.wantedFood = undefined;

		this.pendingWaiter = false;
		this.pendingFood = false;
		this.eating = false;

		this.MAX_TIME = 10;

		this.time = 0;
	}

	callPlayer() {
		/* 
        inicia tiempo de exclamación
        if(camarero interactua )
            se para tiempo de la exclamación && aparece icono de comida && inicia tiempo de espera de comida 
        else if(terminar tiempo de comida )
            desaparece icono && clientes se 'levantan'
		*/
		if (!this.pendingWaiter && !this.pendingFood && !this.eating) this.pendingWaiter = true;
	}

	waitFood() {
		/* Se inicia con la interacción el tiempo de espera de comida 
        if(camarero trae su plato correcto)
            desaparece icono && se quita el tiempo de espera comida ¿¿¿¿¿&& comienza tiempo comiendo ???????? && se resetea
        else if(camaero no trae plato correcto)
            ¿¿¿¿no lo acepta, se van , baja tiempo espera comida???? 
        else if(se acaba tiempo espera comida)
            desaparece icono comida && se 'levantan'*/
		console.log('Esperando', this.wantedFood); // Aquí iría pintar el icono de la comida
	}

	receivePlayer() {
		/*Aparecer de forma aleatoria la exclamación
         inicia tiempo de exclamación
         if (camarero interactua)
            desaparece icono && se para tiempo de la exclamación && aparece icono de comida && inicia tiempo de espera de comida */

		let random = Math.floor(Math.random() * this.typesOfFood.length);

		this.pendingWaiter = false;
		this.pendingFood = true;

		this.wantedFood = this.typesOfFood[random];

		this.waitFood();
	}

	receiveFood(food) {
		/* Se inicia con la interacción el tiempo de espera de comida
        if(camarero trae su plato correcto)
            desaparece icono && se quita el tiempo de espera comida ¿¿¿¿¿&& comienza tiempo comiendo ???????? && se resetea
        else if(camaero no trae plato correcto)
            ¿¿¿¿no lo acepta, se van , baja tiempo espera comida???? 

		if (client.receiveFood(this.player.food.typeOfFood)) {
			this.player.serveFood();
			this.food = undefined;
			client.pendingFood = false;
			client.eating = true;
		}
		*/
		console.log(food, ' - ', this.wantedFood);

		let correctFood = food === this.wantedFood;

		if (correctFood) {
			this.pendingFood = false;
			this.eating = true;
		}

		return correctFood;
	}

	reset() {
		/* se reinicia todo */
	}
}
