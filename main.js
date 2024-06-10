let canvas = document.getElementById('canvas');
let fpsInput = document.getElementById('fpsInput');

let sprite;
let cake;
let banner;
let gameController;
let fpsCounter;
let gameLoop;

console.log('Image loaded successfully');
cake = new CakeFactory().newInstance(canvas, 'cake.png', 50);
banner = new BannerFactory().newInstance(canvas, 'happy_birthday.png', canvas.width / 2, 250);
gameController = new BirthdayCakeController(canvas, cake, banner);
fpsCounter = new FpsCounter((fps) => console.log(fps));
gameLoop = new GameLoop(120, gameController, fpsCounter);
gameLoop.start();

function moveUp(fps) {
  gameController.startAnimation();
}

document.addEventListener("keydown", moveUp.bind());
document.addEventListener("click", moveUp.bind());
