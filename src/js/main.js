import { checkHazard } from "./systems/mapCollision.js";
import { playerMovement } from "./systems/playerMovement.js";
import { render, initializeLevels, getCurrentLevel } from "./maps/render.js";
import { updateCollectables } from "./collectables/updateCollectables.js";
import { player } from "./entities/player.js";
import { enemies } from "./entities/enemy.js";

let lastTime = 0;
let gamePaused = false;
let gameStartTime = Date.now();

function getTimeAliveSeconds() {
    return (Date.now() - gameStartTime) / 1000;
}

function dispatchGameEnded(reason) {
    const timeAlive = getTimeAliveSeconds();
    const event = new CustomEvent("levelEnded", {
        detail: {
            reason: reason,
            coinsCollected: player.collectedCoins,
            highestLevelAchieved: getCurrentLevel(),
            timeAlive: timeAlive
        }
    });
    window.dispatchEvent(event);
}

// function loop(timestamp) {

//     if (lastTime === 0) lastTime = timestamp;

//     let dt = (timestamp - lastTime) / 1000;
//     lastTime = timestamp;

//     if (dt > 0.1) dt = 0.1;


if (!gamePaused) {
    playerMovement(dt);
    for (const enemy of enemies) {
        enemy.update(dt, player);
    }

    checkHazard(player);
    updateCollectables(dt);
}

render();

//     requestAnimationFrame(loop);
// }

export function setGamePaused(paused) {
    gamePaused = Boolean(paused);
}

export { dispatchGameEnded };

export function startGame(canvas) {
    if (!canvas || typeof canvas.getContext !== "function") {
        console.error("startGame requires a valid canvas element");
        return;
    }

    gameStartTime = Date.now();
    window.getTimeAliveSeconds = getTimeAliveSeconds;
    window.startGame = startGame;
    window.setGamePaused = setGamePaused;
    initializeLevels(canvas);
    requestAnimationFrame(loop);
}

// Make it available globally for the React component
window.startGame = startGame;
window.setGamePaused = setGamePaused;
