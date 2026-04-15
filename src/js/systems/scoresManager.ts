interface Score {
  name: string;
  highestLevelAchieved: number;
  coinsCollected: number;
}

interface LevelResult {
  coinsCollected: number;
  highestLevelAchieved: number;
}

const getOrCreateScores = (): Score[] => {
  const raw = localStorage.getItem("scores");
  if (!raw) return [];

  const parsed = JSON.parse(raw) as unknown;
  return Array.isArray(parsed) ? (parsed as Score[]) : [];
};

const emitScoreUpdated = () => {
  window.dispatchEvent(new CustomEvent("scoresUpdated"));
};

export const saveLevelResult = ({
  coinsCollected,
  highestLevelAchieved,
}: LevelResult): void => {
  const playerName = localStorage.getItem("playerName");
  if (!playerName) return;

  const scores = getOrCreateScores();
  const existing = scores.find((score) => score.name === playerName);

  if (existing) {
    existing.coinsCollected += coinsCollected;
    existing.highestLevelAchieved = Math.max(
      existing.highestLevelAchieved,
      highestLevelAchieved,
    );
  } else {
    scores.push({
      name: playerName,
      highestLevelAchieved,
      coinsCollected,
    });
  }

  localStorage.setItem("scores", JSON.stringify(scores));
  emitScoreUpdated();
};

export const updatePlayerCoins = (coinsAdded: number): void => {
  saveLevelResult({
    coinsCollected: coinsAdded,
    highestLevelAchieved: 0,
  });
};
