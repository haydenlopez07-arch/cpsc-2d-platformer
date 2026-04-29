import { Animator } from "../systems/animator.js";
import { Collectable } from "./collectablesBaseClass.js";
import { Player } from "../entities/player.js";
import playSound from "../systems/soundsManager";

const speedUpSpriteSheet: HTMLImageElement = new Image();
speedUpSpriteSheet.src = "/assets/sprites/collectibles/speedUp_sprite_sheet.png";

const jumpUpSpriteSheet: HTMLImageElement = new Image();
jumpUpSpriteSheet.src = "";

const strengthUpSpriteSheet: HTMLImageElement = new Image();
jumpUpSpriteSheet.src = "";

export const speedUpAnimator: Animator = new Animator(speedUpSpriteSheet, 189, 176);
speedUpAnimator.addAnimation("spin", [1, 2, 3, 2])
speedUpAnimator.setAnimation("spin")

export const jumpUpAnimator: Animator = new Animator(jumpUpSpriteSheet, 16, 16);

export const strengthUpAnimator: Animator = new Animator(strengthUpSpriteSheet, 16, 16);

abstract class PowerUp extends Collectable {
    constructor(x: number, y: number, animator: Animator) {
        super(x, y, 50, 50, animator);
    }

    playSound(): void {
        playSound("powerUp");
    }

    abstract powerUp(player: Player): void;

    abstract powerRevert(player: Player): void
}

class SpeedUp extends PowerUp {
    constructor(x: number, y: number) {
        super(x, y, speedUpAnimator);
    }

    powerUp(player: Player): void {
        player.moveSpeed = 900;
        console.log("Speed Up");
    }

    powerRevert(player: Player): void {
        player.moveSpeed = 450;
        console.log("Speed Reverted");
    }
}

class JumpUp extends PowerUp {
    constructor(x: number, y: number) {
        super(x, y, jumpUpAnimator);
    }

    powerUp(player: Player): void {
        player.jump = player.jump * 2;
        console.log("Jump Up");
    }

    powerRevert(player: Player): void {
        player.jump = player.jump/2;
        console.log("Jump Reverted");
    }
}

class StrengthUp extends PowerUp {
    constructor(x: number, y: number) {
        super(x, y, jumpUpAnimator);
    }

    powerUp(player: Player): void {
        player.damage = 2;
        console.log("Strength Up");
    }

    powerRevert(player: Player): void {
        player.damage = 1;
        console.log("Strength Reverted");
    }
}


export const powerUps: PowerUp[] = [
    new SpeedUp(4300, 1300),
    new JumpUp(1800, 1150),
    new StrengthUp(8000, 1700)
];