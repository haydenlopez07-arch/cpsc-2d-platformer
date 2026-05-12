import React, { useEffect, useRef, useState } from "react";
import "../../css/level_one_styles.css"
import DungeonHUD from "./DungeonHUD";
import InBetweenScreen from "./InBetweenScreen";
import LevelEndScreen from "./LevelEndScreen";
import { saveLevelResult } from "../systems/scoresManager";
import { startGame } from "../main";
import { useNavigate } from "react-router";
import { startBGMusic } from "../systems/soundsManager";
import SettingsScreen from "./SettingsPage";

interface LevelEndedDetail {
  reason: "death" | "victory";
  coinsCollected: number;
  highestLevelAchieved: number;
  timeAlive: number;
}

function LevelOne() {
  const navigate = useNavigate()
  const gameStartedRef = useRef(false);
  const hasHandledEndRef = useRef(false);
  const [showInBetweenScreen, setShowInBetweenScreen] = useState(false);
  const [levelResult, setLevelResult] = useState<LevelEndedDetail | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const [isGodModeOn, setGodMode] = useState(false);

  const [isSpeedOn, setSpeedMode] = useState(false);
  const [isJumpOn, setJumpMode] = useState(false);
  const [isStrengthOn, setStrengthMode] = useState(false);

  const [speedSwitch, setSpeedSwitch] = useState(false);
  const [jumpSwitch, setJumpSwitch] = useState(false);
  const [strengthSwitch, setStrengthSwitch] = useState(false);

  useEffect(() => {
    const canvas = document.getElementById("game") as HTMLCanvasElement;

    const handler = () => {
      if ((window as any).setGamePaused) {
        (window as any).setGamePaused(true);
      }

      setShowInBetweenScreen(true);
    };

    const settingsHandler = (event: KeyboardEvent) => {
      if (event.code === "Backquote" && !event.repeat) {
        setShowSettings(prev => !prev);
      }
    };

    window.addEventListener("openInBetweenScreen", handler);

    if (canvas && !gameStartedRef.current) {
      gameStartedRef.current = true;
      startGame(canvas);
    }

    window.addEventListener("click", startBGMusic);
    window.addEventListener("keydown", startBGMusic);

    window.addEventListener("keydown", settingsHandler);

    return () => {
      window.removeEventListener("openInBetweenScreen", handler);
      
      window.removeEventListener("click", startBGMusic);
      window.removeEventListener("keydown", startBGMusic);
      window.removeEventListener("keydown", settingsHandler);
    };
  }, []);

  useEffect(() => {
    const onLevelEnded = (event: Event) => {
      if (hasHandledEndRef.current) return;

      const customEvent = event as CustomEvent<LevelEndedDetail>;
      const detail = customEvent.detail;
      if (!detail) return;

      hasHandledEndRef.current = true;
      setLevelResult(detail);
      saveLevelResult({
        coinsCollected: detail.coinsCollected,
        highestLevelAchieved: detail.highestLevelAchieved,
      });

      if ((window as any).setGamePaused) {
        (window as any).setGamePaused(true);
      }
    };

    window.addEventListener("levelEnded", onLevelEnded as EventListener);

    return () => {
      window.removeEventListener("levelEnded", onLevelEnded as EventListener);
    };
  }, []);

  const handleChange = (() => {
    if ((window as any).setGamePaused) {
      (window as any).setGamePaused(false);
    }
    navigate("/")
  })

  const handleEnterBoss = () => {
    window.dispatchEvent(new Event("enterBoss"));
    setShowInBetweenScreen(false);

    if ((window as any).setGamePaused) {
      (window as any).setGamePaused(false);
    }
  };

  const handleBackToPortal = () => {
    window.dispatchEvent(new Event("movePlayerBack"));
    setShowInBetweenScreen(false);

    if ((window as any).setGamePaused) {
      (window as any).setGamePaused(false);
    }
  };

  const handleRetry = () => {
    window.location.reload();
  };

  return (
    <>
      <div className="game-stage">
        <canvas id="game"></canvas>
        <div className="hud-overlay">
          <DungeonHUD />
        </div>
        {showSettings && (
          <SettingsScreen
          isGodModeOn={isGodModeOn}
          setGodMode={setGodMode}
          setShowSettings={setShowSettings}
          
          isSpeedOn={isSpeedOn}
          setSpeedMode={setSpeedMode}
          isJumpOn={isJumpOn}
          setJumpMode={setJumpMode}
          isStrengthOn={isStrengthOn}
          setStrengthMode={setStrengthMode}

          speedSwitch={speedSwitch}
          setSpeedSwitch={setSpeedSwitch}
          jumpSwitch={jumpSwitch}
          setJumpSwitch={setJumpSwitch}
          strengthSwitch={strengthSwitch}
          setStrengthSwitch={setStrengthSwitch}
          />
        )}
        {showInBetweenScreen && (
          <InBetweenScreen
            onEnterBoss={handleEnterBoss}
            onBackToPortal={handleBackToPortal}
          />
        )}
        {levelResult && (
          <LevelEndScreen
            reason={levelResult.reason}
            coinsCollected={levelResult.coinsCollected}
            highestLevelAchieved={levelResult.highestLevelAchieved}
            timeAlive={levelResult.timeAlive}
            onRetry={handleRetry}
            onBackToMenu={handleChange}
          />
        )}
      </div>
      {/* <button onClick={handleChange}>Back to Menu</button> */}
    </>
  );
}

export default LevelOne;
