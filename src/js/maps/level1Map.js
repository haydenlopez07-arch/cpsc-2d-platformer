export const Mrows = 60;
export const Mcols = 450;
export const tileSize = 32;

// Tiles IDs used throughout the game
export const TILES = {
  SKY: 0,
  WATER: 1,
  WATER_DARK: 2,
  GRASS: 3,
  DIRT: 4,
  BOX: 5, // solid tile
  SPIKE: 6, // resets character to start
}

// Top left position in tile set
export const tileLocation = {
  tileSize: 16,
  dirt: [
    [0,16],
    [16,0],
    [16,16],
    [32,16]
  ],
  grass: [0,0],
  spike: [0,0]
};

//Sections for the map 
const SECTION_1_END = Math.floor(Mcols / 3);
const SECTION_2_END = Math.floor ((Mcols / 3) * 2);

let seed = 123;
function seededRandom() {
  seed = (seed * 1664525 + 1013904223) % 4294967296;
  return seed / 4294967296;
}

export const map = Array.from({ length: Mrows }, () =>
  Array.from({ length: Mcols }, () => TILES.SKY)
);

function setTile(row, col, tile){
  if (row >= 0 && row < Mrows && col >= 0 && col < Mcols){
    map[row][col] = tile;
  }
}

// The long pit
function longPit(startCol, endCol, depth = 4){
  for(let col = startCol; col < endCol; col++){

    for(let d = 0; d <= depth; d++){
      setTile(Mrows - 2 - d, col, TILES.SKY);
    }
    setTile(Mrows - 1, col, TILES.DIRT);
    setTile(Mrows - 2, col, TILES.SPIKE);
  }
}

// Dense amount of platforms for the long pit section

function densePlatforms(startCol, endCol){
  let x = startCol;

  while (x < endCol - 5){
    x += Math.floor(seededRandom() * 6) + 4;

    if (x >= endCol -5) break;

    const width = Math.floor(seededRandom() * 5) + 3;
    const height = Math.floor(seededRandom() * 6) + 8;

    for(let i = 0; i < width; i++){
      const col = x + i;
      if (col >= endCol) break;

      setTile(Mrows - 1 - height, col, TILES.GRASS);
      setTile(Mrows - height, col, TILES.DIRT);

    }

    x += width;

  }
}

// Random pits for third section of map
export function createRandomPits(startCol,endCol){
  let x = startCol;

  while (x < endCol - 10){
    x += Math.floor(seededRandom() * 14) + 12;
    if(x >= endCol - 10) break;
  
    const width = Math.floor(seededRandom() * 6) + 3;
    const depth = Math.floor(seededRandom() * 6) + 2;

    for(let i = 0; i < width && x + i < endCol; i++){
      const col = x + i;
     
      for(let d = 0; d <= depth; d++){
        setTile(Mrows - 2 - d, col, TILES.SKY);
      }

      setTile(Mrows -1, col, TILES.DIRT);
      setTile(Mrows - 2, col, TILES.SPIKE);
      
    }
    x += width;
  }
}

// Random platforms for third secion
export function createRandomPlatforms(startCol, endCol){
 let x = startCol;

  while (x < endCol - 10){
    x += Math.floor(seededRandom() * 10) + 8;
    if(x >= endCol - 10) break;

    const width = Math.floor(seededRandom() * 6) + 4;
    const height = Math.floor(seededRandom() * 3) + 10;

    const hasSpikes = seededRandom() < 0.9

    for(let i = 0; i < width && x + i < endCol; i++){
      const col = x +i;

      setTile(Mrows - 1 - height, x + i, col, TILES.GRASS);
      setTile(Mrows - height, col, TILES.DIRT);

      if (hasSpikes && i > 0 && i < width -1 && seededRandom() < 0.6){
        setTile(Mrows - 1 - height, col, TILES.SPIKE);
      }
    }
    x += width;
  }
}

/* optimizing randomization of dirt */
export const dirtVari = [];
const now = new Date();
const rndNumber = 
      now.getHours() * 439 + 
      now.getMinutes() * 577 + 
      now.getSeconds() * 727;

for (let y = 0; y < Mrows; y++){
  if (!dirtVari[y]) dirtVari[y] = [];

  for(let x = 0; x < Mcols; x++){
    let i = Math.ceil(Math.sqrt(x) * y * Math.pow(x, 2) * y + rndNumber) % tileLocation.dirt.length;

    dirtVari[y][x] = tileLocation.dirt[i];
  }
}


/* ---------- FLOOR ---------- */

for (let y = Mrows - 3; y < Mrows; y++){
  for(let x = 0; x < Mcols; x++){
    map[y][x] = TILES.DIRT;
  }
}


/* ---------- GRASS TOP ---------- */

for (let x = 0; x < Mcols; x++){
  map[Mrows - 4][x] = TILES.GRASS;
}

/* ------ Generate Level ------ */

//Section 1
longPit(10, SECTION_1_END);
densePlatforms(10, SECTION_1_END);

/* Section 2
 Section 2 has nothing as it gives the player a little free time from platforms and pits
*/

//Section 3
createRandomPits(SECTION_2_END, Mcols - 10);
createRandomPlatforms(SECTION_2_END, Mcols - 10);

