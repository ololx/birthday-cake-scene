const CAKE_STATES = Object.freeze({
    IDLE: 'IDLE',
    RIGHT: 'MOVE_RIGHT',
    LEFT: 'MOVE_LEFT',
    LIGHT: 'LIGHT'
});

class Cake {

    constructor(canvas, sprite, x, y, speed = 100) {
        this.canvas = canvas;
        this.sprite = sprite;
        this.context = canvas.getContext('2d');
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.changeState(CAKE_STATES.IDLE);
    }

    update(elapsedTime) {
        const step = this.speed * elapsedTime / 1000;

        if (this.state === CAKE_STATES.RIGHT) {
            if (this.x >= canvas.width) {
                this.changeState(CAKE_STATES.LEFT);
            } else {
                this.x += step;
            }
        } else if (this.state === CAKE_STATES.LEFT) {
            if (this.x <= canvas.width / 2) {
                this.x = canvas.width / 2;
                this.changeState(CAKE_STATES.IDLE);
            } else {
                this.x -= step;
            }
        }

        this.sprite.update(elapsedTime);
    }

    changeState(state = CAKE_STATES.IDLE) {
        this.state = state;
        this.sprite.switchAnimation(state);
    }

    render() {
        this.sprite.draw(this.context, this.x - this.sprite.frameWidth / 2, this.y - this.sprite.frameHeight);
    }
}

class CakeFactory {

    #image = new Image();

    constructor() {
        this.idleFrames = [
            new Frame(0, 0, 200),
            new Frame(1, 0, 150),
            new Frame(2, 0, 200),
            new Frame(3, 0, 150),
            new Frame(4, 0, 200)
        ];

        this.runFrames = [
            new Frame(0, 1, 200),
            new Frame(1, 1, 200),
            new Frame(2, 1, 200),
            new Frame(3, 1, 200)
        ];

        this.animations = {
            IDLE: new Animation(this.idleFrames),
            MOVE_RIGHT: new Animation(this.runFrames),
            MOVE_LEFT: new Animation(this.runFrames),
            LIGHT: new Animation(this.idleFrames)
        };
    }

    newInstance(canvas, imagePath, x, y, speed) {
        this.#image.src = imagePath;
        return new Cake(canvas, new AnimatedSprite(this.#image, 2, 5, this.animations), x, y);
    }
}
