'use strict';
import {Presenter} from './presenter';
import Model from './model';
import {View} from './view';
import{IOptions} from './presenter';
// var jQuery = require("jQuery");


(function($){
    jQuery.fn.slider = function(options:IOptions){
        options = $.extend ({
            minValue: 0,
            maxValue: 100,
            startingValue: [20, 60],
            vertical:false,
            step: 5,
            range: true,
            rangeInput: true,
            valueInputs: true,
            handlersAmount: 2,
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

