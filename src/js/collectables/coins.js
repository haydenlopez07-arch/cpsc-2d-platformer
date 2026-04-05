import { Animator } from "../systems/animator.js";
import { Collectable } from "./collectablesBaseClass.js";

const coinSpriteSheet = new Image();
coinSpriteSheet.src =
    "/assets/sprites/collectibles/coin.png";

export const coinAnimator = new Animator(coinSpriteSheet, 16, 16);
coinAnimator.addAnimation("spin", [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
coinAnimator.setAnimation("spin");

class Coin extends Collectable {
    constructor(x, y) {
        super(x, y, 50, 50, coinAnimator);
    }
}

// Array that holds all the coins
export const coins = [
    new Coin(2300, 1500),
    new Coin(2000, 1730),
    new Coin(500, 1250)
];