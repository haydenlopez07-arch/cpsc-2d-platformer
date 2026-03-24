import { coinAnimator } from "./coins.js";
import { heartAnimator } from "./hearts.js";

export function updateCollectables(dt) {
    coinAnimator.update(dt);
    heartAnimator.update(dt);
}