parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"p9qc":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=function(){return function(e){var t=this;this.getInitialCurrentValue=function(){t.currentValue=[];for(var e=0;e<t.options.handlersAmount;e++)t.currentValue[e]=t.options.startingValue[e]},this.getValueRange=function(){t.valueRange=Math.abs(t.options.maxValue-t.options.minValue)},this.getStepsAmount=function(){t.stepsAmount=Math.ceil(t.valueRange/t.options.step)},this.getStepPercent=function(){t.stepPercent=t.options.step/t.valueRange*100},this.getValuePercent=function(){t.valuePercent=100/t.valueRange},this.getRangeValue=function(){t.rangeValue=Math.abs(t.currentValue[1]-t.currentValue[0])},this.options=e,this.getInitialCurrentValue(),this.getValueRange(),this.getStepsAmount(),this.getStepPercent(),this.getValuePercent(),this.getRangeValue()}}();exports.default=e;
},{}],"RWvY":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=function(){return function(){var e=this;this.createSliderLine=function(r,i){var t=document.createElement("div");t.classList.add("slider__slider"),i.vertical&&t.classList.add("slider__slider_vertical"),r.append(t);var d=r.querySelector(".slider__slider");return e.addSliderListener(d),d},this.addSliderListener=function(r){r.onclick=function(r){e.sliderClick(r)}}}}();exports.default=e;
},{}],"VwWS":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=function(){function e(){var e=this;this.addHandlerListeners=function(r){r[0].onmousedown=function(n){e.handlerMouseDown(n,r[0],0)},r[1]&&(r[1].onmousedown=function(n){e.handlerMouseDown(n,r[1],1)})}}return e.prototype.createHandlers=function(e,r){for(var n=0;n<e.handlersAmount;n++){var t=document.createElement("div");t.classList.add("slider__handler"),e.vertical?t.classList.add("slider__handler_vertical"):t.classList.add("slider__handler_horisontal"),r.append(t)}var d=r.querySelectorAll(".slider__handler");return this.addHandlerListeners(d),d},e}();exports.default=e;
},{}],"EO17":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=function(){function e(){}return e.prototype.createIcons=function(e,t,r){for(var i=0;i<t.length;i++){var s=document.createElement("div");s.classList.add("slider__icon"),e.vertical?s.classList.add("slider__icon_vertical"):s.classList.add("slider__icon_horisontal"),t[i].append(s)}return r.querySelectorAll(".slider__icon")},e}();exports.default=e;
},{}],"ezLB":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=function(){function e(){var e=this;this.addInputsListener=function(t){t.forEach(function(n){n.onfocus=function(){n.value="",n.addEventListener("blur",function(r){e.getInputValue(n,t,r)}),n.addEventListener("keydown",function(r){"Enter"==r.code&&e.getInputValue(n,t,r)})}})},this.getInputValue=function(t,n,r){var u=Number(t.value);(""==t.value||isNaN(Number(t.value)))&&(u=void 0),r.target==n[0]?e.newInputValue(u,0):e.newInputValue(u,1)}}return e.prototype.createInputsContainer=function(e,t,n){var r=document.createElement("div");return r.classList.add("slider__inputsContainer"),t.before(r),n.querySelector(".slider__inputsContainer")},e.prototype.createRangeInput=function(e,t){var n=document.createElement("span");n.classList.add("slider__inputLabel"),n.innerText="Range",t.append(n);var r=document.createElement("input");return r.setAttribute("type","text"),r.setAttribute("readonly","true"),r.setAttribute("size","8"),r.classList.add("slider__input","slider__input_range"),n.append(r),t.querySelector(".slider__input_range")},e.prototype.createValueInputs=function(e,t){for(var n=0;n<+e.handlersAmount;n++){var r=document.createElement("span");r.classList.add("slider__inputLabel"),r.innerText="Value "+(n+1),t.append(r);var u=document.createElement("input");u.setAttribute("type","text"),u.setAttribute("size","8"),u.classList.add("slider__input","slider__input_value"),r.append(u)}var a=t.querySelectorAll(".slider__input_value");return this.addInputsListener(a),a},e}();exports.default=e;
},{}],"fXEI":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=function(){return function(){var e=this;this.createScale=function(l,s){e.options=l;for(var t=Math.ceil((l.maxValue-l.minValue)/l.step)+1,a=0;a<t;a++){var i=document.createElement("div");i.classList.add("slider__scale-point"),l.vertical?i.classList.add("slider__scale-point_vertical"):i.classList.add("slider__scale-point_horisontal"),s.append(i)}return s.querySelectorAll(".slider__scale-point")},this.addScaleLegend=function(l,s){return l.forEach(function(l){var s=document.createElement("div");s.classList.add("slider__scale-legend"),e.options.vertical?s.classList.add("slider__scale-legend_vertical"):s.classList.add("slider__scale-legend_horisontal"),l.append(s)}),s.querySelectorAll(".slider__scale-legend")}}}();exports.default=e;
},{}],"CBC0":[function(require,module,exports) {
"use strict";var e=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(exports,"__esModule",{value:!0});var i=e(require("./subView/subViewSliderLine")),t=e(require("./subView/subViewHandlers")),n=e(require("./subView/subViewIcons")),s=e(require("./subView/subViewInput")),o=e(require("./subView/subViewScale")),r=function(){return function(e,r){var l=this;this.createSlider=function(e,i){l.sliderContainer=l.createContainer(e,i),l.slider=l.subViewSliderLine.createSliderLine(l.sliderContainer,e),l.handlers=l.subViewHandlers.createHandlers(e,l.slider),l.options.scale&&(l.scale=l.subViewScale.createScale(e,l.slider)),l.options.scaleLegend&&(l.scaleLegend=l.subViewScale.addScaleLegend(l.scale,l.slider)),l.options.icon&&(l.icons=l.subViewIcons.createIcons(e,l.handlers,l.slider)),(l.options.rangeInput||l.options.valueInputs)&&(l.inputsContainer=l.subViewInput.createInputsContainer(e,l.slider,l.sliderContainer),l.options.rangeInput&&l.options.handlersAmount>1&&(l.rangeInput=l.subViewInput.createRangeInput(e,l.inputsContainer)),l.options.valueInputs&&(l.valueInputs=l.subViewInput.createValueInputs(e,l.inputsContainer)))},this.createContainer=function(e,i){var t=document.createElement("div");return t.classList.add("slider__container"),l.options.vertical?t.classList.add("slider__container_vertical"):t.classList.add("slider__container_horisontal"),i.append(t),i.querySelector(".slider__container")},this.resizeListener=function(){window.addEventListener("resize",function(){l.notifyChangedWindow()})},this.getSliderData=function(){l.getSliderPosition(),l.getSliderLength(),l.getHandlerSize(),l.getMinMaxPosition(),l.options.range&&(l.rangeBlock=l.showRange())},this.getSliderPosition=function(){l.options.vertical?l.sliderPosition=l.slider.getBoundingClientRect().y+pageYOffset:l.sliderPosition=l.slider.getBoundingClientRect().x+pageXOffset},this.getSliderLength=function(){l.options.vertical?l.sliderLength=l.slider.getBoundingClientRect().height:l.sliderLength=l.slider.getBoundingClientRect().width},this.getHandlerSize=function(){l.getSliderLength(),l.options.vertical?(l.handlerSizePerc=l.handlers[0].offsetHeight/2/l.sliderLength*100,l.handlerSizePx=l.handlers[0].offsetHeight):(l.handlerSizePerc=l.handlers[0].offsetWidth/2/l.sliderLength*100,l.handlerSizePx=l.handlers[0].offsetWidth)},this.getMinMaxPosition=function(){l.getHandlerSize,l.options.vertical?(l.maxPosition=l.sliderPosition-l.handlerSizePx/2,l.maxPositionPerc=0-l.handlerSizePerc,l.minPosition=l.maxPosition+l.sliderLength,l.minPositionPerc=100-l.handlerSizePerc):(l.minPosition=l.sliderPosition-l.handlerSizePx/2,l.minPositionPerc=0-l.handlerSizePerc,l.maxPosition=l.minPosition+l.sliderLength,l.maxPositionPerc=100-l.handlerSizePerc),l.positionRange=Math.abs(l.minPosition-l.maxPosition)},this.getScalePosition=function(){for(var e=l.positionRange/Math.abs(l.options.maxValue-l.options.minValue)/l.positionRange*100,i=0;i<l.scale.length;i++)l.options.vertical?0==i?l.scale[i].style.top="100%":i==l.scale.length-1?l.scale[i].style.top="0%":l.scale[i].style.top=100-i*e*l.options.step+"%":0==i?l.scale[i].style.left="0%":i==l.scale.length-1?l.scale[i].style.left="100%":l.scale[i].style.left=i*e*l.options.step+"%";l.options.scaleLegend&&l.getScaleLegendValues()},this.getScaleLegendValues=function(){l.scaleLegend.forEach(function(e){if(l.options.vertical){var i=e.parentElement.style.top,t=(100-Number(i.slice(0,-1)))/100*Math.abs(l.options.maxValue-l.options.minValue),n=Math.round(l.options.minValue+t);e.innerHTML=n.toString();var s=e.getBoundingClientRect().height/2;e.style.top=-s+"px"}else i=e.parentElement.style.left,t=Number(i.slice(0,-1))/100*Math.abs(l.options.maxValue-l.options.minValue),n=Math.round(l.options.minValue+t),e.innerHTML=n.toString(),s=e.getBoundingClientRect().width/2,e.style.left=-s+"px"})},this.showRange=function(){var e=document.createElement("div");return e.classList.add("slider__range"),l.options.vertical?(e.style.width=l.slider.getBoundingClientRect().width+2+"px",e.style.left="-1px"):(e.style.height=l.slider.getBoundingClientRect().height+2+"px",e.style.top="-1px"),l.slider.append(e),l.rangeBlock=l.slider.querySelector(".slider__range"),l.getSliderRangePosition(),l.rangeBlock},this.getSliderRangePosition=function(){l.getHandlerSize(),l.options.vertical?(l.handlersPositionPerc[0]>l.handlersPositionPerc[1]?l.rangeBlock.style.top=l.handlersPositionPerc[1]+"%":l.rangeBlock.style.top=l.handlersPositionPerc[0]+"%",l.rangeBlock.style.height=Math.abs(l.handlersPositionPerc[1]-l.handlersPositionPerc[0])+"%"):(l.handlersPositionPerc[0]>l.handlersPositionPerc[1]?l.rangeBlock.style.left=l.handlersPositionPerc[1]+"%":l.rangeBlock.style.left=l.handlersPositionPerc[0]+"%",l.rangeBlock.style.width=Math.abs(l.handlersPositionPerc[1]-l.handlersPositionPerc[0])+"%")},this.moveByMouse=function(e,i,t){var n,s;e.preventDefault(),l.getMinMaxPosition(),n=l.options.vertical?e.clientY-l.handlers[t].getBoundingClientRect().y:e.clientX-l.handlers[t].getBoundingClientRect().x+pageXOffset,s=n/l.sliderLength*100,i.classList.add("slider__handler_active"),document.onmousemove=function(e){if(e.preventDefault,l.options.vertical){var n=(e.clientY-l.slider.getBoundingClientRect().y)/l.slider.getBoundingClientRect().height*100-s;n<=l.maxPositionPerc&&(n=l.maxPositionPerc),n>=l.minPositionPerc&&(n=l.minPositionPerc),i.style.top=n+"%",l.writeNewPosition(i,t,n)}else{var o=(e.clientX-l.slider.getBoundingClientRect().x)/l.slider.getBoundingClientRect().width*100-s;o<=l.minPositionPerc&&(o=l.minPositionPerc),o>=l.maxPositionPerc&&(o=l.maxPositionPerc),i.style.left=o+"%",l.writeNewPosition(i,t,o)}},document.onmouseup=function(){i.classList.remove("slider__handler_active"),document.onmousemove=null}},this.writeNewPosition=function(e,i,t){l.handlersPositionPerc[i]=t+l.handlerSizePerc,l.options.range&&l.getSliderRangePosition(),l.notifyChangedHandlerPosition()},this.moveByClick=function(e){var i,t;e.preventDefault(),l.getMinMaxPosition(),i=l.options.vertical?e.clientY:e.clientX;var n=0;if((t=2==l.options.handlersAmount?l.getNearestHandler(i):l.handlers[0])==l.handlers[1]&&(n=1),l.options.vertical){var s=(i-l.slider.getBoundingClientRect().y)/l.slider.getBoundingClientRect().height*100-l.handlerSizePerc;s<=l.maxPositionPerc&&(s=l.maxPositionPerc),s>=l.minPositionPerc&&(s=l.minPositionPerc),t.style.top=s+"%",l.writeNewPosition(t,n,s)}else{var o=(i-l.slider.getBoundingClientRect().x)/l.slider.getBoundingClientRect().width*100-l.handlerSizePerc;o<=l.minPositionPerc&&(o=l.minPositionPerc),o>=l.maxPositionPerc&&(o=l.maxPositionPerc),t.style.left=o+"%",l.writeNewPosition(t,n,o)}},this.getNearestHandler=function(e){var i,t;return l.options.vertical?(i=Math.abs(l.handlers[0].getBoundingClientRect().y-e),t=Math.abs(l.handlers[1].getBoundingClientRect().y-e)):(i=Math.abs(l.handlers[0].getBoundingClientRect().x-e),t=Math.abs(l.handlers[1].getBoundingClientRect().x-e)),t<i?l.handlers[1]:l.handlers[0]},this.options=e,this.subViewSliderLine=new i.default,this.subViewHandlers=new t.default,this.subViewScale=new o.default,this.subViewIcons=new n.default,this.subViewInput=new s.default,this.handlersPosition=[],this.handlersPositionPerc=[],this.createSlider(e,r),this.getSliderData(),this.options.scale&&this.getScalePosition(),this.resizeListener(),this.subViewHandlers.handlerMouseDown=function(e,i,t){l.moveByMouse(e,i,t)},this.subViewInput.newInputValue=function(e,i){l.notifyChangedInputValue(e,i)},this.subViewSliderLine.sliderClick=function(e){e.target!==l.handlers[0]&&e.target!==l.handlers[1]&&l.moveByClick(e)}}}();exports.View=r;
},{"./subView/subViewSliderLine":"RWvY","./subView/subViewHandlers":"VwWS","./subView/subViewIcons":"EO17","./subView/subViewInput":"ezLB","./subView/subViewScale":"fXEI"}],"mxbi":[function(require,module,exports) {
"use strict";var e=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(exports,"__esModule",{value:!0});var o=e(require("./model1")),n=require("./view"),t=function(){return function(e,t){var i=this;this.checkOptions=function(e){i.options=e,i.options.minValue=Number(e.minValue),i.options.maxValue=Number(e.maxValue),i.options.startingValue=[Number(e.startingValue[0]),Number(e.startingValue[1])],i.options.step=Number(e.step),i.options.handlersAmount=Number(e.handlersAmount),i.options.minValue>=i.options.maxValue&&console.log("Slider: minValue should not be equal or be more than maxValue");for(var o=0;o<=i.options.startingValue.length;o++)i.options.startingValue[o]>i.options.maxValue?i.options.startingValue[o]=i.options.maxValue:i.options.startingValue[o]<i.options.minValue&&(i.options.startingValue[o]=i.options.minValue);i.options.handlersAmount<1?(i.options.handlersAmount=1,console.log("Slider: handlers amount should be equal either 1 or 2")):i.options.handlersAmount>2&&(i.options.handlersAmount=2,console.log("Slider: handlers amount should be equal either 1 or 2")),2==i.options.handlersAmount&&i.options.startingValue.length<2&&(i.options.startingValue=[i.options.minValue,i.options.maxValue],console.log("Slider: starting value should be defined for every handler")),i.options.step>=Math.abs(i.options.maxValue-i.options.minValue)&&console.log("Slider: step value should  be  less than slider value range"),1==i.options.handlersAmount&&i.options.range&&(i.options.range=!1,console.log("Slider: range option cannot be applied to one handler")),i.options.scaleLegend&&!i.options.scale&&(i.options.scaleLegend=!1,console.log("Slider: scaleLegend option cannot be applied without scale option"))},this.setInitialHandlersPosition=function(){i.getPositionFromValue(),i.options.range&&(i.model.getRangeValue(),i.view.getSliderRangePosition())},this.setHandlersToInputValue=function(e,o){null!=e?(e>i.options.maxValue?e=i.options.maxValue:e<i.options.minValue&&(e=i.options.minValue),i.options.moveBySteps&&(e=Math.round((e-i.options.minValue)/i.options.step)*i.options.step+i.options.minValue),i.model.currentValue[o]=e,i.getPositionFromValue()):i.getValueFromPosition()},this.getValueFromPosition=function(){for(var e=0;e<i.view.handlers.length;e++){var o=void 0;if(o=i.options.vertical?(100-i.view.handlersPositionPerc[e])/i.model.valuePercent:i.view.handlersPositionPerc[e]/i.model.valuePercent,i.options.moveBySteps){var n=Math.round(o/i.options.step)*i.options.step;n>i.model.valueRange?i.model.currentValue[e]=i.options.maxValue:i.model.currentValue[e]=i.options.minValue+n;var t=i.model.currentValue[e]-i.options.minValue;i.options.vertical?(i.view.handlersPositionPerc[e]=100-t*i.model.valuePercent,i.view.handlers[e].style.top=i.view.handlersPositionPerc[e]-i.view.handlerSizePerc+"%"):(i.view.handlersPositionPerc[e]=t*i.model.valuePercent,i.view.handlers[e].style.left=i.view.handlersPositionPerc[e]-i.view.handlerSizePerc+"%"),i.options.range&&i.view.getSliderRangePosition()}else i.model.currentValue[e]=i.options.minValue+Math.round(o);i.options.icon&&(i.view.icons[e].innerHTML=String(i.model.currentValue[e]))}if(i.model.getRangeValue(),i.options.rangeInput&&i.options.range&&i.options.handlersAmount>1&&(i.view.rangeInput.value=String(i.model.rangeValue)),i.options.rangeInput&&!i.options.range&&i.options.handlersAmount>1&&(i.view.rangeInput.value=i.model.currentValue[0]+"; "+i.model.currentValue[1]),i.options.valueInputs)for(e=0;e<i.options.handlersAmount;e++)i.view.valueInputs[e].value=""+i.model.currentValue[e];return i.model.currentValue},this.getPositionFromValue=function(){i.view.getMinMaxPosition();for(var e=0;e<i.view.handlers.length;e++){var o,n=i.model.currentValue[e]-i.options.minValue,t=void 0;i.options.vertical?i.options.moveBySteps?((o=Math.round(n/i.options.step)*i.options.step)>i.model.valueRange&&(o=i.model.valueRange),t=100-o*i.model.valuePercent-i.view.handlerSizePerc,i.view.handlers[e].style.top=t+"%",i.model.currentValue[e]=i.options.minValue+o):(t=100-n*i.model.valuePercent-i.view.handlerSizePerc,i.view.handlers[e].style.top=t+"%"):i.options.moveBySteps?((o=Math.round(n/i.options.step)*i.options.step)>i.model.valueRange&&(o=i.model.valueRange),t=o*i.model.valuePercent-i.view.handlerSizePerc,i.view.handlers[e].style.left=t+"%",i.model.currentValue[e]=i.options.minValue+o):(t=n*i.model.valuePercent-i.view.handlerSizePerc,i.view.handlers[e].style.left=t+"%"),i.view.handlersPositionPerc[e]=t+i.view.handlerSizePerc,i.options.icon&&(i.view.icons[e].innerHTML=String(i.model.currentValue[e]))}if(i.model.getRangeValue(),i.options.rangeInput&&i.options.range&&i.options.handlersAmount>1&&(i.view.showRange(),i.view.rangeInput.value=String(i.model.rangeValue)),i.options.rangeInput&&!i.options.range&&i.options.handlersAmount>1&&(i.view.rangeInput.value=i.model.currentValue[0]+"; "+i.model.currentValue[1]),i.options.valueInputs)for(e=0;e<i.options.handlersAmount;e++)i.view.valueInputs[e].value=""+i.model.currentValue[e]},this.checkOptions(e),this.model=new o.default(this.options),this.view=new n.View(this.options,t),this.setInitialHandlersPosition(),this.view.notifyChangedHandlerPosition=function(){i.getValueFromPosition()},this.view.notifyChangedInputValue=function(e,o){i.setHandlersToInputValue(e,o)},this.view.notifyChangedWindow=function(){i.getPositionFromValue()},console.log(this.view),console.log(this.model)}}();exports.Presenter=t;
},{"./model1":"p9qc","./view":"CBC0"}],"QLcG":[function(require,module,exports) {
"use strict";function e(t){return(e="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(t)}Object.defineProperty(exports,"__esModule",{value:!0});var t=require("./src/presenter");!function(r){var n={minValue:-100,maxValue:100,startingValue:[-50,20],vertical:!1,step:10,moveBySteps:!0,range:!0,rangeInput:!0,valueInputs:!0,handlersAmount:2,scale:!0,scaleLegend:!0,icon:!0},o={init:function(e){return this.each(function(){var o=r.extend({},n,e);this.presenter=new t.Presenter(o,this)})},destroy:function(){return this.each(function(){for(var e=0,t=this.children;e<t.length;e++){t[e].remove()}})}};r.fn.slider=function(t){return o[t]?o[t].apply(this,Array.prototype.slice.call(arguments,1)):"object"!==e(t)&&t?void r.error("Метод с именем "+t+" не существует для jQuery.slider"):o.init.apply(this,arguments)}}(jQuery);
},{"./src/presenter":"mxbi"}]},{},["QLcG"], null)
//# sourceMappingURL=slider.js.map