import { BaseRender } from "./renderBaseClass.js";
import {
    Mrows, Mcols, tileSize, map,
    tileLocation, TILES, dirtVari
} from "./level1Map.js";
import { coins } from "../collectables/coins.js";
import { hearts } from "../collectables/hearts.js";
import { enemies } from "../entities/enemy";
import { sword } from "../collectables/sword.js";
import { powerUps } from "../collectables/powerUps";
import { Portal } from "../entities/portal.js";
import { heal } from "../systems/damageSystem";
import { hitLocations } from "../systems/damageSystem";
import { startBGMusic } from "../systems/soundsManager";

export class LevelOneMap extends BaseRender {
    constructor(canvas) {
        super(
            canvas,
            map,
            Mrows,
            Mcols,
            tileSize,
            "/assets/sprites/tiles/world_tileset.png",
        );

        const portalFrames = [];
        for (let i = 0; i < 8; i++) {
            portalFrames.push(`/assets/sprites/portals/portal_frame_${i}.png`);
        }

        this.portal = new Portal(22000, 1615, portalFrames);

        this.background = new Image();
        const backgroundSources = [
            "/assets/backgrounds/level1/mario_lighter.png",
            "/assets/backgrounds/temp-menu-clouds-background.jpg",
            "/assets/backgrounds/sky.PNG"
        ];
        let sourceIndex = 0;
        this.background.onerror = () => {
            sourceIndex += 1;
            if (sourceIndex < backgroundSources.length) {
                this.background.src = backgroundSources[sourceIndex];
            }
        };
        this.background.src = backgroundSources[sourceIndex];

        this.spikeImg = new Image();
        this.spikeImg.src = "/assets/sprites/tiles/newSpike.png"

        this.coins = coins;
        this.hearts = hearts;
        this.sword = sword;
        this.enemies = enemies;

        this.playerHitIndicator = new Image();
        this.playerHitIndicator.src = "../../assets/sprites/player/player_got_hit.png"

        this.enemyHitIndicator = new Image();
        this.enemyHitIndicator.src = "../../assets/sprites/enemies/enemy_got_hit.png"

        startBGMusic();
    }

    // When you override drawMap you'll make your own draw 
    // map function since each map might have a different amount of sprites
    // and some need a random number like this one and each will 
    // need their own specific details I think if not then
    // we can later just put draw map in the base class
    drawMap() {
        if (this.background.complete && this.background.naturalWidth > 0) {
            const bgWidth = this.background.naturalWidth;
            const bgHeight = this.background.naturalHeight;
            const bgScale = this.canvas.height / bgHeight;
            const drawWidth = Math.floor(bgWidth * bgScale);
            const parallaxX = -(this.camera.x * 0.2) % drawWidth;

            for (let x = parallaxX - drawWidth; x < this.canvas.width + drawWidth; x += drawWidth) {
                this.ctx.drawImage(this.background, Math.floor(x), 0, drawWidth, this.canvas.height);
            }
        } else {
            this.ctx.fillStyle = "#7fc8ff";
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        }

        const ogSize = tileLocation.tileSize;
        const [gsx, gsy] = tileLocation.grass;
        const [ssx, ssy] = tileLocation.spike;

        const startCol = Math.max(0, Math.floor(this.camera.x / tileSize));
        const endCol = Math.min(Mcols, Math.ceil((this.camera.x + this.canvas.width) / tileSize));

        const startRow = Math.max(0, Math.floor(this.camera.y / tileSize));
        const endRow = Math.min(Mrows, Math.ceil((this.camera.y + this.canvas.height) / tileSize));

        let i = 0;
        for (let y = startRow; y < endRow; y++) {
            for (let x = startCol; x < endCol; x++) {
                const tileX = x * tileSize - this.camera.x;
                const tileY = y * tileSize - this.camera.y;

                if (
                    tileX < -tileSize ||
                    tileX > this.canvas.width ||
                    tileY < -tileSize ||
                    tileY > this.canvas.height
                ) continue;

                const tile = map[y][x];

                if (tile === TILES.SKY) this.ctx.fillStyle = "rgba(0,0,0,0)";
                if (tile === TILES.WATER) this.ctx.fillStyle = "#2b4f81";
                if (tile === TILES.WATER_DARK) this.ctx.fillStyle = "#1a2f5a";

                this.ctx.fillRect(tileX, tileY, tileSize, tileSize);

                if (tile === TILES.GRASS) {
                    if (!this.tileSet.complete || this.tileSet.naturalWidth === 0) continue;
                    this.ctx.drawImage(this.tileSet, gsx, gsy, ogSize, ogSize, tileX, tileY, tileSize, tileSize);
                }

                if (tile === TILES.DIRT) {
                    if (!this.tileSet.complete || this.tileSet.naturalWidth === 0) continue;
                    let [fsx, fsy] = dirtVari[y][x];
                    this.ctx.drawImage(this.tileSet, fsx, fsy, ogSize, ogSize, tileX, tileY, tileSize, tileSize);
                }

                if (tile === TILES.SPIKE) {
                    if (!this.spikeImg.complete || this.spikeImg.naturalWidth === 0) continue;
                    this.ctx.drawImage(this.spikeImg, ssx, ssy, 107, 107, tileX - 2, tileY, tileSize + 10, tileSize + 10);
                }

                // Temporary Boxes
                if (tile === TILES.BOX) {
                    this.ctx.fillStyle = "#8b5a2b";
                    this.ctx.fillRect(tileX, tileY, tileSize, tileSize);
                }

            }
        }
    }

    drawHitIndicator() {
        for (const hit of hitLocations) {
            if (hit.type === "player") {
                if (!this.playerHitIndicator.complete || this.playerHitIndicator.naturalWidth === 0) return;

                const x = hit.tarX;
                const y = hit.tarY
                this.ctx.drawImage(this.playerHitIndicator, 
                    0, 0, 1536, 1024, 
                    x - this.camera.x, 
                    y - this.camera.y, 
                    80, 80);
            }

            if (hit.type === "enemy") {
                if (!this.enemyHitIndicator.complete || this.enemyHitIndicator.naturalWidth === 0) return;

                const x = hit.tarX;
                const y = hit.tarY
                this.ctx.drawImage(this.enemyHitIndicator, 
                    0, 0, 1536, 1024, 
                    x - this.camera.x, 
                    y - this.camera.y + 20, 
                    80, 80);
            }

            hit.lifeTime -= 1/60;
            hit.tarY -= hit.vy
        }

        for (let i = hitLocations.length - 1; i >= 0; i--) {
            if (hitLocations[i].lifeTime <= 0) {
                hitLocations.splice(i, 1);
            }
        }
    }


    // Some classes you might not have coins/enemies/only want to have some stuff
    // or maybe use a differnt list of coins for different maps
    render() {
        super.render();

        if (this.portal) {
            this.portal.update(1 / 60);
            this.portal.render(this.ctx, this.camera);

    
            const p = this.player;

            if (
                p.x < this.portal.x + this.portal.width &&
                p.x + p.w > this.portal.x &&
                p.y < this.portal.y + this.portal.height &&
                p.y + p.h > this.portal.y
            ) {
                
                this.ctx.fillStyle = "Black";
                this.ctx.font = "30px Arial Bold";
                this.ctx.textAlign = "center";

                this.ctx.fillText("Entering portal...", this.canvas.width / 2, 60);
                if (!this.hasTriggeredPortal) {
                    this.hasTriggeredPortal = true;
                    console.log("SYNC EVENT FIRED", this.player);

                    window.gameState = {
                        health: this.player.health,
                        maxHealth: this.player.maxHealth,
                        coins: this.player.collectedCoins,
                        hasSword: this.player.hasSword || false
                    };

                    window.dispatchEvent(new Event("openInBetweenScreen"));
                }
            } else {
                this.hasTriggeredPortal = false;
            }
        }

        for (const enemy of enemies) {
            enemy.animator.draw(
                this.ctx,
                enemy.x - this.camera.x,
                enemy.y - this.camera.y + 8,
                enemy.w,
                enemy.h
            );
        }

        coins.forEach(coin => {
            coin.draw(this.ctx, this.camera);
            if (coin.checkCollision(this.player)) {
                this.player.collectedCoins++;
                coin.updateReact('coinCollected')
            }
        });

        hearts.forEach(heart => {
            heart.draw(this.ctx, this.camera);
            if (heart.checkCollision(this.player)) {
                heal(this.player, 1);
                heart.updateReact('heartCollected')
            }
        });

        sword.forEach(sword => {
            sword.draw(this.ctx, this.camera)
            if (sword.checkCollision(this.player)) {
            }
        });

        powerUps.forEach(powerUp => {
            powerUp.draw(this.ctx, this.camera, true);
            if (powerUp.checkCollision(this.player)) {
                powerUp.powerUp(this.player);
                setTimeout( () => powerUp.powerRevert(this.player), 7500);
            }
        });

        this.drawHitIndicator();
    }

}