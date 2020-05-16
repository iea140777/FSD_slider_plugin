interface IView {
    constructor(options:object, sliderContainer:HTMLDivElement): object

} 

export class View implements IView {
    
    constructor (options, sliderContainer){
        this.createSlider(options, sliderContainer);
        this.getSliderData();
        this.getInitialPosition();
        this.addHandlerListeners();
        this.addInputListeners(); 
    }

    createSlider(options, sliderContainer){
        this.sliderContainer = sliderContainer;
        new SubViewSliderLine().createSliderLine(sliderContainer);
        this.slider = sliderContainer.querySelector('.slider__slider');
        new SubViewHandlers().createHandlers(options, this.slider);
        this.handlers = sliderContainer.querySelectorAll('.slider__handler');
        new SubViewInput().createInput(options, sliderContainer);
        this.input = sliderContainer.querySelector('.slider__input');
        new SubViewIcons().createIcons(options, this.handlers);
        this.icons = sliderContainer.querySelectorAll('.slider__icon');
    }

    getSliderData(){
        this.sliderPosition = this.slider.getBoundingClientRect();
        this.sliderBorder = parseFloat(getComputedStyle(this.slider).borderLeftWidth);
        this.minPosition = this.sliderPosition.x;
        this.maxPosition = this.minPosition + this.sliderPosition.width - this.handlers[0].offsetWidth;
        this.positionRange = (this.maxPosition - this.minPosition) + this.sliderBorder;
        this.handlersPosition = [];
    }

    getInitialPosition(){
        for (let i = 0; i < this.handlers.length; i++){
            let handlerPosition = this.handlers[i].getBoundingClientRect();
            this.handlersPosition[i] = handlerPosition;
        }
    }

    addHandlerListeners = () => {
        this.handlers[0].onmousedown = (e) => {
            this.handlerMouseDown(e, this.handlers[0], 0);
        }
        if(this.handlers[1]){
            this.handlers[1].onmousedown = (e) => {
                this.handlerMouseDown(e, this.handlers[1], 1);
            }
        }
    }

    handlerMouseDown = (e, handler, num) => {
        e.preventDefault();
        let handlerPosition = handler.getBoundingClientRect();
        let shiftX = e.clientX - handlerPosition.x;
        handler.classList.add('slider__handler_active');
        document.onmousemove = e => {
            let newLeft = e.clientX - shiftX - this.sliderPosition.x;
            if (newLeft < -this.sliderBorder) {
                newLeft = -this.sliderBorder;
            }
            if (newLeft > this.positionRange) {
                newLeft = this.positionRange;
            }
            handler.style.left = newLeft + 'px';
            this.writeNewPosition(handler, num);
        }
        document.onmouseup = () => {
            handler.classList.remove('slider__handler_active');
            document.onmousemove = null;
          };
    }
    
    writeNewPosition = (handler, num) => {
        let newPosition = handler.getBoundingClientRect();
        this.handlersPosition[num] = newPosition;
        let newHandlersPosition = this.handlersPosition;
        this.notifyChangedHandlerPosition(newHandlersPosition);
    }

    notifyChangedHandlerPosition;

    addInputListeners = () => {
        this.input.onclick = () => {this.input.value = '';}
        this.input.oninput = (e) => {
            this.newInputValue();
        }
    }

    newInputValue = () => {
        let newInputValue = +this.input.value;
        this.notifyChangedInputValue(newInputValue);
    }

    notifyChangedInputValue;

    
}
   


class SubViewSliderLine  {
    createSliderLine(sliderContainer){
        const sliderLine = document.createElement('div');
        sliderLine.classList.add('slider__slider');
        sliderContainer.append(sliderLine);
    }
} 
    
class SubViewHandlers  {
    createHandlers(options, slider){
        for (let i = 0; i < options.handlersAmount; i++){
            const handler = document.createElement('div');
            handler.classList.add('slider__handler');
            slider.append(handler);
        }
    }
}   

class SubViewIcons  {
    createIcons(options, handlers){
        if(options.icon){
            for (let i = 0; i < handlers.length; i++){
                const icon = document.createElement('div');
                icon.classList.add('slider__icon');
                handlers[i].append(icon);
            }     
        }
    } 
}   

class SubViewInput  {
    createInput (options, sliderContainer){
        if (options.input){
            const sliderInput = document.createElement('input');
            sliderInput.setAttribute('type', 'text')
            sliderInput.classList.add('slider__input');
            sliderContainer.append(sliderInput);
        }
    }
}


// changeCurrentPosition(){
//     for (let i = 0; i < this.handlers.length; i++){
//         this.handlers[i].addEventListener('transitionend', function(event){
//             if(this.handlers[i].getBoundingClientRect().x == this.currentPosition[i].x){return}
//             else{this.currentPosition[i].x = this.handlers[i].getBoundingClientRect().x}
//         })
//     }
// }