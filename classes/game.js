import { Ryu } from "./ryu.js";
import { Computer } from "./enemy.js";

export class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.gameStart = false;
    this.timer = 0;
    this.mouse = {
      x: 200,
      y: this.height - 50 - 100,
      pressed: false,
    };
    this.player = new Ryu(this, this.mouse.x, this.mouse.y, 50, 8);
    this.opponent = new Computer(this, this.width * 0.8, this.mouse.y, 50, 3);
  }

  checkCollision(a, b) {
    const dx = a.collisionX - b.collisionX;
    const dy = a.collisionY - b.collisionY;
    const distance = Math.hypot(dy, dx);
    const sumofRadii = a.collisionRadius + b.collisionRadius;
    return distance < sumofRadii;
  }

  render(context, deltaTime) {
    if (this.gameStart) {
      if (this.timer > deltaTime) {
        context.clearRect(0, 0, this.width, this.height);
        this.player.update();
        //this.player.draw(context, "white");
        this.player.drawSprite(context);
        this.player.animate();
        //this.opponent.draw(context, "red");

        if (this.checkCollision(this.player, this.opponent)) {
          console.log("collison detected");
        }

        this.timer = 0;
      }
      this.timer += deltaTime;
    }
  }
}
