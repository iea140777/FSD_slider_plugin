parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"EYy0":[function(require,module,exports) {
var define;
var e;function t(e){return(t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}parcelRequire=function(n,i,o,s){var r,l="function"==typeof parcelRequire&&parcelRequire,a="function"==typeof require&&require;function u(e,t){if(!i[e]){if(!n[e]){var o="function"==typeof parcelRequire&&parcelRequire;if(!t&&o)return o(e,!0);if(l)return l(e,!0);if(a&&"string"==typeof e)return a(e);var s=new Error("Cannot find module '"+e+"'");throw s.code="MODULE_NOT_FOUND",s}c.resolve=function(t){return n[e][1][t]||t},c.cache={};var r=i[e]=new u.Module(e);n[e][0].call(r.exports,c,r,r.exports,this)}return i[e].exports;function c(e){return u(c.resolve(e))}}u.isParcelRequire=!0,u.Module=function(e){this.id=e,this.bundle=u,this.exports={}},u.modules=n,u.cache=i,u.parent=l,u.register=function(e,t){n[e]=[function(e,n){n.exports=t},{}]};for(var c=0;c<o.length;c++)try{u(o[c])}catch(n){r||(r=n)}if(o.length){var d=u(o[o.length-1]);"object"==("undefined"==typeof exports?"undefined":t(exports))&&"undefined"!=typeof module?module.exports=d:"function"==typeof e&&e.amd&&e(function(){return d})}if(parcelRequire=u,r)throw r;return u}({pjIr:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var i=function(e){var t=this;this.getCustomValues=function(){if(""!=t.options.customValuesList){var e=t.options.customValuesList.split(", ");""!=e&&null!=e||(t.customValueType="none");for(var n=0;n<e.length;n++){if(isNaN(Number(e[n]))){t.customValueType="string";break}t.customValueType="number"}if("number"==t.customValueType)for(n=0;n<e.length;n++)e[n]=Number(e[n]);t.customValuesList=e,t.customStepsAmount=e.length,t.getCustomValuesOptions(e)}else console.log("Slider: customValuesList should contain values")},this.getCustomValuesOptions=function(e){t.options.minValue=e[0],t.options.maxValue=e[e.length-1],t.notifyChangedOptions},this.getInitialCurrentValue=function(){t.currentValue=[];for(var e=0;e<t.options.handlersAmount;e++)if(t.options.customValues){var n=t.options.startingValue[e],i=t.allValues[n].val;t.currentValue[e]=i}else t.currentValue[e]=t.options.startingValue[e]},this.getValueRange=function(){t.valueRange=Math.abs(t.options.maxValue-t.options.minValue)},this.getStepsAmount=function(){t.options.customValues?t.stepsAmount=t.customStepsAmount:t.stepsAmount=Math.ceil(t.valueRange/t.options.step)},this.getStepPercent=function(){t.options.customValues?t.stepPercent=100/(t.stepsAmount-1):t.stepPercent=t.options.step/t.valueRange*100},this.getValuePercent=function(){t.valuePercent=100/t.valueRange},this.getRangeValue=function(){t.rangeValue=Math.abs(t.currentValue[1]-t.currentValue[0])},this.getAllValues=function(){if(t.allValues=[],t.options.customValues)t.getAllCustomValues();else for(var e=0;e<=t.stepsAmount;e++){var n={};n.val=t.options.minValue+t.options.step*e,n.percent=t.stepPercent*e,n.percent>=100&&(n.percent=100,n.val=t.options.maxValue),t.allValues.push(n)}},this.getAllCustomValues=function(){for(var e=0;e<t.stepsAmount;e++){var n={};n.val=t.customValuesList[e],n.percent=t.stepPercent*e,t.allValues.push(n)}},this.options=e,this.options.customValues&&this.getCustomValues(),this.getValueRange(),this.getStepsAmount(),this.getStepPercent(),this.getValuePercent(),this.getAllValues(),this.getInitialCurrentValue(),this.getRangeValue()};n.default=i},{}],RWvY:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var i=function(){var e=this;this.createSliderLine=function(t,n){var i=document.createElement("div");i.classList.add("slider__slider"),n.vertical&&i.classList.add("slider__slider_vertical"),t.append(i);var o=t.querySelector(".slider__slider");return e.addSliderListener(o),o},this.addSliderListener=function(t){t.onclick=function(t){e.sliderClick(t)}}};n.default=i},{}],VwWS:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var i=function(){function e(){var e=this;this.addHandlerListeners=function(t){t[0].onmousedown=function(n){e.handlerMouseDown(n,t[0],0)},t[1]&&(t[1].onmousedown=function(n){e.handlerMouseDown(n,t[1],1)})}}return e.prototype.createHandlers=function(e,t){for(var n=0;n<e.handlersAmount;n++){var i=document.createElement("div");i.classList.add("slider__handler"),e.vertical?i.classList.add("slider__handler_vertical"):i.classList.add("slider__handler_horisontal"),t.append(i)}var o=t.querySelectorAll(".slider__handler");return this.addHandlerListeners(o),o},e}();n.default=i},{}],EO17:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var i=function(){function e(){var e=this;this.getIconsShift=function(){e.icons.forEach(function(t){if(e.options.vertical){var n=t.getBoundingClientRect().height/2;t.style.top=-n+"px";var i=t.getBoundingClientRect().width;t.style.left=-i-10+"px"}else n=t.getBoundingClientRect().width/2,t.style.left=-n+"px",i=t.getBoundingClientRect().height,t.style.top=-i-8+"px"})}}return e.prototype.createIcons=function(e,t,n){this.options=e;for(var i=0;i<t.length;i++){var o=document.createElement("div");o.classList.add("slider__icon"),e.vertical?o.classList.add("slider__icon_vertical"):o.classList.add("slider__icon_horisontal"),t[i].append(o)}var s=n.querySelectorAll(".slider__icon");return this.icons=s,s},e}();n.default=i},{}],ezLB:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var i=function(){function e(){var e=this;this.addInputsListener=function(t){t.forEach(function(n){n.onfocus=function(){n.value="",n.addEventListener("blur",function(i){e.getInputValue(n,t,i)}),n.addEventListener("keydown",function(i){"Enter"==i.code&&e.getInputValue(n,t,i)})}})},this.getInputValue=function(t,n,i){var o=Number(t.value);(""==t.value||isNaN(Number(t.value)))&&(o=void 0),i.target==n[0]?e.newInputValue(o,0):e.newInputValue(o,1)}}return e.prototype.createInputsContainer=function(e,t,n){var i=document.createElement("div");return i.classList.add("slider__inputsContainer"),t.before(i),n.querySelector(".slider__inputsContainer")},e.prototype.createRangeInput=function(e,t){var n=document.createElement("span");n.classList.add("slider__inputLabel"),n.innerText="Range",t.append(n);var i=document.createElement("input");return i.setAttribute("type","text"),i.setAttribute("readonly","true"),i.setAttribute("size","8"),i.classList.add("slider__input","slider__input_range"),n.append(i),t.querySelector(".slider__input_range")},e.prototype.createValueInputs=function(e,t){for(var n=0;n<+e.handlersAmount;n++){var i=document.createElement("span");i.classList.add("slider__inputLabel"),i.innerText="Value "+(n+1),t.append(i);var o=document.createElement("input");o.setAttribute("type","text"),o.setAttribute("size","8"),o.classList.add("slider__input","slider__input_value"),i.append(o)}var s=t.querySelectorAll(".slider__input_value");return this.addInputsListener(s),s},e}();n.default=i},{}],fXEI:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var i=function(){var e=this;this.createScale=function(t,n,i){e.options=t,e.values=i,e.slider=n;for(var o=e.values.length,s=0;s<o;s++){var r=document.createElement("div");r.classList.add("slider__scale-point"),e.options.vertical?r.classList.add("slider__scale-point_vertical"):r.classList.add("slider__scale-point_horisontal"),n.append(r)}e.scalePoints=n.querySelectorAll(".slider__scale-point"),e.scalePointsArray=Array.from(e.scalePoints),e.getScalePosition(),e.options.scaleLegend&&(e.addScaleLegend(),e.getScaleLegendValues())},this.getScalePosition=function(){for(var t=0;t<e.values.length;t++)e.options.vertical?e.scalePointsArray[t].style.top=100-e.values[t].percent+"%":e.scalePointsArray[t].style.left=e.values[t].percent+"%"},this.addScaleLegend=function(){e.scalePoints.forEach(function(t){var n=document.createElement("div");n.classList.add("slider__scale-legend"),e.options.vertical?n.classList.add("slider__scale-legend_vertical"):n.classList.add("slider__scale-legend_horisontal"),t.append(n)}),e.scaleLegend=e.slider.querySelectorAll(".slider__scale-legend"),e.scaleLegendArray=Array.from(e.scaleLegend)},this.getScaleLegendValues=function(){for(var t=0;t<e.values.length;t++)if(e.scaleLegendArray[t].innerText=String(e.values[t].val),e.options.vertical){var n=e.scaleLegendArray[t].getBoundingClientRect().height/2;e.scaleLegendArray[t].style.top=-n+"px"}else n=e.scaleLegendArray[t].getBoundingClientRect().width/2,e.scaleLegendArray[t].style.left=-n+"px"}};n.default=i},{}],CBC0:[function(e,t,n){"use strict";var i=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(n,"__esModule",{value:!0});var o=i(e("./subView/subViewSliderLine")),s=i(e("./subView/subViewHandlers")),r=i(e("./subView/subViewIcons")),l=i(e("./subView/subViewInput")),a=i(e("./subView/subViewScale")),u=function(e,t,n){var i=this;this.createSlider=function(e,t){i.sliderContainer=i.createContainer(e,t),i.slider=i.subViewSliderLine.createSliderLine(i.sliderContainer,e),i.handlers=i.subViewHandlers.createHandlers(e,i.slider),i.options.scale&&(i.scale=i.subViewScale.createScale(e,i.slider,i.values)),i.options.icon&&(i.icons=i.subViewIcons.createIcons(e,i.handlers,i.slider)),(i.options.rangeInput||i.options.valueInputs)&&(i.inputsContainer=i.subViewInput.createInputsContainer(e,i.slider,i.sliderContainer),i.options.rangeInput&&i.options.handlersAmount>1&&(i.rangeInput=i.subViewInput.createRangeInput(e,i.inputsContainer)),i.options.valueInputs&&(i.valueInputs=i.subViewInput.createValueInputs(e,i.inputsContainer)))},this.createContainer=function(e,t){var n=document.createElement("div");return n.classList.add("slider__container"),i.options.vertical?n.classList.add("slider__container_vertical"):n.classList.add("slider__container_horisontal"),t.append(n),t.querySelector(".slider__container")},this.resizeListener=function(){window.addEventListener("resize",function(){i.notifyChangedWindow()})},this.getSliderData=function(){i.getSliderPosition(),i.getSliderLength(),i.getHandlerSize(),i.getMinMaxPosition(),i.options.range&&(i.rangeBlock=i.showRange())},this.getSliderPosition=function(){i.options.vertical?i.sliderPosition=i.slider.getBoundingClientRect().y+pageYOffset:i.sliderPosition=i.slider.getBoundingClientRect().x+pageXOffset},this.getSliderLength=function(){i.options.vertical?i.sliderLength=i.slider.getBoundingClientRect().height:i.sliderLength=i.slider.getBoundingClientRect().width},this.getHandlerSize=function(){i.getSliderLength(),i.options.vertical?(i.handlerSizePerc=i.handlers[0].offsetHeight/2/i.sliderLength*100,i.handlerSizePx=i.handlers[0].offsetHeight):(i.handlerSizePerc=i.handlers[0].offsetWidth/2/i.sliderLength*100,i.handlerSizePx=i.handlers[0].offsetWidth)},this.getMinMaxPosition=function(){i.getHandlerSize,i.options.vertical?(i.maxPosition=i.sliderPosition-i.handlerSizePx/2,i.maxPositionPerc=0-i.handlerSizePerc,i.minPosition=i.maxPosition+i.sliderLength,i.minPositionPerc=100-i.handlerSizePerc):(i.minPosition=i.sliderPosition-i.handlerSizePx/2,i.minPositionPerc=0-i.handlerSizePerc,i.maxPosition=i.minPosition+i.sliderLength,i.maxPositionPerc=100-i.handlerSizePerc),i.positionRange=Math.abs(i.minPosition-i.maxPosition)},this.showRange=function(){var e=document.createElement("div");return e.classList.add("slider__range"),i.options.vertical?(e.style.width=i.slider.getBoundingClientRect().width+2+"px",e.style.left="-1px"):(e.style.height=i.slider.getBoundingClientRect().height+2+"px",e.style.top="-1px"),i.slider.append(e),i.rangeBlock=i.slider.querySelector(".slider__range"),i.getSliderRangePosition(),i.rangeBlock},this.getSliderRangePosition=function(){i.getHandlerSize(),i.options.vertical?(i.handlersPositionPerc[0]>i.handlersPositionPerc[1]?i.rangeBlock.style.top=i.handlersPositionPerc[1]+"%":i.rangeBlock.style.top=i.handlersPositionPerc[0]+"%",i.rangeBlock.style.height=Math.abs(i.handlersPositionPerc[1]-i.handlersPositionPerc[0])+"%"):(i.handlersPositionPerc[0]>i.handlersPositionPerc[1]?i.rangeBlock.style.left=i.handlersPositionPerc[1]+"%":i.rangeBlock.style.left=i.handlersPositionPerc[0]+"%",i.rangeBlock.style.width=Math.abs(i.handlersPositionPerc[1]-i.handlersPositionPerc[0])+"%")},this.moveByMouse=function(e,t,n){var o,s;e.preventDefault(),i.getMinMaxPosition(),o=i.options.vertical?e.clientY-i.handlers[n].getBoundingClientRect().y:e.clientX-i.handlers[n].getBoundingClientRect().x+pageXOffset,s=o/i.sliderLength*100,t.classList.add("slider__handler_active"),document.onmousemove=function(e){if(e.preventDefault,i.options.vertical){var o=(e.clientY-i.slider.getBoundingClientRect().y)/i.slider.getBoundingClientRect().height*100-s;o<=i.maxPositionPerc&&(o=i.maxPositionPerc),o>=i.minPositionPerc&&(o=i.minPositionPerc),t.style.top=o+"%",i.writeNewPosition(t,n,o)}else{var r=(e.clientX-i.slider.getBoundingClientRect().x)/i.slider.getBoundingClientRect().width*100-s;r<=i.minPositionPerc&&(r=i.minPositionPerc),r>=i.maxPositionPerc&&(r=i.maxPositionPerc),t.style.left=r+"%",i.writeNewPosition(t,n,r)}},document.onmouseup=function(){t.classList.remove("slider__handler_active"),document.onmousemove=null}},this.writeNewPosition=function(e,t,n){i.handlersPositionPerc[t]=n+i.handlerSizePerc,i.options.range&&i.getSliderRangePosition(),i.notifyChangedHandlerPosition()},this.moveByClick=function(e){var t,n;e.preventDefault(),i.getMinMaxPosition(),t=i.options.vertical?e.clientY:e.clientX;var o=0;if((n=2==i.options.handlersAmount?i.getNearestHandler(t):i.handlers[0])==i.handlers[1]&&(o=1),i.options.vertical){var s=(t-i.slider.getBoundingClientRect().y)/i.slider.getBoundingClientRect().height*100-i.handlerSizePerc;s<=i.maxPositionPerc&&(s=i.maxPositionPerc),s>=i.minPositionPerc&&(s=i.minPositionPerc),n.style.top=s+"%",i.writeNewPosition(n,o,s)}else{var r=(t-i.slider.getBoundingClientRect().x)/i.slider.getBoundingClientRect().width*100-i.handlerSizePerc;r<=i.minPositionPerc&&(r=i.minPositionPerc),r>=i.maxPositionPerc&&(r=i.maxPositionPerc),n.style.left=r+"%",i.writeNewPosition(n,o,r)}},this.getNearestHandler=function(e){var t,n;return i.options.vertical?(t=Math.abs(i.handlers[0].getBoundingClientRect().y-e),n=Math.abs(i.handlers[1].getBoundingClientRect().y-e)):(t=Math.abs(i.handlers[0].getBoundingClientRect().x-e),n=Math.abs(i.handlers[1].getBoundingClientRect().x-e)),n<t?i.handlers[1]:i.handlers[0]},this.updatePosition=function(){for(var e=0;e<i.handlers.length;e++){var t=i.handlersPositionPerc[e]-i.handlerSizePerc;i.options.vertical?i.handlers[e].style.top=t+"%":i.handlers[e].style.left=t+"%"}},this.options=e,this.values=n,this.subViewSliderLine=new o.default,this.subViewHandlers=new s.default,this.subViewScale=new a.default,this.subViewIcons=new r.default,this.subViewInput=new l.default,this.handlersPosition=[],this.handlersPositionPerc=[],this.createSlider(e,t),this.getSliderData(),this.resizeListener(),this.subViewHandlers.handlerMouseDown=function(e,t,n){i.moveByMouse(e,t,n)},this.subViewInput.newInputValue=function(e,t){i.notifyChangedInputValue(e,t)},this.subViewSliderLine.sliderClick=function(e){e.target!==i.handlers[0]&&e.target!==i.handlers[1]&&i.moveByClick(e)}};n.View=u},{"./subView/subViewSliderLine":"RWvY","./subView/subViewHandlers":"VwWS","./subView/subViewIcons":"EO17","./subView/subViewInput":"ezLB","./subView/subViewScale":"fXEI"}],mxbi:[function(e,t,n){"use strict";var i=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(n,"__esModule",{value:!0});var o=i(e("./model")),s=e("./view"),r=function(e,t){var n=this;this.checkOptions=function(e){n.options=e,n.options.minValue=Number(e.minValue),n.options.maxValue=Number(e.maxValue),n.options.startingValue=[Number(e.startingValue[0]),Number(e.startingValue[1])],n.options.step=Number(e.step),n.options.handlersAmount=Number(e.handlersAmount),n.options.minValue>=n.options.maxValue&&console.log("Slider: minValue should not be equal or be more than maxValue");for(var t=0;t<=n.options.startingValue.length;t++)n.options.startingValue[t]>n.options.maxValue?n.options.startingValue[t]=n.options.maxValue:n.options.startingValue[t]<n.options.minValue&&(n.options.startingValue[t]=n.options.minValue);n.options.handlersAmount<1?(n.options.handlersAmount=1,console.log("Slider: handlers amount should be equal either 1 or 2")):n.options.handlersAmount>2&&(n.options.handlersAmount=2,console.log("Slider: handlers amount should be equal either 1 or 2")),2==n.options.handlersAmount&&n.options.startingValue.length<2&&(n.options.startingValue=[n.options.minValue,n.options.maxValue],console.log("Slider: starting value should be defined for every handler")),n.options.step>=Math.abs(n.options.maxValue-n.options.minValue)&&console.log("Slider: step value should  be  less than slider value range"),1==n.options.handlersAmount&&n.options.range&&(n.options.range=!1,console.log("Slider: range option cannot be applied to one handler")),n.options.scaleLegend&&!n.options.scale&&(n.options.scaleLegend=!1,console.log("Slider: scaleLegend option cannot be applied without scale option")),n.options.customValues&&(n.options.moveBySteps=!0)},this.setInitialHandlersPosition=function(){if(n.options.customValues)for(var e=0;e<n.view.handlers.length;e++){var t=n.options.startingValue[e],i=n.model.allValues[t].percent;n.view.handlersPositionPerc[e]=i,n.options.vertical?(n.view.handlersPositionPerc[e]=100-i,n.view.handlers[e].style.top=100-i-n.view.handlerSizePerc+"%"):(n.view.handlersPositionPerc[e]=i,n.view.handlers[e].style.left=i-n.view.handlerSizePerc+"%")}else n.getPositionFromValue();n.options.range&&(n.model.getRangeValue(),n.view.getSliderRangePosition()),n.setInputIconsValues()},this.setHandlersToInputValue=function(e,t){null!=e?(e>n.options.maxValue?e=n.options.maxValue:e<n.options.minValue&&(e=n.options.minValue),n.model.currentValue[t]=e,n.getPositionFromValue()):n.getValueFromPosition()},this.getValueFromPosition=function(){for(var e=0;e<n.view.handlers.length;e++){var t;t=n.options.vertical?(100-n.view.handlersPositionPerc[e])/n.model.valuePercent:n.view.handlersPositionPerc[e]/n.model.valuePercent,n.options.moveBySteps?(n.getNearestStepPos(),n.options.range&&n.view.getSliderRangePosition()):n.model.currentValue[e]=n.options.minValue+Math.round(t),n.options.icon&&(n.view.icons[e].innerHTML=String(n.model.currentValue[e]),n.view.subViewIcons.getIconsShift())}n.model.getRangeValue(),n.setInputIconsValues()},this.getNearestStepPos=function(){for(var e=function(e){var t;t=n.options.vertical?100-n.view.handlersPositionPerc[e]:n.view.handlersPositionPerc[e];var i=n.model.stepPercent/2,o=n.model.allValues.filter(function(e){return Math.abs(t-e.percent)<=i});o.length>1&&o.length<=2&&(Math.abs(t-o[0].percent)<Math.abs(t-o[1].percent)?o.splice(1,1):o.splice(0,1)),n.options.vertical?n.view.handlersPositionPerc[e]=100-o[0].percent:n.view.handlersPositionPerc[e]=o[0].percent,n.view.updatePosition(),n.model.currentValue[e]=o[0].val},t=0;t<n.view.handlers.length;t++)e(t)},this.getNearestStepVal=function(){for(var e=function(e){var t=n.model.currentValue[e],i=n.options.step/2,o=n.model.allValues.filter(function(e){return Math.abs(e.val-t)<=i});o.length>1&&o.length<=2&&(Math.abs(t-o[0].val)<Math.abs(t-o[1].val)?o.splice(1,1):o.splice(0,1)),n.options.vertical?n.view.handlersPositionPerc[e]=100-o[0].percent:n.view.handlersPositionPerc[e]=o[0].percent,n.model.currentValue[e]=o[0].val},t=0;t<n.view.handlers.length;t++)e(t)},this.getPositionFromValue=function(){n.view.getMinMaxPosition();for(var e=0;e<n.view.handlers.length;e++){var t=n.model.currentValue[e]-n.options.minValue,i=void 0;n.options.vertical?(n.options.moveBySteps?(n.getNearestStepVal(),i=n.view.handlersPositionPerc[e]-n.view.handlerSizePerc):(i=100-t*n.model.valuePercent-n.view.handlerSizePerc,n.view.handlersPositionPerc[e]=i+n.view.handlerSizePerc),n.view.handlers[e].style.top=i+"%"):(n.options.moveBySteps?(n.getNearestStepVal(),i=n.view.handlersPositionPerc[e]-n.view.handlerSizePerc):(i=t*n.model.valuePercent-n.view.handlerSizePerc,n.view.handlersPositionPerc[e]=i+n.view.handlerSizePerc),n.view.handlers[e].style.left=i+"%")}n.model.getRangeValue(),n.setInputIconsValues()},this.setInputIconsValues=function(){if(n.options.icon)for(var e=0;e<n.options.handlersAmount;e++)n.view.icons[e].innerHTML=String(n.model.currentValue[e]),n.view.subViewIcons.getIconsShift();if(n.options.rangeInput&&(n.options.range?n.options.customValues?n.view.rangeInput.value=n.model.currentValue[0]+" - "+n.model.currentValue[1]:n.view.rangeInput.value=String(n.model.rangeValue):n.view.rangeInput.value=n.model.currentValue[0]+"; "+n.model.currentValue[1]),n.options.valueInputs)for(e=0;e<n.options.handlersAmount;e++)n.view.valueInputs[e].value=""+n.model.currentValue[e]},this.checkOptions(e),this.model=new o.default(this.options),this.options.customValues&&(this.model.notifyChangedOptions=function(){n.options=n.model.options}),this.view=new s.View(this.options,t,this.model.allValues),console.log(this.view),console.log(this.model),this.setInitialHandlersPosition(),this.view.notifyChangedHandlerPosition=function(){n.getValueFromPosition()},this.view.notifyChangedInputValue=function(e,t){n.setHandlersToInputValue(e,t)},this.view.notifyChangedWindow=function(){n.getPositionFromValue()}};n.Presenter=r},{"./model":"pjIr","./view":"CBC0"}],QLcG:[function(e,n,i){"use strict";function o(e){return(o="function"==typeof Symbol&&"symbol"==t(Symbol.iterator)?function(e){return t(e)}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":t(e)})(e)}Object.defineProperty(i,"__esModule",{value:!0});var s,r,l,a=e("./src/presenter");s=jQuery,r={minValue:-100,maxValue:100,startingValue:[-50,20],vertical:!1,step:10,moveBySteps:!0,range:!0,rangeInput:!0,valueInputs:!0,handlersAmount:2,scale:!0,scaleLegend:!0,icon:!0,customValues:!1,customValuesList:""},l={init:function(e){return this.each(function(){var t=s.extend({},r,e);this.presenter=new a.Presenter(t,this)})},destroy:function(){return this.each(function(){for(var e=0,t=this.children;e<t.length;e++)t[e].remove()})}},s.fn.slider=function(e){return l[e]?l[e].apply(this,Array.prototype.slice.call(arguments,1)):"object"!==o(e)&&e?void s.error("Метод с именем "+e+" не существует для jQuery.slider"):l.init.apply(this,arguments)}},{"./src/presenter":"mxbi"}]},{},["QLcG"]);
},{}]},{},["EYy0"], null)
//# sourceMappingURL=slider.5d5dde89.js.map