import {IOptions} from './presenter';

export class Options {
    options:IOptions;

    constructor(options:IOptions){
        this.options = options;
        this.checkOptions(options);
    }

    checkOptions = (options:IOptions) => {
        this.options.minValue = Number(options.minValue);
        this.options.maxValue = Number(options.maxValue);
        this.options.startingValue = [Number(options.startingValue[0]), Number(options.startingValue[1])];
        this.options.step = Number(options.step);
        this.options.handlersAmount = Number(options.handlersAmount);

        if (this.options.minValue >= this.options.maxValue){
            console.log ('Slider: minValue should not be equal or be more than maxValue');
        }

        for (let i = 0; i <= this.options.startingValue.length; i++){
            if (this.options.startingValue[i] > this.options.maxValue){
                this.options.startingValue[i] = this.options.maxValue;
            }
            else if (this.options.startingValue[i] < this.options.minValue){
                this.options.startingValue[i] = this.options.minValue;
            }
        }
        if (this.options.handlersAmount < 1){
            this.options.handlersAmount = 1;
            console.log ('Slider: handlers amount should be equal either 1 or 2');
        }
        else if (this.options.handlersAmount > 2){
            this.options.handlersAmount = 2;
            console.log ('Slider: handlers amount should be equal either 1 or 2');
        }
        if (this.options.handlersAmount == 2 && this.options.startingValue.length < 2){
            this.options.startingValue = [this.options.minValue, this.options.maxValue];
            console.log('Slider: starting value should be defined for every handler');
        }

        if (this.options.step >= Math.abs(this.options.maxValue - this.options.minValue)) {
            console.log ('Slider: step value should  be  less than slider value range');
        }

        if (this.options.handlersAmount == 1 && this.options.range){
            this.options.range = false;
            console.log('Slider: range option cannot be applied to one handler')
        }

        if (this.options.scaleLegend && !this.options.scale){
            this.options.scaleLegend = false;
            console.log('Slider: scaleLegend option cannot be applied without scale option')
        }
        if (this.options.customValues){
            this.options.moveBySteps = true;
        }  
    }
}