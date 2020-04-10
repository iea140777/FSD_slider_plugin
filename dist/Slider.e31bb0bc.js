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
})({"src/slider.js":[function(require,module,exports) {
'use strict'; //  Model block 

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var defaults = {
  minValue: -200,
  maxValue: -100,
  step: 5,
  range: false,
  tulip: true,
  handlersAmount: 1,
  icon: true,
  input: true
};

var SliderModel = /*#__PURE__*/function () {
  function SliderModel() {
    _classCallCheck(this, SliderModel);

    this.minValue = defaults.minValue, this.maxValue = defaults.maxValue, this.step = defaults.step, this.range = defaults.range, this.tulip = defaults.tulip, this.handlersAmount = defaults.handlersAmount, this.icon = defaults.icon, this.input = defaults.input, this.sliderContainer = {}, this.slider = {}, this.sliderPosition = {}, this.handlers = [], this.icons = {}, this.inputs = {}, this.currentPosition = [], this.currentValue = [], this.handlesrData = [], this.sliderBorder, this.minPosition, this.maxPosition, this.positionRange, this.valueRange, this.positionValueRate;
  } //получаем данные об элементах созданного экз слайдера


  _createClass(SliderModel, [{
    key: "getSliderData",
    value: function getSliderData() {
      this.sliderContainer = newSlider, this.slider = this.sliderContainer.querySelector('.slider__slider'), this.sliderPosition = this.slider.getBoundingClientRect(), this.handlers = this.slider.querySelectorAll('.slider__handler'), this.icons = this.slider.querySelectorAll('.slider__icon'), this.inputs = this.sliderContainer.querySelector('.slider__input'); // this.handler = this.newSlider.querySelector('.slider__handler'),
      // this.handlersData = Array.from(this.handlers);

      console.log(this.handlers[0].offsetWidth);
    } //получаем расчетные данные по созданному экз слайдера

  }, {
    key: "getPositionAndValueData",
    value: function getPositionAndValueData() {
      this.sliderBorder = parseFloat(getComputedStyle(this.slider).borderLeftWidth);
      this.minPosition = this.sliderPosition.x;
      this.maxPosition = this.minPosition + this.sliderPosition.width - this.handlers[0].offsetWidth;
      this.positionRange = this.maxPosition - this.minPosition + this.sliderBorder;
      this.valueRange = Math.abs(this.maxValue - this.minValue);
      this.positionValueRate = this.positionRange / this.valueRange;
    } // метод для получения данных о значении каждого бегунка

  }, {
    key: "getCurrentValue",
    value: function getCurrentValue() {
      for (var i = 0; i < this.handlers.length; i++) {
        this.currentPosition[i] = this.handlers[i].getBoundingClientRect();
        var computedValue = this.minValue + (this.currentPosition[i].x - this.minPosition) / this.positionValueRate;

        if (this.currentPosition[i].x === this.minPosition) {
          this.currentValue[i] = this.minValue;
        } else if (this.currentPosition[i].x === this.maxPosition) {
          this.currentValue[i] = this.maxValue;
        } else {
          this.currentValue[i] = Math.round(computedValue / this.step) * this.step;
        }

        if (this.icon) {
          this.icons[i].innerHTML = this.currentValue[i];
        }
      }
    }
  }]);

  return SliderModel;
}(); //  Presenter block 


var newSlider = document.querySelector('.slider__container');

if (newSlider && newSlider != null) {
  var slider1 = new SliderModel();
  createSlider(slider1);
  slider1.getSliderData();
  slider1.getPositionAndValueData();
  slider1.getCurrentValue();
  moveByMouse(slider1);
  changePosition(slider1);
} // Перемещение бегунка при перетаскивании мышью


function moveByMouse(slider) {
  slider.handlers.forEach(function (item) {
    item.addEventListener('mousedown', function (event) {
      event.preventDefault();
      var currentPosition = item.getBoundingClientRect();
      var shiftX = event.clientX - currentPosition.x;
      item.classList.add('slider__handler_active');
      slider.inputs.value = '';
      document.addEventListener('mousemove', onMouseMove);

      function onMouseMove(event) {
        // console.log(this);
        var newLeft = event.clientX - shiftX - slider.sliderPosition.x;

        if (newLeft < -slider.sliderBorder) {
          newLeft = -slider.sliderBorder;
        }

        if (newLeft > slider.positionRange) {
          newLeft = slider.positionRange;
        }

        item.style.left = newLeft + 'px';
        slider.getCurrentValue();

        if (slider.input && slider.handlers.length === 1) {
          slider.inputs.value = slider.currentValue[0];
        }
      }

      document.addEventListener('mouseup', onMouseUp);

      function onMouseUp() {
        document.removeEventListener('mouseup', onMouseUp);
        document.removeEventListener('mousemove', onMouseMove);
        item.classList.remove('slider__handler_active');
        slider.getCurrentValue();
      }
    });

    item.ondragstart = function () {
      return false;
    };
  });
} // метод для получения значения позиции бегунка в соответствии со значением в input


function getCurrentPosition() {
  var newValue = +this.inputs.value;

  if (newValue <= this.minValue) {
    this.handlers[0].style.left = 0 - this.sliderBorder + 'px';
    this.currentPosition[0].x = this.minPosition;
    this.currentValue[0] = this.minValue;
  } else if (newValue >= this.maxValue) {
    this.handlers[0].style.left = this.positionRange + 'px';
    this.currentPosition[0].x = this.maxPosition;
    this.currentValue[0] = this.maxValue;
  } else {
    this.handlers[0].style.left = Math.abs((newValue - this.minValue) * this.positionValueRate) + 'px';
    this.currentPosition[0].x = Math.abs((newValue - this.minValue) * this.positionValueRate + this.minPosition);
    this.getCurrentValue();
  }

  if (this.icon) {
    this.icons[0].innerHTML = this.currentValue[0];
  }
} // меняем положение бегунка при введении значения в поле ввода


function changePosition(slider) {
  if (slider.input && slider.handlers.length === 1) {
    slider.inputs.addEventListener('input', function (e) {
      e.preventDefault();
      var changePosition = getCurrentPosition.bind(slider);
      setTimeout(changePosition, 500);
      slider.getCurrentValue();
      console.log(slider);
    });
  }
} //  View block 


function createSlider(slider) {
  var sliderLine = document.createElement('div');
  sliderLine.classList.add('slider__slider');
  newSlider.append(sliderLine);

  function createHandlers(handlersAmount) {
    for (var i = 1; i <= handlersAmount; i++) {
      var handler = document.createElement('div');
      handler.classList.add('slider__handler');
      sliderLine.append(handler);

      if (slider.icon) {
        var icon = document.createElement('div');
        icon.classList.add('slider__icon');
        handler.append(icon);
      }
    }
  }

  function createInput(slider) {
    if (slider.input) {
      var sliderInput = document.createElement('input');
      sliderInput.setAttribute('type', 'text');
      sliderInput.classList.add('slider__input');
      newSlider.append(sliderInput);
    }
  }

  createHandlers(slider.handlersAmount);
  createInput(slider);
}
},{}],"index.js":[function(require,module,exports) {
'use strict';

require("/src/slider");
},{"/src/slider":"src/slider.js"}],"../../Users/alexi/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "49886" + '/');

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
},{}]},{},["../../Users/alexi/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=/Slider.e31bb0bc.js.map