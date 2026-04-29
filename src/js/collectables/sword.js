import { Animator } from "../systems/animator.js";
import { Collectable } from "./collectablesBaseClass.js";


const swordSpriteSheet = new Image();
swordSpriteSheet.src = "/assets/sprites/collectibles/sword_sheet.png"

export const swordAnimator = new Animator(swordSpriteSheet, 32, 32);
swordAnimator.addAnimation("spin", [0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
swordAnimator.setAnimation("spin")

class Sword extends Collectable {
    constructor(x, y) {
        super(x, y, 80, 80, swordAnimator)
    }

    onCollect(player) {
        if (player.mode === "sword") return; // prevent re-trigger

        player.mode = "sword";

        this.collected = true; // IMPORTANT (or whatever your base uses)

        window.dispatchEvent(new CustomEvent("swordCollected", {
            detail: { collected: true }
        }));
    }
}


export const sword = [
    //NOTE this is a placeholder spot for the sword. The player will pick the sword up once they finish the first "platform/spikes" section.
    new Sword(6300, 1430)
]