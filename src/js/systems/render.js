import { Mrows, Mcols, tileSize, map } from "../tileMap.js";
import { animator } from "./playerMovement.js";
import { player } from "../entities/player.js";

export const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const bg_body = document.querySelector("body");
let dx = 75;

const floor = new Image();
floor.src = "../../src/assets/sprites/tiles/temp-floor.png"

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
            if (tile === 4) ctx.fillStyle = "#5a3c1a";

            ctx.fillRect(tileX, tileY, tileSize, tileSize);

            // drawImage(image, dx, dy, dWidth, dHeight), d = destination
            // has to be below .fillRect or that will screw up the image
            // should change this later but this is just temporary 
            if (tile === 3) ctx.drawImage(floor, tileX, tileY, tileSize, tileSize)
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
}