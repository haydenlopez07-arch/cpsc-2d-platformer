export const Mrows = 60;
export const Mcols = 200;
export const tileSize = 32;

// Tiles IDs used throughout the game
export const TILE_SKY = 0;
export const TILE_WATER = 1;
export const TILE_WATER_DARK = 2; // previously undecided and able to be changed
export const TILE_GRASS = 3;
export const TILE_DIRT = 4;
export const TILE_BOX = 5; // solid tile
export const TILE_SPIKE = 6; // resets character to start

// Top left position in tile set
export const tileLocation = {
  tileSize: 16,
  floors: [
    [0,16],
    [16,0],
    [16,16],
    [0,16]
  ],
  grass: [0,0]
};

export const map = Array.from({ length: Mrows }, () =>
  Array.from({ length: Mcols }, () => TILE_SKY)
);

export function createPlatform(row, startX, endX, tileType = TILE_GRASS) {
  for (let x = startX; x < endX; x++) {
    map[Mrows - row][x] = tileType;
  }
}

export function createBox(row, startX, endX) {
  for (let x = startX; x < endX; x++) {
    map[Mrows - row][x] = TILE_BOX;
  }
}

export function createSpikes(row, startX, endX) {
  for (let x = startX; x < endX; x++) {
    map[Mrows - row][x] = TILE_SPIKE;
  }
}

/* ---------- FLOOR ---------- */

for (let y = Mrows - 3; y < Mrows; y++) {
  for (let x = 0; x < Mcols; x++) {
    map[y][x] = TILE_DIRT;
  }
}

/* ---------- GRASS TOP ---------- */

for (let x = 0; x < Mcols; x++) {
  map[Mrows - 4][x] = TILE_GRASS;
}

/* ---------- PLATFORMS ---------- */

createPlatform(10, 15, 25);
createPlatform(14, 35, 50);
createPlatform(8, 65, 80);
createPlatform(12, 100, 115);
createPlatform(16, 140, 160);
createPlatform(10, 180, 195);

/* ---------- FLOATING BLOCKS ---------- */

createBox(20, 55, 60);
createBox(22, 165, 170);
createBox(12, 167, 169);
createBox(8, 122, 125);

/* -------- SPIKES -------- */

createSpikes(4, 34, 38);
createSpikes(4, 84, 92);