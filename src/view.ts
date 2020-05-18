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
        // this.showRange(options);
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
            this.range = this.showRange(options);
        } else {
            this.sliderPosition = this.slider.getBoundingClientRect().x + pageXOffset;
            this.sliderBorder = parseFloat(getComputedStyle(this.slider).borderLeftWidth);
            this.minPosition = this.sliderPosition;
            this.maxPosition = this.minPosition + this.slider.getBoundingClientRect().width - this.handlers[0].offsetWidth;
            this.positionRange = (this.maxPosition - this.minPosition) + this.sliderBorder;
            this.handlersPosition = new SubViewHandlers().getInitialHandlersPosition(this.handlers, options);
            this.range = this.showRange(options);
        }
    }

    showRange = (options) => {
        if (options.range){
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
           this.getSliderRangePosition(options, rangeBlock);
           this.slider.append(rangeBlock);
           let range = this.slider.querySelector('.slider__range');
           return range;
        }
    }

    getSliderRangePosition = (options, rangeBlock) => {
        if (options.vertical){
            if (this.handlersPosition[0] > this.handlersPosition[1]) {
                rangeBlock.style.top = this.handlers[1].offsetTop + 'px';
            }
            else {
                rangeBlock.style.top = this.handlers[0].offsetTop + 'px';
            }
            rangeBlock.style.height = Math.abs(this.handlersPosition[1] - this.handlersPosition[0]) + 'px';
       } 
       else {
            if (this.handlersPosition[0] > this.handlersPosition[1]) {
                rangeBlock.style.left = this.handlers[1].offsetLeft + 'px';
            }
            else {
                rangeBlock.style.left = this.handlers[0].offsetLeft + 'px';
            }
            rangeBlock.style.width = (Math.abs(this.handlersPosition[1] - this.handlersPosition[0])) + 'px';
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
        if(this.options.range){
            this.getSliderRangePosition(this.options, this.range);
        }
        let newHandlersPosition = this.handlersPosition;
        this.notifyChangedHandlerPosition(newHandlersPosition);
    }

    notifyChangedHandlerPosition;

    notifyChangedInputValue; 
}
   



    



