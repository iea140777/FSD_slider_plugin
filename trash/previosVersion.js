//  Model block 
const defaults = {
    minValue: -200,
    maxValue: -100,
    step: 5,
    range: false,
    tulip: true,
    handlersAmount: 1,
    icon: true,
    input: true
};

class SliderModel{
    constructor(){
    this.minValue = defaults.minValue,
    this.maxValue = defaults.maxValue,
    this.step = defaults.step,
    this.range = defaults.range,
    this.tulip = defaults.tulip,
    this.handlersAmount = defaults.handlersAmount,
    this.icon = defaults.icon,
    this.input = defaults.input,
    this.sliderContainer = {},
    this.slider = {},
    this.sliderPosition = {}, 
    this.handlers = [],
    this.icons = {},
    this.inputs = {},
    this.currentPosition = [],
    this.currentValue = [],
    this.handlesrData = [],
    this.sliderBorder,
    this.minPosition,
    this.maxPosition,
    this.positionRange,
    this.valueRange,
    this.positionValueRate;
    }

    //получаем данные об элементах созданного экз слайдера
    getSliderData(){
        this.sliderContainer = newSlider,
        this.slider = this.sliderContainer.querySelector('.slider__slider'),
        this.sliderPosition = this.slider.getBoundingClientRect(),
        this.handlers = this.slider.querySelectorAll('.slider__handler'),
        this.icons = this.slider.querySelectorAll('.slider__icon'),
        this.inputs = this.sliderContainer.querySelector('.slider__input');
        // this.handler = this.newSlider.querySelector('.slider__handler'),
        // this.handlersData = Array.from(this.handlers);
        console.log(this.handlers[0].offsetWidth);
    }

    //получаем расчетные данные по созданному экз слайдера
    getPositionAndValueData(){
        this.sliderBorder = parseFloat(getComputedStyle(this.slider).borderLeftWidth);
        this.minPosition = this.sliderPosition.x;
        this.maxPosition = this.minPosition + this.sliderPosition.width - this.handlers[0].offsetWidth;
        this.positionRange = (this.maxPosition - this.minPosition) + this.sliderBorder;
        this.valueRange = Math.abs(this.maxValue - this.minValue);
        this.positionValueRate = this.positionRange / this.valueRange;
    }

    // метод для получения данных о значении каждого бегунка
    getCurrentValue(){
        for (let i = 0; i < this.handlers.length; i++){
            this.currentPosition[i] = this.handlers[i].getBoundingClientRect();
            let computedValue = this.minValue + ((this.currentPosition[i].x - this.minPosition) / this.positionValueRate);
            if (this.currentPosition[i].x  === this.minPosition){this.currentValue[i] = this.minValue;}
            else if(this.currentPosition[i].x === this.maxPosition){this.currentValue[i] = this.maxValue;}
            else {
                this.currentValue[i] = (Math.round(computedValue / this.step)) * this.step;
            }
            if (this.icon) {
                this.icons[i].innerHTML = this.currentValue[i];
            } 
            
        }   
    }
}


//  Presenter block 
const newSlider = document.querySelector('.slider__container');
 
if(newSlider && newSlider != null){
    let slider1 = new SliderModel();
    createSlider(slider1);
    slider1.getSliderData();
    slider1.getPositionAndValueData();
    slider1.getCurrentValue();
    moveByMouse(slider1);
    changePosition(slider1);
   
}

// Перемещение бегунка при перетаскивании мышью
function moveByMouse (slider){
    slider.handlers.forEach(function(item){
        item.addEventListener('mousedown', function(event) {
            event.preventDefault(); 
            let currentPosition = item.getBoundingClientRect();
            let shiftX = event.clientX - currentPosition.x;
            item.classList.add('slider__handler_active');
            slider.inputs.value = '';
            document.addEventListener('mousemove', onMouseMove);
            function onMouseMove(event) {
                // console.log(this);
                let newLeft = event.clientX - shiftX - slider.sliderPosition.x;
                if (newLeft < -slider.sliderBorder) {
                    newLeft = -slider.sliderBorder;
                }
                if (newLeft > slider.positionRange) {
                    newLeft = slider.positionRange;
                }
                item.style.left = newLeft + 'px';
                slider.getCurrentValue();
                if(slider.input && slider.handlers.length === 1) {
                    slider.inputs.value = slider.currentValue[0]
                }
            }
            document.addEventListener('mouseup', onMouseUp);
            function onMouseUp() {
                document.removeEventListener('mouseup', onMouseUp);
                document.removeEventListener('mousemove', onMouseMove);
                item.classList.remove('slider__handler_active');
                slider.getCurrentValue(); 
            }   
        });
        item.ondragstart = function() {
            return false;
        };    
    });
}

 // метод для получения значения позиции бегунка в соответствии со значением в input
 function getCurrentPosition(){
    const newValue = +this.inputs.value;
    if (newValue <= this.minValue){
        this.handlers[0].style.left = (0 - this.sliderBorder) + 'px';
        this.currentPosition[0].x  = this.minPosition;
        this.currentValue[0] = this.minValue}
    else if(newValue >= this.maxValue){
        this.handlers[0].style.left = this.positionRange + 'px';
        this.currentPosition[0].x  = this.maxPosition;
        this.currentValue[0] = this.maxValue}
    else {
        this.handlers[0].style.left = Math.abs((newValue - this.minValue) * this.positionValueRate) + 'px'; 
        this.currentPosition[0].x = Math.abs((newValue - this.minValue) * this.positionValueRate +  this.minPosition);
        
        this.getCurrentValue();
    }
    if (this.icon) {
        this.icons[0].innerHTML = this.currentValue[0];
    }
}   



// меняем положение бегунка при введении значения в поле ввода
function changePosition(slider){
    if (slider.input && slider.handlers.length === 1){
        slider.inputs.addEventListener('input', function(e) {
            e.preventDefault(); 
            let changePosition = getCurrentPosition.bind(slider);
            setTimeout(changePosition, 500);
            slider.getCurrentValue();
            console.log(slider);
        });
} 
}

//  View block 

function createSlider(slider) {
    const sliderLine = document.createElement('div');
    sliderLine.classList.add('slider__slider');
    newSlider.append(sliderLine); 

    function createHandlers(handlersAmount){
        for (let i = 1; i <= handlersAmount; i++){
            let handler = document.createElement('div');
            handler.classList.add('slider__handler');
            sliderLine.append(handler);
            if(slider.icon){
                let icon = document.createElement('div');
                icon.classList.add('slider__icon');
                handler.append(icon);
            }
        }
    }
    function createInput(slider){
        if(slider.input){
            const sliderInput = document.createElement('input');
            sliderInput.setAttribute('type', 'text')
            sliderInput.classList.add('slider__input');
            newSlider.append(sliderInput);
        }
    }
    createHandlers(slider.handlersAmount); 
    createInput(slider);
}