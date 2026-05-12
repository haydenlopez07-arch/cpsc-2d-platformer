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
    new Coin(650, 1450),
    new Coin(700, 1400),
    new Coin(750, 1350),
    new Coin(1150, 1550),
    new Coin(1200, 1550),
    new Coin(2100, 1550),
    new Coin(2150, 1525),
    new Coin(2200, 1500),
    new Coin(2400, 1350),
    new Coin(2450, 1350),
    new Coin(2500, 1350),
    new Coin(3155, 1545),
    new Coin(3200, 1560),
    new Coin(3250, 1560),
    new Coin(3300, 1560),
    new Coin(4000, 970),
    new Coin(4050, 970),
    new Coin(4100, 970),
    new Coin(5000-150, 1725),
    new Coin(5025-150, 1725),
    new Coin(5050-150, 1725),
    new Coin(6200-150, 1725),
    new Coin(6550-150, 1725),
    new Coin(7500-150, 1725),
    new Coin(8500-150, 1725),
    new Coin(9500-150, 1725),
    new Coin(10500-150, 1725),
    new Coin(11500-150, 1725),
    new Coin(12500-150, 1725),
    new Coin(13950-150, 1725),
    new Coin(13950-150, 1750),
    new Coin(13925-150, 1750),
    new Coin(13975-150, 1700),
    new Coin(13975-150, 1725),
    new Coin(13975-150, 1750),
    new Coin(14000-150, 1725),
    new Coin(14000-150, 1750),
    new Coin(14025-150, 1750),
    
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