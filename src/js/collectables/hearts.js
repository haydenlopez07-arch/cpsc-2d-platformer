import { Animator } from "../systems/animator.js";
import { Collectable } from "./collectablesBaseClass.js";

const heartSpriteSheet = new Image();
heartSpriteSheet.src =
    "/assets/sprites/collectibles/heart_sheet.png";

export const heartAnimator = new Animator(heartSpriteSheet, 128, 74);
heartAnimator.addAnimation("spin", [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
heartAnimator.setAnimation("spin");

class Heart extends Collectable {
    constructor(x, y) {
        super(x, y, 50, 50, heartAnimator);
    }
}

// Array that holds all the hearts
export const hearts = [
    new Heart(2100, 1500),
    new Heart(1800, 1730),
    new Heart(300, 1250)
];