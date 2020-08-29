'use strict';
import{IOptions} from './presenter';
interface IObj {
    val: any,
    percent: number
}
export default class Model  {
    options: IOptions;
    stepsAmount: number;
    valueRange: number;
    allValues: Array<IObj>;
    currentValue: Array<number|string>;
    customValuesList: Array<string>;
    customStepsAmount: number;
    rangeValue: number;
    stepPercent: number;
    valuePercent: number;
    

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

    private getCustomValues = () => {
        if(this.options.customValuesList == ''){
              console.log('Slider: customValuesList should contain values');
              return;  
        }
        else {
            let list = this.options.customValuesList;
            let _valArr:  string[] = list.split(', ');
            this.customValuesList = _valArr;
            this.customStepsAmount = _valArr.length;     
            this.getCustomValuesOptions(_valArr);
        }
    }

    private getCustomValuesOptions = (arr:string[]) => {
        this.options.minValue = arr[0];
        this.options.maxValue = arr[arr.length-1];
        if(this.options.startingValue[0] > arr.length ||this.options.startingValue[1] > arr.length){
            this.options.startingValue = [0, (arr.length-1)];
        }
        this.notifyChangedOptions; 
    }
  

    private getInitialCurrentValue = ():void => {
        this.currentValue = [];
        for (let i = 0; i < this.options.handlersAmount; i++){
            if (this.options.customValues){
                if (this.allValues.length == 0) {
                    return;
                }
                else {
                    let _index:number = this.options.startingValue[i];
                    let _val:string|number = this.allValues[_index].val;
                    this.currentValue[i] = _val;
                }
            }
            else {
                this.currentValue[i] = this.options.startingValue[i]; 
            } 
        }
    }

    private getValueRange = ():void => {
        if (typeof this.options.maxValue === 'number' && typeof this.options.minValue === 'number'){
            this.valueRange = Math.abs(this.options.maxValue - this.options.minValue);
        }
        else {return};

    }

    private getStepsAmount = ():void => {
        if (this.options.customValues){
            this.stepsAmount = this.customStepsAmount;
        }
        else {
            this.stepsAmount = Math.ceil(this.valueRange / this.options.step);
        }
    }

    private getStepPercent = ():void => {
        if (this.options.customValues){
            this.stepPercent = 100 / (this.stepsAmount - 1);
        }
        else {
            this.stepPercent =  (this.options.step / this.valueRange)*100;
        }
    }

    private getValuePercent = ():void => {
        this.valuePercent = 100 / this.valueRange;
    }

    getRangeValue = ():void => {
        if (typeof this.currentValue[1] === 'number' && typeof this.currentValue[0] === 'number'){
            this.rangeValue = Math.abs(this.currentValue[1] - this.currentValue[0]);
        }
        else {return}
    }

    private getAllValues = ():void => {
        this.allValues = [];
        if (this.options.customValues){
            this.getAllCustomValues();
        }
        else {
            for (let i = 0; i <= this.stepsAmount; i++){
                let _value:IObj = {
                    val: 0,
                    percent: 0
                };
                if (typeof this.options.minValue === 'number' ){
                    _value.val = this.options.minValue + this.options.step * i; 
                }
                _value.percent = this.stepPercent * i;
                if (_value.percent >= 100){
                    _value.percent = 100;
                    _value.val = this.options.maxValue;
                }
                this.allValues.push(_value);
            }
        }
        // console.log(this.allValues);
    }

    private getAllCustomValues = () => {
        for (let i = 0; i < this.stepsAmount; i++){
            let _value:IObj = {
                val: 0,
                percent: 0
            };
            _value.val = this.customValuesList[i];
            _value.percent = this.stepPercent * i;
            this.allValues.push(_value);
        }
    }

    notifyChangedOptions: any; //listened by Presenter (l.32), new options object is created
}