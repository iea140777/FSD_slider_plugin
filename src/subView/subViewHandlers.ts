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

    // getInitialHandlersPosition = (handlers:NodeListOf<HTMLDivElement>, options:IOptions):number[] => {
    //     let handlersPosition:number[] = [];
    //     for (let i = 0; i < handlers.length; i++){
    //         if(options.vertical){
    //             let handlerPosition:number = handlers[i].getBoundingClientRect().y;
    //             handlersPosition[i] = handlerPosition;
    //         } else {
    //             let handlerPosition:number = handlers[i].getBoundingClientRect().x;
    //             handlersPosition[i] = handlerPosition;
    //         }
    //     }
    //     return handlersPosition;
    // }

    addHandlerListeners = (handlers:NodeListOf<HTMLDivElement>):void => {
        handlers[0].onmousedown = (e):void => {
            this.handlerMouseDown(e, handlers[0], 0);
        }
        if(handlers[1]){
            handlers[1].onmousedown = (e):void => { 
                this.handlerMouseDown(e, handlers[1], 1);
            }
        }
    }

    handlerMouseDown: any;
    
}   
