'use strict';
import PopUp from './popup.js';
import * as sound from './sound.js';
import GameBuilder from './game.js';

const gameFinishBanner = new PopUp();
const game = new GameBuilder() //
  .gameDuration(10)
  .olafCount(4)
  .fireCount(20)
  .build();

game.setGameStopListener(showResult);

function showResult(reason) {
  let message;
  switch (reason) {
    case 'win':
      message = 'YOU WON🎁';
      sound.playWin();
      break;
    case 'loose':
      message = 'YOU LOST💩';
      break;
    case 'cancel':
      message = 'REPLAY❓';
      break;
    default:
      throw new Error('not valid reason');
  }

  gameFinishBanner.showWithText(message);
}

gameFinishBanner.setClickListener(() => {
  game.start();
});
