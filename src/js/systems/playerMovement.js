const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
let gameState = "playing";
let lastTime = 0; // Stores previous timestamp

// Sprite sheet
const spriteSheet = new Image();
spriteSheet.src = "./src/assets/sprites/player/main_character/SpriteSheet/spritesheetmcwalkrun.png";

// Animator (Spritesheet width / 2)
const animator = new Animator(spriteSheet, 48, 48);

// Add animations
animator.addAnimation("idle right", [0]);
animator.addAnimation("idle left", [1]);
animator.addAnimation("run right", [2, 3, 4, 5]);
animator.addAnimation("run left", [6, 7, 8, 9]);

const player = {
    x: 50,
    y: 400,
    w: 40,
    h: 40,
    vx: 0, // pixels per second (speed)
    vy: 0,
    velocity: 300, // pixels per second when key held down
};

// Key tracking
const keys = {
    left: false,
    right: false,
    up: false,
    down: false,
};

// Key listeners
window.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") keys.left = true;
    if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") keys.right = true;
    if (e.key === "ArrowUp" || e.key === "w" || e.key === "W") keys.up = true;
    if (e.key === "ArrowDown" || e.key === "s" || e.key === "S") keys.down = true;
});

window.addEventListener("keyup", (e) => {
  if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") keys.left = false;
  if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") keys.right = false;
  if (e.key === "ArrowUp" || e.key === "w" || e.key === "W") keys.up = false;
  if (e.key === "ArrowDown" || e.key === "s" || e.key === "S") keys.down = false;
});

// updates game based on delta time
function update(dt) {
  if (gameState !== "playing") return;

  animator.update(dt);

  // default
  player.vx = 0;
  player.vy = 0;

  // horizontal
  // horizontal - Fixed logic and added brackets
    if (keys.left && !keys.right) {
        player.vx = -player.velocity; 
        player.lastDir = "left"; 
    } 
    else if (keys.right && !keys.left) {
        player.vx = player.velocity; 
        player.lastDir = "right"; 
    }

  // vertical (optional for testing)
  if (keys.up && !keys.down) player.vy = -player.velocity;
  else if (keys.down && !keys.up) player.vy = player.velocity;

  // Apply motion
  player.x += player.vx * dt;
  player.y += player.vy * dt;

  // Animations
    if (player.vx !== 0 || player.vy !== 0) {
      if (player.lastDir === "left") animator.setAnimation("run left");
      else animator.setAnimation("run right");
  } else {
      // If stopped, use last direction to pick the correct idle frame
      if (player.lastDir === "left") animator.setAnimation("idle left");
      else animator.setAnimation("idle right");
  }


  // Clamp to screen
  if (player.x < 0) player.x = 0;
  if (player.x + player.w > canvas.width) player.x = canvas.width - player.w;
  if (player.y < 0) player.y = 0;
  if (player.y + player.h > canvas.height) player.y = canvas.height - player.h;
}

function render() {
    let bg = 245

    ctx.fillStyle = `rgb(${bg}, ${bg},${bg})`
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    animator.draw(
        ctx,
        player.x,
        player.y,
        player.w,
        player.h
    );
}

function loop(timestamp) {
    // Timestamp in milliseconds, convert to seconds
    if (lastTime === 0) lastTime = timestamp; // First Frame
    const dt = (timestamp - lastTime) / 1000;
    lastTime = timestamp

    update(dt);
    render();
    requestAnimationFrame(loop);
}

// Start loop
requestAnimationFrame(loop);


