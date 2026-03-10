// Player data with specified properties
// Exported to movement, collision, rendering
export function createPlayer(x, y) {
    return {
        x,
        y,
        w: 60,
        h: 60,
        vx: 0,
        vy: 0,
        moveSpeed: 800,
        jump: 700,
        maxFallSpeed: 1400,
        grounded: false,
        lastDir: "right"
    };
}
// Sets player to current start spot
export const player = createPlayer(200, 1500);