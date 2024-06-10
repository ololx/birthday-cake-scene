let canvas = document.getElementById('canvas');
let fpsInput = document.getElementById('fpsInput');
const image = new Image();
image.src = 'cake.png';
let sprite;
const idleFrames = [
  new Frame(0, 0, 150),
  new Frame(1, 0, 100),
  new Frame(2, 0, 150),
  new Frame(3, 0, 100),
  new Frame(4, 0, 150)
];

const runFrames = [
  new Frame(0, 1, 150),
  new Frame(1, 1, 150),
  new Frame(2, 1, 150),
  new Frame(3, 1, 150)
];

let ball;
let gameController;
let fpsCounter;
let gameLoop;

const animations = {
  idle: new Animation(idleFrames),
  right: new Animation(runFrames),
  left: new Animation(runFrames)
};

image.onload = function() {
  console.log('Image loaded successfully');

  sprite = new AnimatedSprite(image, 2, 5, animations);
  sprite.switchAnimation('idle');
  console.log('Create sprite');

  ball = new Ball(canvas, sprite, 20, 50);
  gameController = new GameController([ball]);
  fpsCounter = new FpsCounter(showFps);
  gameLoop = new GameLoop(90, gameController, fpsCounter);
};

image.onerror = function() {
  console.error('Failed to load image');
};

function showFps(fps) {
  document.getElementById('fps').innerText = fps;
}

function moveUp(fps) {
  ball.changeState(ball.states.RIGHT);
}

function startGame() {
  if (gameLoop && gameLoop.isActive()) {
    gameLoop.stop();
  }

  gameLoop = new GameLoop(parseInt(fpsInput.value, 10), gameController, fpsCounter);

  gameLoop.start();
}

function stopGame() {
  if (gameLoop) {
    gameLoop.stop();
  }
}

document.addEventListener("keydown", moveUp.bind());
//document.addEventListener("click", moveUp.bind());

