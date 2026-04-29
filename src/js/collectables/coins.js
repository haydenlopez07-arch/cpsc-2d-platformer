import { Animator } from "../systems/animator.js";
import { Collectable } from "./collectablesBaseClass.js";
import playSound from "../systems/soundsManager";

const coinSpriteSheet = new Image();
coinSpriteSheet.src =
    "/assets/sprites/collectibles/coin.png";

export const coinAnimator = new Animator(coinSpriteSheet, 16, 16);
coinAnimator.addAnimation("spin", [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
coinAnimator.setAnimation("spin");

export class Coin extends Collectable {
    constructor(x, y) {
        super(x, y, 50, 50, coinAnimator);
    }

    playSound() {
        playSound("coin");
    }
}

// Array that holds all the coins
export const coins = [
    new Coin(550, 1350),
    new Coin(1050, 1200),
    new Coin(2000, 1200),
    new Coin(2300, 1430),
    new Coin(3000, 1430),
    new Coin(4600, 1270),
    new Coin(5000, 1400),
    new Coin(5200, 1300),
    new Coin(6200, 1280),
    new Coin(6550, 1350),
    new Coin(7500, 1600),
    new Coin(8500, 1600),
    new Coin(9500, 1600),
    new Coin(10500, 1600),
    new Coin(11500, 1600),
    new Coin(12500, 1600),
    new Coin(15500, 1600),
    new Coin(16100, 1700),
    new Coin(16720, 1200),
    new Coin(17100, 1700),
    new Coin(17500, 1300),
    new Coin(18500, 1200),
    new Coin(19100, 1180),
    new Coin(19500, 1650),
    new Coin(20500, 1200),
    new Coin(21500, 1650),
    new Coin(21500, 1300),
    
];