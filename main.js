let canvas = document.getElementById('canvas');
const image = new Image();
image.src = 'cake.png';

image.onload = function() {
  console.log('Image loaded successfully');
};

image.onerror = function() {
  console.error('Failed to load image');
};

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

const animations = {
  idle: new Animation(idleFrames),
  run: new Animation(runFrames),
};

const sprite = new AnimatedSprite(image, 2, 5, animations);
sprite.switchAnimation('run');
console.log('Create sprite');

let ball = new Ball(canvas, sprite, 20, 50);
let gameController = new GameController([ball]);
let fpsCounter = new FpsCounter(showFps);
let gameLoop = new GameLoop(90, gameController, fpsCounter);

function showFps(fps) {
  document.getElementById('fps').innerText = fps;
}

function moveUp(fps) {
  ball.state = ball.states.MOVE_UP;
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
