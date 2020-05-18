export  default class SubViewInput  {
    createInput (options, slider){
        if (options.input){
            const sliderInput = document.createElement('input');
            sliderInput.setAttribute('type', 'text')
            sliderInput.classList.add('slider__input');
            if (options.vertical) {
                sliderInput.classList.add('slider__input_vertical');
            } else{
                sliderInput.classList.add('slider__input_horisontal');
            }
            slider.append(sliderInput);
            let input = slider.querySelector('.slider__input');
            this.addInputListeners(input);
            return input;
        }
    }

    addInputListeners = (input) => {
        input.onclick = () => {
            input.value = '';
        }
        input.oninput = (e) => {
            let newInputValue = +input.value;
            this.newInputValue(newInputValue);
        }
    }
    newInputValue;
}
