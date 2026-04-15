import React, { useEffect, useRef, useState } from "react";
import "../../css/level_one_styles.css"
import DungeonHUD from "./DungeonHUD";
import LevelEndScreen from "./LevelEndScreen";
import { saveLevelResult } from "../systems/scoresManager";
import { startGame } from "../main";

interface LevelOneProps {
  onSendShownComponent: (data: any) => void;
}

interface LevelEndedDetail {
  reason: "death" | "victory";
  coinsCollected: number;
  highestLevelAchieved: number;
  timeAlive: number;
}

function LevelOne({onSendShownComponent}: LevelOneProps) {
  const gameStartedRef = useRef(false);
  const hasHandledEndRef = useRef(false);
  const [levelResult, setLevelResult] = useState<LevelEndedDetail | null>(null);

  useEffect(() => {
    const canvas = document.getElementById("game") as HTMLCanvasElement;
    if (canvas && !gameStartedRef.current) {
      gameStartedRef.current = true;
      
      startGame(canvas);

      // Load the game script dynamically
      // const script = document.createElement('script');
      // script.type = 'module';
      // script.src = '/js/main.js';

      // script.onload = () => {
      //   // Now that the script is loaded, start the game
      //   if ((window as any).startGame) {
      //     (window as any).startGame(canvas);
      //   } else {
      //     console.error("startGame function not found on window");
      //   }
      // };
      // script.onerror = () => {
      //   console.error("Failed to load game script");
      // };
      // document.head.appendChild(script);
    }
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
    onSendShownComponent("mainMenu")
  })

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
