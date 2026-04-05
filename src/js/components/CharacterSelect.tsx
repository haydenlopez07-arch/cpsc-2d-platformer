
import React from "react";
import { useEffect, useRef, useState } from "react";
import "../../css/CharacterSelect.css"
import whiteShirtCharacter from "../../assets/sprites/player/main_character/rotations/AIdleeast.png";
import redShirtCharacter from "../../assets/sprites/player/main_character_red_shirt/rotations/east.png";
import spriteSheet from "../../assets/sprites/player/main_character/SpriteSheet/spritesheetmcwalkrun.png";

const SHEET = spriteSheet;

interface Character {
  id: number;
  name: string;
  source: string;
  shirtColor: string;
  frameWidth: number;
  frameHeight: number;
  frameCount: number;
  fps: number;
  sheetRow: number;
}

const characters: Character[] = [
  {
    id: 1,
    name: "whiteShirt",
    source: whiteShirtCharacter,
    shirtColor: "#FFFFFF",
    frameWidth: 16,
    frameHeight: 64,
    frameCount: 10,
    fps: 5,
    sheetRow: 0,
  },
  {
    id: 2,
    source: redShirtCharacter,
    name: "RedShirt",
    shirtColor: "#FF0000",
    frameWidth: 64,
    frameHeight: 64,
    frameCount: 4,
    fps: 8,
    sheetRow: 1,
  },
];

function SpriteAnimator({ char, size = 64 }: { char: Character; size?: number }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const frameRef = useRef(0);
  const imgRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    const img = new Image();
    img.src = SHEET;
    imgRef.current = img;
    const interval = setInterval(() => {
      frameRef.current = (frameRef.current + 1) % char.frameCount;
      draw();
    }, 1000 / char.fps);
    img.onload = () => draw();

    function draw() {
      const canvas = canvasRef.current;
      if (!canvas || !imgRef.current) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.imageSmoothingEnabled = false;
      ctx.drawImage(
        imgRef.current,
        frameRef.current * char.frameWidth,
        char.sheetRow * char.frameHeight,
        char.frameWidth,
        char.frameHeight,
        0,
        0,
        size,
        size,
      );
    }

    return () => clearInterval(interval);
  }, [char]);

  return (
    <canvas
      ref={canvasRef}
      className="sprite-canvas"
      width={size}
      height={size}
    />
  );
}

interface CharCardProps {
  char: Character;
  selected: boolean;
  onClick: () => void;
  source: string;
}

function CharCard({ char, selected, onClick, source }: CharCardProps) {
  return (
    <div
      className={`char-card ${selected ? "selected" : ""}`}
      onClick={onClick}
    >
      <img src={source} alt="" style={{ width: 80 }} />
      <div className="char-name">{char.name}</div>
      <div className="char-color" style={{ color: char.shirtColor }}>
        ■ shirt
      </div>
    </div>
  );
}
interface CharacterSelectProps {
  onSendShownComponent: (data: any) => void;
}
function CharacterSelect({onSendShownComponent}: CharacterSelectProps) {
  const [selected, setSelected] = useState<number | null>(null);
  const char = characters.find((c) => c.id === selected);

  function handleConfirm() {
    if (!char) return;
    localStorage.setItem("chosenCharacter", char.name);
    onSendShownComponent("mainMenu")
}

  return (
    <div className="page">
      <div className="retro-wrap">
        <div className="retro-title">SELECT YOUR CHARACTER</div>
        <div className="retro-sub">— choose your color —</div>
        <div className="char-grid">
          {characters.map((c) => (
            <CharCard
              source={c.source}
              key={c.id}
              char={c}
              selected={selected === c.id}
              onClick={() => setSelected(c.id)}
            />
          ))}
        </div>
        <div className="selected-bar">
          {char ? (
            <>
              <img src={char.source} />
              <span style={{ color: "#ffdd00" }}>{char.name} selected</span>
            </>
          ) : (
            <span className="no-selection">
              no character selected
              <span className="cursor-blink" />
            </span>
          )}
        </div>
        <button
          className="confirm-btn"
          disabled={!selected}
          onClick={handleConfirm}
        >
          {selected ? "> CONFIRM SELECTION" : "> PICK A CHARACTER"}
        </button>
      </div>
    </div>
  );
}

export default CharacterSelect
