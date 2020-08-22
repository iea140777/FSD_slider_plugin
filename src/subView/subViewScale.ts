import { IOptions } from "../presenter";
import { IObj } from "../view";

export default class SubViewScale  {
    options: IOptions;
    values:IObj[];
    slider:HTMLDivElement;
    scalePoints:NodeListOf<HTMLDivElement>;
    scalePointsArray:HTMLDivElement[];
    scaleLegendArray: HTMLDivElement[];
    scaleLegend:NodeListOf<HTMLDivElement>;

    createScale = (options:IOptions, slider:HTMLDivElement, values:IObj[]):NodeListOf<HTMLDivElement> => {
        this.options = options;
        this.values = values;
        this.slider = slider;
        let pointsAmount: number = this.values.length;
        for (let i = 0; i < pointsAmount; i++){
            const scalePoint:HTMLDivElement = document.createElement('div');
            scalePoint.classList.add('slider__scale-point');
            if (this.options.vertical) {
                scalePoint.classList.add('slider__scale-point_vertical');
            } else{
                scalePoint.classList.add('slider__scale-point_horisontal');
            }
            slider.append(scalePoint);
        }
        this.scalePoints = slider.querySelectorAll('.slider__scale-point');
        this.scalePointsArray = Array.from(this.scalePoints);
        this.getScalePosition();
        if (this.options.scaleLegend){
            this.addScaleLegend();
            this.getScaleLegendValues();
        }
    }

    getScalePosition = (): void => {
        for(let i = 0; i < this.values.length; i++){
            if (this.options.vertical) {
                this.scalePointsArray[i].style.top = 100 - this.values[i].percent +'%';
            }
            else {
                this.scalePointsArray[i].style.left = this.values[i].percent +'%'; 
            }
        }
    }

    addScaleLegend = () => {
        this.scalePoints.forEach(
            scalePoint => {
                let legend: HTMLDivElement = document.createElement('div');
                legend.classList.add('slider__scale-legend');
                if (this.options.vertical){
                    legend.classList.add('slider__scale-legend_vertical');
                }
                else {
                    legend.classList.add('slider__scale-legend_horisontal');
                }
                scalePoint.append(legend);
            }
        )
        this.scaleLegend = this.slider.querySelectorAll('.slider__scale-legend');
        this.scaleLegendArray = Array.from(this.scaleLegend);
    }

    getScaleLegendValues = () => {
        for(let i = 0; i < this.values.length; i++){
            this.scaleLegendArray[i].innerText = String(this.values[i].val);
            if (this.options.vertical) {
                let shift = this.scaleLegendArray[i].getBoundingClientRect().height / 2;
                this.scaleLegendArray[i].style.top = -shift + 'px';
            }
            else {
                let shift = this.scaleLegendArray[i].getBoundingClientRect().width / 2;
                this.scaleLegendArray[i].style.left = -shift + 'px';
            }
        }

    }
}