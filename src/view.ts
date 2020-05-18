'use strict';
import SubViewSliderLine from './subView/subViewSliderLine';
import SubViewHandlers from './subView/subViewHandlers';
import SubViewIcons from './subView/subViewIcons';
import SubViewInput from './subView/subViewInput';
interface IView {
    // constructor(options:object, sliderContainer:HTMLDivElement): object

} 

export class View implements IView {
    
    constructor (options, sliderContainer){
        this.options = options;
        this.subViewSliderLine = new SubViewSliderLine;
        this.subViewHandlers = new SubViewHandlers;
        this.subViewIcons = new SubViewIcons;
        this.subViewInput = new SubViewInput;
        this.createSlider(options, sliderContainer);
        this.getSliderData();
        this.subViewHandlers.handlerMouseDown = (e, handler, num) => {
            this.mouseDown(e, handler, num);
        }
        this.subViewInput.newInputValue = (newInputValue) => {
            this.notifyChangedInputValue(newInputValue);
        }
    }

    createSlider = (options, sliderContainer) => {
        this.sliderContainer = sliderContainer;
        this.slider = this.subViewSliderLine.createSliderLine(sliderContainer, options);
        this.handlers = this.subViewHandlers.createHandlers(options, this.slider);
        this.icons = this.subViewIcons.createIcons(options, this.handlers, this.slider);
        this.input = this.subViewInput.createInput(options,  this.slider);        
    }

    getSliderData = () => {
        if (this.options.vertical){
            this.sliderPosition = this.slider.getBoundingClientRect().y + pageYOffset;
            this.sliderBorder = parseFloat(getComputedStyle(this.slider).borderLeftWidth);
            this.maxPosition = this.sliderPosition;
            this.minPosition = this.maxPosition + this.slider.getBoundingClientRect().height - this.handlers[0].offsetHeight;
            this.positionRange = (this.minPosition -this.maxPosition) + this.sliderBorder;
            this.handlersPosition = new SubViewHandlers().getInitialHandlersPosition(this.handlers, options);
        } else {
            this.sliderPosition = this.slider.getBoundingClientRect().x + pageXOffset;
            this.sliderBorder = parseFloat(getComputedStyle(this.slider).borderLeftWidth);
            this.minPosition = this.sliderPosition;
            this.maxPosition = this.minPosition + this.slider.getBoundingClientRect().width - this.handlers[0].offsetWidth;
            this.positionRange = (this.maxPosition - this.minPosition) + this.sliderBorder;
            this.handlersPosition = new SubViewHandlers().getInitialHandlersPosition(this.handlers, options);
        }
    }
  
    mouseDown = (e, handler, num) => {
        e.preventDefault();
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

    notifyChangedInputValue; 
}
   



    



