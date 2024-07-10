var Zm = Object.create;
var Oo = Object.defineProperty;
var Jm = Object.getOwnPropertyDescriptor;
var eh = Object.getOwnPropertyNames;
var th = Object.getPrototypeOf, rh = Object.prototype.hasOwnProperty;
var a = (e, t) => Oo(e, "name", { value: t, configurable: !0 }), vr = /* @__PURE__ */ ((e) => typeof require < "u" ? require : typeof Proxy <
"u" ? new Proxy(e, {
  get: (t, r) => (typeof require < "u" ? require : t)[r]
}) : e)(function(e) {
  if (typeof require < "u") return require.apply(this, arguments);
  throw Error('Dynamic require of "' + e + '" is not supported');
});
var W = (e, t) => () => (t || e((t = { exports: {} }).exports, t), t.exports);
var nh = (e, t, r, n) => {
  if (t && typeof t == "object" || typeof t == "function")
    for (let i of eh(t))
      !rh.call(e, i) && i !== r && Oo(e, i, { get: () => t[i], enumerable: !(n = Jm(t, i)) || n.enumerable });
  return e;
};
var Fe = (e, t, r) => (r = e != null ? Zm(th(e)) : {}, nh(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  t || !e || !e.__esModule ? Oo(r, "default", { value: e, enumerable: !0 }) : r,
  e
));

// ../node_modules/prop-types/lib/ReactPropTypesSecret.js
var ws = W((KE, xs) => {
  "use strict";
  var ih = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
  xs.exports = ih;
});

// ../node_modules/prop-types/factoryWithThrowingShims.js
var Ts = W((jE, _s) => {
  "use strict";
  var ah = ws();
  function Es() {
  }
  a(Es, "emptyFunction");
  function Cs() {
  }
  a(Cs, "emptyFunctionWithReset");
  Cs.resetWarningCache = Es;
  _s.exports = function() {
    function e(n, i, o, s, u, c) {
      if (c !== ah) {
        var p = new Error(
          "Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. \
Read more at http://fb.me/use-check-prop-types"
        );
        throw p.name = "Invariant Violation", p;
      }
    }
    a(e, "shim"), e.isRequired = e;
    function t() {
      return e;
    }
    a(t, "getShim");
    var r = {
      array: e,
      bigint: e,
      bool: e,
      func: e,
      number: e,
      object: e,
      string: e,
      symbol: e,
      any: e,
      arrayOf: t,
      element: e,
      elementType: e,
      instanceOf: t,
      node: e,
      objectOf: t,
      oneOf: t,
      oneOfType: t,
      shape: t,
      exact: t,
      checkPropTypes: Cs,
      resetWarningCache: Es
    };
    return r.PropTypes = r, r;
  };
});

// ../node_modules/prop-types/index.js
var No = W((YE, ks) => {
  ks.exports = Ts()();
  var qE, GE;
});

// ../node_modules/react-fast-compare/index.js
var Ps = W((QE, Os) => {
  var sh = typeof Element < "u", lh = typeof Map == "function", uh = typeof Set == "function", ch = typeof ArrayBuffer == "function" && !!ArrayBuffer.
  isView;
  function Jr(e, t) {
    if (e === t) return !0;
    if (e && t && typeof e == "object" && typeof t == "object") {
      if (e.constructor !== t.constructor) return !1;
      var r, n, i;
      if (Array.isArray(e)) {
        if (r = e.length, r != t.length) return !1;
        for (n = r; n-- !== 0; )
          if (!Jr(e[n], t[n])) return !1;
        return !0;
      }
      var o;
      if (lh && e instanceof Map && t instanceof Map) {
        if (e.size !== t.size) return !1;
        for (o = e.entries(); !(n = o.next()).done; )
          if (!t.has(n.value[0])) return !1;
        for (o = e.entries(); !(n = o.next()).done; )
          if (!Jr(n.value[1], t.get(n.value[0]))) return !1;
        return !0;
      }
      if (uh && e instanceof Set && t instanceof Set) {
        if (e.size !== t.size) return !1;
        for (o = e.entries(); !(n = o.next()).done; )
          if (!t.has(n.value[0])) return !1;
        return !0;
      }
      if (ch && ArrayBuffer.isView(e) && ArrayBuffer.isView(t)) {
        if (r = e.length, r != t.length) return !1;
        for (n = r; n-- !== 0; )
          if (e[n] !== t[n]) return !1;
        return !0;
      }
      if (e.constructor === RegExp) return e.source === t.source && e.flags === t.flags;
      if (e.valueOf !== Object.prototype.valueOf && typeof e.valueOf == "function" && typeof t.valueOf == "function") return e.valueOf() ===
      t.valueOf();
      if (e.toString !== Object.prototype.toString && typeof e.toString == "function" && typeof t.toString == "function") return e.toString() ===
      t.toString();
      if (i = Object.keys(e), r = i.length, r !== Object.keys(t).length) return !1;
      for (n = r; n-- !== 0; )
        if (!Object.prototype.hasOwnProperty.call(t, i[n])) return !1;
      if (sh && e instanceof Element) return !1;
      for (n = r; n-- !== 0; )
        if (!((i[n] === "_owner" || i[n] === "__v" || i[n] === "__o") && e.$$typeof) && !Jr(e[i[n]], t[i[n]]))
          return !1;
      return !0;
    }
    return e !== e && t !== t;
  }
  a(Jr, "equal");
  Os.exports = /* @__PURE__ */ a(function(t, r) {
    try {
      return Jr(t, r);
    } catch (n) {
      if ((n.message || "").match(/stack|recursion/i))
        return console.warn("react-fast-compare cannot handle circular refs"), !1;
      throw n;
    }
  }, "isEqual");
});

// ../node_modules/invariant/browser.js
var Ms = W((ZE, As) => {
  "use strict";
  var ph = /* @__PURE__ */ a(function(e, t, r, n, i, o, s, u) {
    if (!e) {
      var c;
      if (t === void 0)
        c = new Error(
          "Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings."
        );
      else {
        var p = [r, n, i, o, s, u], d = 0;
        c = new Error(
          t.replace(/%s/g, function() {
            return p[d++];
          })
        ), c.name = "Invariant Violation";
      }
      throw c.framesToPop = 1, c;
    }
  }, "invariant");
  As.exports = ph;
});

// ../node_modules/shallowequal/index.js
var Ls = W((eC, Ds) => {
  Ds.exports = /* @__PURE__ */ a(function(t, r, n, i) {
    var o = n ? n.call(i, t, r) : void 0;
    if (o !== void 0)
      return !!o;
    if (t === r)
      return !0;
    if (typeof t != "object" || !t || typeof r != "object" || !r)
      return !1;
    var s = Object.keys(t), u = Object.keys(r);
    if (s.length !== u.length)
      return !1;
    for (var c = Object.prototype.hasOwnProperty.bind(r), p = 0; p < s.length; p++) {
      var d = s[p];
      if (!c(d))
        return !1;
      var g = t[d], f = r[d];
      if (o = n ? n.call(i, g, f, d) : void 0, o === !1 || o === void 0 && g !== f)
        return !1;
    }
    return !0;
  }, "shallowEqual");
});

// ../node_modules/lodash/isObject.js
var xn = W((OP, Jl) => {
  function dg(e) {
    var t = typeof e;
    return e != null && (t == "object" || t == "function");
  }
  a(dg, "isObject");
  Jl.exports = dg;
});

// ../node_modules/lodash/_freeGlobal.js
var tu = W((AP, eu) => {
  var fg = typeof global == "object" && global && global.Object === Object && global;
  eu.exports = fg;
});

// ../node_modules/lodash/_root.js
var ti = W((MP, ru) => {
  var mg = tu(), hg = typeof self == "object" && self && self.Object === Object && self, gg = mg || hg || Function("return this")();
  ru.exports = gg;
});

// ../node_modules/lodash/now.js
var ou = W((DP, nu) => {
  var yg = ti(), vg = /* @__PURE__ */ a(function() {
    return yg.Date.now();
  }, "now");
  nu.exports = vg;
});

// ../node_modules/lodash/_trimmedEndIndex.js
var au = W((NP, iu) => {
  var bg = /\s/;
  function Ig(e) {
    for (var t = e.length; t-- && bg.test(e.charAt(t)); )
      ;
    return t;
  }
  a(Ig, "trimmedEndIndex");
  iu.exports = Ig;
});

// ../node_modules/lodash/_baseTrim.js
var lu = W((HP, su) => {
  var Sg = au(), xg = /^\s+/;
  function wg(e) {
    return e && e.slice(0, Sg(e) + 1).replace(xg, "");
  }
  a(wg, "baseTrim");
  su.exports = wg;
});

// ../node_modules/lodash/_Symbol.js
var ri = W((RP, uu) => {
  var Eg = ti(), Cg = Eg.Symbol;
  uu.exports = Cg;
});

// ../node_modules/lodash/_getRawTag.js
var fu = W((zP, du) => {
  var cu = ri(), pu = Object.prototype, _g = pu.hasOwnProperty, Tg = pu.toString, kr = cu ? cu.toStringTag : void 0;
  function kg(e) {
    var t = _g.call(e, kr), r = e[kr];
    try {
      e[kr] = void 0;
      var n = !0;
    } catch {
    }
    var i = Tg.call(e);
    return n && (t ? e[kr] = r : delete e[kr]), i;
  }
  a(kg, "getRawTag");
  du.exports = kg;
});

// ../node_modules/lodash/_objectToString.js
var hu = W((WP, mu) => {
  var Og = Object.prototype, Pg = Og.toString;
  function Ag(e) {
    return Pg.call(e);
  }
  a(Ag, "objectToString");
  mu.exports = Ag;
});

// ../node_modules/lodash/_baseGetTag.js
var bu = W((KP, vu) => {
  var gu = ri(), Mg = fu(), Dg = hu(), Lg = "[object Null]", Ng = "[object Undefined]", yu = gu ? gu.toStringTag : void 0;
  function Fg(e) {
    return e == null ? e === void 0 ? Ng : Lg : yu && yu in Object(e) ? Mg(e) : Dg(e);
  }
  a(Fg, "baseGetTag");
  vu.exports = Fg;
});

// ../node_modules/lodash/isObjectLike.js
var Su = W((UP, Iu) => {
  function Hg(e) {
    return e != null && typeof e == "object";
  }
  a(Hg, "isObjectLike");
  Iu.exports = Hg;
});

// ../node_modules/lodash/isSymbol.js
var wu = W((GP, xu) => {
  var Bg = bu(), Rg = Su(), zg = "[object Symbol]";
  function $g(e) {
    return typeof e == "symbol" || Rg(e) && Bg(e) == zg;
  }
  a($g, "isSymbol");
  xu.exports = $g;
});

// ../node_modules/lodash/toNumber.js
var Tu = W((QP, _u) => {
  var Wg = lu(), Eu = xn(), Vg = wu(), Cu = NaN, Kg = /^[-+]0x[0-9a-f]+$/i, jg = /^0b[01]+$/i, Ug = /^0o[0-7]+$/i, qg = parseInt;
  function Gg(e) {
    if (typeof e == "number")
      return e;
    if (Vg(e))
      return Cu;
    if (Eu(e)) {
      var t = typeof e.valueOf == "function" ? e.valueOf() : e;
      e = Eu(t) ? t + "" : t;
    }
    if (typeof e != "string")
      return e === 0 ? e : +e;
    e = Wg(e);
    var r = jg.test(e);
    return r || Ug.test(e) ? qg(e.slice(2), r ? 2 : 8) : Kg.test(e) ? Cu : +e;
  }
  a(Gg, "toNumber");
  _u.exports = Gg;
});

// ../node_modules/lodash/debounce.js
var oi = W((ZP, Ou) => {
  var Yg = xn(), ni = ou(), ku = Tu(), Qg = "Expected a function", Xg = Math.max, Zg = Math.min;
  function Jg(e, t, r) {
    var n, i, o, s, u, c, p = 0, d = !1, g = !1, f = !0;
    if (typeof e != "function")
      throw new TypeError(Qg);
    t = ku(t) || 0, Yg(r) && (d = !!r.leading, g = "maxWait" in r, o = g ? Xg(ku(r.maxWait) || 0, t) : o, f = "trailing" in r ? !!r.trailing :
    f);
    function y(_) {
      var T = n, k = i;
      return n = i = void 0, p = _, s = e.apply(k, T), s;
    }
    a(y, "invokeFunc");
    function m(_) {
      return p = _, u = setTimeout(w, t), d ? y(_) : s;
    }
    a(m, "leadingEdge");
    function v(_) {
      var T = _ - c, k = _ - p, E = t - T;
      return g ? Zg(E, o - k) : E;
    }
    a(v, "remainingWait");
    function x(_) {
      var T = _ - c, k = _ - p;
      return c === void 0 || T >= t || T < 0 || g && k >= o;
    }
    a(x, "shouldInvoke");
    function w() {
      var _ = ni();
      if (x(_))
        return h(_);
      u = setTimeout(w, v(_));
    }
    a(w, "timerExpired");
    function h(_) {
      return u = void 0, f && n ? y(_) : (n = i = void 0, s);
    }
    a(h, "trailingEdge");
    function b() {
      u !== void 0 && clearTimeout(u), p = 0, n = c = i = u = void 0;
    }
    a(b, "cancel");
    function I() {
      return u === void 0 ? s : h(ni());
    }
    a(I, "flush");
    function C() {
      var _ = ni(), T = x(_);
      if (n = arguments, i = this, c = _, T) {
        if (u === void 0)
          return m(c);
        if (g)
          return clearTimeout(u), u = setTimeout(w, t), y(c);
      }
      return u === void 0 && (u = setTimeout(w, t)), s;
    }
    return a(C, "debounced"), C.cancel = b, C.flush = I, C;
  }
  a(Jg, "debounce");
  Ou.exports = Jg;
});

// ../node_modules/lodash/throttle.js
var Au = W((eA, Pu) => {
  var ey = oi(), ty = xn(), ry = "Expected a function";
  function ny(e, t, r) {
    var n = !0, i = !0;
    if (typeof e != "function")
      throw new TypeError(ry);
    return ty(r) && (n = "leading" in r ? !!r.leading : n, i = "trailing" in r ? !!r.trailing : i), ey(e, t, {
      leading: n,
      maxWait: t,
      trailing: i
    });
  }
  a(ny, "throttle");
  Pu.exports = ny;
});

// ../node_modules/memoizerific/memoizerific.js
var wn = W((Mu, ii) => {
  (function(e) {
    if (typeof Mu == "object" && typeof ii < "u")
      ii.exports = e();
    else if (typeof define == "function" && define.amd)
      define([], e);
    else {
      var t;
      typeof window < "u" ? t = window : typeof global < "u" ? t = global : typeof self < "u" ? t = self : t = this, t.memoizerific = e();
    }
  })(function() {
    var e, t, r;
    return (/* @__PURE__ */ a(function n(i, o, s) {
      function u(d, g) {
        if (!o[d]) {
          if (!i[d]) {
            var f = typeof vr == "function" && vr;
            if (!g && f) return f(d, !0);
            if (c) return c(d, !0);
            var y = new Error("Cannot find module '" + d + "'");
            throw y.code = "MODULE_NOT_FOUND", y;
          }
          var m = o[d] = { exports: {} };
          i[d][0].call(m.exports, function(v) {
            var x = i[d][1][v];
            return u(x || v);
          }, m, m.exports, n, i, o, s);
        }
        return o[d].exports;
      }
      a(u, "s");
      for (var c = typeof vr == "function" && vr, p = 0; p < s.length; p++) u(s[p]);
      return u;
    }, "e"))({ 1: [function(n, i, o) {
      i.exports = function(s) {
        if (typeof Map != "function" || s) {
          var u = n("./similar");
          return new u();
        } else
          return /* @__PURE__ */ new Map();
      };
    }, { "./similar": 2 }], 2: [function(n, i, o) {
      function s() {
        return this.list = [], this.lastItem = void 0, this.size = 0, this;
      }
      a(s, "Similar"), s.prototype.get = function(u) {
        var c;
        if (this.lastItem && this.isEqual(this.lastItem.key, u))
          return this.lastItem.val;
        if (c = this.indexOf(u), c >= 0)
          return this.lastItem = this.list[c], this.list[c].val;
      }, s.prototype.set = function(u, c) {
        var p;
        return this.lastItem && this.isEqual(this.lastItem.key, u) ? (this.lastItem.val = c, this) : (p = this.indexOf(u), p >= 0 ? (this.lastItem =
        this.list[p], this.list[p].val = c, this) : (this.lastItem = { key: u, val: c }, this.list.push(this.lastItem), this.size++, this));
      }, s.prototype.delete = function(u) {
        var c;
        if (this.lastItem && this.isEqual(this.lastItem.key, u) && (this.lastItem = void 0), c = this.indexOf(u), c >= 0)
          return this.size--, this.list.splice(c, 1)[0];
      }, s.prototype.has = function(u) {
        var c;
        return this.lastItem && this.isEqual(this.lastItem.key, u) ? !0 : (c = this.indexOf(u), c >= 0 ? (this.lastItem = this.list[c], !0) :
        !1);
      }, s.prototype.forEach = function(u, c) {
        var p;
        for (p = 0; p < this.size; p++)
          u.call(c || this, this.list[p].val, this.list[p].key, this);
      }, s.prototype.indexOf = function(u) {
        var c;
        for (c = 0; c < this.size; c++)
          if (this.isEqual(this.list[c].key, u))
            return c;
        return -1;
      }, s.prototype.isEqual = function(u, c) {
        return u === c || u !== u && c !== c;
      }, i.exports = s;
    }, {}], 3: [function(n, i, o) {
      var s = n("map-or-similar");
      i.exports = function(d) {
        var g = new s(!1), f = [];
        return function(y) {
          var m = /* @__PURE__ */ a(function() {
            var v = g, x, w, h = arguments.length - 1, b = Array(h + 1), I = !0, C;
            if ((m.numArgs || m.numArgs === 0) && m.numArgs !== h + 1)
              throw new Error("Memoizerific functions should always be called with the same number of arguments");
            for (C = 0; C < h; C++) {
              if (b[C] = {
                cacheItem: v,
                arg: arguments[C]
              }, v.has(arguments[C])) {
                v = v.get(arguments[C]);
                continue;
              }
              I = !1, x = new s(!1), v.set(arguments[C], x), v = x;
            }
            return I && (v.has(arguments[h]) ? w = v.get(arguments[h]) : I = !1), I || (w = y.apply(null, arguments), v.set(arguments[h], w)),
            d > 0 && (b[h] = {
              cacheItem: v,
              arg: arguments[h]
            }, I ? u(f, b) : f.push(b), f.length > d && c(f.shift())), m.wasMemoized = I, m.numArgs = h + 1, w;
          }, "memoizerific");
          return m.limit = d, m.wasMemoized = !1, m.cache = g, m.lru = f, m;
        };
      };
      function u(d, g) {
        var f = d.length, y = g.length, m, v, x;
        for (v = 0; v < f; v++) {
          for (m = !0, x = 0; x < y; x++)
            if (!p(d[v][x].arg, g[x].arg)) {
              m = !1;
              break;
            }
          if (m)
            break;
        }
        d.push(d.splice(v, 1)[0]);
      }
      a(u, "moveToMostRecentLru");
      function c(d) {
        var g = d.length, f = d[g - 1], y, m;
        for (f.cacheItem.delete(f.arg), m = g - 2; m >= 0 && (f = d[m], y = f.cacheItem.get(f.arg), !y || !y.size); m--)
          f.cacheItem.delete(f.arg);
      }
      a(c, "removeCachedResult");
      function p(d, g) {
        return d === g || d !== d && g !== g;
      }
      a(p, "isEqual");
    }, { "map-or-similar": 1 }] }, {}, [3])(3);
  });
});

// ../node_modules/downshift/node_modules/react-is/cjs/react-is.production.min.js
var Ju = W((de) => {
  "use strict";
  var ui = Symbol.for("react.element"), ci = Symbol.for("react.portal"), Tn = Symbol.for("react.fragment"), kn = Symbol.for("react.strict_mo\
de"), On = Symbol.for("react.profiler"), Pn = Symbol.for("react.provider"), An = Symbol.for("react.context"), xy = Symbol.for("react.server_\
context"), Mn = Symbol.for("react.forward_ref"), Dn = Symbol.for("react.suspense"), Ln = Symbol.for("react.suspense_list"), Nn = Symbol.for(
  "react.memo"), Fn = Symbol.for("react.lazy"), wy = Symbol.for("react.offscreen"), Zu;
  Zu = Symbol.for("react.module.reference");
  function je(e) {
    if (typeof e == "object" && e !== null) {
      var t = e.$$typeof;
      switch (t) {
        case ui:
          switch (e = e.type, e) {
            case Tn:
            case On:
            case kn:
            case Dn:
            case Ln:
              return e;
            default:
              switch (e = e && e.$$typeof, e) {
                case xy:
                case An:
                case Mn:
                case Fn:
                case Nn:
                case Pn:
                  return e;
                default:
                  return t;
              }
          }
        case ci:
          return t;
      }
    }
  }
  a(je, "v");
  de.ContextConsumer = An;
  de.ContextProvider = Pn;
  de.Element = ui;
  de.ForwardRef = Mn;
  de.Fragment = Tn;
  de.Lazy = Fn;
  de.Memo = Nn;
  de.Portal = ci;
  de.Profiler = On;
  de.StrictMode = kn;
  de.Suspense = Dn;
  de.SuspenseList = Ln;
  de.isAsyncMode = function() {
    return !1;
  };
  de.isConcurrentMode = function() {
    return !1;
  };
  de.isContextConsumer = function(e) {
    return je(e) === An;
  };
  de.isContextProvider = function(e) {
    return je(e) === Pn;
  };
  de.isElement = function(e) {
    return typeof e == "object" && e !== null && e.$$typeof === ui;
  };
  de.isForwardRef = function(e) {
    return je(e) === Mn;
  };
  de.isFragment = function(e) {
    return je(e) === Tn;
  };
  de.isLazy = function(e) {
    return je(e) === Fn;
  };
  de.isMemo = function(e) {
    return je(e) === Nn;
  };
  de.isPortal = function(e) {
    return je(e) === ci;
  };
  de.isProfiler = function(e) {
    return je(e) === On;
  };
  de.isStrictMode = function(e) {
    return je(e) === kn;
  };
  de.isSuspense = function(e) {
    return je(e) === Dn;
  };
  de.isSuspenseList = function(e) {
    return je(e) === Ln;
  };
  de.isValidElementType = function(e) {
    return typeof e == "string" || typeof e == "function" || e === Tn || e === On || e === kn || e === Dn || e === Ln || e === wy || typeof e ==
    "object" && e !== null && (e.$$typeof === Fn || e.$$typeof === Nn || e.$$typeof === Pn || e.$$typeof === An || e.$$typeof === Mn || e.$$typeof ===
    Zu || e.getModuleId !== void 0);
  };
  de.typeOf = je;
});

// ../node_modules/downshift/node_modules/react-is/index.js
var tc = W((IM, ec) => {
  "use strict";
  ec.exports = Ju();
});

// ../node_modules/fuse.js/dist/fuse.js
var up = W((Dr, ta) => {
  (function(e, t) {
    typeof Dr == "object" && typeof ta == "object" ? ta.exports = t() : typeof define == "function" && define.amd ? define("Fuse", [], t) : typeof Dr ==
    "object" ? Dr.Fuse = t() : e.Fuse = t();
  })(Dr, function() {
    return function(e) {
      var t = {};
      function r(n) {
        if (t[n]) return t[n].exports;
        var i = t[n] = { i: n, l: !1, exports: {} };
        return e[n].call(i.exports, i, i.exports, r), i.l = !0, i.exports;
      }
      return a(r, "r"), r.m = e, r.c = t, r.d = function(n, i, o) {
        r.o(n, i) || Object.defineProperty(n, i, { enumerable: !0, get: o });
      }, r.r = function(n) {
        typeof Symbol < "u" && Symbol.toStringTag && Object.defineProperty(n, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(
        n, "__esModule", { value: !0 });
      }, r.t = function(n, i) {
        if (1 & i && (n = r(n)), 8 & i || 4 & i && typeof n == "object" && n && n.__esModule) return n;
        var o = /* @__PURE__ */ Object.create(null);
        if (r.r(o), Object.defineProperty(o, "default", { enumerable: !0, value: n }), 2 & i && typeof n != "string") for (var s in n) r.d(o,
        s, (function(u) {
          return n[u];
        }).bind(null, s));
        return o;
      }, r.n = function(n) {
        var i = n && n.__esModule ? function() {
          return n.default;
        } : function() {
          return n;
        };
        return r.d(i, "a", i), i;
      }, r.o = function(n, i) {
        return Object.prototype.hasOwnProperty.call(n, i);
      }, r.p = "", r(r.s = 0);
    }([function(e, t, r) {
      function n(d) {
        return (n = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(g) {
          return typeof g;
        } : function(g) {
          return g && typeof Symbol == "function" && g.constructor === Symbol && g !== Symbol.prototype ? "symbol" : typeof g;
        })(d);
      }
      a(n, "n");
      function i(d, g) {
        for (var f = 0; f < g.length; f++) {
          var y = g[f];
          y.enumerable = y.enumerable || !1, y.configurable = !0, "value" in y && (y.writable = !0), Object.defineProperty(d, y.key, y);
        }
      }
      a(i, "o");
      var o = r(1), s = r(7), u = s.get, c = (s.deepValue, s.isArray), p = function() {
        function d(m, v) {
          var x = v.location, w = x === void 0 ? 0 : x, h = v.distance, b = h === void 0 ? 100 : h, I = v.threshold, C = I === void 0 ? 0.6 :
          I, _ = v.maxPatternLength, T = _ === void 0 ? 32 : _, k = v.caseSensitive, E = k !== void 0 && k, O = v.tokenSeparator, P = O === void 0 ?
          / +/g : O, M = v.findAllMatches, L = M !== void 0 && M, D = v.minMatchCharLength, V = D === void 0 ? 1 : D, X = v.id, Z = X === void 0 ?
          null : X, R = v.keys, z = R === void 0 ? [] : R, H = v.shouldSort, te = H === void 0 || H, B = v.getFn, N = B === void 0 ? u : B, F = v.
          sortFn, $ = F === void 0 ? function(fe, Se) {
            return fe.score - Se.score;
          } : F, Y = v.tokenize, re = Y !== void 0 && Y, ee = v.matchAllTokens, le = ee !== void 0 && ee, se = v.includeMatches, pe = se !==
          void 0 && se, ce = v.includeScore, Ie = ce !== void 0 && ce, ye = v.verbose, Pe = ye !== void 0 && ye;
          (function(fe, Se) {
            if (!(fe instanceof Se)) throw new TypeError("Cannot call a class as a function");
          })(this, d), this.options = { location: w, distance: b, threshold: C, maxPatternLength: T, isCaseSensitive: E, tokenSeparator: P, findAllMatches: L,
          minMatchCharLength: V, id: Z, keys: z, includeMatches: pe, includeScore: Ie, shouldSort: te, getFn: N, sortFn: $, verbose: Pe, tokenize: re,
          matchAllTokens: le }, this.setCollection(m), this._processKeys(z);
        }
        a(d, "e");
        var g, f, y;
        return g = d, (f = [{ key: "setCollection", value: /* @__PURE__ */ a(function(m) {
          return this.list = m, m;
        }, "value") }, { key: "_processKeys", value: /* @__PURE__ */ a(function(m) {
          if (this._keyWeights = {}, this._keyNames = [], m.length && typeof m[0] == "string") for (var v = 0, x = m.length; v < x; v += 1) {
            var w = m[v];
            this._keyWeights[w] = 1, this._keyNames.push(w);
          }
          else {
            for (var h = null, b = null, I = 0, C = 0, _ = m.length; C < _; C += 1) {
              var T = m[C];
              if (!T.hasOwnProperty("name")) throw new Error('Missing "name" property in key object');
              var k = T.name;
              if (this._keyNames.push(k), !T.hasOwnProperty("weight")) throw new Error('Missing "weight" property in key object');
              var E = T.weight;
              if (E < 0 || E > 1) throw new Error('"weight" property in key must bein the range of [0, 1)');
              b = b == null ? E : Math.max(b, E), h = h == null ? E : Math.min(h, E), this._keyWeights[k] = E, I += E;
            }
            if (I > 1) throw new Error("Total of weights cannot exceed 1");
          }
        }, "value") }, { key: "search", value: /* @__PURE__ */ a(function(m) {
          var v = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : { limit: !1 };
          this._log(`---------
Search pattern: "`.concat(m, '"'));
          var x = this._prepareSearchers(m), w = x.tokenSearchers, h = x.fullSearcher, b = this._search(w, h);
          return this._computeScore(b), this.options.shouldSort && this._sort(b), v.limit && typeof v.limit == "number" && (b = b.slice(0, v.
          limit)), this._format(b);
        }, "value") }, { key: "_prepareSearchers", value: /* @__PURE__ */ a(function() {
          var m = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "", v = [];
          if (this.options.tokenize) for (var x = m.split(this.options.tokenSeparator), w = 0, h = x.length; w < h; w += 1) v.push(new o(x[w],
          this.options));
          return { tokenSearchers: v, fullSearcher: new o(m, this.options) };
        }, "value") }, { key: "_search", value: /* @__PURE__ */ a(function() {
          var m = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [], v = arguments.length > 1 ? arguments[1] : void 0, x = this.
          list, w = {}, h = [];
          if (typeof x[0] == "string") {
            for (var b = 0, I = x.length; b < I; b += 1) this._analyze({ key: "", value: x[b], record: b, index: b }, { resultMap: w, results: h,
            tokenSearchers: m, fullSearcher: v });
            return h;
          }
          for (var C = 0, _ = x.length; C < _; C += 1) for (var T = x[C], k = 0, E = this._keyNames.length; k < E; k += 1) {
            var O = this._keyNames[k];
            this._analyze({ key: O, value: this.options.getFn(T, O), record: T, index: C }, { resultMap: w, results: h, tokenSearchers: m, fullSearcher: v });
          }
          return h;
        }, "value") }, { key: "_analyze", value: /* @__PURE__ */ a(function(m, v) {
          var x = this, w = m.key, h = m.arrayIndex, b = h === void 0 ? -1 : h, I = m.value, C = m.record, _ = m.index, T = v.tokenSearchers,
          k = T === void 0 ? [] : T, E = v.fullSearcher, O = v.resultMap, P = O === void 0 ? {} : O, M = v.results, L = M === void 0 ? [] : M;
          (/* @__PURE__ */ a(function D(V, X, Z, R) {
            if (X != null) {
              if (typeof X == "string") {
                var z = !1, H = -1, te = 0;
                x._log(`
Key: `.concat(w === "" ? "--" : w));
                var B = E.search(X);
                if (x._log('Full text: "'.concat(X, '", score: ').concat(B.score)), x.options.tokenize) {
                  for (var N = X.split(x.options.tokenSeparator), F = N.length, $ = [], Y = 0, re = k.length; Y < re; Y += 1) {
                    var ee = k[Y];
                    x._log(`
Pattern: "`.concat(ee.pattern, '"'));
                    for (var le = !1, se = 0; se < F; se += 1) {
                      var pe = N[se], ce = ee.search(pe), Ie = {};
                      ce.isMatch ? (Ie[pe] = ce.score, z = !0, le = !0, $.push(ce.score)) : (Ie[pe] = 1, x.options.matchAllTokens || $.push(
                      1)), x._log('Token: "'.concat(pe, '", score: ').concat(Ie[pe]));
                    }
                    le && (te += 1);
                  }
                  H = $[0];
                  for (var ye = $.length, Pe = 1; Pe < ye; Pe += 1) H += $[Pe];
                  H /= ye, x._log("Token score average:", H);
                }
                var fe = B.score;
                H > -1 && (fe = (fe + H) / 2), x._log("Score average:", fe);
                var Se = !x.options.tokenize || !x.options.matchAllTokens || te >= k.length;
                if (x._log(`
Check Matches: `.concat(Se)), (z || B.isMatch) && Se) {
                  var Ce = { key: w, arrayIndex: V, value: X, score: fe };
                  x.options.includeMatches && (Ce.matchedIndices = B.matchedIndices);
                  var Ne = P[R];
                  Ne ? Ne.output.push(Ce) : (P[R] = { item: Z, output: [Ce] }, L.push(P[R]));
                }
              } else if (c(X)) for (var Je = 0, Ae = X.length; Je < Ae; Je += 1) D(Je, X[Je], Z, R);
            }
          }, "e"))(b, I, C, _);
        }, "value") }, { key: "_computeScore", value: /* @__PURE__ */ a(function(m) {
          this._log(`

Computing score:
`);
          for (var v = this._keyWeights, x = !!Object.keys(v).length, w = 0, h = m.length; w < h; w += 1) {
            for (var b = m[w], I = b.output, C = I.length, _ = 1, T = 0; T < C; T += 1) {
              var k = I[T], E = k.key, O = x ? v[E] : 1, P = k.score === 0 && v && v[E] > 0 ? Number.EPSILON : k.score;
              _ *= Math.pow(P, O);
            }
            b.score = _, this._log(b);
          }
        }, "value") }, { key: "_sort", value: /* @__PURE__ */ a(function(m) {
          this._log(`

Sorting....`), m.sort(this.options.sortFn);
        }, "value") }, { key: "_format", value: /* @__PURE__ */ a(function(m) {
          var v = [];
          if (this.options.verbose) {
            var x = [];
            this._log(`

Output:

`, JSON.stringify(m, function(k, E) {
              if (n(E) === "object" && E !== null) {
                if (x.indexOf(E) !== -1) return;
                x.push(E);
              }
              return E;
            }, 2)), x = null;
          }
          var w = [];
          this.options.includeMatches && w.push(function(k, E) {
            var O = k.output;
            E.matches = [];
            for (var P = 0, M = O.length; P < M; P += 1) {
              var L = O[P];
              if (L.matchedIndices.length !== 0) {
                var D = { indices: L.matchedIndices, value: L.value };
                L.key && (D.key = L.key), L.hasOwnProperty("arrayIndex") && L.arrayIndex > -1 && (D.arrayIndex = L.arrayIndex), E.matches.push(
                D);
              }
            }
          }), this.options.includeScore && w.push(function(k, E) {
            E.score = k.score;
          });
          for (var h = 0, b = m.length; h < b; h += 1) {
            var I = m[h];
            if (this.options.id && (I.item = this.options.getFn(I.item, this.options.id)[0]), w.length) {
              for (var C = { item: I.item }, _ = 0, T = w.length; _ < T; _ += 1) w[_](I, C);
              v.push(C);
            } else v.push(I.item);
          }
          return v;
        }, "value") }, { key: "_log", value: /* @__PURE__ */ a(function() {
          var m;
          this.options.verbose && (m = console).log.apply(m, arguments);
        }, "value") }]) && i(g.prototype, f), y && i(g, y), d;
      }();
      e.exports = p;
    }, function(e, t, r) {
      function n(c, p) {
        for (var d = 0; d < p.length; d++) {
          var g = p[d];
          g.enumerable = g.enumerable || !1, g.configurable = !0, "value" in g && (g.writable = !0), Object.defineProperty(c, g.key, g);
        }
      }
      a(n, "n");
      var i = r(2), o = r(3), s = r(6), u = function() {
        function c(f, y) {
          var m = y.location, v = m === void 0 ? 0 : m, x = y.distance, w = x === void 0 ? 100 : x, h = y.threshold, b = h === void 0 ? 0.6 :
          h, I = y.maxPatternLength, C = I === void 0 ? 32 : I, _ = y.isCaseSensitive, T = _ !== void 0 && _, k = y.tokenSeparator, E = k ===
          void 0 ? / +/g : k, O = y.findAllMatches, P = O !== void 0 && O, M = y.minMatchCharLength, L = M === void 0 ? 1 : M, D = y.includeMatches,
          V = D !== void 0 && D;
          (function(X, Z) {
            if (!(X instanceof Z)) throw new TypeError("Cannot call a class as a function");
          })(this, c), this.options = { location: v, distance: w, threshold: b, maxPatternLength: C, isCaseSensitive: T, tokenSeparator: E, findAllMatches: P,
          includeMatches: V, minMatchCharLength: L }, this.pattern = T ? f : f.toLowerCase(), this.pattern.length <= C && (this.patternAlphabet =
          s(this.pattern));
        }
        a(c, "e");
        var p, d, g;
        return p = c, (d = [{ key: "search", value: /* @__PURE__ */ a(function(f) {
          var y = this.options, m = y.isCaseSensitive, v = y.includeMatches;
          if (m || (f = f.toLowerCase()), this.pattern === f) {
            var x = { isMatch: !0, score: 0 };
            return v && (x.matchedIndices = [[0, f.length - 1]]), x;
          }
          var w = this.options, h = w.maxPatternLength, b = w.tokenSeparator;
          if (this.pattern.length > h) return i(f, this.pattern, b);
          var I = this.options, C = I.location, _ = I.distance, T = I.threshold, k = I.findAllMatches, E = I.minMatchCharLength;
          return o(f, this.pattern, this.patternAlphabet, { location: C, distance: _, threshold: T, findAllMatches: k, minMatchCharLength: E,
          includeMatches: v });
        }, "value") }]) && n(p.prototype, d), g && n(p, g), c;
      }();
      e.exports = u;
    }, function(e, t) {
      var r = /[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g;
      e.exports = function(n, i) {
        var o = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : / +/g, s = new RegExp(i.replace(r, "\\$&").replace(o, "|")),
        u = n.match(s), c = !!u, p = [];
        if (c) for (var d = 0, g = u.length; d < g; d += 1) {
          var f = u[d];
          p.push([n.indexOf(f), f.length - 1]);
        }
        return { score: c ? 0.5 : 1, isMatch: c, matchedIndices: p };
      };
    }, function(e, t, r) {
      var n = r(4), i = r(5);
      e.exports = function(o, s, u, c) {
        for (var p = c.location, d = p === void 0 ? 0 : p, g = c.distance, f = g === void 0 ? 100 : g, y = c.threshold, m = y === void 0 ? 0.6 :
        y, v = c.findAllMatches, x = v !== void 0 && v, w = c.minMatchCharLength, h = w === void 0 ? 1 : w, b = c.includeMatches, I = b !== void 0 &&
        b, C = d, _ = o.length, T = m, k = o.indexOf(s, C), E = s.length, O = [], P = 0; P < _; P += 1) O[P] = 0;
        if (k !== -1) {
          var M = n(s, { errors: 0, currentLocation: k, expectedLocation: C, distance: f });
          if (T = Math.min(M, T), (k = o.lastIndexOf(s, C + E)) !== -1) {
            var L = n(s, { errors: 0, currentLocation: k, expectedLocation: C, distance: f });
            T = Math.min(L, T);
          }
        }
        k = -1;
        for (var D = [], V = 1, X = E + _, Z = 1 << (E <= 31 ? E - 1 : 30), R = 0; R < E; R += 1) {
          for (var z = 0, H = X; z < H; )
            n(s, { errors: R, currentLocation: C + H, expectedLocation: C, distance: f }) <= T ? z = H : X = H, H = Math.floor((X - z) / 2 +
            z);
          X = H;
          var te = Math.max(1, C - H + 1), B = x ? _ : Math.min(C + H, _) + E, N = Array(B + 2);
          N[B + 1] = (1 << R) - 1;
          for (var F = B; F >= te; F -= 1) {
            var $ = F - 1, Y = u[o.charAt($)];
            if (Y && (O[$] = 1), N[F] = (N[F + 1] << 1 | 1) & Y, R !== 0 && (N[F] |= (D[F + 1] | D[F]) << 1 | 1 | D[F + 1]), N[F] & Z && (V =
            n(s, { errors: R, currentLocation: $, expectedLocation: C, distance: f })) <= T) {
              if (T = V, (k = $) <= C) break;
              te = Math.max(1, 2 * C - k);
            }
          }
          if (n(s, { errors: R + 1, currentLocation: C, expectedLocation: C, distance: f }) > T) break;
          D = N;
        }
        var re = { isMatch: k >= 0, score: V === 0 ? 1e-3 : V };
        return I && (re.matchedIndices = i(O, h)), re;
      };
    }, function(e, t) {
      e.exports = function(r, n) {
        var i = n.errors, o = i === void 0 ? 0 : i, s = n.currentLocation, u = s === void 0 ? 0 : s, c = n.expectedLocation, p = c === void 0 ?
        0 : c, d = n.distance, g = d === void 0 ? 100 : d, f = o / r.length, y = Math.abs(p - u);
        return g ? f + y / g : y ? 1 : f;
      };
    }, function(e, t) {
      e.exports = function() {
        for (var r = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [], n = arguments.length > 1 && arguments[1] !== void 0 ?
        arguments[1] : 1, i = [], o = -1, s = -1, u = 0, c = r.length; u < c; u += 1) {
          var p = r[u];
          p && o === -1 ? o = u : p || o === -1 || ((s = u - 1) - o + 1 >= n && i.push([o, s]), o = -1);
        }
        return r[u - 1] && u - o >= n && i.push([o, u - 1]), i;
      };
    }, function(e, t) {
      e.exports = function(r) {
        for (var n = {}, i = r.length, o = 0; o < i; o += 1) n[r.charAt(o)] = 0;
        for (var s = 0; s < i; s += 1) n[r.charAt(s)] |= 1 << i - s - 1;
        return n;
      };
    }, function(e, t) {
      var r = /* @__PURE__ */ a(function(s) {
        return Array.isArray ? Array.isArray(s) : Object.prototype.toString.call(s) === "[object Array]";
      }, "r"), n = /* @__PURE__ */ a(function(s) {
        return s == null ? "" : function(u) {
          if (typeof u == "string") return u;
          var c = u + "";
          return c == "0" && 1 / u == -1 / 0 ? "-0" : c;
        }(s);
      }, "n"), i = /* @__PURE__ */ a(function(s) {
        return typeof s == "string";
      }, "o"), o = /* @__PURE__ */ a(function(s) {
        return typeof s == "number";
      }, "i");
      e.exports = { get: /* @__PURE__ */ a(function(s, u) {
        var c = [];
        return (/* @__PURE__ */ a(function p(d, g) {
          if (g) {
            var f = g.indexOf("."), y = g, m = null;
            f !== -1 && (y = g.slice(0, f), m = g.slice(f + 1));
            var v = d[y];
            if (v != null) if (m || !i(v) && !o(v)) if (r(v)) for (var x = 0, w = v.length; x < w; x += 1) p(v[x], m);
            else m && p(v, m);
            else c.push(n(v));
          } else c.push(d);
        }, "e"))(s, u), c;
      }, "get"), isArray: r, isString: i, isNum: o, toString: n };
    }]);
  });
});

// ../node_modules/store2/dist/store2.js
var Up = W((oo, io) => {
  (function(e, t) {
    var r = {
      version: "2.14.2",
      areas: {},
      apis: {},
      nsdelim: ".",
      // utilities
      inherit: /* @__PURE__ */ a(function(i, o) {
        for (var s in i)
          o.hasOwnProperty(s) || Object.defineProperty(o, s, Object.getOwnPropertyDescriptor(i, s));
        return o;
      }, "inherit"),
      stringify: /* @__PURE__ */ a(function(i, o) {
        return i === void 0 || typeof i == "function" ? i + "" : JSON.stringify(i, o || r.replace);
      }, "stringify"),
      parse: /* @__PURE__ */ a(function(i, o) {
        try {
          return JSON.parse(i, o || r.revive);
        } catch {
          return i;
        }
      }, "parse"),
      // extension hooks
      fn: /* @__PURE__ */ a(function(i, o) {
        r.storeAPI[i] = o;
        for (var s in r.apis)
          r.apis[s][i] = o;
      }, "fn"),
      get: /* @__PURE__ */ a(function(i, o) {
        return i.getItem(o);
      }, "get"),
      set: /* @__PURE__ */ a(function(i, o, s) {
        i.setItem(o, s);
      }, "set"),
      remove: /* @__PURE__ */ a(function(i, o) {
        i.removeItem(o);
      }, "remove"),
      key: /* @__PURE__ */ a(function(i, o) {
        return i.key(o);
      }, "key"),
      length: /* @__PURE__ */ a(function(i) {
        return i.length;
      }, "length"),
      clear: /* @__PURE__ */ a(function(i) {
        i.clear();
      }, "clear"),
      // core functions
      Store: /* @__PURE__ */ a(function(i, o, s) {
        var u = r.inherit(r.storeAPI, function(p, d, g) {
          return arguments.length === 0 ? u.getAll() : typeof d == "function" ? u.transact(p, d, g) : d !== void 0 ? u.set(p, d, g) : typeof p ==
          "string" || typeof p == "number" ? u.get(p) : typeof p == "function" ? u.each(p) : p ? u.setAll(p, d) : u.clear();
        });
        u._id = i;
        try {
          var c = "__store2_test";
          o.setItem(c, "ok"), u._area = o, o.removeItem(c);
        } catch {
          u._area = r.storage("fake");
        }
        return u._ns = s || "", r.areas[i] || (r.areas[i] = u._area), r.apis[u._ns + u._id] || (r.apis[u._ns + u._id] = u), u;
      }, "Store"),
      storeAPI: {
        // admin functions
        area: /* @__PURE__ */ a(function(i, o) {
          var s = this[i];
          return (!s || !s.area) && (s = r.Store(i, o, this._ns), this[i] || (this[i] = s)), s;
        }, "area"),
        namespace: /* @__PURE__ */ a(function(i, o, s) {
          if (s = s || this._delim || r.nsdelim, !i)
            return this._ns ? this._ns.substring(0, this._ns.length - s.length) : "";
          var u = i, c = this[u];
          if ((!c || !c.namespace) && (c = r.Store(this._id, this._area, this._ns + u + s), c._delim = s, this[u] || (this[u] = c), !o))
            for (var p in r.areas)
              c.area(p, r.areas[p]);
          return c;
        }, "namespace"),
        isFake: /* @__PURE__ */ a(function(i) {
          return i ? (this._real = this._area, this._area = r.storage("fake")) : i === !1 && (this._area = this._real || this._area), this._area.
          name === "fake";
        }, "isFake"),
        toString: /* @__PURE__ */ a(function() {
          return "store" + (this._ns ? "." + this.namespace() : "") + "[" + this._id + "]";
        }, "toString"),
        // storage functions
        has: /* @__PURE__ */ a(function(i) {
          return this._area.has ? this._area.has(this._in(i)) : this._in(i) in this._area;
        }, "has"),
        size: /* @__PURE__ */ a(function() {
          return this.keys().length;
        }, "size"),
        each: /* @__PURE__ */ a(function(i, o) {
          for (var s = 0, u = r.length(this._area); s < u; s++) {
            var c = this._out(r.key(this._area, s));
            if (c !== void 0 && i.call(this, c, this.get(c), o) === !1)
              break;
            u > r.length(this._area) && (u--, s--);
          }
          return o || this;
        }, "each"),
        keys: /* @__PURE__ */ a(function(i) {
          return this.each(function(o, s, u) {
            u.push(o);
          }, i || []);
        }, "keys"),
        get: /* @__PURE__ */ a(function(i, o) {
          var s = r.get(this._area, this._in(i)), u;
          return typeof o == "function" && (u = o, o = null), s !== null ? r.parse(s, u) : o ?? s;
        }, "get"),
        getAll: /* @__PURE__ */ a(function(i) {
          return this.each(function(o, s, u) {
            u[o] = s;
          }, i || {});
        }, "getAll"),
        transact: /* @__PURE__ */ a(function(i, o, s) {
          var u = this.get(i, s), c = o(u);
          return this.set(i, c === void 0 ? u : c), this;
        }, "transact"),
        set: /* @__PURE__ */ a(function(i, o, s) {
          var u = this.get(i), c;
          return u != null && s === !1 ? o : (typeof s == "function" && (c = s, s = void 0), r.set(this._area, this._in(i), r.stringify(o, c),
          s) || u);
        }, "set"),
        setAll: /* @__PURE__ */ a(function(i, o) {
          var s, u;
          for (var c in i)
            u = i[c], this.set(c, u, o) !== u && (s = !0);
          return s;
        }, "setAll"),
        add: /* @__PURE__ */ a(function(i, o, s) {
          var u = this.get(i);
          if (u instanceof Array)
            o = u.concat(o);
          else if (u !== null) {
            var c = typeof u;
            if (c === typeof o && c === "object") {
              for (var p in o)
                u[p] = o[p];
              o = u;
            } else
              o = u + o;
          }
          return r.set(this._area, this._in(i), r.stringify(o, s)), o;
        }, "add"),
        remove: /* @__PURE__ */ a(function(i, o) {
          var s = this.get(i, o);
          return r.remove(this._area, this._in(i)), s;
        }, "remove"),
        clear: /* @__PURE__ */ a(function() {
          return this._ns ? this.each(function(i) {
            r.remove(this._area, this._in(i));
          }, 1) : r.clear(this._area), this;
        }, "clear"),
        clearAll: /* @__PURE__ */ a(function() {
          var i = this._area;
          for (var o in r.areas)
            r.areas.hasOwnProperty(o) && (this._area = r.areas[o], this.clear());
          return this._area = i, this;
        }, "clearAll"),
        // internal use functions
        _in: /* @__PURE__ */ a(function(i) {
          return typeof i != "string" && (i = r.stringify(i)), this._ns ? this._ns + i : i;
        }, "_in"),
        _out: /* @__PURE__ */ a(function(i) {
          return this._ns ? i && i.indexOf(this._ns) === 0 ? i.substring(this._ns.length) : void 0 : (
            // so each() knows to skip it
            i
          );
        }, "_out")
      },
      // end _.storeAPI
      storage: /* @__PURE__ */ a(function(i) {
        return r.inherit(r.storageAPI, { items: {}, name: i });
      }, "storage"),
      storageAPI: {
        length: 0,
        has: /* @__PURE__ */ a(function(i) {
          return this.items.hasOwnProperty(i);
        }, "has"),
        key: /* @__PURE__ */ a(function(i) {
          var o = 0;
          for (var s in this.items)
            if (this.has(s) && i === o++)
              return s;
        }, "key"),
        setItem: /* @__PURE__ */ a(function(i, o) {
          this.has(i) || this.length++, this.items[i] = o;
        }, "setItem"),
        removeItem: /* @__PURE__ */ a(function(i) {
          this.has(i) && (delete this.items[i], this.length--);
        }, "removeItem"),
        getItem: /* @__PURE__ */ a(function(i) {
          return this.has(i) ? this.items[i] : null;
        }, "getItem"),
        clear: /* @__PURE__ */ a(function() {
          for (var i in this.items)
            this.removeItem(i);
        }, "clear")
      }
      // end _.storageAPI
    }, n = (
      // safely set this up (throws error in IE10/32bit mode for local files)
      r.Store("local", function() {
        try {
          return localStorage;
        } catch {
        }
      }())
    );
    n.local = n, n._ = r, n.area("session", function() {
      try {
        return sessionStorage;
      } catch {
      }
    }()), n.area("page", r.storage("page")), typeof t == "function" && t.amd !== void 0 ? t("store2", [], function() {
      return n;
    }) : typeof io < "u" && io.exports ? io.exports = n : (e.store && (r.conflict = e.store), e.store = n);
  })(oo, oo && oo.define);
});

// ../node_modules/toggle-selection/index.js
var ld = W((wN, sd) => {
  sd.exports = function() {
    var e = document.getSelection();
    if (!e.rangeCount)
      return function() {
      };
    for (var t = document.activeElement, r = [], n = 0; n < e.rangeCount; n++)
      r.push(e.getRangeAt(n));
    switch (t.tagName.toUpperCase()) {
      case "INPUT":
      case "TEXTAREA":
        t.blur();
        break;
      default:
        t = null;
        break;
    }
    return e.removeAllRanges(), function() {
      e.type === "Caret" && e.removeAllRanges(), e.rangeCount || r.forEach(function(i) {
        e.addRange(i);
      }), t && t.focus();
    };
  };
});

// ../node_modules/copy-to-clipboard/index.js
var pd = W((EN, cd) => {
  "use strict";
  var xb = ld(), ud = {
    "text/plain": "Text",
    "text/html": "Url",
    default: "Text"
  }, wb = "Copy to clipboard: #{key}, Enter";
  function Eb(e) {
    var t = (/mac os x/i.test(navigator.userAgent) ? "\u2318" : "Ctrl") + "+C";
    return e.replace(/#{\s*key\s*}/g, t);
  }
  a(Eb, "format");
  function Cb(e, t) {
    var r, n, i, o, s, u, c = !1;
    t || (t = {}), r = t.debug || !1;
    try {
      i = xb(), o = document.createRange(), s = document.getSelection(), u = document.createElement("span"), u.textContent = e, u.ariaHidden =
      "true", u.style.all = "unset", u.style.position = "fixed", u.style.top = 0, u.style.clip = "rect(0, 0, 0, 0)", u.style.whiteSpace = "p\
re", u.style.webkitUserSelect = "text", u.style.MozUserSelect = "text", u.style.msUserSelect = "text", u.style.userSelect = "text", u.addEventListener(
      "copy", function(d) {
        if (d.stopPropagation(), t.format)
          if (d.preventDefault(), typeof d.clipboardData > "u") {
            r && console.warn("unable to use e.clipboardData"), r && console.warn("trying IE specific stuff"), window.clipboardData.clearData();
            var g = ud[t.format] || ud.default;
            window.clipboardData.setData(g, e);
          } else
            d.clipboardData.clearData(), d.clipboardData.setData(t.format, e);
        t.onCopy && (d.preventDefault(), t.onCopy(d.clipboardData));
      }), document.body.appendChild(u), o.selectNodeContents(u), s.addRange(o);
      var p = document.execCommand("copy");
      if (!p)
        throw new Error("copy command was unsuccessful");
      c = !0;
    } catch (d) {
      r && console.error("unable to copy using execCommand: ", d), r && console.warn("trying IE specific stuff");
      try {
        window.clipboardData.setData(t.format || "text", e), t.onCopy && t.onCopy(window.clipboardData), c = !0;
      } catch (g) {
        r && console.error("unable to copy using clipboardData: ", g), r && console.error("falling back to prompt"), n = Eb("message" in t ?
        t.message : wb), window.prompt(n, e);
      }
    } finally {
      s && (typeof s.removeRange == "function" ? s.removeRange(o) : s.removeAllRanges()), u && document.body.removeChild(u), i();
    }
    return c;
  }
  a(Cb, "copy");
  cd.exports = Cb;
});

// ../node_modules/es-errors/index.js
var wd = W((mF, xd) => {
  "use strict";
  xd.exports = Error;
});

// ../node_modules/es-errors/eval.js
var Cd = W((hF, Ed) => {
  "use strict";
  Ed.exports = EvalError;
});

// ../node_modules/es-errors/range.js
var Td = W((gF, _d) => {
  "use strict";
  _d.exports = RangeError;
});

// ../node_modules/es-errors/ref.js
var Od = W((yF, kd) => {
  "use strict";
  kd.exports = ReferenceError;
});

// ../node_modules/es-errors/syntax.js
var la = W((vF, Pd) => {
  "use strict";
  Pd.exports = SyntaxError;
});

// ../node_modules/es-errors/type.js
var Br = W((bF, Ad) => {
  "use strict";
  Ad.exports = TypeError;
});

// ../node_modules/es-errors/uri.js
var Dd = W((IF, Md) => {
  "use strict";
  Md.exports = URIError;
});

// ../node_modules/has-symbols/shams.js
var Nd = W((SF, Ld) => {
  "use strict";
  Ld.exports = /* @__PURE__ */ a(function() {
    if (typeof Symbol != "function" || typeof Object.getOwnPropertySymbols != "function")
      return !1;
    if (typeof Symbol.iterator == "symbol")
      return !0;
    var t = {}, r = Symbol("test"), n = Object(r);
    if (typeof r == "string" || Object.prototype.toString.call(r) !== "[object Symbol]" || Object.prototype.toString.call(n) !== "[object Sy\
mbol]")
      return !1;
    var i = 42;
    t[r] = i;
    for (r in t)
      return !1;
    if (typeof Object.keys == "function" && Object.keys(t).length !== 0 || typeof Object.getOwnPropertyNames == "function" && Object.getOwnPropertyNames(
    t).length !== 0)
      return !1;
    var o = Object.getOwnPropertySymbols(t);
    if (o.length !== 1 || o[0] !== r || !Object.prototype.propertyIsEnumerable.call(t, r))
      return !1;
    if (typeof Object.getOwnPropertyDescriptor == "function") {
      var s = Object.getOwnPropertyDescriptor(t, r);
      if (s.value !== i || s.enumerable !== !0)
        return !1;
    }
    return !0;
  }, "hasSymbols");
});

// ../node_modules/has-symbols/index.js
var Bd = W((wF, Hd) => {
  "use strict";
  var Fd = typeof Symbol < "u" && Symbol, zb = Nd();
  Hd.exports = /* @__PURE__ */ a(function() {
    return typeof Fd != "function" || typeof Symbol != "function" || typeof Fd("foo") != "symbol" || typeof Symbol("bar") != "symbol" ? !1 :
    zb();
  }, "hasNativeSymbols");
});

// ../node_modules/has-proto/index.js
var zd = W((CF, Rd) => {
  "use strict";
  var ua = {
    __proto__: null,
    foo: {}
  }, $b = Object;
  Rd.exports = /* @__PURE__ */ a(function() {
    return { __proto__: ua }.foo === ua.foo && !(ua instanceof $b);
  }, "hasProto");
});

// ../node_modules/function-bind/implementation.js
var Vd = W((TF, Wd) => {
  "use strict";
  var Wb = "Function.prototype.bind called on incompatible ", Vb = Object.prototype.toString, Kb = Math.max, jb = "[object Function]", $d = /* @__PURE__ */ a(
  function(t, r) {
    for (var n = [], i = 0; i < t.length; i += 1)
      n[i] = t[i];
    for (var o = 0; o < r.length; o += 1)
      n[o + t.length] = r[o];
    return n;
  }, "concatty"), Ub = /* @__PURE__ */ a(function(t, r) {
    for (var n = [], i = r || 0, o = 0; i < t.length; i += 1, o += 1)
      n[o] = t[i];
    return n;
  }, "slicy"), qb = /* @__PURE__ */ a(function(e, t) {
    for (var r = "", n = 0; n < e.length; n += 1)
      r += e[n], n + 1 < e.length && (r += t);
    return r;
  }, "joiny");
  Wd.exports = /* @__PURE__ */ a(function(t) {
    var r = this;
    if (typeof r != "function" || Vb.apply(r) !== jb)
      throw new TypeError(Wb + r);
    for (var n = Ub(arguments, 1), i, o = /* @__PURE__ */ a(function() {
      if (this instanceof i) {
        var d = r.apply(
          this,
          $d(n, arguments)
        );
        return Object(d) === d ? d : this;
      }
      return r.apply(
        t,
        $d(n, arguments)
      );
    }, "binder"), s = Kb(0, r.length - n.length), u = [], c = 0; c < s; c++)
      u[c] = "$" + c;
    if (i = Function("binder", "return function (" + qb(u, ",") + "){ return binder.apply(this,arguments); }")(o), r.prototype) {
      var p = /* @__PURE__ */ a(function() {
      }, "Empty");
      p.prototype = r.prototype, i.prototype = new p(), p.prototype = null;
    }
    return i;
  }, "bind");
});

// ../node_modules/function-bind/index.js
var uo = W((OF, Kd) => {
  "use strict";
  var Gb = Vd();
  Kd.exports = Function.prototype.bind || Gb;
});

// ../node_modules/hasown/index.js
var Ud = W((PF, jd) => {
  "use strict";
  var Yb = Function.prototype.call, Qb = Object.prototype.hasOwnProperty, Xb = uo();
  jd.exports = Xb.call(Yb, Qb);
});

// ../node_modules/get-intrinsic/index.js
var Ht = W((AF, Xd) => {
  "use strict";
  var oe, Zb = wd(), Jb = Cd(), e0 = Td(), t0 = Od(), cr = la(), ur = Br(), r0 = Dd(), Qd = Function, ca = /* @__PURE__ */ a(function(e) {
    try {
      return Qd('"use strict"; return (' + e + ").constructor;")();
    } catch {
    }
  }, "getEvalledConstructor"), Nt = Object.getOwnPropertyDescriptor;
  if (Nt)
    try {
      Nt({}, "");
    } catch {
      Nt = null;
    }
  var pa = /* @__PURE__ */ a(function() {
    throw new ur();
  }, "throwTypeError"), n0 = Nt ? function() {
    try {
      return arguments.callee, pa;
    } catch {
      try {
        return Nt(arguments, "callee").get;
      } catch {
        return pa;
      }
    }
  }() : pa, sr = Bd()(), o0 = zd()(), ke = Object.getPrototypeOf || (o0 ? function(e) {
    return e.__proto__;
  } : null), lr = {}, i0 = typeof Uint8Array > "u" || !ke ? oe : ke(Uint8Array), Ft = {
    __proto__: null,
    "%AggregateError%": typeof AggregateError > "u" ? oe : AggregateError,
    "%Array%": Array,
    "%ArrayBuffer%": typeof ArrayBuffer > "u" ? oe : ArrayBuffer,
    "%ArrayIteratorPrototype%": sr && ke ? ke([][Symbol.iterator]()) : oe,
    "%AsyncFromSyncIteratorPrototype%": oe,
    "%AsyncFunction%": lr,
    "%AsyncGenerator%": lr,
    "%AsyncGeneratorFunction%": lr,
    "%AsyncIteratorPrototype%": lr,
    "%Atomics%": typeof Atomics > "u" ? oe : Atomics,
    "%BigInt%": typeof BigInt > "u" ? oe : BigInt,
    "%BigInt64Array%": typeof BigInt64Array > "u" ? oe : BigInt64Array,
    "%BigUint64Array%": typeof BigUint64Array > "u" ? oe : BigUint64Array,
    "%Boolean%": Boolean,
    "%DataView%": typeof DataView > "u" ? oe : DataView,
    "%Date%": Date,
    "%decodeURI%": decodeURI,
    "%decodeURIComponent%": decodeURIComponent,
    "%encodeURI%": encodeURI,
    "%encodeURIComponent%": encodeURIComponent,
    "%Error%": Zb,
    "%eval%": eval,
    // eslint-disable-line no-eval
    "%EvalError%": Jb,
    "%Float32Array%": typeof Float32Array > "u" ? oe : Float32Array,
    "%Float64Array%": typeof Float64Array > "u" ? oe : Float64Array,
    "%FinalizationRegistry%": typeof FinalizationRegistry > "u" ? oe : FinalizationRegistry,
    "%Function%": Qd,
    "%GeneratorFunction%": lr,
    "%Int8Array%": typeof Int8Array > "u" ? oe : Int8Array,
    "%Int16Array%": typeof Int16Array > "u" ? oe : Int16Array,
    "%Int32Array%": typeof Int32Array > "u" ? oe : Int32Array,
    "%isFinite%": isFinite,
    "%isNaN%": isNaN,
    "%IteratorPrototype%": sr && ke ? ke(ke([][Symbol.iterator]())) : oe,
    "%JSON%": typeof JSON == "object" ? JSON : oe,
    "%Map%": typeof Map > "u" ? oe : Map,
    "%MapIteratorPrototype%": typeof Map > "u" || !sr || !ke ? oe : ke((/* @__PURE__ */ new Map())[Symbol.iterator]()),
    "%Math%": Math,
    "%Number%": Number,
    "%Object%": Object,
    "%parseFloat%": parseFloat,
    "%parseInt%": parseInt,
    "%Promise%": typeof Promise > "u" ? oe : Promise,
    "%Proxy%": typeof Proxy > "u" ? oe : Proxy,
    "%RangeError%": e0,
    "%ReferenceError%": t0,
    "%Reflect%": typeof Reflect > "u" ? oe : Reflect,
    "%RegExp%": RegExp,
    "%Set%": typeof Set > "u" ? oe : Set,
    "%SetIteratorPrototype%": typeof Set > "u" || !sr || !ke ? oe : ke((/* @__PURE__ */ new Set())[Symbol.iterator]()),
    "%SharedArrayBuffer%": typeof SharedArrayBuffer > "u" ? oe : SharedArrayBuffer,
    "%String%": String,
    "%StringIteratorPrototype%": sr && ke ? ke(""[Symbol.iterator]()) : oe,
    "%Symbol%": sr ? Symbol : oe,
    "%SyntaxError%": cr,
    "%ThrowTypeError%": n0,
    "%TypedArray%": i0,
    "%TypeError%": ur,
    "%Uint8Array%": typeof Uint8Array > "u" ? oe : Uint8Array,
    "%Uint8ClampedArray%": typeof Uint8ClampedArray > "u" ? oe : Uint8ClampedArray,
    "%Uint16Array%": typeof Uint16Array > "u" ? oe : Uint16Array,
    "%Uint32Array%": typeof Uint32Array > "u" ? oe : Uint32Array,
    "%URIError%": r0,
    "%WeakMap%": typeof WeakMap > "u" ? oe : WeakMap,
    "%WeakRef%": typeof WeakRef > "u" ? oe : WeakRef,
    "%WeakSet%": typeof WeakSet > "u" ? oe : WeakSet
  };
  if (ke)
    try {
      null.error;
    } catch (e) {
      qd = ke(ke(e)), Ft["%Error.prototype%"] = qd;
    }
  var qd, a0 = /* @__PURE__ */ a(function e(t) {
    var r;
    if (t === "%AsyncFunction%")
      r = ca("async function () {}");
    else if (t === "%GeneratorFunction%")
      r = ca("function* () {}");
    else if (t === "%AsyncGeneratorFunction%")
      r = ca("async function* () {}");
    else if (t === "%AsyncGenerator%") {
      var n = e("%AsyncGeneratorFunction%");
      n && (r = n.prototype);
    } else if (t === "%AsyncIteratorPrototype%") {
      var i = e("%AsyncGenerator%");
      i && ke && (r = ke(i.prototype));
    }
    return Ft[t] = r, r;
  }, "doEval"), Gd = {
    __proto__: null,
    "%ArrayBufferPrototype%": ["ArrayBuffer", "prototype"],
    "%ArrayPrototype%": ["Array", "prototype"],
    "%ArrayProto_entries%": ["Array", "prototype", "entries"],
    "%ArrayProto_forEach%": ["Array", "prototype", "forEach"],
    "%ArrayProto_keys%": ["Array", "prototype", "keys"],
    "%ArrayProto_values%": ["Array", "prototype", "values"],
    "%AsyncFunctionPrototype%": ["AsyncFunction", "prototype"],
    "%AsyncGenerator%": ["AsyncGeneratorFunction", "prototype"],
    "%AsyncGeneratorPrototype%": ["AsyncGeneratorFunction", "prototype", "prototype"],
    "%BooleanPrototype%": ["Boolean", "prototype"],
    "%DataViewPrototype%": ["DataView", "prototype"],
    "%DatePrototype%": ["Date", "prototype"],
    "%ErrorPrototype%": ["Error", "prototype"],
    "%EvalErrorPrototype%": ["EvalError", "prototype"],
    "%Float32ArrayPrototype%": ["Float32Array", "prototype"],
    "%Float64ArrayPrototype%": ["Float64Array", "prototype"],
    "%FunctionPrototype%": ["Function", "prototype"],
    "%Generator%": ["GeneratorFunction", "prototype"],
    "%GeneratorPrototype%": ["GeneratorFunction", "prototype", "prototype"],
    "%Int8ArrayPrototype%": ["Int8Array", "prototype"],
    "%Int16ArrayPrototype%": ["Int16Array", "prototype"],
    "%Int32ArrayPrototype%": ["Int32Array", "prototype"],
    "%JSONParse%": ["JSON", "parse"],
    "%JSONStringify%": ["JSON", "stringify"],
    "%MapPrototype%": ["Map", "prototype"],
    "%NumberPrototype%": ["Number", "prototype"],
    "%ObjectPrototype%": ["Object", "prototype"],
    "%ObjProto_toString%": ["Object", "prototype", "toString"],
    "%ObjProto_valueOf%": ["Object", "prototype", "valueOf"],
    "%PromisePrototype%": ["Promise", "prototype"],
    "%PromiseProto_then%": ["Promise", "prototype", "then"],
    "%Promise_all%": ["Promise", "all"],
    "%Promise_reject%": ["Promise", "reject"],
    "%Promise_resolve%": ["Promise", "resolve"],
    "%RangeErrorPrototype%": ["RangeError", "prototype"],
    "%ReferenceErrorPrototype%": ["ReferenceError", "prototype"],
    "%RegExpPrototype%": ["RegExp", "prototype"],
    "%SetPrototype%": ["Set", "prototype"],
    "%SharedArrayBufferPrototype%": ["SharedArrayBuffer", "prototype"],
    "%StringPrototype%": ["String", "prototype"],
    "%SymbolPrototype%": ["Symbol", "prototype"],
    "%SyntaxErrorPrototype%": ["SyntaxError", "prototype"],
    "%TypedArrayPrototype%": ["TypedArray", "prototype"],
    "%TypeErrorPrototype%": ["TypeError", "prototype"],
    "%Uint8ArrayPrototype%": ["Uint8Array", "prototype"],
    "%Uint8ClampedArrayPrototype%": ["Uint8ClampedArray", "prototype"],
    "%Uint16ArrayPrototype%": ["Uint16Array", "prototype"],
    "%Uint32ArrayPrototype%": ["Uint32Array", "prototype"],
    "%URIErrorPrototype%": ["URIError", "prototype"],
    "%WeakMapPrototype%": ["WeakMap", "prototype"],
    "%WeakSetPrototype%": ["WeakSet", "prototype"]
  }, Rr = uo(), co = Ud(), s0 = Rr.call(Function.call, Array.prototype.concat), l0 = Rr.call(Function.apply, Array.prototype.splice), Yd = Rr.
  call(Function.call, String.prototype.replace), po = Rr.call(Function.call, String.prototype.slice), u0 = Rr.call(Function.call, RegExp.prototype.
  exec), c0 = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g, p0 = /\\(\\)?/g, d0 = /* @__PURE__ */ a(
  function(t) {
    var r = po(t, 0, 1), n = po(t, -1);
    if (r === "%" && n !== "%")
      throw new cr("invalid intrinsic syntax, expected closing `%`");
    if (n === "%" && r !== "%")
      throw new cr("invalid intrinsic syntax, expected opening `%`");
    var i = [];
    return Yd(t, c0, function(o, s, u, c) {
      i[i.length] = u ? Yd(c, p0, "$1") : s || o;
    }), i;
  }, "stringToPath"), f0 = /* @__PURE__ */ a(function(t, r) {
    var n = t, i;
    if (co(Gd, n) && (i = Gd[n], n = "%" + i[0] + "%"), co(Ft, n)) {
      var o = Ft[n];
      if (o === lr && (o = a0(n)), typeof o > "u" && !r)
        throw new ur("intrinsic " + t + " exists, but is not available. Please file an issue!");
      return {
        alias: i,
        name: n,
        value: o
      };
    }
    throw new cr("intrinsic " + t + " does not exist!");
  }, "getBaseIntrinsic");
  Xd.exports = /* @__PURE__ */ a(function(t, r) {
    if (typeof t != "string" || t.length === 0)
      throw new ur("intrinsic name must be a non-empty string");
    if (arguments.length > 1 && typeof r != "boolean")
      throw new ur('"allowMissing" argument must be a boolean');
    if (u0(/^%?[^%]*%?$/, t) === null)
      throw new cr("`%` may not be present anywhere but at the beginning and end of the intrinsic name");
    var n = d0(t), i = n.length > 0 ? n[0] : "", o = f0("%" + i + "%", r), s = o.name, u = o.value, c = !1, p = o.alias;
    p && (i = p[0], l0(n, s0([0, 1], p)));
    for (var d = 1, g = !0; d < n.length; d += 1) {
      var f = n[d], y = po(f, 0, 1), m = po(f, -1);
      if ((y === '"' || y === "'" || y === "`" || m === '"' || m === "'" || m === "`") && y !== m)
        throw new cr("property names with quotes must have matching quotes");
      if ((f === "constructor" || !g) && (c = !0), i += "." + f, s = "%" + i + "%", co(Ft, s))
        u = Ft[s];
      else if (u != null) {
        if (!(f in u)) {
          if (!r)
            throw new ur("base intrinsic for " + t + " exists, but the property is not available.");
          return;
        }
        if (Nt && d + 1 >= n.length) {
          var v = Nt(u, f);
          g = !!v, g && "get" in v && !("originalValue" in v.get) ? u = v.get : u = u[f];
        } else
          g = co(u, f), u = u[f];
        g && !c && (Ft[s] = u);
      }
    }
    return u;
  }, "GetIntrinsic");
});

// ../node_modules/es-define-property/index.js
var mo = W((DF, Zd) => {
  "use strict";
  var m0 = Ht(), fo = m0("%Object.defineProperty%", !0) || !1;
  if (fo)
    try {
      fo({}, "a", { value: 1 });
    } catch {
      fo = !1;
    }
  Zd.exports = fo;
});

// ../node_modules/gopd/index.js
var da = W((LF, Jd) => {
  "use strict";
  var h0 = Ht(), ho = h0("%Object.getOwnPropertyDescriptor%", !0);
  if (ho)
    try {
      ho([], "length");
    } catch {
      ho = null;
    }
  Jd.exports = ho;
});

// ../node_modules/define-data-property/index.js
var nf = W((NF, rf) => {
  "use strict";
  var ef = mo(), g0 = la(), pr = Br(), tf = da();
  rf.exports = /* @__PURE__ */ a(function(t, r, n) {
    if (!t || typeof t != "object" && typeof t != "function")
      throw new pr("`obj` must be an object or a function`");
    if (typeof r != "string" && typeof r != "symbol")
      throw new pr("`property` must be a string or a symbol`");
    if (arguments.length > 3 && typeof arguments[3] != "boolean" && arguments[3] !== null)
      throw new pr("`nonEnumerable`, if provided, must be a boolean or null");
    if (arguments.length > 4 && typeof arguments[4] != "boolean" && arguments[4] !== null)
      throw new pr("`nonWritable`, if provided, must be a boolean or null");
    if (arguments.length > 5 && typeof arguments[5] != "boolean" && arguments[5] !== null)
      throw new pr("`nonConfigurable`, if provided, must be a boolean or null");
    if (arguments.length > 6 && typeof arguments[6] != "boolean")
      throw new pr("`loose`, if provided, must be a boolean");
    var i = arguments.length > 3 ? arguments[3] : null, o = arguments.length > 4 ? arguments[4] : null, s = arguments.length > 5 ? arguments[5] :
    null, u = arguments.length > 6 ? arguments[6] : !1, c = !!tf && tf(t, r);
    if (ef)
      ef(t, r, {
        configurable: s === null && c ? c.configurable : !s,
        enumerable: i === null && c ? c.enumerable : !i,
        value: n,
        writable: o === null && c ? c.writable : !o
      });
    else if (u || !i && !o && !s)
      t[r] = n;
    else
      throw new g0("This environment does not support defining a property as non-configurable, non-writable, or non-enumerable.");
  }, "defineDataProperty");
});

// ../node_modules/has-property-descriptors/index.js
var sf = W((HF, af) => {
  "use strict";
  var fa = mo(), of = /* @__PURE__ */ a(function() {
    return !!fa;
  }, "hasPropertyDescriptors");
  of.hasArrayLengthDefineBug = /* @__PURE__ */ a(function() {
    if (!fa)
      return null;
    try {
      return fa([], "length", { value: 1 }).length !== 1;
    } catch {
      return !0;
    }
  }, "hasArrayLengthDefineBug");
  af.exports = of;
});

// ../node_modules/set-function-length/index.js
var df = W((RF, pf) => {
  "use strict";
  var y0 = Ht(), lf = nf(), v0 = sf()(), uf = da(), cf = Br(), b0 = y0("%Math.floor%");
  pf.exports = /* @__PURE__ */ a(function(t, r) {
    if (typeof t != "function")
      throw new cf("`fn` is not a function");
    if (typeof r != "number" || r < 0 || r > 4294967295 || b0(r) !== r)
      throw new cf("`length` must be a positive 32-bit integer");
    var n = arguments.length > 2 && !!arguments[2], i = !0, o = !0;
    if ("length" in t && uf) {
      var s = uf(t, "length");
      s && !s.configurable && (i = !1), s && !s.writable && (o = !1);
    }
    return (i || o || !n) && (v0 ? lf(
      /** @type {Parameters<define>[0]} */
      t,
      "length",
      r,
      !0,
      !0
    ) : lf(
      /** @type {Parameters<define>[0]} */
      t,
      "length",
      r
    )), t;
  }, "setFunctionLength");
});

// ../node_modules/call-bind/index.js
var vf = W(($F, go) => {
  "use strict";
  var ma = uo(), yo = Ht(), I0 = df(), S0 = Br(), hf = yo("%Function.prototype.apply%"), gf = yo("%Function.prototype.call%"), yf = yo("%Ref\
lect.apply%", !0) || ma.call(gf, hf), ff = mo(), x0 = yo("%Math.max%");
  go.exports = /* @__PURE__ */ a(function(t) {
    if (typeof t != "function")
      throw new S0("a function is required");
    var r = yf(ma, gf, arguments);
    return I0(
      r,
      1 + x0(0, t.length - (arguments.length - 1)),
      !0
    );
  }, "callBind");
  var mf = /* @__PURE__ */ a(function() {
    return yf(ma, hf, arguments);
  }, "applyBind");
  ff ? ff(go.exports, "apply", { value: mf }) : go.exports.apply = mf;
});

// ../node_modules/call-bind/callBound.js
var xf = W((VF, Sf) => {
  "use strict";
  var bf = Ht(), If = vf(), w0 = If(bf("String.prototype.indexOf"));
  Sf.exports = /* @__PURE__ */ a(function(t, r) {
    var n = bf(t, !!r);
    return typeof n == "function" && w0(t, ".prototype.") > -1 ? If(n) : n;
  }, "callBoundIntrinsic");
});

// (disabled):../node_modules/object-inspect/util.inspect
var wf = W(() => {
});

// ../node_modules/object-inspect/index.js
var Vf = W((qF, Wf) => {
  var Ea = typeof Map == "function" && Map.prototype, ha = Object.getOwnPropertyDescriptor && Ea ? Object.getOwnPropertyDescriptor(Map.prototype,
  "size") : null, bo = Ea && ha && typeof ha.get == "function" ? ha.get : null, Ef = Ea && Map.prototype.forEach, Ca = typeof Set == "functi\
on" && Set.prototype, ga = Object.getOwnPropertyDescriptor && Ca ? Object.getOwnPropertyDescriptor(Set.prototype, "size") : null, Io = Ca &&
  ga && typeof ga.get == "function" ? ga.get : null, Cf = Ca && Set.prototype.forEach, E0 = typeof WeakMap == "function" && WeakMap.prototype,
  $r = E0 ? WeakMap.prototype.has : null, C0 = typeof WeakSet == "function" && WeakSet.prototype, Wr = C0 ? WeakSet.prototype.has : null, _0 = typeof WeakRef ==
  "function" && WeakRef.prototype, _f = _0 ? WeakRef.prototype.deref : null, T0 = Boolean.prototype.valueOf, k0 = Object.prototype.toString,
  O0 = Function.prototype.toString, P0 = String.prototype.match, _a = String.prototype.slice, bt = String.prototype.replace, A0 = String.prototype.
  toUpperCase, Tf = String.prototype.toLowerCase, Ff = RegExp.prototype.test, kf = Array.prototype.concat, nt = Array.prototype.join, M0 = Array.
  prototype.slice, Of = Math.floor, ba = typeof BigInt == "function" ? BigInt.prototype.valueOf : null, ya = Object.getOwnPropertySymbols, Ia = typeof Symbol ==
  "function" && typeof Symbol.iterator == "symbol" ? Symbol.prototype.toString : null, dr = typeof Symbol == "function" && typeof Symbol.iterator ==
  "object", De = typeof Symbol == "function" && Symbol.toStringTag && (typeof Symbol.toStringTag === dr || !0) ? Symbol.toStringTag : null, Hf = Object.
  prototype.propertyIsEnumerable, Pf = (typeof Reflect == "function" ? Reflect.getPrototypeOf : Object.getPrototypeOf) || ([].__proto__ === Array.
  prototype ? function(e) {
    return e.__proto__;
  } : null);
  function Af(e, t) {
    if (e === 1 / 0 || e === -1 / 0 || e !== e || e && e > -1e3 && e < 1e3 || Ff.call(/e/, t))
      return t;
    var r = /[0-9](?=(?:[0-9]{3})+(?![0-9]))/g;
    if (typeof e == "number") {
      var n = e < 0 ? -Of(-e) : Of(e);
      if (n !== e) {
        var i = String(n), o = _a.call(t, i.length + 1);
        return bt.call(i, r, "$&_") + "." + bt.call(bt.call(o, /([0-9]{3})/g, "$&_"), /_$/, "");
      }
    }
    return bt.call(t, r, "$&_");
  }
  a(Af, "addNumericSeparator");
  var Sa = wf(), Mf = Sa.custom, Df = Rf(Mf) ? Mf : null;
  Wf.exports = /* @__PURE__ */ a(function e(t, r, n, i) {
    var o = r || {};
    if (vt(o, "quoteStyle") && o.quoteStyle !== "single" && o.quoteStyle !== "double")
      throw new TypeError('option "quoteStyle" must be "single" or "double"');
    if (vt(o, "maxStringLength") && (typeof o.maxStringLength == "number" ? o.maxStringLength < 0 && o.maxStringLength !== 1 / 0 : o.maxStringLength !==
    null))
      throw new TypeError('option "maxStringLength", if provided, must be a positive integer, Infinity, or `null`');
    var s = vt(o, "customInspect") ? o.customInspect : !0;
    if (typeof s != "boolean" && s !== "symbol")
      throw new TypeError("option \"customInspect\", if provided, must be `true`, `false`, or `'symbol'`");
    if (vt(o, "indent") && o.indent !== null && o.indent !== "	" && !(parseInt(o.indent, 10) === o.indent && o.indent > 0))
      throw new TypeError('option "indent" must be "\\t", an integer > 0, or `null`');
    if (vt(o, "numericSeparator") && typeof o.numericSeparator != "boolean")
      throw new TypeError('option "numericSeparator", if provided, must be `true` or `false`');
    var u = o.numericSeparator;
    if (typeof t > "u")
      return "undefined";
    if (t === null)
      return "null";
    if (typeof t == "boolean")
      return t ? "true" : "false";
    if (typeof t == "string")
      return $f(t, o);
    if (typeof t == "number") {
      if (t === 0)
        return 1 / 0 / t > 0 ? "0" : "-0";
      var c = String(t);
      return u ? Af(t, c) : c;
    }
    if (typeof t == "bigint") {
      var p = String(t) + "n";
      return u ? Af(t, p) : p;
    }
    var d = typeof o.depth > "u" ? 5 : o.depth;
    if (typeof n > "u" && (n = 0), n >= d && d > 0 && typeof t == "object")
      return xa(t) ? "[Array]" : "[Object]";
    var g = Q0(o, n);
    if (typeof i > "u")
      i = [];
    else if (zf(i, t) >= 0)
      return "[Circular]";
    function f(L, D, V) {
      if (D && (i = M0.call(i), i.push(D)), V) {
        var X = {
          depth: o.depth
        };
        return vt(o, "quoteStyle") && (X.quoteStyle = o.quoteStyle), e(L, X, n + 1, i);
      }
      return e(L, o, n + 1, i);
    }
    if (a(f, "inspect"), typeof t == "function" && !Lf(t)) {
      var y = $0(t), m = vo(t, f);
      return "[Function" + (y ? ": " + y : " (anonymous)") + "]" + (m.length > 0 ? " { " + nt.call(m, ", ") + " }" : "");
    }
    if (Rf(t)) {
      var v = dr ? bt.call(String(t), /^(Symbol\(.*\))_[^)]*$/, "$1") : Ia.call(t);
      return typeof t == "object" && !dr ? zr(v) : v;
    }
    if (q0(t)) {
      for (var x = "<" + Tf.call(String(t.nodeName)), w = t.attributes || [], h = 0; h < w.length; h++)
        x += " " + w[h].name + "=" + Bf(D0(w[h].value), "double", o);
      return x += ">", t.childNodes && t.childNodes.length && (x += "..."), x += "</" + Tf.call(String(t.nodeName)) + ">", x;
    }
    if (xa(t)) {
      if (t.length === 0)
        return "[]";
      var b = vo(t, f);
      return g && !Y0(b) ? "[" + wa(b, g) + "]" : "[ " + nt.call(b, ", ") + " ]";
    }
    if (N0(t)) {
      var I = vo(t, f);
      return !("cause" in Error.prototype) && "cause" in t && !Hf.call(t, "cause") ? "{ [" + String(t) + "] " + nt.call(kf.call("[cause]: " +
      f(t.cause), I), ", ") + " }" : I.length === 0 ? "[" + String(t) + "]" : "{ [" + String(t) + "] " + nt.call(I, ", ") + " }";
    }
    if (typeof t == "object" && s) {
      if (Df && typeof t[Df] == "function" && Sa)
        return Sa(t, { depth: d - n });
      if (s !== "symbol" && typeof t.inspect == "function")
        return t.inspect();
    }
    if (W0(t)) {
      var C = [];
      return Ef && Ef.call(t, function(L, D) {
        C.push(f(D, t, !0) + " => " + f(L, t));
      }), Nf("Map", bo.call(t), C, g);
    }
    if (j0(t)) {
      var _ = [];
      return Cf && Cf.call(t, function(L) {
        _.push(f(L, t));
      }), Nf("Set", Io.call(t), _, g);
    }
    if (V0(t))
      return va("WeakMap");
    if (U0(t))
      return va("WeakSet");
    if (K0(t))
      return va("WeakRef");
    if (H0(t))
      return zr(f(Number(t)));
    if (R0(t))
      return zr(f(ba.call(t)));
    if (B0(t))
      return zr(T0.call(t));
    if (F0(t))
      return zr(f(String(t)));
    if (typeof window < "u" && t === window)
      return "{ [object Window] }";
    if (t === global)
      return "{ [object globalThis] }";
    if (!L0(t) && !Lf(t)) {
      var T = vo(t, f), k = Pf ? Pf(t) === Object.prototype : t instanceof Object || t.constructor === Object, E = t instanceof Object ? "" :
      "null prototype", O = !k && De && Object(t) === t && De in t ? _a.call(It(t), 8, -1) : E ? "Object" : "", P = k || typeof t.constructor !=
      "function" ? "" : t.constructor.name ? t.constructor.name + " " : "", M = P + (O || E ? "[" + nt.call(kf.call([], O || [], E || []), "\
: ") + "] " : "");
      return T.length === 0 ? M + "{}" : g ? M + "{" + wa(T, g) + "}" : M + "{ " + nt.call(T, ", ") + " }";
    }
    return String(t);
  }, "inspect_");
  function Bf(e, t, r) {
    var n = (r.quoteStyle || t) === "double" ? '"' : "'";
    return n + e + n;
  }
  a(Bf, "wrapQuotes");
  function D0(e) {
    return bt.call(String(e), /"/g, "&quot;");
  }
  a(D0, "quote");
  function xa(e) {
    return It(e) === "[object Array]" && (!De || !(typeof e == "object" && De in e));
  }
  a(xa, "isArray");
  function L0(e) {
    return It(e) === "[object Date]" && (!De || !(typeof e == "object" && De in e));
  }
  a(L0, "isDate");
  function Lf(e) {
    return It(e) === "[object RegExp]" && (!De || !(typeof e == "object" && De in e));
  }
  a(Lf, "isRegExp");
  function N0(e) {
    return It(e) === "[object Error]" && (!De || !(typeof e == "object" && De in e));
  }
  a(N0, "isError");
  function F0(e) {
    return It(e) === "[object String]" && (!De || !(typeof e == "object" && De in e));
  }
  a(F0, "isString");
  function H0(e) {
    return It(e) === "[object Number]" && (!De || !(typeof e == "object" && De in e));
  }
  a(H0, "isNumber");
  function B0(e) {
    return It(e) === "[object Boolean]" && (!De || !(typeof e == "object" && De in e));
  }
  a(B0, "isBoolean");
  function Rf(e) {
    if (dr)
      return e && typeof e == "object" && e instanceof Symbol;
    if (typeof e == "symbol")
      return !0;
    if (!e || typeof e != "object" || !Ia)
      return !1;
    try {
      return Ia.call(e), !0;
    } catch {
    }
    return !1;
  }
  a(Rf, "isSymbol");
  function R0(e) {
    if (!e || typeof e != "object" || !ba)
      return !1;
    try {
      return ba.call(e), !0;
    } catch {
    }
    return !1;
  }
  a(R0, "isBigInt");
  var z0 = Object.prototype.hasOwnProperty || function(e) {
    return e in this;
  };
  function vt(e, t) {
    return z0.call(e, t);
  }
  a(vt, "has");
  function It(e) {
    return k0.call(e);
  }
  a(It, "toStr");
  function $0(e) {
    if (e.name)
      return e.name;
    var t = P0.call(O0.call(e), /^function\s*([\w$]+)/);
    return t ? t[1] : null;
  }
  a($0, "nameOf");
  function zf(e, t) {
    if (e.indexOf)
      return e.indexOf(t);
    for (var r = 0, n = e.length; r < n; r++)
      if (e[r] === t)
        return r;
    return -1;
  }
  a(zf, "indexOf");
  function W0(e) {
    if (!bo || !e || typeof e != "object")
      return !1;
    try {
      bo.call(e);
      try {
        Io.call(e);
      } catch {
        return !0;
      }
      return e instanceof Map;
    } catch {
    }
    return !1;
  }
  a(W0, "isMap");
  function V0(e) {
    if (!$r || !e || typeof e != "object")
      return !1;
    try {
      $r.call(e, $r);
      try {
        Wr.call(e, Wr);
      } catch {
        return !0;
      }
      return e instanceof WeakMap;
    } catch {
    }
    return !1;
  }
  a(V0, "isWeakMap");
  function K0(e) {
    if (!_f || !e || typeof e != "object")
      return !1;
    try {
      return _f.call(e), !0;
    } catch {
    }
    return !1;
  }
  a(K0, "isWeakRef");
  function j0(e) {
    if (!Io || !e || typeof e != "object")
      return !1;
    try {
      Io.call(e);
      try {
        bo.call(e);
      } catch {
        return !0;
      }
      return e instanceof Set;
    } catch {
    }
    return !1;
  }
  a(j0, "isSet");
  function U0(e) {
    if (!Wr || !e || typeof e != "object")
      return !1;
    try {
      Wr.call(e, Wr);
      try {
        $r.call(e, $r);
      } catch {
        return !0;
      }
      return e instanceof WeakSet;
    } catch {
    }
    return !1;
  }
  a(U0, "isWeakSet");
  function q0(e) {
    return !e || typeof e != "object" ? !1 : typeof HTMLElement < "u" && e instanceof HTMLElement ? !0 : typeof e.nodeName == "string" && typeof e.
    getAttribute == "function";
  }
  a(q0, "isElement");
  function $f(e, t) {
    if (e.length > t.maxStringLength) {
      var r = e.length - t.maxStringLength, n = "... " + r + " more character" + (r > 1 ? "s" : "");
      return $f(_a.call(e, 0, t.maxStringLength), t) + n;
    }
    var i = bt.call(bt.call(e, /(['\\])/g, "\\$1"), /[\x00-\x1f]/g, G0);
    return Bf(i, "single", t);
  }
  a($f, "inspectString");
  function G0(e) {
    var t = e.charCodeAt(0), r = {
      8: "b",
      9: "t",
      10: "n",
      12: "f",
      13: "r"
    }[t];
    return r ? "\\" + r : "\\x" + (t < 16 ? "0" : "") + A0.call(t.toString(16));
  }
  a(G0, "lowbyte");
  function zr(e) {
    return "Object(" + e + ")";
  }
  a(zr, "markBoxed");
  function va(e) {
    return e + " { ? }";
  }
  a(va, "weakCollectionOf");
  function Nf(e, t, r, n) {
    var i = n ? wa(r, n) : nt.call(r, ", ");
    return e + " (" + t + ") {" + i + "}";
  }
  a(Nf, "collectionOf");
  function Y0(e) {
    for (var t = 0; t < e.length; t++)
      if (zf(e[t], `
`) >= 0)
        return !1;
    return !0;
  }
  a(Y0, "singleLineValues");
  function Q0(e, t) {
    var r;
    if (e.indent === "	")
      r = "	";
    else if (typeof e.indent == "number" && e.indent > 0)
      r = nt.call(Array(e.indent + 1), " ");
    else
      return null;
    return {
      base: r,
      prev: nt.call(Array(t + 1), r)
    };
  }
  a(Q0, "getIndent");
  function wa(e, t) {
    if (e.length === 0)
      return "";
    var r = `
` + t.prev + t.base;
    return r + nt.call(e, "," + r) + `
` + t.prev;
  }
  a(wa, "indentedJoin");
  function vo(e, t) {
    var r = xa(e), n = [];
    if (r) {
      n.length = e.length;
      for (var i = 0; i < e.length; i++)
        n[i] = vt(e, i) ? t(e[i], e) : "";
    }
    var o = typeof ya == "function" ? ya(e) : [], s;
    if (dr) {
      s = {};
      for (var u = 0; u < o.length; u++)
        s["$" + o[u]] = o[u];
    }
    for (var c in e)
      vt(e, c) && (r && String(Number(c)) === c && c < e.length || dr && s["$" + c] instanceof Symbol || (Ff.call(/[^\w$]/, c) ? n.push(t(c,
      e) + ": " + t(e[c], e)) : n.push(c + ": " + t(e[c], e))));
    if (typeof ya == "function")
      for (var p = 0; p < o.length; p++)
        Hf.call(e, o[p]) && n.push("[" + t(o[p]) + "]: " + t(e[o[p]], e));
    return n;
  }
  a(vo, "arrObjKeys");
});

// ../node_modules/side-channel/index.js
var jf = W((YF, Kf) => {
  "use strict";
  var Ta = Ht(), fr = xf(), X0 = Vf(), Z0 = Ta("%TypeError%"), So = Ta("%WeakMap%", !0), xo = Ta("%Map%", !0), J0 = fr("WeakMap.prototype.ge\
t", !0), eI = fr("WeakMap.prototype.set", !0), tI = fr("WeakMap.prototype.has", !0), rI = fr("Map.prototype.get", !0), nI = fr("Map.prototyp\
e.set", !0), oI = fr("Map.prototype.has", !0), ka = /* @__PURE__ */ a(function(e, t) {
    for (var r = e, n; (n = r.next) !== null; r = n)
      if (n.key === t)
        return r.next = n.next, n.next = e.next, e.next = n, n;
  }, "listGetNode"), iI = /* @__PURE__ */ a(function(e, t) {
    var r = ka(e, t);
    return r && r.value;
  }, "listGet"), aI = /* @__PURE__ */ a(function(e, t, r) {
    var n = ka(e, t);
    n ? n.value = r : e.next = {
      // eslint-disable-line no-param-reassign
      key: t,
      next: e.next,
      value: r
    };
  }, "listSet"), sI = /* @__PURE__ */ a(function(e, t) {
    return !!ka(e, t);
  }, "listHas");
  Kf.exports = /* @__PURE__ */ a(function() {
    var t, r, n, i = {
      assert: /* @__PURE__ */ a(function(o) {
        if (!i.has(o))
          throw new Z0("Side channel does not contain " + X0(o));
      }, "assert"),
      get: /* @__PURE__ */ a(function(o) {
        if (So && o && (typeof o == "object" || typeof o == "function")) {
          if (t)
            return J0(t, o);
        } else if (xo) {
          if (r)
            return rI(r, o);
        } else if (n)
          return iI(n, o);
      }, "get"),
      has: /* @__PURE__ */ a(function(o) {
        if (So && o && (typeof o == "object" || typeof o == "function")) {
          if (t)
            return tI(t, o);
        } else if (xo) {
          if (r)
            return oI(r, o);
        } else if (n)
          return sI(n, o);
        return !1;
      }, "has"),
      set: /* @__PURE__ */ a(function(o, s) {
        So && o && (typeof o == "object" || typeof o == "function") ? (t || (t = new So()), eI(t, o, s)) : xo ? (r || (r = new xo()), nI(r, o,
        s)) : (n || (n = { key: {}, next: null }), aI(n, o, s));
      }, "set")
    };
    return i;
  }, "getSideChannel");
});

// ../node_modules/qs/lib/formats.js
var wo = W((XF, Uf) => {
  "use strict";
  var lI = String.prototype.replace, uI = /%20/g, Oa = {
    RFC1738: "RFC1738",
    RFC3986: "RFC3986"
  };
  Uf.exports = {
    default: Oa.RFC3986,
    formatters: {
      RFC1738: /* @__PURE__ */ a(function(e) {
        return lI.call(e, uI, "+");
      }, "RFC1738"),
      RFC3986: /* @__PURE__ */ a(function(e) {
        return String(e);
      }, "RFC3986")
    },
    RFC1738: Oa.RFC1738,
    RFC3986: Oa.RFC3986
  };
});

// ../node_modules/qs/lib/utils.js
var Aa = W((JF, Gf) => {
  "use strict";
  var cI = wo(), Pa = Object.prototype.hasOwnProperty, Bt = Array.isArray, ot = function() {
    for (var e = [], t = 0; t < 256; ++t)
      e.push("%" + ((t < 16 ? "0" : "") + t.toString(16)).toUpperCase());
    return e;
  }(), pI = /* @__PURE__ */ a(function(t) {
    for (; t.length > 1; ) {
      var r = t.pop(), n = r.obj[r.prop];
      if (Bt(n)) {
        for (var i = [], o = 0; o < n.length; ++o)
          typeof n[o] < "u" && i.push(n[o]);
        r.obj[r.prop] = i;
      }
    }
  }, "compactQueue"), qf = /* @__PURE__ */ a(function(t, r) {
    for (var n = r && r.plainObjects ? /* @__PURE__ */ Object.create(null) : {}, i = 0; i < t.length; ++i)
      typeof t[i] < "u" && (n[i] = t[i]);
    return n;
  }, "arrayToObject"), dI = /* @__PURE__ */ a(function e(t, r, n) {
    if (!r)
      return t;
    if (typeof r != "object") {
      if (Bt(t))
        t.push(r);
      else if (t && typeof t == "object")
        (n && (n.plainObjects || n.allowPrototypes) || !Pa.call(Object.prototype, r)) && (t[r] = !0);
      else
        return [t, r];
      return t;
    }
    if (!t || typeof t != "object")
      return [t].concat(r);
    var i = t;
    return Bt(t) && !Bt(r) && (i = qf(t, n)), Bt(t) && Bt(r) ? (r.forEach(function(o, s) {
      if (Pa.call(t, s)) {
        var u = t[s];
        u && typeof u == "object" && o && typeof o == "object" ? t[s] = e(u, o, n) : t.push(o);
      } else
        t[s] = o;
    }), t) : Object.keys(r).reduce(function(o, s) {
      var u = r[s];
      return Pa.call(o, s) ? o[s] = e(o[s], u, n) : o[s] = u, o;
    }, i);
  }, "merge"), fI = /* @__PURE__ */ a(function(t, r) {
    return Object.keys(r).reduce(function(n, i) {
      return n[i] = r[i], n;
    }, t);
  }, "assignSingleSource"), mI = /* @__PURE__ */ a(function(e, t, r) {
    var n = e.replace(/\+/g, " ");
    if (r === "iso-8859-1")
      return n.replace(/%[0-9a-f]{2}/gi, unescape);
    try {
      return decodeURIComponent(n);
    } catch {
      return n;
    }
  }, "decode"), hI = /* @__PURE__ */ a(function(t, r, n, i, o) {
    if (t.length === 0)
      return t;
    var s = t;
    if (typeof t == "symbol" ? s = Symbol.prototype.toString.call(t) : typeof t != "string" && (s = String(t)), n === "iso-8859-1")
      return escape(s).replace(/%u[0-9a-f]{4}/gi, function(d) {
        return "%26%23" + parseInt(d.slice(2), 16) + "%3B";
      });
    for (var u = "", c = 0; c < s.length; ++c) {
      var p = s.charCodeAt(c);
      if (p === 45 || p === 46 || p === 95 || p === 126 || p >= 48 && p <= 57 || p >= 65 && p <= 90 || p >= 97 && p <= 122 || o === cI.RFC1738 &&
      (p === 40 || p === 41)) {
        u += s.charAt(c);
        continue;
      }
      if (p < 128) {
        u = u + ot[p];
        continue;
      }
      if (p < 2048) {
        u = u + (ot[192 | p >> 6] + ot[128 | p & 63]);
        continue;
      }
      if (p < 55296 || p >= 57344) {
        u = u + (ot[224 | p >> 12] + ot[128 | p >> 6 & 63] + ot[128 | p & 63]);
        continue;
      }
      c += 1, p = 65536 + ((p & 1023) << 10 | s.charCodeAt(c) & 1023), u += ot[240 | p >> 18] + ot[128 | p >> 12 & 63] + ot[128 | p >> 6 & 63] +
      ot[128 | p & 63];
    }
    return u;
  }, "encode"), gI = /* @__PURE__ */ a(function(t) {
    for (var r = [{ obj: { o: t }, prop: "o" }], n = [], i = 0; i < r.length; ++i)
      for (var o = r[i], s = o.obj[o.prop], u = Object.keys(s), c = 0; c < u.length; ++c) {
        var p = u[c], d = s[p];
        typeof d == "object" && d !== null && n.indexOf(d) === -1 && (r.push({ obj: s, prop: p }), n.push(d));
      }
    return pI(r), t;
  }, "compact"), yI = /* @__PURE__ */ a(function(t) {
    return Object.prototype.toString.call(t) === "[object RegExp]";
  }, "isRegExp"), vI = /* @__PURE__ */ a(function(t) {
    return !t || typeof t != "object" ? !1 : !!(t.constructor && t.constructor.isBuffer && t.constructor.isBuffer(t));
  }, "isBuffer"), bI = /* @__PURE__ */ a(function(t, r) {
    return [].concat(t, r);
  }, "combine"), II = /* @__PURE__ */ a(function(t, r) {
    if (Bt(t)) {
      for (var n = [], i = 0; i < t.length; i += 1)
        n.push(r(t[i]));
      return n;
    }
    return r(t);
  }, "maybeMap");
  Gf.exports = {
    arrayToObject: qf,
    assign: fI,
    combine: bI,
    compact: gI,
    decode: mI,
    encode: hI,
    isBuffer: vI,
    isRegExp: yI,
    maybeMap: II,
    merge: dI
  };
});

// ../node_modules/qs/lib/stringify.js
var em = W((t5, Jf) => {
  "use strict";
  var Xf = jf(), Eo = Aa(), Vr = wo(), SI = Object.prototype.hasOwnProperty, Yf = {
    brackets: /* @__PURE__ */ a(function(t) {
      return t + "[]";
    }, "brackets"),
    comma: "comma",
    indices: /* @__PURE__ */ a(function(t, r) {
      return t + "[" + r + "]";
    }, "indices"),
    repeat: /* @__PURE__ */ a(function(t) {
      return t;
    }, "repeat")
  }, ut = Array.isArray, xI = Array.prototype.push, Zf = /* @__PURE__ */ a(function(e, t) {
    xI.apply(e, ut(t) ? t : [t]);
  }, "pushToArray"), wI = Date.prototype.toISOString, Qf = Vr.default, Le = {
    addQueryPrefix: !1,
    allowDots: !1,
    charset: "utf-8",
    charsetSentinel: !1,
    delimiter: "&",
    encode: !0,
    encoder: Eo.encode,
    encodeValuesOnly: !1,
    format: Qf,
    formatter: Vr.formatters[Qf],
    // deprecated
    indices: !1,
    serializeDate: /* @__PURE__ */ a(function(t) {
      return wI.call(t);
    }, "serializeDate"),
    skipNulls: !1,
    strictNullHandling: !1
  }, EI = /* @__PURE__ */ a(function(t) {
    return typeof t == "string" || typeof t == "number" || typeof t == "boolean" || typeof t == "symbol" || typeof t == "bigint";
  }, "isNonNullishPrimitive"), Ma = {}, CI = /* @__PURE__ */ a(function e(t, r, n, i, o, s, u, c, p, d, g, f, y, m, v, x) {
    for (var w = t, h = x, b = 0, I = !1; (h = h.get(Ma)) !== void 0 && !I; ) {
      var C = h.get(t);
      if (b += 1, typeof C < "u") {
        if (C === b)
          throw new RangeError("Cyclic object value");
        I = !0;
      }
      typeof h.get(Ma) > "u" && (b = 0);
    }
    if (typeof c == "function" ? w = c(r, w) : w instanceof Date ? w = g(w) : n === "comma" && ut(w) && (w = Eo.maybeMap(w, function(X) {
      return X instanceof Date ? g(X) : X;
    })), w === null) {
      if (o)
        return u && !m ? u(r, Le.encoder, v, "key", f) : r;
      w = "";
    }
    if (EI(w) || Eo.isBuffer(w)) {
      if (u) {
        var _ = m ? r : u(r, Le.encoder, v, "key", f);
        return [y(_) + "=" + y(u(w, Le.encoder, v, "value", f))];
      }
      return [y(r) + "=" + y(String(w))];
    }
    var T = [];
    if (typeof w > "u")
      return T;
    var k;
    if (n === "comma" && ut(w))
      m && u && (w = Eo.maybeMap(w, u)), k = [{ value: w.length > 0 ? w.join(",") || null : void 0 }];
    else if (ut(c))
      k = c;
    else {
      var E = Object.keys(w);
      k = p ? E.sort(p) : E;
    }
    for (var O = i && ut(w) && w.length === 1 ? r + "[]" : r, P = 0; P < k.length; ++P) {
      var M = k[P], L = typeof M == "object" && typeof M.value < "u" ? M.value : w[M];
      if (!(s && L === null)) {
        var D = ut(w) ? typeof n == "function" ? n(O, M) : O : O + (d ? "." + M : "[" + M + "]");
        x.set(t, b);
        var V = Xf();
        V.set(Ma, x), Zf(T, e(
          L,
          D,
          n,
          i,
          o,
          s,
          n === "comma" && m && ut(w) ? null : u,
          c,
          p,
          d,
          g,
          f,
          y,
          m,
          v,
          V
        ));
      }
    }
    return T;
  }, "stringify"), _I = /* @__PURE__ */ a(function(t) {
    if (!t)
      return Le;
    if (t.encoder !== null && typeof t.encoder < "u" && typeof t.encoder != "function")
      throw new TypeError("Encoder has to be a function.");
    var r = t.charset || Le.charset;
    if (typeof t.charset < "u" && t.charset !== "utf-8" && t.charset !== "iso-8859-1")
      throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");
    var n = Vr.default;
    if (typeof t.format < "u") {
      if (!SI.call(Vr.formatters, t.format))
        throw new TypeError("Unknown format option provided.");
      n = t.format;
    }
    var i = Vr.formatters[n], o = Le.filter;
    return (typeof t.filter == "function" || ut(t.filter)) && (o = t.filter), {
      addQueryPrefix: typeof t.addQueryPrefix == "boolean" ? t.addQueryPrefix : Le.addQueryPrefix,
      allowDots: typeof t.allowDots > "u" ? Le.allowDots : !!t.allowDots,
      charset: r,
      charsetSentinel: typeof t.charsetSentinel == "boolean" ? t.charsetSentinel : Le.charsetSentinel,
      delimiter: typeof t.delimiter > "u" ? Le.delimiter : t.delimiter,
      encode: typeof t.encode == "boolean" ? t.encode : Le.encode,
      encoder: typeof t.encoder == "function" ? t.encoder : Le.encoder,
      encodeValuesOnly: typeof t.encodeValuesOnly == "boolean" ? t.encodeValuesOnly : Le.encodeValuesOnly,
      filter: o,
      format: n,
      formatter: i,
      serializeDate: typeof t.serializeDate == "function" ? t.serializeDate : Le.serializeDate,
      skipNulls: typeof t.skipNulls == "boolean" ? t.skipNulls : Le.skipNulls,
      sort: typeof t.sort == "function" ? t.sort : null,
      strictNullHandling: typeof t.strictNullHandling == "boolean" ? t.strictNullHandling : Le.strictNullHandling
    };
  }, "normalizeStringifyOptions");
  Jf.exports = function(e, t) {
    var r = e, n = _I(t), i, o;
    typeof n.filter == "function" ? (o = n.filter, r = o("", r)) : ut(n.filter) && (o = n.filter, i = o);
    var s = [];
    if (typeof r != "object" || r === null)
      return "";
    var u;
    t && t.arrayFormat in Yf ? u = t.arrayFormat : t && "indices" in t ? u = t.indices ? "indices" : "repeat" : u = "indices";
    var c = Yf[u];
    if (t && "commaRoundTrip" in t && typeof t.commaRoundTrip != "boolean")
      throw new TypeError("`commaRoundTrip` must be a boolean, or absent");
    var p = c === "comma" && t && t.commaRoundTrip;
    i || (i = Object.keys(r)), n.sort && i.sort(n.sort);
    for (var d = Xf(), g = 0; g < i.length; ++g) {
      var f = i[g];
      n.skipNulls && r[f] === null || Zf(s, CI(
        r[f],
        f,
        c,
        p,
        n.strictNullHandling,
        n.skipNulls,
        n.encode ? n.encoder : null,
        n.filter,
        n.sort,
        n.allowDots,
        n.serializeDate,
        n.format,
        n.formatter,
        n.encodeValuesOnly,
        n.charset,
        d
      ));
    }
    var y = s.join(n.delimiter), m = n.addQueryPrefix === !0 ? "?" : "";
    return n.charsetSentinel && (n.charset === "iso-8859-1" ? m += "utf8=%26%2310003%3B&" : m += "utf8=%E2%9C%93&"), y.length > 0 ? m + y : "";
  };
});

// ../node_modules/qs/lib/parse.js
var nm = W((n5, rm) => {
  "use strict";
  var mr = Aa(), Da = Object.prototype.hasOwnProperty, TI = Array.isArray, Oe = {
    allowDots: !1,
    allowPrototypes: !1,
    allowSparse: !1,
    arrayLimit: 20,
    charset: "utf-8",
    charsetSentinel: !1,
    comma: !1,
    decoder: mr.decode,
    delimiter: "&",
    depth: 5,
    ignoreQueryPrefix: !1,
    interpretNumericEntities: !1,
    parameterLimit: 1e3,
    parseArrays: !0,
    plainObjects: !1,
    strictNullHandling: !1
  }, kI = /* @__PURE__ */ a(function(e) {
    return e.replace(/&#(\d+);/g, function(t, r) {
      return String.fromCharCode(parseInt(r, 10));
    });
  }, "interpretNumericEntities"), tm = /* @__PURE__ */ a(function(e, t) {
    return e && typeof e == "string" && t.comma && e.indexOf(",") > -1 ? e.split(",") : e;
  }, "parseArrayValue"), OI = "utf8=%26%2310003%3B", PI = "utf8=%E2%9C%93", AI = /* @__PURE__ */ a(function(t, r) {
    var n = { __proto__: null }, i = r.ignoreQueryPrefix ? t.replace(/^\?/, "") : t, o = r.parameterLimit === 1 / 0 ? void 0 : r.parameterLimit,
    s = i.split(r.delimiter, o), u = -1, c, p = r.charset;
    if (r.charsetSentinel)
      for (c = 0; c < s.length; ++c)
        s[c].indexOf("utf8=") === 0 && (s[c] === PI ? p = "utf-8" : s[c] === OI && (p = "iso-8859-1"), u = c, c = s.length);
    for (c = 0; c < s.length; ++c)
      if (c !== u) {
        var d = s[c], g = d.indexOf("]="), f = g === -1 ? d.indexOf("=") : g + 1, y, m;
        f === -1 ? (y = r.decoder(d, Oe.decoder, p, "key"), m = r.strictNullHandling ? null : "") : (y = r.decoder(d.slice(0, f), Oe.decoder,
        p, "key"), m = mr.maybeMap(
          tm(d.slice(f + 1), r),
          function(v) {
            return r.decoder(v, Oe.decoder, p, "value");
          }
        )), m && r.interpretNumericEntities && p === "iso-8859-1" && (m = kI(m)), d.indexOf("[]=") > -1 && (m = TI(m) ? [m] : m), Da.call(n,
        y) ? n[y] = mr.combine(n[y], m) : n[y] = m;
      }
    return n;
  }, "parseQueryStringValues"), MI = /* @__PURE__ */ a(function(e, t, r, n) {
    for (var i = n ? t : tm(t, r), o = e.length - 1; o >= 0; --o) {
      var s, u = e[o];
      if (u === "[]" && r.parseArrays)
        s = [].concat(i);
      else {
        s = r.plainObjects ? /* @__PURE__ */ Object.create(null) : {};
        var c = u.charAt(0) === "[" && u.charAt(u.length - 1) === "]" ? u.slice(1, -1) : u, p = parseInt(c, 10);
        !r.parseArrays && c === "" ? s = { 0: i } : !isNaN(p) && u !== c && String(p) === c && p >= 0 && r.parseArrays && p <= r.arrayLimit ?
        (s = [], s[p] = i) : c !== "__proto__" && (s[c] = i);
      }
      i = s;
    }
    return i;
  }, "parseObject"), DI = /* @__PURE__ */ a(function(t, r, n, i) {
    if (t) {
      var o = n.allowDots ? t.replace(/\.([^.[]+)/g, "[$1]") : t, s = /(\[[^[\]]*])/, u = /(\[[^[\]]*])/g, c = n.depth > 0 && s.exec(o), p = c ?
      o.slice(0, c.index) : o, d = [];
      if (p) {
        if (!n.plainObjects && Da.call(Object.prototype, p) && !n.allowPrototypes)
          return;
        d.push(p);
      }
      for (var g = 0; n.depth > 0 && (c = u.exec(o)) !== null && g < n.depth; ) {
        if (g += 1, !n.plainObjects && Da.call(Object.prototype, c[1].slice(1, -1)) && !n.allowPrototypes)
          return;
        d.push(c[1]);
      }
      return c && d.push("[" + o.slice(c.index) + "]"), MI(d, r, n, i);
    }
  }, "parseQueryStringKeys"), LI = /* @__PURE__ */ a(function(t) {
    if (!t)
      return Oe;
    if (t.decoder !== null && t.decoder !== void 0 && typeof t.decoder != "function")
      throw new TypeError("Decoder has to be a function.");
    if (typeof t.charset < "u" && t.charset !== "utf-8" && t.charset !== "iso-8859-1")
      throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");
    var r = typeof t.charset > "u" ? Oe.charset : t.charset;
    return {
      allowDots: typeof t.allowDots > "u" ? Oe.allowDots : !!t.allowDots,
      allowPrototypes: typeof t.allowPrototypes == "boolean" ? t.allowPrototypes : Oe.allowPrototypes,
      allowSparse: typeof t.allowSparse == "boolean" ? t.allowSparse : Oe.allowSparse,
      arrayLimit: typeof t.arrayLimit == "number" ? t.arrayLimit : Oe.arrayLimit,
      charset: r,
      charsetSentinel: typeof t.charsetSentinel == "boolean" ? t.charsetSentinel : Oe.charsetSentinel,
      comma: typeof t.comma == "boolean" ? t.comma : Oe.comma,
      decoder: typeof t.decoder == "function" ? t.decoder : Oe.decoder,
      delimiter: typeof t.delimiter == "string" || mr.isRegExp(t.delimiter) ? t.delimiter : Oe.delimiter,
      // eslint-disable-next-line no-implicit-coercion, no-extra-parens
      depth: typeof t.depth == "number" || t.depth === !1 ? +t.depth : Oe.depth,
      ignoreQueryPrefix: t.ignoreQueryPrefix === !0,
      interpretNumericEntities: typeof t.interpretNumericEntities == "boolean" ? t.interpretNumericEntities : Oe.interpretNumericEntities,
      parameterLimit: typeof t.parameterLimit == "number" ? t.parameterLimit : Oe.parameterLimit,
      parseArrays: t.parseArrays !== !1,
      plainObjects: typeof t.plainObjects == "boolean" ? t.plainObjects : Oe.plainObjects,
      strictNullHandling: typeof t.strictNullHandling == "boolean" ? t.strictNullHandling : Oe.strictNullHandling
    };
  }, "normalizeParseOptions");
  rm.exports = function(e, t) {
    var r = LI(t);
    if (e === "" || e === null || typeof e > "u")
      return r.plainObjects ? /* @__PURE__ */ Object.create(null) : {};
    for (var n = typeof e == "string" ? AI(e, r) : e, i = r.plainObjects ? /* @__PURE__ */ Object.create(null) : {}, o = Object.keys(n), s = 0; s <
    o.length; ++s) {
      var u = o[s], c = DI(u, n[u], r, typeof e == "string");
      i = mr.merge(i, c, r);
    }
    return r.allowSparse === !0 ? i : mr.compact(i);
  };
});

// ../node_modules/qs/lib/index.js
var im = W((i5, om) => {
  "use strict";
  var NI = em(), FI = nm(), HI = wo();
  om.exports = {
    formats: HI,
    parse: FI,
    stringify: NI
  };
});

// ../node_modules/@storybook/global/dist/index.mjs
var ae = (() => {
  let e;
  return typeof window < "u" ? e = window : typeof globalThis < "u" ? e = globalThis : typeof global < "u" ? e = global : typeof self < "u" ?
  e = self : e = {}, e;
})();

// global-externals:@storybook/core/manager-api
var _x = __STORYBOOK_API__, { ActiveTabs: Tx, Consumer: he, ManagerContext: kx, Provider: Ya, RequestResponseError: Ox, addons: Ge, combineParameters: Px,
controlOrMetaKey: Ax, controlOrMetaSymbol: Mx, eventMatchesShortcut: Dx, eventToShortcut: Qa, experimental_requestResponse: qr, isMacLike: Lx,
isShortcutTaken: Nx, keyToSymbol: Fx, merge: Gr, mockChannel: Hx, optionOrAltSymbol: Bx, shortcutMatchesShortcut: Xa, shortcutToHumanString: Ye,
types: ve, useAddonState: Rx, useArgTypes: zx, useArgs: $x, useChannel: Wx, useGlobalTypes: Vx, useGlobals: Kx, useParameter: jx, useSharedState: Ux,
useStoryPrepared: qx, useStorybookApi: me, useStorybookState: et } = __STORYBOOK_API__;

// global-externals:@storybook/core/channels
var Yx = __STORYBOOK_CHANNELS__, { Channel: Qx, PostMessageTransport: Xx, WebsocketTransport: Zx, createBrowserChannel: Za } = __STORYBOOK_CHANNELS__;

// global-externals:@storybook/core/core-events
var ew = __STORYBOOK_CORE_EVENTS__, { ARGTYPES_INFO_REQUEST: Ja, ARGTYPES_INFO_RESPONSE: es, CHANNEL_CREATED: ts, CHANNEL_WS_DISCONNECT: tw,
CONFIG_ERROR: rw, CREATE_NEW_STORYFILE_REQUEST: rs, CREATE_NEW_STORYFILE_RESPONSE: ns, CURRENT_STORY_WAS_SET: nw, DOCS_PREPARED: ow, DOCS_RENDERED: iw,
FILE_COMPONENT_SEARCH_REQUEST: os, FILE_COMPONENT_SEARCH_RESPONSE: Yr, FORCE_REMOUNT: Po, FORCE_RE_RENDER: aw, GLOBALS_UPDATED: sw, NAVIGATE_URL: lw,
PLAY_FUNCTION_THREW_EXCEPTION: uw, PRELOAD_ENTRIES: xt, PREVIEW_BUILDER_PROGRESS: is, PREVIEW_KEYDOWN: cw, REGISTER_SUBSCRIPTION: pw, REQUEST_WHATS_NEW_DATA: dw,
RESET_STORY_ARGS: fw, RESULT_WHATS_NEW_DATA: mw, SAVE_STORY_REQUEST: as, SAVE_STORY_RESPONSE: ss, SELECT_STORY: hw, SET_CONFIG: gw, SET_CURRENT_STORY: ls,
SET_GLOBALS: yw, SET_INDEX: vw, SET_STORIES: bw, SET_WHATS_NEW_CACHE: Iw, SHARED_STATE_CHANGED: Sw, SHARED_STATE_SET: xw, STORIES_COLLAPSE_ALL: Ao,
STORIES_EXPAND_ALL: Mo, STORY_ARGS_UPDATED: ww, STORY_CHANGED: Ew, STORY_ERRORED: Cw, STORY_INDEX_INVALIDATED: _w, STORY_MISSING: Tw, STORY_PREPARED: kw,
STORY_RENDERED: Ow, STORY_RENDER_PHASE_CHANGED: Pw, STORY_SPECIFIED: Aw, STORY_THREW_EXCEPTION: Mw, STORY_UNCHANGED: Dw, TELEMETRY_ERROR: Lw,
TOGGLE_WHATS_NEW_NOTIFICATIONS: Nw, UNHANDLED_ERRORS_WHILE_PLAYING: Fw, UPDATE_GLOBALS: Hw, UPDATE_QUERY_PARAMS: Bw, UPDATE_STORY_ARGS: Rw } = __STORYBOOK_CORE_EVENTS__;

// src/manager/provider.ts
var Do = class Do {
  getElements(t) {
    throw new Error("Provider.getElements() is not implemented!");
  }
  handleAPI(t) {
    throw new Error("Provider.handleAPI() is not implemented!");
  }
  getConfig() {
    return console.error("Provider.getConfig() is not implemented!"), {};
  }
};
a(Do, "Provider");
var wt = Do;

// global-externals:react-dom/client
var Vw = __REACT_DOM_CLIENT__, { createRoot: us, hydrateRoot: Kw } = __REACT_DOM_CLIENT__;

// global-externals:react
var l = __REACT__, { Children: Uw, Component: He, Fragment: _e, Profiler: qw, PureComponent: Gw, StrictMode: Yw, Suspense: Qw, __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: Xw,
cloneElement: cs, createContext: Qr, createElement: Zw, createFactory: Jw, createRef: eE, forwardRef: ps, isValidElement: tE, lazy: rE, memo: br,
startTransition: nE, unstable_act: oE, useCallback: A, useContext: ds, useDebugValue: iE, useDeferredValue: fs, useEffect: K, useId: aE, useImperativeHandle: sE,
useInsertionEffect: lE, useLayoutEffect: Vt, useMemo: j, useReducer: Kt, useRef: Q, useState: J, useSyncExternalStore: uE, useTransition: ms,
version: cE } = __REACT__;

// global-externals:@storybook/core/router
var pE = __STORYBOOK_ROUTER__, { BaseLocationProvider: dE, DEEPLY_EQUAL: fE, Link: Xr, Location: Zr, LocationProvider: hs, Match: gs, Route: Ir,
buildArgsParam: mE, deepDiff: hE, getMatch: gE, parsePath: yE, queryFromLocation: vE, queryFromString: bE, stringifyQuery: IE, useNavigate: ys } = __STORYBOOK_ROUTER__;

// global-externals:@storybook/core/theming
var xE = __STORYBOOK_THEMING__, { CacheProvider: wE, ClassNames: EE, Global: jt, ThemeProvider: Lo, background: CE, color: _E, convert: TE, create: kE,
createCache: OE, createGlobal: vs, createReset: PE, css: AE, darken: ME, ensure: bs, ignoreSsrWarning: DE, isPropValid: LE, jsx: NE, keyframes: Sr,
lighten: FE, styled: S, themes: HE, typography: BE, useTheme: Re, withTheme: Is } = __STORYBOOK_THEMING__;

// global-externals:@storybook/core/manager-errors
var zE = __STORYBOOK_CORE_EVENTS_MANAGER_ERRORS__, { Category: $E, ProviderDoesNotExtendBaseProviderError: Ss, UncaughtManagerError: WE } = __STORYBOOK_CORE_EVENTS_MANAGER_ERRORS__;

// ../node_modules/react-helmet-async/lib/index.module.js
var ne = Fe(No()), $s = Fe(Ps()), zo = Fe(Ms()), Ws = Fe(Ls());
function be() {
  return be = Object.assign || function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, be.apply(this, arguments);
}
a(be, "a");
function Ko(e, t) {
  e.prototype = Object.create(t.prototype), e.prototype.constructor = e, $o(e, t);
}
a(Ko, "s");
function $o(e, t) {
  return $o = Object.setPrototypeOf || function(r, n) {
    return r.__proto__ = n, r;
  }, $o(e, t);
}
a($o, "c");
function Ns(e, t) {
  if (e == null) return {};
  var r, n, i = {}, o = Object.keys(e);
  for (n = 0; n < o.length; n++) t.indexOf(r = o[n]) >= 0 || (i[r] = e[r]);
  return i;
}
a(Ns, "u");
var G = { BASE: "base", BODY: "body", HEAD: "head", HTML: "html", LINK: "link", META: "meta", NOSCRIPT: "noscript", SCRIPT: "script", STYLE: "\
style", TITLE: "title", FRAGMENT: "Symbol(react.fragment)" }, dh = { rel: ["amphtml", "canonical", "alternate"] }, fh = { type: ["applicatio\
n/ld+json"] }, mh = { charset: "", name: ["robots", "description"], property: ["og:type", "og:title", "og:url", "og:image", "og:image:alt", "\
og:description", "twitter:url", "twitter:title", "twitter:description", "twitter:image", "twitter:image:alt", "twitter:card", "twitter:site"] },
Fs = Object.keys(G).map(function(e) {
  return G[e];
}), rn = { accesskey: "accessKey", charset: "charSet", class: "className", contenteditable: "contentEditable", contextmenu: "contextMenu", "\
http-equiv": "httpEquiv", itemprop: "itemProp", tabindex: "tabIndex" }, hh = Object.keys(rn).reduce(function(e, t) {
  return e[rn[t]] = t, e;
}, {}), qt = /* @__PURE__ */ a(function(e, t) {
  for (var r = e.length - 1; r >= 0; r -= 1) {
    var n = e[r];
    if (Object.prototype.hasOwnProperty.call(n, t)) return n[t];
  }
  return null;
}, "T"), gh = /* @__PURE__ */ a(function(e) {
  var t = qt(e, G.TITLE), r = qt(e, "titleTemplate");
  if (Array.isArray(t) && (t = t.join("")), r && t) return r.replace(/%s/g, function() {
    return t;
  });
  var n = qt(e, "defaultTitle");
  return t || n || void 0;
}, "g"), yh = /* @__PURE__ */ a(function(e) {
  return qt(e, "onChangeClientState") || function() {
  };
}, "b"), Fo = /* @__PURE__ */ a(function(e, t) {
  return t.filter(function(r) {
    return r[e] !== void 0;
  }).map(function(r) {
    return r[e];
  }).reduce(function(r, n) {
    return be({}, r, n);
  }, {});
}, "v"), vh = /* @__PURE__ */ a(function(e, t) {
  return t.filter(function(r) {
    return r[G.BASE] !== void 0;
  }).map(function(r) {
    return r[G.BASE];
  }).reverse().reduce(function(r, n) {
    if (!r.length) for (var i = Object.keys(n), o = 0; o < i.length; o += 1) {
      var s = i[o].toLowerCase();
      if (e.indexOf(s) !== -1 && n[s]) return r.concat(n);
    }
    return r;
  }, []);
}, "A"), xr = /* @__PURE__ */ a(function(e, t, r) {
  var n = {};
  return r.filter(function(i) {
    return !!Array.isArray(i[e]) || (i[e] !== void 0 && console && typeof console.warn == "function" && console.warn("Helmet: " + e + ' shou\
ld be of type "Array". Instead found type "' + typeof i[e] + '"'), !1);
  }).map(function(i) {
    return i[e];
  }).reverse().reduce(function(i, o) {
    var s = {};
    o.filter(function(g) {
      for (var f, y = Object.keys(g), m = 0; m < y.length; m += 1) {
        var v = y[m], x = v.toLowerCase();
        t.indexOf(x) === -1 || f === "rel" && g[f].toLowerCase() === "canonical" || x === "rel" && g[x].toLowerCase() === "stylesheet" || (f =
        x), t.indexOf(v) === -1 || v !== "innerHTML" && v !== "cssText" && v !== "itemprop" || (f = v);
      }
      if (!f || !g[f]) return !1;
      var w = g[f].toLowerCase();
      return n[f] || (n[f] = {}), s[f] || (s[f] = {}), !n[f][w] && (s[f][w] = !0, !0);
    }).reverse().forEach(function(g) {
      return i.push(g);
    });
    for (var u = Object.keys(s), c = 0; c < u.length; c += 1) {
      var p = u[c], d = be({}, n[p], s[p]);
      n[p] = d;
    }
    return i;
  }, []).reverse();
}, "C"), bh = /* @__PURE__ */ a(function(e, t) {
  if (Array.isArray(e) && e.length) {
    for (var r = 0; r < e.length; r += 1) if (e[r][t]) return !0;
  }
  return !1;
}, "O"), Vs = /* @__PURE__ */ a(function(e) {
  return Array.isArray(e) ? e.join("") : e;
}, "S"), Ho = /* @__PURE__ */ a(function(e, t) {
  return Array.isArray(e) ? e.reduce(function(r, n) {
    return function(i, o) {
      for (var s = Object.keys(i), u = 0; u < s.length; u += 1) if (o[s[u]] && o[s[u]].includes(i[s[u]])) return !0;
      return !1;
    }(n, t) ? r.priority.push(n) : r.default.push(n), r;
  }, { priority: [], default: [] }) : { default: e };
}, "E"), Hs = /* @__PURE__ */ a(function(e, t) {
  var r;
  return be({}, e, ((r = {})[t] = void 0, r));
}, "I"), Ih = [G.NOSCRIPT, G.SCRIPT, G.STYLE], Bo = /* @__PURE__ */ a(function(e, t) {
  return t === void 0 && (t = !0), t === !1 ? String(e) : String(e).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(
  /"/g, "&quot;").replace(/'/g, "&#x27;");
}, "w"), Bs = /* @__PURE__ */ a(function(e) {
  return Object.keys(e).reduce(function(t, r) {
    var n = e[r] !== void 0 ? r + '="' + e[r] + '"' : "" + r;
    return t ? t + " " + n : n;
  }, "");
}, "x"), Rs = /* @__PURE__ */ a(function(e, t) {
  return t === void 0 && (t = {}), Object.keys(e).reduce(function(r, n) {
    return r[rn[n] || n] = e[n], r;
  }, t);
}, "L"), tn = /* @__PURE__ */ a(function(e, t) {
  return t.map(function(r, n) {
    var i, o = ((i = { key: n })["data-rh"] = !0, i);
    return Object.keys(r).forEach(function(s) {
      var u = rn[s] || s;
      u === "innerHTML" || u === "cssText" ? o.dangerouslySetInnerHTML = { __html: r.innerHTML || r.cssText } : o[u] = r[s];
    }), l.createElement(e, o);
  });
}, "j"), Ve = /* @__PURE__ */ a(function(e, t, r) {
  switch (e) {
    case G.TITLE:
      return { toComponent: /* @__PURE__ */ a(function() {
        return i = t.titleAttributes, (o = { key: n = t.title })["data-rh"] = !0, s = Rs(i, o), [l.createElement(G.TITLE, s, n)];
        var n, i, o, s;
      }, "toComponent"), toString: /* @__PURE__ */ a(function() {
        return function(n, i, o, s) {
          var u = Bs(o), c = Vs(i);
          return u ? "<" + n + ' data-rh="true" ' + u + ">" + Bo(c, s) + "</" + n + ">" : "<" + n + ' data-rh="true">' + Bo(c, s) + "</" + n +
          ">";
        }(e, t.title, t.titleAttributes, r);
      }, "toString") };
    case "bodyAttributes":
    case "htmlAttributes":
      return { toComponent: /* @__PURE__ */ a(function() {
        return Rs(t);
      }, "toComponent"), toString: /* @__PURE__ */ a(function() {
        return Bs(t);
      }, "toString") };
    default:
      return { toComponent: /* @__PURE__ */ a(function() {
        return tn(e, t);
      }, "toComponent"), toString: /* @__PURE__ */ a(function() {
        return function(n, i, o) {
          return i.reduce(function(s, u) {
            var c = Object.keys(u).filter(function(g) {
              return !(g === "innerHTML" || g === "cssText");
            }).reduce(function(g, f) {
              var y = u[f] === void 0 ? f : f + '="' + Bo(u[f], o) + '"';
              return g ? g + " " + y : y;
            }, ""), p = u.innerHTML || u.cssText || "", d = Ih.indexOf(n) === -1;
            return s + "<" + n + ' data-rh="true" ' + c + (d ? "/>" : ">" + p + "</" + n + ">");
          }, "");
        }(e, t, r);
      }, "toString") };
  }
}, "M"), Wo = /* @__PURE__ */ a(function(e) {
  var t = e.baseTag, r = e.bodyAttributes, n = e.encode, i = e.htmlAttributes, o = e.noscriptTags, s = e.styleTags, u = e.title, c = u === void 0 ?
  "" : u, p = e.titleAttributes, d = e.linkTags, g = e.metaTags, f = e.scriptTags, y = { toComponent: /* @__PURE__ */ a(function() {
  }, "toComponent"), toString: /* @__PURE__ */ a(function() {
    return "";
  }, "toString") };
  if (e.prioritizeSeoTags) {
    var m = function(v) {
      var x = v.linkTags, w = v.scriptTags, h = v.encode, b = Ho(v.metaTags, mh), I = Ho(x, dh), C = Ho(w, fh);
      return { priorityMethods: { toComponent: /* @__PURE__ */ a(function() {
        return [].concat(tn(G.META, b.priority), tn(G.LINK, I.priority), tn(G.SCRIPT, C.priority));
      }, "toComponent"), toString: /* @__PURE__ */ a(function() {
        return Ve(G.META, b.priority, h) + " " + Ve(G.LINK, I.priority, h) + " " + Ve(G.SCRIPT, C.priority, h);
      }, "toString") }, metaTags: b.default, linkTags: I.default, scriptTags: C.default };
    }(e);
    y = m.priorityMethods, d = m.linkTags, g = m.metaTags, f = m.scriptTags;
  }
  return { priority: y, base: Ve(G.BASE, t, n), bodyAttributes: Ve("bodyAttributes", r, n), htmlAttributes: Ve("htmlAttributes", i, n), link: Ve(
  G.LINK, d, n), meta: Ve(G.META, g, n), noscript: Ve(G.NOSCRIPT, o, n), script: Ve(G.SCRIPT, f, n), style: Ve(G.STYLE, s, n), title: Ve(G.TITLE,
  { title: c, titleAttributes: p }, n) };
}, "k"), en = [], Vo = /* @__PURE__ */ a(function(e, t) {
  var r = this;
  t === void 0 && (t = typeof document < "u"), this.instances = [], this.value = { setHelmet: /* @__PURE__ */ a(function(n) {
    r.context.helmet = n;
  }, "setHelmet"), helmetInstances: { get: /* @__PURE__ */ a(function() {
    return r.canUseDOM ? en : r.instances;
  }, "get"), add: /* @__PURE__ */ a(function(n) {
    (r.canUseDOM ? en : r.instances).push(n);
  }, "add"), remove: /* @__PURE__ */ a(function(n) {
    var i = (r.canUseDOM ? en : r.instances).indexOf(n);
    (r.canUseDOM ? en : r.instances).splice(i, 1);
  }, "remove") } }, this.context = e, this.canUseDOM = t, t || (e.helmet = Wo({ baseTag: [], bodyAttributes: {}, encodeSpecialCharacters: !0,
  htmlAttributes: {}, linkTags: [], metaTags: [], noscriptTags: [], scriptTags: [], styleTags: [], title: "", titleAttributes: {} }));
}, "N"), Ks = l.createContext({}), Sh = ne.default.shape({ setHelmet: ne.default.func, helmetInstances: ne.default.shape({ get: ne.default.func,
add: ne.default.func, remove: ne.default.func }) }), xh = typeof document < "u", ft = /* @__PURE__ */ function(e) {
  function t(r) {
    var n;
    return (n = e.call(this, r) || this).helmetData = new Vo(n.props.context, t.canUseDOM), n;
  }
  return a(t, "r"), Ko(t, e), t.prototype.render = function() {
    return l.createElement(Ks.Provider, { value: this.helmetData.value }, this.props.children);
  }, t;
}(He);
ft.canUseDOM = xh, ft.propTypes = { context: ne.default.shape({ helmet: ne.default.shape() }), children: ne.default.node.isRequired }, ft.defaultProps =
{ context: {} }, ft.displayName = "HelmetProvider";
var Ut = /* @__PURE__ */ a(function(e, t) {
  var r, n = document.head || document.querySelector(G.HEAD), i = n.querySelectorAll(e + "[data-rh]"), o = [].slice.call(i), s = [];
  return t && t.length && t.forEach(function(u) {
    var c = document.createElement(e);
    for (var p in u) Object.prototype.hasOwnProperty.call(u, p) && (p === "innerHTML" ? c.innerHTML = u.innerHTML : p === "cssText" ? c.styleSheet ?
    c.styleSheet.cssText = u.cssText : c.appendChild(document.createTextNode(u.cssText)) : c.setAttribute(p, u[p] === void 0 ? "" : u[p]));
    c.setAttribute("data-rh", "true"), o.some(function(d, g) {
      return r = g, c.isEqualNode(d);
    }) ? o.splice(r, 1) : s.push(c);
  }), o.forEach(function(u) {
    return u.parentNode.removeChild(u);
  }), s.forEach(function(u) {
    return n.appendChild(u);
  }), { oldTags: o, newTags: s };
}, "Y"), Ro = /* @__PURE__ */ a(function(e, t) {
  var r = document.getElementsByTagName(e)[0];
  if (r) {
    for (var n = r.getAttribute("data-rh"), i = n ? n.split(",") : [], o = [].concat(i), s = Object.keys(t), u = 0; u < s.length; u += 1) {
      var c = s[u], p = t[c] || "";
      r.getAttribute(c) !== p && r.setAttribute(c, p), i.indexOf(c) === -1 && i.push(c);
      var d = o.indexOf(c);
      d !== -1 && o.splice(d, 1);
    }
    for (var g = o.length - 1; g >= 0; g -= 1) r.removeAttribute(o[g]);
    i.length === o.length ? r.removeAttribute("data-rh") : r.getAttribute("data-rh") !== s.join(",") && r.setAttribute("data-rh", s.join(","));
  }
}, "B"), zs = /* @__PURE__ */ a(function(e, t) {
  var r = e.baseTag, n = e.htmlAttributes, i = e.linkTags, o = e.metaTags, s = e.noscriptTags, u = e.onChangeClientState, c = e.scriptTags, p = e.
  styleTags, d = e.title, g = e.titleAttributes;
  Ro(G.BODY, e.bodyAttributes), Ro(G.HTML, n), function(v, x) {
    v !== void 0 && document.title !== v && (document.title = Vs(v)), Ro(G.TITLE, x);
  }(d, g);
  var f = { baseTag: Ut(G.BASE, r), linkTags: Ut(G.LINK, i), metaTags: Ut(G.META, o), noscriptTags: Ut(G.NOSCRIPT, s), scriptTags: Ut(G.SCRIPT,
  c), styleTags: Ut(G.STYLE, p) }, y = {}, m = {};
  Object.keys(f).forEach(function(v) {
    var x = f[v], w = x.newTags, h = x.oldTags;
    w.length && (y[v] = w), h.length && (m[v] = f[v].oldTags);
  }), t && t(), u(e, y, m);
}, "K"), wr = null, nn = /* @__PURE__ */ function(e) {
  function t() {
    for (var n, i = arguments.length, o = new Array(i), s = 0; s < i; s++) o[s] = arguments[s];
    return (n = e.call.apply(e, [this].concat(o)) || this).rendered = !1, n;
  }
  a(t, "e"), Ko(t, e);
  var r = t.prototype;
  return r.shouldComponentUpdate = function(n) {
    return !(0, Ws.default)(n, this.props);
  }, r.componentDidUpdate = function() {
    this.emitChange();
  }, r.componentWillUnmount = function() {
    this.props.context.helmetInstances.remove(this), this.emitChange();
  }, r.emitChange = function() {
    var n, i, o = this.props.context, s = o.setHelmet, u = null, c = (n = o.helmetInstances.get().map(function(p) {
      var d = be({}, p.props);
      return delete d.context, d;
    }), { baseTag: vh(["href"], n), bodyAttributes: Fo("bodyAttributes", n), defer: qt(n, "defer"), encode: qt(n, "encodeSpecialCharacters"),
    htmlAttributes: Fo("htmlAttributes", n), linkTags: xr(G.LINK, ["rel", "href"], n), metaTags: xr(G.META, ["name", "charset", "http-equiv",
    "property", "itemprop"], n), noscriptTags: xr(G.NOSCRIPT, ["innerHTML"], n), onChangeClientState: yh(n), scriptTags: xr(G.SCRIPT, ["src",
    "innerHTML"], n), styleTags: xr(G.STYLE, ["cssText"], n), title: gh(n), titleAttributes: Fo("titleAttributes", n), prioritizeSeoTags: bh(
    n, "prioritizeSeoTags") });
    ft.canUseDOM ? (i = c, wr && cancelAnimationFrame(wr), i.defer ? wr = requestAnimationFrame(function() {
      zs(i, function() {
        wr = null;
      });
    }) : (zs(i), wr = null)) : Wo && (u = Wo(c)), s(u);
  }, r.init = function() {
    this.rendered || (this.rendered = !0, this.props.context.helmetInstances.add(this), this.emitChange());
  }, r.render = function() {
    return this.init(), null;
  }, t;
}(He);
nn.propTypes = { context: Sh.isRequired }, nn.displayName = "HelmetDispatcher";
var wh = ["children"], Eh = ["children"], Er = /* @__PURE__ */ function(e) {
  function t() {
    return e.apply(this, arguments) || this;
  }
  a(t, "r"), Ko(t, e);
  var r = t.prototype;
  return r.shouldComponentUpdate = function(n) {
    return !(0, $s.default)(Hs(this.props, "helmetData"), Hs(n, "helmetData"));
  }, r.mapNestedChildrenToProps = function(n, i) {
    if (!i) return null;
    switch (n.type) {
      case G.SCRIPT:
      case G.NOSCRIPT:
        return { innerHTML: i };
      case G.STYLE:
        return { cssText: i };
      default:
        throw new Error("<" + n.type + " /> elements are self-closing and can not contain children. Refer to our API for more information.");
    }
  }, r.flattenArrayTypeChildren = function(n) {
    var i, o = n.child, s = n.arrayTypeChildren;
    return be({}, s, ((i = {})[o.type] = [].concat(s[o.type] || [], [be({}, n.newChildProps, this.mapNestedChildrenToProps(o, n.nestedChildren))]),
    i));
  }, r.mapObjectTypeChildren = function(n) {
    var i, o, s = n.child, u = n.newProps, c = n.newChildProps, p = n.nestedChildren;
    switch (s.type) {
      case G.TITLE:
        return be({}, u, ((i = {})[s.type] = p, i.titleAttributes = be({}, c), i));
      case G.BODY:
        return be({}, u, { bodyAttributes: be({}, c) });
      case G.HTML:
        return be({}, u, { htmlAttributes: be({}, c) });
      default:
        return be({}, u, ((o = {})[s.type] = be({}, c), o));
    }
  }, r.mapArrayTypeChildrenToProps = function(n, i) {
    var o = be({}, i);
    return Object.keys(n).forEach(function(s) {
      var u;
      o = be({}, o, ((u = {})[s] = n[s], u));
    }), o;
  }, r.warnOnInvalidChildren = function(n, i) {
    return (0, zo.default)(Fs.some(function(o) {
      return n.type === o;
    }), typeof n.type == "function" ? "You may be attempting to nest <Helmet> components within each other, which is not allowed. Refer to o\
ur API for more information." : "Only elements types " + Fs.join(", ") + " are allowed. Helmet does not support rendering <" + n.type + "> e\
lements. Refer to our API for more information."), (0, zo.default)(!i || typeof i == "string" || Array.isArray(i) && !i.some(function(o) {
      return typeof o != "string";
    }), "Helmet expects a string as a child of <" + n.type + ">. Did you forget to wrap your children in braces? ( <" + n.type + ">{``}</" +
    n.type + "> ) Refer to our API for more information."), !0;
  }, r.mapChildrenToProps = function(n, i) {
    var o = this, s = {};
    return l.Children.forEach(n, function(u) {
      if (u && u.props) {
        var c = u.props, p = c.children, d = Ns(c, wh), g = Object.keys(d).reduce(function(y, m) {
          return y[hh[m] || m] = d[m], y;
        }, {}), f = u.type;
        switch (typeof f == "symbol" ? f = f.toString() : o.warnOnInvalidChildren(u, p), f) {
          case G.FRAGMENT:
            i = o.mapChildrenToProps(p, i);
            break;
          case G.LINK:
          case G.META:
          case G.NOSCRIPT:
          case G.SCRIPT:
          case G.STYLE:
            s = o.flattenArrayTypeChildren({ child: u, arrayTypeChildren: s, newChildProps: g, nestedChildren: p });
            break;
          default:
            i = o.mapObjectTypeChildren({ child: u, newProps: i, newChildProps: g, nestedChildren: p });
        }
      }
    }), this.mapArrayTypeChildrenToProps(s, i);
  }, r.render = function() {
    var n = this.props, i = n.children, o = Ns(n, Eh), s = be({}, o), u = o.helmetData;
    return i && (s = this.mapChildrenToProps(i, s)), !u || u instanceof Vo || (u = new Vo(u.context, u.instances)), u ? /* @__PURE__ */ l.createElement(
    nn, be({}, s, { context: u.value, helmetData: void 0 })) : /* @__PURE__ */ l.createElement(Ks.Consumer, null, function(c) {
      return l.createElement(nn, be({}, s, { context: c }));
    });
  }, t;
}(He);
Er.propTypes = { base: ne.default.object, bodyAttributes: ne.default.object, children: ne.default.oneOfType([ne.default.arrayOf(ne.default.node),
ne.default.node]), defaultTitle: ne.default.string, defer: ne.default.bool, encodeSpecialCharacters: ne.default.bool, htmlAttributes: ne.default.
object, link: ne.default.arrayOf(ne.default.object), meta: ne.default.arrayOf(ne.default.object), noscript: ne.default.arrayOf(ne.default.object),
onChangeClientState: ne.default.func, script: ne.default.arrayOf(ne.default.object), style: ne.default.arrayOf(ne.default.object), title: ne.default.
string, titleAttributes: ne.default.object, titleTemplate: ne.default.string, prioritizeSeoTags: ne.default.bool, helmetData: ne.default.object },
Er.defaultProps = { defer: !0, encodeSpecialCharacters: !0, prioritizeSeoTags: !1 }, Er.displayName = "Helmet";

// global-externals:@storybook/core/types
var iC = __STORYBOOK_TYPES__, { Addon_TypesEnum: Te } = __STORYBOOK_TYPES__;

// global-externals:@storybook/core/components
var sC = __STORYBOOK_COMPONENTS__, { A: lC, ActionBar: uC, AddonPanel: cC, Badge: js, Bar: pC, Blockquote: dC, Button: xe, ClipboardCode: fC,
Code: mC, DL: hC, Div: gC, DocumentWrapper: yC, EmptyTabContent: Us, ErrorFormatter: qs, FlexBar: vC, Form: on, H1: bC, H2: IC, H3: SC, H4: xC,
H5: wC, H6: EC, HR: CC, IconButton: ie, IconButtonSkeleton: _C, Icons: Gs, Img: TC, LI: kC, Link: Me, ListItem: OC, Loader: an, Modal: Et, OL: PC,
P: AC, Placeholder: MC, Pre: DC, ResetWrapper: LC, ScrollArea: sn, Separator: Gt, Spaced: it, Span: NC, StorybookIcon: FC, StorybookLogo: ln,
Symbols: HC, SyntaxHighlighter: BC, TT: RC, TabBar: un, TabButton: cn, TabWrapper: zC, Table: $C, Tabs: Ys, TabsState: WC, TooltipLinkList: Yt,
TooltipMessage: VC, TooltipNote: pn, UL: KC, WithTooltip: ze, WithTooltipPure: jC, Zoom: Qs, codeCommon: UC, components: qC, createCopyToClipboardFunction: GC,
getStoryHref: Qt, icons: YC, interleaveSeparators: QC, nameSpaceClassNames: XC, resetComponents: ZC, withReset: JC } = __STORYBOOK_COMPONENTS__;

// src/manager/components/sidebar/Brand.tsx
var Ch = S(ln)(({ theme: e }) => ({
  width: "auto",
  height: "22px !important",
  display: "block",
  color: e.base === "light" ? e.color.defaultText : e.color.lightest
})), _h = S.img({
  display: "block",
  maxWidth: "150px",
  maxHeight: "100px"
}), Xs = S.a(({ theme: e }) => ({
  display: "inline-block",
  height: "100%",
  margin: "-3px -4px",
  padding: "2px 3px",
  border: "1px solid transparent",
  borderRadius: 3,
  color: "inherit",
  textDecoration: "none",
  "&:focus": {
    outline: 0,
    borderColor: e.color.secondary
  }
})), Zs = Is(({ theme: e }) => {
  let { title: t = "Storybook", url: r = "./", image: n, target: i } = e.brand, o = i || (r === "./" ? "" : "_blank");
  if (n === null)
    return t === null ? null : r ? /* @__PURE__ */ l.createElement(Xs, { href: r, target: o, dangerouslySetInnerHTML: { __html: t } }) : /* @__PURE__ */ l.
    createElement("div", { dangerouslySetInnerHTML: { __html: t } });
  let s = n ? /* @__PURE__ */ l.createElement(_h, { src: n, alt: t }) : /* @__PURE__ */ l.createElement(Ch, { alt: t });
  return r ? /* @__PURE__ */ l.createElement(Xs, { title: t, href: r, target: o }, s) : /* @__PURE__ */ l.createElement("div", null, s);
});

// ../node_modules/@babel/runtime/helpers/esm/extends.js
function U() {
  return U = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, U.apply(this, arguments);
}
a(U, "_extends");

// ../node_modules/@babel/runtime/helpers/esm/assertThisInitialized.js
function jo(e) {
  if (e === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
a(jo, "_assertThisInitialized");

// ../node_modules/@babel/runtime/helpers/esm/setPrototypeOf.js
function at(e, t) {
  return at = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : /* @__PURE__ */ a(function(n, i) {
    return n.__proto__ = i, n;
  }, "_setPrototypeOf"), at(e, t);
}
a(at, "_setPrototypeOf");

// ../node_modules/@babel/runtime/helpers/esm/inheritsLoose.js
function Ct(e, t) {
  e.prototype = Object.create(t.prototype), e.prototype.constructor = e, at(e, t);
}
a(Ct, "_inheritsLoose");

// ../node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js
function Cr(e) {
  return Cr = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : /* @__PURE__ */ a(function(r) {
    return r.__proto__ || Object.getPrototypeOf(r);
  }, "_getPrototypeOf"), Cr(e);
}
a(Cr, "_getPrototypeOf");

// ../node_modules/@babel/runtime/helpers/esm/isNativeFunction.js
function Uo(e) {
  try {
    return Function.toString.call(e).indexOf("[native code]") !== -1;
  } catch {
    return typeof e == "function";
  }
}
a(Uo, "_isNativeFunction");

// ../node_modules/@babel/runtime/helpers/esm/isNativeReflectConstruct.js
function dn() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch {
  }
  return (dn = /* @__PURE__ */ a(function() {
    return !!e;
  }, "_isNativeReflectConstruct"))();
}
a(dn, "_isNativeReflectConstruct");

// ../node_modules/@babel/runtime/helpers/esm/construct.js
function qo(e, t, r) {
  if (dn()) return Reflect.construct.apply(null, arguments);
  var n = [null];
  n.push.apply(n, t);
  var i = new (e.bind.apply(e, n))();
  return r && at(i, r.prototype), i;
}
a(qo, "_construct");

// ../node_modules/@babel/runtime/helpers/esm/wrapNativeSuper.js
function _r(e) {
  var t = typeof Map == "function" ? /* @__PURE__ */ new Map() : void 0;
  return _r = /* @__PURE__ */ a(function(n) {
    if (n === null || !Uo(n)) return n;
    if (typeof n != "function")
      throw new TypeError("Super expression must either be null or a function");
    if (typeof t < "u") {
      if (t.has(n)) return t.get(n);
      t.set(n, i);
    }
    function i() {
      return qo(n, arguments, Cr(this).constructor);
    }
    return a(i, "Wrapper"), i.prototype = Object.create(n.prototype, {
      constructor: {
        value: i,
        enumerable: !1,
        writable: !0,
        configurable: !0
      }
    }), at(i, n);
  }, "_wrapNativeSuper"), _r(e);
}
a(_r, "_wrapNativeSuper");

// ../node_modules/polished/dist/polished.esm.js
var Zt = /* @__PURE__ */ function(e) {
  Ct(t, e);
  function t(r) {
    var n;
    if (1)
      n = e.call(this, "An error occurred. See https://github.com/styled-components/polished/blob/main/src/internalHelpers/errors.md#" + r +
      " for more information.") || this;
    else
      for (var i, o, s; s < i; s++)
        ;
    return jo(n);
  }
  return a(t, "PolishedError"), t;
}(/* @__PURE__ */ _r(Error));
function Go(e) {
  return Math.round(e * 255);
}
a(Go, "colorToInt");
function Th(e, t, r) {
  return Go(e) + "," + Go(t) + "," + Go(r);
}
a(Th, "convertToInt");
function Js(e, t, r, n) {
  if (n === void 0 && (n = Th), t === 0)
    return n(r, r, r);
  var i = (e % 360 + 360) % 360 / 60, o = (1 - Math.abs(2 * r - 1)) * t, s = o * (1 - Math.abs(i % 2 - 1)), u = 0, c = 0, p = 0;
  i >= 0 && i < 1 ? (u = o, c = s) : i >= 1 && i < 2 ? (u = s, c = o) : i >= 2 && i < 3 ? (c = o, p = s) : i >= 3 && i < 4 ? (c = s, p = o) :
  i >= 4 && i < 5 ? (u = s, p = o) : i >= 5 && i < 6 && (u = o, p = s);
  var d = r - o / 2, g = u + d, f = c + d, y = p + d;
  return n(g, f, y);
}
a(Js, "hslToRgb");
var el = {
  aliceblue: "f0f8ff",
  antiquewhite: "faebd7",
  aqua: "00ffff",
  aquamarine: "7fffd4",
  azure: "f0ffff",
  beige: "f5f5dc",
  bisque: "ffe4c4",
  black: "000",
  blanchedalmond: "ffebcd",
  blue: "0000ff",
  blueviolet: "8a2be2",
  brown: "a52a2a",
  burlywood: "deb887",
  cadetblue: "5f9ea0",
  chartreuse: "7fff00",
  chocolate: "d2691e",
  coral: "ff7f50",
  cornflowerblue: "6495ed",
  cornsilk: "fff8dc",
  crimson: "dc143c",
  cyan: "00ffff",
  darkblue: "00008b",
  darkcyan: "008b8b",
  darkgoldenrod: "b8860b",
  darkgray: "a9a9a9",
  darkgreen: "006400",
  darkgrey: "a9a9a9",
  darkkhaki: "bdb76b",
  darkmagenta: "8b008b",
  darkolivegreen: "556b2f",
  darkorange: "ff8c00",
  darkorchid: "9932cc",
  darkred: "8b0000",
  darksalmon: "e9967a",
  darkseagreen: "8fbc8f",
  darkslateblue: "483d8b",
  darkslategray: "2f4f4f",
  darkslategrey: "2f4f4f",
  darkturquoise: "00ced1",
  darkviolet: "9400d3",
  deeppink: "ff1493",
  deepskyblue: "00bfff",
  dimgray: "696969",
  dimgrey: "696969",
  dodgerblue: "1e90ff",
  firebrick: "b22222",
  floralwhite: "fffaf0",
  forestgreen: "228b22",
  fuchsia: "ff00ff",
  gainsboro: "dcdcdc",
  ghostwhite: "f8f8ff",
  gold: "ffd700",
  goldenrod: "daa520",
  gray: "808080",
  green: "008000",
  greenyellow: "adff2f",
  grey: "808080",
  honeydew: "f0fff0",
  hotpink: "ff69b4",
  indianred: "cd5c5c",
  indigo: "4b0082",
  ivory: "fffff0",
  khaki: "f0e68c",
  lavender: "e6e6fa",
  lavenderblush: "fff0f5",
  lawngreen: "7cfc00",
  lemonchiffon: "fffacd",
  lightblue: "add8e6",
  lightcoral: "f08080",
  lightcyan: "e0ffff",
  lightgoldenrodyellow: "fafad2",
  lightgray: "d3d3d3",
  lightgreen: "90ee90",
  lightgrey: "d3d3d3",
  lightpink: "ffb6c1",
  lightsalmon: "ffa07a",
  lightseagreen: "20b2aa",
  lightskyblue: "87cefa",
  lightslategray: "789",
  lightslategrey: "789",
  lightsteelblue: "b0c4de",
  lightyellow: "ffffe0",
  lime: "0f0",
  limegreen: "32cd32",
  linen: "faf0e6",
  magenta: "f0f",
  maroon: "800000",
  mediumaquamarine: "66cdaa",
  mediumblue: "0000cd",
  mediumorchid: "ba55d3",
  mediumpurple: "9370db",
  mediumseagreen: "3cb371",
  mediumslateblue: "7b68ee",
  mediumspringgreen: "00fa9a",
  mediumturquoise: "48d1cc",
  mediumvioletred: "c71585",
  midnightblue: "191970",
  mintcream: "f5fffa",
  mistyrose: "ffe4e1",
  moccasin: "ffe4b5",
  navajowhite: "ffdead",
  navy: "000080",
  oldlace: "fdf5e6",
  olive: "808000",
  olivedrab: "6b8e23",
  orange: "ffa500",
  orangered: "ff4500",
  orchid: "da70d6",
  palegoldenrod: "eee8aa",
  palegreen: "98fb98",
  paleturquoise: "afeeee",
  palevioletred: "db7093",
  papayawhip: "ffefd5",
  peachpuff: "ffdab9",
  peru: "cd853f",
  pink: "ffc0cb",
  plum: "dda0dd",
  powderblue: "b0e0e6",
  purple: "800080",
  rebeccapurple: "639",
  red: "f00",
  rosybrown: "bc8f8f",
  royalblue: "4169e1",
  saddlebrown: "8b4513",
  salmon: "fa8072",
  sandybrown: "f4a460",
  seagreen: "2e8b57",
  seashell: "fff5ee",
  sienna: "a0522d",
  silver: "c0c0c0",
  skyblue: "87ceeb",
  slateblue: "6a5acd",
  slategray: "708090",
  slategrey: "708090",
  snow: "fffafa",
  springgreen: "00ff7f",
  steelblue: "4682b4",
  tan: "d2b48c",
  teal: "008080",
  thistle: "d8bfd8",
  tomato: "ff6347",
  turquoise: "40e0d0",
  violet: "ee82ee",
  wheat: "f5deb3",
  white: "fff",
  whitesmoke: "f5f5f5",
  yellow: "ff0",
  yellowgreen: "9acd32"
};
function kh(e) {
  if (typeof e != "string") return e;
  var t = e.toLowerCase();
  return el[t] ? "#" + el[t] : e;
}
a(kh, "nameToHex");
var Oh = /^#[a-fA-F0-9]{6}$/, Ph = /^#[a-fA-F0-9]{8}$/, Ah = /^#[a-fA-F0-9]{3}$/, Mh = /^#[a-fA-F0-9]{4}$/, Yo = /^rgb\(\s*(\d{1,3})\s*(?:,)?\s*(\d{1,3})\s*(?:,)?\s*(\d{1,3})\s*\)$/i,
Dh = /^rgb(?:a)?\(\s*(\d{1,3})\s*(?:,)?\s*(\d{1,3})\s*(?:,)?\s*(\d{1,3})\s*(?:,|\/)\s*([-+]?\d*[.]?\d+[%]?)\s*\)$/i, Lh = /^hsl\(\s*(\d{0,3}[.]?[0-9]+(?:deg)?)\s*(?:,)?\s*(\d{1,3}[.]?[0-9]?)%\s*(?:,)?\s*(\d{1,3}[.]?[0-9]?)%\s*\)$/i,
Nh = /^hsl(?:a)?\(\s*(\d{0,3}[.]?[0-9]+(?:deg)?)\s*(?:,)?\s*(\d{1,3}[.]?[0-9]?)%\s*(?:,)?\s*(\d{1,3}[.]?[0-9]?)%\s*(?:,|\/)\s*([-+]?\d*[.]?\d+[%]?)\s*\)$/i;
function nl(e) {
  if (typeof e != "string")
    throw new Zt(3);
  var t = kh(e);
  if (t.match(Oh))
    return {
      red: parseInt("" + t[1] + t[2], 16),
      green: parseInt("" + t[3] + t[4], 16),
      blue: parseInt("" + t[5] + t[6], 16)
    };
  if (t.match(Ph)) {
    var r = parseFloat((parseInt("" + t[7] + t[8], 16) / 255).toFixed(2));
    return {
      red: parseInt("" + t[1] + t[2], 16),
      green: parseInt("" + t[3] + t[4], 16),
      blue: parseInt("" + t[5] + t[6], 16),
      alpha: r
    };
  }
  if (t.match(Ah))
    return {
      red: parseInt("" + t[1] + t[1], 16),
      green: parseInt("" + t[2] + t[2], 16),
      blue: parseInt("" + t[3] + t[3], 16)
    };
  if (t.match(Mh)) {
    var n = parseFloat((parseInt("" + t[4] + t[4], 16) / 255).toFixed(2));
    return {
      red: parseInt("" + t[1] + t[1], 16),
      green: parseInt("" + t[2] + t[2], 16),
      blue: parseInt("" + t[3] + t[3], 16),
      alpha: n
    };
  }
  var i = Yo.exec(t);
  if (i)
    return {
      red: parseInt("" + i[1], 10),
      green: parseInt("" + i[2], 10),
      blue: parseInt("" + i[3], 10)
    };
  var o = Dh.exec(t.substring(0, 50));
  if (o)
    return {
      red: parseInt("" + o[1], 10),
      green: parseInt("" + o[2], 10),
      blue: parseInt("" + o[3], 10),
      alpha: parseFloat("" + o[4]) > 1 ? parseFloat("" + o[4]) / 100 : parseFloat("" + o[4])
    };
  var s = Lh.exec(t);
  if (s) {
    var u = parseInt("" + s[1], 10), c = parseInt("" + s[2], 10) / 100, p = parseInt("" + s[3], 10) / 100, d = "rgb(" + Js(u, c, p) + ")", g = Yo.
    exec(d);
    if (!g)
      throw new Zt(4, t, d);
    return {
      red: parseInt("" + g[1], 10),
      green: parseInt("" + g[2], 10),
      blue: parseInt("" + g[3], 10)
    };
  }
  var f = Nh.exec(t.substring(0, 50));
  if (f) {
    var y = parseInt("" + f[1], 10), m = parseInt("" + f[2], 10) / 100, v = parseInt("" + f[3], 10) / 100, x = "rgb(" + Js(y, m, v) + ")", w = Yo.
    exec(x);
    if (!w)
      throw new Zt(4, t, x);
    return {
      red: parseInt("" + w[1], 10),
      green: parseInt("" + w[2], 10),
      blue: parseInt("" + w[3], 10),
      alpha: parseFloat("" + f[4]) > 1 ? parseFloat("" + f[4]) / 100 : parseFloat("" + f[4])
    };
  }
  throw new Zt(5);
}
a(nl, "parseToRgb");
var Fh = /* @__PURE__ */ a(function(t) {
  return t.length === 7 && t[1] === t[2] && t[3] === t[4] && t[5] === t[6] ? "#" + t[1] + t[3] + t[5] : t;
}, "reduceHexValue"), tl = Fh;
function Xt(e) {
  var t = e.toString(16);
  return t.length === 1 ? "0" + t : t;
}
a(Xt, "numberToHex");
function rl(e, t, r) {
  if (typeof e == "number" && typeof t == "number" && typeof r == "number")
    return tl("#" + Xt(e) + Xt(t) + Xt(r));
  if (typeof e == "object" && t === void 0 && r === void 0)
    return tl("#" + Xt(e.red) + Xt(e.green) + Xt(e.blue));
  throw new Zt(6);
}
a(rl, "rgb");
function Qo(e, t, r, n) {
  if (typeof e == "string" && typeof t == "number") {
    var i = nl(e);
    return "rgba(" + i.red + "," + i.green + "," + i.blue + "," + t + ")";
  } else {
    if (typeof e == "number" && typeof t == "number" && typeof r == "number" && typeof n == "number")
      return n >= 1 ? rl(e, t, r) : "rgba(" + e + "," + t + "," + r + "," + n + ")";
    if (typeof e == "object" && t === void 0 && r === void 0 && n === void 0)
      return e.alpha >= 1 ? rl(e.red, e.green, e.blue) : "rgba(" + e.red + "," + e.green + "," + e.blue + "," + e.alpha + ")";
  }
  throw new Zt(7);
}
a(Qo, "rgba");
function ol(e, t, r) {
  return /* @__PURE__ */ a(function() {
    var i = r.concat(Array.prototype.slice.call(arguments));
    return i.length >= t ? e.apply(this, i) : ol(e, t, i);
  }, "fn");
}
a(ol, "curried");
function Hh(e) {
  return ol(e, e.length, []);
}
a(Hh, "curry");
function Bh(e, t, r) {
  return Math.max(e, Math.min(t, r));
}
a(Bh, "guard");
function Rh(e, t) {
  if (t === "transparent") return t;
  var r = nl(t), n = typeof r.alpha == "number" ? r.alpha : 1, i = U({}, r, {
    alpha: Bh(0, 1, +(n * 100 - parseFloat(e) * 100).toFixed(2) / 100)
  });
  return Qo(i);
}
a(Rh, "transparentize");
var zh = /* @__PURE__ */ Hh(Rh), ge = zh;

// global-externals:@storybook/icons
var z_ = __STORYBOOK_ICONS__, { AccessibilityAltIcon: $_, AccessibilityIcon: W_, AddIcon: V_, AdminIcon: K_, AlertAltIcon: j_, AlertIcon: fn,
AlignLeftIcon: U_, AlignRightIcon: q_, AppleIcon: G_, ArrowDownIcon: Y_, ArrowLeftIcon: il, ArrowRightIcon: Q_, ArrowSolidDownIcon: X_, ArrowSolidLeftIcon: Z_,
ArrowSolidRightIcon: J_, ArrowSolidUpIcon: eT, ArrowUpIcon: tT, AzureDevOpsIcon: rT, BackIcon: nT, BasketIcon: oT, BatchAcceptIcon: iT, BatchDenyIcon: aT,
BeakerIcon: sT, BellIcon: lT, BitbucketIcon: uT, BoldIcon: cT, BookIcon: pT, BookmarkHollowIcon: dT, BookmarkIcon: fT, BottomBarIcon: mn, BottomBarToggleIcon: al,
BoxIcon: mT, BranchIcon: hT, BrowserIcon: gT, ButtonIcon: yT, CPUIcon: vT, CalendarIcon: bT, CameraIcon: IT, CategoryIcon: ST, CertificateIcon: xT,
ChangedIcon: wT, ChatIcon: ET, CheckIcon: tt, ChevronDownIcon: Jt, ChevronLeftIcon: CT, ChevronRightIcon: sl, ChevronSmallDownIcon: _T, ChevronSmallLeftIcon: TT,
ChevronSmallRightIcon: kT, ChevronSmallUpIcon: OT, ChevronUpIcon: PT, ChromaticIcon: AT, ChromeIcon: MT, CircleHollowIcon: DT, CircleIcon: ll,
ClearIcon: LT, CloseAltIcon: hn, CloseIcon: Qe, CloudHollowIcon: NT, CloudIcon: FT, CogIcon: Xo, CollapseIcon: ul, CommandIcon: HT, CommentAddIcon: BT,
CommentIcon: RT, CommentsIcon: zT, CommitIcon: $T, CompassIcon: WT, ComponentDrivenIcon: VT, ComponentIcon: Zo, ContrastIcon: KT, ControlsIcon: jT,
CopyIcon: UT, CreditIcon: qT, CrossIcon: GT, DashboardIcon: YT, DatabaseIcon: QT, DeleteIcon: XT, DiamondIcon: ZT, DirectionIcon: JT, DiscordIcon: e1,
DocChartIcon: t1, DocListIcon: r1, DocumentIcon: er, DownloadIcon: n1, DragIcon: o1, EditIcon: i1, EllipsisIcon: a1, EmailIcon: s1, ExpandAltIcon: cl,
ExpandIcon: pl, EyeCloseIcon: dl, EyeIcon: fl, FaceHappyIcon: l1, FaceNeutralIcon: u1, FaceSadIcon: c1, FacebookIcon: p1, FailedIcon: d1, FastForwardIcon: f1,
FigmaIcon: m1, FilterIcon: h1, FlagIcon: g1, FolderIcon: y1, FormIcon: v1, GDriveIcon: b1, GithubIcon: gn, GitlabIcon: I1, GlobeIcon: Jo, GoogleIcon: S1,
GraphBarIcon: x1, GraphLineIcon: w1, GraphqlIcon: E1, GridAltIcon: C1, GridIcon: _1, GrowIcon: T1, HeartHollowIcon: k1, HeartIcon: ml, HomeIcon: O1,
HourglassIcon: P1, InfoIcon: hl, ItalicIcon: A1, JumpToIcon: M1, KeyIcon: D1, LightningIcon: gl, LightningOffIcon: L1, LinkBrokenIcon: N1, LinkIcon: yl,
LinkedinIcon: F1, LinuxIcon: H1, ListOrderedIcon: B1, ListUnorderedIcon: R1, LocationIcon: z1, LockIcon: yn, MarkdownIcon: $1, MarkupIcon: W1,
MediumIcon: V1, MemoryIcon: K1, MenuIcon: vn, MergeIcon: j1, MirrorIcon: U1, MobileIcon: q1, MoonIcon: G1, NutIcon: Y1, OutboxIcon: Q1, OutlineIcon: X1,
PaintBrushIcon: Z1, PaperClipIcon: J1, ParagraphIcon: ek, PassedIcon: tk, PhoneIcon: rk, PhotoDragIcon: nk, PhotoIcon: ok, PinAltIcon: ik, PinIcon: ak,
PlayBackIcon: sk, PlayIcon: lk, PlayNextIcon: uk, PlusIcon: vl, PointerDefaultIcon: ck, PointerHandIcon: pk, PowerIcon: dk, PrintIcon: fk, ProceedIcon: mk,
ProfileIcon: hk, PullRequestIcon: gk, QuestionIcon: yk, RSSIcon: vk, RedirectIcon: bk, ReduxIcon: Ik, RefreshIcon: Sk, ReplyIcon: xk, RepoIcon: wk,
RequestChangeIcon: Ek, RewindIcon: Ck, RulerIcon: _k, SearchIcon: bn, ShareAltIcon: _t, ShareIcon: Tk, ShieldIcon: kk, SideBySideIcon: Ok, SidebarAltIcon: In,
SidebarAltToggleIcon: Pk, SidebarIcon: Ak, SidebarToggleIcon: Mk, SpeakerIcon: Dk, StackedIcon: Lk, StarHollowIcon: Nk, StarIcon: Fk, StickerIcon: Hk,
StopAltIcon: Bk, StopIcon: Rk, StorybookIcon: bl, StructureIcon: zk, SubtractIcon: $k, SunIcon: Wk, SupportIcon: Vk, SwitchAltIcon: Kk, SyncIcon: tr,
TabletIcon: jk, ThumbsUpIcon: Uk, TimeIcon: Il, TimerIcon: qk, TransferIcon: Gk, TrashIcon: Sl, TwitterIcon: Yk, TypeIcon: Qk, UbuntuIcon: Xk,
UndoIcon: Zk, UnfoldIcon: Jk, UnlockIcon: eO, UnpinIcon: tO, UploadIcon: rO, UserAddIcon: nO, UserAltIcon: oO, UserIcon: iO, UsersIcon: aO, VSCodeIcon: sO,
VerifiedIcon: lO, VideoIcon: uO, WandIcon: xl, WatchIcon: cO, WindowsIcon: pO, WrenchIcon: dO, YoutubeIcon: fO, ZoomIcon: wl, ZoomOutIcon: El,
ZoomResetIcon: Cl, iconList: mO } = __STORYBOOK_ICONS__;

// src/manager/components/hooks/useMedia.tsx
function _l(e) {
  let t = /* @__PURE__ */ a((o) => typeof window < "u" ? window.matchMedia(o).matches : !1, "getMatches"), [r, n] = J(t(e));
  function i() {
    n(t(e));
  }
  return a(i, "handleChange"), K(() => {
    let o = window.matchMedia(e);
    return i(), o.addEventListener("change", i), () => {
      o.removeEventListener("change", i);
    };
  }, [e]), r;
}
a(_l, "useMediaQuery");

// src/manager/constants.ts
var st = "@media (min-width: 600px)";

// src/manager/components/layout/LayoutProvider.tsx
var Tl = Qr({
  isMobileMenuOpen: !1,
  setMobileMenuOpen: /* @__PURE__ */ a(() => {
  }, "setMobileMenuOpen"),
  isMobileAboutOpen: !1,
  setMobileAboutOpen: /* @__PURE__ */ a(() => {
  }, "setMobileAboutOpen"),
  isMobilePanelOpen: !1,
  setMobilePanelOpen: /* @__PURE__ */ a(() => {
  }, "setMobilePanelOpen"),
  isDesktop: !1,
  isMobile: !1
}), kl = /* @__PURE__ */ a(({ children: e }) => {
  let [t, r] = J(!1), [n, i] = J(!1), [o, s] = J(!1), u = _l(`(min-width: ${600}px)`), c = !u, p = j(
    () => ({
      isMobileMenuOpen: t,
      setMobileMenuOpen: r,
      isMobileAboutOpen: n,
      setMobileAboutOpen: i,
      isMobilePanelOpen: o,
      setMobilePanelOpen: s,
      isDesktop: u,
      isMobile: c
    }),
    [
      t,
      r,
      n,
      i,
      o,
      s,
      u,
      c
    ]
  );
  return /* @__PURE__ */ l.createElement(Tl.Provider, { value: p }, e);
}, "LayoutProvider"), we = /* @__PURE__ */ a(() => ds(Tl), "useLayout");

// src/manager/components/sidebar/Menu.tsx
var Ol = S(ie)(({ highlighted: e, theme: t }) => ({
  position: "relative",
  overflow: "visible",
  marginTop: 0,
  zIndex: 1,
  ...e && {
    "&:before, &:after": {
      content: '""',
      position: "absolute",
      top: 6,
      right: 6,
      width: 5,
      height: 5,
      zIndex: 2,
      borderRadius: "50%",
      background: t.background.app,
      border: `1px solid ${t.background.app}`,
      boxShadow: `0 0 0 2px ${t.background.app}`
    },
    "&:after": {
      background: t.color.positive,
      border: "1px solid rgba(0, 0, 0, 0.1)",
      boxShadow: `0 0 0 2px ${t.background.app}`
    },
    "&:hover:after, &:focus-visible:after": {
      boxShadow: `0 0 0 2px ${ge(0.88, t.color.secondary)}`
    }
  }
})), $h = S.div({
  display: "flex",
  gap: 4
}), Wh = /* @__PURE__ */ a(({ menu: e, onHide: t }) => {
  let r = j(() => e.map(({ onClick: n, ...i }) => ({
    ...i,
    onClick: /* @__PURE__ */ a((o, s) => {
      n && n(o, s), t();
    }, "onClick")
  })), [e, t]);
  return /* @__PURE__ */ l.createElement(Yt, { links: r });
}, "SidebarMenuList"), Pl = /* @__PURE__ */ a(({ menu: e, isHighlighted: t, onClick: r }) => {
  let [n, i] = J(!1), { isMobile: o, setMobileMenuOpen: s } = we();
  return o ? /* @__PURE__ */ l.createElement($h, null, /* @__PURE__ */ l.createElement(
    Ol,
    {
      title: "About Storybook",
      "aria-label": "About Storybook",
      highlighted: t,
      active: !1,
      onClick: r
    },
    /* @__PURE__ */ l.createElement(Xo, null)
  ), /* @__PURE__ */ l.createElement(
    ie,
    {
      title: "Close menu",
      "aria-label": "Close menu",
      onClick: () => s(!1)
    },
    /* @__PURE__ */ l.createElement(Qe, null)
  )) : /* @__PURE__ */ l.createElement(
    ze,
    {
      placement: "top",
      closeOnOutsideClick: !0,
      tooltip: ({ onHide: u }) => /* @__PURE__ */ l.createElement(Wh, { onHide: u, menu: e }),
      onVisibleChange: i
    },
    /* @__PURE__ */ l.createElement(
      Ol,
      {
        title: "Shortcuts",
        "aria-label": "Shortcuts",
        highlighted: t,
        active: n
      },
      /* @__PURE__ */ l.createElement(Xo, null)
    )
  );
}, "SidebarMenu");

// src/manager/components/sidebar/Heading.tsx
var Vh = S.div(({ theme: e }) => ({
  fontSize: e.typography.size.s2,
  fontWeight: e.typography.weight.bold,
  color: e.color.defaultText,
  marginRight: 20,
  display: "flex",
  width: "100%",
  alignItems: "center",
  minHeight: 22,
  "& > * > *": {
    maxWidth: "100%"
  },
  "& > *": {
    maxWidth: "100%",
    height: "auto",
    display: "block",
    flex: "1 1 auto"
  }
})), Kh = S.div({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  position: "relative",
  minHeight: 42,
  paddingLeft: 8
}), jh = S(xe)(({ theme: e }) => ({
  display: "none",
  "@media (min-width: 600px)": {
    display: "block",
    position: "absolute",
    fontSize: e.typography.size.s1,
    zIndex: 3,
    border: 0,
    width: 1,
    height: 1,
    padding: 0,
    margin: -1,
    overflow: "hidden",
    clip: "rect(0, 0, 0, 0)",
    whiteSpace: "nowrap",
    wordWrap: "normal",
    opacity: 0,
    transition: "opacity 150ms ease-out",
    "&:focus": {
      width: "100%",
      height: "inherit",
      padding: "10px 15px",
      margin: 0,
      clip: "unset",
      overflow: "unset",
      opacity: 1
    }
  }
})), Al = /* @__PURE__ */ a(({
  menuHighlighted: e = !1,
  menu: t,
  skipLinkHref: r,
  extra: n,
  isLoading: i,
  onMenuClick: o,
  ...s
}) => /* @__PURE__ */ l.createElement(Kh, { ...s }, r && /* @__PURE__ */ l.createElement(jh, { asChild: !0 }, /* @__PURE__ */ l.createElement(
"a", { href: r, tabIndex: 0 }, "Skip to canvas")), /* @__PURE__ */ l.createElement(Vh, null, /* @__PURE__ */ l.createElement(Zs, null)), i ?
null : n.map(({ id: u, render: c }) => /* @__PURE__ */ l.createElement(c, { key: u })), /* @__PURE__ */ l.createElement(Pl, { menu: t, isHighlighted: e,
onClick: o })), "Heading");

// global-externals:@storybook/core/client-logger
var zO = __STORYBOOK_CLIENT_LOGGER__, { deprecate: $O, logger: Ml, once: WO, pretty: VO } = __STORYBOOK_CLIENT_LOGGER__;

// src/manager/components/sidebar/Loader.tsx
var Dl = [0, 0, 1, 1, 2, 3, 3, 3, 1, 1, 1, 2, 2, 2, 3], Uh = S.div(
  {
    cursor: "progress",
    fontSize: 13,
    height: "16px",
    marginTop: 4,
    marginBottom: 4,
    alignItems: "center",
    overflow: "hidden"
  },
  ({ depth: e = 0 }) => ({
    marginLeft: e * 15,
    maxWidth: 85 - e * 5
  }),
  ({ theme: e }) => e.animation.inlineGlow,
  ({ theme: e }) => ({
    background: e.appBorderColor
  })
), Tr = S.div({
  display: "flex",
  flexDirection: "column",
  paddingLeft: 20,
  paddingRight: 20
}), Ll = /* @__PURE__ */ a(({ size: e }) => {
  let t = Math.ceil(e / Dl.length), r = Array.from(Array(t)).fill(Dl).flat().slice(0, e);
  return /* @__PURE__ */ l.createElement(_e, null, r.map((n, i) => /* @__PURE__ */ l.createElement(Uh, { depth: n, key: i })));
}, "Loader");

// src/manager/components/sidebar/RefBlocks.tsx
var { window: Nl } = ae, qh = S.div(({ theme: e }) => ({
  fontSize: e.typography.size.s2,
  lineHeight: "20px",
  margin: 0
})), ei = S.div(({ theme: e }) => ({
  fontSize: e.typography.size.s2,
  lineHeight: "20px",
  margin: 0,
  code: {
    fontSize: e.typography.size.s1
  },
  ul: {
    paddingLeft: 20,
    marginTop: 8,
    marginBottom: 8
  }
})), Gh = S.pre(
  {
    width: 420,
    boxSizing: "border-box",
    borderRadius: 8,
    overflow: "auto",
    whiteSpace: "pre"
  },
  ({ theme: e }) => ({
    color: e.color.dark
  })
), Fl = /* @__PURE__ */ a(({ loginUrl: e, id: t }) => {
  let [r, n] = J(!1), i = A(() => {
    Nl.document.location.reload();
  }, []), o = A((s) => {
    s.preventDefault();
    let u = Nl.open(e, `storybook_auth_${t}`, "resizable,scrollbars"), c = setInterval(() => {
      u ? u.closed && (clearInterval(c), n(!0)) : (Ml.error("unable to access loginUrl window"), clearInterval(c));
    }, 1e3);
  }, []);
  return /* @__PURE__ */ l.createElement(Tr, null, /* @__PURE__ */ l.createElement(it, null, r ? /* @__PURE__ */ l.createElement(_e, null, /* @__PURE__ */ l.
  createElement(ei, null, "Authentication on ", /* @__PURE__ */ l.createElement("strong", null, e), " concluded. Refresh the page to fetch t\
his Storybook."), /* @__PURE__ */ l.createElement("div", null, /* @__PURE__ */ l.createElement(xe, { small: !0, gray: !0, onClick: i }, /* @__PURE__ */ l.
  createElement(tr, null), "Refresh now"))) : /* @__PURE__ */ l.createElement(_e, null, /* @__PURE__ */ l.createElement(ei, null, "Sign in t\
o browse this Storybook."), /* @__PURE__ */ l.createElement("div", null, /* @__PURE__ */ l.createElement(xe, { small: !0, gray: !0, onClick: o },
  /* @__PURE__ */ l.createElement(yn, null), "Sign in")))));
}, "AuthBlock"), Hl = /* @__PURE__ */ a(({ error: e }) => /* @__PURE__ */ l.createElement(Tr, null, /* @__PURE__ */ l.createElement(it, null,
/* @__PURE__ */ l.createElement(qh, null, "Oh no! Something went wrong loading this Storybook.", /* @__PURE__ */ l.createElement("br", null),
/* @__PURE__ */ l.createElement(
  ze,
  {
    tooltip: /* @__PURE__ */ l.createElement(Gh, null, /* @__PURE__ */ l.createElement(qs, { error: e }))
  },
  /* @__PURE__ */ l.createElement(Me, { isButton: !0 }, "View error ", /* @__PURE__ */ l.createElement(Jt, null))
), " ", /* @__PURE__ */ l.createElement(Me, { withArrow: !0, href: "https://storybook.js.org/docs", cancel: !1, target: "_blank" }, "View do\
cs")))), "ErrorBlock"), Yh = S(it)({
  display: "flex"
}), Qh = S(it)({
  flex: 1
}), Bl = /* @__PURE__ */ a(({ isMain: e }) => /* @__PURE__ */ l.createElement(Tr, null, /* @__PURE__ */ l.createElement(Yh, { col: 1 }, /* @__PURE__ */ l.
createElement(Qh, null, /* @__PURE__ */ l.createElement(ei, null, e ? /* @__PURE__ */ l.createElement(l.Fragment, null, "Oh no! Your Storybo\
ok is empty. Possible reasons why:", /* @__PURE__ */ l.createElement("ul", null, /* @__PURE__ */ l.createElement("li", null, "The glob speci\
fied in ", /* @__PURE__ */ l.createElement("code", null, "main.js"), " isn't correct."), /* @__PURE__ */ l.createElement("li", null, "No sto\
ries are defined in your story files."), /* @__PURE__ */ l.createElement("li", null, "You're using filter-functions, and all stories are fil\
tered away.")), " ") : /* @__PURE__ */ l.createElement(l.Fragment, null, "This composed storybook is empty, maybe you're using filter-functi\
ons, and all stories are filtered away."))))), "EmptyBlock"), Rl = /* @__PURE__ */ a(({ isMain: e }) => /* @__PURE__ */ l.createElement(Tr, null,
/* @__PURE__ */ l.createElement(Ll, { size: e ? 17 : 5 })), "LoaderBlock");

// src/manager/components/sidebar/RefIndicator.tsx
var { document: Xh, window: Zh } = ae, Jh = S.aside(({ theme: e }) => ({
  height: 16,
  display: "flex",
  alignItems: "center",
  "& > * + *": {
    marginLeft: e.layoutMargin
  }
})), eg = S.button(({ theme: e }) => ({
  height: 20,
  width: 20,
  padding: 0,
  margin: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "transparent",
  outline: "none",
  border: "1px solid transparent",
  borderRadius: "100%",
  cursor: "pointer",
  color: e.base === "light" ? ge(0.3, e.color.defaultText) : ge(0.6, e.color.defaultText),
  "&:hover": {
    color: e.barSelectedColor
  },
  "&:focus": {
    color: e.barSelectedColor,
    borderColor: e.color.secondary
  },
  svg: {
    height: 10,
    width: 10,
    transition: "all 150ms ease-out",
    color: "inherit"
  }
})), rr = S.span(({ theme: e }) => ({
  fontWeight: e.typography.weight.bold
})), nr = S.a(({ theme: e }) => ({
  textDecoration: "none",
  lineHeight: "16px",
  padding: 15,
  display: "flex",
  flexDirection: "row",
  alignItems: "flex-start",
  color: e.color.defaultText,
  "&:not(:last-child)": {
    borderBottom: `1px solid ${e.appBorderColor}`
  },
  "&:hover": {
    background: e.background.hoverable,
    color: e.color.darker
  },
  "&:link": {
    color: e.color.darker
  },
  "&:active": {
    color: e.color.darker
  },
  "&:focus": {
    color: e.color.darker
  },
  "& > *": {
    flex: 1
  },
  "& > svg": {
    marginTop: 3,
    width: 16,
    height: 16,
    marginRight: 10,
    flex: "unset"
  }
})), tg = S.div({
  width: 280,
  boxSizing: "border-box",
  borderRadius: 8,
  overflow: "hidden"
}), rg = S.div(({ theme: e }) => ({
  display: "flex",
  alignItems: "center",
  fontSize: e.typography.size.s1,
  fontWeight: e.typography.weight.regular,
  color: e.base === "light" ? ge(0.3, e.color.defaultText) : ge(0.6, e.color.defaultText),
  "& > * + *": {
    marginLeft: 4
  },
  svg: {
    height: 10,
    width: 10
  }
})), ng = /* @__PURE__ */ a(({ url: e, versions: t }) => {
  let r = j(() => {
    let n = Object.entries(t).find(([i, o]) => o === e);
    return n && n[0] ? n[0] : "current";
  }, [e, t]);
  return /* @__PURE__ */ l.createElement(rg, null, /* @__PURE__ */ l.createElement("span", null, r), /* @__PURE__ */ l.createElement(Jt, null));
}, "CurrentVersion"), zl = l.memo(
  ps(
    ({ state: e, ...t }, r) => {
      let n = me(), i = j(() => Object.values(t.index || {}), [t.index]), o = j(
        () => i.filter((u) => u.type === "component").length,
        [i]
      ), s = j(
        () => i.filter((u) => u.type === "docs" || u.type === "story").length,
        [i]
      );
      return /* @__PURE__ */ l.createElement(Jh, { ref: r }, /* @__PURE__ */ l.createElement(
        ze,
        {
          placement: "bottom-start",
          trigger: "click",
          closeOnOutsideClick: !0,
          tooltip: /* @__PURE__ */ l.createElement(tg, null, /* @__PURE__ */ l.createElement(it, { row: 0 }, e === "loading" && /* @__PURE__ */ l.
          createElement(lg, { url: t.url }), (e === "error" || e === "empty") && /* @__PURE__ */ l.createElement(sg, { url: t.url }), e === "\
ready" && /* @__PURE__ */ l.createElement(og, { url: t.url, componentCount: o, leafCount: s }), e === "auth" && /* @__PURE__ */ l.createElement(
          ig, { ...t }), t.type === "auto-inject" && e !== "error" && /* @__PURE__ */ l.createElement(ug, null), e !== "loading" && /* @__PURE__ */ l.
          createElement(ag, null)))
        },
        /* @__PURE__ */ l.createElement(eg, { "data-action": "toggle-indicator", "aria-label": "toggle indicator" }, /* @__PURE__ */ l.createElement(
        Jo, null))
      ), t.versions && Object.keys(t.versions).length ? /* @__PURE__ */ l.createElement(
        ze,
        {
          placement: "bottom-start",
          trigger: "click",
          closeOnOutsideClick: !0,
          tooltip: (u) => /* @__PURE__ */ l.createElement(
            Yt,
            {
              links: Object.entries(t.versions).map(([c, p]) => ({
                icon: p === t.url ? "check" : void 0,
                id: c,
                title: c,
                href: p,
                onClick: /* @__PURE__ */ a((d, g) => {
                  d.preventDefault(), n.changeRefVersion(t.id, g.href), u.onHide();
                }, "onClick")
              }))
            }
          )
        },
        /* @__PURE__ */ l.createElement(ng, { url: t.url, versions: t.versions })
      ) : null);
    }
  )
), og = /* @__PURE__ */ a(({ url: e, componentCount: t, leafCount: r }) => {
  let n = Re();
  return /* @__PURE__ */ l.createElement(nr, { href: e.replace(/\/?$/, "/index.html"), target: "_blank" }, /* @__PURE__ */ l.createElement(Jo,
  { color: n.color.secondary }), /* @__PURE__ */ l.createElement("div", null, /* @__PURE__ */ l.createElement(rr, null, "View external Story\
book"), /* @__PURE__ */ l.createElement("div", null, "Explore ", t, " components and ", r, " stories in a new browser tab.")));
}, "ReadyMessage"), ig = /* @__PURE__ */ a(({ loginUrl: e, id: t }) => {
  let r = Re(), n = A((i) => {
    i.preventDefault();
    let o = Zh.open(e, `storybook_auth_${t}`, "resizable,scrollbars"), s = setInterval(() => {
      o ? o.closed && (clearInterval(s), Xh.location.reload()) : clearInterval(s);
    }, 1e3);
  }, []);
  return /* @__PURE__ */ l.createElement(nr, { onClick: n }, /* @__PURE__ */ l.createElement(yn, { color: r.color.gold }), /* @__PURE__ */ l.
  createElement("div", null, /* @__PURE__ */ l.createElement(rr, null, "Log in required"), /* @__PURE__ */ l.createElement("div", null, "You\
 need to authenticate to view this Storybook's components.")));
}, "LoginRequiredMessage"), ag = /* @__PURE__ */ a(() => {
  let e = Re();
  return /* @__PURE__ */ l.createElement(
    nr,
    {
      href: "https://storybook.js.org/docs/react/sharing/storybook-composition",
      target: "_blank"
    },
    /* @__PURE__ */ l.createElement(er, { color: e.color.green }),
    /* @__PURE__ */ l.createElement("div", null, /* @__PURE__ */ l.createElement(rr, null, "Read Composition docs"), /* @__PURE__ */ l.createElement(
    "div", null, "Learn how to combine multiple Storybooks into one."))
  );
}, "ReadDocsMessage"), sg = /* @__PURE__ */ a(({ url: e }) => {
  let t = Re();
  return /* @__PURE__ */ l.createElement(nr, { href: e.replace(/\/?$/, "/index.html"), target: "_blank" }, /* @__PURE__ */ l.createElement(fn,
  { color: t.color.negative }), /* @__PURE__ */ l.createElement("div", null, /* @__PURE__ */ l.createElement(rr, null, "Something went wrong"),
  /* @__PURE__ */ l.createElement("div", null, "This external Storybook didn't load. Debug it in a new tab now.")));
}, "ErrorOccurredMessage"), lg = /* @__PURE__ */ a(({ url: e }) => {
  let t = Re();
  return /* @__PURE__ */ l.createElement(nr, { href: e.replace(/\/?$/, "/index.html"), target: "_blank" }, /* @__PURE__ */ l.createElement(Il,
  { color: t.color.secondary }), /* @__PURE__ */ l.createElement("div", null, /* @__PURE__ */ l.createElement(rr, null, "Please wait"), /* @__PURE__ */ l.
  createElement("div", null, "This Storybook is loading.")));
}, "LoadingMessage"), ug = /* @__PURE__ */ a(() => {
  let e = Re();
  return /* @__PURE__ */ l.createElement(
    nr,
    {
      href: "https://storybook.js.org/docs/react/sharing/storybook-composition#improve-your-storybook-composition",
      target: "_blank"
    },
    /* @__PURE__ */ l.createElement(gl, { color: e.color.gold }),
    /* @__PURE__ */ l.createElement("div", null, /* @__PURE__ */ l.createElement(rr, null, "Reduce lag"), /* @__PURE__ */ l.createElement("d\
iv", null, "Learn how to speed up Composition performance."))
  );
}, "PerformanceDegradedMessage");

// src/manager/components/sidebar/IconSymbols.tsx
var cg = S.svg`
  position: absolute;
  width: 0;
  height: 0;
  display: inline-block;
  shape-rendering: inherit;
  vertical-align: middle;
`, $l = "icon--group", Wl = "icon--component", Vl = "icon--document", Kl = "icon--story", jl = /* @__PURE__ */ a(() => /* @__PURE__ */ l.createElement(
cg, { "data-chromatic": "ignore" }, /* @__PURE__ */ l.createElement("symbol", { id: $l }, /* @__PURE__ */ l.createElement(
  "path",
  {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M6.586 3.504l-1.5-1.5H1v9h12v-7.5H6.586zm.414-1L5.793 1.297a1 1 0 00-.707-.293H.5a.5.5 0 00-.5.5v10a.5.5 0 00.5.5h13a.5.5 0 00.5-.5v\
-8.5a.5.5 0 00-.5-.5H7z",
    fill: "currentColor"
  }
)), /* @__PURE__ */ l.createElement("symbol", { id: Wl }, /* @__PURE__ */ l.createElement(
  "path",
  {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M3.5 1.004a2.5 2.5 0 00-2.5 2.5v7a2.5 2.5 0 002.5 2.5h7a2.5 2.5 0 002.5-2.5v-7a2.5 2.5 0 00-2.5-2.5h-7zm8.5 5.5H7.5v-4.5h3a1.5 1.5 0\
 011.5 1.5v3zm0 1v3a1.5 1.5 0 01-1.5 1.5h-3v-4.5H12zm-5.5 4.5v-4.5H2v3a1.5 1.5 0 001.5 1.5h3zM2 6.504h4.5v-4.5h-3a1.5 1.5 0 00-1.5 1.5v3z",
    fill: "currentColor"
  }
)), /* @__PURE__ */ l.createElement("symbol", { id: Vl }, /* @__PURE__ */ l.createElement(
  "path",
  {
    d: "M4 5.5a.5.5 0 01.5-.5h5a.5.5 0 010 1h-5a.5.5 0 01-.5-.5zM4.5 7.5a.5.5 0 000 1h5a.5.5 0 000-1h-5zM4 10.5a.5.5 0 01.5-.5h5a.5.5 0 010 \
1h-5a.5.5 0 01-.5-.5z",
    fill: "currentColor"
  }
), /* @__PURE__ */ l.createElement(
  "path",
  {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M1.5 0a.5.5 0 00-.5.5v13a.5.5 0 00.5.5h11a.5.5 0 00.5-.5V3.207a.5.5 0 00-.146-.353L10.146.146A.5.5 0 009.793 0H1.5zM2 1h7.5v2a.5.5 0\
 00.5.5h2V13H2V1z",
    fill: "currentColor"
  }
)), /* @__PURE__ */ l.createElement("symbol", { id: Kl }, /* @__PURE__ */ l.createElement(
  "path",
  {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M3.5 0h7a.5.5 0 01.5.5v13a.5.5 0 01-.454.498.462.462 0 01-.371-.118L7 11.159l-3.175 2.72a.46.46 0 01-.379.118A.5.5 0 013 13.5V.5a.5.\
5 0 01.5-.5zM4 12.413l2.664-2.284a.454.454 0 01.377-.128.498.498 0 01.284.12L10 12.412V1H4v11.413z",
    fill: "currentColor"
  }
))), "IconSymbols"), lt = /* @__PURE__ */ a(({ type: e }) => e === "group" ? /* @__PURE__ */ l.createElement("use", { xlinkHref: `#${$l}` }) :
e === "component" ? /* @__PURE__ */ l.createElement("use", { xlinkHref: `#${Wl}` }) : e === "document" ? /* @__PURE__ */ l.createElement("us\
e", { xlinkHref: `#${Vl}` }) : e === "story" ? /* @__PURE__ */ l.createElement("use", { xlinkHref: `#${Kl}` }) : null, "UseSymbol");

// src/manager/components/sidebar/components/CollapseIcon.tsx
var pg = S.div(({ theme: e, isExpanded: t }) => ({
  width: 8,
  height: 8,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  color: ge(0.4, e.textMutedColor),
  transform: t ? "rotateZ(90deg)" : "none",
  transition: "transform .1s ease-out"
})), Tt = /* @__PURE__ */ a(({ isExpanded: e }) => /* @__PURE__ */ l.createElement(pg, { isExpanded: e }, /* @__PURE__ */ l.createElement("s\
vg", { xmlns: "http://www.w3.org/2000/svg", width: "8", height: "8", fill: "none" }, /* @__PURE__ */ l.createElement(
  "path",
  {
    fill: "#73828C",
    fillRule: "evenodd",
    d: "M1.896 7.146a.5.5 0 1 0 .708.708l3.5-3.5a.5.5 0 0 0 0-.708l-3.5-3.5a.5.5 0 1 0-.708.708L5.043 4 1.896 7.146Z",
    clipRule: "evenodd"
  }
))), "CollapseIcon");

// src/manager/components/sidebar/TreeNode.tsx
var mt = S.svg(
  ({ theme: e, type: t }) => ({
    width: 14,
    height: 14,
    flex: "0 0 auto",
    color: t === "group" ? e.base === "dark" ? e.color.primary : e.color.ultraviolet : t === "component" ? e.color.secondary : t === "docume\
nt" ? e.base === "dark" ? e.color.gold : "#ff8300" : t === "story" ? e.color.seafoam : "currentColor"
  })
), Ul = S.button(({ theme: e, depth: t = 0, isExpandable: r = !1 }) => ({
  width: "100%",
  border: "none",
  cursor: "pointer",
  display: "flex",
  alignItems: "start",
  textAlign: "left",
  paddingLeft: `${(r ? 8 : 22) + t * 18}px`,
  color: "inherit",
  fontSize: `${e.typography.size.s2}px`,
  background: "transparent",
  minHeight: 28,
  borderRadius: 4,
  gap: 6,
  paddingTop: 5,
  paddingBottom: 4,
  "&:hover, &:focus": {
    background: ge(0.93, e.color.secondary),
    outline: "none"
  }
})), ql = S.a(({ theme: e, depth: t = 0 }) => ({
  cursor: "pointer",
  color: "inherit",
  display: "flex",
  gap: 6,
  flex: 1,
  alignItems: "start",
  paddingLeft: `${22 + t * 18}px`,
  paddingTop: 5,
  paddingBottom: 4,
  fontSize: `${e.typography.size.s2}px`,
  textDecoration: "none",
  overflowWrap: "break-word",
  wordWrap: "break-word",
  wordBreak: "break-word"
})), Gl = S.div(({ theme: e }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  marginTop: 16,
  marginBottom: 4,
  fontSize: `${e.typography.size.s1 - 1}px`,
  fontWeight: e.typography.weight.bold,
  lineHeight: "16px",
  minHeight: 28,
  letterSpacing: "0.16em",
  textTransform: "uppercase",
  color: e.textMutedColor
})), Sn = S.div({
  display: "flex",
  alignItems: "center",
  gap: 6,
  marginTop: 2
}), Yl = l.memo(/* @__PURE__ */ a(function({
  children: t,
  isExpanded: r = !1,
  isExpandable: n = !1,
  ...i
}) {
  return /* @__PURE__ */ l.createElement(Ul, { isExpandable: n, tabIndex: -1, ...i }, /* @__PURE__ */ l.createElement(Sn, null, n && /* @__PURE__ */ l.
  createElement(Tt, { isExpanded: r }), /* @__PURE__ */ l.createElement(mt, { viewBox: "0 0 14 14", width: "14", height: "14", type: "group" },
  /* @__PURE__ */ l.createElement(lt, { type: "group" }))), t);
}, "GroupNode")), Ql = l.memo(
  /* @__PURE__ */ a(function({ theme: t, children: r, isExpanded: n, isExpandable: i, isSelected: o, ...s }) {
    return /* @__PURE__ */ l.createElement(Ul, { isExpandable: i, tabIndex: -1, ...s }, /* @__PURE__ */ l.createElement(Sn, null, i && /* @__PURE__ */ l.
    createElement(Tt, { isExpanded: n }), /* @__PURE__ */ l.createElement(mt, { viewBox: "0 0 14 14", width: "12", height: "12", type: "comp\
onent" }, /* @__PURE__ */ l.createElement(lt, { type: "component" }))), r);
  }, "ComponentNode")
), Xl = l.memo(
  /* @__PURE__ */ a(function({ theme: t, children: r, docsMode: n, ...i }) {
    return /* @__PURE__ */ l.createElement(ql, { tabIndex: -1, ...i }, /* @__PURE__ */ l.createElement(Sn, null, /* @__PURE__ */ l.createElement(
    mt, { viewBox: "0 0 14 14", width: "12", height: "12", type: "document" }, /* @__PURE__ */ l.createElement(lt, { type: "document" }))), r);
  }, "DocumentNode")
), Zl = l.memo(/* @__PURE__ */ a(function({
  theme: t,
  children: r,
  ...n
}) {
  return /* @__PURE__ */ l.createElement(ql, { tabIndex: -1, ...n }, /* @__PURE__ */ l.createElement(Sn, null, /* @__PURE__ */ l.createElement(
  mt, { viewBox: "0 0 14 14", width: "12", height: "12", type: "story" }, /* @__PURE__ */ l.createElement(lt, { type: "story" }))), r);
}, "StoryNode"));

// src/manager/components/sidebar/useExpanded.ts
var Wu = Fe(Au(), 1);

// src/manager/keybinding.ts
var oy = {
  // event.code => event.key
  Space: " ",
  Slash: "/",
  ArrowLeft: "ArrowLeft",
  ArrowUp: "ArrowUp",
  ArrowRight: "ArrowRight",
  ArrowDown: "ArrowDown",
  Escape: "Escape",
  Enter: "Enter"
}, iy = { alt: !1, ctrl: !1, meta: !1, shift: !1 }, ht = /* @__PURE__ */ a((e, t) => {
  let { alt: r, ctrl: n, meta: i, shift: o } = e === !1 ? iy : e;
  return !(typeof r == "boolean" && r !== t.altKey || typeof n == "boolean" && n !== t.ctrlKey || typeof i == "boolean" && i !== t.metaKey ||
  typeof o == "boolean" && o !== t.shiftKey);
}, "matchesModifiers"), Ke = /* @__PURE__ */ a((e, t) => t.code ? t.code === e : t.key === oy[e], "matchesKeyCode");

// src/manager/utils/tree.ts
var or = Fe(wn(), 1);
var { document: Nu, window: ay } = ae, En = /* @__PURE__ */ a((e, t) => !t || t === rt ? e : `${t}_${e}`, "createId"), Fu = /* @__PURE__ */ a(
(e, t) => `${Nu.location.pathname}?path=/${e.type}/${En(e.id, t)}`, "getLink");
var Du = (0, or.default)(1e3)((e, t) => t[e]), sy = (0, or.default)(1e3)((e, t) => {
  let r = Du(e, t);
  return r && r.type !== "root" ? Du(r.parent, t) : void 0;
}), Hu = (0, or.default)(1e3)((e, t) => {
  let r = sy(e, t);
  return r ? [r, ...Hu(r.id, t)] : [];
}), Or = (0, or.default)(1e3)(
  (e, t) => Hu(t, e).map((r) => r.id)
), gt = (0, or.default)(1e3)((e, t, r) => {
  let n = e[t];
  return (n.type === "story" || n.type === "docs" ? [] : n.children).reduce((o, s) => {
    let u = e[s];
    return !u || r && (u.type === "story" || u.type === "docs") || o.push(s, ...gt(e, s, r)), o;
  }, []);
});
function Bu(e, t) {
  let r = e.type !== "root" && e.parent ? t.index[e.parent] : null;
  return r ? [...Bu(r, t), r.name] : t.id === rt ? [] : [t.title || t.id];
}
a(Bu, "getPath");
var ai = /* @__PURE__ */ a((e, t) => ({ ...e, refId: t.id, path: Bu(e, t) }), "searchItem");
function Ru(e, t, r) {
  let n = t + r % e.length;
  return n < 0 && (n = e.length + n), n >= e.length && (n -= e.length), n;
}
a(Ru, "cycle");
var kt = /* @__PURE__ */ a((e, t = !1) => {
  if (!e) return;
  let { top: r, bottom: n } = e.getBoundingClientRect();
  r >= 0 && n <= (ay.innerHeight || Nu.documentElement.clientHeight) || e.scrollIntoView({ block: t ? "center" : "nearest" });
}, "scrollIntoView"), zu = /* @__PURE__ */ a((e, t, r, n) => {
  switch (!0) {
    case t:
      return "auth";
    case r:
      return "error";
    case e:
      return "loading";
    case n:
      return "empty";
    default:
      return "ready";
  }
}, "getStateType"), Ot = /* @__PURE__ */ a((e, t) => !e || !t ? !1 : e === t ? !0 : Ot(e.parentElement || void 0, t), "isAncestor"), Lu = /* @__PURE__ */ a(
(e) => e.replaceAll(/(\s|-|_)/gi, ""), "removeNoiseFromName"), $u = /* @__PURE__ */ a((e, t) => Lu(e) === Lu(t), "isStoryHoistable");

// src/manager/components/sidebar/useExpanded.ts
var { document: si } = ae, ly = /* @__PURE__ */ a(({
  refId: e,
  data: t,
  initialExpanded: r,
  highlightedRef: n,
  rootIds: i
}) => {
  let o = n.current?.refId === e ? Or(t, n.current?.itemId) : [];
  return [...i, ...o].reduce(
    // @ts-expect-error (non strict)
    (s, u) => Object.assign(s, { [u]: u in r ? r[u] : !0 }),
    {}
  );
}, "initializeExpanded"), uy = /* @__PURE__ */ a(() => {
}, "noop"), Vu = /* @__PURE__ */ a(({
  containerRef: e,
  isBrowsing: t,
  refId: r,
  data: n,
  initialExpanded: i,
  rootIds: o,
  highlightedRef: s,
  setHighlightedItemId: u,
  selectedStoryId: c,
  onSelectStoryId: p
}) => {
  let d = me(), [g, f] = Kt(
    (h, { ids: b, value: I }) => b.reduce((C, _) => Object.assign(C, { [_]: I }), { ...h }),
    // @ts-expect-error (non strict)
    { refId: r, data: n, highlightedRef: s, rootIds: o, initialExpanded: i },
    ly
  ), y = A(
    (h) => e.current?.querySelector(`[data-item-id="${h}"]`),
    [e]
  ), m = A(
    (h) => {
      u(h.getAttribute("data-item-id")), kt(h);
    },
    [u]
  ), v = A(
    ({ ids: h, value: b }) => {
      if (f({ ids: h, value: b }), h.length === 1) {
        let I = e.current?.querySelector(
          `[data-item-id="${h[0]}"][data-ref-id="${r}"]`
        );
        I && m(I);
      }
    },
    [e, m, r]
  );
  K(() => {
    f({ ids: Or(n, c), value: !0 });
  }, [n, c]);
  let x = A(() => {
    let h = Object.keys(n).filter((b) => !o.includes(b));
    f({ ids: h, value: !1 });
  }, [n, o]), w = A(() => {
    f({ ids: Object.keys(n), value: !0 });
  }, [n]);
  return K(() => d ? (d.on(Ao, x), d.on(Mo, w), () => {
    d.off(Ao, x), d.off(Mo, w);
  }) : uy, [d, x, w]), K(() => {
    let h = si.getElementById("storybook-explorer-menu"), b = (0, Wu.default)((I) => {
      let C = s.current?.refId === r && s.current?.itemId;
      if (!t || !e.current || !C || I.repeat || !ht(!1, I)) return;
      let _ = Ke("Enter", I), T = Ke("Space", I), k = Ke("ArrowLeft", I), E = Ke("ArrowRight", I);
      if (!(_ || T || k || E)) return;
      let O = y(C);
      if (!O || O.getAttribute("data-ref-id") !== r) return;
      let P = I.target;
      if (!Ot(h, P) && !Ot(P, h)) return;
      if (P.hasAttribute("data-action")) {
        if (_ || T) return;
        P.blur();
      }
      let M = O.getAttribute("data-nodetype");
      (_ || T) && ["component", "story", "document"].includes(M) && p(C);
      let L = O.getAttribute("aria-expanded");
      if (k) {
        if (L === "true") {
          f({ ids: [C], value: !1 });
          return;
        }
        let D = O.getAttribute("data-parent-id"), V = D && y(D);
        if (V && V.getAttribute("data-highlightable") === "true") {
          m(V);
          return;
        }
        f({ ids: gt(n, C, !0), value: !1 });
        return;
      }
      E && (L === "false" ? v({ ids: [C], value: !0 }) : L === "true" && v({ ids: gt(n, C, !0), value: !0 }));
    }, 60);
    return si.addEventListener("keydown", b), () => si.removeEventListener("keydown", b);
  }, [
    e,
    t,
    r,
    n,
    s,
    u,
    p
  ]), [g, v];
}, "useExpanded");

// src/manager/utils/status.tsx
var Cn = S(ll)({
  // specificity hack
  "&&&": {
    width: 6,
    height: 6
  }
}), cy = S(Cn)(({ theme: { animation: e, color: t, base: r } }) => ({
  // specificity hack
  animation: `${e.glow} 1.5s ease-in-out infinite`,
  color: r === "light" ? t.mediumdark : t.darker
})), py = ["unknown", "pending", "success", "warn", "error"], ir = {
  unknown: [null, null],
  pending: [/* @__PURE__ */ l.createElement(cy, { key: "icon" }), "currentColor"],
  success: [/* @__PURE__ */ l.createElement(Cn, { key: "icon", style: { color: "green" } }), "currentColor"],
  warn: [/* @__PURE__ */ l.createElement(Cn, { key: "icon", style: { color: "orange" } }), "#A15C20"],
  error: [/* @__PURE__ */ l.createElement(Cn, { key: "icon", style: { color: "red" } }), "brown"]
}, Pr = /* @__PURE__ */ a((e) => py.reduce(
  (t, r) => e.includes(r) ? r : t,
  "unknown"
), "getHighestStatus");
function _n(e, t) {
  return Object.values(e).reduce((r, n) => {
    if (n.type === "group" || n.type === "component") {
      let i = gt(e, n.id, !1).map((s) => e[s]).filter((s) => s.type === "story"), o = Pr(
        // @ts-expect-error (non strict)
        i.flatMap((s) => Object.values(t?.[s.id] || {})).map((s) => s.status)
      );
      o && (r[n.id] = o);
    }
    return r;
  }, {});
}
a(_n, "getGroupStatus");

// src/manager/components/sidebar/Tree.tsx
var dy = S.div((e) => ({
  marginTop: e.hasOrphans ? 20 : 0,
  marginBottom: 20
})), fy = S.button(
  ({ theme: e, height: t, width: r }) => ({
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: r || 20,
    height: t || 20,
    boxSizing: "border-box",
    margin: 0,
    marginLeft: "auto",
    padding: 0,
    outline: 0,
    lineHeight: "normal",
    background: "none",
    border: "1px solid transparent",
    borderRadius: "100%",
    cursor: "pointer",
    transition: "all 150ms ease-out",
    color: e.base === "light" ? ge(0.3, e.color.defaultText) : ge(0.6, e.color.defaultText),
    "&:hover": {
      color: e.color.secondary
    },
    "&:focus": {
      color: e.color.secondary,
      borderColor: e.color.secondary,
      "&:not(:focus-visible)": {
        borderColor: "transparent"
      }
    },
    svg: {
      width: 10,
      height: 10
    }
  })
), my = S.button(({ theme: e }) => ({
  all: "unset",
  display: "flex",
  padding: "0px 8px",
  borderRadius: 4,
  transition: "color 150ms, box-shadow 150ms",
  gap: 6,
  alignItems: "center",
  cursor: "pointer",
  height: 28,
  "&:hover, &:focus": {
    outline: "none",
    background: ge(0.93, e.color.secondary)
  }
})), hy = S.div(({ theme: e }) => ({
  position: "relative",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  paddingRight: 20,
  color: e.color.defaultText,
  background: "transparent",
  minHeight: 28,
  borderRadius: 4,
  "&:hover, &:focus": {
    outline: "none",
    background: ge(0.93, e.color.secondary)
  },
  '&[data-selected="true"]': {
    color: e.color.lightest,
    background: e.color.secondary,
    fontWeight: e.typography.weight.bold,
    "&:hover, &:focus": {
      background: e.color.secondary
    },
    svg: { color: e.color.lightest }
  },
  a: { color: "currentColor" }
})), gy = S(xe)(({ theme: e }) => ({
  display: "none",
  "@media (min-width: 600px)": {
    display: "block",
    fontSize: "10px",
    overflow: "hidden",
    width: 1,
    height: "20px",
    boxSizing: "border-box",
    opacity: 0,
    padding: 0,
    "&:focus": {
      opacity: 1,
      padding: "5px 10px",
      background: "white",
      color: e.color.secondary,
      width: "auto"
    }
  }
})), Ku = l.memo(/* @__PURE__ */ a(function({
  item: t,
  status: r,
  refId: n,
  docsMode: i,
  isOrphan: o,
  isDisplayed: s,
  isSelected: u,
  isFullyExpanded: c,
  color: p,
  setFullyExpanded: d,
  isExpanded: g,
  setExpanded: f,
  onSelectStoryId: y,
  api: m
}) {
  let { isDesktop: v, isMobile: x, setMobileMenuOpen: w } = we();
  if (!s)
    return null;
  let h = En(t.id, n);
  if (t.type === "story" || t.type === "docs") {
    let b = t.type === "docs" ? Xl : Zl, I = Pr(Object.values(r || {}).map((T) => T.status)), [C, _] = ir[I];
    return /* @__PURE__ */ l.createElement(
      hy,
      {
        "data-selected": u,
        "data-ref-id": n,
        "data-item-id": t.id,
        "data-parent-id": t.parent,
        "data-nodetype": t.type === "docs" ? "document" : "story",
        "data-highlightable": s,
        className: "sidebar-item"
      },
      /* @__PURE__ */ l.createElement(
        b,
        {
          style: u ? {} : { color: _ },
          key: h,
          href: Fu(t, n),
          id: h,
          depth: o ? t.depth : t.depth - 1,
          onClick: (T) => {
            T.preventDefault(), y(t.id), x && w(!1);
          },
          ...t.type === "docs" && { docsMode: i }
        },
        t.renderLabel?.(t, m) || t.name
      ),
      u && /* @__PURE__ */ l.createElement(gy, { asChild: !0 }, /* @__PURE__ */ l.createElement("a", { href: "#storybook-preview-wrapper" },
      "Skip to canvas")),
      C ? /* @__PURE__ */ l.createElement(
        ze,
        {
          placement: "top",
          style: { display: "flex" },
          tooltip: () => /* @__PURE__ */ l.createElement(
            Yt,
            {
              links: Object.entries(r || {}).map(([T, k]) => ({
                id: T,
                title: k.title,
                description: k.description,
                right: ir[k.status][0]
              }))
            }
          ),
          closeOnOutsideClick: !0
        },
        /* @__PURE__ */ l.createElement(fy, { type: "button", height: 22 }, C)
      ) : null
    );
  }
  if (t.type === "root")
    return /* @__PURE__ */ l.createElement(
      Gl,
      {
        key: h,
        id: h,
        className: "sidebar-subheading",
        "data-ref-id": n,
        "data-item-id": t.id,
        "data-nodetype": "root"
      },
      /* @__PURE__ */ l.createElement(
        my,
        {
          type: "button",
          "data-action": "collapse-root",
          onClick: (b) => {
            b.preventDefault(), f({ ids: [t.id], value: !g });
          },
          "aria-expanded": g
        },
        /* @__PURE__ */ l.createElement(Tt, { isExpanded: g }),
        t.renderLabel?.(t, m) || t.name
      ),
      g && /* @__PURE__ */ l.createElement(
        ie,
        {
          className: "sidebar-subheading-action",
          "aria-label": c ? "Expand" : "Collapse",
          "data-action": "expand-all",
          "data-expanded": c,
          onClick: (b) => {
            b.preventDefault(), d();
          }
        },
        c ? /* @__PURE__ */ l.createElement(ul, null) : /* @__PURE__ */ l.createElement(cl, null)
      )
    );
  if (t.type === "component" || t.type === "group") {
    let b = t.type === "component" ? Ql : Yl;
    return /* @__PURE__ */ l.createElement(
      b,
      {
        key: h,
        id: h,
        style: p ? { color: p } : {},
        className: "sidebar-item",
        "data-ref-id": n,
        "data-item-id": t.id,
        "data-parent-id": t.parent,
        "data-nodetype": t.type === "component" ? "component" : "group",
        "data-highlightable": s,
        "aria-controls": t.children && t.children[0],
        "aria-expanded": g,
        depth: o ? t.depth : t.depth - 1,
        isComponent: t.type === "component",
        isExpandable: t.children && t.children.length > 0,
        isExpanded: g,
        onClick: (I) => {
          I.preventDefault(), f({ ids: [t.id], value: !g }), t.type === "component" && !g && v && y(t.id);
        },
        onMouseEnter: () => {
          t.type === "component" && m.emit(xt, {
            ids: [t.children[0]],
            options: { target: n }
          });
        }
      },
      t.renderLabel?.(t, m) || t.name
    );
  }
  return null;
}, "Node")), yy = l.memo(/* @__PURE__ */ a(function({
  setExpanded: t,
  isFullyExpanded: r,
  expandableDescendants: n,
  ...i
}) {
  let o = A(
    () => t({ ids: n, value: !r }),
    [t, r, n]
  );
  return /* @__PURE__ */ l.createElement(
    Ku,
    {
      ...i,
      setExpanded: t,
      isFullyExpanded: r,
      setFullyExpanded: o
    }
  );
}, "Root")), ju = l.memo(/* @__PURE__ */ a(function({
  isBrowsing: t,
  isMain: r,
  refId: n,
  data: i,
  status: o,
  docsMode: s,
  highlightedRef: u,
  setHighlightedItemId: c,
  selectedStoryId: p,
  onSelectStoryId: d
}) {
  let g = Q(null), f = me(), [y, m, v] = j(
    () => Object.keys(i).reduce(
      (E, O) => {
        let P = i[O];
        return P.type === "root" ? E[0].push(O) : P.parent || E[1].push(O), P.type === "root" && P.startCollapsed && (E[2][O] = !1), E;
      },
      [[], [], {}]
    ),
    [i]
  ), { expandableDescendants: x } = j(() => [...m, ...y].reduce(
    (E, O) => (E.expandableDescendants[O] = gt(i, O, !1).filter(
      (P) => !["story", "docs"].includes(i[P].type)
    ), E),
    { orphansFirst: [], expandableDescendants: {} }
  ), [i, y, m]), w = j(() => Object.keys(i).filter((E) => {
    let O = i[E];
    if (O.type !== "component") return !1;
    let { children: P = [], name: M } = O;
    if (P.length !== 1) return !1;
    let L = i[P[0]];
    return L.type === "docs" ? !0 : L.type === "story" ? $u(L.name, M) : !1;
  }), [i]), h = j(
    () => Object.keys(i).filter((E) => !w.includes(E)),
    [w]
  ), b = j(() => w.reduce(
    (E, O) => {
      let { children: P, parent: M, name: L } = i[O], [D] = P;
      if (M) {
        let V = [...i[M].children];
        V[V.indexOf(O)] = D, E[M] = { ...i[M], children: V };
      }
      return E[D] = {
        ...i[D],
        name: L,
        parent: M,
        depth: i[D].depth - 1
      }, E;
    },
    { ...i }
  ), [i]), I = j(() => h.reduce(
    (E, O) => Object.assign(E, { [O]: Or(b, O) }),
    {}
  ), [h, b]), [C, _] = Vu({
    // @ts-expect-error (non strict)
    containerRef: g,
    isBrowsing: t,
    refId: n,
    data: b,
    initialExpanded: v,
    rootIds: y,
    highlightedRef: u,
    setHighlightedItemId: c,
    selectedStoryId: p,
    onSelectStoryId: d
  }), T = j(() => _n(b, o), [b, o]), k = j(() => h.map((E) => {
    let O = b[E], P = En(E, n);
    if (O.type === "root") {
      let D = x[O.id], V = D.every((X) => C[X]);
      return (
        // @ts-expect-error (TODO)
        /* @__PURE__ */ l.createElement(
          yy,
          {
            key: P,
            item: O,
            refId: n,
            isOrphan: !1,
            isDisplayed: !0,
            isSelected: p === E,
            isExpanded: !!C[E],
            setExpanded: _,
            isFullyExpanded: V,
            expandableDescendants: D,
            onSelectStoryId: d
          }
        )
      );
    }
    let M = !O.parent || I[E].every((D) => C[D]), L = T[E] ? ir[T[E]][1] : null;
    return /* @__PURE__ */ l.createElement(
      Ku,
      {
        api: f,
        key: P,
        item: O,
        status: o?.[E],
        refId: n,
        color: L,
        docsMode: s,
        isOrphan: m.some((D) => E === D || E.startsWith(`${D}-`)),
        isDisplayed: M,
        isSelected: p === E,
        isExpanded: !!C[E],
        setExpanded: _,
        onSelectStoryId: d
      }
    );
  }), [
    I,
    f,
    b,
    h,
    s,
    x,
    C,
    T,
    d,
    m,
    n,
    p,
    _,
    o
  ]);
  return /* @__PURE__ */ l.createElement(dy, { ref: g, hasOrphans: r && m.length > 0 }, /* @__PURE__ */ l.createElement(jl, null), k);
}, "Tree"));

// src/manager/components/sidebar/Refs.tsx
var vy = S.div(({ isMain: e }) => ({
  position: "relative",
  marginTop: e ? void 0 : 0
})), by = S.div(({ theme: e }) => ({
  fontWeight: e.typography.weight.bold,
  fontSize: e.typography.size.s2,
  // Similar to ListItem.tsx
  textDecoration: "none",
  lineHeight: "16px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  background: "transparent",
  width: "100%",
  marginTop: 20,
  paddingTop: 16,
  paddingBottom: 12,
  borderTop: `1px solid ${e.appBorderColor}`,
  color: e.base === "light" ? e.color.defaultText : ge(0.2, e.color.defaultText)
})), Iy = S.div({
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  flex: 1,
  overflow: "hidden",
  marginLeft: 2
}), Sy = S.button(({ theme: e }) => ({
  all: "unset",
  display: "flex",
  padding: "0px 8px",
  gap: 6,
  alignItems: "center",
  cursor: "pointer",
  overflow: "hidden",
  "&:focus": {
    borderColor: e.color.secondary,
    "span:first-of-type": {
      borderLeftColor: e.color.secondary
    }
  }
})), Uu = l.memo(
  /* @__PURE__ */ a(function(t) {
    let { docsOptions: r } = et(), n = me(), {
      index: i,
      id: o,
      title: s = o,
      isLoading: u,
      isBrowsing: c,
      selectedStoryId: p,
      highlightedRef: d,
      setHighlighted: g,
      loginUrl: f,
      type: y,
      expanded: m = !0,
      indexError: v,
      previewInitialized: x
    } = t, w = j(() => i ? Object.keys(i).length : 0, [i]), h = Q(null), b = o === rt, C = u || (y === "auto-inject" && !x || y === "server-\
checked") || y === "unknown", E = zu(C, !!f && w === 0, !!v, !C && w === 0), [O, P] = J(m);
    K(() => {
      i && p && i[p] && P(!0);
    }, [P, i, p]);
    let M = A(() => P((V) => !V), [P]), L = A(
      (V) => g({ itemId: V, refId: o }),
      [g]
    ), D = A(
      // @ts-expect-error (non strict)
      (V) => n && n.selectStory(V, void 0, { ref: !b && o }),
      [n, b, o]
    );
    return /* @__PURE__ */ l.createElement(l.Fragment, null, b || /* @__PURE__ */ l.createElement(
      by,
      {
        "aria-label": `${O ? "Hide" : "Show"} ${s} stories`,
        "aria-expanded": O
      },
      /* @__PURE__ */ l.createElement(Sy, { "data-action": "collapse-ref", onClick: M }, /* @__PURE__ */ l.createElement(Tt, { isExpanded: O }),
      /* @__PURE__ */ l.createElement(Iy, { title: s }, s)),
      /* @__PURE__ */ l.createElement(zl, { ...t, state: E, ref: h })
    ), O && /* @__PURE__ */ l.createElement(vy, { "data-title": s, isMain: b }, E === "auth" && /* @__PURE__ */ l.createElement(Fl, { id: o,
    loginUrl: f }), E === "error" && /* @__PURE__ */ l.createElement(Hl, { error: v }), E === "loading" && /* @__PURE__ */ l.createElement(Rl,
    { isMain: b }), E === "empty" && /* @__PURE__ */ l.createElement(Bl, { isMain: b }), E === "ready" && /* @__PURE__ */ l.createElement(
      ju,
      {
        status: t.status,
        isBrowsing: c,
        isMain: b,
        refId: o,
        data: i,
        docsMode: r.docsMode,
        selectedStoryId: p,
        onSelectStoryId: D,
        highlightedRef: d,
        setHighlightedItemId: L
      }
    )));
  }, "Ref")
);

// src/manager/components/sidebar/useHighlighted.ts
var { document: li, window: qu } = ae, Gu = /* @__PURE__ */ a((e) => e ? { itemId: e.storyId, refId: e.refId } : null, "fromSelection"), Yu = /* @__PURE__ */ a(
({
  containerRef: e,
  isLoading: t,
  isBrowsing: r,
  dataset: n,
  selected: i
}) => {
  let o = Gu(i), s = Q(o), [u, c] = J(o), p = me(), d = A(
    (f) => {
      s.current = f, c(f);
    },
    [s]
  ), g = A(
    (f, y = !1) => {
      let m = f.getAttribute("data-item-id"), v = f.getAttribute("data-ref-id");
      !m || !v || (d({ itemId: m, refId: v }), kt(f, y));
    },
    [d]
  );
  return K(() => {
    let f = Gu(i);
    if (d(f), f) {
      let { itemId: y, refId: m } = f;
      setTimeout(() => {
        kt(
          // @ts-expect-error (non strict)
          e.current?.querySelector(`[data-item-id="${y}"][data-ref-id="${m}"]`),
          !0
          // make sure it's clearly visible by centering it
        );
      }, 0);
    }
  }, [n, s, e, i]), K(() => {
    let f = li.getElementById("storybook-explorer-menu"), y, m = /* @__PURE__ */ a((v) => {
      if (t || !r || !e.current || !ht(!1, v)) return;
      let x = Ke("ArrowUp", v), w = Ke("ArrowDown", v);
      if (!(x || w)) return;
      let h = qu.requestAnimationFrame(() => {
        qu.cancelAnimationFrame(y), y = h;
        let b = v.target;
        if (!Ot(f, b) && !Ot(b, f)) return;
        b.hasAttribute("data-action") && b.blur();
        let I = Array.from(
          e.current.querySelectorAll("[data-highlightable=true]")
        ), C = I.findIndex(
          (k) => k.getAttribute("data-item-id") === s.current?.itemId && k.getAttribute("data-ref-id") === s.current?.refId
        ), _ = Ru(I, C, x ? -1 : 1), T = x ? _ === I.length - 1 : _ === 0;
        if (g(I[_], T), I[_].getAttribute("data-nodetype") === "component") {
          let { itemId: k, refId: E } = s.current, O = p.resolveStory(k, E === "storybook_internal" ? void 0 : E);
          O.type === "component" && p.emit(xt, {
            // @ts-expect-error (non strict)
            ids: [O.children[0]],
            options: { target: E }
          });
        }
      });
    }, "navigateTree");
    return li.addEventListener("keydown", m), () => li.removeEventListener("keydown", m);
  }, [t, r, s, g]), [u, d, s];
}, "useHighlighted");

// src/manager/components/sidebar/HighlightStyles.tsx
var Qu = /* @__PURE__ */ a(({ refId: e, itemId: t }) => /* @__PURE__ */ l.createElement(
  jt,
  {
    styles: ({ color: r }) => {
      let n = ge(0.85, r.secondary);
      return {
        [`[data-ref-id="${e}"][data-item-id="${t}"]:not([data-selected="true"])`]: {
          '&[data-nodetype="component"], &[data-nodetype="group"]': {
            background: n,
            "&:hover, &:focus": { background: n }
          },
          '&[data-nodetype="story"], &[data-nodetype="document"]': {
            color: r.defaultText,
            background: n,
            "&:hover, &:focus": { background: n }
          }
        }
      };
    }
  }
), "HighlightStyles");

// src/manager/components/sidebar/Explorer.tsx
var Xu = l.memo(/* @__PURE__ */ a(function({
  isLoading: t,
  isBrowsing: r,
  dataset: n,
  selected: i
}) {
  let o = Q(null), [s, u, c] = Yu({
    // @ts-expect-error (non strict)
    containerRef: o,
    isLoading: t,
    isBrowsing: r,
    dataset: n,
    selected: i
  });
  return /* @__PURE__ */ l.createElement(
    "div",
    {
      ref: o,
      id: "storybook-explorer-tree",
      "data-highlighted-ref-id": s?.refId,
      "data-highlighted-item-id": s?.itemId
    },
    s && /* @__PURE__ */ l.createElement(Qu, { ...s }),
    n.entries.map(([p, d]) => /* @__PURE__ */ l.createElement(
      Uu,
      {
        ...d,
        key: p,
        isLoading: t,
        isBrowsing: r,
        selectedStoryId: i?.refId === d.id ? i.storyId : null,
        highlightedRef: c,
        setHighlighted: u
      }
    ))
  );
}, "Explorer"));

// ../node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js
function Ee(e, t) {
  if (e == null) return {};
  var r = {}, n = Object.keys(e), i, o;
  for (o = 0; o < n.length; o++)
    i = n[o], !(t.indexOf(i) >= 0) && (r[i] = e[i]);
  return r;
}
a(Ee, "_objectWithoutPropertiesLoose");

// ../node_modules/downshift/dist/downshift.esm.js
var q = Fe(No());
var Cy = Fe(tc());

// ../node_modules/compute-scroll-into-view/dist/index.js
var rc = /* @__PURE__ */ a((e) => typeof e == "object" && e != null && e.nodeType === 1, "t"), nc = /* @__PURE__ */ a((e, t) => (!t || e !==
"hidden") && e !== "visible" && e !== "clip", "e"), pi = /* @__PURE__ */ a((e, t) => {
  if (e.clientHeight < e.scrollHeight || e.clientWidth < e.scrollWidth) {
    let r = getComputedStyle(e, null);
    return nc(r.overflowY, t) || nc(r.overflowX, t) || ((n) => {
      let i = ((o) => {
        if (!o.ownerDocument || !o.ownerDocument.defaultView) return null;
        try {
          return o.ownerDocument.defaultView.frameElement;
        } catch {
          return null;
        }
      })(n);
      return !!i && (i.clientHeight < n.scrollHeight || i.clientWidth < n.scrollWidth);
    })(e);
  }
  return !1;
}, "n"), Hn = /* @__PURE__ */ a((e, t, r, n, i, o, s, u) => o < e && s > t || o > e && s < t ? 0 : o <= e && u <= r || s >= t && u >= r ? o -
e - n : s > t && u < r || o < e && u > r ? s - t + i : 0, "o"), Ey = /* @__PURE__ */ a((e) => {
  let t = e.parentElement;
  return t ?? (e.getRootNode().host || null);
}, "l"), oc = /* @__PURE__ */ a((e, t) => {
  var r, n, i, o;
  if (typeof document > "u") return [];
  let { scrollMode: s, block: u, inline: c, boundary: p, skipOverflowHiddenElements: d } = t, g = typeof p == "function" ? p : (X) => X !== p;
  if (!rc(e)) throw new TypeError("Invalid target");
  let f = document.scrollingElement || document.documentElement, y = [], m = e;
  for (; rc(m) && g(m); ) {
    if (m = Ey(m), m === f) {
      y.push(m);
      break;
    }
    m != null && m === document.body && pi(m) && !pi(document.documentElement) || m != null && pi(m, d) && y.push(m);
  }
  let v = (n = (r = window.visualViewport) == null ? void 0 : r.width) != null ? n : innerWidth, x = (o = (i = window.visualViewport) == null ?
  void 0 : i.height) != null ? o : innerHeight, { scrollX: w, scrollY: h } = window, { height: b, width: I, top: C, right: _, bottom: T, left: k } = e.
  getBoundingClientRect(), { top: E, right: O, bottom: P, left: M } = ((X) => {
    let Z = window.getComputedStyle(X);
    return { top: parseFloat(Z.scrollMarginTop) || 0, right: parseFloat(Z.scrollMarginRight) || 0, bottom: parseFloat(Z.scrollMarginBottom) ||
    0, left: parseFloat(Z.scrollMarginLeft) || 0 };
  })(e), L = u === "start" || u === "nearest" ? C - E : u === "end" ? T + P : C + b / 2 - E + P, D = c === "center" ? k + I / 2 - M + O : c ===
  "end" ? _ + O : k - M, V = [];
  for (let X = 0; X < y.length; X++) {
    let Z = y[X], { height: R, width: z, top: H, right: te, bottom: B, left: N } = Z.getBoundingClientRect();
    if (s === "if-needed" && C >= 0 && k >= 0 && T <= x && _ <= v && C >= H && T <= B && k >= N && _ <= te) return V;
    let F = getComputedStyle(Z), $ = parseInt(F.borderLeftWidth, 10), Y = parseInt(F.borderTopWidth, 10), re = parseInt(F.borderRightWidth, 10),
    ee = parseInt(F.borderBottomWidth, 10), le = 0, se = 0, pe = "offsetWidth" in Z ? Z.offsetWidth - Z.clientWidth - $ - re : 0, ce = "offs\
etHeight" in Z ? Z.offsetHeight - Z.clientHeight - Y - ee : 0, Ie = "offsetWidth" in Z ? Z.offsetWidth === 0 ? 0 : z / Z.offsetWidth : 0, ye = "\
offsetHeight" in Z ? Z.offsetHeight === 0 ? 0 : R / Z.offsetHeight : 0;
    if (f === Z) le = u === "start" ? L : u === "end" ? L - x : u === "nearest" ? Hn(h, h + x, x, Y, ee, h + L, h + L + b, b) : L - x / 2, se =
    c === "start" ? D : c === "center" ? D - v / 2 : c === "end" ? D - v : Hn(w, w + v, v, $, re, w + D, w + D + I, I), le = Math.max(0, le +
    h), se = Math.max(0, se + w);
    else {
      le = u === "start" ? L - H - Y : u === "end" ? L - B + ee + ce : u === "nearest" ? Hn(H, B, R, Y, ee + ce, L, L + b, b) : L - (H + R /
      2) + ce / 2, se = c === "start" ? D - N - $ : c === "center" ? D - (N + z / 2) + pe / 2 : c === "end" ? D - te + re + pe : Hn(N, te, z,
      $, re + pe, D, D + I, I);
      let { scrollLeft: Pe, scrollTop: fe } = Z;
      le = ye === 0 ? 0 : Math.max(0, Math.min(fe + le / ye, Z.scrollHeight - R / ye + ce)), se = Ie === 0 ? 0 : Math.max(0, Math.min(Pe + se /
      Ie, Z.scrollWidth - z / Ie + pe)), L += fe - le, D += Pe - se;
    }
    V.push({ el: Z, top: le, left: se });
  }
  return V;
}, "r");

// ../node_modules/tslib/tslib.es6.mjs
var Pt = /* @__PURE__ */ a(function() {
  return Pt = Object.assign || /* @__PURE__ */ a(function(t) {
    for (var r, n = 1, i = arguments.length; n < i; n++) {
      r = arguments[n];
      for (var o in r) Object.prototype.hasOwnProperty.call(r, o) && (t[o] = r[o]);
    }
    return t;
  }, "__assign"), Pt.apply(this, arguments);
}, "__assign");

// ../node_modules/downshift/dist/downshift.esm.js
var _y = 0;
function ic(e) {
  return typeof e == "function" ? e : Be;
}
a(ic, "cbToCb");
function Be() {
}
a(Be, "noop");
function dc(e, t) {
  if (e) {
    var r = oc(e, {
      boundary: t,
      block: "nearest",
      scrollMode: "if-needed"
    });
    r.forEach(function(n) {
      var i = n.el, o = n.top, s = n.left;
      i.scrollTop = o, i.scrollLeft = s;
    });
  }
}
a(dc, "scrollIntoView");
function ac(e, t, r) {
  var n = e === t || t instanceof r.Node && e.contains && e.contains(t);
  return n;
}
a(ac, "isOrContainsNode");
function Yn(e, t) {
  var r;
  function n() {
    r && clearTimeout(r);
  }
  a(n, "cancel");
  function i() {
    for (var o = arguments.length, s = new Array(o), u = 0; u < o; u++)
      s[u] = arguments[u];
    n(), r = setTimeout(function() {
      r = null, e.apply(void 0, s);
    }, t);
  }
  return a(i, "wrapper"), i.cancel = n, i;
}
a(Yn, "debounce");
function ue() {
  for (var e = arguments.length, t = new Array(e), r = 0; r < e; r++)
    t[r] = arguments[r];
  return function(n) {
    for (var i = arguments.length, o = new Array(i > 1 ? i - 1 : 0), s = 1; s < i; s++)
      o[s - 1] = arguments[s];
    return t.some(function(u) {
      return u && u.apply(void 0, [n].concat(o)), n.preventDownshiftDefault || n.hasOwnProperty("nativeEvent") && n.nativeEvent.preventDownshiftDefault;
    });
  };
}
a(ue, "callAllEventHandlers");
function Xe() {
  for (var e = arguments.length, t = new Array(e), r = 0; r < e; r++)
    t[r] = arguments[r];
  return function(n) {
    t.forEach(function(i) {
      typeof i == "function" ? i(n) : i && (i.current = n);
    });
  };
}
a(Xe, "handleRefs");
function fc() {
  return String(_y++);
}
a(fc, "generateId");
function Ty(e) {
  var t = e.isOpen, r = e.resultCount, n = e.previousResultCount;
  return t ? r ? r !== n ? r + " result" + (r === 1 ? " is" : "s are") + " available, use up and down arrow keys to navigate. Press Enter ke\
y to select." : "" : "No results are available." : "";
}
a(Ty, "getA11yStatusMessage");
function sc(e, t) {
  return e = Array.isArray(e) ? (
    /* istanbul ignore next (preact) */
    e[0]
  ) : e, !e && t ? t : e;
}
a(sc, "unwrapArray");
function ky(e) {
  return typeof e.type == "string";
}
a(ky, "isDOMElement");
function Oy(e) {
  return e.props;
}
a(Oy, "getElementProps");
var Py = ["highlightedIndex", "inputValue", "isOpen", "selectedItem", "type"];
function Bn(e) {
  e === void 0 && (e = {});
  var t = {};
  return Py.forEach(function(r) {
    e.hasOwnProperty(r) && (t[r] = e[r]);
  }), t;
}
a(Bn, "pickState");
function Mr(e, t) {
  return !e || !t ? e : Object.keys(e).reduce(function(r, n) {
    return r[n] = Vn(t, n) ? t[n] : e[n], r;
  }, {});
}
a(Mr, "getState");
function Vn(e, t) {
  return e[t] !== void 0;
}
a(Vn, "isControlledProp");
function ar(e) {
  var t = e.key, r = e.keyCode;
  return r >= 37 && r <= 40 && t.indexOf("Arrow") !== 0 ? "Arrow" + t : t;
}
a(ar, "normalizeArrowKey");
function Ze(e, t, r, n, i) {
  i === void 0 && (i = !1);
  var o = r.length;
  if (o === 0)
    return -1;
  var s = o - 1;
  (typeof e != "number" || e < 0 || e > s) && (e = t > 0 ? -1 : s + 1);
  var u = e + t;
  u < 0 ? u = i ? s : 0 : u > s && (u = i ? 0 : s);
  var c = yt(u, t < 0, r, n, i);
  return c === -1 ? e >= o ? -1 : e : c;
}
a(Ze, "getHighlightedIndex");
function yt(e, t, r, n, i) {
  i === void 0 && (i = !1);
  var o = r.length;
  if (t) {
    for (var s = e; s >= 0; s--)
      if (!n(r[s], s))
        return s;
  } else
    for (var u = e; u < o; u++)
      if (!n(r[u], u))
        return u;
  return i ? yt(t ? o - 1 : 0, t, r, n) : -1;
}
a(yt, "getNonDisabledIndex");
function Kn(e, t, r, n) {
  return n === void 0 && (n = !0), r && t.some(function(i) {
    return i && (ac(i, e, r) || n && ac(i, r.document.activeElement, r));
  });
}
a(Kn, "targetWithinDownshift");
var Ay = Yn(function(e) {
  mc(e).textContent = "";
}, 500);
function mc(e) {
  var t = e.getElementById("a11y-status-message");
  return t || (t = e.createElement("div"), t.setAttribute("id", "a11y-status-message"), t.setAttribute("role", "status"), t.setAttribute("ar\
ia-live", "polite"), t.setAttribute("aria-relevant", "additions text"), Object.assign(t.style, {
    border: "0",
    clip: "rect(0 0 0 0)",
    height: "1px",
    margin: "-1px",
    overflow: "hidden",
    padding: "0",
    position: "absolute",
    width: "1px"
  }), e.body.appendChild(t), t);
}
a(mc, "getStatusDiv");
function hc(e, t) {
  if (!(!e || !t)) {
    var r = mc(t);
    r.textContent = e, Ay(t);
  }
}
a(hc, "setStatus");
function My(e) {
  var t = e?.getElementById("a11y-status-message");
  t && t.remove();
}
a(My, "cleanupStatusDiv");
var gc = 0, yc = 1, vc = 2, Rn = 3, zn = 4, bc = 5, Ic = 6, Sc = 7, xc = 8, wc = 9, Ec = 10, Cc = 11, _c = 12, Tc = 13, kc = 14, Oc = 15, Pc = 16,
Dy = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  unknown: gc,
  mouseUp: yc,
  itemMouseEnter: vc,
  keyDownArrowUp: Rn,
  keyDownArrowDown: zn,
  keyDownEscape: bc,
  keyDownEnter: Ic,
  keyDownHome: Sc,
  keyDownEnd: xc,
  clickItem: wc,
  blurInput: Ec,
  changeInput: Cc,
  keyDownSpaceButton: _c,
  clickButton: Tc,
  blurButton: kc,
  controlledPropUpdatedSelectedItem: Oc,
  touchEnd: Pc
}), Ly = ["refKey", "ref"], Ny = ["onClick", "onPress", "onKeyDown", "onKeyUp", "onBlur"], Fy = ["onKeyDown", "onBlur", "onChange", "onInput",
"onChangeText"], Hy = ["refKey", "ref"], By = ["onMouseMove", "onMouseDown", "onClick", "onPress", "index", "item"], Ry = /* @__PURE__ */ function() {
  var e = /* @__PURE__ */ function(t) {
    function r(i) {
      var o;
      o = t.call(this, i) || this, o.id = o.props.id || "downshift-" + fc(), o.menuId = o.props.menuId || o.id + "-menu", o.labelId = o.props.
      labelId || o.id + "-label", o.inputId = o.props.inputId || o.id + "-input", o.getItemId = o.props.getItemId || function(h) {
        return o.id + "-item-" + h;
      }, o.items = [], o.itemCount = null, o.previousResultCount = 0, o.timeoutIds = [], o.internalSetTimeout = function(h, b) {
        var I = setTimeout(function() {
          o.timeoutIds = o.timeoutIds.filter(function(C) {
            return C !== I;
          }), h();
        }, b);
        o.timeoutIds.push(I);
      }, o.setItemCount = function(h) {
        o.itemCount = h;
      }, o.unsetItemCount = function() {
        o.itemCount = null;
      }, o.isItemDisabled = function(h, b) {
        var I = o.getItemNodeFromIndex(b);
        return I && I.hasAttribute("disabled");
      }, o.setHighlightedIndex = function(h, b) {
        h === void 0 && (h = o.props.defaultHighlightedIndex), b === void 0 && (b = {}), b = Bn(b), o.internalSetState(U({
          highlightedIndex: h
        }, b));
      }, o.clearSelection = function(h) {
        o.internalSetState({
          selectedItem: null,
          inputValue: "",
          highlightedIndex: o.props.defaultHighlightedIndex,
          isOpen: o.props.defaultIsOpen
        }, h);
      }, o.selectItem = function(h, b, I) {
        b = Bn(b), o.internalSetState(U({
          isOpen: o.props.defaultIsOpen,
          highlightedIndex: o.props.defaultHighlightedIndex,
          selectedItem: h,
          inputValue: o.props.itemToString(h)
        }, b), I);
      }, o.selectItemAtIndex = function(h, b, I) {
        var C = o.items[h];
        C != null && o.selectItem(C, b, I);
      }, o.selectHighlightedItem = function(h, b) {
        return o.selectItemAtIndex(o.getState().highlightedIndex, h, b);
      }, o.internalSetState = function(h, b) {
        var I, C, _ = {}, T = typeof h == "function";
        return !T && h.hasOwnProperty("inputValue") && o.props.onInputValueChange(h.inputValue, U({}, o.getStateAndHelpers(), h)), o.setState(
        function(k) {
          var E;
          k = o.getState(k);
          var O = T ? h(k) : h;
          O = o.props.stateReducer(k, O), I = O.hasOwnProperty("selectedItem");
          var P = {};
          return I && O.selectedItem !== k.selectedItem && (C = O.selectedItem), (E = O).type || (E.type = gc), Object.keys(O).forEach(function(M) {
            k[M] !== O[M] && (_[M] = O[M]), M !== "type" && (O[M], Vn(o.props, M) || (P[M] = O[M]));
          }), T && O.hasOwnProperty("inputValue") && o.props.onInputValueChange(O.inputValue, U({}, o.getStateAndHelpers(), O)), P;
        }, function() {
          ic(b)();
          var k = Object.keys(_).length > 1;
          k && o.props.onStateChange(_, o.getStateAndHelpers()), I && o.props.onSelect(h.selectedItem, o.getStateAndHelpers()), C !== void 0 &&
          o.props.onChange(C, o.getStateAndHelpers()), o.props.onUserAction(_, o.getStateAndHelpers());
        });
      }, o.rootRef = function(h) {
        return o._rootNode = h;
      }, o.getRootProps = function(h, b) {
        var I, C = h === void 0 ? {} : h, _ = C.refKey, T = _ === void 0 ? "ref" : _, k = C.ref, E = Ee(C, Ly), O = b === void 0 ? {} : b, P = O.
        suppressRefError, M = P === void 0 ? !1 : P;
        o.getRootProps.called = !0, o.getRootProps.refKey = T, o.getRootProps.suppressRefError = M;
        var L = o.getState(), D = L.isOpen;
        return U((I = {}, I[T] = Xe(k, o.rootRef), I.role = "combobox", I["aria-expanded"] = D, I["aria-haspopup"] = "listbox", I["aria-owns"] =
        D ? o.menuId : void 0, I["aria-labelledby"] = o.labelId, I), E);
      }, o.keyDownHandlers = {
        ArrowDown: /* @__PURE__ */ a(function(b) {
          var I = this;
          if (b.preventDefault(), this.getState().isOpen) {
            var C = b.shiftKey ? 5 : 1;
            this.moveHighlightedIndex(C, {
              type: zn
            });
          } else
            this.internalSetState({
              isOpen: !0,
              type: zn
            }, function() {
              var _ = I.getItemCount();
              if (_ > 0) {
                var T = I.getState(), k = T.highlightedIndex, E = Ze(k, 1, {
                  length: _
                }, I.isItemDisabled, !0);
                I.setHighlightedIndex(E, {
                  type: zn
                });
              }
            });
        }, "ArrowDown"),
        ArrowUp: /* @__PURE__ */ a(function(b) {
          var I = this;
          if (b.preventDefault(), this.getState().isOpen) {
            var C = b.shiftKey ? -5 : -1;
            this.moveHighlightedIndex(C, {
              type: Rn
            });
          } else
            this.internalSetState({
              isOpen: !0,
              type: Rn
            }, function() {
              var _ = I.getItemCount();
              if (_ > 0) {
                var T = I.getState(), k = T.highlightedIndex, E = Ze(k, -1, {
                  length: _
                }, I.isItemDisabled, !0);
                I.setHighlightedIndex(E, {
                  type: Rn
                });
              }
            });
        }, "ArrowUp"),
        Enter: /* @__PURE__ */ a(function(b) {
          if (b.which !== 229) {
            var I = this.getState(), C = I.isOpen, _ = I.highlightedIndex;
            if (C && _ != null) {
              b.preventDefault();
              var T = this.items[_], k = this.getItemNodeFromIndex(_);
              if (T == null || k && k.hasAttribute("disabled"))
                return;
              this.selectHighlightedItem({
                type: Ic
              });
            }
          }
        }, "Enter"),
        Escape: /* @__PURE__ */ a(function(b) {
          b.preventDefault(), this.reset(U({
            type: bc
          }, !this.state.isOpen && {
            selectedItem: null,
            inputValue: ""
          }));
        }, "Escape")
      }, o.buttonKeyDownHandlers = U({}, o.keyDownHandlers, {
        " ": /* @__PURE__ */ a(function(b) {
          b.preventDefault(), this.toggleMenu({
            type: _c
          });
        }, "_")
      }), o.inputKeyDownHandlers = U({}, o.keyDownHandlers, {
        Home: /* @__PURE__ */ a(function(b) {
          var I = this.getState(), C = I.isOpen;
          if (C) {
            b.preventDefault();
            var _ = this.getItemCount();
            if (!(_ <= 0 || !C)) {
              var T = yt(0, !1, {
                length: _
              }, this.isItemDisabled);
              this.setHighlightedIndex(T, {
                type: Sc
              });
            }
          }
        }, "Home"),
        End: /* @__PURE__ */ a(function(b) {
          var I = this.getState(), C = I.isOpen;
          if (C) {
            b.preventDefault();
            var _ = this.getItemCount();
            if (!(_ <= 0 || !C)) {
              var T = yt(_ - 1, !0, {
                length: _
              }, this.isItemDisabled);
              this.setHighlightedIndex(T, {
                type: xc
              });
            }
          }
        }, "End")
      }), o.getToggleButtonProps = function(h) {
        var b = h === void 0 ? {} : h, I = b.onClick;
        b.onPress;
        var C = b.onKeyDown, _ = b.onKeyUp, T = b.onBlur, k = Ee(b, Ny), E = o.getState(), O = E.isOpen, P = {
          onClick: ue(I, o.buttonHandleClick),
          onKeyDown: ue(C, o.buttonHandleKeyDown),
          onKeyUp: ue(_, o.buttonHandleKeyUp),
          onBlur: ue(T, o.buttonHandleBlur)
        }, M = k.disabled ? {} : P;
        return U({
          type: "button",
          role: "button",
          "aria-label": O ? "close menu" : "open menu",
          "aria-haspopup": !0,
          "data-toggle": !0
        }, M, k);
      }, o.buttonHandleKeyUp = function(h) {
        h.preventDefault();
      }, o.buttonHandleKeyDown = function(h) {
        var b = ar(h);
        o.buttonKeyDownHandlers[b] && o.buttonKeyDownHandlers[b].call(o, h);
      }, o.buttonHandleClick = function(h) {
        if (h.preventDefault(), o.props.environment) {
          var b = o.props.environment.document, I = b.body, C = b.activeElement;
          I && I === C && h.target.focus();
        }
        o.internalSetTimeout(function() {
          return o.toggleMenu({
            type: Tc
          });
        });
      }, o.buttonHandleBlur = function(h) {
        var b = h.target;
        o.internalSetTimeout(function() {
          if (!(o.isMouseDown || !o.props.environment)) {
            var I = o.props.environment.document.activeElement;
            (I == null || I.id !== o.inputId) && I !== b && o.reset({
              type: kc
            });
          }
        });
      }, o.getLabelProps = function(h) {
        return U({
          htmlFor: o.inputId,
          id: o.labelId
        }, h);
      }, o.getInputProps = function(h) {
        var b = h === void 0 ? {} : h, I = b.onKeyDown, C = b.onBlur, _ = b.onChange, T = b.onInput;
        b.onChangeText;
        var k = Ee(b, Fy), E, O = {};
        E = "onChange";
        var P = o.getState(), M = P.inputValue, L = P.isOpen, D = P.highlightedIndex;
        if (!k.disabled) {
          var V;
          O = (V = {}, V[E] = ue(_, T, o.inputHandleChange), V.onKeyDown = ue(I, o.inputHandleKeyDown), V.onBlur = ue(C, o.inputHandleBlur),
          V);
        }
        return U({
          "aria-autocomplete": "list",
          "aria-activedescendant": L && typeof D == "number" && D >= 0 ? o.getItemId(D) : void 0,
          "aria-controls": L ? o.menuId : void 0,
          "aria-labelledby": k && k["aria-label"] ? void 0 : o.labelId,
          // https://developer.mozilla.org/en-US/docs/Web/Security/Securing_your_site/Turning_off_form_autocompletion
          // revert back since autocomplete="nope" is ignored on latest Chrome and Opera
          autoComplete: "off",
          value: M,
          id: o.inputId
        }, O, k);
      }, o.inputHandleKeyDown = function(h) {
        var b = ar(h);
        b && o.inputKeyDownHandlers[b] && o.inputKeyDownHandlers[b].call(o, h);
      }, o.inputHandleChange = function(h) {
        o.internalSetState({
          type: Cc,
          isOpen: !0,
          inputValue: h.target.value,
          highlightedIndex: o.props.defaultHighlightedIndex
        });
      }, o.inputHandleBlur = function() {
        o.internalSetTimeout(function() {
          var h;
          if (!(o.isMouseDown || !o.props.environment)) {
            var b = o.props.environment.document.activeElement, I = (b == null || (h = b.dataset) == null ? void 0 : h.toggle) && o._rootNode &&
            o._rootNode.contains(b);
            I || o.reset({
              type: Ec
            });
          }
        });
      }, o.menuRef = function(h) {
        o._menuNode = h;
      }, o.getMenuProps = function(h, b) {
        var I, C = h === void 0 ? {} : h, _ = C.refKey, T = _ === void 0 ? "ref" : _, k = C.ref, E = Ee(C, Hy), O = b === void 0 ? {} : b, P = O.
        suppressRefError, M = P === void 0 ? !1 : P;
        return o.getMenuProps.called = !0, o.getMenuProps.refKey = T, o.getMenuProps.suppressRefError = M, U((I = {}, I[T] = Xe(k, o.menuRef),
        I.role = "listbox", I["aria-labelledby"] = E && E["aria-label"] ? void 0 : o.labelId, I.id = o.menuId, I), E);
      }, o.getItemProps = function(h) {
        var b, I = h === void 0 ? {} : h, C = I.onMouseMove, _ = I.onMouseDown, T = I.onClick;
        I.onPress;
        var k = I.index, E = I.item, O = E === void 0 ? (
          /* istanbul ignore next */
          void 0
        ) : E, P = Ee(I, By);
        k === void 0 ? (o.items.push(O), k = o.items.indexOf(O)) : o.items[k] = O;
        var M = "onClick", L = T, D = (b = {
          // onMouseMove is used over onMouseEnter here. onMouseMove
          // is only triggered on actual mouse movement while onMouseEnter
          // can fire on DOM changes, interrupting keyboard navigation
          onMouseMove: ue(C, function() {
            k !== o.getState().highlightedIndex && (o.setHighlightedIndex(k, {
              type: vc
            }), o.avoidScrolling = !0, o.internalSetTimeout(function() {
              return o.avoidScrolling = !1;
            }, 250));
          }),
          onMouseDown: ue(_, function(X) {
            X.preventDefault();
          })
        }, b[M] = ue(L, function() {
          o.selectItemAtIndex(k, {
            type: wc
          });
        }), b), V = P.disabled ? {
          onMouseDown: D.onMouseDown
        } : D;
        return U({
          id: o.getItemId(k),
          role: "option",
          "aria-selected": o.getState().highlightedIndex === k
        }, V, P);
      }, o.clearItems = function() {
        o.items = [];
      }, o.reset = function(h, b) {
        h === void 0 && (h = {}), h = Bn(h), o.internalSetState(function(I) {
          var C = I.selectedItem;
          return U({
            isOpen: o.props.defaultIsOpen,
            highlightedIndex: o.props.defaultHighlightedIndex,
            inputValue: o.props.itemToString(C)
          }, h);
        }, b);
      }, o.toggleMenu = function(h, b) {
        h === void 0 && (h = {}), h = Bn(h), o.internalSetState(function(I) {
          var C = I.isOpen;
          return U({
            isOpen: !C
          }, C && {
            highlightedIndex: o.props.defaultHighlightedIndex
          }, h);
        }, function() {
          var I = o.getState(), C = I.isOpen, _ = I.highlightedIndex;
          C && o.getItemCount() > 0 && typeof _ == "number" && o.setHighlightedIndex(_, h), ic(b)();
        });
      }, o.openMenu = function(h) {
        o.internalSetState({
          isOpen: !0
        }, h);
      }, o.closeMenu = function(h) {
        o.internalSetState({
          isOpen: !1
        }, h);
      }, o.updateStatus = Yn(function() {
        var h;
        if ((h = o.props) != null && (h = h.environment) != null && h.document) {
          var b = o.getState(), I = o.items[b.highlightedIndex], C = o.getItemCount(), _ = o.props.getA11yStatusMessage(U({
            itemToString: o.props.itemToString,
            previousResultCount: o.previousResultCount,
            resultCount: C,
            highlightedItem: I
          }, b));
          o.previousResultCount = C, hc(_, o.props.environment.document);
        }
      }, 200);
      var s = o.props, u = s.defaultHighlightedIndex, c = s.initialHighlightedIndex, p = c === void 0 ? u : c, d = s.defaultIsOpen, g = s.initialIsOpen,
      f = g === void 0 ? d : g, y = s.initialInputValue, m = y === void 0 ? "" : y, v = s.initialSelectedItem, x = v === void 0 ? null : v, w = o.
      getState({
        highlightedIndex: p,
        isOpen: f,
        inputValue: m,
        selectedItem: x
      });
      return w.selectedItem != null && o.props.initialInputValue === void 0 && (w.inputValue = o.props.itemToString(w.selectedItem)), o.state =
      w, o;
    }
    a(r, "Downshift"), Ct(r, t);
    var n = r.prototype;
    return n.internalClearTimeouts = /* @__PURE__ */ a(function() {
      this.timeoutIds.forEach(function(o) {
        clearTimeout(o);
      }), this.timeoutIds = [];
    }, "internalClearTimeouts"), n.getState = /* @__PURE__ */ a(function(o) {
      return o === void 0 && (o = this.state), Mr(o, this.props);
    }, "getState$1"), n.getItemCount = /* @__PURE__ */ a(function() {
      var o = this.items.length;
      return this.itemCount != null ? o = this.itemCount : this.props.itemCount !== void 0 && (o = this.props.itemCount), o;
    }, "getItemCount"), n.getItemNodeFromIndex = /* @__PURE__ */ a(function(o) {
      return this.props.environment ? this.props.environment.document.getElementById(this.getItemId(o)) : null;
    }, "getItemNodeFromIndex"), n.scrollHighlightedItemIntoView = /* @__PURE__ */ a(function() {
      {
        var o = this.getItemNodeFromIndex(this.getState().highlightedIndex);
        this.props.scrollIntoView(o, this._menuNode);
      }
    }, "scrollHighlightedItemIntoView"), n.moveHighlightedIndex = /* @__PURE__ */ a(function(o, s) {
      var u = this.getItemCount(), c = this.getState(), p = c.highlightedIndex;
      if (u > 0) {
        var d = Ze(p, o, {
          length: u
        }, this.isItemDisabled, !0);
        this.setHighlightedIndex(d, s);
      }
    }, "moveHighlightedIndex"), n.getStateAndHelpers = /* @__PURE__ */ a(function() {
      var o = this.getState(), s = o.highlightedIndex, u = o.inputValue, c = o.selectedItem, p = o.isOpen, d = this.props.itemToString, g = this.
      id, f = this.getRootProps, y = this.getToggleButtonProps, m = this.getLabelProps, v = this.getMenuProps, x = this.getInputProps, w = this.
      getItemProps, h = this.openMenu, b = this.closeMenu, I = this.toggleMenu, C = this.selectItem, _ = this.selectItemAtIndex, T = this.selectHighlightedItem,
      k = this.setHighlightedIndex, E = this.clearSelection, O = this.clearItems, P = this.reset, M = this.setItemCount, L = this.unsetItemCount,
      D = this.internalSetState;
      return {
        // prop getters
        getRootProps: f,
        getToggleButtonProps: y,
        getLabelProps: m,
        getMenuProps: v,
        getInputProps: x,
        getItemProps: w,
        // actions
        reset: P,
        openMenu: h,
        closeMenu: b,
        toggleMenu: I,
        selectItem: C,
        selectItemAtIndex: _,
        selectHighlightedItem: T,
        setHighlightedIndex: k,
        clearSelection: E,
        clearItems: O,
        setItemCount: M,
        unsetItemCount: L,
        setState: D,
        // props
        itemToString: d,
        // derived
        id: g,
        // state
        highlightedIndex: s,
        inputValue: u,
        isOpen: p,
        selectedItem: c
      };
    }, "getStateAndHelpers"), n.componentDidMount = /* @__PURE__ */ a(function() {
      var o = this;
      if (!this.props.environment)
        this.cleanup = function() {
          o.internalClearTimeouts();
        };
      else {
        var s = /* @__PURE__ */ a(function() {
          o.isMouseDown = !0;
        }, "onMouseDown"), u = /* @__PURE__ */ a(function(y) {
          o.isMouseDown = !1;
          var m = Kn(y.target, [o._rootNode, o._menuNode], o.props.environment);
          !m && o.getState().isOpen && o.reset({
            type: yc
          }, function() {
            return o.props.onOuterClick(o.getStateAndHelpers());
          });
        }, "onMouseUp"), c = /* @__PURE__ */ a(function() {
          o.isTouchMove = !1;
        }, "onTouchStart"), p = /* @__PURE__ */ a(function() {
          o.isTouchMove = !0;
        }, "onTouchMove"), d = /* @__PURE__ */ a(function(y) {
          var m = Kn(y.target, [o._rootNode, o._menuNode], o.props.environment, !1);
          !o.isTouchMove && !m && o.getState().isOpen && o.reset({
            type: Pc
          }, function() {
            return o.props.onOuterClick(o.getStateAndHelpers());
          });
        }, "onTouchEnd"), g = this.props.environment;
        g.addEventListener("mousedown", s), g.addEventListener("mouseup", u), g.addEventListener("touchstart", c), g.addEventListener("touch\
move", p), g.addEventListener("touchend", d), this.cleanup = function() {
          o.internalClearTimeouts(), o.updateStatus.cancel(), g.removeEventListener("mousedown", s), g.removeEventListener("mouseup", u), g.
          removeEventListener("touchstart", c), g.removeEventListener("touchmove", p), g.removeEventListener("touchend", d);
        };
      }
    }, "componentDidMount"), n.shouldScroll = /* @__PURE__ */ a(function(o, s) {
      var u = this.props.highlightedIndex === void 0 ? this.getState() : this.props, c = u.highlightedIndex, p = s.highlightedIndex === void 0 ?
      o : s, d = p.highlightedIndex, g = c && this.getState().isOpen && !o.isOpen, f = c !== d;
      return g || f;
    }, "shouldScroll"), n.componentDidUpdate = /* @__PURE__ */ a(function(o, s) {
      Vn(this.props, "selectedItem") && this.props.selectedItemChanged(o.selectedItem, this.props.selectedItem) && this.internalSetState({
        type: Oc,
        inputValue: this.props.itemToString(this.props.selectedItem)
      }), !this.avoidScrolling && this.shouldScroll(s, o) && this.scrollHighlightedItemIntoView(), this.updateStatus();
    }, "componentDidUpdate"), n.componentWillUnmount = /* @__PURE__ */ a(function() {
      this.cleanup();
    }, "componentWillUnmount"), n.render = /* @__PURE__ */ a(function() {
      var o = sc(this.props.children, Be);
      this.clearItems(), this.getRootProps.called = !1, this.getRootProps.refKey = void 0, this.getRootProps.suppressRefError = void 0, this.
      getMenuProps.called = !1, this.getMenuProps.refKey = void 0, this.getMenuProps.suppressRefError = void 0, this.getLabelProps.called = !1,
      this.getInputProps.called = !1;
      var s = sc(o(this.getStateAndHelpers()));
      if (!s)
        return null;
      if (this.getRootProps.called || this.props.suppressRefError)
        return s;
      if (ky(s))
        return /* @__PURE__ */ cs(s, this.getRootProps(Oy(s)));
    }, "render"), r;
  }(He);
  return e.defaultProps = {
    defaultHighlightedIndex: null,
    defaultIsOpen: !1,
    getA11yStatusMessage: Ty,
    itemToString: /* @__PURE__ */ a(function(r) {
      return r == null ? "" : String(r);
    }, "itemToString"),
    onStateChange: Be,
    onInputValueChange: Be,
    onUserAction: Be,
    onChange: Be,
    onSelect: Be,
    onOuterClick: Be,
    selectedItemChanged: /* @__PURE__ */ a(function(r, n) {
      return r !== n;
    }, "selectedItemChanged"),
    environment: (
      /* istanbul ignore next (ssr) */
      typeof window > "u" ? void 0 : window
    ),
    stateReducer: /* @__PURE__ */ a(function(r, n) {
      return n;
    }, "stateReducer"),
    suppressRefError: !1,
    scrollIntoView: dc
  }, e.stateChangeTypes = Dy, e;
}(), Dt = Ry;
var Ac = {
  highlightedIndex: -1,
  isOpen: !1,
  selectedItem: null,
  inputValue: ""
};
function zy(e, t, r) {
  var n = e.props, i = e.type, o = {};
  Object.keys(t).forEach(function(s) {
    $y(s, e, t, r), r[s] !== t[s] && (o[s] = r[s]);
  }), n.onStateChange && Object.keys(o).length && n.onStateChange(U({
    type: i
  }, o));
}
a(zy, "callOnChangeProps");
function $y(e, t, r, n) {
  var i = t.props, o = t.type, s = "on" + mi(e) + "Change";
  i[s] && n[e] !== void 0 && n[e] !== r[e] && i[s](U({
    type: o
  }, n));
}
a($y, "invokeOnChangeHandler");
function Wy(e, t) {
  return t.changes;
}
a(Wy, "stateReducer");
var lc = Yn(function(e, t) {
  hc(e, t);
}, 200), Vy = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u" ? Vt : K, Mc = "useId" in l ?
/* @__PURE__ */ a(function(t) {
  var r = t.id, n = t.labelId, i = t.menuId, o = t.getItemId, s = t.toggleButtonId, u = t.inputId, c = "downshift-" + l.useId();
  r || (r = c);
  var p = Q({
    labelId: n || r + "-label",
    menuId: i || r + "-menu",
    getItemId: o || function(d) {
      return r + "-item-" + d;
    },
    toggleButtonId: s || r + "-toggle-button",
    inputId: u || r + "-input"
  });
  return p.current;
}, "useElementIds") : /* @__PURE__ */ a(function(t) {
  var r = t.id, n = r === void 0 ? "downshift-" + fc() : r, i = t.labelId, o = t.menuId, s = t.getItemId, u = t.toggleButtonId, c = t.inputId,
  p = Q({
    labelId: i || n + "-label",
    menuId: o || n + "-menu",
    getItemId: s || function(d) {
      return n + "-item-" + d;
    },
    toggleButtonId: u || n + "-toggle-button",
    inputId: c || n + "-input"
  });
  return p.current;
}, "useElementIds");
function fi(e, t, r, n) {
  var i, o;
  if (e === void 0) {
    if (t === void 0)
      throw new Error(n);
    i = r[t], o = t;
  } else
    o = t === void 0 ? r.indexOf(e) : t, i = e;
  return [i, o];
}
a(fi, "getItemAndIndex");
function Ky(e) {
  return /^\S{1}$/.test(e);
}
a(Ky, "isAcceptedCharacterKey");
function mi(e) {
  return "" + e.slice(0, 1).toUpperCase() + e.slice(1);
}
a(mi, "capitalizeString");
function Qn(e) {
  var t = Q(e);
  return t.current = e, t;
}
a(Qn, "useLatestRef");
function Dc(e, t, r, n) {
  var i = Q(), o = Q(), s = A(function(y, m) {
    o.current = m, y = Mr(y, m.props);
    var v = e(y, m), x = m.props.stateReducer(y, U({}, m, {
      changes: v
    }));
    return x;
  }, [e]), u = Kt(s, t, r), c = u[0], p = u[1], d = Qn(t), g = A(function(y) {
    return p(U({
      props: d.current
    }, y));
  }, [d]), f = o.current;
  return K(function() {
    var y = Mr(i.current, f?.props), m = f && i.current && !n(y, c);
    m && zy(f, y, c), i.current = c;
  }, [c, f, n]), [c, g];
}
a(Dc, "useEnhancedReducer");
function Lc(e, t, r, n) {
  var i = Dc(e, t, r, n), o = i[0], s = i[1];
  return [Mr(o, t), s];
}
a(Lc, "useControlledReducer$1");
var Ar = {
  itemToString: /* @__PURE__ */ a(function(t) {
    return t ? String(t) : "";
  }, "itemToString"),
  itemToKey: /* @__PURE__ */ a(function(t) {
    return t;
  }, "itemToKey"),
  stateReducer: Wy,
  scrollIntoView: dc,
  environment: (
    /* istanbul ignore next (ssr) */
    typeof window > "u" ? void 0 : window
  )
};
function $e(e, t, r) {
  r === void 0 && (r = Ac);
  var n = e["default" + mi(t)];
  return n !== void 0 ? n : r[t];
}
a($e, "getDefaultValue$1");
function At(e, t, r) {
  r === void 0 && (r = Ac);
  var n = e[t];
  if (n !== void 0)
    return n;
  var i = e["initial" + mi(t)];
  return i !== void 0 ? i : $e(e, t, r);
}
a(At, "getInitialValue$1");
function Nc(e) {
  var t = At(e, "selectedItem"), r = At(e, "isOpen"), n = At(e, "highlightedIndex"), i = At(e, "inputValue");
  return {
    highlightedIndex: n < 0 && t && r ? e.items.findIndex(function(o) {
      return e.itemToKey(o) === e.itemToKey(t);
    }) : n,
    isOpen: r,
    selectedItem: t,
    inputValue: i
  };
}
a(Nc, "getInitialState$2");
function Mt(e, t, r) {
  var n = e.items, i = e.initialHighlightedIndex, o = e.defaultHighlightedIndex, s = e.isItemDisabled, u = e.itemToKey, c = t.selectedItem, p = t.
  highlightedIndex;
  return n.length === 0 ? -1 : i !== void 0 && p === i && !s(n[i]) ? i : o !== void 0 && !s(n[o]) ? o : c ? n.findIndex(function(d) {
    return u(c) === u(d);
  }) : r < 0 && !s(n[n.length - 1]) ? n.length - 1 : r > 0 && !s(n[0]) ? 0 : -1;
}
a(Mt, "getHighlightedIndexOnOpen");
function Fc(e, t, r) {
  var n = Q({
    isMouseDown: !1,
    isTouchMove: !1,
    isTouchEnd: !1
  });
  return K(function() {
    if (!e)
      return Be;
    var i = t.map(function(d) {
      return d.current;
    });
    function o() {
      n.current.isTouchEnd = !1, n.current.isMouseDown = !0;
    }
    a(o, "onMouseDown");
    function s(d) {
      n.current.isMouseDown = !1, Kn(d.target, i, e) || r();
    }
    a(s, "onMouseUp");
    function u() {
      n.current.isTouchEnd = !1, n.current.isTouchMove = !1;
    }
    a(u, "onTouchStart");
    function c() {
      n.current.isTouchMove = !0;
    }
    a(c, "onTouchMove");
    function p(d) {
      n.current.isTouchEnd = !0, !n.current.isTouchMove && !Kn(d.target, i, e, !1) && r();
    }
    return a(p, "onTouchEnd"), e.addEventListener("mousedown", o), e.addEventListener("mouseup", s), e.addEventListener("touchstart", u), e.
    addEventListener("touchmove", c), e.addEventListener("touchend", p), /* @__PURE__ */ a(function() {
      e.removeEventListener("mousedown", o), e.removeEventListener("mouseup", s), e.removeEventListener("touchstart", u), e.removeEventListener(
      "touchmove", c), e.removeEventListener("touchend", p);
    }, "cleanup");
  }, [e, r]), n.current;
}
a(Fc, "useMouseAndTouchTracker");
var hi = /* @__PURE__ */ a(function() {
  return Be;
}, "useGetterPropsCalledChecker");
function gi(e, t, r, n) {
  n === void 0 && (n = {});
  var i = n.document, o = Xn();
  K(function() {
    if (!(!e || o || !i)) {
      var s = e(t);
      lc(s, i);
    }
  }, r), K(function() {
    return function() {
      lc.cancel(), My(i);
    };
  }, [i]);
}
a(gi, "useA11yMessageStatus");
function Hc(e) {
  var t = e.highlightedIndex, r = e.isOpen, n = e.itemRefs, i = e.getItemNodeFromIndex, o = e.menuElement, s = e.scrollIntoView, u = Q(!0);
  return Vy(function() {
    t < 0 || !r || !Object.keys(n.current).length || (u.current === !1 ? u.current = !0 : s(i(t), o));
  }, [t]), u;
}
a(Hc, "useScrollIntoView");
var yi = Be;
function jn(e, t, r) {
  var n;
  r === void 0 && (r = !0);
  var i = ((n = e.items) == null ? void 0 : n.length) && t >= 0;
  return U({
    isOpen: !1,
    highlightedIndex: -1
  }, i && U({
    selectedItem: e.items[t],
    isOpen: $e(e, "isOpen"),
    highlightedIndex: $e(e, "highlightedIndex")
  }, r && {
    inputValue: e.itemToString(e.items[t])
  }));
}
a(jn, "getChangesOnSelection");
function Bc(e, t) {
  return e.isOpen === t.isOpen && e.inputValue === t.inputValue && e.highlightedIndex === t.highlightedIndex && e.selectedItem === t.selectedItem;
}
a(Bc, "isDropdownsStateEqual");
function Xn() {
  var e = l.useRef(!0);
  return l.useEffect(function() {
    return e.current = !1, function() {
      e.current = !0;
    };
  }, []), e.current;
}
a(Xn, "useIsInitialMount");
var $n = {
  environment: q.default.shape({
    addEventListener: q.default.func.isRequired,
    removeEventListener: q.default.func.isRequired,
    document: q.default.shape({
      createElement: q.default.func.isRequired,
      getElementById: q.default.func.isRequired,
      activeElement: q.default.any.isRequired,
      body: q.default.any.isRequired
    }).isRequired,
    Node: q.default.func.isRequired
  }),
  itemToString: q.default.func,
  itemToKey: q.default.func,
  stateReducer: q.default.func
}, Rc = U({}, $n, {
  getA11yStatusMessage: q.default.func,
  highlightedIndex: q.default.number,
  defaultHighlightedIndex: q.default.number,
  initialHighlightedIndex: q.default.number,
  isOpen: q.default.bool,
  defaultIsOpen: q.default.bool,
  initialIsOpen: q.default.bool,
  selectedItem: q.default.any,
  initialSelectedItem: q.default.any,
  defaultSelectedItem: q.default.any,
  id: q.default.string,
  labelId: q.default.string,
  menuId: q.default.string,
  getItemId: q.default.func,
  toggleButtonId: q.default.string,
  onSelectedItemChange: q.default.func,
  onHighlightedIndexChange: q.default.func,
  onStateChange: q.default.func,
  onIsOpenChange: q.default.func,
  scrollIntoView: q.default.func
});
function zc(e, t, r) {
  var n = t.type, i = t.props, o;
  switch (n) {
    case r.ItemMouseMove:
      o = {
        highlightedIndex: t.disabled ? -1 : t.index
      };
      break;
    case r.MenuMouseLeave:
      o = {
        highlightedIndex: -1
      };
      break;
    case r.ToggleButtonClick:
    case r.FunctionToggleMenu:
      o = {
        isOpen: !e.isOpen,
        highlightedIndex: e.isOpen ? -1 : Mt(i, e, 0)
      };
      break;
    case r.FunctionOpenMenu:
      o = {
        isOpen: !0,
        highlightedIndex: Mt(i, e, 0)
      };
      break;
    case r.FunctionCloseMenu:
      o = {
        isOpen: !1
      };
      break;
    case r.FunctionSetHighlightedIndex:
      o = {
        highlightedIndex: t.highlightedIndex
      };
      break;
    case r.FunctionSetInputValue:
      o = {
        inputValue: t.inputValue
      };
      break;
    case r.FunctionReset:
      o = {
        highlightedIndex: $e(i, "highlightedIndex"),
        isOpen: $e(i, "isOpen"),
        selectedItem: $e(i, "selectedItem"),
        inputValue: $e(i, "inputValue")
      };
      break;
    default:
      throw new Error("Reducer called without proper action type.");
  }
  return U({}, e, o);
}
a(zc, "downshiftCommonReducer");
function jy(e) {
  for (var t = e.keysSoFar, r = e.highlightedIndex, n = e.items, i = e.itemToString, o = e.isItemDisabled, s = t.toLowerCase(), u = 0; u < n.
  length; u++) {
    var c = (u + r + (t.length < 2 ? 1 : 0)) % n.length, p = n[c];
    if (p !== void 0 && i(p).toLowerCase().startsWith(s) && !o(p, c))
      return c;
  }
  return r;
}
a(jy, "getItemIndexByCharacterKey");
var AM = Pt(Pt({}, Rc), { items: q.default.array.isRequired, isItemDisabled: q.default.func }), Uy = Pt(Pt({}, Ar), { isItemDisabled: /* @__PURE__ */ a(
function() {
  return !1;
}, "isItemDisabled") }), qy = Be, Wn = 0, vi = 1, bi = 2, Un = 3, Ii = 4, Si = 5, xi = 6, wi = 7, Ei = 8, Ci = 9, _i = 10, qn = 11, $c = 12,
Wc = 13, Ti = 14, Vc = 15, Kc = 16, jc = 17, Uc = 18, ki = 19, di = 20, qc = 21, Gc = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  ToggleButtonClick: Wn,
  ToggleButtonKeyDownArrowDown: vi,
  ToggleButtonKeyDownArrowUp: bi,
  ToggleButtonKeyDownCharacter: Un,
  ToggleButtonKeyDownEscape: Ii,
  ToggleButtonKeyDownHome: Si,
  ToggleButtonKeyDownEnd: xi,
  ToggleButtonKeyDownEnter: wi,
  ToggleButtonKeyDownSpaceButton: Ei,
  ToggleButtonKeyDownPageUp: Ci,
  ToggleButtonKeyDownPageDown: _i,
  ToggleButtonBlur: qn,
  MenuMouseLeave: $c,
  ItemMouseMove: Wc,
  ItemClick: Ti,
  FunctionToggleMenu: Vc,
  FunctionOpenMenu: Kc,
  FunctionCloseMenu: jc,
  FunctionSetHighlightedIndex: Uc,
  FunctionSelectItem: ki,
  FunctionSetInputValue: di,
  FunctionReset: qc
});
function Gy(e, t) {
  var r, n = t.type, i = t.props, o = t.altKey, s;
  switch (n) {
    case Ti:
      s = {
        isOpen: $e(i, "isOpen"),
        highlightedIndex: $e(i, "highlightedIndex"),
        selectedItem: i.items[t.index]
      };
      break;
    case Un:
      {
        var u = t.key, c = "" + e.inputValue + u, p = !e.isOpen && e.selectedItem ? i.items.findIndex(function(y) {
          return i.itemToKey(y) === i.itemToKey(e.selectedItem);
        }) : e.highlightedIndex, d = jy({
          keysSoFar: c,
          highlightedIndex: p,
          items: i.items,
          itemToString: i.itemToString,
          isItemDisabled: i.isItemDisabled
        });
        s = {
          inputValue: c,
          highlightedIndex: d,
          isOpen: !0
        };
      }
      break;
    case vi:
      {
        var g = e.isOpen ? Ze(e.highlightedIndex, 1, i.items, i.isItemDisabled) : o && e.selectedItem == null ? -1 : Mt(i, e, 1);
        s = {
          highlightedIndex: g,
          isOpen: !0
        };
      }
      break;
    case bi:
      if (e.isOpen && o)
        s = jn(i, e.highlightedIndex, !1);
      else {
        var f = e.isOpen ? Ze(e.highlightedIndex, -1, i.items, i.isItemDisabled) : Mt(i, e, -1);
        s = {
          highlightedIndex: f,
          isOpen: !0
        };
      }
      break;
    case wi:
    case Ei:
      s = jn(i, e.highlightedIndex, !1);
      break;
    case Si:
      s = {
        highlightedIndex: yt(0, !1, i.items, i.isItemDisabled),
        isOpen: !0
      };
      break;
    case xi:
      s = {
        highlightedIndex: yt(i.items.length - 1, !0, i.items, i.isItemDisabled),
        isOpen: !0
      };
      break;
    case Ci:
      s = {
        highlightedIndex: Ze(e.highlightedIndex, -10, i.items, i.isItemDisabled)
      };
      break;
    case _i:
      s = {
        highlightedIndex: Ze(e.highlightedIndex, 10, i.items, i.isItemDisabled)
      };
      break;
    case Ii:
      s = {
        isOpen: !1,
        highlightedIndex: -1
      };
      break;
    case qn:
      s = U({
        isOpen: !1,
        highlightedIndex: -1
      }, e.highlightedIndex >= 0 && ((r = i.items) == null ? void 0 : r.length) && {
        selectedItem: i.items[e.highlightedIndex]
      });
      break;
    case ki:
      s = {
        selectedItem: t.selectedItem
      };
      break;
    default:
      return zc(e, t, Gc);
  }
  return U({}, e, s);
}
a(Gy, "downshiftSelectReducer");
var Yy = ["onClick"], Qy = ["onMouseLeave", "refKey", "ref"], Xy = ["onBlur", "onClick", "onPress", "onKeyDown", "refKey", "ref"], Zy = ["it\
em", "index", "onMouseMove", "onClick", "onMouseDown", "onPress", "refKey", "disabled", "ref"];
Yc.stateChangeTypes = Gc;
function Yc(e) {
  e === void 0 && (e = {}), qy(e, Yc);
  var t = U({}, Uy, e), r = t.scrollIntoView, n = t.environment, i = t.getA11yStatusMessage, o = Lc(Gy, t, Nc, Bc), s = o[0], u = o[1], c = s.
  isOpen, p = s.highlightedIndex, d = s.selectedItem, g = s.inputValue, f = Q(null), y = Q(null), m = Q({}), v = Q(null), x = Mc(t), w = Qn(
  {
    state: s,
    props: t
  }), h = A(function(R) {
    return m.current[x.getItemId(R)];
  }, [x]);
  gi(i, s, [c, p, d, g], n);
  var b = Hc({
    menuElement: y.current,
    highlightedIndex: p,
    isOpen: c,
    itemRefs: m,
    scrollIntoView: r,
    getItemNodeFromIndex: h
  });
  K(function() {
    return v.current = Yn(function(R) {
      R({
        type: di,
        inputValue: ""
      });
    }, 500), function() {
      v.current.cancel();
    };
  }, []), K(function() {
    g && v.current(u);
  }, [u, g]), yi({
    props: t,
    state: s
  }), K(function() {
    var R = At(t, "isOpen");
    R && f.current && f.current.focus();
  }, []);
  var I = Fc(n, [f, y], A(/* @__PURE__ */ a(function() {
    w.current.state.isOpen && u({
      type: qn
    });
  }, "handleBlur"), [u, w])), C = hi("getMenuProps", "getToggleButtonProps");
  K(function() {
    c || (m.current = {});
  }, [c]);
  var _ = j(function() {
    return {
      ArrowDown: /* @__PURE__ */ a(function(z) {
        z.preventDefault(), u({
          type: vi,
          altKey: z.altKey
        });
      }, "ArrowDown"),
      ArrowUp: /* @__PURE__ */ a(function(z) {
        z.preventDefault(), u({
          type: bi,
          altKey: z.altKey
        });
      }, "ArrowUp"),
      Home: /* @__PURE__ */ a(function(z) {
        z.preventDefault(), u({
          type: Si
        });
      }, "Home"),
      End: /* @__PURE__ */ a(function(z) {
        z.preventDefault(), u({
          type: xi
        });
      }, "End"),
      Escape: /* @__PURE__ */ a(function() {
        w.current.state.isOpen && u({
          type: Ii
        });
      }, "Escape"),
      Enter: /* @__PURE__ */ a(function(z) {
        z.preventDefault(), u({
          type: w.current.state.isOpen ? wi : Wn
        });
      }, "Enter"),
      PageUp: /* @__PURE__ */ a(function(z) {
        w.current.state.isOpen && (z.preventDefault(), u({
          type: Ci
        }));
      }, "PageUp"),
      PageDown: /* @__PURE__ */ a(function(z) {
        w.current.state.isOpen && (z.preventDefault(), u({
          type: _i
        }));
      }, "PageDown"),
      " ": /* @__PURE__ */ a(function(z) {
        z.preventDefault();
        var H = w.current.state;
        if (!H.isOpen) {
          u({
            type: Wn
          });
          return;
        }
        H.inputValue ? u({
          type: Un,
          key: " "
        }) : u({
          type: Ei
        });
      }, "_")
    };
  }, [u, w]), T = A(function() {
    u({
      type: Vc
    });
  }, [u]), k = A(function() {
    u({
      type: jc
    });
  }, [u]), E = A(function() {
    u({
      type: Kc
    });
  }, [u]), O = A(function(R) {
    u({
      type: Uc,
      highlightedIndex: R
    });
  }, [u]), P = A(function(R) {
    u({
      type: ki,
      selectedItem: R
    });
  }, [u]), M = A(function() {
    u({
      type: qc
    });
  }, [u]), L = A(function(R) {
    u({
      type: di,
      inputValue: R
    });
  }, [u]), D = A(function(R) {
    var z = R === void 0 ? {} : R, H = z.onClick, te = Ee(z, Yy), B = /* @__PURE__ */ a(function() {
      var F;
      (F = f.current) == null || F.focus();
    }, "labelHandleClick");
    return U({
      id: x.labelId,
      htmlFor: x.toggleButtonId,
      onClick: ue(H, B)
    }, te);
  }, [x]), V = A(function(R, z) {
    var H, te = R === void 0 ? {} : R, B = te.onMouseLeave, N = te.refKey, F = N === void 0 ? "ref" : N, $ = te.ref, Y = Ee(te, Qy), re = z ===
    void 0 ? {} : z, ee = re.suppressRefError, le = ee === void 0 ? !1 : ee, se = /* @__PURE__ */ a(function() {
      u({
        type: $c
      });
    }, "menuHandleMouseLeave");
    return C("getMenuProps", le, F, y), U((H = {}, H[F] = Xe($, function(pe) {
      y.current = pe;
    }), H.id = x.menuId, H.role = "listbox", H["aria-labelledby"] = Y && Y["aria-label"] ? void 0 : "" + x.labelId, H.onMouseLeave = ue(B, se),
    H), Y);
  }, [u, C, x]), X = A(function(R, z) {
    var H, te = R === void 0 ? {} : R, B = te.onBlur, N = te.onClick;
    te.onPress;
    var F = te.onKeyDown, $ = te.refKey, Y = $ === void 0 ? "ref" : $, re = te.ref, ee = Ee(te, Xy), le = z === void 0 ? {} : z, se = le.suppressRefError,
    pe = se === void 0 ? !1 : se, ce = w.current.state, Ie = /* @__PURE__ */ a(function() {
      u({
        type: Wn
      });
    }, "toggleButtonHandleClick"), ye = /* @__PURE__ */ a(function() {
      ce.isOpen && !I.isMouseDown && u({
        type: qn
      });
    }, "toggleButtonHandleBlur"), Pe = /* @__PURE__ */ a(function(Ce) {
      var Ne = ar(Ce);
      Ne && _[Ne] ? _[Ne](Ce) : Ky(Ne) && u({
        type: Un,
        key: Ne
      });
    }, "toggleButtonHandleKeyDown"), fe = U((H = {}, H[Y] = Xe(re, function(Se) {
      f.current = Se;
    }), H["aria-activedescendant"] = ce.isOpen && ce.highlightedIndex > -1 ? x.getItemId(ce.highlightedIndex) : "", H["aria-controls"] = x.menuId,
    H["aria-expanded"] = w.current.state.isOpen, H["aria-haspopup"] = "listbox", H["aria-labelledby"] = ee && ee["aria-label"] ? void 0 : "" +
    x.labelId, H.id = x.toggleButtonId, H.role = "combobox", H.tabIndex = 0, H.onBlur = ue(B, ye), H), ee);
    return ee.disabled || (fe.onClick = ue(N, Ie), fe.onKeyDown = ue(F, Pe)), C("getToggleButtonProps", pe, Y, f), fe;
  }, [u, x, w, I, C, _]), Z = A(function(R) {
    var z, H = R === void 0 ? {} : R, te = H.item, B = H.index, N = H.onMouseMove, F = H.onClick, $ = H.onMouseDown;
    H.onPress;
    var Y = H.refKey, re = Y === void 0 ? "ref" : Y, ee = H.disabled, le = H.ref, se = Ee(H, Zy);
    ee !== void 0 && console.warn('Passing "disabled" as an argument to getItemProps is not supported anymore. Please use the isItemDisabled\
 prop from useSelect.');
    var pe = w.current, ce = pe.state, Ie = pe.props, ye = fi(te, B, Ie.items, "Pass either item or index to getItemProps!"), Pe = ye[0], fe = ye[1],
    Se = Ie.isItemDisabled(Pe, fe), Ce = /* @__PURE__ */ a(function() {
      I.isTouchEnd || fe === ce.highlightedIndex || (b.current = !1, u({
        type: Wc,
        index: fe,
        disabled: Se
      }));
    }, "itemHandleMouseMove"), Ne = /* @__PURE__ */ a(function() {
      u({
        type: Ti,
        index: fe
      });
    }, "itemHandleClick"), Je = /* @__PURE__ */ a(function(yr) {
      return yr.preventDefault();
    }, "itemHandleMouseDown"), Ae = U((z = {}, z[re] = Xe(le, function(Ue) {
      Ue && (m.current[x.getItemId(fe)] = Ue);
    }), z["aria-disabled"] = Se, z["aria-selected"] = "" + (Pe === ce.selectedItem), z.id = x.getItemId(fe), z.role = "option", z), se);
    return Se || (Ae.onClick = ue(F, Ne)), Ae.onMouseMove = ue(N, Ce), Ae.onMouseDown = ue($, Je), Ae;
  }, [w, x, I, b, u]);
  return {
    // prop getters.
    getToggleButtonProps: X,
    getLabelProps: D,
    getMenuProps: V,
    getItemProps: Z,
    // actions.
    toggleMenu: T,
    openMenu: E,
    closeMenu: k,
    setHighlightedIndex: O,
    selectItem: P,
    reset: M,
    setInputValue: L,
    // state.
    highlightedIndex: p,
    isOpen: c,
    selectedItem: d,
    inputValue: g
  };
}
a(Yc, "useSelect");
var Oi = 0, Pi = 1, Ai = 2, Mi = 3, Di = 4, Li = 5, Ni = 6, Fi = 7, Hi = 8, Gn = 9, Bi = 10, Qc = 11, Xc = 12, Ri = 13, Zc = 14, Jc = 15, ep = 16,
tp = 17, rp = 18, zi = 19, np = 20, op = 21, $i = 22, ip = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  InputKeyDownArrowDown: Oi,
  InputKeyDownArrowUp: Pi,
  InputKeyDownEscape: Ai,
  InputKeyDownHome: Mi,
  InputKeyDownEnd: Di,
  InputKeyDownPageUp: Li,
  InputKeyDownPageDown: Ni,
  InputKeyDownEnter: Fi,
  InputChange: Hi,
  InputBlur: Gn,
  InputClick: Bi,
  MenuMouseLeave: Qc,
  ItemMouseMove: Xc,
  ItemClick: Ri,
  ToggleButtonClick: Zc,
  FunctionToggleMenu: Jc,
  FunctionOpenMenu: ep,
  FunctionCloseMenu: tp,
  FunctionSetHighlightedIndex: rp,
  FunctionSelectItem: zi,
  FunctionSetInputValue: np,
  FunctionReset: op,
  ControlledPropUpdatedSelectedItem: $i
});
function Jy(e) {
  var t = Nc(e), r = t.selectedItem, n = t.inputValue;
  return n === "" && r && e.defaultInputValue === void 0 && e.initialInputValue === void 0 && e.inputValue === void 0 && (n = e.itemToString(
  r)), U({}, t, {
    inputValue: n
  });
}
a(Jy, "getInitialState$1");
var MM = U({}, Rc, {
  items: q.default.array.isRequired,
  isItemDisabled: q.default.func,
  inputValue: q.default.string,
  defaultInputValue: q.default.string,
  initialInputValue: q.default.string,
  inputId: q.default.string,
  onInputValueChange: q.default.func
});
function ev(e, t, r, n) {
  var i = Q(), o = Dc(e, t, r, n), s = o[0], u = o[1], c = Xn();
  return K(function() {
    if (Vn(t, "selectedItem")) {
      if (!c) {
        var p = t.itemToKey(t.selectedItem) !== t.itemToKey(i.current);
        p && u({
          type: $i,
          inputValue: t.itemToString(t.selectedItem)
        });
      }
      i.current = s.selectedItem === i.current ? t.selectedItem : s.selectedItem;
    }
  }, [s.selectedItem, t.selectedItem]), [Mr(s, t), u];
}
a(ev, "useControlledReducer");
var tv = Be, rv = U({}, Ar, {
  isItemDisabled: /* @__PURE__ */ a(function() {
    return !1;
  }, "isItemDisabled")
});
function nv(e, t) {
  var r, n = t.type, i = t.props, o = t.altKey, s;
  switch (n) {
    case Ri:
      s = {
        isOpen: $e(i, "isOpen"),
        highlightedIndex: $e(i, "highlightedIndex"),
        selectedItem: i.items[t.index],
        inputValue: i.itemToString(i.items[t.index])
      };
      break;
    case Oi:
      e.isOpen ? s = {
        highlightedIndex: Ze(e.highlightedIndex, 1, i.items, i.isItemDisabled, !0)
      } : s = {
        highlightedIndex: o && e.selectedItem == null ? -1 : Mt(i, e, 1),
        isOpen: i.items.length >= 0
      };
      break;
    case Pi:
      e.isOpen ? o ? s = jn(i, e.highlightedIndex) : s = {
        highlightedIndex: Ze(e.highlightedIndex, -1, i.items, i.isItemDisabled, !0)
      } : s = {
        highlightedIndex: Mt(i, e, -1),
        isOpen: i.items.length >= 0
      };
      break;
    case Fi:
      s = jn(i, e.highlightedIndex);
      break;
    case Ai:
      s = U({
        isOpen: !1,
        highlightedIndex: -1
      }, !e.isOpen && {
        selectedItem: null,
        inputValue: ""
      });
      break;
    case Li:
      s = {
        highlightedIndex: Ze(e.highlightedIndex, -10, i.items, i.isItemDisabled, !0)
      };
      break;
    case Ni:
      s = {
        highlightedIndex: Ze(e.highlightedIndex, 10, i.items, i.isItemDisabled, !0)
      };
      break;
    case Mi:
      s = {
        highlightedIndex: yt(0, !1, i.items, i.isItemDisabled)
      };
      break;
    case Di:
      s = {
        highlightedIndex: yt(i.items.length - 1, !0, i.items, i.isItemDisabled)
      };
      break;
    case Gn:
      s = U({
        isOpen: !1,
        highlightedIndex: -1
      }, e.highlightedIndex >= 0 && ((r = i.items) == null ? void 0 : r.length) && t.selectItem && {
        selectedItem: i.items[e.highlightedIndex],
        inputValue: i.itemToString(i.items[e.highlightedIndex])
      });
      break;
    case Hi:
      s = {
        isOpen: !0,
        highlightedIndex: $e(i, "highlightedIndex"),
        inputValue: t.inputValue
      };
      break;
    case Bi:
      s = {
        isOpen: !e.isOpen,
        highlightedIndex: e.isOpen ? -1 : Mt(i, e, 0)
      };
      break;
    case zi:
      s = {
        selectedItem: t.selectedItem,
        inputValue: i.itemToString(t.selectedItem)
      };
      break;
    case $i:
      s = {
        inputValue: t.inputValue
      };
      break;
    default:
      return zc(e, t, ip);
  }
  return U({}, e, s);
}
a(nv, "downshiftUseComboboxReducer");
var ov = ["onMouseLeave", "refKey", "ref"], iv = ["item", "index", "refKey", "ref", "onMouseMove", "onMouseDown", "onClick", "onPress", "dis\
abled"], av = ["onClick", "onPress", "refKey", "ref"], sv = ["onKeyDown", "onChange", "onInput", "onBlur", "onChangeText", "onClick", "refKe\
y", "ref"];
ap.stateChangeTypes = ip;
function ap(e) {
  e === void 0 && (e = {}), tv(e, ap);
  var t = U({}, rv, e), r = t.items, n = t.scrollIntoView, i = t.environment, o = t.getA11yStatusMessage, s = ev(nv, t, Jy, Bc), u = s[0], c = s[1],
  p = u.isOpen, d = u.highlightedIndex, g = u.selectedItem, f = u.inputValue, y = Q(null), m = Q({}), v = Q(null), x = Q(null), w = Xn(), h = Mc(
  t), b = Q(), I = Qn({
    state: u,
    props: t
  }), C = A(function(B) {
    return m.current[h.getItemId(B)];
  }, [h]);
  gi(o, u, [p, d, g, f], i);
  var _ = Hc({
    menuElement: y.current,
    highlightedIndex: d,
    isOpen: p,
    itemRefs: m,
    scrollIntoView: n,
    getItemNodeFromIndex: C
  });
  yi({
    props: t,
    state: u
  }), K(function() {
    var B = At(t, "isOpen");
    B && v.current && v.current.focus();
  }, []), K(function() {
    w || (b.current = r.length);
  });
  var T = Fc(i, [x, y, v], A(/* @__PURE__ */ a(function() {
    I.current.state.isOpen && c({
      type: Gn,
      selectItem: !1
    });
  }, "handleBlur"), [c, I])), k = hi("getInputProps", "getMenuProps");
  K(function() {
    p || (m.current = {});
  }, [p]), K(function() {
    var B;
    !p || !(i != null && i.document) || !(v != null && (B = v.current) != null && B.focus) || i.document.activeElement !== v.current && v.current.
    focus();
  }, [p, i]);
  var E = j(function() {
    return {
      ArrowDown: /* @__PURE__ */ a(function(N) {
        N.preventDefault(), c({
          type: Oi,
          altKey: N.altKey
        });
      }, "ArrowDown"),
      ArrowUp: /* @__PURE__ */ a(function(N) {
        N.preventDefault(), c({
          type: Pi,
          altKey: N.altKey
        });
      }, "ArrowUp"),
      Home: /* @__PURE__ */ a(function(N) {
        I.current.state.isOpen && (N.preventDefault(), c({
          type: Mi
        }));
      }, "Home"),
      End: /* @__PURE__ */ a(function(N) {
        I.current.state.isOpen && (N.preventDefault(), c({
          type: Di
        }));
      }, "End"),
      Escape: /* @__PURE__ */ a(function(N) {
        var F = I.current.state;
        (F.isOpen || F.inputValue || F.selectedItem || F.highlightedIndex > -1) && (N.preventDefault(), c({
          type: Ai
        }));
      }, "Escape"),
      Enter: /* @__PURE__ */ a(function(N) {
        var F = I.current.state;
        !F.isOpen || N.which === 229 || (N.preventDefault(), c({
          type: Fi
        }));
      }, "Enter"),
      PageUp: /* @__PURE__ */ a(function(N) {
        I.current.state.isOpen && (N.preventDefault(), c({
          type: Li
        }));
      }, "PageUp"),
      PageDown: /* @__PURE__ */ a(function(N) {
        I.current.state.isOpen && (N.preventDefault(), c({
          type: Ni
        }));
      }, "PageDown")
    };
  }, [c, I]), O = A(function(B) {
    return U({
      id: h.labelId,
      htmlFor: h.inputId
    }, B);
  }, [h]), P = A(function(B, N) {
    var F, $ = B === void 0 ? {} : B, Y = $.onMouseLeave, re = $.refKey, ee = re === void 0 ? "ref" : re, le = $.ref, se = Ee($, ov), pe = N ===
    void 0 ? {} : N, ce = pe.suppressRefError, Ie = ce === void 0 ? !1 : ce;
    return k("getMenuProps", Ie, ee, y), U((F = {}, F[ee] = Xe(le, function(ye) {
      y.current = ye;
    }), F.id = h.menuId, F.role = "listbox", F["aria-labelledby"] = se && se["aria-label"] ? void 0 : "" + h.labelId, F.onMouseLeave = ue(Y,
    function() {
      c({
        type: Qc
      });
    }), F), se);
  }, [c, k, h]), M = A(function(B) {
    var N, F, $ = B === void 0 ? {} : B, Y = $.item, re = $.index, ee = $.refKey, le = ee === void 0 ? "ref" : ee, se = $.ref, pe = $.onMouseMove,
    ce = $.onMouseDown, Ie = $.onClick;
    $.onPress;
    var ye = $.disabled, Pe = Ee($, iv);
    ye !== void 0 && console.warn('Passing "disabled" as an argument to getItemProps is not supported anymore. Please use the isItemDisabled\
 prop from useCombobox.');
    var fe = I.current, Se = fe.props, Ce = fe.state, Ne = fi(Y, re, Se.items, "Pass either item or index to getItemProps!"), Je = Ne[0], Ae = Ne[1],
    Ue = Se.isItemDisabled(Je, Ae), yr = "onClick", Ur = Ie, pt = /* @__PURE__ */ a(function() {
      T.isTouchEnd || Ae === Ce.highlightedIndex || (_.current = !1, c({
        type: Xc,
        index: Ae,
        disabled: Ue
      }));
    }, "itemHandleMouseMove"), St = /* @__PURE__ */ a(function() {
      c({
        type: Ri,
        index: Ae
      });
    }, "itemHandleClick"), dt = /* @__PURE__ */ a(function(Xm) {
      return Xm.preventDefault();
    }, "itemHandleMouseDown");
    return U((N = {}, N[le] = Xe(se, function(qe) {
      qe && (m.current[h.getItemId(Ae)] = qe);
    }), N["aria-disabled"] = Ue, N["aria-selected"] = "" + (Ae === Ce.highlightedIndex), N.id = h.getItemId(Ae), N.role = "option", N), !Ue &&
    (F = {}, F[yr] = ue(Ur, St), F), {
      onMouseMove: ue(pe, pt),
      onMouseDown: ue(ce, dt)
    }, Pe);
  }, [c, h, I, T, _]), L = A(function(B) {
    var N, F = B === void 0 ? {} : B, $ = F.onClick;
    F.onPress;
    var Y = F.refKey, re = Y === void 0 ? "ref" : Y, ee = F.ref, le = Ee(F, av), se = I.current.state, pe = /* @__PURE__ */ a(function() {
      c({
        type: Zc
      });
    }, "toggleButtonHandleClick");
    return U((N = {}, N[re] = Xe(ee, function(ce) {
      x.current = ce;
    }), N["aria-controls"] = h.menuId, N["aria-expanded"] = se.isOpen, N.id = h.toggleButtonId, N.tabIndex = -1, N), !le.disabled && U({}, {
      onClick: ue($, pe)
    }), le);
  }, [c, I, h]), D = A(function(B, N) {
    var F, $ = B === void 0 ? {} : B, Y = $.onKeyDown, re = $.onChange, ee = $.onInput, le = $.onBlur;
    $.onChangeText;
    var se = $.onClick, pe = $.refKey, ce = pe === void 0 ? "ref" : pe, Ie = $.ref, ye = Ee($, sv), Pe = N === void 0 ? {} : N, fe = Pe.suppressRefError,
    Se = fe === void 0 ? !1 : fe;
    k("getInputProps", Se, ce, v);
    var Ce = I.current.state, Ne = /* @__PURE__ */ a(function(dt) {
      var qe = ar(dt);
      qe && E[qe] && E[qe](dt);
    }, "inputHandleKeyDown"), Je = /* @__PURE__ */ a(function(dt) {
      c({
        type: Hi,
        inputValue: dt.target.value
      });
    }, "inputHandleChange"), Ae = /* @__PURE__ */ a(function(dt) {
      if (i != null && i.document && Ce.isOpen && !T.isMouseDown) {
        var qe = dt.relatedTarget === null && i.document.activeElement !== i.document.body;
        c({
          type: Gn,
          selectItem: !qe
        });
      }
    }, "inputHandleBlur"), Ue = /* @__PURE__ */ a(function() {
      c({
        type: Bi
      });
    }, "inputHandleClick"), yr = "onChange", Ur = {};
    if (!ye.disabled) {
      var pt;
      Ur = (pt = {}, pt[yr] = ue(re, ee, Je), pt.onKeyDown = ue(Y, Ne), pt.onBlur = ue(le, Ae), pt.onClick = ue(se, Ue), pt);
    }
    return U((F = {}, F[ce] = Xe(Ie, function(St) {
      v.current = St;
    }), F["aria-activedescendant"] = Ce.isOpen && Ce.highlightedIndex > -1 ? h.getItemId(Ce.highlightedIndex) : "", F["aria-autocomplete"] =
    "list", F["aria-controls"] = h.menuId, F["aria-expanded"] = Ce.isOpen, F["aria-labelledby"] = ye && ye["aria-label"] ? void 0 : h.labelId,
    F.autoComplete = "off", F.id = h.inputId, F.role = "combobox", F.value = Ce.inputValue, F), Ur, ye);
  }, [c, h, i, E, I, T, k]), V = A(function() {
    c({
      type: Jc
    });
  }, [c]), X = A(function() {
    c({
      type: tp
    });
  }, [c]), Z = A(function() {
    c({
      type: ep
    });
  }, [c]), R = A(function(B) {
    c({
      type: rp,
      highlightedIndex: B
    });
  }, [c]), z = A(function(B) {
    c({
      type: zi,
      selectedItem: B
    });
  }, [c]), H = A(function(B) {
    c({
      type: np,
      inputValue: B
    });
  }, [c]), te = A(function() {
    c({
      type: op
    });
  }, [c]);
  return {
    // prop getters.
    getItemProps: M,
    getLabelProps: O,
    getMenuProps: P,
    getInputProps: D,
    getToggleButtonProps: L,
    // actions.
    toggleMenu: V,
    openMenu: Z,
    closeMenu: X,
    setHighlightedIndex: R,
    setInputValue: H,
    selectItem: z,
    reset: te,
    // state.
    highlightedIndex: d,
    isOpen: p,
    selectedItem: g,
    inputValue: f
  };
}
a(ap, "useCombobox");
var sp = {
  activeIndex: -1,
  selectedItems: []
};
function uc(e, t) {
  return At(e, t, sp);
}
a(uc, "getInitialValue");
function cc(e, t) {
  return $e(e, t, sp);
}
a(cc, "getDefaultValue");
function lv(e) {
  var t = uc(e, "activeIndex"), r = uc(e, "selectedItems");
  return {
    activeIndex: t,
    selectedItems: r
  };
}
a(lv, "getInitialState");
function pc(e) {
  if (e.shiftKey || e.metaKey || e.ctrlKey || e.altKey)
    return !1;
  var t = e.target;
  return !(t instanceof HTMLInputElement && // if element is a text input
  t.value !== "" && // and we have text in it
  // and cursor is either not at the start or is currently highlighting text.
  (t.selectionStart !== 0 || t.selectionEnd !== 0));
}
a(pc, "isKeyDownOperationPermitted");
function uv(e, t) {
  return e.selectedItems === t.selectedItems && e.activeIndex === t.activeIndex;
}
a(uv, "isStateEqual");
var DM = {
  stateReducer: $n.stateReducer,
  itemToKey: $n.itemToKey,
  environment: $n.environment,
  selectedItems: q.default.array,
  initialSelectedItems: q.default.array,
  defaultSelectedItems: q.default.array,
  getA11yStatusMessage: q.default.func,
  activeIndex: q.default.number,
  initialActiveIndex: q.default.number,
  defaultActiveIndex: q.default.number,
  onActiveIndexChange: q.default.func,
  onSelectedItemsChange: q.default.func,
  keyNavigationNext: q.default.string,
  keyNavigationPrevious: q.default.string
}, cv = {
  itemToKey: Ar.itemToKey,
  stateReducer: Ar.stateReducer,
  environment: Ar.environment,
  keyNavigationNext: "ArrowRight",
  keyNavigationPrevious: "ArrowLeft"
}, pv = Be, Wi = 0, Vi = 1, Ki = 2, ji = 3, Ui = 4, qi = 5, Gi = 6, Yi = 7, Qi = 8, Xi = 9, Zi = 10, Ji = 11, ea = 12, dv = /* @__PURE__ */ Object.
freeze({
  __proto__: null,
  SelectedItemClick: Wi,
  SelectedItemKeyDownDelete: Vi,
  SelectedItemKeyDownBackspace: Ki,
  SelectedItemKeyDownNavigationNext: ji,
  SelectedItemKeyDownNavigationPrevious: Ui,
  DropdownKeyDownNavigationPrevious: qi,
  DropdownKeyDownBackspace: Gi,
  DropdownClick: Yi,
  FunctionAddSelectedItem: Qi,
  FunctionRemoveSelectedItem: Xi,
  FunctionSetSelectedItems: Zi,
  FunctionSetActiveIndex: Ji,
  FunctionReset: ea
});
function fv(e, t) {
  var r = t.type, n = t.index, i = t.props, o = t.selectedItem, s = e.activeIndex, u = e.selectedItems, c;
  switch (r) {
    case Wi:
      c = {
        activeIndex: n
      };
      break;
    case Ui:
      c = {
        activeIndex: s - 1 < 0 ? 0 : s - 1
      };
      break;
    case ji:
      c = {
        activeIndex: s + 1 >= u.length ? -1 : s + 1
      };
      break;
    case Ki:
    case Vi: {
      if (s < 0)
        break;
      var p = s;
      u.length === 1 ? p = -1 : s === u.length - 1 && (p = u.length - 2), c = U({
        selectedItems: [].concat(u.slice(0, s), u.slice(s + 1))
      }, {
        activeIndex: p
      });
      break;
    }
    case qi:
      c = {
        activeIndex: u.length - 1
      };
      break;
    case Gi:
      c = {
        selectedItems: u.slice(0, u.length - 1)
      };
      break;
    case Qi:
      c = {
        selectedItems: [].concat(u, [o])
      };
      break;
    case Yi:
      c = {
        activeIndex: -1
      };
      break;
    case Xi: {
      var d = s, g = u.findIndex(function(m) {
        return i.itemToKey(m) === i.itemToKey(o);
      });
      if (g < 0)
        break;
      u.length === 1 ? d = -1 : g === u.length - 1 && (d = u.length - 2), c = {
        selectedItems: [].concat(u.slice(0, g), u.slice(g + 1)),
        activeIndex: d
      };
      break;
    }
    case Zi: {
      var f = t.selectedItems;
      c = {
        selectedItems: f
      };
      break;
    }
    case Ji: {
      var y = t.activeIndex;
      c = {
        activeIndex: y
      };
      break;
    }
    case ea:
      c = {
        activeIndex: cc(i, "activeIndex"),
        selectedItems: cc(i, "selectedItems")
      };
      break;
    default:
      throw new Error("Reducer called without proper action type.");
  }
  return U({}, e, c);
}
a(fv, "downshiftMultipleSelectionReducer");
var mv = ["refKey", "ref", "onClick", "onKeyDown", "selectedItem", "index"], hv = ["refKey", "ref", "onKeyDown", "onClick", "preventKeyActio\
n"];
lp.stateChangeTypes = dv;
function lp(e) {
  e === void 0 && (e = {}), pv(e, lp);
  var t = U({}, cv, e), r = t.getA11yStatusMessage, n = t.environment, i = t.keyNavigationNext, o = t.keyNavigationPrevious, s = Lc(fv, t, lv,
  uv), u = s[0], c = s[1], p = u.activeIndex, d = u.selectedItems, g = Xn(), f = Q(null), y = Q();
  y.current = [];
  var m = Qn({
    state: u,
    props: t
  });
  gi(r, u, [p, d], n), K(function() {
    g || (p === -1 && f.current ? f.current.focus() : y.current[p] && y.current[p].focus());
  }, [p]), yi({
    props: t,
    state: u
  });
  var v = hi("getDropdownProps"), x = j(function() {
    var E;
    return E = {}, E[o] = function() {
      c({
        type: Ui
      });
    }, E[i] = function() {
      c({
        type: ji
      });
    }, E.Delete = /* @__PURE__ */ a(function() {
      c({
        type: Vi
      });
    }, "Delete"), E.Backspace = /* @__PURE__ */ a(function() {
      c({
        type: Ki
      });
    }, "Backspace"), E;
  }, [c, i, o]), w = j(function() {
    var E;
    return E = {}, E[o] = function(O) {
      pc(O) && c({
        type: qi
      });
    }, E.Backspace = /* @__PURE__ */ a(function(P) {
      pc(P) && c({
        type: Gi
      });
    }, "Backspace"), E;
  }, [c, o]), h = A(function(E) {
    var O, P = E === void 0 ? {} : E, M = P.refKey, L = M === void 0 ? "ref" : M, D = P.ref, V = P.onClick, X = P.onKeyDown, Z = P.selectedItem,
    R = P.index, z = Ee(P, mv), H = m.current.state, te = fi(Z, R, H.selectedItems, "Pass either item or index to getSelectedItemProps!"), B = te[1],
    N = B > -1 && B === H.activeIndex, F = /* @__PURE__ */ a(function() {
      c({
        type: Wi,
        index: B
      });
    }, "selectedItemHandleClick"), $ = /* @__PURE__ */ a(function(re) {
      var ee = ar(re);
      ee && x[ee] && x[ee](re);
    }, "selectedItemHandleKeyDown");
    return U((O = {}, O[L] = Xe(D, function(Y) {
      Y && y.current.push(Y);
    }), O.tabIndex = N ? 0 : -1, O.onClick = ue(V, F), O.onKeyDown = ue(X, $), O), z);
  }, [c, m, x]), b = A(function(E, O) {
    var P, M = E === void 0 ? {} : E, L = M.refKey, D = L === void 0 ? "ref" : L, V = M.ref, X = M.onKeyDown, Z = M.onClick, R = M.preventKeyAction,
    z = R === void 0 ? !1 : R, H = Ee(M, hv), te = O === void 0 ? {} : O, B = te.suppressRefError, N = B === void 0 ? !1 : B;
    v("getDropdownProps", N, D, f);
    var F = /* @__PURE__ */ a(function(re) {
      var ee = ar(re);
      ee && w[ee] && w[ee](re);
    }, "dropdownHandleKeyDown"), $ = /* @__PURE__ */ a(function() {
      c({
        type: Yi
      });
    }, "dropdownHandleClick");
    return U((P = {}, P[D] = Xe(V, function(Y) {
      Y && (f.current = Y);
    }), P), !z && {
      onKeyDown: ue(X, F),
      onClick: ue(Z, $)
    }, H);
  }, [c, w, v]), I = A(function(E) {
    c({
      type: Qi,
      selectedItem: E
    });
  }, [c]), C = A(function(E) {
    c({
      type: Xi,
      selectedItem: E
    });
  }, [c]), _ = A(function(E) {
    c({
      type: Zi,
      selectedItems: E
    });
  }, [c]), T = A(function(E) {
    c({
      type: Ji,
      activeIndex: E
    });
  }, [c]), k = A(function() {
    c({
      type: ea
    });
  }, [c]);
  return {
    getSelectedItemProps: h,
    getDropdownProps: b,
    addSelectedItem: I,
    removeSelectedItem: C,
    setSelectedItems: _,
    setActiveIndex: T,
    reset: k,
    selectedItems: d,
    activeIndex: p
  };
}
a(lp, "useMultipleSelection");

// src/manager/components/sidebar/Search.tsx
var $p = Fe(up(), 1);

// src/manager/components/sidebar/types.ts
function Lr(e) {
  return !!(e && e.showAll);
}
a(Lr, "isExpandType");
function ra(e) {
  return !!(e && e.item);
}
a(ra, "isSearchResult");

// src/manager/hooks/useDebounce.ts
function cp(e, t) {
  let [r, n] = J(e);
  return K(() => {
    let i = setTimeout(() => {
      n(e);
    }, t);
    return () => {
      clearTimeout(i);
    };
  }, [e, t]), r;
}
a(cp, "useDebounce");

// src/manager/components/sidebar/FileSearchModal.utils.tsx
function pp(e) {
  return Object.keys(e).reduce(
    (r, n) => {
      let i = e[n];
      if (typeof i.control == "object" && "type" in i.control)
        switch (i.control.type) {
          case "object":
            r[n] = {};
            break;
          case "inline-radio":
          case "radio":
          case "inline-check":
          case "check":
          case "select":
          case "multi-select":
            r[n] = i.control.options?.[0];
            break;
          case "color":
            r[n] = "#000000";
            break;
          default:
            break;
        }
      return Zn(i.type, r, n), r;
    },
    {}
  );
}
a(pp, "extractSeededRequiredArgs");
function Zn(e, t, r) {
  if (!(typeof e == "string" || !e.required))
    switch (e.name) {
      case "boolean":
        t[r] = !0;
        break;
      case "number":
        t[r] = 0;
        break;
      case "string":
        t[r] = r;
        break;
      case "array":
        t[r] = [];
        break;
      case "object":
        t[r] = {}, Object.entries(e.value ?? {}).forEach(([n, i]) => {
          Zn(i, t[r], n);
        });
        break;
      case "function":
        t[r] = () => {
        };
        break;
      case "intersection":
        e.value?.every((n) => n.name === "object") && (t[r] = {}, e.value?.forEach((n) => {
          n.name === "object" && Object.entries(n.value ?? {}).forEach(([i, o]) => {
            Zn(o, t[r], i);
          });
        }));
        break;
      case "union":
        e.value?.[0] !== void 0 && Zn(e.value[0], t, r);
        break;
      case "enum":
        e.value?.[0] !== void 0 && (t[r] = e.value?.[0]);
        break;
      case "other":
        typeof e.value == "string" && e.value === "tuple" && (t[r] = []);
        break;
      default:
        break;
    }
}
a(Zn, "setArgType");
async function Jn(e, t, r = 1) {
  if (r > 10)
    throw new Error("We could not select the new story. Please try again.");
  try {
    await e(t);
  } catch {
    return await new Promise((i) => setTimeout(i, 500)), Jn(e, t, r + 1);
  }
}
a(Jn, "trySelectNewStory");

// src/manager/components/sidebar/FileList.tsx
var dp = S("div")(({ theme: e }) => ({
  marginTop: "-16px",
  // after element which fades out the list
  "&::after": {
    content: '""',
    position: "fixed",
    pointerEvents: "none",
    bottom: 0,
    left: 0,
    right: 0,
    height: "80px",
    background: `linear-gradient(${Qo(e.barBg, 0)} 10%, ${e.barBg} 80%)`
  }
})), eo = S("div")(({ theme: e }) => ({
  height: "280px",
  overflow: "auto",
  msOverflowStyle: "none",
  scrollbarWidth: "none",
  position: "relative",
  "::-webkit-scrollbar": {
    display: "none"
  }
})), fp = S("li")(({ theme: e }) => ({
  ":focus-visible": {
    outline: "none",
    ".file-list-item": {
      borderRadius: "4px",
      background: e.base === "dark" ? "rgba(255,255,255,.1)" : e.color.mediumlight,
      "> svg": {
        display: "flex"
      }
    }
  }
})), to = S("div")(({ theme: e }) => ({
  display: "flex",
  flexDirection: "column",
  position: "relative"
})), mp = S.div(({ theme: e, selected: t, disabled: r, error: n }) => ({
  display: "flex",
  alignItems: "flex-start",
  gap: "8px",
  alignSelf: "stretch",
  padding: "8px 16px",
  cursor: "pointer",
  borderRadius: "4px",
  ...t && {
    borderRadius: "4px",
    background: e.base === "dark" ? "rgba(255,255,255,.1)" : e.color.mediumlight,
    "> svg": {
      display: "flex"
    }
  },
  ...r && {
    cursor: "not-allowed",
    div: {
      color: `${e.color.mediumdark} !important`
    }
  },
  ...n && {
    background: e.base === "light" ? "#00000011" : "#00000033"
  },
  "&:hover": {
    background: n ? "#00000022" : e.base === "dark" ? "rgba(255,255,255,.1)" : e.color.mediumlight,
    "> svg": {
      display: "flex"
    }
  }
})), hp = S("ul")({
  margin: 0,
  padding: "0 0 0 0",
  width: "100%",
  position: "relative"
}), gp = S("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  width: "calc(100% - 50px)"
}), yp = S("div")(({ theme: e, error: t }) => ({
  color: t ? e.color.negativeText : e.color.secondary
})), vp = S("div")(({ theme: e, error: t }) => ({
  color: t ? e.color.negativeText : e.base === "dark" ? e.color.lighter : e.color.darkest,
  fontSize: "14px",
  whiteSpace: "nowrap",
  textOverflow: "ellipsis",
  overflow: "hidden",
  maxWidth: "100%"
})), bp = S("div")(({ theme: e }) => ({
  color: e.color.mediumdark,
  fontSize: "14px",
  whiteSpace: "nowrap",
  textOverflow: "ellipsis",
  overflow: "hidden",
  maxWidth: "100%"
})), Ip = S("ul")(({ theme: e }) => ({
  margin: 0,
  padding: 0
})), Sp = S("li")(({ theme: e, error: t }) => ({
  padding: "8px 16px 8px 16px",
  marginLeft: "30px",
  display: "flex",
  gap: "8px",
  alignItems: "center",
  justifyContent: "space-between",
  fontSize: "14px",
  cursor: "pointer",
  borderRadius: "4px",
  ":focus-visible": {
    outline: "none"
  },
  ...t && {
    background: "#F9ECEC",
    color: e.color.negativeText
  },
  "&:hover,:focus-visible": {
    background: t ? "#F9ECEC" : e.base === "dark" ? "rgba(255, 255, 255, 0.1)" : e.color.mediumlight,
    "> svg": {
      display: "flex"
    }
  },
  "> div > svg": {
    color: t ? e.color.negativeText : e.color.secondary
  }
})), xp = S("div")(({ theme: e }) => ({
  display: "flex",
  alignItems: "center",
  gap: "8px",
  width: "calc(100% - 20px)"
})), wp = S("span")(({ theme: e }) => ({
  whiteSpace: "nowrap",
  textOverflow: "ellipsis",
  overflow: "hidden",
  maxWidth: "calc(100% - 160px)",
  display: "inline-block"
})), Ep = S("span")(({ theme: e }) => ({
  display: "inline-block",
  padding: `1px ${e.appBorderRadius}px`,
  borderRadius: "2px",
  fontSize: "10px",
  color: e.base === "dark" ? e.color.lightest : "#727272",
  backgroundColor: e.base === "dark" ? "rgba(255, 255, 255, 0.1)" : "#F2F4F5"
})), Cp = S("div")(({ theme: e }) => ({
  textAlign: "center",
  maxWidth: "334px",
  margin: "16px auto 50px auto",
  fontSize: "14px",
  color: e.base === "dark" ? e.color.lightest : "#000"
})), _p = S("p")(({ theme: e }) => ({
  margin: 0,
  color: e.base === "dark" ? e.color.defaultText : e.color.mediumdark
}));

// src/manager/components/sidebar/FileSearchListSkeleton.tsx
var gv = S("div")(({ theme: e }) => ({
  display: "flex",
  alignItems: "flex-start",
  gap: "8px",
  alignSelf: "stretch",
  padding: "8px 16px"
})), yv = S("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  width: "100%",
  borderRadius: "3px"
}), vv = S.div(({ theme: e }) => ({
  width: "14px",
  height: "14px",
  borderRadius: "3px",
  marginTop: "1px",
  background: e.base === "dark" ? "rgba(255,255,255,.1)" : "rgba(0,0,0,.1)",
  animation: `${e.animation.glow} 1.5s ease-in-out infinite`
})), Tp = S.div(({ theme: e }) => ({
  height: "16px",
  borderRadius: "3px",
  background: e.base === "dark" ? "rgba(255,255,255,.1)" : "rgba(0,0,0,.1)",
  animation: `${e.animation.glow} 1.5s ease-in-out infinite`,
  width: "100%",
  maxWidth: "100%",
  "+ div": {
    marginTop: "6px"
  }
})), kp = /* @__PURE__ */ a(() => /* @__PURE__ */ l.createElement(eo, null, [1, 2, 3].map((e) => /* @__PURE__ */ l.createElement(to, { key: e },
/* @__PURE__ */ l.createElement(gv, null, /* @__PURE__ */ l.createElement(vv, null), /* @__PURE__ */ l.createElement(yv, null, /* @__PURE__ */ l.
createElement(Tp, { style: { width: "90px" } }), /* @__PURE__ */ l.createElement(Tp, { style: { width: "300px" } })))))), "FileSearchListLoa\
dingSkeleton");

// global-externals:react-dom
var Nr = __REACT_DOM__, { __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: ZM, createPortal: JM, createRoot: eD, findDOMNode: tD, flushSync: Fr,
hydrate: rD, hydrateRoot: nD, render: oD, unmountComponentAtNode: iD, unstable_batchedUpdates: aD, unstable_renderSubtreeIntoContainer: sD, version: lD } = __REACT_DOM__;

// ../node_modules/@tanstack/virtual-core/dist/esm/utils.js
function Lt(e, t, r) {
  let n = r.initialDeps ?? [], i;
  return () => {
    var o, s, u, c;
    let p;
    r.key && ((o = r.debug) != null && o.call(r)) && (p = Date.now());
    let d = e();
    if (!(d.length !== n.length || d.some((y, m) => n[m] !== y)))
      return i;
    n = d;
    let f;
    if (r.key && ((s = r.debug) != null && s.call(r)) && (f = Date.now()), i = t(...d), r.key && ((u = r.debug) != null && u.call(r))) {
      let y = Math.round((Date.now() - p) * 100) / 100, m = Math.round((Date.now() - f) * 100) / 100, v = m / 16, x = /* @__PURE__ */ a((w, h) => {
        for (w = String(w); w.length < h; )
          w = " " + w;
        return w;
      }, "pad");
      console.info(
        `%c\u23F1 ${x(m, 5)} /${x(y, 5)} ms`,
        `
            font-size: .6rem;
            font-weight: bold;
            color: hsl(${Math.max(
          0,
          Math.min(120 - 120 * v, 120)
        )}deg 100% 31%);`,
        r?.key
      );
    }
    return (c = r?.onChange) == null || c.call(r, i), i;
  };
}
a(Lt, "memo");
function ro(e, t) {
  if (e === void 0)
    throw new Error(`Unexpected undefined${t ? `: ${t}` : ""}`);
  return e;
}
a(ro, "notUndefined");
var Op = /* @__PURE__ */ a((e, t) => Math.abs(e - t) < 1, "approxEqual");

// ../node_modules/@tanstack/virtual-core/dist/esm/index.js
var bv = /* @__PURE__ */ a((e) => e, "defaultKeyExtractor"), Iv = /* @__PURE__ */ a((e) => {
  let t = Math.max(e.startIndex - e.overscan, 0), r = Math.min(e.endIndex + e.overscan, e.count - 1), n = [];
  for (let i = t; i <= r; i++)
    n.push(i);
  return n;
}, "defaultRangeExtractor"), Pp = /* @__PURE__ */ a((e, t) => {
  let r = e.scrollElement;
  if (!r)
    return;
  let n = /* @__PURE__ */ a((o) => {
    let { width: s, height: u } = o;
    t({ width: Math.round(s), height: Math.round(u) });
  }, "handler");
  if (n(r.getBoundingClientRect()), typeof ResizeObserver > "u")
    return () => {
    };
  let i = new ResizeObserver((o) => {
    let s = o[0];
    if (s?.borderBoxSize) {
      let u = s.borderBoxSize[0];
      if (u) {
        n({ width: u.inlineSize, height: u.blockSize });
        return;
      }
    }
    n(r.getBoundingClientRect());
  });
  return i.observe(r, { box: "border-box" }), () => {
    i.unobserve(r);
  };
}, "observeElementRect");
var Ap = /* @__PURE__ */ a((e, t) => {
  let r = e.scrollElement;
  if (!r)
    return;
  let n = /* @__PURE__ */ a(() => {
    t(r[e.options.horizontal ? "scrollLeft" : "scrollTop"]);
  }, "handler");
  return n(), r.addEventListener("scroll", n, {
    passive: !0
  }), () => {
    r.removeEventListener("scroll", n);
  };
}, "observeElementOffset");
var Sv = /* @__PURE__ */ a((e, t, r) => {
  if (t?.borderBoxSize) {
    let n = t.borderBoxSize[0];
    if (n)
      return Math.round(
        n[r.options.horizontal ? "inlineSize" : "blockSize"]
      );
  }
  return Math.round(
    e.getBoundingClientRect()[r.options.horizontal ? "width" : "height"]
  );
}, "measureElement");
var Mp = /* @__PURE__ */ a((e, {
  adjustments: t = 0,
  behavior: r
}, n) => {
  var i, o;
  let s = e + t;
  (o = (i = n.scrollElement) == null ? void 0 : i.scrollTo) == null || o.call(i, {
    [n.options.horizontal ? "left" : "top"]: s,
    behavior: r
  });
}, "elementScroll"), na = class na {
  constructor(t) {
    this.unsubs = [], this.scrollElement = null, this.isScrolling = !1, this.isScrollingTimeoutId = null, this.scrollToIndexTimeoutId = null,
    this.measurementsCache = [], this.itemSizeCache = /* @__PURE__ */ new Map(), this.pendingMeasuredCacheIndexes = [], this.scrollDirection =
    null, this.scrollAdjustments = 0, this.measureElementCache = /* @__PURE__ */ new Map(), this.observer = /* @__PURE__ */ (() => {
      let r = null, n = /* @__PURE__ */ a(() => r || (typeof ResizeObserver < "u" ? r = new ResizeObserver((i) => {
        i.forEach((o) => {
          this._measureElement(o.target, o);
        });
      }) : null), "get");
      return {
        disconnect: /* @__PURE__ */ a(() => {
          var i;
          return (i = n()) == null ? void 0 : i.disconnect();
        }, "disconnect"),
        observe: /* @__PURE__ */ a((i) => {
          var o;
          return (o = n()) == null ? void 0 : o.observe(i, { box: "border-box" });
        }, "observe"),
        unobserve: /* @__PURE__ */ a((i) => {
          var o;
          return (o = n()) == null ? void 0 : o.unobserve(i);
        }, "unobserve")
      };
    })(), this.range = null, this.setOptions = (r) => {
      Object.entries(r).forEach(([n, i]) => {
        typeof i > "u" && delete r[n];
      }), this.options = {
        debug: !1,
        initialOffset: 0,
        overscan: 1,
        paddingStart: 0,
        paddingEnd: 0,
        scrollPaddingStart: 0,
        scrollPaddingEnd: 0,
        horizontal: !1,
        getItemKey: bv,
        rangeExtractor: Iv,
        onChange: /* @__PURE__ */ a(() => {
        }, "onChange"),
        measureElement: Sv,
        initialRect: { width: 0, height: 0 },
        scrollMargin: 0,
        gap: 0,
        scrollingDelay: 150,
        indexAttribute: "data-index",
        initialMeasurementsCache: [],
        lanes: 1,
        ...r
      };
    }, this.notify = (r) => {
      var n, i;
      (i = (n = this.options).onChange) == null || i.call(n, this, r);
    }, this.maybeNotify = Lt(
      () => (this.calculateRange(), [
        this.isScrolling,
        this.range ? this.range.startIndex : null,
        this.range ? this.range.endIndex : null
      ]),
      (r) => {
        this.notify(r);
      },
      {
        key: !1,
        debug: /* @__PURE__ */ a(() => this.options.debug, "debug"),
        initialDeps: [
          this.isScrolling,
          this.range ? this.range.startIndex : null,
          this.range ? this.range.endIndex : null
        ]
      }
    ), this.cleanup = () => {
      this.unsubs.filter(Boolean).forEach((r) => r()), this.unsubs = [], this.scrollElement = null;
    }, this._didMount = () => (this.measureElementCache.forEach(this.observer.observe), () => {
      this.observer.disconnect(), this.cleanup();
    }), this._willUpdate = () => {
      let r = this.options.getScrollElement();
      this.scrollElement !== r && (this.cleanup(), this.scrollElement = r, this._scrollToOffset(this.scrollOffset, {
        adjustments: void 0,
        behavior: void 0
      }), this.unsubs.push(
        this.options.observeElementRect(this, (n) => {
          this.scrollRect = n, this.maybeNotify();
        })
      ), this.unsubs.push(
        this.options.observeElementOffset(this, (n) => {
          this.scrollAdjustments = 0, this.scrollOffset !== n && (this.isScrollingTimeoutId !== null && (clearTimeout(this.isScrollingTimeoutId),
          this.isScrollingTimeoutId = null), this.isScrolling = !0, this.scrollDirection = this.scrollOffset < n ? "forward" : "backward", this.
          scrollOffset = n, this.maybeNotify(), this.isScrollingTimeoutId = setTimeout(() => {
            this.isScrollingTimeoutId = null, this.isScrolling = !1, this.scrollDirection = null, this.maybeNotify();
          }, this.options.scrollingDelay));
        })
      ));
    }, this.getSize = () => this.scrollRect[this.options.horizontal ? "width" : "height"], this.memoOptions = Lt(
      () => [
        this.options.count,
        this.options.paddingStart,
        this.options.scrollMargin,
        this.options.getItemKey
      ],
      (r, n, i, o) => (this.pendingMeasuredCacheIndexes = [], {
        count: r,
        paddingStart: n,
        scrollMargin: i,
        getItemKey: o
      }),
      {
        key: !1
      }
    ), this.getFurthestMeasurement = (r, n) => {
      let i = /* @__PURE__ */ new Map(), o = /* @__PURE__ */ new Map();
      for (let s = n - 1; s >= 0; s--) {
        let u = r[s];
        if (i.has(u.lane))
          continue;
        let c = o.get(
          u.lane
        );
        if (c == null || u.end > c.end ? o.set(u.lane, u) : u.end < c.end && i.set(u.lane, !0), i.size === this.options.lanes)
          break;
      }
      return o.size === this.options.lanes ? Array.from(o.values()).sort((s, u) => s.end === u.end ? s.index - u.index : s.end - u.end)[0] :
      void 0;
    }, this.getMeasurements = Lt(
      () => [this.memoOptions(), this.itemSizeCache],
      ({ count: r, paddingStart: n, scrollMargin: i, getItemKey: o }, s) => {
        let u = this.pendingMeasuredCacheIndexes.length > 0 ? Math.min(...this.pendingMeasuredCacheIndexes) : 0;
        this.pendingMeasuredCacheIndexes = [];
        let c = this.measurementsCache.slice(0, u);
        for (let p = u; p < r; p++) {
          let d = o(p), g = this.options.lanes === 1 ? c[p - 1] : this.getFurthestMeasurement(c, p), f = g ? g.end + this.options.gap : n + i,
          y = s.get(d), m = typeof y == "number" ? y : this.options.estimateSize(p), v = f + m, x = g ? g.lane : p % this.options.lanes;
          c[p] = {
            index: p,
            start: f,
            size: m,
            end: v,
            key: d,
            lane: x
          };
        }
        return this.measurementsCache = c, c;
      },
      {
        key: !1,
        debug: /* @__PURE__ */ a(() => this.options.debug, "debug")
      }
    ), this.calculateRange = Lt(
      () => [this.getMeasurements(), this.getSize(), this.scrollOffset],
      (r, n, i) => this.range = r.length > 0 && n > 0 ? xv({
        measurements: r,
        outerSize: n,
        scrollOffset: i
      }) : null,
      {
        key: !1,
        debug: /* @__PURE__ */ a(() => this.options.debug, "debug")
      }
    ), this.getIndexes = Lt(
      () => [
        this.options.rangeExtractor,
        this.calculateRange(),
        this.options.overscan,
        this.options.count
      ],
      (r, n, i, o) => n === null ? [] : r({
        ...n,
        overscan: i,
        count: o
      }),
      {
        key: !1,
        debug: /* @__PURE__ */ a(() => this.options.debug, "debug")
      }
    ), this.indexFromElement = (r) => {
      let n = this.options.indexAttribute, i = r.getAttribute(n);
      return i ? parseInt(i, 10) : (console.warn(
        `Missing attribute name '${n}={index}' on measured element.`
      ), -1);
    }, this._measureElement = (r, n) => {
      let i = this.measurementsCache[this.indexFromElement(r)];
      if (!i || !r.isConnected) {
        this.measureElementCache.forEach((u, c) => {
          u === r && (this.observer.unobserve(r), this.measureElementCache.delete(c));
        });
        return;
      }
      let o = this.measureElementCache.get(i.key);
      o !== r && (o && this.observer.unobserve(o), this.observer.observe(r), this.measureElementCache.set(i.key, r));
      let s = this.options.measureElement(r, n, this);
      this.resizeItem(i, s);
    }, this.resizeItem = (r, n) => {
      let i = this.itemSizeCache.get(r.key) ?? r.size, o = n - i;
      o !== 0 && ((this.shouldAdjustScrollPositionOnItemSizeChange !== void 0 ? this.shouldAdjustScrollPositionOnItemSizeChange(r, o, this) :
      r.start < this.scrollOffset + this.scrollAdjustments) && this._scrollToOffset(this.scrollOffset, {
        adjustments: this.scrollAdjustments += o,
        behavior: void 0
      }), this.pendingMeasuredCacheIndexes.push(r.index), this.itemSizeCache = new Map(this.itemSizeCache.set(r.key, n)), this.notify(!1));
    }, this.measureElement = (r) => {
      r && this._measureElement(r, void 0);
    }, this.getVirtualItems = Lt(
      () => [this.getIndexes(), this.getMeasurements()],
      (r, n) => {
        let i = [];
        for (let o = 0, s = r.length; o < s; o++) {
          let u = r[o], c = n[u];
          i.push(c);
        }
        return i;
      },
      {
        key: !1,
        debug: /* @__PURE__ */ a(() => this.options.debug, "debug")
      }
    ), this.getVirtualItemForOffset = (r) => {
      let n = this.getMeasurements();
      return ro(
        n[Dp(
          0,
          n.length - 1,
          (i) => ro(n[i]).start,
          r
        )]
      );
    }, this.getOffsetForAlignment = (r, n) => {
      let i = this.getSize();
      n === "auto" && (r <= this.scrollOffset ? n = "start" : r >= this.scrollOffset + i ? n = "end" : n = "start"), n === "start" ? r = r :
      n === "end" ? r = r - i : n === "center" && (r = r - i / 2);
      let o = this.options.horizontal ? "scrollWidth" : "scrollHeight", u = (this.scrollElement ? "document" in this.scrollElement ? this.scrollElement.
      document.documentElement[o] : this.scrollElement[o] : 0) - this.getSize();
      return Math.max(Math.min(u, r), 0);
    }, this.getOffsetForIndex = (r, n = "auto") => {
      r = Math.max(0, Math.min(r, this.options.count - 1));
      let i = ro(this.getMeasurements()[r]);
      if (n === "auto")
        if (i.end >= this.scrollOffset + this.getSize() - this.options.scrollPaddingEnd)
          n = "end";
        else if (i.start <= this.scrollOffset + this.options.scrollPaddingStart)
          n = "start";
        else
          return [this.scrollOffset, n];
      let o = n === "end" ? i.end + this.options.scrollPaddingEnd : i.start - this.options.scrollPaddingStart;
      return [this.getOffsetForAlignment(o, n), n];
    }, this.isDynamicMode = () => this.measureElementCache.size > 0, this.cancelScrollToIndex = () => {
      this.scrollToIndexTimeoutId !== null && (clearTimeout(this.scrollToIndexTimeoutId), this.scrollToIndexTimeoutId = null);
    }, this.scrollToOffset = (r, { align: n = "start", behavior: i } = {}) => {
      this.cancelScrollToIndex(), i === "smooth" && this.isDynamicMode() && console.warn(
        "The `smooth` scroll behavior is not fully supported with dynamic size."
      ), this._scrollToOffset(this.getOffsetForAlignment(r, n), {
        adjustments: void 0,
        behavior: i
      });
    }, this.scrollToIndex = (r, { align: n = "auto", behavior: i } = {}) => {
      r = Math.max(0, Math.min(r, this.options.count - 1)), this.cancelScrollToIndex(), i === "smooth" && this.isDynamicMode() && console.warn(
        "The `smooth` scroll behavior is not fully supported with dynamic size."
      );
      let [o, s] = this.getOffsetForIndex(r, n);
      this._scrollToOffset(o, { adjustments: void 0, behavior: i }), i !== "smooth" && this.isDynamicMode() && (this.scrollToIndexTimeoutId =
      setTimeout(() => {
        if (this.scrollToIndexTimeoutId = null, this.measureElementCache.has(
          this.options.getItemKey(r)
        )) {
          let [c] = this.getOffsetForIndex(r, s);
          Op(c, this.scrollOffset) || this.scrollToIndex(r, { align: s, behavior: i });
        } else
          this.scrollToIndex(r, { align: s, behavior: i });
      }));
    }, this.scrollBy = (r, { behavior: n } = {}) => {
      this.cancelScrollToIndex(), n === "smooth" && this.isDynamicMode() && console.warn(
        "The `smooth` scroll behavior is not fully supported with dynamic size."
      ), this._scrollToOffset(this.scrollOffset + r, {
        adjustments: void 0,
        behavior: n
      });
    }, this.getTotalSize = () => {
      var r;
      let n = this.getMeasurements(), i;
      return n.length === 0 ? i = this.options.paddingStart : i = this.options.lanes === 1 ? ((r = n[n.length - 1]) == null ? void 0 : r.end) ??
      0 : Math.max(
        ...n.slice(-this.options.lanes).map((o) => o.end)
      ), i - this.options.scrollMargin + this.options.paddingEnd;
    }, this._scrollToOffset = (r, {
      adjustments: n,
      behavior: i
    }) => {
      this.options.scrollToFn(r, { behavior: i, adjustments: n }, this);
    }, this.measure = () => {
      this.itemSizeCache = /* @__PURE__ */ new Map(), this.notify(!1);
    }, this.setOptions(t), this.scrollRect = this.options.initialRect, this.scrollOffset = typeof this.options.initialOffset == "function" ?
    this.options.initialOffset() : this.options.initialOffset, this.measurementsCache = this.options.initialMeasurementsCache, this.measurementsCache.
    forEach((r) => {
      this.itemSizeCache.set(r.key, r.size);
    }), this.maybeNotify();
  }
};
a(na, "Virtualizer");
var no = na, Dp = /* @__PURE__ */ a((e, t, r, n) => {
  for (; e <= t; ) {
    let i = (e + t) / 2 | 0, o = r(i);
    if (o < n)
      e = i + 1;
    else if (o > n)
      t = i - 1;
    else
      return i;
  }
  return e > 0 ? e - 1 : 0;
}, "findNearestBinarySearch");
function xv({
  measurements: e,
  outerSize: t,
  scrollOffset: r
}) {
  let n = e.length - 1, o = Dp(0, n, /* @__PURE__ */ a((u) => e[u].start, "getOffset"), r), s = o;
  for (; s < n && e[s].end < r + t; )
    s++;
  return { startIndex: o, endIndex: s };
}
a(xv, "calculateRange");

// ../node_modules/@tanstack/react-virtual/dist/esm/index.js
var wv = typeof document < "u" ? Vt : K;
function Ev(e) {
  let t = Kt(() => ({}), {})[1], r = {
    ...e,
    onChange: /* @__PURE__ */ a((i, o) => {
      var s;
      o ? Fr(t) : t(), (s = e.onChange) == null || s.call(e, i, o);
    }, "onChange")
  }, [n] = J(
    () => new no(r)
  );
  return n.setOptions(r), K(() => n._didMount(), []), wv(() => n._willUpdate()), n;
}
a(Ev, "useVirtualizerBase");
function Lp(e) {
  return Ev({
    observeElementRect: Pp,
    observeElementOffset: Ap,
    scrollToFn: Mp,
    ...e
  });
}
a(Lp, "useVirtualizer");

// src/manager/components/sidebar/FIleSearchList.utils.tsx
var Np = /* @__PURE__ */ a(({
  parentRef: e,
  rowVirtualizer: t,
  selectedItem: r
}) => {
  K(() => {
    let n = /* @__PURE__ */ a((i) => {
      if (!e.current)
        return;
      let o = t.options.count, s = document.activeElement, u = parseInt(s.getAttribute("data-index") || "-1", 10), c = s.tagName === "INPUT",
      p = /* @__PURE__ */ a(() => document.querySelector('[data-index="0"]'), "getFirstElement"), d = /* @__PURE__ */ a(() => document.querySelector(
      `[data-index="${o - 1}"]`), "getLastElement");
      if (i.code === "ArrowDown" && s) {
        if (i.stopPropagation(), c) {
          p()?.focus();
          return;
        }
        if (u === o - 1) {
          Fr(() => {
            t.scrollToIndex(0, { align: "start" });
          }), setTimeout(() => {
            p()?.focus();
          }, 100);
          return;
        }
        if (r === u) {
          document.querySelector(
            `[data-index-position="${r}_first"]`
          )?.focus();
          return;
        }
        if (r !== null && s.getAttribute("data-index-position")?.includes("last")) {
          document.querySelector(
            `[data-index="${r + 1}"]`
          )?.focus();
          return;
        }
        s.nextElementSibling?.focus();
      }
      if (i.code === "ArrowUp" && s) {
        if (c) {
          Fr(() => {
            t.scrollToIndex(o - 1, { align: "start" });
          }), setTimeout(() => {
            d()?.focus();
          }, 100);
          return;
        }
        if (r !== null && s.getAttribute("data-index-position")?.includes("first")) {
          document.querySelector(
            `[data-index="${r}"]`
          )?.focus();
          return;
        }
        s.previousElementSibling?.focus();
      }
    }, "handleArrowKeys");
    return document.addEventListener("keydown", n, { capture: !0 }), () => {
      document.removeEventListener("keydown", n, { capture: !0 });
    };
  }, [t, r, e]);
}, "useArrowKeyNavigation");

// src/manager/components/sidebar/FileSearchList.tsx
var Fp = S(sl)(({ theme: e }) => ({
  display: "none",
  alignSelf: "center",
  color: e.color.mediumdark
})), Cv = S(Jt)(({ theme: e }) => ({
  display: "none",
  alignSelf: "center",
  color: e.color.mediumdark
})), Hp = br(/* @__PURE__ */ a(function({
  isLoading: t,
  searchResults: r,
  onNewStory: n,
  errorItemId: i
}) {
  let [o, s] = J(null), u = l.useRef(), c = j(() => [...r ?? []].sort((m, v) => {
    let x = m.exportedComponents === null || m.exportedComponents?.length === 0, w = m.storyFileExists, h = v.exportedComponents === null ||
    v.exportedComponents?.length === 0, b = v.storyFileExists;
    return w && !b ? -1 : b && !w || x && !h ? 1 : !x && h ? -1 : 0;
  }), [r]), p = r?.length || 0, d = Lp({
    count: p,
    // @ts-expect-error (non strict)
    getScrollElement: /* @__PURE__ */ a(() => u.current, "getScrollElement"),
    paddingStart: 16,
    paddingEnd: 40,
    estimateSize: /* @__PURE__ */ a(() => 54, "estimateSize"),
    overscan: 2
  });
  Np({ rowVirtualizer: d, parentRef: u, selectedItem: o });
  let g = A(
    ({ virtualItem: m, searchResult: v, itemId: x }) => {
      v?.exportedComponents?.length > 1 ? s((w) => w === m.index ? null : m.index) : v?.exportedComponents?.length === 1 && n({
        componentExportName: v.exportedComponents[0].name,
        componentFilePath: v.filepath,
        componentIsDefaultExport: v.exportedComponents[0].default,
        selectedItemId: x,
        componentExportCount: 1
      });
    },
    [n]
  ), f = A(
    ({ searchResult: m, component: v, id: x }) => {
      n({
        componentExportName: v.name,
        componentFilePath: m.filepath,
        componentIsDefaultExport: v.default,
        selectedItemId: x,
        // @ts-expect-error (non strict)
        componentExportCount: m.exportedComponents.length
      });
    },
    [n]
  ), y = A(
    ({ virtualItem: m, selected: v, searchResult: x }) => {
      let w = i === x.filepath, h = v === m.index;
      return /* @__PURE__ */ l.createElement(
        to,
        {
          "aria-expanded": h,
          "aria-controls": `file-list-export-${m.index}`,
          id: `file-list-item-wrapper-${m.index}`
        },
        /* @__PURE__ */ l.createElement(
          mp,
          {
            className: "file-list-item",
            selected: h,
            error: w,
            disabled: x.exportedComponents === null || x.exportedComponents?.length === 0
          },
          /* @__PURE__ */ l.createElement(yp, { error: w }, /* @__PURE__ */ l.createElement(Zo, null)),
          /* @__PURE__ */ l.createElement(gp, null, /* @__PURE__ */ l.createElement(vp, { error: w }, x.filepath.split("/").at(-1)), /* @__PURE__ */ l.
          createElement(bp, null, x.filepath)),
          h ? /* @__PURE__ */ l.createElement(Cv, null) : /* @__PURE__ */ l.createElement(Fp, null)
        ),
        x?.exportedComponents?.length > 1 && h && /* @__PURE__ */ l.createElement(
          Ip,
          {
            role: "region",
            id: `file-list-export-${m.index}`,
            "aria-labelledby": `file-list-item-wrapper-${m.index}`,
            onClick: (b) => {
              b.stopPropagation();
            },
            onKeyUp: (b) => {
              b.key === "Enter" && b.stopPropagation();
            }
          },
          x.exportedComponents?.map((b, I) => {
            let C = i === `${x.filepath}_${I}`, _ = I === 0 ? "first" : (
              // @ts-expect-error (non strict)
              I === x.exportedComponents.length - 1 ? "last" : "middle"
            );
            return /* @__PURE__ */ l.createElement(
              Sp,
              {
                tabIndex: 0,
                "data-index-position": `${m.index}_${_}`,
                key: b.name,
                error: C,
                onClick: () => {
                  f({
                    searchResult: x,
                    component: b,
                    id: `${x.filepath}_${I}`
                  });
                },
                onKeyUp: (T) => {
                  T.key === "Enter" && f({
                    searchResult: x,
                    component: b,
                    id: `${x.filepath}_${I}`
                  });
                }
              },
              /* @__PURE__ */ l.createElement(xp, null, /* @__PURE__ */ l.createElement(Zo, null), b.default ? /* @__PURE__ */ l.createElement(
              l.Fragment, null, /* @__PURE__ */ l.createElement(wp, null, x.filepath.split("/").at(-1)?.split(".")?.at(0)), /* @__PURE__ */ l.
              createElement(Ep, null, "Default export")) : b.name),
              /* @__PURE__ */ l.createElement(Fp, null)
            );
          })
        )
      );
    },
    [f, i]
  );
  return t && (r === null || r?.length === 0) ? /* @__PURE__ */ l.createElement(kp, null) : r?.length === 0 ? /* @__PURE__ */ l.createElement(
  Cp, null, /* @__PURE__ */ l.createElement("p", null, "We could not find any file with that name"), /* @__PURE__ */ l.createElement(_p, null,
  "You may want to try using different keywords, check for typos, and adjust your filters")) : c?.length > 0 ? /* @__PURE__ */ l.createElement(
  dp, null, /* @__PURE__ */ l.createElement(eo, { ref: u }, /* @__PURE__ */ l.createElement(
    hp,
    {
      style: {
        height: `${d.getTotalSize()}px`
      }
    },
    d.getVirtualItems().map((m) => {
      let v = c[m.index], x = v.exportedComponents === null || v.exportedComponents?.length === 0, w = {};
      return /* @__PURE__ */ l.createElement(
        fp,
        {
          key: m.key,
          "data-index": m.index,
          ref: d.measureElement,
          onClick: () => {
            g({
              virtualItem: m,
              itemId: v.filepath,
              searchResult: v
            });
          },
          onKeyUp: (h) => {
            h.key === "Enter" && g({
              virtualItem: m,
              itemId: v.filepath,
              searchResult: v
            });
          },
          style: {
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            transform: `translateY(${m.start}px)`
          },
          tabIndex: 0
        },
        x ? /* @__PURE__ */ l.createElement(
          ze,
          {
            ...w,
            style: { width: "100%" },
            hasChrome: !1,
            closeOnOutsideClick: !0,
            tooltip: /* @__PURE__ */ l.createElement(
              pn,
              {
                note: x ? "We can't evaluate exports for this file. You can't create a story for it automatically" : null
              }
            )
          },
          /* @__PURE__ */ l.createElement(
            y,
            {
              searchResult: v,
              selected: o,
              virtualItem: m
            }
          )
        ) : /* @__PURE__ */ l.createElement(
          y,
          {
            ...w,
            key: m.index,
            searchResult: v,
            selected: o,
            virtualItem: m
          }
        )
      );
    })
  ))) : null;
}, "FileSearchList"));

// src/manager/hooks/useMeasure.tsx
function Bp() {
  let [e, t] = l.useState({
    width: null,
    height: null
  }), r = l.useRef(null);
  return [l.useCallback((i) => {
    if (r.current && (r.current.disconnect(), r.current = null), i?.nodeType === Node.ELEMENT_NODE) {
      let o = new ResizeObserver(([s]) => {
        if (s && s.borderBoxSize) {
          let { inlineSize: u, blockSize: c } = s.borderBoxSize[0];
          t({ width: u, height: c });
        }
      });
      o.observe(i), r.current = o;
    }
  }, []), e];
}
a(Bp, "useMeasure");

// src/manager/components/sidebar/FileSearchModal.tsx
var _v = 418, Tv = S(Et)(() => ({
  boxShadow: "none",
  background: "transparent"
})), kv = S.div(({ theme: e, height: t }) => ({
  backgroundColor: e.background.bar,
  borderRadius: 6,
  boxShadow: "rgba(255, 255, 255, 0.05) 0 0 0 1px inset, rgba(14, 18, 22, 0.35) 0px 10px 18px -10px",
  padding: "16px",
  transition: "height 0.3s",
  height: t ? `${t + 32}px` : "auto",
  overflow: "hidden"
})), Ov = S(Et.Content)(({ theme: e }) => ({
  margin: 0,
  color: e.base === "dark" ? e.color.lighter : e.color.mediumdark
})), Pv = S(on.Input)(({ theme: e }) => ({
  paddingLeft: 40,
  paddingRight: 28,
  fontSize: 14,
  height: 40,
  ...e.base === "light" && {
    color: e.color.darkest
  },
  "::placeholder": {
    color: e.color.mediumdark
  },
  "&:invalid:not(:placeholder-shown)": {
    boxShadow: `${e.color.negative} 0 0 0 1px inset`
  },
  "&::-webkit-search-decoration, &::-webkit-search-cancel-button, &::-webkit-search-results-button, &::-webkit-search-results-decoration": {
    display: "none"
  }
})), Av = S.div({
  display: "flex",
  flexDirection: "column",
  flexGrow: 1,
  position: "relative"
}), Mv = S.div(({ theme: e }) => ({
  position: "absolute",
  top: 0,
  left: 16,
  zIndex: 1,
  pointerEvents: "none",
  color: e.darkest,
  display: "flex",
  alignItems: "center",
  height: "100%"
})), Dv = S.div(({ theme: e }) => ({
  position: "absolute",
  top: 0,
  right: 16,
  zIndex: 1,
  color: e.darkest,
  display: "flex",
  alignItems: "center",
  height: "100%",
  "@keyframes spin": {
    from: { transform: "rotate(0deg)" },
    to: { transform: "rotate(360deg)" }
  },
  animation: "spin 1s linear infinite"
})), Lv = S(Et.Error)({
  position: "absolute",
  padding: "8px 40px 8px 16px",
  bottom: 0,
  maxHeight: "initial",
  width: "100%",
  div: {
    wordBreak: "break-word"
  },
  "> div": {
    padding: 0
  }
}), Nv = S(hn)({
  position: "absolute",
  top: 4,
  right: -24,
  cursor: "pointer"
}), Rp = /* @__PURE__ */ a(({
  open: e,
  onOpenChange: t,
  fileSearchQuery: r,
  setFileSearchQuery: n,
  isLoading: i,
  error: o,
  searchResults: s,
  onCreateNewStory: u,
  setError: c,
  container: p
}) => {
  let [d, g] = Bp(), [f, y] = J(g.height), [, m] = ms(), [v, x] = J(r);
  return K(() => {
    f < g.height && y(g.height);
  }, [g.height, f]), /* @__PURE__ */ l.createElement(
    Tv,
    {
      height: _v,
      width: 440,
      open: e,
      onOpenChange: t,
      onEscapeKeyDown: () => {
        t(!1);
      },
      onInteractOutside: () => {
        t(!1);
      },
      container: p
    },
    /* @__PURE__ */ l.createElement(kv, { height: r === "" ? g.height : f }, /* @__PURE__ */ l.createElement(Ov, { ref: d }, /* @__PURE__ */ l.
    createElement(Et.Header, null, /* @__PURE__ */ l.createElement(Et.Title, null, "Add a new story"), /* @__PURE__ */ l.createElement(Et.Description,
    null, "We will create a new story for your component")), /* @__PURE__ */ l.createElement(Av, null, /* @__PURE__ */ l.createElement(Mv, null,
    /* @__PURE__ */ l.createElement(bn, null)), /* @__PURE__ */ l.createElement(
      Pv,
      {
        placeholder: "./components/**/*.tsx",
        type: "search",
        required: !0,
        autoFocus: !0,
        value: v,
        onChange: (w) => {
          let h = w.target.value;
          x(h), m(() => {
            n(h);
          });
        }
      }
    ), i && /* @__PURE__ */ l.createElement(Dv, null, /* @__PURE__ */ l.createElement(tr, null))), /* @__PURE__ */ l.createElement(
      Hp,
      {
        errorItemId: o?.selectedItemId,
        isLoading: i,
        searchResults: s,
        onNewStory: u
      }
    ))),
    o && r !== "" && /* @__PURE__ */ l.createElement(Lv, null, /* @__PURE__ */ l.createElement("div", null, o.error), /* @__PURE__ */ l.createElement(
      Nv,
      {
        onClick: () => {
          c(null);
        }
      }
    ))
  );
}, "FileSearchModal");

// src/manager/components/sidebar/CreateNewStoryFileModal.tsx
var Fv = /* @__PURE__ */ a((e) => JSON.stringify(e, (t, r) => typeof r == "function" ? "__sb_empty_function_arg__" : r), "stringifyArgs"), zp = /* @__PURE__ */ a(
({ open: e, onOpenChange: t }) => {
  let [r, n] = J(!1), [i, o] = J(""), s = cp(i, 600), u = fs(s), c = Q(null), [p, d] = J(
    null
  ), g = me(), [f, y] = J(null), m = A(
    (h) => {
      g.addNotification({
        id: "create-new-story-file-success",
        content: {
          headline: "Story file created",
          subHeadline: `${h} was created`
        },
        duration: 8e3,
        icon: /* @__PURE__ */ l.createElement(tt, null)
      }), t(!1);
    },
    [g, t]
  ), v = A(() => {
    g.addNotification({
      id: "create-new-story-file-error",
      content: {
        headline: "Story already exists",
        subHeadline: "Successfully navigated to existing story"
      },
      duration: 8e3,
      icon: /* @__PURE__ */ l.createElement(tt, null)
    }), t(!1);
  }, [g, t]), x = A(() => {
    n(!0);
    let h = Ge.getChannel(), b = /* @__PURE__ */ a((I) => {
      I.id === u && (I.success ? y(I.payload.files) : d({ error: I.error }), h.off(Yr, b), n(!1), c.current = null);
    }, "set");
    return h.on(Yr, b), u !== "" && c.current !== u ? (c.current = u, h.emit(os, {
      id: u,
      payload: {}
    })) : (y(null), n(!1)), () => {
      h.off(Yr, b);
    };
  }, [u]), w = A(
    async ({
      componentExportName: h,
      componentFilePath: b,
      componentIsDefaultExport: I,
      componentExportCount: C,
      selectedItemId: _
    }) => {
      try {
        let T = Ge.getChannel(), k = await qr(T, rs, ns, {
          componentExportName: h,
          componentFilePath: b,
          componentIsDefaultExport: I,
          componentExportCount: C
        });
        d(null);
        let E = k.storyId;
        await Jn(g.selectStory, E);
        try {
          let P = (await qr(T, Ja, es, {
            storyId: E
          })).argTypes, M = pp(P);
          await qr(
            T,
            as,
            ss,
            {
              args: Fv(M),
              importPath: k.storyFilePath,
              csfId: E
            }
          );
        } catch {
        }
        m(h), x();
      } catch (T) {
        switch (T?.payload?.type) {
          case "STORY_FILE_EXISTS":
            let k = T;
            await Jn(g.selectStory, k.payload.kind), v();
            break;
          default:
            d({ selectedItemId: _, error: T?.message });
            break;
        }
      }
    },
    [g?.selectStory, m, x, v]
  );
  return K(() => {
    d(null);
  }, [u]), K(() => x(), [x]), /* @__PURE__ */ l.createElement(
    Rp,
    {
      error: p,
      fileSearchQuery: i,
      fileSearchQueryDeferred: u,
      onCreateNewStory: w,
      isLoading: r,
      onOpenChange: t,
      open: e,
      searchResults: f,
      setError: d,
      setFileSearchQuery: o
    }
  );
}, "CreateNewStoryFileModal");

// src/manager/components/sidebar/Search.tsx
var { document: Hv } = ae, oa = 50, Bv = {
  shouldSort: !0,
  tokenize: !0,
  findAllMatches: !0,
  includeScore: !0,
  includeMatches: !0,
  threshold: 0.2,
  location: 0,
  distance: 100,
  maxPatternLength: 32,
  minMatchCharLength: 1,
  keys: [
    { name: "name", weight: 0.7 },
    { name: "path", weight: 0.3 }
  ]
}, Rv = S.div({
  display: "flex",
  flexDirection: "row",
  columnGap: 6
}), zv = S(pn)({
  margin: 0
}), $v = S.label({
  position: "absolute",
  left: -1e4,
  top: "auto",
  width: 1,
  height: 1,
  overflow: "hidden"
}), Wv = S(ie)(({ theme: e }) => ({
  color: e.color.mediumdark
})), Vv = S.div(({ theme: e }) => ({
  position: "absolute",
  top: 0,
  left: 8,
  zIndex: 1,
  pointerEvents: "none",
  color: e.textMutedColor,
  display: "flex",
  alignItems: "center",
  height: "100%"
})), Kv = S.div({
  display: "flex",
  flexDirection: "column",
  flexGrow: 1,
  position: "relative"
}), jv = S.input(({ theme: e }) => ({
  appearance: "none",
  height: 28,
  paddingLeft: 28,
  paddingRight: 28,
  border: 0,
  boxShadow: `${e.button.border} 0 0 0 1px inset`,
  background: "transparent",
  borderRadius: 4,
  fontSize: `${e.typography.size.s1 + 1}px`,
  fontFamily: "inherit",
  transition: "all 150ms",
  color: e.color.defaultText,
  width: "100%",
  "&:focus, &:active": {
    outline: 0,
    borderColor: e.color.secondary,
    background: e.background.app
  },
  "&::placeholder": {
    color: e.textMutedColor,
    opacity: 1
  },
  "&:valid ~ code, &:focus ~ code": {
    display: "none"
  },
  "&:invalid ~ svg": {
    display: "none"
  },
  "&:valid ~ svg": {
    display: "block"
  },
  "&::-ms-clear": {
    display: "none"
  },
  "&::-webkit-search-decoration, &::-webkit-search-cancel-button, &::-webkit-search-results-button, &::-webkit-search-results-decoration": {
    display: "none"
  }
})), Uv = S.code(({ theme: e }) => ({
  position: "absolute",
  top: 6,
  right: 9,
  height: 16,
  zIndex: 1,
  lineHeight: "16px",
  textAlign: "center",
  fontSize: "11px",
  color: e.base === "light" ? e.color.dark : e.textMutedColor,
  userSelect: "none",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  gap: 4
})), qv = S.span({
  fontSize: "14px"
}), Gv = S.div(({ theme: e }) => ({
  position: "absolute",
  top: 0,
  right: 8,
  zIndex: 1,
  color: e.textMutedColor,
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  height: "100%"
})), Yv = S.div({ outline: 0 }), Qv = ae.CONFIG_TYPE === "DEVELOPMENT", Xv = ae.STORYBOOK_RENDERER === "react", Wp = l.memo(/* @__PURE__ */ a(
function({
  children: t,
  dataset: r,
  enableShortcuts: n = !0,
  getLastViewed: i,
  initialQuery: o = "",
  showCreateStoryButton: s = Qv && Xv
}) {
  let u = me(), c = Q(null), [p, d] = J("Find components"), [g, f] = J(!1), y = u ? Ye(u.getShortcutKeys().search) : "/", [m, v] = J(!1), x = A(
  () => {
    let _ = r.entries.reduce((T, [k, { index: E, status: O }]) => {
      let P = _n(E || {}, O);
      return E && T.push(
        ...Object.values(E).map((M) => {
          let L = O && O[M.id] ? Pr(Object.values(O[M.id] || {}).map((D) => D.status)) : null;
          return {
            ...ai(M, r.hash[k]),
            status: L || P[M.id] || null
          };
        })
      ), T;
    }, []);
    return new $p.default(_, Bv);
  }, [r]), w = A(
    (_) => {
      let T = x();
      if (!_) return [];
      let k = [], E = /* @__PURE__ */ new Set(), O = T.search(_).filter(({ item: P }) => !(P.type === "component" || P.type === "docs" || P.
      type === "story") || // @ts-expect-error (non strict)
      E.has(P.parent) ? !1 : (E.add(P.id), !0));
      return O.length && (k = O.slice(0, g ? 1e3 : oa), O.length > oa && !g && k.push({
        showAll: /* @__PURE__ */ a(() => f(!0), "showAll"),
        totalCount: O.length,
        moreCount: O.length - oa
      })), k;
    },
    [g, x]
  ), h = A(
    (_) => {
      if (ra(_)) {
        let { id: T, refId: k } = _.item;
        u?.selectStory(T, void 0, { ref: k !== rt && k }), c.current.blur(), f(!1);
        return;
      }
      Lr(_) && _.showAll();
    },
    [u]
  ), b = A((_, T) => {
    f(!1);
  }, []), I = A(
    (_, T) => {
      switch (T.type) {
        case Dt.stateChangeTypes.blurInput:
          return {
            ...T,
            // Prevent clearing the input on blur
            inputValue: _.inputValue,
            // Return to the tree view after selecting an item
            isOpen: _.inputValue && !_.selectedItem
          };
        case Dt.stateChangeTypes.mouseUp:
          return _;
        case Dt.stateChangeTypes.keyDownEscape:
          return _.inputValue ? { ...T, inputValue: "", isOpen: !0, selectedItem: null } : { ...T, isOpen: !1, selectedItem: null };
        case Dt.stateChangeTypes.clickItem:
        case Dt.stateChangeTypes.keyDownEnter:
          return ra(T.selectedItem) ? { ...T, inputValue: _.inputValue } : Lr(T.selectedItem) ? _ : T;
        default:
          return T;
      }
    },
    []
  ), { isMobile: C } = we();
  return (
    // @ts-expect-error (non strict)
    /* @__PURE__ */ l.createElement(
      Dt,
      {
        initialInputValue: o,
        stateReducer: I,
        itemToString: (_) => _?.item?.name || "",
        scrollIntoView: (_) => kt(_),
        onSelect: h,
        onInputValueChange: b
      },
      ({
        isOpen: _,
        openMenu: T,
        closeMenu: k,
        inputValue: E,
        clearSelection: O,
        getInputProps: P,
        getItemProps: M,
        getLabelProps: L,
        getMenuProps: D,
        getRootProps: V,
        highlightedIndex: X
      }) => {
        let Z = E ? E.trim() : "", R = Z ? w(Z) : [], z = !Z && i();
        z && z.length && (R = z.reduce((N, { storyId: F, refId: $ }) => {
          let Y = r.hash[$];
          if (Y && Y.index && Y.index[F]) {
            let re = Y.index[F], ee = re.type === "story" ? Y.index[re.parent] : re;
            N.some((le) => le.item.refId === $ && le.item.id === ee.id) || N.push({ item: ai(ee, r.hash[$]), matches: [], score: 0 });
          }
          return N;
        }, []));
        let H = "storybook-explorer-searchfield", te = P({
          id: H,
          ref: c,
          required: !0,
          type: "search",
          placeholder: p,
          onFocus: /* @__PURE__ */ a(() => {
            T(), d("Type to find...");
          }, "onFocus"),
          onBlur: /* @__PURE__ */ a(() => d("Find components"), "onBlur"),
          onKeyDown: /* @__PURE__ */ a((N) => {
            N.key === "Escape" && E.length === 0 && c.current.blur();
          }, "onKeyDown")
        }), B = L({
          htmlFor: H
        });
        return /* @__PURE__ */ l.createElement(l.Fragment, null, /* @__PURE__ */ l.createElement($v, { ...B }, "Search for components"), /* @__PURE__ */ l.
        createElement(Rv, null, /* @__PURE__ */ l.createElement(
          Kv,
          {
            ...V({ refKey: "" }, { suppressRefError: !0 }),
            className: "search-field"
          },
          /* @__PURE__ */ l.createElement(Vv, null, /* @__PURE__ */ l.createElement(bn, null)),
          /* @__PURE__ */ l.createElement(jv, { ...te }),
          !C && n && !_ && /* @__PURE__ */ l.createElement(Uv, null, y === "\u2318 K" ? /* @__PURE__ */ l.createElement(l.Fragment, null, /* @__PURE__ */ l.
          createElement(qv, null, "\u2318"), "K") : y),
          _ && /* @__PURE__ */ l.createElement(Gv, { onClick: () => O() }, /* @__PURE__ */ l.createElement(Qe, null))
        ), s && /* @__PURE__ */ l.createElement(l.Fragment, null, /* @__PURE__ */ l.createElement(
          ze,
          {
            trigger: "hover",
            hasChrome: !1,
            tooltip: /* @__PURE__ */ l.createElement(zv, { note: "Create a new story" })
          },
          /* @__PURE__ */ l.createElement(
            Wv,
            {
              onClick: () => {
                v(!0);
              },
              variant: "outline"
            },
            /* @__PURE__ */ l.createElement(vl, null)
          )
        ), /* @__PURE__ */ l.createElement(
          zp,
          {
            open: m,
            onOpenChange: v
          }
        ))), /* @__PURE__ */ l.createElement(Yv, { tabIndex: 0, id: "storybook-explorer-menu" }, t({
          query: Z,
          results: R,
          isBrowsing: !_ && Hv.activeElement !== c.current,
          closeMenu: k,
          getMenuProps: D,
          getItemProps: M,
          highlightedIndex: X
        })));
      }
    )
  );
}, "Search"));

// src/manager/components/sidebar/SearchResults.tsx
var { document: Vp } = ae, Zv = S.ol({
  listStyle: "none",
  margin: 0,
  padding: 0
}), Jv = S.li(({ theme: e, isHighlighted: t }) => ({
  width: "100%",
  border: "none",
  cursor: "pointer",
  display: "flex",
  alignItems: "start",
  textAlign: "left",
  color: "inherit",
  fontSize: `${e.typography.size.s2}px`,
  background: t ? e.background.hoverable : "transparent",
  minHeight: 28,
  borderRadius: 4,
  gap: 6,
  paddingTop: 7,
  paddingBottom: 7,
  paddingLeft: 8,
  paddingRight: 8,
  "&:hover, &:focus": {
    background: ge(0.93, e.color.secondary),
    outline: "none"
  }
})), eb = S.div({
  marginTop: 2
}), tb = S.div(() => ({
  display: "flex",
  flexDirection: "column"
})), rb = S.div(({ theme: e }) => ({
  marginTop: 20,
  textAlign: "center",
  fontSize: `${e.typography.size.s2}px`,
  lineHeight: "18px",
  color: e.color.defaultText,
  small: {
    color: e.barTextColor,
    fontSize: `${e.typography.size.s1}px`
  }
})), nb = S.mark(({ theme: e }) => ({
  background: "transparent",
  color: e.color.secondary
})), ob = S.div({
  marginTop: 8
}), ib = S.div(({ theme: e }) => ({
  display: "flex",
  justifyContent: "space-between",
  fontSize: `${e.typography.size.s1 - 1}px`,
  fontWeight: e.typography.weight.bold,
  minHeight: 28,
  letterSpacing: "0.16em",
  textTransform: "uppercase",
  color: e.textMutedColor,
  marginTop: 16,
  marginBottom: 4,
  alignItems: "center",
  ".search-result-recentlyOpened-clear": {
    visibility: "hidden"
  },
  "&:hover": {
    ".search-result-recentlyOpened-clear": {
      visibility: "visible"
    }
  }
})), Kp = l.memo(/* @__PURE__ */ a(function({
  children: t,
  match: r
}) {
  if (!r) return t;
  let { value: n, indices: i } = r, { nodes: o } = i.reduce(
    ({ cursor: s, nodes: u }, [c, p], d, { length: g }) => (u.push(/* @__PURE__ */ l.createElement("span", { key: `${d}-1` }, n.slice(s, c))),
    u.push(/* @__PURE__ */ l.createElement(nb, { key: `${d}-2` }, n.slice(c, p + 1))), d === g - 1 && u.push(/* @__PURE__ */ l.createElement(
    "span", { key: `${d}-3` }, n.slice(p + 1))), { cursor: p + 1, nodes: u }),
    { cursor: 0, nodes: [] }
  );
  return /* @__PURE__ */ l.createElement("span", null, o);
}, "Highlight")), ab = S.div(({ theme: e }) => ({
  display: "grid",
  justifyContent: "start",
  gridAutoColumns: "auto",
  gridAutoFlow: "column",
  "& > span": {
    display: "block",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis"
  }
})), sb = S.div(({ theme: e }) => ({
  display: "grid",
  justifyContent: "start",
  gridAutoColumns: "auto",
  gridAutoFlow: "column",
  fontSize: `${e.typography.size.s1 - 1}px`,
  "& > span": {
    display: "block",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis"
  },
  "& > span + span": {
    "&:before": {
      content: "' / '"
    }
  }
})), lb = l.memo(/* @__PURE__ */ a(function({ item: t, matches: r, onClick: n, ...i }) {
  let o = A(
    (d) => {
      d.preventDefault(), n?.(d);
    },
    [n]
  ), s = me();
  K(() => {
    s && i.isHighlighted && t.type === "component" && s.emit(xt, { ids: [t.children[0]] }, { options: { target: t.refId } });
  }, [i.isHighlighted, t]);
  let u = r.find((d) => d.key === "name"), c = r.filter((d) => d.key === "path"), [p] = t.status ? ir[t.status] : [];
  return /* @__PURE__ */ l.createElement(Jv, { ...i, onClick: o }, /* @__PURE__ */ l.createElement(eb, null, t.type === "component" && /* @__PURE__ */ l.
  createElement(mt, { viewBox: "0 0 14 14", width: "14", height: "14", type: "component" }, /* @__PURE__ */ l.createElement(lt, { type: "com\
ponent" })), t.type === "story" && /* @__PURE__ */ l.createElement(mt, { viewBox: "0 0 14 14", width: "14", height: "14", type: "story" }, /* @__PURE__ */ l.
  createElement(lt, { type: "story" })), !(t.type === "component" || t.type === "story") && /* @__PURE__ */ l.createElement(mt, { viewBox: "\
0 0 14 14", width: "14", height: "14", type: "document" }, /* @__PURE__ */ l.createElement(lt, { type: "document" }))), /* @__PURE__ */ l.createElement(
  tb, { className: "search-result-item--label" }, /* @__PURE__ */ l.createElement(ab, null, /* @__PURE__ */ l.createElement(Kp, { match: u },
  t.name)), /* @__PURE__ */ l.createElement(sb, null, t.path.map((d, g) => /* @__PURE__ */ l.createElement("span", { key: g }, /* @__PURE__ */ l.
  createElement(Kp, { match: c.find((f) => f.arrayIndex === g) }, d))))), t.status ? p : null);
}, "Result")), jp = l.memo(/* @__PURE__ */ a(function({
  query: t,
  results: r,
  closeMenu: n,
  getMenuProps: i,
  getItemProps: o,
  highlightedIndex: s,
  isLoading: u = !1,
  enableShortcuts: c = !0,
  clearLastViewed: p
}) {
  let d = me();
  K(() => {
    let y = /* @__PURE__ */ a((m) => {
      if (!(!c || u || m.repeat) && ht(!1, m) && Ke("Escape", m)) {
        if (m.target?.id === "storybook-explorer-searchfield") return;
        m.preventDefault(), n();
      }
    }, "handleEscape");
    return Vp.addEventListener("keydown", y), () => Vp.removeEventListener("keydown", y);
  }, [n, c, u]);
  let g = A((y) => {
    if (!d)
      return;
    let m = y.currentTarget, v = m.getAttribute("data-id"), x = m.getAttribute("data-refid"), w = d.resolveStory(v, x === "storybook_interna\
l" ? void 0 : x);
    w?.type === "component" && d.emit(xt, {
      // @ts-expect-error (TODO)
      ids: [w.isLeaf ? w.id : w.children[0]],
      options: { target: x }
    });
  }, []), f = /* @__PURE__ */ a(() => {
    p(), n();
  }, "handleClearLastViewed");
  return /* @__PURE__ */ l.createElement(Zv, { ...i() }, r.length > 0 && !t && /* @__PURE__ */ l.createElement(ib, { className: "search-resu\
lt-recentlyOpened" }, "Recently opened", /* @__PURE__ */ l.createElement(
    ie,
    {
      className: "search-result-recentlyOpened-clear",
      onClick: f
    },
    /* @__PURE__ */ l.createElement(Sl, null)
  )), r.length === 0 && t && /* @__PURE__ */ l.createElement("li", null, /* @__PURE__ */ l.createElement(rb, null, /* @__PURE__ */ l.createElement(
  "strong", null, "No components found"), /* @__PURE__ */ l.createElement("br", null), /* @__PURE__ */ l.createElement("small", null, "Find \
components by name or path."))), r.map((y, m) => {
    if (Lr(y))
      return /* @__PURE__ */ l.createElement(ob, { key: "search-result-expand" }, /* @__PURE__ */ l.createElement(
        xe,
        {
          ...y,
          ...o({ key: m, index: m, item: y }),
          size: "small"
        },
        "Show ",
        y.moreCount,
        " more results"
      ));
    let { item: v } = y, x = `${v.refId}::${v.id}`;
    return /* @__PURE__ */ l.createElement(
      lb,
      {
        key: v.id,
        ...y,
        ...o({ key: x, index: m, item: y }),
        isHighlighted: s === m,
        "data-id": y.item.id,
        "data-refid": y.item.refId,
        onMouseOver: g,
        className: "search-result-item"
      }
    );
  }));
}, "SearchResults"));

// src/manager/components/sidebar/useLastViewed.ts
var Gp = Fe(oi(), 1);
var ao = Fe(Up(), 1);
var qp = (0, Gp.default)((e) => ao.default.set("lastViewedStoryIds", e), 1e3), Yp = /* @__PURE__ */ a((e) => {
  let t = j(() => {
    let i = ao.default.get("lastViewedStoryIds");
    return !i || !Array.isArray(i) ? [] : i.some((o) => typeof o == "object" && o.storyId && o.refId) ? i : [];
  }, [ao.default]), r = Q(t), n = A(
    (i) => {
      let o = r.current, s = o.findIndex(
        ({ storyId: u, refId: c }) => u === i.storyId && c === i.refId
      );
      s !== 0 && (s === -1 ? r.current = [i, ...o] : r.current = [i, ...o.slice(0, s), ...o.slice(s + 1)], qp(r.current));
    },
    [r]
  );
  return K(() => {
    e && n(e);
  }, [e]), {
    getLastViewed: A(() => r.current, [r]),
    clearLastViewed: A(() => {
      r.current = r.current.slice(0, 1), qp(r.current);
    }, [r])
  };
}, "useLastViewed");

// src/manager/components/sidebar/Sidebar.tsx
var rt = "storybook_internal", ub = S.nav(({ theme: e }) => ({
  position: "absolute",
  zIndex: 1,
  left: 0,
  top: 0,
  bottom: 0,
  right: 0,
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  background: e.background.content,
  [st]: {
    background: e.background.app
  }
})), cb = S(it)({
  paddingLeft: 12,
  paddingRight: 12,
  paddingBottom: 20,
  paddingTop: 16,
  flex: 1
}), pb = S.div(({ theme: e }) => ({
  borderTop: `1px solid ${e.appBorderColor}`,
  padding: e.layoutMargin / 2,
  display: "flex",
  flexWrap: "wrap",
  gap: e.layoutMargin / 2,
  backgroundColor: e.barBg,
  "&:empty": {
    display: "none"
  }
})), db = l.memo(/* @__PURE__ */ a(function({
  children: t,
  condition: r
}) {
  let [n, i] = l.Children.toArray(t);
  return /* @__PURE__ */ l.createElement(l.Fragment, null, /* @__PURE__ */ l.createElement("div", { style: { display: r ? "block" : "none" } },
  n), /* @__PURE__ */ l.createElement("div", { style: { display: r ? "none" : "block" } }, i));
}, "Swap")), fb = /* @__PURE__ */ a((e, t, r, n, i) => {
  let o = j(
    () => ({
      [rt]: {
        index: e,
        indexError: t,
        previewInitialized: r,
        status: n,
        title: null,
        id: rt,
        url: "iframe.html"
      },
      ...i
    }),
    [i, e, t, r, n]
  );
  return j(() => ({ hash: o, entries: Object.entries(o) }), [o]);
}, "useCombination"), Qp = l.memo(/* @__PURE__ */ a(function({
  // @ts-expect-error (non strict)
  storyId: t = null,
  refId: r = rt,
  index: n,
  indexError: i,
  status: o,
  previewInitialized: s,
  menu: u,
  extra: c,
  bottom: p = [],
  menuHighlighted: d = !1,
  enableShortcuts: g = !0,
  refs: f = {},
  onMenuClick: y,
  showCreateStoryButton: m
}) {
  let v = j(() => t && { storyId: t, refId: r }, [t, r]), x = fb(n, i, s, o, f), w = !n && !i, h = Yp(v);
  return /* @__PURE__ */ l.createElement(ub, { className: "container sidebar-container" }, /* @__PURE__ */ l.createElement(sn, { vertical: !0,
  offset: 3, scrollbarSize: 6 }, /* @__PURE__ */ l.createElement(cb, { row: 1.6 }, /* @__PURE__ */ l.createElement(
    Al,
    {
      className: "sidebar-header",
      menuHighlighted: d,
      menu: u,
      extra: c,
      skipLinkHref: "#storybook-preview-wrapper",
      isLoading: w,
      onMenuClick: y
    }
  ), /* @__PURE__ */ l.createElement(
    Wp,
    {
      dataset: x,
      enableShortcuts: g,
      showCreateStoryButton: m,
      ...h
    },
    ({
      query: b,
      results: I,
      isBrowsing: C,
      closeMenu: _,
      getMenuProps: T,
      getItemProps: k,
      highlightedIndex: E
    }) => /* @__PURE__ */ l.createElement(db, { condition: C }, /* @__PURE__ */ l.createElement(
      Xu,
      {
        dataset: x,
        selected: v,
        isLoading: w,
        isBrowsing: C
      }
    ), /* @__PURE__ */ l.createElement(
      jp,
      {
        query: b,
        results: I,
        closeMenu: _,
        getMenuProps: T,
        getItemProps: k,
        highlightedIndex: E,
        enableShortcuts: g,
        isLoading: w,
        clearLastViewed: h.clearLastViewed
      }
    ))
  ))), w ? null : /* @__PURE__ */ l.createElement(pb, { className: "sb-bar" }, p.map(({ id: b, render: I }) => /* @__PURE__ */ l.createElement(
  I, { key: b }))));
}, "Sidebar"));

// src/manager/container/Menu.tsx
var mb = {
  storySearchField: "storybook-explorer-searchfield",
  storyListMenu: "storybook-explorer-menu",
  storyPanelRoot: "storybook-panel-root"
}, hb = S.span(({ theme: e }) => ({
  display: "inline-block",
  height: 16,
  lineHeight: "16px",
  textAlign: "center",
  fontSize: "11px",
  background: e.base === "light" ? "rgba(0,0,0,0.05)" : "rgba(255,255,255,0.05)",
  color: e.base === "light" ? e.color.dark : e.textMutedColor,
  borderRadius: 2,
  userSelect: "none",
  pointerEvents: "none",
  padding: "0 6px"
})), gb = S.code(
  ({ theme: e }) => `
  padding: 0;
  vertical-align: middle;

  & + & {
    margin-left: 6px;
  }
`
), We = /* @__PURE__ */ a(({ keys: e }) => /* @__PURE__ */ l.createElement(l.Fragment, null, /* @__PURE__ */ l.createElement(hb, null, e.map(
(t, r) => /* @__PURE__ */ l.createElement(gb, { key: t }, Ye([t]))))), "Shortcut"), Xp = /* @__PURE__ */ a((e, t, r, n, i, o, s) => {
  let u = Re(), c = t.getShortcutKeys(), p = j(
    () => ({
      id: "about",
      title: "About your Storybook",
      onClick: /* @__PURE__ */ a(() => t.changeSettingsTab("about"), "onClick"),
      icon: /* @__PURE__ */ l.createElement(hl, null)
    }),
    [t]
  ), d = j(() => ({
    id: "documentation",
    title: "Documentation",
    href: t.getDocsUrl({ versioned: !0, renderer: !0 }),
    icon: /* @__PURE__ */ l.createElement(_t, null)
  }), [t]), g = e.whatsNewData?.status === "SUCCESS" && !e.disableWhatsNewNotifications, f = t.isWhatsNewUnread(), y = j(
    () => ({
      id: "whats-new",
      title: "What's new?",
      onClick: /* @__PURE__ */ a(() => t.changeSettingsTab("whats-new"), "onClick"),
      right: g && f && /* @__PURE__ */ l.createElement(js, { status: "positive" }, "Check it out"),
      icon: /* @__PURE__ */ l.createElement(xl, null)
    }),
    [t, g, f]
  ), m = j(
    () => ({
      id: "shortcuts",
      title: "Keyboard shortcuts",
      onClick: /* @__PURE__ */ a(() => t.changeSettingsTab("shortcuts"), "onClick"),
      right: s ? /* @__PURE__ */ l.createElement(We, { keys: c.shortcutsPage }) : null,
      style: {
        borderBottom: `4px solid ${u.appBorderColor}`
      }
    }),
    [t, s, c.shortcutsPage, u.appBorderColor]
  ), v = j(
    () => ({
      id: "S",
      title: "Show sidebar",
      onClick: /* @__PURE__ */ a(() => t.toggleNav(), "onClick"),
      active: o,
      right: s ? /* @__PURE__ */ l.createElement(We, { keys: c.toggleNav }) : null,
      icon: o ? /* @__PURE__ */ l.createElement(tt, null) : null
    }),
    [t, s, c, o]
  ), x = j(
    () => ({
      id: "T",
      title: "Show toolbar",
      onClick: /* @__PURE__ */ a(() => t.toggleToolbar(), "onClick"),
      active: r,
      right: s ? /* @__PURE__ */ l.createElement(We, { keys: c.toolbar }) : null,
      icon: r ? /* @__PURE__ */ l.createElement(tt, null) : null
    }),
    [t, s, c, r]
  ), w = j(
    () => ({
      id: "A",
      title: "Show addons",
      onClick: /* @__PURE__ */ a(() => t.togglePanel(), "onClick"),
      active: i,
      right: s ? /* @__PURE__ */ l.createElement(We, { keys: c.togglePanel }) : null,
      icon: i ? /* @__PURE__ */ l.createElement(tt, null) : null
    }),
    [t, s, c, i]
  ), h = j(
    () => ({
      id: "D",
      title: "Change addons orientation",
      onClick: /* @__PURE__ */ a(() => t.togglePanelPosition(), "onClick"),
      right: s ? /* @__PURE__ */ l.createElement(We, { keys: c.panelPosition }) : null
    }),
    [t, s, c]
  ), b = j(
    () => ({
      id: "F",
      title: "Go full screen",
      onClick: /* @__PURE__ */ a(() => t.toggleFullscreen(), "onClick"),
      active: n,
      right: s ? /* @__PURE__ */ l.createElement(We, { keys: c.fullScreen }) : null,
      icon: n ? /* @__PURE__ */ l.createElement(tt, null) : null
    }),
    [t, s, c, n]
  ), I = j(
    () => ({
      id: "/",
      title: "Search",
      onClick: /* @__PURE__ */ a(() => t.focusOnUIElement(mb.storySearchField), "onClick"),
      right: s ? /* @__PURE__ */ l.createElement(We, { keys: c.search }) : null
    }),
    [t, s, c]
  ), C = j(
    () => ({
      id: "up",
      title: "Previous component",
      onClick: /* @__PURE__ */ a(() => t.jumpToComponent(-1), "onClick"),
      right: s ? /* @__PURE__ */ l.createElement(We, { keys: c.prevComponent }) : null
    }),
    [t, s, c]
  ), _ = j(
    () => ({
      id: "down",
      title: "Next component",
      onClick: /* @__PURE__ */ a(() => t.jumpToComponent(1), "onClick"),
      right: s ? /* @__PURE__ */ l.createElement(We, { keys: c.nextComponent }) : null
    }),
    [t, s, c]
  ), T = j(
    () => ({
      id: "prev",
      title: "Previous story",
      onClick: /* @__PURE__ */ a(() => t.jumpToStory(-1), "onClick"),
      right: s ? /* @__PURE__ */ l.createElement(We, { keys: c.prevStory }) : null
    }),
    [t, s, c]
  ), k = j(
    () => ({
      id: "next",
      title: "Next story",
      onClick: /* @__PURE__ */ a(() => t.jumpToStory(1), "onClick"),
      right: s ? /* @__PURE__ */ l.createElement(We, { keys: c.nextStory }) : null
    }),
    [t, s, c]
  ), E = j(
    () => ({
      id: "collapse",
      title: "Collapse all",
      onClick: /* @__PURE__ */ a(() => t.collapseAll(), "onClick"),
      right: s ? /* @__PURE__ */ l.createElement(We, { keys: c.collapseAll }) : null
    }),
    [t, s, c]
  ), O = A(() => {
    let P = t.getAddonsShortcuts(), M = c;
    return Object.entries(P).filter(([L, { showInMenu: D }]) => D).map(([L, { label: D, action: V }]) => ({
      id: L,
      title: D,
      onClick: /* @__PURE__ */ a(() => V(), "onClick"),
      right: s ? /* @__PURE__ */ l.createElement(We, { keys: M[L] }) : null
    }));
  }, [t, s, c]);
  return j(
    () => [
      p,
      ...e.whatsNewData?.status === "SUCCESS" ? [y] : [],
      d,
      m,
      v,
      x,
      w,
      h,
      b,
      I,
      C,
      _,
      T,
      k,
      E,
      ...O()
    ],
    [
      p,
      e,
      y,
      d,
      m,
      v,
      x,
      w,
      h,
      b,
      I,
      C,
      _,
      T,
      k,
      E,
      O
    ]
  );
}, "useMenu");

// src/manager/container/Sidebar.tsx
var yb = l.memo(/* @__PURE__ */ a(function({ onMenuClick: t }) {
  return /* @__PURE__ */ l.createElement(he, { filter: /* @__PURE__ */ a(({ state: n, api: i }) => {
    let {
      ui: { name: o, url: s, enableShortcuts: u },
      viewMode: c,
      storyId: p,
      refId: d,
      layout: { showToolbar: g },
      index: f,
      status: y,
      indexError: m,
      previewInitialized: v,
      refs: x
    } = n, w = Xp(
      n,
      i,
      g,
      i.getIsFullscreen(),
      i.getIsPanelShown(),
      i.getIsNavShown(),
      u
    ), h = n.whatsNewData?.status === "SUCCESS" && !n.disableWhatsNewNotifications, b = i.getElements(Te.experimental_SIDEBAR_BOTTOM), I = i.
    getElements(Te.experimental_SIDEBAR_TOP), C = j(() => Object.values(b), [Object.keys(b).join("")]), _ = j(() => Object.values(I), [Object.
    keys(I).join("")]);
    return {
      title: o,
      url: s,
      index: f,
      indexError: m,
      status: y,
      previewInitialized: v,
      refs: x,
      storyId: p,
      refId: d,
      viewMode: c,
      menu: w,
      menuHighlighted: h && i.isWhatsNewUnread(),
      enableShortcuts: u,
      bottom: C,
      extra: _
    };
  }, "mapper") }, (n) => /* @__PURE__ */ l.createElement(Qp, { ...n, onMenuClick: t }));
}, "Sideber")), Zp = yb;

// src/manager/container/Preview.tsx
var Kr = Fe(wn(), 1);

// src/manager/components/preview/utils/components.ts
var Jp = S.main({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  height: "100%",
  overflow: "hidden"
}), ed = S.div({
  overflow: "auto",
  width: "100%",
  zIndex: 3,
  background: "transparent",
  flex: 1
}), td = S.div(
  {
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
    justifyItems: "center",
    overflow: "auto",
    gridTemplateColumns: "100%",
    gridTemplateRows: "100%",
    position: "relative",
    width: "100%",
    height: "100%"
  },
  ({ show: e }) => ({ display: e ? "grid" : "none" })
), cN = S(Xr)({
  color: "inherit",
  textDecoration: "inherit",
  display: "inline-block"
}), pN = S.span({
  // Hides full screen icon at mobile breakpoint defined in app.js
  "@media (max-width: 599px)": {
    display: "none"
  }
}), so = S.div(({ theme: e }) => ({
  alignContent: "center",
  alignItems: "center",
  justifyContent: "center",
  justifyItems: "center",
  overflow: "auto",
  display: "grid",
  gridTemplateColumns: "100%",
  gridTemplateRows: "100%",
  position: "relative",
  width: "100%",
  height: "100%"
})), rd = S.div(({ theme: e }) => ({
  position: "absolute",
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  background: e.background.preview,
  zIndex: 1
}));

// src/manager/components/preview/tools/zoom.tsx
var Hr = 1, nd = Qr({ value: Hr, set: /* @__PURE__ */ a((e) => {
}, "set") }), aa = class aa extends He {
  state = {
    value: Hr
  };
  set = /* @__PURE__ */ a((t) => this.setState({ value: t }), "set");
  render() {
    let { children: t, shouldScale: r } = this.props, { set: n } = this, { value: i } = this.state;
    return /* @__PURE__ */ l.createElement(nd.Provider, { value: { value: r ? i : Hr, set: n } }, t);
  }
};
a(aa, "ZoomProvider");
var lo = aa, { Consumer: ia } = nd, bb = br(/* @__PURE__ */ a(function({ zoomIn: t, zoomOut: r, reset: n }) {
  return /* @__PURE__ */ l.createElement(l.Fragment, null, /* @__PURE__ */ l.createElement(ie, { key: "zoomin", onClick: t, title: "Zoom in" },
  /* @__PURE__ */ l.createElement(wl, null)), /* @__PURE__ */ l.createElement(ie, { key: "zoomout", onClick: r, title: "Zoom out" }, /* @__PURE__ */ l.
  createElement(El, null)), /* @__PURE__ */ l.createElement(ie, { key: "zoomreset", onClick: n, title: "Reset zoom" }, /* @__PURE__ */ l.createElement(
  Cl, null)));
}, "Zoom"));
var Ib = br(/* @__PURE__ */ a(function({
  set: t,
  value: r
}) {
  let n = A(
    (s) => {
      s.preventDefault(), t(0.8 * r);
    },
    [t, r]
  ), i = A(
    (s) => {
      s.preventDefault(), t(1.25 * r);
    },
    [t, r]
  ), o = A(
    (s) => {
      s.preventDefault(), t(Hr);
    },
    [t, Hr]
  );
  return /* @__PURE__ */ l.createElement(bb, { key: "zoom", zoomIn: n, zoomOut: i, reset: o });
}, "ZoomWrapper"));
function Sb() {
  return /* @__PURE__ */ l.createElement(l.Fragment, null, /* @__PURE__ */ l.createElement(ia, null, ({ set: e, value: t }) => /* @__PURE__ */ l.
  createElement(Ib, { set: e, value: t })), /* @__PURE__ */ l.createElement(Gt, null));
}
a(Sb, "ZoomToolRenderer");
var od = {
  title: "zoom",
  id: "zoom",
  type: ve.TOOL,
  match: /* @__PURE__ */ a(({ viewMode: e, tabId: t }) => e === "story" && !t, "match"),
  render: Sb
};

// src/manager/components/preview/Wrappers.tsx
var id = /* @__PURE__ */ a(({
  wrappers: e,
  id: t,
  storyId: r,
  children: n
}) => /* @__PURE__ */ l.createElement(_e, null, e.reduceRight(
  (i, o, s) => /* @__PURE__ */ l.createElement(o.render, { index: s, children: i, id: t, storyId: r }),
  n
)), "ApplyWrappers"), ad = [
  {
    id: "iframe-wrapper",
    type: Te.PREVIEW,
    render: /* @__PURE__ */ a((e) => /* @__PURE__ */ l.createElement(so, { id: "storybook-preview-wrapper" }, e.children), "render")
  }
];

// src/manager/components/preview/tools/copy.tsx
var dd = Fe(pd(), 1);
var { PREVIEW_URL: _b, document: Tb } = ae, kb = /* @__PURE__ */ a(({ state: e }) => {
  let { storyId: t, refId: r, refs: n } = e, { location: i } = Tb, o = n[r], s = `${i.origin}${i.pathname}`;
  return s.endsWith("/") || (s += "/"), {
    refId: r,
    baseUrl: o ? `${o.url}/iframe.html` : _b || `${s}iframe.html`,
    storyId: t,
    queryParams: e.customQueryParams
  };
}, "copyMapper"), fd = {
  title: "copy",
  id: "copy",
  type: ve.TOOL,
  match: /* @__PURE__ */ a(({ viewMode: e, tabId: t }) => e === "story" && !t, "match"),
  render: /* @__PURE__ */ a(() => /* @__PURE__ */ l.createElement(he, { filter: kb }, ({ baseUrl: e, storyId: t, queryParams: r }) => t ? /* @__PURE__ */ l.
  createElement(
    ie,
    {
      key: "copy",
      onClick: () => (0, dd.default)(Qt(e, t, r)),
      title: "Copy canvas link"
    },
    /* @__PURE__ */ l.createElement(yl, null)
  ) : null), "render")
};

// src/manager/components/preview/tools/eject.tsx
var { PREVIEW_URL: Ob } = ae, Pb = /* @__PURE__ */ a(({ state: e }) => {
  let { storyId: t, refId: r, refs: n } = e, i = n[r];
  return {
    refId: r,
    baseUrl: i ? `${i.url}/iframe.html` : Ob || "iframe.html",
    storyId: t,
    queryParams: e.customQueryParams
  };
}, "ejectMapper"), md = {
  title: "eject",
  id: "eject",
  type: ve.TOOL,
  match: /* @__PURE__ */ a(({ viewMode: e, tabId: t }) => e === "story" && !t, "match"),
  render: /* @__PURE__ */ a(() => /* @__PURE__ */ l.createElement(he, { filter: Pb }, ({ baseUrl: e, storyId: t, queryParams: r }) => t ? /* @__PURE__ */ l.
  createElement(ie, { key: "opener", asChild: !0 }, /* @__PURE__ */ l.createElement(
    "a",
    {
      href: Qt(e, t, r),
      target: "_blank",
      rel: "noopener noreferrer",
      title: "Open canvas in new tab"
    },
    /* @__PURE__ */ l.createElement(_t, null)
  )) : null), "render")
};

// src/manager/components/preview/tools/addons.tsx
var Ab = /* @__PURE__ */ a(({ api: e, state: t }) => ({
  isVisible: e.getIsPanelShown(),
  singleStory: t.singleStory,
  panelPosition: t.layout.panelPosition,
  toggle: /* @__PURE__ */ a(() => e.togglePanel(), "toggle")
}), "menuMapper"), hd = {
  title: "addons",
  id: "addons",
  type: ve.TOOL,
  match: /* @__PURE__ */ a(({ viewMode: e, tabId: t }) => e === "story" && !t, "match"),
  render: /* @__PURE__ */ a(() => /* @__PURE__ */ l.createElement(he, { filter: Ab }, ({ isVisible: e, toggle: t, singleStory: r, panelPosition: n }) => !r &&
  !e && /* @__PURE__ */ l.createElement(l.Fragment, null, /* @__PURE__ */ l.createElement(ie, { "aria-label": "Show addons", key: "addons", onClick: t,
  title: "Show addons" }, n === "bottom" ? /* @__PURE__ */ l.createElement(mn, null) : /* @__PURE__ */ l.createElement(In, null)))), "render")
};

// src/manager/components/preview/tools/remount.tsx
var Mb = S(ie)(({ theme: e, animating: t, disabled: r }) => ({
  opacity: r ? 0.5 : 1,
  svg: {
    animation: t ? `${e.animation.rotate360} 1000ms ease-out` : void 0
  }
})), Db = /* @__PURE__ */ a(({ api: e, state: t }) => {
  let { storyId: r } = t;
  return {
    storyId: r,
    remount: /* @__PURE__ */ a(() => e.emit(Po, { storyId: t.storyId }), "remount"),
    api: e
  };
}, "menuMapper"), gd = {
  title: "remount",
  id: "remount",
  type: ve.TOOL,
  match: /* @__PURE__ */ a(({ viewMode: e, tabId: t }) => e === "story" && !t, "match"),
  render: /* @__PURE__ */ a(() => /* @__PURE__ */ l.createElement(he, { filter: Db }, ({ remount: e, storyId: t, api: r }) => {
    let [n, i] = J(!1), o = /* @__PURE__ */ a(() => {
      t && e();
    }, "remountComponent");
    return r.on(Po, () => {
      i(!0);
    }), /* @__PURE__ */ l.createElement(
      Mb,
      {
        key: "remount",
        title: "Remount component",
        onClick: o,
        onAnimationEnd: () => i(!1),
        animating: n,
        disabled: !t
      },
      /* @__PURE__ */ l.createElement(tr, null)
    );
  }), "render")
};

// src/manager/components/preview/Toolbar.tsx
var Lb = /* @__PURE__ */ a(({ api: e, state: t }) => ({
  toggle: e.toggleFullscreen,
  isFullscreen: e.getIsFullscreen(),
  shortcut: Ye(e.getShortcutKeys().fullScreen),
  hasPanel: Object.keys(e.getElements(Te.PANEL)).length > 0,
  singleStory: t.singleStory
}), "fullScreenMapper"), vd = {
  title: "fullscreen",
  id: "fullscreen",
  type: ve.TOOL,
  // @ts-expect-error (non strict)
  match: /* @__PURE__ */ a((e) => ["story", "docs"].includes(e.viewMode), "match"),
  render: /* @__PURE__ */ a(() => {
    let { isMobile: e } = we();
    return e ? null : /* @__PURE__ */ l.createElement(he, { filter: Lb }, ({ toggle: t, isFullscreen: r, shortcut: n, hasPanel: i, singleStory: o }) => (!o ||
    o && i) && /* @__PURE__ */ l.createElement(
      ie,
      {
        key: "full",
        onClick: t,
        title: `${r ? "Exit full screen" : "Go full screen"} [${n}]`,
        "aria-label": r ? "Exit full screen" : "Go full screen"
      },
      r ? /* @__PURE__ */ l.createElement(Qe, null) : /* @__PURE__ */ l.createElement(pl, null)
    ));
  }, "render")
};
var bd = l.memo(/* @__PURE__ */ a(function({
  isShown: t,
  tools: r,
  toolsExtra: n,
  tabs: i,
  tabId: o,
  api: s
}) {
  return i || r || n ? /* @__PURE__ */ l.createElement(Fb, { className: "sb-bar", key: "toolbar", shown: t, "data-test-id": "sb-preview-tool\
bar" }, /* @__PURE__ */ l.createElement(Hb, null, /* @__PURE__ */ l.createElement(Id, null, i.length > 1 ? /* @__PURE__ */ l.createElement(_e,
  null, /* @__PURE__ */ l.createElement(un, { key: "tabs" }, i.map((u, c) => /* @__PURE__ */ l.createElement(
    cn,
    {
      disabled: u.disabled,
      active: u.id === o || u.id === "canvas" && !o,
      onClick: () => {
        s.applyQueryParams({ tab: u.id === "canvas" ? void 0 : u.id });
      },
      key: u.id || `tab-${c}`
    },
    u.title
  ))), /* @__PURE__ */ l.createElement(Gt, null)) : null, /* @__PURE__ */ l.createElement(yd, { key: "left", list: r })), /* @__PURE__ */ l.
  createElement(Bb, null, /* @__PURE__ */ l.createElement(yd, { key: "right", list: n })))) : null;
}, "ToolbarComp")), yd = l.memo(/* @__PURE__ */ a(function({ list: t }) {
  return /* @__PURE__ */ l.createElement(l.Fragment, null, t.filter(Boolean).map(({ render: r, id: n, ...i }, o) => (
    // @ts-expect-error (Converted from ts-ignore)
    /* @__PURE__ */ l.createElement(r, { key: n || i.key || `f-${o}` })
  )));
}, "Tools"));
function Nb(e, t) {
  let r = t?.type === "story" && t?.prepared ? t?.parameters : {}, n = "toolbar" in r ? r.toolbar : void 0, { toolbar: i } = Ge.getConfig(),
  o = Gr(i, n);
  return o ? !!o[e?.id]?.hidden : !1;
}
a(Nb, "toolbarItemHasBeenExcluded");
function sa(e, t, r, n, i, o) {
  let s = /* @__PURE__ */ a((u) => u && (!u.match || u.match({
    storyId: t?.id,
    refId: t?.refId,
    viewMode: r,
    location: n,
    path: i,
    tabId: o
  })) && !Nb(u, t), "filter");
  return e.filter(s);
}
a(sa, "filterToolsSide");
var Fb = S.div(({ theme: e, shown: t }) => ({
  position: "relative",
  color: e.barTextColor,
  width: "100%",
  height: 40,
  flexShrink: 0,
  overflowX: "auto",
  overflowY: "hidden",
  marginTop: t ? 0 : -40,
  boxShadow: `${e.appBorderColor}  0 -1px 0 0 inset`,
  background: e.barBg,
  zIndex: 4
})), Hb = S.div({
  position: "absolute",
  width: "calc(100% - 20px)",
  display: "flex",
  justifyContent: "space-between",
  flexWrap: "nowrap",
  flexShrink: 0,
  height: 40,
  marginLeft: 10,
  marginRight: 10
}), Id = S.div({
  display: "flex",
  whiteSpace: "nowrap",
  flexBasis: "auto",
  gap: 6,
  alignItems: "center"
}), Bb = S(Id)({
  marginLeft: 30
});

// src/manager/components/preview/Iframe.tsx
var Rb = S.iframe(({ theme: e }) => ({
  backgroundColor: e.background.preview,
  display: "block",
  boxSizing: "content-box",
  height: "100%",
  width: "100%",
  border: "0 none",
  transition: "background-position 0s, visibility 0s",
  backgroundPosition: "-1px -1px, -1px -1px, -1px -1px, -1px -1px",
  margin: "auto",
  boxShadow: "0 0 100px 100vw rgba(0,0,0,0.5)"
}));
function Sd(e) {
  let { active: t, id: r, title: n, src: i, allowFullScreen: o, scale: s, ...u } = e, c = l.useRef(null);
  return /* @__PURE__ */ l.createElement(Qs.IFrame, { scale: s, active: t, iFrameRef: c }, /* @__PURE__ */ l.createElement(
    Rb,
    {
      "data-is-storybook": t ? "true" : "false",
      onLoad: (p) => p.currentTarget.setAttribute("data-is-loaded", "true"),
      id: r,
      title: n,
      src: i,
      allow: "clipboard-write;",
      allowFullScreen: o,
      ref: c,
      ...u
    }
  ));
}
a(Sd, "IFrame");

// src/manager/components/preview/utils/stringifyQueryParams.tsx
var am = Fe(im(), 1);
var sm = /* @__PURE__ */ a((e) => am.default.stringify(e, { addQueryPrefix: !0, encode: !1 }).replace(/^\?/, "&"), "stringifyQueryParams");

// src/manager/components/preview/FramesRenderer.tsx
var BI = /* @__PURE__ */ a((e, t) => e && t[e] ? `storybook-ref-${e}` : "storybook-preview-iframe", "getActive"), RI = S(xe)(({ theme: e }) => ({
  display: "none",
  "@media (min-width: 600px)": {
    position: "absolute",
    display: "block",
    top: 10,
    right: 15,
    padding: "10px 15px",
    fontSize: e.typography.size.s1,
    transform: "translateY(-100px)",
    "&:focus": {
      transform: "translateY(0)",
      zIndex: 1
    }
  }
})), zI = /* @__PURE__ */ a(({ api: e, state: t }) => ({
  isFullscreen: e.getIsFullscreen(),
  isNavShown: e.getIsNavShown(),
  selectedStoryId: t.storyId
}), "whenSidebarIsVisible"), $I = {
  '#root [data-is-storybook="false"]': {
    display: "none"
  },
  '#root [data-is-storybook="true"]': {
    display: "block"
  }
}, lm = /* @__PURE__ */ a(({
  refs: e,
  scale: t,
  viewMode: r = "story",
  refId: n,
  queryParams: i = {},
  baseUrl: o,
  storyId: s = "*"
}) => {
  let u = e[n]?.version, c = sm({
    ...i,
    ...u && { version: u }
  }), p = BI(n, e), { current: d } = Q({}), g = Object.values(e).filter((f) => f.type === "auto-inject" || f.id === n, {});
  return d["storybook-preview-iframe"] || (d["storybook-preview-iframe"] = Qt(o, s, {
    ...i,
    ...u && { version: u },
    viewMode: r
  })), g.forEach((f) => {
    let y = `storybook-ref-${f.id}`, m = d[y]?.split("/iframe.html")[0];
    if (!m || f.url !== m) {
      let v = `${f.url}/iframe.html?id=${s}&viewMode=${r}&refId=${f.id}${c}`;
      d[y] = v;
    }
  }), /* @__PURE__ */ l.createElement(_e, null, /* @__PURE__ */ l.createElement(jt, { styles: $I }), /* @__PURE__ */ l.createElement(he, { filter: zI },
  ({ isFullscreen: f, isNavShown: y, selectedStoryId: m }) => f || !y || !m ? null : /* @__PURE__ */ l.createElement(RI, { asChild: !0 }, /* @__PURE__ */ l.
  createElement("a", { href: `#${m}`, tabIndex: 0, title: "Skip to sidebar" }, "Skip to sidebar"))), Object.entries(d).map(([f, y]) => /* @__PURE__ */ l.
  createElement(_e, { key: f }, /* @__PURE__ */ l.createElement(
    Sd,
    {
      active: f === p,
      key: f,
      id: f,
      title: f,
      src: y,
      allowFullScreen: !0,
      scale: t
    }
  ))));
}, "FramesRenderer");

// src/manager/components/preview/Preview.tsx
var WI = /* @__PURE__ */ a(({ state: e, api: t }) => ({
  storyId: e.storyId,
  refId: e.refId,
  viewMode: e.viewMode,
  customCanvas: t.renderPreview,
  queryParams: e.customQueryParams,
  getElements: t.getElements,
  entry: t.getData(e.storyId, e.refId),
  previewInitialized: e.previewInitialized,
  refs: e.refs
}), "canvasMapper"), um = /* @__PURE__ */ a(() => ({
  id: "canvas",
  type: ve.TAB,
  title: "Canvas",
  route: /* @__PURE__ */ a(({ storyId: e, refId: t }) => t ? `/story/${t}_${e}` : `/story/${e}`, "route"),
  match: /* @__PURE__ */ a(({ viewMode: e }) => !!(e && e.match(/^(story|docs)$/)), "match"),
  render: /* @__PURE__ */ a(() => null, "render")
}), "createCanvasTab"), cm = l.memo(/* @__PURE__ */ a(function(t) {
  let {
    api: r,
    id: n,
    options: i,
    viewMode: o,
    storyId: s,
    entry: u = void 0,
    description: c,
    baseUrl: p,
    withLoader: d = !0,
    tools: g,
    toolsExtra: f,
    tabs: y,
    wrappers: m,
    tabId: v
  } = t, x = y.find((I) => I.id === v)?.render, w = o === "story", { showToolbar: h } = i, b = Q(s);
  return K(() => {
    if (u && o) {
      if (s === b.current)
        return;
      if (b.current = s, o.match(/docs|story/)) {
        let { refId: I, id: C } = u;
        r.emit(ls, {
          storyId: C,
          viewMode: o,
          options: { target: I }
        });
      }
    }
  }, [u, o, s, r]), /* @__PURE__ */ l.createElement(_e, null, n === "main" && /* @__PURE__ */ l.createElement(Er, { key: "description" }, /* @__PURE__ */ l.
  createElement("title", null, c)), /* @__PURE__ */ l.createElement(lo, { shouldScale: w }, /* @__PURE__ */ l.createElement(Jp, null, /* @__PURE__ */ l.
  createElement(
    bd,
    {
      key: "tools",
      isShown: h,
      tabId: v,
      tabs: y,
      tools: g,
      toolsExtra: f,
      api: r
    }
  ), /* @__PURE__ */ l.createElement(ed, { key: "frame" }, x && /* @__PURE__ */ l.createElement(so, null, x({ active: !0 })), /* @__PURE__ */ l.
  createElement(td, { show: !v }, /* @__PURE__ */ l.createElement(VI, { withLoader: d, baseUrl: p, wrappers: m }))))));
}, "Preview"));
var VI = /* @__PURE__ */ a(({ baseUrl: e, withLoader: t, wrappers: r }) => /* @__PURE__ */ l.createElement(he, { filter: WI }, ({
  entry: n,
  refs: i,
  customCanvas: o,
  storyId: s,
  refId: u,
  viewMode: c,
  queryParams: p,
  previewInitialized: d
}) => {
  let g = "canvas", [f, y] = J(void 0);
  K(() => {
    if (ae.CONFIG_TYPE === "DEVELOPMENT")
      try {
        Ge.getChannel().on(is, (b) => {
          y(b);
        });
      } catch {
      }
  }, []);
  let m = !!i[u] && !i[u].previewInitialized, v = !(f?.value === 1 || f === void 0), x = !u && (!d || v), w = n && m || x;
  return /* @__PURE__ */ l.createElement(ia, null, ({ value: h }) => /* @__PURE__ */ l.createElement(l.Fragment, null, t && w && /* @__PURE__ */ l.
  createElement(rd, null, /* @__PURE__ */ l.createElement(an, { id: "preview-loader", role: "progressbar", progress: f })), /* @__PURE__ */ l.
  createElement(id, { id: g, storyId: s, viewMode: c, wrappers: r }, o ? o(s, c, g, e, h, p) : /* @__PURE__ */ l.createElement(
    lm,
    {
      baseUrl: e,
      refs: i,
      scale: h,
      entry: n,
      viewMode: c,
      refId: u,
      queryParams: p,
      storyId: s
    }
  ))));
}), "Canvas");
function pm(e, t) {
  let { previewTabs: r } = Ge.getConfig(), n = t ? t.previewTabs : void 0;
  if (r || n) {
    let i = Gr(r, n), o = Object.keys(i).map((s, u) => ({
      index: u,
      ...typeof i[s] == "string" ? { title: i[s] } : i[s],
      id: s
    }));
    return e.filter((s) => {
      let u = o.find((c) => c.id === s.id);
      return u === void 0 || u.id === "canvas" || !u.hidden;
    }).map((s, u) => ({ ...s, index: u })).sort((s, u) => {
      let c = o.find((f) => f.id === s.id), p = c ? c.index : o.length + s.index, d = o.find((f) => f.id === u.id), g = d ? d.index : o.length +
      u.index;
      return p - g;
    }).map((s) => {
      let u = o.find((c) => c.id === s.id);
      return u ? {
        ...s,
        title: u.title || s.title,
        disabled: u.disabled,
        hidden: u.hidden
      } : s;
    });
  }
  return e;
}
a(pm, "filterTabs");

// src/manager/components/preview/tools/menu.tsx
var KI = /* @__PURE__ */ a(({ api: e, state: t }) => ({
  isVisible: e.getIsNavShown(),
  singleStory: t.singleStory,
  toggle: /* @__PURE__ */ a(() => e.toggleNav(), "toggle")
}), "menuMapper"), dm = {
  title: "menu",
  id: "menu",
  type: ve.TOOL,
  // @ts-expect-error (non strict)
  match: /* @__PURE__ */ a(({ viewMode: e }) => ["story", "docs"].includes(e), "match"),
  render: /* @__PURE__ */ a(() => /* @__PURE__ */ l.createElement(he, { filter: KI }, ({ isVisible: e, toggle: t, singleStory: r }) => !r &&
  !e && /* @__PURE__ */ l.createElement(l.Fragment, null, /* @__PURE__ */ l.createElement(ie, { "aria-label": "Show sidebar", key: "menu", onClick: t,
  title: "Show sidebar" }, /* @__PURE__ */ l.createElement(vn, null)), /* @__PURE__ */ l.createElement(Gt, null))), "render")
};

// src/manager/container/Preview.tsx
var jI = [um()], UI = [dm, gd, od], qI = [hd, vd, md, fd], GI = [], YI = (0, Kr.default)(1)(
  (e, t, r, n) => n ? pm([...jI, ...Object.values(t)], r) : GI
), QI = (0, Kr.default)(1)(
  (e, t, r) => sa([...UI, ...Object.values(t)], ...r)
), XI = (0, Kr.default)(1)(
  (e, t, r) => sa([...qI, ...Object.values(t)], ...r)
), ZI = (0, Kr.default)(1)((e, t) => [
  ...ad,
  ...Object.values(t)
]), { PREVIEW_URL: JI } = ae, eS = /* @__PURE__ */ a((e) => e.split("/").join(" / ").replace(/\s\s/, " "), "splitTitleAddExtraSpace"), tS = /* @__PURE__ */ a(
(e) => {
  if (e?.type === "story" || e?.type === "docs") {
    let { title: t, name: r } = e;
    return t && r ? eS(`${t} - ${r} \u22C5 Storybook`) : "Storybook";
  }
  return e?.name ? `${e.name} \u22C5 Storybook` : "Storybook";
}, "getDescription"), rS = /* @__PURE__ */ a(({
  api: e,
  state: t
  // @ts-expect-error (non strict)
}) => {
  let { layout: r, location: n, customQueryParams: i, storyId: o, refs: s, viewMode: u, path: c, refId: p } = t, d = e.getData(o, p), g = Object.
  values(e.getElements(Te.TAB)), f = Object.values(e.getElements(Te.PREVIEW)), y = Object.values(e.getElements(Te.TOOL)), m = Object.values(
  e.getElements(Te.TOOLEXTRA)), v = e.getQueryParam("tab"), x = QI(y.length, e.getElements(Te.TOOL), [
    d,
    u,
    n,
    c,
    // @ts-expect-error (non strict)
    v
  ]), w = XI(
    m.length,
    e.getElements(Te.TOOLEXTRA),
    // @ts-expect-error (non strict)
    [d, u, n, c, v]
  );
  return {
    api: e,
    entry: d,
    options: r,
    description: tS(d),
    viewMode: u,
    refs: s,
    storyId: o,
    baseUrl: JI || "iframe.html",
    queryParams: i,
    tools: x,
    toolsExtra: w,
    tabs: YI(
      g.length,
      e.getElements(Te.TAB),
      d ? d.parameters : void 0,
      r.showTabs
    ),
    wrappers: ZI(
      f.length,
      e.getElements(Te.PREVIEW)
    ),
    tabId: v
  };
}, "mapper"), nS = l.memo(/* @__PURE__ */ a(function(t) {
  return /* @__PURE__ */ l.createElement(he, { filter: rS }, (r) => /* @__PURE__ */ l.createElement(cm, { ...t, ...r }));
}, "PreviewConnected")), fm = nS;

// src/manager/container/Panel.tsx
var mm = Fe(wn(), 1);

// src/manager/components/panel/Panel.tsx
var Fa = class Fa extends He {
  constructor(t) {
    super(t), this.state = { hasError: !1 };
  }
  componentDidCatch(t, r) {
    this.setState({ hasError: !0 }), console.error(t, r);
  }
  // @ts-expect-error (we know this is broken)
  render() {
    let { hasError: t } = this.state, { children: r } = this.props;
    return t ? /* @__PURE__ */ l.createElement("h1", null, "Something went wrong.") : r;
  }
};
a(Fa, "SafeTab");
var La = Fa, Na = l.memo(
  ({
    panels: e,
    shortcuts: t,
    actions: r,
    selectedPanel: n = null,
    panelPosition: i = "right",
    absolute: o = !0
  }) => {
    let { isDesktop: s, setMobilePanelOpen: u } = we();
    return /* @__PURE__ */ l.createElement(
      Ys,
      {
        absolute: o,
        ...n ? { selected: n } : {},
        menuName: "Addons",
        actions: r,
        showToolsWhenEmpty: !0,
        emptyState: /* @__PURE__ */ l.createElement(
          Us,
          {
            title: "Storybook add-ons",
            description: /* @__PURE__ */ l.createElement(l.Fragment, null, "Integrate your tools with Storybook to connect workflows and unl\
ock advanced features."),
            footer: /* @__PURE__ */ l.createElement(Me, { href: "https://storybook.js.org/integrations", target: "_blank", withArrow: !0 }, /* @__PURE__ */ l.
            createElement(er, null), " Explore integrations catalog")
          }
        ),
        tools: /* @__PURE__ */ l.createElement(oS, null, s ? /* @__PURE__ */ l.createElement(l.Fragment, null, /* @__PURE__ */ l.createElement(
          ie,
          {
            key: "position",
            onClick: r.togglePosition,
            title: `Change addon orientation [${Ye(
              t.panelPosition
            )}]`
          },
          i === "bottom" ? /* @__PURE__ */ l.createElement(In, null) : /* @__PURE__ */ l.createElement(mn, null)
        ), /* @__PURE__ */ l.createElement(
          ie,
          {
            key: "visibility",
            onClick: r.toggleVisibility,
            title: `Hide addons [${Ye(t.togglePanel)}]`
          },
          /* @__PURE__ */ l.createElement(Qe, null)
        )) : /* @__PURE__ */ l.createElement(ie, { onClick: () => u(!1), title: "Close addon panel" }, /* @__PURE__ */ l.createElement(Qe, null))),
        id: "storybook-panel-root"
      },
      Object.entries(e).map(([c, p]) => (
        // @ts-expect-error (we know this is broken)
        /* @__PURE__ */ l.createElement(La, { key: c, id: c, title: typeof p.title == "function" ? /* @__PURE__ */ l.createElement(p.title, null) :
        p.title }, p.render)
      ))
    );
  }
);
Na.displayName = "AddonPanel";
var oS = S.div({
  display: "flex",
  alignItems: "center",
  gap: 6
});

// src/manager/container/Panel.tsx
var iS = (0, mm.default)(1)((e) => ({
  onSelect: /* @__PURE__ */ a((t) => e.setSelectedPanel(t), "onSelect"),
  toggleVisibility: /* @__PURE__ */ a(() => e.togglePanel(), "toggleVisibility"),
  togglePosition: /* @__PURE__ */ a(() => e.togglePanelPosition(), "togglePosition")
})), aS = /* @__PURE__ */ a((e) => {
  let t = e.getElements(Te.PANEL), r = e.getCurrentStoryData();
  if (!t || !r || r.type !== "story")
    return t;
  let { parameters: n } = r, i = {};
  return Object.entries(t).forEach(([o, s]) => {
    let { paramKey: u } = s;
    u && n && n[u] && n[u].disable || (i[o] = s);
  }), i;
}, "getPanels"), sS = /* @__PURE__ */ a(({ state: e, api: t }) => ({
  panels: aS(t),
  selectedPanel: t.getSelectedPanel(),
  panelPosition: e.layout.panelPosition,
  actions: iS(t),
  shortcuts: t.getShortcutKeys()
}), "mapper"), lS = /* @__PURE__ */ a((e) => /* @__PURE__ */ l.createElement(he, { filter: sS }, (t) => /* @__PURE__ */ l.createElement(Na, {
...e, ...t })), "Panel"), hm = lS;

// src/manager/components/layout/useDragging.ts
var gm = 30, Co = 240, _o = 270, ym = 0.9;
function vm(e, t, r) {
  return Math.min(Math.max(e, t), r);
}
a(vm, "clamp");
function bm(e, t, r) {
  return t + (r - t) * e;
}
a(bm, "interpolate");
function Im({
  setState: e,
  isPanelShown: t,
  isDesktop: r
}) {
  let n = Q(null), i = Q(null);
  return K(() => {
    let o = n.current, s = i.current, u = document.querySelector("#storybook-preview-iframe"), c = null, p = /* @__PURE__ */ a((f) => {
      f.preventDefault(), e((y) => ({
        ...y,
        isDragging: !0
      })), f.currentTarget === o ? c = o : f.currentTarget === s && (c = s), window.addEventListener("mousemove", g), window.addEventListener(
      "mouseup", d), u && (u.style.pointerEvents = "none");
    }, "onDragStart"), d = /* @__PURE__ */ a((f) => {
      e((y) => c === s && y.navSize < Co && y.navSize > 0 ? {
        ...y,
        isDragging: !1,
        navSize: Co
      } : c === o && y.panelPosition === "right" && y.rightPanelWidth < _o && y.rightPanelWidth > 0 ? {
        ...y,
        isDragging: !1,
        rightPanelWidth: _o
      } : {
        ...y,
        isDragging: !1
      }), window.removeEventListener("mousemove", g), window.removeEventListener("mouseup", d), u?.removeAttribute("style"), c = null;
    }, "onDragEnd"), g = /* @__PURE__ */ a((f) => {
      if (f.buttons === 0) {
        d(f);
        return;
      }
      e((y) => {
        if (c === s) {
          let m = f.clientX;
          return m === y.navSize ? y : m <= gm ? {
            ...y,
            navSize: 0
          } : m <= Co ? {
            ...y,
            navSize: bm(ym, m, Co)
          } : {
            ...y,
            // @ts-expect-error (non strict)
            navSize: vm(m, 0, f.view.innerWidth)
          };
        }
        if (c === o) {
          let m = y.panelPosition === "bottom" ? "bottomPanelHeight" : "rightPanelWidth", v = y.panelPosition === "bottom" ? (
            // @ts-expect-error (non strict)
            f.view.innerHeight - f.clientY
          ) : (
            // @ts-expect-error (non strict)
            f.view.innerWidth - f.clientX
          );
          if (v === y[m])
            return y;
          if (v <= gm)
            return {
              ...y,
              [m]: 0
            };
          if (y.panelPosition === "right" && v <= _o)
            return {
              ...y,
              [m]: bm(
                ym,
                v,
                _o
              )
            };
          let x = (
            // @ts-expect-error (non strict)
            y.panelPosition === "bottom" ? f.view.innerHeight : f.view.innerWidth
          );
          return {
            ...y,
            [m]: vm(v, 0, x)
          };
        }
        return y;
      });
    }, "onDrag");
    return o?.addEventListener("mousedown", p), s?.addEventListener("mousedown", p), () => {
      o?.removeEventListener("mousedown", p), s?.removeEventListener("mousedown", p), u?.removeAttribute("style");
    };
  }, [
    // we need to rerun this effect when the panel is shown/hidden or when changing between mobile/desktop to re-attach the event listeners
    t,
    r,
    e
  ]), { panelResizerRef: n, sidebarResizerRef: i };
}
a(Im, "useDragging");

// ../node_modules/react-transition-group/esm/config.js
var Ha = {
  disabled: !1
};

// ../node_modules/react-transition-group/esm/TransitionGroupContext.js
var Ba = l.createContext(null);

// ../node_modules/react-transition-group/esm/utils/reflow.js
var Sm = /* @__PURE__ */ a(function(t) {
  return t.scrollTop;
}, "forceReflow");

// ../node_modules/react-transition-group/esm/Transition.js
var jr = "unmounted", Rt = "exited", zt = "entering", gr = "entered", Ra = "exiting", ct = /* @__PURE__ */ function(e) {
  Ct(t, e);
  function t(n, i) {
    var o;
    o = e.call(this, n, i) || this;
    var s = i, u = s && !s.isMounting ? n.enter : n.appear, c;
    return o.appearStatus = null, n.in ? u ? (c = Rt, o.appearStatus = zt) : c = gr : n.unmountOnExit || n.mountOnEnter ? c = jr : c = Rt, o.
    state = {
      status: c
    }, o.nextCallback = null, o;
  }
  a(t, "Transition"), t.getDerivedStateFromProps = /* @__PURE__ */ a(function(i, o) {
    var s = i.in;
    return s && o.status === jr ? {
      status: Rt
    } : null;
  }, "getDerivedStateFromProps");
  var r = t.prototype;
  return r.componentDidMount = /* @__PURE__ */ a(function() {
    this.updateStatus(!0, this.appearStatus);
  }, "componentDidMount"), r.componentDidUpdate = /* @__PURE__ */ a(function(i) {
    var o = null;
    if (i !== this.props) {
      var s = this.state.status;
      this.props.in ? s !== zt && s !== gr && (o = zt) : (s === zt || s === gr) && (o = Ra);
    }
    this.updateStatus(!1, o);
  }, "componentDidUpdate"), r.componentWillUnmount = /* @__PURE__ */ a(function() {
    this.cancelNextCallback();
  }, "componentWillUnmount"), r.getTimeouts = /* @__PURE__ */ a(function() {
    var i = this.props.timeout, o, s, u;
    return o = s = u = i, i != null && typeof i != "number" && (o = i.exit, s = i.enter, u = i.appear !== void 0 ? i.appear : s), {
      exit: o,
      enter: s,
      appear: u
    };
  }, "getTimeouts"), r.updateStatus = /* @__PURE__ */ a(function(i, o) {
    if (i === void 0 && (i = !1), o !== null)
      if (this.cancelNextCallback(), o === zt) {
        if (this.props.unmountOnExit || this.props.mountOnEnter) {
          var s = this.props.nodeRef ? this.props.nodeRef.current : Nr.findDOMNode(this);
          s && Sm(s);
        }
        this.performEnter(i);
      } else
        this.performExit();
    else this.props.unmountOnExit && this.state.status === Rt && this.setState({
      status: jr
    });
  }, "updateStatus"), r.performEnter = /* @__PURE__ */ a(function(i) {
    var o = this, s = this.props.enter, u = this.context ? this.context.isMounting : i, c = this.props.nodeRef ? [u] : [Nr.findDOMNode(this),
    u], p = c[0], d = c[1], g = this.getTimeouts(), f = u ? g.appear : g.enter;
    if (!i && !s || Ha.disabled) {
      this.safeSetState({
        status: gr
      }, function() {
        o.props.onEntered(p);
      });
      return;
    }
    this.props.onEnter(p, d), this.safeSetState({
      status: zt
    }, function() {
      o.props.onEntering(p, d), o.onTransitionEnd(f, function() {
        o.safeSetState({
          status: gr
        }, function() {
          o.props.onEntered(p, d);
        });
      });
    });
  }, "performEnter"), r.performExit = /* @__PURE__ */ a(function() {
    var i = this, o = this.props.exit, s = this.getTimeouts(), u = this.props.nodeRef ? void 0 : Nr.findDOMNode(this);
    if (!o || Ha.disabled) {
      this.safeSetState({
        status: Rt
      }, function() {
        i.props.onExited(u);
      });
      return;
    }
    this.props.onExit(u), this.safeSetState({
      status: Ra
    }, function() {
      i.props.onExiting(u), i.onTransitionEnd(s.exit, function() {
        i.safeSetState({
          status: Rt
        }, function() {
          i.props.onExited(u);
        });
      });
    });
  }, "performExit"), r.cancelNextCallback = /* @__PURE__ */ a(function() {
    this.nextCallback !== null && (this.nextCallback.cancel(), this.nextCallback = null);
  }, "cancelNextCallback"), r.safeSetState = /* @__PURE__ */ a(function(i, o) {
    o = this.setNextCallback(o), this.setState(i, o);
  }, "safeSetState"), r.setNextCallback = /* @__PURE__ */ a(function(i) {
    var o = this, s = !0;
    return this.nextCallback = function(u) {
      s && (s = !1, o.nextCallback = null, i(u));
    }, this.nextCallback.cancel = function() {
      s = !1;
    }, this.nextCallback;
  }, "setNextCallback"), r.onTransitionEnd = /* @__PURE__ */ a(function(i, o) {
    this.setNextCallback(o);
    var s = this.props.nodeRef ? this.props.nodeRef.current : Nr.findDOMNode(this), u = i == null && !this.props.addEndListener;
    if (!s || u) {
      setTimeout(this.nextCallback, 0);
      return;
    }
    if (this.props.addEndListener) {
      var c = this.props.nodeRef ? [this.nextCallback] : [s, this.nextCallback], p = c[0], d = c[1];
      this.props.addEndListener(p, d);
    }
    i != null && setTimeout(this.nextCallback, i);
  }, "onTransitionEnd"), r.render = /* @__PURE__ */ a(function() {
    var i = this.state.status;
    if (i === jr)
      return null;
    var o = this.props, s = o.children, u = o.in, c = o.mountOnEnter, p = o.unmountOnExit, d = o.appear, g = o.enter, f = o.exit, y = o.timeout,
    m = o.addEndListener, v = o.onEnter, x = o.onEntering, w = o.onEntered, h = o.onExit, b = o.onExiting, I = o.onExited, C = o.nodeRef, _ = Ee(
    o, ["children", "in", "mountOnEnter", "unmountOnExit", "appear", "enter", "exit", "timeout", "addEndListener", "onEnter", "onEntering", "\
onEntered", "onExit", "onExiting", "onExited", "nodeRef"]);
    return (
      // allows for nested Transitions
      /* @__PURE__ */ l.createElement(Ba.Provider, {
        value: null
      }, typeof s == "function" ? s(i, _) : l.cloneElement(l.Children.only(s), _))
    );
  }, "render"), t;
}(l.Component);
ct.contextType = Ba;
ct.propTypes = {};
function hr() {
}
a(hr, "noop");
ct.defaultProps = {
  in: !1,
  mountOnEnter: !1,
  unmountOnExit: !1,
  appear: !1,
  enter: !0,
  exit: !0,
  onEnter: hr,
  onEntering: hr,
  onEntered: hr,
  onExit: hr,
  onExiting: hr,
  onExited: hr
};
ct.UNMOUNTED = jr;
ct.EXITED = Rt;
ct.ENTERING = zt;
ct.ENTERED = gr;
ct.EXITING = Ra;
var $t = ct;

// src/manager/components/upgrade/UpgradeBlock.tsx
var To = /* @__PURE__ */ a(({ onNavigateToWhatsNew: e }) => {
  let t = me(), [r, n] = J("npm");
  return /* @__PURE__ */ l.createElement(uS, null, /* @__PURE__ */ l.createElement("strong", null, "You are on Storybook ", t.getCurrentVersion().
  version), /* @__PURE__ */ l.createElement("p", null, "Run the following script to check for updates and upgrade to the latest version."), /* @__PURE__ */ l.
  createElement(cS, null, /* @__PURE__ */ l.createElement(xm, { active: r === "npm", onClick: () => n("npm") }, "npm"), /* @__PURE__ */ l.createElement(
  xm, { active: r === "pnpm", onClick: () => n("pnpm") }, "pnpm")), /* @__PURE__ */ l.createElement(pS, null, r === "npm" ? "npx storybook@l\
atest upgrade" : "pnpm dlx storybook@latest upgrade"), e && // eslint-disable-next-line jsx-a11y/anchor-is-valid
  /* @__PURE__ */ l.createElement(Me, { onClick: e }, "See what's new in Storybook"));
}, "UpgradeBlock"), uS = S.div(({ theme: e }) => ({
  border: "1px solid",
  borderRadius: 5,
  padding: 20,
  marginTop: 0,
  borderColor: e.appBorderColor,
  fontSize: e.typography.size.s2,
  width: "100%",
  [st]: {
    maxWidth: 400
  }
})), cS = S.div({
  display: "flex",
  gap: 2
}), pS = S.pre(({ theme: e }) => ({
  background: e.base === "light" ? "rgba(0, 0, 0, 0.05)" : e.appBorderColor,
  fontSize: e.typography.size.s2 - 1,
  margin: "4px 0 16px"
})), xm = S.button(({ theme: e, active: t }) => ({
  all: "unset",
  alignItems: "center",
  gap: 10,
  color: e.color.defaultText,
  fontSize: e.typography.size.s2 - 1,
  borderBottom: "2px solid transparent",
  borderBottomColor: t ? e.color.secondary : "none",
  padding: "0 10px 5px",
  marginBottom: "5px",
  cursor: "pointer"
}));

// src/manager/components/mobile/about/MobileAbout.tsx
var Cm = /* @__PURE__ */ a(() => {
  let { isMobileAboutOpen: e, setMobileAboutOpen: t } = we(), r = Q(null);
  return /* @__PURE__ */ l.createElement(
    $t,
    {
      nodeRef: r,
      in: e,
      timeout: 300,
      appear: !0,
      mountOnEnter: !0,
      unmountOnExit: !0
    },
    (n) => /* @__PURE__ */ l.createElement(dS, { ref: r, state: n, transitionDuration: 300 }, /* @__PURE__ */ l.createElement(hS, { onClick: () => t(
    !1), title: "Close about section" }, /* @__PURE__ */ l.createElement(il, null), "Back"), /* @__PURE__ */ l.createElement(fS, null, /* @__PURE__ */ l.
    createElement(wm, { href: "https://github.com/storybookjs/storybook", target: "_blank" }, /* @__PURE__ */ l.createElement(Em, null, /* @__PURE__ */ l.
    createElement(gn, null), /* @__PURE__ */ l.createElement("span", null, "Github")), /* @__PURE__ */ l.createElement(_t, { width: 12 })), /* @__PURE__ */ l.
    createElement(
      wm,
      {
        href: "https://storybook.js.org/docs/react/get-started/install/",
        target: "_blank"
      },
      /* @__PURE__ */ l.createElement(Em, null, /* @__PURE__ */ l.createElement(bl, null), /* @__PURE__ */ l.createElement("span", null, "Do\
cumentation")),
      /* @__PURE__ */ l.createElement(_t, { width: 12 })
    )), /* @__PURE__ */ l.createElement(To, null), /* @__PURE__ */ l.createElement(mS, null, "Open source software maintained by", " ", /* @__PURE__ */ l.
    createElement(Me, { href: "https://chromatic.com", target: "_blank" }, "Chromatic"), " ", "and the", " ", /* @__PURE__ */ l.createElement(
    Me, { href: "https://github.com/storybookjs/storybook/graphs/contributors" }, "Storybook Community")))
  );
}, "MobileAbout"), dS = S.div(
  ({ theme: e, state: t, transitionDuration: r }) => ({
    position: "absolute",
    width: "100%",
    height: "100%",
    top: 0,
    left: 0,
    zIndex: 11,
    transition: `all ${r}ms ease-in-out`,
    overflow: "scroll",
    padding: "25px 10px 10px",
    color: e.color.defaultText,
    background: e.background.content,
    opacity: `${(() => {
      switch (t) {
        case "entering":
        case "entered":
          return 1;
        case "exiting":
        case "exited":
          return 0;
        default:
          return 0;
      }
    })()}`,
    transform: `${(() => {
      switch (t) {
        case "entering":
        case "entered":
          return "translateX(0)";
        case "exiting":
        case "exited":
          return "translateX(20px)";
        default:
          return "translateX(0)";
      }
    })()}`
  })
), fS = S.div({
  marginTop: 20,
  marginBottom: 20
}), wm = S.a(({ theme: e }) => ({
  all: "unset",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  fontSize: e.typography.size.s2 - 1,
  height: 52,
  borderBottom: `1px solid ${e.appBorderColor}`,
  cursor: "pointer",
  padding: "0 10px",
  "&:last-child": {
    borderBottom: "none"
  }
})), Em = S.div(({ theme: e }) => ({
  display: "flex",
  alignItems: "center",
  fontSize: e.typography.size.s2 - 1,
  height: 40,
  gap: 5
})), mS = S.div(({ theme: e }) => ({
  fontSize: e.typography.size.s2 - 1,
  marginTop: 30
})), hS = S.button(({ theme: e }) => ({
  all: "unset",
  display: "flex",
  alignItems: "center",
  gap: 10,
  color: "currentColor",
  fontSize: e.typography.size.s2 - 1,
  padding: "0 10px"
}));

// src/manager/components/mobile/navigation/MobileMenuDrawer.tsx
var _m = /* @__PURE__ */ a(({ children: e }) => {
  let t = Q(null), r = Q(null), n = Q(null), { isMobileMenuOpen: i, setMobileMenuOpen: o, isMobileAboutOpen: s, setMobileAboutOpen: u } = we();
  return /* @__PURE__ */ l.createElement(l.Fragment, null, /* @__PURE__ */ l.createElement(
    $t,
    {
      nodeRef: t,
      in: i,
      timeout: 300,
      mountOnEnter: !0,
      unmountOnExit: !0,
      onExited: () => u(!1)
    },
    (c) => /* @__PURE__ */ l.createElement(gS, { ref: t, state: c }, /* @__PURE__ */ l.createElement(
      $t,
      {
        nodeRef: r,
        in: !s,
        timeout: 300
      },
      (p) => /* @__PURE__ */ l.createElement(yS, { ref: r, state: p }, e)
    ), /* @__PURE__ */ l.createElement(Cm, null))
  ), /* @__PURE__ */ l.createElement(
    $t,
    {
      nodeRef: n,
      in: i,
      timeout: 300,
      mountOnEnter: !0,
      unmountOnExit: !0
    },
    (c) => /* @__PURE__ */ l.createElement(
      vS,
      {
        ref: n,
        state: c,
        onClick: () => o(!1),
        "aria-label": "Close navigation menu"
      }
    )
  ));
}, "MobileMenuDrawer"), gS = S.div(({ theme: e, state: t }) => ({
  position: "fixed",
  boxSizing: "border-box",
  width: "100%",
  background: e.background.content,
  height: "80%",
  bottom: 0,
  left: 0,
  zIndex: 11,
  borderRadius: "10px 10px 0 0",
  transition: `all ${300}ms ease-in-out`,
  overflow: "hidden",
  transform: `${t === "entering" || t === "entered" ? "translateY(0)" : t === "exiting" || t === "exited" ? "translateY(100%)" : "translateY\
(0)"}`
})), yS = S.div(({ theme: e, state: t }) => ({
  position: "absolute",
  width: "100%",
  height: "100%",
  top: 0,
  left: 0,
  zIndex: 1,
  transition: `all ${300}ms ease-in-out`,
  overflow: "hidden",
  opacity: `${t === "entered" || t === "entering" ? 1 : t === "exiting" || t === "exited" ? 0 : 1}`,
  transform: `${(() => {
    switch (t) {
      case "entering":
      case "entered":
        return "translateX(0)";
      case "exiting":
      case "exited":
        return "translateX(-20px)";
      default:
        return "translateX(0)";
    }
  })()}`
})), vS = S.div(({ state: e }) => ({
  position: "fixed",
  boxSizing: "border-box",
  background: "rgba(0, 0, 0, 0.5)",
  top: 0,
  bottom: 0,
  right: 0,
  left: 0,
  zIndex: 10,
  transition: `all ${300}ms ease-in-out`,
  cursor: "pointer",
  opacity: `${(() => {
    switch (e) {
      case "entering":
      case "entered":
        return 1;
      case "exiting":
      case "exited":
        return 0;
      default:
        return 0;
    }
  })()}`,
  "&:hover": {
    background: "rgba(0, 0, 0, 0.6)"
  }
}));

// src/manager/components/mobile/navigation/MobileAddonsDrawer.tsx
var bS = S.div(({ theme: e }) => ({
  position: "relative",
  boxSizing: "border-box",
  width: "100%",
  background: e.background.content,
  height: "42vh",
  zIndex: 11,
  overflow: "hidden"
})), Tm = /* @__PURE__ */ a(({ children: e }) => /* @__PURE__ */ l.createElement(bS, null, e), "MobileAddonsDrawer");

// src/manager/components/mobile/navigation/MobileNavigation.tsx
var IS = /* @__PURE__ */ a(() => {
  let { index: e } = et(), t = me(), r = t.getCurrentStoryData();
  if (!r) return "";
  let n = r.renderLabel?.(r, t) || r.name, i = e[r.id];
  for (; "parent" in i && i.parent && e[i.parent] && n.length < 24; )
    i = e[i.parent], n = `${i.renderLabel?.(i, t) || i.name}/${n}`;
  return n;
}, "useFullStoryName"), km = /* @__PURE__ */ a(({ menu: e, panel: t, showPanel: r }) => {
  let { isMobileMenuOpen: n, isMobilePanelOpen: i, setMobileMenuOpen: o, setMobilePanelOpen: s } = we(), u = IS();
  return /* @__PURE__ */ l.createElement(SS, null, /* @__PURE__ */ l.createElement(_m, null, e), i ? /* @__PURE__ */ l.createElement(Tm, null,
  t) : /* @__PURE__ */ l.createElement(xS, { className: "sb-bar" }, /* @__PURE__ */ l.createElement(wS, { onClick: () => o(!n), title: "Open\
 navigation menu" }, /* @__PURE__ */ l.createElement(vn, null), /* @__PURE__ */ l.createElement(ES, null, u)), r && /* @__PURE__ */ l.createElement(
  ie, { onClick: () => s(!0), title: "Open addon panel" }, /* @__PURE__ */ l.createElement(al, null))));
}, "MobileNavigation"), SS = S.div(({ theme: e }) => ({
  bottom: 0,
  left: 0,
  width: "100%",
  zIndex: 10,
  background: e.barBg,
  borderTop: `1px solid ${e.appBorderColor}`
})), xS = S.div({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",
  height: 40,
  padding: "0 6px"
}), wS = S.button(({ theme: e }) => ({
  all: "unset",
  display: "flex",
  alignItems: "center",
  gap: 10,
  color: e.barTextColor,
  fontSize: `${e.typography.size.s2 - 1}px`,
  padding: "0 7px",
  fontWeight: e.typography.weight.bold,
  WebkitLineClamp: 1,
  "> svg": {
    width: 14,
    height: 14,
    flexShrink: 0
  }
})), ES = S.p({
  display: "-webkit-box",
  WebkitLineClamp: 1,
  WebkitBoxOrient: "vertical",
  overflow: "hidden"
});

// src/manager/components/notifications/NotificationItem.tsx
var CS = Sr({
  "0%": {
    opacity: 0,
    transform: "translateY(30px)"
  },
  "100%": {
    opacity: 1,
    transform: "translateY(0)"
  }
}), _S = Sr({
  "0%": {
    width: "0%"
  },
  "100%": {
    width: "100%"
  }
}), Om = S.div(
  ({ theme: e }) => ({
    position: "relative",
    display: "flex",
    padding: 15,
    width: 280,
    borderRadius: 4,
    alignItems: "center",
    animation: `${CS} 500ms`,
    background: e.base === "light" ? "hsla(203, 50%, 20%, .97)" : "hsla(203, 30%, 95%, .97)",
    boxShadow: "0 2px 5px 0 rgba(0,0,0,0.05), 0 5px 15px 0 rgba(0,0,0,0.1)",
    color: e.color.inverseText,
    textDecoration: "none",
    overflow: "hidden"
  }),
  ({ duration: e, theme: t }) => e && {
    "&::after": {
      content: '""',
      display: "block",
      position: "absolute",
      bottom: 0,
      left: 0,
      height: 3,
      background: t.color.secondary,
      animation: `${_S} ${e}ms linear forwards reverse`
    }
  }
), Pm = S(Om)(() => ({
  cursor: "pointer",
  border: "none",
  outline: "none",
  textAlign: "left",
  transition: "all 150ms ease-out",
  transform: "translate3d(0, 0, 0)",
  "&:hover": {
    transform: "translate3d(0, -3px, 0)",
    boxShadow: "0 1px 3px 0 rgba(30,167,253,0.5), 0 2px 5px 0 rgba(0,0,0,0.05), 0 5px 15px 0 rgba(0,0,0,0.1)"
  },
  "&:active": {
    transform: "translate3d(0, 0, 0)",
    boxShadow: "0 1px 3px 0 rgba(30,167,253,0.5), 0 2px 5px 0 rgba(0,0,0,0.05), 0 5px 15px 0 rgba(0,0,0,0.1)"
  },
  "&:focus": {
    boxShadow: "rgba(2,156,253,1) 0 0 0 1px inset, 0 1px 3px 0 rgba(30,167,253,0.5), 0 2px 5px 0 rgba(0,0,0,0.05), 0 5px 15px 0 rgba(0,0,0,0\
.1)"
  }
})), TS = Pm.withComponent("div"), kS = Pm.withComponent(Xr), OS = S.div(() => ({
  display: "flex",
  marginRight: 10,
  alignItems: "center",
  svg: {
    width: 16,
    height: 16
  }
})), PS = S.div(({ theme: e }) => ({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  color: e.base === "dark" ? e.color.mediumdark : e.color.mediumlight
})), AS = S.div(({ theme: e, hasIcon: t }) => ({
  height: "100%",
  width: t ? 205 : 230,
  alignItems: "center",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  fontSize: e.typography.size.s1,
  lineHeight: "16px",
  fontWeight: e.typography.weight.bold
})), MS = S.div(({ theme: e }) => ({
  color: ge(0.25, e.color.inverseText),
  fontSize: e.typography.size.s1 - 1,
  lineHeight: "14px",
  marginTop: 2
})), za = /* @__PURE__ */ a(({
  icon: e,
  content: { headline: t, subHeadline: r }
}) => {
  let n = Re(), i = n.base === "dark" ? n.color.mediumdark : n.color.mediumlight;
  return /* @__PURE__ */ l.createElement(l.Fragment, null, !e || /* @__PURE__ */ l.createElement(OS, null, l.isValidElement(e) ? e : typeof e ==
  "object" && "name" in e && /* @__PURE__ */ l.createElement(Gs, { icon: e.name, color: e.color || i })), /* @__PURE__ */ l.createElement(PS,
  null, /* @__PURE__ */ l.createElement(AS, { title: t, hasIcon: !!e }, t), r && /* @__PURE__ */ l.createElement(MS, null, r)));
}, "ItemContent"), DS = S(ie)(({ theme: e }) => ({
  alignSelf: "center",
  marginTop: 0,
  color: e.base === "light" ? "rgba(255,255,255,0.7)" : " #999999"
})), $a = /* @__PURE__ */ a(({ onDismiss: e }) => /* @__PURE__ */ l.createElement(
  DS,
  {
    title: "Dismiss notification",
    onClick: (t) => {
      t.preventDefault(), t.stopPropagation(), e();
    }
  },
  /* @__PURE__ */ l.createElement(hn, { size: 12 })
), "DismissNotificationItem"), y2 = S.div({
  height: 48
}), LS = /* @__PURE__ */ a(({
  notification: { content: e, duration: t, link: r, onClear: n, onClick: i, id: o, icon: s },
  onDismissNotification: u
}) => {
  let c = A(() => {
    u(o), n && n({ dismissed: !1, timeout: !0 });
  }, [u, n]), p = Q(null);
  K(() => {
    if (t)
      return p.current = setTimeout(c, t), () => clearTimeout(p.current);
  }, [t, c]);
  let d = A(() => {
    clearTimeout(p.current), u(o), n && n({ dismissed: !0, timeout: !1 });
  }, [u, n]);
  return r ? /* @__PURE__ */ l.createElement(kS, { to: r, duration: t }, /* @__PURE__ */ l.createElement(za, { icon: s, content: e }), /* @__PURE__ */ l.
  createElement($a, { onDismiss: d })) : i ? /* @__PURE__ */ l.createElement(TS, { duration: t, onClick: () => i({ onDismiss: d }) }, /* @__PURE__ */ l.
  createElement(za, { icon: s, content: e }), /* @__PURE__ */ l.createElement($a, { onDismiss: d })) : /* @__PURE__ */ l.createElement(Om, {
  duration: t }, /* @__PURE__ */ l.createElement(za, { icon: s, content: e }), /* @__PURE__ */ l.createElement($a, { onDismiss: d }));
}, "NotificationItem"), Am = LS;

// src/manager/components/notifications/NotificationList.tsx
var Mm = /* @__PURE__ */ a(({
  notifications: e,
  clearNotification: t
}) => /* @__PURE__ */ l.createElement(NS, null, e && e.map((r) => /* @__PURE__ */ l.createElement(
  Am,
  {
    key: r.id,
    onDismissNotification: (n) => t(n),
    notification: r
  }
))), "NotificationList"), NS = S.div({
  zIndex: 200,
  position: "fixed",
  left: 20,
  bottom: 60,
  [st]: {
    bottom: 20
  },
  "> * + *": {
    marginTop: 10
  },
  "&:empty": {
    display: "none"
  }
});

// src/manager/container/Notifications.tsx
var FS = /* @__PURE__ */ a(({ state: e, api: t }) => ({
  notifications: e.notifications,
  clearNotification: t.clearNotification
}), "mapper"), Dm = /* @__PURE__ */ a((e) => /* @__PURE__ */ l.createElement(he, { filter: FS }, (t) => /* @__PURE__ */ l.createElement(Mm, {
...e, ...t })), "Notifications");

// src/manager/components/layout/Layout.tsx
var HS = 100, Lm = /* @__PURE__ */ a((e, t) => e.navSize === t.navSize && e.bottomPanelHeight === t.bottomPanelHeight && e.rightPanelWidth ===
t.rightPanelWidth && e.panelPosition === t.panelPosition, "layoutStateIsEqual"), BS = /* @__PURE__ */ a(({
  managerLayoutState: e,
  setManagerLayoutState: t,
  isDesktop: r,
  hasTab: n
}) => {
  let i = l.useRef(e), [o, s] = J({
    ...e,
    isDragging: !1
  });
  K(() => {
    o.isDragging || // don't interrupt user's drag
    Lm(e, i.current) || (i.current = e, s((m) => ({ ...m, ...e })));
  }, [o.isDragging, e, s]), Vt(() => {
    if (o.isDragging || // wait with syncing managerLayoutState until user is done dragging
    Lm(e, o))
      return;
    let m = {
      navSize: o.navSize,
      bottomPanelHeight: o.bottomPanelHeight,
      rightPanelWidth: o.rightPanelWidth
    };
    i.current = {
      ...i.current,
      ...m
    }, t(m);
  }, [o, t]);
  let u = e.viewMode !== "story" && e.viewMode !== "docs", c = e.viewMode === "story" && !n, { panelResizerRef: p, sidebarResizerRef: d } = Im(
  {
    setState: s,
    isPanelShown: c,
    isDesktop: r
  }), { navSize: g, rightPanelWidth: f, bottomPanelHeight: y } = o.isDragging ? o : e;
  return {
    navSize: g,
    rightPanelWidth: f,
    bottomPanelHeight: y,
    panelPosition: e.panelPosition,
    panelResizerRef: p,
    sidebarResizerRef: d,
    showPages: u,
    showPanel: c,
    isDragging: o.isDragging
  };
}, "useLayoutSyncingState"), Fm = /* @__PURE__ */ a(({ managerLayoutState: e, setManagerLayoutState: t, hasTab: r, ...n }) => {
  let { isDesktop: i, isMobile: o } = we(), {
    navSize: s,
    rightPanelWidth: u,
    bottomPanelHeight: c,
    panelPosition: p,
    panelResizerRef: d,
    sidebarResizerRef: g,
    showPages: f,
    showPanel: y,
    isDragging: m
  } = BS({ managerLayoutState: e, setManagerLayoutState: t, isDesktop: i, hasTab: r });
  return /* @__PURE__ */ l.createElement(
    RS,
    {
      navSize: s,
      rightPanelWidth: u,
      bottomPanelHeight: c,
      panelPosition: e.panelPosition,
      isDragging: m,
      viewMode: e.viewMode,
      showPanel: y
    },
    /* @__PURE__ */ l.createElement(Dm, null),
    f && /* @__PURE__ */ l.createElement(WS, null, n.slotPages),
    /* @__PURE__ */ l.createElement(gs, { path: /(^\/story|docs|onboarding\/|^\/$)/, startsWith: !1 }, ({ match: v }) => /* @__PURE__ */ l.createElement(
    $S, { shown: !!v }, n.slotMain)),
    i && /* @__PURE__ */ l.createElement(l.Fragment, null, /* @__PURE__ */ l.createElement(zS, null, /* @__PURE__ */ l.createElement(Nm, { ref: g }),
    n.slotSidebar), y && /* @__PURE__ */ l.createElement(VS, { position: p }, /* @__PURE__ */ l.createElement(
      Nm,
      {
        orientation: p === "bottom" ? "horizontal" : "vertical",
        position: p === "bottom" ? "left" : "right",
        ref: d
      }
    ), n.slotPanel)),
    o && /* @__PURE__ */ l.createElement(km, { menu: n.slotSidebar, panel: n.slotPanel, showPanel: y })
  );
}, "Layout"), RS = S.div(
  ({ navSize: e, rightPanelWidth: t, bottomPanelHeight: r, viewMode: n, panelPosition: i, showPanel: o }) => ({
    width: "100%",
    height: ["100vh", "100dvh"],
    // This array is a special Emotion syntax to set a fallback if 100dvh is not supported
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    [st]: {
      display: "grid",
      gap: 0,
      gridTemplateColumns: `minmax(0, ${e}px) minmax(${HS}px, 1fr) minmax(0, ${t}px)`,
      gridTemplateRows: `1fr minmax(0, ${r}px)`,
      gridTemplateAreas: n === "docs" || !o ? `"sidebar content content"
                  "sidebar content content"` : i === "right" ? `"sidebar content panel"
                  "sidebar content panel"` : `"sidebar content content"
                "sidebar panel   panel"`
    }
  })
), zS = S.div(({ theme: e }) => ({
  backgroundColor: e.background.app,
  gridArea: "sidebar",
  position: "relative",
  borderRight: `1px solid ${e.color.border}`
})), $S = S.div(({ theme: e, shown: t }) => ({
  flex: 1,
  position: "relative",
  backgroundColor: e.background.content,
  display: t ? "grid" : "none",
  // This is needed to make the content container fill the available space
  overflow: "auto",
  [st]: {
    flex: "auto",
    gridArea: "content"
  }
})), WS = S.div(({ theme: e }) => ({
  gridRowStart: "sidebar-start",
  gridRowEnd: "-1",
  gridColumnStart: "sidebar-end",
  gridColumnEnd: "-1",
  backgroundColor: e.background.content,
  zIndex: 1
})), VS = S.div(
  ({ theme: e, position: t }) => ({
    gridArea: "panel",
    position: "relative",
    backgroundColor: e.background.content,
    borderTop: t === "bottom" ? `1px solid ${e.color.border}` : void 0,
    borderLeft: t === "right" ? `1px solid ${e.color.border}` : void 0
  })
), Nm = S.div(
  ({ theme: e }) => ({
    position: "absolute",
    opacity: 0,
    transition: "opacity 0.2s ease-in-out",
    zIndex: 100,
    "&:after": {
      content: '""',
      display: "block",
      backgroundColor: e.color.secondary
    },
    "&:hover": {
      opacity: 1
    }
  }),
  ({ orientation: e = "vertical", position: t = "left" }) => e === "vertical" ? {
    width: t === "left" ? 10 : 13,
    height: "100%",
    top: 0,
    right: t === "left" ? "-7px" : void 0,
    left: t === "right" ? "-7px" : void 0,
    "&:after": {
      width: 1,
      height: "100%",
      marginLeft: t === "left" ? 3 : 6
    },
    "&:hover": {
      cursor: "col-resize"
    }
  } : {
    width: "100%",
    height: "13px",
    top: "-7px",
    left: 0,
    "&:after": {
      width: "100%",
      height: 1,
      marginTop: 6
    },
    "&:hover": {
      cursor: "row-resize"
    }
  }
);

// src/manager/App.tsx
var Hm = /* @__PURE__ */ a(({ managerLayoutState: e, setManagerLayoutState: t, pages: r, hasTab: n }) => {
  let { setMobileAboutOpen: i } = we();
  return /* @__PURE__ */ l.createElement(l.Fragment, null, /* @__PURE__ */ l.createElement(jt, { styles: vs }), /* @__PURE__ */ l.createElement(
    Fm,
    {
      hasTab: n,
      managerLayoutState: e,
      setManagerLayoutState: t,
      slotMain: /* @__PURE__ */ l.createElement(fm, { id: "main", withLoader: !0 }),
      slotSidebar: /* @__PURE__ */ l.createElement(Zp, { onMenuClick: () => i((o) => !o) }),
      slotPanel: /* @__PURE__ */ l.createElement(hm, null),
      slotPages: r.map(({ id: o, render: s }) => /* @__PURE__ */ l.createElement(s, { key: o }))
    }
  ));
}, "App");

// src/manager/settings/About.tsx
var KS = S.div({
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  marginTop: 40
}), jS = S.header({
  marginBottom: 32,
  alignItems: "center",
  display: "flex",
  "> svg": {
    height: 48,
    width: "auto",
    marginRight: 8
  }
}), US = S.div(({ theme: e }) => ({
  marginBottom: 24,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  color: e.base === "light" ? e.color.dark : e.color.lightest,
  fontWeight: e.typography.weight.regular,
  fontSize: e.typography.size.s2
})), qS = S.div({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  marginBottom: 24,
  marginTop: 24,
  gap: 16
}), Bm = S(Me)(({ theme: e }) => ({
  "&&": {
    fontWeight: e.typography.weight.bold,
    color: e.base === "light" ? e.color.dark : e.color.light
  },
  "&:hover": {
    color: e.base === "light" ? e.color.darkest : e.color.lightest
  }
})), Rm = /* @__PURE__ */ a(({ onNavigateToWhatsNew: e }) => /* @__PURE__ */ l.createElement(KS, null, /* @__PURE__ */ l.createElement(jS, null,
/* @__PURE__ */ l.createElement(ln, { alt: "Storybook" })), /* @__PURE__ */ l.createElement(To, { onNavigateToWhatsNew: e }), /* @__PURE__ */ l.
createElement(US, null, /* @__PURE__ */ l.createElement(qS, null, /* @__PURE__ */ l.createElement(xe, { asChild: !0 }, /* @__PURE__ */ l.createElement(
"a", { href: "https://github.com/storybookjs/storybook" }, /* @__PURE__ */ l.createElement(gn, null), "GitHub")), /* @__PURE__ */ l.createElement(
xe, { asChild: !0 }, /* @__PURE__ */ l.createElement("a", { href: "https://storybook.js.org/docs" }, /* @__PURE__ */ l.createElement(er, { style: {
display: "inline", marginRight: 5 } }), "Documentation"))), /* @__PURE__ */ l.createElement("div", null, "Open source software maintained by",
" ", /* @__PURE__ */ l.createElement(Bm, { href: "https://www.chromatic.com/" }, "Chromatic"), " and the", " ", /* @__PURE__ */ l.createElement(
Bm, { href: "https://github.com/storybookjs/storybook/graphs/contributors" }, "Storybook Community")))), "AboutScreen");

// src/manager/settings/AboutPage.tsx
var Va = class Va extends He {
  componentDidMount() {
    let { api: t, notificationId: r } = this.props;
    t.clearNotification(r);
  }
  render() {
    let { children: t } = this.props;
    return t;
  }
};
a(Va, "NotificationClearer");
var Wa = Va, zm = /* @__PURE__ */ a(() => {
  let e = me(), t = et(), r = A(() => {
    e.changeSettingsTab("whats-new");
  }, [e]);
  return /* @__PURE__ */ l.createElement(Wa, { api: e, notificationId: "update" }, /* @__PURE__ */ l.createElement(
    Rm,
    {
      onNavigateToWhatsNew: t.whatsNewData?.status === "SUCCESS" ? r : void 0
    }
  ));
}, "AboutPage");

// src/manager/settings/SettingsFooter.tsx
var GS = S.div(({ theme: e }) => ({
  display: "flex",
  paddingTop: 20,
  marginTop: 20,
  borderTop: `1px solid ${e.appBorderColor}`,
  fontWeight: e.typography.weight.bold,
  "& > * + *": {
    marginLeft: 20
  }
})), YS = /* @__PURE__ */ a((e) => /* @__PURE__ */ l.createElement(GS, { ...e }, /* @__PURE__ */ l.createElement(Me, { secondary: !0, href: "\
https://storybook.js.org", cancel: !1, target: "_blank" }, "Docs"), /* @__PURE__ */ l.createElement(Me, { secondary: !0, href: "https://gith\
ub.com/storybookjs/storybook", cancel: !1, target: "_blank" }, "GitHub"), /* @__PURE__ */ l.createElement(
  Me,
  {
    secondary: !0,
    href: "https://storybook.js.org/community#support",
    cancel: !1,
    target: "_blank"
  },
  "Support"
)), "SettingsFooter"), $m = YS;

// src/manager/settings/shortcuts.tsx
var QS = S.header(({ theme: e }) => ({
  marginBottom: 20,
  fontSize: e.typography.size.m3,
  fontWeight: e.typography.weight.bold,
  alignItems: "center",
  display: "flex"
})), Wm = S.div(({ theme: e }) => ({
  fontWeight: e.typography.weight.bold
})), XS = S.div({
  alignSelf: "flex-end",
  display: "grid",
  margin: "10px 0",
  gridTemplateColumns: "1fr 1fr 12px",
  "& > *:last-of-type": {
    gridColumn: "2 / 2",
    justifySelf: "flex-end",
    gridRow: "1"
  }
}), ZS = S.div(({ theme: e }) => ({
  padding: "6px 0",
  borderTop: `1px solid ${e.appBorderColor}`,
  display: "grid",
  gridTemplateColumns: "1fr 1fr 0px"
})), JS = S.div({
  display: "grid",
  gridTemplateColumns: "1fr",
  gridAutoRows: "minmax(auto, auto)",
  marginBottom: 20
}), ex = S.div({
  alignSelf: "center"
}), tx = S(on.Input)(
  ({ valid: e, theme: t }) => e === "error" ? {
    animation: `${t.animation.jiggle} 700ms ease-out`
  } : {},
  {
    display: "flex",
    width: 80,
    flexDirection: "column",
    justifySelf: "flex-end",
    paddingLeft: 4,
    paddingRight: 4,
    textAlign: "center"
  }
), rx = Sr`
0%,100% { opacity: 0; }
  50% { opacity: 1; }
`, nx = S(tt)(
  ({ valid: e, theme: t }) => e === "valid" ? {
    color: t.color.positive,
    animation: `${rx} 2s ease forwards`
  } : {
    opacity: 0
  },
  {
    alignSelf: "center",
    display: "flex",
    marginLeft: 10,
    height: 14,
    width: 14
  }
), ox = S.div(({ theme: e }) => ({
  fontSize: e.typography.size.s2,
  padding: "3rem 20px",
  maxWidth: 600,
  margin: "0 auto"
})), ix = {
  fullScreen: "Go full screen",
  togglePanel: "Toggle addons",
  panelPosition: "Toggle addons orientation",
  toggleNav: "Toggle sidebar",
  toolbar: "Toggle canvas toolbar",
  search: "Focus search",
  focusNav: "Focus sidebar",
  focusIframe: "Focus canvas",
  focusPanel: "Focus addons",
  prevComponent: "Previous component",
  nextComponent: "Next component",
  prevStory: "Previous story",
  nextStory: "Next story",
  shortcutsPage: "Go to shortcuts page",
  aboutPage: "Go to about page",
  collapseAll: "Collapse all items on sidebar",
  expandAll: "Expand all items on sidebar",
  remount: "Remount component"
}, ax = ["escape"];
function Ka(e) {
  return Object.entries(e).reduce(
    // @ts-expect-error (non strict)
    (t, [r, n]) => ax.includes(r) ? t : { ...t, [r]: { shortcut: n, error: !1 } },
    {}
  );
}
a(Ka, "toShortcutState");
var ja = class ja extends He {
  constructor(t) {
    super(t), this.state = {
      // @ts-expect-error (non strict)
      activeFeature: void 0,
      // @ts-expect-error (non strict)
      successField: void 0,
      // The initial shortcutKeys that come from props are the defaults/what was saved
      // As the user interacts with the page, the state stores the temporary, unsaved shortcuts
      // This object also includes the error attached to each shortcut
      // @ts-expect-error (non strict)
      shortcutKeys: Ka(t.shortcutKeys),
      addonsShortcutLabels: t.addonsShortcutLabels
    };
  }
  onKeyDown = /* @__PURE__ */ a((t) => {
    let { activeFeature: r, shortcutKeys: n } = this.state;
    if (t.key === "Backspace")
      return this.restoreDefault();
    let i = Qa(t);
    if (!i)
      return !1;
    let o = !!Object.entries(n).find(
      ([s, { shortcut: u }]) => s !== r && u && Xa(i, u)
    );
    return this.setState({
      shortcutKeys: { ...n, [r]: { shortcut: i, error: o } }
    });
  }, "onKeyDown");
  onFocus = /* @__PURE__ */ a((t) => () => {
    let { shortcutKeys: r } = this.state;
    this.setState({
      activeFeature: t,
      shortcutKeys: {
        ...r,
        [t]: { shortcut: null, error: !1 }
      }
    });
  }, "onFocus");
  onBlur = /* @__PURE__ */ a(async () => {
    let { shortcutKeys: t, activeFeature: r } = this.state;
    if (t[r]) {
      let { shortcut: n, error: i } = t[r];
      return !n || i ? this.restoreDefault() : this.saveShortcut();
    }
    return !1;
  }, "onBlur");
  saveShortcut = /* @__PURE__ */ a(async () => {
    let { activeFeature: t, shortcutKeys: r } = this.state, { setShortcut: n } = this.props;
    await n(t, r[t].shortcut), this.setState({ successField: t });
  }, "saveShortcut");
  restoreDefaults = /* @__PURE__ */ a(async () => {
    let { restoreAllDefaultShortcuts: t } = this.props, r = await t();
    return this.setState({ shortcutKeys: Ka(r) });
  }, "restoreDefaults");
  restoreDefault = /* @__PURE__ */ a(async () => {
    let { activeFeature: t, shortcutKeys: r } = this.state, { restoreDefaultShortcut: n } = this.props, i = await n(t);
    return this.setState({
      shortcutKeys: {
        ...r,
        ...Ka({ [t]: i })
      }
    });
  }, "restoreDefault");
  displaySuccessMessage = /* @__PURE__ */ a((t) => {
    let { successField: r, shortcutKeys: n } = this.state;
    return t === r && n[t].error === !1 ? "valid" : void 0;
  }, "displaySuccessMessage");
  displayError = /* @__PURE__ */ a((t) => {
    let { activeFeature: r, shortcutKeys: n } = this.state;
    return t === r && n[t].error === !0 ? "error" : void 0;
  }, "displayError");
  renderKeyInput = /* @__PURE__ */ a(() => {
    let { shortcutKeys: t, addonsShortcutLabels: r } = this.state;
    return Object.entries(t).map(([i, { shortcut: o }]) => /* @__PURE__ */ l.createElement(ZS, { key: i }, /* @__PURE__ */ l.createElement(ex,
    null, ix[i] || r[i]), /* @__PURE__ */ l.createElement(
      tx,
      {
        spellCheck: "false",
        valid: this.displayError(i),
        className: "modalInput",
        onBlur: this.onBlur,
        onFocus: this.onFocus(i),
        onKeyDown: this.onKeyDown,
        value: o ? Ye(o) : "",
        placeholder: "Type keys",
        readOnly: !0
      }
    ), /* @__PURE__ */ l.createElement(nx, { valid: this.displaySuccessMessage(i) })));
  }, "renderKeyInput");
  renderKeyForm = /* @__PURE__ */ a(() => /* @__PURE__ */ l.createElement(JS, null, /* @__PURE__ */ l.createElement(XS, null, /* @__PURE__ */ l.
  createElement(Wm, null, "Commands"), /* @__PURE__ */ l.createElement(Wm, null, "Shortcut")), this.renderKeyInput()), "renderKeyForm");
  render() {
    let t = this.renderKeyForm();
    return /* @__PURE__ */ l.createElement(ox, null, /* @__PURE__ */ l.createElement(QS, null, "Keyboard shortcuts"), t, /* @__PURE__ */ l.createElement(
      xe,
      {
        variant: "outline",
        size: "small",
        id: "restoreDefaultsHotkeys",
        onClick: this.restoreDefaults
      },
      "Restore defaults"
    ), /* @__PURE__ */ l.createElement($m, null));
  }
};
a(ja, "ShortcutsScreen");
var ko = ja;

// src/manager/settings/ShortcutsPage.tsx
var Vm = /* @__PURE__ */ a(() => /* @__PURE__ */ l.createElement(he, null, ({
  api: {
    getShortcutKeys: e,
    getAddonsShortcutLabels: t,
    setShortcut: r,
    restoreDefaultShortcut: n,
    restoreAllDefaultShortcuts: i
  }
}) => /* @__PURE__ */ l.createElement(
  ko,
  {
    shortcutKeys: e(),
    addonsShortcutLabels: t(),
    setShortcut: r,
    restoreDefaultShortcut: n,
    restoreAllDefaultShortcuts: i
  }
)), "ShortcutsPage");

// src/manager/settings/whats_new.tsx
var Km = S.div({
  top: "50%",
  position: "absolute",
  transform: "translateY(-50%)",
  width: "100%",
  textAlign: "center"
}), sx = S.div({
  position: "relative",
  height: "32px"
}), jm = S.div(({ theme: e }) => ({
  paddingTop: "12px",
  color: e.textMutedColor,
  maxWidth: "295px",
  margin: "0 auto",
  fontSize: `${e.typography.size.s1}px`,
  lineHeight: "16px"
})), lx = S.div(({ theme: e }) => ({
  position: "absolute",
  width: "100%",
  bottom: "40px",
  background: e.background.bar,
  fontSize: "13px",
  borderTop: "1px solid",
  borderColor: e.appBorderColor,
  padding: "8px 12px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between"
})), ux = /* @__PURE__ */ a(({
  isNotificationsEnabled: e,
  onToggleNotifications: t,
  onCopyLink: r
}) => {
  let n = Re(), [i, o] = J("Copy Link"), s = /* @__PURE__ */ a(() => {
    r(), o("Copied!"), setTimeout(() => o("Copy Link"), 4e3);
  }, "copyLink");
  return /* @__PURE__ */ l.createElement(lx, null, /* @__PURE__ */ l.createElement("div", { style: { display: "flex", alignItems: "center", gap: 10 } },
  /* @__PURE__ */ l.createElement(ml, { color: n.color.mediumdark }), /* @__PURE__ */ l.createElement("div", null, "Share this with your tea\
m."), /* @__PURE__ */ l.createElement(xe, { onClick: s, size: "small", variant: "ghost" }, i)), e ? /* @__PURE__ */ l.createElement(xe, { size: "\
small", variant: "ghost", onClick: t }, /* @__PURE__ */ l.createElement(dl, null), "Hide notifications") : /* @__PURE__ */ l.createElement(xe,
  { size: "small", variant: "ghost", onClick: t }, /* @__PURE__ */ l.createElement(fl, null), "Show notifications"));
}, "WhatsNewFooter"), cx = S.iframe(
  {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    border: 0,
    margin: 0,
    padding: 0,
    width: "100%",
    height: "calc(100% - 80px)",
    background: "white"
  },
  ({ isLoaded: e }) => ({ visibility: e ? "visible" : "hidden" })
), px = S((e) => /* @__PURE__ */ l.createElement(fn, { ...e }))(({ theme: e }) => ({
  color: e.textMutedColor,
  width: 32,
  height: 32,
  margin: "0 auto"
})), dx = /* @__PURE__ */ a(() => /* @__PURE__ */ l.createElement(Km, null, /* @__PURE__ */ l.createElement(sx, null, /* @__PURE__ */ l.createElement(
an, null)), /* @__PURE__ */ l.createElement(jm, null, "Loading...")), "WhatsNewLoader"), fx = /* @__PURE__ */ a(() => /* @__PURE__ */ l.createElement(
Km, null, /* @__PURE__ */ l.createElement(px, null), /* @__PURE__ */ l.createElement(jm, null, "The page couldn't be loaded. Check your inte\
rnet connection and try again.")), "MaxWaitTimeMessaging"), mx = /* @__PURE__ */ a(({
  didHitMaxWaitTime: e,
  isLoaded: t,
  onLoad: r,
  url: n,
  onCopyLink: i,
  onToggleNotifications: o,
  isNotificationsEnabled: s
}) => /* @__PURE__ */ l.createElement(_e, null, !t && !e && /* @__PURE__ */ l.createElement(dx, null), e ? /* @__PURE__ */ l.createElement(fx,
null) : /* @__PURE__ */ l.createElement(l.Fragment, null, /* @__PURE__ */ l.createElement(cx, { isLoaded: t, onLoad: r, src: n, title: "What\
's new?" }), /* @__PURE__ */ l.createElement(
  ux,
  {
    isNotificationsEnabled: s,
    onToggleNotifications: o,
    onCopyLink: i
  }
))), "PureWhatsNewScreen"), hx = 1e4, Um = /* @__PURE__ */ a(() => {
  let e = me(), t = et(), { whatsNewData: r } = t, [n, i] = J(!1), [o, s] = J(!1);
  if (K(() => {
    let c = setTimeout(() => !n && s(!0), hx);
    return () => clearTimeout(c);
  }, [n]), r?.status !== "SUCCESS") return null;
  let u = !r.disableWhatsNewNotifications;
  return /* @__PURE__ */ l.createElement(
    mx,
    {
      didHitMaxWaitTime: o,
      isLoaded: n,
      onLoad: () => {
        e.whatsNewHasBeenRead(), i(!0);
      },
      url: r.url,
      isNotificationsEnabled: u,
      onCopyLink: () => {
        navigator.clipboard?.writeText(r.blogUrl ?? r.url);
      },
      onToggleNotifications: () => {
        u ? ae.confirm("All update notifications will no longer be shown. Are you sure?") && e.toggleWhatsNewNotifications() : e.toggleWhatsNewNotifications();
      }
    }
  );
}, "WhatsNewScreen");

// src/manager/settings/whats_new_page.tsx
var qm = /* @__PURE__ */ a(() => /* @__PURE__ */ l.createElement(Um, null), "WhatsNewPage");

// src/manager/settings/index.tsx
var { document: Gm } = ae, gx = S.div(({ theme: e }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  height: 40,
  boxShadow: `${e.appBorderColor}  0 -1px 0 0 inset`,
  background: e.barBg,
  paddingRight: 8
})), Ua = l.memo(/* @__PURE__ */ a(function({
  changeTab: t,
  id: r,
  title: n
}) {
  return /* @__PURE__ */ l.createElement(Zr, null, ({ path: i }) => {
    let o = i.includes(`settings/${r}`);
    return /* @__PURE__ */ l.createElement(
      cn,
      {
        id: `tabbutton-${r}`,
        className: ["tabbutton"].concat(o ? ["tabbutton-active"] : []).join(" "),
        type: "button",
        key: "id",
        active: o,
        onClick: () => t(r),
        role: "tab"
      },
      n
    );
  });
}, "TabBarButton")), yx = S(sn)(({ theme: e }) => ({
  background: e.background.content
})), vx = /* @__PURE__ */ a(({ changeTab: e, onClose: t, enableShortcuts: r = !0, enableWhatsNew: n }) => (l.useEffect(() => {
  let i = /* @__PURE__ */ a((o) => {
    !r || o.repeat || ht(!1, o) && Ke("Escape", o) && (o.preventDefault(), t());
  }, "handleEscape");
  return Gm.addEventListener("keydown", i), () => Gm.removeEventListener("keydown", i);
}, [r, t]), /* @__PURE__ */ l.createElement(_e, null, /* @__PURE__ */ l.createElement(gx, { className: "sb-bar" }, /* @__PURE__ */ l.createElement(
un, { role: "tablist" }, /* @__PURE__ */ l.createElement(Ua, { id: "about", title: "About", changeTab: e }), n && /* @__PURE__ */ l.createElement(
Ua, { id: "whats-new", title: "What's new?", changeTab: e }), /* @__PURE__ */ l.createElement(Ua, { id: "shortcuts", title: "Keyboard shortc\
uts", changeTab: e })), /* @__PURE__ */ l.createElement(
  ie,
  {
    onClick: (i) => (i.preventDefault(), t()),
    title: "Close settings page"
  },
  /* @__PURE__ */ l.createElement(Qe, null)
)), /* @__PURE__ */ l.createElement(yx, { vertical: !0, horizontal: !1 }, /* @__PURE__ */ l.createElement(Ir, { path: "about" }, /* @__PURE__ */ l.
createElement(zm, { key: "about" })), /* @__PURE__ */ l.createElement(Ir, { path: "whats-new" }, /* @__PURE__ */ l.createElement(qm, { key: "\
whats-new" })), /* @__PURE__ */ l.createElement(Ir, { path: "shortcuts" }, /* @__PURE__ */ l.createElement(Vm, { key: "shortcuts" }))))), "P\
ages"), bx = /* @__PURE__ */ a(() => {
  let e = me(), t = et(), r = /* @__PURE__ */ a((n) => e.changeSettingsTab(n), "changeTab");
  return /* @__PURE__ */ l.createElement(
    vx,
    {
      enableWhatsNew: t.whatsNewData?.status === "SUCCESS",
      enableShortcuts: t.ui.enableShortcuts,
      changeTab: r,
      onClose: e.closeSettings
    }
  );
}, "SettingsPages"), Ym = {
  id: "settings",
  url: "/settings/",
  title: "Settings",
  type: ve.experimental_PAGE,
  render: /* @__PURE__ */ a(() => /* @__PURE__ */ l.createElement(Ir, { path: "/settings/", startsWith: !0 }, /* @__PURE__ */ l.createElement(
  bx, null)), "render")
};

// src/manager/index.tsx
Lo.displayName = "ThemeProvider";
ft.displayName = "HelmetProvider";
var Ix = /* @__PURE__ */ a(({ provider: e }) => /* @__PURE__ */ l.createElement(ft, { key: "helmet.Provider" }, /* @__PURE__ */ l.createElement(
hs, { key: "location.provider" }, /* @__PURE__ */ l.createElement(Sx, { provider: e }))), "Root"), Sx = /* @__PURE__ */ a(({ provider: e }) => {
  let t = ys();
  return /* @__PURE__ */ l.createElement(Zr, { key: "location.consumer" }, (r) => /* @__PURE__ */ l.createElement(
    Ya,
    {
      key: "manager",
      provider: e,
      ...r,
      navigate: t,
      docsOptions: ae?.DOCS_OPTIONS || {}
    },
    (n) => {
      let { state: i, api: o } = n, s = A(
        (c) => {
          o.setSizes(c);
        },
        [o]
      ), u = j(
        () => [Ym, ...Object.values(o.getElements(ve.experimental_PAGE))],
        [Object.keys(o.getElements(ve.experimental_PAGE)).join()]
      );
      return /* @__PURE__ */ l.createElement(Lo, { key: "theme.provider", theme: bs(i.theme) }, /* @__PURE__ */ l.createElement(kl, null, /* @__PURE__ */ l.
      createElement(
        Hm,
        {
          key: "app",
          pages: u,
          managerLayoutState: {
            ...i.layout,
            viewMode: i.viewMode
          },
          hasTab: !!o.getQueryParam("tab"),
          setManagerLayoutState: s
        }
      )));
    }
  ));
}, "Main");
function Qm(e, t) {
  if (!(t instanceof wt))
    throw new Ss();
  us(e).render(/* @__PURE__ */ l.createElement(Ix, { key: "root", provider: t }));
}
a(Qm, "renderStorybookUI");

// src/manager/runtime.ts
var Ga = class Ga extends wt {
  addons;
  channel;
  constructor() {
    super();
    let t = Za({ page: "manager" });
    Ge.setChannel(t), t.emit(ts), this.addons = Ge, this.channel = t, ae.__STORYBOOK_ADDONS_CHANNEL__ = t;
  }
  getElements(t) {
    return this.addons.getElements(t);
  }
  getConfig() {
    return this.addons.getConfig();
  }
  handleAPI(t) {
    this.addons.loadAddons(t);
  }
};
a(Ga, "ReactProvider");
var qa = Ga, { document: xx } = ae, wx = xx.getElementById("root");
setTimeout(() => {
  Qm(wx, new qa());
}, 0);
