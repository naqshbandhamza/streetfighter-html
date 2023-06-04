import { Game } from "./classes/game.js";

// game sound effects
let sfx = {
  welcome: new Howl({
    src: ["./assets/titleTheme.mp3"],
  }),
  ryu: new Howl({
    src: ["./assets/ryu.mp3"],
  }),
};

// main game
window.addEventListener("load", function () {
  const canvas = document.getElementById("canvas1");
  const ctx = canvas.getContext("2d");
  canvas.width = 1280;
  canvas.height = 720;

  const game = new Game(canvas);

  /*document.getElementById("myNav").addEventListener("click", () => {
    document.getElementById("myNav").style.display = "none";
    game.gameStart = true;
    this.setTimeout(() => {
      sfx.ryu.play();
    }, 500);
  });*/

  game.gameStart = true;

  let lastTime = 0;
  function animate(timeStamp) {
    const deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;

    game.render(ctx, deltaTime);
    window.requestAnimationFrame(animate);
  }
  animate(0);
});
