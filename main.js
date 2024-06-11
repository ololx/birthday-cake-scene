const canvas = document.getElementById('canvas');
let gameController;

function moveUp() {
    gameController.startAnimation();
}

function escapeHTML(str) {
    return str.replace(/[&<>"']/g, function(match) {
        const escape = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#39;'
        };
        return escape[match];
    });
}

function init() {
    const url = new URL(window.location.href);
    const messages = url.searchParams.getAll("message").map(message => escapeHTML(message));
    const cake = new CakeFactory().newInstance(canvas, 'cake.png', 50);
    const banner = new BannerFactory().newInstance(canvas, 'happy_birthday.png', canvas.width / 2, 250);
    const cakeLabel = new CakeLabelFactory().newInstance(cake, messages);
    const world = new WorldFactory().newInstance(document);
    gameController = new BirthdayCakeController(canvas, cake, banner, cakeLabel, world);
    const fpsCounter = new FpsCounter((fps) => {});
    const gameLoop = new GameLoop(60, gameController, fpsCounter);

    gameLoop.start();
}

document.addEventListener("keydown", moveUp.bind());
document.addEventListener("click", moveUp.bind());
