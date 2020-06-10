'use strict';
import {Presenter} from './src/presenter';
import{IOptions} from './src/presenter';
// var jquery = require("jquery");
// window.$ = window.jQuery = jquery;


(function( $ ){
    const defaults:IOptions = {
        minValue: -100,
        maxValue: 100,
        startingValue: [-50, 20],
        vertical:false,
        step: 10,
        moveBySteps: true,
        range: true,
        rangeInput: true,
        valueInputs: true,
        handlersAmount: 2, 
        scale: true,
        scaleLegend: true,
        icon: true
    };
   
    const methods = {
        init: function (options:any) {
            return this.each(function(){
                const params = $.extend({}, defaults, options);
                this.presenter = new Presenter (params, this);                
            });
        },

        destroy: function  () {
            return this.each(function(){
                const slider = this.children;
                for (let elem of slider) {
                    elem.remove();
                  }
            })
        }
    };
  
    $.fn.slider = function(method) {
      
      if ( methods[method] ) {
        return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
      } else if ( typeof method === 'object' || ! method ) {
        return methods.init.apply( this, arguments );
      } else {
        $.error( 'Метод с именем ' +  method + ' не существует для jQuery.slider' );
      }    
    
    };
  
  })( jQuery );