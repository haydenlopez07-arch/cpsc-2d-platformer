//@ts-nocheck
import { sword } from "../collectables/sword.js";
import { coins } from "../collectables/coins.js";
import { hearts } from "../collectables/hearts.js";
const styles = {
  hud: {
    fontFamily: "'Press Start 2P', monospace",
    background: "#0e0a06",
    border: "3px solid #5a3e1b",
    borderTop: "3px solid #8a6030",
    borderLeft: "3px solid #8a6030",
    width: "100%",
    position: "relative",
    overflow: "hidden",
  },
  scanlines: {
    position: "absolute",
    inset: 0,
    background:
      "repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(0,0,0,0.15) 3px,rgba(0,0,0,0.15) 4px)",
    pointerEvents: "none",
    zIndex: 0,
  },
  inner: {
    position: "relative",
    zIndex: 1,
    display: "flex",
    alignItems: "center",
    height: 72,
  },
  cell: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: "0 16px",
    height: "100%",
    borderRight: "1px solid #3a2a10",
  },
  label: {
    fontSize: 9,
    color: "#755329",
    letterSpacing: 2,
    marginBottom: 5,
  },
  hpText: {
    fontSize: 11,
    color: "#FFFF",
    letterSpacing: 1,
  },
  barTrack: {
    width: 120,
    height: 8,
    background: "#1a1006",
    border: "1px solid #3a2a10",
    marginTop: 4,
  },
  barFill: (pct) => ({
    width: `${pct}%`,
    height: "100%",
    background: "#8b1a1a",
    transition: "width 0.3s",
  }),
  weaponCell: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "0 14px",
    height: "100%",
    borderRight: "1px solid #3a2a10",
  },
  weaponSlot: {
    width: 44,
    height: 44,
    border: "1px solid #3a2a10",
    background: "#130e07",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  goldValue: {
    fontSize: 11,
    color: "#c8a86a",
    letterSpacing: 1,
  },
};

function DungeonHUD() {
  const swordSpriteSheet = "./src/assets/sprites/collectibles/sword_HUD.png";
  const [swordCollected, setSwordCollected] = React.useState(false);
  const [hp, setHp] = React.useState(3);
  const maxHp = 5;
  const [coinCount, setCoinCount] = React.useState(0);
  const [wpnIdx, setWpnIdx] = React.useState(0);
  const hpPct = Math.round((hp / maxHp) * 100);
  // Listen for the sword collection event sent from sword.js
  React.useEffect(() => {
    const handleSwordCollected = (event) => {
      setSwordCollected(event.detail.collected);
    };

    window.addEventListener("swordCollected", handleSwordCollected);

    const handleCoinCollected = (event) => {
      setCoinCount((prev) => prev + 1);
    };

    window.addEventListener("coinCollected", handleCoinCollected);

    const handleHeartCollected = (event) => {
      setHp((prev) => (prev < maxHp ? prev + 1 : prev));
    };

    window.addEventListener("heartCollected", handleHeartCollected);

    return () => {
      window.removeEventListener("swordCollected", handleSwordCollected);
      window.removeEventListener("coinCollected", handleCoinCollected);
      window.removeEventListener("heartCollected", handleHeartCollected);
    };
  }, []);

  //TODO add event listener for when the end of the level is finished so we can update scores in local storage
  //TODO add damage listeners to decrease hp

  return (
    <div>
      <link
        href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap"
        rel="stylesheet"
      />

      <div style={styles.hud}>
        <div style={styles.scanlines} />
        <div style={styles.inner}>
          {/* HP */}
          <div style={styles.cell}>
            <div style={styles.label}>HITPOINTS</div>
            <div style={styles.hpText}>
              {hp} / {maxHp}
            </div>
          </div>

          {/* Weapon slot */}
          <div style={styles.weaponCell}>
            <div style={styles.label}>WEAPON</div>
            {swordCollected ? (
              <div style={styles.weaponSlot}>
                <img src={swordSpriteSheet} alt="Sword" />
              </div>
            ) : (
              <div style={styles.weaponSlot}></div>
            )}
          </div>

          {/* Gold */}
          <div style={styles.cell}>
            <div style={styles.label}>GOLD</div>
            <div style={styles.goldValue}>{coinCount}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

(function start() {
  const renderTo = (id) => {
    const container = document.getElementById(id);
    if (!container) return null;

    // Avoid creating multiple roots on the same container
    if (!container.__firstTimeRoot) {
      container.__firstTimeRoot = ReactDOM.createRoot(container);
    }

    container.__firstTimeRoot.render(React.createElement(DungeonHUD, null));
    return container.__firstTimeRoot;
  };

  renderTo("hud");
})();
