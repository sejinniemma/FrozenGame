'use strict';

import Game from './game.js';
import PopUp from './popUp.js';


const olafCount = 10;
const fireCount= 10;
const gameDuration = 10;

const game = new Game(gameDuration,olafCount,fireCount);
game.setStopListhener((result)=>{
    let text;
    switch (result) {
        case 'win':
            text = 'You won'
            break;
        case 'loose':
       text = 'You loose'
            break;
        case 'cancel':
            text = 'Replay ?'
            break
    }

    gameFinishBanner.showWithText(text);
})

const gameFinishBanner = new PopUp()
gameFinishBanner.setClickListener(()=>{
    game.start();
})









