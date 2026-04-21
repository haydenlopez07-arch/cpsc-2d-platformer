import type { EnemyMode, EnemyFacing, PatrolDirection } from "../entities/enemy";

export const ENEMY_DEFAULTS = {

    size: {
        w: 70,
        h: 70
    },

    movement: {
        patrolSpeed: 100,
        followSpeed: 250,
        maxFallSpeed: 1000
    },

    combat: {
        health: 3,
        maxHealth: 3,
        damage: 1,
        attackCooldown: 3
    },

    initialState: {
        facing: "left" as EnemyFacing,
        mode: "patrol" as EnemyMode
    },

    patrol: {
        direction: -1 as PatrolDirection,
        duration: 2
    },

    ranges: {
        follow: 300,
        attack: 40
    },

};