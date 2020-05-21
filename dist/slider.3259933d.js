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
})({"src/presenter.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Presenter =
/** @class */
function () {
  function Presenter(Model, View, options, container) {
    var _this = this;

    this.setInitialHandlersPosition = function () {
      _this.getPositionFromValue();

      _this.model.getRangeValue(_this.options);
    };

    this.getValueFromPosition = function (model, view) {
      for (var i = 0; i < view.handlers.length; i++) {
        var computedValue = void 0;

        if (_this.options.vertical) {
          computedValue = model.minValue + (view.minPosition - _this.handlersPosition[i]) / model.positionValueRate;
        } else {
          computedValue = model.minValue + (_this.handlersPosition[i] - view.minPosition) / model.positionValueRate;
        }

        if (_this.handlersPosition[i] === view.minPosition) {
          model.currentValue[i] = model.minValue;
        } else if (_this.handlersPosition[i] === view.maxPosition) {
          model.currentValue[i] = model.maxValue;
        } else {
          model.currentValue[i] = Math.round(computedValue / model.step) * model.step;
        }

        if (model.icon) {
          view.icons[i].innerHTML = model.currentValue[i];
        }
      }

      _this.model.getRangeValue(_this.options);

      if (_this.options.rangeInput && _this.options.range && _this.options.handlersAmount > 1) {
        view.rangeInput.value = model.rangeValue;
      }

      if (_this.options.rangeInput && !_this.options.range && _this.options.handlersAmount > 1) {
        view.rangeInput.value = model.currentValue[0] + "; " + model.currentValue[1];
      }

      if (_this.options.valueInputs) {
        for (var i = 0; i < _this.options.handlersAmount; i++) {
          view.valueInputs[i].value = "" + model.currentValue[i];
        }
      }

      return model.currentValue;
    };

    this.getPositionFromValue = function () {
      for (var i = 0; i < _this.view.handlers.length; i++) {
        if (_this.model.currentValue[i] <= _this.model.minValue) {
          if (_this.options.vertical) {
            _this.view.handlers[i].style.top = _this.view.positionRange + 'px';
            _this.view.handlersPosition[i] = _this.view.minPosition;
            _this.model.currentValue[i] = _this.model.minValue;
          } else {
            _this.view.handlers[i].style.left = 0 - _this.view.sliderBorder + 'px';
            _this.view.handlersPosition[i] = _this.view.minPosition;
            _this.model.currentValue[i] = _this.model.minValue;
          }
        } else if (_this.model.currentValue[i] >= _this.model.maxValue) {
          if (_this.options.vertical) {
            _this.view.handlers[i].style.top = 0 - _this.view.sliderBorder + 'px';
            _this.view.handlersPosition[i] = _this.view.maxPosition;
            _this.model.currentValue[i] = _this.model.maxValue;
          } else {
            _this.view.handlers[i].style.left = _this.view.positionRange + 'px';
            _this.view.handlersPosition[i] = _this.view.maxPosition;
            _this.model.currentValue[i] = _this.model.maxValue;
          }
        } else {
          if (_this.options.vertical) {
            _this.view.handlers[i].style.top = Math.abs((_this.model.currentValue[i] - _this.model.maxValue) * _this.model.positionValueRate) + 'px';
            _this.view.handlersPosition[i] = _this.view.handlers[i].getBoundingClientRect().y + pageYOffset;
          } else {
            _this.view.handlers[i].style.left = Math.abs((_this.model.currentValue[i] - _this.model.minValue) * _this.model.positionValueRate) + 'px';
            _this.view.handlersPosition[i] = _this.view.handlers[i].getBoundingClientRect().x + pageXOffset;
          }
        }

        if (_this.model.icon) {
          _this.view.icons[i].innerHTML = _this.model.currentValue[i];
        }
      }

      if (_this.options.rangeInput && _this.options.range && _this.options.handlersAmount > 1) {
        _this.view.showRange(_this.options);

        _this.view.rangeInput.value = _this.model.rangeValue;
      }

      if (_this.options.rangeInput && !_this.options.range && _this.options.handlersAmount > 1) {
        _this.view.rangeInput.value = _this.model.currentValue[0] + "; " + _this.model.currentValue[1];
      }

      if (_this.options.valueInputs) {
        for (var i = 0; i < _this.options.handlersAmount; i++) {
          _this.view.valueInputs[i].value = "" + _this.model.currentValue[i];
        }
      }
    };

    this.options = options;
    this.model = new Model(options);
    this.view = new View(options, container);
    this.model.positionValueRate = this.view.positionRange / this.model.valueRange;
    this.setInitialHandlersPosition(); // this.getPositionFromValue();

    this.handlersPosition = this.view.handlersPosition;
    console.log(this.view);
    console.log(this.model);

    this.view.notifyChangedHandlerPosition = function (newHandlersPosition) {
      _this.handlersPosition = newHandlersPosition;

      _this.getValueFromPosition(_this.model, _this.view);
    };

    this.view.notifyChangedInputValue = function (newInputValue, num) {
      _this.model.currentValue[num] = newInputValue;

      _this.getPositionFromValue();
    };
  }

  return Presenter;
}();

exports.Presenter = Presenter;
},{}],"src/model.ts":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Model =
/** @class */
function () {
  function Model(options) {
    var _this = this;

    this.getInitialCurrentValue = function (options) {
      for (var i = 0; i < options.handlersAmount; i++) {
        _this.currentValue[i] = options.startingValue[i];
      }
    };

    this.getRangeValue = function (options) {
      if (options.range) {
        _this.rangeValue = Math.abs(_this.currentValue[1] - _this.currentValue[0]);
      }
    };

    this.minValue = options.minValue, this.maxValue = options.maxValue, this.step = options.step, this.range = options.range, this.handlersAmount = options.handlersAmount, this.icon = options.icon, this.input = options.input, this.valueRange = Math.abs(this.maxValue - this.minValue), this.positionValueRate, this.currentValue = [], this.getInitialCurrentValue(options), this.rangeValue = Math.abs(this.currentValue[1] - this.currentValue[0]); // this.getRangeValue(options);
  }

  return Model;
}();

exports.default = Model;
},{}],"src/subView/subViewSliderLine.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var SubViewSliderLine =
/** @class */
function () {
  function SubViewSliderLine() {
    this.createSliderLine = function (sliderContainer, options) {
      var sliderLine = document.createElement('div');
      sliderLine.classList.add('slider__slider');

      if (options.vertical) {
        sliderLine.classList.add('slider__slider_vertical');
      }

      sliderContainer.append(sliderLine);
      var slider = sliderContainer.querySelector('.slider__slider');
      return slider;
    };
  }

  return SubViewSliderLine;
}();

exports.default = SubViewSliderLine;
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

    this.getInitialHandlersPosition = function (handlers, options) {
      var handlersPosition = [];

      for (var i = 0; i < handlers.length; i++) {
        if (options.vertical) {
          var handlerPosition = handlers[i].getBoundingClientRect().y;
          handlersPosition[i] = handlerPosition;
        } else {
          var handlerPosition = handlers[i].getBoundingClientRect().x;
          handlersPosition[i] = handlerPosition;
        }
      }

      return handlersPosition;
    };

    this.addHandlerListeners = function (handlers) {
      handlers[0].onmousedown = function (e) {
        _this.handlerMouseDown(e, handlers[0], 0);
      };

      if (handlers[1]) {
        handlers[1].onmousedown = function (e) {
          _this.handlerMouseDown(e, handlers[1], 1);
        };
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

exports.default = SubViewHandlers;
},{}],"src/subView/subViewIcons.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var SubViewIcons =
/** @class */
function () {
  function SubViewIcons() {}

  SubViewIcons.prototype.createIcons = function (options, handlers, slider) {
    if (options.icon) {
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
      return icons;
    }
  };

  return SubViewIcons;
}();

exports.default = SubViewIcons;
},{}],"src/subView/subViewInput.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var SubViewInput =
/** @class */
function () {
  function SubViewInput() {
    // createInputs(options, slider, sliderContainer){
    //     this.inputsContainer = this.createInputsContainer(options, slider, sliderContainer);
    //     this.rangeInput = this.createRangeInput(options, this.inputsContainer);
    //     this.valueInputs = this.createValueInputs(options, this.inputsContainer);
    var _this = this;

    this.addInputsListener = function (inputs) {
      inputs.forEach(function (input) {
        input.onclick = function (e) {
          input.value = '';
          input.addEventListener('keydown', function (e) {
            if (e.code == 'Enter') {
              var newInputValue = Number(input.value);

              if (e.target == inputs[0]) {
                _this.newInputValue(newInputValue, 0);
              } else {
                _this.newInputValue(newInputValue, 1);
              }
            }
          });
        };
      });
    };
  } // }


  SubViewInput.prototype.createInputsContainer = function (options, slider, sliderContainer) {
    var _container = document.createElement('div');

    _container.classList.add('slider__inputsContainer');

    slider.before(_container);
    var inputsContainer = sliderContainer.querySelector('.slider__inputsContainer');
    return inputsContainer;
  };

  SubViewInput.prototype.createRangeInput = function (options, inputsContainer) {
    if (options.rangeInput && options.handlersAmount > 1) {
      var rangeInput = document.createElement('input');
      rangeInput.setAttribute('type', 'text');
      rangeInput.classList.add('slider__input', 'slider__input_range');
      inputsContainer.append(rangeInput);
      var inputLabel = document.createElement('span');
      inputLabel.classList.add('slider__label');
      inputLabel.innerText = 'range';
      rangeInput.before(inputLabel);
      var input = inputsContainer.querySelector('.slider__input_range');
      return input;
    }
  };

  SubViewInput.prototype.createValueInputs = function (options, inputsContainer) {
    if (options.valueInputs) {
      for (var i = 0; i < +options.handlersAmount; i++) {
        var valueInput = document.createElement('input');
        valueInput.setAttribute('type', 'text');
        valueInput.classList.add('slider__input', 'slider__input_value');
        inputsContainer.append(valueInput);
        var inputLabel = document.createElement('span');
        inputLabel.classList.add('slider__label');
        inputLabel.innerText = "value " + (i + 1);
        valueInput.before(inputLabel);
      }

      var inputs = inputsContainer.querySelectorAll('.slider__input_value'); // console.log(inputs[0]);

      this.addInputsListener(inputs);
      return inputs;
    }
  };

  return SubViewInput;
}();

exports.default = SubViewInput;
},{}],"src/view.ts":[function(require,module,exports) {
'use strict';

var __importDefault = this && this.__importDefault || function (mod) {
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

var View =
/** @class */
function () {
  function View(options, container) {
    var _this = this;

    this.createSlider = function (options, container) {
      _this.sliderContainer = _this.createContainer(options, container);
      _this.slider = _this.subViewSliderLine.createSliderLine(_this.sliderContainer, options);
      _this.handlers = _this.subViewHandlers.createHandlers(options, _this.slider);
      _this.icons = _this.subViewIcons.createIcons(options, _this.handlers, _this.slider);
      _this.inputsContainer = _this.subViewInput.createInputsContainer(options, _this.slider, _this.sliderContainer);
      _this.rangeInput = _this.subViewInput.createRangeInput(options, _this.inputsContainer);
      _this.valueInputs = _this.subViewInput.createValueInputs(options, _this.inputsContainer);
    };

    this.createContainer = function (options, container) {
      var cont = document.createElement('div');
      cont.classList.add('slider__container');

      if (options.vertical) {
        cont.classList.add('slider__container_vertical');
      } else {
        cont.classList.add('slider__container_horisontal');
      }

      container.append(cont);
      var sliderContainer = container.querySelector('.slider__container');
      return sliderContainer;
    };

    this.getSliderData = function () {
      if (_this.options.vertical) {
        _this.sliderPosition = _this.slider.getBoundingClientRect().y + pageYOffset;
        _this.sliderBorder = parseFloat(getComputedStyle(_this.slider).borderLeftWidth);
        _this.maxPosition = _this.sliderPosition;
        _this.minPosition = _this.maxPosition + _this.slider.getBoundingClientRect().height - _this.handlers[0].offsetHeight;
        _this.positionRange = _this.minPosition - _this.maxPosition + _this.sliderBorder;
        _this.handlersPosition = new subViewHandlers_1.default().getInitialHandlersPosition(_this.handlers, _this.options);
        _this.range = _this.showRange(_this.options);
      } else {
        _this.sliderPosition = _this.slider.getBoundingClientRect().x + pageXOffset;
        _this.sliderBorder = parseFloat(getComputedStyle(_this.slider).borderLeftWidth);
        _this.minPosition = _this.sliderPosition;
        _this.maxPosition = _this.minPosition + _this.slider.getBoundingClientRect().width - _this.handlers[0].offsetWidth;
        _this.positionRange = _this.maxPosition - _this.minPosition + _this.sliderBorder;
        _this.handlersPosition = new subViewHandlers_1.default().getInitialHandlersPosition(_this.handlers, _this.options);
        _this.range = _this.showRange(_this.options);
      }
    };

    this.showRange = function (options) {
      if (_this.options.range) {
        var rangeBlock = document.createElement('div');
        rangeBlock.classList.add('slider__range');

        if (options.vertical) {
          rangeBlock.style.width = _this.slider.getBoundingClientRect().width + 'px';
          rangeBlock.style.left = -_this.sliderBorder + 'px';
        } else {
          rangeBlock.style.height = _this.slider.getBoundingClientRect().height + 'px';
          rangeBlock.style.top = -_this.sliderBorder + 'px';
        }

        _this.slider.append(rangeBlock);

        var range = _this.slider.querySelector('.slider__range');

        _this.getSliderRangePosition(options, range);

        return range;
      }
    };

    this.getSliderRangePosition = function (options, rangeBlock) {
      if (options.vertical) {
        if (_this.handlersPosition[0] > _this.handlersPosition[1]) {
          rangeBlock.style.top = _this.handlers[1].offsetTop + _this.handlers[1].offsetHeight / 2 + 'px';
        } else {
          rangeBlock.style.top = _this.handlers[0].offsetTop + _this.handlers[0].offsetHeight / 2 + 'px';
        }

        rangeBlock.style.height = Math.abs(_this.handlersPosition[1] - _this.handlersPosition[0]) + 'px';
      } else {
        if (_this.handlersPosition[0] > _this.handlersPosition[1]) {
          rangeBlock.style.left = _this.handlers[1].offsetLeft + _this.handlers[1].offsetWidth / 2 + 'px';
        } else {
          rangeBlock.style.left = _this.handlers[0].offsetLeft + _this.handlers[0].offsetWidth / 2 + 'px';
        }

        rangeBlock.style.width = Math.abs(_this.handlersPosition[1] - _this.handlersPosition[0]) + 'px';
      }
    };

    this.mouseDown = function (e, handler, num) {
      e.preventDefault();
      var shiftX;

      if (_this.options.vertical) {
        shiftX = e.clientY - _this.handlersPosition[num];
      } else {
        shiftX = e.clientX - _this.handlersPosition[num];
      }

      handler.classList.add('slider__handler_active');

      document.onmousemove = function (e) {
        if (_this.options.vertical) {
          // console.log(`shifty = ${shiftX}`);
          // console.log(`e.clientY = ${e.clientY}; handler = ${this.handlersPosition[num]}`);
          // console.log(this.handlersPosition[num]);
          var newTop = e.clientY - shiftX - _this.sliderPosition;

          if (newTop < -_this.sliderBorder) {
            newTop = -_this.sliderBorder;
          }

          if (newTop > _this.positionRange) {
            newTop = _this.positionRange;
          }

          handler.style.top = newTop + 'px';

          _this.writeNewPosition(handler, num);
        } else {
          var newLeft = e.clientX - shiftX - _this.sliderPosition;

          if (newLeft < -_this.sliderBorder) {
            newLeft = -_this.sliderBorder;
          }

          if (newLeft > _this.positionRange) {
            newLeft = _this.positionRange;
          }

          handler.style.left = newLeft + 'px';

          _this.writeNewPosition(handler, num);
        }
      };

      document.onmouseup = function () {
        handler.classList.remove('slider__handler_active');
        document.onmousemove = null;
      };
    };

    this.writeNewPosition = function (handler, num) {
      var newPosition;

      if (_this.options.vertical) {
        newPosition = handler.getBoundingClientRect().y + pageYOffset;
      } else {
        newPosition = handler.getBoundingClientRect().x + pageXOffset;
      }

      _this.handlersPosition[num] = newPosition;

      if (_this.options.range) {
        _this.getSliderRangePosition(_this.options, _this.range);
      }

      var newHandlersPosition = _this.handlersPosition;

      _this.notifyChangedHandlerPosition(newHandlersPosition);
    };

    this.options = options;
    this.subViewSliderLine = new subViewSliderLine_1.default();
    this.subViewHandlers = new subViewHandlers_1.default();
    this.subViewIcons = new subViewIcons_1.default();
    this.subViewInput = new subViewInput_1.default();
    this.createSlider(options, container);
    this.getSliderData();

    this.subViewHandlers.handlerMouseDown = function (e, handler, num) {
      _this.mouseDown(e, handler, num);
    };

    this.subViewInput.newInputValue = function (newInputValue, num) {
      _this.notifyChangedInputValue(newInputValue, num);
    };
  }

  return View;
}();

exports.View = View;
},{"./subView/subViewSliderLine":"src/subView/subViewSliderLine.ts","./subView/subViewHandlers":"src/subView/subViewHandlers.ts","./subView/subViewIcons":"src/subView/subViewIcons.ts","./subView/subViewInput":"src/subView/subViewInput.ts"}],"src/slider.ts":[function(require,module,exports) {
'use strict';

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var presenter_1 = require("./presenter");

var model_1 = __importDefault(require("./model"));

var view_1 = require("./view"); // var jQuery = require("jQuery");


(function ($) {
  jQuery.fn.slider = function (options) {
    options = $.extend({
      minValue: 0,
      maxValue: 100,
      startingValue: [20, 60],
      vertical: false,
      step: 5,
      range: true,
      rangeInput: true,
      valueInputs: true,
      handlersAmount: 2,
      icon: true,
      input: true
    }, options);

    var init = function init() {
      this.container = this;
      this.presenter = new presenter_1.Presenter(model_1.default, view_1.View, options, this.container);
    };

    return this.each(init);
  };
})(jQuery);
},{"./presenter":"src/presenter.ts","./model":"src/model.ts","./view":"src/view.ts"}],"../../Users/alexi/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "63281" + '/');

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
},{}]},{},["../../Users/alexi/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/slider.ts"], null)
//# sourceMappingURL=/slider.3259933d.js.map