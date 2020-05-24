import { IOptions } from "../presenter";

export default class SubViewScale  {
    createScale = (options:IOptions, slider:HTMLDivElement):NodeListOf<HTMLDivElement> => {
        let pointsAmount: number = Math.ceil((options.maxValue - options.minValue) / options.step) + 1;
        for (let i = 0; i < pointsAmount; i++){
            const scalePoint:HTMLDivElement = document.createElement('div');
            scalePoint.classList.add('slider__scale-point');
            if (options.vertical) {
                scalePoint.classList.add('slider__scale-point_vertical');
            } else{
                scalePoint.classList.add('slider__scale-point_horisontal');
            }
            slider.append(scalePoint);
        }
        let scalePoints:NodeListOf<HTMLDivElement> = slider.querySelectorAll('.slider__scale-point');
        // this.addScaleListener(scalePoints);
        return scalePoints;
    }

    addScaleListener = (scalePoints:NodeListOf<HTMLDivElement>):void => {
        scalePoints.forEach(point => {
            point.onclick = (e):void => {
                this.scalePpointClick(e);
            }
        });
        
    }

    scalePpointClick: any;
}