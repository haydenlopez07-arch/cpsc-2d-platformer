import { checkHazard } from "./systems/mapCollision.js";
import { playerMovement } from "./systems/playerMovement.js";
import { render, initializeLevels } from "./maps/render.js";
import { updateCollectables } from "./collectables/updateCollectables.js";
import { player } from "./entities/player.js";
import { enemies } from "./entities/enemy.js";

let lastTime = 0;

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

export function startGame(canvas) {
    if (!canvas || typeof canvas.getContext !== "function") {
        console.error("startGame requires a valid canvas element");
        return;
    }

    window.startGame = startGame;
    initializeLevels(canvas);
    requestAnimationFrame(loop);
}

// Make it available globally for the React component
window.startGame = startGame;