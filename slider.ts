'use strict';
import {Presenter} from './src/presenter';
import{IOptions} from './src/presenter';
// var jquery = require("jquery");
// window.$ = window.jQuery = jquery;


(function($){
    jQuery.fn.slider = function(options:IOptions){
        options = $.extend ({
            minValue: -100,
            maxValue: 100,
            startingValue: [-50, 20],
            vertical:false,
            step: 10,
            moveBySteps: false,
            range: true,
            rangeInput: true,
            valueInputs: true,
            handlersAmount: 2, 
            scale: true,
            icon: true,
            input: true
        }, options);
        var init = function(){
            this.container = this;
            this.presenter = new Presenter (options, this.container);
            };
    return this.each(init);    
};
})(jQuery);

