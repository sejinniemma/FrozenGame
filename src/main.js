'use strict';

import GameBuilder from './game.js';
import PopUp from './popUp.js';


const game = new GameBuilder()
.withGameDuration(10)
.withOlafCount(10)
.withFireCount(10)
.build();

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









