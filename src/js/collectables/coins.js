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
    new Coin(550, 1320),
    new Coin(1050, 1200),
    new Coin(2000, 1200),
    new Coin(2300, 1410),
    new Coin(3000, 1400),
    new Coin(4600, 1270),
    new Coin(5000, 1380),
    new Coin(5200, 1600),
    new Coin(6200, 1680),
    new Coin(6550, 1630),
    new Coin(7200, 1620),
    new Coin(7800, 1570),
    new Coin(8500, 1550),
    new Coin(9500, 1600),
    new Coin(10500, 1400),
    new Coin(11000, 1300),
    new Coin(11600, 1350),
    new Coin(12100, 1350),
    new Coin(12700, 1400),
    new Coin(13400, 1550)
    
]


export const bossCoins = [
    new Coin(1000, 530),
    new Coin(1500, 720),
    new Coin(1700, 490),
    new Coin(2200, 600),
    new Coin(2800, 500),
    new Coin(4100, 500),
    new Coin(4700, 680),
    new Coin(5000, 540),
    new Coin(5300, 600),
    new Coin(6000, 520),
    new Coin(6600, 720),
    new Coin(7000, 1820),
    new Coin(8300, 2120),
    new Coin(8400, 2340),
    new Coin(8000, 2470),
    new Coin(8200, 3000),
    new Coin(7800, 3220),
    new Coin(7700, 1220),
    new Coin(7200, 1520),
    new Coin(8000, 2720),
    new Coin(7200, 2520),
    new Coin(7600, 2920),
    new Coin(7000, 3720),
    new Coin(7600, 3320),
    new Coin(7900, 3120),
    new Coin(8020, 3400),
    new Coin(7300, 3920),
    new Coin(8200, 3820),
    new Coin(7600, 3720),
    new Coin(8400, 3810),
    new Coin(7100, 3020),
    new Coin(7400, 4000),
    new Coin(7700, 4380),
    new Coin(8200, 4220),
    new Coin(8670, 4520),
    new Coin(7380, 4220),
    new Coin(8380, 4320),
    new Coin(7700, 4120),

    new Coin(1300, 4120),
    new Coin(1700, 4070),
    new Coin(1400, 4220),
    new Coin(1580, 4320),
    new Coin(540, 4420),
    new Coin(780, 4380),
    new Coin(700, 3040),
    new Coin(280, 4320),
    new Coin(390, 4220),
    new Coin(300, 4120),
    new Coin(230, 3920),
    new Coin(450, 4360),
    new Coin(1420, 4080),
    new Coin(1180, 3820),
    new Coin(880, 4220),
    new Coin(780, 3910),
    new Coin(1380, 4320),
    new Coin(550, 4160)
];