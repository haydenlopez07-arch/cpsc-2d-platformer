import { checkHazard } from "./systems/mapCollision.js";
import { playerMovement } from "./systems/playerMovement.js";
import { render } from "./systems/render.js";
import { updateCollectables } from "./collectables/updateCollectables.js";
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
    updateCollectables(dt);
    render();

    requestAnimationFrame(loop);
}

requestAnimationFrame(loop);