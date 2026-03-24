export class Collectable {
    constructor(x, y, w, h, animator) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.animator = animator;
        this.collected = false;
    }

    draw(ctx, camera) {
        if (!this.collected) {
            this.animator.draw(ctx, this.x - camera.x, this.y - camera.y, this.w, this.h);
        }
    }

    checkCollision(player) {
        if (!this.collected &&
            player.x + player.w/2 > this.x &&
            player.x + player.w/2 < this.x + this.w &&
            player.y + player.h/2 > this.y &&
            player.y + player.h/2 < this.y + this.h) {
            this.collected = true;
            return true;
        }
        return false;
    }
}