import Model from "./model";
import {View} from  "./view";

export interface IOptions{
    minValue: number;
    maxValue: number;
    startingValue: [number, number];
    vertical:boolean;
    step: number;
    moveBySteps: boolean;
    range: boolean;
    rangeInput: boolean;
    valueInputs: boolean;
    handlersAmount: number;
    scale: boolean;
    icon: boolean;
    input: boolean;
}

export class Presenter {
    options:IOptions;
    model: Model;
    view: View;

    constructor(options:IOptions, container:HTMLDivElement){
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
            this.setHandlersToInputValue (newInputValue, num);
        }
    }

    checkOptions = (options:IOptions) => {
        if (options.minValue >= options.maxValue){
            console.log ('minValue should not be equal or be more than maxValue');
        }
        if (options.startingValue){}

            // minValue: 0,
            // maxValue: 100,
            // startingValue: [20, 60],
            // vertical:false,
            // step: 5,
            // range: true,
            // rangeInput: true,
            // valueInputs: true,
            // handlersAmount: 2,
            // icon: true,
            // input: true
    }
    
    setInitialHandlersPosition = ():void => {
        this.getPositionFromValue();
        this.model.getRangeValue(this.options); 
    }

    setHandlersToInputValue = (inputValue:number, num: number): void => {
        if (inputValue == undefined) {
            this.getValueFromPosition();
            return;
        }
        else if (inputValue > this.model.maxValue) {
            inputValue = this.model.maxValue;
        }
        else if (inputValue < this.model.minValue) {
            inputValue = this.model.minValue;
        }
        if (this.options.moveBySteps) {
            let _steps: number = Math.round((inputValue - this.model.minValue) / this.options.step);
            inputValue = _steps * this.options.step + this.model.minValue;
        }
        this.model.currentValue[num] = inputValue;
        this.getPositionFromValue();
    }

    getValueFromPosition =  ():number[] => {
        for (let i = 0; i < this.view.handlers.length; i++){
            let computedValue:number;
            if(this.options.vertical) {
                computedValue = ((this.view.minPosition - this.view.handlersPosition[i]) / this.model.positionValueRate);
            }
            else {
                computedValue = ((this.view.handlersPosition[i] - this.view.minPosition) / this.model.positionValueRate);
                
            }
            let computedStepValue: number = (Math.round(computedValue / this.model.step)) * this.model.step;
            if (computedValue > (this.options.step * this.model.stepsAmount)) {
                this.model.currentValue[i] = this.model.maxValue;
            }
            else {
                this.model.currentValue[i] = this.model.minValue + computedStepValue;
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
        if (this.options.moveBySteps) {
            this.getPositionFromValue();
        }
        return this.model.currentValue;
    }
    
     getPositionFromValue = ():void => {
        for (let i = 0; i < this.view.handlers.length; i++){
            if (this.options)
                if (this.options.vertical){
                    this.view.handlers[i].style.top = Math.abs((this.model.currentValue[i] - this.model.maxValue) * this.model.positionValueRate) - this.view.handlersHeight/2 + 'px'; 
                    this.view.handlersPosition[i] = this.view.handlers[i].getBoundingClientRect().y + pageYOffset;
                }
                else {
                    this.view.handlers[i].style.left = Math.abs((this.model.currentValue[i] - this.model.minValue) * this.model.positionValueRate) - this.view.handlersWidth/2 + 'px'; 
                    this.view.handlersPosition[i] = this.view.handlers[i].getBoundingClientRect().x + pageXOffset;
                }
            if (this.model.icon) {
                this.view.icons[i].innerHTML = String(this.model.currentValue[i]);
            }
        }
        this.model.getRangeValue(this.options);
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
    
    
