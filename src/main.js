'use strict';

import { GameBuilder, Reason } from './game.js';
import PopUp from './popUp.js';
import * as sound from './sound.js';


const game = new GameBuilder()
.withGameDuration(10)
.withOlafCount(10)
.withFireCount(10)
.build();

game.setStopListhener((result)=>{
    let text;
    switch (result) {
        case Reason.win:
            text = 'You won'
            break;
        case Reason.lose:
            text = 'You loose'
            break;
        case Reason.cancel:
            text = 'Replay ?'
            sound.playAlert();
            break;
            default:
             throw new Error('not valid reason')
    }

    gameFinishBanner.showWithText(text);
})

const gameFinishBanner = new PopUp()
gameFinishBanner.setClickListener(()=>{
    game.start();
})









