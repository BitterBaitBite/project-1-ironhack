class Client extends Entity {
	constructor(context, positionX, positionY, width, height, imageUrl) {
		super(context, positionX, positionY, width, height, imageUrl);
		this.position.x = positionX;
		this.position.y = positionY;
		this.blocked = false;
	}
	callPlayer() {
		/* Aparecer de forma aleatoria la exclamación
        inicia tiempo de exclamación
        if(camarero interactua )
        desaparece icono && se para tiempo de la exclamación && aparece icono de comida && inicia tiempo de espera de comida 
        else if(terminar tiempo de comida )
        desaparece icono && clientes se 'levantan'*/
	}
	waitFood() {
		/* Se inicia con la interacción el tiempo de espera de comida 
        if(camarero trae su plato correcto)
        desaparece icono && se quita el tiempo de espera comida ¿¿¿¿¿&& comienza tiempo comiendo ???????? && se resetea
        else if(camaero no trae plato correcto)
        ¿¿¿¿no lo acepta, se van , baja tiempo espera comida???? 
        else if(se acaba tiempo espera comida)
        desaparece icono comida && se 'levantan'*/
	}
	timePlayer() {
		/* Iniciar tiempo de espera al jugador */
	}
	timeFood() {
		/* Iniciar tiempo de espera a la comida */
	}
	receivePlayer() {
		/*Aparecer de forma aleatoria la exclamación
         inicia tiempo de exclamación
         if (camarero interactua)
        desaparece icono && se para tiempo de la exclamación && aparece icono de comida && inicia tiempo de espera de comida */
	}
	receiveFood() {
		/* Se inicia con la interacción el tiempo de espera de comida
        if(camarero trae su plato correcto)
        desaparece icono && se quita el tiempo de espera comida ¿¿¿¿¿&& comienza tiempo comiendo ???????? && se resetea
        else if(camaero no trae plato correcto)
        ¿¿¿¿no lo acepta, se van , baja tiempo espera comida???? */
	}
	reset() {
		/* se reinicia todo */
	}
	draw() {}
}
