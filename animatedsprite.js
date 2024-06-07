class Frame {
    constructor(col, row, duration) {
        this.col = col;
        this.row = row;
        this.duration = duration;
    }
}

class Animation {
    constructor(frames) {
        this.frames = frames;
        this.currentFrameIndex = 0;
        this.elapsedTime = 0;
    }

    update(deltaTime) {
        const currentFrame = this.frames[this.currentFrameIndex];
        this.elapsedTime += deltaTime;

        if (this.elapsedTime > currentFrame.duration) {
            this.elapsedTime = 0;
            this.currentFrameIndex = (this.currentFrameIndex + 1) % this.frames.length;
        }
    }

    getCurrentFrame() {
        return this.frames[this.currentFrameIndex];
    }
}

class AnimatedSprite {
    constructor(image, rows, cols, animations) {
        this.image = image;
        this.rows = rows;
        this.cols = cols;
        this.frameWidth = image.width / cols;
        this.frameHeight = image.height / rows;
        this.animations = animations;
        this.currentAnimation = null;
    }

    switchAnimation(key) {
        if (this.animations[key]) {
            this.currentAnimation = this.animations[key];
        } else {
            console.error(`Animation ${key} does not exist`);
        }
    }

    update(deltaTime) {
        if (this.currentAnimation) {
            this.currentAnimation.update(deltaTime);
        }
    }

    draw(context, x, y) {
        if (!this.currentAnimation) {
            return;
        }

        const frame = this.currentAnimation.getCurrentFrame();
        const sx = frame.col * this.frameWidth;
        const sy = frame.row * this.frameHeight;

        context.drawImage(
            this.image,
            sx, sy, this.frameWidth, this.frameHeight,
            x, y, this.frameWidth, this.frameHeight
        );
    }
}
