import { Boss } from "../entities/boss";
import { BaseRender } from "./renderBaseClass.js";
import {
    Mrows, Mcols, tileSize, map,
    tileLocation, TILES
} from "./bossArena.js";
import { bossCoins } from "../collectables/coins.js";
import { bossHearts } from "../collectables/hearts";
import { bossPowerUps } from "../collectables/powerUps.ts";
import { heal } from "../systems/damageSystem";
import { hitLocations } from "../systems/damageSystem";

export const boss = new Boss(40 * tileSize, 3000);
;



export class BossArena extends BaseRender {
    constructor(canvas) {
        super(
            canvas,
            map,
            Mrows,
            Mcols,
            tileSize,
            "/assets/sprites/tiles/boss-tiles-2.png",
        );



        this.background = new Image();
        this.background.src = "/assets/backgrounds/bg-boss-4.png";

        this.throne = new Image();
        this.throne.src = "/assets/sprites/tiles/throne.png";

        this.tileData = this.createTiles();

        this.bossCoins = bossCoins;
        this.bossHearts = bossHearts;
        this.bossPowerUps = bossPowerUps;

        this.hasDispatchedBossDefeated = false;

        this.playerHitIndicator = new Image();
        this.playerHitIndicator.src = "/assets/sprites/player/player_got_hit.png"

        this.enemyHitIndicator = new Image();
        this.enemyHitIndicator.src = "/assets/sprites/enemies/enemy_got_hit.png"
    }

    drawMap() {
        const bgWidth = this.background.naturalWidth;
        const bgHeight = this.background.naturalHeight;
        const bgScale = this.canvas.height / bgHeight;
        const drawWidth = Math.floor(bgWidth * bgScale);
        const parallaxX = -(this.camera.x * 0.2) % drawWidth;

        for (let x = parallaxX - drawWidth; x < this.canvas.width + drawWidth; x += drawWidth) {
            this.ctx.drawImage(this.background, Math.floor(x), 0, drawWidth, this.canvas.height);
        }

        const startCol = Math.max(0, Math.floor(this.camera.x / tileSize) - 2);
        const endCol = Math.min(Mcols, Math.ceil((this.camera.x + this.canvas.width) / tileSize) + 2);

        const startRow = Math.max(0, Math.floor(this.camera.y / tileSize) - 2);
        const endRow = Math.min(Mrows, Math.ceil((this.camera.y + this.canvas.height) / tileSize) + 2);

        for (let y = startRow; y < endRow; y++) {
            for (let x = startCol; x < endCol; x++) {
                const tileX = x * this.tileSize - this.camera.x;
                const tileY = y * this.tileSize - this.camera.y;

                if (
                    tileX < - this.tileSize ||
                    tileX > this.canvas.width ||
                    tileY < - this.tileSize ||
                    tileY > this.canvas.height
                ) continue;

                const tile = this.map[y][x];

                const tileInfo = this.tileData[tile];

                if (!tileInfo) continue;

                const [srcX, srcY] = tileInfo.srcLoc;
                const imgSrc = tileInfo.imgSrc;

                if (!imgSrc.complete || imgSrc.naturalWidth === 0) continue;

                this.ctx.drawImage(
                    imgSrc,
                    srcX,
                    srcY,
                    tileInfo.w,
                    tileInfo.h,
                    tileX,
                    tileY,
                    tileInfo.drawW ?? tileSize,
                    tileInfo.drawH ?? tileSize
                );

            }
        }

        // Throne 
        this.ctx.drawImage(
            this.throne,
            500,
            200,
            550,
            750,
            25 * this.tileSize - this.camera.x,
            (Mrows - 16) * this.tileSize - this.camera.y,
            16 * 40,
            16 * 40
        );

        // Vargus Tribute
        this.drawNamePlate();
    }

    drawNamePlate() {
        const throneX = 25 * this.tileSize - this.camera.x;
        const throneY = (Mrows - 16) * this.tileSize - this.camera.y;

        const plateX = throneX + 175;
        const plateY = throneY + 85;
        const plateW = 270;
        const plateH = 44;

        this.ctx.save();

        this.ctx.font = "20px serif";
        this.ctx.textAlign = "center";
        this.ctx.textBaseline = "middle";

        const text = "Vargus Fellwroth";
        const textX = plateX + plateW / 2;
        const textY = plateY + plateH / 2;

        // Dark outline
        this.ctx.lineWidth = 4;
        this.ctx.strokeStyle = "rgb(45, 25, 5)";
        this.ctx.strokeText(text, textX, textY);

        // Gold fill
        this.ctx.fillStyle = "rgb(240, 178, 9)";
        this.ctx.fillText(text, textX, textY);

        this.ctx.restore();
    }

    drawHitIndicator() {
        for (const hit of hitLocations) {
            if (hit.type === "player") {
                if (!this.playerHitIndicator.complete || this.playerHitIndicator.naturalWidth === 0) return;

                const x = hit.tarX;
                const y = hit.tarY - 50;
                this.ctx.drawImage(this.playerHitIndicator,
                    0, 0, 1536, 1024,
                    x - this.camera.x,
                    y - this.camera.y,
                    120, 120);
            }

            if (hit.type === "enemy") {
                if (!this.enemyHitIndicator.complete || this.enemyHitIndicator.naturalWidth === 0) return;
                const x = hit.tarX;
                const y = hit.tarY + 200;
                this.ctx.drawImage(this.enemyHitIndicator,
                    0, 0, 1536, 1024,
                    x - this.camera.x,
                    y - this.camera.y + 20,
                    120, 120);
            }

            hit.lifeTime -= 1 / 60;
            hit.tarY -= hit.vy
        }

        for (let i = hitLocations.length - 1; i >= 0; i--) {
            if (hitLocations[i].lifeTime <= 0) {
                hitLocations.splice(i, 1);
            }
        }
    }

    render() {
        super.render();

        if (!boss.isDead) {
            boss.update(1 / 60, this.player);

            boss.animator.draw(
                this.ctx,
                boss.x - this.camera.x,
                boss.y - this.camera.y,
                boss.w,
                boss.h
            );
        } else if (!this.hasDispatchedBossDefeated) {
            this.hasDispatchedBossDefeated = true;
            window.dispatchEvent(new Event("bossDefeated"));
        }

        bossCoins.forEach(coin => {
            coin.draw(this.ctx, this.camera);
            if (coin.checkCollision(this.player)) {
                this.player.collectedCoins++;
                coin.updateReact('coinCollected')
            }
        });

        bossHearts.forEach(heart => {
            heart.draw(this.ctx, this.camera);
            if (heart.checkCollision(this.player)) {
                heal(this.player, 1);
                heart.updateReact('heartCollected')
            }
        });

        bossPowerUps.forEach(powerUp => {
            powerUp.draw(this.ctx, this.camera, true);
            if (powerUp.checkCollision(this.player)) {
                powerUp.powerUp(this.player);
                setTimeout(() => powerUp.powerRevert(this.player), 7500);
            }
        });

        this.drawHitIndicator();
    }

    createTiles() {
        const og = tileLocation.tileSize;

        return {
            [TILES.DARK]: {
                imgSrc: this.tileSet,
                srcLoc: tileLocation.dark,
                w: og,
                h: og
            },
            [TILES.DIRT]: {
                imgSrc: this.tileSet,
                srcLoc: tileLocation.dirt,
                w: og,
                h: og
            },
            [TILES.PAVED_FLOOR]: {
                imgSrc: this.tileSet,
                srcLoc: tileLocation.pavedFloor,
                w: og,
                h: og
            },
            [TILES.BRICK1]: {
                imgSrc: this.tileSet,
                srcLoc: tileLocation.brick1,
                w: og,
                h: og
            },
            [TILES.BRICK2]: {
                imgSrc: this.tileSet,
                srcLoc: tileLocation.brick2,
                w: og,
                h: og
            },
            [TILES.BROWN_BRICK1]: {
                imgSrc: this.tileSet,
                srcLoc: tileLocation.brownBrick1,
                w: og,
                h: og
            },
            [TILES.BROWN_BRICK2]: {
                imgSrc: this.tileSet,
                srcLoc: tileLocation.brownBrick2,
                w: og,
                h: og
            },
            [TILES.COLUMN_BOTTOM_LEFT]: {
                imgSrc: this.tileSet,
                srcLoc: tileLocation.colBtnL,
                w: og,
                h: og
            },
            [TILES.COLUMN_BOTTOM_RIGHT]: {
                imgSrc: this.tileSet,
                srcLoc: tileLocation.colBtnR,
                w: og,
                h: og
            },
            [TILES.COLUMN_MIDDLE_LEFT]: {
                imgSrc: this.tileSet,
                srcLoc: tileLocation.colMidL,
                w: og,
                h: og
            },
            [TILES.COLUMN_MIDDLE_RIGHT]: {
                imgSrc: this.tileSet,
                srcLoc: tileLocation.colMidR,
                w: og,
                h: og
            },
            [TILES.COLUMN_TOP_LEFT]: {
                imgSrc: this.tileSet,
                srcLoc: tileLocation.colTopL,
                w: og,
                h: og
            },
            [TILES.COLUMN_TOP_RIGHT]: {
                imgSrc: this.tileSet,
                srcLoc: tileLocation.colTopR,
                w: og,
                h: og
            },
            [TILES.BACKGROUND]: {
                imgSrc: this.tileSet,
                srcLoc: tileLocation.background,
                w: og,
                h: og
            },
            [TILES.FLOOR_CORNER_LEFT]: {
                imgSrc: this.tileSet,
                srcLoc: tileLocation.floorCornerL,
                w: og,
                h: og
            },
            [TILES.FLOOR_CORNER_RIGHT]: {
                imgSrc: this.tileSet,
                srcLoc: tileLocation.floorCornerR,
                w: og,
                h: og
            },
            [TILES.CEILING]: {
                imgSrc: this.tileSet,
                srcLoc: tileLocation.ceil,
                w: og,
                h: og
            },
            [TILES.CEILING_LEFT]: {
                imgSrc: this.tileSet,
                srcLoc: tileLocation.ceilL,
                w: og,
                h: og
            },
            [TILES.CEILING_RIGHT]: {
                imgSrc: this.tileSet,
                srcLoc: tileLocation.ceilR,
                w: og,
                h: og
            },
            [TILES.WALL_LEFT]: {
                imgSrc: this.tileSet,
                srcLoc: tileLocation.wallLeft,
                w: og,
                h: og
            },
            [TILES.WALL_RIGHT]: {
                imgSrc: this.tileSet,
                srcLoc: tileLocation.wallRight,
                w: og,
                h: og
            },
            [TILES.TREE1]: {
                imgSrc: this.tileSet,
                srcLoc: tileLocation.tree1,
                w: 16 * 4,
                h: 16 * 4.5,
                drawW: 16 * 10,
                drawH: 16 * 10
            },
            [TILES.TREE2]: {
                imgSrc: this.tileSet,
                srcLoc: tileLocation.tree2,
                w: 16 * 4,
                h: 16 * 4,
                drawW: 16 * 10,
                drawH: 16 * 10
            },
            [TILES.CHAIR]: {
                imgSrc: this.throne,
                srcLoc: tileLocation.chair,
                w: 550,
                h: 750,
                drawW: 128,
                drawH: 128
            }
        };
    }
}