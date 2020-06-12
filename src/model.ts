'use strict';
import{IOptions} from './presenter';
interface IObj {
    val: number|string,
    percent: number
}
export default class Model  {
    options: IOptions;
    stepsAmount: number;
    valueRange: number;
    allValues: Array<IObj>;
    positionValueRate: number;
    currentValue: Array<number|string>;
    customValuesList: Array<number|string>;
    customStepsAmount: number;
    rangeValue: number;
    stepPercent: number;
    valuePercent: number;
    customValueType: string;
    

    constructor (options:IOptions) {
        this.options = options;
        if (this.options.customValues){
            this.getCustomValues();
        }
        this.getValueRange (),
        this.getStepsAmount (),
        this.getStepPercent(),
        this.getValuePercent(),
        this.getAllValues(),
        this.getInitialCurrentValue(),
        this.getRangeValue();
    }

    getCustomValues = () => {
        if(this.options.customValuesList == ''){
              console.log('Slider: customValuesList should contain values');
              return;  
        }
        else {
            let list = this.options.customValuesList;
            let valArr:any[] = list.split(', ');
            if (valArr == '' || valArr == undefined) {
                this.customValueType = 'none';
            }
            for (let i = 0; i < valArr.length; i++){
                if (isNaN(Number(valArr[i]))) {
                    this.customValueType = 'string';
                    break;
                }
                else {
                    this.customValueType = 'number';
                }
            }
            if (this.customValueType == 'number'){
                for (let i = 0; i < valArr.length; i++){
                    valArr[i] = Number(valArr[i]);
                }
            }  
            this.customValuesList = valArr;
            this.customStepsAmount = valArr.length;     
            this.getCustomValuesOptions(valArr);
        }
    }

    getCustomValuesOptions = (arr:any[]) => {
        this.options.minValue = arr[0];
        this.options.maxValue = arr[arr.length-1];
        if(this.options.startingValue[0] > arr.length ||this.options.startingValue[1] > arr.length){
            this.options.startingValue = [0, (arr.length-1)];
        }
        this.notifyChangedOptions;
    }
  

    getInitialCurrentValue = ():void => {
        this.currentValue = [];
        for (let i = 0; i < this.options.handlersAmount; i++){
            if (this.options.customValues){
                let _index:number = this.options.startingValue[i];
                let _val:number|string = this.allValues[_index].val;
                this.currentValue[i] = _val;
            }
            else {
                this.currentValue[i] = this.options.startingValue[i]; 
            } 
        }
    }

    getValueRange = ():void => {
        this.valueRange = Math.abs(this.options.maxValue - this.options.minValue);
    }

    getStepsAmount = ():void => {
        if (this.options.customValues){
            this.stepsAmount = this.customStepsAmount;
        }
        else {
            this.stepsAmount = Math.ceil(this.valueRange / this.options.step);
        }
    }

    getStepPercent = ():void => {
        if (this.options.customValues){
            this.stepPercent = 100 / (this.stepsAmount - 1);
        }
        else {
            this.stepPercent =  (this.options.step / this.valueRange)*100;
        }
    }

    getValuePercent = ():void => {
        this.valuePercent = 100 / this.valueRange;
    }

    getRangeValue = ():void => {
        this.rangeValue = Math.abs(this.currentValue[1] - this.currentValue[0]);
    }

    getAllValues = ():void =>{
        this.allValues = [];
        if (this.options.customValues){
            this.getAllCustomValues();
        }
        else {
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
        }
    }

    getAllCustomValues = () => {
        for (let i = 0; i < this.stepsAmount; i++){
            let _value:IObj = {};
            _value.val = this.customValuesList[i];
            _value.percent = this.stepPercent * i;
            this.allValues.push(_value);
        }
    }

    notifyChangedOptions: any;
}