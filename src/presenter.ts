import Model from "./model";
import {View} from  "./view";

export interface IOptions {
    minValue: number|string;
    maxValue: number|string;
    startingValue: [number, number]; //if customValues: startingValue should be defined as indexes of required customValuesList items
    vertical:boolean;
    step: number;
    moveBySteps: boolean;
    range: boolean;
    rangeInput: boolean;
    valueInputs: boolean;
    handlersAmount: number;
    scale: boolean;
    scaleLegend: boolean;
    icon: boolean;
    customValues: boolean,
    customValuesList: string
}

export class Presenter {
    options:IOptions;
    model: Model;
    view: View;

    constructor(options:IOptions, container:HTMLDivElement){
        this.checkOptions(options);
        this.model = new Model(this.options);
        if (this.options.customValues) {
            this.model.notifyChangedOptions = ():void => {
                this.options = this.model.options;
            }
        }
        this.view = new View (this.options, container, this.model.allValues);
        console.log (this.view);
        console.log (this.model);
        this.setInitialHandlersPosition();
        this.view.notifyChangedHandlerPosition = ():void => {
            this.getValueFromPosition();
        }
        this.view.notifyChangedInputValue = (newInputValue:number, num: number) => {
            this.setHandlersToInputValue (newInputValue, num);
        }

        this.view.notifyChangedWindow = () => {
            this.getPositionFromValue();
        }
    }

    checkOptions = (options:IOptions) => {
        this.options = options;
        this.options.minValue = Number(options.minValue);
        this.options.maxValue = Number(options.maxValue);
        this.options.startingValue = [Number(options.startingValue[0]), Number(options.startingValue[1])];
        this.options.step = Number(options.step);
        this.options.handlersAmount = Number(options.handlersAmount);

        if (this.options.minValue >= this.options.maxValue){
            console.log ('Slider: minValue should not be equal or be more than maxValue');
        }

        for (let i = 0; i <= this.options.startingValue.length; i++){
            if (this.options.startingValue[i] > this.options.maxValue){
                this.options.startingValue[i] = this.options.maxValue;
            }
            else if (this.options.startingValue[i] < this.options.minValue){
                this.options.startingValue[i] = this.options.minValue;
            }
        }
        if (this.options.handlersAmount < 1){
            this.options.handlersAmount = 1;
            console.log ('Slider: handlers amount should be equal either 1 or 2');
        }
        else if (this.options.handlersAmount > 2){
            this.options.handlersAmount = 2;
            console.log ('Slider: handlers amount should be equal either 1 or 2');
        }
        if (this.options.handlersAmount == 2 && this.options.startingValue.length < 2){
            this.options.startingValue = [this.options.minValue, this.options.maxValue];
            console.log('Slider: starting value should be defined for every handler');
        }

        if (this.options.step >= Math.abs(this.options.maxValue - this.options.minValue)) {
            console.log ('Slider: step value should  be  less than slider value range');
        }

        if (this.options.handlersAmount == 1 && this.options.range){
            this.options.range = false;
            console.log('Slider: range option cannot be applied to one handler')
        }

        if (this.options.scaleLegend && !this.options.scale){
            this.options.scaleLegend = false;
            console.log('Slider: scaleLegend option cannot be applied without scale option')
        }
        if (this.options.customValues){
            this.options.moveBySteps = true;
        }
    }
    
    setInitialHandlersPosition = ():void => {
        if (this.options.customValues) {
            for (let i = 0; i < this.view.handlers.length; i++){
                let _index:number = this.options.startingValue[i];
                let _pos:number = this.model.allValues[_index].percent;
                this.view.handlersPositionPerc[i] = _pos;
                if(this.options.vertical){
                    this.view.handlersPositionPerc[i] = 100 -_pos;
                    this.view.handlers[i].style.top = (100 - _pos) - this.view.handlerSizePerc + '%';
                }
                else {
                    this.view.handlersPositionPerc[i] = _pos;
                    this.view.handlers[i].style.left = _pos - this.view.handlerSizePerc + '%';
                }
            }
        }
        else {
            this.getPositionFromValue();
        }
        if (this.options.range) {
            this.model.getRangeValue();
            this.view.getSliderRangePosition();   
        }
        this.setInputIconsValues();
    }

    setHandlersToInputValue = (inputValue:number, num: number): void => {
        if (inputValue == undefined) {
            this.getValueFromPosition();
            return;
        }
        else if (inputValue > this.options.maxValue) {
            inputValue = this.options.maxValue;
        }
        else if (inputValue < this.options.minValue) {
            inputValue = this.options.minValue;
        }
        this.model.currentValue[num] = inputValue;
        this.getPositionFromValue();
    }

    getValueFromPosition =  ():void => {
        for (let i = 0; i < this.view.handlers.length; i++){
            let computedValue:number;
            if(this.options.vertical) {
                computedValue = (100 - this.view.handlersPositionPerc[i] ) / this.model.valuePercent;
            }
            else {
                computedValue = this.view.handlersPositionPerc[i]  / this.model.valuePercent;   
            }
            if (this.options.moveBySteps) {
                this.getNearestStepPos();
                if (this.options.range){
                    this.view.getSliderRangePosition();
                }
            }
            else {
                this.model.currentValue[i] = this.options.minValue + Math.round(computedValue);
            }
            if (this.options.icon) {
                this.view.icons[i].innerHTML = String(this.model.currentValue[i]);
                this.view.subViewIcons.getIconsShift();
            }
        
        }
        this.model.getRangeValue();
        this.setInputIconsValues();
    }
    
    getNearestStepPos = () => {
        for (let i = 0; i < this.view.handlers.length; i++){
            let pos:number;
            if (this.options.vertical) {
                pos = 100 - this.view.handlersPositionPerc[i];
            }
            else {
                pos = this.view.handlersPositionPerc[i];
            }
            let _ratio = this.model.stepPercent/2;
            let curStep = this.model.allValues.filter(step => Math.abs(pos - step.percent) <= _ratio);
            if (curStep.length > 1 && curStep.length <= 2){
                let delta1 = Math.abs(pos - curStep[0].percent);
                let delta2 = Math.abs(pos - curStep[1].percent);
                if(delta1 < delta2) {
                    curStep.splice(1,1);
                }
                else {
                    curStep.splice(0,1);
                }
            }
            if (this.options.vertical) {
                this.view.handlersPositionPerc[i] = 100 - curStep[0].percent;
            }
            else {
                this.view.handlersPositionPerc[i] = curStep[0].percent;
            }
            this.view.updatePosition();
            this.model.currentValue[i] = curStep[0].val;
        }
    }

    getNearestStepVal = () => {
        for (let i = 0; i < this.view.handlers.length; i++){
            let val:number = this.model.currentValue[i];
            let _ratio = this.options.step / 2;
            let curVal = this.model.allValues.filter(step => Math.abs(step.val - val) <= _ratio);
            if (curVal.length > 1 && curVal.length <= 2) {
                let delta1 = Math.abs(val - curVal[0].val);
                let delta2 = Math.abs(val - curVal[1].val);
                if(delta1 < delta2) {
                    curVal.splice(1,1);
                }
                else {
                    curVal.splice(0,1);
                }
            }
            if (this.options.vertical) {
                this.view.handlersPositionPerc[i] = 100 - curVal[0].percent;
            }
            else {
                this.view.handlersPositionPerc[i] = curVal[0].percent;
            }
            this.model.currentValue[i] = curVal[0].val;
        }
    }

    getPositionFromValue = ():void => {
        this.view.getMinMaxPosition();
        for (let i = 0; i < this.view.handlers.length; i++){
            let _value:number = this.model.currentValue[i] - this.options.minValue;
            let newPos:number;
            if (this.options.vertical){
                if (!this.options.moveBySteps){
                    newPos = (100 - (_value * this.model.valuePercent) - this.view.handlerSizePerc);
                    this.view.handlersPositionPerc[i] = newPos + this.view.handlerSizePerc;
                }
                else {
                    this.getNearestStepVal();
                    newPos = this.view.handlersPositionPerc[i] - this.view.handlerSizePerc; 
                } 
                this.view.handlers[i].style.top = newPos + '%';
            }
            else {
                if (!this.options.moveBySteps){
                    newPos = (_value * this.model.valuePercent) - this.view.handlerSizePerc;
                    this.view.handlersPositionPerc[i] = newPos + this.view.handlerSizePerc;
                }
                else {
                    this.getNearestStepVal();
                    newPos =  this.view.handlersPositionPerc[i] - this.view.handlerSizePerc; 
                }   
                this.view.handlers[i].style.left = newPos + '%';
            }
        }
        this.model.getRangeValue();
        this.setInputIconsValues();
    } 

    setInputIconsValues = () => {
        if (this.options.icon) {
            for (let i = 0; i < this.options.handlersAmount; i++){
                this.view.icons[i].innerHTML = String(this.model.currentValue[i]);
                this.view.subViewIcons.getIconsShift();
            }
        }
        if (this.options.rangeInput) {
            if (this.options.range){
                if (this.options.customValues){
                    this.view.rangeInput.value = `${this.model.currentValue[0]} - ${this.model.currentValue[1]}`; 
                }
                else {
                this.view.rangeInput.value = String(this.model.rangeValue); 
                } 
            }
            else {
                this.view.rangeInput.value = `${this.model.currentValue[0]}; ${this.model.currentValue[1]}`;
            }
        }
        if (this.options.valueInputs) {
            for (let i = 0; i < this.options.handlersAmount; i++){
                this.view.valueInputs[i].value = `${this.model.currentValue[i]}`;
            }
        } 
    }

}
  

