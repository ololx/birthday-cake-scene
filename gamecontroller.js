class BirthdayCakeController extends GameController {

    constructor(canvas, cake, banner, cakeLabel, world) {
        super([cake, banner, cakeLabel, world]);
        this.canvas = canvas;
        this.context = canvas.getContext('2d');
        this.lightWaiting = 1600;
        this.animationStarted = false;
    }

    processUpdate(elapsedTime) {
        super.processUpdate(elapsedTime);

        if (this.animationStarted && this.gameObjects[0].state === CAKE_STATES.LIGHT) {
            if (this.lightWaiting <= 0) {
                this.gameObjects[3].changeState(WORLD_STATES.LIGHT);
                this.gameObjects[1].changeState(BANNER_STATES.LIGHT);
                this.gameObjects[0].changeState(CAKE_STATES.LEFT);
            }

            this.lightWaiting -= elapsedTime;
        }

        if (this.gameObjects[2].state !== CAKE_LABEL_STATES.MESSAGE && this.gameObjects[0].state === CAKE_STATES.IDLE) {
            console.log(this.gameObjects[0].state);
            this.gameObjects[2].changeState(CAKE_LABEL_STATES.MESSAGE);
        }
    }

    processRender() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        super.processRender();
    }

    startAnimation() {
        if (!this.animationStarted && this.gameObjects[0].state === CAKE_STATES.INITIAL) {
            this.gameObjects[0].changeState(CAKE_STATES.RIGHT);
            this.gameObjects[1].changeState(BANNER_STATES.IDLE);
            this.gameObjects[3].changeState(WORLD_STATES.IDLE);
            this.gameObjects[2].changeState(CAKE_LABEL_STATES.HIDDEN);
            this.animationStarted = true;
        }
    }
}
