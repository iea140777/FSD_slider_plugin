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

    private addSliderListener = (slider:HTMLDivElement):void => {
        slider.onclick = (e):void => {
            e.preventDefault();
            this.sliderClick(e);
        }
        slider.ondblclick = (e):void => {
            e.preventDefault();
        }
    }

    sliderClick: any; //listened by View (l.67), view.moveByClick(l.333)  is assigned
} 


