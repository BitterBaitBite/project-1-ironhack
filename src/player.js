class Player extends Entity {
      constructor(context, positionX, positionY, width, height, speed, imageUrl) {
            super(context, positionX, positionY, width, height, imageUrl);

            this.position.x -= width / 2;
            this.position.y -= height / 2;

            this.speed = speed;
            this.blocked = false;
      }

      move() { }

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
                        mato cucaracha
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
            console.log(this);

            this.context.fillStyle = "lightblue";
            this.context.fillRect(this.position.x, this.position.y, this.size.w, this.size.h);
      }
}
