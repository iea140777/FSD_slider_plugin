parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"EYy0":[function(require,module,exports) {
var define;
var e;function t(e){return(t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}parcelRequire=function(n,i,o,s){var r,l="function"==typeof parcelRequire&&parcelRequire,a="function"==typeof require&&require;function u(e,t){if(!i[e]){if(!n[e]){var o="function"==typeof parcelRequire&&parcelRequire;if(!t&&o)return o(e,!0);if(l)return l(e,!0);if(a&&"string"==typeof e)return a(e);var s=new Error("Cannot find module '"+e+"'");throw s.code="MODULE_NOT_FOUND",s}d.resolve=function(t){return n[e][1][t]||t},d.cache={};var r=i[e]=new u.Module(e);n[e][0].call(r.exports,d,r,r.exports,this)}return i[e].exports;function d(e){return u(d.resolve(e))}}u.isParcelRequire=!0,u.Module=function(e){this.id=e,this.bundle=u,this.exports={}},u.modules=n,u.cache=i,u.parent=l,u.register=function(e,t){n[e]=[function(e,n){n.exports=t},{}]};for(var d=0;d<o.length;d++)try{u(o[d])}catch(n){r||(r=n)}if(o.length){var c=u(o[o.length-1]);"object"==("undefined"==typeof exports?"undefined":t(exports))&&"undefined"!=typeof module?module.exports=c:"function"==typeof e&&e.amd&&e(function(){return c})}if(parcelRequire=u,r)throw r;return u}({p9qc:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var i=function(e){var t=this;this.getInitialCurrentValue=function(){t.currentValue=[];for(var e=0;e<t.options.handlersAmount;e++)t.currentValue[e]=t.options.startingValue[e]},this.getValueRange=function(){t.valueRange=Math.abs(t.options.maxValue-t.options.minValue)},this.getStepsAmount=function(){t.stepsAmount=Math.ceil(t.valueRange/t.options.step)},this.getStepPercent=function(){t.stepPercent=t.options.step/t.valueRange*100},this.getValuePercent=function(){t.valuePercent=100/t.valueRange},this.getRangeValue=function(){t.rangeValue=Math.abs(t.currentValue[1]-t.currentValue[0])},this.options=e,this.getInitialCurrentValue(),this.getValueRange(),this.getStepsAmount(),this.getStepPercent(),this.getValuePercent(),this.getRangeValue()};n.default=i},{}],RWvY:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var i=function(){var e=this;this.createSliderLine=function(t,n){var i=document.createElement("div");i.classList.add("slider__slider"),n.vertical&&i.classList.add("slider__slider_vertical"),t.append(i);var o=t.querySelector(".slider__slider");return e.addSliderListener(o),o},this.addSliderListener=function(t){t.onclick=function(t){e.sliderClick(t)}}};n.default=i},{}],VwWS:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var i=function(){function e(){var e=this;this.addHandlerListeners=function(t){t[0].onmousedown=function(n){e.handlerMouseDown(n,t[0],0)},t[1]&&(t[1].onmousedown=function(n){e.handlerMouseDown(n,t[1],1)})}}return e.prototype.createHandlers=function(e,t){for(var n=0;n<e.handlersAmount;n++){var i=document.createElement("div");i.classList.add("slider__handler"),e.vertical?i.classList.add("slider__handler_vertical"):i.classList.add("slider__handler_horisontal"),t.append(i)}var o=t.querySelectorAll(".slider__handler");return this.addHandlerListeners(o),o},e}();n.default=i},{}],EO17:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var i=function(){function e(){}return e.prototype.createIcons=function(e,t,n){for(var i=0;i<t.length;i++){var o=document.createElement("div");o.classList.add("slider__icon"),e.vertical?o.classList.add("slider__icon_vertical"):o.classList.add("slider__icon_horisontal"),t[i].append(o)}return n.querySelectorAll(".slider__icon")},e}();n.default=i},{}],ezLB:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var i=function(){function e(){var e=this;this.addInputsListener=function(t){t.forEach(function(n){n.onfocus=function(){n.value="",n.addEventListener("blur",function(i){e.getInputValue(n,t,i)}),n.addEventListener("keydown",function(i){"Enter"==i.code&&e.getInputValue(n,t,i)})}})},this.getInputValue=function(t,n,i){var o=Number(t.value);(""==t.value||isNaN(Number(t.value)))&&(o=void 0),i.target==n[0]?e.newInputValue(o,0):e.newInputValue(o,1)}}return e.prototype.createInputsContainer=function(e,t,n){var i=document.createElement("div");return i.classList.add("slider__inputsContainer"),t.before(i),n.querySelector(".slider__inputsContainer")},e.prototype.createRangeInput=function(e,t){var n=document.createElement("span");n.classList.add("slider__inputLabel"),n.innerText="Range",t.append(n);var i=document.createElement("input");return i.setAttribute("type","text"),i.setAttribute("readonly","true"),i.setAttribute("size","8"),i.classList.add("slider__input","slider__input_range"),n.append(i),t.querySelector(".slider__input_range")},e.prototype.createValueInputs=function(e,t){for(var n=0;n<+e.handlersAmount;n++){var i=document.createElement("span");i.classList.add("slider__inputLabel"),i.innerText="Value "+(n+1),t.append(i);var o=document.createElement("input");o.setAttribute("type","text"),o.setAttribute("size","8"),o.classList.add("slider__input","slider__input_value"),i.append(o)}var s=t.querySelectorAll(".slider__input_value");return this.addInputsListener(s),s},e}();n.default=i},{}],fXEI:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var i=function(){var e=this;this.createScale=function(t,n){e.options=t;for(var i=Math.ceil((t.maxValue-t.minValue)/t.step)+1,o=0;o<i;o++){var s=document.createElement("div");s.classList.add("slider__scale-point"),t.vertical?s.classList.add("slider__scale-point_vertical"):s.classList.add("slider__scale-point_horisontal"),n.append(s)}return n.querySelectorAll(".slider__scale-point")},this.addScaleLegend=function(t,n){return t.forEach(function(t){var n=document.createElement("div");n.classList.add("slider__scale-legend"),e.options.vertical?n.classList.add("slider__scale-legend_vertical"):n.classList.add("slider__scale-legend_horisontal"),t.append(n)}),n.querySelectorAll(".slider__scale-legend")}};n.default=i},{}],CBC0:[function(e,t,n){"use strict";var i=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(n,"__esModule",{value:!0});var o=i(e("./subView/subViewSliderLine")),s=i(e("./subView/subViewHandlers")),r=i(e("./subView/subViewIcons")),l=i(e("./subView/subViewInput")),a=i(e("./subView/subViewScale")),u=function(e,t){var n=this;this.createSlider=function(e,t){n.sliderContainer=n.createContainer(e,t),n.slider=n.subViewSliderLine.createSliderLine(n.sliderContainer,e),n.handlers=n.subViewHandlers.createHandlers(e,n.slider),n.options.scale&&(n.scale=n.subViewScale.createScale(e,n.slider)),n.options.scaleLegend&&(n.scaleLegend=n.subViewScale.addScaleLegend(n.scale,n.slider)),n.options.icon&&(n.icons=n.subViewIcons.createIcons(e,n.handlers,n.slider)),(n.options.rangeInput||n.options.valueInputs)&&(n.inputsContainer=n.subViewInput.createInputsContainer(e,n.slider,n.sliderContainer),n.options.rangeInput&&n.options.handlersAmount>1&&(n.rangeInput=n.subViewInput.createRangeInput(e,n.inputsContainer)),n.options.valueInputs&&(n.valueInputs=n.subViewInput.createValueInputs(e,n.inputsContainer)))},this.createContainer=function(e,t){var i=document.createElement("div");return i.classList.add("slider__container"),n.options.vertical?i.classList.add("slider__container_vertical"):i.classList.add("slider__container_horisontal"),t.append(i),t.querySelector(".slider__container")},this.resizeListener=function(){window.addEventListener("resize",function(){n.notifyChangedWindow()})},this.getSliderData=function(){n.getSliderPosition(),n.getSliderLength(),n.getHandlerSize(),n.getMinMaxPosition(),n.options.range&&(n.rangeBlock=n.showRange())},this.getSliderPosition=function(){n.options.vertical?n.sliderPosition=n.slider.getBoundingClientRect().y+pageYOffset:n.sliderPosition=n.slider.getBoundingClientRect().x+pageXOffset},this.getSliderLength=function(){n.options.vertical?n.sliderLength=n.slider.getBoundingClientRect().height:n.sliderLength=n.slider.getBoundingClientRect().width},this.getHandlerSize=function(){n.getSliderLength(),n.options.vertical?(n.handlerSizePerc=n.handlers[0].offsetHeight/2/n.sliderLength*100,n.handlerSizePx=n.handlers[0].offsetHeight):(n.handlerSizePerc=n.handlers[0].offsetWidth/2/n.sliderLength*100,n.handlerSizePx=n.handlers[0].offsetWidth)},this.getMinMaxPosition=function(){n.getHandlerSize,n.options.vertical?(n.maxPosition=n.sliderPosition-n.handlerSizePx/2,n.maxPositionPerc=0-n.handlerSizePerc,n.minPosition=n.maxPosition+n.sliderLength,n.minPositionPerc=100-n.handlerSizePerc):(n.minPosition=n.sliderPosition-n.handlerSizePx/2,n.minPositionPerc=0-n.handlerSizePerc,n.maxPosition=n.minPosition+n.sliderLength,n.maxPositionPerc=100-n.handlerSizePerc),n.positionRange=Math.abs(n.minPosition-n.maxPosition)},this.getScalePosition=function(){for(var e=n.positionRange/Math.abs(n.options.maxValue-n.options.minValue)/n.positionRange*100,t=0;t<n.scale.length;t++)n.options.vertical?0==t?n.scale[t].style.top="100%":t==n.scale.length-1?n.scale[t].style.top="0%":n.scale[t].style.top=100-t*e*n.options.step+"%":0==t?n.scale[t].style.left="0%":t==n.scale.length-1?n.scale[t].style.left="100%":n.scale[t].style.left=t*e*n.options.step+"%";n.options.scaleLegend&&n.getScaleLegendValues()},this.getScaleLegendValues=function(){n.scaleLegend.forEach(function(e){if(n.options.vertical){var t=e.parentElement.style.top,i=(100-Number(t.slice(0,-1)))/100*Math.abs(n.options.maxValue-n.options.minValue),o=Math.round(n.options.minValue+i);e.innerHTML=o.toString();var s=e.getBoundingClientRect().height/2;e.style.top=-s+"px"}else t=e.parentElement.style.left,i=Number(t.slice(0,-1))/100*Math.abs(n.options.maxValue-n.options.minValue),o=Math.round(n.options.minValue+i),e.innerHTML=o.toString(),s=e.getBoundingClientRect().width/2,e.style.left=-s+"px"})},this.showRange=function(){var e=document.createElement("div");return e.classList.add("slider__range"),n.options.vertical?(e.style.width=n.slider.getBoundingClientRect().width+2+"px",e.style.left="-1px"):(e.style.height=n.slider.getBoundingClientRect().height+2+"px",e.style.top="-1px"),n.slider.append(e),n.rangeBlock=n.slider.querySelector(".slider__range"),n.getSliderRangePosition(),n.rangeBlock},this.getSliderRangePosition=function(){n.getHandlerSize(),n.options.vertical?(n.handlersPositionPerc[0]>n.handlersPositionPerc[1]?n.rangeBlock.style.top=n.handlersPositionPerc[1]+"%":n.rangeBlock.style.top=n.handlersPositionPerc[0]+"%",n.rangeBlock.style.height=Math.abs(n.handlersPositionPerc[1]-n.handlersPositionPerc[0])+"%"):(n.handlersPositionPerc[0]>n.handlersPositionPerc[1]?n.rangeBlock.style.left=n.handlersPositionPerc[1]+"%":n.rangeBlock.style.left=n.handlersPositionPerc[0]+"%",n.rangeBlock.style.width=Math.abs(n.handlersPositionPerc[1]-n.handlersPositionPerc[0])+"%")},this.moveByMouse=function(e,t,i){var o,s;e.preventDefault(),n.getMinMaxPosition(),o=n.options.vertical?e.clientY-n.handlers[i].getBoundingClientRect().y:e.clientX-n.handlers[i].getBoundingClientRect().x+pageXOffset,s=o/n.sliderLength*100,t.classList.add("slider__handler_active"),document.onmousemove=function(e){if(e.preventDefault,n.options.vertical){var o=(e.clientY-n.slider.getBoundingClientRect().y)/n.slider.getBoundingClientRect().height*100-s;o<=n.maxPositionPerc&&(o=n.maxPositionPerc),o>=n.minPositionPerc&&(o=n.minPositionPerc),t.style.top=o+"%",n.writeNewPosition(t,i,o)}else{var r=(e.clientX-n.slider.getBoundingClientRect().x)/n.slider.getBoundingClientRect().width*100-s;r<=n.minPositionPerc&&(r=n.minPositionPerc),r>=n.maxPositionPerc&&(r=n.maxPositionPerc),t.style.left=r+"%",n.writeNewPosition(t,i,r)}},document.onmouseup=function(){t.classList.remove("slider__handler_active"),document.onmousemove=null}},this.writeNewPosition=function(e,t,i){n.handlersPositionPerc[t]=i+n.handlerSizePerc,n.options.range&&n.getSliderRangePosition(),n.notifyChangedHandlerPosition()},this.moveByClick=function(e){var t,i;e.preventDefault(),n.getMinMaxPosition(),t=n.options.vertical?e.clientY:e.clientX;var o=0;if((i=2==n.options.handlersAmount?n.getNearestHandler(t):n.handlers[0])==n.handlers[1]&&(o=1),n.options.vertical){var s=(t-n.slider.getBoundingClientRect().y)/n.slider.getBoundingClientRect().height*100-n.handlerSizePerc;s<=n.maxPositionPerc&&(s=n.maxPositionPerc),s>=n.minPositionPerc&&(s=n.minPositionPerc),i.style.top=s+"%",n.writeNewPosition(i,o,s)}else{var r=(t-n.slider.getBoundingClientRect().x)/n.slider.getBoundingClientRect().width*100-n.handlerSizePerc;r<=n.minPositionPerc&&(r=n.minPositionPerc),r>=n.maxPositionPerc&&(r=n.maxPositionPerc),i.style.left=r+"%",n.writeNewPosition(i,o,r)}},this.getNearestHandler=function(e){var t,i;return n.options.vertical?(t=Math.abs(n.handlers[0].getBoundingClientRect().y-e),i=Math.abs(n.handlers[1].getBoundingClientRect().y-e)):(t=Math.abs(n.handlers[0].getBoundingClientRect().x-e),i=Math.abs(n.handlers[1].getBoundingClientRect().x-e)),i<t?n.handlers[1]:n.handlers[0]},this.options=e,this.subViewSliderLine=new o.default,this.subViewHandlers=new s.default,this.subViewScale=new a.default,this.subViewIcons=new r.default,this.subViewInput=new l.default,this.handlersPosition=[],this.handlersPositionPerc=[],this.createSlider(e,t),this.getSliderData(),this.options.scale&&this.getScalePosition(),this.resizeListener(),this.subViewHandlers.handlerMouseDown=function(e,t,i){n.moveByMouse(e,t,i)},this.subViewInput.newInputValue=function(e,t){n.notifyChangedInputValue(e,t)},this.subViewSliderLine.sliderClick=function(e){e.target!==n.handlers[0]&&e.target!==n.handlers[1]&&n.moveByClick(e)}};n.View=u},{"./subView/subViewSliderLine":"RWvY","./subView/subViewHandlers":"VwWS","./subView/subViewIcons":"EO17","./subView/subViewInput":"ezLB","./subView/subViewScale":"fXEI"}],mxbi:[function(e,t,n){"use strict";var i=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(n,"__esModule",{value:!0});var o=i(e("./model1")),s=e("./view"),r=function(e,t){var n=this;this.checkOptions=function(e){n.options=e,n.options.minValue=Number(e.minValue),n.options.maxValue=Number(e.maxValue),n.options.startingValue=[Number(e.startingValue[0]),Number(e.startingValue[1])],n.options.step=Number(e.step),n.options.handlersAmount=Number(e.handlersAmount),n.options.minValue>=n.options.maxValue&&console.log("Slider: minValue should not be equal or be more than maxValue");for(var t=0;t<=n.options.startingValue.length;t++)n.options.startingValue[t]>n.options.maxValue?n.options.startingValue[t]=n.options.maxValue:n.options.startingValue[t]<n.options.minValue&&(n.options.startingValue[t]=n.options.minValue);n.options.handlersAmount<1?(n.options.handlersAmount=1,console.log("Slider: handlers amount should be equal either 1 or 2")):n.options.handlersAmount>2&&(n.options.handlersAmount=2,console.log("Slider: handlers amount should be equal either 1 or 2")),2==n.options.handlersAmount&&n.options.startingValue.length<2&&(n.options.startingValue=[n.options.minValue,n.options.maxValue],console.log("Slider: starting value should be defined for every handler")),n.options.step>=Math.abs(n.options.maxValue-n.options.minValue)&&console.log("Slider: step value should  be  less than slider value range"),1==n.options.handlersAmount&&n.options.range&&(n.options.range=!1,console.log("Slider: range option cannot be applied to one handler")),n.options.scaleLegend&&!n.options.scale&&(n.options.scaleLegend=!1,console.log("Slider: scaleLegend option cannot be applied without scale option"))},this.setInitialHandlersPosition=function(){n.getPositionFromValue(),n.options.range&&(n.model.getRangeValue(),n.view.getSliderRangePosition())},this.setHandlersToInputValue=function(e,t){null!=e?(e>n.options.maxValue?e=n.options.maxValue:e<n.options.minValue&&(e=n.options.minValue),n.options.moveBySteps&&(e=Math.round((e-n.options.minValue)/n.options.step)*n.options.step+n.options.minValue),n.model.currentValue[t]=e,n.getPositionFromValue()):n.getValueFromPosition()},this.getValueFromPosition=function(){for(var e=0;e<n.view.handlers.length;e++){var t;if(t=n.options.vertical?(100-n.view.handlersPositionPerc[e])/n.model.valuePercent:n.view.handlersPositionPerc[e]/n.model.valuePercent,n.options.moveBySteps){var i=Math.round(t/n.options.step)*n.options.step;i>n.model.valueRange?n.model.currentValue[e]=n.options.maxValue:n.model.currentValue[e]=n.options.minValue+i;var o=n.model.currentValue[e]-n.options.minValue;n.options.vertical?(n.view.handlersPositionPerc[e]=100-o*n.model.valuePercent,n.view.handlers[e].style.top=n.view.handlersPositionPerc[e]-n.view.handlerSizePerc+"%"):(n.view.handlersPositionPerc[e]=o*n.model.valuePercent,n.view.handlers[e].style.left=n.view.handlersPositionPerc[e]-n.view.handlerSizePerc+"%"),n.options.range&&n.view.getSliderRangePosition()}else n.model.currentValue[e]=n.options.minValue+Math.round(t);n.options.icon&&(n.view.icons[e].innerHTML=String(n.model.currentValue[e]))}if(n.model.getRangeValue(),n.options.rangeInput&&n.options.range&&n.options.handlersAmount>1&&(n.view.rangeInput.value=String(n.model.rangeValue)),n.options.rangeInput&&!n.options.range&&n.options.handlersAmount>1&&(n.view.rangeInput.value=n.model.currentValue[0]+"; "+n.model.currentValue[1]),n.options.valueInputs)for(e=0;e<n.options.handlersAmount;e++)n.view.valueInputs[e].value=""+n.model.currentValue[e];return n.model.currentValue},this.getPositionFromValue=function(){n.view.getMinMaxPosition();for(var e=0;e<n.view.handlers.length;e++){var t,i=n.model.currentValue[e]-n.options.minValue,o=void 0;n.options.vertical?n.options.moveBySteps?((t=Math.round(i/n.options.step)*n.options.step)>n.model.valueRange&&(t=n.model.valueRange),o=100-t*n.model.valuePercent-n.view.handlerSizePerc,n.view.handlers[e].style.top=o+"%",n.model.currentValue[e]=n.options.minValue+t):(o=100-i*n.model.valuePercent-n.view.handlerSizePerc,n.view.handlers[e].style.top=o+"%"):n.options.moveBySteps?((t=Math.round(i/n.options.step)*n.options.step)>n.model.valueRange&&(t=n.model.valueRange),o=t*n.model.valuePercent-n.view.handlerSizePerc,n.view.handlers[e].style.left=o+"%",n.model.currentValue[e]=n.options.minValue+t):(o=i*n.model.valuePercent-n.view.handlerSizePerc,n.view.handlers[e].style.left=o+"%"),n.view.handlersPositionPerc[e]=o+n.view.handlerSizePerc,n.options.icon&&(n.view.icons[e].innerHTML=String(n.model.currentValue[e]))}if(n.model.getRangeValue(),n.options.rangeInput&&n.options.range&&n.options.handlersAmount>1&&(n.view.showRange(),n.view.rangeInput.value=String(n.model.rangeValue)),n.options.rangeInput&&!n.options.range&&n.options.handlersAmount>1&&(n.view.rangeInput.value=n.model.currentValue[0]+"; "+n.model.currentValue[1]),n.options.valueInputs)for(e=0;e<n.options.handlersAmount;e++)n.view.valueInputs[e].value=""+n.model.currentValue[e]},this.checkOptions(e),this.model=new o.default(this.options),this.view=new s.View(this.options,t),this.setInitialHandlersPosition(),this.view.notifyChangedHandlerPosition=function(){n.getValueFromPosition()},this.view.notifyChangedInputValue=function(e,t){n.setHandlersToInputValue(e,t)},this.view.notifyChangedWindow=function(){n.getPositionFromValue()},console.log(this.view),console.log(this.model)};n.Presenter=r},{"./model1":"p9qc","./view":"CBC0"}],QLcG:[function(e,n,i){"use strict";function o(e){return(o="function"==typeof Symbol&&"symbol"==t(Symbol.iterator)?function(e){return t(e)}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":t(e)})(e)}Object.defineProperty(i,"__esModule",{value:!0});var s,r,l,a=e("./src/presenter");s=jQuery,r={minValue:-100,maxValue:100,startingValue:[-50,20],vertical:!1,step:10,moveBySteps:!0,range:!0,rangeInput:!0,valueInputs:!0,handlersAmount:2,scale:!0,scaleLegend:!0,icon:!0},l={init:function(e){return this.each(function(){var t=s.extend({},r,e);this.presenter=new a.Presenter(t,this)})},destroy:function(){return this.each(function(){for(var e=0,t=this.children;e<t.length;e++)t[e].remove()})}},s.fn.slider=function(e){return l[e]?l[e].apply(this,Array.prototype.slice.call(arguments,1)):"object"!==o(e)&&e?void s.error("Метод с именем "+e+" не существует для jQuery.slider"):l.init.apply(this,arguments)}},{"./src/presenter":"mxbi"}]},{},["QLcG"]);
},{}]},{},["EYy0"], null)
//# sourceMappingURL=slider.fce04dc5.js.map