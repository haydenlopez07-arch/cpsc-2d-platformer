import { keys } from "./userInput.js";
import { Animator } from "./animator.js";
import { player } from "../entities/player.js";
import {
    applyGravity, clampFallSpeed,
    setMovementX, integrate
} from "./physics.js";

const spriteSheet = new Image();
if (localStorage.getItem("chosenCharacter") == "whiteShirt" || !localStorage.getItem("chosenCharacter")) {

    spriteSheet.src =
        "/assets/sprites/player/main_character/SpriteSheet/spritesheetmcwalkrun.png";
}
if (localStorage.getItem("chosenCharacter") == "RedShirt") {
    spriteSheet.src = "/assets/sprites/player/main_character_red_shirt/SpriteSheet/spritesheetmcrwalkrun.png";
}

export const playerAnimator = new Animator(spriteSheet, 48, 43);

playerAnimator.addAnimation("idle right", [0]);
playerAnimator.addAnimation("idle left", [1]);
playerAnimator.addAnimation("run right", [2, 3, 4, 5]);
playerAnimator.addAnimation("run left", [6, 7, 8, 9]);

export function playerMovement(dt) {
    playerAnimator.update(dt);

    player.vx = 0;

    // Uses physics.js helper for movement behavior
    // Adds gravity and max fall speed clamp
    // before collision check
    applyGravity(player, dt);
    clampFallSpeed(player);

    if (keys.left && !keys.right) {
        setMovementX(player, -1);
        player.lastDir = "left";
    } else if (keys.right && !keys.left) {
        setMovementX(player, 1);
        player.lastDir = "right";
    } else {
        setMovementX(player, 0);
    }

    // Player can only jump when on the ground.
    if (keys.up && player.grounded) {
        player.vy = -player.jump;
        player.grounded = false;
    }

    // Applies current speed to player posiition this frame
    integrate(player, dt);

    if (player.vx !== 0) {
        if (player.lastDir === "left") playerAnimator.setAnimation("run left");
        else playerAnimator.setAnimation("run right");
    }
    else {
        if (player.lastDir === "left") playerAnimator.setAnimation("idle left");
        else playerAnimator.setAnimation("idle right");
    }

}