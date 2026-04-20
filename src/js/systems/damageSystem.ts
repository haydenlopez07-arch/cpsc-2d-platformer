import type { Player } from "../entities/player";
import type { Enemy } from "../entities/enemy";
import { Coin, coins } from "../collectables/coins.js";

type Rect = {
    x: number;
    y: number;
    w: number;
    h: number;
}

type Damageable = {
    health: number;
    maxHealth: number;
    isDead: boolean;
    vx: number;
    vy: number;
    knockbackX: number;
    knockbackY: number;
}

export interface AttackHitbox extends Rect {}

export function intersects(a: Rect, b: Rect): boolean {
    return (
        a.x < b.x + b.w &&
        a.x + a.w > b.x &&
        a.y < b.y + b.h &&
        a.y + a.h > b.y
    );
}

export function clampHealth(target: Damageable): void {
    if (target.health > target.maxHealth) {
        target.health = target.maxHealth;
    }
    
    if (target.health < 0) {
        target.health = 0;
    }
}

export function dealDamage(
                    target: Damageable,
                    damage: number,
                    knockbackX: number = 0,
                    knockbackY: number = 0
                ): number {
    if (target.isDead || damage <= 0) {
        return 0;
    }

    const oldHealth = target.health;

    target.health -= damage;
    clampHealth(target);

    if (target.health === 0) {
        target.isDead = true;
    }

    target.knockbackX += knockbackX;
    target.knockbackY += knockbackY;

    return oldHealth - target.health;
}

export function heal(target: Damageable, heal: number): number {
    if (target.isDead || heal <= 0) {
        return 0;
    }

    target.health += heal;
    clampHealth(target);

    return heal;
}

export function combatTimers(player: Player, enemies: Enemy[], dt: number): void {
    if(player.attackTimer > 0) {
        player.attackTimer -= dt;
        if(player.attackTimer < 0) {
            player.attackTimer = 0;
        }
    }

    if(player.invulnTimer > 0) {
        player.invulnTimer -= dt;
        if(player.invulnTimer < 0) {
            player.invulnTimer = 0;
        }
    }

    for(const enemy of enemies) {
        if(enemy.attackTimer > 0) {
            enemy.attackTimer -= dt;
            if(enemy.attackTimer < 0) {
                enemy.attackTimer = 0;
            }
        }
    }
}

export function getPlayerAttackBox(player: Player): AttackHitbox {
    const range = 40;
    if(player.lastDir === "right") {
        return {
            x: player.x + player.w,
            y: player.y + 10,
            w: range,
            h: player.h - 20
        };
    }

    return {
        x: player.x - range,
        y: player.y + 10,
        w: range,
        h: player.h - 20
    };
}

export function playerAttack(player: Player, enemies: Enemy[]): void {
    if (!player.isDead && player.attackTimer <= 0) {
        player.attackTimer = player.attackCooldown;
        const attackBox = getPlayerAttackBox(player);

        for (const enemy of enemies) {
            if (intersects(attackBox, enemy) && !enemy.isDead) {
                const knockbackX = player.lastDir === "right" ? 300 : -300;
                const knockbackY = -120;
                dealDamage(enemy, player.damage, knockbackX, knockbackY);
            }
        }
    }
}

export function enemyAttack(player: Player, enemies: Enemy[]): void {
    if (player.isDead || player.invulnTimer > 0) return;

    for (const enemy of enemies) {
        if (enemy.isDead || enemy.attackTimer > 0) continue;

        if (intersects(player, enemy)) {
            const knockbackX = player.x < enemy.x ? -250 : 250;
            const knockbackY = -75;

            dealDamage(player, enemy.damage, knockbackX, knockbackY);
            player.invulnTimer = player.invulnTime;

            if (player.health <= 0) {
                player.isDead = true;
            }

            break;
        }
    }
}

export function resetPlayer(player: Player): void {
    player.x = player.spawnX;
    player.y = player.spawnY;
    player.vx = 0;
    player.vy = 0;
    player.grounded = false;

    player.health = player.maxHealth;
    player.isDead = false;

    player.attackTimer = 0;
    player.invulnTimer = 0;

    player.knockbackX = 0;
    player.knockbackY = 0;
}

export function removeEnemy(enemies: Enemy[]): void {
    for (let i = enemies.length - 1; i >= 0; i--){
        if (enemies[i].isDead || enemies[i].health <= 0) {
            dropCoinOnDeath(enemies[i]);
            enemies.splice(i, 1);
        }
    }
}

export function removeEnemyInPit(enemies: Enemy[]): void {
    for (let i = enemies.length - 1; i >= 0; i--){
        if (enemies[i].y > 1750) {
            dropCoinOnDeath(enemies[i]);
            enemies.splice(i, 1);
        }
    }
}

function dropCoinOnDeath(enemy: Enemy): void {
    const enemyX = enemy.x
    const enemyY = enemy.y

    coins.push(new Coin(enemyX, enemyY));
}