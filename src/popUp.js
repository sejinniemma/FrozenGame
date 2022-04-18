export default class PopUp {

    constructor(){
        this.popUp = document.querySelector('.pop-up');
        this.popUpMessage = document.querySelector('.pop-up__message');
        this.popUpRefresh = document.querySelector('.pop-up__refresh');
        this.popUpRefresh.addEventListener('click',()=>{
            this.hide();
            this.onClick && this.onClick();
        })
    }

    setClickListener(onClick){
        this.onClick = onClick;
    }

    showWithText(text){
        this.popUp.style.visibility = 'visible';
        this.popUpMessage.textContent = text;
    }
    
    hide(){
        this.popUp.style.visibility = 'hidden';
    }

}