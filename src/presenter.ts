import Model from "./model";
import {View} from  "./view";
import { Options } from "./options";

export interface IOptions {
    minValue: number | string;
    maxValue: number | string;
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
        console.log(this.model);
        this.view = new View (this.options, container, this.model.allValues);

        this.setInitialHandlersPosition();
        this.view.notifyChangedHandlerPosition = ():void => {
            this.getValueFromPosition();
        }
        this.view.notifyChangedInputValue = (newInputValue:number, num: number) => {
            this.setHandlersToInputValue (newInputValue, num);
        }

        this.view.notifyChangedSliderData = () => {
            this.getPositionFromValue();
        }
    }
    
    private setInitialHandlersPosition = ():void => {
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

    private setHandlersToInputValue = (inputValue:number, num: number): void => {
        if (inputValue == undefined) {
            this.getValueFromPosition();
            return;
        }
        else if (typeof this.options.maxValue === 'number' && inputValue > this.options.maxValue ) {
            inputValue = this.options.maxValue;
        }
        else if (typeof this.options.minValue === 'number' && inputValue < this.options.minValue) {
            inputValue = this.options.minValue;
        }
        this.model.currentValue[num] = inputValue;
        this.getPositionFromValue();
    }

    private getValueFromPosition =  ():void => {
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
            else if (!this.options.moveBySteps && typeof this.options.minValue === 'number'){
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
    
    private getNearestStepPos = () => {
        for (let i = 0; i < this.view.handlers.length; i++){
            let pos:number;
            if (this.options.vertical) {
                pos = 100 - this.view.handlersPositionPerc[i];
            }
            else {
                pos = this.view.handlersPositionPerc[i];
            }
            let n:number;
            n = pos / this.model.stepPercent;
            if (n > (this.model.allValues.length - 2)){
                let _a1 = this.model.allValues.length-1,
                    _a2 = this.model.allValues.length-2;
                let _lastStepPerc = Math.abs(this.model.allValues[_a1].percent - this.model.allValues[_a2].percent);
                if (Math.abs(pos - this.model.allValues[_a1].percent) <= (_lastStepPerc / 2)) {
                    n = _a1;
                }
                else {
                    n = _a2;
                }
            }
            else {
                n = Math.round(pos / this.model.stepPercent);
            }
            if (this.options.vertical) {
                this.view.handlersPositionPerc[i] = 100 - this.model.allValues[n].percent;
            }
            else {
                this.view.handlersPositionPerc[i] = this.model.allValues[n].percent;
            }
            this.view.updatePosition();
            this.model.currentValue[i] = this.model.allValues[n].val;
        }
    }

    private getNearestStepVal = () => {
        for (let i = 0; i < this.view.handlers.length; i++){
            let _val:number|string;
            _val = this.model.currentValue[i];
            if (!this.options.customValues 
                && typeof this.options.minValue === 'number' 
                && typeof _val === 'number'
                )
                {
                let n:number;
                n = (_val - this.options.minValue) / this.options.step;

                if (n > (this.model.allValues.length - 2)){
                    let _a1 = this.model.allValues.length-1,
                        _a2 = this.model.allValues.length-2;
                    let _lastStepVal = Math.abs(this.model.allValues[_a1].val - this.model.allValues[_a2].val);
                    if (Math.abs(_val - this.model.allValues[_a1].val) <= (_lastStepVal / 2)) {
                        n = _a1;
                    }
                    else {
                        n = _a2;
                    }
                }
                else {                
                    n = Math.round((_val - this.options.minValue) / this.options.step);
                }            
                if (this.options.vertical) {
                    this.view.handlersPositionPerc[i] = 100 - this.model.allValues[n].percent;
                }
                else {
                    this.view.handlersPositionPerc[i] = this.model.allValues[n].percent;
                }
                this.model.currentValue[i] = this.model.allValues[n].val;
            }
        }
    }

    private getPositionFromValue = ():void => {
        this.view.getMinMaxPosition();
        if (typeof this.model.currentValue[1] === 'number' && typeof this.model.currentValue[0] === 'number' && typeof this.options.minValue === 'number') {
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
        }    
        if (this.options.range) {
            this.model.getRangeValue();
            this.view.getSliderRangePosition();   
        }
        this.setInputIconsValues();
    } 

    private setInputIconsValues = () => {
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
 