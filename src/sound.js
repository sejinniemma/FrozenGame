const olafSound = new Audio('./sound/Olaf_pull.mp3');
const fireSound = new Audio('./sound/fire_pull.mp3');
const alertSound = new Audio('./sound/alert.wav');
const winSound = new Audio('./sound/game_win');
const bgSound = new Audio('./sound/bg.mp3');

export function playOlaf() {
  playSound(olafSound);
}

export function playFire() {
  playSound(fireSound);
}

export function playAlert() {
  playSound(alertSound);
}

export function playWin() {
  playSound(winSound);
}

export function playBg() {
  playSound(bgSound);
}

export function stopBg() {
  stopSound(bgSound);
}

function playSound(sound) {
  sound.currentTime = 0;
  sound.play();
}

function stopSound(sound) {
  sound.pause();
}
