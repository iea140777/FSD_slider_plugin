'use strict';

export default class Model {
    
    constructor (options) {
    this.minValue = options.minValue,
    this.maxValue = options.maxValue,
    this.step = options.step,
    this.range = options.range,
    this.handlersAmount = options.handlersAmount,
    this.icon = options.icon,
    this.input = options.input,
    this.valueRange = Math.abs(this.maxValue - this.minValue),
    this.positionValueRate,
    this.currentValue = [],
    this.getInitialCurrentValue(options),
    this.rangeValue = Math.abs(this.currentValue[1] - this.currentValue[0]);
    // this.getRangeValue(options);
    }

    getInitialCurrentValue = (options) => {
        for (let i = 0; i < options.handlersAmount; i++){
            this.currentValue[i] = options.startingValue[i];
        }
    }

    getRangeValue = (options) => {
        if (options.range){
            this.rangeValue = Math.abs(this.currentValue[1] - this.currentValue[0]);
        }
        
    }
}