import { applyGravity, clampFallSpeed, integrate } from "../systems/physics.js";
import { Animator } from "../systems/animator.js";

const enemySprite = new Image();
enemySprite.src = "/assets/sprites/enemies/level-one/troll_enemy/Sprite-For-Troll.png";

export class Enemy {
    constructor(x, y) {
        // position
        this.x = x;
        this.y = y;

        // size
        this.w = 70;
        this.h = 70;

        // horizontal movement
        this.vx = 0;
        this.moveSpeed = null;

        // vertical physics
        this.vy = 0;
        this.maxFallSpeed = 1000;
        this.grounded = false;

        // animations
        this.animator = new Animator(enemySprite, 48, 48);
        this.animator.addAnimation("idle right", [0]);
        this.animator.addAnimation("idle left", [15]);
        this.animator.addAnimation("walk right", [1, 2, 3, 4]);
        this.animator.addAnimation("walk left", [16, 17, 18, 19]);
        this.animator.addAnimation("attack right", [10, 11, 12, 13]);
        this.animator.addAnimation("attack left", [5, 6, 7, 8]);

        // state
        this.state = "patrol";
        this.facing = "left";

        // patrol variables
        this.patrolDir = -1;
        this.patrolTimer = 0;
        this.patrolDuration = 2;

        // ranges
        this.followRange = 300;
        this.attackRange = 15;
    }

    update(dt, player) {

        // states
        let dx = player.x - this.x;
        let distance = Math.abs(dx);

        if (this.state === "patrol") {
            this.patrol(dt, distance); this.animator.setAnimation("walk " + this.facing);
        } else if (this.state === "follow") {
            this.follow(dt, dx, distance); this.animator.setAnimation("walk " + this.facing);
        } else if (this.state === "attack") {
            this.attack(distance); this.animator.setAnimation("attack " + this.facing)
        }

        applyGravity(this, dt);
        clampFallSpeed(this)

        this.grounded = false;

        integrate(this, dt);

        this.animator.update(dt);
    }

    patrol(dt, distance) {
        this.moveSpeed = 100;
        this.vx = this.patrolDir * this.moveSpeed;

        this.patrolTimer += dt;

        if (this.patrolTimer >= this.patrolDuration) {
            this.patrolDir = -this.patrolDir;
            this.patrolTimer = 0;
        }

        if (distance < this.followRange) {
            this.state = "follow";
        }

        this.vx = this.patrolDir * this.moveSpeed;

        if (this.vx > 0) this.facing = "right";
        else if (this.vx < 0) this.facing = "left";
    }

    follow(dt, dx, distance) {
        this.moveSpeed = 250;
        let dir = dx !== 0 ? dx / Math.abs(dx) : 0;
        this.vx = dir * this.moveSpeed;

        if (distance < this.attackRange) {
            this.state = "attack";
        }
        else if (distance > this.followRange) {
            this.state = "patrol";
        }
        this.vx = dir * this.moveSpeed;

        if (this.vx > 0) this.facing = "right";
        else if (this.vx < 0) this.facing = "left";

    }

    attack(distance) {
        this.vx = 0;

        if (distance > this.attackRange) {
            this.state = "follow";
        }
    }
}

export const enemies = [
    new Enemy(240, 1200),
    new Enemy(1500, 1200)
];