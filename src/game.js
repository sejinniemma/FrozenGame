import Field from './field.js';
import * as sound from './sound.js';

export default class GameBuilder{
    
    withGameDuration(duration){
        this.gameDuration = duration;
        return this;
    }
    withOlafCount(num){
        this.olafCount = num;
        return this;
    }
    withFireCount(num){
        this.fireCount = num;
        return this;
    }
    build(){
        return new Game(
            this.gameDuration,
            this.olafCount,
            this.fireCount
        )
    }
}

 class Game {
    constructor(gameDuration,olafCount,fireCount){
        this.gameBtn = document.querySelector('.game__button');
        this.gameScore = document.querySelector('.game__score');
        this.gameTimer = document.querySelector('.game__timer');
        this.gameDuration = gameDuration;
        this.olafCount  =  olafCount; 
        this.fireCount = fireCount;
        this.started = false;
        this.timer = undefined;
        this.score = 0;

        this.gameField = new Field(olafCount,fireCount);
        this.gameField.setClickListener(this.onItemClick);

        this.gameBtn.addEventListener('click',()=>{
            if(!this.started){
                this.start();
            } else this.stop();
        });
    }

    setStopListhener(onGameStop){
        this.onGameStop = onGameStop;
    }

    onItemClick = (item) => {
        if(!this.started){
            return;
        }
        if(item === 'olaf'){
            sound.playOlaf();
            this.score++;
            this.updateScoreBoard(this.score);
            if(this.score === this.olafCount){
                this.finishGame(true);
            }
        } else if(item === 'fire'){
            this.finishGame(false);
            sound.playFire();
        }
    }

    updateScoreBoard(score){
        this.gameScore.textContent = this.olafCount - this.score;
    }
    

            start(){
                this.started = true;
                this.showPauseBtn();
                this.initGame()
                this.startGameTimer();
                this.showGameScore();
                
            }

            initGame(){
                this.score = 0;
                this.gameScore.textContent = this.olafCount;
                this.gameField.init();
            }

            stop(){
                this.started = false;
                this.onGameStop && this.onGameStop('cancel');
                this.stopGameTimer();
                this.hideGameBtn();
                sound.playAlert();
            }


            showPauseBtn (){
                const changedBtn = document.querySelector('.fa-solid');
                changedBtn.classList.add('fa-pause');
                changedBtn.classList.remove('fa-play');
            }

            hideGameBtn (){
                this.gameBtn.style.visibility ='hidden';
            }

            showGameScore (){
                this.gameScore.style.visibility='visible';
            }

            startGameTimer(){
                this.gameTimer.style.visibility = 'visible';
                let remainingSec = this.gameDuration;
                this.showMinuteAndSeconds(remainingSec);
                
                this.timer = setInterval(() => {
                    this.showMinuteAndSeconds(--remainingSec);
                    if(remainingSec === 0){
                        this.finishGame(this.score===this.olafCount);
                    }
                    }, 1000);
            }

            showMinuteAndSeconds(sec){
                const minute = Math.floor(sec / 60);
                const seconds = Math.floor(sec % 60);
                return this.gameTimer.textContent = `${minute} : ${seconds}`
            }

            stopGameTimer(){
                clearInterval(this.timer);
            }


            finishGame(win){
                this.started = false;
                this.stopGameTimer();
                this.hideGameBtn();
                this.onGameStop && this.onGameStop(win ? 'win' : 'loose');
            }
        }