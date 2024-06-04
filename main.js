let canvas = document.getElementById('canvas');
let ball = new Ball(canvas, 20, 100);
let gameController = new GameController([ball]);
let fpsCounter = new FpsCounter(showFps);
let gameLoop = new GameLoop(60, gameController, fpsCounter);

function showFps(fps) {
  document.getElementById('fps').innerText = fps;
}

function moveUp(fps) {
  ball.state = ball.states.MOVE_UP;
}

document.addEventListener("keydown", moveUp);
document.addEventListener("click", moveUp);

gameLoop.start();
