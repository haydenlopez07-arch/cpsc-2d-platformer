import {
    Mrows, Mcols, tileSize, map, tileLocation, TILE_WATER,
    TILE_WATER_DARK, TILE_GRASS, TILE_DIRT, TILE_BOX,
    TILE_SPIKE
} from "../level1Map.js";
import { animator } from "./playerMovement.js";
import { coins } from "../collectables/coins.js";
import { hearts } from "../collectables/hearts.js";
import { player } from "../entities/player.js";
import { enemies } from "../main.js";
import { sword } from "../collectables/sword.js";


export const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const bg_body = document.querySelector("body");
let dx = 75;

const tileSet = new Image();
tileSet.src = "../../src/assets/sprites/tiles/world_tileset.png";

const ogSize = tileLocation.tileSize;
const [gsx, gsy] = tileLocation.grass;

/* Random number for dirt */
const now = new Date();
const rndNumber = now.getHours() * 439 + now.getMinutes() * 577 + now.getSeconds() * 727;

/* Canvas resize */

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener("resize", resizeCanvas);

/* Camera */

const camera = {
    x: 0,
    y: 0
};

function updateCamera() {

    const targetX = player.x + player.w / 2 - canvas.width / 2;
    const targetY = player.y + player.h / 2 - canvas.height / 2;

    camera.x += (targetX - camera.x) * 0.1;
    camera.y += (targetY - camera.y) * 0.1;

    const mapWidth = Mcols * tileSize;
    const mapHeight = Mrows * tileSize;

    camera.x = Math.max(0, Math.min(camera.x, mapWidth - canvas.width));
    camera.y = Math.max(0, Math.min(camera.y, mapHeight - canvas.height));

    camera.x = Math.round(camera.x);
    camera.y = Math.round(camera.y);
}

/* Draw Map */

function drawMap() {
    for (let y = 0; y < Mrows; y++) {
        for (let x = 0; x < Mcols; x++) {
            const tileX = x * tileSize - camera.x;
            const tileY = y * tileSize - camera.y;

            if (
                tileX < -tileSize ||
                tileX > canvas.width ||
                tileY < -tileSize ||
                tileY > canvas.height
            ) continue;

            const tile = map[y][x];

            ctx.fillStyle = "rgba(0,0,0,0)";
            if (tile === TILE_WATER) ctx.fillStyle = "#2b4f81";
            if (tile === TILE_WATER_DARK) ctx.fillStyle = "#1a2f5a";

            ctx.fillRect(tileX, tileY, tileSize, tileSize);

            if (tile === TILE_GRASS) {
                ctx.drawImage(tileSet, gsx, gsy, ogSize, ogSize, tileX, tileY, tileSize, tileSize);
            }

            if (tile === TILE_DIRT) {
                let i = (
                    Math.ceil(Math.sqrt(x) * y * Math.pow(x, 2) * y + rndNumber) %
                    tileLocation.floors.length
                );

                let [fsx, fsy] = tileLocation.floors[i];
                ctx.drawImage(tileSet, fsx, fsy, ogSize, ogSize, tileX, tileY, tileSize, tileSize);
            }

            // Temporary Boxes and Spikes
            if (tile === TILE_BOX) {
                ctx.fillStyle = "#8b5a2b";
                ctx.fillRect(tileX, tileY, tileSize, tileSize);
            }

            if (tile === TILE_SPIKE) {
                ctx.fillStyle = "#c0392b";
                ctx.fillRect(tileX, tileY, tileSize, tileSize);
            }
        }
    }
}

// function moveClouds() {
//     bg_body.style.backgroundPosition = `${dx}% 40%`;
//     if (player.vx === 0) dx += 0;
//     else if (player.vx > 0) dx -= 1;
//     else if (player.vx < 0) dx += 1;
// }


let b = 5;
let t = 11;
let slow = 1;
let swtchDown = false;

export function render() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Cool way we can use makePlatform()
    let prevB = b;
    let prevT = t;
    if (slow % 5 == 0) {
        if (!swtchDown && t !== Mrows - 3) {
            b++;
            t++;
            if (t === Mrows - 3) swtchDown = true;
        } else if (swtchDown) {
            b--;
            t--;
            if (b === 5) swtchDown = false;
        }
    }

    // moveClouds();

    updateCamera();
    drawMap();

    // Easier debug we can see out "hit box"
    ctx.strokeStyle = "red";
    ctx.strokeRect(
        player.x - camera.x,
        player.y - camera.y,
        player.w,
        player.h
    )
    const playerCol = Math.floor(player.x / tileSize);
    const playerRow = Mrows - Math.floor((player.y + player.h) / tileSize);

    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    ctx.fillText(`x: ${player.x.toFixed(1)} y: ${player.y.toFixed(1)}`, 20, 30);
    ctx.fillText(`col: ${playerCol} row: ${playerRow}`, 20, 55);


    animator.draw(
        ctx,
        player.x - camera.x,
        player.y - camera.y,
        player.w,
        player.h
    );

    for (const enemy of enemies) {
        enemy.animator.draw(
            ctx,
            enemy.x - camera.x,
            enemy.y - camera.y + 8,
            enemy.w,
            enemy.h
        );
    }

    coins.forEach(coin => {
        coin.draw(ctx, camera);
        coin.checkCollision(player);
        /* Could do ->
        if (coin.checkCollision(player)) player.score++;
        */
    });

    hearts.forEach(heart => {
        heart.draw(ctx, camera);
        heart.checkCollision(player);
    });

    sword.forEach(sword => {
        sword.draw(ctx, camera)
        sword.checkCollision(player)
    })

}