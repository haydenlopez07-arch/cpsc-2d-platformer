import React from "react";

interface LevelEndScreenProps {
  reason: "death" | "victory";
  coinsCollected: number;
  highestLevelAchieved: number;
  timeAlive: number;
  onRetry: () => void;
  onBackToMenu: () => void;
}

function formatTime(seconds: number): string {
  // Ensure seconds is a valid number
  const validSeconds = typeof seconds === 'number' && !isNaN(seconds) ? seconds : 0;
  const mins = Math.floor(validSeconds / 60);
  const secs = Math.floor(validSeconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

const styles = {
  overlay: {
    position: "absolute",
    inset: 0,
    backgroundColor: "rgba(0, 0, 0, 0.65)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 30,
    padding: 16,
  } as React.CSSProperties,
  card: {
    width: "min(560px, 95vw)",
    background: "#131313",
    border: "2px solid #d3b574",
    color: "#f7efda",
    borderRadius: 8,
    padding: "20px 18px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.45)",
    fontFamily: "'Press Start 2P', monospace",
  } as React.CSSProperties,
  title: {
    margin: 0,
    fontSize: 16,
    lineHeight: 1.6,
  } as React.CSSProperties,
  summary: {
    marginTop: 14,
    fontSize: 10,
    lineHeight: 1.9,
    color: "#e2d0a9",
  } as React.CSSProperties,
  actions: {
    display: "flex",
    gap: 10,
    flexWrap: "wrap",
    marginTop: 18,
  } as React.CSSProperties,
  button: {
    border: "1px solid #d3b574",
    background: "#222",
    color: "#f7efda",
    fontFamily: "'Press Start 2P', monospace",
    fontSize: 10,
    padding: "10px 12px",
    cursor: "pointer",
  } as React.CSSProperties,
  disabledButton: {
    opacity: 0.45,
    cursor: "not-allowed",
  } as React.CSSProperties,
};

function LevelEndScreen({
  reason,
  coinsCollected,
  highestLevelAchieved,
  timeAlive,
  onRetry,
  onBackToMenu,
}: LevelEndScreenProps) {
  console.log("LevelEndScreen received timeAlive:", timeAlive, "type:", typeof timeAlive);
  const title = reason === "victory" ? "VICTORY" : "YOU WERE DEFEATED";

  return (
    <div style={styles.overlay}>
      <div style={styles.card}>
        <h2 style={styles.title}>{title}</h2>

        <div style={styles.summary}>
          <div>Time Alive: {formatTime(timeAlive)}</div>
          <div>Coins Collected: {coinsCollected}</div>
          <div>Highest Level Reached: {highestLevelAchieved}</div>
        </div>

        <div style={styles.actions}>
          <button style={styles.button} onClick={onRetry}>
            Retry
          </button>
          <button style={styles.button} onClick={onBackToMenu}>
            Main Menu
          </button>
          {reason === "victory" && (
            <button
              style={{ ...styles.button, ...styles.disabledButton }}
              disabled
              title="Hook this to your next-level route when ready"
            >
              Next Level Soon
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default LevelEndScreen;