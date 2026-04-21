import { checkHazard } from "./systems/mapCollision";
import { applySelectedCharacter } from "./systems/playerSetup";
import { playerMovement } from "./systems/playerMovement";
import { render, initializeLevels } from "./maps/render";
import { updateCollectables } from "./collectables/updateCollectables";

import { player } from "./entities/player";
import { enemies } from "./entities/enemy";
import { updatePlayerCoins } from "./systems/scoresManager";

import {
  combatTimers,
  enemyAttack,
  playerAttack,
  removeEnemy,
  removeEnemyInPit,
  resetPlayer,
} from "./systems/damageSystem";

let lastTime = 0;
let lastKnownHealth = player.health;
let lastKnownMaxHealth = player.maxHealth;
let lastSavedCoinCount = 0;
let gamePaused = false;
let gameLoopStarted = false;

// temporary input flag for attacks
let attackPressed = false;

function emitPlayerHealthChanged(): void {
  window.dispatchEvent(
    new CustomEvent("playerHealthChanged", {
      detail: {
        health: player.health,
        maxHealth: player.maxHealth,
        isDead: player.isDead,
      },
    }),
  );
}

function syncPlayerHealthHud(force = false): void {
  if (
    force ||
    player.health !== lastKnownHealth ||
    player.maxHealth !== lastKnownMaxHealth
  ) {
    emitPlayerHealthChanged();
    lastKnownHealth = player.health;
    lastKnownMaxHealth = player.maxHealth;
  }
}

window.addEventListener("keydown", (event: KeyboardEvent) => {
  if (event.code === "KeyF" && !event.repeat) {
    attackPressed = true;
  }
});

function loop(timestamp: number): void {
  if (lastTime === 0) lastTime = timestamp;

  let dt = (timestamp - lastTime) / 1000;
  lastTime = timestamp;

  if (dt > 0.1) dt = 0.1;

  if (gamePaused) {
    requestAnimationFrame(loop);
    return;
  }

  // movement
  playerMovement(dt);

  // enemy AI / movement
  for (const enemy of enemies) {
    enemy.update(dt, player);
  }

  // map hazards
  checkHazard(player);
  removeEnemyInPit(enemies);

  // collectables
  updateCollectables(dt);

  // combat timers
  combatTimers(player, enemies, dt);

  // player attack input
  if (attackPressed) {
    playerAttack(player, enemies);
    attackPressed = false;
  }

  // enemy touching player
  enemyAttack(player, enemies);
  syncPlayerHealthHud();

  // remove dead enemies
  removeEnemy(enemies);

  // player death/reset
  if (player.isDead) {
    const unsavedCoins = player.collectedCoins - lastSavedCoinCount;
    if (unsavedCoins > 0) {
      updatePlayerCoins(unsavedCoins);
      lastSavedCoinCount = player.collectedCoins;
    }

    resetPlayer(player);
    syncPlayerHealthHud();
  }

  // draw everything
  render(dt);
  syncPlayerHealthHud();

  requestAnimationFrame(loop);
}

export function setGamePaused(paused: boolean): void {
  gamePaused = Boolean(paused);
}

export function startGame(canvas: HTMLCanvasElement): void {
  if (!canvas || typeof canvas.getContext !== "function") {
    console.error("startGame requires a valid canvas element");
    return;
  }

  // window.startGame = startGame;
  applySelectedCharacter();
  initializeLevels(canvas);
  window.setGamePaused = setGamePaused;
  syncPlayerHealthHud(true);

  if (!gameLoopStarted) {
    gameLoopStarted = true;
    requestAnimationFrame(loop);
  }
}

// Make it available globally for the React component
// declare global {
//     interface Window {
//         startGame: (canvas: HTMLCanvasElement) => void;
//     }
// }

// window.startGame = startGame;
