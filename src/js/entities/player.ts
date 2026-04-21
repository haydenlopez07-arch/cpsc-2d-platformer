import { PLAYER_DEFAULTS } from "../config/playerConfig";

export type PlayerMode = "unarmed" | "sword";
export type FacingDirection = "left" | "right";

export interface Player {
        x: number;
        y: number;
        spawnX: number;
        spawnY: number;
        w: number;
        h: number;
        vx: number;
        vy: number;
        moveSpeed: number;
        jump: number;
        maxFallSpeed: number;
        grounded: boolean;
        lastDir: FacingDirection;
        collectedCoins: number;
        health: number;
        maxHealth: number;
        damage: number;
        attackCooldown: number;
        attackTimer: number;
        invulnTime: number;
        invulnTimer: number;
        isDead: boolean;
        knockbackX: number;
        knockbackY: number;
        mode: PlayerMode;
}

export function createPlayer(x: number, y: number): Player {
    return {
        x,
        y,
        spawnX: x,
        spawnY: y,
        w: PLAYER_DEFAULTS.size.w,
        h: PLAYER_DEFAULTS.size.h,
        vx: 0,
        vy: 0,
        moveSpeed: PLAYER_DEFAULTS.movement.moveSpeed,
        jump: PLAYER_DEFAULTS.movement.jump,
        maxFallSpeed: PLAYER_DEFAULTS.movement.maxFallSpeed,
        grounded: false,
        lastDir: PLAYER_DEFAULTS.facing,
        collectedCoins: 0,
        health: PLAYER_DEFAULTS.combat.health,
        maxHealth: PLAYER_DEFAULTS.combat.maxHealth,
        damage: PLAYER_DEFAULTS.combat.damage,
        attackCooldown: PLAYER_DEFAULTS.combat.attackCooldown,
        attackTimer: 0,
        invulnTime: PLAYER_DEFAULTS.combat.invulnTime,
        invulnTimer: 0,
        isDead: false,
        knockbackX: 0,
        knockbackY: 0,
        mode: PLAYER_DEFAULTS.mode,
    };
}

export const player: Player = createPlayer(
    PLAYER_DEFAULTS.spawn.x, 
    PLAYER_DEFAULTS.spawn.y
);