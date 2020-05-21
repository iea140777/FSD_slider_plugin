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
        let rangeInput:HTMLInputElement = document.createElement('input');
        rangeInput.setAttribute('type', 'text')
        rangeInput.classList.add('slider__input', 'slider__input_range');
        inputsContainer.append(rangeInput);
        let inputLabel:HTMLElement = document.createElement('span');
        inputLabel.classList.add('slider__label');
        inputLabel.innerText = 'range';
        rangeInput.before(inputLabel);
        let input:HTMLInputElement = inputsContainer.querySelector('.slider__input_range');
        return input;
    }

    createValueInputs (options:IOptions, inputsContainer:HTMLDivElement):NodeListOf<HTMLInputElement>{
        if(options.valueInputs){
            for (let i = 0; i < +options.handlersAmount; i++){
                let valueInput:HTMLInputElement = document.createElement('input');
                valueInput.setAttribute('type', 'text')
                valueInput.classList.add('slider__input', 'slider__input_value');
                inputsContainer.append(valueInput);
                let inputLabel:HTMLElement = document.createElement('span');
                inputLabel.classList.add('slider__label');
                inputLabel.innerText = `value ${i+1}`;
                valueInput.before(inputLabel);
            }
            let inputs:NodeListOf<HTMLInputElement> = inputsContainer.querySelectorAll('.slider__input_value');
            this.addInputsListener(inputs);
            return inputs;
        }
    }

    addInputsListener = (inputs:NodeListOf<HTMLInputElement>):void => {
        inputs.forEach (
            input => {
                input.onclick = ():void => {
                input.value = '';
                input.addEventListener('keydown',  (e) => {
                    if (e.code == 'Enter'){
                        let newInputValue:number = Number(input.value);
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

    newInputValue:any;
}
