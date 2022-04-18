const olafSound = playSound('./sound/Olaf_pull.mp3');
const fireSound = playSound('./sound/fire_pull.mp3');

export default class Field {
    constructor(olafCount,fireCount){
        this.gameField = document.querySelector('.game__field');
        this.fieldWidth = this.gameField.getBoundingClientRect().width;
        this.fieldHeight = this.gameField.getBoundingClientRect().height;
        this.olafCount = 10;
        this.fireCount = 10;
        this.olafWidth = 100;
        this.olafHeight = 130;

        this.gameField.addEventListener('click',this.onClick);
    }

    init(){
        this.gameField.innerHTML ='';
        this._addItem('olaf',this.olafCount , 'img/olaf.png');
        this._addItem('fire',this.fireCount,'img/fire.png');
    }
    
    _addItem(className,count,imgPath){
        const x1 = 0;
        const y1 = 0;
        const x2 = this.fieldWidth - this.olafWidth;
        const y2 = this.fieldHeight - this.olafHeight;
    
        for(let i=0; i < count; i++){
            const item = document.createElement('img');
            item.setAttribute('class',className);
            item.setAttribute('src',imgPath);
            item.style.position = 'absolute';
            item.style.left = `${randomNumber(x1,x2)}px`;
            item.style.top = `${randomNumber(y1,y2)}px`;
            this.gameField.appendChild(item);
        }
    }

    setClickListener(onItemClick){
        this.onItemClick = onItemClick;
    }

     onClick = (event) => {
        const target = event.target;
        if(target.matches('.olaf')){
            target.remove();
            olafSound.play();
            this.onItemClick && this.onItemClick('olaf')
        } else if(target.matches('.fire')){
            fireSound.play()
            this.onItemClick && this.onItemClick('fire')
        }
    }
    
   
}

function randomNumber(min, max){
    return Math.random() * (max - min) + min;
}

function playSound(url){
    const audio = new Audio(url);
    return audio;
  }