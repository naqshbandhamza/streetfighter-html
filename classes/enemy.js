import { Player } from "./player.js";

export class Computer extends Player {
  constructor(game, posX, posY, collisionRadius, speedModifier) {
    super(game, posX, posY, collisionRadius, speedModifier);
  }

  update() {
    const dx = this.game.player.collisionX - this.collisionX;
    const dy = this.game.player.collisionY - this.collisionY;

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

    this.collisionX += speedX * this.speedModifier;
    this.collisionY += speedY * this.speedModifier;
  }
}
