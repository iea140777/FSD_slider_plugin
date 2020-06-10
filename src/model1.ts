'use strict';
import{IOptions} from './presenter';
interface IObj {
    val: number,
    percent: number
}
export default class Model  {
    options: IOptions;
    stepsAmount: number;
    valueRange: number;
    allValues: Array<IObj>;
    positionValueRate: number;
    currentValue: number[];
    rangeValue: number;
    stepPercent: number;
    valuePercent: number;
    
    

    constructor (options:IOptions) {
    this.options = options,
    this.getValueRange (),
    this.getStepsAmount (),
    this.getStepPercent(),
    this.getValuePercent(),
    this.getAllValues(),
    this.getInitialCurrentValue(),
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

    getAllValues = ():void =>{
        this.allValues = [];
        for (let i = 0; i <= this.stepsAmount; i++){
            let _value:IObj = {};
            _value.val = this.options.minValue + this.options.step * i;
            _value.percent = this.stepPercent * i;
            if (_value.percent >= 100){
                _value.percent = 100;
                _value.val = this.options.maxValue;
            }
            this.allValues.push(_value);
        }
        console.log(this.allValues);
    }
}