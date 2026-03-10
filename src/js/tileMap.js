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