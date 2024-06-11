const WORLD_STATES = Object.freeze({
    IDLE: 'IDLE',
    LIGHT: 'LIGHT'
});

class World {

    constructor(body) {
        this.body = body;
        this.state = WORLD_STATES.IDLE;
    }

    changeState(state = WORLD_STATES.IDLE) {
        this.state = state;

        if (this.state === WORLD_STATES.LIGHT) {
            this.body.classList.add('animate');
        }
    }
}

class WorldFactory {

    constructor() {}

    newInstance(document) {
        return new World(document.body);
    }
}
