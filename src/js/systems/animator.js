export class Animator {
    constructor(spriteSheet, frameWidth, frameHeight) {
        this.spriteSheet = spriteSheet;
        this.frameWidth = frameWidth; // So we can single out each sprite on sheet
        this.frameHeight = frameHeight;
        this.animations = {};
        this.currentAnimation = null;
        this.frameIndex = 0;
        this.frameTimer = 0;
        this.frameInterval = 0.15; // seconds per frame
    }
    //creates an animation
    addAnimation(name, frames) {
        this.animations[name] = frames;

        if (!this.currentAnimation) {
            this.currentAnimation = frames;
        }
    }
    //changes animation depending on boolean
    setAnimation(name) {
        const newAnimation = this.animations[name];

        if (this.currentAnimation !== newAnimation) {
            this.currentAnimation = newAnimation;
            this.frameIndex = 0;
            this.frameTimer = 0;
        }
    }
    //updates time
    update(dt) {
        if (!this.currentAnimation) return;

        this.frameTimer += dt;

        if (this.frameTimer >= this.frameInterval) {
            this.frameTimer = 0;
            this.frameIndex++;

            if (this.frameIndex >= this.currentAnimation.length) {
                this.frameIndex = 0;
            }
        }
    }
    //method to draw each image
    draw(ctx, x, y, width, height) {
        if (!this.currentAnimation) return;
        if (!this.spriteSheet || !this.spriteSheet.complete || this.spriteSheet.naturalWidth === 0) return;

        const frameNumber = this.currentAnimation[this.frameIndex];

        ctx.drawImage(
            this.spriteSheet,
            frameNumber * this.frameWidth,
            0,
            this.frameWidth,
            this.frameHeight,
            x,
            y,
            width,
            height
        );
    }

}