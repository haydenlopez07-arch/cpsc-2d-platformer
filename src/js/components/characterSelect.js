// @ts-nocheck

const SHEET = "src/assets/sprites/player/main_character/SpriteSheet/spritesheetmcwalkrun.png";
const characters = [{
  id: 1,
  name: "whiteShirt",
  source: "src/assets/sprites/player/main_character/rotations/AIdleeast.png",
  shirtColor: "#FFFFFF",
  frameWidth: 16,
  frameHeight: 64,
  frameCount: 10,
  fps: 5,
  sheetRow: 0
}, {
  id: 2,
  source: "src/assets/sprites/player/main_character_red_shirt/rotations/east.png",
  name: "RedShirt",
  shirtColor: "#FF0000",
  frameWidth: 64,
  frameHeight: 64,
  frameCount: 4,
  fps: 8,
  sheetRow: 1
}];
function SpriteAnimator({
  char,
  size = 64
}) {
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
      ctx.drawImage(imgRef.current, frameRef.current * char.frameWidth, char.sheetRow * char.frameHeight, char.frameWidth, char.frameHeight, 0, 0, size, size);
    }
    return () => clearInterval(interval);
  }, [char]);
  return /*#__PURE__*/React.createElement("canvas", {
    ref: canvasRef,
    className: "sprite-canvas",
    width: size,
    height: size
  });
}
function CharCard({
  char,
  selected,
  onClick,
  source
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: `char-card ${selected ? "selected" : ""}`,
    onClick: onClick
  }, /*#__PURE__*/React.createElement("img", {
    src: source,
    alt: "",
    style: {
      width: 80
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "char-name"
  }, char.name), /*#__PURE__*/React.createElement("div", {
    className: "char-color",
    style: {
      color: char.shirtColor
    }
  }, "\u25A0 shirt"));
}
function CharacterSelect() {
  const [selected, setSelected] = React.useState(null);
  const char = characters.find(c => c.id === selected);
  function handleConfirm() {
    if (!char) return;
    localStorage.setItem("chosenCharacter", char.name);
    window.history.back();
  }
  return /*#__PURE__*/React.createElement("div", {
    className: "page"
  }, /*#__PURE__*/React.createElement("div", {
    className: "retro-wrap"
  }, /*#__PURE__*/React.createElement("div", {
    className: "retro-title"
  }, "SELECT YOUR CHARACTER"), /*#__PURE__*/React.createElement("div", {
    className: "retro-sub"
  }, "\u2014 choose your color \u2014"), /*#__PURE__*/React.createElement("div", {
    className: "char-grid"
  }, characters.map(c => /*#__PURE__*/React.createElement(CharCard, {
    source: c.source,
    key: c.id,
    char: c,
    selected: selected === c.id,
    onClick: () => setSelected(c.id)
  }))), /*#__PURE__*/React.createElement("div", {
    className: "selected-bar"
  }, char ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("img", {
    src: char.source
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "#ffdd00"
    }
  }, char.name, " selected")) : /*#__PURE__*/React.createElement("span", {
    className: "no-selection"
  }, "no character selected", /*#__PURE__*/React.createElement("span", {
    className: "cursor-blink"
  }))), /*#__PURE__*/React.createElement("button", {
    className: "confirm-btn",
    disabled: !selected,
    onClick: handleConfirm
  }, selected ? "> CONFIRM SELECTION" : "> PICK A CHARACTER")));
}
(function start() {
  const container = document.getElementById("main");
  if (!container) return;
  const root = ReactDOM.createRoot(container);
  root.render(React.createElement(CharacterSelect, null));
})();
