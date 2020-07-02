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
},{}],"docs/slider/slider.js":[function(require,module,exports) {
var define;
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

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
    "object" == (typeof exports === "undefined" ? "undefined" : (0, _typeof2["default"])(exports)) && "undefined" != typeof module ? module.exports = l : "function" == typeof define && define.amd ? define(function () {
      return l;
    }) : n && (this[n] = l);
  }

  if (parcelRequire = f, i) throw i;
  return f;
}({
  "kvRt": [function (require, module, exports) {
    function e(e) {
      return e && e.__esModule ? e : {
        "default": e
      };
    }

    module.exports = e;
  }, {}],
  "LNzP": [function (require, module, exports) {
    function o(t) {
      return "function" == typeof Symbol && "symbol" == (0, _typeof2["default"])(Symbol.iterator) ? module.exports = o = function o(_o) {
        return (0, _typeof2["default"])(_o);
      } : module.exports = o = function o(_o2) {
        return _o2 && "function" == typeof Symbol && _o2.constructor === Symbol && _o2 !== Symbol.prototype ? "symbol" : (0, _typeof2["default"])(_o2);
      }, o(t);
    }

    module.exports = o;
  }, {}],
  "pjIr": [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: !0
    });

    var t = function () {
      return function (t) {
        var e = this;
        this.getCustomValues = function () {
          if ("" != e.options.customValuesList) {
            var t = e.options.customValuesList.split(", ");
            "" != t && null != t || (e.customValueType = "none");

            for (var s = 0; s < t.length; s++) {
              if (isNaN(Number(t[s]))) {
                e.customValueType = "string";
                break;
              }

              e.customValueType = "number";
            }

            if ("number" == e.customValueType) for (s = 0; s < t.length; s++) {
              t[s] = Number(t[s]);
            }
            e.customValuesList = t, e.customStepsAmount = t.length, e.getCustomValuesOptions(t);
          } else console.log("Slider: customValuesList should contain values");
        }, this.getCustomValuesOptions = function (t) {
          e.options.minValue = t[0], e.options.maxValue = t[t.length - 1], (e.options.startingValue[0] > t.length || e.options.startingValue[1] > t.length) && (e.options.startingValue = [0, t.length - 1]), e.notifyChangedOptions;
        }, this.getInitialCurrentValue = function () {
          e.currentValue = [];

          for (var t = 0; t < e.options.handlersAmount; t++) {
            if (e.options.customValues) {
              var s = e.options.startingValue[t],
                  u = e.allValues[s].val;
              e.currentValue[t] = u;
            } else e.currentValue[t] = e.options.startingValue[t];
          }
        }, this.getValueRange = function () {
          e.valueRange = Math.abs(e.options.maxValue - e.options.minValue);
        }, this.getStepsAmount = function () {
          e.options.customValues ? e.stepsAmount = e.customStepsAmount : e.stepsAmount = Math.ceil(e.valueRange / e.options.step);
        }, this.getStepPercent = function () {
          e.options.customValues ? e.stepPercent = 100 / (e.stepsAmount - 1) : e.stepPercent = e.options.step / e.valueRange * 100;
        }, this.getValuePercent = function () {
          e.valuePercent = 100 / e.valueRange;
        }, this.getRangeValue = function () {
          e.rangeValue = Math.abs(e.currentValue[1] - e.currentValue[0]);
        }, this.getAllValues = function () {
          if (e.allValues = [], e.options.customValues) e.getAllCustomValues();else for (var t = 0; t <= e.stepsAmount; t++) {
            var s = {};
            s.val = e.options.minValue + e.options.step * t, s.percent = e.stepPercent * t, s.percent >= 100 && (s.percent = 100, s.val = e.options.maxValue), e.allValues.push(s);
          }
        }, this.getAllCustomValues = function () {
          for (var t = 0; t < e.stepsAmount; t++) {
            var s = {};
            s.val = e.customValuesList[t], s.percent = e.stepPercent * t, e.allValues.push(s);
          }
        }, this.options = t, this.options.customValues && this.getCustomValues(), this.getValueRange(), this.getStepsAmount(), this.getStepPercent(), this.getValuePercent(), this.getAllValues(), this.getInitialCurrentValue(), this.getRangeValue();
      };
    }();

    exports["default"] = t;
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

    exports["default"] = e;
  }, {}],
  "VwWS": [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: !0
    });

    var e = function () {
      function e() {
        var e = this;

        this.addHandlerListeners = function (t) {
          t[0].addEventListener("mousedown", function (n) {
            e.handlerMouseDown(n, t[0], 0);
          }), t[0].addEventListener("touchstart", function (n) {
            e.handlerTouchStart(n, t[0], 0);
          }), t[1] && (t[1].addEventListener("mousedown", function (n) {
            e.handlerMouseDown(n, t[1], 1);
          }), t[1].addEventListener("touchstart", function (n) {
            e.handlerTouchStart(n, t[1], 1);
          }));
        };
      }

      return e.prototype.createHandlers = function (e, t) {
        for (var n = 0; n < e.handlersAmount; n++) {
          var r = document.createElement("div");
          r.classList.add("slider__handler"), e.vertical ? r.classList.add("slider__handler_vertical") : r.classList.add("slider__handler_horisontal"), t.append(r);
        }

        var d = t.querySelectorAll(".slider__handler");
        return this.addHandlerListeners(d), d;
      }, e;
    }();

    exports["default"] = e;
  }, {}],
  "EO17": [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: !0
    });

    var t = function () {
      function t() {
        var t = this;

        this.getIconsShift = function () {
          t.icons.forEach(function (e) {
            if (t.options.vertical) {
              var i = e.getBoundingClientRect().height / 2;
              e.style.top = -i + "px";
              var n = e.getBoundingClientRect().width;
              e.style.left = -n - 10 + "px";
            } else {
              i = e.getBoundingClientRect().width / 2;
              e.style.left = -i + "px";
              n = e.getBoundingClientRect().height;
              e.style.top = -n - 8 + "px";
            }
          });
        };
      }

      return t.prototype.createIcons = function (t, e, i) {
        this.options = t;

        for (var n = 0; n < e.length; n++) {
          var o = document.createElement("div");
          o.classList.add("slider__icon"), t.vertical ? o.classList.add("slider__icon_vertical") : o.classList.add("slider__icon_horisontal"), e[n].append(o);
        }

        var s = i.querySelectorAll(".slider__icon");
        return this.icons = s, s;
      }, t;
    }();

    exports["default"] = t;
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
        return r.setAttribute("type", "text"), r.setAttribute("readonly", "true"), r.setAttribute("size", "auto"), r.classList.add("slider__input", "slider__input_range"), n.append(r), t.querySelector(".slider__input_range");
      }, e.prototype.createValueInputs = function (e, t) {
        for (var n = 0; n < +e.handlersAmount; n++) {
          var r = document.createElement("span");
          r.classList.add("slider__inputLabel"), r.innerText = "Value " + (n + 1), t.append(r);
          var u = document.createElement("input");
          u.setAttribute("type", "text"), u.setAttribute("size", "auto"), u.classList.add("slider__input", "slider__input_value"), r.append(u);
        }

        var a = t.querySelectorAll(".slider__input_value");
        return this.addInputsListener(a), a;
      }, e;
    }();

    exports["default"] = e;
  }, {}],
  "fXEI": [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: !0
    });

    var e = function () {
      return function () {
        var e = this;
        this.createScale = function (l, s, a) {
          e.options = l, e.values = a, e.slider = s;

          for (var t = e.values.length, n = 0; n < t; n++) {
            var r = document.createElement("div");
            r.classList.add("slider__scale-point"), e.options.vertical ? r.classList.add("slider__scale-point_vertical") : r.classList.add("slider__scale-point_horisontal"), s.append(r);
          }

          e.scalePoints = s.querySelectorAll(".slider__scale-point"), e.scalePointsArray = Array.from(e.scalePoints), e.getScalePosition(), e.options.scaleLegend && (e.addScaleLegend(), e.getScaleLegendValues());
        }, this.getScalePosition = function () {
          for (var l = 0; l < e.values.length; l++) {
            e.options.vertical ? e.scalePointsArray[l].style.top = 100 - e.values[l].percent + "%" : e.scalePointsArray[l].style.left = e.values[l].percent + "%";
          }
        }, this.addScaleLegend = function () {
          e.scalePoints.forEach(function (l) {
            var s = document.createElement("div");
            s.classList.add("slider__scale-legend"), e.options.vertical ? s.classList.add("slider__scale-legend_vertical") : s.classList.add("slider__scale-legend_horisontal"), l.append(s);
          }), e.scaleLegend = e.slider.querySelectorAll(".slider__scale-legend"), e.scaleLegendArray = Array.from(e.scaleLegend);
        }, this.getScaleLegendValues = function () {
          for (var l = 0; l < e.values.length; l++) {
            if (e.scaleLegendArray[l].innerText = String(e.values[l].val), e.options.vertical) {
              var s = e.scaleLegendArray[l].getBoundingClientRect().height / 2;
              e.scaleLegendArray[l].style.top = -s + "px";
            } else s = e.scaleLegendArray[l].getBoundingClientRect().width / 2, e.scaleLegendArray[l].style.left = -s + "px";
          }
        };
      };
    }();

    exports["default"] = e;
  }, {}],
  "CBC0": [function (require, module, exports) {
    "use strict";

    var e = function e(_e) {
      return _e && _e.__esModule ? _e : {
        "default": _e
      };
    };

    Object.defineProperty(exports, "__esModule", {
      value: !0
    });

    var i = e(require("./subView/subViewSliderLine")),
        n = e(require("./subView/subViewHandlers")),
        t = e(require("./subView/subViewIcons")),
        s = e(require("./subView/subViewInput")),
        o = e(require("./subView/subViewScale")),
        r = function () {
      return function (e, r, l) {
        var a = this;
        this.createSlider = function (e, i) {
          a.sliderContainer = a.createContainer(e, i), a.slider = a.subViewSliderLine.createSliderLine(a.sliderContainer, e), a.handlers = a.subViewHandlers.createHandlers(e, a.slider), a.options.scale && (a.scale = a.subViewScale.createScale(e, a.slider, a.values)), a.options.icon && (a.icons = a.subViewIcons.createIcons(e, a.handlers, a.slider)), (a.options.rangeInput || a.options.valueInputs) && (a.inputsContainer = a.subViewInput.createInputsContainer(e, a.slider, a.sliderContainer), a.options.rangeInput && a.options.handlersAmount > 1 && (a.rangeInput = a.subViewInput.createRangeInput(e, a.inputsContainer)), a.options.valueInputs && (a.valueInputs = a.subViewInput.createValueInputs(e, a.inputsContainer)));
        }, this.createContainer = function (e, i) {
          var n = document.createElement("div");
          return n.classList.add("slider__container"), a.options.vertical ? n.classList.add("slider__container_vertical") : n.classList.add("slider__container_horisontal"), i.append(n), i.querySelector(".slider__container");
        }, this.resizeListener = function () {
          window.addEventListener("resize", function () {
            a.notifyChangedWindow();
          });
        }, this.getSliderData = function () {
          a.getSliderPosition(), a.getSliderLength(), a.getHandlerSize(), a.getMinMaxPosition(), a.options.range && (a.rangeBlock = a.showRange());
        }, this.getSliderPosition = function () {
          a.options.vertical ? a.sliderPosition = a.slider.getBoundingClientRect().y + pageYOffset : a.sliderPosition = a.slider.getBoundingClientRect().x + pageXOffset;
        }, this.getSliderLength = function () {
          a.options.vertical ? a.sliderLength = a.slider.getBoundingClientRect().height : a.sliderLength = a.slider.getBoundingClientRect().width;
        }, this.getHandlerSize = function () {
          a.getSliderLength(), a.options.vertical ? (a.handlerSizePerc = a.handlers[0].offsetHeight / 2 / a.sliderLength * 100, a.handlerSizePx = a.handlers[0].offsetHeight) : (a.handlerSizePerc = a.handlers[0].offsetWidth / 2 / a.sliderLength * 100, a.handlerSizePx = a.handlers[0].offsetWidth);
        }, this.getMinMaxPosition = function () {
          a.getHandlerSize, a.options.vertical ? (a.maxPosition = a.sliderPosition - a.handlerSizePx / 2, a.maxPositionPerc = 0 - a.handlerSizePerc, a.minPosition = a.maxPosition + a.sliderLength, a.minPositionPerc = 100 - a.handlerSizePerc) : (a.minPosition = a.sliderPosition - a.handlerSizePx / 2, a.minPositionPerc = 0 - a.handlerSizePerc, a.maxPosition = a.minPosition + a.sliderLength, a.maxPositionPerc = 100 - a.handlerSizePerc), a.positionRange = Math.abs(a.minPosition - a.maxPosition);
        }, this.showRange = function () {
          var e = document.createElement("div");
          return e.classList.add("slider__range"), a.options.vertical ? (e.style.width = a.slider.getBoundingClientRect().width + 2 + "px", e.style.left = "-1px") : (e.style.height = a.slider.getBoundingClientRect().height + 2 + "px", e.style.top = "-1px"), a.slider.append(e), a.rangeBlock = a.slider.querySelector(".slider__range"), a.getSliderRangePosition(), a.rangeBlock;
        }, this.getSliderRangePosition = function () {
          a.getHandlerSize(), a.options.vertical ? (a.handlersPositionPerc[0] > a.handlersPositionPerc[1] ? a.rangeBlock.style.top = a.handlersPositionPerc[1] + "%" : a.rangeBlock.style.top = a.handlersPositionPerc[0] + "%", a.rangeBlock.style.height = Math.abs(a.handlersPositionPerc[1] - a.handlersPositionPerc[0]) + "%") : (a.handlersPositionPerc[0] > a.handlersPositionPerc[1] ? a.rangeBlock.style.left = a.handlersPositionPerc[1] + "%" : a.rangeBlock.style.left = a.handlersPositionPerc[0] + "%", a.rangeBlock.style.width = Math.abs(a.handlersPositionPerc[1] - a.handlersPositionPerc[0]) + "%");
        }, this.moveByMouse = function (e, i, n) {
          var t, s;
          e.preventDefault(), a.getMinMaxPosition(), t = a.options.vertical ? e.clientY - a.handlers[n].getBoundingClientRect().y : e.clientX - a.handlers[n].getBoundingClientRect().x + pageXOffset, s = t / a.sliderLength * 100, i.classList.add("slider__handler_active"), document.onmousemove = function (e) {
            if (e.preventDefault, a.options.vertical) {
              var t = (e.clientY - a.slider.getBoundingClientRect().y) / a.slider.getBoundingClientRect().height * 100 - s;
              t <= a.maxPositionPerc && (t = a.maxPositionPerc), t >= a.minPositionPerc && (t = a.minPositionPerc), i.style.top = t + "%", a.writeNewPosition(i, n, t);
            } else {
              var o = (e.clientX - a.slider.getBoundingClientRect().x) / a.slider.getBoundingClientRect().width * 100 - s;
              o <= a.minPositionPerc && (o = a.minPositionPerc), o >= a.maxPositionPerc && (o = a.maxPositionPerc), i.style.left = o + "%", a.writeNewPosition(i, n, o);
            }
          }, document.onmouseup = function () {
            i.classList.remove("slider__handler_active"), document.onmousemove = null;
          };
        }, this.moveByTouch = function (e, i, n) {
          var t, s;
          e.preventDefault(), a.getMinMaxPosition(), t = a.options.vertical ? e.changedTouches[0].clientY - a.handlers[n].getBoundingClientRect().y : e.changedTouches[0].clientX - a.handlers[n].getBoundingClientRect().x + pageXOffset, s = t / a.sliderLength * 100, i.classList.add("slider__handler_active"), document.ontouchmove = function (e) {
            if (e.preventDefault, a.options.vertical) {
              var t = (e.changedTouches[0].clientY - a.slider.getBoundingClientRect().y) / a.slider.getBoundingClientRect().height * 100 - s;
              t <= a.maxPositionPerc && (t = a.maxPositionPerc), t >= a.minPositionPerc && (t = a.minPositionPerc), i.style.top = t + "%", a.writeNewPosition(i, n, t);
            } else {
              var o = (e.changedTouches[0].clientX - a.slider.getBoundingClientRect().x) / a.slider.getBoundingClientRect().width * 100 - s;
              o <= a.minPositionPerc && (o = a.minPositionPerc), o >= a.maxPositionPerc && (o = a.maxPositionPerc), i.style.left = o + "%", a.writeNewPosition(i, n, o);
            }
          }, document.ontouchend = function () {
            i.classList.remove("slider__handler_active"), document.ontouchmove = null;
          };
        }, this.writeNewPosition = function (e, i, n) {
          a.handlersPositionPerc[i] = n + a.handlerSizePerc, a.options.range && a.getSliderRangePosition(), a.notifyChangedHandlerPosition();
        }, this.moveByClick = function (e) {
          var i, n;
          e.preventDefault(), a.getMinMaxPosition(), i = a.options.vertical ? e.clientY : e.clientX;
          var t = 0;

          if ((n = 2 == a.options.handlersAmount ? a.getNearestHandler(i) : a.handlers[0]) == a.handlers[1] && (t = 1), a.options.vertical) {
            var s = (i - a.slider.getBoundingClientRect().y) / a.slider.getBoundingClientRect().height * 100 - a.handlerSizePerc;
            s <= a.maxPositionPerc && (s = a.maxPositionPerc), s >= a.minPositionPerc && (s = a.minPositionPerc), n.style.top = s + "%", a.writeNewPosition(n, t, s);
          } else {
            var o = (i - a.slider.getBoundingClientRect().x) / a.slider.getBoundingClientRect().width * 100 - a.handlerSizePerc;
            o <= a.minPositionPerc && (o = a.minPositionPerc), o >= a.maxPositionPerc && (o = a.maxPositionPerc), n.style.left = o + "%", a.writeNewPosition(n, t, o);
          }
        }, this.getNearestHandler = function (e) {
          var i, n;
          return a.options.vertical ? (i = Math.abs(a.handlers[0].getBoundingClientRect().y - e), n = Math.abs(a.handlers[1].getBoundingClientRect().y - e)) : (i = Math.abs(a.handlers[0].getBoundingClientRect().x - e), n = Math.abs(a.handlers[1].getBoundingClientRect().x - e)), n < i ? a.handlers[1] : a.handlers[0];
        }, this.updatePosition = function () {
          for (var e = 0; e < a.handlers.length; e++) {
            var i = a.handlersPositionPerc[e] - a.handlerSizePerc;
            a.options.vertical ? a.handlers[e].style.top = i + "%" : a.handlers[e].style.left = i + "%";
          }

          a.options.range && a.getSliderRangePosition();
        }, this.options = e, this.values = l, this.subViewSliderLine = new i["default"](), this.subViewHandlers = new n["default"](), this.subViewScale = new o["default"](), this.subViewIcons = new t["default"](), this.subViewInput = new s["default"](), this.handlersPosition = [], this.handlersPositionPerc = [], this.createSlider(e, r), this.getSliderData(), this.resizeListener(), this.subViewHandlers.handlerMouseDown = function (e, i, n) {
          a.moveByMouse(e, i, n);
        }, this.subViewHandlers.handlerTouchStart = function (e, i, n) {
          a.moveByTouch(e, i, n);
        }, this.subViewInput.newInputValue = function (e, i) {
          a.notifyChangedInputValue(e, i);
        }, this.subViewSliderLine.sliderClick = function (e) {
          e.target !== a.handlers[0] && e.target !== a.handlers[1] && a.moveByClick(e);
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
  "l5OC": [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: !0
    });

    var o = function () {
      return function (o) {
        var e = this;
        this.checkOptions = function (o) {
          e.options.minValue = Number(o.minValue), e.options.maxValue = Number(o.maxValue), e.options.startingValue = [Number(o.startingValue[0]), Number(o.startingValue[1])], e.options.step = Number(o.step), e.options.handlersAmount = Number(o.handlersAmount), e.options.minValue >= e.options.maxValue && console.log("Slider: minValue should not be equal or be more than maxValue");

          for (var n = 0; n <= e.options.startingValue.length; n++) {
            e.options.startingValue[n] > e.options.maxValue ? e.options.startingValue[n] = e.options.maxValue : e.options.startingValue[n] < e.options.minValue && (e.options.startingValue[n] = e.options.minValue);
          }

          e.options.handlersAmount < 1 ? (e.options.handlersAmount = 1, console.log("Slider: handlers amount should be equal either 1 or 2")) : e.options.handlersAmount > 2 && (e.options.handlersAmount = 2, console.log("Slider: handlers amount should be equal either 1 or 2")), 2 == e.options.handlersAmount && e.options.startingValue.length < 2 && (e.options.startingValue = [e.options.minValue, e.options.maxValue], console.log("Slider: starting value should be defined for every handler")), e.options.step >= Math.abs(e.options.maxValue - e.options.minValue) && console.log("Slider: step value should  be  less than slider value range"), 1 == e.options.handlersAmount && e.options.range && (e.options.range = !1, console.log("Slider: range option cannot be applied to one handler")), e.options.scaleLegend && !e.options.scale && (e.options.scaleLegend = !1, console.log("Slider: scaleLegend option cannot be applied without scale option")), e.options.customValues && (e.options.moveBySteps = !0);
        }, this.options = o, this.checkOptions(o);
      };
    }();

    exports.Options = o;
  }, {}],
  "mxbi": [function (require, module, exports) {
    "use strict";

    var e = function e(_e2) {
      return _e2 && _e2.__esModule ? _e2 : {
        "default": _e2
      };
    };

    Object.defineProperty(exports, "__esModule", {
      value: !0
    });

    var n = e(require("./model")),
        t = require("./view"),
        i = require("./options"),
        o = function () {
      return function (e, o) {
        var s = this;
        this.setInitialHandlersPosition = function () {
          if (s.options.customValues) for (var e = 0; e < s.view.handlers.length; e++) {
            var n = s.options.startingValue[e],
                t = s.model.allValues[n].percent;
            s.view.handlersPositionPerc[e] = t, s.options.vertical ? (s.view.handlersPositionPerc[e] = 100 - t, s.view.handlers[e].style.top = 100 - t - s.view.handlerSizePerc + "%") : (s.view.handlersPositionPerc[e] = t, s.view.handlers[e].style.left = t - s.view.handlerSizePerc + "%");
          } else s.getPositionFromValue();
          s.options.range && (s.model.getRangeValue(), s.view.getSliderRangePosition()), s.setInputIconsValues();
        }, this.setHandlersToInputValue = function (e, n) {
          null != e ? (e > s.options.maxValue ? e = s.options.maxValue : e < s.options.minValue && (e = s.options.minValue), s.model.currentValue[n] = e, s.getPositionFromValue()) : s.getValueFromPosition();
        }, this.getValueFromPosition = function () {
          for (var e = 0; e < s.view.handlers.length; e++) {
            var n = void 0;
            n = s.options.vertical ? (100 - s.view.handlersPositionPerc[e]) / s.model.valuePercent : s.view.handlersPositionPerc[e] / s.model.valuePercent, s.options.moveBySteps ? (s.getNearestStepPos(), s.options.range && s.view.getSliderRangePosition()) : s.model.currentValue[e] = s.options.minValue + Math.round(n), s.options.icon && (s.view.icons[e].innerHTML = String(s.model.currentValue[e]), s.view.subViewIcons.getIconsShift());
          }

          s.options.range && (s.model.getRangeValue(), s.view.getSliderRangePosition()), s.setInputIconsValues();
        }, this.getNearestStepPos = function () {
          for (var e = function e(_e3) {
            var n;
            n = s.options.vertical ? 100 - s.view.handlersPositionPerc[_e3] : s.view.handlersPositionPerc[_e3];
            var t = s.model.stepPercent / 2,
                i = s.model.allValues.filter(function (e) {
              return Math.abs(n - e.percent) <= t;
            });
            i.length > 1 && i.length <= 2 && (Math.abs(n - i[0].percent) < Math.abs(n - i[1].percent) ? i.splice(1, 1) : i.splice(0, 1)), s.options.vertical ? s.view.handlersPositionPerc[_e3] = 100 - i[0].percent : s.view.handlersPositionPerc[_e3] = i[0].percent, s.view.updatePosition(), s.model.currentValue[_e3] = i[0].val;
          }, n = 0; n < s.view.handlers.length; n++) {
            e(n);
          }
        }, this.getNearestStepVal = function () {
          for (var e = function e(_e4) {
            var n = s.model.currentValue[_e4],
                t = s.options.step / 2,
                i = s.model.allValues.filter(function (e) {
              return Math.abs(e.val - n) <= t;
            });
            i.length > 1 && i.length <= 2 && (Math.abs(n - i[0].val) < Math.abs(n - i[1].val) ? i.splice(1, 1) : i.splice(0, 1)), s.options.vertical ? s.view.handlersPositionPerc[_e4] = 100 - i[0].percent : s.view.handlersPositionPerc[_e4] = i[0].percent, s.model.currentValue[_e4] = i[0].val;
          }, n = 0; n < s.view.handlers.length; n++) {
            e(n);
          }
        }, this.getPositionFromValue = function () {
          s.view.getMinMaxPosition();

          for (var e = 0; e < s.view.handlers.length; e++) {
            var n = s.model.currentValue[e] - s.options.minValue,
                t = void 0;
            s.options.vertical ? (s.options.moveBySteps ? (s.getNearestStepVal(), t = s.view.handlersPositionPerc[e] - s.view.handlerSizePerc) : (t = 100 - n * s.model.valuePercent - s.view.handlerSizePerc, s.view.handlersPositionPerc[e] = t + s.view.handlerSizePerc), s.view.handlers[e].style.top = t + "%") : (s.options.moveBySteps ? (s.getNearestStepVal(), t = s.view.handlersPositionPerc[e] - s.view.handlerSizePerc) : (t = n * s.model.valuePercent - s.view.handlerSizePerc, s.view.handlersPositionPerc[e] = t + s.view.handlerSizePerc), s.view.handlers[e].style.left = t + "%");
          }

          s.options.range && (s.model.getRangeValue(), s.view.getSliderRangePosition()), s.setInputIconsValues();
        }, this.setInputIconsValues = function () {
          if (s.options.icon) {
            for (var e = 0; e < s.options.handlersAmount; e++) {
              s.view.icons[e].innerHTML = String(s.model.currentValue[e]);
            }

            s.view.subViewIcons.getIconsShift();
          }

          if (s.options.rangeInput && (s.options.range ? s.options.customValues ? s.view.rangeInput.value = s.model.currentValue[0] + " - " + s.model.currentValue[1] : s.view.rangeInput.value = String(s.model.rangeValue) : 2 == s.options.handlersAmount && (s.view.rangeInput.value = s.model.currentValue[0] + "; " + s.model.currentValue[1])), s.options.valueInputs) for (e = 0; e < s.options.handlersAmount; e++) {
            s.view.valueInputs[e].value = "" + s.model.currentValue[e];
          }
        }, this.options = new i.Options(e).options, this.model = new n["default"](this.options), this.options.customValues && (this.model.notifyChangedOptions = function () {
          s.options = s.model.options;
        }), this.view = new t.View(this.options, o, this.model.allValues), console.log(this.view), console.log(this.model), this.setInitialHandlersPosition(), this.view.notifyChangedHandlerPosition = function () {
          s.getValueFromPosition();
        }, this.view.notifyChangedInputValue = function (e, n) {
          s.setHandlersToInputValue(e, n);
        }, this.view.notifyChangedWindow = function () {
          s.getPositionFromValue();
        };
      };
    }();

    exports.Presenter = o;
  }, {
    "./model": "pjIr",
    "./view": "CBC0",
    "./options": "l5OC"
  }],
  "QLcG": [function (require, module, exports) {
    "use strict";

    var e = require("@babel/runtime/helpers/interopRequireDefault"),
        r = e(require("@babel/runtime/helpers/typeof"));

    Object.defineProperty(exports, "__esModule", {
      value: !0
    });

    var t = require("./src/presenter");

    !function (e) {
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
        icon: !0,
        customValues: !1,
        customValuesList: ""
      },
          i = {
        init: function init(r) {
          return this.each(function () {
            var i = e.extend({}, n, r);
            this.presenter = new t.Presenter(i, this);
          });
        },
        destroy: function destroy() {
          return this.each(function () {
            for (var e = 0, r = this.children; e < r.length; e++) {
              r[e].remove();
            }
          });
        }
      };

      e.fn.slider = function (t) {
        return i[t] ? i[t].apply(this, Array.prototype.slice.call(arguments, 1)) : "object" !== (0, r["default"])(t) && t ? void e.error("Метод с именем " + t + " не существует для jQuery.slider") : i.init.apply(this, arguments);
      };
    }(jQuery);
  }, {
    "@babel/runtime/helpers/interopRequireDefault": "kvRt",
    "@babel/runtime/helpers/typeof": "LNzP",
    "./src/presenter": "mxbi"
  }]
}, {}, ["QLcG"], null);
},{"@babel/runtime/helpers/interopRequireDefault":"node_modules/@babel/runtime/helpers/interopRequireDefault.js","@babel/runtime/helpers/typeof":"node_modules/@babel/runtime/helpers/typeof.js"}],"../../Users/alexi/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "63776" + '/');

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