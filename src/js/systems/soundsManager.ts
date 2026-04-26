const sounds: Record<string, HTMLAudioElement> = {
  jump: new Audio("../../assets/audio/sfx/jump.wav"),
  powerUp: new Audio("../../assets/audio/sfx/power_up.wav"),
  coin: new Audio("../../assets/audio/sfx/coin.wav")
};

function playSound(name: string): void {
  console.log("Played:", name);
  const sound = sounds[name];
  sound.currentTime = 0;
  sound.play();
}

const bgMusic: HTMLAudioElement = new Audio("../../assets/audio/music/bgMusicTemp.mp3");
bgMusic.loop = true;
bgMusic.volume = 0.5;

export function startBGMusic(): void {
  bgMusic.play().catch(() => { });
  window.removeEventListener("click", startBGMusic);
  window.removeEventListener("keydown", startBGMusic);
}

window.addEventListener("load", () => {
  window.addEventListener("click", startBGMusic);
  window.addEventListener("keydown", startBGMusic);
});

export function stopBGMusic(): void {
  bgMusic.pause();
  bgMusic.currentTime = 0;
}

export default playSound;