import React, { CSSProperties, useEffect, useRef, useState } from "react";

type PlayerHealthDetail = {
  health: number;
  maxHealth: number;
};

const styles = {
  hud: {
    fontFamily: "'Press Start 2P', monospace",
    background: "#0e0a06",
    border: "3px solid #5a3e1b",
    borderTop: "3px solid #8a6030",
    borderLeft: "3px solid #8a6030",
    width: "fit-content",
    position: "relative",
    overflow: "hidden",
  } as CSSProperties,
  scanlines: {
    position: "absolute",
    inset: 0,
    background:
      "repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(0,0,0,0.15) 3px,rgba(0,0,0,0.15) 4px)",
    pointerEvents: "none",
    zIndex: 0,
  }as CSSProperties,
  inner: {
    position: "relative",
    zIndex: 1,
    display: "flex",
    alignItems: "center",
    height: 72,
  }as CSSProperties,
  cell: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: "0 16px",
    height: "100%",
    borderRight: "1px solid #3a2a10",
  }as CSSProperties,
  label: {
    fontSize: 9,
    color: "#755329",
    letterSpacing: 2,
    marginBottom: 5,
  }as CSSProperties,
  hpText: {
    fontSize: 11,
    color: "#FFFF",
    letterSpacing: 1,
  }as CSSProperties,
  barTrack: {
    width: 120,
    height: 8,
    background: "#1a1006",
    border: "1px solid #3a2a10",
    marginTop: 4,
  }as CSSProperties,
  barFill: (pct: number) => ({
    width: `${pct}%`,
    height: "100%",
    background: "#8b1a1a",
    transition: "width 0.3s",
  })as CSSProperties,
  weaponCell: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "0 14px",
    height: "100%",
    borderRight: "1px solid #3a2a10",
  }as CSSProperties,
  weaponSlot: {
    width: 44,
    height: 44,
    border: "1px solid #3a2a10",
    background: "#130e07",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }as CSSProperties,
  goldValue: {
    fontSize: 11,
    color: "#c8a86a",
    letterSpacing: 1,
  }as CSSProperties,
};

function DungeonHUD() {
  const swordSpriteSheet = "/assets/sprites/collectibles/sword_HUD.png";
  const [swordCollected, setSwordCollected] = React.useState(false);
  const [hp, setHp] = React.useState(3);
  const maxHp = 5;
  const [coinCount, setCoinCount] = React.useState(0);
  const hasDispatchedLevelEndRef = useRef(false);

  const getTimeAlive = () => {
    const getTimeAliveSeconds = (window as any).getTimeAliveSeconds;
    if (typeof getTimeAliveSeconds === "function") {
      return getTimeAliveSeconds();
    }
    return 0;
  };
  // Listen for the sword collection event sent from sword.js
  useEffect(() => {
    const handleSwordCollected = (event: Event) => {
      setSwordCollected((event as CustomEvent).detail.collected);
    };

    window.addEventListener("swordCollected", handleSwordCollected);

    const handleCoinCollected = (event: Event) => {
      setCoinCount((prev) => prev + 1);
    };

    window.addEventListener("coinCollected", handleCoinCollected);

    const handlePlayerHealthChanged = (event: Event) => {
      const detail = (event as CustomEvent<PlayerHealthDetail>).detail;
      if (!detail) return;

      setHp(detail.health);
    };

    window.addEventListener("playerHealthChanged", handlePlayerHealthChanged);

    const handlePlayerDamaged = () => {
      setHp((prev) => (prev > 0 ? prev - 1 : prev));
    };

    window.addEventListener("playerDamaged", handlePlayerDamaged);

    const handleBossDefeated = () => {
      if (hasDispatchedLevelEndRef.current) return;
      hasDispatchedLevelEndRef.current = true;

      window.dispatchEvent(
        new CustomEvent("levelEnded", {
          detail: {
            reason: "victory",
            coinsCollected: coinCount,
            highestLevelAchieved: 1,
            timeAlive: getTimeAlive(),
          },
        })
      );
    };

    window.addEventListener("bossDefeated", handleBossDefeated);

    return () => {
      window.removeEventListener("swordCollected", handleSwordCollected);
      window.removeEventListener("coinCollected", handleCoinCollected);
      window.removeEventListener("heartCollected", handlePlayerHealthChanged);
      window.removeEventListener("playerDamaged", handlePlayerDamaged);
      window.removeEventListener("bossDefeated", handleBossDefeated);
    };
  }, [coinCount]);

  useEffect(() => {
    if (hp > 0 || hasDispatchedLevelEndRef.current) return;

    hasDispatchedLevelEndRef.current = true;
    window.dispatchEvent(
      new CustomEvent("levelEnded", {
        detail: {
          reason: "death",
          coinsCollected: coinCount,
          highestLevelAchieved: 1,
          timeAlive: getTimeAlive(),
        },
      })
    );
  }, [hp, coinCount]);

  //TODO add event listener for when the end of the level is finished so we can update scores in local storage
  //TODO add damage listeners to decrease hp

  return (
    <>
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
    </>
  );
}

export default DungeonHUD;
