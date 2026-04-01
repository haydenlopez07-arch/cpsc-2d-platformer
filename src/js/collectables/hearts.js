import { Animator } from "../systems/animator.js";
import { Collectable } from "./collectablesBaseClass.js";

const heartSpriteSheet = new Image();
heartSpriteSheet.src =
    "./src/assets/sprites/collectibles/heart_sheet.png";

export const heartAnimator = new Animator(heartSpriteSheet, 128, 74);
heartAnimator.addAnimation("spin", [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
heartAnimator.setAnimation("spin");

class Heart extends Collectable {
    constructor(x, y) {
        super(x, y, 50, 50, heartAnimator);
    }

    checkCollision(player) {
        if (!this.collected &&
            player.x + player.w / 2 > this.x &&
            player.x + player.w / 2 < this.x + this.w &&
            player.y + player.h / 2 > this.y &&
            player.y + player.h / 2 < this.y + this.h) {
            this.collected = true;
            // Dispatch a custom event to notify DungeonHUD.jsx
            window.dispatchEvent(new CustomEvent('heartCollected', { detail: { collected: true } }));
            return true;
        }
        return false;
    }
}

// Array that holds all the hearts
export const hearts = [
    new Heart(2100, 1500),
    new Heart(1800, 1730),
    new Heart(300, 1250)
];