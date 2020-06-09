'use strict';
import{IOptions} from './presenter';

export default class Model  {
    options: IOptions;
    stepsAmount: number;
    valueRange: number;
    positionValueRate: number;
    currentValue: number[];
    rangeValue: number;
    stepPercent: number;
    valuePercent: number;

    constructor (options:IOptions) {
    this.options = options,
    this.getInitialCurrentValue(),
    this.getValueRange (),
    this.getStepsAmount (),
    this.getStepPercent(),
    this.getValuePercent(),
    this.getRangeValue()
    }

    getInitialCurrentValue = ():void => {
        this.currentValue = [];
        for (let i = 0; i < this.options.handlersAmount; i++){
            this.currentValue[i] = this.options.startingValue[i];
        }
    }

    getValueRange = ():void => {
        this.valueRange = Math.abs(this.options.maxValue - this.options.minValue);
    }

    getStepsAmount = ():void => {
        this.stepsAmount = Math.ceil(this.valueRange / this.options.step);
    }

    getStepPercent = ():void => {
        this.stepPercent =  (this.options.step / this.valueRange)*100;
    }

    getValuePercent = ():void => {
        this.valuePercent = 100 / this.valueRange;
    }

    getRangeValue = ():void => {
        this.rangeValue = Math.abs(this.currentValue[1] - this.currentValue[0]);
    }
}