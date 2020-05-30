import { IOptions } from "../presenter";

export  default class SubViewInput  {
    
    createInputsContainer(options:IOptions, slider:HTMLDivElement, sliderContainer:HTMLDivElement):HTMLDivElement {
        let _container:HTMLDivElement = document.createElement('div');
        _container.classList.add('slider__inputsContainer');
        slider.before(_container);
        let inputsContainer:HTMLDivElement = sliderContainer.querySelector('.slider__inputsContainer');
        return inputsContainer;
    }

    createRangeInput (options:IOptions, inputsContainer:HTMLDivElement): HTMLInputElement {
        let inputLabel:HTMLElement = document.createElement('span');
        inputLabel.classList.add('slider__inputLabel');
        inputLabel.innerText = 'range';
        inputsContainer.append(inputLabel);
        let rangeInput:HTMLInputElement = document.createElement('input');
        rangeInput.setAttribute('type', 'text')
        rangeInput.classList.add('slider__input', 'slider__input_range');
        inputLabel.append(rangeInput);
        
        let input:HTMLInputElement = inputsContainer.querySelector('.slider__input_range');
        return input;
    }

    createValueInputs (options:IOptions, inputsContainer:HTMLDivElement):NodeListOf<HTMLInputElement>{
        for (let i = 0; i < +options.handlersAmount; i++){
            let inputLabel:HTMLElement = document.createElement('span');
            inputLabel.classList.add('slider__inputLabel');
            inputLabel.innerText = `value ${i+1}`;
            inputsContainer.append(inputLabel);
            let valueInput:HTMLInputElement = document.createElement('input');
            valueInput.setAttribute('type', 'text')
            valueInput.classList.add('slider__input', 'slider__input_value');
            inputLabel.append(valueInput);
            
        }
        let inputs:NodeListOf<HTMLInputElement> = inputsContainer.querySelectorAll('.slider__input_value');
        this.addInputsListener(inputs);
        return inputs;
    }

    addInputsListener = (inputs:NodeListOf<HTMLInputElement>):void => {
        inputs.forEach (
            input => {
                input.onfocus = () => {
                    input.value = '';
                    input.addEventListener('blur',  (e) => {
                        this.getInputValue(input, inputs, e);
                    })
                    input.addEventListener('keydown',  (e) => {
                        if (e.code == 'Enter') {
                            this.getInputValue(input, inputs, e);
                        }
                    })                       
                }
            }
        )      
    }

    getInputValue = (input: HTMLInputElement, inputs:NodeListOf<HTMLInputElement>, e: FocusEvent | KeyboardEvent): void => {
        let newInputValue: number = Number(input.value);
            if (input.value == '' || isNaN(Number(input.value))) {
                newInputValue = undefined;
            }
            if (e.target == inputs[0]){
                this.newInputValue(newInputValue, 0);
            }
            else{
                this.newInputValue(newInputValue, 1);
            }
    }
    newInputValue:any;
}
