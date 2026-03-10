import { Mrows, Mcols, tileSize, map, tileLocation } from "../tileMap.js";
import { animator } from "./playerMovement.js";
import { coins } from "./coins.js";
import { player } from "../entities/player.js";

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
            // if (tile === 0) ctx.fillStyle = "#90d7f380";
            if (tile === 1) ctx.fillStyle = "#2b4f81";
            if (tile === 2) ctx.fillStyle = "#1a2f5a";
            // if (tile === 3) ctx.fillStyle = "#3b7d2a";
            // if (tile === 4) ctx.fillStyle = "#5a3c1a";

            ctx.fillRect(tileX, tileY, tileSize, tileSize);

            // drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight) s = source, d = destination
            if (tile === 3) ctx.drawImage(tileSet, gsx, gsy, ogSize, ogSize, tileX, tileY, tileSize, tileSize);
            
            if (tile === 4) {
                // "Random number generator" to pick from options of dirt
                let i = (Math.ceil(Math.sqrt(x) * y *Math.pow(x,2) * y + rndNumber) % tileLocation.floors.length);

                let [fsx, fsy] = tileLocation.floors[i];
                ctx.drawImage(tileSet, fsx, fsy, ogSize, ogSize, tileX, tileY, tileSize, tileSize);
            }
   
        }
    }
}

function moveClouds() {
    bg_body.style.backgroundPosition = `${dx}% 40%`;
    if (player.vx === 0) dx += 0;
    else if (player.vx > 0) dx -= 1;
    else if (player.vx < 0) dx += 1;
}

export function render() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    moveClouds();

    updateCamera();
    drawMap();

    animator.draw(
        ctx,
        player.x - camera.x,
        player.y - camera.y,
        player.w,
        player.h
    );

    coins.forEach(coin => {
        coin.draw(ctx, camera);
        coin.checkCollision(player);
        /* Could do ->
        if (coin.checkCollision(player)) player.score++;
        */
    });

}