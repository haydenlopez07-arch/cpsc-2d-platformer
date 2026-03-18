import { checkHazard } from "./systems/mapCollision.js";
import { playerMovement } from "./systems/playerMovement.js";
import { render } from "./systems/render.js";
import { coinAnimator } from "./systems/coins.js";
import { player } from "./entities/player.js";
import { Enemy } from "./entities/enemy.js";

let lastTime = 0;

export const enemies = [];
enemies.push(new Enemy(240, 1200))



function loop(timestamp) {

    if (lastTime === 0) lastTime = timestamp;

    let dt = (timestamp - lastTime) / 1000;
    lastTime = timestamp;

    if (dt > 0.1) dt = 0.1;

    playerMovement(dt);
    for (const enemy of enemies) {
        enemy.update(dt, player);
    }

    checkHazard(player);
    coinAnimator.update(dt); // Should make a file in the future that will hold all collectibles to not clutter up main.js.
    render();

    requestAnimationFrame(loop);
}

requestAnimationFrame(loop);