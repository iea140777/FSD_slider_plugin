import { IOptions } from "../presenter";

export default class SubViewIcons  {
    options: IOptions;
    icons: NodeListOf<HTMLDivElement>;
    createIcons(options:IOptions, handlers:NodeListOf<HTMLDivElement>, slider:HTMLDivElement):NodeListOf<HTMLDivElement> {
        this.options = options;
        for (let i = 0; i < handlers.length; i++){
            const icon:HTMLDivElement = document.createElement('div');
            icon.classList.add('slider__icon');
            if (options.vertical) {
                icon.classList.add('slider__icon_vertical');
            } else {
                icon.classList.add('slider__icon_horisontal');
            }
            handlers[i].append(icon);
        }
        let icons:NodeListOf<HTMLDivElement> = slider.querySelectorAll('.slider__icon');
        this.icons = icons;
        return icons;     
    }
    
    getIconsShift = () => {
        this.icons.forEach(icon => {
            if (this.options.vertical) {
                let shiftX = icon.getBoundingClientRect().height/2;
                icon.style.top = -shiftX  + 'px';
                let shiftY = icon.getBoundingClientRect().width;
                icon.style.left = -shiftY - 10  + 'px';
            }
            else {
                let shiftX = icon.getBoundingClientRect().width/2;
                icon.style.left = -shiftX + 'px';
                let shiftY = icon.getBoundingClientRect().height;
                icon.style.top = -shiftY - 8  + 'px';
            }
        }) 
    }
}   

