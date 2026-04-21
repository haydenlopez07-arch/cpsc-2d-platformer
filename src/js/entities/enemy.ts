import { ENEMY_DEFAULTS } from "../config/enemyConfig";
import { applyGravity, clampFallSpeed, integrate } from "../systems/physics";
import { Animator } from "../systems/animator";
import type { Player } from "./player";
import type { Damageable } from "../../types/damageable";


export type EnemyMode = "patrol" | "follow" | "attack";
export type EnemyFacing = "left" | "right";
export type PatrolDirection = -1 | 1;

const enemySprite = new Image();
enemySprite.src = "/assets/sprites/enemies/level-one/troll_enemy/Sprite-For-Troll.png";

export interface EnemyState extends Damageable {
        x: number;
        y: number;
        spawnX: number;
        spawnY: number;
        w: number;
        h: number;
        vx: number;
        vy: number;
        moveSpeed: number;
        maxFallSpeed: number;
        grounded: boolean;
        health: number;
        maxHealth: number;
        damage: number;
        attackCooldown: number;
        attackTimer: number;
        isDead: boolean;
        knockbackX: number;
        knockbackY: number;
        animator: Animator;
        state: EnemyMode;
        facing: EnemyFacing;
        patrolDir: PatrolDirection;
        patrolTimer: number;
        patrolDuration: number;
        followRange: number;
        attackRange: number;
}

export class Enemy implements EnemyState {
    x: number;
    y: number;
    spawnX: number;
    spawnY: number;
    w: number;
    h: number;
    vx: number;
    vy: number;
    moveSpeed: number;
    maxFallSpeed: number;
    grounded: boolean;
    health: number;
    maxHealth: number;
    damage: number;
    attackCooldown: number;
    attackTimer: number;
    isDead: boolean;
    knockbackX: number;
    knockbackY: number;

    animator: Animator;
    state: EnemyMode;
    facing: EnemyFacing;
    patrolDir: PatrolDirection;
    patrolTimer: number;
    patrolDuration: number;
    followRange: number;
    attackRange: number;

    constructor(x: number, y: number) {

        // starting state
        this.x = x;
        this.y = y;
        this.spawnX = x;
        this.spawnY = y;
        this.w = ENEMY_DEFAULTS.size.w;
        this.h = ENEMY_DEFAULTS.size.h;
        this.vx = 0;
        this.vy = 0;
        this.moveSpeed = ENEMY_DEFAULTS.movement.patrolSpeed;
        this.maxFallSpeed = ENEMY_DEFAULTS.movement.maxFallSpeed;
        this.grounded = false;
        this.health = ENEMY_DEFAULTS.combat.health;
        this.maxHealth = ENEMY_DEFAULTS.combat.maxHealth;
        this.damage = ENEMY_DEFAULTS.combat.damage;
        this.attackCooldown = ENEMY_DEFAULTS.combat.attackCooldown;
        this.attackTimer = 0;
        this.isDead = false;
        this.knockbackX = 0;
        this.knockbackY = 0;
        this.state = ENEMY_DEFAULTS.initialState.mode;
        this.facing = ENEMY_DEFAULTS.initialState.facing;
        this.patrolDir = ENEMY_DEFAULTS.patrol.direction;
        this.patrolTimer = 0;
        this.patrolDuration = ENEMY_DEFAULTS.patrol.duration;
        this.followRange = ENEMY_DEFAULTS.ranges.follow;
        this.attackRange = ENEMY_DEFAULTS.ranges.attack;

        // animations
        this.animator = new Animator(enemySprite, 48, 48);
        this.animator.addAnimation("idle right", [0]);
        this.animator.addAnimation("idle left", [15]);
        this.animator.addAnimation("walk right", [1, 2, 3, 4]);
        this.animator.addAnimation("walk left", [16, 17, 18, 19]);
        this.animator.addAnimation("attack right", [10, 11, 12, 13]);
        this.animator.addAnimation("attack left", [5, 6, 7, 8]);
    }

    update(dt: number, player: Player): void {

        // states
        const dx = player.x - this.x;
        const distance = Math.abs(dx);

        if (this.state === "patrol") {
            this.patrol(dt, distance);
        } else if (this.state === "follow") {
            this.follow(dx, distance);
        } else if (this.state === "attack") {
            this.attack(distance);
        }

        this.updateAnimation();

        this.vx += this.knockbackX;
        this.vy += this.knockbackY;

        this.knockbackX *= 0.85;
        this.knockbackY *= 0.6;

        if (Math.abs(this.knockbackX) < 1) this.knockbackX = 0;
        if (Math.abs(this.knockbackY) < 1) this.knockbackY = 0;

        applyGravity(this, dt);
        clampFallSpeed(this)

        this.grounded = false;
        integrate(this, dt);

        this.animator.update(dt);
    }

    private updateFacing(): void {
        if (this.vx > 0) this.facing = "right";
        else if (this.vx < 0) this.facing = "left";
    }

    private updateAnimation(): void {
    if (this.state === "attack") {
        this.animator.setAnimation("attack " + this.facing);
    } else if (this.vx !== 0) {
        this.animator.setAnimation("walk " + this.facing);
    } else {
        this.animator.setAnimation("idle " + this.facing);
    }
}

    patrol(dt: number, distance: number): void {
        this.moveSpeed = ENEMY_DEFAULTS.movement.patrolSpeed;
        this.patrolTimer += dt;

        if (this.patrolTimer >= this.patrolDuration) {
            this.patrolDir = this.patrolDir === 1 ? -1 : 1;
            this.patrolTimer = 0;
            this.vx = this.patrolDir * this.moveSpeed;
        }

        if (distance < this.followRange) {
            this.state = "follow";
        }

        this.vx = this.patrolDir * this.moveSpeed;
        this.updateFacing();
    }

    follow(dx: number, distance: number): void {
        this.moveSpeed = ENEMY_DEFAULTS.movement.followSpeed;
        const dir = dx !== 0 ? dx / Math.abs(dx) : 0;
        this.vx = dir * this.moveSpeed;

        if (distance < this.attackRange) {
            this.state = "attack";
        } else if (distance > this.followRange) {
            this.state = "patrol";
        }
        
        this.updateFacing();
    }

    attack(distance: number): void {
        this.vx = 0;

        if (distance > this.attackRange) {
            this.state = "follow";
        }
    }
}

export const enemies: Enemy[] = [
    new Enemy(7100, 1200),
    new Enemy(7900, 1200),
    new Enemy(8700, 1200),
    new Enemy(9500, 1200),
    new Enemy(10300, 1200),
    new Enemy(11100, 1200),
    new Enemy(11500, 1200),
    new Enemy(12300, 1200),
    new Enemy(12700, 1200)
];