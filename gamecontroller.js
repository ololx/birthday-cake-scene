class BirthdayCakeController extends GameController {

    constructor(canvas, cake, banner) {
        super([cake, banner]);
        this.canvas = canvas;
        this.context = canvas.getContext('2d');
        this.lightWaiting = 1600;
        this.animationStarted = false;
    }

    processUpdate(elapsedTime) {
        super.processUpdate(elapsedTime);

        if (this.animationStarted && this.gameObjects[0].state === CAKE_STATES.LIGHT) {
            if (this.lightWaiting <= 0) {
                this.gameObjects[1].changeState(BANNER_STATES.LIGHT);
                this.gameObjects[0].changeState(CAKE_STATES.LEFT);
            }

            this.lightWaiting -= elapsedTime;
        }
    }

    processRender() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        super.processRender();
    }

    startAnimation() {
        if (!this.animationStarted && this.gameObjects[0].state === CAKE_STATES.IDLE) {
            this.gameObjects[0].changeState(CAKE_STATES.RIGHT);
            this.gameObjects[1].changeState(BANNER_STATES.IDLE);
            this.animationStarted = true;
        }
    }
}
