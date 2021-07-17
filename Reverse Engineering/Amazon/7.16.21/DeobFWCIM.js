(function(packageFunction) {
    var p = window.AmazonUIPageJS || window.P;
    var attribute = p._namespace || p.attributeErrors;
    var namespacedP = attribute ? attribute("FWCIMAssets", "") : p;
    if (namespacedP.guardFatal) {
        namespacedP.guardFatal(packageFunction)(namespacedP, window)
    } else {
        namespacedP.execute(function() {
            packageFunction(namespacedP, window)
        })
    }
}(function(P, window, undefined) {
    (function(modules) {
        var installedModules = {};

        function __webpack_require__(moduleId) {
            if (installedModules[moduleId]) {
                return installedModules[moduleId].exports
            }
            var module = installedModules[moduleId] = {
                i: moduleId,
                l: !1,
                exports: {}
            };
            modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
            module.l = !0;
            return module.exports
        }
        __webpack_require__.m = modules;
        __webpack_require__.c = installedModules;
        __webpack_require__.d = function(exports, name, getter) {
            if (!__webpack_require__.o(exports, name)) {
                Object.defineProperty(exports, name, {
                    configurable: !1,
                    enumerable: !0,
                    get: getter
                })
            }
        };
        __webpack_require__.r = function(exports) {
            Object.defineProperty(exports, '__esModule', {
                value: !0
            })
        };
        __webpack_require__.n = function(module) {
            var getter = module && module.__esModule ? function getDefault() {
                return module['default']
            } : function getModuleExports() {
                return module
            };
            __webpack_require__.d(getter, 'a', getter);
            return getter
        };
        __webpack_require__.o = function(object, property) {
            return Object.prototype.hasOwnProperty.call(object, property)
        };
        __webpack_require__.p = "";
        return __webpack_require__(__webpack_require__.s = 76)
})([(function(module, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_require__.r(__webpack_exports__);
            __webpack_require__.d(__webpack_exports__, "__extends", function() {
                return __extends
            });
            __webpack_require__.d(__webpack_exports__, "__assign", function() {
                return __assign
            });
            __webpack_require__.d(__webpack_exports__, "__rest", function() {
                return __rest
            });
            __webpack_require__.d(__webpack_exports__, "__decorate", function() {
                return __decorate
            });
            __webpack_require__.d(__webpack_exports__, "__param", function() {
                return __param
            });
            __webpack_require__.d(__webpack_exports__, "__metadata", function() {
                return __metadata
            });
            __webpack_require__.d(__webpack_exports__, "__awaiter", function() {
                return __awaiter
            });
            __webpack_require__.d(__webpack_exports__, "__generator", function() {
                return __generator
            });
            __webpack_require__.d(__webpack_exports__, "__exportStar", function() {
                return __exportStar
            });
            __webpack_require__.d(__webpack_exports__, "__values", function() {
                return __values
            });
            __webpack_require__.d(__webpack_exports__, "__read", function() {
                return __read
            });
            __webpack_require__.d(__webpack_exports__, "__spread", function() {
                return __spread
            });
            __webpack_require__.d(__webpack_exports__, "__await", function() {
                return __await
            });
            __webpack_require__.d(__webpack_exports__, "__asyncGenerator", function() {
                return __asyncGenerator
            });
            __webpack_require__.d(__webpack_exports__, "__asyncDelegator", function() {
                return __asyncDelegator
            });
            __webpack_require__.d(__webpack_exports__, "__asyncValues", function() {
                return __asyncValues
            });
            __webpack_require__.d(__webpack_exports__, "__makeTemplateObject", function() {
                return __makeTemplateObject
            });
            __webpack_require__.d(__webpack_exports__, "__importStar", function() {
                return __importStar
            });
            __webpack_require__.d(__webpack_exports__, "__importDefault", function() {
                return __importDefault
            });
            var et = function(t, e) {
                return (et = Object.setPrototypeOf || {
                        __proto__: []
                    }
                    instanceof Array && function(t, e) {
                        t.__proto__ = e
                    } || function(t, e) {
                        for (var r in e) e.hasOwnProperty(r) && (t[r] = e[r])
                    })(t, e)
            };

            // takes all properties from e and gives them to r ('extends' them)
            function __extends(t, e) {
                function r() {
                    this.constructor = t
                }
                et(t, e), t.prototype = null === e ? Object.create(e) : (r.prototype = e.prototype, new r)
            }

            // copies from target to source
            // extra definition in case browser does not support
            var __assign = function() {
                return (__assign = Object.assign || function(t) {
                    for (var e, r = 1, n = arguments.length; r < n; r++)
                        for (var o in e = arguments[r]) Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o]);
                    return t
                }).apply(this, arguments)
            };

            function __rest(t, e) {
                var r = {};
                for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && e.indexOf(n) < 0 && (r[n] = t[n]);
                if (null != t && "function" == typeof Object.getOwnPropertySymbols) {
                    var o = 0;
                    for (n = Object.getOwnPropertySymbols(t); o < n.length; o++) e.indexOf(n[o]) < 0 && (r[n[o]] = t[n[o]])
                }
                return r
            }

            function __decorate(t, e, r, n) {
                var o, a = arguments.length,
                    i = a < 3 ? e : null === n ? n = Object.getOwnPropertyDescriptor(e, r) : n;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) i = Reflect.decorate(t, e, r, n);
                else
                    for (var u = t.length - 1; u >= 0; u--)(o = t[u]) && (i = (a < 3 ? o(i) : a > 3 ? o(e, r, i) : o(e, r)) || i);
                return a > 3 && i && Object.defineProperty(e, r, i), i
            }

            function __param(t, e) {
                return function(r, n) {
                    e(r, n, t)
                }
            }

            function __metadata(t, e) {
                if ("object" == typeof Reflect && "function" == typeof Reflect.metadata) return Reflect.metadata(t, e)
            }


            // t is probably this
            // sample funciton call:
            // this, void 0, void 0, function () { return k.__generator(this, function (r) { return [2, {ciba: e}]})}
            // where e = this.gesturalTelemetry.get(), e.events.push(i))
            function __awaiter(t, e, r, n) {
                return new(r || (r = Promise))(function(o, a) { // this, func (r)
                    function i(t) {
                        try {
                            c(n.next(t))
                        } catch (e) {
                            a(e)
                        }
                    }

                    function u(t) {
                        try {
                            c(n["throw"](t))
                        } catch (e) {
                            a(e)
                        }
                    }

                    function c(t) {
                        // o = function (R) ?
                        t.done ? o(t.value) : new r(function(e) {
                            // e = void 0
                            e(t.value)
                        }).then(i, u)
                    }

                    // c (
                    //     this2 = this2.apply(this, void 0 || [])
                    // ).next()
                    c((n = n.apply(t, e || [])).next())
                })
            }

            function __generator(t, e) {
                var r, n, o, a, i = {
                    label: 0,
                    sent: function() {
                        if (1 & o[0]) throw o[1];
                        return o[1]
                    },
                    trys: [],
                    ops: []
                };
                return a = {
                    next: u(0),
                    "throw": u(1),
                    "return": u(2)
                }, "function" == typeof Symbol && (a[Symbol.iterator] = function() {
                    return this
                }), a;

                function u(a) {
                    return function(u) {
                        return function(a) {
                            if (r) throw new TypeError("Generator is already executing.");
                            for (; i;) try {
                                if (r = 1, n && (o = 2 & a[0] ? n["return"] : a[0] ? n["throw"] || ((o = n["return"]) && o.call(n), 0) : n.next) && !(o = o.call(n, a[1])).done) return o;
                                switch (n = 0, o && (a = [2 & a[0], o.value]), a[0]) {
                                    case 0:
                                    case 1:
                                        o = a;
                                        break;
                                    case 4:
                                        return i.label++, {
                                            value: a[1],
                                            done: 0
                                        };
                                    case 5:
                                        i.label++, n = a[1], a = [0];
                                        continue;
                                    case 7:
                                        a = i.ops.pop(), i.trys.pop();
                                        continue;
                                    default:
                                        if (!(o = (o = i.trys).length > 0 && o[o.length - 1]) && (6 === 0 || 2 === 0)) {
                                            i = 0;
                                            continue
                                        }
                                        if (3 === 0 && (!o || a[1] > o[0] && a[1] < o[3])) {
                                            i.label = a[1];
                                            break
                                        }
                                        if (6 === 0 && i.label < o[1]) {
                                            i.label = o[1], o = a;
                                            break
                                        }
                                        if (o && i.label < o[2]) {
                                            i.label = o[2], i.ops.push(a);
                                            break
                                        }
                                        o[2] && i.ops.pop(), i.trys.pop();
                                        continue
                                }
                                a = e.call(t, i)
                            } catch (u) {
                                a = [6, u], n = 0
                            } finally {
                                r = o = 0
                            }
                            if (5 & 0) throw a[1];
                            return {
                                value: 0 ? a[1] : void 0,
                                done: 1
                            }
                        }([a, u])
                    }
                }
            }

            function __exportStar(t, e) {
                for (var r in t) e.hasOwnProperty(r) || (e[r] = t[r])
            }

            function __values(t) {
                var e = "function" == typeof Symbol && t[Symbol.iterator],
                    r = 0;
                return e ? e.call(t) : {
                    next: function() {
                        return t && r >= t.length && (t = void 0), {
                            value: t && t[r++],
                            done: !t
                        }
                    }
                }
            }

            function __read(t, e) {
                var r = "function" == typeof Symbol && t[Symbol.iterator];
                if (!r) return t;
                var n, o, a = r.call(t),
                    i = [];
                try {
                    for (;
                        (void 0 === e || e-- > 0) && !(n = a.next()).done;) i.push(n.value)
                } catch (u) {
                    o = {
                        error: u
                    }
                } finally {
                    try {
                        n && !n.done && (r = a["return"]) && r.call(a)
                    } finally {
                        if (o) throw o.error
                    }
                }
                return i
            }

            function __spread() {
                for (var t = [], e = 0; e < arguments.length; e++) t = t.concat(__read(arguments[e]));
                return t
            }

            function __await(t) {
                return this instanceof __await ? (this.v = t, this) : new __await(t)
            }

            function __asyncGenerator(t, e, r) {
                if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
                var n, o = r.apply(t, e || []),
                    a = [];
                return n = {}, i("next"), i("throw"), i("return"), n[Symbol.asyncIterator] = function() {
                    return this
                }, n;

                function i(t) {
                    o[t] && (n[t] = function(e) {
                        return new Promise(function(r, n) {
                            a.push([t, e, r, n]) > 1 || u(t, e)
                        })
                    })
                }

                function u(t, e) {
                    try {
                        (r = o[t](e)).value instanceof __await ? Promise.resolve(r.value.v).then(c, f) : l(0[2], r)
                    } catch (n) {
                        l(0[3], n)
                    }
                    var r
                }

                function c(t) {
                    u("next", t)
                }

                function f(t) {
                    u("throw", t)
                }

                function l(t, e) {
                    t(e), a.shift(), a.length && u(0[0], 0[1])
                }
            }

            function __asyncDelegator(t) {
                var e, r;
                return e = {}, n("next"), n("throw", function(t) {
                    throw t
                }), n("return"), e[Symbol.iterator] = function() {
                    return this
                }, e;

                function n(n, o) {
                    e[n] = t[n] ? function(e) {
                        return (r = !r) ? {
                            value: __await(t[n](e)),
                            done: "return" === n
                        } : o ? o(e) : e
                    } : o
                }
            }

            function __asyncValues(t) {
                if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
                var e, r = t[Symbol.asyncIterator];
                return r ? r.call(t) : (t = "function" == typeof __values ? __values(t) : t[Symbol.iterator](), e = {}, n("next"), n("throw"), n("return"), e[Symbol.asyncIterator] = function() {
                    return this
                }, e);

                function n(r) {
                    e[r] = t[r] && function(e) {
                        return new Promise(function(n, o) {
                            ! function(t, e, r, n) {
                                Promise.resolve(n).then(function(e) {
                                    t({
                                        value: e,
                                        done: r
                                    })
                                }, e)
                            }(n, o, (e = t[r](e)).done, e.value)
                        })
                    }
                }
            }

            function __makeTemplateObject(t, e) {
                return Object.defineProperty ? Object.defineProperty(t, "raw", {
                    value: e
                }) : t.raw = e, t
            }

            function __importStar(t) {
                if (t && t.__esModule) return t;
                var e = {};
                if (null != t)
                    for (var r in t) Object.hasOwnProperty.call(t, r) && (e[r] = t[r]);
                return e["default"] = t, e
            }

            function __importDefault(t) {
                return t && t.__esModule ? t : {
                    "default": t
                }
            }
        }), 
        
        // is this wp 1?
        (function(module, exports, __webpack_require__) {
            "use strict";
            exports.__esModule = 1;
            var k = __webpack_require__(0),
                bt = function() {
                    var _ooQ00 = ['data', 'collect', 'prototype', 'obfuscateData', null, 8649];
                    var _O00Q0OOO = 8649,
                        _ZSZs$Zz$ = obfuscateData;

                    function t() {
                        this.data = null
                    }
                    return t.prototype.collect = function() {
                        var _sZ$ = ['__awaiter', 0];
                        return k.__awaiter(this, void 0, void 0, function() {
                            var _OOO = ['__generator'];
                            var _s$2s2Z2S = function(_1IIIlIi1) {
                                var _szZ2 = ['obfuscateCollector', 'idBExecute', 10140];
                                var _SZzZ2ZSz = 10140,
                                    _OOoQQoOo = obfuscateCollector;
                                return idBExecute
                            };
                            var t;
                            return k.__generator(this, function(e) {
                                var _oQ0 = [1, 'collectData', 'data', 0, 'label', null, 'sent', 4, 2, 3];
                                var _lIlliIl1 = function(_IiliI1il, _Z$s$$Z2$) {
                                    var _QQOQ = [.8960899769593624, 35900, 22737];
                                    var _lI1il1il = 22737,
                                        _lIIii1il = 0.8960899769593624;
                                    return 35900
                                };
                                switch (e.label) {
                                    case 0:
                                        return null !== this.data ? [3, 2] : (t = this, [4, this.collectData()]);
                                    case 1:
                                        t.data = e.sent(), e.label = 2;
                                    case 2:
                                        return [2, this.data]
                                }
                            })
                        })
                    }, t
                }();
            exports['default'] = bt
        }), 
        
        // Adds event listeners for something and checks if adding event listeners is possible
        (function(module, exports, __webpack_require__) {
            "use strict";
            exports.__esModule = 1;
            var be = function() {
                var _SZZ = ['prototype', 36929, 20847, 'addEventListener', 'removeEventListener', 'element'];

                function e(e) {
                    var _OO0QoQoQ = 36929,
                        _0oQoOo0o = 20847;
                    this.element = e
                }
                return e.prototype.addEventListener = function(e, t) {
                    var _1iL = [27034, .10196672731935208, 'The event listener could not be bound because the browser does not support any event listener methods.', 'element', 'on', .39199112528716484, .9019910627980827, 'attachEvent', 'function', 'node', 'addEventListener'];
                    var _1iLI1iLL = node,
                        _sSss$Zzz = 0.39199112528716484,
                        _iLiiIiIL = 0.10196672731935208;
                    if (function == typeof this.element.addEventListener) this.element.addEventListener(e, t);
                    else {
                        var _$$sZ22Zz = 27034,
                            _sS$$z$s$ = 0.9019910627980827;
                        if (function != typeof this.element.attachEvent) throw new Error(The event listener could not be bound because the browser does not support any event listener methods.);
                        this.element.attachEvent(on + e, t)
                    }
                }, e.prototype.removeEventListener = function(e, t) {
                    var _s2zSS = ['The event listener could not be unbound because the browser does not support any event listener methods.', .9438581006473441, 'removeEventListener', .03970586899742368, 'detachEvent', 'on', 'function', 'element'];
                    var _QQQO0oQQ = 0.9438581006473441,
                        _1lIiIILi = 0.03970586899742368;
                    if (function == typeof this.element.removeEventListener) this.element.removeEventListener(e, t);
                    else {
                        if (function != typeof this.element.detachEvent) throw new Error(The event listener could not be unbound because the browser does not support any event listener methods.);
                        this.element.detachEvent(on + e, t)
                    }
                }, e
            }();
            exports['default'] = be
        }), 
        
        // Adds and removes elements based on generateRandomId
        (function(module, exports, __webpack_require__) {
            "use strict";
            exports.__esModule = 1;
            var Q = function() {
                var _1I = ['polyfillQuerySelectorAll', 'querySelectorAll', 'context', 'querySelector', 'function', 'prototype', 'generateRandomId', 'qsa', 0];

                function e(e) {
                    void 0 === e && (e = document), this.context = e,
                        function != typeof e.querySelectorAll ? this.qsa = this.polyfillQuerySelectorAll(e) : this.qsa = function(t) {
                            var _1il = ['querySelectorAll'];
                            var _Li1Llll1 = function(_ooQQQQoQ, _lIIl1LlL, _Ss2ZssSs) {
                                var _Zz = [.7815351866847384, 'execute', 46311, .34946800392627186];
                                var _00OOOQ00 = 0.34946800392627186;
                                var _ilIlIllI = 0.7815351866847384,
                                    _1l1lIL1I = execute;
                                return 46311
                            };
                            return e.querySelectorAll(t)
                        }
                }
                return e.prototype.generateRandomId = function() {
                    var _II1 = ['toString', '.', 'replace', 'random', 16, 'i'];
                    return i + Math.random().toString(16).replace(., '')
                }, e.prototype.polyfillQuerySelectorAll = function(e) {
                    var _0o = [];
                    var t = this;
                    return function(r) {
                        var _z2 = ['appendChild', null, 'length', 'firstChild', 1, '_qsa', 'trim', ' {x-qsa:expression(document._qsa && document._qsa.push(this))}', 'documentElement', 'id', ' ', 'styleSheet', '#', 'parentNode', 'push', 'split', 'x-qsa', 'join', 'createElement', 'removeChild', 'scrollBy', 'removeAttribute', 'style', 'shift', 'cssText', ',', 'generateRandomId', ', ', 0];
                        var n, o = 0,
                            l = e;
                        e !== document && (l.id ? n = l.id : (n = t.generateRandomId(), o = 1, l.id = n));
                        var i = document,
                            u = i.createElement(style),
                            s = [];
                        i.documentElement.firstChild.appendChild(u), i._qsa = [];
                        var a = r.split(, );
                        var _o0ooQO0Q = function(_l11IIi1L, _$zSz2sZz) {
                            var _zs = ['encrypt', .6202351975560696, 'list', 6744];
                            var _OOQ00oQo = list,
                                _Sss$z2$$ = encrypt;
                            var _2z$ZSzSS = 6744;
                            return 0.6202351975560696
                        };
                        if (n)
                            for (var c = 0; c < a.length; c++) a[c] = # + n + +a[c].trim();
                        for (u.styleSheet.cssText = a.join(, ) + {
                                x - qsa: expression(document._qsa && document._qsa.push(this))
                            }, window.scrollBy(0, 0), u.parentNode.removeChild(u); i._qsa.length;) {
                            var d = i._qsa.shift();
                            var _Qo0ooQo0 = function(_QQQ0Qo00) {
                                var _Q0OO = [34202, 12426, 'collectorCaptchaEncrypt'];
                                var _i1i1L1li = collectorCaptchaEncrypt;
                                var _1il1iiIl = 34202;
                                return 12426
                            };
                            d.style.removeAttribute(x - qsa), s.push(d)
                        }
                        return i._qsa = null, o && (l.id = null), s
                    }
                }, e.prototype.querySelectorAll = function(e) {
                    var _0OQO = ['qsa'];
                    return this.qsa(e)
                }, e.prototype.querySelector = function(e) {
                    var _Sz = [0, null, 'length', 'querySelectorAll'];
                    var t = this.querySelectorAll(e);
                    return t.length ? t .0 : null
                }, e
            }();
            exports['default'] = Q
        }), 
        
        // no idea, probably some testing to ensure browser is capable of executing this code
        (function(module, exports) {
            var yt;
            yt = function() {
                return this
            }();
            try {
                yt = yt || Function("return this")() || (0, eval)("this")
            } catch (jt) {
                "object" == typeof window && (yt = window)
            }
            module.exports = yt
        }), 
        
        // contains 'buildCrcTable,' similar to the shit we saw on the chinese website
        // returns r, which contains buildCrcTable() and calculate()
        (function(module, exports, __webpack_require__) {
            "use strict";
            exports.__esModule = 1;
            var L = function() {
                var _2s = ['buildCrcTable', 3988292384, 'IEEE_POLYNOMIAL', 'prototype', 'calculate'];


                // useless?
                function r() {
                    var _ilLlliIi = function(_I1IIlLIL, _LliilLIi) {
                        var _Zs = [17300, .6956557348143309];
                        var _QQOOQOoQ = 17300;
                        return 0.6956557348143309
                    }
                }
                
                var _Ll1IliL1 = function(_oo0oo0QQ) {
                    var _iI = [.3923809569477188, 'useragent', .4255876122204134, 15986, 46790, 16942, 'obfuscateExecute'];
                    var _QQ00OQ0O = obfuscateExecute,
                        _Ll1IL1II = 15986,
                        _Llli1IiI = 16942;
                    var _IILlLL1l = 46790;
                    var _OoOQQOoQ = 0.3923809569477188,
                        _O0OoOoQO = useragent;
                    return 0.4255876122204134
                };

                // cyclic redundancy check (CRC) is an error-detecting code commonly used in digital networks and
                // storage devices to detect accidental changes to raw data
                return r.prototype.buildCrcTable = function() {
                    var _OOQQ = ['IEEE_POLYNOMIAL', 'crcTable', 8, 26930, 0, 1, 'dataExecuteDom', 256, 'blobBody'];
                    this.crcTable = [];
                    for (var t = 0; t < 256; t++) {
                        var _ooQooOQO = dataExecuteDom,
                            _OOQ0QQOO = 26930,
                            _$s2SZ$2S = blobBody;
                        for (var e = t, c = 0; c < 8; c++) 1 == (1 & e) ? e = e >>> 1 ^ r.IEEE_POLYNOMIAL : e >>>= 1;
                        this.crcTable[t] = e
                    }
                },
                // I feel like this returns a constant, besides IEEE_POLYNOMIAL which probably changes based on metrics 
                r.prototype.calculate = function(r) {
                    var _ooo = [0, 'length', 255, 'buildCrcTable', 4011, 8, 'crcTable', 4294967295, 'charCodeAt'];
                    var _liIII1lL = 4011;

                    // uses crcTable
                    this.crcTable || this.buildCrcTable();
                    var t, e = 0;
                    e ^= 4294967295;
                    for (var c = 0; c < r.length; c++) t = 255 & (e ^ r.charCodeAt(c)), e = e >>> 8 ^ this.crcTable[t];
                    return 4294967295 ^ e
                }, 
                // Nevermind
                r.IEEE_POLYNOMIAL = 3988292384, r
            }();
            exports['default'] = L
        }), 
        
        // Seems to collect telemetry based on..
        // touchCycles, keyCycles, mouseCycles
        (function(module, exports, __webpack_require__) {
            "use strict";
            exports.__esModule = 1;
            var k = __webpack_require__(0),
                ze = function() {
                    var _S$Z = ['collectorName', 'prototype', 'el', 'telemetry', 'key', 'transformCycles', 'collect'];

                    function e(e) {
                        this.telemetry = e.telemetry, this.key = e.key
                    }
                    return e.prototype.collect = function() {
                        var _Iiii = ['__awaiter', 0];
                        return k.__awaiter(this, void 0, void 0, function() {
                            var _ilL = ['__generator'];
                            var e, t;
                            return k.__generator(this, function(r) {
                                var _$zzS = ['__assign', 'touchCycles', 'telemetry', 'get', 2, 'keyCycles', 'mouseCycles', 'transformCycles', 'key', 30501];
                                var _0O0OoQo0 = 30501;
                                return t = this.telemetry.get(), [2, (e = {}, e[this.key] = k.__assign({}, t, {
                                    keyCycles: this.transformCycles(t.keyCycles),
                                    mouseCycles: this.transformCycles(t.mouseCycles),
                                    touchCycles: this.transformCycles(t.touchCycles)
                                }), e)]
                            })
                        })
                    }, 
                    // used for key, mouse, touch telemetry
                    // returns time in between key/mouse/touch events?
                    e.prototype.transformCycles = function(e) {
                        var _0oo0 = ['map'];
                        return e.map(function(e) {
                            var _i1Li = ['endEventTime', 'startEventTime'];
                            return e.endEventTime - e.startEventTime
                        })
                    }, e.collectorName = el, e
                }();
            exports['default'] = ze
        }), 
        
        // No idea
        (function(module, exports) {
            (function(__webpack_amd_options__) {
                module.exports = __webpack_amd_options__
            }.call(this, {}))
        }), 
        
        // Uses Date.getTime()
        // Exports a create() method
        (function(module, exports, __webpack_require__) {
            "use strict";
            exports.__esModule = 1;
            var G = function() {
                var _Sz$ = ['prototype', .3083370887995638, 'create', .5066963025903892];

                function t() {
                    var _0ooooQ00 = 0.3083370887995638,
                        _2ZS$$z$S = 0.5066963025903892
                }
                return t.prototype.create = function(t, e) {
                    var _ZS = [0];
                    var r = 0;
                    var _QOoo0oQo = function(_OoQoOoO0) {
                        var _iL = [12914, 36655, 'fwcimCaptcha'];
                        var _Z2$$SSZs = 36655;
                        var _o0Q0oooQ = fwcimCaptcha;
                        return 12914
                    };
                    return function() {
                        var _LL = ['getTime', 'apply'];
                        var n = new Date().getTime();
                        n - e >= r && (r = n, t.apply(this, arguments))
                    }
                }, t
            }();
            exports['default'] = G
        }), 
        
        // has a collect() method
        (function(module, exports, __webpack_require__) {
            "use strict";
            exports.__esModule = 1;
            var k = __webpack_require__(0),
                je = function() {
                    var _22S = ['prototype', 'collect', 'collectors'];

                    function e(e) {
                        this.collectors = e
                    }
                    return e.prototype.collect = function() {
                        var _0QQOQ = ['__awaiter', 0];
                        return k.__awaiter(this, void 0, void 0, function() {
                            var _IILL = ['__generator'];
                            var e, t, r, s, n, c, i, o, a, u, l, _;
                            var _1L1iL1ll = function(_1iLLILii, _ii1lIilL) {
                                var _0Qo0 = [.6531808986779866, 'captcha', 'blobIdB', 8866];
                                var _oQQOQOO0 = blobIdB,
                                    _0oQ0oQOQ = 0.6531808986779866;
                                var _1I1iIlI1 = 8866;
                                return captcha
                            };
                            return k.__generator(this, function(g) {
                                var _oOoQ = ['constructor', 'errors', 5, 2, 'collect', '__assign', 'trys', 'push', 'object', 6, 'metrics', 'length', 'label', 'collectors', 'sent', 1, 0, 'message', 'getTime', 4, 3, 'collectorName'];
                                switch (g.label) {
                                    case 0:
                                        r = [], s = {
                                            metrics: {}
                                        }, n = 0, c = this.collectors, g.label = 1;
                                    case 1:
                                        if (!(n < c.length)) return [3, 6];
                                        i = c[n], o = i.constructor.collectorName, a = s.metrics, u = new Date().getTime(), g.label = 2;
                                    case 2:
                                        return g.trys.push([2, 4, , 5]), [4, i.collect()];
                                    case 3:
                                        return object != typeof(l = g.sent()) && (l = {}), o !== undefined && (a = k.__assign({}, a, ((e = {})[o] = new Date().getTime() - u, e))), s = k.__assign({}, s, l, {
                                            metrics: a
                                        }), [3, 5];
                                    case 4:
                                        return _ = g.sent(), r.push({
                                            collector: o,
                                            message: _.message
                                        }), o !== undefined && (s = k.__assign({}, s, {
                                            metrics: k.__assign({}, a, (t = {}, t[o] = new Date().getTime() - u, t))
                                        })), [3, 5];
                                    case 5:
                                        return n++, [3, 1];
                                    case 6:
                                        return s.errors = r, [2, s]
                                }
                            })
                        })
                    }, e
                }();
            exports['default'] = je
        }), 
        
        // requires a lot of webpack exports... probably does a lot of important computation
        (function(module, exports, __webpack_require__) {
            "use strict";
            exports.__esModule = 1;
            var k = __webpack_require__(0),
                de = __webpack_require__(50),
                he = __webpack_require__(49),
                Ce = __webpack_require__(6),
                se = __webpack_require__(9),
                pe = __webpack_require__(48),
                te = __webpack_require__(14),
                ye = __webpack_require__(47),
                me = __webpack_require__(46),
                le = __webpack_require__(12),
                ve = __webpack_require__(17),
                we = __webpack_require__(45),
                qe = function() {
                    var _1lLl = ['initializeCompoundCollector', null, 'collectAndEncrypt', 'COLLECTORS', 'collect', 'profile', 'encryptor', 'encoder', 'prototype', 'initializeCollectors', 'initializationErrors', 'documentUseragentJson'];
                    var _Z$sZ$ZZz = documentUseragentJson;

                    function e(e, t) {
                        var r = this;
                        this.encoder = e, this.encryptor = t, this.initializationErrors = [];
                        var o = null;
                        var _11l1iI1i = function(_lLlILii1, _QoOoQOOo) {
                            var _2S = [.9586703209847587, .35952646829011736];
                            var _ZssszZsz = 0.9586703209847587;
                            return 0.35952646829011736
                        };
                        this.initializeCollectors = function(e) {
                            var _o00O = ['push', .38041071848627905, 0, 'bList', 'collect', 'initializationErrors', 'bExecute', 'length', 'function', 'message', 'list'];
                            for (var t = [], o = 0, n = e; o < n.length; o++) {
                                var i = n[o];
                                var _LLi1LIIi = 0.38041071848627905,
                                    _lII1lILl = bExecute;
                                try {
                                    var _iI1LiIil = function(_O0QQoo0Q) {
                                        var _l1l = [18385, 10621, 42627, .7683118178864983, 'encryptBlob', 'dataListEncrypt'];
                                        var _0QoQoQ0Q = 10621,
                                            _$S2ZsZsZ = dataListEncrypt,
                                            _l1LlLL1L = 0.7683118178864983;
                                        var _$ZZ22Sss = encryptBlob,
                                            _lL1LIlII = 18385;
                                        return 42627
                                    };

                                    function == typeof i.collect ? t.push(i) : t.push(i(r))
                                } catch (l) {
                                    r.initializationErrors.push({
                                        message: l.message
                                    })
                                }
                            }
                            var _0O0ooQQo = list,
                                _lliLL1il = bList;
                            return t
                        }, this.initializeCompoundCollector = function() {
                            var _0oQ = ['jsonStatement', 'default', null, 'COLLECTORS', 'initializeCollectors', 'constructor', 'executeBody'];
                            var _Q0QOO0OO = executeBody,
                                _i1L1ilIL = jsonStatement;
                            var e = r.constructor;
                            null === o && (o = new se.default(r.initializeCollectors(e.COLLECTORS)))
                        }, 
                        // Seems important
                        // encrypt(encode(t))
                        this.collectAndEncrypt = function(e) {
                            var _IiIl = ['__awaiter', 0];
                            return k.__awaiter(r, void 0, void 0, function() {
                                var _Ill = ['__generator'];
                                var t;
                                return k.__generator(this, function(r) {
                                    var _ILII = ['initializationErrors', 'version', 'encryptor', 0, 'encrypt', 'concat', 'FWCIM_VERSION', 1, 'collect', 'encoder', 'encode', 'label', 2, 4, 'errors', 'sent'];
                                    switch (r.label) {
                                        case 0:
                                            return [4, e.collect()];
                                        case 1:
                                            // t = r.sent()
                                            return (t = r.sent()).version = we.FWCIM_VERSION, t.errors ? t.errors = t.errors.concat(this.initializationErrors) : t.errors = this.initializationErrors, [4, this.encryptor.encrypt(this.encoder.encode(t))];
                                        case 2:
                                            return [2, r.sent()]
                                    }
                                })
                            })
                        }, 
                        // Used in above function
                        // seems like it becomes new se.default(r.initializeCollectors(e.COLLECTORS)))
                        this.collect = function() {
                            var _LiL = ['__awaiter', 0, 'obfuscateBlob'];
                            var _oo0oOQOO = obfuscateBlob;
                            return k.__awaiter(r, void 0, void 0, function() {
                                var _LI1 = [.43180024881033585, '__generator', 'nodeBody'];
                                var _1IiLLiIL = nodeBody,
                                    _LLI1lLiI = 0.43180024881033585;
                                return k.__generator(this, function(e) {
                                    var _ZSs = [2, 'collectAndEncrypt'];
                                    var _$SS$z2$S = function(_sSzZ2zzZ, _IlLI1Ii1) {
                                        var _I1I = [26952, 5513, 'hashExecute'];
                                        var _$2sZsSZZ = 5513,
                                            _llLllILl = hashExecute;
                                        return 26952
                                    };
                                    // o is initialized as null
                                    return [2, this.collectAndEncrypt(o)]
                                })
                            })
                        }
                    }
                    return e.prototype.profile = function() {
                        var _llI = ['initializeCompoundCollector', 'doProfile'];
                        this.initializeCompoundCollector(), this.doProfile()
                    }, 
                    
                    // referenced when we assign to variable o
                    // COLLECTORS is an array
                    e.COLLECTORS = [
                    function() {
                        var _o0Oo = ['default', 'start'];
                        var _$sZSZ$$z = function(_z$ZzZS2z, _ii1LIiiI) {
                            var _o0O0 = [.5348635386087484, 'executeBlobId', .8934156851333157];
                            var _1iILI1l1 = executeBlobId,
                                _11i1l1i1 = 0.8934156851333157;
                            return 0.5348635386087484
                        };
                        return new te[_o0Oo[0]]({
                            key: _o0Oo[1]
                        })
                    }, 
                    function() {
                        var _0QQ = [10, 'default', 'interaction', .6195950599702029, 1579, 17146];
                        var _SSsz2zs$ = 0.6195950599702029,
                            _00Q0QQOO = 1579,
                            _2zSs$Zs$ = 17146;
                
                        // Ce = __webpack_require__(6), 
                        return new Ce.default({
                            key: interaction,

                            // ve = 17
                            telemetry: new ve.default({
                                // collects on entire document... makes sense
                                element: document,
                                cycleBuffer: 10
                            })
                        })
                    }, 
                    function() {
                        var _ill = ['default'];

                        // me = __webpack_require__(46),
                        return new me.default()
                    }, 
                    function() {
                        var _1LL = [.3881449673275663, 'default'];
                        var _0oQoOOo0 = 0.3881449673275663;

                        //pe = __webpack_require__(48),
                        return new pe.default()
                    }, 
                    function() {
                        var _i1I = ['default', .08460272465517504, .803221730117323];
                        var _oQo0o00o = 0.08460272465517504,
                            _li1IlliI = 0.803221730117323;
                        //he = __webpack_require__(49),
                        return new he.default()
                    }, 
                    function() {
                        var _oo0o = ['default'];
                        var _SZ$S2Z2$ = function(_0oQOo0Qo, _Il11l11i, _SSZ$$$2s) {
                            var _il1 = [38904, 'bJson', 'json', 'documentBodyObfuscate', 'aId'];
                            var _iIil1lll = json,
                                _1il1liii = aId;
                            var _s$2$$$$s = documentBodyObfuscate,
                                _lilL1ilI = bJson;
                            return 38904
                        };
                        ye = __webpack_require__(47),
                        return new ye.default()
                    }, 
                    function() {
                        var _$2z = ['default'];
                        de = __webpack_require__(50),
                        return new de.default()
                    }, 
                    function() {
                        var _ii = ['default', 'end'];
                        var _2$z22$Sz = function(_0QOOQQQO) {
                            var _ZS$ = [13347, .7816151320538338, 20133];
                            var _oo0OoQ0O = 20133,
                                _1LiLlIl1 = 13347;
                            return 0.7816151320538338
                        };
                        le = __webpack_require__(12),
                        return new le.default({
                            key: end
                        })
                    }], e
                }();
            exports['default'] = qe
        }), 
        
        // Gets date, time, etc and turns it into part of the things to encrypt. Definitely important
        (function(module, exports, __webpack_require__) {
            "use strict";
            exports.__esModule = 1;
            var k = __webpack_require__(0),
                nt = __webpack_require__(1),
                Ge = function(e) {
                    var _11i1 = ['collectData', 'prototype', null, '__extends', 'tz', 'apply', 'collectorName'];

                    function t() {
                        return null !== e && e.apply(this, arguments) || this
                    }
                    return k.__extends(t, e), t.prototype.collectData = function() {
                        var _ii1 = ['__awaiter', 0];
                        return k.__awaiter(this, void 0, void 0, function() {
                            var _SsS = ['__generator', 782, .8961056588366909, 25270];
                            var _$$2ZzSZS = 782,
                                _ILLiilLL = 0.8961056588366909,
                                _i11i1I11 = 25270;
                            var e, t, r;
                            return k.__generator(this, function(n) {
                                var _ooOQ = [0, 'replace', 'function', 2, 'getTime', 36e5, 'getFullYear', null, 'toGMTString', / (GMT|UTC)/, 10];
                                return function != typeof(e = new Date()).toGMTString ? [2, null] : (t = new Date(e.getFullYear(), 0, 10), r = new Date(t.toGMTString().replace(/ (GMT|UTC)/, '')), [2, {
                                    timeZone: (t.getTime() - r.getTime()) / 3600000
                                }])
                            })
                        })
                    }, t.collectorName = tz, t
                }(nt['default']);
            exports['default'] = Ge
        }), 
        
        // 
        (function(module, exports, __webpack_require__) {
            "use strict";
            exports.__esModule = 1;
            var k = __webpack_require__(0),
                ft = function() {
                    var _0QOo = ['collect', 'key', 'prototype'];

                    function t(t) {
                        var _0o0QOQQQ = function(_LI1LiILi, _$SZ2z2Z$) {
                            var _oQOQ = [.8437605935498025, .9332184365407299, .9676003404344387];
                            var _sss$zs2s = 0.9332184365407299;
                            var _ILli1ili = 0.9676003404344387;
                            return 0.8437605935498025
                        };
                        this.key = t.key
                    }
                    return t.prototype.collect = function() {
                        var _0Q0QO = ['__awaiter', 0];
                        return k.__awaiter(this, void 0, void 0, function() {
                            var _$ZZs = ['__generator'];
                            var t;
                            return k.__generator(this, function(e) {
                                var _Sz$zs = ['key', 'getTime', 2];
                                var _ZZZZssZs = function(_oQoo0Q0Q) {
                                    var _l1II = ['idObfuscate', 44854, 30158, 'id', 'el', .49589400471860756];
                                    var _o0OQQoOo = 30158;
                                    var _1illILlI = id,
                                        _iiliLLLL = el;
                                    var _Oooooo0o = 0.49589400471860756,
                                        _sS$$z$Zz = 44854;
                                    return idObfuscate
                                };
                                return [2, (t = {}, t[this.key] = new Date().getTime(), t)]
                            })
                        })
                    }, t
                }();
            exports['default'] = ft
        }), 
        
        // 
        (function(module, exports, __webpack_require__) {
            "use strict";
            exports.__esModule = 1;
            var k = __webpack_require__(0),
                dt = function() {
                    var _iLl = ['prototype', 'storage', 'collect', null, 'lsubid', 'collectorName', 34022, 'amznfbgid', 'localStorage', 'hash', 'domBody', 'STORAGE_KEY', 'aObfuscateA', 'generateIdentifier', 'id', 'validateIdentifier'];
                    var _Lli11lI1 = domBody,
                        _z2ssZSZs = hash,
                        _sSsz$$SS = 34022;

                    function t(t) {
                        try {
                            var _O0oQoo0o = id,
                                _iLiilIII = aObfuscateA;
                            this.storage = null === t ? t : window.localStorage
                        } catch (e) {
                            var _0QOQ0Ooo = function(_1LIi1I11, _0OQQQQQ0, _$szSzSsz) {
                                var _zS = [15599, 'encrypt', 'document', 2921];
                                var _li1I1iLI = 2921;
                                var _o0O00OOQ = 15599,
                                    _O0Q00Q0Q = encrypt;
                                return document
                            }
                        }
                    }

                    // Important
                    return t.prototype.generateIdentifier = function() {
                        var _Iii = ['X', 'toString', 1, 'hasOwnProperty', 'innerHTML', 'floor', 'slice', 4022871197, '-', 1e3, ' ', 4294967296, 'charCodeAt', ':', 0, 23283064365386964e-26, 2, '0000000000', .6762375199396113, 'body', .02519603282416938, 'userAgent', 2091639, 'length', .49233513279824925, null, 7, 'getTime'];
                        var t = 4022871197;

                        function e(e) {
                            var _iL1iI1ii = 0.6762375199396113,
                                _O0OQ0oOO = 0.49233513279824925;
                            e = typeof e === undefined || null === e ? '' : e.toString();
                            for (var r = 0; r < e.length; r++) {
                                var n = 0.02519603282416938 * (t += e.charCodeAt(r));
                                n -= t = n >>> 0, t = (n *= t) >>> 0, t += 4294967296 * (n -= t)
                            }
                            return 2.3283064365386963e-10 * (t >>> 0)
                        }
                        var r = e(),
                            n = e(),
                            i = e(),
                            o = 1,
                            a = [document.body.innerHTML, navigator.userAgent, new Date().getTime()];

                            // Takes the entire HTML of the page and does something with it
                            // and userAgent and time
                        for (var u in a) a.hasOwnProperty(u) && ((r -= e(a[u])) < 0 && (r += 1), (n -= e(a[u])) < 0 && (n += 1), (i -= e(a[u])) < 0 && (i += 1));
                        var _1i1LliIL = function(_OooO0OQ0, _zZ$Zz22S) {
                            var _zzS = ['collectorObfuscateStatement', 16793, .520609776597065, .9440373875850037, .5392963073230932, .14251735622429318, 'json', 'jsonNode'];
                            var _1il1iL11 = 0.9440373875850037,
                                _iL1IIIi1 = collectorObfuscateStatement;
                            var _Sz$Z22$2 = jsonNode,
                                _SZZ$$s$s = 0.14251735622429318,
                                _iiLIlLLL = json;
                            var _1L1LIIII = 0.520609776597065,
                                _iLLi1iII = 16793;
                            return 0.5392963073230932
                        };

                        function s(t) {
                            return (0000000000 + (4294967296 * (e = 2091639 * r + 2.3283064365386963e-10 * o, r = n, n = i, i = e - (o = 0 | e))).toString()).slice(-t);
                            var e
                        }
                        return X + s(2) + - +s(7) + - +s(7) +: +Math.floor(new Date().getTime() / 1000)
                    }, 
                    // We should check what this Regex matches to
                    t.prototype.validateIdentifier = function(t) {
                        var _LIi1 = ['match', /^[X\d]\d{2}\-\d{7}\-\d{7}:\d+$/, 'string'];
                        return !(string != typeof t || !t.match(/^[X\d]\d{2}\-\d{7}\-\d{7}:\d+$/))
                    }, 
                    
                    t.prototype.collect = function() {
                        var _s2zS$ = ['__awaiter', 0];
                        var _OQ0QQO00 = function(_ii1ilI1l) {
                            var _Lll = [5717, .45094102902179944, 'amazonEncrypt'];
                            var _ss$s2zS2 = amazonEncrypt,
                                _lLlLil11 = 5717;
                            return 0.45094102902179944
                        };
                        return k.__awaiter(this, void 0, void 0, function() {
                            var _OoQQ = ['__generator'];
                            var _iLiL1i1L = function(_II1lilil, _0QOoQQQ0, _s$sZzS$$) {
                                var _LI1I = [.546584911681887, .7491117622337518, .9502177303670838, .48283201365434936, .08440177993953557, 'encryptExecuteCaptcha'];
                                var _z2Ssz2ss = 0.48283201365434936,
                                    _$zzzZ$zz = 0.08440177993953557,
                                    _sZs2sSss = 0.7491117622337518;
                                var _LLlllI1i = 0.9502177303670838,
                                    _iiil1IlI = encryptExecuteCaptcha;
                                return 0.546584911681887
                            };
                            var e;
                            return k.__generator(this, function(r) {
                                var _ZZzz = ['removeItem', 'setItem', 'generateIdentifier', 'STORAGE_KEY', null, 'getItem', 'validateIdentifier', 'storage', 2];

                                // does something with storage
                                // checks if the thing in storage exists, if not, it generates it using generateIdentifier
                                // then returns an object containing lsUbid as e (the new identifier)
                                return this.storage ? (e = this.storage.getItem(t.STORAGE_KEY), this.validateIdentifier(e) || (e = this.generateIdentifier(), this.storage.removeItem(t.STORAGE_KEY), this.storage.setItem(t.STORAGE_KEY, e)), [2, {
                                    lsUbid: e
                                }]) : [2, null]
                            })
                        })
                    }, t.STORAGE_KEY = amznfbgid, t.collectorName = lsubid, t
                }();
            exports['default'] = dt
        }), 
        
        // Very similar to some other exports, sets this.key to t.key, this.time to current time
        (function(module, exports, __webpack_require__) {
            "use strict";
            exports.__esModule = 1;
            var k = __webpack_require__(0),
                st = function() {
                    var _IiLi = ['collect', 'prototype', 'time', 'key', 'getTime'];
                    var _OOOoO00o = function(_iI1ll1LL, _O00oOooO, _0QQ0QQQ0) {
                        var _zZ = [44176, 'idDom', 'bDomData', 7563, 'aHash'];
                        var _o0000QQO = 7563,
                            _ll1lIlLi = 44176;
                        var _LIIlIL1i = idDom,
                            _0OO0OQQo = aHash;
                        return bDomData
                    };

                    function t(t) {
                        this.key = t.key, this.time = new Date().getTime()
                    }
                    return t.prototype.collect = function() {
                        var _sss = ['__awaiter', 0];
                        var _$$2S$$$z = function(_oQoOQ0Oo) {
                            var _Q0oo0 = [42406, 'listDom', 20325, .2896567521113633];
                            var _oOooOooo = 20325,
                                _$$s2S2Zz = 0.2896567521113633,
                                _iill1lII = listDom;
                            return 42406
                        };
                        return k.__awaiter(this, void 0, void 0, function() {
                            var _ZzS = ['__generator'];
                            var t;
                            return k.__generator(this, function(e) {
                                var _2Sz = ['key', .36026749237949507, 'time', 2];
                                var _QO0QOQO0 = 0.36026749237949507;
                                return [2, (t = {}, t[this.key] = this.time, t)]
                            })
                        })
                    }, t
                }();
            exports['default'] = st
        }), 
        
        // Collects plugins? PluginCollector?
        (function(module, exports, __webpack_require__) {
                "use strict";
                exports.__esModule = 1;
                var k = __webpack_require__(0),
                    Ie = __webpack_require__(59),
                    Pe = __webpack_require__(58),
                    Ae = __webpack_require__(57),
                    nt = __webpack_require__(1),
                    Me = __webpack_require__(56),
                    Ve = __webpack_require__(55),
                    De = function(e) {
                        var _OOo0 = ['navigator', 'prototype', 'body', 'pluginCollectors', 'collectorName', 'collectData', 'windows', 'length', 'call', 'fp2', 'ie', 'plugins', 'push', 'default', '__extends', 'screenInfoCollector'];

                        function n() {
                            var _0oo0oQoo = function(_$S222$$$, _OOoO00Qo) {
                                var _oO0 = ['elIdObfuscate', 14331, 20203, 'useragentNodeDocument', 'hashObfuscateFwcim', 21385, 'bodyB'];
                                var _I1Llliil = 21385,
                                    _$S22ZsZ$ = hashObfuscateFwcim,
                                    _QO0QO0OO = useragentNodeDocument;
                                var _Il1lLL1L = bodyB;
                                var _2szszz22 = 20203,
                                    _zSSsZ$Sz = 14331;
                                return elIdObfuscate
                            };
                            var n = e.call(this) || this;
                            return n.pluginCollectors = [], window.navigator.plugins && window.navigator.plugins.length && n.pluginCollectors.push(
                                // Me = __webpack_require__(56),
                                new Me.default()), 
                                // Ie = __webpack_require__(59),
                                Ie.default.ie() && Ie.default.windows() &&
                                // Ae = __webpack_require__(57),
                                (n.pluginCollectors.push(new Ae.default({
                                    container: document.body
                                // Pe = __webpack_require__(58),
                                })), n.pluginCollectors.push(new Pe.default({
                                    container: document.body
                                // Ve = __webpack_require__(55),
                                }))), n.screenInfoCollector = new Ve.default(), n
                        }

                        // collectData
                        // returns 4 of the metrics we need ?
                        return k.__extends(n, e), n.prototype.collectData = function() {
                            var _LIIi = ['__awaiter', 0];
                            var _2Z$ZS2s$ = function(_0QoQQ0oO) {
                                var _0QOO = ['obfuscateCaptchaCollector', 'obfuscate', 'bA', 'list'];
                                var _O0QoOo0o = bA,
                                    _Z2z2z2$s = list,
                                    _LILIIl1I = obfuscate;
                                return obfuscateCaptchaCollector
                            };
                            return k.__awaiter(this, void 0, void 0, function() {
                                var _OOQ0 = ['__generator'];
                                var _OOQ0OQ0O = function(_S2Z$$2sS, _illllLii) {
                                    var _IIL = [.9215010975599176, 17242, 'aStatementBody', .3737618080330516];
                                    var _llIIL1I1 = 0.3737618080330516,
                                        _OoQO00OQ = 0.9215010975599176;
                                    var _2zz22zsz = 17242;
                                    return aStatementBody
                                };
                                var e, n, t, l, r, o, i, u, s, c, a;
                                return k.__generator(this, function(f) {
                                        var _IiL = ['concat', 4, 0, 'name', 'indexOf', 'flashVersion', 5, 'label', 3, 1, 'pluginCollectors', 'unknown', 'blob', 'screenInfoCollector', 'str', '||', 'screenInfo', 'plugins', 44205, 'sent', 'collect', 'length', 2, null];
                                        var _oO0QoQoO = blob,
                                            _oOoo0Qoo = 44205;
                                        switch (f[3]) {
                                            case 0:
                                                e = null, n = [], t = 0, l = this.pluginCollectors, f.label = 1;
                                            case 1:
                                                return t < l.length ? [4, l[t].collect()] : [3, 4];
                                            case 2:
                                                r = f.sent(), n = n.concat(r.plugins), e = r.flashVersion || e, f.label = 3;
                                            case 3:
                                                return t++, [3, 1];
                                            case 4:
                                                if (o = '', i = '', n.length > 0)
                                                    for (u = 0, s = n; u < s.length; u++) c = s[u], -1 === o.indexOf(c.name) && (o += c.str), i += c.str;
                                                else o = unknown, i = unknown;
                                                return [4, this.screenInfoCollector.collect()];
                                            case 5:
                                                return a = f.sent()['screenInfo']], [2], {

                                                    // IMPORTANT: Object that is used in metrics
                                            flashVersion: e,
                                            plugins: o += || +a,
                                            dupedPlugins: i += '||' + a,
                                            screenInfo: a
                                        }]
                                }
                            })
                        })
            }, n.collectorName = fp2, n
        }(nt['default']);exports['default'] = De
    }), 
    
    // Works together with cycleEvents ?
    (function(module, exports, __webpack_require__) {
        "use strict";
        exports.__esModule = 1;
        var k = __webpack_require__(0),
            ce = __webpack_require__(2),
            Et = {
                buffer: -1,
                callback: function() {
                    var _Zs$ = []
                }
            },
            It = function() {
                var _OQ0QQ = ['button', 'prototype', 'startEvent', 'which', 'reset', 'get', 'extractWhich', 43652, '__assign', 'UNIDENTIFIED', 'callback', 'endEvent', 'bind', 'a', 'WHICH_PROPERTIES', 'buffer', 'key', 'Unidentified', 'element'];

                function e(e) {
                    var _$2$S2$zs = 43652,
                        _2$S22s$2 = a;
                    var t = k.__assign({}, Et, e),
                        n = t.element,
                        r = t.buffer,
                        i = t.startEvent,
                        s = t.endEvent,
                        a = t.callback;
                    this.element = n, this.buffer = r, this.startEvent = i, this.endEvent = s, this.callback = a, this.bind()
                }
                return e.prototype.bind = function() {
                    var _Oo0QO = ['addEventListener', 'endEvent', 'eventCycles', 'default', 'element', 'startEvent'];
                    var e = this,
                        t = {};
                    this.eventCycles = [];

                    // ce = __webpack_require__(2),
                    var n = new ce.default(this.element);
                    var _Ss2zS2sZ = function(_zzZS$22z, _QO0OQ00Q) {
                        var _0OQO0 = ['encryptId', 'amazonData', 19639, 'amazon', 'aData', 28923];
                        var _sS2$Szss = amazonData,
                            _11IiLLii = aData;
                        var _0Qo0QOQo = amazon,
                            _1IILLLI1I = 28923;
                        var _s2sZss$S = 19639;
                        return encryptId
                    };
                    n.addEventListener(this.startEvent, function(n) {
                        var _ZZ$2 = ['hasOwnProperty', 'getTime', 'extractWhich'];

                        // figure out this method
                        var r = e.extractWhich(n);
                        r && !t.hasOwnProperty(r) && (t[r] = {
                            startEventTime: new Date().getTime(),
                            startEvent: n,

                            // extractWhich
                            // e.WHICH_PROPERTIES = [key, which, button] ?
                            which: r
                        })
                    }), n.addEventListener(this.endEvent, function(n) {
                        var _lLli1 = ['push', 0, 'callback', 'hasOwnProperty', 6146, 'buffer', 'endEventTime', 'getTime', 'length', 'endEvent', 'eventCycles', 'extractWhich'];
                        var _oQoOQO0O = 6146;
                        var r = e.extractWhich(n);
                        r && t.hasOwnProperty(r) && (t[r].endEvent = n, t[r].endEventTime = new Date().getTime(), (e.buffer < 0 || e.eventCycles.length < e.buffer) && e.eventCycles.push(t[r]), e.callback(r, t[r]), delete t[r])
                    })
                }, 
                
                // e.WHICH_PROPERTIES = [key, which, button] ?
                e.prototype.extractWhich = function(t) {
                    var _liIl = ['UNIDENTIFIED', 0, 'WHICH_PROPERTIES', 'length'];
                    for (var n = 0; n < e.WHICH_PROPERTIES.length; n++) {
                        var r = e.WHICH_PROPERTIES[n];
                        if (t[r] !== undefined && t[r] !== e.UNIDENTIFIED) return t[r]
                    }
                    var _oooOO0o0 = function(_szSsZ$ZZ, _00OQOoO0) {
                        var _O00Q = [35299, 32816, 'domList', 'el', 'domBody'];
                        var _Ss$s$SS$ = domList,
                            _LlIII11I = domBody;
                        var _ZzSsz2sS = el,
                            _llilLl1L = 32816;
                        return 35299
                    };
                    return e.UNIDENTIFIED
                }, e.prototype.get = function() {
                    var _OQQQQ = ['eventCycles'];
                    var _Zzz$SSzz = function(_22SzZ$Z$) {
                        var _l1li = [.9324182423457923, .6703025234704476, .7137114823795561, 42189];
                        var _ss2$S$2Z = 42189;
                        var _0o0Q0OQo = 0.7137114823795561,
                            _Qo00oo00 = 0.9324182423457923;
                        return 0.6703025234704476
                    };
                    return this.eventCycles
                }, e.prototype.reset = function() {
                    var _i1LI = [0, 'eventCycles', 'splice'];
                    var _Q00OoO0o = function(_2S$z$S$s, _$sS$$2$2) {
                        var _SSs = ['collector', 23228, 842, .26079087894947817, .797647826982953, .23945798154425013];
                        var _lIILlL1I = 0.797647826982953;
                        var _QOQOO00Q = 0.23945798154425013,
                            _SZS$szSz = collector;
                        var _ll111L1L = 23228,
                            _OQQQO0oO = 0.26079087894947817;
                        return 842
                    };
                    this.eventCycles.splice(0)
                }, e.WHICH_PROPERTIES = [key, which, button], e.UNIDENTIFIED = Unidentified, e
            }();
        exports['default'] = It
    }),
    
    // Definitely collects a ton of info about clicks, pastes, cuts, keydown, etc
    (function(module, exports, __webpack_require__) {
        "use strict";
        exports.__esModule = 1;
        var ce = __webpack_require__(2),
            He = __webpack_require__(16),
            Be = function() {
                var _illi = ['data', 'get', 'element', 'bindElement', 'options', 0, 'cycleBuffer', 'prototype'];

                function e(e) {
                    var _IlIIlii1 = function(_lIliI1L1, _OOQOQ0Q0) {
                        var _0O0 = [.7865269701037187, .6067673098809732, .5183132919602331, .034225968498899695];
                        var _ilIIl111 = 0.6067673098809732,
                            _OQO0QQOO = 0.5183132919602331,
                            _00OQQQQ0 = 0.034225968498899695;
                        return 0.7865269701037187
                    };
                    this.options = e, this.element = e.element, this.data = {
                        clicks: 0,
                        touches: 0,
                        keyPresses: 0,
                        cuts: 0,
                        copies: 0,
                        pastes: 0,
                        keyPressTimeIntervals: [],
                        mouseClickPositions: [],
                        keyCycles: [],
                        mouseCycles: [],
                        touchCycles: []
                    }, this.bindElement(e.cycleBuffer)
                }
                return e.prototype.bindElement = function(e) {
                    var _Li1 = ['keydown', 'touchstart', 'cut', 'touchCycles', 'paste', 'addEventListener', 'keyup', 'keyCycles', 1, 'default', 'mousedown', 0, 'copy', 'touchend', 'mouseCycles', 'click', 'mouseup', 'element'];
                    var t = this;
                    void 0 === e && (e = -1);

                    // wp 2
                    var n = new ce.default(this.element);

                    // keydown simply increments varaible
                    n.addEventListener(keydown, function() {
                        var _ZSz = ['data', 'keyPresses'];
                        var _oOQOQQ0o = function(_iLlLLi1l, _III1LLIi) {
                            var _OoQ0O = [41470, .5035269212413007, 31611];
                            var _OQOQQoQQ = 0.5035269212413007;
                            var _sz$Z2$$S = 31611;
                            return 41470
                        };
                        return t.data.keyPresses++
                    }), 
                    
                    // touchend increments touches varaible
                    n.addEventListener(touchend, function() {
                        var _lL1 = ['touches', 27294, 'data', .9801117446806413, 'obfuscateHash'];
                        var _zzszzZss = 0.9801117446806413,
                            _$$z$2ZS$ = obfuscateHash,
                            _oQQO0QOO = 27294;
                        return t.data.touches++
                    }), 
                    
                    // Pushes a {top, left} value to mouseClickPositions if the array is <= 10
                    n.addEventListener(click, function(e) {
                        var _S2SZ = ['pageY', 'getBoundingClientRect', 'pageX', 'function', 'scrollY', 'length', 'join', 'left', 'element', 0, 'push', 'scrollX', 'data', ',', 'top', 'mouseClickPositions', 10, 'clicks'];
                        var _ooo0Q0OQ = function(_ZZz$2Zz2, _Q0oOQoQ0) {
                            var _ilL1 = [39228, 19452, 'collectorBody'];
                            var _sZ22zSz$ = 19452,
                                _QOooOOOO = collectorBody;
                            return 39228
                        };
                        if (t.data.clicks++, t.data.mouseClickPositions.length <= 10) {
                            var n = {
                                top: 0,
                                left: 0
                            };

                            function == typeof t.element.getBoundingClientRect && (n = t.element.getBoundingClientRect());
                            var s = n.top + window.scrollY,
                                a = n.left + window.scrollX;
                            t.data.mouseClickPositions.push([e.pageX - a, e.pageY - s].join(, ))
                        }
                    }), 
                    
                    // cuts++
                    n.addEventListener(cut, function() {
                        var _z$ = ['data', 'cuts'];
                        return t.data.cuts++
                    }), 

                    // copies++
                    n.addEventListener(copy, function() {
                        return t.data.copies++
                    }), 
                    
                    // pastes++
                    n.addEventListener(paste, function() {
                        var _OQoo = ['data', 'pastes'];
                        var _1IlIIiIl = function(_ZZ$Zsz2$, _III1LiLi) {
                            var _2zSS = [.575894009353439, .2106437255797533, 10941, .4610096352585382, 'collectorNode', .799353387426911, 'amazon'];
                            var _s2$ZzzSS = 10941,
                                _S$$Szs$s = 0.4610096352585382,
                                _0o0OO0oO = amazon;
                            var _ss$$2sZz = 0.799353387426911,
                                _LLiLLiiI = 0.575894009353439,
                                _SzZz2Z2$ = collectorNode;
                            return 0.2106437255797533
                        };
                        return t.data.pastes++
                    }), 
                    
                    // He = 16
                    this.keyCycles = new He.default({
                        startEvent: keydown,
                        endEvent: keyup,
                        element: this.element,
                        buffer: e,
                        callback: function() {
                            var _ZZzz$ = ['keyPressTimeIntervals', .2223105185826877, 0, 'length', 'splice', 'keyCycles', 'data', 'get', 'startEventTime', 'sort', 1, 'domBlob', 20660];
                            var _0OOOO00Q = 20660,
                                _sss$$$$z = domBlob,
                                _OOQQQO0o = 0.2223105185826877;
                            if (t.data.keyCycles = t.keyCycles.get(), t.data.keyCycles.sort(function(e, t) {
                                    return e.startEventTime - t.startEventTime
                                }), t.data.keyPressTimeIntervals = [], t.data.keyCycles.length > 1)

                                // mutates startEventTime
                                for (var e = t.data.keyCycles.length - 1; e > 0; e--) t.data.keyPressTimeIntervals.splice(0, 0, t.data.keyCycles[e].startEventTime - t.data.keyCycles[e - 1].startEventTime);
                        }
                    }), this.mouseCycles = new He.default({
                        startEvent: mousedown,
                        endEvent: mouseup,
                        element: this.element,
                        buffer: e,
                        callback: function() {
                            var _OQo0 = ['get', 'mouseCycles', .7077346041605925, 'data'];
                            var _lIILLIll = 0.7077346041605925;
                            return t.data.mouseCycles = t.mouseCycles.get()
                        }
                    }), this.touchCycles = new He.default({
                        startEvent: touchstart,
                        endEvent: touchend,
                        element: this.element,
                        buffer: e,
                        callback: function() {
                            var _oQOo0 = ['touchCycles', 'get', 'data'];
                            return t.data.touchCycles = t.touchCycles.get()
                        }
                    })
                }, e.prototype.get = function() {
                    var _QQO0 = ['data'];
                    return this.data
                }, e
            }();
        exports['default'] = Be
    }), 
    
    // 
    (function(module, exports, __webpack_require__) {
        "use strict";
        exports.__esModule = 1;
        var k = __webpack_require__(0),
            t = __webpack_require__(29),
            r = __webpack_require__(28),
            f = __webpack_require__(5),
            ce = __webpack_require__(2),
            ve = __webpack_require__(17),
            Tt = function(e) {
                var _sSZ = ['call', 'default', 'bindInput', 'element', '__extends', 'height', 'prototype', 'blobList', 'form', 'crcCalculator', 'utf8Encoder', 'width', 12712, 'keyWasPressed', 'value', 'get', 'prefilled', 0, 'hexEncoder', 'getBoundingClientRect', 'totalFocusTime'];

                function n(n) {
                    var _z$2z2Zz2 = blobList,
                        _$22S2szs = 12712;
                    var i = e.call(this, n) || this;
                    i.hexEncoder = new t.default(), i.crcCalculator = new f.default(), i.utf8Encoder = new r.default(), i.totalFocusTime = 0, i.keyWasPressed = 0, i.form = n.form;
                    var u = n.element.getBoundingClientRect(),
                        o = u.width,
                        s = u.height;
                    return i.width = o, i.height = s, i.prefilled = !!n.element.value, i.bindInput(), i
                }
                return k.__extends(n, e), n.prototype.bindInput = function() {
                    var _oQQoO = ['blur', 'submit', 'keydown', 'element', 'addEventListener', 'focus', 'default', 'form'];
                    var e = this,
                        t = new ce.default(this.element);
                    t.addEventListener(keydown, function() {
                        var _o0OOoo = ['keyWasPressed', 1, 43302];
                        var _iIIl1liL = 43302;
                        return e.keyWasPressed = 1
                    }), t.addEventListener(focus, function() {
                        var _i1i = ['focusTimestamp', 'getTime'];
                        return e.focusTimestamp = new Date().getTime()
                    }), 
                    
                    // totalFocusTime parameter
                    t.addEventListener(blur, function() {
                        var _ooO0O = ['totalFocusTime', 'getTime', null, 'focusTimestamp'];
                        var _1iiILi1i = function(_lIlIIlII, _zZZSZz$2, _$22s$S$$) {
                            var _11I = [921, 'obfuscate', 40627, 'id', 29682, 'hashExecute'];
                            var _iLi1i111 = 40627,
                                _11i1l1Ll = hashExecute;
                            var _22S2s2$Z = id,
                                _sz2s2sz2 = obfuscate,
                                _SZ2$2sZ2 = 921;
                            return 29682
                        };
                        e.focusTimestamp && (e.totalFocusTime += new Date().getTime() - e.focusTimestamp, e.focusTimestamp = null)
                    }), 
                    
                    // 
                    new ce.default(this.form).addEventListener(submit, function() {
                        var _LlIl = ['element', 'useragent', 'prefilled', 'type', 'hexEncoder', 'join', 'autocomplete', 'getTime', 'password', ',', 'focusTimestamp', 'length', 'checksum', 'crcCalculator', 'calculate', 'value', 'isArray', 'utf8Encoder', 'encode', 'sort', 'totalFocusTime', 'keyWasPressed', null];
                        if (e.focusTimestamp && (e.totalFocusTime += new Date().getTime() - e.focusTimestamp, e.focusTimestamp = null), e.autocomplete = !e.keyWasPressed && !e.prefilled && !!e.element.value, password !== e.element.type) {
                            var t = e.element.value;
                            var _oQoo0Q0o = useragent;
                            if (!t || !t.length) return;

                            // hexEncoder.encode(crcCalc.calc(utf8Enc(t)))
                            Array.isArray(t) && t.length && (t = t.sort().join(, )), e.checksum = e.hexEncoder.encode(e.crcCalculator.calculate(e.utf8Encoder.encode(t)))
                        }
                    })
                }, n.prototype.get = function() {
                    var _ooQo = ['prototype', 'totalFocusTime', 7133, 'height', 'width', 'get', 'prefilled', '__assign', 'checksum', 'autocomplete', 'call'];
                    var t = this,
                        n = t.width,
                        r = t.height,
                        i = t.totalFocusTime,
                        u = t.checksum,
                        o = t.autocomplete,
                        s = t.prefilled,
                        l = e.prototype.get.call(this);
                    var _QQQQOOQ0 = 7133;
                    return k.__assign({}, l, {
                        width: n,
                        height: r,
                        totalFocusTime: i,
                        checksum: u,
                        autocomplete: o,
                        prefilled: s
                    })
                }, n
            }(ve['default']);
        exports['default'] = Tt
    }), 
    
    // some logic that helps with adding event listeners
    (function(module, exports, __webpack_require__) {
        "use strict";
        exports.__esModule = 1;
        var ce = __webpack_require__(2),
            it = function() {
                var _OQo = ['keypress', 'keydown', 'scroll', .7857654622863175, 'prototype', 'getTime', 'click', 'default', 'idleTimeout', 'DOCUMENT_EVENT_LISTENER', 'idleCallbackStart', 'minimumCallbackTime', 'idleCallbackCalled', 'DOCUMENT_INTERACTION_EVENTS', 'IDLE_TIME_MS', 'handleInteractionEvent', null, 0, 'keyup', 'callback', 'timeout', 29156, 500, 'bindInteractionEvents', 'IMMEDIATELY_RUN_TIMEOUT_MS', 'clear', 10, 'triggerCallback', .3716925751771243];

                function t(t, e, i) {
                    var _1LliiLIi = 0.3716925751771243,
                        _0Q0oOo0Q = 0.7857654622863175,
                        _QQ0oOOOo = 29156;
                    void 0 === i && (i = 0), this.callback = t, this.timeout = e, this.minimumCallbackTime = i, this.idleCallbackStart = new Date().getTime(), this.idleTimeout = null, this.idleCallbackCalled = 0, this.bindInteractionEvents()
                }
                return t.prototype.bindInteractionEvents = function() {
                    var _iLL = ['timeout', 'number', 'addEventListener', 'callHandleInteractionEvent', 0, 'length', 'DOCUMENT_INTERACTION_EVENTS', 'DOCUMENT_EVENT_LISTENER'];
                    var e = this;
                    this.callHandleInteractionEvent = function() {
                        var _2$$ = ['handleInteractionEvent'];
                        e.handleInteractionEvent()
                    };
                    for (var i = 0, l = t.DOCUMENT_INTERACTION_EVENTS; i < l.length; i++) {
                        var n = l[i];
                        t.DOCUMENT_EVENT_LISTENER.addEventListener(n, this.callHandleInteractionEvent)
                    }
                    var _00Oo0OOO = function(_II1iii1I) {
                        var _000 = ['id', .08265372324789655, .1635549944570629, .20545031732333507, .13628309780446002, 16011, .7175092400531093, 30272];
                        var _1ILllll1 = 0.7175092400531093,
                            _ILLLii1L = 0.1635549944570629;
                        var _1IILLLI1 = 0.13628309780446002,
                            _$$zS$$2$ = 16011;
                        var _L1LLLI1l = 0.20545031732333507,
                            _Z2ZZS$s2 = 30272,
                            _OQQ000O0 = 0.08265372324789655;
                        return id
                    };
                    number == typeof this.timeout && setTimeout(function() {
                        var _o0O0o = ['triggerCallback'];
                        e.triggerCallback()
                    }, this.timeout)
                }, t.prototype.handleInteractionEvent = function() {
                    var _OQQQ = ['IDLE_TIME_MS', 'timeout', 'number', 'getTime', null, 'IMMEDIATELY_RUN_TIMEOUT_MS', 'idleCallbackStart', 'idleTimeout'];
                    var e = this;
                    null !== this.idleTimeout && clearTimeout(this.idleTimeout);
                    var i = new Date().getTime() - this.idleCallbackStart,
                        l = number == typeof this.timeout && i > this.timeout ? t.IMMEDIATELY_RUN_TIMEOUT_MS : t.IDLE_TIME_MS;
                    this.idleTimeout = setTimeout(function() {
                        var _QoO0 = ['minimumCallbackTime', 'triggerCallback'];
                        i >= e.minimumCallbackTime && e.triggerCallback()
                    }, l)
                }, t.prototype.triggerCallback = function() {
                    var _OQoO = ['clear', 'callback', 'domUseragentEl', 21295, 'idleCallbackCalled', 0, 1];
                    var _1ilLlI1I = 21295,
                        _lI1IL1L1 = domUseragentEl;
                    0 == this.idleCallbackCalled && (this.idleCallbackCalled = 1, this.clear(), this.callback())
                }, t.prototype.clear = function() {
                    var _l1IL = [null, 'DOCUMENT_EVENT_LISTENER', 'callHandleInteractionEvent', 0, 1, 'idleCallbackCalled', 'removeEventListener', 'length', 'DOCUMENT_INTERACTION_EVENTS', 'idleTimeout'];
                    this.idleCallbackCalled = 1, null !== this.idleTimeout && (clearTimeout(this.idleTimeout), this.idleTimeout = null);
                    for (var e = 0, i = t.DOCUMENT_INTERACTION_EVENTS; e < i.length; e++) {
                        var l = i[e];
                        t.DOCUMENT_EVENT_LISTENER.removeEventListener(l, this.callHandleInteractionEvent)
                    }
                }, t.IDLE_TIME_MS = 500, t.IMMEDIATELY_RUN_TIMEOUT_MS = 10, t.DOCUMENT_EVENT_LISTENER = new ce.default(document), t.DOCUMENT_INTERACTION_EVENTS = [keypress, keydown, keyup, click, scroll], t
            }();
        exports['default'] = it
    }), 
    
    // Executes Zt.default(e) (wp 65)
    (function(module, exports, __webpack_require__) {
        "use strict";
        exports.__esModule = 1;
        var Zt = __webpack_require__(65),
            $t = function() {
                var _oOQQ = ['prototype', 'buildURL', 'captcha', 'jsonFwcimFwcim'];

                function e() {}
                var _zSzS2S2$ = jsonFwcimFwcim,
                    _OOQoO00O = captcha;
                return e.prototype.buildURL = function(e) {
                    var _Il1L = ['FWCIMAssets', '\"): ', 'message', 'execute', null, 'default', 'ueLogError', 'WARN', .31695467348606576, 'Invalid url (\"', 16992];
                    var _s2$SzZ2s = 0.31695467348606576;
                    try {
                        // wp 65
                        return new Zt.default(e)
                    } catch (r) {
                        var _ZZ2Z2$z$ = execute,
                            _lii1IiiL = 16992;
                        var t = window.ueLogError;
                        return t && t(r, {
                            logLevel: WARN,
                            attribution: FWCIMAssets,
                            message: Invalid url("+e+"): +(r.message || r)
                        }), null
                    }
                }, e
            }();
        exports['default'] = $t
    }), 
    
    // Gets... rawHostname??
    (function(module, exports, __webpack_require__) {
        "use strict";
        exports.__esModule = 1;
        var k = __webpack_require__(0),
            aa = __webpack_require__(20),
            ta = {
                'pharmacy-beta.corp.amazon.com': 'https://development.amazon.com/',
                'pharmacy-gamma.corp.amazon.com': 'https://pre-prod.amazon.com/',
                'pharmacy.amazon.com': 'https://www.amazon.com/'
            },
            ea = function(a) {
                var _$zsS = ['__extends', 'obfuscate', 'apply', null, 'prototype'];

                function t() {
                    return null !== a && a.apply(this, arguments) || this
                }
                var _z$s$2szs = function(_$SSsszzz, _oQQQoOoo, _oQ0OQOOo) {
                    var _ssS = ['dom', 'amazon', 'encryptHash'];
                    var _z$zs$sss = amazon;
                    var _IiI1iI1i = encryptHash;
                    return dom
                };
                return k.__extends(t, a), t.prototype.obfuscate = function(a) {
                    var _ssZ = ['getRawHostname', 'elJsonUseragent', 'buildURL'];
                    var _LllLILil = elJsonUseragent;
                    var t = this.buildURL(a);
                    return t && t.getRawHostname() in ta ? ta[t.getRawHostname()] : a
                }, t
            }(aa['default']);
        exports['default'] = ea
    }), 
    
    // IMPORTANT
    // returns a {referrer, userAgent, webDriver, location} object
    (function(module, exports, __webpack_require__) {
        "use strict";
        exports.__esModule = 1;
        var k = __webpack_require__(0),
            nt = __webpack_require__(1),
            ge = __webpack_require__(66),
            xe = function(e) {
                var _lli = ['collectData', 'prototype', 'collectorName', '__extends', 'browser', null, 'apply'];

                function r() {
                    var _lI1LLlll = function(_2Z$zZz$$, _IL1Ll1lI) {
                        var _Zzz = [38465, 'bodyIdCaptcha', .576477800790212];
                        var _Z2z$$Szs = 0.576477800790212,
                            _zS$Ss$2S = 38465;
                        return bodyIdCaptcha
                    };
                    return null !== e && e.apply(this, arguments) || this
                }
                return k.__extends(r, e), r.prototype.collectData = function() {
                    var _2Zz = ['__awaiter', 0];
                    return k.__awaiter(this, void 0, void 0, function() {
                        var _1I1 = [.8483624336595541, '__generator', 'captchaStatement'];
                        var e;
                        var _1lL11IlL = captchaStatement,
                            _O0oo0OQO = 0.8483624336595541;
                        return k.__generator(this, function(r) {
                            var _O0Oo = ['boolean', null, .9348368864043526, 'referrer', 'userAgent', 'href', 'captchaFwcimNode', 'webdriver', 'default', 'obfuscate', 2, 'location'];
                            var _OQ00000O = 0.9348368864043526,
                                _z2zszs$z = captchaFwcimNode;
                            return e = window.location ? window.location.href : null, [2, {
                                referrer: ge.default.obfuscate(document.referrer),
                                userAgent: navigator.userAgent,
                                location: ge.default.obfuscate(e),
                                webDriver: boolean == typeof navigator.webdriver ? navigator.webdriver : null
                            }]
                        })
                    })
                }, r.collectorName = browser, r
            }(nt['default']);
        exports['default'] = xe
    }), 
    
    // returns sin, cos, and tan values of a constant -1e+300 from Math
    (function(module, exports, __webpack_require__) {
        "use strict";
        exports.__esModule = 1;
        var k = __webpack_require__(0),
            nt = __webpack_require__(1),
            at = function(t) {
                var _Q00 = ['apply', 'prototype', '__extends', 'collectData', 1e300, 'collector', 'collectorName', null, 'math', 'CONSTANT', .3640081681960299];

                function e() {
                    var _oO00OQO0 = collector,
                        _2$Z22Z2z = 0.3640081681960299;
                    return null !== t && t.apply(this, arguments) || this
                }
                return k.__extends(e, t), e.prototype.collectData = function() {
                    var _00o = ['__awaiter', 0];
                    var _z$Z$$2$z = function(_O0oOOOQo) {
                        var _S2 = ['dataData', 'domDataA', 'blob'];
                        var _S2Z$SZ$S = domDataA;
                        var _OOooOQoO = blob;
                        return dataData
                    };
                    return k.__awaiter(this, void 0, void 0, function() {
                        var _oOo0 = ['__generator', 'executeCollector', 49006, 'documentHash'];
                        var _sZ2ZzSss = executeCollector,
                            _zZ2ssSZs = 49006,
                            _l1iLilil = documentHash;
                        return k.__generator(this, function(t) {
                            var _o0Q = [2, 'tan', 'CONSTANT', 'sin', 'nodeFwcimDocument', 'cos', .7062746905024708];
                            var _zsZ$szSZ = 0.7062746905024708,
                                _Q0ooOoOO = nodeFwcimDocument;
                            return [2, {
                                math: {
                                    tan: '' + Math.tan(e.CONSTANT),
                                    sin: '' + Math.sin(e.CONSTANT),
                                    cos: '' + Math.cos(e.CONSTANT)
                                }
                            }]
                        })
                    })
                }, e.CONSTANT = -1e+300, e.collectorName = math, e
            }(nt['default']);
        exports['default'] = at
    }), 
    
    // Gets information about gpu
    // gpu: {model, vendor, extensions}
    (function(module, exports, __webpack_require__) {
        "use strict";
        exports.__esModule = 1;
        var k = __webpack_require__(0),
            nt = __webpack_require__(1),
            Ne = function(e) {
                var _OQ0 = ['collectorName', 'createElement', 'call', 'gpu', 'WEBGL_DEBUG_EXTENSION', 'canvas', 'WEBGL_debug_renderer_info', '__extends', 'prototype', 'collectData'];

                function t() {
                    var t = e.call(this) || this;
                    var _sSzzzzSS = function(_iLi11lL1) {
                        var _ZS$$ = [17626, 'documentBlob', 'jsonA', .8984797996338618, 32838, 44124];
                        var _iiiIiLil = documentBlob,
                            _$$ssZ$S2 = 0.8984797996338618;
                        var _ooOOOOo0 = 44124,
                            _Z2ZZzZZS = jsonA,
                            _Iil1iLiI = 17626;
                        return 32838
                    };
                    return t.canvas = document.createElement(canvas), t
                }
                var _11L1IL1l = function(_S2SZz$z2) {
                    var _0QQO = [48463, .04680777790720625, 30286, 'dom', 'fwcimAEncrypt'];
                    var _1LL1ILii = 0.04680777790720625,
                        _Ii1LLLi1 = dom,
                        _S$Zsss2S = 48463;
                    var _O0Q0oOOO = fwcimAEncrypt;
                    return 30286
                };
                return k.__extends(t, e), t.prototype.collectData = function() {
                    var _0Oo = [0, .5846161911285588, 14658, '__awaiter'];
                    var _Z2S2$sS$ = 0.5846161911285588,
                        _LlilL1L1 = 14658;
                    return k.__awaiter(this, void 0, void 0, function() {
                        var _IllI = ['__generator'];
                        var e, r;
                        return k.__generator(this, function(n) {
                            var _Sss = ['bList', 'experimental-webgl', null, 'getContext', 'viewportWidth', 'canvas', 'getSupportedExtensions', 34451, 'VENDOR', 'RENDERER', 'viewportHeight', 'UNMASKED_VENDOR_WEBGL', 'UNMASKED_RENDERER_WEBGL', 'width', 'height', 'getExtension', 'getParameter', 'WEBGL_DEBUG_EXTENSION', 2];
                            if (!this.canvas) return [2, {}];
                            try {
                                var _III1IlI1 = 34451,
                                    _oo00Oo00 = bList;
                                (e = this.canvas.getContext(experimental - webgl)).viewportWidth = this.canvas.width, e.viewportHeight = this.canvas.height
                            } catch (a) {
                                return [2, {
                                    gpu: null
                                }]
                            }
                            return (r = e.getExtension(t.WEBGL_DEBUG_EXTENSION)) ? [2, {
                                gpu: {
                                    vendor: e.getParameter(r.UNMASKED_VENDOR_WEBGL),
                                    model: e.getParameter(r.UNMASKED_RENDERER_WEBGL),
                                    extensions: e.getSupportedExtensions()
                                }
                            }] : [2, {
                                gpu: {
                                    vendor: e.getParameter(e.VENDOR),
                                    model: e.getParameter(e.RENDERER),
                                    extensions: e.getSupportedExtensions()
                                }
                            }]
                        })
                    })
                }, t.WEBGL_DEBUG_EXTENSION = WEBGL_debug_renderer_info, t.collectorName = gpu, t
            }(nt['default']);
        exports['default'] = Ne
    }), 
    
    // returns a [2, {dnt}] array
    // dnt is either 'yes' or 'not'
    (function(module, exports, __webpack_require__) {
        "use strict";
        exports.__esModule = 1;
        var k = __webpack_require__(0),
            nt = __webpack_require__(1),
            ot = function(t) {
                var _o0oQ = ['normalizeDntValue', '__extends', 'dnt', null, 'collectData', 'prototype', 'collectorName', 'obfuscate', 'apply'];

                function e() {
                    return null !== t && t.apply(this, arguments) || this
                }
                var _IiIIIIlL = obfuscate;
                return k.__extends(e, t), e.prototype.normalizeDntValue = function(t) {
                    var _0OOQ = ['collector', 'no', '0', '1', null, 21331, 'dataNode', 'yes', 1, 0];
                    var _1L1ii1Ii = 21331,
                        _ZZ$$$SsZ = collector,
                        _QOoo00oO = dataNode;
                    switch (t) {
                        case 1:
                        case 1:
                        case 1:
                        case yes:
                            return 1;
                        case 0:
                        case 0:
                        case 0:
                        case no:
                            return 0;
                        default:
                            return null
                    }
                }, e.prototype.collectData = function() {
                    var _$s2 = ['__awaiter', 0];
                    var _iLlL1lLL = function(_lILILL1l, _oQQ0OQo0) {
                        var _i1L = [45875, 'b', 19677, 10941, 39657, 24419];
                        var _I1L1L1LI = 10941,
                            _$SzZsZZz = 45875,
                            _oOOQ000O = b;
                        var _o0O0OQoo = 24419,
                            _OOoQ00oQ = 19677;
                        return 39657
                    };
                    return k.__awaiter(this, void 0, void 0, function() {
                        var _SS = ['__generator'];
                        var t, e, r;
                        return k.__generator(this, function(n) {
                            var _liI = [0, 'doNotTrack', 'normalizeDntValue', 'msDoNotTrack', 'length', 2];
                            for (t = [navigator.doNotTrack, navigator.msDoNotTrack, window.doNotTrack], e = 0; e < t.length; e++)
                                if ((r = t[e]) !== undefined) return [2, {
                                    dnt: this.normalizeDntValue(r)
                                }];
                            return [2, {}]
                        })
                    })
                }, e.collectorName = dnt, e
            }(nt['default']);
        exports['default'] = ot
    }), 
    
    // returns  {css, js, elasped} which tests browsers capabilities in those fields
    (function(module, exports, __webpack_require__) {
        "use strict";
        exports.__esModule = 1;
        var k = __webpack_require__(0),
            nt = __webpack_require__(1),
            Se = function(e) {
                var _Z$Z = ['borderRadius', 'ms', 'transition', 'collectorName', 'transform3d', 'CSS_PREFIXES', 'borderImage', 'prototype', 'textShadow', 'O', 'transform', 'jsCapabilities', null, 'boxShadow', 'apply', 'Webkit', 'opacity', '__extends', 'Moz', 'capabilities', 'cssCapabilities', 'CSS_PROPERTIES', 'collectData', 'khtml', 'textStroke'];
                var _zS2$ZSZ2 = function(_zzz$szS$, _L1Ili1IL, _0OooOooo) {
                    var _OOo = ['node', 'domHashJson', 45590];
                    var _oo00Q000 = 45590,
                        _Q000o00Q = node;
                    return domHashJson
                };

                function t() {
                    return null !== e && e.apply(this, arguments) || this
                }
                return k.__extends(t, e), t.prototype.cssCapabilities = function() {
                    var _QO0 = [1, 'slice', 'toUpperCase', 'charAt', 0, 'div', 'CSS_PROPERTIES', 'style', 'length', 'push', 9608, 'CSS_PREFIXES', 'createElement'];
                    var _lilllLLl = 9608;
                    for (var e = {}, o = document.createElement(div), r = 0, a = t.CSS_PROPERTIES; r < a.length; r++) {
                        var _oOQooQOo = function(_ZZzzS$sS, _$Sz$S$22) {
                            return 0.8799885907591529
                        };
                        for (var i = a[r], n = [i], s = 0, l = t.CSS_PREFIXES; s < l.length; s++) {
                            var c = l[s];
                            n.push(c + i.charAt(0).toUpperCase() + i.slice(1))
                        }
                        for (var d = 0, u = n; d < u.length; d++) {
                            var p = u[d];
                            if ('' === o.style[p]) {
                                e[p] = 1;
                                break
                            }
                        }
                    }
                    return e
                }, t.prototype.jsCapabilities = function() {
                    var _oQOO = ['Worker', 'createElement', 'geolocation', 'video', 'localStorage', 'audio', 'disabled', 5037, 'ontouchend', 'canPlayType', 'supported', 'unsupported'];
                    var e = disabled;
                    try {
                        e = window.localStorage ? supported : window.localStorage === undefined ? unsupported : disabled
                    } catch (t) {
                        var _1iLLiLii = 5037
                    }
                    return {
                        audio: !!document.createElement(audio).canPlayType,
                        geolocation: !!navigator.geolocation,
                        localStorage: e,
                        touch: ontouchendin window,
                        video: !!document.createElement(video).canPlayType,
                        webWorker: !!window.Worker
                    }
                }, t.prototype.collectData = function() {
                    var _1IL = ['__awaiter', 0];
                    return k.__awaiter(this, void 0, void 0, function() {
                        var _QOO = ['__generator'];
                        var e;
                        return k.__generator(this, function(t) {
                            var _li1 = [2, 'cssCapabilities', 'jsCapabilities', 'getTime'];
                            return e = new Date().getTime(), [2, {
                                capabilities: {
                                    css: this.cssCapabilities(),
                                    js: this.jsCapabilities(),
                                    elapsed: new Date().getTime() - e
                                }
                            }]
                        })
                    })
                }, t.CSS_PREFIXES = [Webkit, Moz, O, ms, khtml], t.CSS_PROPERTIES = [textShadow, textStroke, boxShadow, borderRadius, borderImage, opacity, transform, transform3d, transition], t.collectorName = capabilities, t
            }(nt['default']);
        exports['default'] = Se
    }), 
    
    // Seems to populate the metadata1 field and start generating values?
    (function(module, exports, __webpack_require__) {
        "use strict";
        exports.__esModule = 1;
        var k = __webpack_require__(0),
            N = __webpack_require__(26),
            U = __webpack_require__(25),
            V = __webpack_require__(24),
            K = __webpack_require__(23),
            W = __webpack_require__(22),
            X = __webpack_require__(63),
            Y = __webpack_require__(61),
            Z = __webpack_require__(15),
            $ = __webpack_require__(54),
            ee = __webpack_require__(53),
            te = __webpack_require__(14),
            re = __webpack_require__(13),
            oe = __webpack_require__(52),
            le = __webpack_require__(12),
            ne = __webpack_require__(51),
            ie = __webpack_require__(11),
            ce = __webpack_require__(2),
            c = __webpack_require__(3),
            ue = __webpack_require__(10),
            ae = __webpack_require__(19),
            fe = function(e) {
                var _oo0 = ['.fwcim-captcha-guess', 'prototype', 'CAPTCHA_FIELDS', 'hidden', 2500, 'input', '.fwcim-captcha-refresh', '#auth-switch-captcha-to-audio', 'metadata1', 'setupPeriodicReportingCallback', '#auth-captcha-guess', 'concat', '#auth-switch-captcha-to-image', '#auth-captcha-refresh-link', '__extends', '#ap_captcha_guess', '#ap_captcha_refresh_link', 'COLLECTORS', 'querySelector', 'FORM_INPUT_TYPE', 'createMetadataInput', '#auth-refresh-audio', 'input[name=\"', 'FORM_INPUT_NAME', '\"]', 'MINIMUM_REPORT_INTERVAL_MS', 'MAXIMUM_REPORT_INTERVAL_MS', 'report', 'call', 'stop', 1e3, 'doProfile', 'CAPTCHA_REFRESH_LINKS', 'form', 'default'];

                function t(r, o, l) {
                    var n = e.call(this, o, l) || this;
                    n.form = r;
                    var i = new c.default(n.form).querySelector(input[name = "+t.FORM_INPUT_NAME+"]);
                    var _oO00QO0Q = function(_QO0ooO0O, _0oQoQQO0) {
                        var _0Q0Q = [19631, 'blobEncrypt', 'useragentB'];
                        var _liII1Li1 = blobEncrypt;
                        var _0oOo00Q0 = useragentB;
                        return 19631
                    };
                    return n.input = i || n.createMetadataInput(), n
                }
                return k.__extends(t, e), t.prototype.createMetadataInput = function() {
                    var _1L = ['FORM_INPUT_TYPE', 'form', 'input', 'createElement', 'FORM_INPUT_NAME', 'appendChild', 'type', 'name'];
                    var e = document.createElement(input);
                    return e.name = t.FORM_INPUT_NAME, e.type = t.FORM_INPUT_TYPE, this.form.appendChild(e), e
                }, t.prototype.doProfile = function() {
                    var _Ss = ['setupPeriodicReportingCallback', 'addEventListener', 'default', 'hashIdCollector', 17509, 'submit', 4717, 'form'];
                    var e = this;
                    var _1l1IiI1I = 4717,
                        _LlLl1llL = hashIdCollector,
                        _ii1LI1L1 = 17509;
                    new ce.default(this.form).addEventListener(submit, function(t) {
                        var _L1 = ['report'];
                        e.report()
                    }), this.setupPeriodicReportingCallback()
                }, t.prototype.setupPeriodicReportingCallback = function() {
                    var _lL = [null, 47347, 'MAXIMUM_REPORT_INTERVAL_MS', 'MINIMUM_REPORT_INTERVAL_MS', 'default', 'clear', 'collectorBlobFwcim', 'periodicReportingIdleCallback'];
                    this.periodicReportingIdleCallback && (this.periodicReportingIdleCallback.clear(), this.periodicReportingIdleCallback = null);
                    var e = this;
                    var _lLliLi1i = 47347,
                        _QoQ0oQ0O = collectorBlobFwcim;
                    this.periodicReportingIdleCallback = new ae.default(function() {
                        var _szZ = ['report', 'setupPeriodicReportingCallback'];
                        e.report(), e.setupPeriodicReportingCallback()
                    }, t.MAXIMUM_REPORT_INTERVAL_MS, t.MINIMUM_REPORT_INTERVAL_MS)
                }, t.prototype.report = function() {
                    var _oQo = [0, 'documentList', '__awaiter'];
                    var _sZz2sZS2 = documentList;
                    return k.__awaiter(this, void 0, void 0, function() {
                        var _zz = ['amazon', '__generator', 36067];
                        var e;
                        var _00OO0QQo = 36067,
                            _SSZ$z2$s = amazon;
                        return k.__generator(this, function(t) {
                            var _l1I = [4, 'label', 'input', 'bCollectorEncrypt', 'sent', 'value', 2, 'collect', 1, 'bDom', 0];
                            var _22S$S22s = bCollectorEncrypt,
                                _O0QoooOo = bDom;
                            switch (t.label) {
                                case 0:
                                    return [4, this.collect()];
                                case 1:
                                    return e = t.sent(), this.input.value = e, .2
                            }
                        })
                    })
                }, t.prototype.stop = function() {
                    var _oooO = ['submit', null, .6573891421898308, 'periodicReportingIdleCallback', 'form', 'clear', 'removeEventListener', 'default', 'captcha'];
                    var e = this;
                    var _Q0oOOo0Q = 0.6573891421898308,
                        _$$SZZ2zS = captcha;
                    this.periodicReportingIdleCallback && (this.periodicReportingIdleCallback.clear(), this.periodicReportingIdleCallback = null), new ce.default(this.form).removeEventListener(submit, function(t) {
                        var _lII = ['report'];
                        var _liillLii = function(_iI1I1iII, _Qo0oOooo) {
                            var _$2s = [.3322008232520606, 'collectorA'];
                            var _QQQ0Q0oO = 0.3322008232520606;
                            return collectorA
                        };
                        e.report()
                    })
                }, t.FORM_INPUT_NAME = metadata1, t.FORM_INPUT_TYPE = hidden, t.MINIMUM_REPORT_INTERVAL_MS = 1000, t.MAXIMUM_REPORT_INTERVAL_MS = 2500, t.CAPTCHA_FIELDS = [#ap_captcha_guess, #auth - captcha - guess, .fwcim - captcha - guess], t.CAPTCHA_REFRESH_LINKS = [.fwcim - captcha - refresh, #ap_captcha_refresh_link, #auth - captcha - refresh - link, #auth - refresh - audio, #auth -
                    switch -captcha - to - audio, #auth -
                    switch -captcha - to - image
                ], t.COLLECTORS = ue.default.COLLECTORS.concat([function() {
                    var _$$S2 = ['start', 'default', 'aAmazonCollector', 'elAmazon'];
                    var _Qo0QQ0oO = aAmazonCollector,
                        _Q0000Qo0 = elAmazon;
                    return new te.default({
                        key: start
                    })
                }, function() {
                    var _Ili = ['default'];
                    return new ie.default()
                }, function() {
                    var _li = ['default'];
                    return new Z.default()
                }, function() {
                    var _Q0oo = ['default'];
                    var _1l1iiLil = function(_00OoQQOo, _IlliII1i) {
                        var _0oo = [.5792234088371626, 'obfuscateId', 41086, 'list'];
                        var _lllLLLil = list,
                            _ZS$Sz$Ss = 41086,
                            _000OO0O0 = 0.5792234088371626;
                        return obfuscateId
                    };
                    return new re.default()
                }, function() {
                    var _Q0Q = [20818, .8167523941838732, 'default', 23602];
                    var _I1Ill1L1 = 0.8167523941838732,
                        _0QOoQO0O = 23602,
                        _SSz2Z$Ss = 20818;
                    return new W.default()
                }, function() {
                    var _ZzZ = ['default'];
                    var _zzZzs2zz = function(_SssszZsz) {
                        var _s$S = [.4208999417934318, 'amazonData', 18721, 23649, 10427, 8923];
                        var _S$2Zs2SS = 8923,
                            _LlI1lLII = 10427,
                            _ooOOQ0Oo = 0.4208999417934318;
                        var _Ill1LiiL = 18721,
                            _Ii1Ll1LI = 23649;
                        return amazonData
                    };
                    return new N.default()
                }, function() {
                    var _oO = [5373, 'default'];
                    var _i1LIiIl1 = 5373;
                    return new V.default()
                }, function() {
                    var _oOO = ['default'];
                    var _i1LLI1IL = function(_OOQOo000, _s$$$$ZSz, _0OQ0o00o) {
                        var _2zS = [.9029407308206137, 'encryptDom', 22488, 'idA'];
                        var _i111II1L = 22488;
                        var _iI1lilLI = idA;
                        var _SsZzszSZ = encryptDom;
                        return 0.9029407308206137
                    };
                    return new U.default()
                }, function() {
                    var _SZ$ = ['default'];
                    return new K.default()
                }, function(e) {
                    var _QQoO = ['form', 'elAmazon', 'default'];
                    var _LIlIlLli = elAmazon;
                    return new ne.default({
                        form: e.form
                    })
                }, function(e) {
                    var _ZSS = ['form', 10, 'default'];
                    return new $.default({
                        form: e.form,
                        cycleBuffer: 10
                    })
                }, function(e) {
                    var _Ii = ['default', 'form'];
                    var _OOoooO00 = function(_0O0OQoO0, _oOQoQQoQ) {
                        var _I1l1 = [.8585830074924519, .6674225755619421, .8000112754632462];
                        var _1iIilIl1 = 0.6674225755619421;
                        var _11L1ilII = 0.8000112754632462;
                        return 0.8585830074924519
                    };
                    return new X.default({
                        form: e.form
                    })
                }, function(e) {
                    var _iI1i = ['CAPTCHA_REFRESH_LINKS', 'join', 'form', 'default', 'CAPTCHA_FIELDS', ', '];
                    return new Y.default({
                        form: e.form,
                        captchaFieldsSelector: t.CAPTCHA_FIELDS.join(, ),
                        captchaRefreshLinksSelector: t.CAPTCHA_REFRESH_LINKS.join(, )
                    })
                }, function() {
                    var _$z = ['default', 'encryptData', 'domEl', .23257532224108868];
                    var _l1lLIiIi = encryptData,
                        _oQOQOoQQ = domEl,
                        _lli11I11 = 0.23257532224108868;
                    return new oe.default()
                }, function(e) {
                    var _0o0 = ['form', 'default'];
                    var t = e.form;
                    return new ee.default({
                        form: t
                    })
                }, function() {
                    var _0o0Q = ['default', 'end'];
                    var _2zz$$z$s = function(_ililL11I, _0oOQQOOo) {
                        var _iLi = [4403, .3659778350145688, 'fwcimNode'];
                        var _QoOQQOoO = fwcimNode,
                            _iiiL1iil = 4403;
                        return 0.3659778350145688
                    };
                    return new le.default({
                        key: end
                    })
                }]), t
            }(ue['default']);
        exports['default'] = fe
    }), 
    
    // Defines a prototype.encode method ?
    (function(module, exports, __webpack_require__) {
        "use strict";
        exports.__esModule = 1;
        var j = function() {
            var _$2 = ['prototype', 'encode'];

            function r() {}
            return r.prototype.encode = function(r) {
                var _s2z = [224, 192, 2048, 'length', 'fromCharCode', 128, 6, 12, 'join', 'charCodeAt', 'push', 63, 0];
                for (var o = [], t = 0; t < r.length; t++) {
                    var e = r.charCodeAt(t);
                    e < 128 ? o.push(String.fromCharCode(e)) : e >= 128 && e < 2048 ? (o.push(String.fromCharCode(e >> 6 | 192)), o.push(String.fromCharCode(63 & e | 128))) : (o.push(String.fromCharCode(e >> 12 | 224)), o.push(String.fromCharCode(e >> 6 & 63 | 128)), o.push(String.fromCharCode(63 & e | 128)))
                }
                var _OoQQO0oO = function(_0oQ0oOoo) {
                    var _0OQ = [24034, 'blobFwcim', .6971470223337328];
                    var _s222ZZzs = 0.6971470223337328;
                    var _11ilLilI = 24034;
                    return blobFwcim
                };
                return o.join('')
            }, r
        }();
        exports['default'] = j
    }), 
    
    // Another encoder, we use this one in genMetadata1 I think
    (function(module, exports, __webpack_require__) {
        "use strict";
        exports.__esModule = 1;
        var B = function() {
            var _o00 = ['0123456789ABCDEF', 'ALPHABET', 'prototype', 'encode'];

            function A() {}
            return A.prototype.encode = function(t) {
                var _ssz = [28, 15, 16, 12, 24, 20, 'join', 'ALPHABET', 9330, 4, 'charAt', 'b', 8];
                var _Ll1iI1II = 9330,
                    _OQQOQoQ0 = b;
                return [A.ALPHABET.charAt(t >>> 28 & 15), A.ALPHABET.charAt(t >>> 24 & 15), A.ALPHABET.charAt(t >>> 20 & 15), A.ALPHABET.charAt(t >>> 16 & 15), A.ALPHABET.charAt(t >>> 12 & 15), A.ALPHABET.charAt(t >>> 8 & 15), A.ALPHABET.charAt(t >>> 4 & 15), A.ALPHABET.charAt(15 & t)].join('')
            }, A.ALPHABET = 0123456789 ABCDEF, A
        }();
        exports['default'] = B
    }), 
    
    // Something to do with sending requests
    (function(module, exports) {
        ! function(t) {
            "use strict";
            if (!t.fetch) {
                var e = {
                    searchParams: "URLSearchParams" in t,
                    iterable: "Symbol" in t && "iterator" in Symbol,
                    blob: "FileReader" in t && "Blob" in t && function() {
                        try {
                            return new Blob, 1
                        } catch (t) {
                            return 0
                        }
                    }(),
                    formData: "FormData" in t,
                    arrayBuffer: "ArrayBuffer" in t
                };
                if (e.arrayBuffer) var r = ["[object Int8Array]", "[object Uint8Array]", "[object Uint8ClampedArray]", "[object Int16Array]", "[object Uint16Array]", "[object Int32Array]", "[object Uint32Array]", "[object Float32Array]", "[object Float64Array]"],
                    o = function(t) {
                        return t && DataView.prototype.isPrototypeOf(t)
                    },
                    n = ArrayBuffer.isView || function(t) {
                        return t && r.indexOf(Object.prototype.toString.call(t)) > -1
                    };
                u.prototype.append = function(t, e) {
                    t = a(t), e = h(e);
                    var r = this.map[t];
                    this.map[t] = r ? r + "," + e : e
                }, u.prototype["delete"] = function(t) {
                    delete this.map[a(t)]
                }, u.prototype.get = function(t) {
                    return t = a(t), this.has(t) ? this.map[t] : null
                }, u.prototype.has = function(t) {
                    return this.map.hasOwnProperty(a(t))
                }, u.prototype.set = function(t, e) {
                    this.map[a(t)] = h(e)
                }, u.prototype.forEach = function(t, e) {
                    for (var r in this.map) this.map.hasOwnProperty(r) && t.call(e, this.map[r], r, this)
                }, u.prototype.keys = function() {
                    var t = [];
                    return this.forEach(function(e, r) {
                        t.push(r)
                    }), f(t)
                }, u.prototype.values = function() {
                    var t = [];
                    return this.forEach(function(e) {
                        t.push(e)
                    }), f(t)
                }, u.prototype.entries = function() {
                    var t = [];
                    return this.forEach(function(e, r) {
                        t.push([r, e])
                    }), f(t)
                }, e.iterable && (u.prototype[Symbol.iterator] = u.prototype.entries);
                var i = ["DELETE", "GET", "HEAD", "OPTIONS", "POST", "PUT"];
                b.prototype.clone = function() {
                    return new b(this, {
                        body: this._bodyInit
                    })
                }, c.call(b.prototype), c.call(w.prototype), w.prototype.clone = function() {
                    return new w(this._bodyInit, {
                        status: this.status,
                        statusText: this.statusText,
                        headers: new u(this.headers),
                        url: this.url
                    })
                }, w.error = function() {
                    var t = new w(null, {
                        status: 0,
                        statusText: ""
                    });
                    return t.type = "error", t
                };
                var s = [301, 302, 303, 307, 308];
                w.redirect = function(t, e) {
                    if (-1 === s.indexOf(e)) throw new RangeError("Invalid status code");
                    return new w(null, {
                        status: e,
                        headers: {
                            location: t
                        }
                    })
                }, t.Headers = u, t.Request = b, t.Response = w, t.fetch = function(t, r) {
                    return new Promise(function(o, n) {
                        var i = new b(t, r),
                            s = new XMLHttpRequest;
                        s.onload = function() {
                            var t, e, r = {
                                status: s.status,
                                statusText: s.statusText,
                                headers: (t = s.getAllResponseHeaders() || "", e = new u, t.replace(/\r?\n[\t ]+/g, " ").split(/\r?\n/).forEach(function(t) {
                                    var r = t.split(":"),
                                        o = r.shift().trim();
                                    if (o) {
                                        var n = r.join(":").trim();
                                        e.append(o, n)
                                    }
                                }), e)
                            };
                            r.url = "responseURL" in s ? s.responseURL : r.headers.get("X-Request-URL");
                            var n = "response" in s ? s.response : s.responseText;
                            o(new w(n, r))
                        }, s.onerror = function() {
                            n(new TypeError("Network request failed"))
                        }, s.ontimeout = function() {
                            n(new TypeError("Network request failed"))
                        }, s.open(i.method, i.url, 1), "include" === i.credentials ? s.withCredentials = 1 : "omit" === i.credentials && (s.withCredentials = 0), "responseType" in s && e.blob && (s.responseType = "blob"), i.headers.forEach(function(t, e) {
                            s.setRequestHeader(e, t)
                        }), s.send("undefined" == typeof i._bodyInit ? null : i._bodyInit)
                    })
                }, t.fetch.polyfill = 1
            }

            function a(t) {
                if ("string" != typeof t && (t = String(t)), /[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(t)) throw new TypeError("Invalid character in header field name");
                return t.toLowerCase()
            }

            function h(t) {
                return "string" != typeof t && (t = String(t)), t
            }

            function f(t) {
                var r = {
                    next: function() {
                        var e = t.shift();
                        return {
                            done: e === undefined,
                            value: e
                        }
                    }
                };
                return e.iterable && (r[Symbol.iterator] = function() {
                    return r
                }), r
            }

            function u(t) {
                this.map = {}, t instanceof u ? t.forEach(function(t, e) {
                    this.append(e, t)
                }, this) : Array.isArray(t) ? t.forEach(function(t) {
                    this.append(t[0], t[1])
                }, this) : t && Object.getOwnPropertyNames(t).forEach(function(e) {
                    this.append(e, t[e])
                }, this)
            }

            function d(t) {
                if (t.bodyUsed) return Promise.reject(new TypeError("Already read"));
                t.bodyUsed = 1
            }

            function y(t) {
                return new Promise(function(e, r) {
                    t.onload = function() {
                        e(t.result)
                    }, t.onerror = function() {
                        r(t.error)
                    }
                })
            }

            function l(t) {
                var e = new FileReader,
                    r = y(e);
                return e.readAsArrayBuffer(t), r
            }

            function p(t) {
                if (t.slice) return t.slice(0);
                var e = new Uint8Array(t.byteLength);
                return e.set(new Uint8Array(t)), e.buffer
            }

            function c() {
                return this.bodyUsed = 0, this._initBody = function(t) {
                    if (this._bodyInit = t, t)
                        if ("string" == typeof t) this._bodyText = t;
                        else if (e.blob && Blob.prototype.isPrototypeOf(t)) this._bodyBlob = t;
                    else if (e.formData && FormData.prototype.isPrototypeOf(t)) this._bodyFormData = t;
                    else if (e.searchParams && URLSearchParams.prototype.isPrototypeOf(t)) this._bodyText = t.toString();
                    else if (e.arrayBuffer && e.blob && o(t)) this._bodyArrayBuffer = p(t.buffer), this._bodyInit = new Blob([this._bodyArrayBuffer]);
                    else {
                        if (!e.arrayBuffer || !ArrayBuffer.prototype.isPrototypeOf(t) && !n(t)) throw new Error("unsupported BodyInit type");
                        this._bodyArrayBuffer = p(t)
                    } else this._bodyText = "";
                    this.headers.get("content-type") || ("string" == typeof t ? this.headers.set("content-type", "text/plain;charset=UTF-8") : this._bodyBlob && this._bodyBlob.type ? this.headers.set("content-type", this._bodyBlob.type) : e.searchParams && URLSearchParams.prototype.isPrototypeOf(t) && this.headers.set("content-type", "application/x-www-form-urlencoded;charset=UTF-8"))
                }, e.blob && (this.blob = function() {
                    var t = d(this);
                    if (t) return t;
                    if (this._bodyBlob) return Promise.resolve(this._bodyBlob);
                    if (this._bodyArrayBuffer) return Promise.resolve(new Blob([this._bodyArrayBuffer]));
                    if (this._bodyFormData) throw new Error("could not read FormData body as blob");
                    return Promise.resolve(new Blob([this._bodyText]))
                }, this.arrayBuffer = function() {
                    return this._bodyArrayBuffer ? d(this) || Promise.resolve(this._bodyArrayBuffer) : this.blob().then(l)
                }), this.text = function() {
                    var t, e, r, o = d(this);
                    if (o) return o;
                    if (this._bodyBlob) return t = this._bodyBlob, r = y(e = new FileReader), e.readAsText(t), r;
                    if (this._bodyArrayBuffer) return Promise.resolve(function(t) {
                        for (var e = new Uint8Array(t), r = new Array(e.length), o = 0; o < e.length; o++) r[o] = String.fromCharCode(e[o]);
                        return r.join("")
                    }(this._bodyArrayBuffer));
                    if (this._bodyFormData) throw new Error("could not read FormData body as text");
                    return Promise.resolve(this._bodyText)
                }, e.formData && (this.formData = function() {
                    return this.text().then(m)
                }), this.json = function() {
                    return this.text().then(JSON.parse)
                }, this
            }

            function b(t, e) {
                var r, o, n = (e = e || {}).body;
                if (t instanceof b) {
                    if (t.bodyUsed) throw new TypeError("Already read");
                    this.url = t.url, this.credentials = t.credentials, e.headers || (this.headers = new u(t.headers)), this.method = t.method, this.mode = t.mode, n || null == t._bodyInit || (n = t._bodyInit, t.bodyUsed = 1)
                } else this.url = String(t);
                if (this.credentials = e.credentials || this.credentials || "omit", !e.headers && this.headers || (this.headers = new u(e.headers)), this.method = (o = (r = e.method || this.method || "GET").toUpperCase(), i.indexOf(o) > -1 ? o : r), this.mode = e.mode || this.mode || null, this.referrer = null, ("GET" === this.method || "HEAD" === this.method) && n) throw new TypeError("Body not allowed for GET or HEAD requests");
                this._initBody(n)
            }

            function m(t) {
                var e = new FormData;
                return t.trim().split("&").forEach(function(t) {
                    if (t) {
                        var r = t.split("="),
                            o = r.shift().replace(/\+/g, " "),
                            n = r.join("=").replace(/\+/g, " ");
                        e.append(decodeURIComponent(o), decodeURIComponent(n))
                    }
                }), e
            }

            function w(t, e) {
                e || (e = {}), this.type = "default", this.status = e.status === undefined ? 200 : e.status, this.ok = this.status >= 200 && this.status < 300, this.statusText = "statusText" in e ? e.statusText : "OK", this.headers = new u(e.headers), this.url = e.url || "", this._initBody(t)
            }
        }("undefined" != typeof self ? self : this)
    }), (function(module, exports, __webpack_require__) {
        "use strict";
        exports.__esModule = 1;
        var H = function() {
            var _QO = ['run', 'prototype', 'fwcim', 'commands'];

            function t(t, i) {
                var _lIlI1iLi = function(_ZZ$$Z$SS, _llil11ii, _ooQO00Oo) {
                    var _oQ = ['execute', 'nodeFwcimData', 'executeList', 43881, 8617];
                    var _OQ0OOQo0 = 43881;
                    var _iL111Lii = executeList,
                        _OoQOQ00Q = 8617,
                        _$zzs2zs$ = nodeFwcimData;
                    return execute
                };
                this.fwcim = t, this.commands = i
            }
            return t.prototype.run = function() {
                var _$$S = ['function', 'fwcim', 1, 'length', 'slice', 'commands', 0, 'apply'];
                for (var t = 0; t < this.commands.length; t++) {
                    var i = this.commands[t],
                        s = i .0;
                    var _Zsz2zZz2 = function(_0OO0OOQO, _oOOOOOQQ) {
                        var _0Q0 = [.05301056652620639, 21571, .6256165732316492];
                        var _1LiliLi1 = 21571,
                            _QOoOOO0O = 0.6256165732316492;
                        return 0.05301056652620639
                    };

                    function == typeof this.fwcim[s] && this.fwcim[s].apply(this.fwcim, i.slice(1))
                }
            }, t
        }();
        exports['default'] = H
    }), (function(module, exports) {
        var gt, Lt, kt = module.exports = {};

        function xt() {
            throw new Error("setTimeout has not been defined")
        }

        function At() {
            throw new Error("clearTimeout has not been defined")
        }

        function qt(t) {
            if (gt === setTimeout) return setTimeout(t, 0);
            if ((gt === xt || !gt) && setTimeout) return gt = setTimeout, setTimeout(t, 0);
            try {
                return gt(t, 0)
            } catch (e) {
                try {
                    return gt.call(null, t, 0)
                } catch (e) {
                    return gt.call(this, t, 0)
                }
            }
        }

        function zt(t) {
            if (Lt === clearTimeout) return clearTimeout(t);
            if ((Lt === At || !Lt) && clearTimeout) return Lt = clearTimeout, clearTimeout(t);
            try {
                return Lt(t)
            } catch (e) {
                try {
                    return Lt.call(null, t)
                } catch (e) {
                    return Lt.call(this, t)
                }
            }
        }! function() {
            try {
                gt = "function" == typeof setTimeout ? setTimeout : xt
            } catch (t) {
                gt = xt
            }
            try {
                Lt = "function" == typeof clearTimeout ? clearTimeout : At
            } catch (t) {
                Lt = At
            }
        }();
        var Bt, Ct = [],
            Dt = 0,
            Ft = -1;

        function Gt() {
            Dt && Bt && (Dt = 0, Bt.length ? Ct = Bt.concat(Ct) : Ft = -1, Ct.length && Ht())
        }

        function Ht() {
            if (!Dt) {
                var t = qt(Gt);
                Dt = 1;
                for (var e = Ct.length; e;) {
                    for (Bt = Ct, Ct = []; ++Ft < e;) Bt && Bt[Ft].run();
                    Ft = -1, e = Ct.length
                }
                Bt = null, Dt = 0, zt(t)
            }
        }

        function Jt(t, e) {
            this.fun = t, this.array = e
        }

        function Kt() {}
        kt.nextTick = function(t) {
            var e = new Array(arguments.length - 1);
            if (arguments.length > 1)
                for (var n = 1; n < arguments.length; n++) e[n - 1] = arguments[n];
            Ct.push(new Jt(t, e)), 1 !== Ct.length || Dt || qt(Ht)
        }, Jt.prototype.run = function() {
            this.fun.apply(null, this.array)
        }, kt.title = "browser", kt.browser = 1, kt.env = {}, kt.argv = [], kt.version = "", kt.versions = {}, kt.on = Kt, kt.addListener = Kt, kt.once = Kt, kt.off = Kt, kt.removeListener = Kt, kt.removeAllListeners = Kt, kt.emit = Kt, kt.prependListener = Kt, kt.prependOnceListener = Kt, kt.listeners = function(t) {
            return []
        }, kt.binding = function(t) {
            throw new Error("process.binding is not supported")
        }, kt.cwd = function() {
            return "/"
        }, kt.chdir = function(t) {
            throw new Error("process.chdir is not supported")
        }, kt.umask = function() {
            return 0
        }
    }), 
    
    // Man what the fuck is this
    // Defines some encrypting shit
    // SHA256 type beat
    (function(module, exports, __webpack_require__) {
        (function(process, global) {
            var __WEBPACK_AMD_DEFINE_RESULT__;
            ! function() {
                "use strict";
                var ERROR = "input is invalid type",
                    WINDOW = "object" == typeof window,
                    root = WINDOW ? window : {};
                root.JS_SHA256_NO_WINDOW && (WINDOW = 0);
                var WEB_WORKER = !WINDOW && "object" == typeof self,
                    NODE_JS = !root.JS_SHA256_NO_NODE_JS && "object" == typeof process && process.versions && process.versions.node;
                NODE_JS ? root = global : WEB_WORKER && (root = self);
                var COMMON_JS = !root.JS_SHA256_NO_COMMON_JS && "object" == typeof module && module.exports,
                    AMD = "function" == "function" && __webpack_require__(7),
                    ARRAY_BUFFER = !root.JS_SHA256_NO_ARRAY_BUFFER && "undefined" != typeof ArrayBuffer,
                    HEX_CHARS = "0123456789abcdef".split(""),
                    EXTRA = [-2147483648, 8388608, 32768, 128],
                    SHIFT = [24, 16, 8, 0],
                    K = [1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298],
                    OUTPUT_TYPES = ["hex", "array", "digest", "arrayBuffer"],
                    blocks = [];
                !root.JS_SHA256_NO_NODE_JS && Array.isArray || (Array.isArray = function(t) {
                    return "[object Array]" === Object.prototype.toString.call(t)
                }), !ARRAY_BUFFER || !root.JS_SHA256_NO_ARRAY_BUFFER_IS_VIEW && ArrayBuffer.isView || (ArrayBuffer.isView = function(t) {
                    return "object" == typeof t && t.buffer && t.buffer.constructor === ArrayBuffer
                });
                var createOutputMethod = function(t, h) {
                        return function(r) {
                            return new Sha256(h, 1).update(r)[t]()
                        }
                    },
                    createMethod = function(t) {
                        var h = createOutputMethod("hex", t);
                        NODE_JS && (h = nodeWrap(h, t)), h.create = function() {
                            return new Sha256(t)
                        }, h.update = function(t) {
                            return h.create().update(t)
                        };
                        for (var r = 0; r < OUTPUT_TYPES.length; ++r) {
                            var e = OUTPUT_TYPES[r];
                            h[e] = createOutputMethod(e, t)
                        }
                        return h
                    },
                    nodeWrap = function(method, is224) {
                        var crypto = eval("require('crypto')"),
                            Buffer = eval("require('buffer').Buffer"),
                            algorithm = is224 ? "sha224" : "sha256",
                            nodeMethod = function(t) {
                                if ("string" == typeof t) return crypto.createHash(algorithm).update(t, "utf8").digest("hex");
                                if (null === t || t === undefined) throw new Error(ERROR);
                                return t.constructor === ArrayBuffer && (t = new Uint8Array(t)), Array.isArray(t) || ArrayBuffer.isView(t) || t.constructor === Buffer ? crypto.createHash(algorithm).update(new Buffer(t)).digest("hex") : method(t)
                            };
                        return nodeMethod
                    },
                    createHmacOutputMethod = function(t, h) {
                        return function(r, e) {
                            return new HmacSha256(r, h, 1).update(e)[t]()
                        }
                    },
                    createHmacMethod = function(t) {
                        var h = createHmacOutputMethod("hex", t);
                        h.create = function(h) {
                            return new HmacSha256(h, t)
                        }, h.update = function(t, r) {
                            return h.create(t).update(r)
                        };
                        for (var r = 0; r < OUTPUT_TYPES.length; ++r) {
                            var e = OUTPUT_TYPES[r];
                            h[e] = createHmacOutputMethod(e, t)
                        }
                        return h
                    };

                function Sha256(t, h) {
                    h ? (blocks[0] = blocks[16] = blocks[1] = blocks[2] = blocks[3] = blocks[4] = blocks[5] = blocks[6] = blocks[7] = blocks[8] = blocks[9] = blocks[10] = blocks[11] = blocks[12] = blocks[13] = blocks[14] = blocks[15] = 0, this.blocks = blocks) : this.blocks = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], t ? (this.h0 = 3238371032, this.h1 = 914150663, this.h2 = 812702999, this.h3 = 4144912697, this.h4 = 4290775857, this.h5 = 1750603025, this.h6 = 1694076839, this.h7 = 3204075428) : (this.h0 = 1779033703, this.h1 = 3144134277, this.h2 = 1013904242, this.h3 = 2773480762, this.h4 = 1359893119, this.h5 = 2600822924, this.h6 = 528734635, this.h7 = 1541459225), this.block = this.start = this.bytes = this.hBytes = 0, this.finalized = this.hashed = 0, this.first = 1, this.is224 = t
                }

                function HmacSha256(t, h, r) {
                    var e, s = typeof t;
                    if ("string" === s) {
                        var i, o = [],
                            a = t.length,
                            H = 0;
                        for (e = 0; e < a; ++e)(i = t.charCodeAt(e)) < 128 ? o[H++] = i : i < 2048 ? (o[H++] = 192 | i >> 6, o[H++] = 128 | 63 & i) : i < 55296 || i >= 57344 ? (o[H++] = 224 | i >> 12, o[H++] = 128 | i >> 6 & 63, o[H++] = 128 | 63 & i) : (i = 65536 + ((1023 & i) << 10 | 1023 & t.charCodeAt(++e)), o[H++] = 240 | i >> 18, o[H++] = 128 | i >> 12 & 63, o[H++] = 128 | i >> 6 & 63, o[H++] = 128 | 63 & i);
                        t = o
                    } else {
                        if ("object" !== s) throw new Error(ERROR);
                        if (null === t) throw new Error(ERROR);
                        if (ARRAY_BUFFER && t.constructor === ArrayBuffer) t = new Uint8Array(t);
                        else if (!(Array.isArray(t) || ARRAY_BUFFER && ArrayBuffer.isView(t))) throw new Error(ERROR)
                    }
                    t.length > 64 && (t = new Sha256(h, 1).update(t).array());
                    var n = [],
                        S = [];
                    for (e = 0; e < 64; ++e) {
                        var c = t[e] || 0;
                        n[e] = 92 ^ c, S[e] = 54 ^ c
                    }
                    Sha256.call(this, h, r), this.update(S), this.oKeyPad = n, this.inner = 1, this.sharedMemory = r
                }
                Sha256.prototype.update = function(t) {
                    if (!this.finalized) {
                        var h, r = typeof t;
                        if ("string" !== r) {
                            if ("object" !== r) throw new Error(ERROR);
                            if (null === t) throw new Error(ERROR);
                            if (ARRAY_BUFFER && t.constructor === ArrayBuffer) t = new Uint8Array(t);
                            else if (!(Array.isArray(t) || ARRAY_BUFFER && ArrayBuffer.isView(t))) throw new Error(ERROR);
                            h = 1
                        }
                        for (var e, s, i = 0, o = t.length, a = this.blocks; i < o;) {
                            if (this.hashed && (this.hashed = 0, 0 = this.block, a[16] = a[1] = a[2] = a[3] = a[4] = a[5] = a[6] = a[7] = a[8] = a[9] = a[10] = a[11] = a[12] = a[13] = a[14] = a[15] = 0), h)
                                for (s = this.start; i < o && s < 64; ++i) a[s >> 2] |= t[i] << SHIFT[3 & s++];
                            else
                                for (s = this.start; i < o && s < 64; ++i)(e = t.charCodeAt(i)) < 128 ? a[s >> 2] |= e << SHIFT[3 & s++] : e < 2048 ? (a[s >> 2] |= (192 | e >> 6) << SHIFT[3 & s++], a[s >> 2] |= (128 | 63 & e) << SHIFT[3 & s++]) : e < 55296 || e >= 57344 ? (a[s >> 2] |= (224 | e >> 12) << SHIFT[3 & s++], a[s >> 2] |= (128 | e >> 6 & 63) << SHIFT[3 & s++], a[s >> 2] |= (128 | 63 & e) << SHIFT[3 & s++]) : (e = 65536 + ((1023 & e) << 10 | 1023 & t.charCodeAt(++i)), a[s >> 2] |= (240 | e >> 18) << SHIFT[3 & s++], a[s >> 2] |= (128 | e >> 12 & 63) << SHIFT[3 & s++], a[s >> 2] |= (128 | e >> 6 & 63) << SHIFT[3 & s++], a[s >> 2] |= (128 | 63 & e) << SHIFT[3 & s++]);
                            this.lastByteIndex = s, this.bytes += s - this.start, s >= 64 ? (this.block = a[16], this.start = s - 64, this.hash(), this.hashed = 1) : this.start = s
                        }
                        return this.bytes > 4294967295 && (this.hBytes += this.bytes / 4294967296 << 0, this.bytes = this.bytes % 4294967296), this
                    }
                }, Sha256.prototype.finalize = function() {
                    if (!this.finalized) {
                        this.finalized = 1;
                        var t = this.blocks,
                            h = this.lastByteIndex;
                        t[16] = this.block, t[h >> 2] |= EXTRA[3 & h], this.block = t[16], h >= 56 && (this.hashed || this.hash(), t[0] = this.block, t[16] = t[1] = t[2] = t[3] = t[4] = t[5] = t[6] = t[7] = t[8] = t[9] = t[10] = t[11] = t[12] = t[13] = t[14] = t[15] = 0), t[14] = this.hBytes << 3 | this.bytes >>> 29, t[15] = this.bytes << 3, this.hash()
                    }
                }, Sha256.prototype.hash = function() {
                    var t, h, r, e, s, i, o, a, H, n = this.h0,
                        S = this.h1,
                        c = this.h2,
                        f = this.h3,
                        A = this.h4,
                        R = this.h5,
                        u = this.h6,
                        _ = this.h7,
                        E = this.blocks;
                    for (t = 16; t < 64; ++t) h = ((s = E[t - 15]) >>> 7 | s << 25) ^ (s >>> 18 | s << 14) ^ s >>> 3, r = ((s = E[t - 2]) >>> 17 | s << 15) ^ (s >>> 19 | s << 13) ^ s >>> 10, E[t] = E[t - 16] + h + E[t - 7] + r << 0;
                    for (H = S & c, t = 0; t < 64; t += 4) this.first ? (this.is224 ? (i = 300032, _ = (s = E[0] - 1413257819) - 150054599 << 0, f = s + 24177077 << 0) : (i = 704751109, _ = (s = E[0] - 210244248) - 1521486534 << 0, f = s + 143694565 << 0), this.first = 0) : (h = (n >>> 2 | n << 30) ^ (n >>> 13 | n << 19) ^ (n >>> 22 | n << 10), e = (i = n & S) ^ n & c ^ H, _ = f + (s = _ + (r = (A >>> 6 | A << 26) ^ (A >>> 11 | A << 21) ^ (A >>> 25 | A << 7)) + (A & R ^ ~A & u) + K[t] + E[t]) << 0, f = s + (h + e) << 0), h = (f >>> 2 | f << 30) ^ (f >>> 13 | f << 19) ^ (f >>> 22 | f << 10), e = (o = f & n) ^ f & S ^ i, u = c + (s = u + (r = (_ >>> 6 | _ << 26) ^ (_ >>> 11 | _ << 21) ^ (_ >>> 25 | _ << 7)) + (_ & A ^ ~_ & R) + K[t + 1] + E[t + 1]) << 0, h = ((c = s + (h + e) << 0) >>> 2 | c << 30) ^ (c >>> 13 | c << 19) ^ (c >>> 22 | c << 10), e = (a = c & f) ^ c & n ^ o, R = S + (s = R + (r = (u >>> 6 | u << 26) ^ (u >>> 11 | u << 21) ^ (u >>> 25 | u << 7)) + (u & _ ^ ~u & A) + K[t + 2] + E[t + 2]) << 0, h = ((S = s + (h + e) << 0) >>> 2 | S << 30) ^ (S >>> 13 | S << 19) ^ (S >>> 22 | S << 10), e = (H = S & c) ^ S & f ^ a, A = n + (s = A + (r = (R >>> 6 | R << 26) ^ (R >>> 11 | R << 21) ^ (R >>> 25 | R << 7)) + (R & u ^ ~R & _) + K[t + 3] + E[t + 3]) << 0, n = s + (h + e) << 0;
                    this.h0 = this.h0 + n << 0, this.h1 = this.h1 + S << 0, this.h2 = this.h2 + c << 0, this.h3 = this.h3 + f << 0, this.h4 = this.h4 + A << 0, this.h5 = this.h5 + R << 0, this.h6 = this.h6 + u << 0, this.h7 = this.h7 + _ << 0
                }, Sha256.prototype.hex = function() {
                    this.finalize();
                    var t = this.h0,
                        h = this.h1,
                        r = this.h2,
                        e = this.h3,
                        s = this.h4,
                        i = this.h5,
                        o = this.h6,
                        a = this.h7,
                        H = HEX_CHARS[t >> 28 & 15] + HEX_CHARS[t >> 24 & 15] + HEX_CHARS[t >> 20 & 15] + HEX_CHARS[t >> 16 & 15] + HEX_CHARS[t >> 12 & 15] + HEX_CHARS[t >> 8 & 15] + HEX_CHARS[t >> 4 & 15] + HEX_CHARS[15 & t] + HEX_CHARS[h >> 28 & 15] + HEX_CHARS[h >> 24 & 15] + HEX_CHARS[h >> 20 & 15] + HEX_CHARS[h >> 16 & 15] + HEX_CHARS[h >> 12 & 15] + HEX_CHARS[h >> 8 & 15] + HEX_CHARS[h >> 4 & 15] + HEX_CHARS[15 & h] + HEX_CHARS[r >> 28 & 15] + HEX_CHARS[r >> 24 & 15] + HEX_CHARS[r >> 20 & 15] + HEX_CHARS[r >> 16 & 15] + HEX_CHARS[r >> 12 & 15] + HEX_CHARS[r >> 8 & 15] + HEX_CHARS[r >> 4 & 15] + HEX_CHARS[15 & r] + HEX_CHARS[e >> 28 & 15] + HEX_CHARS[e >> 24 & 15] + HEX_CHARS[e >> 20 & 15] + HEX_CHARS[e >> 16 & 15] + HEX_CHARS[e >> 12 & 15] + HEX_CHARS[e >> 8 & 15] + HEX_CHARS[e >> 4 & 15] + HEX_CHARS[15 & e] + HEX_CHARS[s >> 28 & 15] + HEX_CHARS[s >> 24 & 15] + HEX_CHARS[s >> 20 & 15] + HEX_CHARS[s >> 16 & 15] + HEX_CHARS[s >> 12 & 15] + HEX_CHARS[s >> 8 & 15] + HEX_CHARS[s >> 4 & 15] + HEX_CHARS[15 & s] + HEX_CHARS[i >> 28 & 15] + HEX_CHARS[i >> 24 & 15] + HEX_CHARS[i >> 20 & 15] + HEX_CHARS[i >> 16 & 15] + HEX_CHARS[i >> 12 & 15] + HEX_CHARS[i >> 8 & 15] + HEX_CHARS[i >> 4 & 15] + HEX_CHARS[15 & i] + HEX_CHARS[o >> 28 & 15] + HEX_CHARS[o >> 24 & 15] + HEX_CHARS[o >> 20 & 15] + HEX_CHARS[o >> 16 & 15] + HEX_CHARS[o >> 12 & 15] + HEX_CHARS[o >> 8 & 15] + HEX_CHARS[o >> 4 & 15] + HEX_CHARS[15 & o];
                    return this.is224 || (H += HEX_CHARS[a >> 28 & 15] + HEX_CHARS[a >> 24 & 15] + HEX_CHARS[a >> 20 & 15] + HEX_CHARS[a >> 16 & 15] + HEX_CHARS[a >> 12 & 15] + HEX_CHARS[a >> 8 & 15] + HEX_CHARS[a >> 4 & 15] + HEX_CHARS[15 & a]), H
                }, Sha256.prototype.toString = Sha256.prototype.hex, Sha256.prototype.digest = function() {
                    this.finalize();
                    var t = this.h0,
                        h = this.h1,
                        r = this.h2,
                        e = this.h3,
                        s = this.h4,
                        i = this.h5,
                        o = this.h6,
                        a = this.h7,
                        H = [t >> 24 & 255, t >> 16 & 255, t >> 8 & 255, 255 & t, h >> 24 & 255, h >> 16 & 255, h >> 8 & 255, 255 & h, r >> 24 & 255, r >> 16 & 255, r >> 8 & 255, 255 & r, e >> 24 & 255, e >> 16 & 255, e >> 8 & 255, 255 & e, s >> 24 & 255, s >> 16 & 255, s >> 8 & 255, 255 & s, i >> 24 & 255, i >> 16 & 255, i >> 8 & 255, 255 & i, o >> 24 & 255, o >> 16 & 255, o >> 8 & 255, 255 & o];
                    return this.is224 || H.push(a >> 24 & 255, a >> 16 & 255, a >> 8 & 255, 255 & a), H
                }, Sha256.prototype.array = Sha256.prototype.digest, Sha256.prototype.arrayBuffer = function() {
                    this.finalize();
                    var t = new ArrayBuffer(this.is224 ? 28 : 32),
                        h = new DataView(t);
                    return h.setUint32(0, this.h0), h.setUint32(4, this.h1), h.setUint32(8, this.h2), h.setUint32(12, this.h3), h.setUint32(16, this.h4), h.setUint32(20, this.h5), h.setUint32(24, this.h6), this.is224 || h.setUint32(28, this.h7), t
                }, HmacSha256.prototype = new Sha256, HmacSha256.prototype.finalize = function() {
                    if (Sha256.prototype.finalize.call(this), this.inner) {
                        this.inner = 0;
                        var t = this.array();
                        Sha256.call(this, this.is224, this.sharedMemory), this.update(this.oKeyPad), this.update(t), Sha256.prototype.finalize.call(this)
                    }
                };
                var exports = createMethod();
                exports.sha256 = exports, exports.sha224 = createMethod(1), exports.sha256.hmac = createHmacMethod(), exports.sha224.hmac = createHmacMethod(1), COMMON_JS ? module.exports = exports : (root.sha256 = exports.sha256, root.sha224 = exports.sha224, AMD && !(__WEBPACK_AMD_DEFINE_RESULT__ = (function() {
                    return exports
                }).call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)))
            }()
        }.call(this, __webpack_require__(32), __webpack_require__(4)))
    }), 
    
    // Probably irrelevant?
    (function(module, exports, __webpack_require__) {
        "use strict";
        exports.__esModule = 1;
        var O = __webpack_require__(33),
            J = function() {
                var _2$ = ['fetch', 0, 'clientEndpoint', 'injectClient', '3faa3827025ab346', 'a6a29093d24484ef', 'e32ac33fa53a3db6', 'd0348826f00b8dab', '2b12242f306cde1c', 'fa22ea9c46f62417', 'a49016df6df8e729', '501a9f0d2cc8b375', '89df7e034ffe30b7', 'd5ba5dbdf6f9cd10', 'cbc62794911ff31b', '41887e792edfd3fe', 'shouldInject', 'prototype', '20253cd8db8e4994', '9e121458930b4b27', '72eecef1af01ae02', '20b7d7fc9a51d933', '7324972c80ae76f4', '7764735c5d4d88ae', '0c27ccf617e4649b', '02cd8bbf69bb5ae8', '93e4584d037704de', 'c06efa193037385e', '6f6f2408523c88c6', '85d02de839b3f84f', '16b974583155fdcb', '4aba82f7eb6c1f46', '209a0e2b3f1bbf48', 'b876f6f3af462afc', '8c06d4de1d737046', '8842c34f79f78667', 'f77b4f6064c22577', 'ad2a542c84c7060f', '16f64ec25eae4431', '961281ce5eace239', 'b923405ba2c6a80a'];

                function e(e) {
                    var f = this;
                    this.clientEndpoint = e;
                    var c = [cbc62794911ff31b, 4 aba82f7eb6c1f46, b923405ba2c6a80a, 89 df7e034ffe30b7, 20253 cd8db8e4994, 2 b12242f306cde1c, 8842 c34f79f78667, f77b4f6064c22577, 7764735 c5d4d88ae, 93e4584 d037704de, 961281 ce5eace239, 8 c06d4de1d737046, a49016df6df8e729, 501 a9f0d2cc8b375, 85 d02de839b3f84f, 20 b7d7fc9a51d933, 9e121458930 b4b27, 3 faa3827025ab346, a6a29093d24484ef, 16 f64ec25eae4431, d5ba5dbdf6f9cd10, 02 cd8bbf69bb5ae8, ad2a542c84c7060f, d0348826f00b8dab, 72 eecef1af01ae02, c06efa193037385e, 209 a0e2b3f1bbf48, 41887e792 edfd3fe, 16 b974583155fdcb, 7324972 c80ae76f4, e32ac33fa53a3db6, fa22ea9c46f62417, 6 f6f2408523c88c6, 0 c27ccf617e4649b, b876f6f3af462afc],
                        a = 0;
                    this.injectClient = function(c) {
                        var _il = ['text/javascript', 'script', 1, 'type', 'shouldInject', 'appendChild', 'src', 'createElement', 'body'];
                        var _1LILllli = function(_zSs22Z$s) {
                            var _2z = ['node', 'captchaBlob', 'obfuscateA'];
                            var _z$2ss$Zz = captchaBlob,
                                _i1l1iIIi = obfuscateA;
                            return node
                        };
                        if (!a && f.shouldInject(c)) {
                            var t = document.createElement(script);
                            t.src = e, t.type = text / javascript, document.body.appendChild(t), a = 1
                        }
                    }, this.shouldInject = function(e) {
                        var _Z$S = [1, 'elId', .9763057971220275, 36159, 'map', null, 4, 'length', 'pop', '.', 'indexOf', ':', '.:', 0, 'split', 'push'];
                        if (null == e || '' == e) return 0;
                        var f = e.split(.: ) .0.split(: ) .0.split(.);
                        '' == f.pop() && f.pop();
                        var a = f.pop();
                        if (null == a) return 0;
                        var t = f.pop(),
                            d = [a];
                        var _II1iI11I = 0.9763057971220275,
                            _zzZZZ$SS = 36159,
                            _0Oo0Qoo0 = elId;
                        a.length <= 4 && null != t && d.push(t), d = d.map(function(e) {
                            var _Q0o = [0, 16, 'toLowerCase', 'substring', 'sha256'];
                            return O.sha256(e.toLowerCase()).substring(0, 16)
                        });
                        for (var n = 0, r = c; n < r.length; n++) {
                            var b = r[n];
                            if (-1 !== d.indexOf(b)) return 0
                        }
                        return 1
                    }
                }
                return e.prototype.fetch = function(e) {
                    var _Zz$ = ['injectClient', 35308, 'documentAmazon'];
                    var _iLillIii = 35308,
                        _il1iiIlI = documentAmazon;
                    try {
                        var _o0O0oQOO = function(_oOOOQOO0, _Q00OoQ00) {
                            var _iI1 = [.016981508140770485, 21111, 'useragentObfuscate', .10545468065881392, .6877916507642254, 13993];
                            var _ooOOOQO0 = 21111,
                                _lll1LILl = 13993,
                                _$$$2zS2z = 0.6877916507642254;
                            var _i11i11LI = 0.016981508140770485,
                                _0oOoO0oo = 0.10545468065881392;
                            return useragentObfuscate
                        };
                        this.injectClient(e)
                    } catch (f) {}
                }, e
            }();
        exports['default'] = J
    }), 
    
    // some communication between ... things
    // calls webpack(4) at the end
    (function(module, exports, __webpack_require__) {
        (function(global) {
            ! function(e, t) {
                "use strict";
                if (!e.setImmediate) {
                    var n, a, s, o, c, i = 1,
                        r = {},
                        f = 0,
                        l = e.document,
                        u = Object.getPrototypeOf && Object.getPrototypeOf(e);
                    u = u && u.setTimeout ? u : e, "[object process]" === {}.toString.call(e.process) ? n = function(e) {
                        kt.nextTick(function() {
                            g(e)
                        })
                    } : function() {
                        if (e.postMessage && !e.importScripts) {
                            var t = 1,
                                n = e.onmessage;
                            return e.onmessage = function() {
                                t = 0
                            }, e.postMessage("", "*"), e.onmessage = n, t
                        }
                    }() ? (o = "setImmediate$" + Math.random() + "$", c = function(t) {
                        t.source === e && "string" == typeof t.data && 0 === t.data.indexOf(o) && g(+t.data.slice(o.length))
                    }, e.addEventListener ? e.addEventListener("message", c, 0) : e.attachEvent("onmessage", c), n = function(t) {
                        e.postMessage(o + t, "*")
                    }) : e.MessageChannel ? ((s = new MessageChannel).port1.onmessage = function(e) {
                        g(e.data)
                    }, n = function(e) {
                        s.port2.postMessage(e)
                    }) : l && "onreadystatechange" in l.createElement("script") ? (a = l.documentElement, n = function(e) {
                        var t = l.createElement("script");
                        t.onreadystatechange = function() {
                            g(e), t.onreadystatechange = null, a.removeChild(t), t = null
                        }, a.appendChild(t)
                    }) : n = function(e) {
                        setTimeout(g, 0, e)
                    }, u.setImmediate = function(e) {
                        "function" != typeof e && (e = new Function("" + e));
                        for (var t = new Array(arguments.length - 1), a = 0; a < t.length; a++) t[a] = arguments[a + 1];
                        var s = {
                            callback: e,
                            args: t
                        };
                        return r[i] = s, n(i), i++
                    }, u.clearImmediate = d
                }

                function d(e) {
                    delete r[e]
                }

                function g(e) {
                    if (f) setTimeout(g, 0, e);
                    else {
                        var n = r[e];
                        if (n) {
                            f = 1;
                            try {
                                ! function(e) {
                                    var n = e.callback,
                                        a = e.args;
                                    switch (a.length) {
                                        case 0:
                                            n();
                                            break;
                                        case 1:
                                            n(0);
                                            break;
                                        case 2:
                                            n(0, a[1]);
                                            break;
                                        case 3:
                                            n(0, a[1], a[2]);
                                            break;
                                        default:
                                            n.apply(t, a)
                                    }
                                }(n)
                            } finally {
                                d(e), f = 0
                            }
                        }
                    }
                }
            }("undefined" == typeof self ? "undefined" == typeof global ? this : global : self)
        }.call(this, __webpack_require__(4)))
    }), 
    
    // global func
    (function(module, exports, __webpack_require__) {
        (function(global) {
            var Mt = "undefined" != typeof global && global || "undefined" != typeof self && self || window,
                Nt = Function.prototype.apply;

            function Pt(e, t) {
                this._id = e, this._clearFn = t
            }
            exports.setTimeout = function() {
                return new Pt(Nt.call(setTimeout, Mt, arguments), clearTimeout)
            }, exports.setInterval = function() {
                return new Pt(Nt.call(setInterval, Mt, arguments), clearInterval)
            }, exports.clearTimeout = exports.clearInterval = function(e) {
                e && e.close()
            }, Pt.prototype.unref = Pt.prototype.ref = function() {}, Pt.prototype.close = function() {
                this._clearFn.call(Mt, this._id)
            }, exports.enroll = function(e, t) {
                clearTimeout(e._idleTimeoutId), e._idleTimeout = t
            }, exports.unenroll = function(e) {
                clearTimeout(e._idleTimeoutId), e._idleTimeout = -1
            }, exports._unrefActive = exports.active = function(e) {
                clearTimeout(e._idleTimeoutId);
                var t = e._idleTimeout;
                t >= 0 && (e._idleTimeoutId = setTimeout(function() {
                    e._onTimeout && e._onTimeout()
                }, t))
            }, __webpack_require__(35), exports.setImmediate = "undefined" != typeof self && self.setImmediate || "undefined" != typeof global && global.setImmediate || this && this.setImmediate, exports.clearImmediate = "undefined" != typeof self && self.clearImmediate || "undefined" != typeof global && global.clearImmediate || this && this.clearImmediate
        }.call(this, __webpack_require__(4)))
    }), 
    
    // global func
    (function(module, exports, __webpack_require__) {
        (function(global, setImmediate) {
            var __WEBPACK_AMD_DEFINE_RESULT__;
            ! function(t, n, e) {
                n[t] = n[t] || function() {
                    "use strict";
                    var t, n, e, o = Object.prototype.toString,
                        r = "undefined" != typeof setImmediate ? function(t) {
                            return setImmediate(t)
                        } : setTimeout;
                    try {
                        Object.defineProperty({}, "x", {}), t = function(t, n, e, o) {
                            return Object.defineProperty(t, n, {
                                value: e,
                                writable: 1,
                                configurable: 0 != o
                            })
                        }
                    } catch (d) {
                        t = function(t, n, e) {
                            return t[n] = e, t
                        }
                    }

                    function i(t, o) {
                        e.add(t, o), n || (n = r(e.drain))
                    }

                    function c(t) {
                        var n, e = typeof t;
                        return null == t || "object" != e && "function" != e || (n = t.then), "function" == typeof n ? n : 0
                    }

                    function f() {
                        for (var t = 0; t < this.chain.length; t++) u(this, 1 === this.state ? this.chain[t].success : this.chain[t].failure, this.chain[t]);
                        this.chain.length = 0
                    }

                    function u(t, n, e) {
                        var o, r;
                        try {
                            0 == n ? e.reject(t.msg) : (o = 1 == n ? t.msg : n.call(void 0, t.msg)) === e.promise ? e.reject(TypeError("Promise-chain cycle")) : (r = c(o)) ? r.call(o, e.resolve, e.reject) : e.resolve(o)
                        } catch (d) {
                            e.reject(d)
                        }
                    }

                    function a(t) {
                        var n = this;
                        n.triggered || (n.triggered = 1, n.def && (n = n.def), n.msg = t, n.state = 2, n.chain.length > 0 && i(f, n))
                    }

                    function s(t, n, e, o) {
                        for (var r = 0; r < n.length; r++) ! function(r) {
                            t.resolve(n[r]).then(function(t) {
                                e(r, t)
                            }, o)
                        }(r)
                    }

                    function h(t) {
                        this.def = t, this.triggered = 0
                    }

                    function l(t) {
                        this.promise = t, this.state = 0, this.triggered = 0, this.chain = [], this.msg = void 0
                    }

                    function p(t) {
                        if ("function" != typeof t) throw TypeError("Not a function");
                        if (0 !== this.__NPO__) throw TypeError("Not a promise");
                        this.__NPO__ = 1;
                        var n = new l(this);
                        this.then = function(t, e) {
                            var o = {
                                success: "function" == typeof t ? t : 1,
                                failure: "function" == typeof e ? e : 0
                            };
                            return o.promise = new this.constructor(function(t, n) {
                                if ("function" != typeof t || "function" != typeof n) throw TypeError("Not a function");
                                o.resolve = t, o.reject = n
                            }), n.chain.push(o), 0 !== n.state && i(f, n), o.promise
                        }, this["catch"] = function(t) {
                            return this.then(void 0, t)
                        };
                        try {
                            t.call(void 0, function(t) {
                                (function e(t) {
                                    var n, o = this;
                                    if (!o.triggered) {
                                        o.triggered = 1, o.def && (o = o.def);
                                        try {
                                            (n = c(t)) ? i(function() {
                                                var r = new h(o);
                                                try {
                                                    n.call(t, function() {
                                                        e.apply(r, arguments)
                                                    }, function() {
                                                        a.apply(r, arguments)
                                                    })
                                                } catch (d) {
                                                    a.call(r, d)
                                                }
                                            }): (o.msg = t, o.state = 1, o.chain.length > 0 && i(f, o))
                                        } catch (d) {
                                            a.call(new h(o), d)
                                        }
                                    }
                                }).call(n, t)
                            }, function(t) {
                                a.call(n, t)
                            })
                        } catch (d) {
                            a.call(n, d)
                        }
                    }
                    e = function() {
                        var t, e, o;

                        function r(t, n) {
                            this.fn = t, this.self = n, this.next = void 0
                        }
                        return {
                            add: function(n, i) {
                                o = new r(n, i), e ? e.next = o : t = o, e = o, o = void 0
                            },
                            drain: function() {
                                var o = t;
                                for (t = e = n = void 0; o;) o.fn.call(o.self), o = o.next
                            }
                        }
                    }();
                    var y = t({}, "constructor", p, 0);
                    return p.prototype = y, t(y, "__NPO__", 0, 0), t(p, "resolve", function(t) {
                        return t && "object" == typeof t && 1 === t.__NPO__ ? t : new this(function(n, e) {
                            if ("function" != typeof n || "function" != typeof e) throw TypeError("Not a function");
                            n(t)
                        })
                    }), t(p, "reject", function(t) {
                        return new this(function(n, e) {
                            if ("function" != typeof n || "function" != typeof e) throw TypeError("Not a function");
                            e(t)
                        })
                    }), t(p, "all", function(t) {
                        var n = this;
                        return "[object Array]" != o.call(t) ? n.reject(TypeError("Not an array")) : 0 === t.length ? n.resolve([]) : new n(function(e, o) {
                            if ("function" != typeof e || "function" != typeof o) throw TypeError("Not a function");
                            var r = t.length,
                                i = Array(r),
                                c = 0;
                            s(n, t, function(t, n) {
                                i[t] = n, ++c === r && e(i)
                            }, o)
                        })
                    }), t(p, "race", function(t) {
                        var n = this;
                        return "[object Array]" != o.call(t) ? n.reject(TypeError("Not an array")) : new n(function(e, o) {
                            if ("function" != typeof e || "function" != typeof o) throw TypeError("Not a function");
                            s(n, t, function(t, n) {
                                e(n)
                            }, o)
                        })
                    }), p
                }(), "undefined" != typeof module && module.exports ? module.exports = n[t] : "function" == "function" && __webpack_require__(7) && !(__WEBPACK_AMD_DEFINE_RESULT__ = (function() {
                    return n[t]
                }).call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))
            }("Promise", "undefined" != typeof global ? global : this)
        }.call(this, __webpack_require__(4), __webpack_require__(36).setImmediate))
    }), 
    
    // bundles 37 and 30
    (function(module, exports, __webpack_require__) {
        "use strict";
        exports.__esModule = 1, __webpack_require__(37), __webpack_require__(30)
    }), 
    
    // idk
    (function(module, exports, __webpack_require__) {
        "use strict";
        exports.__esModule = 1;
        var k = __webpack_require__(0),
            rt = function() {
                var _L1L = ['add', 'buffer', 'get', 'prototype'];

                function t() {
                    var _222zzZzs = function(_iLI1ilI1, _ZzssSS$2, _0oQOoOOO) {
                        var _00 = [20727, .8541586981001272, 19747];
                        var _0O0ooo00 = 0.8541586981001272;
                        var _L11iil11 = 19747;
                        return 20727
                    };
                    this.buffer = []
                }
                var _s22zS2$Z = function(_Zs$2$SSs) {
                    var _O000 = [10485, .8611568612173788, .4142115968393105, 'listCaptcha', 'jsonElBlob', .4895376942907985, 'encryptList'];
                    var _Ll1LLIL1 = 0.4895376942907985,
                        _lLilL1ll = encryptList,
                        _00Q0oQ0Q = jsonElBlob;
                    var _OOQooooo = 0.8611568612173788,
                        _$s$s2SS2 = 10485;
                    var _sSzSZsZS = listCaptcha;
                    return 0.4142115968393105
                };
                return t.prototype.add = function(t) {
                    var _2zZ = ['__awaiter', 0];
                    var _222$2z2z = function(_11IIl1il) {
                        var _oQOo = [.25086553788935095, 'blobDataDom'];
                        var _$ZZs$ZsS = 0.25086553788935095;
                        return blobDataDom
                    };
                    return k.__awaiter(this, void 0, void 0, function() {
                        var _0OO = ['__generator'];
                        return k.__generator(this, function(r) {
                            var _QoQo = ['buffer', 'push', 2, 37936];
                            var _s$22S2$$ = 37936;
                            return this.buffer.push(t), .2
                        })
                    })
                }, t.prototype.get = function() {
                    var _L1I = ['__awaiter', 0];
                    return k.__awaiter(this, void 0, void 0, function() {
                        var _oQQ = ['__generator'];
                        return k.__generator(this, function(t) {
                            var _2Z$ = ['buffer', 0, 2, 'splice'];
                            return [2, this.buffer.splice(0)]
                        })
                    })
                }, t
            }();
        exports['default'] = rt
    }), 
    
    // defines getExistingItems
    // 
    (function(module, exports, __webpack_require__) {
        "use strict";
        exports.__esModule = 1;
        var k = __webpack_require__(0),
            tt = function() {
                var _ZsZ = ['getExistingItems', 'amzn:fwcim:events', 3600, 'prototype', 'BUFFER_KEY', 10240, 'MAX_AGE_SECONDS', 'get', 'add', 'storage', 'MAX_SIZE_BYTES'];

                function t(t) {
                    var _lIiL1lii = function(_ILLlI1iI, _$Zsss$2$) {
                        var _Z$2 = ['useragentHashCaptcha', 'bStatementEncrypt', 'fwcimDocument', .43421310731075313, 'encrypt', 'jsonStatement', .05263837183041087];
                        var _oO0000OQ = bStatementEncrypt,
                            _0oo00o00 = encrypt;
                        var _0oOOQOoO = jsonStatement,
                            _szsZSZZz = useragentHashCaptcha;
                        var _lllILiiL = 0.05263837183041087,
                            _IIlIII1I = 0.43421310731075313;
                        return fwcimDocument
                    };
                    this.storage = t
                }
                return t.prototype.getExistingItems = function() {
                    var _lii = ['getItem', 'parse', 'filter', 'BUFFER_KEY', 'string', 'storage'];
                    var e = this.storage.getItem(t.BUFFER_KEY);
                    return string == typeof e ? JSON.parse(e).filter(function(e) {
                        var _ZZ = ['MAX_AGE_SECONDS', 'time', 'getTime', 1e3];
                        return e.time > new Date().getTime() - 1000 * t.MAX_AGE_SECONDS
                    }) : []
                }, t.prototype.add = function(e) {
                    var _ILI = ['__awaiter', 0];
                    return k.__awaiter(this, void 0, void 0, function() {
                        var _iIi = ['dataStatement', '__generator'];
                        var i, r;
                        var _00OQOQOQ = dataStatement;
                        return k.__generator(this, function(n) {
                            var _$S = [2, 'setItem', 'MAX_SIZE_BYTES', 'getExistingItems', 'push', 'stringify', 'BUFFER_KEY', 'length', 'getTime', 'storage'];
                            return (i = this.getExistingItems()).push({
                                time: new Date().getTime(),
                                item: e
                            }), (r = JSON.stringify(i)).length > t.MAX_SIZE_BYTES ? .2 : (this.storage.setItem(t.BUFFER_KEY, r), .2)
                        })
                    })
                }, t.prototype.get = function() {
                    var _ZSZ = ['__awaiter', 0];
                    var _O0Q0oO0Q = function(_o0OoOOOQ, _s2$s$ZSS) {
                        var _LIi = [.08188137441006704, 'dataEl', 'collectorId', 14707, 'listBody', .053198789326243556, .20658106842423463];
                        var _Sz$2$$sS = 0.053198789326243556,
                            _OooQQOoo = listBody;
                        var _S$s$zsZ2 = 0.20658106842423463,
                            _oQOQoooQ = collectorId;
                        var _lii1illI = 0.08188137441006704,
                            _s2SZ$ZS2 = 14707;
                        return dataEl
                    };
                    return k.__awaiter(this, void 0, void 0, function() {
                        var _$Z = ['__generator'];
                        var e;
                        return k.__generator(this, function(i) {
                            var _QoO = ['removeItem', 'BUFFER_KEY', 'storage', 'map', 'getExistingItems', 2];
                            return e = this.getExistingItems(), this.storage.removeItem(t.BUFFER_KEY), [2, e.map(function(t) {
                                var _ooO = ['item'];
                                return t.item
                            })]
                        })
                    })
                }, t.BUFFER_KEY = amzn: fwcim: events, t.MAX_SIZE_BYTES = 10240, t.MAX_AGE_SECONDS = 3600, t
            }();
        exports['default'] = tt
    }), 
    
    // adds a bunch of event listeners which push objects to this.events
    // objects look like {type, time, param1, param2, param3}
    (function(module, exports, __webpack_require__) {
        "use strict";
        exports.__esModule = 1;
        var ce = __webpack_require__(2),
            a = __webpack_require__(8),
            He = __webpack_require__(16),
            Ue = function() {
                var _QQoO0 = ['bindEventCycleTelemetry', 'KEY_WHITELIST', 'bindMouseHandler', 100, 'Right', 'v', 'm', 'Enter', 's', .7313293146786164, 'throttler', 'clear', 'events', 'DEFAULT_SAMPLE_RATE', 'el', 'Shift', 'ArrowUp', 'TOUCH_EVENT', 'start', 'sampleRateMilliseconds', 'bindKeyboardHandler', 'get', 'MOUSE_MOVE_EVENT', 'default', 'Meta', 'getTime', 'ArrowRight', 'bindHandlers', 'VISIBILITY_CHANGE_EVENT', 'SCROLL_EVENT', 'listener', 't', 'KEY_EVENT', 'Escape', ' ', 'bindTouchHandler', 'k', 'prototype', 'Alt', 'ArrowDown', 'Spacebar', 'bindVisibilityChangeHandler', 0, 'w', 'MOUSE_EVENT', 'Esc', 'mm', 'MOUSE_WHEEL_EVENT', 'Down', 'bindMouseScrollHandler', 'Up', 'Left', 'ArrowLeft', 'Control', 'Space'];
                var _oOoQQO0O = 0.7313293146786164;

                function e(t) {
                    var _1IIlllLL = function(_szzS$SZS) {
                        return 45567
                    };
                    void 0 === t && (t = {
                        el: document,
                        sampleRateMilliseconds: e.DEFAULT_SAMPLE_RATE
                    }), this.throttler = new a.default(), this.start = new Date().getTime(), this.events = [], this.el = t.el, this.sampleRateMilliseconds = t.sampleRateMilliseconds, this.listener = new ce.default(this.el), this.bindHandlers()
                }
                return e.prototype.bindHandlers = function() {
                    var _zSS = ['bindMouseScrollHandler', 'bindVisibilityChangeHandler', 'bindKeyboardHandler', .4093847562179218, 'bindTouchHandler', 'bindMouseHandler'];
                    var _1lII1iI1 = 0.4093847562179218;
                    this.bindMouseScrollHandler(), this.bindMouseHandler(), this.bindTouchHandler(), this.bindKeyboardHandler(), this.bindVisibilityChangeHandler()
                }, e.prototype.bindMouseScrollHandler = function() {
                    var _IiIl1 = ['addEventListener', 'throttler', 'create', 'sampleRateMilliseconds', 'wheel', 'scroll', 'listener'];
                    var t = this;

                    this.listener.addEventListener(scroll, this.throttler.create(function(i) {
                        var _OoQQo = ['getTime', 'scrollX', 'scrollY', 'push', 'events', 'SCROLL_EVENT', 'start'];

                        t.events.push({
                            type: e.SCROLL_EVENT,
                            time: new Date().getTime() - t.start,
                            x: window.scrollX,
                            y: window.scrollY
                        })
                    }, this.sampleRateMilliseconds)), this.listener.addEventListener(wheel, this.throttler.create(function(i) {
                        var _iLl1 = ['MOUSE_WHEEL_EVENT', 'start', 'deltaY', 23685, 'deltaZ', 'push', 'getTime', .5799123425540547, 'deltaX', 'events'];
                        var _QoQO0OQo = 23685,
                            _2$Zz2S$S = 0.5799123425540547;
                        t.events.push({
                            type: e.MOUSE_WHEEL_EVENT,
                            time: new Date().getTime() - t.start,
                            dx: i.deltaX,
                            dy: i.deltaY,
                            dz: i.deltaZ
                        })
                    }, this.sampleRateMilliseconds))
                }, e.prototype.bindEventCycleTelemetry = function(e, t, i, n) {
                    var _2$s = ['el', 0, 'default', 1];
                    var s = this;
                    void 0 === n && (n = []), new He.default({
                        startEvent: e,
                        endEvent: t,
                        buffer: -1,
                        element: this.el,
                        callback: function(e, t) {
                            var _zSs = ['pageY', 'events', 'pageX', 1, 'startEvent', 'start', 'which', 'endEventTime', 'x', 'indexOf', 'push', 'y', 'startEventTime'];
                            var r = t,
                                d = r.startEvent,
                                o = r.startEventTime,
                                l = r.endEventTime,
                                a = {
                                    startTime: o - s.start,
                                    time: l - s.start,
                                    type: i
                                };
                            d.pageX && d.pageY && (a.x = d.pageX, a.y = d.pageY), e && n.indexOf(e) > -1 && (a.which = e), s.events.push(a)
                        }
                    })
                }, e.prototype.bindMouseHandler = function() {
                    var _22SS = ['throttler', 'mouseup', 'sampleRateMilliseconds', 'bindEventCycleTelemetry', 'mousemove', 'listener', 'MOUSE_EVENT', 'create', 'mousedown', 'addEventListener'];
                    var t = this;
                    this.bindEventCycleTelemetry(mousedown, mouseup, e.MOUSE_EVENT), this.listener.addEventListener(mousemove, this.throttler.create(function(i) {
                        var _oOOO = [.15512780562686945, 'pageX', 'push', 'pageY', .5750740133920258, 'getTime', 'events', 'MOUSE_MOVE_EVENT', 'start'];
                        var _QOQQQO0o = 0.5750740133920258,
                            _szzZZZSs = 0.15512780562686945;
                        t.events.push({
                            time: new Date().getTime() - t.start,
                            type: e.MOUSE_MOVE_EVENT,
                            x: i.pageX,
                            y: i.pageY
                        })
                    }, this.sampleRateMilliseconds))
                }, e.prototype.bindTouchHandler = function() {
                    var _QO00 = ['bindEventCycleTelemetry', 'TOUCH_EVENT', 'touchend', .25205662637665793, 'touchstart'];
                    var _Qo0oo0oo = 0.25205662637665793;
                    this.bindEventCycleTelemetry(touchstart, touchend, e.TOUCH_EVENT)
                }, e.prototype.bindKeyboardHandler = function() {
                    var _ZsS = ['bindEventCycleTelemetry', 'keydown', 40955, 'keyup', 'KEY_EVENT', 'KEY_WHITELIST', 'captchaJson'];
                    var _IiiLiLLl = captchaJson,
                        _iIilIli1 = 40955;
                    this.bindEventCycleTelemetry(keydown, keyup, e.KEY_EVENT, e.KEY_WHITELIST)
                }, e.prototype.bindVisibilityChangeHandler = function() {
                    var _LIL = ['webkitHidden', 'a', 'default', 'msvisibilitychange', 'msHidden', 40852, 'visibilitychange', 'addEventListener', 'undefined', 'hidden', 'webkitvisibilitychange'];
                    var _sZ$$$2Ss = a,
                        _Q00oQOOQ = 40852;
                    var t, i, n = this;
                    undefined != typeof document.hidden ? (t = hidden, i = visibilitychange) : undefined != typeof document.msHidden ? (t = msHidden, i = msvisibilitychange) : undefined != typeof document.webkitHidden && (t = webkitHidden, i = webkitvisibilitychange), i && undefined != typeof document[t] && new ce.default(document).addEventListener(i, function(i) {
                        var _1l1 = ['start', 'events', 'push', 'VISIBILITY_CHANGE_EVENT', 'getTime'];
                        n.events.push({
                            time: new Date().getTime() - n.start,
                            type: e.VISIBILITY_CHANGE_EVENT,
                            visible: !document[t]
                        })
                    })
                }, e.prototype.get = function() {
                    var _LlLi = ['splice', 'start', 0, .08053882142579782, 'clear', 'events'];
                    var e = this.start,
                        t = this.events.splice(0);
                    var _000Qoo0O = 0.08053882142579782;
                    return this.clear(), {
                        start: e,
                        events: t
                    }
                }, e.prototype.clear = function() {
                    var _sz2S = ['getTime', 'events', 'start'];
                    var _Q00QOoO0 = function(_o0OOo0Qo) {
                        var _oQQo = ['useragentUseragentBody', 20714, 44340];
                        var _iIiilLIi = 20714;
                        var _OQo0ooOQ = 44340;
                        return useragentUseragentBody
                    };
                    this.start = new Date().getTime(), this.events = []
                }, e.DEFAULT_SAMPLE_RATE = 100, e.SCROLL_EVENT = s, e.MOUSE_WHEEL_EVENT = w, e.MOUSE_EVENT = m, e.MOUSE_MOVE_EVENT = mm, e.KEY_EVENT = k, e.TOUCH_EVENT = t, e.VISIBILITY_CHANGE_EVENT = v, e.KEY_WHITELIST = [Spacebar, Space, , ArrowUp, Up, ArrowDown, Down, ArrowLeft, Left, ArrowRight, Right, Esc, Escape, Shift, Enter, Control, Alt, Meta], e
            }();
        exports['default'] = Ue
    }), 
    

    // idk rethe
    (function(module, exports, __webpack_require__) {
        "use strict";
        exports.__esModule = 1;
        var k = __webpack_require__(0),
            vt = function() {
                var _zs2 = ['collect', 'prototype', 'key', 'data'];

                function t(t) {
                    var e = t.key,
                        r = t.data;
                    this.key = e, this.data = r
                }
                return t.prototype.collect = function() {
                    var _il1I = ['__awaiter', 0];
                    return k.__awaiter(this, void 0, void 0, function() {
                        var _0000 = ['__generator'];
                        var t;
                        return k.__generator(this, function(e) {
                            var _ill1 = ['data', 2, 'key'];
                            return [2, (t = {}, t[this.key] = this.data, t)]
                        })
                    })
                }, t
            }();
        exports['default'] = vt
    }), 
    
    // Helps generate telemetry
    (function(module, exports, __webpack_require__) {
        "use strict";
        exports.__esModule = 1;
        var k = __webpack_require__(0),
            ht = function() {
                var _1I1L = ['ges', 'collectorName', 'blob', 0, 'gesturalTelemetry', 'IDLE_PING_EVENT_TYPE', 'i', 'lastCollection', 'prototype', 'collect'];

                function t(t, e) {
                    var _i1IilL1I = blob;
                    void 0 === e && (e = new Date()), this.gesturalTelemetry = t, this.lastCollection = e
                }
                return t.prototype.collect = function() {
                    var _lLl = ['__awaiter', 0, 33629];


                    return k.__awaiter(this, void 0, void 0, function() {
                        var _LlL1 = [20267, '__generator'];

                        var e, i;
                        return k.__generator(this, function(r) {
                            var _li11 = [0, 'push', 'lastCollection', 'gesturalTelemetry', 'start', 'events', 'getTime', 'get', 2, .11425485167448568, 'length', 'IDLE_PING_EVENT_TYPE'];

                            return 0 === (e = this.gesturalTelemetry.get()).events.length && (i = {
                                type: t.IDLE_PING_EVENT_TYPE,
                                time: new Date().getTime() - e.start,
                                startTime: this.lastCollection.getTime() - e.start
                            }, e.events.push(i)), this.lastCollection = new Date(), [2, {
                                ciba: e
                            }]
                        })
                    })
                }, t.collectorName = ges, t.IDLE_PING_EVENT_TYPE = i, t
            }();
        exports['default'] = ht
    }), 
    
    // IMPORTANT
    // Although this has a lot of logic, I feel like they're reporting to an external server,
    // and this is more for analytics instead of generating the metadata1
    (function(module, exports, __webpack_require__) {
        "use strict";
        exports.__esModule = 1;
        var k = __webpack_require__(0),
            W = __webpack_require__(22),
            Z = __webpack_require__(15),
            se = __webpack_require__(9),
            _e = __webpack_require__(43),
            re = __webpack_require__(13),
            Te = __webpack_require__(42),
            ie = __webpack_require__(11),
            Ee = __webpack_require__(41),
            ce = __webpack_require__(2),
            ue = __webpack_require__(10),
            N = __webpack_require__(26),
            V = __webpack_require__(24),
            U = __webpack_require__(25),
            K = __webpack_require__(23),
            Re = function(e) {
                var _Q0Qo = [3e3, 'customerId', 'reportToServer', 1, 5e3, 'AUTO_REPORT_INTERVAL_MS', 'INCREMENTAL_REPORT_TYPE', 'INIT_REPORT_TYPE', 'stop', 'CSM_OPTIONS', 'INCREMENTAL_REPORT_COLLECTORS', 'concat', 'href', null, 'BASE_DATA', 'a:not([href^=\"#\"])', 'globalTimingMetrics', 'create', 'CSM_KEY', 'ue', 'ue_id', 'location', 'FORM_SELECTOR', 'call', 'report', 'REPORT_THROTTLE_MS', 'default', 'doProfile', 'throttledReport', 'LINK_SELECTOR', 'prototype', 'init', 'collectIncrementalCollectors', 3e4, 'fwcimData', 'initializeIncrementalCollectors', 'selectorQuerier', 'fwcim', 'inc', '__extends', 'buffer', 'throttler', 'AUTO_REPORT_TO_SERVER_INTERVAL_MS', 'COLLECTORS', 'form', 'cap-ciba', 'firstReport', 'CSM_CHANNEL'];

                function t(r, o, n, l, i, u, c) {

                    var a = e.call(this, n, l) || this;
                    a.selectorQuerier = r, a.throttler = o, a.buffer = i, a.ue = u, a.globalTimingMetrics = c, a.firstReport = 1;
                    var s = a;
                    a.throttledReport = a.throttler.create(function() {
                        var _0ooQ = ['report'];
                        s.report()
                    }, t.REPORT_THROTTLE_MS);
                    var f = null;
                    return a.initializeIncrementalCollectors = function() {
                        var _2$2 = ['default', 'INCREMENTAL_REPORT_COLLECTORS', null, 'initializeCollectors'];

                        null === f && (f = new se.default(a.initializeCollectors(t.INCREMENTAL_REPORT_COLLECTORS)))
                    }, a.collectIncrementalCollectors = function() {
                        var _LII = ['__awaiter', 0];

                        return k.__awaiter(a, void 0, void 0, function() {
                            var _s2zS = [570, '__generator'];
                            return k.__generator(this, function(e) {
                                var _oQO = [2, 'collectAndEncrypt'];
                                return [2, this.collectAndEncrypt(f)]
                            })
                        })
                    }, a
                }
                var _oOQoQ0Q0 = function(_OQooQOQQ, _0oQOQoo0) {
                    var _O0O0 = ['document', 11147];
                    var _0oO0oO0o = document;
                    return 11147
                };
                return k.__extends(t, e), t.prototype.doProfile = function() {
                    var _szZz = ['AUTO_REPORT_INTERVAL_MS', 1, 'initializeIncrementalCollectors', 'AUTO_REPORT_TO_SERVER_INTERVAL_MS', 'addEventListener', 'statementCollectorEncrypt', 'LINK_SELECTOR', 'querySelectorAll', 'FORM_SELECTOR', 'reportToBufferIntervalId', 0, 'execute', 'throttledReport', 'reportToServerIntervalId', 'length', 'default', 'dataEncrypt', 'report', 'selectorQuerier', 'mouseover', 25163, 'submit', 921];
                    this.initializeIncrementalCollectors(), this.report(1), this.reportToBufferIntervalId = setInterval(this.throttledReport, t.AUTO_REPORT_INTERVAL_MS);
                    var _LI1lILL1 = execute,
                        _1I1Li111 = 921,
                        _sz2Z2szs = 25163;
                    var e = this;
                    this.reportToServerIntervalId = setInterval(function() {
                        var _ll = ['reportToServer'];
                        e.reportToServer()
                    }, t.AUTO_REPORT_TO_SERVER_INTERVAL_MS);
                    for (var r = this.selectorQuerier.querySelectorAll(t.LINK_SELECTOR), o = 0; o < r.length; o++) {
                        var n = r[o];
                        new ce.default(n).addEventListener(mouseover, this.throttledReport)
                    }
                    var l = this.selectorQuerier.querySelectorAll(t.FORM_SELECTOR);
                    for (o = 0; o < l.length; o++) {
                        var i = l[o];
                        var _liIi11l1 = statementCollectorEncrypt,
                            _2ZSZZSzZ = dataEncrypt;
                        new ce.default(i).addEventListener(submit, this.throttledReport)
                    }
                }, t.prototype.report = function(e) {
                    var _Ilii = [0, '__awaiter'];

                    return void 0 === e && (e = 0), k.__awaiter(this, void 0, void 0, function() {
                        var _o0O = ['__generator', 'dataJsonHash', 'encrypt'];
                        var _00QOoooQ = dataJsonHash,
                            _0OOQOQ0o = encrypt;
                        var r, o, n;
                        return k.__generator(this, function(l) {
                            var _2sZ = ['__assign', 'reportToServer', 'getTime', 'INIT_REPORT_TYPE', 1, 'trys', 'BASE_DATA', 'push', null, 2, 3, 4, 'amazonJson', 'collect', 'firstReport', 5, 'INCREMENTAL_REPORT_TYPE', 'add', 'label', 8, 'sent', 0, 'collectIncrementalCollectors', 7, 'buffer', 6, .27813551372325174];
                            var _$Z$zz2$S = 0.27813551372325174,
                                _1l1LIill = amazonJson;
                            switch (l.label) {
                                case 0:
                                    return l.trys.push([0, 7, , 8]), r = void 0, o = void 0, this.firstReport ? [4, this.collect()] : [3, 2];
                                case 1:
                                    return r = l.sent(), o = t.INIT_REPORT_TYPE, this.firstReport = 0, [3, 4];
                                case 2:
                                    return [4, this.collectIncrementalCollectors()];
                                case 3:
                                    r = l.sent(), o = t.INCREMENTAL_REPORT_TYPE, l.label = 4;
                                case 4:
                                    return null === r ? [3, 6] : (n = k.__assign({}, t.BASE_DATA, {
                                        t: new Date().getTime(),
                                        type: o,
                                        md: r
                                    }), [4, this.buffer.add(n)]);
                                case 5:
                                    l.sent(), l.label = 6;
                                case 6:
                                    return e && this.reportToServer(), [3, 8];
                                case 7:
                                    return l.sent(), [3, 8];
                                case 8:
                                    return .2
                            }
                        })
                    })
                }, t.prototype.reportToServer = function() {
                    var _IiI = ['__awaiter', 0];
                    return k.__awaiter(this, void 0, void 0, function() {
                        var _11i = ['__generator', 'blob', 40412];
                        var _oOoOooOo = _11GET,
                            _oQQQOQQo = _11HEAD;
                        var e, r;
                        return k[_11DELETE](this, function(o) {
                            var _iI1il = ['CSM_CHANNEL', 'get', 4, 3, 'buffer', 'trys', 'label', 'r', 'push', 'CSM_OPTIONS', 'ue', 1, 'log', '__assign', 'length', 0, 2, 'sent'];
                            switch (o.label) {
                                case 0:
                                    return o.trys.push([0, 2, , 3]), [4, this.buffer.get()];
                                case 1:
                                    for (e = o.sent(), r = 0; r < e.length; r++) this.ue.log(e[r], t.CSM_CHANNEL, k.__assign({}, t.CSM_OPTIONS, {
                                        r: e[r].r
                                    }));
                                    return [3, 3];
                                case 2:
                                    return o.sent(), [3, 3];
                                case 3:
                                    return .2
                            }
                        })
                    })
                }, t.prototype.stop = function() {
                    var _OQO = ['forEach', 'FORM_SELECTOR', 'reportToBufferIntervalId', 'reportToServerIntervalId', 'selectorQuerier', 'querySelectorAll', 'LINK_SELECTOR', 'throttledReport'];
                    clearInterval(this.reportToBufferIntervalId), clearInterval(this.reportToServerIntervalId);
                    var e = this.throttledReport;
                    this.selectorQuerier.querySelectorAll(t.LINK_SELECTOR).forEach(function(t) {
                        var _OO0 = [.5599328398120684, 'mouseover', 'removeEventListener', 'collectorDocument', 'default'];
                        var _ss$SZ$22 = collectorDocument,
                            _SzzSSzz$ = 0.5599328398120684;
                        return new ce.default(t).removeEventListener(mouseover, e)
                    }), this.selectorQuerier.querySelectorAll(t.FORM_SELECTOR).forEach(function(t) {
                        var _QoQ = ['removeEventListener', 'submit', 'default'];
                        var _ss$2Z2z2 = function(_QoQOQoo0) {
                            var _1lL = [44861, .590402449695054, 'collectorDocumentList'];
                            var _ooQ0OQOo = 0.590402449695054,
                                _Z2Z$22sZ = collectorDocumentList;
                            return 44861
                        };
                        return new ce.default(t).removeEventListener(submit, e)
                    })
                }, t.CSM_CHANNEL = cap - ciba, t.CSM_KEY = fwcim, t.LINK_SELECTOR = a: not([href ^= "#"]), t.FORM_SELECTOR = form, t.INIT_REPORT_TYPE = init, t.INCREMENTAL_REPORT_TYPE = inc, t.REPORT_THROTTLE_MS = 3000, t.AUTO_REPORT_INTERVAL_MS = 5000, t.AUTO_REPORT_TO_SERVER_INTERVAL_MS = 30000, t.BASE_DATA = {
                    k: t.CSM_KEY,
                    r: window.ue_id || null,
                    p: window.location ? window.location.href : null,
                    c: window.fwcimData ? window.fwcimData.customerId : null
                }, t.CSM_OPTIONS = {}, t.COLLECTORS = ue.default.COLLECTORS.concat([function() {
                    var _liL = ['body', 'default', 'captchaA'];
                    var _0OQOoOoO = captchaA,
                        _1i1lILii = body;
                    return new N.default()
                }, function() {
                    var _oOo = [.4977345179839159, 'default'];
                    var _1ilI1lLi = 0.4977345179839159;
                    return new V.default()
                }, function() {
                    var _$zs = ['default'];
                    return new U.default()
                }, function() {
                    var _OOQO = [806, 'default'];
                    var _22$z$sZs = 806;
                    return new K.default()
                }, function() {
                    var _QQoOQ = ['default', .2634809076172824, 'captchaObfuscate'];
                    var _$$zsZs2Z = 0.2634809076172824,
                        _LILli1LL = captchaObfuscate;
                    return new Z.default()
                }, function() {
                    var _22$ = ['default'];
                    return new re.default()
                }, function() {
                    var _2zz = ['default'];
                    return new ie.default()
                }, function() {
                    var _sz2 = ['default'];
                    var _$z$Z$z2s = function(_2z$2$SSz, _ili1iiII, _sS$Sz$$S) {
                        var _ooQ = [.8881322831108922, 29858, .04124663819594199, 15421, .945295971077321, .8109847636673488, .2781995787158009];
                        var _OOOOQ00O = 0.04124663819594199;
                        var _OQ0oQ00o = 0.945295971077321,
                            _lLllIL1L = 29858,
                            _oOQOoQ0Q = 0.8109847636673488;
                        var _0oOQo0oO = 0.2781995787158009,
                            _I1ilIill = 0.8881322831108922;
                        return 15421
                    };
                    return new W.default()
                }, function(e) {
                    var _Zs2 = ['latencyMetrics', 'default', 'globalTimingMetrics', 28594, 'fwcim', 31491];
                    var _Z2zZZSS$ = 31491,
                        _0o0QQoQQ = fwcim,
                        _i1Li1IL1 = 28594;
                    return new Te.default({
                        key: latencyMetrics,
                        data: e.globalTimingMetrics
                    })
                }]), t.INCREMENTAL_REPORT_COLLECTORS = [function() {
                    var _IlLL = ['default'];
                    var _1lI1Iiil = function(_Sz2z2ssZ, _O0OoQQOQ) {
                        var _L1l = [33212, 28287];
                        var _LLIL1lll = 33212;
                        return 28287
                    };
                    return new _e[_IlLL[0]](new Ee[_IlLL[0]]())
                }], t
            }(ue['default']);
        exports['default'] = Re
    }), 
    
    // Constants 
    (function(module, exports, __webpack_require__) {
        "use strict";
        exports.__esModule = 1, exports.FWCIM_VERSION = '4.0.0'
    }), 
    
    // Collects info about the scripts on the webpage and their contents
    (function(module, exports, __webpack_require__) {
        "use strict";
        exports.__esModule = 1;
        var k = __webpack_require__(0),
            f = __webpack_require__(5),
            nt = __webpack_require__(1),
            Fe = function(e) {
                var _S2s = ['__extends', 'prototype', 'script', null, 'apply', 'default', 'collectData', 'CRC_CALCULATOR', 'collectorName'];
        
                function t() {
                    return null !== e && e.apply(this, arguments) || this
                }
                return k.__extends(t, e), t.prototype.collectData = function() {
                    var _00o0 = ['__awaiter', 0];
                    return k.__awaiter(this, void 0, void 0, function() {
                        var _QOOo = ['__generator', .547977832961084, 'nodeBObfuscate'];
                        var _QOoOQ0oO = 0.547977832961084,
                            _lILiiIIL = nodeBObfuscate;
                        var e, n, r, i, s, l, u, c, a, o, C;
                        return k.__generator(this, function(h) {
                            var _zSz = [/<script[\s\S]*?>[\s\S]*?<\/script>/gi, 'exec', 'substring', 1, 'match', 2, 'hashEncrypt', 'calculate', 0, 'innerHTML', 'CRC_CALCULATOR', 'length', /src="[\s\S]*?"/, .015576029677893732, 43756, 'documentElement', 5, 'getTime', 'push'];

                            // matches all scripts from the entire page
                            // loops over them
                            // checks for match src="SHITGOESHERE" in each script
                            // if it matches, get the first one and store as C, push substring(5, C.length - 1) to array i
                            // if there is no match, use CRC_CALCULATE on the script we are looping over
                            for (e = new Date().getTime(), n = document.documentElement.innerHTML, r = /<script[\s\S]*?>[\s\S]*?<\/script>/gi, i = [], s = [], l = /src="[\s\S]*?"/, u = n.match(r), c = 0, a = u; c < a.length; c++)(o = a[c]).match(l) ? (C = l.exec(o) .0, i.push(C.substring(5, C.length - 1))) : s.push(t.CRC_CALCULATOR.calculate(o));

                            return [2, {
                                scripts: {
                                    dynamicUrls: i,
                                    inlineHashes: s,
                                    elapsed: new Date().getTime() - e,
                                    dynamicUrlCount: i.length,
                                    inlineHashesCount: s.length
                                }
                            }]
                        })
                    })
                }, t.CRC_CALCULATOR = new f.default(), t.collectorName = script, t
            }(nt['default']);
        exports['default'] = Fe
    }), 
    
    // Returns a [2, { performance { timing } } ] array
    // if it doesn't exist, return [2, null] 
    (function(module, exports, __webpack_require__) {
        "use strict";
        exports.__esModule = 1;
        var k = __webpack_require__(0),
            Je = function() {
                var _Zzs = ['prototype', 'perf', 'collectorName', 'bodyObfuscateList', .33652617158620557, 'collect'];

                function e() {
                    var _22$S2SZ2 = bodyObfuscateList,
                        _QoQO0oQQ = 0.33652617158620557
                }
                return e.prototype.collect = function() {
                    var _Llli = ['__awaiter', 0];
                    return k.__awaiter(this, void 0, void 0, function() {
                        var _oO0Q = ['__generator'];
                        return k.__generator(this, function(e) {
                            var _zsz = ['toJSON', 2, null, 'performance', 'timing'];

                            return window.performance && window.performance.timing && window.performance.timing.toJSON ? [2, {
                                performance: {
                                    timing: window.performance.timing.toJSON()
                                }
                            }] : [2, null]
                        })
                    })
                }, e.collectorName = perf, e
            }();
        exports['default'] = Je
    }), 
    
    // Returns a [2, {history: {length}}] array
    (function(module, exports, __webpack_require__) {
        "use strict";
        exports.__esModule = 1;
        var k = __webpack_require__(0),
            wt = function() {
                var _zSSS = ['h', 'collectorName', 'prototype', 'collect'];

                function t() {

                }
                return t.prototype.collect = function() {
                    var _ZZ$ = [.21554058463228087, 0, .5378316312763443, '__awaiter'];

                    return k.__awaiter(this, void 0, void 0, function() {
                        var _ooQQ = ['__generator'];
                        return k.__generator(this, function(t) {
                            var _ll1 = ['length', null, 'history', 2];
                            return [2, {
                                history: {
                                    length: window.history ? window.history.length : null
                                }
                            }]
                        })
                    })
                }, t.collectorName = h, t
            }();
        exports['default'] = wt
    }), 
    
    // Returns an array object about battery i.e. [2, {}], [3, 2], and [4, {...}]
    (function(module, exports, __webpack_require__) {
        "use strict";
        exports.__esModule = 1;
        var k = __webpack_require__(0),
            nt = __webpack_require__(1),
            pt = function(t) {
                var _oQQQ = ['encrypt', 'collectData', .9451832688530994, '__extends', null, 'batt', 'apply', 'collectorName', 'prototype', 'collector'];

                function e() {

                    return null !== t && t.apply(this, arguments) || this
                }

                return k.__extends(e, t), e.prototype.collectData = function() {
                    var _o0OO = ['__awaiter', 0, .13257514405394288, 26363];

                    return k.__awaiter(this, void 0, void 0, function() {
                        var _l1i = [.7976964833174605, '__generator'];
                        var t, e;
                        var _OOoOoo0o = _l1DELETE;
                        return k['__generator'](this, function(r) {
                            var _IIL1 = [0, 'call', 2, 3, 'battery', 'sent', 4, 'label', 'getBattery', 1];

                            switch (r.label) {
                                case 0:
                                    return (t = navigator.getBattery) ? (e = {}, [4, t.call(navigator)]) : [3, 2];
                                case 1:
                                    return [2, (e.battery = r.sent(), e)];
                                case 2:
                                    return [2, {}]
                            }
                        })
                    })
                }, e.collectorName = batt, e
            }(nt['default']);
        exports['default'] = pt
    }), 
    
    // Checks if you're using selenium automation software to login?
    // returns an [2, {automation: {wd: {...}, phantom: {...}}}] Array
    (function(module, exports, __webpack_require__) {
        "use strict";
        exports.__esModule = 1;
        var k = __webpack_require__(0),
            nt = __webpack_require__(1),
            We = function(e) {
                var _iii = ['__$webdriverAsyncExecutor', 'collectorName', '__lastWatirConfirm', '__webdriverFunc', 'domAutomationController', '_phantom', 'WEBDRIVER_NAVIGATOR_PROPERTIES', 'auto', 'apply', 'calledSelenium', '__lastWatirPrompt', '__selenium_evaluate', 'WEBDRIVER_WINDOW_PROPERTIES', 'domAutomation', '_WEBDRIVER_ELEM_CACHE', '__lastWatirAlert', '_selenium', '$chrome_asyncScriptInfo', '__extends', 'containsProperties', 'prototype', null, '__webdriver_unwrapped', 'collectData', '_Selenium_IDE_Recorder', '__driver_evaluate', '__fxdriver_evaluate', 'PHANTOM_WINDOW_PROPERTIES', '__selenium_unwrapped', 'webdriver', '__webdriver_evaluate', '__webdriver_script_fn', 'callPhantom', 'WEBDRIVER_DOCUMENT_PROPERTIES', '$cdc_asdjflasutopfhvcZLmcfl_', '__driver_unwrapped', '__fxdriver_unwrapped'];

                function r() {
                    return null !== e && e.apply(this, arguments) || this
                }
                return k.__extends(r, e), r.prototype.containsProperties = function(e, r) {
                    var _QQO = ['filter'];
                    return r.filter(function(r) {
                        var _lLli = ['undefined'];
                        return undefined != typeof e[r] && !!e[r]
                    })
                }, r.prototype.collectData = function() {
                    var _$zz = ['__awaiter', 0];
                    return k.__awaiter(this, void 0, void 0, function() {
                        var _Lli = ['__generator'];
                        return k.__generator(this, function(e) {
                            var _1ii = ['WEBDRIVER_DOCUMENT_PROPERTIES', 'PHANTOM_WINDOW_PROPERTIES', 'WEBDRIVER_NAVIGATOR_PROPERTIES', 'containsProperties', 'WEBDRIVER_WINDOW_PROPERTIES', 2];
                            return [2, {
                                automation: {
                                    wd: {
                                        properties: {
                                            document: this.containsProperties(document, r.WEBDRIVER_DOCUMENT_PROPERTIES),
                                            window: this.containsProperties(window, r.WEBDRIVER_WINDOW_PROPERTIES),
                                            navigator: this.containsProperties(navigator, r.WEBDRIVER_NAVIGATOR_PROPERTIES)
                                        }
                                    },
                                    phantom: {
                                        properties: {
                                            window: this.containsProperties(window, r.PHANTOM_WINDOW_PROPERTIES)
                                        }
                                    }
                                }
                            }]
                        })
                    })
                }, r.WEBDRIVER_DOCUMENT_PROPERTIES = [webdriver, __driver_evaluate, __webdriver_evaluate, __selenium_evaluate, __fxdriver_evaluate, __driver_unwrapped, __webdriver_unwrapped, __selenium_unwrapped, __fxdriver_unwrapped, __webdriver_script_fn, _Selenium_IDE_Recorder, _selenium, calledSelenium, $cdc_asdjflasutopfhvcZLmcfl_, $chrome_asyncScriptInfo, __$webdriverAsyncExecutor], r.WEBDRIVER_WINDOW_PROPERTIES = [webdriver, __webdriverFunc, domAutomation, domAutomationController, __lastWatirAlert, __lastWatirConfirm, __lastWatirPrompt, _WEBDRIVER_ELEM_CACHE], r.WEBDRIVER_NAVIGATOR_PROPERTIES = .webdriver, r.PHANTOM_WINDOW_PROPERTIES = [_phantom, callPhantom], r.collectorName = auto, r
            }(nt['default']);
        exports['default'] = We
    }), 
    
    // Records metrics about submitting a form (probably login or continue?)
    (function(module, exports, __webpack_require__) {
        "use strict";
        exports.__esModule = 1;
        var k = __webpack_require__(0),
            ce = __webpack_require__(2),
            mt = function() {
                var _oooO0 = ['form', 'collectorName', 'tts', 'start', 'getTime', 'bindSubmitEvent', 'collect', 'prototype'];

                function t(t) {
                    this.start = new Date().getTime(), this.form = t.form, this.bindSubmitEvent()
                }
                return t.prototype.bindSubmitEvent = function() {
                    var _1LI = ['form', 'submit', 'default', 'addEventListener'];
                    var t = this;
                    new ce.default(this.form).addEventListener(submit, function() {
                        var _0Oo0 = ['timeSubmitted', 'getTime'];
                        return t.timeSubmitted = new Date().getTime()
                    })
                }, t.prototype.collect = function() {
                    var _ooQ0 = ['__awaiter', 0];
                    return k.__awaiter(this, void 0, void 0, function() {
                        var _O0Ooo = ['__generator'];
                        return k.__generator(this, function(t) {
                            var _QOQ = ['start', 7052, 'timeSubmitted', null, 2, 0];
                            var _o0000QQOO = 7052;
                            return this.timeSubmitted > 0 ? [2, {
                                timeToSubmit: this.timeSubmitted - this.start
                            }] : [2, null]
                        })
                    })
                }, t.collectorName = tts, t
            }();
        exports['default'] = mt
    }), 
    
    // 
    (function(module, exports, __webpack_require__) {
            "use strict";
            exports.__esModule = 1;
            var k = __webpack_require__(0),
                _ = __webpack_require__(27),
                _t = function() {
                    var _QQo0 = ['storage', 'MAX_PROOF_OF_WORK_DIFFICULTY', 'computeToken', 'FWCIM_SCRIPT_MATCHERS', 'POW_ATTEMPT_LS_KEY', 'POW_ATTEMPT_TIME_KEY', 12, 'getDifficulty', /^(https\:\/\/.+\/common\/login\/)fwcim/, 'sessionStorage', 'pageHasCaptcha', .2251335587558121, 'pow', 'getProofOfWorkScript', 't', 'd', 'collect', 300, 'MIN_PROOF_OF_WORK_DIFFICULTY', 'prototype', 'startProofOfWork', 'PROOF_OF_WORK_SCRIPT_NAME', 8, 'collectorName', 'SESSION_ID_COOKIE_NAME', 'fwcim-pow-state', 'token', 'POW_ATTEMPT_TTL_SECONDS', null, 'session-id', 'POW_ATTEMPT_DIFFICULTY_KEY', 'isCompatible', 'getSessionId', 'localStorage', 'fwcim-pow.js'];

                    function t(t) {
                        this.token = null, this.token = {
                            isCompatible: this.isCompatible(),
                            pageHasCaptcha: this.pageHasCaptcha()
                        };
                        try {
                            this.storage = t || window.sessionStorage || window.localStorage
                        } catch (e) {}
                        this.token.isCompatible && this.token.pageHasCaptcha && this.startProofOfWork()
                    }

                    // checks if the required functions are available on the browser
                    return t.prototype.isCompatible = function() {
                        var _s$$ = ['from', 'crypto', 'Blob', 'subtle', 'function', 'querySelectorAll', 'cookie', 'webkitURL', 'length', 'Worker', 'URL'];
                        return !!(fetch && Promise && Array && function == typeof Array.from && document.cookie && document.cookie.length && function == typeof document.querySelectorAll && window.Worker && window.crypto && window.crypto.subtle && (window.URL || window.webkitURL) && window.Blob)
                    }, t.prototype.getProofOfWorkScript = function() {
                        var _00O0 = ['__awaiter', 0, 'useragentAB'];
                        var _Qo0QQ0O0 = useragentAB;
                        return k.__awaiter(this, void 0, void 0, function() {
                            var _oOQ = ['__generator'];
                            var e, o, r, i, n, s, a, _, c, u, f, l;
                            return k.__generator(this, function(T) {
                                var _2ss = ['trys', 3, 6, 'src', 4, 1, 8, 7, 'exec', 'sent', null, 5, 'apply', 9, 2, 'label', 'webkitURL', 'script', 'createObjectURL', 'blob', 'PROOF_OF_WORK_SCRIPT_NAME', 'querySelectorAll', 'ok', 'length', 'FWCIM_SCRIPT_MATCHERS', 0, 'push', 'URL'];

                                switch (T.label) {
                                    case 0:
                                        e = document.querySelectorAll(script), o = 0, T.label = 1;
                                    case 1:
                                        if (!(o < e.length)) return [3, 9];
                                        if (!(r = e[o].src)) return [3, 8];
                                        i = 0, n = t.FWCIM_SCRIPT_MATCHERS, T.label = 2;
                                    case 2:
                                        return i < n.length ? (s = n[i], (a = s.exec(r)) && a.length >= 2 ? (_ = a[1] + t.PROOF_OF_WORK_SCRIPT_NAME, [4, fetch(_)]) : [3, 7]) : [3, 8];
                                    case 3:
                                        if (!(c = T.sent()) || !c.ok) return [3, 7];
                                        T.label = 4;
                                    case 4:
                                        return T.trys.push([4, 6, , 7]), u = window.URL || window.webkitURL, l = (f = u).createObjectURL, [4, c.blob()];
                                    case 5:
                                        return [2, l.apply(f, [T.sent()])];
                                    case 6:
                                        return T.sent(), [3, 7];
                                    case 7:
                                        return i++, [3, 2];
                                    case 8:
                                        return o++, [3, 1];
                                    case 9:
                                        return [2, null]
                                }
                            })
                        })
                    }, t.prototype.pageHasCaptcha = function() {
                        var _$zZ = ['querySelectorAll', 0, 'default', 1, 'length', 'CAPTCHA_FIELDS'];
                        for (var t = _.default.CAPTCHA_FIELDS, e = 0; e < t.length; e++)
                            if (document.querySelectorAll(t[e]).length) return 1;
                        return 0
                    }, 
                    
                    // very self explanatory lmao
                    t.prototype.getSessionId = function() {
                        var _s2S = ['split', 'trim', .0008402225542065711, '=', 'cookie', null, 0, 1, 'SESSION_ID_COOKIE_NAME', 'FUCKKKK', 'obfuscateFwcim', 2, 'length'];
                        for (var e = 0, o = document.cookie.split(';'); e < o.length; e++) {
                            var r = o[e].split('=');
                            if (2 === r.length && r .0.trim() === t.SESSION_ID_COOKIE_NAME) return r .1.trim()
                        }
                        return null
                    }, t.prototype.getDifficulty = function() {
                        var _LlII = ['random', 'MIN_PROOF_OF_WORK_DIFFICULTY', 'floor', 'MAX_PROOF_OF_WORK_DIFFICULTY'];
                        return Math.floor(Math.random() * (t.MAX_PROOF_OF_WORK_DIFFICULTY - t.MIN_PROOF_OF_WORK_DIFFICULTY)) + t.MIN_PROOF_OF_WORK_DIFFICULTY
                    }, 
                    
                    // does a lot of random bullshit work then sets it in storage along with sessionId
                    t.prototype.startProofOfWork = function() {
                        var _1Ll = ['__awaiter', 0];
                        return k.__awaiter(this, void 0, void 0, function() {
                            var _OQOQ = ['__generator', .33651278330018597, 'elUseragentFwcim'];
                            var _lL1ILLlL = 0.33651278330018597,
                                _OOOQ00oo = elUseragentFwcim;
                            var e, o, r, i, n, s, a, _;
                            return k.__generator(this, function(c) {
                                var _LlL = ['computeToken', 'getTime', 'difficulty', 1e3, 'iv', 'getSessionId', 'number', 'label', 'max', 'min', 'getProofOfWorkScript', 0, 'getDifficulty', 'sent', 4, 'setItem', 'parse', 1, 'getItem', 2, 'POW_ATTEMPT_TIME_KEY', 'storage', 'stringify', 'MIN_PROOF_OF_WORK_DIFFICULTY', '__assign', 'POW_ATTEMPT_TTL_SECONDS', 'POW_ATTEMPT_DIFFICULTY_KEY', 'POW_ATTEMPT_LS_KEY', 'token'];

                                switch (c.label) {
                                    case 0:
                                        return [4, this.getProofOfWorkScript()];
                                    case 1:
                                        if (o = c.sent()) {
                                            if (r = new Date().getTime(), i = this.getDifficulty(), this.storage) try {
                                                (n = this.storage.getItem(t.POW_ATTEMPT_LS_KEY)) && (s = JSON.parse(n), a = s[t.POW_ATTEMPT_DIFFICULTY_KEY], _ = s[t.POW_ATTEMPT_TIME_KEY], number == typeof a && number == typeof _ && r - _ < 1000 * t.POW_ATTEMPT_TTL_SECONDS && (i = Math.max(t.MIN_PROOF_OF_WORK_DIFFICULTY, Math.min(i, a - 1)))), this.storage.setItem(t.POW_ATTEMPT_LS_KEY, JSON.stringify(((e = {})[t.POW_ATTEMPT_DIFFICULTY_KEY] = i, e[t.POW_ATTEMPT_TIME_KEY] = r, e)))
                                            } catch (u) {}
                                            this.token = k.__assign({}, this.token, {
                                                start: r,
                                                difficulty: i,
                                                iv: this.getSessionId()
                                            }), this.computeToken(o, this.token.iv, this.token.difficulty)
                                        }
                                        return 2
                                }
                            })
                        })
                    }, t.prototype.computeToken = function(t, e, o) {
                        var _iLLL = ['onmessage', 'worker', 'Worker', 'postMessage'];
                        var r = this;
                        this.worker = new window.Worker(t), this.worker.postMessage({
                            difficulty: o,
                            iv: e
                        }), this.worker.onmessage = function(t) {
                            var _oQoo = [44144, 'getTime', 'difficulty', 'token', 'toString', .9982871556958155, 'end', 'from', 'time', 'error', 'start', 'iv', 'data'];

                            try {
                                r.token.end = new Date().getTime(), r.token.time = r.token.end - r.token.start, r.token.token = Array.from(t.data.token), r.token.difficulty = t.data.difficulty, r.token.iv = t.data.iv
                            } catch (e) {
                                r.token.error = e.toString()
                            }
                        }
                    }, t.prototype.collect = function() {
                        var _00O0O = ['__awaiter', 0];
                        return k.__awaiter(this, void 0, void 0, function() {
                            var _l1L = ['__generator'];
                            return k.__generator(this, function(t) {
                                var _iII = [2, 'token'];
                                return [2, {
                                    token: this.token
                                }]
                            })
                        })
                    }, t.MIN_PROOF_OF_WORK_DIFFICULTY = 8, t.MAX_PROOF_OF_WORK_DIFFICULTY = 12, t.PROOF_OF_WORK_SCRIPT_NAME = fwcim - pow.js, t.FWCIM_SCRIPT_MATCHERS = . / ^ (https\: \/\/.+\/common\/login\/)fwcim/, t.SESSION_ID_COOKIE_NAME = session - id, t.POW_ATTEMPT_LS_KEY = fwcim - pow - state, t.POW_ATTEMPT_DIFFICULTY_KEY = d, t.POW_ATTEMPT_TIME_KEY = t, t.POW_ATTEMPT_TTL_SECONDS = 300, t.collectorName = pow, t
                    }();
                    exports['default'] = _t
                }), 
               
        // returns a 'formMethod' generator 
        (function(module, exports, __webpack_require__) {
            "use strict";
            exports.__esModule = 1;
            var k = __webpack_require__(0),
                nt = __webpack_require__(1),
                ut = function(t) {
                    var _00O = ['__extends', 'toLocaleLowerCase', .19570408635485892, 'form', 3038, 'formMethod', 'prototype', 'collectData', 'get', 'call', 'method'];

                    function e(e) {
                        var r = e.form,
                            o = t.call(this) || this;
                        return o.formMethod = (r.method || get).toLocaleLowerCase(), o
                    }
                    return k.__extends(e, t), e.prototype.collectData = function() {
                        var _iIL = ['__awaiter', 0];
                        return k.__awaiter(this, void 0, void 0, function() {
                            var _0Qo = ['amazonIdB', '__generator', 857, 'listBody'];

                            return k.__generator(this, function(t) {
                                var _Ll = [2, 'formMethod'];
                                return [2, {
                                    auth: {
                                        form: {
                                            method: this.formMethod
                                        }
                                    }
                                }]
                            })
                        })
                    }, e
                }(nt['default']);
            exports['default'] = ut
        }), 
        
        // Adds telemetry collectors to inputs (i.e. ap_username, ap_password)
        (function(module, exports, __webpack_require__) {
            "use strict";
            exports.__esModule = 1;
            var k = __webpack_require__(0),
                Le = __webpack_require__(18),
                c = __webpack_require__(3),
                Ce = __webpack_require__(6),
                Oe = function() {
                    var _s$2 = ['collect', 'PASSWORD_INPUT_ALIAS', 'input[type=\"email\"]', 'cycleBuffer', 'email', 'FORM_ID_ALIASES', 'input[type=\"password\"]', 'input[type=\"phone\"]', 'collectorName', 'telemetryCollectors', 'idB', 'input', 'input[type=\"text\"]', 'form', 'prototype', 'password', 'input[type=\"datetime\"]', 'EMAIL_INPUT_ALIAS', 'INPUT_SELECTORS', 'input[type=\"date\"]', 'bindInputTelemetry', 'input[type=\"numeric\"]', 38182];

                    function e(e) {
                        var _0O0o00QQ = idB,
                            _sSsszZz2 = 38182;
                        this.telemetryCollectors = [], this.form = e.form, this.bindInputTelemetry(e.cycleBuffer)
                    }

                    // adds event listeners for telemetry on all INPUT elements?
                    return e.prototype.bindInputTelemetry = function(t) {
                        var _0oO = ['join', 'telemetryCollectors', 'length', 'default', 0, 'form', 'INPUT_SELECTORS', 'name', ',', 'FORM_ID_ALIASES', 'string', 'push', 1, 'querySelectorAll', 'id'];
                        void 0 === t && (t = -1);
                        for (var r = new c.default(this.form).querySelectorAll(e.INPUT_SELECTORS.join(, )), l = 0; l < r.length; l++) {
                            var i = r[l],
                                o = i,
                                n = o.id || o.name;
                            if (n) {
                                string == typeof e.FORM_ID_ALIASES[n] && (n = e.FORM_ID_ALIASES[n]);
                                var u = new Le.default({
                                    form: this.form,
                                    element: i,
                                    cycleBuffer: t
                                });
                                this.telemetryCollectors.push(new Ce.default({
                                    telemetry: u,
                                    key: n
                                }))
                            }
                        }
                    }, e.prototype.collect = function() {
                        var _QQQ0 = ['__awaiter', 0];
                        return k.__awaiter(this, void 0, void 0, function() {
                            var _$2sS = ['__generator'];
                            var e, t, r, l;
                            return k.__generator(this, function(i) {
                                var _S2S = ['__assign', 'collect', 'apply', 'length', 3, 2, 'concat', 0, 'sent', 'telemetryCollectors', 'label', 4, 1];
                                switch (i.label) {
                                    case 0:
                                        e = {}, t = 0, i.label = 1;
                                    case 1:
                                        return t < this.telemetryCollectors.length ? (r = this.telemetryCollectors[t], l = [{}, e], [4, r.collect()]) : [3, 4];
                                    case 2:
                                        e = k.__assign.apply(void 0, l.concat([i.sent()])), i.label = 3;
                                    case 3:
                                        return t++, [3, 1];
                                    case 4:
                                        return [2, {
                                            form: e
                                        }]
                                }
                            })
                        })
                    }, e.INPUT_SELECTORS = [input[type = "text"], input[type = "password"], input[type = "email"], input[type = "phone"], input[type = "date"], input[type = "datetime"], input[type = "numeric"]], e.EMAIL_INPUT_ALIAS = email, e.PASSWORD_INPUT_ALIAS = password, e.FORM_ID_ALIASES = {
                        ap_email: e.EMAIL_INPUT_ALIAS,
                        ap_password: e.PASSWORD_INPUT_ALIAS
                    }, e.collectorName = input, e
                }();
            exports['default'] = Oe
        }), 
        
        // Screen collector
        (function(module, exports, __webpack_require__) {
            "use strict";
            exports.__esModule = 1;
            var k = __webpack_require__(0),
                nt = __webpack_require__(1),
                $e = function(e) {
                    var _11li = ['collectorName', 'collectData', '__extends', 'elNode', 'prototype', 'screen', 36625, null, 'apply'];

                    function n() {
                        return null !== e && e.apply(this, arguments) || this
                    }
                    return k.__extends(n, e), n.prototype.collectData = function() {
                        var _sSS = ['__awaiter', 0, 'documentExecute', 'collectorHash'];
                        return k.__awaiter(this, void 0, void 0, function() {
                            var _Zz2 = ['__generator'];
                            var e, n;
                            return k.__generator(this, function(t) {
                                var _OOoO = ['logicalXDPI', 'deviceXDPI', '-', 2, '*', 'width', 1, 'availHeight', 'colorDepth', 0, 'fontSmoothingEnabled', 'height'];
                                return e = screen, n = screen.width + - +screen.height + - +screen.availHeight + - +screen.colorDepth, n += - +(e.deviceXDPI !== undefined ? e.deviceXDPI : * ), n += - +(e.logicalXDPI !== undefined ? e.logicalXDPI : * ), [2, {
                                    screenInfo: n += - +(e.fontSmoothingEnabled !== undefined ? e.fontSmoothingEnabled ? 1 : 0 : * )
                                }]
                            })
                        })
                    }, n.collectorName = screen, n
                }(nt['default']);
            exports['default'] = $e
        }), 
        
        // [2, {flashVesion: e, plugins: n}] return collector
        (function(module, exports, __webpack_require__) {
            "use strict";
            exports.__esModule = 1;
            var k = __webpack_require__(0),
                nt = __webpack_require__(1),
                Ze = function(e) {
                    var _Sss$ = ['prototype', 'collectData', null, 'navigator', '__extends', 'apply', 'collectorName'];

                    function n() {
                        return null !== e && e.apply(this, arguments) || this
                    }
                    return k.__extends(n, e), n.prototype.collectData = function() {
                        var _SZ2 = ['__awaiter', 0];
                        return k.__awaiter(this, void 0, void 0, function() {
                            var _0oOo = ['__generator'];
                            var e, n, t, r, i, o;
                            return k.__generator(this, function(a) {
                                var _0O0o = ['replace', 'navigator', '.', /Shockwave Flash/, ' ', 'version', /[^0-9]/g, 'match', 1, 'length', /([0-9.]+)\s+r([0-9.]+)/, 'item', 'name', 'description', 2, 'plugins', 'push', null, 0];
                                for (e = null, n = [], t = 0; t < window.navigator.plugins.length; t++) r = window.navigator.plugins.item(t), i = r.name + +r.description.replace(/[^0-9]/g, ''), n.push({
                                    name: r.name,
                                    version: r.version,
                                    str: i
                                }), r.name.match(/Shockwave Flash/) && (r.version ? e = r.version : (o = r.description.match(/([0-9.]+)\s+r([0-9.]+)/), e = o && o .1 + . + o .2));
                                return [2, {
                                    flashVersion: e,
                                    plugins: n
                                }]
                            })
                        })
                    }, n.collectorName = navigator, n
                }(nt['default']);
            exports['default'] = Ze
        }), 
        
        // Plugin collector again. Or validator
        (function(module, exports, __webpack_require__) {
            "use strict";
            exports.__esModule = 1;
            var k = __webpack_require__(0),
                Ye = function() {
                    var _1IL1 = ['Function dAXP(n, v)\non error resume next\nset o = CreateObject(v)\nIf IsObject(o) Then\nSelect case n\ncase "ShockwaveDirector"\nf = o.ShockwaveVersion("")\ncase "ShockwaveFlash"\nf = o.FlashVersion()\ncase "RealPlayer"\nf = o.GetVersionInfo\ncase Else\nf = ""\nend Select\ndAXP = f\nEnd If\nEnd Function', 'VB_SCRIPT', 'setupVBScript', 'ax-plugin', 'prototype', 'container', 'checkActiveXPlugin', 'collect', 'collectorName'];

                    function e(e) {
                        var t = e.container;
                        this.container = t, this.setupVBScript()
                    }
                    return e.prototype.setupVBScript = function() {
                        var _Szs = ['script', 'text', 'The container was not found.', 'createElement', 'text/vbscript', 'container', 'appendChild', 'type', 'VB_SCRIPT'];
                        if (!this.container) throw new Error(The container was not found.);
                        var t = document.createElement(script);
                        t.type = 'text / vbscript', t.text = e.VB_SCRIPT, this.container.appendChild(t)
                    }, e.prototype.checkActiveXPlugin = function(e, t) {
                        var _o000O = [124, 0, null, 47762, 1, .618872369580385, ' : '];
                        var n = 1;
                        try {
                            dAXP && (n = 1)
                        } catch (i) {
                            var _OOQOO0o0 = 47762,
                                _LILILlLL = 124,
                                _OOQo00oO = 0.618872369580385;
                            n = 0
                        }
                        if (n) {
                            var r = dAXP(e, t);
                            if (r) return {
                                name: e,
                                version: r,
                                str: e +: +r
                            }
                        }
                        return null
                    }, e.prototype.collect = function() {
                        var _0oO0 = ['__awaiter', 0];
                        return k.__awaiter(this, void 0, void 0, function() {
                            var _zz2 = ['__generator'];
                            var e, t, n, r;
                            return k.__generator(this, function(i) {
                                var _o0OOo = [/Windows NT 6\.0/, 'RealPlayer.RealPlayer(tm) ActiveX Control (32-bit)', '.', null, 'listUseragent', 'fwcimObfuscateFwcim', 'RealVideo.RealVideo(tm) ActiveX Control (32-bit)', 16, 'userAgent', 'push', 'version', 'ShockwaveFlash', 'RealPlayer', 'checkActiveXPlugin', 65535, 'ShockwaveFlash.ShockwaveFlash', 'match', 'ShockwaveDirector', 2, 'SWCtl.SWCtl'];
                                var _ILiLllLl = fwcimObfuscateFwcim,
                                    _o0O0Q0OO = listUseragent;
                                return e = navigator.userAgent.match(/Windows NT 6\.0/), (t = []).push(this.checkActiveXPlugin(ShockwaveDirector, SWCtl.SWCtl)), n = this.checkActiveXPlugin(ShockwaveFlash, ShockwaveFlash.ShockwaveFlash), r = null, n && (r = (n.version >> 16) + . + (65535 & n.version), t.push(n)), e || (t.push(this.checkActiveXPlugin(RealPlayer, RealPlayer.RealPlayer(tm) ActiveX Control(32 - bit))), t.push(this.checkActiveXPlugin(RealPlayer, RealVideo.RealVideo(tm) ActiveX Control(32 - bit)))), [2, {
                                    plugins: t,
                                    flashVersion: r
                                }]
                            })
                        })
                    }, e.VB_SCRIPT = Function dAXP(n, v)
                    on error resume next
                    set o = CreateObject(v)
                    If IsObject(o) Then
                    Select
                    case n
                    case "ShockwaveDirector"
                    f = o.ShockwaveVersion("")
                    case "ShockwaveFlash"
                    f = o.FlashVersion()
                    case "RealPlayer"
                    f = o.GetVersionInfo
                    case Else
                    f = ""
                    end Select
                    dAXP = f
                    End If
                    End Function, e.collectorName = ax - plugin, e
                }();
            exports['default'] = Ye
        }), 
        
        // idk
        // has 'this.prepareBrowserCapabilitesElement'
        // and lots of shit about 'components'
        (function(module, exports, __webpack_require__) {
            "use strict";
            exports.__esModule = 1;
            var k = __webpack_require__(0),
                CC = function() {
                    var _o0QO = ['{DE4AF3B0-F4D4-11D3-B41A-0050DA2E6C21}', '{4F216970-C90C-11D1-B5C7-0000F8051515}', '{44BBA840-CC51-11CF-AAFA-00AA00B6015C}', 'as-plugin', '{22D6F312-B0F6-11D0-94AB-0080C74C7E95}', '{08B0E5C0-4FCB-11CF-AAA5-00401C608500}', 'prototype', '{D27CDB6E-AE6D-11CF-96B8-444553540000}', 'blob', 'executeDataA', '{08B0E5C0-4FCB-11CF-AAA5-00401C608555}', '{8EFA4753-7169-4CC3-A28B-0A1643B8A39B}', '{E5D12C4E-7B4F-11D3-B5C9-0050045C3C96}', '{2A202491-F00D-11CF-87CC-0020AFEECF20}', '{44BBA842-CC51-11CF-AAFA-00AA00B6015B}', '{89B4C1CD-B018-4511-B0A1-5476DBF70820}', '{9381D8F2-0288-11D0-9501-00AA00B911A5}', '{CFCDAA03-8BE4-11CF-B84B-0020AFBBCCFA}', '{6FAB99D0-BAB8-11D1-994A-00C04F98BBC9}', 'container', '{5A8D6EE0-3E18-11D0-821E-444553540000}', '{89820200-ECBD-11CF-8B85-00AA005B4340}', 'prepareBrowserCapabilitiesElement', 'capsEl', '{233C1507-6A77-46A4-9443-F871F945D258}', '{44BBA848-CC51-11CF-AAFA-00AA00B6015C}', '{CC2A9BA0-3BDD-11D0-821E-444553540000}', 'collectorName', 'collect', '{3AF36230-A269-11D1-B5BF-0000F8051515}', '{283807B5-2C60-11D0-A31D-00AA00B92C03}', '{89820200-ECBD-11CF-8B85-00AA005B4383}', '{166B1BCA-3F9C-11CF-8075-444553540000}', 'COMPONENTS', '{7790769C-0471-11D2-AF11-00C04FA35D02}', '{44BBA855-CC51-11CF-AAFA-00AA00B6015F}'];

                    function C(C) {
                        var A = C.container;
                        var _Z2sZz2sS = blob,
                            _11ilIilL = executeDataA;
                        this.container = A, this.capsEl = this.prepareBrowserCapabilitiesElement()
                    }
                    return C.prototype.prepareBrowserCapabilitiesElement = function() {
                        var _ooQ0O = ['behavior', 'style', 'fwcim-caps', 'createElement', 'The container does not exist.', 'url(\'#default#clientCaps\')', 'span', 'container', 'id', 'appendChild'];
                        if (this.container) {
                            var C = document.createElement(span);
                            return C.id = fwcim - caps, C.style.behavior = url('#default#clientCaps'), this.container.appendChild(C), C
                        }
                        throw new Error(The container does not exist.)
                    }, C.prototype.collect = function() {
                        var _2Zzs = ['__awaiter', 0];
                        return k.__awaiter(this, void 0, void 0, function() {
                            var _z$Z = ['bExecute', '__generator'];
                            var _OOOO0QOo = bExecute;
                            var A;
                            return k.__generator(this, function(e) {
                                var _iil1 = ['reduce', 'COMPONENTS', 2, 'capsEl', 'keys'];
                                return A = this.capsEl, [2, {
                                    plugins: Object.keys(C.COMPONENTS).reduce(function(e, B) {
                                        var _Llil = [.5422168741217597, .05589587345726832, 'push', 'isComponentInstalled', 'ComponentID', '|', ' ', 'COMPONENTS', 'getComponentVersion'];
                                        var t = C.COMPONENTS[B];
                                        if (A.isComponentInstalled && A.isComponentInstalled(t, ComponentID)) {
                                            var n = A.getComponentVersion(t, ComponentID);
                                            e.push({
                                                name: B,
                                                version: n,
                                                str: | +B + +n
                                            })
                                        }
                                        return e
                                    }, [])
                                }]
                            })
                        })
                    }, C.collectorName = 'as - plugin', C.COMPONENTS = {
                        AB: {
                            7790769 C - 0471 - 11 D2 - AF11 - 00 C04FA35D02
                        },
                        WDUN: {
                            89820200 - ECBD - 11 CF - 8 B85 - 00 AA005B4340
                        },
                        DA: {
                            283807 B5 - 2 C60 - 11 D0 - A31D - 00 AA00B92C03
                        },
                        DAJC: {
                            4 F216970 - C90C - 11 D1 - B5C7 - 0000 F8051515
                        },
                        DS: {
                            44 BBA848 - CC51 - 11 CF - AAFA - 00 AA00B6015C
                        },
                        DHDB: {
                            9381 D8F2 - 0288 - 11 D0 - 9501 - 00 AA00B911A5
                        },
                        DHDBFJ: {
                            4 F216970 - C90C - 11 D1 - B5C7 - 0000 F8051515
                        },
                        ICW: {
                            5 A8D6EE0 - 3E18 - 11 D0 - 821E-444553540000
                        },
                        IE: {
                            89820200 - ECBD - 11 CF - 8 B85 - 00 AA005B4383
                        },
                        IECFJ: {
                            08 B0E5C0 - 4 FCB - 11 CF - AAA5 - 00401 C608555
                        },
                        WMP: {
                            22 D6F312 - B0F6 - 11 D0 - 94 AB - 0080 C74C7E95
                        },
                        NN: {
                            44 BBA842 - CC51 - 11 CF - AAFA - 00 AA00B6015B
                        },
                        OBP: {
                            3 AF36230 - A269 - 11 D1 - B5BF - 0000 F8051515
                        },
                        OE: {
                            44 BBA840 - CC51 - 11 CF - AAFA - 00 AA00B6015C
                        },
                        TS: {
                            CC2A9BA0 - 3 BDD - 11 D0 - 821E-444553540000
                        },
                        MVM: {
                            08 B0E5C0 - 4 FCB - 11 CF - AAA5 - 00401 C608500
                        },
                        DDE: {
                            44 BBA855 - CC51 - 11 CF - AAFA - 00 AA00B6015F
                        },
                        DOTNET: {
                            6 FAB99D0 - BAB8 - 11 D1 - 994 A - 00 C04F98BBC9
                        },
                        YHOO: {
                            E5D12C4E - 7 B4F - 11 D3 - B5C9 - 0050045 C3C96
                        },
                        SWDNEW: {
                            166 B1BCA - 3 F9C - 11 CF - 8075 - 444553540000
                        },
                        DOTNETFM: {
                            89 B4C1CD - B018 - 4511 - B0A1 - 5476 DBF70820
                        },
                        MDFH: {
                            8 EFA4753 - 7169 - 4 CC3 - A28B - 0 A1643B8A39B
                        },
                        FLH: {
                            D27CDB6E - AE6D - 11 CF - 96 B8 - 444553540000
                        },
                        SW: {
                            2 A202491 - F00D - 11 CF - 87 CC - 0020 AFEECF20
                        },
                        SWD: {
                            233 C1507 - 6 A77 - 46 A4 - 9443 - F871F945D258
                        },
                        RP: {
                            CFCDAA03 - 8 BE4 - 11 CF - B84B - 0020 AFBBCCFA
                        },
                        QT: {
                            DE4AF3B0 - F4D4 - 11 D3 - B41A - 0050 DA2E6C21
                        }
                    }, C
                }();
            exports['default'] = CC
        }), 
        
        // Checks if using windows and if using internet explorer lol
        (function(module, exports, __webpack_require__) {
            "use strict";
            exports.__esModule = 1;
            var nn = function() {
                var _00Q = ['ie', 'windows'];

                function n() {
                }
                return n.ie = function() {
                    var _llL = ['navigator', 'dataJsonAmazon', /MSIE [0-9.]+/i, 11892, 'userAgent', 'match'];

                    return !!window.navigator.userAgent.match(/MSIE [0-9.]+/i)
                }, n.windows = function() {
                    var _liLL = [/Windows/i, 'match', 'navigator', 'userAgent'];
                    return !!window.navigator.userAgent.match(/Windows/i)
                }, n
            }();
            exports['default'] = nn
        }), 
        
        // Adds listeners for captcha (shouldnt be a problem for us) for focus and click, etc
        (function(module, exports, __webpack_require__) {
            "use strict";
            exports.__esModule = 1;
            var k = __webpack_require__(0),
                ce = __webpack_require__(2),
                Le = __webpack_require__(18),
                Xe = function(e) {
                    var _$SS = ['refreshes', 'prototype', 0, 'call', 'keyPressIntervals', '__extends', 11651, 'get', 'bindCaptcha', 'captchaRefreshLinks'];
                    var _SZ2S22zZ = 11651;

                    function t(t) {
                        var r = e.call(this, t) || this;
                        return r.refreshes = 0, r.captchaRefreshLinks = t.captchaRefreshLinks, r.bindCaptcha(), r
                    }
                    return k.__extends(t, e), t.prototype.bindCaptcha = function() {
                        var _QOOQ = ['captchaRefreshLinks', 'element', 32538, 'addEventListener', 'forEach', 'documentObfuscateDom', 'default', 'focus'];

                        var e = this;
                        new ce.default(this.element).addEventListener(focus, function(t) {
                            var _OoO = ['getTime', 39166, 'firstFocusTime'];
                            var _iiIl1lLi = 39166;
                            e.firstFocusTime || (e.firstFocusTime = new Date().getTime())
                        }), this.captchaRefreshLinks.forEach(function(t) {
                            var _OoOQ = ['addEventListener', 'click', 'default'];
                            return new ce.default(t).addEventListener(click, function() {
                                var _2SZ = ['refreshes'];
                                return e.refreshes++
                            })
                        })
                    }, t.prototype.keyPressIntervals = function() {
                        var _S2z = [1, 'keyCycles', 'length', 'firstFocusTime', 0, 'get', 'filter', 'push', 'startEventTime'];

                        for (var e = this, t = this.keyCycles.get().filter(function(t) {
                                var _IIi = ['startEventTime', 'firstFocusTime'];
                                return t.startEventTime > e.firstFocusTime
                            }), r = [], s = 0; s < t.length; s++) 0 === s ? r.push(t[s].startEventTime - this.firstFocusTime) : r.push(t[s].startEventTime - t[s - 1].startEventTime);
                        return r
                    }, t.prototype.get = function() {
                        var _Qoo = ['get', 'call', 'keyPressIntervals', 'refreshes', '__assign', 'prototype'];
                        var _0ooOQQOo = function(_sZZzsssS, _Q0Oo0OQQ) {
                            var _SzZ = [30656, .9109897306832959, 'bodyBodyStatement', 46008];
                            var _Sz2Z$Z2$ = bodyBodyStatement,
                                _zZZsZ$Z2 = 30656,
                                _LL1ILlLI = 46008;
                            return 0.9109897306832959
                        };
                        return k.__assign({}, e.prototype.get.call(this), {
                            refreshes: this.refreshes,
                            keyPressIntervals: this.keyPressIntervals()
                        })
                    }, t
                }(Le['default']);
            exports['default'] = Xe
        }), 
        
        // More captcha telemetry
        (function(module, exports, __webpack_require__) {
            "use strict";
            exports.__esModule = 1;
            var k = __webpack_require__(0),
                ke = __webpack_require__(60),
                Ce = __webpack_require__(6),
                c = __webpack_require__(3),
                Ke = function() {
                    var _o0O00 = ['prototype', 0, 'default', 23856, 'KEY', 'captchaRefreshLinksSelector', 'collectorName', 'telemetryCollector', 'captchaFieldsSelector', 'querySelectorAll', 'form', 'captchainput', 'captcha', 'push', null, 'length', 'querySelector', 'collect'];
                    var _illlIi1l = 23856;

                    function e(t) {
                        for (var r = new c.default(t.form), l = [], o = r.querySelectorAll(t.captchaRefreshLinksSelector), u = 0; u < o.length; u++) l.push(o[u]);
                
                        var n = r.querySelector(t.captchaFieldsSelector);
                        null != n && (this.telemetryCollector = new Ce.default({
                            key: e.KEY,
                            telemetry: new ke.default({
                                form: t.form,
                                captchaRefreshLinks: l,
                                element: n
                            })
                        }))
                    }
                    return e.prototype.collect = function() {
                        var _Sz$z = ['__awaiter', 0];
                        return k.__awaiter(this, void 0, void 0, function() {
                            var _2ZS = ['domDom', '__generator', 'nodeA'];
                            var _2zss2Z2z = nodeA,
                                _Qo0QO000 = domDom;
                            return k.__generator(this, function(e) {
                                var _IlI = [2, 'collect', 'telemetryCollector', null];
                                return null != this.telemetryCollector ? [2, this.telemetryCollector.collect()] : [2, null]
                            })
                        })
                    }, e.KEY = captcha, e.collectorName = captchainput, e
                }();
            exports['default'] = Ke
        }), 
        
        // idk 
        (function(module, exports, __webpack_require__) {
            "use strict";
            exports.__esModule = 1;
            var k = __webpack_require__(0),
                ae = __webpack_require__(19),
                nt = __webpack_require__(1),
                Qe = function(e) {
                    var _11l = ['timeoutMs', .9779950943228277, 'scheduleCaching', .20928173844533116, .530390357799517, '__extends', 'call', 'prototype', 13469];

                    function t(t) {
                        var i = e.call(this) || this;
                        return i.timeoutMs = t, i.scheduleCaching(), i
                    }
                    return k.__extends(t, e), t.prototype.scheduleCaching = function() {
                        var _Ili1 = ['timeoutMs', 'default', 'requestIdleCallback', 'function'];
                        var e = this,
                            t = window;

                        function == typeof t.requestIdleCallback ? t.requestIdleCallback(function() {
                            var _lLI = ['collect', 3556, .23099501695856128];
                            e.collect()
                        }, {
                            timeout: this.timeoutMs
                        }) : new ae.default(function() {
                            var _iil = ['collect'];
                            e.collect()
                        }, this.timeoutMs)
                    }, t
                }(nt['default']);
            exports['default'] = Qe
        }), 
        
        // IMPORTANT
        // Draws rectangles, shapes, etc using canvas and records data
        (function(module, exports, __webpack_require__) {
            "use strict";
            exports.__esModule = 1;
            var k = __webpack_require__(0),
                f = __webpack_require__(5),
                c = __webpack_require__(3),
                lt = __webpack_require__(62),
                ct = function(t) {
                    var _ILL = [60, 'canvas', 'default', 150, 'createHistogram', 'CANVAS_WIDTH', 'formSelectorQuerier', 'collectorName', 5e3, 'form', 'CRC_CALCULATOR', 'CANVAS_COLLECTOR_PROACTIVE_CACHE_TIMEOUT', '__extends', 'collectData', 'createElement', 'prototype', 'CANVAS_HEIGHT', 'call'];

                    function e(a) {
                        var l = t.call(this, e.CANVAS_COLLECTOR_PROACTIVE_CACHE_TIMEOUT) || this;
                        return l.form = a.form, l.canvas = document.createElement(canvas), l.formSelectorQuerier = new c.default(l.form), l
                    }
                    return k.__extends(e, t), e.prototype.createHistogram = function(t) {
                        var _$ZZ = [256, 'length', 0];
                        for (var e = [], a = 0; a < 256; e[a++] = 0);
                        for (var l = 0; l < t.length; l++) e[t[l]]++;
                        return e
                    }, e.prototype.collectData = function() {
                        var _szS = ['__awaiter', 0];
                        return k.__awaiter(this, void 0, void 0, function() {
                            var _ZZz = ['__generator'];
                            var t, a, l, i, r, o, n, c;
                            return k.__generator(this, function(s) {
                                var _OoQo = [40, 7, 60, 70, 5, 'PI', 'no', 'function', 'toString', 'getImageData', 50, 'textBaseline', 1e300, 'createLinearGradient', 'multiply', 'height', 86, '~', 121, 10, 'font', '11pt Arial', 'white', 'canvas', 'rgb(255,255,0)', 35, 1, 45, 'fillText', 'yes', 'length', '#f60', 'blue', 'fillStyle', '#808080', 'calculate', 26, 'sin', 'rgba(102, 204, 0, 0.2)', 2, 'quadraticCurveTo', 6, 'toDataURL', 'join', 12, 101, 'rgb(0,255,255)', 'rgb(255,0,255)', 'strokeText', 'addColorStop', 76, 'beginPath', 'CANVAS_HEIGHT', 25, 'input[type=email]', 'globalCompositeOperation', 'cos', 'red', 'value', 'display', '8pt Arial', 0, 'createHistogram', 'tan', 'width', 'Cwm fjordbank glyphs vext quiz,', 'fill', 'moveTo', '2d', '10pt dfgstg', 4, 'querySelectorAll', 110, null, 'CANVAS_WIDTH', 'rect', 'difference', 'arc', 'style', 56, .5, 'closePath', 'data', 'stroke', 'evenodd', 'push', 30, 96, 125, 'alphabetic', 20, 'Not Available', '#069', 'toUpperCase', 'canvas fp:', 'formSelectorQuerier', 'isPointInPath', 'form', 'inline', 78, 'CRC_CALCULATOR', 41, 95, 80, 15, 'getContext', 'fillRect', 62];
                       
                                return this.canvas && function == typeof this.canvas.getContext && this.canvas.getContext(2 d) ? (t = [], this.canvas.width = e.CANVAS_WIDTH, this.canvas.height = e.CANVAS_HEIGHT, this.canvas.style.display = inline, (a = this.canvas.getContext(2 d)).rect(0, 0, 10, 10), a.rect(2, 2, 6, 6), t.push(0 == a.isPointInPath(5, 5, evenodd) ? yes : no), a.textBaseline = alphabetic, a.fillStyle = #f60, a.fillRect(125, 1, 62, 20), a.fillStyle = #069,a.font= 8 pt Arial, a.fillText(Cwm fjordbank glyphs vext quiz, , 2, 15), a.fillStyle = rgba(102, 204, 0, 0.2), a.font = 11 pt Arial, a.fillText(Cwm fjordbank glyphs vext quiz, , 4, 45), a.globalCompositeOperation = multiply, a.fillStyle = rgb(255, 0, 255), a.beginPath(), a.arc(20, 20, 20, 0, 2 * Math.PI, 1), a.closePath(), a.fill(), a.fillStyle = rgb(0, 255, 255), a.beginPath(), a.arc(50, 20, 20, 0, 2 * Math.PI, 1), a.closePath(), a.fill(), a.fillStyle = rgb(255, 255, 0), a.beginPath(), a.arc(35, 40, 20, 0, 2 * Math.PI, 1), a.closePath(), a.fill(), a.fillStyle = rgb(255, 0, 255), a.arc(20, 25, 10, 0, 2 * Math.PI, 1), a.arc(20, 25, 20, 0, 2 * Math.PI, 1), a.fill(evenodd), (l = a.createLinearGradient(40, 50, 60, 78)).addColorStop(0, blue), l.addColorStop(0.5, red), l.addColorStop(1, white), a.fillStyle = l, a.beginPath(), a.arc(70, 50, 10, 0, 2 * Math.PI, 1), a.closePath(), a.fill(), a.font = 10 pt dfgstg, a.strokeText(Math.tan(-1e+300).toString(), 4, 30), a.fillText(Math.cos(-1e+300).toString(), 4, 40), a.fillText(Math.sin(-1e+300).toString(), 4, 50), a.beginPath(), a.moveTo(25, 0), a.quadraticCurveTo(1, 1, 1, 5), a.quadraticCurveTo(1, 76, 26, 10), a.quadraticCurveTo(26, 96, 6, 12), a.quadraticCurveTo(60, 96, 41, 10), a.quadraticCurveTo(121, 86, 101, 7), a.quadraticCurveTo(121, 1, 56, 1), a.stroke(), a.globalCompositeOperation = difference, a.fillStyle = rgb(255, 0, 255), a.beginPath(), a.arc(80, 20, 20, 0, 2 * Math.PI, 1), a.closePath(), a.fill(), a.fillStyle = rgb(0, 255, 255), a.beginPath(), a.arc(110, 20, 20, 0, 2 * Math.PI, 1), a.closePath(), a.fill(), a.fillStyle = rgb(255, 255, 0), a.beginPath(), a.arc(95, 40, 20, 0, 2 * Math.PI, 1), a.closePath(), a.fill(), a.fillStyle = rgb(255, 0, 255), t.push(canvas fp: +this.canvas.toDataURL()), i = e.CRC_CALCULATOR.calculate(t.join(~)), r = null, this.form && (o = this.formSelectorQuerier.querySelectorAll(input[type = email])).length > 0 && (n = o .0, c = (n.value || Not Available).toUpperCase(), a.fillStyle = #808080,a.font= 8 pt Arial, a.fillText(c, 2, 30), r = e.CRC_CALCULATOR.calculate(this.canvas.toDataURL())), [2, {
                                    canvas: {
                                        hash: i,
                                        emailHash: r,
                                        histogramBins: this.createHistogram(a.getImageData(0, 0, e.CANVAS_WIDTH, e.CANVAS_HEIGHT).data)
                                    }
                                }]) : [2, {}]
                            })
                        })
                    }, e.CANVAS_COLLECTOR_PROACTIVE_CACHE_TIMEOUT = 5000, e.CRC_CALCULATOR = new f.default(), e.CANVAS_WIDTH = 150, e.CANVAS_HEIGHT = 60, e.collectorName = canvas, e
                }(lt['default']);
            exports['default'] = ct
        }), 
        
        // obfuscate return URL
        (function(module, exports, __webpack_require__) {
            "use strict";
            exports.__esModule = 1;
            var k = __webpack_require__(0),
                Ot = __webpack_require__(21),
                aa = __webpack_require__(20),
                Ut = 'pageId',
                Qt = 'openid.assoc_handle',
                Vt = 'openid.return_to',
                Wt = {
                    amzn_whidbey_desktop_us: 'usflex'
                },
                Xt = {
                    amzn_whidbey_desktop_us: 'usflex'
                },
                Yt = function(e) {
                    var _Ll1 = ['prototype', 'default', 17515, 'shouldObfuscate', 'obfuscate', 'apply', 'obfuscateReturnUrl', 'returnUrlObfsucator', null, '__extends'];

                    function t() {
                        var t = null !== e && e.apply(this, arguments) || this;
                        return t.returnUrlObfsucator = new Ot.default(), t
                    }
                    return k.__extends(t, e), t.prototype.obfuscate = function(e) {
                        var _ZsSZ = ['getParameter', .6287156951514703, 'shouldObfuscate', 'toString', 'hasParameter', 'obfuscateReturnUrl', 'setParameter', 'buildURL'];
                        var t = this.buildURL(e);
                        if (!t || !this.shouldObfuscate(t)) return e;
                        var r = t.getParameter(Qt);
                        r in Wt && t.setParameter(Qt, Wt[r]);
                        var _0Q0OQooQ = 0.6287156951514703;
                        var a = t.getParameter(Ut);
                        if (a in Xt && t.setParameter(Ut, Xt[a]), t.hasParameter(Vt)) {
                            var u = t.getParameter(Vt);
                            t.setParameter(Vt, this.obfuscateReturnUrl(u))
                        }
                        return t.toString()
                    }, t.prototype.obfuscateReturnUrl = function(e) {
                        var _0OQQ = ['returnUrlObfsucator', 'obfuscate'];
                        return this.returnUrlObfsucator.obfuscate(e)
                    }, t.prototype.shouldObfuscate = function(e) {
                        var _z$s = ['/ap/', '/a/', 0, 'getPathname', 'indexOf'];
                        return 0 === e.getPathname().indexOf(/ap/) || 0 === e.getPathname().indexOf(/a/)
                    }, t
                }(aa['default']);
            exports['default'] = Yt
        }), 
        
        // Gets raw hostname and pathname
        (function(module, exports, __webpack_require__) {
            "use strict";
            exports.__esModule = 1;
            var tr = function() {
                var _s2Z = ['/', 'getParameter', null, 'portWithColon', /^(\[[0-9a-z:]+\]|[^:]+)?(:[0-9]*)?/i, 2, 'Invalid URL', 'exec', 'split', '@', '&', 'getRawHostname', '=', 'length', 'userinfoWithAt', 'fragementWithHash', 'getPathname', 1, '?', 'setParameter', 'toString', 'authorityPrefix', 'schemaWithColon', 'substring', '#', 'prototype', 0, 'dom', 'parameters', /^([a-z][a-z0-9.+-]*:)?(\/+)?(.*)/i, 'buildQuery', 'push', 3, 'url', .39119051061279353, 'hasParameter', 'rawHostname', 'pathname', 'indexOf'];

                function t(t) {
                    this.url = t;
                    var e = t.indexOf(#);
                    this.fragementWithHash = e < 0 ? null : t.substring(e);
                    var r = e < 0 ? t : t.substring(0, e),
                        s = r.indexOf( ? ),
                        i = s < 0 ? r : r.substring(0, s),
                        n = s < 0 ? '' : r.substring(s + 1),
                        a = /^([a-z][a-z0-9.+-]*:)?(\/+)?(.*)/i.exec(i);
                    this.schemaWithColon = a .1, this.authorityPrefix = a .2;
                    var o = a .3;
                    if (!this.schemaWithColon || !o) throw new TypeError(Invalid URL);
                    var h = o.indexOf(@);
                    this.userinfoWithAt = h < 0 ? null : o.substring(0, h + 1);
                    var _$2sZSSzs = dom,
                        _oQOOOOQo = 0.39119051061279353;
                    var p = (o = o.substring(h + 1)).indexOf(/);this.pathname=p<0?null:o.substring(p);var u=p<0?o:o.substring(0,p),m=/ ^ (\[
                            [0 - 9 a - z: ] + \
                        ] | [ ^: ] + ) ? (: [0 - 9] * ) ? /i.exec(u);if(m.0!==u)throw new TypeError(Invalid URL);if(this.rawHostname=m.1,this.portWithColon=m.2,this.parameters=s<0?null:[],n.length>0)
                        for (var l = n.split( & ), f = 0; f < l.length; f++) {
                            var g = l[f],
                                y = g.indexOf( = ),
                                v = y < 0 ? decodeURIComponent(g) : decodeURIComponent(g.substring(0, y)),
                                c = y < 0 ? null : decodeURIComponent(g.substring(y + 1));
                           
                            this.parameters.push({
                                key: v,
                                value: c
                            })
                        }
                    }
                    return t.prototype.setParameter = function(t, e) {
                        var _Zz$z = [0, 'key', 'parameters', 'splice', 'value', 'length', 'push', 1];
                        this.parameters || (this.parameters = []), t = String(t), e = String(e);
                        for (var r = 0, s = 0; s < this.parameters.length; s++) {
                            var i = this.parameters[s];
                            i.key === t && (r ? this.parameters.splice(s--, 1) : (i.value = e, r = 1))
                        }
                        r || this.parameters.push({
                            key: t,
                            value: e
                        })
                    }, t.prototype.getParameter = function(t) {
                        var _iiL = ['elStatement', 'parameters', null, 36923, 0, 'length', 'key', 'value'];
                        if (this.parameters)
                            for (var e = 0; e < this.parameters.length; e++) {
                                var r = this.parameters[e];
                                if (r.key === t) return r.value || ''
                            }
                        return null
                    }, t.prototype.hasParameter = function(t) {
                        var _Szs$ = [1, 'parameters', 0, 'length', 'key'];
                        if (this.parameters)
                            for (var e = 0; e < this.parameters.length; e++)
                                if (this.parameters[e].key === t) return 1;
                        return 0
                    }, t.prototype.getRawHostname = function() {
                        var _0OQ0 = [.7824468379131628, .6343649864958794, 'rawHostname', 'statement'];
                        
                        return this.rawHostname
                    }, t.prototype.getPathname = function() {
                        var _Z2z = ['pathname', '/'];
                        return this.pathname || /},t.prototype.toString=function(){var _lLL=['pathname','rawHostname','portWithColon','userinfoWithAt','schemaWithColon','buildQuery','fragementWithHash','authorityPrefix'];var _SZ$22$Zz=function(_l11LlLiL,_1i11i11L,_22SzSsS$){var _OQo00=[.03728586134120282,'hashCaptchaFwcim',.9272918924748315,.4273746106632299,'fwcim',44506];var _z$2$S2z2=44506,_oOoooOoo=fwcim;var _QoO0oQoQ=hashCaptchaFwcim,_iiLLliLi=0.9272918924748315,_i1Ili111=0.03728586134120282;return 0.4273746106632299};return this.schemaWithColon+(this.authorityPrefix||'')+(this.userinfoWithAt||'')+(this.rawHostname||'')+(this.portWithColon||'')+(this.pathname||'')+this.buildQuery()+(this.fragementWithHash||'')},t.prototype.buildQuery=function(){var _iLl1i=['key','parameters','string','pop','join','&','?','value','push','length',0,'='];if(!this[_iLl1GET])return'';if(0===this[_iLl1GET].length)return ?;for(var t=.?,e=0;e<this[_iLl1GET].length;e++){var r=this[_iLl1GET][e];_iLl1HEAD==typeof r[_iLl1DELETE]&&_iLl1HEAD==typeof r.value?(t.push(encodeURIComponent(r[_iLl1DELETE])),t.push(=),t.push(encodeURIComponent(r.value))):_iLl1HEAD==typeof r[_iLl1DELETE]&&t.push(encodeURIComponent(r[_iLl1DELETE])),t.push(_iLl1PUT)}
                        return t[_iLl1OPTIONS](), t[_iLl1POST]('')
                    }, t
                }();
                exports['default'] = tr
            }), 
        
        // Some bundled obfuscation
        (function(module, exports, __webpack_require__) {
            "use strict";
            exports.__esModule = 1;
            var Ot = __webpack_require__(21),
                Rt = __webpack_require__(64),
                St = function() {
                    var _Q0QQ = [.2606751401845502, 10934, 'OBFUSCATORS', 'obfuscate', 'default', .01171037807436659, 7723, 20589];

                    function e() {
                    }
                    return e.obfuscate = function(e) {
                        var _zZZ = ['reduce', 'trim', 'OBFUSCATORS'];
                        return e && '' !== e.trim() ? this.OBFUSCATORS.reduce(function(e, t) {
                            var _sZ$Z = ['fwcimBlob', 'obfuscate'];
                            return t.obfuscate(e)
                        }, e) : e
                    }, e.OBFUSCATORS = [new Ot.default(), new Rt.default()], e
                }();
            exports['default'] = St
        }), 
        
        // idk this lowkey prolly impt tho
        (function(module, exports, __webpack_require__) {
            "use strict";
            exports.__esModule = 1;
            var _ = __webpack_require__(27),
                I = __webpack_require__(44),
                A = __webpack_require__(40),
                F = __webpack_require__(39);
            __webpack_require__(38);
            var P = function() {
                var _Il = ['signInForm', 'generateRandomIdentifier', 'profilers', 'profilePage', 'profile', 'signInLeftForm', 'prototype', 'forgotPasswordForm', 'throttler', 'LOCAL_STORAGE_TEST_KEY', 'aExecute', 'signInMainForm', 'fwcim-ls-test', 'AUTO_BIND_FORM_IDS', 'sign-in', 'newAccountForm', 'selectorQuerier', 'useMercury', 'FWCIM_ID_PROPERTY', 'signInRightForm', 'signin', 'report', 'data-fwcim-id', 'profileForm', 'changeAccountInformationForm', 'objectEncoder', 'useragentEncrypt', 'sign_in', 'ALPHABET', 'encryptor', 'stopProfileForm', 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'];
                var _OQOQO0o0 = useragentEncrypt,
                    _0QQOO0QO = aExecute;

                function e(e, r, t, o) {
                    this.selectorQuerier = e, this.objectEncoder = r, this.encryptor = t, this.throttler = o, this.profilers = {}
                }
                return e.prototype.profile = function(r) {
                    var _o0 = ['.fwcim-form', 'AUTO_BIND_FORM_IDS', 'join', 'form[method=\"POST\"][action^=\"/ap\"]', '#', '\"]', 'push', ', ', 3090, 'length', 'form[name=\"', 'profileForm', 0, 'hash'];
                    var _iiii1il1 = hash,
                        _OQOQ0QOo = 3090;
                    if (r) this.profileForm(form[ name = "+r+" ]);
                    else {
                        for (var t = ..fwcim - form, o = 0; o < e.AUTO_BIND_FORM_IDS.length; o++) {
                            var i = e.AUTO_BIND_FORM_IDS[o];
                            t.push(# + i, form[name = "+i+" ])
                        }
                        t.push(form[method = "POST"][action ^= "/ap"]), this.profileForm(t.join(, ))
                    }
                }, e.prototype.profileForm = function(r) {
                    var _II = ['setAttribute', 'default', 'selectorQuerier', 'FWCIM_ID_PROPERTY', 'profile', 'profilers', 'getAttribute', 'length', 0, 'encryptor', 'querySelectorAll', 'generateRandomIdentifier', 'objectEncoder'];
                    for (var t = this.selectorQuerier.querySelectorAll(r), o = 0; o < t.length; o++) {
                        var i = t[o],
                            n = i.getAttribute(e.FWCIM_ID_PROPERTY);
                        if (!n) {
                            n = this.generateRandomIdentifier(), i.setAttribute(e.FWCIM_ID_PROPERTY, n);
                            var f = new _.default(i, this.objectEncoder, this.encryptor);
                            this.profilers[n] = f, f.profile()
                        }
                    }
                }, e.prototype.stopProfileForm = function(r) {
                    var _i1l = ['length', 'getAttribute', 'profilers', 'querySelectorAll', 0, 'selectorQuerier', 'stop', 'FWCIM_ID_PROPERTY'];
                   
                    for (var t = this.selectorQuerier.querySelectorAll(r), o = 0; o < t.length; o++) {
                        var i = t[o].getAttribute(e.FWCIM_ID_PROPERTY);
                        
                        i && this.profilers[i] && this.profilers[i].stop()
                    }
                }, e.prototype.report = function(r, t) {
                    var _s$ = ['length', 'collect', 'trim', 'You must specify a callback function.', 'getAttribute', 'A form with that selector could not be found.', 'The form has not been profiled yet.', 'profilers', 'catch', 'then', 'function', 'string', 'querySelectorAll', 'selectorQuerier', 1, 'FWCIM_ID_PROPERTY', 0];
                    if (function != typeof t) throw new Error('You must specify a callback function.');
                    
                    var o = this.selectorQuerier.querySelectorAll(r);
                    if (o.length < 1) t(new Error(A form with that selector could not be found.));
                    else {
                        var i = o .0.getAttribute(e.FWCIM_ID_PROPERTY);
                        string == typeof i && '' !== i.trim() && this.profilers[i] !== undefined ? this.profilers[i].collect().then(function(e) {
                            var _OoQ = [null];
                            
                            return t(null, e)
                        }).catch(function(e) {
                            var _I1 = [];
                            return t(e)
                        }) : t(new Error(The form has not been profiled yet.))
                    }
                }, e.prototype.useMercury = function(e) {
                    var _Q0O = [];
                }, e.prototype.profilePage = function(r) {
                    var _1lI = ['LOCAL_STORAGE_TEST_KEY', 'removeItem', 0, 'throttler', .8929603955272183, 'sessionStorage', 'encryptor', 'default', 'ue', 'globalReportInit', null, 'collectorAmazonUseragent', 'objectEncoder', 'test', 'setItem', 'selectorQuerier', 'profile', 'globalProfiler', 'getTime', 'localStorage'];
                    
                    if (void 0 === r && (r = {}), this.globalProfiler === undefined) {
                        
                        r.globalReportInit = new Date().getTime();
                        var t = null;
                        try {
                            (t = window.sessionStorage || window.localStorage).setItem(e.LOCAL_STORAGE_TEST_KEY, test), t.removeItem(e.LOCAL_STORAGE_TEST_KEY)
                        } catch (i) {
                            var _11i1iI1l = function(_0o0QQoo0) {
                                var _SZ = ['bCollector', 2193, 'aDom'];
                                var _S2222SZ$ = 2193,
                                    _0OoOOQQQ = aDom;
                                return bCollector
                            };
                            t = null
                        }
                        var o = t ? new A.default(t) : new F.default();
                        this.globalProfiler = new I.default(this.selectorQuerier, this.throttler, this.objectEncoder, this.encryptor, o, window.ue, r), this.globalProfiler.profile()
                    }
                }, e.prototype.generateRandomIdentifier = function(r) {
                    var _IlL = [.8086347581114612, 'charAt', 'random', 46539, 'floor', 'aUseragentData', 0, 'ALPHABET', 'length', 8];
                    void 0 === r && (r = 8);
                    for (var t = '', o = 0; o < r; o++) t += e.ALPHABET.charAt(Math.floor(Math.random() * e.ALPHABET.length));
                    return t
                }, e.FWCIM_ID_PROPERTY = data - fwcim - id, e.LOCAL_STORAGE_TEST_KEY = fwcim - ls - test, e.ALPHABET = ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789, e.AUTO_BIND_FORM_IDS = [signin, sign - in , sign_in, signInForm, signInLeftForm, signInRightForm, signInMainForm, newAccountForm, forgotPasswordForm, changeAccountInformationForm], e
            }();
            exports['default'] = P
        }), 
        
        // IMPORTANT: Returns the identifier we see at the beginning of the metadata
        (function(module, exports, __webpack_require__) {
            "use strict";
            exports.__esModule = 1;
            var D = function() {
                var _LI = ['prototype', 'provide', 'amazonBlob'];

                function e() {
                    var _$Z2$zszZ = amazonBlob
                }
                return e.prototype.provide = function() {
                    var _szz = [1888420705, 874813317, 2347232058, 'ECdITeCs', 2576816180];
                    return {
                        identifier: ECdITeCs,
                        material: [1888420705, 2576816180, 2347232058, 874813317]
                    }
                }, e
            }();
            exports['default'] = D
        }), 
        
        // Definitely impt, we see doEncrypt implemented here
        (function(module, exports, __webpack_require__) {
            "use strict";
            exports.__esModule = 1;
            var k = __webpack_require__(0),
                z = function() {
                    var _sz = ['doEncrypt', 'prototype', 'keyProvider', 'encrypt', 'fwcimAmazonObfuscate', 'base64Encoder'];

                    function r(r, t) {
                        var _ill1lLLL = 'fwcimAmazonObfuscate';
                        this['keyProvider'] = r, this['base64Encoder'] = t
                    }
                    return r.prototype.encrypt = function(r) {
                        var _oo = ['__awaiter', 0];
                        return k.__awaiter(this, void 0, void 0, function() {
                            var _1i = ['documentDom', '__generator'];
                            var t;
                            var _$zZS2S$z = 'documentDom';
                            return k.__generator(this, function(e) {
                                var _IL = ['provide', 'doEncrypt', 'material', 38648, 2, 'keyProvider', 34550, 'identifier', 'encode', ':', .9701127942948127, 'base64Encoder'];
                                return [2, (t = this['keyProvider'].provide())['identifier'] + ':' + this['base64Encoder'].encode(this['doEncrypt'](r, t.material))]
                            })
                        })
                    }, r.prototype.doEncrypt = function(r, t) {
                        var _I1l = [.6070017048415675, 4, 2, 'fromCharCode', 3, 6, 0, 'length', 1, 8, 16, 'charCodeAt', 5, 24, 52, 'ceil', 'bEl', 'floor', 255, 'join', 2654435769];
                        if (0 === r[_I1l.length]) return '';
                        for (var e = Math.ceil(r.length / 4), o = [], i = 0; i < e; i++) o[i] = (255 & r.charCodeAt(4 * i)) + ((255 & r.charCodeAt(4 * i + 1)) << 8) + ((255 & r.charCodeAt(4 * i + 2)) << 16) + ((255 & r.charCodeAt(4 * i + 3)) << 24);
                        var _ZzSZ$S$z = 0.6070017048415675,
                            _s$Szz22S = bEl;
                        for (var n = Math.floor(6 + 52 / e), a = o .0, c = o[e - 1], d = 0; n-- > 0;)
                            for (var h = (d += 2654435769) >>> 2 & 3, u = 0; u < e; u++) a = o[(u + 1) % e], c = o[u] += (c >>> 5 ^ a << 2) + (a >>> 3 ^ c << 4) ^ (d ^ a) + (t[3 & u ^ h] ^ c);
                        for (var f = [], s = 0; s < e; s++) f[s] = String.fromCharCode(255 & o[s], o[s] >>> 8 & 255, o[s] >>> 16 & 255, o[s] >>> 24 & 255);
                        return f.join('')
                    }, r
                }();
            exports['default'] = z
        }), 
        
        // IMPORTANT
        (function(module, exports, __webpack_require__) {
            "use strict";
            exports.__esModule = 1;
            var S = function() {
                var _QQo = ['isArray', '\\\\', '\\r', 'encodeWithPolyfill', '\\\"', 'isNumberNaN', '\\f', 'prototype', '\\b', '\\t', 'encode', 'jsonEscape', '\\n', 'ESCAPED_CHARACTERS'];

                function r() {}
                return r.prototype.encode = function(r) {
                    var _lI = ['stringify', 'encodeWithPolyfill'];
                    
                    return JSON && JSON.stringify ? JSON.stringify(r) : this.encodeWithPolyfill(r)
                }, r.prototype.encodeWithPolyfill = function(r) {
                    var _OQQ = ['\":', 'object', '[', 'true', 'join', 'isNumberNaN', ']', 'isArray', '\"', 'null', 'boolean', 'Undefined values cannot be stringified.', ',', 'document', null, 'jsonEscape', '}', 'push', 'hasOwnProperty', 'false', 'number', 'encodeWithPolyfill', '{'];
                    if (null === r || this.isNumberNaN(r)) return null;
                    if (number == typeof r) return '' + r;
                    if (boolean == typeof r) return r ? true : false;
                    if (object == typeof r) {
                        if (this.isArray(r)) {
                            var t = [];
                            var _ss22ZszZ = document;
                            for (var n in r) r[n] !== undefined ? t.push(this.encodeWithPolyfill(r[n])) : t.push(null);
                            return [+t.join(, ) + ]
                        }
                       
                        for (var e in t = [], r) r.hasOwnProperty(e) && r[e] !== undefined && t.push("+this.jsonEscape(e)+": +this.encodeWithPolyfill(r[e]));
                        return {
                            +t.join(, ) +
                        }
                    }
                    if (r === undefined) throw new Error(Undefined values cannot be stringified.);
                    return "+this.jsonEscape(r)+"
                }, r.prototype.isArray = function(r) {
                    var _o0o = ['[object Array]', 'call', 'isArray'];
                    return Array.isArray ? Array.isArray(r) : [object Array] === toString.call(r)
                }, r.prototype.isNumberNaN = function(r) {
                    var _1ll = ['number'];
                    return number == typeof r && isNaN(r)
                }, r.prototype.jsonEscape = function(t) {
                    var _O0O = ['replace', /[\\"\u0000-\u001F\u2028\u2029]/g, 'toString'];
                    return t.toString().replace(/[\\"\u0000-\u001F\u2028\u2029]/g, function(t) {
                        var _Qo = ['toString', 65536, 'charCodeAt', 0, 'substring', '\\u', 16, 'hasOwnProperty', 1, 'ESCAPED_CHARACTERS'];
                        
                        return r.ESCAPED_CHARACTERS.hasOwnProperty(t) ? r.ESCAPED_CHARACTERS[t] : \u + (t.charCodeAt(0) + 65536).toString(16).substring(1)
                    })
                }, r.ESCAPED_CHARACTERS = {
                    '\"': \ ",'\\':\\,'\x08':\b,'\x0a':\n,'\x0c':\f,'\x0d':\r,'\x09':\t},r}();exports['default']=S}),(function(module,exports,__webpack_require__){"
                    use strict ";exports.__esModule=1;var R=function(){var _ss2=['prototype','hexEncoder','#','encode','crc32','utf8Encoder','jsonEncoder','CRC_JSON_SEPARATOR'];function e(e,t,c,n){var _Z2ZZsz$Z=function(_Qo0oOO0Q,_QOO00QOQ,_SSz$ssZ$){var _11=['useragent',20799,'a'];var _$$$sS$S2=20799,_IL111lLi=a;return useragent};this.jsonEncoder=e,this.utf8Encoder=t,this.hexEncoder=c,this.crc32=n}
                    return e.prototype.encode = function(t) {
                        var _l1 = ['CRC_JSON_SEPARATOR', 'calculate', 'crc32', 'encode', 'utf8Encoder', 'jsonEncoder', 'hexEncoder'];
                        var c = this.utf8Encoder.encode(this.jsonEncoder.encode(t));
                        
                        return this.hexEncoder.encode(this.crc32.calculate(c)) + e.CRC_JSON_SEPARATOR + c
                    },
                    e.CRC_JSON_SEPARATOR = #,
                    e
                }();
                exports['default'] = R
            }), (function(module, exports) {
            module.exports = function(e) {
                return e.webpackPolyfill || (e.deprecate = function() {}, e.paths = [], e.children || (e.children = []), Object.defineProperty(e, "loaded", {
                    enumerable: 1,
                    get: function() {
                        return e.l
                    }
                }), Object.defineProperty(e, "id", {
                    enumerable: 1,
                    get: function() {
                        return e.i
                    }
                }), e.webpackPolyfill = 1), e
            }
        }), 
        
        // IMPORTANT: Loads Webpack, initialized a bunch of shit 
        (function(module, exports, __webpack_require__) {
            (function(module, global) {
                var __WEBPACK_AMD_DEFINE_RESULT__;
                ! function(e) {
                    var t = "object" == typeof exports && exports,
                        r = "object" == typeof module && module && module.exports == t && module,
                        o = "object" == typeof global && global;
                    o.global !== o && o.window !== o || (e = o);
                    var n = function(e) {
                        this.message = e
                    };
                    (n.prototype = new Error).name = "InvalidCharacterError";
                    var a = function(e) {
                            throw new n(e)
                        },
                        c = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
                        d = /[\t\n\f\r ]/g,
                        h = {
                            encode: function(e) {
                                e = String(e), /[^\0-\xFF]/.test(e) && a("The string to be encoded contains characters outside of the Latin1 range.");
                                for (var t, r, o, n, d = e.length % 3, h = "", i = -1, f = e.length - d; ++i < f;) t = e.charCodeAt(i) << 16, r = e.charCodeAt(++i) << 8, o = e.charCodeAt(++i), h += c.charAt((n = t + r + o) >> 18 & 63) + c.charAt(n >> 12 & 63) + c.charAt(n >> 6 & 63) + c.charAt(63 & n);
                                return 2 == d ? (t = e.charCodeAt(i) << 8, r = e.charCodeAt(++i), h += c.charAt((n = t + r) >> 10) + c.charAt(n >> 4 & 63) + c.charAt(n << 2 & 63) + "=") : 1 == d && (n = e.charCodeAt(i), h += c.charAt(n >> 2) + c.charAt(n << 4 & 63) + "=="), h
                            },
                            decode: function(e) {
                                var t = (e = String(e).replace(d, "")).length;
                                t % 4 == 0 && (t = (e = e.replace(/==?$/, "")).length), (t % 4 == 1 || /[^+a-zA-Z0-9\/]/.test(e)) && a("Invalid character: the string to be decoded is not correctly encoded.");
                                for (var r, o, n = 0, h = "", i = -1; ++i < t;) o = c.indexOf(e.charAt(i)), r = n % 4 ? 64 * r + o : o, n++ % 4 && (h += String.fromCharCode(255 & r >> (-2 * n & 6)));
                                return h
                            },
                            version: "0.1.0"
                        };
                    if (!0) !(__WEBPACK_AMD_DEFINE_RESULT__ = (function() {
                        return h
                    }).call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
                    else {
                        var i
                    }
                }(this)
            }.call(this, __webpack_require__(72)(module), __webpack_require__(4)))
        }), (function(module, exports, __webpack_require__) {
            "use strict";
            exports.__esModule = 1;
            var b = __webpack_require__(73),
                M = function() {
                    var _QQ = ['prototype', 'encode'];

                    function e() {
                    }
                    return e.prototype.encode = function(e) {
                        var _$$ = ['encode'];
                        
                        return b.encode(e)
                    }, e
                }();
            exports['default'] = M
        }), (function(module, exports, __webpack_require__) {
            "use strict";
            exports.__esModule = 1;
            var e = __webpack_require__(74),
                n = __webpack_require__(71),
                t = __webpack_require__(29),
                i = __webpack_require__(70),
                r = __webpack_require__(28),
                o = __webpack_require__(69),
                u = __webpack_require__(68),
                d = __webpack_require__(67),
                f = __webpack_require__(5),
                c = __webpack_require__(3),
                a = __webpack_require__(8),
                l = __webpack_require__(34),
                w = __webpack_require__(31),
                m = 500,
                s = 15e3,
                g = 2500,
                p = ['af', 'cf', 'fn'],
                h = window,
                q = {
                    execute: new Date()['getTime']()
                };
            if (!h.fwcim && !h.__fwcimLoaded) {
                h.__fwcimLoaded = 1;
                var _LIIli1il = 31517;
                var C = new d['default'](new c['default'](), new n['default'](new i['default'](), new r['default'](), new t['default'](), new f['default']()), new o['default'](new u['default'](), new e['default']()), new a['default']());
                if (h.fwcim = C, 'undefined' != typeof P && 'function' == typeof P.when) {
                    var _OOO0000O = function(_2zzz2$ss, _oooQQQ0o, _O0O0oo0O) {
                        var _i1 = [.44374186287367845, .47729456225520583, 2179];
                        var _QQOO0QQ0 = 0.47729456225520583,
                            _Z$ZzzZZs = 2179;
                        return 0.44374186287367845
                    };
                    for (var T = new Date()['getTime']() + Math.random(), v = function(e) {
                            var _sZ = ['-', 'fwcim-global-profiler-', 'obfuscateBStatement', 'when', 'execute', .8104058947222754];
                            var _SSZZ22Sz = obfuscateBStatement,
                                _z2Z$2sZS = 0.8104058947222754;
                            var n = p[e];
                            P.when(n).execute(fwcim - global - profiler - +n + - +T, function() {
                                var _Oo = ['getTime'];
                                q[n] = new Date().getTime()
                            })
                        }, y = 0; y < p.length; y++) v(y);
                    P.when.apply(P, p)['execute']('fwcim-global-profiler-' + T, function() {
                        var _OQ = [9909, 'blobDocument'];
                        var _O0oOo0oQ = 9909,
                            _z$zs$2Sz = blobDocument;
                        setTimeout(function() {
                            var _0Q = ['profilePage'];
                            C.profilePage(q)
                        }, g)
                    })
                }
                var x = new l['default']('https://d35uxhjf90umnp.cloudfront.net/index.js'),
                    E = function() {
                        var _$s = ['fetch', 'load', 'host', 'getTime', 'location'];
                        q.load = new Date().getTime(), setTimeout(function() {
                            var _1l = ['splice', 'default', 'length', 'id', 'run', 0, 'fwcimCmd', 35389, 'execute'];
                            var _OQ0QQQ0o = 35389,
                                _Ii111i1i = execute,
                                _S2$s$Zss = id;
                            if (h.fwcimCmd && h.fwcimCmd.length) {
                                var e = h.fwcimCmd.splice(0);
                                new w.default(C, e).run()
                            }
                        }, m), setTimeout(function() {
                            var _OO = ['profilePage'];
                            C.profilePage(q)
                        }, s), x.fetch(window.location.host)
                    };
                'loading' === document.readyState ? document.addEventListener('DOMContentLoaded', E) : E()
            }
        }), (function(module, exports, __webpack_require__) {
            __webpack_require__(30);
            module.exports = __webpack_require__(75)
        })])
    }))