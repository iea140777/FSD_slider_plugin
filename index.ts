'use strict';
$('.slider1').slider({minValue: 0, maxValue: 100, vertical: false, icon: true, handlersAmount: 2, valueInputs: true});
$('.slider2').slider({minValue: 0, maxValue: 200, startingValue: [70, 140], icon: true, range: false});
$('.slider3').slider({minValue: -100, maxValue: 100, startingValue: [-50, 50],vertical: true, handlersAmount: 2});
