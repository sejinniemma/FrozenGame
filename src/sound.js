const alertSound = new Audio('./sound/alert.wav');
const olafSound = new Audio('./sound/Olaf_pull.mp3');
const fireSound = new Audio('./sound/fire_pull.mp3');

export function playOlaf(){
    playSound(olafSound);
}

export function playFire(){
    playSound(fireSound)
}

export function playAlert(){
    playSound(alertSound)
}

function playSound(sound){
    sound.currentTime = 0;
    sound.play();
  }

  function stopSound(sound){
    sound.pause();
  }