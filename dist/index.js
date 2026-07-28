let Rl = "launcher";
const Ml = /* @__PURE__ */ new Set(), Ut = {
  get() {
    return Rl;
  },
  show(e) {
    if (e !== Rl) {
      Rl = e;
      for (const t of Ml) t();
    }
  },
  subscribe(e) {
    return Ml.add(e), () => Ml.delete(e);
  }
};
var hu = { exports: {} }, pl = {}, mu = { exports: {} }, T = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var sr = Symbol.for("react.element"), Tc = Symbol.for("react.portal"), Lc = Symbol.for("react.fragment"), Rc = Symbol.for("react.strict_mode"), Mc = Symbol.for("react.profiler"), Dc = Symbol.for("react.provider"), Oc = Symbol.for("react.context"), Ic = Symbol.for("react.forward_ref"), Fc = Symbol.for("react.suspense"), $c = Symbol.for("react.memo"), Ac = Symbol.for("react.lazy"), bo = Symbol.iterator;
function Bc(e) {
  return e === null || typeof e != "object" ? null : (e = bo && e[bo] || e["@@iterator"], typeof e == "function" ? e : null);
}
var gu = { isMounted: function() {
  return !1;
}, enqueueForceUpdate: function() {
}, enqueueReplaceState: function() {
}, enqueueSetState: function() {
} }, vu = Object.assign, yu = {};
function mn(e, t, n) {
  this.props = e, this.context = t, this.refs = yu, this.updater = n || gu;
}
mn.prototype.isReactComponent = {};
mn.prototype.setState = function(e, t) {
  if (typeof e != "object" && typeof e != "function" && e != null) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
  this.updater.enqueueSetState(this, e, t, "setState");
};
mn.prototype.forceUpdate = function(e) {
  this.updater.enqueueForceUpdate(this, e, "forceUpdate");
};
function xu() {
}
xu.prototype = mn.prototype;
function ro(e, t, n) {
  this.props = e, this.context = t, this.refs = yu, this.updater = n || gu;
}
var lo = ro.prototype = new xu();
lo.constructor = ro;
vu(lo, mn.prototype);
lo.isPureReactComponent = !0;
var es = Array.isArray, ku = Object.prototype.hasOwnProperty, io = { current: null }, wu = { key: !0, ref: !0, __self: !0, __source: !0 };
function Su(e, t, n) {
  var r, l = {}, i = null, o = null;
  if (t != null) for (r in t.ref !== void 0 && (o = t.ref), t.key !== void 0 && (i = "" + t.key), t) ku.call(t, r) && !wu.hasOwnProperty(r) && (l[r] = t[r]);
  var s = arguments.length - 2;
  if (s === 1) l.children = n;
  else if (1 < s) {
    for (var u = Array(s), c = 0; c < s; c++) u[c] = arguments[c + 2];
    l.children = u;
  }
  if (e && e.defaultProps) for (r in s = e.defaultProps, s) l[r] === void 0 && (l[r] = s[r]);
  return { $$typeof: sr, type: e, key: i, ref: o, props: l, _owner: io.current };
}
function Uc(e, t) {
  return { $$typeof: sr, type: e.type, key: t, ref: e.ref, props: e.props, _owner: e._owner };
}
function oo(e) {
  return typeof e == "object" && e !== null && e.$$typeof === sr;
}
function Hc(e) {
  var t = { "=": "=0", ":": "=2" };
  return "$" + e.replace(/[=:]/g, function(n) {
    return t[n];
  });
}
var ts = /\/+/g;
function Dl(e, t) {
  return typeof e == "object" && e !== null && e.key != null ? Hc("" + e.key) : t.toString(36);
}
function Lr(e, t, n, r, l) {
  var i = typeof e;
  (i === "undefined" || i === "boolean") && (e = null);
  var o = !1;
  if (e === null) o = !0;
  else switch (i) {
    case "string":
    case "number":
      o = !0;
      break;
    case "object":
      switch (e.$$typeof) {
        case sr:
        case Tc:
          o = !0;
      }
  }
  if (o) return o = e, l = l(o), e = r === "" ? "." + Dl(o, 0) : r, es(l) ? (n = "", e != null && (n = e.replace(ts, "$&/") + "/"), Lr(l, t, n, "", function(c) {
    return c;
  })) : l != null && (oo(l) && (l = Uc(l, n + (!l.key || o && o.key === l.key ? "" : ("" + l.key).replace(ts, "$&/") + "/") + e)), t.push(l)), 1;
  if (o = 0, r = r === "" ? "." : r + ":", es(e)) for (var s = 0; s < e.length; s++) {
    i = e[s];
    var u = r + Dl(i, s);
    o += Lr(i, t, n, u, l);
  }
  else if (u = Bc(e), typeof u == "function") for (e = u.call(e), s = 0; !(i = e.next()).done; ) i = i.value, u = r + Dl(i, s++), o += Lr(i, t, n, u, l);
  else if (i === "object") throw t = String(e), Error("Objects are not valid as a React child (found: " + (t === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : t) + "). If you meant to render a collection of children, use an array instead.");
  return o;
}
function hr(e, t, n) {
  if (e == null) return e;
  var r = [], l = 0;
  return Lr(e, r, "", "", function(i) {
    return t.call(n, i, l++);
  }), r;
}
function Vc(e) {
  if (e._status === -1) {
    var t = e._result;
    t = t(), t.then(function(n) {
      (e._status === 0 || e._status === -1) && (e._status = 1, e._result = n);
    }, function(n) {
      (e._status === 0 || e._status === -1) && (e._status = 2, e._result = n);
    }), e._status === -1 && (e._status = 0, e._result = t);
  }
  if (e._status === 1) return e._result.default;
  throw e._result;
}
var fe = { current: null }, Rr = { transition: null }, Wc = { ReactCurrentDispatcher: fe, ReactCurrentBatchConfig: Rr, ReactCurrentOwner: io };
function Eu() {
  throw Error("act(...) is not supported in production builds of React.");
}
T.Children = { map: hr, forEach: function(e, t, n) {
  hr(e, function() {
    t.apply(this, arguments);
  }, n);
}, count: function(e) {
  var t = 0;
  return hr(e, function() {
    t++;
  }), t;
}, toArray: function(e) {
  return hr(e, function(t) {
    return t;
  }) || [];
}, only: function(e) {
  if (!oo(e)) throw Error("React.Children.only expected to receive a single React element child.");
  return e;
} };
T.Component = mn;
T.Fragment = Lc;
T.Profiler = Mc;
T.PureComponent = ro;
T.StrictMode = Rc;
T.Suspense = Fc;
T.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Wc;
T.act = Eu;
T.cloneElement = function(e, t, n) {
  if (e == null) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + e + ".");
  var r = vu({}, e.props), l = e.key, i = e.ref, o = e._owner;
  if (t != null) {
    if (t.ref !== void 0 && (i = t.ref, o = io.current), t.key !== void 0 && (l = "" + t.key), e.type && e.type.defaultProps) var s = e.type.defaultProps;
    for (u in t) ku.call(t, u) && !wu.hasOwnProperty(u) && (r[u] = t[u] === void 0 && s !== void 0 ? s[u] : t[u]);
  }
  var u = arguments.length - 2;
  if (u === 1) r.children = n;
  else if (1 < u) {
    s = Array(u);
    for (var c = 0; c < u; c++) s[c] = arguments[c + 2];
    r.children = s;
  }
  return { $$typeof: sr, type: e.type, key: l, ref: i, props: r, _owner: o };
};
T.createContext = function(e) {
  return e = { $$typeof: Oc, _currentValue: e, _currentValue2: e, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null }, e.Provider = { $$typeof: Dc, _context: e }, e.Consumer = e;
};
T.createElement = Su;
T.createFactory = function(e) {
  var t = Su.bind(null, e);
  return t.type = e, t;
};
T.createRef = function() {
  return { current: null };
};
T.forwardRef = function(e) {
  return { $$typeof: Ic, render: e };
};
T.isValidElement = oo;
T.lazy = function(e) {
  return { $$typeof: Ac, _payload: { _status: -1, _result: e }, _init: Vc };
};
T.memo = function(e, t) {
  return { $$typeof: $c, type: e, compare: t === void 0 ? null : t };
};
T.startTransition = function(e) {
  var t = Rr.transition;
  Rr.transition = {};
  try {
    e();
  } finally {
    Rr.transition = t;
  }
};
T.unstable_act = Eu;
T.useCallback = function(e, t) {
  return fe.current.useCallback(e, t);
};
T.useContext = function(e) {
  return fe.current.useContext(e);
};
T.useDebugValue = function() {
};
T.useDeferredValue = function(e) {
  return fe.current.useDeferredValue(e);
};
T.useEffect = function(e, t) {
  return fe.current.useEffect(e, t);
};
T.useId = function() {
  return fe.current.useId();
};
T.useImperativeHandle = function(e, t, n) {
  return fe.current.useImperativeHandle(e, t, n);
};
T.useInsertionEffect = function(e, t) {
  return fe.current.useInsertionEffect(e, t);
};
T.useLayoutEffect = function(e, t) {
  return fe.current.useLayoutEffect(e, t);
};
T.useMemo = function(e, t) {
  return fe.current.useMemo(e, t);
};
T.useReducer = function(e, t, n) {
  return fe.current.useReducer(e, t, n);
};
T.useRef = function(e) {
  return fe.current.useRef(e);
};
T.useState = function(e) {
  return fe.current.useState(e);
};
T.useSyncExternalStore = function(e, t, n) {
  return fe.current.useSyncExternalStore(e, t, n);
};
T.useTransition = function() {
  return fe.current.useTransition();
};
T.version = "18.3.1";
mu.exports = T;
var Ze = mu.exports;
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Qc = Ze, Kc = Symbol.for("react.element"), Yc = Symbol.for("react.fragment"), Gc = Object.prototype.hasOwnProperty, Xc = Qc.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, Zc = { key: !0, ref: !0, __self: !0, __source: !0 };
function Cu(e, t, n) {
  var r, l = {}, i = null, o = null;
  n !== void 0 && (i = "" + n), t.key !== void 0 && (i = "" + t.key), t.ref !== void 0 && (o = t.ref);
  for (r in t) Gc.call(t, r) && !Zc.hasOwnProperty(r) && (l[r] = t[r]);
  if (e && e.defaultProps) for (r in t = e.defaultProps, t) l[r] === void 0 && (l[r] = t[r]);
  return { $$typeof: Kc, type: e, key: i, ref: o, props: l, _owner: Xc.current };
}
pl.Fragment = Yc;
pl.jsx = Cu;
pl.jsxs = Cu;
hu.exports = pl;
var p = hu.exports, Nu = { exports: {} }, Se = {}, _u = { exports: {} }, ju = {};
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
(function(e) {
  function t(C, P) {
    var z = C.length;
    C.push(P);
    e: for (; 0 < z; ) {
      var W = z - 1 >>> 1, J = C[W];
      if (0 < l(J, P)) C[W] = P, C[z] = J, z = W;
      else break e;
    }
  }
  function n(C) {
    return C.length === 0 ? null : C[0];
  }
  function r(C) {
    if (C.length === 0) return null;
    var P = C[0], z = C.pop();
    if (z !== P) {
      C[0] = z;
      e: for (var W = 0, J = C.length, dr = J >>> 1; W < dr; ) {
        var Et = 2 * (W + 1) - 1, Ll = C[Et], Ct = Et + 1, pr = C[Ct];
        if (0 > l(Ll, z)) Ct < J && 0 > l(pr, Ll) ? (C[W] = pr, C[Ct] = z, W = Ct) : (C[W] = Ll, C[Et] = z, W = Et);
        else if (Ct < J && 0 > l(pr, z)) C[W] = pr, C[Ct] = z, W = Ct;
        else break e;
      }
    }
    return P;
  }
  function l(C, P) {
    var z = C.sortIndex - P.sortIndex;
    return z !== 0 ? z : C.id - P.id;
  }
  if (typeof performance == "object" && typeof performance.now == "function") {
    var i = performance;
    e.unstable_now = function() {
      return i.now();
    };
  } else {
    var o = Date, s = o.now();
    e.unstable_now = function() {
      return o.now() - s;
    };
  }
  var u = [], c = [], g = 1, m = null, h = 3, v = !1, w = !1, k = !1, D = typeof setTimeout == "function" ? setTimeout : null, f = typeof clearTimeout == "function" ? clearTimeout : null, a = typeof setImmediate < "u" ? setImmediate : null;
  typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
  function d(C) {
    for (var P = n(c); P !== null; ) {
      if (P.callback === null) r(c);
      else if (P.startTime <= C) r(c), P.sortIndex = P.expirationTime, t(u, P);
      else break;
      P = n(c);
    }
  }
  function y(C) {
    if (k = !1, d(C), !w) if (n(u) !== null) w = !0, zl(E);
    else {
      var P = n(c);
      P !== null && Tl(y, P.startTime - C);
    }
  }
  function E(C, P) {
    w = !1, k && (k = !1, f(j), j = -1), v = !0;
    var z = h;
    try {
      for (d(P), m = n(u); m !== null && (!(m.expirationTime > P) || C && !Re()); ) {
        var W = m.callback;
        if (typeof W == "function") {
          m.callback = null, h = m.priorityLevel;
          var J = W(m.expirationTime <= P);
          P = e.unstable_now(), typeof J == "function" ? m.callback = J : m === n(u) && r(u), d(P);
        } else r(u);
        m = n(u);
      }
      if (m !== null) var dr = !0;
      else {
        var Et = n(c);
        Et !== null && Tl(y, Et.startTime - P), dr = !1;
      }
      return dr;
    } finally {
      m = null, h = z, v = !1;
    }
  }
  var N = !1, _ = null, j = -1, V = 5, L = -1;
  function Re() {
    return !(e.unstable_now() - L < V);
  }
  function yn() {
    if (_ !== null) {
      var C = e.unstable_now();
      L = C;
      var P = !0;
      try {
        P = _(!0, C);
      } finally {
        P ? xn() : (N = !1, _ = null);
      }
    } else N = !1;
  }
  var xn;
  if (typeof a == "function") xn = function() {
    a(yn);
  };
  else if (typeof MessageChannel < "u") {
    var qo = new MessageChannel(), zc = qo.port2;
    qo.port1.onmessage = yn, xn = function() {
      zc.postMessage(null);
    };
  } else xn = function() {
    D(yn, 0);
  };
  function zl(C) {
    _ = C, N || (N = !0, xn());
  }
  function Tl(C, P) {
    j = D(function() {
      C(e.unstable_now());
    }, P);
  }
  e.unstable_IdlePriority = 5, e.unstable_ImmediatePriority = 1, e.unstable_LowPriority = 4, e.unstable_NormalPriority = 3, e.unstable_Profiling = null, e.unstable_UserBlockingPriority = 2, e.unstable_cancelCallback = function(C) {
    C.callback = null;
  }, e.unstable_continueExecution = function() {
    w || v || (w = !0, zl(E));
  }, e.unstable_forceFrameRate = function(C) {
    0 > C || 125 < C ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : V = 0 < C ? Math.floor(1e3 / C) : 5;
  }, e.unstable_getCurrentPriorityLevel = function() {
    return h;
  }, e.unstable_getFirstCallbackNode = function() {
    return n(u);
  }, e.unstable_next = function(C) {
    switch (h) {
      case 1:
      case 2:
      case 3:
        var P = 3;
        break;
      default:
        P = h;
    }
    var z = h;
    h = P;
    try {
      return C();
    } finally {
      h = z;
    }
  }, e.unstable_pauseExecution = function() {
  }, e.unstable_requestPaint = function() {
  }, e.unstable_runWithPriority = function(C, P) {
    switch (C) {
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
        break;
      default:
        C = 3;
    }
    var z = h;
    h = C;
    try {
      return P();
    } finally {
      h = z;
    }
  }, e.unstable_scheduleCallback = function(C, P, z) {
    var W = e.unstable_now();
    switch (typeof z == "object" && z !== null ? (z = z.delay, z = typeof z == "number" && 0 < z ? W + z : W) : z = W, C) {
      case 1:
        var J = -1;
        break;
      case 2:
        J = 250;
        break;
      case 5:
        J = 1073741823;
        break;
      case 4:
        J = 1e4;
        break;
      default:
        J = 5e3;
    }
    return J = z + J, C = { id: g++, callback: P, priorityLevel: C, startTime: z, expirationTime: J, sortIndex: -1 }, z > W ? (C.sortIndex = z, t(c, C), n(u) === null && C === n(c) && (k ? (f(j), j = -1) : k = !0, Tl(y, z - W))) : (C.sortIndex = J, t(u, C), w || v || (w = !0, zl(E))), C;
  }, e.unstable_shouldYield = Re, e.unstable_wrapCallback = function(C) {
    var P = h;
    return function() {
      var z = h;
      h = P;
      try {
        return C.apply(this, arguments);
      } finally {
        h = z;
      }
    };
  };
})(ju);
_u.exports = ju;
var Jc = _u.exports;
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var qc = Ze, we = Jc;
function x(e) {
  for (var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e, n = 1; n < arguments.length; n++) t += "&args[]=" + encodeURIComponent(arguments[n]);
  return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
}
var Pu = /* @__PURE__ */ new Set(), Wn = {};
function Ft(e, t) {
  sn(e, t), sn(e + "Capture", t);
}
function sn(e, t) {
  for (Wn[e] = t, e = 0; e < t.length; e++) Pu.add(t[e]);
}
var qe = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), ci = Object.prototype.hasOwnProperty, bc = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, ns = {}, rs = {};
function ef(e) {
  return ci.call(rs, e) ? !0 : ci.call(ns, e) ? !1 : bc.test(e) ? rs[e] = !0 : (ns[e] = !0, !1);
}
function tf(e, t, n, r) {
  if (n !== null && n.type === 0) return !1;
  switch (typeof t) {
    case "function":
    case "symbol":
      return !0;
    case "boolean":
      return r ? !1 : n !== null ? !n.acceptsBooleans : (e = e.toLowerCase().slice(0, 5), e !== "data-" && e !== "aria-");
    default:
      return !1;
  }
}
function nf(e, t, n, r) {
  if (t === null || typeof t > "u" || tf(e, t, n, r)) return !0;
  if (r) return !1;
  if (n !== null) switch (n.type) {
    case 3:
      return !t;
    case 4:
      return t === !1;
    case 5:
      return isNaN(t);
    case 6:
      return isNaN(t) || 1 > t;
  }
  return !1;
}
function de(e, t, n, r, l, i, o) {
  this.acceptsBooleans = t === 2 || t === 3 || t === 4, this.attributeName = r, this.attributeNamespace = l, this.mustUseProperty = n, this.propertyName = e, this.type = t, this.sanitizeURL = i, this.removeEmptyString = o;
}
var le = {};
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e) {
  le[e] = new de(e, 0, !1, e, null, !1, !1);
});
[["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(e) {
  var t = e[0];
  le[t] = new de(t, 1, !1, e[1], null, !1, !1);
});
["contentEditable", "draggable", "spellCheck", "value"].forEach(function(e) {
  le[e] = new de(e, 2, !1, e.toLowerCase(), null, !1, !1);
});
["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(e) {
  le[e] = new de(e, 2, !1, e, null, !1, !1);
});
"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e) {
  le[e] = new de(e, 3, !1, e.toLowerCase(), null, !1, !1);
});
["checked", "multiple", "muted", "selected"].forEach(function(e) {
  le[e] = new de(e, 3, !0, e, null, !1, !1);
});
["capture", "download"].forEach(function(e) {
  le[e] = new de(e, 4, !1, e, null, !1, !1);
});
["cols", "rows", "size", "span"].forEach(function(e) {
  le[e] = new de(e, 6, !1, e, null, !1, !1);
});
["rowSpan", "start"].forEach(function(e) {
  le[e] = new de(e, 5, !1, e.toLowerCase(), null, !1, !1);
});
var so = /[\-:]([a-z])/g;
function uo(e) {
  return e[1].toUpperCase();
}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e) {
  var t = e.replace(
    so,
    uo
  );
  le[t] = new de(t, 1, !1, e, null, !1, !1);
});
"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e) {
  var t = e.replace(so, uo);
  le[t] = new de(t, 1, !1, e, "http://www.w3.org/1999/xlink", !1, !1);
});
["xml:base", "xml:lang", "xml:space"].forEach(function(e) {
  var t = e.replace(so, uo);
  le[t] = new de(t, 1, !1, e, "http://www.w3.org/XML/1998/namespace", !1, !1);
});
["tabIndex", "crossOrigin"].forEach(function(e) {
  le[e] = new de(e, 1, !1, e.toLowerCase(), null, !1, !1);
});
le.xlinkHref = new de("xlinkHref", 1, !1, "xlink:href", "http://www.w3.org/1999/xlink", !0, !1);
["src", "href", "action", "formAction"].forEach(function(e) {
  le[e] = new de(e, 1, !1, e.toLowerCase(), null, !0, !0);
});
function ao(e, t, n, r) {
  var l = le.hasOwnProperty(t) ? le[t] : null;
  (l !== null ? l.type !== 0 : r || !(2 < t.length) || t[0] !== "o" && t[0] !== "O" || t[1] !== "n" && t[1] !== "N") && (nf(t, n, l, r) && (n = null), r || l === null ? ef(t) && (n === null ? e.removeAttribute(t) : e.setAttribute(t, "" + n)) : l.mustUseProperty ? e[l.propertyName] = n === null ? l.type === 3 ? !1 : "" : n : (t = l.attributeName, r = l.attributeNamespace, n === null ? e.removeAttribute(t) : (l = l.type, n = l === 3 || l === 4 && n === !0 ? "" : "" + n, r ? e.setAttributeNS(r, t, n) : e.setAttribute(t, n))));
}
var nt = qc.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, mr = Symbol.for("react.element"), Ht = Symbol.for("react.portal"), Vt = Symbol.for("react.fragment"), co = Symbol.for("react.strict_mode"), fi = Symbol.for("react.profiler"), zu = Symbol.for("react.provider"), Tu = Symbol.for("react.context"), fo = Symbol.for("react.forward_ref"), di = Symbol.for("react.suspense"), pi = Symbol.for("react.suspense_list"), po = Symbol.for("react.memo"), lt = Symbol.for("react.lazy"), Lu = Symbol.for("react.offscreen"), ls = Symbol.iterator;
function kn(e) {
  return e === null || typeof e != "object" ? null : (e = ls && e[ls] || e["@@iterator"], typeof e == "function" ? e : null);
}
var U = Object.assign, Ol;
function zn(e) {
  if (Ol === void 0) try {
    throw Error();
  } catch (n) {
    var t = n.stack.trim().match(/\n( *(at )?)/);
    Ol = t && t[1] || "";
  }
  return `
` + Ol + e;
}
var Il = !1;
function Fl(e, t) {
  if (!e || Il) return "";
  Il = !0;
  var n = Error.prepareStackTrace;
  Error.prepareStackTrace = void 0;
  try {
    if (t) if (t = function() {
      throw Error();
    }, Object.defineProperty(t.prototype, "props", { set: function() {
      throw Error();
    } }), typeof Reflect == "object" && Reflect.construct) {
      try {
        Reflect.construct(t, []);
      } catch (c) {
        var r = c;
      }
      Reflect.construct(e, [], t);
    } else {
      try {
        t.call();
      } catch (c) {
        r = c;
      }
      e.call(t.prototype);
    }
    else {
      try {
        throw Error();
      } catch (c) {
        r = c;
      }
      e();
    }
  } catch (c) {
    if (c && r && typeof c.stack == "string") {
      for (var l = c.stack.split(`
`), i = r.stack.split(`
`), o = l.length - 1, s = i.length - 1; 1 <= o && 0 <= s && l[o] !== i[s]; ) s--;
      for (; 1 <= o && 0 <= s; o--, s--) if (l[o] !== i[s]) {
        if (o !== 1 || s !== 1)
          do
            if (o--, s--, 0 > s || l[o] !== i[s]) {
              var u = `
` + l[o].replace(" at new ", " at ");
              return e.displayName && u.includes("<anonymous>") && (u = u.replace("<anonymous>", e.displayName)), u;
            }
          while (1 <= o && 0 <= s);
        break;
      }
    }
  } finally {
    Il = !1, Error.prepareStackTrace = n;
  }
  return (e = e ? e.displayName || e.name : "") ? zn(e) : "";
}
function rf(e) {
  switch (e.tag) {
    case 5:
      return zn(e.type);
    case 16:
      return zn("Lazy");
    case 13:
      return zn("Suspense");
    case 19:
      return zn("SuspenseList");
    case 0:
    case 2:
    case 15:
      return e = Fl(e.type, !1), e;
    case 11:
      return e = Fl(e.type.render, !1), e;
    case 1:
      return e = Fl(e.type, !0), e;
    default:
      return "";
  }
}
function hi(e) {
  if (e == null) return null;
  if (typeof e == "function") return e.displayName || e.name || null;
  if (typeof e == "string") return e;
  switch (e) {
    case Vt:
      return "Fragment";
    case Ht:
      return "Portal";
    case fi:
      return "Profiler";
    case co:
      return "StrictMode";
    case di:
      return "Suspense";
    case pi:
      return "SuspenseList";
  }
  if (typeof e == "object") switch (e.$$typeof) {
    case Tu:
      return (e.displayName || "Context") + ".Consumer";
    case zu:
      return (e._context.displayName || "Context") + ".Provider";
    case fo:
      var t = e.render;
      return e = e.displayName, e || (e = t.displayName || t.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
    case po:
      return t = e.displayName || null, t !== null ? t : hi(e.type) || "Memo";
    case lt:
      t = e._payload, e = e._init;
      try {
        return hi(e(t));
      } catch {
      }
  }
  return null;
}
function lf(e) {
  var t = e.type;
  switch (e.tag) {
    case 24:
      return "Cache";
    case 9:
      return (t.displayName || "Context") + ".Consumer";
    case 10:
      return (t._context.displayName || "Context") + ".Provider";
    case 18:
      return "DehydratedFragment";
    case 11:
      return e = t.render, e = e.displayName || e.name || "", t.displayName || (e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef");
    case 7:
      return "Fragment";
    case 5:
      return t;
    case 4:
      return "Portal";
    case 3:
      return "Root";
    case 6:
      return "Text";
    case 16:
      return hi(t);
    case 8:
      return t === co ? "StrictMode" : "Mode";
    case 22:
      return "Offscreen";
    case 12:
      return "Profiler";
    case 21:
      return "Scope";
    case 13:
      return "Suspense";
    case 19:
      return "SuspenseList";
    case 25:
      return "TracingMarker";
    case 1:
    case 0:
    case 17:
    case 2:
    case 14:
    case 15:
      if (typeof t == "function") return t.displayName || t.name || null;
      if (typeof t == "string") return t;
  }
  return null;
}
function yt(e) {
  switch (typeof e) {
    case "boolean":
    case "number":
    case "string":
    case "undefined":
      return e;
    case "object":
      return e;
    default:
      return "";
  }
}
function Ru(e) {
  var t = e.type;
  return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
}
function of(e) {
  var t = Ru(e) ? "checked" : "value", n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t), r = "" + e[t];
  if (!e.hasOwnProperty(t) && typeof n < "u" && typeof n.get == "function" && typeof n.set == "function") {
    var l = n.get, i = n.set;
    return Object.defineProperty(e, t, { configurable: !0, get: function() {
      return l.call(this);
    }, set: function(o) {
      r = "" + o, i.call(this, o);
    } }), Object.defineProperty(e, t, { enumerable: n.enumerable }), { getValue: function() {
      return r;
    }, setValue: function(o) {
      r = "" + o;
    }, stopTracking: function() {
      e._valueTracker = null, delete e[t];
    } };
  }
}
function gr(e) {
  e._valueTracker || (e._valueTracker = of(e));
}
function Mu(e) {
  if (!e) return !1;
  var t = e._valueTracker;
  if (!t) return !0;
  var n = t.getValue(), r = "";
  return e && (r = Ru(e) ? e.checked ? "true" : "false" : e.value), e = r, e !== n ? (t.setValue(e), !0) : !1;
}
function Vr(e) {
  if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u") return null;
  try {
    return e.activeElement || e.body;
  } catch {
    return e.body;
  }
}
function mi(e, t) {
  var n = t.checked;
  return U({}, t, { defaultChecked: void 0, defaultValue: void 0, value: void 0, checked: n ?? e._wrapperState.initialChecked });
}
function is(e, t) {
  var n = t.defaultValue == null ? "" : t.defaultValue, r = t.checked != null ? t.checked : t.defaultChecked;
  n = yt(t.value != null ? t.value : n), e._wrapperState = { initialChecked: r, initialValue: n, controlled: t.type === "checkbox" || t.type === "radio" ? t.checked != null : t.value != null };
}
function Du(e, t) {
  t = t.checked, t != null && ao(e, "checked", t, !1);
}
function gi(e, t) {
  Du(e, t);
  var n = yt(t.value), r = t.type;
  if (n != null) r === "number" ? (n === 0 && e.value === "" || e.value != n) && (e.value = "" + n) : e.value !== "" + n && (e.value = "" + n);
  else if (r === "submit" || r === "reset") {
    e.removeAttribute("value");
    return;
  }
  t.hasOwnProperty("value") ? vi(e, t.type, n) : t.hasOwnProperty("defaultValue") && vi(e, t.type, yt(t.defaultValue)), t.checked == null && t.defaultChecked != null && (e.defaultChecked = !!t.defaultChecked);
}
function os(e, t, n) {
  if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
    var r = t.type;
    if (!(r !== "submit" && r !== "reset" || t.value !== void 0 && t.value !== null)) return;
    t = "" + e._wrapperState.initialValue, n || t === e.value || (e.value = t), e.defaultValue = t;
  }
  n = e.name, n !== "" && (e.name = ""), e.defaultChecked = !!e._wrapperState.initialChecked, n !== "" && (e.name = n);
}
function vi(e, t, n) {
  (t !== "number" || Vr(e.ownerDocument) !== e) && (n == null ? e.defaultValue = "" + e._wrapperState.initialValue : e.defaultValue !== "" + n && (e.defaultValue = "" + n));
}
var Tn = Array.isArray;
function en(e, t, n, r) {
  if (e = e.options, t) {
    t = {};
    for (var l = 0; l < n.length; l++) t["$" + n[l]] = !0;
    for (n = 0; n < e.length; n++) l = t.hasOwnProperty("$" + e[n].value), e[n].selected !== l && (e[n].selected = l), l && r && (e[n].defaultSelected = !0);
  } else {
    for (n = "" + yt(n), t = null, l = 0; l < e.length; l++) {
      if (e[l].value === n) {
        e[l].selected = !0, r && (e[l].defaultSelected = !0);
        return;
      }
      t !== null || e[l].disabled || (t = e[l]);
    }
    t !== null && (t.selected = !0);
  }
}
function yi(e, t) {
  if (t.dangerouslySetInnerHTML != null) throw Error(x(91));
  return U({}, t, { value: void 0, defaultValue: void 0, children: "" + e._wrapperState.initialValue });
}
function ss(e, t) {
  var n = t.value;
  if (n == null) {
    if (n = t.children, t = t.defaultValue, n != null) {
      if (t != null) throw Error(x(92));
      if (Tn(n)) {
        if (1 < n.length) throw Error(x(93));
        n = n[0];
      }
      t = n;
    }
    t == null && (t = ""), n = t;
  }
  e._wrapperState = { initialValue: yt(n) };
}
function Ou(e, t) {
  var n = yt(t.value), r = yt(t.defaultValue);
  n != null && (n = "" + n, n !== e.value && (e.value = n), t.defaultValue == null && e.defaultValue !== n && (e.defaultValue = n)), r != null && (e.defaultValue = "" + r);
}
function us(e) {
  var t = e.textContent;
  t === e._wrapperState.initialValue && t !== "" && t !== null && (e.value = t);
}
function Iu(e) {
  switch (e) {
    case "svg":
      return "http://www.w3.org/2000/svg";
    case "math":
      return "http://www.w3.org/1998/Math/MathML";
    default:
      return "http://www.w3.org/1999/xhtml";
  }
}
function xi(e, t) {
  return e == null || e === "http://www.w3.org/1999/xhtml" ? Iu(t) : e === "http://www.w3.org/2000/svg" && t === "foreignObject" ? "http://www.w3.org/1999/xhtml" : e;
}
var vr, Fu = function(e) {
  return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction ? function(t, n, r, l) {
    MSApp.execUnsafeLocalFunction(function() {
      return e(t, n, r, l);
    });
  } : e;
}(function(e, t) {
  if (e.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in e) e.innerHTML = t;
  else {
    for (vr = vr || document.createElement("div"), vr.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>", t = vr.firstChild; e.firstChild; ) e.removeChild(e.firstChild);
    for (; t.firstChild; ) e.appendChild(t.firstChild);
  }
});
function Qn(e, t) {
  if (t) {
    var n = e.firstChild;
    if (n && n === e.lastChild && n.nodeType === 3) {
      n.nodeValue = t;
      return;
    }
  }
  e.textContent = t;
}
var On = {
  animationIterationCount: !0,
  aspectRatio: !0,
  borderImageOutset: !0,
  borderImageSlice: !0,
  borderImageWidth: !0,
  boxFlex: !0,
  boxFlexGroup: !0,
  boxOrdinalGroup: !0,
  columnCount: !0,
  columns: !0,
  flex: !0,
  flexGrow: !0,
  flexPositive: !0,
  flexShrink: !0,
  flexNegative: !0,
  flexOrder: !0,
  gridArea: !0,
  gridRow: !0,
  gridRowEnd: !0,
  gridRowSpan: !0,
  gridRowStart: !0,
  gridColumn: !0,
  gridColumnEnd: !0,
  gridColumnSpan: !0,
  gridColumnStart: !0,
  fontWeight: !0,
  lineClamp: !0,
  lineHeight: !0,
  opacity: !0,
  order: !0,
  orphans: !0,
  tabSize: !0,
  widows: !0,
  zIndex: !0,
  zoom: !0,
  fillOpacity: !0,
  floodOpacity: !0,
  stopOpacity: !0,
  strokeDasharray: !0,
  strokeDashoffset: !0,
  strokeMiterlimit: !0,
  strokeOpacity: !0,
  strokeWidth: !0
}, sf = ["Webkit", "ms", "Moz", "O"];
Object.keys(On).forEach(function(e) {
  sf.forEach(function(t) {
    t = t + e.charAt(0).toUpperCase() + e.substring(1), On[t] = On[e];
  });
});
function $u(e, t, n) {
  return t == null || typeof t == "boolean" || t === "" ? "" : n || typeof t != "number" || t === 0 || On.hasOwnProperty(e) && On[e] ? ("" + t).trim() : t + "px";
}
function Au(e, t) {
  e = e.style;
  for (var n in t) if (t.hasOwnProperty(n)) {
    var r = n.indexOf("--") === 0, l = $u(n, t[n], r);
    n === "float" && (n = "cssFloat"), r ? e.setProperty(n, l) : e[n] = l;
  }
}
var uf = U({ menuitem: !0 }, { area: !0, base: !0, br: !0, col: !0, embed: !0, hr: !0, img: !0, input: !0, keygen: !0, link: !0, meta: !0, param: !0, source: !0, track: !0, wbr: !0 });
function ki(e, t) {
  if (t) {
    if (uf[e] && (t.children != null || t.dangerouslySetInnerHTML != null)) throw Error(x(137, e));
    if (t.dangerouslySetInnerHTML != null) {
      if (t.children != null) throw Error(x(60));
      if (typeof t.dangerouslySetInnerHTML != "object" || !("__html" in t.dangerouslySetInnerHTML)) throw Error(x(61));
    }
    if (t.style != null && typeof t.style != "object") throw Error(x(62));
  }
}
function wi(e, t) {
  if (e.indexOf("-") === -1) return typeof t.is == "string";
  switch (e) {
    case "annotation-xml":
    case "color-profile":
    case "font-face":
    case "font-face-src":
    case "font-face-uri":
    case "font-face-format":
    case "font-face-name":
    case "missing-glyph":
      return !1;
    default:
      return !0;
  }
}
var Si = null;
function ho(e) {
  return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
}
var Ei = null, tn = null, nn = null;
function as(e) {
  if (e = cr(e)) {
    if (typeof Ei != "function") throw Error(x(280));
    var t = e.stateNode;
    t && (t = yl(t), Ei(e.stateNode, e.type, t));
  }
}
function Bu(e) {
  tn ? nn ? nn.push(e) : nn = [e] : tn = e;
}
function Uu() {
  if (tn) {
    var e = tn, t = nn;
    if (nn = tn = null, as(e), t) for (e = 0; e < t.length; e++) as(t[e]);
  }
}
function Hu(e, t) {
  return e(t);
}
function Vu() {
}
var $l = !1;
function Wu(e, t, n) {
  if ($l) return e(t, n);
  $l = !0;
  try {
    return Hu(e, t, n);
  } finally {
    $l = !1, (tn !== null || nn !== null) && (Vu(), Uu());
  }
}
function Kn(e, t) {
  var n = e.stateNode;
  if (n === null) return null;
  var r = yl(n);
  if (r === null) return null;
  n = r[t];
  e: switch (t) {
    case "onClick":
    case "onClickCapture":
    case "onDoubleClick":
    case "onDoubleClickCapture":
    case "onMouseDown":
    case "onMouseDownCapture":
    case "onMouseMove":
    case "onMouseMoveCapture":
    case "onMouseUp":
    case "onMouseUpCapture":
    case "onMouseEnter":
      (r = !r.disabled) || (e = e.type, r = !(e === "button" || e === "input" || e === "select" || e === "textarea")), e = !r;
      break e;
    default:
      e = !1;
  }
  if (e) return null;
  if (n && typeof n != "function") throw Error(x(231, t, typeof n));
  return n;
}
var Ci = !1;
if (qe) try {
  var wn = {};
  Object.defineProperty(wn, "passive", { get: function() {
    Ci = !0;
  } }), window.addEventListener("test", wn, wn), window.removeEventListener("test", wn, wn);
} catch {
  Ci = !1;
}
function af(e, t, n, r, l, i, o, s, u) {
  var c = Array.prototype.slice.call(arguments, 3);
  try {
    t.apply(n, c);
  } catch (g) {
    this.onError(g);
  }
}
var In = !1, Wr = null, Qr = !1, Ni = null, cf = { onError: function(e) {
  In = !0, Wr = e;
} };
function ff(e, t, n, r, l, i, o, s, u) {
  In = !1, Wr = null, af.apply(cf, arguments);
}
function df(e, t, n, r, l, i, o, s, u) {
  if (ff.apply(this, arguments), In) {
    if (In) {
      var c = Wr;
      In = !1, Wr = null;
    } else throw Error(x(198));
    Qr || (Qr = !0, Ni = c);
  }
}
function $t(e) {
  var t = e, n = e;
  if (e.alternate) for (; t.return; ) t = t.return;
  else {
    e = t;
    do
      t = e, t.flags & 4098 && (n = t.return), e = t.return;
    while (e);
  }
  return t.tag === 3 ? n : null;
}
function Qu(e) {
  if (e.tag === 13) {
    var t = e.memoizedState;
    if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
  }
  return null;
}
function cs(e) {
  if ($t(e) !== e) throw Error(x(188));
}
function pf(e) {
  var t = e.alternate;
  if (!t) {
    if (t = $t(e), t === null) throw Error(x(188));
    return t !== e ? null : e;
  }
  for (var n = e, r = t; ; ) {
    var l = n.return;
    if (l === null) break;
    var i = l.alternate;
    if (i === null) {
      if (r = l.return, r !== null) {
        n = r;
        continue;
      }
      break;
    }
    if (l.child === i.child) {
      for (i = l.child; i; ) {
        if (i === n) return cs(l), e;
        if (i === r) return cs(l), t;
        i = i.sibling;
      }
      throw Error(x(188));
    }
    if (n.return !== r.return) n = l, r = i;
    else {
      for (var o = !1, s = l.child; s; ) {
        if (s === n) {
          o = !0, n = l, r = i;
          break;
        }
        if (s === r) {
          o = !0, r = l, n = i;
          break;
        }
        s = s.sibling;
      }
      if (!o) {
        for (s = i.child; s; ) {
          if (s === n) {
            o = !0, n = i, r = l;
            break;
          }
          if (s === r) {
            o = !0, r = i, n = l;
            break;
          }
          s = s.sibling;
        }
        if (!o) throw Error(x(189));
      }
    }
    if (n.alternate !== r) throw Error(x(190));
  }
  if (n.tag !== 3) throw Error(x(188));
  return n.stateNode.current === n ? e : t;
}
function Ku(e) {
  return e = pf(e), e !== null ? Yu(e) : null;
}
function Yu(e) {
  if (e.tag === 5 || e.tag === 6) return e;
  for (e = e.child; e !== null; ) {
    var t = Yu(e);
    if (t !== null) return t;
    e = e.sibling;
  }
  return null;
}
var Gu = we.unstable_scheduleCallback, fs = we.unstable_cancelCallback, hf = we.unstable_shouldYield, mf = we.unstable_requestPaint, Y = we.unstable_now, gf = we.unstable_getCurrentPriorityLevel, mo = we.unstable_ImmediatePriority, Xu = we.unstable_UserBlockingPriority, Kr = we.unstable_NormalPriority, vf = we.unstable_LowPriority, Zu = we.unstable_IdlePriority, hl = null, Ve = null;
function yf(e) {
  if (Ve && typeof Ve.onCommitFiberRoot == "function") try {
    Ve.onCommitFiberRoot(hl, e, void 0, (e.current.flags & 128) === 128);
  } catch {
  }
}
var Fe = Math.clz32 ? Math.clz32 : wf, xf = Math.log, kf = Math.LN2;
function wf(e) {
  return e >>>= 0, e === 0 ? 32 : 31 - (xf(e) / kf | 0) | 0;
}
var yr = 64, xr = 4194304;
function Ln(e) {
  switch (e & -e) {
    case 1:
      return 1;
    case 2:
      return 2;
    case 4:
      return 4;
    case 8:
      return 8;
    case 16:
      return 16;
    case 32:
      return 32;
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return e & 4194240;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return e & 130023424;
    case 134217728:
      return 134217728;
    case 268435456:
      return 268435456;
    case 536870912:
      return 536870912;
    case 1073741824:
      return 1073741824;
    default:
      return e;
  }
}
function Yr(e, t) {
  var n = e.pendingLanes;
  if (n === 0) return 0;
  var r = 0, l = e.suspendedLanes, i = e.pingedLanes, o = n & 268435455;
  if (o !== 0) {
    var s = o & ~l;
    s !== 0 ? r = Ln(s) : (i &= o, i !== 0 && (r = Ln(i)));
  } else o = n & ~l, o !== 0 ? r = Ln(o) : i !== 0 && (r = Ln(i));
  if (r === 0) return 0;
  if (t !== 0 && t !== r && !(t & l) && (l = r & -r, i = t & -t, l >= i || l === 16 && (i & 4194240) !== 0)) return t;
  if (r & 4 && (r |= n & 16), t = e.entangledLanes, t !== 0) for (e = e.entanglements, t &= r; 0 < t; ) n = 31 - Fe(t), l = 1 << n, r |= e[n], t &= ~l;
  return r;
}
function Sf(e, t) {
  switch (e) {
    case 1:
    case 2:
    case 4:
      return t + 250;
    case 8:
    case 16:
    case 32:
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return t + 5e3;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return -1;
    case 134217728:
    case 268435456:
    case 536870912:
    case 1073741824:
      return -1;
    default:
      return -1;
  }
}
function Ef(e, t) {
  for (var n = e.suspendedLanes, r = e.pingedLanes, l = e.expirationTimes, i = e.pendingLanes; 0 < i; ) {
    var o = 31 - Fe(i), s = 1 << o, u = l[o];
    u === -1 ? (!(s & n) || s & r) && (l[o] = Sf(s, t)) : u <= t && (e.expiredLanes |= s), i &= ~s;
  }
}
function _i(e) {
  return e = e.pendingLanes & -1073741825, e !== 0 ? e : e & 1073741824 ? 1073741824 : 0;
}
function Ju() {
  var e = yr;
  return yr <<= 1, !(yr & 4194240) && (yr = 64), e;
}
function Al(e) {
  for (var t = [], n = 0; 31 > n; n++) t.push(e);
  return t;
}
function ur(e, t, n) {
  e.pendingLanes |= t, t !== 536870912 && (e.suspendedLanes = 0, e.pingedLanes = 0), e = e.eventTimes, t = 31 - Fe(t), e[t] = n;
}
function Cf(e, t) {
  var n = e.pendingLanes & ~t;
  e.pendingLanes = t, e.suspendedLanes = 0, e.pingedLanes = 0, e.expiredLanes &= t, e.mutableReadLanes &= t, e.entangledLanes &= t, t = e.entanglements;
  var r = e.eventTimes;
  for (e = e.expirationTimes; 0 < n; ) {
    var l = 31 - Fe(n), i = 1 << l;
    t[l] = 0, r[l] = -1, e[l] = -1, n &= ~i;
  }
}
function go(e, t) {
  var n = e.entangledLanes |= t;
  for (e = e.entanglements; n; ) {
    var r = 31 - Fe(n), l = 1 << r;
    l & t | e[r] & t && (e[r] |= t), n &= ~l;
  }
}
var M = 0;
function qu(e) {
  return e &= -e, 1 < e ? 4 < e ? e & 268435455 ? 16 : 536870912 : 4 : 1;
}
var bu, vo, ea, ta, na, ji = !1, kr = [], ct = null, ft = null, dt = null, Yn = /* @__PURE__ */ new Map(), Gn = /* @__PURE__ */ new Map(), ot = [], Nf = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
function ds(e, t) {
  switch (e) {
    case "focusin":
    case "focusout":
      ct = null;
      break;
    case "dragenter":
    case "dragleave":
      ft = null;
      break;
    case "mouseover":
    case "mouseout":
      dt = null;
      break;
    case "pointerover":
    case "pointerout":
      Yn.delete(t.pointerId);
      break;
    case "gotpointercapture":
    case "lostpointercapture":
      Gn.delete(t.pointerId);
  }
}
function Sn(e, t, n, r, l, i) {
  return e === null || e.nativeEvent !== i ? (e = { blockedOn: t, domEventName: n, eventSystemFlags: r, nativeEvent: i, targetContainers: [l] }, t !== null && (t = cr(t), t !== null && vo(t)), e) : (e.eventSystemFlags |= r, t = e.targetContainers, l !== null && t.indexOf(l) === -1 && t.push(l), e);
}
function _f(e, t, n, r, l) {
  switch (t) {
    case "focusin":
      return ct = Sn(ct, e, t, n, r, l), !0;
    case "dragenter":
      return ft = Sn(ft, e, t, n, r, l), !0;
    case "mouseover":
      return dt = Sn(dt, e, t, n, r, l), !0;
    case "pointerover":
      var i = l.pointerId;
      return Yn.set(i, Sn(Yn.get(i) || null, e, t, n, r, l)), !0;
    case "gotpointercapture":
      return i = l.pointerId, Gn.set(i, Sn(Gn.get(i) || null, e, t, n, r, l)), !0;
  }
  return !1;
}
function ra(e) {
  var t = jt(e.target);
  if (t !== null) {
    var n = $t(t);
    if (n !== null) {
      if (t = n.tag, t === 13) {
        if (t = Qu(n), t !== null) {
          e.blockedOn = t, na(e.priority, function() {
            ea(n);
          });
          return;
        }
      } else if (t === 3 && n.stateNode.current.memoizedState.isDehydrated) {
        e.blockedOn = n.tag === 3 ? n.stateNode.containerInfo : null;
        return;
      }
    }
  }
  e.blockedOn = null;
}
function Mr(e) {
  if (e.blockedOn !== null) return !1;
  for (var t = e.targetContainers; 0 < t.length; ) {
    var n = Pi(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
    if (n === null) {
      n = e.nativeEvent;
      var r = new n.constructor(n.type, n);
      Si = r, n.target.dispatchEvent(r), Si = null;
    } else return t = cr(n), t !== null && vo(t), e.blockedOn = n, !1;
    t.shift();
  }
  return !0;
}
function ps(e, t, n) {
  Mr(e) && n.delete(t);
}
function jf() {
  ji = !1, ct !== null && Mr(ct) && (ct = null), ft !== null && Mr(ft) && (ft = null), dt !== null && Mr(dt) && (dt = null), Yn.forEach(ps), Gn.forEach(ps);
}
function En(e, t) {
  e.blockedOn === t && (e.blockedOn = null, ji || (ji = !0, we.unstable_scheduleCallback(we.unstable_NormalPriority, jf)));
}
function Xn(e) {
  function t(l) {
    return En(l, e);
  }
  if (0 < kr.length) {
    En(kr[0], e);
    for (var n = 1; n < kr.length; n++) {
      var r = kr[n];
      r.blockedOn === e && (r.blockedOn = null);
    }
  }
  for (ct !== null && En(ct, e), ft !== null && En(ft, e), dt !== null && En(dt, e), Yn.forEach(t), Gn.forEach(t), n = 0; n < ot.length; n++) r = ot[n], r.blockedOn === e && (r.blockedOn = null);
  for (; 0 < ot.length && (n = ot[0], n.blockedOn === null); ) ra(n), n.blockedOn === null && ot.shift();
}
var rn = nt.ReactCurrentBatchConfig, Gr = !0;
function Pf(e, t, n, r) {
  var l = M, i = rn.transition;
  rn.transition = null;
  try {
    M = 1, yo(e, t, n, r);
  } finally {
    M = l, rn.transition = i;
  }
}
function zf(e, t, n, r) {
  var l = M, i = rn.transition;
  rn.transition = null;
  try {
    M = 4, yo(e, t, n, r);
  } finally {
    M = l, rn.transition = i;
  }
}
function yo(e, t, n, r) {
  if (Gr) {
    var l = Pi(e, t, n, r);
    if (l === null) Xl(e, t, r, Xr, n), ds(e, r);
    else if (_f(l, e, t, n, r)) r.stopPropagation();
    else if (ds(e, r), t & 4 && -1 < Nf.indexOf(e)) {
      for (; l !== null; ) {
        var i = cr(l);
        if (i !== null && bu(i), i = Pi(e, t, n, r), i === null && Xl(e, t, r, Xr, n), i === l) break;
        l = i;
      }
      l !== null && r.stopPropagation();
    } else Xl(e, t, r, null, n);
  }
}
var Xr = null;
function Pi(e, t, n, r) {
  if (Xr = null, e = ho(r), e = jt(e), e !== null) if (t = $t(e), t === null) e = null;
  else if (n = t.tag, n === 13) {
    if (e = Qu(t), e !== null) return e;
    e = null;
  } else if (n === 3) {
    if (t.stateNode.current.memoizedState.isDehydrated) return t.tag === 3 ? t.stateNode.containerInfo : null;
    e = null;
  } else t !== e && (e = null);
  return Xr = e, null;
}
function la(e) {
  switch (e) {
    case "cancel":
    case "click":
    case "close":
    case "contextmenu":
    case "copy":
    case "cut":
    case "auxclick":
    case "dblclick":
    case "dragend":
    case "dragstart":
    case "drop":
    case "focusin":
    case "focusout":
    case "input":
    case "invalid":
    case "keydown":
    case "keypress":
    case "keyup":
    case "mousedown":
    case "mouseup":
    case "paste":
    case "pause":
    case "play":
    case "pointercancel":
    case "pointerdown":
    case "pointerup":
    case "ratechange":
    case "reset":
    case "resize":
    case "seeked":
    case "submit":
    case "touchcancel":
    case "touchend":
    case "touchstart":
    case "volumechange":
    case "change":
    case "selectionchange":
    case "textInput":
    case "compositionstart":
    case "compositionend":
    case "compositionupdate":
    case "beforeblur":
    case "afterblur":
    case "beforeinput":
    case "blur":
    case "fullscreenchange":
    case "focus":
    case "hashchange":
    case "popstate":
    case "select":
    case "selectstart":
      return 1;
    case "drag":
    case "dragenter":
    case "dragexit":
    case "dragleave":
    case "dragover":
    case "mousemove":
    case "mouseout":
    case "mouseover":
    case "pointermove":
    case "pointerout":
    case "pointerover":
    case "scroll":
    case "toggle":
    case "touchmove":
    case "wheel":
    case "mouseenter":
    case "mouseleave":
    case "pointerenter":
    case "pointerleave":
      return 4;
    case "message":
      switch (gf()) {
        case mo:
          return 1;
        case Xu:
          return 4;
        case Kr:
        case vf:
          return 16;
        case Zu:
          return 536870912;
        default:
          return 16;
      }
    default:
      return 16;
  }
}
var ut = null, xo = null, Dr = null;
function ia() {
  if (Dr) return Dr;
  var e, t = xo, n = t.length, r, l = "value" in ut ? ut.value : ut.textContent, i = l.length;
  for (e = 0; e < n && t[e] === l[e]; e++) ;
  var o = n - e;
  for (r = 1; r <= o && t[n - r] === l[i - r]; r++) ;
  return Dr = l.slice(e, 1 < r ? 1 - r : void 0);
}
function Or(e) {
  var t = e.keyCode;
  return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
}
function wr() {
  return !0;
}
function hs() {
  return !1;
}
function Ee(e) {
  function t(n, r, l, i, o) {
    this._reactName = n, this._targetInst = l, this.type = r, this.nativeEvent = i, this.target = o, this.currentTarget = null;
    for (var s in e) e.hasOwnProperty(s) && (n = e[s], this[s] = n ? n(i) : i[s]);
    return this.isDefaultPrevented = (i.defaultPrevented != null ? i.defaultPrevented : i.returnValue === !1) ? wr : hs, this.isPropagationStopped = hs, this;
  }
  return U(t.prototype, { preventDefault: function() {
    this.defaultPrevented = !0;
    var n = this.nativeEvent;
    n && (n.preventDefault ? n.preventDefault() : typeof n.returnValue != "unknown" && (n.returnValue = !1), this.isDefaultPrevented = wr);
  }, stopPropagation: function() {
    var n = this.nativeEvent;
    n && (n.stopPropagation ? n.stopPropagation() : typeof n.cancelBubble != "unknown" && (n.cancelBubble = !0), this.isPropagationStopped = wr);
  }, persist: function() {
  }, isPersistent: wr }), t;
}
var gn = { eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function(e) {
  return e.timeStamp || Date.now();
}, defaultPrevented: 0, isTrusted: 0 }, ko = Ee(gn), ar = U({}, gn, { view: 0, detail: 0 }), Tf = Ee(ar), Bl, Ul, Cn, ml = U({}, ar, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: wo, button: 0, buttons: 0, relatedTarget: function(e) {
  return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
}, movementX: function(e) {
  return "movementX" in e ? e.movementX : (e !== Cn && (Cn && e.type === "mousemove" ? (Bl = e.screenX - Cn.screenX, Ul = e.screenY - Cn.screenY) : Ul = Bl = 0, Cn = e), Bl);
}, movementY: function(e) {
  return "movementY" in e ? e.movementY : Ul;
} }), ms = Ee(ml), Lf = U({}, ml, { dataTransfer: 0 }), Rf = Ee(Lf), Mf = U({}, ar, { relatedTarget: 0 }), Hl = Ee(Mf), Df = U({}, gn, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }), Of = Ee(Df), If = U({}, gn, { clipboardData: function(e) {
  return "clipboardData" in e ? e.clipboardData : window.clipboardData;
} }), Ff = Ee(If), $f = U({}, gn, { data: 0 }), gs = Ee($f), Af = {
  Esc: "Escape",
  Spacebar: " ",
  Left: "ArrowLeft",
  Up: "ArrowUp",
  Right: "ArrowRight",
  Down: "ArrowDown",
  Del: "Delete",
  Win: "OS",
  Menu: "ContextMenu",
  Apps: "ContextMenu",
  Scroll: "ScrollLock",
  MozPrintableKey: "Unidentified"
}, Bf = {
  8: "Backspace",
  9: "Tab",
  12: "Clear",
  13: "Enter",
  16: "Shift",
  17: "Control",
  18: "Alt",
  19: "Pause",
  20: "CapsLock",
  27: "Escape",
  32: " ",
  33: "PageUp",
  34: "PageDown",
  35: "End",
  36: "Home",
  37: "ArrowLeft",
  38: "ArrowUp",
  39: "ArrowRight",
  40: "ArrowDown",
  45: "Insert",
  46: "Delete",
  112: "F1",
  113: "F2",
  114: "F3",
  115: "F4",
  116: "F5",
  117: "F6",
  118: "F7",
  119: "F8",
  120: "F9",
  121: "F10",
  122: "F11",
  123: "F12",
  144: "NumLock",
  145: "ScrollLock",
  224: "Meta"
}, Uf = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
function Hf(e) {
  var t = this.nativeEvent;
  return t.getModifierState ? t.getModifierState(e) : (e = Uf[e]) ? !!t[e] : !1;
}
function wo() {
  return Hf;
}
var Vf = U({}, ar, { key: function(e) {
  if (e.key) {
    var t = Af[e.key] || e.key;
    if (t !== "Unidentified") return t;
  }
  return e.type === "keypress" ? (e = Or(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? Bf[e.keyCode] || "Unidentified" : "";
}, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: wo, charCode: function(e) {
  return e.type === "keypress" ? Or(e) : 0;
}, keyCode: function(e) {
  return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
}, which: function(e) {
  return e.type === "keypress" ? Or(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
} }), Wf = Ee(Vf), Qf = U({}, ml, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 }), vs = Ee(Qf), Kf = U({}, ar, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: wo }), Yf = Ee(Kf), Gf = U({}, gn, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }), Xf = Ee(Gf), Zf = U({}, ml, {
  deltaX: function(e) {
    return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
  },
  deltaY: function(e) {
    return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
  },
  deltaZ: 0,
  deltaMode: 0
}), Jf = Ee(Zf), qf = [9, 13, 27, 32], So = qe && "CompositionEvent" in window, Fn = null;
qe && "documentMode" in document && (Fn = document.documentMode);
var bf = qe && "TextEvent" in window && !Fn, oa = qe && (!So || Fn && 8 < Fn && 11 >= Fn), ys = " ", xs = !1;
function sa(e, t) {
  switch (e) {
    case "keyup":
      return qf.indexOf(t.keyCode) !== -1;
    case "keydown":
      return t.keyCode !== 229;
    case "keypress":
    case "mousedown":
    case "focusout":
      return !0;
    default:
      return !1;
  }
}
function ua(e) {
  return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
}
var Wt = !1;
function ed(e, t) {
  switch (e) {
    case "compositionend":
      return ua(t);
    case "keypress":
      return t.which !== 32 ? null : (xs = !0, ys);
    case "textInput":
      return e = t.data, e === ys && xs ? null : e;
    default:
      return null;
  }
}
function td(e, t) {
  if (Wt) return e === "compositionend" || !So && sa(e, t) ? (e = ia(), Dr = xo = ut = null, Wt = !1, e) : null;
  switch (e) {
    case "paste":
      return null;
    case "keypress":
      if (!(t.ctrlKey || t.altKey || t.metaKey) || t.ctrlKey && t.altKey) {
        if (t.char && 1 < t.char.length) return t.char;
        if (t.which) return String.fromCharCode(t.which);
      }
      return null;
    case "compositionend":
      return oa && t.locale !== "ko" ? null : t.data;
    default:
      return null;
  }
}
var nd = { color: !0, date: !0, datetime: !0, "datetime-local": !0, email: !0, month: !0, number: !0, password: !0, range: !0, search: !0, tel: !0, text: !0, time: !0, url: !0, week: !0 };
function ks(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return t === "input" ? !!nd[e.type] : t === "textarea";
}
function aa(e, t, n, r) {
  Bu(r), t = Zr(t, "onChange"), 0 < t.length && (n = new ko("onChange", "change", null, n, r), e.push({ event: n, listeners: t }));
}
var $n = null, Zn = null;
function rd(e) {
  ka(e, 0);
}
function gl(e) {
  var t = Yt(e);
  if (Mu(t)) return e;
}
function ld(e, t) {
  if (e === "change") return t;
}
var ca = !1;
if (qe) {
  var Vl;
  if (qe) {
    var Wl = "oninput" in document;
    if (!Wl) {
      var ws = document.createElement("div");
      ws.setAttribute("oninput", "return;"), Wl = typeof ws.oninput == "function";
    }
    Vl = Wl;
  } else Vl = !1;
  ca = Vl && (!document.documentMode || 9 < document.documentMode);
}
function Ss() {
  $n && ($n.detachEvent("onpropertychange", fa), Zn = $n = null);
}
function fa(e) {
  if (e.propertyName === "value" && gl(Zn)) {
    var t = [];
    aa(t, Zn, e, ho(e)), Wu(rd, t);
  }
}
function id(e, t, n) {
  e === "focusin" ? (Ss(), $n = t, Zn = n, $n.attachEvent("onpropertychange", fa)) : e === "focusout" && Ss();
}
function od(e) {
  if (e === "selectionchange" || e === "keyup" || e === "keydown") return gl(Zn);
}
function sd(e, t) {
  if (e === "click") return gl(t);
}
function ud(e, t) {
  if (e === "input" || e === "change") return gl(t);
}
function ad(e, t) {
  return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
}
var Ae = typeof Object.is == "function" ? Object.is : ad;
function Jn(e, t) {
  if (Ae(e, t)) return !0;
  if (typeof e != "object" || e === null || typeof t != "object" || t === null) return !1;
  var n = Object.keys(e), r = Object.keys(t);
  if (n.length !== r.length) return !1;
  for (r = 0; r < n.length; r++) {
    var l = n[r];
    if (!ci.call(t, l) || !Ae(e[l], t[l])) return !1;
  }
  return !0;
}
function Es(e) {
  for (; e && e.firstChild; ) e = e.firstChild;
  return e;
}
function Cs(e, t) {
  var n = Es(e);
  e = 0;
  for (var r; n; ) {
    if (n.nodeType === 3) {
      if (r = e + n.textContent.length, e <= t && r >= t) return { node: n, offset: t - e };
      e = r;
    }
    e: {
      for (; n; ) {
        if (n.nextSibling) {
          n = n.nextSibling;
          break e;
        }
        n = n.parentNode;
      }
      n = void 0;
    }
    n = Es(n);
  }
}
function da(e, t) {
  return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? da(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
}
function pa() {
  for (var e = window, t = Vr(); t instanceof e.HTMLIFrameElement; ) {
    try {
      var n = typeof t.contentWindow.location.href == "string";
    } catch {
      n = !1;
    }
    if (n) e = t.contentWindow;
    else break;
    t = Vr(e.document);
  }
  return t;
}
function Eo(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
}
function cd(e) {
  var t = pa(), n = e.focusedElem, r = e.selectionRange;
  if (t !== n && n && n.ownerDocument && da(n.ownerDocument.documentElement, n)) {
    if (r !== null && Eo(n)) {
      if (t = r.start, e = r.end, e === void 0 && (e = t), "selectionStart" in n) n.selectionStart = t, n.selectionEnd = Math.min(e, n.value.length);
      else if (e = (t = n.ownerDocument || document) && t.defaultView || window, e.getSelection) {
        e = e.getSelection();
        var l = n.textContent.length, i = Math.min(r.start, l);
        r = r.end === void 0 ? i : Math.min(r.end, l), !e.extend && i > r && (l = r, r = i, i = l), l = Cs(n, i);
        var o = Cs(
          n,
          r
        );
        l && o && (e.rangeCount !== 1 || e.anchorNode !== l.node || e.anchorOffset !== l.offset || e.focusNode !== o.node || e.focusOffset !== o.offset) && (t = t.createRange(), t.setStart(l.node, l.offset), e.removeAllRanges(), i > r ? (e.addRange(t), e.extend(o.node, o.offset)) : (t.setEnd(o.node, o.offset), e.addRange(t)));
      }
    }
    for (t = [], e = n; e = e.parentNode; ) e.nodeType === 1 && t.push({ element: e, left: e.scrollLeft, top: e.scrollTop });
    for (typeof n.focus == "function" && n.focus(), n = 0; n < t.length; n++) e = t[n], e.element.scrollLeft = e.left, e.element.scrollTop = e.top;
  }
}
var fd = qe && "documentMode" in document && 11 >= document.documentMode, Qt = null, zi = null, An = null, Ti = !1;
function Ns(e, t, n) {
  var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
  Ti || Qt == null || Qt !== Vr(r) || (r = Qt, "selectionStart" in r && Eo(r) ? r = { start: r.selectionStart, end: r.selectionEnd } : (r = (r.ownerDocument && r.ownerDocument.defaultView || window).getSelection(), r = { anchorNode: r.anchorNode, anchorOffset: r.anchorOffset, focusNode: r.focusNode, focusOffset: r.focusOffset }), An && Jn(An, r) || (An = r, r = Zr(zi, "onSelect"), 0 < r.length && (t = new ko("onSelect", "select", null, t, n), e.push({ event: t, listeners: r }), t.target = Qt)));
}
function Sr(e, t) {
  var n = {};
  return n[e.toLowerCase()] = t.toLowerCase(), n["Webkit" + e] = "webkit" + t, n["Moz" + e] = "moz" + t, n;
}
var Kt = { animationend: Sr("Animation", "AnimationEnd"), animationiteration: Sr("Animation", "AnimationIteration"), animationstart: Sr("Animation", "AnimationStart"), transitionend: Sr("Transition", "TransitionEnd") }, Ql = {}, ha = {};
qe && (ha = document.createElement("div").style, "AnimationEvent" in window || (delete Kt.animationend.animation, delete Kt.animationiteration.animation, delete Kt.animationstart.animation), "TransitionEvent" in window || delete Kt.transitionend.transition);
function vl(e) {
  if (Ql[e]) return Ql[e];
  if (!Kt[e]) return e;
  var t = Kt[e], n;
  for (n in t) if (t.hasOwnProperty(n) && n in ha) return Ql[e] = t[n];
  return e;
}
var ma = vl("animationend"), ga = vl("animationiteration"), va = vl("animationstart"), ya = vl("transitionend"), xa = /* @__PURE__ */ new Map(), _s = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
function kt(e, t) {
  xa.set(e, t), Ft(t, [e]);
}
for (var Kl = 0; Kl < _s.length; Kl++) {
  var Yl = _s[Kl], dd = Yl.toLowerCase(), pd = Yl[0].toUpperCase() + Yl.slice(1);
  kt(dd, "on" + pd);
}
kt(ma, "onAnimationEnd");
kt(ga, "onAnimationIteration");
kt(va, "onAnimationStart");
kt("dblclick", "onDoubleClick");
kt("focusin", "onFocus");
kt("focusout", "onBlur");
kt(ya, "onTransitionEnd");
sn("onMouseEnter", ["mouseout", "mouseover"]);
sn("onMouseLeave", ["mouseout", "mouseover"]);
sn("onPointerEnter", ["pointerout", "pointerover"]);
sn("onPointerLeave", ["pointerout", "pointerover"]);
Ft("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" "));
Ft("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));
Ft("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
Ft("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" "));
Ft("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" "));
Ft("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
var Rn = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), hd = new Set("cancel close invalid load scroll toggle".split(" ").concat(Rn));
function js(e, t, n) {
  var r = e.type || "unknown-event";
  e.currentTarget = n, df(r, t, void 0, e), e.currentTarget = null;
}
function ka(e, t) {
  t = (t & 4) !== 0;
  for (var n = 0; n < e.length; n++) {
    var r = e[n], l = r.event;
    r = r.listeners;
    e: {
      var i = void 0;
      if (t) for (var o = r.length - 1; 0 <= o; o--) {
        var s = r[o], u = s.instance, c = s.currentTarget;
        if (s = s.listener, u !== i && l.isPropagationStopped()) break e;
        js(l, s, c), i = u;
      }
      else for (o = 0; o < r.length; o++) {
        if (s = r[o], u = s.instance, c = s.currentTarget, s = s.listener, u !== i && l.isPropagationStopped()) break e;
        js(l, s, c), i = u;
      }
    }
  }
  if (Qr) throw e = Ni, Qr = !1, Ni = null, e;
}
function I(e, t) {
  var n = t[Oi];
  n === void 0 && (n = t[Oi] = /* @__PURE__ */ new Set());
  var r = e + "__bubble";
  n.has(r) || (wa(t, e, 2, !1), n.add(r));
}
function Gl(e, t, n) {
  var r = 0;
  t && (r |= 4), wa(n, e, r, t);
}
var Er = "_reactListening" + Math.random().toString(36).slice(2);
function qn(e) {
  if (!e[Er]) {
    e[Er] = !0, Pu.forEach(function(n) {
      n !== "selectionchange" && (hd.has(n) || Gl(n, !1, e), Gl(n, !0, e));
    });
    var t = e.nodeType === 9 ? e : e.ownerDocument;
    t === null || t[Er] || (t[Er] = !0, Gl("selectionchange", !1, t));
  }
}
function wa(e, t, n, r) {
  switch (la(t)) {
    case 1:
      var l = Pf;
      break;
    case 4:
      l = zf;
      break;
    default:
      l = yo;
  }
  n = l.bind(null, t, n, e), l = void 0, !Ci || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (l = !0), r ? l !== void 0 ? e.addEventListener(t, n, { capture: !0, passive: l }) : e.addEventListener(t, n, !0) : l !== void 0 ? e.addEventListener(t, n, { passive: l }) : e.addEventListener(t, n, !1);
}
function Xl(e, t, n, r, l) {
  var i = r;
  if (!(t & 1) && !(t & 2) && r !== null) e: for (; ; ) {
    if (r === null) return;
    var o = r.tag;
    if (o === 3 || o === 4) {
      var s = r.stateNode.containerInfo;
      if (s === l || s.nodeType === 8 && s.parentNode === l) break;
      if (o === 4) for (o = r.return; o !== null; ) {
        var u = o.tag;
        if ((u === 3 || u === 4) && (u = o.stateNode.containerInfo, u === l || u.nodeType === 8 && u.parentNode === l)) return;
        o = o.return;
      }
      for (; s !== null; ) {
        if (o = jt(s), o === null) return;
        if (u = o.tag, u === 5 || u === 6) {
          r = i = o;
          continue e;
        }
        s = s.parentNode;
      }
    }
    r = r.return;
  }
  Wu(function() {
    var c = i, g = ho(n), m = [];
    e: {
      var h = xa.get(e);
      if (h !== void 0) {
        var v = ko, w = e;
        switch (e) {
          case "keypress":
            if (Or(n) === 0) break e;
          case "keydown":
          case "keyup":
            v = Wf;
            break;
          case "focusin":
            w = "focus", v = Hl;
            break;
          case "focusout":
            w = "blur", v = Hl;
            break;
          case "beforeblur":
          case "afterblur":
            v = Hl;
            break;
          case "click":
            if (n.button === 2) break e;
          case "auxclick":
          case "dblclick":
          case "mousedown":
          case "mousemove":
          case "mouseup":
          case "mouseout":
          case "mouseover":
          case "contextmenu":
            v = ms;
            break;
          case "drag":
          case "dragend":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "dragstart":
          case "drop":
            v = Rf;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            v = Yf;
            break;
          case ma:
          case ga:
          case va:
            v = Of;
            break;
          case ya:
            v = Xf;
            break;
          case "scroll":
            v = Tf;
            break;
          case "wheel":
            v = Jf;
            break;
          case "copy":
          case "cut":
          case "paste":
            v = Ff;
            break;
          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
          case "pointerdown":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "pointerup":
            v = vs;
        }
        var k = (t & 4) !== 0, D = !k && e === "scroll", f = k ? h !== null ? h + "Capture" : null : h;
        k = [];
        for (var a = c, d; a !== null; ) {
          d = a;
          var y = d.stateNode;
          if (d.tag === 5 && y !== null && (d = y, f !== null && (y = Kn(a, f), y != null && k.push(bn(a, y, d)))), D) break;
          a = a.return;
        }
        0 < k.length && (h = new v(h, w, null, n, g), m.push({ event: h, listeners: k }));
      }
    }
    if (!(t & 7)) {
      e: {
        if (h = e === "mouseover" || e === "pointerover", v = e === "mouseout" || e === "pointerout", h && n !== Si && (w = n.relatedTarget || n.fromElement) && (jt(w) || w[be])) break e;
        if ((v || h) && (h = g.window === g ? g : (h = g.ownerDocument) ? h.defaultView || h.parentWindow : window, v ? (w = n.relatedTarget || n.toElement, v = c, w = w ? jt(w) : null, w !== null && (D = $t(w), w !== D || w.tag !== 5 && w.tag !== 6) && (w = null)) : (v = null, w = c), v !== w)) {
          if (k = ms, y = "onMouseLeave", f = "onMouseEnter", a = "mouse", (e === "pointerout" || e === "pointerover") && (k = vs, y = "onPointerLeave", f = "onPointerEnter", a = "pointer"), D = v == null ? h : Yt(v), d = w == null ? h : Yt(w), h = new k(y, a + "leave", v, n, g), h.target = D, h.relatedTarget = d, y = null, jt(g) === c && (k = new k(f, a + "enter", w, n, g), k.target = d, k.relatedTarget = D, y = k), D = y, v && w) t: {
            for (k = v, f = w, a = 0, d = k; d; d = At(d)) a++;
            for (d = 0, y = f; y; y = At(y)) d++;
            for (; 0 < a - d; ) k = At(k), a--;
            for (; 0 < d - a; ) f = At(f), d--;
            for (; a--; ) {
              if (k === f || f !== null && k === f.alternate) break t;
              k = At(k), f = At(f);
            }
            k = null;
          }
          else k = null;
          v !== null && Ps(m, h, v, k, !1), w !== null && D !== null && Ps(m, D, w, k, !0);
        }
      }
      e: {
        if (h = c ? Yt(c) : window, v = h.nodeName && h.nodeName.toLowerCase(), v === "select" || v === "input" && h.type === "file") var E = ld;
        else if (ks(h)) if (ca) E = ud;
        else {
          E = od;
          var N = id;
        }
        else (v = h.nodeName) && v.toLowerCase() === "input" && (h.type === "checkbox" || h.type === "radio") && (E = sd);
        if (E && (E = E(e, c))) {
          aa(m, E, n, g);
          break e;
        }
        N && N(e, h, c), e === "focusout" && (N = h._wrapperState) && N.controlled && h.type === "number" && vi(h, "number", h.value);
      }
      switch (N = c ? Yt(c) : window, e) {
        case "focusin":
          (ks(N) || N.contentEditable === "true") && (Qt = N, zi = c, An = null);
          break;
        case "focusout":
          An = zi = Qt = null;
          break;
        case "mousedown":
          Ti = !0;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          Ti = !1, Ns(m, n, g);
          break;
        case "selectionchange":
          if (fd) break;
        case "keydown":
        case "keyup":
          Ns(m, n, g);
      }
      var _;
      if (So) e: {
        switch (e) {
          case "compositionstart":
            var j = "onCompositionStart";
            break e;
          case "compositionend":
            j = "onCompositionEnd";
            break e;
          case "compositionupdate":
            j = "onCompositionUpdate";
            break e;
        }
        j = void 0;
      }
      else Wt ? sa(e, n) && (j = "onCompositionEnd") : e === "keydown" && n.keyCode === 229 && (j = "onCompositionStart");
      j && (oa && n.locale !== "ko" && (Wt || j !== "onCompositionStart" ? j === "onCompositionEnd" && Wt && (_ = ia()) : (ut = g, xo = "value" in ut ? ut.value : ut.textContent, Wt = !0)), N = Zr(c, j), 0 < N.length && (j = new gs(j, e, null, n, g), m.push({ event: j, listeners: N }), _ ? j.data = _ : (_ = ua(n), _ !== null && (j.data = _)))), (_ = bf ? ed(e, n) : td(e, n)) && (c = Zr(c, "onBeforeInput"), 0 < c.length && (g = new gs("onBeforeInput", "beforeinput", null, n, g), m.push({ event: g, listeners: c }), g.data = _));
    }
    ka(m, t);
  });
}
function bn(e, t, n) {
  return { instance: e, listener: t, currentTarget: n };
}
function Zr(e, t) {
  for (var n = t + "Capture", r = []; e !== null; ) {
    var l = e, i = l.stateNode;
    l.tag === 5 && i !== null && (l = i, i = Kn(e, n), i != null && r.unshift(bn(e, i, l)), i = Kn(e, t), i != null && r.push(bn(e, i, l))), e = e.return;
  }
  return r;
}
function At(e) {
  if (e === null) return null;
  do
    e = e.return;
  while (e && e.tag !== 5);
  return e || null;
}
function Ps(e, t, n, r, l) {
  for (var i = t._reactName, o = []; n !== null && n !== r; ) {
    var s = n, u = s.alternate, c = s.stateNode;
    if (u !== null && u === r) break;
    s.tag === 5 && c !== null && (s = c, l ? (u = Kn(n, i), u != null && o.unshift(bn(n, u, s))) : l || (u = Kn(n, i), u != null && o.push(bn(n, u, s)))), n = n.return;
  }
  o.length !== 0 && e.push({ event: t, listeners: o });
}
var md = /\r\n?/g, gd = /\u0000|\uFFFD/g;
function zs(e) {
  return (typeof e == "string" ? e : "" + e).replace(md, `
`).replace(gd, "");
}
function Cr(e, t, n) {
  if (t = zs(t), zs(e) !== t && n) throw Error(x(425));
}
function Jr() {
}
var Li = null, Ri = null;
function Mi(e, t) {
  return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
}
var Di = typeof setTimeout == "function" ? setTimeout : void 0, vd = typeof clearTimeout == "function" ? clearTimeout : void 0, Ts = typeof Promise == "function" ? Promise : void 0, yd = typeof queueMicrotask == "function" ? queueMicrotask : typeof Ts < "u" ? function(e) {
  return Ts.resolve(null).then(e).catch(xd);
} : Di;
function xd(e) {
  setTimeout(function() {
    throw e;
  });
}
function Zl(e, t) {
  var n = t, r = 0;
  do {
    var l = n.nextSibling;
    if (e.removeChild(n), l && l.nodeType === 8) if (n = l.data, n === "/$") {
      if (r === 0) {
        e.removeChild(l), Xn(t);
        return;
      }
      r--;
    } else n !== "$" && n !== "$?" && n !== "$!" || r++;
    n = l;
  } while (n);
  Xn(t);
}
function pt(e) {
  for (; e != null; e = e.nextSibling) {
    var t = e.nodeType;
    if (t === 1 || t === 3) break;
    if (t === 8) {
      if (t = e.data, t === "$" || t === "$!" || t === "$?") break;
      if (t === "/$") return null;
    }
  }
  return e;
}
function Ls(e) {
  e = e.previousSibling;
  for (var t = 0; e; ) {
    if (e.nodeType === 8) {
      var n = e.data;
      if (n === "$" || n === "$!" || n === "$?") {
        if (t === 0) return e;
        t--;
      } else n === "/$" && t++;
    }
    e = e.previousSibling;
  }
  return null;
}
var vn = Math.random().toString(36).slice(2), He = "__reactFiber$" + vn, er = "__reactProps$" + vn, be = "__reactContainer$" + vn, Oi = "__reactEvents$" + vn, kd = "__reactListeners$" + vn, wd = "__reactHandles$" + vn;
function jt(e) {
  var t = e[He];
  if (t) return t;
  for (var n = e.parentNode; n; ) {
    if (t = n[be] || n[He]) {
      if (n = t.alternate, t.child !== null || n !== null && n.child !== null) for (e = Ls(e); e !== null; ) {
        if (n = e[He]) return n;
        e = Ls(e);
      }
      return t;
    }
    e = n, n = e.parentNode;
  }
  return null;
}
function cr(e) {
  return e = e[He] || e[be], !e || e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3 ? null : e;
}
function Yt(e) {
  if (e.tag === 5 || e.tag === 6) return e.stateNode;
  throw Error(x(33));
}
function yl(e) {
  return e[er] || null;
}
var Ii = [], Gt = -1;
function wt(e) {
  return { current: e };
}
function F(e) {
  0 > Gt || (e.current = Ii[Gt], Ii[Gt] = null, Gt--);
}
function O(e, t) {
  Gt++, Ii[Gt] = e.current, e.current = t;
}
var xt = {}, ue = wt(xt), me = wt(!1), Rt = xt;
function un(e, t) {
  var n = e.type.contextTypes;
  if (!n) return xt;
  var r = e.stateNode;
  if (r && r.__reactInternalMemoizedUnmaskedChildContext === t) return r.__reactInternalMemoizedMaskedChildContext;
  var l = {}, i;
  for (i in n) l[i] = t[i];
  return r && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = t, e.__reactInternalMemoizedMaskedChildContext = l), l;
}
function ge(e) {
  return e = e.childContextTypes, e != null;
}
function qr() {
  F(me), F(ue);
}
function Rs(e, t, n) {
  if (ue.current !== xt) throw Error(x(168));
  O(ue, t), O(me, n);
}
function Sa(e, t, n) {
  var r = e.stateNode;
  if (t = t.childContextTypes, typeof r.getChildContext != "function") return n;
  r = r.getChildContext();
  for (var l in r) if (!(l in t)) throw Error(x(108, lf(e) || "Unknown", l));
  return U({}, n, r);
}
function br(e) {
  return e = (e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext || xt, Rt = ue.current, O(ue, e), O(me, me.current), !0;
}
function Ms(e, t, n) {
  var r = e.stateNode;
  if (!r) throw Error(x(169));
  n ? (e = Sa(e, t, Rt), r.__reactInternalMemoizedMergedChildContext = e, F(me), F(ue), O(ue, e)) : F(me), O(me, n);
}
var Ke = null, xl = !1, Jl = !1;
function Ea(e) {
  Ke === null ? Ke = [e] : Ke.push(e);
}
function Sd(e) {
  xl = !0, Ea(e);
}
function St() {
  if (!Jl && Ke !== null) {
    Jl = !0;
    var e = 0, t = M;
    try {
      var n = Ke;
      for (M = 1; e < n.length; e++) {
        var r = n[e];
        do
          r = r(!0);
        while (r !== null);
      }
      Ke = null, xl = !1;
    } catch (l) {
      throw Ke !== null && (Ke = Ke.slice(e + 1)), Gu(mo, St), l;
    } finally {
      M = t, Jl = !1;
    }
  }
  return null;
}
var Xt = [], Zt = 0, el = null, tl = 0, _e = [], je = 0, Mt = null, Ge = 1, Xe = "";
function Nt(e, t) {
  Xt[Zt++] = tl, Xt[Zt++] = el, el = e, tl = t;
}
function Ca(e, t, n) {
  _e[je++] = Ge, _e[je++] = Xe, _e[je++] = Mt, Mt = e;
  var r = Ge;
  e = Xe;
  var l = 32 - Fe(r) - 1;
  r &= ~(1 << l), n += 1;
  var i = 32 - Fe(t) + l;
  if (30 < i) {
    var o = l - l % 5;
    i = (r & (1 << o) - 1).toString(32), r >>= o, l -= o, Ge = 1 << 32 - Fe(t) + l | n << l | r, Xe = i + e;
  } else Ge = 1 << i | n << l | r, Xe = e;
}
function Co(e) {
  e.return !== null && (Nt(e, 1), Ca(e, 1, 0));
}
function No(e) {
  for (; e === el; ) el = Xt[--Zt], Xt[Zt] = null, tl = Xt[--Zt], Xt[Zt] = null;
  for (; e === Mt; ) Mt = _e[--je], _e[je] = null, Xe = _e[--je], _e[je] = null, Ge = _e[--je], _e[je] = null;
}
var ke = null, xe = null, $ = !1, Ie = null;
function Na(e, t) {
  var n = Pe(5, null, null, 0);
  n.elementType = "DELETED", n.stateNode = t, n.return = e, t = e.deletions, t === null ? (e.deletions = [n], e.flags |= 16) : t.push(n);
}
function Ds(e, t) {
  switch (e.tag) {
    case 5:
      var n = e.type;
      return t = t.nodeType !== 1 || n.toLowerCase() !== t.nodeName.toLowerCase() ? null : t, t !== null ? (e.stateNode = t, ke = e, xe = pt(t.firstChild), !0) : !1;
    case 6:
      return t = e.pendingProps === "" || t.nodeType !== 3 ? null : t, t !== null ? (e.stateNode = t, ke = e, xe = null, !0) : !1;
    case 13:
      return t = t.nodeType !== 8 ? null : t, t !== null ? (n = Mt !== null ? { id: Ge, overflow: Xe } : null, e.memoizedState = { dehydrated: t, treeContext: n, retryLane: 1073741824 }, n = Pe(18, null, null, 0), n.stateNode = t, n.return = e, e.child = n, ke = e, xe = null, !0) : !1;
    default:
      return !1;
  }
}
function Fi(e) {
  return (e.mode & 1) !== 0 && (e.flags & 128) === 0;
}
function $i(e) {
  if ($) {
    var t = xe;
    if (t) {
      var n = t;
      if (!Ds(e, t)) {
        if (Fi(e)) throw Error(x(418));
        t = pt(n.nextSibling);
        var r = ke;
        t && Ds(e, t) ? Na(r, n) : (e.flags = e.flags & -4097 | 2, $ = !1, ke = e);
      }
    } else {
      if (Fi(e)) throw Error(x(418));
      e.flags = e.flags & -4097 | 2, $ = !1, ke = e;
    }
  }
}
function Os(e) {
  for (e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13; ) e = e.return;
  ke = e;
}
function Nr(e) {
  if (e !== ke) return !1;
  if (!$) return Os(e), $ = !0, !1;
  var t;
  if ((t = e.tag !== 3) && !(t = e.tag !== 5) && (t = e.type, t = t !== "head" && t !== "body" && !Mi(e.type, e.memoizedProps)), t && (t = xe)) {
    if (Fi(e)) throw _a(), Error(x(418));
    for (; t; ) Na(e, t), t = pt(t.nextSibling);
  }
  if (Os(e), e.tag === 13) {
    if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(x(317));
    e: {
      for (e = e.nextSibling, t = 0; e; ) {
        if (e.nodeType === 8) {
          var n = e.data;
          if (n === "/$") {
            if (t === 0) {
              xe = pt(e.nextSibling);
              break e;
            }
            t--;
          } else n !== "$" && n !== "$!" && n !== "$?" || t++;
        }
        e = e.nextSibling;
      }
      xe = null;
    }
  } else xe = ke ? pt(e.stateNode.nextSibling) : null;
  return !0;
}
function _a() {
  for (var e = xe; e; ) e = pt(e.nextSibling);
}
function an() {
  xe = ke = null, $ = !1;
}
function _o(e) {
  Ie === null ? Ie = [e] : Ie.push(e);
}
var Ed = nt.ReactCurrentBatchConfig;
function Nn(e, t, n) {
  if (e = n.ref, e !== null && typeof e != "function" && typeof e != "object") {
    if (n._owner) {
      if (n = n._owner, n) {
        if (n.tag !== 1) throw Error(x(309));
        var r = n.stateNode;
      }
      if (!r) throw Error(x(147, e));
      var l = r, i = "" + e;
      return t !== null && t.ref !== null && typeof t.ref == "function" && t.ref._stringRef === i ? t.ref : (t = function(o) {
        var s = l.refs;
        o === null ? delete s[i] : s[i] = o;
      }, t._stringRef = i, t);
    }
    if (typeof e != "string") throw Error(x(284));
    if (!n._owner) throw Error(x(290, e));
  }
  return e;
}
function _r(e, t) {
  throw e = Object.prototype.toString.call(t), Error(x(31, e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e));
}
function Is(e) {
  var t = e._init;
  return t(e._payload);
}
function ja(e) {
  function t(f, a) {
    if (e) {
      var d = f.deletions;
      d === null ? (f.deletions = [a], f.flags |= 16) : d.push(a);
    }
  }
  function n(f, a) {
    if (!e) return null;
    for (; a !== null; ) t(f, a), a = a.sibling;
    return null;
  }
  function r(f, a) {
    for (f = /* @__PURE__ */ new Map(); a !== null; ) a.key !== null ? f.set(a.key, a) : f.set(a.index, a), a = a.sibling;
    return f;
  }
  function l(f, a) {
    return f = vt(f, a), f.index = 0, f.sibling = null, f;
  }
  function i(f, a, d) {
    return f.index = d, e ? (d = f.alternate, d !== null ? (d = d.index, d < a ? (f.flags |= 2, a) : d) : (f.flags |= 2, a)) : (f.flags |= 1048576, a);
  }
  function o(f) {
    return e && f.alternate === null && (f.flags |= 2), f;
  }
  function s(f, a, d, y) {
    return a === null || a.tag !== 6 ? (a = li(d, f.mode, y), a.return = f, a) : (a = l(a, d), a.return = f, a);
  }
  function u(f, a, d, y) {
    var E = d.type;
    return E === Vt ? g(f, a, d.props.children, y, d.key) : a !== null && (a.elementType === E || typeof E == "object" && E !== null && E.$$typeof === lt && Is(E) === a.type) ? (y = l(a, d.props), y.ref = Nn(f, a, d), y.return = f, y) : (y = Hr(d.type, d.key, d.props, null, f.mode, y), y.ref = Nn(f, a, d), y.return = f, y);
  }
  function c(f, a, d, y) {
    return a === null || a.tag !== 4 || a.stateNode.containerInfo !== d.containerInfo || a.stateNode.implementation !== d.implementation ? (a = ii(d, f.mode, y), a.return = f, a) : (a = l(a, d.children || []), a.return = f, a);
  }
  function g(f, a, d, y, E) {
    return a === null || a.tag !== 7 ? (a = Lt(d, f.mode, y, E), a.return = f, a) : (a = l(a, d), a.return = f, a);
  }
  function m(f, a, d) {
    if (typeof a == "string" && a !== "" || typeof a == "number") return a = li("" + a, f.mode, d), a.return = f, a;
    if (typeof a == "object" && a !== null) {
      switch (a.$$typeof) {
        case mr:
          return d = Hr(a.type, a.key, a.props, null, f.mode, d), d.ref = Nn(f, null, a), d.return = f, d;
        case Ht:
          return a = ii(a, f.mode, d), a.return = f, a;
        case lt:
          var y = a._init;
          return m(f, y(a._payload), d);
      }
      if (Tn(a) || kn(a)) return a = Lt(a, f.mode, d, null), a.return = f, a;
      _r(f, a);
    }
    return null;
  }
  function h(f, a, d, y) {
    var E = a !== null ? a.key : null;
    if (typeof d == "string" && d !== "" || typeof d == "number") return E !== null ? null : s(f, a, "" + d, y);
    if (typeof d == "object" && d !== null) {
      switch (d.$$typeof) {
        case mr:
          return d.key === E ? u(f, a, d, y) : null;
        case Ht:
          return d.key === E ? c(f, a, d, y) : null;
        case lt:
          return E = d._init, h(
            f,
            a,
            E(d._payload),
            y
          );
      }
      if (Tn(d) || kn(d)) return E !== null ? null : g(f, a, d, y, null);
      _r(f, d);
    }
    return null;
  }
  function v(f, a, d, y, E) {
    if (typeof y == "string" && y !== "" || typeof y == "number") return f = f.get(d) || null, s(a, f, "" + y, E);
    if (typeof y == "object" && y !== null) {
      switch (y.$$typeof) {
        case mr:
          return f = f.get(y.key === null ? d : y.key) || null, u(a, f, y, E);
        case Ht:
          return f = f.get(y.key === null ? d : y.key) || null, c(a, f, y, E);
        case lt:
          var N = y._init;
          return v(f, a, d, N(y._payload), E);
      }
      if (Tn(y) || kn(y)) return f = f.get(d) || null, g(a, f, y, E, null);
      _r(a, y);
    }
    return null;
  }
  function w(f, a, d, y) {
    for (var E = null, N = null, _ = a, j = a = 0, V = null; _ !== null && j < d.length; j++) {
      _.index > j ? (V = _, _ = null) : V = _.sibling;
      var L = h(f, _, d[j], y);
      if (L === null) {
        _ === null && (_ = V);
        break;
      }
      e && _ && L.alternate === null && t(f, _), a = i(L, a, j), N === null ? E = L : N.sibling = L, N = L, _ = V;
    }
    if (j === d.length) return n(f, _), $ && Nt(f, j), E;
    if (_ === null) {
      for (; j < d.length; j++) _ = m(f, d[j], y), _ !== null && (a = i(_, a, j), N === null ? E = _ : N.sibling = _, N = _);
      return $ && Nt(f, j), E;
    }
    for (_ = r(f, _); j < d.length; j++) V = v(_, f, j, d[j], y), V !== null && (e && V.alternate !== null && _.delete(V.key === null ? j : V.key), a = i(V, a, j), N === null ? E = V : N.sibling = V, N = V);
    return e && _.forEach(function(Re) {
      return t(f, Re);
    }), $ && Nt(f, j), E;
  }
  function k(f, a, d, y) {
    var E = kn(d);
    if (typeof E != "function") throw Error(x(150));
    if (d = E.call(d), d == null) throw Error(x(151));
    for (var N = E = null, _ = a, j = a = 0, V = null, L = d.next(); _ !== null && !L.done; j++, L = d.next()) {
      _.index > j ? (V = _, _ = null) : V = _.sibling;
      var Re = h(f, _, L.value, y);
      if (Re === null) {
        _ === null && (_ = V);
        break;
      }
      e && _ && Re.alternate === null && t(f, _), a = i(Re, a, j), N === null ? E = Re : N.sibling = Re, N = Re, _ = V;
    }
    if (L.done) return n(
      f,
      _
    ), $ && Nt(f, j), E;
    if (_ === null) {
      for (; !L.done; j++, L = d.next()) L = m(f, L.value, y), L !== null && (a = i(L, a, j), N === null ? E = L : N.sibling = L, N = L);
      return $ && Nt(f, j), E;
    }
    for (_ = r(f, _); !L.done; j++, L = d.next()) L = v(_, f, j, L.value, y), L !== null && (e && L.alternate !== null && _.delete(L.key === null ? j : L.key), a = i(L, a, j), N === null ? E = L : N.sibling = L, N = L);
    return e && _.forEach(function(yn) {
      return t(f, yn);
    }), $ && Nt(f, j), E;
  }
  function D(f, a, d, y) {
    if (typeof d == "object" && d !== null && d.type === Vt && d.key === null && (d = d.props.children), typeof d == "object" && d !== null) {
      switch (d.$$typeof) {
        case mr:
          e: {
            for (var E = d.key, N = a; N !== null; ) {
              if (N.key === E) {
                if (E = d.type, E === Vt) {
                  if (N.tag === 7) {
                    n(f, N.sibling), a = l(N, d.props.children), a.return = f, f = a;
                    break e;
                  }
                } else if (N.elementType === E || typeof E == "object" && E !== null && E.$$typeof === lt && Is(E) === N.type) {
                  n(f, N.sibling), a = l(N, d.props), a.ref = Nn(f, N, d), a.return = f, f = a;
                  break e;
                }
                n(f, N);
                break;
              } else t(f, N);
              N = N.sibling;
            }
            d.type === Vt ? (a = Lt(d.props.children, f.mode, y, d.key), a.return = f, f = a) : (y = Hr(d.type, d.key, d.props, null, f.mode, y), y.ref = Nn(f, a, d), y.return = f, f = y);
          }
          return o(f);
        case Ht:
          e: {
            for (N = d.key; a !== null; ) {
              if (a.key === N) if (a.tag === 4 && a.stateNode.containerInfo === d.containerInfo && a.stateNode.implementation === d.implementation) {
                n(f, a.sibling), a = l(a, d.children || []), a.return = f, f = a;
                break e;
              } else {
                n(f, a);
                break;
              }
              else t(f, a);
              a = a.sibling;
            }
            a = ii(d, f.mode, y), a.return = f, f = a;
          }
          return o(f);
        case lt:
          return N = d._init, D(f, a, N(d._payload), y);
      }
      if (Tn(d)) return w(f, a, d, y);
      if (kn(d)) return k(f, a, d, y);
      _r(f, d);
    }
    return typeof d == "string" && d !== "" || typeof d == "number" ? (d = "" + d, a !== null && a.tag === 6 ? (n(f, a.sibling), a = l(a, d), a.return = f, f = a) : (n(f, a), a = li(d, f.mode, y), a.return = f, f = a), o(f)) : n(f, a);
  }
  return D;
}
var cn = ja(!0), Pa = ja(!1), nl = wt(null), rl = null, Jt = null, jo = null;
function Po() {
  jo = Jt = rl = null;
}
function zo(e) {
  var t = nl.current;
  F(nl), e._currentValue = t;
}
function Ai(e, t, n) {
  for (; e !== null; ) {
    var r = e.alternate;
    if ((e.childLanes & t) !== t ? (e.childLanes |= t, r !== null && (r.childLanes |= t)) : r !== null && (r.childLanes & t) !== t && (r.childLanes |= t), e === n) break;
    e = e.return;
  }
}
function ln(e, t) {
  rl = e, jo = Jt = null, e = e.dependencies, e !== null && e.firstContext !== null && (e.lanes & t && (he = !0), e.firstContext = null);
}
function Te(e) {
  var t = e._currentValue;
  if (jo !== e) if (e = { context: e, memoizedValue: t, next: null }, Jt === null) {
    if (rl === null) throw Error(x(308));
    Jt = e, rl.dependencies = { lanes: 0, firstContext: e };
  } else Jt = Jt.next = e;
  return t;
}
var Pt = null;
function To(e) {
  Pt === null ? Pt = [e] : Pt.push(e);
}
function za(e, t, n, r) {
  var l = t.interleaved;
  return l === null ? (n.next = n, To(t)) : (n.next = l.next, l.next = n), t.interleaved = n, et(e, r);
}
function et(e, t) {
  e.lanes |= t;
  var n = e.alternate;
  for (n !== null && (n.lanes |= t), n = e, e = e.return; e !== null; ) e.childLanes |= t, n = e.alternate, n !== null && (n.childLanes |= t), n = e, e = e.return;
  return n.tag === 3 ? n.stateNode : null;
}
var it = !1;
function Lo(e) {
  e.updateQueue = { baseState: e.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null, interleaved: null, lanes: 0 }, effects: null };
}
function Ta(e, t) {
  e = e.updateQueue, t.updateQueue === e && (t.updateQueue = { baseState: e.baseState, firstBaseUpdate: e.firstBaseUpdate, lastBaseUpdate: e.lastBaseUpdate, shared: e.shared, effects: e.effects });
}
function Je(e, t) {
  return { eventTime: e, lane: t, tag: 0, payload: null, callback: null, next: null };
}
function ht(e, t, n) {
  var r = e.updateQueue;
  if (r === null) return null;
  if (r = r.shared, R & 2) {
    var l = r.pending;
    return l === null ? t.next = t : (t.next = l.next, l.next = t), r.pending = t, et(e, n);
  }
  return l = r.interleaved, l === null ? (t.next = t, To(r)) : (t.next = l.next, l.next = t), r.interleaved = t, et(e, n);
}
function Ir(e, t, n) {
  if (t = t.updateQueue, t !== null && (t = t.shared, (n & 4194240) !== 0)) {
    var r = t.lanes;
    r &= e.pendingLanes, n |= r, t.lanes = n, go(e, n);
  }
}
function Fs(e, t) {
  var n = e.updateQueue, r = e.alternate;
  if (r !== null && (r = r.updateQueue, n === r)) {
    var l = null, i = null;
    if (n = n.firstBaseUpdate, n !== null) {
      do {
        var o = { eventTime: n.eventTime, lane: n.lane, tag: n.tag, payload: n.payload, callback: n.callback, next: null };
        i === null ? l = i = o : i = i.next = o, n = n.next;
      } while (n !== null);
      i === null ? l = i = t : i = i.next = t;
    } else l = i = t;
    n = { baseState: r.baseState, firstBaseUpdate: l, lastBaseUpdate: i, shared: r.shared, effects: r.effects }, e.updateQueue = n;
    return;
  }
  e = n.lastBaseUpdate, e === null ? n.firstBaseUpdate = t : e.next = t, n.lastBaseUpdate = t;
}
function ll(e, t, n, r) {
  var l = e.updateQueue;
  it = !1;
  var i = l.firstBaseUpdate, o = l.lastBaseUpdate, s = l.shared.pending;
  if (s !== null) {
    l.shared.pending = null;
    var u = s, c = u.next;
    u.next = null, o === null ? i = c : o.next = c, o = u;
    var g = e.alternate;
    g !== null && (g = g.updateQueue, s = g.lastBaseUpdate, s !== o && (s === null ? g.firstBaseUpdate = c : s.next = c, g.lastBaseUpdate = u));
  }
  if (i !== null) {
    var m = l.baseState;
    o = 0, g = c = u = null, s = i;
    do {
      var h = s.lane, v = s.eventTime;
      if ((r & h) === h) {
        g !== null && (g = g.next = {
          eventTime: v,
          lane: 0,
          tag: s.tag,
          payload: s.payload,
          callback: s.callback,
          next: null
        });
        e: {
          var w = e, k = s;
          switch (h = t, v = n, k.tag) {
            case 1:
              if (w = k.payload, typeof w == "function") {
                m = w.call(v, m, h);
                break e;
              }
              m = w;
              break e;
            case 3:
              w.flags = w.flags & -65537 | 128;
            case 0:
              if (w = k.payload, h = typeof w == "function" ? w.call(v, m, h) : w, h == null) break e;
              m = U({}, m, h);
              break e;
            case 2:
              it = !0;
          }
        }
        s.callback !== null && s.lane !== 0 && (e.flags |= 64, h = l.effects, h === null ? l.effects = [s] : h.push(s));
      } else v = { eventTime: v, lane: h, tag: s.tag, payload: s.payload, callback: s.callback, next: null }, g === null ? (c = g = v, u = m) : g = g.next = v, o |= h;
      if (s = s.next, s === null) {
        if (s = l.shared.pending, s === null) break;
        h = s, s = h.next, h.next = null, l.lastBaseUpdate = h, l.shared.pending = null;
      }
    } while (!0);
    if (g === null && (u = m), l.baseState = u, l.firstBaseUpdate = c, l.lastBaseUpdate = g, t = l.shared.interleaved, t !== null) {
      l = t;
      do
        o |= l.lane, l = l.next;
      while (l !== t);
    } else i === null && (l.shared.lanes = 0);
    Ot |= o, e.lanes = o, e.memoizedState = m;
  }
}
function $s(e, t, n) {
  if (e = t.effects, t.effects = null, e !== null) for (t = 0; t < e.length; t++) {
    var r = e[t], l = r.callback;
    if (l !== null) {
      if (r.callback = null, r = n, typeof l != "function") throw Error(x(191, l));
      l.call(r);
    }
  }
}
var fr = {}, We = wt(fr), tr = wt(fr), nr = wt(fr);
function zt(e) {
  if (e === fr) throw Error(x(174));
  return e;
}
function Ro(e, t) {
  switch (O(nr, t), O(tr, e), O(We, fr), e = t.nodeType, e) {
    case 9:
    case 11:
      t = (t = t.documentElement) ? t.namespaceURI : xi(null, "");
      break;
    default:
      e = e === 8 ? t.parentNode : t, t = e.namespaceURI || null, e = e.tagName, t = xi(t, e);
  }
  F(We), O(We, t);
}
function fn() {
  F(We), F(tr), F(nr);
}
function La(e) {
  zt(nr.current);
  var t = zt(We.current), n = xi(t, e.type);
  t !== n && (O(tr, e), O(We, n));
}
function Mo(e) {
  tr.current === e && (F(We), F(tr));
}
var A = wt(0);
function il(e) {
  for (var t = e; t !== null; ) {
    if (t.tag === 13) {
      var n = t.memoizedState;
      if (n !== null && (n = n.dehydrated, n === null || n.data === "$?" || n.data === "$!")) return t;
    } else if (t.tag === 19 && t.memoizedProps.revealOrder !== void 0) {
      if (t.flags & 128) return t;
    } else if (t.child !== null) {
      t.child.return = t, t = t.child;
      continue;
    }
    if (t === e) break;
    for (; t.sibling === null; ) {
      if (t.return === null || t.return === e) return null;
      t = t.return;
    }
    t.sibling.return = t.return, t = t.sibling;
  }
  return null;
}
var ql = [];
function Do() {
  for (var e = 0; e < ql.length; e++) ql[e]._workInProgressVersionPrimary = null;
  ql.length = 0;
}
var Fr = nt.ReactCurrentDispatcher, bl = nt.ReactCurrentBatchConfig, Dt = 0, B = null, X = null, ee = null, ol = !1, Bn = !1, rr = 0, Cd = 0;
function ie() {
  throw Error(x(321));
}
function Oo(e, t) {
  if (t === null) return !1;
  for (var n = 0; n < t.length && n < e.length; n++) if (!Ae(e[n], t[n])) return !1;
  return !0;
}
function Io(e, t, n, r, l, i) {
  if (Dt = i, B = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, Fr.current = e === null || e.memoizedState === null ? Pd : zd, e = n(r, l), Bn) {
    i = 0;
    do {
      if (Bn = !1, rr = 0, 25 <= i) throw Error(x(301));
      i += 1, ee = X = null, t.updateQueue = null, Fr.current = Td, e = n(r, l);
    } while (Bn);
  }
  if (Fr.current = sl, t = X !== null && X.next !== null, Dt = 0, ee = X = B = null, ol = !1, t) throw Error(x(300));
  return e;
}
function Fo() {
  var e = rr !== 0;
  return rr = 0, e;
}
function Ue() {
  var e = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
  return ee === null ? B.memoizedState = ee = e : ee = ee.next = e, ee;
}
function Le() {
  if (X === null) {
    var e = B.alternate;
    e = e !== null ? e.memoizedState : null;
  } else e = X.next;
  var t = ee === null ? B.memoizedState : ee.next;
  if (t !== null) ee = t, X = e;
  else {
    if (e === null) throw Error(x(310));
    X = e, e = { memoizedState: X.memoizedState, baseState: X.baseState, baseQueue: X.baseQueue, queue: X.queue, next: null }, ee === null ? B.memoizedState = ee = e : ee = ee.next = e;
  }
  return ee;
}
function lr(e, t) {
  return typeof t == "function" ? t(e) : t;
}
function ei(e) {
  var t = Le(), n = t.queue;
  if (n === null) throw Error(x(311));
  n.lastRenderedReducer = e;
  var r = X, l = r.baseQueue, i = n.pending;
  if (i !== null) {
    if (l !== null) {
      var o = l.next;
      l.next = i.next, i.next = o;
    }
    r.baseQueue = l = i, n.pending = null;
  }
  if (l !== null) {
    i = l.next, r = r.baseState;
    var s = o = null, u = null, c = i;
    do {
      var g = c.lane;
      if ((Dt & g) === g) u !== null && (u = u.next = { lane: 0, action: c.action, hasEagerState: c.hasEagerState, eagerState: c.eagerState, next: null }), r = c.hasEagerState ? c.eagerState : e(r, c.action);
      else {
        var m = {
          lane: g,
          action: c.action,
          hasEagerState: c.hasEagerState,
          eagerState: c.eagerState,
          next: null
        };
        u === null ? (s = u = m, o = r) : u = u.next = m, B.lanes |= g, Ot |= g;
      }
      c = c.next;
    } while (c !== null && c !== i);
    u === null ? o = r : u.next = s, Ae(r, t.memoizedState) || (he = !0), t.memoizedState = r, t.baseState = o, t.baseQueue = u, n.lastRenderedState = r;
  }
  if (e = n.interleaved, e !== null) {
    l = e;
    do
      i = l.lane, B.lanes |= i, Ot |= i, l = l.next;
    while (l !== e);
  } else l === null && (n.lanes = 0);
  return [t.memoizedState, n.dispatch];
}
function ti(e) {
  var t = Le(), n = t.queue;
  if (n === null) throw Error(x(311));
  n.lastRenderedReducer = e;
  var r = n.dispatch, l = n.pending, i = t.memoizedState;
  if (l !== null) {
    n.pending = null;
    var o = l = l.next;
    do
      i = e(i, o.action), o = o.next;
    while (o !== l);
    Ae(i, t.memoizedState) || (he = !0), t.memoizedState = i, t.baseQueue === null && (t.baseState = i), n.lastRenderedState = i;
  }
  return [i, r];
}
function Ra() {
}
function Ma(e, t) {
  var n = B, r = Le(), l = t(), i = !Ae(r.memoizedState, l);
  if (i && (r.memoizedState = l, he = !0), r = r.queue, $o(Ia.bind(null, n, r, e), [e]), r.getSnapshot !== t || i || ee !== null && ee.memoizedState.tag & 1) {
    if (n.flags |= 2048, ir(9, Oa.bind(null, n, r, l, t), void 0, null), te === null) throw Error(x(349));
    Dt & 30 || Da(n, t, l);
  }
  return l;
}
function Da(e, t, n) {
  e.flags |= 16384, e = { getSnapshot: t, value: n }, t = B.updateQueue, t === null ? (t = { lastEffect: null, stores: null }, B.updateQueue = t, t.stores = [e]) : (n = t.stores, n === null ? t.stores = [e] : n.push(e));
}
function Oa(e, t, n, r) {
  t.value = n, t.getSnapshot = r, Fa(t) && $a(e);
}
function Ia(e, t, n) {
  return n(function() {
    Fa(t) && $a(e);
  });
}
function Fa(e) {
  var t = e.getSnapshot;
  e = e.value;
  try {
    var n = t();
    return !Ae(e, n);
  } catch {
    return !0;
  }
}
function $a(e) {
  var t = et(e, 1);
  t !== null && $e(t, e, 1, -1);
}
function As(e) {
  var t = Ue();
  return typeof e == "function" && (e = e()), t.memoizedState = t.baseState = e, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: lr, lastRenderedState: e }, t.queue = e, e = e.dispatch = jd.bind(null, B, e), [t.memoizedState, e];
}
function ir(e, t, n, r) {
  return e = { tag: e, create: t, destroy: n, deps: r, next: null }, t = B.updateQueue, t === null ? (t = { lastEffect: null, stores: null }, B.updateQueue = t, t.lastEffect = e.next = e) : (n = t.lastEffect, n === null ? t.lastEffect = e.next = e : (r = n.next, n.next = e, e.next = r, t.lastEffect = e)), e;
}
function Aa() {
  return Le().memoizedState;
}
function $r(e, t, n, r) {
  var l = Ue();
  B.flags |= e, l.memoizedState = ir(1 | t, n, void 0, r === void 0 ? null : r);
}
function kl(e, t, n, r) {
  var l = Le();
  r = r === void 0 ? null : r;
  var i = void 0;
  if (X !== null) {
    var o = X.memoizedState;
    if (i = o.destroy, r !== null && Oo(r, o.deps)) {
      l.memoizedState = ir(t, n, i, r);
      return;
    }
  }
  B.flags |= e, l.memoizedState = ir(1 | t, n, i, r);
}
function Bs(e, t) {
  return $r(8390656, 8, e, t);
}
function $o(e, t) {
  return kl(2048, 8, e, t);
}
function Ba(e, t) {
  return kl(4, 2, e, t);
}
function Ua(e, t) {
  return kl(4, 4, e, t);
}
function Ha(e, t) {
  if (typeof t == "function") return e = e(), t(e), function() {
    t(null);
  };
  if (t != null) return e = e(), t.current = e, function() {
    t.current = null;
  };
}
function Va(e, t, n) {
  return n = n != null ? n.concat([e]) : null, kl(4, 4, Ha.bind(null, t, e), n);
}
function Ao() {
}
function Wa(e, t) {
  var n = Le();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && Oo(t, r[1]) ? r[0] : (n.memoizedState = [e, t], e);
}
function Qa(e, t) {
  var n = Le();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && Oo(t, r[1]) ? r[0] : (e = e(), n.memoizedState = [e, t], e);
}
function Ka(e, t, n) {
  return Dt & 21 ? (Ae(n, t) || (n = Ju(), B.lanes |= n, Ot |= n, e.baseState = !0), t) : (e.baseState && (e.baseState = !1, he = !0), e.memoizedState = n);
}
function Nd(e, t) {
  var n = M;
  M = n !== 0 && 4 > n ? n : 4, e(!0);
  var r = bl.transition;
  bl.transition = {};
  try {
    e(!1), t();
  } finally {
    M = n, bl.transition = r;
  }
}
function Ya() {
  return Le().memoizedState;
}
function _d(e, t, n) {
  var r = gt(e);
  if (n = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null }, Ga(e)) Xa(t, n);
  else if (n = za(e, t, n, r), n !== null) {
    var l = ce();
    $e(n, e, r, l), Za(n, t, r);
  }
}
function jd(e, t, n) {
  var r = gt(e), l = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null };
  if (Ga(e)) Xa(t, l);
  else {
    var i = e.alternate;
    if (e.lanes === 0 && (i === null || i.lanes === 0) && (i = t.lastRenderedReducer, i !== null)) try {
      var o = t.lastRenderedState, s = i(o, n);
      if (l.hasEagerState = !0, l.eagerState = s, Ae(s, o)) {
        var u = t.interleaved;
        u === null ? (l.next = l, To(t)) : (l.next = u.next, u.next = l), t.interleaved = l;
        return;
      }
    } catch {
    } finally {
    }
    n = za(e, t, l, r), n !== null && (l = ce(), $e(n, e, r, l), Za(n, t, r));
  }
}
function Ga(e) {
  var t = e.alternate;
  return e === B || t !== null && t === B;
}
function Xa(e, t) {
  Bn = ol = !0;
  var n = e.pending;
  n === null ? t.next = t : (t.next = n.next, n.next = t), e.pending = t;
}
function Za(e, t, n) {
  if (n & 4194240) {
    var r = t.lanes;
    r &= e.pendingLanes, n |= r, t.lanes = n, go(e, n);
  }
}
var sl = { readContext: Te, useCallback: ie, useContext: ie, useEffect: ie, useImperativeHandle: ie, useInsertionEffect: ie, useLayoutEffect: ie, useMemo: ie, useReducer: ie, useRef: ie, useState: ie, useDebugValue: ie, useDeferredValue: ie, useTransition: ie, useMutableSource: ie, useSyncExternalStore: ie, useId: ie, unstable_isNewReconciler: !1 }, Pd = { readContext: Te, useCallback: function(e, t) {
  return Ue().memoizedState = [e, t === void 0 ? null : t], e;
}, useContext: Te, useEffect: Bs, useImperativeHandle: function(e, t, n) {
  return n = n != null ? n.concat([e]) : null, $r(
    4194308,
    4,
    Ha.bind(null, t, e),
    n
  );
}, useLayoutEffect: function(e, t) {
  return $r(4194308, 4, e, t);
}, useInsertionEffect: function(e, t) {
  return $r(4, 2, e, t);
}, useMemo: function(e, t) {
  var n = Ue();
  return t = t === void 0 ? null : t, e = e(), n.memoizedState = [e, t], e;
}, useReducer: function(e, t, n) {
  var r = Ue();
  return t = n !== void 0 ? n(t) : t, r.memoizedState = r.baseState = t, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: e, lastRenderedState: t }, r.queue = e, e = e.dispatch = _d.bind(null, B, e), [r.memoizedState, e];
}, useRef: function(e) {
  var t = Ue();
  return e = { current: e }, t.memoizedState = e;
}, useState: As, useDebugValue: Ao, useDeferredValue: function(e) {
  return Ue().memoizedState = e;
}, useTransition: function() {
  var e = As(!1), t = e[0];
  return e = Nd.bind(null, e[1]), Ue().memoizedState = e, [t, e];
}, useMutableSource: function() {
}, useSyncExternalStore: function(e, t, n) {
  var r = B, l = Ue();
  if ($) {
    if (n === void 0) throw Error(x(407));
    n = n();
  } else {
    if (n = t(), te === null) throw Error(x(349));
    Dt & 30 || Da(r, t, n);
  }
  l.memoizedState = n;
  var i = { value: n, getSnapshot: t };
  return l.queue = i, Bs(Ia.bind(
    null,
    r,
    i,
    e
  ), [e]), r.flags |= 2048, ir(9, Oa.bind(null, r, i, n, t), void 0, null), n;
}, useId: function() {
  var e = Ue(), t = te.identifierPrefix;
  if ($) {
    var n = Xe, r = Ge;
    n = (r & ~(1 << 32 - Fe(r) - 1)).toString(32) + n, t = ":" + t + "R" + n, n = rr++, 0 < n && (t += "H" + n.toString(32)), t += ":";
  } else n = Cd++, t = ":" + t + "r" + n.toString(32) + ":";
  return e.memoizedState = t;
}, unstable_isNewReconciler: !1 }, zd = {
  readContext: Te,
  useCallback: Wa,
  useContext: Te,
  useEffect: $o,
  useImperativeHandle: Va,
  useInsertionEffect: Ba,
  useLayoutEffect: Ua,
  useMemo: Qa,
  useReducer: ei,
  useRef: Aa,
  useState: function() {
    return ei(lr);
  },
  useDebugValue: Ao,
  useDeferredValue: function(e) {
    var t = Le();
    return Ka(t, X.memoizedState, e);
  },
  useTransition: function() {
    var e = ei(lr)[0], t = Le().memoizedState;
    return [e, t];
  },
  useMutableSource: Ra,
  useSyncExternalStore: Ma,
  useId: Ya,
  unstable_isNewReconciler: !1
}, Td = { readContext: Te, useCallback: Wa, useContext: Te, useEffect: $o, useImperativeHandle: Va, useInsertionEffect: Ba, useLayoutEffect: Ua, useMemo: Qa, useReducer: ti, useRef: Aa, useState: function() {
  return ti(lr);
}, useDebugValue: Ao, useDeferredValue: function(e) {
  var t = Le();
  return X === null ? t.memoizedState = e : Ka(t, X.memoizedState, e);
}, useTransition: function() {
  var e = ti(lr)[0], t = Le().memoizedState;
  return [e, t];
}, useMutableSource: Ra, useSyncExternalStore: Ma, useId: Ya, unstable_isNewReconciler: !1 };
function De(e, t) {
  if (e && e.defaultProps) {
    t = U({}, t), e = e.defaultProps;
    for (var n in e) t[n] === void 0 && (t[n] = e[n]);
    return t;
  }
  return t;
}
function Bi(e, t, n, r) {
  t = e.memoizedState, n = n(r, t), n = n == null ? t : U({}, t, n), e.memoizedState = n, e.lanes === 0 && (e.updateQueue.baseState = n);
}
var wl = { isMounted: function(e) {
  return (e = e._reactInternals) ? $t(e) === e : !1;
}, enqueueSetState: function(e, t, n) {
  e = e._reactInternals;
  var r = ce(), l = gt(e), i = Je(r, l);
  i.payload = t, n != null && (i.callback = n), t = ht(e, i, l), t !== null && ($e(t, e, l, r), Ir(t, e, l));
}, enqueueReplaceState: function(e, t, n) {
  e = e._reactInternals;
  var r = ce(), l = gt(e), i = Je(r, l);
  i.tag = 1, i.payload = t, n != null && (i.callback = n), t = ht(e, i, l), t !== null && ($e(t, e, l, r), Ir(t, e, l));
}, enqueueForceUpdate: function(e, t) {
  e = e._reactInternals;
  var n = ce(), r = gt(e), l = Je(n, r);
  l.tag = 2, t != null && (l.callback = t), t = ht(e, l, r), t !== null && ($e(t, e, r, n), Ir(t, e, r));
} };
function Us(e, t, n, r, l, i, o) {
  return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(r, i, o) : t.prototype && t.prototype.isPureReactComponent ? !Jn(n, r) || !Jn(l, i) : !0;
}
function Ja(e, t, n) {
  var r = !1, l = xt, i = t.contextType;
  return typeof i == "object" && i !== null ? i = Te(i) : (l = ge(t) ? Rt : ue.current, r = t.contextTypes, i = (r = r != null) ? un(e, l) : xt), t = new t(n, i), e.memoizedState = t.state !== null && t.state !== void 0 ? t.state : null, t.updater = wl, e.stateNode = t, t._reactInternals = e, r && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = l, e.__reactInternalMemoizedMaskedChildContext = i), t;
}
function Hs(e, t, n, r) {
  e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, r), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, r), t.state !== e && wl.enqueueReplaceState(t, t.state, null);
}
function Ui(e, t, n, r) {
  var l = e.stateNode;
  l.props = n, l.state = e.memoizedState, l.refs = {}, Lo(e);
  var i = t.contextType;
  typeof i == "object" && i !== null ? l.context = Te(i) : (i = ge(t) ? Rt : ue.current, l.context = un(e, i)), l.state = e.memoizedState, i = t.getDerivedStateFromProps, typeof i == "function" && (Bi(e, t, i, n), l.state = e.memoizedState), typeof t.getDerivedStateFromProps == "function" || typeof l.getSnapshotBeforeUpdate == "function" || typeof l.UNSAFE_componentWillMount != "function" && typeof l.componentWillMount != "function" || (t = l.state, typeof l.componentWillMount == "function" && l.componentWillMount(), typeof l.UNSAFE_componentWillMount == "function" && l.UNSAFE_componentWillMount(), t !== l.state && wl.enqueueReplaceState(l, l.state, null), ll(e, n, l, r), l.state = e.memoizedState), typeof l.componentDidMount == "function" && (e.flags |= 4194308);
}
function dn(e, t) {
  try {
    var n = "", r = t;
    do
      n += rf(r), r = r.return;
    while (r);
    var l = n;
  } catch (i) {
    l = `
Error generating stack: ` + i.message + `
` + i.stack;
  }
  return { value: e, source: t, stack: l, digest: null };
}
function ni(e, t, n) {
  return { value: e, source: null, stack: n ?? null, digest: t ?? null };
}
function Hi(e, t) {
  try {
    console.error(t.value);
  } catch (n) {
    setTimeout(function() {
      throw n;
    });
  }
}
var Ld = typeof WeakMap == "function" ? WeakMap : Map;
function qa(e, t, n) {
  n = Je(-1, n), n.tag = 3, n.payload = { element: null };
  var r = t.value;
  return n.callback = function() {
    al || (al = !0, qi = r), Hi(e, t);
  }, n;
}
function ba(e, t, n) {
  n = Je(-1, n), n.tag = 3;
  var r = e.type.getDerivedStateFromError;
  if (typeof r == "function") {
    var l = t.value;
    n.payload = function() {
      return r(l);
    }, n.callback = function() {
      Hi(e, t);
    };
  }
  var i = e.stateNode;
  return i !== null && typeof i.componentDidCatch == "function" && (n.callback = function() {
    Hi(e, t), typeof r != "function" && (mt === null ? mt = /* @__PURE__ */ new Set([this]) : mt.add(this));
    var o = t.stack;
    this.componentDidCatch(t.value, { componentStack: o !== null ? o : "" });
  }), n;
}
function Vs(e, t, n) {
  var r = e.pingCache;
  if (r === null) {
    r = e.pingCache = new Ld();
    var l = /* @__PURE__ */ new Set();
    r.set(t, l);
  } else l = r.get(t), l === void 0 && (l = /* @__PURE__ */ new Set(), r.set(t, l));
  l.has(n) || (l.add(n), e = Qd.bind(null, e, t, n), t.then(e, e));
}
function Ws(e) {
  do {
    var t;
    if ((t = e.tag === 13) && (t = e.memoizedState, t = t !== null ? t.dehydrated !== null : !0), t) return e;
    e = e.return;
  } while (e !== null);
  return null;
}
function Qs(e, t, n, r, l) {
  return e.mode & 1 ? (e.flags |= 65536, e.lanes = l, e) : (e === t ? e.flags |= 65536 : (e.flags |= 128, n.flags |= 131072, n.flags &= -52805, n.tag === 1 && (n.alternate === null ? n.tag = 17 : (t = Je(-1, 1), t.tag = 2, ht(n, t, 1))), n.lanes |= 1), e);
}
var Rd = nt.ReactCurrentOwner, he = !1;
function ae(e, t, n, r) {
  t.child = e === null ? Pa(t, null, n, r) : cn(t, e.child, n, r);
}
function Ks(e, t, n, r, l) {
  n = n.render;
  var i = t.ref;
  return ln(t, l), r = Io(e, t, n, r, i, l), n = Fo(), e !== null && !he ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~l, tt(e, t, l)) : ($ && n && Co(t), t.flags |= 1, ae(e, t, r, l), t.child);
}
function Ys(e, t, n, r, l) {
  if (e === null) {
    var i = n.type;
    return typeof i == "function" && !Yo(i) && i.defaultProps === void 0 && n.compare === null && n.defaultProps === void 0 ? (t.tag = 15, t.type = i, ec(e, t, i, r, l)) : (e = Hr(n.type, null, r, t, t.mode, l), e.ref = t.ref, e.return = t, t.child = e);
  }
  if (i = e.child, !(e.lanes & l)) {
    var o = i.memoizedProps;
    if (n = n.compare, n = n !== null ? n : Jn, n(o, r) && e.ref === t.ref) return tt(e, t, l);
  }
  return t.flags |= 1, e = vt(i, r), e.ref = t.ref, e.return = t, t.child = e;
}
function ec(e, t, n, r, l) {
  if (e !== null) {
    var i = e.memoizedProps;
    if (Jn(i, r) && e.ref === t.ref) if (he = !1, t.pendingProps = r = i, (e.lanes & l) !== 0) e.flags & 131072 && (he = !0);
    else return t.lanes = e.lanes, tt(e, t, l);
  }
  return Vi(e, t, n, r, l);
}
function tc(e, t, n) {
  var r = t.pendingProps, l = r.children, i = e !== null ? e.memoizedState : null;
  if (r.mode === "hidden") if (!(t.mode & 1)) t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, O(bt, ye), ye |= n;
  else {
    if (!(n & 1073741824)) return e = i !== null ? i.baseLanes | n : n, t.lanes = t.childLanes = 1073741824, t.memoizedState = { baseLanes: e, cachePool: null, transitions: null }, t.updateQueue = null, O(bt, ye), ye |= e, null;
    t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, r = i !== null ? i.baseLanes : n, O(bt, ye), ye |= r;
  }
  else i !== null ? (r = i.baseLanes | n, t.memoizedState = null) : r = n, O(bt, ye), ye |= r;
  return ae(e, t, l, n), t.child;
}
function nc(e, t) {
  var n = t.ref;
  (e === null && n !== null || e !== null && e.ref !== n) && (t.flags |= 512, t.flags |= 2097152);
}
function Vi(e, t, n, r, l) {
  var i = ge(n) ? Rt : ue.current;
  return i = un(t, i), ln(t, l), n = Io(e, t, n, r, i, l), r = Fo(), e !== null && !he ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~l, tt(e, t, l)) : ($ && r && Co(t), t.flags |= 1, ae(e, t, n, l), t.child);
}
function Gs(e, t, n, r, l) {
  if (ge(n)) {
    var i = !0;
    br(t);
  } else i = !1;
  if (ln(t, l), t.stateNode === null) Ar(e, t), Ja(t, n, r), Ui(t, n, r, l), r = !0;
  else if (e === null) {
    var o = t.stateNode, s = t.memoizedProps;
    o.props = s;
    var u = o.context, c = n.contextType;
    typeof c == "object" && c !== null ? c = Te(c) : (c = ge(n) ? Rt : ue.current, c = un(t, c));
    var g = n.getDerivedStateFromProps, m = typeof g == "function" || typeof o.getSnapshotBeforeUpdate == "function";
    m || typeof o.UNSAFE_componentWillReceiveProps != "function" && typeof o.componentWillReceiveProps != "function" || (s !== r || u !== c) && Hs(t, o, r, c), it = !1;
    var h = t.memoizedState;
    o.state = h, ll(t, r, o, l), u = t.memoizedState, s !== r || h !== u || me.current || it ? (typeof g == "function" && (Bi(t, n, g, r), u = t.memoizedState), (s = it || Us(t, n, s, r, h, u, c)) ? (m || typeof o.UNSAFE_componentWillMount != "function" && typeof o.componentWillMount != "function" || (typeof o.componentWillMount == "function" && o.componentWillMount(), typeof o.UNSAFE_componentWillMount == "function" && o.UNSAFE_componentWillMount()), typeof o.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof o.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = r, t.memoizedState = u), o.props = r, o.state = u, o.context = c, r = s) : (typeof o.componentDidMount == "function" && (t.flags |= 4194308), r = !1);
  } else {
    o = t.stateNode, Ta(e, t), s = t.memoizedProps, c = t.type === t.elementType ? s : De(t.type, s), o.props = c, m = t.pendingProps, h = o.context, u = n.contextType, typeof u == "object" && u !== null ? u = Te(u) : (u = ge(n) ? Rt : ue.current, u = un(t, u));
    var v = n.getDerivedStateFromProps;
    (g = typeof v == "function" || typeof o.getSnapshotBeforeUpdate == "function") || typeof o.UNSAFE_componentWillReceiveProps != "function" && typeof o.componentWillReceiveProps != "function" || (s !== m || h !== u) && Hs(t, o, r, u), it = !1, h = t.memoizedState, o.state = h, ll(t, r, o, l);
    var w = t.memoizedState;
    s !== m || h !== w || me.current || it ? (typeof v == "function" && (Bi(t, n, v, r), w = t.memoizedState), (c = it || Us(t, n, c, r, h, w, u) || !1) ? (g || typeof o.UNSAFE_componentWillUpdate != "function" && typeof o.componentWillUpdate != "function" || (typeof o.componentWillUpdate == "function" && o.componentWillUpdate(r, w, u), typeof o.UNSAFE_componentWillUpdate == "function" && o.UNSAFE_componentWillUpdate(r, w, u)), typeof o.componentDidUpdate == "function" && (t.flags |= 4), typeof o.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof o.componentDidUpdate != "function" || s === e.memoizedProps && h === e.memoizedState || (t.flags |= 4), typeof o.getSnapshotBeforeUpdate != "function" || s === e.memoizedProps && h === e.memoizedState || (t.flags |= 1024), t.memoizedProps = r, t.memoizedState = w), o.props = r, o.state = w, o.context = u, r = c) : (typeof o.componentDidUpdate != "function" || s === e.memoizedProps && h === e.memoizedState || (t.flags |= 4), typeof o.getSnapshotBeforeUpdate != "function" || s === e.memoizedProps && h === e.memoizedState || (t.flags |= 1024), r = !1);
  }
  return Wi(e, t, n, r, i, l);
}
function Wi(e, t, n, r, l, i) {
  nc(e, t);
  var o = (t.flags & 128) !== 0;
  if (!r && !o) return l && Ms(t, n, !1), tt(e, t, i);
  r = t.stateNode, Rd.current = t;
  var s = o && typeof n.getDerivedStateFromError != "function" ? null : r.render();
  return t.flags |= 1, e !== null && o ? (t.child = cn(t, e.child, null, i), t.child = cn(t, null, s, i)) : ae(e, t, s, i), t.memoizedState = r.state, l && Ms(t, n, !0), t.child;
}
function rc(e) {
  var t = e.stateNode;
  t.pendingContext ? Rs(e, t.pendingContext, t.pendingContext !== t.context) : t.context && Rs(e, t.context, !1), Ro(e, t.containerInfo);
}
function Xs(e, t, n, r, l) {
  return an(), _o(l), t.flags |= 256, ae(e, t, n, r), t.child;
}
var Qi = { dehydrated: null, treeContext: null, retryLane: 0 };
function Ki(e) {
  return { baseLanes: e, cachePool: null, transitions: null };
}
function lc(e, t, n) {
  var r = t.pendingProps, l = A.current, i = !1, o = (t.flags & 128) !== 0, s;
  if ((s = o) || (s = e !== null && e.memoizedState === null ? !1 : (l & 2) !== 0), s ? (i = !0, t.flags &= -129) : (e === null || e.memoizedState !== null) && (l |= 1), O(A, l & 1), e === null)
    return $i(t), e = t.memoizedState, e !== null && (e = e.dehydrated, e !== null) ? (t.mode & 1 ? e.data === "$!" ? t.lanes = 8 : t.lanes = 1073741824 : t.lanes = 1, null) : (o = r.children, e = r.fallback, i ? (r = t.mode, i = t.child, o = { mode: "hidden", children: o }, !(r & 1) && i !== null ? (i.childLanes = 0, i.pendingProps = o) : i = Cl(o, r, 0, null), e = Lt(e, r, n, null), i.return = t, e.return = t, i.sibling = e, t.child = i, t.child.memoizedState = Ki(n), t.memoizedState = Qi, e) : Bo(t, o));
  if (l = e.memoizedState, l !== null && (s = l.dehydrated, s !== null)) return Md(e, t, o, r, s, l, n);
  if (i) {
    i = r.fallback, o = t.mode, l = e.child, s = l.sibling;
    var u = { mode: "hidden", children: r.children };
    return !(o & 1) && t.child !== l ? (r = t.child, r.childLanes = 0, r.pendingProps = u, t.deletions = null) : (r = vt(l, u), r.subtreeFlags = l.subtreeFlags & 14680064), s !== null ? i = vt(s, i) : (i = Lt(i, o, n, null), i.flags |= 2), i.return = t, r.return = t, r.sibling = i, t.child = r, r = i, i = t.child, o = e.child.memoizedState, o = o === null ? Ki(n) : { baseLanes: o.baseLanes | n, cachePool: null, transitions: o.transitions }, i.memoizedState = o, i.childLanes = e.childLanes & ~n, t.memoizedState = Qi, r;
  }
  return i = e.child, e = i.sibling, r = vt(i, { mode: "visible", children: r.children }), !(t.mode & 1) && (r.lanes = n), r.return = t, r.sibling = null, e !== null && (n = t.deletions, n === null ? (t.deletions = [e], t.flags |= 16) : n.push(e)), t.child = r, t.memoizedState = null, r;
}
function Bo(e, t) {
  return t = Cl({ mode: "visible", children: t }, e.mode, 0, null), t.return = e, e.child = t;
}
function jr(e, t, n, r) {
  return r !== null && _o(r), cn(t, e.child, null, n), e = Bo(t, t.pendingProps.children), e.flags |= 2, t.memoizedState = null, e;
}
function Md(e, t, n, r, l, i, o) {
  if (n)
    return t.flags & 256 ? (t.flags &= -257, r = ni(Error(x(422))), jr(e, t, o, r)) : t.memoizedState !== null ? (t.child = e.child, t.flags |= 128, null) : (i = r.fallback, l = t.mode, r = Cl({ mode: "visible", children: r.children }, l, 0, null), i = Lt(i, l, o, null), i.flags |= 2, r.return = t, i.return = t, r.sibling = i, t.child = r, t.mode & 1 && cn(t, e.child, null, o), t.child.memoizedState = Ki(o), t.memoizedState = Qi, i);
  if (!(t.mode & 1)) return jr(e, t, o, null);
  if (l.data === "$!") {
    if (r = l.nextSibling && l.nextSibling.dataset, r) var s = r.dgst;
    return r = s, i = Error(x(419)), r = ni(i, r, void 0), jr(e, t, o, r);
  }
  if (s = (o & e.childLanes) !== 0, he || s) {
    if (r = te, r !== null) {
      switch (o & -o) {
        case 4:
          l = 2;
          break;
        case 16:
          l = 8;
          break;
        case 64:
        case 128:
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
        case 67108864:
          l = 32;
          break;
        case 536870912:
          l = 268435456;
          break;
        default:
          l = 0;
      }
      l = l & (r.suspendedLanes | o) ? 0 : l, l !== 0 && l !== i.retryLane && (i.retryLane = l, et(e, l), $e(r, e, l, -1));
    }
    return Ko(), r = ni(Error(x(421))), jr(e, t, o, r);
  }
  return l.data === "$?" ? (t.flags |= 128, t.child = e.child, t = Kd.bind(null, e), l._reactRetry = t, null) : (e = i.treeContext, xe = pt(l.nextSibling), ke = t, $ = !0, Ie = null, e !== null && (_e[je++] = Ge, _e[je++] = Xe, _e[je++] = Mt, Ge = e.id, Xe = e.overflow, Mt = t), t = Bo(t, r.children), t.flags |= 4096, t);
}
function Zs(e, t, n) {
  e.lanes |= t;
  var r = e.alternate;
  r !== null && (r.lanes |= t), Ai(e.return, t, n);
}
function ri(e, t, n, r, l) {
  var i = e.memoizedState;
  i === null ? e.memoizedState = { isBackwards: t, rendering: null, renderingStartTime: 0, last: r, tail: n, tailMode: l } : (i.isBackwards = t, i.rendering = null, i.renderingStartTime = 0, i.last = r, i.tail = n, i.tailMode = l);
}
function ic(e, t, n) {
  var r = t.pendingProps, l = r.revealOrder, i = r.tail;
  if (ae(e, t, r.children, n), r = A.current, r & 2) r = r & 1 | 2, t.flags |= 128;
  else {
    if (e !== null && e.flags & 128) e: for (e = t.child; e !== null; ) {
      if (e.tag === 13) e.memoizedState !== null && Zs(e, n, t);
      else if (e.tag === 19) Zs(e, n, t);
      else if (e.child !== null) {
        e.child.return = e, e = e.child;
        continue;
      }
      if (e === t) break e;
      for (; e.sibling === null; ) {
        if (e.return === null || e.return === t) break e;
        e = e.return;
      }
      e.sibling.return = e.return, e = e.sibling;
    }
    r &= 1;
  }
  if (O(A, r), !(t.mode & 1)) t.memoizedState = null;
  else switch (l) {
    case "forwards":
      for (n = t.child, l = null; n !== null; ) e = n.alternate, e !== null && il(e) === null && (l = n), n = n.sibling;
      n = l, n === null ? (l = t.child, t.child = null) : (l = n.sibling, n.sibling = null), ri(t, !1, l, n, i);
      break;
    case "backwards":
      for (n = null, l = t.child, t.child = null; l !== null; ) {
        if (e = l.alternate, e !== null && il(e) === null) {
          t.child = l;
          break;
        }
        e = l.sibling, l.sibling = n, n = l, l = e;
      }
      ri(t, !0, n, null, i);
      break;
    case "together":
      ri(t, !1, null, null, void 0);
      break;
    default:
      t.memoizedState = null;
  }
  return t.child;
}
function Ar(e, t) {
  !(t.mode & 1) && e !== null && (e.alternate = null, t.alternate = null, t.flags |= 2);
}
function tt(e, t, n) {
  if (e !== null && (t.dependencies = e.dependencies), Ot |= t.lanes, !(n & t.childLanes)) return null;
  if (e !== null && t.child !== e.child) throw Error(x(153));
  if (t.child !== null) {
    for (e = t.child, n = vt(e, e.pendingProps), t.child = n, n.return = t; e.sibling !== null; ) e = e.sibling, n = n.sibling = vt(e, e.pendingProps), n.return = t;
    n.sibling = null;
  }
  return t.child;
}
function Dd(e, t, n) {
  switch (t.tag) {
    case 3:
      rc(t), an();
      break;
    case 5:
      La(t);
      break;
    case 1:
      ge(t.type) && br(t);
      break;
    case 4:
      Ro(t, t.stateNode.containerInfo);
      break;
    case 10:
      var r = t.type._context, l = t.memoizedProps.value;
      O(nl, r._currentValue), r._currentValue = l;
      break;
    case 13:
      if (r = t.memoizedState, r !== null)
        return r.dehydrated !== null ? (O(A, A.current & 1), t.flags |= 128, null) : n & t.child.childLanes ? lc(e, t, n) : (O(A, A.current & 1), e = tt(e, t, n), e !== null ? e.sibling : null);
      O(A, A.current & 1);
      break;
    case 19:
      if (r = (n & t.childLanes) !== 0, e.flags & 128) {
        if (r) return ic(e, t, n);
        t.flags |= 128;
      }
      if (l = t.memoizedState, l !== null && (l.rendering = null, l.tail = null, l.lastEffect = null), O(A, A.current), r) break;
      return null;
    case 22:
    case 23:
      return t.lanes = 0, tc(e, t, n);
  }
  return tt(e, t, n);
}
var oc, Yi, sc, uc;
oc = function(e, t) {
  for (var n = t.child; n !== null; ) {
    if (n.tag === 5 || n.tag === 6) e.appendChild(n.stateNode);
    else if (n.tag !== 4 && n.child !== null) {
      n.child.return = n, n = n.child;
      continue;
    }
    if (n === t) break;
    for (; n.sibling === null; ) {
      if (n.return === null || n.return === t) return;
      n = n.return;
    }
    n.sibling.return = n.return, n = n.sibling;
  }
};
Yi = function() {
};
sc = function(e, t, n, r) {
  var l = e.memoizedProps;
  if (l !== r) {
    e = t.stateNode, zt(We.current);
    var i = null;
    switch (n) {
      case "input":
        l = mi(e, l), r = mi(e, r), i = [];
        break;
      case "select":
        l = U({}, l, { value: void 0 }), r = U({}, r, { value: void 0 }), i = [];
        break;
      case "textarea":
        l = yi(e, l), r = yi(e, r), i = [];
        break;
      default:
        typeof l.onClick != "function" && typeof r.onClick == "function" && (e.onclick = Jr);
    }
    ki(n, r);
    var o;
    n = null;
    for (c in l) if (!r.hasOwnProperty(c) && l.hasOwnProperty(c) && l[c] != null) if (c === "style") {
      var s = l[c];
      for (o in s) s.hasOwnProperty(o) && (n || (n = {}), n[o] = "");
    } else c !== "dangerouslySetInnerHTML" && c !== "children" && c !== "suppressContentEditableWarning" && c !== "suppressHydrationWarning" && c !== "autoFocus" && (Wn.hasOwnProperty(c) ? i || (i = []) : (i = i || []).push(c, null));
    for (c in r) {
      var u = r[c];
      if (s = l?.[c], r.hasOwnProperty(c) && u !== s && (u != null || s != null)) if (c === "style") if (s) {
        for (o in s) !s.hasOwnProperty(o) || u && u.hasOwnProperty(o) || (n || (n = {}), n[o] = "");
        for (o in u) u.hasOwnProperty(o) && s[o] !== u[o] && (n || (n = {}), n[o] = u[o]);
      } else n || (i || (i = []), i.push(
        c,
        n
      )), n = u;
      else c === "dangerouslySetInnerHTML" ? (u = u ? u.__html : void 0, s = s ? s.__html : void 0, u != null && s !== u && (i = i || []).push(c, u)) : c === "children" ? typeof u != "string" && typeof u != "number" || (i = i || []).push(c, "" + u) : c !== "suppressContentEditableWarning" && c !== "suppressHydrationWarning" && (Wn.hasOwnProperty(c) ? (u != null && c === "onScroll" && I("scroll", e), i || s === u || (i = [])) : (i = i || []).push(c, u));
    }
    n && (i = i || []).push("style", n);
    var c = i;
    (t.updateQueue = c) && (t.flags |= 4);
  }
};
uc = function(e, t, n, r) {
  n !== r && (t.flags |= 4);
};
function _n(e, t) {
  if (!$) switch (e.tailMode) {
    case "hidden":
      t = e.tail;
      for (var n = null; t !== null; ) t.alternate !== null && (n = t), t = t.sibling;
      n === null ? e.tail = null : n.sibling = null;
      break;
    case "collapsed":
      n = e.tail;
      for (var r = null; n !== null; ) n.alternate !== null && (r = n), n = n.sibling;
      r === null ? t || e.tail === null ? e.tail = null : e.tail.sibling = null : r.sibling = null;
  }
}
function oe(e) {
  var t = e.alternate !== null && e.alternate.child === e.child, n = 0, r = 0;
  if (t) for (var l = e.child; l !== null; ) n |= l.lanes | l.childLanes, r |= l.subtreeFlags & 14680064, r |= l.flags & 14680064, l.return = e, l = l.sibling;
  else for (l = e.child; l !== null; ) n |= l.lanes | l.childLanes, r |= l.subtreeFlags, r |= l.flags, l.return = e, l = l.sibling;
  return e.subtreeFlags |= r, e.childLanes = n, t;
}
function Od(e, t, n) {
  var r = t.pendingProps;
  switch (No(t), t.tag) {
    case 2:
    case 16:
    case 15:
    case 0:
    case 11:
    case 7:
    case 8:
    case 12:
    case 9:
    case 14:
      return oe(t), null;
    case 1:
      return ge(t.type) && qr(), oe(t), null;
    case 3:
      return r = t.stateNode, fn(), F(me), F(ue), Do(), r.pendingContext && (r.context = r.pendingContext, r.pendingContext = null), (e === null || e.child === null) && (Nr(t) ? t.flags |= 4 : e === null || e.memoizedState.isDehydrated && !(t.flags & 256) || (t.flags |= 1024, Ie !== null && (to(Ie), Ie = null))), Yi(e, t), oe(t), null;
    case 5:
      Mo(t);
      var l = zt(nr.current);
      if (n = t.type, e !== null && t.stateNode != null) sc(e, t, n, r, l), e.ref !== t.ref && (t.flags |= 512, t.flags |= 2097152);
      else {
        if (!r) {
          if (t.stateNode === null) throw Error(x(166));
          return oe(t), null;
        }
        if (e = zt(We.current), Nr(t)) {
          r = t.stateNode, n = t.type;
          var i = t.memoizedProps;
          switch (r[He] = t, r[er] = i, e = (t.mode & 1) !== 0, n) {
            case "dialog":
              I("cancel", r), I("close", r);
              break;
            case "iframe":
            case "object":
            case "embed":
              I("load", r);
              break;
            case "video":
            case "audio":
              for (l = 0; l < Rn.length; l++) I(Rn[l], r);
              break;
            case "source":
              I("error", r);
              break;
            case "img":
            case "image":
            case "link":
              I(
                "error",
                r
              ), I("load", r);
              break;
            case "details":
              I("toggle", r);
              break;
            case "input":
              is(r, i), I("invalid", r);
              break;
            case "select":
              r._wrapperState = { wasMultiple: !!i.multiple }, I("invalid", r);
              break;
            case "textarea":
              ss(r, i), I("invalid", r);
          }
          ki(n, i), l = null;
          for (var o in i) if (i.hasOwnProperty(o)) {
            var s = i[o];
            o === "children" ? typeof s == "string" ? r.textContent !== s && (i.suppressHydrationWarning !== !0 && Cr(r.textContent, s, e), l = ["children", s]) : typeof s == "number" && r.textContent !== "" + s && (i.suppressHydrationWarning !== !0 && Cr(
              r.textContent,
              s,
              e
            ), l = ["children", "" + s]) : Wn.hasOwnProperty(o) && s != null && o === "onScroll" && I("scroll", r);
          }
          switch (n) {
            case "input":
              gr(r), os(r, i, !0);
              break;
            case "textarea":
              gr(r), us(r);
              break;
            case "select":
            case "option":
              break;
            default:
              typeof i.onClick == "function" && (r.onclick = Jr);
          }
          r = l, t.updateQueue = r, r !== null && (t.flags |= 4);
        } else {
          o = l.nodeType === 9 ? l : l.ownerDocument, e === "http://www.w3.org/1999/xhtml" && (e = Iu(n)), e === "http://www.w3.org/1999/xhtml" ? n === "script" ? (e = o.createElement("div"), e.innerHTML = "<script><\/script>", e = e.removeChild(e.firstChild)) : typeof r.is == "string" ? e = o.createElement(n, { is: r.is }) : (e = o.createElement(n), n === "select" && (o = e, r.multiple ? o.multiple = !0 : r.size && (o.size = r.size))) : e = o.createElementNS(e, n), e[He] = t, e[er] = r, oc(e, t, !1, !1), t.stateNode = e;
          e: {
            switch (o = wi(n, r), n) {
              case "dialog":
                I("cancel", e), I("close", e), l = r;
                break;
              case "iframe":
              case "object":
              case "embed":
                I("load", e), l = r;
                break;
              case "video":
              case "audio":
                for (l = 0; l < Rn.length; l++) I(Rn[l], e);
                l = r;
                break;
              case "source":
                I("error", e), l = r;
                break;
              case "img":
              case "image":
              case "link":
                I(
                  "error",
                  e
                ), I("load", e), l = r;
                break;
              case "details":
                I("toggle", e), l = r;
                break;
              case "input":
                is(e, r), l = mi(e, r), I("invalid", e);
                break;
              case "option":
                l = r;
                break;
              case "select":
                e._wrapperState = { wasMultiple: !!r.multiple }, l = U({}, r, { value: void 0 }), I("invalid", e);
                break;
              case "textarea":
                ss(e, r), l = yi(e, r), I("invalid", e);
                break;
              default:
                l = r;
            }
            ki(n, l), s = l;
            for (i in s) if (s.hasOwnProperty(i)) {
              var u = s[i];
              i === "style" ? Au(e, u) : i === "dangerouslySetInnerHTML" ? (u = u ? u.__html : void 0, u != null && Fu(e, u)) : i === "children" ? typeof u == "string" ? (n !== "textarea" || u !== "") && Qn(e, u) : typeof u == "number" && Qn(e, "" + u) : i !== "suppressContentEditableWarning" && i !== "suppressHydrationWarning" && i !== "autoFocus" && (Wn.hasOwnProperty(i) ? u != null && i === "onScroll" && I("scroll", e) : u != null && ao(e, i, u, o));
            }
            switch (n) {
              case "input":
                gr(e), os(e, r, !1);
                break;
              case "textarea":
                gr(e), us(e);
                break;
              case "option":
                r.value != null && e.setAttribute("value", "" + yt(r.value));
                break;
              case "select":
                e.multiple = !!r.multiple, i = r.value, i != null ? en(e, !!r.multiple, i, !1) : r.defaultValue != null && en(
                  e,
                  !!r.multiple,
                  r.defaultValue,
                  !0
                );
                break;
              default:
                typeof l.onClick == "function" && (e.onclick = Jr);
            }
            switch (n) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                r = !!r.autoFocus;
                break e;
              case "img":
                r = !0;
                break e;
              default:
                r = !1;
            }
          }
          r && (t.flags |= 4);
        }
        t.ref !== null && (t.flags |= 512, t.flags |= 2097152);
      }
      return oe(t), null;
    case 6:
      if (e && t.stateNode != null) uc(e, t, e.memoizedProps, r);
      else {
        if (typeof r != "string" && t.stateNode === null) throw Error(x(166));
        if (n = zt(nr.current), zt(We.current), Nr(t)) {
          if (r = t.stateNode, n = t.memoizedProps, r[He] = t, (i = r.nodeValue !== n) && (e = ke, e !== null)) switch (e.tag) {
            case 3:
              Cr(r.nodeValue, n, (e.mode & 1) !== 0);
              break;
            case 5:
              e.memoizedProps.suppressHydrationWarning !== !0 && Cr(r.nodeValue, n, (e.mode & 1) !== 0);
          }
          i && (t.flags |= 4);
        } else r = (n.nodeType === 9 ? n : n.ownerDocument).createTextNode(r), r[He] = t, t.stateNode = r;
      }
      return oe(t), null;
    case 13:
      if (F(A), r = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
        if ($ && xe !== null && t.mode & 1 && !(t.flags & 128)) _a(), an(), t.flags |= 98560, i = !1;
        else if (i = Nr(t), r !== null && r.dehydrated !== null) {
          if (e === null) {
            if (!i) throw Error(x(318));
            if (i = t.memoizedState, i = i !== null ? i.dehydrated : null, !i) throw Error(x(317));
            i[He] = t;
          } else an(), !(t.flags & 128) && (t.memoizedState = null), t.flags |= 4;
          oe(t), i = !1;
        } else Ie !== null && (to(Ie), Ie = null), i = !0;
        if (!i) return t.flags & 65536 ? t : null;
      }
      return t.flags & 128 ? (t.lanes = n, t) : (r = r !== null, r !== (e !== null && e.memoizedState !== null) && r && (t.child.flags |= 8192, t.mode & 1 && (e === null || A.current & 1 ? Z === 0 && (Z = 3) : Ko())), t.updateQueue !== null && (t.flags |= 4), oe(t), null);
    case 4:
      return fn(), Yi(e, t), e === null && qn(t.stateNode.containerInfo), oe(t), null;
    case 10:
      return zo(t.type._context), oe(t), null;
    case 17:
      return ge(t.type) && qr(), oe(t), null;
    case 19:
      if (F(A), i = t.memoizedState, i === null) return oe(t), null;
      if (r = (t.flags & 128) !== 0, o = i.rendering, o === null) if (r) _n(i, !1);
      else {
        if (Z !== 0 || e !== null && e.flags & 128) for (e = t.child; e !== null; ) {
          if (o = il(e), o !== null) {
            for (t.flags |= 128, _n(i, !1), r = o.updateQueue, r !== null && (t.updateQueue = r, t.flags |= 4), t.subtreeFlags = 0, r = n, n = t.child; n !== null; ) i = n, e = r, i.flags &= 14680066, o = i.alternate, o === null ? (i.childLanes = 0, i.lanes = e, i.child = null, i.subtreeFlags = 0, i.memoizedProps = null, i.memoizedState = null, i.updateQueue = null, i.dependencies = null, i.stateNode = null) : (i.childLanes = o.childLanes, i.lanes = o.lanes, i.child = o.child, i.subtreeFlags = 0, i.deletions = null, i.memoizedProps = o.memoizedProps, i.memoizedState = o.memoizedState, i.updateQueue = o.updateQueue, i.type = o.type, e = o.dependencies, i.dependencies = e === null ? null : { lanes: e.lanes, firstContext: e.firstContext }), n = n.sibling;
            return O(A, A.current & 1 | 2), t.child;
          }
          e = e.sibling;
        }
        i.tail !== null && Y() > pn && (t.flags |= 128, r = !0, _n(i, !1), t.lanes = 4194304);
      }
      else {
        if (!r) if (e = il(o), e !== null) {
          if (t.flags |= 128, r = !0, n = e.updateQueue, n !== null && (t.updateQueue = n, t.flags |= 4), _n(i, !0), i.tail === null && i.tailMode === "hidden" && !o.alternate && !$) return oe(t), null;
        } else 2 * Y() - i.renderingStartTime > pn && n !== 1073741824 && (t.flags |= 128, r = !0, _n(i, !1), t.lanes = 4194304);
        i.isBackwards ? (o.sibling = t.child, t.child = o) : (n = i.last, n !== null ? n.sibling = o : t.child = o, i.last = o);
      }
      return i.tail !== null ? (t = i.tail, i.rendering = t, i.tail = t.sibling, i.renderingStartTime = Y(), t.sibling = null, n = A.current, O(A, r ? n & 1 | 2 : n & 1), t) : (oe(t), null);
    case 22:
    case 23:
      return Qo(), r = t.memoizedState !== null, e !== null && e.memoizedState !== null !== r && (t.flags |= 8192), r && t.mode & 1 ? ye & 1073741824 && (oe(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : oe(t), null;
    case 24:
      return null;
    case 25:
      return null;
  }
  throw Error(x(156, t.tag));
}
function Id(e, t) {
  switch (No(t), t.tag) {
    case 1:
      return ge(t.type) && qr(), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
    case 3:
      return fn(), F(me), F(ue), Do(), e = t.flags, e & 65536 && !(e & 128) ? (t.flags = e & -65537 | 128, t) : null;
    case 5:
      return Mo(t), null;
    case 13:
      if (F(A), e = t.memoizedState, e !== null && e.dehydrated !== null) {
        if (t.alternate === null) throw Error(x(340));
        an();
      }
      return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
    case 19:
      return F(A), null;
    case 4:
      return fn(), null;
    case 10:
      return zo(t.type._context), null;
    case 22:
    case 23:
      return Qo(), null;
    case 24:
      return null;
    default:
      return null;
  }
}
var Pr = !1, se = !1, Fd = typeof WeakSet == "function" ? WeakSet : Set, S = null;
function qt(e, t) {
  var n = e.ref;
  if (n !== null) if (typeof n == "function") try {
    n(null);
  } catch (r) {
    H(e, t, r);
  }
  else n.current = null;
}
function Gi(e, t, n) {
  try {
    n();
  } catch (r) {
    H(e, t, r);
  }
}
var Js = !1;
function $d(e, t) {
  if (Li = Gr, e = pa(), Eo(e)) {
    if ("selectionStart" in e) var n = { start: e.selectionStart, end: e.selectionEnd };
    else e: {
      n = (n = e.ownerDocument) && n.defaultView || window;
      var r = n.getSelection && n.getSelection();
      if (r && r.rangeCount !== 0) {
        n = r.anchorNode;
        var l = r.anchorOffset, i = r.focusNode;
        r = r.focusOffset;
        try {
          n.nodeType, i.nodeType;
        } catch {
          n = null;
          break e;
        }
        var o = 0, s = -1, u = -1, c = 0, g = 0, m = e, h = null;
        t: for (; ; ) {
          for (var v; m !== n || l !== 0 && m.nodeType !== 3 || (s = o + l), m !== i || r !== 0 && m.nodeType !== 3 || (u = o + r), m.nodeType === 3 && (o += m.nodeValue.length), (v = m.firstChild) !== null; )
            h = m, m = v;
          for (; ; ) {
            if (m === e) break t;
            if (h === n && ++c === l && (s = o), h === i && ++g === r && (u = o), (v = m.nextSibling) !== null) break;
            m = h, h = m.parentNode;
          }
          m = v;
        }
        n = s === -1 || u === -1 ? null : { start: s, end: u };
      } else n = null;
    }
    n = n || { start: 0, end: 0 };
  } else n = null;
  for (Ri = { focusedElem: e, selectionRange: n }, Gr = !1, S = t; S !== null; ) if (t = S, e = t.child, (t.subtreeFlags & 1028) !== 0 && e !== null) e.return = t, S = e;
  else for (; S !== null; ) {
    t = S;
    try {
      var w = t.alternate;
      if (t.flags & 1024) switch (t.tag) {
        case 0:
        case 11:
        case 15:
          break;
        case 1:
          if (w !== null) {
            var k = w.memoizedProps, D = w.memoizedState, f = t.stateNode, a = f.getSnapshotBeforeUpdate(t.elementType === t.type ? k : De(t.type, k), D);
            f.__reactInternalSnapshotBeforeUpdate = a;
          }
          break;
        case 3:
          var d = t.stateNode.containerInfo;
          d.nodeType === 1 ? d.textContent = "" : d.nodeType === 9 && d.documentElement && d.removeChild(d.documentElement);
          break;
        case 5:
        case 6:
        case 4:
        case 17:
          break;
        default:
          throw Error(x(163));
      }
    } catch (y) {
      H(t, t.return, y);
    }
    if (e = t.sibling, e !== null) {
      e.return = t.return, S = e;
      break;
    }
    S = t.return;
  }
  return w = Js, Js = !1, w;
}
function Un(e, t, n) {
  var r = t.updateQueue;
  if (r = r !== null ? r.lastEffect : null, r !== null) {
    var l = r = r.next;
    do {
      if ((l.tag & e) === e) {
        var i = l.destroy;
        l.destroy = void 0, i !== void 0 && Gi(t, n, i);
      }
      l = l.next;
    } while (l !== r);
  }
}
function Sl(e, t) {
  if (t = t.updateQueue, t = t !== null ? t.lastEffect : null, t !== null) {
    var n = t = t.next;
    do {
      if ((n.tag & e) === e) {
        var r = n.create;
        n.destroy = r();
      }
      n = n.next;
    } while (n !== t);
  }
}
function Xi(e) {
  var t = e.ref;
  if (t !== null) {
    var n = e.stateNode;
    switch (e.tag) {
      case 5:
        e = n;
        break;
      default:
        e = n;
    }
    typeof t == "function" ? t(e) : t.current = e;
  }
}
function ac(e) {
  var t = e.alternate;
  t !== null && (e.alternate = null, ac(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && (delete t[He], delete t[er], delete t[Oi], delete t[kd], delete t[wd])), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
}
function cc(e) {
  return e.tag === 5 || e.tag === 3 || e.tag === 4;
}
function qs(e) {
  e: for (; ; ) {
    for (; e.sibling === null; ) {
      if (e.return === null || cc(e.return)) return null;
      e = e.return;
    }
    for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
      if (e.flags & 2 || e.child === null || e.tag === 4) continue e;
      e.child.return = e, e = e.child;
    }
    if (!(e.flags & 2)) return e.stateNode;
  }
}
function Zi(e, t, n) {
  var r = e.tag;
  if (r === 5 || r === 6) e = e.stateNode, t ? n.nodeType === 8 ? n.parentNode.insertBefore(e, t) : n.insertBefore(e, t) : (n.nodeType === 8 ? (t = n.parentNode, t.insertBefore(e, n)) : (t = n, t.appendChild(e)), n = n._reactRootContainer, n != null || t.onclick !== null || (t.onclick = Jr));
  else if (r !== 4 && (e = e.child, e !== null)) for (Zi(e, t, n), e = e.sibling; e !== null; ) Zi(e, t, n), e = e.sibling;
}
function Ji(e, t, n) {
  var r = e.tag;
  if (r === 5 || r === 6) e = e.stateNode, t ? n.insertBefore(e, t) : n.appendChild(e);
  else if (r !== 4 && (e = e.child, e !== null)) for (Ji(e, t, n), e = e.sibling; e !== null; ) Ji(e, t, n), e = e.sibling;
}
var ne = null, Oe = !1;
function rt(e, t, n) {
  for (n = n.child; n !== null; ) fc(e, t, n), n = n.sibling;
}
function fc(e, t, n) {
  if (Ve && typeof Ve.onCommitFiberUnmount == "function") try {
    Ve.onCommitFiberUnmount(hl, n);
  } catch {
  }
  switch (n.tag) {
    case 5:
      se || qt(n, t);
    case 6:
      var r = ne, l = Oe;
      ne = null, rt(e, t, n), ne = r, Oe = l, ne !== null && (Oe ? (e = ne, n = n.stateNode, e.nodeType === 8 ? e.parentNode.removeChild(n) : e.removeChild(n)) : ne.removeChild(n.stateNode));
      break;
    case 18:
      ne !== null && (Oe ? (e = ne, n = n.stateNode, e.nodeType === 8 ? Zl(e.parentNode, n) : e.nodeType === 1 && Zl(e, n), Xn(e)) : Zl(ne, n.stateNode));
      break;
    case 4:
      r = ne, l = Oe, ne = n.stateNode.containerInfo, Oe = !0, rt(e, t, n), ne = r, Oe = l;
      break;
    case 0:
    case 11:
    case 14:
    case 15:
      if (!se && (r = n.updateQueue, r !== null && (r = r.lastEffect, r !== null))) {
        l = r = r.next;
        do {
          var i = l, o = i.destroy;
          i = i.tag, o !== void 0 && (i & 2 || i & 4) && Gi(n, t, o), l = l.next;
        } while (l !== r);
      }
      rt(e, t, n);
      break;
    case 1:
      if (!se && (qt(n, t), r = n.stateNode, typeof r.componentWillUnmount == "function")) try {
        r.props = n.memoizedProps, r.state = n.memoizedState, r.componentWillUnmount();
      } catch (s) {
        H(n, t, s);
      }
      rt(e, t, n);
      break;
    case 21:
      rt(e, t, n);
      break;
    case 22:
      n.mode & 1 ? (se = (r = se) || n.memoizedState !== null, rt(e, t, n), se = r) : rt(e, t, n);
      break;
    default:
      rt(e, t, n);
  }
}
function bs(e) {
  var t = e.updateQueue;
  if (t !== null) {
    e.updateQueue = null;
    var n = e.stateNode;
    n === null && (n = e.stateNode = new Fd()), t.forEach(function(r) {
      var l = Yd.bind(null, e, r);
      n.has(r) || (n.add(r), r.then(l, l));
    });
  }
}
function Me(e, t) {
  var n = t.deletions;
  if (n !== null) for (var r = 0; r < n.length; r++) {
    var l = n[r];
    try {
      var i = e, o = t, s = o;
      e: for (; s !== null; ) {
        switch (s.tag) {
          case 5:
            ne = s.stateNode, Oe = !1;
            break e;
          case 3:
            ne = s.stateNode.containerInfo, Oe = !0;
            break e;
          case 4:
            ne = s.stateNode.containerInfo, Oe = !0;
            break e;
        }
        s = s.return;
      }
      if (ne === null) throw Error(x(160));
      fc(i, o, l), ne = null, Oe = !1;
      var u = l.alternate;
      u !== null && (u.return = null), l.return = null;
    } catch (c) {
      H(l, t, c);
    }
  }
  if (t.subtreeFlags & 12854) for (t = t.child; t !== null; ) dc(t, e), t = t.sibling;
}
function dc(e, t) {
  var n = e.alternate, r = e.flags;
  switch (e.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
      if (Me(t, e), Be(e), r & 4) {
        try {
          Un(3, e, e.return), Sl(3, e);
        } catch (k) {
          H(e, e.return, k);
        }
        try {
          Un(5, e, e.return);
        } catch (k) {
          H(e, e.return, k);
        }
      }
      break;
    case 1:
      Me(t, e), Be(e), r & 512 && n !== null && qt(n, n.return);
      break;
    case 5:
      if (Me(t, e), Be(e), r & 512 && n !== null && qt(n, n.return), e.flags & 32) {
        var l = e.stateNode;
        try {
          Qn(l, "");
        } catch (k) {
          H(e, e.return, k);
        }
      }
      if (r & 4 && (l = e.stateNode, l != null)) {
        var i = e.memoizedProps, o = n !== null ? n.memoizedProps : i, s = e.type, u = e.updateQueue;
        if (e.updateQueue = null, u !== null) try {
          s === "input" && i.type === "radio" && i.name != null && Du(l, i), wi(s, o);
          var c = wi(s, i);
          for (o = 0; o < u.length; o += 2) {
            var g = u[o], m = u[o + 1];
            g === "style" ? Au(l, m) : g === "dangerouslySetInnerHTML" ? Fu(l, m) : g === "children" ? Qn(l, m) : ao(l, g, m, c);
          }
          switch (s) {
            case "input":
              gi(l, i);
              break;
            case "textarea":
              Ou(l, i);
              break;
            case "select":
              var h = l._wrapperState.wasMultiple;
              l._wrapperState.wasMultiple = !!i.multiple;
              var v = i.value;
              v != null ? en(l, !!i.multiple, v, !1) : h !== !!i.multiple && (i.defaultValue != null ? en(
                l,
                !!i.multiple,
                i.defaultValue,
                !0
              ) : en(l, !!i.multiple, i.multiple ? [] : "", !1));
          }
          l[er] = i;
        } catch (k) {
          H(e, e.return, k);
        }
      }
      break;
    case 6:
      if (Me(t, e), Be(e), r & 4) {
        if (e.stateNode === null) throw Error(x(162));
        l = e.stateNode, i = e.memoizedProps;
        try {
          l.nodeValue = i;
        } catch (k) {
          H(e, e.return, k);
        }
      }
      break;
    case 3:
      if (Me(t, e), Be(e), r & 4 && n !== null && n.memoizedState.isDehydrated) try {
        Xn(t.containerInfo);
      } catch (k) {
        H(e, e.return, k);
      }
      break;
    case 4:
      Me(t, e), Be(e);
      break;
    case 13:
      Me(t, e), Be(e), l = e.child, l.flags & 8192 && (i = l.memoizedState !== null, l.stateNode.isHidden = i, !i || l.alternate !== null && l.alternate.memoizedState !== null || (Vo = Y())), r & 4 && bs(e);
      break;
    case 22:
      if (g = n !== null && n.memoizedState !== null, e.mode & 1 ? (se = (c = se) || g, Me(t, e), se = c) : Me(t, e), Be(e), r & 8192) {
        if (c = e.memoizedState !== null, (e.stateNode.isHidden = c) && !g && e.mode & 1) for (S = e, g = e.child; g !== null; ) {
          for (m = S = g; S !== null; ) {
            switch (h = S, v = h.child, h.tag) {
              case 0:
              case 11:
              case 14:
              case 15:
                Un(4, h, h.return);
                break;
              case 1:
                qt(h, h.return);
                var w = h.stateNode;
                if (typeof w.componentWillUnmount == "function") {
                  r = h, n = h.return;
                  try {
                    t = r, w.props = t.memoizedProps, w.state = t.memoizedState, w.componentWillUnmount();
                  } catch (k) {
                    H(r, n, k);
                  }
                }
                break;
              case 5:
                qt(h, h.return);
                break;
              case 22:
                if (h.memoizedState !== null) {
                  tu(m);
                  continue;
                }
            }
            v !== null ? (v.return = h, S = v) : tu(m);
          }
          g = g.sibling;
        }
        e: for (g = null, m = e; ; ) {
          if (m.tag === 5) {
            if (g === null) {
              g = m;
              try {
                l = m.stateNode, c ? (i = l.style, typeof i.setProperty == "function" ? i.setProperty("display", "none", "important") : i.display = "none") : (s = m.stateNode, u = m.memoizedProps.style, o = u != null && u.hasOwnProperty("display") ? u.display : null, s.style.display = $u("display", o));
              } catch (k) {
                H(e, e.return, k);
              }
            }
          } else if (m.tag === 6) {
            if (g === null) try {
              m.stateNode.nodeValue = c ? "" : m.memoizedProps;
            } catch (k) {
              H(e, e.return, k);
            }
          } else if ((m.tag !== 22 && m.tag !== 23 || m.memoizedState === null || m === e) && m.child !== null) {
            m.child.return = m, m = m.child;
            continue;
          }
          if (m === e) break e;
          for (; m.sibling === null; ) {
            if (m.return === null || m.return === e) break e;
            g === m && (g = null), m = m.return;
          }
          g === m && (g = null), m.sibling.return = m.return, m = m.sibling;
        }
      }
      break;
    case 19:
      Me(t, e), Be(e), r & 4 && bs(e);
      break;
    case 21:
      break;
    default:
      Me(
        t,
        e
      ), Be(e);
  }
}
function Be(e) {
  var t = e.flags;
  if (t & 2) {
    try {
      e: {
        for (var n = e.return; n !== null; ) {
          if (cc(n)) {
            var r = n;
            break e;
          }
          n = n.return;
        }
        throw Error(x(160));
      }
      switch (r.tag) {
        case 5:
          var l = r.stateNode;
          r.flags & 32 && (Qn(l, ""), r.flags &= -33);
          var i = qs(e);
          Ji(e, i, l);
          break;
        case 3:
        case 4:
          var o = r.stateNode.containerInfo, s = qs(e);
          Zi(e, s, o);
          break;
        default:
          throw Error(x(161));
      }
    } catch (u) {
      H(e, e.return, u);
    }
    e.flags &= -3;
  }
  t & 4096 && (e.flags &= -4097);
}
function Ad(e, t, n) {
  S = e, pc(e);
}
function pc(e, t, n) {
  for (var r = (e.mode & 1) !== 0; S !== null; ) {
    var l = S, i = l.child;
    if (l.tag === 22 && r) {
      var o = l.memoizedState !== null || Pr;
      if (!o) {
        var s = l.alternate, u = s !== null && s.memoizedState !== null || se;
        s = Pr;
        var c = se;
        if (Pr = o, (se = u) && !c) for (S = l; S !== null; ) o = S, u = o.child, o.tag === 22 && o.memoizedState !== null ? nu(l) : u !== null ? (u.return = o, S = u) : nu(l);
        for (; i !== null; ) S = i, pc(i), i = i.sibling;
        S = l, Pr = s, se = c;
      }
      eu(e);
    } else l.subtreeFlags & 8772 && i !== null ? (i.return = l, S = i) : eu(e);
  }
}
function eu(e) {
  for (; S !== null; ) {
    var t = S;
    if (t.flags & 8772) {
      var n = t.alternate;
      try {
        if (t.flags & 8772) switch (t.tag) {
          case 0:
          case 11:
          case 15:
            se || Sl(5, t);
            break;
          case 1:
            var r = t.stateNode;
            if (t.flags & 4 && !se) if (n === null) r.componentDidMount();
            else {
              var l = t.elementType === t.type ? n.memoizedProps : De(t.type, n.memoizedProps);
              r.componentDidUpdate(l, n.memoizedState, r.__reactInternalSnapshotBeforeUpdate);
            }
            var i = t.updateQueue;
            i !== null && $s(t, i, r);
            break;
          case 3:
            var o = t.updateQueue;
            if (o !== null) {
              if (n = null, t.child !== null) switch (t.child.tag) {
                case 5:
                  n = t.child.stateNode;
                  break;
                case 1:
                  n = t.child.stateNode;
              }
              $s(t, o, n);
            }
            break;
          case 5:
            var s = t.stateNode;
            if (n === null && t.flags & 4) {
              n = s;
              var u = t.memoizedProps;
              switch (t.type) {
                case "button":
                case "input":
                case "select":
                case "textarea":
                  u.autoFocus && n.focus();
                  break;
                case "img":
                  u.src && (n.src = u.src);
              }
            }
            break;
          case 6:
            break;
          case 4:
            break;
          case 12:
            break;
          case 13:
            if (t.memoizedState === null) {
              var c = t.alternate;
              if (c !== null) {
                var g = c.memoizedState;
                if (g !== null) {
                  var m = g.dehydrated;
                  m !== null && Xn(m);
                }
              }
            }
            break;
          case 19:
          case 17:
          case 21:
          case 22:
          case 23:
          case 25:
            break;
          default:
            throw Error(x(163));
        }
        se || t.flags & 512 && Xi(t);
      } catch (h) {
        H(t, t.return, h);
      }
    }
    if (t === e) {
      S = null;
      break;
    }
    if (n = t.sibling, n !== null) {
      n.return = t.return, S = n;
      break;
    }
    S = t.return;
  }
}
function tu(e) {
  for (; S !== null; ) {
    var t = S;
    if (t === e) {
      S = null;
      break;
    }
    var n = t.sibling;
    if (n !== null) {
      n.return = t.return, S = n;
      break;
    }
    S = t.return;
  }
}
function nu(e) {
  for (; S !== null; ) {
    var t = S;
    try {
      switch (t.tag) {
        case 0:
        case 11:
        case 15:
          var n = t.return;
          try {
            Sl(4, t);
          } catch (u) {
            H(t, n, u);
          }
          break;
        case 1:
          var r = t.stateNode;
          if (typeof r.componentDidMount == "function") {
            var l = t.return;
            try {
              r.componentDidMount();
            } catch (u) {
              H(t, l, u);
            }
          }
          var i = t.return;
          try {
            Xi(t);
          } catch (u) {
            H(t, i, u);
          }
          break;
        case 5:
          var o = t.return;
          try {
            Xi(t);
          } catch (u) {
            H(t, o, u);
          }
      }
    } catch (u) {
      H(t, t.return, u);
    }
    if (t === e) {
      S = null;
      break;
    }
    var s = t.sibling;
    if (s !== null) {
      s.return = t.return, S = s;
      break;
    }
    S = t.return;
  }
}
var Bd = Math.ceil, ul = nt.ReactCurrentDispatcher, Uo = nt.ReactCurrentOwner, ze = nt.ReactCurrentBatchConfig, R = 0, te = null, G = null, re = 0, ye = 0, bt = wt(0), Z = 0, or = null, Ot = 0, El = 0, Ho = 0, Hn = null, pe = null, Vo = 0, pn = 1 / 0, Qe = null, al = !1, qi = null, mt = null, zr = !1, at = null, cl = 0, Vn = 0, bi = null, Br = -1, Ur = 0;
function ce() {
  return R & 6 ? Y() : Br !== -1 ? Br : Br = Y();
}
function gt(e) {
  return e.mode & 1 ? R & 2 && re !== 0 ? re & -re : Ed.transition !== null ? (Ur === 0 && (Ur = Ju()), Ur) : (e = M, e !== 0 || (e = window.event, e = e === void 0 ? 16 : la(e.type)), e) : 1;
}
function $e(e, t, n, r) {
  if (50 < Vn) throw Vn = 0, bi = null, Error(x(185));
  ur(e, n, r), (!(R & 2) || e !== te) && (e === te && (!(R & 2) && (El |= n), Z === 4 && st(e, re)), ve(e, r), n === 1 && R === 0 && !(t.mode & 1) && (pn = Y() + 500, xl && St()));
}
function ve(e, t) {
  var n = e.callbackNode;
  Ef(e, t);
  var r = Yr(e, e === te ? re : 0);
  if (r === 0) n !== null && fs(n), e.callbackNode = null, e.callbackPriority = 0;
  else if (t = r & -r, e.callbackPriority !== t) {
    if (n != null && fs(n), t === 1) e.tag === 0 ? Sd(ru.bind(null, e)) : Ea(ru.bind(null, e)), yd(function() {
      !(R & 6) && St();
    }), n = null;
    else {
      switch (qu(r)) {
        case 1:
          n = mo;
          break;
        case 4:
          n = Xu;
          break;
        case 16:
          n = Kr;
          break;
        case 536870912:
          n = Zu;
          break;
        default:
          n = Kr;
      }
      n = wc(n, hc.bind(null, e));
    }
    e.callbackPriority = t, e.callbackNode = n;
  }
}
function hc(e, t) {
  if (Br = -1, Ur = 0, R & 6) throw Error(x(327));
  var n = e.callbackNode;
  if (on() && e.callbackNode !== n) return null;
  var r = Yr(e, e === te ? re : 0);
  if (r === 0) return null;
  if (r & 30 || r & e.expiredLanes || t) t = fl(e, r);
  else {
    t = r;
    var l = R;
    R |= 2;
    var i = gc();
    (te !== e || re !== t) && (Qe = null, pn = Y() + 500, Tt(e, t));
    do
      try {
        Vd();
        break;
      } catch (s) {
        mc(e, s);
      }
    while (!0);
    Po(), ul.current = i, R = l, G !== null ? t = 0 : (te = null, re = 0, t = Z);
  }
  if (t !== 0) {
    if (t === 2 && (l = _i(e), l !== 0 && (r = l, t = eo(e, l))), t === 1) throw n = or, Tt(e, 0), st(e, r), ve(e, Y()), n;
    if (t === 6) st(e, r);
    else {
      if (l = e.current.alternate, !(r & 30) && !Ud(l) && (t = fl(e, r), t === 2 && (i = _i(e), i !== 0 && (r = i, t = eo(e, i))), t === 1)) throw n = or, Tt(e, 0), st(e, r), ve(e, Y()), n;
      switch (e.finishedWork = l, e.finishedLanes = r, t) {
        case 0:
        case 1:
          throw Error(x(345));
        case 2:
          _t(e, pe, Qe);
          break;
        case 3:
          if (st(e, r), (r & 130023424) === r && (t = Vo + 500 - Y(), 10 < t)) {
            if (Yr(e, 0) !== 0) break;
            if (l = e.suspendedLanes, (l & r) !== r) {
              ce(), e.pingedLanes |= e.suspendedLanes & l;
              break;
            }
            e.timeoutHandle = Di(_t.bind(null, e, pe, Qe), t);
            break;
          }
          _t(e, pe, Qe);
          break;
        case 4:
          if (st(e, r), (r & 4194240) === r) break;
          for (t = e.eventTimes, l = -1; 0 < r; ) {
            var o = 31 - Fe(r);
            i = 1 << o, o = t[o], o > l && (l = o), r &= ~i;
          }
          if (r = l, r = Y() - r, r = (120 > r ? 120 : 480 > r ? 480 : 1080 > r ? 1080 : 1920 > r ? 1920 : 3e3 > r ? 3e3 : 4320 > r ? 4320 : 1960 * Bd(r / 1960)) - r, 10 < r) {
            e.timeoutHandle = Di(_t.bind(null, e, pe, Qe), r);
            break;
          }
          _t(e, pe, Qe);
          break;
        case 5:
          _t(e, pe, Qe);
          break;
        default:
          throw Error(x(329));
      }
    }
  }
  return ve(e, Y()), e.callbackNode === n ? hc.bind(null, e) : null;
}
function eo(e, t) {
  var n = Hn;
  return e.current.memoizedState.isDehydrated && (Tt(e, t).flags |= 256), e = fl(e, t), e !== 2 && (t = pe, pe = n, t !== null && to(t)), e;
}
function to(e) {
  pe === null ? pe = e : pe.push.apply(pe, e);
}
function Ud(e) {
  for (var t = e; ; ) {
    if (t.flags & 16384) {
      var n = t.updateQueue;
      if (n !== null && (n = n.stores, n !== null)) for (var r = 0; r < n.length; r++) {
        var l = n[r], i = l.getSnapshot;
        l = l.value;
        try {
          if (!Ae(i(), l)) return !1;
        } catch {
          return !1;
        }
      }
    }
    if (n = t.child, t.subtreeFlags & 16384 && n !== null) n.return = t, t = n;
    else {
      if (t === e) break;
      for (; t.sibling === null; ) {
        if (t.return === null || t.return === e) return !0;
        t = t.return;
      }
      t.sibling.return = t.return, t = t.sibling;
    }
  }
  return !0;
}
function st(e, t) {
  for (t &= ~Ho, t &= ~El, e.suspendedLanes |= t, e.pingedLanes &= ~t, e = e.expirationTimes; 0 < t; ) {
    var n = 31 - Fe(t), r = 1 << n;
    e[n] = -1, t &= ~r;
  }
}
function ru(e) {
  if (R & 6) throw Error(x(327));
  on();
  var t = Yr(e, 0);
  if (!(t & 1)) return ve(e, Y()), null;
  var n = fl(e, t);
  if (e.tag !== 0 && n === 2) {
    var r = _i(e);
    r !== 0 && (t = r, n = eo(e, r));
  }
  if (n === 1) throw n = or, Tt(e, 0), st(e, t), ve(e, Y()), n;
  if (n === 6) throw Error(x(345));
  return e.finishedWork = e.current.alternate, e.finishedLanes = t, _t(e, pe, Qe), ve(e, Y()), null;
}
function Wo(e, t) {
  var n = R;
  R |= 1;
  try {
    return e(t);
  } finally {
    R = n, R === 0 && (pn = Y() + 500, xl && St());
  }
}
function It(e) {
  at !== null && at.tag === 0 && !(R & 6) && on();
  var t = R;
  R |= 1;
  var n = ze.transition, r = M;
  try {
    if (ze.transition = null, M = 1, e) return e();
  } finally {
    M = r, ze.transition = n, R = t, !(R & 6) && St();
  }
}
function Qo() {
  ye = bt.current, F(bt);
}
function Tt(e, t) {
  e.finishedWork = null, e.finishedLanes = 0;
  var n = e.timeoutHandle;
  if (n !== -1 && (e.timeoutHandle = -1, vd(n)), G !== null) for (n = G.return; n !== null; ) {
    var r = n;
    switch (No(r), r.tag) {
      case 1:
        r = r.type.childContextTypes, r != null && qr();
        break;
      case 3:
        fn(), F(me), F(ue), Do();
        break;
      case 5:
        Mo(r);
        break;
      case 4:
        fn();
        break;
      case 13:
        F(A);
        break;
      case 19:
        F(A);
        break;
      case 10:
        zo(r.type._context);
        break;
      case 22:
      case 23:
        Qo();
    }
    n = n.return;
  }
  if (te = e, G = e = vt(e.current, null), re = ye = t, Z = 0, or = null, Ho = El = Ot = 0, pe = Hn = null, Pt !== null) {
    for (t = 0; t < Pt.length; t++) if (n = Pt[t], r = n.interleaved, r !== null) {
      n.interleaved = null;
      var l = r.next, i = n.pending;
      if (i !== null) {
        var o = i.next;
        i.next = l, r.next = o;
      }
      n.pending = r;
    }
    Pt = null;
  }
  return e;
}
function mc(e, t) {
  do {
    var n = G;
    try {
      if (Po(), Fr.current = sl, ol) {
        for (var r = B.memoizedState; r !== null; ) {
          var l = r.queue;
          l !== null && (l.pending = null), r = r.next;
        }
        ol = !1;
      }
      if (Dt = 0, ee = X = B = null, Bn = !1, rr = 0, Uo.current = null, n === null || n.return === null) {
        Z = 1, or = t, G = null;
        break;
      }
      e: {
        var i = e, o = n.return, s = n, u = t;
        if (t = re, s.flags |= 32768, u !== null && typeof u == "object" && typeof u.then == "function") {
          var c = u, g = s, m = g.tag;
          if (!(g.mode & 1) && (m === 0 || m === 11 || m === 15)) {
            var h = g.alternate;
            h ? (g.updateQueue = h.updateQueue, g.memoizedState = h.memoizedState, g.lanes = h.lanes) : (g.updateQueue = null, g.memoizedState = null);
          }
          var v = Ws(o);
          if (v !== null) {
            v.flags &= -257, Qs(v, o, s, i, t), v.mode & 1 && Vs(i, c, t), t = v, u = c;
            var w = t.updateQueue;
            if (w === null) {
              var k = /* @__PURE__ */ new Set();
              k.add(u), t.updateQueue = k;
            } else w.add(u);
            break e;
          } else {
            if (!(t & 1)) {
              Vs(i, c, t), Ko();
              break e;
            }
            u = Error(x(426));
          }
        } else if ($ && s.mode & 1) {
          var D = Ws(o);
          if (D !== null) {
            !(D.flags & 65536) && (D.flags |= 256), Qs(D, o, s, i, t), _o(dn(u, s));
            break e;
          }
        }
        i = u = dn(u, s), Z !== 4 && (Z = 2), Hn === null ? Hn = [i] : Hn.push(i), i = o;
        do {
          switch (i.tag) {
            case 3:
              i.flags |= 65536, t &= -t, i.lanes |= t;
              var f = qa(i, u, t);
              Fs(i, f);
              break e;
            case 1:
              s = u;
              var a = i.type, d = i.stateNode;
              if (!(i.flags & 128) && (typeof a.getDerivedStateFromError == "function" || d !== null && typeof d.componentDidCatch == "function" && (mt === null || !mt.has(d)))) {
                i.flags |= 65536, t &= -t, i.lanes |= t;
                var y = ba(i, s, t);
                Fs(i, y);
                break e;
              }
          }
          i = i.return;
        } while (i !== null);
      }
      yc(n);
    } catch (E) {
      t = E, G === n && n !== null && (G = n = n.return);
      continue;
    }
    break;
  } while (!0);
}
function gc() {
  var e = ul.current;
  return ul.current = sl, e === null ? sl : e;
}
function Ko() {
  (Z === 0 || Z === 3 || Z === 2) && (Z = 4), te === null || !(Ot & 268435455) && !(El & 268435455) || st(te, re);
}
function fl(e, t) {
  var n = R;
  R |= 2;
  var r = gc();
  (te !== e || re !== t) && (Qe = null, Tt(e, t));
  do
    try {
      Hd();
      break;
    } catch (l) {
      mc(e, l);
    }
  while (!0);
  if (Po(), R = n, ul.current = r, G !== null) throw Error(x(261));
  return te = null, re = 0, Z;
}
function Hd() {
  for (; G !== null; ) vc(G);
}
function Vd() {
  for (; G !== null && !hf(); ) vc(G);
}
function vc(e) {
  var t = kc(e.alternate, e, ye);
  e.memoizedProps = e.pendingProps, t === null ? yc(e) : G = t, Uo.current = null;
}
function yc(e) {
  var t = e;
  do {
    var n = t.alternate;
    if (e = t.return, t.flags & 32768) {
      if (n = Id(n, t), n !== null) {
        n.flags &= 32767, G = n;
        return;
      }
      if (e !== null) e.flags |= 32768, e.subtreeFlags = 0, e.deletions = null;
      else {
        Z = 6, G = null;
        return;
      }
    } else if (n = Od(n, t, ye), n !== null) {
      G = n;
      return;
    }
    if (t = t.sibling, t !== null) {
      G = t;
      return;
    }
    G = t = e;
  } while (t !== null);
  Z === 0 && (Z = 5);
}
function _t(e, t, n) {
  var r = M, l = ze.transition;
  try {
    ze.transition = null, M = 1, Wd(e, t, n, r);
  } finally {
    ze.transition = l, M = r;
  }
  return null;
}
function Wd(e, t, n, r) {
  do
    on();
  while (at !== null);
  if (R & 6) throw Error(x(327));
  n = e.finishedWork;
  var l = e.finishedLanes;
  if (n === null) return null;
  if (e.finishedWork = null, e.finishedLanes = 0, n === e.current) throw Error(x(177));
  e.callbackNode = null, e.callbackPriority = 0;
  var i = n.lanes | n.childLanes;
  if (Cf(e, i), e === te && (G = te = null, re = 0), !(n.subtreeFlags & 2064) && !(n.flags & 2064) || zr || (zr = !0, wc(Kr, function() {
    return on(), null;
  })), i = (n.flags & 15990) !== 0, n.subtreeFlags & 15990 || i) {
    i = ze.transition, ze.transition = null;
    var o = M;
    M = 1;
    var s = R;
    R |= 4, Uo.current = null, $d(e, n), dc(n, e), cd(Ri), Gr = !!Li, Ri = Li = null, e.current = n, Ad(n), mf(), R = s, M = o, ze.transition = i;
  } else e.current = n;
  if (zr && (zr = !1, at = e, cl = l), i = e.pendingLanes, i === 0 && (mt = null), yf(n.stateNode), ve(e, Y()), t !== null) for (r = e.onRecoverableError, n = 0; n < t.length; n++) l = t[n], r(l.value, { componentStack: l.stack, digest: l.digest });
  if (al) throw al = !1, e = qi, qi = null, e;
  return cl & 1 && e.tag !== 0 && on(), i = e.pendingLanes, i & 1 ? e === bi ? Vn++ : (Vn = 0, bi = e) : Vn = 0, St(), null;
}
function on() {
  if (at !== null) {
    var e = qu(cl), t = ze.transition, n = M;
    try {
      if (ze.transition = null, M = 16 > e ? 16 : e, at === null) var r = !1;
      else {
        if (e = at, at = null, cl = 0, R & 6) throw Error(x(331));
        var l = R;
        for (R |= 4, S = e.current; S !== null; ) {
          var i = S, o = i.child;
          if (S.flags & 16) {
            var s = i.deletions;
            if (s !== null) {
              for (var u = 0; u < s.length; u++) {
                var c = s[u];
                for (S = c; S !== null; ) {
                  var g = S;
                  switch (g.tag) {
                    case 0:
                    case 11:
                    case 15:
                      Un(8, g, i);
                  }
                  var m = g.child;
                  if (m !== null) m.return = g, S = m;
                  else for (; S !== null; ) {
                    g = S;
                    var h = g.sibling, v = g.return;
                    if (ac(g), g === c) {
                      S = null;
                      break;
                    }
                    if (h !== null) {
                      h.return = v, S = h;
                      break;
                    }
                    S = v;
                  }
                }
              }
              var w = i.alternate;
              if (w !== null) {
                var k = w.child;
                if (k !== null) {
                  w.child = null;
                  do {
                    var D = k.sibling;
                    k.sibling = null, k = D;
                  } while (k !== null);
                }
              }
              S = i;
            }
          }
          if (i.subtreeFlags & 2064 && o !== null) o.return = i, S = o;
          else e: for (; S !== null; ) {
            if (i = S, i.flags & 2048) switch (i.tag) {
              case 0:
              case 11:
              case 15:
                Un(9, i, i.return);
            }
            var f = i.sibling;
            if (f !== null) {
              f.return = i.return, S = f;
              break e;
            }
            S = i.return;
          }
        }
        var a = e.current;
        for (S = a; S !== null; ) {
          o = S;
          var d = o.child;
          if (o.subtreeFlags & 2064 && d !== null) d.return = o, S = d;
          else e: for (o = a; S !== null; ) {
            if (s = S, s.flags & 2048) try {
              switch (s.tag) {
                case 0:
                case 11:
                case 15:
                  Sl(9, s);
              }
            } catch (E) {
              H(s, s.return, E);
            }
            if (s === o) {
              S = null;
              break e;
            }
            var y = s.sibling;
            if (y !== null) {
              y.return = s.return, S = y;
              break e;
            }
            S = s.return;
          }
        }
        if (R = l, St(), Ve && typeof Ve.onPostCommitFiberRoot == "function") try {
          Ve.onPostCommitFiberRoot(hl, e);
        } catch {
        }
        r = !0;
      }
      return r;
    } finally {
      M = n, ze.transition = t;
    }
  }
  return !1;
}
function lu(e, t, n) {
  t = dn(n, t), t = qa(e, t, 1), e = ht(e, t, 1), t = ce(), e !== null && (ur(e, 1, t), ve(e, t));
}
function H(e, t, n) {
  if (e.tag === 3) lu(e, e, n);
  else for (; t !== null; ) {
    if (t.tag === 3) {
      lu(t, e, n);
      break;
    } else if (t.tag === 1) {
      var r = t.stateNode;
      if (typeof t.type.getDerivedStateFromError == "function" || typeof r.componentDidCatch == "function" && (mt === null || !mt.has(r))) {
        e = dn(n, e), e = ba(t, e, 1), t = ht(t, e, 1), e = ce(), t !== null && (ur(t, 1, e), ve(t, e));
        break;
      }
    }
    t = t.return;
  }
}
function Qd(e, t, n) {
  var r = e.pingCache;
  r !== null && r.delete(t), t = ce(), e.pingedLanes |= e.suspendedLanes & n, te === e && (re & n) === n && (Z === 4 || Z === 3 && (re & 130023424) === re && 500 > Y() - Vo ? Tt(e, 0) : Ho |= n), ve(e, t);
}
function xc(e, t) {
  t === 0 && (e.mode & 1 ? (t = xr, xr <<= 1, !(xr & 130023424) && (xr = 4194304)) : t = 1);
  var n = ce();
  e = et(e, t), e !== null && (ur(e, t, n), ve(e, n));
}
function Kd(e) {
  var t = e.memoizedState, n = 0;
  t !== null && (n = t.retryLane), xc(e, n);
}
function Yd(e, t) {
  var n = 0;
  switch (e.tag) {
    case 13:
      var r = e.stateNode, l = e.memoizedState;
      l !== null && (n = l.retryLane);
      break;
    case 19:
      r = e.stateNode;
      break;
    default:
      throw Error(x(314));
  }
  r !== null && r.delete(t), xc(e, n);
}
var kc;
kc = function(e, t, n) {
  if (e !== null) if (e.memoizedProps !== t.pendingProps || me.current) he = !0;
  else {
    if (!(e.lanes & n) && !(t.flags & 128)) return he = !1, Dd(e, t, n);
    he = !!(e.flags & 131072);
  }
  else he = !1, $ && t.flags & 1048576 && Ca(t, tl, t.index);
  switch (t.lanes = 0, t.tag) {
    case 2:
      var r = t.type;
      Ar(e, t), e = t.pendingProps;
      var l = un(t, ue.current);
      ln(t, n), l = Io(null, t, r, e, l, n);
      var i = Fo();
      return t.flags |= 1, typeof l == "object" && l !== null && typeof l.render == "function" && l.$$typeof === void 0 ? (t.tag = 1, t.memoizedState = null, t.updateQueue = null, ge(r) ? (i = !0, br(t)) : i = !1, t.memoizedState = l.state !== null && l.state !== void 0 ? l.state : null, Lo(t), l.updater = wl, t.stateNode = l, l._reactInternals = t, Ui(t, r, e, n), t = Wi(null, t, r, !0, i, n)) : (t.tag = 0, $ && i && Co(t), ae(null, t, l, n), t = t.child), t;
    case 16:
      r = t.elementType;
      e: {
        switch (Ar(e, t), e = t.pendingProps, l = r._init, r = l(r._payload), t.type = r, l = t.tag = Xd(r), e = De(r, e), l) {
          case 0:
            t = Vi(null, t, r, e, n);
            break e;
          case 1:
            t = Gs(null, t, r, e, n);
            break e;
          case 11:
            t = Ks(null, t, r, e, n);
            break e;
          case 14:
            t = Ys(null, t, r, De(r.type, e), n);
            break e;
        }
        throw Error(x(
          306,
          r,
          ""
        ));
      }
      return t;
    case 0:
      return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : De(r, l), Vi(e, t, r, l, n);
    case 1:
      return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : De(r, l), Gs(e, t, r, l, n);
    case 3:
      e: {
        if (rc(t), e === null) throw Error(x(387));
        r = t.pendingProps, i = t.memoizedState, l = i.element, Ta(e, t), ll(t, r, null, n);
        var o = t.memoizedState;
        if (r = o.element, i.isDehydrated) if (i = { element: r, isDehydrated: !1, cache: o.cache, pendingSuspenseBoundaries: o.pendingSuspenseBoundaries, transitions: o.transitions }, t.updateQueue.baseState = i, t.memoizedState = i, t.flags & 256) {
          l = dn(Error(x(423)), t), t = Xs(e, t, r, n, l);
          break e;
        } else if (r !== l) {
          l = dn(Error(x(424)), t), t = Xs(e, t, r, n, l);
          break e;
        } else for (xe = pt(t.stateNode.containerInfo.firstChild), ke = t, $ = !0, Ie = null, n = Pa(t, null, r, n), t.child = n; n; ) n.flags = n.flags & -3 | 4096, n = n.sibling;
        else {
          if (an(), r === l) {
            t = tt(e, t, n);
            break e;
          }
          ae(e, t, r, n);
        }
        t = t.child;
      }
      return t;
    case 5:
      return La(t), e === null && $i(t), r = t.type, l = t.pendingProps, i = e !== null ? e.memoizedProps : null, o = l.children, Mi(r, l) ? o = null : i !== null && Mi(r, i) && (t.flags |= 32), nc(e, t), ae(e, t, o, n), t.child;
    case 6:
      return e === null && $i(t), null;
    case 13:
      return lc(e, t, n);
    case 4:
      return Ro(t, t.stateNode.containerInfo), r = t.pendingProps, e === null ? t.child = cn(t, null, r, n) : ae(e, t, r, n), t.child;
    case 11:
      return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : De(r, l), Ks(e, t, r, l, n);
    case 7:
      return ae(e, t, t.pendingProps, n), t.child;
    case 8:
      return ae(e, t, t.pendingProps.children, n), t.child;
    case 12:
      return ae(e, t, t.pendingProps.children, n), t.child;
    case 10:
      e: {
        if (r = t.type._context, l = t.pendingProps, i = t.memoizedProps, o = l.value, O(nl, r._currentValue), r._currentValue = o, i !== null) if (Ae(i.value, o)) {
          if (i.children === l.children && !me.current) {
            t = tt(e, t, n);
            break e;
          }
        } else for (i = t.child, i !== null && (i.return = t); i !== null; ) {
          var s = i.dependencies;
          if (s !== null) {
            o = i.child;
            for (var u = s.firstContext; u !== null; ) {
              if (u.context === r) {
                if (i.tag === 1) {
                  u = Je(-1, n & -n), u.tag = 2;
                  var c = i.updateQueue;
                  if (c !== null) {
                    c = c.shared;
                    var g = c.pending;
                    g === null ? u.next = u : (u.next = g.next, g.next = u), c.pending = u;
                  }
                }
                i.lanes |= n, u = i.alternate, u !== null && (u.lanes |= n), Ai(
                  i.return,
                  n,
                  t
                ), s.lanes |= n;
                break;
              }
              u = u.next;
            }
          } else if (i.tag === 10) o = i.type === t.type ? null : i.child;
          else if (i.tag === 18) {
            if (o = i.return, o === null) throw Error(x(341));
            o.lanes |= n, s = o.alternate, s !== null && (s.lanes |= n), Ai(o, n, t), o = i.sibling;
          } else o = i.child;
          if (o !== null) o.return = i;
          else for (o = i; o !== null; ) {
            if (o === t) {
              o = null;
              break;
            }
            if (i = o.sibling, i !== null) {
              i.return = o.return, o = i;
              break;
            }
            o = o.return;
          }
          i = o;
        }
        ae(e, t, l.children, n), t = t.child;
      }
      return t;
    case 9:
      return l = t.type, r = t.pendingProps.children, ln(t, n), l = Te(l), r = r(l), t.flags |= 1, ae(e, t, r, n), t.child;
    case 14:
      return r = t.type, l = De(r, t.pendingProps), l = De(r.type, l), Ys(e, t, r, l, n);
    case 15:
      return ec(e, t, t.type, t.pendingProps, n);
    case 17:
      return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : De(r, l), Ar(e, t), t.tag = 1, ge(r) ? (e = !0, br(t)) : e = !1, ln(t, n), Ja(t, r, l), Ui(t, r, l, n), Wi(null, t, r, !0, e, n);
    case 19:
      return ic(e, t, n);
    case 22:
      return tc(e, t, n);
  }
  throw Error(x(156, t.tag));
};
function wc(e, t) {
  return Gu(e, t);
}
function Gd(e, t, n, r) {
  this.tag = e, this.key = n, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = r, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
}
function Pe(e, t, n, r) {
  return new Gd(e, t, n, r);
}
function Yo(e) {
  return e = e.prototype, !(!e || !e.isReactComponent);
}
function Xd(e) {
  if (typeof e == "function") return Yo(e) ? 1 : 0;
  if (e != null) {
    if (e = e.$$typeof, e === fo) return 11;
    if (e === po) return 14;
  }
  return 2;
}
function vt(e, t) {
  var n = e.alternate;
  return n === null ? (n = Pe(e.tag, t, e.key, e.mode), n.elementType = e.elementType, n.type = e.type, n.stateNode = e.stateNode, n.alternate = e, e.alternate = n) : (n.pendingProps = t, n.type = e.type, n.flags = 0, n.subtreeFlags = 0, n.deletions = null), n.flags = e.flags & 14680064, n.childLanes = e.childLanes, n.lanes = e.lanes, n.child = e.child, n.memoizedProps = e.memoizedProps, n.memoizedState = e.memoizedState, n.updateQueue = e.updateQueue, t = e.dependencies, n.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }, n.sibling = e.sibling, n.index = e.index, n.ref = e.ref, n;
}
function Hr(e, t, n, r, l, i) {
  var o = 2;
  if (r = e, typeof e == "function") Yo(e) && (o = 1);
  else if (typeof e == "string") o = 5;
  else e: switch (e) {
    case Vt:
      return Lt(n.children, l, i, t);
    case co:
      o = 8, l |= 8;
      break;
    case fi:
      return e = Pe(12, n, t, l | 2), e.elementType = fi, e.lanes = i, e;
    case di:
      return e = Pe(13, n, t, l), e.elementType = di, e.lanes = i, e;
    case pi:
      return e = Pe(19, n, t, l), e.elementType = pi, e.lanes = i, e;
    case Lu:
      return Cl(n, l, i, t);
    default:
      if (typeof e == "object" && e !== null) switch (e.$$typeof) {
        case zu:
          o = 10;
          break e;
        case Tu:
          o = 9;
          break e;
        case fo:
          o = 11;
          break e;
        case po:
          o = 14;
          break e;
        case lt:
          o = 16, r = null;
          break e;
      }
      throw Error(x(130, e == null ? e : typeof e, ""));
  }
  return t = Pe(o, n, t, l), t.elementType = e, t.type = r, t.lanes = i, t;
}
function Lt(e, t, n, r) {
  return e = Pe(7, e, r, t), e.lanes = n, e;
}
function Cl(e, t, n, r) {
  return e = Pe(22, e, r, t), e.elementType = Lu, e.lanes = n, e.stateNode = { isHidden: !1 }, e;
}
function li(e, t, n) {
  return e = Pe(6, e, null, t), e.lanes = n, e;
}
function ii(e, t, n) {
  return t = Pe(4, e.children !== null ? e.children : [], e.key, t), t.lanes = n, t.stateNode = { containerInfo: e.containerInfo, pendingChildren: null, implementation: e.implementation }, t;
}
function Zd(e, t, n, r, l) {
  this.tag = t, this.containerInfo = e, this.finishedWork = this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.pendingContext = this.context = null, this.callbackPriority = 0, this.eventTimes = Al(0), this.expirationTimes = Al(-1), this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Al(0), this.identifierPrefix = r, this.onRecoverableError = l, this.mutableSourceEagerHydrationData = null;
}
function Go(e, t, n, r, l, i, o, s, u) {
  return e = new Zd(e, t, n, s, u), t === 1 ? (t = 1, i === !0 && (t |= 8)) : t = 0, i = Pe(3, null, null, t), e.current = i, i.stateNode = e, i.memoizedState = { element: r, isDehydrated: n, cache: null, transitions: null, pendingSuspenseBoundaries: null }, Lo(i), e;
}
function Jd(e, t, n) {
  var r = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
  return { $$typeof: Ht, key: r == null ? null : "" + r, children: e, containerInfo: t, implementation: n };
}
function Sc(e) {
  if (!e) return xt;
  e = e._reactInternals;
  e: {
    if ($t(e) !== e || e.tag !== 1) throw Error(x(170));
    var t = e;
    do {
      switch (t.tag) {
        case 3:
          t = t.stateNode.context;
          break e;
        case 1:
          if (ge(t.type)) {
            t = t.stateNode.__reactInternalMemoizedMergedChildContext;
            break e;
          }
      }
      t = t.return;
    } while (t !== null);
    throw Error(x(171));
  }
  if (e.tag === 1) {
    var n = e.type;
    if (ge(n)) return Sa(e, n, t);
  }
  return t;
}
function Ec(e, t, n, r, l, i, o, s, u) {
  return e = Go(n, r, !0, e, l, i, o, s, u), e.context = Sc(null), n = e.current, r = ce(), l = gt(n), i = Je(r, l), i.callback = t ?? null, ht(n, i, l), e.current.lanes = l, ur(e, l, r), ve(e, r), e;
}
function Nl(e, t, n, r) {
  var l = t.current, i = ce(), o = gt(l);
  return n = Sc(n), t.context === null ? t.context = n : t.pendingContext = n, t = Je(i, o), t.payload = { element: e }, r = r === void 0 ? null : r, r !== null && (t.callback = r), e = ht(l, t, o), e !== null && ($e(e, l, o, i), Ir(e, l, o)), o;
}
function dl(e) {
  if (e = e.current, !e.child) return null;
  switch (e.child.tag) {
    case 5:
      return e.child.stateNode;
    default:
      return e.child.stateNode;
  }
}
function iu(e, t) {
  if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
    var n = e.retryLane;
    e.retryLane = n !== 0 && n < t ? n : t;
  }
}
function Xo(e, t) {
  iu(e, t), (e = e.alternate) && iu(e, t);
}
function qd() {
  return null;
}
var Cc = typeof reportError == "function" ? reportError : function(e) {
  console.error(e);
};
function Zo(e) {
  this._internalRoot = e;
}
_l.prototype.render = Zo.prototype.render = function(e) {
  var t = this._internalRoot;
  if (t === null) throw Error(x(409));
  Nl(e, t, null, null);
};
_l.prototype.unmount = Zo.prototype.unmount = function() {
  var e = this._internalRoot;
  if (e !== null) {
    this._internalRoot = null;
    var t = e.containerInfo;
    It(function() {
      Nl(null, e, null, null);
    }), t[be] = null;
  }
};
function _l(e) {
  this._internalRoot = e;
}
_l.prototype.unstable_scheduleHydration = function(e) {
  if (e) {
    var t = ta();
    e = { blockedOn: null, target: e, priority: t };
    for (var n = 0; n < ot.length && t !== 0 && t < ot[n].priority; n++) ;
    ot.splice(n, 0, e), n === 0 && ra(e);
  }
};
function Jo(e) {
  return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11);
}
function jl(e) {
  return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11 && (e.nodeType !== 8 || e.nodeValue !== " react-mount-point-unstable "));
}
function ou() {
}
function bd(e, t, n, r, l) {
  if (l) {
    if (typeof r == "function") {
      var i = r;
      r = function() {
        var c = dl(o);
        i.call(c);
      };
    }
    var o = Ec(t, r, e, 0, null, !1, !1, "", ou);
    return e._reactRootContainer = o, e[be] = o.current, qn(e.nodeType === 8 ? e.parentNode : e), It(), o;
  }
  for (; l = e.lastChild; ) e.removeChild(l);
  if (typeof r == "function") {
    var s = r;
    r = function() {
      var c = dl(u);
      s.call(c);
    };
  }
  var u = Go(e, 0, !1, null, null, !1, !1, "", ou);
  return e._reactRootContainer = u, e[be] = u.current, qn(e.nodeType === 8 ? e.parentNode : e), It(function() {
    Nl(t, u, n, r);
  }), u;
}
function Pl(e, t, n, r, l) {
  var i = n._reactRootContainer;
  if (i) {
    var o = i;
    if (typeof l == "function") {
      var s = l;
      l = function() {
        var u = dl(o);
        s.call(u);
      };
    }
    Nl(t, o, e, l);
  } else o = bd(n, t, e, l, r);
  return dl(o);
}
bu = function(e) {
  switch (e.tag) {
    case 3:
      var t = e.stateNode;
      if (t.current.memoizedState.isDehydrated) {
        var n = Ln(t.pendingLanes);
        n !== 0 && (go(t, n | 1), ve(t, Y()), !(R & 6) && (pn = Y() + 500, St()));
      }
      break;
    case 13:
      It(function() {
        var r = et(e, 1);
        if (r !== null) {
          var l = ce();
          $e(r, e, 1, l);
        }
      }), Xo(e, 1);
  }
};
vo = function(e) {
  if (e.tag === 13) {
    var t = et(e, 134217728);
    if (t !== null) {
      var n = ce();
      $e(t, e, 134217728, n);
    }
    Xo(e, 134217728);
  }
};
ea = function(e) {
  if (e.tag === 13) {
    var t = gt(e), n = et(e, t);
    if (n !== null) {
      var r = ce();
      $e(n, e, t, r);
    }
    Xo(e, t);
  }
};
ta = function() {
  return M;
};
na = function(e, t) {
  var n = M;
  try {
    return M = e, t();
  } finally {
    M = n;
  }
};
Ei = function(e, t, n) {
  switch (t) {
    case "input":
      if (gi(e, n), t = n.name, n.type === "radio" && t != null) {
        for (n = e; n.parentNode; ) n = n.parentNode;
        for (n = n.querySelectorAll("input[name=" + JSON.stringify("" + t) + '][type="radio"]'), t = 0; t < n.length; t++) {
          var r = n[t];
          if (r !== e && r.form === e.form) {
            var l = yl(r);
            if (!l) throw Error(x(90));
            Mu(r), gi(r, l);
          }
        }
      }
      break;
    case "textarea":
      Ou(e, n);
      break;
    case "select":
      t = n.value, t != null && en(e, !!n.multiple, t, !1);
  }
};
Hu = Wo;
Vu = It;
var ep = { usingClientEntryPoint: !1, Events: [cr, Yt, yl, Bu, Uu, Wo] }, jn = { findFiberByHostInstance: jt, bundleType: 0, version: "18.3.1", rendererPackageName: "react-dom" }, tp = { bundleType: jn.bundleType, version: jn.version, rendererPackageName: jn.rendererPackageName, rendererConfig: jn.rendererConfig, overrideHookState: null, overrideHookStateDeletePath: null, overrideHookStateRenamePath: null, overrideProps: null, overridePropsDeletePath: null, overridePropsRenamePath: null, setErrorHandler: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: nt.ReactCurrentDispatcher, findHostInstanceByFiber: function(e) {
  return e = Ku(e), e === null ? null : e.stateNode;
}, findFiberByHostInstance: jn.findFiberByHostInstance || qd, findHostInstancesForRefresh: null, scheduleRefresh: null, scheduleRoot: null, setRefreshHandler: null, getCurrentFiber: null, reconcilerVersion: "18.3.1-next-f1338f8080-20240426" };
if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
  var Tr = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (!Tr.isDisabled && Tr.supportsFiber) try {
    hl = Tr.inject(tp), Ve = Tr;
  } catch {
  }
}
Se.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = ep;
Se.createPortal = function(e, t) {
  var n = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
  if (!Jo(t)) throw Error(x(200));
  return Jd(e, t, null, n);
};
Se.createRoot = function(e, t) {
  if (!Jo(e)) throw Error(x(299));
  var n = !1, r = "", l = Cc;
  return t != null && (t.unstable_strictMode === !0 && (n = !0), t.identifierPrefix !== void 0 && (r = t.identifierPrefix), t.onRecoverableError !== void 0 && (l = t.onRecoverableError)), t = Go(e, 1, !1, null, null, n, !1, r, l), e[be] = t.current, qn(e.nodeType === 8 ? e.parentNode : e), new Zo(t);
};
Se.findDOMNode = function(e) {
  if (e == null) return null;
  if (e.nodeType === 1) return e;
  var t = e._reactInternals;
  if (t === void 0)
    throw typeof e.render == "function" ? Error(x(188)) : (e = Object.keys(e).join(","), Error(x(268, e)));
  return e = Ku(t), e = e === null ? null : e.stateNode, e;
};
Se.flushSync = function(e) {
  return It(e);
};
Se.hydrate = function(e, t, n) {
  if (!jl(t)) throw Error(x(200));
  return Pl(null, e, t, !0, n);
};
Se.hydrateRoot = function(e, t, n) {
  if (!Jo(e)) throw Error(x(405));
  var r = n != null && n.hydratedSources || null, l = !1, i = "", o = Cc;
  if (n != null && (n.unstable_strictMode === !0 && (l = !0), n.identifierPrefix !== void 0 && (i = n.identifierPrefix), n.onRecoverableError !== void 0 && (o = n.onRecoverableError)), t = Ec(t, null, e, 1, n ?? null, l, !1, i, o), e[be] = t.current, qn(e), r) for (e = 0; e < r.length; e++) n = r[e], l = n._getVersion, l = l(n._source), t.mutableSourceEagerHydrationData == null ? t.mutableSourceEagerHydrationData = [n, l] : t.mutableSourceEagerHydrationData.push(
    n,
    l
  );
  return new _l(t);
};
Se.render = function(e, t, n) {
  if (!jl(t)) throw Error(x(200));
  return Pl(null, e, t, !1, n);
};
Se.unmountComponentAtNode = function(e) {
  if (!jl(e)) throw Error(x(40));
  return e._reactRootContainer ? (It(function() {
    Pl(null, null, e, !1, function() {
      e._reactRootContainer = null, e[be] = null;
    });
  }), !0) : !1;
};
Se.unstable_batchedUpdates = Wo;
Se.unstable_renderSubtreeIntoContainer = function(e, t, n, r) {
  if (!jl(n)) throw Error(x(200));
  if (e == null || e._reactInternals === void 0) throw Error(x(38));
  return Pl(e, t, n, !1, r);
};
Se.version = "18.3.1-next-f1338f8080-20240426";
function Nc() {
  if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
    try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(Nc);
    } catch (e) {
      console.error(e);
    }
}
Nc(), Nu.exports = Se;
var np = Nu.exports, _c, su = np;
_c = su.createRoot, su.hydrateRoot;
const rp = "#c62a3f", lp = "#20232b";
function jc(e) {
  return e === "H" || e === "D" ? rp : lp;
}
const ip = {
  H: "M50 87 C50 87 11 59 11 33 C11 19 21 11 32 11 C41 11 47 16 50 24 C53 16 59 11 68 11 C79 11 89 19 89 33 C89 59 50 87 50 87 Z",
  D: "M50 7 L87 50 L50 93 L13 50 Z",
  S: "M50 8 C50 8 13 41 13 61 C13 73 21 79 30 79 C35 79 39 77 42 73 C41 83 37 89 29 93 L71 93 C63 89 59 83 58 73 C61 77 65 79 70 79 C79 79 87 73 87 61 C87 41 50 8 50 8 Z",
  C: "M50 8 C41 8 34 15 34 24 C34 29 36 33 40 36 C33 32 23 33 17 39 C10 46 10 57 17 64 C23 70 33 71 40 67 C37 75 32 81 25 85 L75 85 C68 81 63 75 60 67 C67 71 77 70 83 64 C90 57 90 46 83 39 C77 33 67 32 60 36 C64 33 66 29 66 24 C66 15 59 8 50 8 Z"
};
function hn({
  suit: e,
  cx: t,
  cy: n,
  size: r,
  flip: l = !1,
  color: i
}) {
  const o = r / 100;
  return /* @__PURE__ */ p.jsx(
    "g",
    {
      transform: `translate(${t} ${n}) rotate(${l ? 180 : 0}) scale(${o}) translate(-50 -50)`,
      fill: i ?? jc(e),
      children: /* @__PURE__ */ p.jsx("path", { d: ip[e] })
    }
  );
}
function op({ className: e, style: t }) {
  return /* @__PURE__ */ p.jsxs("svg", { viewBox: "0 0 100 140", className: e, style: t, children: [
    /* @__PURE__ */ p.jsx("rect", { x: "0.5", y: "0.5", width: "99", height: "139", rx: "9", fill: "#a11228", stroke: "rgba(0,0,0,0.2)" }),
    /* @__PURE__ */ p.jsx("rect", { x: "9", y: "9", width: "82", height: "122", rx: "5", fill: "#8d0f22" }),
    /* @__PURE__ */ p.jsx(
      "rect",
      {
        x: "5.5",
        y: "5.5",
        width: "89",
        height: "129",
        rx: "6.5",
        fill: "none",
        stroke: "#f6dade",
        strokeOpacity: "0.55",
        strokeWidth: "1.3"
      }
    ),
    /* @__PURE__ */ p.jsx(
      "rect",
      {
        x: "12",
        y: "12",
        width: "76",
        height: "116",
        rx: "3.5",
        fill: "none",
        stroke: "#f6dade",
        strokeOpacity: "0.28",
        strokeWidth: "1"
      }
    ),
    /* @__PURE__ */ p.jsx("circle", { cx: "50", cy: "70", r: "17", fill: "#a11228", stroke: "#f6dade", strokeOpacity: "0.5", strokeWidth: "1.2" }),
    /* @__PURE__ */ p.jsx(hn, { suit: "S", cx: 50, cy: 70, size: 20, color: "#f6dade" })
  ] });
}
const Q = 32, Ce = 50, K = 68, q = 40, b = 100, Ne = 70, Mn = 58, Dn = 82, uu = (q + Ne) / 2, sp = (Ne + b) / 2, up = (q + Mn) / 2, ap = (Dn + b) / 2, cp = {
  2: [{ x: Ce, y: q }, { x: Ce, y: b }],
  3: [{ x: Ce, y: q }, { x: Ce, y: Ne }, { x: Ce, y: b }],
  4: [{ x: Q, y: q }, { x: K, y: q }, { x: Q, y: b }, { x: K, y: b }],
  5: [{ x: Q, y: q }, { x: K, y: q }, { x: Ce, y: Ne }, { x: Q, y: b }, { x: K, y: b }],
  6: [{ x: Q, y: q }, { x: K, y: q }, { x: Q, y: Ne }, { x: K, y: Ne }, { x: Q, y: b }, { x: K, y: b }],
  7: [
    { x: Q, y: q },
    { x: K, y: q },
    { x: Ce, y: uu },
    { x: Q, y: Ne },
    { x: K, y: Ne },
    { x: Q, y: b },
    { x: K, y: b }
  ],
  8: [
    { x: Q, y: q },
    { x: K, y: q },
    { x: Ce, y: uu },
    { x: Q, y: Ne },
    { x: K, y: Ne },
    { x: Ce, y: sp },
    { x: Q, y: b },
    { x: K, y: b }
  ],
  9: [
    { x: Q, y: q },
    { x: K, y: q },
    { x: Q, y: Mn },
    { x: K, y: Mn },
    { x: Ce, y: Ne },
    { x: Q, y: Dn },
    { x: K, y: Dn },
    { x: Q, y: b },
    { x: K, y: b }
  ],
  10: [
    { x: Q, y: q },
    { x: K, y: q },
    { x: Ce, y: up },
    { x: Q, y: Mn },
    { x: K, y: Mn },
    { x: Q, y: Dn },
    { x: K, y: Dn },
    { x: Ce, y: ap },
    { x: Q, y: b },
    { x: K, y: b }
  ]
}, fp = Ne, Pc = "Georgia, 'Times New Roman', 'Playfair Display', serif";
function au({ rank: e, suit: t, color: n }) {
  const r = e === "10";
  return /* @__PURE__ */ p.jsxs("g", { fill: n, children: [
    /* @__PURE__ */ p.jsx(
      "text",
      {
        x: r ? 11 : 10,
        y: "20",
        fontSize: r ? 13 : 16,
        fontWeight: 800,
        fontFamily: Pc,
        textAnchor: "middle",
        children: e
      }
    ),
    /* @__PURE__ */ p.jsx(hn, { suit: t, cx: 10, cy: 32, size: 12, color: n })
  ] });
}
function dp({ rank: e, suit: t, color: n }) {
  return /* @__PURE__ */ p.jsxs("g", { children: [
    /* @__PURE__ */ p.jsx("rect", { x: "16", y: "24", width: "68", height: "92", rx: "6", fill: n, fillOpacity: "0.045" }),
    /* @__PURE__ */ p.jsx(
      "rect",
      {
        x: "16",
        y: "24",
        width: "68",
        height: "92",
        rx: "6",
        fill: "none",
        stroke: n,
        strokeOpacity: "0.3",
        strokeWidth: "1.3"
      }
    ),
    /* @__PURE__ */ p.jsx(hn, { suit: t, cx: 50, cy: 41, size: 20, color: n }),
    /* @__PURE__ */ p.jsx(
      "text",
      {
        x: "50",
        y: "86",
        fontSize: "42",
        fontWeight: 800,
        fontFamily: Pc,
        textAnchor: "middle",
        fill: n,
        children: e
      }
    ),
    /* @__PURE__ */ p.jsx(hn, { suit: t, cx: 50, cy: 104, size: 17, flip: !0, color: n })
  ] });
}
function no({ rank: e, suit: t, faceDown: n, className: r, style: l }) {
  if (n) return /* @__PURE__ */ p.jsx(op, { className: r, style: l });
  const i = jc(t), o = e === "J" || e === "Q" || e === "K", s = cp[e];
  return /* @__PURE__ */ p.jsxs("svg", { viewBox: "0 0 100 140", className: r, style: l, children: [
    /* @__PURE__ */ p.jsx("rect", { x: "0.5", y: "0.5", width: "99", height: "139", rx: "9", fill: "#fdfdfb", stroke: "rgba(20,20,30,0.14)" }),
    /* @__PURE__ */ p.jsx(au, { rank: e, suit: t, color: i }),
    /* @__PURE__ */ p.jsx("g", { transform: "rotate(180 50 70)", children: /* @__PURE__ */ p.jsx(au, { rank: e, suit: t, color: i }) }),
    e === "A" ? /* @__PURE__ */ p.jsx(hn, { suit: t, cx: 50, cy: 70, size: 46, color: i }) : o ? /* @__PURE__ */ p.jsx(dp, { rank: e, suit: t, color: i }) : s?.map((u, c) => /* @__PURE__ */ p.jsx(hn, { suit: t, cx: u.x, cy: u.y, size: 20, flip: u.y > fp, color: i }, c))
  ] });
}
const pp = [1, 5, 25, 100, 500], hp = {
  1: { base: "#eef1f5", edge: "#c3cbd6", text: "#2a2f3a" },
  5: { base: "#d6363b", edge: "#f4b8ba", text: "#ffffff" },
  25: { base: "#2f9e57", edge: "#bce7cd", text: "#ffffff" },
  100: { base: "#2b2f38", edge: "#8791a0", text: "#ffffff" },
  500: { base: "#7b3fb2", edge: "#d6bcee", text: "#ffffff" }
};
function mp({ value: e, size: t = 58 }) {
  const n = hp[e];
  return /* @__PURE__ */ p.jsxs("svg", { viewBox: "0 0 100 100", width: t, height: t, "aria-label": `$${e} chip`, children: [
    /* @__PURE__ */ p.jsx("circle", { cx: "50", cy: "50", r: "48", fill: n.edge }),
    /* @__PURE__ */ p.jsx("circle", { cx: "50", cy: "50", r: "43", fill: "none", stroke: n.base, strokeWidth: "11", strokeDasharray: "25 20" }),
    /* @__PURE__ */ p.jsx("circle", { cx: "50", cy: "50", r: "37", fill: n.base }),
    /* @__PURE__ */ p.jsx("circle", { cx: "50", cy: "50", r: "31", fill: "none", stroke: n.edge, strokeWidth: "2", strokeDasharray: "3 5" }),
    /* @__PURE__ */ p.jsx(
      "text",
      {
        x: "50",
        y: "50",
        dy: "0.35em",
        textAnchor: "middle",
        fontSize: e >= 100 ? 20 : 24,
        fontWeight: 800,
        fill: n.text,
        fontFamily: "system-ui, -apple-system, sans-serif",
        children: e
      }
    )
  ] });
}
function gp() {
  return /* @__PURE__ */ p.jsxs("svg", { className: "mg-felt", viewBox: "0 0 520 620", preserveAspectRatio: "xMidYMid slice", "aria-hidden": "true", children: [
    /* @__PURE__ */ p.jsxs("defs", { children: [
      /* @__PURE__ */ p.jsxs("radialGradient", { id: "mg-felt-grad", cx: "50%", cy: "34%", r: "80%", children: [
        /* @__PURE__ */ p.jsx("stop", { offset: "0%", stopColor: "#1f8551" }),
        /* @__PURE__ */ p.jsx("stop", { offset: "62%", stopColor: "#136a41" }),
        /* @__PURE__ */ p.jsx("stop", { offset: "100%", stopColor: "#0c4b2d" })
      ] }),
      /* @__PURE__ */ p.jsxs("linearGradient", { id: "mg-rail", x1: "0", y1: "0", x2: "0", y2: "1", children: [
        /* @__PURE__ */ p.jsx("stop", { offset: "0%", stopColor: "#3a2418" }),
        /* @__PURE__ */ p.jsx("stop", { offset: "100%", stopColor: "#241209" })
      ] }),
      /* @__PURE__ */ p.jsx("path", { id: "mg-arc", d: "M70 300 A 190 190 0 0 1 450 300", fill: "none" })
    ] }),
    /* @__PURE__ */ p.jsx("rect", { x: "0", y: "0", width: "520", height: "620", rx: "34", fill: "url(#mg-rail)" }),
    /* @__PURE__ */ p.jsx("rect", { x: "14", y: "14", width: "492", height: "592", rx: "24", fill: "url(#mg-felt-grad)" }),
    /* @__PURE__ */ p.jsx(
      "rect",
      {
        x: "14",
        y: "14",
        width: "492",
        height: "592",
        rx: "24",
        fill: "none",
        stroke: "#e6c979",
        strokeOpacity: "0.55",
        strokeWidth: "2"
      }
    ),
    /* @__PURE__ */ p.jsx("rect", { x: "14", y: "14", width: "492", height: "592", rx: "24", fill: "#000000", fillOpacity: "0.10", style: { mixBlendMode: "multiply" } }),
    /* @__PURE__ */ p.jsx(
      "text",
      {
        fill: "#f0e2b6",
        fillOpacity: "0.92",
        fontSize: "23",
        fontWeight: 700,
        letterSpacing: "4",
        fontFamily: "Georgia, serif",
        children: /* @__PURE__ */ p.jsx("textPath", { href: "#mg-arc", startOffset: "50%", textAnchor: "middle", children: "BLACKJACK PAYS 3 TO 2" })
      }
    ),
    /* @__PURE__ */ p.jsx(
      "text",
      {
        x: "260",
        y: "330",
        textAnchor: "middle",
        fill: "#e9d9a8",
        fillOpacity: "0.72",
        fontSize: "12.5",
        letterSpacing: "3",
        fontFamily: "Georgia, serif",
        children: "DEALER MUST STAND ON 17"
      }
    ),
    /* @__PURE__ */ p.jsx(
      "text",
      {
        x: "260",
        y: "352",
        textAnchor: "middle",
        fill: "#e9d9a8",
        fillOpacity: "0.5",
        fontSize: "11",
        letterSpacing: "3",
        fontFamily: "Georgia, serif",
        children: "INSURANCE PAYS 2 TO 1"
      }
    ),
    /* @__PURE__ */ p.jsx("ellipse", { cx: "260", cy: "474", rx: "58", ry: "30", fill: "none", stroke: "#f0e2b6", strokeOpacity: "0.5", strokeWidth: "2", strokeDasharray: "2 6" })
  ] });
}
const Bt = {
  bankroll: "bj.bankroll",
  stats: "bj.stats",
  settings: "bj.settings"
}, vp = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"], yp = ["S", "H", "D", "C"];
let xp = 0;
function Pn(e) {
  const t = [];
  for (let n = 0; n < e; n++)
    for (const r of yp)
      for (const l of vp) t.push({ rank: l, suit: r, id: `c${xp++}` });
  for (let n = t.length - 1; n > 0; n--) {
    const r = Math.floor(Math.random() * (n + 1)), l = t[n];
    t[n] = t[r], t[r] = l;
  }
  return t;
}
function Ye(e) {
  let t = 0, n = 0;
  for (const r of e)
    r.rank === "A" ? (n += 1, t += 11) : r.rank === "K" || r.rank === "Q" || r.rank === "J" || r.rank === "10" ? t += 10 : t += Number(r.rank);
  for (; t > 21 && n > 0; )
    t -= 10, n -= 1;
  return { total: t, soft: n > 0 && t <= 21 };
}
function oi(e) {
  return e.length === 2 && Ye(e).total === 21;
}
function cu(e) {
  return e === "A" ? 11 : e === "K" || e === "Q" || e === "J" || e === "10" ? 10 : Number(e);
}
const si = { decks: 6, hitSoft17: !1, startingBankroll: 500 }, fu = { hands: 0, wins: 0, losses: 0, pushes: 0, blackjacks: 0 }, ui = 260, ai = 520;
class kp {
  constructor(t, n, r) {
    this.api = t, this.onChange = n, this.sfx = r, this.shoe = Pn(this.settings.decks), this.loadPrefs();
  }
  shoe = [];
  phase = "betting";
  bankroll = si.startingBankroll;
  bet = 0;
  hands = [];
  active = 0;
  dealer = [];
  holeHidden = !0;
  insuranceBet = 0;
  message = "";
  lastNet = 0;
  stats = { ...fu };
  settings = { ...si };
  timers = [];
  disposed = !1;
  /** Current snapshot — used to seed the React state without emitting during the
   *  host component's render (loadPrefs emits the corrected state a tick later). */
  getState() {
    return this.snapshot();
  }
  // --- betting ---------------------------------------------------------------
  addChip(t) {
    this.phase === "betting" && (this.bet + t > this.bankroll || (this.bet += t, this.sfx.chip(), this.emit()));
  }
  clearBet() {
    this.phase === "betting" && (this.bet = 0, this.emit());
  }
  deal() {
    this.phase !== "betting" || this.bet <= 0 || this.bet > this.bankroll || (this.reshuffleIfLow(), this.bankroll -= this.bet, this.hands = [this.freshHand(this.bet)], this.dealer = [], this.active = 0, this.insuranceBet = 0, this.holeHidden = !0, this.message = "", this.lastNet = 0, this.phase = "playing", this.sfx.deal(), this.draw(this.hands[0]), this.schedule(ui, () => {
      this.dealer.push(this.pop()), this.sfx.deal(), this.emit();
    }), this.schedule(ui * 2, () => {
      this.draw(this.hands[0]), this.sfx.deal(), this.emit();
    }), this.schedule(ui * 3, () => {
      this.dealer.push(this.pop()), this.sfx.deal(), this.emit(), this.afterDeal();
    }), this.emit());
  }
  afterDeal() {
    if (this.dealer[0].rank === "A" && this.bankroll >= Math.floor(this.hands[0].bet / 2)) {
      this.phase = "insurance", this.message = "Insurance?", this.emit();
      return;
    }
    this.resolveNaturals();
  }
  takeInsurance() {
    if (this.phase !== "insurance") return;
    const t = Math.floor(this.hands[0].bet / 2);
    this.bankroll >= t && (this.bankroll -= t, this.insuranceBet = t, this.sfx.chip()), this.resolveNaturals();
  }
  declineInsurance() {
    this.phase === "insurance" && this.resolveNaturals();
  }
  /** After the deal (and any insurance decision): pay insurance, and if either side
   *  has a natural blackjack, reveal and settle immediately; otherwise start play. */
  resolveNaturals() {
    const t = oi(this.dealer), n = oi(this.hands[0].cards);
    if (this.insuranceBet > 0 && t && (this.bankroll += this.insuranceBet * 3), t || n) {
      this.holeHidden = !1, n && !t ? this.hands[0].outcome = "blackjack" : !n && t ? this.hands[0].outcome = "lose" : this.hands[0].outcome = "push", this.settle();
      return;
    }
    this.phase = "playing", this.message = "", this.emit();
  }
  // --- player actions --------------------------------------------------------
  cur() {
    return this.hands[this.active];
  }
  hit() {
    if (this.phase !== "playing") return;
    const t = this.cur();
    !t || t.done || (this.draw(t), this.sfx.deal(), Ye(t.cards).total > 21 ? (t.outcome = "bust", t.done = !0, this.sfx.lose(), this.advance()) : this.emit());
  }
  stand() {
    if (this.phase !== "playing") return;
    const t = this.cur();
    !t || t.done || (t.done = !0, this.advance());
  }
  canDouble() {
    const t = this.cur();
    return this.phase === "playing" && !!t && !t.done && t.cards.length === 2 && this.bankroll >= t.bet;
  }
  double() {
    if (!this.canDouble()) return;
    const t = this.cur();
    this.bankroll -= t.bet, t.bet *= 2, t.doubled = !0, this.draw(t), this.sfx.deal(), Ye(t.cards).total > 21 && (t.outcome = "bust", this.sfx.lose()), t.done = !0, this.advance();
  }
  canSplit() {
    const t = this.cur();
    return this.phase === "playing" && !!t && !t.done && t.cards.length === 2 && cu(t.cards[0].rank) === cu(t.cards[1].rank) && this.hands.length < 4 && this.bankroll >= t.bet;
  }
  split() {
    if (!this.canSplit()) return;
    const t = this.cur(), n = t.cards[0].rank === "A";
    this.bankroll -= t.bet;
    const r = this.freshHand(t.bet);
    r.cards.push(t.cards.pop()), r.splitAce = n, t.splitAce = n, this.draw(t), this.sfx.deal(), n && (t.done = !0), this.hands.splice(this.active + 1, 0, r), t.done ? this.advance() : this.emit();
  }
  advance() {
    for (let t = this.active + 1; t < this.hands.length; t++) {
      const n = this.hands[t];
      if (!n.done && (this.active = t, n.cards.length < 2 && (this.draw(n), this.sfx.deal(), n.splitAce && (n.done = !0)), !n.done)) {
        this.emit();
        return;
      }
    }
    this.startDealer();
  }
  // --- dealer + settlement ---------------------------------------------------
  startDealer() {
    if (this.phase = "dealer", this.holeHidden = !1, this.emit(), !this.hands.some((r) => r.outcome !== "bust")) {
      this.schedule(ai, () => this.settle());
      return;
    }
    const n = (r) => {
      this.schedule(r, () => {
        const { total: l, soft: i } = Ye(this.dealer), o = i && l === 17 && this.settings.hitSoft17;
        l < 17 || o ? (this.dealer.push(this.pop()), this.sfx.deal(), this.emit(), n(ai)) : this.settle();
      });
    };
    n(ai);
  }
  settle() {
    const t = Ye(this.dealer), n = t.total > 21;
    let r = 0, l = !1;
    for (const i of this.hands) {
      const o = Ye(i.cards);
      i.outcome === null && (o.total > 21 ? i.outcome = "bust" : n || o.total > t.total ? i.outcome = "win" : o.total < t.total ? i.outcome = "lose" : i.outcome = "push"), i.outcome === "blackjack" ? (this.bankroll += Math.round(i.bet * 2.5), r += Math.round(i.bet * 1.5), this.stats.blackjacks += 1, this.stats.wins += 1, l = !0) : i.outcome === "win" ? (this.bankroll += i.bet * 2, r += i.bet, this.stats.wins += 1, l = !0) : i.outcome === "push" ? (this.bankroll += i.bet, this.stats.pushes += 1) : (r -= i.bet, this.stats.losses += 1), this.stats.hands += 1;
    }
    this.insuranceBet > 0 && !oi(this.dealer) && (r -= this.insuranceBet), this.lastNet = r, this.phase = "settle", this.message = this.settleMessage(r, l), r > 0 ? (this.hands.some((i) => i.outcome === "blackjack") ? this.sfx.blackjack : this.sfx.win)() : r < 0 ? this.sfx.lose() : this.sfx.push(), this.savePrefs(), this.emit();
  }
  settleMessage(t, n) {
    return t > 0 ? n ? `You win $${t}` : `+$${t}` : t < 0 ? `You lose $${-t}` : "Push";
  }
  newRound() {
    this.clearTimers(), this.hands = [], this.dealer = [], this.active = 0, this.bet = 0, this.insuranceBet = 0, this.holeHidden = !0, this.message = "", this.phase = "betting", this.reshuffleIfLow(), this.emit();
  }
  rebuy() {
    this.bankroll > 0 || (this.bankroll = this.settings.startingBankroll, this.savePrefs(), this.newRound());
  }
  setDecks(t) {
    this.phase === "betting" && (this.settings.decks = Math.max(1, Math.min(8, t)), this.shoe = Pn(this.settings.decks), this.savePrefs(), this.emit());
  }
  setHitSoft17(t) {
    this.phase === "betting" && (this.settings.hitSoft17 = t, this.savePrefs(), this.emit());
  }
  dispose() {
    this.disposed = !0, this.clearTimers();
  }
  // --- helpers ---------------------------------------------------------------
  freshHand(t) {
    return { cards: [], bet: t, outcome: null, done: !1, doubled: !1, splitAce: !1 };
  }
  draw(t) {
    t.cards.push(this.pop());
  }
  pop() {
    return this.shoe.length === 0 && (this.shoe = Pn(this.settings.decks)), this.shoe.pop();
  }
  reshuffleIfLow() {
    this.shoe.length < this.settings.decks * 52 * 0.25 && (this.shoe = Pn(this.settings.decks));
  }
  schedule(t, n) {
    this.disposed || this.timers.push(setTimeout(() => !this.disposed && n(), t));
  }
  clearTimers() {
    for (const t of this.timers) clearTimeout(t);
    this.timers = [];
  }
  snapshot() {
    return {
      phase: this.phase,
      bankroll: this.bankroll,
      bet: this.bet,
      playerHands: this.hands.map((t) => ({ ...t, cards: [...t.cards] })),
      activeHand: this.active,
      dealer: [...this.dealer],
      holeHidden: this.holeHidden,
      insuranceBet: this.insuranceBet,
      message: this.message,
      lastNet: this.lastNet,
      stats: { ...this.stats },
      settings: { ...this.settings },
      shoeRemaining: this.shoe.length
    };
  }
  emit() {
    this.onChange(this.snapshot());
  }
  async loadPrefs() {
    try {
      const [t, n, r] = await Promise.all([
        this.api.storage.get(Bt.bankroll),
        this.api.storage.get(Bt.stats),
        this.api.storage.get(Bt.settings)
      ]);
      r && typeof r.decks == "number" && (this.settings = { ...si, ...r }, this.shoe = Pn(this.settings.decks)), typeof t == "number" && t > 0 ? this.bankroll = t : this.bankroll = this.settings.startingBankroll, n && typeof n.hands == "number" && (this.stats = { ...fu, ...n }), this.emit();
    } catch {
    }
  }
  async savePrefs() {
    try {
      await Promise.all([
        this.api.storage.set(Bt.bankroll, this.bankroll),
        this.api.storage.set(Bt.stats, this.stats),
        this.api.storage.set(Bt.settings, this.settings)
      ]);
    } catch {
    }
  }
}
function wp(e, t) {
  const [n, r] = Ze.useState(null), l = Ze.useRef(null);
  return Ze.useEffect(() => {
    const i = new kp(e, r, {
      deal: () => t.deal(),
      chip: () => t.chip(),
      win: () => t.win(),
      lose: () => t.lose(),
      push: () => t.push(),
      blackjack: () => t.blackjack()
    });
    return l.current = i, r(i.getState()), () => {
      i.dispose(), l.current = null;
    };
  }, []), { state: n, game: l.current };
}
function Sp(e, t) {
  if (e.length === 0) return "";
  if (t) return String(Ye([e[0]]).total);
  const { total: n, soft: r } = Ye(e);
  return r && n !== 21 ? `${n - 10}/${n}` : String(n);
}
function Ep(e) {
  const { total: t, soft: n } = Ye(e);
  return t > 21 ? `${t}` : n && t !== 21 ? `${t - 10}/${t}` : String(t);
}
function Cp(e) {
  switch (e) {
    case "blackjack":
      return { text: "Blackjack!", kind: "good" };
    case "win":
      return { text: "Win", kind: "good" };
    case "push":
      return { text: "Push", kind: "neutral" };
    case "bust":
      return { text: "Bust", kind: "bad" };
    case "lose":
      return { text: "Lose", kind: "bad" };
    default:
      return null;
  }
}
function du({
  cards: e,
  holeHidden: t = !1,
  active: n = !1
}) {
  return /* @__PURE__ */ p.jsx("div", { className: `mg-cards${n ? " active" : ""}`, children: e.map((r, l) => {
    const i = t && l === 1;
    return /* @__PURE__ */ p.jsx("span", { className: "mg-card-wrap", style: { "--i": l }, children: /* @__PURE__ */ p.jsx(no, { rank: r.rank, suit: r.suit, faceDown: i, className: "mg-card" }) }, `${r.id}-${i}`);
  }) });
}
function Np({
  api: e,
  audio: t,
  onExit: n
}) {
  const { state: r, game: l } = wp(e, t), [i, o] = Ze.useState(t.isMuted), [s, u] = Ze.useState(!1), c = (v) => {
    v && (t.unlock(), v());
  };
  if (Ze.useEffect(() => {
    const v = (w) => {
      if (!l || !r) return;
      const k = w.key.toLowerCase();
      r.phase === "betting" && (k === "enter" || k === " ") ? c(() => l.deal()) : r.phase === "playing" ? k === "h" ? c(() => l.hit()) : k === "s" ? c(() => l.stand()) : k === "d" && l.canDouble() ? c(() => l.double()) : k === "p" && l.canSplit() && c(() => l.split()) : r.phase === "settle" && (k === "enter" || k === " ") ? c(() => l.newRound()) : r.phase === "insurance" && (k === "y" ? c(() => l.takeInsurance()) : k === "n" && c(() => l.declineInsurance())), ["arrowup", "arrowdown", "arrowleft", "arrowright", " "].includes(k) && w.preventDefault();
    };
    return window.addEventListener("keydown", v), () => window.removeEventListener("keydown", v);
  }), !r || !l) return /* @__PURE__ */ p.jsx("div", { className: "mg-loading", children: "Shuffling the shoe…" });
  const g = () => {
    const v = !i;
    o(v), t.setMuted(v);
  }, m = r.lastNet, h = r.phase === "settle" ? m > 0 ? "good" : m < 0 ? "bad" : "neutral" : "";
  return /* @__PURE__ */ p.jsxs("div", { className: "mg-bj", children: [
    /* @__PURE__ */ p.jsxs("div", { className: "mg-topbar", children: [
      /* @__PURE__ */ p.jsx("button", { className: "mg-icon-btn", onClick: n, title: "Back to games", children: "‹ Games" }),
      /* @__PURE__ */ p.jsxs("div", { className: "mg-bankroll", children: [
        /* @__PURE__ */ p.jsx("span", { className: "mg-bankroll-chip" }),
        " $",
        r.bankroll
      ] }),
      /* @__PURE__ */ p.jsxs("div", { className: "mg-topbar-right", children: [
        /* @__PURE__ */ p.jsxs("span", { className: "mg-stat-sm", title: "Wins / Blackjacks / Hands", children: [
          r.stats.wins,
          "W · ",
          r.stats.blackjacks,
          "BJ · ",
          r.stats.hands
        ] }),
        /* @__PURE__ */ p.jsx("button", { className: "mg-icon-btn", onClick: g, title: "Mute (sound)", children: i ? "🔇" : "♪" }),
        /* @__PURE__ */ p.jsx(
          "button",
          {
            className: `mg-icon-btn${s ? " on" : ""}`,
            onClick: () => u((v) => !v),
            title: "Settings",
            children: "⚙"
          }
        )
      ] })
    ] }),
    s ? /* @__PURE__ */ p.jsxs("div", { className: "mg-settings", children: [
      /* @__PURE__ */ p.jsxs("div", { className: "mg-set-row", children: [
        /* @__PURE__ */ p.jsx("span", { className: "mg-set-label", children: "Decks" }),
        /* @__PURE__ */ p.jsx("div", { className: "mg-seg", children: [1, 2, 4, 6, 8].map((v) => /* @__PURE__ */ p.jsx(
          "button",
          {
            className: `mg-seg-btn${r.settings.decks === v ? " active" : ""}`,
            disabled: r.phase !== "betting",
            onClick: () => l.setDecks(v),
            children: v
          },
          v
        )) })
      ] }),
      /* @__PURE__ */ p.jsxs("div", { className: "mg-set-row", children: [
        /* @__PURE__ */ p.jsx("span", { className: "mg-set-label", children: "Dealer hits soft 17" }),
        /* @__PURE__ */ p.jsx(
          "button",
          {
            className: `mg-toggle${r.settings.hitSoft17 ? " on" : ""}`,
            disabled: r.phase !== "betting",
            onClick: () => l.setHitSoft17(!r.settings.hitSoft17),
            children: /* @__PURE__ */ p.jsx("span", { className: "mg-toggle-dot" })
          }
        )
      ] }),
      /* @__PURE__ */ p.jsxs("div", { className: "mg-set-hint", children: [
        "Shoe: ",
        r.shoeRemaining,
        " cards left"
      ] })
    ] }) : null,
    /* @__PURE__ */ p.jsxs("div", { className: "mg-table", children: [
      /* @__PURE__ */ p.jsx(gp, {}),
      /* @__PURE__ */ p.jsxs("div", { className: "mg-dealer", children: [
        /* @__PURE__ */ p.jsx(du, { cards: r.dealer, holeHidden: r.holeHidden }),
        r.dealer.length > 0 ? /* @__PURE__ */ p.jsx("div", { className: "mg-badge", children: Sp(r.dealer, r.holeHidden) }) : null
      ] }),
      r.phase === "settle" ? /* @__PURE__ */ p.jsx("div", { className: `mg-banner ${h}`, children: /* @__PURE__ */ p.jsx("div", { className: "mg-banner-text", children: r.message }) }) : null,
      r.phase === "insurance" ? /* @__PURE__ */ p.jsx("div", { className: "mg-banner neutral", children: /* @__PURE__ */ p.jsx("div", { className: "mg-banner-text", children: "Insurance?" }) }) : null,
      /* @__PURE__ */ p.jsxs("div", { className: "mg-players", children: [
        r.playerHands.map((v, w) => {
          const k = Cp(v.outcome), D = r.phase === "playing" && w === r.activeHand;
          return /* @__PURE__ */ p.jsxs("div", { className: `mg-player-hand${D ? " active" : ""}`, children: [
            /* @__PURE__ */ p.jsx(du, { cards: v.cards, active: D }),
            /* @__PURE__ */ p.jsxs("div", { className: "mg-hand-foot", children: [
              v.cards.length > 0 ? /* @__PURE__ */ p.jsx("span", { className: "mg-badge sm", children: Ep(v.cards) }) : null,
              k ? /* @__PURE__ */ p.jsx("span", { className: `mg-outcome ${k.kind}`, children: k.text }) : null,
              v.bet > 0 ? /* @__PURE__ */ p.jsxs("span", { className: "mg-hand-bet", children: [
                "$",
                v.bet
              ] }) : null
            ] })
          ] }, w);
        }),
        r.playerHands.length === 0 ? /* @__PURE__ */ p.jsx("div", { className: "mg-betspot", children: r.bet > 0 ? `$${r.bet}` : "Place your bet" }) : null
      ] })
    ] }),
    /* @__PURE__ */ p.jsx("div", { className: "mg-actions", children: _p(r, l, c) })
  ] });
}
function _p(e, t, n) {
  return e.phase === "betting" ? e.bankroll <= 0 && e.bet <= 0 ? /* @__PURE__ */ p.jsxs("div", { className: "mg-broke", children: [
    /* @__PURE__ */ p.jsx("span", { children: "Out of chips." }),
    /* @__PURE__ */ p.jsxs("button", { className: "mg-btn primary", onClick: () => n(() => t.rebuy()), children: [
      "Buy in $",
      e.settings.startingBankroll
    ] })
  ] }) : /* @__PURE__ */ p.jsxs("div", { className: "mg-bet", children: [
    /* @__PURE__ */ p.jsx("div", { className: "mg-chiprack", children: pp.map((l) => /* @__PURE__ */ p.jsx(
      "button",
      {
        className: "mg-chip-btn",
        disabled: e.bet + l > e.bankroll,
        onClick: () => n(() => t.addChip(l)),
        title: `Bet $${l}`,
        children: /* @__PURE__ */ p.jsx(mp, { value: l, size: 52 })
      },
      l
    )) }),
    /* @__PURE__ */ p.jsxs("div", { className: "mg-bet-right", children: [
      /* @__PURE__ */ p.jsx("button", { className: "mg-btn ghost", disabled: e.bet <= 0, onClick: () => n(() => t.clearBet()), children: "Clear" }),
      /* @__PURE__ */ p.jsxs("button", { className: "mg-btn primary", disabled: e.bet <= 0, onClick: () => n(() => t.deal()), children: [
        "Deal $",
        e.bet || ""
      ] })
    ] })
  ] }) : e.phase === "insurance" ? /* @__PURE__ */ p.jsxs("div", { className: "mg-row", children: [
    /* @__PURE__ */ p.jsx("button", { className: "mg-btn", onClick: () => n(() => t.takeInsurance()), children: "Insurance (Y)" }),
    /* @__PURE__ */ p.jsx("button", { className: "mg-btn ghost", onClick: () => n(() => t.declineInsurance()), children: "No (N)" })
  ] }) : e.phase === "playing" ? /* @__PURE__ */ p.jsxs("div", { className: "mg-row", children: [
    /* @__PURE__ */ p.jsx("button", { className: "mg-btn primary", onClick: () => n(() => t.hit()), children: "Hit" }),
    /* @__PURE__ */ p.jsx("button", { className: "mg-btn", onClick: () => n(() => t.stand()), children: "Stand" }),
    /* @__PURE__ */ p.jsx("button", { className: "mg-btn", disabled: !t.canDouble(), onClick: () => n(() => t.double()), children: "Double" }),
    /* @__PURE__ */ p.jsx("button", { className: "mg-btn", disabled: !t.canSplit(), onClick: () => n(() => t.split()), children: "Split" })
  ] }) : e.phase === "dealer" ? /* @__PURE__ */ p.jsx("div", { className: "mg-row muted", children: "Dealer plays…" }) : /* @__PURE__ */ p.jsx("div", { className: "mg-row", children: /* @__PURE__ */ p.jsx("button", { className: "mg-btn primary", onClick: () => n(() => t.newRound()), children: "Deal again" }) });
}
function jp({ onPlay: e }) {
  return /* @__PURE__ */ p.jsxs("div", { className: "mg-launcher", children: [
    /* @__PURE__ */ p.jsxs("div", { className: "mg-launcher-head", children: [
      /* @__PURE__ */ p.jsx("div", { className: "mg-launcher-title", children: "Mini Games" }),
      /* @__PURE__ */ p.jsx("div", { className: "mg-launcher-sub", children: "A little arcade inside Agent Code" })
    ] }),
    /* @__PURE__ */ p.jsxs("div", { className: "mg-grid", children: [
      /* @__PURE__ */ p.jsxs("button", { className: "mg-tile", onClick: () => e("blackjack"), children: [
        /* @__PURE__ */ p.jsxs("div", { className: "mg-tile-art bj", children: [
          /* @__PURE__ */ p.jsx("span", { className: "mg-tile-card c1", children: /* @__PURE__ */ p.jsx(no, { rank: "A", suit: "S" }) }),
          /* @__PURE__ */ p.jsx("span", { className: "mg-tile-card c2", children: /* @__PURE__ */ p.jsx(no, { rank: "K", suit: "H" }) })
        ] }),
        /* @__PURE__ */ p.jsxs("div", { className: "mg-tile-body", children: [
          /* @__PURE__ */ p.jsx("div", { className: "mg-tile-name", children: "Blackjack" }),
          /* @__PURE__ */ p.jsx("div", { className: "mg-tile-desc", children: "Beat the dealer to 21 · chips, splits & 3:2" })
        ] })
      ] }),
      /* @__PURE__ */ p.jsxs("div", { className: "mg-tile soon", "aria-disabled": "true", children: [
        /* @__PURE__ */ p.jsx("div", { className: "mg-tile-art soon", children: /* @__PURE__ */ p.jsx("span", { children: "♠ ♥ ♦ ♣" }) }),
        /* @__PURE__ */ p.jsxs("div", { className: "mg-tile-body", children: [
          /* @__PURE__ */ p.jsx("div", { className: "mg-tile-name", children: "More games" }),
          /* @__PURE__ */ p.jsx("div", { className: "mg-tile-desc", children: "Coming soon" })
        ] })
      ] })
    ] })
  ] });
}
function Pp({ api: e, audio: t }) {
  const n = Ze.useSyncExternalStore(Ut.subscribe, Ut.get);
  return /* @__PURE__ */ p.jsx("div", { className: "mg-root", children: n === "blackjack" ? /* @__PURE__ */ p.jsx(Np, { api: e, audio: t, onExit: () => Ut.show("launcher") }) : /* @__PURE__ */ p.jsx(jp, { onPlay: (r) => Ut.show(r) }) });
}
class zp {
  ctx = null;
  noiseBuf = null;
  muted = !1;
  unlock() {
    if (!this.muted) {
      if (!this.ctx)
        try {
          const t = window.AudioContext ?? window.webkitAudioContext;
          this.ctx = t ? new t() : null, this.ctx && this.buildNoise();
        } catch {
          this.ctx = null;
        }
      this.ctx && this.ctx.state === "suspended" && this.ctx.resume().catch(() => {
      });
    }
  }
  setMuted(t) {
    this.muted = t;
  }
  get isMuted() {
    return this.muted;
  }
  buildNoise() {
    const t = this.ctx, n = Math.floor(t.sampleRate * 0.4), r = t.createBuffer(1, n, t.sampleRate), l = r.getChannelData(0);
    for (let i = 0; i < n; i++) l[i] = Math.random() * 2 - 1;
    this.noiseBuf = r;
  }
  tone(t, n, r, l, i = 0, o) {
    const s = this.ctx;
    if (!s || this.muted) return;
    const u = s.currentTime + i, c = s.createOscillator(), g = s.createGain();
    c.type = r, c.frequency.setValueAtTime(t, u), o !== void 0 && c.frequency.exponentialRampToValueAtTime(Math.max(1, o), u + n), g.gain.setValueAtTime(1e-4, u), g.gain.linearRampToValueAtTime(l, u + 6e-3), g.gain.exponentialRampToValueAtTime(1e-4, u + n), c.connect(g), g.connect(s.destination), c.start(u), c.stop(u + n + 0.02);
  }
  noise(t, n, r, l, i, o = 0) {
    const s = this.ctx;
    if (!s || this.muted || !this.noiseBuf) return;
    const u = s.currentTime + o, c = s.createBufferSource();
    c.buffer = this.noiseBuf;
    const g = s.createBiquadFilter();
    g.type = r, g.frequency.value = l, i && (g.Q.value = i);
    const m = s.createGain();
    m.gain.setValueAtTime(1e-4, u), m.gain.linearRampToValueAtTime(n, u + 3e-3), m.gain.exponentialRampToValueAtTime(1e-4, u + t), c.connect(g), g.connect(m), m.connect(s.destination), c.start(u), c.stop(u + t + 0.02);
  }
  /** Card dealt/hit — a short paper swish. */
  deal() {
    this.noise(0.085, 0.11, "bandpass", 1500, 0.7, 0), this.tone(210, 0.05, "triangle", 0.03);
  }
  /** Chip placed — a bright metallic clink (two pings over a tick of noise). */
  chip() {
    this.noise(0.03, 0.05, "highpass", 3200, 0, 0), this.tone(1180, 0.07, "triangle", 0.11), this.tone(1580, 0.06, "sine", 0.06, 0.012);
  }
  /** Win — a bright rising major arpeggio. */
  win() {
    this.tone(523, 0.1, "triangle", 0.15, 0), this.tone(659, 0.1, "triangle", 0.15, 0.09), this.tone(784, 0.16, "triangle", 0.16, 0.18);
  }
  /** Blackjack — the win fanfare, taller and with a shimmer on top. */
  blackjack() {
    this.tone(523, 0.1, "triangle", 0.15, 0), this.tone(659, 0.1, "triangle", 0.15, 0.08), this.tone(784, 0.1, "triangle", 0.16, 0.16), this.tone(1046, 0.24, "triangle", 0.17, 0.24), this.tone(1568, 0.3, "sine", 0.08, 0.28);
  }
  /** Loss — a soft, resigned descending pair. */
  lose() {
    this.tone(300, 0.16, "sawtooth", 0.1, 0, 190), this.tone(150, 0.22, "sine", 0.09, 0.1);
  }
  /** Push — a single neutral tick. */
  push() {
    this.tone(440, 0.09, "sine", 0.09);
  }
  dispose() {
    this.ctx && (this.ctx.close().catch(() => {
    }), this.ctx = null);
  }
}
const Tp = ".mg-root{--gold: #e6c979;--gold-soft: #f0e2b6;--ink: #f2efe6;--muted: #a7b0ab;--panel: rgba(255, 255, 255, .06);--border: rgba(255, 255, 255, .13);font-family:var(--theme-app-font, ui-sans-serif, system-ui, -apple-system, sans-serif);color:var(--ink);width:520px;max-width:92vw;margin:-1px;border-radius:inherit;background:radial-gradient(120% 90% at 50% -10%,#17201c,#0e1512 55%,#0a0f0d);padding:14px 16px 16px;user-select:none;-webkit-user-select:none}.mg-root *{box-sizing:border-box}.mg-loading{padding:80px 0;text-align:center;color:var(--muted);font-size:14px}.mg-launcher-head{text-align:center;padding:18px 0 20px}.mg-launcher-title{font-family:Georgia,serif;font-size:30px;font-weight:800;letter-spacing:.5px;background:linear-gradient(180deg,var(--gold-soft),var(--gold));-webkit-background-clip:text;background-clip:text;color:transparent}.mg-launcher-sub{margin-top:4px;color:var(--muted);font-size:13px}.mg-grid{display:grid;grid-template-columns:1fr 1fr;gap:14px;padding-bottom:10px}.mg-tile{display:flex;flex-direction:column;text-align:left;padding:0;border:1px solid var(--border);border-radius:14px;overflow:hidden;background:var(--panel);cursor:pointer;transition:transform .16s,border-color .16s,box-shadow .16s}.mg-tile:hover{transform:translateY(-3px);border-color:var(--gold);box-shadow:0 12px 30px #00000073}.mg-tile.soon{cursor:default;opacity:.6}.mg-tile-art{position:relative;height:120px;display:flex;align-items:center;justify-content:center;background:radial-gradient(90% 100% at 50% 20%,#1c7a4d,#0d4a2c)}.mg-tile-art.bj .mg-tile-card{position:absolute;width:62px;filter:drop-shadow(0 6px 10px rgba(0,0,0,.4))}.mg-tile-art.bj .c1{transform:rotate(-12deg) translate(-16px,4px)}.mg-tile-art.bj .c2{transform:rotate(10deg) translate(16px,-2px)}.mg-tile-art.soon{color:var(--gold-soft);font-size:22px;letter-spacing:6px;background:#141a17}.mg-tile-body{padding:11px 13px 13px}.mg-tile-name{font-weight:700;font-size:15px}.mg-tile-desc{margin-top:2px;font-size:11.5px;color:var(--muted)}.mg-topbar{display:flex;align-items:center;gap:10px;margin-bottom:10px}.mg-bankroll{display:flex;align-items:center;gap:8px;font-weight:800;font-size:17px;font-variant-numeric:tabular-nums;color:var(--gold-soft)}.mg-bankroll-chip{width:16px;height:16px;border-radius:50%;background:radial-gradient(circle at 40% 35%,#f6d67a,#d4af5a);border:2px solid #b9922f}.mg-topbar-right{margin-left:auto;display:flex;align-items:center;gap:8px}.mg-stat-sm{font-size:11px;color:var(--muted);font-variant-numeric:tabular-nums}.mg-icon-btn{height:28px;min-width:28px;padding:0 8px;display:inline-flex;align-items:center;justify-content:center;font-size:13px;color:var(--muted);background:var(--panel);border:1px solid var(--border);border-radius:8px;cursor:pointer;transition:color .14s,border-color .14s}.mg-icon-btn:hover,.mg-icon-btn.on{color:var(--ink);border-color:var(--gold)}.mg-settings{margin-bottom:10px;padding:12px 14px;border:1px solid var(--border);border-radius:12px;background:var(--panel);display:flex;flex-direction:column;gap:10px}.mg-set-row{display:flex;align-items:center;justify-content:space-between;gap:12px}.mg-set-label{font-size:12px;color:var(--muted)}.mg-set-hint{font-size:11px;color:var(--muted);opacity:.7}.mg-seg{display:inline-flex;border:1px solid var(--border);border-radius:8px;overflow:hidden}.mg-seg-btn{width:30px;height:26px;border:none;border-left:1px solid var(--border);background:transparent;color:var(--muted);cursor:pointer;font-size:12px;font-variant-numeric:tabular-nums}.mg-seg-btn:first-child{border-left:none}.mg-seg-btn.active{background:var(--gold);color:#241703;font-weight:700}.mg-seg-btn:disabled{opacity:.5;cursor:default}.mg-toggle{width:40px;height:22px;border-radius:12px;border:1px solid var(--border);background:#ffffff14;position:relative;cursor:pointer;transition:background .15s}.mg-toggle.on{background:var(--gold)}.mg-toggle-dot{position:absolute;top:2px;left:2px;width:16px;height:16px;border-radius:50%;background:#fff;transition:transform .15s}.mg-toggle.on .mg-toggle-dot{transform:translate(18px)}.mg-table{position:relative;width:100%;height:470px;border-radius:24px;overflow:hidden}.mg-felt{position:absolute;inset:0;width:100%;height:100%}.mg-dealer{position:absolute;top:22px;left:0;right:0;display:flex;flex-direction:column;align-items:center;gap:8px}.mg-players{position:absolute;bottom:18px;left:0;right:0;display:flex;justify-content:center;align-items:flex-start;gap:18px;flex-wrap:wrap}.mg-player-hand{display:flex;flex-direction:column;align-items:center;gap:6px;padding:6px;border-radius:12px;transition:box-shadow .2s,background .2s}.mg-player-hand.active{background:#e6c97914;box-shadow:0 0 0 2px #e6c97980,0 0 22px #e6c97940}.mg-hand-foot{display:flex;align-items:center;gap:8px}.mg-hand-bet{font-size:11px;color:var(--gold-soft);font-variant-numeric:tabular-nums}.mg-betspot{color:#f0e2b6;opacity:.8;font-size:13px;font-variant-numeric:tabular-nums;padding:22px 0}.mg-cards{display:flex;align-items:flex-start}.mg-card-wrap{animation:mg-deal-in .34s cubic-bezier(.2,.9,.3,1.3) both;animation-delay:calc(var(--i) * 40ms)}.mg-card-wrap:not(:first-child){margin-left:-34px}.mg-card{display:block;width:64px;height:auto;filter:drop-shadow(0 4px 7px rgba(0,0,0,.4))}@keyframes mg-deal-in{0%{opacity:0;transform:translate(34px,-46px) rotate(-12deg) scale(.9)}to{opacity:1;transform:none}}.mg-badge{min-width:30px;padding:2px 9px;border-radius:999px;background:#060a08b3;border:1px solid rgba(255,255,255,.18);color:#fff;font-size:13px;font-weight:700;text-align:center;font-variant-numeric:tabular-nums}.mg-badge.sm{font-size:12px;padding:1px 8px}.mg-outcome{font-size:11px;font-weight:700;padding:2px 8px;border-radius:999px}.mg-outcome.good{background:#4cbd7633;color:#7ee6a5}.mg-outcome.bad{background:#d63c4633;color:#ff9ea4}.mg-outcome.neutral{background:#ffffff1f;color:#d8dcd9}.mg-banner{position:absolute;top:47%;left:50%;transform:translate(-50%,-50%);padding:10px 26px;border-radius:14px;background:#060a08c7;border:1px solid var(--border);animation:mg-pop .3s cubic-bezier(.2,.9,.3,1.4) both;z-index:3}.mg-banner-text{font-family:Georgia,serif;font-size:22px;font-weight:800;letter-spacing:.5px}.mg-banner.good{border-color:var(--gold);box-shadow:0 0 30px #e6c97959}.mg-banner.good .mg-banner-text{background:linear-gradient(180deg,#fff2c6,var(--gold));-webkit-background-clip:text;background-clip:text;color:transparent}.mg-banner.bad{border-color:#d63c4699}.mg-banner.bad .mg-banner-text{color:#ff9ea4}@keyframes mg-pop{0%{opacity:0;transform:translate(-50%,-50%) scale(.7)}to{opacity:1;transform:translate(-50%,-50%) scale(1)}}.mg-actions{min-height:88px;padding-top:12px;display:flex;align-items:center;justify-content:center}.mg-row{display:flex;gap:10px;justify-content:center;align-items:center;flex-wrap:wrap}.mg-row.muted{color:var(--muted);font-size:14px}.mg-btn{padding:10px 20px;border-radius:11px;font-weight:650;font-size:14px;border:1px solid var(--border);background:var(--panel);color:var(--ink);cursor:pointer;transition:transform .12s,background .14s,filter .14s}.mg-btn:hover:not(:disabled){background:#ffffff1f;transform:translateY(-1px)}.mg-btn.ghost{background:transparent}.mg-btn.primary{background:linear-gradient(180deg,#ecd085,#d4af5a);color:#241703;border-color:var(--gold);box-shadow:0 5px 16px #d4af5a4d}.mg-btn.primary:hover:not(:disabled){filter:brightness(1.06)}.mg-btn:disabled{opacity:.4;cursor:default}.mg-bet{display:flex;align-items:center;justify-content:space-between;width:100%;gap:14px}.mg-chiprack{display:flex;gap:8px;align-items:center}.mg-chip-btn{padding:0;border:none;background:none;cursor:pointer;line-height:0;filter:drop-shadow(0 3px 5px rgba(0,0,0,.45));transition:transform .12s}.mg-chip-btn:hover:not(:disabled){transform:translateY(-6px)}.mg-chip-btn:disabled{opacity:.35;cursor:default}.mg-bet-right{display:flex;gap:8px;align-items:center}.mg-broke{display:flex;align-items:center;gap:14px;color:var(--muted);font-size:14px}", pu = "agent-code-mini-games-styles";
function Lp() {
  if (document.getElementById(pu)) return;
  const e = document.createElement("style");
  e.id = pu, e.textContent = Tp, document.head.append(e);
}
function Rp(e) {
  return (t) => {
    Lp();
    const n = new zp(), r = () => n.unlock();
    window.addEventListener("keydown", r), window.addEventListener("pointerdown", r);
    const l = _c(t);
    return l.render(/* @__PURE__ */ p.jsx(Pp, { api: e, audio: n })), () => {
      window.removeEventListener("keydown", r), window.removeEventListener("pointerdown", r), n.dispose(), queueMicrotask(() => l.unmount());
    };
  };
}
const { activate: Mp, deactivate: Dp } = {
  async activate(e) {
    e.subscriptions.push(
      e.registerView("games.main", Rp(e.api)),
      e.registerCommand("games.blackjack", () => Ut.show("blackjack"))
    );
  },
  deactivate() {
    Ut.show("launcher");
  }
};
export {
  Mp as activate,
  Dp as deactivate
};
