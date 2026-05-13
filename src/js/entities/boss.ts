import { Enemy } from "./enemy";
import { Animator } from "../systems/animator";
import { ENEMY_DEFAULTS } from "../config/enemyConfig";
import type { Player } from "./player";
import { addHitLoc, dealDamage } from "../systems/damageSystem";
import { isGodModeEnabled } from "../systems/godMode";
import { applyGravity, clampFallSpeed, integrate } from "../systems/physics";
import playSound from "../systems/soundsManager";

const bossSprite = new Image();
bossSprite.src =
  "/assets/sprites/bosses/Skeleton King Animations/Skeleton king2-sheet.png";

export class Boss extends Enemy {
  attackCooldownTimer = 0;
  attackCooldown = ENEMY_DEFAULTS.combat.attackCooldown * 1.5;
  attackRange = 110;
  followRange = 320;
  attackWidth = 140;

  isAttacking = false;
  attackHasHit = false;

  attackLockTimer = 0;
  facingLock = 0;

  hasExitedAttackRange = true;

  constructor(x: number, y: number) {
    super(x, y);

    this.canFallInPit = false;

    this.w = ENEMY_DEFAULTS.size.w * 4;
    this.h = ENEMY_DEFAULTS.size.h * 3;

    this.health = ENEMY_DEFAULTS.combat.health * 6;
    this.maxHealth = ENEMY_DEFAULTS.combat.maxHealth * 6;

    this.damage = ENEMY_DEFAULTS.combat.damage;
    this.moveSpeed = ENEMY_DEFAULTS.movement.followSpeed * 0.8;

    this.animator = new Animator(bossSprite, 200, 130);

    this.animator.addAnimation("idle right", [0]);
    this.animator.addAnimation("walk right", [1, 2, 3, 4, 5, 6, 7]);
    this.animator.addAnimation("attack right", [8, 9, 10, 11]);

    this.animator.addAnimation("idle left", [12]);
    this.animator.addAnimation("walk left", [13, 14, 15, 16, 17, 18, 19]);
    this.animator.addAnimation("attack left", [20, 21, 22, 23]);
  }

  override update(dt: number, player: Player): void {
    const bossCenter = this.x + this.w / 2;
    const playerCenter = player.x + player.w / 2;

    const dx = playerCenter - bossCenter;
    const dy = Math.abs(player.y + player.h / 2 - (this.y + this.h / 2));
    const distance = Math.abs(dx);

    const dir = dx > 0 ? 1 : -1;
    const facingDir = dx > 0 ? "right" : "left";

    if (this.attackCooldownTimer > 0) {
      this.attackCooldownTimer -= dt;
    }

    if (this.attackLockTimer > 0) {
      this.attackLockTimer -= dt;
      this.vx = 0;
      this.isAttacking = true;
    } else {
      const stopDistance = this.attackWidth * 0.7;

      if (distance > this.followRange) {
        this.vx = dir * this.moveSpeed;
        this.isAttacking = false;
        this.attackHasHit = false;
      } else if (distance > stopDistance) {
        this.vx = dir * this.moveSpeed;
      } else {
        this.vx = 0;
      }

      if (distance <= this.attackRange) {
        if (this.attackCooldownTimer <= 0 && this.hasExitedAttackRange) {
          this.isAttacking = true;
          this.attackCooldownTimer = this.attackCooldown;
          this.attackHasHit = false;
          this.attackLockTimer = 0.4;
          this.hasExitedAttackRange = false;
        }
      } else {
        this.hasExitedAttackRange = true;
      }
    }

    if (Math.abs(dx) > 8 && this.facingLock <= 0) {
      if (this.facing !== facingDir) {
        this.facing = facingDir;
        this.facingLock = 0.12;
      }
    }

    if (this.facingLock > 0) {
      this.facingLock -= dt;
    }

    this.handleAttack(player, dx, dy);

    this.vx += this.knockbackX;
    this.vy += this.knockbackY;

    this.knockbackX *= 0.85;
    this.knockbackY *= 0.6;

    if (Math.abs(this.knockbackX) < 1) this.knockbackX = 0;
    if (Math.abs(this.knockbackY) < 1) this.knockbackY = 0;

    applyGravity(this, dt);
    clampFallSpeed(this);

    this.grounded = false;
    integrate(this, dt);

    this.updateAnimation();
    this.animator.update(dt);
  }

  handleAttack(player: Player, dx: number, dy: number): void {
    if (!this.isAttacking) return;
    if (isGodModeEnabled()) return;

    const bossCenter = this.x + this.w / 2;
    const playerCenter = player.x + player.w / 2;

    const horizontal = Math.abs(playerCenter - bossCenter);
    const maxVerticalAttackRange = 120;

    if (
      horizontal <= this.attackWidth &&
      dy <= maxVerticalAttackRange &&
      this.isAttacking &&
      !this.attackHasHit
    ) {
      playSound("splat");
      playSound("crunch");
      const direction = dx < 0 ? -1 : 1;

      const knockbackX = direction * 650;
      const knockbackY = -100;

      dealDamage(player, this.damage, knockbackX, knockbackY);
      addHitLoc(player, "player");
      player.invulnTimer = player.invulnTime;

      this.attackHasHit = true;
    }
  }

  updateAnimation(): void {
    if (this.isAttacking) {
      this.animator.setAnimation(`attack ${this.facing}`);
    } else if (this.vx !== 0) {
      this.animator.setAnimation(`walk ${this.facing}`);
    } else {
      this.animator.setAnimation(`idle ${this.facing}`);
    }
  }
}
