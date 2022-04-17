'use strict';

const gameBtn = document.querySelector('.game__button');
const gameField = document.querySelector('.game__field');
const fieldWidth = gameField.getBoundingClientRect().width;
const fieldHeight = gameField.getBoundingClientRect().height;
const gameScore = document.querySelector('.game__score');
const gameTimer = document.querySelector('.game__timer');
const olafCount = 10;
const fireCount = 10;
const olafWidth = 100;
const olafHeight = 130;
const gameDuration = 10;

let started = false;
let timer;
gameBtn.addEventListener('click',startGame);

function startGame(){
    started = true;
    onAdd();
    showPauseBtn();
    startGameTimer();
    showGameScore();
}



function showPauseBtn (){
    const changed = document.querySelector('.fa-play');
    changed.setAttribute('class','fa-solid fa-pause');
}

function showGameScore (){
    gameScore.style.visibility='visible';
}

function startGameTimer(){
    gameTimer.style.visibility = 'visible';
    let remainingSec = gameDuration;
    showMinuteAndSeconds(remainingSec);
    
    timer = setInterval(() => {
        --remainingSec;
        }, 1000);
        showMinuteAndSeconds(remainingSec);
}

function showMinuteAndSeconds(sec){
    const minute = Math.floor(sec / 60);
    const seconds = Math.floor(sec % 60);
    return gameTimer.textContent = `${minute} : ${seconds}`
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