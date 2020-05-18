'use strict';
interface IView {
    // constructor(options:object, sliderContainer:HTMLDivElement): object

} 

export class View implements IView {
    
    constructor (options, sliderContainer){
        this.options = options;
        this.createSlider(options, sliderContainer);
        this.handlersPosition = [];
        this.getSliderData();
        this.getInitialHandlersPosition();
        this.addHandlerListeners();
        this.addInputListeners(); 
    }

    createSlider = (options, sliderContainer) =>{
        this.sliderContainer = sliderContainer;
        new SubViewSliderLine().createSliderLine(sliderContainer, options);
        this.slider = sliderContainer.querySelector('.slider__slider');
        new SubViewHandlers().createHandlers(options, this.slider);
        this.handlers = sliderContainer.querySelectorAll('.slider__handler');
        new SubViewInput().createInput(options,  this.slider);
        this.input = sliderContainer.querySelector('.slider__input');
        new SubViewIcons().createIcons(options, this.handlers);
        this.icons = sliderContainer.querySelectorAll('.slider__icon');
    }

    getSliderData = () => {
        if (this.options.vertical){
            this.sliderPosition = this.slider.getBoundingClientRect().y + pageYOffset;
            this.sliderBorder = parseFloat(getComputedStyle(this.slider).borderLeftWidth);
            this.maxPosition = this.sliderPosition;
            this.minPosition = this.maxPosition + this.slider.getBoundingClientRect().height - this.handlers[0].offsetHeight;
            this.positionRange = (this.minPosition -this.maxPosition) + this.sliderBorder;
            this.handlersPosition = [];
        } else {
            this.sliderPosition = this.slider.getBoundingClientRect().x + pageXOffset;
            this.sliderBorder = parseFloat(getComputedStyle(this.slider).borderLeftWidth);
            this.minPosition = this.sliderPosition;
            this.maxPosition = this.minPosition + this.slider.getBoundingClientRect().width - this.handlers[0].offsetWidth;
            this.positionRange = (this.maxPosition - this.minPosition) + this.sliderBorder;
            this.handlersPosition = [];
        }
    }

    getInitialHandlersPosition = () => {
        for (let i = 0; i < this.handlers.length; i++){
            if(this.options.vertical){
                let handlerPosition = this.handlers[i].getBoundingClientRect().y;
                this.handlersPosition[i] = handlerPosition;
            } else {
                let handlerPosition = this.handlers[i].getBoundingClientRect().x;
                this.handlersPosition[i] = handlerPosition;
            }
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
        // this.getSliderData();
        const shiftX;
        if(this.options.vertical){
            shiftX = e.clientY - this.handlersPosition[num];
        }
        else{
            shiftX = e.clientX - this.handlersPosition[num];
        }
        handler.classList.add('slider__handler_active');
        document.onmousemove = (e) => {
            if(this.options.vertical){
                // console.log(`shifty = ${shiftX}`);
                // console.log(`e.clientY = ${e.clientY}; handler = ${this.handlersPosition[num]}`);
                // console.log(this.handlersPosition[num]);
                let newTop = e.clientY - shiftX - this.sliderPosition;
                if (newTop < -this.sliderBorder) {
                    newTop = -this.sliderBorder;
                }
                if (newTop > this.positionRange) {
                    newTop = this.positionRange;
                }
                handler.style.top = newTop + 'px';
                this.writeNewPosition(handler, num);
            }
            else {
                let newLeft = e.clientX - shiftX - this.sliderPosition;
                if (newLeft < -this.sliderBorder) {
                    newLeft = -this.sliderBorder;
                }
                if (newLeft > this.positionRange) {
                    newLeft = this.positionRange;
                }
                handler.style.left = newLeft + 'px';
                this.writeNewPosition(handler, num);
            }
        }
        document.onmouseup = () => {
            handler.classList.remove('slider__handler_active');
            document.onmousemove = null;
          };
    }
    
    writeNewPosition = (handler, num) => {
        let newPosition;
        if(this.options.vertical){
            newPosition = handler.getBoundingClientRect().y + pageYOffset;
        }
        else {
            newPosition = handler.getBoundingClientRect().x + pageXOffset;
        }
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
    createSliderLine(sliderContainer, options){
        const sliderLine = document.createElement('div');
        sliderLine.classList.add('slider__slider');
        if (options.vertical) {
            sliderLine.classList.add('slider__slider_vertical');
        }
        sliderContainer.append(sliderLine);
    }
} 
    
class SubViewHandlers  {
    createHandlers(options, slider){
        for (let i = 0; i < options.handlersAmount; i++){
            const handler = document.createElement('div');
            handler.classList.add('slider__handler');
            if (options.vertical) {
                handler.classList.add('slider__handler_vertical');
            } else{
                handler.classList.add('slider__handler_horisontal');
            }
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
                if (options.vertical) {
                    icon.classList.add('slider__icon_vertical');
                } else{
                    icon.classList.add('slider__icon_horisontal');
                }
                handlers[i].append(icon);
            }     
        }
    } 
}   

class SubViewInput  {
    createInput (options, slider){
        if (options.input){
            const sliderInput = document.createElement('input');
            sliderInput.setAttribute('type', 'text')
            sliderInput.classList.add('slider__input');
            if (options.vertical) {
                sliderInput.classList.add('slider__input_vertical');
            } else{
                sliderInput.classList.add('slider__input_horisontal');
            }
            slider.append(sliderInput);
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