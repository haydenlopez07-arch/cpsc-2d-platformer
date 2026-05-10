import React, { useEffect, useState } from "react";

interface InBetweenScreenProps {
  onEnterBoss: () => void;
  onBackToPortal: () => void;
}

const styles = {
  overlay: {
    position: "absolute",
    inset: 0,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 50,
  } as React.CSSProperties,

  card: {
    width: "min(600px, 95vw)",
    background: "#0e0a06",
    border: "3px solid #5a3e1b",
    color: "#f7efda",
    padding: 20,
    fontFamily: "'Press Start 2P', monospace",
  } as React.CSSProperties,

  title: {
    fontSize: 14,
    marginBottom: 20,
    textAlign: "center",
  } as React.CSSProperties,

  section: {
    marginBottom: 16,
    fontSize: 10,
    lineHeight: 1.8,
  } as React.CSSProperties,

  inventoryBox: {
    border: "1px solid #3a2a10",
    padding: 10,
    minHeight: 60,
    display: "flex",
    alignItems: "center",
    gap: 10,
  } as React.CSSProperties,

  buttonRow: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: 20,
    gap: 10,
  } as React.CSSProperties,

  button: {
    flex: 1,
    border: "1px solid #d3b574",
    background: "#222",
    color: "#f7efda",
    fontSize: 10,
    padding: "10px",
    cursor: "pointer",
  } as React.CSSProperties,

  disabled: {
    opacity: 0.4,
    cursor: "not-allowed",
  } as React.CSSProperties,
};

function InBetweenScreen({
  onEnterBoss,
  onBackToPortal,
}: InBetweenScreenProps) {
  const [hp, setHp] = useState(0);
  const [maxHp, setMaxHp] = useState(1);
  const [coins, setCoins] = useState(0);
  const [hasSword, setHasSword] = useState(false);

  useEffect(() => {
    
    const state = (window as any).gameState;

    console.log(state)
    if (state) {
        setHp(state.health);
        setMaxHp(state.maxHealth);
        setCoins(state.coins);
        setHasSword(state.hasSword);
    }

    const handleHealth = (e: any) => {
      setHp(e.detail.health);
      setMaxHp(e.detail.maxHealth);
    };

    const handleCoin = () => {
      setCoins((prev) => prev + 1);
    };

    const handleSword = () => {
      setHasSword(true);
    };

    window.addEventListener("playerHealthChanged", handleHealth);
    window.addEventListener("coinCollected", handleCoin);
    window.addEventListener("swordCollected", handleSword);

    return () => {
      window.removeEventListener("playerHealthChanged", handleHealth);
      window.removeEventListener("coinCollected", handleCoin);
      window.removeEventListener("swordCollected", handleSword);
    };
  }, []);

  return (
    <div style={styles.overlay}>
      <div style={styles.card}>
        <div style={styles.title}>BOSS PREPARATION</div>

        {/* Stats */}
        <div style={styles.section}>
           Hearts: {hp} / {maxHp}
          <br />
           Coins: {coins}
        </div>

        {/* Inventory */}
        <div style={styles.section}>
          INVENTORY
          <div style={styles.inventoryBox}>
            {hasSword ? (
              <img
                src="/assets/sprites/collectibles/sword_HUD.png"
                alt="Sword"
                style={{ width: 40, height: 40 }}
              />
            ) : (
              "Empty"
            )}
          </div>
        </div>

        {/* Shop */}
        {/* <div style={styles.section}>
          SHOP
          <div style={{ ...styles.button, ...styles.disabled }}>
            Coming Soon
          </div>
        </div> */}

        {/* Actions */}
        <div style={styles.buttonRow}>
          <button style={styles.button} onClick={onBackToPortal}>
            Back
          </button>
          <button style={styles.button} onClick={onEnterBoss}>
            Enter Boss
          </button>
        </div>
      </div>
    </div>
  );
}

export default InBetweenScreen;