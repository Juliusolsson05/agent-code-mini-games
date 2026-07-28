let Uc = "launcher";
const kc = /* @__PURE__ */ new Set(), gr = {
  get() {
    return Uc;
  },
  show(t) {
    if (t !== Uc) {
      Uc = t;
      for (const e of kc) e();
    }
  },
  subscribe(t) {
    return kc.add(t), () => kc.delete(t);
  }
};
var O0 = { exports: {} }, oc = {}, B0 = { exports: {} }, He = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Wa = Symbol.for("react.element"), GS = Symbol.for("react.portal"), WS = Symbol.for("react.fragment"), $S = Symbol.for("react.strict_mode"), jS = Symbol.for("react.profiler"), XS = Symbol.for("react.provider"), YS = Symbol.for("react.context"), qS = Symbol.for("react.forward_ref"), KS = Symbol.for("react.suspense"), ZS = Symbol.for("react.memo"), QS = Symbol.for("react.lazy"), Pm = Symbol.iterator;
function JS(t) {
  return t === null || typeof t != "object" ? null : (t = Pm && t[Pm] || t["@@iterator"], typeof t == "function" ? t : null);
}
var z0 = { isMounted: function() {
  return !1;
}, enqueueForceUpdate: function() {
}, enqueueReplaceState: function() {
}, enqueueSetState: function() {
} }, H0 = Object.assign, V0 = {};
function Ao(t, e, n) {
  this.props = t, this.context = e, this.refs = V0, this.updater = n || z0;
}
Ao.prototype.isReactComponent = {};
Ao.prototype.setState = function(t, e) {
  if (typeof t != "object" && typeof t != "function" && t != null) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
  this.updater.enqueueSetState(this, t, e, "setState");
};
Ao.prototype.forceUpdate = function(t) {
  this.updater.enqueueForceUpdate(this, t, "forceUpdate");
};
function G0() {
}
G0.prototype = Ao.prototype;
function Xh(t, e, n) {
  this.props = t, this.context = e, this.refs = V0, this.updater = n || z0;
}
var Yh = Xh.prototype = new G0();
Yh.constructor = Xh;
H0(Yh, Ao.prototype);
Yh.isPureReactComponent = !0;
var Lm = Array.isArray, W0 = Object.prototype.hasOwnProperty, qh = { current: null }, $0 = { key: !0, ref: !0, __self: !0, __source: !0 };
function j0(t, e, n) {
  var i, r = {}, s = null, o = null;
  if (e != null) for (i in e.ref !== void 0 && (o = e.ref), e.key !== void 0 && (s = "" + e.key), e) W0.call(e, i) && !$0.hasOwnProperty(i) && (r[i] = e[i]);
  var a = arguments.length - 2;
  if (a === 1) r.children = n;
  else if (1 < a) {
    for (var l = Array(a), u = 0; u < a; u++) l[u] = arguments[u + 2];
    r.children = l;
  }
  if (t && t.defaultProps) for (i in a = t.defaultProps, a) r[i] === void 0 && (r[i] = a[i]);
  return { $$typeof: Wa, type: t, key: s, ref: o, props: r, _owner: qh.current };
}
function eM(t, e) {
  return { $$typeof: Wa, type: t.type, key: e, ref: t.ref, props: t.props, _owner: t._owner };
}
function Kh(t) {
  return typeof t == "object" && t !== null && t.$$typeof === Wa;
}
function tM(t) {
  var e = { "=": "=0", ":": "=2" };
  return "$" + t.replace(/[=:]/g, function(n) {
    return e[n];
  });
}
var Dm = /\/+/g;
function Fc(t, e) {
  return typeof t == "object" && t !== null && t.key != null ? tM("" + t.key) : e.toString(36);
}
function Wl(t, e, n, i, r) {
  var s = typeof t;
  (s === "undefined" || s === "boolean") && (t = null);
  var o = !1;
  if (t === null) o = !0;
  else switch (s) {
    case "string":
    case "number":
      o = !0;
      break;
    case "object":
      switch (t.$$typeof) {
        case Wa:
        case GS:
          o = !0;
      }
  }
  if (o) return o = t, r = r(o), t = i === "" ? "." + Fc(o, 0) : i, Lm(r) ? (n = "", t != null && (n = t.replace(Dm, "$&/") + "/"), Wl(r, e, n, "", function(u) {
    return u;
  })) : r != null && (Kh(r) && (r = eM(r, n + (!r.key || o && o.key === r.key ? "" : ("" + r.key).replace(Dm, "$&/") + "/") + t)), e.push(r)), 1;
  if (o = 0, i = i === "" ? "." : i + ":", Lm(t)) for (var a = 0; a < t.length; a++) {
    s = t[a];
    var l = i + Fc(s, a);
    o += Wl(s, e, n, l, r);
  }
  else if (l = JS(t), typeof l == "function") for (t = l.call(t), a = 0; !(s = t.next()).done; ) s = s.value, l = i + Fc(s, a++), o += Wl(s, e, n, l, r);
  else if (s === "object") throw e = String(t), Error("Objects are not valid as a React child (found: " + (e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e) + "). If you meant to render a collection of children, use an array instead.");
  return o;
}
function tl(t, e, n) {
  if (t == null) return t;
  var i = [], r = 0;
  return Wl(t, i, "", "", function(s) {
    return e.call(n, s, r++);
  }), i;
}
function nM(t) {
  if (t._status === -1) {
    var e = t._result;
    e = e(), e.then(function(n) {
      (t._status === 0 || t._status === -1) && (t._status = 1, t._result = n);
    }, function(n) {
      (t._status === 0 || t._status === -1) && (t._status = 2, t._result = n);
    }), t._status === -1 && (t._status = 0, t._result = e);
  }
  if (t._status === 1) return t._result.default;
  throw t._result;
}
var un = { current: null }, $l = { transition: null }, iM = { ReactCurrentDispatcher: un, ReactCurrentBatchConfig: $l, ReactCurrentOwner: qh };
function X0() {
  throw Error("act(...) is not supported in production builds of React.");
}
He.Children = { map: tl, forEach: function(t, e, n) {
  tl(t, function() {
    e.apply(this, arguments);
  }, n);
}, count: function(t) {
  var e = 0;
  return tl(t, function() {
    e++;
  }), e;
}, toArray: function(t) {
  return tl(t, function(e) {
    return e;
  }) || [];
}, only: function(t) {
  if (!Kh(t)) throw Error("React.Children.only expected to receive a single React element child.");
  return t;
} };
He.Component = Ao;
He.Fragment = WS;
He.Profiler = jS;
He.PureComponent = Xh;
He.StrictMode = $S;
He.Suspense = KS;
He.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = iM;
He.act = X0;
He.cloneElement = function(t, e, n) {
  if (t == null) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + t + ".");
  var i = H0({}, t.props), r = t.key, s = t.ref, o = t._owner;
  if (e != null) {
    if (e.ref !== void 0 && (s = e.ref, o = qh.current), e.key !== void 0 && (r = "" + e.key), t.type && t.type.defaultProps) var a = t.type.defaultProps;
    for (l in e) W0.call(e, l) && !$0.hasOwnProperty(l) && (i[l] = e[l] === void 0 && a !== void 0 ? a[l] : e[l]);
  }
  var l = arguments.length - 2;
  if (l === 1) i.children = n;
  else if (1 < l) {
    a = Array(l);
    for (var u = 0; u < l; u++) a[u] = arguments[u + 2];
    i.children = a;
  }
  return { $$typeof: Wa, type: t.type, key: r, ref: s, props: i, _owner: o };
};
He.createContext = function(t) {
  return t = { $$typeof: YS, _currentValue: t, _currentValue2: t, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null }, t.Provider = { $$typeof: XS, _context: t }, t.Consumer = t;
};
He.createElement = j0;
He.createFactory = function(t) {
  var e = j0.bind(null, t);
  return e.type = t, e;
};
He.createRef = function() {
  return { current: null };
};
He.forwardRef = function(t) {
  return { $$typeof: qS, render: t };
};
He.isValidElement = Kh;
He.lazy = function(t) {
  return { $$typeof: QS, _payload: { _status: -1, _result: t }, _init: nM };
};
He.memo = function(t, e) {
  return { $$typeof: ZS, type: t, compare: e === void 0 ? null : e };
};
He.startTransition = function(t) {
  var e = $l.transition;
  $l.transition = {};
  try {
    t();
  } finally {
    $l.transition = e;
  }
};
He.unstable_act = X0;
He.useCallback = function(t, e) {
  return un.current.useCallback(t, e);
};
He.useContext = function(t) {
  return un.current.useContext(t);
};
He.useDebugValue = function() {
};
He.useDeferredValue = function(t) {
  return un.current.useDeferredValue(t);
};
He.useEffect = function(t, e) {
  return un.current.useEffect(t, e);
};
He.useId = function() {
  return un.current.useId();
};
He.useImperativeHandle = function(t, e, n) {
  return un.current.useImperativeHandle(t, e, n);
};
He.useInsertionEffect = function(t, e) {
  return un.current.useInsertionEffect(t, e);
};
He.useLayoutEffect = function(t, e) {
  return un.current.useLayoutEffect(t, e);
};
He.useMemo = function(t, e) {
  return un.current.useMemo(t, e);
};
He.useReducer = function(t, e, n) {
  return un.current.useReducer(t, e, n);
};
He.useRef = function(t) {
  return un.current.useRef(t);
};
He.useState = function(t) {
  return un.current.useState(t);
};
He.useSyncExternalStore = function(t, e, n) {
  return un.current.useSyncExternalStore(t, e, n);
};
He.useTransition = function() {
  return un.current.useTransition();
};
He.version = "18.3.1";
B0.exports = He;
var Dt = B0.exports;
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var rM = Dt, sM = Symbol.for("react.element"), oM = Symbol.for("react.fragment"), aM = Object.prototype.hasOwnProperty, lM = rM.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, uM = { key: !0, ref: !0, __self: !0, __source: !0 };
function Y0(t, e, n) {
  var i, r = {}, s = null, o = null;
  n !== void 0 && (s = "" + n), e.key !== void 0 && (s = "" + e.key), e.ref !== void 0 && (o = e.ref);
  for (i in e) aM.call(e, i) && !uM.hasOwnProperty(i) && (r[i] = e[i]);
  if (t && t.defaultProps) for (i in e = t.defaultProps, e) r[i] === void 0 && (r[i] = e[i]);
  return { $$typeof: sM, type: t, key: s, ref: o, props: r, _owner: lM.current };
}
oc.Fragment = oM;
oc.jsx = Y0;
oc.jsxs = Y0;
O0.exports = oc;
var U = O0.exports, q0 = { exports: {} }, Vn = {}, K0 = { exports: {} }, Z0 = {};
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
(function(t) {
  function e(L, q) {
    var Z = L.length;
    L.push(q);
    e: for (; 0 < Z; ) {
      var se = Z - 1 >>> 1, Te = L[se];
      if (0 < r(Te, q)) L[se] = q, L[Z] = Te, Z = se;
      else break e;
    }
  }
  function n(L) {
    return L.length === 0 ? null : L[0];
  }
  function i(L) {
    if (L.length === 0) return null;
    var q = L[0], Z = L.pop();
    if (Z !== q) {
      L[0] = Z;
      e: for (var se = 0, Te = L.length, Ge = Te >>> 1; se < Ge; ) {
        var $ = 2 * (se + 1) - 1, te = L[$], de = $ + 1, ue = L[de];
        if (0 > r(te, Z)) de < Te && 0 > r(ue, te) ? (L[se] = ue, L[de] = Z, se = de) : (L[se] = te, L[$] = Z, se = $);
        else if (de < Te && 0 > r(ue, Z)) L[se] = ue, L[de] = Z, se = de;
        else break e;
      }
    }
    return q;
  }
  function r(L, q) {
    var Z = L.sortIndex - q.sortIndex;
    return Z !== 0 ? Z : L.id - q.id;
  }
  if (typeof performance == "object" && typeof performance.now == "function") {
    var s = performance;
    t.unstable_now = function() {
      return s.now();
    };
  } else {
    var o = Date, a = o.now();
    t.unstable_now = function() {
      return o.now() - a;
    };
  }
  var l = [], u = [], c = 1, d = null, h = 3, p = !1, _ = !1, y = !1, m = typeof setTimeout == "function" ? setTimeout : null, f = typeof clearTimeout == "function" ? clearTimeout : null, v = typeof setImmediate < "u" ? setImmediate : null;
  typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
  function g(L) {
    for (var q = n(u); q !== null; ) {
      if (q.callback === null) i(u);
      else if (q.startTime <= L) i(u), q.sortIndex = q.expirationTime, e(l, q);
      else break;
      q = n(u);
    }
  }
  function M(L) {
    if (y = !1, g(L), !_) if (n(l) !== null) _ = !0, V(b);
    else {
      var q = n(u);
      q !== null && ne(M, q.startTime - L);
    }
  }
  function b(L, q) {
    _ = !1, y && (y = !1, f(R), R = -1), p = !0;
    var Z = h;
    try {
      for (g(q), d = n(l); d !== null && (!(d.expirationTime > q) || L && !w()); ) {
        var se = d.callback;
        if (typeof se == "function") {
          d.callback = null, h = d.priorityLevel;
          var Te = se(d.expirationTime <= q);
          q = t.unstable_now(), typeof Te == "function" ? d.callback = Te : d === n(l) && i(l), g(q);
        } else i(l);
        d = n(l);
      }
      if (d !== null) var Ge = !0;
      else {
        var $ = n(u);
        $ !== null && ne(M, $.startTime - q), Ge = !1;
      }
      return Ge;
    } finally {
      d = null, h = Z, p = !1;
    }
  }
  var A = !1, T = null, R = -1, j = 5, x = -1;
  function w() {
    return !(t.unstable_now() - x < j);
  }
  function H() {
    if (T !== null) {
      var L = t.unstable_now();
      x = L;
      var q = !0;
      try {
        q = T(!0, L);
      } finally {
        q ? B() : (A = !1, T = null);
      }
    } else A = !1;
  }
  var B;
  if (typeof v == "function") B = function() {
    v(H);
  };
  else if (typeof MessageChannel < "u") {
    var G = new MessageChannel(), Q = G.port2;
    G.port1.onmessage = H, B = function() {
      Q.postMessage(null);
    };
  } else B = function() {
    m(H, 0);
  };
  function V(L) {
    T = L, A || (A = !0, B());
  }
  function ne(L, q) {
    R = m(function() {
      L(t.unstable_now());
    }, q);
  }
  t.unstable_IdlePriority = 5, t.unstable_ImmediatePriority = 1, t.unstable_LowPriority = 4, t.unstable_NormalPriority = 3, t.unstable_Profiling = null, t.unstable_UserBlockingPriority = 2, t.unstable_cancelCallback = function(L) {
    L.callback = null;
  }, t.unstable_continueExecution = function() {
    _ || p || (_ = !0, V(b));
  }, t.unstable_forceFrameRate = function(L) {
    0 > L || 125 < L ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : j = 0 < L ? Math.floor(1e3 / L) : 5;
  }, t.unstable_getCurrentPriorityLevel = function() {
    return h;
  }, t.unstable_getFirstCallbackNode = function() {
    return n(l);
  }, t.unstable_next = function(L) {
    switch (h) {
      case 1:
      case 2:
      case 3:
        var q = 3;
        break;
      default:
        q = h;
    }
    var Z = h;
    h = q;
    try {
      return L();
    } finally {
      h = Z;
    }
  }, t.unstable_pauseExecution = function() {
  }, t.unstable_requestPaint = function() {
  }, t.unstable_runWithPriority = function(L, q) {
    switch (L) {
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
        break;
      default:
        L = 3;
    }
    var Z = h;
    h = L;
    try {
      return q();
    } finally {
      h = Z;
    }
  }, t.unstable_scheduleCallback = function(L, q, Z) {
    var se = t.unstable_now();
    switch (typeof Z == "object" && Z !== null ? (Z = Z.delay, Z = typeof Z == "number" && 0 < Z ? se + Z : se) : Z = se, L) {
      case 1:
        var Te = -1;
        break;
      case 2:
        Te = 250;
        break;
      case 5:
        Te = 1073741823;
        break;
      case 4:
        Te = 1e4;
        break;
      default:
        Te = 5e3;
    }
    return Te = Z + Te, L = { id: c++, callback: q, priorityLevel: L, startTime: Z, expirationTime: Te, sortIndex: -1 }, Z > se ? (L.sortIndex = Z, e(u, L), n(l) === null && L === n(u) && (y ? (f(R), R = -1) : y = !0, ne(M, Z - se))) : (L.sortIndex = Te, e(l, L), _ || p || (_ = !0, V(b))), L;
  }, t.unstable_shouldYield = w, t.unstable_wrapCallback = function(L) {
    var q = h;
    return function() {
      var Z = h;
      h = q;
      try {
        return L.apply(this, arguments);
      } finally {
        h = Z;
      }
    };
  };
})(Z0);
K0.exports = Z0;
var cM = K0.exports;
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var fM = Dt, Hn = cM;
function ee(t) {
  for (var e = "https://reactjs.org/docs/error-decoder.html?invariant=" + t, n = 1; n < arguments.length; n++) e += "&args[]=" + encodeURIComponent(arguments[n]);
  return "Minified React error #" + t + "; visit " + e + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
}
var Q0 = /* @__PURE__ */ new Set(), Sa = {};
function _s(t, e) {
  lo(t, e), lo(t + "Capture", e);
}
function lo(t, e) {
  for (Sa[t] = e, t = 0; t < e.length; t++) Q0.add(e[t]);
}
var qi = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), nd = Object.prototype.hasOwnProperty, dM = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, Im = {}, Nm = {};
function hM(t) {
  return nd.call(Nm, t) ? !0 : nd.call(Im, t) ? !1 : dM.test(t) ? Nm[t] = !0 : (Im[t] = !0, !1);
}
function pM(t, e, n, i) {
  if (n !== null && n.type === 0) return !1;
  switch (typeof e) {
    case "function":
    case "symbol":
      return !0;
    case "boolean":
      return i ? !1 : n !== null ? !n.acceptsBooleans : (t = t.toLowerCase().slice(0, 5), t !== "data-" && t !== "aria-");
    default:
      return !1;
  }
}
function mM(t, e, n, i) {
  if (e === null || typeof e > "u" || pM(t, e, n, i)) return !0;
  if (i) return !1;
  if (n !== null) switch (n.type) {
    case 3:
      return !e;
    case 4:
      return e === !1;
    case 5:
      return isNaN(e);
    case 6:
      return isNaN(e) || 1 > e;
  }
  return !1;
}
function cn(t, e, n, i, r, s, o) {
  this.acceptsBooleans = e === 2 || e === 3 || e === 4, this.attributeName = i, this.attributeNamespace = r, this.mustUseProperty = n, this.propertyName = t, this.type = e, this.sanitizeURL = s, this.removeEmptyString = o;
}
var jt = {};
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(t) {
  jt[t] = new cn(t, 0, !1, t, null, !1, !1);
});
[["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(t) {
  var e = t[0];
  jt[e] = new cn(e, 1, !1, t[1], null, !1, !1);
});
["contentEditable", "draggable", "spellCheck", "value"].forEach(function(t) {
  jt[t] = new cn(t, 2, !1, t.toLowerCase(), null, !1, !1);
});
["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(t) {
  jt[t] = new cn(t, 2, !1, t, null, !1, !1);
});
"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(t) {
  jt[t] = new cn(t, 3, !1, t.toLowerCase(), null, !1, !1);
});
["checked", "multiple", "muted", "selected"].forEach(function(t) {
  jt[t] = new cn(t, 3, !0, t, null, !1, !1);
});
["capture", "download"].forEach(function(t) {
  jt[t] = new cn(t, 4, !1, t, null, !1, !1);
});
["cols", "rows", "size", "span"].forEach(function(t) {
  jt[t] = new cn(t, 6, !1, t, null, !1, !1);
});
["rowSpan", "start"].forEach(function(t) {
  jt[t] = new cn(t, 5, !1, t.toLowerCase(), null, !1, !1);
});
var Zh = /[\-:]([a-z])/g;
function Qh(t) {
  return t[1].toUpperCase();
}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(t) {
  var e = t.replace(
    Zh,
    Qh
  );
  jt[e] = new cn(e, 1, !1, t, null, !1, !1);
});
"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(t) {
  var e = t.replace(Zh, Qh);
  jt[e] = new cn(e, 1, !1, t, "http://www.w3.org/1999/xlink", !1, !1);
});
["xml:base", "xml:lang", "xml:space"].forEach(function(t) {
  var e = t.replace(Zh, Qh);
  jt[e] = new cn(e, 1, !1, t, "http://www.w3.org/XML/1998/namespace", !1, !1);
});
["tabIndex", "crossOrigin"].forEach(function(t) {
  jt[t] = new cn(t, 1, !1, t.toLowerCase(), null, !1, !1);
});
jt.xlinkHref = new cn("xlinkHref", 1, !1, "xlink:href", "http://www.w3.org/1999/xlink", !0, !1);
["src", "href", "action", "formAction"].forEach(function(t) {
  jt[t] = new cn(t, 1, !1, t.toLowerCase(), null, !0, !0);
});
function Jh(t, e, n, i) {
  var r = jt.hasOwnProperty(e) ? jt[e] : null;
  (r !== null ? r.type !== 0 : i || !(2 < e.length) || e[0] !== "o" && e[0] !== "O" || e[1] !== "n" && e[1] !== "N") && (mM(e, n, r, i) && (n = null), i || r === null ? hM(e) && (n === null ? t.removeAttribute(e) : t.setAttribute(e, "" + n)) : r.mustUseProperty ? t[r.propertyName] = n === null ? r.type === 3 ? !1 : "" : n : (e = r.attributeName, i = r.attributeNamespace, n === null ? t.removeAttribute(e) : (r = r.type, n = r === 3 || r === 4 && n === !0 ? "" : "" + n, i ? t.setAttributeNS(i, e, n) : t.setAttribute(e, n))));
}
var nr = fM.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, nl = Symbol.for("react.element"), zs = Symbol.for("react.portal"), Hs = Symbol.for("react.fragment"), ep = Symbol.for("react.strict_mode"), id = Symbol.for("react.profiler"), J0 = Symbol.for("react.provider"), e_ = Symbol.for("react.context"), tp = Symbol.for("react.forward_ref"), rd = Symbol.for("react.suspense"), sd = Symbol.for("react.suspense_list"), np = Symbol.for("react.memo"), pr = Symbol.for("react.lazy"), t_ = Symbol.for("react.offscreen"), Um = Symbol.iterator;
function Fo(t) {
  return t === null || typeof t != "object" ? null : (t = Um && t[Um] || t["@@iterator"], typeof t == "function" ? t : null);
}
var _t = Object.assign, Oc;
function Jo(t) {
  if (Oc === void 0) try {
    throw Error();
  } catch (n) {
    var e = n.stack.trim().match(/\n( *(at )?)/);
    Oc = e && e[1] || "";
  }
  return `
` + Oc + t;
}
var Bc = !1;
function zc(t, e) {
  if (!t || Bc) return "";
  Bc = !0;
  var n = Error.prepareStackTrace;
  Error.prepareStackTrace = void 0;
  try {
    if (e) if (e = function() {
      throw Error();
    }, Object.defineProperty(e.prototype, "props", { set: function() {
      throw Error();
    } }), typeof Reflect == "object" && Reflect.construct) {
      try {
        Reflect.construct(e, []);
      } catch (u) {
        var i = u;
      }
      Reflect.construct(t, [], e);
    } else {
      try {
        e.call();
      } catch (u) {
        i = u;
      }
      t.call(e.prototype);
    }
    else {
      try {
        throw Error();
      } catch (u) {
        i = u;
      }
      t();
    }
  } catch (u) {
    if (u && i && typeof u.stack == "string") {
      for (var r = u.stack.split(`
`), s = i.stack.split(`
`), o = r.length - 1, a = s.length - 1; 1 <= o && 0 <= a && r[o] !== s[a]; ) a--;
      for (; 1 <= o && 0 <= a; o--, a--) if (r[o] !== s[a]) {
        if (o !== 1 || a !== 1)
          do
            if (o--, a--, 0 > a || r[o] !== s[a]) {
              var l = `
` + r[o].replace(" at new ", " at ");
              return t.displayName && l.includes("<anonymous>") && (l = l.replace("<anonymous>", t.displayName)), l;
            }
          while (1 <= o && 0 <= a);
        break;
      }
    }
  } finally {
    Bc = !1, Error.prepareStackTrace = n;
  }
  return (t = t ? t.displayName || t.name : "") ? Jo(t) : "";
}
function gM(t) {
  switch (t.tag) {
    case 5:
      return Jo(t.type);
    case 16:
      return Jo("Lazy");
    case 13:
      return Jo("Suspense");
    case 19:
      return Jo("SuspenseList");
    case 0:
    case 2:
    case 15:
      return t = zc(t.type, !1), t;
    case 11:
      return t = zc(t.type.render, !1), t;
    case 1:
      return t = zc(t.type, !0), t;
    default:
      return "";
  }
}
function od(t) {
  if (t == null) return null;
  if (typeof t == "function") return t.displayName || t.name || null;
  if (typeof t == "string") return t;
  switch (t) {
    case Hs:
      return "Fragment";
    case zs:
      return "Portal";
    case id:
      return "Profiler";
    case ep:
      return "StrictMode";
    case rd:
      return "Suspense";
    case sd:
      return "SuspenseList";
  }
  if (typeof t == "object") switch (t.$$typeof) {
    case e_:
      return (t.displayName || "Context") + ".Consumer";
    case J0:
      return (t._context.displayName || "Context") + ".Provider";
    case tp:
      var e = t.render;
      return t = t.displayName, t || (t = e.displayName || e.name || "", t = t !== "" ? "ForwardRef(" + t + ")" : "ForwardRef"), t;
    case np:
      return e = t.displayName || null, e !== null ? e : od(t.type) || "Memo";
    case pr:
      e = t._payload, t = t._init;
      try {
        return od(t(e));
      } catch {
      }
  }
  return null;
}
function vM(t) {
  var e = t.type;
  switch (t.tag) {
    case 24:
      return "Cache";
    case 9:
      return (e.displayName || "Context") + ".Consumer";
    case 10:
      return (e._context.displayName || "Context") + ".Provider";
    case 18:
      return "DehydratedFragment";
    case 11:
      return t = e.render, t = t.displayName || t.name || "", e.displayName || (t !== "" ? "ForwardRef(" + t + ")" : "ForwardRef");
    case 7:
      return "Fragment";
    case 5:
      return e;
    case 4:
      return "Portal";
    case 3:
      return "Root";
    case 6:
      return "Text";
    case 16:
      return od(e);
    case 8:
      return e === ep ? "StrictMode" : "Mode";
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
      if (typeof e == "function") return e.displayName || e.name || null;
      if (typeof e == "string") return e;
  }
  return null;
}
function Ir(t) {
  switch (typeof t) {
    case "boolean":
    case "number":
    case "string":
    case "undefined":
      return t;
    case "object":
      return t;
    default:
      return "";
  }
}
function n_(t) {
  var e = t.type;
  return (t = t.nodeName) && t.toLowerCase() === "input" && (e === "checkbox" || e === "radio");
}
function _M(t) {
  var e = n_(t) ? "checked" : "value", n = Object.getOwnPropertyDescriptor(t.constructor.prototype, e), i = "" + t[e];
  if (!t.hasOwnProperty(e) && typeof n < "u" && typeof n.get == "function" && typeof n.set == "function") {
    var r = n.get, s = n.set;
    return Object.defineProperty(t, e, { configurable: !0, get: function() {
      return r.call(this);
    }, set: function(o) {
      i = "" + o, s.call(this, o);
    } }), Object.defineProperty(t, e, { enumerable: n.enumerable }), { getValue: function() {
      return i;
    }, setValue: function(o) {
      i = "" + o;
    }, stopTracking: function() {
      t._valueTracker = null, delete t[e];
    } };
  }
}
function il(t) {
  t._valueTracker || (t._valueTracker = _M(t));
}
function i_(t) {
  if (!t) return !1;
  var e = t._valueTracker;
  if (!e) return !0;
  var n = e.getValue(), i = "";
  return t && (i = n_(t) ? t.checked ? "true" : "false" : t.value), t = i, t !== n ? (e.setValue(t), !0) : !1;
}
function xu(t) {
  if (t = t || (typeof document < "u" ? document : void 0), typeof t > "u") return null;
  try {
    return t.activeElement || t.body;
  } catch {
    return t.body;
  }
}
function ad(t, e) {
  var n = e.checked;
  return _t({}, e, { defaultChecked: void 0, defaultValue: void 0, value: void 0, checked: n ?? t._wrapperState.initialChecked });
}
function km(t, e) {
  var n = e.defaultValue == null ? "" : e.defaultValue, i = e.checked != null ? e.checked : e.defaultChecked;
  n = Ir(e.value != null ? e.value : n), t._wrapperState = { initialChecked: i, initialValue: n, controlled: e.type === "checkbox" || e.type === "radio" ? e.checked != null : e.value != null };
}
function r_(t, e) {
  e = e.checked, e != null && Jh(t, "checked", e, !1);
}
function ld(t, e) {
  r_(t, e);
  var n = Ir(e.value), i = e.type;
  if (n != null) i === "number" ? (n === 0 && t.value === "" || t.value != n) && (t.value = "" + n) : t.value !== "" + n && (t.value = "" + n);
  else if (i === "submit" || i === "reset") {
    t.removeAttribute("value");
    return;
  }
  e.hasOwnProperty("value") ? ud(t, e.type, n) : e.hasOwnProperty("defaultValue") && ud(t, e.type, Ir(e.defaultValue)), e.checked == null && e.defaultChecked != null && (t.defaultChecked = !!e.defaultChecked);
}
function Fm(t, e, n) {
  if (e.hasOwnProperty("value") || e.hasOwnProperty("defaultValue")) {
    var i = e.type;
    if (!(i !== "submit" && i !== "reset" || e.value !== void 0 && e.value !== null)) return;
    e = "" + t._wrapperState.initialValue, n || e === t.value || (t.value = e), t.defaultValue = e;
  }
  n = t.name, n !== "" && (t.name = ""), t.defaultChecked = !!t._wrapperState.initialChecked, n !== "" && (t.name = n);
}
function ud(t, e, n) {
  (e !== "number" || xu(t.ownerDocument) !== t) && (n == null ? t.defaultValue = "" + t._wrapperState.initialValue : t.defaultValue !== "" + n && (t.defaultValue = "" + n));
}
var ea = Array.isArray;
function Js(t, e, n, i) {
  if (t = t.options, e) {
    e = {};
    for (var r = 0; r < n.length; r++) e["$" + n[r]] = !0;
    for (n = 0; n < t.length; n++) r = e.hasOwnProperty("$" + t[n].value), t[n].selected !== r && (t[n].selected = r), r && i && (t[n].defaultSelected = !0);
  } else {
    for (n = "" + Ir(n), e = null, r = 0; r < t.length; r++) {
      if (t[r].value === n) {
        t[r].selected = !0, i && (t[r].defaultSelected = !0);
        return;
      }
      e !== null || t[r].disabled || (e = t[r]);
    }
    e !== null && (e.selected = !0);
  }
}
function cd(t, e) {
  if (e.dangerouslySetInnerHTML != null) throw Error(ee(91));
  return _t({}, e, { value: void 0, defaultValue: void 0, children: "" + t._wrapperState.initialValue });
}
function Om(t, e) {
  var n = e.value;
  if (n == null) {
    if (n = e.children, e = e.defaultValue, n != null) {
      if (e != null) throw Error(ee(92));
      if (ea(n)) {
        if (1 < n.length) throw Error(ee(93));
        n = n[0];
      }
      e = n;
    }
    e == null && (e = ""), n = e;
  }
  t._wrapperState = { initialValue: Ir(n) };
}
function s_(t, e) {
  var n = Ir(e.value), i = Ir(e.defaultValue);
  n != null && (n = "" + n, n !== t.value && (t.value = n), e.defaultValue == null && t.defaultValue !== n && (t.defaultValue = n)), i != null && (t.defaultValue = "" + i);
}
function Bm(t) {
  var e = t.textContent;
  e === t._wrapperState.initialValue && e !== "" && e !== null && (t.value = e);
}
function o_(t) {
  switch (t) {
    case "svg":
      return "http://www.w3.org/2000/svg";
    case "math":
      return "http://www.w3.org/1998/Math/MathML";
    default:
      return "http://www.w3.org/1999/xhtml";
  }
}
function fd(t, e) {
  return t == null || t === "http://www.w3.org/1999/xhtml" ? o_(e) : t === "http://www.w3.org/2000/svg" && e === "foreignObject" ? "http://www.w3.org/1999/xhtml" : t;
}
var rl, a_ = function(t) {
  return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction ? function(e, n, i, r) {
    MSApp.execUnsafeLocalFunction(function() {
      return t(e, n, i, r);
    });
  } : t;
}(function(t, e) {
  if (t.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in t) t.innerHTML = e;
  else {
    for (rl = rl || document.createElement("div"), rl.innerHTML = "<svg>" + e.valueOf().toString() + "</svg>", e = rl.firstChild; t.firstChild; ) t.removeChild(t.firstChild);
    for (; e.firstChild; ) t.appendChild(e.firstChild);
  }
});
function Ma(t, e) {
  if (e) {
    var n = t.firstChild;
    if (n && n === t.lastChild && n.nodeType === 3) {
      n.nodeValue = e;
      return;
    }
  }
  t.textContent = e;
}
var ca = {
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
}, xM = ["Webkit", "ms", "Moz", "O"];
Object.keys(ca).forEach(function(t) {
  xM.forEach(function(e) {
    e = e + t.charAt(0).toUpperCase() + t.substring(1), ca[e] = ca[t];
  });
});
function l_(t, e, n) {
  return e == null || typeof e == "boolean" || e === "" ? "" : n || typeof e != "number" || e === 0 || ca.hasOwnProperty(t) && ca[t] ? ("" + e).trim() : e + "px";
}
function u_(t, e) {
  t = t.style;
  for (var n in e) if (e.hasOwnProperty(n)) {
    var i = n.indexOf("--") === 0, r = l_(n, e[n], i);
    n === "float" && (n = "cssFloat"), i ? t.setProperty(n, r) : t[n] = r;
  }
}
var yM = _t({ menuitem: !0 }, { area: !0, base: !0, br: !0, col: !0, embed: !0, hr: !0, img: !0, input: !0, keygen: !0, link: !0, meta: !0, param: !0, source: !0, track: !0, wbr: !0 });
function dd(t, e) {
  if (e) {
    if (yM[t] && (e.children != null || e.dangerouslySetInnerHTML != null)) throw Error(ee(137, t));
    if (e.dangerouslySetInnerHTML != null) {
      if (e.children != null) throw Error(ee(60));
      if (typeof e.dangerouslySetInnerHTML != "object" || !("__html" in e.dangerouslySetInnerHTML)) throw Error(ee(61));
    }
    if (e.style != null && typeof e.style != "object") throw Error(ee(62));
  }
}
function hd(t, e) {
  if (t.indexOf("-") === -1) return typeof e.is == "string";
  switch (t) {
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
var pd = null;
function ip(t) {
  return t = t.target || t.srcElement || window, t.correspondingUseElement && (t = t.correspondingUseElement), t.nodeType === 3 ? t.parentNode : t;
}
var md = null, eo = null, to = null;
function zm(t) {
  if (t = Xa(t)) {
    if (typeof md != "function") throw Error(ee(280));
    var e = t.stateNode;
    e && (e = fc(e), md(t.stateNode, t.type, e));
  }
}
function c_(t) {
  eo ? to ? to.push(t) : to = [t] : eo = t;
}
function f_() {
  if (eo) {
    var t = eo, e = to;
    if (to = eo = null, zm(t), e) for (t = 0; t < e.length; t++) zm(e[t]);
  }
}
function d_(t, e) {
  return t(e);
}
function h_() {
}
var Hc = !1;
function p_(t, e, n) {
  if (Hc) return t(e, n);
  Hc = !0;
  try {
    return d_(t, e, n);
  } finally {
    Hc = !1, (eo !== null || to !== null) && (h_(), f_());
  }
}
function Ea(t, e) {
  var n = t.stateNode;
  if (n === null) return null;
  var i = fc(n);
  if (i === null) return null;
  n = i[e];
  e: switch (e) {
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
      (i = !i.disabled) || (t = t.type, i = !(t === "button" || t === "input" || t === "select" || t === "textarea")), t = !i;
      break e;
    default:
      t = !1;
  }
  if (t) return null;
  if (n && typeof n != "function") throw Error(ee(231, e, typeof n));
  return n;
}
var gd = !1;
if (qi) try {
  var Oo = {};
  Object.defineProperty(Oo, "passive", { get: function() {
    gd = !0;
  } }), window.addEventListener("test", Oo, Oo), window.removeEventListener("test", Oo, Oo);
} catch {
  gd = !1;
}
function SM(t, e, n, i, r, s, o, a, l) {
  var u = Array.prototype.slice.call(arguments, 3);
  try {
    e.apply(n, u);
  } catch (c) {
    this.onError(c);
  }
}
var fa = !1, yu = null, Su = !1, vd = null, MM = { onError: function(t) {
  fa = !0, yu = t;
} };
function EM(t, e, n, i, r, s, o, a, l) {
  fa = !1, yu = null, SM.apply(MM, arguments);
}
function wM(t, e, n, i, r, s, o, a, l) {
  if (EM.apply(this, arguments), fa) {
    if (fa) {
      var u = yu;
      fa = !1, yu = null;
    } else throw Error(ee(198));
    Su || (Su = !0, vd = u);
  }
}
function xs(t) {
  var e = t, n = t;
  if (t.alternate) for (; e.return; ) e = e.return;
  else {
    t = e;
    do
      e = t, e.flags & 4098 && (n = e.return), t = e.return;
    while (t);
  }
  return e.tag === 3 ? n : null;
}
function m_(t) {
  if (t.tag === 13) {
    var e = t.memoizedState;
    if (e === null && (t = t.alternate, t !== null && (e = t.memoizedState)), e !== null) return e.dehydrated;
  }
  return null;
}
function Hm(t) {
  if (xs(t) !== t) throw Error(ee(188));
}
function TM(t) {
  var e = t.alternate;
  if (!e) {
    if (e = xs(t), e === null) throw Error(ee(188));
    return e !== t ? null : t;
  }
  for (var n = t, i = e; ; ) {
    var r = n.return;
    if (r === null) break;
    var s = r.alternate;
    if (s === null) {
      if (i = r.return, i !== null) {
        n = i;
        continue;
      }
      break;
    }
    if (r.child === s.child) {
      for (s = r.child; s; ) {
        if (s === n) return Hm(r), t;
        if (s === i) return Hm(r), e;
        s = s.sibling;
      }
      throw Error(ee(188));
    }
    if (n.return !== i.return) n = r, i = s;
    else {
      for (var o = !1, a = r.child; a; ) {
        if (a === n) {
          o = !0, n = r, i = s;
          break;
        }
        if (a === i) {
          o = !0, i = r, n = s;
          break;
        }
        a = a.sibling;
      }
      if (!o) {
        for (a = s.child; a; ) {
          if (a === n) {
            o = !0, n = s, i = r;
            break;
          }
          if (a === i) {
            o = !0, i = s, n = r;
            break;
          }
          a = a.sibling;
        }
        if (!o) throw Error(ee(189));
      }
    }
    if (n.alternate !== i) throw Error(ee(190));
  }
  if (n.tag !== 3) throw Error(ee(188));
  return n.stateNode.current === n ? t : e;
}
function g_(t) {
  return t = TM(t), t !== null ? v_(t) : null;
}
function v_(t) {
  if (t.tag === 5 || t.tag === 6) return t;
  for (t = t.child; t !== null; ) {
    var e = v_(t);
    if (e !== null) return e;
    t = t.sibling;
  }
  return null;
}
var __ = Hn.unstable_scheduleCallback, Vm = Hn.unstable_cancelCallback, CM = Hn.unstable_shouldYield, AM = Hn.unstable_requestPaint, Ct = Hn.unstable_now, RM = Hn.unstable_getCurrentPriorityLevel, rp = Hn.unstable_ImmediatePriority, x_ = Hn.unstable_UserBlockingPriority, Mu = Hn.unstable_NormalPriority, bM = Hn.unstable_LowPriority, y_ = Hn.unstable_IdlePriority, ac = null, Ti = null;
function PM(t) {
  if (Ti && typeof Ti.onCommitFiberRoot == "function") try {
    Ti.onCommitFiberRoot(ac, t, void 0, (t.current.flags & 128) === 128);
  } catch {
  }
}
var hi = Math.clz32 ? Math.clz32 : IM, LM = Math.log, DM = Math.LN2;
function IM(t) {
  return t >>>= 0, t === 0 ? 32 : 31 - (LM(t) / DM | 0) | 0;
}
var sl = 64, ol = 4194304;
function ta(t) {
  switch (t & -t) {
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
      return t & 4194240;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return t & 130023424;
    case 134217728:
      return 134217728;
    case 268435456:
      return 268435456;
    case 536870912:
      return 536870912;
    case 1073741824:
      return 1073741824;
    default:
      return t;
  }
}
function Eu(t, e) {
  var n = t.pendingLanes;
  if (n === 0) return 0;
  var i = 0, r = t.suspendedLanes, s = t.pingedLanes, o = n & 268435455;
  if (o !== 0) {
    var a = o & ~r;
    a !== 0 ? i = ta(a) : (s &= o, s !== 0 && (i = ta(s)));
  } else o = n & ~r, o !== 0 ? i = ta(o) : s !== 0 && (i = ta(s));
  if (i === 0) return 0;
  if (e !== 0 && e !== i && !(e & r) && (r = i & -i, s = e & -e, r >= s || r === 16 && (s & 4194240) !== 0)) return e;
  if (i & 4 && (i |= n & 16), e = t.entangledLanes, e !== 0) for (t = t.entanglements, e &= i; 0 < e; ) n = 31 - hi(e), r = 1 << n, i |= t[n], e &= ~r;
  return i;
}
function NM(t, e) {
  switch (t) {
    case 1:
    case 2:
    case 4:
      return e + 250;
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
      return e + 5e3;
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
function UM(t, e) {
  for (var n = t.suspendedLanes, i = t.pingedLanes, r = t.expirationTimes, s = t.pendingLanes; 0 < s; ) {
    var o = 31 - hi(s), a = 1 << o, l = r[o];
    l === -1 ? (!(a & n) || a & i) && (r[o] = NM(a, e)) : l <= e && (t.expiredLanes |= a), s &= ~a;
  }
}
function _d(t) {
  return t = t.pendingLanes & -1073741825, t !== 0 ? t : t & 1073741824 ? 1073741824 : 0;
}
function S_() {
  var t = sl;
  return sl <<= 1, !(sl & 4194240) && (sl = 64), t;
}
function Vc(t) {
  for (var e = [], n = 0; 31 > n; n++) e.push(t);
  return e;
}
function $a(t, e, n) {
  t.pendingLanes |= e, e !== 536870912 && (t.suspendedLanes = 0, t.pingedLanes = 0), t = t.eventTimes, e = 31 - hi(e), t[e] = n;
}
function kM(t, e) {
  var n = t.pendingLanes & ~e;
  t.pendingLanes = e, t.suspendedLanes = 0, t.pingedLanes = 0, t.expiredLanes &= e, t.mutableReadLanes &= e, t.entangledLanes &= e, e = t.entanglements;
  var i = t.eventTimes;
  for (t = t.expirationTimes; 0 < n; ) {
    var r = 31 - hi(n), s = 1 << r;
    e[r] = 0, i[r] = -1, t[r] = -1, n &= ~s;
  }
}
function sp(t, e) {
  var n = t.entangledLanes |= e;
  for (t = t.entanglements; n; ) {
    var i = 31 - hi(n), r = 1 << i;
    r & e | t[i] & e && (t[i] |= e), n &= ~r;
  }
}
var it = 0;
function M_(t) {
  return t &= -t, 1 < t ? 4 < t ? t & 268435455 ? 16 : 536870912 : 4 : 1;
}
var E_, op, w_, T_, C_, xd = !1, al = [], wr = null, Tr = null, Cr = null, wa = /* @__PURE__ */ new Map(), Ta = /* @__PURE__ */ new Map(), vr = [], FM = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
function Gm(t, e) {
  switch (t) {
    case "focusin":
    case "focusout":
      wr = null;
      break;
    case "dragenter":
    case "dragleave":
      Tr = null;
      break;
    case "mouseover":
    case "mouseout":
      Cr = null;
      break;
    case "pointerover":
    case "pointerout":
      wa.delete(e.pointerId);
      break;
    case "gotpointercapture":
    case "lostpointercapture":
      Ta.delete(e.pointerId);
  }
}
function Bo(t, e, n, i, r, s) {
  return t === null || t.nativeEvent !== s ? (t = { blockedOn: e, domEventName: n, eventSystemFlags: i, nativeEvent: s, targetContainers: [r] }, e !== null && (e = Xa(e), e !== null && op(e)), t) : (t.eventSystemFlags |= i, e = t.targetContainers, r !== null && e.indexOf(r) === -1 && e.push(r), t);
}
function OM(t, e, n, i, r) {
  switch (e) {
    case "focusin":
      return wr = Bo(wr, t, e, n, i, r), !0;
    case "dragenter":
      return Tr = Bo(Tr, t, e, n, i, r), !0;
    case "mouseover":
      return Cr = Bo(Cr, t, e, n, i, r), !0;
    case "pointerover":
      var s = r.pointerId;
      return wa.set(s, Bo(wa.get(s) || null, t, e, n, i, r)), !0;
    case "gotpointercapture":
      return s = r.pointerId, Ta.set(s, Bo(Ta.get(s) || null, t, e, n, i, r)), !0;
  }
  return !1;
}
function A_(t) {
  var e = is(t.target);
  if (e !== null) {
    var n = xs(e);
    if (n !== null) {
      if (e = n.tag, e === 13) {
        if (e = m_(n), e !== null) {
          t.blockedOn = e, C_(t.priority, function() {
            w_(n);
          });
          return;
        }
      } else if (e === 3 && n.stateNode.current.memoizedState.isDehydrated) {
        t.blockedOn = n.tag === 3 ? n.stateNode.containerInfo : null;
        return;
      }
    }
  }
  t.blockedOn = null;
}
function jl(t) {
  if (t.blockedOn !== null) return !1;
  for (var e = t.targetContainers; 0 < e.length; ) {
    var n = yd(t.domEventName, t.eventSystemFlags, e[0], t.nativeEvent);
    if (n === null) {
      n = t.nativeEvent;
      var i = new n.constructor(n.type, n);
      pd = i, n.target.dispatchEvent(i), pd = null;
    } else return e = Xa(n), e !== null && op(e), t.blockedOn = n, !1;
    e.shift();
  }
  return !0;
}
function Wm(t, e, n) {
  jl(t) && n.delete(e);
}
function BM() {
  xd = !1, wr !== null && jl(wr) && (wr = null), Tr !== null && jl(Tr) && (Tr = null), Cr !== null && jl(Cr) && (Cr = null), wa.forEach(Wm), Ta.forEach(Wm);
}
function zo(t, e) {
  t.blockedOn === e && (t.blockedOn = null, xd || (xd = !0, Hn.unstable_scheduleCallback(Hn.unstable_NormalPriority, BM)));
}
function Ca(t) {
  function e(r) {
    return zo(r, t);
  }
  if (0 < al.length) {
    zo(al[0], t);
    for (var n = 1; n < al.length; n++) {
      var i = al[n];
      i.blockedOn === t && (i.blockedOn = null);
    }
  }
  for (wr !== null && zo(wr, t), Tr !== null && zo(Tr, t), Cr !== null && zo(Cr, t), wa.forEach(e), Ta.forEach(e), n = 0; n < vr.length; n++) i = vr[n], i.blockedOn === t && (i.blockedOn = null);
  for (; 0 < vr.length && (n = vr[0], n.blockedOn === null); ) A_(n), n.blockedOn === null && vr.shift();
}
var no = nr.ReactCurrentBatchConfig, wu = !0;
function zM(t, e, n, i) {
  var r = it, s = no.transition;
  no.transition = null;
  try {
    it = 1, ap(t, e, n, i);
  } finally {
    it = r, no.transition = s;
  }
}
function HM(t, e, n, i) {
  var r = it, s = no.transition;
  no.transition = null;
  try {
    it = 4, ap(t, e, n, i);
  } finally {
    it = r, no.transition = s;
  }
}
function ap(t, e, n, i) {
  if (wu) {
    var r = yd(t, e, n, i);
    if (r === null) Qc(t, e, i, Tu, n), Gm(t, i);
    else if (OM(r, t, e, n, i)) i.stopPropagation();
    else if (Gm(t, i), e & 4 && -1 < FM.indexOf(t)) {
      for (; r !== null; ) {
        var s = Xa(r);
        if (s !== null && E_(s), s = yd(t, e, n, i), s === null && Qc(t, e, i, Tu, n), s === r) break;
        r = s;
      }
      r !== null && i.stopPropagation();
    } else Qc(t, e, i, null, n);
  }
}
var Tu = null;
function yd(t, e, n, i) {
  if (Tu = null, t = ip(i), t = is(t), t !== null) if (e = xs(t), e === null) t = null;
  else if (n = e.tag, n === 13) {
    if (t = m_(e), t !== null) return t;
    t = null;
  } else if (n === 3) {
    if (e.stateNode.current.memoizedState.isDehydrated) return e.tag === 3 ? e.stateNode.containerInfo : null;
    t = null;
  } else e !== t && (t = null);
  return Tu = t, null;
}
function R_(t) {
  switch (t) {
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
      switch (RM()) {
        case rp:
          return 1;
        case x_:
          return 4;
        case Mu:
        case bM:
          return 16;
        case y_:
          return 536870912;
        default:
          return 16;
      }
    default:
      return 16;
  }
}
var yr = null, lp = null, Xl = null;
function b_() {
  if (Xl) return Xl;
  var t, e = lp, n = e.length, i, r = "value" in yr ? yr.value : yr.textContent, s = r.length;
  for (t = 0; t < n && e[t] === r[t]; t++) ;
  var o = n - t;
  for (i = 1; i <= o && e[n - i] === r[s - i]; i++) ;
  return Xl = r.slice(t, 1 < i ? 1 - i : void 0);
}
function Yl(t) {
  var e = t.keyCode;
  return "charCode" in t ? (t = t.charCode, t === 0 && e === 13 && (t = 13)) : t = e, t === 10 && (t = 13), 32 <= t || t === 13 ? t : 0;
}
function ll() {
  return !0;
}
function $m() {
  return !1;
}
function Gn(t) {
  function e(n, i, r, s, o) {
    this._reactName = n, this._targetInst = r, this.type = i, this.nativeEvent = s, this.target = o, this.currentTarget = null;
    for (var a in t) t.hasOwnProperty(a) && (n = t[a], this[a] = n ? n(s) : s[a]);
    return this.isDefaultPrevented = (s.defaultPrevented != null ? s.defaultPrevented : s.returnValue === !1) ? ll : $m, this.isPropagationStopped = $m, this;
  }
  return _t(e.prototype, { preventDefault: function() {
    this.defaultPrevented = !0;
    var n = this.nativeEvent;
    n && (n.preventDefault ? n.preventDefault() : typeof n.returnValue != "unknown" && (n.returnValue = !1), this.isDefaultPrevented = ll);
  }, stopPropagation: function() {
    var n = this.nativeEvent;
    n && (n.stopPropagation ? n.stopPropagation() : typeof n.cancelBubble != "unknown" && (n.cancelBubble = !0), this.isPropagationStopped = ll);
  }, persist: function() {
  }, isPersistent: ll }), e;
}
var Ro = { eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function(t) {
  return t.timeStamp || Date.now();
}, defaultPrevented: 0, isTrusted: 0 }, up = Gn(Ro), ja = _t({}, Ro, { view: 0, detail: 0 }), VM = Gn(ja), Gc, Wc, Ho, lc = _t({}, ja, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: cp, button: 0, buttons: 0, relatedTarget: function(t) {
  return t.relatedTarget === void 0 ? t.fromElement === t.srcElement ? t.toElement : t.fromElement : t.relatedTarget;
}, movementX: function(t) {
  return "movementX" in t ? t.movementX : (t !== Ho && (Ho && t.type === "mousemove" ? (Gc = t.screenX - Ho.screenX, Wc = t.screenY - Ho.screenY) : Wc = Gc = 0, Ho = t), Gc);
}, movementY: function(t) {
  return "movementY" in t ? t.movementY : Wc;
} }), jm = Gn(lc), GM = _t({}, lc, { dataTransfer: 0 }), WM = Gn(GM), $M = _t({}, ja, { relatedTarget: 0 }), $c = Gn($M), jM = _t({}, Ro, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }), XM = Gn(jM), YM = _t({}, Ro, { clipboardData: function(t) {
  return "clipboardData" in t ? t.clipboardData : window.clipboardData;
} }), qM = Gn(YM), KM = _t({}, Ro, { data: 0 }), Xm = Gn(KM), ZM = {
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
}, QM = {
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
}, JM = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
function e1(t) {
  var e = this.nativeEvent;
  return e.getModifierState ? e.getModifierState(t) : (t = JM[t]) ? !!e[t] : !1;
}
function cp() {
  return e1;
}
var t1 = _t({}, ja, { key: function(t) {
  if (t.key) {
    var e = ZM[t.key] || t.key;
    if (e !== "Unidentified") return e;
  }
  return t.type === "keypress" ? (t = Yl(t), t === 13 ? "Enter" : String.fromCharCode(t)) : t.type === "keydown" || t.type === "keyup" ? QM[t.keyCode] || "Unidentified" : "";
}, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: cp, charCode: function(t) {
  return t.type === "keypress" ? Yl(t) : 0;
}, keyCode: function(t) {
  return t.type === "keydown" || t.type === "keyup" ? t.keyCode : 0;
}, which: function(t) {
  return t.type === "keypress" ? Yl(t) : t.type === "keydown" || t.type === "keyup" ? t.keyCode : 0;
} }), n1 = Gn(t1), i1 = _t({}, lc, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 }), Ym = Gn(i1), r1 = _t({}, ja, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: cp }), s1 = Gn(r1), o1 = _t({}, Ro, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }), a1 = Gn(o1), l1 = _t({}, lc, {
  deltaX: function(t) {
    return "deltaX" in t ? t.deltaX : "wheelDeltaX" in t ? -t.wheelDeltaX : 0;
  },
  deltaY: function(t) {
    return "deltaY" in t ? t.deltaY : "wheelDeltaY" in t ? -t.wheelDeltaY : "wheelDelta" in t ? -t.wheelDelta : 0;
  },
  deltaZ: 0,
  deltaMode: 0
}), u1 = Gn(l1), c1 = [9, 13, 27, 32], fp = qi && "CompositionEvent" in window, da = null;
qi && "documentMode" in document && (da = document.documentMode);
var f1 = qi && "TextEvent" in window && !da, P_ = qi && (!fp || da && 8 < da && 11 >= da), qm = " ", Km = !1;
function L_(t, e) {
  switch (t) {
    case "keyup":
      return c1.indexOf(e.keyCode) !== -1;
    case "keydown":
      return e.keyCode !== 229;
    case "keypress":
    case "mousedown":
    case "focusout":
      return !0;
    default:
      return !1;
  }
}
function D_(t) {
  return t = t.detail, typeof t == "object" && "data" in t ? t.data : null;
}
var Vs = !1;
function d1(t, e) {
  switch (t) {
    case "compositionend":
      return D_(e);
    case "keypress":
      return e.which !== 32 ? null : (Km = !0, qm);
    case "textInput":
      return t = e.data, t === qm && Km ? null : t;
    default:
      return null;
  }
}
function h1(t, e) {
  if (Vs) return t === "compositionend" || !fp && L_(t, e) ? (t = b_(), Xl = lp = yr = null, Vs = !1, t) : null;
  switch (t) {
    case "paste":
      return null;
    case "keypress":
      if (!(e.ctrlKey || e.altKey || e.metaKey) || e.ctrlKey && e.altKey) {
        if (e.char && 1 < e.char.length) return e.char;
        if (e.which) return String.fromCharCode(e.which);
      }
      return null;
    case "compositionend":
      return P_ && e.locale !== "ko" ? null : e.data;
    default:
      return null;
  }
}
var p1 = { color: !0, date: !0, datetime: !0, "datetime-local": !0, email: !0, month: !0, number: !0, password: !0, range: !0, search: !0, tel: !0, text: !0, time: !0, url: !0, week: !0 };
function Zm(t) {
  var e = t && t.nodeName && t.nodeName.toLowerCase();
  return e === "input" ? !!p1[t.type] : e === "textarea";
}
function I_(t, e, n, i) {
  c_(i), e = Cu(e, "onChange"), 0 < e.length && (n = new up("onChange", "change", null, n, i), t.push({ event: n, listeners: e }));
}
var ha = null, Aa = null;
function m1(t) {
  W_(t, 0);
}
function uc(t) {
  var e = $s(t);
  if (i_(e)) return t;
}
function g1(t, e) {
  if (t === "change") return e;
}
var N_ = !1;
if (qi) {
  var jc;
  if (qi) {
    var Xc = "oninput" in document;
    if (!Xc) {
      var Qm = document.createElement("div");
      Qm.setAttribute("oninput", "return;"), Xc = typeof Qm.oninput == "function";
    }
    jc = Xc;
  } else jc = !1;
  N_ = jc && (!document.documentMode || 9 < document.documentMode);
}
function Jm() {
  ha && (ha.detachEvent("onpropertychange", U_), Aa = ha = null);
}
function U_(t) {
  if (t.propertyName === "value" && uc(Aa)) {
    var e = [];
    I_(e, Aa, t, ip(t)), p_(m1, e);
  }
}
function v1(t, e, n) {
  t === "focusin" ? (Jm(), ha = e, Aa = n, ha.attachEvent("onpropertychange", U_)) : t === "focusout" && Jm();
}
function _1(t) {
  if (t === "selectionchange" || t === "keyup" || t === "keydown") return uc(Aa);
}
function x1(t, e) {
  if (t === "click") return uc(e);
}
function y1(t, e) {
  if (t === "input" || t === "change") return uc(e);
}
function S1(t, e) {
  return t === e && (t !== 0 || 1 / t === 1 / e) || t !== t && e !== e;
}
var gi = typeof Object.is == "function" ? Object.is : S1;
function Ra(t, e) {
  if (gi(t, e)) return !0;
  if (typeof t != "object" || t === null || typeof e != "object" || e === null) return !1;
  var n = Object.keys(t), i = Object.keys(e);
  if (n.length !== i.length) return !1;
  for (i = 0; i < n.length; i++) {
    var r = n[i];
    if (!nd.call(e, r) || !gi(t[r], e[r])) return !1;
  }
  return !0;
}
function eg(t) {
  for (; t && t.firstChild; ) t = t.firstChild;
  return t;
}
function tg(t, e) {
  var n = eg(t);
  t = 0;
  for (var i; n; ) {
    if (n.nodeType === 3) {
      if (i = t + n.textContent.length, t <= e && i >= e) return { node: n, offset: e - t };
      t = i;
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
    n = eg(n);
  }
}
function k_(t, e) {
  return t && e ? t === e ? !0 : t && t.nodeType === 3 ? !1 : e && e.nodeType === 3 ? k_(t, e.parentNode) : "contains" in t ? t.contains(e) : t.compareDocumentPosition ? !!(t.compareDocumentPosition(e) & 16) : !1 : !1;
}
function F_() {
  for (var t = window, e = xu(); e instanceof t.HTMLIFrameElement; ) {
    try {
      var n = typeof e.contentWindow.location.href == "string";
    } catch {
      n = !1;
    }
    if (n) t = e.contentWindow;
    else break;
    e = xu(t.document);
  }
  return e;
}
function dp(t) {
  var e = t && t.nodeName && t.nodeName.toLowerCase();
  return e && (e === "input" && (t.type === "text" || t.type === "search" || t.type === "tel" || t.type === "url" || t.type === "password") || e === "textarea" || t.contentEditable === "true");
}
function M1(t) {
  var e = F_(), n = t.focusedElem, i = t.selectionRange;
  if (e !== n && n && n.ownerDocument && k_(n.ownerDocument.documentElement, n)) {
    if (i !== null && dp(n)) {
      if (e = i.start, t = i.end, t === void 0 && (t = e), "selectionStart" in n) n.selectionStart = e, n.selectionEnd = Math.min(t, n.value.length);
      else if (t = (e = n.ownerDocument || document) && e.defaultView || window, t.getSelection) {
        t = t.getSelection();
        var r = n.textContent.length, s = Math.min(i.start, r);
        i = i.end === void 0 ? s : Math.min(i.end, r), !t.extend && s > i && (r = i, i = s, s = r), r = tg(n, s);
        var o = tg(
          n,
          i
        );
        r && o && (t.rangeCount !== 1 || t.anchorNode !== r.node || t.anchorOffset !== r.offset || t.focusNode !== o.node || t.focusOffset !== o.offset) && (e = e.createRange(), e.setStart(r.node, r.offset), t.removeAllRanges(), s > i ? (t.addRange(e), t.extend(o.node, o.offset)) : (e.setEnd(o.node, o.offset), t.addRange(e)));
      }
    }
    for (e = [], t = n; t = t.parentNode; ) t.nodeType === 1 && e.push({ element: t, left: t.scrollLeft, top: t.scrollTop });
    for (typeof n.focus == "function" && n.focus(), n = 0; n < e.length; n++) t = e[n], t.element.scrollLeft = t.left, t.element.scrollTop = t.top;
  }
}
var E1 = qi && "documentMode" in document && 11 >= document.documentMode, Gs = null, Sd = null, pa = null, Md = !1;
function ng(t, e, n) {
  var i = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
  Md || Gs == null || Gs !== xu(i) || (i = Gs, "selectionStart" in i && dp(i) ? i = { start: i.selectionStart, end: i.selectionEnd } : (i = (i.ownerDocument && i.ownerDocument.defaultView || window).getSelection(), i = { anchorNode: i.anchorNode, anchorOffset: i.anchorOffset, focusNode: i.focusNode, focusOffset: i.focusOffset }), pa && Ra(pa, i) || (pa = i, i = Cu(Sd, "onSelect"), 0 < i.length && (e = new up("onSelect", "select", null, e, n), t.push({ event: e, listeners: i }), e.target = Gs)));
}
function ul(t, e) {
  var n = {};
  return n[t.toLowerCase()] = e.toLowerCase(), n["Webkit" + t] = "webkit" + e, n["Moz" + t] = "moz" + e, n;
}
var Ws = { animationend: ul("Animation", "AnimationEnd"), animationiteration: ul("Animation", "AnimationIteration"), animationstart: ul("Animation", "AnimationStart"), transitionend: ul("Transition", "TransitionEnd") }, Yc = {}, O_ = {};
qi && (O_ = document.createElement("div").style, "AnimationEvent" in window || (delete Ws.animationend.animation, delete Ws.animationiteration.animation, delete Ws.animationstart.animation), "TransitionEvent" in window || delete Ws.transitionend.transition);
function cc(t) {
  if (Yc[t]) return Yc[t];
  if (!Ws[t]) return t;
  var e = Ws[t], n;
  for (n in e) if (e.hasOwnProperty(n) && n in O_) return Yc[t] = e[n];
  return t;
}
var B_ = cc("animationend"), z_ = cc("animationiteration"), H_ = cc("animationstart"), V_ = cc("transitionend"), G_ = /* @__PURE__ */ new Map(), ig = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
function kr(t, e) {
  G_.set(t, e), _s(e, [t]);
}
for (var qc = 0; qc < ig.length; qc++) {
  var Kc = ig[qc], w1 = Kc.toLowerCase(), T1 = Kc[0].toUpperCase() + Kc.slice(1);
  kr(w1, "on" + T1);
}
kr(B_, "onAnimationEnd");
kr(z_, "onAnimationIteration");
kr(H_, "onAnimationStart");
kr("dblclick", "onDoubleClick");
kr("focusin", "onFocus");
kr("focusout", "onBlur");
kr(V_, "onTransitionEnd");
lo("onMouseEnter", ["mouseout", "mouseover"]);
lo("onMouseLeave", ["mouseout", "mouseover"]);
lo("onPointerEnter", ["pointerout", "pointerover"]);
lo("onPointerLeave", ["pointerout", "pointerover"]);
_s("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" "));
_s("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));
_s("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
_s("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" "));
_s("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" "));
_s("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
var na = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), C1 = new Set("cancel close invalid load scroll toggle".split(" ").concat(na));
function rg(t, e, n) {
  var i = t.type || "unknown-event";
  t.currentTarget = n, wM(i, e, void 0, t), t.currentTarget = null;
}
function W_(t, e) {
  e = (e & 4) !== 0;
  for (var n = 0; n < t.length; n++) {
    var i = t[n], r = i.event;
    i = i.listeners;
    e: {
      var s = void 0;
      if (e) for (var o = i.length - 1; 0 <= o; o--) {
        var a = i[o], l = a.instance, u = a.currentTarget;
        if (a = a.listener, l !== s && r.isPropagationStopped()) break e;
        rg(r, a, u), s = l;
      }
      else for (o = 0; o < i.length; o++) {
        if (a = i[o], l = a.instance, u = a.currentTarget, a = a.listener, l !== s && r.isPropagationStopped()) break e;
        rg(r, a, u), s = l;
      }
    }
  }
  if (Su) throw t = vd, Su = !1, vd = null, t;
}
function dt(t, e) {
  var n = e[Ad];
  n === void 0 && (n = e[Ad] = /* @__PURE__ */ new Set());
  var i = t + "__bubble";
  n.has(i) || ($_(e, t, 2, !1), n.add(i));
}
function Zc(t, e, n) {
  var i = 0;
  e && (i |= 4), $_(n, t, i, e);
}
var cl = "_reactListening" + Math.random().toString(36).slice(2);
function ba(t) {
  if (!t[cl]) {
    t[cl] = !0, Q0.forEach(function(n) {
      n !== "selectionchange" && (C1.has(n) || Zc(n, !1, t), Zc(n, !0, t));
    });
    var e = t.nodeType === 9 ? t : t.ownerDocument;
    e === null || e[cl] || (e[cl] = !0, Zc("selectionchange", !1, e));
  }
}
function $_(t, e, n, i) {
  switch (R_(e)) {
    case 1:
      var r = zM;
      break;
    case 4:
      r = HM;
      break;
    default:
      r = ap;
  }
  n = r.bind(null, e, n, t), r = void 0, !gd || e !== "touchstart" && e !== "touchmove" && e !== "wheel" || (r = !0), i ? r !== void 0 ? t.addEventListener(e, n, { capture: !0, passive: r }) : t.addEventListener(e, n, !0) : r !== void 0 ? t.addEventListener(e, n, { passive: r }) : t.addEventListener(e, n, !1);
}
function Qc(t, e, n, i, r) {
  var s = i;
  if (!(e & 1) && !(e & 2) && i !== null) e: for (; ; ) {
    if (i === null) return;
    var o = i.tag;
    if (o === 3 || o === 4) {
      var a = i.stateNode.containerInfo;
      if (a === r || a.nodeType === 8 && a.parentNode === r) break;
      if (o === 4) for (o = i.return; o !== null; ) {
        var l = o.tag;
        if ((l === 3 || l === 4) && (l = o.stateNode.containerInfo, l === r || l.nodeType === 8 && l.parentNode === r)) return;
        o = o.return;
      }
      for (; a !== null; ) {
        if (o = is(a), o === null) return;
        if (l = o.tag, l === 5 || l === 6) {
          i = s = o;
          continue e;
        }
        a = a.parentNode;
      }
    }
    i = i.return;
  }
  p_(function() {
    var u = s, c = ip(n), d = [];
    e: {
      var h = G_.get(t);
      if (h !== void 0) {
        var p = up, _ = t;
        switch (t) {
          case "keypress":
            if (Yl(n) === 0) break e;
          case "keydown":
          case "keyup":
            p = n1;
            break;
          case "focusin":
            _ = "focus", p = $c;
            break;
          case "focusout":
            _ = "blur", p = $c;
            break;
          case "beforeblur":
          case "afterblur":
            p = $c;
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
            p = jm;
            break;
          case "drag":
          case "dragend":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "dragstart":
          case "drop":
            p = WM;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            p = s1;
            break;
          case B_:
          case z_:
          case H_:
            p = XM;
            break;
          case V_:
            p = a1;
            break;
          case "scroll":
            p = VM;
            break;
          case "wheel":
            p = u1;
            break;
          case "copy":
          case "cut":
          case "paste":
            p = qM;
            break;
          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
          case "pointerdown":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "pointerup":
            p = Ym;
        }
        var y = (e & 4) !== 0, m = !y && t === "scroll", f = y ? h !== null ? h + "Capture" : null : h;
        y = [];
        for (var v = u, g; v !== null; ) {
          g = v;
          var M = g.stateNode;
          if (g.tag === 5 && M !== null && (g = M, f !== null && (M = Ea(v, f), M != null && y.push(Pa(v, M, g)))), m) break;
          v = v.return;
        }
        0 < y.length && (h = new p(h, _, null, n, c), d.push({ event: h, listeners: y }));
      }
    }
    if (!(e & 7)) {
      e: {
        if (h = t === "mouseover" || t === "pointerover", p = t === "mouseout" || t === "pointerout", h && n !== pd && (_ = n.relatedTarget || n.fromElement) && (is(_) || _[Ki])) break e;
        if ((p || h) && (h = c.window === c ? c : (h = c.ownerDocument) ? h.defaultView || h.parentWindow : window, p ? (_ = n.relatedTarget || n.toElement, p = u, _ = _ ? is(_) : null, _ !== null && (m = xs(_), _ !== m || _.tag !== 5 && _.tag !== 6) && (_ = null)) : (p = null, _ = u), p !== _)) {
          if (y = jm, M = "onMouseLeave", f = "onMouseEnter", v = "mouse", (t === "pointerout" || t === "pointerover") && (y = Ym, M = "onPointerLeave", f = "onPointerEnter", v = "pointer"), m = p == null ? h : $s(p), g = _ == null ? h : $s(_), h = new y(M, v + "leave", p, n, c), h.target = m, h.relatedTarget = g, M = null, is(c) === u && (y = new y(f, v + "enter", _, n, c), y.target = g, y.relatedTarget = m, M = y), m = M, p && _) t: {
            for (y = p, f = _, v = 0, g = y; g; g = Ss(g)) v++;
            for (g = 0, M = f; M; M = Ss(M)) g++;
            for (; 0 < v - g; ) y = Ss(y), v--;
            for (; 0 < g - v; ) f = Ss(f), g--;
            for (; v--; ) {
              if (y === f || f !== null && y === f.alternate) break t;
              y = Ss(y), f = Ss(f);
            }
            y = null;
          }
          else y = null;
          p !== null && sg(d, h, p, y, !1), _ !== null && m !== null && sg(d, m, _, y, !0);
        }
      }
      e: {
        if (h = u ? $s(u) : window, p = h.nodeName && h.nodeName.toLowerCase(), p === "select" || p === "input" && h.type === "file") var b = g1;
        else if (Zm(h)) if (N_) b = y1;
        else {
          b = _1;
          var A = v1;
        }
        else (p = h.nodeName) && p.toLowerCase() === "input" && (h.type === "checkbox" || h.type === "radio") && (b = x1);
        if (b && (b = b(t, u))) {
          I_(d, b, n, c);
          break e;
        }
        A && A(t, h, u), t === "focusout" && (A = h._wrapperState) && A.controlled && h.type === "number" && ud(h, "number", h.value);
      }
      switch (A = u ? $s(u) : window, t) {
        case "focusin":
          (Zm(A) || A.contentEditable === "true") && (Gs = A, Sd = u, pa = null);
          break;
        case "focusout":
          pa = Sd = Gs = null;
          break;
        case "mousedown":
          Md = !0;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          Md = !1, ng(d, n, c);
          break;
        case "selectionchange":
          if (E1) break;
        case "keydown":
        case "keyup":
          ng(d, n, c);
      }
      var T;
      if (fp) e: {
        switch (t) {
          case "compositionstart":
            var R = "onCompositionStart";
            break e;
          case "compositionend":
            R = "onCompositionEnd";
            break e;
          case "compositionupdate":
            R = "onCompositionUpdate";
            break e;
        }
        R = void 0;
      }
      else Vs ? L_(t, n) && (R = "onCompositionEnd") : t === "keydown" && n.keyCode === 229 && (R = "onCompositionStart");
      R && (P_ && n.locale !== "ko" && (Vs || R !== "onCompositionStart" ? R === "onCompositionEnd" && Vs && (T = b_()) : (yr = c, lp = "value" in yr ? yr.value : yr.textContent, Vs = !0)), A = Cu(u, R), 0 < A.length && (R = new Xm(R, t, null, n, c), d.push({ event: R, listeners: A }), T ? R.data = T : (T = D_(n), T !== null && (R.data = T)))), (T = f1 ? d1(t, n) : h1(t, n)) && (u = Cu(u, "onBeforeInput"), 0 < u.length && (c = new Xm("onBeforeInput", "beforeinput", null, n, c), d.push({ event: c, listeners: u }), c.data = T));
    }
    W_(d, e);
  });
}
function Pa(t, e, n) {
  return { instance: t, listener: e, currentTarget: n };
}
function Cu(t, e) {
  for (var n = e + "Capture", i = []; t !== null; ) {
    var r = t, s = r.stateNode;
    r.tag === 5 && s !== null && (r = s, s = Ea(t, n), s != null && i.unshift(Pa(t, s, r)), s = Ea(t, e), s != null && i.push(Pa(t, s, r))), t = t.return;
  }
  return i;
}
function Ss(t) {
  if (t === null) return null;
  do
    t = t.return;
  while (t && t.tag !== 5);
  return t || null;
}
function sg(t, e, n, i, r) {
  for (var s = e._reactName, o = []; n !== null && n !== i; ) {
    var a = n, l = a.alternate, u = a.stateNode;
    if (l !== null && l === i) break;
    a.tag === 5 && u !== null && (a = u, r ? (l = Ea(n, s), l != null && o.unshift(Pa(n, l, a))) : r || (l = Ea(n, s), l != null && o.push(Pa(n, l, a)))), n = n.return;
  }
  o.length !== 0 && t.push({ event: e, listeners: o });
}
var A1 = /\r\n?/g, R1 = /\u0000|\uFFFD/g;
function og(t) {
  return (typeof t == "string" ? t : "" + t).replace(A1, `
`).replace(R1, "");
}
function fl(t, e, n) {
  if (e = og(e), og(t) !== e && n) throw Error(ee(425));
}
function Au() {
}
var Ed = null, wd = null;
function Td(t, e) {
  return t === "textarea" || t === "noscript" || typeof e.children == "string" || typeof e.children == "number" || typeof e.dangerouslySetInnerHTML == "object" && e.dangerouslySetInnerHTML !== null && e.dangerouslySetInnerHTML.__html != null;
}
var Cd = typeof setTimeout == "function" ? setTimeout : void 0, b1 = typeof clearTimeout == "function" ? clearTimeout : void 0, ag = typeof Promise == "function" ? Promise : void 0, P1 = typeof queueMicrotask == "function" ? queueMicrotask : typeof ag < "u" ? function(t) {
  return ag.resolve(null).then(t).catch(L1);
} : Cd;
function L1(t) {
  setTimeout(function() {
    throw t;
  });
}
function Jc(t, e) {
  var n = e, i = 0;
  do {
    var r = n.nextSibling;
    if (t.removeChild(n), r && r.nodeType === 8) if (n = r.data, n === "/$") {
      if (i === 0) {
        t.removeChild(r), Ca(e);
        return;
      }
      i--;
    } else n !== "$" && n !== "$?" && n !== "$!" || i++;
    n = r;
  } while (n);
  Ca(e);
}
function Ar(t) {
  for (; t != null; t = t.nextSibling) {
    var e = t.nodeType;
    if (e === 1 || e === 3) break;
    if (e === 8) {
      if (e = t.data, e === "$" || e === "$!" || e === "$?") break;
      if (e === "/$") return null;
    }
  }
  return t;
}
function lg(t) {
  t = t.previousSibling;
  for (var e = 0; t; ) {
    if (t.nodeType === 8) {
      var n = t.data;
      if (n === "$" || n === "$!" || n === "$?") {
        if (e === 0) return t;
        e--;
      } else n === "/$" && e++;
    }
    t = t.previousSibling;
  }
  return null;
}
var bo = Math.random().toString(36).slice(2), wi = "__reactFiber$" + bo, La = "__reactProps$" + bo, Ki = "__reactContainer$" + bo, Ad = "__reactEvents$" + bo, D1 = "__reactListeners$" + bo, I1 = "__reactHandles$" + bo;
function is(t) {
  var e = t[wi];
  if (e) return e;
  for (var n = t.parentNode; n; ) {
    if (e = n[Ki] || n[wi]) {
      if (n = e.alternate, e.child !== null || n !== null && n.child !== null) for (t = lg(t); t !== null; ) {
        if (n = t[wi]) return n;
        t = lg(t);
      }
      return e;
    }
    t = n, n = t.parentNode;
  }
  return null;
}
function Xa(t) {
  return t = t[wi] || t[Ki], !t || t.tag !== 5 && t.tag !== 6 && t.tag !== 13 && t.tag !== 3 ? null : t;
}
function $s(t) {
  if (t.tag === 5 || t.tag === 6) return t.stateNode;
  throw Error(ee(33));
}
function fc(t) {
  return t[La] || null;
}
var Rd = [], js = -1;
function Fr(t) {
  return { current: t };
}
function pt(t) {
  0 > js || (t.current = Rd[js], Rd[js] = null, js--);
}
function ut(t, e) {
  js++, Rd[js] = t.current, t.current = e;
}
var Nr = {}, en = Fr(Nr), Mn = Fr(!1), ds = Nr;
function uo(t, e) {
  var n = t.type.contextTypes;
  if (!n) return Nr;
  var i = t.stateNode;
  if (i && i.__reactInternalMemoizedUnmaskedChildContext === e) return i.__reactInternalMemoizedMaskedChildContext;
  var r = {}, s;
  for (s in n) r[s] = e[s];
  return i && (t = t.stateNode, t.__reactInternalMemoizedUnmaskedChildContext = e, t.__reactInternalMemoizedMaskedChildContext = r), r;
}
function En(t) {
  return t = t.childContextTypes, t != null;
}
function Ru() {
  pt(Mn), pt(en);
}
function ug(t, e, n) {
  if (en.current !== Nr) throw Error(ee(168));
  ut(en, e), ut(Mn, n);
}
function j_(t, e, n) {
  var i = t.stateNode;
  if (e = e.childContextTypes, typeof i.getChildContext != "function") return n;
  i = i.getChildContext();
  for (var r in i) if (!(r in e)) throw Error(ee(108, vM(t) || "Unknown", r));
  return _t({}, n, i);
}
function bu(t) {
  return t = (t = t.stateNode) && t.__reactInternalMemoizedMergedChildContext || Nr, ds = en.current, ut(en, t), ut(Mn, Mn.current), !0;
}
function cg(t, e, n) {
  var i = t.stateNode;
  if (!i) throw Error(ee(169));
  n ? (t = j_(t, e, ds), i.__reactInternalMemoizedMergedChildContext = t, pt(Mn), pt(en), ut(en, t)) : pt(Mn), ut(Mn, n);
}
var Bi = null, dc = !1, ef = !1;
function X_(t) {
  Bi === null ? Bi = [t] : Bi.push(t);
}
function N1(t) {
  dc = !0, X_(t);
}
function Or() {
  if (!ef && Bi !== null) {
    ef = !0;
    var t = 0, e = it;
    try {
      var n = Bi;
      for (it = 1; t < n.length; t++) {
        var i = n[t];
        do
          i = i(!0);
        while (i !== null);
      }
      Bi = null, dc = !1;
    } catch (r) {
      throw Bi !== null && (Bi = Bi.slice(t + 1)), __(rp, Or), r;
    } finally {
      it = e, ef = !1;
    }
  }
  return null;
}
var Xs = [], Ys = 0, Pu = null, Lu = 0, Yn = [], qn = 0, hs = null, Vi = 1, Gi = "";
function Yr(t, e) {
  Xs[Ys++] = Lu, Xs[Ys++] = Pu, Pu = t, Lu = e;
}
function Y_(t, e, n) {
  Yn[qn++] = Vi, Yn[qn++] = Gi, Yn[qn++] = hs, hs = t;
  var i = Vi;
  t = Gi;
  var r = 32 - hi(i) - 1;
  i &= ~(1 << r), n += 1;
  var s = 32 - hi(e) + r;
  if (30 < s) {
    var o = r - r % 5;
    s = (i & (1 << o) - 1).toString(32), i >>= o, r -= o, Vi = 1 << 32 - hi(e) + r | n << r | i, Gi = s + t;
  } else Vi = 1 << s | n << r | i, Gi = t;
}
function hp(t) {
  t.return !== null && (Yr(t, 1), Y_(t, 1, 0));
}
function pp(t) {
  for (; t === Pu; ) Pu = Xs[--Ys], Xs[Ys] = null, Lu = Xs[--Ys], Xs[Ys] = null;
  for (; t === hs; ) hs = Yn[--qn], Yn[qn] = null, Gi = Yn[--qn], Yn[qn] = null, Vi = Yn[--qn], Yn[qn] = null;
}
var zn = null, Bn = null, mt = !1, ui = null;
function q_(t, e) {
  var n = Kn(5, null, null, 0);
  n.elementType = "DELETED", n.stateNode = e, n.return = t, e = t.deletions, e === null ? (t.deletions = [n], t.flags |= 16) : e.push(n);
}
function fg(t, e) {
  switch (t.tag) {
    case 5:
      var n = t.type;
      return e = e.nodeType !== 1 || n.toLowerCase() !== e.nodeName.toLowerCase() ? null : e, e !== null ? (t.stateNode = e, zn = t, Bn = Ar(e.firstChild), !0) : !1;
    case 6:
      return e = t.pendingProps === "" || e.nodeType !== 3 ? null : e, e !== null ? (t.stateNode = e, zn = t, Bn = null, !0) : !1;
    case 13:
      return e = e.nodeType !== 8 ? null : e, e !== null ? (n = hs !== null ? { id: Vi, overflow: Gi } : null, t.memoizedState = { dehydrated: e, treeContext: n, retryLane: 1073741824 }, n = Kn(18, null, null, 0), n.stateNode = e, n.return = t, t.child = n, zn = t, Bn = null, !0) : !1;
    default:
      return !1;
  }
}
function bd(t) {
  return (t.mode & 1) !== 0 && (t.flags & 128) === 0;
}
function Pd(t) {
  if (mt) {
    var e = Bn;
    if (e) {
      var n = e;
      if (!fg(t, e)) {
        if (bd(t)) throw Error(ee(418));
        e = Ar(n.nextSibling);
        var i = zn;
        e && fg(t, e) ? q_(i, n) : (t.flags = t.flags & -4097 | 2, mt = !1, zn = t);
      }
    } else {
      if (bd(t)) throw Error(ee(418));
      t.flags = t.flags & -4097 | 2, mt = !1, zn = t;
    }
  }
}
function dg(t) {
  for (t = t.return; t !== null && t.tag !== 5 && t.tag !== 3 && t.tag !== 13; ) t = t.return;
  zn = t;
}
function dl(t) {
  if (t !== zn) return !1;
  if (!mt) return dg(t), mt = !0, !1;
  var e;
  if ((e = t.tag !== 3) && !(e = t.tag !== 5) && (e = t.type, e = e !== "head" && e !== "body" && !Td(t.type, t.memoizedProps)), e && (e = Bn)) {
    if (bd(t)) throw K_(), Error(ee(418));
    for (; e; ) q_(t, e), e = Ar(e.nextSibling);
  }
  if (dg(t), t.tag === 13) {
    if (t = t.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(ee(317));
    e: {
      for (t = t.nextSibling, e = 0; t; ) {
        if (t.nodeType === 8) {
          var n = t.data;
          if (n === "/$") {
            if (e === 0) {
              Bn = Ar(t.nextSibling);
              break e;
            }
            e--;
          } else n !== "$" && n !== "$!" && n !== "$?" || e++;
        }
        t = t.nextSibling;
      }
      Bn = null;
    }
  } else Bn = zn ? Ar(t.stateNode.nextSibling) : null;
  return !0;
}
function K_() {
  for (var t = Bn; t; ) t = Ar(t.nextSibling);
}
function co() {
  Bn = zn = null, mt = !1;
}
function mp(t) {
  ui === null ? ui = [t] : ui.push(t);
}
var U1 = nr.ReactCurrentBatchConfig;
function Vo(t, e, n) {
  if (t = n.ref, t !== null && typeof t != "function" && typeof t != "object") {
    if (n._owner) {
      if (n = n._owner, n) {
        if (n.tag !== 1) throw Error(ee(309));
        var i = n.stateNode;
      }
      if (!i) throw Error(ee(147, t));
      var r = i, s = "" + t;
      return e !== null && e.ref !== null && typeof e.ref == "function" && e.ref._stringRef === s ? e.ref : (e = function(o) {
        var a = r.refs;
        o === null ? delete a[s] : a[s] = o;
      }, e._stringRef = s, e);
    }
    if (typeof t != "string") throw Error(ee(284));
    if (!n._owner) throw Error(ee(290, t));
  }
  return t;
}
function hl(t, e) {
  throw t = Object.prototype.toString.call(e), Error(ee(31, t === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : t));
}
function hg(t) {
  var e = t._init;
  return e(t._payload);
}
function Z_(t) {
  function e(f, v) {
    if (t) {
      var g = f.deletions;
      g === null ? (f.deletions = [v], f.flags |= 16) : g.push(v);
    }
  }
  function n(f, v) {
    if (!t) return null;
    for (; v !== null; ) e(f, v), v = v.sibling;
    return null;
  }
  function i(f, v) {
    for (f = /* @__PURE__ */ new Map(); v !== null; ) v.key !== null ? f.set(v.key, v) : f.set(v.index, v), v = v.sibling;
    return f;
  }
  function r(f, v) {
    return f = Lr(f, v), f.index = 0, f.sibling = null, f;
  }
  function s(f, v, g) {
    return f.index = g, t ? (g = f.alternate, g !== null ? (g = g.index, g < v ? (f.flags |= 2, v) : g) : (f.flags |= 2, v)) : (f.flags |= 1048576, v);
  }
  function o(f) {
    return t && f.alternate === null && (f.flags |= 2), f;
  }
  function a(f, v, g, M) {
    return v === null || v.tag !== 6 ? (v = lf(g, f.mode, M), v.return = f, v) : (v = r(v, g), v.return = f, v);
  }
  function l(f, v, g, M) {
    var b = g.type;
    return b === Hs ? c(f, v, g.props.children, M, g.key) : v !== null && (v.elementType === b || typeof b == "object" && b !== null && b.$$typeof === pr && hg(b) === v.type) ? (M = r(v, g.props), M.ref = Vo(f, v, g), M.return = f, M) : (M = tu(g.type, g.key, g.props, null, f.mode, M), M.ref = Vo(f, v, g), M.return = f, M);
  }
  function u(f, v, g, M) {
    return v === null || v.tag !== 4 || v.stateNode.containerInfo !== g.containerInfo || v.stateNode.implementation !== g.implementation ? (v = uf(g, f.mode, M), v.return = f, v) : (v = r(v, g.children || []), v.return = f, v);
  }
  function c(f, v, g, M, b) {
    return v === null || v.tag !== 7 ? (v = fs(g, f.mode, M, b), v.return = f, v) : (v = r(v, g), v.return = f, v);
  }
  function d(f, v, g) {
    if (typeof v == "string" && v !== "" || typeof v == "number") return v = lf("" + v, f.mode, g), v.return = f, v;
    if (typeof v == "object" && v !== null) {
      switch (v.$$typeof) {
        case nl:
          return g = tu(v.type, v.key, v.props, null, f.mode, g), g.ref = Vo(f, null, v), g.return = f, g;
        case zs:
          return v = uf(v, f.mode, g), v.return = f, v;
        case pr:
          var M = v._init;
          return d(f, M(v._payload), g);
      }
      if (ea(v) || Fo(v)) return v = fs(v, f.mode, g, null), v.return = f, v;
      hl(f, v);
    }
    return null;
  }
  function h(f, v, g, M) {
    var b = v !== null ? v.key : null;
    if (typeof g == "string" && g !== "" || typeof g == "number") return b !== null ? null : a(f, v, "" + g, M);
    if (typeof g == "object" && g !== null) {
      switch (g.$$typeof) {
        case nl:
          return g.key === b ? l(f, v, g, M) : null;
        case zs:
          return g.key === b ? u(f, v, g, M) : null;
        case pr:
          return b = g._init, h(
            f,
            v,
            b(g._payload),
            M
          );
      }
      if (ea(g) || Fo(g)) return b !== null ? null : c(f, v, g, M, null);
      hl(f, g);
    }
    return null;
  }
  function p(f, v, g, M, b) {
    if (typeof M == "string" && M !== "" || typeof M == "number") return f = f.get(g) || null, a(v, f, "" + M, b);
    if (typeof M == "object" && M !== null) {
      switch (M.$$typeof) {
        case nl:
          return f = f.get(M.key === null ? g : M.key) || null, l(v, f, M, b);
        case zs:
          return f = f.get(M.key === null ? g : M.key) || null, u(v, f, M, b);
        case pr:
          var A = M._init;
          return p(f, v, g, A(M._payload), b);
      }
      if (ea(M) || Fo(M)) return f = f.get(g) || null, c(v, f, M, b, null);
      hl(v, M);
    }
    return null;
  }
  function _(f, v, g, M) {
    for (var b = null, A = null, T = v, R = v = 0, j = null; T !== null && R < g.length; R++) {
      T.index > R ? (j = T, T = null) : j = T.sibling;
      var x = h(f, T, g[R], M);
      if (x === null) {
        T === null && (T = j);
        break;
      }
      t && T && x.alternate === null && e(f, T), v = s(x, v, R), A === null ? b = x : A.sibling = x, A = x, T = j;
    }
    if (R === g.length) return n(f, T), mt && Yr(f, R), b;
    if (T === null) {
      for (; R < g.length; R++) T = d(f, g[R], M), T !== null && (v = s(T, v, R), A === null ? b = T : A.sibling = T, A = T);
      return mt && Yr(f, R), b;
    }
    for (T = i(f, T); R < g.length; R++) j = p(T, f, R, g[R], M), j !== null && (t && j.alternate !== null && T.delete(j.key === null ? R : j.key), v = s(j, v, R), A === null ? b = j : A.sibling = j, A = j);
    return t && T.forEach(function(w) {
      return e(f, w);
    }), mt && Yr(f, R), b;
  }
  function y(f, v, g, M) {
    var b = Fo(g);
    if (typeof b != "function") throw Error(ee(150));
    if (g = b.call(g), g == null) throw Error(ee(151));
    for (var A = b = null, T = v, R = v = 0, j = null, x = g.next(); T !== null && !x.done; R++, x = g.next()) {
      T.index > R ? (j = T, T = null) : j = T.sibling;
      var w = h(f, T, x.value, M);
      if (w === null) {
        T === null && (T = j);
        break;
      }
      t && T && w.alternate === null && e(f, T), v = s(w, v, R), A === null ? b = w : A.sibling = w, A = w, T = j;
    }
    if (x.done) return n(
      f,
      T
    ), mt && Yr(f, R), b;
    if (T === null) {
      for (; !x.done; R++, x = g.next()) x = d(f, x.value, M), x !== null && (v = s(x, v, R), A === null ? b = x : A.sibling = x, A = x);
      return mt && Yr(f, R), b;
    }
    for (T = i(f, T); !x.done; R++, x = g.next()) x = p(T, f, R, x.value, M), x !== null && (t && x.alternate !== null && T.delete(x.key === null ? R : x.key), v = s(x, v, R), A === null ? b = x : A.sibling = x, A = x);
    return t && T.forEach(function(H) {
      return e(f, H);
    }), mt && Yr(f, R), b;
  }
  function m(f, v, g, M) {
    if (typeof g == "object" && g !== null && g.type === Hs && g.key === null && (g = g.props.children), typeof g == "object" && g !== null) {
      switch (g.$$typeof) {
        case nl:
          e: {
            for (var b = g.key, A = v; A !== null; ) {
              if (A.key === b) {
                if (b = g.type, b === Hs) {
                  if (A.tag === 7) {
                    n(f, A.sibling), v = r(A, g.props.children), v.return = f, f = v;
                    break e;
                  }
                } else if (A.elementType === b || typeof b == "object" && b !== null && b.$$typeof === pr && hg(b) === A.type) {
                  n(f, A.sibling), v = r(A, g.props), v.ref = Vo(f, A, g), v.return = f, f = v;
                  break e;
                }
                n(f, A);
                break;
              } else e(f, A);
              A = A.sibling;
            }
            g.type === Hs ? (v = fs(g.props.children, f.mode, M, g.key), v.return = f, f = v) : (M = tu(g.type, g.key, g.props, null, f.mode, M), M.ref = Vo(f, v, g), M.return = f, f = M);
          }
          return o(f);
        case zs:
          e: {
            for (A = g.key; v !== null; ) {
              if (v.key === A) if (v.tag === 4 && v.stateNode.containerInfo === g.containerInfo && v.stateNode.implementation === g.implementation) {
                n(f, v.sibling), v = r(v, g.children || []), v.return = f, f = v;
                break e;
              } else {
                n(f, v);
                break;
              }
              else e(f, v);
              v = v.sibling;
            }
            v = uf(g, f.mode, M), v.return = f, f = v;
          }
          return o(f);
        case pr:
          return A = g._init, m(f, v, A(g._payload), M);
      }
      if (ea(g)) return _(f, v, g, M);
      if (Fo(g)) return y(f, v, g, M);
      hl(f, g);
    }
    return typeof g == "string" && g !== "" || typeof g == "number" ? (g = "" + g, v !== null && v.tag === 6 ? (n(f, v.sibling), v = r(v, g), v.return = f, f = v) : (n(f, v), v = lf(g, f.mode, M), v.return = f, f = v), o(f)) : n(f, v);
  }
  return m;
}
var fo = Z_(!0), Q_ = Z_(!1), Du = Fr(null), Iu = null, qs = null, gp = null;
function vp() {
  gp = qs = Iu = null;
}
function _p(t) {
  var e = Du.current;
  pt(Du), t._currentValue = e;
}
function Ld(t, e, n) {
  for (; t !== null; ) {
    var i = t.alternate;
    if ((t.childLanes & e) !== e ? (t.childLanes |= e, i !== null && (i.childLanes |= e)) : i !== null && (i.childLanes & e) !== e && (i.childLanes |= e), t === n) break;
    t = t.return;
  }
}
function io(t, e) {
  Iu = t, gp = qs = null, t = t.dependencies, t !== null && t.firstContext !== null && (t.lanes & e && (yn = !0), t.firstContext = null);
}
function ei(t) {
  var e = t._currentValue;
  if (gp !== t) if (t = { context: t, memoizedValue: e, next: null }, qs === null) {
    if (Iu === null) throw Error(ee(308));
    qs = t, Iu.dependencies = { lanes: 0, firstContext: t };
  } else qs = qs.next = t;
  return e;
}
var rs = null;
function xp(t) {
  rs === null ? rs = [t] : rs.push(t);
}
function J_(t, e, n, i) {
  var r = e.interleaved;
  return r === null ? (n.next = n, xp(e)) : (n.next = r.next, r.next = n), e.interleaved = n, Zi(t, i);
}
function Zi(t, e) {
  t.lanes |= e;
  var n = t.alternate;
  for (n !== null && (n.lanes |= e), n = t, t = t.return; t !== null; ) t.childLanes |= e, n = t.alternate, n !== null && (n.childLanes |= e), n = t, t = t.return;
  return n.tag === 3 ? n.stateNode : null;
}
var mr = !1;
function yp(t) {
  t.updateQueue = { baseState: t.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null, interleaved: null, lanes: 0 }, effects: null };
}
function ex(t, e) {
  t = t.updateQueue, e.updateQueue === t && (e.updateQueue = { baseState: t.baseState, firstBaseUpdate: t.firstBaseUpdate, lastBaseUpdate: t.lastBaseUpdate, shared: t.shared, effects: t.effects });
}
function ji(t, e) {
  return { eventTime: t, lane: e, tag: 0, payload: null, callback: null, next: null };
}
function Rr(t, e, n) {
  var i = t.updateQueue;
  if (i === null) return null;
  if (i = i.shared, qe & 2) {
    var r = i.pending;
    return r === null ? e.next = e : (e.next = r.next, r.next = e), i.pending = e, Zi(t, n);
  }
  return r = i.interleaved, r === null ? (e.next = e, xp(i)) : (e.next = r.next, r.next = e), i.interleaved = e, Zi(t, n);
}
function ql(t, e, n) {
  if (e = e.updateQueue, e !== null && (e = e.shared, (n & 4194240) !== 0)) {
    var i = e.lanes;
    i &= t.pendingLanes, n |= i, e.lanes = n, sp(t, n);
  }
}
function pg(t, e) {
  var n = t.updateQueue, i = t.alternate;
  if (i !== null && (i = i.updateQueue, n === i)) {
    var r = null, s = null;
    if (n = n.firstBaseUpdate, n !== null) {
      do {
        var o = { eventTime: n.eventTime, lane: n.lane, tag: n.tag, payload: n.payload, callback: n.callback, next: null };
        s === null ? r = s = o : s = s.next = o, n = n.next;
      } while (n !== null);
      s === null ? r = s = e : s = s.next = e;
    } else r = s = e;
    n = { baseState: i.baseState, firstBaseUpdate: r, lastBaseUpdate: s, shared: i.shared, effects: i.effects }, t.updateQueue = n;
    return;
  }
  t = n.lastBaseUpdate, t === null ? n.firstBaseUpdate = e : t.next = e, n.lastBaseUpdate = e;
}
function Nu(t, e, n, i) {
  var r = t.updateQueue;
  mr = !1;
  var s = r.firstBaseUpdate, o = r.lastBaseUpdate, a = r.shared.pending;
  if (a !== null) {
    r.shared.pending = null;
    var l = a, u = l.next;
    l.next = null, o === null ? s = u : o.next = u, o = l;
    var c = t.alternate;
    c !== null && (c = c.updateQueue, a = c.lastBaseUpdate, a !== o && (a === null ? c.firstBaseUpdate = u : a.next = u, c.lastBaseUpdate = l));
  }
  if (s !== null) {
    var d = r.baseState;
    o = 0, c = u = l = null, a = s;
    do {
      var h = a.lane, p = a.eventTime;
      if ((i & h) === h) {
        c !== null && (c = c.next = {
          eventTime: p,
          lane: 0,
          tag: a.tag,
          payload: a.payload,
          callback: a.callback,
          next: null
        });
        e: {
          var _ = t, y = a;
          switch (h = e, p = n, y.tag) {
            case 1:
              if (_ = y.payload, typeof _ == "function") {
                d = _.call(p, d, h);
                break e;
              }
              d = _;
              break e;
            case 3:
              _.flags = _.flags & -65537 | 128;
            case 0:
              if (_ = y.payload, h = typeof _ == "function" ? _.call(p, d, h) : _, h == null) break e;
              d = _t({}, d, h);
              break e;
            case 2:
              mr = !0;
          }
        }
        a.callback !== null && a.lane !== 0 && (t.flags |= 64, h = r.effects, h === null ? r.effects = [a] : h.push(a));
      } else p = { eventTime: p, lane: h, tag: a.tag, payload: a.payload, callback: a.callback, next: null }, c === null ? (u = c = p, l = d) : c = c.next = p, o |= h;
      if (a = a.next, a === null) {
        if (a = r.shared.pending, a === null) break;
        h = a, a = h.next, h.next = null, r.lastBaseUpdate = h, r.shared.pending = null;
      }
    } while (!0);
    if (c === null && (l = d), r.baseState = l, r.firstBaseUpdate = u, r.lastBaseUpdate = c, e = r.shared.interleaved, e !== null) {
      r = e;
      do
        o |= r.lane, r = r.next;
      while (r !== e);
    } else s === null && (r.shared.lanes = 0);
    ms |= o, t.lanes = o, t.memoizedState = d;
  }
}
function mg(t, e, n) {
  if (t = e.effects, e.effects = null, t !== null) for (e = 0; e < t.length; e++) {
    var i = t[e], r = i.callback;
    if (r !== null) {
      if (i.callback = null, i = n, typeof r != "function") throw Error(ee(191, r));
      r.call(i);
    }
  }
}
var Ya = {}, Ci = Fr(Ya), Da = Fr(Ya), Ia = Fr(Ya);
function ss(t) {
  if (t === Ya) throw Error(ee(174));
  return t;
}
function Sp(t, e) {
  switch (ut(Ia, e), ut(Da, t), ut(Ci, Ya), t = e.nodeType, t) {
    case 9:
    case 11:
      e = (e = e.documentElement) ? e.namespaceURI : fd(null, "");
      break;
    default:
      t = t === 8 ? e.parentNode : e, e = t.namespaceURI || null, t = t.tagName, e = fd(e, t);
  }
  pt(Ci), ut(Ci, e);
}
function ho() {
  pt(Ci), pt(Da), pt(Ia);
}
function tx(t) {
  ss(Ia.current);
  var e = ss(Ci.current), n = fd(e, t.type);
  e !== n && (ut(Da, t), ut(Ci, n));
}
function Mp(t) {
  Da.current === t && (pt(Ci), pt(Da));
}
var gt = Fr(0);
function Uu(t) {
  for (var e = t; e !== null; ) {
    if (e.tag === 13) {
      var n = e.memoizedState;
      if (n !== null && (n = n.dehydrated, n === null || n.data === "$?" || n.data === "$!")) return e;
    } else if (e.tag === 19 && e.memoizedProps.revealOrder !== void 0) {
      if (e.flags & 128) return e;
    } else if (e.child !== null) {
      e.child.return = e, e = e.child;
      continue;
    }
    if (e === t) break;
    for (; e.sibling === null; ) {
      if (e.return === null || e.return === t) return null;
      e = e.return;
    }
    e.sibling.return = e.return, e = e.sibling;
  }
  return null;
}
var tf = [];
function Ep() {
  for (var t = 0; t < tf.length; t++) tf[t]._workInProgressVersionPrimary = null;
  tf.length = 0;
}
var Kl = nr.ReactCurrentDispatcher, nf = nr.ReactCurrentBatchConfig, ps = 0, vt = null, Lt = null, zt = null, ku = !1, ma = !1, Na = 0, k1 = 0;
function qt() {
  throw Error(ee(321));
}
function wp(t, e) {
  if (e === null) return !1;
  for (var n = 0; n < e.length && n < t.length; n++) if (!gi(t[n], e[n])) return !1;
  return !0;
}
function Tp(t, e, n, i, r, s) {
  if (ps = s, vt = e, e.memoizedState = null, e.updateQueue = null, e.lanes = 0, Kl.current = t === null || t.memoizedState === null ? z1 : H1, t = n(i, r), ma) {
    s = 0;
    do {
      if (ma = !1, Na = 0, 25 <= s) throw Error(ee(301));
      s += 1, zt = Lt = null, e.updateQueue = null, Kl.current = V1, t = n(i, r);
    } while (ma);
  }
  if (Kl.current = Fu, e = Lt !== null && Lt.next !== null, ps = 0, zt = Lt = vt = null, ku = !1, e) throw Error(ee(300));
  return t;
}
function Cp() {
  var t = Na !== 0;
  return Na = 0, t;
}
function Mi() {
  var t = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
  return zt === null ? vt.memoizedState = zt = t : zt = zt.next = t, zt;
}
function ti() {
  if (Lt === null) {
    var t = vt.alternate;
    t = t !== null ? t.memoizedState : null;
  } else t = Lt.next;
  var e = zt === null ? vt.memoizedState : zt.next;
  if (e !== null) zt = e, Lt = t;
  else {
    if (t === null) throw Error(ee(310));
    Lt = t, t = { memoizedState: Lt.memoizedState, baseState: Lt.baseState, baseQueue: Lt.baseQueue, queue: Lt.queue, next: null }, zt === null ? vt.memoizedState = zt = t : zt = zt.next = t;
  }
  return zt;
}
function Ua(t, e) {
  return typeof e == "function" ? e(t) : e;
}
function rf(t) {
  var e = ti(), n = e.queue;
  if (n === null) throw Error(ee(311));
  n.lastRenderedReducer = t;
  var i = Lt, r = i.baseQueue, s = n.pending;
  if (s !== null) {
    if (r !== null) {
      var o = r.next;
      r.next = s.next, s.next = o;
    }
    i.baseQueue = r = s, n.pending = null;
  }
  if (r !== null) {
    s = r.next, i = i.baseState;
    var a = o = null, l = null, u = s;
    do {
      var c = u.lane;
      if ((ps & c) === c) l !== null && (l = l.next = { lane: 0, action: u.action, hasEagerState: u.hasEagerState, eagerState: u.eagerState, next: null }), i = u.hasEagerState ? u.eagerState : t(i, u.action);
      else {
        var d = {
          lane: c,
          action: u.action,
          hasEagerState: u.hasEagerState,
          eagerState: u.eagerState,
          next: null
        };
        l === null ? (a = l = d, o = i) : l = l.next = d, vt.lanes |= c, ms |= c;
      }
      u = u.next;
    } while (u !== null && u !== s);
    l === null ? o = i : l.next = a, gi(i, e.memoizedState) || (yn = !0), e.memoizedState = i, e.baseState = o, e.baseQueue = l, n.lastRenderedState = i;
  }
  if (t = n.interleaved, t !== null) {
    r = t;
    do
      s = r.lane, vt.lanes |= s, ms |= s, r = r.next;
    while (r !== t);
  } else r === null && (n.lanes = 0);
  return [e.memoizedState, n.dispatch];
}
function sf(t) {
  var e = ti(), n = e.queue;
  if (n === null) throw Error(ee(311));
  n.lastRenderedReducer = t;
  var i = n.dispatch, r = n.pending, s = e.memoizedState;
  if (r !== null) {
    n.pending = null;
    var o = r = r.next;
    do
      s = t(s, o.action), o = o.next;
    while (o !== r);
    gi(s, e.memoizedState) || (yn = !0), e.memoizedState = s, e.baseQueue === null && (e.baseState = s), n.lastRenderedState = s;
  }
  return [s, i];
}
function nx() {
}
function ix(t, e) {
  var n = vt, i = ti(), r = e(), s = !gi(i.memoizedState, r);
  if (s && (i.memoizedState = r, yn = !0), i = i.queue, Ap(ox.bind(null, n, i, t), [t]), i.getSnapshot !== e || s || zt !== null && zt.memoizedState.tag & 1) {
    if (n.flags |= 2048, ka(9, sx.bind(null, n, i, r, e), void 0, null), Ht === null) throw Error(ee(349));
    ps & 30 || rx(n, e, r);
  }
  return r;
}
function rx(t, e, n) {
  t.flags |= 16384, t = { getSnapshot: e, value: n }, e = vt.updateQueue, e === null ? (e = { lastEffect: null, stores: null }, vt.updateQueue = e, e.stores = [t]) : (n = e.stores, n === null ? e.stores = [t] : n.push(t));
}
function sx(t, e, n, i) {
  e.value = n, e.getSnapshot = i, ax(e) && lx(t);
}
function ox(t, e, n) {
  return n(function() {
    ax(e) && lx(t);
  });
}
function ax(t) {
  var e = t.getSnapshot;
  t = t.value;
  try {
    var n = e();
    return !gi(t, n);
  } catch {
    return !0;
  }
}
function lx(t) {
  var e = Zi(t, 1);
  e !== null && pi(e, t, 1, -1);
}
function gg(t) {
  var e = Mi();
  return typeof t == "function" && (t = t()), e.memoizedState = e.baseState = t, t = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: Ua, lastRenderedState: t }, e.queue = t, t = t.dispatch = B1.bind(null, vt, t), [e.memoizedState, t];
}
function ka(t, e, n, i) {
  return t = { tag: t, create: e, destroy: n, deps: i, next: null }, e = vt.updateQueue, e === null ? (e = { lastEffect: null, stores: null }, vt.updateQueue = e, e.lastEffect = t.next = t) : (n = e.lastEffect, n === null ? e.lastEffect = t.next = t : (i = n.next, n.next = t, t.next = i, e.lastEffect = t)), t;
}
function ux() {
  return ti().memoizedState;
}
function Zl(t, e, n, i) {
  var r = Mi();
  vt.flags |= t, r.memoizedState = ka(1 | e, n, void 0, i === void 0 ? null : i);
}
function hc(t, e, n, i) {
  var r = ti();
  i = i === void 0 ? null : i;
  var s = void 0;
  if (Lt !== null) {
    var o = Lt.memoizedState;
    if (s = o.destroy, i !== null && wp(i, o.deps)) {
      r.memoizedState = ka(e, n, s, i);
      return;
    }
  }
  vt.flags |= t, r.memoizedState = ka(1 | e, n, s, i);
}
function vg(t, e) {
  return Zl(8390656, 8, t, e);
}
function Ap(t, e) {
  return hc(2048, 8, t, e);
}
function cx(t, e) {
  return hc(4, 2, t, e);
}
function fx(t, e) {
  return hc(4, 4, t, e);
}
function dx(t, e) {
  if (typeof e == "function") return t = t(), e(t), function() {
    e(null);
  };
  if (e != null) return t = t(), e.current = t, function() {
    e.current = null;
  };
}
function hx(t, e, n) {
  return n = n != null ? n.concat([t]) : null, hc(4, 4, dx.bind(null, e, t), n);
}
function Rp() {
}
function px(t, e) {
  var n = ti();
  e = e === void 0 ? null : e;
  var i = n.memoizedState;
  return i !== null && e !== null && wp(e, i[1]) ? i[0] : (n.memoizedState = [t, e], t);
}
function mx(t, e) {
  var n = ti();
  e = e === void 0 ? null : e;
  var i = n.memoizedState;
  return i !== null && e !== null && wp(e, i[1]) ? i[0] : (t = t(), n.memoizedState = [t, e], t);
}
function gx(t, e, n) {
  return ps & 21 ? (gi(n, e) || (n = S_(), vt.lanes |= n, ms |= n, t.baseState = !0), e) : (t.baseState && (t.baseState = !1, yn = !0), t.memoizedState = n);
}
function F1(t, e) {
  var n = it;
  it = n !== 0 && 4 > n ? n : 4, t(!0);
  var i = nf.transition;
  nf.transition = {};
  try {
    t(!1), e();
  } finally {
    it = n, nf.transition = i;
  }
}
function vx() {
  return ti().memoizedState;
}
function O1(t, e, n) {
  var i = Pr(t);
  if (n = { lane: i, action: n, hasEagerState: !1, eagerState: null, next: null }, _x(t)) xx(e, n);
  else if (n = J_(t, e, n, i), n !== null) {
    var r = an();
    pi(n, t, i, r), yx(n, e, i);
  }
}
function B1(t, e, n) {
  var i = Pr(t), r = { lane: i, action: n, hasEagerState: !1, eagerState: null, next: null };
  if (_x(t)) xx(e, r);
  else {
    var s = t.alternate;
    if (t.lanes === 0 && (s === null || s.lanes === 0) && (s = e.lastRenderedReducer, s !== null)) try {
      var o = e.lastRenderedState, a = s(o, n);
      if (r.hasEagerState = !0, r.eagerState = a, gi(a, o)) {
        var l = e.interleaved;
        l === null ? (r.next = r, xp(e)) : (r.next = l.next, l.next = r), e.interleaved = r;
        return;
      }
    } catch {
    } finally {
    }
    n = J_(t, e, r, i), n !== null && (r = an(), pi(n, t, i, r), yx(n, e, i));
  }
}
function _x(t) {
  var e = t.alternate;
  return t === vt || e !== null && e === vt;
}
function xx(t, e) {
  ma = ku = !0;
  var n = t.pending;
  n === null ? e.next = e : (e.next = n.next, n.next = e), t.pending = e;
}
function yx(t, e, n) {
  if (n & 4194240) {
    var i = e.lanes;
    i &= t.pendingLanes, n |= i, e.lanes = n, sp(t, n);
  }
}
var Fu = { readContext: ei, useCallback: qt, useContext: qt, useEffect: qt, useImperativeHandle: qt, useInsertionEffect: qt, useLayoutEffect: qt, useMemo: qt, useReducer: qt, useRef: qt, useState: qt, useDebugValue: qt, useDeferredValue: qt, useTransition: qt, useMutableSource: qt, useSyncExternalStore: qt, useId: qt, unstable_isNewReconciler: !1 }, z1 = { readContext: ei, useCallback: function(t, e) {
  return Mi().memoizedState = [t, e === void 0 ? null : e], t;
}, useContext: ei, useEffect: vg, useImperativeHandle: function(t, e, n) {
  return n = n != null ? n.concat([t]) : null, Zl(
    4194308,
    4,
    dx.bind(null, e, t),
    n
  );
}, useLayoutEffect: function(t, e) {
  return Zl(4194308, 4, t, e);
}, useInsertionEffect: function(t, e) {
  return Zl(4, 2, t, e);
}, useMemo: function(t, e) {
  var n = Mi();
  return e = e === void 0 ? null : e, t = t(), n.memoizedState = [t, e], t;
}, useReducer: function(t, e, n) {
  var i = Mi();
  return e = n !== void 0 ? n(e) : e, i.memoizedState = i.baseState = e, t = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: t, lastRenderedState: e }, i.queue = t, t = t.dispatch = O1.bind(null, vt, t), [i.memoizedState, t];
}, useRef: function(t) {
  var e = Mi();
  return t = { current: t }, e.memoizedState = t;
}, useState: gg, useDebugValue: Rp, useDeferredValue: function(t) {
  return Mi().memoizedState = t;
}, useTransition: function() {
  var t = gg(!1), e = t[0];
  return t = F1.bind(null, t[1]), Mi().memoizedState = t, [e, t];
}, useMutableSource: function() {
}, useSyncExternalStore: function(t, e, n) {
  var i = vt, r = Mi();
  if (mt) {
    if (n === void 0) throw Error(ee(407));
    n = n();
  } else {
    if (n = e(), Ht === null) throw Error(ee(349));
    ps & 30 || rx(i, e, n);
  }
  r.memoizedState = n;
  var s = { value: n, getSnapshot: e };
  return r.queue = s, vg(ox.bind(
    null,
    i,
    s,
    t
  ), [t]), i.flags |= 2048, ka(9, sx.bind(null, i, s, n, e), void 0, null), n;
}, useId: function() {
  var t = Mi(), e = Ht.identifierPrefix;
  if (mt) {
    var n = Gi, i = Vi;
    n = (i & ~(1 << 32 - hi(i) - 1)).toString(32) + n, e = ":" + e + "R" + n, n = Na++, 0 < n && (e += "H" + n.toString(32)), e += ":";
  } else n = k1++, e = ":" + e + "r" + n.toString(32) + ":";
  return t.memoizedState = e;
}, unstable_isNewReconciler: !1 }, H1 = {
  readContext: ei,
  useCallback: px,
  useContext: ei,
  useEffect: Ap,
  useImperativeHandle: hx,
  useInsertionEffect: cx,
  useLayoutEffect: fx,
  useMemo: mx,
  useReducer: rf,
  useRef: ux,
  useState: function() {
    return rf(Ua);
  },
  useDebugValue: Rp,
  useDeferredValue: function(t) {
    var e = ti();
    return gx(e, Lt.memoizedState, t);
  },
  useTransition: function() {
    var t = rf(Ua)[0], e = ti().memoizedState;
    return [t, e];
  },
  useMutableSource: nx,
  useSyncExternalStore: ix,
  useId: vx,
  unstable_isNewReconciler: !1
}, V1 = { readContext: ei, useCallback: px, useContext: ei, useEffect: Ap, useImperativeHandle: hx, useInsertionEffect: cx, useLayoutEffect: fx, useMemo: mx, useReducer: sf, useRef: ux, useState: function() {
  return sf(Ua);
}, useDebugValue: Rp, useDeferredValue: function(t) {
  var e = ti();
  return Lt === null ? e.memoizedState = t : gx(e, Lt.memoizedState, t);
}, useTransition: function() {
  var t = sf(Ua)[0], e = ti().memoizedState;
  return [t, e];
}, useMutableSource: nx, useSyncExternalStore: ix, useId: vx, unstable_isNewReconciler: !1 };
function ai(t, e) {
  if (t && t.defaultProps) {
    e = _t({}, e), t = t.defaultProps;
    for (var n in t) e[n] === void 0 && (e[n] = t[n]);
    return e;
  }
  return e;
}
function Dd(t, e, n, i) {
  e = t.memoizedState, n = n(i, e), n = n == null ? e : _t({}, e, n), t.memoizedState = n, t.lanes === 0 && (t.updateQueue.baseState = n);
}
var pc = { isMounted: function(t) {
  return (t = t._reactInternals) ? xs(t) === t : !1;
}, enqueueSetState: function(t, e, n) {
  t = t._reactInternals;
  var i = an(), r = Pr(t), s = ji(i, r);
  s.payload = e, n != null && (s.callback = n), e = Rr(t, s, r), e !== null && (pi(e, t, r, i), ql(e, t, r));
}, enqueueReplaceState: function(t, e, n) {
  t = t._reactInternals;
  var i = an(), r = Pr(t), s = ji(i, r);
  s.tag = 1, s.payload = e, n != null && (s.callback = n), e = Rr(t, s, r), e !== null && (pi(e, t, r, i), ql(e, t, r));
}, enqueueForceUpdate: function(t, e) {
  t = t._reactInternals;
  var n = an(), i = Pr(t), r = ji(n, i);
  r.tag = 2, e != null && (r.callback = e), e = Rr(t, r, i), e !== null && (pi(e, t, i, n), ql(e, t, i));
} };
function _g(t, e, n, i, r, s, o) {
  return t = t.stateNode, typeof t.shouldComponentUpdate == "function" ? t.shouldComponentUpdate(i, s, o) : e.prototype && e.prototype.isPureReactComponent ? !Ra(n, i) || !Ra(r, s) : !0;
}
function Sx(t, e, n) {
  var i = !1, r = Nr, s = e.contextType;
  return typeof s == "object" && s !== null ? s = ei(s) : (r = En(e) ? ds : en.current, i = e.contextTypes, s = (i = i != null) ? uo(t, r) : Nr), e = new e(n, s), t.memoizedState = e.state !== null && e.state !== void 0 ? e.state : null, e.updater = pc, t.stateNode = e, e._reactInternals = t, i && (t = t.stateNode, t.__reactInternalMemoizedUnmaskedChildContext = r, t.__reactInternalMemoizedMaskedChildContext = s), e;
}
function xg(t, e, n, i) {
  t = e.state, typeof e.componentWillReceiveProps == "function" && e.componentWillReceiveProps(n, i), typeof e.UNSAFE_componentWillReceiveProps == "function" && e.UNSAFE_componentWillReceiveProps(n, i), e.state !== t && pc.enqueueReplaceState(e, e.state, null);
}
function Id(t, e, n, i) {
  var r = t.stateNode;
  r.props = n, r.state = t.memoizedState, r.refs = {}, yp(t);
  var s = e.contextType;
  typeof s == "object" && s !== null ? r.context = ei(s) : (s = En(e) ? ds : en.current, r.context = uo(t, s)), r.state = t.memoizedState, s = e.getDerivedStateFromProps, typeof s == "function" && (Dd(t, e, s, n), r.state = t.memoizedState), typeof e.getDerivedStateFromProps == "function" || typeof r.getSnapshotBeforeUpdate == "function" || typeof r.UNSAFE_componentWillMount != "function" && typeof r.componentWillMount != "function" || (e = r.state, typeof r.componentWillMount == "function" && r.componentWillMount(), typeof r.UNSAFE_componentWillMount == "function" && r.UNSAFE_componentWillMount(), e !== r.state && pc.enqueueReplaceState(r, r.state, null), Nu(t, n, r, i), r.state = t.memoizedState), typeof r.componentDidMount == "function" && (t.flags |= 4194308);
}
function po(t, e) {
  try {
    var n = "", i = e;
    do
      n += gM(i), i = i.return;
    while (i);
    var r = n;
  } catch (s) {
    r = `
Error generating stack: ` + s.message + `
` + s.stack;
  }
  return { value: t, source: e, stack: r, digest: null };
}
function of(t, e, n) {
  return { value: t, source: null, stack: n ?? null, digest: e ?? null };
}
function Nd(t, e) {
  try {
    console.error(e.value);
  } catch (n) {
    setTimeout(function() {
      throw n;
    });
  }
}
var G1 = typeof WeakMap == "function" ? WeakMap : Map;
function Mx(t, e, n) {
  n = ji(-1, n), n.tag = 3, n.payload = { element: null };
  var i = e.value;
  return n.callback = function() {
    Bu || (Bu = !0, Wd = i), Nd(t, e);
  }, n;
}
function Ex(t, e, n) {
  n = ji(-1, n), n.tag = 3;
  var i = t.type.getDerivedStateFromError;
  if (typeof i == "function") {
    var r = e.value;
    n.payload = function() {
      return i(r);
    }, n.callback = function() {
      Nd(t, e);
    };
  }
  var s = t.stateNode;
  return s !== null && typeof s.componentDidCatch == "function" && (n.callback = function() {
    Nd(t, e), typeof i != "function" && (br === null ? br = /* @__PURE__ */ new Set([this]) : br.add(this));
    var o = e.stack;
    this.componentDidCatch(e.value, { componentStack: o !== null ? o : "" });
  }), n;
}
function yg(t, e, n) {
  var i = t.pingCache;
  if (i === null) {
    i = t.pingCache = new G1();
    var r = /* @__PURE__ */ new Set();
    i.set(e, r);
  } else r = i.get(e), r === void 0 && (r = /* @__PURE__ */ new Set(), i.set(e, r));
  r.has(n) || (r.add(n), t = iE.bind(null, t, e, n), e.then(t, t));
}
function Sg(t) {
  do {
    var e;
    if ((e = t.tag === 13) && (e = t.memoizedState, e = e !== null ? e.dehydrated !== null : !0), e) return t;
    t = t.return;
  } while (t !== null);
  return null;
}
function Mg(t, e, n, i, r) {
  return t.mode & 1 ? (t.flags |= 65536, t.lanes = r, t) : (t === e ? t.flags |= 65536 : (t.flags |= 128, n.flags |= 131072, n.flags &= -52805, n.tag === 1 && (n.alternate === null ? n.tag = 17 : (e = ji(-1, 1), e.tag = 2, Rr(n, e, 1))), n.lanes |= 1), t);
}
var W1 = nr.ReactCurrentOwner, yn = !1;
function nn(t, e, n, i) {
  e.child = t === null ? Q_(e, null, n, i) : fo(e, t.child, n, i);
}
function Eg(t, e, n, i, r) {
  n = n.render;
  var s = e.ref;
  return io(e, r), i = Tp(t, e, n, i, s, r), n = Cp(), t !== null && !yn ? (e.updateQueue = t.updateQueue, e.flags &= -2053, t.lanes &= ~r, Qi(t, e, r)) : (mt && n && hp(e), e.flags |= 1, nn(t, e, i, r), e.child);
}
function wg(t, e, n, i, r) {
  if (t === null) {
    var s = n.type;
    return typeof s == "function" && !kp(s) && s.defaultProps === void 0 && n.compare === null && n.defaultProps === void 0 ? (e.tag = 15, e.type = s, wx(t, e, s, i, r)) : (t = tu(n.type, null, i, e, e.mode, r), t.ref = e.ref, t.return = e, e.child = t);
  }
  if (s = t.child, !(t.lanes & r)) {
    var o = s.memoizedProps;
    if (n = n.compare, n = n !== null ? n : Ra, n(o, i) && t.ref === e.ref) return Qi(t, e, r);
  }
  return e.flags |= 1, t = Lr(s, i), t.ref = e.ref, t.return = e, e.child = t;
}
function wx(t, e, n, i, r) {
  if (t !== null) {
    var s = t.memoizedProps;
    if (Ra(s, i) && t.ref === e.ref) if (yn = !1, e.pendingProps = i = s, (t.lanes & r) !== 0) t.flags & 131072 && (yn = !0);
    else return e.lanes = t.lanes, Qi(t, e, r);
  }
  return Ud(t, e, n, i, r);
}
function Tx(t, e, n) {
  var i = e.pendingProps, r = i.children, s = t !== null ? t.memoizedState : null;
  if (i.mode === "hidden") if (!(e.mode & 1)) e.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, ut(Zs, In), In |= n;
  else {
    if (!(n & 1073741824)) return t = s !== null ? s.baseLanes | n : n, e.lanes = e.childLanes = 1073741824, e.memoizedState = { baseLanes: t, cachePool: null, transitions: null }, e.updateQueue = null, ut(Zs, In), In |= t, null;
    e.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, i = s !== null ? s.baseLanes : n, ut(Zs, In), In |= i;
  }
  else s !== null ? (i = s.baseLanes | n, e.memoizedState = null) : i = n, ut(Zs, In), In |= i;
  return nn(t, e, r, n), e.child;
}
function Cx(t, e) {
  var n = e.ref;
  (t === null && n !== null || t !== null && t.ref !== n) && (e.flags |= 512, e.flags |= 2097152);
}
function Ud(t, e, n, i, r) {
  var s = En(n) ? ds : en.current;
  return s = uo(e, s), io(e, r), n = Tp(t, e, n, i, s, r), i = Cp(), t !== null && !yn ? (e.updateQueue = t.updateQueue, e.flags &= -2053, t.lanes &= ~r, Qi(t, e, r)) : (mt && i && hp(e), e.flags |= 1, nn(t, e, n, r), e.child);
}
function Tg(t, e, n, i, r) {
  if (En(n)) {
    var s = !0;
    bu(e);
  } else s = !1;
  if (io(e, r), e.stateNode === null) Ql(t, e), Sx(e, n, i), Id(e, n, i, r), i = !0;
  else if (t === null) {
    var o = e.stateNode, a = e.memoizedProps;
    o.props = a;
    var l = o.context, u = n.contextType;
    typeof u == "object" && u !== null ? u = ei(u) : (u = En(n) ? ds : en.current, u = uo(e, u));
    var c = n.getDerivedStateFromProps, d = typeof c == "function" || typeof o.getSnapshotBeforeUpdate == "function";
    d || typeof o.UNSAFE_componentWillReceiveProps != "function" && typeof o.componentWillReceiveProps != "function" || (a !== i || l !== u) && xg(e, o, i, u), mr = !1;
    var h = e.memoizedState;
    o.state = h, Nu(e, i, o, r), l = e.memoizedState, a !== i || h !== l || Mn.current || mr ? (typeof c == "function" && (Dd(e, n, c, i), l = e.memoizedState), (a = mr || _g(e, n, a, i, h, l, u)) ? (d || typeof o.UNSAFE_componentWillMount != "function" && typeof o.componentWillMount != "function" || (typeof o.componentWillMount == "function" && o.componentWillMount(), typeof o.UNSAFE_componentWillMount == "function" && o.UNSAFE_componentWillMount()), typeof o.componentDidMount == "function" && (e.flags |= 4194308)) : (typeof o.componentDidMount == "function" && (e.flags |= 4194308), e.memoizedProps = i, e.memoizedState = l), o.props = i, o.state = l, o.context = u, i = a) : (typeof o.componentDidMount == "function" && (e.flags |= 4194308), i = !1);
  } else {
    o = e.stateNode, ex(t, e), a = e.memoizedProps, u = e.type === e.elementType ? a : ai(e.type, a), o.props = u, d = e.pendingProps, h = o.context, l = n.contextType, typeof l == "object" && l !== null ? l = ei(l) : (l = En(n) ? ds : en.current, l = uo(e, l));
    var p = n.getDerivedStateFromProps;
    (c = typeof p == "function" || typeof o.getSnapshotBeforeUpdate == "function") || typeof o.UNSAFE_componentWillReceiveProps != "function" && typeof o.componentWillReceiveProps != "function" || (a !== d || h !== l) && xg(e, o, i, l), mr = !1, h = e.memoizedState, o.state = h, Nu(e, i, o, r);
    var _ = e.memoizedState;
    a !== d || h !== _ || Mn.current || mr ? (typeof p == "function" && (Dd(e, n, p, i), _ = e.memoizedState), (u = mr || _g(e, n, u, i, h, _, l) || !1) ? (c || typeof o.UNSAFE_componentWillUpdate != "function" && typeof o.componentWillUpdate != "function" || (typeof o.componentWillUpdate == "function" && o.componentWillUpdate(i, _, l), typeof o.UNSAFE_componentWillUpdate == "function" && o.UNSAFE_componentWillUpdate(i, _, l)), typeof o.componentDidUpdate == "function" && (e.flags |= 4), typeof o.getSnapshotBeforeUpdate == "function" && (e.flags |= 1024)) : (typeof o.componentDidUpdate != "function" || a === t.memoizedProps && h === t.memoizedState || (e.flags |= 4), typeof o.getSnapshotBeforeUpdate != "function" || a === t.memoizedProps && h === t.memoizedState || (e.flags |= 1024), e.memoizedProps = i, e.memoizedState = _), o.props = i, o.state = _, o.context = l, i = u) : (typeof o.componentDidUpdate != "function" || a === t.memoizedProps && h === t.memoizedState || (e.flags |= 4), typeof o.getSnapshotBeforeUpdate != "function" || a === t.memoizedProps && h === t.memoizedState || (e.flags |= 1024), i = !1);
  }
  return kd(t, e, n, i, s, r);
}
function kd(t, e, n, i, r, s) {
  Cx(t, e);
  var o = (e.flags & 128) !== 0;
  if (!i && !o) return r && cg(e, n, !1), Qi(t, e, s);
  i = e.stateNode, W1.current = e;
  var a = o && typeof n.getDerivedStateFromError != "function" ? null : i.render();
  return e.flags |= 1, t !== null && o ? (e.child = fo(e, t.child, null, s), e.child = fo(e, null, a, s)) : nn(t, e, a, s), e.memoizedState = i.state, r && cg(e, n, !0), e.child;
}
function Ax(t) {
  var e = t.stateNode;
  e.pendingContext ? ug(t, e.pendingContext, e.pendingContext !== e.context) : e.context && ug(t, e.context, !1), Sp(t, e.containerInfo);
}
function Cg(t, e, n, i, r) {
  return co(), mp(r), e.flags |= 256, nn(t, e, n, i), e.child;
}
var Fd = { dehydrated: null, treeContext: null, retryLane: 0 };
function Od(t) {
  return { baseLanes: t, cachePool: null, transitions: null };
}
function Rx(t, e, n) {
  var i = e.pendingProps, r = gt.current, s = !1, o = (e.flags & 128) !== 0, a;
  if ((a = o) || (a = t !== null && t.memoizedState === null ? !1 : (r & 2) !== 0), a ? (s = !0, e.flags &= -129) : (t === null || t.memoizedState !== null) && (r |= 1), ut(gt, r & 1), t === null)
    return Pd(e), t = e.memoizedState, t !== null && (t = t.dehydrated, t !== null) ? (e.mode & 1 ? t.data === "$!" ? e.lanes = 8 : e.lanes = 1073741824 : e.lanes = 1, null) : (o = i.children, t = i.fallback, s ? (i = e.mode, s = e.child, o = { mode: "hidden", children: o }, !(i & 1) && s !== null ? (s.childLanes = 0, s.pendingProps = o) : s = vc(o, i, 0, null), t = fs(t, i, n, null), s.return = e, t.return = e, s.sibling = t, e.child = s, e.child.memoizedState = Od(n), e.memoizedState = Fd, t) : bp(e, o));
  if (r = t.memoizedState, r !== null && (a = r.dehydrated, a !== null)) return $1(t, e, o, i, a, r, n);
  if (s) {
    s = i.fallback, o = e.mode, r = t.child, a = r.sibling;
    var l = { mode: "hidden", children: i.children };
    return !(o & 1) && e.child !== r ? (i = e.child, i.childLanes = 0, i.pendingProps = l, e.deletions = null) : (i = Lr(r, l), i.subtreeFlags = r.subtreeFlags & 14680064), a !== null ? s = Lr(a, s) : (s = fs(s, o, n, null), s.flags |= 2), s.return = e, i.return = e, i.sibling = s, e.child = i, i = s, s = e.child, o = t.child.memoizedState, o = o === null ? Od(n) : { baseLanes: o.baseLanes | n, cachePool: null, transitions: o.transitions }, s.memoizedState = o, s.childLanes = t.childLanes & ~n, e.memoizedState = Fd, i;
  }
  return s = t.child, t = s.sibling, i = Lr(s, { mode: "visible", children: i.children }), !(e.mode & 1) && (i.lanes = n), i.return = e, i.sibling = null, t !== null && (n = e.deletions, n === null ? (e.deletions = [t], e.flags |= 16) : n.push(t)), e.child = i, e.memoizedState = null, i;
}
function bp(t, e) {
  return e = vc({ mode: "visible", children: e }, t.mode, 0, null), e.return = t, t.child = e;
}
function pl(t, e, n, i) {
  return i !== null && mp(i), fo(e, t.child, null, n), t = bp(e, e.pendingProps.children), t.flags |= 2, e.memoizedState = null, t;
}
function $1(t, e, n, i, r, s, o) {
  if (n)
    return e.flags & 256 ? (e.flags &= -257, i = of(Error(ee(422))), pl(t, e, o, i)) : e.memoizedState !== null ? (e.child = t.child, e.flags |= 128, null) : (s = i.fallback, r = e.mode, i = vc({ mode: "visible", children: i.children }, r, 0, null), s = fs(s, r, o, null), s.flags |= 2, i.return = e, s.return = e, i.sibling = s, e.child = i, e.mode & 1 && fo(e, t.child, null, o), e.child.memoizedState = Od(o), e.memoizedState = Fd, s);
  if (!(e.mode & 1)) return pl(t, e, o, null);
  if (r.data === "$!") {
    if (i = r.nextSibling && r.nextSibling.dataset, i) var a = i.dgst;
    return i = a, s = Error(ee(419)), i = of(s, i, void 0), pl(t, e, o, i);
  }
  if (a = (o & t.childLanes) !== 0, yn || a) {
    if (i = Ht, i !== null) {
      switch (o & -o) {
        case 4:
          r = 2;
          break;
        case 16:
          r = 8;
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
          r = 32;
          break;
        case 536870912:
          r = 268435456;
          break;
        default:
          r = 0;
      }
      r = r & (i.suspendedLanes | o) ? 0 : r, r !== 0 && r !== s.retryLane && (s.retryLane = r, Zi(t, r), pi(i, t, r, -1));
    }
    return Up(), i = of(Error(ee(421))), pl(t, e, o, i);
  }
  return r.data === "$?" ? (e.flags |= 128, e.child = t.child, e = rE.bind(null, t), r._reactRetry = e, null) : (t = s.treeContext, Bn = Ar(r.nextSibling), zn = e, mt = !0, ui = null, t !== null && (Yn[qn++] = Vi, Yn[qn++] = Gi, Yn[qn++] = hs, Vi = t.id, Gi = t.overflow, hs = e), e = bp(e, i.children), e.flags |= 4096, e);
}
function Ag(t, e, n) {
  t.lanes |= e;
  var i = t.alternate;
  i !== null && (i.lanes |= e), Ld(t.return, e, n);
}
function af(t, e, n, i, r) {
  var s = t.memoizedState;
  s === null ? t.memoizedState = { isBackwards: e, rendering: null, renderingStartTime: 0, last: i, tail: n, tailMode: r } : (s.isBackwards = e, s.rendering = null, s.renderingStartTime = 0, s.last = i, s.tail = n, s.tailMode = r);
}
function bx(t, e, n) {
  var i = e.pendingProps, r = i.revealOrder, s = i.tail;
  if (nn(t, e, i.children, n), i = gt.current, i & 2) i = i & 1 | 2, e.flags |= 128;
  else {
    if (t !== null && t.flags & 128) e: for (t = e.child; t !== null; ) {
      if (t.tag === 13) t.memoizedState !== null && Ag(t, n, e);
      else if (t.tag === 19) Ag(t, n, e);
      else if (t.child !== null) {
        t.child.return = t, t = t.child;
        continue;
      }
      if (t === e) break e;
      for (; t.sibling === null; ) {
        if (t.return === null || t.return === e) break e;
        t = t.return;
      }
      t.sibling.return = t.return, t = t.sibling;
    }
    i &= 1;
  }
  if (ut(gt, i), !(e.mode & 1)) e.memoizedState = null;
  else switch (r) {
    case "forwards":
      for (n = e.child, r = null; n !== null; ) t = n.alternate, t !== null && Uu(t) === null && (r = n), n = n.sibling;
      n = r, n === null ? (r = e.child, e.child = null) : (r = n.sibling, n.sibling = null), af(e, !1, r, n, s);
      break;
    case "backwards":
      for (n = null, r = e.child, e.child = null; r !== null; ) {
        if (t = r.alternate, t !== null && Uu(t) === null) {
          e.child = r;
          break;
        }
        t = r.sibling, r.sibling = n, n = r, r = t;
      }
      af(e, !0, n, null, s);
      break;
    case "together":
      af(e, !1, null, null, void 0);
      break;
    default:
      e.memoizedState = null;
  }
  return e.child;
}
function Ql(t, e) {
  !(e.mode & 1) && t !== null && (t.alternate = null, e.alternate = null, e.flags |= 2);
}
function Qi(t, e, n) {
  if (t !== null && (e.dependencies = t.dependencies), ms |= e.lanes, !(n & e.childLanes)) return null;
  if (t !== null && e.child !== t.child) throw Error(ee(153));
  if (e.child !== null) {
    for (t = e.child, n = Lr(t, t.pendingProps), e.child = n, n.return = e; t.sibling !== null; ) t = t.sibling, n = n.sibling = Lr(t, t.pendingProps), n.return = e;
    n.sibling = null;
  }
  return e.child;
}
function j1(t, e, n) {
  switch (e.tag) {
    case 3:
      Ax(e), co();
      break;
    case 5:
      tx(e);
      break;
    case 1:
      En(e.type) && bu(e);
      break;
    case 4:
      Sp(e, e.stateNode.containerInfo);
      break;
    case 10:
      var i = e.type._context, r = e.memoizedProps.value;
      ut(Du, i._currentValue), i._currentValue = r;
      break;
    case 13:
      if (i = e.memoizedState, i !== null)
        return i.dehydrated !== null ? (ut(gt, gt.current & 1), e.flags |= 128, null) : n & e.child.childLanes ? Rx(t, e, n) : (ut(gt, gt.current & 1), t = Qi(t, e, n), t !== null ? t.sibling : null);
      ut(gt, gt.current & 1);
      break;
    case 19:
      if (i = (n & e.childLanes) !== 0, t.flags & 128) {
        if (i) return bx(t, e, n);
        e.flags |= 128;
      }
      if (r = e.memoizedState, r !== null && (r.rendering = null, r.tail = null, r.lastEffect = null), ut(gt, gt.current), i) break;
      return null;
    case 22:
    case 23:
      return e.lanes = 0, Tx(t, e, n);
  }
  return Qi(t, e, n);
}
var Px, Bd, Lx, Dx;
Px = function(t, e) {
  for (var n = e.child; n !== null; ) {
    if (n.tag === 5 || n.tag === 6) t.appendChild(n.stateNode);
    else if (n.tag !== 4 && n.child !== null) {
      n.child.return = n, n = n.child;
      continue;
    }
    if (n === e) break;
    for (; n.sibling === null; ) {
      if (n.return === null || n.return === e) return;
      n = n.return;
    }
    n.sibling.return = n.return, n = n.sibling;
  }
};
Bd = function() {
};
Lx = function(t, e, n, i) {
  var r = t.memoizedProps;
  if (r !== i) {
    t = e.stateNode, ss(Ci.current);
    var s = null;
    switch (n) {
      case "input":
        r = ad(t, r), i = ad(t, i), s = [];
        break;
      case "select":
        r = _t({}, r, { value: void 0 }), i = _t({}, i, { value: void 0 }), s = [];
        break;
      case "textarea":
        r = cd(t, r), i = cd(t, i), s = [];
        break;
      default:
        typeof r.onClick != "function" && typeof i.onClick == "function" && (t.onclick = Au);
    }
    dd(n, i);
    var o;
    n = null;
    for (u in r) if (!i.hasOwnProperty(u) && r.hasOwnProperty(u) && r[u] != null) if (u === "style") {
      var a = r[u];
      for (o in a) a.hasOwnProperty(o) && (n || (n = {}), n[o] = "");
    } else u !== "dangerouslySetInnerHTML" && u !== "children" && u !== "suppressContentEditableWarning" && u !== "suppressHydrationWarning" && u !== "autoFocus" && (Sa.hasOwnProperty(u) ? s || (s = []) : (s = s || []).push(u, null));
    for (u in i) {
      var l = i[u];
      if (a = r?.[u], i.hasOwnProperty(u) && l !== a && (l != null || a != null)) if (u === "style") if (a) {
        for (o in a) !a.hasOwnProperty(o) || l && l.hasOwnProperty(o) || (n || (n = {}), n[o] = "");
        for (o in l) l.hasOwnProperty(o) && a[o] !== l[o] && (n || (n = {}), n[o] = l[o]);
      } else n || (s || (s = []), s.push(
        u,
        n
      )), n = l;
      else u === "dangerouslySetInnerHTML" ? (l = l ? l.__html : void 0, a = a ? a.__html : void 0, l != null && a !== l && (s = s || []).push(u, l)) : u === "children" ? typeof l != "string" && typeof l != "number" || (s = s || []).push(u, "" + l) : u !== "suppressContentEditableWarning" && u !== "suppressHydrationWarning" && (Sa.hasOwnProperty(u) ? (l != null && u === "onScroll" && dt("scroll", t), s || a === l || (s = [])) : (s = s || []).push(u, l));
    }
    n && (s = s || []).push("style", n);
    var u = s;
    (e.updateQueue = u) && (e.flags |= 4);
  }
};
Dx = function(t, e, n, i) {
  n !== i && (e.flags |= 4);
};
function Go(t, e) {
  if (!mt) switch (t.tailMode) {
    case "hidden":
      e = t.tail;
      for (var n = null; e !== null; ) e.alternate !== null && (n = e), e = e.sibling;
      n === null ? t.tail = null : n.sibling = null;
      break;
    case "collapsed":
      n = t.tail;
      for (var i = null; n !== null; ) n.alternate !== null && (i = n), n = n.sibling;
      i === null ? e || t.tail === null ? t.tail = null : t.tail.sibling = null : i.sibling = null;
  }
}
function Kt(t) {
  var e = t.alternate !== null && t.alternate.child === t.child, n = 0, i = 0;
  if (e) for (var r = t.child; r !== null; ) n |= r.lanes | r.childLanes, i |= r.subtreeFlags & 14680064, i |= r.flags & 14680064, r.return = t, r = r.sibling;
  else for (r = t.child; r !== null; ) n |= r.lanes | r.childLanes, i |= r.subtreeFlags, i |= r.flags, r.return = t, r = r.sibling;
  return t.subtreeFlags |= i, t.childLanes = n, e;
}
function X1(t, e, n) {
  var i = e.pendingProps;
  switch (pp(e), e.tag) {
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
      return Kt(e), null;
    case 1:
      return En(e.type) && Ru(), Kt(e), null;
    case 3:
      return i = e.stateNode, ho(), pt(Mn), pt(en), Ep(), i.pendingContext && (i.context = i.pendingContext, i.pendingContext = null), (t === null || t.child === null) && (dl(e) ? e.flags |= 4 : t === null || t.memoizedState.isDehydrated && !(e.flags & 256) || (e.flags |= 1024, ui !== null && (Xd(ui), ui = null))), Bd(t, e), Kt(e), null;
    case 5:
      Mp(e);
      var r = ss(Ia.current);
      if (n = e.type, t !== null && e.stateNode != null) Lx(t, e, n, i, r), t.ref !== e.ref && (e.flags |= 512, e.flags |= 2097152);
      else {
        if (!i) {
          if (e.stateNode === null) throw Error(ee(166));
          return Kt(e), null;
        }
        if (t = ss(Ci.current), dl(e)) {
          i = e.stateNode, n = e.type;
          var s = e.memoizedProps;
          switch (i[wi] = e, i[La] = s, t = (e.mode & 1) !== 0, n) {
            case "dialog":
              dt("cancel", i), dt("close", i);
              break;
            case "iframe":
            case "object":
            case "embed":
              dt("load", i);
              break;
            case "video":
            case "audio":
              for (r = 0; r < na.length; r++) dt(na[r], i);
              break;
            case "source":
              dt("error", i);
              break;
            case "img":
            case "image":
            case "link":
              dt(
                "error",
                i
              ), dt("load", i);
              break;
            case "details":
              dt("toggle", i);
              break;
            case "input":
              km(i, s), dt("invalid", i);
              break;
            case "select":
              i._wrapperState = { wasMultiple: !!s.multiple }, dt("invalid", i);
              break;
            case "textarea":
              Om(i, s), dt("invalid", i);
          }
          dd(n, s), r = null;
          for (var o in s) if (s.hasOwnProperty(o)) {
            var a = s[o];
            o === "children" ? typeof a == "string" ? i.textContent !== a && (s.suppressHydrationWarning !== !0 && fl(i.textContent, a, t), r = ["children", a]) : typeof a == "number" && i.textContent !== "" + a && (s.suppressHydrationWarning !== !0 && fl(
              i.textContent,
              a,
              t
            ), r = ["children", "" + a]) : Sa.hasOwnProperty(o) && a != null && o === "onScroll" && dt("scroll", i);
          }
          switch (n) {
            case "input":
              il(i), Fm(i, s, !0);
              break;
            case "textarea":
              il(i), Bm(i);
              break;
            case "select":
            case "option":
              break;
            default:
              typeof s.onClick == "function" && (i.onclick = Au);
          }
          i = r, e.updateQueue = i, i !== null && (e.flags |= 4);
        } else {
          o = r.nodeType === 9 ? r : r.ownerDocument, t === "http://www.w3.org/1999/xhtml" && (t = o_(n)), t === "http://www.w3.org/1999/xhtml" ? n === "script" ? (t = o.createElement("div"), t.innerHTML = "<script><\/script>", t = t.removeChild(t.firstChild)) : typeof i.is == "string" ? t = o.createElement(n, { is: i.is }) : (t = o.createElement(n), n === "select" && (o = t, i.multiple ? o.multiple = !0 : i.size && (o.size = i.size))) : t = o.createElementNS(t, n), t[wi] = e, t[La] = i, Px(t, e, !1, !1), e.stateNode = t;
          e: {
            switch (o = hd(n, i), n) {
              case "dialog":
                dt("cancel", t), dt("close", t), r = i;
                break;
              case "iframe":
              case "object":
              case "embed":
                dt("load", t), r = i;
                break;
              case "video":
              case "audio":
                for (r = 0; r < na.length; r++) dt(na[r], t);
                r = i;
                break;
              case "source":
                dt("error", t), r = i;
                break;
              case "img":
              case "image":
              case "link":
                dt(
                  "error",
                  t
                ), dt("load", t), r = i;
                break;
              case "details":
                dt("toggle", t), r = i;
                break;
              case "input":
                km(t, i), r = ad(t, i), dt("invalid", t);
                break;
              case "option":
                r = i;
                break;
              case "select":
                t._wrapperState = { wasMultiple: !!i.multiple }, r = _t({}, i, { value: void 0 }), dt("invalid", t);
                break;
              case "textarea":
                Om(t, i), r = cd(t, i), dt("invalid", t);
                break;
              default:
                r = i;
            }
            dd(n, r), a = r;
            for (s in a) if (a.hasOwnProperty(s)) {
              var l = a[s];
              s === "style" ? u_(t, l) : s === "dangerouslySetInnerHTML" ? (l = l ? l.__html : void 0, l != null && a_(t, l)) : s === "children" ? typeof l == "string" ? (n !== "textarea" || l !== "") && Ma(t, l) : typeof l == "number" && Ma(t, "" + l) : s !== "suppressContentEditableWarning" && s !== "suppressHydrationWarning" && s !== "autoFocus" && (Sa.hasOwnProperty(s) ? l != null && s === "onScroll" && dt("scroll", t) : l != null && Jh(t, s, l, o));
            }
            switch (n) {
              case "input":
                il(t), Fm(t, i, !1);
                break;
              case "textarea":
                il(t), Bm(t);
                break;
              case "option":
                i.value != null && t.setAttribute("value", "" + Ir(i.value));
                break;
              case "select":
                t.multiple = !!i.multiple, s = i.value, s != null ? Js(t, !!i.multiple, s, !1) : i.defaultValue != null && Js(
                  t,
                  !!i.multiple,
                  i.defaultValue,
                  !0
                );
                break;
              default:
                typeof r.onClick == "function" && (t.onclick = Au);
            }
            switch (n) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                i = !!i.autoFocus;
                break e;
              case "img":
                i = !0;
                break e;
              default:
                i = !1;
            }
          }
          i && (e.flags |= 4);
        }
        e.ref !== null && (e.flags |= 512, e.flags |= 2097152);
      }
      return Kt(e), null;
    case 6:
      if (t && e.stateNode != null) Dx(t, e, t.memoizedProps, i);
      else {
        if (typeof i != "string" && e.stateNode === null) throw Error(ee(166));
        if (n = ss(Ia.current), ss(Ci.current), dl(e)) {
          if (i = e.stateNode, n = e.memoizedProps, i[wi] = e, (s = i.nodeValue !== n) && (t = zn, t !== null)) switch (t.tag) {
            case 3:
              fl(i.nodeValue, n, (t.mode & 1) !== 0);
              break;
            case 5:
              t.memoizedProps.suppressHydrationWarning !== !0 && fl(i.nodeValue, n, (t.mode & 1) !== 0);
          }
          s && (e.flags |= 4);
        } else i = (n.nodeType === 9 ? n : n.ownerDocument).createTextNode(i), i[wi] = e, e.stateNode = i;
      }
      return Kt(e), null;
    case 13:
      if (pt(gt), i = e.memoizedState, t === null || t.memoizedState !== null && t.memoizedState.dehydrated !== null) {
        if (mt && Bn !== null && e.mode & 1 && !(e.flags & 128)) K_(), co(), e.flags |= 98560, s = !1;
        else if (s = dl(e), i !== null && i.dehydrated !== null) {
          if (t === null) {
            if (!s) throw Error(ee(318));
            if (s = e.memoizedState, s = s !== null ? s.dehydrated : null, !s) throw Error(ee(317));
            s[wi] = e;
          } else co(), !(e.flags & 128) && (e.memoizedState = null), e.flags |= 4;
          Kt(e), s = !1;
        } else ui !== null && (Xd(ui), ui = null), s = !0;
        if (!s) return e.flags & 65536 ? e : null;
      }
      return e.flags & 128 ? (e.lanes = n, e) : (i = i !== null, i !== (t !== null && t.memoizedState !== null) && i && (e.child.flags |= 8192, e.mode & 1 && (t === null || gt.current & 1 ? It === 0 && (It = 3) : Up())), e.updateQueue !== null && (e.flags |= 4), Kt(e), null);
    case 4:
      return ho(), Bd(t, e), t === null && ba(e.stateNode.containerInfo), Kt(e), null;
    case 10:
      return _p(e.type._context), Kt(e), null;
    case 17:
      return En(e.type) && Ru(), Kt(e), null;
    case 19:
      if (pt(gt), s = e.memoizedState, s === null) return Kt(e), null;
      if (i = (e.flags & 128) !== 0, o = s.rendering, o === null) if (i) Go(s, !1);
      else {
        if (It !== 0 || t !== null && t.flags & 128) for (t = e.child; t !== null; ) {
          if (o = Uu(t), o !== null) {
            for (e.flags |= 128, Go(s, !1), i = o.updateQueue, i !== null && (e.updateQueue = i, e.flags |= 4), e.subtreeFlags = 0, i = n, n = e.child; n !== null; ) s = n, t = i, s.flags &= 14680066, o = s.alternate, o === null ? (s.childLanes = 0, s.lanes = t, s.child = null, s.subtreeFlags = 0, s.memoizedProps = null, s.memoizedState = null, s.updateQueue = null, s.dependencies = null, s.stateNode = null) : (s.childLanes = o.childLanes, s.lanes = o.lanes, s.child = o.child, s.subtreeFlags = 0, s.deletions = null, s.memoizedProps = o.memoizedProps, s.memoizedState = o.memoizedState, s.updateQueue = o.updateQueue, s.type = o.type, t = o.dependencies, s.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }), n = n.sibling;
            return ut(gt, gt.current & 1 | 2), e.child;
          }
          t = t.sibling;
        }
        s.tail !== null && Ct() > mo && (e.flags |= 128, i = !0, Go(s, !1), e.lanes = 4194304);
      }
      else {
        if (!i) if (t = Uu(o), t !== null) {
          if (e.flags |= 128, i = !0, n = t.updateQueue, n !== null && (e.updateQueue = n, e.flags |= 4), Go(s, !0), s.tail === null && s.tailMode === "hidden" && !o.alternate && !mt) return Kt(e), null;
        } else 2 * Ct() - s.renderingStartTime > mo && n !== 1073741824 && (e.flags |= 128, i = !0, Go(s, !1), e.lanes = 4194304);
        s.isBackwards ? (o.sibling = e.child, e.child = o) : (n = s.last, n !== null ? n.sibling = o : e.child = o, s.last = o);
      }
      return s.tail !== null ? (e = s.tail, s.rendering = e, s.tail = e.sibling, s.renderingStartTime = Ct(), e.sibling = null, n = gt.current, ut(gt, i ? n & 1 | 2 : n & 1), e) : (Kt(e), null);
    case 22:
    case 23:
      return Np(), i = e.memoizedState !== null, t !== null && t.memoizedState !== null !== i && (e.flags |= 8192), i && e.mode & 1 ? In & 1073741824 && (Kt(e), e.subtreeFlags & 6 && (e.flags |= 8192)) : Kt(e), null;
    case 24:
      return null;
    case 25:
      return null;
  }
  throw Error(ee(156, e.tag));
}
function Y1(t, e) {
  switch (pp(e), e.tag) {
    case 1:
      return En(e.type) && Ru(), t = e.flags, t & 65536 ? (e.flags = t & -65537 | 128, e) : null;
    case 3:
      return ho(), pt(Mn), pt(en), Ep(), t = e.flags, t & 65536 && !(t & 128) ? (e.flags = t & -65537 | 128, e) : null;
    case 5:
      return Mp(e), null;
    case 13:
      if (pt(gt), t = e.memoizedState, t !== null && t.dehydrated !== null) {
        if (e.alternate === null) throw Error(ee(340));
        co();
      }
      return t = e.flags, t & 65536 ? (e.flags = t & -65537 | 128, e) : null;
    case 19:
      return pt(gt), null;
    case 4:
      return ho(), null;
    case 10:
      return _p(e.type._context), null;
    case 22:
    case 23:
      return Np(), null;
    case 24:
      return null;
    default:
      return null;
  }
}
var ml = !1, Jt = !1, q1 = typeof WeakSet == "function" ? WeakSet : Set, me = null;
function Ks(t, e) {
  var n = t.ref;
  if (n !== null) if (typeof n == "function") try {
    n(null);
  } catch (i) {
    yt(t, e, i);
  }
  else n.current = null;
}
function zd(t, e, n) {
  try {
    n();
  } catch (i) {
    yt(t, e, i);
  }
}
var Rg = !1;
function K1(t, e) {
  if (Ed = wu, t = F_(), dp(t)) {
    if ("selectionStart" in t) var n = { start: t.selectionStart, end: t.selectionEnd };
    else e: {
      n = (n = t.ownerDocument) && n.defaultView || window;
      var i = n.getSelection && n.getSelection();
      if (i && i.rangeCount !== 0) {
        n = i.anchorNode;
        var r = i.anchorOffset, s = i.focusNode;
        i = i.focusOffset;
        try {
          n.nodeType, s.nodeType;
        } catch {
          n = null;
          break e;
        }
        var o = 0, a = -1, l = -1, u = 0, c = 0, d = t, h = null;
        t: for (; ; ) {
          for (var p; d !== n || r !== 0 && d.nodeType !== 3 || (a = o + r), d !== s || i !== 0 && d.nodeType !== 3 || (l = o + i), d.nodeType === 3 && (o += d.nodeValue.length), (p = d.firstChild) !== null; )
            h = d, d = p;
          for (; ; ) {
            if (d === t) break t;
            if (h === n && ++u === r && (a = o), h === s && ++c === i && (l = o), (p = d.nextSibling) !== null) break;
            d = h, h = d.parentNode;
          }
          d = p;
        }
        n = a === -1 || l === -1 ? null : { start: a, end: l };
      } else n = null;
    }
    n = n || { start: 0, end: 0 };
  } else n = null;
  for (wd = { focusedElem: t, selectionRange: n }, wu = !1, me = e; me !== null; ) if (e = me, t = e.child, (e.subtreeFlags & 1028) !== 0 && t !== null) t.return = e, me = t;
  else for (; me !== null; ) {
    e = me;
    try {
      var _ = e.alternate;
      if (e.flags & 1024) switch (e.tag) {
        case 0:
        case 11:
        case 15:
          break;
        case 1:
          if (_ !== null) {
            var y = _.memoizedProps, m = _.memoizedState, f = e.stateNode, v = f.getSnapshotBeforeUpdate(e.elementType === e.type ? y : ai(e.type, y), m);
            f.__reactInternalSnapshotBeforeUpdate = v;
          }
          break;
        case 3:
          var g = e.stateNode.containerInfo;
          g.nodeType === 1 ? g.textContent = "" : g.nodeType === 9 && g.documentElement && g.removeChild(g.documentElement);
          break;
        case 5:
        case 6:
        case 4:
        case 17:
          break;
        default:
          throw Error(ee(163));
      }
    } catch (M) {
      yt(e, e.return, M);
    }
    if (t = e.sibling, t !== null) {
      t.return = e.return, me = t;
      break;
    }
    me = e.return;
  }
  return _ = Rg, Rg = !1, _;
}
function ga(t, e, n) {
  var i = e.updateQueue;
  if (i = i !== null ? i.lastEffect : null, i !== null) {
    var r = i = i.next;
    do {
      if ((r.tag & t) === t) {
        var s = r.destroy;
        r.destroy = void 0, s !== void 0 && zd(e, n, s);
      }
      r = r.next;
    } while (r !== i);
  }
}
function mc(t, e) {
  if (e = e.updateQueue, e = e !== null ? e.lastEffect : null, e !== null) {
    var n = e = e.next;
    do {
      if ((n.tag & t) === t) {
        var i = n.create;
        n.destroy = i();
      }
      n = n.next;
    } while (n !== e);
  }
}
function Hd(t) {
  var e = t.ref;
  if (e !== null) {
    var n = t.stateNode;
    switch (t.tag) {
      case 5:
        t = n;
        break;
      default:
        t = n;
    }
    typeof e == "function" ? e(t) : e.current = t;
  }
}
function Ix(t) {
  var e = t.alternate;
  e !== null && (t.alternate = null, Ix(e)), t.child = null, t.deletions = null, t.sibling = null, t.tag === 5 && (e = t.stateNode, e !== null && (delete e[wi], delete e[La], delete e[Ad], delete e[D1], delete e[I1])), t.stateNode = null, t.return = null, t.dependencies = null, t.memoizedProps = null, t.memoizedState = null, t.pendingProps = null, t.stateNode = null, t.updateQueue = null;
}
function Nx(t) {
  return t.tag === 5 || t.tag === 3 || t.tag === 4;
}
function bg(t) {
  e: for (; ; ) {
    for (; t.sibling === null; ) {
      if (t.return === null || Nx(t.return)) return null;
      t = t.return;
    }
    for (t.sibling.return = t.return, t = t.sibling; t.tag !== 5 && t.tag !== 6 && t.tag !== 18; ) {
      if (t.flags & 2 || t.child === null || t.tag === 4) continue e;
      t.child.return = t, t = t.child;
    }
    if (!(t.flags & 2)) return t.stateNode;
  }
}
function Vd(t, e, n) {
  var i = t.tag;
  if (i === 5 || i === 6) t = t.stateNode, e ? n.nodeType === 8 ? n.parentNode.insertBefore(t, e) : n.insertBefore(t, e) : (n.nodeType === 8 ? (e = n.parentNode, e.insertBefore(t, n)) : (e = n, e.appendChild(t)), n = n._reactRootContainer, n != null || e.onclick !== null || (e.onclick = Au));
  else if (i !== 4 && (t = t.child, t !== null)) for (Vd(t, e, n), t = t.sibling; t !== null; ) Vd(t, e, n), t = t.sibling;
}
function Gd(t, e, n) {
  var i = t.tag;
  if (i === 5 || i === 6) t = t.stateNode, e ? n.insertBefore(t, e) : n.appendChild(t);
  else if (i !== 4 && (t = t.child, t !== null)) for (Gd(t, e, n), t = t.sibling; t !== null; ) Gd(t, e, n), t = t.sibling;
}
var Gt = null, li = !1;
function sr(t, e, n) {
  for (n = n.child; n !== null; ) Ux(t, e, n), n = n.sibling;
}
function Ux(t, e, n) {
  if (Ti && typeof Ti.onCommitFiberUnmount == "function") try {
    Ti.onCommitFiberUnmount(ac, n);
  } catch {
  }
  switch (n.tag) {
    case 5:
      Jt || Ks(n, e);
    case 6:
      var i = Gt, r = li;
      Gt = null, sr(t, e, n), Gt = i, li = r, Gt !== null && (li ? (t = Gt, n = n.stateNode, t.nodeType === 8 ? t.parentNode.removeChild(n) : t.removeChild(n)) : Gt.removeChild(n.stateNode));
      break;
    case 18:
      Gt !== null && (li ? (t = Gt, n = n.stateNode, t.nodeType === 8 ? Jc(t.parentNode, n) : t.nodeType === 1 && Jc(t, n), Ca(t)) : Jc(Gt, n.stateNode));
      break;
    case 4:
      i = Gt, r = li, Gt = n.stateNode.containerInfo, li = !0, sr(t, e, n), Gt = i, li = r;
      break;
    case 0:
    case 11:
    case 14:
    case 15:
      if (!Jt && (i = n.updateQueue, i !== null && (i = i.lastEffect, i !== null))) {
        r = i = i.next;
        do {
          var s = r, o = s.destroy;
          s = s.tag, o !== void 0 && (s & 2 || s & 4) && zd(n, e, o), r = r.next;
        } while (r !== i);
      }
      sr(t, e, n);
      break;
    case 1:
      if (!Jt && (Ks(n, e), i = n.stateNode, typeof i.componentWillUnmount == "function")) try {
        i.props = n.memoizedProps, i.state = n.memoizedState, i.componentWillUnmount();
      } catch (a) {
        yt(n, e, a);
      }
      sr(t, e, n);
      break;
    case 21:
      sr(t, e, n);
      break;
    case 22:
      n.mode & 1 ? (Jt = (i = Jt) || n.memoizedState !== null, sr(t, e, n), Jt = i) : sr(t, e, n);
      break;
    default:
      sr(t, e, n);
  }
}
function Pg(t) {
  var e = t.updateQueue;
  if (e !== null) {
    t.updateQueue = null;
    var n = t.stateNode;
    n === null && (n = t.stateNode = new q1()), e.forEach(function(i) {
      var r = sE.bind(null, t, i);
      n.has(i) || (n.add(i), i.then(r, r));
    });
  }
}
function ii(t, e) {
  var n = e.deletions;
  if (n !== null) for (var i = 0; i < n.length; i++) {
    var r = n[i];
    try {
      var s = t, o = e, a = o;
      e: for (; a !== null; ) {
        switch (a.tag) {
          case 5:
            Gt = a.stateNode, li = !1;
            break e;
          case 3:
            Gt = a.stateNode.containerInfo, li = !0;
            break e;
          case 4:
            Gt = a.stateNode.containerInfo, li = !0;
            break e;
        }
        a = a.return;
      }
      if (Gt === null) throw Error(ee(160));
      Ux(s, o, r), Gt = null, li = !1;
      var l = r.alternate;
      l !== null && (l.return = null), r.return = null;
    } catch (u) {
      yt(r, e, u);
    }
  }
  if (e.subtreeFlags & 12854) for (e = e.child; e !== null; ) kx(e, t), e = e.sibling;
}
function kx(t, e) {
  var n = t.alternate, i = t.flags;
  switch (t.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
      if (ii(e, t), vi(t), i & 4) {
        try {
          ga(3, t, t.return), mc(3, t);
        } catch (y) {
          yt(t, t.return, y);
        }
        try {
          ga(5, t, t.return);
        } catch (y) {
          yt(t, t.return, y);
        }
      }
      break;
    case 1:
      ii(e, t), vi(t), i & 512 && n !== null && Ks(n, n.return);
      break;
    case 5:
      if (ii(e, t), vi(t), i & 512 && n !== null && Ks(n, n.return), t.flags & 32) {
        var r = t.stateNode;
        try {
          Ma(r, "");
        } catch (y) {
          yt(t, t.return, y);
        }
      }
      if (i & 4 && (r = t.stateNode, r != null)) {
        var s = t.memoizedProps, o = n !== null ? n.memoizedProps : s, a = t.type, l = t.updateQueue;
        if (t.updateQueue = null, l !== null) try {
          a === "input" && s.type === "radio" && s.name != null && r_(r, s), hd(a, o);
          var u = hd(a, s);
          for (o = 0; o < l.length; o += 2) {
            var c = l[o], d = l[o + 1];
            c === "style" ? u_(r, d) : c === "dangerouslySetInnerHTML" ? a_(r, d) : c === "children" ? Ma(r, d) : Jh(r, c, d, u);
          }
          switch (a) {
            case "input":
              ld(r, s);
              break;
            case "textarea":
              s_(r, s);
              break;
            case "select":
              var h = r._wrapperState.wasMultiple;
              r._wrapperState.wasMultiple = !!s.multiple;
              var p = s.value;
              p != null ? Js(r, !!s.multiple, p, !1) : h !== !!s.multiple && (s.defaultValue != null ? Js(
                r,
                !!s.multiple,
                s.defaultValue,
                !0
              ) : Js(r, !!s.multiple, s.multiple ? [] : "", !1));
          }
          r[La] = s;
        } catch (y) {
          yt(t, t.return, y);
        }
      }
      break;
    case 6:
      if (ii(e, t), vi(t), i & 4) {
        if (t.stateNode === null) throw Error(ee(162));
        r = t.stateNode, s = t.memoizedProps;
        try {
          r.nodeValue = s;
        } catch (y) {
          yt(t, t.return, y);
        }
      }
      break;
    case 3:
      if (ii(e, t), vi(t), i & 4 && n !== null && n.memoizedState.isDehydrated) try {
        Ca(e.containerInfo);
      } catch (y) {
        yt(t, t.return, y);
      }
      break;
    case 4:
      ii(e, t), vi(t);
      break;
    case 13:
      ii(e, t), vi(t), r = t.child, r.flags & 8192 && (s = r.memoizedState !== null, r.stateNode.isHidden = s, !s || r.alternate !== null && r.alternate.memoizedState !== null || (Dp = Ct())), i & 4 && Pg(t);
      break;
    case 22:
      if (c = n !== null && n.memoizedState !== null, t.mode & 1 ? (Jt = (u = Jt) || c, ii(e, t), Jt = u) : ii(e, t), vi(t), i & 8192) {
        if (u = t.memoizedState !== null, (t.stateNode.isHidden = u) && !c && t.mode & 1) for (me = t, c = t.child; c !== null; ) {
          for (d = me = c; me !== null; ) {
            switch (h = me, p = h.child, h.tag) {
              case 0:
              case 11:
              case 14:
              case 15:
                ga(4, h, h.return);
                break;
              case 1:
                Ks(h, h.return);
                var _ = h.stateNode;
                if (typeof _.componentWillUnmount == "function") {
                  i = h, n = h.return;
                  try {
                    e = i, _.props = e.memoizedProps, _.state = e.memoizedState, _.componentWillUnmount();
                  } catch (y) {
                    yt(i, n, y);
                  }
                }
                break;
              case 5:
                Ks(h, h.return);
                break;
              case 22:
                if (h.memoizedState !== null) {
                  Dg(d);
                  continue;
                }
            }
            p !== null ? (p.return = h, me = p) : Dg(d);
          }
          c = c.sibling;
        }
        e: for (c = null, d = t; ; ) {
          if (d.tag === 5) {
            if (c === null) {
              c = d;
              try {
                r = d.stateNode, u ? (s = r.style, typeof s.setProperty == "function" ? s.setProperty("display", "none", "important") : s.display = "none") : (a = d.stateNode, l = d.memoizedProps.style, o = l != null && l.hasOwnProperty("display") ? l.display : null, a.style.display = l_("display", o));
              } catch (y) {
                yt(t, t.return, y);
              }
            }
          } else if (d.tag === 6) {
            if (c === null) try {
              d.stateNode.nodeValue = u ? "" : d.memoizedProps;
            } catch (y) {
              yt(t, t.return, y);
            }
          } else if ((d.tag !== 22 && d.tag !== 23 || d.memoizedState === null || d === t) && d.child !== null) {
            d.child.return = d, d = d.child;
            continue;
          }
          if (d === t) break e;
          for (; d.sibling === null; ) {
            if (d.return === null || d.return === t) break e;
            c === d && (c = null), d = d.return;
          }
          c === d && (c = null), d.sibling.return = d.return, d = d.sibling;
        }
      }
      break;
    case 19:
      ii(e, t), vi(t), i & 4 && Pg(t);
      break;
    case 21:
      break;
    default:
      ii(
        e,
        t
      ), vi(t);
  }
}
function vi(t) {
  var e = t.flags;
  if (e & 2) {
    try {
      e: {
        for (var n = t.return; n !== null; ) {
          if (Nx(n)) {
            var i = n;
            break e;
          }
          n = n.return;
        }
        throw Error(ee(160));
      }
      switch (i.tag) {
        case 5:
          var r = i.stateNode;
          i.flags & 32 && (Ma(r, ""), i.flags &= -33);
          var s = bg(t);
          Gd(t, s, r);
          break;
        case 3:
        case 4:
          var o = i.stateNode.containerInfo, a = bg(t);
          Vd(t, a, o);
          break;
        default:
          throw Error(ee(161));
      }
    } catch (l) {
      yt(t, t.return, l);
    }
    t.flags &= -3;
  }
  e & 4096 && (t.flags &= -4097);
}
function Z1(t, e, n) {
  me = t, Fx(t);
}
function Fx(t, e, n) {
  for (var i = (t.mode & 1) !== 0; me !== null; ) {
    var r = me, s = r.child;
    if (r.tag === 22 && i) {
      var o = r.memoizedState !== null || ml;
      if (!o) {
        var a = r.alternate, l = a !== null && a.memoizedState !== null || Jt;
        a = ml;
        var u = Jt;
        if (ml = o, (Jt = l) && !u) for (me = r; me !== null; ) o = me, l = o.child, o.tag === 22 && o.memoizedState !== null ? Ig(r) : l !== null ? (l.return = o, me = l) : Ig(r);
        for (; s !== null; ) me = s, Fx(s), s = s.sibling;
        me = r, ml = a, Jt = u;
      }
      Lg(t);
    } else r.subtreeFlags & 8772 && s !== null ? (s.return = r, me = s) : Lg(t);
  }
}
function Lg(t) {
  for (; me !== null; ) {
    var e = me;
    if (e.flags & 8772) {
      var n = e.alternate;
      try {
        if (e.flags & 8772) switch (e.tag) {
          case 0:
          case 11:
          case 15:
            Jt || mc(5, e);
            break;
          case 1:
            var i = e.stateNode;
            if (e.flags & 4 && !Jt) if (n === null) i.componentDidMount();
            else {
              var r = e.elementType === e.type ? n.memoizedProps : ai(e.type, n.memoizedProps);
              i.componentDidUpdate(r, n.memoizedState, i.__reactInternalSnapshotBeforeUpdate);
            }
            var s = e.updateQueue;
            s !== null && mg(e, s, i);
            break;
          case 3:
            var o = e.updateQueue;
            if (o !== null) {
              if (n = null, e.child !== null) switch (e.child.tag) {
                case 5:
                  n = e.child.stateNode;
                  break;
                case 1:
                  n = e.child.stateNode;
              }
              mg(e, o, n);
            }
            break;
          case 5:
            var a = e.stateNode;
            if (n === null && e.flags & 4) {
              n = a;
              var l = e.memoizedProps;
              switch (e.type) {
                case "button":
                case "input":
                case "select":
                case "textarea":
                  l.autoFocus && n.focus();
                  break;
                case "img":
                  l.src && (n.src = l.src);
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
            if (e.memoizedState === null) {
              var u = e.alternate;
              if (u !== null) {
                var c = u.memoizedState;
                if (c !== null) {
                  var d = c.dehydrated;
                  d !== null && Ca(d);
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
            throw Error(ee(163));
        }
        Jt || e.flags & 512 && Hd(e);
      } catch (h) {
        yt(e, e.return, h);
      }
    }
    if (e === t) {
      me = null;
      break;
    }
    if (n = e.sibling, n !== null) {
      n.return = e.return, me = n;
      break;
    }
    me = e.return;
  }
}
function Dg(t) {
  for (; me !== null; ) {
    var e = me;
    if (e === t) {
      me = null;
      break;
    }
    var n = e.sibling;
    if (n !== null) {
      n.return = e.return, me = n;
      break;
    }
    me = e.return;
  }
}
function Ig(t) {
  for (; me !== null; ) {
    var e = me;
    try {
      switch (e.tag) {
        case 0:
        case 11:
        case 15:
          var n = e.return;
          try {
            mc(4, e);
          } catch (l) {
            yt(e, n, l);
          }
          break;
        case 1:
          var i = e.stateNode;
          if (typeof i.componentDidMount == "function") {
            var r = e.return;
            try {
              i.componentDidMount();
            } catch (l) {
              yt(e, r, l);
            }
          }
          var s = e.return;
          try {
            Hd(e);
          } catch (l) {
            yt(e, s, l);
          }
          break;
        case 5:
          var o = e.return;
          try {
            Hd(e);
          } catch (l) {
            yt(e, o, l);
          }
      }
    } catch (l) {
      yt(e, e.return, l);
    }
    if (e === t) {
      me = null;
      break;
    }
    var a = e.sibling;
    if (a !== null) {
      a.return = e.return, me = a;
      break;
    }
    me = e.return;
  }
}
var Q1 = Math.ceil, Ou = nr.ReactCurrentDispatcher, Pp = nr.ReactCurrentOwner, Qn = nr.ReactCurrentBatchConfig, qe = 0, Ht = null, bt = null, $t = 0, In = 0, Zs = Fr(0), It = 0, Fa = null, ms = 0, gc = 0, Lp = 0, va = null, _n = null, Dp = 0, mo = 1 / 0, Oi = null, Bu = !1, Wd = null, br = null, gl = !1, Sr = null, zu = 0, _a = 0, $d = null, Jl = -1, eu = 0;
function an() {
  return qe & 6 ? Ct() : Jl !== -1 ? Jl : Jl = Ct();
}
function Pr(t) {
  return t.mode & 1 ? qe & 2 && $t !== 0 ? $t & -$t : U1.transition !== null ? (eu === 0 && (eu = S_()), eu) : (t = it, t !== 0 || (t = window.event, t = t === void 0 ? 16 : R_(t.type)), t) : 1;
}
function pi(t, e, n, i) {
  if (50 < _a) throw _a = 0, $d = null, Error(ee(185));
  $a(t, n, i), (!(qe & 2) || t !== Ht) && (t === Ht && (!(qe & 2) && (gc |= n), It === 4 && _r(t, $t)), wn(t, i), n === 1 && qe === 0 && !(e.mode & 1) && (mo = Ct() + 500, dc && Or()));
}
function wn(t, e) {
  var n = t.callbackNode;
  UM(t, e);
  var i = Eu(t, t === Ht ? $t : 0);
  if (i === 0) n !== null && Vm(n), t.callbackNode = null, t.callbackPriority = 0;
  else if (e = i & -i, t.callbackPriority !== e) {
    if (n != null && Vm(n), e === 1) t.tag === 0 ? N1(Ng.bind(null, t)) : X_(Ng.bind(null, t)), P1(function() {
      !(qe & 6) && Or();
    }), n = null;
    else {
      switch (M_(i)) {
        case 1:
          n = rp;
          break;
        case 4:
          n = x_;
          break;
        case 16:
          n = Mu;
          break;
        case 536870912:
          n = y_;
          break;
        default:
          n = Mu;
      }
      n = $x(n, Ox.bind(null, t));
    }
    t.callbackPriority = e, t.callbackNode = n;
  }
}
function Ox(t, e) {
  if (Jl = -1, eu = 0, qe & 6) throw Error(ee(327));
  var n = t.callbackNode;
  if (ro() && t.callbackNode !== n) return null;
  var i = Eu(t, t === Ht ? $t : 0);
  if (i === 0) return null;
  if (i & 30 || i & t.expiredLanes || e) e = Hu(t, i);
  else {
    e = i;
    var r = qe;
    qe |= 2;
    var s = zx();
    (Ht !== t || $t !== e) && (Oi = null, mo = Ct() + 500, cs(t, e));
    do
      try {
        tE();
        break;
      } catch (a) {
        Bx(t, a);
      }
    while (!0);
    vp(), Ou.current = s, qe = r, bt !== null ? e = 0 : (Ht = null, $t = 0, e = It);
  }
  if (e !== 0) {
    if (e === 2 && (r = _d(t), r !== 0 && (i = r, e = jd(t, r))), e === 1) throw n = Fa, cs(t, 0), _r(t, i), wn(t, Ct()), n;
    if (e === 6) _r(t, i);
    else {
      if (r = t.current.alternate, !(i & 30) && !J1(r) && (e = Hu(t, i), e === 2 && (s = _d(t), s !== 0 && (i = s, e = jd(t, s))), e === 1)) throw n = Fa, cs(t, 0), _r(t, i), wn(t, Ct()), n;
      switch (t.finishedWork = r, t.finishedLanes = i, e) {
        case 0:
        case 1:
          throw Error(ee(345));
        case 2:
          qr(t, _n, Oi);
          break;
        case 3:
          if (_r(t, i), (i & 130023424) === i && (e = Dp + 500 - Ct(), 10 < e)) {
            if (Eu(t, 0) !== 0) break;
            if (r = t.suspendedLanes, (r & i) !== i) {
              an(), t.pingedLanes |= t.suspendedLanes & r;
              break;
            }
            t.timeoutHandle = Cd(qr.bind(null, t, _n, Oi), e);
            break;
          }
          qr(t, _n, Oi);
          break;
        case 4:
          if (_r(t, i), (i & 4194240) === i) break;
          for (e = t.eventTimes, r = -1; 0 < i; ) {
            var o = 31 - hi(i);
            s = 1 << o, o = e[o], o > r && (r = o), i &= ~s;
          }
          if (i = r, i = Ct() - i, i = (120 > i ? 120 : 480 > i ? 480 : 1080 > i ? 1080 : 1920 > i ? 1920 : 3e3 > i ? 3e3 : 4320 > i ? 4320 : 1960 * Q1(i / 1960)) - i, 10 < i) {
            t.timeoutHandle = Cd(qr.bind(null, t, _n, Oi), i);
            break;
          }
          qr(t, _n, Oi);
          break;
        case 5:
          qr(t, _n, Oi);
          break;
        default:
          throw Error(ee(329));
      }
    }
  }
  return wn(t, Ct()), t.callbackNode === n ? Ox.bind(null, t) : null;
}
function jd(t, e) {
  var n = va;
  return t.current.memoizedState.isDehydrated && (cs(t, e).flags |= 256), t = Hu(t, e), t !== 2 && (e = _n, _n = n, e !== null && Xd(e)), t;
}
function Xd(t) {
  _n === null ? _n = t : _n.push.apply(_n, t);
}
function J1(t) {
  for (var e = t; ; ) {
    if (e.flags & 16384) {
      var n = e.updateQueue;
      if (n !== null && (n = n.stores, n !== null)) for (var i = 0; i < n.length; i++) {
        var r = n[i], s = r.getSnapshot;
        r = r.value;
        try {
          if (!gi(s(), r)) return !1;
        } catch {
          return !1;
        }
      }
    }
    if (n = e.child, e.subtreeFlags & 16384 && n !== null) n.return = e, e = n;
    else {
      if (e === t) break;
      for (; e.sibling === null; ) {
        if (e.return === null || e.return === t) return !0;
        e = e.return;
      }
      e.sibling.return = e.return, e = e.sibling;
    }
  }
  return !0;
}
function _r(t, e) {
  for (e &= ~Lp, e &= ~gc, t.suspendedLanes |= e, t.pingedLanes &= ~e, t = t.expirationTimes; 0 < e; ) {
    var n = 31 - hi(e), i = 1 << n;
    t[n] = -1, e &= ~i;
  }
}
function Ng(t) {
  if (qe & 6) throw Error(ee(327));
  ro();
  var e = Eu(t, 0);
  if (!(e & 1)) return wn(t, Ct()), null;
  var n = Hu(t, e);
  if (t.tag !== 0 && n === 2) {
    var i = _d(t);
    i !== 0 && (e = i, n = jd(t, i));
  }
  if (n === 1) throw n = Fa, cs(t, 0), _r(t, e), wn(t, Ct()), n;
  if (n === 6) throw Error(ee(345));
  return t.finishedWork = t.current.alternate, t.finishedLanes = e, qr(t, _n, Oi), wn(t, Ct()), null;
}
function Ip(t, e) {
  var n = qe;
  qe |= 1;
  try {
    return t(e);
  } finally {
    qe = n, qe === 0 && (mo = Ct() + 500, dc && Or());
  }
}
function gs(t) {
  Sr !== null && Sr.tag === 0 && !(qe & 6) && ro();
  var e = qe;
  qe |= 1;
  var n = Qn.transition, i = it;
  try {
    if (Qn.transition = null, it = 1, t) return t();
  } finally {
    it = i, Qn.transition = n, qe = e, !(qe & 6) && Or();
  }
}
function Np() {
  In = Zs.current, pt(Zs);
}
function cs(t, e) {
  t.finishedWork = null, t.finishedLanes = 0;
  var n = t.timeoutHandle;
  if (n !== -1 && (t.timeoutHandle = -1, b1(n)), bt !== null) for (n = bt.return; n !== null; ) {
    var i = n;
    switch (pp(i), i.tag) {
      case 1:
        i = i.type.childContextTypes, i != null && Ru();
        break;
      case 3:
        ho(), pt(Mn), pt(en), Ep();
        break;
      case 5:
        Mp(i);
        break;
      case 4:
        ho();
        break;
      case 13:
        pt(gt);
        break;
      case 19:
        pt(gt);
        break;
      case 10:
        _p(i.type._context);
        break;
      case 22:
      case 23:
        Np();
    }
    n = n.return;
  }
  if (Ht = t, bt = t = Lr(t.current, null), $t = In = e, It = 0, Fa = null, Lp = gc = ms = 0, _n = va = null, rs !== null) {
    for (e = 0; e < rs.length; e++) if (n = rs[e], i = n.interleaved, i !== null) {
      n.interleaved = null;
      var r = i.next, s = n.pending;
      if (s !== null) {
        var o = s.next;
        s.next = r, i.next = o;
      }
      n.pending = i;
    }
    rs = null;
  }
  return t;
}
function Bx(t, e) {
  do {
    var n = bt;
    try {
      if (vp(), Kl.current = Fu, ku) {
        for (var i = vt.memoizedState; i !== null; ) {
          var r = i.queue;
          r !== null && (r.pending = null), i = i.next;
        }
        ku = !1;
      }
      if (ps = 0, zt = Lt = vt = null, ma = !1, Na = 0, Pp.current = null, n === null || n.return === null) {
        It = 1, Fa = e, bt = null;
        break;
      }
      e: {
        var s = t, o = n.return, a = n, l = e;
        if (e = $t, a.flags |= 32768, l !== null && typeof l == "object" && typeof l.then == "function") {
          var u = l, c = a, d = c.tag;
          if (!(c.mode & 1) && (d === 0 || d === 11 || d === 15)) {
            var h = c.alternate;
            h ? (c.updateQueue = h.updateQueue, c.memoizedState = h.memoizedState, c.lanes = h.lanes) : (c.updateQueue = null, c.memoizedState = null);
          }
          var p = Sg(o);
          if (p !== null) {
            p.flags &= -257, Mg(p, o, a, s, e), p.mode & 1 && yg(s, u, e), e = p, l = u;
            var _ = e.updateQueue;
            if (_ === null) {
              var y = /* @__PURE__ */ new Set();
              y.add(l), e.updateQueue = y;
            } else _.add(l);
            break e;
          } else {
            if (!(e & 1)) {
              yg(s, u, e), Up();
              break e;
            }
            l = Error(ee(426));
          }
        } else if (mt && a.mode & 1) {
          var m = Sg(o);
          if (m !== null) {
            !(m.flags & 65536) && (m.flags |= 256), Mg(m, o, a, s, e), mp(po(l, a));
            break e;
          }
        }
        s = l = po(l, a), It !== 4 && (It = 2), va === null ? va = [s] : va.push(s), s = o;
        do {
          switch (s.tag) {
            case 3:
              s.flags |= 65536, e &= -e, s.lanes |= e;
              var f = Mx(s, l, e);
              pg(s, f);
              break e;
            case 1:
              a = l;
              var v = s.type, g = s.stateNode;
              if (!(s.flags & 128) && (typeof v.getDerivedStateFromError == "function" || g !== null && typeof g.componentDidCatch == "function" && (br === null || !br.has(g)))) {
                s.flags |= 65536, e &= -e, s.lanes |= e;
                var M = Ex(s, a, e);
                pg(s, M);
                break e;
              }
          }
          s = s.return;
        } while (s !== null);
      }
      Vx(n);
    } catch (b) {
      e = b, bt === n && n !== null && (bt = n = n.return);
      continue;
    }
    break;
  } while (!0);
}
function zx() {
  var t = Ou.current;
  return Ou.current = Fu, t === null ? Fu : t;
}
function Up() {
  (It === 0 || It === 3 || It === 2) && (It = 4), Ht === null || !(ms & 268435455) && !(gc & 268435455) || _r(Ht, $t);
}
function Hu(t, e) {
  var n = qe;
  qe |= 2;
  var i = zx();
  (Ht !== t || $t !== e) && (Oi = null, cs(t, e));
  do
    try {
      eE();
      break;
    } catch (r) {
      Bx(t, r);
    }
  while (!0);
  if (vp(), qe = n, Ou.current = i, bt !== null) throw Error(ee(261));
  return Ht = null, $t = 0, It;
}
function eE() {
  for (; bt !== null; ) Hx(bt);
}
function tE() {
  for (; bt !== null && !CM(); ) Hx(bt);
}
function Hx(t) {
  var e = Wx(t.alternate, t, In);
  t.memoizedProps = t.pendingProps, e === null ? Vx(t) : bt = e, Pp.current = null;
}
function Vx(t) {
  var e = t;
  do {
    var n = e.alternate;
    if (t = e.return, e.flags & 32768) {
      if (n = Y1(n, e), n !== null) {
        n.flags &= 32767, bt = n;
        return;
      }
      if (t !== null) t.flags |= 32768, t.subtreeFlags = 0, t.deletions = null;
      else {
        It = 6, bt = null;
        return;
      }
    } else if (n = X1(n, e, In), n !== null) {
      bt = n;
      return;
    }
    if (e = e.sibling, e !== null) {
      bt = e;
      return;
    }
    bt = e = t;
  } while (e !== null);
  It === 0 && (It = 5);
}
function qr(t, e, n) {
  var i = it, r = Qn.transition;
  try {
    Qn.transition = null, it = 1, nE(t, e, n, i);
  } finally {
    Qn.transition = r, it = i;
  }
  return null;
}
function nE(t, e, n, i) {
  do
    ro();
  while (Sr !== null);
  if (qe & 6) throw Error(ee(327));
  n = t.finishedWork;
  var r = t.finishedLanes;
  if (n === null) return null;
  if (t.finishedWork = null, t.finishedLanes = 0, n === t.current) throw Error(ee(177));
  t.callbackNode = null, t.callbackPriority = 0;
  var s = n.lanes | n.childLanes;
  if (kM(t, s), t === Ht && (bt = Ht = null, $t = 0), !(n.subtreeFlags & 2064) && !(n.flags & 2064) || gl || (gl = !0, $x(Mu, function() {
    return ro(), null;
  })), s = (n.flags & 15990) !== 0, n.subtreeFlags & 15990 || s) {
    s = Qn.transition, Qn.transition = null;
    var o = it;
    it = 1;
    var a = qe;
    qe |= 4, Pp.current = null, K1(t, n), kx(n, t), M1(wd), wu = !!Ed, wd = Ed = null, t.current = n, Z1(n), AM(), qe = a, it = o, Qn.transition = s;
  } else t.current = n;
  if (gl && (gl = !1, Sr = t, zu = r), s = t.pendingLanes, s === 0 && (br = null), PM(n.stateNode), wn(t, Ct()), e !== null) for (i = t.onRecoverableError, n = 0; n < e.length; n++) r = e[n], i(r.value, { componentStack: r.stack, digest: r.digest });
  if (Bu) throw Bu = !1, t = Wd, Wd = null, t;
  return zu & 1 && t.tag !== 0 && ro(), s = t.pendingLanes, s & 1 ? t === $d ? _a++ : (_a = 0, $d = t) : _a = 0, Or(), null;
}
function ro() {
  if (Sr !== null) {
    var t = M_(zu), e = Qn.transition, n = it;
    try {
      if (Qn.transition = null, it = 16 > t ? 16 : t, Sr === null) var i = !1;
      else {
        if (t = Sr, Sr = null, zu = 0, qe & 6) throw Error(ee(331));
        var r = qe;
        for (qe |= 4, me = t.current; me !== null; ) {
          var s = me, o = s.child;
          if (me.flags & 16) {
            var a = s.deletions;
            if (a !== null) {
              for (var l = 0; l < a.length; l++) {
                var u = a[l];
                for (me = u; me !== null; ) {
                  var c = me;
                  switch (c.tag) {
                    case 0:
                    case 11:
                    case 15:
                      ga(8, c, s);
                  }
                  var d = c.child;
                  if (d !== null) d.return = c, me = d;
                  else for (; me !== null; ) {
                    c = me;
                    var h = c.sibling, p = c.return;
                    if (Ix(c), c === u) {
                      me = null;
                      break;
                    }
                    if (h !== null) {
                      h.return = p, me = h;
                      break;
                    }
                    me = p;
                  }
                }
              }
              var _ = s.alternate;
              if (_ !== null) {
                var y = _.child;
                if (y !== null) {
                  _.child = null;
                  do {
                    var m = y.sibling;
                    y.sibling = null, y = m;
                  } while (y !== null);
                }
              }
              me = s;
            }
          }
          if (s.subtreeFlags & 2064 && o !== null) o.return = s, me = o;
          else e: for (; me !== null; ) {
            if (s = me, s.flags & 2048) switch (s.tag) {
              case 0:
              case 11:
              case 15:
                ga(9, s, s.return);
            }
            var f = s.sibling;
            if (f !== null) {
              f.return = s.return, me = f;
              break e;
            }
            me = s.return;
          }
        }
        var v = t.current;
        for (me = v; me !== null; ) {
          o = me;
          var g = o.child;
          if (o.subtreeFlags & 2064 && g !== null) g.return = o, me = g;
          else e: for (o = v; me !== null; ) {
            if (a = me, a.flags & 2048) try {
              switch (a.tag) {
                case 0:
                case 11:
                case 15:
                  mc(9, a);
              }
            } catch (b) {
              yt(a, a.return, b);
            }
            if (a === o) {
              me = null;
              break e;
            }
            var M = a.sibling;
            if (M !== null) {
              M.return = a.return, me = M;
              break e;
            }
            me = a.return;
          }
        }
        if (qe = r, Or(), Ti && typeof Ti.onPostCommitFiberRoot == "function") try {
          Ti.onPostCommitFiberRoot(ac, t);
        } catch {
        }
        i = !0;
      }
      return i;
    } finally {
      it = n, Qn.transition = e;
    }
  }
  return !1;
}
function Ug(t, e, n) {
  e = po(n, e), e = Mx(t, e, 1), t = Rr(t, e, 1), e = an(), t !== null && ($a(t, 1, e), wn(t, e));
}
function yt(t, e, n) {
  if (t.tag === 3) Ug(t, t, n);
  else for (; e !== null; ) {
    if (e.tag === 3) {
      Ug(e, t, n);
      break;
    } else if (e.tag === 1) {
      var i = e.stateNode;
      if (typeof e.type.getDerivedStateFromError == "function" || typeof i.componentDidCatch == "function" && (br === null || !br.has(i))) {
        t = po(n, t), t = Ex(e, t, 1), e = Rr(e, t, 1), t = an(), e !== null && ($a(e, 1, t), wn(e, t));
        break;
      }
    }
    e = e.return;
  }
}
function iE(t, e, n) {
  var i = t.pingCache;
  i !== null && i.delete(e), e = an(), t.pingedLanes |= t.suspendedLanes & n, Ht === t && ($t & n) === n && (It === 4 || It === 3 && ($t & 130023424) === $t && 500 > Ct() - Dp ? cs(t, 0) : Lp |= n), wn(t, e);
}
function Gx(t, e) {
  e === 0 && (t.mode & 1 ? (e = ol, ol <<= 1, !(ol & 130023424) && (ol = 4194304)) : e = 1);
  var n = an();
  t = Zi(t, e), t !== null && ($a(t, e, n), wn(t, n));
}
function rE(t) {
  var e = t.memoizedState, n = 0;
  e !== null && (n = e.retryLane), Gx(t, n);
}
function sE(t, e) {
  var n = 0;
  switch (t.tag) {
    case 13:
      var i = t.stateNode, r = t.memoizedState;
      r !== null && (n = r.retryLane);
      break;
    case 19:
      i = t.stateNode;
      break;
    default:
      throw Error(ee(314));
  }
  i !== null && i.delete(e), Gx(t, n);
}
var Wx;
Wx = function(t, e, n) {
  if (t !== null) if (t.memoizedProps !== e.pendingProps || Mn.current) yn = !0;
  else {
    if (!(t.lanes & n) && !(e.flags & 128)) return yn = !1, j1(t, e, n);
    yn = !!(t.flags & 131072);
  }
  else yn = !1, mt && e.flags & 1048576 && Y_(e, Lu, e.index);
  switch (e.lanes = 0, e.tag) {
    case 2:
      var i = e.type;
      Ql(t, e), t = e.pendingProps;
      var r = uo(e, en.current);
      io(e, n), r = Tp(null, e, i, t, r, n);
      var s = Cp();
      return e.flags |= 1, typeof r == "object" && r !== null && typeof r.render == "function" && r.$$typeof === void 0 ? (e.tag = 1, e.memoizedState = null, e.updateQueue = null, En(i) ? (s = !0, bu(e)) : s = !1, e.memoizedState = r.state !== null && r.state !== void 0 ? r.state : null, yp(e), r.updater = pc, e.stateNode = r, r._reactInternals = e, Id(e, i, t, n), e = kd(null, e, i, !0, s, n)) : (e.tag = 0, mt && s && hp(e), nn(null, e, r, n), e = e.child), e;
    case 16:
      i = e.elementType;
      e: {
        switch (Ql(t, e), t = e.pendingProps, r = i._init, i = r(i._payload), e.type = i, r = e.tag = aE(i), t = ai(i, t), r) {
          case 0:
            e = Ud(null, e, i, t, n);
            break e;
          case 1:
            e = Tg(null, e, i, t, n);
            break e;
          case 11:
            e = Eg(null, e, i, t, n);
            break e;
          case 14:
            e = wg(null, e, i, ai(i.type, t), n);
            break e;
        }
        throw Error(ee(
          306,
          i,
          ""
        ));
      }
      return e;
    case 0:
      return i = e.type, r = e.pendingProps, r = e.elementType === i ? r : ai(i, r), Ud(t, e, i, r, n);
    case 1:
      return i = e.type, r = e.pendingProps, r = e.elementType === i ? r : ai(i, r), Tg(t, e, i, r, n);
    case 3:
      e: {
        if (Ax(e), t === null) throw Error(ee(387));
        i = e.pendingProps, s = e.memoizedState, r = s.element, ex(t, e), Nu(e, i, null, n);
        var o = e.memoizedState;
        if (i = o.element, s.isDehydrated) if (s = { element: i, isDehydrated: !1, cache: o.cache, pendingSuspenseBoundaries: o.pendingSuspenseBoundaries, transitions: o.transitions }, e.updateQueue.baseState = s, e.memoizedState = s, e.flags & 256) {
          r = po(Error(ee(423)), e), e = Cg(t, e, i, n, r);
          break e;
        } else if (i !== r) {
          r = po(Error(ee(424)), e), e = Cg(t, e, i, n, r);
          break e;
        } else for (Bn = Ar(e.stateNode.containerInfo.firstChild), zn = e, mt = !0, ui = null, n = Q_(e, null, i, n), e.child = n; n; ) n.flags = n.flags & -3 | 4096, n = n.sibling;
        else {
          if (co(), i === r) {
            e = Qi(t, e, n);
            break e;
          }
          nn(t, e, i, n);
        }
        e = e.child;
      }
      return e;
    case 5:
      return tx(e), t === null && Pd(e), i = e.type, r = e.pendingProps, s = t !== null ? t.memoizedProps : null, o = r.children, Td(i, r) ? o = null : s !== null && Td(i, s) && (e.flags |= 32), Cx(t, e), nn(t, e, o, n), e.child;
    case 6:
      return t === null && Pd(e), null;
    case 13:
      return Rx(t, e, n);
    case 4:
      return Sp(e, e.stateNode.containerInfo), i = e.pendingProps, t === null ? e.child = fo(e, null, i, n) : nn(t, e, i, n), e.child;
    case 11:
      return i = e.type, r = e.pendingProps, r = e.elementType === i ? r : ai(i, r), Eg(t, e, i, r, n);
    case 7:
      return nn(t, e, e.pendingProps, n), e.child;
    case 8:
      return nn(t, e, e.pendingProps.children, n), e.child;
    case 12:
      return nn(t, e, e.pendingProps.children, n), e.child;
    case 10:
      e: {
        if (i = e.type._context, r = e.pendingProps, s = e.memoizedProps, o = r.value, ut(Du, i._currentValue), i._currentValue = o, s !== null) if (gi(s.value, o)) {
          if (s.children === r.children && !Mn.current) {
            e = Qi(t, e, n);
            break e;
          }
        } else for (s = e.child, s !== null && (s.return = e); s !== null; ) {
          var a = s.dependencies;
          if (a !== null) {
            o = s.child;
            for (var l = a.firstContext; l !== null; ) {
              if (l.context === i) {
                if (s.tag === 1) {
                  l = ji(-1, n & -n), l.tag = 2;
                  var u = s.updateQueue;
                  if (u !== null) {
                    u = u.shared;
                    var c = u.pending;
                    c === null ? l.next = l : (l.next = c.next, c.next = l), u.pending = l;
                  }
                }
                s.lanes |= n, l = s.alternate, l !== null && (l.lanes |= n), Ld(
                  s.return,
                  n,
                  e
                ), a.lanes |= n;
                break;
              }
              l = l.next;
            }
          } else if (s.tag === 10) o = s.type === e.type ? null : s.child;
          else if (s.tag === 18) {
            if (o = s.return, o === null) throw Error(ee(341));
            o.lanes |= n, a = o.alternate, a !== null && (a.lanes |= n), Ld(o, n, e), o = s.sibling;
          } else o = s.child;
          if (o !== null) o.return = s;
          else for (o = s; o !== null; ) {
            if (o === e) {
              o = null;
              break;
            }
            if (s = o.sibling, s !== null) {
              s.return = o.return, o = s;
              break;
            }
            o = o.return;
          }
          s = o;
        }
        nn(t, e, r.children, n), e = e.child;
      }
      return e;
    case 9:
      return r = e.type, i = e.pendingProps.children, io(e, n), r = ei(r), i = i(r), e.flags |= 1, nn(t, e, i, n), e.child;
    case 14:
      return i = e.type, r = ai(i, e.pendingProps), r = ai(i.type, r), wg(t, e, i, r, n);
    case 15:
      return wx(t, e, e.type, e.pendingProps, n);
    case 17:
      return i = e.type, r = e.pendingProps, r = e.elementType === i ? r : ai(i, r), Ql(t, e), e.tag = 1, En(i) ? (t = !0, bu(e)) : t = !1, io(e, n), Sx(e, i, r), Id(e, i, r, n), kd(null, e, i, !0, t, n);
    case 19:
      return bx(t, e, n);
    case 22:
      return Tx(t, e, n);
  }
  throw Error(ee(156, e.tag));
};
function $x(t, e) {
  return __(t, e);
}
function oE(t, e, n, i) {
  this.tag = t, this.key = n, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.ref = null, this.pendingProps = e, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = i, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
}
function Kn(t, e, n, i) {
  return new oE(t, e, n, i);
}
function kp(t) {
  return t = t.prototype, !(!t || !t.isReactComponent);
}
function aE(t) {
  if (typeof t == "function") return kp(t) ? 1 : 0;
  if (t != null) {
    if (t = t.$$typeof, t === tp) return 11;
    if (t === np) return 14;
  }
  return 2;
}
function Lr(t, e) {
  var n = t.alternate;
  return n === null ? (n = Kn(t.tag, e, t.key, t.mode), n.elementType = t.elementType, n.type = t.type, n.stateNode = t.stateNode, n.alternate = t, t.alternate = n) : (n.pendingProps = e, n.type = t.type, n.flags = 0, n.subtreeFlags = 0, n.deletions = null), n.flags = t.flags & 14680064, n.childLanes = t.childLanes, n.lanes = t.lanes, n.child = t.child, n.memoizedProps = t.memoizedProps, n.memoizedState = t.memoizedState, n.updateQueue = t.updateQueue, e = t.dependencies, n.dependencies = e === null ? null : { lanes: e.lanes, firstContext: e.firstContext }, n.sibling = t.sibling, n.index = t.index, n.ref = t.ref, n;
}
function tu(t, e, n, i, r, s) {
  var o = 2;
  if (i = t, typeof t == "function") kp(t) && (o = 1);
  else if (typeof t == "string") o = 5;
  else e: switch (t) {
    case Hs:
      return fs(n.children, r, s, e);
    case ep:
      o = 8, r |= 8;
      break;
    case id:
      return t = Kn(12, n, e, r | 2), t.elementType = id, t.lanes = s, t;
    case rd:
      return t = Kn(13, n, e, r), t.elementType = rd, t.lanes = s, t;
    case sd:
      return t = Kn(19, n, e, r), t.elementType = sd, t.lanes = s, t;
    case t_:
      return vc(n, r, s, e);
    default:
      if (typeof t == "object" && t !== null) switch (t.$$typeof) {
        case J0:
          o = 10;
          break e;
        case e_:
          o = 9;
          break e;
        case tp:
          o = 11;
          break e;
        case np:
          o = 14;
          break e;
        case pr:
          o = 16, i = null;
          break e;
      }
      throw Error(ee(130, t == null ? t : typeof t, ""));
  }
  return e = Kn(o, n, e, r), e.elementType = t, e.type = i, e.lanes = s, e;
}
function fs(t, e, n, i) {
  return t = Kn(7, t, i, e), t.lanes = n, t;
}
function vc(t, e, n, i) {
  return t = Kn(22, t, i, e), t.elementType = t_, t.lanes = n, t.stateNode = { isHidden: !1 }, t;
}
function lf(t, e, n) {
  return t = Kn(6, t, null, e), t.lanes = n, t;
}
function uf(t, e, n) {
  return e = Kn(4, t.children !== null ? t.children : [], t.key, e), e.lanes = n, e.stateNode = { containerInfo: t.containerInfo, pendingChildren: null, implementation: t.implementation }, e;
}
function lE(t, e, n, i, r) {
  this.tag = e, this.containerInfo = t, this.finishedWork = this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.pendingContext = this.context = null, this.callbackPriority = 0, this.eventTimes = Vc(0), this.expirationTimes = Vc(-1), this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Vc(0), this.identifierPrefix = i, this.onRecoverableError = r, this.mutableSourceEagerHydrationData = null;
}
function Fp(t, e, n, i, r, s, o, a, l) {
  return t = new lE(t, e, n, a, l), e === 1 ? (e = 1, s === !0 && (e |= 8)) : e = 0, s = Kn(3, null, null, e), t.current = s, s.stateNode = t, s.memoizedState = { element: i, isDehydrated: n, cache: null, transitions: null, pendingSuspenseBoundaries: null }, yp(s), t;
}
function uE(t, e, n) {
  var i = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
  return { $$typeof: zs, key: i == null ? null : "" + i, children: t, containerInfo: e, implementation: n };
}
function jx(t) {
  if (!t) return Nr;
  t = t._reactInternals;
  e: {
    if (xs(t) !== t || t.tag !== 1) throw Error(ee(170));
    var e = t;
    do {
      switch (e.tag) {
        case 3:
          e = e.stateNode.context;
          break e;
        case 1:
          if (En(e.type)) {
            e = e.stateNode.__reactInternalMemoizedMergedChildContext;
            break e;
          }
      }
      e = e.return;
    } while (e !== null);
    throw Error(ee(171));
  }
  if (t.tag === 1) {
    var n = t.type;
    if (En(n)) return j_(t, n, e);
  }
  return e;
}
function Xx(t, e, n, i, r, s, o, a, l) {
  return t = Fp(n, i, !0, t, r, s, o, a, l), t.context = jx(null), n = t.current, i = an(), r = Pr(n), s = ji(i, r), s.callback = e ?? null, Rr(n, s, r), t.current.lanes = r, $a(t, r, i), wn(t, i), t;
}
function _c(t, e, n, i) {
  var r = e.current, s = an(), o = Pr(r);
  return n = jx(n), e.context === null ? e.context = n : e.pendingContext = n, e = ji(s, o), e.payload = { element: t }, i = i === void 0 ? null : i, i !== null && (e.callback = i), t = Rr(r, e, o), t !== null && (pi(t, r, o, s), ql(t, r, o)), o;
}
function Vu(t) {
  if (t = t.current, !t.child) return null;
  switch (t.child.tag) {
    case 5:
      return t.child.stateNode;
    default:
      return t.child.stateNode;
  }
}
function kg(t, e) {
  if (t = t.memoizedState, t !== null && t.dehydrated !== null) {
    var n = t.retryLane;
    t.retryLane = n !== 0 && n < e ? n : e;
  }
}
function Op(t, e) {
  kg(t, e), (t = t.alternate) && kg(t, e);
}
function cE() {
  return null;
}
var Yx = typeof reportError == "function" ? reportError : function(t) {
  console.error(t);
};
function Bp(t) {
  this._internalRoot = t;
}
xc.prototype.render = Bp.prototype.render = function(t) {
  var e = this._internalRoot;
  if (e === null) throw Error(ee(409));
  _c(t, e, null, null);
};
xc.prototype.unmount = Bp.prototype.unmount = function() {
  var t = this._internalRoot;
  if (t !== null) {
    this._internalRoot = null;
    var e = t.containerInfo;
    gs(function() {
      _c(null, t, null, null);
    }), e[Ki] = null;
  }
};
function xc(t) {
  this._internalRoot = t;
}
xc.prototype.unstable_scheduleHydration = function(t) {
  if (t) {
    var e = T_();
    t = { blockedOn: null, target: t, priority: e };
    for (var n = 0; n < vr.length && e !== 0 && e < vr[n].priority; n++) ;
    vr.splice(n, 0, t), n === 0 && A_(t);
  }
};
function zp(t) {
  return !(!t || t.nodeType !== 1 && t.nodeType !== 9 && t.nodeType !== 11);
}
function yc(t) {
  return !(!t || t.nodeType !== 1 && t.nodeType !== 9 && t.nodeType !== 11 && (t.nodeType !== 8 || t.nodeValue !== " react-mount-point-unstable "));
}
function Fg() {
}
function fE(t, e, n, i, r) {
  if (r) {
    if (typeof i == "function") {
      var s = i;
      i = function() {
        var u = Vu(o);
        s.call(u);
      };
    }
    var o = Xx(e, i, t, 0, null, !1, !1, "", Fg);
    return t._reactRootContainer = o, t[Ki] = o.current, ba(t.nodeType === 8 ? t.parentNode : t), gs(), o;
  }
  for (; r = t.lastChild; ) t.removeChild(r);
  if (typeof i == "function") {
    var a = i;
    i = function() {
      var u = Vu(l);
      a.call(u);
    };
  }
  var l = Fp(t, 0, !1, null, null, !1, !1, "", Fg);
  return t._reactRootContainer = l, t[Ki] = l.current, ba(t.nodeType === 8 ? t.parentNode : t), gs(function() {
    _c(e, l, n, i);
  }), l;
}
function Sc(t, e, n, i, r) {
  var s = n._reactRootContainer;
  if (s) {
    var o = s;
    if (typeof r == "function") {
      var a = r;
      r = function() {
        var l = Vu(o);
        a.call(l);
      };
    }
    _c(e, o, t, r);
  } else o = fE(n, e, t, r, i);
  return Vu(o);
}
E_ = function(t) {
  switch (t.tag) {
    case 3:
      var e = t.stateNode;
      if (e.current.memoizedState.isDehydrated) {
        var n = ta(e.pendingLanes);
        n !== 0 && (sp(e, n | 1), wn(e, Ct()), !(qe & 6) && (mo = Ct() + 500, Or()));
      }
      break;
    case 13:
      gs(function() {
        var i = Zi(t, 1);
        if (i !== null) {
          var r = an();
          pi(i, t, 1, r);
        }
      }), Op(t, 1);
  }
};
op = function(t) {
  if (t.tag === 13) {
    var e = Zi(t, 134217728);
    if (e !== null) {
      var n = an();
      pi(e, t, 134217728, n);
    }
    Op(t, 134217728);
  }
};
w_ = function(t) {
  if (t.tag === 13) {
    var e = Pr(t), n = Zi(t, e);
    if (n !== null) {
      var i = an();
      pi(n, t, e, i);
    }
    Op(t, e);
  }
};
T_ = function() {
  return it;
};
C_ = function(t, e) {
  var n = it;
  try {
    return it = t, e();
  } finally {
    it = n;
  }
};
md = function(t, e, n) {
  switch (e) {
    case "input":
      if (ld(t, n), e = n.name, n.type === "radio" && e != null) {
        for (n = t; n.parentNode; ) n = n.parentNode;
        for (n = n.querySelectorAll("input[name=" + JSON.stringify("" + e) + '][type="radio"]'), e = 0; e < n.length; e++) {
          var i = n[e];
          if (i !== t && i.form === t.form) {
            var r = fc(i);
            if (!r) throw Error(ee(90));
            i_(i), ld(i, r);
          }
        }
      }
      break;
    case "textarea":
      s_(t, n);
      break;
    case "select":
      e = n.value, e != null && Js(t, !!n.multiple, e, !1);
  }
};
d_ = Ip;
h_ = gs;
var dE = { usingClientEntryPoint: !1, Events: [Xa, $s, fc, c_, f_, Ip] }, Wo = { findFiberByHostInstance: is, bundleType: 0, version: "18.3.1", rendererPackageName: "react-dom" }, hE = { bundleType: Wo.bundleType, version: Wo.version, rendererPackageName: Wo.rendererPackageName, rendererConfig: Wo.rendererConfig, overrideHookState: null, overrideHookStateDeletePath: null, overrideHookStateRenamePath: null, overrideProps: null, overridePropsDeletePath: null, overridePropsRenamePath: null, setErrorHandler: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: nr.ReactCurrentDispatcher, findHostInstanceByFiber: function(t) {
  return t = g_(t), t === null ? null : t.stateNode;
}, findFiberByHostInstance: Wo.findFiberByHostInstance || cE, findHostInstancesForRefresh: null, scheduleRefresh: null, scheduleRoot: null, setRefreshHandler: null, getCurrentFiber: null, reconcilerVersion: "18.3.1-next-f1338f8080-20240426" };
if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
  var vl = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (!vl.isDisabled && vl.supportsFiber) try {
    ac = vl.inject(hE), Ti = vl;
  } catch {
  }
}
Vn.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = dE;
Vn.createPortal = function(t, e) {
  var n = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
  if (!zp(e)) throw Error(ee(200));
  return uE(t, e, null, n);
};
Vn.createRoot = function(t, e) {
  if (!zp(t)) throw Error(ee(299));
  var n = !1, i = "", r = Yx;
  return e != null && (e.unstable_strictMode === !0 && (n = !0), e.identifierPrefix !== void 0 && (i = e.identifierPrefix), e.onRecoverableError !== void 0 && (r = e.onRecoverableError)), e = Fp(t, 1, !1, null, null, n, !1, i, r), t[Ki] = e.current, ba(t.nodeType === 8 ? t.parentNode : t), new Bp(e);
};
Vn.findDOMNode = function(t) {
  if (t == null) return null;
  if (t.nodeType === 1) return t;
  var e = t._reactInternals;
  if (e === void 0)
    throw typeof t.render == "function" ? Error(ee(188)) : (t = Object.keys(t).join(","), Error(ee(268, t)));
  return t = g_(e), t = t === null ? null : t.stateNode, t;
};
Vn.flushSync = function(t) {
  return gs(t);
};
Vn.hydrate = function(t, e, n) {
  if (!yc(e)) throw Error(ee(200));
  return Sc(null, t, e, !0, n);
};
Vn.hydrateRoot = function(t, e, n) {
  if (!zp(t)) throw Error(ee(405));
  var i = n != null && n.hydratedSources || null, r = !1, s = "", o = Yx;
  if (n != null && (n.unstable_strictMode === !0 && (r = !0), n.identifierPrefix !== void 0 && (s = n.identifierPrefix), n.onRecoverableError !== void 0 && (o = n.onRecoverableError)), e = Xx(e, null, t, 1, n ?? null, r, !1, s, o), t[Ki] = e.current, ba(t), i) for (t = 0; t < i.length; t++) n = i[t], r = n._getVersion, r = r(n._source), e.mutableSourceEagerHydrationData == null ? e.mutableSourceEagerHydrationData = [n, r] : e.mutableSourceEagerHydrationData.push(
    n,
    r
  );
  return new xc(e);
};
Vn.render = function(t, e, n) {
  if (!yc(e)) throw Error(ee(200));
  return Sc(null, t, e, !1, n);
};
Vn.unmountComponentAtNode = function(t) {
  if (!yc(t)) throw Error(ee(40));
  return t._reactRootContainer ? (gs(function() {
    Sc(null, null, t, !1, function() {
      t._reactRootContainer = null, t[Ki] = null;
    });
  }), !0) : !1;
};
Vn.unstable_batchedUpdates = Ip;
Vn.unstable_renderSubtreeIntoContainer = function(t, e, n, i) {
  if (!yc(n)) throw Error(ee(200));
  if (t == null || t._reactInternals === void 0) throw Error(ee(38));
  return Sc(t, e, n, !1, i);
};
Vn.version = "18.3.1-next-f1338f8080-20240426";
function qx() {
  if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
    try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(qx);
    } catch (t) {
      console.error(t);
    }
}
qx(), q0.exports = Vn;
var pE = q0.exports, Kx, Og = pE;
Kx = Og.createRoot, Og.hydrateRoot;
const mE = [1, 5, 25, 100, 500], gE = {
  1: { base: "#eef1f5", edge: "#c3cbd6", text: "#2a2f3a" },
  5: { base: "#d6363b", edge: "#f4b8ba", text: "#ffffff" },
  25: { base: "#2f9e57", edge: "#bce7cd", text: "#ffffff" },
  100: { base: "#2b2f38", edge: "#8791a0", text: "#ffffff" },
  500: { base: "#7b3fb2", edge: "#d6bcee", text: "#ffffff" }
};
function vE({ value: t, size: e = 58 }) {
  const n = gE[t];
  return /* @__PURE__ */ U.jsxs("svg", { viewBox: "0 0 100 100", width: e, height: e, "aria-label": `$${t} chip`, children: [
    /* @__PURE__ */ U.jsx("circle", { cx: "50", cy: "50", r: "48", fill: n.edge }),
    /* @__PURE__ */ U.jsx("circle", { cx: "50", cy: "50", r: "43", fill: "none", stroke: n.base, strokeWidth: "11", strokeDasharray: "25 20" }),
    /* @__PURE__ */ U.jsx("circle", { cx: "50", cy: "50", r: "37", fill: n.base }),
    /* @__PURE__ */ U.jsx("circle", { cx: "50", cy: "50", r: "31", fill: "none", stroke: n.edge, strokeWidth: "2", strokeDasharray: "3 5" }),
    /* @__PURE__ */ U.jsx(
      "text",
      {
        x: "50",
        y: "50",
        dy: "0.35em",
        textAnchor: "middle",
        fontSize: t >= 100 ? 20 : 24,
        fontWeight: 800,
        fill: n.text,
        fontFamily: "system-ui, -apple-system, sans-serif",
        children: t
      }
    )
  ] });
}
const Ms = {
  bankroll: "bj.bankroll",
  stats: "bj.stats",
  settings: "bj.settings"
}, _E = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"], xE = ["S", "H", "D", "C"];
let yE = 0;
function $o(t) {
  const e = [];
  for (let n = 0; n < t; n++)
    for (const i of xE)
      for (const r of _E) e.push({ rank: r, suit: i, id: `c${yE++}` });
  for (let n = e.length - 1; n > 0; n--) {
    const i = Math.floor(Math.random() * (n + 1)), r = e[n];
    e[n] = e[i], e[i] = r;
  }
  return e;
}
function zi(t) {
  let e = 0, n = 0;
  for (const i of t)
    i.rank === "A" ? (n += 1, e += 11) : i.rank === "K" || i.rank === "Q" || i.rank === "J" || i.rank === "10" ? e += 10 : e += Number(i.rank);
  for (; e > 21 && n > 0; )
    e -= 10, n -= 1;
  return { total: e, soft: n > 0 && e <= 21 };
}
function cf(t) {
  return t.length === 2 && zi(t).total === 21;
}
function Bg(t) {
  return t === "A" ? 11 : t === "K" || t === "Q" || t === "J" || t === "10" ? 10 : Number(t);
}
const ff = { decks: 6, hitSoft17: !1, startingBankroll: 500 }, zg = { hands: 0, wins: 0, losses: 0, pushes: 0, blackjacks: 0 }, df = 260, hf = 520;
class SE {
  constructor(e, n, i) {
    this.api = e, this.onChange = n, this.sfx = i, this.shoe = $o(this.settings.decks), this.loadPrefs();
  }
  shoe = [];
  phase = "betting";
  bankroll = ff.startingBankroll;
  bet = 0;
  hands = [];
  active = 0;
  dealer = [];
  holeHidden = !0;
  insuranceBet = 0;
  message = "";
  lastNet = 0;
  stats = { ...zg };
  settings = { ...ff };
  timers = [];
  disposed = !1;
  /** Current snapshot — used to seed the React state without emitting during the
   *  host component's render (loadPrefs emits the corrected state a tick later). */
  getState() {
    return this.snapshot();
  }
  // --- betting ---------------------------------------------------------------
  addChip(e) {
    this.phase === "betting" && (this.bet + e > this.bankroll || (this.bet += e, this.sfx.chip(), this.emit()));
  }
  clearBet() {
    this.phase === "betting" && (this.bet = 0, this.emit());
  }
  deal() {
    this.phase !== "betting" || this.bet <= 0 || this.bet > this.bankroll || (this.reshuffleIfLow(), this.bankroll -= this.bet, this.hands = [this.freshHand(this.bet)], this.dealer = [], this.active = 0, this.insuranceBet = 0, this.holeHidden = !0, this.message = "", this.lastNet = 0, this.phase = "playing", this.sfx.deal(), this.draw(this.hands[0]), this.schedule(df, () => {
      this.dealer.push(this.pop()), this.sfx.deal(), this.emit();
    }), this.schedule(df * 2, () => {
      this.draw(this.hands[0]), this.sfx.deal(), this.emit();
    }), this.schedule(df * 3, () => {
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
    const e = Math.floor(this.hands[0].bet / 2);
    this.bankroll >= e && (this.bankroll -= e, this.insuranceBet = e, this.sfx.chip()), this.resolveNaturals();
  }
  declineInsurance() {
    this.phase === "insurance" && this.resolveNaturals();
  }
  /** After the deal (and any insurance decision): pay insurance, and if either side
   *  has a natural blackjack, reveal and settle immediately; otherwise start play. */
  resolveNaturals() {
    const e = cf(this.dealer), n = cf(this.hands[0].cards);
    if (this.insuranceBet > 0 && e && (this.bankroll += this.insuranceBet * 3), e || n) {
      this.holeHidden = !1, n && !e ? this.hands[0].outcome = "blackjack" : !n && e ? this.hands[0].outcome = "lose" : this.hands[0].outcome = "push", this.settle();
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
    const e = this.cur();
    !e || e.done || (this.draw(e), this.sfx.deal(), zi(e.cards).total > 21 ? (e.outcome = "bust", e.done = !0, this.sfx.lose(), this.advance()) : this.emit());
  }
  stand() {
    if (this.phase !== "playing") return;
    const e = this.cur();
    !e || e.done || (e.done = !0, this.advance());
  }
  canDouble() {
    const e = this.cur();
    return this.phase === "playing" && !!e && !e.done && e.cards.length === 2 && this.bankroll >= e.bet;
  }
  double() {
    if (!this.canDouble()) return;
    const e = this.cur();
    this.bankroll -= e.bet, e.bet *= 2, e.doubled = !0, this.draw(e), this.sfx.deal(), zi(e.cards).total > 21 && (e.outcome = "bust", this.sfx.lose()), e.done = !0, this.advance();
  }
  canSplit() {
    const e = this.cur();
    return this.phase === "playing" && !!e && !e.done && e.cards.length === 2 && Bg(e.cards[0].rank) === Bg(e.cards[1].rank) && this.hands.length < 4 && this.bankroll >= e.bet;
  }
  split() {
    if (!this.canSplit()) return;
    const e = this.cur(), n = e.cards[0].rank === "A";
    this.bankroll -= e.bet;
    const i = this.freshHand(e.bet);
    i.cards.push(e.cards.pop()), i.splitAce = n, e.splitAce = n, this.draw(e), this.sfx.deal(), n && (e.done = !0), this.hands.splice(this.active + 1, 0, i), e.done ? this.advance() : this.emit();
  }
  advance() {
    for (let e = this.active + 1; e < this.hands.length; e++) {
      const n = this.hands[e];
      if (!n.done && (this.active = e, n.cards.length < 2 && (this.draw(n), this.sfx.deal(), n.splitAce && (n.done = !0)), !n.done)) {
        this.emit();
        return;
      }
    }
    this.startDealer();
  }
  // --- dealer + settlement ---------------------------------------------------
  startDealer() {
    if (this.phase = "dealer", this.holeHidden = !1, this.emit(), !this.hands.some((i) => i.outcome !== "bust")) {
      this.schedule(hf, () => this.settle());
      return;
    }
    const n = (i) => {
      this.schedule(i, () => {
        const { total: r, soft: s } = zi(this.dealer), o = s && r === 17 && this.settings.hitSoft17;
        r < 17 || o ? (this.dealer.push(this.pop()), this.sfx.deal(), this.emit(), n(hf)) : this.settle();
      });
    };
    n(hf);
  }
  settle() {
    const e = zi(this.dealer), n = e.total > 21;
    let i = 0, r = !1;
    for (const s of this.hands) {
      const o = zi(s.cards);
      s.outcome === null && (o.total > 21 ? s.outcome = "bust" : n || o.total > e.total ? s.outcome = "win" : o.total < e.total ? s.outcome = "lose" : s.outcome = "push"), s.outcome === "blackjack" ? (this.bankroll += Math.round(s.bet * 2.5), i += Math.round(s.bet * 1.5), this.stats.blackjacks += 1, this.stats.wins += 1, r = !0) : s.outcome === "win" ? (this.bankroll += s.bet * 2, i += s.bet, this.stats.wins += 1, r = !0) : s.outcome === "push" ? (this.bankroll += s.bet, this.stats.pushes += 1) : (i -= s.bet, this.stats.losses += 1), this.stats.hands += 1;
    }
    this.insuranceBet > 0 && !cf(this.dealer) && (i -= this.insuranceBet), this.lastNet = i, this.phase = "settle", this.message = this.settleMessage(i, r), i > 0 ? (this.hands.some((s) => s.outcome === "blackjack") ? this.sfx.blackjack : this.sfx.win)() : i < 0 ? this.sfx.lose() : this.sfx.push(), this.savePrefs(), this.emit();
  }
  settleMessage(e, n) {
    return e > 0 ? n ? `You win $${e}` : `+$${e}` : e < 0 ? `You lose $${-e}` : "Push";
  }
  newRound() {
    this.clearTimers(), this.hands = [], this.dealer = [], this.active = 0, this.bet = 0, this.insuranceBet = 0, this.holeHidden = !0, this.message = "", this.phase = "betting", this.reshuffleIfLow(), this.emit();
  }
  rebuy() {
    this.bankroll > 0 || (this.bankroll = this.settings.startingBankroll, this.savePrefs(), this.newRound());
  }
  setDecks(e) {
    this.phase === "betting" && (this.settings.decks = Math.max(1, Math.min(8, e)), this.shoe = $o(this.settings.decks), this.savePrefs(), this.emit());
  }
  setHitSoft17(e) {
    this.phase === "betting" && (this.settings.hitSoft17 = e, this.savePrefs(), this.emit());
  }
  dispose() {
    this.disposed = !0, this.clearTimers();
  }
  // --- helpers ---------------------------------------------------------------
  freshHand(e) {
    return { cards: [], bet: e, outcome: null, done: !1, doubled: !1, splitAce: !1 };
  }
  draw(e) {
    e.cards.push(this.pop());
  }
  pop() {
    return this.shoe.length === 0 && (this.shoe = $o(this.settings.decks)), this.shoe.pop();
  }
  reshuffleIfLow() {
    this.shoe.length < this.settings.decks * 52 * 0.25 && (this.shoe = $o(this.settings.decks));
  }
  schedule(e, n) {
    this.disposed || this.timers.push(setTimeout(() => !this.disposed && n(), e));
  }
  clearTimers() {
    for (const e of this.timers) clearTimeout(e);
    this.timers = [];
  }
  snapshot() {
    return {
      phase: this.phase,
      bankroll: this.bankroll,
      bet: this.bet,
      playerHands: this.hands.map((e) => ({ ...e, cards: [...e.cards] })),
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
      const [e, n, i] = await Promise.all([
        this.api.storage.get(Ms.bankroll),
        this.api.storage.get(Ms.stats),
        this.api.storage.get(Ms.settings)
      ]);
      i && typeof i.decks == "number" && (this.settings = { ...ff, ...i }, this.shoe = $o(this.settings.decks)), typeof e == "number" && e > 0 ? this.bankroll = e : this.bankroll = this.settings.startingBankroll, n && typeof n.hands == "number" && (this.stats = { ...zg, ...n }), this.emit();
    } catch {
    }
  }
  async savePrefs() {
    try {
      await Promise.all([
        this.api.storage.set(Ms.bankroll, this.bankroll),
        this.api.storage.set(Ms.stats, this.stats),
        this.api.storage.set(Ms.settings, this.settings)
      ]);
    } catch {
    }
  }
}
/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */
const Hp = "169", ME = 0, Hg = 1, EE = 2, Zx = 1, Qx = 2, ki = 3, Ur = 0, Tn = 1, Hi = 2, Xi = 0, so = 1, Yd = 2, Vg = 3, Gg = 4, wE = 5, Qr = 100, TE = 101, CE = 102, AE = 103, RE = 104, bE = 200, PE = 201, LE = 202, DE = 203, qd = 204, Kd = 205, IE = 206, NE = 207, UE = 208, kE = 209, FE = 210, OE = 211, BE = 212, zE = 213, HE = 214, Zd = 0, Qd = 1, Jd = 2, go = 3, eh = 4, th = 5, nh = 6, ih = 7, Jx = 0, VE = 1, GE = 2, Dr = 0, ey = 1, ty = 2, ny = 3, Vp = 4, WE = 5, iy = 6, ry = 7, sy = 300, vo = 301, _o = 302, rh = 303, sh = 304, Mc = 306, xo = 1e3, os = 1001, oh = 1002, Zn = 1003, $E = 1004, _l = 1005, ci = 1006, pf = 1007, as = 1008, Ji = 1009, oy = 1010, ay = 1011, Oa = 1012, Gp = 1013, vs = 1014, Wi = 1015, Yi = 1016, Wp = 1017, $p = 1018, yo = 1020, ly = 35902, uy = 1021, cy = 1022, di = 1023, fy = 1024, dy = 1025, oo = 1026, So = 1027, hy = 1028, jp = 1029, py = 1030, Xp = 1031, Yp = 1033, nu = 33776, iu = 33777, ru = 33778, su = 33779, ah = 35840, lh = 35841, uh = 35842, ch = 35843, fh = 36196, dh = 37492, hh = 37496, ph = 37808, mh = 37809, gh = 37810, vh = 37811, _h = 37812, xh = 37813, yh = 37814, Sh = 37815, Mh = 37816, Eh = 37817, wh = 37818, Th = 37819, Ch = 37820, Ah = 37821, ou = 36492, Rh = 36494, bh = 36495, my = 36283, Ph = 36284, Lh = 36285, Dh = 36286, jE = 3200, XE = 3201, gy = 0, YE = 1, xr = "", rn = "srgb", Br = "srgb-linear", qp = "display-p3", Ec = "display-p3-linear", Gu = "linear", ot = "srgb", Wu = "rec709", $u = "p3", Es = 7680, Wg = 519, qE = 512, KE = 513, ZE = 514, vy = 515, QE = 516, JE = 517, ew = 518, tw = 519, $g = 35044, jg = "300 es", $i = 2e3, ju = 2001;
class Po {
  addEventListener(e, n) {
    this._listeners === void 0 && (this._listeners = {});
    const i = this._listeners;
    i[e] === void 0 && (i[e] = []), i[e].indexOf(n) === -1 && i[e].push(n);
  }
  hasEventListener(e, n) {
    if (this._listeners === void 0) return !1;
    const i = this._listeners;
    return i[e] !== void 0 && i[e].indexOf(n) !== -1;
  }
  removeEventListener(e, n) {
    if (this._listeners === void 0) return;
    const r = this._listeners[e];
    if (r !== void 0) {
      const s = r.indexOf(n);
      s !== -1 && r.splice(s, 1);
    }
  }
  dispatchEvent(e) {
    if (this._listeners === void 0) return;
    const i = this._listeners[e.type];
    if (i !== void 0) {
      e.target = this;
      const r = i.slice(0);
      for (let s = 0, o = r.length; s < o; s++)
        r[s].call(this, e);
      e.target = null;
    }
  }
}
const Zt = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "0a", "0b", "0c", "0d", "0e", "0f", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "1a", "1b", "1c", "1d", "1e", "1f", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "2a", "2b", "2c", "2d", "2e", "2f", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "3a", "3b", "3c", "3d", "3e", "3f", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "4a", "4b", "4c", "4d", "4e", "4f", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59", "5a", "5b", "5c", "5d", "5e", "5f", "60", "61", "62", "63", "64", "65", "66", "67", "68", "69", "6a", "6b", "6c", "6d", "6e", "6f", "70", "71", "72", "73", "74", "75", "76", "77", "78", "79", "7a", "7b", "7c", "7d", "7e", "7f", "80", "81", "82", "83", "84", "85", "86", "87", "88", "89", "8a", "8b", "8c", "8d", "8e", "8f", "90", "91", "92", "93", "94", "95", "96", "97", "98", "99", "9a", "9b", "9c", "9d", "9e", "9f", "a0", "a1", "a2", "a3", "a4", "a5", "a6", "a7", "a8", "a9", "aa", "ab", "ac", "ad", "ae", "af", "b0", "b1", "b2", "b3", "b4", "b5", "b6", "b7", "b8", "b9", "ba", "bb", "bc", "bd", "be", "bf", "c0", "c1", "c2", "c3", "c4", "c5", "c6", "c7", "c8", "c9", "ca", "cb", "cc", "cd", "ce", "cf", "d0", "d1", "d2", "d3", "d4", "d5", "d6", "d7", "d8", "d9", "da", "db", "dc", "dd", "de", "df", "e0", "e1", "e2", "e3", "e4", "e5", "e6", "e7", "e8", "e9", "ea", "eb", "ec", "ed", "ee", "ef", "f0", "f1", "f2", "f3", "f4", "f5", "f6", "f7", "f8", "f9", "fa", "fb", "fc", "fd", "fe", "ff"], mf = Math.PI / 180, Xu = 180 / Math.PI;
function qa() {
  const t = Math.random() * 4294967295 | 0, e = Math.random() * 4294967295 | 0, n = Math.random() * 4294967295 | 0, i = Math.random() * 4294967295 | 0;
  return (Zt[t & 255] + Zt[t >> 8 & 255] + Zt[t >> 16 & 255] + Zt[t >> 24 & 255] + "-" + Zt[e & 255] + Zt[e >> 8 & 255] + "-" + Zt[e >> 16 & 15 | 64] + Zt[e >> 24 & 255] + "-" + Zt[n & 63 | 128] + Zt[n >> 8 & 255] + "-" + Zt[n >> 16 & 255] + Zt[n >> 24 & 255] + Zt[i & 255] + Zt[i >> 8 & 255] + Zt[i >> 16 & 255] + Zt[i >> 24 & 255]).toLowerCase();
}
function xn(t, e, n) {
  return Math.max(e, Math.min(n, t));
}
function nw(t, e) {
  return (t % e + e) % e;
}
function gf(t, e, n) {
  return (1 - n) * t + n * e;
}
function jo(t, e) {
  switch (e.constructor) {
    case Float32Array:
      return t;
    case Uint32Array:
      return t / 4294967295;
    case Uint16Array:
      return t / 65535;
    case Uint8Array:
      return t / 255;
    case Int32Array:
      return Math.max(t / 2147483647, -1);
    case Int16Array:
      return Math.max(t / 32767, -1);
    case Int8Array:
      return Math.max(t / 127, -1);
    default:
      throw new Error("Invalid component type.");
  }
}
function mn(t, e) {
  switch (e.constructor) {
    case Float32Array:
      return t;
    case Uint32Array:
      return Math.round(t * 4294967295);
    case Uint16Array:
      return Math.round(t * 65535);
    case Uint8Array:
      return Math.round(t * 255);
    case Int32Array:
      return Math.round(t * 2147483647);
    case Int16Array:
      return Math.round(t * 32767);
    case Int8Array:
      return Math.round(t * 127);
    default:
      throw new Error("Invalid component type.");
  }
}
class Ie {
  constructor(e = 0, n = 0) {
    Ie.prototype.isVector2 = !0, this.x = e, this.y = n;
  }
  get width() {
    return this.x;
  }
  set width(e) {
    this.x = e;
  }
  get height() {
    return this.y;
  }
  set height(e) {
    this.y = e;
  }
  set(e, n) {
    return this.x = e, this.y = n, this;
  }
  setScalar(e) {
    return this.x = e, this.y = e, this;
  }
  setX(e) {
    return this.x = e, this;
  }
  setY(e) {
    return this.y = e, this;
  }
  setComponent(e, n) {
    switch (e) {
      case 0:
        this.x = n;
        break;
      case 1:
        this.y = n;
        break;
      default:
        throw new Error("index is out of range: " + e);
    }
    return this;
  }
  getComponent(e) {
    switch (e) {
      case 0:
        return this.x;
      case 1:
        return this.y;
      default:
        throw new Error("index is out of range: " + e);
    }
  }
  clone() {
    return new this.constructor(this.x, this.y);
  }
  copy(e) {
    return this.x = e.x, this.y = e.y, this;
  }
  add(e) {
    return this.x += e.x, this.y += e.y, this;
  }
  addScalar(e) {
    return this.x += e, this.y += e, this;
  }
  addVectors(e, n) {
    return this.x = e.x + n.x, this.y = e.y + n.y, this;
  }
  addScaledVector(e, n) {
    return this.x += e.x * n, this.y += e.y * n, this;
  }
  sub(e) {
    return this.x -= e.x, this.y -= e.y, this;
  }
  subScalar(e) {
    return this.x -= e, this.y -= e, this;
  }
  subVectors(e, n) {
    return this.x = e.x - n.x, this.y = e.y - n.y, this;
  }
  multiply(e) {
    return this.x *= e.x, this.y *= e.y, this;
  }
  multiplyScalar(e) {
    return this.x *= e, this.y *= e, this;
  }
  divide(e) {
    return this.x /= e.x, this.y /= e.y, this;
  }
  divideScalar(e) {
    return this.multiplyScalar(1 / e);
  }
  applyMatrix3(e) {
    const n = this.x, i = this.y, r = e.elements;
    return this.x = r[0] * n + r[3] * i + r[6], this.y = r[1] * n + r[4] * i + r[7], this;
  }
  min(e) {
    return this.x = Math.min(this.x, e.x), this.y = Math.min(this.y, e.y), this;
  }
  max(e) {
    return this.x = Math.max(this.x, e.x), this.y = Math.max(this.y, e.y), this;
  }
  clamp(e, n) {
    return this.x = Math.max(e.x, Math.min(n.x, this.x)), this.y = Math.max(e.y, Math.min(n.y, this.y)), this;
  }
  clampScalar(e, n) {
    return this.x = Math.max(e, Math.min(n, this.x)), this.y = Math.max(e, Math.min(n, this.y)), this;
  }
  clampLength(e, n) {
    const i = this.length();
    return this.divideScalar(i || 1).multiplyScalar(Math.max(e, Math.min(n, i)));
  }
  floor() {
    return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this;
  }
  ceil() {
    return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this;
  }
  round() {
    return this.x = Math.round(this.x), this.y = Math.round(this.y), this;
  }
  roundToZero() {
    return this.x = Math.trunc(this.x), this.y = Math.trunc(this.y), this;
  }
  negate() {
    return this.x = -this.x, this.y = -this.y, this;
  }
  dot(e) {
    return this.x * e.x + this.y * e.y;
  }
  cross(e) {
    return this.x * e.y - this.y * e.x;
  }
  lengthSq() {
    return this.x * this.x + this.y * this.y;
  }
  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }
  manhattanLength() {
    return Math.abs(this.x) + Math.abs(this.y);
  }
  normalize() {
    return this.divideScalar(this.length() || 1);
  }
  angle() {
    return Math.atan2(-this.y, -this.x) + Math.PI;
  }
  angleTo(e) {
    const n = Math.sqrt(this.lengthSq() * e.lengthSq());
    if (n === 0) return Math.PI / 2;
    const i = this.dot(e) / n;
    return Math.acos(xn(i, -1, 1));
  }
  distanceTo(e) {
    return Math.sqrt(this.distanceToSquared(e));
  }
  distanceToSquared(e) {
    const n = this.x - e.x, i = this.y - e.y;
    return n * n + i * i;
  }
  manhattanDistanceTo(e) {
    return Math.abs(this.x - e.x) + Math.abs(this.y - e.y);
  }
  setLength(e) {
    return this.normalize().multiplyScalar(e);
  }
  lerp(e, n) {
    return this.x += (e.x - this.x) * n, this.y += (e.y - this.y) * n, this;
  }
  lerpVectors(e, n, i) {
    return this.x = e.x + (n.x - e.x) * i, this.y = e.y + (n.y - e.y) * i, this;
  }
  equals(e) {
    return e.x === this.x && e.y === this.y;
  }
  fromArray(e, n = 0) {
    return this.x = e[n], this.y = e[n + 1], this;
  }
  toArray(e = [], n = 0) {
    return e[n] = this.x, e[n + 1] = this.y, e;
  }
  fromBufferAttribute(e, n) {
    return this.x = e.getX(n), this.y = e.getY(n), this;
  }
  rotateAround(e, n) {
    const i = Math.cos(n), r = Math.sin(n), s = this.x - e.x, o = this.y - e.y;
    return this.x = s * i - o * r + e.x, this.y = s * r + o * i + e.y, this;
  }
  random() {
    return this.x = Math.random(), this.y = Math.random(), this;
  }
  *[Symbol.iterator]() {
    yield this.x, yield this.y;
  }
}
class Oe {
  constructor(e, n, i, r, s, o, a, l, u) {
    Oe.prototype.isMatrix3 = !0, this.elements = [
      1,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      1
    ], e !== void 0 && this.set(e, n, i, r, s, o, a, l, u);
  }
  set(e, n, i, r, s, o, a, l, u) {
    const c = this.elements;
    return c[0] = e, c[1] = r, c[2] = a, c[3] = n, c[4] = s, c[5] = l, c[6] = i, c[7] = o, c[8] = u, this;
  }
  identity() {
    return this.set(
      1,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      1
    ), this;
  }
  copy(e) {
    const n = this.elements, i = e.elements;
    return n[0] = i[0], n[1] = i[1], n[2] = i[2], n[3] = i[3], n[4] = i[4], n[5] = i[5], n[6] = i[6], n[7] = i[7], n[8] = i[8], this;
  }
  extractBasis(e, n, i) {
    return e.setFromMatrix3Column(this, 0), n.setFromMatrix3Column(this, 1), i.setFromMatrix3Column(this, 2), this;
  }
  setFromMatrix4(e) {
    const n = e.elements;
    return this.set(
      n[0],
      n[4],
      n[8],
      n[1],
      n[5],
      n[9],
      n[2],
      n[6],
      n[10]
    ), this;
  }
  multiply(e) {
    return this.multiplyMatrices(this, e);
  }
  premultiply(e) {
    return this.multiplyMatrices(e, this);
  }
  multiplyMatrices(e, n) {
    const i = e.elements, r = n.elements, s = this.elements, o = i[0], a = i[3], l = i[6], u = i[1], c = i[4], d = i[7], h = i[2], p = i[5], _ = i[8], y = r[0], m = r[3], f = r[6], v = r[1], g = r[4], M = r[7], b = r[2], A = r[5], T = r[8];
    return s[0] = o * y + a * v + l * b, s[3] = o * m + a * g + l * A, s[6] = o * f + a * M + l * T, s[1] = u * y + c * v + d * b, s[4] = u * m + c * g + d * A, s[7] = u * f + c * M + d * T, s[2] = h * y + p * v + _ * b, s[5] = h * m + p * g + _ * A, s[8] = h * f + p * M + _ * T, this;
  }
  multiplyScalar(e) {
    const n = this.elements;
    return n[0] *= e, n[3] *= e, n[6] *= e, n[1] *= e, n[4] *= e, n[7] *= e, n[2] *= e, n[5] *= e, n[8] *= e, this;
  }
  determinant() {
    const e = this.elements, n = e[0], i = e[1], r = e[2], s = e[3], o = e[4], a = e[5], l = e[6], u = e[7], c = e[8];
    return n * o * c - n * a * u - i * s * c + i * a * l + r * s * u - r * o * l;
  }
  invert() {
    const e = this.elements, n = e[0], i = e[1], r = e[2], s = e[3], o = e[4], a = e[5], l = e[6], u = e[7], c = e[8], d = c * o - a * u, h = a * l - c * s, p = u * s - o * l, _ = n * d + i * h + r * p;
    if (_ === 0) return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0);
    const y = 1 / _;
    return e[0] = d * y, e[1] = (r * u - c * i) * y, e[2] = (a * i - r * o) * y, e[3] = h * y, e[4] = (c * n - r * l) * y, e[5] = (r * s - a * n) * y, e[6] = p * y, e[7] = (i * l - u * n) * y, e[8] = (o * n - i * s) * y, this;
  }
  transpose() {
    let e;
    const n = this.elements;
    return e = n[1], n[1] = n[3], n[3] = e, e = n[2], n[2] = n[6], n[6] = e, e = n[5], n[5] = n[7], n[7] = e, this;
  }
  getNormalMatrix(e) {
    return this.setFromMatrix4(e).invert().transpose();
  }
  transposeIntoArray(e) {
    const n = this.elements;
    return e[0] = n[0], e[1] = n[3], e[2] = n[6], e[3] = n[1], e[4] = n[4], e[5] = n[7], e[6] = n[2], e[7] = n[5], e[8] = n[8], this;
  }
  setUvTransform(e, n, i, r, s, o, a) {
    const l = Math.cos(s), u = Math.sin(s);
    return this.set(
      i * l,
      i * u,
      -i * (l * o + u * a) + o + e,
      -r * u,
      r * l,
      -r * (-u * o + l * a) + a + n,
      0,
      0,
      1
    ), this;
  }
  //
  scale(e, n) {
    return this.premultiply(vf.makeScale(e, n)), this;
  }
  rotate(e) {
    return this.premultiply(vf.makeRotation(-e)), this;
  }
  translate(e, n) {
    return this.premultiply(vf.makeTranslation(e, n)), this;
  }
  // for 2D Transforms
  makeTranslation(e, n) {
    return e.isVector2 ? this.set(
      1,
      0,
      e.x,
      0,
      1,
      e.y,
      0,
      0,
      1
    ) : this.set(
      1,
      0,
      e,
      0,
      1,
      n,
      0,
      0,
      1
    ), this;
  }
  makeRotation(e) {
    const n = Math.cos(e), i = Math.sin(e);
    return this.set(
      n,
      -i,
      0,
      i,
      n,
      0,
      0,
      0,
      1
    ), this;
  }
  makeScale(e, n) {
    return this.set(
      e,
      0,
      0,
      0,
      n,
      0,
      0,
      0,
      1
    ), this;
  }
  //
  equals(e) {
    const n = this.elements, i = e.elements;
    for (let r = 0; r < 9; r++)
      if (n[r] !== i[r]) return !1;
    return !0;
  }
  fromArray(e, n = 0) {
    for (let i = 0; i < 9; i++)
      this.elements[i] = e[i + n];
    return this;
  }
  toArray(e = [], n = 0) {
    const i = this.elements;
    return e[n] = i[0], e[n + 1] = i[1], e[n + 2] = i[2], e[n + 3] = i[3], e[n + 4] = i[4], e[n + 5] = i[5], e[n + 6] = i[6], e[n + 7] = i[7], e[n + 8] = i[8], e;
  }
  clone() {
    return new this.constructor().fromArray(this.elements);
  }
}
const vf = /* @__PURE__ */ new Oe();
function _y(t) {
  for (let e = t.length - 1; e >= 0; --e)
    if (t[e] >= 65535) return !0;
  return !1;
}
function Yu(t) {
  return document.createElementNS("http://www.w3.org/1999/xhtml", t);
}
function iw() {
  const t = Yu("canvas");
  return t.style.display = "block", t;
}
const Xg = {};
function au(t) {
  t in Xg || (Xg[t] = !0, console.warn(t));
}
function rw(t, e, n) {
  return new Promise(function(i, r) {
    function s() {
      switch (t.clientWaitSync(e, t.SYNC_FLUSH_COMMANDS_BIT, 0)) {
        case t.WAIT_FAILED:
          r();
          break;
        case t.TIMEOUT_EXPIRED:
          setTimeout(s, n);
          break;
        default:
          i();
      }
    }
    setTimeout(s, n);
  });
}
function sw(t) {
  const e = t.elements;
  e[2] = 0.5 * e[2] + 0.5 * e[3], e[6] = 0.5 * e[6] + 0.5 * e[7], e[10] = 0.5 * e[10] + 0.5 * e[11], e[14] = 0.5 * e[14] + 0.5 * e[15];
}
function ow(t) {
  const e = t.elements;
  e[11] === -1 ? (e[10] = -e[10] - 1, e[14] = -e[14]) : (e[10] = -e[10], e[14] = -e[14] + 1);
}
const Yg = /* @__PURE__ */ new Oe().set(
  0.8224621,
  0.177538,
  0,
  0.0331941,
  0.9668058,
  0,
  0.0170827,
  0.0723974,
  0.9105199
), qg = /* @__PURE__ */ new Oe().set(
  1.2249401,
  -0.2249404,
  0,
  -0.0420569,
  1.0420571,
  0,
  -0.0196376,
  -0.0786361,
  1.0982735
), Xo = {
  [Br]: {
    transfer: Gu,
    primaries: Wu,
    luminanceCoefficients: [0.2126, 0.7152, 0.0722],
    toReference: (t) => t,
    fromReference: (t) => t
  },
  [rn]: {
    transfer: ot,
    primaries: Wu,
    luminanceCoefficients: [0.2126, 0.7152, 0.0722],
    toReference: (t) => t.convertSRGBToLinear(),
    fromReference: (t) => t.convertLinearToSRGB()
  },
  [Ec]: {
    transfer: Gu,
    primaries: $u,
    luminanceCoefficients: [0.2289, 0.6917, 0.0793],
    toReference: (t) => t.applyMatrix3(qg),
    fromReference: (t) => t.applyMatrix3(Yg)
  },
  [qp]: {
    transfer: ot,
    primaries: $u,
    luminanceCoefficients: [0.2289, 0.6917, 0.0793],
    toReference: (t) => t.convertSRGBToLinear().applyMatrix3(qg),
    fromReference: (t) => t.applyMatrix3(Yg).convertLinearToSRGB()
  }
}, aw = /* @__PURE__ */ new Set([Br, Ec]), Je = {
  enabled: !0,
  _workingColorSpace: Br,
  get workingColorSpace() {
    return this._workingColorSpace;
  },
  set workingColorSpace(t) {
    if (!aw.has(t))
      throw new Error(`Unsupported working color space, "${t}".`);
    this._workingColorSpace = t;
  },
  convert: function(t, e, n) {
    if (this.enabled === !1 || e === n || !e || !n)
      return t;
    const i = Xo[e].toReference, r = Xo[n].fromReference;
    return r(i(t));
  },
  fromWorkingColorSpace: function(t, e) {
    return this.convert(t, this._workingColorSpace, e);
  },
  toWorkingColorSpace: function(t, e) {
    return this.convert(t, e, this._workingColorSpace);
  },
  getPrimaries: function(t) {
    return Xo[t].primaries;
  },
  getTransfer: function(t) {
    return t === xr ? Gu : Xo[t].transfer;
  },
  getLuminanceCoefficients: function(t, e = this._workingColorSpace) {
    return t.fromArray(Xo[e].luminanceCoefficients);
  }
};
function ao(t) {
  return t < 0.04045 ? t * 0.0773993808 : Math.pow(t * 0.9478672986 + 0.0521327014, 2.4);
}
function _f(t) {
  return t < 31308e-7 ? t * 12.92 : 1.055 * Math.pow(t, 0.41666) - 0.055;
}
let ws;
class lw {
  static getDataURL(e) {
    if (/^data:/i.test(e.src) || typeof HTMLCanvasElement > "u")
      return e.src;
    let n;
    if (e instanceof HTMLCanvasElement)
      n = e;
    else {
      ws === void 0 && (ws = Yu("canvas")), ws.width = e.width, ws.height = e.height;
      const i = ws.getContext("2d");
      e instanceof ImageData ? i.putImageData(e, 0, 0) : i.drawImage(e, 0, 0, e.width, e.height), n = ws;
    }
    return n.width > 2048 || n.height > 2048 ? (console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons", e), n.toDataURL("image/jpeg", 0.6)) : n.toDataURL("image/png");
  }
  static sRGBToLinear(e) {
    if (typeof HTMLImageElement < "u" && e instanceof HTMLImageElement || typeof HTMLCanvasElement < "u" && e instanceof HTMLCanvasElement || typeof ImageBitmap < "u" && e instanceof ImageBitmap) {
      const n = Yu("canvas");
      n.width = e.width, n.height = e.height;
      const i = n.getContext("2d");
      i.drawImage(e, 0, 0, e.width, e.height);
      const r = i.getImageData(0, 0, e.width, e.height), s = r.data;
      for (let o = 0; o < s.length; o++)
        s[o] = ao(s[o] / 255) * 255;
      return i.putImageData(r, 0, 0), n;
    } else if (e.data) {
      const n = e.data.slice(0);
      for (let i = 0; i < n.length; i++)
        n instanceof Uint8Array || n instanceof Uint8ClampedArray ? n[i] = Math.floor(ao(n[i] / 255) * 255) : n[i] = ao(n[i]);
      return {
        data: n,
        width: e.width,
        height: e.height
      };
    } else
      return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."), e;
  }
}
let uw = 0;
class xy {
  constructor(e = null) {
    this.isSource = !0, Object.defineProperty(this, "id", { value: uw++ }), this.uuid = qa(), this.data = e, this.dataReady = !0, this.version = 0;
  }
  set needsUpdate(e) {
    e === !0 && this.version++;
  }
  toJSON(e) {
    const n = e === void 0 || typeof e == "string";
    if (!n && e.images[this.uuid] !== void 0)
      return e.images[this.uuid];
    const i = {
      uuid: this.uuid,
      url: ""
    }, r = this.data;
    if (r !== null) {
      let s;
      if (Array.isArray(r)) {
        s = [];
        for (let o = 0, a = r.length; o < a; o++)
          r[o].isDataTexture ? s.push(xf(r[o].image)) : s.push(xf(r[o]));
      } else
        s = xf(r);
      i.url = s;
    }
    return n || (e.images[this.uuid] = i), i;
  }
}
function xf(t) {
  return typeof HTMLImageElement < "u" && t instanceof HTMLImageElement || typeof HTMLCanvasElement < "u" && t instanceof HTMLCanvasElement || typeof ImageBitmap < "u" && t instanceof ImageBitmap ? lw.getDataURL(t) : t.data ? {
    data: Array.from(t.data),
    width: t.width,
    height: t.height,
    type: t.data.constructor.name
  } : (console.warn("THREE.Texture: Unable to serialize Texture."), {});
}
let cw = 0;
class ln extends Po {
  constructor(e = ln.DEFAULT_IMAGE, n = ln.DEFAULT_MAPPING, i = os, r = os, s = ci, o = as, a = di, l = Ji, u = ln.DEFAULT_ANISOTROPY, c = xr) {
    super(), this.isTexture = !0, Object.defineProperty(this, "id", { value: cw++ }), this.uuid = qa(), this.name = "", this.source = new xy(e), this.mipmaps = [], this.mapping = n, this.channel = 0, this.wrapS = i, this.wrapT = r, this.magFilter = s, this.minFilter = o, this.anisotropy = u, this.format = a, this.internalFormat = null, this.type = l, this.offset = new Ie(0, 0), this.repeat = new Ie(1, 1), this.center = new Ie(0, 0), this.rotation = 0, this.matrixAutoUpdate = !0, this.matrix = new Oe(), this.generateMipmaps = !0, this.premultiplyAlpha = !1, this.flipY = !0, this.unpackAlignment = 4, this.colorSpace = c, this.userData = {}, this.version = 0, this.onUpdate = null, this.isRenderTargetTexture = !1, this.pmremVersion = 0;
  }
  get image() {
    return this.source.data;
  }
  set image(e = null) {
    this.source.data = e;
  }
  updateMatrix() {
    this.matrix.setUvTransform(this.offset.x, this.offset.y, this.repeat.x, this.repeat.y, this.rotation, this.center.x, this.center.y);
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(e) {
    return this.name = e.name, this.source = e.source, this.mipmaps = e.mipmaps.slice(0), this.mapping = e.mapping, this.channel = e.channel, this.wrapS = e.wrapS, this.wrapT = e.wrapT, this.magFilter = e.magFilter, this.minFilter = e.minFilter, this.anisotropy = e.anisotropy, this.format = e.format, this.internalFormat = e.internalFormat, this.type = e.type, this.offset.copy(e.offset), this.repeat.copy(e.repeat), this.center.copy(e.center), this.rotation = e.rotation, this.matrixAutoUpdate = e.matrixAutoUpdate, this.matrix.copy(e.matrix), this.generateMipmaps = e.generateMipmaps, this.premultiplyAlpha = e.premultiplyAlpha, this.flipY = e.flipY, this.unpackAlignment = e.unpackAlignment, this.colorSpace = e.colorSpace, this.userData = JSON.parse(JSON.stringify(e.userData)), this.needsUpdate = !0, this;
  }
  toJSON(e) {
    const n = e === void 0 || typeof e == "string";
    if (!n && e.textures[this.uuid] !== void 0)
      return e.textures[this.uuid];
    const i = {
      metadata: {
        version: 4.6,
        type: "Texture",
        generator: "Texture.toJSON"
      },
      uuid: this.uuid,
      name: this.name,
      image: this.source.toJSON(e).uuid,
      mapping: this.mapping,
      channel: this.channel,
      repeat: [this.repeat.x, this.repeat.y],
      offset: [this.offset.x, this.offset.y],
      center: [this.center.x, this.center.y],
      rotation: this.rotation,
      wrap: [this.wrapS, this.wrapT],
      format: this.format,
      internalFormat: this.internalFormat,
      type: this.type,
      colorSpace: this.colorSpace,
      minFilter: this.minFilter,
      magFilter: this.magFilter,
      anisotropy: this.anisotropy,
      flipY: this.flipY,
      generateMipmaps: this.generateMipmaps,
      premultiplyAlpha: this.premultiplyAlpha,
      unpackAlignment: this.unpackAlignment
    };
    return Object.keys(this.userData).length > 0 && (i.userData = this.userData), n || (e.textures[this.uuid] = i), i;
  }
  dispose() {
    this.dispatchEvent({ type: "dispose" });
  }
  transformUv(e) {
    if (this.mapping !== sy) return e;
    if (e.applyMatrix3(this.matrix), e.x < 0 || e.x > 1)
      switch (this.wrapS) {
        case xo:
          e.x = e.x - Math.floor(e.x);
          break;
        case os:
          e.x = e.x < 0 ? 0 : 1;
          break;
        case oh:
          Math.abs(Math.floor(e.x) % 2) === 1 ? e.x = Math.ceil(e.x) - e.x : e.x = e.x - Math.floor(e.x);
          break;
      }
    if (e.y < 0 || e.y > 1)
      switch (this.wrapT) {
        case xo:
          e.y = e.y - Math.floor(e.y);
          break;
        case os:
          e.y = e.y < 0 ? 0 : 1;
          break;
        case oh:
          Math.abs(Math.floor(e.y) % 2) === 1 ? e.y = Math.ceil(e.y) - e.y : e.y = e.y - Math.floor(e.y);
          break;
      }
    return this.flipY && (e.y = 1 - e.y), e;
  }
  set needsUpdate(e) {
    e === !0 && (this.version++, this.source.needsUpdate = !0);
  }
  set needsPMREMUpdate(e) {
    e === !0 && this.pmremVersion++;
  }
}
ln.DEFAULT_IMAGE = null;
ln.DEFAULT_MAPPING = sy;
ln.DEFAULT_ANISOTROPY = 1;
class St {
  constructor(e = 0, n = 0, i = 0, r = 1) {
    St.prototype.isVector4 = !0, this.x = e, this.y = n, this.z = i, this.w = r;
  }
  get width() {
    return this.z;
  }
  set width(e) {
    this.z = e;
  }
  get height() {
    return this.w;
  }
  set height(e) {
    this.w = e;
  }
  set(e, n, i, r) {
    return this.x = e, this.y = n, this.z = i, this.w = r, this;
  }
  setScalar(e) {
    return this.x = e, this.y = e, this.z = e, this.w = e, this;
  }
  setX(e) {
    return this.x = e, this;
  }
  setY(e) {
    return this.y = e, this;
  }
  setZ(e) {
    return this.z = e, this;
  }
  setW(e) {
    return this.w = e, this;
  }
  setComponent(e, n) {
    switch (e) {
      case 0:
        this.x = n;
        break;
      case 1:
        this.y = n;
        break;
      case 2:
        this.z = n;
        break;
      case 3:
        this.w = n;
        break;
      default:
        throw new Error("index is out of range: " + e);
    }
    return this;
  }
  getComponent(e) {
    switch (e) {
      case 0:
        return this.x;
      case 1:
        return this.y;
      case 2:
        return this.z;
      case 3:
        return this.w;
      default:
        throw new Error("index is out of range: " + e);
    }
  }
  clone() {
    return new this.constructor(this.x, this.y, this.z, this.w);
  }
  copy(e) {
    return this.x = e.x, this.y = e.y, this.z = e.z, this.w = e.w !== void 0 ? e.w : 1, this;
  }
  add(e) {
    return this.x += e.x, this.y += e.y, this.z += e.z, this.w += e.w, this;
  }
  addScalar(e) {
    return this.x += e, this.y += e, this.z += e, this.w += e, this;
  }
  addVectors(e, n) {
    return this.x = e.x + n.x, this.y = e.y + n.y, this.z = e.z + n.z, this.w = e.w + n.w, this;
  }
  addScaledVector(e, n) {
    return this.x += e.x * n, this.y += e.y * n, this.z += e.z * n, this.w += e.w * n, this;
  }
  sub(e) {
    return this.x -= e.x, this.y -= e.y, this.z -= e.z, this.w -= e.w, this;
  }
  subScalar(e) {
    return this.x -= e, this.y -= e, this.z -= e, this.w -= e, this;
  }
  subVectors(e, n) {
    return this.x = e.x - n.x, this.y = e.y - n.y, this.z = e.z - n.z, this.w = e.w - n.w, this;
  }
  multiply(e) {
    return this.x *= e.x, this.y *= e.y, this.z *= e.z, this.w *= e.w, this;
  }
  multiplyScalar(e) {
    return this.x *= e, this.y *= e, this.z *= e, this.w *= e, this;
  }
  applyMatrix4(e) {
    const n = this.x, i = this.y, r = this.z, s = this.w, o = e.elements;
    return this.x = o[0] * n + o[4] * i + o[8] * r + o[12] * s, this.y = o[1] * n + o[5] * i + o[9] * r + o[13] * s, this.z = o[2] * n + o[6] * i + o[10] * r + o[14] * s, this.w = o[3] * n + o[7] * i + o[11] * r + o[15] * s, this;
  }
  divideScalar(e) {
    return this.multiplyScalar(1 / e);
  }
  setAxisAngleFromQuaternion(e) {
    this.w = 2 * Math.acos(e.w);
    const n = Math.sqrt(1 - e.w * e.w);
    return n < 1e-4 ? (this.x = 1, this.y = 0, this.z = 0) : (this.x = e.x / n, this.y = e.y / n, this.z = e.z / n), this;
  }
  setAxisAngleFromRotationMatrix(e) {
    let n, i, r, s;
    const l = e.elements, u = l[0], c = l[4], d = l[8], h = l[1], p = l[5], _ = l[9], y = l[2], m = l[6], f = l[10];
    if (Math.abs(c - h) < 0.01 && Math.abs(d - y) < 0.01 && Math.abs(_ - m) < 0.01) {
      if (Math.abs(c + h) < 0.1 && Math.abs(d + y) < 0.1 && Math.abs(_ + m) < 0.1 && Math.abs(u + p + f - 3) < 0.1)
        return this.set(1, 0, 0, 0), this;
      n = Math.PI;
      const g = (u + 1) / 2, M = (p + 1) / 2, b = (f + 1) / 2, A = (c + h) / 4, T = (d + y) / 4, R = (_ + m) / 4;
      return g > M && g > b ? g < 0.01 ? (i = 0, r = 0.707106781, s = 0.707106781) : (i = Math.sqrt(g), r = A / i, s = T / i) : M > b ? M < 0.01 ? (i = 0.707106781, r = 0, s = 0.707106781) : (r = Math.sqrt(M), i = A / r, s = R / r) : b < 0.01 ? (i = 0.707106781, r = 0.707106781, s = 0) : (s = Math.sqrt(b), i = T / s, r = R / s), this.set(i, r, s, n), this;
    }
    let v = Math.sqrt((m - _) * (m - _) + (d - y) * (d - y) + (h - c) * (h - c));
    return Math.abs(v) < 1e-3 && (v = 1), this.x = (m - _) / v, this.y = (d - y) / v, this.z = (h - c) / v, this.w = Math.acos((u + p + f - 1) / 2), this;
  }
  setFromMatrixPosition(e) {
    const n = e.elements;
    return this.x = n[12], this.y = n[13], this.z = n[14], this.w = n[15], this;
  }
  min(e) {
    return this.x = Math.min(this.x, e.x), this.y = Math.min(this.y, e.y), this.z = Math.min(this.z, e.z), this.w = Math.min(this.w, e.w), this;
  }
  max(e) {
    return this.x = Math.max(this.x, e.x), this.y = Math.max(this.y, e.y), this.z = Math.max(this.z, e.z), this.w = Math.max(this.w, e.w), this;
  }
  clamp(e, n) {
    return this.x = Math.max(e.x, Math.min(n.x, this.x)), this.y = Math.max(e.y, Math.min(n.y, this.y)), this.z = Math.max(e.z, Math.min(n.z, this.z)), this.w = Math.max(e.w, Math.min(n.w, this.w)), this;
  }
  clampScalar(e, n) {
    return this.x = Math.max(e, Math.min(n, this.x)), this.y = Math.max(e, Math.min(n, this.y)), this.z = Math.max(e, Math.min(n, this.z)), this.w = Math.max(e, Math.min(n, this.w)), this;
  }
  clampLength(e, n) {
    const i = this.length();
    return this.divideScalar(i || 1).multiplyScalar(Math.max(e, Math.min(n, i)));
  }
  floor() {
    return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this.z = Math.floor(this.z), this.w = Math.floor(this.w), this;
  }
  ceil() {
    return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this.z = Math.ceil(this.z), this.w = Math.ceil(this.w), this;
  }
  round() {
    return this.x = Math.round(this.x), this.y = Math.round(this.y), this.z = Math.round(this.z), this.w = Math.round(this.w), this;
  }
  roundToZero() {
    return this.x = Math.trunc(this.x), this.y = Math.trunc(this.y), this.z = Math.trunc(this.z), this.w = Math.trunc(this.w), this;
  }
  negate() {
    return this.x = -this.x, this.y = -this.y, this.z = -this.z, this.w = -this.w, this;
  }
  dot(e) {
    return this.x * e.x + this.y * e.y + this.z * e.z + this.w * e.w;
  }
  lengthSq() {
    return this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w;
  }
  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);
  }
  manhattanLength() {
    return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z) + Math.abs(this.w);
  }
  normalize() {
    return this.divideScalar(this.length() || 1);
  }
  setLength(e) {
    return this.normalize().multiplyScalar(e);
  }
  lerp(e, n) {
    return this.x += (e.x - this.x) * n, this.y += (e.y - this.y) * n, this.z += (e.z - this.z) * n, this.w += (e.w - this.w) * n, this;
  }
  lerpVectors(e, n, i) {
    return this.x = e.x + (n.x - e.x) * i, this.y = e.y + (n.y - e.y) * i, this.z = e.z + (n.z - e.z) * i, this.w = e.w + (n.w - e.w) * i, this;
  }
  equals(e) {
    return e.x === this.x && e.y === this.y && e.z === this.z && e.w === this.w;
  }
  fromArray(e, n = 0) {
    return this.x = e[n], this.y = e[n + 1], this.z = e[n + 2], this.w = e[n + 3], this;
  }
  toArray(e = [], n = 0) {
    return e[n] = this.x, e[n + 1] = this.y, e[n + 2] = this.z, e[n + 3] = this.w, e;
  }
  fromBufferAttribute(e, n) {
    return this.x = e.getX(n), this.y = e.getY(n), this.z = e.getZ(n), this.w = e.getW(n), this;
  }
  random() {
    return this.x = Math.random(), this.y = Math.random(), this.z = Math.random(), this.w = Math.random(), this;
  }
  *[Symbol.iterator]() {
    yield this.x, yield this.y, yield this.z, yield this.w;
  }
}
class fw extends Po {
  constructor(e = 1, n = 1, i = {}) {
    super(), this.isRenderTarget = !0, this.width = e, this.height = n, this.depth = 1, this.scissor = new St(0, 0, e, n), this.scissorTest = !1, this.viewport = new St(0, 0, e, n);
    const r = { width: e, height: n, depth: 1 };
    i = Object.assign({
      generateMipmaps: !1,
      internalFormat: null,
      minFilter: ci,
      depthBuffer: !0,
      stencilBuffer: !1,
      resolveDepthBuffer: !0,
      resolveStencilBuffer: !0,
      depthTexture: null,
      samples: 0,
      count: 1
    }, i);
    const s = new ln(r, i.mapping, i.wrapS, i.wrapT, i.magFilter, i.minFilter, i.format, i.type, i.anisotropy, i.colorSpace);
    s.flipY = !1, s.generateMipmaps = i.generateMipmaps, s.internalFormat = i.internalFormat, this.textures = [];
    const o = i.count;
    for (let a = 0; a < o; a++)
      this.textures[a] = s.clone(), this.textures[a].isRenderTargetTexture = !0;
    this.depthBuffer = i.depthBuffer, this.stencilBuffer = i.stencilBuffer, this.resolveDepthBuffer = i.resolveDepthBuffer, this.resolveStencilBuffer = i.resolveStencilBuffer, this.depthTexture = i.depthTexture, this.samples = i.samples;
  }
  get texture() {
    return this.textures[0];
  }
  set texture(e) {
    this.textures[0] = e;
  }
  setSize(e, n, i = 1) {
    if (this.width !== e || this.height !== n || this.depth !== i) {
      this.width = e, this.height = n, this.depth = i;
      for (let r = 0, s = this.textures.length; r < s; r++)
        this.textures[r].image.width = e, this.textures[r].image.height = n, this.textures[r].image.depth = i;
      this.dispose();
    }
    this.viewport.set(0, 0, e, n), this.scissor.set(0, 0, e, n);
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(e) {
    this.width = e.width, this.height = e.height, this.depth = e.depth, this.scissor.copy(e.scissor), this.scissorTest = e.scissorTest, this.viewport.copy(e.viewport), this.textures.length = 0;
    for (let i = 0, r = e.textures.length; i < r; i++)
      this.textures[i] = e.textures[i].clone(), this.textures[i].isRenderTargetTexture = !0;
    const n = Object.assign({}, e.texture.image);
    return this.texture.source = new xy(n), this.depthBuffer = e.depthBuffer, this.stencilBuffer = e.stencilBuffer, this.resolveDepthBuffer = e.resolveDepthBuffer, this.resolveStencilBuffer = e.resolveStencilBuffer, e.depthTexture !== null && (this.depthTexture = e.depthTexture.clone()), this.samples = e.samples, this;
  }
  dispose() {
    this.dispatchEvent({ type: "dispose" });
  }
}
class mi extends fw {
  constructor(e = 1, n = 1, i = {}) {
    super(e, n, i), this.isWebGLRenderTarget = !0;
  }
}
class yy extends ln {
  constructor(e = null, n = 1, i = 1, r = 1) {
    super(null), this.isDataArrayTexture = !0, this.image = { data: e, width: n, height: i, depth: r }, this.magFilter = Zn, this.minFilter = Zn, this.wrapR = os, this.generateMipmaps = !1, this.flipY = !1, this.unpackAlignment = 1, this.layerUpdates = /* @__PURE__ */ new Set();
  }
  addLayerUpdate(e) {
    this.layerUpdates.add(e);
  }
  clearLayerUpdates() {
    this.layerUpdates.clear();
  }
}
class dw extends ln {
  constructor(e = null, n = 1, i = 1, r = 1) {
    super(null), this.isData3DTexture = !0, this.image = { data: e, width: n, height: i, depth: r }, this.magFilter = Zn, this.minFilter = Zn, this.wrapR = os, this.generateMipmaps = !1, this.flipY = !1, this.unpackAlignment = 1;
  }
}
class Ka {
  constructor(e = 0, n = 0, i = 0, r = 1) {
    this.isQuaternion = !0, this._x = e, this._y = n, this._z = i, this._w = r;
  }
  static slerpFlat(e, n, i, r, s, o, a) {
    let l = i[r + 0], u = i[r + 1], c = i[r + 2], d = i[r + 3];
    const h = s[o + 0], p = s[o + 1], _ = s[o + 2], y = s[o + 3];
    if (a === 0) {
      e[n + 0] = l, e[n + 1] = u, e[n + 2] = c, e[n + 3] = d;
      return;
    }
    if (a === 1) {
      e[n + 0] = h, e[n + 1] = p, e[n + 2] = _, e[n + 3] = y;
      return;
    }
    if (d !== y || l !== h || u !== p || c !== _) {
      let m = 1 - a;
      const f = l * h + u * p + c * _ + d * y, v = f >= 0 ? 1 : -1, g = 1 - f * f;
      if (g > Number.EPSILON) {
        const b = Math.sqrt(g), A = Math.atan2(b, f * v);
        m = Math.sin(m * A) / b, a = Math.sin(a * A) / b;
      }
      const M = a * v;
      if (l = l * m + h * M, u = u * m + p * M, c = c * m + _ * M, d = d * m + y * M, m === 1 - a) {
        const b = 1 / Math.sqrt(l * l + u * u + c * c + d * d);
        l *= b, u *= b, c *= b, d *= b;
      }
    }
    e[n] = l, e[n + 1] = u, e[n + 2] = c, e[n + 3] = d;
  }
  static multiplyQuaternionsFlat(e, n, i, r, s, o) {
    const a = i[r], l = i[r + 1], u = i[r + 2], c = i[r + 3], d = s[o], h = s[o + 1], p = s[o + 2], _ = s[o + 3];
    return e[n] = a * _ + c * d + l * p - u * h, e[n + 1] = l * _ + c * h + u * d - a * p, e[n + 2] = u * _ + c * p + a * h - l * d, e[n + 3] = c * _ - a * d - l * h - u * p, e;
  }
  get x() {
    return this._x;
  }
  set x(e) {
    this._x = e, this._onChangeCallback();
  }
  get y() {
    return this._y;
  }
  set y(e) {
    this._y = e, this._onChangeCallback();
  }
  get z() {
    return this._z;
  }
  set z(e) {
    this._z = e, this._onChangeCallback();
  }
  get w() {
    return this._w;
  }
  set w(e) {
    this._w = e, this._onChangeCallback();
  }
  set(e, n, i, r) {
    return this._x = e, this._y = n, this._z = i, this._w = r, this._onChangeCallback(), this;
  }
  clone() {
    return new this.constructor(this._x, this._y, this._z, this._w);
  }
  copy(e) {
    return this._x = e.x, this._y = e.y, this._z = e.z, this._w = e.w, this._onChangeCallback(), this;
  }
  setFromEuler(e, n = !0) {
    const i = e._x, r = e._y, s = e._z, o = e._order, a = Math.cos, l = Math.sin, u = a(i / 2), c = a(r / 2), d = a(s / 2), h = l(i / 2), p = l(r / 2), _ = l(s / 2);
    switch (o) {
      case "XYZ":
        this._x = h * c * d + u * p * _, this._y = u * p * d - h * c * _, this._z = u * c * _ + h * p * d, this._w = u * c * d - h * p * _;
        break;
      case "YXZ":
        this._x = h * c * d + u * p * _, this._y = u * p * d - h * c * _, this._z = u * c * _ - h * p * d, this._w = u * c * d + h * p * _;
        break;
      case "ZXY":
        this._x = h * c * d - u * p * _, this._y = u * p * d + h * c * _, this._z = u * c * _ + h * p * d, this._w = u * c * d - h * p * _;
        break;
      case "ZYX":
        this._x = h * c * d - u * p * _, this._y = u * p * d + h * c * _, this._z = u * c * _ - h * p * d, this._w = u * c * d + h * p * _;
        break;
      case "YZX":
        this._x = h * c * d + u * p * _, this._y = u * p * d + h * c * _, this._z = u * c * _ - h * p * d, this._w = u * c * d - h * p * _;
        break;
      case "XZY":
        this._x = h * c * d - u * p * _, this._y = u * p * d - h * c * _, this._z = u * c * _ + h * p * d, this._w = u * c * d + h * p * _;
        break;
      default:
        console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: " + o);
    }
    return n === !0 && this._onChangeCallback(), this;
  }
  setFromAxisAngle(e, n) {
    const i = n / 2, r = Math.sin(i);
    return this._x = e.x * r, this._y = e.y * r, this._z = e.z * r, this._w = Math.cos(i), this._onChangeCallback(), this;
  }
  setFromRotationMatrix(e) {
    const n = e.elements, i = n[0], r = n[4], s = n[8], o = n[1], a = n[5], l = n[9], u = n[2], c = n[6], d = n[10], h = i + a + d;
    if (h > 0) {
      const p = 0.5 / Math.sqrt(h + 1);
      this._w = 0.25 / p, this._x = (c - l) * p, this._y = (s - u) * p, this._z = (o - r) * p;
    } else if (i > a && i > d) {
      const p = 2 * Math.sqrt(1 + i - a - d);
      this._w = (c - l) / p, this._x = 0.25 * p, this._y = (r + o) / p, this._z = (s + u) / p;
    } else if (a > d) {
      const p = 2 * Math.sqrt(1 + a - i - d);
      this._w = (s - u) / p, this._x = (r + o) / p, this._y = 0.25 * p, this._z = (l + c) / p;
    } else {
      const p = 2 * Math.sqrt(1 + d - i - a);
      this._w = (o - r) / p, this._x = (s + u) / p, this._y = (l + c) / p, this._z = 0.25 * p;
    }
    return this._onChangeCallback(), this;
  }
  setFromUnitVectors(e, n) {
    let i = e.dot(n) + 1;
    return i < Number.EPSILON ? (i = 0, Math.abs(e.x) > Math.abs(e.z) ? (this._x = -e.y, this._y = e.x, this._z = 0, this._w = i) : (this._x = 0, this._y = -e.z, this._z = e.y, this._w = i)) : (this._x = e.y * n.z - e.z * n.y, this._y = e.z * n.x - e.x * n.z, this._z = e.x * n.y - e.y * n.x, this._w = i), this.normalize();
  }
  angleTo(e) {
    return 2 * Math.acos(Math.abs(xn(this.dot(e), -1, 1)));
  }
  rotateTowards(e, n) {
    const i = this.angleTo(e);
    if (i === 0) return this;
    const r = Math.min(1, n / i);
    return this.slerp(e, r), this;
  }
  identity() {
    return this.set(0, 0, 0, 1);
  }
  invert() {
    return this.conjugate();
  }
  conjugate() {
    return this._x *= -1, this._y *= -1, this._z *= -1, this._onChangeCallback(), this;
  }
  dot(e) {
    return this._x * e._x + this._y * e._y + this._z * e._z + this._w * e._w;
  }
  lengthSq() {
    return this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w;
  }
  length() {
    return Math.sqrt(this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w);
  }
  normalize() {
    let e = this.length();
    return e === 0 ? (this._x = 0, this._y = 0, this._z = 0, this._w = 1) : (e = 1 / e, this._x = this._x * e, this._y = this._y * e, this._z = this._z * e, this._w = this._w * e), this._onChangeCallback(), this;
  }
  multiply(e) {
    return this.multiplyQuaternions(this, e);
  }
  premultiply(e) {
    return this.multiplyQuaternions(e, this);
  }
  multiplyQuaternions(e, n) {
    const i = e._x, r = e._y, s = e._z, o = e._w, a = n._x, l = n._y, u = n._z, c = n._w;
    return this._x = i * c + o * a + r * u - s * l, this._y = r * c + o * l + s * a - i * u, this._z = s * c + o * u + i * l - r * a, this._w = o * c - i * a - r * l - s * u, this._onChangeCallback(), this;
  }
  slerp(e, n) {
    if (n === 0) return this;
    if (n === 1) return this.copy(e);
    const i = this._x, r = this._y, s = this._z, o = this._w;
    let a = o * e._w + i * e._x + r * e._y + s * e._z;
    if (a < 0 ? (this._w = -e._w, this._x = -e._x, this._y = -e._y, this._z = -e._z, a = -a) : this.copy(e), a >= 1)
      return this._w = o, this._x = i, this._y = r, this._z = s, this;
    const l = 1 - a * a;
    if (l <= Number.EPSILON) {
      const p = 1 - n;
      return this._w = p * o + n * this._w, this._x = p * i + n * this._x, this._y = p * r + n * this._y, this._z = p * s + n * this._z, this.normalize(), this;
    }
    const u = Math.sqrt(l), c = Math.atan2(u, a), d = Math.sin((1 - n) * c) / u, h = Math.sin(n * c) / u;
    return this._w = o * d + this._w * h, this._x = i * d + this._x * h, this._y = r * d + this._y * h, this._z = s * d + this._z * h, this._onChangeCallback(), this;
  }
  slerpQuaternions(e, n, i) {
    return this.copy(e).slerp(n, i);
  }
  random() {
    const e = 2 * Math.PI * Math.random(), n = 2 * Math.PI * Math.random(), i = Math.random(), r = Math.sqrt(1 - i), s = Math.sqrt(i);
    return this.set(
      r * Math.sin(e),
      r * Math.cos(e),
      s * Math.sin(n),
      s * Math.cos(n)
    );
  }
  equals(e) {
    return e._x === this._x && e._y === this._y && e._z === this._z && e._w === this._w;
  }
  fromArray(e, n = 0) {
    return this._x = e[n], this._y = e[n + 1], this._z = e[n + 2], this._w = e[n + 3], this._onChangeCallback(), this;
  }
  toArray(e = [], n = 0) {
    return e[n] = this._x, e[n + 1] = this._y, e[n + 2] = this._z, e[n + 3] = this._w, e;
  }
  fromBufferAttribute(e, n) {
    return this._x = e.getX(n), this._y = e.getY(n), this._z = e.getZ(n), this._w = e.getW(n), this._onChangeCallback(), this;
  }
  toJSON() {
    return this.toArray();
  }
  _onChange(e) {
    return this._onChangeCallback = e, this;
  }
  _onChangeCallback() {
  }
  *[Symbol.iterator]() {
    yield this._x, yield this._y, yield this._z, yield this._w;
  }
}
class k {
  constructor(e = 0, n = 0, i = 0) {
    k.prototype.isVector3 = !0, this.x = e, this.y = n, this.z = i;
  }
  set(e, n, i) {
    return i === void 0 && (i = this.z), this.x = e, this.y = n, this.z = i, this;
  }
  setScalar(e) {
    return this.x = e, this.y = e, this.z = e, this;
  }
  setX(e) {
    return this.x = e, this;
  }
  setY(e) {
    return this.y = e, this;
  }
  setZ(e) {
    return this.z = e, this;
  }
  setComponent(e, n) {
    switch (e) {
      case 0:
        this.x = n;
        break;
      case 1:
        this.y = n;
        break;
      case 2:
        this.z = n;
        break;
      default:
        throw new Error("index is out of range: " + e);
    }
    return this;
  }
  getComponent(e) {
    switch (e) {
      case 0:
        return this.x;
      case 1:
        return this.y;
      case 2:
        return this.z;
      default:
        throw new Error("index is out of range: " + e);
    }
  }
  clone() {
    return new this.constructor(this.x, this.y, this.z);
  }
  copy(e) {
    return this.x = e.x, this.y = e.y, this.z = e.z, this;
  }
  add(e) {
    return this.x += e.x, this.y += e.y, this.z += e.z, this;
  }
  addScalar(e) {
    return this.x += e, this.y += e, this.z += e, this;
  }
  addVectors(e, n) {
    return this.x = e.x + n.x, this.y = e.y + n.y, this.z = e.z + n.z, this;
  }
  addScaledVector(e, n) {
    return this.x += e.x * n, this.y += e.y * n, this.z += e.z * n, this;
  }
  sub(e) {
    return this.x -= e.x, this.y -= e.y, this.z -= e.z, this;
  }
  subScalar(e) {
    return this.x -= e, this.y -= e, this.z -= e, this;
  }
  subVectors(e, n) {
    return this.x = e.x - n.x, this.y = e.y - n.y, this.z = e.z - n.z, this;
  }
  multiply(e) {
    return this.x *= e.x, this.y *= e.y, this.z *= e.z, this;
  }
  multiplyScalar(e) {
    return this.x *= e, this.y *= e, this.z *= e, this;
  }
  multiplyVectors(e, n) {
    return this.x = e.x * n.x, this.y = e.y * n.y, this.z = e.z * n.z, this;
  }
  applyEuler(e) {
    return this.applyQuaternion(Kg.setFromEuler(e));
  }
  applyAxisAngle(e, n) {
    return this.applyQuaternion(Kg.setFromAxisAngle(e, n));
  }
  applyMatrix3(e) {
    const n = this.x, i = this.y, r = this.z, s = e.elements;
    return this.x = s[0] * n + s[3] * i + s[6] * r, this.y = s[1] * n + s[4] * i + s[7] * r, this.z = s[2] * n + s[5] * i + s[8] * r, this;
  }
  applyNormalMatrix(e) {
    return this.applyMatrix3(e).normalize();
  }
  applyMatrix4(e) {
    const n = this.x, i = this.y, r = this.z, s = e.elements, o = 1 / (s[3] * n + s[7] * i + s[11] * r + s[15]);
    return this.x = (s[0] * n + s[4] * i + s[8] * r + s[12]) * o, this.y = (s[1] * n + s[5] * i + s[9] * r + s[13]) * o, this.z = (s[2] * n + s[6] * i + s[10] * r + s[14]) * o, this;
  }
  applyQuaternion(e) {
    const n = this.x, i = this.y, r = this.z, s = e.x, o = e.y, a = e.z, l = e.w, u = 2 * (o * r - a * i), c = 2 * (a * n - s * r), d = 2 * (s * i - o * n);
    return this.x = n + l * u + o * d - a * c, this.y = i + l * c + a * u - s * d, this.z = r + l * d + s * c - o * u, this;
  }
  project(e) {
    return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix);
  }
  unproject(e) {
    return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld);
  }
  transformDirection(e) {
    const n = this.x, i = this.y, r = this.z, s = e.elements;
    return this.x = s[0] * n + s[4] * i + s[8] * r, this.y = s[1] * n + s[5] * i + s[9] * r, this.z = s[2] * n + s[6] * i + s[10] * r, this.normalize();
  }
  divide(e) {
    return this.x /= e.x, this.y /= e.y, this.z /= e.z, this;
  }
  divideScalar(e) {
    return this.multiplyScalar(1 / e);
  }
  min(e) {
    return this.x = Math.min(this.x, e.x), this.y = Math.min(this.y, e.y), this.z = Math.min(this.z, e.z), this;
  }
  max(e) {
    return this.x = Math.max(this.x, e.x), this.y = Math.max(this.y, e.y), this.z = Math.max(this.z, e.z), this;
  }
  clamp(e, n) {
    return this.x = Math.max(e.x, Math.min(n.x, this.x)), this.y = Math.max(e.y, Math.min(n.y, this.y)), this.z = Math.max(e.z, Math.min(n.z, this.z)), this;
  }
  clampScalar(e, n) {
    return this.x = Math.max(e, Math.min(n, this.x)), this.y = Math.max(e, Math.min(n, this.y)), this.z = Math.max(e, Math.min(n, this.z)), this;
  }
  clampLength(e, n) {
    const i = this.length();
    return this.divideScalar(i || 1).multiplyScalar(Math.max(e, Math.min(n, i)));
  }
  floor() {
    return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this.z = Math.floor(this.z), this;
  }
  ceil() {
    return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this.z = Math.ceil(this.z), this;
  }
  round() {
    return this.x = Math.round(this.x), this.y = Math.round(this.y), this.z = Math.round(this.z), this;
  }
  roundToZero() {
    return this.x = Math.trunc(this.x), this.y = Math.trunc(this.y), this.z = Math.trunc(this.z), this;
  }
  negate() {
    return this.x = -this.x, this.y = -this.y, this.z = -this.z, this;
  }
  dot(e) {
    return this.x * e.x + this.y * e.y + this.z * e.z;
  }
  // TODO lengthSquared?
  lengthSq() {
    return this.x * this.x + this.y * this.y + this.z * this.z;
  }
  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
  }
  manhattanLength() {
    return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z);
  }
  normalize() {
    return this.divideScalar(this.length() || 1);
  }
  setLength(e) {
    return this.normalize().multiplyScalar(e);
  }
  lerp(e, n) {
    return this.x += (e.x - this.x) * n, this.y += (e.y - this.y) * n, this.z += (e.z - this.z) * n, this;
  }
  lerpVectors(e, n, i) {
    return this.x = e.x + (n.x - e.x) * i, this.y = e.y + (n.y - e.y) * i, this.z = e.z + (n.z - e.z) * i, this;
  }
  cross(e) {
    return this.crossVectors(this, e);
  }
  crossVectors(e, n) {
    const i = e.x, r = e.y, s = e.z, o = n.x, a = n.y, l = n.z;
    return this.x = r * l - s * a, this.y = s * o - i * l, this.z = i * a - r * o, this;
  }
  projectOnVector(e) {
    const n = e.lengthSq();
    if (n === 0) return this.set(0, 0, 0);
    const i = e.dot(this) / n;
    return this.copy(e).multiplyScalar(i);
  }
  projectOnPlane(e) {
    return yf.copy(this).projectOnVector(e), this.sub(yf);
  }
  reflect(e) {
    return this.sub(yf.copy(e).multiplyScalar(2 * this.dot(e)));
  }
  angleTo(e) {
    const n = Math.sqrt(this.lengthSq() * e.lengthSq());
    if (n === 0) return Math.PI / 2;
    const i = this.dot(e) / n;
    return Math.acos(xn(i, -1, 1));
  }
  distanceTo(e) {
    return Math.sqrt(this.distanceToSquared(e));
  }
  distanceToSquared(e) {
    const n = this.x - e.x, i = this.y - e.y, r = this.z - e.z;
    return n * n + i * i + r * r;
  }
  manhattanDistanceTo(e) {
    return Math.abs(this.x - e.x) + Math.abs(this.y - e.y) + Math.abs(this.z - e.z);
  }
  setFromSpherical(e) {
    return this.setFromSphericalCoords(e.radius, e.phi, e.theta);
  }
  setFromSphericalCoords(e, n, i) {
    const r = Math.sin(n) * e;
    return this.x = r * Math.sin(i), this.y = Math.cos(n) * e, this.z = r * Math.cos(i), this;
  }
  setFromCylindrical(e) {
    return this.setFromCylindricalCoords(e.radius, e.theta, e.y);
  }
  setFromCylindricalCoords(e, n, i) {
    return this.x = e * Math.sin(n), this.y = i, this.z = e * Math.cos(n), this;
  }
  setFromMatrixPosition(e) {
    const n = e.elements;
    return this.x = n[12], this.y = n[13], this.z = n[14], this;
  }
  setFromMatrixScale(e) {
    const n = this.setFromMatrixColumn(e, 0).length(), i = this.setFromMatrixColumn(e, 1).length(), r = this.setFromMatrixColumn(e, 2).length();
    return this.x = n, this.y = i, this.z = r, this;
  }
  setFromMatrixColumn(e, n) {
    return this.fromArray(e.elements, n * 4);
  }
  setFromMatrix3Column(e, n) {
    return this.fromArray(e.elements, n * 3);
  }
  setFromEuler(e) {
    return this.x = e._x, this.y = e._y, this.z = e._z, this;
  }
  setFromColor(e) {
    return this.x = e.r, this.y = e.g, this.z = e.b, this;
  }
  equals(e) {
    return e.x === this.x && e.y === this.y && e.z === this.z;
  }
  fromArray(e, n = 0) {
    return this.x = e[n], this.y = e[n + 1], this.z = e[n + 2], this;
  }
  toArray(e = [], n = 0) {
    return e[n] = this.x, e[n + 1] = this.y, e[n + 2] = this.z, e;
  }
  fromBufferAttribute(e, n) {
    return this.x = e.getX(n), this.y = e.getY(n), this.z = e.getZ(n), this;
  }
  random() {
    return this.x = Math.random(), this.y = Math.random(), this.z = Math.random(), this;
  }
  randomDirection() {
    const e = Math.random() * Math.PI * 2, n = Math.random() * 2 - 1, i = Math.sqrt(1 - n * n);
    return this.x = i * Math.cos(e), this.y = n, this.z = i * Math.sin(e), this;
  }
  *[Symbol.iterator]() {
    yield this.x, yield this.y, yield this.z;
  }
}
const yf = /* @__PURE__ */ new k(), Kg = /* @__PURE__ */ new Ka();
class Za {
  constructor(e = new k(1 / 0, 1 / 0, 1 / 0), n = new k(-1 / 0, -1 / 0, -1 / 0)) {
    this.isBox3 = !0, this.min = e, this.max = n;
  }
  set(e, n) {
    return this.min.copy(e), this.max.copy(n), this;
  }
  setFromArray(e) {
    this.makeEmpty();
    for (let n = 0, i = e.length; n < i; n += 3)
      this.expandByPoint(ri.fromArray(e, n));
    return this;
  }
  setFromBufferAttribute(e) {
    this.makeEmpty();
    for (let n = 0, i = e.count; n < i; n++)
      this.expandByPoint(ri.fromBufferAttribute(e, n));
    return this;
  }
  setFromPoints(e) {
    this.makeEmpty();
    for (let n = 0, i = e.length; n < i; n++)
      this.expandByPoint(e[n]);
    return this;
  }
  setFromCenterAndSize(e, n) {
    const i = ri.copy(n).multiplyScalar(0.5);
    return this.min.copy(e).sub(i), this.max.copy(e).add(i), this;
  }
  setFromObject(e, n = !1) {
    return this.makeEmpty(), this.expandByObject(e, n);
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(e) {
    return this.min.copy(e.min), this.max.copy(e.max), this;
  }
  makeEmpty() {
    return this.min.x = this.min.y = this.min.z = 1 / 0, this.max.x = this.max.y = this.max.z = -1 / 0, this;
  }
  isEmpty() {
    return this.max.x < this.min.x || this.max.y < this.min.y || this.max.z < this.min.z;
  }
  getCenter(e) {
    return this.isEmpty() ? e.set(0, 0, 0) : e.addVectors(this.min, this.max).multiplyScalar(0.5);
  }
  getSize(e) {
    return this.isEmpty() ? e.set(0, 0, 0) : e.subVectors(this.max, this.min);
  }
  expandByPoint(e) {
    return this.min.min(e), this.max.max(e), this;
  }
  expandByVector(e) {
    return this.min.sub(e), this.max.add(e), this;
  }
  expandByScalar(e) {
    return this.min.addScalar(-e), this.max.addScalar(e), this;
  }
  expandByObject(e, n = !1) {
    e.updateWorldMatrix(!1, !1);
    const i = e.geometry;
    if (i !== void 0) {
      const s = i.getAttribute("position");
      if (n === !0 && s !== void 0 && e.isInstancedMesh !== !0)
        for (let o = 0, a = s.count; o < a; o++)
          e.isMesh === !0 ? e.getVertexPosition(o, ri) : ri.fromBufferAttribute(s, o), ri.applyMatrix4(e.matrixWorld), this.expandByPoint(ri);
      else
        e.boundingBox !== void 0 ? (e.boundingBox === null && e.computeBoundingBox(), xl.copy(e.boundingBox)) : (i.boundingBox === null && i.computeBoundingBox(), xl.copy(i.boundingBox)), xl.applyMatrix4(e.matrixWorld), this.union(xl);
    }
    const r = e.children;
    for (let s = 0, o = r.length; s < o; s++)
      this.expandByObject(r[s], n);
    return this;
  }
  containsPoint(e) {
    return e.x >= this.min.x && e.x <= this.max.x && e.y >= this.min.y && e.y <= this.max.y && e.z >= this.min.z && e.z <= this.max.z;
  }
  containsBox(e) {
    return this.min.x <= e.min.x && e.max.x <= this.max.x && this.min.y <= e.min.y && e.max.y <= this.max.y && this.min.z <= e.min.z && e.max.z <= this.max.z;
  }
  getParameter(e, n) {
    return n.set(
      (e.x - this.min.x) / (this.max.x - this.min.x),
      (e.y - this.min.y) / (this.max.y - this.min.y),
      (e.z - this.min.z) / (this.max.z - this.min.z)
    );
  }
  intersectsBox(e) {
    return e.max.x >= this.min.x && e.min.x <= this.max.x && e.max.y >= this.min.y && e.min.y <= this.max.y && e.max.z >= this.min.z && e.min.z <= this.max.z;
  }
  intersectsSphere(e) {
    return this.clampPoint(e.center, ri), ri.distanceToSquared(e.center) <= e.radius * e.radius;
  }
  intersectsPlane(e) {
    let n, i;
    return e.normal.x > 0 ? (n = e.normal.x * this.min.x, i = e.normal.x * this.max.x) : (n = e.normal.x * this.max.x, i = e.normal.x * this.min.x), e.normal.y > 0 ? (n += e.normal.y * this.min.y, i += e.normal.y * this.max.y) : (n += e.normal.y * this.max.y, i += e.normal.y * this.min.y), e.normal.z > 0 ? (n += e.normal.z * this.min.z, i += e.normal.z * this.max.z) : (n += e.normal.z * this.max.z, i += e.normal.z * this.min.z), n <= -e.constant && i >= -e.constant;
  }
  intersectsTriangle(e) {
    if (this.isEmpty())
      return !1;
    this.getCenter(Yo), yl.subVectors(this.max, Yo), Ts.subVectors(e.a, Yo), Cs.subVectors(e.b, Yo), As.subVectors(e.c, Yo), or.subVectors(Cs, Ts), ar.subVectors(As, Cs), Hr.subVectors(Ts, As);
    let n = [
      0,
      -or.z,
      or.y,
      0,
      -ar.z,
      ar.y,
      0,
      -Hr.z,
      Hr.y,
      or.z,
      0,
      -or.x,
      ar.z,
      0,
      -ar.x,
      Hr.z,
      0,
      -Hr.x,
      -or.y,
      or.x,
      0,
      -ar.y,
      ar.x,
      0,
      -Hr.y,
      Hr.x,
      0
    ];
    return !Sf(n, Ts, Cs, As, yl) || (n = [1, 0, 0, 0, 1, 0, 0, 0, 1], !Sf(n, Ts, Cs, As, yl)) ? !1 : (Sl.crossVectors(or, ar), n = [Sl.x, Sl.y, Sl.z], Sf(n, Ts, Cs, As, yl));
  }
  clampPoint(e, n) {
    return n.copy(e).clamp(this.min, this.max);
  }
  distanceToPoint(e) {
    return this.clampPoint(e, ri).distanceTo(e);
  }
  getBoundingSphere(e) {
    return this.isEmpty() ? e.makeEmpty() : (this.getCenter(e.center), e.radius = this.getSize(ri).length() * 0.5), e;
  }
  intersect(e) {
    return this.min.max(e.min), this.max.min(e.max), this.isEmpty() && this.makeEmpty(), this;
  }
  union(e) {
    return this.min.min(e.min), this.max.max(e.max), this;
  }
  applyMatrix4(e) {
    return this.isEmpty() ? this : (Pi[0].set(this.min.x, this.min.y, this.min.z).applyMatrix4(e), Pi[1].set(this.min.x, this.min.y, this.max.z).applyMatrix4(e), Pi[2].set(this.min.x, this.max.y, this.min.z).applyMatrix4(e), Pi[3].set(this.min.x, this.max.y, this.max.z).applyMatrix4(e), Pi[4].set(this.max.x, this.min.y, this.min.z).applyMatrix4(e), Pi[5].set(this.max.x, this.min.y, this.max.z).applyMatrix4(e), Pi[6].set(this.max.x, this.max.y, this.min.z).applyMatrix4(e), Pi[7].set(this.max.x, this.max.y, this.max.z).applyMatrix4(e), this.setFromPoints(Pi), this);
  }
  translate(e) {
    return this.min.add(e), this.max.add(e), this;
  }
  equals(e) {
    return e.min.equals(this.min) && e.max.equals(this.max);
  }
}
const Pi = [
  /* @__PURE__ */ new k(),
  /* @__PURE__ */ new k(),
  /* @__PURE__ */ new k(),
  /* @__PURE__ */ new k(),
  /* @__PURE__ */ new k(),
  /* @__PURE__ */ new k(),
  /* @__PURE__ */ new k(),
  /* @__PURE__ */ new k()
], ri = /* @__PURE__ */ new k(), xl = /* @__PURE__ */ new Za(), Ts = /* @__PURE__ */ new k(), Cs = /* @__PURE__ */ new k(), As = /* @__PURE__ */ new k(), or = /* @__PURE__ */ new k(), ar = /* @__PURE__ */ new k(), Hr = /* @__PURE__ */ new k(), Yo = /* @__PURE__ */ new k(), yl = /* @__PURE__ */ new k(), Sl = /* @__PURE__ */ new k(), Vr = /* @__PURE__ */ new k();
function Sf(t, e, n, i, r) {
  for (let s = 0, o = t.length - 3; s <= o; s += 3) {
    Vr.fromArray(t, s);
    const a = r.x * Math.abs(Vr.x) + r.y * Math.abs(Vr.y) + r.z * Math.abs(Vr.z), l = e.dot(Vr), u = n.dot(Vr), c = i.dot(Vr);
    if (Math.max(-Math.max(l, u, c), Math.min(l, u, c)) > a)
      return !1;
  }
  return !0;
}
const hw = /* @__PURE__ */ new Za(), qo = /* @__PURE__ */ new k(), Mf = /* @__PURE__ */ new k();
class Kp {
  constructor(e = new k(), n = -1) {
    this.isSphere = !0, this.center = e, this.radius = n;
  }
  set(e, n) {
    return this.center.copy(e), this.radius = n, this;
  }
  setFromPoints(e, n) {
    const i = this.center;
    n !== void 0 ? i.copy(n) : hw.setFromPoints(e).getCenter(i);
    let r = 0;
    for (let s = 0, o = e.length; s < o; s++)
      r = Math.max(r, i.distanceToSquared(e[s]));
    return this.radius = Math.sqrt(r), this;
  }
  copy(e) {
    return this.center.copy(e.center), this.radius = e.radius, this;
  }
  isEmpty() {
    return this.radius < 0;
  }
  makeEmpty() {
    return this.center.set(0, 0, 0), this.radius = -1, this;
  }
  containsPoint(e) {
    return e.distanceToSquared(this.center) <= this.radius * this.radius;
  }
  distanceToPoint(e) {
    return e.distanceTo(this.center) - this.radius;
  }
  intersectsSphere(e) {
    const n = this.radius + e.radius;
    return e.center.distanceToSquared(this.center) <= n * n;
  }
  intersectsBox(e) {
    return e.intersectsSphere(this);
  }
  intersectsPlane(e) {
    return Math.abs(e.distanceToPoint(this.center)) <= this.radius;
  }
  clampPoint(e, n) {
    const i = this.center.distanceToSquared(e);
    return n.copy(e), i > this.radius * this.radius && (n.sub(this.center).normalize(), n.multiplyScalar(this.radius).add(this.center)), n;
  }
  getBoundingBox(e) {
    return this.isEmpty() ? (e.makeEmpty(), e) : (e.set(this.center, this.center), e.expandByScalar(this.radius), e);
  }
  applyMatrix4(e) {
    return this.center.applyMatrix4(e), this.radius = this.radius * e.getMaxScaleOnAxis(), this;
  }
  translate(e) {
    return this.center.add(e), this;
  }
  expandByPoint(e) {
    if (this.isEmpty())
      return this.center.copy(e), this.radius = 0, this;
    qo.subVectors(e, this.center);
    const n = qo.lengthSq();
    if (n > this.radius * this.radius) {
      const i = Math.sqrt(n), r = (i - this.radius) * 0.5;
      this.center.addScaledVector(qo, r / i), this.radius += r;
    }
    return this;
  }
  union(e) {
    return e.isEmpty() ? this : this.isEmpty() ? (this.copy(e), this) : (this.center.equals(e.center) === !0 ? this.radius = Math.max(this.radius, e.radius) : (Mf.subVectors(e.center, this.center).setLength(e.radius), this.expandByPoint(qo.copy(e.center).add(Mf)), this.expandByPoint(qo.copy(e.center).sub(Mf))), this);
  }
  equals(e) {
    return e.center.equals(this.center) && e.radius === this.radius;
  }
  clone() {
    return new this.constructor().copy(this);
  }
}
const Li = /* @__PURE__ */ new k(), Ef = /* @__PURE__ */ new k(), Ml = /* @__PURE__ */ new k(), lr = /* @__PURE__ */ new k(), wf = /* @__PURE__ */ new k(), El = /* @__PURE__ */ new k(), Tf = /* @__PURE__ */ new k();
class pw {
  constructor(e = new k(), n = new k(0, 0, -1)) {
    this.origin = e, this.direction = n;
  }
  set(e, n) {
    return this.origin.copy(e), this.direction.copy(n), this;
  }
  copy(e) {
    return this.origin.copy(e.origin), this.direction.copy(e.direction), this;
  }
  at(e, n) {
    return n.copy(this.origin).addScaledVector(this.direction, e);
  }
  lookAt(e) {
    return this.direction.copy(e).sub(this.origin).normalize(), this;
  }
  recast(e) {
    return this.origin.copy(this.at(e, Li)), this;
  }
  closestPointToPoint(e, n) {
    n.subVectors(e, this.origin);
    const i = n.dot(this.direction);
    return i < 0 ? n.copy(this.origin) : n.copy(this.origin).addScaledVector(this.direction, i);
  }
  distanceToPoint(e) {
    return Math.sqrt(this.distanceSqToPoint(e));
  }
  distanceSqToPoint(e) {
    const n = Li.subVectors(e, this.origin).dot(this.direction);
    return n < 0 ? this.origin.distanceToSquared(e) : (Li.copy(this.origin).addScaledVector(this.direction, n), Li.distanceToSquared(e));
  }
  distanceSqToSegment(e, n, i, r) {
    Ef.copy(e).add(n).multiplyScalar(0.5), Ml.copy(n).sub(e).normalize(), lr.copy(this.origin).sub(Ef);
    const s = e.distanceTo(n) * 0.5, o = -this.direction.dot(Ml), a = lr.dot(this.direction), l = -lr.dot(Ml), u = lr.lengthSq(), c = Math.abs(1 - o * o);
    let d, h, p, _;
    if (c > 0)
      if (d = o * l - a, h = o * a - l, _ = s * c, d >= 0)
        if (h >= -_)
          if (h <= _) {
            const y = 1 / c;
            d *= y, h *= y, p = d * (d + o * h + 2 * a) + h * (o * d + h + 2 * l) + u;
          } else
            h = s, d = Math.max(0, -(o * h + a)), p = -d * d + h * (h + 2 * l) + u;
        else
          h = -s, d = Math.max(0, -(o * h + a)), p = -d * d + h * (h + 2 * l) + u;
      else
        h <= -_ ? (d = Math.max(0, -(-o * s + a)), h = d > 0 ? -s : Math.min(Math.max(-s, -l), s), p = -d * d + h * (h + 2 * l) + u) : h <= _ ? (d = 0, h = Math.min(Math.max(-s, -l), s), p = h * (h + 2 * l) + u) : (d = Math.max(0, -(o * s + a)), h = d > 0 ? s : Math.min(Math.max(-s, -l), s), p = -d * d + h * (h + 2 * l) + u);
    else
      h = o > 0 ? -s : s, d = Math.max(0, -(o * h + a)), p = -d * d + h * (h + 2 * l) + u;
    return i && i.copy(this.origin).addScaledVector(this.direction, d), r && r.copy(Ef).addScaledVector(Ml, h), p;
  }
  intersectSphere(e, n) {
    Li.subVectors(e.center, this.origin);
    const i = Li.dot(this.direction), r = Li.dot(Li) - i * i, s = e.radius * e.radius;
    if (r > s) return null;
    const o = Math.sqrt(s - r), a = i - o, l = i + o;
    return l < 0 ? null : a < 0 ? this.at(l, n) : this.at(a, n);
  }
  intersectsSphere(e) {
    return this.distanceSqToPoint(e.center) <= e.radius * e.radius;
  }
  distanceToPlane(e) {
    const n = e.normal.dot(this.direction);
    if (n === 0)
      return e.distanceToPoint(this.origin) === 0 ? 0 : null;
    const i = -(this.origin.dot(e.normal) + e.constant) / n;
    return i >= 0 ? i : null;
  }
  intersectPlane(e, n) {
    const i = this.distanceToPlane(e);
    return i === null ? null : this.at(i, n);
  }
  intersectsPlane(e) {
    const n = e.distanceToPoint(this.origin);
    return n === 0 || e.normal.dot(this.direction) * n < 0;
  }
  intersectBox(e, n) {
    let i, r, s, o, a, l;
    const u = 1 / this.direction.x, c = 1 / this.direction.y, d = 1 / this.direction.z, h = this.origin;
    return u >= 0 ? (i = (e.min.x - h.x) * u, r = (e.max.x - h.x) * u) : (i = (e.max.x - h.x) * u, r = (e.min.x - h.x) * u), c >= 0 ? (s = (e.min.y - h.y) * c, o = (e.max.y - h.y) * c) : (s = (e.max.y - h.y) * c, o = (e.min.y - h.y) * c), i > o || s > r || ((s > i || isNaN(i)) && (i = s), (o < r || isNaN(r)) && (r = o), d >= 0 ? (a = (e.min.z - h.z) * d, l = (e.max.z - h.z) * d) : (a = (e.max.z - h.z) * d, l = (e.min.z - h.z) * d), i > l || a > r) || ((a > i || i !== i) && (i = a), (l < r || r !== r) && (r = l), r < 0) ? null : this.at(i >= 0 ? i : r, n);
  }
  intersectsBox(e) {
    return this.intersectBox(e, Li) !== null;
  }
  intersectTriangle(e, n, i, r, s) {
    wf.subVectors(n, e), El.subVectors(i, e), Tf.crossVectors(wf, El);
    let o = this.direction.dot(Tf), a;
    if (o > 0) {
      if (r) return null;
      a = 1;
    } else if (o < 0)
      a = -1, o = -o;
    else
      return null;
    lr.subVectors(this.origin, e);
    const l = a * this.direction.dot(El.crossVectors(lr, El));
    if (l < 0)
      return null;
    const u = a * this.direction.dot(wf.cross(lr));
    if (u < 0 || l + u > o)
      return null;
    const c = -a * lr.dot(Tf);
    return c < 0 ? null : this.at(c / o, s);
  }
  applyMatrix4(e) {
    return this.origin.applyMatrix4(e), this.direction.transformDirection(e), this;
  }
  equals(e) {
    return e.origin.equals(this.origin) && e.direction.equals(this.direction);
  }
  clone() {
    return new this.constructor().copy(this);
  }
}
class Mt {
  constructor(e, n, i, r, s, o, a, l, u, c, d, h, p, _, y, m) {
    Mt.prototype.isMatrix4 = !0, this.elements = [
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1
    ], e !== void 0 && this.set(e, n, i, r, s, o, a, l, u, c, d, h, p, _, y, m);
  }
  set(e, n, i, r, s, o, a, l, u, c, d, h, p, _, y, m) {
    const f = this.elements;
    return f[0] = e, f[4] = n, f[8] = i, f[12] = r, f[1] = s, f[5] = o, f[9] = a, f[13] = l, f[2] = u, f[6] = c, f[10] = d, f[14] = h, f[3] = p, f[7] = _, f[11] = y, f[15] = m, this;
  }
  identity() {
    return this.set(
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1
    ), this;
  }
  clone() {
    return new Mt().fromArray(this.elements);
  }
  copy(e) {
    const n = this.elements, i = e.elements;
    return n[0] = i[0], n[1] = i[1], n[2] = i[2], n[3] = i[3], n[4] = i[4], n[5] = i[5], n[6] = i[6], n[7] = i[7], n[8] = i[8], n[9] = i[9], n[10] = i[10], n[11] = i[11], n[12] = i[12], n[13] = i[13], n[14] = i[14], n[15] = i[15], this;
  }
  copyPosition(e) {
    const n = this.elements, i = e.elements;
    return n[12] = i[12], n[13] = i[13], n[14] = i[14], this;
  }
  setFromMatrix3(e) {
    const n = e.elements;
    return this.set(
      n[0],
      n[3],
      n[6],
      0,
      n[1],
      n[4],
      n[7],
      0,
      n[2],
      n[5],
      n[8],
      0,
      0,
      0,
      0,
      1
    ), this;
  }
  extractBasis(e, n, i) {
    return e.setFromMatrixColumn(this, 0), n.setFromMatrixColumn(this, 1), i.setFromMatrixColumn(this, 2), this;
  }
  makeBasis(e, n, i) {
    return this.set(
      e.x,
      n.x,
      i.x,
      0,
      e.y,
      n.y,
      i.y,
      0,
      e.z,
      n.z,
      i.z,
      0,
      0,
      0,
      0,
      1
    ), this;
  }
  extractRotation(e) {
    const n = this.elements, i = e.elements, r = 1 / Rs.setFromMatrixColumn(e, 0).length(), s = 1 / Rs.setFromMatrixColumn(e, 1).length(), o = 1 / Rs.setFromMatrixColumn(e, 2).length();
    return n[0] = i[0] * r, n[1] = i[1] * r, n[2] = i[2] * r, n[3] = 0, n[4] = i[4] * s, n[5] = i[5] * s, n[6] = i[6] * s, n[7] = 0, n[8] = i[8] * o, n[9] = i[9] * o, n[10] = i[10] * o, n[11] = 0, n[12] = 0, n[13] = 0, n[14] = 0, n[15] = 1, this;
  }
  makeRotationFromEuler(e) {
    const n = this.elements, i = e.x, r = e.y, s = e.z, o = Math.cos(i), a = Math.sin(i), l = Math.cos(r), u = Math.sin(r), c = Math.cos(s), d = Math.sin(s);
    if (e.order === "XYZ") {
      const h = o * c, p = o * d, _ = a * c, y = a * d;
      n[0] = l * c, n[4] = -l * d, n[8] = u, n[1] = p + _ * u, n[5] = h - y * u, n[9] = -a * l, n[2] = y - h * u, n[6] = _ + p * u, n[10] = o * l;
    } else if (e.order === "YXZ") {
      const h = l * c, p = l * d, _ = u * c, y = u * d;
      n[0] = h + y * a, n[4] = _ * a - p, n[8] = o * u, n[1] = o * d, n[5] = o * c, n[9] = -a, n[2] = p * a - _, n[6] = y + h * a, n[10] = o * l;
    } else if (e.order === "ZXY") {
      const h = l * c, p = l * d, _ = u * c, y = u * d;
      n[0] = h - y * a, n[4] = -o * d, n[8] = _ + p * a, n[1] = p + _ * a, n[5] = o * c, n[9] = y - h * a, n[2] = -o * u, n[6] = a, n[10] = o * l;
    } else if (e.order === "ZYX") {
      const h = o * c, p = o * d, _ = a * c, y = a * d;
      n[0] = l * c, n[4] = _ * u - p, n[8] = h * u + y, n[1] = l * d, n[5] = y * u + h, n[9] = p * u - _, n[2] = -u, n[6] = a * l, n[10] = o * l;
    } else if (e.order === "YZX") {
      const h = o * l, p = o * u, _ = a * l, y = a * u;
      n[0] = l * c, n[4] = y - h * d, n[8] = _ * d + p, n[1] = d, n[5] = o * c, n[9] = -a * c, n[2] = -u * c, n[6] = p * d + _, n[10] = h - y * d;
    } else if (e.order === "XZY") {
      const h = o * l, p = o * u, _ = a * l, y = a * u;
      n[0] = l * c, n[4] = -d, n[8] = u * c, n[1] = h * d + y, n[5] = o * c, n[9] = p * d - _, n[2] = _ * d - p, n[6] = a * c, n[10] = y * d + h;
    }
    return n[3] = 0, n[7] = 0, n[11] = 0, n[12] = 0, n[13] = 0, n[14] = 0, n[15] = 1, this;
  }
  makeRotationFromQuaternion(e) {
    return this.compose(mw, e, gw);
  }
  lookAt(e, n, i) {
    const r = this.elements;
    return bn.subVectors(e, n), bn.lengthSq() === 0 && (bn.z = 1), bn.normalize(), ur.crossVectors(i, bn), ur.lengthSq() === 0 && (Math.abs(i.z) === 1 ? bn.x += 1e-4 : bn.z += 1e-4, bn.normalize(), ur.crossVectors(i, bn)), ur.normalize(), wl.crossVectors(bn, ur), r[0] = ur.x, r[4] = wl.x, r[8] = bn.x, r[1] = ur.y, r[5] = wl.y, r[9] = bn.y, r[2] = ur.z, r[6] = wl.z, r[10] = bn.z, this;
  }
  multiply(e) {
    return this.multiplyMatrices(this, e);
  }
  premultiply(e) {
    return this.multiplyMatrices(e, this);
  }
  multiplyMatrices(e, n) {
    const i = e.elements, r = n.elements, s = this.elements, o = i[0], a = i[4], l = i[8], u = i[12], c = i[1], d = i[5], h = i[9], p = i[13], _ = i[2], y = i[6], m = i[10], f = i[14], v = i[3], g = i[7], M = i[11], b = i[15], A = r[0], T = r[4], R = r[8], j = r[12], x = r[1], w = r[5], H = r[9], B = r[13], G = r[2], Q = r[6], V = r[10], ne = r[14], L = r[3], q = r[7], Z = r[11], se = r[15];
    return s[0] = o * A + a * x + l * G + u * L, s[4] = o * T + a * w + l * Q + u * q, s[8] = o * R + a * H + l * V + u * Z, s[12] = o * j + a * B + l * ne + u * se, s[1] = c * A + d * x + h * G + p * L, s[5] = c * T + d * w + h * Q + p * q, s[9] = c * R + d * H + h * V + p * Z, s[13] = c * j + d * B + h * ne + p * se, s[2] = _ * A + y * x + m * G + f * L, s[6] = _ * T + y * w + m * Q + f * q, s[10] = _ * R + y * H + m * V + f * Z, s[14] = _ * j + y * B + m * ne + f * se, s[3] = v * A + g * x + M * G + b * L, s[7] = v * T + g * w + M * Q + b * q, s[11] = v * R + g * H + M * V + b * Z, s[15] = v * j + g * B + M * ne + b * se, this;
  }
  multiplyScalar(e) {
    const n = this.elements;
    return n[0] *= e, n[4] *= e, n[8] *= e, n[12] *= e, n[1] *= e, n[5] *= e, n[9] *= e, n[13] *= e, n[2] *= e, n[6] *= e, n[10] *= e, n[14] *= e, n[3] *= e, n[7] *= e, n[11] *= e, n[15] *= e, this;
  }
  determinant() {
    const e = this.elements, n = e[0], i = e[4], r = e[8], s = e[12], o = e[1], a = e[5], l = e[9], u = e[13], c = e[2], d = e[6], h = e[10], p = e[14], _ = e[3], y = e[7], m = e[11], f = e[15];
    return _ * (+s * l * d - r * u * d - s * a * h + i * u * h + r * a * p - i * l * p) + y * (+n * l * p - n * u * h + s * o * h - r * o * p + r * u * c - s * l * c) + m * (+n * u * d - n * a * p - s * o * d + i * o * p + s * a * c - i * u * c) + f * (-r * a * c - n * l * d + n * a * h + r * o * d - i * o * h + i * l * c);
  }
  transpose() {
    const e = this.elements;
    let n;
    return n = e[1], e[1] = e[4], e[4] = n, n = e[2], e[2] = e[8], e[8] = n, n = e[6], e[6] = e[9], e[9] = n, n = e[3], e[3] = e[12], e[12] = n, n = e[7], e[7] = e[13], e[13] = n, n = e[11], e[11] = e[14], e[14] = n, this;
  }
  setPosition(e, n, i) {
    const r = this.elements;
    return e.isVector3 ? (r[12] = e.x, r[13] = e.y, r[14] = e.z) : (r[12] = e, r[13] = n, r[14] = i), this;
  }
  invert() {
    const e = this.elements, n = e[0], i = e[1], r = e[2], s = e[3], o = e[4], a = e[5], l = e[6], u = e[7], c = e[8], d = e[9], h = e[10], p = e[11], _ = e[12], y = e[13], m = e[14], f = e[15], v = d * m * u - y * h * u + y * l * p - a * m * p - d * l * f + a * h * f, g = _ * h * u - c * m * u - _ * l * p + o * m * p + c * l * f - o * h * f, M = c * y * u - _ * d * u + _ * a * p - o * y * p - c * a * f + o * d * f, b = _ * d * l - c * y * l - _ * a * h + o * y * h + c * a * m - o * d * m, A = n * v + i * g + r * M + s * b;
    if (A === 0) return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    const T = 1 / A;
    return e[0] = v * T, e[1] = (y * h * s - d * m * s - y * r * p + i * m * p + d * r * f - i * h * f) * T, e[2] = (a * m * s - y * l * s + y * r * u - i * m * u - a * r * f + i * l * f) * T, e[3] = (d * l * s - a * h * s - d * r * u + i * h * u + a * r * p - i * l * p) * T, e[4] = g * T, e[5] = (c * m * s - _ * h * s + _ * r * p - n * m * p - c * r * f + n * h * f) * T, e[6] = (_ * l * s - o * m * s - _ * r * u + n * m * u + o * r * f - n * l * f) * T, e[7] = (o * h * s - c * l * s + c * r * u - n * h * u - o * r * p + n * l * p) * T, e[8] = M * T, e[9] = (_ * d * s - c * y * s - _ * i * p + n * y * p + c * i * f - n * d * f) * T, e[10] = (o * y * s - _ * a * s + _ * i * u - n * y * u - o * i * f + n * a * f) * T, e[11] = (c * a * s - o * d * s - c * i * u + n * d * u + o * i * p - n * a * p) * T, e[12] = b * T, e[13] = (c * y * r - _ * d * r + _ * i * h - n * y * h - c * i * m + n * d * m) * T, e[14] = (_ * a * r - o * y * r - _ * i * l + n * y * l + o * i * m - n * a * m) * T, e[15] = (o * d * r - c * a * r + c * i * l - n * d * l - o * i * h + n * a * h) * T, this;
  }
  scale(e) {
    const n = this.elements, i = e.x, r = e.y, s = e.z;
    return n[0] *= i, n[4] *= r, n[8] *= s, n[1] *= i, n[5] *= r, n[9] *= s, n[2] *= i, n[6] *= r, n[10] *= s, n[3] *= i, n[7] *= r, n[11] *= s, this;
  }
  getMaxScaleOnAxis() {
    const e = this.elements, n = e[0] * e[0] + e[1] * e[1] + e[2] * e[2], i = e[4] * e[4] + e[5] * e[5] + e[6] * e[6], r = e[8] * e[8] + e[9] * e[9] + e[10] * e[10];
    return Math.sqrt(Math.max(n, i, r));
  }
  makeTranslation(e, n, i) {
    return e.isVector3 ? this.set(
      1,
      0,
      0,
      e.x,
      0,
      1,
      0,
      e.y,
      0,
      0,
      1,
      e.z,
      0,
      0,
      0,
      1
    ) : this.set(
      1,
      0,
      0,
      e,
      0,
      1,
      0,
      n,
      0,
      0,
      1,
      i,
      0,
      0,
      0,
      1
    ), this;
  }
  makeRotationX(e) {
    const n = Math.cos(e), i = Math.sin(e);
    return this.set(
      1,
      0,
      0,
      0,
      0,
      n,
      -i,
      0,
      0,
      i,
      n,
      0,
      0,
      0,
      0,
      1
    ), this;
  }
  makeRotationY(e) {
    const n = Math.cos(e), i = Math.sin(e);
    return this.set(
      n,
      0,
      i,
      0,
      0,
      1,
      0,
      0,
      -i,
      0,
      n,
      0,
      0,
      0,
      0,
      1
    ), this;
  }
  makeRotationZ(e) {
    const n = Math.cos(e), i = Math.sin(e);
    return this.set(
      n,
      -i,
      0,
      0,
      i,
      n,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1
    ), this;
  }
  makeRotationAxis(e, n) {
    const i = Math.cos(n), r = Math.sin(n), s = 1 - i, o = e.x, a = e.y, l = e.z, u = s * o, c = s * a;
    return this.set(
      u * o + i,
      u * a - r * l,
      u * l + r * a,
      0,
      u * a + r * l,
      c * a + i,
      c * l - r * o,
      0,
      u * l - r * a,
      c * l + r * o,
      s * l * l + i,
      0,
      0,
      0,
      0,
      1
    ), this;
  }
  makeScale(e, n, i) {
    return this.set(
      e,
      0,
      0,
      0,
      0,
      n,
      0,
      0,
      0,
      0,
      i,
      0,
      0,
      0,
      0,
      1
    ), this;
  }
  makeShear(e, n, i, r, s, o) {
    return this.set(
      1,
      i,
      s,
      0,
      e,
      1,
      o,
      0,
      n,
      r,
      1,
      0,
      0,
      0,
      0,
      1
    ), this;
  }
  compose(e, n, i) {
    const r = this.elements, s = n._x, o = n._y, a = n._z, l = n._w, u = s + s, c = o + o, d = a + a, h = s * u, p = s * c, _ = s * d, y = o * c, m = o * d, f = a * d, v = l * u, g = l * c, M = l * d, b = i.x, A = i.y, T = i.z;
    return r[0] = (1 - (y + f)) * b, r[1] = (p + M) * b, r[2] = (_ - g) * b, r[3] = 0, r[4] = (p - M) * A, r[5] = (1 - (h + f)) * A, r[6] = (m + v) * A, r[7] = 0, r[8] = (_ + g) * T, r[9] = (m - v) * T, r[10] = (1 - (h + y)) * T, r[11] = 0, r[12] = e.x, r[13] = e.y, r[14] = e.z, r[15] = 1, this;
  }
  decompose(e, n, i) {
    const r = this.elements;
    let s = Rs.set(r[0], r[1], r[2]).length();
    const o = Rs.set(r[4], r[5], r[6]).length(), a = Rs.set(r[8], r[9], r[10]).length();
    this.determinant() < 0 && (s = -s), e.x = r[12], e.y = r[13], e.z = r[14], si.copy(this);
    const u = 1 / s, c = 1 / o, d = 1 / a;
    return si.elements[0] *= u, si.elements[1] *= u, si.elements[2] *= u, si.elements[4] *= c, si.elements[5] *= c, si.elements[6] *= c, si.elements[8] *= d, si.elements[9] *= d, si.elements[10] *= d, n.setFromRotationMatrix(si), i.x = s, i.y = o, i.z = a, this;
  }
  makePerspective(e, n, i, r, s, o, a = $i) {
    const l = this.elements, u = 2 * s / (n - e), c = 2 * s / (i - r), d = (n + e) / (n - e), h = (i + r) / (i - r);
    let p, _;
    if (a === $i)
      p = -(o + s) / (o - s), _ = -2 * o * s / (o - s);
    else if (a === ju)
      p = -o / (o - s), _ = -o * s / (o - s);
    else
      throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: " + a);
    return l[0] = u, l[4] = 0, l[8] = d, l[12] = 0, l[1] = 0, l[5] = c, l[9] = h, l[13] = 0, l[2] = 0, l[6] = 0, l[10] = p, l[14] = _, l[3] = 0, l[7] = 0, l[11] = -1, l[15] = 0, this;
  }
  makeOrthographic(e, n, i, r, s, o, a = $i) {
    const l = this.elements, u = 1 / (n - e), c = 1 / (i - r), d = 1 / (o - s), h = (n + e) * u, p = (i + r) * c;
    let _, y;
    if (a === $i)
      _ = (o + s) * d, y = -2 * d;
    else if (a === ju)
      _ = s * d, y = -1 * d;
    else
      throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: " + a);
    return l[0] = 2 * u, l[4] = 0, l[8] = 0, l[12] = -h, l[1] = 0, l[5] = 2 * c, l[9] = 0, l[13] = -p, l[2] = 0, l[6] = 0, l[10] = y, l[14] = -_, l[3] = 0, l[7] = 0, l[11] = 0, l[15] = 1, this;
  }
  equals(e) {
    const n = this.elements, i = e.elements;
    for (let r = 0; r < 16; r++)
      if (n[r] !== i[r]) return !1;
    return !0;
  }
  fromArray(e, n = 0) {
    for (let i = 0; i < 16; i++)
      this.elements[i] = e[i + n];
    return this;
  }
  toArray(e = [], n = 0) {
    const i = this.elements;
    return e[n] = i[0], e[n + 1] = i[1], e[n + 2] = i[2], e[n + 3] = i[3], e[n + 4] = i[4], e[n + 5] = i[5], e[n + 6] = i[6], e[n + 7] = i[7], e[n + 8] = i[8], e[n + 9] = i[9], e[n + 10] = i[10], e[n + 11] = i[11], e[n + 12] = i[12], e[n + 13] = i[13], e[n + 14] = i[14], e[n + 15] = i[15], e;
  }
}
const Rs = /* @__PURE__ */ new k(), si = /* @__PURE__ */ new Mt(), mw = /* @__PURE__ */ new k(0, 0, 0), gw = /* @__PURE__ */ new k(1, 1, 1), ur = /* @__PURE__ */ new k(), wl = /* @__PURE__ */ new k(), bn = /* @__PURE__ */ new k(), Zg = /* @__PURE__ */ new Mt(), Qg = /* @__PURE__ */ new Ka();
class Ri {
  constructor(e = 0, n = 0, i = 0, r = Ri.DEFAULT_ORDER) {
    this.isEuler = !0, this._x = e, this._y = n, this._z = i, this._order = r;
  }
  get x() {
    return this._x;
  }
  set x(e) {
    this._x = e, this._onChangeCallback();
  }
  get y() {
    return this._y;
  }
  set y(e) {
    this._y = e, this._onChangeCallback();
  }
  get z() {
    return this._z;
  }
  set z(e) {
    this._z = e, this._onChangeCallback();
  }
  get order() {
    return this._order;
  }
  set order(e) {
    this._order = e, this._onChangeCallback();
  }
  set(e, n, i, r = this._order) {
    return this._x = e, this._y = n, this._z = i, this._order = r, this._onChangeCallback(), this;
  }
  clone() {
    return new this.constructor(this._x, this._y, this._z, this._order);
  }
  copy(e) {
    return this._x = e._x, this._y = e._y, this._z = e._z, this._order = e._order, this._onChangeCallback(), this;
  }
  setFromRotationMatrix(e, n = this._order, i = !0) {
    const r = e.elements, s = r[0], o = r[4], a = r[8], l = r[1], u = r[5], c = r[9], d = r[2], h = r[6], p = r[10];
    switch (n) {
      case "XYZ":
        this._y = Math.asin(xn(a, -1, 1)), Math.abs(a) < 0.9999999 ? (this._x = Math.atan2(-c, p), this._z = Math.atan2(-o, s)) : (this._x = Math.atan2(h, u), this._z = 0);
        break;
      case "YXZ":
        this._x = Math.asin(-xn(c, -1, 1)), Math.abs(c) < 0.9999999 ? (this._y = Math.atan2(a, p), this._z = Math.atan2(l, u)) : (this._y = Math.atan2(-d, s), this._z = 0);
        break;
      case "ZXY":
        this._x = Math.asin(xn(h, -1, 1)), Math.abs(h) < 0.9999999 ? (this._y = Math.atan2(-d, p), this._z = Math.atan2(-o, u)) : (this._y = 0, this._z = Math.atan2(l, s));
        break;
      case "ZYX":
        this._y = Math.asin(-xn(d, -1, 1)), Math.abs(d) < 0.9999999 ? (this._x = Math.atan2(h, p), this._z = Math.atan2(l, s)) : (this._x = 0, this._z = Math.atan2(-o, u));
        break;
      case "YZX":
        this._z = Math.asin(xn(l, -1, 1)), Math.abs(l) < 0.9999999 ? (this._x = Math.atan2(-c, u), this._y = Math.atan2(-d, s)) : (this._x = 0, this._y = Math.atan2(a, p));
        break;
      case "XZY":
        this._z = Math.asin(-xn(o, -1, 1)), Math.abs(o) < 0.9999999 ? (this._x = Math.atan2(h, u), this._y = Math.atan2(a, s)) : (this._x = Math.atan2(-c, p), this._y = 0);
        break;
      default:
        console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: " + n);
    }
    return this._order = n, i === !0 && this._onChangeCallback(), this;
  }
  setFromQuaternion(e, n, i) {
    return Zg.makeRotationFromQuaternion(e), this.setFromRotationMatrix(Zg, n, i);
  }
  setFromVector3(e, n = this._order) {
    return this.set(e.x, e.y, e.z, n);
  }
  reorder(e) {
    return Qg.setFromEuler(this), this.setFromQuaternion(Qg, e);
  }
  equals(e) {
    return e._x === this._x && e._y === this._y && e._z === this._z && e._order === this._order;
  }
  fromArray(e) {
    return this._x = e[0], this._y = e[1], this._z = e[2], e[3] !== void 0 && (this._order = e[3]), this._onChangeCallback(), this;
  }
  toArray(e = [], n = 0) {
    return e[n] = this._x, e[n + 1] = this._y, e[n + 2] = this._z, e[n + 3] = this._order, e;
  }
  _onChange(e) {
    return this._onChangeCallback = e, this;
  }
  _onChangeCallback() {
  }
  *[Symbol.iterator]() {
    yield this._x, yield this._y, yield this._z, yield this._order;
  }
}
Ri.DEFAULT_ORDER = "XYZ";
class Sy {
  constructor() {
    this.mask = 1;
  }
  set(e) {
    this.mask = (1 << e | 0) >>> 0;
  }
  enable(e) {
    this.mask |= 1 << e | 0;
  }
  enableAll() {
    this.mask = -1;
  }
  toggle(e) {
    this.mask ^= 1 << e | 0;
  }
  disable(e) {
    this.mask &= ~(1 << e | 0);
  }
  disableAll() {
    this.mask = 0;
  }
  test(e) {
    return (this.mask & e.mask) !== 0;
  }
  isEnabled(e) {
    return (this.mask & (1 << e | 0)) !== 0;
  }
}
let vw = 0;
const Jg = /* @__PURE__ */ new k(), bs = /* @__PURE__ */ new Ka(), Di = /* @__PURE__ */ new Mt(), Tl = /* @__PURE__ */ new k(), Ko = /* @__PURE__ */ new k(), _w = /* @__PURE__ */ new k(), xw = /* @__PURE__ */ new Ka(), ev = /* @__PURE__ */ new k(1, 0, 0), tv = /* @__PURE__ */ new k(0, 1, 0), nv = /* @__PURE__ */ new k(0, 0, 1), iv = { type: "added" }, yw = { type: "removed" }, Ps = { type: "childadded", child: null }, Cf = { type: "childremoved", child: null };
class Nt extends Po {
  constructor() {
    super(), this.isObject3D = !0, Object.defineProperty(this, "id", { value: vw++ }), this.uuid = qa(), this.name = "", this.type = "Object3D", this.parent = null, this.children = [], this.up = Nt.DEFAULT_UP.clone();
    const e = new k(), n = new Ri(), i = new Ka(), r = new k(1, 1, 1);
    function s() {
      i.setFromEuler(n, !1);
    }
    function o() {
      n.setFromQuaternion(i, void 0, !1);
    }
    n._onChange(s), i._onChange(o), Object.defineProperties(this, {
      position: {
        configurable: !0,
        enumerable: !0,
        value: e
      },
      rotation: {
        configurable: !0,
        enumerable: !0,
        value: n
      },
      quaternion: {
        configurable: !0,
        enumerable: !0,
        value: i
      },
      scale: {
        configurable: !0,
        enumerable: !0,
        value: r
      },
      modelViewMatrix: {
        value: new Mt()
      },
      normalMatrix: {
        value: new Oe()
      }
    }), this.matrix = new Mt(), this.matrixWorld = new Mt(), this.matrixAutoUpdate = Nt.DEFAULT_MATRIX_AUTO_UPDATE, this.matrixWorldAutoUpdate = Nt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE, this.matrixWorldNeedsUpdate = !1, this.layers = new Sy(), this.visible = !0, this.castShadow = !1, this.receiveShadow = !1, this.frustumCulled = !0, this.renderOrder = 0, this.animations = [], this.userData = {};
  }
  onBeforeShadow() {
  }
  onAfterShadow() {
  }
  onBeforeRender() {
  }
  onAfterRender() {
  }
  applyMatrix4(e) {
    this.matrixAutoUpdate && this.updateMatrix(), this.matrix.premultiply(e), this.matrix.decompose(this.position, this.quaternion, this.scale);
  }
  applyQuaternion(e) {
    return this.quaternion.premultiply(e), this;
  }
  setRotationFromAxisAngle(e, n) {
    this.quaternion.setFromAxisAngle(e, n);
  }
  setRotationFromEuler(e) {
    this.quaternion.setFromEuler(e, !0);
  }
  setRotationFromMatrix(e) {
    this.quaternion.setFromRotationMatrix(e);
  }
  setRotationFromQuaternion(e) {
    this.quaternion.copy(e);
  }
  rotateOnAxis(e, n) {
    return bs.setFromAxisAngle(e, n), this.quaternion.multiply(bs), this;
  }
  rotateOnWorldAxis(e, n) {
    return bs.setFromAxisAngle(e, n), this.quaternion.premultiply(bs), this;
  }
  rotateX(e) {
    return this.rotateOnAxis(ev, e);
  }
  rotateY(e) {
    return this.rotateOnAxis(tv, e);
  }
  rotateZ(e) {
    return this.rotateOnAxis(nv, e);
  }
  translateOnAxis(e, n) {
    return Jg.copy(e).applyQuaternion(this.quaternion), this.position.add(Jg.multiplyScalar(n)), this;
  }
  translateX(e) {
    return this.translateOnAxis(ev, e);
  }
  translateY(e) {
    return this.translateOnAxis(tv, e);
  }
  translateZ(e) {
    return this.translateOnAxis(nv, e);
  }
  localToWorld(e) {
    return this.updateWorldMatrix(!0, !1), e.applyMatrix4(this.matrixWorld);
  }
  worldToLocal(e) {
    return this.updateWorldMatrix(!0, !1), e.applyMatrix4(Di.copy(this.matrixWorld).invert());
  }
  lookAt(e, n, i) {
    e.isVector3 ? Tl.copy(e) : Tl.set(e, n, i);
    const r = this.parent;
    this.updateWorldMatrix(!0, !1), Ko.setFromMatrixPosition(this.matrixWorld), this.isCamera || this.isLight ? Di.lookAt(Ko, Tl, this.up) : Di.lookAt(Tl, Ko, this.up), this.quaternion.setFromRotationMatrix(Di), r && (Di.extractRotation(r.matrixWorld), bs.setFromRotationMatrix(Di), this.quaternion.premultiply(bs.invert()));
  }
  add(e) {
    if (arguments.length > 1) {
      for (let n = 0; n < arguments.length; n++)
        this.add(arguments[n]);
      return this;
    }
    return e === this ? (console.error("THREE.Object3D.add: object can't be added as a child of itself.", e), this) : (e && e.isObject3D ? (e.removeFromParent(), e.parent = this, this.children.push(e), e.dispatchEvent(iv), Ps.child = e, this.dispatchEvent(Ps), Ps.child = null) : console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.", e), this);
  }
  remove(e) {
    if (arguments.length > 1) {
      for (let i = 0; i < arguments.length; i++)
        this.remove(arguments[i]);
      return this;
    }
    const n = this.children.indexOf(e);
    return n !== -1 && (e.parent = null, this.children.splice(n, 1), e.dispatchEvent(yw), Cf.child = e, this.dispatchEvent(Cf), Cf.child = null), this;
  }
  removeFromParent() {
    const e = this.parent;
    return e !== null && e.remove(this), this;
  }
  clear() {
    return this.remove(...this.children);
  }
  attach(e) {
    return this.updateWorldMatrix(!0, !1), Di.copy(this.matrixWorld).invert(), e.parent !== null && (e.parent.updateWorldMatrix(!0, !1), Di.multiply(e.parent.matrixWorld)), e.applyMatrix4(Di), e.removeFromParent(), e.parent = this, this.children.push(e), e.updateWorldMatrix(!1, !0), e.dispatchEvent(iv), Ps.child = e, this.dispatchEvent(Ps), Ps.child = null, this;
  }
  getObjectById(e) {
    return this.getObjectByProperty("id", e);
  }
  getObjectByName(e) {
    return this.getObjectByProperty("name", e);
  }
  getObjectByProperty(e, n) {
    if (this[e] === n) return this;
    for (let i = 0, r = this.children.length; i < r; i++) {
      const o = this.children[i].getObjectByProperty(e, n);
      if (o !== void 0)
        return o;
    }
  }
  getObjectsByProperty(e, n, i = []) {
    this[e] === n && i.push(this);
    const r = this.children;
    for (let s = 0, o = r.length; s < o; s++)
      r[s].getObjectsByProperty(e, n, i);
    return i;
  }
  getWorldPosition(e) {
    return this.updateWorldMatrix(!0, !1), e.setFromMatrixPosition(this.matrixWorld);
  }
  getWorldQuaternion(e) {
    return this.updateWorldMatrix(!0, !1), this.matrixWorld.decompose(Ko, e, _w), e;
  }
  getWorldScale(e) {
    return this.updateWorldMatrix(!0, !1), this.matrixWorld.decompose(Ko, xw, e), e;
  }
  getWorldDirection(e) {
    this.updateWorldMatrix(!0, !1);
    const n = this.matrixWorld.elements;
    return e.set(n[8], n[9], n[10]).normalize();
  }
  raycast() {
  }
  traverse(e) {
    e(this);
    const n = this.children;
    for (let i = 0, r = n.length; i < r; i++)
      n[i].traverse(e);
  }
  traverseVisible(e) {
    if (this.visible === !1) return;
    e(this);
    const n = this.children;
    for (let i = 0, r = n.length; i < r; i++)
      n[i].traverseVisible(e);
  }
  traverseAncestors(e) {
    const n = this.parent;
    n !== null && (e(n), n.traverseAncestors(e));
  }
  updateMatrix() {
    this.matrix.compose(this.position, this.quaternion, this.scale), this.matrixWorldNeedsUpdate = !0;
  }
  updateMatrixWorld(e) {
    this.matrixAutoUpdate && this.updateMatrix(), (this.matrixWorldNeedsUpdate || e) && (this.matrixWorldAutoUpdate === !0 && (this.parent === null ? this.matrixWorld.copy(this.matrix) : this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix)), this.matrixWorldNeedsUpdate = !1, e = !0);
    const n = this.children;
    for (let i = 0, r = n.length; i < r; i++)
      n[i].updateMatrixWorld(e);
  }
  updateWorldMatrix(e, n) {
    const i = this.parent;
    if (e === !0 && i !== null && i.updateWorldMatrix(!0, !1), this.matrixAutoUpdate && this.updateMatrix(), this.matrixWorldAutoUpdate === !0 && (this.parent === null ? this.matrixWorld.copy(this.matrix) : this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix)), n === !0) {
      const r = this.children;
      for (let s = 0, o = r.length; s < o; s++)
        r[s].updateWorldMatrix(!1, !0);
    }
  }
  toJSON(e) {
    const n = e === void 0 || typeof e == "string", i = {};
    n && (e = {
      geometries: {},
      materials: {},
      textures: {},
      images: {},
      shapes: {},
      skeletons: {},
      animations: {},
      nodes: {}
    }, i.metadata = {
      version: 4.6,
      type: "Object",
      generator: "Object3D.toJSON"
    });
    const r = {};
    r.uuid = this.uuid, r.type = this.type, this.name !== "" && (r.name = this.name), this.castShadow === !0 && (r.castShadow = !0), this.receiveShadow === !0 && (r.receiveShadow = !0), this.visible === !1 && (r.visible = !1), this.frustumCulled === !1 && (r.frustumCulled = !1), this.renderOrder !== 0 && (r.renderOrder = this.renderOrder), Object.keys(this.userData).length > 0 && (r.userData = this.userData), r.layers = this.layers.mask, r.matrix = this.matrix.toArray(), r.up = this.up.toArray(), this.matrixAutoUpdate === !1 && (r.matrixAutoUpdate = !1), this.isInstancedMesh && (r.type = "InstancedMesh", r.count = this.count, r.instanceMatrix = this.instanceMatrix.toJSON(), this.instanceColor !== null && (r.instanceColor = this.instanceColor.toJSON())), this.isBatchedMesh && (r.type = "BatchedMesh", r.perObjectFrustumCulled = this.perObjectFrustumCulled, r.sortObjects = this.sortObjects, r.drawRanges = this._drawRanges, r.reservedRanges = this._reservedRanges, r.visibility = this._visibility, r.active = this._active, r.bounds = this._bounds.map((a) => ({
      boxInitialized: a.boxInitialized,
      boxMin: a.box.min.toArray(),
      boxMax: a.box.max.toArray(),
      sphereInitialized: a.sphereInitialized,
      sphereRadius: a.sphere.radius,
      sphereCenter: a.sphere.center.toArray()
    })), r.maxInstanceCount = this._maxInstanceCount, r.maxVertexCount = this._maxVertexCount, r.maxIndexCount = this._maxIndexCount, r.geometryInitialized = this._geometryInitialized, r.geometryCount = this._geometryCount, r.matricesTexture = this._matricesTexture.toJSON(e), this._colorsTexture !== null && (r.colorsTexture = this._colorsTexture.toJSON(e)), this.boundingSphere !== null && (r.boundingSphere = {
      center: r.boundingSphere.center.toArray(),
      radius: r.boundingSphere.radius
    }), this.boundingBox !== null && (r.boundingBox = {
      min: r.boundingBox.min.toArray(),
      max: r.boundingBox.max.toArray()
    }));
    function s(a, l) {
      return a[l.uuid] === void 0 && (a[l.uuid] = l.toJSON(e)), l.uuid;
    }
    if (this.isScene)
      this.background && (this.background.isColor ? r.background = this.background.toJSON() : this.background.isTexture && (r.background = this.background.toJSON(e).uuid)), this.environment && this.environment.isTexture && this.environment.isRenderTargetTexture !== !0 && (r.environment = this.environment.toJSON(e).uuid);
    else if (this.isMesh || this.isLine || this.isPoints) {
      r.geometry = s(e.geometries, this.geometry);
      const a = this.geometry.parameters;
      if (a !== void 0 && a.shapes !== void 0) {
        const l = a.shapes;
        if (Array.isArray(l))
          for (let u = 0, c = l.length; u < c; u++) {
            const d = l[u];
            s(e.shapes, d);
          }
        else
          s(e.shapes, l);
      }
    }
    if (this.isSkinnedMesh && (r.bindMode = this.bindMode, r.bindMatrix = this.bindMatrix.toArray(), this.skeleton !== void 0 && (s(e.skeletons, this.skeleton), r.skeleton = this.skeleton.uuid)), this.material !== void 0)
      if (Array.isArray(this.material)) {
        const a = [];
        for (let l = 0, u = this.material.length; l < u; l++)
          a.push(s(e.materials, this.material[l]));
        r.material = a;
      } else
        r.material = s(e.materials, this.material);
    if (this.children.length > 0) {
      r.children = [];
      for (let a = 0; a < this.children.length; a++)
        r.children.push(this.children[a].toJSON(e).object);
    }
    if (this.animations.length > 0) {
      r.animations = [];
      for (let a = 0; a < this.animations.length; a++) {
        const l = this.animations[a];
        r.animations.push(s(e.animations, l));
      }
    }
    if (n) {
      const a = o(e.geometries), l = o(e.materials), u = o(e.textures), c = o(e.images), d = o(e.shapes), h = o(e.skeletons), p = o(e.animations), _ = o(e.nodes);
      a.length > 0 && (i.geometries = a), l.length > 0 && (i.materials = l), u.length > 0 && (i.textures = u), c.length > 0 && (i.images = c), d.length > 0 && (i.shapes = d), h.length > 0 && (i.skeletons = h), p.length > 0 && (i.animations = p), _.length > 0 && (i.nodes = _);
    }
    return i.object = r, i;
    function o(a) {
      const l = [];
      for (const u in a) {
        const c = a[u];
        delete c.metadata, l.push(c);
      }
      return l;
    }
  }
  clone(e) {
    return new this.constructor().copy(this, e);
  }
  copy(e, n = !0) {
    if (this.name = e.name, this.up.copy(e.up), this.position.copy(e.position), this.rotation.order = e.rotation.order, this.quaternion.copy(e.quaternion), this.scale.copy(e.scale), this.matrix.copy(e.matrix), this.matrixWorld.copy(e.matrixWorld), this.matrixAutoUpdate = e.matrixAutoUpdate, this.matrixWorldAutoUpdate = e.matrixWorldAutoUpdate, this.matrixWorldNeedsUpdate = e.matrixWorldNeedsUpdate, this.layers.mask = e.layers.mask, this.visible = e.visible, this.castShadow = e.castShadow, this.receiveShadow = e.receiveShadow, this.frustumCulled = e.frustumCulled, this.renderOrder = e.renderOrder, this.animations = e.animations.slice(), this.userData = JSON.parse(JSON.stringify(e.userData)), n === !0)
      for (let i = 0; i < e.children.length; i++) {
        const r = e.children[i];
        this.add(r.clone());
      }
    return this;
  }
}
Nt.DEFAULT_UP = /* @__PURE__ */ new k(0, 1, 0);
Nt.DEFAULT_MATRIX_AUTO_UPDATE = !0;
Nt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE = !0;
const oi = /* @__PURE__ */ new k(), Ii = /* @__PURE__ */ new k(), Af = /* @__PURE__ */ new k(), Ni = /* @__PURE__ */ new k(), Ls = /* @__PURE__ */ new k(), Ds = /* @__PURE__ */ new k(), rv = /* @__PURE__ */ new k(), Rf = /* @__PURE__ */ new k(), bf = /* @__PURE__ */ new k(), Pf = /* @__PURE__ */ new k(), Lf = /* @__PURE__ */ new St(), Df = /* @__PURE__ */ new St(), If = /* @__PURE__ */ new St();
class fi {
  constructor(e = new k(), n = new k(), i = new k()) {
    this.a = e, this.b = n, this.c = i;
  }
  static getNormal(e, n, i, r) {
    r.subVectors(i, n), oi.subVectors(e, n), r.cross(oi);
    const s = r.lengthSq();
    return s > 0 ? r.multiplyScalar(1 / Math.sqrt(s)) : r.set(0, 0, 0);
  }
  // static/instance method to calculate barycentric coordinates
  // based on: http://www.blackpawn.com/texts/pointinpoly/default.html
  static getBarycoord(e, n, i, r, s) {
    oi.subVectors(r, n), Ii.subVectors(i, n), Af.subVectors(e, n);
    const o = oi.dot(oi), a = oi.dot(Ii), l = oi.dot(Af), u = Ii.dot(Ii), c = Ii.dot(Af), d = o * u - a * a;
    if (d === 0)
      return s.set(0, 0, 0), null;
    const h = 1 / d, p = (u * l - a * c) * h, _ = (o * c - a * l) * h;
    return s.set(1 - p - _, _, p);
  }
  static containsPoint(e, n, i, r) {
    return this.getBarycoord(e, n, i, r, Ni) === null ? !1 : Ni.x >= 0 && Ni.y >= 0 && Ni.x + Ni.y <= 1;
  }
  static getInterpolation(e, n, i, r, s, o, a, l) {
    return this.getBarycoord(e, n, i, r, Ni) === null ? (l.x = 0, l.y = 0, "z" in l && (l.z = 0), "w" in l && (l.w = 0), null) : (l.setScalar(0), l.addScaledVector(s, Ni.x), l.addScaledVector(o, Ni.y), l.addScaledVector(a, Ni.z), l);
  }
  static getInterpolatedAttribute(e, n, i, r, s, o) {
    return Lf.setScalar(0), Df.setScalar(0), If.setScalar(0), Lf.fromBufferAttribute(e, n), Df.fromBufferAttribute(e, i), If.fromBufferAttribute(e, r), o.setScalar(0), o.addScaledVector(Lf, s.x), o.addScaledVector(Df, s.y), o.addScaledVector(If, s.z), o;
  }
  static isFrontFacing(e, n, i, r) {
    return oi.subVectors(i, n), Ii.subVectors(e, n), oi.cross(Ii).dot(r) < 0;
  }
  set(e, n, i) {
    return this.a.copy(e), this.b.copy(n), this.c.copy(i), this;
  }
  setFromPointsAndIndices(e, n, i, r) {
    return this.a.copy(e[n]), this.b.copy(e[i]), this.c.copy(e[r]), this;
  }
  setFromAttributeAndIndices(e, n, i, r) {
    return this.a.fromBufferAttribute(e, n), this.b.fromBufferAttribute(e, i), this.c.fromBufferAttribute(e, r), this;
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(e) {
    return this.a.copy(e.a), this.b.copy(e.b), this.c.copy(e.c), this;
  }
  getArea() {
    return oi.subVectors(this.c, this.b), Ii.subVectors(this.a, this.b), oi.cross(Ii).length() * 0.5;
  }
  getMidpoint(e) {
    return e.addVectors(this.a, this.b).add(this.c).multiplyScalar(1 / 3);
  }
  getNormal(e) {
    return fi.getNormal(this.a, this.b, this.c, e);
  }
  getPlane(e) {
    return e.setFromCoplanarPoints(this.a, this.b, this.c);
  }
  getBarycoord(e, n) {
    return fi.getBarycoord(e, this.a, this.b, this.c, n);
  }
  getInterpolation(e, n, i, r, s) {
    return fi.getInterpolation(e, this.a, this.b, this.c, n, i, r, s);
  }
  containsPoint(e) {
    return fi.containsPoint(e, this.a, this.b, this.c);
  }
  isFrontFacing(e) {
    return fi.isFrontFacing(this.a, this.b, this.c, e);
  }
  intersectsBox(e) {
    return e.intersectsTriangle(this);
  }
  closestPointToPoint(e, n) {
    const i = this.a, r = this.b, s = this.c;
    let o, a;
    Ls.subVectors(r, i), Ds.subVectors(s, i), Rf.subVectors(e, i);
    const l = Ls.dot(Rf), u = Ds.dot(Rf);
    if (l <= 0 && u <= 0)
      return n.copy(i);
    bf.subVectors(e, r);
    const c = Ls.dot(bf), d = Ds.dot(bf);
    if (c >= 0 && d <= c)
      return n.copy(r);
    const h = l * d - c * u;
    if (h <= 0 && l >= 0 && c <= 0)
      return o = l / (l - c), n.copy(i).addScaledVector(Ls, o);
    Pf.subVectors(e, s);
    const p = Ls.dot(Pf), _ = Ds.dot(Pf);
    if (_ >= 0 && p <= _)
      return n.copy(s);
    const y = p * u - l * _;
    if (y <= 0 && u >= 0 && _ <= 0)
      return a = u / (u - _), n.copy(i).addScaledVector(Ds, a);
    const m = c * _ - p * d;
    if (m <= 0 && d - c >= 0 && p - _ >= 0)
      return rv.subVectors(s, r), a = (d - c) / (d - c + (p - _)), n.copy(r).addScaledVector(rv, a);
    const f = 1 / (m + y + h);
    return o = y * f, a = h * f, n.copy(i).addScaledVector(Ls, o).addScaledVector(Ds, a);
  }
  equals(e) {
    return e.a.equals(this.a) && e.b.equals(this.b) && e.c.equals(this.c);
  }
}
const My = {
  aliceblue: 15792383,
  antiquewhite: 16444375,
  aqua: 65535,
  aquamarine: 8388564,
  azure: 15794175,
  beige: 16119260,
  bisque: 16770244,
  black: 0,
  blanchedalmond: 16772045,
  blue: 255,
  blueviolet: 9055202,
  brown: 10824234,
  burlywood: 14596231,
  cadetblue: 6266528,
  chartreuse: 8388352,
  chocolate: 13789470,
  coral: 16744272,
  cornflowerblue: 6591981,
  cornsilk: 16775388,
  crimson: 14423100,
  cyan: 65535,
  darkblue: 139,
  darkcyan: 35723,
  darkgoldenrod: 12092939,
  darkgray: 11119017,
  darkgreen: 25600,
  darkgrey: 11119017,
  darkkhaki: 12433259,
  darkmagenta: 9109643,
  darkolivegreen: 5597999,
  darkorange: 16747520,
  darkorchid: 10040012,
  darkred: 9109504,
  darksalmon: 15308410,
  darkseagreen: 9419919,
  darkslateblue: 4734347,
  darkslategray: 3100495,
  darkslategrey: 3100495,
  darkturquoise: 52945,
  darkviolet: 9699539,
  deeppink: 16716947,
  deepskyblue: 49151,
  dimgray: 6908265,
  dimgrey: 6908265,
  dodgerblue: 2003199,
  firebrick: 11674146,
  floralwhite: 16775920,
  forestgreen: 2263842,
  fuchsia: 16711935,
  gainsboro: 14474460,
  ghostwhite: 16316671,
  gold: 16766720,
  goldenrod: 14329120,
  gray: 8421504,
  green: 32768,
  greenyellow: 11403055,
  grey: 8421504,
  honeydew: 15794160,
  hotpink: 16738740,
  indianred: 13458524,
  indigo: 4915330,
  ivory: 16777200,
  khaki: 15787660,
  lavender: 15132410,
  lavenderblush: 16773365,
  lawngreen: 8190976,
  lemonchiffon: 16775885,
  lightblue: 11393254,
  lightcoral: 15761536,
  lightcyan: 14745599,
  lightgoldenrodyellow: 16448210,
  lightgray: 13882323,
  lightgreen: 9498256,
  lightgrey: 13882323,
  lightpink: 16758465,
  lightsalmon: 16752762,
  lightseagreen: 2142890,
  lightskyblue: 8900346,
  lightslategray: 7833753,
  lightslategrey: 7833753,
  lightsteelblue: 11584734,
  lightyellow: 16777184,
  lime: 65280,
  limegreen: 3329330,
  linen: 16445670,
  magenta: 16711935,
  maroon: 8388608,
  mediumaquamarine: 6737322,
  mediumblue: 205,
  mediumorchid: 12211667,
  mediumpurple: 9662683,
  mediumseagreen: 3978097,
  mediumslateblue: 8087790,
  mediumspringgreen: 64154,
  mediumturquoise: 4772300,
  mediumvioletred: 13047173,
  midnightblue: 1644912,
  mintcream: 16121850,
  mistyrose: 16770273,
  moccasin: 16770229,
  navajowhite: 16768685,
  navy: 128,
  oldlace: 16643558,
  olive: 8421376,
  olivedrab: 7048739,
  orange: 16753920,
  orangered: 16729344,
  orchid: 14315734,
  palegoldenrod: 15657130,
  palegreen: 10025880,
  paleturquoise: 11529966,
  palevioletred: 14381203,
  papayawhip: 16773077,
  peachpuff: 16767673,
  peru: 13468991,
  pink: 16761035,
  plum: 14524637,
  powderblue: 11591910,
  purple: 8388736,
  rebeccapurple: 6697881,
  red: 16711680,
  rosybrown: 12357519,
  royalblue: 4286945,
  saddlebrown: 9127187,
  salmon: 16416882,
  sandybrown: 16032864,
  seagreen: 3050327,
  seashell: 16774638,
  sienna: 10506797,
  silver: 12632256,
  skyblue: 8900331,
  slateblue: 6970061,
  slategray: 7372944,
  slategrey: 7372944,
  snow: 16775930,
  springgreen: 65407,
  steelblue: 4620980,
  tan: 13808780,
  teal: 32896,
  thistle: 14204888,
  tomato: 16737095,
  turquoise: 4251856,
  violet: 15631086,
  wheat: 16113331,
  white: 16777215,
  whitesmoke: 16119285,
  yellow: 16776960,
  yellowgreen: 10145074
}, cr = { h: 0, s: 0, l: 0 }, Cl = { h: 0, s: 0, l: 0 };
function Nf(t, e, n) {
  return n < 0 && (n += 1), n > 1 && (n -= 1), n < 1 / 6 ? t + (e - t) * 6 * n : n < 1 / 2 ? e : n < 2 / 3 ? t + (e - t) * 6 * (2 / 3 - n) : t;
}
class Ve {
  constructor(e, n, i) {
    return this.isColor = !0, this.r = 1, this.g = 1, this.b = 1, this.set(e, n, i);
  }
  set(e, n, i) {
    if (n === void 0 && i === void 0) {
      const r = e;
      r && r.isColor ? this.copy(r) : typeof r == "number" ? this.setHex(r) : typeof r == "string" && this.setStyle(r);
    } else
      this.setRGB(e, n, i);
    return this;
  }
  setScalar(e) {
    return this.r = e, this.g = e, this.b = e, this;
  }
  setHex(e, n = rn) {
    return e = Math.floor(e), this.r = (e >> 16 & 255) / 255, this.g = (e >> 8 & 255) / 255, this.b = (e & 255) / 255, Je.toWorkingColorSpace(this, n), this;
  }
  setRGB(e, n, i, r = Je.workingColorSpace) {
    return this.r = e, this.g = n, this.b = i, Je.toWorkingColorSpace(this, r), this;
  }
  setHSL(e, n, i, r = Je.workingColorSpace) {
    if (e = nw(e, 1), n = xn(n, 0, 1), i = xn(i, 0, 1), n === 0)
      this.r = this.g = this.b = i;
    else {
      const s = i <= 0.5 ? i * (1 + n) : i + n - i * n, o = 2 * i - s;
      this.r = Nf(o, s, e + 1 / 3), this.g = Nf(o, s, e), this.b = Nf(o, s, e - 1 / 3);
    }
    return Je.toWorkingColorSpace(this, r), this;
  }
  setStyle(e, n = rn) {
    function i(s) {
      s !== void 0 && parseFloat(s) < 1 && console.warn("THREE.Color: Alpha component of " + e + " will be ignored.");
    }
    let r;
    if (r = /^(\w+)\(([^\)]*)\)/.exec(e)) {
      let s;
      const o = r[1], a = r[2];
      switch (o) {
        case "rgb":
        case "rgba":
          if (s = /^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))
            return i(s[4]), this.setRGB(
              Math.min(255, parseInt(s[1], 10)) / 255,
              Math.min(255, parseInt(s[2], 10)) / 255,
              Math.min(255, parseInt(s[3], 10)) / 255,
              n
            );
          if (s = /^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))
            return i(s[4]), this.setRGB(
              Math.min(100, parseInt(s[1], 10)) / 100,
              Math.min(100, parseInt(s[2], 10)) / 100,
              Math.min(100, parseInt(s[3], 10)) / 100,
              n
            );
          break;
        case "hsl":
        case "hsla":
          if (s = /^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))
            return i(s[4]), this.setHSL(
              parseFloat(s[1]) / 360,
              parseFloat(s[2]) / 100,
              parseFloat(s[3]) / 100,
              n
            );
          break;
        default:
          console.warn("THREE.Color: Unknown color model " + e);
      }
    } else if (r = /^\#([A-Fa-f\d]+)$/.exec(e)) {
      const s = r[1], o = s.length;
      if (o === 3)
        return this.setRGB(
          parseInt(s.charAt(0), 16) / 15,
          parseInt(s.charAt(1), 16) / 15,
          parseInt(s.charAt(2), 16) / 15,
          n
        );
      if (o === 6)
        return this.setHex(parseInt(s, 16), n);
      console.warn("THREE.Color: Invalid hex color " + e);
    } else if (e && e.length > 0)
      return this.setColorName(e, n);
    return this;
  }
  setColorName(e, n = rn) {
    const i = My[e.toLowerCase()];
    return i !== void 0 ? this.setHex(i, n) : console.warn("THREE.Color: Unknown color " + e), this;
  }
  clone() {
    return new this.constructor(this.r, this.g, this.b);
  }
  copy(e) {
    return this.r = e.r, this.g = e.g, this.b = e.b, this;
  }
  copySRGBToLinear(e) {
    return this.r = ao(e.r), this.g = ao(e.g), this.b = ao(e.b), this;
  }
  copyLinearToSRGB(e) {
    return this.r = _f(e.r), this.g = _f(e.g), this.b = _f(e.b), this;
  }
  convertSRGBToLinear() {
    return this.copySRGBToLinear(this), this;
  }
  convertLinearToSRGB() {
    return this.copyLinearToSRGB(this), this;
  }
  getHex(e = rn) {
    return Je.fromWorkingColorSpace(Qt.copy(this), e), Math.round(xn(Qt.r * 255, 0, 255)) * 65536 + Math.round(xn(Qt.g * 255, 0, 255)) * 256 + Math.round(xn(Qt.b * 255, 0, 255));
  }
  getHexString(e = rn) {
    return ("000000" + this.getHex(e).toString(16)).slice(-6);
  }
  getHSL(e, n = Je.workingColorSpace) {
    Je.fromWorkingColorSpace(Qt.copy(this), n);
    const i = Qt.r, r = Qt.g, s = Qt.b, o = Math.max(i, r, s), a = Math.min(i, r, s);
    let l, u;
    const c = (a + o) / 2;
    if (a === o)
      l = 0, u = 0;
    else {
      const d = o - a;
      switch (u = c <= 0.5 ? d / (o + a) : d / (2 - o - a), o) {
        case i:
          l = (r - s) / d + (r < s ? 6 : 0);
          break;
        case r:
          l = (s - i) / d + 2;
          break;
        case s:
          l = (i - r) / d + 4;
          break;
      }
      l /= 6;
    }
    return e.h = l, e.s = u, e.l = c, e;
  }
  getRGB(e, n = Je.workingColorSpace) {
    return Je.fromWorkingColorSpace(Qt.copy(this), n), e.r = Qt.r, e.g = Qt.g, e.b = Qt.b, e;
  }
  getStyle(e = rn) {
    Je.fromWorkingColorSpace(Qt.copy(this), e);
    const n = Qt.r, i = Qt.g, r = Qt.b;
    return e !== rn ? `color(${e} ${n.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})` : `rgb(${Math.round(n * 255)},${Math.round(i * 255)},${Math.round(r * 255)})`;
  }
  offsetHSL(e, n, i) {
    return this.getHSL(cr), this.setHSL(cr.h + e, cr.s + n, cr.l + i);
  }
  add(e) {
    return this.r += e.r, this.g += e.g, this.b += e.b, this;
  }
  addColors(e, n) {
    return this.r = e.r + n.r, this.g = e.g + n.g, this.b = e.b + n.b, this;
  }
  addScalar(e) {
    return this.r += e, this.g += e, this.b += e, this;
  }
  sub(e) {
    return this.r = Math.max(0, this.r - e.r), this.g = Math.max(0, this.g - e.g), this.b = Math.max(0, this.b - e.b), this;
  }
  multiply(e) {
    return this.r *= e.r, this.g *= e.g, this.b *= e.b, this;
  }
  multiplyScalar(e) {
    return this.r *= e, this.g *= e, this.b *= e, this;
  }
  lerp(e, n) {
    return this.r += (e.r - this.r) * n, this.g += (e.g - this.g) * n, this.b += (e.b - this.b) * n, this;
  }
  lerpColors(e, n, i) {
    return this.r = e.r + (n.r - e.r) * i, this.g = e.g + (n.g - e.g) * i, this.b = e.b + (n.b - e.b) * i, this;
  }
  lerpHSL(e, n) {
    this.getHSL(cr), e.getHSL(Cl);
    const i = gf(cr.h, Cl.h, n), r = gf(cr.s, Cl.s, n), s = gf(cr.l, Cl.l, n);
    return this.setHSL(i, r, s), this;
  }
  setFromVector3(e) {
    return this.r = e.x, this.g = e.y, this.b = e.z, this;
  }
  applyMatrix3(e) {
    const n = this.r, i = this.g, r = this.b, s = e.elements;
    return this.r = s[0] * n + s[3] * i + s[6] * r, this.g = s[1] * n + s[4] * i + s[7] * r, this.b = s[2] * n + s[5] * i + s[8] * r, this;
  }
  equals(e) {
    return e.r === this.r && e.g === this.g && e.b === this.b;
  }
  fromArray(e, n = 0) {
    return this.r = e[n], this.g = e[n + 1], this.b = e[n + 2], this;
  }
  toArray(e = [], n = 0) {
    return e[n] = this.r, e[n + 1] = this.g, e[n + 2] = this.b, e;
  }
  fromBufferAttribute(e, n) {
    return this.r = e.getX(n), this.g = e.getY(n), this.b = e.getZ(n), this;
  }
  toJSON() {
    return this.getHex();
  }
  *[Symbol.iterator]() {
    yield this.r, yield this.g, yield this.b;
  }
}
const Qt = /* @__PURE__ */ new Ve();
Ve.NAMES = My;
let Sw = 0;
class Qa extends Po {
  constructor() {
    super(), this.isMaterial = !0, Object.defineProperty(this, "id", { value: Sw++ }), this.uuid = qa(), this.name = "", this.type = "Material", this.blending = so, this.side = Ur, this.vertexColors = !1, this.opacity = 1, this.transparent = !1, this.alphaHash = !1, this.blendSrc = qd, this.blendDst = Kd, this.blendEquation = Qr, this.blendSrcAlpha = null, this.blendDstAlpha = null, this.blendEquationAlpha = null, this.blendColor = new Ve(0, 0, 0), this.blendAlpha = 0, this.depthFunc = go, this.depthTest = !0, this.depthWrite = !0, this.stencilWriteMask = 255, this.stencilFunc = Wg, this.stencilRef = 0, this.stencilFuncMask = 255, this.stencilFail = Es, this.stencilZFail = Es, this.stencilZPass = Es, this.stencilWrite = !1, this.clippingPlanes = null, this.clipIntersection = !1, this.clipShadows = !1, this.shadowSide = null, this.colorWrite = !0, this.precision = null, this.polygonOffset = !1, this.polygonOffsetFactor = 0, this.polygonOffsetUnits = 0, this.dithering = !1, this.alphaToCoverage = !1, this.premultipliedAlpha = !1, this.forceSinglePass = !1, this.visible = !0, this.toneMapped = !0, this.userData = {}, this.version = 0, this._alphaTest = 0;
  }
  get alphaTest() {
    return this._alphaTest;
  }
  set alphaTest(e) {
    this._alphaTest > 0 != e > 0 && this.version++, this._alphaTest = e;
  }
  // onBeforeRender and onBeforeCompile only supported in WebGLRenderer
  onBeforeRender() {
  }
  onBeforeCompile() {
  }
  customProgramCacheKey() {
    return this.onBeforeCompile.toString();
  }
  setValues(e) {
    if (e !== void 0)
      for (const n in e) {
        const i = e[n];
        if (i === void 0) {
          console.warn(`THREE.Material: parameter '${n}' has value of undefined.`);
          continue;
        }
        const r = this[n];
        if (r === void 0) {
          console.warn(`THREE.Material: '${n}' is not a property of THREE.${this.type}.`);
          continue;
        }
        r && r.isColor ? r.set(i) : r && r.isVector3 && i && i.isVector3 ? r.copy(i) : this[n] = i;
      }
  }
  toJSON(e) {
    const n = e === void 0 || typeof e == "string";
    n && (e = {
      textures: {},
      images: {}
    });
    const i = {
      metadata: {
        version: 4.6,
        type: "Material",
        generator: "Material.toJSON"
      }
    };
    i.uuid = this.uuid, i.type = this.type, this.name !== "" && (i.name = this.name), this.color && this.color.isColor && (i.color = this.color.getHex()), this.roughness !== void 0 && (i.roughness = this.roughness), this.metalness !== void 0 && (i.metalness = this.metalness), this.sheen !== void 0 && (i.sheen = this.sheen), this.sheenColor && this.sheenColor.isColor && (i.sheenColor = this.sheenColor.getHex()), this.sheenRoughness !== void 0 && (i.sheenRoughness = this.sheenRoughness), this.emissive && this.emissive.isColor && (i.emissive = this.emissive.getHex()), this.emissiveIntensity !== void 0 && this.emissiveIntensity !== 1 && (i.emissiveIntensity = this.emissiveIntensity), this.specular && this.specular.isColor && (i.specular = this.specular.getHex()), this.specularIntensity !== void 0 && (i.specularIntensity = this.specularIntensity), this.specularColor && this.specularColor.isColor && (i.specularColor = this.specularColor.getHex()), this.shininess !== void 0 && (i.shininess = this.shininess), this.clearcoat !== void 0 && (i.clearcoat = this.clearcoat), this.clearcoatRoughness !== void 0 && (i.clearcoatRoughness = this.clearcoatRoughness), this.clearcoatMap && this.clearcoatMap.isTexture && (i.clearcoatMap = this.clearcoatMap.toJSON(e).uuid), this.clearcoatRoughnessMap && this.clearcoatRoughnessMap.isTexture && (i.clearcoatRoughnessMap = this.clearcoatRoughnessMap.toJSON(e).uuid), this.clearcoatNormalMap && this.clearcoatNormalMap.isTexture && (i.clearcoatNormalMap = this.clearcoatNormalMap.toJSON(e).uuid, i.clearcoatNormalScale = this.clearcoatNormalScale.toArray()), this.dispersion !== void 0 && (i.dispersion = this.dispersion), this.iridescence !== void 0 && (i.iridescence = this.iridescence), this.iridescenceIOR !== void 0 && (i.iridescenceIOR = this.iridescenceIOR), this.iridescenceThicknessRange !== void 0 && (i.iridescenceThicknessRange = this.iridescenceThicknessRange), this.iridescenceMap && this.iridescenceMap.isTexture && (i.iridescenceMap = this.iridescenceMap.toJSON(e).uuid), this.iridescenceThicknessMap && this.iridescenceThicknessMap.isTexture && (i.iridescenceThicknessMap = this.iridescenceThicknessMap.toJSON(e).uuid), this.anisotropy !== void 0 && (i.anisotropy = this.anisotropy), this.anisotropyRotation !== void 0 && (i.anisotropyRotation = this.anisotropyRotation), this.anisotropyMap && this.anisotropyMap.isTexture && (i.anisotropyMap = this.anisotropyMap.toJSON(e).uuid), this.map && this.map.isTexture && (i.map = this.map.toJSON(e).uuid), this.matcap && this.matcap.isTexture && (i.matcap = this.matcap.toJSON(e).uuid), this.alphaMap && this.alphaMap.isTexture && (i.alphaMap = this.alphaMap.toJSON(e).uuid), this.lightMap && this.lightMap.isTexture && (i.lightMap = this.lightMap.toJSON(e).uuid, i.lightMapIntensity = this.lightMapIntensity), this.aoMap && this.aoMap.isTexture && (i.aoMap = this.aoMap.toJSON(e).uuid, i.aoMapIntensity = this.aoMapIntensity), this.bumpMap && this.bumpMap.isTexture && (i.bumpMap = this.bumpMap.toJSON(e).uuid, i.bumpScale = this.bumpScale), this.normalMap && this.normalMap.isTexture && (i.normalMap = this.normalMap.toJSON(e).uuid, i.normalMapType = this.normalMapType, i.normalScale = this.normalScale.toArray()), this.displacementMap && this.displacementMap.isTexture && (i.displacementMap = this.displacementMap.toJSON(e).uuid, i.displacementScale = this.displacementScale, i.displacementBias = this.displacementBias), this.roughnessMap && this.roughnessMap.isTexture && (i.roughnessMap = this.roughnessMap.toJSON(e).uuid), this.metalnessMap && this.metalnessMap.isTexture && (i.metalnessMap = this.metalnessMap.toJSON(e).uuid), this.emissiveMap && this.emissiveMap.isTexture && (i.emissiveMap = this.emissiveMap.toJSON(e).uuid), this.specularMap && this.specularMap.isTexture && (i.specularMap = this.specularMap.toJSON(e).uuid), this.specularIntensityMap && this.specularIntensityMap.isTexture && (i.specularIntensityMap = this.specularIntensityMap.toJSON(e).uuid), this.specularColorMap && this.specularColorMap.isTexture && (i.specularColorMap = this.specularColorMap.toJSON(e).uuid), this.envMap && this.envMap.isTexture && (i.envMap = this.envMap.toJSON(e).uuid, this.combine !== void 0 && (i.combine = this.combine)), this.envMapRotation !== void 0 && (i.envMapRotation = this.envMapRotation.toArray()), this.envMapIntensity !== void 0 && (i.envMapIntensity = this.envMapIntensity), this.reflectivity !== void 0 && (i.reflectivity = this.reflectivity), this.refractionRatio !== void 0 && (i.refractionRatio = this.refractionRatio), this.gradientMap && this.gradientMap.isTexture && (i.gradientMap = this.gradientMap.toJSON(e).uuid), this.transmission !== void 0 && (i.transmission = this.transmission), this.transmissionMap && this.transmissionMap.isTexture && (i.transmissionMap = this.transmissionMap.toJSON(e).uuid), this.thickness !== void 0 && (i.thickness = this.thickness), this.thicknessMap && this.thicknessMap.isTexture && (i.thicknessMap = this.thicknessMap.toJSON(e).uuid), this.attenuationDistance !== void 0 && this.attenuationDistance !== 1 / 0 && (i.attenuationDistance = this.attenuationDistance), this.attenuationColor !== void 0 && (i.attenuationColor = this.attenuationColor.getHex()), this.size !== void 0 && (i.size = this.size), this.shadowSide !== null && (i.shadowSide = this.shadowSide), this.sizeAttenuation !== void 0 && (i.sizeAttenuation = this.sizeAttenuation), this.blending !== so && (i.blending = this.blending), this.side !== Ur && (i.side = this.side), this.vertexColors === !0 && (i.vertexColors = !0), this.opacity < 1 && (i.opacity = this.opacity), this.transparent === !0 && (i.transparent = !0), this.blendSrc !== qd && (i.blendSrc = this.blendSrc), this.blendDst !== Kd && (i.blendDst = this.blendDst), this.blendEquation !== Qr && (i.blendEquation = this.blendEquation), this.blendSrcAlpha !== null && (i.blendSrcAlpha = this.blendSrcAlpha), this.blendDstAlpha !== null && (i.blendDstAlpha = this.blendDstAlpha), this.blendEquationAlpha !== null && (i.blendEquationAlpha = this.blendEquationAlpha), this.blendColor && this.blendColor.isColor && (i.blendColor = this.blendColor.getHex()), this.blendAlpha !== 0 && (i.blendAlpha = this.blendAlpha), this.depthFunc !== go && (i.depthFunc = this.depthFunc), this.depthTest === !1 && (i.depthTest = this.depthTest), this.depthWrite === !1 && (i.depthWrite = this.depthWrite), this.colorWrite === !1 && (i.colorWrite = this.colorWrite), this.stencilWriteMask !== 255 && (i.stencilWriteMask = this.stencilWriteMask), this.stencilFunc !== Wg && (i.stencilFunc = this.stencilFunc), this.stencilRef !== 0 && (i.stencilRef = this.stencilRef), this.stencilFuncMask !== 255 && (i.stencilFuncMask = this.stencilFuncMask), this.stencilFail !== Es && (i.stencilFail = this.stencilFail), this.stencilZFail !== Es && (i.stencilZFail = this.stencilZFail), this.stencilZPass !== Es && (i.stencilZPass = this.stencilZPass), this.stencilWrite === !0 && (i.stencilWrite = this.stencilWrite), this.rotation !== void 0 && this.rotation !== 0 && (i.rotation = this.rotation), this.polygonOffset === !0 && (i.polygonOffset = !0), this.polygonOffsetFactor !== 0 && (i.polygonOffsetFactor = this.polygonOffsetFactor), this.polygonOffsetUnits !== 0 && (i.polygonOffsetUnits = this.polygonOffsetUnits), this.linewidth !== void 0 && this.linewidth !== 1 && (i.linewidth = this.linewidth), this.dashSize !== void 0 && (i.dashSize = this.dashSize), this.gapSize !== void 0 && (i.gapSize = this.gapSize), this.scale !== void 0 && (i.scale = this.scale), this.dithering === !0 && (i.dithering = !0), this.alphaTest > 0 && (i.alphaTest = this.alphaTest), this.alphaHash === !0 && (i.alphaHash = !0), this.alphaToCoverage === !0 && (i.alphaToCoverage = !0), this.premultipliedAlpha === !0 && (i.premultipliedAlpha = !0), this.forceSinglePass === !0 && (i.forceSinglePass = !0), this.wireframe === !0 && (i.wireframe = !0), this.wireframeLinewidth > 1 && (i.wireframeLinewidth = this.wireframeLinewidth), this.wireframeLinecap !== "round" && (i.wireframeLinecap = this.wireframeLinecap), this.wireframeLinejoin !== "round" && (i.wireframeLinejoin = this.wireframeLinejoin), this.flatShading === !0 && (i.flatShading = !0), this.visible === !1 && (i.visible = !1), this.toneMapped === !1 && (i.toneMapped = !1), this.fog === !1 && (i.fog = !1), Object.keys(this.userData).length > 0 && (i.userData = this.userData);
    function r(s) {
      const o = [];
      for (const a in s) {
        const l = s[a];
        delete l.metadata, o.push(l);
      }
      return o;
    }
    if (n) {
      const s = r(e.textures), o = r(e.images);
      s.length > 0 && (i.textures = s), o.length > 0 && (i.images = o);
    }
    return i;
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(e) {
    this.name = e.name, this.blending = e.blending, this.side = e.side, this.vertexColors = e.vertexColors, this.opacity = e.opacity, this.transparent = e.transparent, this.blendSrc = e.blendSrc, this.blendDst = e.blendDst, this.blendEquation = e.blendEquation, this.blendSrcAlpha = e.blendSrcAlpha, this.blendDstAlpha = e.blendDstAlpha, this.blendEquationAlpha = e.blendEquationAlpha, this.blendColor.copy(e.blendColor), this.blendAlpha = e.blendAlpha, this.depthFunc = e.depthFunc, this.depthTest = e.depthTest, this.depthWrite = e.depthWrite, this.stencilWriteMask = e.stencilWriteMask, this.stencilFunc = e.stencilFunc, this.stencilRef = e.stencilRef, this.stencilFuncMask = e.stencilFuncMask, this.stencilFail = e.stencilFail, this.stencilZFail = e.stencilZFail, this.stencilZPass = e.stencilZPass, this.stencilWrite = e.stencilWrite;
    const n = e.clippingPlanes;
    let i = null;
    if (n !== null) {
      const r = n.length;
      i = new Array(r);
      for (let s = 0; s !== r; ++s)
        i[s] = n[s].clone();
    }
    return this.clippingPlanes = i, this.clipIntersection = e.clipIntersection, this.clipShadows = e.clipShadows, this.shadowSide = e.shadowSide, this.colorWrite = e.colorWrite, this.precision = e.precision, this.polygonOffset = e.polygonOffset, this.polygonOffsetFactor = e.polygonOffsetFactor, this.polygonOffsetUnits = e.polygonOffsetUnits, this.dithering = e.dithering, this.alphaTest = e.alphaTest, this.alphaHash = e.alphaHash, this.alphaToCoverage = e.alphaToCoverage, this.premultipliedAlpha = e.premultipliedAlpha, this.forceSinglePass = e.forceSinglePass, this.visible = e.visible, this.toneMapped = e.toneMapped, this.userData = JSON.parse(JSON.stringify(e.userData)), this;
  }
  dispose() {
    this.dispatchEvent({ type: "dispose" });
  }
  set needsUpdate(e) {
    e === !0 && this.version++;
  }
  onBuild() {
    console.warn("Material: onBuild() has been removed.");
  }
}
class Zp extends Qa {
  constructor(e) {
    super(), this.isMeshBasicMaterial = !0, this.type = "MeshBasicMaterial", this.color = new Ve(16777215), this.map = null, this.lightMap = null, this.lightMapIntensity = 1, this.aoMap = null, this.aoMapIntensity = 1, this.specularMap = null, this.alphaMap = null, this.envMap = null, this.envMapRotation = new Ri(), this.combine = Jx, this.reflectivity = 1, this.refractionRatio = 0.98, this.wireframe = !1, this.wireframeLinewidth = 1, this.wireframeLinecap = "round", this.wireframeLinejoin = "round", this.fog = !0, this.setValues(e);
  }
  copy(e) {
    return super.copy(e), this.color.copy(e.color), this.map = e.map, this.lightMap = e.lightMap, this.lightMapIntensity = e.lightMapIntensity, this.aoMap = e.aoMap, this.aoMapIntensity = e.aoMapIntensity, this.specularMap = e.specularMap, this.alphaMap = e.alphaMap, this.envMap = e.envMap, this.envMapRotation.copy(e.envMapRotation), this.combine = e.combine, this.reflectivity = e.reflectivity, this.refractionRatio = e.refractionRatio, this.wireframe = e.wireframe, this.wireframeLinewidth = e.wireframeLinewidth, this.wireframeLinecap = e.wireframeLinecap, this.wireframeLinejoin = e.wireframeLinejoin, this.fog = e.fog, this;
  }
}
const Rt = /* @__PURE__ */ new k(), Al = /* @__PURE__ */ new Ie();
class Ai {
  constructor(e, n, i = !1) {
    if (Array.isArray(e))
      throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");
    this.isBufferAttribute = !0, this.name = "", this.array = e, this.itemSize = n, this.count = e !== void 0 ? e.length / n : 0, this.normalized = i, this.usage = $g, this.updateRanges = [], this.gpuType = Wi, this.version = 0;
  }
  onUploadCallback() {
  }
  set needsUpdate(e) {
    e === !0 && this.version++;
  }
  setUsage(e) {
    return this.usage = e, this;
  }
  addUpdateRange(e, n) {
    this.updateRanges.push({ start: e, count: n });
  }
  clearUpdateRanges() {
    this.updateRanges.length = 0;
  }
  copy(e) {
    return this.name = e.name, this.array = new e.array.constructor(e.array), this.itemSize = e.itemSize, this.count = e.count, this.normalized = e.normalized, this.usage = e.usage, this.gpuType = e.gpuType, this;
  }
  copyAt(e, n, i) {
    e *= this.itemSize, i *= n.itemSize;
    for (let r = 0, s = this.itemSize; r < s; r++)
      this.array[e + r] = n.array[i + r];
    return this;
  }
  copyArray(e) {
    return this.array.set(e), this;
  }
  applyMatrix3(e) {
    if (this.itemSize === 2)
      for (let n = 0, i = this.count; n < i; n++)
        Al.fromBufferAttribute(this, n), Al.applyMatrix3(e), this.setXY(n, Al.x, Al.y);
    else if (this.itemSize === 3)
      for (let n = 0, i = this.count; n < i; n++)
        Rt.fromBufferAttribute(this, n), Rt.applyMatrix3(e), this.setXYZ(n, Rt.x, Rt.y, Rt.z);
    return this;
  }
  applyMatrix4(e) {
    for (let n = 0, i = this.count; n < i; n++)
      Rt.fromBufferAttribute(this, n), Rt.applyMatrix4(e), this.setXYZ(n, Rt.x, Rt.y, Rt.z);
    return this;
  }
  applyNormalMatrix(e) {
    for (let n = 0, i = this.count; n < i; n++)
      Rt.fromBufferAttribute(this, n), Rt.applyNormalMatrix(e), this.setXYZ(n, Rt.x, Rt.y, Rt.z);
    return this;
  }
  transformDirection(e) {
    for (let n = 0, i = this.count; n < i; n++)
      Rt.fromBufferAttribute(this, n), Rt.transformDirection(e), this.setXYZ(n, Rt.x, Rt.y, Rt.z);
    return this;
  }
  set(e, n = 0) {
    return this.array.set(e, n), this;
  }
  getComponent(e, n) {
    let i = this.array[e * this.itemSize + n];
    return this.normalized && (i = jo(i, this.array)), i;
  }
  setComponent(e, n, i) {
    return this.normalized && (i = mn(i, this.array)), this.array[e * this.itemSize + n] = i, this;
  }
  getX(e) {
    let n = this.array[e * this.itemSize];
    return this.normalized && (n = jo(n, this.array)), n;
  }
  setX(e, n) {
    return this.normalized && (n = mn(n, this.array)), this.array[e * this.itemSize] = n, this;
  }
  getY(e) {
    let n = this.array[e * this.itemSize + 1];
    return this.normalized && (n = jo(n, this.array)), n;
  }
  setY(e, n) {
    return this.normalized && (n = mn(n, this.array)), this.array[e * this.itemSize + 1] = n, this;
  }
  getZ(e) {
    let n = this.array[e * this.itemSize + 2];
    return this.normalized && (n = jo(n, this.array)), n;
  }
  setZ(e, n) {
    return this.normalized && (n = mn(n, this.array)), this.array[e * this.itemSize + 2] = n, this;
  }
  getW(e) {
    let n = this.array[e * this.itemSize + 3];
    return this.normalized && (n = jo(n, this.array)), n;
  }
  setW(e, n) {
    return this.normalized && (n = mn(n, this.array)), this.array[e * this.itemSize + 3] = n, this;
  }
  setXY(e, n, i) {
    return e *= this.itemSize, this.normalized && (n = mn(n, this.array), i = mn(i, this.array)), this.array[e + 0] = n, this.array[e + 1] = i, this;
  }
  setXYZ(e, n, i, r) {
    return e *= this.itemSize, this.normalized && (n = mn(n, this.array), i = mn(i, this.array), r = mn(r, this.array)), this.array[e + 0] = n, this.array[e + 1] = i, this.array[e + 2] = r, this;
  }
  setXYZW(e, n, i, r, s) {
    return e *= this.itemSize, this.normalized && (n = mn(n, this.array), i = mn(i, this.array), r = mn(r, this.array), s = mn(s, this.array)), this.array[e + 0] = n, this.array[e + 1] = i, this.array[e + 2] = r, this.array[e + 3] = s, this;
  }
  onUpload(e) {
    return this.onUploadCallback = e, this;
  }
  clone() {
    return new this.constructor(this.array, this.itemSize).copy(this);
  }
  toJSON() {
    const e = {
      itemSize: this.itemSize,
      type: this.array.constructor.name,
      array: Array.from(this.array),
      normalized: this.normalized
    };
    return this.name !== "" && (e.name = this.name), this.usage !== $g && (e.usage = this.usage), e;
  }
}
class Ey extends Ai {
  constructor(e, n, i) {
    super(new Uint16Array(e), n, i);
  }
}
class wy extends Ai {
  constructor(e, n, i) {
    super(new Uint32Array(e), n, i);
  }
}
class Jn extends Ai {
  constructor(e, n, i) {
    super(new Float32Array(e), n, i);
  }
}
let Mw = 0;
const $n = /* @__PURE__ */ new Mt(), Uf = /* @__PURE__ */ new Nt(), Is = /* @__PURE__ */ new k(), Pn = /* @__PURE__ */ new Za(), Zo = /* @__PURE__ */ new Za(), Ft = /* @__PURE__ */ new k();
class ir extends Po {
  constructor() {
    super(), this.isBufferGeometry = !0, Object.defineProperty(this, "id", { value: Mw++ }), this.uuid = qa(), this.name = "", this.type = "BufferGeometry", this.index = null, this.attributes = {}, this.morphAttributes = {}, this.morphTargetsRelative = !1, this.groups = [], this.boundingBox = null, this.boundingSphere = null, this.drawRange = { start: 0, count: 1 / 0 }, this.userData = {};
  }
  getIndex() {
    return this.index;
  }
  setIndex(e) {
    return Array.isArray(e) ? this.index = new (_y(e) ? wy : Ey)(e, 1) : this.index = e, this;
  }
  getAttribute(e) {
    return this.attributes[e];
  }
  setAttribute(e, n) {
    return this.attributes[e] = n, this;
  }
  deleteAttribute(e) {
    return delete this.attributes[e], this;
  }
  hasAttribute(e) {
    return this.attributes[e] !== void 0;
  }
  addGroup(e, n, i = 0) {
    this.groups.push({
      start: e,
      count: n,
      materialIndex: i
    });
  }
  clearGroups() {
    this.groups = [];
  }
  setDrawRange(e, n) {
    this.drawRange.start = e, this.drawRange.count = n;
  }
  applyMatrix4(e) {
    const n = this.attributes.position;
    n !== void 0 && (n.applyMatrix4(e), n.needsUpdate = !0);
    const i = this.attributes.normal;
    if (i !== void 0) {
      const s = new Oe().getNormalMatrix(e);
      i.applyNormalMatrix(s), i.needsUpdate = !0;
    }
    const r = this.attributes.tangent;
    return r !== void 0 && (r.transformDirection(e), r.needsUpdate = !0), this.boundingBox !== null && this.computeBoundingBox(), this.boundingSphere !== null && this.computeBoundingSphere(), this;
  }
  applyQuaternion(e) {
    return $n.makeRotationFromQuaternion(e), this.applyMatrix4($n), this;
  }
  rotateX(e) {
    return $n.makeRotationX(e), this.applyMatrix4($n), this;
  }
  rotateY(e) {
    return $n.makeRotationY(e), this.applyMatrix4($n), this;
  }
  rotateZ(e) {
    return $n.makeRotationZ(e), this.applyMatrix4($n), this;
  }
  translate(e, n, i) {
    return $n.makeTranslation(e, n, i), this.applyMatrix4($n), this;
  }
  scale(e, n, i) {
    return $n.makeScale(e, n, i), this.applyMatrix4($n), this;
  }
  lookAt(e) {
    return Uf.lookAt(e), Uf.updateMatrix(), this.applyMatrix4(Uf.matrix), this;
  }
  center() {
    return this.computeBoundingBox(), this.boundingBox.getCenter(Is).negate(), this.translate(Is.x, Is.y, Is.z), this;
  }
  setFromPoints(e) {
    const n = [];
    for (let i = 0, r = e.length; i < r; i++) {
      const s = e[i];
      n.push(s.x, s.y, s.z || 0);
    }
    return this.setAttribute("position", new Jn(n, 3)), this;
  }
  computeBoundingBox() {
    this.boundingBox === null && (this.boundingBox = new Za());
    const e = this.attributes.position, n = this.morphAttributes.position;
    if (e && e.isGLBufferAttribute) {
      console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.", this), this.boundingBox.set(
        new k(-1 / 0, -1 / 0, -1 / 0),
        new k(1 / 0, 1 / 0, 1 / 0)
      );
      return;
    }
    if (e !== void 0) {
      if (this.boundingBox.setFromBufferAttribute(e), n)
        for (let i = 0, r = n.length; i < r; i++) {
          const s = n[i];
          Pn.setFromBufferAttribute(s), this.morphTargetsRelative ? (Ft.addVectors(this.boundingBox.min, Pn.min), this.boundingBox.expandByPoint(Ft), Ft.addVectors(this.boundingBox.max, Pn.max), this.boundingBox.expandByPoint(Ft)) : (this.boundingBox.expandByPoint(Pn.min), this.boundingBox.expandByPoint(Pn.max));
        }
    } else
      this.boundingBox.makeEmpty();
    (isNaN(this.boundingBox.min.x) || isNaN(this.boundingBox.min.y) || isNaN(this.boundingBox.min.z)) && console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.', this);
  }
  computeBoundingSphere() {
    this.boundingSphere === null && (this.boundingSphere = new Kp());
    const e = this.attributes.position, n = this.morphAttributes.position;
    if (e && e.isGLBufferAttribute) {
      console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.", this), this.boundingSphere.set(new k(), 1 / 0);
      return;
    }
    if (e) {
      const i = this.boundingSphere.center;
      if (Pn.setFromBufferAttribute(e), n)
        for (let s = 0, o = n.length; s < o; s++) {
          const a = n[s];
          Zo.setFromBufferAttribute(a), this.morphTargetsRelative ? (Ft.addVectors(Pn.min, Zo.min), Pn.expandByPoint(Ft), Ft.addVectors(Pn.max, Zo.max), Pn.expandByPoint(Ft)) : (Pn.expandByPoint(Zo.min), Pn.expandByPoint(Zo.max));
        }
      Pn.getCenter(i);
      let r = 0;
      for (let s = 0, o = e.count; s < o; s++)
        Ft.fromBufferAttribute(e, s), r = Math.max(r, i.distanceToSquared(Ft));
      if (n)
        for (let s = 0, o = n.length; s < o; s++) {
          const a = n[s], l = this.morphTargetsRelative;
          for (let u = 0, c = a.count; u < c; u++)
            Ft.fromBufferAttribute(a, u), l && (Is.fromBufferAttribute(e, u), Ft.add(Is)), r = Math.max(r, i.distanceToSquared(Ft));
        }
      this.boundingSphere.radius = Math.sqrt(r), isNaN(this.boundingSphere.radius) && console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.', this);
    }
  }
  computeTangents() {
    const e = this.index, n = this.attributes;
    if (e === null || n.position === void 0 || n.normal === void 0 || n.uv === void 0) {
      console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");
      return;
    }
    const i = n.position, r = n.normal, s = n.uv;
    this.hasAttribute("tangent") === !1 && this.setAttribute("tangent", new Ai(new Float32Array(4 * i.count), 4));
    const o = this.getAttribute("tangent"), a = [], l = [];
    for (let R = 0; R < i.count; R++)
      a[R] = new k(), l[R] = new k();
    const u = new k(), c = new k(), d = new k(), h = new Ie(), p = new Ie(), _ = new Ie(), y = new k(), m = new k();
    function f(R, j, x) {
      u.fromBufferAttribute(i, R), c.fromBufferAttribute(i, j), d.fromBufferAttribute(i, x), h.fromBufferAttribute(s, R), p.fromBufferAttribute(s, j), _.fromBufferAttribute(s, x), c.sub(u), d.sub(u), p.sub(h), _.sub(h);
      const w = 1 / (p.x * _.y - _.x * p.y);
      isFinite(w) && (y.copy(c).multiplyScalar(_.y).addScaledVector(d, -p.y).multiplyScalar(w), m.copy(d).multiplyScalar(p.x).addScaledVector(c, -_.x).multiplyScalar(w), a[R].add(y), a[j].add(y), a[x].add(y), l[R].add(m), l[j].add(m), l[x].add(m));
    }
    let v = this.groups;
    v.length === 0 && (v = [{
      start: 0,
      count: e.count
    }]);
    for (let R = 0, j = v.length; R < j; ++R) {
      const x = v[R], w = x.start, H = x.count;
      for (let B = w, G = w + H; B < G; B += 3)
        f(
          e.getX(B + 0),
          e.getX(B + 1),
          e.getX(B + 2)
        );
    }
    const g = new k(), M = new k(), b = new k(), A = new k();
    function T(R) {
      b.fromBufferAttribute(r, R), A.copy(b);
      const j = a[R];
      g.copy(j), g.sub(b.multiplyScalar(b.dot(j))).normalize(), M.crossVectors(A, j);
      const w = M.dot(l[R]) < 0 ? -1 : 1;
      o.setXYZW(R, g.x, g.y, g.z, w);
    }
    for (let R = 0, j = v.length; R < j; ++R) {
      const x = v[R], w = x.start, H = x.count;
      for (let B = w, G = w + H; B < G; B += 3)
        T(e.getX(B + 0)), T(e.getX(B + 1)), T(e.getX(B + 2));
    }
  }
  computeVertexNormals() {
    const e = this.index, n = this.getAttribute("position");
    if (n !== void 0) {
      let i = this.getAttribute("normal");
      if (i === void 0)
        i = new Ai(new Float32Array(n.count * 3), 3), this.setAttribute("normal", i);
      else
        for (let h = 0, p = i.count; h < p; h++)
          i.setXYZ(h, 0, 0, 0);
      const r = new k(), s = new k(), o = new k(), a = new k(), l = new k(), u = new k(), c = new k(), d = new k();
      if (e)
        for (let h = 0, p = e.count; h < p; h += 3) {
          const _ = e.getX(h + 0), y = e.getX(h + 1), m = e.getX(h + 2);
          r.fromBufferAttribute(n, _), s.fromBufferAttribute(n, y), o.fromBufferAttribute(n, m), c.subVectors(o, s), d.subVectors(r, s), c.cross(d), a.fromBufferAttribute(i, _), l.fromBufferAttribute(i, y), u.fromBufferAttribute(i, m), a.add(c), l.add(c), u.add(c), i.setXYZ(_, a.x, a.y, a.z), i.setXYZ(y, l.x, l.y, l.z), i.setXYZ(m, u.x, u.y, u.z);
        }
      else
        for (let h = 0, p = n.count; h < p; h += 3)
          r.fromBufferAttribute(n, h + 0), s.fromBufferAttribute(n, h + 1), o.fromBufferAttribute(n, h + 2), c.subVectors(o, s), d.subVectors(r, s), c.cross(d), i.setXYZ(h + 0, c.x, c.y, c.z), i.setXYZ(h + 1, c.x, c.y, c.z), i.setXYZ(h + 2, c.x, c.y, c.z);
      this.normalizeNormals(), i.needsUpdate = !0;
    }
  }
  normalizeNormals() {
    const e = this.attributes.normal;
    for (let n = 0, i = e.count; n < i; n++)
      Ft.fromBufferAttribute(e, n), Ft.normalize(), e.setXYZ(n, Ft.x, Ft.y, Ft.z);
  }
  toNonIndexed() {
    function e(a, l) {
      const u = a.array, c = a.itemSize, d = a.normalized, h = new u.constructor(l.length * c);
      let p = 0, _ = 0;
      for (let y = 0, m = l.length; y < m; y++) {
        a.isInterleavedBufferAttribute ? p = l[y] * a.data.stride + a.offset : p = l[y] * c;
        for (let f = 0; f < c; f++)
          h[_++] = u[p++];
      }
      return new Ai(h, c, d);
    }
    if (this.index === null)
      return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."), this;
    const n = new ir(), i = this.index.array, r = this.attributes;
    for (const a in r) {
      const l = r[a], u = e(l, i);
      n.setAttribute(a, u);
    }
    const s = this.morphAttributes;
    for (const a in s) {
      const l = [], u = s[a];
      for (let c = 0, d = u.length; c < d; c++) {
        const h = u[c], p = e(h, i);
        l.push(p);
      }
      n.morphAttributes[a] = l;
    }
    n.morphTargetsRelative = this.morphTargetsRelative;
    const o = this.groups;
    for (let a = 0, l = o.length; a < l; a++) {
      const u = o[a];
      n.addGroup(u.start, u.count, u.materialIndex);
    }
    return n;
  }
  toJSON() {
    const e = {
      metadata: {
        version: 4.6,
        type: "BufferGeometry",
        generator: "BufferGeometry.toJSON"
      }
    };
    if (e.uuid = this.uuid, e.type = this.type, this.name !== "" && (e.name = this.name), Object.keys(this.userData).length > 0 && (e.userData = this.userData), this.parameters !== void 0) {
      const l = this.parameters;
      for (const u in l)
        l[u] !== void 0 && (e[u] = l[u]);
      return e;
    }
    e.data = { attributes: {} };
    const n = this.index;
    n !== null && (e.data.index = {
      type: n.array.constructor.name,
      array: Array.prototype.slice.call(n.array)
    });
    const i = this.attributes;
    for (const l in i) {
      const u = i[l];
      e.data.attributes[l] = u.toJSON(e.data);
    }
    const r = {};
    let s = !1;
    for (const l in this.morphAttributes) {
      const u = this.morphAttributes[l], c = [];
      for (let d = 0, h = u.length; d < h; d++) {
        const p = u[d];
        c.push(p.toJSON(e.data));
      }
      c.length > 0 && (r[l] = c, s = !0);
    }
    s && (e.data.morphAttributes = r, e.data.morphTargetsRelative = this.morphTargetsRelative);
    const o = this.groups;
    o.length > 0 && (e.data.groups = JSON.parse(JSON.stringify(o)));
    const a = this.boundingSphere;
    return a !== null && (e.data.boundingSphere = {
      center: a.center.toArray(),
      radius: a.radius
    }), e;
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(e) {
    this.index = null, this.attributes = {}, this.morphAttributes = {}, this.groups = [], this.boundingBox = null, this.boundingSphere = null;
    const n = {};
    this.name = e.name;
    const i = e.index;
    i !== null && this.setIndex(i.clone(n));
    const r = e.attributes;
    for (const u in r) {
      const c = r[u];
      this.setAttribute(u, c.clone(n));
    }
    const s = e.morphAttributes;
    for (const u in s) {
      const c = [], d = s[u];
      for (let h = 0, p = d.length; h < p; h++)
        c.push(d[h].clone(n));
      this.morphAttributes[u] = c;
    }
    this.morphTargetsRelative = e.morphTargetsRelative;
    const o = e.groups;
    for (let u = 0, c = o.length; u < c; u++) {
      const d = o[u];
      this.addGroup(d.start, d.count, d.materialIndex);
    }
    const a = e.boundingBox;
    a !== null && (this.boundingBox = a.clone());
    const l = e.boundingSphere;
    return l !== null && (this.boundingSphere = l.clone()), this.drawRange.start = e.drawRange.start, this.drawRange.count = e.drawRange.count, this.userData = e.userData, this;
  }
  dispose() {
    this.dispatchEvent({ type: "dispose" });
  }
}
const sv = /* @__PURE__ */ new Mt(), Gr = /* @__PURE__ */ new pw(), Rl = /* @__PURE__ */ new Kp(), ov = /* @__PURE__ */ new k(), bl = /* @__PURE__ */ new k(), Pl = /* @__PURE__ */ new k(), Ll = /* @__PURE__ */ new k(), kf = /* @__PURE__ */ new k(), Dl = /* @__PURE__ */ new k(), av = /* @__PURE__ */ new k(), Il = /* @__PURE__ */ new k();
class Sn extends Nt {
  constructor(e = new ir(), n = new Zp()) {
    super(), this.isMesh = !0, this.type = "Mesh", this.geometry = e, this.material = n, this.updateMorphTargets();
  }
  copy(e, n) {
    return super.copy(e, n), e.morphTargetInfluences !== void 0 && (this.morphTargetInfluences = e.morphTargetInfluences.slice()), e.morphTargetDictionary !== void 0 && (this.morphTargetDictionary = Object.assign({}, e.morphTargetDictionary)), this.material = Array.isArray(e.material) ? e.material.slice() : e.material, this.geometry = e.geometry, this;
  }
  updateMorphTargets() {
    const n = this.geometry.morphAttributes, i = Object.keys(n);
    if (i.length > 0) {
      const r = n[i[0]];
      if (r !== void 0) {
        this.morphTargetInfluences = [], this.morphTargetDictionary = {};
        for (let s = 0, o = r.length; s < o; s++) {
          const a = r[s].name || String(s);
          this.morphTargetInfluences.push(0), this.morphTargetDictionary[a] = s;
        }
      }
    }
  }
  getVertexPosition(e, n) {
    const i = this.geometry, r = i.attributes.position, s = i.morphAttributes.position, o = i.morphTargetsRelative;
    n.fromBufferAttribute(r, e);
    const a = this.morphTargetInfluences;
    if (s && a) {
      Dl.set(0, 0, 0);
      for (let l = 0, u = s.length; l < u; l++) {
        const c = a[l], d = s[l];
        c !== 0 && (kf.fromBufferAttribute(d, e), o ? Dl.addScaledVector(kf, c) : Dl.addScaledVector(kf.sub(n), c));
      }
      n.add(Dl);
    }
    return n;
  }
  raycast(e, n) {
    const i = this.geometry, r = this.material, s = this.matrixWorld;
    r !== void 0 && (i.boundingSphere === null && i.computeBoundingSphere(), Rl.copy(i.boundingSphere), Rl.applyMatrix4(s), Gr.copy(e.ray).recast(e.near), !(Rl.containsPoint(Gr.origin) === !1 && (Gr.intersectSphere(Rl, ov) === null || Gr.origin.distanceToSquared(ov) > (e.far - e.near) ** 2)) && (sv.copy(s).invert(), Gr.copy(e.ray).applyMatrix4(sv), !(i.boundingBox !== null && Gr.intersectsBox(i.boundingBox) === !1) && this._computeIntersections(e, n, Gr)));
  }
  _computeIntersections(e, n, i) {
    let r;
    const s = this.geometry, o = this.material, a = s.index, l = s.attributes.position, u = s.attributes.uv, c = s.attributes.uv1, d = s.attributes.normal, h = s.groups, p = s.drawRange;
    if (a !== null)
      if (Array.isArray(o))
        for (let _ = 0, y = h.length; _ < y; _++) {
          const m = h[_], f = o[m.materialIndex], v = Math.max(m.start, p.start), g = Math.min(a.count, Math.min(m.start + m.count, p.start + p.count));
          for (let M = v, b = g; M < b; M += 3) {
            const A = a.getX(M), T = a.getX(M + 1), R = a.getX(M + 2);
            r = Nl(this, f, e, i, u, c, d, A, T, R), r && (r.faceIndex = Math.floor(M / 3), r.face.materialIndex = m.materialIndex, n.push(r));
          }
        }
      else {
        const _ = Math.max(0, p.start), y = Math.min(a.count, p.start + p.count);
        for (let m = _, f = y; m < f; m += 3) {
          const v = a.getX(m), g = a.getX(m + 1), M = a.getX(m + 2);
          r = Nl(this, o, e, i, u, c, d, v, g, M), r && (r.faceIndex = Math.floor(m / 3), n.push(r));
        }
      }
    else if (l !== void 0)
      if (Array.isArray(o))
        for (let _ = 0, y = h.length; _ < y; _++) {
          const m = h[_], f = o[m.materialIndex], v = Math.max(m.start, p.start), g = Math.min(l.count, Math.min(m.start + m.count, p.start + p.count));
          for (let M = v, b = g; M < b; M += 3) {
            const A = M, T = M + 1, R = M + 2;
            r = Nl(this, f, e, i, u, c, d, A, T, R), r && (r.faceIndex = Math.floor(M / 3), r.face.materialIndex = m.materialIndex, n.push(r));
          }
        }
      else {
        const _ = Math.max(0, p.start), y = Math.min(l.count, p.start + p.count);
        for (let m = _, f = y; m < f; m += 3) {
          const v = m, g = m + 1, M = m + 2;
          r = Nl(this, o, e, i, u, c, d, v, g, M), r && (r.faceIndex = Math.floor(m / 3), n.push(r));
        }
      }
  }
}
function Ew(t, e, n, i, r, s, o, a) {
  let l;
  if (e.side === Tn ? l = i.intersectTriangle(o, s, r, !0, a) : l = i.intersectTriangle(r, s, o, e.side === Ur, a), l === null) return null;
  Il.copy(a), Il.applyMatrix4(t.matrixWorld);
  const u = n.ray.origin.distanceTo(Il);
  return u < n.near || u > n.far ? null : {
    distance: u,
    point: Il.clone(),
    object: t
  };
}
function Nl(t, e, n, i, r, s, o, a, l, u) {
  t.getVertexPosition(a, bl), t.getVertexPosition(l, Pl), t.getVertexPosition(u, Ll);
  const c = Ew(t, e, n, i, bl, Pl, Ll, av);
  if (c) {
    const d = new k();
    fi.getBarycoord(av, bl, Pl, Ll, d), r && (c.uv = fi.getInterpolatedAttribute(r, a, l, u, d, new Ie())), s && (c.uv1 = fi.getInterpolatedAttribute(s, a, l, u, d, new Ie())), o && (c.normal = fi.getInterpolatedAttribute(o, a, l, u, d, new k()), c.normal.dot(i.direction) > 0 && c.normal.multiplyScalar(-1));
    const h = {
      a,
      b: l,
      c: u,
      normal: new k(),
      materialIndex: 0
    };
    fi.getNormal(bl, Pl, Ll, h.normal), c.face = h, c.barycoord = d;
  }
  return c;
}
class Lo extends ir {
  constructor(e = 1, n = 1, i = 1, r = 1, s = 1, o = 1) {
    super(), this.type = "BoxGeometry", this.parameters = {
      width: e,
      height: n,
      depth: i,
      widthSegments: r,
      heightSegments: s,
      depthSegments: o
    };
    const a = this;
    r = Math.floor(r), s = Math.floor(s), o = Math.floor(o);
    const l = [], u = [], c = [], d = [];
    let h = 0, p = 0;
    _("z", "y", "x", -1, -1, i, n, e, o, s, 0), _("z", "y", "x", 1, -1, i, n, -e, o, s, 1), _("x", "z", "y", 1, 1, e, i, n, r, o, 2), _("x", "z", "y", 1, -1, e, i, -n, r, o, 3), _("x", "y", "z", 1, -1, e, n, i, r, s, 4), _("x", "y", "z", -1, -1, e, n, -i, r, s, 5), this.setIndex(l), this.setAttribute("position", new Jn(u, 3)), this.setAttribute("normal", new Jn(c, 3)), this.setAttribute("uv", new Jn(d, 2));
    function _(y, m, f, v, g, M, b, A, T, R, j) {
      const x = M / T, w = b / R, H = M / 2, B = b / 2, G = A / 2, Q = T + 1, V = R + 1;
      let ne = 0, L = 0;
      const q = new k();
      for (let Z = 0; Z < V; Z++) {
        const se = Z * w - B;
        for (let Te = 0; Te < Q; Te++) {
          const Ge = Te * x - H;
          q[y] = Ge * v, q[m] = se * g, q[f] = G, u.push(q.x, q.y, q.z), q[y] = 0, q[m] = 0, q[f] = A > 0 ? 1 : -1, c.push(q.x, q.y, q.z), d.push(Te / T), d.push(1 - Z / R), ne += 1;
        }
      }
      for (let Z = 0; Z < R; Z++)
        for (let se = 0; se < T; se++) {
          const Te = h + se + Q * Z, Ge = h + se + Q * (Z + 1), $ = h + (se + 1) + Q * (Z + 1), te = h + (se + 1) + Q * Z;
          l.push(Te, Ge, te), l.push(Ge, $, te), L += 6;
        }
      a.addGroup(p, L, j), p += L, h += ne;
    }
  }
  copy(e) {
    return super.copy(e), this.parameters = Object.assign({}, e.parameters), this;
  }
  static fromJSON(e) {
    return new Lo(e.width, e.height, e.depth, e.widthSegments, e.heightSegments, e.depthSegments);
  }
}
function Mo(t) {
  const e = {};
  for (const n in t) {
    e[n] = {};
    for (const i in t[n]) {
      const r = t[n][i];
      r && (r.isColor || r.isMatrix3 || r.isMatrix4 || r.isVector2 || r.isVector3 || r.isVector4 || r.isTexture || r.isQuaternion) ? r.isRenderTargetTexture ? (console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."), e[n][i] = null) : e[n][i] = r.clone() : Array.isArray(r) ? e[n][i] = r.slice() : e[n][i] = r;
    }
  }
  return e;
}
function tn(t) {
  const e = {};
  for (let n = 0; n < t.length; n++) {
    const i = Mo(t[n]);
    for (const r in i)
      e[r] = i[r];
  }
  return e;
}
function ww(t) {
  const e = [];
  for (let n = 0; n < t.length; n++)
    e.push(t[n].clone());
  return e;
}
function Ty(t) {
  const e = t.getRenderTarget();
  return e === null ? t.outputColorSpace : e.isXRRenderTarget === !0 ? e.texture.colorSpace : Je.workingColorSpace;
}
const Ba = { clone: Mo, merge: tn };
var Tw = `void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`, Cw = `void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;
class on extends Qa {
  constructor(e) {
    super(), this.isShaderMaterial = !0, this.type = "ShaderMaterial", this.defines = {}, this.uniforms = {}, this.uniformsGroups = [], this.vertexShader = Tw, this.fragmentShader = Cw, this.linewidth = 1, this.wireframe = !1, this.wireframeLinewidth = 1, this.fog = !1, this.lights = !1, this.clipping = !1, this.forceSinglePass = !0, this.extensions = {
      clipCullDistance: !1,
      // set to use vertex shader clipping
      multiDraw: !1
      // set to use vertex shader multi_draw / enable gl_DrawID
    }, this.defaultAttributeValues = {
      color: [1, 1, 1],
      uv: [0, 0],
      uv1: [0, 0]
    }, this.index0AttributeName = void 0, this.uniformsNeedUpdate = !1, this.glslVersion = null, e !== void 0 && this.setValues(e);
  }
  copy(e) {
    return super.copy(e), this.fragmentShader = e.fragmentShader, this.vertexShader = e.vertexShader, this.uniforms = Mo(e.uniforms), this.uniformsGroups = ww(e.uniformsGroups), this.defines = Object.assign({}, e.defines), this.wireframe = e.wireframe, this.wireframeLinewidth = e.wireframeLinewidth, this.fog = e.fog, this.lights = e.lights, this.clipping = e.clipping, this.extensions = Object.assign({}, e.extensions), this.glslVersion = e.glslVersion, this;
  }
  toJSON(e) {
    const n = super.toJSON(e);
    n.glslVersion = this.glslVersion, n.uniforms = {};
    for (const r in this.uniforms) {
      const o = this.uniforms[r].value;
      o && o.isTexture ? n.uniforms[r] = {
        type: "t",
        value: o.toJSON(e).uuid
      } : o && o.isColor ? n.uniforms[r] = {
        type: "c",
        value: o.getHex()
      } : o && o.isVector2 ? n.uniforms[r] = {
        type: "v2",
        value: o.toArray()
      } : o && o.isVector3 ? n.uniforms[r] = {
        type: "v3",
        value: o.toArray()
      } : o && o.isVector4 ? n.uniforms[r] = {
        type: "v4",
        value: o.toArray()
      } : o && o.isMatrix3 ? n.uniforms[r] = {
        type: "m3",
        value: o.toArray()
      } : o && o.isMatrix4 ? n.uniforms[r] = {
        type: "m4",
        value: o.toArray()
      } : n.uniforms[r] = {
        value: o
      };
    }
    Object.keys(this.defines).length > 0 && (n.defines = this.defines), n.vertexShader = this.vertexShader, n.fragmentShader = this.fragmentShader, n.lights = this.lights, n.clipping = this.clipping;
    const i = {};
    for (const r in this.extensions)
      this.extensions[r] === !0 && (i[r] = !0);
    return Object.keys(i).length > 0 && (n.extensions = i), n;
  }
}
class Cy extends Nt {
  constructor() {
    super(), this.isCamera = !0, this.type = "Camera", this.matrixWorldInverse = new Mt(), this.projectionMatrix = new Mt(), this.projectionMatrixInverse = new Mt(), this.coordinateSystem = $i;
  }
  copy(e, n) {
    return super.copy(e, n), this.matrixWorldInverse.copy(e.matrixWorldInverse), this.projectionMatrix.copy(e.projectionMatrix), this.projectionMatrixInverse.copy(e.projectionMatrixInverse), this.coordinateSystem = e.coordinateSystem, this;
  }
  getWorldDirection(e) {
    return super.getWorldDirection(e).negate();
  }
  updateMatrixWorld(e) {
    super.updateMatrixWorld(e), this.matrixWorldInverse.copy(this.matrixWorld).invert();
  }
  updateWorldMatrix(e, n) {
    super.updateWorldMatrix(e, n), this.matrixWorldInverse.copy(this.matrixWorld).invert();
  }
  clone() {
    return new this.constructor().copy(this);
  }
}
const fr = /* @__PURE__ */ new k(), lv = /* @__PURE__ */ new Ie(), uv = /* @__PURE__ */ new Ie();
class On extends Cy {
  constructor(e = 50, n = 1, i = 0.1, r = 2e3) {
    super(), this.isPerspectiveCamera = !0, this.type = "PerspectiveCamera", this.fov = e, this.zoom = 1, this.near = i, this.far = r, this.focus = 10, this.aspect = n, this.view = null, this.filmGauge = 35, this.filmOffset = 0, this.updateProjectionMatrix();
  }
  copy(e, n) {
    return super.copy(e, n), this.fov = e.fov, this.zoom = e.zoom, this.near = e.near, this.far = e.far, this.focus = e.focus, this.aspect = e.aspect, this.view = e.view === null ? null : Object.assign({}, e.view), this.filmGauge = e.filmGauge, this.filmOffset = e.filmOffset, this;
  }
  /**
   * Sets the FOV by focal length in respect to the current .filmGauge.
   *
   * The default film gauge is 35, so that the focal length can be specified for
   * a 35mm (full frame) camera.
   *
   * Values for focal length and film gauge must have the same unit.
   */
  setFocalLength(e) {
    const n = 0.5 * this.getFilmHeight() / e;
    this.fov = Xu * 2 * Math.atan(n), this.updateProjectionMatrix();
  }
  /**
   * Calculates the focal length from the current .fov and .filmGauge.
   */
  getFocalLength() {
    const e = Math.tan(mf * 0.5 * this.fov);
    return 0.5 * this.getFilmHeight() / e;
  }
  getEffectiveFOV() {
    return Xu * 2 * Math.atan(
      Math.tan(mf * 0.5 * this.fov) / this.zoom
    );
  }
  getFilmWidth() {
    return this.filmGauge * Math.min(this.aspect, 1);
  }
  getFilmHeight() {
    return this.filmGauge / Math.max(this.aspect, 1);
  }
  /**
   * Computes the 2D bounds of the camera's viewable rectangle at a given distance along the viewing direction.
   * Sets minTarget and maxTarget to the coordinates of the lower-left and upper-right corners of the view rectangle.
   */
  getViewBounds(e, n, i) {
    fr.set(-1, -1, 0.5).applyMatrix4(this.projectionMatrixInverse), n.set(fr.x, fr.y).multiplyScalar(-e / fr.z), fr.set(1, 1, 0.5).applyMatrix4(this.projectionMatrixInverse), i.set(fr.x, fr.y).multiplyScalar(-e / fr.z);
  }
  /**
   * Computes the width and height of the camera's viewable rectangle at a given distance along the viewing direction.
   * Copies the result into the target Vector2, where x is width and y is height.
   */
  getViewSize(e, n) {
    return this.getViewBounds(e, lv, uv), n.subVectors(uv, lv);
  }
  /**
   * Sets an offset in a larger frustum. This is useful for multi-window or
   * multi-monitor/multi-machine setups.
   *
   * For example, if you have 3x2 monitors and each monitor is 1920x1080 and
   * the monitors are in grid like this
   *
   *   +---+---+---+
   *   | A | B | C |
   *   +---+---+---+
   *   | D | E | F |
   *   +---+---+---+
   *
   * then for each monitor you would call it like this
   *
   *   const w = 1920;
   *   const h = 1080;
   *   const fullWidth = w * 3;
   *   const fullHeight = h * 2;
   *
   *   --A--
   *   camera.setViewOffset( fullWidth, fullHeight, w * 0, h * 0, w, h );
   *   --B--
   *   camera.setViewOffset( fullWidth, fullHeight, w * 1, h * 0, w, h );
   *   --C--
   *   camera.setViewOffset( fullWidth, fullHeight, w * 2, h * 0, w, h );
   *   --D--
   *   camera.setViewOffset( fullWidth, fullHeight, w * 0, h * 1, w, h );
   *   --E--
   *   camera.setViewOffset( fullWidth, fullHeight, w * 1, h * 1, w, h );
   *   --F--
   *   camera.setViewOffset( fullWidth, fullHeight, w * 2, h * 1, w, h );
   *
   *   Note there is no reason monitors have to be the same size or in a grid.
   */
  setViewOffset(e, n, i, r, s, o) {
    this.aspect = e / n, this.view === null && (this.view = {
      enabled: !0,
      fullWidth: 1,
      fullHeight: 1,
      offsetX: 0,
      offsetY: 0,
      width: 1,
      height: 1
    }), this.view.enabled = !0, this.view.fullWidth = e, this.view.fullHeight = n, this.view.offsetX = i, this.view.offsetY = r, this.view.width = s, this.view.height = o, this.updateProjectionMatrix();
  }
  clearViewOffset() {
    this.view !== null && (this.view.enabled = !1), this.updateProjectionMatrix();
  }
  updateProjectionMatrix() {
    const e = this.near;
    let n = e * Math.tan(mf * 0.5 * this.fov) / this.zoom, i = 2 * n, r = this.aspect * i, s = -0.5 * r;
    const o = this.view;
    if (this.view !== null && this.view.enabled) {
      const l = o.fullWidth, u = o.fullHeight;
      s += o.offsetX * r / l, n -= o.offsetY * i / u, r *= o.width / l, i *= o.height / u;
    }
    const a = this.filmOffset;
    a !== 0 && (s += e * a / this.getFilmWidth()), this.projectionMatrix.makePerspective(s, s + r, n, n - i, e, this.far, this.coordinateSystem), this.projectionMatrixInverse.copy(this.projectionMatrix).invert();
  }
  toJSON(e) {
    const n = super.toJSON(e);
    return n.object.fov = this.fov, n.object.zoom = this.zoom, n.object.near = this.near, n.object.far = this.far, n.object.focus = this.focus, n.object.aspect = this.aspect, this.view !== null && (n.object.view = Object.assign({}, this.view)), n.object.filmGauge = this.filmGauge, n.object.filmOffset = this.filmOffset, n;
  }
}
const Ns = -90, Us = 1;
class Aw extends Nt {
  constructor(e, n, i) {
    super(), this.type = "CubeCamera", this.renderTarget = i, this.coordinateSystem = null, this.activeMipmapLevel = 0;
    const r = new On(Ns, Us, e, n);
    r.layers = this.layers, this.add(r);
    const s = new On(Ns, Us, e, n);
    s.layers = this.layers, this.add(s);
    const o = new On(Ns, Us, e, n);
    o.layers = this.layers, this.add(o);
    const a = new On(Ns, Us, e, n);
    a.layers = this.layers, this.add(a);
    const l = new On(Ns, Us, e, n);
    l.layers = this.layers, this.add(l);
    const u = new On(Ns, Us, e, n);
    u.layers = this.layers, this.add(u);
  }
  updateCoordinateSystem() {
    const e = this.coordinateSystem, n = this.children.concat(), [i, r, s, o, a, l] = n;
    for (const u of n) this.remove(u);
    if (e === $i)
      i.up.set(0, 1, 0), i.lookAt(1, 0, 0), r.up.set(0, 1, 0), r.lookAt(-1, 0, 0), s.up.set(0, 0, -1), s.lookAt(0, 1, 0), o.up.set(0, 0, 1), o.lookAt(0, -1, 0), a.up.set(0, 1, 0), a.lookAt(0, 0, 1), l.up.set(0, 1, 0), l.lookAt(0, 0, -1);
    else if (e === ju)
      i.up.set(0, -1, 0), i.lookAt(-1, 0, 0), r.up.set(0, -1, 0), r.lookAt(1, 0, 0), s.up.set(0, 0, 1), s.lookAt(0, 1, 0), o.up.set(0, 0, -1), o.lookAt(0, -1, 0), a.up.set(0, -1, 0), a.lookAt(0, 0, 1), l.up.set(0, -1, 0), l.lookAt(0, 0, -1);
    else
      throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: " + e);
    for (const u of n)
      this.add(u), u.updateMatrixWorld();
  }
  update(e, n) {
    this.parent === null && this.updateMatrixWorld();
    const { renderTarget: i, activeMipmapLevel: r } = this;
    this.coordinateSystem !== e.coordinateSystem && (this.coordinateSystem = e.coordinateSystem, this.updateCoordinateSystem());
    const [s, o, a, l, u, c] = this.children, d = e.getRenderTarget(), h = e.getActiveCubeFace(), p = e.getActiveMipmapLevel(), _ = e.xr.enabled;
    e.xr.enabled = !1;
    const y = i.texture.generateMipmaps;
    i.texture.generateMipmaps = !1, e.setRenderTarget(i, 0, r), e.render(n, s), e.setRenderTarget(i, 1, r), e.render(n, o), e.setRenderTarget(i, 2, r), e.render(n, a), e.setRenderTarget(i, 3, r), e.render(n, l), e.setRenderTarget(i, 4, r), e.render(n, u), i.texture.generateMipmaps = y, e.setRenderTarget(i, 5, r), e.render(n, c), e.setRenderTarget(d, h, p), e.xr.enabled = _, i.texture.needsPMREMUpdate = !0;
  }
}
class Ay extends ln {
  constructor(e, n, i, r, s, o, a, l, u, c) {
    e = e !== void 0 ? e : [], n = n !== void 0 ? n : vo, super(e, n, i, r, s, o, a, l, u, c), this.isCubeTexture = !0, this.flipY = !1;
  }
  get images() {
    return this.image;
  }
  set images(e) {
    this.image = e;
  }
}
class Rw extends mi {
  constructor(e = 1, n = {}) {
    super(e, e, n), this.isWebGLCubeRenderTarget = !0;
    const i = { width: e, height: e, depth: 1 }, r = [i, i, i, i, i, i];
    this.texture = new Ay(r, n.mapping, n.wrapS, n.wrapT, n.magFilter, n.minFilter, n.format, n.type, n.anisotropy, n.colorSpace), this.texture.isRenderTargetTexture = !0, this.texture.generateMipmaps = n.generateMipmaps !== void 0 ? n.generateMipmaps : !1, this.texture.minFilter = n.minFilter !== void 0 ? n.minFilter : ci;
  }
  fromEquirectangularTexture(e, n) {
    this.texture.type = n.type, this.texture.colorSpace = n.colorSpace, this.texture.generateMipmaps = n.generateMipmaps, this.texture.minFilter = n.minFilter, this.texture.magFilter = n.magFilter;
    const i = {
      uniforms: {
        tEquirect: { value: null }
      },
      vertexShader: (
        /* glsl */
        `

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`
      ),
      fragmentShader: (
        /* glsl */
        `

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`
      )
    }, r = new Lo(5, 5, 5), s = new on({
      name: "CubemapFromEquirect",
      uniforms: Mo(i.uniforms),
      vertexShader: i.vertexShader,
      fragmentShader: i.fragmentShader,
      side: Tn,
      blending: Xi
    });
    s.uniforms.tEquirect.value = n;
    const o = new Sn(r, s), a = n.minFilter;
    return n.minFilter === as && (n.minFilter = ci), new Aw(1, 10, this).update(e, o), n.minFilter = a, o.geometry.dispose(), o.material.dispose(), this;
  }
  clear(e, n, i, r) {
    const s = e.getRenderTarget();
    for (let o = 0; o < 6; o++)
      e.setRenderTarget(this, o), e.clear(n, i, r);
    e.setRenderTarget(s);
  }
}
const Ff = /* @__PURE__ */ new k(), bw = /* @__PURE__ */ new k(), Pw = /* @__PURE__ */ new Oe();
class Kr {
  constructor(e = new k(1, 0, 0), n = 0) {
    this.isPlane = !0, this.normal = e, this.constant = n;
  }
  set(e, n) {
    return this.normal.copy(e), this.constant = n, this;
  }
  setComponents(e, n, i, r) {
    return this.normal.set(e, n, i), this.constant = r, this;
  }
  setFromNormalAndCoplanarPoint(e, n) {
    return this.normal.copy(e), this.constant = -n.dot(this.normal), this;
  }
  setFromCoplanarPoints(e, n, i) {
    const r = Ff.subVectors(i, n).cross(bw.subVectors(e, n)).normalize();
    return this.setFromNormalAndCoplanarPoint(r, e), this;
  }
  copy(e) {
    return this.normal.copy(e.normal), this.constant = e.constant, this;
  }
  normalize() {
    const e = 1 / this.normal.length();
    return this.normal.multiplyScalar(e), this.constant *= e, this;
  }
  negate() {
    return this.constant *= -1, this.normal.negate(), this;
  }
  distanceToPoint(e) {
    return this.normal.dot(e) + this.constant;
  }
  distanceToSphere(e) {
    return this.distanceToPoint(e.center) - e.radius;
  }
  projectPoint(e, n) {
    return n.copy(e).addScaledVector(this.normal, -this.distanceToPoint(e));
  }
  intersectLine(e, n) {
    const i = e.delta(Ff), r = this.normal.dot(i);
    if (r === 0)
      return this.distanceToPoint(e.start) === 0 ? n.copy(e.start) : null;
    const s = -(e.start.dot(this.normal) + this.constant) / r;
    return s < 0 || s > 1 ? null : n.copy(e.start).addScaledVector(i, s);
  }
  intersectsLine(e) {
    const n = this.distanceToPoint(e.start), i = this.distanceToPoint(e.end);
    return n < 0 && i > 0 || i < 0 && n > 0;
  }
  intersectsBox(e) {
    return e.intersectsPlane(this);
  }
  intersectsSphere(e) {
    return e.intersectsPlane(this);
  }
  coplanarPoint(e) {
    return e.copy(this.normal).multiplyScalar(-this.constant);
  }
  applyMatrix4(e, n) {
    const i = n || Pw.getNormalMatrix(e), r = this.coplanarPoint(Ff).applyMatrix4(e), s = this.normal.applyMatrix3(i).normalize();
    return this.constant = -r.dot(s), this;
  }
  translate(e) {
    return this.constant -= e.dot(this.normal), this;
  }
  equals(e) {
    return e.normal.equals(this.normal) && e.constant === this.constant;
  }
  clone() {
    return new this.constructor().copy(this);
  }
}
const Wr = /* @__PURE__ */ new Kp(), Ul = /* @__PURE__ */ new k();
class Qp {
  constructor(e = new Kr(), n = new Kr(), i = new Kr(), r = new Kr(), s = new Kr(), o = new Kr()) {
    this.planes = [e, n, i, r, s, o];
  }
  set(e, n, i, r, s, o) {
    const a = this.planes;
    return a[0].copy(e), a[1].copy(n), a[2].copy(i), a[3].copy(r), a[4].copy(s), a[5].copy(o), this;
  }
  copy(e) {
    const n = this.planes;
    for (let i = 0; i < 6; i++)
      n[i].copy(e.planes[i]);
    return this;
  }
  setFromProjectionMatrix(e, n = $i) {
    const i = this.planes, r = e.elements, s = r[0], o = r[1], a = r[2], l = r[3], u = r[4], c = r[5], d = r[6], h = r[7], p = r[8], _ = r[9], y = r[10], m = r[11], f = r[12], v = r[13], g = r[14], M = r[15];
    if (i[0].setComponents(l - s, h - u, m - p, M - f).normalize(), i[1].setComponents(l + s, h + u, m + p, M + f).normalize(), i[2].setComponents(l + o, h + c, m + _, M + v).normalize(), i[3].setComponents(l - o, h - c, m - _, M - v).normalize(), i[4].setComponents(l - a, h - d, m - y, M - g).normalize(), n === $i)
      i[5].setComponents(l + a, h + d, m + y, M + g).normalize();
    else if (n === ju)
      i[5].setComponents(a, d, y, g).normalize();
    else
      throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: " + n);
    return this;
  }
  intersectsObject(e) {
    if (e.boundingSphere !== void 0)
      e.boundingSphere === null && e.computeBoundingSphere(), Wr.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);
    else {
      const n = e.geometry;
      n.boundingSphere === null && n.computeBoundingSphere(), Wr.copy(n.boundingSphere).applyMatrix4(e.matrixWorld);
    }
    return this.intersectsSphere(Wr);
  }
  intersectsSprite(e) {
    return Wr.center.set(0, 0, 0), Wr.radius = 0.7071067811865476, Wr.applyMatrix4(e.matrixWorld), this.intersectsSphere(Wr);
  }
  intersectsSphere(e) {
    const n = this.planes, i = e.center, r = -e.radius;
    for (let s = 0; s < 6; s++)
      if (n[s].distanceToPoint(i) < r)
        return !1;
    return !0;
  }
  intersectsBox(e) {
    const n = this.planes;
    for (let i = 0; i < 6; i++) {
      const r = n[i];
      if (Ul.x = r.normal.x > 0 ? e.max.x : e.min.x, Ul.y = r.normal.y > 0 ? e.max.y : e.min.y, Ul.z = r.normal.z > 0 ? e.max.z : e.min.z, r.distanceToPoint(Ul) < 0)
        return !1;
    }
    return !0;
  }
  containsPoint(e) {
    const n = this.planes;
    for (let i = 0; i < 6; i++)
      if (n[i].distanceToPoint(e) < 0)
        return !1;
    return !0;
  }
  clone() {
    return new this.constructor().copy(this);
  }
}
function Ry() {
  let t = null, e = !1, n = null, i = null;
  function r(s, o) {
    n(s, o), i = t.requestAnimationFrame(r);
  }
  return {
    start: function() {
      e !== !0 && n !== null && (i = t.requestAnimationFrame(r), e = !0);
    },
    stop: function() {
      t.cancelAnimationFrame(i), e = !1;
    },
    setAnimationLoop: function(s) {
      n = s;
    },
    setContext: function(s) {
      t = s;
    }
  };
}
function Lw(t) {
  const e = /* @__PURE__ */ new WeakMap();
  function n(a, l) {
    const u = a.array, c = a.usage, d = u.byteLength, h = t.createBuffer();
    t.bindBuffer(l, h), t.bufferData(l, u, c), a.onUploadCallback();
    let p;
    if (u instanceof Float32Array)
      p = t.FLOAT;
    else if (u instanceof Uint16Array)
      a.isFloat16BufferAttribute ? p = t.HALF_FLOAT : p = t.UNSIGNED_SHORT;
    else if (u instanceof Int16Array)
      p = t.SHORT;
    else if (u instanceof Uint32Array)
      p = t.UNSIGNED_INT;
    else if (u instanceof Int32Array)
      p = t.INT;
    else if (u instanceof Int8Array)
      p = t.BYTE;
    else if (u instanceof Uint8Array)
      p = t.UNSIGNED_BYTE;
    else if (u instanceof Uint8ClampedArray)
      p = t.UNSIGNED_BYTE;
    else
      throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: " + u);
    return {
      buffer: h,
      type: p,
      bytesPerElement: u.BYTES_PER_ELEMENT,
      version: a.version,
      size: d
    };
  }
  function i(a, l, u) {
    const c = l.array, d = l.updateRanges;
    if (t.bindBuffer(u, a), d.length === 0)
      t.bufferSubData(u, 0, c);
    else {
      d.sort((p, _) => p.start - _.start);
      let h = 0;
      for (let p = 1; p < d.length; p++) {
        const _ = d[h], y = d[p];
        y.start <= _.start + _.count + 1 ? _.count = Math.max(
          _.count,
          y.start + y.count - _.start
        ) : (++h, d[h] = y);
      }
      d.length = h + 1;
      for (let p = 0, _ = d.length; p < _; p++) {
        const y = d[p];
        t.bufferSubData(
          u,
          y.start * c.BYTES_PER_ELEMENT,
          c,
          y.start,
          y.count
        );
      }
      l.clearUpdateRanges();
    }
    l.onUploadCallback();
  }
  function r(a) {
    return a.isInterleavedBufferAttribute && (a = a.data), e.get(a);
  }
  function s(a) {
    a.isInterleavedBufferAttribute && (a = a.data);
    const l = e.get(a);
    l && (t.deleteBuffer(l.buffer), e.delete(a));
  }
  function o(a, l) {
    if (a.isInterleavedBufferAttribute && (a = a.data), a.isGLBufferAttribute) {
      const c = e.get(a);
      (!c || c.version < a.version) && e.set(a, {
        buffer: a.buffer,
        type: a.type,
        bytesPerElement: a.elementSize,
        version: a.version
      });
      return;
    }
    const u = e.get(a);
    if (u === void 0)
      e.set(a, n(a, l));
    else if (u.version < a.version) {
      if (u.size !== a.array.byteLength)
        throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");
      i(u.buffer, a, l), u.version = a.version;
    }
  }
  return {
    get: r,
    remove: s,
    update: o
  };
}
class Eo extends ir {
  constructor(e = 1, n = 1, i = 1, r = 1) {
    super(), this.type = "PlaneGeometry", this.parameters = {
      width: e,
      height: n,
      widthSegments: i,
      heightSegments: r
    };
    const s = e / 2, o = n / 2, a = Math.floor(i), l = Math.floor(r), u = a + 1, c = l + 1, d = e / a, h = n / l, p = [], _ = [], y = [], m = [];
    for (let f = 0; f < c; f++) {
      const v = f * h - o;
      for (let g = 0; g < u; g++) {
        const M = g * d - s;
        _.push(M, -v, 0), y.push(0, 0, 1), m.push(g / a), m.push(1 - f / l);
      }
    }
    for (let f = 0; f < l; f++)
      for (let v = 0; v < a; v++) {
        const g = v + u * f, M = v + u * (f + 1), b = v + 1 + u * (f + 1), A = v + 1 + u * f;
        p.push(g, M, A), p.push(M, b, A);
      }
    this.setIndex(p), this.setAttribute("position", new Jn(_, 3)), this.setAttribute("normal", new Jn(y, 3)), this.setAttribute("uv", new Jn(m, 2));
  }
  copy(e) {
    return super.copy(e), this.parameters = Object.assign({}, e.parameters), this;
  }
  static fromJSON(e) {
    return new Eo(e.width, e.height, e.widthSegments, e.heightSegments);
  }
}
var Dw = `#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`, Iw = `#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`, Nw = `#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`, Uw = `#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`, kw = `#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`, Fw = `#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`, Ow = `#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`, Bw = `#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`, zw = `#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`, Hw = `#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`, Vw = `vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`, Gw = `vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`, Ww = `float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`, $w = `#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`, jw = `#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`, Xw = `#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`, Yw = `#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`, qw = `#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`, Kw = `#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`, Zw = `#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`, Qw = `#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`, Jw = `#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`, eT = `#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`, tT = `#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`, nT = `#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`, iT = `vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`, rT = `#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`, sT = `#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`, oT = `#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`, aT = `#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`, lT = "gl_FragColor = linearToOutputTexel( gl_FragColor );", uT = `
const mat3 LINEAR_SRGB_TO_LINEAR_DISPLAY_P3 = mat3(
	vec3( 0.8224621, 0.177538, 0.0 ),
	vec3( 0.0331941, 0.9668058, 0.0 ),
	vec3( 0.0170827, 0.0723974, 0.9105199 )
);
const mat3 LINEAR_DISPLAY_P3_TO_LINEAR_SRGB = mat3(
	vec3( 1.2249401, - 0.2249404, 0.0 ),
	vec3( - 0.0420569, 1.0420571, 0.0 ),
	vec3( - 0.0196376, - 0.0786361, 1.0982735 )
);
vec4 LinearSRGBToLinearDisplayP3( in vec4 value ) {
	return vec4( value.rgb * LINEAR_SRGB_TO_LINEAR_DISPLAY_P3, value.a );
}
vec4 LinearDisplayP3ToLinearSRGB( in vec4 value ) {
	return vec4( value.rgb * LINEAR_DISPLAY_P3_TO_LINEAR_SRGB, value.a );
}
vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`, cT = `#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`, fT = `#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`, dT = `#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`, hT = `#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`, pT = `#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`, mT = `#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`, gT = `#ifdef USE_FOG
	varying float vFogDepth;
#endif`, vT = `#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`, _T = `#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`, xT = `#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`, yT = `#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`, ST = `LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`, MT = `varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`, ET = `uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`, wT = `#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`, TT = `ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`, CT = `varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`, AT = `BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`, RT = `varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`, bT = `PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`, PT = `struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`, LT = `
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`, DT = `#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`, IT = `#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`, NT = `#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`, UT = `#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`, kT = `#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`, FT = `#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`, OT = `#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`, BT = `#ifdef USE_MAP
	uniform sampler2D map;
#endif`, zT = `#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`, HT = `#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`, VT = `float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`, GT = `#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`, WT = `#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`, $T = `#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`, jT = `#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`, XT = `#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`, YT = `#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`, qT = `float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`, KT = `#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`, ZT = `#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`, QT = `#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`, JT = `#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`, eC = `#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`, tC = `#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`, nC = `#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`, iC = `#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`, rC = `#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`, sC = `#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`, oC = `vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`, aC = `#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`, lC = `vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`, uC = `#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`, cC = `#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`, fC = `float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`, dC = `#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`, hC = `#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`, pC = `#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`, mC = `#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`, gC = `float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`, vC = `#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`, _C = `#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`, xC = `#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`, yC = `#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`, SC = `float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`, MC = `#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`, EC = `#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`, wC = `#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`, TC = `#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`, CC = `#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
		
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
		
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		
		#else
		
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`, AC = `#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`, RC = `#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`, bC = `#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`, PC = `#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;
const LC = `varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`, DC = `uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`, IC = `varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`, NC = `#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`, UC = `varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`, kC = `uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`, FC = `#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`, OC = `#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`, BC = `#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`, zC = `#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`, HC = `varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`, VC = `uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`, GC = `uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`, WC = `uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`, $C = `#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`, jC = `uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`, XC = `#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`, YC = `#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`, qC = `#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`, KC = `#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`, ZC = `#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`, QC = `#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`, JC = `#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`, eA = `#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`, tA = `#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`, nA = `#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`, iA = `#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`, rA = `#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`, sA = `uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`, oA = `uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`, aA = `#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`, lA = `uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`, uA = `uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`, cA = `uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`, Fe = {
  alphahash_fragment: Dw,
  alphahash_pars_fragment: Iw,
  alphamap_fragment: Nw,
  alphamap_pars_fragment: Uw,
  alphatest_fragment: kw,
  alphatest_pars_fragment: Fw,
  aomap_fragment: Ow,
  aomap_pars_fragment: Bw,
  batching_pars_vertex: zw,
  batching_vertex: Hw,
  begin_vertex: Vw,
  beginnormal_vertex: Gw,
  bsdfs: Ww,
  iridescence_fragment: $w,
  bumpmap_pars_fragment: jw,
  clipping_planes_fragment: Xw,
  clipping_planes_pars_fragment: Yw,
  clipping_planes_pars_vertex: qw,
  clipping_planes_vertex: Kw,
  color_fragment: Zw,
  color_pars_fragment: Qw,
  color_pars_vertex: Jw,
  color_vertex: eT,
  common: tT,
  cube_uv_reflection_fragment: nT,
  defaultnormal_vertex: iT,
  displacementmap_pars_vertex: rT,
  displacementmap_vertex: sT,
  emissivemap_fragment: oT,
  emissivemap_pars_fragment: aT,
  colorspace_fragment: lT,
  colorspace_pars_fragment: uT,
  envmap_fragment: cT,
  envmap_common_pars_fragment: fT,
  envmap_pars_fragment: dT,
  envmap_pars_vertex: hT,
  envmap_physical_pars_fragment: wT,
  envmap_vertex: pT,
  fog_vertex: mT,
  fog_pars_vertex: gT,
  fog_fragment: vT,
  fog_pars_fragment: _T,
  gradientmap_pars_fragment: xT,
  lightmap_pars_fragment: yT,
  lights_lambert_fragment: ST,
  lights_lambert_pars_fragment: MT,
  lights_pars_begin: ET,
  lights_toon_fragment: TT,
  lights_toon_pars_fragment: CT,
  lights_phong_fragment: AT,
  lights_phong_pars_fragment: RT,
  lights_physical_fragment: bT,
  lights_physical_pars_fragment: PT,
  lights_fragment_begin: LT,
  lights_fragment_maps: DT,
  lights_fragment_end: IT,
  logdepthbuf_fragment: NT,
  logdepthbuf_pars_fragment: UT,
  logdepthbuf_pars_vertex: kT,
  logdepthbuf_vertex: FT,
  map_fragment: OT,
  map_pars_fragment: BT,
  map_particle_fragment: zT,
  map_particle_pars_fragment: HT,
  metalnessmap_fragment: VT,
  metalnessmap_pars_fragment: GT,
  morphinstance_vertex: WT,
  morphcolor_vertex: $T,
  morphnormal_vertex: jT,
  morphtarget_pars_vertex: XT,
  morphtarget_vertex: YT,
  normal_fragment_begin: qT,
  normal_fragment_maps: KT,
  normal_pars_fragment: ZT,
  normal_pars_vertex: QT,
  normal_vertex: JT,
  normalmap_pars_fragment: eC,
  clearcoat_normal_fragment_begin: tC,
  clearcoat_normal_fragment_maps: nC,
  clearcoat_pars_fragment: iC,
  iridescence_pars_fragment: rC,
  opaque_fragment: sC,
  packing: oC,
  premultiplied_alpha_fragment: aC,
  project_vertex: lC,
  dithering_fragment: uC,
  dithering_pars_fragment: cC,
  roughnessmap_fragment: fC,
  roughnessmap_pars_fragment: dC,
  shadowmap_pars_fragment: hC,
  shadowmap_pars_vertex: pC,
  shadowmap_vertex: mC,
  shadowmask_pars_fragment: gC,
  skinbase_vertex: vC,
  skinning_pars_vertex: _C,
  skinning_vertex: xC,
  skinnormal_vertex: yC,
  specularmap_fragment: SC,
  specularmap_pars_fragment: MC,
  tonemapping_fragment: EC,
  tonemapping_pars_fragment: wC,
  transmission_fragment: TC,
  transmission_pars_fragment: CC,
  uv_pars_fragment: AC,
  uv_pars_vertex: RC,
  uv_vertex: bC,
  worldpos_vertex: PC,
  background_vert: LC,
  background_frag: DC,
  backgroundCube_vert: IC,
  backgroundCube_frag: NC,
  cube_vert: UC,
  cube_frag: kC,
  depth_vert: FC,
  depth_frag: OC,
  distanceRGBA_vert: BC,
  distanceRGBA_frag: zC,
  equirect_vert: HC,
  equirect_frag: VC,
  linedashed_vert: GC,
  linedashed_frag: WC,
  meshbasic_vert: $C,
  meshbasic_frag: jC,
  meshlambert_vert: XC,
  meshlambert_frag: YC,
  meshmatcap_vert: qC,
  meshmatcap_frag: KC,
  meshnormal_vert: ZC,
  meshnormal_frag: QC,
  meshphong_vert: JC,
  meshphong_frag: eA,
  meshphysical_vert: tA,
  meshphysical_frag: nA,
  meshtoon_vert: iA,
  meshtoon_frag: rA,
  points_vert: sA,
  points_frag: oA,
  shadow_vert: aA,
  shadow_frag: lA,
  sprite_vert: uA,
  sprite_frag: cA
}, oe = {
  common: {
    diffuse: { value: /* @__PURE__ */ new Ve(16777215) },
    opacity: { value: 1 },
    map: { value: null },
    mapTransform: { value: /* @__PURE__ */ new Oe() },
    alphaMap: { value: null },
    alphaMapTransform: { value: /* @__PURE__ */ new Oe() },
    alphaTest: { value: 0 }
  },
  specularmap: {
    specularMap: { value: null },
    specularMapTransform: { value: /* @__PURE__ */ new Oe() }
  },
  envmap: {
    envMap: { value: null },
    envMapRotation: { value: /* @__PURE__ */ new Oe() },
    flipEnvMap: { value: -1 },
    reflectivity: { value: 1 },
    // basic, lambert, phong
    ior: { value: 1.5 },
    // physical
    refractionRatio: { value: 0.98 }
    // basic, lambert, phong
  },
  aomap: {
    aoMap: { value: null },
    aoMapIntensity: { value: 1 },
    aoMapTransform: { value: /* @__PURE__ */ new Oe() }
  },
  lightmap: {
    lightMap: { value: null },
    lightMapIntensity: { value: 1 },
    lightMapTransform: { value: /* @__PURE__ */ new Oe() }
  },
  bumpmap: {
    bumpMap: { value: null },
    bumpMapTransform: { value: /* @__PURE__ */ new Oe() },
    bumpScale: { value: 1 }
  },
  normalmap: {
    normalMap: { value: null },
    normalMapTransform: { value: /* @__PURE__ */ new Oe() },
    normalScale: { value: /* @__PURE__ */ new Ie(1, 1) }
  },
  displacementmap: {
    displacementMap: { value: null },
    displacementMapTransform: { value: /* @__PURE__ */ new Oe() },
    displacementScale: { value: 1 },
    displacementBias: { value: 0 }
  },
  emissivemap: {
    emissiveMap: { value: null },
    emissiveMapTransform: { value: /* @__PURE__ */ new Oe() }
  },
  metalnessmap: {
    metalnessMap: { value: null },
    metalnessMapTransform: { value: /* @__PURE__ */ new Oe() }
  },
  roughnessmap: {
    roughnessMap: { value: null },
    roughnessMapTransform: { value: /* @__PURE__ */ new Oe() }
  },
  gradientmap: {
    gradientMap: { value: null }
  },
  fog: {
    fogDensity: { value: 25e-5 },
    fogNear: { value: 1 },
    fogFar: { value: 2e3 },
    fogColor: { value: /* @__PURE__ */ new Ve(16777215) }
  },
  lights: {
    ambientLightColor: { value: [] },
    lightProbe: { value: [] },
    directionalLights: { value: [], properties: {
      direction: {},
      color: {}
    } },
    directionalLightShadows: { value: [], properties: {
      shadowIntensity: 1,
      shadowBias: {},
      shadowNormalBias: {},
      shadowRadius: {},
      shadowMapSize: {}
    } },
    directionalShadowMap: { value: [] },
    directionalShadowMatrix: { value: [] },
    spotLights: { value: [], properties: {
      color: {},
      position: {},
      direction: {},
      distance: {},
      coneCos: {},
      penumbraCos: {},
      decay: {}
    } },
    spotLightShadows: { value: [], properties: {
      shadowIntensity: 1,
      shadowBias: {},
      shadowNormalBias: {},
      shadowRadius: {},
      shadowMapSize: {}
    } },
    spotLightMap: { value: [] },
    spotShadowMap: { value: [] },
    spotLightMatrix: { value: [] },
    pointLights: { value: [], properties: {
      color: {},
      position: {},
      decay: {},
      distance: {}
    } },
    pointLightShadows: { value: [], properties: {
      shadowIntensity: 1,
      shadowBias: {},
      shadowNormalBias: {},
      shadowRadius: {},
      shadowMapSize: {},
      shadowCameraNear: {},
      shadowCameraFar: {}
    } },
    pointShadowMap: { value: [] },
    pointShadowMatrix: { value: [] },
    hemisphereLights: { value: [], properties: {
      direction: {},
      skyColor: {},
      groundColor: {}
    } },
    // TODO (abelnation): RectAreaLight BRDF data needs to be moved from example to main src
    rectAreaLights: { value: [], properties: {
      color: {},
      position: {},
      width: {},
      height: {}
    } },
    ltc_1: { value: null },
    ltc_2: { value: null }
  },
  points: {
    diffuse: { value: /* @__PURE__ */ new Ve(16777215) },
    opacity: { value: 1 },
    size: { value: 1 },
    scale: { value: 1 },
    map: { value: null },
    alphaMap: { value: null },
    alphaMapTransform: { value: /* @__PURE__ */ new Oe() },
    alphaTest: { value: 0 },
    uvTransform: { value: /* @__PURE__ */ new Oe() }
  },
  sprite: {
    diffuse: { value: /* @__PURE__ */ new Ve(16777215) },
    opacity: { value: 1 },
    center: { value: /* @__PURE__ */ new Ie(0.5, 0.5) },
    rotation: { value: 0 },
    map: { value: null },
    mapTransform: { value: /* @__PURE__ */ new Oe() },
    alphaMap: { value: null },
    alphaMapTransform: { value: /* @__PURE__ */ new Oe() },
    alphaTest: { value: 0 }
  }
}, Ei = {
  basic: {
    uniforms: /* @__PURE__ */ tn([
      oe.common,
      oe.specularmap,
      oe.envmap,
      oe.aomap,
      oe.lightmap,
      oe.fog
    ]),
    vertexShader: Fe.meshbasic_vert,
    fragmentShader: Fe.meshbasic_frag
  },
  lambert: {
    uniforms: /* @__PURE__ */ tn([
      oe.common,
      oe.specularmap,
      oe.envmap,
      oe.aomap,
      oe.lightmap,
      oe.emissivemap,
      oe.bumpmap,
      oe.normalmap,
      oe.displacementmap,
      oe.fog,
      oe.lights,
      {
        emissive: { value: /* @__PURE__ */ new Ve(0) }
      }
    ]),
    vertexShader: Fe.meshlambert_vert,
    fragmentShader: Fe.meshlambert_frag
  },
  phong: {
    uniforms: /* @__PURE__ */ tn([
      oe.common,
      oe.specularmap,
      oe.envmap,
      oe.aomap,
      oe.lightmap,
      oe.emissivemap,
      oe.bumpmap,
      oe.normalmap,
      oe.displacementmap,
      oe.fog,
      oe.lights,
      {
        emissive: { value: /* @__PURE__ */ new Ve(0) },
        specular: { value: /* @__PURE__ */ new Ve(1118481) },
        shininess: { value: 30 }
      }
    ]),
    vertexShader: Fe.meshphong_vert,
    fragmentShader: Fe.meshphong_frag
  },
  standard: {
    uniforms: /* @__PURE__ */ tn([
      oe.common,
      oe.envmap,
      oe.aomap,
      oe.lightmap,
      oe.emissivemap,
      oe.bumpmap,
      oe.normalmap,
      oe.displacementmap,
      oe.roughnessmap,
      oe.metalnessmap,
      oe.fog,
      oe.lights,
      {
        emissive: { value: /* @__PURE__ */ new Ve(0) },
        roughness: { value: 1 },
        metalness: { value: 0 },
        envMapIntensity: { value: 1 }
      }
    ]),
    vertexShader: Fe.meshphysical_vert,
    fragmentShader: Fe.meshphysical_frag
  },
  toon: {
    uniforms: /* @__PURE__ */ tn([
      oe.common,
      oe.aomap,
      oe.lightmap,
      oe.emissivemap,
      oe.bumpmap,
      oe.normalmap,
      oe.displacementmap,
      oe.gradientmap,
      oe.fog,
      oe.lights,
      {
        emissive: { value: /* @__PURE__ */ new Ve(0) }
      }
    ]),
    vertexShader: Fe.meshtoon_vert,
    fragmentShader: Fe.meshtoon_frag
  },
  matcap: {
    uniforms: /* @__PURE__ */ tn([
      oe.common,
      oe.bumpmap,
      oe.normalmap,
      oe.displacementmap,
      oe.fog,
      {
        matcap: { value: null }
      }
    ]),
    vertexShader: Fe.meshmatcap_vert,
    fragmentShader: Fe.meshmatcap_frag
  },
  points: {
    uniforms: /* @__PURE__ */ tn([
      oe.points,
      oe.fog
    ]),
    vertexShader: Fe.points_vert,
    fragmentShader: Fe.points_frag
  },
  dashed: {
    uniforms: /* @__PURE__ */ tn([
      oe.common,
      oe.fog,
      {
        scale: { value: 1 },
        dashSize: { value: 1 },
        totalSize: { value: 2 }
      }
    ]),
    vertexShader: Fe.linedashed_vert,
    fragmentShader: Fe.linedashed_frag
  },
  depth: {
    uniforms: /* @__PURE__ */ tn([
      oe.common,
      oe.displacementmap
    ]),
    vertexShader: Fe.depth_vert,
    fragmentShader: Fe.depth_frag
  },
  normal: {
    uniforms: /* @__PURE__ */ tn([
      oe.common,
      oe.bumpmap,
      oe.normalmap,
      oe.displacementmap,
      {
        opacity: { value: 1 }
      }
    ]),
    vertexShader: Fe.meshnormal_vert,
    fragmentShader: Fe.meshnormal_frag
  },
  sprite: {
    uniforms: /* @__PURE__ */ tn([
      oe.sprite,
      oe.fog
    ]),
    vertexShader: Fe.sprite_vert,
    fragmentShader: Fe.sprite_frag
  },
  background: {
    uniforms: {
      uvTransform: { value: /* @__PURE__ */ new Oe() },
      t2D: { value: null },
      backgroundIntensity: { value: 1 }
    },
    vertexShader: Fe.background_vert,
    fragmentShader: Fe.background_frag
  },
  backgroundCube: {
    uniforms: {
      envMap: { value: null },
      flipEnvMap: { value: -1 },
      backgroundBlurriness: { value: 0 },
      backgroundIntensity: { value: 1 },
      backgroundRotation: { value: /* @__PURE__ */ new Oe() }
    },
    vertexShader: Fe.backgroundCube_vert,
    fragmentShader: Fe.backgroundCube_frag
  },
  cube: {
    uniforms: {
      tCube: { value: null },
      tFlip: { value: -1 },
      opacity: { value: 1 }
    },
    vertexShader: Fe.cube_vert,
    fragmentShader: Fe.cube_frag
  },
  equirect: {
    uniforms: {
      tEquirect: { value: null }
    },
    vertexShader: Fe.equirect_vert,
    fragmentShader: Fe.equirect_frag
  },
  distanceRGBA: {
    uniforms: /* @__PURE__ */ tn([
      oe.common,
      oe.displacementmap,
      {
        referencePosition: { value: /* @__PURE__ */ new k() },
        nearDistance: { value: 1 },
        farDistance: { value: 1e3 }
      }
    ]),
    vertexShader: Fe.distanceRGBA_vert,
    fragmentShader: Fe.distanceRGBA_frag
  },
  shadow: {
    uniforms: /* @__PURE__ */ tn([
      oe.lights,
      oe.fog,
      {
        color: { value: /* @__PURE__ */ new Ve(0) },
        opacity: { value: 1 }
      }
    ]),
    vertexShader: Fe.shadow_vert,
    fragmentShader: Fe.shadow_frag
  }
};
Ei.physical = {
  uniforms: /* @__PURE__ */ tn([
    Ei.standard.uniforms,
    {
      clearcoat: { value: 0 },
      clearcoatMap: { value: null },
      clearcoatMapTransform: { value: /* @__PURE__ */ new Oe() },
      clearcoatNormalMap: { value: null },
      clearcoatNormalMapTransform: { value: /* @__PURE__ */ new Oe() },
      clearcoatNormalScale: { value: /* @__PURE__ */ new Ie(1, 1) },
      clearcoatRoughness: { value: 0 },
      clearcoatRoughnessMap: { value: null },
      clearcoatRoughnessMapTransform: { value: /* @__PURE__ */ new Oe() },
      dispersion: { value: 0 },
      iridescence: { value: 0 },
      iridescenceMap: { value: null },
      iridescenceMapTransform: { value: /* @__PURE__ */ new Oe() },
      iridescenceIOR: { value: 1.3 },
      iridescenceThicknessMinimum: { value: 100 },
      iridescenceThicknessMaximum: { value: 400 },
      iridescenceThicknessMap: { value: null },
      iridescenceThicknessMapTransform: { value: /* @__PURE__ */ new Oe() },
      sheen: { value: 0 },
      sheenColor: { value: /* @__PURE__ */ new Ve(0) },
      sheenColorMap: { value: null },
      sheenColorMapTransform: { value: /* @__PURE__ */ new Oe() },
      sheenRoughness: { value: 1 },
      sheenRoughnessMap: { value: null },
      sheenRoughnessMapTransform: { value: /* @__PURE__ */ new Oe() },
      transmission: { value: 0 },
      transmissionMap: { value: null },
      transmissionMapTransform: { value: /* @__PURE__ */ new Oe() },
      transmissionSamplerSize: { value: /* @__PURE__ */ new Ie() },
      transmissionSamplerMap: { value: null },
      thickness: { value: 0 },
      thicknessMap: { value: null },
      thicknessMapTransform: { value: /* @__PURE__ */ new Oe() },
      attenuationDistance: { value: 0 },
      attenuationColor: { value: /* @__PURE__ */ new Ve(0) },
      specularColor: { value: /* @__PURE__ */ new Ve(1, 1, 1) },
      specularColorMap: { value: null },
      specularColorMapTransform: { value: /* @__PURE__ */ new Oe() },
      specularIntensity: { value: 1 },
      specularIntensityMap: { value: null },
      specularIntensityMapTransform: { value: /* @__PURE__ */ new Oe() },
      anisotropyVector: { value: /* @__PURE__ */ new Ie() },
      anisotropyMap: { value: null },
      anisotropyMapTransform: { value: /* @__PURE__ */ new Oe() }
    }
  ]),
  vertexShader: Fe.meshphysical_vert,
  fragmentShader: Fe.meshphysical_frag
};
const kl = { r: 0, b: 0, g: 0 }, $r = /* @__PURE__ */ new Ri(), fA = /* @__PURE__ */ new Mt();
function dA(t, e, n, i, r, s, o) {
  const a = new Ve(0);
  let l = s === !0 ? 0 : 1, u, c, d = null, h = 0, p = null;
  function _(v) {
    let g = v.isScene === !0 ? v.background : null;
    return g && g.isTexture && (g = (v.backgroundBlurriness > 0 ? n : e).get(g)), g;
  }
  function y(v) {
    let g = !1;
    const M = _(v);
    M === null ? f(a, l) : M && M.isColor && (f(M, 1), g = !0);
    const b = t.xr.getEnvironmentBlendMode();
    b === "additive" ? i.buffers.color.setClear(0, 0, 0, 1, o) : b === "alpha-blend" && i.buffers.color.setClear(0, 0, 0, 0, o), (t.autoClear || g) && (i.buffers.depth.setTest(!0), i.buffers.depth.setMask(!0), i.buffers.color.setMask(!0), t.clear(t.autoClearColor, t.autoClearDepth, t.autoClearStencil));
  }
  function m(v, g) {
    const M = _(g);
    M && (M.isCubeTexture || M.mapping === Mc) ? (c === void 0 && (c = new Sn(
      new Lo(1, 1, 1),
      new on({
        name: "BackgroundCubeMaterial",
        uniforms: Mo(Ei.backgroundCube.uniforms),
        vertexShader: Ei.backgroundCube.vertexShader,
        fragmentShader: Ei.backgroundCube.fragmentShader,
        side: Tn,
        depthTest: !1,
        depthWrite: !1,
        fog: !1
      })
    ), c.geometry.deleteAttribute("normal"), c.geometry.deleteAttribute("uv"), c.onBeforeRender = function(b, A, T) {
      this.matrixWorld.copyPosition(T.matrixWorld);
    }, Object.defineProperty(c.material, "envMap", {
      get: function() {
        return this.uniforms.envMap.value;
      }
    }), r.update(c)), $r.copy(g.backgroundRotation), $r.x *= -1, $r.y *= -1, $r.z *= -1, M.isCubeTexture && M.isRenderTargetTexture === !1 && ($r.y *= -1, $r.z *= -1), c.material.uniforms.envMap.value = M, c.material.uniforms.flipEnvMap.value = M.isCubeTexture && M.isRenderTargetTexture === !1 ? -1 : 1, c.material.uniforms.backgroundBlurriness.value = g.backgroundBlurriness, c.material.uniforms.backgroundIntensity.value = g.backgroundIntensity, c.material.uniforms.backgroundRotation.value.setFromMatrix4(fA.makeRotationFromEuler($r)), c.material.toneMapped = Je.getTransfer(M.colorSpace) !== ot, (d !== M || h !== M.version || p !== t.toneMapping) && (c.material.needsUpdate = !0, d = M, h = M.version, p = t.toneMapping), c.layers.enableAll(), v.unshift(c, c.geometry, c.material, 0, 0, null)) : M && M.isTexture && (u === void 0 && (u = new Sn(
      new Eo(2, 2),
      new on({
        name: "BackgroundMaterial",
        uniforms: Mo(Ei.background.uniforms),
        vertexShader: Ei.background.vertexShader,
        fragmentShader: Ei.background.fragmentShader,
        side: Ur,
        depthTest: !1,
        depthWrite: !1,
        fog: !1
      })
    ), u.geometry.deleteAttribute("normal"), Object.defineProperty(u.material, "map", {
      get: function() {
        return this.uniforms.t2D.value;
      }
    }), r.update(u)), u.material.uniforms.t2D.value = M, u.material.uniforms.backgroundIntensity.value = g.backgroundIntensity, u.material.toneMapped = Je.getTransfer(M.colorSpace) !== ot, M.matrixAutoUpdate === !0 && M.updateMatrix(), u.material.uniforms.uvTransform.value.copy(M.matrix), (d !== M || h !== M.version || p !== t.toneMapping) && (u.material.needsUpdate = !0, d = M, h = M.version, p = t.toneMapping), u.layers.enableAll(), v.unshift(u, u.geometry, u.material, 0, 0, null));
  }
  function f(v, g) {
    v.getRGB(kl, Ty(t)), i.buffers.color.setClear(kl.r, kl.g, kl.b, g, o);
  }
  return {
    getClearColor: function() {
      return a;
    },
    setClearColor: function(v, g = 1) {
      a.set(v), l = g, f(a, l);
    },
    getClearAlpha: function() {
      return l;
    },
    setClearAlpha: function(v) {
      l = v, f(a, l);
    },
    render: y,
    addToRenderList: m
  };
}
function hA(t, e) {
  const n = t.getParameter(t.MAX_VERTEX_ATTRIBS), i = {}, r = h(null);
  let s = r, o = !1;
  function a(x, w, H, B, G) {
    let Q = !1;
    const V = d(B, H, w);
    s !== V && (s = V, u(s.object)), Q = p(x, B, H, G), Q && _(x, B, H, G), G !== null && e.update(G, t.ELEMENT_ARRAY_BUFFER), (Q || o) && (o = !1, M(x, w, H, B), G !== null && t.bindBuffer(t.ELEMENT_ARRAY_BUFFER, e.get(G).buffer));
  }
  function l() {
    return t.createVertexArray();
  }
  function u(x) {
    return t.bindVertexArray(x);
  }
  function c(x) {
    return t.deleteVertexArray(x);
  }
  function d(x, w, H) {
    const B = H.wireframe === !0;
    let G = i[x.id];
    G === void 0 && (G = {}, i[x.id] = G);
    let Q = G[w.id];
    Q === void 0 && (Q = {}, G[w.id] = Q);
    let V = Q[B];
    return V === void 0 && (V = h(l()), Q[B] = V), V;
  }
  function h(x) {
    const w = [], H = [], B = [];
    for (let G = 0; G < n; G++)
      w[G] = 0, H[G] = 0, B[G] = 0;
    return {
      // for backward compatibility on non-VAO support browser
      geometry: null,
      program: null,
      wireframe: !1,
      newAttributes: w,
      enabledAttributes: H,
      attributeDivisors: B,
      object: x,
      attributes: {},
      index: null
    };
  }
  function p(x, w, H, B) {
    const G = s.attributes, Q = w.attributes;
    let V = 0;
    const ne = H.getAttributes();
    for (const L in ne)
      if (ne[L].location >= 0) {
        const Z = G[L];
        let se = Q[L];
        if (se === void 0 && (L === "instanceMatrix" && x.instanceMatrix && (se = x.instanceMatrix), L === "instanceColor" && x.instanceColor && (se = x.instanceColor)), Z === void 0 || Z.attribute !== se || se && Z.data !== se.data) return !0;
        V++;
      }
    return s.attributesNum !== V || s.index !== B;
  }
  function _(x, w, H, B) {
    const G = {}, Q = w.attributes;
    let V = 0;
    const ne = H.getAttributes();
    for (const L in ne)
      if (ne[L].location >= 0) {
        let Z = Q[L];
        Z === void 0 && (L === "instanceMatrix" && x.instanceMatrix && (Z = x.instanceMatrix), L === "instanceColor" && x.instanceColor && (Z = x.instanceColor));
        const se = {};
        se.attribute = Z, Z && Z.data && (se.data = Z.data), G[L] = se, V++;
      }
    s.attributes = G, s.attributesNum = V, s.index = B;
  }
  function y() {
    const x = s.newAttributes;
    for (let w = 0, H = x.length; w < H; w++)
      x[w] = 0;
  }
  function m(x) {
    f(x, 0);
  }
  function f(x, w) {
    const H = s.newAttributes, B = s.enabledAttributes, G = s.attributeDivisors;
    H[x] = 1, B[x] === 0 && (t.enableVertexAttribArray(x), B[x] = 1), G[x] !== w && (t.vertexAttribDivisor(x, w), G[x] = w);
  }
  function v() {
    const x = s.newAttributes, w = s.enabledAttributes;
    for (let H = 0, B = w.length; H < B; H++)
      w[H] !== x[H] && (t.disableVertexAttribArray(H), w[H] = 0);
  }
  function g(x, w, H, B, G, Q, V) {
    V === !0 ? t.vertexAttribIPointer(x, w, H, G, Q) : t.vertexAttribPointer(x, w, H, B, G, Q);
  }
  function M(x, w, H, B) {
    y();
    const G = B.attributes, Q = H.getAttributes(), V = w.defaultAttributeValues;
    for (const ne in Q) {
      const L = Q[ne];
      if (L.location >= 0) {
        let q = G[ne];
        if (q === void 0 && (ne === "instanceMatrix" && x.instanceMatrix && (q = x.instanceMatrix), ne === "instanceColor" && x.instanceColor && (q = x.instanceColor)), q !== void 0) {
          const Z = q.normalized, se = q.itemSize, Te = e.get(q);
          if (Te === void 0) continue;
          const Ge = Te.buffer, $ = Te.type, te = Te.bytesPerElement, de = $ === t.INT || $ === t.UNSIGNED_INT || q.gpuType === Gp;
          if (q.isInterleavedBufferAttribute) {
            const ue = q.data, Ne = ue.stride, Ae = q.offset;
            if (ue.isInstancedInterleavedBuffer) {
              for (let je = 0; je < L.locationSize; je++)
                f(L.location + je, ue.meshPerAttribute);
              x.isInstancedMesh !== !0 && B._maxInstanceCount === void 0 && (B._maxInstanceCount = ue.meshPerAttribute * ue.count);
            } else
              for (let je = 0; je < L.locationSize; je++)
                m(L.location + je);
            t.bindBuffer(t.ARRAY_BUFFER, Ge);
            for (let je = 0; je < L.locationSize; je++)
              g(
                L.location + je,
                se / L.locationSize,
                $,
                Z,
                Ne * te,
                (Ae + se / L.locationSize * je) * te,
                de
              );
          } else {
            if (q.isInstancedBufferAttribute) {
              for (let ue = 0; ue < L.locationSize; ue++)
                f(L.location + ue, q.meshPerAttribute);
              x.isInstancedMesh !== !0 && B._maxInstanceCount === void 0 && (B._maxInstanceCount = q.meshPerAttribute * q.count);
            } else
              for (let ue = 0; ue < L.locationSize; ue++)
                m(L.location + ue);
            t.bindBuffer(t.ARRAY_BUFFER, Ge);
            for (let ue = 0; ue < L.locationSize; ue++)
              g(
                L.location + ue,
                se / L.locationSize,
                $,
                Z,
                se * te,
                se / L.locationSize * ue * te,
                de
              );
          }
        } else if (V !== void 0) {
          const Z = V[ne];
          if (Z !== void 0)
            switch (Z.length) {
              case 2:
                t.vertexAttrib2fv(L.location, Z);
                break;
              case 3:
                t.vertexAttrib3fv(L.location, Z);
                break;
              case 4:
                t.vertexAttrib4fv(L.location, Z);
                break;
              default:
                t.vertexAttrib1fv(L.location, Z);
            }
        }
      }
    }
    v();
  }
  function b() {
    R();
    for (const x in i) {
      const w = i[x];
      for (const H in w) {
        const B = w[H];
        for (const G in B)
          c(B[G].object), delete B[G];
        delete w[H];
      }
      delete i[x];
    }
  }
  function A(x) {
    if (i[x.id] === void 0) return;
    const w = i[x.id];
    for (const H in w) {
      const B = w[H];
      for (const G in B)
        c(B[G].object), delete B[G];
      delete w[H];
    }
    delete i[x.id];
  }
  function T(x) {
    for (const w in i) {
      const H = i[w];
      if (H[x.id] === void 0) continue;
      const B = H[x.id];
      for (const G in B)
        c(B[G].object), delete B[G];
      delete H[x.id];
    }
  }
  function R() {
    j(), o = !0, s !== r && (s = r, u(s.object));
  }
  function j() {
    r.geometry = null, r.program = null, r.wireframe = !1;
  }
  return {
    setup: a,
    reset: R,
    resetDefaultState: j,
    dispose: b,
    releaseStatesOfGeometry: A,
    releaseStatesOfProgram: T,
    initAttributes: y,
    enableAttribute: m,
    disableUnusedAttributes: v
  };
}
function pA(t, e, n) {
  let i;
  function r(u) {
    i = u;
  }
  function s(u, c) {
    t.drawArrays(i, u, c), n.update(c, i, 1);
  }
  function o(u, c, d) {
    d !== 0 && (t.drawArraysInstanced(i, u, c, d), n.update(c, i, d));
  }
  function a(u, c, d) {
    if (d === 0) return;
    e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i, u, 0, c, 0, d);
    let p = 0;
    for (let _ = 0; _ < d; _++)
      p += c[_];
    n.update(p, i, 1);
  }
  function l(u, c, d, h) {
    if (d === 0) return;
    const p = e.get("WEBGL_multi_draw");
    if (p === null)
      for (let _ = 0; _ < u.length; _++)
        o(u[_], c[_], h[_]);
    else {
      p.multiDrawArraysInstancedWEBGL(i, u, 0, c, 0, h, 0, d);
      let _ = 0;
      for (let y = 0; y < d; y++)
        _ += c[y];
      for (let y = 0; y < h.length; y++)
        n.update(_, i, h[y]);
    }
  }
  this.setMode = r, this.render = s, this.renderInstances = o, this.renderMultiDraw = a, this.renderMultiDrawInstances = l;
}
function mA(t, e, n, i) {
  let r;
  function s() {
    if (r !== void 0) return r;
    if (e.has("EXT_texture_filter_anisotropic") === !0) {
      const T = e.get("EXT_texture_filter_anisotropic");
      r = t.getParameter(T.MAX_TEXTURE_MAX_ANISOTROPY_EXT);
    } else
      r = 0;
    return r;
  }
  function o(T) {
    return !(T !== di && i.convert(T) !== t.getParameter(t.IMPLEMENTATION_COLOR_READ_FORMAT));
  }
  function a(T) {
    const R = T === Yi && (e.has("EXT_color_buffer_half_float") || e.has("EXT_color_buffer_float"));
    return !(T !== Ji && i.convert(T) !== t.getParameter(t.IMPLEMENTATION_COLOR_READ_TYPE) && // Edge and Chrome Mac < 52 (#9513)
    T !== Wi && !R);
  }
  function l(T) {
    if (T === "highp") {
      if (t.getShaderPrecisionFormat(t.VERTEX_SHADER, t.HIGH_FLOAT).precision > 0 && t.getShaderPrecisionFormat(t.FRAGMENT_SHADER, t.HIGH_FLOAT).precision > 0)
        return "highp";
      T = "mediump";
    }
    return T === "mediump" && t.getShaderPrecisionFormat(t.VERTEX_SHADER, t.MEDIUM_FLOAT).precision > 0 && t.getShaderPrecisionFormat(t.FRAGMENT_SHADER, t.MEDIUM_FLOAT).precision > 0 ? "mediump" : "lowp";
  }
  let u = n.precision !== void 0 ? n.precision : "highp";
  const c = l(u);
  c !== u && (console.warn("THREE.WebGLRenderer:", u, "not supported, using", c, "instead."), u = c);
  const d = n.logarithmicDepthBuffer === !0, h = n.reverseDepthBuffer === !0 && e.has("EXT_clip_control");
  if (h === !0) {
    const T = e.get("EXT_clip_control");
    T.clipControlEXT(T.LOWER_LEFT_EXT, T.ZERO_TO_ONE_EXT);
  }
  const p = t.getParameter(t.MAX_TEXTURE_IMAGE_UNITS), _ = t.getParameter(t.MAX_VERTEX_TEXTURE_IMAGE_UNITS), y = t.getParameter(t.MAX_TEXTURE_SIZE), m = t.getParameter(t.MAX_CUBE_MAP_TEXTURE_SIZE), f = t.getParameter(t.MAX_VERTEX_ATTRIBS), v = t.getParameter(t.MAX_VERTEX_UNIFORM_VECTORS), g = t.getParameter(t.MAX_VARYING_VECTORS), M = t.getParameter(t.MAX_FRAGMENT_UNIFORM_VECTORS), b = _ > 0, A = t.getParameter(t.MAX_SAMPLES);
  return {
    isWebGL2: !0,
    // keeping this for backwards compatibility
    getMaxAnisotropy: s,
    getMaxPrecision: l,
    textureFormatReadable: o,
    textureTypeReadable: a,
    precision: u,
    logarithmicDepthBuffer: d,
    reverseDepthBuffer: h,
    maxTextures: p,
    maxVertexTextures: _,
    maxTextureSize: y,
    maxCubemapSize: m,
    maxAttributes: f,
    maxVertexUniforms: v,
    maxVaryings: g,
    maxFragmentUniforms: M,
    vertexTextures: b,
    maxSamples: A
  };
}
function gA(t) {
  const e = this;
  let n = null, i = 0, r = !1, s = !1;
  const o = new Kr(), a = new Oe(), l = { value: null, needsUpdate: !1 };
  this.uniform = l, this.numPlanes = 0, this.numIntersection = 0, this.init = function(d, h) {
    const p = d.length !== 0 || h || // enable state of previous frame - the clipping code has to
    // run another frame in order to reset the state:
    i !== 0 || r;
    return r = h, i = d.length, p;
  }, this.beginShadows = function() {
    s = !0, c(null);
  }, this.endShadows = function() {
    s = !1;
  }, this.setGlobalState = function(d, h) {
    n = c(d, h, 0);
  }, this.setState = function(d, h, p) {
    const _ = d.clippingPlanes, y = d.clipIntersection, m = d.clipShadows, f = t.get(d);
    if (!r || _ === null || _.length === 0 || s && !m)
      s ? c(null) : u();
    else {
      const v = s ? 0 : i, g = v * 4;
      let M = f.clippingState || null;
      l.value = M, M = c(_, h, g, p);
      for (let b = 0; b !== g; ++b)
        M[b] = n[b];
      f.clippingState = M, this.numIntersection = y ? this.numPlanes : 0, this.numPlanes += v;
    }
  };
  function u() {
    l.value !== n && (l.value = n, l.needsUpdate = i > 0), e.numPlanes = i, e.numIntersection = 0;
  }
  function c(d, h, p, _) {
    const y = d !== null ? d.length : 0;
    let m = null;
    if (y !== 0) {
      if (m = l.value, _ !== !0 || m === null) {
        const f = p + y * 4, v = h.matrixWorldInverse;
        a.getNormalMatrix(v), (m === null || m.length < f) && (m = new Float32Array(f));
        for (let g = 0, M = p; g !== y; ++g, M += 4)
          o.copy(d[g]).applyMatrix4(v, a), o.normal.toArray(m, M), m[M + 3] = o.constant;
      }
      l.value = m, l.needsUpdate = !0;
    }
    return e.numPlanes = y, e.numIntersection = 0, m;
  }
}
function vA(t) {
  let e = /* @__PURE__ */ new WeakMap();
  function n(o, a) {
    return a === rh ? o.mapping = vo : a === sh && (o.mapping = _o), o;
  }
  function i(o) {
    if (o && o.isTexture) {
      const a = o.mapping;
      if (a === rh || a === sh)
        if (e.has(o)) {
          const l = e.get(o).texture;
          return n(l, o.mapping);
        } else {
          const l = o.image;
          if (l && l.height > 0) {
            const u = new Rw(l.height);
            return u.fromEquirectangularTexture(t, o), e.set(o, u), o.addEventListener("dispose", r), n(u.texture, o.mapping);
          } else
            return null;
        }
    }
    return o;
  }
  function r(o) {
    const a = o.target;
    a.removeEventListener("dispose", r);
    const l = e.get(a);
    l !== void 0 && (e.delete(a), l.dispose());
  }
  function s() {
    e = /* @__PURE__ */ new WeakMap();
  }
  return {
    get: i,
    dispose: s
  };
}
class Jp extends Cy {
  constructor(e = -1, n = 1, i = 1, r = -1, s = 0.1, o = 2e3) {
    super(), this.isOrthographicCamera = !0, this.type = "OrthographicCamera", this.zoom = 1, this.view = null, this.left = e, this.right = n, this.top = i, this.bottom = r, this.near = s, this.far = o, this.updateProjectionMatrix();
  }
  copy(e, n) {
    return super.copy(e, n), this.left = e.left, this.right = e.right, this.top = e.top, this.bottom = e.bottom, this.near = e.near, this.far = e.far, this.zoom = e.zoom, this.view = e.view === null ? null : Object.assign({}, e.view), this;
  }
  setViewOffset(e, n, i, r, s, o) {
    this.view === null && (this.view = {
      enabled: !0,
      fullWidth: 1,
      fullHeight: 1,
      offsetX: 0,
      offsetY: 0,
      width: 1,
      height: 1
    }), this.view.enabled = !0, this.view.fullWidth = e, this.view.fullHeight = n, this.view.offsetX = i, this.view.offsetY = r, this.view.width = s, this.view.height = o, this.updateProjectionMatrix();
  }
  clearViewOffset() {
    this.view !== null && (this.view.enabled = !1), this.updateProjectionMatrix();
  }
  updateProjectionMatrix() {
    const e = (this.right - this.left) / (2 * this.zoom), n = (this.top - this.bottom) / (2 * this.zoom), i = (this.right + this.left) / 2, r = (this.top + this.bottom) / 2;
    let s = i - e, o = i + e, a = r + n, l = r - n;
    if (this.view !== null && this.view.enabled) {
      const u = (this.right - this.left) / this.view.fullWidth / this.zoom, c = (this.top - this.bottom) / this.view.fullHeight / this.zoom;
      s += u * this.view.offsetX, o = s + u * this.view.width, a -= c * this.view.offsetY, l = a - c * this.view.height;
    }
    this.projectionMatrix.makeOrthographic(s, o, a, l, this.near, this.far, this.coordinateSystem), this.projectionMatrixInverse.copy(this.projectionMatrix).invert();
  }
  toJSON(e) {
    const n = super.toJSON(e);
    return n.object.zoom = this.zoom, n.object.left = this.left, n.object.right = this.right, n.object.top = this.top, n.object.bottom = this.bottom, n.object.near = this.near, n.object.far = this.far, this.view !== null && (n.object.view = Object.assign({}, this.view)), n;
  }
}
const Qs = 4, cv = [0.125, 0.215, 0.35, 0.446, 0.526, 0.582], Jr = 20, Of = /* @__PURE__ */ new Jp(), fv = /* @__PURE__ */ new Ve();
let Bf = null, zf = 0, Hf = 0, Vf = !1;
const Zr = (1 + Math.sqrt(5)) / 2, ks = 1 / Zr, dv = [
  /* @__PURE__ */ new k(-Zr, ks, 0),
  /* @__PURE__ */ new k(Zr, ks, 0),
  /* @__PURE__ */ new k(-ks, 0, Zr),
  /* @__PURE__ */ new k(ks, 0, Zr),
  /* @__PURE__ */ new k(0, Zr, -ks),
  /* @__PURE__ */ new k(0, Zr, ks),
  /* @__PURE__ */ new k(-1, 1, -1),
  /* @__PURE__ */ new k(1, 1, -1),
  /* @__PURE__ */ new k(-1, 1, 1),
  /* @__PURE__ */ new k(1, 1, 1)
];
class hv {
  constructor(e) {
    this._renderer = e, this._pingPongRenderTarget = null, this._lodMax = 0, this._cubeSize = 0, this._lodPlanes = [], this._sizeLods = [], this._sigmas = [], this._blurMaterial = null, this._cubemapMaterial = null, this._equirectMaterial = null, this._compileMaterial(this._blurMaterial);
  }
  /**
   * Generates a PMREM from a supplied Scene, which can be faster than using an
   * image if networking bandwidth is low. Optional sigma specifies a blur radius
   * in radians to be applied to the scene before PMREM generation. Optional near
   * and far planes ensure the scene is rendered in its entirety (the cubeCamera
   * is placed at the origin).
   */
  fromScene(e, n = 0, i = 0.1, r = 100) {
    Bf = this._renderer.getRenderTarget(), zf = this._renderer.getActiveCubeFace(), Hf = this._renderer.getActiveMipmapLevel(), Vf = this._renderer.xr.enabled, this._renderer.xr.enabled = !1, this._setSize(256);
    const s = this._allocateTargets();
    return s.depthBuffer = !0, this._sceneToCubeUV(e, i, r, s), n > 0 && this._blur(s, 0, 0, n), this._applyPMREM(s), this._cleanup(s), s;
  }
  /**
   * Generates a PMREM from an equirectangular texture, which can be either LDR
   * or HDR. The ideal input image size is 1k (1024 x 512),
   * as this matches best with the 256 x 256 cubemap output.
   * The smallest supported equirectangular image size is 64 x 32.
   */
  fromEquirectangular(e, n = null) {
    return this._fromTexture(e, n);
  }
  /**
   * Generates a PMREM from an cubemap texture, which can be either LDR
   * or HDR. The ideal input cube size is 256 x 256,
   * as this matches best with the 256 x 256 cubemap output.
   * The smallest supported cube size is 16 x 16.
   */
  fromCubemap(e, n = null) {
    return this._fromTexture(e, n);
  }
  /**
   * Pre-compiles the cubemap shader. You can get faster start-up by invoking this method during
   * your texture's network fetch for increased concurrency.
   */
  compileCubemapShader() {
    this._cubemapMaterial === null && (this._cubemapMaterial = gv(), this._compileMaterial(this._cubemapMaterial));
  }
  /**
   * Pre-compiles the equirectangular shader. You can get faster start-up by invoking this method during
   * your texture's network fetch for increased concurrency.
   */
  compileEquirectangularShader() {
    this._equirectMaterial === null && (this._equirectMaterial = mv(), this._compileMaterial(this._equirectMaterial));
  }
  /**
   * Disposes of the PMREMGenerator's internal memory. Note that PMREMGenerator is a static class,
   * so you should not need more than one PMREMGenerator object. If you do, calling dispose() on
   * one of them will cause any others to also become unusable.
   */
  dispose() {
    this._dispose(), this._cubemapMaterial !== null && this._cubemapMaterial.dispose(), this._equirectMaterial !== null && this._equirectMaterial.dispose();
  }
  // private interface
  _setSize(e) {
    this._lodMax = Math.floor(Math.log2(e)), this._cubeSize = Math.pow(2, this._lodMax);
  }
  _dispose() {
    this._blurMaterial !== null && this._blurMaterial.dispose(), this._pingPongRenderTarget !== null && this._pingPongRenderTarget.dispose();
    for (let e = 0; e < this._lodPlanes.length; e++)
      this._lodPlanes[e].dispose();
  }
  _cleanup(e) {
    this._renderer.setRenderTarget(Bf, zf, Hf), this._renderer.xr.enabled = Vf, e.scissorTest = !1, Fl(e, 0, 0, e.width, e.height);
  }
  _fromTexture(e, n) {
    e.mapping === vo || e.mapping === _o ? this._setSize(e.image.length === 0 ? 16 : e.image[0].width || e.image[0].image.width) : this._setSize(e.image.width / 4), Bf = this._renderer.getRenderTarget(), zf = this._renderer.getActiveCubeFace(), Hf = this._renderer.getActiveMipmapLevel(), Vf = this._renderer.xr.enabled, this._renderer.xr.enabled = !1;
    const i = n || this._allocateTargets();
    return this._textureToCubeUV(e, i), this._applyPMREM(i), this._cleanup(i), i;
  }
  _allocateTargets() {
    const e = 3 * Math.max(this._cubeSize, 112), n = 4 * this._cubeSize, i = {
      magFilter: ci,
      minFilter: ci,
      generateMipmaps: !1,
      type: Yi,
      format: di,
      colorSpace: Br,
      depthBuffer: !1
    }, r = pv(e, n, i);
    if (this._pingPongRenderTarget === null || this._pingPongRenderTarget.width !== e || this._pingPongRenderTarget.height !== n) {
      this._pingPongRenderTarget !== null && this._dispose(), this._pingPongRenderTarget = pv(e, n, i);
      const { _lodMax: s } = this;
      ({ sizeLods: this._sizeLods, lodPlanes: this._lodPlanes, sigmas: this._sigmas } = _A(s)), this._blurMaterial = xA(s, e, n);
    }
    return r;
  }
  _compileMaterial(e) {
    const n = new Sn(this._lodPlanes[0], e);
    this._renderer.compile(n, Of);
  }
  _sceneToCubeUV(e, n, i, r) {
    const a = new On(90, 1, n, i), l = [1, -1, 1, 1, 1, 1], u = [1, 1, 1, -1, -1, -1], c = this._renderer, d = c.autoClear, h = c.toneMapping;
    c.getClearColor(fv), c.toneMapping = Dr, c.autoClear = !1;
    const p = new Zp({
      name: "PMREM.Background",
      side: Tn,
      depthWrite: !1,
      depthTest: !1
    }), _ = new Sn(new Lo(), p);
    let y = !1;
    const m = e.background;
    m ? m.isColor && (p.color.copy(m), e.background = null, y = !0) : (p.color.copy(fv), y = !0);
    for (let f = 0; f < 6; f++) {
      const v = f % 3;
      v === 0 ? (a.up.set(0, l[f], 0), a.lookAt(u[f], 0, 0)) : v === 1 ? (a.up.set(0, 0, l[f]), a.lookAt(0, u[f], 0)) : (a.up.set(0, l[f], 0), a.lookAt(0, 0, u[f]));
      const g = this._cubeSize;
      Fl(r, v * g, f > 2 ? g : 0, g, g), c.setRenderTarget(r), y && c.render(_, a), c.render(e, a);
    }
    _.geometry.dispose(), _.material.dispose(), c.toneMapping = h, c.autoClear = d, e.background = m;
  }
  _textureToCubeUV(e, n) {
    const i = this._renderer, r = e.mapping === vo || e.mapping === _o;
    r ? (this._cubemapMaterial === null && (this._cubemapMaterial = gv()), this._cubemapMaterial.uniforms.flipEnvMap.value = e.isRenderTargetTexture === !1 ? -1 : 1) : this._equirectMaterial === null && (this._equirectMaterial = mv());
    const s = r ? this._cubemapMaterial : this._equirectMaterial, o = new Sn(this._lodPlanes[0], s), a = s.uniforms;
    a.envMap.value = e;
    const l = this._cubeSize;
    Fl(n, 0, 0, 3 * l, 2 * l), i.setRenderTarget(n), i.render(o, Of);
  }
  _applyPMREM(e) {
    const n = this._renderer, i = n.autoClear;
    n.autoClear = !1;
    const r = this._lodPlanes.length;
    for (let s = 1; s < r; s++) {
      const o = Math.sqrt(this._sigmas[s] * this._sigmas[s] - this._sigmas[s - 1] * this._sigmas[s - 1]), a = dv[(r - s - 1) % dv.length];
      this._blur(e, s - 1, s, o, a);
    }
    n.autoClear = i;
  }
  /**
   * This is a two-pass Gaussian blur for a cubemap. Normally this is done
   * vertically and horizontally, but this breaks down on a cube. Here we apply
   * the blur latitudinally (around the poles), and then longitudinally (towards
   * the poles) to approximate the orthogonally-separable blur. It is least
   * accurate at the poles, but still does a decent job.
   */
  _blur(e, n, i, r, s) {
    const o = this._pingPongRenderTarget;
    this._halfBlur(
      e,
      o,
      n,
      i,
      r,
      "latitudinal",
      s
    ), this._halfBlur(
      o,
      e,
      i,
      i,
      r,
      "longitudinal",
      s
    );
  }
  _halfBlur(e, n, i, r, s, o, a) {
    const l = this._renderer, u = this._blurMaterial;
    o !== "latitudinal" && o !== "longitudinal" && console.error(
      "blur direction must be either latitudinal or longitudinal!"
    );
    const c = 3, d = new Sn(this._lodPlanes[r], u), h = u.uniforms, p = this._sizeLods[i] - 1, _ = isFinite(s) ? Math.PI / (2 * p) : 2 * Math.PI / (2 * Jr - 1), y = s / _, m = isFinite(s) ? 1 + Math.floor(c * y) : Jr;
    m > Jr && console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Jr}`);
    const f = [];
    let v = 0;
    for (let T = 0; T < Jr; ++T) {
      const R = T / y, j = Math.exp(-R * R / 2);
      f.push(j), T === 0 ? v += j : T < m && (v += 2 * j);
    }
    for (let T = 0; T < f.length; T++)
      f[T] = f[T] / v;
    h.envMap.value = e.texture, h.samples.value = m, h.weights.value = f, h.latitudinal.value = o === "latitudinal", a && (h.poleAxis.value = a);
    const { _lodMax: g } = this;
    h.dTheta.value = _, h.mipInt.value = g - i;
    const M = this._sizeLods[r], b = 3 * M * (r > g - Qs ? r - g + Qs : 0), A = 4 * (this._cubeSize - M);
    Fl(n, b, A, 3 * M, 2 * M), l.setRenderTarget(n), l.render(d, Of);
  }
}
function _A(t) {
  const e = [], n = [], i = [];
  let r = t;
  const s = t - Qs + 1 + cv.length;
  for (let o = 0; o < s; o++) {
    const a = Math.pow(2, r);
    n.push(a);
    let l = 1 / a;
    o > t - Qs ? l = cv[o - t + Qs - 1] : o === 0 && (l = 0), i.push(l);
    const u = 1 / (a - 2), c = -u, d = 1 + u, h = [c, c, d, c, d, d, c, c, d, d, c, d], p = 6, _ = 6, y = 3, m = 2, f = 1, v = new Float32Array(y * _ * p), g = new Float32Array(m * _ * p), M = new Float32Array(f * _ * p);
    for (let A = 0; A < p; A++) {
      const T = A % 3 * 2 / 3 - 1, R = A > 2 ? 0 : -1, j = [
        T,
        R,
        0,
        T + 2 / 3,
        R,
        0,
        T + 2 / 3,
        R + 1,
        0,
        T,
        R,
        0,
        T + 2 / 3,
        R + 1,
        0,
        T,
        R + 1,
        0
      ];
      v.set(j, y * _ * A), g.set(h, m * _ * A);
      const x = [A, A, A, A, A, A];
      M.set(x, f * _ * A);
    }
    const b = new ir();
    b.setAttribute("position", new Ai(v, y)), b.setAttribute("uv", new Ai(g, m)), b.setAttribute("faceIndex", new Ai(M, f)), e.push(b), r > Qs && r--;
  }
  return { lodPlanes: e, sizeLods: n, sigmas: i };
}
function pv(t, e, n) {
  const i = new mi(t, e, n);
  return i.texture.mapping = Mc, i.texture.name = "PMREM.cubeUv", i.scissorTest = !0, i;
}
function Fl(t, e, n, i, r) {
  t.viewport.set(e, n, i, r), t.scissor.set(e, n, i, r);
}
function xA(t, e, n) {
  const i = new Float32Array(Jr), r = new k(0, 1, 0);
  return new on({
    name: "SphericalGaussianBlur",
    defines: {
      n: Jr,
      CUBEUV_TEXEL_WIDTH: 1 / e,
      CUBEUV_TEXEL_HEIGHT: 1 / n,
      CUBEUV_MAX_MIP: `${t}.0`
    },
    uniforms: {
      envMap: { value: null },
      samples: { value: 1 },
      weights: { value: i },
      latitudinal: { value: !1 },
      dTheta: { value: 0 },
      mipInt: { value: 0 },
      poleAxis: { value: r }
    },
    vertexShader: em(),
    fragmentShader: (
      /* glsl */
      `

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`
    ),
    blending: Xi,
    depthTest: !1,
    depthWrite: !1
  });
}
function mv() {
  return new on({
    name: "EquirectangularToCubeUV",
    uniforms: {
      envMap: { value: null }
    },
    vertexShader: em(),
    fragmentShader: (
      /* glsl */
      `

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`
    ),
    blending: Xi,
    depthTest: !1,
    depthWrite: !1
  });
}
function gv() {
  return new on({
    name: "CubemapToCubeUV",
    uniforms: {
      envMap: { value: null },
      flipEnvMap: { value: -1 }
    },
    vertexShader: em(),
    fragmentShader: (
      /* glsl */
      `

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`
    ),
    blending: Xi,
    depthTest: !1,
    depthWrite: !1
  });
}
function em() {
  return (
    /* glsl */
    `

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`
  );
}
function yA(t) {
  let e = /* @__PURE__ */ new WeakMap(), n = null;
  function i(a) {
    if (a && a.isTexture) {
      const l = a.mapping, u = l === rh || l === sh, c = l === vo || l === _o;
      if (u || c) {
        let d = e.get(a);
        const h = d !== void 0 ? d.texture.pmremVersion : 0;
        if (a.isRenderTargetTexture && a.pmremVersion !== h)
          return n === null && (n = new hv(t)), d = u ? n.fromEquirectangular(a, d) : n.fromCubemap(a, d), d.texture.pmremVersion = a.pmremVersion, e.set(a, d), d.texture;
        if (d !== void 0)
          return d.texture;
        {
          const p = a.image;
          return u && p && p.height > 0 || c && p && r(p) ? (n === null && (n = new hv(t)), d = u ? n.fromEquirectangular(a) : n.fromCubemap(a), d.texture.pmremVersion = a.pmremVersion, e.set(a, d), a.addEventListener("dispose", s), d.texture) : null;
        }
      }
    }
    return a;
  }
  function r(a) {
    let l = 0;
    const u = 6;
    for (let c = 0; c < u; c++)
      a[c] !== void 0 && l++;
    return l === u;
  }
  function s(a) {
    const l = a.target;
    l.removeEventListener("dispose", s);
    const u = e.get(l);
    u !== void 0 && (e.delete(l), u.dispose());
  }
  function o() {
    e = /* @__PURE__ */ new WeakMap(), n !== null && (n.dispose(), n = null);
  }
  return {
    get: i,
    dispose: o
  };
}
function SA(t) {
  const e = {};
  function n(i) {
    if (e[i] !== void 0)
      return e[i];
    let r;
    switch (i) {
      case "WEBGL_depth_texture":
        r = t.getExtension("WEBGL_depth_texture") || t.getExtension("MOZ_WEBGL_depth_texture") || t.getExtension("WEBKIT_WEBGL_depth_texture");
        break;
      case "EXT_texture_filter_anisotropic":
        r = t.getExtension("EXT_texture_filter_anisotropic") || t.getExtension("MOZ_EXT_texture_filter_anisotropic") || t.getExtension("WEBKIT_EXT_texture_filter_anisotropic");
        break;
      case "WEBGL_compressed_texture_s3tc":
        r = t.getExtension("WEBGL_compressed_texture_s3tc") || t.getExtension("MOZ_WEBGL_compressed_texture_s3tc") || t.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");
        break;
      case "WEBGL_compressed_texture_pvrtc":
        r = t.getExtension("WEBGL_compressed_texture_pvrtc") || t.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");
        break;
      default:
        r = t.getExtension(i);
    }
    return e[i] = r, r;
  }
  return {
    has: function(i) {
      return n(i) !== null;
    },
    init: function() {
      n("EXT_color_buffer_float"), n("WEBGL_clip_cull_distance"), n("OES_texture_float_linear"), n("EXT_color_buffer_half_float"), n("WEBGL_multisampled_render_to_texture"), n("WEBGL_render_shared_exponent");
    },
    get: function(i) {
      const r = n(i);
      return r === null && au("THREE.WebGLRenderer: " + i + " extension not supported."), r;
    }
  };
}
function MA(t, e, n, i) {
  const r = {}, s = /* @__PURE__ */ new WeakMap();
  function o(d) {
    const h = d.target;
    h.index !== null && e.remove(h.index);
    for (const _ in h.attributes)
      e.remove(h.attributes[_]);
    for (const _ in h.morphAttributes) {
      const y = h.morphAttributes[_];
      for (let m = 0, f = y.length; m < f; m++)
        e.remove(y[m]);
    }
    h.removeEventListener("dispose", o), delete r[h.id];
    const p = s.get(h);
    p && (e.remove(p), s.delete(h)), i.releaseStatesOfGeometry(h), h.isInstancedBufferGeometry === !0 && delete h._maxInstanceCount, n.memory.geometries--;
  }
  function a(d, h) {
    return r[h.id] === !0 || (h.addEventListener("dispose", o), r[h.id] = !0, n.memory.geometries++), h;
  }
  function l(d) {
    const h = d.attributes;
    for (const _ in h)
      e.update(h[_], t.ARRAY_BUFFER);
    const p = d.morphAttributes;
    for (const _ in p) {
      const y = p[_];
      for (let m = 0, f = y.length; m < f; m++)
        e.update(y[m], t.ARRAY_BUFFER);
    }
  }
  function u(d) {
    const h = [], p = d.index, _ = d.attributes.position;
    let y = 0;
    if (p !== null) {
      const v = p.array;
      y = p.version;
      for (let g = 0, M = v.length; g < M; g += 3) {
        const b = v[g + 0], A = v[g + 1], T = v[g + 2];
        h.push(b, A, A, T, T, b);
      }
    } else if (_ !== void 0) {
      const v = _.array;
      y = _.version;
      for (let g = 0, M = v.length / 3 - 1; g < M; g += 3) {
        const b = g + 0, A = g + 1, T = g + 2;
        h.push(b, A, A, T, T, b);
      }
    } else
      return;
    const m = new (_y(h) ? wy : Ey)(h, 1);
    m.version = y;
    const f = s.get(d);
    f && e.remove(f), s.set(d, m);
  }
  function c(d) {
    const h = s.get(d);
    if (h) {
      const p = d.index;
      p !== null && h.version < p.version && u(d);
    } else
      u(d);
    return s.get(d);
  }
  return {
    get: a,
    update: l,
    getWireframeAttribute: c
  };
}
function EA(t, e, n) {
  let i;
  function r(h) {
    i = h;
  }
  let s, o;
  function a(h) {
    s = h.type, o = h.bytesPerElement;
  }
  function l(h, p) {
    t.drawElements(i, p, s, h * o), n.update(p, i, 1);
  }
  function u(h, p, _) {
    _ !== 0 && (t.drawElementsInstanced(i, p, s, h * o, _), n.update(p, i, _));
  }
  function c(h, p, _) {
    if (_ === 0) return;
    e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i, p, 0, s, h, 0, _);
    let m = 0;
    for (let f = 0; f < _; f++)
      m += p[f];
    n.update(m, i, 1);
  }
  function d(h, p, _, y) {
    if (_ === 0) return;
    const m = e.get("WEBGL_multi_draw");
    if (m === null)
      for (let f = 0; f < h.length; f++)
        u(h[f] / o, p[f], y[f]);
    else {
      m.multiDrawElementsInstancedWEBGL(i, p, 0, s, h, 0, y, 0, _);
      let f = 0;
      for (let v = 0; v < _; v++)
        f += p[v];
      for (let v = 0; v < y.length; v++)
        n.update(f, i, y[v]);
    }
  }
  this.setMode = r, this.setIndex = a, this.render = l, this.renderInstances = u, this.renderMultiDraw = c, this.renderMultiDrawInstances = d;
}
function wA(t) {
  const e = {
    geometries: 0,
    textures: 0
  }, n = {
    frame: 0,
    calls: 0,
    triangles: 0,
    points: 0,
    lines: 0
  };
  function i(s, o, a) {
    switch (n.calls++, o) {
      case t.TRIANGLES:
        n.triangles += a * (s / 3);
        break;
      case t.LINES:
        n.lines += a * (s / 2);
        break;
      case t.LINE_STRIP:
        n.lines += a * (s - 1);
        break;
      case t.LINE_LOOP:
        n.lines += a * s;
        break;
      case t.POINTS:
        n.points += a * s;
        break;
      default:
        console.error("THREE.WebGLInfo: Unknown draw mode:", o);
        break;
    }
  }
  function r() {
    n.calls = 0, n.triangles = 0, n.points = 0, n.lines = 0;
  }
  return {
    memory: e,
    render: n,
    programs: null,
    autoReset: !0,
    reset: r,
    update: i
  };
}
function TA(t, e, n) {
  const i = /* @__PURE__ */ new WeakMap(), r = new St();
  function s(o, a, l) {
    const u = o.morphTargetInfluences, c = a.morphAttributes.position || a.morphAttributes.normal || a.morphAttributes.color, d = c !== void 0 ? c.length : 0;
    let h = i.get(a);
    if (h === void 0 || h.count !== d) {
      let j = function() {
        T.dispose(), i.delete(a), a.removeEventListener("dispose", j);
      };
      h !== void 0 && h.texture.dispose();
      const p = a.morphAttributes.position !== void 0, _ = a.morphAttributes.normal !== void 0, y = a.morphAttributes.color !== void 0, m = a.morphAttributes.position || [], f = a.morphAttributes.normal || [], v = a.morphAttributes.color || [];
      let g = 0;
      p === !0 && (g = 1), _ === !0 && (g = 2), y === !0 && (g = 3);
      let M = a.attributes.position.count * g, b = 1;
      M > e.maxTextureSize && (b = Math.ceil(M / e.maxTextureSize), M = e.maxTextureSize);
      const A = new Float32Array(M * b * 4 * d), T = new yy(A, M, b, d);
      T.type = Wi, T.needsUpdate = !0;
      const R = g * 4;
      for (let x = 0; x < d; x++) {
        const w = m[x], H = f[x], B = v[x], G = M * b * 4 * x;
        for (let Q = 0; Q < w.count; Q++) {
          const V = Q * R;
          p === !0 && (r.fromBufferAttribute(w, Q), A[G + V + 0] = r.x, A[G + V + 1] = r.y, A[G + V + 2] = r.z, A[G + V + 3] = 0), _ === !0 && (r.fromBufferAttribute(H, Q), A[G + V + 4] = r.x, A[G + V + 5] = r.y, A[G + V + 6] = r.z, A[G + V + 7] = 0), y === !0 && (r.fromBufferAttribute(B, Q), A[G + V + 8] = r.x, A[G + V + 9] = r.y, A[G + V + 10] = r.z, A[G + V + 11] = B.itemSize === 4 ? r.w : 1);
        }
      }
      h = {
        count: d,
        texture: T,
        size: new Ie(M, b)
      }, i.set(a, h), a.addEventListener("dispose", j);
    }
    if (o.isInstancedMesh === !0 && o.morphTexture !== null)
      l.getUniforms().setValue(t, "morphTexture", o.morphTexture, n);
    else {
      let p = 0;
      for (let y = 0; y < u.length; y++)
        p += u[y];
      const _ = a.morphTargetsRelative ? 1 : 1 - p;
      l.getUniforms().setValue(t, "morphTargetBaseInfluence", _), l.getUniforms().setValue(t, "morphTargetInfluences", u);
    }
    l.getUniforms().setValue(t, "morphTargetsTexture", h.texture, n), l.getUniforms().setValue(t, "morphTargetsTextureSize", h.size);
  }
  return {
    update: s
  };
}
function CA(t, e, n, i) {
  let r = /* @__PURE__ */ new WeakMap();
  function s(l) {
    const u = i.render.frame, c = l.geometry, d = e.get(l, c);
    if (r.get(d) !== u && (e.update(d), r.set(d, u)), l.isInstancedMesh && (l.hasEventListener("dispose", a) === !1 && l.addEventListener("dispose", a), r.get(l) !== u && (n.update(l.instanceMatrix, t.ARRAY_BUFFER), l.instanceColor !== null && n.update(l.instanceColor, t.ARRAY_BUFFER), r.set(l, u))), l.isSkinnedMesh) {
      const h = l.skeleton;
      r.get(h) !== u && (h.update(), r.set(h, u));
    }
    return d;
  }
  function o() {
    r = /* @__PURE__ */ new WeakMap();
  }
  function a(l) {
    const u = l.target;
    u.removeEventListener("dispose", a), n.remove(u.instanceMatrix), u.instanceColor !== null && n.remove(u.instanceColor);
  }
  return {
    update: s,
    dispose: o
  };
}
class by extends ln {
  constructor(e, n, i, r, s, o, a, l, u, c = oo) {
    if (c !== oo && c !== So)
      throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");
    i === void 0 && c === oo && (i = vs), i === void 0 && c === So && (i = yo), super(null, r, s, o, a, l, c, i, u), this.isDepthTexture = !0, this.image = { width: e, height: n }, this.magFilter = a !== void 0 ? a : Zn, this.minFilter = l !== void 0 ? l : Zn, this.flipY = !1, this.generateMipmaps = !1, this.compareFunction = null;
  }
  copy(e) {
    return super.copy(e), this.compareFunction = e.compareFunction, this;
  }
  toJSON(e) {
    const n = super.toJSON(e);
    return this.compareFunction !== null && (n.compareFunction = this.compareFunction), n;
  }
}
const Py = /* @__PURE__ */ new ln(), vv = /* @__PURE__ */ new by(1, 1), Ly = /* @__PURE__ */ new yy(), Dy = /* @__PURE__ */ new dw(), Iy = /* @__PURE__ */ new Ay(), _v = [], xv = [], yv = new Float32Array(16), Sv = new Float32Array(9), Mv = new Float32Array(4);
function Do(t, e, n) {
  const i = t[0];
  if (i <= 0 || i > 0) return t;
  const r = e * n;
  let s = _v[r];
  if (s === void 0 && (s = new Float32Array(r), _v[r] = s), e !== 0) {
    i.toArray(s, 0);
    for (let o = 1, a = 0; o !== e; ++o)
      a += n, t[o].toArray(s, a);
  }
  return s;
}
function Ut(t, e) {
  if (t.length !== e.length) return !1;
  for (let n = 0, i = t.length; n < i; n++)
    if (t[n] !== e[n]) return !1;
  return !0;
}
function kt(t, e) {
  for (let n = 0, i = e.length; n < i; n++)
    t[n] = e[n];
}
function wc(t, e) {
  let n = xv[e];
  n === void 0 && (n = new Int32Array(e), xv[e] = n);
  for (let i = 0; i !== e; ++i)
    n[i] = t.allocateTextureUnit();
  return n;
}
function AA(t, e) {
  const n = this.cache;
  n[0] !== e && (t.uniform1f(this.addr, e), n[0] = e);
}
function RA(t, e) {
  const n = this.cache;
  if (e.x !== void 0)
    (n[0] !== e.x || n[1] !== e.y) && (t.uniform2f(this.addr, e.x, e.y), n[0] = e.x, n[1] = e.y);
  else {
    if (Ut(n, e)) return;
    t.uniform2fv(this.addr, e), kt(n, e);
  }
}
function bA(t, e) {
  const n = this.cache;
  if (e.x !== void 0)
    (n[0] !== e.x || n[1] !== e.y || n[2] !== e.z) && (t.uniform3f(this.addr, e.x, e.y, e.z), n[0] = e.x, n[1] = e.y, n[2] = e.z);
  else if (e.r !== void 0)
    (n[0] !== e.r || n[1] !== e.g || n[2] !== e.b) && (t.uniform3f(this.addr, e.r, e.g, e.b), n[0] = e.r, n[1] = e.g, n[2] = e.b);
  else {
    if (Ut(n, e)) return;
    t.uniform3fv(this.addr, e), kt(n, e);
  }
}
function PA(t, e) {
  const n = this.cache;
  if (e.x !== void 0)
    (n[0] !== e.x || n[1] !== e.y || n[2] !== e.z || n[3] !== e.w) && (t.uniform4f(this.addr, e.x, e.y, e.z, e.w), n[0] = e.x, n[1] = e.y, n[2] = e.z, n[3] = e.w);
  else {
    if (Ut(n, e)) return;
    t.uniform4fv(this.addr, e), kt(n, e);
  }
}
function LA(t, e) {
  const n = this.cache, i = e.elements;
  if (i === void 0) {
    if (Ut(n, e)) return;
    t.uniformMatrix2fv(this.addr, !1, e), kt(n, e);
  } else {
    if (Ut(n, i)) return;
    Mv.set(i), t.uniformMatrix2fv(this.addr, !1, Mv), kt(n, i);
  }
}
function DA(t, e) {
  const n = this.cache, i = e.elements;
  if (i === void 0) {
    if (Ut(n, e)) return;
    t.uniformMatrix3fv(this.addr, !1, e), kt(n, e);
  } else {
    if (Ut(n, i)) return;
    Sv.set(i), t.uniformMatrix3fv(this.addr, !1, Sv), kt(n, i);
  }
}
function IA(t, e) {
  const n = this.cache, i = e.elements;
  if (i === void 0) {
    if (Ut(n, e)) return;
    t.uniformMatrix4fv(this.addr, !1, e), kt(n, e);
  } else {
    if (Ut(n, i)) return;
    yv.set(i), t.uniformMatrix4fv(this.addr, !1, yv), kt(n, i);
  }
}
function NA(t, e) {
  const n = this.cache;
  n[0] !== e && (t.uniform1i(this.addr, e), n[0] = e);
}
function UA(t, e) {
  const n = this.cache;
  if (e.x !== void 0)
    (n[0] !== e.x || n[1] !== e.y) && (t.uniform2i(this.addr, e.x, e.y), n[0] = e.x, n[1] = e.y);
  else {
    if (Ut(n, e)) return;
    t.uniform2iv(this.addr, e), kt(n, e);
  }
}
function kA(t, e) {
  const n = this.cache;
  if (e.x !== void 0)
    (n[0] !== e.x || n[1] !== e.y || n[2] !== e.z) && (t.uniform3i(this.addr, e.x, e.y, e.z), n[0] = e.x, n[1] = e.y, n[2] = e.z);
  else {
    if (Ut(n, e)) return;
    t.uniform3iv(this.addr, e), kt(n, e);
  }
}
function FA(t, e) {
  const n = this.cache;
  if (e.x !== void 0)
    (n[0] !== e.x || n[1] !== e.y || n[2] !== e.z || n[3] !== e.w) && (t.uniform4i(this.addr, e.x, e.y, e.z, e.w), n[0] = e.x, n[1] = e.y, n[2] = e.z, n[3] = e.w);
  else {
    if (Ut(n, e)) return;
    t.uniform4iv(this.addr, e), kt(n, e);
  }
}
function OA(t, e) {
  const n = this.cache;
  n[0] !== e && (t.uniform1ui(this.addr, e), n[0] = e);
}
function BA(t, e) {
  const n = this.cache;
  if (e.x !== void 0)
    (n[0] !== e.x || n[1] !== e.y) && (t.uniform2ui(this.addr, e.x, e.y), n[0] = e.x, n[1] = e.y);
  else {
    if (Ut(n, e)) return;
    t.uniform2uiv(this.addr, e), kt(n, e);
  }
}
function zA(t, e) {
  const n = this.cache;
  if (e.x !== void 0)
    (n[0] !== e.x || n[1] !== e.y || n[2] !== e.z) && (t.uniform3ui(this.addr, e.x, e.y, e.z), n[0] = e.x, n[1] = e.y, n[2] = e.z);
  else {
    if (Ut(n, e)) return;
    t.uniform3uiv(this.addr, e), kt(n, e);
  }
}
function HA(t, e) {
  const n = this.cache;
  if (e.x !== void 0)
    (n[0] !== e.x || n[1] !== e.y || n[2] !== e.z || n[3] !== e.w) && (t.uniform4ui(this.addr, e.x, e.y, e.z, e.w), n[0] = e.x, n[1] = e.y, n[2] = e.z, n[3] = e.w);
  else {
    if (Ut(n, e)) return;
    t.uniform4uiv(this.addr, e), kt(n, e);
  }
}
function VA(t, e, n) {
  const i = this.cache, r = n.allocateTextureUnit();
  i[0] !== r && (t.uniform1i(this.addr, r), i[0] = r);
  let s;
  this.type === t.SAMPLER_2D_SHADOW ? (vv.compareFunction = vy, s = vv) : s = Py, n.setTexture2D(e || s, r);
}
function GA(t, e, n) {
  const i = this.cache, r = n.allocateTextureUnit();
  i[0] !== r && (t.uniform1i(this.addr, r), i[0] = r), n.setTexture3D(e || Dy, r);
}
function WA(t, e, n) {
  const i = this.cache, r = n.allocateTextureUnit();
  i[0] !== r && (t.uniform1i(this.addr, r), i[0] = r), n.setTextureCube(e || Iy, r);
}
function $A(t, e, n) {
  const i = this.cache, r = n.allocateTextureUnit();
  i[0] !== r && (t.uniform1i(this.addr, r), i[0] = r), n.setTexture2DArray(e || Ly, r);
}
function jA(t) {
  switch (t) {
    case 5126:
      return AA;
    case 35664:
      return RA;
    case 35665:
      return bA;
    case 35666:
      return PA;
    case 35674:
      return LA;
    case 35675:
      return DA;
    case 35676:
      return IA;
    case 5124:
    case 35670:
      return NA;
    case 35667:
    case 35671:
      return UA;
    case 35668:
    case 35672:
      return kA;
    case 35669:
    case 35673:
      return FA;
    case 5125:
      return OA;
    case 36294:
      return BA;
    case 36295:
      return zA;
    case 36296:
      return HA;
    case 35678:
    case 36198:
    case 36298:
    case 36306:
    case 35682:
      return VA;
    case 35679:
    case 36299:
    case 36307:
      return GA;
    case 35680:
    case 36300:
    case 36308:
    case 36293:
      return WA;
    case 36289:
    case 36303:
    case 36311:
    case 36292:
      return $A;
  }
}
function XA(t, e) {
  t.uniform1fv(this.addr, e);
}
function YA(t, e) {
  const n = Do(e, this.size, 2);
  t.uniform2fv(this.addr, n);
}
function qA(t, e) {
  const n = Do(e, this.size, 3);
  t.uniform3fv(this.addr, n);
}
function KA(t, e) {
  const n = Do(e, this.size, 4);
  t.uniform4fv(this.addr, n);
}
function ZA(t, e) {
  const n = Do(e, this.size, 4);
  t.uniformMatrix2fv(this.addr, !1, n);
}
function QA(t, e) {
  const n = Do(e, this.size, 9);
  t.uniformMatrix3fv(this.addr, !1, n);
}
function JA(t, e) {
  const n = Do(e, this.size, 16);
  t.uniformMatrix4fv(this.addr, !1, n);
}
function e2(t, e) {
  t.uniform1iv(this.addr, e);
}
function t2(t, e) {
  t.uniform2iv(this.addr, e);
}
function n2(t, e) {
  t.uniform3iv(this.addr, e);
}
function i2(t, e) {
  t.uniform4iv(this.addr, e);
}
function r2(t, e) {
  t.uniform1uiv(this.addr, e);
}
function s2(t, e) {
  t.uniform2uiv(this.addr, e);
}
function o2(t, e) {
  t.uniform3uiv(this.addr, e);
}
function a2(t, e) {
  t.uniform4uiv(this.addr, e);
}
function l2(t, e, n) {
  const i = this.cache, r = e.length, s = wc(n, r);
  Ut(i, s) || (t.uniform1iv(this.addr, s), kt(i, s));
  for (let o = 0; o !== r; ++o)
    n.setTexture2D(e[o] || Py, s[o]);
}
function u2(t, e, n) {
  const i = this.cache, r = e.length, s = wc(n, r);
  Ut(i, s) || (t.uniform1iv(this.addr, s), kt(i, s));
  for (let o = 0; o !== r; ++o)
    n.setTexture3D(e[o] || Dy, s[o]);
}
function c2(t, e, n) {
  const i = this.cache, r = e.length, s = wc(n, r);
  Ut(i, s) || (t.uniform1iv(this.addr, s), kt(i, s));
  for (let o = 0; o !== r; ++o)
    n.setTextureCube(e[o] || Iy, s[o]);
}
function f2(t, e, n) {
  const i = this.cache, r = e.length, s = wc(n, r);
  Ut(i, s) || (t.uniform1iv(this.addr, s), kt(i, s));
  for (let o = 0; o !== r; ++o)
    n.setTexture2DArray(e[o] || Ly, s[o]);
}
function d2(t) {
  switch (t) {
    case 5126:
      return XA;
    case 35664:
      return YA;
    case 35665:
      return qA;
    case 35666:
      return KA;
    case 35674:
      return ZA;
    case 35675:
      return QA;
    case 35676:
      return JA;
    case 5124:
    case 35670:
      return e2;
    case 35667:
    case 35671:
      return t2;
    case 35668:
    case 35672:
      return n2;
    case 35669:
    case 35673:
      return i2;
    case 5125:
      return r2;
    case 36294:
      return s2;
    case 36295:
      return o2;
    case 36296:
      return a2;
    case 35678:
    case 36198:
    case 36298:
    case 36306:
    case 35682:
      return l2;
    case 35679:
    case 36299:
    case 36307:
      return u2;
    case 35680:
    case 36300:
    case 36308:
    case 36293:
      return c2;
    case 36289:
    case 36303:
    case 36311:
    case 36292:
      return f2;
  }
}
class h2 {
  constructor(e, n, i) {
    this.id = e, this.addr = i, this.cache = [], this.type = n.type, this.setValue = jA(n.type);
  }
}
class p2 {
  constructor(e, n, i) {
    this.id = e, this.addr = i, this.cache = [], this.type = n.type, this.size = n.size, this.setValue = d2(n.type);
  }
}
class m2 {
  constructor(e) {
    this.id = e, this.seq = [], this.map = {};
  }
  setValue(e, n, i) {
    const r = this.seq;
    for (let s = 0, o = r.length; s !== o; ++s) {
      const a = r[s];
      a.setValue(e, n[a.id], i);
    }
  }
}
const Gf = /(\w+)(\])?(\[|\.)?/g;
function Ev(t, e) {
  t.seq.push(e), t.map[e.id] = e;
}
function g2(t, e, n) {
  const i = t.name, r = i.length;
  for (Gf.lastIndex = 0; ; ) {
    const s = Gf.exec(i), o = Gf.lastIndex;
    let a = s[1];
    const l = s[2] === "]", u = s[3];
    if (l && (a = a | 0), u === void 0 || u === "[" && o + 2 === r) {
      Ev(n, u === void 0 ? new h2(a, t, e) : new p2(a, t, e));
      break;
    } else {
      let d = n.map[a];
      d === void 0 && (d = new m2(a), Ev(n, d)), n = d;
    }
  }
}
class lu {
  constructor(e, n) {
    this.seq = [], this.map = {};
    const i = e.getProgramParameter(n, e.ACTIVE_UNIFORMS);
    for (let r = 0; r < i; ++r) {
      const s = e.getActiveUniform(n, r), o = e.getUniformLocation(n, s.name);
      g2(s, o, this);
    }
  }
  setValue(e, n, i, r) {
    const s = this.map[n];
    s !== void 0 && s.setValue(e, i, r);
  }
  setOptional(e, n, i) {
    const r = n[i];
    r !== void 0 && this.setValue(e, i, r);
  }
  static upload(e, n, i, r) {
    for (let s = 0, o = n.length; s !== o; ++s) {
      const a = n[s], l = i[a.id];
      l.needsUpdate !== !1 && a.setValue(e, l.value, r);
    }
  }
  static seqWithValue(e, n) {
    const i = [];
    for (let r = 0, s = e.length; r !== s; ++r) {
      const o = e[r];
      o.id in n && i.push(o);
    }
    return i;
  }
}
function wv(t, e, n) {
  const i = t.createShader(e);
  return t.shaderSource(i, n), t.compileShader(i), i;
}
const v2 = 37297;
let _2 = 0;
function x2(t, e) {
  const n = t.split(`
`), i = [], r = Math.max(e - 6, 0), s = Math.min(e + 6, n.length);
  for (let o = r; o < s; o++) {
    const a = o + 1;
    i.push(`${a === e ? ">" : " "} ${a}: ${n[o]}`);
  }
  return i.join(`
`);
}
function y2(t) {
  const e = Je.getPrimaries(Je.workingColorSpace), n = Je.getPrimaries(t);
  let i;
  switch (e === n ? i = "" : e === $u && n === Wu ? i = "LinearDisplayP3ToLinearSRGB" : e === Wu && n === $u && (i = "LinearSRGBToLinearDisplayP3"), t) {
    case Br:
    case Ec:
      return [i, "LinearTransferOETF"];
    case rn:
    case qp:
      return [i, "sRGBTransferOETF"];
    default:
      return console.warn("THREE.WebGLProgram: Unsupported color space:", t), [i, "LinearTransferOETF"];
  }
}
function Tv(t, e, n) {
  const i = t.getShaderParameter(e, t.COMPILE_STATUS), r = t.getShaderInfoLog(e).trim();
  if (i && r === "") return "";
  const s = /ERROR: 0:(\d+)/.exec(r);
  if (s) {
    const o = parseInt(s[1]);
    return n.toUpperCase() + `

` + r + `

` + x2(t.getShaderSource(e), o);
  } else
    return r;
}
function S2(t, e) {
  const n = y2(e);
  return `vec4 ${t}( vec4 value ) { return ${n[0]}( ${n[1]}( value ) ); }`;
}
function M2(t, e) {
  let n;
  switch (e) {
    case ey:
      n = "Linear";
      break;
    case ty:
      n = "Reinhard";
      break;
    case ny:
      n = "Cineon";
      break;
    case Vp:
      n = "ACESFilmic";
      break;
    case iy:
      n = "AgX";
      break;
    case ry:
      n = "Neutral";
      break;
    case WE:
      n = "Custom";
      break;
    default:
      console.warn("THREE.WebGLProgram: Unsupported toneMapping:", e), n = "Linear";
  }
  return "vec3 " + t + "( vec3 color ) { return " + n + "ToneMapping( color ); }";
}
const Ol = /* @__PURE__ */ new k();
function E2() {
  Je.getLuminanceCoefficients(Ol);
  const t = Ol.x.toFixed(4), e = Ol.y.toFixed(4), n = Ol.z.toFixed(4);
  return [
    "float luminance( const in vec3 rgb ) {",
    `	const vec3 weights = vec3( ${t}, ${e}, ${n} );`,
    "	return dot( weights, rgb );",
    "}"
  ].join(`
`);
}
function w2(t) {
  return [
    t.extensionClipCullDistance ? "#extension GL_ANGLE_clip_cull_distance : require" : "",
    t.extensionMultiDraw ? "#extension GL_ANGLE_multi_draw : require" : ""
  ].filter(ia).join(`
`);
}
function T2(t) {
  const e = [];
  for (const n in t) {
    const i = t[n];
    i !== !1 && e.push("#define " + n + " " + i);
  }
  return e.join(`
`);
}
function C2(t, e) {
  const n = {}, i = t.getProgramParameter(e, t.ACTIVE_ATTRIBUTES);
  for (let r = 0; r < i; r++) {
    const s = t.getActiveAttrib(e, r), o = s.name;
    let a = 1;
    s.type === t.FLOAT_MAT2 && (a = 2), s.type === t.FLOAT_MAT3 && (a = 3), s.type === t.FLOAT_MAT4 && (a = 4), n[o] = {
      type: s.type,
      location: t.getAttribLocation(e, o),
      locationSize: a
    };
  }
  return n;
}
function ia(t) {
  return t !== "";
}
function Cv(t, e) {
  const n = e.numSpotLightShadows + e.numSpotLightMaps - e.numSpotLightShadowsWithMaps;
  return t.replace(/NUM_DIR_LIGHTS/g, e.numDirLights).replace(/NUM_SPOT_LIGHTS/g, e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g, e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g, n).replace(/NUM_RECT_AREA_LIGHTS/g, e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g, e.numPointLights).replace(/NUM_HEMI_LIGHTS/g, e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g, e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g, e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g, e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g, e.numPointLightShadows);
}
function Av(t, e) {
  return t.replace(/NUM_CLIPPING_PLANES/g, e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g, e.numClippingPlanes - e.numClipIntersection);
}
const A2 = /^[ \t]*#include +<([\w\d./]+)>/gm;
function Ih(t) {
  return t.replace(A2, b2);
}
const R2 = /* @__PURE__ */ new Map();
function b2(t, e) {
  let n = Fe[e];
  if (n === void 0) {
    const i = R2.get(e);
    if (i !== void 0)
      n = Fe[i], console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.', e, i);
    else
      throw new Error("Can not resolve #include <" + e + ">");
  }
  return Ih(n);
}
const P2 = /#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;
function Rv(t) {
  return t.replace(P2, L2);
}
function L2(t, e, n, i) {
  let r = "";
  for (let s = parseInt(e); s < parseInt(n); s++)
    r += i.replace(/\[\s*i\s*\]/g, "[ " + s + " ]").replace(/UNROLLED_LOOP_INDEX/g, s);
  return r;
}
function bv(t) {
  let e = `precision ${t.precision} float;
	precision ${t.precision} int;
	precision ${t.precision} sampler2D;
	precision ${t.precision} samplerCube;
	precision ${t.precision} sampler3D;
	precision ${t.precision} sampler2DArray;
	precision ${t.precision} sampler2DShadow;
	precision ${t.precision} samplerCubeShadow;
	precision ${t.precision} sampler2DArrayShadow;
	precision ${t.precision} isampler2D;
	precision ${t.precision} isampler3D;
	precision ${t.precision} isamplerCube;
	precision ${t.precision} isampler2DArray;
	precision ${t.precision} usampler2D;
	precision ${t.precision} usampler3D;
	precision ${t.precision} usamplerCube;
	precision ${t.precision} usampler2DArray;
	`;
  return t.precision === "highp" ? e += `
#define HIGH_PRECISION` : t.precision === "mediump" ? e += `
#define MEDIUM_PRECISION` : t.precision === "lowp" && (e += `
#define LOW_PRECISION`), e;
}
function D2(t) {
  let e = "SHADOWMAP_TYPE_BASIC";
  return t.shadowMapType === Zx ? e = "SHADOWMAP_TYPE_PCF" : t.shadowMapType === Qx ? e = "SHADOWMAP_TYPE_PCF_SOFT" : t.shadowMapType === ki && (e = "SHADOWMAP_TYPE_VSM"), e;
}
function I2(t) {
  let e = "ENVMAP_TYPE_CUBE";
  if (t.envMap)
    switch (t.envMapMode) {
      case vo:
      case _o:
        e = "ENVMAP_TYPE_CUBE";
        break;
      case Mc:
        e = "ENVMAP_TYPE_CUBE_UV";
        break;
    }
  return e;
}
function N2(t) {
  let e = "ENVMAP_MODE_REFLECTION";
  if (t.envMap)
    switch (t.envMapMode) {
      case _o:
        e = "ENVMAP_MODE_REFRACTION";
        break;
    }
  return e;
}
function U2(t) {
  let e = "ENVMAP_BLENDING_NONE";
  if (t.envMap)
    switch (t.combine) {
      case Jx:
        e = "ENVMAP_BLENDING_MULTIPLY";
        break;
      case VE:
        e = "ENVMAP_BLENDING_MIX";
        break;
      case GE:
        e = "ENVMAP_BLENDING_ADD";
        break;
    }
  return e;
}
function k2(t) {
  const e = t.envMapCubeUVHeight;
  if (e === null) return null;
  const n = Math.log2(e) - 2, i = 1 / e;
  return { texelWidth: 1 / (3 * Math.max(Math.pow(2, n), 7 * 16)), texelHeight: i, maxMip: n };
}
function F2(t, e, n, i) {
  const r = t.getContext(), s = n.defines;
  let o = n.vertexShader, a = n.fragmentShader;
  const l = D2(n), u = I2(n), c = N2(n), d = U2(n), h = k2(n), p = w2(n), _ = T2(s), y = r.createProgram();
  let m, f, v = n.glslVersion ? "#version " + n.glslVersion + `
` : "";
  n.isRawShaderMaterial ? (m = [
    "#define SHADER_TYPE " + n.shaderType,
    "#define SHADER_NAME " + n.shaderName,
    _
  ].filter(ia).join(`
`), m.length > 0 && (m += `
`), f = [
    "#define SHADER_TYPE " + n.shaderType,
    "#define SHADER_NAME " + n.shaderName,
    _
  ].filter(ia).join(`
`), f.length > 0 && (f += `
`)) : (m = [
    bv(n),
    "#define SHADER_TYPE " + n.shaderType,
    "#define SHADER_NAME " + n.shaderName,
    _,
    n.extensionClipCullDistance ? "#define USE_CLIP_DISTANCE" : "",
    n.batching ? "#define USE_BATCHING" : "",
    n.batchingColor ? "#define USE_BATCHING_COLOR" : "",
    n.instancing ? "#define USE_INSTANCING" : "",
    n.instancingColor ? "#define USE_INSTANCING_COLOR" : "",
    n.instancingMorph ? "#define USE_INSTANCING_MORPH" : "",
    n.useFog && n.fog ? "#define USE_FOG" : "",
    n.useFog && n.fogExp2 ? "#define FOG_EXP2" : "",
    n.map ? "#define USE_MAP" : "",
    n.envMap ? "#define USE_ENVMAP" : "",
    n.envMap ? "#define " + c : "",
    n.lightMap ? "#define USE_LIGHTMAP" : "",
    n.aoMap ? "#define USE_AOMAP" : "",
    n.bumpMap ? "#define USE_BUMPMAP" : "",
    n.normalMap ? "#define USE_NORMALMAP" : "",
    n.normalMapObjectSpace ? "#define USE_NORMALMAP_OBJECTSPACE" : "",
    n.normalMapTangentSpace ? "#define USE_NORMALMAP_TANGENTSPACE" : "",
    n.displacementMap ? "#define USE_DISPLACEMENTMAP" : "",
    n.emissiveMap ? "#define USE_EMISSIVEMAP" : "",
    n.anisotropy ? "#define USE_ANISOTROPY" : "",
    n.anisotropyMap ? "#define USE_ANISOTROPYMAP" : "",
    n.clearcoatMap ? "#define USE_CLEARCOATMAP" : "",
    n.clearcoatRoughnessMap ? "#define USE_CLEARCOAT_ROUGHNESSMAP" : "",
    n.clearcoatNormalMap ? "#define USE_CLEARCOAT_NORMALMAP" : "",
    n.iridescenceMap ? "#define USE_IRIDESCENCEMAP" : "",
    n.iridescenceThicknessMap ? "#define USE_IRIDESCENCE_THICKNESSMAP" : "",
    n.specularMap ? "#define USE_SPECULARMAP" : "",
    n.specularColorMap ? "#define USE_SPECULAR_COLORMAP" : "",
    n.specularIntensityMap ? "#define USE_SPECULAR_INTENSITYMAP" : "",
    n.roughnessMap ? "#define USE_ROUGHNESSMAP" : "",
    n.metalnessMap ? "#define USE_METALNESSMAP" : "",
    n.alphaMap ? "#define USE_ALPHAMAP" : "",
    n.alphaHash ? "#define USE_ALPHAHASH" : "",
    n.transmission ? "#define USE_TRANSMISSION" : "",
    n.transmissionMap ? "#define USE_TRANSMISSIONMAP" : "",
    n.thicknessMap ? "#define USE_THICKNESSMAP" : "",
    n.sheenColorMap ? "#define USE_SHEEN_COLORMAP" : "",
    n.sheenRoughnessMap ? "#define USE_SHEEN_ROUGHNESSMAP" : "",
    //
    n.mapUv ? "#define MAP_UV " + n.mapUv : "",
    n.alphaMapUv ? "#define ALPHAMAP_UV " + n.alphaMapUv : "",
    n.lightMapUv ? "#define LIGHTMAP_UV " + n.lightMapUv : "",
    n.aoMapUv ? "#define AOMAP_UV " + n.aoMapUv : "",
    n.emissiveMapUv ? "#define EMISSIVEMAP_UV " + n.emissiveMapUv : "",
    n.bumpMapUv ? "#define BUMPMAP_UV " + n.bumpMapUv : "",
    n.normalMapUv ? "#define NORMALMAP_UV " + n.normalMapUv : "",
    n.displacementMapUv ? "#define DISPLACEMENTMAP_UV " + n.displacementMapUv : "",
    n.metalnessMapUv ? "#define METALNESSMAP_UV " + n.metalnessMapUv : "",
    n.roughnessMapUv ? "#define ROUGHNESSMAP_UV " + n.roughnessMapUv : "",
    n.anisotropyMapUv ? "#define ANISOTROPYMAP_UV " + n.anisotropyMapUv : "",
    n.clearcoatMapUv ? "#define CLEARCOATMAP_UV " + n.clearcoatMapUv : "",
    n.clearcoatNormalMapUv ? "#define CLEARCOAT_NORMALMAP_UV " + n.clearcoatNormalMapUv : "",
    n.clearcoatRoughnessMapUv ? "#define CLEARCOAT_ROUGHNESSMAP_UV " + n.clearcoatRoughnessMapUv : "",
    n.iridescenceMapUv ? "#define IRIDESCENCEMAP_UV " + n.iridescenceMapUv : "",
    n.iridescenceThicknessMapUv ? "#define IRIDESCENCE_THICKNESSMAP_UV " + n.iridescenceThicknessMapUv : "",
    n.sheenColorMapUv ? "#define SHEEN_COLORMAP_UV " + n.sheenColorMapUv : "",
    n.sheenRoughnessMapUv ? "#define SHEEN_ROUGHNESSMAP_UV " + n.sheenRoughnessMapUv : "",
    n.specularMapUv ? "#define SPECULARMAP_UV " + n.specularMapUv : "",
    n.specularColorMapUv ? "#define SPECULAR_COLORMAP_UV " + n.specularColorMapUv : "",
    n.specularIntensityMapUv ? "#define SPECULAR_INTENSITYMAP_UV " + n.specularIntensityMapUv : "",
    n.transmissionMapUv ? "#define TRANSMISSIONMAP_UV " + n.transmissionMapUv : "",
    n.thicknessMapUv ? "#define THICKNESSMAP_UV " + n.thicknessMapUv : "",
    //
    n.vertexTangents && n.flatShading === !1 ? "#define USE_TANGENT" : "",
    n.vertexColors ? "#define USE_COLOR" : "",
    n.vertexAlphas ? "#define USE_COLOR_ALPHA" : "",
    n.vertexUv1s ? "#define USE_UV1" : "",
    n.vertexUv2s ? "#define USE_UV2" : "",
    n.vertexUv3s ? "#define USE_UV3" : "",
    n.pointsUvs ? "#define USE_POINTS_UV" : "",
    n.flatShading ? "#define FLAT_SHADED" : "",
    n.skinning ? "#define USE_SKINNING" : "",
    n.morphTargets ? "#define USE_MORPHTARGETS" : "",
    n.morphNormals && n.flatShading === !1 ? "#define USE_MORPHNORMALS" : "",
    n.morphColors ? "#define USE_MORPHCOLORS" : "",
    n.morphTargetsCount > 0 ? "#define MORPHTARGETS_TEXTURE_STRIDE " + n.morphTextureStride : "",
    n.morphTargetsCount > 0 ? "#define MORPHTARGETS_COUNT " + n.morphTargetsCount : "",
    n.doubleSided ? "#define DOUBLE_SIDED" : "",
    n.flipSided ? "#define FLIP_SIDED" : "",
    n.shadowMapEnabled ? "#define USE_SHADOWMAP" : "",
    n.shadowMapEnabled ? "#define " + l : "",
    n.sizeAttenuation ? "#define USE_SIZEATTENUATION" : "",
    n.numLightProbes > 0 ? "#define USE_LIGHT_PROBES" : "",
    n.logarithmicDepthBuffer ? "#define USE_LOGDEPTHBUF" : "",
    n.reverseDepthBuffer ? "#define USE_REVERSEDEPTHBUF" : "",
    "uniform mat4 modelMatrix;",
    "uniform mat4 modelViewMatrix;",
    "uniform mat4 projectionMatrix;",
    "uniform mat4 viewMatrix;",
    "uniform mat3 normalMatrix;",
    "uniform vec3 cameraPosition;",
    "uniform bool isOrthographic;",
    "#ifdef USE_INSTANCING",
    "	attribute mat4 instanceMatrix;",
    "#endif",
    "#ifdef USE_INSTANCING_COLOR",
    "	attribute vec3 instanceColor;",
    "#endif",
    "#ifdef USE_INSTANCING_MORPH",
    "	uniform sampler2D morphTexture;",
    "#endif",
    "attribute vec3 position;",
    "attribute vec3 normal;",
    "attribute vec2 uv;",
    "#ifdef USE_UV1",
    "	attribute vec2 uv1;",
    "#endif",
    "#ifdef USE_UV2",
    "	attribute vec2 uv2;",
    "#endif",
    "#ifdef USE_UV3",
    "	attribute vec2 uv3;",
    "#endif",
    "#ifdef USE_TANGENT",
    "	attribute vec4 tangent;",
    "#endif",
    "#if defined( USE_COLOR_ALPHA )",
    "	attribute vec4 color;",
    "#elif defined( USE_COLOR )",
    "	attribute vec3 color;",
    "#endif",
    "#ifdef USE_SKINNING",
    "	attribute vec4 skinIndex;",
    "	attribute vec4 skinWeight;",
    "#endif",
    `
`
  ].filter(ia).join(`
`), f = [
    bv(n),
    "#define SHADER_TYPE " + n.shaderType,
    "#define SHADER_NAME " + n.shaderName,
    _,
    n.useFog && n.fog ? "#define USE_FOG" : "",
    n.useFog && n.fogExp2 ? "#define FOG_EXP2" : "",
    n.alphaToCoverage ? "#define ALPHA_TO_COVERAGE" : "",
    n.map ? "#define USE_MAP" : "",
    n.matcap ? "#define USE_MATCAP" : "",
    n.envMap ? "#define USE_ENVMAP" : "",
    n.envMap ? "#define " + u : "",
    n.envMap ? "#define " + c : "",
    n.envMap ? "#define " + d : "",
    h ? "#define CUBEUV_TEXEL_WIDTH " + h.texelWidth : "",
    h ? "#define CUBEUV_TEXEL_HEIGHT " + h.texelHeight : "",
    h ? "#define CUBEUV_MAX_MIP " + h.maxMip + ".0" : "",
    n.lightMap ? "#define USE_LIGHTMAP" : "",
    n.aoMap ? "#define USE_AOMAP" : "",
    n.bumpMap ? "#define USE_BUMPMAP" : "",
    n.normalMap ? "#define USE_NORMALMAP" : "",
    n.normalMapObjectSpace ? "#define USE_NORMALMAP_OBJECTSPACE" : "",
    n.normalMapTangentSpace ? "#define USE_NORMALMAP_TANGENTSPACE" : "",
    n.emissiveMap ? "#define USE_EMISSIVEMAP" : "",
    n.anisotropy ? "#define USE_ANISOTROPY" : "",
    n.anisotropyMap ? "#define USE_ANISOTROPYMAP" : "",
    n.clearcoat ? "#define USE_CLEARCOAT" : "",
    n.clearcoatMap ? "#define USE_CLEARCOATMAP" : "",
    n.clearcoatRoughnessMap ? "#define USE_CLEARCOAT_ROUGHNESSMAP" : "",
    n.clearcoatNormalMap ? "#define USE_CLEARCOAT_NORMALMAP" : "",
    n.dispersion ? "#define USE_DISPERSION" : "",
    n.iridescence ? "#define USE_IRIDESCENCE" : "",
    n.iridescenceMap ? "#define USE_IRIDESCENCEMAP" : "",
    n.iridescenceThicknessMap ? "#define USE_IRIDESCENCE_THICKNESSMAP" : "",
    n.specularMap ? "#define USE_SPECULARMAP" : "",
    n.specularColorMap ? "#define USE_SPECULAR_COLORMAP" : "",
    n.specularIntensityMap ? "#define USE_SPECULAR_INTENSITYMAP" : "",
    n.roughnessMap ? "#define USE_ROUGHNESSMAP" : "",
    n.metalnessMap ? "#define USE_METALNESSMAP" : "",
    n.alphaMap ? "#define USE_ALPHAMAP" : "",
    n.alphaTest ? "#define USE_ALPHATEST" : "",
    n.alphaHash ? "#define USE_ALPHAHASH" : "",
    n.sheen ? "#define USE_SHEEN" : "",
    n.sheenColorMap ? "#define USE_SHEEN_COLORMAP" : "",
    n.sheenRoughnessMap ? "#define USE_SHEEN_ROUGHNESSMAP" : "",
    n.transmission ? "#define USE_TRANSMISSION" : "",
    n.transmissionMap ? "#define USE_TRANSMISSIONMAP" : "",
    n.thicknessMap ? "#define USE_THICKNESSMAP" : "",
    n.vertexTangents && n.flatShading === !1 ? "#define USE_TANGENT" : "",
    n.vertexColors || n.instancingColor || n.batchingColor ? "#define USE_COLOR" : "",
    n.vertexAlphas ? "#define USE_COLOR_ALPHA" : "",
    n.vertexUv1s ? "#define USE_UV1" : "",
    n.vertexUv2s ? "#define USE_UV2" : "",
    n.vertexUv3s ? "#define USE_UV3" : "",
    n.pointsUvs ? "#define USE_POINTS_UV" : "",
    n.gradientMap ? "#define USE_GRADIENTMAP" : "",
    n.flatShading ? "#define FLAT_SHADED" : "",
    n.doubleSided ? "#define DOUBLE_SIDED" : "",
    n.flipSided ? "#define FLIP_SIDED" : "",
    n.shadowMapEnabled ? "#define USE_SHADOWMAP" : "",
    n.shadowMapEnabled ? "#define " + l : "",
    n.premultipliedAlpha ? "#define PREMULTIPLIED_ALPHA" : "",
    n.numLightProbes > 0 ? "#define USE_LIGHT_PROBES" : "",
    n.decodeVideoTexture ? "#define DECODE_VIDEO_TEXTURE" : "",
    n.logarithmicDepthBuffer ? "#define USE_LOGDEPTHBUF" : "",
    n.reverseDepthBuffer ? "#define USE_REVERSEDEPTHBUF" : "",
    "uniform mat4 viewMatrix;",
    "uniform vec3 cameraPosition;",
    "uniform bool isOrthographic;",
    n.toneMapping !== Dr ? "#define TONE_MAPPING" : "",
    n.toneMapping !== Dr ? Fe.tonemapping_pars_fragment : "",
    // this code is required here because it is used by the toneMapping() function defined below
    n.toneMapping !== Dr ? M2("toneMapping", n.toneMapping) : "",
    n.dithering ? "#define DITHERING" : "",
    n.opaque ? "#define OPAQUE" : "",
    Fe.colorspace_pars_fragment,
    // this code is required here because it is used by the various encoding/decoding function defined below
    S2("linearToOutputTexel", n.outputColorSpace),
    E2(),
    n.useDepthPacking ? "#define DEPTH_PACKING " + n.depthPacking : "",
    `
`
  ].filter(ia).join(`
`)), o = Ih(o), o = Cv(o, n), o = Av(o, n), a = Ih(a), a = Cv(a, n), a = Av(a, n), o = Rv(o), a = Rv(a), n.isRawShaderMaterial !== !0 && (v = `#version 300 es
`, m = [
    p,
    "#define attribute in",
    "#define varying out",
    "#define texture2D texture"
  ].join(`
`) + `
` + m, f = [
    "#define varying in",
    n.glslVersion === jg ? "" : "layout(location = 0) out highp vec4 pc_fragColor;",
    n.glslVersion === jg ? "" : "#define gl_FragColor pc_fragColor",
    "#define gl_FragDepthEXT gl_FragDepth",
    "#define texture2D texture",
    "#define textureCube texture",
    "#define texture2DProj textureProj",
    "#define texture2DLodEXT textureLod",
    "#define texture2DProjLodEXT textureProjLod",
    "#define textureCubeLodEXT textureLod",
    "#define texture2DGradEXT textureGrad",
    "#define texture2DProjGradEXT textureProjGrad",
    "#define textureCubeGradEXT textureGrad"
  ].join(`
`) + `
` + f);
  const g = v + m + o, M = v + f + a, b = wv(r, r.VERTEX_SHADER, g), A = wv(r, r.FRAGMENT_SHADER, M);
  r.attachShader(y, b), r.attachShader(y, A), n.index0AttributeName !== void 0 ? r.bindAttribLocation(y, 0, n.index0AttributeName) : n.morphTargets === !0 && r.bindAttribLocation(y, 0, "position"), r.linkProgram(y);
  function T(w) {
    if (t.debug.checkShaderErrors) {
      const H = r.getProgramInfoLog(y).trim(), B = r.getShaderInfoLog(b).trim(), G = r.getShaderInfoLog(A).trim();
      let Q = !0, V = !0;
      if (r.getProgramParameter(y, r.LINK_STATUS) === !1)
        if (Q = !1, typeof t.debug.onShaderError == "function")
          t.debug.onShaderError(r, y, b, A);
        else {
          const ne = Tv(r, b, "vertex"), L = Tv(r, A, "fragment");
          console.error(
            "THREE.WebGLProgram: Shader Error " + r.getError() + " - VALIDATE_STATUS " + r.getProgramParameter(y, r.VALIDATE_STATUS) + `

Material Name: ` + w.name + `
Material Type: ` + w.type + `

Program Info Log: ` + H + `
` + ne + `
` + L
          );
        }
      else H !== "" ? console.warn("THREE.WebGLProgram: Program Info Log:", H) : (B === "" || G === "") && (V = !1);
      V && (w.diagnostics = {
        runnable: Q,
        programLog: H,
        vertexShader: {
          log: B,
          prefix: m
        },
        fragmentShader: {
          log: G,
          prefix: f
        }
      });
    }
    r.deleteShader(b), r.deleteShader(A), R = new lu(r, y), j = C2(r, y);
  }
  let R;
  this.getUniforms = function() {
    return R === void 0 && T(this), R;
  };
  let j;
  this.getAttributes = function() {
    return j === void 0 && T(this), j;
  };
  let x = n.rendererExtensionParallelShaderCompile === !1;
  return this.isReady = function() {
    return x === !1 && (x = r.getProgramParameter(y, v2)), x;
  }, this.destroy = function() {
    i.releaseStatesOfProgram(this), r.deleteProgram(y), this.program = void 0;
  }, this.type = n.shaderType, this.name = n.shaderName, this.id = _2++, this.cacheKey = e, this.usedTimes = 1, this.program = y, this.vertexShader = b, this.fragmentShader = A, this;
}
let O2 = 0;
class B2 {
  constructor() {
    this.shaderCache = /* @__PURE__ */ new Map(), this.materialCache = /* @__PURE__ */ new Map();
  }
  update(e) {
    const n = e.vertexShader, i = e.fragmentShader, r = this._getShaderStage(n), s = this._getShaderStage(i), o = this._getShaderCacheForMaterial(e);
    return o.has(r) === !1 && (o.add(r), r.usedTimes++), o.has(s) === !1 && (o.add(s), s.usedTimes++), this;
  }
  remove(e) {
    const n = this.materialCache.get(e);
    for (const i of n)
      i.usedTimes--, i.usedTimes === 0 && this.shaderCache.delete(i.code);
    return this.materialCache.delete(e), this;
  }
  getVertexShaderID(e) {
    return this._getShaderStage(e.vertexShader).id;
  }
  getFragmentShaderID(e) {
    return this._getShaderStage(e.fragmentShader).id;
  }
  dispose() {
    this.shaderCache.clear(), this.materialCache.clear();
  }
  _getShaderCacheForMaterial(e) {
    const n = this.materialCache;
    let i = n.get(e);
    return i === void 0 && (i = /* @__PURE__ */ new Set(), n.set(e, i)), i;
  }
  _getShaderStage(e) {
    const n = this.shaderCache;
    let i = n.get(e);
    return i === void 0 && (i = new z2(e), n.set(e, i)), i;
  }
}
class z2 {
  constructor(e) {
    this.id = O2++, this.code = e, this.usedTimes = 0;
  }
}
function H2(t, e, n, i, r, s, o) {
  const a = new Sy(), l = new B2(), u = /* @__PURE__ */ new Set(), c = [], d = r.logarithmicDepthBuffer, h = r.reverseDepthBuffer, p = r.vertexTextures;
  let _ = r.precision;
  const y = {
    MeshDepthMaterial: "depth",
    MeshDistanceMaterial: "distanceRGBA",
    MeshNormalMaterial: "normal",
    MeshBasicMaterial: "basic",
    MeshLambertMaterial: "lambert",
    MeshPhongMaterial: "phong",
    MeshToonMaterial: "toon",
    MeshStandardMaterial: "physical",
    MeshPhysicalMaterial: "physical",
    MeshMatcapMaterial: "matcap",
    LineBasicMaterial: "basic",
    LineDashedMaterial: "dashed",
    PointsMaterial: "points",
    ShadowMaterial: "shadow",
    SpriteMaterial: "sprite"
  };
  function m(x) {
    return u.add(x), x === 0 ? "uv" : `uv${x}`;
  }
  function f(x, w, H, B, G) {
    const Q = B.fog, V = G.geometry, ne = x.isMeshStandardMaterial ? B.environment : null, L = (x.isMeshStandardMaterial ? n : e).get(x.envMap || ne), q = L && L.mapping === Mc ? L.image.height : null, Z = y[x.type];
    x.precision !== null && (_ = r.getMaxPrecision(x.precision), _ !== x.precision && console.warn("THREE.WebGLProgram.getParameters:", x.precision, "not supported, using", _, "instead."));
    const se = V.morphAttributes.position || V.morphAttributes.normal || V.morphAttributes.color, Te = se !== void 0 ? se.length : 0;
    let Ge = 0;
    V.morphAttributes.position !== void 0 && (Ge = 1), V.morphAttributes.normal !== void 0 && (Ge = 2), V.morphAttributes.color !== void 0 && (Ge = 3);
    let $, te, de, ue;
    if (Z) {
      const pn = Ei[Z];
      $ = pn.vertexShader, te = pn.fragmentShader;
    } else
      $ = x.vertexShader, te = x.fragmentShader, l.update(x), de = l.getVertexShaderID(x), ue = l.getFragmentShaderID(x);
    const Ne = t.getRenderTarget(), Ae = G.isInstancedMesh === !0, je = G.isBatchedMesh === !0, rt = !!x.map, Xe = !!x.matcap, P = !!L, Cn = !!x.aoMap, We = !!x.lightMap, Ke = !!x.bumpMap, be = !!x.normalMap, ct = !!x.displacementMap, De = !!x.emissiveMap, C = !!x.metalnessMap, S = !!x.roughnessMap, F = x.anisotropy > 0, Y = x.clearcoat > 0, J = x.dispersion > 0, X = x.iridescence > 0, Me = x.sheen > 0, le = x.transmission > 0, ge = F && !!x.anisotropyMap, Ze = Y && !!x.clearcoatMap, ie = Y && !!x.clearcoatNormalMap, ve = Y && !!x.clearcoatRoughnessMap, Pe = X && !!x.iridescenceMap, Le = X && !!x.iridescenceThicknessMap, _e = Me && !!x.sheenColorMap, $e = Me && !!x.sheenRoughnessMap, Ue = !!x.specularMap, st = !!x.specularColorMap, D = !!x.specularIntensityMap, he = le && !!x.transmissionMap, W = le && !!x.thicknessMap, K = !!x.gradientMap, ce = !!x.alphaMap, pe = x.alphaTest > 0, Ye = !!x.alphaHash, At = !!x.extensions;
    let hn = Dr;
    x.toneMapped && (Ne === null || Ne.isXRRenderTarget === !0) && (hn = t.toneMapping);
    const Qe = {
      shaderID: Z,
      shaderType: x.type,
      shaderName: x.name,
      vertexShader: $,
      fragmentShader: te,
      defines: x.defines,
      customVertexShaderID: de,
      customFragmentShaderID: ue,
      isRawShaderMaterial: x.isRawShaderMaterial === !0,
      glslVersion: x.glslVersion,
      precision: _,
      batching: je,
      batchingColor: je && G._colorsTexture !== null,
      instancing: Ae,
      instancingColor: Ae && G.instanceColor !== null,
      instancingMorph: Ae && G.morphTexture !== null,
      supportsVertexTextures: p,
      outputColorSpace: Ne === null ? t.outputColorSpace : Ne.isXRRenderTarget === !0 ? Ne.texture.colorSpace : Br,
      alphaToCoverage: !!x.alphaToCoverage,
      map: rt,
      matcap: Xe,
      envMap: P,
      envMapMode: P && L.mapping,
      envMapCubeUVHeight: q,
      aoMap: Cn,
      lightMap: We,
      bumpMap: Ke,
      normalMap: be,
      displacementMap: p && ct,
      emissiveMap: De,
      normalMapObjectSpace: be && x.normalMapType === YE,
      normalMapTangentSpace: be && x.normalMapType === gy,
      metalnessMap: C,
      roughnessMap: S,
      anisotropy: F,
      anisotropyMap: ge,
      clearcoat: Y,
      clearcoatMap: Ze,
      clearcoatNormalMap: ie,
      clearcoatRoughnessMap: ve,
      dispersion: J,
      iridescence: X,
      iridescenceMap: Pe,
      iridescenceThicknessMap: Le,
      sheen: Me,
      sheenColorMap: _e,
      sheenRoughnessMap: $e,
      specularMap: Ue,
      specularColorMap: st,
      specularIntensityMap: D,
      transmission: le,
      transmissionMap: he,
      thicknessMap: W,
      gradientMap: K,
      opaque: x.transparent === !1 && x.blending === so && x.alphaToCoverage === !1,
      alphaMap: ce,
      alphaTest: pe,
      alphaHash: Ye,
      combine: x.combine,
      //
      mapUv: rt && m(x.map.channel),
      aoMapUv: Cn && m(x.aoMap.channel),
      lightMapUv: We && m(x.lightMap.channel),
      bumpMapUv: Ke && m(x.bumpMap.channel),
      normalMapUv: be && m(x.normalMap.channel),
      displacementMapUv: ct && m(x.displacementMap.channel),
      emissiveMapUv: De && m(x.emissiveMap.channel),
      metalnessMapUv: C && m(x.metalnessMap.channel),
      roughnessMapUv: S && m(x.roughnessMap.channel),
      anisotropyMapUv: ge && m(x.anisotropyMap.channel),
      clearcoatMapUv: Ze && m(x.clearcoatMap.channel),
      clearcoatNormalMapUv: ie && m(x.clearcoatNormalMap.channel),
      clearcoatRoughnessMapUv: ve && m(x.clearcoatRoughnessMap.channel),
      iridescenceMapUv: Pe && m(x.iridescenceMap.channel),
      iridescenceThicknessMapUv: Le && m(x.iridescenceThicknessMap.channel),
      sheenColorMapUv: _e && m(x.sheenColorMap.channel),
      sheenRoughnessMapUv: $e && m(x.sheenRoughnessMap.channel),
      specularMapUv: Ue && m(x.specularMap.channel),
      specularColorMapUv: st && m(x.specularColorMap.channel),
      specularIntensityMapUv: D && m(x.specularIntensityMap.channel),
      transmissionMapUv: he && m(x.transmissionMap.channel),
      thicknessMapUv: W && m(x.thicknessMap.channel),
      alphaMapUv: ce && m(x.alphaMap.channel),
      //
      vertexTangents: !!V.attributes.tangent && (be || F),
      vertexColors: x.vertexColors,
      vertexAlphas: x.vertexColors === !0 && !!V.attributes.color && V.attributes.color.itemSize === 4,
      pointsUvs: G.isPoints === !0 && !!V.attributes.uv && (rt || ce),
      fog: !!Q,
      useFog: x.fog === !0,
      fogExp2: !!Q && Q.isFogExp2,
      flatShading: x.flatShading === !0,
      sizeAttenuation: x.sizeAttenuation === !0,
      logarithmicDepthBuffer: d,
      reverseDepthBuffer: h,
      skinning: G.isSkinnedMesh === !0,
      morphTargets: V.morphAttributes.position !== void 0,
      morphNormals: V.morphAttributes.normal !== void 0,
      morphColors: V.morphAttributes.color !== void 0,
      morphTargetsCount: Te,
      morphTextureStride: Ge,
      numDirLights: w.directional.length,
      numPointLights: w.point.length,
      numSpotLights: w.spot.length,
      numSpotLightMaps: w.spotLightMap.length,
      numRectAreaLights: w.rectArea.length,
      numHemiLights: w.hemi.length,
      numDirLightShadows: w.directionalShadowMap.length,
      numPointLightShadows: w.pointShadowMap.length,
      numSpotLightShadows: w.spotShadowMap.length,
      numSpotLightShadowsWithMaps: w.numSpotLightShadowsWithMaps,
      numLightProbes: w.numLightProbes,
      numClippingPlanes: o.numPlanes,
      numClipIntersection: o.numIntersection,
      dithering: x.dithering,
      shadowMapEnabled: t.shadowMap.enabled && H.length > 0,
      shadowMapType: t.shadowMap.type,
      toneMapping: hn,
      decodeVideoTexture: rt && x.map.isVideoTexture === !0 && Je.getTransfer(x.map.colorSpace) === ot,
      premultipliedAlpha: x.premultipliedAlpha,
      doubleSided: x.side === Hi,
      flipSided: x.side === Tn,
      useDepthPacking: x.depthPacking >= 0,
      depthPacking: x.depthPacking || 0,
      index0AttributeName: x.index0AttributeName,
      extensionClipCullDistance: At && x.extensions.clipCullDistance === !0 && i.has("WEBGL_clip_cull_distance"),
      extensionMultiDraw: (At && x.extensions.multiDraw === !0 || je) && i.has("WEBGL_multi_draw"),
      rendererExtensionParallelShaderCompile: i.has("KHR_parallel_shader_compile"),
      customProgramCacheKey: x.customProgramCacheKey()
    };
    return Qe.vertexUv1s = u.has(1), Qe.vertexUv2s = u.has(2), Qe.vertexUv3s = u.has(3), u.clear(), Qe;
  }
  function v(x) {
    const w = [];
    if (x.shaderID ? w.push(x.shaderID) : (w.push(x.customVertexShaderID), w.push(x.customFragmentShaderID)), x.defines !== void 0)
      for (const H in x.defines)
        w.push(H), w.push(x.defines[H]);
    return x.isRawShaderMaterial === !1 && (g(w, x), M(w, x), w.push(t.outputColorSpace)), w.push(x.customProgramCacheKey), w.join();
  }
  function g(x, w) {
    x.push(w.precision), x.push(w.outputColorSpace), x.push(w.envMapMode), x.push(w.envMapCubeUVHeight), x.push(w.mapUv), x.push(w.alphaMapUv), x.push(w.lightMapUv), x.push(w.aoMapUv), x.push(w.bumpMapUv), x.push(w.normalMapUv), x.push(w.displacementMapUv), x.push(w.emissiveMapUv), x.push(w.metalnessMapUv), x.push(w.roughnessMapUv), x.push(w.anisotropyMapUv), x.push(w.clearcoatMapUv), x.push(w.clearcoatNormalMapUv), x.push(w.clearcoatRoughnessMapUv), x.push(w.iridescenceMapUv), x.push(w.iridescenceThicknessMapUv), x.push(w.sheenColorMapUv), x.push(w.sheenRoughnessMapUv), x.push(w.specularMapUv), x.push(w.specularColorMapUv), x.push(w.specularIntensityMapUv), x.push(w.transmissionMapUv), x.push(w.thicknessMapUv), x.push(w.combine), x.push(w.fogExp2), x.push(w.sizeAttenuation), x.push(w.morphTargetsCount), x.push(w.morphAttributeCount), x.push(w.numDirLights), x.push(w.numPointLights), x.push(w.numSpotLights), x.push(w.numSpotLightMaps), x.push(w.numHemiLights), x.push(w.numRectAreaLights), x.push(w.numDirLightShadows), x.push(w.numPointLightShadows), x.push(w.numSpotLightShadows), x.push(w.numSpotLightShadowsWithMaps), x.push(w.numLightProbes), x.push(w.shadowMapType), x.push(w.toneMapping), x.push(w.numClippingPlanes), x.push(w.numClipIntersection), x.push(w.depthPacking);
  }
  function M(x, w) {
    a.disableAll(), w.supportsVertexTextures && a.enable(0), w.instancing && a.enable(1), w.instancingColor && a.enable(2), w.instancingMorph && a.enable(3), w.matcap && a.enable(4), w.envMap && a.enable(5), w.normalMapObjectSpace && a.enable(6), w.normalMapTangentSpace && a.enable(7), w.clearcoat && a.enable(8), w.iridescence && a.enable(9), w.alphaTest && a.enable(10), w.vertexColors && a.enable(11), w.vertexAlphas && a.enable(12), w.vertexUv1s && a.enable(13), w.vertexUv2s && a.enable(14), w.vertexUv3s && a.enable(15), w.vertexTangents && a.enable(16), w.anisotropy && a.enable(17), w.alphaHash && a.enable(18), w.batching && a.enable(19), w.dispersion && a.enable(20), w.batchingColor && a.enable(21), x.push(a.mask), a.disableAll(), w.fog && a.enable(0), w.useFog && a.enable(1), w.flatShading && a.enable(2), w.logarithmicDepthBuffer && a.enable(3), w.reverseDepthBuffer && a.enable(4), w.skinning && a.enable(5), w.morphTargets && a.enable(6), w.morphNormals && a.enable(7), w.morphColors && a.enable(8), w.premultipliedAlpha && a.enable(9), w.shadowMapEnabled && a.enable(10), w.doubleSided && a.enable(11), w.flipSided && a.enable(12), w.useDepthPacking && a.enable(13), w.dithering && a.enable(14), w.transmission && a.enable(15), w.sheen && a.enable(16), w.opaque && a.enable(17), w.pointsUvs && a.enable(18), w.decodeVideoTexture && a.enable(19), w.alphaToCoverage && a.enable(20), x.push(a.mask);
  }
  function b(x) {
    const w = y[x.type];
    let H;
    if (w) {
      const B = Ei[w];
      H = Ba.clone(B.uniforms);
    } else
      H = x.uniforms;
    return H;
  }
  function A(x, w) {
    let H;
    for (let B = 0, G = c.length; B < G; B++) {
      const Q = c[B];
      if (Q.cacheKey === w) {
        H = Q, ++H.usedTimes;
        break;
      }
    }
    return H === void 0 && (H = new F2(t, w, x, s), c.push(H)), H;
  }
  function T(x) {
    if (--x.usedTimes === 0) {
      const w = c.indexOf(x);
      c[w] = c[c.length - 1], c.pop(), x.destroy();
    }
  }
  function R(x) {
    l.remove(x);
  }
  function j() {
    l.dispose();
  }
  return {
    getParameters: f,
    getProgramCacheKey: v,
    getUniforms: b,
    acquireProgram: A,
    releaseProgram: T,
    releaseShaderCache: R,
    // Exposed for resource monitoring & error feedback via renderer.info:
    programs: c,
    dispose: j
  };
}
function V2() {
  let t = /* @__PURE__ */ new WeakMap();
  function e(o) {
    return t.has(o);
  }
  function n(o) {
    let a = t.get(o);
    return a === void 0 && (a = {}, t.set(o, a)), a;
  }
  function i(o) {
    t.delete(o);
  }
  function r(o, a, l) {
    t.get(o)[a] = l;
  }
  function s() {
    t = /* @__PURE__ */ new WeakMap();
  }
  return {
    has: e,
    get: n,
    remove: i,
    update: r,
    dispose: s
  };
}
function G2(t, e) {
  return t.groupOrder !== e.groupOrder ? t.groupOrder - e.groupOrder : t.renderOrder !== e.renderOrder ? t.renderOrder - e.renderOrder : t.material.id !== e.material.id ? t.material.id - e.material.id : t.z !== e.z ? t.z - e.z : t.id - e.id;
}
function Pv(t, e) {
  return t.groupOrder !== e.groupOrder ? t.groupOrder - e.groupOrder : t.renderOrder !== e.renderOrder ? t.renderOrder - e.renderOrder : t.z !== e.z ? e.z - t.z : t.id - e.id;
}
function Lv() {
  const t = [];
  let e = 0;
  const n = [], i = [], r = [];
  function s() {
    e = 0, n.length = 0, i.length = 0, r.length = 0;
  }
  function o(d, h, p, _, y, m) {
    let f = t[e];
    return f === void 0 ? (f = {
      id: d.id,
      object: d,
      geometry: h,
      material: p,
      groupOrder: _,
      renderOrder: d.renderOrder,
      z: y,
      group: m
    }, t[e] = f) : (f.id = d.id, f.object = d, f.geometry = h, f.material = p, f.groupOrder = _, f.renderOrder = d.renderOrder, f.z = y, f.group = m), e++, f;
  }
  function a(d, h, p, _, y, m) {
    const f = o(d, h, p, _, y, m);
    p.transmission > 0 ? i.push(f) : p.transparent === !0 ? r.push(f) : n.push(f);
  }
  function l(d, h, p, _, y, m) {
    const f = o(d, h, p, _, y, m);
    p.transmission > 0 ? i.unshift(f) : p.transparent === !0 ? r.unshift(f) : n.unshift(f);
  }
  function u(d, h) {
    n.length > 1 && n.sort(d || G2), i.length > 1 && i.sort(h || Pv), r.length > 1 && r.sort(h || Pv);
  }
  function c() {
    for (let d = e, h = t.length; d < h; d++) {
      const p = t[d];
      if (p.id === null) break;
      p.id = null, p.object = null, p.geometry = null, p.material = null, p.group = null;
    }
  }
  return {
    opaque: n,
    transmissive: i,
    transparent: r,
    init: s,
    push: a,
    unshift: l,
    finish: c,
    sort: u
  };
}
function W2() {
  let t = /* @__PURE__ */ new WeakMap();
  function e(i, r) {
    const s = t.get(i);
    let o;
    return s === void 0 ? (o = new Lv(), t.set(i, [o])) : r >= s.length ? (o = new Lv(), s.push(o)) : o = s[r], o;
  }
  function n() {
    t = /* @__PURE__ */ new WeakMap();
  }
  return {
    get: e,
    dispose: n
  };
}
function $2() {
  const t = {};
  return {
    get: function(e) {
      if (t[e.id] !== void 0)
        return t[e.id];
      let n;
      switch (e.type) {
        case "DirectionalLight":
          n = {
            direction: new k(),
            color: new Ve()
          };
          break;
        case "SpotLight":
          n = {
            position: new k(),
            direction: new k(),
            color: new Ve(),
            distance: 0,
            coneCos: 0,
            penumbraCos: 0,
            decay: 0
          };
          break;
        case "PointLight":
          n = {
            position: new k(),
            color: new Ve(),
            distance: 0,
            decay: 0
          };
          break;
        case "HemisphereLight":
          n = {
            direction: new k(),
            skyColor: new Ve(),
            groundColor: new Ve()
          };
          break;
        case "RectAreaLight":
          n = {
            color: new Ve(),
            position: new k(),
            halfWidth: new k(),
            halfHeight: new k()
          };
          break;
      }
      return t[e.id] = n, n;
    }
  };
}
function j2() {
  const t = {};
  return {
    get: function(e) {
      if (t[e.id] !== void 0)
        return t[e.id];
      let n;
      switch (e.type) {
        case "DirectionalLight":
          n = {
            shadowIntensity: 1,
            shadowBias: 0,
            shadowNormalBias: 0,
            shadowRadius: 1,
            shadowMapSize: new Ie()
          };
          break;
        case "SpotLight":
          n = {
            shadowIntensity: 1,
            shadowBias: 0,
            shadowNormalBias: 0,
            shadowRadius: 1,
            shadowMapSize: new Ie()
          };
          break;
        case "PointLight":
          n = {
            shadowIntensity: 1,
            shadowBias: 0,
            shadowNormalBias: 0,
            shadowRadius: 1,
            shadowMapSize: new Ie(),
            shadowCameraNear: 1,
            shadowCameraFar: 1e3
          };
          break;
      }
      return t[e.id] = n, n;
    }
  };
}
let X2 = 0;
function Y2(t, e) {
  return (e.castShadow ? 2 : 0) - (t.castShadow ? 2 : 0) + (e.map ? 1 : 0) - (t.map ? 1 : 0);
}
function q2(t) {
  const e = new $2(), n = j2(), i = {
    version: 0,
    hash: {
      directionalLength: -1,
      pointLength: -1,
      spotLength: -1,
      rectAreaLength: -1,
      hemiLength: -1,
      numDirectionalShadows: -1,
      numPointShadows: -1,
      numSpotShadows: -1,
      numSpotMaps: -1,
      numLightProbes: -1
    },
    ambient: [0, 0, 0],
    probe: [],
    directional: [],
    directionalShadow: [],
    directionalShadowMap: [],
    directionalShadowMatrix: [],
    spot: [],
    spotLightMap: [],
    spotShadow: [],
    spotShadowMap: [],
    spotLightMatrix: [],
    rectArea: [],
    rectAreaLTC1: null,
    rectAreaLTC2: null,
    point: [],
    pointShadow: [],
    pointShadowMap: [],
    pointShadowMatrix: [],
    hemi: [],
    numSpotLightShadowsWithMaps: 0,
    numLightProbes: 0
  };
  for (let u = 0; u < 9; u++) i.probe.push(new k());
  const r = new k(), s = new Mt(), o = new Mt();
  function a(u) {
    let c = 0, d = 0, h = 0;
    for (let j = 0; j < 9; j++) i.probe[j].set(0, 0, 0);
    let p = 0, _ = 0, y = 0, m = 0, f = 0, v = 0, g = 0, M = 0, b = 0, A = 0, T = 0;
    u.sort(Y2);
    for (let j = 0, x = u.length; j < x; j++) {
      const w = u[j], H = w.color, B = w.intensity, G = w.distance, Q = w.shadow && w.shadow.map ? w.shadow.map.texture : null;
      if (w.isAmbientLight)
        c += H.r * B, d += H.g * B, h += H.b * B;
      else if (w.isLightProbe) {
        for (let V = 0; V < 9; V++)
          i.probe[V].addScaledVector(w.sh.coefficients[V], B);
        T++;
      } else if (w.isDirectionalLight) {
        const V = e.get(w);
        if (V.color.copy(w.color).multiplyScalar(w.intensity), w.castShadow) {
          const ne = w.shadow, L = n.get(w);
          L.shadowIntensity = ne.intensity, L.shadowBias = ne.bias, L.shadowNormalBias = ne.normalBias, L.shadowRadius = ne.radius, L.shadowMapSize = ne.mapSize, i.directionalShadow[p] = L, i.directionalShadowMap[p] = Q, i.directionalShadowMatrix[p] = w.shadow.matrix, v++;
        }
        i.directional[p] = V, p++;
      } else if (w.isSpotLight) {
        const V = e.get(w);
        V.position.setFromMatrixPosition(w.matrixWorld), V.color.copy(H).multiplyScalar(B), V.distance = G, V.coneCos = Math.cos(w.angle), V.penumbraCos = Math.cos(w.angle * (1 - w.penumbra)), V.decay = w.decay, i.spot[y] = V;
        const ne = w.shadow;
        if (w.map && (i.spotLightMap[b] = w.map, b++, ne.updateMatrices(w), w.castShadow && A++), i.spotLightMatrix[y] = ne.matrix, w.castShadow) {
          const L = n.get(w);
          L.shadowIntensity = ne.intensity, L.shadowBias = ne.bias, L.shadowNormalBias = ne.normalBias, L.shadowRadius = ne.radius, L.shadowMapSize = ne.mapSize, i.spotShadow[y] = L, i.spotShadowMap[y] = Q, M++;
        }
        y++;
      } else if (w.isRectAreaLight) {
        const V = e.get(w);
        V.color.copy(H).multiplyScalar(B), V.halfWidth.set(w.width * 0.5, 0, 0), V.halfHeight.set(0, w.height * 0.5, 0), i.rectArea[m] = V, m++;
      } else if (w.isPointLight) {
        const V = e.get(w);
        if (V.color.copy(w.color).multiplyScalar(w.intensity), V.distance = w.distance, V.decay = w.decay, w.castShadow) {
          const ne = w.shadow, L = n.get(w);
          L.shadowIntensity = ne.intensity, L.shadowBias = ne.bias, L.shadowNormalBias = ne.normalBias, L.shadowRadius = ne.radius, L.shadowMapSize = ne.mapSize, L.shadowCameraNear = ne.camera.near, L.shadowCameraFar = ne.camera.far, i.pointShadow[_] = L, i.pointShadowMap[_] = Q, i.pointShadowMatrix[_] = w.shadow.matrix, g++;
        }
        i.point[_] = V, _++;
      } else if (w.isHemisphereLight) {
        const V = e.get(w);
        V.skyColor.copy(w.color).multiplyScalar(B), V.groundColor.copy(w.groundColor).multiplyScalar(B), i.hemi[f] = V, f++;
      }
    }
    m > 0 && (t.has("OES_texture_float_linear") === !0 ? (i.rectAreaLTC1 = oe.LTC_FLOAT_1, i.rectAreaLTC2 = oe.LTC_FLOAT_2) : (i.rectAreaLTC1 = oe.LTC_HALF_1, i.rectAreaLTC2 = oe.LTC_HALF_2)), i.ambient[0] = c, i.ambient[1] = d, i.ambient[2] = h;
    const R = i.hash;
    (R.directionalLength !== p || R.pointLength !== _ || R.spotLength !== y || R.rectAreaLength !== m || R.hemiLength !== f || R.numDirectionalShadows !== v || R.numPointShadows !== g || R.numSpotShadows !== M || R.numSpotMaps !== b || R.numLightProbes !== T) && (i.directional.length = p, i.spot.length = y, i.rectArea.length = m, i.point.length = _, i.hemi.length = f, i.directionalShadow.length = v, i.directionalShadowMap.length = v, i.pointShadow.length = g, i.pointShadowMap.length = g, i.spotShadow.length = M, i.spotShadowMap.length = M, i.directionalShadowMatrix.length = v, i.pointShadowMatrix.length = g, i.spotLightMatrix.length = M + b - A, i.spotLightMap.length = b, i.numSpotLightShadowsWithMaps = A, i.numLightProbes = T, R.directionalLength = p, R.pointLength = _, R.spotLength = y, R.rectAreaLength = m, R.hemiLength = f, R.numDirectionalShadows = v, R.numPointShadows = g, R.numSpotShadows = M, R.numSpotMaps = b, R.numLightProbes = T, i.version = X2++);
  }
  function l(u, c) {
    let d = 0, h = 0, p = 0, _ = 0, y = 0;
    const m = c.matrixWorldInverse;
    for (let f = 0, v = u.length; f < v; f++) {
      const g = u[f];
      if (g.isDirectionalLight) {
        const M = i.directional[d];
        M.direction.setFromMatrixPosition(g.matrixWorld), r.setFromMatrixPosition(g.target.matrixWorld), M.direction.sub(r), M.direction.transformDirection(m), d++;
      } else if (g.isSpotLight) {
        const M = i.spot[p];
        M.position.setFromMatrixPosition(g.matrixWorld), M.position.applyMatrix4(m), M.direction.setFromMatrixPosition(g.matrixWorld), r.setFromMatrixPosition(g.target.matrixWorld), M.direction.sub(r), M.direction.transformDirection(m), p++;
      } else if (g.isRectAreaLight) {
        const M = i.rectArea[_];
        M.position.setFromMatrixPosition(g.matrixWorld), M.position.applyMatrix4(m), o.identity(), s.copy(g.matrixWorld), s.premultiply(m), o.extractRotation(s), M.halfWidth.set(g.width * 0.5, 0, 0), M.halfHeight.set(0, g.height * 0.5, 0), M.halfWidth.applyMatrix4(o), M.halfHeight.applyMatrix4(o), _++;
      } else if (g.isPointLight) {
        const M = i.point[h];
        M.position.setFromMatrixPosition(g.matrixWorld), M.position.applyMatrix4(m), h++;
      } else if (g.isHemisphereLight) {
        const M = i.hemi[y];
        M.direction.setFromMatrixPosition(g.matrixWorld), M.direction.transformDirection(m), y++;
      }
    }
  }
  return {
    setup: a,
    setupView: l,
    state: i
  };
}
function Dv(t) {
  const e = new q2(t), n = [], i = [];
  function r(c) {
    u.camera = c, n.length = 0, i.length = 0;
  }
  function s(c) {
    n.push(c);
  }
  function o(c) {
    i.push(c);
  }
  function a() {
    e.setup(n);
  }
  function l(c) {
    e.setupView(n, c);
  }
  const u = {
    lightsArray: n,
    shadowsArray: i,
    camera: null,
    lights: e,
    transmissionRenderTarget: {}
  };
  return {
    init: r,
    state: u,
    setupLights: a,
    setupLightsView: l,
    pushLight: s,
    pushShadow: o
  };
}
function K2(t) {
  let e = /* @__PURE__ */ new WeakMap();
  function n(r, s = 0) {
    const o = e.get(r);
    let a;
    return o === void 0 ? (a = new Dv(t), e.set(r, [a])) : s >= o.length ? (a = new Dv(t), o.push(a)) : a = o[s], a;
  }
  function i() {
    e = /* @__PURE__ */ new WeakMap();
  }
  return {
    get: n,
    dispose: i
  };
}
class Z2 extends Qa {
  constructor(e) {
    super(), this.isMeshDepthMaterial = !0, this.type = "MeshDepthMaterial", this.depthPacking = jE, this.map = null, this.alphaMap = null, this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.wireframe = !1, this.wireframeLinewidth = 1, this.setValues(e);
  }
  copy(e) {
    return super.copy(e), this.depthPacking = e.depthPacking, this.map = e.map, this.alphaMap = e.alphaMap, this.displacementMap = e.displacementMap, this.displacementScale = e.displacementScale, this.displacementBias = e.displacementBias, this.wireframe = e.wireframe, this.wireframeLinewidth = e.wireframeLinewidth, this;
  }
}
class Q2 extends Qa {
  constructor(e) {
    super(), this.isMeshDistanceMaterial = !0, this.type = "MeshDistanceMaterial", this.map = null, this.alphaMap = null, this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.setValues(e);
  }
  copy(e) {
    return super.copy(e), this.map = e.map, this.alphaMap = e.alphaMap, this.displacementMap = e.displacementMap, this.displacementScale = e.displacementScale, this.displacementBias = e.displacementBias, this;
  }
}
const J2 = `void main() {
	gl_Position = vec4( position, 1.0 );
}`, eR = `uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;
function tR(t, e, n) {
  let i = new Qp();
  const r = new Ie(), s = new Ie(), o = new St(), a = new Z2({ depthPacking: XE }), l = new Q2(), u = {}, c = n.maxTextureSize, d = { [Ur]: Tn, [Tn]: Ur, [Hi]: Hi }, h = new on({
    defines: {
      VSM_SAMPLES: 8
    },
    uniforms: {
      shadow_pass: { value: null },
      resolution: { value: new Ie() },
      radius: { value: 4 }
    },
    vertexShader: J2,
    fragmentShader: eR
  }), p = h.clone();
  p.defines.HORIZONTAL_PASS = 1;
  const _ = new ir();
  _.setAttribute(
    "position",
    new Ai(
      new Float32Array([-1, -1, 0.5, 3, -1, 0.5, -1, 3, 0.5]),
      3
    )
  );
  const y = new Sn(_, h), m = this;
  this.enabled = !1, this.autoUpdate = !0, this.needsUpdate = !1, this.type = Zx;
  let f = this.type;
  this.render = function(A, T, R) {
    if (m.enabled === !1 || m.autoUpdate === !1 && m.needsUpdate === !1 || A.length === 0) return;
    const j = t.getRenderTarget(), x = t.getActiveCubeFace(), w = t.getActiveMipmapLevel(), H = t.state;
    H.setBlending(Xi), H.buffers.color.setClear(1, 1, 1, 1), H.buffers.depth.setTest(!0), H.setScissorTest(!1);
    const B = f !== ki && this.type === ki, G = f === ki && this.type !== ki;
    for (let Q = 0, V = A.length; Q < V; Q++) {
      const ne = A[Q], L = ne.shadow;
      if (L === void 0) {
        console.warn("THREE.WebGLShadowMap:", ne, "has no shadow.");
        continue;
      }
      if (L.autoUpdate === !1 && L.needsUpdate === !1) continue;
      r.copy(L.mapSize);
      const q = L.getFrameExtents();
      if (r.multiply(q), s.copy(L.mapSize), (r.x > c || r.y > c) && (r.x > c && (s.x = Math.floor(c / q.x), r.x = s.x * q.x, L.mapSize.x = s.x), r.y > c && (s.y = Math.floor(c / q.y), r.y = s.y * q.y, L.mapSize.y = s.y)), L.map === null || B === !0 || G === !0) {
        const se = this.type !== ki ? { minFilter: Zn, magFilter: Zn } : {};
        L.map !== null && L.map.dispose(), L.map = new mi(r.x, r.y, se), L.map.texture.name = ne.name + ".shadowMap", L.camera.updateProjectionMatrix();
      }
      t.setRenderTarget(L.map), t.clear();
      const Z = L.getViewportCount();
      for (let se = 0; se < Z; se++) {
        const Te = L.getViewport(se);
        o.set(
          s.x * Te.x,
          s.y * Te.y,
          s.x * Te.z,
          s.y * Te.w
        ), H.viewport(o), L.updateMatrices(ne, se), i = L.getFrustum(), M(T, R, L.camera, ne, this.type);
      }
      L.isPointLightShadow !== !0 && this.type === ki && v(L, R), L.needsUpdate = !1;
    }
    f = this.type, m.needsUpdate = !1, t.setRenderTarget(j, x, w);
  };
  function v(A, T) {
    const R = e.update(y);
    h.defines.VSM_SAMPLES !== A.blurSamples && (h.defines.VSM_SAMPLES = A.blurSamples, p.defines.VSM_SAMPLES = A.blurSamples, h.needsUpdate = !0, p.needsUpdate = !0), A.mapPass === null && (A.mapPass = new mi(r.x, r.y)), h.uniforms.shadow_pass.value = A.map.texture, h.uniforms.resolution.value = A.mapSize, h.uniforms.radius.value = A.radius, t.setRenderTarget(A.mapPass), t.clear(), t.renderBufferDirect(T, null, R, h, y, null), p.uniforms.shadow_pass.value = A.mapPass.texture, p.uniforms.resolution.value = A.mapSize, p.uniforms.radius.value = A.radius, t.setRenderTarget(A.map), t.clear(), t.renderBufferDirect(T, null, R, p, y, null);
  }
  function g(A, T, R, j) {
    let x = null;
    const w = R.isPointLight === !0 ? A.customDistanceMaterial : A.customDepthMaterial;
    if (w !== void 0)
      x = w;
    else if (x = R.isPointLight === !0 ? l : a, t.localClippingEnabled && T.clipShadows === !0 && Array.isArray(T.clippingPlanes) && T.clippingPlanes.length !== 0 || T.displacementMap && T.displacementScale !== 0 || T.alphaMap && T.alphaTest > 0 || T.map && T.alphaTest > 0) {
      const H = x.uuid, B = T.uuid;
      let G = u[H];
      G === void 0 && (G = {}, u[H] = G);
      let Q = G[B];
      Q === void 0 && (Q = x.clone(), G[B] = Q, T.addEventListener("dispose", b)), x = Q;
    }
    if (x.visible = T.visible, x.wireframe = T.wireframe, j === ki ? x.side = T.shadowSide !== null ? T.shadowSide : T.side : x.side = T.shadowSide !== null ? T.shadowSide : d[T.side], x.alphaMap = T.alphaMap, x.alphaTest = T.alphaTest, x.map = T.map, x.clipShadows = T.clipShadows, x.clippingPlanes = T.clippingPlanes, x.clipIntersection = T.clipIntersection, x.displacementMap = T.displacementMap, x.displacementScale = T.displacementScale, x.displacementBias = T.displacementBias, x.wireframeLinewidth = T.wireframeLinewidth, x.linewidth = T.linewidth, R.isPointLight === !0 && x.isMeshDistanceMaterial === !0) {
      const H = t.properties.get(x);
      H.light = R;
    }
    return x;
  }
  function M(A, T, R, j, x) {
    if (A.visible === !1) return;
    if (A.layers.test(T.layers) && (A.isMesh || A.isLine || A.isPoints) && (A.castShadow || A.receiveShadow && x === ki) && (!A.frustumCulled || i.intersectsObject(A))) {
      A.modelViewMatrix.multiplyMatrices(R.matrixWorldInverse, A.matrixWorld);
      const B = e.update(A), G = A.material;
      if (Array.isArray(G)) {
        const Q = B.groups;
        for (let V = 0, ne = Q.length; V < ne; V++) {
          const L = Q[V], q = G[L.materialIndex];
          if (q && q.visible) {
            const Z = g(A, q, j, x);
            A.onBeforeShadow(t, A, T, R, B, Z, L), t.renderBufferDirect(R, null, B, Z, A, L), A.onAfterShadow(t, A, T, R, B, Z, L);
          }
        }
      } else if (G.visible) {
        const Q = g(A, G, j, x);
        A.onBeforeShadow(t, A, T, R, B, Q, null), t.renderBufferDirect(R, null, B, Q, A, null), A.onAfterShadow(t, A, T, R, B, Q, null);
      }
    }
    const H = A.children;
    for (let B = 0, G = H.length; B < G; B++)
      M(H[B], T, R, j, x);
  }
  function b(A) {
    A.target.removeEventListener("dispose", b);
    for (const R in u) {
      const j = u[R], x = A.target.uuid;
      x in j && (j[x].dispose(), delete j[x]);
    }
  }
}
const nR = {
  [Zd]: Qd,
  [Jd]: nh,
  [eh]: ih,
  [go]: th,
  [Qd]: Zd,
  [nh]: Jd,
  [ih]: eh,
  [th]: go
};
function iR(t) {
  function e() {
    let D = !1;
    const he = new St();
    let W = null;
    const K = new St(0, 0, 0, 0);
    return {
      setMask: function(ce) {
        W !== ce && !D && (t.colorMask(ce, ce, ce, ce), W = ce);
      },
      setLocked: function(ce) {
        D = ce;
      },
      setClear: function(ce, pe, Ye, At, hn) {
        hn === !0 && (ce *= At, pe *= At, Ye *= At), he.set(ce, pe, Ye, At), K.equals(he) === !1 && (t.clearColor(ce, pe, Ye, At), K.copy(he));
      },
      reset: function() {
        D = !1, W = null, K.set(-1, 0, 0, 0);
      }
    };
  }
  function n() {
    let D = !1, he = !1, W = null, K = null, ce = null;
    return {
      setReversed: function(pe) {
        he = pe;
      },
      setTest: function(pe) {
        pe ? de(t.DEPTH_TEST) : ue(t.DEPTH_TEST);
      },
      setMask: function(pe) {
        W !== pe && !D && (t.depthMask(pe), W = pe);
      },
      setFunc: function(pe) {
        if (he && (pe = nR[pe]), K !== pe) {
          switch (pe) {
            case Zd:
              t.depthFunc(t.NEVER);
              break;
            case Qd:
              t.depthFunc(t.ALWAYS);
              break;
            case Jd:
              t.depthFunc(t.LESS);
              break;
            case go:
              t.depthFunc(t.LEQUAL);
              break;
            case eh:
              t.depthFunc(t.EQUAL);
              break;
            case th:
              t.depthFunc(t.GEQUAL);
              break;
            case nh:
              t.depthFunc(t.GREATER);
              break;
            case ih:
              t.depthFunc(t.NOTEQUAL);
              break;
            default:
              t.depthFunc(t.LEQUAL);
          }
          K = pe;
        }
      },
      setLocked: function(pe) {
        D = pe;
      },
      setClear: function(pe) {
        ce !== pe && (t.clearDepth(pe), ce = pe);
      },
      reset: function() {
        D = !1, W = null, K = null, ce = null;
      }
    };
  }
  function i() {
    let D = !1, he = null, W = null, K = null, ce = null, pe = null, Ye = null, At = null, hn = null;
    return {
      setTest: function(Qe) {
        D || (Qe ? de(t.STENCIL_TEST) : ue(t.STENCIL_TEST));
      },
      setMask: function(Qe) {
        he !== Qe && !D && (t.stencilMask(Qe), he = Qe);
      },
      setFunc: function(Qe, pn, bi) {
        (W !== Qe || K !== pn || ce !== bi) && (t.stencilFunc(Qe, pn, bi), W = Qe, K = pn, ce = bi);
      },
      setOp: function(Qe, pn, bi) {
        (pe !== Qe || Ye !== pn || At !== bi) && (t.stencilOp(Qe, pn, bi), pe = Qe, Ye = pn, At = bi);
      },
      setLocked: function(Qe) {
        D = Qe;
      },
      setClear: function(Qe) {
        hn !== Qe && (t.clearStencil(Qe), hn = Qe);
      },
      reset: function() {
        D = !1, he = null, W = null, K = null, ce = null, pe = null, Ye = null, At = null, hn = null;
      }
    };
  }
  const r = new e(), s = new n(), o = new i(), a = /* @__PURE__ */ new WeakMap(), l = /* @__PURE__ */ new WeakMap();
  let u = {}, c = {}, d = /* @__PURE__ */ new WeakMap(), h = [], p = null, _ = !1, y = null, m = null, f = null, v = null, g = null, M = null, b = null, A = new Ve(0, 0, 0), T = 0, R = !1, j = null, x = null, w = null, H = null, B = null;
  const G = t.getParameter(t.MAX_COMBINED_TEXTURE_IMAGE_UNITS);
  let Q = !1, V = 0;
  const ne = t.getParameter(t.VERSION);
  ne.indexOf("WebGL") !== -1 ? (V = parseFloat(/^WebGL (\d)/.exec(ne)[1]), Q = V >= 1) : ne.indexOf("OpenGL ES") !== -1 && (V = parseFloat(/^OpenGL ES (\d)/.exec(ne)[1]), Q = V >= 2);
  let L = null, q = {};
  const Z = t.getParameter(t.SCISSOR_BOX), se = t.getParameter(t.VIEWPORT), Te = new St().fromArray(Z), Ge = new St().fromArray(se);
  function $(D, he, W, K) {
    const ce = new Uint8Array(4), pe = t.createTexture();
    t.bindTexture(D, pe), t.texParameteri(D, t.TEXTURE_MIN_FILTER, t.NEAREST), t.texParameteri(D, t.TEXTURE_MAG_FILTER, t.NEAREST);
    for (let Ye = 0; Ye < W; Ye++)
      D === t.TEXTURE_3D || D === t.TEXTURE_2D_ARRAY ? t.texImage3D(he, 0, t.RGBA, 1, 1, K, 0, t.RGBA, t.UNSIGNED_BYTE, ce) : t.texImage2D(he + Ye, 0, t.RGBA, 1, 1, 0, t.RGBA, t.UNSIGNED_BYTE, ce);
    return pe;
  }
  const te = {};
  te[t.TEXTURE_2D] = $(t.TEXTURE_2D, t.TEXTURE_2D, 1), te[t.TEXTURE_CUBE_MAP] = $(t.TEXTURE_CUBE_MAP, t.TEXTURE_CUBE_MAP_POSITIVE_X, 6), te[t.TEXTURE_2D_ARRAY] = $(t.TEXTURE_2D_ARRAY, t.TEXTURE_2D_ARRAY, 1, 1), te[t.TEXTURE_3D] = $(t.TEXTURE_3D, t.TEXTURE_3D, 1, 1), r.setClear(0, 0, 0, 1), s.setClear(1), o.setClear(0), de(t.DEPTH_TEST), s.setFunc(go), We(!1), Ke(Hg), de(t.CULL_FACE), P(Xi);
  function de(D) {
    u[D] !== !0 && (t.enable(D), u[D] = !0);
  }
  function ue(D) {
    u[D] !== !1 && (t.disable(D), u[D] = !1);
  }
  function Ne(D, he) {
    return c[D] !== he ? (t.bindFramebuffer(D, he), c[D] = he, D === t.DRAW_FRAMEBUFFER && (c[t.FRAMEBUFFER] = he), D === t.FRAMEBUFFER && (c[t.DRAW_FRAMEBUFFER] = he), !0) : !1;
  }
  function Ae(D, he) {
    let W = h, K = !1;
    if (D) {
      W = d.get(he), W === void 0 && (W = [], d.set(he, W));
      const ce = D.textures;
      if (W.length !== ce.length || W[0] !== t.COLOR_ATTACHMENT0) {
        for (let pe = 0, Ye = ce.length; pe < Ye; pe++)
          W[pe] = t.COLOR_ATTACHMENT0 + pe;
        W.length = ce.length, K = !0;
      }
    } else
      W[0] !== t.BACK && (W[0] = t.BACK, K = !0);
    K && t.drawBuffers(W);
  }
  function je(D) {
    return p !== D ? (t.useProgram(D), p = D, !0) : !1;
  }
  const rt = {
    [Qr]: t.FUNC_ADD,
    [TE]: t.FUNC_SUBTRACT,
    [CE]: t.FUNC_REVERSE_SUBTRACT
  };
  rt[AE] = t.MIN, rt[RE] = t.MAX;
  const Xe = {
    [bE]: t.ZERO,
    [PE]: t.ONE,
    [LE]: t.SRC_COLOR,
    [qd]: t.SRC_ALPHA,
    [FE]: t.SRC_ALPHA_SATURATE,
    [UE]: t.DST_COLOR,
    [IE]: t.DST_ALPHA,
    [DE]: t.ONE_MINUS_SRC_COLOR,
    [Kd]: t.ONE_MINUS_SRC_ALPHA,
    [kE]: t.ONE_MINUS_DST_COLOR,
    [NE]: t.ONE_MINUS_DST_ALPHA,
    [OE]: t.CONSTANT_COLOR,
    [BE]: t.ONE_MINUS_CONSTANT_COLOR,
    [zE]: t.CONSTANT_ALPHA,
    [HE]: t.ONE_MINUS_CONSTANT_ALPHA
  };
  function P(D, he, W, K, ce, pe, Ye, At, hn, Qe) {
    if (D === Xi) {
      _ === !0 && (ue(t.BLEND), _ = !1);
      return;
    }
    if (_ === !1 && (de(t.BLEND), _ = !0), D !== wE) {
      if (D !== y || Qe !== R) {
        if ((m !== Qr || g !== Qr) && (t.blendEquation(t.FUNC_ADD), m = Qr, g = Qr), Qe)
          switch (D) {
            case so:
              t.blendFuncSeparate(t.ONE, t.ONE_MINUS_SRC_ALPHA, t.ONE, t.ONE_MINUS_SRC_ALPHA);
              break;
            case Yd:
              t.blendFunc(t.ONE, t.ONE);
              break;
            case Vg:
              t.blendFuncSeparate(t.ZERO, t.ONE_MINUS_SRC_COLOR, t.ZERO, t.ONE);
              break;
            case Gg:
              t.blendFuncSeparate(t.ZERO, t.SRC_COLOR, t.ZERO, t.SRC_ALPHA);
              break;
            default:
              console.error("THREE.WebGLState: Invalid blending: ", D);
              break;
          }
        else
          switch (D) {
            case so:
              t.blendFuncSeparate(t.SRC_ALPHA, t.ONE_MINUS_SRC_ALPHA, t.ONE, t.ONE_MINUS_SRC_ALPHA);
              break;
            case Yd:
              t.blendFunc(t.SRC_ALPHA, t.ONE);
              break;
            case Vg:
              t.blendFuncSeparate(t.ZERO, t.ONE_MINUS_SRC_COLOR, t.ZERO, t.ONE);
              break;
            case Gg:
              t.blendFunc(t.ZERO, t.SRC_COLOR);
              break;
            default:
              console.error("THREE.WebGLState: Invalid blending: ", D);
              break;
          }
        f = null, v = null, M = null, b = null, A.set(0, 0, 0), T = 0, y = D, R = Qe;
      }
      return;
    }
    ce = ce || he, pe = pe || W, Ye = Ye || K, (he !== m || ce !== g) && (t.blendEquationSeparate(rt[he], rt[ce]), m = he, g = ce), (W !== f || K !== v || pe !== M || Ye !== b) && (t.blendFuncSeparate(Xe[W], Xe[K], Xe[pe], Xe[Ye]), f = W, v = K, M = pe, b = Ye), (At.equals(A) === !1 || hn !== T) && (t.blendColor(At.r, At.g, At.b, hn), A.copy(At), T = hn), y = D, R = !1;
  }
  function Cn(D, he) {
    D.side === Hi ? ue(t.CULL_FACE) : de(t.CULL_FACE);
    let W = D.side === Tn;
    he && (W = !W), We(W), D.blending === so && D.transparent === !1 ? P(Xi) : P(D.blending, D.blendEquation, D.blendSrc, D.blendDst, D.blendEquationAlpha, D.blendSrcAlpha, D.blendDstAlpha, D.blendColor, D.blendAlpha, D.premultipliedAlpha), s.setFunc(D.depthFunc), s.setTest(D.depthTest), s.setMask(D.depthWrite), r.setMask(D.colorWrite);
    const K = D.stencilWrite;
    o.setTest(K), K && (o.setMask(D.stencilWriteMask), o.setFunc(D.stencilFunc, D.stencilRef, D.stencilFuncMask), o.setOp(D.stencilFail, D.stencilZFail, D.stencilZPass)), ct(D.polygonOffset, D.polygonOffsetFactor, D.polygonOffsetUnits), D.alphaToCoverage === !0 ? de(t.SAMPLE_ALPHA_TO_COVERAGE) : ue(t.SAMPLE_ALPHA_TO_COVERAGE);
  }
  function We(D) {
    j !== D && (D ? t.frontFace(t.CW) : t.frontFace(t.CCW), j = D);
  }
  function Ke(D) {
    D !== ME ? (de(t.CULL_FACE), D !== x && (D === Hg ? t.cullFace(t.BACK) : D === EE ? t.cullFace(t.FRONT) : t.cullFace(t.FRONT_AND_BACK))) : ue(t.CULL_FACE), x = D;
  }
  function be(D) {
    D !== w && (Q && t.lineWidth(D), w = D);
  }
  function ct(D, he, W) {
    D ? (de(t.POLYGON_OFFSET_FILL), (H !== he || B !== W) && (t.polygonOffset(he, W), H = he, B = W)) : ue(t.POLYGON_OFFSET_FILL);
  }
  function De(D) {
    D ? de(t.SCISSOR_TEST) : ue(t.SCISSOR_TEST);
  }
  function C(D) {
    D === void 0 && (D = t.TEXTURE0 + G - 1), L !== D && (t.activeTexture(D), L = D);
  }
  function S(D, he, W) {
    W === void 0 && (L === null ? W = t.TEXTURE0 + G - 1 : W = L);
    let K = q[W];
    K === void 0 && (K = { type: void 0, texture: void 0 }, q[W] = K), (K.type !== D || K.texture !== he) && (L !== W && (t.activeTexture(W), L = W), t.bindTexture(D, he || te[D]), K.type = D, K.texture = he);
  }
  function F() {
    const D = q[L];
    D !== void 0 && D.type !== void 0 && (t.bindTexture(D.type, null), D.type = void 0, D.texture = void 0);
  }
  function Y() {
    try {
      t.compressedTexImage2D.apply(t, arguments);
    } catch (D) {
      console.error("THREE.WebGLState:", D);
    }
  }
  function J() {
    try {
      t.compressedTexImage3D.apply(t, arguments);
    } catch (D) {
      console.error("THREE.WebGLState:", D);
    }
  }
  function X() {
    try {
      t.texSubImage2D.apply(t, arguments);
    } catch (D) {
      console.error("THREE.WebGLState:", D);
    }
  }
  function Me() {
    try {
      t.texSubImage3D.apply(t, arguments);
    } catch (D) {
      console.error("THREE.WebGLState:", D);
    }
  }
  function le() {
    try {
      t.compressedTexSubImage2D.apply(t, arguments);
    } catch (D) {
      console.error("THREE.WebGLState:", D);
    }
  }
  function ge() {
    try {
      t.compressedTexSubImage3D.apply(t, arguments);
    } catch (D) {
      console.error("THREE.WebGLState:", D);
    }
  }
  function Ze() {
    try {
      t.texStorage2D.apply(t, arguments);
    } catch (D) {
      console.error("THREE.WebGLState:", D);
    }
  }
  function ie() {
    try {
      t.texStorage3D.apply(t, arguments);
    } catch (D) {
      console.error("THREE.WebGLState:", D);
    }
  }
  function ve() {
    try {
      t.texImage2D.apply(t, arguments);
    } catch (D) {
      console.error("THREE.WebGLState:", D);
    }
  }
  function Pe() {
    try {
      t.texImage3D.apply(t, arguments);
    } catch (D) {
      console.error("THREE.WebGLState:", D);
    }
  }
  function Le(D) {
    Te.equals(D) === !1 && (t.scissor(D.x, D.y, D.z, D.w), Te.copy(D));
  }
  function _e(D) {
    Ge.equals(D) === !1 && (t.viewport(D.x, D.y, D.z, D.w), Ge.copy(D));
  }
  function $e(D, he) {
    let W = l.get(he);
    W === void 0 && (W = /* @__PURE__ */ new WeakMap(), l.set(he, W));
    let K = W.get(D);
    K === void 0 && (K = t.getUniformBlockIndex(he, D.name), W.set(D, K));
  }
  function Ue(D, he) {
    const K = l.get(he).get(D);
    a.get(he) !== K && (t.uniformBlockBinding(he, K, D.__bindingPointIndex), a.set(he, K));
  }
  function st() {
    t.disable(t.BLEND), t.disable(t.CULL_FACE), t.disable(t.DEPTH_TEST), t.disable(t.POLYGON_OFFSET_FILL), t.disable(t.SCISSOR_TEST), t.disable(t.STENCIL_TEST), t.disable(t.SAMPLE_ALPHA_TO_COVERAGE), t.blendEquation(t.FUNC_ADD), t.blendFunc(t.ONE, t.ZERO), t.blendFuncSeparate(t.ONE, t.ZERO, t.ONE, t.ZERO), t.blendColor(0, 0, 0, 0), t.colorMask(!0, !0, !0, !0), t.clearColor(0, 0, 0, 0), t.depthMask(!0), t.depthFunc(t.LESS), t.clearDepth(1), t.stencilMask(4294967295), t.stencilFunc(t.ALWAYS, 0, 4294967295), t.stencilOp(t.KEEP, t.KEEP, t.KEEP), t.clearStencil(0), t.cullFace(t.BACK), t.frontFace(t.CCW), t.polygonOffset(0, 0), t.activeTexture(t.TEXTURE0), t.bindFramebuffer(t.FRAMEBUFFER, null), t.bindFramebuffer(t.DRAW_FRAMEBUFFER, null), t.bindFramebuffer(t.READ_FRAMEBUFFER, null), t.useProgram(null), t.lineWidth(1), t.scissor(0, 0, t.canvas.width, t.canvas.height), t.viewport(0, 0, t.canvas.width, t.canvas.height), u = {}, L = null, q = {}, c = {}, d = /* @__PURE__ */ new WeakMap(), h = [], p = null, _ = !1, y = null, m = null, f = null, v = null, g = null, M = null, b = null, A = new Ve(0, 0, 0), T = 0, R = !1, j = null, x = null, w = null, H = null, B = null, Te.set(0, 0, t.canvas.width, t.canvas.height), Ge.set(0, 0, t.canvas.width, t.canvas.height), r.reset(), s.reset(), o.reset();
  }
  return {
    buffers: {
      color: r,
      depth: s,
      stencil: o
    },
    enable: de,
    disable: ue,
    bindFramebuffer: Ne,
    drawBuffers: Ae,
    useProgram: je,
    setBlending: P,
    setMaterial: Cn,
    setFlipSided: We,
    setCullFace: Ke,
    setLineWidth: be,
    setPolygonOffset: ct,
    setScissorTest: De,
    activeTexture: C,
    bindTexture: S,
    unbindTexture: F,
    compressedTexImage2D: Y,
    compressedTexImage3D: J,
    texImage2D: ve,
    texImage3D: Pe,
    updateUBOMapping: $e,
    uniformBlockBinding: Ue,
    texStorage2D: Ze,
    texStorage3D: ie,
    texSubImage2D: X,
    texSubImage3D: Me,
    compressedTexSubImage2D: le,
    compressedTexSubImage3D: ge,
    scissor: Le,
    viewport: _e,
    reset: st
  };
}
function Iv(t, e, n, i) {
  const r = rR(i);
  switch (n) {
    case uy:
      return t * e;
    case fy:
      return t * e;
    case dy:
      return t * e * 2;
    case hy:
      return t * e / r.components * r.byteLength;
    case jp:
      return t * e / r.components * r.byteLength;
    case py:
      return t * e * 2 / r.components * r.byteLength;
    case Xp:
      return t * e * 2 / r.components * r.byteLength;
    case cy:
      return t * e * 3 / r.components * r.byteLength;
    case di:
      return t * e * 4 / r.components * r.byteLength;
    case Yp:
      return t * e * 4 / r.components * r.byteLength;
    case nu:
    case iu:
      return Math.floor((t + 3) / 4) * Math.floor((e + 3) / 4) * 8;
    case ru:
    case su:
      return Math.floor((t + 3) / 4) * Math.floor((e + 3) / 4) * 16;
    case lh:
    case ch:
      return Math.max(t, 16) * Math.max(e, 8) / 4;
    case ah:
    case uh:
      return Math.max(t, 8) * Math.max(e, 8) / 2;
    case fh:
    case dh:
      return Math.floor((t + 3) / 4) * Math.floor((e + 3) / 4) * 8;
    case hh:
      return Math.floor((t + 3) / 4) * Math.floor((e + 3) / 4) * 16;
    case ph:
      return Math.floor((t + 3) / 4) * Math.floor((e + 3) / 4) * 16;
    case mh:
      return Math.floor((t + 4) / 5) * Math.floor((e + 3) / 4) * 16;
    case gh:
      return Math.floor((t + 4) / 5) * Math.floor((e + 4) / 5) * 16;
    case vh:
      return Math.floor((t + 5) / 6) * Math.floor((e + 4) / 5) * 16;
    case _h:
      return Math.floor((t + 5) / 6) * Math.floor((e + 5) / 6) * 16;
    case xh:
      return Math.floor((t + 7) / 8) * Math.floor((e + 4) / 5) * 16;
    case yh:
      return Math.floor((t + 7) / 8) * Math.floor((e + 5) / 6) * 16;
    case Sh:
      return Math.floor((t + 7) / 8) * Math.floor((e + 7) / 8) * 16;
    case Mh:
      return Math.floor((t + 9) / 10) * Math.floor((e + 4) / 5) * 16;
    case Eh:
      return Math.floor((t + 9) / 10) * Math.floor((e + 5) / 6) * 16;
    case wh:
      return Math.floor((t + 9) / 10) * Math.floor((e + 7) / 8) * 16;
    case Th:
      return Math.floor((t + 9) / 10) * Math.floor((e + 9) / 10) * 16;
    case Ch:
      return Math.floor((t + 11) / 12) * Math.floor((e + 9) / 10) * 16;
    case Ah:
      return Math.floor((t + 11) / 12) * Math.floor((e + 11) / 12) * 16;
    case ou:
    case Rh:
    case bh:
      return Math.ceil(t / 4) * Math.ceil(e / 4) * 16;
    case my:
    case Ph:
      return Math.ceil(t / 4) * Math.ceil(e / 4) * 8;
    case Lh:
    case Dh:
      return Math.ceil(t / 4) * Math.ceil(e / 4) * 16;
  }
  throw new Error(
    `Unable to determine texture byte length for ${n} format.`
  );
}
function rR(t) {
  switch (t) {
    case Ji:
    case oy:
      return { byteLength: 1, components: 1 };
    case Oa:
    case ay:
    case Yi:
      return { byteLength: 2, components: 1 };
    case Wp:
    case $p:
      return { byteLength: 2, components: 4 };
    case vs:
    case Gp:
    case Wi:
      return { byteLength: 4, components: 1 };
    case ly:
      return { byteLength: 4, components: 3 };
  }
  throw new Error(`Unknown texture type ${t}.`);
}
function sR(t, e, n, i, r, s, o) {
  const a = e.has("WEBGL_multisampled_render_to_texture") ? e.get("WEBGL_multisampled_render_to_texture") : null, l = typeof navigator > "u" ? !1 : /OculusBrowser/g.test(navigator.userAgent), u = new Ie(), c = /* @__PURE__ */ new WeakMap();
  let d;
  const h = /* @__PURE__ */ new WeakMap();
  let p = !1;
  try {
    p = typeof OffscreenCanvas < "u" && new OffscreenCanvas(1, 1).getContext("2d") !== null;
  } catch {
  }
  function _(C, S) {
    return p ? (
      // eslint-disable-next-line compat/compat
      new OffscreenCanvas(C, S)
    ) : Yu("canvas");
  }
  function y(C, S, F) {
    let Y = 1;
    const J = De(C);
    if ((J.width > F || J.height > F) && (Y = F / Math.max(J.width, J.height)), Y < 1)
      if (typeof HTMLImageElement < "u" && C instanceof HTMLImageElement || typeof HTMLCanvasElement < "u" && C instanceof HTMLCanvasElement || typeof ImageBitmap < "u" && C instanceof ImageBitmap || typeof VideoFrame < "u" && C instanceof VideoFrame) {
        const X = Math.floor(Y * J.width), Me = Math.floor(Y * J.height);
        d === void 0 && (d = _(X, Me));
        const le = S ? _(X, Me) : d;
        return le.width = X, le.height = Me, le.getContext("2d").drawImage(C, 0, 0, X, Me), console.warn("THREE.WebGLRenderer: Texture has been resized from (" + J.width + "x" + J.height + ") to (" + X + "x" + Me + ")."), le;
      } else
        return "data" in C && console.warn("THREE.WebGLRenderer: Image in DataTexture is too big (" + J.width + "x" + J.height + ")."), C;
    return C;
  }
  function m(C) {
    return C.generateMipmaps && C.minFilter !== Zn && C.minFilter !== ci;
  }
  function f(C) {
    t.generateMipmap(C);
  }
  function v(C, S, F, Y, J = !1) {
    if (C !== null) {
      if (t[C] !== void 0) return t[C];
      console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '" + C + "'");
    }
    let X = S;
    if (S === t.RED && (F === t.FLOAT && (X = t.R32F), F === t.HALF_FLOAT && (X = t.R16F), F === t.UNSIGNED_BYTE && (X = t.R8)), S === t.RED_INTEGER && (F === t.UNSIGNED_BYTE && (X = t.R8UI), F === t.UNSIGNED_SHORT && (X = t.R16UI), F === t.UNSIGNED_INT && (X = t.R32UI), F === t.BYTE && (X = t.R8I), F === t.SHORT && (X = t.R16I), F === t.INT && (X = t.R32I)), S === t.RG && (F === t.FLOAT && (X = t.RG32F), F === t.HALF_FLOAT && (X = t.RG16F), F === t.UNSIGNED_BYTE && (X = t.RG8)), S === t.RG_INTEGER && (F === t.UNSIGNED_BYTE && (X = t.RG8UI), F === t.UNSIGNED_SHORT && (X = t.RG16UI), F === t.UNSIGNED_INT && (X = t.RG32UI), F === t.BYTE && (X = t.RG8I), F === t.SHORT && (X = t.RG16I), F === t.INT && (X = t.RG32I)), S === t.RGB_INTEGER && (F === t.UNSIGNED_BYTE && (X = t.RGB8UI), F === t.UNSIGNED_SHORT && (X = t.RGB16UI), F === t.UNSIGNED_INT && (X = t.RGB32UI), F === t.BYTE && (X = t.RGB8I), F === t.SHORT && (X = t.RGB16I), F === t.INT && (X = t.RGB32I)), S === t.RGBA_INTEGER && (F === t.UNSIGNED_BYTE && (X = t.RGBA8UI), F === t.UNSIGNED_SHORT && (X = t.RGBA16UI), F === t.UNSIGNED_INT && (X = t.RGBA32UI), F === t.BYTE && (X = t.RGBA8I), F === t.SHORT && (X = t.RGBA16I), F === t.INT && (X = t.RGBA32I)), S === t.RGB && F === t.UNSIGNED_INT_5_9_9_9_REV && (X = t.RGB9_E5), S === t.RGBA) {
      const Me = J ? Gu : Je.getTransfer(Y);
      F === t.FLOAT && (X = t.RGBA32F), F === t.HALF_FLOAT && (X = t.RGBA16F), F === t.UNSIGNED_BYTE && (X = Me === ot ? t.SRGB8_ALPHA8 : t.RGBA8), F === t.UNSIGNED_SHORT_4_4_4_4 && (X = t.RGBA4), F === t.UNSIGNED_SHORT_5_5_5_1 && (X = t.RGB5_A1);
    }
    return (X === t.R16F || X === t.R32F || X === t.RG16F || X === t.RG32F || X === t.RGBA16F || X === t.RGBA32F) && e.get("EXT_color_buffer_float"), X;
  }
  function g(C, S) {
    let F;
    return C ? S === null || S === vs || S === yo ? F = t.DEPTH24_STENCIL8 : S === Wi ? F = t.DEPTH32F_STENCIL8 : S === Oa && (F = t.DEPTH24_STENCIL8, console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")) : S === null || S === vs || S === yo ? F = t.DEPTH_COMPONENT24 : S === Wi ? F = t.DEPTH_COMPONENT32F : S === Oa && (F = t.DEPTH_COMPONENT16), F;
  }
  function M(C, S) {
    return m(C) === !0 || C.isFramebufferTexture && C.minFilter !== Zn && C.minFilter !== ci ? Math.log2(Math.max(S.width, S.height)) + 1 : C.mipmaps !== void 0 && C.mipmaps.length > 0 ? C.mipmaps.length : C.isCompressedTexture && Array.isArray(C.image) ? S.mipmaps.length : 1;
  }
  function b(C) {
    const S = C.target;
    S.removeEventListener("dispose", b), T(S), S.isVideoTexture && c.delete(S);
  }
  function A(C) {
    const S = C.target;
    S.removeEventListener("dispose", A), j(S);
  }
  function T(C) {
    const S = i.get(C);
    if (S.__webglInit === void 0) return;
    const F = C.source, Y = h.get(F);
    if (Y) {
      const J = Y[S.__cacheKey];
      J.usedTimes--, J.usedTimes === 0 && R(C), Object.keys(Y).length === 0 && h.delete(F);
    }
    i.remove(C);
  }
  function R(C) {
    const S = i.get(C);
    t.deleteTexture(S.__webglTexture);
    const F = C.source, Y = h.get(F);
    delete Y[S.__cacheKey], o.memory.textures--;
  }
  function j(C) {
    const S = i.get(C);
    if (C.depthTexture && C.depthTexture.dispose(), C.isWebGLCubeRenderTarget)
      for (let Y = 0; Y < 6; Y++) {
        if (Array.isArray(S.__webglFramebuffer[Y]))
          for (let J = 0; J < S.__webglFramebuffer[Y].length; J++) t.deleteFramebuffer(S.__webglFramebuffer[Y][J]);
        else
          t.deleteFramebuffer(S.__webglFramebuffer[Y]);
        S.__webglDepthbuffer && t.deleteRenderbuffer(S.__webglDepthbuffer[Y]);
      }
    else {
      if (Array.isArray(S.__webglFramebuffer))
        for (let Y = 0; Y < S.__webglFramebuffer.length; Y++) t.deleteFramebuffer(S.__webglFramebuffer[Y]);
      else
        t.deleteFramebuffer(S.__webglFramebuffer);
      if (S.__webglDepthbuffer && t.deleteRenderbuffer(S.__webglDepthbuffer), S.__webglMultisampledFramebuffer && t.deleteFramebuffer(S.__webglMultisampledFramebuffer), S.__webglColorRenderbuffer)
        for (let Y = 0; Y < S.__webglColorRenderbuffer.length; Y++)
          S.__webglColorRenderbuffer[Y] && t.deleteRenderbuffer(S.__webglColorRenderbuffer[Y]);
      S.__webglDepthRenderbuffer && t.deleteRenderbuffer(S.__webglDepthRenderbuffer);
    }
    const F = C.textures;
    for (let Y = 0, J = F.length; Y < J; Y++) {
      const X = i.get(F[Y]);
      X.__webglTexture && (t.deleteTexture(X.__webglTexture), o.memory.textures--), i.remove(F[Y]);
    }
    i.remove(C);
  }
  let x = 0;
  function w() {
    x = 0;
  }
  function H() {
    const C = x;
    return C >= r.maxTextures && console.warn("THREE.WebGLTextures: Trying to use " + C + " texture units while this GPU supports only " + r.maxTextures), x += 1, C;
  }
  function B(C) {
    const S = [];
    return S.push(C.wrapS), S.push(C.wrapT), S.push(C.wrapR || 0), S.push(C.magFilter), S.push(C.minFilter), S.push(C.anisotropy), S.push(C.internalFormat), S.push(C.format), S.push(C.type), S.push(C.generateMipmaps), S.push(C.premultiplyAlpha), S.push(C.flipY), S.push(C.unpackAlignment), S.push(C.colorSpace), S.join();
  }
  function G(C, S) {
    const F = i.get(C);
    if (C.isVideoTexture && be(C), C.isRenderTargetTexture === !1 && C.version > 0 && F.__version !== C.version) {
      const Y = C.image;
      if (Y === null)
        console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");
      else if (Y.complete === !1)
        console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");
      else {
        Ge(F, C, S);
        return;
      }
    }
    n.bindTexture(t.TEXTURE_2D, F.__webglTexture, t.TEXTURE0 + S);
  }
  function Q(C, S) {
    const F = i.get(C);
    if (C.version > 0 && F.__version !== C.version) {
      Ge(F, C, S);
      return;
    }
    n.bindTexture(t.TEXTURE_2D_ARRAY, F.__webglTexture, t.TEXTURE0 + S);
  }
  function V(C, S) {
    const F = i.get(C);
    if (C.version > 0 && F.__version !== C.version) {
      Ge(F, C, S);
      return;
    }
    n.bindTexture(t.TEXTURE_3D, F.__webglTexture, t.TEXTURE0 + S);
  }
  function ne(C, S) {
    const F = i.get(C);
    if (C.version > 0 && F.__version !== C.version) {
      $(F, C, S);
      return;
    }
    n.bindTexture(t.TEXTURE_CUBE_MAP, F.__webglTexture, t.TEXTURE0 + S);
  }
  const L = {
    [xo]: t.REPEAT,
    [os]: t.CLAMP_TO_EDGE,
    [oh]: t.MIRRORED_REPEAT
  }, q = {
    [Zn]: t.NEAREST,
    [$E]: t.NEAREST_MIPMAP_NEAREST,
    [_l]: t.NEAREST_MIPMAP_LINEAR,
    [ci]: t.LINEAR,
    [pf]: t.LINEAR_MIPMAP_NEAREST,
    [as]: t.LINEAR_MIPMAP_LINEAR
  }, Z = {
    [qE]: t.NEVER,
    [tw]: t.ALWAYS,
    [KE]: t.LESS,
    [vy]: t.LEQUAL,
    [ZE]: t.EQUAL,
    [ew]: t.GEQUAL,
    [QE]: t.GREATER,
    [JE]: t.NOTEQUAL
  };
  function se(C, S) {
    if (S.type === Wi && e.has("OES_texture_float_linear") === !1 && (S.magFilter === ci || S.magFilter === pf || S.magFilter === _l || S.magFilter === as || S.minFilter === ci || S.minFilter === pf || S.minFilter === _l || S.minFilter === as) && console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."), t.texParameteri(C, t.TEXTURE_WRAP_S, L[S.wrapS]), t.texParameteri(C, t.TEXTURE_WRAP_T, L[S.wrapT]), (C === t.TEXTURE_3D || C === t.TEXTURE_2D_ARRAY) && t.texParameteri(C, t.TEXTURE_WRAP_R, L[S.wrapR]), t.texParameteri(C, t.TEXTURE_MAG_FILTER, q[S.magFilter]), t.texParameteri(C, t.TEXTURE_MIN_FILTER, q[S.minFilter]), S.compareFunction && (t.texParameteri(C, t.TEXTURE_COMPARE_MODE, t.COMPARE_REF_TO_TEXTURE), t.texParameteri(C, t.TEXTURE_COMPARE_FUNC, Z[S.compareFunction])), e.has("EXT_texture_filter_anisotropic") === !0) {
      if (S.magFilter === Zn || S.minFilter !== _l && S.minFilter !== as || S.type === Wi && e.has("OES_texture_float_linear") === !1) return;
      if (S.anisotropy > 1 || i.get(S).__currentAnisotropy) {
        const F = e.get("EXT_texture_filter_anisotropic");
        t.texParameterf(C, F.TEXTURE_MAX_ANISOTROPY_EXT, Math.min(S.anisotropy, r.getMaxAnisotropy())), i.get(S).__currentAnisotropy = S.anisotropy;
      }
    }
  }
  function Te(C, S) {
    let F = !1;
    C.__webglInit === void 0 && (C.__webglInit = !0, S.addEventListener("dispose", b));
    const Y = S.source;
    let J = h.get(Y);
    J === void 0 && (J = {}, h.set(Y, J));
    const X = B(S);
    if (X !== C.__cacheKey) {
      J[X] === void 0 && (J[X] = {
        texture: t.createTexture(),
        usedTimes: 0
      }, o.memory.textures++, F = !0), J[X].usedTimes++;
      const Me = J[C.__cacheKey];
      Me !== void 0 && (J[C.__cacheKey].usedTimes--, Me.usedTimes === 0 && R(S)), C.__cacheKey = X, C.__webglTexture = J[X].texture;
    }
    return F;
  }
  function Ge(C, S, F) {
    let Y = t.TEXTURE_2D;
    (S.isDataArrayTexture || S.isCompressedArrayTexture) && (Y = t.TEXTURE_2D_ARRAY), S.isData3DTexture && (Y = t.TEXTURE_3D);
    const J = Te(C, S), X = S.source;
    n.bindTexture(Y, C.__webglTexture, t.TEXTURE0 + F);
    const Me = i.get(X);
    if (X.version !== Me.__version || J === !0) {
      n.activeTexture(t.TEXTURE0 + F);
      const le = Je.getPrimaries(Je.workingColorSpace), ge = S.colorSpace === xr ? null : Je.getPrimaries(S.colorSpace), Ze = S.colorSpace === xr || le === ge ? t.NONE : t.BROWSER_DEFAULT_WEBGL;
      t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL, S.flipY), t.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL, S.premultiplyAlpha), t.pixelStorei(t.UNPACK_ALIGNMENT, S.unpackAlignment), t.pixelStorei(t.UNPACK_COLORSPACE_CONVERSION_WEBGL, Ze);
      let ie = y(S.image, !1, r.maxTextureSize);
      ie = ct(S, ie);
      const ve = s.convert(S.format, S.colorSpace), Pe = s.convert(S.type);
      let Le = v(S.internalFormat, ve, Pe, S.colorSpace, S.isVideoTexture);
      se(Y, S);
      let _e;
      const $e = S.mipmaps, Ue = S.isVideoTexture !== !0, st = Me.__version === void 0 || J === !0, D = X.dataReady, he = M(S, ie);
      if (S.isDepthTexture)
        Le = g(S.format === So, S.type), st && (Ue ? n.texStorage2D(t.TEXTURE_2D, 1, Le, ie.width, ie.height) : n.texImage2D(t.TEXTURE_2D, 0, Le, ie.width, ie.height, 0, ve, Pe, null));
      else if (S.isDataTexture)
        if ($e.length > 0) {
          Ue && st && n.texStorage2D(t.TEXTURE_2D, he, Le, $e[0].width, $e[0].height);
          for (let W = 0, K = $e.length; W < K; W++)
            _e = $e[W], Ue ? D && n.texSubImage2D(t.TEXTURE_2D, W, 0, 0, _e.width, _e.height, ve, Pe, _e.data) : n.texImage2D(t.TEXTURE_2D, W, Le, _e.width, _e.height, 0, ve, Pe, _e.data);
          S.generateMipmaps = !1;
        } else
          Ue ? (st && n.texStorage2D(t.TEXTURE_2D, he, Le, ie.width, ie.height), D && n.texSubImage2D(t.TEXTURE_2D, 0, 0, 0, ie.width, ie.height, ve, Pe, ie.data)) : n.texImage2D(t.TEXTURE_2D, 0, Le, ie.width, ie.height, 0, ve, Pe, ie.data);
      else if (S.isCompressedTexture)
        if (S.isCompressedArrayTexture) {
          Ue && st && n.texStorage3D(t.TEXTURE_2D_ARRAY, he, Le, $e[0].width, $e[0].height, ie.depth);
          for (let W = 0, K = $e.length; W < K; W++)
            if (_e = $e[W], S.format !== di)
              if (ve !== null)
                if (Ue) {
                  if (D)
                    if (S.layerUpdates.size > 0) {
                      const ce = Iv(_e.width, _e.height, S.format, S.type);
                      for (const pe of S.layerUpdates) {
                        const Ye = _e.data.subarray(
                          pe * ce / _e.data.BYTES_PER_ELEMENT,
                          (pe + 1) * ce / _e.data.BYTES_PER_ELEMENT
                        );
                        n.compressedTexSubImage3D(t.TEXTURE_2D_ARRAY, W, 0, 0, pe, _e.width, _e.height, 1, ve, Ye, 0, 0);
                      }
                      S.clearLayerUpdates();
                    } else
                      n.compressedTexSubImage3D(t.TEXTURE_2D_ARRAY, W, 0, 0, 0, _e.width, _e.height, ie.depth, ve, _e.data, 0, 0);
                } else
                  n.compressedTexImage3D(t.TEXTURE_2D_ARRAY, W, Le, _e.width, _e.height, ie.depth, 0, _e.data, 0, 0);
              else
                console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");
            else
              Ue ? D && n.texSubImage3D(t.TEXTURE_2D_ARRAY, W, 0, 0, 0, _e.width, _e.height, ie.depth, ve, Pe, _e.data) : n.texImage3D(t.TEXTURE_2D_ARRAY, W, Le, _e.width, _e.height, ie.depth, 0, ve, Pe, _e.data);
        } else {
          Ue && st && n.texStorage2D(t.TEXTURE_2D, he, Le, $e[0].width, $e[0].height);
          for (let W = 0, K = $e.length; W < K; W++)
            _e = $e[W], S.format !== di ? ve !== null ? Ue ? D && n.compressedTexSubImage2D(t.TEXTURE_2D, W, 0, 0, _e.width, _e.height, ve, _e.data) : n.compressedTexImage2D(t.TEXTURE_2D, W, Le, _e.width, _e.height, 0, _e.data) : console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()") : Ue ? D && n.texSubImage2D(t.TEXTURE_2D, W, 0, 0, _e.width, _e.height, ve, Pe, _e.data) : n.texImage2D(t.TEXTURE_2D, W, Le, _e.width, _e.height, 0, ve, Pe, _e.data);
        }
      else if (S.isDataArrayTexture)
        if (Ue) {
          if (st && n.texStorage3D(t.TEXTURE_2D_ARRAY, he, Le, ie.width, ie.height, ie.depth), D)
            if (S.layerUpdates.size > 0) {
              const W = Iv(ie.width, ie.height, S.format, S.type);
              for (const K of S.layerUpdates) {
                const ce = ie.data.subarray(
                  K * W / ie.data.BYTES_PER_ELEMENT,
                  (K + 1) * W / ie.data.BYTES_PER_ELEMENT
                );
                n.texSubImage3D(t.TEXTURE_2D_ARRAY, 0, 0, 0, K, ie.width, ie.height, 1, ve, Pe, ce);
              }
              S.clearLayerUpdates();
            } else
              n.texSubImage3D(t.TEXTURE_2D_ARRAY, 0, 0, 0, 0, ie.width, ie.height, ie.depth, ve, Pe, ie.data);
        } else
          n.texImage3D(t.TEXTURE_2D_ARRAY, 0, Le, ie.width, ie.height, ie.depth, 0, ve, Pe, ie.data);
      else if (S.isData3DTexture)
        Ue ? (st && n.texStorage3D(t.TEXTURE_3D, he, Le, ie.width, ie.height, ie.depth), D && n.texSubImage3D(t.TEXTURE_3D, 0, 0, 0, 0, ie.width, ie.height, ie.depth, ve, Pe, ie.data)) : n.texImage3D(t.TEXTURE_3D, 0, Le, ie.width, ie.height, ie.depth, 0, ve, Pe, ie.data);
      else if (S.isFramebufferTexture) {
        if (st)
          if (Ue)
            n.texStorage2D(t.TEXTURE_2D, he, Le, ie.width, ie.height);
          else {
            let W = ie.width, K = ie.height;
            for (let ce = 0; ce < he; ce++)
              n.texImage2D(t.TEXTURE_2D, ce, Le, W, K, 0, ve, Pe, null), W >>= 1, K >>= 1;
          }
      } else if ($e.length > 0) {
        if (Ue && st) {
          const W = De($e[0]);
          n.texStorage2D(t.TEXTURE_2D, he, Le, W.width, W.height);
        }
        for (let W = 0, K = $e.length; W < K; W++)
          _e = $e[W], Ue ? D && n.texSubImage2D(t.TEXTURE_2D, W, 0, 0, ve, Pe, _e) : n.texImage2D(t.TEXTURE_2D, W, Le, ve, Pe, _e);
        S.generateMipmaps = !1;
      } else if (Ue) {
        if (st) {
          const W = De(ie);
          n.texStorage2D(t.TEXTURE_2D, he, Le, W.width, W.height);
        }
        D && n.texSubImage2D(t.TEXTURE_2D, 0, 0, 0, ve, Pe, ie);
      } else
        n.texImage2D(t.TEXTURE_2D, 0, Le, ve, Pe, ie);
      m(S) && f(Y), Me.__version = X.version, S.onUpdate && S.onUpdate(S);
    }
    C.__version = S.version;
  }
  function $(C, S, F) {
    if (S.image.length !== 6) return;
    const Y = Te(C, S), J = S.source;
    n.bindTexture(t.TEXTURE_CUBE_MAP, C.__webglTexture, t.TEXTURE0 + F);
    const X = i.get(J);
    if (J.version !== X.__version || Y === !0) {
      n.activeTexture(t.TEXTURE0 + F);
      const Me = Je.getPrimaries(Je.workingColorSpace), le = S.colorSpace === xr ? null : Je.getPrimaries(S.colorSpace), ge = S.colorSpace === xr || Me === le ? t.NONE : t.BROWSER_DEFAULT_WEBGL;
      t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL, S.flipY), t.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL, S.premultiplyAlpha), t.pixelStorei(t.UNPACK_ALIGNMENT, S.unpackAlignment), t.pixelStorei(t.UNPACK_COLORSPACE_CONVERSION_WEBGL, ge);
      const Ze = S.isCompressedTexture || S.image[0].isCompressedTexture, ie = S.image[0] && S.image[0].isDataTexture, ve = [];
      for (let K = 0; K < 6; K++)
        !Ze && !ie ? ve[K] = y(S.image[K], !0, r.maxCubemapSize) : ve[K] = ie ? S.image[K].image : S.image[K], ve[K] = ct(S, ve[K]);
      const Pe = ve[0], Le = s.convert(S.format, S.colorSpace), _e = s.convert(S.type), $e = v(S.internalFormat, Le, _e, S.colorSpace), Ue = S.isVideoTexture !== !0, st = X.__version === void 0 || Y === !0, D = J.dataReady;
      let he = M(S, Pe);
      se(t.TEXTURE_CUBE_MAP, S);
      let W;
      if (Ze) {
        Ue && st && n.texStorage2D(t.TEXTURE_CUBE_MAP, he, $e, Pe.width, Pe.height);
        for (let K = 0; K < 6; K++) {
          W = ve[K].mipmaps;
          for (let ce = 0; ce < W.length; ce++) {
            const pe = W[ce];
            S.format !== di ? Le !== null ? Ue ? D && n.compressedTexSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X + K, ce, 0, 0, pe.width, pe.height, Le, pe.data) : n.compressedTexImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X + K, ce, $e, pe.width, pe.height, 0, pe.data) : console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()") : Ue ? D && n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X + K, ce, 0, 0, pe.width, pe.height, Le, _e, pe.data) : n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X + K, ce, $e, pe.width, pe.height, 0, Le, _e, pe.data);
          }
        }
      } else {
        if (W = S.mipmaps, Ue && st) {
          W.length > 0 && he++;
          const K = De(ve[0]);
          n.texStorage2D(t.TEXTURE_CUBE_MAP, he, $e, K.width, K.height);
        }
        for (let K = 0; K < 6; K++)
          if (ie) {
            Ue ? D && n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X + K, 0, 0, 0, ve[K].width, ve[K].height, Le, _e, ve[K].data) : n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X + K, 0, $e, ve[K].width, ve[K].height, 0, Le, _e, ve[K].data);
            for (let ce = 0; ce < W.length; ce++) {
              const Ye = W[ce].image[K].image;
              Ue ? D && n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X + K, ce + 1, 0, 0, Ye.width, Ye.height, Le, _e, Ye.data) : n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X + K, ce + 1, $e, Ye.width, Ye.height, 0, Le, _e, Ye.data);
            }
          } else {
            Ue ? D && n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X + K, 0, 0, 0, Le, _e, ve[K]) : n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X + K, 0, $e, Le, _e, ve[K]);
            for (let ce = 0; ce < W.length; ce++) {
              const pe = W[ce];
              Ue ? D && n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X + K, ce + 1, 0, 0, Le, _e, pe.image[K]) : n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X + K, ce + 1, $e, Le, _e, pe.image[K]);
            }
          }
      }
      m(S) && f(t.TEXTURE_CUBE_MAP), X.__version = J.version, S.onUpdate && S.onUpdate(S);
    }
    C.__version = S.version;
  }
  function te(C, S, F, Y, J, X) {
    const Me = s.convert(F.format, F.colorSpace), le = s.convert(F.type), ge = v(F.internalFormat, Me, le, F.colorSpace);
    if (!i.get(S).__hasExternalTextures) {
      const ie = Math.max(1, S.width >> X), ve = Math.max(1, S.height >> X);
      J === t.TEXTURE_3D || J === t.TEXTURE_2D_ARRAY ? n.texImage3D(J, X, ge, ie, ve, S.depth, 0, Me, le, null) : n.texImage2D(J, X, ge, ie, ve, 0, Me, le, null);
    }
    n.bindFramebuffer(t.FRAMEBUFFER, C), Ke(S) ? a.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER, Y, J, i.get(F).__webglTexture, 0, We(S)) : (J === t.TEXTURE_2D || J >= t.TEXTURE_CUBE_MAP_POSITIVE_X && J <= t.TEXTURE_CUBE_MAP_NEGATIVE_Z) && t.framebufferTexture2D(t.FRAMEBUFFER, Y, J, i.get(F).__webglTexture, X), n.bindFramebuffer(t.FRAMEBUFFER, null);
  }
  function de(C, S, F) {
    if (t.bindRenderbuffer(t.RENDERBUFFER, C), S.depthBuffer) {
      const Y = S.depthTexture, J = Y && Y.isDepthTexture ? Y.type : null, X = g(S.stencilBuffer, J), Me = S.stencilBuffer ? t.DEPTH_STENCIL_ATTACHMENT : t.DEPTH_ATTACHMENT, le = We(S);
      Ke(S) ? a.renderbufferStorageMultisampleEXT(t.RENDERBUFFER, le, X, S.width, S.height) : F ? t.renderbufferStorageMultisample(t.RENDERBUFFER, le, X, S.width, S.height) : t.renderbufferStorage(t.RENDERBUFFER, X, S.width, S.height), t.framebufferRenderbuffer(t.FRAMEBUFFER, Me, t.RENDERBUFFER, C);
    } else {
      const Y = S.textures;
      for (let J = 0; J < Y.length; J++) {
        const X = Y[J], Me = s.convert(X.format, X.colorSpace), le = s.convert(X.type), ge = v(X.internalFormat, Me, le, X.colorSpace), Ze = We(S);
        F && Ke(S) === !1 ? t.renderbufferStorageMultisample(t.RENDERBUFFER, Ze, ge, S.width, S.height) : Ke(S) ? a.renderbufferStorageMultisampleEXT(t.RENDERBUFFER, Ze, ge, S.width, S.height) : t.renderbufferStorage(t.RENDERBUFFER, ge, S.width, S.height);
      }
    }
    t.bindRenderbuffer(t.RENDERBUFFER, null);
  }
  function ue(C, S) {
    if (S && S.isWebGLCubeRenderTarget) throw new Error("Depth Texture with cube render targets is not supported");
    if (n.bindFramebuffer(t.FRAMEBUFFER, C), !(S.depthTexture && S.depthTexture.isDepthTexture))
      throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");
    (!i.get(S.depthTexture).__webglTexture || S.depthTexture.image.width !== S.width || S.depthTexture.image.height !== S.height) && (S.depthTexture.image.width = S.width, S.depthTexture.image.height = S.height, S.depthTexture.needsUpdate = !0), G(S.depthTexture, 0);
    const Y = i.get(S.depthTexture).__webglTexture, J = We(S);
    if (S.depthTexture.format === oo)
      Ke(S) ? a.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER, t.DEPTH_ATTACHMENT, t.TEXTURE_2D, Y, 0, J) : t.framebufferTexture2D(t.FRAMEBUFFER, t.DEPTH_ATTACHMENT, t.TEXTURE_2D, Y, 0);
    else if (S.depthTexture.format === So)
      Ke(S) ? a.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER, t.DEPTH_STENCIL_ATTACHMENT, t.TEXTURE_2D, Y, 0, J) : t.framebufferTexture2D(t.FRAMEBUFFER, t.DEPTH_STENCIL_ATTACHMENT, t.TEXTURE_2D, Y, 0);
    else
      throw new Error("Unknown depthTexture format");
  }
  function Ne(C) {
    const S = i.get(C), F = C.isWebGLCubeRenderTarget === !0;
    if (S.__boundDepthTexture !== C.depthTexture) {
      const Y = C.depthTexture;
      if (S.__depthDisposeCallback && S.__depthDisposeCallback(), Y) {
        const J = () => {
          delete S.__boundDepthTexture, delete S.__depthDisposeCallback, Y.removeEventListener("dispose", J);
        };
        Y.addEventListener("dispose", J), S.__depthDisposeCallback = J;
      }
      S.__boundDepthTexture = Y;
    }
    if (C.depthTexture && !S.__autoAllocateDepthBuffer) {
      if (F) throw new Error("target.depthTexture not supported in Cube render targets");
      ue(S.__webglFramebuffer, C);
    } else if (F) {
      S.__webglDepthbuffer = [];
      for (let Y = 0; Y < 6; Y++)
        if (n.bindFramebuffer(t.FRAMEBUFFER, S.__webglFramebuffer[Y]), S.__webglDepthbuffer[Y] === void 0)
          S.__webglDepthbuffer[Y] = t.createRenderbuffer(), de(S.__webglDepthbuffer[Y], C, !1);
        else {
          const J = C.stencilBuffer ? t.DEPTH_STENCIL_ATTACHMENT : t.DEPTH_ATTACHMENT, X = S.__webglDepthbuffer[Y];
          t.bindRenderbuffer(t.RENDERBUFFER, X), t.framebufferRenderbuffer(t.FRAMEBUFFER, J, t.RENDERBUFFER, X);
        }
    } else if (n.bindFramebuffer(t.FRAMEBUFFER, S.__webglFramebuffer), S.__webglDepthbuffer === void 0)
      S.__webglDepthbuffer = t.createRenderbuffer(), de(S.__webglDepthbuffer, C, !1);
    else {
      const Y = C.stencilBuffer ? t.DEPTH_STENCIL_ATTACHMENT : t.DEPTH_ATTACHMENT, J = S.__webglDepthbuffer;
      t.bindRenderbuffer(t.RENDERBUFFER, J), t.framebufferRenderbuffer(t.FRAMEBUFFER, Y, t.RENDERBUFFER, J);
    }
    n.bindFramebuffer(t.FRAMEBUFFER, null);
  }
  function Ae(C, S, F) {
    const Y = i.get(C);
    S !== void 0 && te(Y.__webglFramebuffer, C, C.texture, t.COLOR_ATTACHMENT0, t.TEXTURE_2D, 0), F !== void 0 && Ne(C);
  }
  function je(C) {
    const S = C.texture, F = i.get(C), Y = i.get(S);
    C.addEventListener("dispose", A);
    const J = C.textures, X = C.isWebGLCubeRenderTarget === !0, Me = J.length > 1;
    if (Me || (Y.__webglTexture === void 0 && (Y.__webglTexture = t.createTexture()), Y.__version = S.version, o.memory.textures++), X) {
      F.__webglFramebuffer = [];
      for (let le = 0; le < 6; le++)
        if (S.mipmaps && S.mipmaps.length > 0) {
          F.__webglFramebuffer[le] = [];
          for (let ge = 0; ge < S.mipmaps.length; ge++)
            F.__webglFramebuffer[le][ge] = t.createFramebuffer();
        } else
          F.__webglFramebuffer[le] = t.createFramebuffer();
    } else {
      if (S.mipmaps && S.mipmaps.length > 0) {
        F.__webglFramebuffer = [];
        for (let le = 0; le < S.mipmaps.length; le++)
          F.__webglFramebuffer[le] = t.createFramebuffer();
      } else
        F.__webglFramebuffer = t.createFramebuffer();
      if (Me)
        for (let le = 0, ge = J.length; le < ge; le++) {
          const Ze = i.get(J[le]);
          Ze.__webglTexture === void 0 && (Ze.__webglTexture = t.createTexture(), o.memory.textures++);
        }
      if (C.samples > 0 && Ke(C) === !1) {
        F.__webglMultisampledFramebuffer = t.createFramebuffer(), F.__webglColorRenderbuffer = [], n.bindFramebuffer(t.FRAMEBUFFER, F.__webglMultisampledFramebuffer);
        for (let le = 0; le < J.length; le++) {
          const ge = J[le];
          F.__webglColorRenderbuffer[le] = t.createRenderbuffer(), t.bindRenderbuffer(t.RENDERBUFFER, F.__webglColorRenderbuffer[le]);
          const Ze = s.convert(ge.format, ge.colorSpace), ie = s.convert(ge.type), ve = v(ge.internalFormat, Ze, ie, ge.colorSpace, C.isXRRenderTarget === !0), Pe = We(C);
          t.renderbufferStorageMultisample(t.RENDERBUFFER, Pe, ve, C.width, C.height), t.framebufferRenderbuffer(t.FRAMEBUFFER, t.COLOR_ATTACHMENT0 + le, t.RENDERBUFFER, F.__webglColorRenderbuffer[le]);
        }
        t.bindRenderbuffer(t.RENDERBUFFER, null), C.depthBuffer && (F.__webglDepthRenderbuffer = t.createRenderbuffer(), de(F.__webglDepthRenderbuffer, C, !0)), n.bindFramebuffer(t.FRAMEBUFFER, null);
      }
    }
    if (X) {
      n.bindTexture(t.TEXTURE_CUBE_MAP, Y.__webglTexture), se(t.TEXTURE_CUBE_MAP, S);
      for (let le = 0; le < 6; le++)
        if (S.mipmaps && S.mipmaps.length > 0)
          for (let ge = 0; ge < S.mipmaps.length; ge++)
            te(F.__webglFramebuffer[le][ge], C, S, t.COLOR_ATTACHMENT0, t.TEXTURE_CUBE_MAP_POSITIVE_X + le, ge);
        else
          te(F.__webglFramebuffer[le], C, S, t.COLOR_ATTACHMENT0, t.TEXTURE_CUBE_MAP_POSITIVE_X + le, 0);
      m(S) && f(t.TEXTURE_CUBE_MAP), n.unbindTexture();
    } else if (Me) {
      for (let le = 0, ge = J.length; le < ge; le++) {
        const Ze = J[le], ie = i.get(Ze);
        n.bindTexture(t.TEXTURE_2D, ie.__webglTexture), se(t.TEXTURE_2D, Ze), te(F.__webglFramebuffer, C, Ze, t.COLOR_ATTACHMENT0 + le, t.TEXTURE_2D, 0), m(Ze) && f(t.TEXTURE_2D);
      }
      n.unbindTexture();
    } else {
      let le = t.TEXTURE_2D;
      if ((C.isWebGL3DRenderTarget || C.isWebGLArrayRenderTarget) && (le = C.isWebGL3DRenderTarget ? t.TEXTURE_3D : t.TEXTURE_2D_ARRAY), n.bindTexture(le, Y.__webglTexture), se(le, S), S.mipmaps && S.mipmaps.length > 0)
        for (let ge = 0; ge < S.mipmaps.length; ge++)
          te(F.__webglFramebuffer[ge], C, S, t.COLOR_ATTACHMENT0, le, ge);
      else
        te(F.__webglFramebuffer, C, S, t.COLOR_ATTACHMENT0, le, 0);
      m(S) && f(le), n.unbindTexture();
    }
    C.depthBuffer && Ne(C);
  }
  function rt(C) {
    const S = C.textures;
    for (let F = 0, Y = S.length; F < Y; F++) {
      const J = S[F];
      if (m(J)) {
        const X = C.isWebGLCubeRenderTarget ? t.TEXTURE_CUBE_MAP : t.TEXTURE_2D, Me = i.get(J).__webglTexture;
        n.bindTexture(X, Me), f(X), n.unbindTexture();
      }
    }
  }
  const Xe = [], P = [];
  function Cn(C) {
    if (C.samples > 0) {
      if (Ke(C) === !1) {
        const S = C.textures, F = C.width, Y = C.height;
        let J = t.COLOR_BUFFER_BIT;
        const X = C.stencilBuffer ? t.DEPTH_STENCIL_ATTACHMENT : t.DEPTH_ATTACHMENT, Me = i.get(C), le = S.length > 1;
        if (le)
          for (let ge = 0; ge < S.length; ge++)
            n.bindFramebuffer(t.FRAMEBUFFER, Me.__webglMultisampledFramebuffer), t.framebufferRenderbuffer(t.FRAMEBUFFER, t.COLOR_ATTACHMENT0 + ge, t.RENDERBUFFER, null), n.bindFramebuffer(t.FRAMEBUFFER, Me.__webglFramebuffer), t.framebufferTexture2D(t.DRAW_FRAMEBUFFER, t.COLOR_ATTACHMENT0 + ge, t.TEXTURE_2D, null, 0);
        n.bindFramebuffer(t.READ_FRAMEBUFFER, Me.__webglMultisampledFramebuffer), n.bindFramebuffer(t.DRAW_FRAMEBUFFER, Me.__webglFramebuffer);
        for (let ge = 0; ge < S.length; ge++) {
          if (C.resolveDepthBuffer && (C.depthBuffer && (J |= t.DEPTH_BUFFER_BIT), C.stencilBuffer && C.resolveStencilBuffer && (J |= t.STENCIL_BUFFER_BIT)), le) {
            t.framebufferRenderbuffer(t.READ_FRAMEBUFFER, t.COLOR_ATTACHMENT0, t.RENDERBUFFER, Me.__webglColorRenderbuffer[ge]);
            const Ze = i.get(S[ge]).__webglTexture;
            t.framebufferTexture2D(t.DRAW_FRAMEBUFFER, t.COLOR_ATTACHMENT0, t.TEXTURE_2D, Ze, 0);
          }
          t.blitFramebuffer(0, 0, F, Y, 0, 0, F, Y, J, t.NEAREST), l === !0 && (Xe.length = 0, P.length = 0, Xe.push(t.COLOR_ATTACHMENT0 + ge), C.depthBuffer && C.resolveDepthBuffer === !1 && (Xe.push(X), P.push(X), t.invalidateFramebuffer(t.DRAW_FRAMEBUFFER, P)), t.invalidateFramebuffer(t.READ_FRAMEBUFFER, Xe));
        }
        if (n.bindFramebuffer(t.READ_FRAMEBUFFER, null), n.bindFramebuffer(t.DRAW_FRAMEBUFFER, null), le)
          for (let ge = 0; ge < S.length; ge++) {
            n.bindFramebuffer(t.FRAMEBUFFER, Me.__webglMultisampledFramebuffer), t.framebufferRenderbuffer(t.FRAMEBUFFER, t.COLOR_ATTACHMENT0 + ge, t.RENDERBUFFER, Me.__webglColorRenderbuffer[ge]);
            const Ze = i.get(S[ge]).__webglTexture;
            n.bindFramebuffer(t.FRAMEBUFFER, Me.__webglFramebuffer), t.framebufferTexture2D(t.DRAW_FRAMEBUFFER, t.COLOR_ATTACHMENT0 + ge, t.TEXTURE_2D, Ze, 0);
          }
        n.bindFramebuffer(t.DRAW_FRAMEBUFFER, Me.__webglMultisampledFramebuffer);
      } else if (C.depthBuffer && C.resolveDepthBuffer === !1 && l) {
        const S = C.stencilBuffer ? t.DEPTH_STENCIL_ATTACHMENT : t.DEPTH_ATTACHMENT;
        t.invalidateFramebuffer(t.DRAW_FRAMEBUFFER, [S]);
      }
    }
  }
  function We(C) {
    return Math.min(r.maxSamples, C.samples);
  }
  function Ke(C) {
    const S = i.get(C);
    return C.samples > 0 && e.has("WEBGL_multisampled_render_to_texture") === !0 && S.__useRenderToTexture !== !1;
  }
  function be(C) {
    const S = o.render.frame;
    c.get(C) !== S && (c.set(C, S), C.update());
  }
  function ct(C, S) {
    const F = C.colorSpace, Y = C.format, J = C.type;
    return C.isCompressedTexture === !0 || C.isVideoTexture === !0 || F !== Br && F !== xr && (Je.getTransfer(F) === ot ? (Y !== di || J !== Ji) && console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType.") : console.error("THREE.WebGLTextures: Unsupported texture color space:", F)), S;
  }
  function De(C) {
    return typeof HTMLImageElement < "u" && C instanceof HTMLImageElement ? (u.width = C.naturalWidth || C.width, u.height = C.naturalHeight || C.height) : typeof VideoFrame < "u" && C instanceof VideoFrame ? (u.width = C.displayWidth, u.height = C.displayHeight) : (u.width = C.width, u.height = C.height), u;
  }
  this.allocateTextureUnit = H, this.resetTextureUnits = w, this.setTexture2D = G, this.setTexture2DArray = Q, this.setTexture3D = V, this.setTextureCube = ne, this.rebindTextures = Ae, this.setupRenderTarget = je, this.updateRenderTargetMipmap = rt, this.updateMultisampleRenderTarget = Cn, this.setupDepthRenderbuffer = Ne, this.setupFrameBufferTexture = te, this.useMultisampledRTT = Ke;
}
function oR(t, e) {
  function n(i, r = xr) {
    let s;
    const o = Je.getTransfer(r);
    if (i === Ji) return t.UNSIGNED_BYTE;
    if (i === Wp) return t.UNSIGNED_SHORT_4_4_4_4;
    if (i === $p) return t.UNSIGNED_SHORT_5_5_5_1;
    if (i === ly) return t.UNSIGNED_INT_5_9_9_9_REV;
    if (i === oy) return t.BYTE;
    if (i === ay) return t.SHORT;
    if (i === Oa) return t.UNSIGNED_SHORT;
    if (i === Gp) return t.INT;
    if (i === vs) return t.UNSIGNED_INT;
    if (i === Wi) return t.FLOAT;
    if (i === Yi) return t.HALF_FLOAT;
    if (i === uy) return t.ALPHA;
    if (i === cy) return t.RGB;
    if (i === di) return t.RGBA;
    if (i === fy) return t.LUMINANCE;
    if (i === dy) return t.LUMINANCE_ALPHA;
    if (i === oo) return t.DEPTH_COMPONENT;
    if (i === So) return t.DEPTH_STENCIL;
    if (i === hy) return t.RED;
    if (i === jp) return t.RED_INTEGER;
    if (i === py) return t.RG;
    if (i === Xp) return t.RG_INTEGER;
    if (i === Yp) return t.RGBA_INTEGER;
    if (i === nu || i === iu || i === ru || i === su)
      if (o === ot)
        if (s = e.get("WEBGL_compressed_texture_s3tc_srgb"), s !== null) {
          if (i === nu) return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;
          if (i === iu) return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;
          if (i === ru) return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;
          if (i === su) return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT;
        } else
          return null;
      else if (s = e.get("WEBGL_compressed_texture_s3tc"), s !== null) {
        if (i === nu) return s.COMPRESSED_RGB_S3TC_DXT1_EXT;
        if (i === iu) return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;
        if (i === ru) return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;
        if (i === su) return s.COMPRESSED_RGBA_S3TC_DXT5_EXT;
      } else
        return null;
    if (i === ah || i === lh || i === uh || i === ch)
      if (s = e.get("WEBGL_compressed_texture_pvrtc"), s !== null) {
        if (i === ah) return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;
        if (i === lh) return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;
        if (i === uh) return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;
        if (i === ch) return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG;
      } else
        return null;
    if (i === fh || i === dh || i === hh)
      if (s = e.get("WEBGL_compressed_texture_etc"), s !== null) {
        if (i === fh || i === dh) return o === ot ? s.COMPRESSED_SRGB8_ETC2 : s.COMPRESSED_RGB8_ETC2;
        if (i === hh) return o === ot ? s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC : s.COMPRESSED_RGBA8_ETC2_EAC;
      } else
        return null;
    if (i === ph || i === mh || i === gh || i === vh || i === _h || i === xh || i === yh || i === Sh || i === Mh || i === Eh || i === wh || i === Th || i === Ch || i === Ah)
      if (s = e.get("WEBGL_compressed_texture_astc"), s !== null) {
        if (i === ph) return o === ot ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR : s.COMPRESSED_RGBA_ASTC_4x4_KHR;
        if (i === mh) return o === ot ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR : s.COMPRESSED_RGBA_ASTC_5x4_KHR;
        if (i === gh) return o === ot ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR : s.COMPRESSED_RGBA_ASTC_5x5_KHR;
        if (i === vh) return o === ot ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR : s.COMPRESSED_RGBA_ASTC_6x5_KHR;
        if (i === _h) return o === ot ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR : s.COMPRESSED_RGBA_ASTC_6x6_KHR;
        if (i === xh) return o === ot ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR : s.COMPRESSED_RGBA_ASTC_8x5_KHR;
        if (i === yh) return o === ot ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR : s.COMPRESSED_RGBA_ASTC_8x6_KHR;
        if (i === Sh) return o === ot ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR : s.COMPRESSED_RGBA_ASTC_8x8_KHR;
        if (i === Mh) return o === ot ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR : s.COMPRESSED_RGBA_ASTC_10x5_KHR;
        if (i === Eh) return o === ot ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR : s.COMPRESSED_RGBA_ASTC_10x6_KHR;
        if (i === wh) return o === ot ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR : s.COMPRESSED_RGBA_ASTC_10x8_KHR;
        if (i === Th) return o === ot ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR : s.COMPRESSED_RGBA_ASTC_10x10_KHR;
        if (i === Ch) return o === ot ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR : s.COMPRESSED_RGBA_ASTC_12x10_KHR;
        if (i === Ah) return o === ot ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR : s.COMPRESSED_RGBA_ASTC_12x12_KHR;
      } else
        return null;
    if (i === ou || i === Rh || i === bh)
      if (s = e.get("EXT_texture_compression_bptc"), s !== null) {
        if (i === ou) return o === ot ? s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT : s.COMPRESSED_RGBA_BPTC_UNORM_EXT;
        if (i === Rh) return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;
        if (i === bh) return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT;
      } else
        return null;
    if (i === my || i === Ph || i === Lh || i === Dh)
      if (s = e.get("EXT_texture_compression_rgtc"), s !== null) {
        if (i === ou) return s.COMPRESSED_RED_RGTC1_EXT;
        if (i === Ph) return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;
        if (i === Lh) return s.COMPRESSED_RED_GREEN_RGTC2_EXT;
        if (i === Dh) return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT;
      } else
        return null;
    return i === yo ? t.UNSIGNED_INT_24_8 : t[i] !== void 0 ? t[i] : null;
  }
  return { convert: n };
}
class aR extends On {
  constructor(e = []) {
    super(), this.isArrayCamera = !0, this.cameras = e;
  }
}
class Bl extends Nt {
  constructor() {
    super(), this.isGroup = !0, this.type = "Group";
  }
}
const lR = { type: "move" };
class Wf {
  constructor() {
    this._targetRay = null, this._grip = null, this._hand = null;
  }
  getHandSpace() {
    return this._hand === null && (this._hand = new Bl(), this._hand.matrixAutoUpdate = !1, this._hand.visible = !1, this._hand.joints = {}, this._hand.inputState = { pinching: !1 }), this._hand;
  }
  getTargetRaySpace() {
    return this._targetRay === null && (this._targetRay = new Bl(), this._targetRay.matrixAutoUpdate = !1, this._targetRay.visible = !1, this._targetRay.hasLinearVelocity = !1, this._targetRay.linearVelocity = new k(), this._targetRay.hasAngularVelocity = !1, this._targetRay.angularVelocity = new k()), this._targetRay;
  }
  getGripSpace() {
    return this._grip === null && (this._grip = new Bl(), this._grip.matrixAutoUpdate = !1, this._grip.visible = !1, this._grip.hasLinearVelocity = !1, this._grip.linearVelocity = new k(), this._grip.hasAngularVelocity = !1, this._grip.angularVelocity = new k()), this._grip;
  }
  dispatchEvent(e) {
    return this._targetRay !== null && this._targetRay.dispatchEvent(e), this._grip !== null && this._grip.dispatchEvent(e), this._hand !== null && this._hand.dispatchEvent(e), this;
  }
  connect(e) {
    if (e && e.hand) {
      const n = this._hand;
      if (n)
        for (const i of e.hand.values())
          this._getHandJoint(n, i);
    }
    return this.dispatchEvent({ type: "connected", data: e }), this;
  }
  disconnect(e) {
    return this.dispatchEvent({ type: "disconnected", data: e }), this._targetRay !== null && (this._targetRay.visible = !1), this._grip !== null && (this._grip.visible = !1), this._hand !== null && (this._hand.visible = !1), this;
  }
  update(e, n, i) {
    let r = null, s = null, o = null;
    const a = this._targetRay, l = this._grip, u = this._hand;
    if (e && n.session.visibilityState !== "visible-blurred") {
      if (u && e.hand) {
        o = !0;
        for (const y of e.hand.values()) {
          const m = n.getJointPose(y, i), f = this._getHandJoint(u, y);
          m !== null && (f.matrix.fromArray(m.transform.matrix), f.matrix.decompose(f.position, f.rotation, f.scale), f.matrixWorldNeedsUpdate = !0, f.jointRadius = m.radius), f.visible = m !== null;
        }
        const c = u.joints["index-finger-tip"], d = u.joints["thumb-tip"], h = c.position.distanceTo(d.position), p = 0.02, _ = 5e-3;
        u.inputState.pinching && h > p + _ ? (u.inputState.pinching = !1, this.dispatchEvent({
          type: "pinchend",
          handedness: e.handedness,
          target: this
        })) : !u.inputState.pinching && h <= p - _ && (u.inputState.pinching = !0, this.dispatchEvent({
          type: "pinchstart",
          handedness: e.handedness,
          target: this
        }));
      } else
        l !== null && e.gripSpace && (s = n.getPose(e.gripSpace, i), s !== null && (l.matrix.fromArray(s.transform.matrix), l.matrix.decompose(l.position, l.rotation, l.scale), l.matrixWorldNeedsUpdate = !0, s.linearVelocity ? (l.hasLinearVelocity = !0, l.linearVelocity.copy(s.linearVelocity)) : l.hasLinearVelocity = !1, s.angularVelocity ? (l.hasAngularVelocity = !0, l.angularVelocity.copy(s.angularVelocity)) : l.hasAngularVelocity = !1));
      a !== null && (r = n.getPose(e.targetRaySpace, i), r === null && s !== null && (r = s), r !== null && (a.matrix.fromArray(r.transform.matrix), a.matrix.decompose(a.position, a.rotation, a.scale), a.matrixWorldNeedsUpdate = !0, r.linearVelocity ? (a.hasLinearVelocity = !0, a.linearVelocity.copy(r.linearVelocity)) : a.hasLinearVelocity = !1, r.angularVelocity ? (a.hasAngularVelocity = !0, a.angularVelocity.copy(r.angularVelocity)) : a.hasAngularVelocity = !1, this.dispatchEvent(lR)));
    }
    return a !== null && (a.visible = r !== null), l !== null && (l.visible = s !== null), u !== null && (u.visible = o !== null), this;
  }
  // private method
  _getHandJoint(e, n) {
    if (e.joints[n.jointName] === void 0) {
      const i = new Bl();
      i.matrixAutoUpdate = !1, i.visible = !1, e.joints[n.jointName] = i, e.add(i);
    }
    return e.joints[n.jointName];
  }
}
const uR = `
void main() {

	gl_Position = vec4( position, 1.0 );

}`, cR = `
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;
class fR {
  constructor() {
    this.texture = null, this.mesh = null, this.depthNear = 0, this.depthFar = 0;
  }
  init(e, n, i) {
    if (this.texture === null) {
      const r = new ln(), s = e.properties.get(r);
      s.__webglTexture = n.texture, (n.depthNear != i.depthNear || n.depthFar != i.depthFar) && (this.depthNear = n.depthNear, this.depthFar = n.depthFar), this.texture = r;
    }
  }
  getMesh(e) {
    if (this.texture !== null && this.mesh === null) {
      const n = e.cameras[0].viewport, i = new on({
        vertexShader: uR,
        fragmentShader: cR,
        uniforms: {
          depthColor: { value: this.texture },
          depthWidth: { value: n.z },
          depthHeight: { value: n.w }
        }
      });
      this.mesh = new Sn(new Eo(20, 20), i);
    }
    return this.mesh;
  }
  reset() {
    this.texture = null, this.mesh = null;
  }
  getDepthTexture() {
    return this.texture;
  }
}
class dR extends Po {
  constructor(e, n) {
    super();
    const i = this;
    let r = null, s = 1, o = null, a = "local-floor", l = 1, u = null, c = null, d = null, h = null, p = null, _ = null;
    const y = new fR(), m = n.getContextAttributes();
    let f = null, v = null;
    const g = [], M = [], b = new Ie();
    let A = null;
    const T = new On();
    T.layers.enable(1), T.viewport = new St();
    const R = new On();
    R.layers.enable(2), R.viewport = new St();
    const j = [T, R], x = new aR();
    x.layers.enable(1), x.layers.enable(2);
    let w = null, H = null;
    this.cameraAutoUpdate = !0, this.enabled = !1, this.isPresenting = !1, this.getController = function($) {
      let te = g[$];
      return te === void 0 && (te = new Wf(), g[$] = te), te.getTargetRaySpace();
    }, this.getControllerGrip = function($) {
      let te = g[$];
      return te === void 0 && (te = new Wf(), g[$] = te), te.getGripSpace();
    }, this.getHand = function($) {
      let te = g[$];
      return te === void 0 && (te = new Wf(), g[$] = te), te.getHandSpace();
    };
    function B($) {
      const te = M.indexOf($.inputSource);
      if (te === -1)
        return;
      const de = g[te];
      de !== void 0 && (de.update($.inputSource, $.frame, u || o), de.dispatchEvent({ type: $.type, data: $.inputSource }));
    }
    function G() {
      r.removeEventListener("select", B), r.removeEventListener("selectstart", B), r.removeEventListener("selectend", B), r.removeEventListener("squeeze", B), r.removeEventListener("squeezestart", B), r.removeEventListener("squeezeend", B), r.removeEventListener("end", G), r.removeEventListener("inputsourceschange", Q);
      for (let $ = 0; $ < g.length; $++) {
        const te = M[$];
        te !== null && (M[$] = null, g[$].disconnect(te));
      }
      w = null, H = null, y.reset(), e.setRenderTarget(f), p = null, h = null, d = null, r = null, v = null, Ge.stop(), i.isPresenting = !1, e.setPixelRatio(A), e.setSize(b.width, b.height, !1), i.dispatchEvent({ type: "sessionend" });
    }
    this.setFramebufferScaleFactor = function($) {
      s = $, i.isPresenting === !0 && console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.");
    }, this.setReferenceSpaceType = function($) {
      a = $, i.isPresenting === !0 && console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.");
    }, this.getReferenceSpace = function() {
      return u || o;
    }, this.setReferenceSpace = function($) {
      u = $;
    }, this.getBaseLayer = function() {
      return h !== null ? h : p;
    }, this.getBinding = function() {
      return d;
    }, this.getFrame = function() {
      return _;
    }, this.getSession = function() {
      return r;
    }, this.setSession = async function($) {
      if (r = $, r !== null) {
        if (f = e.getRenderTarget(), r.addEventListener("select", B), r.addEventListener("selectstart", B), r.addEventListener("selectend", B), r.addEventListener("squeeze", B), r.addEventListener("squeezestart", B), r.addEventListener("squeezeend", B), r.addEventListener("end", G), r.addEventListener("inputsourceschange", Q), m.xrCompatible !== !0 && await n.makeXRCompatible(), A = e.getPixelRatio(), e.getSize(b), r.renderState.layers === void 0) {
          const te = {
            antialias: m.antialias,
            alpha: !0,
            depth: m.depth,
            stencil: m.stencil,
            framebufferScaleFactor: s
          };
          p = new XRWebGLLayer(r, n, te), r.updateRenderState({ baseLayer: p }), e.setPixelRatio(1), e.setSize(p.framebufferWidth, p.framebufferHeight, !1), v = new mi(
            p.framebufferWidth,
            p.framebufferHeight,
            {
              format: di,
              type: Ji,
              colorSpace: e.outputColorSpace,
              stencilBuffer: m.stencil
            }
          );
        } else {
          let te = null, de = null, ue = null;
          m.depth && (ue = m.stencil ? n.DEPTH24_STENCIL8 : n.DEPTH_COMPONENT24, te = m.stencil ? So : oo, de = m.stencil ? yo : vs);
          const Ne = {
            colorFormat: n.RGBA8,
            depthFormat: ue,
            scaleFactor: s
          };
          d = new XRWebGLBinding(r, n), h = d.createProjectionLayer(Ne), r.updateRenderState({ layers: [h] }), e.setPixelRatio(1), e.setSize(h.textureWidth, h.textureHeight, !1), v = new mi(
            h.textureWidth,
            h.textureHeight,
            {
              format: di,
              type: Ji,
              depthTexture: new by(h.textureWidth, h.textureHeight, de, void 0, void 0, void 0, void 0, void 0, void 0, te),
              stencilBuffer: m.stencil,
              colorSpace: e.outputColorSpace,
              samples: m.antialias ? 4 : 0,
              resolveDepthBuffer: h.ignoreDepthValues === !1
            }
          );
        }
        v.isXRRenderTarget = !0, this.setFoveation(l), u = null, o = await r.requestReferenceSpace(a), Ge.setContext(r), Ge.start(), i.isPresenting = !0, i.dispatchEvent({ type: "sessionstart" });
      }
    }, this.getEnvironmentBlendMode = function() {
      if (r !== null)
        return r.environmentBlendMode;
    }, this.getDepthTexture = function() {
      return y.getDepthTexture();
    };
    function Q($) {
      for (let te = 0; te < $.removed.length; te++) {
        const de = $.removed[te], ue = M.indexOf(de);
        ue >= 0 && (M[ue] = null, g[ue].disconnect(de));
      }
      for (let te = 0; te < $.added.length; te++) {
        const de = $.added[te];
        let ue = M.indexOf(de);
        if (ue === -1) {
          for (let Ae = 0; Ae < g.length; Ae++)
            if (Ae >= M.length) {
              M.push(de), ue = Ae;
              break;
            } else if (M[Ae] === null) {
              M[Ae] = de, ue = Ae;
              break;
            }
          if (ue === -1) break;
        }
        const Ne = g[ue];
        Ne && Ne.connect(de);
      }
    }
    const V = new k(), ne = new k();
    function L($, te, de) {
      V.setFromMatrixPosition(te.matrixWorld), ne.setFromMatrixPosition(de.matrixWorld);
      const ue = V.distanceTo(ne), Ne = te.projectionMatrix.elements, Ae = de.projectionMatrix.elements, je = Ne[14] / (Ne[10] - 1), rt = Ne[14] / (Ne[10] + 1), Xe = (Ne[9] + 1) / Ne[5], P = (Ne[9] - 1) / Ne[5], Cn = (Ne[8] - 1) / Ne[0], We = (Ae[8] + 1) / Ae[0], Ke = je * Cn, be = je * We, ct = ue / (-Cn + We), De = ct * -Cn;
      if (te.matrixWorld.decompose($.position, $.quaternion, $.scale), $.translateX(De), $.translateZ(ct), $.matrixWorld.compose($.position, $.quaternion, $.scale), $.matrixWorldInverse.copy($.matrixWorld).invert(), Ne[10] === -1)
        $.projectionMatrix.copy(te.projectionMatrix), $.projectionMatrixInverse.copy(te.projectionMatrixInverse);
      else {
        const C = je + ct, S = rt + ct, F = Ke - De, Y = be + (ue - De), J = Xe * rt / S * C, X = P * rt / S * C;
        $.projectionMatrix.makePerspective(F, Y, J, X, C, S), $.projectionMatrixInverse.copy($.projectionMatrix).invert();
      }
    }
    function q($, te) {
      te === null ? $.matrixWorld.copy($.matrix) : $.matrixWorld.multiplyMatrices(te.matrixWorld, $.matrix), $.matrixWorldInverse.copy($.matrixWorld).invert();
    }
    this.updateCamera = function($) {
      if (r === null) return;
      let te = $.near, de = $.far;
      y.texture !== null && (y.depthNear > 0 && (te = y.depthNear), y.depthFar > 0 && (de = y.depthFar)), x.near = R.near = T.near = te, x.far = R.far = T.far = de, (w !== x.near || H !== x.far) && (r.updateRenderState({
        depthNear: x.near,
        depthFar: x.far
      }), w = x.near, H = x.far);
      const ue = $.parent, Ne = x.cameras;
      q(x, ue);
      for (let Ae = 0; Ae < Ne.length; Ae++)
        q(Ne[Ae], ue);
      Ne.length === 2 ? L(x, T, R) : x.projectionMatrix.copy(T.projectionMatrix), Z($, x, ue);
    };
    function Z($, te, de) {
      de === null ? $.matrix.copy(te.matrixWorld) : ($.matrix.copy(de.matrixWorld), $.matrix.invert(), $.matrix.multiply(te.matrixWorld)), $.matrix.decompose($.position, $.quaternion, $.scale), $.updateMatrixWorld(!0), $.projectionMatrix.copy(te.projectionMatrix), $.projectionMatrixInverse.copy(te.projectionMatrixInverse), $.isPerspectiveCamera && ($.fov = Xu * 2 * Math.atan(1 / $.projectionMatrix.elements[5]), $.zoom = 1);
    }
    this.getCamera = function() {
      return x;
    }, this.getFoveation = function() {
      if (!(h === null && p === null))
        return l;
    }, this.setFoveation = function($) {
      l = $, h !== null && (h.fixedFoveation = $), p !== null && p.fixedFoveation !== void 0 && (p.fixedFoveation = $);
    }, this.hasDepthSensing = function() {
      return y.texture !== null;
    }, this.getDepthSensingMesh = function() {
      return y.getMesh(x);
    };
    let se = null;
    function Te($, te) {
      if (c = te.getViewerPose(u || o), _ = te, c !== null) {
        const de = c.views;
        p !== null && (e.setRenderTargetFramebuffer(v, p.framebuffer), e.setRenderTarget(v));
        let ue = !1;
        de.length !== x.cameras.length && (x.cameras.length = 0, ue = !0);
        for (let Ae = 0; Ae < de.length; Ae++) {
          const je = de[Ae];
          let rt = null;
          if (p !== null)
            rt = p.getViewport(je);
          else {
            const P = d.getViewSubImage(h, je);
            rt = P.viewport, Ae === 0 && (e.setRenderTargetTextures(
              v,
              P.colorTexture,
              h.ignoreDepthValues ? void 0 : P.depthStencilTexture
            ), e.setRenderTarget(v));
          }
          let Xe = j[Ae];
          Xe === void 0 && (Xe = new On(), Xe.layers.enable(Ae), Xe.viewport = new St(), j[Ae] = Xe), Xe.matrix.fromArray(je.transform.matrix), Xe.matrix.decompose(Xe.position, Xe.quaternion, Xe.scale), Xe.projectionMatrix.fromArray(je.projectionMatrix), Xe.projectionMatrixInverse.copy(Xe.projectionMatrix).invert(), Xe.viewport.set(rt.x, rt.y, rt.width, rt.height), Ae === 0 && (x.matrix.copy(Xe.matrix), x.matrix.decompose(x.position, x.quaternion, x.scale)), ue === !0 && x.cameras.push(Xe);
        }
        const Ne = r.enabledFeatures;
        if (Ne && Ne.includes("depth-sensing")) {
          const Ae = d.getDepthInformation(de[0]);
          Ae && Ae.isValid && Ae.texture && y.init(e, Ae, r.renderState);
        }
      }
      for (let de = 0; de < g.length; de++) {
        const ue = M[de], Ne = g[de];
        ue !== null && Ne !== void 0 && Ne.update(ue, te, u || o);
      }
      se && se($, te), te.detectedPlanes && i.dispatchEvent({ type: "planesdetected", data: te }), _ = null;
    }
    const Ge = new Ry();
    Ge.setAnimationLoop(Te), this.setAnimationLoop = function($) {
      se = $;
    }, this.dispose = function() {
    };
  }
}
const jr = /* @__PURE__ */ new Ri(), hR = /* @__PURE__ */ new Mt();
function pR(t, e) {
  function n(m, f) {
    m.matrixAutoUpdate === !0 && m.updateMatrix(), f.value.copy(m.matrix);
  }
  function i(m, f) {
    f.color.getRGB(m.fogColor.value, Ty(t)), f.isFog ? (m.fogNear.value = f.near, m.fogFar.value = f.far) : f.isFogExp2 && (m.fogDensity.value = f.density);
  }
  function r(m, f, v, g, M) {
    f.isMeshBasicMaterial || f.isMeshLambertMaterial ? s(m, f) : f.isMeshToonMaterial ? (s(m, f), d(m, f)) : f.isMeshPhongMaterial ? (s(m, f), c(m, f)) : f.isMeshStandardMaterial ? (s(m, f), h(m, f), f.isMeshPhysicalMaterial && p(m, f, M)) : f.isMeshMatcapMaterial ? (s(m, f), _(m, f)) : f.isMeshDepthMaterial ? s(m, f) : f.isMeshDistanceMaterial ? (s(m, f), y(m, f)) : f.isMeshNormalMaterial ? s(m, f) : f.isLineBasicMaterial ? (o(m, f), f.isLineDashedMaterial && a(m, f)) : f.isPointsMaterial ? l(m, f, v, g) : f.isSpriteMaterial ? u(m, f) : f.isShadowMaterial ? (m.color.value.copy(f.color), m.opacity.value = f.opacity) : f.isShaderMaterial && (f.uniformsNeedUpdate = !1);
  }
  function s(m, f) {
    m.opacity.value = f.opacity, f.color && m.diffuse.value.copy(f.color), f.emissive && m.emissive.value.copy(f.emissive).multiplyScalar(f.emissiveIntensity), f.map && (m.map.value = f.map, n(f.map, m.mapTransform)), f.alphaMap && (m.alphaMap.value = f.alphaMap, n(f.alphaMap, m.alphaMapTransform)), f.bumpMap && (m.bumpMap.value = f.bumpMap, n(f.bumpMap, m.bumpMapTransform), m.bumpScale.value = f.bumpScale, f.side === Tn && (m.bumpScale.value *= -1)), f.normalMap && (m.normalMap.value = f.normalMap, n(f.normalMap, m.normalMapTransform), m.normalScale.value.copy(f.normalScale), f.side === Tn && m.normalScale.value.negate()), f.displacementMap && (m.displacementMap.value = f.displacementMap, n(f.displacementMap, m.displacementMapTransform), m.displacementScale.value = f.displacementScale, m.displacementBias.value = f.displacementBias), f.emissiveMap && (m.emissiveMap.value = f.emissiveMap, n(f.emissiveMap, m.emissiveMapTransform)), f.specularMap && (m.specularMap.value = f.specularMap, n(f.specularMap, m.specularMapTransform)), f.alphaTest > 0 && (m.alphaTest.value = f.alphaTest);
    const v = e.get(f), g = v.envMap, M = v.envMapRotation;
    g && (m.envMap.value = g, jr.copy(M), jr.x *= -1, jr.y *= -1, jr.z *= -1, g.isCubeTexture && g.isRenderTargetTexture === !1 && (jr.y *= -1, jr.z *= -1), m.envMapRotation.value.setFromMatrix4(hR.makeRotationFromEuler(jr)), m.flipEnvMap.value = g.isCubeTexture && g.isRenderTargetTexture === !1 ? -1 : 1, m.reflectivity.value = f.reflectivity, m.ior.value = f.ior, m.refractionRatio.value = f.refractionRatio), f.lightMap && (m.lightMap.value = f.lightMap, m.lightMapIntensity.value = f.lightMapIntensity, n(f.lightMap, m.lightMapTransform)), f.aoMap && (m.aoMap.value = f.aoMap, m.aoMapIntensity.value = f.aoMapIntensity, n(f.aoMap, m.aoMapTransform));
  }
  function o(m, f) {
    m.diffuse.value.copy(f.color), m.opacity.value = f.opacity, f.map && (m.map.value = f.map, n(f.map, m.mapTransform));
  }
  function a(m, f) {
    m.dashSize.value = f.dashSize, m.totalSize.value = f.dashSize + f.gapSize, m.scale.value = f.scale;
  }
  function l(m, f, v, g) {
    m.diffuse.value.copy(f.color), m.opacity.value = f.opacity, m.size.value = f.size * v, m.scale.value = g * 0.5, f.map && (m.map.value = f.map, n(f.map, m.uvTransform)), f.alphaMap && (m.alphaMap.value = f.alphaMap, n(f.alphaMap, m.alphaMapTransform)), f.alphaTest > 0 && (m.alphaTest.value = f.alphaTest);
  }
  function u(m, f) {
    m.diffuse.value.copy(f.color), m.opacity.value = f.opacity, m.rotation.value = f.rotation, f.map && (m.map.value = f.map, n(f.map, m.mapTransform)), f.alphaMap && (m.alphaMap.value = f.alphaMap, n(f.alphaMap, m.alphaMapTransform)), f.alphaTest > 0 && (m.alphaTest.value = f.alphaTest);
  }
  function c(m, f) {
    m.specular.value.copy(f.specular), m.shininess.value = Math.max(f.shininess, 1e-4);
  }
  function d(m, f) {
    f.gradientMap && (m.gradientMap.value = f.gradientMap);
  }
  function h(m, f) {
    m.metalness.value = f.metalness, f.metalnessMap && (m.metalnessMap.value = f.metalnessMap, n(f.metalnessMap, m.metalnessMapTransform)), m.roughness.value = f.roughness, f.roughnessMap && (m.roughnessMap.value = f.roughnessMap, n(f.roughnessMap, m.roughnessMapTransform)), f.envMap && (m.envMapIntensity.value = f.envMapIntensity);
  }
  function p(m, f, v) {
    m.ior.value = f.ior, f.sheen > 0 && (m.sheenColor.value.copy(f.sheenColor).multiplyScalar(f.sheen), m.sheenRoughness.value = f.sheenRoughness, f.sheenColorMap && (m.sheenColorMap.value = f.sheenColorMap, n(f.sheenColorMap, m.sheenColorMapTransform)), f.sheenRoughnessMap && (m.sheenRoughnessMap.value = f.sheenRoughnessMap, n(f.sheenRoughnessMap, m.sheenRoughnessMapTransform))), f.clearcoat > 0 && (m.clearcoat.value = f.clearcoat, m.clearcoatRoughness.value = f.clearcoatRoughness, f.clearcoatMap && (m.clearcoatMap.value = f.clearcoatMap, n(f.clearcoatMap, m.clearcoatMapTransform)), f.clearcoatRoughnessMap && (m.clearcoatRoughnessMap.value = f.clearcoatRoughnessMap, n(f.clearcoatRoughnessMap, m.clearcoatRoughnessMapTransform)), f.clearcoatNormalMap && (m.clearcoatNormalMap.value = f.clearcoatNormalMap, n(f.clearcoatNormalMap, m.clearcoatNormalMapTransform), m.clearcoatNormalScale.value.copy(f.clearcoatNormalScale), f.side === Tn && m.clearcoatNormalScale.value.negate())), f.dispersion > 0 && (m.dispersion.value = f.dispersion), f.iridescence > 0 && (m.iridescence.value = f.iridescence, m.iridescenceIOR.value = f.iridescenceIOR, m.iridescenceThicknessMinimum.value = f.iridescenceThicknessRange[0], m.iridescenceThicknessMaximum.value = f.iridescenceThicknessRange[1], f.iridescenceMap && (m.iridescenceMap.value = f.iridescenceMap, n(f.iridescenceMap, m.iridescenceMapTransform)), f.iridescenceThicknessMap && (m.iridescenceThicknessMap.value = f.iridescenceThicknessMap, n(f.iridescenceThicknessMap, m.iridescenceThicknessMapTransform))), f.transmission > 0 && (m.transmission.value = f.transmission, m.transmissionSamplerMap.value = v.texture, m.transmissionSamplerSize.value.set(v.width, v.height), f.transmissionMap && (m.transmissionMap.value = f.transmissionMap, n(f.transmissionMap, m.transmissionMapTransform)), m.thickness.value = f.thickness, f.thicknessMap && (m.thicknessMap.value = f.thicknessMap, n(f.thicknessMap, m.thicknessMapTransform)), m.attenuationDistance.value = f.attenuationDistance, m.attenuationColor.value.copy(f.attenuationColor)), f.anisotropy > 0 && (m.anisotropyVector.value.set(f.anisotropy * Math.cos(f.anisotropyRotation), f.anisotropy * Math.sin(f.anisotropyRotation)), f.anisotropyMap && (m.anisotropyMap.value = f.anisotropyMap, n(f.anisotropyMap, m.anisotropyMapTransform))), m.specularIntensity.value = f.specularIntensity, m.specularColor.value.copy(f.specularColor), f.specularColorMap && (m.specularColorMap.value = f.specularColorMap, n(f.specularColorMap, m.specularColorMapTransform)), f.specularIntensityMap && (m.specularIntensityMap.value = f.specularIntensityMap, n(f.specularIntensityMap, m.specularIntensityMapTransform));
  }
  function _(m, f) {
    f.matcap && (m.matcap.value = f.matcap);
  }
  function y(m, f) {
    const v = e.get(f).light;
    m.referencePosition.value.setFromMatrixPosition(v.matrixWorld), m.nearDistance.value = v.shadow.camera.near, m.farDistance.value = v.shadow.camera.far;
  }
  return {
    refreshFogUniforms: i,
    refreshMaterialUniforms: r
  };
}
function mR(t, e, n, i) {
  let r = {}, s = {}, o = [];
  const a = t.getParameter(t.MAX_UNIFORM_BUFFER_BINDINGS);
  function l(v, g) {
    const M = g.program;
    i.uniformBlockBinding(v, M);
  }
  function u(v, g) {
    let M = r[v.id];
    M === void 0 && (_(v), M = c(v), r[v.id] = M, v.addEventListener("dispose", m));
    const b = g.program;
    i.updateUBOMapping(v, b);
    const A = e.render.frame;
    s[v.id] !== A && (h(v), s[v.id] = A);
  }
  function c(v) {
    const g = d();
    v.__bindingPointIndex = g;
    const M = t.createBuffer(), b = v.__size, A = v.usage;
    return t.bindBuffer(t.UNIFORM_BUFFER, M), t.bufferData(t.UNIFORM_BUFFER, b, A), t.bindBuffer(t.UNIFORM_BUFFER, null), t.bindBufferBase(t.UNIFORM_BUFFER, g, M), M;
  }
  function d() {
    for (let v = 0; v < a; v++)
      if (o.indexOf(v) === -1)
        return o.push(v), v;
    return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."), 0;
  }
  function h(v) {
    const g = r[v.id], M = v.uniforms, b = v.__cache;
    t.bindBuffer(t.UNIFORM_BUFFER, g);
    for (let A = 0, T = M.length; A < T; A++) {
      const R = Array.isArray(M[A]) ? M[A] : [M[A]];
      for (let j = 0, x = R.length; j < x; j++) {
        const w = R[j];
        if (p(w, A, j, b) === !0) {
          const H = w.__offset, B = Array.isArray(w.value) ? w.value : [w.value];
          let G = 0;
          for (let Q = 0; Q < B.length; Q++) {
            const V = B[Q], ne = y(V);
            typeof V == "number" || typeof V == "boolean" ? (w.__data[0] = V, t.bufferSubData(t.UNIFORM_BUFFER, H + G, w.__data)) : V.isMatrix3 ? (w.__data[0] = V.elements[0], w.__data[1] = V.elements[1], w.__data[2] = V.elements[2], w.__data[3] = 0, w.__data[4] = V.elements[3], w.__data[5] = V.elements[4], w.__data[6] = V.elements[5], w.__data[7] = 0, w.__data[8] = V.elements[6], w.__data[9] = V.elements[7], w.__data[10] = V.elements[8], w.__data[11] = 0) : (V.toArray(w.__data, G), G += ne.storage / Float32Array.BYTES_PER_ELEMENT);
          }
          t.bufferSubData(t.UNIFORM_BUFFER, H, w.__data);
        }
      }
    }
    t.bindBuffer(t.UNIFORM_BUFFER, null);
  }
  function p(v, g, M, b) {
    const A = v.value, T = g + "_" + M;
    if (b[T] === void 0)
      return typeof A == "number" || typeof A == "boolean" ? b[T] = A : b[T] = A.clone(), !0;
    {
      const R = b[T];
      if (typeof A == "number" || typeof A == "boolean") {
        if (R !== A)
          return b[T] = A, !0;
      } else if (R.equals(A) === !1)
        return R.copy(A), !0;
    }
    return !1;
  }
  function _(v) {
    const g = v.uniforms;
    let M = 0;
    const b = 16;
    for (let T = 0, R = g.length; T < R; T++) {
      const j = Array.isArray(g[T]) ? g[T] : [g[T]];
      for (let x = 0, w = j.length; x < w; x++) {
        const H = j[x], B = Array.isArray(H.value) ? H.value : [H.value];
        for (let G = 0, Q = B.length; G < Q; G++) {
          const V = B[G], ne = y(V), L = M % b, q = L % ne.boundary, Z = L + q;
          M += q, Z !== 0 && b - Z < ne.storage && (M += b - Z), H.__data = new Float32Array(ne.storage / Float32Array.BYTES_PER_ELEMENT), H.__offset = M, M += ne.storage;
        }
      }
    }
    const A = M % b;
    return A > 0 && (M += b - A), v.__size = M, v.__cache = {}, this;
  }
  function y(v) {
    const g = {
      boundary: 0,
      // bytes
      storage: 0
      // bytes
    };
    return typeof v == "number" || typeof v == "boolean" ? (g.boundary = 4, g.storage = 4) : v.isVector2 ? (g.boundary = 8, g.storage = 8) : v.isVector3 || v.isColor ? (g.boundary = 16, g.storage = 12) : v.isVector4 ? (g.boundary = 16, g.storage = 16) : v.isMatrix3 ? (g.boundary = 48, g.storage = 48) : v.isMatrix4 ? (g.boundary = 64, g.storage = 64) : v.isTexture ? console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group.") : console.warn("THREE.WebGLRenderer: Unsupported uniform value type.", v), g;
  }
  function m(v) {
    const g = v.target;
    g.removeEventListener("dispose", m);
    const M = o.indexOf(g.__bindingPointIndex);
    o.splice(M, 1), t.deleteBuffer(r[g.id]), delete r[g.id], delete s[g.id];
  }
  function f() {
    for (const v in r)
      t.deleteBuffer(r[v]);
    o = [], r = {}, s = {};
  }
  return {
    bind: l,
    update: u,
    dispose: f
  };
}
class gR {
  constructor(e = {}) {
    const {
      canvas: n = iw(),
      context: i = null,
      depth: r = !0,
      stencil: s = !1,
      alpha: o = !1,
      antialias: a = !1,
      premultipliedAlpha: l = !0,
      preserveDrawingBuffer: u = !1,
      powerPreference: c = "default",
      failIfMajorPerformanceCaveat: d = !1
    } = e;
    this.isWebGLRenderer = !0;
    let h;
    if (i !== null) {
      if (typeof WebGLRenderingContext < "u" && i instanceof WebGLRenderingContext)
        throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");
      h = i.getContextAttributes().alpha;
    } else
      h = o;
    const p = new Uint32Array(4), _ = new Int32Array(4);
    let y = null, m = null;
    const f = [], v = [];
    this.domElement = n, this.debug = {
      /**
       * Enables error checking and reporting when shader programs are being compiled
       * @type {boolean}
       */
      checkShaderErrors: !0,
      /**
       * Callback for custom error reporting.
       * @type {?Function}
       */
      onShaderError: null
    }, this.autoClear = !0, this.autoClearColor = !0, this.autoClearDepth = !0, this.autoClearStencil = !0, this.sortObjects = !0, this.clippingPlanes = [], this.localClippingEnabled = !1, this._outputColorSpace = rn, this.toneMapping = Dr, this.toneMappingExposure = 1;
    const g = this;
    let M = !1, b = 0, A = 0, T = null, R = -1, j = null;
    const x = new St(), w = new St();
    let H = null;
    const B = new Ve(0);
    let G = 0, Q = n.width, V = n.height, ne = 1, L = null, q = null;
    const Z = new St(0, 0, Q, V), se = new St(0, 0, Q, V);
    let Te = !1;
    const Ge = new Qp();
    let $ = !1, te = !1;
    const de = new Mt(), ue = new Mt(), Ne = new k(), Ae = new St(), je = { background: null, fog: null, environment: null, overrideMaterial: null, isScene: !0 };
    let rt = !1;
    function Xe() {
      return T === null ? ne : 1;
    }
    let P = i;
    function Cn(E, I) {
      return n.getContext(E, I);
    }
    try {
      const E = {
        alpha: !0,
        depth: r,
        stencil: s,
        antialias: a,
        premultipliedAlpha: l,
        preserveDrawingBuffer: u,
        powerPreference: c,
        failIfMajorPerformanceCaveat: d
      };
      if ("setAttribute" in n && n.setAttribute("data-engine", `three.js r${Hp}`), n.addEventListener("webglcontextlost", K, !1), n.addEventListener("webglcontextrestored", ce, !1), n.addEventListener("webglcontextcreationerror", pe, !1), P === null) {
        const I = "webgl2";
        if (P = Cn(I, E), P === null)
          throw Cn(I) ? new Error("Error creating WebGL context with your selected attributes.") : new Error("Error creating WebGL context.");
      }
    } catch (E) {
      throw console.error("THREE.WebGLRenderer: " + E.message), E;
    }
    let We, Ke, be, ct, De, C, S, F, Y, J, X, Me, le, ge, Ze, ie, ve, Pe, Le, _e, $e, Ue, st, D;
    function he() {
      We = new SA(P), We.init(), Ue = new oR(P, We), Ke = new mA(P, We, e, Ue), be = new iR(P), Ke.reverseDepthBuffer && be.buffers.depth.setReversed(!0), ct = new wA(P), De = new V2(), C = new sR(P, We, be, De, Ke, Ue, ct), S = new vA(g), F = new yA(g), Y = new Lw(P), st = new hA(P, Y), J = new MA(P, Y, ct, st), X = new CA(P, J, Y, ct), Le = new TA(P, Ke, C), ie = new gA(De), Me = new H2(g, S, F, We, Ke, st, ie), le = new pR(g, De), ge = new W2(), Ze = new K2(We), Pe = new dA(g, S, F, be, X, h, l), ve = new tR(g, X, Ke), D = new mR(P, ct, Ke, be), _e = new pA(P, We, ct), $e = new EA(P, We, ct), ct.programs = Me.programs, g.capabilities = Ke, g.extensions = We, g.properties = De, g.renderLists = ge, g.shadowMap = ve, g.state = be, g.info = ct;
    }
    he();
    const W = new dR(g, P);
    this.xr = W, this.getContext = function() {
      return P;
    }, this.getContextAttributes = function() {
      return P.getContextAttributes();
    }, this.forceContextLoss = function() {
      const E = We.get("WEBGL_lose_context");
      E && E.loseContext();
    }, this.forceContextRestore = function() {
      const E = We.get("WEBGL_lose_context");
      E && E.restoreContext();
    }, this.getPixelRatio = function() {
      return ne;
    }, this.setPixelRatio = function(E) {
      E !== void 0 && (ne = E, this.setSize(Q, V, !1));
    }, this.getSize = function(E) {
      return E.set(Q, V);
    }, this.setSize = function(E, I, O = !0) {
      if (W.isPresenting) {
        console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");
        return;
      }
      Q = E, V = I, n.width = Math.floor(E * ne), n.height = Math.floor(I * ne), O === !0 && (n.style.width = E + "px", n.style.height = I + "px"), this.setViewport(0, 0, E, I);
    }, this.getDrawingBufferSize = function(E) {
      return E.set(Q * ne, V * ne).floor();
    }, this.setDrawingBufferSize = function(E, I, O) {
      Q = E, V = I, ne = O, n.width = Math.floor(E * O), n.height = Math.floor(I * O), this.setViewport(0, 0, E, I);
    }, this.getCurrentViewport = function(E) {
      return E.copy(x);
    }, this.getViewport = function(E) {
      return E.copy(Z);
    }, this.setViewport = function(E, I, O, z) {
      E.isVector4 ? Z.set(E.x, E.y, E.z, E.w) : Z.set(E, I, O, z), be.viewport(x.copy(Z).multiplyScalar(ne).round());
    }, this.getScissor = function(E) {
      return E.copy(se);
    }, this.setScissor = function(E, I, O, z) {
      E.isVector4 ? se.set(E.x, E.y, E.z, E.w) : se.set(E, I, O, z), be.scissor(w.copy(se).multiplyScalar(ne).round());
    }, this.getScissorTest = function() {
      return Te;
    }, this.setScissorTest = function(E) {
      be.setScissorTest(Te = E);
    }, this.setOpaqueSort = function(E) {
      L = E;
    }, this.setTransparentSort = function(E) {
      q = E;
    }, this.getClearColor = function(E) {
      return E.copy(Pe.getClearColor());
    }, this.setClearColor = function() {
      Pe.setClearColor.apply(Pe, arguments);
    }, this.getClearAlpha = function() {
      return Pe.getClearAlpha();
    }, this.setClearAlpha = function() {
      Pe.setClearAlpha.apply(Pe, arguments);
    }, this.clear = function(E = !0, I = !0, O = !0) {
      let z = 0;
      if (E) {
        let N = !1;
        if (T !== null) {
          const re = T.texture.format;
          N = re === Yp || re === Xp || re === jp;
        }
        if (N) {
          const re = T.texture.type, fe = re === Ji || re === vs || re === Oa || re === yo || re === Wp || re === $p, xe = Pe.getClearColor(), Se = Pe.getClearAlpha(), Ce = xe.r, Re = xe.g, Ee = xe.b;
          fe ? (p[0] = Ce, p[1] = Re, p[2] = Ee, p[3] = Se, P.clearBufferuiv(P.COLOR, 0, p)) : (_[0] = Ce, _[1] = Re, _[2] = Ee, _[3] = Se, P.clearBufferiv(P.COLOR, 0, _));
        } else
          z |= P.COLOR_BUFFER_BIT;
      }
      I && (z |= P.DEPTH_BUFFER_BIT, P.clearDepth(this.capabilities.reverseDepthBuffer ? 0 : 1)), O && (z |= P.STENCIL_BUFFER_BIT, this.state.buffers.stencil.setMask(4294967295)), P.clear(z);
    }, this.clearColor = function() {
      this.clear(!0, !1, !1);
    }, this.clearDepth = function() {
      this.clear(!1, !0, !1);
    }, this.clearStencil = function() {
      this.clear(!1, !1, !0);
    }, this.dispose = function() {
      n.removeEventListener("webglcontextlost", K, !1), n.removeEventListener("webglcontextrestored", ce, !1), n.removeEventListener("webglcontextcreationerror", pe, !1), ge.dispose(), Ze.dispose(), De.dispose(), S.dispose(), F.dispose(), X.dispose(), st.dispose(), D.dispose(), Me.dispose(), W.dispose(), W.removeEventListener("sessionstart", Mm), W.removeEventListener("sessionend", Em), zr.stop();
    };
    function K(E) {
      E.preventDefault(), console.log("THREE.WebGLRenderer: Context Lost."), M = !0;
    }
    function ce() {
      console.log("THREE.WebGLRenderer: Context Restored."), M = !1;
      const E = ct.autoReset, I = ve.enabled, O = ve.autoUpdate, z = ve.needsUpdate, N = ve.type;
      he(), ct.autoReset = E, ve.enabled = I, ve.autoUpdate = O, ve.needsUpdate = z, ve.type = N;
    }
    function pe(E) {
      console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ", E.statusMessage);
    }
    function Ye(E) {
      const I = E.target;
      I.removeEventListener("dispose", Ye), At(I);
    }
    function At(E) {
      hn(E), De.remove(E);
    }
    function hn(E) {
      const I = De.get(E).programs;
      I !== void 0 && (I.forEach(function(O) {
        Me.releaseProgram(O);
      }), E.isShaderMaterial && Me.releaseShaderCache(E));
    }
    this.renderBufferDirect = function(E, I, O, z, N, re) {
      I === null && (I = je);
      const fe = N.isMesh && N.matrixWorld.determinant() < 0, xe = BS(E, I, O, z, N);
      be.setMaterial(z, fe);
      let Se = O.index, Ce = 1;
      if (z.wireframe === !0) {
        if (Se = J.getWireframeAttribute(O), Se === void 0) return;
        Ce = 2;
      }
      const Re = O.drawRange, Ee = O.attributes.position;
      let nt = Re.start * Ce, ft = (Re.start + Re.count) * Ce;
      re !== null && (nt = Math.max(nt, re.start * Ce), ft = Math.min(ft, (re.start + re.count) * Ce)), Se !== null ? (nt = Math.max(nt, 0), ft = Math.min(ft, Se.count)) : Ee != null && (nt = Math.max(nt, 0), ft = Math.min(ft, Ee.count));
      const xt = ft - nt;
      if (xt < 0 || xt === 1 / 0) return;
      st.setup(N, z, xe, O, Se);
      let An, et = _e;
      if (Se !== null && (An = Y.get(Se), et = $e, et.setIndex(An)), N.isMesh)
        z.wireframe === !0 ? (be.setLineWidth(z.wireframeLinewidth * Xe()), et.setMode(P.LINES)) : et.setMode(P.TRIANGLES);
      else if (N.isLine) {
        let we = z.linewidth;
        we === void 0 && (we = 1), be.setLineWidth(we * Xe()), N.isLineSegments ? et.setMode(P.LINES) : N.isLineLoop ? et.setMode(P.LINE_LOOP) : et.setMode(P.LINE_STRIP);
      } else N.isPoints ? et.setMode(P.POINTS) : N.isSprite && et.setMode(P.TRIANGLES);
      if (N.isBatchedMesh)
        if (N._multiDrawInstances !== null)
          et.renderMultiDrawInstances(N._multiDrawStarts, N._multiDrawCounts, N._multiDrawCount, N._multiDrawInstances);
        else if (We.get("WEBGL_multi_draw"))
          et.renderMultiDraw(N._multiDrawStarts, N._multiDrawCounts, N._multiDrawCount);
        else {
          const we = N._multiDrawStarts, Vt = N._multiDrawCounts, tt = N._multiDrawCount, ni = Se ? Y.get(Se).bytesPerElement : 1, ys = De.get(z).currentProgram.getUniforms();
          for (let Rn = 0; Rn < tt; Rn++)
            ys.setValue(P, "_gl_DrawID", Rn), et.render(we[Rn] / ni, Vt[Rn]);
        }
      else if (N.isInstancedMesh)
        et.renderInstances(nt, xt, N.count);
      else if (O.isInstancedBufferGeometry) {
        const we = O._maxInstanceCount !== void 0 ? O._maxInstanceCount : 1 / 0, Vt = Math.min(O.instanceCount, we);
        et.renderInstances(nt, xt, Vt);
      } else
        et.render(nt, xt);
    };
    function Qe(E, I, O) {
      E.transparent === !0 && E.side === Hi && E.forceSinglePass === !1 ? (E.side = Tn, E.needsUpdate = !0, el(E, I, O), E.side = Ur, E.needsUpdate = !0, el(E, I, O), E.side = Hi) : el(E, I, O);
    }
    this.compile = function(E, I, O = null) {
      O === null && (O = E), m = Ze.get(O), m.init(I), v.push(m), O.traverseVisible(function(N) {
        N.isLight && N.layers.test(I.layers) && (m.pushLight(N), N.castShadow && m.pushShadow(N));
      }), E !== O && E.traverseVisible(function(N) {
        N.isLight && N.layers.test(I.layers) && (m.pushLight(N), N.castShadow && m.pushShadow(N));
      }), m.setupLights();
      const z = /* @__PURE__ */ new Set();
      return E.traverse(function(N) {
        if (!(N.isMesh || N.isPoints || N.isLine || N.isSprite))
          return;
        const re = N.material;
        if (re)
          if (Array.isArray(re))
            for (let fe = 0; fe < re.length; fe++) {
              const xe = re[fe];
              Qe(xe, O, N), z.add(xe);
            }
          else
            Qe(re, O, N), z.add(re);
      }), v.pop(), m = null, z;
    }, this.compileAsync = function(E, I, O = null) {
      const z = this.compile(E, I, O);
      return new Promise((N) => {
        function re() {
          if (z.forEach(function(fe) {
            De.get(fe).currentProgram.isReady() && z.delete(fe);
          }), z.size === 0) {
            N(E);
            return;
          }
          setTimeout(re, 10);
        }
        We.get("KHR_parallel_shader_compile") !== null ? re() : setTimeout(re, 10);
      });
    };
    let pn = null;
    function bi(E) {
      pn && pn(E);
    }
    function Mm() {
      zr.stop();
    }
    function Em() {
      zr.start();
    }
    const zr = new Ry();
    zr.setAnimationLoop(bi), typeof self < "u" && zr.setContext(self), this.setAnimationLoop = function(E) {
      pn = E, W.setAnimationLoop(E), E === null ? zr.stop() : zr.start();
    }, W.addEventListener("sessionstart", Mm), W.addEventListener("sessionend", Em), this.render = function(E, I) {
      if (I !== void 0 && I.isCamera !== !0) {
        console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");
        return;
      }
      if (M === !0) return;
      if (E.matrixWorldAutoUpdate === !0 && E.updateMatrixWorld(), I.parent === null && I.matrixWorldAutoUpdate === !0 && I.updateMatrixWorld(), W.enabled === !0 && W.isPresenting === !0 && (W.cameraAutoUpdate === !0 && W.updateCamera(I), I = W.getCamera()), E.isScene === !0 && E.onBeforeRender(g, E, I, T), m = Ze.get(E, v.length), m.init(I), v.push(m), ue.multiplyMatrices(I.projectionMatrix, I.matrixWorldInverse), Ge.setFromProjectionMatrix(ue), te = this.localClippingEnabled, $ = ie.init(this.clippingPlanes, te), y = ge.get(E, f.length), y.init(), f.push(y), W.enabled === !0 && W.isPresenting === !0) {
        const re = g.xr.getDepthSensingMesh();
        re !== null && Lc(re, I, -1 / 0, g.sortObjects);
      }
      Lc(E, I, 0, g.sortObjects), y.finish(), g.sortObjects === !0 && y.sort(L, q), rt = W.enabled === !1 || W.isPresenting === !1 || W.hasDepthSensing() === !1, rt && Pe.addToRenderList(y, E), this.info.render.frame++, $ === !0 && ie.beginShadows();
      const O = m.state.shadowsArray;
      ve.render(O, E, I), $ === !0 && ie.endShadows(), this.info.autoReset === !0 && this.info.reset();
      const z = y.opaque, N = y.transmissive;
      if (m.setupLights(), I.isArrayCamera) {
        const re = I.cameras;
        if (N.length > 0)
          for (let fe = 0, xe = re.length; fe < xe; fe++) {
            const Se = re[fe];
            Tm(z, N, E, Se);
          }
        rt && Pe.render(E);
        for (let fe = 0, xe = re.length; fe < xe; fe++) {
          const Se = re[fe];
          wm(y, E, Se, Se.viewport);
        }
      } else
        N.length > 0 && Tm(z, N, E, I), rt && Pe.render(E), wm(y, E, I);
      T !== null && (C.updateMultisampleRenderTarget(T), C.updateRenderTargetMipmap(T)), E.isScene === !0 && E.onAfterRender(g, E, I), st.resetDefaultState(), R = -1, j = null, v.pop(), v.length > 0 ? (m = v[v.length - 1], $ === !0 && ie.setGlobalState(g.clippingPlanes, m.state.camera)) : m = null, f.pop(), f.length > 0 ? y = f[f.length - 1] : y = null;
    };
    function Lc(E, I, O, z) {
      if (E.visible === !1) return;
      if (E.layers.test(I.layers)) {
        if (E.isGroup)
          O = E.renderOrder;
        else if (E.isLOD)
          E.autoUpdate === !0 && E.update(I);
        else if (E.isLight)
          m.pushLight(E), E.castShadow && m.pushShadow(E);
        else if (E.isSprite) {
          if (!E.frustumCulled || Ge.intersectsSprite(E)) {
            z && Ae.setFromMatrixPosition(E.matrixWorld).applyMatrix4(ue);
            const fe = X.update(E), xe = E.material;
            xe.visible && y.push(E, fe, xe, O, Ae.z, null);
          }
        } else if ((E.isMesh || E.isLine || E.isPoints) && (!E.frustumCulled || Ge.intersectsObject(E))) {
          const fe = X.update(E), xe = E.material;
          if (z && (E.boundingSphere !== void 0 ? (E.boundingSphere === null && E.computeBoundingSphere(), Ae.copy(E.boundingSphere.center)) : (fe.boundingSphere === null && fe.computeBoundingSphere(), Ae.copy(fe.boundingSphere.center)), Ae.applyMatrix4(E.matrixWorld).applyMatrix4(ue)), Array.isArray(xe)) {
            const Se = fe.groups;
            for (let Ce = 0, Re = Se.length; Ce < Re; Ce++) {
              const Ee = Se[Ce], nt = xe[Ee.materialIndex];
              nt && nt.visible && y.push(E, fe, nt, O, Ae.z, Ee);
            }
          } else xe.visible && y.push(E, fe, xe, O, Ae.z, null);
        }
      }
      const re = E.children;
      for (let fe = 0, xe = re.length; fe < xe; fe++)
        Lc(re[fe], I, O, z);
    }
    function wm(E, I, O, z) {
      const N = E.opaque, re = E.transmissive, fe = E.transparent;
      m.setupLightsView(O), $ === !0 && ie.setGlobalState(g.clippingPlanes, O), z && be.viewport(x.copy(z)), N.length > 0 && Ja(N, I, O), re.length > 0 && Ja(re, I, O), fe.length > 0 && Ja(fe, I, O), be.buffers.depth.setTest(!0), be.buffers.depth.setMask(!0), be.buffers.color.setMask(!0), be.setPolygonOffset(!1);
    }
    function Tm(E, I, O, z) {
      if ((O.isScene === !0 ? O.overrideMaterial : null) !== null)
        return;
      m.state.transmissionRenderTarget[z.id] === void 0 && (m.state.transmissionRenderTarget[z.id] = new mi(1, 1, {
        generateMipmaps: !0,
        type: We.has("EXT_color_buffer_half_float") || We.has("EXT_color_buffer_float") ? Yi : Ji,
        minFilter: as,
        samples: 4,
        stencilBuffer: s,
        resolveDepthBuffer: !1,
        resolveStencilBuffer: !1,
        colorSpace: Je.workingColorSpace
      }));
      const re = m.state.transmissionRenderTarget[z.id], fe = z.viewport || x;
      re.setSize(fe.z, fe.w);
      const xe = g.getRenderTarget();
      g.setRenderTarget(re), g.getClearColor(B), G = g.getClearAlpha(), G < 1 && g.setClearColor(16777215, 0.5), g.clear(), rt && Pe.render(O);
      const Se = g.toneMapping;
      g.toneMapping = Dr;
      const Ce = z.viewport;
      if (z.viewport !== void 0 && (z.viewport = void 0), m.setupLightsView(z), $ === !0 && ie.setGlobalState(g.clippingPlanes, z), Ja(E, O, z), C.updateMultisampleRenderTarget(re), C.updateRenderTargetMipmap(re), We.has("WEBGL_multisampled_render_to_texture") === !1) {
        let Re = !1;
        for (let Ee = 0, nt = I.length; Ee < nt; Ee++) {
          const ft = I[Ee], xt = ft.object, An = ft.geometry, et = ft.material, we = ft.group;
          if (et.side === Hi && xt.layers.test(z.layers)) {
            const Vt = et.side;
            et.side = Tn, et.needsUpdate = !0, Cm(xt, O, z, An, et, we), et.side = Vt, et.needsUpdate = !0, Re = !0;
          }
        }
        Re === !0 && (C.updateMultisampleRenderTarget(re), C.updateRenderTargetMipmap(re));
      }
      g.setRenderTarget(xe), g.setClearColor(B, G), Ce !== void 0 && (z.viewport = Ce), g.toneMapping = Se;
    }
    function Ja(E, I, O) {
      const z = I.isScene === !0 ? I.overrideMaterial : null;
      for (let N = 0, re = E.length; N < re; N++) {
        const fe = E[N], xe = fe.object, Se = fe.geometry, Ce = z === null ? fe.material : z, Re = fe.group;
        xe.layers.test(O.layers) && Cm(xe, I, O, Se, Ce, Re);
      }
    }
    function Cm(E, I, O, z, N, re) {
      E.onBeforeRender(g, I, O, z, N, re), E.modelViewMatrix.multiplyMatrices(O.matrixWorldInverse, E.matrixWorld), E.normalMatrix.getNormalMatrix(E.modelViewMatrix), N.onBeforeRender(g, I, O, z, E, re), N.transparent === !0 && N.side === Hi && N.forceSinglePass === !1 ? (N.side = Tn, N.needsUpdate = !0, g.renderBufferDirect(O, I, z, N, E, re), N.side = Ur, N.needsUpdate = !0, g.renderBufferDirect(O, I, z, N, E, re), N.side = Hi) : g.renderBufferDirect(O, I, z, N, E, re), E.onAfterRender(g, I, O, z, N, re);
    }
    function el(E, I, O) {
      I.isScene !== !0 && (I = je);
      const z = De.get(E), N = m.state.lights, re = m.state.shadowsArray, fe = N.state.version, xe = Me.getParameters(E, N.state, re, I, O), Se = Me.getProgramCacheKey(xe);
      let Ce = z.programs;
      z.environment = E.isMeshStandardMaterial ? I.environment : null, z.fog = I.fog, z.envMap = (E.isMeshStandardMaterial ? F : S).get(E.envMap || z.environment), z.envMapRotation = z.environment !== null && E.envMap === null ? I.environmentRotation : E.envMapRotation, Ce === void 0 && (E.addEventListener("dispose", Ye), Ce = /* @__PURE__ */ new Map(), z.programs = Ce);
      let Re = Ce.get(Se);
      if (Re !== void 0) {
        if (z.currentProgram === Re && z.lightsStateVersion === fe)
          return Rm(E, xe), Re;
      } else
        xe.uniforms = Me.getUniforms(E), E.onBeforeCompile(xe, g), Re = Me.acquireProgram(xe, Se), Ce.set(Se, Re), z.uniforms = xe.uniforms;
      const Ee = z.uniforms;
      return (!E.isShaderMaterial && !E.isRawShaderMaterial || E.clipping === !0) && (Ee.clippingPlanes = ie.uniform), Rm(E, xe), z.needsLights = HS(E), z.lightsStateVersion = fe, z.needsLights && (Ee.ambientLightColor.value = N.state.ambient, Ee.lightProbe.value = N.state.probe, Ee.directionalLights.value = N.state.directional, Ee.directionalLightShadows.value = N.state.directionalShadow, Ee.spotLights.value = N.state.spot, Ee.spotLightShadows.value = N.state.spotShadow, Ee.rectAreaLights.value = N.state.rectArea, Ee.ltc_1.value = N.state.rectAreaLTC1, Ee.ltc_2.value = N.state.rectAreaLTC2, Ee.pointLights.value = N.state.point, Ee.pointLightShadows.value = N.state.pointShadow, Ee.hemisphereLights.value = N.state.hemi, Ee.directionalShadowMap.value = N.state.directionalShadowMap, Ee.directionalShadowMatrix.value = N.state.directionalShadowMatrix, Ee.spotShadowMap.value = N.state.spotShadowMap, Ee.spotLightMatrix.value = N.state.spotLightMatrix, Ee.spotLightMap.value = N.state.spotLightMap, Ee.pointShadowMap.value = N.state.pointShadowMap, Ee.pointShadowMatrix.value = N.state.pointShadowMatrix), z.currentProgram = Re, z.uniformsList = null, Re;
    }
    function Am(E) {
      if (E.uniformsList === null) {
        const I = E.currentProgram.getUniforms();
        E.uniformsList = lu.seqWithValue(I.seq, E.uniforms);
      }
      return E.uniformsList;
    }
    function Rm(E, I) {
      const O = De.get(E);
      O.outputColorSpace = I.outputColorSpace, O.batching = I.batching, O.batchingColor = I.batchingColor, O.instancing = I.instancing, O.instancingColor = I.instancingColor, O.instancingMorph = I.instancingMorph, O.skinning = I.skinning, O.morphTargets = I.morphTargets, O.morphNormals = I.morphNormals, O.morphColors = I.morphColors, O.morphTargetsCount = I.morphTargetsCount, O.numClippingPlanes = I.numClippingPlanes, O.numIntersection = I.numClipIntersection, O.vertexAlphas = I.vertexAlphas, O.vertexTangents = I.vertexTangents, O.toneMapping = I.toneMapping;
    }
    function BS(E, I, O, z, N) {
      I.isScene !== !0 && (I = je), C.resetTextureUnits();
      const re = I.fog, fe = z.isMeshStandardMaterial ? I.environment : null, xe = T === null ? g.outputColorSpace : T.isXRRenderTarget === !0 ? T.texture.colorSpace : Br, Se = (z.isMeshStandardMaterial ? F : S).get(z.envMap || fe), Ce = z.vertexColors === !0 && !!O.attributes.color && O.attributes.color.itemSize === 4, Re = !!O.attributes.tangent && (!!z.normalMap || z.anisotropy > 0), Ee = !!O.morphAttributes.position, nt = !!O.morphAttributes.normal, ft = !!O.morphAttributes.color;
      let xt = Dr;
      z.toneMapped && (T === null || T.isXRRenderTarget === !0) && (xt = g.toneMapping);
      const An = O.morphAttributes.position || O.morphAttributes.normal || O.morphAttributes.color, et = An !== void 0 ? An.length : 0, we = De.get(z), Vt = m.state.lights;
      if ($ === !0 && (te === !0 || E !== j)) {
        const Wn = E === j && z.id === R;
        ie.setState(z, E, Wn);
      }
      let tt = !1;
      z.version === we.__version ? (we.needsLights && we.lightsStateVersion !== Vt.state.version || we.outputColorSpace !== xe || N.isBatchedMesh && we.batching === !1 || !N.isBatchedMesh && we.batching === !0 || N.isBatchedMesh && we.batchingColor === !0 && N.colorTexture === null || N.isBatchedMesh && we.batchingColor === !1 && N.colorTexture !== null || N.isInstancedMesh && we.instancing === !1 || !N.isInstancedMesh && we.instancing === !0 || N.isSkinnedMesh && we.skinning === !1 || !N.isSkinnedMesh && we.skinning === !0 || N.isInstancedMesh && we.instancingColor === !0 && N.instanceColor === null || N.isInstancedMesh && we.instancingColor === !1 && N.instanceColor !== null || N.isInstancedMesh && we.instancingMorph === !0 && N.morphTexture === null || N.isInstancedMesh && we.instancingMorph === !1 && N.morphTexture !== null || we.envMap !== Se || z.fog === !0 && we.fog !== re || we.numClippingPlanes !== void 0 && (we.numClippingPlanes !== ie.numPlanes || we.numIntersection !== ie.numIntersection) || we.vertexAlphas !== Ce || we.vertexTangents !== Re || we.morphTargets !== Ee || we.morphNormals !== nt || we.morphColors !== ft || we.toneMapping !== xt || we.morphTargetsCount !== et) && (tt = !0) : (tt = !0, we.__version = z.version);
      let ni = we.currentProgram;
      tt === !0 && (ni = el(z, I, N));
      let ys = !1, Rn = !1, Dc = !1;
      const Et = ni.getUniforms(), rr = we.uniforms;
      if (be.useProgram(ni.program) && (ys = !0, Rn = !0, Dc = !0), z.id !== R && (R = z.id, Rn = !0), ys || j !== E) {
        Ke.reverseDepthBuffer ? (de.copy(E.projectionMatrix), sw(de), ow(de), Et.setValue(P, "projectionMatrix", de)) : Et.setValue(P, "projectionMatrix", E.projectionMatrix), Et.setValue(P, "viewMatrix", E.matrixWorldInverse);
        const Wn = Et.map.cameraPosition;
        Wn !== void 0 && Wn.setValue(P, Ne.setFromMatrixPosition(E.matrixWorld)), Ke.logarithmicDepthBuffer && Et.setValue(
          P,
          "logDepthBufFC",
          2 / (Math.log(E.far + 1) / Math.LN2)
        ), (z.isMeshPhongMaterial || z.isMeshToonMaterial || z.isMeshLambertMaterial || z.isMeshBasicMaterial || z.isMeshStandardMaterial || z.isShaderMaterial) && Et.setValue(P, "isOrthographic", E.isOrthographicCamera === !0), j !== E && (j = E, Rn = !0, Dc = !0);
      }
      if (N.isSkinnedMesh) {
        Et.setOptional(P, N, "bindMatrix"), Et.setOptional(P, N, "bindMatrixInverse");
        const Wn = N.skeleton;
        Wn && (Wn.boneTexture === null && Wn.computeBoneTexture(), Et.setValue(P, "boneTexture", Wn.boneTexture, C));
      }
      N.isBatchedMesh && (Et.setOptional(P, N, "batchingTexture"), Et.setValue(P, "batchingTexture", N._matricesTexture, C), Et.setOptional(P, N, "batchingIdTexture"), Et.setValue(P, "batchingIdTexture", N._indirectTexture, C), Et.setOptional(P, N, "batchingColorTexture"), N._colorsTexture !== null && Et.setValue(P, "batchingColorTexture", N._colorsTexture, C));
      const Ic = O.morphAttributes;
      if ((Ic.position !== void 0 || Ic.normal !== void 0 || Ic.color !== void 0) && Le.update(N, O, ni), (Rn || we.receiveShadow !== N.receiveShadow) && (we.receiveShadow = N.receiveShadow, Et.setValue(P, "receiveShadow", N.receiveShadow)), z.isMeshGouraudMaterial && z.envMap !== null && (rr.envMap.value = Se, rr.flipEnvMap.value = Se.isCubeTexture && Se.isRenderTargetTexture === !1 ? -1 : 1), z.isMeshStandardMaterial && z.envMap === null && I.environment !== null && (rr.envMapIntensity.value = I.environmentIntensity), Rn && (Et.setValue(P, "toneMappingExposure", g.toneMappingExposure), we.needsLights && zS(rr, Dc), re && z.fog === !0 && le.refreshFogUniforms(rr, re), le.refreshMaterialUniforms(rr, z, ne, V, m.state.transmissionRenderTarget[E.id]), lu.upload(P, Am(we), rr, C)), z.isShaderMaterial && z.uniformsNeedUpdate === !0 && (lu.upload(P, Am(we), rr, C), z.uniformsNeedUpdate = !1), z.isSpriteMaterial && Et.setValue(P, "center", N.center), Et.setValue(P, "modelViewMatrix", N.modelViewMatrix), Et.setValue(P, "normalMatrix", N.normalMatrix), Et.setValue(P, "modelMatrix", N.matrixWorld), z.isShaderMaterial || z.isRawShaderMaterial) {
        const Wn = z.uniformsGroups;
        for (let Nc = 0, VS = Wn.length; Nc < VS; Nc++) {
          const bm = Wn[Nc];
          D.update(bm, ni), D.bind(bm, ni);
        }
      }
      return ni;
    }
    function zS(E, I) {
      E.ambientLightColor.needsUpdate = I, E.lightProbe.needsUpdate = I, E.directionalLights.needsUpdate = I, E.directionalLightShadows.needsUpdate = I, E.pointLights.needsUpdate = I, E.pointLightShadows.needsUpdate = I, E.spotLights.needsUpdate = I, E.spotLightShadows.needsUpdate = I, E.rectAreaLights.needsUpdate = I, E.hemisphereLights.needsUpdate = I;
    }
    function HS(E) {
      return E.isMeshLambertMaterial || E.isMeshToonMaterial || E.isMeshPhongMaterial || E.isMeshStandardMaterial || E.isShadowMaterial || E.isShaderMaterial && E.lights === !0;
    }
    this.getActiveCubeFace = function() {
      return b;
    }, this.getActiveMipmapLevel = function() {
      return A;
    }, this.getRenderTarget = function() {
      return T;
    }, this.setRenderTargetTextures = function(E, I, O) {
      De.get(E.texture).__webglTexture = I, De.get(E.depthTexture).__webglTexture = O;
      const z = De.get(E);
      z.__hasExternalTextures = !0, z.__autoAllocateDepthBuffer = O === void 0, z.__autoAllocateDepthBuffer || We.has("WEBGL_multisampled_render_to_texture") === !0 && (console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"), z.__useRenderToTexture = !1);
    }, this.setRenderTargetFramebuffer = function(E, I) {
      const O = De.get(E);
      O.__webglFramebuffer = I, O.__useDefaultFramebuffer = I === void 0;
    }, this.setRenderTarget = function(E, I = 0, O = 0) {
      T = E, b = I, A = O;
      let z = !0, N = null, re = !1, fe = !1;
      if (E) {
        const Se = De.get(E);
        if (Se.__useDefaultFramebuffer !== void 0)
          be.bindFramebuffer(P.FRAMEBUFFER, null), z = !1;
        else if (Se.__webglFramebuffer === void 0)
          C.setupRenderTarget(E);
        else if (Se.__hasExternalTextures)
          C.rebindTextures(E, De.get(E.texture).__webglTexture, De.get(E.depthTexture).__webglTexture);
        else if (E.depthBuffer) {
          const Ee = E.depthTexture;
          if (Se.__boundDepthTexture !== Ee) {
            if (Ee !== null && De.has(Ee) && (E.width !== Ee.image.width || E.height !== Ee.image.height))
              throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");
            C.setupDepthRenderbuffer(E);
          }
        }
        const Ce = E.texture;
        (Ce.isData3DTexture || Ce.isDataArrayTexture || Ce.isCompressedArrayTexture) && (fe = !0);
        const Re = De.get(E).__webglFramebuffer;
        E.isWebGLCubeRenderTarget ? (Array.isArray(Re[I]) ? N = Re[I][O] : N = Re[I], re = !0) : E.samples > 0 && C.useMultisampledRTT(E) === !1 ? N = De.get(E).__webglMultisampledFramebuffer : Array.isArray(Re) ? N = Re[O] : N = Re, x.copy(E.viewport), w.copy(E.scissor), H = E.scissorTest;
      } else
        x.copy(Z).multiplyScalar(ne).floor(), w.copy(se).multiplyScalar(ne).floor(), H = Te;
      if (be.bindFramebuffer(P.FRAMEBUFFER, N) && z && be.drawBuffers(E, N), be.viewport(x), be.scissor(w), be.setScissorTest(H), re) {
        const Se = De.get(E.texture);
        P.framebufferTexture2D(P.FRAMEBUFFER, P.COLOR_ATTACHMENT0, P.TEXTURE_CUBE_MAP_POSITIVE_X + I, Se.__webglTexture, O);
      } else if (fe) {
        const Se = De.get(E.texture), Ce = I || 0;
        P.framebufferTextureLayer(P.FRAMEBUFFER, P.COLOR_ATTACHMENT0, Se.__webglTexture, O || 0, Ce);
      }
      R = -1;
    }, this.readRenderTargetPixels = function(E, I, O, z, N, re, fe) {
      if (!(E && E.isWebGLRenderTarget)) {
        console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");
        return;
      }
      let xe = De.get(E).__webglFramebuffer;
      if (E.isWebGLCubeRenderTarget && fe !== void 0 && (xe = xe[fe]), xe) {
        be.bindFramebuffer(P.FRAMEBUFFER, xe);
        try {
          const Se = E.texture, Ce = Se.format, Re = Se.type;
          if (!Ke.textureFormatReadable(Ce)) {
            console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");
            return;
          }
          if (!Ke.textureTypeReadable(Re)) {
            console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");
            return;
          }
          I >= 0 && I <= E.width - z && O >= 0 && O <= E.height - N && P.readPixels(I, O, z, N, Ue.convert(Ce), Ue.convert(Re), re);
        } finally {
          const Se = T !== null ? De.get(T).__webglFramebuffer : null;
          be.bindFramebuffer(P.FRAMEBUFFER, Se);
        }
      }
    }, this.readRenderTargetPixelsAsync = async function(E, I, O, z, N, re, fe) {
      if (!(E && E.isWebGLRenderTarget))
        throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");
      let xe = De.get(E).__webglFramebuffer;
      if (E.isWebGLCubeRenderTarget && fe !== void 0 && (xe = xe[fe]), xe) {
        const Se = E.texture, Ce = Se.format, Re = Se.type;
        if (!Ke.textureFormatReadable(Ce))
          throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");
        if (!Ke.textureTypeReadable(Re))
          throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");
        if (I >= 0 && I <= E.width - z && O >= 0 && O <= E.height - N) {
          be.bindFramebuffer(P.FRAMEBUFFER, xe);
          const Ee = P.createBuffer();
          P.bindBuffer(P.PIXEL_PACK_BUFFER, Ee), P.bufferData(P.PIXEL_PACK_BUFFER, re.byteLength, P.STREAM_READ), P.readPixels(I, O, z, N, Ue.convert(Ce), Ue.convert(Re), 0);
          const nt = T !== null ? De.get(T).__webglFramebuffer : null;
          be.bindFramebuffer(P.FRAMEBUFFER, nt);
          const ft = P.fenceSync(P.SYNC_GPU_COMMANDS_COMPLETE, 0);
          return P.flush(), await rw(P, ft, 4), P.bindBuffer(P.PIXEL_PACK_BUFFER, Ee), P.getBufferSubData(P.PIXEL_PACK_BUFFER, 0, re), P.deleteBuffer(Ee), P.deleteSync(ft), re;
        } else
          throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.");
      }
    }, this.copyFramebufferToTexture = function(E, I = null, O = 0) {
      E.isTexture !== !0 && (au("WebGLRenderer: copyFramebufferToTexture function signature has changed."), I = arguments[0] || null, E = arguments[1]);
      const z = Math.pow(2, -O), N = Math.floor(E.image.width * z), re = Math.floor(E.image.height * z), fe = I !== null ? I.x : 0, xe = I !== null ? I.y : 0;
      C.setTexture2D(E, 0), P.copyTexSubImage2D(P.TEXTURE_2D, O, 0, 0, fe, xe, N, re), be.unbindTexture();
    }, this.copyTextureToTexture = function(E, I, O = null, z = null, N = 0) {
      E.isTexture !== !0 && (au("WebGLRenderer: copyTextureToTexture function signature has changed."), z = arguments[0] || null, E = arguments[1], I = arguments[2], N = arguments[3] || 0, O = null);
      let re, fe, xe, Se, Ce, Re;
      O !== null ? (re = O.max.x - O.min.x, fe = O.max.y - O.min.y, xe = O.min.x, Se = O.min.y) : (re = E.image.width, fe = E.image.height, xe = 0, Se = 0), z !== null ? (Ce = z.x, Re = z.y) : (Ce = 0, Re = 0);
      const Ee = Ue.convert(I.format), nt = Ue.convert(I.type);
      C.setTexture2D(I, 0), P.pixelStorei(P.UNPACK_FLIP_Y_WEBGL, I.flipY), P.pixelStorei(P.UNPACK_PREMULTIPLY_ALPHA_WEBGL, I.premultiplyAlpha), P.pixelStorei(P.UNPACK_ALIGNMENT, I.unpackAlignment);
      const ft = P.getParameter(P.UNPACK_ROW_LENGTH), xt = P.getParameter(P.UNPACK_IMAGE_HEIGHT), An = P.getParameter(P.UNPACK_SKIP_PIXELS), et = P.getParameter(P.UNPACK_SKIP_ROWS), we = P.getParameter(P.UNPACK_SKIP_IMAGES), Vt = E.isCompressedTexture ? E.mipmaps[N] : E.image;
      P.pixelStorei(P.UNPACK_ROW_LENGTH, Vt.width), P.pixelStorei(P.UNPACK_IMAGE_HEIGHT, Vt.height), P.pixelStorei(P.UNPACK_SKIP_PIXELS, xe), P.pixelStorei(P.UNPACK_SKIP_ROWS, Se), E.isDataTexture ? P.texSubImage2D(P.TEXTURE_2D, N, Ce, Re, re, fe, Ee, nt, Vt.data) : E.isCompressedTexture ? P.compressedTexSubImage2D(P.TEXTURE_2D, N, Ce, Re, Vt.width, Vt.height, Ee, Vt.data) : P.texSubImage2D(P.TEXTURE_2D, N, Ce, Re, re, fe, Ee, nt, Vt), P.pixelStorei(P.UNPACK_ROW_LENGTH, ft), P.pixelStorei(P.UNPACK_IMAGE_HEIGHT, xt), P.pixelStorei(P.UNPACK_SKIP_PIXELS, An), P.pixelStorei(P.UNPACK_SKIP_ROWS, et), P.pixelStorei(P.UNPACK_SKIP_IMAGES, we), N === 0 && I.generateMipmaps && P.generateMipmap(P.TEXTURE_2D), be.unbindTexture();
    }, this.copyTextureToTexture3D = function(E, I, O = null, z = null, N = 0) {
      E.isTexture !== !0 && (au("WebGLRenderer: copyTextureToTexture3D function signature has changed."), O = arguments[0] || null, z = arguments[1] || null, E = arguments[2], I = arguments[3], N = arguments[4] || 0);
      let re, fe, xe, Se, Ce, Re, Ee, nt, ft;
      const xt = E.isCompressedTexture ? E.mipmaps[N] : E.image;
      O !== null ? (re = O.max.x - O.min.x, fe = O.max.y - O.min.y, xe = O.max.z - O.min.z, Se = O.min.x, Ce = O.min.y, Re = O.min.z) : (re = xt.width, fe = xt.height, xe = xt.depth, Se = 0, Ce = 0, Re = 0), z !== null ? (Ee = z.x, nt = z.y, ft = z.z) : (Ee = 0, nt = 0, ft = 0);
      const An = Ue.convert(I.format), et = Ue.convert(I.type);
      let we;
      if (I.isData3DTexture)
        C.setTexture3D(I, 0), we = P.TEXTURE_3D;
      else if (I.isDataArrayTexture || I.isCompressedArrayTexture)
        C.setTexture2DArray(I, 0), we = P.TEXTURE_2D_ARRAY;
      else {
        console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");
        return;
      }
      P.pixelStorei(P.UNPACK_FLIP_Y_WEBGL, I.flipY), P.pixelStorei(P.UNPACK_PREMULTIPLY_ALPHA_WEBGL, I.premultiplyAlpha), P.pixelStorei(P.UNPACK_ALIGNMENT, I.unpackAlignment);
      const Vt = P.getParameter(P.UNPACK_ROW_LENGTH), tt = P.getParameter(P.UNPACK_IMAGE_HEIGHT), ni = P.getParameter(P.UNPACK_SKIP_PIXELS), ys = P.getParameter(P.UNPACK_SKIP_ROWS), Rn = P.getParameter(P.UNPACK_SKIP_IMAGES);
      P.pixelStorei(P.UNPACK_ROW_LENGTH, xt.width), P.pixelStorei(P.UNPACK_IMAGE_HEIGHT, xt.height), P.pixelStorei(P.UNPACK_SKIP_PIXELS, Se), P.pixelStorei(P.UNPACK_SKIP_ROWS, Ce), P.pixelStorei(P.UNPACK_SKIP_IMAGES, Re), E.isDataTexture || E.isData3DTexture ? P.texSubImage3D(we, N, Ee, nt, ft, re, fe, xe, An, et, xt.data) : I.isCompressedArrayTexture ? P.compressedTexSubImage3D(we, N, Ee, nt, ft, re, fe, xe, An, xt.data) : P.texSubImage3D(we, N, Ee, nt, ft, re, fe, xe, An, et, xt), P.pixelStorei(P.UNPACK_ROW_LENGTH, Vt), P.pixelStorei(P.UNPACK_IMAGE_HEIGHT, tt), P.pixelStorei(P.UNPACK_SKIP_PIXELS, ni), P.pixelStorei(P.UNPACK_SKIP_ROWS, ys), P.pixelStorei(P.UNPACK_SKIP_IMAGES, Rn), N === 0 && I.generateMipmaps && P.generateMipmap(we), be.unbindTexture();
    }, this.initRenderTarget = function(E) {
      De.get(E).__webglFramebuffer === void 0 && C.setupRenderTarget(E);
    }, this.initTexture = function(E) {
      E.isCubeTexture ? C.setTextureCube(E, 0) : E.isData3DTexture ? C.setTexture3D(E, 0) : E.isDataArrayTexture || E.isCompressedArrayTexture ? C.setTexture2DArray(E, 0) : C.setTexture2D(E, 0), be.unbindTexture();
    }, this.resetState = function() {
      b = 0, A = 0, T = null, be.reset(), st.reset();
    }, typeof __THREE_DEVTOOLS__ < "u" && __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe", { detail: this }));
  }
  get coordinateSystem() {
    return $i;
  }
  get outputColorSpace() {
    return this._outputColorSpace;
  }
  set outputColorSpace(e) {
    this._outputColorSpace = e;
    const n = this.getContext();
    n.drawingBufferColorSpace = e === qp ? "display-p3" : "srgb", n.unpackColorSpace = Je.workingColorSpace === Ec ? "display-p3" : "srgb";
  }
}
class vR extends Nt {
  constructor() {
    super(), this.isScene = !0, this.type = "Scene", this.background = null, this.environment = null, this.fog = null, this.backgroundBlurriness = 0, this.backgroundIntensity = 1, this.backgroundRotation = new Ri(), this.environmentIntensity = 1, this.environmentRotation = new Ri(), this.overrideMaterial = null, typeof __THREE_DEVTOOLS__ < "u" && __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe", { detail: this }));
  }
  copy(e, n) {
    return super.copy(e, n), e.background !== null && (this.background = e.background.clone()), e.environment !== null && (this.environment = e.environment.clone()), e.fog !== null && (this.fog = e.fog.clone()), this.backgroundBlurriness = e.backgroundBlurriness, this.backgroundIntensity = e.backgroundIntensity, this.backgroundRotation.copy(e.backgroundRotation), this.environmentIntensity = e.environmentIntensity, this.environmentRotation.copy(e.environmentRotation), e.overrideMaterial !== null && (this.overrideMaterial = e.overrideMaterial.clone()), this.matrixAutoUpdate = e.matrixAutoUpdate, this;
  }
  toJSON(e) {
    const n = super.toJSON(e);
    return this.fog !== null && (n.object.fog = this.fog.toJSON()), this.backgroundBlurriness > 0 && (n.object.backgroundBlurriness = this.backgroundBlurriness), this.backgroundIntensity !== 1 && (n.object.backgroundIntensity = this.backgroundIntensity), n.object.backgroundRotation = this.backgroundRotation.toArray(), this.environmentIntensity !== 1 && (n.object.environmentIntensity = this.environmentIntensity), n.object.environmentRotation = this.environmentRotation.toArray(), n;
  }
}
class Io extends ln {
  constructor(e, n, i, r, s, o, a, l, u) {
    super(e, n, i, r, s, o, a, l, u), this.isCanvasTexture = !0, this.needsUpdate = !0;
  }
}
class tm extends ir {
  constructor(e = 1, n = 1, i = 1, r = 32, s = 1, o = !1, a = 0, l = Math.PI * 2) {
    super(), this.type = "CylinderGeometry", this.parameters = {
      radiusTop: e,
      radiusBottom: n,
      height: i,
      radialSegments: r,
      heightSegments: s,
      openEnded: o,
      thetaStart: a,
      thetaLength: l
    };
    const u = this;
    r = Math.floor(r), s = Math.floor(s);
    const c = [], d = [], h = [], p = [];
    let _ = 0;
    const y = [], m = i / 2;
    let f = 0;
    v(), o === !1 && (e > 0 && g(!0), n > 0 && g(!1)), this.setIndex(c), this.setAttribute("position", new Jn(d, 3)), this.setAttribute("normal", new Jn(h, 3)), this.setAttribute("uv", new Jn(p, 2));
    function v() {
      const M = new k(), b = new k();
      let A = 0;
      const T = (n - e) / i;
      for (let R = 0; R <= s; R++) {
        const j = [], x = R / s, w = x * (n - e) + e;
        for (let H = 0; H <= r; H++) {
          const B = H / r, G = B * l + a, Q = Math.sin(G), V = Math.cos(G);
          b.x = w * Q, b.y = -x * i + m, b.z = w * V, d.push(b.x, b.y, b.z), M.set(Q, T, V).normalize(), h.push(M.x, M.y, M.z), p.push(B, 1 - x), j.push(_++);
        }
        y.push(j);
      }
      for (let R = 0; R < r; R++)
        for (let j = 0; j < s; j++) {
          const x = y[j][R], w = y[j + 1][R], H = y[j + 1][R + 1], B = y[j][R + 1];
          e > 0 && (c.push(x, w, B), A += 3), n > 0 && (c.push(w, H, B), A += 3);
        }
      u.addGroup(f, A, 0), f += A;
    }
    function g(M) {
      const b = _, A = new Ie(), T = new k();
      let R = 0;
      const j = M === !0 ? e : n, x = M === !0 ? 1 : -1;
      for (let H = 1; H <= r; H++)
        d.push(0, m * x, 0), h.push(0, x, 0), p.push(0.5, 0.5), _++;
      const w = _;
      for (let H = 0; H <= r; H++) {
        const G = H / r * l + a, Q = Math.cos(G), V = Math.sin(G);
        T.x = j * V, T.y = m * x, T.z = j * Q, d.push(T.x, T.y, T.z), h.push(0, x, 0), A.x = Q * 0.5 + 0.5, A.y = V * 0.5 * x + 0.5, p.push(A.x, A.y), _++;
      }
      for (let H = 0; H < r; H++) {
        const B = b + H, G = w + H;
        M === !0 ? c.push(G, G + 1, B) : c.push(G + 1, G, B), R += 3;
      }
      u.addGroup(f, R, M === !0 ? 1 : 2), f += R;
    }
  }
  copy(e) {
    return super.copy(e), this.parameters = Object.assign({}, e.parameters), this;
  }
  static fromJSON(e) {
    return new tm(e.radiusTop, e.radiusBottom, e.height, e.radialSegments, e.heightSegments, e.openEnded, e.thetaStart, e.thetaLength);
  }
}
class _R extends on {
  constructor(e) {
    super(e), this.isRawShaderMaterial = !0, this.type = "RawShaderMaterial";
  }
}
class Xr extends Qa {
  constructor(e) {
    super(), this.isMeshStandardMaterial = !0, this.defines = { STANDARD: "" }, this.type = "MeshStandardMaterial", this.color = new Ve(16777215), this.roughness = 1, this.metalness = 0, this.map = null, this.lightMap = null, this.lightMapIntensity = 1, this.aoMap = null, this.aoMapIntensity = 1, this.emissive = new Ve(0), this.emissiveIntensity = 1, this.emissiveMap = null, this.bumpMap = null, this.bumpScale = 1, this.normalMap = null, this.normalMapType = gy, this.normalScale = new Ie(1, 1), this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.roughnessMap = null, this.metalnessMap = null, this.alphaMap = null, this.envMap = null, this.envMapRotation = new Ri(), this.envMapIntensity = 1, this.wireframe = !1, this.wireframeLinewidth = 1, this.wireframeLinecap = "round", this.wireframeLinejoin = "round", this.flatShading = !1, this.fog = !0, this.setValues(e);
  }
  copy(e) {
    return super.copy(e), this.defines = { STANDARD: "" }, this.color.copy(e.color), this.roughness = e.roughness, this.metalness = e.metalness, this.map = e.map, this.lightMap = e.lightMap, this.lightMapIntensity = e.lightMapIntensity, this.aoMap = e.aoMap, this.aoMapIntensity = e.aoMapIntensity, this.emissive.copy(e.emissive), this.emissiveMap = e.emissiveMap, this.emissiveIntensity = e.emissiveIntensity, this.bumpMap = e.bumpMap, this.bumpScale = e.bumpScale, this.normalMap = e.normalMap, this.normalMapType = e.normalMapType, this.normalScale.copy(e.normalScale), this.displacementMap = e.displacementMap, this.displacementScale = e.displacementScale, this.displacementBias = e.displacementBias, this.roughnessMap = e.roughnessMap, this.metalnessMap = e.metalnessMap, this.alphaMap = e.alphaMap, this.envMap = e.envMap, this.envMapRotation.copy(e.envMapRotation), this.envMapIntensity = e.envMapIntensity, this.wireframe = e.wireframe, this.wireframeLinewidth = e.wireframeLinewidth, this.wireframeLinecap = e.wireframeLinecap, this.wireframeLinejoin = e.wireframeLinejoin, this.flatShading = e.flatShading, this.fog = e.fog, this;
  }
}
class nm extends Nt {
  constructor(e, n = 1) {
    super(), this.isLight = !0, this.type = "Light", this.color = new Ve(e), this.intensity = n;
  }
  dispose() {
  }
  copy(e, n) {
    return super.copy(e, n), this.color.copy(e.color), this.intensity = e.intensity, this;
  }
  toJSON(e) {
    const n = super.toJSON(e);
    return n.object.color = this.color.getHex(), n.object.intensity = this.intensity, this.groundColor !== void 0 && (n.object.groundColor = this.groundColor.getHex()), this.distance !== void 0 && (n.object.distance = this.distance), this.angle !== void 0 && (n.object.angle = this.angle), this.decay !== void 0 && (n.object.decay = this.decay), this.penumbra !== void 0 && (n.object.penumbra = this.penumbra), this.shadow !== void 0 && (n.object.shadow = this.shadow.toJSON()), this.target !== void 0 && (n.object.target = this.target.uuid), n;
  }
}
class xR extends nm {
  constructor(e, n, i) {
    super(e, i), this.isHemisphereLight = !0, this.type = "HemisphereLight", this.position.copy(Nt.DEFAULT_UP), this.updateMatrix(), this.groundColor = new Ve(n);
  }
  copy(e, n) {
    return super.copy(e, n), this.groundColor.copy(e.groundColor), this;
  }
}
const $f = /* @__PURE__ */ new Mt(), Nv = /* @__PURE__ */ new k(), Uv = /* @__PURE__ */ new k();
class Ny {
  constructor(e) {
    this.camera = e, this.intensity = 1, this.bias = 0, this.normalBias = 0, this.radius = 1, this.blurSamples = 8, this.mapSize = new Ie(512, 512), this.map = null, this.mapPass = null, this.matrix = new Mt(), this.autoUpdate = !0, this.needsUpdate = !1, this._frustum = new Qp(), this._frameExtents = new Ie(1, 1), this._viewportCount = 1, this._viewports = [
      new St(0, 0, 1, 1)
    ];
  }
  getViewportCount() {
    return this._viewportCount;
  }
  getFrustum() {
    return this._frustum;
  }
  updateMatrices(e) {
    const n = this.camera, i = this.matrix;
    Nv.setFromMatrixPosition(e.matrixWorld), n.position.copy(Nv), Uv.setFromMatrixPosition(e.target.matrixWorld), n.lookAt(Uv), n.updateMatrixWorld(), $f.multiplyMatrices(n.projectionMatrix, n.matrixWorldInverse), this._frustum.setFromProjectionMatrix($f), i.set(
      0.5,
      0,
      0,
      0.5,
      0,
      0.5,
      0,
      0.5,
      0,
      0,
      0.5,
      0.5,
      0,
      0,
      0,
      1
    ), i.multiply($f);
  }
  getViewport(e) {
    return this._viewports[e];
  }
  getFrameExtents() {
    return this._frameExtents;
  }
  dispose() {
    this.map && this.map.dispose(), this.mapPass && this.mapPass.dispose();
  }
  copy(e) {
    return this.camera = e.camera.clone(), this.intensity = e.intensity, this.bias = e.bias, this.radius = e.radius, this.mapSize.copy(e.mapSize), this;
  }
  clone() {
    return new this.constructor().copy(this);
  }
  toJSON() {
    const e = {};
    return this.intensity !== 1 && (e.intensity = this.intensity), this.bias !== 0 && (e.bias = this.bias), this.normalBias !== 0 && (e.normalBias = this.normalBias), this.radius !== 1 && (e.radius = this.radius), (this.mapSize.x !== 512 || this.mapSize.y !== 512) && (e.mapSize = this.mapSize.toArray()), e.camera = this.camera.toJSON(!1).object, delete e.camera.matrix, e;
  }
}
class yR extends Ny {
  constructor() {
    super(new On(50, 1, 0.5, 500)), this.isSpotLightShadow = !0, this.focus = 1;
  }
  updateMatrices(e) {
    const n = this.camera, i = Xu * 2 * e.angle * this.focus, r = this.mapSize.width / this.mapSize.height, s = e.distance || n.far;
    (i !== n.fov || r !== n.aspect || s !== n.far) && (n.fov = i, n.aspect = r, n.far = s, n.updateProjectionMatrix()), super.updateMatrices(e);
  }
  copy(e) {
    return super.copy(e), this.focus = e.focus, this;
  }
}
class SR extends nm {
  constructor(e, n, i = 0, r = Math.PI / 3, s = 0, o = 2) {
    super(e, n), this.isSpotLight = !0, this.type = "SpotLight", this.position.copy(Nt.DEFAULT_UP), this.updateMatrix(), this.target = new Nt(), this.distance = i, this.angle = r, this.penumbra = s, this.decay = o, this.map = null, this.shadow = new yR();
  }
  get power() {
    return this.intensity * Math.PI;
  }
  set power(e) {
    this.intensity = e / Math.PI;
  }
  dispose() {
    this.shadow.dispose();
  }
  copy(e, n) {
    return super.copy(e, n), this.distance = e.distance, this.angle = e.angle, this.penumbra = e.penumbra, this.decay = e.decay, this.target = e.target.clone(), this.shadow = e.shadow.clone(), this;
  }
}
class MR extends Ny {
  constructor() {
    super(new Jp(-5, 5, 5, -5, 0.5, 500)), this.isDirectionalLightShadow = !0;
  }
}
class kv extends nm {
  constructor(e, n) {
    super(e, n), this.isDirectionalLight = !0, this.type = "DirectionalLight", this.position.copy(Nt.DEFAULT_UP), this.updateMatrix(), this.target = new Nt(), this.shadow = new MR();
  }
  dispose() {
    this.shadow.dispose();
  }
  copy(e) {
    return super.copy(e), this.target = e.target.clone(), this.shadow = e.shadow.clone(), this;
  }
}
class ER {
  constructor(e = !0) {
    this.autoStart = e, this.startTime = 0, this.oldTime = 0, this.elapsedTime = 0, this.running = !1;
  }
  start() {
    this.startTime = Fv(), this.oldTime = this.startTime, this.elapsedTime = 0, this.running = !0;
  }
  stop() {
    this.getElapsedTime(), this.running = !1, this.autoStart = !1;
  }
  getElapsedTime() {
    return this.getDelta(), this.elapsedTime;
  }
  getDelta() {
    let e = 0;
    if (this.autoStart && !this.running)
      return this.start(), 0;
    if (this.running) {
      const n = Fv();
      e = (n - this.oldTime) / 1e3, this.oldTime = n, this.elapsedTime += e;
    }
    return e;
  }
}
function Fv() {
  return performance.now();
}
typeof __THREE_DEVTOOLS__ < "u" && __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register", { detail: {
  revision: Hp
} }));
typeof window < "u" && (window.__THREE__ ? console.warn("WARNING: Multiple instances of Three.js being imported.") : window.__THREE__ = Hp);
const Uy = {
  name: "CopyShader",
  uniforms: {
    tDiffuse: { value: null },
    opacity: { value: 1 }
  },
  vertexShader: (
    /* glsl */
    `

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`
  ),
  fragmentShader: (
    /* glsl */
    `

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`
  )
};
class No {
  constructor() {
    this.isPass = !0, this.enabled = !0, this.needsSwap = !0, this.clear = !1, this.renderToScreen = !1;
  }
  setSize() {
  }
  render() {
    console.error("THREE.Pass: .render() must be implemented in derived pass.");
  }
  dispose() {
  }
}
const wR = new Jp(-1, 1, 1, -1, 0, 1);
class TR extends ir {
  constructor() {
    super(), this.setAttribute("position", new Jn([-1, 3, 0, -1, -1, 0, 3, -1, 0], 3)), this.setAttribute("uv", new Jn([0, 2, 0, 0, 2, 0], 2));
  }
}
const CR = new TR();
class im {
  constructor(e) {
    this._mesh = new Sn(CR, e);
  }
  dispose() {
    this._mesh.geometry.dispose();
  }
  render(e) {
    e.render(this._mesh, wR);
  }
  get material() {
    return this._mesh.material;
  }
  set material(e) {
    this._mesh.material = e;
  }
}
class ky extends No {
  constructor(e, n) {
    super(), this.textureID = n !== void 0 ? n : "tDiffuse", e instanceof on ? (this.uniforms = e.uniforms, this.material = e) : e && (this.uniforms = Ba.clone(e.uniforms), this.material = new on({
      name: e.name !== void 0 ? e.name : "unspecified",
      defines: Object.assign({}, e.defines),
      uniforms: this.uniforms,
      vertexShader: e.vertexShader,
      fragmentShader: e.fragmentShader
    })), this.fsQuad = new im(this.material);
  }
  render(e, n, i) {
    this.uniforms[this.textureID] && (this.uniforms[this.textureID].value = i.texture), this.fsQuad.material = this.material, this.renderToScreen ? (e.setRenderTarget(null), this.fsQuad.render(e)) : (e.setRenderTarget(n), this.clear && e.clear(e.autoClearColor, e.autoClearDepth, e.autoClearStencil), this.fsQuad.render(e));
  }
  dispose() {
    this.material.dispose(), this.fsQuad.dispose();
  }
}
class Ov extends No {
  constructor(e, n) {
    super(), this.scene = e, this.camera = n, this.clear = !0, this.needsSwap = !1, this.inverse = !1;
  }
  render(e, n, i) {
    const r = e.getContext(), s = e.state;
    s.buffers.color.setMask(!1), s.buffers.depth.setMask(!1), s.buffers.color.setLocked(!0), s.buffers.depth.setLocked(!0);
    let o, a;
    this.inverse ? (o = 0, a = 1) : (o = 1, a = 0), s.buffers.stencil.setTest(!0), s.buffers.stencil.setOp(r.REPLACE, r.REPLACE, r.REPLACE), s.buffers.stencil.setFunc(r.ALWAYS, o, 4294967295), s.buffers.stencil.setClear(a), s.buffers.stencil.setLocked(!0), e.setRenderTarget(i), this.clear && e.clear(), e.render(this.scene, this.camera), e.setRenderTarget(n), this.clear && e.clear(), e.render(this.scene, this.camera), s.buffers.color.setLocked(!1), s.buffers.depth.setLocked(!1), s.buffers.color.setMask(!0), s.buffers.depth.setMask(!0), s.buffers.stencil.setLocked(!1), s.buffers.stencil.setFunc(r.EQUAL, 1, 4294967295), s.buffers.stencil.setOp(r.KEEP, r.KEEP, r.KEEP), s.buffers.stencil.setLocked(!0);
  }
}
class AR extends No {
  constructor() {
    super(), this.needsSwap = !1;
  }
  render(e) {
    e.state.buffers.stencil.setLocked(!1), e.state.buffers.stencil.setTest(!1);
  }
}
class RR {
  constructor(e, n) {
    if (this.renderer = e, this._pixelRatio = e.getPixelRatio(), n === void 0) {
      const i = e.getSize(new Ie());
      this._width = i.width, this._height = i.height, n = new mi(this._width * this._pixelRatio, this._height * this._pixelRatio, { type: Yi }), n.texture.name = "EffectComposer.rt1";
    } else
      this._width = n.width, this._height = n.height;
    this.renderTarget1 = n, this.renderTarget2 = n.clone(), this.renderTarget2.texture.name = "EffectComposer.rt2", this.writeBuffer = this.renderTarget1, this.readBuffer = this.renderTarget2, this.renderToScreen = !0, this.passes = [], this.copyPass = new ky(Uy), this.copyPass.material.blending = Xi, this.clock = new ER();
  }
  swapBuffers() {
    const e = this.readBuffer;
    this.readBuffer = this.writeBuffer, this.writeBuffer = e;
  }
  addPass(e) {
    this.passes.push(e), e.setSize(this._width * this._pixelRatio, this._height * this._pixelRatio);
  }
  insertPass(e, n) {
    this.passes.splice(n, 0, e), e.setSize(this._width * this._pixelRatio, this._height * this._pixelRatio);
  }
  removePass(e) {
    const n = this.passes.indexOf(e);
    n !== -1 && this.passes.splice(n, 1);
  }
  isLastEnabledPass(e) {
    for (let n = e + 1; n < this.passes.length; n++)
      if (this.passes[n].enabled)
        return !1;
    return !0;
  }
  render(e) {
    e === void 0 && (e = this.clock.getDelta());
    const n = this.renderer.getRenderTarget();
    let i = !1;
    for (let r = 0, s = this.passes.length; r < s; r++) {
      const o = this.passes[r];
      if (o.enabled !== !1) {
        if (o.renderToScreen = this.renderToScreen && this.isLastEnabledPass(r), o.render(this.renderer, this.writeBuffer, this.readBuffer, e, i), o.needsSwap) {
          if (i) {
            const a = this.renderer.getContext(), l = this.renderer.state.buffers.stencil;
            l.setFunc(a.NOTEQUAL, 1, 4294967295), this.copyPass.render(this.renderer, this.writeBuffer, this.readBuffer, e), l.setFunc(a.EQUAL, 1, 4294967295);
          }
          this.swapBuffers();
        }
        Ov !== void 0 && (o instanceof Ov ? i = !0 : o instanceof AR && (i = !1));
      }
    }
    this.renderer.setRenderTarget(n);
  }
  reset(e) {
    if (e === void 0) {
      const n = this.renderer.getSize(new Ie());
      this._pixelRatio = this.renderer.getPixelRatio(), this._width = n.width, this._height = n.height, e = this.renderTarget1.clone(), e.setSize(this._width * this._pixelRatio, this._height * this._pixelRatio);
    }
    this.renderTarget1.dispose(), this.renderTarget2.dispose(), this.renderTarget1 = e, this.renderTarget2 = e.clone(), this.writeBuffer = this.renderTarget1, this.readBuffer = this.renderTarget2;
  }
  setSize(e, n) {
    this._width = e, this._height = n;
    const i = this._width * this._pixelRatio, r = this._height * this._pixelRatio;
    this.renderTarget1.setSize(i, r), this.renderTarget2.setSize(i, r);
    for (let s = 0; s < this.passes.length; s++)
      this.passes[s].setSize(i, r);
  }
  setPixelRatio(e) {
    this._pixelRatio = e, this.setSize(this._width, this._height);
  }
  dispose() {
    this.renderTarget1.dispose(), this.renderTarget2.dispose(), this.copyPass.dispose();
  }
}
const bR = {
  name: "OutputShader",
  uniforms: {
    tDiffuse: { value: null },
    toneMappingExposure: { value: 1 }
  },
  vertexShader: (
    /* glsl */
    `
		precision highp float;

		uniform mat4 modelViewMatrix;
		uniform mat4 projectionMatrix;

		attribute vec3 position;
		attribute vec2 uv;

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`
  ),
  fragmentShader: (
    /* glsl */
    `
	
		precision highp float;

		uniform sampler2D tDiffuse;

		#include <tonemapping_pars_fragment>
		#include <colorspace_pars_fragment>

		varying vec2 vUv;

		void main() {

			gl_FragColor = texture2D( tDiffuse, vUv );

			// tone mapping

			#ifdef LINEAR_TONE_MAPPING

				gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );

			#elif defined( REINHARD_TONE_MAPPING )

				gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );

			#elif defined( CINEON_TONE_MAPPING )

				gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );

			#elif defined( ACES_FILMIC_TONE_MAPPING )

				gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );

			#elif defined( AGX_TONE_MAPPING )

				gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );

			#elif defined( NEUTRAL_TONE_MAPPING )

				gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );

			#endif

			// color space

			#ifdef SRGB_TRANSFER

				gl_FragColor = sRGBTransferOETF( gl_FragColor );

			#endif

		}`
  )
};
class PR extends No {
  constructor() {
    super();
    const e = bR;
    this.uniforms = Ba.clone(e.uniforms), this.material = new _R({
      name: e.name,
      uniforms: this.uniforms,
      vertexShader: e.vertexShader,
      fragmentShader: e.fragmentShader
    }), this.fsQuad = new im(this.material), this._outputColorSpace = null, this._toneMapping = null;
  }
  render(e, n, i) {
    this.uniforms.tDiffuse.value = i.texture, this.uniforms.toneMappingExposure.value = e.toneMappingExposure, (this._outputColorSpace !== e.outputColorSpace || this._toneMapping !== e.toneMapping) && (this._outputColorSpace = e.outputColorSpace, this._toneMapping = e.toneMapping, this.material.defines = {}, Je.getTransfer(this._outputColorSpace) === ot && (this.material.defines.SRGB_TRANSFER = ""), this._toneMapping === ey ? this.material.defines.LINEAR_TONE_MAPPING = "" : this._toneMapping === ty ? this.material.defines.REINHARD_TONE_MAPPING = "" : this._toneMapping === ny ? this.material.defines.CINEON_TONE_MAPPING = "" : this._toneMapping === Vp ? this.material.defines.ACES_FILMIC_TONE_MAPPING = "" : this._toneMapping === iy ? this.material.defines.AGX_TONE_MAPPING = "" : this._toneMapping === ry && (this.material.defines.NEUTRAL_TONE_MAPPING = ""), this.material.needsUpdate = !0), this.renderToScreen === !0 ? (e.setRenderTarget(null), this.fsQuad.render(e)) : (e.setRenderTarget(n), this.clear && e.clear(e.autoClearColor, e.autoClearDepth, e.autoClearStencil), this.fsQuad.render(e));
  }
  dispose() {
    this.material.dispose(), this.fsQuad.dispose();
  }
}
class LR extends No {
  constructor(e, n, i = null, r = null, s = null) {
    super(), this.scene = e, this.camera = n, this.overrideMaterial = i, this.clearColor = r, this.clearAlpha = s, this.clear = !0, this.clearDepth = !1, this.needsSwap = !1, this._oldClearColor = new Ve();
  }
  render(e, n, i) {
    const r = e.autoClear;
    e.autoClear = !1;
    let s, o;
    this.overrideMaterial !== null && (o = this.scene.overrideMaterial, this.scene.overrideMaterial = this.overrideMaterial), this.clearColor !== null && (e.getClearColor(this._oldClearColor), e.setClearColor(this.clearColor, e.getClearAlpha())), this.clearAlpha !== null && (s = e.getClearAlpha(), e.setClearAlpha(this.clearAlpha)), this.clearDepth == !0 && e.clearDepth(), e.setRenderTarget(this.renderToScreen ? null : i), this.clear === !0 && e.clear(e.autoClearColor, e.autoClearDepth, e.autoClearStencil), e.render(this.scene, this.camera), this.clearColor !== null && e.setClearColor(this._oldClearColor), this.clearAlpha !== null && e.setClearAlpha(s), this.overrideMaterial !== null && (this.scene.overrideMaterial = o), e.autoClear = r;
  }
}
const DR = {
  uniforms: {
    tDiffuse: { value: null },
    luminosityThreshold: { value: 1 },
    smoothWidth: { value: 1 },
    defaultColor: { value: new Ve(0) },
    defaultOpacity: { value: 0 }
  },
  vertexShader: (
    /* glsl */
    `

		varying vec2 vUv;

		void main() {

			vUv = uv;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`
  ),
  fragmentShader: (
    /* glsl */
    `

		uniform sampler2D tDiffuse;
		uniform vec3 defaultColor;
		uniform float defaultOpacity;
		uniform float luminosityThreshold;
		uniform float smoothWidth;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );

			float v = luminance( texel.xyz );

			vec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );

			float alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );

			gl_FragColor = mix( outputColor, texel, alpha );

		}`
  )
};
class wo extends No {
  constructor(e, n, i, r) {
    super(), this.strength = n !== void 0 ? n : 1, this.radius = i, this.threshold = r, this.resolution = e !== void 0 ? new Ie(e.x, e.y) : new Ie(256, 256), this.clearColor = new Ve(0, 0, 0), this.renderTargetsHorizontal = [], this.renderTargetsVertical = [], this.nMips = 5;
    let s = Math.round(this.resolution.x / 2), o = Math.round(this.resolution.y / 2);
    this.renderTargetBright = new mi(s, o, { type: Yi }), this.renderTargetBright.texture.name = "UnrealBloomPass.bright", this.renderTargetBright.texture.generateMipmaps = !1;
    for (let d = 0; d < this.nMips; d++) {
      const h = new mi(s, o, { type: Yi });
      h.texture.name = "UnrealBloomPass.h" + d, h.texture.generateMipmaps = !1, this.renderTargetsHorizontal.push(h);
      const p = new mi(s, o, { type: Yi });
      p.texture.name = "UnrealBloomPass.v" + d, p.texture.generateMipmaps = !1, this.renderTargetsVertical.push(p), s = Math.round(s / 2), o = Math.round(o / 2);
    }
    const a = DR;
    this.highPassUniforms = Ba.clone(a.uniforms), this.highPassUniforms.luminosityThreshold.value = r, this.highPassUniforms.smoothWidth.value = 0.01, this.materialHighPassFilter = new on({
      uniforms: this.highPassUniforms,
      vertexShader: a.vertexShader,
      fragmentShader: a.fragmentShader
    }), this.separableBlurMaterials = [];
    const l = [3, 5, 7, 9, 11];
    s = Math.round(this.resolution.x / 2), o = Math.round(this.resolution.y / 2);
    for (let d = 0; d < this.nMips; d++)
      this.separableBlurMaterials.push(this.getSeperableBlurMaterial(l[d])), this.separableBlurMaterials[d].uniforms.invSize.value = new Ie(1 / s, 1 / o), s = Math.round(s / 2), o = Math.round(o / 2);
    this.compositeMaterial = this.getCompositeMaterial(this.nMips), this.compositeMaterial.uniforms.blurTexture1.value = this.renderTargetsVertical[0].texture, this.compositeMaterial.uniforms.blurTexture2.value = this.renderTargetsVertical[1].texture, this.compositeMaterial.uniforms.blurTexture3.value = this.renderTargetsVertical[2].texture, this.compositeMaterial.uniforms.blurTexture4.value = this.renderTargetsVertical[3].texture, this.compositeMaterial.uniforms.blurTexture5.value = this.renderTargetsVertical[4].texture, this.compositeMaterial.uniforms.bloomStrength.value = n, this.compositeMaterial.uniforms.bloomRadius.value = 0.1;
    const u = [1, 0.8, 0.6, 0.4, 0.2];
    this.compositeMaterial.uniforms.bloomFactors.value = u, this.bloomTintColors = [new k(1, 1, 1), new k(1, 1, 1), new k(1, 1, 1), new k(1, 1, 1), new k(1, 1, 1)], this.compositeMaterial.uniforms.bloomTintColors.value = this.bloomTintColors;
    const c = Uy;
    this.copyUniforms = Ba.clone(c.uniforms), this.blendMaterial = new on({
      uniforms: this.copyUniforms,
      vertexShader: c.vertexShader,
      fragmentShader: c.fragmentShader,
      blending: Yd,
      depthTest: !1,
      depthWrite: !1,
      transparent: !0
    }), this.enabled = !0, this.needsSwap = !1, this._oldClearColor = new Ve(), this.oldClearAlpha = 1, this.basic = new Zp(), this.fsQuad = new im(null);
  }
  dispose() {
    for (let e = 0; e < this.renderTargetsHorizontal.length; e++)
      this.renderTargetsHorizontal[e].dispose();
    for (let e = 0; e < this.renderTargetsVertical.length; e++)
      this.renderTargetsVertical[e].dispose();
    this.renderTargetBright.dispose();
    for (let e = 0; e < this.separableBlurMaterials.length; e++)
      this.separableBlurMaterials[e].dispose();
    this.compositeMaterial.dispose(), this.blendMaterial.dispose(), this.basic.dispose(), this.fsQuad.dispose();
  }
  setSize(e, n) {
    let i = Math.round(e / 2), r = Math.round(n / 2);
    this.renderTargetBright.setSize(i, r);
    for (let s = 0; s < this.nMips; s++)
      this.renderTargetsHorizontal[s].setSize(i, r), this.renderTargetsVertical[s].setSize(i, r), this.separableBlurMaterials[s].uniforms.invSize.value = new Ie(1 / i, 1 / r), i = Math.round(i / 2), r = Math.round(r / 2);
  }
  render(e, n, i, r, s) {
    e.getClearColor(this._oldClearColor), this.oldClearAlpha = e.getClearAlpha();
    const o = e.autoClear;
    e.autoClear = !1, e.setClearColor(this.clearColor, 0), s && e.state.buffers.stencil.setTest(!1), this.renderToScreen && (this.fsQuad.material = this.basic, this.basic.map = i.texture, e.setRenderTarget(null), e.clear(), this.fsQuad.render(e)), this.highPassUniforms.tDiffuse.value = i.texture, this.highPassUniforms.luminosityThreshold.value = this.threshold, this.fsQuad.material = this.materialHighPassFilter, e.setRenderTarget(this.renderTargetBright), e.clear(), this.fsQuad.render(e);
    let a = this.renderTargetBright;
    for (let l = 0; l < this.nMips; l++)
      this.fsQuad.material = this.separableBlurMaterials[l], this.separableBlurMaterials[l].uniforms.colorTexture.value = a.texture, this.separableBlurMaterials[l].uniforms.direction.value = wo.BlurDirectionX, e.setRenderTarget(this.renderTargetsHorizontal[l]), e.clear(), this.fsQuad.render(e), this.separableBlurMaterials[l].uniforms.colorTexture.value = this.renderTargetsHorizontal[l].texture, this.separableBlurMaterials[l].uniforms.direction.value = wo.BlurDirectionY, e.setRenderTarget(this.renderTargetsVertical[l]), e.clear(), this.fsQuad.render(e), a = this.renderTargetsVertical[l];
    this.fsQuad.material = this.compositeMaterial, this.compositeMaterial.uniforms.bloomStrength.value = this.strength, this.compositeMaterial.uniforms.bloomRadius.value = this.radius, this.compositeMaterial.uniforms.bloomTintColors.value = this.bloomTintColors, e.setRenderTarget(this.renderTargetsHorizontal[0]), e.clear(), this.fsQuad.render(e), this.fsQuad.material = this.blendMaterial, this.copyUniforms.tDiffuse.value = this.renderTargetsHorizontal[0].texture, s && e.state.buffers.stencil.setTest(!0), this.renderToScreen ? (e.setRenderTarget(null), this.fsQuad.render(e)) : (e.setRenderTarget(i), this.fsQuad.render(e)), e.setClearColor(this._oldClearColor, this.oldClearAlpha), e.autoClear = o;
  }
  getSeperableBlurMaterial(e) {
    const n = [];
    for (let i = 0; i < e; i++)
      n.push(0.39894 * Math.exp(-0.5 * i * i / (e * e)) / e);
    return new on({
      defines: {
        KERNEL_RADIUS: e
      },
      uniforms: {
        colorTexture: { value: null },
        invSize: { value: new Ie(0.5, 0.5) },
        // inverse texture size
        direction: { value: new Ie(0.5, 0.5) },
        gaussianCoefficients: { value: n }
        // precomputed Gaussian coefficients
      },
      vertexShader: `varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,
      fragmentShader: `#include <common>
				varying vec2 vUv;
				uniform sampler2D colorTexture;
				uniform vec2 invSize;
				uniform vec2 direction;
				uniform float gaussianCoefficients[KERNEL_RADIUS];

				void main() {
					float weightSum = gaussianCoefficients[0];
					vec3 diffuseSum = texture2D( colorTexture, vUv ).rgb * weightSum;
					for( int i = 1; i < KERNEL_RADIUS; i ++ ) {
						float x = float(i);
						float w = gaussianCoefficients[i];
						vec2 uvOffset = direction * invSize * x;
						vec3 sample1 = texture2D( colorTexture, vUv + uvOffset ).rgb;
						vec3 sample2 = texture2D( colorTexture, vUv - uvOffset ).rgb;
						diffuseSum += (sample1 + sample2) * w;
						weightSum += 2.0 * w;
					}
					gl_FragColor = vec4(diffuseSum/weightSum, 1.0);
				}`
    });
  }
  getCompositeMaterial(e) {
    return new on({
      defines: {
        NUM_MIPS: e
      },
      uniforms: {
        blurTexture1: { value: null },
        blurTexture2: { value: null },
        blurTexture3: { value: null },
        blurTexture4: { value: null },
        blurTexture5: { value: null },
        bloomStrength: { value: 1 },
        bloomFactors: { value: null },
        bloomTintColors: { value: null },
        bloomRadius: { value: 0 }
      },
      vertexShader: `varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,
      fragmentShader: `varying vec2 vUv;
				uniform sampler2D blurTexture1;
				uniform sampler2D blurTexture2;
				uniform sampler2D blurTexture3;
				uniform sampler2D blurTexture4;
				uniform sampler2D blurTexture5;
				uniform float bloomStrength;
				uniform float bloomRadius;
				uniform float bloomFactors[NUM_MIPS];
				uniform vec3 bloomTintColors[NUM_MIPS];

				float lerpBloomFactor(const in float factor) {
					float mirrorFactor = 1.2 - factor;
					return mix(factor, mirrorFactor, bloomRadius);
				}

				void main() {
					gl_FragColor = bloomStrength * ( lerpBloomFactor(bloomFactors[0]) * vec4(bloomTintColors[0], 1.0) * texture2D(blurTexture1, vUv) +
						lerpBloomFactor(bloomFactors[1]) * vec4(bloomTintColors[1], 1.0) * texture2D(blurTexture2, vUv) +
						lerpBloomFactor(bloomFactors[2]) * vec4(bloomTintColors[2], 1.0) * texture2D(blurTexture3, vUv) +
						lerpBloomFactor(bloomFactors[3]) * vec4(bloomTintColors[3], 1.0) * texture2D(blurTexture4, vUv) +
						lerpBloomFactor(bloomFactors[4]) * vec4(bloomTintColors[4], 1.0) * texture2D(blurTexture5, vUv) );
				}`
    });
  }
}
wo.BlurDirectionX = new Ie(1, 0);
wo.BlurDirectionY = new Ie(0, 1);
var Uo = {};
/**
 * @license React
 * react-dom-server-legacy.browser.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Fy = Dt;
function ke(t) {
  for (var e = "https://reactjs.org/docs/error-decoder.html?invariant=" + t, n = 1; n < arguments.length; n++) e += "&args[]=" + encodeURIComponent(arguments[n]);
  return "Minified React error #" + t + "; visit " + e + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
}
var gn = Object.prototype.hasOwnProperty, IR = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, Bv = {}, zv = {};
function Oy(t) {
  return gn.call(zv, t) ? !0 : gn.call(Bv, t) ? !1 : IR.test(t) ? zv[t] = !0 : (Bv[t] = !0, !1);
}
function fn(t, e, n, i, r, s, o) {
  this.acceptsBooleans = e === 2 || e === 3 || e === 4, this.attributeName = i, this.attributeNamespace = r, this.mustUseProperty = n, this.propertyName = t, this.type = e, this.sanitizeURL = s, this.removeEmptyString = o;
}
var Xt = {};
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(t) {
  Xt[t] = new fn(t, 0, !1, t, null, !1, !1);
});
[["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(t) {
  var e = t[0];
  Xt[e] = new fn(e, 1, !1, t[1], null, !1, !1);
});
["contentEditable", "draggable", "spellCheck", "value"].forEach(function(t) {
  Xt[t] = new fn(t, 2, !1, t.toLowerCase(), null, !1, !1);
});
["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(t) {
  Xt[t] = new fn(t, 2, !1, t, null, !1, !1);
});
"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(t) {
  Xt[t] = new fn(t, 3, !1, t.toLowerCase(), null, !1, !1);
});
["checked", "multiple", "muted", "selected"].forEach(function(t) {
  Xt[t] = new fn(t, 3, !0, t, null, !1, !1);
});
["capture", "download"].forEach(function(t) {
  Xt[t] = new fn(t, 4, !1, t, null, !1, !1);
});
["cols", "rows", "size", "span"].forEach(function(t) {
  Xt[t] = new fn(t, 6, !1, t, null, !1, !1);
});
["rowSpan", "start"].forEach(function(t) {
  Xt[t] = new fn(t, 5, !1, t.toLowerCase(), null, !1, !1);
});
var rm = /[\-:]([a-z])/g;
function sm(t) {
  return t[1].toUpperCase();
}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(t) {
  var e = t.replace(
    rm,
    sm
  );
  Xt[e] = new fn(e, 1, !1, t, null, !1, !1);
});
"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(t) {
  var e = t.replace(rm, sm);
  Xt[e] = new fn(e, 1, !1, t, "http://www.w3.org/1999/xlink", !1, !1);
});
["xml:base", "xml:lang", "xml:space"].forEach(function(t) {
  var e = t.replace(rm, sm);
  Xt[e] = new fn(e, 1, !1, t, "http://www.w3.org/XML/1998/namespace", !1, !1);
});
["tabIndex", "crossOrigin"].forEach(function(t) {
  Xt[t] = new fn(t, 1, !1, t.toLowerCase(), null, !1, !1);
});
Xt.xlinkHref = new fn("xlinkHref", 1, !1, "xlink:href", "http://www.w3.org/1999/xlink", !0, !1);
["src", "href", "action", "formAction"].forEach(function(t) {
  Xt[t] = new fn(t, 1, !1, t.toLowerCase(), null, !0, !0);
});
var uu = {
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
}, NR = ["Webkit", "ms", "Moz", "O"];
Object.keys(uu).forEach(function(t) {
  NR.forEach(function(e) {
    e = e + t.charAt(0).toUpperCase() + t.substring(1), uu[e] = uu[t];
  });
});
var UR = /["'&<>]/;
function sn(t) {
  if (typeof t == "boolean" || typeof t == "number") return "" + t;
  t = "" + t;
  var e = UR.exec(t);
  if (e) {
    var n = "", i, r = 0;
    for (i = e.index; i < t.length; i++) {
      switch (t.charCodeAt(i)) {
        case 34:
          e = "&quot;";
          break;
        case 38:
          e = "&amp;";
          break;
        case 39:
          e = "&#x27;";
          break;
        case 60:
          e = "&lt;";
          break;
        case 62:
          e = "&gt;";
          break;
        default:
          continue;
      }
      r !== i && (n += t.substring(r, i)), r = i + 1, n += e;
    }
    t = r !== i ? n + t.substring(r, i) : n;
  }
  return t;
}
var kR = /([A-Z])/g, FR = /^ms-/, Nh = Array.isArray;
function Ui(t, e) {
  return { insertionMode: t, selectedValue: e };
}
function OR(t, e, n) {
  switch (e) {
    case "select":
      return Ui(1, n.value != null ? n.value : n.defaultValue);
    case "svg":
      return Ui(2, null);
    case "math":
      return Ui(3, null);
    case "foreignObject":
      return Ui(1, null);
    case "table":
      return Ui(4, null);
    case "thead":
    case "tbody":
    case "tfoot":
      return Ui(5, null);
    case "colgroup":
      return Ui(7, null);
    case "tr":
      return Ui(6, null);
  }
  return 4 <= t.insertionMode || t.insertionMode === 0 ? Ui(1, null) : t;
}
var Hv = /* @__PURE__ */ new Map();
function By(t, e, n) {
  if (typeof n != "object") throw Error(ke(62));
  e = !0;
  for (var i in n) if (gn.call(n, i)) {
    var r = n[i];
    if (r != null && typeof r != "boolean" && r !== "") {
      if (i.indexOf("--") === 0) {
        var s = sn(i);
        r = sn(("" + r).trim());
      } else {
        s = i;
        var o = Hv.get(s);
        o !== void 0 || (o = sn(s.replace(kR, "-$1").toLowerCase().replace(FR, "-ms-")), Hv.set(s, o)), s = o, r = typeof r == "number" ? r === 0 || gn.call(uu, i) ? "" + r : r + "px" : sn(("" + r).trim());
      }
      e ? (e = !1, t.push(' style="', s, ":", r)) : t.push(";", s, ":", r);
    }
  }
  e || t.push('"');
}
function Ln(t, e, n, i) {
  switch (n) {
    case "style":
      By(t, e, i);
      return;
    case "defaultValue":
    case "defaultChecked":
    case "innerHTML":
    case "suppressContentEditableWarning":
    case "suppressHydrationWarning":
      return;
  }
  if (!(2 < n.length) || n[0] !== "o" && n[0] !== "O" || n[1] !== "n" && n[1] !== "N") {
    if (e = Xt.hasOwnProperty(n) ? Xt[n] : null, e !== null) {
      switch (typeof i) {
        case "function":
        case "symbol":
          return;
        case "boolean":
          if (!e.acceptsBooleans) return;
      }
      switch (n = e.attributeName, e.type) {
        case 3:
          i && t.push(" ", n, '=""');
          break;
        case 4:
          i === !0 ? t.push(" ", n, '=""') : i !== !1 && t.push(" ", n, '="', sn(i), '"');
          break;
        case 5:
          isNaN(i) || t.push(" ", n, '="', sn(i), '"');
          break;
        case 6:
          !isNaN(i) && 1 <= i && t.push(" ", n, '="', sn(i), '"');
          break;
        default:
          e.sanitizeURL && (i = "" + i), t.push(" ", n, '="', sn(i), '"');
      }
    } else if (Oy(n)) {
      switch (typeof i) {
        case "function":
        case "symbol":
          return;
        case "boolean":
          if (e = n.toLowerCase().slice(0, 5), e !== "data-" && e !== "aria-") return;
      }
      t.push(" ", n, '="', sn(i), '"');
    }
  }
}
function cu(t, e, n) {
  if (e != null) {
    if (n != null) throw Error(ke(60));
    if (typeof e != "object" || !("__html" in e)) throw Error(ke(61));
    e = e.__html, e != null && t.push("" + e);
  }
}
function BR(t) {
  var e = "";
  return Fy.Children.forEach(t, function(n) {
    n != null && (e += n);
  }), e;
}
function jf(t, e, n, i) {
  t.push(xi(n));
  var r = n = null, s;
  for (s in e) if (gn.call(e, s)) {
    var o = e[s];
    if (o != null) switch (s) {
      case "children":
        n = o;
        break;
      case "dangerouslySetInnerHTML":
        r = o;
        break;
      default:
        Ln(t, i, s, o);
    }
  }
  return t.push(">"), cu(t, r, n), typeof n == "string" ? (t.push(sn(n)), null) : n;
}
var zR = /^[a-zA-Z][a-zA-Z:_\.\-\d]*$/, Vv = /* @__PURE__ */ new Map();
function xi(t) {
  var e = Vv.get(t);
  if (e === void 0) {
    if (!zR.test(t)) throw Error(ke(65, t));
    e = "<" + t, Vv.set(t, e);
  }
  return e;
}
function HR(t, e, n, i, r) {
  switch (e) {
    case "select":
      t.push(xi("select"));
      var s = null, o = null;
      for (c in n) if (gn.call(n, c)) {
        var a = n[c];
        if (a != null) switch (c) {
          case "children":
            s = a;
            break;
          case "dangerouslySetInnerHTML":
            o = a;
            break;
          case "defaultValue":
          case "value":
            break;
          default:
            Ln(t, i, c, a);
        }
      }
      return t.push(">"), cu(t, o, s), s;
    case "option":
      o = r.selectedValue, t.push(xi("option"));
      var l = a = null, u = null, c = null;
      for (s in n) if (gn.call(n, s)) {
        var d = n[s];
        if (d != null) switch (s) {
          case "children":
            a = d;
            break;
          case "selected":
            u = d;
            break;
          case "dangerouslySetInnerHTML":
            c = d;
            break;
          case "value":
            l = d;
          default:
            Ln(t, i, s, d);
        }
      }
      if (o != null) if (n = l !== null ? "" + l : BR(a), Nh(o)) {
        for (i = 0; i < o.length; i++)
          if ("" + o[i] === n) {
            t.push(' selected=""');
            break;
          }
      } else "" + o === n && t.push(' selected=""');
      else u && t.push(' selected=""');
      return t.push(">"), cu(t, c, a), a;
    case "textarea":
      t.push(xi("textarea")), c = o = s = null;
      for (a in n) if (gn.call(n, a) && (l = n[a], l != null)) switch (a) {
        case "children":
          c = l;
          break;
        case "value":
          s = l;
          break;
        case "defaultValue":
          o = l;
          break;
        case "dangerouslySetInnerHTML":
          throw Error(ke(91));
        default:
          Ln(
            t,
            i,
            a,
            l
          );
      }
      if (s === null && o !== null && (s = o), t.push(">"), c != null) {
        if (s != null) throw Error(ke(92));
        if (Nh(c) && 1 < c.length) throw Error(ke(93));
        s = "" + c;
      }
      return typeof s == "string" && s[0] === `
` && t.push(`
`), s !== null && t.push(sn("" + s)), null;
    case "input":
      t.push(xi("input")), l = c = a = s = null;
      for (o in n) if (gn.call(n, o) && (u = n[o], u != null)) switch (o) {
        case "children":
        case "dangerouslySetInnerHTML":
          throw Error(ke(399, "input"));
        case "defaultChecked":
          l = u;
          break;
        case "defaultValue":
          a = u;
          break;
        case "checked":
          c = u;
          break;
        case "value":
          s = u;
          break;
        default:
          Ln(t, i, o, u);
      }
      return c !== null ? Ln(t, i, "checked", c) : l !== null && Ln(t, i, "checked", l), s !== null ? Ln(t, i, "value", s) : a !== null && Ln(t, i, "value", a), t.push("/>"), null;
    case "menuitem":
      t.push(xi("menuitem"));
      for (var h in n) if (gn.call(n, h) && (s = n[h], s != null)) switch (h) {
        case "children":
        case "dangerouslySetInnerHTML":
          throw Error(ke(400));
        default:
          Ln(t, i, h, s);
      }
      return t.push(">"), null;
    case "title":
      t.push(xi("title")), s = null;
      for (d in n) if (gn.call(n, d) && (o = n[d], o != null)) switch (d) {
        case "children":
          s = o;
          break;
        case "dangerouslySetInnerHTML":
          throw Error(ke(434));
        default:
          Ln(t, i, d, o);
      }
      return t.push(">"), s;
    case "listing":
    case "pre":
      t.push(xi(e)), o = s = null;
      for (l in n) if (gn.call(n, l) && (a = n[l], a != null)) switch (l) {
        case "children":
          s = a;
          break;
        case "dangerouslySetInnerHTML":
          o = a;
          break;
        default:
          Ln(t, i, l, a);
      }
      if (t.push(">"), o != null) {
        if (s != null) throw Error(ke(60));
        if (typeof o != "object" || !("__html" in o)) throw Error(ke(61));
        n = o.__html, n != null && (typeof n == "string" && 0 < n.length && n[0] === `
` ? t.push(`
`, n) : t.push("" + n));
      }
      return typeof s == "string" && s[0] === `
` && t.push(`
`), s;
    case "area":
    case "base":
    case "br":
    case "col":
    case "embed":
    case "hr":
    case "img":
    case "keygen":
    case "link":
    case "meta":
    case "param":
    case "source":
    case "track":
    case "wbr":
      t.push(xi(e));
      for (var p in n) if (gn.call(n, p) && (s = n[p], s != null)) switch (p) {
        case "children":
        case "dangerouslySetInnerHTML":
          throw Error(ke(399, e));
        default:
          Ln(t, i, p, s);
      }
      return t.push("/>"), null;
    case "annotation-xml":
    case "color-profile":
    case "font-face":
    case "font-face-src":
    case "font-face-uri":
    case "font-face-format":
    case "font-face-name":
    case "missing-glyph":
      return jf(
        t,
        n,
        e,
        i
      );
    case "html":
      return r.insertionMode === 0 && t.push("<!DOCTYPE html>"), jf(t, n, e, i);
    default:
      if (e.indexOf("-") === -1 && typeof n.is != "string") return jf(t, n, e, i);
      t.push(xi(e)), o = s = null;
      for (u in n) if (gn.call(n, u) && (a = n[u], a != null)) switch (u) {
        case "children":
          s = a;
          break;
        case "dangerouslySetInnerHTML":
          o = a;
          break;
        case "style":
          By(t, i, a);
          break;
        case "suppressContentEditableWarning":
        case "suppressHydrationWarning":
          break;
        default:
          Oy(u) && typeof a != "function" && typeof a != "symbol" && t.push(" ", u, '="', sn(a), '"');
      }
      return t.push(">"), cu(t, o, s), s;
  }
}
function Gv(t, e, n) {
  if (t.push('<!--$?--><template id="'), n === null) throw Error(ke(395));
  return t.push(n), t.push('"></template>');
}
function VR(t, e, n, i) {
  switch (n.insertionMode) {
    case 0:
    case 1:
      return t.push('<div hidden id="'), t.push(e.segmentPrefix), e = i.toString(16), t.push(e), t.push('">');
    case 2:
      return t.push('<svg aria-hidden="true" style="display:none" id="'), t.push(e.segmentPrefix), e = i.toString(16), t.push(e), t.push('">');
    case 3:
      return t.push('<math aria-hidden="true" style="display:none" id="'), t.push(e.segmentPrefix), e = i.toString(16), t.push(e), t.push('">');
    case 4:
      return t.push('<table hidden id="'), t.push(e.segmentPrefix), e = i.toString(16), t.push(e), t.push('">');
    case 5:
      return t.push('<table hidden><tbody id="'), t.push(e.segmentPrefix), e = i.toString(16), t.push(e), t.push('">');
    case 6:
      return t.push('<table hidden><tr id="'), t.push(e.segmentPrefix), e = i.toString(16), t.push(e), t.push('">');
    case 7:
      return t.push('<table hidden><colgroup id="'), t.push(e.segmentPrefix), e = i.toString(16), t.push(e), t.push('">');
    default:
      throw Error(ke(397));
  }
}
function GR(t, e) {
  switch (e.insertionMode) {
    case 0:
    case 1:
      return t.push("</div>");
    case 2:
      return t.push("</svg>");
    case 3:
      return t.push("</math>");
    case 4:
      return t.push("</table>");
    case 5:
      return t.push("</tbody></table>");
    case 6:
      return t.push("</tr></table>");
    case 7:
      return t.push("</colgroup></table>");
    default:
      throw Error(ke(397));
  }
}
var WR = /[<\u2028\u2029]/g;
function Xf(t) {
  return JSON.stringify(t).replace(WR, function(e) {
    switch (e) {
      case "<":
        return "\\u003c";
      case "\u2028":
        return "\\u2028";
      case "\u2029":
        return "\\u2029";
      default:
        throw Error("escapeJSStringsForInstructionScripts encountered a match it does not know how to replace. this means the match regex and the replacement characters are no longer in sync. This is a bug in React");
    }
  });
}
function $R(t, e) {
  return e = e === void 0 ? "" : e, { bootstrapChunks: [], startInlineScript: "<script>", placeholderPrefix: e + "P:", segmentPrefix: e + "S:", boundaryPrefix: e + "B:", idPrefix: e, nextSuspenseID: 0, sentCompleteSegmentFunction: !1, sentCompleteBoundaryFunction: !1, sentClientRenderFunction: !1, generateStaticMarkup: t };
}
function Wv(t, e, n, i) {
  return n.generateStaticMarkup ? (t.push(sn(e)), !1) : (e === "" ? t = i : (i && t.push("<!-- -->"), t.push(sn(e)), t = !0), t);
}
var xa = Object.assign, jR = Symbol.for("react.element"), zy = Symbol.for("react.portal"), Hy = Symbol.for("react.fragment"), Vy = Symbol.for("react.strict_mode"), Gy = Symbol.for("react.profiler"), Wy = Symbol.for("react.provider"), $y = Symbol.for("react.context"), jy = Symbol.for("react.forward_ref"), Xy = Symbol.for("react.suspense"), Yy = Symbol.for("react.suspense_list"), qy = Symbol.for("react.memo"), om = Symbol.for("react.lazy"), XR = Symbol.for("react.scope"), YR = Symbol.for("react.debug_trace_mode"), qR = Symbol.for("react.legacy_hidden"), KR = Symbol.for("react.default_value"), $v = Symbol.iterator;
function Uh(t) {
  if (t == null) return null;
  if (typeof t == "function") return t.displayName || t.name || null;
  if (typeof t == "string") return t;
  switch (t) {
    case Hy:
      return "Fragment";
    case zy:
      return "Portal";
    case Gy:
      return "Profiler";
    case Vy:
      return "StrictMode";
    case Xy:
      return "Suspense";
    case Yy:
      return "SuspenseList";
  }
  if (typeof t == "object") switch (t.$$typeof) {
    case $y:
      return (t.displayName || "Context") + ".Consumer";
    case Wy:
      return (t._context.displayName || "Context") + ".Provider";
    case jy:
      var e = t.render;
      return t = t.displayName, t || (t = e.displayName || e.name || "", t = t !== "" ? "ForwardRef(" + t + ")" : "ForwardRef"), t;
    case qy:
      return e = t.displayName || null, e !== null ? e : Uh(t.type) || "Memo";
    case om:
      e = t._payload, t = t._init;
      try {
        return Uh(t(e));
      } catch {
      }
  }
  return null;
}
var Ky = {};
function jv(t, e) {
  if (t = t.contextTypes, !t) return Ky;
  var n = {}, i;
  for (i in t) n[i] = e[i];
  return n;
}
var ls = null;
function Tc(t, e) {
  if (t !== e) {
    t.context._currentValue2 = t.parentValue, t = t.parent;
    var n = e.parent;
    if (t === null) {
      if (n !== null) throw Error(ke(401));
    } else {
      if (n === null) throw Error(ke(401));
      Tc(t, n);
    }
    e.context._currentValue2 = e.value;
  }
}
function Zy(t) {
  t.context._currentValue2 = t.parentValue, t = t.parent, t !== null && Zy(t);
}
function Qy(t) {
  var e = t.parent;
  e !== null && Qy(e), t.context._currentValue2 = t.value;
}
function Jy(t, e) {
  if (t.context._currentValue2 = t.parentValue, t = t.parent, t === null) throw Error(ke(402));
  t.depth === e.depth ? Tc(t, e) : Jy(t, e);
}
function eS(t, e) {
  var n = e.parent;
  if (n === null) throw Error(ke(402));
  t.depth === n.depth ? Tc(t, n) : eS(t, n), e.context._currentValue2 = e.value;
}
function qu(t) {
  var e = ls;
  e !== t && (e === null ? Qy(t) : t === null ? Zy(e) : e.depth === t.depth ? Tc(e, t) : e.depth > t.depth ? Jy(e, t) : eS(e, t), ls = t);
}
var Xv = { isMounted: function() {
  return !1;
}, enqueueSetState: function(t, e) {
  t = t._reactInternals, t.queue !== null && t.queue.push(e);
}, enqueueReplaceState: function(t, e) {
  t = t._reactInternals, t.replace = !0, t.queue = [e];
}, enqueueForceUpdate: function() {
} };
function Yv(t, e, n, i) {
  var r = t.state !== void 0 ? t.state : null;
  t.updater = Xv, t.props = n, t.state = r;
  var s = { queue: [], replace: !1 };
  t._reactInternals = s;
  var o = e.contextType;
  if (t.context = typeof o == "object" && o !== null ? o._currentValue2 : i, o = e.getDerivedStateFromProps, typeof o == "function" && (o = o(n, r), r = o == null ? r : xa({}, r, o), t.state = r), typeof e.getDerivedStateFromProps != "function" && typeof t.getSnapshotBeforeUpdate != "function" && (typeof t.UNSAFE_componentWillMount == "function" || typeof t.componentWillMount == "function")) if (e = t.state, typeof t.componentWillMount == "function" && t.componentWillMount(), typeof t.UNSAFE_componentWillMount == "function" && t.UNSAFE_componentWillMount(), e !== t.state && Xv.enqueueReplaceState(t, t.state, null), s.queue !== null && 0 < s.queue.length) if (e = s.queue, o = s.replace, s.queue = null, s.replace = !1, o && e.length === 1) t.state = e[0];
  else {
    for (s = o ? e[0] : t.state, r = !0, o = o ? 1 : 0; o < e.length; o++) {
      var a = e[o];
      a = typeof a == "function" ? a.call(t, s, n, i) : a, a != null && (r ? (r = !1, s = xa({}, s, a)) : xa(s, a));
    }
    t.state = s;
  }
  else s.queue = null;
}
var ZR = { id: 1, overflow: "" };
function kh(t, e, n) {
  var i = t.id;
  t = t.overflow;
  var r = 32 - fu(i) - 1;
  i &= ~(1 << r), n += 1;
  var s = 32 - fu(e) + r;
  if (30 < s) {
    var o = r - r % 5;
    return s = (i & (1 << o) - 1).toString(32), i >>= o, r -= o, { id: 1 << 32 - fu(e) + r | n << r | i, overflow: s + t };
  }
  return { id: 1 << s | n << r | i, overflow: t };
}
var fu = Math.clz32 ? Math.clz32 : eb, QR = Math.log, JR = Math.LN2;
function eb(t) {
  return t >>>= 0, t === 0 ? 32 : 31 - (QR(t) / JR | 0) | 0;
}
function tb(t, e) {
  return t === e && (t !== 0 || 1 / t === 1 / e) || t !== t && e !== e;
}
var nb = typeof Object.is == "function" ? Object.is : tb, er = null, am = null, du = null, at = null, ra = !1, Ku = !1, za = 0, Mr = null, Cc = 0;
function es() {
  if (er === null) throw Error(ke(321));
  return er;
}
function qv() {
  if (0 < Cc) throw Error(ke(312));
  return { memoizedState: null, queue: null, next: null };
}
function lm() {
  return at === null ? du === null ? (ra = !1, du = at = qv()) : (ra = !0, at = du) : at.next === null ? (ra = !1, at = at.next = qv()) : (ra = !0, at = at.next), at;
}
function um() {
  am = er = null, Ku = !1, du = null, Cc = 0, at = Mr = null;
}
function tS(t, e) {
  return typeof e == "function" ? e(t) : e;
}
function Kv(t, e, n) {
  if (er = es(), at = lm(), ra) {
    var i = at.queue;
    if (e = i.dispatch, Mr !== null && (n = Mr.get(i), n !== void 0)) {
      Mr.delete(i), i = at.memoizedState;
      do
        i = t(i, n.action), n = n.next;
      while (n !== null);
      return at.memoizedState = i, [i, e];
    }
    return [at.memoizedState, e];
  }
  return t = t === tS ? typeof e == "function" ? e() : e : n !== void 0 ? n(e) : e, at.memoizedState = t, t = at.queue = { last: null, dispatch: null }, t = t.dispatch = ib.bind(null, er, t), [at.memoizedState, t];
}
function Zv(t, e) {
  if (er = es(), at = lm(), e = e === void 0 ? null : e, at !== null) {
    var n = at.memoizedState;
    if (n !== null && e !== null) {
      var i = n[1];
      e: if (i === null) i = !1;
      else {
        for (var r = 0; r < i.length && r < e.length; r++) if (!nb(e[r], i[r])) {
          i = !1;
          break e;
        }
        i = !0;
      }
      if (i) return n[0];
    }
  }
  return t = t(), at.memoizedState = [t, e], t;
}
function ib(t, e, n) {
  if (25 <= Cc) throw Error(ke(301));
  if (t === er) if (Ku = !0, t = { action: n, next: null }, Mr === null && (Mr = /* @__PURE__ */ new Map()), n = Mr.get(e), n === void 0) Mr.set(e, t);
  else {
    for (e = n; e.next !== null; ) e = e.next;
    e.next = t;
  }
}
function rb() {
  throw Error(ke(394));
}
function zl() {
}
var Qv = { readContext: function(t) {
  return t._currentValue2;
}, useContext: function(t) {
  return es(), t._currentValue2;
}, useMemo: Zv, useReducer: Kv, useRef: function(t) {
  er = es(), at = lm();
  var e = at.memoizedState;
  return e === null ? (t = { current: t }, at.memoizedState = t) : e;
}, useState: function(t) {
  return Kv(tS, t);
}, useInsertionEffect: zl, useLayoutEffect: function() {
}, useCallback: function(t, e) {
  return Zv(function() {
    return t;
  }, e);
}, useImperativeHandle: zl, useEffect: zl, useDebugValue: zl, useDeferredValue: function(t) {
  return es(), t;
}, useTransition: function() {
  return es(), [
    !1,
    rb
  ];
}, useId: function() {
  var t = am.treeContext, e = t.overflow;
  t = t.id, t = (t & ~(1 << 32 - fu(t) - 1)).toString(32) + e;
  var n = hu;
  if (n === null) throw Error(ke(404));
  return e = za++, t = ":" + n.idPrefix + "R" + t, 0 < e && (t += "H" + e.toString(32)), t + ":";
}, useMutableSource: function(t, e) {
  return es(), e(t._source);
}, useSyncExternalStore: function(t, e, n) {
  if (n === void 0) throw Error(ke(407));
  return n();
} }, hu = null, Yf = Fy.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentDispatcher;
function sb(t) {
  return console.error(t), null;
}
function sa() {
}
function ob(t, e, n, i, r, s, o, a, l) {
  var u = [], c = /* @__PURE__ */ new Set();
  return e = { destination: null, responseState: e, progressiveChunkSize: i === void 0 ? 12800 : i, status: 0, fatalError: null, nextSegmentId: 0, allPendingTasks: 0, pendingRootTasks: 0, completedRootSegment: null, abortableTasks: c, pingedTasks: u, clientRenderedBoundaries: [], completedBoundaries: [], partialBoundaries: [], onError: r === void 0 ? sb : r, onAllReady: sa, onShellReady: o === void 0 ? sa : o, onShellError: sa, onFatalError: sa }, n = Zu(e, 0, null, n, !1, !1), n.parentFlushed = !0, t = cm(e, t, null, n, c, Ky, null, ZR), u.push(t), e;
}
function cm(t, e, n, i, r, s, o, a) {
  t.allPendingTasks++, n === null ? t.pendingRootTasks++ : n.pendingTasks++;
  var l = { node: e, ping: function() {
    var u = t.pingedTasks;
    u.push(l), u.length === 1 && rS(t);
  }, blockedBoundary: n, blockedSegment: i, abortSet: r, legacyContext: s, context: o, treeContext: a };
  return r.add(l), l;
}
function Zu(t, e, n, i, r, s) {
  return { status: 0, id: -1, index: e, parentFlushed: !1, chunks: [], children: [], formatContext: i, boundary: n, lastPushedText: r, textEmbedded: s };
}
function Ha(t, e) {
  if (t = t.onError(e), t != null && typeof t != "string") throw Error('onError returned something with a type other than "string". onError should return a string and may return null or undefined but must not return anything else. It received something of type "' + typeof t + '" instead');
  return t;
}
function Qu(t, e) {
  var n = t.onShellError;
  n(e), n = t.onFatalError, n(e), t.destination !== null ? (t.status = 2, t.destination.destroy(e)) : (t.status = 1, t.fatalError = e);
}
function Jv(t, e, n, i, r) {
  for (er = {}, am = e, za = 0, t = n(i, r); Ku; ) Ku = !1, za = 0, Cc += 1, at = null, t = n(i, r);
  return um(), t;
}
function e0(t, e, n, i) {
  var r = n.render(), s = i.childContextTypes;
  if (s != null) {
    var o = e.legacyContext;
    if (typeof n.getChildContext != "function") i = o;
    else {
      n = n.getChildContext();
      for (var a in n) if (!(a in s)) throw Error(ke(108, Uh(i) || "Unknown", a));
      i = xa({}, o, n);
    }
    e.legacyContext = i, Nn(t, e, r), e.legacyContext = o;
  } else Nn(t, e, r);
}
function t0(t, e) {
  if (t && t.defaultProps) {
    e = xa({}, e), t = t.defaultProps;
    for (var n in t) e[n] === void 0 && (e[n] = t[n]);
    return e;
  }
  return e;
}
function Fh(t, e, n, i, r) {
  if (typeof n == "function") if (n.prototype && n.prototype.isReactComponent) {
    r = jv(n, e.legacyContext);
    var s = n.contextType;
    s = new n(i, typeof s == "object" && s !== null ? s._currentValue2 : r), Yv(s, n, i, r), e0(t, e, s, n);
  } else {
    s = jv(n, e.legacyContext), r = Jv(t, e, n, i, s);
    var o = za !== 0;
    if (typeof r == "object" && r !== null && typeof r.render == "function" && r.$$typeof === void 0) Yv(r, n, i, s), e0(t, e, r, n);
    else if (o) {
      i = e.treeContext, e.treeContext = kh(i, 1, 0);
      try {
        Nn(t, e, r);
      } finally {
        e.treeContext = i;
      }
    } else Nn(t, e, r);
  }
  else if (typeof n == "string") {
    switch (r = e.blockedSegment, s = HR(r.chunks, n, i, t.responseState, r.formatContext), r.lastPushedText = !1, o = r.formatContext, r.formatContext = OR(o, n, i), Oh(t, e, s), r.formatContext = o, n) {
      case "area":
      case "base":
      case "br":
      case "col":
      case "embed":
      case "hr":
      case "img":
      case "input":
      case "keygen":
      case "link":
      case "meta":
      case "param":
      case "source":
      case "track":
      case "wbr":
        break;
      default:
        r.chunks.push("</", n, ">");
    }
    r.lastPushedText = !1;
  } else {
    switch (n) {
      case qR:
      case YR:
      case Vy:
      case Gy:
      case Hy:
        Nn(t, e, i.children);
        return;
      case Yy:
        Nn(t, e, i.children);
        return;
      case XR:
        throw Error(ke(343));
      case Xy:
        e: {
          n = e.blockedBoundary, r = e.blockedSegment, s = i.fallback, i = i.children, o = /* @__PURE__ */ new Set();
          var a = { id: null, rootSegmentID: -1, parentFlushed: !1, pendingTasks: 0, forceClientRender: !1, completedSegments: [], byteSize: 0, fallbackAbortableTasks: o, errorDigest: null }, l = Zu(t, r.chunks.length, a, r.formatContext, !1, !1);
          r.children.push(l), r.lastPushedText = !1;
          var u = Zu(t, 0, null, r.formatContext, !1, !1);
          u.parentFlushed = !0, e.blockedBoundary = a, e.blockedSegment = u;
          try {
            if (Oh(
              t,
              e,
              i
            ), t.responseState.generateStaticMarkup || u.lastPushedText && u.textEmbedded && u.chunks.push("<!-- -->"), u.status = 1, Ju(a, u), a.pendingTasks === 0) break e;
          } catch (c) {
            u.status = 4, a.forceClientRender = !0, a.errorDigest = Ha(t, c);
          } finally {
            e.blockedBoundary = n, e.blockedSegment = r;
          }
          e = cm(t, s, n, l, o, e.legacyContext, e.context, e.treeContext), t.pingedTasks.push(e);
        }
        return;
    }
    if (typeof n == "object" && n !== null) switch (n.$$typeof) {
      case jy:
        if (i = Jv(t, e, n.render, i, r), za !== 0) {
          n = e.treeContext, e.treeContext = kh(n, 1, 0);
          try {
            Nn(t, e, i);
          } finally {
            e.treeContext = n;
          }
        } else Nn(t, e, i);
        return;
      case qy:
        n = n.type, i = t0(n, i), Fh(t, e, n, i, r);
        return;
      case Wy:
        if (r = i.children, n = n._context, i = i.value, s = n._currentValue2, n._currentValue2 = i, o = ls, ls = i = { parent: o, depth: o === null ? 0 : o.depth + 1, context: n, parentValue: s, value: i }, e.context = i, Nn(t, e, r), t = ls, t === null) throw Error(ke(403));
        i = t.parentValue, t.context._currentValue2 = i === KR ? t.context._defaultValue : i, t = ls = t.parent, e.context = t;
        return;
      case $y:
        i = i.children, i = i(n._currentValue2), Nn(t, e, i);
        return;
      case om:
        r = n._init, n = r(n._payload), i = t0(n, i), Fh(
          t,
          e,
          n,
          i,
          void 0
        );
        return;
    }
    throw Error(ke(130, n == null ? n : typeof n, ""));
  }
}
function Nn(t, e, n) {
  if (e.node = n, typeof n == "object" && n !== null) {
    switch (n.$$typeof) {
      case jR:
        Fh(t, e, n.type, n.props, n.ref);
        return;
      case zy:
        throw Error(ke(257));
      case om:
        var i = n._init;
        n = i(n._payload), Nn(t, e, n);
        return;
    }
    if (Nh(n)) {
      n0(t, e, n);
      return;
    }
    if (n === null || typeof n != "object" ? i = null : (i = $v && n[$v] || n["@@iterator"], i = typeof i == "function" ? i : null), i && (i = i.call(n))) {
      if (n = i.next(), !n.done) {
        var r = [];
        do
          r.push(n.value), n = i.next();
        while (!n.done);
        n0(t, e, r);
      }
      return;
    }
    throw t = Object.prototype.toString.call(n), Error(ke(31, t === "[object Object]" ? "object with keys {" + Object.keys(n).join(", ") + "}" : t));
  }
  typeof n == "string" ? (i = e.blockedSegment, i.lastPushedText = Wv(e.blockedSegment.chunks, n, t.responseState, i.lastPushedText)) : typeof n == "number" && (i = e.blockedSegment, i.lastPushedText = Wv(e.blockedSegment.chunks, "" + n, t.responseState, i.lastPushedText));
}
function n0(t, e, n) {
  for (var i = n.length, r = 0; r < i; r++) {
    var s = e.treeContext;
    e.treeContext = kh(s, i, r);
    try {
      Oh(t, e, n[r]);
    } finally {
      e.treeContext = s;
    }
  }
}
function Oh(t, e, n) {
  var i = e.blockedSegment.formatContext, r = e.legacyContext, s = e.context;
  try {
    return Nn(t, e, n);
  } catch (l) {
    if (um(), typeof l == "object" && l !== null && typeof l.then == "function") {
      n = l;
      var o = e.blockedSegment, a = Zu(t, o.chunks.length, null, o.formatContext, o.lastPushedText, !0);
      o.children.push(a), o.lastPushedText = !1, t = cm(t, e.node, e.blockedBoundary, a, e.abortSet, e.legacyContext, e.context, e.treeContext).ping, n.then(t, t), e.blockedSegment.formatContext = i, e.legacyContext = r, e.context = s, qu(s);
    } else throw e.blockedSegment.formatContext = i, e.legacyContext = r, e.context = s, qu(s), l;
  }
}
function ab(t) {
  var e = t.blockedBoundary;
  t = t.blockedSegment, t.status = 3, iS(this, e, t);
}
function nS(t, e, n) {
  var i = t.blockedBoundary;
  t.blockedSegment.status = 3, i === null ? (e.allPendingTasks--, e.status !== 2 && (e.status = 2, e.destination !== null && e.destination.push(null))) : (i.pendingTasks--, i.forceClientRender || (i.forceClientRender = !0, t = n === void 0 ? Error(ke(432)) : n, i.errorDigest = e.onError(t), i.parentFlushed && e.clientRenderedBoundaries.push(i)), i.fallbackAbortableTasks.forEach(function(r) {
    return nS(r, e, n);
  }), i.fallbackAbortableTasks.clear(), e.allPendingTasks--, e.allPendingTasks === 0 && (i = e.onAllReady, i()));
}
function Ju(t, e) {
  if (e.chunks.length === 0 && e.children.length === 1 && e.children[0].boundary === null) {
    var n = e.children[0];
    n.id = e.id, n.parentFlushed = !0, n.status === 1 && Ju(t, n);
  } else t.completedSegments.push(e);
}
function iS(t, e, n) {
  if (e === null) {
    if (n.parentFlushed) {
      if (t.completedRootSegment !== null) throw Error(ke(389));
      t.completedRootSegment = n;
    }
    t.pendingRootTasks--, t.pendingRootTasks === 0 && (t.onShellError = sa, e = t.onShellReady, e());
  } else e.pendingTasks--, e.forceClientRender || (e.pendingTasks === 0 ? (n.parentFlushed && n.status === 1 && Ju(e, n), e.parentFlushed && t.completedBoundaries.push(e), e.fallbackAbortableTasks.forEach(ab, t), e.fallbackAbortableTasks.clear()) : n.parentFlushed && n.status === 1 && (Ju(e, n), e.completedSegments.length === 1 && e.parentFlushed && t.partialBoundaries.push(e)));
  t.allPendingTasks--, t.allPendingTasks === 0 && (t = t.onAllReady, t());
}
function rS(t) {
  if (t.status !== 2) {
    var e = ls, n = Yf.current;
    Yf.current = Qv;
    var i = hu;
    hu = t.responseState;
    try {
      var r = t.pingedTasks, s;
      for (s = 0; s < r.length; s++) {
        var o = r[s], a = t, l = o.blockedSegment;
        if (l.status === 0) {
          qu(o.context);
          try {
            Nn(a, o, o.node), a.responseState.generateStaticMarkup || l.lastPushedText && l.textEmbedded && l.chunks.push("<!-- -->"), o.abortSet.delete(o), l.status = 1, iS(a, o.blockedBoundary, l);
          } catch (_) {
            if (um(), typeof _ == "object" && _ !== null && typeof _.then == "function") {
              var u = o.ping;
              _.then(u, u);
            } else {
              o.abortSet.delete(o), l.status = 4;
              var c = o.blockedBoundary, d = _, h = Ha(a, d);
              if (c === null ? Qu(a, d) : (c.pendingTasks--, c.forceClientRender || (c.forceClientRender = !0, c.errorDigest = h, c.parentFlushed && a.clientRenderedBoundaries.push(c))), a.allPendingTasks--, a.allPendingTasks === 0) {
                var p = a.onAllReady;
                p();
              }
            }
          } finally {
          }
        }
      }
      r.splice(0, s), t.destination !== null && fm(t, t.destination);
    } catch (_) {
      Ha(t, _), Qu(t, _);
    } finally {
      hu = i, Yf.current = n, n === Qv && qu(e);
    }
  }
}
function Hl(t, e, n) {
  switch (n.parentFlushed = !0, n.status) {
    case 0:
      var i = n.id = t.nextSegmentId++;
      return n.lastPushedText = !1, n.textEmbedded = !1, t = t.responseState, e.push('<template id="'), e.push(t.placeholderPrefix), t = i.toString(16), e.push(t), e.push('"></template>');
    case 1:
      n.status = 2;
      var r = !0;
      i = n.chunks;
      var s = 0;
      n = n.children;
      for (var o = 0; o < n.length; o++) {
        for (r = n[o]; s < r.index; s++) e.push(i[s]);
        r = Ac(t, e, r);
      }
      for (; s < i.length - 1; s++) e.push(i[s]);
      return s < i.length && (r = e.push(i[s])), r;
    default:
      throw Error(ke(390));
  }
}
function Ac(t, e, n) {
  var i = n.boundary;
  if (i === null) return Hl(t, e, n);
  if (i.parentFlushed = !0, i.forceClientRender) return t.responseState.generateStaticMarkup || (i = i.errorDigest, e.push("<!--$!-->"), e.push("<template"), i && (e.push(' data-dgst="'), i = sn(i), e.push(i), e.push('"')), e.push("></template>")), Hl(t, e, n), t = t.responseState.generateStaticMarkup ? !0 : e.push("<!--/$-->"), t;
  if (0 < i.pendingTasks) {
    i.rootSegmentID = t.nextSegmentId++, 0 < i.completedSegments.length && t.partialBoundaries.push(i);
    var r = t.responseState, s = r.nextSuspenseID++;
    return r = r.boundaryPrefix + s.toString(16), i = i.id = r, Gv(e, t.responseState, i), Hl(t, e, n), e.push("<!--/$-->");
  }
  if (i.byteSize > t.progressiveChunkSize) return i.rootSegmentID = t.nextSegmentId++, t.completedBoundaries.push(i), Gv(e, t.responseState, i.id), Hl(t, e, n), e.push("<!--/$-->");
  if (t.responseState.generateStaticMarkup || e.push("<!--$-->"), n = i.completedSegments, n.length !== 1) throw Error(ke(391));
  return Ac(t, e, n[0]), t = t.responseState.generateStaticMarkup ? !0 : e.push("<!--/$-->"), t;
}
function i0(t, e, n) {
  return VR(e, t.responseState, n.formatContext, n.id), Ac(t, e, n), GR(e, n.formatContext);
}
function r0(t, e, n) {
  for (var i = n.completedSegments, r = 0; r < i.length; r++) sS(t, e, n, i[r]);
  if (i.length = 0, t = t.responseState, i = n.id, n = n.rootSegmentID, e.push(t.startInlineScript), t.sentCompleteBoundaryFunction ? e.push('$RC("') : (t.sentCompleteBoundaryFunction = !0, e.push('function $RC(a,b){a=document.getElementById(a);b=document.getElementById(b);b.parentNode.removeChild(b);if(a){a=a.previousSibling;var f=a.parentNode,c=a.nextSibling,e=0;do{if(c&&8===c.nodeType){var d=c.data;if("/$"===d)if(0===e)break;else e--;else"$"!==d&&"$?"!==d&&"$!"!==d||e++}d=c.nextSibling;f.removeChild(c);c=d}while(c);for(;b.firstChild;)f.insertBefore(b.firstChild,c);a.data="$";a._reactRetry&&a._reactRetry()}};$RC("')), i === null) throw Error(ke(395));
  return n = n.toString(16), e.push(i), e.push('","'), e.push(t.segmentPrefix), e.push(n), e.push('")<\/script>');
}
function sS(t, e, n, i) {
  if (i.status === 2) return !0;
  var r = i.id;
  if (r === -1) {
    if ((i.id = n.rootSegmentID) === -1) throw Error(ke(392));
    return i0(t, e, i);
  }
  return i0(t, e, i), t = t.responseState, e.push(t.startInlineScript), t.sentCompleteSegmentFunction ? e.push('$RS("') : (t.sentCompleteSegmentFunction = !0, e.push('function $RS(a,b){a=document.getElementById(a);b=document.getElementById(b);for(a.parentNode.removeChild(a);a.firstChild;)b.parentNode.insertBefore(a.firstChild,b);b.parentNode.removeChild(b)};$RS("')), e.push(t.segmentPrefix), r = r.toString(16), e.push(r), e.push('","'), e.push(t.placeholderPrefix), e.push(r), e.push('")<\/script>');
}
function fm(t, e) {
  try {
    var n = t.completedRootSegment;
    if (n !== null && t.pendingRootTasks === 0) {
      Ac(t, e, n), t.completedRootSegment = null;
      var i = t.responseState.bootstrapChunks;
      for (n = 0; n < i.length - 1; n++) e.push(i[n]);
      n < i.length && e.push(i[n]);
    }
    var r = t.clientRenderedBoundaries, s;
    for (s = 0; s < r.length; s++) {
      var o = r[s];
      i = e;
      var a = t.responseState, l = o.id, u = o.errorDigest, c = o.errorMessage, d = o.errorComponentStack;
      if (i.push(a.startInlineScript), a.sentClientRenderFunction ? i.push('$RX("') : (a.sentClientRenderFunction = !0, i.push('function $RX(b,c,d,e){var a=document.getElementById(b);a&&(b=a.previousSibling,b.data="$!",a=a.dataset,c&&(a.dgst=c),d&&(a.msg=d),e&&(a.stck=e),b._reactRetry&&b._reactRetry())};$RX("')), l === null) throw Error(ke(395));
      if (i.push(l), i.push('"'), u || c || d) {
        i.push(",");
        var h = Xf(u || "");
        i.push(h);
      }
      if (c || d) {
        i.push(",");
        var p = Xf(c || "");
        i.push(p);
      }
      if (d) {
        i.push(",");
        var _ = Xf(d);
        i.push(_);
      }
      if (!i.push(")<\/script>")) {
        t.destination = null, s++, r.splice(0, s);
        return;
      }
    }
    r.splice(0, s);
    var y = t.completedBoundaries;
    for (s = 0; s < y.length; s++) if (!r0(t, e, y[s])) {
      t.destination = null, s++, y.splice(0, s);
      return;
    }
    y.splice(0, s);
    var m = t.partialBoundaries;
    for (s = 0; s < m.length; s++) {
      var f = m[s];
      e: {
        r = t, o = e;
        var v = f.completedSegments;
        for (a = 0; a < v.length; a++) if (!sS(r, o, f, v[a])) {
          a++, v.splice(0, a);
          var g = !1;
          break e;
        }
        v.splice(0, a), g = !0;
      }
      if (!g) {
        t.destination = null, s++, m.splice(0, s);
        return;
      }
    }
    m.splice(0, s);
    var M = t.completedBoundaries;
    for (s = 0; s < M.length; s++) if (!r0(t, e, M[s])) {
      t.destination = null, s++, M.splice(0, s);
      return;
    }
    M.splice(0, s);
  } finally {
    t.allPendingTasks === 0 && t.pingedTasks.length === 0 && t.clientRenderedBoundaries.length === 0 && t.completedBoundaries.length === 0 && e.push(null);
  }
}
function lb(t, e) {
  try {
    var n = t.abortableTasks;
    n.forEach(function(i) {
      return nS(i, t, e);
    }), n.clear(), t.destination !== null && fm(t, t.destination);
  } catch (i) {
    Ha(t, i), Qu(t, i);
  }
}
function ub() {
}
function oS(t, e, n, i) {
  var r = !1, s = null, o = "", a = { push: function(u) {
    return u !== null && (o += u), !0;
  }, destroy: function(u) {
    r = !0, s = u;
  } }, l = !1;
  if (t = ob(t, $R(n, e ? e.identifierPrefix : void 0), { insertionMode: 1, selectedValue: null }, 1 / 0, ub, void 0, function() {
    l = !0;
  }), rS(t), lb(t, i), t.status === 1) t.status = 2, a.destroy(t.fatalError);
  else if (t.status !== 2 && t.destination === null) {
    t.destination = a;
    try {
      fm(t, a);
    } catch (u) {
      Ha(t, u), Qu(t, u);
    }
  }
  if (r) throw s;
  if (!l) throw Error(ke(426));
  return o;
}
Uo.renderToNodeStream = function() {
  throw Error(ke(207));
};
Uo.renderToStaticMarkup = function(t, e) {
  return oS(t, e, !0, 'The server used "renderToStaticMarkup" which does not support Suspense. If you intended to have the server wait for the suspended component please switch to "renderToReadableStream" which supports Suspense on the server');
};
Uo.renderToStaticNodeStream = function() {
  throw Error(ke(208));
};
Uo.renderToString = function(t, e) {
  return oS(t, e, !1, 'The server used "renderToString" which does not support Suspense. If you intended for this Suspense boundary to render the fallback content on the server consider throwing an Error somewhere within the Suspense boundary. If you intended to have the server wait for the suspended component please switch to "renderToReadableStream" which supports Suspense on the server');
};
Uo.version = "18.3.1";
var dm = {};
/**
 * @license React
 * react-dom-server.browser.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var aS = Dt;
function Be(t) {
  for (var e = "https://reactjs.org/docs/error-decoder.html?invariant=" + t, n = 1; n < arguments.length; n++) e += "&args[]=" + encodeURIComponent(arguments[n]);
  return "Minified React error #" + t + "; visit " + e + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
}
var Un = null, kn = 0;
function ye(t, e) {
  if (e.length !== 0) if (512 < e.length) 0 < kn && (t.enqueue(new Uint8Array(Un.buffer, 0, kn)), Un = new Uint8Array(512), kn = 0), t.enqueue(e);
  else {
    var n = Un.length - kn;
    n < e.length && (n === 0 ? t.enqueue(Un) : (Un.set(e.subarray(0, n), kn), t.enqueue(Un), e = e.subarray(n)), Un = new Uint8Array(512), kn = 0), Un.set(e, kn), kn += e.length;
  }
}
function ht(t, e) {
  return ye(t, e), !0;
}
function s0(t) {
  Un && 0 < kn && (t.enqueue(new Uint8Array(Un.buffer, 0, kn)), Un = null, kn = 0);
}
var lS = new TextEncoder();
function ze(t) {
  return lS.encode(t);
}
function ae(t) {
  return lS.encode(t);
}
function uS(t, e) {
  typeof t.error == "function" ? t.error(e) : t.close();
}
var vn = Object.prototype.hasOwnProperty, cb = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, o0 = {}, a0 = {};
function cS(t) {
  return vn.call(a0, t) ? !0 : vn.call(o0, t) ? !1 : cb.test(t) ? a0[t] = !0 : (o0[t] = !0, !1);
}
function dn(t, e, n, i, r, s, o) {
  this.acceptsBooleans = e === 2 || e === 3 || e === 4, this.attributeName = i, this.attributeNamespace = r, this.mustUseProperty = n, this.propertyName = t, this.type = e, this.sanitizeURL = s, this.removeEmptyString = o;
}
var Yt = {};
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(t) {
  Yt[t] = new dn(t, 0, !1, t, null, !1, !1);
});
[["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(t) {
  var e = t[0];
  Yt[e] = new dn(e, 1, !1, t[1], null, !1, !1);
});
["contentEditable", "draggable", "spellCheck", "value"].forEach(function(t) {
  Yt[t] = new dn(t, 2, !1, t.toLowerCase(), null, !1, !1);
});
["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(t) {
  Yt[t] = new dn(t, 2, !1, t, null, !1, !1);
});
"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(t) {
  Yt[t] = new dn(t, 3, !1, t.toLowerCase(), null, !1, !1);
});
["checked", "multiple", "muted", "selected"].forEach(function(t) {
  Yt[t] = new dn(t, 3, !0, t, null, !1, !1);
});
["capture", "download"].forEach(function(t) {
  Yt[t] = new dn(t, 4, !1, t, null, !1, !1);
});
["cols", "rows", "size", "span"].forEach(function(t) {
  Yt[t] = new dn(t, 6, !1, t, null, !1, !1);
});
["rowSpan", "start"].forEach(function(t) {
  Yt[t] = new dn(t, 5, !1, t.toLowerCase(), null, !1, !1);
});
var hm = /[\-:]([a-z])/g;
function pm(t) {
  return t[1].toUpperCase();
}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(t) {
  var e = t.replace(
    hm,
    pm
  );
  Yt[e] = new dn(e, 1, !1, t, null, !1, !1);
});
"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(t) {
  var e = t.replace(hm, pm);
  Yt[e] = new dn(e, 1, !1, t, "http://www.w3.org/1999/xlink", !1, !1);
});
["xml:base", "xml:lang", "xml:space"].forEach(function(t) {
  var e = t.replace(hm, pm);
  Yt[e] = new dn(e, 1, !1, t, "http://www.w3.org/XML/1998/namespace", !1, !1);
});
["tabIndex", "crossOrigin"].forEach(function(t) {
  Yt[t] = new dn(t, 1, !1, t.toLowerCase(), null, !1, !1);
});
Yt.xlinkHref = new dn("xlinkHref", 1, !1, "xlink:href", "http://www.w3.org/1999/xlink", !0, !1);
["src", "href", "action", "formAction"].forEach(function(t) {
  Yt[t] = new dn(t, 1, !1, t.toLowerCase(), null, !0, !0);
});
var pu = {
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
}, fb = ["Webkit", "ms", "Moz", "O"];
Object.keys(pu).forEach(function(t) {
  fb.forEach(function(e) {
    e = e + t.charAt(0).toUpperCase() + t.substring(1), pu[e] = pu[t];
  });
});
var db = /["'&<>]/;
function Wt(t) {
  if (typeof t == "boolean" || typeof t == "number") return "" + t;
  t = "" + t;
  var e = db.exec(t);
  if (e) {
    var n = "", i, r = 0;
    for (i = e.index; i < t.length; i++) {
      switch (t.charCodeAt(i)) {
        case 34:
          e = "&quot;";
          break;
        case 38:
          e = "&amp;";
          break;
        case 39:
          e = "&#x27;";
          break;
        case 60:
          e = "&lt;";
          break;
        case 62:
          e = "&gt;";
          break;
        default:
          continue;
      }
      r !== i && (n += t.substring(r, i)), r = i + 1, n += e;
    }
    t = r !== i ? n + t.substring(r, i) : n;
  }
  return t;
}
var hb = /([A-Z])/g, pb = /^ms-/, Bh = Array.isArray, mb = ae("<script>"), gb = ae("<\/script>"), vb = ae('<script src="'), _b = ae('<script type="module" src="'), l0 = ae('" async=""><\/script>'), xb = /(<\/|<)(s)(cript)/gi;
function yb(t, e, n, i) {
  return "" + e + (n === "s" ? "\\u0073" : "\\u0053") + i;
}
function Sb(t, e, n, i, r) {
  t = t === void 0 ? "" : t, e = e === void 0 ? mb : ae('<script nonce="' + Wt(e) + '">');
  var s = [];
  if (n !== void 0 && s.push(e, ze(("" + n).replace(xb, yb)), gb), i !== void 0) for (n = 0; n < i.length; n++) s.push(vb, ze(Wt(i[n])), l0);
  if (r !== void 0) for (i = 0; i < r.length; i++) s.push(_b, ze(Wt(r[i])), l0);
  return { bootstrapChunks: s, startInlineScript: e, placeholderPrefix: ae(t + "P:"), segmentPrefix: ae(t + "S:"), boundaryPrefix: t + "B:", idPrefix: t, nextSuspenseID: 0, sentCompleteSegmentFunction: !1, sentCompleteBoundaryFunction: !1, sentClientRenderFunction: !1 };
}
function yi(t, e) {
  return { insertionMode: t, selectedValue: e };
}
function Mb(t) {
  return yi(t === "http://www.w3.org/2000/svg" ? 2 : t === "http://www.w3.org/1998/Math/MathML" ? 3 : 0, null);
}
function Eb(t, e, n) {
  switch (e) {
    case "select":
      return yi(1, n.value != null ? n.value : n.defaultValue);
    case "svg":
      return yi(2, null);
    case "math":
      return yi(3, null);
    case "foreignObject":
      return yi(1, null);
    case "table":
      return yi(4, null);
    case "thead":
    case "tbody":
    case "tfoot":
      return yi(5, null);
    case "colgroup":
      return yi(7, null);
    case "tr":
      return yi(6, null);
  }
  return 4 <= t.insertionMode || t.insertionMode === 0 ? yi(1, null) : t;
}
var mm = ae("<!-- -->");
function u0(t, e, n, i) {
  return e === "" ? i : (i && t.push(mm), t.push(ze(Wt(e))), !0);
}
var c0 = /* @__PURE__ */ new Map(), wb = ae(' style="'), f0 = ae(":"), Tb = ae(";");
function fS(t, e, n) {
  if (typeof n != "object") throw Error(Be(62));
  e = !0;
  for (var i in n) if (vn.call(n, i)) {
    var r = n[i];
    if (r != null && typeof r != "boolean" && r !== "") {
      if (i.indexOf("--") === 0) {
        var s = ze(Wt(i));
        r = ze(Wt(("" + r).trim()));
      } else {
        s = i;
        var o = c0.get(s);
        o !== void 0 || (o = ae(Wt(s.replace(hb, "-$1").toLowerCase().replace(pb, "-ms-"))), c0.set(s, o)), s = o, r = typeof r == "number" ? r === 0 || vn.call(pu, i) ? ze("" + r) : ze(r + "px") : ze(Wt(("" + r).trim()));
      }
      e ? (e = !1, t.push(wb, s, f0, r)) : t.push(Tb, s, f0, r);
    }
  }
  e || t.push(ts);
}
var dr = ae(" "), Fs = ae('="'), ts = ae('"'), d0 = ae('=""');
function Dn(t, e, n, i) {
  switch (n) {
    case "style":
      fS(t, e, i);
      return;
    case "defaultValue":
    case "defaultChecked":
    case "innerHTML":
    case "suppressContentEditableWarning":
    case "suppressHydrationWarning":
      return;
  }
  if (!(2 < n.length) || n[0] !== "o" && n[0] !== "O" || n[1] !== "n" && n[1] !== "N") {
    if (e = Yt.hasOwnProperty(n) ? Yt[n] : null, e !== null) {
      switch (typeof i) {
        case "function":
        case "symbol":
          return;
        case "boolean":
          if (!e.acceptsBooleans) return;
      }
      switch (n = ze(e.attributeName), e.type) {
        case 3:
          i && t.push(dr, n, d0);
          break;
        case 4:
          i === !0 ? t.push(dr, n, d0) : i !== !1 && t.push(dr, n, Fs, ze(Wt(i)), ts);
          break;
        case 5:
          isNaN(i) || t.push(dr, n, Fs, ze(Wt(i)), ts);
          break;
        case 6:
          !isNaN(i) && 1 <= i && t.push(dr, n, Fs, ze(Wt(i)), ts);
          break;
        default:
          e.sanitizeURL && (i = "" + i), t.push(dr, n, Fs, ze(Wt(i)), ts);
      }
    } else if (cS(n)) {
      switch (typeof i) {
        case "function":
        case "symbol":
          return;
        case "boolean":
          if (e = n.toLowerCase().slice(0, 5), e !== "data-" && e !== "aria-") return;
      }
      t.push(dr, ze(n), Fs, ze(Wt(i)), ts);
    }
  }
}
var hr = ae(">"), h0 = ae("/>");
function mu(t, e, n) {
  if (e != null) {
    if (n != null) throw Error(Be(60));
    if (typeof e != "object" || !("__html" in e)) throw Error(Be(61));
    e = e.__html, e != null && t.push(ze("" + e));
  }
}
function Cb(t) {
  var e = "";
  return aS.Children.forEach(t, function(n) {
    n != null && (e += n);
  }), e;
}
var qf = ae(' selected=""');
function Kf(t, e, n, i) {
  t.push(Si(n));
  var r = n = null, s;
  for (s in e) if (vn.call(e, s)) {
    var o = e[s];
    if (o != null) switch (s) {
      case "children":
        n = o;
        break;
      case "dangerouslySetInnerHTML":
        r = o;
        break;
      default:
        Dn(t, i, s, o);
    }
  }
  return t.push(hr), mu(t, r, n), typeof n == "string" ? (t.push(ze(Wt(n))), null) : n;
}
var Zf = ae(`
`), Ab = /^[a-zA-Z][a-zA-Z:_\.\-\d]*$/, p0 = /* @__PURE__ */ new Map();
function Si(t) {
  var e = p0.get(t);
  if (e === void 0) {
    if (!Ab.test(t)) throw Error(Be(65, t));
    e = ae("<" + t), p0.set(t, e);
  }
  return e;
}
var Rb = ae("<!DOCTYPE html>");
function bb(t, e, n, i, r) {
  switch (e) {
    case "select":
      t.push(Si("select"));
      var s = null, o = null;
      for (c in n) if (vn.call(n, c)) {
        var a = n[c];
        if (a != null) switch (c) {
          case "children":
            s = a;
            break;
          case "dangerouslySetInnerHTML":
            o = a;
            break;
          case "defaultValue":
          case "value":
            break;
          default:
            Dn(t, i, c, a);
        }
      }
      return t.push(hr), mu(t, o, s), s;
    case "option":
      o = r.selectedValue, t.push(Si("option"));
      var l = a = null, u = null, c = null;
      for (s in n) if (vn.call(n, s)) {
        var d = n[s];
        if (d != null) switch (s) {
          case "children":
            a = d;
            break;
          case "selected":
            u = d;
            break;
          case "dangerouslySetInnerHTML":
            c = d;
            break;
          case "value":
            l = d;
          default:
            Dn(t, i, s, d);
        }
      }
      if (o != null) if (n = l !== null ? "" + l : Cb(a), Bh(o)) {
        for (i = 0; i < o.length; i++)
          if ("" + o[i] === n) {
            t.push(qf);
            break;
          }
      } else "" + o === n && t.push(qf);
      else u && t.push(qf);
      return t.push(hr), mu(t, c, a), a;
    case "textarea":
      t.push(Si("textarea")), c = o = s = null;
      for (a in n) if (vn.call(n, a) && (l = n[a], l != null)) switch (a) {
        case "children":
          c = l;
          break;
        case "value":
          s = l;
          break;
        case "defaultValue":
          o = l;
          break;
        case "dangerouslySetInnerHTML":
          throw Error(Be(91));
        default:
          Dn(t, i, a, l);
      }
      if (s === null && o !== null && (s = o), t.push(hr), c != null) {
        if (s != null) throw Error(Be(92));
        if (Bh(c) && 1 < c.length) throw Error(Be(93));
        s = "" + c;
      }
      return typeof s == "string" && s[0] === `
` && t.push(Zf), s !== null && t.push(ze(Wt("" + s))), null;
    case "input":
      t.push(Si("input")), l = c = a = s = null;
      for (o in n) if (vn.call(n, o) && (u = n[o], u != null)) switch (o) {
        case "children":
        case "dangerouslySetInnerHTML":
          throw Error(Be(399, "input"));
        case "defaultChecked":
          l = u;
          break;
        case "defaultValue":
          a = u;
          break;
        case "checked":
          c = u;
          break;
        case "value":
          s = u;
          break;
        default:
          Dn(t, i, o, u);
      }
      return c !== null ? Dn(
        t,
        i,
        "checked",
        c
      ) : l !== null && Dn(t, i, "checked", l), s !== null ? Dn(t, i, "value", s) : a !== null && Dn(t, i, "value", a), t.push(h0), null;
    case "menuitem":
      t.push(Si("menuitem"));
      for (var h in n) if (vn.call(n, h) && (s = n[h], s != null)) switch (h) {
        case "children":
        case "dangerouslySetInnerHTML":
          throw Error(Be(400));
        default:
          Dn(t, i, h, s);
      }
      return t.push(hr), null;
    case "title":
      t.push(Si("title")), s = null;
      for (d in n) if (vn.call(n, d) && (o = n[d], o != null)) switch (d) {
        case "children":
          s = o;
          break;
        case "dangerouslySetInnerHTML":
          throw Error(Be(434));
        default:
          Dn(t, i, d, o);
      }
      return t.push(hr), s;
    case "listing":
    case "pre":
      t.push(Si(e)), o = s = null;
      for (l in n) if (vn.call(n, l) && (a = n[l], a != null)) switch (l) {
        case "children":
          s = a;
          break;
        case "dangerouslySetInnerHTML":
          o = a;
          break;
        default:
          Dn(t, i, l, a);
      }
      if (t.push(hr), o != null) {
        if (s != null) throw Error(Be(60));
        if (typeof o != "object" || !("__html" in o)) throw Error(Be(61));
        n = o.__html, n != null && (typeof n == "string" && 0 < n.length && n[0] === `
` ? t.push(Zf, ze(n)) : t.push(ze("" + n)));
      }
      return typeof s == "string" && s[0] === `
` && t.push(Zf), s;
    case "area":
    case "base":
    case "br":
    case "col":
    case "embed":
    case "hr":
    case "img":
    case "keygen":
    case "link":
    case "meta":
    case "param":
    case "source":
    case "track":
    case "wbr":
      t.push(Si(e));
      for (var p in n) if (vn.call(n, p) && (s = n[p], s != null)) switch (p) {
        case "children":
        case "dangerouslySetInnerHTML":
          throw Error(Be(399, e));
        default:
          Dn(t, i, p, s);
      }
      return t.push(h0), null;
    case "annotation-xml":
    case "color-profile":
    case "font-face":
    case "font-face-src":
    case "font-face-uri":
    case "font-face-format":
    case "font-face-name":
    case "missing-glyph":
      return Kf(t, n, e, i);
    case "html":
      return r.insertionMode === 0 && t.push(Rb), Kf(t, n, e, i);
    default:
      if (e.indexOf("-") === -1 && typeof n.is != "string") return Kf(t, n, e, i);
      t.push(Si(e)), o = s = null;
      for (u in n) if (vn.call(n, u) && (a = n[u], a != null)) switch (u) {
        case "children":
          s = a;
          break;
        case "dangerouslySetInnerHTML":
          o = a;
          break;
        case "style":
          fS(t, i, a);
          break;
        case "suppressContentEditableWarning":
        case "suppressHydrationWarning":
          break;
        default:
          cS(u) && typeof a != "function" && typeof a != "symbol" && t.push(dr, ze(u), Fs, ze(Wt(a)), ts);
      }
      return t.push(hr), mu(t, o, s), s;
  }
}
var Pb = ae("</"), Lb = ae(">"), Db = ae('<template id="'), Ib = ae('"></template>'), Nb = ae("<!--$-->"), Ub = ae('<!--$?--><template id="'), kb = ae('"></template>'), Fb = ae("<!--$!-->"), Ob = ae("<!--/$-->"), Bb = ae("<template"), zb = ae('"'), Hb = ae(' data-dgst="');
ae(' data-msg="');
ae(' data-stck="');
var Vb = ae("></template>");
function m0(t, e, n) {
  if (ye(t, Ub), n === null) throw Error(Be(395));
  return ye(t, n), ht(t, kb);
}
var Gb = ae('<div hidden id="'), Wb = ae('">'), $b = ae("</div>"), jb = ae('<svg aria-hidden="true" style="display:none" id="'), Xb = ae('">'), Yb = ae("</svg>"), qb = ae('<math aria-hidden="true" style="display:none" id="'), Kb = ae('">'), Zb = ae("</math>"), Qb = ae('<table hidden id="'), Jb = ae('">'), eP = ae("</table>"), tP = ae('<table hidden><tbody id="'), nP = ae('">'), iP = ae("</tbody></table>"), rP = ae('<table hidden><tr id="'), sP = ae('">'), oP = ae("</tr></table>"), aP = ae('<table hidden><colgroup id="'), lP = ae('">'), uP = ae("</colgroup></table>");
function cP(t, e, n, i) {
  switch (n.insertionMode) {
    case 0:
    case 1:
      return ye(t, Gb), ye(t, e.segmentPrefix), ye(t, ze(i.toString(16))), ht(t, Wb);
    case 2:
      return ye(t, jb), ye(t, e.segmentPrefix), ye(t, ze(i.toString(16))), ht(t, Xb);
    case 3:
      return ye(t, qb), ye(t, e.segmentPrefix), ye(t, ze(i.toString(16))), ht(t, Kb);
    case 4:
      return ye(t, Qb), ye(t, e.segmentPrefix), ye(t, ze(i.toString(16))), ht(t, Jb);
    case 5:
      return ye(t, tP), ye(t, e.segmentPrefix), ye(t, ze(i.toString(16))), ht(t, nP);
    case 6:
      return ye(t, rP), ye(t, e.segmentPrefix), ye(t, ze(i.toString(16))), ht(t, sP);
    case 7:
      return ye(
        t,
        aP
      ), ye(t, e.segmentPrefix), ye(t, ze(i.toString(16))), ht(t, lP);
    default:
      throw Error(Be(397));
  }
}
function fP(t, e) {
  switch (e.insertionMode) {
    case 0:
    case 1:
      return ht(t, $b);
    case 2:
      return ht(t, Yb);
    case 3:
      return ht(t, Zb);
    case 4:
      return ht(t, eP);
    case 5:
      return ht(t, iP);
    case 6:
      return ht(t, oP);
    case 7:
      return ht(t, uP);
    default:
      throw Error(Be(397));
  }
}
var dP = ae('function $RS(a,b){a=document.getElementById(a);b=document.getElementById(b);for(a.parentNode.removeChild(a);a.firstChild;)b.parentNode.insertBefore(a.firstChild,b);b.parentNode.removeChild(b)};$RS("'), hP = ae('$RS("'), pP = ae('","'), mP = ae('")<\/script>'), gP = ae('function $RC(a,b){a=document.getElementById(a);b=document.getElementById(b);b.parentNode.removeChild(b);if(a){a=a.previousSibling;var f=a.parentNode,c=a.nextSibling,e=0;do{if(c&&8===c.nodeType){var d=c.data;if("/$"===d)if(0===e)break;else e--;else"$"!==d&&"$?"!==d&&"$!"!==d||e++}d=c.nextSibling;f.removeChild(c);c=d}while(c);for(;b.firstChild;)f.insertBefore(b.firstChild,c);a.data="$";a._reactRetry&&a._reactRetry()}};$RC("'), vP = ae('$RC("'), _P = ae('","'), xP = ae('")<\/script>'), yP = ae('function $RX(b,c,d,e){var a=document.getElementById(b);a&&(b=a.previousSibling,b.data="$!",a=a.dataset,c&&(a.dgst=c),d&&(a.msg=d),e&&(a.stck=e),b._reactRetry&&b._reactRetry())};$RX("'), SP = ae('$RX("'), MP = ae('"'), EP = ae(")<\/script>"), Qf = ae(","), wP = /[<\u2028\u2029]/g;
function Jf(t) {
  return JSON.stringify(t).replace(wP, function(e) {
    switch (e) {
      case "<":
        return "\\u003c";
      case "\u2028":
        return "\\u2028";
      case "\u2029":
        return "\\u2029";
      default:
        throw Error("escapeJSStringsForInstructionScripts encountered a match it does not know how to replace. this means the match regex and the replacement characters are no longer in sync. This is a bug in React");
    }
  });
}
var ya = Object.assign, TP = Symbol.for("react.element"), dS = Symbol.for("react.portal"), hS = Symbol.for("react.fragment"), pS = Symbol.for("react.strict_mode"), mS = Symbol.for("react.profiler"), gS = Symbol.for("react.provider"), vS = Symbol.for("react.context"), _S = Symbol.for("react.forward_ref"), xS = Symbol.for("react.suspense"), yS = Symbol.for("react.suspense_list"), SS = Symbol.for("react.memo"), gm = Symbol.for("react.lazy"), CP = Symbol.for("react.scope"), AP = Symbol.for("react.debug_trace_mode"), RP = Symbol.for("react.legacy_hidden"), bP = Symbol.for("react.default_value"), g0 = Symbol.iterator;
function zh(t) {
  if (t == null) return null;
  if (typeof t == "function") return t.displayName || t.name || null;
  if (typeof t == "string") return t;
  switch (t) {
    case hS:
      return "Fragment";
    case dS:
      return "Portal";
    case mS:
      return "Profiler";
    case pS:
      return "StrictMode";
    case xS:
      return "Suspense";
    case yS:
      return "SuspenseList";
  }
  if (typeof t == "object") switch (t.$$typeof) {
    case vS:
      return (t.displayName || "Context") + ".Consumer";
    case gS:
      return (t._context.displayName || "Context") + ".Provider";
    case _S:
      var e = t.render;
      return t = t.displayName, t || (t = e.displayName || e.name || "", t = t !== "" ? "ForwardRef(" + t + ")" : "ForwardRef"), t;
    case SS:
      return e = t.displayName || null, e !== null ? e : zh(t.type) || "Memo";
    case gm:
      e = t._payload, t = t._init;
      try {
        return zh(t(e));
      } catch {
      }
  }
  return null;
}
var MS = {};
function v0(t, e) {
  if (t = t.contextTypes, !t) return MS;
  var n = {}, i;
  for (i in t) n[i] = e[i];
  return n;
}
var us = null;
function Rc(t, e) {
  if (t !== e) {
    t.context._currentValue = t.parentValue, t = t.parent;
    var n = e.parent;
    if (t === null) {
      if (n !== null) throw Error(Be(401));
    } else {
      if (n === null) throw Error(Be(401));
      Rc(t, n);
    }
    e.context._currentValue = e.value;
  }
}
function ES(t) {
  t.context._currentValue = t.parentValue, t = t.parent, t !== null && ES(t);
}
function wS(t) {
  var e = t.parent;
  e !== null && wS(e), t.context._currentValue = t.value;
}
function TS(t, e) {
  if (t.context._currentValue = t.parentValue, t = t.parent, t === null) throw Error(Be(402));
  t.depth === e.depth ? Rc(t, e) : TS(t, e);
}
function CS(t, e) {
  var n = e.parent;
  if (n === null) throw Error(Be(402));
  t.depth === n.depth ? Rc(t, n) : CS(t, n), e.context._currentValue = e.value;
}
function ec(t) {
  var e = us;
  e !== t && (e === null ? wS(t) : t === null ? ES(e) : e.depth === t.depth ? Rc(e, t) : e.depth > t.depth ? TS(e, t) : CS(e, t), us = t);
}
var _0 = { isMounted: function() {
  return !1;
}, enqueueSetState: function(t, e) {
  t = t._reactInternals, t.queue !== null && t.queue.push(e);
}, enqueueReplaceState: function(t, e) {
  t = t._reactInternals, t.replace = !0, t.queue = [e];
}, enqueueForceUpdate: function() {
} };
function x0(t, e, n, i) {
  var r = t.state !== void 0 ? t.state : null;
  t.updater = _0, t.props = n, t.state = r;
  var s = { queue: [], replace: !1 };
  t._reactInternals = s;
  var o = e.contextType;
  if (t.context = typeof o == "object" && o !== null ? o._currentValue : i, o = e.getDerivedStateFromProps, typeof o == "function" && (o = o(n, r), r = o == null ? r : ya({}, r, o), t.state = r), typeof e.getDerivedStateFromProps != "function" && typeof t.getSnapshotBeforeUpdate != "function" && (typeof t.UNSAFE_componentWillMount == "function" || typeof t.componentWillMount == "function")) if (e = t.state, typeof t.componentWillMount == "function" && t.componentWillMount(), typeof t.UNSAFE_componentWillMount == "function" && t.UNSAFE_componentWillMount(), e !== t.state && _0.enqueueReplaceState(t, t.state, null), s.queue !== null && 0 < s.queue.length) if (e = s.queue, o = s.replace, s.queue = null, s.replace = !1, o && e.length === 1) t.state = e[0];
  else {
    for (s = o ? e[0] : t.state, r = !0, o = o ? 1 : 0; o < e.length; o++) {
      var a = e[o];
      a = typeof a == "function" ? a.call(t, s, n, i) : a, a != null && (r ? (r = !1, s = ya({}, s, a)) : ya(s, a));
    }
    t.state = s;
  }
  else s.queue = null;
}
var PP = { id: 1, overflow: "" };
function Hh(t, e, n) {
  var i = t.id;
  t = t.overflow;
  var r = 32 - gu(i) - 1;
  i &= ~(1 << r), n += 1;
  var s = 32 - gu(e) + r;
  if (30 < s) {
    var o = r - r % 5;
    return s = (i & (1 << o) - 1).toString(32), i >>= o, r -= o, { id: 1 << 32 - gu(e) + r | n << r | i, overflow: s + t };
  }
  return { id: 1 << s | n << r | i, overflow: t };
}
var gu = Math.clz32 ? Math.clz32 : IP, LP = Math.log, DP = Math.LN2;
function IP(t) {
  return t >>>= 0, t === 0 ? 32 : 31 - (LP(t) / DP | 0) | 0;
}
function NP(t, e) {
  return t === e && (t !== 0 || 1 / t === 1 / e) || t !== t && e !== e;
}
var UP = typeof Object.is == "function" ? Object.is : NP, tr = null, vm = null, vu = null, lt = null, oa = !1, tc = !1, Va = 0, Er = null, bc = 0;
function ns() {
  if (tr === null) throw Error(Be(321));
  return tr;
}
function y0() {
  if (0 < bc) throw Error(Be(312));
  return { memoizedState: null, queue: null, next: null };
}
function _m() {
  return lt === null ? vu === null ? (oa = !1, vu = lt = y0()) : (oa = !0, lt = vu) : lt.next === null ? (oa = !1, lt = lt.next = y0()) : (oa = !0, lt = lt.next), lt;
}
function xm() {
  vm = tr = null, tc = !1, vu = null, bc = 0, lt = Er = null;
}
function AS(t, e) {
  return typeof e == "function" ? e(t) : e;
}
function S0(t, e, n) {
  if (tr = ns(), lt = _m(), oa) {
    var i = lt.queue;
    if (e = i.dispatch, Er !== null && (n = Er.get(i), n !== void 0)) {
      Er.delete(i), i = lt.memoizedState;
      do
        i = t(i, n.action), n = n.next;
      while (n !== null);
      return lt.memoizedState = i, [i, e];
    }
    return [lt.memoizedState, e];
  }
  return t = t === AS ? typeof e == "function" ? e() : e : n !== void 0 ? n(e) : e, lt.memoizedState = t, t = lt.queue = { last: null, dispatch: null }, t = t.dispatch = kP.bind(null, tr, t), [lt.memoizedState, t];
}
function M0(t, e) {
  if (tr = ns(), lt = _m(), e = e === void 0 ? null : e, lt !== null) {
    var n = lt.memoizedState;
    if (n !== null && e !== null) {
      var i = n[1];
      e: if (i === null) i = !1;
      else {
        for (var r = 0; r < i.length && r < e.length; r++) if (!UP(e[r], i[r])) {
          i = !1;
          break e;
        }
        i = !0;
      }
      if (i) return n[0];
    }
  }
  return t = t(), lt.memoizedState = [t, e], t;
}
function kP(t, e, n) {
  if (25 <= bc) throw Error(Be(301));
  if (t === tr) if (tc = !0, t = { action: n, next: null }, Er === null && (Er = /* @__PURE__ */ new Map()), n = Er.get(e), n === void 0) Er.set(e, t);
  else {
    for (e = n; e.next !== null; ) e = e.next;
    e.next = t;
  }
}
function FP() {
  throw Error(Be(394));
}
function Vl() {
}
var E0 = { readContext: function(t) {
  return t._currentValue;
}, useContext: function(t) {
  return ns(), t._currentValue;
}, useMemo: M0, useReducer: S0, useRef: function(t) {
  tr = ns(), lt = _m();
  var e = lt.memoizedState;
  return e === null ? (t = { current: t }, lt.memoizedState = t) : e;
}, useState: function(t) {
  return S0(AS, t);
}, useInsertionEffect: Vl, useLayoutEffect: function() {
}, useCallback: function(t, e) {
  return M0(function() {
    return t;
  }, e);
}, useImperativeHandle: Vl, useEffect: Vl, useDebugValue: Vl, useDeferredValue: function(t) {
  return ns(), t;
}, useTransition: function() {
  return ns(), [!1, FP];
}, useId: function() {
  var t = vm.treeContext, e = t.overflow;
  t = t.id, t = (t & ~(1 << 32 - gu(t) - 1)).toString(32) + e;
  var n = _u;
  if (n === null) throw Error(Be(404));
  return e = Va++, t = ":" + n.idPrefix + "R" + t, 0 < e && (t += "H" + e.toString(32)), t + ":";
}, useMutableSource: function(t, e) {
  return ns(), e(t._source);
}, useSyncExternalStore: function(t, e, n) {
  if (n === void 0) throw Error(Be(407));
  return n();
} }, _u = null, ed = aS.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentDispatcher;
function OP(t) {
  return console.error(t), null;
}
function aa() {
}
function BP(t, e, n, i, r, s, o, a, l) {
  var u = [], c = /* @__PURE__ */ new Set();
  return e = { destination: null, responseState: e, progressiveChunkSize: i === void 0 ? 12800 : i, status: 0, fatalError: null, nextSegmentId: 0, allPendingTasks: 0, pendingRootTasks: 0, completedRootSegment: null, abortableTasks: c, pingedTasks: u, clientRenderedBoundaries: [], completedBoundaries: [], partialBoundaries: [], onError: r === void 0 ? OP : r, onAllReady: s === void 0 ? aa : s, onShellReady: o === void 0 ? aa : o, onShellError: a === void 0 ? aa : a, onFatalError: l === void 0 ? aa : l }, n = nc(e, 0, null, n, !1, !1), n.parentFlushed = !0, t = ym(e, t, null, n, c, MS, null, PP), u.push(t), e;
}
function ym(t, e, n, i, r, s, o, a) {
  t.allPendingTasks++, n === null ? t.pendingRootTasks++ : n.pendingTasks++;
  var l = { node: e, ping: function() {
    var u = t.pingedTasks;
    u.push(l), u.length === 1 && PS(t);
  }, blockedBoundary: n, blockedSegment: i, abortSet: r, legacyContext: s, context: o, treeContext: a };
  return r.add(l), l;
}
function nc(t, e, n, i, r, s) {
  return { status: 0, id: -1, index: e, parentFlushed: !1, chunks: [], children: [], formatContext: i, boundary: n, lastPushedText: r, textEmbedded: s };
}
function Ga(t, e) {
  if (t = t.onError(e), t != null && typeof t != "string") throw Error('onError returned something with a type other than "string". onError should return a string and may return null or undefined but must not return anything else. It received something of type "' + typeof t + '" instead');
  return t;
}
function ic(t, e) {
  var n = t.onShellError;
  n(e), n = t.onFatalError, n(e), t.destination !== null ? (t.status = 2, uS(t.destination, e)) : (t.status = 1, t.fatalError = e);
}
function w0(t, e, n, i, r) {
  for (tr = {}, vm = e, Va = 0, t = n(i, r); tc; ) tc = !1, Va = 0, bc += 1, lt = null, t = n(i, r);
  return xm(), t;
}
function T0(t, e, n, i) {
  var r = n.render(), s = i.childContextTypes;
  if (s != null) {
    var o = e.legacyContext;
    if (typeof n.getChildContext != "function") i = o;
    else {
      n = n.getChildContext();
      for (var a in n) if (!(a in s)) throw Error(Be(108, zh(i) || "Unknown", a));
      i = ya({}, o, n);
    }
    e.legacyContext = i, Fn(t, e, r), e.legacyContext = o;
  } else Fn(t, e, r);
}
function C0(t, e) {
  if (t && t.defaultProps) {
    e = ya({}, e), t = t.defaultProps;
    for (var n in t) e[n] === void 0 && (e[n] = t[n]);
    return e;
  }
  return e;
}
function Vh(t, e, n, i, r) {
  if (typeof n == "function") if (n.prototype && n.prototype.isReactComponent) {
    r = v0(n, e.legacyContext);
    var s = n.contextType;
    s = new n(i, typeof s == "object" && s !== null ? s._currentValue : r), x0(s, n, i, r), T0(t, e, s, n);
  } else {
    s = v0(n, e.legacyContext), r = w0(t, e, n, i, s);
    var o = Va !== 0;
    if (typeof r == "object" && r !== null && typeof r.render == "function" && r.$$typeof === void 0) x0(r, n, i, s), T0(t, e, r, n);
    else if (o) {
      i = e.treeContext, e.treeContext = Hh(i, 1, 0);
      try {
        Fn(t, e, r);
      } finally {
        e.treeContext = i;
      }
    } else Fn(t, e, r);
  }
  else if (typeof n == "string") {
    switch (r = e.blockedSegment, s = bb(r.chunks, n, i, t.responseState, r.formatContext), r.lastPushedText = !1, o = r.formatContext, r.formatContext = Eb(o, n, i), Gh(t, e, s), r.formatContext = o, n) {
      case "area":
      case "base":
      case "br":
      case "col":
      case "embed":
      case "hr":
      case "img":
      case "input":
      case "keygen":
      case "link":
      case "meta":
      case "param":
      case "source":
      case "track":
      case "wbr":
        break;
      default:
        r.chunks.push(Pb, ze(n), Lb);
    }
    r.lastPushedText = !1;
  } else {
    switch (n) {
      case RP:
      case AP:
      case pS:
      case mS:
      case hS:
        Fn(t, e, i.children);
        return;
      case yS:
        Fn(t, e, i.children);
        return;
      case CP:
        throw Error(Be(343));
      case xS:
        e: {
          n = e.blockedBoundary, r = e.blockedSegment, s = i.fallback, i = i.children, o = /* @__PURE__ */ new Set();
          var a = { id: null, rootSegmentID: -1, parentFlushed: !1, pendingTasks: 0, forceClientRender: !1, completedSegments: [], byteSize: 0, fallbackAbortableTasks: o, errorDigest: null }, l = nc(t, r.chunks.length, a, r.formatContext, !1, !1);
          r.children.push(l), r.lastPushedText = !1;
          var u = nc(t, 0, null, r.formatContext, !1, !1);
          u.parentFlushed = !0, e.blockedBoundary = a, e.blockedSegment = u;
          try {
            if (Gh(
              t,
              e,
              i
            ), u.lastPushedText && u.textEmbedded && u.chunks.push(mm), u.status = 1, rc(a, u), a.pendingTasks === 0) break e;
          } catch (c) {
            u.status = 4, a.forceClientRender = !0, a.errorDigest = Ga(t, c);
          } finally {
            e.blockedBoundary = n, e.blockedSegment = r;
          }
          e = ym(t, s, n, l, o, e.legacyContext, e.context, e.treeContext), t.pingedTasks.push(e);
        }
        return;
    }
    if (typeof n == "object" && n !== null) switch (n.$$typeof) {
      case _S:
        if (i = w0(t, e, n.render, i, r), Va !== 0) {
          n = e.treeContext, e.treeContext = Hh(n, 1, 0);
          try {
            Fn(t, e, i);
          } finally {
            e.treeContext = n;
          }
        } else Fn(t, e, i);
        return;
      case SS:
        n = n.type, i = C0(n, i), Vh(t, e, n, i, r);
        return;
      case gS:
        if (r = i.children, n = n._context, i = i.value, s = n._currentValue, n._currentValue = i, o = us, us = i = { parent: o, depth: o === null ? 0 : o.depth + 1, context: n, parentValue: s, value: i }, e.context = i, Fn(t, e, r), t = us, t === null) throw Error(Be(403));
        i = t.parentValue, t.context._currentValue = i === bP ? t.context._defaultValue : i, t = us = t.parent, e.context = t;
        return;
      case vS:
        i = i.children, i = i(n._currentValue), Fn(t, e, i);
        return;
      case gm:
        r = n._init, n = r(n._payload), i = C0(n, i), Vh(t, e, n, i, void 0);
        return;
    }
    throw Error(Be(
      130,
      n == null ? n : typeof n,
      ""
    ));
  }
}
function Fn(t, e, n) {
  if (e.node = n, typeof n == "object" && n !== null) {
    switch (n.$$typeof) {
      case TP:
        Vh(t, e, n.type, n.props, n.ref);
        return;
      case dS:
        throw Error(Be(257));
      case gm:
        var i = n._init;
        n = i(n._payload), Fn(t, e, n);
        return;
    }
    if (Bh(n)) {
      A0(t, e, n);
      return;
    }
    if (n === null || typeof n != "object" ? i = null : (i = g0 && n[g0] || n["@@iterator"], i = typeof i == "function" ? i : null), i && (i = i.call(n))) {
      if (n = i.next(), !n.done) {
        var r = [];
        do
          r.push(n.value), n = i.next();
        while (!n.done);
        A0(t, e, r);
      }
      return;
    }
    throw t = Object.prototype.toString.call(n), Error(Be(31, t === "[object Object]" ? "object with keys {" + Object.keys(n).join(", ") + "}" : t));
  }
  typeof n == "string" ? (i = e.blockedSegment, i.lastPushedText = u0(e.blockedSegment.chunks, n, t.responseState, i.lastPushedText)) : typeof n == "number" && (i = e.blockedSegment, i.lastPushedText = u0(e.blockedSegment.chunks, "" + n, t.responseState, i.lastPushedText));
}
function A0(t, e, n) {
  for (var i = n.length, r = 0; r < i; r++) {
    var s = e.treeContext;
    e.treeContext = Hh(s, i, r);
    try {
      Gh(t, e, n[r]);
    } finally {
      e.treeContext = s;
    }
  }
}
function Gh(t, e, n) {
  var i = e.blockedSegment.formatContext, r = e.legacyContext, s = e.context;
  try {
    return Fn(t, e, n);
  } catch (l) {
    if (xm(), typeof l == "object" && l !== null && typeof l.then == "function") {
      n = l;
      var o = e.blockedSegment, a = nc(t, o.chunks.length, null, o.formatContext, o.lastPushedText, !0);
      o.children.push(a), o.lastPushedText = !1, t = ym(t, e.node, e.blockedBoundary, a, e.abortSet, e.legacyContext, e.context, e.treeContext).ping, n.then(t, t), e.blockedSegment.formatContext = i, e.legacyContext = r, e.context = s, ec(s);
    } else throw e.blockedSegment.formatContext = i, e.legacyContext = r, e.context = s, ec(s), l;
  }
}
function zP(t) {
  var e = t.blockedBoundary;
  t = t.blockedSegment, t.status = 3, bS(this, e, t);
}
function RS(t, e, n) {
  var i = t.blockedBoundary;
  t.blockedSegment.status = 3, i === null ? (e.allPendingTasks--, e.status !== 2 && (e.status = 2, e.destination !== null && e.destination.close())) : (i.pendingTasks--, i.forceClientRender || (i.forceClientRender = !0, t = n === void 0 ? Error(Be(432)) : n, i.errorDigest = e.onError(t), i.parentFlushed && e.clientRenderedBoundaries.push(i)), i.fallbackAbortableTasks.forEach(function(r) {
    return RS(r, e, n);
  }), i.fallbackAbortableTasks.clear(), e.allPendingTasks--, e.allPendingTasks === 0 && (i = e.onAllReady, i()));
}
function rc(t, e) {
  if (e.chunks.length === 0 && e.children.length === 1 && e.children[0].boundary === null) {
    var n = e.children[0];
    n.id = e.id, n.parentFlushed = !0, n.status === 1 && rc(t, n);
  } else t.completedSegments.push(e);
}
function bS(t, e, n) {
  if (e === null) {
    if (n.parentFlushed) {
      if (t.completedRootSegment !== null) throw Error(Be(389));
      t.completedRootSegment = n;
    }
    t.pendingRootTasks--, t.pendingRootTasks === 0 && (t.onShellError = aa, e = t.onShellReady, e());
  } else e.pendingTasks--, e.forceClientRender || (e.pendingTasks === 0 ? (n.parentFlushed && n.status === 1 && rc(e, n), e.parentFlushed && t.completedBoundaries.push(e), e.fallbackAbortableTasks.forEach(zP, t), e.fallbackAbortableTasks.clear()) : n.parentFlushed && n.status === 1 && (rc(e, n), e.completedSegments.length === 1 && e.parentFlushed && t.partialBoundaries.push(e)));
  t.allPendingTasks--, t.allPendingTasks === 0 && (t = t.onAllReady, t());
}
function PS(t) {
  if (t.status !== 2) {
    var e = us, n = ed.current;
    ed.current = E0;
    var i = _u;
    _u = t.responseState;
    try {
      var r = t.pingedTasks, s;
      for (s = 0; s < r.length; s++) {
        var o = r[s], a = t, l = o.blockedSegment;
        if (l.status === 0) {
          ec(o.context);
          try {
            Fn(a, o, o.node), l.lastPushedText && l.textEmbedded && l.chunks.push(mm), o.abortSet.delete(o), l.status = 1, bS(a, o.blockedBoundary, l);
          } catch (_) {
            if (xm(), typeof _ == "object" && _ !== null && typeof _.then == "function") {
              var u = o.ping;
              _.then(u, u);
            } else {
              o.abortSet.delete(o), l.status = 4;
              var c = o.blockedBoundary, d = _, h = Ga(a, d);
              if (c === null ? ic(a, d) : (c.pendingTasks--, c.forceClientRender || (c.forceClientRender = !0, c.errorDigest = h, c.parentFlushed && a.clientRenderedBoundaries.push(c))), a.allPendingTasks--, a.allPendingTasks === 0) {
                var p = a.onAllReady;
                p();
              }
            }
          } finally {
          }
        }
      }
      r.splice(0, s), t.destination !== null && Sm(t, t.destination);
    } catch (_) {
      Ga(t, _), ic(t, _);
    } finally {
      _u = i, ed.current = n, n === E0 && ec(e);
    }
  }
}
function Gl(t, e, n) {
  switch (n.parentFlushed = !0, n.status) {
    case 0:
      var i = n.id = t.nextSegmentId++;
      return n.lastPushedText = !1, n.textEmbedded = !1, t = t.responseState, ye(e, Db), ye(e, t.placeholderPrefix), t = ze(i.toString(16)), ye(e, t), ht(e, Ib);
    case 1:
      n.status = 2;
      var r = !0;
      i = n.chunks;
      var s = 0;
      n = n.children;
      for (var o = 0; o < n.length; o++) {
        for (r = n[o]; s < r.index; s++) ye(e, i[s]);
        r = Pc(t, e, r);
      }
      for (; s < i.length - 1; s++) ye(e, i[s]);
      return s < i.length && (r = ht(e, i[s])), r;
    default:
      throw Error(Be(390));
  }
}
function Pc(t, e, n) {
  var i = n.boundary;
  if (i === null) return Gl(t, e, n);
  if (i.parentFlushed = !0, i.forceClientRender) i = i.errorDigest, ht(e, Fb), ye(e, Bb), i && (ye(e, Hb), ye(e, ze(Wt(i))), ye(e, zb)), ht(e, Vb), Gl(t, e, n);
  else if (0 < i.pendingTasks) {
    i.rootSegmentID = t.nextSegmentId++, 0 < i.completedSegments.length && t.partialBoundaries.push(i);
    var r = t.responseState, s = r.nextSuspenseID++;
    r = ae(r.boundaryPrefix + s.toString(16)), i = i.id = r, m0(e, t.responseState, i), Gl(t, e, n);
  } else if (i.byteSize > t.progressiveChunkSize) i.rootSegmentID = t.nextSegmentId++, t.completedBoundaries.push(i), m0(e, t.responseState, i.id), Gl(t, e, n);
  else {
    if (ht(e, Nb), n = i.completedSegments, n.length !== 1) throw Error(Be(391));
    Pc(t, e, n[0]);
  }
  return ht(e, Ob);
}
function R0(t, e, n) {
  return cP(e, t.responseState, n.formatContext, n.id), Pc(t, e, n), fP(e, n.formatContext);
}
function b0(t, e, n) {
  for (var i = n.completedSegments, r = 0; r < i.length; r++) LS(t, e, n, i[r]);
  if (i.length = 0, t = t.responseState, i = n.id, n = n.rootSegmentID, ye(e, t.startInlineScript), t.sentCompleteBoundaryFunction ? ye(e, vP) : (t.sentCompleteBoundaryFunction = !0, ye(e, gP)), i === null) throw Error(Be(395));
  return n = ze(n.toString(16)), ye(e, i), ye(e, _P), ye(e, t.segmentPrefix), ye(e, n), ht(e, xP);
}
function LS(t, e, n, i) {
  if (i.status === 2) return !0;
  var r = i.id;
  if (r === -1) {
    if ((i.id = n.rootSegmentID) === -1) throw Error(Be(392));
    return R0(t, e, i);
  }
  return R0(t, e, i), t = t.responseState, ye(e, t.startInlineScript), t.sentCompleteSegmentFunction ? ye(e, hP) : (t.sentCompleteSegmentFunction = !0, ye(e, dP)), ye(e, t.segmentPrefix), r = ze(r.toString(16)), ye(e, r), ye(e, pP), ye(e, t.placeholderPrefix), ye(e, r), ht(e, mP);
}
function Sm(t, e) {
  Un = new Uint8Array(512), kn = 0;
  try {
    var n = t.completedRootSegment;
    if (n !== null && t.pendingRootTasks === 0) {
      Pc(t, e, n), t.completedRootSegment = null;
      var i = t.responseState.bootstrapChunks;
      for (n = 0; n < i.length - 1; n++) ye(e, i[n]);
      n < i.length && ht(e, i[n]);
    }
    var r = t.clientRenderedBoundaries, s;
    for (s = 0; s < r.length; s++) {
      var o = r[s];
      i = e;
      var a = t.responseState, l = o.id, u = o.errorDigest, c = o.errorMessage, d = o.errorComponentStack;
      if (ye(i, a.startInlineScript), a.sentClientRenderFunction ? ye(i, SP) : (a.sentClientRenderFunction = !0, ye(
        i,
        yP
      )), l === null) throw Error(Be(395));
      ye(i, l), ye(i, MP), (u || c || d) && (ye(i, Qf), ye(i, ze(Jf(u || "")))), (c || d) && (ye(i, Qf), ye(i, ze(Jf(c || "")))), d && (ye(i, Qf), ye(i, ze(Jf(d)))), ht(i, EP);
    }
    r.splice(0, s);
    var h = t.completedBoundaries;
    for (s = 0; s < h.length; s++) b0(t, e, h[s]);
    h.splice(0, s), s0(e), Un = new Uint8Array(512), kn = 0;
    var p = t.partialBoundaries;
    for (s = 0; s < p.length; s++) {
      var _ = p[s];
      e: {
        r = t, o = e;
        var y = _.completedSegments;
        for (a = 0; a < y.length; a++) if (!LS(
          r,
          o,
          _,
          y[a]
        )) {
          a++, y.splice(0, a);
          var m = !1;
          break e;
        }
        y.splice(0, a), m = !0;
      }
      if (!m) {
        t.destination = null, s++, p.splice(0, s);
        return;
      }
    }
    p.splice(0, s);
    var f = t.completedBoundaries;
    for (s = 0; s < f.length; s++) b0(t, e, f[s]);
    f.splice(0, s);
  } finally {
    s0(e), t.allPendingTasks === 0 && t.pingedTasks.length === 0 && t.clientRenderedBoundaries.length === 0 && t.completedBoundaries.length === 0 && e.close();
  }
}
function P0(t, e) {
  try {
    var n = t.abortableTasks;
    n.forEach(function(i) {
      return RS(i, t, e);
    }), n.clear(), t.destination !== null && Sm(t, t.destination);
  } catch (i) {
    Ga(t, i), ic(t, i);
  }
}
dm.renderToReadableStream = function(t, e) {
  return new Promise(function(n, i) {
    var r, s, o = new Promise(function(c, d) {
      s = c, r = d;
    }), a = BP(t, Sb(e ? e.identifierPrefix : void 0, e ? e.nonce : void 0, e ? e.bootstrapScriptContent : void 0, e ? e.bootstrapScripts : void 0, e ? e.bootstrapModules : void 0), Mb(e ? e.namespaceURI : void 0), e ? e.progressiveChunkSize : void 0, e ? e.onError : void 0, s, function() {
      var c = new ReadableStream({ type: "bytes", pull: function(d) {
        if (a.status === 1) a.status = 2, uS(d, a.fatalError);
        else if (a.status !== 2 && a.destination === null) {
          a.destination = d;
          try {
            Sm(a, d);
          } catch (h) {
            Ga(a, h), ic(a, h);
          }
        }
      }, cancel: function() {
        P0(a);
      } }, { highWaterMark: 0 });
      c.allReady = o, n(c);
    }, function(c) {
      o.catch(function() {
      }), i(c);
    }, r);
    if (e && e.signal) {
      var l = e.signal, u = function() {
        P0(a, l.reason), l.removeEventListener("abort", u);
      };
      l.addEventListener("abort", u);
    }
    PS(a);
  });
};
dm.version = "18.3.1";
var ko, DS;
ko = Uo, DS = dm;
ko.version;
ko.renderToString;
var IS = ko.renderToStaticMarkup;
ko.renderToNodeStream;
ko.renderToStaticNodeStream;
DS.renderToReadableStream;
const HP = "#c62a3f", VP = "#20232b";
function NS(t) {
  return t === "H" || t === "D" ? HP : VP;
}
const GP = {
  H: "M50 87 C50 87 11 59 11 33 C11 19 21 11 32 11 C41 11 47 16 50 24 C53 16 59 11 68 11 C79 11 89 19 89 33 C89 59 50 87 50 87 Z",
  D: "M50 7 L87 50 L50 93 L13 50 Z",
  S: "M50 8 C50 8 13 41 13 61 C13 73 21 79 30 79 C35 79 39 77 42 73 C41 83 37 89 29 93 L71 93 C63 89 59 83 58 73 C61 77 65 79 70 79 C79 79 87 73 87 61 C87 41 50 8 50 8 Z",
  C: "M50 8 C41 8 34 15 34 24 C34 29 36 33 40 36 C33 32 23 33 17 39 C10 46 10 57 17 64 C23 70 33 71 40 67 C37 75 32 81 25 85 L75 85 C68 81 63 75 60 67 C67 71 77 70 83 64 C90 57 90 46 83 39 C77 33 67 32 60 36 C64 33 66 29 66 24 C66 15 59 8 50 8 Z"
};
function To({
  suit: t,
  cx: e,
  cy: n,
  size: i,
  flip: r = !1,
  color: s
}) {
  const o = i / 100;
  return /* @__PURE__ */ U.jsx(
    "g",
    {
      transform: `translate(${e} ${n}) rotate(${r ? 180 : 0}) scale(${o}) translate(-50 -50)`,
      fill: s ?? NS(t),
      children: /* @__PURE__ */ U.jsx("path", { d: GP[t] })
    }
  );
}
function US({ className: t, style: e }) {
  return /* @__PURE__ */ U.jsxs("svg", { viewBox: "0 0 100 140", className: t, style: e, children: [
    /* @__PURE__ */ U.jsx("rect", { x: "0.5", y: "0.5", width: "99", height: "139", rx: "9", fill: "#a11228", stroke: "rgba(0,0,0,0.2)" }),
    /* @__PURE__ */ U.jsx("rect", { x: "9", y: "9", width: "82", height: "122", rx: "5", fill: "#8d0f22" }),
    /* @__PURE__ */ U.jsx(
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
    /* @__PURE__ */ U.jsx(
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
    /* @__PURE__ */ U.jsx("circle", { cx: "50", cy: "70", r: "17", fill: "#a11228", stroke: "#f6dade", strokeOpacity: "0.5", strokeWidth: "1.2" }),
    /* @__PURE__ */ U.jsx(To, { suit: "S", cx: 50, cy: 70, size: 20, color: "#f6dade" })
  ] });
}
const wt = 32, jn = 50, Tt = 68, Ot = 40, Bt = 100, Xn = 70, la = 58, ua = 82, L0 = (Ot + Xn) / 2, WP = (Xn + Bt) / 2, $P = (Ot + la) / 2, jP = (ua + Bt) / 2, XP = {
  2: [{ x: jn, y: Ot }, { x: jn, y: Bt }],
  3: [{ x: jn, y: Ot }, { x: jn, y: Xn }, { x: jn, y: Bt }],
  4: [{ x: wt, y: Ot }, { x: Tt, y: Ot }, { x: wt, y: Bt }, { x: Tt, y: Bt }],
  5: [{ x: wt, y: Ot }, { x: Tt, y: Ot }, { x: jn, y: Xn }, { x: wt, y: Bt }, { x: Tt, y: Bt }],
  6: [{ x: wt, y: Ot }, { x: Tt, y: Ot }, { x: wt, y: Xn }, { x: Tt, y: Xn }, { x: wt, y: Bt }, { x: Tt, y: Bt }],
  7: [
    { x: wt, y: Ot },
    { x: Tt, y: Ot },
    { x: jn, y: L0 },
    { x: wt, y: Xn },
    { x: Tt, y: Xn },
    { x: wt, y: Bt },
    { x: Tt, y: Bt }
  ],
  8: [
    { x: wt, y: Ot },
    { x: Tt, y: Ot },
    { x: jn, y: L0 },
    { x: wt, y: Xn },
    { x: Tt, y: Xn },
    { x: jn, y: WP },
    { x: wt, y: Bt },
    { x: Tt, y: Bt }
  ],
  9: [
    { x: wt, y: Ot },
    { x: Tt, y: Ot },
    { x: wt, y: la },
    { x: Tt, y: la },
    { x: jn, y: Xn },
    { x: wt, y: ua },
    { x: Tt, y: ua },
    { x: wt, y: Bt },
    { x: Tt, y: Bt }
  ],
  10: [
    { x: wt, y: Ot },
    { x: Tt, y: Ot },
    { x: jn, y: $P },
    { x: wt, y: la },
    { x: Tt, y: la },
    { x: wt, y: ua },
    { x: Tt, y: ua },
    { x: jn, y: jP },
    { x: wt, y: Bt },
    { x: Tt, y: Bt }
  ]
}, YP = Xn, kS = "Georgia, 'Times New Roman', 'Playfair Display', serif";
function D0({ rank: t, suit: e, color: n }) {
  const i = t === "10";
  return /* @__PURE__ */ U.jsxs("g", { fill: n, children: [
    /* @__PURE__ */ U.jsx(
      "text",
      {
        x: i ? 11 : 10,
        y: "20",
        fontSize: i ? 13 : 16,
        fontWeight: 800,
        fontFamily: kS,
        textAnchor: "middle",
        children: t
      }
    ),
    /* @__PURE__ */ U.jsx(To, { suit: e, cx: 10, cy: 32, size: 12, color: n })
  ] });
}
function qP({ rank: t, suit: e, color: n }) {
  return /* @__PURE__ */ U.jsxs("g", { children: [
    /* @__PURE__ */ U.jsx("rect", { x: "16", y: "24", width: "68", height: "92", rx: "6", fill: n, fillOpacity: "0.045" }),
    /* @__PURE__ */ U.jsx(
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
    /* @__PURE__ */ U.jsx(To, { suit: e, cx: 50, cy: 41, size: 20, color: n }),
    /* @__PURE__ */ U.jsx(
      "text",
      {
        x: "50",
        y: "86",
        fontSize: "42",
        fontWeight: 800,
        fontFamily: kS,
        textAnchor: "middle",
        fill: n,
        children: t
      }
    ),
    /* @__PURE__ */ U.jsx(To, { suit: e, cx: 50, cy: 104, size: 17, flip: !0, color: n })
  ] });
}
function Wh({ rank: t, suit: e, faceDown: n, className: i, style: r }) {
  if (n) return /* @__PURE__ */ U.jsx(US, { className: i, style: r });
  const s = NS(e), o = t === "J" || t === "Q" || t === "K", a = XP[t];
  return /* @__PURE__ */ U.jsxs("svg", { viewBox: "0 0 100 140", className: i, style: r, children: [
    /* @__PURE__ */ U.jsx("rect", { x: "0.5", y: "0.5", width: "99", height: "139", rx: "9", fill: "#fdfdfb", stroke: "rgba(20,20,30,0.14)" }),
    /* @__PURE__ */ U.jsx(D0, { rank: t, suit: e, color: s }),
    /* @__PURE__ */ U.jsx("g", { transform: "rotate(180 50 70)", children: /* @__PURE__ */ U.jsx(D0, { rank: t, suit: e, color: s }) }),
    t === "A" ? /* @__PURE__ */ U.jsx(To, { suit: e, cx: 50, cy: 70, size: 46, color: s }) : o ? /* @__PURE__ */ U.jsx(qP, { rank: t, suit: e, color: s }) : a?.map((l, u) => /* @__PURE__ */ U.jsx(To, { suit: e, cx: l.x, cy: l.y, size: 20, flip: l.y > YP, color: s }, u))
  ] });
}
const Os = 512, Qo = Math.round(Os * 1.4), Co = /* @__PURE__ */ new Map();
function FS(t) {
  const e = t.replace("<svg ", `<svg width="${Os}" height="${Qo}" `), n = document.createElement("canvas");
  n.width = Os, n.height = Qo;
  const i = n.getContext("2d");
  i.fillStyle = "#fdfdfb", i.fillRect(0, 0, Os, Qo);
  const r = new Io(n);
  r.colorSpace = rn, r.anisotropy = 8;
  const s = new Image();
  return s.onload = () => {
    i.clearRect(0, 0, Os, Qo), i.drawImage(s, 0, 0, Os, Qo), r.needsUpdate = !0;
  }, s.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(e)}`, r;
}
function KP(t, e) {
  const n = `${t}${e}`;
  let i = Co.get(n);
  return i || (i = FS(IS(/* @__PURE__ */ U.jsx(Wh, { rank: t, suit: e }))), Co.set(n, i)), i;
}
function ZP() {
  let t = Co.get("__back");
  return t || (t = FS(IS(/* @__PURE__ */ U.jsx(US, {}))), Co.set("__back", t)), t;
}
function QP() {
  for (const t of Co.values()) t.dispose();
  Co.clear();
}
const $h = Math.PI * 2;
function JP() {
  const e = document.createElement("canvas");
  e.width = 1024, e.height = 1024;
  const n = e.getContext("2d"), i = n.createRadialGradient(1024 / 2, 1024 * 0.42, 1024 * 0.08, 1024 / 2, 1024 * 0.5, 1024 * 0.78);
  i.addColorStop(0, "#1f8a54"), i.addColorStop(0.6, "#136a41"), i.addColorStop(1, "#0c4a2c"), n.fillStyle = i, n.fillRect(0, 0, 1024, 1024);
  const r = n.getImageData(0, 0, 1024, 1024), s = r.data;
  for (let a = 0; a < s.length; a += 4) {
    const l = (Math.random() - 0.5) * 12;
    s[a] += l, s[a + 1] += l, s[a + 2] += l;
  }
  n.putImageData(r, 0, 0), n.textAlign = "center", n.fillStyle = "rgba(240,226,182,0.85)", n.font = "700 40px Georgia, 'Times New Roman', serif", n.fillText("BLACKJACK PAYS 3 TO 2", 1024 / 2, 1024 * 0.34), n.fillStyle = "rgba(233,217,168,0.55)", n.font = "600 22px Georgia, serif", n.fillText("DEALER MUST STAND ON 17", 1024 / 2, 1024 * 0.4), n.fillText("INSURANCE PAYS 2 TO 1", 1024 / 2, 1024 * 0.44), n.strokeStyle = "rgba(240,226,182,0.4)", n.setLineDash([3, 9]), n.lineWidth = 3, n.beginPath(), n.ellipse(1024 / 2, 1024 * 0.78, 1024 * 0.15, 1024 * 0.075, 0, 0, $h), n.stroke();
  const o = new Io(e);
  return o.colorSpace = rn, o.anisotropy = 8, o;
}
function e3() {
  const e = document.createElement("canvas");
  e.width = 256, e.height = 256;
  const n = e.getContext("2d"), i = n.createImageData(256, 256), r = i.data;
  for (let o = 0; o < r.length; o += 4) {
    const a = Math.random() * 36 - 18;
    r[o] = 128 + a, r[o + 1] = 128 + a, r[o + 2] = 255, r[o + 3] = 255;
  }
  n.putImageData(i, 0, 0);
  const s = new Io(e);
  return s.wrapS = xo, s.wrapT = xo, s.repeat.set(10, 10), s;
}
function t3() {
  const n = document.createElement("canvas");
  n.width = 1024, n.height = 128;
  const i = n.getContext("2d"), r = i.createLinearGradient(0, 0, 0, 128);
  r.addColorStop(0, "#4a2e1c"), r.addColorStop(0.5, "#35200f"), r.addColorStop(1, "#22140a"), i.fillStyle = r, i.fillRect(0, 0, 1024, 128);
  for (let o = 0; o < 70; o++) {
    i.strokeStyle = `rgba(0,0,0,${Math.random() * 0.16})`, i.lineWidth = Math.random() * 2;
    const a = Math.random() * 128;
    i.beginPath(), i.moveTo(0, a), i.bezierCurveTo(1024 * 0.3, a + Math.random() * 8 - 4, 1024 * 0.6, a + Math.random() * 8 - 4, 1024, a + Math.random() * 6 - 3), i.stroke();
  }
  const s = new Io(n);
  return s.colorSpace = rn, s.wrapS = xo, s.repeat.set(8, 1), s;
}
const OS = {
  1: { base: "#eef1f5", edge: "#c3cbd6", text: "#2a2f3a" },
  5: { base: "#d6363b", edge: "#f4b8ba", text: "#ffffff" },
  25: { base: "#2f9e57", edge: "#bce7cd", text: "#ffffff" },
  100: { base: "#2b2f38", edge: "#8791a0", text: "#ffffff" },
  500: { base: "#7b3fb2", edge: "#d6bcee", text: "#ffffff" }
};
function n3(t) {
  const n = document.createElement("canvas");
  n.width = 256, n.height = 256;
  const i = n.getContext("2d"), r = OS[t];
  i.fillStyle = r.base, i.beginPath(), i.arc(256 / 2, 256 / 2, 256 / 2, 0, $h), i.fill(), i.strokeStyle = r.edge, i.lineWidth = 9, i.setLineDash([14, 20]), i.beginPath(), i.arc(256 / 2, 256 / 2, 256 * 0.34, 0, $h), i.stroke(), i.setLineDash([]), i.fillStyle = r.text, i.textAlign = "center", i.font = `800 ${t >= 100 ? 78 : 96}px system-ui, -apple-system, sans-serif`, i.fillText(String(t), 256 / 2, 256 / 2 + (t >= 100 ? 28 : 34));
  const s = new Io(n);
  return s.colorSpace = rn, s.anisotropy = 8, s;
}
function i3(t) {
  const i = document.createElement("canvas");
  i.width = 256, i.height = 32;
  const r = i.getContext("2d"), s = OS[t];
  r.fillStyle = s.base, r.fillRect(0, 0, 256, 32), r.fillStyle = s.edge;
  for (let a = 0; a < 6; a++) r.fillRect(a * 256 / 6, 0, 256 / 12, 32);
  const o = new Io(i);
  return o.colorSpace = rn, o;
}
const r3 = 1.15, s3 = 1.61, I0 = 0.024, N0 = 0.5, td = 0.15, o3 = 0.42, a3 = -2.7, l3 = 2.5, u3 = 3.6, U0 = 1.2, c3 = new k(6.4, 2.6, -3.6), f3 = [500, 100, 25, 5, 1], d3 = {
  uniforms: { tDiffuse: { value: null }, strength: { value: 1.05 } },
  vertexShader: "varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }",
  fragmentShader: `
    uniform sampler2D tDiffuse; uniform float strength; varying vec2 vUv;
    void main(){
      vec4 c = texture2D(tDiffuse, vUv);
      vec2 d = vUv - 0.5;
      float v = smoothstep(0.9, 0.3, dot(d, d) * strength * 2.0);
      gl_FragColor = vec4(c.rgb * mix(0.8, 1.0, v), c.a);
    }`
};
class h3 {
  constructor(e) {
    this.container = e;
    const n = Math.max(1, e.clientWidth), i = Math.max(1, e.clientHeight);
    this.renderer = new gR({ antialias: !0, alpha: !0 }), this.renderer.setPixelRatio(Math.min(2, window.devicePixelRatio || 1)), this.renderer.setSize(n, i), this.renderer.shadowMap.enabled = !0, this.renderer.shadowMap.type = Qx, this.renderer.toneMapping = Vp, this.renderer.toneMappingExposure = 1.25, e.appendChild(this.renderer.domElement), this.camera = new On(46, n / i, 0.1, 100), this.camera.position.set(0, 9, 9.4), this.camera.lookAt(0, 0, -0.3), this.buildLights(), this.buildTable(), this.composer = new RR(this.renderer), this.composer.addPass(new LR(this.scene, this.camera)), this.bloom = new wo(new Ie(n, i), 0.45, 0.7, 0.9), this.composer.addPass(this.bloom), this.composer.addPass(new ky(d3)), this.composer.addPass(new PR()), this.composer.setSize(n, i), this.ro = new ResizeObserver(() => this.resize()), this.ro.observe(e), this.loop = this.loop.bind(this), this.raf = requestAnimationFrame(this.loop);
  }
  renderer;
  scene = new vR();
  camera;
  composer;
  bloom;
  raf = 0;
  disposed = !1;
  ro;
  cards = /* @__PURE__ */ new Map();
  chips = [];
  chipMat = /* @__PURE__ */ new Map();
  lastBet = -1;
  celebrateUntil = 0;
  buildLights() {
    this.scene.add(new xR(10796242, 2175018, 1.25));
    const e = new kv(16773592, 2.6);
    e.position.set(3, 13, 7), e.target.position.set(0, 0, 0), e.castShadow = !0, e.shadow.mapSize.set(2048, 2048), e.shadow.camera.near = 1, e.shadow.camera.far = 42, e.shadow.camera.left = -12, e.shadow.camera.right = 12, e.shadow.camera.top = 12, e.shadow.camera.bottom = -12, e.shadow.bias = -5e-4, this.scene.add(e), this.scene.add(e.target);
    const n = new SR(16769965, 3.4, 0, Math.PI / 4.2, 0.65, 0);
    n.position.set(0, 10, 3), n.target.position.set(0, 0, 1), this.scene.add(n), this.scene.add(n.target);
    const i = new kv(9416959, 0.6);
    i.position.set(-7, 4, -7), this.scene.add(i);
  }
  buildTable() {
    const e = t3();
    e.repeat.set(3, 2);
    const n = new Sn(
      new Eo(16.8, 11),
      new Xr({ map: e, roughness: 0.5, metalness: 0.06 })
    );
    n.rotation.x = -Math.PI / 2, n.position.y = -0.05, n.receiveShadow = !0, this.scene.add(n);
    const i = e3(), r = new Sn(
      new Eo(15, 9.5),
      new Xr({
        map: JP(),
        normalMap: i,
        normalScale: new Ie(0.3, 0.3),
        roughness: 0.97,
        metalness: 0
      })
    );
    r.rotation.x = -Math.PI / 2, r.position.y = 0, r.receiveShadow = !0, this.scene.add(r);
  }
  // --- meshes ---------------------------------------------------------------
  makeCard(e) {
    const n = new Xr({ color: 15987177, roughness: 0.75 }), i = new Xr({ map: KP(e.rank, e.suit), roughness: 0.5 }), r = new Xr({ map: ZP(), roughness: 0.5 }), s = new Sn(new Lo(r3, I0, s3), [n, n, i, r, n, n]);
    return s.castShadow = !0, s;
  }
  chipMaterials(e) {
    let n = this.chipMat.get(e);
    if (!n) {
      const i = new Xr({ map: i3(e), roughness: 0.6 }), r = new Xr({ map: n3(e), roughness: 0.55 });
      n = [i, r, r], this.chipMat.set(e, n);
    }
    return n;
  }
  makeChip(e) {
    const n = new Sn(new tm(N0, N0, td, 40), this.chipMaterials(e));
    return n.castShadow = !0, n;
  }
  // --- reconcile ------------------------------------------------------------
  update(e) {
    if (this.disposed) return;
    const n = /* @__PURE__ */ new Set(), i = (s, o, a, l) => {
      const u = s.length;
      s.forEach((c, d) => {
        n.add(c.id);
        const h = a + (d - (u - 1) / 2) * o3, p = new k(h, I0 / 2 + 0.012 + d * 6e-3, o + d * 0.16), _ = l && d === 1;
        let y = this.cards.get(c.id);
        if (!y) {
          const m = this.makeCard(c);
          m.position.copy(c3), m.rotation.set(_ ? Math.PI : 0, -0.5, 0), this.scene.add(m), y = { mesh: m, pos: p, rotX: _ ? Math.PI : 0, yaw: 0 }, this.cards.set(c.id, y);
        }
        y.pos = p, y.rotX = _ ? Math.PI : 0, y.yaw = (d - (u - 1) / 2) * 0.04;
      });
    };
    i(e.dealer, a3, 0, e.holeHidden);
    const r = e.playerHands;
    r.forEach((s, o) => {
      const a = (o - (r.length - 1) / 2) * u3;
      i(s.cards, l3, a, !1);
    });
    for (const [s, o] of this.cards)
      n.has(s) || (this.scene.remove(o.mesh), o.mesh.geometry.dispose(), this.cards.delete(s));
    this.updateChips(e), e.phase === "settle" && e.lastNet > 0 && (this.celebrateUntil = performance.now() + 1500, this.bloom.strength = 1.3);
  }
  updateChips(e) {
    const n = e.phase === "betting" ? e.bet : e.playerHands.reduce((s, o) => s + o.bet, 0);
    if (n === this.lastBet && e.phase !== "betting" || n === this.lastBet) return;
    this.lastBet = n;
    for (const s of this.chips)
      this.scene.remove(s.mesh), s.mesh.geometry.dispose();
    this.chips = [];
    let i = n, r = 0;
    for (const s of f3)
      for (; i >= s && r < 14; ) {
        const o = this.makeChip(s);
        o.position.set(0.2, 4 + r, U0), this.scene.add(o), this.chips.push({ mesh: o, pos: new k(0, 0.02 + td / 2 + r * td, U0) }), i -= s, r += 1;
      }
  }
  // --- loop -----------------------------------------------------------------
  loop() {
    if (!this.disposed) {
      for (const e of this.cards.values())
        e.mesh.position.lerp(e.pos, 0.16), e.mesh.rotation.x += (e.rotX - e.mesh.rotation.x) * 0.14, e.mesh.rotation.y += (e.yaw - e.mesh.rotation.y) * 0.16;
      for (const e of this.chips) e.mesh.position.lerp(e.pos, 0.2);
      this.celebrateUntil && performance.now() > this.celebrateUntil && (this.celebrateUntil = 0, this.bloom.strength = 0.45), this.composer.render(), this.raf = requestAnimationFrame(this.loop);
    }
  }
  resize() {
    const e = Math.max(1, this.container.clientWidth), n = Math.max(1, this.container.clientHeight);
    this.renderer.setSize(e, n), this.composer.setSize(e, n), this.camera.aspect = e / n, this.camera.updateProjectionMatrix();
  }
  dispose() {
    this.disposed = !0, cancelAnimationFrame(this.raf), this.ro.disconnect(), QP(), this.renderer.dispose(), this.renderer.domElement.remove();
  }
}
function p3(t, e) {
  const [n, i] = Dt.useState(null), r = Dt.useRef(null);
  return Dt.useEffect(() => {
    const s = new SE(t, i, {
      deal: () => e.deal(),
      chip: () => e.chip(),
      win: () => e.win(),
      lose: () => e.lose(),
      push: () => e.push(),
      blackjack: () => e.blackjack()
    });
    return r.current = s, i(s.getState()), () => {
      s.dispose(), r.current = null;
    };
  }, []), { state: n, game: r.current };
}
function m3(t) {
  if (t.dealer.length === 0) return "—";
  if (t.holeHidden) return `${zi([t.dealer[0]]).total} + ?`;
  const { total: e } = zi(t.dealer);
  return String(e);
}
function g3(t) {
  const e = t.playerHands[t.activeHand] ?? t.playerHands[0];
  if (!e || e.cards.length === 0) return "—";
  const { total: n, soft: i } = zi(e.cards);
  return n > 21 ? `${n} — bust` : i && n !== 21 ? `${n - 10}/${n}` : String(n);
}
function v3({
  api: t,
  audio: e,
  onExit: n
}) {
  const { state: i, game: r } = p3(t, e), [s, o] = Dt.useState(e.isMuted), [a, l] = Dt.useState(!1), u = Dt.useRef(null), c = Dt.useRef(null), d = (p) => {
    p && (e.unlock(), p());
  };
  Dt.useEffect(() => {
    if (!u.current) return;
    const p = new h3(u.current);
    return c.current = p, () => {
      p.dispose(), c.current = null;
    };
  }, []), Dt.useEffect(() => {
    i && c.current?.update(i);
  }, [i]), Dt.useEffect(() => {
    const p = (_) => {
      if (!r || !i) return;
      const y = _.key.toLowerCase();
      i.phase === "betting" && (y === "enter" || y === " ") ? d(() => r.deal()) : i.phase === "playing" ? y === "h" ? d(() => r.hit()) : y === "s" ? d(() => r.stand()) : y === "d" && r.canDouble() ? d(() => r.double()) : y === "p" && r.canSplit() && d(() => r.split()) : i.phase === "settle" && (y === "enter" || y === " ") ? d(() => r.newRound()) : i.phase === "insurance" && (y === "y" ? d(() => r.takeInsurance()) : y === "n" && d(() => r.declineInsurance())), ["arrowup", "arrowdown", "arrowleft", "arrowright", " "].includes(y) && _.preventDefault();
    };
    return window.addEventListener("keydown", p), () => window.removeEventListener("keydown", p);
  });
  const h = () => {
    const p = !s;
    o(p), e.setMuted(p);
  };
  return /* @__PURE__ */ U.jsxs("div", { className: "mg-bj", children: [
    /* @__PURE__ */ U.jsx("div", { className: "mg-scene", ref: u }),
    /* @__PURE__ */ U.jsxs("div", { className: "mg-hud-top", children: [
      /* @__PURE__ */ U.jsx("button", { className: "mg-icon-btn", onClick: n, title: "Back to games", children: "‹ Games" }),
      i ? /* @__PURE__ */ U.jsxs("div", { className: "mg-bankroll", children: [
        /* @__PURE__ */ U.jsx("span", { className: "mg-bankroll-chip" }),
        " $",
        i.bankroll
      ] }) : null,
      /* @__PURE__ */ U.jsxs("div", { className: "mg-topbar-right", children: [
        i ? /* @__PURE__ */ U.jsxs("span", { className: "mg-stat-sm", children: [
          i.stats.wins,
          "W · ",
          i.stats.blackjacks,
          "BJ · ",
          i.stats.hands
        ] }) : null,
        /* @__PURE__ */ U.jsx("button", { className: "mg-icon-btn", onClick: h, title: "Sound", children: s ? "🔇" : "♪" }),
        /* @__PURE__ */ U.jsx(
          "button",
          {
            className: `mg-icon-btn${a ? " on" : ""}`,
            onClick: () => l((p) => !p),
            title: "Settings",
            children: "⚙"
          }
        )
      ] })
    ] }),
    i && (i.dealer.length > 0 || i.playerHands.length > 0) ? /* @__PURE__ */ U.jsxs("div", { className: "mg-readout", children: [
      /* @__PURE__ */ U.jsxs("span", { children: [
        "Dealer ",
        m3(i)
      ] }),
      /* @__PURE__ */ U.jsxs("span", { className: "mg-readout-you", children: [
        "You ",
        g3(i)
      ] })
    ] }) : null,
    i && a ? /* @__PURE__ */ U.jsxs("div", { className: "mg-settings mg-hud-settings", children: [
      /* @__PURE__ */ U.jsxs("div", { className: "mg-set-row", children: [
        /* @__PURE__ */ U.jsx("span", { className: "mg-set-label", children: "Decks" }),
        /* @__PURE__ */ U.jsx("div", { className: "mg-seg", children: [1, 2, 4, 6, 8].map((p) => /* @__PURE__ */ U.jsx(
          "button",
          {
            className: `mg-seg-btn${i.settings.decks === p ? " active" : ""}`,
            disabled: i.phase !== "betting",
            onClick: () => r?.setDecks(p),
            children: p
          },
          p
        )) })
      ] }),
      /* @__PURE__ */ U.jsxs("div", { className: "mg-set-row", children: [
        /* @__PURE__ */ U.jsx("span", { className: "mg-set-label", children: "Dealer hits soft 17" }),
        /* @__PURE__ */ U.jsx(
          "button",
          {
            className: `mg-toggle${i.settings.hitSoft17 ? " on" : ""}`,
            disabled: i.phase !== "betting",
            onClick: () => r?.setHitSoft17(!i.settings.hitSoft17),
            children: /* @__PURE__ */ U.jsx("span", { className: "mg-toggle-dot" })
          }
        )
      ] })
    ] }) : null,
    i && i.phase === "settle" ? /* @__PURE__ */ U.jsx("div", { className: `mg-banner ${i.lastNet > 0 ? "good" : i.lastNet < 0 ? "bad" : "neutral"}`, children: /* @__PURE__ */ U.jsx("div", { className: "mg-banner-text", children: i.message }) }) : null,
    i && i.phase === "insurance" ? /* @__PURE__ */ U.jsx("div", { className: "mg-banner neutral", children: /* @__PURE__ */ U.jsx("div", { className: "mg-banner-text", children: "Insurance?" }) }) : null,
    /* @__PURE__ */ U.jsx("div", { className: "mg-hud-bottom", children: i && r ? _3(i, r, d) : null })
  ] });
}
function _3(t, e, n) {
  return t.phase === "betting" ? t.bankroll <= 0 && t.bet <= 0 ? /* @__PURE__ */ U.jsxs("div", { className: "mg-broke", children: [
    /* @__PURE__ */ U.jsx("span", { children: "Out of chips." }),
    /* @__PURE__ */ U.jsxs("button", { className: "mg-btn primary", onClick: () => n(() => e.rebuy()), children: [
      "Buy in $",
      t.settings.startingBankroll
    ] })
  ] }) : /* @__PURE__ */ U.jsxs("div", { className: "mg-bet", children: [
    /* @__PURE__ */ U.jsx("div", { className: "mg-chiprack", children: mE.map((i) => /* @__PURE__ */ U.jsx(
      "button",
      {
        className: "mg-chip-btn",
        disabled: t.bet + i > t.bankroll,
        onClick: () => n(() => e.addChip(i)),
        title: `Bet $${i}`,
        children: /* @__PURE__ */ U.jsx(vE, { value: i, size: 54 })
      },
      i
    )) }),
    /* @__PURE__ */ U.jsxs("div", { className: "mg-bet-right", children: [
      /* @__PURE__ */ U.jsx("button", { className: "mg-btn ghost", disabled: t.bet <= 0, onClick: () => n(() => e.clearBet()), children: "Clear" }),
      /* @__PURE__ */ U.jsxs("button", { className: "mg-btn primary", disabled: t.bet <= 0, onClick: () => n(() => e.deal()), children: [
        "Deal $",
        t.bet || ""
      ] })
    ] })
  ] }) : t.phase === "insurance" ? /* @__PURE__ */ U.jsxs("div", { className: "mg-row", children: [
    /* @__PURE__ */ U.jsx("button", { className: "mg-btn", onClick: () => n(() => e.takeInsurance()), children: "Insurance (Y)" }),
    /* @__PURE__ */ U.jsx("button", { className: "mg-btn ghost", onClick: () => n(() => e.declineInsurance()), children: "No (N)" })
  ] }) : t.phase === "playing" ? /* @__PURE__ */ U.jsxs("div", { className: "mg-row", children: [
    /* @__PURE__ */ U.jsx("button", { className: "mg-btn primary", onClick: () => n(() => e.hit()), children: "Hit" }),
    /* @__PURE__ */ U.jsx("button", { className: "mg-btn", onClick: () => n(() => e.stand()), children: "Stand" }),
    /* @__PURE__ */ U.jsx("button", { className: "mg-btn", disabled: !e.canDouble(), onClick: () => n(() => e.double()), children: "Double" }),
    /* @__PURE__ */ U.jsx("button", { className: "mg-btn", disabled: !e.canSplit(), onClick: () => n(() => e.split()), children: "Split" })
  ] }) : t.phase === "dealer" ? /* @__PURE__ */ U.jsx("div", { className: "mg-row muted", children: "Dealer plays…" }) : /* @__PURE__ */ U.jsx("div", { className: "mg-row", children: /* @__PURE__ */ U.jsx("button", { className: "mg-btn primary", onClick: () => n(() => e.newRound()), children: "Deal again" }) });
}
class x3 {
  ctx = null;
  muted = !1;
  /** Lazily create + resume the context. Call from a keydown handler. */
  unlock() {
    if (!this.muted) {
      if (!this.ctx)
        try {
          const e = window.AudioContext ?? window.webkitAudioContext;
          this.ctx = e ? new e() : null;
        } catch {
          this.ctx = null;
        }
      this.ctx && this.ctx.state === "suspended" && this.ctx.resume().catch(() => {
      });
    }
  }
  setMuted(e) {
    this.muted = e;
  }
  get isMuted() {
    return this.muted;
  }
  /** One enveloped tone. gain is peak; the fast attack + exponential decay is what
   *  makes it read as a "blip" rather than a click or a drone. */
  tone(e, n, i, r, s = 0) {
    const o = this.ctx;
    if (!o || this.muted) return;
    const a = o.currentTime + s, l = o.createOscillator(), u = o.createGain();
    l.type = i, l.frequency.setValueAtTime(e, a), u.gain.setValueAtTime(1e-4, a), u.gain.linearRampToValueAtTime(r, a + 6e-3), u.gain.exponentialRampToValueAtTime(1e-4, a + n), l.connect(u), u.connect(o.destination), l.start(a), l.stop(a + n + 0.02);
  }
  /** A pitch glide — used for the game-over "fall". */
  glide(e, n, i, r, s) {
    const o = this.ctx;
    if (!o || this.muted) return;
    const a = o.currentTime, l = o.createOscillator(), u = o.createGain();
    l.type = r, l.frequency.setValueAtTime(e, a), l.frequency.exponentialRampToValueAtTime(Math.max(1, n), a + i), u.gain.setValueAtTime(s, a), u.gain.exponentialRampToValueAtTime(1e-4, a + i), l.connect(u), u.connect(o.destination), l.start(a), l.stop(a + i + 0.02);
  }
  /** Eat — a bright two-note pop, pitched up a touch with the score so a long run
   *  feels like it's climbing. This is the sound the whole game is tuned around. */
  eat(e) {
    const n = 540 + Math.min(e, 45) * 7;
    this.tone(n, 0.07, "triangle", 0.2), this.tone(n * 1.5, 0.09, "triangle", 0.16, 0.055);
  }
  /** Turn — a soft, low tick so steering has tactile feedback without nagging. */
  turn() {
    this.tone(240, 0.028, "square", 0.04);
  }
  /** Start / new game — a quick rising arpeggio. */
  start() {
    this.tone(440, 0.08, "triangle", 0.16, 0), this.tone(587, 0.08, "triangle", 0.16, 0.075), this.tone(880, 0.12, "triangle", 0.17, 0.15);
  }
  /** Game over — a descending fall plus a low thud. */
  gameOver() {
    this.glide(440, 90, 0.5, "sawtooth", 0.18), this.tone(120, 0.28, "sine", 0.14, 0.14);
  }
  dispose() {
    this.ctx && (this.ctx.close().catch(() => {
    }), this.ctx = null);
  }
}
const Fi = 20, Pt = 24, _i = Fi * Pt, y3 = 92, sc = 1, jh = 5, Bs = [
  { name: "Neon", bg: "#0a0b12", grid: "rgba(90,220,255,0.07)", snake: "#38f0ff", food: "#ff2d78", glow: !0, shape: "rounded" },
  { name: "Classic", bg: "#9bbc0f", grid: "rgba(15,56,15,0.14)", snake: "#0f380f", food: "#215021", glow: !1, shape: "square" },
  { name: "Midnight", bg: "#0b1026", grid: "rgba(160,180,255,0.06)", snake: "#8aa2ff", food: "#ffd166", glow: !0, shape: "rounded" },
  { name: "Candy", bg: "#fff0f6", grid: "rgba(255,120,170,0.16)", snake: "#ff5fa2", food: "#7c5cff", glow: !1, shape: "rounded" },
  { name: "Ember", bg: "#160f0c", grid: "rgba(255,140,60,0.08)", snake: "#ff8a3d", food: "#ffe14d", glow: !0, shape: "rounded" }
];
class S3 {
  constructor(e, n, i) {
    this.api = n, this.onChange = i;
    const r = e.getContext("2d");
    if (!r) throw new Error("Snake: no 2D canvas context");
    this.g = r;
    const s = Math.max(1, Math.min(3, window.devicePixelRatio || 1));
    e.width = _i * s, e.height = _i * s, e.style.width = `${_i}px`, e.style.height = `${_i}px`, this.g.scale(s, s), this.loadPrefs(), this.reset(), this.loop = this.loop.bind(this), this.rafId = requestAnimationFrame(this.loop);
  }
  g;
  snake = [];
  dir = { x: 1, y: 0 };
  nextDir = { x: 1, y: 0 };
  fruits = [];
  status = "ready";
  score = 0;
  high = 0;
  fruitCount = 1;
  skin = 0;
  lastStep = 0;
  rafId = null;
  audio = new x3();
  disposed = !1;
  get muted() {
    return this.audio.isMuted;
  }
  // --- lifecycle / commands ---------------------------------------------------
  newGame() {
    this.audio.unlock(), this.reset(), this.status = "playing", this.lastStep = performance.now(), this.audio.start(), this.emit();
  }
  togglePause() {
    this.status === "playing" ? this.status = "paused" : this.status === "paused" && (this.status = "playing", this.lastStep = performance.now()), this.emit();
  }
  toggleMute() {
    this.audio.setMuted(!this.audio.isMuted), this.emit();
  }
  /** Number of fruits on the board at once (Google-Snake-style "apples" setting). */
  setFruitCount(e) {
    const n = Math.max(sc, Math.min(jh, Math.round(e)));
    n !== this.fruitCount && (this.fruitCount = n, this.api.storage.set("snake.fruitCount", n).catch(() => {
    }), this.syncFruits(), this.emit());
  }
  setSkin(e) {
    const n = (e % Bs.length + Bs.length) % Bs.length;
    n !== this.skin && (this.skin = n, this.api.storage.set("snake.skin", n).catch(() => {
    }), this.emit());
  }
  dispose() {
    this.disposed = !0, this.rafId !== null && cancelAnimationFrame(this.rafId), this.rafId = null, this.audio.dispose();
  }
  /** Returns true if the key was handled (so the view can preventDefault). */
  handleKey(e) {
    this.audio.unlock();
    const n = e.toLowerCase(), i = n === "arrowup" || n === "w" ? { x: 0, y: -1 } : n === "arrowdown" || n === "s" ? { x: 0, y: 1 } : n === "arrowleft" || n === "a" ? { x: -1, y: 0 } : n === "arrowright" || n === "d" ? { x: 1, y: 0 } : null;
    return i ? (this.status === "ready" && (this.status = "playing", this.lastStep = performance.now(), this.audio.start()), this.status !== "playing" || i.x === -this.dir.x && i.y === -this.dir.y || ((i.x !== this.nextDir.x || i.y !== this.nextDir.y) && this.audio.turn(), this.nextDir = i), !0) : n === " " || n === "spacebar" ? (this.togglePause(), !0) : n === "enter" ? ((this.status === "gameover" || this.status === "ready") && this.newGame(), !0) : n === "m" ? (this.toggleMute(), !0) : !1;
  }
  // --- internals --------------------------------------------------------------
  async loadPrefs() {
    try {
      const [e, n, i] = await Promise.all([
        this.api.storage.get("snake.highScore"),
        this.api.storage.get("snake.fruitCount"),
        this.api.storage.get("snake.skin")
      ]);
      typeof e == "number" && e > this.high && (this.high = e), typeof n == "number" && (this.fruitCount = Math.max(sc, Math.min(jh, n))), typeof i == "number" && i >= 0 && i < Bs.length && (this.skin = i), this.syncFruits(), this.emit();
    } catch {
    }
  }
  reset() {
    const e = Math.floor(Fi / 2);
    this.snake = [
      { x: e, y: e },
      { x: e - 1, y: e },
      { x: e - 2, y: e }
    ], this.dir = { x: 1, y: 0 }, this.nextDir = { x: 1, y: 0 }, this.score = 0, this.fruits = [], this.syncFruits(), this.status = "ready", this.emit();
  }
  /** Keep exactly `fruitCount` fruits on the board — top up after eating or after
   *  the count is raised; trim if it was lowered. */
  syncFruits() {
    for (; this.fruits.length > this.fruitCount; ) this.fruits.pop();
    for (; this.fruits.length < this.fruitCount; ) {
      const e = this.freeCell();
      if (!e) break;
      this.fruits.push(e);
    }
  }
  freeCell() {
    const e = /* @__PURE__ */ new Set();
    for (const n of this.snake) e.add(`${n.x},${n.y}`);
    for (const n of this.fruits) e.add(`${n.x},${n.y}`);
    if (e.size >= Fi * Fi) return null;
    for (; ; ) {
      const n = { x: Math.floor(Math.random() * Fi), y: Math.floor(Math.random() * Fi) };
      if (!e.has(`${n.x},${n.y}`)) return n;
    }
  }
  step() {
    this.dir = this.nextDir;
    const e = this.snake[0], n = e.x + this.dir.x, i = e.y + this.dir.y, r = n < 0 || i < 0 || n >= Fi || i >= Fi, s = this.snake.some(
      (a, l) => l < this.snake.length - 1 && a.x === n && a.y === i
    );
    if (r || s) {
      this.gameOver();
      return;
    }
    this.snake.unshift({ x: n, y: i });
    const o = this.fruits.findIndex((a) => a.x === n && a.y === i);
    o >= 0 ? (this.fruits.splice(o, 1), this.score += 1, this.audio.eat(this.score), this.syncFruits()) : this.snake.pop(), this.emit();
  }
  gameOver() {
    this.status = "gameover", this.audio.gameOver(), this.score > this.high && (this.high = this.score, this.api.storage.set("snake.highScore", this.high).catch(() => {
    })), this.emit();
  }
  emit() {
    this.onChange({
      score: this.score,
      high: this.high,
      status: this.status,
      muted: this.muted,
      fruitCount: this.fruitCount,
      skin: this.skin
    });
  }
  loop(e) {
    this.disposed || (this.status === "playing" && e - this.lastStep >= y3 && (this.lastStep = e, this.step()), this.render(e), this.rafId = requestAnimationFrame(this.loop));
  }
  // --- rendering --------------------------------------------------------------
  roundRect(e, n, i, r, s) {
    const o = this.g;
    o.beginPath(), o.moveTo(e + s, n), o.arcTo(e + i, n, e + i, n + r, s), o.arcTo(e + i, n + r, e, n + r, s), o.arcTo(e, n + r, e, n, s), o.arcTo(e, n, e + i, n, s), o.closePath();
  }
  render(e) {
    const n = this.g, i = Bs[this.skin];
    n.clearRect(0, 0, _i, _i), n.fillStyle = i.bg, n.fillRect(0, 0, _i, _i), n.strokeStyle = i.grid, n.lineWidth = 1, n.beginPath();
    for (let o = 1; o < Fi; o++)
      n.moveTo(o * Pt + 0.5, 0), n.lineTo(o * Pt + 0.5, _i), n.moveTo(0, o * Pt + 0.5), n.lineTo(_i, o * Pt + 0.5);
    n.stroke();
    const r = 0.5 + 0.5 * Math.sin(e / 280);
    for (const o of this.fruits) {
      const a = o.x * Pt + Pt / 2, l = o.y * Pt + Pt / 2;
      if (n.save(), i.glow && (n.shadowColor = i.food, n.shadowBlur = 8 + r * 9), n.fillStyle = i.food, i.shape === "square") {
        const u = Pt * 0.6;
        n.fillRect(a - u / 2, l - u / 2, u, u);
      } else
        n.beginPath(), n.arc(a, l, Pt * 0.3 + r * 1.8, 0, Math.PI * 2), n.fill();
      n.restore();
    }
    const s = this.snake.length;
    n.fillStyle = i.snake, i.glow && (n.save(), n.shadowColor = i.snake, n.shadowBlur = 6);
    for (let o = s - 1; o >= 0; o--) {
      const a = this.snake[o], l = 1 - o / Math.max(1, s);
      n.globalAlpha = 0.5 + 0.5 * l;
      const u = i.shape === "square" ? 1 : o === 0 ? 1.5 : 2.4, c = i.shape === "square" ? 0 : 6;
      this.roundRect(a.x * Pt + u, a.y * Pt + u, Pt - 2 * u, Pt - 2 * u, c), n.fill();
    }
    if (n.globalAlpha = 1, i.glow && n.restore(), i.shape === "rounded") {
      const o = this.snake[0], a = o.x * Pt, l = o.y * Pt, u = this.dir, c = { x: u.y, y: u.x }, d = a + Pt / 2 + u.x * 4, h = l + Pt / 2 + u.y * 4;
      n.fillStyle = i.bg;
      for (const p of [1, -1])
        n.beginPath(), n.arc(d + c.x * 4 * p, h + c.y * 4 * p, 2.4, 0, Math.PI * 2), n.fill();
    }
  }
}
function M3({ state: t }) {
  if (t.status === "ready")
    return /* @__PURE__ */ U.jsxs(U.Fragment, { children: [
      /* @__PURE__ */ U.jsx("div", { className: "mg-ov-title", children: "Snake" }),
      /* @__PURE__ */ U.jsxs("div", { className: "mg-ov-sub", children: [
        "Press an ",
        /* @__PURE__ */ U.jsx("kbd", { children: "arrow" }),
        " or ",
        /* @__PURE__ */ U.jsx("kbd", { children: "WASD" }),
        " to start"
      ] })
    ] });
  if (t.status === "paused")
    return /* @__PURE__ */ U.jsxs(U.Fragment, { children: [
      /* @__PURE__ */ U.jsx("div", { className: "mg-ov-title", children: "Paused" }),
      /* @__PURE__ */ U.jsxs("div", { className: "mg-ov-sub", children: [
        "Press ",
        /* @__PURE__ */ U.jsx("kbd", { children: "Space" }),
        " to resume"
      ] })
    ] });
  const e = t.score >= t.high && t.score > 0 ? " · new best!" : "";
  return /* @__PURE__ */ U.jsxs(U.Fragment, { children: [
    /* @__PURE__ */ U.jsx("div", { className: "mg-ov-title", children: "Game Over" }),
    /* @__PURE__ */ U.jsx("div", { className: "mg-ov-big", children: t.score }),
    /* @__PURE__ */ U.jsxs("div", { className: "mg-ov-sub", children: [
      "Best ",
      t.high,
      e
    ] }),
    /* @__PURE__ */ U.jsxs("div", { className: "mg-ov-sub", children: [
      "Press ",
      /* @__PURE__ */ U.jsx("kbd", { children: "Enter" }),
      " to play again"
    ] })
  ] });
}
function E3({ api: t, onExit: e }) {
  const n = Dt.useRef(null), i = Dt.useRef(null), [r, s] = Dt.useState(null);
  Dt.useEffect(() => {
    const u = new S3(n.current, t, s);
    i.current = u;
    const c = (d) => {
      u.handleKey(d.key) && (d.preventDefault(), d.stopPropagation());
    };
    return window.addEventListener("keydown", c), () => {
      window.removeEventListener("keydown", c), u.dispose(), i.current = null;
    };
  }, []);
  const o = i.current, a = r?.fruitCount ?? 1, l = r?.skin ?? 0;
  return /* @__PURE__ */ U.jsxs("div", { className: "mg-snake", children: [
    /* @__PURE__ */ U.jsxs("div", { className: "mg-topbar", children: [
      /* @__PURE__ */ U.jsx("button", { className: "mg-icon-btn", onClick: e, title: "Back to games", children: "‹ Games" }),
      /* @__PURE__ */ U.jsxs("div", { className: "mg-snake-stats", children: [
        /* @__PURE__ */ U.jsxs("span", { className: "mg-stat-pill", children: [
          "Score ",
          /* @__PURE__ */ U.jsx("b", { children: r?.score ?? 0 })
        ] }),
        /* @__PURE__ */ U.jsxs("span", { className: "mg-stat-pill", children: [
          "Best ",
          /* @__PURE__ */ U.jsx("b", { children: r?.high ?? 0 })
        ] })
      ] }),
      /* @__PURE__ */ U.jsx("div", { className: "mg-topbar-right", children: /* @__PURE__ */ U.jsx("button", { className: "mg-icon-btn", onClick: () => o?.toggleMute(), title: "Mute (M)", children: r?.muted ? "🔇" : "♪" }) })
    ] }),
    /* @__PURE__ */ U.jsxs("div", { className: "mg-snake-board", children: [
      /* @__PURE__ */ U.jsx("canvas", { ref: n, className: "mg-snake-canvas" }),
      r && r.status !== "playing" ? /* @__PURE__ */ U.jsx("div", { className: "mg-snake-overlay", children: /* @__PURE__ */ U.jsx(M3, { state: r }) }) : null
    ] }),
    /* @__PURE__ */ U.jsxs("div", { className: "mg-snake-settings", children: [
      /* @__PURE__ */ U.jsxs("div", { className: "mg-control", children: [
        /* @__PURE__ */ U.jsx("span", { className: "mg-set-label", children: "Apples" }),
        /* @__PURE__ */ U.jsx("div", { className: "mg-seg", children: Array.from({ length: jh - sc + 1 }, (u, c) => sc + c).map((u) => /* @__PURE__ */ U.jsx(
          "button",
          {
            className: `mg-seg-btn${a === u ? " active" : ""}`,
            onClick: () => o?.setFruitCount(u),
            children: u
          },
          u
        )) })
      ] }),
      /* @__PURE__ */ U.jsxs("div", { className: "mg-control", children: [
        /* @__PURE__ */ U.jsx("span", { className: "mg-set-label", children: "Style" }),
        /* @__PURE__ */ U.jsx("div", { className: "mg-swatches", children: Bs.map((u, c) => /* @__PURE__ */ U.jsxs(
          "button",
          {
            className: `mg-swatch${l === c ? " active" : ""}`,
            title: u.name,
            style: { background: u.bg },
            onClick: () => o?.setSkin(c),
            children: [
              /* @__PURE__ */ U.jsx("span", { className: "mg-sw-snake", style: { background: u.snake } }),
              /* @__PURE__ */ U.jsx("span", { className: "mg-sw-food", style: { background: u.food } })
            ]
          },
          u.name
        )) })
      ] })
    ] }),
    /* @__PURE__ */ U.jsx("div", { className: "mg-snake-hint", children: "Arrows / WASD move · Space pause · Enter restart · M mute" })
  ] });
}
function w3() {
  return /* @__PURE__ */ U.jsxs("div", { className: "mg-tile-art bj", children: [
    /* @__PURE__ */ U.jsx("span", { className: "mg-tile-card c1", children: /* @__PURE__ */ U.jsx(Wh, { rank: "A", suit: "S" }) }),
    /* @__PURE__ */ U.jsx("span", { className: "mg-tile-card c2", children: /* @__PURE__ */ U.jsx(Wh, { rank: "K", suit: "H" }) })
  ] });
}
function T3() {
  return /* @__PURE__ */ U.jsx("div", { className: "mg-tile-art snake", children: /* @__PURE__ */ U.jsxs("svg", { viewBox: "0 0 140 96", width: "140", height: "96", "aria-hidden": "true", children: [
    /* @__PURE__ */ U.jsxs("g", { fill: "#38f0ff", children: [
      /* @__PURE__ */ U.jsx("rect", { x: "22", y: "58", width: "18", height: "18", rx: "5" }),
      /* @__PURE__ */ U.jsx("rect", { x: "40", y: "58", width: "18", height: "18", rx: "5" }),
      /* @__PURE__ */ U.jsx("rect", { x: "58", y: "58", width: "18", height: "18", rx: "5" }),
      /* @__PURE__ */ U.jsx("rect", { x: "58", y: "40", width: "18", height: "18", rx: "5" }),
      /* @__PURE__ */ U.jsx("rect", { x: "58", y: "22", width: "18", height: "18", rx: "5", opacity: "0.95" }),
      /* @__PURE__ */ U.jsx("rect", { x: "76", y: "22", width: "18", height: "18", rx: "5", opacity: "0.95" }),
      /* @__PURE__ */ U.jsx("circle", { cx: "87", cy: "27", r: "1.8", fill: "#0a0b12" }),
      /* @__PURE__ */ U.jsx("circle", { cx: "87", cy: "35", r: "1.8", fill: "#0a0b12" })
    ] }),
    /* @__PURE__ */ U.jsx("circle", { cx: "112", cy: "66", r: "7", fill: "#ff2d78" })
  ] }) });
}
function k0({
  onClick: t,
  art: e,
  name: n,
  desc: i
}) {
  return /* @__PURE__ */ U.jsxs("button", { className: "mg-tile", onClick: t, children: [
    e,
    /* @__PURE__ */ U.jsxs("div", { className: "mg-tile-body", children: [
      /* @__PURE__ */ U.jsx("div", { className: "mg-tile-name", children: n }),
      /* @__PURE__ */ U.jsx("div", { className: "mg-tile-desc", children: i })
    ] })
  ] });
}
function C3({ onPlay: t }) {
  return /* @__PURE__ */ U.jsxs("div", { className: "mg-launcher", children: [
    /* @__PURE__ */ U.jsxs("header", { className: "mg-launcher-head", children: [
      /* @__PURE__ */ U.jsx("div", { className: "mg-launcher-title", children: "Mini Games" }),
      /* @__PURE__ */ U.jsx("div", { className: "mg-launcher-sub", children: "A little arcade inside Agent Code" })
    ] }),
    /* @__PURE__ */ U.jsxs("div", { className: "mg-grid", children: [
      /* @__PURE__ */ U.jsx(k0, { onClick: () => t("blackjack"), art: /* @__PURE__ */ U.jsx(w3, {}), name: "Blackjack", desc: "Beat the dealer to 21" }),
      /* @__PURE__ */ U.jsx(k0, { onClick: () => t("snake"), art: /* @__PURE__ */ U.jsx(T3, {}), name: "Snake", desc: "Eat, grow, don't crash" })
    ] })
  ] });
}
function A3({ api: t, audio: e }) {
  const n = Dt.useSyncExternalStore(gr.subscribe, gr.get);
  return /* @__PURE__ */ U.jsx("div", { className: "mg-root", children: n === "blackjack" ? /* @__PURE__ */ U.jsx(v3, { api: t, audio: e, onExit: () => gr.show("launcher") }) : n === "snake" ? /* @__PURE__ */ U.jsx(E3, { api: t, onExit: () => gr.show("launcher") }) : /* @__PURE__ */ U.jsx(C3, { onPlay: (i) => gr.show(i) }) });
}
class R3 {
  ctx = null;
  noiseBuf = null;
  muted = !1;
  unlock() {
    if (!this.muted) {
      if (!this.ctx)
        try {
          const e = window.AudioContext ?? window.webkitAudioContext;
          this.ctx = e ? new e() : null, this.ctx && this.buildNoise();
        } catch {
          this.ctx = null;
        }
      this.ctx && this.ctx.state === "suspended" && this.ctx.resume().catch(() => {
      });
    }
  }
  setMuted(e) {
    this.muted = e;
  }
  get isMuted() {
    return this.muted;
  }
  buildNoise() {
    const e = this.ctx, n = Math.floor(e.sampleRate * 0.4), i = e.createBuffer(1, n, e.sampleRate), r = i.getChannelData(0);
    for (let s = 0; s < n; s++) r[s] = Math.random() * 2 - 1;
    this.noiseBuf = i;
  }
  tone(e, n, i, r, s = 0, o) {
    const a = this.ctx;
    if (!a || this.muted) return;
    const l = a.currentTime + s, u = a.createOscillator(), c = a.createGain();
    u.type = i, u.frequency.setValueAtTime(e, l), o !== void 0 && u.frequency.exponentialRampToValueAtTime(Math.max(1, o), l + n), c.gain.setValueAtTime(1e-4, l), c.gain.linearRampToValueAtTime(r, l + 6e-3), c.gain.exponentialRampToValueAtTime(1e-4, l + n), u.connect(c), c.connect(a.destination), u.start(l), u.stop(l + n + 0.02);
  }
  noise(e, n, i, r, s, o = 0) {
    const a = this.ctx;
    if (!a || this.muted || !this.noiseBuf) return;
    const l = a.currentTime + o, u = a.createBufferSource();
    u.buffer = this.noiseBuf;
    const c = a.createBiquadFilter();
    c.type = i, c.frequency.value = r, s && (c.Q.value = s);
    const d = a.createGain();
    d.gain.setValueAtTime(1e-4, l), d.gain.linearRampToValueAtTime(n, l + 3e-3), d.gain.exponentialRampToValueAtTime(1e-4, l + e), u.connect(c), c.connect(d), d.connect(a.destination), u.start(l), u.stop(l + e + 0.02);
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
const b3 = '.mg-root{--bg: #0f1613;--s1: #18211d;--s2: #202b26;--border: rgba(255, 255, 255, .09);--border-hi: rgba(227, 197, 111, .6);--ink: #edf1ec;--muted: #9fb0a5;--faint: #6f7f76;--gold: #e3c56f;--gold-soft: #f0e2b6;--gold-ink: #241b06;--felt-a: #1c7a4d;--felt-b: #0d4a2c;font-family:var(--theme-app-font, ui-sans-serif, system-ui, -apple-system, sans-serif);color:var(--ink);width:520px;max-width:92vw;margin:-1px;border-radius:inherit;background:var(--bg);padding:16px;user-select:none;-webkit-user-select:none}.mg-root *{box-sizing:border-box}.mg-loading{padding:96px 0;text-align:center;color:var(--muted);font-size:14px}.mg-launcher-head{text-align:center;padding:16px 0 24px}.mg-launcher-title{font-family:Georgia,Times New Roman,serif;font-size:30px;font-weight:800;letter-spacing:.3px;color:var(--gold-soft)}.mg-launcher-sub{margin-top:6px;color:var(--muted);font-size:13px}.mg-grid{display:grid;grid-template-columns:1fr 1fr;gap:16px}.mg-tile{display:flex;flex-direction:column;text-align:left;padding:0;border:1px solid var(--border);border-radius:14px;overflow:hidden;background:var(--s1);cursor:pointer;transition:transform .16s ease,border-color .16s ease,background .16s ease}.mg-tile:hover{transform:translateY(-3px);border-color:var(--border-hi);background:var(--s2)}.mg-tile-art{height:128px;display:flex;align-items:center;justify-content:center;position:relative;border-bottom:1px solid var(--border)}.mg-tile-art.bj{background:radial-gradient(100% 120% at 50% 12%,var(--felt-a),var(--felt-b))}.mg-tile-art.bj .mg-tile-card{position:absolute;width:64px;filter:drop-shadow(0 6px 12px rgba(0,0,0,.45))}.mg-tile-art.bj .c1{transform:rotate(-12deg) translate(-16px,4px)}.mg-tile-art.bj .c2{transform:rotate(10deg) translate(16px,-2px)}.mg-tile-art.snake{background:#0a0b12}.mg-tile-body{padding:12px 14px 14px;background:var(--s1)}.mg-tile:hover .mg-tile-body{background:var(--s2)}.mg-tile-name{font-weight:700;font-size:16px;color:var(--ink)}.mg-tile-desc{margin-top:3px;font-size:12.5px;color:var(--muted)}.mg-topbar{display:flex;align-items:center;gap:10px;margin-bottom:12px}.mg-icon-btn{height:30px;min-width:30px;padding:0 10px;display:inline-flex;align-items:center;justify-content:center;font-size:13px;color:var(--muted);background:var(--s1);border:1px solid var(--border);border-radius:9px;cursor:pointer;transition:color .14s,border-color .14s,background .14s}.mg-icon-btn:hover,.mg-icon-btn.on{color:var(--ink);border-color:var(--border-hi);background:var(--s2)}.mg-topbar-right{margin-left:auto;display:flex;align-items:center;gap:8px}.mg-bankroll{display:flex;align-items:center;gap:8px;font-weight:800;font-size:17px;font-variant-numeric:tabular-nums;color:var(--gold-soft)}.mg-bankroll-chip{width:15px;height:15px;border-radius:50%;background:radial-gradient(circle at 40% 35%,#f6d67a,#d4af5a);border:2px solid #b9922f}.mg-stat-sm{font-size:11px;color:var(--muted);font-variant-numeric:tabular-nums}.mg-stat-pill{font-size:12px;color:var(--muted)}.mg-stat-pill b{color:var(--ink);margin-left:4px;font-variant-numeric:tabular-nums}.mg-snake-stats{display:flex;gap:16px;margin-left:4px}.mg-seg{display:inline-flex;border:1px solid var(--border);border-radius:9px;overflow:hidden}.mg-seg-btn{width:30px;height:27px;border:none;border-left:1px solid var(--border);background:transparent;color:var(--muted);cursor:pointer;font-size:12px;font-variant-numeric:tabular-nums;transition:background .12s,color .12s}.mg-seg-btn:first-child{border-left:none}.mg-seg-btn:hover:not(:disabled){color:var(--ink)}.mg-seg-btn.active{background:var(--gold);color:var(--gold-ink);font-weight:700}.mg-seg-btn:disabled{opacity:.5;cursor:default}.mg-swatches{display:inline-flex;gap:7px}.mg-swatch{position:relative;width:28px;height:28px;border-radius:8px;cursor:pointer;padding:0;border:2px solid transparent;outline:1px solid var(--border);outline-offset:-1px;overflow:hidden;transition:transform .12s,border-color .12s}.mg-swatch:hover{transform:translateY(-1px)}.mg-swatch.active{border-color:var(--gold);outline-color:transparent}.mg-sw-snake{position:absolute;left:5px;top:6px;width:12px;height:5px;border-radius:3px}.mg-sw-food{position:absolute;right:5px;bottom:5px;width:7px;height:7px;border-radius:50%}.mg-toggle{width:40px;height:22px;border-radius:12px;border:1px solid var(--border);background:#ffffff14;position:relative;cursor:pointer;transition:background .15s}.mg-toggle.on{background:var(--gold)}.mg-toggle-dot{position:absolute;top:2px;left:2px;width:16px;height:16px;border-radius:50%;background:#fff;transition:transform .15s}.mg-toggle.on .mg-toggle-dot{transform:translate(18px)}.mg-control{display:flex;align-items:center;gap:10px}.mg-set-label{font-size:11px;letter-spacing:.04em;text-transform:uppercase;color:var(--muted)}.mg-settings{margin-bottom:12px;padding:12px 14px;border:1px solid var(--border);border-radius:12px;background:var(--s1);display:flex;flex-direction:column;gap:12px}.mg-set-row{display:flex;align-items:center;justify-content:space-between;gap:12px}.mg-set-hint{font-size:11px;color:var(--faint)}.mg-table{position:relative;width:100%;height:460px;border-radius:24px;overflow:hidden}.mg-felt{position:absolute;inset:0;width:100%;height:100%}.mg-dealer{position:absolute;top:22px;left:0;right:0;display:flex;flex-direction:column;align-items:center;gap:8px}.mg-players{position:absolute;bottom:18px;left:0;right:0;display:flex;justify-content:center;align-items:flex-start;gap:18px;flex-wrap:wrap}.mg-player-hand{display:flex;flex-direction:column;align-items:center;gap:6px;padding:6px;border-radius:12px;transition:box-shadow .2s,background .2s}.mg-player-hand.active{background:#e3c56f14;box-shadow:0 0 0 2px #e3c56f80,0 0 22px #e3c56f38}.mg-hand-foot{display:flex;align-items:center;gap:8px}.mg-hand-bet{font-size:11px;color:var(--gold-soft);font-variant-numeric:tabular-nums}.mg-betspot{color:var(--gold-soft);opacity:.85;font-size:13px;font-variant-numeric:tabular-nums;padding:22px 0}.mg-cards{display:flex;align-items:flex-start}.mg-card-wrap{animation:mg-deal-in .34s cubic-bezier(.2,.9,.3,1.3) both;animation-delay:calc(var(--i) * 40ms)}.mg-card-wrap:not(:first-child){margin-left:-34px}.mg-card{display:block;width:64px;height:auto;filter:drop-shadow(0 4px 7px rgba(0,0,0,.4))}@keyframes mg-deal-in{0%{opacity:0;transform:translate(34px,-46px) rotate(-12deg) scale(.9)}to{opacity:1;transform:none}}.mg-badge{min-width:30px;padding:2px 9px;border-radius:999px;background:#040806b8;border:1px solid rgba(255,255,255,.2);color:#fff;font-size:13px;font-weight:700;text-align:center;font-variant-numeric:tabular-nums}.mg-badge.sm{font-size:12px;padding:1px 8px}.mg-outcome{font-size:11px;font-weight:700;padding:2px 8px;border-radius:999px}.mg-outcome.good{background:#4cbd7638;color:#86e9ab}.mg-outcome.bad{background:#d63c4638;color:#ffa4aa}.mg-outcome.neutral{background:#ffffff1f;color:#dbe0dc}.mg-banner{position:absolute;top:47%;left:50%;transform:translate(-50%,-50%);padding:10px 26px;border-radius:14px;background:#040806cc;border:1px solid var(--border);animation:mg-pop .3s cubic-bezier(.2,.9,.3,1.4) both;z-index:3}.mg-banner-text{font-family:Georgia,serif;font-size:22px;font-weight:800}.mg-banner.good{border-color:var(--gold);box-shadow:0 0 30px #e3c56f52}.mg-banner.good .mg-banner-text{color:var(--gold-soft)}.mg-banner.bad{border-color:#d63c468c}.mg-banner.bad .mg-banner-text{color:#ffa4aa}@keyframes mg-pop{0%{opacity:0;transform:translate(-50%,-50%) scale(.7)}to{opacity:1;transform:translate(-50%,-50%) scale(1)}}.mg-actions{min-height:88px;padding-top:14px;display:flex;align-items:center;justify-content:center}.mg-row{display:flex;gap:10px;justify-content:center;align-items:center;flex-wrap:wrap}.mg-row.muted{color:var(--muted);font-size:14px}.mg-btn{padding:10px 20px;border-radius:11px;font-weight:650;font-size:14px;border:1px solid var(--border);background:var(--s1);color:var(--ink);cursor:pointer;transition:transform .12s,background .14s,filter .14s}.mg-btn:hover:not(:disabled){background:var(--s2);transform:translateY(-1px)}.mg-btn.ghost{background:transparent}.mg-btn.primary{background:var(--gold);color:var(--gold-ink);border-color:var(--gold)}.mg-btn.primary:hover:not(:disabled){filter:brightness(1.07)}.mg-btn:disabled{opacity:.4;cursor:default}.mg-bet{display:flex;align-items:center;justify-content:space-between;width:100%;gap:14px}.mg-chiprack{display:flex;gap:8px;align-items:center}.mg-chip-btn{padding:0;border:none;background:none;cursor:pointer;line-height:0;filter:drop-shadow(0 3px 5px rgba(0,0,0,.45));transition:transform .12s}.mg-chip-btn:hover:not(:disabled){transform:translateY(-6px)}.mg-chip-btn:disabled{opacity:.35;cursor:default}.mg-bet-right{display:flex;gap:8px;align-items:center}.mg-broke{display:flex;align-items:center;gap:14px;color:var(--muted);font-size:14px}.mg-snake{display:flex;flex-direction:column;align-items:center}.mg-snake .mg-topbar{width:100%}.mg-snake-board{position:relative;border-radius:14px;overflow:hidden;box-shadow:0 10px 34px #00000073}.mg-snake-canvas{display:block;border-radius:14px}.mg-snake-overlay{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px;text-align:center;background:#04060899;backdrop-filter:blur(2px);-webkit-backdrop-filter:blur(2px)}.mg-ov-title{font-size:22px;font-weight:700}.mg-ov-big{font-size:46px;font-weight:800;line-height:1;color:var(--gold-soft);font-variant-numeric:tabular-nums}.mg-ov-sub{font-size:12px;color:var(--muted)}.mg-ov-sub kbd,.mg-snake-hint kbd{font-family:var(--theme-font-code, ui-monospace, monospace);font-size:11px;padding:1px 5px;border:1px solid var(--border);border-radius:4px;color:var(--ink)}.mg-snake-settings{display:flex;align-items:center;gap:24px;margin-top:14px}.mg-snake-hint{margin-top:10px;font-size:11px;color:var(--faint)}.mg-root{width:fit-content}.mg-launcher,.mg-snake{width:480px}.mg-bj{width:860px}.mg-card{width:84px}.mg-card-wrap:not(:first-child){margin-left:-46px}.mg-table-3d{perspective:1700px}.mg-table{height:560px;background:#0b3a23}.mg-felt{transform:rotateX(9deg) scale(1.09);transform-origin:center 46%}.mg-dealer{top:30px}.mg-players{bottom:26px}.mg-banner-text{font-size:27px}.mg-banner.good{overflow:hidden}.mg-banner.good:after{content:"";position:absolute;inset:0;background:linear-gradient(115deg,transparent 35%,rgba(255,245,210,.35) 50%,transparent 65%);transform:translate(-120%);animation:mg-shine 1.4s ease-out .15s}@keyframes mg-shine{to{transform:translate(120%)}}.mg-flip{position:relative;width:84px;height:118px;transform-style:preserve-3d;transition:transform .6s cubic-bezier(.3,.85,.25,1.05)}.mg-flip.revealed{transform:rotateY(180deg)}.mg-flip-face{position:absolute;inset:0;backface-visibility:hidden;-webkit-backface-visibility:hidden}.mg-flip-face .mg-card{filter:drop-shadow(0 4px 7px rgba(0,0,0,.4))}.mg-flip-front{transform:rotateY(180deg)}.mg-betstack{position:relative;width:56px;height:66px;margin:8px auto 22px}.mg-betchip{position:absolute;left:4px;bottom:calc(var(--n) * 6px);filter:drop-shadow(0 2px 3px rgba(0,0,0,.5));animation:mg-toss .32s cubic-bezier(.2,.9,.3,1.35) both;animation-delay:calc(var(--n) * 45ms)}.mg-betstack-amt{position:absolute;left:-12px;right:-12px;bottom:-20px;text-align:center;font-size:12px;font-weight:700;color:var(--gold-soft);font-variant-numeric:tabular-nums}@keyframes mg-toss{0%{transform:translateY(-42px) rotate(-22deg);opacity:0}to{transform:none;opacity:1}}.mg-celebrate{position:absolute;inset:0;overflow:hidden;pointer-events:none;z-index:4}.mg-coin{position:absolute;top:-24px;width:13px;height:13px;border-radius:50%;background:linear-gradient(135deg,#ffe9a8,#d6a437);box-shadow:0 0 6px #e6be5a8c;animation:mg-fall 1.5s cubic-bezier(.35,.1,.7,1) forwards;animation-delay:calc(var(--i) * 42ms)}.mg-coin.bj{width:16px;height:16px}@keyframes mg-fall{0%{transform:translateY(0) rotate(0);opacity:1}to{transform:translateY(600px) rotate(560deg);opacity:0}}.mg-player-hand.active{animation:mg-breathe 1.7s ease-in-out infinite}@keyframes mg-breathe{0%,to{box-shadow:0 0 0 2px #e3c56f73,0 0 18px #e3c56f2e}50%{box-shadow:0 0 0 2px #e3c56fb3,0 0 30px #e3c56f57}}.mg-bj .mg-btn{padding:11px 24px;font-size:15px}.mg-bj .mg-btn:active:not(:disabled){transform:translateY(1px)}.mg-chip-btn:active:not(:disabled){transform:translateY(-2px) scale(.96)}.mg-bj{width:860px;height:620px;position:relative;overflow:hidden;border-radius:16px;background:radial-gradient(120% 100% at 50% 28%,#0c1a14,#060f0b)}.mg-scene{position:absolute;inset:0}.mg-scene canvas{display:block}.mg-hud-top{position:absolute;top:0;left:0;right:0;z-index:5;display:flex;align-items:center;gap:10px;padding:12px 14px;background:linear-gradient(to bottom,rgba(0,0,0,.55),transparent)}.mg-hud-settings{position:absolute;top:56px;right:14px;z-index:6;width:262px;margin:0}.mg-readout{position:absolute;left:0;right:0;bottom:84px;z-index:4;display:flex;justify-content:center;gap:30px;font-size:13px;font-weight:600;color:var(--gold-soft);pointer-events:none;text-shadow:0 1px 3px rgba(0,0,0,.7);font-variant-numeric:tabular-nums}.mg-readout-you{color:#eaf3ec}.mg-hud-bottom{position:absolute;bottom:0;left:0;right:0;z-index:5;padding:14px 16px 16px;display:flex;justify-content:center;background:linear-gradient(to top,rgba(0,0,0,.74),transparent)}.mg-hud-bottom .mg-bet{max-width:820px}.mg-banner{z-index:6}', F0 = "agent-code-mini-games-styles";
function P3() {
  if (document.getElementById(F0)) return;
  const t = document.createElement("style");
  t.id = F0, t.textContent = b3, document.head.append(t);
}
function L3(t) {
  return (e) => {
    P3();
    const n = new R3(), i = () => n.unlock();
    window.addEventListener("keydown", i), window.addEventListener("pointerdown", i);
    const r = Kx(e);
    return r.render(/* @__PURE__ */ U.jsx(A3, { api: t, audio: n })), () => {
      window.removeEventListener("keydown", i), window.removeEventListener("pointerdown", i), n.dispose(), queueMicrotask(() => r.unmount());
    };
  };
}
const { activate: D3, deactivate: I3 } = {
  async activate(t) {
    t.subscriptions.push(
      t.registerView("mini-games.main", L3(t.api)),
      t.registerCommand("mini-games.blackjack", () => gr.show("blackjack")),
      t.registerCommand("mini-games.snake", () => gr.show("snake"))
    );
  },
  deactivate() {
    gr.show("launcher");
  }
};
export {
  D3 as activate,
  I3 as deactivate
};
