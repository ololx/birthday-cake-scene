function loadImage(src) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = src;
        img.onload = () => resolve(img);
        img.onerror = () => reject(new Error(`Failed to load image at ${src}`));
    });
}

let gameController;
async function init() {
    const imageSrc1 = 'cake.png';
    const imageSrc2 = 'happy_birthday.png';

    const [image1, image2] = await Promise.all([
        loadImage(imageSrc1),
        loadImage(imageSrc2)
    ]);

    console.log('Images loaded successfully', image1, image2);

    const url = new URL(window.location.href);
    const messages = url.searchParams.getAll("message").map(message => escapeHTML(message));

    const canvas = document.getElementById('canvas');
    const cake = new CakeFactory().newInstance(canvas, image1, 50);
    const banner = new BannerFactory().newInstance(canvas, image2, canvas.width / 2, 250);
    const cakeLabel = new CakeLabelFactory().newInstance(cake, messages);
    const world = new WorldFactory().newInstance(document);
    gameController = new BirthdayCakeController(canvas, cake, banner, cakeLabel, world);
    const fpsCounter = new FpsCounter();
    const gameLoop = new GameLoop(60, gameController, fpsCounter);

    gameLoop.start();
}

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

document.addEventListener("keydown", moveUp.bind());
document.addEventListener("click", moveUp.bind());
