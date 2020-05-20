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
    this.rangeValue;
    }
    
}