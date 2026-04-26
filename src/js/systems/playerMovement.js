import { keys } from "./userInput.js";
import { player } from "../entities/player";
import {
    applyGravity,
    clampFallSpeed,
    setMovementX,
    integrate
} from "./physics.js";
import { animators } from "./playerSetup";
import playSound from "./soundsManager";

export function playerMovement(dt) {

    let moveDirection = 0;

    applyGravity(player, dt);
    clampFallSpeed(player);

    if (keys.left && !keys.right) {
        moveDirection = -1;
        player.lastDir = "left";
    } else if (keys.right && !keys.left) {
        moveDirection = 1;
        player.lastDir = "right";
    }

    const moveVX = moveDirection * player.moveSpeed;

    player.vx = moveVX + player.knockbackX;
    player.vy += player.knockbackY;

    player.knockbackX *= 0.85;
    player.knockbackY *= 0.85;

    if (Math.abs(player.knockbackX) < 1) player.knockbackX = 0;
    if (Math.abs(player.knockbackY) < 1) player.knockbackY = 0;

    if (keys.up && player.grounded) {
        playSound("jump");
        player.vy = -player.jump;
        player.grounded = false;
    }

    integrate(player, dt);

    const current = animators[player.mode];

    if (!current) return;

    if (player.mode === "sword" && player.attackTimer > 0) {
        const animName =
            player.lastDir === "left"
                ? "attack left"
                : "attack right";

        current.attack.setAnimation(animName);
        current.attack.update(dt);
        return;
    }

    if (!player.grounded) {

        const animName =
            player.vy < 0
                ? (player.lastDir === "left" ? "jump up left" : "jump up right")
                : (player.lastDir === "left" ? "fall left" : "fall right");

        current.jump.setAnimation(animName);
        current.jump.update(dt);

    } else {

        const animName =
            moveDirection !== 0
                ? (player.lastDir === "left" ? "run left" : "run right")
                : (player.lastDir === "left" ? "idle left" : "idle right");

        current.idleRun.setAnimation(animName);
        current.idleRun.update(dt);
    }
}