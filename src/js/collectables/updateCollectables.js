import { coinAnimator } from "./coins.js";
import { heartAnimator } from "./hearts.js";
import { swordAnimator } from "./sword.js";

export function updateCollectables(dt) {
    coinAnimator.update(dt);
    heartAnimator.update(dt);
    swordAnimator.update(dt)
}