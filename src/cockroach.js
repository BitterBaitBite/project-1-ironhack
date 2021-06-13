class Cockroach extends Entity {
	constructor(context, positionX, positionY, width, height, speed, imageUrl) {
		super(context, positionX, positionY, width, height, imageUrl);
		this.position.x = positionX;
		this.position.y = positionY;
		this.speed = speed;
		this.blocked = false;
	}
	isAlive() {
		/* aparece , empieza a moverse,se bloquea todo
		 */
	}
	move() {}
	die() {
		/*   if (player kill cucaracha)
        cucaracha desaparece && se desbloquea todo*/
	}
	draw() {}
}
