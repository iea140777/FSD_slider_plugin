import { IOptions } from "../presenter";

export default class SubViewHandlers  {
    createHandlers(options:IOptions, slider:HTMLDivElement):NodeListOf<HTMLDivElement> {
        for (let i = 0; i < options.handlersAmount; i++){
            const handler:HTMLDivElement = document.createElement('div');
            handler.classList.add('slider__handler');
            if (options.vertical) {
                handler.classList.add('slider__handler_vertical');
            } else{
                handler.classList.add('slider__handler_horisontal');
            }
            slider.append(handler);
        }
        let handlers:NodeListOf<HTMLDivElement> = slider.querySelectorAll('.slider__handler');
        this.addHandlerListeners(handlers);
        return handlers;
    }

    addHandlerListeners = (handlers:NodeListOf<HTMLDivElement>):void => {
        handlers[0].addEventListener('mousedown', (e) => {
                this.handlerMouseDown(e, handlers[0], 0);
            })
        handlers[0].addEventListener('touchstart', (e):void => {
            this.handlerTouchStart(e, handlers[0], 0);
        })
        if(handlers[1]){
            handlers[1].addEventListener('mousedown', (e) => {
                this.handlerMouseDown(e, handlers[1], 1);
            })
            handlers[1].addEventListener('touchstart', (e):void => {
                this.handlerTouchStart(e, handlers[1], 1);
            })
        }
    }

    handlerMouseDown: any;
    handlerTouchStart: any;
    
}   
