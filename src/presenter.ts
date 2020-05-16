import Model from './model';
import {View} from './view';

export class Presenter {
    constructor(Model, View, options, sliderContainer){
        this.model = new Model(options);
        this.view = new View (options, sliderContainer);
        this.handlersPosition = this.view.handlersPosition;
        this.model.positionValueRate = this.view.positionRange / this.model.valueRange;
        this.model.currentValue = this.getCurrentValue(this.model, this.view);
        console.log(this.view);
        console.log(this.model);
        
        this.view.notifyChangedHandlerPosition = (newHandlersPosition) =>{
            this.handlersPosition = newHandlersPosition;
            this.getCurrentValue(this.model, this.view);
        }

        this.view.notifyChangedInputValue = (newInputValue) =>{
            this.getCurrentPosition(this.model, this.view, newInputValue);
        }
    }
    
    getCurrentValue =  (model, view) => {
        for (let i = 0; i < view.handlers.length; i++){
            let computedValue = model.minValue + ((this.handlersPosition[i].x - view.minPosition) / model.positionValueRate);
            if (this.handlersPosition[i].x  === view.minPosition){model.currentValue[i] = model.minValue;}
            else if(this.handlersPosition[i].x === view.maxPosition){model.currentValue[i] = model.maxValue;}
            else {
                model.currentValue[i] = (Math.round(computedValue / model.step)) * model.step;
            }
            if (model.icon) {
                view.icons[i].innerHTML = model.currentValue[i];
            }

        }
        view.input.value = model.currentValue[0];  
        return model.currentValue;
    }
    
     getCurrentPosition = (model, view, newValue) => {
        if (newValue <= model.minValue){
            view.handlers[0].style.left = (0 - view.sliderBorder) + 'px';
            view.handlersPosition[0].x  = view.minPosition;
            model.currentValue[0] = model.minValue}
        else if(newValue >= model.maxValue){
            view.handlers[0].style.left = view.positionRange + 'px';
            view.handlersPosition[0].x  = view.maxPosition;
            model.currentValue[0] = model.maxValue}
        else {
            view.handlers[0].style.left = Math.abs((newValue - model.minValue) * model.positionValueRate) + 'px'; 
            view.handlersPosition[0].x = Math.abs((newValue - model.minValue) * model.positionValueRate +  view.minPosition);
            model.currentValue[0] = newValue;
        }
        if (model.icon) {
            view.icons[0].innerHTML = model.currentValue[0];
        }
    }   
    
    
}
    
    
