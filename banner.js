const BANNER_STATES = Object.freeze({
    IDLE: 'IDLE',
    LIGHT: 'LIGHT'
});

class Banner {

    constructor(canvas, sprite, x , y) {
        this.sprite = sprite;
        this.context = canvas.getContext('2d');
        this.x = x;
        this.y = y;
        this.state = BANNER_STATES.IDLE;
    }

    update(elapsedTime) {
        this.sprite.update(elapsedTime);
    }

    changeState(state = BANNER_STATES.IDLE) {
        this.state = state;
        this.sprite.switchAnimation(state);
    }

    render() {
        if (this.state !== BANNER_STATES.IDLE) {
            this.sprite.draw(this.context, this.x - this.sprite.frameWidth / 2, this.y -  this.sprite.frameWidth / 2);
        }
    }
}

class BannerFactory {

    #image = new Image();

    constructor() {
        this.lightFrames = [
            new Frame(0, 0, 8),
            new Frame(1, 0, 8),
            new Frame(2, 0, 8),
            new Frame(3, 0, 8)
        ];

        this.animations = {
            LIGHT: new Animation(this.lightFrames)
        };
    }

    newInstance(canvas, imagePath, x, y) {
        this.#image.src = imagePath;
        return new Banner(canvas, new AnimatedSprite(this.#image, 1, 4, this.animations), x, y);
    }
}
