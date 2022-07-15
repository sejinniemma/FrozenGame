'use strict';
import PopUp from "./popup.js";

const gameBtn = document.querySelector('.game__button');
const gameField = document.querySelector('.game__field');
const fieldWidth = gameField.getBoundingClientRect().width;
const fieldHeight = gameField.getBoundingClientRect().height;
const gameScore = document.querySelector('.game__score');
const gameTimer = document.querySelector('.game__timer');

const olafSound = playSound('./sound/Olaf_pull.mp3');
const fireSound = playSound('./sound/fire_pull.mp3');
const alertSound = playSound('./sound/alert.wav');
const bgSound = playSound('./sound/bg3.zip');

const olafCount =10;
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

gameBtn.addEventListener('click',()=>{
    if(!started){
        startGame();
    }else stopGame();
});

function startGame(){
    bgSound.play()
    started = true;
    score = 0;
    gameField.innerHTML ='';
    onAdd();
    showPauseBtn();
    startGameTimer();
    showGameScore();
    gameScore.textContent = olafCount;
}

function stopGame(){
    started = false;
    gameFinishBanner.showWithText('Replay ?');
    stopGameTimer();
    hideGameBtn();
    alertSound.play();
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

function onAdd(){
    initGame('olaf', olafCount , 'img/olaf.png');
    initGame('fire',fireCount,'img/fire.png');
}

function initGame(className,count,imgPath){
    const x1 = 0;
    const y1 = 0;
    const x2 = fieldWidth - olafWidth;
    const y2 = fieldHeight - olafHeight;

    for(let i=0; i < count; i++){
        const item = document.createElement('img');
        item.setAttribute('class',className);
        item.setAttribute('src',imgPath);
        item.style.position = 'absolute';
        item.style.left = `${randomNumber(x1,x2)}px`;
        item.style.top = `${randomNumber(y1,y2)}px`;
        gameField.appendChild(item);
    }
}

function randomNumber(min, max){
    return Math.random() * (max - min) + min;
}


gameField.addEventListener('click',onClickField);

function onClickField(event){
    if(!started){
        return;
    }
    const target = event.target;
    if(target.matches('.olaf')){
        target.remove();
        olafSound.play();
        score++;
        updateScoreBoard(score);
        if(score === olafCount){
            finishGame(true);
        }
    } else if(target.matches('.fire')){
        finishGame(false);
        fireSound.play()
    }
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



function playSound(url){
  const audio = new Audio(url);
  return audio;
}