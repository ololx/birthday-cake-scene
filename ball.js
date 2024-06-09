class Ball {

    states = Object.freeze({
        INIT: 1,
        RUNNING: 2,
        MOVE_UP: 3,
        MOVE_DOWN: 4
    });

    constructor(canvas, sprite, radius, speed) {
        this.canvas = canvas;
        this.sprite = sprite;
        this.context = canvas.getContext('2d');
        this.radius = radius;
        this.speed = speed;
        this.x = radius;
        this.y = canvas.height - radius;
        this.state = this.states.INIT;
        this.direction = 1;
        this.jdirection = -1;
    }

    update(elapsedTime) {
        const step = this.speed * elapsedTime / 1000;

        if (this.state === this.states.INIT) {
            this.x += step;

            if (this.x >= this.canvas.width / 2) {
                this.state = this.states.RUNNING;
                this.sprite.switchAnimation('idle')
            }
        } else if (this.state === this.states.RUNNING) {

        } else if (this.state === this.states.MOVE_UP) {
            this.y -= step;
        } else if (this.state === this.states.MOVE_DOWN) {
            this.y += step;

            if (this.y > this.canvas.height - this.radius) {
                this.y = this.canvas.height - this.radius;
                this.state = this.states.RUNNING;
            }
        }

        if (this.y <= (this.canvas.height / 2)) {
            this.state = this.states.MOVE_DOWN
        }

        sprite.update(elapsedTime);
    }

    render() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        sprite.draw(this.context, this.x - sprite.frameWidth / 2, this.y - sprite.frameHeight);
    }
}
