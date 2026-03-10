import { horizontal, vertical} from "./systems/mapCollision.js";
import { playerMovement } from "./systems/playerMovement.js";
import { player } from "./entities/player.js";
import { render } from "./systems/render.js";
import { coinAnimator } from "./systems/coins.js";

let lastTime = 0;

function loop(timestamp) {

    if (lastTime === 0) lastTime = timestamp;

    let dt = (timestamp - lastTime) / 1000;
    lastTime = timestamp;

    if (dt > 0.1) dt = 0.1;

    playerMovement(dt);
    coinAnimator.update(dt); // Should make a file in the future that will hold all collectibles to not clutter up main.js.
    vertical(player);
    horizontal(player);
    render();

    requestAnimationFrame(loop);
}

requestAnimationFrame(loop);