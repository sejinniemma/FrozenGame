'use strict';
import * as sound from './sound.js';
export default class Field {
  constructor(olafCount, fireCount, olafWidth, olafHeight) {
    this.olafCount = olafCount;
    this.fireCount = fireCount;
    this.olafWidth = olafWidth;
    this.olafHeight = olafHeight;
    this.field = document.querySelector('.game__field');
    this.fieldWidth = this.field.getBoundingClientRect().width;
    this.fieldHeight = this.field.getBoundingClientRect().height;
    this.field.addEventListener('click', this.onClick);
  }

  setClickListener(onItemClick) {
    this.onItemClick = onItemClick;
  }

  init() {
    this.field.innerHTML = '';
    this.#addItem('olaf', this.olafCount, 'img/olaf.png');
    this.#addItem('fire', this.fireCount, 'img/fire.png');
  }

  #addItem(className, count, imgPath) {
    const x1 = 0;
    const y1 = 0;
    const x2 = this.fieldWidth - this.olafWidth;
    const y2 = this.fieldHeight - this.olafHeight;

    for (let i = 0; i < count; i++) {
      const item = document.createElement('img');
      item.setAttribute('class', className);
      item.setAttribute('src', imgPath);
      item.style.position = 'absolute';
      item.style.left = `${randomNumber(x1, x2)}px`;
      item.style.top = `${randomNumber(y1, y2)}px`;
      this.field.appendChild(item);

      if (className === 'fire') {
        let k = randomNumber(x1, x2);
        let i = randomNumber(y1, y2);
        item.animate([{ left: `${k}px` }, { top: `${i}px` }], {
          duration: 5000,
          iterations: Infinity,
        });
      }
    }
  }

  onClick = (event) => {
    const target = event.target;
    if (target.matches('.olaf')) {
      target.remove();
      sound.playOlaf();
      this.onItemClick && this.onItemClick('olaf');
    } else if (target.matches('.fire')) {
      this.onItemClick && this.onItemClick('fire');
      sound.playFire();
    }
  };
}

function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
}
