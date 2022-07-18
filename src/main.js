'use strict';
import PopUp from './popup.js';
import * as sound from './sound.js';
import { GameBuilder, Reason } from './game.js';

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
    case Reason.win:
      message = 'YOU WON🎁';
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
  game.start();
});
