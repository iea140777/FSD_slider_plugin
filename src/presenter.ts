import Model from "./model";
import {View} from  "./view";
import { Options } from "./options";

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
        this.options = new Options(options).options;
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
        if (this.options.range) {
            this.model.getRangeValue();
            this.view.getSliderRangePosition();   
        }
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
            let _val:number = this.model.currentValue[i];
            let _ratio = this.options.step / 2;
            let curVal = this.model.allValues.filter(step => Math.abs(step.val - _val) <= _ratio);
            // console.log(curVal);
            if (curVal.length > 1 && curVal.length <= 2) {
                let delta1 = Math.abs(_val - curVal[0].val);
                let delta2 = Math.abs(_val - curVal[1].val);
                
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
        if (this.options.range) {
            this.model.getRangeValue();
            this.view.getSliderRangePosition();   
        }
        this.setInputIconsValues();
    } 

    setInputIconsValues = () => {
        if (this.options.icon) {
            for (let i = 0; i < this.options.handlersAmount; i++){
                this.view.icons[i].innerHTML = String(this.model.currentValue[i]);
            }
            this.view.subViewIcons.getIconsShift();
            // console.log('icons pos');
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
                if(this.options.handlersAmount == 2){
                    this.view.rangeInput.value = `${this.model.currentValue[0]}; ${this.model.currentValue[1]}`;
                }
            }
        }
        if (this.options.valueInputs) {
            for (let i = 0; i < this.options.handlersAmount; i++){
                this.view.valueInputs[i].value = `${this.model.currentValue[i]}`;
            }
        } 
    }

}
  

