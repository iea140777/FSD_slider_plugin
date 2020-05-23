import { IOptions } from "../presenter";

export default class SubViewIcons  {
    createIcons(options:IOptions, handlers:NodeListOf<HTMLDivElement>, slider:HTMLDivElement):NodeListOf<HTMLDivElement> {
        for (let i = 0; i < handlers.length; i++){
            const icon:HTMLDivElement = document.createElement('div');
            icon.classList.add('slider__icon');
            if (options.vertical) {
                icon.classList.add('slider__icon_vertical');
            } else{
                icon.classList.add('slider__icon_horisontal');
            }
            handlers[i].append(icon);
        }
        let icons:NodeListOf<HTMLDivElement> = slider.querySelectorAll('.slider__icon'); 
        return icons;     
    } 
}   