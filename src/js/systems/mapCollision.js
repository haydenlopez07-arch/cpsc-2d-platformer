import { map, tileSize, TILE_BOX, TILE_GRASS, TILE_DIRT, TILE_SPIKE } from "../tileMap.js";

const solidTiles = [TILE_BOX, TILE_GRASS, TILE_DIRT];
const horizontalBuffer = .3;
const verticalBuffer = .01;

function getTile(col,row) {
     if(row < 0 || row >= map.length) return 4;
     if(col < 0 || col >= map[0].length) return 4;
     return map [row][col];
}

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
    for (let row = topTile; row <= bottomTile; row++){
        if(entity.vx > 0){
            for(let col = rightTile; col >= leftTile;col--){
                if(solidTiles.includes(getTile(col,row))){
                    entity.x = col * tileSize - entity.w - horizontalBuffer;
                    entity.vx = 0;
                    break;
                }
            }
        }else if(entity.vx < 0){
            for(let col = leftTile; col <= rightTile; col++){
                if(solidTiles.includes(getTile(col,row))){
                    entity.x = (col+1) * tileSize + horizontalBuffer;
                    entity.vx = 0;
                    break;
                }
            }
        }
        if(entity.vx === 0) break;
    }
}

export function vertical(entity) {
    // Reset player's ground state
    entity.grounded = false;
    //Converts player position into tile coordinates
    const leftTile = Math.floor(entity.x / tileSize);
    const rightTile = Math.floor((entity.x + entity.w -1) / tileSize);
    const topTile = Math.floor(entity.y / tileSize);
    const bottomTile = Math.floor((entity.y + entity.h - 1) / tileSize);
    //Loops through tiles touching the player
    for(let row = topTile; row <= bottomTile; row++){
        for(let col = leftTile; col <= rightTile; col++){
            if(solidTiles.includes(getTile(col,row))){
                if(entity.vy > 0 ){
                    //falling - land on ground
                    entity.y = row * tileSize - entity.h - verticalBuffer;
                    entity.vy = 0;
                    entity.grounded = true;
                    break;
                }
                //jumping
                else if ( entity.vy < 0){
                    entity.y = (row + 1 ) * tileSize + verticalBuffer;
                    entity.vy = 0;
                    break;
                }
            }

        }
    }
}

export function checkHazard(entity) {
    //Converts player position into tile coordinates
    const leftTile = Math.floor(entity.x / tileSize);
    const rightTile = Math.floor((entity.x + entity.w -1) / tileSize);
    const topTile = Math.floor(entity.y / tileSize);
    const bottomTile = Math.floor((entity.y + entity.h - 1) / tileSize);

    for (let row = topTile; row <= bottomTile; row++) {
        for (let col = leftTile; col <= rightTile; col++){
            if (getTile(col, row) === TILE_SPIKE) {
                resetEntity(entity);
                return true;
            }
        }
    }
    return false;
}