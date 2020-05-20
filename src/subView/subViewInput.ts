export  default class SubViewInput  {
    // createInputs(options, slider, sliderContainer){
    //     this.inputsContainer = this.createInputsContainer(options, slider, sliderContainer);
    //     this.rangeInput = this.createRangeInput(options, this.inputsContainer);
    //     this.valueInputs = this.createValueInputs(options, this.inputsContainer);

    // }

    createInputsContainer(options, slider, sliderContainer){
        let _container = document.createElement('div');
        _container.classList.add('slider__inputsContainer');
        slider.before(_container);
        let inputsContainer = sliderContainer.querySelector('.slider__inputsContainer');
        return inputsContainer;
    }

    createRangeInput (options, inputsContainer){
        if (options.rangeInput){
            let rangeInput = document.createElement('input');
            rangeInput.setAttribute('type', 'text')
            rangeInput.classList.add('slider__input', 'slider__input_range');
            inputsContainer.append(rangeInput);
            let input = inputsContainer.querySelector('.slider__input_range');
            // this.addInputListeners(input);
            return input;
        }
    }

    createValueInputs (options, inputsContainer){
        let valueInputs = [],
        for (let i = 0; i < +options.handlersAmount; i++){
            let valueInput = document.createElement('input');
            valueInput.setAttribute('type', 'text')
            valueInput.classList.add('slider__input', 'slider__input_value');
            inputsContainer.append(valueInput);
            
        }
        let input = inputsContainer.querySelectorAll('.slider__input_value');
        return input;
        // valueInputs.forEach(input, this.addInputListeners();
        // return valueInputs;
    }



    // addInputListeners = (input) => {
    //     input.onclick = () => {
    //         input.value = '';
    //     }
    //     input.oninput = (e) => {
    //         let newInputValue = +input.value;
    //         this.newInputValue(newInputValue);
    //     }
    // }
    // newInputValue;
}
