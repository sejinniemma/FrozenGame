'use strict';
import { Field, ItemType } from './field.js';
import * as sound from './sound.js';

// Type assurance
export const Reason = Object.freeze({
  win: 'win',
  loose: 'loose',
  cancel: 'cancel',
});

// bulider pattern
export class GameBuilder {
  gameDuration(duration) {
    this.duration = duration;
    return this;
  }

  olafCount(num) {
    this.olafCount = num;
    return this;
  }

  fireCount(num) {
    this.fireCount = num;
    return this;
  }

  build() {
    return new Game(this.duration, this.olafCount, this.fireCount);
  }
}

class Game {
  constructor(gameDuration, olafCount, fireCount) {
    this.gameDuration = gameDuration;
    this.olafCount = olafCount;
    this.fireCount = fireCount;
    this.olafWidth = 100;
    this.olafHeight = 130;
    this.started = false;
    this.timer;
    this.score = 0;
    this.gameBtn = document.querySelector('.game__button');
    this.gameScore = document.querySelector('.game__score');
    this.gameTimer = document.querySelector('.game__timer');

    this.gameField = new Field(
      olafCount,
      fireCount,
      this.olafWidth,
      this.olafHeight
    );
    this.gameField.setClickListener(this.onClickField);

    this.gameBtn.addEventListener('click', () => {
      if (!this.started) {
        this.start();
      } else {
        this.finish();
      }
    });
  }

  setGameStopListener(onGameStop) {
    this.onGameStop = onGameStop;
  }

  start() {
    // bgSound.play();
    this.started = true;
    this.initGame();
    this.showPauseBtn();
    this.startGameTimer();
    this.showGameScore();
    sound.playBg();
  }

  finish(reason) {
    this.started = false;
    this.stopGameTimer();
    this.hideGameBtn();
    this.onGameStop && this.onGameStop(reason);
    sound.stopBg();
  }

  initGame() {
    this.score = 0;
    this.gameScore.innerText = this.olafCount;
    this.gameField.init();
  }

  showPauseBtn() {
    const changedBtn = document.querySelector('.fa-solid');
    changedBtn.classList.add('fa-pause');
    changedBtn.classList.remove('fa-play');
  }

  hideGameBtn() {
    this.gameBtn.style.visibility = 'hidden';
  }

  showGameScore() {
    this.gameScore.style.visibility = 'visible';
  }

  startGameTimer() {
    this.gameTimer.style.visibility = 'visible';
    let remainingSec = this.gameDuration;
    this.showMinuteAndSeconds(remainingSec);

    this.timer = setInterval(() => {
      this.showMinuteAndSeconds(--remainingSec);
      if (remainingSec === 0) {
        this.finish(this.score === this.olafCount ? Reason.win : Reason.loose);
      }
    }, 1000);
  }

  showMinuteAndSeconds(sec) {
    const minute = Math.floor(sec / 60);
    const seconds = Math.floor(sec % 60);
    return (this.gameTimer.textContent = `${minute} : ${seconds}`);
  }

  stopGameTimer() {
    clearInterval(this.timer);
  }

  onClickField = (item) => {
    if (!this.started) {
      return;
    }
    if (item === ItemType.olaf) {
      this.score++;
      this.updateScoreBoard(this.score);
      if (this.score === this.olafCount) {
        this.finish(Reason.win);
      }
    } else if (item === ItemType.fire) {
      this.finish(Reason.loose);
    }
  };

  updateScoreBoard(score) {
    this.gameScore.textContent = this.olafCount - this.score;
  }
}
