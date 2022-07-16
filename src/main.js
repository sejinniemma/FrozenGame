'use strict';
import PopUp from "./popup.js";
import Field from "./field.js";
import * as sound from './sound.js';

const gameBtn = document.querySelector('.game__button');
const gameScore = document.querySelector('.game__score');
const gameTimer = document.querySelector('.game__timer');

const olafCount = 10;
const fireCount = 10;
const olafWidth = 100;
const olafHeight = 130;
const gameDuration = 10;

let started = false;
let timer;
let score = 0;

const gameFinishBanner = new PopUp();
gameFinishBanner.setClickListener(()=>{
    startGame();
})

const gameField = new Field(olafCount,fireCount,olafWidth,olafHeight);
gameField.setClickListener(onClickField);
function onClickField(item){
    if(!started){
        return;
    }
    if(item === 'olaf'){
        score++;
        updateScoreBoard(score);
        if(score === olafCount){
            finishGame(true);
        }
    } else if(item === 'fire'){
            finishGame(false);
    }
}

gameBtn.addEventListener('click',()=>{
    if(!started){
        startGame();
    }else {
        stopGame();
    }
});



function startGame(){
    // bgSound.play();
    started = true;
    initGame();
    showPauseBtn();
    startGameTimer();
    showGameScore();
}

function stopGame(){
    started = false;
    gameFinishBanner.showWithText('Replay ?');
    stopGameTimer();
    hideGameBtn();
    alertSound.play();
}

function initGame(){
    score = 0;
    gameScore.innerText = olafCount;
    gameField.init();
}

function showPauseBtn (){
    const changedBtn = document.querySelector('.fa-solid');
    changedBtn.classList.add('fa-pause');
    changedBtn.classList.remove('fa-play');
}

function hideGameBtn (){
    gameBtn.style.visibility ='hidden';
}

function showGameScore (){
    gameScore.style.visibility='visible';
}

function startGameTimer(){
    gameTimer.style.visibility = 'visible';
    let remainingSec = gameDuration;
    showMinuteAndSeconds(remainingSec);
    
    timer = setInterval(() => {
        showMinuteAndSeconds(--remainingSec);
        if(remainingSec === 0){
            finishGame(score===olafCount);
        }
        }, 1000);

      
}

function showMinuteAndSeconds(sec){
    const minute = Math.floor(sec / 60);
    const seconds = Math.floor(sec % 60);
    return gameTimer.textContent = `${minute} : ${seconds}`
}

function stopGameTimer(){
    clearInterval(timer);
}




function finishGame(win){
    started = false;
    stopGameTimer();
    hideGameBtn();
    win ? gameFinishBanner.showWithText('You win') : gameFinishBanner.showWithText('You loose');
}

function updateScoreBoard(score){
    gameScore.textContent = olafCount - score;
}



