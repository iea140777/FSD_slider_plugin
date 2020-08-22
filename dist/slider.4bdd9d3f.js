// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"node_modules/@babel/runtime/helpers/interopRequireDefault.js":[function(require,module,exports) {
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}

module.exports = _interopRequireDefault;
},{}],"node_modules/@babel/runtime/helpers/typeof.js":[function(require,module,exports) {
function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    module.exports = _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    module.exports = _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

module.exports = _typeof;
},{}],"src/model.ts":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Model =
/** @class */
function () {
  // customValueType: string;
  function Model(options) {
    var _this = this;

    this.getCustomValues = function () {
      if (_this.options.customValuesList == '') {
        console.log('Slider: customValuesList should contain values');
        return;
      } else {
        var list = _this.options.customValuesList;
        var valArr = list.split(', ');
        _this.customValuesList = valArr;
        _this.customStepsAmount = valArr.length;

        _this.getCustomValuesOptions(valArr);
      }
    };

    this.getCustomValuesOptions = function (arr) {
      _this.options.minValue = arr[0];
      _this.options.maxValue = arr[arr.length - 1];

      if (_this.options.startingValue[0] > arr.length || _this.options.startingValue[1] > arr.length) {
        _this.options.startingValue = [0, arr.length - 1];
      }

      _this.notifyChangedOptions;
    };

    this.getInitialCurrentValue = function () {
      _this.currentValue = [];

      for (var i = 0; i < _this.options.handlersAmount; i++) {
        if (_this.options.customValues) {
          if (_this.allValues.length == 0) {
            return;
          } else {
            var _index = _this.options.startingValue[i];
            var _val = _this.allValues[_index].val;
            _this.currentValue[i] = _val;
          }
        } else {
          _this.currentValue[i] = _this.options.startingValue[i];
        }
      }
    };

    this.getValueRange = function () {
      _this.valueRange = Math.abs(_this.options.maxValue - _this.options.minValue);
    };

    this.getStepsAmount = function () {
      if (_this.options.customValues) {
        _this.stepsAmount = _this.customStepsAmount;
      } else {
        _this.stepsAmount = Math.ceil(_this.valueRange / _this.options.step);
      }
    };

    this.getStepPercent = function () {
      if (_this.options.customValues) {
        _this.stepPercent = 100 / (_this.stepsAmount - 1);
      } else {
        _this.stepPercent = _this.options.step / _this.valueRange * 100;
      }
    };

    this.getValuePercent = function () {
      _this.valuePercent = 100 / _this.valueRange;
    };

    this.getRangeValue = function () {
      _this.rangeValue = Math.abs(_this.currentValue[1] - _this.currentValue[0]);
    };

    this.getAllValues = function () {
      _this.allValues = [];

      if (_this.options.customValues) {
        _this.getAllCustomValues();
      } else {
        for (var i = 0; i <= _this.stepsAmount; i++) {
          var _value = {};
          _value.val = _this.options.minValue + _this.options.step * i;
          _value.percent = _this.stepPercent * i;

          if (_value.percent >= 100) {
            _value.percent = 100;
            _value.val = _this.options.maxValue;
          }

          _this.allValues.push(_value);
        }
      } // console.log(this.allValues);

    };

    this.getAllCustomValues = function () {
      for (var i = 0; i < _this.stepsAmount; i++) {
        var _value = {};
        _value.val = _this.customValuesList[i];
        _value.percent = _this.stepPercent * i;

        _this.allValues.push(_value);
      }
    };

    this.options = options;

    if (this.options.customValues) {
      this.getCustomValues();
    }

    this.getValueRange(), this.getStepsAmount(), this.getStepPercent(), this.getValuePercent(), this.getAllValues(), this.getInitialCurrentValue(), this.getRangeValue();
  }

  return Model;
}();

exports["default"] = Model;
},{}],"src/subView/subViewSliderLine.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var SubViewSliderLine =
/** @class */
function () {
  function SubViewSliderLine() {
    var _this = this;

    this.createSliderLine = function (sliderContainer, options) {
      var sliderLine = document.createElement('div');
      sliderLine.classList.add('slider__slider');

      if (options.vertical) {
        sliderLine.classList.add('slider__slider_vertical');
      }

      sliderContainer.append(sliderLine);
      var slider = sliderContainer.querySelector('.slider__slider');

      _this.addSliderListener(slider);

      return slider;
    };

    this.addSliderListener = function (slider) {
      slider.onclick = function (e) {
        e.preventDefault();

        _this.sliderClick(e);
      };

      slider.ondblclick = function (e) {
        e.preventDefault();
      };
    };
  }

  return SubViewSliderLine;
}();

exports["default"] = SubViewSliderLine;
},{}],"src/subView/subViewHandlers.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var SubViewHandlers =
/** @class */
function () {
  function SubViewHandlers() {
    var _this = this;

    this.addHandlerListeners = function (handlers) {
      handlers[0].addEventListener('mousedown', function (e) {
        e.preventDefault();

        _this.handlerMouseDown(e, handlers[0], 0);
      });
      handlers[0].addEventListener('touchstart', function (e) {
        e.preventDefault();

        _this.handlerTouchStart(e, handlers[0], 0);
      });

      if (handlers[1]) {
        handlers[1].addEventListener('mousedown', function (e) {
          e.preventDefault();

          _this.handlerMouseDown(e, handlers[1], 1);
        });
        handlers[1].addEventListener('touchstart', function (e) {
          e.preventDefault();

          _this.handlerTouchStart(e, handlers[1], 1);
        });
      }
    };
  }

  SubViewHandlers.prototype.createHandlers = function (options, slider) {
    for (var i = 0; i < options.handlersAmount; i++) {
      var handler = document.createElement('div');
      handler.classList.add('slider__handler');

      if (options.vertical) {
        handler.classList.add('slider__handler_vertical');
      } else {
        handler.classList.add('slider__handler_horisontal');
      }

      slider.append(handler);
    }

    var handlers = slider.querySelectorAll('.slider__handler');
    this.addHandlerListeners(handlers);
    return handlers;
  };

  return SubViewHandlers;
}();

exports["default"] = SubViewHandlers;
},{}],"src/subView/subViewIcons.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var SubViewIcons =
/** @class */
function () {
  function SubViewIcons() {
    var _this = this;

    this.getIconsShift = function () {
      _this.icons.forEach(function (icon) {
        if (_this.options.vertical) {
          var shiftX = icon.getBoundingClientRect().height / 2;
          icon.style.top = -shiftX + 'px';
          var shiftY = icon.getBoundingClientRect().width;
          icon.style.left = -shiftY - 10 + 'px';
        } else {
          var shiftX = icon.getBoundingClientRect().width / 2;
          icon.style.left = -shiftX + 'px';
          var shiftY = icon.getBoundingClientRect().height;
          icon.style.top = -shiftY - 8 + 'px';
        }
      });
    };
  }

  SubViewIcons.prototype.createIcons = function (options, handlers, slider) {
    this.options = options;

    for (var i = 0; i < handlers.length; i++) {
      var icon = document.createElement('div');
      icon.classList.add('slider__icon');

      if (options.vertical) {
        icon.classList.add('slider__icon_vertical');
      } else {
        icon.classList.add('slider__icon_horisontal');
      }

      handlers[i].append(icon);
    }

    var icons = slider.querySelectorAll('.slider__icon');
    this.icons = icons;
    return icons;
  };

  return SubViewIcons;
}();

exports["default"] = SubViewIcons;
},{}],"src/subView/subViewInput.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var SubViewInput =
/** @class */
function () {
  function SubViewInput() {
    var _this = this;

    this.addInputsListener = function (inputs) {
      inputs.forEach(function (input) {
        input.onfocus = function () {
          input.value = '';
          input.addEventListener('blur', function (e) {
            _this.getInputValue(input, inputs, e);
          });
          input.addEventListener('keydown', function (e) {
            if (e.code == 'Enter') {
              _this.getInputValue(input, inputs, e);
            }
          });
        };
      });
    };

    this.getInputValue = function (input, inputs, e) {
      var newInputValue = Number(input.value);

      if (input.value == '' || isNaN(Number(input.value))) {
        newInputValue = undefined;
      }

      if (e.target == inputs[0]) {
        _this.newInputValue(newInputValue, 0);
      } else {
        _this.newInputValue(newInputValue, 1);
      }
    };
  }

  SubViewInput.prototype.createInputsContainer = function (options, slider, sliderContainer) {
    var _container = document.createElement('div');

    _container.classList.add('slider__inputsContainer');

    slider.before(_container);
    var inputsContainer = sliderContainer.querySelector('.slider__inputsContainer');
    return inputsContainer;
  };

  SubViewInput.prototype.createRangeInput = function (options, inputsContainer) {
    var inputLabel = document.createElement('span');
    inputLabel.classList.add('slider__inputLabel');
    inputLabel.innerText = 'Range';
    inputsContainer.append(inputLabel);
    var rangeInput = document.createElement('input');
    rangeInput.setAttribute('type', 'text');
    rangeInput.setAttribute('readonly', 'true');
    rangeInput.setAttribute('size', 'auto');
    rangeInput.classList.add('slider__input', 'slider__input_range');
    inputLabel.append(rangeInput);
    var input = inputsContainer.querySelector('.slider__input_range');
    return input;
  };

  SubViewInput.prototype.createValueInputs = function (options, inputsContainer) {
    for (var i = 0; i < +options.handlersAmount; i++) {
      var inputLabel = document.createElement('span');
      inputLabel.classList.add('slider__inputLabel');
      inputLabel.innerText = "Value " + (i + 1);
      inputsContainer.append(inputLabel);
      var valueInput = document.createElement('input');
      valueInput.setAttribute('type', 'text');
      valueInput.setAttribute('size', 'auto');
      valueInput.classList.add('slider__input', 'slider__input_value');
      inputLabel.append(valueInput);
    }

    var inputs = inputsContainer.querySelectorAll('.slider__input_value');
    this.addInputsListener(inputs);
    return inputs;
  };

  return SubViewInput;
}();

exports["default"] = SubViewInput;
},{}],"src/subView/subViewScale.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var SubViewScale =
/** @class */
function () {
  function SubViewScale() {
    var _this = this;

    this.createScale = function (options, slider, values) {
      _this.options = options;
      _this.values = values;
      _this.slider = slider;
      var pointsAmount = _this.values.length;

      for (var i = 0; i < pointsAmount; i++) {
        var scalePoint = document.createElement('div');
        scalePoint.classList.add('slider__scale-point');

        if (_this.options.vertical) {
          scalePoint.classList.add('slider__scale-point_vertical');
        } else {
          scalePoint.classList.add('slider__scale-point_horisontal');
        }

        slider.append(scalePoint);
      }

      _this.scalePoints = slider.querySelectorAll('.slider__scale-point');
      _this.scalePointsArray = Array.from(_this.scalePoints);

      _this.getScalePosition();

      if (_this.options.scaleLegend) {
        _this.addScaleLegend();

        _this.getScaleLegendValues();
      }
    };

    this.getScalePosition = function () {
      for (var i = 0; i < _this.values.length; i++) {
        if (_this.options.vertical) {
          _this.scalePointsArray[i].style.top = 100 - _this.values[i].percent + '%';
        } else {
          _this.scalePointsArray[i].style.left = _this.values[i].percent + '%';
        }
      }
    };

    this.addScaleLegend = function () {
      _this.scalePoints.forEach(function (scalePoint) {
        var legend = document.createElement('div');
        legend.classList.add('slider__scale-legend');

        if (_this.options.vertical) {
          legend.classList.add('slider__scale-legend_vertical');
        } else {
          legend.classList.add('slider__scale-legend_horisontal');
        }

        scalePoint.append(legend);
      });

      _this.scaleLegend = _this.slider.querySelectorAll('.slider__scale-legend');
      _this.scaleLegendArray = Array.from(_this.scaleLegend);
    };

    this.getScaleLegendValues = function () {
      for (var i = 0; i < _this.values.length; i++) {
        _this.scaleLegendArray[i].innerText = String(_this.values[i].val);

        if (_this.options.vertical) {
          var shift = _this.scaleLegendArray[i].getBoundingClientRect().height / 2;
          _this.scaleLegendArray[i].style.top = -shift + 'px';
        } else {
          var shift = _this.scaleLegendArray[i].getBoundingClientRect().width / 2;
          _this.scaleLegendArray[i].style.left = -shift + 'px';
        }
      }
    };
  }

  return SubViewScale;
}();

exports["default"] = SubViewScale;
},{}],"src/view.ts":[function(require,module,exports) {
'use strict';

var __importDefault = void 0 && (void 0).__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var subViewSliderLine_1 = __importDefault(require("./subView/subViewSliderLine"));

var subViewHandlers_1 = __importDefault(require("./subView/subViewHandlers"));

var subViewIcons_1 = __importDefault(require("./subView/subViewIcons"));

var subViewInput_1 = __importDefault(require("./subView/subViewInput"));

var subViewScale_1 = __importDefault(require("./subView/subViewScale"));

var View =
/** @class */
function () {
  function View(options, container, values) {
    var _this = this;

    this.createSlider = function (options, container) {
      _this.sliderContainer = _this.createContainer(options, container);
      _this.slider = _this.subViewSliderLine.createSliderLine(_this.sliderContainer, options);
      _this.handlers = _this.subViewHandlers.createHandlers(options, _this.slider);

      if (_this.options.scale) {
        _this.scale = _this.subViewScale.createScale(options, _this.slider, _this.values);
      }

      if (_this.options.icon) {
        _this.icons = _this.subViewIcons.createIcons(options, _this.handlers, _this.slider);
      }

      if (_this.options.rangeInput || _this.options.valueInputs) {
        _this.inputsContainer = _this.subViewInput.createInputsContainer(options, _this.slider, _this.sliderContainer);

        if (_this.options.rangeInput && _this.options.handlersAmount > 1) {
          _this.rangeInput = _this.subViewInput.createRangeInput(options, _this.inputsContainer);
        }

        if (_this.options.valueInputs) {
          _this.valueInputs = _this.subViewInput.createValueInputs(options, _this.inputsContainer);
        }
      }
    };

    this.createContainer = function (options, container) {
      var _cont = document.createElement('div');

      _cont.classList.add('slider__container');

      if (_this.options.vertical) {
        _cont.classList.add('slider__container_vertical');
      } else {
        _cont.classList.add('slider__container_horisontal');
      }

      container.append(_cont);
      var sliderContainer = container.querySelector('.slider__container');
      return sliderContainer;
    };

    this.resizeListener = function () {
      var resize = function resize() {
        _this.changedWindow();
      };

      window.addEventListener('resize', resize);
    };

    this.changedWindow = function () {
      _this.getSliderData();

      _this.notifyChangedSliderData();
    };

    this.getSliderData = function () {
      _this.getSliderPosition();

      _this.getSliderLength();

      _this.getHandlerSize();

      _this.getMinMaxPosition();

      if (_this.options.range) {
        _this.rangeBlock = _this.showRange();
      }
    };

    this.getSliderPosition = function () {
      if (_this.options.vertical) {
        _this.sliderPosition = _this.slider.getBoundingClientRect().y + pageYOffset;
      } else {
        _this.sliderPosition = _this.slider.getBoundingClientRect().x + pageXOffset;
      }
    };

    this.getSliderLength = function () {
      if (_this.options.vertical) {
        _this.sliderLength = _this.slider.getBoundingClientRect().height;
      } else {
        _this.sliderLength = _this.slider.getBoundingClientRect().width;
      }
    };

    this.getHandlerSize = function () {
      _this.getSliderLength();

      if (_this.options.vertical) {
        _this.handlerSizePerc = _this.handlers[0].offsetHeight / 2 / _this.sliderLength * 100;
        _this.handlerSizePx = _this.handlers[0].offsetHeight;
      } else {
        _this.handlerSizePerc = _this.handlers[0].offsetWidth / 2 / _this.sliderLength * 100;
        _this.handlerSizePx = _this.handlers[0].offsetWidth;
      }
    };

    this.getMinMaxPosition = function () {
      _this.getHandlerSize;

      if (_this.options.vertical) {
        _this.maxPosition = _this.sliderPosition - _this.handlerSizePx / 2;
        _this.maxPositionPerc = 0 - _this.handlerSizePerc;
        _this.minPosition = _this.maxPosition + _this.sliderLength;
        _this.minPositionPerc = 100 - _this.handlerSizePerc;
      } else {
        _this.minPosition = _this.sliderPosition - _this.handlerSizePx / 2;
        _this.minPositionPerc = 0 - _this.handlerSizePerc;
        _this.maxPosition = _this.minPosition + _this.sliderLength;
        _this.maxPositionPerc = 100 - _this.handlerSizePerc;
      }

      _this.positionRange = Math.abs(_this.minPosition - _this.maxPosition);
    };

    this.showRange = function () {
      var rangeBlock = document.createElement('div');
      rangeBlock.classList.add('slider__range');

      if (_this.options.vertical) {
        rangeBlock.style.width = _this.slider.getBoundingClientRect().width + 2 + 'px';
        rangeBlock.style.left = -1 + 'px';
      } else {
        rangeBlock.style.height = _this.slider.getBoundingClientRect().height + 2 + 'px';
        rangeBlock.style.top = -1 + 'px';
      }

      _this.slider.append(rangeBlock);

      _this.rangeBlock = _this.slider.querySelector('.slider__range');

      _this.getSliderRangePosition();

      return _this.rangeBlock;
    };

    this.getSliderRangePosition = function () {
      _this.getHandlerSize();

      if (_this.options.vertical) {
        if (_this.handlersPositionPerc[0] > _this.handlersPositionPerc[1]) {
          _this.rangeBlock.style.top = _this.handlersPositionPerc[1] + '%';
        } else {
          _this.rangeBlock.style.top = _this.handlersPositionPerc[0] + '%';
        }

        _this.rangeBlock.style.height = Math.abs(_this.handlersPositionPerc[1] - _this.handlersPositionPerc[0]) + '%';
      } else {
        if (_this.handlersPositionPerc[0] > _this.handlersPositionPerc[1]) {
          _this.rangeBlock.style.left = _this.handlersPositionPerc[1] + '%';
        } else {
          _this.rangeBlock.style.left = _this.handlersPositionPerc[0] + '%';
        }

        _this.rangeBlock.style.width = Math.abs(_this.handlersPositionPerc[1] - _this.handlersPositionPerc[0]) + '%';
      }
    };

    this.moveByMouse = function (e, handler, num) {
      e.preventDefault();

      _this.getMinMaxPosition();

      var shift;
      var shiftXPerc;

      if (_this.options.vertical) {
        shift = e.clientY - _this.handlers[num].getBoundingClientRect().y;
      } else {
        shift = e.clientX - _this.handlers[num].getBoundingClientRect().x;
      }

      shiftXPerc = shift / _this.sliderLength * 100;
      handler.classList.add('slider__handler_active');

      document.onmousemove = function (e) {
        e.preventDefault;
        var mousePos;
        var mouseposPerc;

        if (_this.options.vertical) {
          mousePos = e.clientY;
          mouseposPerc = (mousePos - _this.slider.getBoundingClientRect().y) / _this.slider.getBoundingClientRect().height * 100;
          var newTop = mouseposPerc - shiftXPerc;

          if (newTop <= _this.maxPositionPerc) {
            newTop = _this.maxPositionPerc;
          }

          if (newTop >= _this.minPositionPerc) {
            newTop = _this.minPositionPerc;
          }

          handler.style.top = newTop + '%';

          _this.writeNewPosition(handler, num, newTop);
        } else {
          mousePos = e.clientX;
          mouseposPerc = (mousePos - _this.slider.getBoundingClientRect().x) / _this.slider.getBoundingClientRect().width * 100;
          var newLeft = mouseposPerc - shiftXPerc;

          if (newLeft <= _this.minPositionPerc) {
            newLeft = _this.minPositionPerc;
          }

          if (newLeft >= _this.maxPositionPerc) {
            newLeft = _this.maxPositionPerc;
          }

          handler.style.left = newLeft + '%';

          _this.writeNewPosition(handler, num, newLeft);
        }
      };

      document.onmouseup = function () {
        handler.classList.remove('slider__handler_active');
        document.onmousemove = null;
      };
    };

    this.moveByTouch = function (e, handler, num) {
      e.preventDefault();

      _this.getMinMaxPosition();

      var shift;
      var shiftXPerc;

      if (_this.options.vertical) {
        shift = e.changedTouches[0].clientY - _this.handlers[num].getBoundingClientRect().y;
      } else {
        shift = e.changedTouches[0].clientX - _this.handlers[num].getBoundingClientRect().x;
      }

      shiftXPerc = shift / _this.sliderLength * 100;
      handler.classList.add('slider__handler_active');

      document.ontouchmove = function (e) {
        e.preventDefault;
        var touchPos;
        var mouseposPerc;

        if (_this.options.vertical) {
          touchPos = e.changedTouches[0].clientY;
          mouseposPerc = (touchPos - _this.slider.getBoundingClientRect().y) / _this.slider.getBoundingClientRect().height * 100;
          var newTop = mouseposPerc - shiftXPerc;

          if (newTop <= _this.maxPositionPerc) {
            newTop = _this.maxPositionPerc;
          }

          if (newTop >= _this.minPositionPerc) {
            newTop = _this.minPositionPerc;
          }

          handler.style.top = newTop + '%';

          _this.writeNewPosition(handler, num, newTop);
        } else {
          touchPos = e.changedTouches[0].clientX;
          mouseposPerc = (touchPos - _this.slider.getBoundingClientRect().x) / _this.slider.getBoundingClientRect().width * 100;
          var newLeft = mouseposPerc - shiftXPerc;

          if (newLeft <= _this.minPositionPerc) {
            newLeft = _this.minPositionPerc;
          }

          if (newLeft >= _this.maxPositionPerc) {
            newLeft = _this.maxPositionPerc;
          }

          handler.style.left = newLeft + '%';

          _this.writeNewPosition(handler, num, newLeft);
        }
      };

      document.ontouchend = function () {
        handler.classList.remove('slider__handler_active');
        document.ontouchmove = null;
      };
    };

    this.writeNewPosition = function (handler, num, newPos) {
      _this.handlersPositionPerc[num] = newPos + _this.handlerSizePerc;

      if (_this.options.range) {
        _this.getSliderRangePosition();
      }

      _this.notifyChangedHandlerPosition();
    };

    this.moveByClick = function (e) {
      e.preventDefault();

      _this.getMinMaxPosition();

      var clickPosition;

      if (_this.options.vertical) {
        clickPosition = e.clientY;
      } else {
        clickPosition = e.clientX;
      }

      var handlerToMove;

      if (_this.options.handlersAmount == 2) {
        handlerToMove = _this.getNearestHandler(clickPosition);
      } else {
        handlerToMove = _this.handlers[0];
      }

      var num = 0;

      if (handlerToMove == _this.handlers[1]) {
        num = 1;
      }

      var clickPosPerc;

      if (_this.options.vertical) {
        clickPosPerc = (clickPosition - _this.slider.getBoundingClientRect().y) / _this.slider.getBoundingClientRect().height * 100;
        var newTop = clickPosPerc - _this.handlerSizePerc;

        if (newTop <= _this.maxPositionPerc) {
          newTop = _this.maxPositionPerc;
        }

        if (newTop >= _this.minPositionPerc) {
          newTop = _this.minPositionPerc;
        }

        handlerToMove.style.top = newTop + '%';

        _this.writeNewPosition(handlerToMove, num, newTop);
      } else {
        clickPosPerc = (clickPosition - _this.slider.getBoundingClientRect().x) / _this.slider.getBoundingClientRect().width * 100;
        var newLeft = clickPosPerc - _this.handlerSizePerc;

        if (newLeft <= _this.minPositionPerc) {
          newLeft = _this.minPositionPerc;
        }

        if (newLeft >= _this.maxPositionPerc) {
          newLeft = _this.maxPositionPerc;
        }

        handlerToMove.style.left = newLeft + '%';

        _this.writeNewPosition(handlerToMove, num, newLeft);
      }
    };

    this.getNearestHandler = function (position) {
      var a, b;

      if (_this.options.vertical) {
        a = Math.abs(_this.handlers[0].getBoundingClientRect().y - position);
        b = Math.abs(_this.handlers[1].getBoundingClientRect().y - position);
      } else {
        a = Math.abs(_this.handlers[0].getBoundingClientRect().x - position);
        b = Math.abs(_this.handlers[1].getBoundingClientRect().x - position);
      }

      if (b < a) {
        return _this.handlers[1];
      } else {
        return _this.handlers[0];
      }
    };

    this.updatePosition = function () {
      for (var i = 0; i < _this.handlers.length; i++) {
        var newPos = _this.handlersPositionPerc[i] - _this.handlerSizePerc;

        if (_this.options.vertical) {
          _this.handlers[i].style.top = newPos + '%';
        } else {
          _this.handlers[i].style.left = newPos + '%';
        }
      }

      if (_this.options.range) {
        _this.getSliderRangePosition();
      }
    };

    this.options = options;
    this.values = values;
    this.subViewSliderLine = new subViewSliderLine_1["default"]();
    this.subViewHandlers = new subViewHandlers_1["default"]();
    this.subViewScale = new subViewScale_1["default"]();
    this.subViewIcons = new subViewIcons_1["default"]();
    this.subViewInput = new subViewInput_1["default"]();
    this.handlersPosition = [];
    this.handlersPositionPerc = [];
    this.createSlider(options, container);
    this.getSliderData();
    this.resizeListener();

    this.subViewHandlers.handlerMouseDown = function (e, handler, num) {
      _this.moveByMouse(e, handler, num);
    };

    this.subViewHandlers.handlerTouchStart = function (e, handler, num) {
      _this.moveByTouch(e, handler, num);
    };

    this.subViewInput.newInputValue = function (newInputValue, num) {
      _this.notifyChangedInputValue(newInputValue, num);
    };

    this.subViewSliderLine.sliderClick = function (e) {
      if (e.target !== _this.handlers[0] && e.target !== _this.handlers[1]) {
        _this.moveByClick(e);
      }
    };
  }

  return View;
}();

exports.View = View;
},{"./subView/subViewSliderLine":"src/subView/subViewSliderLine.ts","./subView/subViewHandlers":"src/subView/subViewHandlers.ts","./subView/subViewIcons":"src/subView/subViewIcons.ts","./subView/subViewInput":"src/subView/subViewInput.ts","./subView/subViewScale":"src/subView/subViewScale.ts"}],"src/options.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Options =
/** @class */
function () {
  function Options(options) {
    var _this = this;

    this.checkOptions = function (options) {
      _this.options.minValue = Number(options.minValue);
      _this.options.maxValue = Number(options.maxValue);
      _this.options.startingValue = [Number(options.startingValue[0]), Number(options.startingValue[1])];
      _this.options.step = Number(options.step);
      _this.options.handlersAmount = Number(options.handlersAmount);

      if (_this.options.minValue >= _this.options.maxValue) {
        console.log('Slider: minValue should not be equal or be more than maxValue');
      }

      for (var i = 0; i <= _this.options.startingValue.length; i++) {
        if (_this.options.startingValue[i] > _this.options.maxValue) {
          _this.options.startingValue[i] = _this.options.maxValue;
        } else if (_this.options.startingValue[i] < _this.options.minValue) {
          _this.options.startingValue[i] = _this.options.minValue;
        }
      }

      if (_this.options.handlersAmount < 1) {
        _this.options.handlersAmount = 1;
        console.log('Slider: handlers amount should be equal either 1 or 2');
      } else if (_this.options.handlersAmount > 2) {
        _this.options.handlersAmount = 2;
        console.log('Slider: handlers amount should be equal either 1 or 2');
      }

      if (_this.options.handlersAmount == 2 && _this.options.startingValue.length < 2) {
        _this.options.startingValue = [_this.options.minValue, _this.options.maxValue];
        console.log('Slider: starting value should be defined for every handler');
      }

      if (_this.options.step >= Math.abs(_this.options.maxValue - _this.options.minValue)) {
        console.log('Slider: step value should  be  less than slider value range');
      }

      if (_this.options.handlersAmount == 1 && _this.options.range) {
        _this.options.range = false;
        console.log('Slider: range option cannot be applied to one handler');
      }

      if (_this.options.scaleLegend && !_this.options.scale) {
        _this.options.scaleLegend = false;
        console.log('Slider: scaleLegend option cannot be applied without scale option');
      }

      if (_this.options.customValues) {
        _this.options.moveBySteps = true;
      }
    };

    this.options = options;
    this.checkOptions(options);
  }

  return Options;
}();

exports.Options = Options;
},{}],"src/presenter.ts":[function(require,module,exports) {
"use strict";

var __importDefault = void 0 && (void 0).__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var model_1 = __importDefault(require("./model"));

var view_1 = require("./view");

var options_1 = require("./options");

var Presenter =
/** @class */
function () {
  function Presenter(options, container) {
    var _this = this;

    this.setInitialHandlersPosition = function () {
      if (_this.options.customValues) {
        for (var i = 0; i < _this.view.handlers.length; i++) {
          var _index = _this.options.startingValue[i];
          var _pos = _this.model.allValues[_index].percent;
          _this.view.handlersPositionPerc[i] = _pos;

          if (_this.options.vertical) {
            _this.view.handlersPositionPerc[i] = 100 - _pos;
            _this.view.handlers[i].style.top = 100 - _pos - _this.view.handlerSizePerc + '%';
          } else {
            _this.view.handlersPositionPerc[i] = _pos;
            _this.view.handlers[i].style.left = _pos - _this.view.handlerSizePerc + '%';
          }
        }
      } else {
        _this.getPositionFromValue();
      }

      if (_this.options.range) {
        _this.model.getRangeValue();

        _this.view.getSliderRangePosition();
      }

      _this.setInputIconsValues();
    };

    this.setHandlersToInputValue = function (inputValue, num) {
      if (inputValue == undefined) {
        _this.getValueFromPosition();

        return;
      } else if (inputValue > _this.options.maxValue) {
        inputValue = _this.options.maxValue;
      } else if (inputValue < _this.options.minValue) {
        inputValue = _this.options.minValue;
      }

      _this.model.currentValue[num] = inputValue;

      _this.getPositionFromValue();
    };

    this.getValueFromPosition = function () {
      for (var i = 0; i < _this.view.handlers.length; i++) {
        var computedValue = void 0;

        if (_this.options.vertical) {
          computedValue = (100 - _this.view.handlersPositionPerc[i]) / _this.model.valuePercent;
        } else {
          computedValue = _this.view.handlersPositionPerc[i] / _this.model.valuePercent;
        }

        if (_this.options.moveBySteps) {
          _this.getNearestStepPos();

          if (_this.options.range) {
            _this.view.getSliderRangePosition();
          }
        } else {
          _this.model.currentValue[i] = _this.options.minValue + Math.round(computedValue);
        }

        if (_this.options.icon) {
          _this.view.icons[i].innerHTML = String(_this.model.currentValue[i]);

          _this.view.subViewIcons.getIconsShift();
        }
      }

      if (_this.options.range) {
        _this.model.getRangeValue();

        _this.view.getSliderRangePosition();
      }

      _this.setInputIconsValues();
    };

    this.getNearestStepPos = function () {
      for (var i = 0; i < _this.view.handlers.length; i++) {
        var pos = void 0;

        if (_this.options.vertical) {
          pos = 100 - _this.view.handlersPositionPerc[i];
        } else {
          pos = _this.view.handlersPositionPerc[i];
        }

        var n = void 0;
        n = pos / _this.model.stepPercent;

        if (n > _this.model.allValues.length - 2) {
          var _a1 = _this.model.allValues.length - 1,
              _a2 = _this.model.allValues.length - 2;

          var _lastStepPerc = Math.abs(_this.model.allValues[_a1].percent - _this.model.allValues[_a2].percent);

          if (Math.abs(pos - _this.model.allValues[_a1].percent) <= _lastStepPerc / 2) {
            n = _a1;
          } else {
            n = _a2;
          }
        } else {
          n = Math.round(pos / _this.model.stepPercent);
        }

        if (_this.options.vertical) {
          _this.view.handlersPositionPerc[i] = 100 - _this.model.allValues[n].percent;
        } else {
          _this.view.handlersPositionPerc[i] = _this.model.allValues[n].percent;
        }

        _this.view.updatePosition();

        _this.model.currentValue[i] = _this.model.allValues[n].val;
      }
    };

    this.getNearestStepVal = function () {
      for (var i = 0; i < _this.view.handlers.length; i++) {
        var _val = void 0;

        _val = _this.model.currentValue[i];

        if (!_this.options.customValues) {
          var n = void 0;
          n = (_val - _this.options.minValue) / _this.options.step;

          if (n > _this.model.allValues.length - 2) {
            var _a1 = _this.model.allValues.length - 1,
                _a2 = _this.model.allValues.length - 2;

            var _lastStepVal = Math.abs(_this.model.allValues[_a1].val - _this.model.allValues[_a2].val);

            if (Math.abs(_val - _this.model.allValues[_a1].val) <= _lastStepVal / 2) {
              n = _a1;
            } else {
              n = _a2;
            }
          } else {
            n = Math.round((_val - _this.options.minValue) / _this.options.step);
          }

          if (_this.options.vertical) {
            _this.view.handlersPositionPerc[i] = 100 - _this.model.allValues[n].percent;
          } else {
            _this.view.handlersPositionPerc[i] = _this.model.allValues[n].percent;
          }

          _this.model.currentValue[i] = _this.model.allValues[n].val;
        }
      }
    };

    this.getPositionFromValue = function () {
      _this.view.getMinMaxPosition();

      for (var i = 0; i < _this.view.handlers.length; i++) {
        var _value = _this.model.currentValue[i] - _this.options.minValue;

        var newPos = void 0;

        if (_this.options.vertical) {
          if (!_this.options.moveBySteps) {
            newPos = 100 - _value * _this.model.valuePercent - _this.view.handlerSizePerc;
            _this.view.handlersPositionPerc[i] = newPos + _this.view.handlerSizePerc;
          } else {
            _this.getNearestStepVal();

            newPos = _this.view.handlersPositionPerc[i] - _this.view.handlerSizePerc;
          }

          _this.view.handlers[i].style.top = newPos + '%';
        } else {
          if (!_this.options.moveBySteps) {
            newPos = _value * _this.model.valuePercent - _this.view.handlerSizePerc;
            _this.view.handlersPositionPerc[i] = newPos + _this.view.handlerSizePerc;
          } else {
            _this.getNearestStepVal();

            newPos = _this.view.handlersPositionPerc[i] - _this.view.handlerSizePerc;
          }

          _this.view.handlers[i].style.left = newPos + '%';
        }
      }

      if (_this.options.range) {
        _this.model.getRangeValue();

        _this.view.getSliderRangePosition();
      }

      _this.setInputIconsValues();
    };

    this.setInputIconsValues = function () {
      if (_this.options.icon) {
        for (var i = 0; i < _this.options.handlersAmount; i++) {
          _this.view.icons[i].innerHTML = String(_this.model.currentValue[i]);
        }

        _this.view.subViewIcons.getIconsShift(); // console.log('icons pos');

      }

      if (_this.options.rangeInput) {
        if (_this.options.range) {
          if (_this.options.customValues) {
            _this.view.rangeInput.value = _this.model.currentValue[0] + " - " + _this.model.currentValue[1];
          } else {
            _this.view.rangeInput.value = String(_this.model.rangeValue);
          }
        } else {
          if (_this.options.handlersAmount == 2) {
            _this.view.rangeInput.value = _this.model.currentValue[0] + "; " + _this.model.currentValue[1];
          }
        }
      }

      if (_this.options.valueInputs) {
        for (var i = 0; i < _this.options.handlersAmount; i++) {
          _this.view.valueInputs[i].value = "" + _this.model.currentValue[i];
        }
      }
    };

    this.options = new options_1.Options(options).options;
    this.model = new model_1["default"](this.options);

    if (this.options.customValues) {
      this.model.notifyChangedOptions = function () {
        _this.options = _this.model.options;
      };
    }

    console.log(this.model);
    this.view = new view_1.View(this.options, container, this.model.allValues);
    this.setInitialHandlersPosition();

    this.view.notifyChangedHandlerPosition = function () {
      _this.getValueFromPosition();
    };

    this.view.notifyChangedInputValue = function (newInputValue, num) {
      _this.setHandlersToInputValue(newInputValue, num);
    };

    this.view.notifyChangedSliderData = function () {
      _this.getPositionFromValue();
    };
  }

  return Presenter;
}();

exports.Presenter = Presenter;
},{"./model":"src/model.ts","./view":"src/view.ts","./options":"src/options.ts"}],"slider.ts":[function(require,module,exports) {
'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

Object.defineProperty(exports, "__esModule", {
  value: true
});

var presenter_1 = require("./src/presenter"); // var jquery = require("jquery");
// window.$ = window.jQuery = jquery;


(function ($) {
  var defaults = {
    minValue: -100,
    maxValue: 100,
    startingValue: [-50, 20],
    vertical: false,
    step: 10,
    moveBySteps: true,
    range: true,
    rangeInput: true,
    valueInputs: true,
    handlersAmount: 2,
    scale: true,
    scaleLegend: true,
    icon: true,
    customValues: false,
    customValuesList: '' //any items, separated by comma + whitespace (', '); treated as string values, spread at equal interval along slider

  };
  var methods = {
    init: function init(options) {
      return this.each(function () {
        var params = $.extend({}, defaults, options);
        this.presenter = new presenter_1.Presenter(params, this);
      });
    },
    destroy: function destroy() {
      return this.each(function () {
        var slider = this.children;

        for (var _i = 0, slider_1 = slider; _i < slider_1.length; _i++) {
          var elem = slider_1[_i];
          elem.remove();
        }
      });
    }
  };

  $.fn.slider = function (method) {
    if (methods[method]) {
      return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
    } else if ((0, _typeof2["default"])(method) === 'object' || !method) {
      return methods.init.apply(this, arguments);
    } else {
      $.error('Метод с именем ' + method + ' не существует для jQuery.slider');
    }
  };
})(jQuery);
},{"@babel/runtime/helpers/interopRequireDefault":"node_modules/@babel/runtime/helpers/interopRequireDefault.js","@babel/runtime/helpers/typeof":"node_modules/@babel/runtime/helpers/typeof.js","./src/presenter":"src/presenter.ts"}],"../../Users/alexi/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "60666" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../Users/alexi/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","slider.ts"], null)
//# sourceMappingURL=/slider.4bdd9d3f.js.map