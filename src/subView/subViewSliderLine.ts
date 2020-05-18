export default class SubViewSliderLine  {
    createSliderLine(sliderContainer, options){
        const sliderLine = document.createElement('div');
        sliderLine.classList.add('slider__slider');
        if (options.vertical) {
            sliderLine.classList.add('slider__slider_vertical');
        }
        sliderContainer.append(sliderLine);
        let slider = sliderContainer.querySelector('.slider__slider');
        return slider;
    }
} 