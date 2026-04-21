// Physics helpers for movement shortcuts
// Gravity applied to player, velocity updates,
// and position integrates with our delta time
import { horizontal, vertical } from "./mapCollision.js";
const GRAVITY = 1250;

export function applyGravity(player, dt) {
    if (player.vy > 0) {
        // falling faster
        player.vy += GRAVITY * 1.5 * dt;
    } else {
        // normal gravity while rising
        player.vy += GRAVITY * dt;
    }
}

export function clampFallSpeed(player) {
    if (player.vy > player.maxFallSpeed) {
        player.vy = player.maxFallSpeed;
    }
}

/**
* Sets player velocity in the x direction
* @param {object} player - The player object.
* @param {number} direction - The direction, 1 is right, -1 is left, 0 is for no movement.
*/
export function setMovementX(player, direction) {
    player.vx = direction * player.moveSpeed;
}

export function integrate(player, dt) {
    player.grounded = false;
    player.x += player.vx * dt;
    horizontal(player);
    player.y += player.vy * dt;
    vertical(player);
}