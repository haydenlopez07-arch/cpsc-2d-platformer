import { Animator } from "../systems/animator.js";
import { Collectable } from "./collectablesBaseClass.js";
import { Player } from "../entities/player.js";
import playSound from "../systems/soundsManager";

const speedUpSpriteSheet: HTMLImageElement = new Image();
speedUpSpriteSheet.src = "/assets/sprites/collectibles/speedUp_sprite_sheet.png";

const jumpUpSpriteSheet: HTMLImageElement = new Image();
jumpUpSpriteSheet.src = "/assets/sprites/collectibles/jumpUp_sprite_sheet.png";

const strengthUpSpriteSheet: HTMLImageElement = new Image();
strengthUpSpriteSheet.src = "/assets/sprites/collectibles/strengthUp_sprite_sheet.png";

export const speedUpAnimator: Animator = new Animator(speedUpSpriteSheet, 189, 176);
speedUpAnimator.addAnimation("speed", [1, 2, 3, 2])
speedUpAnimator.setAnimation("speed")

export const jumpUpAnimator: Animator = new Animator(jumpUpSpriteSheet, 440, 170);
jumpUpAnimator.addAnimation("jump", [1, 2, 3, 2])
jumpUpAnimator.setAnimation("jump")

export const strengthUpAnimator: Animator = new Animator(strengthUpSpriteSheet, 440, 190);
strengthUpAnimator.addAnimation("strength", [1, 2, 3, 2])
strengthUpAnimator.setAnimation("strength")

abstract class PowerUp extends Collectable {
    constructor(x: number, y: number, animator: Animator) {
        super(x, y, 90, 50, animator);
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
        player.jump = player.jump * 1.5;
        console.log("Jump Up");
    }

    powerRevert(player: Player): void {
        player.jump = player.jump/1.5;
        console.log("Jump Reverted");
    }
}

class StrengthUp extends PowerUp {
    constructor(x: number, y: number) {
        super(x, y, strengthUpAnimator);
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
    new JumpUp(1800, 1450),
    new StrengthUp(8000, 1700)
];

export const bossPowerUps: PowerUp[] = [
    new SpeedUp(1200, 740),
    new SpeedUp(4200, 4510),
    new JumpUp(6800, 600),
    new JumpUp(600, 4400),
    new JumpUp(8800, 4530),
    new JumpUp(7800, 4390),
    new StrengthUp(7200, 200),
    new StrengthUp(2400, 4550)
]