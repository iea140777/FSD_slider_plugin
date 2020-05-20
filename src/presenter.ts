import Model from './model';
import {View} from './view';

export class Presenter {
    constructor(Model, View, options, container){
        this.options = options;
        this.model = new Model(options);
        this.view = new View (options, container);
         
        this.model.positionValueRate = this.view.positionRange / this.model.valueRange;
        // this.setInitialHandlersPosition();
        this.getPositionFromValue();
        this.handlersPosition = this.view.handlersPosition;
        console.log(this.view);
        console.log(this.model);  
            
        this.view.notifyChangedHandlerPosition = (newHandlersPosition) => {
            this.handlersPosition = newHandlersPosition;
            this.getValueFromPosition(this.model, this.view);
        }
        this.view.notifyChangedInputValue = (newInputValue) => {
            this.model.currentValue[0] = newInputValue;
            this.getPositionFromValue();
        }

    }
    
    setInitialHandlersPosition = () => {
        for (let i = 0; i < this.view.handlers.length; i++){
            this.model.currentValue[i] = this.options.startingValue[i];
            console.log(this.model.currentValue);
        }
        this.getPositionFromValue(); 
        if (this.options.range){
            this.view.getSliderRangePosition(this.options, this.view.range);
        }
        
    }

    getValueFromPosition =  (model, view) => {
        for (let i = 0; i < view.handlers.length; i++){
            let computedValue;
            if(this.options.vertical) {
                computedValue = model.minValue + ((view.minPosition - this.handlersPosition[i]) / model.positionValueRate);
            }
            else {
                computedValue = model.minValue + ((this.handlersPosition[i] - view.minPosition) / model.positionValueRate);
            }
            if (this.handlersPosition[i]  === view.minPosition){model.currentValue[i] = model.minValue;}
            else if(this.handlersPosition[i] === view.maxPosition){model.currentValue[i] = model.maxValue;}
            else {
                model.currentValue[i] = (Math.round(computedValue / model.step)) * model.step;
            }
            if (model.icon) {
                view.icons[i].innerHTML = model.currentValue[i];
            }
        }
        this.model.getRangeValue(this.options);
        if (this.options.rangeInput){
            this.view.rangeInput.value = model.rangeValue;  
        } 

        if (this.options.valueInputs) {
            view.valueInputs[0].value = `${model.currentValue[0]}`;
            view.valueInputs[1].value = `${model.currentValue[1]}`;  
        } 
        return model.currentValue;
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
                this.view.icons[i].innerHTML = this.model.currentValue[i];
            }
        }
        if(this.options.rangeInput){
            this.view.rangeInput.value =  this.model.rangeValue;  
        }

        if (this.options.valueInputs) {
            this.view.valueInputs[0].value = `${this.model.currentValue[0]}`; 
            this.view.valueInputs[1].value = `${this.model.currentValue[1]}`;
        } 
    }   
}
    
    
