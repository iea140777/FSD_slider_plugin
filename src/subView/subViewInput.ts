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
        if (options.rangeInput && options.handlersAmount > 1){
            let rangeInput = document.createElement('input');
            rangeInput.setAttribute('type', 'text')
            rangeInput.classList.add('slider__input', 'slider__input_range');
            inputsContainer.append(rangeInput);
            let inputLabel = document.createElement('span');
            inputLabel.classList.add('slider__label');
            inputLabel.innerText = 'range';
            rangeInput.before(inputLabel);
            let input = inputsContainer.querySelector('.slider__input_range');
            return input;
        }
    }

    createValueInputs (options, inputsContainer){
        if(options.valueInputs){
            for (let i = 0; i < +options.handlersAmount; i++){
                let valueInput = document.createElement('input');
                valueInput.setAttribute('type', 'text')
                valueInput.classList.add('slider__input', 'slider__input_value');
                inputsContainer.append(valueInput);
                let inputLabel = document.createElement('span');
                inputLabel.classList.add('slider__label');
                inputLabel.innerText = `value ${i+1}`;
                valueInput.before(inputLabel);
            }
            let inputs = inputsContainer.querySelectorAll('.slider__input_value');
            // console.log(inputs[0]);
            this.addInputsListener(inputs);
            return inputs;
        }
    }

    addInputsListener = (inputs) => {
        inputs.forEach (
            input => {
                input.onclick = (e) => {
                input.value = '';
                input.addEventListener('keydown',  (e) => {
                    if (e.code == 'Enter'){
                        let newInputValue = Number(input.value);
                        if (e.target == inputs[0]){
                            this.newInputValue(newInputValue, 0);
                        }
                        else{
                            this.newInputValue(newInputValue, 1);
                        }
                    }                
                })
            }}
        )

        
    }
    newInputValue;
}
