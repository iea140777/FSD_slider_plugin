'use strict';
import SubViewSliderLine from './subView/subViewSliderLine';
import SubViewHandlers from './subView/subViewHandlers';
import SubViewIcons from './subView/subViewIcons';
import SubViewInput from './subView/subViewInput';
import {IOptions} from './presenter';
import SubViewScale from './subView/subViewScale';

export interface IObj {
    val: number,
    percent: number
}
export class View {
    options: IOptions;
    values:IObj[];
    subViewSliderLine: SubViewSliderLine;
    subViewHandlers: SubViewHandlers;
    subViewScale: SubViewScale;
    subViewIcons: SubViewIcons;
    subViewInput: SubViewInput;
    sliderContainer:HTMLDivElement;
    slider: HTMLDivElement;
    handlers: NodeListOf<HTMLDivElement>;
    scale: NodeListOf<HTMLDivElement>;
    scaleLegend: NodeListOf<HTMLDivElement>;
    icons: NodeListOf<HTMLDivElement>;
    inputsContainer: HTMLDivElement;
    rangeInput:HTMLInputElement;
    valueInputs: NodeListOf<HTMLInputElement>;
    sliderPosition: number;
    sliderLength: number;
    sliderBorder: number;
    handlerSizePerc: number;
    handlerSizePx: number;
    maxPosition: number;
    minPosition: number;
    minPositionPerc:number;
    maxPositionPerc: number;
    positionRange: number;
    handlersPosition: number[];
    handlersPositionPerc: number[];
    rangeBlock: HTMLDivElement;


    constructor (options:IOptions, container:HTMLDivElement, values:IObj[]){
        this.options = options;
        this.values = values;
        this.subViewSliderLine = new SubViewSliderLine;
        this.subViewHandlers = new SubViewHandlers;
        this.subViewScale = new SubViewScale;
        this.subViewIcons = new SubViewIcons;
        this.subViewInput = new SubViewInput;
        this.handlersPosition = [];
        this.handlersPositionPerc = [];
        this.createSlider(options, container);
        this.getSliderData();
        this.resizeListener();
        this.subViewHandlers.handlerMouseDown = (e:MouseEvent, handler:HTMLDivElement, num:number):void => {
            this.moveByMouse(e, handler, num);
        }
        this.subViewInput.newInputValue = (newInputValue:number, num:number):void => {
            this.notifyChangedInputValue(newInputValue, num);
        }
        this.subViewSliderLine.sliderClick = (e:MouseEvent):void => {
            if (e.target !== this.handlers [0] && e.target !== this.handlers [1]) {
                this.moveByClick(e);
            }
        }
    }
    createSlider = (options:IOptions, container:HTMLDivElement):void => {
        this.sliderContainer = this.createContainer(options, container);
        this.slider = this.subViewSliderLine.createSliderLine(this.sliderContainer, options);
        this.handlers = this.subViewHandlers.createHandlers(options, this.slider);
        if (this.options.scale) {
            this.scale = this.subViewScale.createScale(options, this.slider, this.values);
        }
        if (this.options.icon) {
            this.icons = this.subViewIcons.createIcons(options, this.handlers, this.slider);
        }
        if (this.options.rangeInput || this.options.valueInputs){
            this.inputsContainer = this.subViewInput.createInputsContainer(options, this.slider, this.sliderContainer);
            if (this.options.rangeInput && this.options.handlersAmount > 1){
                this.rangeInput = this.subViewInput.createRangeInput(options, this.inputsContainer);
            }  
            if (this.options.valueInputs){
            this.valueInputs = this.subViewInput.createValueInputs(options, this.inputsContainer);
            }
        }    
    }

    createContainer = (options:IOptions, container:HTMLElement):HTMLDivElement => {
        const _cont:HTMLDivElement = document.createElement('div');
        _cont.classList.add('slider__container');
        if (this.options.vertical) {
            _cont.classList.add('slider__container_vertical');
        }
        else {
            _cont.classList.add('slider__container_horisontal');
        }
        container.append(_cont);
        let sliderContainer:HTMLDivElement = container.querySelector('.slider__container');
        return sliderContainer;
    }

    resizeListener = () => {
        let resize =  () =>  {
            this.notifyChangedWindow();
          }
          window.addEventListener('resize', resize);
    }

    notifyChangedWindow: any;

    getSliderData = ():void => {
        this.getSliderPosition();
        this.getSliderLength();
        this.getHandlerSize();
        this.getMinMaxPosition();
        if (this.options.range) {
            this.rangeBlock = this.showRange();
        }       
    }

    getSliderPosition = ():void  => {
        if (this.options.vertical){
            this.sliderPosition = this.slider.getBoundingClientRect().y + pageYOffset;
        }
        else {
            this.sliderPosition = this.slider.getBoundingClientRect().x + pageXOffset
        }
    }

    getSliderLength = ():void => {
        if (this.options.vertical){
            this.sliderLength = this.slider.getBoundingClientRect().height;
        }
        else {
            this.sliderLength = this.slider.getBoundingClientRect().width;
        }
    }

    getHandlerSize = ():void => {
        this.getSliderLength();
        if (this.options.vertical){
            this.handlerSizePerc = (this.handlers[0].offsetHeight / 2) / this.sliderLength * 100;
            this.handlerSizePx = this.handlers[0].offsetHeight;
        }
        else {
            this.handlerSizePerc = (this.handlers[0].offsetWidth / 2) / this.sliderLength * 100;
            this.handlerSizePx = this.handlers[0].offsetWidth;
        }
    }

    getMinMaxPosition = ():void =>{
        this.getHandlerSize;
        if (this.options.vertical){
            this.maxPosition = this.sliderPosition - this.handlerSizePx/2;
            this.maxPositionPerc = 0 - this.handlerSizePerc;
            this.minPosition = this.maxPosition + this.sliderLength;
            this.minPositionPerc = 100 - this.handlerSizePerc
        }
        else {
            this.minPosition = this.sliderPosition - this.handlerSizePx/2;
            this.minPositionPerc = 0 - this.handlerSizePerc;
            this.maxPosition = this.minPosition + this.sliderLength;
            this.maxPositionPerc = 100 - this.handlerSizePerc;
        }
        this.positionRange = Math.abs(this.minPosition - this.maxPosition);
    }

    showRange = ():HTMLDivElement => {
        let rangeBlock:HTMLDivElement = document.createElement('div');
        rangeBlock.classList.add('slider__range');
        if (this.options.vertical){
            rangeBlock.style.width = this.slider.getBoundingClientRect().width + 2 + 'px';
            rangeBlock.style.left = -1 + 'px';
        } 
        else {
            rangeBlock.style.height = this.slider.getBoundingClientRect().height + 2 + 'px';
            rangeBlock.style.top = -1 + 'px';
        }
        this.slider.append(rangeBlock);
        this.rangeBlock = this.slider.querySelector('.slider__range');
        this.getSliderRangePosition();
        return this.rangeBlock;
    }

    getSliderRangePosition = ():void => {
        this.getHandlerSize();
        if (this.options.vertical){
            if (this.handlersPositionPerc[0] > this.handlersPositionPerc[1]) {
                this.rangeBlock.style.top = this.handlersPositionPerc[1]  + '%';
            }
            else {
                this.rangeBlock.style.top = this.handlersPositionPerc[0] + '%';
            }
            this.rangeBlock.style.height = Math.abs(this.handlersPositionPerc[1] - this.handlersPositionPerc[0]) + '%';
        } 
        else {
            if (this.handlersPositionPerc[0] > this.handlersPositionPerc[1]) {
                this.rangeBlock.style.left = this.handlersPositionPerc[1]  + '%';
            }
            else {
                this.rangeBlock.style.left = this.handlersPositionPerc[0]  + '%';
            }
            this.rangeBlock.style.width = (Math.abs(this.handlersPositionPerc[1] - this.handlersPositionPerc[0])) + '%';
       }
    }
  
    moveByMouse = (e:MouseEvent, handler:HTMLDivElement, num:number): void => {
        e.preventDefault();
        this.getMinMaxPosition();
        let shift:number;
        let shiftXPerc: number;
        if(this.options.vertical){
            shift = e.clientY  - this.handlers[num].getBoundingClientRect().y ;
        }
        else {
            shift = e.clientX - this.handlers[num].getBoundingClientRect().x + pageXOffset;
        }
        shiftXPerc = (shift / this.sliderLength) * 100;
        handler.classList.add('slider__handler_active');
        document.onmousemove = (e:MouseEvent):void => {
            e.preventDefault;
            let mousePos:number;
            let mouseposPerc: number;
            if(this.options.vertical){
                mousePos = e.clientY ;
                mouseposPerc = ((mousePos - this.slider.getBoundingClientRect().y) / this.slider.getBoundingClientRect().height)*100;
                let newTop: number = mouseposPerc  - shiftXPerc;
                if (newTop <= this.maxPositionPerc) {
                    newTop = this.maxPositionPerc;
                }
                if (newTop >= this.minPositionPerc) {
                    newTop = this.minPositionPerc;
                }
                handler.style.top = newTop  + '%';
                this.writeNewPosition(handler, num, newTop);
            }
            else {
                mousePos = e.clientX ;
                mouseposPerc = ((mousePos - this.slider.getBoundingClientRect().x) / this.slider.getBoundingClientRect().width)*100;
                let newLeft:number = mouseposPerc  - shiftXPerc;
                if (newLeft <= this.minPositionPerc) {
                    newLeft = this.minPositionPerc;
                }
                if (newLeft >= this.maxPositionPerc) {
                    newLeft = this.maxPositionPerc;
                }
                handler.style.left = newLeft + '%';
                this.writeNewPosition(handler, num, newLeft);
            }
        }
        document.onmouseup = ():void => {
            handler.classList.remove('slider__handler_active');
            document.onmousemove = null;
          };
    }
    
    writeNewPosition = (handler:HTMLDivElement, num: number, newPos: number):void => {
        this.handlersPositionPerc[num] = newPos + this.handlerSizePerc;
        if(this.options.range){
            this.getSliderRangePosition();
        }
        this.notifyChangedHandlerPosition();
    }

    notifyChangedHandlerPosition: any;

    notifyChangedInputValue: any; 

    moveByClick = (e:MouseEvent) => {
        e.preventDefault();
        this.getMinMaxPosition();
        let clickPosition: number;
        if (this.options.vertical) {
            clickPosition = e.clientY;
        }
        else {
            clickPosition = e.clientX ;
        }
        let handlerToMove:HTMLDivElement;
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
        let clickPosPerc: number;
        if(this.options.vertical){
            clickPosPerc = ((clickPosition - this.slider.getBoundingClientRect().y) / this.slider.getBoundingClientRect().height) * 100;
            let newTop: number = clickPosPerc - this.handlerSizePerc;
            if (newTop <= this.maxPositionPerc) {
                newTop = this.maxPositionPerc;
            }
            if (newTop >= this.minPositionPerc) {
                newTop = this.minPositionPerc;
            }
            handlerToMove.style.top = newTop +  '%';
            this.writeNewPosition(handlerToMove, num, newTop);
        }
        else {
            clickPosPerc = ((clickPosition - this.slider.getBoundingClientRect().x) / this.slider.getBoundingClientRect().width)*100;
            let newLeft = clickPosPerc - this.handlerSizePerc;
            if (newLeft <= this.minPositionPerc) {
                newLeft = this.minPositionPerc;
            }
            if (newLeft >= this.maxPositionPerc) {
                newLeft = this.maxPositionPerc;
            }
            handlerToMove.style.left = newLeft + '%';
            this.writeNewPosition(handlerToMove, num, newLeft);
        }
    }

    getNearestHandler = (position: number): HTMLDivElement => {
        let a: number,
            b: number;
        if (this.options.vertical){
            a = Math.abs(this.handlers[0].getBoundingClientRect().y - position);
            b = Math.abs(this.handlers[1].getBoundingClientRect().y - position);
        }
        else {
            a = Math.abs(this.handlers[0].getBoundingClientRect().x - position);
            b = Math.abs(this.handlers[1].getBoundingClientRect().x - position);
        }
        if (b < a) {
            return this.handlers[1];
        } else {
            return this.handlers[0];
        }
    }

    updatePosition = () => {
        for (let i = 0; i < this.handlers.length; i++) {
            let newPos = this.handlersPositionPerc[i] - this.handlerSizePerc;
            if (this.options.vertical) {
                this.handlers[i].style.top = newPos + '%'; 
            }
            else {
                this.handlers[i].style.left = newPos + '%';
            }
        }
        if (this.options.range){
            this.getSliderRangePosition();
        }
    }
}
