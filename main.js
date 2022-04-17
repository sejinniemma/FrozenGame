'use strict';

const gameBtn = document.querySelector('.game__button');
const gameField = document.querySelector('.game__field');
const fieldWidth = gameField.getBoundingClientRect().width;
const fieldHeight = gameField.getBoundingClientRect().height;
const olafCount = 10;
const fireCount = 10;
const olafWidth = 100;
const olafHeight = 130;

gameBtn.addEventListener('click',onAdd);

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