// @ts-nocheck

const SHEET =
  "src/assets/sprites/player/main_character/SpriteSheet/spritesheetmcwalkrun.png";

const characters = [
  {
    id: 1,
    name: "whiteShirt",
    source: "src/assets/sprites/player/main_character/rotations/AIdleeast.png",
    shirtColor: "#FFFFFF",
    frameWidth: 16,
    frameHeight: 64,
    frameCount: 10,
    fps: 5,
    sheetRow: 0,
  },
  {
    id: 2,
    source:
      "src/assets/sprites/player/main_character_red_shirt/rotations/east.png",
    name: "RedShirt",
    shirtColor: "#FF0000",
    frameWidth: 64,
    frameHeight: 64,
    frameCount: 4,
    fps: 8,
    sheetRow: 1,
  },
];

function SpriteAnimator({ char, size = 64 }) {
  const canvasRef = React.useRef(null);
  const frameRef = React.useRef(0);
  const imgRef = React.useRef(null);

  React.useEffect(() => {
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

function CharCard({ char, selected, onClick, source }) {
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

function CharacterSelect() {
  const [selected, setSelected] = React.useState(null);
  const char = characters.find((c) => c.id === selected);

  function handleConfirm() {
    if (!char) return;
    localStorage.setItem("chosenCharacter", char.name);
    window.history.back();
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

(function start() {
  const container = document.getElementById("main");
  if (!container) return;
  const root = ReactDOM.createRoot(container);
  root.render(React.createElement(CharacterSelect, null));
})();
