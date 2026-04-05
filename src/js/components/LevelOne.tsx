import React, { useEffect, useRef } from "react";
import "../../css/level_one_styles.css"
import DungeonHUD from "./DungeonHUD";

interface LevelOneProps {
  onSendShownComponent: (data: any) => void;
}

function LevelOne({onSendShownComponent}: LevelOneProps) {
  const gameStartedRef = useRef(false);

  useEffect(() => {
    const canvas = document.getElementById("game") as HTMLCanvasElement;
    if (canvas && !gameStartedRef.current) {
      gameStartedRef.current = true;
      
      // Load the game script dynamically
      const script = document.createElement('script');
        script.type = 'module';
      script.src = '/js/main.js';
      script.onload = () => {
        // Now that the script is loaded, start the game
        if ((window as any).startGame) {
          (window as any).startGame(canvas);
        } else {
          console.error("startGame function not found on window");
        }
      };
      script.onerror = () => {
        console.error("Failed to load game script");
      };
      document.head.appendChild(script);
    }
  }, []);

  const handleChange = (() => {
    onSendShownComponent("mainMenu")
  })
  return (
    <>
        <div className="game-stage">
          <canvas id="game"></canvas>
          <div className="hud-overlay">
            <DungeonHUD />
          </div>
        </div>
        <button onClick={handleChange}>Back to Menu</button>
    </>
  );
}

export default LevelOne;
