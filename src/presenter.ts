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
        return model.currentValue;
    }   
}
    


