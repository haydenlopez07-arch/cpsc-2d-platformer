import { Animator } from "../systems/animator.js";
import { Collectable } from "./collectablesBaseClass.js";

const coinSpriteSheet = new Image();
coinSpriteSheet.src =
    "./src/assets/sprites/collectibles/coin.png";

export const coinAnimator = new Animator(coinSpriteSheet, 16, 16);
coinAnimator.addAnimation("spin", [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
coinAnimator.setAnimation("spin");

class Coin extends Collectable {
    constructor(x, y) {
        super(x, y, 50, 50, coinAnimator);
    }
    checkCollision(player) {
        if (!this.collected &&
            player.x + player.w / 2 > this.x &&
            player.x + player.w / 2 < this.x + this.w &&
            player.y + player.h / 2 > this.y &&
            player.y + player.h / 2 < this.y + this.h) {
            this.collected = true;
            // Dispatch a custom event to notify DungeonHUD.jsx
            window.dispatchEvent(new CustomEvent('coinCollected', { detail: { collected: true } }));
            return true;
        }
        return false;
    }
}

// Array that holds all the coins
export const coins = [
    new Coin(2300, 1500),
    new Coin(2000, 1730),
    new Coin(500, 1250)
];