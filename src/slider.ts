'use strict';
import {Presenter} from './presenter';
import Model from './model';
import {View} from './view';
// var jQuery = require("jQuery");

(function($){
    jQuery.fn.slider = function(options){
        options = $.extend ({
            minValue: 0,
            maxValue: 100,
            vertical:false,
            step: 5,
            range: true,
            handlersAmount: 2,
            icon: true,
            input: true
        }, options);
        var init = function(){
            this.sliderContainer = this;
            this.presenter = new Presenter(Model, View, options, this.sliderContainer);
            };
    return this.each(init);    
};
})(jQuery);

