const canvas = document.getElementById('canvas');
const fpsInput = document.getElementById('fpsInput');

const cake = new CakeFactory().newInstance(canvas, 'cake.png', 50);
const banner = new BannerFactory().newInstance(canvas, 'happy_birthday.png', canvas.width / 2, 250);
const cakeLabel = new CakeLabelFactory().newInstance(cake);
const world = new WorldFactory().newInstance(document);
const gameController = new BirthdayCakeController(canvas, cake, banner, cakeLabel, world);
const fpsCounter = new FpsCounter((fps) => console.log(fps));
const gameLoop = new GameLoop(60, gameController, fpsCounter);
gameLoop.start();

function moveUp(fps) {
  gameController.startAnimation();
}

document.addEventListener("keydown", moveUp.bind());
document.addEventListener("click", moveUp.bind());
