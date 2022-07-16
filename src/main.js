'use strict';
import PopUp from './popup.js';
import Game from './game.js';

const olafCount = 10;
const fireCount = 20;
const olafWidth = 100;
const olafHeight = 130;
const gameDuration = 10;

const gameFinishBanner = new PopUp();
gameFinishBanner.setClickListener(() => {
  game.start();
});

const game = new Game(
  gameDuration,
  olafCount,
  fireCount,
  olafWidth,
  olafHeight
);
game.setGameStopListener(showResult);

function showResult(reason) {
  let message;
  switch (reason) {
    case 'win':
      message = 'YOU WON🎁';
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
