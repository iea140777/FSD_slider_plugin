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
  "pjIr": [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: !0
    });

    var e = function () {
      return function (e) {
        var t = this;
        this.getInitialCurrentValue = function (e) {
          for (var a = 0; a < e.handlersAmount; a++) {
            t.currentValue[a] = e.startingValue[a];
          }
        }, this.getRangeValue = function (e) {
          e.range && (t.rangeValue = Math.abs(t.currentValue[1] - t.currentValue[0]));
        }, this.minValue = e.minValue, this.maxValue = e.maxValue, this.step = e.step, this.range = e.range, this.handlersAmount = e.handlersAmount, this.icon = e.icon, this.valueRange = Math.abs(e.maxValue - e.minValue), this.stepsAmount = Math.floor(this.valueRange / this.step), this.positionValueRate, this.currentValue = [], this.getInitialCurrentValue(e), this.rangeValue = Math.abs(this.currentValue[1] - this.currentValue[0]);
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
        n.classList.add("slider__inputLabel"), n.innerText = "range", t.append(n);
        var r = document.createElement("input");
        return r.setAttribute("type", "text"), r.classList.add("slider__input", "slider__input_range"), n.append(r), t.querySelector(".slider__input_range");
      }, e.prototype.createValueInputs = function (e, t) {
        for (var n = 0; n < +e.handlersAmount; n++) {
          var r = document.createElement("span");
          r.classList.add("slider__inputLabel"), r.innerText = "value " + (n + 1), t.append(r);
          var u = document.createElement("input");
          u.setAttribute("type", "text"), u.classList.add("slider__input", "slider__input_value"), r.append(u);
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
        this.createScale = function (e, t) {
          for (var i = Math.ceil((e.maxValue - e.minValue) / e.step) + 1, a = 0; a < i; a++) {
            var c = document.createElement("div");
            c.classList.add("slider__scale-point"), e.vertical ? c.classList.add("slider__scale-point_vertical") : c.classList.add("slider__scale-point_horisontal"), t.append(c);
          }

          return t.querySelectorAll(".slider__scale-point");
        }, this.addScaleListener = function (t) {
          t.forEach(function (t) {
            t.onclick = function (t) {
              e.scalePpointClick(t);
            };
          });
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
        s = e(require("./subView/subViewIcons")),
        n = e(require("./subView/subViewInput")),
        o = e(require("./subView/subViewScale")),
        l = function () {
      return function (e, l) {
        var r = this;
        this.createSlider = function (e, i) {
          r.sliderContainer = r.createContainer(e, i), r.slider = r.subViewSliderLine.createSliderLine(r.sliderContainer, e), r.handlers = r.subViewHandlers.createHandlers(e, r.slider), r.options.scale && (r.scale = r.subViewScale.createScale(e, r.slider)), r.options.icon && (r.icons = r.subViewIcons.createIcons(e, r.handlers, r.slider)), (r.options.rangeInput || r.options.valueInputs) && (r.inputsContainer = r.subViewInput.createInputsContainer(e, r.slider, r.sliderContainer), r.options.rangeInput && r.options.handlersAmount > 1 && (r.rangeInput = r.subViewInput.createRangeInput(e, r.inputsContainer)), r.options.valueInputs && (r.valueInputs = r.subViewInput.createValueInputs(e, r.inputsContainer)));
        }, this.createContainer = function (e, i) {
          var t = document.createElement("div");
          return t.classList.add("slider__container"), r.options.vertical ? t.classList.add("slider__container_vertical") : t.classList.add("slider__container_horisontal"), i.append(t), i.querySelector(".slider__container");
        }, this.getSliderData = function () {
          r.options.vertical ? (r.sliderPosition = r.slider.getBoundingClientRect().y + pageYOffset, r.sliderBorder = parseFloat(getComputedStyle(r.slider).borderLeftWidth), r.handlersHeight = r.handlers[0].offsetHeight, r.maxPosition = r.sliderPosition - r.handlersHeight / 2, r.minPosition = r.maxPosition + r.slider.getBoundingClientRect().height, r.positionRange = r.minPosition - r.maxPosition, r.handlersPosition = [], r.options.range && (r.range = r.showRange(r.options))) : (r.sliderPosition = r.slider.getBoundingClientRect().x + pageXOffset, r.handlersWidth = r.handlers[0].offsetWidth, console.log(r.slider.getBoundingClientRect()), r.sliderBorder = parseFloat(getComputedStyle(r.slider).borderLeftWidth), r.minPosition = r.sliderPosition - r.handlersWidth / 2, r.maxPosition = r.minPosition + r.slider.getBoundingClientRect().width, r.positionRange = r.maxPosition - r.minPosition, r.handlersPosition = [], r.options.range && (r.range = r.showRange(r.options)));
        }, this.getScalePosition = function () {
          for (var e = r.positionRange / Math.abs(r.options.maxValue - r.options.minValue), i = 0; i < r.scale.length; i++) {
            r.options.vertical ? 0 == i ? r.scale[i].style.top = r.positionRange + "px" : i == r.scale.length - 1 ? r.scale[i].style.top = "0px" : r.scale[i].style.top = r.positionRange - i * e * r.options.step + "px" : 0 == i ? r.scale[i].style.left = "0px" : i == r.scale.length - 1 ? r.scale[i].style.left = r.positionRange + "px" : r.scale[i].style.left = i * e * r.options.step + "px";
          }
        }, this.showRange = function (e) {
          var i = document.createElement("div");
          i.classList.add("slider__range"), e.vertical ? (i.style.width = r.slider.getBoundingClientRect().width + 2 + "px", i.style.left = "-1px") : (i.style.height = r.slider.getBoundingClientRect().height + 2 + "px", i.style.top = "-1px"), r.slider.append(i);
          var t = r.slider.querySelector(".slider__range");
          return r.getSliderRangePosition(e, t), t;
        }, this.getSliderRangePosition = function (e, i) {
          r.options.vertical ? (r.handlersPosition[0] > r.handlersPosition[1] ? i.style.top = r.handlers[1].offsetTop + r.handlers[1].offsetHeight / 2 + "px" : i.style.top = r.handlers[0].offsetTop + r.handlers[0].offsetHeight / 2 + "px", i.style.height = Math.abs(r.handlersPosition[1] - r.handlersPosition[0]) + "px") : (r.handlersPosition[0] > r.handlersPosition[1] ? i.style.left = r.handlers[1].offsetLeft + r.handlers[1].offsetWidth / 2 + "px" : i.style.left = r.handlers[0].offsetLeft + r.handlers[0].offsetWidth / 2 + "px", i.style.width = Math.abs(r.handlersPosition[1] - r.handlersPosition[0]) + "px");
        }, this.moveByMouse = function (e, i, t) {
          var s;
          e.preventDefault(), s = r.options.vertical ? e.clientY - r.handlersPosition[t] : e.clientX - r.handlersPosition[t], i.classList.add("slider__handler_active"), document.onmousemove = function (e) {
            if (r.options.vertical) {
              var n = e.clientY - s - r.sliderPosition;
              n <= r.maxPosition - r.sliderPosition && (n = r.maxPosition - r.sliderPosition), n >= r.minPosition - r.sliderPosition && (n = r.minPosition - r.sliderPosition), i.style.top = n + "px", r.writeNewPosition(i, t);
            } else {
              var o = e.clientX - s - r.sliderPosition;
              o <= r.minPosition - r.sliderPosition && (o = r.minPosition - r.sliderPosition), o >= r.maxPosition - r.sliderPosition && (o = r.maxPosition - r.sliderPosition), i.style.left = o + "px", r.writeNewPosition(i, t);
            }
          }, document.onmouseup = function () {
            i.classList.remove("slider__handler_active"), document.onmousemove = null;
          };
        }, this.writeNewPosition = function (e, i) {
          var t;
          t = r.options.vertical ? e.getBoundingClientRect().y + pageYOffset : e.getBoundingClientRect().x + pageXOffset, r.handlersPosition[i] = t, r.options.range && r.getSliderRangePosition(r.options, r.range), r.notifyChangedHandlerPosition();
        }, this.moveByClick = function (e) {
          var i, t;
          i = r.options.vertical ? e.clientY + pageYOffset : e.clientX + pageXOffset;
          var s = 0;

          if ((t = 2 == r.options.handlersAmount ? r.getNearestHandler(i) : r.handlers[0]) == r.handlers[1] && (s = 1), r.options.vertical) {
            var n = e.clientY + pageYOffset - r.handlersHeight / 2 - r.sliderPosition;
            n <= r.maxPosition - r.sliderPosition && (n = r.maxPosition - r.sliderPosition), n >= r.minPosition - r.sliderPosition && (n = r.minPosition - r.sliderPosition), t.style.top = n + "px", r.writeNewPosition(t, s), console.log(r.handlersPosition);
          } else {
            var o = e.clientX + pageXOffset - r.handlersWidth / 2 - r.sliderPosition;
            o <= r.minPosition - r.sliderPosition && (o = r.minPosition - r.sliderPosition), o >= r.maxPosition - r.sliderPosition && (o = r.maxPosition - r.sliderPosition), t.style.left = o + "px", r.writeNewPosition(t, s);
          }
        }, this.getNearestHandler = function (e) {
          var i = Math.abs(r.handlersPosition[0] - e);
          return Math.abs(r.handlersPosition[1] - e) < i ? r.handlers[1] : r.handlers[0];
        }, this.options = e, this.subViewSliderLine = new i.default(), this.subViewHandlers = new t.default(), this.subViewScale = new o.default(), this.subViewIcons = new s.default(), this.subViewInput = new n.default(), this.createSlider(e, l), this.getSliderData(), this.options.scale && this.getScalePosition(), this.subViewHandlers.handlerMouseDown = function (e, i, t) {
          r.moveByMouse(e, i, t);
        }, this.subViewInput.newInputValue = function (e, i) {
          r.notifyChangedInputValue(e, i);
        }, this.subViewSliderLine.sliderClick = function (e) {
          e.target !== r.handlers[0] && e.target !== r.handlers[1] && r.moveByClick(e);
        };
      };
    }();

    exports.View = l;
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

    var o = e(require("./model")),
        n = require("./view"),
        t = function () {
      return function (e, t) {
        var i = this;
        this.checkOptions = function (e) {
          if (i.options = e, i.options.minValue = Number(e.minValue), i.options.maxValue = Number(e.maxValue), i.options.startingValue = [Number(e.startingValue[0]), Number(e.startingValue[1])], i.options.step = Number(e.step), i.options.handlersAmount = Number(e.handlersAmount), i.options.minValue >= i.options.maxValue) console.log("Slider: minValue should not be equal or be more than maxValue");else {
            for (var o = 0; o <= i.options.startingValue.length; o++) {
              i.options.startingValue[o] > i.options.maxValue ? i.options.startingValue[o] = i.options.maxValue : i.options.startingValue[o] < i.options.minValue && (i.options.startingValue[o] = i.options.minValue);
            }

            i.options.handlersAmount < 1 ? (i.options.handlersAmount = 1, console.log("Slider: handlers amount should be equal either 1 or 2")) : i.options.handlersAmount > 2 && (i.options.handlersAmount = 2, console.log("Slider: handlers amount should be equal either 1 or 2")), 2 == i.options.handlersAmount && i.options.startingValue.length < 2 && (i.options.startingValue = [i.options.minValue, i.options.maxValue], console.log("Slider: starting value should be defined for every handler")), i.options.step >= Math.abs(i.options.maxValue - i.options.minValue) ? console.log("Slider: step value should  be  less than slider value range") : 1 == i.options.handlersAmount && i.options.range && (i.options.range = !1, console.log("Slider: range option cannot be applied to one handler"));
          }
        }, this.setInitialHandlersPosition = function () {
          i.getPositionFromValue(), i.model.getRangeValue(i.options);
        }, this.setHandlersToInputValue = function (e, o) {
          null != e ? (e > i.model.maxValue ? e = i.model.maxValue : e < i.model.minValue && (e = i.model.minValue), i.options.moveBySteps && (e = Math.round((e - i.model.minValue) / i.options.step) * i.options.step + i.model.minValue), i.model.currentValue[o] = e, i.getPositionFromValue()) : i.getValueFromPosition();
        }, this.getValueFromPosition = function () {
          for (var e = 0; e < i.view.handlers.length; e++) {
            var o = void 0;
            o = i.options.vertical ? (i.view.minPosition - i.view.handlersPosition[e]) / i.model.positionValueRate : (i.view.handlersPosition[e] - i.view.minPosition) / i.model.positionValueRate;
            var n = Math.round(o / i.model.step) * i.model.step;
            o > i.options.step * i.model.stepsAmount ? i.model.currentValue[e] = i.model.maxValue : i.model.currentValue[e] = i.model.minValue + n, i.options.icon && (i.view.icons[e].innerHTML = String(i.model.currentValue[e]));
          }

          if (i.model.getRangeValue(i.options), i.options.rangeInput && i.options.range && i.options.handlersAmount > 1 && (i.view.rangeInput.value = String(i.model.rangeValue)), i.options.rangeInput && !i.options.range && i.options.handlersAmount > 1 && (i.view.rangeInput.value = i.model.currentValue[0] + "; " + i.model.currentValue[1]), i.options.valueInputs) for (e = 0; e < i.options.handlersAmount; e++) {
            i.view.valueInputs[e].value = "" + i.model.currentValue[e];
          }
          return i.options.moveBySteps && i.getPositionFromValue(), i.model.currentValue;
        }, this.getPositionFromValue = function () {
          for (var e = 0; e < i.view.handlers.length; e++) {
            i.options && (i.options.vertical ? (i.view.handlers[e].style.top = Math.abs((i.model.currentValue[e] - i.model.maxValue) * i.model.positionValueRate) - i.view.handlersHeight / 2 + "px", i.view.handlersPosition[e] = i.view.handlers[e].getBoundingClientRect().y + pageYOffset) : (i.view.handlers[e].style.left = Math.abs((i.model.currentValue[e] - i.model.minValue) * i.model.positionValueRate) - i.view.handlersWidth / 2 + "px", i.view.handlersPosition[e] = i.view.handlers[e].getBoundingClientRect().x + pageXOffset)), i.model.icon && (i.view.icons[e].innerHTML = String(i.model.currentValue[e]));
          }

          if (i.model.getRangeValue(i.options), i.options.rangeInput && i.options.range && i.options.handlersAmount > 1 && (i.view.showRange(i.options), i.view.rangeInput.value = String(i.model.rangeValue)), i.options.rangeInput && !i.options.range && i.options.handlersAmount > 1 && (i.view.rangeInput.value = i.model.currentValue[0] + "; " + i.model.currentValue[1]), i.options.valueInputs) for (e = 0; e < i.options.handlersAmount; e++) {
            i.view.valueInputs[e].value = "" + i.model.currentValue[e];
          }
        }, this.checkOptions(e), this.model = new o.default(this.options), this.view = new n.View(this.options, t), this.model.positionValueRate = this.view.positionRange / this.model.valueRange, this.setInitialHandlersPosition(), console.log(this.view), console.log(this.model), this.view.notifyChangedHandlerPosition = function () {
          i.getValueFromPosition();
        }, this.view.notifyChangedInputValue = function (e, o) {
          i.setHandlersToInputValue(e, o);
        };
      };
    }();

    exports.Presenter = t;
  }, {
    "./model": "pjIr",
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
            var e = this.children;
            console.log(e);

            for (var t = 0, r = e; t < r.length; t++) {
              r[t].remove();
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "58068" + '/');

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