import Model from './model';
import {View} from './view';

export class Presenter {
    constructor(Model, View, options, sliderContainer){
        this.options = options;
        this.model = new Model(options);
        this.view = new View (options, sliderContainer);
        this.handlersPosition = this.view.handlersPosition;
        this.model.positionValueRate = this.view.positionRange / this.model.valueRange;
        this.model.currentValue = this.getCurrentValue(this.model, this.view);
        console.log(this.view);
        console.log(this.model);
        
        this.view.notifyChangedHandlerPosition = (newHandlersPosition) => {
            this.handlersPosition = newHandlersPosition;
            this.getCurrentValue(this.model, this.view);
        }

        this.view.notifyChangedInputValue = (newInputValue) =>{
            this.getCurrentPosition(this.model, this.view, newInputValue);
        }
    }
    
    getCurrentValue =  (model, view) => {
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
        view.input.value = `${model.currentValue[0]}, ${model.currentValue[1]}`;  
        return model.currentValue;
    }
    
     getCurrentPosition = (model, view, newValue) => {
        if (newValue <= model.minValue){
            if (this.options.vertical){
                view.handlers[0].style.top = view.positionRange +  'px';
                view.handlersPosition[0]  = view.minPosition;
                model.currentValue[0] = model.minValue
            } 
            else {
                view.handlers[0].style.left = (0 - view.sliderBorder) + 'px';
                view.handlersPosition[0]  = view.minPosition;
                model.currentValue[0] = model.minValue
            }
        }
        else if (newValue >= model.maxValue){
            if (this.options.vertical){
                view.handlers[0].style.top = (0 - view.sliderBorder) + 'px';
                view.handlersPosition[0]  = view.maxPosition;
                model.currentValue[0] = model.maxValue
            } 
            else {
                view.handlers[0].style.left = view.positionRange + 'px';
                view.handlersPosition[0]  = view.maxPosition;
                model.currentValue[0] = model.maxValue
            }
        }
        else {
            if (this.options.vertical){
                view.handlers[0].style.top = Math.abs((newValue - model.maxValue) * model.positionValueRate) + 'px'; 
                view.handlersPosition[0] = view.handlers[0].getBoundingClientRect().y + pageYOffset;
                model.currentValue[0] = newValue;
            }
            else {
                view.handlers[0].style.left = Math.abs((newValue - model.minValue) * model.positionValueRate) + 'px'; 
                view.handlersPosition[0] = view.handlers[0].getBoundingClientRect().x + pageXOffset;
                model.currentValue[0] = newValue;
            }
        }
        if (model.icon) {
            view.icons[0].innerHTML = model.currentValue[0];
        }
    }   
}
    
    
