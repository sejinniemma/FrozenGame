'use strict';
import PopUp from './popup.js';
import * as sound from './sound.js';
import { GameBuilder, Reason } from './game.js';

let whichOne;
choose('easy');
const gameFinishBanner = new PopUp();
function choose(lev) {
  if (lev === 'easy') {
    const game = new GameBuilder() //
      .gameDuration(10)
      .olafCount(4)
      .fireCount(20)
      .build();
    whichOne = game;
  } else if (lev === 'difficult') {
    const levelUp = new GameBuilder() //
      .gameDuration(5)
      .olafCount(10)
      .fireCount(30)
      .build();
    whichOne = levelUp;
  }

  return whichOne;
}

console.log(whichOne);

whichOne.setGameStopListener(showResult);

function showResult(reason) {
  let message;
  switch (reason) {
    case Reason.win:
      message = 'YOU WON🎁';
      choose('difficult');
      sound.playWin();
      break;
    case Reason.loose:
      message = 'YOU LOST💩';
      break;
    case Reason.cancel:
      message = 'REPLAY❓';
      sound.playAlert();
      break;
    default:
      throw new Error('not valid reason');
  }

  gameFinishBanner.showWithText(message);
}

gameFinishBanner.setClickListener(() => {
  whichOne.start();
});
