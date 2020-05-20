'use strict';
import SubViewSliderLine from './subView/subViewSliderLine';
import SubViewHandlers from './subView/subViewHandlers';
import SubViewIcons from './subView/subViewIcons';
import SubViewInput from './subView/subViewInput';
interface IView {
    // constructor(options:object, sliderContainer:HTMLDivElement): object

} 

export class View implements IView {
    
    constructor (options, container){
        this.options = options;
        this.subViewSliderLine = new SubViewSliderLine;
        this.subViewHandlers = new SubViewHandlers;
        this.subViewIcons = new SubViewIcons;
        this.subViewInput = new SubViewInput;
        this.createSlider(options, container);
        this.getSliderData();
        this.subViewHandlers.handlerMouseDown = (e, handler, num) => {
            this.mouseDown(e, handler, num);
        }
        this.subViewInput.newInputValue = (newInputValue, num) => {
            this.notifyChangedInputValue(newInputValue, num);
        }
    }

    createSlider = (options, container) => {
        this.sliderContainer = this.createContainer(options, container);
        this.slider = this.subViewSliderLine.createSliderLine(this.sliderContainer, options);
        this.handlers = this.subViewHandlers.createHandlers(options, this.slider);
        this.icons = this.subViewIcons.createIcons(options, this.handlers, this.slider);
        this.inputsContainer = this.subViewInput.createInputsContainer(options, this.slider, this.sliderContainer);
        this.rangeInput = this.subViewInput.createRangeInput(options, this.inputsContainer);
        this.valueInputs = this.subViewInput.createValueInputs(options, this.inputsContainer);    
    }

    createContainer = (options, container) => {
        const cont = document.createElement('div');
        cont.classList.add('slider__container');
        if (options.vertical) {
            cont.classList.add('slider__container_vertical');
        }
        else {
            cont.classList.add('slider__container_horisontal');
        }
        container.append(cont);
        let sliderContainer = container.querySelector('.slider__container');
        return sliderContainer;
    }

    getSliderData = () => {
        if (this.options.vertical){
            this.sliderPosition = this.slider.getBoundingClientRect().y + pageYOffset;
            this.sliderBorder = parseFloat(getComputedStyle(this.slider).borderLeftWidth);
            this.maxPosition = this.sliderPosition;
            this.minPosition = this.maxPosition + this.slider.getBoundingClientRect().height - this.handlers[0].offsetHeight;
            this.positionRange = (this.minPosition -this.maxPosition) + this.sliderBorder;
            this.handlersPosition = new SubViewHandlers().getInitialHandlersPosition(this.handlers, this.options);
            this.range = this.showRange(this.options);
            
        } else {
            this.sliderPosition = this.slider.getBoundingClientRect().x + pageXOffset;
            this.sliderBorder = parseFloat(getComputedStyle(this.slider).borderLeftWidth);
            this.minPosition = this.sliderPosition;
            this.maxPosition = this.minPosition + this.slider.getBoundingClientRect().width - this.handlers[0].offsetWidth;
            this.positionRange = (this.maxPosition - this.minPosition) + this.sliderBorder;
            this.handlersPosition = new SubViewHandlers().getInitialHandlersPosition(this.handlers, this.options);
            this.range = this.showRange(this.options);
        }
    }

    showRange = (options) => {
        if (this.options.range){
           let rangeBlock = document.createElement('div');
           rangeBlock.classList.add('slider__range');
           if (options.vertical){
                rangeBlock.style.width = this.slider.getBoundingClientRect().width + 'px';
                rangeBlock.style.left = (- this.sliderBorder) + 'px';
           } 
           else {
                rangeBlock.style.height = this.slider.getBoundingClientRect().height + 'px';
                rangeBlock.style.top = (-this.sliderBorder) + 'px';
           }
           this.slider.append(rangeBlock);
           let range = this.slider.querySelector('.slider__range');
           this.getSliderRangePosition(options, range);
           return range;
        }
    }

    getSliderRangePosition = (options, rangeBlock) => {
        if (options.vertical){
            if (this.handlersPosition[0] > this.handlersPosition[1]) {
                rangeBlock.style.top = this.handlers[1].offsetTop + this.handlers[1].offsetHeight/2 + 'px';
            }
            else {
                rangeBlock.style.top = this.handlers[0].offsetTop + this.handlers[0].offsetHeight/2 + 'px';
            }
            rangeBlock.style.height = Math.abs(this.handlersPosition[1] - this.handlersPosition[0]) + 'px';
       } 
       else {
            if (this.handlersPosition[0] > this.handlersPosition[1]) {
                rangeBlock.style.left = this.handlers[1].offsetLeft + this.handlers[1].offsetWidth/2 + 'px';
            }
            else {
                rangeBlock.style.left = this.handlers[0].offsetLeft + this.handlers[0].offsetWidth/2 + 'px';
            }
            rangeBlock.style.width = (Math.abs(this.handlersPosition[1] - this.handlersPosition[0])) + 'px';
       }
    }
  
    mouseDown = (e, handler, num) => {
        e.preventDefault();
        let shiftX;
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
        if(this.options.range){
            this.getSliderRangePosition(this.options, this.range);
        }
        let newHandlersPosition = this.handlersPosition;
        this.notifyChangedHandlerPosition(newHandlersPosition);
    }

    notifyChangedHandlerPosition;

    notifyChangedInputValue; 
}
   



    



