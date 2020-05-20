'use strict';
$('.slider__container').slider({minValue: 0, maxValue: 100, vertical: false, icon: true, handlersAmount: 2});
$('.slider__container1').slider({minValue: 0, maxValue: 200, startingValue: [70, 140], icon: true, range: false});
$('.slider__container2').slider({minValue: -100, maxValue: 100, startingValue: [-50, 50],vertical: true, handlersAmount: 2});
