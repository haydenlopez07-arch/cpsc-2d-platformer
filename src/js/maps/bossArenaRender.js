import { Boss } from "../entities/boss";
import { enemies } from "../systems/damageSystem";
import { BaseRender } from "./renderBaseClass.js";
import {
    Mrows, Mcols, tileSize, map,
    tileLocation, TILES
} from "./bossArena.js";
import { bossCoins } from "../collectables/coins.js";
import { bossHearts } from "../collectables/hearts";
import { bossPowerUps } from "../collectables/powerUps.ts";

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
        
        enemies.push(boss);
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

        const startCol = Math.max(0, Math.floor(this.camera.x / tileSize)-2);
        const endCol = Math.min(Mcols, Math.ceil((this.camera.x + this.canvas.width) / tileSize)+2);

        const startRow = Math.max(0, Math.floor(this.camera.y / tileSize)-2);
        const endRow = Math.min(Mrows, Math.ceil((this.camera.y + this.canvas.height) / tileSize)+2);

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
            (Mrows-16) * this.tileSize - this.camera.y,
            16*40,
            16*40
        );
    }

    render() {
        super.render();

        boss.update(1 / 60, this.player);

        boss.animator.draw(
            this.ctx,
            boss.x - this.camera.x,
            boss.y - this.camera.y,
            boss.w,
            boss.h
        );

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
                setTimeout( () => powerUp.powerRevert(this.player), 7500);
            }
        });
    }

    createTiles(){
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
                w: 16*4,
                h: 16*4.5,
                drawW: 16*10,
                drawH: 16*10
            },
            [TILES.TREE2]: {
                imgSrc: this.tileSet,
                srcLoc: tileLocation.tree2,
                w: 16*4,
                h: 16*4,
                drawW: 16*10,
                drawH: 16*10
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