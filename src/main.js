'use strict';
import Field from './field.js';
import PopUp from './popUp.js';
import * as sound from './sound.js';

const gameBtn = document.querySelector('.game__button');
const gameScore = document.querySelector('.game__score');
const gameTimer = document.querySelector('.game__timer');
const gameDuration = 10;
const olafCount = 10;
let started = false;
let timer;
let score = 0;

const gameFinishBanner = new PopUp()
gameFinishBanner.setClickListener(()=>{
    startGame();
})

const gameField = new Field();
gameField.setClickListener(onItemClick)

function onItemClick(item){
    if(!started){
        return;
    }
    if(item === 'olaf'){
        sound.playOlaf();
        score++;
        updateScoreBoard(score);
        if(score === olafCount){
            finishGame(true);
        }
    } else if(item === 'fire'){
        finishGame(false);
        sound.playFire();
    }
}

function updateScoreBoard(score){
    gameScore.textContent = olafCount - score;
}

gameBtn.addEventListener('click',()=>{
    if(!started){
        startGame();
    }else stopGame();
});

function startGame(){
    started = true;
    showPauseBtn();
    initGame()
    startGameTimer();
    showGameScore();
    
}

function initGame(){
    score = 0;
    gameScore.textContent = olafCount;
    gameField.init();
}

function stopGame(){
    started = false;
    gameFinishBanner.showWithText('Replay ?');
    stopGameTimer();
    hideGameBtn();
    sound.playAlert();
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
    gameFinishBanner.showWithText(win? 'You won' : 'You loose');
}





