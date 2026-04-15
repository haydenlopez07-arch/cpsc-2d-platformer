declare module "*.css";

declare module "*.jpg" {
  const resource: string;
  export default resource;
}

declare module "*.jpeg" {
  const resource: string;
  export default resource;
}

declare module "*.png" {
  const resource: string;
  export default resource;
}

declare module "*.gif" {
  const resource: string;
  export default resource;
}

declare module "*.svg" {
  const resource: string;
  export default resource;
}

declare var bootstrap: any;

interface LevelEndedDetail {
  reason: "death" | "victory";
  coinsCollected: number;
  highestLevelAchieved: number;
}

interface Window {
  startGame?: (canvas: HTMLCanvasElement) => void;
  setGamePaused?: (paused: boolean) => void;
}

interface WindowEventMap {
  levelEnded: CustomEvent<LevelEndedDetail>;
  bossDefeated: CustomEvent;
  playerDamaged: CustomEvent;
  scoresUpdated: CustomEvent;
  swordCollected: CustomEvent<{ collected: boolean }>;
  coinCollected: CustomEvent;
  heartCollected: CustomEvent;
}
