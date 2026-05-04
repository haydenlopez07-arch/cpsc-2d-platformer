import { map as levelOne, tileSize, TILES } from "../maps/level1Map.js";
import { map as bossMap, TILES as arenaTILES } from "../maps/bossArena.js";
import { getCurrentLevel } from "../maps/render.js";
import { isGodModeEnabled } from "./godMode.ts";

let solidTiles = [TILES.BOX, TILES.GRASS, TILES.DIRT];
const horizontalBuffer = .3;
const verticalBuffer = .2;

function getTile(col, row) {
    const map = getCurrentLevel() % 2 === 0 ? levelOne : bossMap;
    solidTiles = map === levelOne ? [TILES.BOX, TILES.GRASS, TILES.DIRT] :
        [arenaTILES.DARK, arenaTILES.DIRT, arenaTILES.PAVED_FLOOR,
        arenaTILES.FLOOR_CORNER_LEFT, arenaTILES.FLOOR_LEFT,
        arenaTILES.FLOOR_CORNER_RIGHT, arenaTILES.FLOOR_RIGHT,
        arenaTILES.BRICK1, arenaTILES.BRICK2,
        arenaTILES.BROWN_BRICK1, arenaTILES.BROWN_BRICK2,
        arenaTILES.CEILING, arenaTILES.CEILING_RIGHT
        ];

    if (row < 0 || row >= map.length) return 4;
    if (col < 0 || col >= map[0].length) return 4;
    return map[row][col];
}
const map = getCurrentLevel() % 2 === 0 ? levelOne : bossMap;
// function to reset character to start location
function resetEntity(entity) {
    entity.x = 200;
    entity.y = 1500;
    entity.vx = 0;
    entity.vy = 0;
    entity.grounded = false;
}

export function horizontal(entity) {
    //Converts player position into tile coordinates
    const leftTile = Math.floor(entity.x / tileSize);
    const rightTile = Math.floor((entity.x + entity.w - 1) / tileSize);
    const topTile = Math.floor(entity.y / tileSize);
    const bottomTile = Math.floor((entity.y + entity.h - 1) / tileSize);
    for (let row = topTile; row <= bottomTile; row++) {
        if (entity.vx > 0) {
            // console.log("RIGHT")
            for (let col = rightTile; col >= leftTile; col--) {
                if (solidTiles.includes(getTile(col, row))) {
                    entity.x = col * tileSize - entity.w - horizontalBuffer;
                    entity.vx = 0;
                    break;
                }
            }
        } else if (entity.vx < 0) {
            // console.log("LEFT")
            for (let col = leftTile; col <= rightTile; col++) {
                if (solidTiles.includes(getTile(col, row))) {
                    entity.x = (col + 1) * tileSize + horizontalBuffer;
                    entity.vx = 0;
                    break;
                }
            }
        }
        if (entity.vx === 0) break;
    }
    if (entity.x < 0) entity.x = 0;
    if (entity.x + entity.w > map[0].length * tileSize) {
        entity.x = map[0].length * tileSize - entity.w;
        entity.vx = 0;
    }
}

export function vertical(entity) {
    const leftTile = Math.floor((entity.x + 1) / tileSize);
    const rightTile = Math.floor((entity.x + entity.w - 1) / tileSize);

    // player falling
    if (entity.vy > 0) {
        const bottom = Math.floor((entity.y + entity.h - 1 + verticalBuffer) / tileSize);
        for (let col = leftTile; col <= rightTile; col++) {
            if (solidTiles.includes(getTile(col, bottom))) {

                entity.y = bottom * tileSize - entity.h;
                entity.vy = 0;
                entity.grounded = true;
                return;
            }
        }
    }
    else if (entity.vy < 0) {
        const top = Math.floor(entity.y / tileSize);
        for (let col = leftTile; col <= rightTile; col++) {
            if (solidTiles.includes(getTile(col, top))) {
                entity.y = (top + 1) * tileSize;
                entity.vy = 0;
                return;
            }
        }
    }

    // standing check
    const below = Math.floor((entity.y + entity.h + verticalBuffer) / tileSize);
    for (let col = leftTile; col <= rightTile; col++) {
        if (solidTiles.includes(getTile(col, below))) {
            entity.grounded = true;
            return;
        }
    }
}

function hazBox(entity){
    return {
        x: entity.x + 3,
        y: entity.y + 2,
        w: entity.w - 3,
        h: entity.h - 2
    }
}

export function checkHazard(entity) {
    if (isGodModeEnabled()) {
        return false;
    }

    //Converts player position into tile coordinates
    const leftTile = Math.floor(entity.x / tileSize);
    const rightTile = Math.floor((entity.x + entity.w - 1) / tileSize);
    const topTile = Math.floor(entity.y / tileSize);
    const bottomTile = Math.floor((entity.y + entity.h - 1) / tileSize);

    for (let row = topTile; row <= bottomTile; row++) {
        for (let col = leftTile; col <= rightTile; col++) {
            if (getTile(col, row) === TILES.SPIKE) {
                resetEntity(entity);
                return true;
            }
        }
    }
    return false;
}