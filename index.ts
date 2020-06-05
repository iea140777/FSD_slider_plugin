// $('.slider1').slider();
interface IOptions {
    minValue: number;
    maxValue: number;
    startingValue: [number, number];
    vertical:boolean;
    step: number;
    moveBySteps: boolean;
    range: boolean;
    rangeInput: boolean;
    valueInputs: boolean;
    handlersAmount: number;
    scale: boolean;
    icon: boolean;
}

class NewOptions implements IOptions {
    minValue: number;
    maxValue: number;
    startingValue: [number, number];
    vertical: boolean;
    step: number;
    moveBySteps: boolean;
    range: boolean;
    rangeInput: boolean;
    valueInputs: boolean;
    handlersAmount: number;
    scale: boolean;
    icon: boolean;
    constructor(block:HTMLDivElement) {
        this.getOptions(block);
    }

    getOptions (block:HTMLDivElement):void {
        let form = block.querySelector('form');
        this.minValue = form.minValue.value;
        this.maxValue = form.maxValue.value;
        this.startingValue = [form.startValue1.value, form.startValue2.value];
        this.vertical = form.vertical.checked;
        this.step = form.step.value;
        this.moveBySteps = form.moveBySteps.checked;
        this.range = form.range.checked;
        this.rangeInput = form.rangeInput.checked;
        this.valueInputs = form.valueInputs.checked;
        if(form.handlers[1].checked){
            this.handlersAmount = 2;
        } else{
            this.handlersAmount = 1;
        }
        this.scale = form.scale.checked;
        this.icon = form.icon.checked; 
    }
}

const blocks:NodeListOf<HTMLDivElement> = document.querySelectorAll('.demo-block');

for (let block of blocks) {
    const form:HTMLFormElement = block.querySelector('form');
    let options: IOptions = new NewOptions(block);
    const slider:HTMLDivElement = block.querySelector('.slider');
    $(slider).slider(options);
    form.addEventListener('change', () => {
        options = new NewOptions(block);
        $(slider).slider('destroy');
        $(slider).slider(options);
    })
}









