const CAKE_STATES = Object.freeze({
    INITIAL: 'INIT',
    IDLE: 'IDLE',
    RIGHT: 'MOVE_RIGHT',
    LEFT: 'MOVE_LEFT',
    LIGHT: 'LIGHT'
});

class Cake {

    constructor(canvas, sprite, x, y, width, height, speed = 100) {
        this.canvas = canvas;
        this.sprite = sprite;
        this.context = canvas.getContext('2d');
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speed = speed;
        this.changeState(CAKE_STATES.INITIAL);
    }

    update(elapsedTime) {
        const step = this.speed * elapsedTime / 1000;

        if (this.state === CAKE_STATES.RIGHT) {
            if (this.x >= canvas.width - this.width / 2) {
                this.changeState(CAKE_STATES.LIGHT);
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

    changeState(state = CAKE_STATES.INITIAL) {
        this.state = state;
        this.sprite.switchAnimation(state);
    }

    render() {
        this.sprite.draw(this.context, this.x - this.width / 2, this.y - this.height / 2);
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

        this.lightFrames = [
            new Frame(4, 1, 600),
            new Frame(0, 2, 500),
            new Frame(1, 2, 300),
            new Frame(2, 2, 200)
        ];

        this.animations = {
            INIT: new Animation(this.idleFrames),
            IDLE: new Animation(this.idleFrames),
            MOVE_RIGHT: new Animation(this.runFrames),
            MOVE_LEFT: new Animation(this.runFrames),
            LIGHT: new Animation(this.lightFrames)
        };
    }

    newInstance(canvas, imagePath, speed = 100) {
        this.#image.src = imagePath;
        return new Cake(
            canvas,
            new AnimatedSprite(this.#image, 3, 5, this.animations),
            canvas.width / 2,
            canvas.height - (this.#image.height / 6),
            this.#image.width / 5,
            this.#image.height / 3
        );
    }
}

const CAKE_LABEL_STATES = Object.freeze({
    HIDDEN: 0,
    TOUCH_ME: 1,
    MESSAGE: 2
});

class CakeLabel {

    constructor(canvas, text, messages, x, y, font = 'bold 30px Comic Sans MS', color = '#fff', outlineColor = '#000') {
        this.canvas = canvas;
        this.context = canvas.getContext('2d');
        this.text = text;
        this.messages = messages;
        this.x = x;
        this.y = y;
        this.font = font;
        this.color = color;
        this.outlineColor = outlineColor;
        this.state = CAKE_LABEL_STATES.TOUCH_ME;
        this.messageDuration = 2300;
        this.elapsedTime = 0.0;
        this.currentMessageIndex = 0;
    }

    update(deltaTime) {
        if (this.state === CAKE_LABEL_STATES.MESSAGE) {
            this.elapsedTime += deltaTime;

            if (this.elapsedTime >= this.messageDuration) {
                this.elapsedTime -= this.messageDuration;
                this.currentMessageIndex  = (this.currentMessageIndex + 1) % this.messages.length;
            }
        }
    }

    render() {
        if (this.state !== CAKE_LABEL_STATES.HIDDEN) {
            this.context.font = this.font;
            this.context.textAlign = 'center';
            this.context.textBaseline = 'middle';
            this.context.fillStyle = this.color;
            this.context.lineWidth = 5;
            this.context.strokeStyle = this.outlineColor;

            if (this.state === CAKE_LABEL_STATES.MESSAGE) {
                this.context.strokeText(this.messages[this.currentMessageIndex], this.x, this.y);
                this.context.fillText(this.messages[this.currentMessageIndex], this.x, this.y);
            } else {
                this.context.strokeText(this.text, this.x, this.y);
                this.context.fillText(this.text, this.x, this.y);
            }
        }
    }

    changeState(state = CAKE_LABEL_STATES.HIDDEN) {
        this.state = state;
        console.log(state)
    }
}

class CakeLabelFactory {

    #image = new Image();

    constructor() {
    }

    newInstance(cake, messages) {
        return new CakeLabel(
            cake.canvas,
            "Touch Me!!!",
            messages,
            cake.x,
            cake.y - ((cake.height / 6) * 4)
        );
    }
}
