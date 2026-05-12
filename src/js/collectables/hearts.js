import { Collectable } from "./collectablesBaseClass";
import { Animator } from "../systems/animator.js";
import playSound from "../systems/soundsManager";

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

    playSound() {
        playSound("heart")
    }
}

// Array that holds all the hearts
export const hearts = [
    // new Heart(300, 1400),
    // new Heart(1000, 1410),
    // new Heart(2100, 1300),
    // new Heart(3600, 1200),
    // new Heart(4100, 1410),
    // new Heart(4800, 1380),
    // new Heart(5600, 1610),
    // new Heart(6900, 1680),
    // new Heart(7300, 1620),
    // new Heart(8100, 1580),
    // new Heart(9100, 1600),
    // new Heart(10100, 1700),
    // new Heart(12200, 1290),
    // new Heart(13500, 1420)
    new Heart(7350, 1725),
    new Heart(8300, 1725),
    new Heart(9780, 1725),
    new Heart(16100, 1200)

];

export const bossHearts = [
    new Heart(650, 4500),
    new Heart(1500, 4500),
    new Heart(2700, 4390),
    new Heart(4100, 4440),
    new Heart(5300, 4510),
    new Heart(6500, 4585),
    new Heart(8800, 4400),

];

// export const bossHearts = [
//     new Heart(1200, 520)
// ];