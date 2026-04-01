import { Animator } from "../systems/animator.js";
import { Collectable } from "./collectablesBaseClass.js";

const swordSpriteSheet = new Image();
swordSpriteSheet.src = "./src/assets/sprites/collectibles/sword_sheet.png"

export const swordAnimator = new Animator(swordSpriteSheet, 32, 32);
swordAnimator.addAnimation("spin", [0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
swordAnimator.setAnimation("spin")

class Sword extends Collectable {
    constructor(x, y) {
        super(x, y, 80, 80, swordAnimator)
    }
    //NOTE If there is a way to make the hud update without having to override checkCollision, I will refactor.
    checkCollision(player) {
        if (!this.collected &&
            player.x + player.w / 2 > this.x &&
            player.x + player.w / 2 < this.x + this.w &&
            player.y + player.h / 2 > this.y &&
            player.y + player.h / 2 < this.y + this.h) {
            this.collected = true;
            // Dispatch a custom event to notify DungeonHUD.jsx
            window.dispatchEvent(new CustomEvent('swordCollected', { detail: { collected: true } }));
            return true;
        }
        return false;
    }
}

export const sword = [
    //NOTE this is a placeholder spot for the sword. The player will pick the sword up once they finish the first "platform/spikes" section.
    new Sword(350, 1730)
]