class Ball {

    states = Object.freeze({
        INIT: 1,
        RUNNING: 2,
        MOVE_UP: 3,
        MOVE_DOWN: 4
    });

    constructor(canvas, radius, speed) {
        this.canvas = canvas;
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
        const step = this.speed * elapsedTime;

        if (this.state === this.states.INIT) {
            this.x += step;

            if (this.x >= this.canvas.width / 2) {
                this.state = this.states.RUNNING;
            }
        } else if (this.state === this.states.RUNNING) {
            if (this.x >= (this.canvas.width / 2) + this.radius || this.x <= (this.canvas.width / 2) - this.radius) {
                this.direction *= -1;
            }

            this.x += step * this.direction;
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
    }

    render() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.context.beginPath();
        this.context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        this.context.fillStyle = 'black';
        this.context.fill();
        this.context.closePath();
    }
}
