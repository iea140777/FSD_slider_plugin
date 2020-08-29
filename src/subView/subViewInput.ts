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
        inputLabel.innerText = 'Range';
        inputsContainer.append(inputLabel);
        let rangeInput:HTMLInputElement = document.createElement('input');
        rangeInput.setAttribute('type', 'text');
        rangeInput.setAttribute ('readonly', 'true');
        rangeInput.setAttribute ('size', 'auto');
        rangeInput.classList.add('slider__input', 'slider__input_range');
        inputLabel.append(rangeInput);
        
        let input:HTMLInputElement = inputsContainer.querySelector('.slider__input_range');
        return input;
    }

    createValueInputs (options:IOptions, inputsContainer:HTMLDivElement):NodeListOf<HTMLInputElement>{
        for (let i = 0; i < +options.handlersAmount; i++){
            let inputLabel:HTMLElement = document.createElement('span');
            inputLabel.classList.add('slider__inputLabel');
            inputLabel.innerText = `Value ${i+1}`;
            inputsContainer.append(inputLabel);
            let valueInput:HTMLInputElement = document.createElement('input');
            valueInput.setAttribute('type', 'text');
            valueInput.setAttribute ('size', 'auto');
            valueInput.classList.add('slider__input', 'slider__input_value');
            inputLabel.append(valueInput);
            
        }
        let inputs:NodeListOf<HTMLInputElement> = inputsContainer.querySelectorAll('.slider__input_value');
        this.addInputsListener(inputs);
        return inputs;
    }

    private addInputsListener = (inputs:NodeListOf<HTMLInputElement>):void => {
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

    private getInputValue = (input: HTMLInputElement, inputs:NodeListOf<HTMLInputElement>, e: FocusEvent | KeyboardEvent): void => {
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
    newInputValue:any; //listened by View(View l.64), view.notifyChangedInputValue (View l.331) is assigned
}
