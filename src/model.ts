'use strict';
import{IOptions} from './presenter';

export default class Model  {
    minValue: number;
    maxValue: number;
    step: number;
    stepsAmount: number;
    range: boolean;
    handlersAmount: number;
    icon: boolean;
    input: boolean;
    valueRange: number;
    positionValueRate: number;
    currentValue: number[];
    rangeValue: number;

    constructor (options:IOptions) {
    this.minValue = options.minValue,
    this.maxValue = options.maxValue,
    this.step = options.step,
    this.range = options.range,
    this.handlersAmount = options.handlersAmount,
    this.icon = options.icon,
    this.valueRange = Math.abs(options.maxValue - options.minValue),
    this.stepsAmount = Math.floor(this.valueRange / this.step),
    this.positionValueRate,
    this.currentValue = [],
    this.getInitialCurrentValue(options),
    this.rangeValue = Math.abs(this.currentValue[1] - this.currentValue[0])
    }

    getInitialCurrentValue = (options:IOptions):void => {
        for (let i = 0; i < options.handlersAmount; i++){
            this.currentValue[i] = options.startingValue[i];
        }
    }

    getRangeValue = (options:IOptions):void => {
        if (options.range){
            this.rangeValue = Math.abs(this.currentValue[1] - this.currentValue[0]);
        }
    }
}