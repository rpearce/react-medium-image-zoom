var Sm = Object.create;
var kt = Object.defineProperty;
var bm = Object.getOwnPropertyDescriptor;
var vm = Object.getOwnPropertyNames;
var Tm = Object.getPrototypeOf, Em = Object.prototype.hasOwnProperty;
var n = (r, e) => kt(r, "name", { value: e, configurable: !0 }), Dr = /* @__PURE__ */ ((r) => typeof require < "u" ? require : typeof Proxy <
"u" ? new Proxy(r, {
  get: (e, t) => (typeof require < "u" ? require : e)[t]
}) : r)(function(r) {
  if (typeof require < "u") return require.apply(this, arguments);
  throw Error('Dynamic require of "' + r + '" is not supported');
});
var d = (r, e) => () => (e || r((e = { exports: {} }).exports, e), e.exports), Pe = (r, e) => {
  for (var t in e)
    kt(r, t, { get: e[t], enumerable: !0 });
}, Rm = (r, e, t, o) => {
  if (e && typeof e == "object" || typeof e == "function")
    for (let a of vm(e))
      !Em.call(r, a) && a !== t && kt(r, a, { get: () => e[a], enumerable: !(o = bm(e, a)) || o.enumerable });
  return r;
};
var W = (r, e, t) => (t = r != null ? Sm(Tm(r)) : {}, Rm(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  e || !r || !r.__esModule ? kt(t, "default", { value: r, enumerable: !0 }) : t,
  r
));

// ../node_modules/memoizerific/memoizerific.js
var Ht = d((ps, _n) => {
  (function(r) {
    if (typeof ps == "object" && typeof _n < "u")
      _n.exports = r();
    else if (typeof define == "function" && define.amd)
      define([], r);
    else {
      var e;
      typeof window < "u" ? e = window : typeof global < "u" ? e = global : typeof self < "u" ? e = self : e = this, e.memoizerific = r();
    }
  })(function() {
    var r, e, t;
    return (/* @__PURE__ */ n(function o(a, i, l) {
      function c(p, y) {
        if (!i[p]) {
          if (!a[p]) {
            var h = typeof Dr == "function" && Dr;
            if (!y && h) return h(p, !0);
            if (s) return s(p, !0);
            var g = new Error("Cannot find module '" + p + "'");
            throw g.code = "MODULE_NOT_FOUND", g;
          }
          var m = i[p] = { exports: {} };
          a[p][0].call(m.exports, function(b) {
            var S = a[p][1][b];
            return c(S || b);
          }, m, m.exports, o, a, i, l);
        }
        return i[p].exports;
      }
      n(c, "s");
      for (var s = typeof Dr == "function" && Dr, u = 0; u < l.length; u++) c(l[u]);
      return c;
    }, "e"))({ 1: [function(o, a, i) {
      a.exports = function(l) {
        if (typeof Map != "function" || l) {
          var c = o("./similar");
          return new c();
        } else
          return /* @__PURE__ */ new Map();
      };
    }, { "./similar": 2 }], 2: [function(o, a, i) {
      function l() {
        return this.list = [], this.lastItem = void 0, this.size = 0, this;
      }
      n(l, "Similar"), l.prototype.get = function(c) {
        var s;
        if (this.lastItem && this.isEqual(this.lastItem.key, c))
          return this.lastItem.val;
        if (s = this.indexOf(c), s >= 0)
          return this.lastItem = this.list[s], this.list[s].val;
      }, l.prototype.set = function(c, s) {
        var u;
        return this.lastItem && this.isEqual(this.lastItem.key, c) ? (this.lastItem.val = s, this) : (u = this.indexOf(c), u >= 0 ? (this.lastItem =
        this.list[u], this.list[u].val = s, this) : (this.lastItem = { key: c, val: s }, this.list.push(this.lastItem), this.size++, this));
      }, l.prototype.delete = function(c) {
        var s;
        if (this.lastItem && this.isEqual(this.lastItem.key, c) && (this.lastItem = void 0), s = this.indexOf(c), s >= 0)
          return this.size--, this.list.splice(s, 1)[0];
      }, l.prototype.has = function(c) {
        var s;
        return this.lastItem && this.isEqual(this.lastItem.key, c) ? !0 : (s = this.indexOf(c), s >= 0 ? (this.lastItem = this.list[s], !0) :
        !1);
      }, l.prototype.forEach = function(c, s) {
        var u;
        for (u = 0; u < this.size; u++)
          c.call(s || this, this.list[u].val, this.list[u].key, this);
      }, l.prototype.indexOf = function(c) {
        var s;
        for (s = 0; s < this.size; s++)
          if (this.isEqual(this.list[s].key, c))
            return s;
        return -1;
      }, l.prototype.isEqual = function(c, s) {
        return c === s || c !== c && s !== s;
      }, a.exports = l;
    }, {}], 3: [function(o, a, i) {
      var l = o("map-or-similar");
      a.exports = function(p) {
        var y = new l(!1), h = [];
        return function(g) {
          var m = /* @__PURE__ */ n(function() {
            var b = y, S, T, v = arguments.length - 1, E = Array(v + 1), x = !0, A;
            if ((m.numArgs || m.numArgs === 0) && m.numArgs !== v + 1)
              throw new Error("Memoizerific functions should always be called with the same number of arguments");
            for (A = 0; A < v; A++) {
              if (E[A] = {
                cacheItem: b,
                arg: arguments[A]
              }, b.has(arguments[A])) {
                b = b.get(arguments[A]);
                continue;
              }
              x = !1, S = new l(!1), b.set(arguments[A], S), b = S;
            }
            return x && (b.has(arguments[v]) ? T = b.get(arguments[v]) : x = !1), x || (T = g.apply(null, arguments), b.set(arguments[v], T)),
            p > 0 && (E[v] = {
              cacheItem: b,
              arg: arguments[v]
            }, x ? c(h, E) : h.push(E), h.length > p && s(h.shift())), m.wasMemoized = x, m.numArgs = v + 1, T;
          }, "memoizerific");
          return m.limit = p, m.wasMemoized = !1, m.cache = y, m.lru = h, m;
        };
      };
      function c(p, y) {
        var h = p.length, g = y.length, m, b, S;
        for (b = 0; b < h; b++) {
          for (m = !0, S = 0; S < g; S++)
            if (!u(p[b][S].arg, y[S].arg)) {
              m = !1;
              break;
            }
          if (m)
            break;
        }
        p.push(p.splice(b, 1)[0]);
      }
      n(c, "moveToMostRecentLru");
      function s(p) {
        var y = p.length, h = p[y - 1], g, m;
        for (h.cacheItem.delete(h.arg), m = y - 2; m >= 0 && (h = p[m], g = h.cacheItem.get(h.arg), !g || !g.size); m--)
          h.cacheItem.delete(h.arg);
      }
      n(s, "removeCachedResult");
      function u(p, y) {
        return p === y || p !== p && y !== y;
      }
      n(u, "isEqual");
    }, { "map-or-similar": 1 }] }, {}, [3])(3);
  });
});

// ../node_modules/lodash/_freeGlobal.js
var ma = d((mD, Ws) => {
  var Kb = typeof global == "object" && global && global.Object === Object && global;
  Ws.exports = Kb;
});

// ../node_modules/lodash/_root.js
var ie = d((gD, zs) => {
  var Xb = ma(), Jb = typeof self == "object" && self && self.Object === Object && self, Qb = Xb || Jb || Function("return this")();
  zs.exports = Qb;
});

// ../node_modules/lodash/_Symbol.js
var ar = d((SD, Ys) => {
  var Zb = ie(), ev = Zb.Symbol;
  Ys.exports = ev;
});

// ../node_modules/lodash/_getRawTag.js
var Qs = d((bD, Js) => {
  var Ks = ar(), Xs = Object.prototype, rv = Xs.hasOwnProperty, tv = Xs.toString, ot = Ks ? Ks.toStringTag : void 0;
  function ov(r) {
    var e = rv.call(r, ot), t = r[ot];
    try {
      r[ot] = void 0;
      var o = !0;
    } catch {
    }
    var a = tv.call(r);
    return o && (e ? r[ot] = t : delete r[ot]), a;
  }
  n(ov, "getRawTag");
  Js.exports = ov;
});

// ../node_modules/lodash/_objectToString.js
var el = d((TD, Zs) => {
  var nv = Object.prototype, av = nv.toString;
  function iv(r) {
    return av.call(r);
  }
  n(iv, "objectToString");
  Zs.exports = iv;
});

// ../node_modules/lodash/_baseGetTag.js
var Ie = d((RD, ol) => {
  var rl = ar(), sv = Qs(), lv = el(), cv = "[object Null]", uv = "[object Undefined]", tl = rl ? rl.toStringTag : void 0;
  function pv(r) {
    return r == null ? r === void 0 ? uv : cv : tl && tl in Object(r) ? sv(r) : lv(r);
  }
  n(pv, "baseGetTag");
  ol.exports = pv;
});

// ../node_modules/lodash/isObject.js
var ir = d((wD, nl) => {
  function dv(r) {
    var e = typeof r;
    return r != null && (e == "object" || e == "function");
  }
  n(dv, "isObject");
  nl.exports = dv;
});

// ../node_modules/lodash/isFunction.js
var ga = d((_D, al) => {
  var fv = Ie(), yv = ir(), hv = "[object AsyncFunction]", mv = "[object Function]", gv = "[object GeneratorFunction]", Sv = "[object Proxy]";
  function bv(r) {
    if (!yv(r))
      return !1;
    var e = fv(r);
    return e == mv || e == gv || e == hv || e == Sv;
  }
  n(bv, "isFunction");
  al.exports = bv;
});

// ../node_modules/lodash/_coreJsData.js
var sl = d((OD, il) => {
  var vv = ie(), Tv = vv["__core-js_shared__"];
  il.exports = Tv;
});

// ../node_modules/lodash/_isMasked.js
var ul = d((CD, cl) => {
  var Sa = sl(), ll = function() {
    var r = /[^.]+$/.exec(Sa && Sa.keys && Sa.keys.IE_PROTO || "");
    return r ? "Symbol(src)_1." + r : "";
  }();
  function Ev(r) {
    return !!ll && ll in r;
  }
  n(Ev, "isMasked");
  cl.exports = Ev;
});

// ../node_modules/lodash/_toSource.js
var ba = d((FD, pl) => {
  var Rv = Function.prototype, Av = Rv.toString;
  function wv(r) {
    if (r != null) {
      try {
        return Av.call(r);
      } catch {
      }
      try {
        return r + "";
      } catch {
      }
    }
    return "";
  }
  n(wv, "toSource");
  pl.exports = wv;
});

// ../node_modules/lodash/_baseIsNative.js
var fl = d((ND, dl) => {
  var xv = ga(), _v = ul(), Pv = ir(), Ov = ba(), Cv = /[\\^$.*+?()[\]{}|]/g, Iv = /^\[object .+?Constructor\]$/, Fv = Function.prototype, Dv = Object.
  prototype, Nv = Fv.toString, qv = Dv.hasOwnProperty, Lv = RegExp(
    "^" + Nv.call(qv).replace(Cv, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
  );
  function Mv(r) {
    if (!Pv(r) || _v(r))
      return !1;
    var e = xv(r) ? Lv : Iv;
    return e.test(Ov(r));
  }
  n(Mv, "baseIsNative");
  dl.exports = Mv;
});

// ../node_modules/lodash/_getValue.js
var hl = d((LD, yl) => {
  function kv(r, e) {
    return r?.[e];
  }
  n(kv, "getValue");
  yl.exports = kv;
});

// ../node_modules/lodash/_getNative.js
var Te = d((kD, ml) => {
  var jv = fl(), Bv = hl();
  function Uv(r, e) {
    var t = Bv(r, e);
    return jv(t) ? t : void 0;
  }
  n(Uv, "getNative");
  ml.exports = Uv;
});

// ../node_modules/lodash/_defineProperty.js
var va = d((BD, gl) => {
  var Gv = Te(), Hv = function() {
    try {
      var r = Gv(Object, "defineProperty");
      return r({}, "", {}), r;
    } catch {
    }
  }();
  gl.exports = Hv;
});

// ../node_modules/lodash/_baseAssignValue.js
var Ta = d((UD, bl) => {
  var Sl = va();
  function Vv(r, e, t) {
    e == "__proto__" && Sl ? Sl(r, e, {
      configurable: !0,
      enumerable: !0,
      value: t,
      writable: !0
    }) : r[e] = t;
  }
  n(Vv, "baseAssignValue");
  bl.exports = Vv;
});

// ../node_modules/lodash/_createBaseFor.js
var Tl = d((HD, vl) => {
  function $v(r) {
    return function(e, t, o) {
      for (var a = -1, i = Object(e), l = o(e), c = l.length; c--; ) {
        var s = l[r ? c : ++a];
        if (t(i[s], s, i) === !1)
          break;
      }
      return e;
    };
  }
  n($v, "createBaseFor");
  vl.exports = $v;
});

// ../node_modules/lodash/_baseFor.js
var Rl = d(($D, El) => {
  var Wv = Tl(), zv = Wv();
  El.exports = zv;
});

// ../node_modules/lodash/_baseTimes.js
var wl = d((WD, Al) => {
  function Yv(r, e) {
    for (var t = -1, o = Array(r); ++t < r; )
      o[t] = e(t);
    return o;
  }
  n(Yv, "baseTimes");
  Al.exports = Yv;
});

// ../node_modules/lodash/isObjectLike.js
var Fe = d((YD, xl) => {
  function Kv(r) {
    return r != null && typeof r == "object";
  }
  n(Kv, "isObjectLike");
  xl.exports = Kv;
});

// ../node_modules/lodash/_baseIsArguments.js
var Pl = d((XD, _l) => {
  var Xv = Ie(), Jv = Fe(), Qv = "[object Arguments]";
  function Zv(r) {
    return Jv(r) && Xv(r) == Qv;
  }
  n(Zv, "baseIsArguments");
  _l.exports = Zv;
});

// ../node_modules/lodash/isArguments.js
var Zt = d((QD, Il) => {
  var Ol = Pl(), eT = Fe(), Cl = Object.prototype, rT = Cl.hasOwnProperty, tT = Cl.propertyIsEnumerable, oT = Ol(/* @__PURE__ */ function() {
    return arguments;
  }()) ? Ol : function(r) {
    return eT(r) && rT.call(r, "callee") && !tT.call(r, "callee");
  };
  Il.exports = oT;
});

// ../node_modules/lodash/isArray.js
var se = d((ZD, Fl) => {
  var nT = Array.isArray;
  Fl.exports = nT;
});

// ../node_modules/lodash/stubFalse.js
var Nl = d((eN, Dl) => {
  function aT() {
    return !1;
  }
  n(aT, "stubFalse");
  Dl.exports = aT;
});

// ../node_modules/lodash/isBuffer.js
var Ea = d((nt, sr) => {
  var iT = ie(), sT = Nl(), Ml = typeof nt == "object" && nt && !nt.nodeType && nt, ql = Ml && typeof sr == "object" && sr && !sr.nodeType &&
  sr, lT = ql && ql.exports === Ml, Ll = lT ? iT.Buffer : void 0, cT = Ll ? Ll.isBuffer : void 0, uT = cT || sT;
  sr.exports = uT;
});

// ../node_modules/lodash/_isIndex.js
var eo = d((tN, kl) => {
  var pT = 9007199254740991, dT = /^(?:0|[1-9]\d*)$/;
  function fT(r, e) {
    var t = typeof r;
    return e = e ?? pT, !!e && (t == "number" || t != "symbol" && dT.test(r)) && r > -1 && r % 1 == 0 && r < e;
  }
  n(fT, "isIndex");
  kl.exports = fT;
});

// ../node_modules/lodash/isLength.js
var ro = d((nN, jl) => {
  var yT = 9007199254740991;
  function hT(r) {
    return typeof r == "number" && r > -1 && r % 1 == 0 && r <= yT;
  }
  n(hT, "isLength");
  jl.exports = hT;
});

// ../node_modules/lodash/_baseIsTypedArray.js
var Ul = d((iN, Bl) => {
  var mT = Ie(), gT = ro(), ST = Fe(), bT = "[object Arguments]", vT = "[object Array]", TT = "[object Boolean]", ET = "[object Date]", RT = "\
[object Error]", AT = "[object Function]", wT = "[object Map]", xT = "[object Number]", _T = "[object Object]", PT = "[object RegExp]", OT = "\
[object Set]", CT = "[object String]", IT = "[object WeakMap]", FT = "[object ArrayBuffer]", DT = "[object DataView]", NT = "[object Float32\
Array]", qT = "[object Float64Array]", LT = "[object Int8Array]", MT = "[object Int16Array]", kT = "[object Int32Array]", jT = "[object Uint\
8Array]", BT = "[object Uint8ClampedArray]", UT = "[object Uint16Array]", GT = "[object Uint32Array]", M = {};
  M[NT] = M[qT] = M[LT] = M[MT] = M[kT] = M[jT] = M[BT] = M[UT] = M[GT] = !0;
  M[bT] = M[vT] = M[FT] = M[TT] = M[DT] = M[ET] = M[RT] = M[AT] = M[wT] = M[xT] = M[_T] = M[PT] = M[OT] = M[CT] = M[IT] = !1;
  function HT(r) {
    return ST(r) && gT(r.length) && !!M[mT(r)];
  }
  n(HT, "baseIsTypedArray");
  Bl.exports = HT;
});

// ../node_modules/lodash/_baseUnary.js
var Hl = d((lN, Gl) => {
  function VT(r) {
    return function(e) {
      return r(e);
    };
  }
  n(VT, "baseUnary");
  Gl.exports = VT;
});

// ../node_modules/lodash/_nodeUtil.js
var $l = d((at, lr) => {
  var $T = ma(), Vl = typeof at == "object" && at && !at.nodeType && at, it = Vl && typeof lr == "object" && lr && !lr.nodeType && lr, WT = it &&
  it.exports === Vl, Ra = WT && $T.process, zT = function() {
    try {
      var r = it && it.require && it.require("util").types;
      return r || Ra && Ra.binding && Ra.binding("util");
    } catch {
    }
  }();
  lr.exports = zT;
});

// ../node_modules/lodash/isTypedArray.js
var Aa = d((uN, Yl) => {
  var YT = Ul(), KT = Hl(), Wl = $l(), zl = Wl && Wl.isTypedArray, XT = zl ? KT(zl) : YT;
  Yl.exports = XT;
});

// ../node_modules/lodash/_arrayLikeKeys.js
var wa = d((pN, Kl) => {
  var JT = wl(), QT = Zt(), ZT = se(), eE = Ea(), rE = eo(), tE = Aa(), oE = Object.prototype, nE = oE.hasOwnProperty;
  function aE(r, e) {
    var t = ZT(r), o = !t && QT(r), a = !t && !o && eE(r), i = !t && !o && !a && tE(r), l = t || o || a || i, c = l ? JT(r.length, String) :
    [], s = c.length;
    for (var u in r)
      (e || nE.call(r, u)) && !(l && // Safari 9 has enumerable `arguments.length` in strict mode.
      (u == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
      a && (u == "offset" || u == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
      i && (u == "buffer" || u == "byteLength" || u == "byteOffset") || // Skip index properties.
      rE(u, s))) && c.push(u);
    return c;
  }
  n(aE, "arrayLikeKeys");
  Kl.exports = aE;
});

// ../node_modules/lodash/_isPrototype.js
var xa = d((fN, Xl) => {
  var iE = Object.prototype;
  function sE(r) {
    var e = r && r.constructor, t = typeof e == "function" && e.prototype || iE;
    return r === t;
  }
  n(sE, "isPrototype");
  Xl.exports = sE;
});

// ../node_modules/lodash/_overArg.js
var _a = d((hN, Jl) => {
  function lE(r, e) {
    return function(t) {
      return r(e(t));
    };
  }
  n(lE, "overArg");
  Jl.exports = lE;
});

// ../node_modules/lodash/_nativeKeys.js
var Zl = d((gN, Ql) => {
  var cE = _a(), uE = cE(Object.keys, Object);
  Ql.exports = uE;
});

// ../node_modules/lodash/_baseKeys.js
var rc = d((SN, ec) => {
  var pE = xa(), dE = Zl(), fE = Object.prototype, yE = fE.hasOwnProperty;
  function hE(r) {
    if (!pE(r))
      return dE(r);
    var e = [];
    for (var t in Object(r))
      yE.call(r, t) && t != "constructor" && e.push(t);
    return e;
  }
  n(hE, "baseKeys");
  ec.exports = hE;
});

// ../node_modules/lodash/isArrayLike.js
var Pa = d((vN, tc) => {
  var mE = ga(), gE = ro();
  function SE(r) {
    return r != null && gE(r.length) && !mE(r);
  }
  n(SE, "isArrayLike");
  tc.exports = SE;
});

// ../node_modules/lodash/keys.js
var to = d((EN, oc) => {
  var bE = wa(), vE = rc(), TE = Pa();
  function EE(r) {
    return TE(r) ? bE(r) : vE(r);
  }
  n(EE, "keys");
  oc.exports = EE;
});

// ../node_modules/lodash/_baseForOwn.js
var ac = d((AN, nc) => {
  var RE = Rl(), AE = to();
  function wE(r, e) {
    return r && RE(r, e, AE);
  }
  n(wE, "baseForOwn");
  nc.exports = wE;
});

// ../node_modules/lodash/_listCacheClear.js
var sc = d((xN, ic) => {
  function xE() {
    this.__data__ = [], this.size = 0;
  }
  n(xE, "listCacheClear");
  ic.exports = xE;
});

// ../node_modules/lodash/eq.js
var oo = d((PN, lc) => {
  function _E(r, e) {
    return r === e || r !== r && e !== e;
  }
  n(_E, "eq");
  lc.exports = _E;
});

// ../node_modules/lodash/_assocIndexOf.js
var st = d((CN, cc) => {
  var PE = oo();
  function OE(r, e) {
    for (var t = r.length; t--; )
      if (PE(r[t][0], e))
        return t;
    return -1;
  }
  n(OE, "assocIndexOf");
  cc.exports = OE;
});

// ../node_modules/lodash/_listCacheDelete.js
var pc = d((FN, uc) => {
  var CE = st(), IE = Array.prototype, FE = IE.splice;
  function DE(r) {
    var e = this.__data__, t = CE(e, r);
    if (t < 0)
      return !1;
    var o = e.length - 1;
    return t == o ? e.pop() : FE.call(e, t, 1), --this.size, !0;
  }
  n(DE, "listCacheDelete");
  uc.exports = DE;
});

// ../node_modules/lodash/_listCacheGet.js
var fc = d((NN, dc) => {
  var NE = st();
  function qE(r) {
    var e = this.__data__, t = NE(e, r);
    return t < 0 ? void 0 : e[t][1];
  }
  n(qE, "listCacheGet");
  dc.exports = qE;
});

// ../node_modules/lodash/_listCacheHas.js
var hc = d((LN, yc) => {
  var LE = st();
  function ME(r) {
    return LE(this.__data__, r) > -1;
  }
  n(ME, "listCacheHas");
  yc.exports = ME;
});

// ../node_modules/lodash/_listCacheSet.js
var gc = d((kN, mc) => {
  var kE = st();
  function jE(r, e) {
    var t = this.__data__, o = kE(t, r);
    return o < 0 ? (++this.size, t.push([r, e])) : t[o][1] = e, this;
  }
  n(jE, "listCacheSet");
  mc.exports = jE;
});

// ../node_modules/lodash/_ListCache.js
var lt = d((BN, Sc) => {
  var BE = sc(), UE = pc(), GE = fc(), HE = hc(), VE = gc();
  function cr(r) {
    var e = -1, t = r == null ? 0 : r.length;
    for (this.clear(); ++e < t; ) {
      var o = r[e];
      this.set(o[0], o[1]);
    }
  }
  n(cr, "ListCache");
  cr.prototype.clear = BE;
  cr.prototype.delete = UE;
  cr.prototype.get = GE;
  cr.prototype.has = HE;
  cr.prototype.set = VE;
  Sc.exports = cr;
});

// ../node_modules/lodash/_stackClear.js
var vc = d((GN, bc) => {
  var $E = lt();
  function WE() {
    this.__data__ = new $E(), this.size = 0;
  }
  n(WE, "stackClear");
  bc.exports = WE;
});

// ../node_modules/lodash/_stackDelete.js
var Ec = d((VN, Tc) => {
  function zE(r) {
    var e = this.__data__, t = e.delete(r);
    return this.size = e.size, t;
  }
  n(zE, "stackDelete");
  Tc.exports = zE;
});

// ../node_modules/lodash/_stackGet.js
var Ac = d((WN, Rc) => {
  function YE(r) {
    return this.__data__.get(r);
  }
  n(YE, "stackGet");
  Rc.exports = YE;
});

// ../node_modules/lodash/_stackHas.js
var xc = d((YN, wc) => {
  function KE(r) {
    return this.__data__.has(r);
  }
  n(KE, "stackHas");
  wc.exports = KE;
});

// ../node_modules/lodash/_Map.js
var no = d((XN, _c) => {
  var XE = Te(), JE = ie(), QE = XE(JE, "Map");
  _c.exports = QE;
});

// ../node_modules/lodash/_nativeCreate.js
var ct = d((JN, Pc) => {
  var ZE = Te(), eR = ZE(Object, "create");
  Pc.exports = eR;
});

// ../node_modules/lodash/_hashClear.js
var Ic = d((QN, Cc) => {
  var Oc = ct();
  function rR() {
    this.__data__ = Oc ? Oc(null) : {}, this.size = 0;
  }
  n(rR, "hashClear");
  Cc.exports = rR;
});

// ../node_modules/lodash/_hashDelete.js
var Dc = d((eq, Fc) => {
  function tR(r) {
    var e = this.has(r) && delete this.__data__[r];
    return this.size -= e ? 1 : 0, e;
  }
  n(tR, "hashDelete");
  Fc.exports = tR;
});

// ../node_modules/lodash/_hashGet.js
var qc = d((tq, Nc) => {
  var oR = ct(), nR = "__lodash_hash_undefined__", aR = Object.prototype, iR = aR.hasOwnProperty;
  function sR(r) {
    var e = this.__data__;
    if (oR) {
      var t = e[r];
      return t === nR ? void 0 : t;
    }
    return iR.call(e, r) ? e[r] : void 0;
  }
  n(sR, "hashGet");
  Nc.exports = sR;
});

// ../node_modules/lodash/_hashHas.js
var Mc = d((nq, Lc) => {
  var lR = ct(), cR = Object.prototype, uR = cR.hasOwnProperty;
  function pR(r) {
    var e = this.__data__;
    return lR ? e[r] !== void 0 : uR.call(e, r);
  }
  n(pR, "hashHas");
  Lc.exports = pR;
});

// ../node_modules/lodash/_hashSet.js
var jc = d((iq, kc) => {
  var dR = ct(), fR = "__lodash_hash_undefined__";
  function yR(r, e) {
    var t = this.__data__;
    return this.size += this.has(r) ? 0 : 1, t[r] = dR && e === void 0 ? fR : e, this;
  }
  n(yR, "hashSet");
  kc.exports = yR;
});

// ../node_modules/lodash/_Hash.js
var Uc = d((lq, Bc) => {
  var hR = Ic(), mR = Dc(), gR = qc(), SR = Mc(), bR = jc();
  function ur(r) {
    var e = -1, t = r == null ? 0 : r.length;
    for (this.clear(); ++e < t; ) {
      var o = r[e];
      this.set(o[0], o[1]);
    }
  }
  n(ur, "Hash");
  ur.prototype.clear = hR;
  ur.prototype.delete = mR;
  ur.prototype.get = gR;
  ur.prototype.has = SR;
  ur.prototype.set = bR;
  Bc.exports = ur;
});

// ../node_modules/lodash/_mapCacheClear.js
var Vc = d((uq, Hc) => {
  var Gc = Uc(), vR = lt(), TR = no();
  function ER() {
    this.size = 0, this.__data__ = {
      hash: new Gc(),
      map: new (TR || vR)(),
      string: new Gc()
    };
  }
  n(ER, "mapCacheClear");
  Hc.exports = ER;
});

// ../node_modules/lodash/_isKeyable.js
var Wc = d((dq, $c) => {
  function RR(r) {
    var e = typeof r;
    return e == "string" || e == "number" || e == "symbol" || e == "boolean" ? r !== "__proto__" : r === null;
  }
  n(RR, "isKeyable");
  $c.exports = RR;
});

// ../node_modules/lodash/_getMapData.js
var ut = d((yq, zc) => {
  var AR = Wc();
  function wR(r, e) {
    var t = r.__data__;
    return AR(e) ? t[typeof e == "string" ? "string" : "hash"] : t.map;
  }
  n(wR, "getMapData");
  zc.exports = wR;
});

// ../node_modules/lodash/_mapCacheDelete.js
var Kc = d((mq, Yc) => {
  var xR = ut();
  function _R(r) {
    var e = xR(this, r).delete(r);
    return this.size -= e ? 1 : 0, e;
  }
  n(_R, "mapCacheDelete");
  Yc.exports = _R;
});

// ../node_modules/lodash/_mapCacheGet.js
var Jc = d((Sq, Xc) => {
  var PR = ut();
  function OR(r) {
    return PR(this, r).get(r);
  }
  n(OR, "mapCacheGet");
  Xc.exports = OR;
});

// ../node_modules/lodash/_mapCacheHas.js
var Zc = d((vq, Qc) => {
  var CR = ut();
  function IR(r) {
    return CR(this, r).has(r);
  }
  n(IR, "mapCacheHas");
  Qc.exports = IR;
});

// ../node_modules/lodash/_mapCacheSet.js
var ru = d((Eq, eu) => {
  var FR = ut();
  function DR(r, e) {
    var t = FR(this, r), o = t.size;
    return t.set(r, e), this.size += t.size == o ? 0 : 1, this;
  }
  n(DR, "mapCacheSet");
  eu.exports = DR;
});

// ../node_modules/lodash/_MapCache.js
var ao = d((Aq, tu) => {
  var NR = Vc(), qR = Kc(), LR = Jc(), MR = Zc(), kR = ru();
  function pr(r) {
    var e = -1, t = r == null ? 0 : r.length;
    for (this.clear(); ++e < t; ) {
      var o = r[e];
      this.set(o[0], o[1]);
    }
  }
  n(pr, "MapCache");
  pr.prototype.clear = NR;
  pr.prototype.delete = qR;
  pr.prototype.get = LR;
  pr.prototype.has = MR;
  pr.prototype.set = kR;
  tu.exports = pr;
});

// ../node_modules/lodash/_stackSet.js
var nu = d((xq, ou) => {
  var jR = lt(), BR = no(), UR = ao(), GR = 200;
  function HR(r, e) {
    var t = this.__data__;
    if (t instanceof jR) {
      var o = t.__data__;
      if (!BR || o.length < GR - 1)
        return o.push([r, e]), this.size = ++t.size, this;
      t = this.__data__ = new UR(o);
    }
    return t.set(r, e), this.size = t.size, this;
  }
  n(HR, "stackSet");
  ou.exports = HR;
});

// ../node_modules/lodash/_Stack.js
var Oa = d((Pq, au) => {
  var VR = lt(), $R = vc(), WR = Ec(), zR = Ac(), YR = xc(), KR = nu();
  function dr(r) {
    var e = this.__data__ = new VR(r);
    this.size = e.size;
  }
  n(dr, "Stack");
  dr.prototype.clear = $R;
  dr.prototype.delete = WR;
  dr.prototype.get = zR;
  dr.prototype.has = YR;
  dr.prototype.set = KR;
  au.exports = dr;
});

// ../node_modules/lodash/_setCacheAdd.js
var su = d((Cq, iu) => {
  var XR = "__lodash_hash_undefined__";
  function JR(r) {
    return this.__data__.set(r, XR), this;
  }
  n(JR, "setCacheAdd");
  iu.exports = JR;
});

// ../node_modules/lodash/_setCacheHas.js
var cu = d((Fq, lu) => {
  function QR(r) {
    return this.__data__.has(r);
  }
  n(QR, "setCacheHas");
  lu.exports = QR;
});

// ../node_modules/lodash/_SetCache.js
var pu = d((Nq, uu) => {
  var ZR = ao(), eA = su(), rA = cu();
  function io(r) {
    var e = -1, t = r == null ? 0 : r.length;
    for (this.__data__ = new ZR(); ++e < t; )
      this.add(r[e]);
  }
  n(io, "SetCache");
  io.prototype.add = io.prototype.push = eA;
  io.prototype.has = rA;
  uu.exports = io;
});

// ../node_modules/lodash/_arraySome.js
var fu = d((Lq, du) => {
  function tA(r, e) {
    for (var t = -1, o = r == null ? 0 : r.length; ++t < o; )
      if (e(r[t], t, r))
        return !0;
    return !1;
  }
  n(tA, "arraySome");
  du.exports = tA;
});

// ../node_modules/lodash/_cacheHas.js
var hu = d((kq, yu) => {
  function oA(r, e) {
    return r.has(e);
  }
  n(oA, "cacheHas");
  yu.exports = oA;
});

// ../node_modules/lodash/_equalArrays.js
var Ca = d((Bq, mu) => {
  var nA = pu(), aA = fu(), iA = hu(), sA = 1, lA = 2;
  function cA(r, e, t, o, a, i) {
    var l = t & sA, c = r.length, s = e.length;
    if (c != s && !(l && s > c))
      return !1;
    var u = i.get(r), p = i.get(e);
    if (u && p)
      return u == e && p == r;
    var y = -1, h = !0, g = t & lA ? new nA() : void 0;
    for (i.set(r, e), i.set(e, r); ++y < c; ) {
      var m = r[y], b = e[y];
      if (o)
        var S = l ? o(b, m, y, e, r, i) : o(m, b, y, r, e, i);
      if (S !== void 0) {
        if (S)
          continue;
        h = !1;
        break;
      }
      if (g) {
        if (!aA(e, function(T, v) {
          if (!iA(g, v) && (m === T || a(m, T, t, o, i)))
            return g.push(v);
        })) {
          h = !1;
          break;
        }
      } else if (!(m === b || a(m, b, t, o, i))) {
        h = !1;
        break;
      }
    }
    return i.delete(r), i.delete(e), h;
  }
  n(cA, "equalArrays");
  mu.exports = cA;
});

// ../node_modules/lodash/_Uint8Array.js
var Su = d((Gq, gu) => {
  var uA = ie(), pA = uA.Uint8Array;
  gu.exports = pA;
});

// ../node_modules/lodash/_mapToArray.js
var vu = d((Hq, bu) => {
  function dA(r) {
    var e = -1, t = Array(r.size);
    return r.forEach(function(o, a) {
      t[++e] = [a, o];
    }), t;
  }
  n(dA, "mapToArray");
  bu.exports = dA;
});

// ../node_modules/lodash/_setToArray.js
var Eu = d(($q, Tu) => {
  function fA(r) {
    var e = -1, t = Array(r.size);
    return r.forEach(function(o) {
      t[++e] = o;
    }), t;
  }
  n(fA, "setToArray");
  Tu.exports = fA;
});

// ../node_modules/lodash/_equalByTag.js
var _u = d((zq, xu) => {
  var Ru = ar(), Au = Su(), yA = oo(), hA = Ca(), mA = vu(), gA = Eu(), SA = 1, bA = 2, vA = "[object Boolean]", TA = "[object Date]", EA = "\
[object Error]", RA = "[object Map]", AA = "[object Number]", wA = "[object RegExp]", xA = "[object Set]", _A = "[object String]", PA = "[ob\
ject Symbol]", OA = "[object ArrayBuffer]", CA = "[object DataView]", wu = Ru ? Ru.prototype : void 0, Ia = wu ? wu.valueOf : void 0;
  function IA(r, e, t, o, a, i, l) {
    switch (t) {
      case CA:
        if (r.byteLength != e.byteLength || r.byteOffset != e.byteOffset)
          return !1;
        r = r.buffer, e = e.buffer;
      case OA:
        return !(r.byteLength != e.byteLength || !i(new Au(r), new Au(e)));
      case vA:
      case TA:
      case AA:
        return yA(+r, +e);
      case EA:
        return r.name == e.name && r.message == e.message;
      case wA:
      case _A:
        return r == e + "";
      case RA:
        var c = mA;
      case xA:
        var s = o & SA;
        if (c || (c = gA), r.size != e.size && !s)
          return !1;
        var u = l.get(r);
        if (u)
          return u == e;
        o |= bA, l.set(r, e);
        var p = hA(c(r), c(e), o, a, i, l);
        return l.delete(r), p;
      case PA:
        if (Ia)
          return Ia.call(r) == Ia.call(e);
    }
    return !1;
  }
  n(IA, "equalByTag");
  xu.exports = IA;
});

// ../node_modules/lodash/_arrayPush.js
var so = d((Kq, Pu) => {
  function FA(r, e) {
    for (var t = -1, o = e.length, a = r.length; ++t < o; )
      r[a + t] = e[t];
    return r;
  }
  n(FA, "arrayPush");
  Pu.exports = FA;
});

// ../node_modules/lodash/_baseGetAllKeys.js
var Fa = d((Jq, Ou) => {
  var DA = so(), NA = se();
  function qA(r, e, t) {
    var o = e(r);
    return NA(r) ? o : DA(o, t(r));
  }
  n(qA, "baseGetAllKeys");
  Ou.exports = qA;
});

// ../node_modules/lodash/_arrayFilter.js
var Iu = d((Zq, Cu) => {
  function LA(r, e) {
    for (var t = -1, o = r == null ? 0 : r.length, a = 0, i = []; ++t < o; ) {
      var l = r[t];
      e(l, t, r) && (i[a++] = l);
    }
    return i;
  }
  n(LA, "arrayFilter");
  Cu.exports = LA;
});

// ../node_modules/lodash/stubArray.js
var Da = d((r0, Fu) => {
  function MA() {
    return [];
  }
  n(MA, "stubArray");
  Fu.exports = MA;
});

// ../node_modules/lodash/_getSymbols.js
var Na = d((o0, Nu) => {
  var kA = Iu(), jA = Da(), BA = Object.prototype, UA = BA.propertyIsEnumerable, Du = Object.getOwnPropertySymbols, GA = Du ? function(r) {
    return r == null ? [] : (r = Object(r), kA(Du(r), function(e) {
      return UA.call(r, e);
    }));
  } : jA;
  Nu.exports = GA;
});

// ../node_modules/lodash/_getAllKeys.js
var Lu = d((n0, qu) => {
  var HA = Fa(), VA = Na(), $A = to();
  function WA(r) {
    return HA(r, $A, VA);
  }
  n(WA, "getAllKeys");
  qu.exports = WA;
});

// ../node_modules/lodash/_equalObjects.js
var ju = d((i0, ku) => {
  var Mu = Lu(), zA = 1, YA = Object.prototype, KA = YA.hasOwnProperty;
  function XA(r, e, t, o, a, i) {
    var l = t & zA, c = Mu(r), s = c.length, u = Mu(e), p = u.length;
    if (s != p && !l)
      return !1;
    for (var y = s; y--; ) {
      var h = c[y];
      if (!(l ? h in e : KA.call(e, h)))
        return !1;
    }
    var g = i.get(r), m = i.get(e);
    if (g && m)
      return g == e && m == r;
    var b = !0;
    i.set(r, e), i.set(e, r);
    for (var S = l; ++y < s; ) {
      h = c[y];
      var T = r[h], v = e[h];
      if (o)
        var E = l ? o(v, T, h, e, r, i) : o(T, v, h, r, e, i);
      if (!(E === void 0 ? T === v || a(T, v, t, o, i) : E)) {
        b = !1;
        break;
      }
      S || (S = h == "constructor");
    }
    if (b && !S) {
      var x = r.constructor, A = e.constructor;
      x != A && "constructor" in r && "constructor" in e && !(typeof x == "function" && x instanceof x && typeof A == "function" && A instanceof
      A) && (b = !1);
    }
    return i.delete(r), i.delete(e), b;
  }
  n(XA, "equalObjects");
  ku.exports = XA;
});

// ../node_modules/lodash/_DataView.js
var Uu = d((l0, Bu) => {
  var JA = Te(), QA = ie(), ZA = JA(QA, "DataView");
  Bu.exports = ZA;
});

// ../node_modules/lodash/_Promise.js
var Hu = d((c0, Gu) => {
  var ew = Te(), rw = ie(), tw = ew(rw, "Promise");
  Gu.exports = tw;
});

// ../node_modules/lodash/_Set.js
var $u = d((u0, Vu) => {
  var ow = Te(), nw = ie(), aw = ow(nw, "Set");
  Vu.exports = aw;
});

// ../node_modules/lodash/_WeakMap.js
var zu = d((p0, Wu) => {
  var iw = Te(), sw = ie(), lw = iw(sw, "WeakMap");
  Wu.exports = lw;
});

// ../node_modules/lodash/_getTag.js
var rp = d((d0, ep) => {
  var qa = Uu(), La = no(), Ma = Hu(), ka = $u(), ja = zu(), Zu = Ie(), fr = ba(), Yu = "[object Map]", cw = "[object Object]", Ku = "[objec\
t Promise]", Xu = "[object Set]", Ju = "[object WeakMap]", Qu = "[object DataView]", uw = fr(qa), pw = fr(La), dw = fr(Ma), fw = fr(ka), yw = fr(
  ja), De = Zu;
  (qa && De(new qa(new ArrayBuffer(1))) != Qu || La && De(new La()) != Yu || Ma && De(Ma.resolve()) != Ku || ka && De(new ka()) != Xu || ja &&
  De(new ja()) != Ju) && (De = /* @__PURE__ */ n(function(r) {
    var e = Zu(r), t = e == cw ? r.constructor : void 0, o = t ? fr(t) : "";
    if (o)
      switch (o) {
        case uw:
          return Qu;
        case pw:
          return Yu;
        case dw:
          return Ku;
        case fw:
          return Xu;
        case yw:
          return Ju;
      }
    return e;
  }, "getTag"));
  ep.exports = De;
});

// ../node_modules/lodash/_baseIsEqualDeep.js
var cp = d((y0, lp) => {
  var Ba = Oa(), hw = Ca(), mw = _u(), gw = ju(), tp = rp(), op = se(), np = Ea(), Sw = Aa(), bw = 1, ap = "[object Arguments]", ip = "[obje\
ct Array]", lo = "[object Object]", vw = Object.prototype, sp = vw.hasOwnProperty;
  function Tw(r, e, t, o, a, i) {
    var l = op(r), c = op(e), s = l ? ip : tp(r), u = c ? ip : tp(e);
    s = s == ap ? lo : s, u = u == ap ? lo : u;
    var p = s == lo, y = u == lo, h = s == u;
    if (h && np(r)) {
      if (!np(e))
        return !1;
      l = !0, p = !1;
    }
    if (h && !p)
      return i || (i = new Ba()), l || Sw(r) ? hw(r, e, t, o, a, i) : mw(r, e, s, t, o, a, i);
    if (!(t & bw)) {
      var g = p && sp.call(r, "__wrapped__"), m = y && sp.call(e, "__wrapped__");
      if (g || m) {
        var b = g ? r.value() : r, S = m ? e.value() : e;
        return i || (i = new Ba()), a(b, S, t, o, i);
      }
    }
    return h ? (i || (i = new Ba()), gw(r, e, t, o, a, i)) : !1;
  }
  n(Tw, "baseIsEqualDeep");
  lp.exports = Tw;
});

// ../node_modules/lodash/_baseIsEqual.js
var Ua = d((m0, dp) => {
  var Ew = cp(), up = Fe();
  function pp(r, e, t, o, a) {
    return r === e ? !0 : r == null || e == null || !up(r) && !up(e) ? r !== r && e !== e : Ew(r, e, t, o, pp, a);
  }
  n(pp, "baseIsEqual");
  dp.exports = pp;
});

// ../node_modules/lodash/_baseIsMatch.js
var yp = d((S0, fp) => {
  var Rw = Oa(), Aw = Ua(), ww = 1, xw = 2;
  function _w(r, e, t, o) {
    var a = t.length, i = a, l = !o;
    if (r == null)
      return !i;
    for (r = Object(r); a--; ) {
      var c = t[a];
      if (l && c[2] ? c[1] !== r[c[0]] : !(c[0] in r))
        return !1;
    }
    for (; ++a < i; ) {
      c = t[a];
      var s = c[0], u = r[s], p = c[1];
      if (l && c[2]) {
        if (u === void 0 && !(s in r))
          return !1;
      } else {
        var y = new Rw();
        if (o)
          var h = o(u, p, s, r, e, y);
        if (!(h === void 0 ? Aw(p, u, ww | xw, o, y) : h))
          return !1;
      }
    }
    return !0;
  }
  n(_w, "baseIsMatch");
  fp.exports = _w;
});

// ../node_modules/lodash/_isStrictComparable.js
var Ga = d((v0, hp) => {
  var Pw = ir();
  function Ow(r) {
    return r === r && !Pw(r);
  }
  n(Ow, "isStrictComparable");
  hp.exports = Ow;
});

// ../node_modules/lodash/_getMatchData.js
var gp = d((E0, mp) => {
  var Cw = Ga(), Iw = to();
  function Fw(r) {
    for (var e = Iw(r), t = e.length; t--; ) {
      var o = e[t], a = r[o];
      e[t] = [o, a, Cw(a)];
    }
    return e;
  }
  n(Fw, "getMatchData");
  mp.exports = Fw;
});

// ../node_modules/lodash/_matchesStrictComparable.js
var Ha = d((A0, Sp) => {
  function Dw(r, e) {
    return function(t) {
      return t == null ? !1 : t[r] === e && (e !== void 0 || r in Object(t));
    };
  }
  n(Dw, "matchesStrictComparable");
  Sp.exports = Dw;
});

// ../node_modules/lodash/_baseMatches.js
var vp = d((x0, bp) => {
  var Nw = yp(), qw = gp(), Lw = Ha();
  function Mw(r) {
    var e = qw(r);
    return e.length == 1 && e[0][2] ? Lw(e[0][0], e[0][1]) : function(t) {
      return t === r || Nw(t, r, e);
    };
  }
  n(Mw, "baseMatches");
  bp.exports = Mw;
});

// ../node_modules/lodash/isSymbol.js
var co = d((P0, Tp) => {
  var kw = Ie(), jw = Fe(), Bw = "[object Symbol]";
  function Uw(r) {
    return typeof r == "symbol" || jw(r) && kw(r) == Bw;
  }
  n(Uw, "isSymbol");
  Tp.exports = Uw;
});

// ../node_modules/lodash/_isKey.js
var uo = d((C0, Ep) => {
  var Gw = se(), Hw = co(), Vw = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, $w = /^\w*$/;
  function Ww(r, e) {
    if (Gw(r))
      return !1;
    var t = typeof r;
    return t == "number" || t == "symbol" || t == "boolean" || r == null || Hw(r) ? !0 : $w.test(r) || !Vw.test(r) || e != null && r in Object(
    e);
  }
  n(Ww, "isKey");
  Ep.exports = Ww;
});

// ../node_modules/lodash/memoize.js
var wp = d((F0, Ap) => {
  var Rp = ao(), zw = "Expected a function";
  function Va(r, e) {
    if (typeof r != "function" || e != null && typeof e != "function")
      throw new TypeError(zw);
    var t = /* @__PURE__ */ n(function() {
      var o = arguments, a = e ? e.apply(this, o) : o[0], i = t.cache;
      if (i.has(a))
        return i.get(a);
      var l = r.apply(this, o);
      return t.cache = i.set(a, l) || i, l;
    }, "memoized");
    return t.cache = new (Va.Cache || Rp)(), t;
  }
  n(Va, "memoize");
  Va.Cache = Rp;
  Ap.exports = Va;
});

// ../node_modules/lodash/_memoizeCapped.js
var _p = d((N0, xp) => {
  var Yw = wp(), Kw = 500;
  function Xw(r) {
    var e = Yw(r, function(o) {
      return t.size === Kw && t.clear(), o;
    }), t = e.cache;
    return e;
  }
  n(Xw, "memoizeCapped");
  xp.exports = Xw;
});

// ../node_modules/lodash/_stringToPath.js
var Op = d((L0, Pp) => {
  var Jw = _p(), Qw = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, Zw = /\\(\\)?/g, ex = Jw(
  function(r) {
    var e = [];
    return r.charCodeAt(0) === 46 && e.push(""), r.replace(Qw, function(t, o, a, i) {
      e.push(a ? i.replace(Zw, "$1") : o || t);
    }), e;
  });
  Pp.exports = ex;
});

// ../node_modules/lodash/_arrayMap.js
var $a = d((M0, Cp) => {
  function rx(r, e) {
    for (var t = -1, o = r == null ? 0 : r.length, a = Array(o); ++t < o; )
      a[t] = e(r[t], t, r);
    return a;
  }
  n(rx, "arrayMap");
  Cp.exports = rx;
});

// ../node_modules/lodash/_baseToString.js
var Lp = d((j0, qp) => {
  var Ip = ar(), tx = $a(), ox = se(), nx = co(), ax = 1 / 0, Fp = Ip ? Ip.prototype : void 0, Dp = Fp ? Fp.toString : void 0;
  function Np(r) {
    if (typeof r == "string")
      return r;
    if (ox(r))
      return tx(r, Np) + "";
    if (nx(r))
      return Dp ? Dp.call(r) : "";
    var e = r + "";
    return e == "0" && 1 / r == -ax ? "-0" : e;
  }
  n(Np, "baseToString");
  qp.exports = Np;
});

// ../node_modules/lodash/toString.js
var kp = d((U0, Mp) => {
  var ix = Lp();
  function sx(r) {
    return r == null ? "" : ix(r);
  }
  n(sx, "toString");
  Mp.exports = sx;
});

// ../node_modules/lodash/_castPath.js
var pt = d((H0, jp) => {
  var lx = se(), cx = uo(), ux = Op(), px = kp();
  function dx(r, e) {
    return lx(r) ? r : cx(r, e) ? [r] : ux(px(r));
  }
  n(dx, "castPath");
  jp.exports = dx;
});

// ../node_modules/lodash/_toKey.js
var yr = d(($0, Bp) => {
  var fx = co(), yx = 1 / 0;
  function hx(r) {
    if (typeof r == "string" || fx(r))
      return r;
    var e = r + "";
    return e == "0" && 1 / r == -yx ? "-0" : e;
  }
  n(hx, "toKey");
  Bp.exports = hx;
});

// ../node_modules/lodash/_baseGet.js
var po = d((z0, Up) => {
  var mx = pt(), gx = yr();
  function Sx(r, e) {
    e = mx(e, r);
    for (var t = 0, o = e.length; r != null && t < o; )
      r = r[gx(e[t++])];
    return t && t == o ? r : void 0;
  }
  n(Sx, "baseGet");
  Up.exports = Sx;
});

// ../node_modules/lodash/get.js
var Hp = d((K0, Gp) => {
  var bx = po();
  function vx(r, e, t) {
    var o = r == null ? void 0 : bx(r, e);
    return o === void 0 ? t : o;
  }
  n(vx, "get");
  Gp.exports = vx;
});

// ../node_modules/lodash/_baseHasIn.js
var $p = d((J0, Vp) => {
  function Tx(r, e) {
    return r != null && e in Object(r);
  }
  n(Tx, "baseHasIn");
  Vp.exports = Tx;
});

// ../node_modules/lodash/_hasPath.js
var zp = d((Z0, Wp) => {
  var Ex = pt(), Rx = Zt(), Ax = se(), wx = eo(), xx = ro(), _x = yr();
  function Px(r, e, t) {
    e = Ex(e, r);
    for (var o = -1, a = e.length, i = !1; ++o < a; ) {
      var l = _x(e[o]);
      if (!(i = r != null && t(r, l)))
        break;
      r = r[l];
    }
    return i || ++o != a ? i : (a = r == null ? 0 : r.length, !!a && xx(a) && wx(l, a) && (Ax(r) || Rx(r)));
  }
  n(Px, "hasPath");
  Wp.exports = Px;
});

// ../node_modules/lodash/hasIn.js
var Wa = d((rL, Yp) => {
  var Ox = $p(), Cx = zp();
  function Ix(r, e) {
    return r != null && Cx(r, e, Ox);
  }
  n(Ix, "hasIn");
  Yp.exports = Ix;
});

// ../node_modules/lodash/_baseMatchesProperty.js
var Xp = d((oL, Kp) => {
  var Fx = Ua(), Dx = Hp(), Nx = Wa(), qx = uo(), Lx = Ga(), Mx = Ha(), kx = yr(), jx = 1, Bx = 2;
  function Ux(r, e) {
    return qx(r) && Lx(e) ? Mx(kx(r), e) : function(t) {
      var o = Dx(t, r);
      return o === void 0 && o === e ? Nx(t, r) : Fx(e, o, jx | Bx);
    };
  }
  n(Ux, "baseMatchesProperty");
  Kp.exports = Ux;
});

// ../node_modules/lodash/identity.js
var za = d((aL, Jp) => {
  function Gx(r) {
    return r;
  }
  n(Gx, "identity");
  Jp.exports = Gx;
});

// ../node_modules/lodash/_baseProperty.js
var Zp = d((sL, Qp) => {
  function Hx(r) {
    return function(e) {
      return e?.[r];
    };
  }
  n(Hx, "baseProperty");
  Qp.exports = Hx;
});

// ../node_modules/lodash/_basePropertyDeep.js
var rd = d((cL, ed) => {
  var Vx = po();
  function $x(r) {
    return function(e) {
      return Vx(e, r);
    };
  }
  n($x, "basePropertyDeep");
  ed.exports = $x;
});

// ../node_modules/lodash/property.js
var od = d((pL, td) => {
  var Wx = Zp(), zx = rd(), Yx = uo(), Kx = yr();
  function Xx(r) {
    return Yx(r) ? Wx(Kx(r)) : zx(r);
  }
  n(Xx, "property");
  td.exports = Xx;
});

// ../node_modules/lodash/_baseIteratee.js
var Ya = d((fL, nd) => {
  var Jx = vp(), Qx = Xp(), Zx = za(), e_ = se(), r_ = od();
  function t_(r) {
    return typeof r == "function" ? r : r == null ? Zx : typeof r == "object" ? e_(r) ? Qx(r[0], r[1]) : Jx(r) : r_(r);
  }
  n(t_, "baseIteratee");
  nd.exports = t_;
});

// ../node_modules/lodash/mapValues.js
var dt = d((hL, ad) => {
  var o_ = Ta(), n_ = ac(), a_ = Ya();
  function i_(r, e) {
    var t = {};
    return e = a_(e, 3), n_(r, function(o, a, i) {
      o_(t, a, e(o, a, i));
    }), t;
  }
  n(i_, "mapValues");
  ad.exports = i_;
});

// ../node_modules/lodash/_assignValue.js
var sd = d((gL, id) => {
  var s_ = Ta(), l_ = oo(), c_ = Object.prototype, u_ = c_.hasOwnProperty;
  function p_(r, e, t) {
    var o = r[e];
    (!(u_.call(r, e) && l_(o, t)) || t === void 0 && !(e in r)) && s_(r, e, t);
  }
  n(p_, "assignValue");
  id.exports = p_;
});

// ../node_modules/lodash/_baseSet.js
var ud = d((bL, cd) => {
  var d_ = sd(), f_ = pt(), y_ = eo(), ld = ir(), h_ = yr();
  function m_(r, e, t, o) {
    if (!ld(r))
      return r;
    e = f_(e, r);
    for (var a = -1, i = e.length, l = i - 1, c = r; c != null && ++a < i; ) {
      var s = h_(e[a]), u = t;
      if (s === "__proto__" || s === "constructor" || s === "prototype")
        return r;
      if (a != l) {
        var p = c[s];
        u = o ? o(p, s, c) : void 0, u === void 0 && (u = ld(p) ? p : y_(e[a + 1]) ? [] : {});
      }
      d_(c, s, u), c = c[s];
    }
    return r;
  }
  n(m_, "baseSet");
  cd.exports = m_;
});

// ../node_modules/lodash/_basePickBy.js
var Ka = d((TL, pd) => {
  var g_ = po(), S_ = ud(), b_ = pt();
  function v_(r, e, t) {
    for (var o = -1, a = e.length, i = {}; ++o < a; ) {
      var l = e[o], c = g_(r, l);
      t(c, l) && S_(i, b_(l, r), c);
    }
    return i;
  }
  n(v_, "basePickBy");
  pd.exports = v_;
});

// ../node_modules/lodash/_basePick.js
var fd = d((RL, dd) => {
  var T_ = Ka(), E_ = Wa();
  function R_(r, e) {
    return T_(r, e, function(t, o) {
      return E_(r, o);
    });
  }
  n(R_, "basePick");
  dd.exports = R_;
});

// ../node_modules/lodash/_isFlattenable.js
var gd = d((wL, md) => {
  var yd = ar(), A_ = Zt(), w_ = se(), hd = yd ? yd.isConcatSpreadable : void 0;
  function x_(r) {
    return w_(r) || A_(r) || !!(hd && r && r[hd]);
  }
  n(x_, "isFlattenable");
  md.exports = x_;
});

// ../node_modules/lodash/_baseFlatten.js
var vd = d((_L, bd) => {
  var __ = so(), P_ = gd();
  function Sd(r, e, t, o, a) {
    var i = -1, l = r.length;
    for (t || (t = P_), a || (a = []); ++i < l; ) {
      var c = r[i];
      e > 0 && t(c) ? e > 1 ? Sd(c, e - 1, t, o, a) : __(a, c) : o || (a[a.length] = c);
    }
    return a;
  }
  n(Sd, "baseFlatten");
  bd.exports = Sd;
});

// ../node_modules/lodash/flatten.js
var Ed = d((OL, Td) => {
  var O_ = vd();
  function C_(r) {
    var e = r == null ? 0 : r.length;
    return e ? O_(r, 1) : [];
  }
  n(C_, "flatten");
  Td.exports = C_;
});

// ../node_modules/lodash/_apply.js
var Ad = d((IL, Rd) => {
  function I_(r, e, t) {
    switch (t.length) {
      case 0:
        return r.call(e);
      case 1:
        return r.call(e, t[0]);
      case 2:
        return r.call(e, t[0], t[1]);
      case 3:
        return r.call(e, t[0], t[1], t[2]);
    }
    return r.apply(e, t);
  }
  n(I_, "apply");
  Rd.exports = I_;
});

// ../node_modules/lodash/_overRest.js
var _d = d((DL, xd) => {
  var F_ = Ad(), wd = Math.max;
  function D_(r, e, t) {
    return e = wd(e === void 0 ? r.length - 1 : e, 0), function() {
      for (var o = arguments, a = -1, i = wd(o.length - e, 0), l = Array(i); ++a < i; )
        l[a] = o[e + a];
      a = -1;
      for (var c = Array(e + 1); ++a < e; )
        c[a] = o[a];
      return c[e] = t(l), F_(r, this, c);
    };
  }
  n(D_, "overRest");
  xd.exports = D_;
});

// ../node_modules/lodash/constant.js
var Od = d((qL, Pd) => {
  function N_(r) {
    return function() {
      return r;
    };
  }
  n(N_, "constant");
  Pd.exports = N_;
});

// ../node_modules/lodash/_baseSetToString.js
var Fd = d((ML, Id) => {
  var q_ = Od(), Cd = va(), L_ = za(), M_ = Cd ? function(r, e) {
    return Cd(r, "toString", {
      configurable: !0,
      enumerable: !1,
      value: q_(e),
      writable: !0
    });
  } : L_;
  Id.exports = M_;
});

// ../node_modules/lodash/_shortOut.js
var Nd = d((kL, Dd) => {
  var k_ = 800, j_ = 16, B_ = Date.now;
  function U_(r) {
    var e = 0, t = 0;
    return function() {
      var o = B_(), a = j_ - (o - t);
      if (t = o, a > 0) {
        if (++e >= k_)
          return arguments[0];
      } else
        e = 0;
      return r.apply(void 0, arguments);
    };
  }
  n(U_, "shortOut");
  Dd.exports = U_;
});

// ../node_modules/lodash/_setToString.js
var Ld = d((BL, qd) => {
  var G_ = Fd(), H_ = Nd(), V_ = H_(G_);
  qd.exports = V_;
});

// ../node_modules/lodash/_flatRest.js
var kd = d((UL, Md) => {
  var $_ = Ed(), W_ = _d(), z_ = Ld();
  function Y_(r) {
    return z_(W_(r, void 0, $_), r + "");
  }
  n(Y_, "flatRest");
  Md.exports = Y_;
});

// ../node_modules/lodash/pick.js
var Bd = d((HL, jd) => {
  var K_ = fd(), X_ = kd(), J_ = X_(function(r, e) {
    return r == null ? {} : K_(r, e);
  });
  jd.exports = J_;
});

// ../node_modules/lodash/_getPrototype.js
var Ja = d((KL, Vd) => {
  var Z_ = _a(), eP = Z_(Object.getPrototypeOf, Object);
  Vd.exports = eP;
});

// ../node_modules/lodash/isPlainObject.js
var yo = d((XL, Wd) => {
  var rP = Ie(), tP = Ja(), oP = Fe(), nP = "[object Object]", aP = Function.prototype, iP = Object.prototype, $d = aP.toString, sP = iP.hasOwnProperty,
  lP = $d.call(Object);
  function cP(r) {
    if (!oP(r) || rP(r) != nP)
      return !1;
    var e = tP(r);
    if (e === null)
      return !0;
    var t = sP.call(e, "constructor") && e.constructor;
    return typeof t == "function" && t instanceof t && $d.call(t) == lP;
  }
  n(cP, "isPlainObject");
  Wd.exports = cP;
});

// ../node_modules/lodash/_getSymbolsIn.js
var ff = d((ak, df) => {
  var OP = so(), CP = Ja(), IP = Na(), FP = Da(), DP = Object.getOwnPropertySymbols, NP = DP ? function(r) {
    for (var e = []; r; )
      OP(e, IP(r)), r = CP(r);
    return e;
  } : FP;
  df.exports = NP;
});

// ../node_modules/lodash/_nativeKeysIn.js
var hf = d((ik, yf) => {
  function qP(r) {
    var e = [];
    if (r != null)
      for (var t in Object(r))
        e.push(t);
    return e;
  }
  n(qP, "nativeKeysIn");
  yf.exports = qP;
});

// ../node_modules/lodash/_baseKeysIn.js
var gf = d((lk, mf) => {
  var LP = ir(), MP = xa(), kP = hf(), jP = Object.prototype, BP = jP.hasOwnProperty;
  function UP(r) {
    if (!LP(r))
      return kP(r);
    var e = MP(r), t = [];
    for (var o in r)
      o == "constructor" && (e || !BP.call(r, o)) || t.push(o);
    return t;
  }
  n(UP, "baseKeysIn");
  mf.exports = UP;
});

// ../node_modules/lodash/keysIn.js
var bf = d((uk, Sf) => {
  var GP = wa(), HP = gf(), VP = Pa();
  function $P(r) {
    return VP(r) ? GP(r, !0) : HP(r);
  }
  n($P, "keysIn");
  Sf.exports = $P;
});

// ../node_modules/lodash/_getAllKeysIn.js
var Tf = d((dk, vf) => {
  var WP = Fa(), zP = ff(), YP = bf();
  function KP(r) {
    return WP(r, YP, zP);
  }
  n(KP, "getAllKeysIn");
  vf.exports = KP;
});

// ../node_modules/lodash/pickBy.js
var Rf = d((yk, Ef) => {
  var XP = $a(), JP = Ya(), QP = Ka(), ZP = Tf();
  function eO(r, e) {
    if (r == null)
      return {};
    var t = XP(ZP(r), function(o) {
      return [o];
    });
    return e = JP(e), QP(r, t, function(o, a) {
      return e(o, a[0]);
    });
  }
  n(eO, "pickBy");
  Ef.exports = eO;
});

// ../node_modules/es-errors/index.js
var Hf = d((bj, Gf) => {
  "use strict";
  Gf.exports = Error;
});

// ../node_modules/es-errors/eval.js
var $f = d((vj, Vf) => {
  "use strict";
  Vf.exports = EvalError;
});

// ../node_modules/es-errors/range.js
var zf = d((Tj, Wf) => {
  "use strict";
  Wf.exports = RangeError;
});

// ../node_modules/es-errors/ref.js
var Kf = d((Ej, Yf) => {
  "use strict";
  Yf.exports = ReferenceError;
});

// ../node_modules/es-errors/syntax.js
var Si = d((Rj, Xf) => {
  "use strict";
  Xf.exports = SyntaxError;
});

// ../node_modules/es-errors/type.js
var Tt = d((Aj, Jf) => {
  "use strict";
  Jf.exports = TypeError;
});

// ../node_modules/es-errors/uri.js
var Zf = d((wj, Qf) => {
  "use strict";
  Qf.exports = URIError;
});

// ../node_modules/has-symbols/shams.js
var ry = d((xj, ey) => {
  "use strict";
  ey.exports = /* @__PURE__ */ n(function() {
    if (typeof Symbol != "function" || typeof Object.getOwnPropertySymbols != "function")
      return !1;
    if (typeof Symbol.iterator == "symbol")
      return !0;
    var e = {}, t = Symbol("test"), o = Object(t);
    if (typeof t == "string" || Object.prototype.toString.call(t) !== "[object Symbol]" || Object.prototype.toString.call(o) !== "[object Sy\
mbol]")
      return !1;
    var a = 42;
    e[t] = a;
    for (t in e)
      return !1;
    if (typeof Object.keys == "function" && Object.keys(e).length !== 0 || typeof Object.getOwnPropertyNames == "function" && Object.getOwnPropertyNames(
    e).length !== 0)
      return !1;
    var i = Object.getOwnPropertySymbols(e);
    if (i.length !== 1 || i[0] !== t || !Object.prototype.propertyIsEnumerable.call(e, t))
      return !1;
    if (typeof Object.getOwnPropertyDescriptor == "function") {
      var l = Object.getOwnPropertyDescriptor(e, t);
      if (l.value !== a || l.enumerable !== !0)
        return !1;
    }
    return !0;
  }, "hasSymbols");
});

// ../node_modules/has-symbols/index.js
var ny = d((Pj, oy) => {
  "use strict";
  var ty = typeof Symbol < "u" && Symbol, gO = ry();
  oy.exports = /* @__PURE__ */ n(function() {
    return typeof ty != "function" || typeof Symbol != "function" || typeof ty("foo") != "symbol" || typeof Symbol("bar") != "symbol" ? !1 :
    gO();
  }, "hasNativeSymbols");
});

// ../node_modules/has-proto/index.js
var iy = d((Cj, ay) => {
  "use strict";
  var bi = {
    __proto__: null,
    foo: {}
  }, SO = Object;
  ay.exports = /* @__PURE__ */ n(function() {
    return { __proto__: bi }.foo === bi.foo && !(bi instanceof SO);
  }, "hasProto");
});

// ../node_modules/function-bind/implementation.js
var cy = d((Fj, ly) => {
  "use strict";
  var bO = "Function.prototype.bind called on incompatible ", vO = Object.prototype.toString, TO = Math.max, EO = "[object Function]", sy = /* @__PURE__ */ n(
  function(e, t) {
    for (var o = [], a = 0; a < e.length; a += 1)
      o[a] = e[a];
    for (var i = 0; i < t.length; i += 1)
      o[i + e.length] = t[i];
    return o;
  }, "concatty"), RO = /* @__PURE__ */ n(function(e, t) {
    for (var o = [], a = t || 0, i = 0; a < e.length; a += 1, i += 1)
      o[i] = e[a];
    return o;
  }, "slicy"), AO = /* @__PURE__ */ n(function(r, e) {
    for (var t = "", o = 0; o < r.length; o += 1)
      t += r[o], o + 1 < r.length && (t += e);
    return t;
  }, "joiny");
  ly.exports = /* @__PURE__ */ n(function(e) {
    var t = this;
    if (typeof t != "function" || vO.apply(t) !== EO)
      throw new TypeError(bO + t);
    for (var o = RO(arguments, 1), a, i = /* @__PURE__ */ n(function() {
      if (this instanceof a) {
        var p = t.apply(
          this,
          sy(o, arguments)
        );
        return Object(p) === p ? p : this;
      }
      return t.apply(
        e,
        sy(o, arguments)
      );
    }, "binder"), l = TO(0, t.length - o.length), c = [], s = 0; s < l; s++)
      c[s] = "$" + s;
    if (a = Function("binder", "return function (" + AO(c, ",") + "){ return binder.apply(this,arguments); }")(i), t.prototype) {
      var u = /* @__PURE__ */ n(function() {
      }, "Empty");
      u.prototype = t.prototype, a.prototype = new u(), u.prototype = null;
    }
    return a;
  }, "bind");
});

// ../node_modules/function-bind/index.js
var Po = d((Nj, uy) => {
  "use strict";
  var wO = cy();
  uy.exports = Function.prototype.bind || wO;
});

// ../node_modules/hasown/index.js
var dy = d((qj, py) => {
  "use strict";
  var xO = Function.prototype.call, _O = Object.prototype.hasOwnProperty, PO = Po();
  py.exports = PO.call(xO, _O);
});

// ../node_modules/get-intrinsic/index.js
var He = d((Lj, gy) => {
  "use strict";
  var F, OO = Hf(), CO = $f(), IO = zf(), FO = Kf(), _r = Si(), xr = Tt(), DO = Zf(), my = Function, vi = /* @__PURE__ */ n(function(r) {
    try {
      return my('"use strict"; return (' + r + ").constructor;")();
    } catch {
    }
  }, "getEvalledConstructor"), Ue = Object.getOwnPropertyDescriptor;
  if (Ue)
    try {
      Ue({}, "");
    } catch {
      Ue = null;
    }
  var Ti = /* @__PURE__ */ n(function() {
    throw new xr();
  }, "throwTypeError"), NO = Ue ? function() {
    try {
      return arguments.callee, Ti;
    } catch {
      try {
        return Ue(arguments, "callee").get;
      } catch {
        return Ti;
      }
    }
  }() : Ti, Ar = ny()(), qO = iy()(), V = Object.getPrototypeOf || (qO ? function(r) {
    return r.__proto__;
  } : null), wr = {}, LO = typeof Uint8Array > "u" || !V ? F : V(Uint8Array), Ge = {
    __proto__: null,
    "%AggregateError%": typeof AggregateError > "u" ? F : AggregateError,
    "%Array%": Array,
    "%ArrayBuffer%": typeof ArrayBuffer > "u" ? F : ArrayBuffer,
    "%ArrayIteratorPrototype%": Ar && V ? V([][Symbol.iterator]()) : F,
    "%AsyncFromSyncIteratorPrototype%": F,
    "%AsyncFunction%": wr,
    "%AsyncGenerator%": wr,
    "%AsyncGeneratorFunction%": wr,
    "%AsyncIteratorPrototype%": wr,
    "%Atomics%": typeof Atomics > "u" ? F : Atomics,
    "%BigInt%": typeof BigInt > "u" ? F : BigInt,
    "%BigInt64Array%": typeof BigInt64Array > "u" ? F : BigInt64Array,
    "%BigUint64Array%": typeof BigUint64Array > "u" ? F : BigUint64Array,
    "%Boolean%": Boolean,
    "%DataView%": typeof DataView > "u" ? F : DataView,
    "%Date%": Date,
    "%decodeURI%": decodeURI,
    "%decodeURIComponent%": decodeURIComponent,
    "%encodeURI%": encodeURI,
    "%encodeURIComponent%": encodeURIComponent,
    "%Error%": OO,
    "%eval%": eval,
    // eslint-disable-line no-eval
    "%EvalError%": CO,
    "%Float32Array%": typeof Float32Array > "u" ? F : Float32Array,
    "%Float64Array%": typeof Float64Array > "u" ? F : Float64Array,
    "%FinalizationRegistry%": typeof FinalizationRegistry > "u" ? F : FinalizationRegistry,
    "%Function%": my,
    "%GeneratorFunction%": wr,
    "%Int8Array%": typeof Int8Array > "u" ? F : Int8Array,
    "%Int16Array%": typeof Int16Array > "u" ? F : Int16Array,
    "%Int32Array%": typeof Int32Array > "u" ? F : Int32Array,
    "%isFinite%": isFinite,
    "%isNaN%": isNaN,
    "%IteratorPrototype%": Ar && V ? V(V([][Symbol.iterator]())) : F,
    "%JSON%": typeof JSON == "object" ? JSON : F,
    "%Map%": typeof Map > "u" ? F : Map,
    "%MapIteratorPrototype%": typeof Map > "u" || !Ar || !V ? F : V((/* @__PURE__ */ new Map())[Symbol.iterator]()),
    "%Math%": Math,
    "%Number%": Number,
    "%Object%": Object,
    "%parseFloat%": parseFloat,
    "%parseInt%": parseInt,
    "%Promise%": typeof Promise > "u" ? F : Promise,
    "%Proxy%": typeof Proxy > "u" ? F : Proxy,
    "%RangeError%": IO,
    "%ReferenceError%": FO,
    "%Reflect%": typeof Reflect > "u" ? F : Reflect,
    "%RegExp%": RegExp,
    "%Set%": typeof Set > "u" ? F : Set,
    "%SetIteratorPrototype%": typeof Set > "u" || !Ar || !V ? F : V((/* @__PURE__ */ new Set())[Symbol.iterator]()),
    "%SharedArrayBuffer%": typeof SharedArrayBuffer > "u" ? F : SharedArrayBuffer,
    "%String%": String,
    "%StringIteratorPrototype%": Ar && V ? V(""[Symbol.iterator]()) : F,
    "%Symbol%": Ar ? Symbol : F,
    "%SyntaxError%": _r,
    "%ThrowTypeError%": NO,
    "%TypedArray%": LO,
    "%TypeError%": xr,
    "%Uint8Array%": typeof Uint8Array > "u" ? F : Uint8Array,
    "%Uint8ClampedArray%": typeof Uint8ClampedArray > "u" ? F : Uint8ClampedArray,
    "%Uint16Array%": typeof Uint16Array > "u" ? F : Uint16Array,
    "%Uint32Array%": typeof Uint32Array > "u" ? F : Uint32Array,
    "%URIError%": DO,
    "%WeakMap%": typeof WeakMap > "u" ? F : WeakMap,
    "%WeakRef%": typeof WeakRef > "u" ? F : WeakRef,
    "%WeakSet%": typeof WeakSet > "u" ? F : WeakSet
  };
  if (V)
    try {
      null.error;
    } catch (r) {
      fy = V(V(r)), Ge["%Error.prototype%"] = fy;
    }
  var fy, MO = /* @__PURE__ */ n(function r(e) {
    var t;
    if (e === "%AsyncFunction%")
      t = vi("async function () {}");
    else if (e === "%GeneratorFunction%")
      t = vi("function* () {}");
    else if (e === "%AsyncGeneratorFunction%")
      t = vi("async function* () {}");
    else if (e === "%AsyncGenerator%") {
      var o = r("%AsyncGeneratorFunction%");
      o && (t = o.prototype);
    } else if (e === "%AsyncIteratorPrototype%") {
      var a = r("%AsyncGenerator%");
      a && V && (t = V(a.prototype));
    }
    return Ge[e] = t, t;
  }, "doEval"), yy = {
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
  }, Et = Po(), Oo = dy(), kO = Et.call(Function.call, Array.prototype.concat), jO = Et.call(Function.apply, Array.prototype.splice), hy = Et.
  call(Function.call, String.prototype.replace), Co = Et.call(Function.call, String.prototype.slice), BO = Et.call(Function.call, RegExp.prototype.
  exec), UO = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g, GO = /\\(\\)?/g, HO = /* @__PURE__ */ n(
  function(e) {
    var t = Co(e, 0, 1), o = Co(e, -1);
    if (t === "%" && o !== "%")
      throw new _r("invalid intrinsic syntax, expected closing `%`");
    if (o === "%" && t !== "%")
      throw new _r("invalid intrinsic syntax, expected opening `%`");
    var a = [];
    return hy(e, UO, function(i, l, c, s) {
      a[a.length] = c ? hy(s, GO, "$1") : l || i;
    }), a;
  }, "stringToPath"), VO = /* @__PURE__ */ n(function(e, t) {
    var o = e, a;
    if (Oo(yy, o) && (a = yy[o], o = "%" + a[0] + "%"), Oo(Ge, o)) {
      var i = Ge[o];
      if (i === wr && (i = MO(o)), typeof i > "u" && !t)
        throw new xr("intrinsic " + e + " exists, but is not available. Please file an issue!");
      return {
        alias: a,
        name: o,
        value: i
      };
    }
    throw new _r("intrinsic " + e + " does not exist!");
  }, "getBaseIntrinsic");
  gy.exports = /* @__PURE__ */ n(function(e, t) {
    if (typeof e != "string" || e.length === 0)
      throw new xr("intrinsic name must be a non-empty string");
    if (arguments.length > 1 && typeof t != "boolean")
      throw new xr('"allowMissing" argument must be a boolean');
    if (BO(/^%?[^%]*%?$/, e) === null)
      throw new _r("`%` may not be present anywhere but at the beginning and end of the intrinsic name");
    var o = HO(e), a = o.length > 0 ? o[0] : "", i = VO("%" + a + "%", t), l = i.name, c = i.value, s = !1, u = i.alias;
    u && (a = u[0], jO(o, kO([0, 1], u)));
    for (var p = 1, y = !0; p < o.length; p += 1) {
      var h = o[p], g = Co(h, 0, 1), m = Co(h, -1);
      if ((g === '"' || g === "'" || g === "`" || m === '"' || m === "'" || m === "`") && g !== m)
        throw new _r("property names with quotes must have matching quotes");
      if ((h === "constructor" || !y) && (s = !0), a += "." + h, l = "%" + a + "%", Oo(Ge, l))
        c = Ge[l];
      else if (c != null) {
        if (!(h in c)) {
          if (!t)
            throw new xr("base intrinsic for " + e + " exists, but the property is not available.");
          return;
        }
        if (Ue && p + 1 >= o.length) {
          var b = Ue(c, h);
          y = !!b, y && "get" in b && !("originalValue" in b.get) ? c = b.get : c = c[h];
        } else
          y = Oo(c, h), c = c[h];
        y && !s && (Ge[l] = c);
      }
    }
    return c;
  }, "GetIntrinsic");
});

// ../node_modules/es-define-property/index.js
var Fo = d((kj, Sy) => {
  "use strict";
  var $O = He(), Io = $O("%Object.defineProperty%", !0) || !1;
  if (Io)
    try {
      Io({}, "a", { value: 1 });
    } catch {
      Io = !1;
    }
  Sy.exports = Io;
});

// ../node_modules/gopd/index.js
var Ei = d((jj, by) => {
  "use strict";
  var WO = He(), Do = WO("%Object.getOwnPropertyDescriptor%", !0);
  if (Do)
    try {
      Do([], "length");
    } catch {
      Do = null;
    }
  by.exports = Do;
});

// ../node_modules/define-data-property/index.js
var Ry = d((Bj, Ey) => {
  "use strict";
  var vy = Fo(), zO = Si(), Pr = Tt(), Ty = Ei();
  Ey.exports = /* @__PURE__ */ n(function(e, t, o) {
    if (!e || typeof e != "object" && typeof e != "function")
      throw new Pr("`obj` must be an object or a function`");
    if (typeof t != "string" && typeof t != "symbol")
      throw new Pr("`property` must be a string or a symbol`");
    if (arguments.length > 3 && typeof arguments[3] != "boolean" && arguments[3] !== null)
      throw new Pr("`nonEnumerable`, if provided, must be a boolean or null");
    if (arguments.length > 4 && typeof arguments[4] != "boolean" && arguments[4] !== null)
      throw new Pr("`nonWritable`, if provided, must be a boolean or null");
    if (arguments.length > 5 && typeof arguments[5] != "boolean" && arguments[5] !== null)
      throw new Pr("`nonConfigurable`, if provided, must be a boolean or null");
    if (arguments.length > 6 && typeof arguments[6] != "boolean")
      throw new Pr("`loose`, if provided, must be a boolean");
    var a = arguments.length > 3 ? arguments[3] : null, i = arguments.length > 4 ? arguments[4] : null, l = arguments.length > 5 ? arguments[5] :
    null, c = arguments.length > 6 ? arguments[6] : !1, s = !!Ty && Ty(e, t);
    if (vy)
      vy(e, t, {
        configurable: l === null && s ? s.configurable : !l,
        enumerable: a === null && s ? s.enumerable : !a,
        value: o,
        writable: i === null && s ? s.writable : !i
      });
    else if (c || !a && !i && !l)
      e[t] = o;
    else
      throw new zO("This environment does not support defining a property as non-configurable, non-writable, or non-enumerable.");
  }, "defineDataProperty");
});

// ../node_modules/has-property-descriptors/index.js
var xy = d((Gj, wy) => {
  "use strict";
  var Ri = Fo(), Ay = /* @__PURE__ */ n(function() {
    return !!Ri;
  }, "hasPropertyDescriptors");
  Ay.hasArrayLengthDefineBug = /* @__PURE__ */ n(function() {
    if (!Ri)
      return null;
    try {
      return Ri([], "length", { value: 1 }).length !== 1;
    } catch {
      return !0;
    }
  }, "hasArrayLengthDefineBug");
  wy.exports = Ay;
});

// ../node_modules/set-function-length/index.js
var Iy = d((Vj, Cy) => {
  "use strict";
  var YO = He(), _y = Ry(), KO = xy()(), Py = Ei(), Oy = Tt(), XO = YO("%Math.floor%");
  Cy.exports = /* @__PURE__ */ n(function(e, t) {
    if (typeof e != "function")
      throw new Oy("`fn` is not a function");
    if (typeof t != "number" || t < 0 || t > 4294967295 || XO(t) !== t)
      throw new Oy("`length` must be a positive 32-bit integer");
    var o = arguments.length > 2 && !!arguments[2], a = !0, i = !0;
    if ("length" in e && Py) {
      var l = Py(e, "length");
      l && !l.configurable && (a = !1), l && !l.writable && (i = !1);
    }
    return (a || i || !o) && (KO ? _y(
      /** @type {Parameters<define>[0]} */
      e,
      "length",
      t,
      !0,
      !0
    ) : _y(
      /** @type {Parameters<define>[0]} */
      e,
      "length",
      t
    )), e;
  }, "setFunctionLength");
});

// ../node_modules/call-bind/index.js
var My = d((Wj, No) => {
  "use strict";
  var Ai = Po(), qo = He(), JO = Iy(), QO = Tt(), Ny = qo("%Function.prototype.apply%"), qy = qo("%Function.prototype.call%"), Ly = qo("%Ref\
lect.apply%", !0) || Ai.call(qy, Ny), Fy = Fo(), ZO = qo("%Math.max%");
  No.exports = /* @__PURE__ */ n(function(e) {
    if (typeof e != "function")
      throw new QO("a function is required");
    var t = Ly(Ai, qy, arguments);
    return JO(
      t,
      1 + ZO(0, e.length - (arguments.length - 1)),
      !0
    );
  }, "callBind");
  var Dy = /* @__PURE__ */ n(function() {
    return Ly(Ai, Ny, arguments);
  }, "applyBind");
  Fy ? Fy(No.exports, "apply", { value: Dy }) : No.exports.apply = Dy;
});

// ../node_modules/call-bind/callBound.js
var Uy = d((Yj, By) => {
  "use strict";
  var ky = He(), jy = My(), eC = jy(ky("String.prototype.indexOf"));
  By.exports = /* @__PURE__ */ n(function(e, t) {
    var o = ky(e, !!t);
    return typeof o == "function" && eC(e, ".prototype.") > -1 ? jy(o) : o;
  }, "callBoundIntrinsic");
});

// (disabled):../node_modules/object-inspect/util.inspect
var Gy = d(() => {
});

// ../node_modules/object-inspect/index.js
var lh = d((Qj, sh) => {
  var Ni = typeof Map == "function" && Map.prototype, wi = Object.getOwnPropertyDescriptor && Ni ? Object.getOwnPropertyDescriptor(Map.prototype,
  "size") : null, Mo = Ni && wi && typeof wi.get == "function" ? wi.get : null, Hy = Ni && Map.prototype.forEach, qi = typeof Set == "functi\
on" && Set.prototype, xi = Object.getOwnPropertyDescriptor && qi ? Object.getOwnPropertyDescriptor(Set.prototype, "size") : null, ko = qi &&
  xi && typeof xi.get == "function" ? xi.get : null, Vy = qi && Set.prototype.forEach, rC = typeof WeakMap == "function" && WeakMap.prototype,
  At = rC ? WeakMap.prototype.has : null, tC = typeof WeakSet == "function" && WeakSet.prototype, wt = tC ? WeakSet.prototype.has : null, oC = typeof WeakRef ==
  "function" && WeakRef.prototype, $y = oC ? WeakRef.prototype.deref : null, nC = Boolean.prototype.valueOf, aC = Object.prototype.toString,
  iC = Function.prototype.toString, sC = String.prototype.match, Li = String.prototype.slice, Ae = String.prototype.replace, lC = String.prototype.
  toUpperCase, Wy = String.prototype.toLowerCase, rh = RegExp.prototype.test, zy = Array.prototype.concat, le = Array.prototype.join, cC = Array.
  prototype.slice, Yy = Math.floor, Oi = typeof BigInt == "function" ? BigInt.prototype.valueOf : null, _i = Object.getOwnPropertySymbols, Ci = typeof Symbol ==
  "function" && typeof Symbol.iterator == "symbol" ? Symbol.prototype.toString : null, Or = typeof Symbol == "function" && typeof Symbol.iterator ==
  "object", Y = typeof Symbol == "function" && Symbol.toStringTag && (typeof Symbol.toStringTag === Or || !0) ? Symbol.toStringTag : null, th = Object.
  prototype.propertyIsEnumerable, Ky = (typeof Reflect == "function" ? Reflect.getPrototypeOf : Object.getPrototypeOf) || ([].__proto__ === Array.
  prototype ? function(r) {
    return r.__proto__;
  } : null);
  function Xy(r, e) {
    if (r === 1 / 0 || r === -1 / 0 || r !== r || r && r > -1e3 && r < 1e3 || rh.call(/e/, e))
      return e;
    var t = /[0-9](?=(?:[0-9]{3})+(?![0-9]))/g;
    if (typeof r == "number") {
      var o = r < 0 ? -Yy(-r) : Yy(r);
      if (o !== r) {
        var a = String(o), i = Li.call(e, a.length + 1);
        return Ae.call(a, t, "$&_") + "." + Ae.call(Ae.call(i, /([0-9]{3})/g, "$&_"), /_$/, "");
      }
    }
    return Ae.call(e, t, "$&_");
  }
  n(Xy, "addNumericSeparator");
  var Ii = Gy(), Jy = Ii.custom, Qy = nh(Jy) ? Jy : null;
  sh.exports = /* @__PURE__ */ n(function r(e, t, o, a) {
    var i = t || {};
    if (Re(i, "quoteStyle") && i.quoteStyle !== "single" && i.quoteStyle !== "double")
      throw new TypeError('option "quoteStyle" must be "single" or "double"');
    if (Re(i, "maxStringLength") && (typeof i.maxStringLength == "number" ? i.maxStringLength < 0 && i.maxStringLength !== 1 / 0 : i.maxStringLength !==
    null))
      throw new TypeError('option "maxStringLength", if provided, must be a positive integer, Infinity, or `null`');
    var l = Re(i, "customInspect") ? i.customInspect : !0;
    if (typeof l != "boolean" && l !== "symbol")
      throw new TypeError("option \"customInspect\", if provided, must be `true`, `false`, or `'symbol'`");
    if (Re(i, "indent") && i.indent !== null && i.indent !== "	" && !(parseInt(i.indent, 10) === i.indent && i.indent > 0))
      throw new TypeError('option "indent" must be "\\t", an integer > 0, or `null`');
    if (Re(i, "numericSeparator") && typeof i.numericSeparator != "boolean")
      throw new TypeError('option "numericSeparator", if provided, must be `true` or `false`');
    var c = i.numericSeparator;
    if (typeof e > "u")
      return "undefined";
    if (e === null)
      return "null";
    if (typeof e == "boolean")
      return e ? "true" : "false";
    if (typeof e == "string")
      return ih(e, i);
    if (typeof e == "number") {
      if (e === 0)
        return 1 / 0 / e > 0 ? "0" : "-0";
      var s = String(e);
      return c ? Xy(e, s) : s;
    }
    if (typeof e == "bigint") {
      var u = String(e) + "n";
      return c ? Xy(e, u) : u;
    }
    var p = typeof i.depth > "u" ? 5 : i.depth;
    if (typeof o > "u" && (o = 0), o >= p && p > 0 && typeof e == "object")
      return Fi(e) ? "[Array]" : "[Object]";
    var y = _C(i, o);
    if (typeof a > "u")
      a = [];
    else if (ah(a, e) >= 0)
      return "[Circular]";
    function h(D, k, L) {
      if (k && (a = cC.call(a), a.push(k)), L) {
        var U = {
          depth: i.depth
        };
        return Re(i, "quoteStyle") && (U.quoteStyle = i.quoteStyle), r(D, U, o + 1, a);
      }
      return r(D, i, o + 1, a);
    }
    if (n(h, "inspect"), typeof e == "function" && !Zy(e)) {
      var g = SC(e), m = Lo(e, h);
      return "[Function" + (g ? ": " + g : " (anonymous)") + "]" + (m.length > 0 ? " { " + le.call(m, ", ") + " }" : "");
    }
    if (nh(e)) {
      var b = Or ? Ae.call(String(e), /^(Symbol\(.*\))_[^)]*$/, "$1") : Ci.call(e);
      return typeof e == "object" && !Or ? Rt(b) : b;
    }
    if (AC(e)) {
      for (var S = "<" + Wy.call(String(e.nodeName)), T = e.attributes || [], v = 0; v < T.length; v++)
        S += " " + T[v].name + "=" + oh(uC(T[v].value), "double", i);
      return S += ">", e.childNodes && e.childNodes.length && (S += "..."), S += "</" + Wy.call(String(e.nodeName)) + ">", S;
    }
    if (Fi(e)) {
      if (e.length === 0)
        return "[]";
      var E = Lo(e, h);
      return y && !xC(E) ? "[" + Di(E, y) + "]" : "[ " + le.call(E, ", ") + " ]";
    }
    if (dC(e)) {
      var x = Lo(e, h);
      return !("cause" in Error.prototype) && "cause" in e && !th.call(e, "cause") ? "{ [" + String(e) + "] " + le.call(zy.call("[cause]: " +
      h(e.cause), x), ", ") + " }" : x.length === 0 ? "[" + String(e) + "]" : "{ [" + String(e) + "] " + le.call(x, ", ") + " }";
    }
    if (typeof e == "object" && l) {
      if (Qy && typeof e[Qy] == "function" && Ii)
        return Ii(e, { depth: p - o });
      if (l !== "symbol" && typeof e.inspect == "function")
        return e.inspect();
    }
    if (bC(e)) {
      var A = [];
      return Hy && Hy.call(e, function(D, k) {
        A.push(h(k, e, !0) + " => " + h(D, e));
      }), eh("Map", Mo.call(e), A, y);
    }
    if (EC(e)) {
      var C = [];
      return Vy && Vy.call(e, function(D) {
        C.push(h(D, e));
      }), eh("Set", ko.call(e), C, y);
    }
    if (vC(e))
      return Pi("WeakMap");
    if (RC(e))
      return Pi("WeakSet");
    if (TC(e))
      return Pi("WeakRef");
    if (yC(e))
      return Rt(h(Number(e)));
    if (mC(e))
      return Rt(h(Oi.call(e)));
    if (hC(e))
      return Rt(nC.call(e));
    if (fC(e))
      return Rt(h(String(e)));
    if (typeof window < "u" && e === window)
      return "{ [object Window] }";
    if (e === global)
      return "{ [object globalThis] }";
    if (!pC(e) && !Zy(e)) {
      var N = Lo(e, h), P = Ky ? Ky(e) === Object.prototype : e instanceof Object || e.constructor === Object, H = e instanceof Object ? "" :
      "null prototype", te = !P && Y && Object(e) === e && Y in e ? Li.call(we(e), 8, -1) : H ? "Object" : "", pe = P || typeof e.constructor !=
      "function" ? "" : e.constructor.name ? e.constructor.name + " " : "", q = pe + (te || H ? "[" + le.call(zy.call([], te || [], H || []),
      ": ") + "] " : "");
      return N.length === 0 ? q + "{}" : y ? q + "{" + Di(N, y) + "}" : q + "{ " + le.call(N, ", ") + " }";
    }
    return String(e);
  }, "inspect_");
  function oh(r, e, t) {
    var o = (t.quoteStyle || e) === "double" ? '"' : "'";
    return o + r + o;
  }
  n(oh, "wrapQuotes");
  function uC(r) {
    return Ae.call(String(r), /"/g, "&quot;");
  }
  n(uC, "quote");
  function Fi(r) {
    return we(r) === "[object Array]" && (!Y || !(typeof r == "object" && Y in r));
  }
  n(Fi, "isArray");
  function pC(r) {
    return we(r) === "[object Date]" && (!Y || !(typeof r == "object" && Y in r));
  }
  n(pC, "isDate");
  function Zy(r) {
    return we(r) === "[object RegExp]" && (!Y || !(typeof r == "object" && Y in r));
  }
  n(Zy, "isRegExp");
  function dC(r) {
    return we(r) === "[object Error]" && (!Y || !(typeof r == "object" && Y in r));
  }
  n(dC, "isError");
  function fC(r) {
    return we(r) === "[object String]" && (!Y || !(typeof r == "object" && Y in r));
  }
  n(fC, "isString");
  function yC(r) {
    return we(r) === "[object Number]" && (!Y || !(typeof r == "object" && Y in r));
  }
  n(yC, "isNumber");
  function hC(r) {
    return we(r) === "[object Boolean]" && (!Y || !(typeof r == "object" && Y in r));
  }
  n(hC, "isBoolean");
  function nh(r) {
    if (Or)
      return r && typeof r == "object" && r instanceof Symbol;
    if (typeof r == "symbol")
      return !0;
    if (!r || typeof r != "object" || !Ci)
      return !1;
    try {
      return Ci.call(r), !0;
    } catch {
    }
    return !1;
  }
  n(nh, "isSymbol");
  function mC(r) {
    if (!r || typeof r != "object" || !Oi)
      return !1;
    try {
      return Oi.call(r), !0;
    } catch {
    }
    return !1;
  }
  n(mC, "isBigInt");
  var gC = Object.prototype.hasOwnProperty || function(r) {
    return r in this;
  };
  function Re(r, e) {
    return gC.call(r, e);
  }
  n(Re, "has");
  function we(r) {
    return aC.call(r);
  }
  n(we, "toStr");
  function SC(r) {
    if (r.name)
      return r.name;
    var e = sC.call(iC.call(r), /^function\s*([\w$]+)/);
    return e ? e[1] : null;
  }
  n(SC, "nameOf");
  function ah(r, e) {
    if (r.indexOf)
      return r.indexOf(e);
    for (var t = 0, o = r.length; t < o; t++)
      if (r[t] === e)
        return t;
    return -1;
  }
  n(ah, "indexOf");
  function bC(r) {
    if (!Mo || !r || typeof r != "object")
      return !1;
    try {
      Mo.call(r);
      try {
        ko.call(r);
      } catch {
        return !0;
      }
      return r instanceof Map;
    } catch {
    }
    return !1;
  }
  n(bC, "isMap");
  function vC(r) {
    if (!At || !r || typeof r != "object")
      return !1;
    try {
      At.call(r, At);
      try {
        wt.call(r, wt);
      } catch {
        return !0;
      }
      return r instanceof WeakMap;
    } catch {
    }
    return !1;
  }
  n(vC, "isWeakMap");
  function TC(r) {
    if (!$y || !r || typeof r != "object")
      return !1;
    try {
      return $y.call(r), !0;
    } catch {
    }
    return !1;
  }
  n(TC, "isWeakRef");
  function EC(r) {
    if (!ko || !r || typeof r != "object")
      return !1;
    try {
      ko.call(r);
      try {
        Mo.call(r);
      } catch {
        return !0;
      }
      return r instanceof Set;
    } catch {
    }
    return !1;
  }
  n(EC, "isSet");
  function RC(r) {
    if (!wt || !r || typeof r != "object")
      return !1;
    try {
      wt.call(r, wt);
      try {
        At.call(r, At);
      } catch {
        return !0;
      }
      return r instanceof WeakSet;
    } catch {
    }
    return !1;
  }
  n(RC, "isWeakSet");
  function AC(r) {
    return !r || typeof r != "object" ? !1 : typeof HTMLElement < "u" && r instanceof HTMLElement ? !0 : typeof r.nodeName == "string" && typeof r.
    getAttribute == "function";
  }
  n(AC, "isElement");
  function ih(r, e) {
    if (r.length > e.maxStringLength) {
      var t = r.length - e.maxStringLength, o = "... " + t + " more character" + (t > 1 ? "s" : "");
      return ih(Li.call(r, 0, e.maxStringLength), e) + o;
    }
    var a = Ae.call(Ae.call(r, /(['\\])/g, "\\$1"), /[\x00-\x1f]/g, wC);
    return oh(a, "single", e);
  }
  n(ih, "inspectString");
  function wC(r) {
    var e = r.charCodeAt(0), t = {
      8: "b",
      9: "t",
      10: "n",
      12: "f",
      13: "r"
    }[e];
    return t ? "\\" + t : "\\x" + (e < 16 ? "0" : "") + lC.call(e.toString(16));
  }
  n(wC, "lowbyte");
  function Rt(r) {
    return "Object(" + r + ")";
  }
  n(Rt, "markBoxed");
  function Pi(r) {
    return r + " { ? }";
  }
  n(Pi, "weakCollectionOf");
  function eh(r, e, t, o) {
    var a = o ? Di(t, o) : le.call(t, ", ");
    return r + " (" + e + ") {" + a + "}";
  }
  n(eh, "collectionOf");
  function xC(r) {
    for (var e = 0; e < r.length; e++)
      if (ah(r[e], `
`) >= 0)
        return !1;
    return !0;
  }
  n(xC, "singleLineValues");
  function _C(r, e) {
    var t;
    if (r.indent === "	")
      t = "	";
    else if (typeof r.indent == "number" && r.indent > 0)
      t = le.call(Array(r.indent + 1), " ");
    else
      return null;
    return {
      base: t,
      prev: le.call(Array(e + 1), t)
    };
  }
  n(_C, "getIndent");
  function Di(r, e) {
    if (r.length === 0)
      return "";
    var t = `
` + e.prev + e.base;
    return t + le.call(r, "," + t) + `
` + e.prev;
  }
  n(Di, "indentedJoin");
  function Lo(r, e) {
    var t = Fi(r), o = [];
    if (t) {
      o.length = r.length;
      for (var a = 0; a < r.length; a++)
        o[a] = Re(r, a) ? e(r[a], r) : "";
    }
    var i = typeof _i == "function" ? _i(r) : [], l;
    if (Or) {
      l = {};
      for (var c = 0; c < i.length; c++)
        l["$" + i[c]] = i[c];
    }
    for (var s in r)
      Re(r, s) && (t && String(Number(s)) === s && s < r.length || Or && l["$" + s] instanceof Symbol || (rh.call(/[^\w$]/, s) ? o.push(e(s,
      r) + ": " + e(r[s], r)) : o.push(s + ": " + e(r[s], r))));
    if (typeof _i == "function")
      for (var u = 0; u < i.length; u++)
        th.call(r, i[u]) && o.push("[" + e(i[u]) + "]: " + e(r[i[u]], r));
    return o;
  }
  n(Lo, "arrObjKeys");
});

// ../node_modules/side-channel/index.js
var uh = d((eB, ch) => {
  "use strict";
  var Mi = He(), Cr = Uy(), PC = lh(), OC = Mi("%TypeError%"), jo = Mi("%WeakMap%", !0), Bo = Mi("%Map%", !0), CC = Cr("WeakMap.prototype.ge\
t", !0), IC = Cr("WeakMap.prototype.set", !0), FC = Cr("WeakMap.prototype.has", !0), DC = Cr("Map.prototype.get", !0), NC = Cr("Map.prototyp\
e.set", !0), qC = Cr("Map.prototype.has", !0), ki = /* @__PURE__ */ n(function(r, e) {
    for (var t = r, o; (o = t.next) !== null; t = o)
      if (o.key === e)
        return t.next = o.next, o.next = r.next, r.next = o, o;
  }, "listGetNode"), LC = /* @__PURE__ */ n(function(r, e) {
    var t = ki(r, e);
    return t && t.value;
  }, "listGet"), MC = /* @__PURE__ */ n(function(r, e, t) {
    var o = ki(r, e);
    o ? o.value = t : r.next = {
      // eslint-disable-line no-param-reassign
      key: e,
      next: r.next,
      value: t
    };
  }, "listSet"), kC = /* @__PURE__ */ n(function(r, e) {
    return !!ki(r, e);
  }, "listHas");
  ch.exports = /* @__PURE__ */ n(function() {
    var e, t, o, a = {
      assert: /* @__PURE__ */ n(function(i) {
        if (!a.has(i))
          throw new OC("Side channel does not contain " + PC(i));
      }, "assert"),
      get: /* @__PURE__ */ n(function(i) {
        if (jo && i && (typeof i == "object" || typeof i == "function")) {
          if (e)
            return CC(e, i);
        } else if (Bo) {
          if (t)
            return DC(t, i);
        } else if (o)
          return LC(o, i);
      }, "get"),
      has: /* @__PURE__ */ n(function(i) {
        if (jo && i && (typeof i == "object" || typeof i == "function")) {
          if (e)
            return FC(e, i);
        } else if (Bo) {
          if (t)
            return qC(t, i);
        } else if (o)
          return kC(o, i);
        return !1;
      }, "has"),
      set: /* @__PURE__ */ n(function(i, l) {
        jo && i && (typeof i == "object" || typeof i == "function") ? (e || (e = new jo()), IC(e, i, l)) : Bo ? (t || (t = new Bo()), NC(t, i,
        l)) : (o || (o = { key: {}, next: null }), MC(o, i, l));
      }, "set")
    };
    return a;
  }, "getSideChannel");
});

// ../node_modules/qs/lib/formats.js
var Uo = d((tB, ph) => {
  "use strict";
  var jC = String.prototype.replace, BC = /%20/g, ji = {
    RFC1738: "RFC1738",
    RFC3986: "RFC3986"
  };
  ph.exports = {
    default: ji.RFC3986,
    formatters: {
      RFC1738: /* @__PURE__ */ n(function(r) {
        return jC.call(r, BC, "+");
      }, "RFC1738"),
      RFC3986: /* @__PURE__ */ n(function(r) {
        return String(r);
      }, "RFC3986")
    },
    RFC1738: ji.RFC1738,
    RFC3986: ji.RFC3986
  };
});

// ../node_modules/qs/lib/utils.js
var Ui = d((nB, fh) => {
  "use strict";
  var UC = Uo(), Bi = Object.prototype.hasOwnProperty, Ve = Array.isArray, ce = function() {
    for (var r = [], e = 0; e < 256; ++e)
      r.push("%" + ((e < 16 ? "0" : "") + e.toString(16)).toUpperCase());
    return r;
  }(), GC = /* @__PURE__ */ n(function(e) {
    for (; e.length > 1; ) {
      var t = e.pop(), o = t.obj[t.prop];
      if (Ve(o)) {
        for (var a = [], i = 0; i < o.length; ++i)
          typeof o[i] < "u" && a.push(o[i]);
        t.obj[t.prop] = a;
      }
    }
  }, "compactQueue"), dh = /* @__PURE__ */ n(function(e, t) {
    for (var o = t && t.plainObjects ? /* @__PURE__ */ Object.create(null) : {}, a = 0; a < e.length; ++a)
      typeof e[a] < "u" && (o[a] = e[a]);
    return o;
  }, "arrayToObject"), HC = /* @__PURE__ */ n(function r(e, t, o) {
    if (!t)
      return e;
    if (typeof t != "object") {
      if (Ve(e))
        e.push(t);
      else if (e && typeof e == "object")
        (o && (o.plainObjects || o.allowPrototypes) || !Bi.call(Object.prototype, t)) && (e[t] = !0);
      else
        return [e, t];
      return e;
    }
    if (!e || typeof e != "object")
      return [e].concat(t);
    var a = e;
    return Ve(e) && !Ve(t) && (a = dh(e, o)), Ve(e) && Ve(t) ? (t.forEach(function(i, l) {
      if (Bi.call(e, l)) {
        var c = e[l];
        c && typeof c == "object" && i && typeof i == "object" ? e[l] = r(c, i, o) : e.push(i);
      } else
        e[l] = i;
    }), e) : Object.keys(t).reduce(function(i, l) {
      var c = t[l];
      return Bi.call(i, l) ? i[l] = r(i[l], c, o) : i[l] = c, i;
    }, a);
  }, "merge"), VC = /* @__PURE__ */ n(function(e, t) {
    return Object.keys(t).reduce(function(o, a) {
      return o[a] = t[a], o;
    }, e);
  }, "assignSingleSource"), $C = /* @__PURE__ */ n(function(r, e, t) {
    var o = r.replace(/\+/g, " ");
    if (t === "iso-8859-1")
      return o.replace(/%[0-9a-f]{2}/gi, unescape);
    try {
      return decodeURIComponent(o);
    } catch {
      return o;
    }
  }, "decode"), WC = /* @__PURE__ */ n(function(e, t, o, a, i) {
    if (e.length === 0)
      return e;
    var l = e;
    if (typeof e == "symbol" ? l = Symbol.prototype.toString.call(e) : typeof e != "string" && (l = String(e)), o === "iso-8859-1")
      return escape(l).replace(/%u[0-9a-f]{4}/gi, function(p) {
        return "%26%23" + parseInt(p.slice(2), 16) + "%3B";
      });
    for (var c = "", s = 0; s < l.length; ++s) {
      var u = l.charCodeAt(s);
      if (u === 45 || u === 46 || u === 95 || u === 126 || u >= 48 && u <= 57 || u >= 65 && u <= 90 || u >= 97 && u <= 122 || i === UC.RFC1738 &&
      (u === 40 || u === 41)) {
        c += l.charAt(s);
        continue;
      }
      if (u < 128) {
        c = c + ce[u];
        continue;
      }
      if (u < 2048) {
        c = c + (ce[192 | u >> 6] + ce[128 | u & 63]);
        continue;
      }
      if (u < 55296 || u >= 57344) {
        c = c + (ce[224 | u >> 12] + ce[128 | u >> 6 & 63] + ce[128 | u & 63]);
        continue;
      }
      s += 1, u = 65536 + ((u & 1023) << 10 | l.charCodeAt(s) & 1023), c += ce[240 | u >> 18] + ce[128 | u >> 12 & 63] + ce[128 | u >> 6 & 63] +
      ce[128 | u & 63];
    }
    return c;
  }, "encode"), zC = /* @__PURE__ */ n(function(e) {
    for (var t = [{ obj: { o: e }, prop: "o" }], o = [], a = 0; a < t.length; ++a)
      for (var i = t[a], l = i.obj[i.prop], c = Object.keys(l), s = 0; s < c.length; ++s) {
        var u = c[s], p = l[u];
        typeof p == "object" && p !== null && o.indexOf(p) === -1 && (t.push({ obj: l, prop: u }), o.push(p));
      }
    return GC(t), e;
  }, "compact"), YC = /* @__PURE__ */ n(function(e) {
    return Object.prototype.toString.call(e) === "[object RegExp]";
  }, "isRegExp"), KC = /* @__PURE__ */ n(function(e) {
    return !e || typeof e != "object" ? !1 : !!(e.constructor && e.constructor.isBuffer && e.constructor.isBuffer(e));
  }, "isBuffer"), XC = /* @__PURE__ */ n(function(e, t) {
    return [].concat(e, t);
  }, "combine"), JC = /* @__PURE__ */ n(function(e, t) {
    if (Ve(e)) {
      for (var o = [], a = 0; a < e.length; a += 1)
        o.push(t(e[a]));
      return o;
    }
    return t(e);
  }, "maybeMap");
  fh.exports = {
    arrayToObject: dh,
    assign: VC,
    combine: XC,
    compact: zC,
    decode: $C,
    encode: WC,
    isBuffer: KC,
    isRegExp: YC,
    maybeMap: JC,
    merge: HC
  };
});

// ../node_modules/qs/lib/stringify.js
var bh = d((iB, Sh) => {
  "use strict";
  var mh = uh(), Go = Ui(), xt = Uo(), QC = Object.prototype.hasOwnProperty, yh = {
    brackets: /* @__PURE__ */ n(function(e) {
      return e + "[]";
    }, "brackets"),
    comma: "comma",
    indices: /* @__PURE__ */ n(function(e, t) {
      return e + "[" + t + "]";
    }, "indices"),
    repeat: /* @__PURE__ */ n(function(e) {
      return e;
    }, "repeat")
  }, he = Array.isArray, ZC = Array.prototype.push, gh = /* @__PURE__ */ n(function(r, e) {
    ZC.apply(r, he(e) ? e : [e]);
  }, "pushToArray"), eI = Date.prototype.toISOString, hh = xt.default, K = {
    addQueryPrefix: !1,
    allowDots: !1,
    charset: "utf-8",
    charsetSentinel: !1,
    delimiter: "&",
    encode: !0,
    encoder: Go.encode,
    encodeValuesOnly: !1,
    format: hh,
    formatter: xt.formatters[hh],
    // deprecated
    indices: !1,
    serializeDate: /* @__PURE__ */ n(function(e) {
      return eI.call(e);
    }, "serializeDate"),
    skipNulls: !1,
    strictNullHandling: !1
  }, rI = /* @__PURE__ */ n(function(e) {
    return typeof e == "string" || typeof e == "number" || typeof e == "boolean" || typeof e == "symbol" || typeof e == "bigint";
  }, "isNonNullishPrimitive"), Gi = {}, tI = /* @__PURE__ */ n(function r(e, t, o, a, i, l, c, s, u, p, y, h, g, m, b, S) {
    for (var T = e, v = S, E = 0, x = !1; (v = v.get(Gi)) !== void 0 && !x; ) {
      var A = v.get(e);
      if (E += 1, typeof A < "u") {
        if (A === E)
          throw new RangeError("Cyclic object value");
        x = !0;
      }
      typeof v.get(Gi) > "u" && (E = 0);
    }
    if (typeof s == "function" ? T = s(t, T) : T instanceof Date ? T = y(T) : o === "comma" && he(T) && (T = Go.maybeMap(T, function(U) {
      return U instanceof Date ? y(U) : U;
    })), T === null) {
      if (i)
        return c && !m ? c(t, K.encoder, b, "key", h) : t;
      T = "";
    }
    if (rI(T) || Go.isBuffer(T)) {
      if (c) {
        var C = m ? t : c(t, K.encoder, b, "key", h);
        return [g(C) + "=" + g(c(T, K.encoder, b, "value", h))];
      }
      return [g(t) + "=" + g(String(T))];
    }
    var N = [];
    if (typeof T > "u")
      return N;
    var P;
    if (o === "comma" && he(T))
      m && c && (T = Go.maybeMap(T, c)), P = [{ value: T.length > 0 ? T.join(",") || null : void 0 }];
    else if (he(s))
      P = s;
    else {
      var H = Object.keys(T);
      P = u ? H.sort(u) : H;
    }
    for (var te = a && he(T) && T.length === 1 ? t + "[]" : t, pe = 0; pe < P.length; ++pe) {
      var q = P[pe], D = typeof q == "object" && typeof q.value < "u" ? q.value : T[q];
      if (!(l && D === null)) {
        var k = he(T) ? typeof o == "function" ? o(te, q) : te : te + (p ? "." + q : "[" + q + "]");
        S.set(e, E);
        var L = mh();
        L.set(Gi, S), gh(N, r(
          D,
          k,
          o,
          a,
          i,
          l,
          o === "comma" && m && he(T) ? null : c,
          s,
          u,
          p,
          y,
          h,
          g,
          m,
          b,
          L
        ));
      }
    }
    return N;
  }, "stringify"), oI = /* @__PURE__ */ n(function(e) {
    if (!e)
      return K;
    if (e.encoder !== null && typeof e.encoder < "u" && typeof e.encoder != "function")
      throw new TypeError("Encoder has to be a function.");
    var t = e.charset || K.charset;
    if (typeof e.charset < "u" && e.charset !== "utf-8" && e.charset !== "iso-8859-1")
      throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");
    var o = xt.default;
    if (typeof e.format < "u") {
      if (!QC.call(xt.formatters, e.format))
        throw new TypeError("Unknown format option provided.");
      o = e.format;
    }
    var a = xt.formatters[o], i = K.filter;
    return (typeof e.filter == "function" || he(e.filter)) && (i = e.filter), {
      addQueryPrefix: typeof e.addQueryPrefix == "boolean" ? e.addQueryPrefix : K.addQueryPrefix,
      allowDots: typeof e.allowDots > "u" ? K.allowDots : !!e.allowDots,
      charset: t,
      charsetSentinel: typeof e.charsetSentinel == "boolean" ? e.charsetSentinel : K.charsetSentinel,
      delimiter: typeof e.delimiter > "u" ? K.delimiter : e.delimiter,
      encode: typeof e.encode == "boolean" ? e.encode : K.encode,
      encoder: typeof e.encoder == "function" ? e.encoder : K.encoder,
      encodeValuesOnly: typeof e.encodeValuesOnly == "boolean" ? e.encodeValuesOnly : K.encodeValuesOnly,
      filter: i,
      format: o,
      formatter: a,
      serializeDate: typeof e.serializeDate == "function" ? e.serializeDate : K.serializeDate,
      skipNulls: typeof e.skipNulls == "boolean" ? e.skipNulls : K.skipNulls,
      sort: typeof e.sort == "function" ? e.sort : null,
      strictNullHandling: typeof e.strictNullHandling == "boolean" ? e.strictNullHandling : K.strictNullHandling
    };
  }, "normalizeStringifyOptions");
  Sh.exports = function(r, e) {
    var t = r, o = oI(e), a, i;
    typeof o.filter == "function" ? (i = o.filter, t = i("", t)) : he(o.filter) && (i = o.filter, a = i);
    var l = [];
    if (typeof t != "object" || t === null)
      return "";
    var c;
    e && e.arrayFormat in yh ? c = e.arrayFormat : e && "indices" in e ? c = e.indices ? "indices" : "repeat" : c = "indices";
    var s = yh[c];
    if (e && "commaRoundTrip" in e && typeof e.commaRoundTrip != "boolean")
      throw new TypeError("`commaRoundTrip` must be a boolean, or absent");
    var u = s === "comma" && e && e.commaRoundTrip;
    a || (a = Object.keys(t)), o.sort && a.sort(o.sort);
    for (var p = mh(), y = 0; y < a.length; ++y) {
      var h = a[y];
      o.skipNulls && t[h] === null || gh(l, tI(
        t[h],
        h,
        s,
        u,
        o.strictNullHandling,
        o.skipNulls,
        o.encode ? o.encoder : null,
        o.filter,
        o.sort,
        o.allowDots,
        o.serializeDate,
        o.format,
        o.formatter,
        o.encodeValuesOnly,
        o.charset,
        p
      ));
    }
    var g = l.join(o.delimiter), m = o.addQueryPrefix === !0 ? "?" : "";
    return o.charsetSentinel && (o.charset === "iso-8859-1" ? m += "utf8=%26%2310003%3B&" : m += "utf8=%E2%9C%93&"), g.length > 0 ? m + g : "";
  };
});

// ../node_modules/qs/lib/parse.js
var Eh = d((lB, Th) => {
  "use strict";
  var Ir = Ui(), Hi = Object.prototype.hasOwnProperty, nI = Array.isArray, $ = {
    allowDots: !1,
    allowPrototypes: !1,
    allowSparse: !1,
    arrayLimit: 20,
    charset: "utf-8",
    charsetSentinel: !1,
    comma: !1,
    decoder: Ir.decode,
    delimiter: "&",
    depth: 5,
    ignoreQueryPrefix: !1,
    interpretNumericEntities: !1,
    parameterLimit: 1e3,
    parseArrays: !0,
    plainObjects: !1,
    strictNullHandling: !1
  }, aI = /* @__PURE__ */ n(function(r) {
    return r.replace(/&#(\d+);/g, function(e, t) {
      return String.fromCharCode(parseInt(t, 10));
    });
  }, "interpretNumericEntities"), vh = /* @__PURE__ */ n(function(r, e) {
    return r && typeof r == "string" && e.comma && r.indexOf(",") > -1 ? r.split(",") : r;
  }, "parseArrayValue"), iI = "utf8=%26%2310003%3B", sI = "utf8=%E2%9C%93", lI = /* @__PURE__ */ n(function(e, t) {
    var o = { __proto__: null }, a = t.ignoreQueryPrefix ? e.replace(/^\?/, "") : e, i = t.parameterLimit === 1 / 0 ? void 0 : t.parameterLimit,
    l = a.split(t.delimiter, i), c = -1, s, u = t.charset;
    if (t.charsetSentinel)
      for (s = 0; s < l.length; ++s)
        l[s].indexOf("utf8=") === 0 && (l[s] === sI ? u = "utf-8" : l[s] === iI && (u = "iso-8859-1"), c = s, s = l.length);
    for (s = 0; s < l.length; ++s)
      if (s !== c) {
        var p = l[s], y = p.indexOf("]="), h = y === -1 ? p.indexOf("=") : y + 1, g, m;
        h === -1 ? (g = t.decoder(p, $.decoder, u, "key"), m = t.strictNullHandling ? null : "") : (g = t.decoder(p.slice(0, h), $.decoder, u,
        "key"), m = Ir.maybeMap(
          vh(p.slice(h + 1), t),
          function(b) {
            return t.decoder(b, $.decoder, u, "value");
          }
        )), m && t.interpretNumericEntities && u === "iso-8859-1" && (m = aI(m)), p.indexOf("[]=") > -1 && (m = nI(m) ? [m] : m), Hi.call(o,
        g) ? o[g] = Ir.combine(o[g], m) : o[g] = m;
      }
    return o;
  }, "parseQueryStringValues"), cI = /* @__PURE__ */ n(function(r, e, t, o) {
    for (var a = o ? e : vh(e, t), i = r.length - 1; i >= 0; --i) {
      var l, c = r[i];
      if (c === "[]" && t.parseArrays)
        l = [].concat(a);
      else {
        l = t.plainObjects ? /* @__PURE__ */ Object.create(null) : {};
        var s = c.charAt(0) === "[" && c.charAt(c.length - 1) === "]" ? c.slice(1, -1) : c, u = parseInt(s, 10);
        !t.parseArrays && s === "" ? l = { 0: a } : !isNaN(u) && c !== s && String(u) === s && u >= 0 && t.parseArrays && u <= t.arrayLimit ?
        (l = [], l[u] = a) : s !== "__proto__" && (l[s] = a);
      }
      a = l;
    }
    return a;
  }, "parseObject"), uI = /* @__PURE__ */ n(function(e, t, o, a) {
    if (e) {
      var i = o.allowDots ? e.replace(/\.([^.[]+)/g, "[$1]") : e, l = /(\[[^[\]]*])/, c = /(\[[^[\]]*])/g, s = o.depth > 0 && l.exec(i), u = s ?
      i.slice(0, s.index) : i, p = [];
      if (u) {
        if (!o.plainObjects && Hi.call(Object.prototype, u) && !o.allowPrototypes)
          return;
        p.push(u);
      }
      for (var y = 0; o.depth > 0 && (s = c.exec(i)) !== null && y < o.depth; ) {
        if (y += 1, !o.plainObjects && Hi.call(Object.prototype, s[1].slice(1, -1)) && !o.allowPrototypes)
          return;
        p.push(s[1]);
      }
      return s && p.push("[" + i.slice(s.index) + "]"), cI(p, t, o, a);
    }
  }, "parseQueryStringKeys"), pI = /* @__PURE__ */ n(function(e) {
    if (!e)
      return $;
    if (e.decoder !== null && e.decoder !== void 0 && typeof e.decoder != "function")
      throw new TypeError("Decoder has to be a function.");
    if (typeof e.charset < "u" && e.charset !== "utf-8" && e.charset !== "iso-8859-1")
      throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");
    var t = typeof e.charset > "u" ? $.charset : e.charset;
    return {
      allowDots: typeof e.allowDots > "u" ? $.allowDots : !!e.allowDots,
      allowPrototypes: typeof e.allowPrototypes == "boolean" ? e.allowPrototypes : $.allowPrototypes,
      allowSparse: typeof e.allowSparse == "boolean" ? e.allowSparse : $.allowSparse,
      arrayLimit: typeof e.arrayLimit == "number" ? e.arrayLimit : $.arrayLimit,
      charset: t,
      charsetSentinel: typeof e.charsetSentinel == "boolean" ? e.charsetSentinel : $.charsetSentinel,
      comma: typeof e.comma == "boolean" ? e.comma : $.comma,
      decoder: typeof e.decoder == "function" ? e.decoder : $.decoder,
      delimiter: typeof e.delimiter == "string" || Ir.isRegExp(e.delimiter) ? e.delimiter : $.delimiter,
      // eslint-disable-next-line no-implicit-coercion, no-extra-parens
      depth: typeof e.depth == "number" || e.depth === !1 ? +e.depth : $.depth,
      ignoreQueryPrefix: e.ignoreQueryPrefix === !0,
      interpretNumericEntities: typeof e.interpretNumericEntities == "boolean" ? e.interpretNumericEntities : $.interpretNumericEntities,
      parameterLimit: typeof e.parameterLimit == "number" ? e.parameterLimit : $.parameterLimit,
      parseArrays: e.parseArrays !== !1,
      plainObjects: typeof e.plainObjects == "boolean" ? e.plainObjects : $.plainObjects,
      strictNullHandling: typeof e.strictNullHandling == "boolean" ? e.strictNullHandling : $.strictNullHandling
    };
  }, "normalizeParseOptions");
  Th.exports = function(r, e) {
    var t = pI(e);
    if (r === "" || r === null || typeof r > "u")
      return t.plainObjects ? /* @__PURE__ */ Object.create(null) : {};
    for (var o = typeof r == "string" ? lI(r, t) : r, a = t.plainObjects ? /* @__PURE__ */ Object.create(null) : {}, i = Object.keys(o), l = 0; l <
    i.length; ++l) {
      var c = i[l], s = uI(c, o[c], t, typeof r == "string");
      a = Ir.merge(a, s, t);
    }
    return t.allowSparse === !0 ? a : Ir.compact(a);
  };
});

// ../node_modules/qs/lib/index.js
var Ho = d((uB, Rh) => {
  "use strict";
  var dI = bh(), fI = Eh(), yI = Uo();
  Rh.exports = {
    formats: yI,
    parse: fI,
    stringify: dI
  };
});

// ../node_modules/ansi-to-html/node_modules/entities/lib/maps/entities.json
var zi = d((bB, TI) => {
  TI.exports = { Aacute: "\xC1", aacute: "\xE1", Abreve: "\u0102", abreve: "\u0103", ac: "\u223E", acd: "\u223F", acE: "\u223E\u0333", Acirc: "\
\xC2", acirc: "\xE2", acute: "\xB4", Acy: "\u0410", acy: "\u0430", AElig: "\xC6", aelig: "\xE6", af: "\u2061", Afr: "\u{1D504}", afr: "\u{1D51E}",
  Agrave: "\xC0", agrave: "\xE0", alefsym: "\u2135", aleph: "\u2135", Alpha: "\u0391", alpha: "\u03B1", Amacr: "\u0100", amacr: "\u0101", amalg: "\
\u2A3F", amp: "&", AMP: "&", andand: "\u2A55", And: "\u2A53", and: "\u2227", andd: "\u2A5C", andslope: "\u2A58", andv: "\u2A5A", ang: "\u2220",
  ange: "\u29A4", angle: "\u2220", angmsdaa: "\u29A8", angmsdab: "\u29A9", angmsdac: "\u29AA", angmsdad: "\u29AB", angmsdae: "\u29AC", angmsdaf: "\
\u29AD", angmsdag: "\u29AE", angmsdah: "\u29AF", angmsd: "\u2221", angrt: "\u221F", angrtvb: "\u22BE", angrtvbd: "\u299D", angsph: "\u2222",
  angst: "\xC5", angzarr: "\u237C", Aogon: "\u0104", aogon: "\u0105", Aopf: "\u{1D538}", aopf: "\u{1D552}", apacir: "\u2A6F", ap: "\u2248", apE: "\
\u2A70", ape: "\u224A", apid: "\u224B", apos: "'", ApplyFunction: "\u2061", approx: "\u2248", approxeq: "\u224A", Aring: "\xC5", aring: "\xE5",
  Ascr: "\u{1D49C}", ascr: "\u{1D4B6}", Assign: "\u2254", ast: "*", asymp: "\u2248", asympeq: "\u224D", Atilde: "\xC3", atilde: "\xE3", Auml: "\
\xC4", auml: "\xE4", awconint: "\u2233", awint: "\u2A11", backcong: "\u224C", backepsilon: "\u03F6", backprime: "\u2035", backsim: "\u223D",
  backsimeq: "\u22CD", Backslash: "\u2216", Barv: "\u2AE7", barvee: "\u22BD", barwed: "\u2305", Barwed: "\u2306", barwedge: "\u2305", bbrk: "\
\u23B5", bbrktbrk: "\u23B6", bcong: "\u224C", Bcy: "\u0411", bcy: "\u0431", bdquo: "\u201E", becaus: "\u2235", because: "\u2235", Because: "\
\u2235", bemptyv: "\u29B0", bepsi: "\u03F6", bernou: "\u212C", Bernoullis: "\u212C", Beta: "\u0392", beta: "\u03B2", beth: "\u2136", between: "\
\u226C", Bfr: "\u{1D505}", bfr: "\u{1D51F}", bigcap: "\u22C2", bigcirc: "\u25EF", bigcup: "\u22C3", bigodot: "\u2A00", bigoplus: "\u2A01", bigotimes: "\
\u2A02", bigsqcup: "\u2A06", bigstar: "\u2605", bigtriangledown: "\u25BD", bigtriangleup: "\u25B3", biguplus: "\u2A04", bigvee: "\u22C1", bigwedge: "\
\u22C0", bkarow: "\u290D", blacklozenge: "\u29EB", blacksquare: "\u25AA", blacktriangle: "\u25B4", blacktriangledown: "\u25BE", blacktriangleleft: "\
\u25C2", blacktriangleright: "\u25B8", blank: "\u2423", blk12: "\u2592", blk14: "\u2591", blk34: "\u2593", block: "\u2588", bne: "=\u20E5", bnequiv: "\
\u2261\u20E5", bNot: "\u2AED", bnot: "\u2310", Bopf: "\u{1D539}", bopf: "\u{1D553}", bot: "\u22A5", bottom: "\u22A5", bowtie: "\u22C8", boxbox: "\
\u29C9", boxdl: "\u2510", boxdL: "\u2555", boxDl: "\u2556", boxDL: "\u2557", boxdr: "\u250C", boxdR: "\u2552", boxDr: "\u2553", boxDR: "\u2554",
  boxh: "\u2500", boxH: "\u2550", boxhd: "\u252C", boxHd: "\u2564", boxhD: "\u2565", boxHD: "\u2566", boxhu: "\u2534", boxHu: "\u2567", boxhU: "\
\u2568", boxHU: "\u2569", boxminus: "\u229F", boxplus: "\u229E", boxtimes: "\u22A0", boxul: "\u2518", boxuL: "\u255B", boxUl: "\u255C", boxUL: "\
\u255D", boxur: "\u2514", boxuR: "\u2558", boxUr: "\u2559", boxUR: "\u255A", boxv: "\u2502", boxV: "\u2551", boxvh: "\u253C", boxvH: "\u256A",
  boxVh: "\u256B", boxVH: "\u256C", boxvl: "\u2524", boxvL: "\u2561", boxVl: "\u2562", boxVL: "\u2563", boxvr: "\u251C", boxvR: "\u255E", boxVr: "\
\u255F", boxVR: "\u2560", bprime: "\u2035", breve: "\u02D8", Breve: "\u02D8", brvbar: "\xA6", bscr: "\u{1D4B7}", Bscr: "\u212C", bsemi: "\u204F",
  bsim: "\u223D", bsime: "\u22CD", bsolb: "\u29C5", bsol: "\\", bsolhsub: "\u27C8", bull: "\u2022", bullet: "\u2022", bump: "\u224E", bumpE: "\
\u2AAE", bumpe: "\u224F", Bumpeq: "\u224E", bumpeq: "\u224F", Cacute: "\u0106", cacute: "\u0107", capand: "\u2A44", capbrcup: "\u2A49", capcap: "\
\u2A4B", cap: "\u2229", Cap: "\u22D2", capcup: "\u2A47", capdot: "\u2A40", CapitalDifferentialD: "\u2145", caps: "\u2229\uFE00", caret: "\u2041",
  caron: "\u02C7", Cayleys: "\u212D", ccaps: "\u2A4D", Ccaron: "\u010C", ccaron: "\u010D", Ccedil: "\xC7", ccedil: "\xE7", Ccirc: "\u0108", ccirc: "\
\u0109", Cconint: "\u2230", ccups: "\u2A4C", ccupssm: "\u2A50", Cdot: "\u010A", cdot: "\u010B", cedil: "\xB8", Cedilla: "\xB8", cemptyv: "\u29B2",
  cent: "\xA2", centerdot: "\xB7", CenterDot: "\xB7", cfr: "\u{1D520}", Cfr: "\u212D", CHcy: "\u0427", chcy: "\u0447", check: "\u2713", checkmark: "\
\u2713", Chi: "\u03A7", chi: "\u03C7", circ: "\u02C6", circeq: "\u2257", circlearrowleft: "\u21BA", circlearrowright: "\u21BB", circledast: "\
\u229B", circledcirc: "\u229A", circleddash: "\u229D", CircleDot: "\u2299", circledR: "\xAE", circledS: "\u24C8", CircleMinus: "\u2296", CirclePlus: "\
\u2295", CircleTimes: "\u2297", cir: "\u25CB", cirE: "\u29C3", cire: "\u2257", cirfnint: "\u2A10", cirmid: "\u2AEF", cirscir: "\u29C2", ClockwiseContourIntegral: "\
\u2232", CloseCurlyDoubleQuote: "\u201D", CloseCurlyQuote: "\u2019", clubs: "\u2663", clubsuit: "\u2663", colon: ":", Colon: "\u2237", Colone: "\
\u2A74", colone: "\u2254", coloneq: "\u2254", comma: ",", commat: "@", comp: "\u2201", compfn: "\u2218", complement: "\u2201", complexes: "\u2102",
  cong: "\u2245", congdot: "\u2A6D", Congruent: "\u2261", conint: "\u222E", Conint: "\u222F", ContourIntegral: "\u222E", copf: "\u{1D554}", Copf: "\
\u2102", coprod: "\u2210", Coproduct: "\u2210", copy: "\xA9", COPY: "\xA9", copysr: "\u2117", CounterClockwiseContourIntegral: "\u2233", crarr: "\
\u21B5", cross: "\u2717", Cross: "\u2A2F", Cscr: "\u{1D49E}", cscr: "\u{1D4B8}", csub: "\u2ACF", csube: "\u2AD1", csup: "\u2AD0", csupe: "\u2AD2",
  ctdot: "\u22EF", cudarrl: "\u2938", cudarrr: "\u2935", cuepr: "\u22DE", cuesc: "\u22DF", cularr: "\u21B6", cularrp: "\u293D", cupbrcap: "\u2A48",
  cupcap: "\u2A46", CupCap: "\u224D", cup: "\u222A", Cup: "\u22D3", cupcup: "\u2A4A", cupdot: "\u228D", cupor: "\u2A45", cups: "\u222A\uFE00",
  curarr: "\u21B7", curarrm: "\u293C", curlyeqprec: "\u22DE", curlyeqsucc: "\u22DF", curlyvee: "\u22CE", curlywedge: "\u22CF", curren: "\xA4",
  curvearrowleft: "\u21B6", curvearrowright: "\u21B7", cuvee: "\u22CE", cuwed: "\u22CF", cwconint: "\u2232", cwint: "\u2231", cylcty: "\u232D",
  dagger: "\u2020", Dagger: "\u2021", daleth: "\u2138", darr: "\u2193", Darr: "\u21A1", dArr: "\u21D3", dash: "\u2010", Dashv: "\u2AE4", dashv: "\
\u22A3", dbkarow: "\u290F", dblac: "\u02DD", Dcaron: "\u010E", dcaron: "\u010F", Dcy: "\u0414", dcy: "\u0434", ddagger: "\u2021", ddarr: "\u21CA",
  DD: "\u2145", dd: "\u2146", DDotrahd: "\u2911", ddotseq: "\u2A77", deg: "\xB0", Del: "\u2207", Delta: "\u0394", delta: "\u03B4", demptyv: "\
\u29B1", dfisht: "\u297F", Dfr: "\u{1D507}", dfr: "\u{1D521}", dHar: "\u2965", dharl: "\u21C3", dharr: "\u21C2", DiacriticalAcute: "\xB4", DiacriticalDot: "\
\u02D9", DiacriticalDoubleAcute: "\u02DD", DiacriticalGrave: "`", DiacriticalTilde: "\u02DC", diam: "\u22C4", diamond: "\u22C4", Diamond: "\u22C4",
  diamondsuit: "\u2666", diams: "\u2666", die: "\xA8", DifferentialD: "\u2146", digamma: "\u03DD", disin: "\u22F2", div: "\xF7", divide: "\xF7",
  divideontimes: "\u22C7", divonx: "\u22C7", DJcy: "\u0402", djcy: "\u0452", dlcorn: "\u231E", dlcrop: "\u230D", dollar: "$", Dopf: "\u{1D53B}",
  dopf: "\u{1D555}", Dot: "\xA8", dot: "\u02D9", DotDot: "\u20DC", doteq: "\u2250", doteqdot: "\u2251", DotEqual: "\u2250", dotminus: "\u2238",
  dotplus: "\u2214", dotsquare: "\u22A1", doublebarwedge: "\u2306", DoubleContourIntegral: "\u222F", DoubleDot: "\xA8", DoubleDownArrow: "\u21D3",
  DoubleLeftArrow: "\u21D0", DoubleLeftRightArrow: "\u21D4", DoubleLeftTee: "\u2AE4", DoubleLongLeftArrow: "\u27F8", DoubleLongLeftRightArrow: "\
\u27FA", DoubleLongRightArrow: "\u27F9", DoubleRightArrow: "\u21D2", DoubleRightTee: "\u22A8", DoubleUpArrow: "\u21D1", DoubleUpDownArrow: "\
\u21D5", DoubleVerticalBar: "\u2225", DownArrowBar: "\u2913", downarrow: "\u2193", DownArrow: "\u2193", Downarrow: "\u21D3", DownArrowUpArrow: "\
\u21F5", DownBreve: "\u0311", downdownarrows: "\u21CA", downharpoonleft: "\u21C3", downharpoonright: "\u21C2", DownLeftRightVector: "\u2950",
  DownLeftTeeVector: "\u295E", DownLeftVectorBar: "\u2956", DownLeftVector: "\u21BD", DownRightTeeVector: "\u295F", DownRightVectorBar: "\u2957",
  DownRightVector: "\u21C1", DownTeeArrow: "\u21A7", DownTee: "\u22A4", drbkarow: "\u2910", drcorn: "\u231F", drcrop: "\u230C", Dscr: "\u{1D49F}",
  dscr: "\u{1D4B9}", DScy: "\u0405", dscy: "\u0455", dsol: "\u29F6", Dstrok: "\u0110", dstrok: "\u0111", dtdot: "\u22F1", dtri: "\u25BF", dtrif: "\
\u25BE", duarr: "\u21F5", duhar: "\u296F", dwangle: "\u29A6", DZcy: "\u040F", dzcy: "\u045F", dzigrarr: "\u27FF", Eacute: "\xC9", eacute: "\xE9",
  easter: "\u2A6E", Ecaron: "\u011A", ecaron: "\u011B", Ecirc: "\xCA", ecirc: "\xEA", ecir: "\u2256", ecolon: "\u2255", Ecy: "\u042D", ecy: "\
\u044D", eDDot: "\u2A77", Edot: "\u0116", edot: "\u0117", eDot: "\u2251", ee: "\u2147", efDot: "\u2252", Efr: "\u{1D508}", efr: "\u{1D522}",
  eg: "\u2A9A", Egrave: "\xC8", egrave: "\xE8", egs: "\u2A96", egsdot: "\u2A98", el: "\u2A99", Element: "\u2208", elinters: "\u23E7", ell: "\
\u2113", els: "\u2A95", elsdot: "\u2A97", Emacr: "\u0112", emacr: "\u0113", empty: "\u2205", emptyset: "\u2205", EmptySmallSquare: "\u25FB",
  emptyv: "\u2205", EmptyVerySmallSquare: "\u25AB", emsp13: "\u2004", emsp14: "\u2005", emsp: "\u2003", ENG: "\u014A", eng: "\u014B", ensp: "\
\u2002", Eogon: "\u0118", eogon: "\u0119", Eopf: "\u{1D53C}", eopf: "\u{1D556}", epar: "\u22D5", eparsl: "\u29E3", eplus: "\u2A71", epsi: "\u03B5",
  Epsilon: "\u0395", epsilon: "\u03B5", epsiv: "\u03F5", eqcirc: "\u2256", eqcolon: "\u2255", eqsim: "\u2242", eqslantgtr: "\u2A96", eqslantless: "\
\u2A95", Equal: "\u2A75", equals: "=", EqualTilde: "\u2242", equest: "\u225F", Equilibrium: "\u21CC", equiv: "\u2261", equivDD: "\u2A78", eqvparsl: "\
\u29E5", erarr: "\u2971", erDot: "\u2253", escr: "\u212F", Escr: "\u2130", esdot: "\u2250", Esim: "\u2A73", esim: "\u2242", Eta: "\u0397", eta: "\
\u03B7", ETH: "\xD0", eth: "\xF0", Euml: "\xCB", euml: "\xEB", euro: "\u20AC", excl: "!", exist: "\u2203", Exists: "\u2203", expectation: "\u2130",
  exponentiale: "\u2147", ExponentialE: "\u2147", fallingdotseq: "\u2252", Fcy: "\u0424", fcy: "\u0444", female: "\u2640", ffilig: "\uFB03",
  fflig: "\uFB00", ffllig: "\uFB04", Ffr: "\u{1D509}", ffr: "\u{1D523}", filig: "\uFB01", FilledSmallSquare: "\u25FC", FilledVerySmallSquare: "\
\u25AA", fjlig: "fj", flat: "\u266D", fllig: "\uFB02", fltns: "\u25B1", fnof: "\u0192", Fopf: "\u{1D53D}", fopf: "\u{1D557}", forall: "\u2200",
  ForAll: "\u2200", fork: "\u22D4", forkv: "\u2AD9", Fouriertrf: "\u2131", fpartint: "\u2A0D", frac12: "\xBD", frac13: "\u2153", frac14: "\xBC",
  frac15: "\u2155", frac16: "\u2159", frac18: "\u215B", frac23: "\u2154", frac25: "\u2156", frac34: "\xBE", frac35: "\u2157", frac38: "\u215C",
  frac45: "\u2158", frac56: "\u215A", frac58: "\u215D", frac78: "\u215E", frasl: "\u2044", frown: "\u2322", fscr: "\u{1D4BB}", Fscr: "\u2131",
  gacute: "\u01F5", Gamma: "\u0393", gamma: "\u03B3", Gammad: "\u03DC", gammad: "\u03DD", gap: "\u2A86", Gbreve: "\u011E", gbreve: "\u011F",
  Gcedil: "\u0122", Gcirc: "\u011C", gcirc: "\u011D", Gcy: "\u0413", gcy: "\u0433", Gdot: "\u0120", gdot: "\u0121", ge: "\u2265", gE: "\u2267",
  gEl: "\u2A8C", gel: "\u22DB", geq: "\u2265", geqq: "\u2267", geqslant: "\u2A7E", gescc: "\u2AA9", ges: "\u2A7E", gesdot: "\u2A80", gesdoto: "\
\u2A82", gesdotol: "\u2A84", gesl: "\u22DB\uFE00", gesles: "\u2A94", Gfr: "\u{1D50A}", gfr: "\u{1D524}", gg: "\u226B", Gg: "\u22D9", ggg: "\u22D9",
  gimel: "\u2137", GJcy: "\u0403", gjcy: "\u0453", gla: "\u2AA5", gl: "\u2277", glE: "\u2A92", glj: "\u2AA4", gnap: "\u2A8A", gnapprox: "\u2A8A",
  gne: "\u2A88", gnE: "\u2269", gneq: "\u2A88", gneqq: "\u2269", gnsim: "\u22E7", Gopf: "\u{1D53E}", gopf: "\u{1D558}", grave: "`", GreaterEqual: "\
\u2265", GreaterEqualLess: "\u22DB", GreaterFullEqual: "\u2267", GreaterGreater: "\u2AA2", GreaterLess: "\u2277", GreaterSlantEqual: "\u2A7E",
  GreaterTilde: "\u2273", Gscr: "\u{1D4A2}", gscr: "\u210A", gsim: "\u2273", gsime: "\u2A8E", gsiml: "\u2A90", gtcc: "\u2AA7", gtcir: "\u2A7A",
  gt: ">", GT: ">", Gt: "\u226B", gtdot: "\u22D7", gtlPar: "\u2995", gtquest: "\u2A7C", gtrapprox: "\u2A86", gtrarr: "\u2978", gtrdot: "\u22D7",
  gtreqless: "\u22DB", gtreqqless: "\u2A8C", gtrless: "\u2277", gtrsim: "\u2273", gvertneqq: "\u2269\uFE00", gvnE: "\u2269\uFE00", Hacek: "\u02C7",
  hairsp: "\u200A", half: "\xBD", hamilt: "\u210B", HARDcy: "\u042A", hardcy: "\u044A", harrcir: "\u2948", harr: "\u2194", hArr: "\u21D4", harrw: "\
\u21AD", Hat: "^", hbar: "\u210F", Hcirc: "\u0124", hcirc: "\u0125", hearts: "\u2665", heartsuit: "\u2665", hellip: "\u2026", hercon: "\u22B9",
  hfr: "\u{1D525}", Hfr: "\u210C", HilbertSpace: "\u210B", hksearow: "\u2925", hkswarow: "\u2926", hoarr: "\u21FF", homtht: "\u223B", hookleftarrow: "\
\u21A9", hookrightarrow: "\u21AA", hopf: "\u{1D559}", Hopf: "\u210D", horbar: "\u2015", HorizontalLine: "\u2500", hscr: "\u{1D4BD}", Hscr: "\
\u210B", hslash: "\u210F", Hstrok: "\u0126", hstrok: "\u0127", HumpDownHump: "\u224E", HumpEqual: "\u224F", hybull: "\u2043", hyphen: "\u2010",
  Iacute: "\xCD", iacute: "\xED", ic: "\u2063", Icirc: "\xCE", icirc: "\xEE", Icy: "\u0418", icy: "\u0438", Idot: "\u0130", IEcy: "\u0415", iecy: "\
\u0435", iexcl: "\xA1", iff: "\u21D4", ifr: "\u{1D526}", Ifr: "\u2111", Igrave: "\xCC", igrave: "\xEC", ii: "\u2148", iiiint: "\u2A0C", iiint: "\
\u222D", iinfin: "\u29DC", iiota: "\u2129", IJlig: "\u0132", ijlig: "\u0133", Imacr: "\u012A", imacr: "\u012B", image: "\u2111", ImaginaryI: "\
\u2148", imagline: "\u2110", imagpart: "\u2111", imath: "\u0131", Im: "\u2111", imof: "\u22B7", imped: "\u01B5", Implies: "\u21D2", incare: "\
\u2105", in: "\u2208", infin: "\u221E", infintie: "\u29DD", inodot: "\u0131", intcal: "\u22BA", int: "\u222B", Int: "\u222C", integers: "\u2124",
  Integral: "\u222B", intercal: "\u22BA", Intersection: "\u22C2", intlarhk: "\u2A17", intprod: "\u2A3C", InvisibleComma: "\u2063", InvisibleTimes: "\
\u2062", IOcy: "\u0401", iocy: "\u0451", Iogon: "\u012E", iogon: "\u012F", Iopf: "\u{1D540}", iopf: "\u{1D55A}", Iota: "\u0399", iota: "\u03B9",
  iprod: "\u2A3C", iquest: "\xBF", iscr: "\u{1D4BE}", Iscr: "\u2110", isin: "\u2208", isindot: "\u22F5", isinE: "\u22F9", isins: "\u22F4", isinsv: "\
\u22F3", isinv: "\u2208", it: "\u2062", Itilde: "\u0128", itilde: "\u0129", Iukcy: "\u0406", iukcy: "\u0456", Iuml: "\xCF", iuml: "\xEF", Jcirc: "\
\u0134", jcirc: "\u0135", Jcy: "\u0419", jcy: "\u0439", Jfr: "\u{1D50D}", jfr: "\u{1D527}", jmath: "\u0237", Jopf: "\u{1D541}", jopf: "\u{1D55B}",
  Jscr: "\u{1D4A5}", jscr: "\u{1D4BF}", Jsercy: "\u0408", jsercy: "\u0458", Jukcy: "\u0404", jukcy: "\u0454", Kappa: "\u039A", kappa: "\u03BA",
  kappav: "\u03F0", Kcedil: "\u0136", kcedil: "\u0137", Kcy: "\u041A", kcy: "\u043A", Kfr: "\u{1D50E}", kfr: "\u{1D528}", kgreen: "\u0138", KHcy: "\
\u0425", khcy: "\u0445", KJcy: "\u040C", kjcy: "\u045C", Kopf: "\u{1D542}", kopf: "\u{1D55C}", Kscr: "\u{1D4A6}", kscr: "\u{1D4C0}", lAarr: "\
\u21DA", Lacute: "\u0139", lacute: "\u013A", laemptyv: "\u29B4", lagran: "\u2112", Lambda: "\u039B", lambda: "\u03BB", lang: "\u27E8", Lang: "\
\u27EA", langd: "\u2991", langle: "\u27E8", lap: "\u2A85", Laplacetrf: "\u2112", laquo: "\xAB", larrb: "\u21E4", larrbfs: "\u291F", larr: "\u2190",
  Larr: "\u219E", lArr: "\u21D0", larrfs: "\u291D", larrhk: "\u21A9", larrlp: "\u21AB", larrpl: "\u2939", larrsim: "\u2973", larrtl: "\u21A2",
  latail: "\u2919", lAtail: "\u291B", lat: "\u2AAB", late: "\u2AAD", lates: "\u2AAD\uFE00", lbarr: "\u290C", lBarr: "\u290E", lbbrk: "\u2772",
  lbrace: "{", lbrack: "[", lbrke: "\u298B", lbrksld: "\u298F", lbrkslu: "\u298D", Lcaron: "\u013D", lcaron: "\u013E", Lcedil: "\u013B", lcedil: "\
\u013C", lceil: "\u2308", lcub: "{", Lcy: "\u041B", lcy: "\u043B", ldca: "\u2936", ldquo: "\u201C", ldquor: "\u201E", ldrdhar: "\u2967", ldrushar: "\
\u294B", ldsh: "\u21B2", le: "\u2264", lE: "\u2266", LeftAngleBracket: "\u27E8", LeftArrowBar: "\u21E4", leftarrow: "\u2190", LeftArrow: "\u2190",
  Leftarrow: "\u21D0", LeftArrowRightArrow: "\u21C6", leftarrowtail: "\u21A2", LeftCeiling: "\u2308", LeftDoubleBracket: "\u27E6", LeftDownTeeVector: "\
\u2961", LeftDownVectorBar: "\u2959", LeftDownVector: "\u21C3", LeftFloor: "\u230A", leftharpoondown: "\u21BD", leftharpoonup: "\u21BC", leftleftarrows: "\
\u21C7", leftrightarrow: "\u2194", LeftRightArrow: "\u2194", Leftrightarrow: "\u21D4", leftrightarrows: "\u21C6", leftrightharpoons: "\u21CB",
  leftrightsquigarrow: "\u21AD", LeftRightVector: "\u294E", LeftTeeArrow: "\u21A4", LeftTee: "\u22A3", LeftTeeVector: "\u295A", leftthreetimes: "\
\u22CB", LeftTriangleBar: "\u29CF", LeftTriangle: "\u22B2", LeftTriangleEqual: "\u22B4", LeftUpDownVector: "\u2951", LeftUpTeeVector: "\u2960",
  LeftUpVectorBar: "\u2958", LeftUpVector: "\u21BF", LeftVectorBar: "\u2952", LeftVector: "\u21BC", lEg: "\u2A8B", leg: "\u22DA", leq: "\u2264",
  leqq: "\u2266", leqslant: "\u2A7D", lescc: "\u2AA8", les: "\u2A7D", lesdot: "\u2A7F", lesdoto: "\u2A81", lesdotor: "\u2A83", lesg: "\u22DA\uFE00",
  lesges: "\u2A93", lessapprox: "\u2A85", lessdot: "\u22D6", lesseqgtr: "\u22DA", lesseqqgtr: "\u2A8B", LessEqualGreater: "\u22DA", LessFullEqual: "\
\u2266", LessGreater: "\u2276", lessgtr: "\u2276", LessLess: "\u2AA1", lesssim: "\u2272", LessSlantEqual: "\u2A7D", LessTilde: "\u2272", lfisht: "\
\u297C", lfloor: "\u230A", Lfr: "\u{1D50F}", lfr: "\u{1D529}", lg: "\u2276", lgE: "\u2A91", lHar: "\u2962", lhard: "\u21BD", lharu: "\u21BC",
  lharul: "\u296A", lhblk: "\u2584", LJcy: "\u0409", ljcy: "\u0459", llarr: "\u21C7", ll: "\u226A", Ll: "\u22D8", llcorner: "\u231E", Lleftarrow: "\
\u21DA", llhard: "\u296B", lltri: "\u25FA", Lmidot: "\u013F", lmidot: "\u0140", lmoustache: "\u23B0", lmoust: "\u23B0", lnap: "\u2A89", lnapprox: "\
\u2A89", lne: "\u2A87", lnE: "\u2268", lneq: "\u2A87", lneqq: "\u2268", lnsim: "\u22E6", loang: "\u27EC", loarr: "\u21FD", lobrk: "\u27E6", longleftarrow: "\
\u27F5", LongLeftArrow: "\u27F5", Longleftarrow: "\u27F8", longleftrightarrow: "\u27F7", LongLeftRightArrow: "\u27F7", Longleftrightarrow: "\
\u27FA", longmapsto: "\u27FC", longrightarrow: "\u27F6", LongRightArrow: "\u27F6", Longrightarrow: "\u27F9", looparrowleft: "\u21AB", looparrowright: "\
\u21AC", lopar: "\u2985", Lopf: "\u{1D543}", lopf: "\u{1D55D}", loplus: "\u2A2D", lotimes: "\u2A34", lowast: "\u2217", lowbar: "_", LowerLeftArrow: "\
\u2199", LowerRightArrow: "\u2198", loz: "\u25CA", lozenge: "\u25CA", lozf: "\u29EB", lpar: "(", lparlt: "\u2993", lrarr: "\u21C6", lrcorner: "\
\u231F", lrhar: "\u21CB", lrhard: "\u296D", lrm: "\u200E", lrtri: "\u22BF", lsaquo: "\u2039", lscr: "\u{1D4C1}", Lscr: "\u2112", lsh: "\u21B0",
  Lsh: "\u21B0", lsim: "\u2272", lsime: "\u2A8D", lsimg: "\u2A8F", lsqb: "[", lsquo: "\u2018", lsquor: "\u201A", Lstrok: "\u0141", lstrok: "\
\u0142", ltcc: "\u2AA6", ltcir: "\u2A79", lt: "<", LT: "<", Lt: "\u226A", ltdot: "\u22D6", lthree: "\u22CB", ltimes: "\u22C9", ltlarr: "\u2976",
  ltquest: "\u2A7B", ltri: "\u25C3", ltrie: "\u22B4", ltrif: "\u25C2", ltrPar: "\u2996", lurdshar: "\u294A", luruhar: "\u2966", lvertneqq: "\
\u2268\uFE00", lvnE: "\u2268\uFE00", macr: "\xAF", male: "\u2642", malt: "\u2720", maltese: "\u2720", Map: "\u2905", map: "\u21A6", mapsto: "\
\u21A6", mapstodown: "\u21A7", mapstoleft: "\u21A4", mapstoup: "\u21A5", marker: "\u25AE", mcomma: "\u2A29", Mcy: "\u041C", mcy: "\u043C", mdash: "\
\u2014", mDDot: "\u223A", measuredangle: "\u2221", MediumSpace: "\u205F", Mellintrf: "\u2133", Mfr: "\u{1D510}", mfr: "\u{1D52A}", mho: "\u2127",
  micro: "\xB5", midast: "*", midcir: "\u2AF0", mid: "\u2223", middot: "\xB7", minusb: "\u229F", minus: "\u2212", minusd: "\u2238", minusdu: "\
\u2A2A", MinusPlus: "\u2213", mlcp: "\u2ADB", mldr: "\u2026", mnplus: "\u2213", models: "\u22A7", Mopf: "\u{1D544}", mopf: "\u{1D55E}", mp: "\
\u2213", mscr: "\u{1D4C2}", Mscr: "\u2133", mstpos: "\u223E", Mu: "\u039C", mu: "\u03BC", multimap: "\u22B8", mumap: "\u22B8", nabla: "\u2207",
  Nacute: "\u0143", nacute: "\u0144", nang: "\u2220\u20D2", nap: "\u2249", napE: "\u2A70\u0338", napid: "\u224B\u0338", napos: "\u0149", napprox: "\
\u2249", natural: "\u266E", naturals: "\u2115", natur: "\u266E", nbsp: "\xA0", nbump: "\u224E\u0338", nbumpe: "\u224F\u0338", ncap: "\u2A43",
  Ncaron: "\u0147", ncaron: "\u0148", Ncedil: "\u0145", ncedil: "\u0146", ncong: "\u2247", ncongdot: "\u2A6D\u0338", ncup: "\u2A42", Ncy: "\u041D",
  ncy: "\u043D", ndash: "\u2013", nearhk: "\u2924", nearr: "\u2197", neArr: "\u21D7", nearrow: "\u2197", ne: "\u2260", nedot: "\u2250\u0338",
  NegativeMediumSpace: "\u200B", NegativeThickSpace: "\u200B", NegativeThinSpace: "\u200B", NegativeVeryThinSpace: "\u200B", nequiv: "\u2262",
  nesear: "\u2928", nesim: "\u2242\u0338", NestedGreaterGreater: "\u226B", NestedLessLess: "\u226A", NewLine: `
`, nexist: "\u2204", nexists: "\u2204", Nfr: "\u{1D511}", nfr: "\u{1D52B}", ngE: "\u2267\u0338", nge: "\u2271", ngeq: "\u2271", ngeqq: "\u2267\u0338",
  ngeqslant: "\u2A7E\u0338", nges: "\u2A7E\u0338", nGg: "\u22D9\u0338", ngsim: "\u2275", nGt: "\u226B\u20D2", ngt: "\u226F", ngtr: "\u226F",
  nGtv: "\u226B\u0338", nharr: "\u21AE", nhArr: "\u21CE", nhpar: "\u2AF2", ni: "\u220B", nis: "\u22FC", nisd: "\u22FA", niv: "\u220B", NJcy: "\
\u040A", njcy: "\u045A", nlarr: "\u219A", nlArr: "\u21CD", nldr: "\u2025", nlE: "\u2266\u0338", nle: "\u2270", nleftarrow: "\u219A", nLeftarrow: "\
\u21CD", nleftrightarrow: "\u21AE", nLeftrightarrow: "\u21CE", nleq: "\u2270", nleqq: "\u2266\u0338", nleqslant: "\u2A7D\u0338", nles: "\u2A7D\u0338",
  nless: "\u226E", nLl: "\u22D8\u0338", nlsim: "\u2274", nLt: "\u226A\u20D2", nlt: "\u226E", nltri: "\u22EA", nltrie: "\u22EC", nLtv: "\u226A\u0338",
  nmid: "\u2224", NoBreak: "\u2060", NonBreakingSpace: "\xA0", nopf: "\u{1D55F}", Nopf: "\u2115", Not: "\u2AEC", not: "\xAC", NotCongruent: "\
\u2262", NotCupCap: "\u226D", NotDoubleVerticalBar: "\u2226", NotElement: "\u2209", NotEqual: "\u2260", NotEqualTilde: "\u2242\u0338", NotExists: "\
\u2204", NotGreater: "\u226F", NotGreaterEqual: "\u2271", NotGreaterFullEqual: "\u2267\u0338", NotGreaterGreater: "\u226B\u0338", NotGreaterLess: "\
\u2279", NotGreaterSlantEqual: "\u2A7E\u0338", NotGreaterTilde: "\u2275", NotHumpDownHump: "\u224E\u0338", NotHumpEqual: "\u224F\u0338", notin: "\
\u2209", notindot: "\u22F5\u0338", notinE: "\u22F9\u0338", notinva: "\u2209", notinvb: "\u22F7", notinvc: "\u22F6", NotLeftTriangleBar: "\u29CF\u0338",
  NotLeftTriangle: "\u22EA", NotLeftTriangleEqual: "\u22EC", NotLess: "\u226E", NotLessEqual: "\u2270", NotLessGreater: "\u2278", NotLessLess: "\
\u226A\u0338", NotLessSlantEqual: "\u2A7D\u0338", NotLessTilde: "\u2274", NotNestedGreaterGreater: "\u2AA2\u0338", NotNestedLessLess: "\u2AA1\u0338",
  notni: "\u220C", notniva: "\u220C", notnivb: "\u22FE", notnivc: "\u22FD", NotPrecedes: "\u2280", NotPrecedesEqual: "\u2AAF\u0338", NotPrecedesSlantEqual: "\
\u22E0", NotReverseElement: "\u220C", NotRightTriangleBar: "\u29D0\u0338", NotRightTriangle: "\u22EB", NotRightTriangleEqual: "\u22ED", NotSquareSubset: "\
\u228F\u0338", NotSquareSubsetEqual: "\u22E2", NotSquareSuperset: "\u2290\u0338", NotSquareSupersetEqual: "\u22E3", NotSubset: "\u2282\u20D2",
  NotSubsetEqual: "\u2288", NotSucceeds: "\u2281", NotSucceedsEqual: "\u2AB0\u0338", NotSucceedsSlantEqual: "\u22E1", NotSucceedsTilde: "\u227F\u0338",
  NotSuperset: "\u2283\u20D2", NotSupersetEqual: "\u2289", NotTilde: "\u2241", NotTildeEqual: "\u2244", NotTildeFullEqual: "\u2247", NotTildeTilde: "\
\u2249", NotVerticalBar: "\u2224", nparallel: "\u2226", npar: "\u2226", nparsl: "\u2AFD\u20E5", npart: "\u2202\u0338", npolint: "\u2A14", npr: "\
\u2280", nprcue: "\u22E0", nprec: "\u2280", npreceq: "\u2AAF\u0338", npre: "\u2AAF\u0338", nrarrc: "\u2933\u0338", nrarr: "\u219B", nrArr: "\
\u21CF", nrarrw: "\u219D\u0338", nrightarrow: "\u219B", nRightarrow: "\u21CF", nrtri: "\u22EB", nrtrie: "\u22ED", nsc: "\u2281", nsccue: "\u22E1",
  nsce: "\u2AB0\u0338", Nscr: "\u{1D4A9}", nscr: "\u{1D4C3}", nshortmid: "\u2224", nshortparallel: "\u2226", nsim: "\u2241", nsime: "\u2244",
  nsimeq: "\u2244", nsmid: "\u2224", nspar: "\u2226", nsqsube: "\u22E2", nsqsupe: "\u22E3", nsub: "\u2284", nsubE: "\u2AC5\u0338", nsube: "\u2288",
  nsubset: "\u2282\u20D2", nsubseteq: "\u2288", nsubseteqq: "\u2AC5\u0338", nsucc: "\u2281", nsucceq: "\u2AB0\u0338", nsup: "\u2285", nsupE: "\
\u2AC6\u0338", nsupe: "\u2289", nsupset: "\u2283\u20D2", nsupseteq: "\u2289", nsupseteqq: "\u2AC6\u0338", ntgl: "\u2279", Ntilde: "\xD1", ntilde: "\
\xF1", ntlg: "\u2278", ntriangleleft: "\u22EA", ntrianglelefteq: "\u22EC", ntriangleright: "\u22EB", ntrianglerighteq: "\u22ED", Nu: "\u039D",
  nu: "\u03BD", num: "#", numero: "\u2116", numsp: "\u2007", nvap: "\u224D\u20D2", nvdash: "\u22AC", nvDash: "\u22AD", nVdash: "\u22AE", nVDash: "\
\u22AF", nvge: "\u2265\u20D2", nvgt: ">\u20D2", nvHarr: "\u2904", nvinfin: "\u29DE", nvlArr: "\u2902", nvle: "\u2264\u20D2", nvlt: "<\u20D2",
  nvltrie: "\u22B4\u20D2", nvrArr: "\u2903", nvrtrie: "\u22B5\u20D2", nvsim: "\u223C\u20D2", nwarhk: "\u2923", nwarr: "\u2196", nwArr: "\u21D6",
  nwarrow: "\u2196", nwnear: "\u2927", Oacute: "\xD3", oacute: "\xF3", oast: "\u229B", Ocirc: "\xD4", ocirc: "\xF4", ocir: "\u229A", Ocy: "\u041E",
  ocy: "\u043E", odash: "\u229D", Odblac: "\u0150", odblac: "\u0151", odiv: "\u2A38", odot: "\u2299", odsold: "\u29BC", OElig: "\u0152", oelig: "\
\u0153", ofcir: "\u29BF", Ofr: "\u{1D512}", ofr: "\u{1D52C}", ogon: "\u02DB", Ograve: "\xD2", ograve: "\xF2", ogt: "\u29C1", ohbar: "\u29B5",
  ohm: "\u03A9", oint: "\u222E", olarr: "\u21BA", olcir: "\u29BE", olcross: "\u29BB", oline: "\u203E", olt: "\u29C0", Omacr: "\u014C", omacr: "\
\u014D", Omega: "\u03A9", omega: "\u03C9", Omicron: "\u039F", omicron: "\u03BF", omid: "\u29B6", ominus: "\u2296", Oopf: "\u{1D546}", oopf: "\
\u{1D560}", opar: "\u29B7", OpenCurlyDoubleQuote: "\u201C", OpenCurlyQuote: "\u2018", operp: "\u29B9", oplus: "\u2295", orarr: "\u21BB", Or: "\
\u2A54", or: "\u2228", ord: "\u2A5D", order: "\u2134", orderof: "\u2134", ordf: "\xAA", ordm: "\xBA", origof: "\u22B6", oror: "\u2A56", orslope: "\
\u2A57", orv: "\u2A5B", oS: "\u24C8", Oscr: "\u{1D4AA}", oscr: "\u2134", Oslash: "\xD8", oslash: "\xF8", osol: "\u2298", Otilde: "\xD5", otilde: "\
\xF5", otimesas: "\u2A36", Otimes: "\u2A37", otimes: "\u2297", Ouml: "\xD6", ouml: "\xF6", ovbar: "\u233D", OverBar: "\u203E", OverBrace: "\u23DE",
  OverBracket: "\u23B4", OverParenthesis: "\u23DC", para: "\xB6", parallel: "\u2225", par: "\u2225", parsim: "\u2AF3", parsl: "\u2AFD", part: "\
\u2202", PartialD: "\u2202", Pcy: "\u041F", pcy: "\u043F", percnt: "%", period: ".", permil: "\u2030", perp: "\u22A5", pertenk: "\u2031", Pfr: "\
\u{1D513}", pfr: "\u{1D52D}", Phi: "\u03A6", phi: "\u03C6", phiv: "\u03D5", phmmat: "\u2133", phone: "\u260E", Pi: "\u03A0", pi: "\u03C0", pitchfork: "\
\u22D4", piv: "\u03D6", planck: "\u210F", planckh: "\u210E", plankv: "\u210F", plusacir: "\u2A23", plusb: "\u229E", pluscir: "\u2A22", plus: "\
+", plusdo: "\u2214", plusdu: "\u2A25", pluse: "\u2A72", PlusMinus: "\xB1", plusmn: "\xB1", plussim: "\u2A26", plustwo: "\u2A27", pm: "\xB1",
  Poincareplane: "\u210C", pointint: "\u2A15", popf: "\u{1D561}", Popf: "\u2119", pound: "\xA3", prap: "\u2AB7", Pr: "\u2ABB", pr: "\u227A",
  prcue: "\u227C", precapprox: "\u2AB7", prec: "\u227A", preccurlyeq: "\u227C", Precedes: "\u227A", PrecedesEqual: "\u2AAF", PrecedesSlantEqual: "\
\u227C", PrecedesTilde: "\u227E", preceq: "\u2AAF", precnapprox: "\u2AB9", precneqq: "\u2AB5", precnsim: "\u22E8", pre: "\u2AAF", prE: "\u2AB3",
  precsim: "\u227E", prime: "\u2032", Prime: "\u2033", primes: "\u2119", prnap: "\u2AB9", prnE: "\u2AB5", prnsim: "\u22E8", prod: "\u220F", Product: "\
\u220F", profalar: "\u232E", profline: "\u2312", profsurf: "\u2313", prop: "\u221D", Proportional: "\u221D", Proportion: "\u2237", propto: "\
\u221D", prsim: "\u227E", prurel: "\u22B0", Pscr: "\u{1D4AB}", pscr: "\u{1D4C5}", Psi: "\u03A8", psi: "\u03C8", puncsp: "\u2008", Qfr: "\u{1D514}",
  qfr: "\u{1D52E}", qint: "\u2A0C", qopf: "\u{1D562}", Qopf: "\u211A", qprime: "\u2057", Qscr: "\u{1D4AC}", qscr: "\u{1D4C6}", quaternions: "\
\u210D", quatint: "\u2A16", quest: "?", questeq: "\u225F", quot: '"', QUOT: '"', rAarr: "\u21DB", race: "\u223D\u0331", Racute: "\u0154", racute: "\
\u0155", radic: "\u221A", raemptyv: "\u29B3", rang: "\u27E9", Rang: "\u27EB", rangd: "\u2992", range: "\u29A5", rangle: "\u27E9", raquo: "\xBB",
  rarrap: "\u2975", rarrb: "\u21E5", rarrbfs: "\u2920", rarrc: "\u2933", rarr: "\u2192", Rarr: "\u21A0", rArr: "\u21D2", rarrfs: "\u291E", rarrhk: "\
\u21AA", rarrlp: "\u21AC", rarrpl: "\u2945", rarrsim: "\u2974", Rarrtl: "\u2916", rarrtl: "\u21A3", rarrw: "\u219D", ratail: "\u291A", rAtail: "\
\u291C", ratio: "\u2236", rationals: "\u211A", rbarr: "\u290D", rBarr: "\u290F", RBarr: "\u2910", rbbrk: "\u2773", rbrace: "}", rbrack: "]",
  rbrke: "\u298C", rbrksld: "\u298E", rbrkslu: "\u2990", Rcaron: "\u0158", rcaron: "\u0159", Rcedil: "\u0156", rcedil: "\u0157", rceil: "\u2309",
  rcub: "}", Rcy: "\u0420", rcy: "\u0440", rdca: "\u2937", rdldhar: "\u2969", rdquo: "\u201D", rdquor: "\u201D", rdsh: "\u21B3", real: "\u211C",
  realine: "\u211B", realpart: "\u211C", reals: "\u211D", Re: "\u211C", rect: "\u25AD", reg: "\xAE", REG: "\xAE", ReverseElement: "\u220B", ReverseEquilibrium: "\
\u21CB", ReverseUpEquilibrium: "\u296F", rfisht: "\u297D", rfloor: "\u230B", rfr: "\u{1D52F}", Rfr: "\u211C", rHar: "\u2964", rhard: "\u21C1",
  rharu: "\u21C0", rharul: "\u296C", Rho: "\u03A1", rho: "\u03C1", rhov: "\u03F1", RightAngleBracket: "\u27E9", RightArrowBar: "\u21E5", rightarrow: "\
\u2192", RightArrow: "\u2192", Rightarrow: "\u21D2", RightArrowLeftArrow: "\u21C4", rightarrowtail: "\u21A3", RightCeiling: "\u2309", RightDoubleBracket: "\
\u27E7", RightDownTeeVector: "\u295D", RightDownVectorBar: "\u2955", RightDownVector: "\u21C2", RightFloor: "\u230B", rightharpoondown: "\u21C1",
  rightharpoonup: "\u21C0", rightleftarrows: "\u21C4", rightleftharpoons: "\u21CC", rightrightarrows: "\u21C9", rightsquigarrow: "\u219D", RightTeeArrow: "\
\u21A6", RightTee: "\u22A2", RightTeeVector: "\u295B", rightthreetimes: "\u22CC", RightTriangleBar: "\u29D0", RightTriangle: "\u22B3", RightTriangleEqual: "\
\u22B5", RightUpDownVector: "\u294F", RightUpTeeVector: "\u295C", RightUpVectorBar: "\u2954", RightUpVector: "\u21BE", RightVectorBar: "\u2953",
  RightVector: "\u21C0", ring: "\u02DA", risingdotseq: "\u2253", rlarr: "\u21C4", rlhar: "\u21CC", rlm: "\u200F", rmoustache: "\u23B1", rmoust: "\
\u23B1", rnmid: "\u2AEE", roang: "\u27ED", roarr: "\u21FE", robrk: "\u27E7", ropar: "\u2986", ropf: "\u{1D563}", Ropf: "\u211D", roplus: "\u2A2E",
  rotimes: "\u2A35", RoundImplies: "\u2970", rpar: ")", rpargt: "\u2994", rppolint: "\u2A12", rrarr: "\u21C9", Rrightarrow: "\u21DB", rsaquo: "\
\u203A", rscr: "\u{1D4C7}", Rscr: "\u211B", rsh: "\u21B1", Rsh: "\u21B1", rsqb: "]", rsquo: "\u2019", rsquor: "\u2019", rthree: "\u22CC", rtimes: "\
\u22CA", rtri: "\u25B9", rtrie: "\u22B5", rtrif: "\u25B8", rtriltri: "\u29CE", RuleDelayed: "\u29F4", ruluhar: "\u2968", rx: "\u211E", Sacute: "\
\u015A", sacute: "\u015B", sbquo: "\u201A", scap: "\u2AB8", Scaron: "\u0160", scaron: "\u0161", Sc: "\u2ABC", sc: "\u227B", sccue: "\u227D",
  sce: "\u2AB0", scE: "\u2AB4", Scedil: "\u015E", scedil: "\u015F", Scirc: "\u015C", scirc: "\u015D", scnap: "\u2ABA", scnE: "\u2AB6", scnsim: "\
\u22E9", scpolint: "\u2A13", scsim: "\u227F", Scy: "\u0421", scy: "\u0441", sdotb: "\u22A1", sdot: "\u22C5", sdote: "\u2A66", searhk: "\u2925",
  searr: "\u2198", seArr: "\u21D8", searrow: "\u2198", sect: "\xA7", semi: ";", seswar: "\u2929", setminus: "\u2216", setmn: "\u2216", sext: "\
\u2736", Sfr: "\u{1D516}", sfr: "\u{1D530}", sfrown: "\u2322", sharp: "\u266F", SHCHcy: "\u0429", shchcy: "\u0449", SHcy: "\u0428", shcy: "\u0448",
  ShortDownArrow: "\u2193", ShortLeftArrow: "\u2190", shortmid: "\u2223", shortparallel: "\u2225", ShortRightArrow: "\u2192", ShortUpArrow: "\
\u2191", shy: "\xAD", Sigma: "\u03A3", sigma: "\u03C3", sigmaf: "\u03C2", sigmav: "\u03C2", sim: "\u223C", simdot: "\u2A6A", sime: "\u2243",
  simeq: "\u2243", simg: "\u2A9E", simgE: "\u2AA0", siml: "\u2A9D", simlE: "\u2A9F", simne: "\u2246", simplus: "\u2A24", simrarr: "\u2972", slarr: "\
\u2190", SmallCircle: "\u2218", smallsetminus: "\u2216", smashp: "\u2A33", smeparsl: "\u29E4", smid: "\u2223", smile: "\u2323", smt: "\u2AAA",
  smte: "\u2AAC", smtes: "\u2AAC\uFE00", SOFTcy: "\u042C", softcy: "\u044C", solbar: "\u233F", solb: "\u29C4", sol: "/", Sopf: "\u{1D54A}", sopf: "\
\u{1D564}", spades: "\u2660", spadesuit: "\u2660", spar: "\u2225", sqcap: "\u2293", sqcaps: "\u2293\uFE00", sqcup: "\u2294", sqcups: "\u2294\uFE00",
  Sqrt: "\u221A", sqsub: "\u228F", sqsube: "\u2291", sqsubset: "\u228F", sqsubseteq: "\u2291", sqsup: "\u2290", sqsupe: "\u2292", sqsupset: "\
\u2290", sqsupseteq: "\u2292", square: "\u25A1", Square: "\u25A1", SquareIntersection: "\u2293", SquareSubset: "\u228F", SquareSubsetEqual: "\
\u2291", SquareSuperset: "\u2290", SquareSupersetEqual: "\u2292", SquareUnion: "\u2294", squarf: "\u25AA", squ: "\u25A1", squf: "\u25AA", srarr: "\
\u2192", Sscr: "\u{1D4AE}", sscr: "\u{1D4C8}", ssetmn: "\u2216", ssmile: "\u2323", sstarf: "\u22C6", Star: "\u22C6", star: "\u2606", starf: "\
\u2605", straightepsilon: "\u03F5", straightphi: "\u03D5", strns: "\xAF", sub: "\u2282", Sub: "\u22D0", subdot: "\u2ABD", subE: "\u2AC5", sube: "\
\u2286", subedot: "\u2AC3", submult: "\u2AC1", subnE: "\u2ACB", subne: "\u228A", subplus: "\u2ABF", subrarr: "\u2979", subset: "\u2282", Subset: "\
\u22D0", subseteq: "\u2286", subseteqq: "\u2AC5", SubsetEqual: "\u2286", subsetneq: "\u228A", subsetneqq: "\u2ACB", subsim: "\u2AC7", subsub: "\
\u2AD5", subsup: "\u2AD3", succapprox: "\u2AB8", succ: "\u227B", succcurlyeq: "\u227D", Succeeds: "\u227B", SucceedsEqual: "\u2AB0", SucceedsSlantEqual: "\
\u227D", SucceedsTilde: "\u227F", succeq: "\u2AB0", succnapprox: "\u2ABA", succneqq: "\u2AB6", succnsim: "\u22E9", succsim: "\u227F", SuchThat: "\
\u220B", sum: "\u2211", Sum: "\u2211", sung: "\u266A", sup1: "\xB9", sup2: "\xB2", sup3: "\xB3", sup: "\u2283", Sup: "\u22D1", supdot: "\u2ABE",
  supdsub: "\u2AD8", supE: "\u2AC6", supe: "\u2287", supedot: "\u2AC4", Superset: "\u2283", SupersetEqual: "\u2287", suphsol: "\u27C9", suphsub: "\
\u2AD7", suplarr: "\u297B", supmult: "\u2AC2", supnE: "\u2ACC", supne: "\u228B", supplus: "\u2AC0", supset: "\u2283", Supset: "\u22D1", supseteq: "\
\u2287", supseteqq: "\u2AC6", supsetneq: "\u228B", supsetneqq: "\u2ACC", supsim: "\u2AC8", supsub: "\u2AD4", supsup: "\u2AD6", swarhk: "\u2926",
  swarr: "\u2199", swArr: "\u21D9", swarrow: "\u2199", swnwar: "\u292A", szlig: "\xDF", Tab: "	", target: "\u2316", Tau: "\u03A4", tau: "\u03C4",
  tbrk: "\u23B4", Tcaron: "\u0164", tcaron: "\u0165", Tcedil: "\u0162", tcedil: "\u0163", Tcy: "\u0422", tcy: "\u0442", tdot: "\u20DB", telrec: "\
\u2315", Tfr: "\u{1D517}", tfr: "\u{1D531}", there4: "\u2234", therefore: "\u2234", Therefore: "\u2234", Theta: "\u0398", theta: "\u03B8", thetasym: "\
\u03D1", thetav: "\u03D1", thickapprox: "\u2248", thicksim: "\u223C", ThickSpace: "\u205F\u200A", ThinSpace: "\u2009", thinsp: "\u2009", thkap: "\
\u2248", thksim: "\u223C", THORN: "\xDE", thorn: "\xFE", tilde: "\u02DC", Tilde: "\u223C", TildeEqual: "\u2243", TildeFullEqual: "\u2245", TildeTilde: "\
\u2248", timesbar: "\u2A31", timesb: "\u22A0", times: "\xD7", timesd: "\u2A30", tint: "\u222D", toea: "\u2928", topbot: "\u2336", topcir: "\u2AF1",
  top: "\u22A4", Topf: "\u{1D54B}", topf: "\u{1D565}", topfork: "\u2ADA", tosa: "\u2929", tprime: "\u2034", trade: "\u2122", TRADE: "\u2122",
  triangle: "\u25B5", triangledown: "\u25BF", triangleleft: "\u25C3", trianglelefteq: "\u22B4", triangleq: "\u225C", triangleright: "\u25B9",
  trianglerighteq: "\u22B5", tridot: "\u25EC", trie: "\u225C", triminus: "\u2A3A", TripleDot: "\u20DB", triplus: "\u2A39", trisb: "\u29CD", tritime: "\
\u2A3B", trpezium: "\u23E2", Tscr: "\u{1D4AF}", tscr: "\u{1D4C9}", TScy: "\u0426", tscy: "\u0446", TSHcy: "\u040B", tshcy: "\u045B", Tstrok: "\
\u0166", tstrok: "\u0167", twixt: "\u226C", twoheadleftarrow: "\u219E", twoheadrightarrow: "\u21A0", Uacute: "\xDA", uacute: "\xFA", uarr: "\
\u2191", Uarr: "\u219F", uArr: "\u21D1", Uarrocir: "\u2949", Ubrcy: "\u040E", ubrcy: "\u045E", Ubreve: "\u016C", ubreve: "\u016D", Ucirc: "\xDB",
  ucirc: "\xFB", Ucy: "\u0423", ucy: "\u0443", udarr: "\u21C5", Udblac: "\u0170", udblac: "\u0171", udhar: "\u296E", ufisht: "\u297E", Ufr: "\
\u{1D518}", ufr: "\u{1D532}", Ugrave: "\xD9", ugrave: "\xF9", uHar: "\u2963", uharl: "\u21BF", uharr: "\u21BE", uhblk: "\u2580", ulcorn: "\u231C",
  ulcorner: "\u231C", ulcrop: "\u230F", ultri: "\u25F8", Umacr: "\u016A", umacr: "\u016B", uml: "\xA8", UnderBar: "_", UnderBrace: "\u23DF",
  UnderBracket: "\u23B5", UnderParenthesis: "\u23DD", Union: "\u22C3", UnionPlus: "\u228E", Uogon: "\u0172", uogon: "\u0173", Uopf: "\u{1D54C}",
  uopf: "\u{1D566}", UpArrowBar: "\u2912", uparrow: "\u2191", UpArrow: "\u2191", Uparrow: "\u21D1", UpArrowDownArrow: "\u21C5", updownarrow: "\
\u2195", UpDownArrow: "\u2195", Updownarrow: "\u21D5", UpEquilibrium: "\u296E", upharpoonleft: "\u21BF", upharpoonright: "\u21BE", uplus: "\u228E",
  UpperLeftArrow: "\u2196", UpperRightArrow: "\u2197", upsi: "\u03C5", Upsi: "\u03D2", upsih: "\u03D2", Upsilon: "\u03A5", upsilon: "\u03C5",
  UpTeeArrow: "\u21A5", UpTee: "\u22A5", upuparrows: "\u21C8", urcorn: "\u231D", urcorner: "\u231D", urcrop: "\u230E", Uring: "\u016E", uring: "\
\u016F", urtri: "\u25F9", Uscr: "\u{1D4B0}", uscr: "\u{1D4CA}", utdot: "\u22F0", Utilde: "\u0168", utilde: "\u0169", utri: "\u25B5", utrif: "\
\u25B4", uuarr: "\u21C8", Uuml: "\xDC", uuml: "\xFC", uwangle: "\u29A7", vangrt: "\u299C", varepsilon: "\u03F5", varkappa: "\u03F0", varnothing: "\
\u2205", varphi: "\u03D5", varpi: "\u03D6", varpropto: "\u221D", varr: "\u2195", vArr: "\u21D5", varrho: "\u03F1", varsigma: "\u03C2", varsubsetneq: "\
\u228A\uFE00", varsubsetneqq: "\u2ACB\uFE00", varsupsetneq: "\u228B\uFE00", varsupsetneqq: "\u2ACC\uFE00", vartheta: "\u03D1", vartriangleleft: "\
\u22B2", vartriangleright: "\u22B3", vBar: "\u2AE8", Vbar: "\u2AEB", vBarv: "\u2AE9", Vcy: "\u0412", vcy: "\u0432", vdash: "\u22A2", vDash: "\
\u22A8", Vdash: "\u22A9", VDash: "\u22AB", Vdashl: "\u2AE6", veebar: "\u22BB", vee: "\u2228", Vee: "\u22C1", veeeq: "\u225A", vellip: "\u22EE",
  verbar: "|", Verbar: "\u2016", vert: "|", Vert: "\u2016", VerticalBar: "\u2223", VerticalLine: "|", VerticalSeparator: "\u2758", VerticalTilde: "\
\u2240", VeryThinSpace: "\u200A", Vfr: "\u{1D519}", vfr: "\u{1D533}", vltri: "\u22B2", vnsub: "\u2282\u20D2", vnsup: "\u2283\u20D2", Vopf: "\
\u{1D54D}", vopf: "\u{1D567}", vprop: "\u221D", vrtri: "\u22B3", Vscr: "\u{1D4B1}", vscr: "\u{1D4CB}", vsubnE: "\u2ACB\uFE00", vsubne: "\u228A\uFE00",
  vsupnE: "\u2ACC\uFE00", vsupne: "\u228B\uFE00", Vvdash: "\u22AA", vzigzag: "\u299A", Wcirc: "\u0174", wcirc: "\u0175", wedbar: "\u2A5F", wedge: "\
\u2227", Wedge: "\u22C0", wedgeq: "\u2259", weierp: "\u2118", Wfr: "\u{1D51A}", wfr: "\u{1D534}", Wopf: "\u{1D54E}", wopf: "\u{1D568}", wp: "\
\u2118", wr: "\u2240", wreath: "\u2240", Wscr: "\u{1D4B2}", wscr: "\u{1D4CC}", xcap: "\u22C2", xcirc: "\u25EF", xcup: "\u22C3", xdtri: "\u25BD",
  Xfr: "\u{1D51B}", xfr: "\u{1D535}", xharr: "\u27F7", xhArr: "\u27FA", Xi: "\u039E", xi: "\u03BE", xlarr: "\u27F5", xlArr: "\u27F8", xmap: "\
\u27FC", xnis: "\u22FB", xodot: "\u2A00", Xopf: "\u{1D54F}", xopf: "\u{1D569}", xoplus: "\u2A01", xotime: "\u2A02", xrarr: "\u27F6", xrArr: "\
\u27F9", Xscr: "\u{1D4B3}", xscr: "\u{1D4CD}", xsqcup: "\u2A06", xuplus: "\u2A04", xutri: "\u25B3", xvee: "\u22C1", xwedge: "\u22C0", Yacute: "\
\xDD", yacute: "\xFD", YAcy: "\u042F", yacy: "\u044F", Ycirc: "\u0176", ycirc: "\u0177", Ycy: "\u042B", ycy: "\u044B", yen: "\xA5", Yfr: "\u{1D51C}",
  yfr: "\u{1D536}", YIcy: "\u0407", yicy: "\u0457", Yopf: "\u{1D550}", yopf: "\u{1D56A}", Yscr: "\u{1D4B4}", yscr: "\u{1D4CE}", YUcy: "\u042E",
  yucy: "\u044E", yuml: "\xFF", Yuml: "\u0178", Zacute: "\u0179", zacute: "\u017A", Zcaron: "\u017D", zcaron: "\u017E", Zcy: "\u0417", zcy: "\
\u0437", Zdot: "\u017B", zdot: "\u017C", zeetrf: "\u2128", ZeroWidthSpace: "\u200B", Zeta: "\u0396", zeta: "\u03B6", zfr: "\u{1D537}", Zfr: "\
\u2128", ZHcy: "\u0416", zhcy: "\u0436", zigrarr: "\u21DD", zopf: "\u{1D56B}", Zopf: "\u2124", Zscr: "\u{1D4B5}", zscr: "\u{1D4CF}", zwj: "\u200D",
  zwnj: "\u200C" };
});

// ../node_modules/ansi-to-html/node_modules/entities/lib/maps/legacy.json
var Ih = d((vB, EI) => {
  EI.exports = { Aacute: "\xC1", aacute: "\xE1", Acirc: "\xC2", acirc: "\xE2", acute: "\xB4", AElig: "\xC6", aelig: "\xE6", Agrave: "\xC0", agrave: "\
\xE0", amp: "&", AMP: "&", Aring: "\xC5", aring: "\xE5", Atilde: "\xC3", atilde: "\xE3", Auml: "\xC4", auml: "\xE4", brvbar: "\xA6", Ccedil: "\
\xC7", ccedil: "\xE7", cedil: "\xB8", cent: "\xA2", copy: "\xA9", COPY: "\xA9", curren: "\xA4", deg: "\xB0", divide: "\xF7", Eacute: "\xC9",
  eacute: "\xE9", Ecirc: "\xCA", ecirc: "\xEA", Egrave: "\xC8", egrave: "\xE8", ETH: "\xD0", eth: "\xF0", Euml: "\xCB", euml: "\xEB", frac12: "\
\xBD", frac14: "\xBC", frac34: "\xBE", gt: ">", GT: ">", Iacute: "\xCD", iacute: "\xED", Icirc: "\xCE", icirc: "\xEE", iexcl: "\xA1", Igrave: "\
\xCC", igrave: "\xEC", iquest: "\xBF", Iuml: "\xCF", iuml: "\xEF", laquo: "\xAB", lt: "<", LT: "<", macr: "\xAF", micro: "\xB5", middot: "\xB7",
  nbsp: "\xA0", not: "\xAC", Ntilde: "\xD1", ntilde: "\xF1", Oacute: "\xD3", oacute: "\xF3", Ocirc: "\xD4", ocirc: "\xF4", Ograve: "\xD2", ograve: "\
\xF2", ordf: "\xAA", ordm: "\xBA", Oslash: "\xD8", oslash: "\xF8", Otilde: "\xD5", otilde: "\xF5", Ouml: "\xD6", ouml: "\xF6", para: "\xB6",
  plusmn: "\xB1", pound: "\xA3", quot: '"', QUOT: '"', raquo: "\xBB", reg: "\xAE", REG: "\xAE", sect: "\xA7", shy: "\xAD", sup1: "\xB9", sup2: "\
\xB2", sup3: "\xB3", szlig: "\xDF", THORN: "\xDE", thorn: "\xFE", times: "\xD7", Uacute: "\xDA", uacute: "\xFA", Ucirc: "\xDB", ucirc: "\xFB",
  Ugrave: "\xD9", ugrave: "\xF9", uml: "\xA8", Uuml: "\xDC", uuml: "\xFC", Yacute: "\xDD", yacute: "\xFD", yen: "\xA5", yuml: "\xFF" };
});

// ../node_modules/ansi-to-html/node_modules/entities/lib/maps/xml.json
var Yi = d((TB, RI) => {
  RI.exports = { amp: "&", apos: "'", gt: ">", lt: "<", quot: '"' };
});

// ../node_modules/ansi-to-html/node_modules/entities/lib/maps/decode.json
var Fh = d((EB, AI) => {
  AI.exports = { "0": 65533, "128": 8364, "130": 8218, "131": 402, "132": 8222, "133": 8230, "134": 8224, "135": 8225, "136": 710, "137": 8240,
  "138": 352, "139": 8249, "140": 338, "142": 381, "145": 8216, "146": 8217, "147": 8220, "148": 8221, "149": 8226, "150": 8211, "151": 8212,
  "152": 732, "153": 8482, "154": 353, "155": 8250, "156": 339, "158": 382, "159": 376 };
});

// ../node_modules/ansi-to-html/node_modules/entities/lib/decode_codepoint.js
var Nh = d((Pt) => {
  "use strict";
  var wI = Pt && Pt.__importDefault || function(r) {
    return r && r.__esModule ? r : { default: r };
  };
  Object.defineProperty(Pt, "__esModule", { value: !0 });
  var Dh = wI(Fh()), xI = (
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    String.fromCodePoint || function(r) {
      var e = "";
      return r > 65535 && (r -= 65536, e += String.fromCharCode(r >>> 10 & 1023 | 55296), r = 56320 | r & 1023), e += String.fromCharCode(r),
      e;
    }
  );
  function _I(r) {
    return r >= 55296 && r <= 57343 || r > 1114111 ? "\uFFFD" : (r in Dh.default && (r = Dh.default[r]), xI(r));
  }
  n(_I, "decodeCodePoint");
  Pt.default = _I;
});

// ../node_modules/ansi-to-html/node_modules/entities/lib/decode.js
var Xi = d((ue) => {
  "use strict";
  var $o = ue && ue.__importDefault || function(r) {
    return r && r.__esModule ? r : { default: r };
  };
  Object.defineProperty(ue, "__esModule", { value: !0 });
  ue.decodeHTML = ue.decodeHTMLStrict = ue.decodeXML = void 0;
  var Ki = $o(zi()), PI = $o(Ih()), OI = $o(Yi()), qh = $o(Nh()), CI = /&(?:[a-zA-Z0-9]+|#[xX][\da-fA-F]+|#\d+);/g;
  ue.decodeXML = Mh(OI.default);
  ue.decodeHTMLStrict = Mh(Ki.default);
  function Mh(r) {
    var e = kh(r);
    return function(t) {
      return String(t).replace(CI, e);
    };
  }
  n(Mh, "getStrictDecoder");
  var Lh = /* @__PURE__ */ n(function(r, e) {
    return r < e ? 1 : -1;
  }, "sorter");
  ue.decodeHTML = function() {
    for (var r = Object.keys(PI.default).sort(Lh), e = Object.keys(Ki.default).sort(Lh), t = 0, o = 0; t < e.length; t++)
      r[o] === e[t] ? (e[t] += ";?", o++) : e[t] += ";";
    var a = new RegExp("&(?:" + e.join("|") + "|#[xX][\\da-fA-F]+;?|#\\d+;?)", "g"), i = kh(Ki.default);
    function l(c) {
      return c.substr(-1) !== ";" && (c += ";"), i(c);
    }
    return n(l, "replacer"), function(c) {
      return String(c).replace(a, l);
    };
  }();
  function kh(r) {
    return /* @__PURE__ */ n(function(t) {
      if (t.charAt(1) === "#") {
        var o = t.charAt(2);
        return o === "X" || o === "x" ? qh.default(parseInt(t.substr(3), 16)) : qh.default(parseInt(t.substr(2), 10));
      }
      return r[t.slice(1, -1)] || t;
    }, "replace");
  }
  n(kh, "getReplacer");
});

// ../node_modules/ansi-to-html/node_modules/entities/lib/encode.js
var Qi = d((ee) => {
  "use strict";
  var jh = ee && ee.__importDefault || function(r) {
    return r && r.__esModule ? r : { default: r };
  };
  Object.defineProperty(ee, "__esModule", { value: !0 });
  ee.escapeUTF8 = ee.escape = ee.encodeNonAsciiHTML = ee.encodeHTML = ee.encodeXML = void 0;
  var II = jh(Yi()), Bh = Gh(II.default), Uh = Hh(Bh);
  ee.encodeXML = Wh(Bh);
  var FI = jh(zi()), Ji = Gh(FI.default), DI = Hh(Ji);
  ee.encodeHTML = qI(Ji, DI);
  ee.encodeNonAsciiHTML = Wh(Ji);
  function Gh(r) {
    return Object.keys(r).sort().reduce(function(e, t) {
      return e[r[t]] = "&" + t + ";", e;
    }, {});
  }
  n(Gh, "getInverseObj");
  function Hh(r) {
    for (var e = [], t = [], o = 0, a = Object.keys(r); o < a.length; o++) {
      var i = a[o];
      i.length === 1 ? e.push("\\" + i) : t.push(i);
    }
    e.sort();
    for (var l = 0; l < e.length - 1; l++) {
      for (var c = l; c < e.length - 1 && e[c].charCodeAt(1) + 1 === e[c + 1].charCodeAt(1); )
        c += 1;
      var s = 1 + c - l;
      s < 3 || e.splice(l, s, e[l] + "-" + e[c]);
    }
    return t.unshift("[" + e.join("") + "]"), new RegExp(t.join("|"), "g");
  }
  n(Hh, "getInverseReplacer");
  var Vh = /(?:[\x80-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])/g,
  NI = (
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    String.prototype.codePointAt != null ? (
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      function(r) {
        return r.codePointAt(0);
      }
    ) : (
      // http://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
      function(r) {
        return (r.charCodeAt(0) - 55296) * 1024 + r.charCodeAt(1) - 56320 + 65536;
      }
    )
  );
  function Wo(r) {
    return "&#x" + (r.length > 1 ? NI(r) : r.charCodeAt(0)).toString(16).toUpperCase() + ";";
  }
  n(Wo, "singleCharReplacer");
  function qI(r, e) {
    return function(t) {
      return t.replace(e, function(o) {
        return r[o];
      }).replace(Vh, Wo);
    };
  }
  n(qI, "getInverse");
  var $h = new RegExp(Uh.source + "|" + Vh.source, "g");
  function LI(r) {
    return r.replace($h, Wo);
  }
  n(LI, "escape");
  ee.escape = LI;
  function MI(r) {
    return r.replace(Uh, Wo);
  }
  n(MI, "escapeUTF8");
  ee.escapeUTF8 = MI;
  function Wh(r) {
    return function(e) {
      return e.replace($h, function(t) {
        return r[t] || Wo(t);
      });
    };
  }
  n(Wh, "getASCIIEncoder");
});

// ../node_modules/ansi-to-html/node_modules/entities/lib/index.js
var Yh = d((O) => {
  "use strict";
  Object.defineProperty(O, "__esModule", { value: !0 });
  O.decodeXMLStrict = O.decodeHTML5Strict = O.decodeHTML4Strict = O.decodeHTML5 = O.decodeHTML4 = O.decodeHTMLStrict = O.decodeHTML = O.decodeXML =
  O.encodeHTML5 = O.encodeHTML4 = O.escapeUTF8 = O.escape = O.encodeNonAsciiHTML = O.encodeHTML = O.encodeXML = O.encode = O.decodeStrict = O.
  decode = void 0;
  var zo = Xi(), zh = Qi();
  function kI(r, e) {
    return (!e || e <= 0 ? zo.decodeXML : zo.decodeHTML)(r);
  }
  n(kI, "decode");
  O.decode = kI;
  function jI(r, e) {
    return (!e || e <= 0 ? zo.decodeXML : zo.decodeHTMLStrict)(r);
  }
  n(jI, "decodeStrict");
  O.decodeStrict = jI;
  function BI(r, e) {
    return (!e || e <= 0 ? zh.encodeXML : zh.encodeHTML)(r);
  }
  n(BI, "encode");
  O.encode = BI;
  var We = Qi();
  Object.defineProperty(O, "encodeXML", { enumerable: !0, get: /* @__PURE__ */ n(function() {
    return We.encodeXML;
  }, "get") });
  Object.defineProperty(O, "encodeHTML", { enumerable: !0, get: /* @__PURE__ */ n(function() {
    return We.encodeHTML;
  }, "get") });
  Object.defineProperty(O, "encodeNonAsciiHTML", { enumerable: !0, get: /* @__PURE__ */ n(function() {
    return We.encodeNonAsciiHTML;
  }, "get") });
  Object.defineProperty(O, "escape", { enumerable: !0, get: /* @__PURE__ */ n(function() {
    return We.escape;
  }, "get") });
  Object.defineProperty(O, "escapeUTF8", { enumerable: !0, get: /* @__PURE__ */ n(function() {
    return We.escapeUTF8;
  }, "get") });
  Object.defineProperty(O, "encodeHTML4", { enumerable: !0, get: /* @__PURE__ */ n(function() {
    return We.encodeHTML;
  }, "get") });
  Object.defineProperty(O, "encodeHTML5", { enumerable: !0, get: /* @__PURE__ */ n(function() {
    return We.encodeHTML;
  }, "get") });
  var xe = Xi();
  Object.defineProperty(O, "decodeXML", { enumerable: !0, get: /* @__PURE__ */ n(function() {
    return xe.decodeXML;
  }, "get") });
  Object.defineProperty(O, "decodeHTML", { enumerable: !0, get: /* @__PURE__ */ n(function() {
    return xe.decodeHTML;
  }, "get") });
  Object.defineProperty(O, "decodeHTMLStrict", { enumerable: !0, get: /* @__PURE__ */ n(function() {
    return xe.decodeHTMLStrict;
  }, "get") });
  Object.defineProperty(O, "decodeHTML4", { enumerable: !0, get: /* @__PURE__ */ n(function() {
    return xe.decodeHTML;
  }, "get") });
  Object.defineProperty(O, "decodeHTML5", { enumerable: !0, get: /* @__PURE__ */ n(function() {
    return xe.decodeHTML;
  }, "get") });
  Object.defineProperty(O, "decodeHTML4Strict", { enumerable: !0, get: /* @__PURE__ */ n(function() {
    return xe.decodeHTMLStrict;
  }, "get") });
  Object.defineProperty(O, "decodeHTML5Strict", { enumerable: !0, get: /* @__PURE__ */ n(function() {
    return xe.decodeHTMLStrict;
  }, "get") });
  Object.defineProperty(O, "decodeXMLStrict", { enumerable: !0, get: /* @__PURE__ */ n(function() {
    return xe.decodeXML;
  }, "get") });
});

// ../node_modules/ansi-to-html/lib/ansi_to_html.js
var am = d((IB, nm) => {
  "use strict";
  function UI(r, e) {
    if (!(r instanceof e))
      throw new TypeError("Cannot call a class as a function");
  }
  n(UI, "_classCallCheck");
  function Kh(r, e) {
    for (var t = 0; t < e.length; t++) {
      var o = e[t];
      o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(r, o.key, o);
    }
  }
  n(Kh, "_defineProperties");
  function GI(r, e, t) {
    return e && Kh(r.prototype, e), t && Kh(r, t), r;
  }
  n(GI, "_createClass");
  function rm(r, e) {
    var t = typeof Symbol < "u" && r[Symbol.iterator] || r["@@iterator"];
    if (!t) {
      if (Array.isArray(r) || (t = HI(r)) || e && r && typeof r.length == "number") {
        t && (r = t);
        var o = 0, a = /* @__PURE__ */ n(function() {
        }, "F");
        return { s: a, n: /* @__PURE__ */ n(function() {
          return o >= r.length ? { done: !0 } : { done: !1, value: r[o++] };
        }, "n"), e: /* @__PURE__ */ n(function(u) {
          throw u;
        }, "e"), f: a };
      }
      throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
    }
    var i = !0, l = !1, c;
    return { s: /* @__PURE__ */ n(function() {
      t = t.call(r);
    }, "s"), n: /* @__PURE__ */ n(function() {
      var u = t.next();
      return i = u.done, u;
    }, "n"), e: /* @__PURE__ */ n(function(u) {
      l = !0, c = u;
    }, "e"), f: /* @__PURE__ */ n(function() {
      try {
        !i && t.return != null && t.return();
      } finally {
        if (l) throw c;
      }
    }, "f") };
  }
  n(rm, "_createForOfIteratorHelper");
  function HI(r, e) {
    if (r) {
      if (typeof r == "string") return Xh(r, e);
      var t = Object.prototype.toString.call(r).slice(8, -1);
      if (t === "Object" && r.constructor && (t = r.constructor.name), t === "Map" || t === "Set") return Array.from(r);
      if (t === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)) return Xh(r, e);
    }
  }
  n(HI, "_unsupportedIterableToArray");
  function Xh(r, e) {
    (e == null || e > r.length) && (e = r.length);
    for (var t = 0, o = new Array(e); t < e; t++)
      o[t] = r[t];
    return o;
  }
  n(Xh, "_arrayLikeToArray");
  var VI = Yh(), Jh = {
    fg: "#FFF",
    bg: "#000",
    newline: !1,
    escapeXML: !1,
    stream: !1,
    colors: $I()
  };
  function $I() {
    var r = {
      0: "#000",
      1: "#A00",
      2: "#0A0",
      3: "#A50",
      4: "#00A",
      5: "#A0A",
      6: "#0AA",
      7: "#AAA",
      8: "#555",
      9: "#F55",
      10: "#5F5",
      11: "#FF5",
      12: "#55F",
      13: "#F5F",
      14: "#5FF",
      15: "#FFF"
    };
    return Yo(0, 5).forEach(function(e) {
      Yo(0, 5).forEach(function(t) {
        Yo(0, 5).forEach(function(o) {
          return WI(e, t, o, r);
        });
      });
    }), Yo(0, 23).forEach(function(e) {
      var t = e + 232, o = tm(e * 10 + 8);
      r[t] = "#" + o + o + o;
    }), r;
  }
  n($I, "getDefaultColors");
  function WI(r, e, t, o) {
    var a = 16 + r * 36 + e * 6 + t, i = r > 0 ? r * 40 + 55 : 0, l = e > 0 ? e * 40 + 55 : 0, c = t > 0 ? t * 40 + 55 : 0;
    o[a] = zI([i, l, c]);
  }
  n(WI, "setStyleColor");
  function tm(r) {
    for (var e = r.toString(16); e.length < 2; )
      e = "0" + e;
    return e;
  }
  n(tm, "toHexString");
  function zI(r) {
    var e = [], t = rm(r), o;
    try {
      for (t.s(); !(o = t.n()).done; ) {
        var a = o.value;
        e.push(tm(a));
      }
    } catch (i) {
      t.e(i);
    } finally {
      t.f();
    }
    return "#" + e.join("");
  }
  n(zI, "toColorHexString");
  function Qh(r, e, t, o) {
    var a;
    return e === "text" ? a = JI(t, o) : e === "display" ? a = KI(r, t, o) : e === "xterm256Foreground" ? a = Xo(r, o.colors[t]) : e === "xt\
erm256Background" ? a = Jo(r, o.colors[t]) : e === "rgb" && (a = YI(r, t)), a;
  }
  n(Qh, "generateOutput");
  function YI(r, e) {
    e = e.substring(2).slice(0, -1);
    var t = +e.substr(0, 2), o = e.substring(5).split(";"), a = o.map(function(i) {
      return ("0" + Number(i).toString(16)).substr(-2);
    }).join("");
    return Ko(r, (t === 38 ? "color:#" : "background-color:#") + a);
  }
  n(YI, "handleRgb");
  function KI(r, e, t) {
    e = parseInt(e, 10);
    var o = {
      "-1": /* @__PURE__ */ n(function() {
        return "<br/>";
      }, "_"),
      0: /* @__PURE__ */ n(function() {
        return r.length && om(r);
      }, "_"),
      1: /* @__PURE__ */ n(function() {
        return _e(r, "b");
      }, "_"),
      3: /* @__PURE__ */ n(function() {
        return _e(r, "i");
      }, "_"),
      4: /* @__PURE__ */ n(function() {
        return _e(r, "u");
      }, "_"),
      8: /* @__PURE__ */ n(function() {
        return Ko(r, "display:none");
      }, "_"),
      9: /* @__PURE__ */ n(function() {
        return _e(r, "strike");
      }, "_"),
      22: /* @__PURE__ */ n(function() {
        return Ko(r, "font-weight:normal;text-decoration:none;font-style:normal");
      }, "_"),
      23: /* @__PURE__ */ n(function() {
        return em(r, "i");
      }, "_"),
      24: /* @__PURE__ */ n(function() {
        return em(r, "u");
      }, "_"),
      39: /* @__PURE__ */ n(function() {
        return Xo(r, t.fg);
      }, "_"),
      49: /* @__PURE__ */ n(function() {
        return Jo(r, t.bg);
      }, "_"),
      53: /* @__PURE__ */ n(function() {
        return Ko(r, "text-decoration:overline");
      }, "_")
    }, a;
    return o[e] ? a = o[e]() : 4 < e && e < 7 ? a = _e(r, "blink") : 29 < e && e < 38 ? a = Xo(r, t.colors[e - 30]) : 39 < e && e < 48 ? a =
    Jo(r, t.colors[e - 40]) : 89 < e && e < 98 ? a = Xo(r, t.colors[8 + (e - 90)]) : 99 < e && e < 108 && (a = Jo(r, t.colors[8 + (e - 100)])),
    a;
  }
  n(KI, "handleDisplay");
  function om(r) {
    var e = r.slice(0);
    return r.length = 0, e.reverse().map(function(t) {
      return "</" + t + ">";
    }).join("");
  }
  n(om, "resetStyles");
  function Yo(r, e) {
    for (var t = [], o = r; o <= e; o++)
      t.push(o);
    return t;
  }
  n(Yo, "range");
  function XI(r) {
    return function(e) {
      return (r === null || e.category !== r) && r !== "all";
    };
  }
  n(XI, "notCategory");
  function Zh(r) {
    r = parseInt(r, 10);
    var e = null;
    return r === 0 ? e = "all" : r === 1 ? e = "bold" : 2 < r && r < 5 ? e = "underline" : 4 < r && r < 7 ? e = "blink" : r === 8 ? e = "hid\
e" : r === 9 ? e = "strike" : 29 < r && r < 38 || r === 39 || 89 < r && r < 98 ? e = "foreground-color" : (39 < r && r < 48 || r === 49 || 99 <
    r && r < 108) && (e = "background-color"), e;
  }
  n(Zh, "categoryForCode");
  function JI(r, e) {
    return e.escapeXML ? VI.encodeXML(r) : r;
  }
  n(JI, "pushText");
  function _e(r, e, t) {
    return t || (t = ""), r.push(e), "<".concat(e).concat(t ? ' style="'.concat(t, '"') : "", ">");
  }
  n(_e, "pushTag");
  function Ko(r, e) {
    return _e(r, "span", e);
  }
  n(Ko, "pushStyle");
  function Xo(r, e) {
    return _e(r, "span", "color:" + e);
  }
  n(Xo, "pushForegroundColor");
  function Jo(r, e) {
    return _e(r, "span", "background-color:" + e);
  }
  n(Jo, "pushBackgroundColor");
  function em(r, e) {
    var t;
    if (r.slice(-1)[0] === e && (t = r.pop()), t)
      return "</" + e + ">";
  }
  n(em, "closeTag");
  function QI(r, e, t) {
    var o = !1, a = 3;
    function i() {
      return "";
    }
    n(i, "remove");
    function l(A, C) {
      return t("xterm256Foreground", C), "";
    }
    n(l, "removeXterm256Foreground");
    function c(A, C) {
      return t("xterm256Background", C), "";
    }
    n(c, "removeXterm256Background");
    function s(A) {
      return e.newline ? t("display", -1) : t("text", A), "";
    }
    n(s, "newline");
    function u(A, C) {
      o = !0, C.trim().length === 0 && (C = "0"), C = C.trimRight(";").split(";");
      var N = rm(C), P;
      try {
        for (N.s(); !(P = N.n()).done; ) {
          var H = P.value;
          t("display", H);
        }
      } catch (te) {
        N.e(te);
      } finally {
        N.f();
      }
      return "";
    }
    n(u, "ansiMess");
    function p(A) {
      return t("text", A), "";
    }
    n(p, "realText");
    function y(A) {
      return t("rgb", A), "";
    }
    n(y, "rgb");
    var h = [{
      pattern: /^\x08+/,
      sub: i
    }, {
      pattern: /^\x1b\[[012]?K/,
      sub: i
    }, {
      pattern: /^\x1b\[\(B/,
      sub: i
    }, {
      pattern: /^\x1b\[[34]8;2;\d+;\d+;\d+m/,
      sub: y
    }, {
      pattern: /^\x1b\[38;5;(\d+)m/,
      sub: l
    }, {
      pattern: /^\x1b\[48;5;(\d+)m/,
      sub: c
    }, {
      pattern: /^\n/,
      sub: s
    }, {
      pattern: /^\r+\n/,
      sub: s
    }, {
      pattern: /^\r/,
      sub: s
    }, {
      pattern: /^\x1b\[((?:\d{1,3};?)+|)m/,
      sub: u
    }, {
      // CSI n J
      // ED - Erase in Display Clears part of the screen.
      // If n is 0 (or missing), clear from cursor to end of screen.
      // If n is 1, clear from cursor to beginning of the screen.
      // If n is 2, clear entire screen (and moves cursor to upper left on DOS ANSI.SYS).
      // If n is 3, clear entire screen and delete all lines saved in the scrollback buffer
      //   (this feature was added for xterm and is supported by other terminal applications).
      pattern: /^\x1b\[\d?J/,
      sub: i
    }, {
      // CSI n ; m f
      // HVP - Horizontal Vertical Position Same as CUP
      pattern: /^\x1b\[\d{0,3};\d{0,3}f/,
      sub: i
    }, {
      // catch-all for CSI sequences?
      pattern: /^\x1b\[?[\d;]{0,3}/,
      sub: i
    }, {
      /**
       * extracts real text - not containing:
       * - `\x1b' - ESC - escape (Ascii 27)
       * - '\x08' - BS - backspace (Ascii 8)
       * - `\n` - Newline - linefeed (LF) (ascii 10)
       * - `\r` - Windows Carriage Return (CR)
       */
      pattern: /^(([^\x1b\x08\r\n])+)/,
      sub: p
    }];
    function g(A, C) {
      C > a && o || (o = !1, r = r.replace(A.pattern, A.sub));
    }
    n(g, "process");
    var m = [], b = r, S = b.length;
    e: for (; S > 0; ) {
      for (var T = 0, v = 0, E = h.length; v < E; T = ++v) {
        var x = h[T];
        if (g(x, T), r.length !== S) {
          S = r.length;
          continue e;
        }
      }
      if (r.length === S)
        break;
      m.push(0), S = r.length;
    }
    return m;
  }
  n(QI, "tokenize");
  function ZI(r, e, t) {
    return e !== "text" && (r = r.filter(XI(Zh(t))), r.push({
      token: e,
      data: t,
      category: Zh(t)
    })), r;
  }
  n(ZI, "updateStickyStack");
  var eF = /* @__PURE__ */ function() {
    function r(e) {
      UI(this, r), e = e || {}, e.colors && (e.colors = Object.assign({}, Jh.colors, e.colors)), this.options = Object.assign({}, Jh, e), this.
      stack = [], this.stickyStack = [];
    }
    return n(r, "Filter"), GI(r, [{
      key: "toHtml",
      value: /* @__PURE__ */ n(function(t) {
        var o = this;
        t = typeof t == "string" ? [t] : t;
        var a = this.stack, i = this.options, l = [];
        return this.stickyStack.forEach(function(c) {
          var s = Qh(a, c.token, c.data, i);
          s && l.push(s);
        }), QI(t.join(""), i, function(c, s) {
          var u = Qh(a, c, s, i);
          u && l.push(u), i.stream && (o.stickyStack = ZI(o.stickyStack, c, s));
        }), a.length && l.push(om(a)), l.join("");
      }, "toHtml")
    }]), r;
  }();
  nm.exports = eF;
});

// ../node_modules/browser-dtector/browser-dtector.umd.min.js
var hm = d((ns, as) => {
  (function(r, e) {
    typeof ns == "object" && typeof as < "u" ? as.exports = e() : typeof define == "function" && define.amd ? define(e) : (r = typeof globalThis <
    "u" ? globalThis : r || self).BrowserDetector = e();
  })(ns, function() {
    "use strict";
    function r(l, c) {
      for (var s = 0; s < c.length; s++) {
        var u = c[s];
        u.enumerable = u.enumerable || !1, u.configurable = !0, "value" in u && (u.writable = !0), Object.defineProperty(l, (p = u.key, y = void 0,
        typeof (y = function(h, g) {
          if (typeof h != "object" || h === null) return h;
          var m = h[Symbol.toPrimitive];
          if (m !== void 0) {
            var b = m.call(h, g || "default");
            if (typeof b != "object") return b;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return (g === "string" ? String : Number)(h);
        }(p, "string")) == "symbol" ? y : String(y)), u);
      }
      var p, y;
    }
    n(r, "e");
    var e = { chrome: "Google Chrome", brave: "Brave", crios: "Google Chrome", edge: "Microsoft Edge", edg: "Microsoft Edge", edgios: "Micro\
soft Edge", fennec: "Mozilla Firefox", jsdom: "JsDOM", mozilla: "Mozilla Firefox", fxios: "Mozilla Firefox", msie: "Microsoft Internet Explo\
rer", opera: "Opera", opios: "Opera", opr: "Opera", opt: "Opera", rv: "Microsoft Internet Explorer", safari: "Safari", samsungbrowser: "Sams\
ung Browser", electron: "Electron" }, t = { android: "Android", androidTablet: "Android Tablet", cros: "Chrome OS", fennec: "Android Tablet",
    ipad: "IPad", iphone: "IPhone", jsdom: "JsDOM", linux: "Linux", mac: "Macintosh", tablet: "Android Tablet", win: "Windows", "windows pho\
ne": "Windows Phone", xbox: "Microsoft Xbox" }, o = /* @__PURE__ */ n(function(l) {
      var c = new RegExp("^-?\\d+(?:.\\d{0,".concat(arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : -1, "})?")), s = Number(
      l).toString().match(c);
      return s ? s[0] : null;
    }, "n"), a = /* @__PURE__ */ n(function() {
      return typeof window < "u" ? window.navigator : null;
    }, "i"), i = function() {
      function l(p) {
        var y;
        (function(h, g) {
          if (!(h instanceof g)) throw new TypeError("Cannot call a class as a function");
        })(this, l), this.userAgent = p || ((y = a()) === null || y === void 0 ? void 0 : y.userAgent) || null;
      }
      n(l, "t");
      var c, s, u;
      return c = l, s = [{ key: "parseUserAgent", value: /* @__PURE__ */ n(function(p) {
        var y, h, g, m = {}, b = p || this.userAgent || "", S = b.toLowerCase().replace(/\s\s+/g, " "), T = /(edge)\/([\w.]+)/.exec(S) || /(edg)[/]([\w.]+)/.
        exec(S) || /(opr)[/]([\w.]+)/.exec(S) || /(opt)[/]([\w.]+)/.exec(S) || /(fxios)[/]([\w.]+)/.exec(S) || /(edgios)[/]([\w.]+)/.exec(S) ||
        /(jsdom)[/]([\w.]+)/.exec(S) || /(samsungbrowser)[/]([\w.]+)/.exec(S) || /(electron)[/]([\w.]+)/.exec(S) || /(chrome)[/]([\w.]+)/.exec(
        S) || /(crios)[/]([\w.]+)/.exec(S) || /(opios)[/]([\w.]+)/.exec(S) || /(version)(applewebkit)[/]([\w.]+).*(safari)[/]([\w.]+)/.exec(
        S) || /(webkit)[/]([\w.]+).*(version)[/]([\w.]+).*(safari)[/]([\w.]+)/.exec(S) || /(applewebkit)[/]([\w.]+).*(safari)[/]([\w.]+)/.exec(
        S) || /(webkit)[/]([\w.]+)/.exec(S) || /(opera)(?:.*version|)[/]([\w.]+)/.exec(S) || /(msie) ([\w.]+)/.exec(S) || /(fennec)[/]([\w.]+)/.
        exec(S) || S.indexOf("trident") >= 0 && /(rv)(?::| )([\w.]+)/.exec(S) || S.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.
        exec(S) || [], v = /(ipad)/.exec(S) || /(ipod)/.exec(S) || /(iphone)/.exec(S) || /(jsdom)/.exec(S) || /(windows phone)/.exec(S) || /(xbox)/.
        exec(S) || /(win)/.exec(S) || /(tablet)/.exec(S) || /(android)/.test(S) && /(mobile)/.test(S) === !1 && ["androidTablet"] || /(android)/.
        exec(S) || /(mac)/.exec(S) || /(linux)/.exec(S) || /(cros)/.exec(S) || [], E = T[5] || T[3] || T[1] || null, x = v[0] || null, A = T[4] ||
        T[2] || null, C = a();
        E === "chrome" && typeof (C == null || (y = C.brave) === null || y === void 0 ? void 0 : y.isBrave) == "function" && (E = "brave"), E &&
        (m[E] = !0), x && (m[x] = !0);
        var N = !!(m.tablet || m.android || m.androidTablet), P = !!(m.ipad || m.tablet || m.androidTablet), H = !!(m.android || m.androidTablet ||
        m.tablet || m.ipad || m.ipod || m.iphone || m["windows phone"]), te = !!(m.cros || m.mac || m.linux || m.win), pe = !!(m.brave || m.
        chrome || m.crios || m.opr || m.safari || m.edg || m.electron), q = !!(m.msie || m.rv);
        return { name: (h = e[E]) !== null && h !== void 0 ? h : null, platform: (g = t[x]) !== null && g !== void 0 ? g : null, userAgent: b,
        version: A, shortVersion: A ? o(parseFloat(A), 2) : null, isAndroid: N, isTablet: P, isMobile: H, isDesktop: te, isWebkit: pe, isIE: q };
      }, "value") }, { key: "getBrowserInfo", value: /* @__PURE__ */ n(function() {
        var p = this.parseUserAgent();
        return { name: p.name, platform: p.platform, userAgent: p.userAgent, version: p.version, shortVersion: p.shortVersion };
      }, "value") }], u = [{ key: "VERSION", get: /* @__PURE__ */ n(function() {
        return "3.4.0";
      }, "get") }], s && r(c.prototype, s), u && r(c, u), Object.defineProperty(c, "prototype", { writable: !1 }), l;
    }();
    return i;
  });
});

// src/core-events/index.ts
var ge = {};
Pe(ge, {
  ARGTYPES_INFO_REQUEST: () => En,
  ARGTYPES_INFO_RESPONSE: () => Ut,
  CHANNEL_CREATED: () => wm,
  CHANNEL_WS_DISCONNECT: () => en,
  CONFIG_ERROR: () => rn,
  CREATE_NEW_STORYFILE_REQUEST: () => xm,
  CREATE_NEW_STORYFILE_RESPONSE: () => _m,
  CURRENT_STORY_WAS_SET: () => jt,
  DOCS_PREPARED: () => tn,
  DOCS_RENDERED: () => Nr,
  FILE_COMPONENT_SEARCH_REQUEST: () => Pm,
  FILE_COMPONENT_SEARCH_RESPONSE: () => Om,
  FORCE_REMOUNT: () => on,
  FORCE_RE_RENDER: () => qr,
  GLOBALS_UPDATED: () => nn,
  NAVIGATE_URL: () => Cm,
  PLAY_FUNCTION_THREW_EXCEPTION: () => an,
  PRELOAD_ENTRIES: () => ln,
  PREVIEW_BUILDER_PROGRESS: () => Im,
  PREVIEW_KEYDOWN: () => cn,
  REGISTER_SUBSCRIPTION: () => Fm,
  REQUEST_WHATS_NEW_DATA: () => Um,
  RESET_STORY_ARGS: () => Lr,
  RESULT_WHATS_NEW_DATA: () => Gm,
  SAVE_STORY_REQUEST: () => $m,
  SAVE_STORY_RESPONSE: () => Wm,
  SELECT_STORY: () => Dm,
  SET_CONFIG: () => Nm,
  SET_CURRENT_STORY: () => un,
  SET_GLOBALS: () => pn,
  SET_INDEX: () => qm,
  SET_STORIES: () => Lm,
  SET_WHATS_NEW_CACHE: () => Hm,
  SHARED_STATE_CHANGED: () => Mm,
  SHARED_STATE_SET: () => km,
  STORIES_COLLAPSE_ALL: () => jm,
  STORIES_EXPAND_ALL: () => Bm,
  STORY_ARGS_UPDATED: () => dn,
  STORY_CHANGED: () => fn,
  STORY_ERRORED: () => yn,
  STORY_INDEX_INVALIDATED: () => hn,
  STORY_MISSING: () => Bt,
  STORY_PREPARED: () => mn,
  STORY_RENDERED: () => Xe,
  STORY_RENDER_PHASE_CHANGED: () => Oe,
  STORY_SPECIFIED: () => gn,
  STORY_THREW_EXCEPTION: () => Sn,
  STORY_UNCHANGED: () => bn,
  TELEMETRY_ERROR: () => Tn,
  TOGGLE_WHATS_NEW_NOTIFICATIONS: () => Vm,
  UNHANDLED_ERRORS_WHILE_PLAYING: () => sn,
  UPDATE_GLOBALS: () => Mr,
  UPDATE_QUERY_PARAMS: () => vn,
  UPDATE_STORY_ARGS: () => kr,
  default: () => Am
});
var Zo = /* @__PURE__ */ ((w) => (w.CHANNEL_WS_DISCONNECT = "channelWSDisconnect", w.CHANNEL_CREATED = "channelCreated", w.CONFIG_ERROR = "c\
onfigError", w.STORY_INDEX_INVALIDATED = "storyIndexInvalidated", w.STORY_SPECIFIED = "storySpecified", w.SET_CONFIG = "setConfig", w.SET_STORIES =
"setStories", w.SET_INDEX = "setIndex", w.SET_CURRENT_STORY = "setCurrentStory", w.CURRENT_STORY_WAS_SET = "currentStoryWasSet", w.FORCE_RE_RENDER =
"forceReRender", w.FORCE_REMOUNT = "forceRemount", w.PRELOAD_ENTRIES = "preloadStories", w.STORY_PREPARED = "storyPrepared", w.DOCS_PREPARED =
"docsPrepared", w.STORY_CHANGED = "storyChanged", w.STORY_UNCHANGED = "storyUnchanged", w.STORY_RENDERED = "storyRendered", w.STORY_MISSING =
"storyMissing", w.STORY_ERRORED = "storyErrored", w.STORY_THREW_EXCEPTION = "storyThrewException", w.STORY_RENDER_PHASE_CHANGED = "storyRend\
erPhaseChanged", w.PLAY_FUNCTION_THREW_EXCEPTION = "playFunctionThrewException", w.UNHANDLED_ERRORS_WHILE_PLAYING = "unhandledErrorsWhilePla\
ying", w.UPDATE_STORY_ARGS = "updateStoryArgs", w.STORY_ARGS_UPDATED = "storyArgsUpdated", w.RESET_STORY_ARGS = "resetStoryArgs", w.SET_GLOBALS =
"setGlobals", w.UPDATE_GLOBALS = "updateGlobals", w.GLOBALS_UPDATED = "globalsUpdated", w.REGISTER_SUBSCRIPTION = "registerSubscription", w.
PREVIEW_KEYDOWN = "previewKeydown", w.PREVIEW_BUILDER_PROGRESS = "preview_builder_progress", w.SELECT_STORY = "selectStory", w.STORIES_COLLAPSE_ALL =
"storiesCollapseAll", w.STORIES_EXPAND_ALL = "storiesExpandAll", w.DOCS_RENDERED = "docsRendered", w.SHARED_STATE_CHANGED = "sharedStateChan\
ged", w.SHARED_STATE_SET = "sharedStateSet", w.NAVIGATE_URL = "navigateUrl", w.UPDATE_QUERY_PARAMS = "updateQueryParams", w.REQUEST_WHATS_NEW_DATA =
"requestWhatsNewData", w.RESULT_WHATS_NEW_DATA = "resultWhatsNewData", w.SET_WHATS_NEW_CACHE = "setWhatsNewCache", w.TOGGLE_WHATS_NEW_NOTIFICATIONS =
"toggleWhatsNewNotifications", w.TELEMETRY_ERROR = "telemetryError", w.FILE_COMPONENT_SEARCH_REQUEST = "fileComponentSearchRequest", w.FILE_COMPONENT_SEARCH_RESPONSE =
"fileComponentSearchResponse", w.SAVE_STORY_REQUEST = "saveStoryRequest", w.SAVE_STORY_RESPONSE = "saveStoryResponse", w.ARGTYPES_INFO_REQUEST =
"argtypesInfoRequest", w.ARGTYPES_INFO_RESPONSE = "argtypesInfoResponse", w.CREATE_NEW_STORYFILE_REQUEST = "createNewStoryfileRequest", w.CREATE_NEW_STORYFILE_RESPONSE =
"createNewStoryfileResponse", w))(Zo || {}), Am = Zo, {
  CHANNEL_WS_DISCONNECT: en,
  CHANNEL_CREATED: wm,
  CONFIG_ERROR: rn,
  CREATE_NEW_STORYFILE_REQUEST: xm,
  CREATE_NEW_STORYFILE_RESPONSE: _m,
  CURRENT_STORY_WAS_SET: jt,
  DOCS_PREPARED: tn,
  DOCS_RENDERED: Nr,
  FILE_COMPONENT_SEARCH_REQUEST: Pm,
  FILE_COMPONENT_SEARCH_RESPONSE: Om,
  FORCE_RE_RENDER: qr,
  FORCE_REMOUNT: on,
  GLOBALS_UPDATED: nn,
  NAVIGATE_URL: Cm,
  PLAY_FUNCTION_THREW_EXCEPTION: an,
  UNHANDLED_ERRORS_WHILE_PLAYING: sn,
  PRELOAD_ENTRIES: ln,
  PREVIEW_BUILDER_PROGRESS: Im,
  PREVIEW_KEYDOWN: cn,
  REGISTER_SUBSCRIPTION: Fm,
  RESET_STORY_ARGS: Lr,
  SELECT_STORY: Dm,
  SET_CONFIG: Nm,
  SET_CURRENT_STORY: un,
  SET_GLOBALS: pn,
  SET_INDEX: qm,
  SET_STORIES: Lm,
  SHARED_STATE_CHANGED: Mm,
  SHARED_STATE_SET: km,
  STORIES_COLLAPSE_ALL: jm,
  STORIES_EXPAND_ALL: Bm,
  STORY_ARGS_UPDATED: dn,
  STORY_CHANGED: fn,
  STORY_ERRORED: yn,
  STORY_INDEX_INVALIDATED: hn,
  STORY_MISSING: Bt,
  STORY_PREPARED: mn,
  STORY_RENDER_PHASE_CHANGED: Oe,
  STORY_RENDERED: Xe,
  STORY_SPECIFIED: gn,
  STORY_THREW_EXCEPTION: Sn,
  STORY_UNCHANGED: bn,
  UPDATE_GLOBALS: Mr,
  UPDATE_QUERY_PARAMS: vn,
  UPDATE_STORY_ARGS: kr,
  REQUEST_WHATS_NEW_DATA: Um,
  RESULT_WHATS_NEW_DATA: Gm,
  SET_WHATS_NEW_CACHE: Hm,
  TOGGLE_WHATS_NEW_NOTIFICATIONS: Vm,
  TELEMETRY_ERROR: Tn,
  SAVE_STORY_REQUEST: $m,
  SAVE_STORY_RESPONSE: Wm,
  ARGTYPES_INFO_REQUEST: En,
  ARGTYPES_INFO_RESPONSE: Ut
} = Zo;

// ../node_modules/@storybook/global/dist/index.mjs
var Rn = {};
Pe(Rn, {
  global: () => R
});
var R = (() => {
  let r;
  return typeof window < "u" ? r = window : typeof globalThis < "u" ? r = globalThis : typeof global < "u" ? r = global : typeof self < "u" ?
  r = self : r = {}, r;
})();

// src/preview/globals/globals.ts
var An = {
  "@storybook/global": "__STORYBOOK_MODULE_GLOBAL__",
  "storybook/internal/channels": "__STORYBOOK_MODULE_CHANNELS__",
  "@storybook/channels": "__STORYBOOK_MODULE_CHANNELS__",
  "@storybook/core/channels": "__STORYBOOK_MODULE_CHANNELS__",
  "storybook/internal/client-logger": "__STORYBOOK_MODULE_CLIENT_LOGGER__",
  "@storybook/client-logger": "__STORYBOOK_MODULE_CLIENT_LOGGER__",
  "@storybook/core/client-logger": "__STORYBOOK_MODULE_CLIENT_LOGGER__",
  "storybook/internal/core-events": "__STORYBOOK_MODULE_CORE_EVENTS__",
  "@storybook/core-events": "__STORYBOOK_MODULE_CORE_EVENTS__",
  "@storybook/core/core-events": "__STORYBOOK_MODULE_CORE_EVENTS__",
  "storybook/internal/preview-errors": "__STORYBOOK_MODULE_CORE_EVENTS_PREVIEW_ERRORS__",
  "@storybook/core-events/preview-errors": "__STORYBOOK_MODULE_CORE_EVENTS_PREVIEW_ERRORS__",
  "@storybook/core/preview-errors": "__STORYBOOK_MODULE_CORE_EVENTS_PREVIEW_ERRORS__",
  "storybook/internal/preview-api": "__STORYBOOK_MODULE_PREVIEW_API__",
  "@storybook/preview-api": "__STORYBOOK_MODULE_PREVIEW_API__",
  "@storybook/core/preview-api": "__STORYBOOK_MODULE_PREVIEW_API__",
  "storybook/internal/types": "__STORYBOOK_MODULE_TYPES__",
  "@storybook/types": "__STORYBOOK_MODULE_TYPES__",
  "@storybook/core/types": "__STORYBOOK_MODULE_TYPES__"
}, ss = Object.keys(An);

// src/channels/index.ts
var Hr = {};
Pe(Hr, {
  Channel: () => Se,
  PostMessageTransport: () => tr,
  WebsocketTransport: () => or,
  createBrowserChannel: () => Hb,
  default: () => Gb
});

// src/channels/main.ts
var zm = /* @__PURE__ */ n((r) => r.transports !== void 0, "isMulti"), Ym = /* @__PURE__ */ n(() => Math.random().toString(16).slice(2), "ge\
nerateRandomId"), wn = class wn {
  isAsync;
  sender = Ym();
  events = {};
  data = {};
  transports = [];
  constructor(e = {}) {
    this.isAsync = e.async || !1, zm(e) ? (this.transports = e.transports || [], this.transports.forEach((t) => {
      t.setHandler((o) => this.handleEvent(o));
    })) : this.transports = e.transport ? [e.transport] : [], this.transports.forEach((t) => {
      t.setHandler((o) => this.handleEvent(o));
    });
  }
  get hasTransport() {
    return this.transports.length > 0;
  }
  addListener(e, t) {
    this.events[e] = this.events[e] || [], this.events[e].push(t);
  }
  emit(e, ...t) {
    let o = { type: e, args: t, from: this.sender }, a = {};
    t.length >= 1 && t[0] && t[0].options && (a = t[0].options);
    let i = /* @__PURE__ */ n(() => {
      this.transports.forEach((l) => {
        l.send(o, a);
      }), this.handleEvent(o);
    }, "handler");
    this.isAsync ? setImmediate(i) : i();
  }
  last(e) {
    return this.data[e];
  }
  eventNames() {
    return Object.keys(this.events);
  }
  listenerCount(e) {
    let t = this.listeners(e);
    return t ? t.length : 0;
  }
  listeners(e) {
    return this.events[e] || void 0;
  }
  once(e, t) {
    let o = this.onceListener(e, t);
    this.addListener(e, o);
  }
  removeAllListeners(e) {
    e ? this.events[e] && delete this.events[e] : this.events = {};
  }
  removeListener(e, t) {
    let o = this.listeners(e);
    o && (this.events[e] = o.filter((a) => a !== t));
  }
  on(e, t) {
    this.addListener(e, t);
  }
  off(e, t) {
    this.removeListener(e, t);
  }
  handleEvent(e) {
    let t = this.listeners(e.type);
    t && t.length && t.forEach((o) => {
      o.apply(e, e.args);
    }), this.data[e.type] = e.args;
  }
  onceListener(e, t) {
    let o = /* @__PURE__ */ n((...a) => (this.removeListener(e, o), t(...a)), "onceListener");
    return o;
  }
};
n(wn, "Channel");
var Se = wn;

// src/client-logger/index.ts
var jr = {};
Pe(jr, {
  deprecate: () => ae,
  logger: () => I,
  once: () => j,
  pretty: () => Z
});
var { LOGLEVEL: Km } = R, be = {
  trace: 1,
  debug: 2,
  info: 3,
  warn: 4,
  error: 5,
  silent: 10
}, Xm = Km, Je = be[Xm] || be.info, I = {
  trace: /* @__PURE__ */ n((r, ...e) => {
    Je <= be.trace && console.trace(r, ...e);
  }, "trace"),
  debug: /* @__PURE__ */ n((r, ...e) => {
    Je <= be.debug && console.debug(r, ...e);
  }, "debug"),
  info: /* @__PURE__ */ n((r, ...e) => {
    Je <= be.info && console.info(r, ...e);
  }, "info"),
  warn: /* @__PURE__ */ n((r, ...e) => {
    Je <= be.warn && console.warn(r, ...e);
  }, "warn"),
  error: /* @__PURE__ */ n((r, ...e) => {
    Je <= be.error && console.error(r, ...e);
  }, "error"),
  log: /* @__PURE__ */ n((r, ...e) => {
    Je < be.silent && console.log(r, ...e);
  }, "log")
}, xn = /* @__PURE__ */ new Set(), j = /* @__PURE__ */ n((r) => (e, ...t) => {
  if (!xn.has(e))
    return xn.add(e), I[r](e, ...t);
}, "once");
j.clear = () => xn.clear();
j.trace = j("trace");
j.debug = j("debug");
j.info = j("info");
j.warn = j("warn");
j.error = j("error");
j.log = j("log");
var ae = j("warn"), Z = /* @__PURE__ */ n((r) => (...e) => {
  let t = [];
  if (e.length) {
    let o = /<span\s+style=(['"])([^'"]*)\1\s*>/gi, a = /<\/span>/gi, i;
    for (t.push(e[0].replace(o, "%c").replace(a, "%c")); i = o.exec(e[0]); )
      t.push(i[2]), t.push("");
    for (let l = 1; l < e.length; l++)
      t.push(e[l]);
  }
  I[r].apply(I, t);
}, "pretty");
Z.trace = Z("trace");
Z.debug = Z("debug");
Z.info = Z("info");
Z.warn = Z("warn");
Z.error = Z("error");

// ../node_modules/telejson/dist/chunk-465TF3XA.mjs
var Jm = Object.create, ls = Object.defineProperty, Qm = Object.getOwnPropertyDescriptor, cs = Object.getOwnPropertyNames, Zm = Object.getPrototypeOf,
eg = Object.prototype.hasOwnProperty, re = /* @__PURE__ */ n((r, e) => /* @__PURE__ */ n(function() {
  return e || (0, r[cs(r)[0]])((e = { exports: {} }).exports, e), e.exports;
}, "__require"), "__commonJS"), rg = /* @__PURE__ */ n((r, e, t, o) => {
  if (e && typeof e == "object" || typeof e == "function")
    for (let a of cs(e))
      !eg.call(r, a) && a !== t && ls(r, a, { get: /* @__PURE__ */ n(() => e[a], "get"), enumerable: !(o = Qm(e, a)) || o.enumerable });
  return r;
}, "__copyProps"), Gt = /* @__PURE__ */ n((r, e, t) => (t = r != null ? Jm(Zm(r)) : {}, rg(
  e || !r || !r.__esModule ? ls(t, "default", { value: r, enumerable: !0 }) : t,
  r
)), "__toESM"), tg = [
  "bubbles",
  "cancelBubble",
  "cancelable",
  "composed",
  "currentTarget",
  "defaultPrevented",
  "eventPhase",
  "isTrusted",
  "returnValue",
  "srcElement",
  "target",
  "timeStamp",
  "type"
], og = ["detail"];
function us(r) {
  let e = tg.filter((t) => r[t] !== void 0).reduce((t, o) => ({ ...t, [o]: r[o] }), {});
  return r instanceof CustomEvent && og.filter((t) => r[t] !== void 0).forEach((t) => {
    e[t] = r[t];
  }), e;
}
n(us, "extractEventHiddenProperties");

// ../node_modules/telejson/dist/index.mjs
var xs = W(Ht(), 1);
var gs = re({
  "node_modules/has-symbols/shams.js"(r, e) {
    "use strict";
    e.exports = /* @__PURE__ */ n(function() {
      if (typeof Symbol != "function" || typeof Object.getOwnPropertySymbols != "function")
        return !1;
      if (typeof Symbol.iterator == "symbol")
        return !0;
      var o = {}, a = Symbol("test"), i = Object(a);
      if (typeof a == "string" || Object.prototype.toString.call(a) !== "[object Symbol]" || Object.prototype.toString.call(i) !== "[object \
Symbol]")
        return !1;
      var l = 42;
      o[a] = l;
      for (a in o)
        return !1;
      if (typeof Object.keys == "function" && Object.keys(o).length !== 0 || typeof Object.getOwnPropertyNames == "function" && Object.getOwnPropertyNames(
      o).length !== 0)
        return !1;
      var c = Object.getOwnPropertySymbols(o);
      if (c.length !== 1 || c[0] !== a || !Object.prototype.propertyIsEnumerable.call(o, a))
        return !1;
      if (typeof Object.getOwnPropertyDescriptor == "function") {
        var s = Object.getOwnPropertyDescriptor(o, a);
        if (s.value !== l || s.enumerable !== !0)
          return !1;
      }
      return !0;
    }, "hasSymbols");
  }
}), Ss = re({
  "node_modules/has-symbols/index.js"(r, e) {
    "use strict";
    var t = typeof Symbol < "u" && Symbol, o = gs();
    e.exports = /* @__PURE__ */ n(function() {
      return typeof t != "function" || typeof Symbol != "function" || typeof t("foo") != "symbol" || typeof Symbol("bar") != "symbol" ? !1 :
      o();
    }, "hasNativeSymbols");
  }
}), ng = re({
  "node_modules/function-bind/implementation.js"(r, e) {
    "use strict";
    var t = "Function.prototype.bind called on incompatible ", o = Array.prototype.slice, a = Object.prototype.toString, i = "[object Functi\
on]";
    e.exports = /* @__PURE__ */ n(function(c) {
      var s = this;
      if (typeof s != "function" || a.call(s) !== i)
        throw new TypeError(t + s);
      for (var u = o.call(arguments, 1), p, y = /* @__PURE__ */ n(function() {
        if (this instanceof p) {
          var S = s.apply(
            this,
            u.concat(o.call(arguments))
          );
          return Object(S) === S ? S : this;
        } else
          return s.apply(
            c,
            u.concat(o.call(arguments))
          );
      }, "binder"), h = Math.max(0, s.length - u.length), g = [], m = 0; m < h; m++)
        g.push("$" + m);
      if (p = Function("binder", "return function (" + g.join(",") + "){ return binder.apply(this,arguments); }")(y), s.prototype) {
        var b = /* @__PURE__ */ n(function() {
        }, "Empty2");
        b.prototype = s.prototype, p.prototype = new b(), b.prototype = null;
      }
      return p;
    }, "bind");
  }
}), On = re({
  "node_modules/function-bind/index.js"(r, e) {
    "use strict";
    var t = ng();
    e.exports = Function.prototype.bind || t;
  }
}), ag = re({
  "node_modules/has/src/index.js"(r, e) {
    "use strict";
    var t = On();
    e.exports = t.call(Function.call, Object.prototype.hasOwnProperty);
  }
}), bs = re({
  "node_modules/get-intrinsic/index.js"(r, e) {
    "use strict";
    var t, o = SyntaxError, a = Function, i = TypeError, l = /* @__PURE__ */ n(function(q) {
      try {
        return a('"use strict"; return (' + q + ").constructor;")();
      } catch {
      }
    }, "getEvalledConstructor"), c = Object.getOwnPropertyDescriptor;
    if (c)
      try {
        c({}, "");
      } catch {
        c = null;
      }
    var s = /* @__PURE__ */ n(function() {
      throw new i();
    }, "throwTypeError"), u = c ? function() {
      try {
        return arguments.callee, s;
      } catch {
        try {
          return c(arguments, "callee").get;
        } catch {
          return s;
        }
      }
    }() : s, p = Ss()(), y = Object.getPrototypeOf || function(q) {
      return q.__proto__;
    }, h = {}, g = typeof Uint8Array > "u" ? t : y(Uint8Array), m = {
      "%AggregateError%": typeof AggregateError > "u" ? t : AggregateError,
      "%Array%": Array,
      "%ArrayBuffer%": typeof ArrayBuffer > "u" ? t : ArrayBuffer,
      "%ArrayIteratorPrototype%": p ? y([][Symbol.iterator]()) : t,
      "%AsyncFromSyncIteratorPrototype%": t,
      "%AsyncFunction%": h,
      "%AsyncGenerator%": h,
      "%AsyncGeneratorFunction%": h,
      "%AsyncIteratorPrototype%": h,
      "%Atomics%": typeof Atomics > "u" ? t : Atomics,
      "%BigInt%": typeof BigInt > "u" ? t : BigInt,
      "%Boolean%": Boolean,
      "%DataView%": typeof DataView > "u" ? t : DataView,
      "%Date%": Date,
      "%decodeURI%": decodeURI,
      "%decodeURIComponent%": decodeURIComponent,
      "%encodeURI%": encodeURI,
      "%encodeURIComponent%": encodeURIComponent,
      "%Error%": Error,
      "%eval%": eval,
      "%EvalError%": EvalError,
      "%Float32Array%": typeof Float32Array > "u" ? t : Float32Array,
      "%Float64Array%": typeof Float64Array > "u" ? t : Float64Array,
      "%FinalizationRegistry%": typeof FinalizationRegistry > "u" ? t : FinalizationRegistry,
      "%Function%": a,
      "%GeneratorFunction%": h,
      "%Int8Array%": typeof Int8Array > "u" ? t : Int8Array,
      "%Int16Array%": typeof Int16Array > "u" ? t : Int16Array,
      "%Int32Array%": typeof Int32Array > "u" ? t : Int32Array,
      "%isFinite%": isFinite,
      "%isNaN%": isNaN,
      "%IteratorPrototype%": p ? y(y([][Symbol.iterator]())) : t,
      "%JSON%": typeof JSON == "object" ? JSON : t,
      "%Map%": typeof Map > "u" ? t : Map,
      "%MapIteratorPrototype%": typeof Map > "u" || !p ? t : y((/* @__PURE__ */ new Map())[Symbol.iterator]()),
      "%Math%": Math,
      "%Number%": Number,
      "%Object%": Object,
      "%parseFloat%": parseFloat,
      "%parseInt%": parseInt,
      "%Promise%": typeof Promise > "u" ? t : Promise,
      "%Proxy%": typeof Proxy > "u" ? t : Proxy,
      "%RangeError%": RangeError,
      "%ReferenceError%": ReferenceError,
      "%Reflect%": typeof Reflect > "u" ? t : Reflect,
      "%RegExp%": RegExp,
      "%Set%": typeof Set > "u" ? t : Set,
      "%SetIteratorPrototype%": typeof Set > "u" || !p ? t : y((/* @__PURE__ */ new Set())[Symbol.iterator]()),
      "%SharedArrayBuffer%": typeof SharedArrayBuffer > "u" ? t : SharedArrayBuffer,
      "%String%": String,
      "%StringIteratorPrototype%": p ? y(""[Symbol.iterator]()) : t,
      "%Symbol%": p ? Symbol : t,
      "%SyntaxError%": o,
      "%ThrowTypeError%": u,
      "%TypedArray%": g,
      "%TypeError%": i,
      "%Uint8Array%": typeof Uint8Array > "u" ? t : Uint8Array,
      "%Uint8ClampedArray%": typeof Uint8ClampedArray > "u" ? t : Uint8ClampedArray,
      "%Uint16Array%": typeof Uint16Array > "u" ? t : Uint16Array,
      "%Uint32Array%": typeof Uint32Array > "u" ? t : Uint32Array,
      "%URIError%": URIError,
      "%WeakMap%": typeof WeakMap > "u" ? t : WeakMap,
      "%WeakRef%": typeof WeakRef > "u" ? t : WeakRef,
      "%WeakSet%": typeof WeakSet > "u" ? t : WeakSet
    }, b = /* @__PURE__ */ n(function q(D) {
      var k;
      if (D === "%AsyncFunction%")
        k = l("async function () {}");
      else if (D === "%GeneratorFunction%")
        k = l("function* () {}");
      else if (D === "%AsyncGeneratorFunction%")
        k = l("async function* () {}");
      else if (D === "%AsyncGenerator%") {
        var L = q("%AsyncGeneratorFunction%");
        L && (k = L.prototype);
      } else if (D === "%AsyncIteratorPrototype%") {
        var U = q("%AsyncGenerator%");
        U && (k = y(U.prototype));
      }
      return m[D] = k, k;
    }, "doEval2"), S = {
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
    }, T = On(), v = ag(), E = T.call(Function.call, Array.prototype.concat), x = T.call(Function.apply, Array.prototype.splice), A = T.call(
    Function.call, String.prototype.replace), C = T.call(Function.call, String.prototype.slice), N = T.call(Function.call, RegExp.prototype.
    exec), P = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g, H = /\\(\\)?/g, te = /* @__PURE__ */ n(
    function(D) {
      var k = C(D, 0, 1), L = C(D, -1);
      if (k === "%" && L !== "%")
        throw new o("invalid intrinsic syntax, expected closing `%`");
      if (L === "%" && k !== "%")
        throw new o("invalid intrinsic syntax, expected opening `%`");
      var U = [];
      return A(D, P, function(ne, Ke, Q, Dt) {
        U[U.length] = Q ? A(Dt, H, "$1") : Ke || ne;
      }), U;
    }, "stringToPath3"), pe = /* @__PURE__ */ n(function(D, k) {
      var L = D, U;
      if (v(S, L) && (U = S[L], L = "%" + U[0] + "%"), v(m, L)) {
        var ne = m[L];
        if (ne === h && (ne = b(L)), typeof ne > "u" && !k)
          throw new i("intrinsic " + D + " exists, but is not available. Please file an issue!");
        return {
          alias: U,
          name: L,
          value: ne
        };
      }
      throw new o("intrinsic " + D + " does not exist!");
    }, "getBaseIntrinsic2");
    e.exports = /* @__PURE__ */ n(function(D, k) {
      if (typeof D != "string" || D.length === 0)
        throw new i("intrinsic name must be a non-empty string");
      if (arguments.length > 1 && typeof k != "boolean")
        throw new i('"allowMissing" argument must be a boolean');
      if (N(/^%?[^%]*%?$/, D) === null)
        throw new o("`%` may not be present anywhere but at the beginning and end of the intrinsic name");
      var L = te(D), U = L.length > 0 ? L[0] : "", ne = pe("%" + U + "%", k), Ke = ne.name, Q = ne.value, Dt = !1, Qo = ne.alias;
      Qo && (U = Qo[0], x(L, E([0, 1], Qo)));
      for (var Nt = 1, Fr = !0; Nt < L.length; Nt += 1) {
        var de = L[Nt], qt = C(de, 0, 1), Lt = C(de, -1);
        if ((qt === '"' || qt === "'" || qt === "`" || Lt === '"' || Lt === "'" || Lt === "`") && qt !== Lt)
          throw new o("property names with quotes must have matching quotes");
        if ((de === "constructor" || !Fr) && (Dt = !0), U += "." + de, Ke = "%" + U + "%", v(m, Ke))
          Q = m[Ke];
        else if (Q != null) {
          if (!(de in Q)) {
            if (!k)
              throw new i("base intrinsic for " + D + " exists, but the property is not available.");
            return;
          }
          if (c && Nt + 1 >= L.length) {
            var Mt = c(Q, de);
            Fr = !!Mt, Fr && "get" in Mt && !("originalValue" in Mt.get) ? Q = Mt.get : Q = Q[de];
          } else
            Fr = v(Q, de), Q = Q[de];
          Fr && !Dt && (m[Ke] = Q);
        }
      }
      return Q;
    }, "GetIntrinsic");
  }
}), ig = re({
  "node_modules/call-bind/index.js"(r, e) {
    "use strict";
    var t = On(), o = bs(), a = o("%Function.prototype.apply%"), i = o("%Function.prototype.call%"), l = o("%Reflect.apply%", !0) || t.call(
    i, a), c = o("%Object.getOwnPropertyDescriptor%", !0), s = o("%Object.defineProperty%", !0), u = o("%Math.max%");
    if (s)
      try {
        s({}, "a", { value: 1 });
      } catch {
        s = null;
      }
    e.exports = /* @__PURE__ */ n(function(h) {
      var g = l(t, i, arguments);
      if (c && s) {
        var m = c(g, "length");
        m.configurable && s(
          g,
          "length",
          { value: 1 + u(0, h.length - (arguments.length - 1)) }
        );
      }
      return g;
    }, "callBind");
    var p = /* @__PURE__ */ n(function() {
      return l(t, a, arguments);
    }, "applyBind2");
    s ? s(e.exports, "apply", { value: p }) : e.exports.apply = p;
  }
}), sg = re({
  "node_modules/call-bind/callBound.js"(r, e) {
    "use strict";
    var t = bs(), o = ig(), a = o(t("String.prototype.indexOf"));
    e.exports = /* @__PURE__ */ n(function(l, c) {
      var s = t(l, !!c);
      return typeof s == "function" && a(l, ".prototype.") > -1 ? o(s) : s;
    }, "callBoundIntrinsic");
  }
}), lg = re({
  "node_modules/has-tostringtag/shams.js"(r, e) {
    "use strict";
    var t = gs();
    e.exports = /* @__PURE__ */ n(function() {
      return t() && !!Symbol.toStringTag;
    }, "hasToStringTagShams");
  }
}), cg = re({
  "node_modules/is-regex/index.js"(r, e) {
    "use strict";
    var t = sg(), o = lg()(), a, i, l, c;
    o && (a = t("Object.prototype.hasOwnProperty"), i = t("RegExp.prototype.exec"), l = {}, s = /* @__PURE__ */ n(function() {
      throw l;
    }, "throwRegexMarker"), c = {
      toString: s,
      valueOf: s
    }, typeof Symbol.toPrimitive == "symbol" && (c[Symbol.toPrimitive] = s));
    var s, u = t("Object.prototype.toString"), p = Object.getOwnPropertyDescriptor, y = "[object RegExp]";
    e.exports = /* @__PURE__ */ n(o ? function(g) {
      if (!g || typeof g != "object")
        return !1;
      var m = p(g, "lastIndex"), b = m && a(m, "value");
      if (!b)
        return !1;
      try {
        i(g, c);
      } catch (S) {
        return S === l;
      }
    } : function(g) {
      return !g || typeof g != "object" && typeof g != "function" ? !1 : u(g) === y;
    }, "isRegex");
  }
}), ug = re({
  "node_modules/is-function/index.js"(r, e) {
    e.exports = o;
    var t = Object.prototype.toString;
    function o(a) {
      if (!a)
        return !1;
      var i = t.call(a);
      return i === "[object Function]" || typeof a == "function" && i !== "[object RegExp]" || typeof window < "u" && (a === window.setTimeout ||
      a === window.alert || a === window.confirm || a === window.prompt);
    }
    n(o, "isFunction3");
  }
}), pg = re({
  "node_modules/is-symbol/index.js"(r, e) {
    "use strict";
    var t = Object.prototype.toString, o = Ss()();
    o ? (a = Symbol.prototype.toString, i = /^Symbol\(.*\)$/, l = /* @__PURE__ */ n(function(s) {
      return typeof s.valueOf() != "symbol" ? !1 : i.test(a.call(s));
    }, "isRealSymbolObject"), e.exports = /* @__PURE__ */ n(function(s) {
      if (typeof s == "symbol")
        return !0;
      if (t.call(s) !== "[object Symbol]")
        return !1;
      try {
        return l(s);
      } catch {
        return !1;
      }
    }, "isSymbol3")) : e.exports = /* @__PURE__ */ n(function(s) {
      return !1;
    }, "isSymbol3");
    var a, i, l;
  }
}), dg = Gt(cg()), fg = Gt(ug()), yg = Gt(pg());
function hg(r) {
  return r != null && typeof r == "object" && Array.isArray(r) === !1;
}
n(hg, "isObject");
var mg = typeof global == "object" && global && global.Object === Object && global, gg = mg, Sg = typeof self == "object" && self && self.Object ===
Object && self, bg = gg || Sg || Function("return this")(), Cn = bg, vg = Cn.Symbol, Qe = vg, vs = Object.prototype, Tg = vs.hasOwnProperty,
Eg = vs.toString, Br = Qe ? Qe.toStringTag : void 0;
function Rg(r) {
  var e = Tg.call(r, Br), t = r[Br];
  try {
    r[Br] = void 0;
    var o = !0;
  } catch {
  }
  var a = Eg.call(r);
  return o && (e ? r[Br] = t : delete r[Br]), a;
}
n(Rg, "getRawTag");
var Ag = Rg, wg = Object.prototype, xg = wg.toString;
function _g(r) {
  return xg.call(r);
}
n(_g, "objectToString");
var Pg = _g, Og = "[object Null]", Cg = "[object Undefined]", ds = Qe ? Qe.toStringTag : void 0;
function Ig(r) {
  return r == null ? r === void 0 ? Cg : Og : ds && ds in Object(r) ? Ag(r) : Pg(r);
}
n(Ig, "baseGetTag");
var Ts = Ig;
function Fg(r) {
  return r != null && typeof r == "object";
}
n(Fg, "isObjectLike");
var Dg = Fg, Ng = "[object Symbol]";
function qg(r) {
  return typeof r == "symbol" || Dg(r) && Ts(r) == Ng;
}
n(qg, "isSymbol");
var In = qg;
function Lg(r, e) {
  for (var t = -1, o = r == null ? 0 : r.length, a = Array(o); ++t < o; )
    a[t] = e(r[t], t, r);
  return a;
}
n(Lg, "arrayMap");
var Mg = Lg, kg = Array.isArray, Fn = kg, jg = 1 / 0, fs = Qe ? Qe.prototype : void 0, ys = fs ? fs.toString : void 0;
function Es(r) {
  if (typeof r == "string")
    return r;
  if (Fn(r))
    return Mg(r, Es) + "";
  if (In(r))
    return ys ? ys.call(r) : "";
  var e = r + "";
  return e == "0" && 1 / r == -jg ? "-0" : e;
}
n(Es, "baseToString");
var Bg = Es;
function Ug(r) {
  var e = typeof r;
  return r != null && (e == "object" || e == "function");
}
n(Ug, "isObject2");
var Rs = Ug, Gg = "[object AsyncFunction]", Hg = "[object Function]", Vg = "[object GeneratorFunction]", $g = "[object Proxy]";
function Wg(r) {
  if (!Rs(r))
    return !1;
  var e = Ts(r);
  return e == Hg || e == Vg || e == Gg || e == $g;
}
n(Wg, "isFunction");
var zg = Wg, Yg = Cn["__core-js_shared__"], Pn = Yg, hs = function() {
  var r = /[^.]+$/.exec(Pn && Pn.keys && Pn.keys.IE_PROTO || "");
  return r ? "Symbol(src)_1." + r : "";
}();
function Kg(r) {
  return !!hs && hs in r;
}
n(Kg, "isMasked");
var Xg = Kg, Jg = Function.prototype, Qg = Jg.toString;
function Zg(r) {
  if (r != null) {
    try {
      return Qg.call(r);
    } catch {
    }
    try {
      return r + "";
    } catch {
    }
  }
  return "";
}
n(Zg, "toSource");
var eS = Zg, rS = /[\\^$.*+?()[\]{}|]/g, tS = /^\[object .+?Constructor\]$/, oS = Function.prototype, nS = Object.prototype, aS = oS.toString,
iS = nS.hasOwnProperty, sS = RegExp(
  "^" + aS.call(iS).replace(rS, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function lS(r) {
  if (!Rs(r) || Xg(r))
    return !1;
  var e = zg(r) ? sS : tS;
  return e.test(eS(r));
}
n(lS, "baseIsNative");
var cS = lS;
function uS(r, e) {
  return r?.[e];
}
n(uS, "getValue");
var pS = uS;
function dS(r, e) {
  var t = pS(r, e);
  return cS(t) ? t : void 0;
}
n(dS, "getNative");
var As = dS;
function fS(r, e) {
  return r === e || r !== r && e !== e;
}
n(fS, "eq");
var yS = fS, hS = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, mS = /^\w*$/;
function gS(r, e) {
  if (Fn(r))
    return !1;
  var t = typeof r;
  return t == "number" || t == "symbol" || t == "boolean" || r == null || In(r) ? !0 : mS.test(r) || !hS.test(r) || e != null && r in Object(
  e);
}
n(gS, "isKey");
var SS = gS, bS = As(Object, "create"), Ur = bS;
function vS() {
  this.__data__ = Ur ? Ur(null) : {}, this.size = 0;
}
n(vS, "hashClear");
var TS = vS;
function ES(r) {
  var e = this.has(r) && delete this.__data__[r];
  return this.size -= e ? 1 : 0, e;
}
n(ES, "hashDelete");
var RS = ES, AS = "__lodash_hash_undefined__", wS = Object.prototype, xS = wS.hasOwnProperty;
function _S(r) {
  var e = this.__data__;
  if (Ur) {
    var t = e[r];
    return t === AS ? void 0 : t;
  }
  return xS.call(e, r) ? e[r] : void 0;
}
n(_S, "hashGet");
var PS = _S, OS = Object.prototype, CS = OS.hasOwnProperty;
function IS(r) {
  var e = this.__data__;
  return Ur ? e[r] !== void 0 : CS.call(e, r);
}
n(IS, "hashHas");
var FS = IS, DS = "__lodash_hash_undefined__";
function NS(r, e) {
  var t = this.__data__;
  return this.size += this.has(r) ? 0 : 1, t[r] = Ur && e === void 0 ? DS : e, this;
}
n(NS, "hashSet");
var qS = NS;
function Ze(r) {
  var e = -1, t = r == null ? 0 : r.length;
  for (this.clear(); ++e < t; ) {
    var o = r[e];
    this.set(o[0], o[1]);
  }
}
n(Ze, "Hash");
Ze.prototype.clear = TS;
Ze.prototype.delete = RS;
Ze.prototype.get = PS;
Ze.prototype.has = FS;
Ze.prototype.set = qS;
var ms = Ze;
function LS() {
  this.__data__ = [], this.size = 0;
}
n(LS, "listCacheClear");
var MS = LS;
function kS(r, e) {
  for (var t = r.length; t--; )
    if (yS(r[t][0], e))
      return t;
  return -1;
}
n(kS, "assocIndexOf");
var $t = kS, jS = Array.prototype, BS = jS.splice;
function US(r) {
  var e = this.__data__, t = $t(e, r);
  if (t < 0)
    return !1;
  var o = e.length - 1;
  return t == o ? e.pop() : BS.call(e, t, 1), --this.size, !0;
}
n(US, "listCacheDelete");
var GS = US;
function HS(r) {
  var e = this.__data__, t = $t(e, r);
  return t < 0 ? void 0 : e[t][1];
}
n(HS, "listCacheGet");
var VS = HS;
function $S(r) {
  return $t(this.__data__, r) > -1;
}
n($S, "listCacheHas");
var WS = $S;
function zS(r, e) {
  var t = this.__data__, o = $t(t, r);
  return o < 0 ? (++this.size, t.push([r, e])) : t[o][1] = e, this;
}
n(zS, "listCacheSet");
var YS = zS;
function er(r) {
  var e = -1, t = r == null ? 0 : r.length;
  for (this.clear(); ++e < t; ) {
    var o = r[e];
    this.set(o[0], o[1]);
  }
}
n(er, "ListCache");
er.prototype.clear = MS;
er.prototype.delete = GS;
er.prototype.get = VS;
er.prototype.has = WS;
er.prototype.set = YS;
var KS = er, XS = As(Cn, "Map"), JS = XS;
function QS() {
  this.size = 0, this.__data__ = {
    hash: new ms(),
    map: new (JS || KS)(),
    string: new ms()
  };
}
n(QS, "mapCacheClear");
var ZS = QS;
function eb(r) {
  var e = typeof r;
  return e == "string" || e == "number" || e == "symbol" || e == "boolean" ? r !== "__proto__" : r === null;
}
n(eb, "isKeyable");
var rb = eb;
function tb(r, e) {
  var t = r.__data__;
  return rb(e) ? t[typeof e == "string" ? "string" : "hash"] : t.map;
}
n(tb, "getMapData");
var Wt = tb;
function ob(r) {
  var e = Wt(this, r).delete(r);
  return this.size -= e ? 1 : 0, e;
}
n(ob, "mapCacheDelete");
var nb = ob;
function ab(r) {
  return Wt(this, r).get(r);
}
n(ab, "mapCacheGet");
var ib = ab;
function sb(r) {
  return Wt(this, r).has(r);
}
n(sb, "mapCacheHas");
var lb = sb;
function cb(r, e) {
  var t = Wt(this, r), o = t.size;
  return t.set(r, e), this.size += t.size == o ? 0 : 1, this;
}
n(cb, "mapCacheSet");
var ub = cb;
function rr(r) {
  var e = -1, t = r == null ? 0 : r.length;
  for (this.clear(); ++e < t; ) {
    var o = r[e];
    this.set(o[0], o[1]);
  }
}
n(rr, "MapCache");
rr.prototype.clear = ZS;
rr.prototype.delete = nb;
rr.prototype.get = ib;
rr.prototype.has = lb;
rr.prototype.set = ub;
var ws = rr, pb = "Expected a function";
function Dn(r, e) {
  if (typeof r != "function" || e != null && typeof e != "function")
    throw new TypeError(pb);
  var t = /* @__PURE__ */ n(function() {
    var o = arguments, a = e ? e.apply(this, o) : o[0], i = t.cache;
    if (i.has(a))
      return i.get(a);
    var l = r.apply(this, o);
    return t.cache = i.set(a, l) || i, l;
  }, "memoized");
  return t.cache = new (Dn.Cache || ws)(), t;
}
n(Dn, "memoize");
Dn.Cache = ws;
var db = Dn, fb = 500;
function yb(r) {
  var e = db(r, function(o) {
    return t.size === fb && t.clear(), o;
  }), t = e.cache;
  return e;
}
n(yb, "memoizeCapped");
var hb = yb, mb = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, gb = /\\(\\)?/g, Sb = hb(
function(r) {
  var e = [];
  return r.charCodeAt(0) === 46 && e.push(""), r.replace(mb, function(t, o, a, i) {
    e.push(a ? i.replace(gb, "$1") : o || t);
  }), e;
}), bb = Sb;
function vb(r) {
  return r == null ? "" : Bg(r);
}
n(vb, "toString");
var Tb = vb;
function Eb(r, e) {
  return Fn(r) ? r : SS(r, e) ? [r] : bb(Tb(r));
}
n(Eb, "castPath");
var Rb = Eb, Ab = 1 / 0;
function wb(r) {
  if (typeof r == "string" || In(r))
    return r;
  var e = r + "";
  return e == "0" && 1 / r == -Ab ? "-0" : e;
}
n(wb, "toKey");
var xb = wb;
function _b(r, e) {
  e = Rb(e, r);
  for (var t = 0, o = e.length; r != null && t < o; )
    r = r[xb(e[t++])];
  return t && t == o ? r : void 0;
}
n(_b, "baseGet");
var Pb = _b;
function Ob(r, e, t) {
  var o = r == null ? void 0 : Pb(r, e);
  return o === void 0 ? t : o;
}
n(Ob, "get");
var Cb = Ob, Vt = hg, Ib = /* @__PURE__ */ n((r) => {
  let e = null, t = !1, o = !1, a = !1, i = "";
  if (r.indexOf("//") >= 0 || r.indexOf("/*") >= 0)
    for (let l = 0; l < r.length; l += 1)
      !e && !t && !o && !a ? r[l] === '"' || r[l] === "'" || r[l] === "`" ? e = r[l] : r[l] === "/" && r[l + 1] === "*" ? t = !0 : r[l] === "\
/" && r[l + 1] === "/" ? o = !0 : r[l] === "/" && r[l + 1] !== "/" && (a = !0) : (e && (r[l] === e && r[l - 1] !== "\\" || r[l] === `
` && e !== "`") && (e = null), a && (r[l] === "/" && r[l - 1] !== "\\" || r[l] === `
`) && (a = !1), t && r[l - 1] === "/" && r[l - 2] === "*" && (t = !1), o && r[l] === `
` && (o = !1)), !t && !o && (i += r[l]);
  else
    i = r;
  return i;
}, "removeCodeComments"), Fb = (0, xs.default)(1e4)(
  (r) => Ib(r).replace(/\n\s*/g, "").trim()
), Db = /* @__PURE__ */ n(function(e, t) {
  let o = t.slice(0, t.indexOf("{")), a = t.slice(t.indexOf("{"));
  if (o.includes("=>") || o.includes("function"))
    return t;
  let i = o;
  return i = i.replace(e, "function"), i + a;
}, "convertShorthandMethods2"), Nb = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z$/, Gr = /* @__PURE__ */ n((r) => r.match(/^[\[\{\"\}].*[\]\}\"]$/),
"isJSON");
function _s(r) {
  if (!Vt(r))
    return r;
  let e = r, t = !1;
  return typeof Event < "u" && r instanceof Event && (e = us(e), t = !0), e = Object.keys(e).reduce((o, a) => {
    try {
      e[a] && e[a].toJSON, o[a] = e[a];
    } catch {
      t = !0;
    }
    return o;
  }, {}), t ? e : r;
}
n(_s, "convertUnconventionalData");
var qb = /* @__PURE__ */ n(function(e) {
  let t, o, a, i;
  return /* @__PURE__ */ n(function(c, s) {
    try {
      if (c === "")
        return i = [], t = /* @__PURE__ */ new Map([[s, "[]"]]), o = /* @__PURE__ */ new Map(), a = [], s;
      let u = o.get(this) || this;
      for (; a.length && u !== a[0]; )
        a.shift(), i.pop();
      if (typeof s == "boolean")
        return s;
      if (s === void 0)
        return e.allowUndefined ? "_undefined_" : void 0;
      if (s === null)
        return null;
      if (typeof s == "number")
        return s === -1 / 0 ? "_-Infinity_" : s === 1 / 0 ? "_Infinity_" : Number.isNaN(s) ? "_NaN_" : s;
      if (typeof s == "bigint")
        return `_bigint_${s.toString()}`;
      if (typeof s == "string")
        return Nb.test(s) ? e.allowDate ? `_date_${s}` : void 0 : s;
      if ((0, dg.default)(s))
        return e.allowRegExp ? `_regexp_${s.flags}|${s.source}` : void 0;
      if ((0, fg.default)(s)) {
        if (!e.allowFunction)
          return;
        let { name: y } = s, h = s.toString();
        return h.match(
          /(\[native code\]|WEBPACK_IMPORTED_MODULE|__webpack_exports__|__webpack_require__)/
        ) ? `_function_${y}|${(() => {
        }).toString()}` : `_function_${y}|${Fb(Db(c, h))}`;
      }
      if ((0, yg.default)(s)) {
        if (!e.allowSymbol)
          return;
        let y = Symbol.keyFor(s);
        return y !== void 0 ? `_gsymbol_${y}` : `_symbol_${s.toString().slice(7, -1)}`;
      }
      if (a.length >= e.maxDepth)
        return Array.isArray(s) ? `[Array(${s.length})]` : "[Object]";
      if (s === this)
        return `_duplicate_${JSON.stringify(i)}`;
      if (s instanceof Error && e.allowError)
        return {
          __isConvertedError__: !0,
          errorProperties: {
            ...s.cause ? { cause: s.cause } : {},
            ...s,
            name: s.name,
            message: s.message,
            stack: s.stack,
            "_constructor-name_": s.constructor.name
          }
        };
      if (s.constructor && s.constructor.name && s.constructor.name !== "Object" && !Array.isArray(s) && !e.allowClass)
        return;
      let p = t.get(s);
      if (!p) {
        let y = Array.isArray(s) ? s : _s(s);
        if (s.constructor && s.constructor.name && s.constructor.name !== "Object" && !Array.isArray(s) && e.allowClass)
          try {
            Object.assign(y, { "_constructor-name_": s.constructor.name });
          } catch {
          }
        return i.push(c), a.unshift(y), t.set(s, JSON.stringify(i)), s !== y && o.set(s, y), y;
      }
      return `_duplicate_${p}`;
    } catch {
      return;
    }
  }, "replace");
}, "replacer2"), Lb = /* @__PURE__ */ n(function reviver(options) {
  let refs = [], root;
  return /* @__PURE__ */ n(function revive(key, value) {
    if (key === "" && (root = value, refs.forEach(({ target: r, container: e, replacement: t }) => {
      let o = Gr(t) ? JSON.parse(t) : t.split(".");
      o.length === 0 ? e[r] = root : e[r] = Cb(root, o);
    })), key === "_constructor-name_")
      return value;
    if (Vt(value) && value.__isConvertedError__) {
      let { message: r, ...e } = value.errorProperties, t = new Error(r);
      return Object.assign(t, e), t;
    }
    if (Vt(value) && value["_constructor-name_"] && options.allowFunction) {
      let r = value["_constructor-name_"];
      if (r !== "Object") {
        let e = new Function(`return function ${r.replace(/[^a-zA-Z0-9$_]+/g, "")}(){}`)();
        Object.setPrototypeOf(value, new e());
      }
      return delete value["_constructor-name_"], value;
    }
    if (typeof value == "string" && value.startsWith("_function_") && options.allowFunction) {
      let [, name, source] = value.match(/_function_([^|]*)\|(.*)/) || [], sourceSanitized = source.replace(/[(\(\))|\\| |\]|`]*$/, "");
      if (!options.lazyEval)
        return eval(`(${sourceSanitized})`);
      let result = /* @__PURE__ */ n((...args) => {
        let f = eval(`(${sourceSanitized})`);
        return f(...args);
      }, "result");
      return Object.defineProperty(result, "toString", {
        value: /* @__PURE__ */ n(() => sourceSanitized, "value")
      }), Object.defineProperty(result, "name", {
        value: name
      }), result;
    }
    if (typeof value == "string" && value.startsWith("_regexp_") && options.allowRegExp) {
      let [, r, e] = value.match(/_regexp_([^|]*)\|(.*)/) || [];
      return new RegExp(e, r);
    }
    return typeof value == "string" && value.startsWith("_date_") && options.allowDate ? new Date(value.replace("_date_", "")) : typeof value ==
    "string" && value.startsWith("_duplicate_") ? (refs.push({ target: key, container: this, replacement: value.replace(/^_duplicate_/, "") }),
    null) : typeof value == "string" && value.startsWith("_symbol_") && options.allowSymbol ? Symbol(value.replace("_symbol_", "")) : typeof value ==
    "string" && value.startsWith("_gsymbol_") && options.allowSymbol ? Symbol.for(value.replace("_gsymbol_", "")) : typeof value == "string" &&
    value === "_-Infinity_" ? -1 / 0 : typeof value == "string" && value === "_Infinity_" ? 1 / 0 : typeof value == "string" && value === "_\
NaN_" ? NaN : typeof value == "string" && value.startsWith("_bigint_") && typeof BigInt == "function" ? BigInt(value.replace("_bigint_", "")) :
    value;
  }, "revive");
}, "reviver"), Ps = {
  maxDepth: 10,
  space: void 0,
  allowFunction: !0,
  allowRegExp: !0,
  allowDate: !0,
  allowClass: !0,
  allowError: !0,
  allowUndefined: !0,
  allowSymbol: !0,
  lazyEval: !0
}, zt = /* @__PURE__ */ n((r, e = {}) => {
  let t = { ...Ps, ...e };
  return JSON.stringify(_s(r), qb(t), e.space);
}, "stringify"), Mb = /* @__PURE__ */ n(() => {
  let r = /* @__PURE__ */ new Map();
  return /* @__PURE__ */ n(function e(t) {
    Vt(t) && Object.entries(t).forEach(([o, a]) => {
      a === "_undefined_" ? t[o] = void 0 : r.get(a) || (r.set(a, !0), e(a));
    }), Array.isArray(t) && t.forEach((o, a) => {
      o === "_undefined_" ? (r.set(o, !0), t[a] = void 0) : r.get(o) || (r.set(o, !0), e(o));
    });
  }, "mutateUndefined");
}, "mutator"), Yt = /* @__PURE__ */ n((r, e = {}) => {
  let t = { ...Ps, ...e }, o = JSON.parse(r, Lb(t));
  return Mb()(o), o;
}, "parse");

// ../node_modules/tiny-invariant/dist/esm/tiny-invariant.js
var kb = !1, Nn = "Invariant failed";
function fe(r, e) {
  if (!r) {
    if (kb)
      throw new Error(Nn);
    var t = typeof e == "function" ? e() : e, o = t ? "".concat(Nn, ": ").concat(t) : Nn;
    throw new Error(o);
  }
}
n(fe, "invariant");

// src/channels/postmessage/getEventSourceUrl.ts
var Os = /* @__PURE__ */ n((r) => {
  let e = Array.from(
    document.querySelectorAll("iframe[data-is-storybook]")
  ), [t, ...o] = e.filter((i) => {
    try {
      return i.contentWindow?.location.origin === r.source.location.origin && i.contentWindow?.location.pathname === r.source.location.pathname;
    } catch {
    }
    try {
      return i.contentWindow === r.source;
    } catch {
    }
    let l = i.getAttribute("src"), c;
    try {
      if (!l)
        return !1;
      ({ origin: c } = new URL(l, document.location.toString()));
    } catch {
      return !1;
    }
    return c === r.origin;
  }), a = t?.getAttribute("src");
  if (a && o.length === 0) {
    let { protocol: i, host: l, pathname: c } = new URL(a, document.location.toString());
    return `${i}//${l}${c}`;
  }
  return o.length > 0 && I.error("found multiple candidates for event source"), null;
}, "getEventSourceUrl");

// src/channels/postmessage/index.ts
var { document: qn, location: Ln } = R, Cs = "storybook-channel", jb = { allowFunction: !1, maxDepth: 25 }, Mn = class Mn {
  constructor(e) {
    this.config = e;
    if (this.buffer = [], typeof R?.addEventListener == "function" && R.addEventListener("message", this.handleEvent.bind(this), !1), e.page !==
    "manager" && e.page !== "preview")
      throw new Error(`postmsg-channel: "config.page" cannot be "${e.page}"`);
  }
  buffer;
  handler;
  connected = !1;
  setHandler(e) {
    this.handler = (...t) => {
      e.apply(this, t), !this.connected && this.getLocalFrame().length && (this.flush(), this.connected = !0);
    };
  }
  /**
   * Sends `event` to the associated window. If the window does not yet exist
   * the event will be stored in a buffer and sent when the window exists.
   * @param event
   */
  send(e, t) {
    let {
      target: o,
      // telejson options
      allowRegExp: a,
      allowFunction: i,
      allowSymbol: l,
      allowDate: c,
      allowError: s,
      allowUndefined: u,
      allowClass: p,
      maxDepth: y,
      space: h,
      lazyEval: g
    } = t || {}, m = Object.fromEntries(
      Object.entries({
        allowRegExp: a,
        allowFunction: i,
        allowSymbol: l,
        allowDate: c,
        allowError: s,
        allowUndefined: u,
        allowClass: p,
        maxDepth: y,
        space: h,
        lazyEval: g
      }).filter(([E, x]) => typeof x < "u")
    ), b = {
      ...jb,
      ...R.CHANNEL_OPTIONS || {},
      ...m
    }, S = this.getFrames(o), T = new URLSearchParams(Ln?.search || ""), v = zt(
      {
        key: Cs,
        event: e,
        refId: T.get("refId")
      },
      b
    );
    return S.length ? (this.buffer.length && this.flush(), S.forEach((E) => {
      try {
        E.postMessage(v, "*");
      } catch {
        I.error("sending over postmessage fail");
      }
    }), Promise.resolve(null)) : new Promise((E, x) => {
      this.buffer.push({ event: e, resolve: E, reject: x });
    });
  }
  flush() {
    let { buffer: e } = this;
    this.buffer = [], e.forEach((t) => {
      this.send(t.event).then(t.resolve).catch(t.reject);
    });
  }
  getFrames(e) {
    if (this.config.page === "manager") {
      let o = Array.from(
        qn.querySelectorAll("iframe[data-is-storybook][data-is-loaded]")
      ).flatMap((a) => {
        try {
          return a.contentWindow && a.dataset.isStorybook !== void 0 && a.id === e ? [a.contentWindow] : [];
        } catch {
          return [];
        }
      });
      return o?.length ? o : this.getCurrentFrames();
    }
    return R && R.parent && R.parent !== R.self ? [R.parent] : [];
  }
  getCurrentFrames() {
    return this.config.page === "manager" ? Array.from(
      qn.querySelectorAll('[data-is-storybook="true"]')
    ).flatMap((t) => t.contentWindow ? [t.contentWindow] : []) : R && R.parent ? [R.parent] : [];
  }
  getLocalFrame() {
    return this.config.page === "manager" ? Array.from(
      qn.querySelectorAll("#storybook-preview-iframe")
    ).flatMap((t) => t.contentWindow ? [t.contentWindow] : []) : R && R.parent ? [R.parent] : [];
  }
  handleEvent(e) {
    try {
      let { data: t } = e, { key: o, event: a, refId: i } = typeof t == "string" && Gr(t) ? Yt(t, R.CHANNEL_OPTIONS || {}) : t;
      if (o === Cs) {
        let l = this.config.page === "manager" ? '<span style="color: #37D5D3; background: black"> manager </span>' : '<span style="color: #\
1EA7FD; background: black"> preview </span>', c = Object.values(ge).includes(a.type) ? `<span style="color: #FF4785">${a.type}</span>` : `<s\
pan style="color: #FFAE00">${a.type}</span>`;
        if (i && (a.refId = i), a.source = this.config.page === "preview" ? e.origin : Os(e), !a.source) {
          Z.error(
            `${l} received ${c} but was unable to determine the source of the event`
          );
          return;
        }
        let s = `${l} received ${c} (${t.length})`;
        Z.debug(
          Ln.origin !== a.source ? s : `${s} <span style="color: gray">(on ${Ln.origin} from ${a.source})</span>`,
          ...a.args
        ), fe(this.handler, "ChannelHandler should be set"), this.handler(a);
      }
    } catch (t) {
      I.error(t);
    }
  }
};
n(Mn, "PostMessageTransport");
var tr = Mn;

// src/channels/websocket/index.ts
var { WebSocket: Bb } = R, kn = class kn {
  buffer = [];
  handler;
  socket;
  isReady = !1;
  constructor({ url: e, onError: t, page: o }) {
    this.socket = new Bb(e), this.socket.onopen = () => {
      this.isReady = !0, this.flush();
    }, this.socket.onmessage = ({ data: a }) => {
      let i = typeof a == "string" && Gr(a) ? Yt(a) : a;
      fe(this.handler, "WebsocketTransport handler should be set"), this.handler(i);
    }, this.socket.onerror = (a) => {
      t && t(a);
    }, this.socket.onclose = () => {
      fe(this.handler, "WebsocketTransport handler should be set"), this.handler({ type: en, args: [], from: o || "preview" });
    };
  }
  setHandler(e) {
    this.handler = e;
  }
  send(e) {
    this.isReady ? this.sendNow(e) : this.sendLater(e);
  }
  sendLater(e) {
    this.buffer.push(e);
  }
  sendNow(e) {
    let t = zt(e, {
      maxDepth: 15,
      allowFunction: !1,
      ...R.CHANNEL_OPTIONS
    });
    this.socket.send(t);
  }
  flush() {
    let { buffer: e } = this;
    this.buffer = [], e.forEach((t) => this.send(t));
  }
};
n(kn, "WebsocketTransport");
var or = kn;

// src/channels/index.ts
var { CONFIG_TYPE: Ub } = R, Gb = Se;
function Hb({ page: r, extraTransports: e = [] }) {
  let t = [new tr({ page: r }), ...e];
  if (Ub === "DEVELOPMENT") {
    let o = window.location.protocol === "http:" ? "ws" : "wss", { hostname: a, port: i } = window.location, l = `${o}://${a}:${i}/storybook\
-server-channel`;
    t.push(new or({ url: l, onError: /* @__PURE__ */ n(() => {
    }, "onError"), page: r }));
  }
  return new Se({ transports: t });
}
n(Hb, "createBrowserChannel");

// src/preview-errors.ts
var rt = {};
Pe(rt, {
  CalledExtractOnStoreError: () => $r,
  CalledPreviewMethodBeforeInitializationError: () => z,
  Category: () => Fs,
  EmptyIndexError: () => Kr,
  ImplicitActionsDuringRendering: () => jn,
  MdxFileWithNoCsfReferencesError: () => Yr,
  MissingRenderToCanvasError: () => Wr,
  MissingStoryAfterHmrError: () => Vr,
  MissingStoryFromCsfFileError: () => Jr,
  MountMustBeDestructuredError: () => Ce,
  NextJsSharpError: () => Un,
  NextjsRouterMocksNotAvailable: () => Gn,
  NoRenderFunctionError: () => Zr,
  NoStoryMatchError: () => Xr,
  NoStoryMountedError: () => et,
  StoryIndexFetchError: () => zr,
  StoryStoreAccessedBeforeInitializationError: () => Qr,
  TestingLibraryMustBeConfiguredError: () => Bn,
  UnknownArgTypesError: () => Hn
});

// ../node_modules/ts-dedent/esm/index.js
function _(r) {
  for (var e = [], t = 1; t < arguments.length; t++)
    e[t - 1] = arguments[t];
  var o = Array.from(typeof r == "string" ? [r] : r);
  o[o.length - 1] = o[o.length - 1].replace(/\r?\n([\t ]*)$/, "");
  var a = o.reduce(function(c, s) {
    var u = s.match(/\n([\t ]+|(?!\s).)/g);
    return u ? c.concat(u.map(function(p) {
      var y, h;
      return (h = (y = p.match(/[\t ]/g)) === null || y === void 0 ? void 0 : y.length) !== null && h !== void 0 ? h : 0;
    })) : c;
  }, []);
  if (a.length) {
    var i = new RegExp(`
[	 ]{` + Math.min.apply(Math, a) + "}", "g");
    o = o.map(function(c) {
      return c.replace(i, `
`);
    });
  }
  o[0] = o[0].replace(/^\r?\n/, "");
  var l = o[0];
  return e.forEach(function(c, s) {
    var u = l.match(/(?:^|\n)( *)$/), p = u ? u[1] : "", y = c;
    typeof c == "string" && c.includes(`
`) && (y = String(c).split(`
`).map(function(h, g) {
      return g === 0 ? h : "" + p + h;
    }).join(`
`)), l += y + o[s + 1];
  }), l;
}
n(_, "dedent");

// src/storybook-error.ts
function Is({
  code: r,
  category: e
}) {
  let t = String(r).padStart(4, "0");
  return `SB_${e}_${t}`;
}
n(Is, "parseErrorCode");
var Kt = class Kt extends Error {
  /**
   * Category of the error. Used to classify the type of error, e.g., 'PREVIEW_API'.
   */
  category;
  /**
   * Code representing the error. Used to uniquely identify the error, e.g., 1.
   */
  code;
  /**
   * Data associated with the error. Used to provide additional information in the error message or to be passed to telemetry.
   */
  data = {};
  /**
   * Specifies the documentation for the error.
   * - If `true`, links to a documentation page on the Storybook website (make sure it exists before enabling) – This is not implemented yet.
   * - If a string, uses the provided URL for documentation (external or FAQ links).
   * - If `false` (default), no documentation link is added.
   */
  documentation;
  /**
   * Flag used to easily determine if the error originates from Storybook.
   */
  fromStorybook = !0;
  get fullErrorCode() {
    return Is({ code: this.code, category: this.category });
  }
  /**
   * Overrides the default `Error.name` property in the format: SB_<CATEGORY>_<CODE>.
   */
  get name() {
    let e = this.constructor.name;
    return `${this.fullErrorCode} (${e})`;
  }
  constructor(e) {
    super(Kt.getFullMessage(e)), this.category = e.category, this.documentation = e.documentation ?? !1, this.code = e.code;
  }
  /**
   * Generates the error message along with additional documentation link (if applicable).
   */
  static getFullMessage({
    documentation: e,
    code: t,
    category: o,
    message: a
  }) {
    let i;
    return e === !0 ? i = `https://storybook.js.org/error/${Is({ code: t, category: o })}` : typeof e == "string" ? i = e : Array.isArray(e) &&
    (i = `
${e.map((l) => `	- ${l}`).join(`
`)}`), `${a}${i != null ? `

More info: ${i}
` : ""}`;
  }
};
n(Kt, "StorybookError");
var G = Kt;

// src/preview-errors.ts
var Fs = /* @__PURE__ */ ((E) => (E.BLOCKS = "BLOCKS", E.DOCS_TOOLS = "DOCS-TOOLS", E.PREVIEW_CLIENT_LOGGER = "PREVIEW_CLIENT-LOGGER", E.PREVIEW_CHANNELS =
"PREVIEW_CHANNELS", E.PREVIEW_CORE_EVENTS = "PREVIEW_CORE-EVENTS", E.PREVIEW_INSTRUMENTER = "PREVIEW_INSTRUMENTER", E.PREVIEW_API = "PREVIEW\
_API", E.PREVIEW_REACT_DOM_SHIM = "PREVIEW_REACT-DOM-SHIM", E.PREVIEW_ROUTER = "PREVIEW_ROUTER", E.PREVIEW_THEMING = "PREVIEW_THEMING", E.RENDERER_HTML =
"RENDERER_HTML", E.RENDERER_PREACT = "RENDERER_PREACT", E.RENDERER_REACT = "RENDERER_REACT", E.RENDERER_SERVER = "RENDERER_SERVER", E.RENDERER_SVELTE =
"RENDERER_SVELTE", E.RENDERER_VUE = "RENDERER_VUE", E.RENDERER_VUE3 = "RENDERER_VUE3", E.RENDERER_WEB_COMPONENTS = "RENDERER_WEB-COMPONENTS",
E.FRAMEWORK_NEXTJS = "FRAMEWORK_NEXTJS", E))(Fs || {}), Vn = class Vn extends G {
  constructor(t) {
    super({
      category: "PREVIEW_API",
      code: 1,
      message: _`
        Couldn't find story matching id '${t.storyId}' after HMR.
        - Did you just rename a story?
        - Did you remove it from your CSF file?
        - Are you sure a story with the id '${t.storyId}' exists?
        - Please check the values in the stories field of your main.js config and see if they would match your CSF File.
        - Also check the browser console and terminal for potential error messages.`
    });
    this.data = t;
  }
};
n(Vn, "MissingStoryAfterHmrError");
var Vr = Vn, $n = class $n extends G {
  constructor(t) {
    super({
      category: "PREVIEW_API",
      code: 2,
      documentation: "https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#using-implicit-actions-during-rendering-is-deprecated-\
for-example-in-the-play-function",
      message: _`
        We detected that you use an implicit action arg while ${t.phase} of your story.  
        ${t.deprecated ? `
This is deprecated and won't work in Storybook 8 anymore.
` : ""}
        Please provide an explicit spy to your args like this:
          import { fn } from '@storybook/test';
          ... 
          args: {
           ${t.name}: fn()
          }`
    });
    this.data = t;
  }
};
n($n, "ImplicitActionsDuringRendering");
var jn = $n, Wn = class Wn extends G {
  constructor() {
    super({
      category: "PREVIEW_API",
      code: 3,
      message: _`
        Cannot call \`storyStore.extract()\` without calling \`storyStore.cacheAllCsfFiles()\` first.

        You probably meant to call \`await preview.extract()\` which does the above for you.`
    });
  }
};
n(Wn, "CalledExtractOnStoreError");
var $r = Wn, zn = class zn extends G {
  constructor() {
    super({
      category: "PREVIEW_API",
      code: 4,
      message: _`
        Expected your framework's preset to export a \`renderToCanvas\` field.

        Perhaps it needs to be upgraded for Storybook 7.0?`,
      documentation: "https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#mainjs-framework-field"
    });
  }
};
n(zn, "MissingRenderToCanvasError");
var Wr = zn, Yn = class Yn extends G {
  constructor(t) {
    super({
      category: "PREVIEW_API",
      code: 5,
      message: _`
        Called \`Preview.${t.methodName}()\` before initialization.
        
        The preview needs to load the story index before most methods can be called. If you want
        to call \`${t.methodName}\`, try \`await preview.initializationPromise;\` first.
        
        If you didn't call the above code, then likely it was called by an addon that needs to
        do the above.`
    });
    this.data = t;
  }
};
n(Yn, "CalledPreviewMethodBeforeInitializationError");
var z = Yn, Kn = class Kn extends G {
  constructor(t) {
    super({
      category: "PREVIEW_API",
      code: 6,
      message: _`
        Error fetching \`/index.json\`:
        
        ${t.text}

        If you are in development, this likely indicates a problem with your Storybook process,
        check the terminal for errors.

        If you are in a deployed Storybook, there may have been an issue deploying the full Storybook
        build.`
    });
    this.data = t;
  }
};
n(Kn, "StoryIndexFetchError");
var zr = Kn, Xn = class Xn extends G {
  constructor(t) {
    super({
      category: "PREVIEW_API",
      code: 7,
      message: _`
        Tried to render docs entry ${t.storyId} but it is a MDX file that has no CSF
        references, or autodocs for a CSF file that some doesn't refer to itself.
        
        This likely is an internal error in Storybook's indexing, or you've attached the
        \`attached-mdx\` tag to an MDX file that is not attached.`
    });
    this.data = t;
  }
};
n(Xn, "MdxFileWithNoCsfReferencesError");
var Yr = Xn, Jn = class Jn extends G {
  constructor() {
    super({
      category: "PREVIEW_API",
      code: 8,
      message: _`
        Couldn't find any stories in your Storybook.

        - Please check your stories field of your main.js config: does it match correctly?
        - Also check the browser console and terminal for error messages.`
    });
  }
};
n(Jn, "EmptyIndexError");
var Kr = Jn, Qn = class Qn extends G {
  constructor(t) {
    super({
      category: "PREVIEW_API",
      code: 9,
      message: _`
        Couldn't find story matching '${t.storySpecifier}'.

        - Are you sure a story with that id exists?
        - Please check your stories field of your main.js config.
        - Also check the browser console and terminal for error messages.`
    });
    this.data = t;
  }
};
n(Qn, "NoStoryMatchError");
var Xr = Qn, Zn = class Zn extends G {
  constructor(t) {
    super({
      category: "PREVIEW_API",
      code: 10,
      message: _`
        Couldn't find story matching id '${t.storyId}' after importing a CSF file.

        The file was indexed as if the story was there, but then after importing the file in the browser
        we didn't find the story. Possible reasons:
        - You are using a custom story indexer that is misbehaving.
        - You have a custom file loader that is removing or renaming exports.

        Please check your browser console and terminal for errors that may explain the issue.`
    });
    this.data = t;
  }
};
n(Zn, "MissingStoryFromCsfFileError");
var Jr = Zn, ea = class ea extends G {
  constructor() {
    super({
      category: "PREVIEW_API",
      code: 11,
      message: _`
        Cannot access the Story Store until the index is ready.

        It is not recommended to use methods directly on the Story Store anyway, in Storybook 9 we will
        remove access to the store entirely`
    });
  }
};
n(ea, "StoryStoreAccessedBeforeInitializationError");
var Qr = ea, ra = class ra extends G {
  constructor(t) {
    super({
      category: "PREVIEW_API",
      code: 12,
      message: _`
      
      To use mount in the play function, you must satisfy the following two requirements: 
      
      1. You *must* destructure the mount property from the \`context\` (the argument passed to your play function). 
         This makes sure that Storybook does not start rendering the story before the play function begins.
      
      2. Your Storybook framework or builder must be configured to transpile to ES2017 or newer. 
         This is because destructuring statements and async/await usages are otherwise transpiled away, 
         which prevents Storybook from recognizing your usage of \`mount\`.
      
      Note that Angular is not supported. As async/await is transpiled to support the zone.js polyfill. 
      
      More info: https://storybook.js.org/docs/writing-tests/interaction-testing#run-code-before-the-component-gets-rendered
      
      Received the following play function:
      ${t.playFunction}`
    });
    this.data = t;
  }
};
n(ra, "MountMustBeDestructuredError");
var Ce = ra, ta = class ta extends G {
  constructor() {
    super({
      category: "PREVIEW_API",
      code: 13,
      message: _`
        You must configure testingLibraryRender to use play in portable stories.
        
        import { render } from '@testing-library/[renderer]';
        
        setProjectAnnotations({
          testingLibraryRender: render,
        });
        
        For other testing renderers, you can configure \`renderToCanvas\` like so:
        
        import { render } from 'your-test-renderer';
        
        setProjectAnnotations({
          renderToCanvas: ({ storyFn }) => {
            const Story = storyFn();
            
            // Svelte
            render(Story.Component, Story.props);
            
            // Vue
            render(Story);
            
            // or for React
            render(<Story/>);
          },
        });`
    });
  }
};
n(ta, "TestingLibraryMustBeConfiguredError");
var Bn = ta, oa = class oa extends G {
  constructor(t) {
    super({
      category: "PREVIEW_API",
      code: 14,
      message: _`
        No render function available for storyId '${t.id}'
      `
    });
    this.data = t;
  }
};
n(oa, "NoRenderFunctionError");
var Zr = oa, na = class na extends G {
  constructor() {
    super({
      category: "PREVIEW_API",
      code: 15,
      message: _`
        No component is mounted in your story.
        
        This usually occurs when you destructure mount in the play function, but forget to call it.
        
        For example:

        async play({ mount, canvasElement }) {
          // 👈 mount should be called: await mount(); 
          const canvas = within(canvasElement);
          const button = await canvas.findByRole('button');
          await userEvent.click(button);
        };

        Make sure to either remove it or call mount in your play function.
      `
    });
  }
};
n(na, "NoStoryMountedError");
var et = na, aa = class aa extends G {
  constructor() {
    super({
      category: "FRAMEWORK_NEXTJS",
      code: 1,
      documentation: "https://storybook.js.org/docs/get-started/nextjs#faq",
      message: _`
      You are importing avif images, but you don't have sharp installed.

      You have to install sharp in order to use image optimization features in Next.js.
      `
    });
  }
};
n(aa, "NextJsSharpError");
var Un = aa, ia = class ia extends G {
  constructor(t) {
    super({
      category: "FRAMEWORK_NEXTJS",
      code: 2,
      message: _`
        Tried to access router mocks from "${t.importType}" but they were not created yet. You might be running code in an unsupported environment.
      `
    });
    this.data = t;
  }
};
n(ia, "NextjsRouterMocksNotAvailable");
var Gn = ia, sa = class sa extends G {
  constructor(t) {
    super({
      category: "DOCS-TOOLS",
      code: 1,
      documentation: "https://github.com/storybookjs/storybook/issues/26606",
      message: _`
        There was a failure when generating detailed ArgTypes in ${t.language} for:
        ${JSON.stringify(t.type, null, 2)} 
        
        Storybook will fall back to use a generic type description instead.

        This type is either not supported or it is a bug in the docgen generation in Storybook.
        If you think this is a bug, please detail it as much as possible in the Github issue.
      `
    });
    this.data = t;
  }
};
n(sa, "UnknownArgTypesError");
var Hn = sa;

// src/preview-api/index.ts
var It = {};
Pe(It, {
  DocsContext: () => ye,
  HooksContext: () => ve,
  Preview: () => je,
  PreviewWeb: () => Ot,
  PreviewWithSelection: () => Be,
  StoryStore: () => ke,
  UrlStore: () => $e,
  WebView: () => ze,
  addons: () => oe,
  applyHooks: () => Jt,
  combineArgs: () => gr,
  combineParameters: () => J,
  composeConfigs: () => St,
  composeStepRunners: () => wo,
  composeStories: () => Cf,
  composeStory: () => Of,
  createPlaywrightTest: () => If,
  decorateStory: () => oi,
  defaultDecorateStory: () => To,
  filterArgTypes: () => yt,
  inferControls: () => Tr,
  makeDecorator: () => $s,
  mockChannel: () => Xt,
  normalizeStory: () => br,
  prepareMeta: () => Eo,
  prepareStory: () => vr,
  sanitizeStoryContextUpdate: () => ni,
  setProjectAnnotations: () => Pf,
  simulateDOMContentLoaded: () => Ct,
  simulatePageLoad: () => os,
  sortStoriesV7: () => kf,
  useArgs: () => Hs,
  useCallback: () => nr,
  useChannel: () => Us,
  useEffect: () => ya,
  useGlobals: () => Vs,
  useMemo: () => qs,
  useParameter: () => Gs,
  useReducer: () => Bs,
  useRef: () => Ms,
  useState: () => js,
  useStoryContext: () => tt,
  userOrAutoTitle: () => qf,
  userOrAutoTitleFromSpecifier: () => ui
});

// src/preview-api/modules/addons/storybook-channel-mock.ts
function Xt() {
  let r = {
    setHandler: /* @__PURE__ */ n(() => {
    }, "setHandler"),
    send: /* @__PURE__ */ n(() => {
    }, "send")
  };
  return new Se({ transport: r });
}
n(Xt, "mockChannel");

// src/preview-api/modules/addons/main.ts
var ua = class ua {
  constructor() {
    this.promise = new Promise((e) => {
      this.resolve = () => e(this.getChannel());
    });
  }
  channel;
  promise;
  resolve;
  getChannel = /* @__PURE__ */ n(() => {
    if (!this.channel) {
      let e = Xt();
      return this.setChannel(e), e;
    }
    return this.channel;
  }, "getChannel");
  ready = /* @__PURE__ */ n(() => this.promise, "ready");
  hasChannel = /* @__PURE__ */ n(() => !!this.channel, "hasChannel");
  setChannel = /* @__PURE__ */ n((e) => {
    this.channel = e, this.resolve();
  }, "setChannel");
};
n(ua, "AddonStore");
var ca = ua, la = "__STORYBOOK_ADDONS_PREVIEW";
function Vb() {
  return R[la] || (R[la] = new ca()), R[la];
}
n(Vb, "getAddonsStore");
var oe = Vb();

// src/preview-api/modules/addons/hooks.ts
var ha = class ha {
  hookListsMap = void 0;
  mountedDecorators = void 0;
  prevMountedDecorators = void 0;
  currentHooks = void 0;
  nextHookIndex = void 0;
  currentPhase = void 0;
  currentEffects = void 0;
  prevEffects = void 0;
  currentDecoratorName = void 0;
  hasUpdates = void 0;
  currentContext = void 0;
  renderListener = /* @__PURE__ */ n((e) => {
    e === this.currentContext?.id && (this.triggerEffects(), this.currentContext = null, this.removeRenderListeners());
  }, "renderListener");
  constructor() {
    this.init();
  }
  init() {
    this.hookListsMap = /* @__PURE__ */ new WeakMap(), this.mountedDecorators = /* @__PURE__ */ new Set(), this.prevMountedDecorators = /* @__PURE__ */ new Set(),
    this.currentHooks = [], this.nextHookIndex = 0, this.currentPhase = "NONE", this.currentEffects = [], this.prevEffects = [], this.currentDecoratorName =
    null, this.hasUpdates = !1, this.currentContext = null;
  }
  clean() {
    this.prevEffects.forEach((e) => {
      e.destroy && e.destroy();
    }), this.init(), this.removeRenderListeners();
  }
  getNextHook() {
    let e = this.currentHooks[this.nextHookIndex];
    return this.nextHookIndex += 1, e;
  }
  triggerEffects() {
    this.prevEffects.forEach((e) => {
      !this.currentEffects.includes(e) && e.destroy && e.destroy();
    }), this.currentEffects.forEach((e) => {
      this.prevEffects.includes(e) || (e.destroy = e.create());
    }), this.prevEffects = this.currentEffects, this.currentEffects = [];
  }
  addRenderListeners() {
    this.removeRenderListeners(), oe.getChannel().on(Xe, this.renderListener);
  }
  removeRenderListeners() {
    oe.getChannel().removeListener(Xe, this.renderListener);
  }
};
n(ha, "HooksContext");
var ve = ha;
function Ds(r) {
  let e = /* @__PURE__ */ n((...t) => {
    let { hooks: o } = typeof t[0] == "function" ? t[1] : t[0], a = o.currentPhase, i = o.currentHooks, l = o.nextHookIndex, c = o.currentDecoratorName;
    o.currentDecoratorName = r.name, o.prevMountedDecorators.has(r) ? (o.currentPhase = "UPDATE", o.currentHooks = o.hookListsMap.get(r) || []) :
    (o.currentPhase = "MOUNT", o.currentHooks = [], o.hookListsMap.set(r, o.currentHooks), o.prevMountedDecorators.add(r)), o.nextHookIndex =
    0;
    let s = R.STORYBOOK_HOOKS_CONTEXT;
    R.STORYBOOK_HOOKS_CONTEXT = o;
    let u = r(...t);
    if (R.STORYBOOK_HOOKS_CONTEXT = s, o.currentPhase === "UPDATE" && o.getNextHook() != null)
      throw new Error(
        "Rendered fewer hooks than expected. This may be caused by an accidental early return statement."
      );
    return o.currentPhase = a, o.currentHooks = i, o.nextHookIndex = l, o.currentDecoratorName = c, u;
  }, "hookified");
  return e.originalFn = r, e;
}
n(Ds, "hookify");
var pa = 0, $b = 25, Jt = /* @__PURE__ */ n((r) => (e, t) => {
  let o = r(
    Ds(e),
    t.map((a) => Ds(a))
  );
  return (a) => {
    let { hooks: i } = a;
    i.prevMountedDecorators ??= /* @__PURE__ */ new Set(), i.mountedDecorators = /* @__PURE__ */ new Set([e, ...t]), i.currentContext = a, i.
    hasUpdates = !1;
    let l = o(a);
    for (pa = 1; i.hasUpdates; )
      if (i.hasUpdates = !1, i.currentEffects = [], l = o(a), pa += 1, pa > $b)
        throw new Error(
          "Too many re-renders. Storybook limits the number of renders to prevent an infinite loop."
        );
    return i.addRenderListeners(), l;
  };
}, "applyHooks"), Wb = /* @__PURE__ */ n((r, e) => r.length === e.length && r.every((t, o) => t === e[o]), "areDepsEqual"), da = /* @__PURE__ */ n(
() => new Error("Storybook preview hooks can only be called inside decorators and story functions."), "invalidHooksError");
function Ns() {
  return R.STORYBOOK_HOOKS_CONTEXT || null;
}
n(Ns, "getHooksContextOrNull");
function fa() {
  let r = Ns();
  if (r == null)
    throw da();
  return r;
}
n(fa, "getHooksContextOrThrow");
function zb(r, e, t) {
  let o = fa();
  if (o.currentPhase === "MOUNT") {
    t != null && !Array.isArray(t) && I.warn(
      `${r} received a final argument that is not an array (instead, received ${t}). When specified, the final argument must be an array.`
    );
    let a = { name: r, deps: t };
    return o.currentHooks.push(a), e(a), a;
  }
  if (o.currentPhase === "UPDATE") {
    let a = o.getNextHook();
    if (a == null)
      throw new Error("Rendered more hooks than during the previous render.");
    return a.name !== r && I.warn(
      `Storybook has detected a change in the order of Hooks${o.currentDecoratorName ? ` called by ${o.currentDecoratorName}` : ""}. This wi\
ll lead to bugs and errors if not fixed.`
    ), t != null && a.deps == null && I.warn(
      `${r} received a final argument during this render, but not during the previous render. Even though the final argument is optional, it\
s type cannot change between renders.`
    ), t != null && a.deps != null && t.length !== a.deps.length && I.warn(`The final argument passed to ${r} changed size between renders. \
The order and size of this array must remain constant.
Previous: ${a.deps}
Incoming: ${t}`), (t == null || a.deps == null || !Wb(t, a.deps)) && (e(a), a.deps = t), a;
  }
  throw da();
}
n(zb, "useHook");
function Qt(r, e, t) {
  let { memoizedState: o } = zb(
    r,
    (a) => {
      a.memoizedState = e();
    },
    t
  );
  return o;
}
n(Qt, "useMemoLike");
function qs(r, e) {
  return Qt("useMemo", r, e);
}
n(qs, "useMemo");
function nr(r, e) {
  return Qt("useCallback", () => r, e);
}
n(nr, "useCallback");
function Ls(r, e) {
  return Qt(r, () => ({ current: e }), []);
}
n(Ls, "useRefLike");
function Ms(r) {
  return Ls("useRef", r);
}
n(Ms, "useRef");
function Yb() {
  let r = Ns();
  if (r != null && r.currentPhase !== "NONE")
    r.hasUpdates = !0;
  else
    try {
      oe.getChannel().emit(qr);
    } catch {
      I.warn("State updates of Storybook preview hooks work only in browser");
    }
}
n(Yb, "triggerUpdate");
function ks(r, e) {
  let t = Ls(
    r,
    // @ts-expect-error S type should never be function, but there's no way to tell that to TypeScript
    typeof e == "function" ? e() : e
  ), o = /* @__PURE__ */ n((a) => {
    t.current = typeof a == "function" ? a(t.current) : a, Yb();
  }, "setState");
  return [t.current, o];
}
n(ks, "useStateLike");
function js(r) {
  return ks("useState", r);
}
n(js, "useState");
function Bs(r, e, t) {
  let o = t != null ? () => t(e) : e, [a, i] = ks("useReducer", o);
  return [a, /* @__PURE__ */ n((c) => i((s) => r(s, c)), "dispatch")];
}
n(Bs, "useReducer");
function ya(r, e) {
  let t = fa(), o = Qt("useEffect", () => ({ create: r }), e);
  t.currentEffects.includes(o) || t.currentEffects.push(o);
}
n(ya, "useEffect");
function Us(r, e = []) {
  let t = oe.getChannel();
  return ya(() => (Object.entries(r).forEach(([o, a]) => t.on(o, a)), () => {
    Object.entries(r).forEach(
      ([o, a]) => t.removeListener(o, a)
    );
  }), [...Object.keys(r), ...e]), nr(t.emit.bind(t), [t]);
}
n(Us, "useChannel");
function tt() {
  let { currentContext: r } = fa();
  if (r == null)
    throw da();
  return r;
}
n(tt, "useStoryContext");
function Gs(r, e) {
  let { parameters: t } = tt();
  if (r)
    return t[r] ?? e;
}
n(Gs, "useParameter");
function Hs() {
  let r = oe.getChannel(), { id: e, args: t } = tt(), o = nr(
    (i) => r.emit(kr, { storyId: e, updatedArgs: i }),
    [r, e]
  ), a = nr(
    (i) => r.emit(Lr, { storyId: e, argNames: i }),
    [r, e]
  );
  return [t, o, a];
}
n(Hs, "useArgs");
function Vs() {
  let r = oe.getChannel(), { globals: e } = tt(), t = nr(
    (o) => r.emit(Mr, { globals: o }),
    [r]
  );
  return [e, t];
}
n(Vs, "useGlobals");

// src/preview-api/modules/addons/make-decorator.ts
var $s = /* @__PURE__ */ n(({
  name: r,
  parameterName: e,
  wrapper: t,
  skipIfNoParametersOrOptions: o = !1
}) => {
  let a = /* @__PURE__ */ n((i) => (l, c) => {
    let s = c.parameters && c.parameters[e];
    return s && s.disable || o && !i && !s ? l(c) : t(l, c, {
      options: i,
      parameters: s
    });
  }, "decorator");
  return (...i) => typeof i[0] == "function" ? a()(...i) : (...l) => {
    if (l.length > 1)
      return i.length > 1 ? a(i)(...l) : a(...i)(...l);
    throw new Error(
      `Passing stories directly into ${r}() is not allowed,
        instead use addDecorator(${r}) and pass options with the '${e}' parameter`
    );
  };
}, "makeDecorator");

// src/preview-api/modules/store/StoryStore.ts
var _o = W(Ht(), 1), Df = W(dt(), 1), si = W(Bd(), 1);

// src/preview-api/modules/store/StoryIndexStore.ts
var Ud = W(Ht(), 1);
var Q_ = (0, Ud.default)(1)(
  (r) => Object.values(r).reduce(
    (e, t) => (e[t.importPath] = e[t.importPath] || t, e),
    {}
  )
), Xa = class Xa {
  entries;
  constructor({ entries: e } = { v: 5, entries: {} }) {
    this.entries = e;
  }
  entryFromSpecifier(e) {
    let t = Object.values(this.entries);
    if (e === "*")
      return t[0];
    if (typeof e == "string")
      return this.entries[e] ? this.entries[e] : t.find((i) => i.id.startsWith(e));
    let { name: o, title: a } = e;
    return t.find((i) => i.name === o && i.title === a);
  }
  storyIdToEntry(e) {
    let t = this.entries[e];
    if (!t)
      throw new Vr({ storyId: e });
    return t;
  }
  importPathToEntry(e) {
    return Q_(this.entries)[e];
  }
};
n(Xa, "StoryIndexStore");
var fo = Xa;

// ../node_modules/dequal/dist/index.mjs
var Gd = Object.prototype.hasOwnProperty;
function Hd(r, e, t) {
  for (t of r.keys())
    if (hr(t, e)) return t;
}
n(Hd, "find");
function hr(r, e) {
  var t, o, a;
  if (r === e) return !0;
  if (r && e && (t = r.constructor) === e.constructor) {
    if (t === Date) return r.getTime() === e.getTime();
    if (t === RegExp) return r.toString() === e.toString();
    if (t === Array) {
      if ((o = r.length) === e.length)
        for (; o-- && hr(r[o], e[o]); ) ;
      return o === -1;
    }
    if (t === Set) {
      if (r.size !== e.size)
        return !1;
      for (o of r)
        if (a = o, a && typeof a == "object" && (a = Hd(e, a), !a) || !e.has(a)) return !1;
      return !0;
    }
    if (t === Map) {
      if (r.size !== e.size)
        return !1;
      for (o of r)
        if (a = o[0], a && typeof a == "object" && (a = Hd(e, a), !a) || !hr(o[1], e.get(a)))
          return !1;
      return !0;
    }
    if (t === ArrayBuffer)
      r = new Uint8Array(r), e = new Uint8Array(e);
    else if (t === DataView) {
      if ((o = r.byteLength) === e.byteLength)
        for (; o-- && r.getInt8(o) === e.getInt8(o); ) ;
      return o === -1;
    }
    if (ArrayBuffer.isView(r)) {
      if ((o = r.byteLength) === e.byteLength)
        for (; o-- && r[o] === e[o]; ) ;
      return o === -1;
    }
    if (!t || typeof r == "object") {
      o = 0;
      for (t in r)
        if (Gd.call(r, t) && ++o && !Gd.call(e, t) || !(t in e) || !hr(r[t], e[t])) return !1;
      return Object.keys(e).length === o;
    }
  }
  return r !== r && e !== e;
}
n(hr, "dequal");

// src/preview-api/modules/store/args.ts
var ft = W(yo(), 1);
var mr = Symbol("incompatible"), Qa = /* @__PURE__ */ n((r, e) => {
  let t = e.type;
  if (r == null || !t || e.mapping)
    return r;
  switch (t.name) {
    case "string":
      return String(r);
    case "enum":
      return r;
    case "number":
      return Number(r);
    case "boolean":
      return String(r) === "true";
    case "array":
      return !t.value || !Array.isArray(r) ? mr : r.reduce((o, a, i) => {
        let l = Qa(a, { type: t.value });
        return l !== mr && (o[i] = l), o;
      }, new Array(r.length));
    case "object":
      return typeof r == "string" || typeof r == "number" ? r : !t.value || typeof r != "object" ? mr : Object.entries(r).reduce((o, [a, i]) => {
        let l = Qa(i, { type: t.value[a] });
        return l === mr ? o : Object.assign(o, { [a]: l });
      }, {});
    default:
      return mr;
  }
}, "map"), zd = /* @__PURE__ */ n((r, e) => Object.entries(r).reduce((t, [o, a]) => {
  if (!e[o]) return t;
  let i = Qa(a, e[o]);
  return i === mr ? t : Object.assign(t, { [o]: i });
}, {}), "mapArgsToTypes"), gr = /* @__PURE__ */ n((r, e) => Array.isArray(r) && Array.isArray(e) ? e.reduce(
  (t, o, a) => (t[a] = gr(r[a], e[a]), t),
  [...r]
).filter((t) => t !== void 0) : !(0, ft.default)(r) || !(0, ft.default)(e) ? e : Object.keys({ ...r, ...e }).reduce((t, o) => {
  if (o in e) {
    let a = gr(r[o], e[o]);
    a !== void 0 && (t[o] = a);
  } else
    t[o] = r[o];
  return t;
}, {}), "combineArgs"), Yd = /* @__PURE__ */ n((r, e) => Object.entries(e).reduce((t, [o, { options: a }]) => {
  function i() {
    return o in r && (t[o] = r[o]), t;
  }
  if (n(i, "allowArg"), !a) return i();
  if (!Array.isArray(a))
    return j.error(_`
        Invalid argType: '${o}.options' should be an array.

        More info: https://storybook.js.org/docs/react/api/argtypes
      `), i();
  if (a.some((y) => y && ["object", "function"].includes(typeof y)))
    return j.error(_`
        Invalid argType: '${o}.options' should only contain primitives. Use a 'mapping' for complex values.

        More info: https://storybook.js.org/docs/react/writing-stories/args#mapping-to-complex-arg-values
      `), i();
  let l = Array.isArray(r[o]), c = l && r[o].findIndex((y) => !a.includes(y)), s = l && c === -1;
  if (r[o] === void 0 || a.includes(r[o]) || s)
    return i();
  let u = l ? `${o}[${c}]` : o, p = a.map((y) => typeof y == "string" ? `'${y}'` : String(y)).join(", ");
  return j.warn(`Received illegal value for '${u}'. Supported options: ${p}`), t;
}, {}), "validateOptions"), Ne = Symbol("Deeply equal"), Sr = /* @__PURE__ */ n((r, e) => {
  if (typeof r != typeof e) return e;
  if (hr(r, e)) return Ne;
  if (Array.isArray(r) && Array.isArray(e)) {
    let t = e.reduce((o, a, i) => {
      let l = Sr(r[i], a);
      return l !== Ne && (o[i] = l), o;
    }, new Array(e.length));
    return e.length >= r.length ? t : t.concat(new Array(r.length - e.length).fill(void 0));
  }
  return (0, ft.default)(r) && (0, ft.default)(e) ? Object.keys({ ...r, ...e }).reduce((t, o) => {
    let a = Sr(r?.[o], e?.[o]);
    return a === Ne ? t : Object.assign(t, { [o]: a });
  }, {}) : e;
}, "deepDiff"), Za = "UNTARGETED";
function Kd({
  args: r,
  argTypes: e
}) {
  let t = {};
  return Object.entries(r).forEach(([o, a]) => {
    let { target: i = Za } = e[o] || {};
    t[i] = t[i] || {}, t[i][o] = a;
  }), t;
}
n(Kd, "groupArgsByTarget");

// src/preview-api/modules/store/ArgsStore.ts
function uP(r) {
  return Object.keys(r).forEach((e) => r[e] === void 0 && delete r[e]), r;
}
n(uP, "deleteUndefined");
var ei = class ei {
  initialArgsByStoryId = {};
  argsByStoryId = {};
  get(e) {
    if (!(e in this.argsByStoryId))
      throw new Error(`No args known for ${e} -- has it been rendered yet?`);
    return this.argsByStoryId[e];
  }
  setInitial(e) {
    if (!this.initialArgsByStoryId[e.id])
      this.initialArgsByStoryId[e.id] = e.initialArgs, this.argsByStoryId[e.id] = e.initialArgs;
    else if (this.initialArgsByStoryId[e.id] !== e.initialArgs) {
      let t = Sr(this.initialArgsByStoryId[e.id], this.argsByStoryId[e.id]);
      this.initialArgsByStoryId[e.id] = e.initialArgs, this.argsByStoryId[e.id] = e.initialArgs, t !== Ne && this.updateFromDelta(e, t);
    }
  }
  updateFromDelta(e, t) {
    let o = Yd(t, e.argTypes);
    this.argsByStoryId[e.id] = gr(this.argsByStoryId[e.id], o);
  }
  updateFromPersisted(e, t) {
    let o = zd(t, e.argTypes);
    return this.updateFromDelta(e, o);
  }
  update(e, t) {
    if (!(e in this.argsByStoryId))
      throw new Error(`No args known for ${e} -- has it been rendered yet?`);
    this.argsByStoryId[e] = uP({
      ...this.argsByStoryId[e],
      ...t
    });
  }
};
n(ei, "ArgsStore");
var ho = ei;

// src/preview-api/modules/store/csf/getValuesFromArgTypes.ts
var mo = /* @__PURE__ */ n((r = {}) => Object.entries(r).reduce((e, [t, { defaultValue: o }]) => (typeof o < "u" && (e[t] = o), e), {}), "ge\
tValuesFromArgTypes");

// src/preview-api/modules/store/GlobalsStore.ts
var ri = class ri {
  // We use ! here because TS doesn't analyse the .set() function to see if it actually get set
  allowedGlobalNames;
  initialGlobals;
  globals;
  constructor({
    globals: e = {},
    globalTypes: t = {}
  }) {
    this.set({ globals: e, globalTypes: t });
  }
  set({ globals: e = {}, globalTypes: t = {} }) {
    let o = this.initialGlobals && Sr(this.initialGlobals, this.globals);
    this.allowedGlobalNames = /* @__PURE__ */ new Set([...Object.keys(e), ...Object.keys(t)]);
    let a = mo(t);
    this.initialGlobals = { ...a, ...e }, this.globals = this.initialGlobals, o && o !== Ne && this.updateFromPersisted(o);
  }
  filterAllowedGlobals(e) {
    return Object.entries(e).reduce((t, [o, a]) => (this.allowedGlobalNames.has(o) ? t[o] = a : I.warn(
      `Attempted to set a global (${o}) that is not defined in initial globals or globalTypes`
    ), t), {});
  }
  updateFromPersisted(e) {
    let t = this.filterAllowedGlobals(e);
    this.globals = { ...this.globals, ...t };
  }
  get() {
    return this.globals;
  }
  update(e) {
    this.globals = { ...this.globals, ...this.filterAllowedGlobals(e) };
  }
};
n(ri, "GlobalsStore");
var go = ri;

// src/preview-api/modules/store/csf/normalizeInputTypes.ts
var Xd = W(dt(), 1);
var pP = /* @__PURE__ */ n((r) => typeof r == "string" ? { name: r } : r, "normalizeType"), dP = /* @__PURE__ */ n((r) => typeof r == "strin\
g" ? { type: r } : r, "normalizeControl"), fP = /* @__PURE__ */ n((r, e) => {
  let { type: t, control: o, ...a } = r, i = {
    name: e,
    ...a
  };
  return t && (i.type = pP(t)), o ? i.control = dP(o) : o === !1 && (i.control = { disable: !0 }), i;
}, "normalizeInputType"), qe = /* @__PURE__ */ n((r) => (0, Xd.default)(r, fP), "normalizeInputTypes");

// ../node_modules/@storybook/csf/dist/index.mjs
var yP = Object.create, ef = Object.defineProperty, hP = Object.getOwnPropertyDescriptor, mP = Object.getOwnPropertyNames, gP = Object.getPrototypeOf,
SP = Object.prototype.hasOwnProperty, bP = /* @__PURE__ */ n((r, e) => () => (e || r((e = { exports: {} }).exports, e), e.exports), "v"), vP = /* @__PURE__ */ n(
(r, e, t, o) => {
  if (e && typeof e == "object" || typeof e == "function") for (let a of mP(e)) !SP.call(r, a) && a !== t && ef(r, a, { get: /* @__PURE__ */ n(
  () => e[a], "get"), enumerable: !(o = hP(e, a)) || o.enumerable });
  return r;
}, "E"), TP = /* @__PURE__ */ n((r, e, t) => (t = r != null ? yP(gP(r)) : {}, vP(e || !r || !r.__esModule ? ef(t, "default", { value: r, enumerable: !0 }) :
t, r)), "I"), EP = bP((r) => {
  Object.defineProperty(r, "__esModule", { value: !0 }), r.isEqual = /* @__PURE__ */ function() {
    var e = Object.prototype.toString, t = Object.getPrototypeOf, o = Object.getOwnPropertySymbols ? function(a) {
      return Object.keys(a).concat(Object.getOwnPropertySymbols(a));
    } : Object.keys;
    return function(a, i) {
      return (/* @__PURE__ */ n(function l(c, s, u) {
        var p, y, h, g = e.call(c), m = e.call(s);
        if (c === s) return !0;
        if (c == null || s == null) return !1;
        if (u.indexOf(c) > -1 && u.indexOf(s) > -1) return !0;
        if (u.push(c, s), g != m || (p = o(c), y = o(s), p.length != y.length || p.some(function(b) {
          return !l(c[b], s[b], u);
        }))) return !1;
        switch (g.slice(8, -1)) {
          case "Symbol":
            return c.valueOf() == s.valueOf();
          case "Date":
          case "Number":
            return +c == +s || +c != +c && +s != +s;
          case "RegExp":
          case "Function":
          case "String":
          case "Boolean":
            return "" + c == "" + s;
          case "Set":
          case "Map":
            p = c.entries(), y = s.entries();
            do
              if (!l((h = p.next()).value, y.next().value, u)) return !1;
            while (!h.done);
            return !0;
          case "ArrayBuffer":
            c = new Uint8Array(c), s = new Uint8Array(s);
          case "DataView":
            c = new Uint8Array(c.buffer), s = new Uint8Array(s.buffer);
          case "Float32Array":
          case "Float64Array":
          case "Int8Array":
          case "Int16Array":
          case "Int32Array":
          case "Uint8Array":
          case "Uint16Array":
          case "Uint32Array":
          case "Uint8ClampedArray":
          case "Arguments":
          case "Array":
            if (c.length != s.length) return !1;
            for (h = 0; h < c.length; h++) if ((h in c || h in s) && (h in c != h in s || !l(c[h], s[h], u))) return !1;
            return !0;
          case "Object":
            return l(t(c), t(s), u);
          default:
            return !1;
        }
      }, "i"))(a, i, []);
    };
  }();
});
function RP(r) {
  return r.replace(/_/g, " ").replace(/-/g, " ").replace(/\./g, " ").replace(/([^\n])([A-Z])([a-z])/g, (e, t, o, a) => `${t} ${o}${a}`).replace(
  /([a-z])([A-Z])/g, (e, t, o) => `${t} ${o}`).replace(/([a-z])([0-9])/gi, (e, t, o) => `${t} ${o}`).replace(/([0-9])([a-z])/gi, (e, t, o) => `${t}\
 ${o}`).replace(/(\s|^)(\w)/g, (e, t, o) => `${t}${o.toUpperCase()}`).replace(/ +/g, " ").trim();
}
n(RP, "R");
var Jd = TP(EP()), rf = /* @__PURE__ */ n((r) => r.map((e) => typeof e < "u").filter(Boolean).length, "S"), AP = /* @__PURE__ */ n((r, e) => {
  let { exists: t, eq: o, neq: a, truthy: i } = r;
  if (rf([t, o, a, i]) > 1) throw new Error(`Invalid conditional test ${JSON.stringify({ exists: t, eq: o, neq: a })}`);
  if (typeof o < "u") return (0, Jd.isEqual)(e, o);
  if (typeof a < "u") return !(0, Jd.isEqual)(e, a);
  if (typeof t < "u") {
    let l = typeof e < "u";
    return t ? l : !l;
  }
  return typeof i > "u" || i ? !!e : !e;
}, "k"), tf = /* @__PURE__ */ n((r, e, t) => {
  if (!r.if) return !0;
  let { arg: o, global: a } = r.if;
  if (rf([o, a]) !== 1) throw new Error(`Invalid conditional value ${JSON.stringify({ arg: o, global: a })}`);
  let i = o ? e[o] : t[a];
  return AP(r.if, i);
}, "P"), ti = /* @__PURE__ */ n((r) => r.toLowerCase().replace(/[ ’–—―′¿'`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, "-").replace(
/-+/g, "-").replace(/^-+/, "").replace(/-+$/, ""), "O"), Qd = /* @__PURE__ */ n((r, e) => {
  let t = ti(r);
  if (t === "") throw new Error(`Invalid ${e} '${r}', must include alphanumeric characters`);
  return t;
}, "m"), of = /* @__PURE__ */ n((r, e) => `${Qd(r, "kind")}${e ? `--${Qd(e, "name")}` : ""}`, "G"), nf = /* @__PURE__ */ n((r) => RP(r), "N");
function Zd(r, e) {
  return Array.isArray(e) ? e.includes(r) : r.match(e);
}
n(Zd, "f");
function So(r, { includeStories: e, excludeStories: t }) {
  return r !== "__esModule" && (!e || Zd(r, e)) && (!t || !Zd(r, t));
}
n(So, "M");
var af = /* @__PURE__ */ n((...r) => {
  let e = r.reduce((t, o) => (o.startsWith("!") ? t.delete(o.slice(1)) : t.add(o), t), /* @__PURE__ */ new Set());
  return Array.from(e);
}, "z");

// src/preview-api/modules/store/csf/normalizeArrays.ts
var B = /* @__PURE__ */ n((r) => Array.isArray(r) ? r : r ? [r] : [], "normalizeArrays");

// src/preview-api/modules/store/csf/normalizeStory.ts
var wP = _`
CSF .story annotations deprecated; annotate story functions directly:
- StoryFn.story.name => StoryFn.storyName
- StoryFn.story.(parameters|decorators) => StoryFn.(parameters|decorators)
See https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#hoisted-csf-annotations for details and codemod.
`;
function br(r, e, t) {
  let o = e, a = typeof e == "function" ? e : null, { story: i } = o;
  i && (I.debug("deprecated story", i), ae(wP));
  let l = nf(r), c = typeof o != "function" && o.name || o.storyName || i?.name || l, s = [
    ...B(o.decorators),
    ...B(i?.decorators)
  ], u = { ...i?.parameters, ...o.parameters }, p = { ...i?.args, ...o.args }, y = { ...i?.argTypes, ...o.argTypes }, h = [...B(o.loaders), ...B(
  i?.loaders)], g = [
    ...B(o.beforeEach),
    ...B(i?.beforeEach)
  ], { render: m, play: b, tags: S = [] } = o, T = u.__id || of(t.id, l);
  return {
    moduleExport: e,
    id: T,
    name: c,
    tags: S,
    decorators: s,
    parameters: u,
    args: p,
    argTypes: qe(y),
    loaders: h,
    beforeEach: g,
    ...m && { render: m },
    ...a && { userStoryFn: a },
    ...b && { play: b }
  };
}
n(br, "normalizeStory");

// src/preview-api/modules/store/csf/normalizeComponentAnnotations.ts
function bo(r, e = r.title, t) {
  let { id: o, argTypes: a } = r;
  return {
    id: ti(o || e),
    ...r,
    title: e,
    ...a && { argTypes: qe(a) },
    parameters: {
      fileName: t,
      ...r.parameters
    }
  };
}
n(bo, "normalizeComponentAnnotations");

// src/preview-api/modules/store/csf/processCSFFile.ts
var xP = /* @__PURE__ */ n((r) => {
  let { globals: e, globalTypes: t } = r;
  (e || t) && I.error(
    "Global args/argTypes can only be set globally",
    JSON.stringify({
      globals: e,
      globalTypes: t
    })
  );
}, "checkGlobals"), _P = /* @__PURE__ */ n((r) => {
  let { options: e } = r;
  e?.storySort && I.error("The storySort option parameter can only be set globally");
}, "checkStorySort"), sf = /* @__PURE__ */ n((r) => {
  r && (xP(r), _P(r));
}, "checkDisallowedParameters");
function lf(r, e, t) {
  let { default: o, __namedExportsOrder: a, ...i } = r, l = bo(
    o,
    t,
    e
  );
  sf(l.parameters);
  let c = { meta: l, stories: {}, moduleExports: r };
  return Object.keys(i).forEach((s) => {
    if (So(s, l)) {
      let u = br(s, i[s], l);
      sf(u.parameters), c.stories[u.id] = u;
    }
  }), c;
}
n(lf, "processCSFFile");

// src/preview-api/modules/store/parameters.ts
var vo = W(yo(), 1);
var J = /* @__PURE__ */ n((...r) => {
  let e = {}, t = r.filter(Boolean), o = t.reduce((a, i) => (Object.entries(i).forEach(([l, c]) => {
    let s = a[l];
    Array.isArray(c) || typeof s > "u" ? a[l] = c : (0, vo.default)(c) && (0, vo.default)(s) ? e[l] = !0 : typeof c < "u" && (a[l] = c);
  }), a), {});
  return Object.keys(e).forEach((a) => {
    let i = t.filter(Boolean).map((l) => l[a]).filter((l) => typeof l < "u");
    i.every((l) => (0, vo.default)(l)) ? o[a] = J(...i) : o[a] = i[i.length - 1];
  }), o;
}, "combineParameters");

// src/preview-api/modules/store/decorators.ts
function oi(r, e, t) {
  let o = t(r);
  return (a) => e(o, a);
}
n(oi, "decorateStory");
function ni({
  componentId: r,
  title: e,
  kind: t,
  id: o,
  name: a,
  story: i,
  parameters: l,
  initialArgs: c,
  argTypes: s,
  ...u
} = {}) {
  return u;
}
n(ni, "sanitizeStoryContextUpdate");
function To(r, e) {
  let t = {}, o = /* @__PURE__ */ n((i) => (l) => {
    if (!t.value) throw new Error("Decorated function called without init");
    return t.value = {
      ...t.value,
      ...ni(l)
    }, i(t.value);
  }, "bindWithContext"), a = e.reduce(
    (i, l) => oi(i, l, o),
    r
  );
  return (i) => (t.value = i, a(i));
}
n(To, "defaultDecorateStory");

// src/preview-api/modules/preview-web/render/mount-utils.ts
function uf(r) {
  return r != null && PP(r).includes("mount");
}
n(uf, "mountDestructured");
function PP(r) {
  let e = r.toString().match(/[^(]*\(([^)]*)/);
  if (!e) return [];
  let t = cf(e[1]);
  if (!t.length) return [];
  let o = t[0];
  return o.startsWith("{") && o.endsWith("}") ? cf(o.slice(1, -1).replace(/\s/g, "")).map((i) => i.replace(/:.*|=.*/g, "")) : [];
}
n(PP, "getUsedProps");
function cf(r) {
  let e = [], t = [], o = 0;
  for (let i = 0; i < r.length; i++)
    if (r[i] === "{" || r[i] === "[")
      t.push(r[i] === "{" ? "}" : "]");
    else if (r[i] === t[t.length - 1])
      t.pop();
    else if (!t.length && r[i] === ",") {
      let l = r.substring(o, i).trim();
      l && e.push(l), o = i + 1;
    }
  let a = r.substring(o).trim();
  return a && e.push(a), e;
}
n(cf, "splitByComma");

// src/preview-api/modules/store/csf/prepareStory.ts
function vr(r, e, t) {
  let { moduleExport: o, id: a, name: i } = r || {}, l = pf(
    r,
    e,
    t
  ), c = /* @__PURE__ */ n(async (A) => {
    let C = {};
    for (let N of [
      ..."__STORYBOOK_TEST_LOADERS__" in R && Array.isArray(R.__STORYBOOK_TEST_LOADERS__) ? [R.__STORYBOOK_TEST_LOADERS__] : [],
      B(t.loaders),
      B(e.loaders),
      B(r.loaders)
    ]) {
      if (A.abortSignal.aborted) return C;
      let P = await Promise.all(N.map((H) => H(A)));
      Object.assign(C, ...P);
    }
    return C;
  }, "applyLoaders"), s = /* @__PURE__ */ n(async (A) => {
    let C = new Array();
    for (let N of [
      ...B(t.beforeEach),
      ...B(e.beforeEach),
      ...B(r.beforeEach)
    ]) {
      if (A.abortSignal.aborted) return C;
      let P = await N(A);
      P && C.push(P);
    }
    return C;
  }, "applyBeforeEach"), u = /* @__PURE__ */ n((A) => A.originalStoryFn(A.args, A), "undecoratedStoryFn"), { applyDecorators: p = To, runStep: y } = t,
  h = [
    ...B(r?.decorators),
    ...B(e?.decorators),
    ...B(t?.decorators)
  ], g = r?.userStoryFn || r?.render || e.render || t.render, m = Jt(p)(u, h), b = /* @__PURE__ */ n((A) => m(A), "unboundStoryFn"), S = r?.
  play ?? e?.play, T = uf(S);
  if (!g && !T)
    throw new Zr({ id: a });
  let v = /* @__PURE__ */ n((A) => async () => (await A.renderToCanvas(), A.canvas), "defaultMount"), E = r.mount ?? e.mount ?? t.mount ?? v,
  x = t.testingLibraryRender;
  return {
    ...l,
    moduleExport: o,
    id: a,
    name: i,
    story: i,
    originalStoryFn: g,
    undecoratedStoryFn: u,
    unboundStoryFn: b,
    applyLoaders: c,
    applyBeforeEach: s,
    playFunction: S,
    runStep: y,
    mount: E,
    testingLibraryRender: x,
    renderToCanvas: t.renderToCanvas,
    usesMount: T
  };
}
n(vr, "prepareStory");
function Eo(r, e, t) {
  return {
    ...pf(void 0, r, e),
    moduleExport: t
  };
}
n(Eo, "prepareMeta");
function pf(r, e, t) {
  let o = ["dev", "test"], a = R.DOCS_OPTIONS?.autodocs === !0 ? ["autodocs"] : [], i = af(
    ...o,
    ...a,
    ...t.tags ?? [],
    ...e.tags ?? [],
    ...r?.tags ?? []
  ), l = J(
    t.parameters,
    e.parameters,
    r?.parameters
  ), { argTypesEnhancers: c = [], argsEnhancers: s = [] } = t, u = J(
    t.argTypes,
    e.argTypes,
    r?.argTypes
  );
  if (r) {
    let S = r?.userStoryFn || r?.render || e.render || t.render;
    l.__isArgsStory = S && S.length > 0;
  }
  let p = {
    ...t.args,
    ...e.args,
    ...r?.args
  }, y = {
    componentId: e.id,
    title: e.title,
    kind: e.title,
    // Back compat
    id: r?.id || e.id,
    // if there's no story name, we create a fake one since enhancers expect a name
    name: r?.name || "__meta",
    story: r?.name || "__meta",
    // Back compat
    component: e.component,
    subcomponents: e.subcomponents,
    tags: i,
    parameters: l,
    initialArgs: p,
    argTypes: u
  };
  y.argTypes = c.reduce(
    (S, T) => T({ ...y, argTypes: S }),
    y.argTypes
  );
  let h = { ...p };
  y.initialArgs = s.reduce(
    (S, T) => ({
      ...S,
      ...T({
        ...y,
        initialArgs: S
      })
    }),
    h
  );
  let { name: g, story: m, ...b } = y;
  return b;
}
n(pf, "preparePartialAnnotations");
function Ro(r) {
  let { args: e } = r, t = {
    ...r,
    allArgs: void 0,
    argsByTarget: void 0
  };
  if (R.FEATURES?.argTypeTargetsV7) {
    let i = Kd(r);
    t = {
      ...r,
      allArgs: r.args,
      argsByTarget: i,
      args: i[Za] || {}
    };
  }
  let o = Object.entries(t.args).reduce((i, [l, c]) => {
    if (!t.argTypes[l]?.mapping)
      return i[l] = c, i;
    let s = /* @__PURE__ */ n((u) => {
      let p = t.argTypes[l].mapping;
      return p && u in p ? p[u] : u;
    }, "mappingFn");
    return i[l] = Array.isArray(c) ? c.map(s) : s(c), i;
  }, {}), a = Object.entries(o).reduce((i, [l, c]) => {
    let s = t.argTypes[l] || {};
    return tf(s, o, t.globals) && (i[l] = c), i;
  }, {});
  return { ...t, unmappedArgs: e, args: a };
}
n(Ro, "prepareContext");

// src/preview-api/modules/store/inferArgTypes.ts
var Ao = W(dt(), 1);
var ai = /* @__PURE__ */ n((r, e, t) => {
  let o = typeof r;
  switch (o) {
    case "boolean":
    case "string":
    case "number":
    case "function":
    case "symbol":
      return { name: o };
    default:
      break;
  }
  return r ? t.has(r) ? (I.warn(_`
        We've detected a cycle in arg '${e}'. Args should be JSON-serializable.

        Consider using the mapping feature or fully custom args:
        - Mapping: https://storybook.js.org/docs/react/writing-stories/args#mapping-to-complex-arg-values
        - Custom args: https://storybook.js.org/docs/react/essentials/controls#fully-custom-args
      `), { name: "other", value: "cyclic object" }) : (t.add(r), Array.isArray(r) ? { name: "array", value: r.length > 0 ? ai(r[0], e, new Set(
  t)) : { name: "other", value: "unknown" } } : { name: "object", value: (0, Ao.default)(r, (i) => ai(i, e, new Set(t))) }) : { name: "objec\
t", value: {} };
}, "inferType"), ii = /* @__PURE__ */ n((r) => {
  let { id: e, argTypes: t = {}, initialArgs: o = {} } = r, a = (0, Ao.default)(o, (l, c) => ({
    name: c,
    type: ai(l, `${e}.${c}`, /* @__PURE__ */ new Set())
  })), i = (0, Ao.default)(t, (l, c) => ({
    name: c
  }));
  return J(a, i, t);
}, "inferArgTypes");
ii.secondPass = !0;

// src/preview-api/modules/store/inferControls.ts
var xf = W(dt(), 1);

// src/preview-api/modules/store/filterArgTypes.ts
var wf = W(Rf(), 1);
var Af = /* @__PURE__ */ n((r, e) => Array.isArray(e) ? e.includes(r) : r.match(e), "matches"), yt = /* @__PURE__ */ n((r, e, t) => !e && !t ?
r : r && (0, wf.default)(r, (o, a) => {
  let i = o.name || a;
  return (!e || Af(i, e)) && (!t || !Af(i, t));
}), "filterArgTypes");

// src/preview-api/modules/store/inferControls.ts
var rO = /* @__PURE__ */ n((r, e, t) => {
  let { type: o, options: a } = r;
  if (o) {
    if (t.color && t.color.test(e)) {
      let i = o.name;
      if (i === "string")
        return { control: { type: "color" } };
      i !== "enum" && I.warn(
        `Addon controls: Control of type color only supports string, received "${i}" instead`
      );
    }
    if (t.date && t.date.test(e))
      return { control: { type: "date" } };
    switch (o.name) {
      case "array":
        return { control: { type: "object" } };
      case "boolean":
        return { control: { type: "boolean" } };
      case "string":
        return { control: { type: "text" } };
      case "number":
        return { control: { type: "number" } };
      case "enum": {
        let { value: i } = o;
        return { control: { type: i?.length <= 5 ? "radio" : "select" }, options: i };
      }
      case "function":
      case "symbol":
        return null;
      default:
        return { control: { type: a ? "select" : "object" } };
    }
  }
}, "inferControl"), Tr = /* @__PURE__ */ n((r) => {
  let {
    argTypes: e,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    parameters: { __isArgsStory: t, controls: { include: o = null, exclude: a = null, matchers: i = {} } = {} }
  } = r;
  if (!t) return e;
  let l = yt(e, o, a), c = (0, xf.default)(l, (s, u) => s?.type && rO(s, u, i));
  return J(c, l);
}, "inferControls");
Tr.secondPass = !0;

// src/preview-api/modules/store/csf/normalizeProjectAnnotations.ts
function ht({
  argTypes: r,
  globalTypes: e,
  argTypesEnhancers: t,
  decorators: o,
  loaders: a,
  beforeEach: i,
  globals: l,
  initialGlobals: c,
  ...s
}) {
  return l && Object.keys(l).length > 0 && ae(_`
      The preview.js 'globals' field is deprecated and will be removed in Storybook 9.0.
      Please use 'initialGlobals' instead. Learn more:

      https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#previewjs-globals-renamed-to-initialglobals
    `), {
    ...r && { argTypes: qe(r) },
    ...e && { globalTypes: qe(e) },
    decorators: B(o),
    loaders: B(a),
    beforeEach: B(i),
    argTypesEnhancers: [
      ...t || [],
      ii,
      // inferControls technically should only run if the user is using the controls addon,
      // and so should be added by a preset there. However, as it seems some code relies on controls
      // annotations (in particular the angular implementation's `cleanArgsDecorator`), for backwards
      // compatibility reasons, we will leave this in the store until 7.0
      Tr
    ],
    initialGlobals: J(c, l),
    ...s
  };
}
n(ht, "normalizeProjectAnnotations");

// src/preview-api/modules/store/csf/stepRunners.ts
function wo(r) {
  return async (e, t, o) => {
    await r.reduceRight(
      (i, l) => async () => l(e, i, o),
      async () => t(o)
    )();
  };
}
n(wo, "composeStepRunners");

// src/preview-api/modules/store/csf/beforeAll.ts
var _f = /* @__PURE__ */ n((r) => async () => {
  let e = [];
  for (let t of r) {
    let o = await t();
    o && e.unshift(o);
  }
  return async () => {
    for (let t of e)
      await t();
  };
}, "composeBeforeAllHooks");

// src/preview-api/modules/store/csf/composeConfigs.ts
function gt(r, e) {
  return r.map((t) => t.default?.[e] ?? t[e]).filter(Boolean);
}
n(gt, "getField");
function Le(r, e, t = {}) {
  return gt(r, e).reduce((o, a) => {
    let i = B(a);
    return t.reverseFileOrder ? [...i, ...o] : [...o, ...i];
  }, []);
}
n(Le, "getArrayField");
function mt(r, e) {
  return Object.assign({}, ...gt(r, e));
}
n(mt, "getObjectField");
function Er(r, e) {
  return gt(r, e).pop();
}
n(Er, "getSingletonField");
function St(r) {
  let e = Le(r, "argTypesEnhancers"), t = gt(r, "runStep"), o = Le(r, "beforeAll");
  return {
    parameters: J(...gt(r, "parameters")),
    decorators: Le(r, "decorators", {
      reverseFileOrder: !(R.FEATURES?.legacyDecoratorFileOrder ?? !1)
    }),
    args: mt(r, "args"),
    argsEnhancers: Le(r, "argsEnhancers"),
    argTypes: mt(r, "argTypes"),
    argTypesEnhancers: [
      ...e.filter((a) => !a.secondPass),
      ...e.filter((a) => a.secondPass)
    ],
    globals: mt(r, "globals"),
    initialGlobals: mt(r, "initialGlobals"),
    globalTypes: mt(r, "globalTypes"),
    loaders: Le(r, "loaders"),
    beforeAll: _f(o),
    beforeEach: Le(r, "beforeEach"),
    render: Er(r, "render"),
    renderToCanvas: Er(r, "renderToCanvas"),
    renderToDOM: Er(r, "renderToDOM"),
    // deprecated
    applyDecorators: Er(r, "applyDecorators"),
    runStep: wo(t),
    tags: Le(r, "tags"),
    mount: Er(r, "mount"),
    testingLibraryRender: Er(r, "testingLibraryRender")
  };
}
n(St, "composeConfigs");

// src/preview-api/modules/store/csf/portable-stories.ts
var xo = {}, tO = "ComposedStory", oO = "Unnamed Story";
function nO(r) {
  return r ? "default" in r ? r.default : r : {};
}
n(nO, "extractAnnotation");
function Pf(r) {
  let e = Array.isArray(r) ? r : [r];
  return xo = St(e.map(nO)), xo;
}
n(Pf, "setProjectAnnotations");
var Me = [];
function Of(r, e, t, o, a) {
  if (r === void 0)
    throw new Error("Expected a story but received undefined.");
  e.title = e.title ?? tO;
  let i = bo(e), l = a || r.storyName || r.story?.name || r.name || oO, c = br(
    l,
    r,
    i
  ), s = o && !xo?.testingLibraryRender && !t?.testingLibraryRender, u = ht(
    St([
      {
        ...o,
        renderToCanvas: s ? void 0 : o?.renderToCanvas
      },
      xo,
      t ?? {}
    ])
  ), p = vr(
    c,
    i,
    u
  ), y = mo(u.globalTypes), h = /* @__PURE__ */ n(() => {
    let v = Ro({
      hooks: new ve(),
      globals: {
        ...y,
        ...u.initialGlobals
      },
      args: { ...p.initialArgs },
      viewMode: "story",
      loaded: {},
      abortSignal: new AbortController().signal,
      step: /* @__PURE__ */ n((E, x) => p.runStep(E, x, v), "step"),
      canvasElement: globalThis?.document?.body,
      canvas: {},
      ...p,
      context: null,
      mount: null
    });
    return v.context = v, p.renderToCanvas && (v.renderToCanvas = async () => {
      let E = await p.renderToCanvas?.(
        {
          componentId: p.componentId,
          title: p.title,
          id: p.id,
          name: p.name,
          tags: p.tags,
          showError: /* @__PURE__ */ n((x) => {
          }, "showError"),
          showException: /* @__PURE__ */ n((x) => {
          }, "showException"),
          forceRemount: !0,
          storyContext: v,
          storyFn: /* @__PURE__ */ n(() => p.unboundStoryFn(v), "storyFn"),
          unboundStoryFn: p.unboundStoryFn
        },
        v.canvasElement
      );
      E && Me.push(E);
    }), v.mount = p.mount(v), v;
  }, "initializeContext"), g, m = /* @__PURE__ */ n(async (v) => {
    let E = h();
    return g && (E.loaded = g.loaded), Object.assign(E, v), p.playFunction(E);
  }, "backwardsCompatiblePlay"), b = /* @__PURE__ */ n((v) => {
    let E = h();
    return Object.assign(E, v), aO(p, E);
  }, "newPlay"), S = !p.renderToCanvas && p.playFunction ? m : !p.renderToCanvas && !p.playFunction ? void 0 : b;
  return Object.assign(
    /* @__PURE__ */ n(function(E) {
      let x = h();
      return g && (x.loaded = g.loaded), x.args = {
        ...x.initialArgs,
        ...E
      }, p.unboundStoryFn(x);
    }, "storyFn"),
    {
      id: p.id,
      storyName: l,
      load: /* @__PURE__ */ n(async () => {
        for (let E of [...Me].reverse()) await E();
        Me.length = 0;
        let v = h();
        v.loaded = await p.applyLoaders(v), Me.push(...(await p.applyBeforeEach(v)).filter(Boolean)), g = v;
      }, "load"),
      args: p.initialArgs,
      parameters: p.parameters,
      argTypes: p.argTypes,
      play: S,
      tags: p.tags
    }
  );
}
n(Of, "composeStory");
function Cf(r, e, t) {
  let { default: o, __esModule: a, __namedExportsOrder: i, ...l } = r;
  return Object.entries(l).reduce((s, [u, p]) => So(u, o) ? Object.assign(s, {
    [u]: t(
      p,
      o,
      e,
      u
    )
  }) : s, {});
}
n(Cf, "composeStories");
function If(r) {
  return r.extend({
    mount: /* @__PURE__ */ n(async ({ mount: e, page: t }, o) => {
      await o(async (a, ...i) => {
        if (!("__pw_type" in a) || "__pw_type" in a && a.__pw_type !== "jsx")
          throw new Error(_`
              Portable stories in Playwright CT only work when referencing JSX elements.
              Please use JSX format for your components such as:

              instead of:
              await mount(MyComponent, { props: { foo: 'bar' } })

              do:
              await mount(<MyComponent foo="bar"/>)

              More info: https://storybook.js.org/docs/api/portable-stories-playwright
            `);
        await t.evaluate(async (c) => {
          let s = await globalThis.__pwUnwrapObject?.(c);
          return ("__pw_type" in s ? s.type : s)?.load?.();
        }, a);
        let l = await e(a, ...i);
        return await t.evaluate(async (c) => {
          let s = await globalThis.__pwUnwrapObject?.(c), u = "__pw_type" in s ? s.type : s, p = document.querySelector("#root");
          return u?.play?.({ canvasElement: p });
        }, a), l;
      });
    }, "mount")
  });
}
n(If, "createPlaywrightTest");
async function aO(r, e) {
  for (let a of [...Me].reverse()) await a();
  if (Me.length = 0, e.loaded = await r.applyLoaders(e), e.abortSignal.aborted) return;
  Me.push(...(await r.applyBeforeEach(e)).filter(Boolean));
  let t = r.playFunction, o = r.usesMount;
  o || await e.mount(), !e.abortSignal.aborted && t && (o || (e.mount = async () => {
    throw new Ce({ playFunction: t.toString() });
  }), await t(e));
}
n(aO, "playStory");

// src/preview-api/modules/store/StoryStore.ts
var Ff = 1e3, iO = 1e4, li = class li {
  constructor(e, t, o) {
    this.importFn = t;
    this.storyIndex = new fo(e), this.projectAnnotations = ht(o);
    let { initialGlobals: a, globalTypes: i } = this.projectAnnotations;
    this.args = new ho(), this.globals = new go({ globals: a, globalTypes: i }), this.hooks = {}, this.cleanupCallbacks = {}, this.processCSFFileWithCache =
    (0, _o.default)(Ff)(lf), this.prepareMetaWithCache = (0, _o.default)(Ff)(Eo), this.prepareStoryWithCache = (0, _o.default)(iO)(vr);
  }
  storyIndex;
  projectAnnotations;
  globals;
  args;
  hooks;
  cleanupCallbacks;
  cachedCSFFiles;
  processCSFFileWithCache;
  prepareMetaWithCache;
  prepareStoryWithCache;
  setProjectAnnotations(e) {
    this.projectAnnotations = ht(e);
    let { initialGlobals: t, globalTypes: o } = e;
    this.globals.set({ globals: t, globalTypes: o });
  }
  // This means that one of the CSF files has changed.
  // If the `importFn` has changed, we will invalidate both caches.
  // If the `storyIndex` data has changed, we may or may not invalidate the caches, depending
  // on whether we've loaded the relevant files yet.
  async onStoriesChanged({
    importFn: e,
    storyIndex: t
  }) {
    e && (this.importFn = e), t && (this.storyIndex.entries = t.entries), this.cachedCSFFiles && await this.cacheAllCSFFiles();
  }
  // Get an entry from the index, waiting on initialization if necessary
  async storyIdToEntry(e) {
    return this.storyIndex.storyIdToEntry(e);
  }
  // To load a single CSF file to service a story we need to look up the importPath in the index
  async loadCSFFileByStoryId(e) {
    let { importPath: t, title: o } = this.storyIndex.storyIdToEntry(e), a = await this.importFn(t);
    return this.processCSFFileWithCache(a, t, o);
  }
  async loadAllCSFFiles() {
    let e = {};
    return Object.entries(this.storyIndex.entries).forEach(([o, { importPath: a }]) => {
      e[a] = o;
    }), (await Promise.all(
      Object.entries(e).map(async ([o, a]) => ({
        importPath: o,
        csfFile: await this.loadCSFFileByStoryId(a)
      }))
    )).reduce(
      (o, { importPath: a, csfFile: i }) => (o[a] = i, o),
      {}
    );
  }
  async cacheAllCSFFiles() {
    this.cachedCSFFiles = await this.loadAllCSFFiles();
  }
  preparedMetaFromCSFFile({ csfFile: e }) {
    let t = e.meta;
    return this.prepareMetaWithCache(
      t,
      this.projectAnnotations,
      e.moduleExports.default
    );
  }
  // Load the CSF file for a story and prepare the story from it and the project annotations.
  async loadStory({ storyId: e }) {
    let t = await this.loadCSFFileByStoryId(e);
    return this.storyFromCSFFile({ storyId: e, csfFile: t });
  }
  // This function is synchronous for convenience -- often times if you have a CSF file already
  // it is easier not to have to await `loadStory`.
  storyFromCSFFile({
    storyId: e,
    csfFile: t
  }) {
    let o = t.stories[e];
    if (!o) throw new Jr({ storyId: e });
    let a = t.meta, i = this.prepareStoryWithCache(
      o,
      a,
      this.projectAnnotations
    );
    return this.args.setInitial(i), this.hooks[i.id] = this.hooks[i.id] || new ve(), i;
  }
  // If we have a CSF file we can get all the stories from it synchronously
  componentStoriesFromCSFFile({
    csfFile: e
  }) {
    return Object.keys(this.storyIndex.entries).filter((t) => !!e.stories[t]).map((t) => this.storyFromCSFFile({ storyId: t, csfFile: e }));
  }
  async loadEntry(e) {
    let t = await this.storyIdToEntry(e), o = t.type === "docs" ? t.storiesImports : [], [a, ...i] = await Promise.all([
      this.importFn(t.importPath),
      ...o.map((l) => {
        let c = this.storyIndex.importPathToEntry(l);
        return this.loadCSFFileByStoryId(c.id);
      })
    ]);
    return { entryExports: a, csfFiles: i };
  }
  // A prepared story does not include args, globals or hooks. These are stored in the story store
  // and updated separtely to the (immutable) story.
  getStoryContext(e, { forceInitialArgs: t = !1 } = {}) {
    return Ro({
      ...e,
      args: t ? e.initialArgs : this.args.get(e.id),
      globals: this.globals.get(),
      hooks: this.hooks[e.id]
    });
  }
  addCleanupCallbacks(e, t) {
    this.cleanupCallbacks[e.id] = t;
  }
  async cleanupStory(e) {
    this.hooks[e.id].clean();
    let t = this.cleanupCallbacks[e.id];
    if (t) for (let o of [...t].reverse()) await o();
    delete this.cleanupCallbacks[e.id];
  }
  extract(e = { includeDocsOnly: !1 }) {
    let { cachedCSFFiles: t } = this;
    if (!t) throw new $r();
    return Object.entries(this.storyIndex.entries).reduce(
      (o, [a, { type: i, importPath: l }]) => {
        if (i === "docs") return o;
        let c = t[l], s = this.storyFromCSFFile({ storyId: a, csfFile: c });
        return !e.includeDocsOnly && s.parameters.docsOnly || (o[a] = Object.entries(s).reduce(
          (u, [p, y]) => p === "moduleExport" || typeof y == "function" ? u : Array.isArray(y) ? Object.assign(u, { [p]: y.slice().sort() }) :
          Object.assign(u, { [p]: y }),
          { args: s.initialArgs }
        )), o;
      },
      {}
    );
  }
  getSetStoriesPayload() {
    let e = this.extract({ includeDocsOnly: !0 }), t = Object.values(e).reduce(
      (o, { title: a }) => (o[a] = {}, o),
      {}
    );
    return {
      v: 2,
      globals: this.globals.get(),
      globalParameters: {},
      kindParameters: t,
      stories: e
    };
  }
  // NOTE: this is legacy `stories.json` data for the `extract` script.
  // It is used to allow v7 Storybooks to be composed in v6 Storybooks, which expect a
  // `stories.json` file with legacy fields (`kind` etc).
  getStoriesJsonData = /* @__PURE__ */ n(() => {
    let e = this.getSetStoriesPayload(), t = ["fileName", "docsOnly", "framework", "__id", "__isArgsStory"];
    return {
      v: 3,
      stories: (0, Df.default)(e.stories, (a) => {
        let { importPath: i } = this.storyIndex.entries[a.id];
        return {
          ...(0, si.default)(a, ["id", "name", "title"]),
          importPath: i,
          // These 3 fields were going to be dropped in v7, but instead we will keep them for the
          // 7.x cycle so that v7 Storybooks can be composed successfully in v6 Storybook.
          // In v8 we will (likely) completely drop support for `extract` and `getStoriesJsonData`
          kind: a.title,
          story: a.name,
          parameters: {
            ...(0, si.default)(a.parameters, t),
            fileName: i
          }
        };
      })
    };
  }, "getStoriesJsonData");
  raw() {
    return ae(
      "StoryStore.raw() is deprecated and will be removed in 9.0, please use extract() instead"
    ), Object.values(this.extract()).map(({ id: e }) => this.fromId(e)).filter(Boolean);
  }
  fromId(e) {
    if (ae(
      "StoryStore.fromId() is deprecated and will be removed in 9.0, please use loadStory() instead"
    ), !this.cachedCSFFiles)
      throw new Error("Cannot call fromId/raw() unless you call cacheAllCSFFiles() first.");
    let t;
    try {
      ({ importPath: t } = this.storyIndex.storyIdToEntry(e));
    } catch {
      return null;
    }
    let o = this.cachedCSFFiles[t], a = this.storyFromCSFFile({ storyId: e, csfFile: o });
    return {
      ...a,
      storyFn: /* @__PURE__ */ n((i) => {
        let l = {
          ...this.getStoryContext(a),
          abortSignal: new AbortController().signal,
          canvasElement: null,
          loaded: {},
          step: /* @__PURE__ */ n((c, s) => a.runStep(c, s, l), "step"),
          context: null,
          mount: null,
          canvas: {},
          viewMode: "story"
        };
        return a.unboundStoryFn({ ...l, ...i });
      }, "storyFn")
    };
  }
};
n(li, "StoryStore");
var ke = li;

// ../node_modules/slash/index.js
function ci(r) {
  return r.startsWith("\\\\?\\") ? r : r.replace(/\\/g, "/");
}
n(ci, "slash");

// src/preview-api/modules/store/autoTitle.ts
var sO = /* @__PURE__ */ n((r) => {
  if (r.length === 0) return r;
  let e = r[r.length - 1], t = e?.replace(/(?:[.](?:story|stories))?([.][^.]+)$/i, "");
  if (r.length === 1) return [t];
  let o = r[r.length - 2];
  return t && o && t.toLowerCase() === o.toLowerCase() ? [...r.slice(0, -2), t] : t && (/^(story|stories)([.][^.]+)$/i.test(e) || /^index$/i.
  test(t)) ? r.slice(0, -1) : [...r.slice(0, -1), t];
}, "sanitize");
function Nf(r) {
  return r.flatMap((e) => e.split("/")).filter(Boolean).join("/");
}
n(Nf, "pathJoin");
var ui = /* @__PURE__ */ n((r, e, t) => {
  let { directory: o, importPathMatcher: a, titlePrefix: i = "" } = e || {};
  typeof r == "number" && j.warn(_`
      CSF Auto-title received a numeric fileName. This typically happens when
      webpack is mis-configured in production mode. To force webpack to produce
      filenames, set optimization.moduleIds = "named" in your webpack config.
    `);
  let l = ci(String(r));
  if (a.exec(l)) {
    if (!t) {
      let c = l.replace(o, ""), s = Nf([i, c]).split("/");
      return s = sO(s), s.join("/");
    }
    return i ? Nf([i, t]) : t;
  }
}, "userOrAutoTitleFromSpecifier"), qf = /* @__PURE__ */ n((r, e, t) => {
  for (let o = 0; o < e.length; o += 1) {
    let a = ui(r, e[o], t);
    if (a) return a;
  }
  return t || void 0;
}, "userOrAutoTitle");

// src/preview-api/modules/store/storySort.ts
var Lf = /\s*\/\s*/, Mf = /* @__PURE__ */ n((r = {}) => (e, t) => {
  if (e.title === t.title && !r.includeNames)
    return 0;
  let o = r.method || "configure", a = r.order || [], i = e.title.trim().split(Lf), l = t.title.trim().split(Lf);
  r.includeNames && (i.push(e.name), l.push(t.name));
  let c = 0;
  for (; i[c] || l[c]; ) {
    if (!i[c])
      return -1;
    if (!l[c])
      return 1;
    let s = i[c], u = l[c];
    if (s !== u) {
      let y = a.indexOf(s), h = a.indexOf(u), g = a.indexOf("*");
      return y !== -1 || h !== -1 ? (y === -1 && (g !== -1 ? y = g : y = a.length), h === -1 && (g !== -1 ? h = g : h = a.length), y - h) : o ===
      "configure" ? 0 : s.localeCompare(u, r.locales ? r.locales : void 0, {
        numeric: !0,
        sensitivity: "accent"
      });
    }
    let p = a.indexOf(s);
    p === -1 && (p = a.indexOf("*")), a = p !== -1 && Array.isArray(a[p + 1]) ? a[p + 1] : [], c += 1;
  }
  return 0;
}, "storySort");

// src/preview-api/modules/store/sortStories.ts
var lO = /* @__PURE__ */ n((r, e, t) => {
  if (e) {
    let o;
    typeof e == "function" ? o = e : o = Mf(e), r.sort(o);
  } else
    r.sort(
      (o, a) => t.indexOf(o.importPath) - t.indexOf(a.importPath)
    );
  return r;
}, "sortStoriesCommon"), kf = /* @__PURE__ */ n((r, e, t) => {
  try {
    return lO(r, e, t);
  } catch (o) {
    throw new Error(_`
    Error sorting stories with sort parameter ${e}:

    > ${o.message}
    
    Are you using a V6-style sort function in V7 mode?

    More info: https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#v7-style-story-sort
  `);
  }
}, "sortStoriesV7");

// src/preview-api/modules/preview-web/render/Render.ts
var Ee = new Error("prepareAborted");

// src/preview-api/modules/preview-web/render/StoryRender.ts
var { AbortController: jf } = globalThis;
function Bf(r) {
  try {
    let { name: e = "Error", message: t = String(r), stack: o } = r;
    return { name: e, message: t, stack: o };
  } catch {
    return { name: "Error", message: String(r) };
  }
}
n(Bf, "serializeError");
var pi = class pi {
  constructor(e, t, o, a, i, l, c = { autoplay: !0, forceInitialArgs: !1 }, s) {
    this.channel = e;
    this.store = t;
    this.renderToScreen = o;
    this.callbacks = a;
    this.id = i;
    this.viewMode = l;
    this.renderOptions = c;
    this.abortController = new jf(), s && (this.story = s, this.phase = "preparing");
  }
  type = "story";
  story;
  phase;
  abortController;
  canvasElement;
  notYetRendered = !0;
  rerenderEnqueued = !1;
  disableKeyListeners = !1;
  teardownRender = /* @__PURE__ */ n(() => {
  }, "teardownRender");
  torndown = !1;
  async runPhase(e, t, o) {
    this.phase = t, this.channel.emit(Oe, { newPhase: this.phase, storyId: this.id }), o && (await o(), this.checkIfAborted(e));
  }
  checkIfAborted(e) {
    return e.aborted ? (this.phase = "aborted", this.channel.emit(Oe, { newPhase: this.phase, storyId: this.id }), !0) : !1;
  }
  async prepare() {
    if (await this.runPhase(this.abortController.signal, "preparing", async () => {
      this.story = await this.store.loadStory({ storyId: this.id });
    }), this.abortController.signal.aborted)
      throw await this.store.cleanupStory(this.story), Ee;
  }
  // The two story "renders" are equal and have both loaded the same story
  isEqual(e) {
    return !!(this.id === e.id && this.story && this.story === e.story);
  }
  isPreparing() {
    return ["preparing"].includes(this.phase);
  }
  isPending() {
    return ["loading", "beforeEach", "rendering", "playing"].includes(this.phase);
  }
  async renderToElement(e) {
    return this.canvasElement = e, this.render({ initial: !0, forceRemount: !0 });
  }
  storyContext() {
    if (!this.story) throw new Error("Cannot call storyContext before preparing");
    let { forceInitialArgs: e } = this.renderOptions;
    return this.store.getStoryContext(this.story, { forceInitialArgs: e });
  }
  async render({
    initial: e = !1,
    forceRemount: t = !1
  } = {}) {
    let { canvasElement: o } = this;
    if (!this.story) throw new Error("cannot render when not prepared");
    let a = this.story;
    if (!o) throw new Error("cannot render when canvasElement is unset");
    let {
      id: i,
      componentId: l,
      title: c,
      name: s,
      tags: u,
      applyLoaders: p,
      applyBeforeEach: y,
      unboundStoryFn: h,
      playFunction: g,
      runStep: m
    } = a;
    t && !e && (this.cancelRender(), this.abortController = new jf());
    let b = this.abortController.signal, S = !1, T = a.usesMount;
    try {
      let v = {
        ...this.storyContext(),
        viewMode: this.viewMode,
        abortSignal: b,
        canvasElement: o,
        loaded: {},
        step: /* @__PURE__ */ n((P, H) => m(P, H, v), "step"),
        context: null,
        canvas: {},
        renderToCanvas: /* @__PURE__ */ n(async () => {
          let P = await this.renderToScreen(E, o);
          this.teardownRender = P || (() => {
          }), S = !0;
        }, "renderToCanvas"),
        // The story provides (set in a renderer) a mount function that is a higher order function
        // (context) => (...args) => Canvas
        //
        // Before assigning it to the context, we resolve the context dependency,
        // so that a user can just call it as await mount(...args) in their play function.
        mount: /* @__PURE__ */ n(async (...P) => {
          this.callbacks.showStoryDuringRender?.();
          let H = null;
          return await this.runPhase(b, "rendering", async () => {
            H = await a.mount(v)(...P);
          }), T && await this.runPhase(b, "playing"), H;
        }, "mount")
      };
      v.context = v;
      let E = {
        componentId: l,
        title: c,
        kind: c,
        id: i,
        name: s,
        story: s,
        tags: u,
        ...this.callbacks,
        showError: /* @__PURE__ */ n((P) => (this.phase = "errored", this.callbacks.showError(P)), "showError"),
        showException: /* @__PURE__ */ n((P) => (this.phase = "errored", this.callbacks.showException(P)), "showException"),
        forceRemount: t || this.notYetRendered,
        storyContext: v,
        storyFn: /* @__PURE__ */ n(() => h(v), "storyFn"),
        unboundStoryFn: h
      };
      if (await this.runPhase(b, "loading", async () => {
        v.loaded = await p(v);
      }), b.aborted) return;
      let x = await y(v);
      if (this.store.addCleanupCallbacks(a, x), this.checkIfAborted(b) || (!S && !T && await v.mount(), this.notYetRendered = !1, b.aborted))
       return;
      let A = this.story.parameters?.test?.dangerouslyIgnoreUnhandledErrors === !0, C = /* @__PURE__ */ new Set(), N = /* @__PURE__ */ n((P) => C.
      add("error" in P ? P.error : P.reason), "onError");
      if (this.renderOptions.autoplay && t && g && this.phase !== "errored") {
        window.addEventListener("error", N), window.addEventListener("unhandledrejection", N), this.disableKeyListeners = !0;
        try {
          if (T ? await g(v) : (v.mount = async () => {
            throw new Ce({ playFunction: g.toString() });
          }, await this.runPhase(b, "playing", async () => g(v))), !S)
            throw new et();
          this.checkIfAborted(b), !A && C.size > 0 ? await this.runPhase(b, "errored") : await this.runPhase(b, "played");
        } catch (P) {
          if (this.callbacks.showStoryDuringRender?.(), await this.runPhase(b, "errored", async () => {
            this.channel.emit(an, Bf(P));
          }), this.story.parameters.throwPlayFunctionExceptions !== !1) throw P;
          console.error(P);
        }
        if (!A && C.size > 0 && this.channel.emit(
          sn,
          Array.from(C).map(Bf)
        ), this.disableKeyListeners = !1, window.removeEventListener("unhandledrejection", N), window.removeEventListener("error", N), b.aborted)
         return;
      }
      await this.runPhase(
        b,
        "completed",
        async () => this.channel.emit(Xe, i)
      );
    } catch (v) {
      this.phase = "errored", this.callbacks.showException(v);
    }
    this.rerenderEnqueued && (this.rerenderEnqueued = !1, this.render());
  }
  /**
   * Rerender the story.
   * If the story is currently pending (loading/rendering), the rerender will be enqueued,
   * and will be executed after the current render is completed.
   * Rerendering while playing will not be enqueued, and will be executed immediately, to support
   * rendering args changes while playing.
   */
  async rerender() {
    if (this.isPending() && this.phase !== "playing")
      this.rerenderEnqueued = !0;
    else
      return this.render();
  }
  async remount() {
    return await this.teardown(), this.render({ forceRemount: !0 });
  }
  // If the story is torn down (either a new story is rendered or the docs page removes it)
  // we need to consider the fact that the initial render may not be finished
  // (possibly the loaders or the play function are still running). We use the controller
  // as a method to abort them, ASAP, but this is not foolproof as we cannot control what
  // happens inside the user's code.
  cancelRender() {
    this.abortController?.abort();
  }
  async teardown() {
    this.torndown = !0, this.cancelRender(), this.story && await this.store.cleanupStory(this.story);
    for (let e = 0; e < 3; e += 1) {
      if (!this.isPending()) {
        await this.teardownRender();
        return;
      }
      await new Promise((t) => setTimeout(t, 0));
    }
    window.location.reload(), await new Promise(() => {
    });
  }
};
n(pi, "StoryRender");
var Rr = pi;

// src/preview-api/modules/preview-web/Preview.tsx
var { fetch: cO } = R, uO = "./index.json", di = class di {
  constructor(e, t, o = oe.getChannel(), a = !0) {
    this.importFn = e;
    this.getProjectAnnotations = t;
    this.channel = o;
    this.storeInitializationPromise = new Promise((i, l) => {
      this.resolveStoreInitializationPromise = i, this.rejectStoreInitializationPromise = l;
    }), a && this.initialize();
  }
  /**
   * @deprecated will be removed in 8.0, please use channel instead
   */
  serverChannel;
  storyStoreValue;
  renderToCanvas;
  storyRenders = [];
  previewEntryError;
  // While we wait for the index to load (note it may error for a while), we need to store the
  // project annotations. Once the index loads, it is stored on the store and this will get unset.
  projectAnnotationsBeforeInitialization;
  beforeAllCleanup;
  storeInitializationPromise;
  resolveStoreInitializationPromise;
  rejectStoreInitializationPromise;
  // Create a proxy object for `__STORYBOOK_STORY_STORE__` and `__STORYBOOK_PREVIEW__.storyStore`
  // That proxies through to the store once ready, and errors beforehand. This means we can set
  // `__STORYBOOK_STORY_STORE__ = __STORYBOOK_PREVIEW__.storyStore` without having to wait, and
  // simiarly integrators can access the `storyStore` on the preview at any time, although
  // it is considered deprecated and we will no longer allow access in 9.0
  get storyStore() {
    return new Proxy(
      {},
      {
        get: /* @__PURE__ */ n((e, t) => {
          if (this.storyStoreValue)
            return ae("Accessing the Story Store is deprecated and will be removed in 9.0"), this.storyStoreValue[t];
          throw new Qr();
        }, "get")
      }
    );
  }
  // INITIALIZATION
  async initialize() {
    this.setupListeners();
    try {
      let e = await this.getProjectAnnotationsOrRenderError();
      await this.runBeforeAllHook(e), await this.initializeWithProjectAnnotations(e);
    } catch (e) {
      this.rejectStoreInitializationPromise(e);
    }
  }
  ready() {
    return this.storeInitializationPromise;
  }
  setupListeners() {
    this.channel.on(hn, this.onStoryIndexChanged.bind(this)), this.channel.on(Mr, this.onUpdateGlobals.bind(this)), this.channel.on(kr, this.
    onUpdateArgs.bind(this)), this.channel.on(En, this.onRequestArgTypesInfo.bind(this)), this.channel.on(Lr, this.onResetArgs.bind(this)), this.
    channel.on(qr, this.onForceReRender.bind(this)), this.channel.on(on, this.onForceRemount.bind(this));
  }
  async getProjectAnnotationsOrRenderError() {
    try {
      let e = await this.getProjectAnnotations();
      if (this.renderToCanvas = e.renderToCanvas, !this.renderToCanvas) throw new Wr();
      return e;
    } catch (e) {
      throw this.renderPreviewEntryError("Error reading preview.js:", e), e;
    }
  }
  // If initialization gets as far as project annotations, this function runs.
  async initializeWithProjectAnnotations(e) {
    this.projectAnnotationsBeforeInitialization = e;
    try {
      let t = await this.getStoryIndexFromServer();
      return this.initializeWithStoryIndex(t);
    } catch (t) {
      throw this.renderPreviewEntryError("Error loading story index:", t), t;
    }
  }
  async runBeforeAllHook(e) {
    try {
      await this.beforeAllCleanup?.(), this.beforeAllCleanup = await e.beforeAll?.();
    } catch (t) {
      throw this.renderPreviewEntryError("Error in beforeAll hook:", t), t;
    }
  }
  async getStoryIndexFromServer() {
    let e = await cO(uO);
    if (e.status === 200)
      return e.json();
    throw new zr({ text: await e.text() });
  }
  // If initialization gets as far as the story index, this function runs.
  initializeWithStoryIndex(e) {
    if (!this.projectAnnotationsBeforeInitialization)
      throw new Error("Cannot call initializeWithStoryIndex until project annotations resolve");
    this.storyStoreValue = new ke(
      e,
      this.importFn,
      this.projectAnnotationsBeforeInitialization
    ), delete this.projectAnnotationsBeforeInitialization, this.setInitialGlobals(), this.resolveStoreInitializationPromise();
  }
  async setInitialGlobals() {
    this.emitGlobals();
  }
  emitGlobals() {
    if (!this.storyStoreValue)
      throw new z({ methodName: "emitGlobals" });
    let e = {
      globals: this.storyStoreValue.globals.get() || {},
      globalTypes: this.storyStoreValue.projectAnnotations.globalTypes || {}
    };
    this.channel.emit(pn, e);
  }
  // EVENT HANDLERS
  // This happens when a config file gets reloaded
  async onGetProjectAnnotationsChanged({
    getProjectAnnotations: e
  }) {
    delete this.previewEntryError, this.getProjectAnnotations = e;
    let t = await this.getProjectAnnotationsOrRenderError();
    if (await this.runBeforeAllHook(t), !this.storyStoreValue) {
      await this.initializeWithProjectAnnotations(t);
      return;
    }
    this.storyStoreValue.setProjectAnnotations(t), this.emitGlobals();
  }
  async onStoryIndexChanged() {
    if (delete this.previewEntryError, !(!this.storyStoreValue && !this.projectAnnotationsBeforeInitialization))
      try {
        let e = await this.getStoryIndexFromServer();
        if (this.projectAnnotationsBeforeInitialization) {
          this.initializeWithStoryIndex(e);
          return;
        }
        await this.onStoriesChanged({ storyIndex: e });
      } catch (e) {
        throw this.renderPreviewEntryError("Error loading story index:", e), e;
      }
  }
  // This happens when a glob gets HMR-ed
  async onStoriesChanged({
    importFn: e,
    storyIndex: t
  }) {
    if (!this.storyStoreValue)
      throw new z({ methodName: "onStoriesChanged" });
    await this.storyStoreValue.onStoriesChanged({ importFn: e, storyIndex: t });
  }
  async onUpdateGlobals({ globals: e }) {
    if (!this.storyStoreValue)
      throw new z({ methodName: "onUpdateGlobals" });
    this.storyStoreValue.globals.update(e), await Promise.all(this.storyRenders.map((t) => t.rerender())), this.channel.emit(nn, {
      globals: this.storyStoreValue.globals.get(),
      initialGlobals: this.storyStoreValue.globals.initialGlobals
    });
  }
  async onUpdateArgs({ storyId: e, updatedArgs: t }) {
    if (!this.storyStoreValue)
      throw new z({ methodName: "onUpdateArgs" });
    this.storyStoreValue.args.update(e, t), await Promise.all(
      this.storyRenders.filter((o) => o.id === e && !o.renderOptions.forceInitialArgs).map(
        (o) => (
          // We only run the play function, with in a force remount.
          // But when mount is destructured, the rendering happens inside of the play function.
          o.story && o.story.usesMount ? o.remount() : o.rerender()
        )
      )
    ), this.channel.emit(dn, {
      storyId: e,
      args: this.storyStoreValue.args.get(e)
    });
  }
  async onRequestArgTypesInfo({ id: e, payload: t }) {
    try {
      await this.storeInitializationPromise;
      let o = await this.storyStoreValue?.loadStory(t);
      this.channel.emit(Ut, {
        id: e,
        success: !0,
        payload: { argTypes: o?.argTypes || {} },
        error: null
      });
    } catch (o) {
      this.channel.emit(Ut, {
        id: e,
        success: !1,
        error: o?.message
      });
    }
  }
  async onResetArgs({ storyId: e, argNames: t }) {
    if (!this.storyStoreValue)
      throw new z({ methodName: "onResetArgs" });
    let a = this.storyRenders.find((c) => c.id === e)?.story || await this.storyStoreValue.loadStory({ storyId: e }), l = (t || [
      .../* @__PURE__ */ new Set([
        ...Object.keys(a.initialArgs),
        ...Object.keys(this.storyStoreValue.args.get(e))
      ])
    ]).reduce((c, s) => (c[s] = a.initialArgs[s], c), {});
    await this.onUpdateArgs({ storyId: e, updatedArgs: l });
  }
  // ForceReRender does not include a story id, so we simply must
  // re-render all stories in case they are relevant
  async onForceReRender() {
    await Promise.all(this.storyRenders.map((e) => e.rerender()));
  }
  async onForceRemount({ storyId: e }) {
    await Promise.all(this.storyRenders.filter((t) => t.id === e).map((t) => t.remount()));
  }
  // Used by docs to render a story to a given element
  // Note this short-circuits the `prepare()` phase of the StoryRender,
  // main to be consistent with the previous behaviour. In the future,
  // we will change it to go ahead and load the story, which will end up being
  // "instant", although async.
  renderStoryToElement(e, t, o, a) {
    if (!this.renderToCanvas || !this.storyStoreValue)
      throw new z({
        methodName: "renderStoryToElement"
      });
    let i = new Rr(
      this.channel,
      this.storyStoreValue,
      this.renderToCanvas,
      o,
      e.id,
      "docs",
      a,
      e
    );
    return i.renderToElement(t), this.storyRenders.push(i), async () => {
      await this.teardownRender(i);
    };
  }
  async teardownRender(e, { viewModeChanged: t } = {}) {
    this.storyRenders = this.storyRenders.filter((o) => o !== e), await e?.teardown?.({ viewModeChanged: t });
  }
  // API
  async loadStory({ storyId: e }) {
    if (!this.storyStoreValue)
      throw new z({ methodName: "loadStory" });
    return this.storyStoreValue.loadStory({ storyId: e });
  }
  getStoryContext(e, { forceInitialArgs: t = !1 } = {}) {
    if (!this.storyStoreValue)
      throw new z({ methodName: "getStoryContext" });
    return this.storyStoreValue.getStoryContext(e, { forceInitialArgs: t });
  }
  async extract(e) {
    if (!this.storyStoreValue)
      throw new z({ methodName: "extract" });
    if (this.previewEntryError) throw this.previewEntryError;
    return await this.storyStoreValue.cacheAllCSFFiles(), this.storyStoreValue.extract(e);
  }
  // UTILITIES
  renderPreviewEntryError(e, t) {
    this.previewEntryError = t, I.error(e), I.error(t), this.channel.emit(rn, t);
  }
};
n(di, "Preview");
var je = di;

// src/preview-api/modules/preview-web/docs-context/DocsContext.ts
var fi = class fi {
  constructor(e, t, o, a) {
    this.channel = e;
    this.store = t;
    this.renderStoryToElement = o;
    this.componentStoriesValue = [], this.storyIdToCSFFile = /* @__PURE__ */ new Map(), this.exportToStory = /* @__PURE__ */ new Map(), this.
    exportsToCSFFile = /* @__PURE__ */ new Map(), this.nameToStoryId = /* @__PURE__ */ new Map(), this.attachedCSFFiles = /* @__PURE__ */ new Set(),
    a.forEach((i, l) => {
      this.referenceCSFFile(i);
    });
  }
  componentStoriesValue;
  storyIdToCSFFile;
  exportToStory;
  exportsToCSFFile;
  nameToStoryId;
  attachedCSFFiles;
  primaryStory;
  // This docs entry references this CSF file and can synchronously load the stories, as well
  // as reference them by module export. If the CSF is part of the "component" stories, they
  // can also be referenced by name and are in the componentStories list.
  referenceCSFFile(e) {
    this.exportsToCSFFile.set(e.moduleExports, e), this.exportsToCSFFile.set(e.moduleExports.default, e), this.store.componentStoriesFromCSFFile(
    { csfFile: e }).forEach((o) => {
      let a = e.stories[o.id];
      this.storyIdToCSFFile.set(a.id, e), this.exportToStory.set(a.moduleExport, o);
    });
  }
  attachCSFFile(e) {
    if (!this.exportsToCSFFile.has(e.moduleExports))
      throw new Error("Cannot attach a CSF file that has not been referenced");
    if (this.attachedCSFFiles.has(e))
      return;
    this.attachedCSFFiles.add(e), this.store.componentStoriesFromCSFFile({ csfFile: e }).forEach((o) => {
      this.nameToStoryId.set(o.name, o.id), this.componentStoriesValue.push(o), this.primaryStory || (this.primaryStory = o);
    });
  }
  referenceMeta(e, t) {
    let o = this.resolveModuleExport(e);
    if (o.type !== "meta")
      throw new Error(
        "<Meta of={} /> must reference a CSF file module export or meta export. Did you mistakenly reference your component instead of your \
CSF file?"
      );
    t && this.attachCSFFile(o.csfFile);
  }
  get projectAnnotations() {
    let { projectAnnotations: e } = this.store;
    if (!e)
      throw new Error("Can't get projectAnnotations from DocsContext before they are initialized");
    return e;
  }
  resolveAttachedModuleExportType(e) {
    if (e === "story") {
      if (!this.primaryStory)
        throw new Error(
          "No primary story attached to this docs file, did you forget to use <Meta of={} />?"
        );
      return { type: "story", story: this.primaryStory };
    }
    if (this.attachedCSFFiles.size === 0)
      throw new Error(
        "No CSF file attached to this docs file, did you forget to use <Meta of={} />?"
      );
    let t = Array.from(this.attachedCSFFiles)[0];
    if (e === "meta")
      return { type: "meta", csfFile: t };
    let { component: o } = t.meta;
    if (!o)
      throw new Error(
        "Attached CSF file does not defined a component, did you forget to export one?"
      );
    return { type: "component", component: o };
  }
  resolveModuleExport(e) {
    let t = this.exportsToCSFFile.get(e);
    if (t) return { type: "meta", csfFile: t };
    let o = this.exportToStory.get(e);
    return o ? { type: "story", story: o } : { type: "component", component: e };
  }
  resolveOf(e, t = []) {
    let o;
    if (["component", "meta", "story"].includes(e)) {
      let a = e;
      o = this.resolveAttachedModuleExportType(a);
    } else
      o = this.resolveModuleExport(e);
    if (t.length && !t.includes(o.type)) {
      let a = o.type === "component" ? "component or unknown" : o.type;
      throw new Error(_`Invalid value passed to the 'of' prop. The value was resolved to a '${a}' type but the only types for this block are: ${t.
      join(
        ", "
      )}.
        - Did you pass a component to the 'of' prop when the block only supports a story or a meta?
        - ... or vice versa?
        - Did you pass a story, CSF file or meta to the 'of' prop that is not indexed, ie. is not targeted by the 'stories' globs in the main configuration?`);
    }
    switch (o.type) {
      case "component":
        return {
          ...o,
          projectAnnotations: this.projectAnnotations
        };
      case "meta":
        return {
          ...o,
          preparedMeta: this.store.preparedMetaFromCSFFile({ csfFile: o.csfFile })
        };
      case "story":
      default:
        return o;
    }
  }
  storyIdByName = /* @__PURE__ */ n((e) => {
    let t = this.nameToStoryId.get(e);
    if (t) return t;
    throw new Error(`No story found with that name: ${e}`);
  }, "storyIdByName");
  componentStories = /* @__PURE__ */ n(() => this.componentStoriesValue, "componentStories");
  componentStoriesFromCSFFile = /* @__PURE__ */ n((e) => this.store.componentStoriesFromCSFFile({ csfFile: e }), "componentStoriesFromCSFFil\
e");
  storyById = /* @__PURE__ */ n((e) => {
    if (!e) {
      if (!this.primaryStory)
        throw new Error(
          "No primary story defined for docs entry. Did you forget to use `<Meta>`?"
        );
      return this.primaryStory;
    }
    let t = this.storyIdToCSFFile.get(e);
    if (!t)
      throw new Error(`Called \`storyById\` for story that was never loaded: ${e}`);
    return this.store.storyFromCSFFile({ storyId: e, csfFile: t });
  }, "storyById");
  getStoryContext = /* @__PURE__ */ n((e) => ({
    ...this.store.getStoryContext(e),
    loaded: {},
    viewMode: "docs"
  }), "getStoryContext");
  loadStory = /* @__PURE__ */ n((e) => this.store.loadStory({ storyId: e }), "loadStory");
};
n(fi, "DocsContext");
var ye = fi;

// src/preview-api/modules/preview-web/render/CsfDocsRender.ts
var yi = class yi {
  constructor(e, t, o, a) {
    this.channel = e;
    this.store = t;
    this.entry = o;
    this.callbacks = a;
    this.id = o.id;
  }
  type = "docs";
  subtype = "csf";
  id;
  story;
  rerender;
  teardownRender;
  torndown = !1;
  disableKeyListeners = !1;
  preparing = !1;
  csfFiles;
  isPreparing() {
    return this.preparing;
  }
  async prepare() {
    this.preparing = !0;
    let { entryExports: e, csfFiles: t = [] } = await this.store.loadEntry(this.id);
    if (this.torndown) throw Ee;
    let { importPath: o, title: a } = this.entry, i = this.store.processCSFFileWithCache(
      e,
      o,
      a
    ), l = Object.keys(i.stories)[0];
    this.story = this.store.storyFromCSFFile({ storyId: l, csfFile: i }), this.csfFiles = [i, ...t], this.preparing = !1;
  }
  isEqual(e) {
    return !!(this.id === e.id && this.story && this.story === e.story);
  }
  docsContext(e) {
    if (!this.csfFiles) throw new Error("Cannot render docs before preparing");
    let t = new ye(
      this.channel,
      this.store,
      e,
      this.csfFiles
    );
    return this.csfFiles.forEach((o) => t.attachCSFFile(o)), t;
  }
  async renderToElement(e, t) {
    if (!this.story || !this.csfFiles) throw new Error("Cannot render docs before preparing");
    let o = this.docsContext(t), { docs: a } = this.story.parameters || {};
    if (!a)
      throw new Error(
        "Cannot render a story in viewMode=docs if `@storybook/addon-docs` is not installed"
      );
    let i = await a.renderer(), { render: l } = i, c = /* @__PURE__ */ n(async () => {
      try {
        await l(o, a, e), this.channel.emit(Nr, this.id);
      } catch (s) {
        this.callbacks.showException(s);
      }
    }, "renderDocs");
    return this.rerender = async () => c(), this.teardownRender = async ({ viewModeChanged: s }) => {
      !s || !e || i.unmount(e);
    }, c();
  }
  async teardown({ viewModeChanged: e } = {}) {
    this.teardownRender?.({ viewModeChanged: e }), this.torndown = !0;
  }
};
n(yi, "CsfDocsRender");
var bt = yi;

// src/preview-api/modules/preview-web/render/MdxDocsRender.ts
var hi = class hi {
  constructor(e, t, o, a) {
    this.channel = e;
    this.store = t;
    this.entry = o;
    this.callbacks = a;
    this.id = o.id;
  }
  type = "docs";
  subtype = "mdx";
  id;
  exports;
  rerender;
  teardownRender;
  torndown = !1;
  disableKeyListeners = !1;
  preparing = !1;
  csfFiles;
  isPreparing() {
    return this.preparing;
  }
  async prepare() {
    this.preparing = !0;
    let { entryExports: e, csfFiles: t = [] } = await this.store.loadEntry(this.id);
    if (this.torndown) throw Ee;
    this.csfFiles = t, this.exports = e, this.preparing = !1;
  }
  isEqual(e) {
    return !!(this.id === e.id && this.exports && this.exports === e.exports);
  }
  docsContext(e) {
    if (!this.csfFiles) throw new Error("Cannot render docs before preparing");
    return new ye(
      this.channel,
      this.store,
      e,
      this.csfFiles
    );
  }
  async renderToElement(e, t) {
    if (!this.exports || !this.csfFiles || !this.store.projectAnnotations)
      throw new Error("Cannot render docs before preparing");
    let o = this.docsContext(t), { docs: a } = this.store.projectAnnotations.parameters || {};
    if (!a)
      throw new Error(
        "Cannot render a story in viewMode=docs if `@storybook/addon-docs` is not installed"
      );
    let i = { ...a, page: this.exports.default }, l = await a.renderer(), { render: c } = l, s = /* @__PURE__ */ n(async () => {
      try {
        await c(o, i, e), this.channel.emit(Nr, this.id);
      } catch (u) {
        this.callbacks.showException(u);
      }
    }, "renderDocs");
    return this.rerender = async () => s(), this.teardownRender = async ({ viewModeChanged: u } = {}) => {
      !u || !e || (l.unmount(e), this.torndown = !0);
    }, s();
  }
  async teardown({ viewModeChanged: e } = {}) {
    this.teardownRender?.({ viewModeChanged: e }), this.torndown = !0;
  }
};
n(hi, "MdxDocsRender");
var vt = hi;

// src/preview-api/modules/preview-web/PreviewWithSelection.tsx
var pO = globalThis;
function dO(r) {
  let e = r.composedPath && r.composedPath()[0] || r.target;
  return /input|textarea/i.test(e.tagName) || e.getAttribute("contenteditable") !== null;
}
n(dO, "focusInInput");
var Uf = "attached-mdx", fO = "unattached-mdx";
function yO({ tags: r }) {
  return r?.includes(fO) || r?.includes(Uf);
}
n(yO, "isMdxEntry");
function mi(r) {
  return r.type === "story";
}
n(mi, "isStoryRender");
function hO(r) {
  return r.type === "docs";
}
n(hO, "isDocsRender");
function mO(r) {
  return hO(r) && r.subtype === "csf";
}
n(mO, "isCsfDocsRender");
var gi = class gi extends je {
  constructor(t, o, a, i) {
    super(t, o, void 0, !1);
    this.importFn = t;
    this.getProjectAnnotations = o;
    this.selectionStore = a;
    this.view = i;
    this.initialize();
  }
  currentSelection;
  currentRender;
  setupListeners() {
    super.setupListeners(), pO.onkeydown = this.onKeydown.bind(this), this.channel.on(un, this.onSetCurrentStory.bind(this)), this.channel.on(
    vn, this.onUpdateQueryParams.bind(this)), this.channel.on(ln, this.onPreloadStories.bind(this));
  }
  async setInitialGlobals() {
    if (!this.storyStoreValue)
      throw new z({ methodName: "setInitialGlobals" });
    let { globals: t } = this.selectionStore.selectionSpecifier || {};
    t && this.storyStoreValue.globals.updateFromPersisted(t), this.emitGlobals();
  }
  // If initialization gets as far as the story index, this function runs.
  async initializeWithStoryIndex(t) {
    return await super.initializeWithStoryIndex(t), this.selectSpecifiedStory();
  }
  // Use the selection specifier to choose a story, then render it
  async selectSpecifiedStory() {
    if (!this.storyStoreValue)
      throw new z({
        methodName: "selectSpecifiedStory"
      });
    if (this.selectionStore.selection) {
      await this.renderSelection();
      return;
    }
    if (!this.selectionStore.selectionSpecifier) {
      this.renderMissingStory();
      return;
    }
    let { storySpecifier: t, args: o } = this.selectionStore.selectionSpecifier, a = this.storyStoreValue.storyIndex.entryFromSpecifier(t);
    if (!a) {
      t === "*" ? this.renderStoryLoadingException(t, new Kr()) : this.renderStoryLoadingException(
        t,
        new Xr({ storySpecifier: t.toString() })
      );
      return;
    }
    let { id: i, type: l } = a;
    this.selectionStore.setSelection({ storyId: i, viewMode: l }), this.channel.emit(gn, this.selectionStore.selection), this.channel.emit(jt,
    this.selectionStore.selection), await this.renderSelection({ persistedArgs: o });
  }
  // EVENT HANDLERS
  // This happens when a config file gets reloaded
  async onGetProjectAnnotationsChanged({
    getProjectAnnotations: t
  }) {
    await super.onGetProjectAnnotationsChanged({ getProjectAnnotations: t }), this.selectionStore.selection && this.renderSelection();
  }
  // This happens when a glob gets HMR-ed
  async onStoriesChanged({
    importFn: t,
    storyIndex: o
  }) {
    await super.onStoriesChanged({ importFn: t, storyIndex: o }), this.selectionStore.selection ? await this.renderSelection() : await this.
    selectSpecifiedStory();
  }
  onKeydown(t) {
    if (!this.storyRenders.find((o) => o.disableKeyListeners) && !dO(t)) {
      let { altKey: o, ctrlKey: a, metaKey: i, shiftKey: l, key: c, code: s, keyCode: u } = t;
      this.channel.emit(cn, {
        event: { altKey: o, ctrlKey: a, metaKey: i, shiftKey: l, key: c, code: s, keyCode: u }
      });
    }
  }
  async onSetCurrentStory(t) {
    this.selectionStore.setSelection({ viewMode: "story", ...t }), await this.storeInitializationPromise, this.channel.emit(jt, this.selectionStore.
    selection), this.renderSelection();
  }
  onUpdateQueryParams(t) {
    this.selectionStore.setQueryParams(t);
  }
  async onUpdateGlobals({ globals: t }) {
    super.onUpdateGlobals({ globals: t }), (this.currentRender instanceof vt || this.currentRender instanceof bt) && await this.currentRender.
    rerender?.();
  }
  async onUpdateArgs({ storyId: t, updatedArgs: o }) {
    super.onUpdateArgs({ storyId: t, updatedArgs: o });
  }
  async onPreloadStories({ ids: t }) {
    await this.storeInitializationPromise, this.storyStoreValue && await Promise.allSettled(t.map((o) => this.storyStoreValue?.loadEntry(o)));
  }
  // RENDERING
  // We can either have:
  // - a story selected in "story" viewMode,
  //     in which case we render it to the root element, OR
  // - a story selected in "docs" viewMode,
  //     in which case we render the docsPage for that story
  async renderSelection({ persistedArgs: t } = {}) {
    let { renderToCanvas: o } = this;
    if (!this.storyStoreValue || !o)
      throw new z({ methodName: "renderSelection" });
    let { selection: a } = this.selectionStore;
    if (!a) throw new Error("Cannot call renderSelection as no selection was made");
    let { storyId: i } = a, l;
    try {
      l = await this.storyStoreValue.storyIdToEntry(i);
    } catch (g) {
      this.currentRender && await this.teardownRender(this.currentRender), this.renderStoryLoadingException(i, g);
      return;
    }
    let c = this.currentSelection?.storyId !== i, s = this.currentRender?.type !== l.type;
    l.type === "story" ? this.view.showPreparingStory({ immediate: s }) : this.view.showPreparingDocs({ immediate: s }), this.currentRender?.
    isPreparing() && await this.teardownRender(this.currentRender);
    let u;
    l.type === "story" ? u = new Rr(
      this.channel,
      this.storyStoreValue,
      o,
      this.mainStoryCallbacks(i),
      i,
      "story"
    ) : yO(l) ? u = new vt(
      this.channel,
      this.storyStoreValue,
      l,
      this.mainStoryCallbacks(i)
    ) : u = new bt(
      this.channel,
      this.storyStoreValue,
      l,
      this.mainStoryCallbacks(i)
    );
    let p = this.currentSelection;
    this.currentSelection = a;
    let y = this.currentRender;
    this.currentRender = u;
    try {
      await u.prepare();
    } catch (g) {
      y && await this.teardownRender(y), g !== Ee && this.renderStoryLoadingException(i, g);
      return;
    }
    let h = !c && y && !u.isEqual(y);
    if (t && mi(u) && (fe(!!u.story), this.storyStoreValue.args.updateFromPersisted(u.story, t)), y && !y.torndown && !c && !h && !s) {
      this.currentRender = y, this.channel.emit(bn, i), this.view.showMain();
      return;
    }
    if (y && await this.teardownRender(y, { viewModeChanged: s }), p && (c || s) && this.channel.emit(fn, i), mi(u)) {
      fe(!!u.story);
      let { parameters: g, initialArgs: m, argTypes: b, unmappedArgs: S } = this.storyStoreValue.getStoryContext(u.story);
      this.channel.emit(mn, {
        id: i,
        parameters: g,
        initialArgs: m,
        argTypes: b,
        args: S
      });
    } else {
      let { parameters: g } = this.storyStoreValue.projectAnnotations;
      if (mO(u) || u.entry.tags?.includes(Uf)) {
        if (!u.csfFiles) throw new Yr({ storyId: i });
        ({ parameters: g } = this.storyStoreValue.preparedMetaFromCSFFile({
          csfFile: u.csfFiles[0]
        }));
      }
      this.channel.emit(tn, {
        id: i,
        parameters: g
      });
    }
    mi(u) ? (fe(!!u.story), this.storyRenders.push(u), this.currentRender.renderToElement(
      this.view.prepareForStory(u.story)
    )) : this.currentRender.renderToElement(
      this.view.prepareForDocs(),
      // This argument is used for docs, which is currently only compatible with HTMLElements
      this.renderStoryToElement.bind(this)
    );
  }
  async teardownRender(t, { viewModeChanged: o = !1 } = {}) {
    this.storyRenders = this.storyRenders.filter((a) => a !== t), await t?.teardown?.({ viewModeChanged: o });
  }
  // UTILITIES
  mainStoryCallbacks(t) {
    return {
      showStoryDuringRender: /* @__PURE__ */ n(() => this.view.showStoryDuringRender(), "showStoryDuringRender"),
      showMain: /* @__PURE__ */ n(() => this.view.showMain(), "showMain"),
      showError: /* @__PURE__ */ n((o) => this.renderError(t, o), "showError"),
      showException: /* @__PURE__ */ n((o) => this.renderException(t, o), "showException")
    };
  }
  renderPreviewEntryError(t, o) {
    super.renderPreviewEntryError(t, o), this.view.showErrorDisplay(o);
  }
  renderMissingStory() {
    this.view.showNoPreview(), this.channel.emit(Bt);
  }
  renderStoryLoadingException(t, o) {
    I.error(o), this.view.showErrorDisplay(o), this.channel.emit(Bt, t);
  }
  // renderException is used if we fail to render the story and it is uncaught by the app layer
  renderException(t, o) {
    let { name: a = "Error", message: i = String(o), stack: l } = o;
    this.channel.emit(Sn, { name: a, message: i, stack: l }), this.channel.emit(Oe, { newPhase: "errored", storyId: t }), this.view.showErrorDisplay(
    o), I.error(`Error rendering story '${t}':`), I.error(o);
  }
  // renderError is used by the various app layers to inform the user they have done something
  // wrong -- for instance returned the wrong thing from a story
  renderError(t, { title: o, description: a }) {
    I.error(`Error rendering story ${o}: ${a}`), this.channel.emit(yn, { title: o, description: a }), this.channel.emit(Oe, { newPhase: "err\
ored", storyId: t }), this.view.showErrorDisplay({
      message: o,
      stack: a
    });
  }
};
n(gi, "PreviewWithSelection");
var Be = gi;

// src/preview-api/modules/preview-web/UrlStore.ts
var Vo = W(Ho(), 1);

// src/preview-api/modules/preview-web/parseArgsParam.ts
var wh = W(Ho(), 1);
var xh = W(yo(), 1);
var Ah = /^[a-zA-Z0-9 _-]*$/, _h = /^-?[0-9]+(\.[0-9]+)?$/, hI = /^#([a-f0-9]{3,4}|[a-f0-9]{6}|[a-f0-9]{8})$/i, Ph = /^(rgba?|hsla?)\(([0-9]{1,3}),\s?([0-9]{1,3})%?,\s?([0-9]{1,3})%?,?\s?([0-9](\.[0-9]{1,2})?)?\)$/i,
Vi = /* @__PURE__ */ n((r = "", e) => r === null || r === "" || !Ah.test(r) ? !1 : e == null || e instanceof Date || typeof e == "number" ||
typeof e == "boolean" ? !0 : typeof e == "string" ? Ah.test(e) || _h.test(e) || hI.test(e) || Ph.test(e) : Array.isArray(e) ? e.every((t) => Vi(
r, t)) : (0, xh.default)(e) ? Object.entries(e).every(([t, o]) => Vi(t, o)) : !1, "validateArgs"), mI = {
  delimiter: ";",
  // we're parsing a single query param
  allowDots: !0,
  // objects are encoded using dot notation
  allowSparse: !0,
  // arrays will be merged on top of their initial value
  decoder(r, e, t, o) {
    if (o === "value" && r.startsWith("!")) {
      if (r === "!undefined") return;
      if (r === "!null") return null;
      if (r === "!true") return !0;
      if (r === "!false") return !1;
      if (r.startsWith("!date(") && r.endsWith(")")) return new Date(r.slice(6, -1));
      if (r.startsWith("!hex(") && r.endsWith(")")) return `#${r.slice(5, -1)}`;
      let a = r.slice(1).match(Ph);
      if (a)
        return r.startsWith("!rgba") ? `${a[1]}(${a[2]}, ${a[3]}, ${a[4]}, ${a[5]})` : r.startsWith("!hsla") ? `${a[1]}(${a[2]}, ${a[3]}%, ${a[4]}\
%, ${a[5]})` : r.startsWith("!rgb") ? `${a[1]}(${a[2]}, ${a[3]}, ${a[4]})` : `${a[1]}(${a[2]}, ${a[3]}%, ${a[4]}%)`;
    }
    return o === "value" && _h.test(r) ? Number(r) : e(r, e, t);
  }
}, $i = /* @__PURE__ */ n((r) => {
  let e = r.split(";").map((t) => t.replace("=", "~").replace(":", "="));
  return Object.entries(wh.default.parse(e.join(";"), mI)).reduce((t, [o, a]) => Vi(o, a) ? Object.assign(t, { [o]: a }) : (j.warn(_`
      Omitted potentially unsafe URL args.

      More info: https://storybook.js.org/docs/react/writing-stories/args#setting-args-through-the-url
    `), t), {});
}, "parseArgsParam");

// src/preview-api/modules/preview-web/UrlStore.ts
var { history: Oh, document: me } = R;
function gI(r) {
  let e = (r || "").match(/^\/story\/(.+)/);
  if (!e)
    throw new Error(`Invalid path '${r}',  must start with '/story/'`);
  return e[1];
}
n(gI, "pathToId");
var Ch = /* @__PURE__ */ n(({
  selection: r,
  extraParams: e
}) => {
  let t = typeof me < "u" ? me.location.search : "", { path: o, selectedKind: a, selectedStory: i, ...l } = Vo.default.parse(t, {
    ignoreQueryPrefix: !0
  });
  return Vo.default.stringify(
    {
      ...l,
      ...e,
      ...r && { id: r.storyId, viewMode: r.viewMode }
    },
    { encode: !1, addQueryPrefix: !0 }
  );
}, "getQueryString"), SI = /* @__PURE__ */ n((r) => {
  if (!r) return;
  let e = Ch({ selection: r }), { hash: t = "" } = me.location;
  me.title = r.storyId, Oh.replaceState({}, "", `${me.location.pathname}${e}${t}`);
}, "setPath"), bI = /* @__PURE__ */ n((r) => r != null && typeof r == "object" && Array.isArray(r) === !1, "isObject"), _t = /* @__PURE__ */ n(
(r) => {
  if (r !== void 0) {
    if (typeof r == "string")
      return r;
    if (Array.isArray(r))
      return _t(r[0]);
    if (bI(r))
      return _t(Object.values(r).filter(Boolean));
  }
}, "getFirstString"), vI = /* @__PURE__ */ n(() => {
  if (typeof me < "u") {
    let r = Vo.default.parse(me.location.search, { ignoreQueryPrefix: !0 }), e = typeof r.args == "string" ? $i(r.args) : void 0, t = typeof r.
    globals == "string" ? $i(r.globals) : void 0, o = _t(r.viewMode);
    (typeof o != "string" || !o.match(/docs|story/)) && (o = "story");
    let a = _t(r.path), i = a ? gI(a) : _t(r.id);
    if (i)
      return { storySpecifier: i, args: e, globals: t, viewMode: o };
  }
  return null;
}, "getSelectionSpecifierFromPath"), Wi = class Wi {
  selectionSpecifier;
  selection;
  constructor() {
    this.selectionSpecifier = vI();
  }
  setSelection(e) {
    this.selection = e, SI(this.selection);
  }
  setQueryParams(e) {
    let t = Ch({ extraParams: e }), { hash: o = "" } = me.location;
    Oh.replaceState({}, "", `${me.location.pathname}${t}${o}`);
  }
};
n(Wi, "UrlStore");
var $e = Wi;

// src/preview-api/modules/preview-web/WebView.ts
var lm = W(am(), 1);
var cm = W(Ho(), 1);
var { document: X } = R, im = 100, um = /* @__PURE__ */ ((i) => (i.MAIN = "MAIN", i.NOPREVIEW = "NOPREVIEW", i.PREPARING_STORY = "PREPARING_\
STORY", i.PREPARING_DOCS = "PREPARING_DOCS", i.ERROR = "ERROR", i))(um || {}), Zi = {
  PREPARING_STORY: "sb-show-preparing-story",
  PREPARING_DOCS: "sb-show-preparing-docs",
  MAIN: "sb-show-main",
  NOPREVIEW: "sb-show-nopreview",
  ERROR: "sb-show-errordisplay"
}, es = {
  centered: "sb-main-centered",
  fullscreen: "sb-main-fullscreen",
  padded: "sb-main-padded"
}, sm = new lm.default({
  escapeXML: !0
}), rs = class rs {
  currentLayoutClass;
  testing = !1;
  preparingTimeout;
  constructor() {
    if (typeof X < "u") {
      let { __SPECIAL_TEST_PARAMETER__: e } = cm.default.parse(X.location.search, {
        ignoreQueryPrefix: !0
      });
      switch (e) {
        case "preparing-story": {
          this.showPreparingStory(), this.testing = !0;
          break;
        }
        case "preparing-docs": {
          this.showPreparingDocs(), this.testing = !0;
          break;
        }
        default:
      }
    }
  }
  // Get ready to render a story, returning the element to render to
  prepareForStory(e) {
    return this.showStory(), this.applyLayout(e.parameters.layout), X.documentElement.scrollTop = 0, X.documentElement.scrollLeft = 0, this.
    storyRoot();
  }
  storyRoot() {
    return X.getElementById("storybook-root");
  }
  prepareForDocs() {
    return this.showMain(), this.showDocs(), this.applyLayout("fullscreen"), X.documentElement.scrollTop = 0, X.documentElement.scrollLeft =
    0, this.docsRoot();
  }
  docsRoot() {
    return X.getElementById("storybook-docs");
  }
  applyLayout(e = "padded") {
    if (e === "none") {
      X.body.classList.remove(this.currentLayoutClass), this.currentLayoutClass = null;
      return;
    }
    this.checkIfLayoutExists(e);
    let t = es[e];
    X.body.classList.remove(this.currentLayoutClass), X.body.classList.add(t), this.currentLayoutClass = t;
  }
  checkIfLayoutExists(e) {
    es[e] || I.warn(
      _`
          The desired layout: ${e} is not a valid option.
          The possible options are: ${Object.keys(es).join(", ")}, none.
        `
    );
  }
  showMode(e) {
    clearTimeout(this.preparingTimeout), Object.keys(um).forEach((t) => {
      t === e ? X.body.classList.add(Zi[t]) : X.body.classList.remove(Zi[t]);
    });
  }
  showErrorDisplay({ message: e = "", stack: t = "" }) {
    let o = e, a = t, i = e.split(`
`);
    i.length > 1 && ([o] = i, a = i.slice(1).join(`
`).replace(/^\n/, "")), X.getElementById("error-message").innerHTML = sm.toHtml(o), X.getElementById("error-stack").innerHTML = sm.toHtml(a),
    this.showMode("ERROR");
  }
  showNoPreview() {
    this.testing || (this.showMode("NOPREVIEW"), this.storyRoot()?.setAttribute("hidden", "true"), this.docsRoot()?.setAttribute("hidden", "\
true"));
  }
  showPreparingStory({ immediate: e = !1 } = {}) {
    clearTimeout(this.preparingTimeout), e ? this.showMode("PREPARING_STORY") : this.preparingTimeout = setTimeout(
      () => this.showMode("PREPARING_STORY"),
      im
    );
  }
  showPreparingDocs({ immediate: e = !1 } = {}) {
    clearTimeout(this.preparingTimeout), e ? this.showMode("PREPARING_DOCS") : this.preparingTimeout = setTimeout(() => this.showMode("PREPA\
RING_DOCS"), im);
  }
  showMain() {
    this.showMode("MAIN");
  }
  showDocs() {
    this.storyRoot().setAttribute("hidden", "true"), this.docsRoot().removeAttribute("hidden");
  }
  showStory() {
    this.docsRoot().setAttribute("hidden", "true"), this.storyRoot().removeAttribute("hidden");
  }
  showStoryDuringRender() {
    X.body.classList.add(Zi.MAIN);
  }
};
n(rs, "WebView");
var ze = rs;

// src/preview-api/modules/preview-web/PreviewWeb.tsx
var ts = class ts extends Be {
  constructor(t, o) {
    super(t, o, new $e(), new ze());
    this.importFn = t;
    this.getProjectAnnotations = o;
    R.__STORYBOOK_PREVIEW__ = this;
  }
};
n(ts, "PreviewWeb");
var Ot = ts;

// src/preview-api/modules/preview-web/simulate-pageload.ts
var { document: Ye } = R, rF = [
  "application/javascript",
  "application/ecmascript",
  "application/x-ecmascript",
  "application/x-javascript",
  "text/ecmascript",
  "text/javascript",
  "text/javascript1.0",
  "text/javascript1.1",
  "text/javascript1.2",
  "text/javascript1.3",
  "text/javascript1.4",
  "text/javascript1.5",
  "text/jscript",
  "text/livescript",
  "text/x-ecmascript",
  "text/x-javascript",
  // Support modern javascript
  "module"
], tF = "script", pm = "scripts-root";
function Ct() {
  let r = Ye.createEvent("Event");
  r.initEvent("DOMContentLoaded", !0, !0), Ye.dispatchEvent(r);
}
n(Ct, "simulateDOMContentLoaded");
function oF(r, e, t) {
  let o = Ye.createElement("script");
  o.type = r.type === "module" ? "module" : "text/javascript", r.src ? (o.onload = e, o.onerror = e, o.src = r.src) : o.textContent = r.innerText,
  t ? t.appendChild(o) : Ye.head.appendChild(o), r.parentNode.removeChild(r), r.src || e();
}
n(oF, "insertScript");
function dm(r, e, t = 0) {
  r[t](() => {
    t++, t === r.length ? e() : dm(r, e, t);
  });
}
n(dm, "insertScriptsSequentially");
function os(r) {
  let e = Ye.getElementById(pm);
  e ? e.innerHTML = "" : (e = Ye.createElement("div"), e.id = pm, Ye.body.appendChild(e));
  let t = Array.from(r.querySelectorAll(tF));
  if (t.length) {
    let o = [];
    t.forEach((a) => {
      let i = a.getAttribute("type");
      (!i || rF.includes(i)) && o.push((l) => oF(a, l, e));
    }), o.length && dm(o, Ct, void 0);
  } else
    Ct();
}
n(os, "simulatePageLoad");

// src/types/index.ts
var Ft = {};
Pe(Ft, {
  Addon_TypesEnum: () => fm
});

// src/types/modules/addons.ts
var fm = /* @__PURE__ */ ((s) => (s.TAB = "tab", s.PANEL = "panel", s.TOOL = "tool", s.TOOLEXTRA = "toolextra", s.PREVIEW = "preview", s.experimental_PAGE =
"page", s.experimental_SIDEBAR_BOTTOM = "sidebar-bottom", s.experimental_SIDEBAR_TOP = "sidebar-top", s))(fm || {});

// src/preview/globals/runtime.ts
var ym = {
  "@storybook/global": Rn,
  "storybook/internal/channels": Hr,
  "@storybook/channels": Hr,
  "@storybook/core/channels": Hr,
  "storybook/internal/client-logger": jr,
  "@storybook/client-logger": jr,
  "@storybook/core/client-logger": jr,
  "storybook/internal/core-events": ge,
  "@storybook/core-events": ge,
  "@storybook/core/core-events": ge,
  "storybook/internal/preview-errors": rt,
  "@storybook/core-events/preview-errors": rt,
  "@storybook/core/preview-errors": rt,
  "storybook/internal/preview-api": It,
  "@storybook/preview-api": It,
  "@storybook/core/preview-api": It,
  "storybook/internal/types": Ft,
  "@storybook/types": Ft,
  "@storybook/core/types": Ft
};

// src/preview/utils.ts
var mm = W(hm(), 1);
var is;
function nF() {
  return is || (is = new mm.default(R.navigator?.userAgent).getBrowserInfo()), is;
}
n(nF, "getBrowserInfo");
function gm(r) {
  return r.browserInfo = nF(), r;
}
n(gm, "prepareForTelemetry");

// src/preview/runtime.ts
ss.forEach((r) => {
  R[An[r]] = ym[r];
});
R.sendTelemetryError = (r) => {
  R.__STORYBOOK_ADDONS_CHANNEL__.emit(Tn, gm(r));
};
R.addEventListener("error", (r) => {
  let e = r.error || r;
  e.fromStorybook && R.sendTelemetryError(e);
});
R.addEventListener("unhandledrejection", ({ reason: r }) => {
  r.fromStorybook && R.sendTelemetryError(r);
});
