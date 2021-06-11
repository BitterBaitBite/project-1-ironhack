//Collider (solid)

class Entity {
  constructor(context, positionX, positionY, width, height, imageUrl) {
    this.context = context;
    this.position = { x: positionX, y: positionY };
    this.size = { w: width, h: height };
    this.image = undefined;
    this.imageUrl = imageUrl;

    this.init();
  }

  init() {
    this.image = new Image();
    this.image.src = `./img/${this.imageUrl}`;
  }

  draw() {}
}
