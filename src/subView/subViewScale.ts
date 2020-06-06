import { IOptions } from "../presenter";

export default class SubViewScale  {
    options: IOptions;
    createScale = (options:IOptions, slider:HTMLDivElement):NodeListOf<HTMLDivElement> => {
        this.options = options;
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
        // if (options.scaleLegend){
        //     this.addScaleLegend(scalePoints, slider);
        // }
        return scalePoints;
    }

    addScaleLegend = (scalePoints:NodeListOf<HTMLDivElement>, slider:HTMLDivElement) => {
        scalePoints.forEach(
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
        let scaleLegend: NodeListOf<HTMLDivElement> = slider.querySelectorAll('.slider__scale-legend');
        return scaleLegend;
    }



    // addScaleListener = (scalePoints:NodeListOf<HTMLDivElement>):void => {
    //     scalePoints.forEach(point => {
    //         point.onclick = (e):void => {
    //             this.scalePpointClick(e);
    //         }
    //     });
        
    // }

    // scalePpointClick: any;
}