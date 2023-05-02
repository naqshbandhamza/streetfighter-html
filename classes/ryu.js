import { Player } from "./player.js";

export class Ryu extends Player {
  constructor(game, posX, posY, collisionRadius, speedModifier) {
    super(game, posX, posY, collisionRadius, speedModifier);
    this.image = document.getElementById("ryu");

    this.spriteHeight; // it is for every frame height & width
    this.spriteWidth;

    this.width; // it is for scalling
    this.height;

    this.spriteX;
    this.spriteY;
    this.row = 0;
    this.col = 0;

    this.startAnimation = true;
    this.animationCounter = 0;

    this.frameSet = [
      [
        { w: 80, h: 108, x: 12, y: 4 },
        { w: 80, h: 108, x: 86, y: 4 },
        { w: 80, h: 108, x: 164, y: 1 },
        { w: 80, h: 108, x: 240, y: 0 },
        { w: 80, h: 108, x: 315, y: 4 },
        { w: 80, h: 108, x: 386, y: 4 },
        { w: 80, h: 108, x: 456, y: 4 },
        { w: 80, h: 108, x: 532, y: 4 },
      ],
      [
        { w: 80, h: 108, x: 105, y: 125 },
        { w: 80, h: 108, x: 185, y: 125 },
        { w: 80, h: 108, x: 263, y: 125 },
        { w: 80, h: 108, x: 345, y: 125 },
        { w: 80, h: 108, x: 424, y: 122 },
        { w: 80, h: 108, x: 500, y: 120 },
      ],
      [
        { w: 80, h: 108, x: 58, y: 235 },
        { w: 80, h: 108, x: 137, y: 233 },
        { w: 80, h: 108, x: 222, y: 232 },
        { w: 80, h: 108, x: 298, y: 233 },
        { w: 80, h: 108, x: 373, y: 233 },
        { w: 80, h: 108, x: 449, y: 239 },
      ],
      [
        { w: 80, h: 108, x: 58, y: 344 },
        { w: 80, h: 108, x: 137, y: 344 },
        { w: 80, h: 108, x: 212, y: 344 },
        { w: 80, h: 108, x: 288, y: 344 },
        { w: 80, h: 108, x: 370, y: 344 },
        { w: 80, h: 108, x: 449, y: 344 },
      ],
      [
        { w: 80, h: 108, x: 34, y: 455 },
        { w: 80, h: 126, x: 110, y: 458 },
        { w: 80, h: 108, x: 189, y: 457 },
        { w: 80, h: 108, x: 266, y: 460 },
        { w: 80, h: 108, x: 343, y: 460 },
        { w: 80, h: 108, x: 420, y: 460 },
        { w: 80, h: 126, x: 500, y: 450 },
      ],
    ];

    window.addEventListener("keydown", (e) => {
      switch (e.key) {
        case "ArrowLeft":
          if (this.row !== 4) {
            this.game.mouse.x -= 20;
            if (this.row !== 3) {
              this.row = 3;
              this.col = 0;
            }
          }
          break;
        case "ArrowRight":
          if (this.row !== 4) {
            this.game.mouse.x += 20;
            if (this.row !== 2) {
              this.row = 2;
              this.col = 0;
            }
          }
          break;
        case "ArrowUp":
          // Up pressed
          if (this.row !== 4) {
            this.row = 4;
            this.col = 0;
          }
          break;
        case "ArrowDown":
          // Down pressed
          break;
      }
    });

    window.addEventListener("keyup", (e) => {
      switch (e.key) {
        case "ArrowLeft":
          if (this.row !== 4) {
            this.row = 1;
            this.col = 0;

            this.game.mouse.x = this.collisionX;
            this.game.mouse.y = this.collisionY;
          }
          break;
        case "ArrowRight":
          if (this.row !== 4) {
            this.row = 1;
            this.col = 0;

            this.game.mouse.x = this.collisionX;
            this.game.mouse.y = this.collisionY;
          }
          break;
        case "ArrowUp":
          // Up pressed

          break;
        case "ArrowDown":
          // Down pressed
          break;
      }
    });
  }

  animate() {
    if (this.row === 0 && this.startAnimation) {
      let max_counter = 0;

      if (this.row === 0 && this.col === 0) max_counter = 10;
      else max_counter = 4;

      if (this.animationCounter < max_counter) {
        this.animationCounter += 1;
      } else {
        if (this.col + 1 < this.frameSet[0].length) {
          this.col += 1;
        } else {
          this.startAnimation = false;
          this.row = 1;
          this.col = 0;
        }
        this.animationCounter = 0;
      }
    }
    if (this.row === 1 || this.row === 2 || this.row === 3 || this.row === 4) {
      let max_counter = 0;

      if (this.row === 1) max_counter = 4;
      else if (this.row === 4) {
        max_counter = 4;
        if (this.col >= 2 && this.col <= 4) max_counter = 8;
      } else max_counter = 2;

      if (this.animationCounter < max_counter) {
        this.animationCounter += 1;
      } else {
        if (this.col + 1 < this.frameSet[this.row].length) {
          this.col += 1;

          if (this.row === 4) {
            if (this.col >= 1 && this.col <= 3) {
              if (this.col === 1) this.game.mouse.y -= 500;
              else {
                this.game.mouse.y -= 20;
                this.game.mouse.x += 60;
              }
            } else if (this.col >= 4 && this.col <= 6) {
              this.game.mouse.y += 20;
              if (this.col === 6) {
                this.game.mouse.y += 500;
                this.game.mouse.x += 20;
              } else this.game.mouse.y += 20;
            }
          }
        } else {
          if (this.row === 4) {
            const dx = this.game.mouse.x - this.collisionX;
            const dy = this.game.mouse.y - this.collisionY;

            const distance = Math.hypot(dy, dx);

            if (distance > this.speedModifier) {
            } else {
              this.row = 1;
              this.col = 0;
            }
          } else {
            this.col = 0;
          }
        }
        this.animationCounter = 0;
      }
    }
  }

  drawSprite(context) {
    this.spriteHeight = this.frameSet[this.row][this.col].h;
    this.spriteWidth = this.frameSet[this.row][this.col].w;

    this.width = this.spriteWidth;
    this.height = this.spriteHeight;

    this.spriteX = this.collisionX - this.width * 0.8;
    this.spriteY = this.collisionY - this.height * 0.8;

    context.drawImage(
      this.image,
      this.frameSet[this.row][this.col].x,
      this.frameSet[this.row][this.col].y,
      this.spriteWidth,
      this.spriteHeight,
      this.spriteX,
      this.spriteY - 60,
      this.width * 1.8,
      this.height * 1.8
    );
  }
}
