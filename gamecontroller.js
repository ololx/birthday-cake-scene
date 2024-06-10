class BirthdayCakeController extends GameController {

    constructor(canvas, cake, banner) {
        super([cake, banner]);
        this.canvas = canvas;
        this.context = canvas.getContext('2d');
    }

    processUpdate(elapsedTime) {
        super.processUpdate(elapsedTime);
    }

    processRender() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        super.processRender();
    }
}
