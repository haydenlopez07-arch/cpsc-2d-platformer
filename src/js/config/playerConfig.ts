import type { PlayerMode, FacingDirection } from "../entities/player";

export const PLAYER_DEFAULTS = {
    spawn: {
        x: 200,
        y: 1500
    },

    size: {
        w: 60,
        h: 60
    },

    movement: {
        moveSpeed: 450,
        jump: 800,
        maxFallSpeed: 1400
    },

    combat: {
        health: 3,
        maxHealth: 5,
        damage: 1,
        attackCooldown: 0.25,
        invulnTime: 2
    },

    facing: "right" as FacingDirection,
    mode: "unarmed" as PlayerMode,
};