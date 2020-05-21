import Model from "./model";
import {View} from  "./view";

export interface IOptions{
    minValue: number;
    maxValue: number;
    startingValue: [number, number];
    vertical:boolean;
    step: number;
    range: boolean;
    rangeInput: boolean;
    valueInputs: boolean;
    handlersAmount: number;
    icon: boolean;
    input: boolean;
}

export class Presenter {
    options:IOptions;
    model: Model;
    view: View;

    constructor(Model, View, options:IOptions, container:HTMLElement){
        this.options = options;
        this.model = new Model(this.options);
        this.view = new View (this.options, container);
        this.model.positionValueRate = this.view.positionRange / this.model.valueRange;
        this.setInitialHandlersPosition();
        console.log(this.view);
        console.log(this.model);  
        this.view.notifyChangedHandlerPosition = ():void => {
            this.getValueFromPosition();
        }
        this.view.notifyChangedInputValue = (newInputValue:number, num: number) => {
            this.model.currentValue[num] = newInputValue;
            this.getPositionFromValue();
        }
    }
    
    setInitialHandlersPosition = ():void => {
        this.getPositionFromValue();
        this.model.getRangeValue(this.options); 
    }

    getValueFromPosition =  ():number[] => {
        for (let i = 0; i < this.view.handlers.length; i++){
            let computedValue:number;
            if(this.options.vertical) {
                computedValue = this.model.minValue + ((this.view.minPosition - this.view.handlersPosition[i]) / this.model.positionValueRate);
            }
            else {
                computedValue = this.model.minValue + ((this.view.handlersPosition[i] - this.view.minPosition) / this.model.positionValueRate);
            }
            if (this.view.handlersPosition[i]  === this.view.minPosition){this.model.currentValue[i] = this.model.minValue;}
            else if(this.view.handlersPosition[i] === this.view.maxPosition){this.model.currentValue[i] = this.model.maxValue;}
            else {
                this.model.currentValue[i] = (Math.round(computedValue / this.model.step)) * this.model.step;
            }
            if (this.options.icon) {
                this.view.icons[i].innerHTML = String(this.model.currentValue[i]);
            }
        }
        this.model.getRangeValue(this.options);
        if (this.options.rangeInput && this.options.range && this.options.handlersAmount > 1){
            this.view.rangeInput.value = String(this.model.rangeValue);  
        }

        if (this.options.rangeInput && !this.options.range && this.options.handlersAmount > 1){
            this.view.rangeInput.value = `${this.model.currentValue[0]}; ${this.model.currentValue[1]}`;  
        } 

        if (this.options.valueInputs) {
            for (let i = 0; i < this.options.handlersAmount; i++){
                this.view.valueInputs[i].value = `${this.model.currentValue[i]}`;
            }
        } 
        return this.model.currentValue;
    }
    
     getPositionFromValue = () => {
        for (let i = 0; i < this.view.handlers.length; i++){
            if (this.model.currentValue[i] <= this.model.minValue){
                if (this.options.vertical){
                    this.view.handlers[i].style.top = this.view.positionRange +  'px';
                    this.view.handlersPosition[i]  = this.view.minPosition;
                    this.model.currentValue[i] = this.model.minValue;
                } 
                else {
                    this.view.handlers[i].style.left = (0 - this.view.sliderBorder) + 'px';
                    this.view.handlersPosition[i]  = this.view.minPosition;
                    this.model.currentValue[i] = this.model.minValue
                }
            }
            else if (this.model.currentValue[i] >= this.model.maxValue){
                if (this.options.vertical){
                    this.view.handlers[i].style.top = (0 - this.view.sliderBorder) + 'px';
                    this.view.handlersPosition[i]  = this.view.maxPosition;
                    this.model.currentValue[i] = this.model.maxValue
                } 
                else {
                    this.view.handlers[i].style.left = this.view.positionRange + 'px';
                    this.view.handlersPosition[i]  = this.view.maxPosition;
                    this.model.currentValue[i] = this.model.maxValue
                }
            }
            else {
                if (this.options.vertical){
                    this.view.handlers[i].style.top = Math.abs((this.model.currentValue[i] - this.model.maxValue) * this.model.positionValueRate) + 'px'; 
                    this.view.handlersPosition[i] = this.view.handlers[i].getBoundingClientRect().y + pageYOffset;
                }
                else {
                    this.view.handlers[i].style.left = Math.abs((this.model.currentValue[i] - this.model.minValue) * this.model.positionValueRate) + 'px'; 
                    this.view.handlersPosition[i] = this.view.handlers[i].getBoundingClientRect().x + pageXOffset;
                }
            }
            if (this.model.icon) {
                this.view.icons[i].innerHTML = String(this.model.currentValue[i]);
            }
        }

        if (this.options.rangeInput && this.options.range && this.options.handlersAmount > 1){
            this.view.showRange(this.options);
            this.view.rangeInput.value = String(this.model.rangeValue);  
        }

        if (this.options.rangeInput && !this.options.range && this.options.handlersAmount > 1){
            this.view.rangeInput.value = `${this.model.currentValue[0]}; ${this.model.currentValue[1]}`;  
        } 
                
        if (this.options.valueInputs) {
            for (let i = 0; i < this.options.handlersAmount; i++){
                this.view.valueInputs[i].value = `${this.model.currentValue[i]}`; 
            }
        } 
    }   
}
    
    
