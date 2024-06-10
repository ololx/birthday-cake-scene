class Ball {

    states = Object.freeze({
        IDLE: 'idle',
        RIGHT: 'right',
        LEFT: 'left',
        LIGHT: 'light'
    });

    constructor(canvas, sprite, radius, speed) {
        this.canvas = canvas;
        this.sprite = sprite;
        this.context = canvas.getContext('2d');
        this.radius = radius;
        this.speed = speed;
        this.x = canvas.width/2 - radius;
        this.y = canvas.height - radius;
        this.state = this.states.IDLE;
    }

    update(elapsedTime) {
        const step = this.speed * elapsedTime / 1000;

        if (this.state === this.states.RIGHT) {
            if (this.x >= canvas.width - this.radius) {
                this.changeState(this.states.LEFT);
            } else {
                this.x += step;
            }
        } else if (this.state === this.states.LEFT) {
            if (this.x <= canvas.width/2 - this.radius) {
                this.x = canvas.width/2 - this.radius;
                this.changeState(this.states.IDLE);
            } else {
                this.x -= step;
            }
        }

        sprite.update(elapsedTime);
    }

    changeState(state = this.states.IDLE) {
        this.state = state;
        this.sprite.switchAnimation(state);
    }

    render() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        sprite.draw(this.context, this.x - sprite.frameWidth / 2, this.y - sprite.frameHeight);
    }
}
