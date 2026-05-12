export class Collectable {
    constructor(x, y, w, h, animator) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.animator = animator;
        this.collected = false;
    }

    draw(ctx, camera, noAni = false) {
        if (!this.collected) {
            this.animator.draw(ctx, this.x - camera.x, this.y - camera.y, this.w, this.h);
        }
        // if (noAni && !this.collected) { // for now until I make a sprite sheet, then i can remove this if block
        //     ctx.strokeStyle = "#000000";
        //     ctx.strokeRect(this.x - camera.x, this.y - camera.y, this.w, this.h);
        // }
    }

    checkCollision(player) {
        if (
            !this.collected &&
            player.x + player.w / 2 > this.x - 10 &&
            player.x + player.w / 2 < this.x + this.w + 10 &&
            player.y + player.h / 2 > this.y - 10 &&
            player.y + player.h / 2 < this.y + this.h + 10
        ) {
            this.onCollect?.(player); // FIRST

            this.collected = true;    // THEN

            this.playSound();
            return true;
        }
        return false;
    }
    
    updateReact(eventName) {
        window.dispatchEvent(new CustomEvent(eventName));
    }

    playSound() {
        // In child class override this and play correct sound
    }
}