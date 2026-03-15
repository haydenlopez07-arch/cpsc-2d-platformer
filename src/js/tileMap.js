export const Mrows = 60;
export const Mcols = 200;
export const tileSize = 32;

//4: dirt
//3: grass
//2: undecided
//1: water
//0: sky

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
  Array.from({ length: Mcols }, () => 0)
);

/* ---------- FLOOR ---------- */

for (let y = Mrows - 3; y < Mrows; y++) {
  for (let x = 0; x < Mcols; x++) {
    map[y][x] = 4;
  }
}

/* ---------- GRASS TOP ---------- */

for (let x = 0; x < Mcols; x++) {
  map[Mrows - 4][x] = 3;
}

/* ---------- PLATFORMS ---------- */

for (let x = 15; x < 25; x++) map[Mrows - 10][x] = 3;
for (let x = 35; x < 50; x++) map[Mrows - 14][x] = 3;
for (let x = 65; x < 80; x++) map[Mrows - 8][x] = 3;
for (let x = 100; x < 115; x++) map[Mrows - 12][x] = 3;
for (let x = 140; x < 160; x++) map[Mrows - 16][x] = 3;
for (let x = 180; x < 195; x++) map[Mrows - 10][x] = 3;

/* ---------- FLOATING BLOCKS ---------- */

for (let x = 55; x < 60; x++) map[Mrows - 20][x] = 4;
for (let x = 165; x < 170; x++) map[Mrows - 22][x] = 4;

/* --------- Testing horizontal collision ----------*/
// map[Mrows - 8][33] = 3;
// map[Mrows - 7][33] = 4;
// map[Mrows - 6][33] = 4;
// map[Mrows - 5][33] = 4;
// map[Mrows - 4][33] = 4;
makePlatform(4, 8, 33, 33, 4, 3); // same as above

/* ---- WATER ------ */
makePlatform(1, 4, 36, 44, 2, 1);

// Functions to help make platform
/**
* Makes vertical platfrom
* @param {*} bottom - Start position
* @param {*} top - End position
* @param {*} left - Left beginning position
* @param {*} right - Right end position
* @param {*} tile - Tile type
* @param {*} topTile - Tile type for top tile, leave empty if you don't want a different type on top
*/
export function makePlatform(bottom, top, left, right, tile, topTile = tile) {
  for (let d = left; d <= right; d++) {
    for (let i = bottom; i < top; i++) {
      map[Mrows - i][d] = tile;
    }
    map[Mrows - top][d] = topTile;
  }
}
