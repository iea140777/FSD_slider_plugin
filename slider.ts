'use strict';
import {Presenter} from './src/presenter';
import Model from './src/model';
import {View} from './src/view';
import{IOptions} from './src/presenter';
// var jquery = require("jquery");
// window.$ = window.jQuery = jquery;


(function($){
    jQuery.fn.slider = function(options:IOptions){
        options = $.extend ({
            minValue: -100,
            maxValue: 100,
            startingValue: [-50, 50],
            vertical:false,
            step: 15,
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
            this.presenter = new Presenter(Model, View, options, this.container);
            };
    return this.each(init);    
};
})(jQuery);

