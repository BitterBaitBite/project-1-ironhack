# project-1-ironhack

## Especifications

- Index.html

- Index.js

- App.js

Crear context

Inicializar tamaño canvas

Establecer los eventos:

Movimiento jugador (WASD, flechas, etc.)(Extra: mover con ratón)

Coger comida (Extra: caja y cuenta)

Servir comida

Matar cucaracha

Crear todos los objetos

Dibujar todo (fondo independiente)

Mover todo (cucarachas)

Borrar pantalla

Bloquear por cucaracha

Iniciar el juego(dibujar, actualizar, etc.)

- Jugador

Contexto

Posición

Tamaño

Imagen

Collider (solid)

Velocidad

Mover

Interactuar con mesa

Interactuar con cocina

Coger comida

Dejar comida

Bloquear por cucaracha

Pisar

Dibujar

- Mesa/Cliente

Contexto

Posición

Tamaño

Imagen

Collider (solid)

Llamar camarero (exclamación)

Pedir comida (comida pedida visible)

Esperar comanda

Esperar comida

Recibir atención comanda

Recibir comida

Reiniciar mesa

Dibujar

- Cocina (Más cocinas, una por tipo de comida)

Contexto

Posición

Tamaño

Imagen

Collider (solid)

Tipo de comida

Tiempo de cocinar

Activarse (detecta el nº de activaciones)

Cocinar (tiempo)

Entregar comida al camarero

Dibujar

- Papelera

Contexto

Posición

Tamaño

Imagen

Collider (solid)

Tirar comida

Dibujar

- Comida (Más variedad comida)

Contexto

Posición

Tamaño

Imagen

Tipo de comida

Estado Cocinada/No cocinada

Desaparecer

Dibujar

- Cucaracha (bloquear comida)

Contexto

Posición

Tamaño

Imagen

Collider

isAlive

Mover

Morir

Desaparecer

Dibujar

- HUD

Tiempo restante día

Sistema vidas por cliente enfadado ?

- (Extra: La cucaracha hay que llevarla a la papelera)

- (Extra: Cuenta - Caja)

- (Extra: Más mesas)

- (Extra: Cinta comida)

- (Extra: Clientes)

- (Extra: El camarero debe parar la cocina & La comida se puede quemar)

- El sistema consiste en que el cliente (MESA) llama al CAMARERO, este se tiene que acercar, activar la COMANDA, de manera que aparece visualmente la comida que quiere dicha MESA, por lo que el CAMARERO debe ir hasta la COCINA que prepara esa COMIDA y activarla.

- La COMIDA tarda en prepararse un TIEMPO.

- Cuando la COMIDA está preparada, el CAMARERO debe llevarla a la MESA correspondiente

- Hay un TIEMPO MÁXIMO para atender la COMANDA

- Hay un TIEMPO MÁXIMO para llevar la COMIDA

- Hay un TIEMPO MÁXIMO del servicio (cuenta atrás)

- Cuando la CUCARACHA lleva mucho tiempo se BLOQUEA TODO hasta que se MATA

- La COCINA puede aceptar MULTIPLES COMANDAS pero el CAMARERO solo puede llevar una
