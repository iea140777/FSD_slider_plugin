import { IOptions } from "../presenter";

export default class SubViewSliderLine  {
    createSliderLine = (sliderContainer:HTMLDivElement, options:IOptions):HTMLDivElement => {
        const sliderLine:HTMLDivElement = document.createElement('div');
        sliderLine.classList.add('slider__slider');
        if (options.vertical) {
            sliderLine.classList.add('slider__slider_vertical');
        }
        sliderContainer.append(sliderLine);
        let slider:HTMLDivElement = sliderContainer.querySelector('.slider__slider');
        this.addSliderListener(slider);
        return slider;
    }

    addSliderListener = (slider:HTMLDivElement):void => {
        slider.onclick = (e):void => {
            this.sliderClick(e);
        }
    }

    sliderClick: any;
} 


