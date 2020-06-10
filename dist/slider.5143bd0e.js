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
})({"docs/slider/slider.js":[function(require,module,exports) {
var define;
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

parcelRequire = function (e, r, t, n) {
  var i,
      o = "function" == typeof parcelRequire && parcelRequire,
      u = "function" == typeof require && require;

  function f(t, n) {
    if (!r[t]) {
      if (!e[t]) {
        var i = "function" == typeof parcelRequire && parcelRequire;
        if (!n && i) return i(t, !0);
        if (o) return o(t, !0);
        if (u && "string" == typeof t) return u(t);
        var c = new Error("Cannot find module '" + t + "'");
        throw c.code = "MODULE_NOT_FOUND", c;
      }

      p.resolve = function (r) {
        return e[t][1][r] || r;
      }, p.cache = {};
      var l = r[t] = new f.Module(t);
      e[t][0].call(l.exports, p, l, l.exports, this);
    }

    return r[t].exports;

    function p(e) {
      return f(p.resolve(e));
    }
  }

  f.isParcelRequire = !0, f.Module = function (e) {
    this.id = e, this.bundle = f, this.exports = {};
  }, f.modules = e, f.cache = r, f.parent = o, f.register = function (r, t) {
    e[r] = [function (e, r) {
      r.exports = t;
    }, {}];
  };

  for (var c = 0; c < t.length; c++) {
    try {
      f(t[c]);
    } catch (e) {
      i || (i = e);
    }
  }

  if (t.length) {
    var l = f(t[t.length - 1]);
    "object" == (typeof exports === "undefined" ? "undefined" : _typeof(exports)) && "undefined" != typeof module ? module.exports = l : "function" == typeof define && define.amd ? define(function () {
      return l;
    }) : n && (this[n] = l);
  }

  if (parcelRequire = f, i) throw i;
  return f;
}({
  "p9qc": [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: !0
    });

    var e = function () {
      return function (e) {
        var t = this;
        this.getInitialCurrentValue = function () {
          t.currentValue = [];

          for (var e = 0; e < t.options.handlersAmount; e++) {
            t.currentValue[e] = t.options.startingValue[e];
          }
        }, this.getValueRange = function () {
          t.valueRange = Math.abs(t.options.maxValue - t.options.minValue);
        }, this.getStepsAmount = function () {
          t.stepsAmount = Math.ceil(t.valueRange / t.options.step);
        }, this.getStepPercent = function () {
          t.stepPercent = t.options.step / t.valueRange * 100;
        }, this.getValuePercent = function () {
          t.valuePercent = 100 / t.valueRange;
        }, this.getRangeValue = function () {
          t.rangeValue = Math.abs(t.currentValue[1] - t.currentValue[0]);
        }, this.getAllValues = function () {
          t.allValues = [];

          for (var e = 0; e <= t.stepsAmount; e++) {
            var n = {};
            n.val = t.options.minValue + t.options.step * e, n.percent = t.stepPercent * e, n.percent >= 100 && (n.percent = 100, n.val = t.options.maxValue), t.allValues.push(n);
          }

          console.log(t.allValues);
        }, this.options = e, this.getValueRange(), this.getStepsAmount(), this.getStepPercent(), this.getValuePercent(), this.getAllValues(), this.getInitialCurrentValue(), this.getRangeValue();
      };
    }();

    exports.default = e;
  }, {}],
  "RWvY": [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: !0
    });

    var e = function () {
      return function () {
        var e = this;
        this.createSliderLine = function (r, i) {
          var t = document.createElement("div");
          t.classList.add("slider__slider"), i.vertical && t.classList.add("slider__slider_vertical"), r.append(t);
          var d = r.querySelector(".slider__slider");
          return e.addSliderListener(d), d;
        }, this.addSliderListener = function (r) {
          r.onclick = function (r) {
            e.sliderClick(r);
          };
        };
      };
    }();

    exports.default = e;
  }, {}],
  "VwWS": [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: !0
    });

    var e = function () {
      function e() {
        var e = this;

        this.addHandlerListeners = function (r) {
          r[0].onmousedown = function (n) {
            e.handlerMouseDown(n, r[0], 0);
          }, r[1] && (r[1].onmousedown = function (n) {
            e.handlerMouseDown(n, r[1], 1);
          });
        };
      }

      return e.prototype.createHandlers = function (e, r) {
        for (var n = 0; n < e.handlersAmount; n++) {
          var t = document.createElement("div");
          t.classList.add("slider__handler"), e.vertical ? t.classList.add("slider__handler_vertical") : t.classList.add("slider__handler_horisontal"), r.append(t);
        }

        var d = r.querySelectorAll(".slider__handler");
        return this.addHandlerListeners(d), d;
      }, e;
    }();

    exports.default = e;
  }, {}],
  "EO17": [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: !0
    });

    var e = function () {
      function e() {}

      return e.prototype.createIcons = function (e, t, r) {
        for (var i = 0; i < t.length; i++) {
          var s = document.createElement("div");
          s.classList.add("slider__icon"), e.vertical ? s.classList.add("slider__icon_vertical") : s.classList.add("slider__icon_horisontal"), t[i].append(s);
        }

        return r.querySelectorAll(".slider__icon");
      }, e;
    }();

    exports.default = e;
  }, {}],
  "ezLB": [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: !0
    });

    var e = function () {
      function e() {
        var e = this;
        this.addInputsListener = function (t) {
          t.forEach(function (n) {
            n.onfocus = function () {
              n.value = "", n.addEventListener("blur", function (r) {
                e.getInputValue(n, t, r);
              }), n.addEventListener("keydown", function (r) {
                "Enter" == r.code && e.getInputValue(n, t, r);
              });
            };
          });
        }, this.getInputValue = function (t, n, r) {
          var u = Number(t.value);
          ("" == t.value || isNaN(Number(t.value))) && (u = void 0), r.target == n[0] ? e.newInputValue(u, 0) : e.newInputValue(u, 1);
        };
      }

      return e.prototype.createInputsContainer = function (e, t, n) {
        var r = document.createElement("div");
        return r.classList.add("slider__inputsContainer"), t.before(r), n.querySelector(".slider__inputsContainer");
      }, e.prototype.createRangeInput = function (e, t) {
        var n = document.createElement("span");
        n.classList.add("slider__inputLabel"), n.innerText = "Range", t.append(n);
        var r = document.createElement("input");
        return r.setAttribute("type", "text"), r.setAttribute("readonly", "true"), r.setAttribute("size", "8"), r.classList.add("slider__input", "slider__input_range"), n.append(r), t.querySelector(".slider__input_range");
      }, e.prototype.createValueInputs = function (e, t) {
        for (var n = 0; n < +e.handlersAmount; n++) {
          var r = document.createElement("span");
          r.classList.add("slider__inputLabel"), r.innerText = "Value " + (n + 1), t.append(r);
          var u = document.createElement("input");
          u.setAttribute("type", "text"), u.setAttribute("size", "8"), u.classList.add("slider__input", "slider__input_value"), r.append(u);
        }

        var a = t.querySelectorAll(".slider__input_value");
        return this.addInputsListener(a), a;
      }, e;
    }();

    exports.default = e;
  }, {}],
  "fXEI": [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: !0
    });

    var e = function () {
      return function () {
        var e = this;
        this.createScale = function (l, s) {
          e.options = l;

          for (var t = Math.ceil((l.maxValue - l.minValue) / l.step) + 1, a = 0; a < t; a++) {
            var i = document.createElement("div");
            i.classList.add("slider__scale-point"), l.vertical ? i.classList.add("slider__scale-point_vertical") : i.classList.add("slider__scale-point_horisontal"), s.append(i);
          }

          return s.querySelectorAll(".slider__scale-point");
        }, this.addScaleLegend = function (l, s) {
          return l.forEach(function (l) {
            var s = document.createElement("div");
            s.classList.add("slider__scale-legend"), e.options.vertical ? s.classList.add("slider__scale-legend_vertical") : s.classList.add("slider__scale-legend_horisontal"), l.append(s);
          }), s.querySelectorAll(".slider__scale-legend");
        };
      };
    }();

    exports.default = e;
  }, {}],
  "CBC0": [function (require, module, exports) {
    "use strict";

    var e = this && this.__importDefault || function (e) {
      return e && e.__esModule ? e : {
        default: e
      };
    };

    Object.defineProperty(exports, "__esModule", {
      value: !0
    });

    var i = e(require("./subView/subViewSliderLine")),
        t = e(require("./subView/subViewHandlers")),
        n = e(require("./subView/subViewIcons")),
        s = e(require("./subView/subViewInput")),
        o = e(require("./subView/subViewScale")),
        r = function () {
      return function (e, r) {
        var l = this;
        this.createSlider = function (e, i) {
          l.sliderContainer = l.createContainer(e, i), l.slider = l.subViewSliderLine.createSliderLine(l.sliderContainer, e), l.handlers = l.subViewHandlers.createHandlers(e, l.slider), l.options.scale && (l.scale = l.subViewScale.createScale(e, l.slider)), l.options.scaleLegend && (l.scaleLegend = l.subViewScale.addScaleLegend(l.scale, l.slider)), l.options.icon && (l.icons = l.subViewIcons.createIcons(e, l.handlers, l.slider)), (l.options.rangeInput || l.options.valueInputs) && (l.inputsContainer = l.subViewInput.createInputsContainer(e, l.slider, l.sliderContainer), l.options.rangeInput && l.options.handlersAmount > 1 && (l.rangeInput = l.subViewInput.createRangeInput(e, l.inputsContainer)), l.options.valueInputs && (l.valueInputs = l.subViewInput.createValueInputs(e, l.inputsContainer)));
        }, this.createContainer = function (e, i) {
          var t = document.createElement("div");
          return t.classList.add("slider__container"), l.options.vertical ? t.classList.add("slider__container_vertical") : t.classList.add("slider__container_horisontal"), i.append(t), i.querySelector(".slider__container");
        }, this.resizeListener = function () {
          window.addEventListener("resize", function () {
            l.notifyChangedWindow();
          });
        }, this.getSliderData = function () {
          l.getSliderPosition(), l.getSliderLength(), l.getHandlerSize(), l.getMinMaxPosition(), l.options.range && (l.rangeBlock = l.showRange());
        }, this.getSliderPosition = function () {
          l.options.vertical ? l.sliderPosition = l.slider.getBoundingClientRect().y + pageYOffset : l.sliderPosition = l.slider.getBoundingClientRect().x + pageXOffset;
        }, this.getSliderLength = function () {
          l.options.vertical ? l.sliderLength = l.slider.getBoundingClientRect().height : l.sliderLength = l.slider.getBoundingClientRect().width;
        }, this.getHandlerSize = function () {
          l.getSliderLength(), l.options.vertical ? (l.handlerSizePerc = l.handlers[0].offsetHeight / 2 / l.sliderLength * 100, l.handlerSizePx = l.handlers[0].offsetHeight) : (l.handlerSizePerc = l.handlers[0].offsetWidth / 2 / l.sliderLength * 100, l.handlerSizePx = l.handlers[0].offsetWidth);
        }, this.getMinMaxPosition = function () {
          l.getHandlerSize, l.options.vertical ? (l.maxPosition = l.sliderPosition - l.handlerSizePx / 2, l.maxPositionPerc = 0 - l.handlerSizePerc, l.minPosition = l.maxPosition + l.sliderLength, l.minPositionPerc = 100 - l.handlerSizePerc) : (l.minPosition = l.sliderPosition - l.handlerSizePx / 2, l.minPositionPerc = 0 - l.handlerSizePerc, l.maxPosition = l.minPosition + l.sliderLength, l.maxPositionPerc = 100 - l.handlerSizePerc), l.positionRange = Math.abs(l.minPosition - l.maxPosition);
        }, this.getScalePosition = function () {
          for (var e = l.positionRange / Math.abs(l.options.maxValue - l.options.minValue) / l.positionRange * 100, i = 0; i < l.scale.length; i++) {
            l.options.vertical ? 0 == i ? l.scale[i].style.top = "100%" : i == l.scale.length - 1 ? l.scale[i].style.top = "0%" : l.scale[i].style.top = 100 - i * e * l.options.step + "%" : 0 == i ? l.scale[i].style.left = "0%" : i == l.scale.length - 1 ? l.scale[i].style.left = "100%" : l.scale[i].style.left = i * e * l.options.step + "%";
          }

          l.options.scaleLegend && l.getScaleLegendValues();
        }, this.getScaleLegendValues = function () {
          l.scaleLegend.forEach(function (e) {
            if (l.options.vertical) {
              var i = e.parentElement.style.top,
                  t = (100 - Number(i.slice(0, -1))) / 100 * Math.abs(l.options.maxValue - l.options.minValue),
                  n = Math.round(l.options.minValue + t);
              e.innerHTML = n.toString();
              var s = e.getBoundingClientRect().height / 2;
              e.style.top = -s + "px";
            } else i = e.parentElement.style.left, t = Number(i.slice(0, -1)) / 100 * Math.abs(l.options.maxValue - l.options.minValue), n = Math.round(l.options.minValue + t), e.innerHTML = n.toString(), s = e.getBoundingClientRect().width / 2, e.style.left = -s + "px";
          });
        }, this.showRange = function () {
          var e = document.createElement("div");
          return e.classList.add("slider__range"), l.options.vertical ? (e.style.width = l.slider.getBoundingClientRect().width + 2 + "px", e.style.left = "-1px") : (e.style.height = l.slider.getBoundingClientRect().height + 2 + "px", e.style.top = "-1px"), l.slider.append(e), l.rangeBlock = l.slider.querySelector(".slider__range"), l.getSliderRangePosition(), l.rangeBlock;
        }, this.getSliderRangePosition = function () {
          l.getHandlerSize(), l.options.vertical ? (l.handlersPositionPerc[0] > l.handlersPositionPerc[1] ? l.rangeBlock.style.top = l.handlersPositionPerc[1] + "%" : l.rangeBlock.style.top = l.handlersPositionPerc[0] + "%", l.rangeBlock.style.height = Math.abs(l.handlersPositionPerc[1] - l.handlersPositionPerc[0]) + "%") : (l.handlersPositionPerc[0] > l.handlersPositionPerc[1] ? l.rangeBlock.style.left = l.handlersPositionPerc[1] + "%" : l.rangeBlock.style.left = l.handlersPositionPerc[0] + "%", l.rangeBlock.style.width = Math.abs(l.handlersPositionPerc[1] - l.handlersPositionPerc[0]) + "%");
        }, this.moveByMouse = function (e, i, t) {
          var n, s;
          e.preventDefault(), l.getMinMaxPosition(), n = l.options.vertical ? e.clientY - l.handlers[t].getBoundingClientRect().y : e.clientX - l.handlers[t].getBoundingClientRect().x + pageXOffset, s = n / l.sliderLength * 100, i.classList.add("slider__handler_active"), document.onmousemove = function (e) {
            if (e.preventDefault, l.options.vertical) {
              var n = (e.clientY - l.slider.getBoundingClientRect().y) / l.slider.getBoundingClientRect().height * 100 - s;
              n <= l.maxPositionPerc && (n = l.maxPositionPerc), n >= l.minPositionPerc && (n = l.minPositionPerc), i.style.top = n + "%", l.writeNewPosition(i, t, n);
            } else {
              var o = (e.clientX - l.slider.getBoundingClientRect().x) / l.slider.getBoundingClientRect().width * 100 - s;
              o <= l.minPositionPerc && (o = l.minPositionPerc), o >= l.maxPositionPerc && (o = l.maxPositionPerc), i.style.left = o + "%", l.writeNewPosition(i, t, o);
            }
          }, document.onmouseup = function () {
            i.classList.remove("slider__handler_active"), document.onmousemove = null;
          };
        }, this.writeNewPosition = function (e, i, t) {
          l.handlersPositionPerc[i] = t + l.handlerSizePerc, l.options.range && l.getSliderRangePosition(), l.notifyChangedHandlerPosition();
        }, this.moveByClick = function (e) {
          var i, t;
          e.preventDefault(), l.getMinMaxPosition(), i = l.options.vertical ? e.clientY : e.clientX;
          var n = 0;

          if ((t = 2 == l.options.handlersAmount ? l.getNearestHandler(i) : l.handlers[0]) == l.handlers[1] && (n = 1), l.options.vertical) {
            var s = (i - l.slider.getBoundingClientRect().y) / l.slider.getBoundingClientRect().height * 100 - l.handlerSizePerc;
            s <= l.maxPositionPerc && (s = l.maxPositionPerc), s >= l.minPositionPerc && (s = l.minPositionPerc), t.style.top = s + "%", l.writeNewPosition(t, n, s);
          } else {
            var o = (i - l.slider.getBoundingClientRect().x) / l.slider.getBoundingClientRect().width * 100 - l.handlerSizePerc;
            o <= l.minPositionPerc && (o = l.minPositionPerc), o >= l.maxPositionPerc && (o = l.maxPositionPerc), t.style.left = o + "%", l.writeNewPosition(t, n, o);
          }
        }, this.getNearestHandler = function (e) {
          var i, t;
          return l.options.vertical ? (i = Math.abs(l.handlers[0].getBoundingClientRect().y - e), t = Math.abs(l.handlers[1].getBoundingClientRect().y - e)) : (i = Math.abs(l.handlers[0].getBoundingClientRect().x - e), t = Math.abs(l.handlers[1].getBoundingClientRect().x - e)), t < i ? l.handlers[1] : l.handlers[0];
        }, this.updatePosition = function () {
          for (var e = 0; e < l.handlers.length; e++) {
            var i = l.handlersPositionPerc[e] - l.handlerSizePerc;
            l.options.vertical ? l.handlers[e].style.top = i + "%" : l.handlers[e].style.left = i + "%";
          }
        }, this.options = e, this.subViewSliderLine = new i.default(), this.subViewHandlers = new t.default(), this.subViewScale = new o.default(), this.subViewIcons = new n.default(), this.subViewInput = new s.default(), this.handlersPosition = [], this.handlersPositionPerc = [], this.createSlider(e, r), this.getSliderData(), this.options.scale && this.getScalePosition(), this.resizeListener(), this.subViewHandlers.handlerMouseDown = function (e, i, t) {
          l.moveByMouse(e, i, t);
        }, this.subViewInput.newInputValue = function (e, i) {
          l.notifyChangedInputValue(e, i);
        }, this.subViewSliderLine.sliderClick = function (e) {
          e.target !== l.handlers[0] && e.target !== l.handlers[1] && l.moveByClick(e);
        };
      };
    }();

    exports.View = r;
  }, {
    "./subView/subViewSliderLine": "RWvY",
    "./subView/subViewHandlers": "VwWS",
    "./subView/subViewIcons": "EO17",
    "./subView/subViewInput": "ezLB",
    "./subView/subViewScale": "fXEI"
  }],
  "mxbi": [function (require, module, exports) {
    "use strict";

    var e = this && this.__importDefault || function (e) {
      return e && e.__esModule ? e : {
        default: e
      };
    };

    Object.defineProperty(exports, "__esModule", {
      value: !0
    });

    var n = e(require("./model1")),
        o = require("./view"),
        t = function () {
      return function (e, t) {
        var i = this;
        this.checkOptions = function (e) {
          i.options = e, i.options.minValue = Number(e.minValue), i.options.maxValue = Number(e.maxValue), i.options.startingValue = [Number(e.startingValue[0]), Number(e.startingValue[1])], i.options.step = Number(e.step), i.options.handlersAmount = Number(e.handlersAmount), i.options.minValue >= i.options.maxValue && console.log("Slider: minValue should not be equal or be more than maxValue");

          for (var n = 0; n <= i.options.startingValue.length; n++) {
            i.options.startingValue[n] > i.options.maxValue ? i.options.startingValue[n] = i.options.maxValue : i.options.startingValue[n] < i.options.minValue && (i.options.startingValue[n] = i.options.minValue);
          }

          i.options.handlersAmount < 1 ? (i.options.handlersAmount = 1, console.log("Slider: handlers amount should be equal either 1 or 2")) : i.options.handlersAmount > 2 && (i.options.handlersAmount = 2, console.log("Slider: handlers amount should be equal either 1 or 2")), 2 == i.options.handlersAmount && i.options.startingValue.length < 2 && (i.options.startingValue = [i.options.minValue, i.options.maxValue], console.log("Slider: starting value should be defined for every handler")), i.options.step >= Math.abs(i.options.maxValue - i.options.minValue) && console.log("Slider: step value should  be  less than slider value range"), 1 == i.options.handlersAmount && i.options.range && (i.options.range = !1, console.log("Slider: range option cannot be applied to one handler")), i.options.scaleLegend && !i.options.scale && (i.options.scaleLegend = !1, console.log("Slider: scaleLegend option cannot be applied without scale option"));
        }, this.setInitialHandlersPosition = function () {
          i.getPositionFromValue(), i.options.range && (i.model.getRangeValue(), i.view.getSliderRangePosition());
        }, this.setHandlersToInputValue = function (e, n) {
          null != e ? (e > i.options.maxValue ? e = i.options.maxValue : e < i.options.minValue && (e = i.options.minValue), i.model.currentValue[n] = e, i.getPositionFromValue()) : i.getValueFromPosition();
        }, this.getValueFromPosition = function () {
          for (var e = 0; e < i.view.handlers.length; e++) {
            var n = void 0;
            n = i.options.vertical ? (100 - i.view.handlersPositionPerc[e]) / i.model.valuePercent : i.view.handlersPositionPerc[e] / i.model.valuePercent, i.options.moveBySteps ? (i.getNearestStepPos(), i.options.range && i.view.getSliderRangePosition()) : i.model.currentValue[e] = i.options.minValue + Math.round(n), i.options.icon && (i.view.icons[e].innerHTML = String(i.model.currentValue[e]));
          }

          if (i.model.getRangeValue(), i.options.rangeInput && i.options.range && i.options.handlersAmount > 1 && (i.view.rangeInput.value = String(i.model.rangeValue)), i.options.rangeInput && !i.options.range && i.options.handlersAmount > 1 && (i.view.rangeInput.value = i.model.currentValue[0] + "; " + i.model.currentValue[1]), i.options.valueInputs) for (e = 0; e < i.options.handlersAmount; e++) {
            i.view.valueInputs[e].value = "" + i.model.currentValue[e];
          }
          return i.model.currentValue;
        }, this.getNearestStepPos = function () {
          for (var e = function e(_e) {
            var n;
            n = i.options.vertical ? 100 - i.view.handlersPositionPerc[_e] : i.view.handlersPositionPerc[_e];
            var o = i.model.stepPercent / 2,
                t = i.model.allValues.filter(function (e) {
              return Math.abs(n - e.percent) < o;
            });
            t.length > 1 && t.length <= 2 && (Math.abs(n - t[0].percent) < Math.abs(n - t[1].percent) ? t.splice(1, 1) : t.splice(0, 1)), i.options.vertical ? i.view.handlersPositionPerc[_e] = 100 - t[0].percent : i.view.handlersPositionPerc[_e] = t[0].percent, i.view.updatePosition(), i.model.currentValue[_e] = t[0].val;
          }, n = 0; n < i.view.handlers.length; n++) {
            e(n);
          }
        }, this.getNearestStepVal = function () {
          for (var e = function e(_e2) {
            var n = i.model.currentValue[_e2],
                o = i.options.step / 2,
                t = i.model.allValues.filter(function (e) {
              return Math.abs(e.val - n) <= o;
            });
            t.length > 1 && t.length <= 2 && (Math.abs(n - t[0].val) < Math.abs(n - t[1].val) ? t.splice(1, 1) : t.splice(0, 1)), i.options.vertical ? i.view.handlersPositionPerc[_e2] = 100 - t[0].percent : i.view.handlersPositionPerc[_e2] = t[0].percent, i.model.currentValue[_e2] = t[0].val;
          }, n = 0; n < i.view.handlers.length; n++) {
            e(n);
          }
        }, this.getPositionFromValue = function () {
          i.view.getMinMaxPosition();

          for (var e = 0; e < i.view.handlers.length; e++) {
            var n = i.model.currentValue[e] - i.options.minValue,
                o = void 0;
            i.options.vertical ? (i.options.moveBySteps ? (i.getNearestStepVal(), o = i.view.handlersPositionPerc[e] - i.view.handlerSizePerc) : (o = 100 - n * i.model.valuePercent - i.view.handlerSizePerc, i.view.handlersPositionPerc[e] = o + i.view.handlerSizePerc), i.view.handlers[e].style.top = o + "%") : (i.options.moveBySteps ? (i.getNearestStepVal(), o = i.view.handlersPositionPerc[e] - i.view.handlerSizePerc) : (o = n * i.model.valuePercent - i.view.handlerSizePerc, i.view.handlersPositionPerc[e] = o + i.view.handlerSizePerc), i.view.handlers[e].style.left = o + "%"), i.options.icon && (i.view.icons[e].innerHTML = String(i.model.currentValue[e]));
          }

          if (i.model.getRangeValue(), i.options.rangeInput && i.options.range && i.options.handlersAmount > 1 && (i.view.showRange(), i.view.rangeInput.value = String(i.model.rangeValue)), i.options.rangeInput && !i.options.range && i.options.handlersAmount > 1 && (i.view.rangeInput.value = i.model.currentValue[0] + "; " + i.model.currentValue[1]), i.options.valueInputs) for (e = 0; e < i.options.handlersAmount; e++) {
            i.view.valueInputs[e].value = "" + i.model.currentValue[e];
          }
        }, this.checkOptions(e), this.model = new n.default(this.options), this.view = new o.View(this.options, t), this.setInitialHandlersPosition(), this.view.notifyChangedHandlerPosition = function () {
          i.getValueFromPosition();
        }, this.view.notifyChangedInputValue = function (e, n) {
          i.setHandlersToInputValue(e, n);
        }, this.view.notifyChangedWindow = function () {
          i.getPositionFromValue();
        };
      };
    }();

    exports.Presenter = t;
  }, {
    "./model1": "p9qc",
    "./view": "CBC0"
  }],
  "QLcG": [function (require, module, exports) {
    "use strict";

    function e(t) {
      return (e = "function" == typeof Symbol && "symbol" == _typeof(Symbol.iterator) ? function (e) {
        return _typeof(e);
      } : function (e) {
        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : _typeof(e);
      })(t);
    }

    Object.defineProperty(exports, "__esModule", {
      value: !0
    });

    var t = require("./src/presenter");

    !function (r) {
      var n = {
        minValue: -100,
        maxValue: 100,
        startingValue: [-50, 20],
        vertical: !1,
        step: 10,
        moveBySteps: !0,
        range: !0,
        rangeInput: !0,
        valueInputs: !0,
        handlersAmount: 2,
        scale: !0,
        scaleLegend: !0,
        icon: !0
      },
          o = {
        init: function init(e) {
          return this.each(function () {
            var o = r.extend({}, n, e);
            this.presenter = new t.Presenter(o, this);
          });
        },
        destroy: function destroy() {
          return this.each(function () {
            for (var e = 0, t = this.children; e < t.length; e++) {
              t[e].remove();
            }
          });
        }
      };

      r.fn.slider = function (t) {
        return o[t] ? o[t].apply(this, Array.prototype.slice.call(arguments, 1)) : "object" !== e(t) && t ? void r.error("Метод с именем " + t + " не существует для jQuery.slider") : o.init.apply(this, arguments);
      };
    }(jQuery);
  }, {
    "./src/presenter": "mxbi"
  }]
}, {}, ["QLcG"], null);
},{}],"../../Users/alexi/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "60922" + '/');

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
},{}]},{},["../../Users/alexi/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","docs/slider/slider.js"], null)
//# sourceMappingURL=/slider.5143bd0e.js.map