'use strict';
import SubViewSliderLine from './subView/subViewSliderLine';
import SubViewHandlers from './subView/subViewHandlers';
import SubViewIcons from './subView/subViewIcons';
import SubViewInput from './subView/subViewInput';
import {IOptions} from './presenter';
import SubViewScale from './subView/subViewScale';

export class View {
    options: IOptions;
    subViewSliderLine: SubViewSliderLine;
    subViewHandlers: SubViewHandlers;
    subViewScale: SubViewScale;
    subViewIcons: SubViewIcons;
    subViewInput: SubViewInput;
    sliderContainer:HTMLDivElement;
    slider: HTMLDivElement;
    handlers: NodeListOf<HTMLDivElement>;
    scale: NodeListOf<HTMLDivElement>;
    icons: NodeListOf<HTMLDivElement>;
    inputsContainer: HTMLDivElement;
    rangeInput:HTMLInputElement;
    valueInputs: NodeListOf<HTMLInputElement>;
    sliderPosition: number;
    sliderBorder: number;
    handlersHeight: number;
    handlersWidth: number;
    maxPosition: number;
    minPosition: number;
    positionRange: number;
    handlersPosition: number[];
    range: HTMLDivElement;


    constructor (options:IOptions, container:HTMLDivElement){
        this.options = options;
        this.subViewSliderLine = new SubViewSliderLine;
        this.subViewHandlers = new SubViewHandlers;
        this.subViewScale = new SubViewScale;
        this.subViewIcons = new SubViewIcons;
        this.subViewInput = new SubViewInput;
        this.createSlider(options, container);
        this.getSliderData();
        this.getScalePosition();
        this.subViewHandlers.handlerMouseDown = (e:MouseEvent, handler:HTMLDivElement, num:number):void => {
            this.moveByMouse(e, handler, num);
        }
        this.subViewInput.newInputValue = (newInputValue:number, num:number):void => {
            this.notifyChangedInputValue(newInputValue, num);
        }
        this.subViewSliderLine.sliderClick = (e:MouseEvent):void => {
            if (e.target !== this.handlers [0] && e.target !== this.handlers [1]) {
                // console.log (e.target);
                this.moveByClick(e);
            }
        }
        // this.subViewScale.scalePpointClick = (e:MouseEvent):void =>{
        //     this.moveByClick(e);
        // }
    }

    createSlider = (options:IOptions, container:HTMLDivElement):void => {
        this.sliderContainer = this.createContainer(options, container);
        this.slider = this.subViewSliderLine.createSliderLine(this.sliderContainer, options);
        this.handlers = this.subViewHandlers.createHandlers(options, this.slider);
        if (this.options.scale) {
            this.scale = this.subViewScale.createScale(options, this.slider);
        }
        if (this.options.icon) {
            this.icons = this.subViewIcons.createIcons(options, this.handlers, this.slider);
        }
        if(this.options.rangeInput || this.options.valueInputs){
            this.inputsContainer = this.subViewInput.createInputsContainer(options, this.slider, this.sliderContainer);
            if (this.options.rangeInput && this.options.handlersAmount > 1){
                this.rangeInput = this.subViewInput.createRangeInput(options, this.inputsContainer);
            }       
            if(this.options.valueInputs){
            this.valueInputs = this.subViewInput.createValueInputs(options, this.inputsContainer);
            }
        }    
    }

    createContainer = (options:IOptions, container:HTMLElement):HTMLDivElement => {
        const _cont:HTMLDivElement = document.createElement('div');
        _cont.classList.add('slider__container');
        if (options.vertical) {
            _cont.classList.add('slider__container_vertical');
        }
        else {
            _cont.classList.add('slider__container_horisontal');
        }
        container.append(_cont);
        let sliderContainer:HTMLDivElement = container.querySelector('.slider__container');
        return sliderContainer;
    }

    getSliderData = ():void => {
        if (this.options.vertical){
            this.sliderPosition = this.slider.getBoundingClientRect().y + pageYOffset;
            this.sliderBorder = parseFloat(getComputedStyle(this.slider).borderLeftWidth);
            this.handlersHeight = this.handlers[0].offsetHeight;
            this.maxPosition = this.sliderPosition - this.handlersHeight/2;
            this.minPosition = this.maxPosition + this.slider.getBoundingClientRect().height;
            this.positionRange = (this.minPosition - this.maxPosition);
            this.handlersPosition = this.subViewHandlers.getInitialHandlersPosition(this.handlers, this.options);
            this.range = this.showRange(this.options);
            
        } else {
            this.sliderPosition = this.slider.getBoundingClientRect().x + pageXOffset;
            this.handlersWidth = this.handlers[0].offsetWidth;
            console.log(this.slider.getBoundingClientRect());
            this.sliderBorder = parseFloat(getComputedStyle(this.slider).borderLeftWidth);
            this.minPosition = this.sliderPosition - this.handlersWidth/2;
            this.maxPosition = this.minPosition + this.slider.getBoundingClientRect().width;
            this.positionRange = (this.maxPosition - this.minPosition);
            this.handlersPosition = new SubViewHandlers().getInitialHandlersPosition(this.handlers, this.options);
            this.range = this.showRange(this.options);
        }
    }

    getScalePosition = (): void => {
        const posToVal: number = this.positionRange / Math.abs((this.options.maxValue - this.options.minValue));
        for (let i = 0; i < this.scale.length; i++){
            if (this.options.vertical) {
                if (i == 0) {
                    this.scale[i].style.top = this.positionRange + 'px';
                }
                else if (i == this.scale.length - 1){
                    this.scale[i].style.top = 0 + 'px';
                }
                else {
                    this.scale[i].style.top = this.positionRange - (i * posToVal * this.options.step)  + 'px';
                }    
            } else {
                if (i == 0) {
                    this.scale[i].style.left = 0 + 'px';
                }
                else if (i == this.scale.length - 1){
                    this.scale[i].style.left = this.positionRange + 'px';
                }
                else {
                    this.scale[i].style.left = (i * posToVal * this.options.step)  + 'px';
                }    
            }
        }
    }

    showRange = (options:IOptions):HTMLDivElement => {
        if (this.options.range){
           let rangeBlock:HTMLDivElement = document.createElement('div');
           rangeBlock.classList.add('slider__range');
           if (options.vertical){
                rangeBlock.style.width = this.slider.getBoundingClientRect().width + 2 + 'px';
                rangeBlock.style.left = -1 + 'px';
           } 
           else {
                rangeBlock.style.height = this.slider.getBoundingClientRect().height + 2 + 'px';
                rangeBlock.style.top = -1 + 'px';
           }
           this.slider.append(rangeBlock);
           let range:HTMLDivElement = this.slider.querySelector('.slider__range');
           this.getSliderRangePosition(options, range);
           return range;
        }
    }

    getSliderRangePosition = (options:IOptions, rangeBlock:HTMLDivElement):void => {
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
  
    moveByMouse = (e:MouseEvent, handler:HTMLDivElement, num:number): void => {
        e.preventDefault();
        let shiftX:number;
        if(this.options.vertical){
            shiftX = e.clientY - this.handlersPosition[num];
        }
        else{
            shiftX = e.clientX - this.handlersPosition[num];
        }
        handler.classList.add('slider__handler_active');
        document.onmousemove = (e:MouseEvent):void => {
            if(this.options.vertical){
                let newTop: number = e.clientY  - shiftX - this.sliderPosition;
                if (newTop <= (this.maxPosition - this.sliderPosition)) {
                    newTop = this.maxPosition - this.sliderPosition;
                }
                if (newTop >= this.minPosition - this.sliderPosition) {
                    newTop = this.minPosition - this.sliderPosition;
                }
                handler.style.top = newTop  + 'px';
                this.writeNewPosition(handler, num);
            }
            else {
                let newLeft = e.clientX  - shiftX - this.sliderPosition;
                if (newLeft <= (this.minPosition - this.sliderPosition)) {
                    newLeft = this.minPosition - this.sliderPosition;
                }
                if (newLeft >= this.maxPosition - this.sliderPosition) {
                    newLeft = this.maxPosition - this.sliderPosition;
                }
                handler.style.left = newLeft + 'px';
                this.writeNewPosition(handler, num);
            }
        }
        document.onmouseup = ():void => {
            handler.classList.remove('slider__handler_active');
            document.onmousemove = null;
          };
    }
    
    writeNewPosition = (handler:HTMLDivElement, num: number):void => {
        let newPosition: number;
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
        this.notifyChangedHandlerPosition();
    }

    notifyChangedHandlerPosition: any;

    notifyChangedInputValue: any; 

    moveByClick = (e:MouseEvent) =>{
        let clickPosition;
        if (this.options.vertical) {
            clickPosition = e.clientY;
        }
        else {
            clickPosition = e.clientX ;
        }
        let handlerToMove;
        if (this.options.handlersAmount == 2) {
            handlerToMove = this.getNearestHandler(clickPosition);
        }
        else {
            handlerToMove = this.handlers[0];
        }
        let num = 0;
        if (handlerToMove == this.handlers[1]){
            num = 1;
        }
        console.log (handlerToMove, num)
        if(this.options.vertical){
            let newTop: number = e.clientY + pageYOffset - this.handlersHeight/2 -  this.sliderPosition;
            if (newTop <= (this.maxPosition - this.sliderPosition)) {
                newTop = this.maxPosition - this.sliderPosition;
            }
            if (newTop >= this.minPosition - this.sliderPosition) {
                newTop = this.minPosition - this.sliderPosition;
            }
            handlerToMove.style.top = newTop +  'px';
            this.writeNewPosition(handlerToMove, num);
            console.log(this.handlersPosition);
        }
        else {
            let newLeft = e.clientX  + pageXOffset - this.handlersWidth/2 - this.sliderPosition;
            if (newLeft <= (this.minPosition - this.sliderPosition)) {
                newLeft = this.minPosition - this.sliderPosition;
            }
            if (newLeft >= this.maxPosition - this.sliderPosition) {
                newLeft = this.maxPosition - this.sliderPosition;
            }
            handlerToMove.style.left = newLeft + 'px';
            this.writeNewPosition(handlerToMove, num);
        }
    }

    getNearestHandler = (position: number): HTMLDivElement =>{
        let a = Math.abs(this.handlersPosition[0] - position);
        let b = Math.abs(this.handlersPosition[1] - position);
        console.log (position, a, b);
        if (b < a) {
            return this.handlers[1];
        } else {
            return this.handlers[0];
        }
    }

}
   



    



