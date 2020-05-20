export default class SubViewHandlers  {
    createHandlers(options, slider){
        for (let i = 0; i < options.handlersAmount; i++){
            const handler = document.createElement('div');
            handler.classList.add('slider__handler');
            if (options.vertical) {
                handler.classList.add('slider__handler_vertical');
            } else{
                handler.classList.add('slider__handler_horisontal');
            }
            slider.append(handler);
        }
        let handlers = slider.querySelectorAll('.slider__handler');
        this.addHandlerListeners(handlers);
        return handlers;
    }

    getInitialHandlersPosition = (handlers, options) => {
        let handlersPosition = [];
        for (let i = 0; i < handlers.length; i++){
            if(options.vertical){
                let handlerPosition = handlers[i].getBoundingClientRect().y;
                handlersPosition[i] = handlerPosition;
            } else {
                let handlerPosition = handlers[i].getBoundingClientRect().x;
                handlersPosition[i] = handlerPosition;
            }
        }
        return handlersPosition;
    }

    addHandlerListeners = (handlers) => {
        handlers[0].onmousedown = (e) => {
            this.handlerMouseDown(e, handlers[0], 0);
        }
        if(handlers[1]){
            handlers[1].onmousedown = (e) => { 
                this.handlerMouseDown(e, handlers[1], 1);
            }
        }
    }

    handlerMouseDown;
    
}   
