export default class SubViewIcons  {
    createIcons(options, handlers, slider){
        if(options.icon){
            for (let i = 0; i < handlers.length; i++){
                const icon = document.createElement('div');
                icon.classList.add('slider__icon');
                if (options.vertical) {
                    icon.classList.add('slider__icon_vertical');
                } else{
                    icon.classList.add('slider__icon_horisontal');
                }
                handlers[i].append(icon);
            }
            let icons = slider.querySelectorAll('.slider__icon'); 
            return icons;     
        }
    } 
}   