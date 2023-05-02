export class Player {
  constructor(game, posX, posY, collisionRadius, speedModifier) {
    this.game = game;
    this.collisionX = posX;
    this.collisionY = posY;
    this.collisionRadius = collisionRadius;
    this.speedModifier = speedModifier;
  }

  updatePosition(speedX, speedY) {
    if (this.collisionX + speedX * this.speedModifier < this.collisionRadius) {
      this.collisionX = 0 + this.collisionRadius;
      this.game.mouse.x = 0 + this.collisionRadius;
    } else if (
      this.collisionX + speedX * this.speedModifier >
      this.game.width - this.collisionRadius
    ) {
      this.collisionX = this.game.width - this.collisionRadius;
      this.game.mouse.x = this.game.width - this.collisionRadius;
    } else this.collisionX += speedX * this.speedModifier;

    if (this.collisionY + speedY * this.speedModifier < this.collisionRadius) {
      this.collisionY = 0 + this.collisionRadius;
      this.game.mouse.y = 0 + this.collisionRadius;
    } else if (
      this.collisionY + speedY * this.speedModifier >
      this.game.height - this.collisionRadius - 100
    ) {
      this.collisionY = this.game.height - this.collisionRadius - 100;
      this.game.mouse.y = this.game.height - this.collisionRadius - 100;
    } else this.collisionY += speedY * this.speedModifier;
  }

  update() {
    const dx = this.game.mouse.x - this.collisionX;
    const dy = this.game.mouse.y - this.collisionY;

    const distance = Math.hypot(dy, dx);

    let speedX;
    let speedY;

    if (distance > this.speedModifier) {
      speedX = dx / distance || 0;
      speedY = dy / distance || 0;
    } else {
      speedX = 0;
      speedY = 0;
    }

    this.updatePosition(speedX, speedY);
  }

  // draw collison circle
  draw(context, fillColor) {
    context.beginPath();
    context.fillStyle = fillColor;
    context.arc(
      this.collisionX,
      this.collisionY,
      this.collisionRadius,
      0,
      Math.PI * 2,
      false
    );
    context.save();
    context.globalAlpha = 0.5;
    context.fill();
    context.restore();
  }
}
