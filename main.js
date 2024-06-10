let canvas = document.getElementById('canvas');
let fpsInput = document.getElementById('fpsInput');

let sprite;
let ball;
let banner;
let gameController;
let fpsCounter;
let gameLoop;

console.log('Image loaded successfully');
ball = new CakeFactory().newInstance(canvas, 'cake.png', canvas.width / 2, canvas.height, 100);
banner = new BannerFactory().newInstance(canvas, 'happy_birthday.png', canvas.width / 2, 250);
gameController = new BirthdayCakeController(canvas, ball, banner);
fpsCounter = new FpsCounter(showFps);
gameLoop = new GameLoop(120, gameController, fpsCounter);
gameLoop.start();

function showFps(fps) {
  document.getElementById('fps').innerText = fps;
}

function moveUp(fps) {
  ball.changeState(CAKE_STATES.RIGHT);
  banner.changeState(BANNER_STATES.LIGHT);
}

document.addEventListener("keydown", moveUp.bind());
document.addEventListener("click", moveUp.bind());
