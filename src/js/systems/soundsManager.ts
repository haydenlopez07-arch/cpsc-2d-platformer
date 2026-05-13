const sounds: Record<string, HTMLAudioElement> = {
  powerUp: new Audio("../../assets/audio/sfx/power_up.wav"),
  powerDown: new Audio("../../assets/audio/sfx/power_down.wav"),
  coin: new Audio("../../assets/audio/sfx/coin.wav"),
  heart: new Audio("../../assets/audio/sfx/heart_collect.wav"),
  jump: new Audio("../../assets/audio/sfx/jump.wav"),
  run1: new Audio("../../assets/audio/sfx/run1.wav"),
  run2: new Audio("../../assets/audio/sfx/run2.wav"),
  run3: new Audio("../../assets/audio/sfx/run3.wav"),
  run4: new Audio("../../assets/audio/sfx/run4.wav"),
  runBoss1: new Audio("../../assets/audio/sfx/foley_footstep_concrete_1.wav"),
  runBoss2: new Audio("../../assets/audio/sfx/foley_footstep_concrete_2.wav"),
  runBoss3: new Audio("../../assets/audio/sfx/foley_footstep_concrete_3.wav"),
  runBoss4: new Audio("../../assets/audio/sfx/foley_footstep_concrete_4.wav"),
  sword: new Audio("../../assets/audio/sfx/sword_slice.wav"),
  splat: new Audio("../../assets/audio/sfx/splat_quick.wav"),
  crunch: new Audio("../../assets/audio/sfx/crunch_quick.wav"),
  sword_equip: new Audio("../../assets/audio/sfx/weapon_pick_up.wav"),
  punch: new Audio("../../assets/audio/sfx/punch.wav"),
  hurt: new Audio("../../assets/audio/sfx/hurt.wav"),
  portal: new Audio("../../assets/audio/sfx/8_bit_mystery.wav"),
  win: new Audio("../../assets/audio/sfx/8_bit_level_complete.wav"), // When the boss is made, add to his death.
  loose: new Audio("../../assets/audio/sfx/8_bit_defeated.wav")
};

// make footsetps quieter
for (let i = 1; i < 5; i++) {
  const runKey = `run${i}`;
  sounds[runKey].volume = 0.15 + Math.random() * 0.2;
}
for (let i = 1; i < 5; i++) {
  const runKey = `runBoss${i}`;
  sounds[runKey].volume = 0.15 + Math.random() * 0.2;
}

sounds.punch.volume = 1;
sounds.hurt.volume = 0.4;
sounds.sword.volume = .5;

function playSound(name: string): void {
  // console.log("Played:", name);
  if (name === "run") {
    playRun();
    return;
  }
  if (name === "runBoss") {
    playRunBoss();
    return;
  }
  const sound = sounds[name];
  sound.currentTime = 0;
  sound.play();
}

function playRun(): void {
  const runSounds = [
    sounds.run1,
    sounds.run2,
    sounds.run3,
    sounds.run4
  ];

  const rnd = Math.floor(Math.random() * 4);
  let rnd2 = Math.floor(Math.random() * 4);
  while (rnd2 === rnd) {
    rnd2 = Math.floor(Math.random() * runSounds.length);
  }

  runSounds[rnd].currentTime = 0;
  runSounds[rnd].play();

  setTimeout(() => {
    runSounds[rnd2].currentTime = 0;
    runSounds[rnd2].play();
  }, 20)
}

// let rnd = 0;
function playRunBoss(): void {
  const runSounds = [
    sounds.runBoss1,
    sounds.runBoss2,
    // sounds.runBoss3,
    sounds.runBoss4
  ];

  const rnd = Math.floor(Math.random() * 3);
  let rnd2 = Math.floor(Math.random() * 3);
  while (rnd2 === rnd) {
    rnd2 = Math.floor(Math.random() * runSounds.length);
  }
  runSounds[rnd].currentTime = 0;
  runSounds[rnd].play();

  setTimeout(() => {
    runSounds[rnd2].currentTime = 0;
    runSounds[rnd2].play();
  }, 20)
}

const bgMusic: HTMLAudioElement = new Audio("../../assets/audio/music/bgMusicTemp.mp3");
bgMusic.loop = true;
bgMusic.volume = 0.4;

export function startBGMusic(): void {
  bgMusic.play().catch(() => { });
}

export function stopBGMusic(): void {
  bgMusic.pause();
  bgMusic.currentTime = 0;
}

export default playSound;