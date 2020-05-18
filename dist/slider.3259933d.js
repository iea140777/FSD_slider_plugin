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
  function Presenter(Model, View, options, sliderContainer) {
    var _this = this;

    this.getCurrentValue = function (model, view) {
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

      view.input.value = model.currentValue[0] + ", " + model.currentValue[1];
      return model.currentValue;
    };

    this.getCurrentPosition = function (model, view, newValue) {
      if (newValue <= model.minValue) {
        if (_this.options.vertical) {
          view.handlers[0].style.top = view.positionRange + 'px';
          view.handlersPosition[0] = view.minPosition;
          model.currentValue[0] = model.minValue;
        } else {
          view.handlers[0].style.left = 0 - view.sliderBorder + 'px';
          view.handlersPosition[0] = view.minPosition;
          model.currentValue[0] = model.minValue;
        }
      } else if (newValue >= model.maxValue) {
        if (_this.options.vertical) {
          view.handlers[0].style.top = 0 - view.sliderBorder + 'px';
          view.handlersPosition[0] = view.maxPosition;
          model.currentValue[0] = model.maxValue;
        } else {
          view.handlers[0].style.left = view.positionRange + 'px';
          view.handlersPosition[0] = view.maxPosition;
          model.currentValue[0] = model.maxValue;
        }
      } else {
        if (_this.options.vertical) {
          view.handlers[0].style.top = Math.abs((newValue - model.maxValue) * model.positionValueRate) + 'px';
          view.handlersPosition[0] = view.handlers[0].getBoundingClientRect().y + pageYOffset;
          model.currentValue[0] = newValue;
        } else {
          view.handlers[0].style.left = Math.abs((newValue - model.minValue) * model.positionValueRate) + 'px';
          view.handlersPosition[0] = view.handlers[0].getBoundingClientRect().x + pageXOffset;
          model.currentValue[0] = newValue;
        }
      }

      if (model.icon) {
        view.icons[0].innerHTML = model.currentValue[0];
      }
    };

    this.options = options;
    this.model = new Model(options);
    this.view = new View(options, sliderContainer);
    this.handlersPosition = this.view.handlersPosition;
    this.model.positionValueRate = this.view.positionRange / this.model.valueRange;
    this.model.currentValue = this.getCurrentValue(this.model, this.view);
    console.log(this.view);
    console.log(this.model);

    this.view.notifyChangedHandlerPosition = function (newHandlersPosition) {
      _this.handlersPosition = newHandlersPosition;

      _this.getCurrentValue(_this.model, _this.view);
    };

    this.view.notifyChangedInputValue = function (newInputValue) {
      _this.getCurrentPosition(_this.model, _this.view, newInputValue);
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
    this.minValue = options.minValue, this.maxValue = options.maxValue, this.step = options.step, this.range = options.range, this.handlersAmount = options.handlersAmount, this.icon = options.icon, this.input = options.input, this.valueRange = Math.abs(this.maxValue - this.minValue), this.positionValueRate, this.currentValue = [];
  }

  return Model;
}();

exports.default = Model;
},{}],"src/view.ts":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var View =
/** @class */
function () {
  function View(options, sliderContainer) {
    var _this = this;

    this.createSlider = function (options, sliderContainer) {
      _this.sliderContainer = sliderContainer;
      new SubViewSliderLine().createSliderLine(sliderContainer, options);
      _this.slider = sliderContainer.querySelector('.slider__slider');
      new SubViewHandlers().createHandlers(options, _this.slider);
      _this.handlers = sliderContainer.querySelectorAll('.slider__handler');
      new SubViewInput().createInput(options, _this.slider);
      _this.input = sliderContainer.querySelector('.slider__input');
      new SubViewIcons().createIcons(options, _this.handlers);
      _this.icons = sliderContainer.querySelectorAll('.slider__icon');
    };

    this.getSliderData = function () {
      if (_this.options.vertical) {
        _this.sliderPosition = _this.slider.getBoundingClientRect().y + pageYOffset;
        _this.sliderBorder = parseFloat(getComputedStyle(_this.slider).borderLeftWidth);
        _this.maxPosition = _this.sliderPosition;
        _this.minPosition = _this.maxPosition + _this.slider.getBoundingClientRect().height - _this.handlers[0].offsetHeight;
        _this.positionRange = _this.minPosition - _this.maxPosition + _this.sliderBorder;
        _this.handlersPosition = [];
      } else {
        _this.sliderPosition = _this.slider.getBoundingClientRect().x + pageXOffset;
        _this.sliderBorder = parseFloat(getComputedStyle(_this.slider).borderLeftWidth);
        _this.minPosition = _this.sliderPosition;
        _this.maxPosition = _this.minPosition + _this.slider.getBoundingClientRect().width - _this.handlers[0].offsetWidth;
        _this.positionRange = _this.maxPosition - _this.minPosition + _this.sliderBorder;
        _this.handlersPosition = [];
      }
    };

    this.getInitialHandlersPosition = function () {
      for (var i = 0; i < _this.handlers.length; i++) {
        if (_this.options.vertical) {
          var handlerPosition = _this.handlers[i].getBoundingClientRect().y;

          _this.handlersPosition[i] = handlerPosition;
        } else {
          var handlerPosition = _this.handlers[i].getBoundingClientRect().x;

          _this.handlersPosition[i] = handlerPosition;
        }
      }
    };

    this.addHandlerListeners = function () {
      _this.handlers[0].onmousedown = function (e) {
        _this.handlerMouseDown(e, _this.handlers[0], 0);
      };

      if (_this.handlers[1]) {
        _this.handlers[1].onmousedown = function (e) {
          _this.handlerMouseDown(e, _this.handlers[1], 1);
        };
      }
    };

    this.handlerMouseDown = function (e, handler, num) {
      e.preventDefault(); // this.getSliderData();

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
      var newHandlersPosition = _this.handlersPosition;

      _this.notifyChangedHandlerPosition(newHandlersPosition);
    };

    this.addInputListeners = function () {
      _this.input.onclick = function () {
        _this.input.value = '';
      };

      _this.input.oninput = function (e) {
        _this.newInputValue();
      };
    };

    this.newInputValue = function () {
      var newInputValue = +_this.input.value;

      _this.notifyChangedInputValue(newInputValue);
    };

    this.options = options;
    this.createSlider(options, sliderContainer);
    this.handlersPosition = [];
    this.getSliderData();
    this.getInitialHandlersPosition();
    this.addHandlerListeners();
    this.addInputListeners();
  }

  return View;
}();

exports.View = View;

var SubViewSliderLine =
/** @class */
function () {
  function SubViewSliderLine() {}

  SubViewSliderLine.prototype.createSliderLine = function (sliderContainer, options) {
    var sliderLine = document.createElement('div');
    sliderLine.classList.add('slider__slider');

    if (options.vertical) {
      sliderLine.classList.add('slider__slider_vertical');
    }

    sliderContainer.append(sliderLine);
  };

  return SubViewSliderLine;
}();

var SubViewHandlers =
/** @class */
function () {
  function SubViewHandlers() {}

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
  };

  return SubViewHandlers;
}();

var SubViewIcons =
/** @class */
function () {
  function SubViewIcons() {}

  SubViewIcons.prototype.createIcons = function (options, handlers) {
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
    }
  };

  return SubViewIcons;
}();

var SubViewInput =
/** @class */
function () {
  function SubViewInput() {}

  SubViewInput.prototype.createInput = function (options, slider) {
    if (options.input) {
      var sliderInput = document.createElement('input');
      sliderInput.setAttribute('type', 'text');
      sliderInput.classList.add('slider__input');

      if (options.vertical) {
        sliderInput.classList.add('slider__input_vertical');
      } else {
        sliderInput.classList.add('slider__input_horisontal');
      }

      slider.append(sliderInput);
    }
  };

  return SubViewInput;
}();
},{}],"src/slider.ts":[function(require,module,exports) {
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
      vertical: false,
      step: 5,
      range: false,
      handlersAmount: 2,
      icon: true,
      input: true
    }, options);

    var init = function init() {
      this.sliderContainer = this;
      this.presenter = new presenter_1.Presenter(model_1.default, view_1.View, options, this.sliderContainer);
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "61719" + '/');

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