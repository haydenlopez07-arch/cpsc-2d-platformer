import { keys } from "../systems/userInput.js";
import { LevelOneMap } from "./levelOneMapRender.js";
import { BossArena } from "./bossArenaRender.js";

let levelOne;
let bossArena;
let levels;
let canvas;

export function initializeLevels(gameCanvas) {
    canvas = gameCanvas;
    levelOne = new LevelOneMap(canvas);
    bossArena = new BossArena(canvas);
    levels = [levelOne, bossArena];
}

let canSwitch = true;
let currentLevel = 0;

function moveMaps() {
    if (keys.e && canSwitch && levels[currentLevel].canSwitch) {
        canSwitch = false;
        currentLevel = (currentLevel + 1) % levels.length;
        if (currentLevel === 0) levelOne.setPlayerPos(2000, 1750);
        if (currentLevel === 1) bossArena.setPlayerPos(540, 1605);
    }

    if (!keys.e) {
        canSwitch = true;
    }
}

export function getCurrentLevel() {
    return currentLevel;
}

export function render() {
    moveMaps();

    levels[currentLevel].render();
}