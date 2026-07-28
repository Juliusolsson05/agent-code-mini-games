let Al = "launcher";
const $l = /* @__PURE__ */ new Set(), at = {
  get() {
    return Al;
  },
  show(e) {
    if (e !== Al) {
      Al = e;
      for (const t of $l) t();
    }
  },
  subscribe(e) {
    return $l.add(e), () => $l.delete(e);
  }
};
var wu = { exports: {} }, xl = {}, Su = { exports: {} }, T = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var fr = Symbol.for("react.element"), $c = Symbol.for("react.portal"), Bc = Symbol.for("react.fragment"), Uc = Symbol.for("react.strict_mode"), Hc = Symbol.for("react.profiler"), Vc = Symbol.for("react.provider"), Wc = Symbol.for("react.context"), Qc = Symbol.for("react.forward_ref"), Kc = Symbol.for("react.suspense"), Yc = Symbol.for("react.memo"), Gc = Symbol.for("react.lazy"), lo = Symbol.iterator;
function Xc(e) {
  return e === null || typeof e != "object" ? null : (e = lo && e[lo] || e["@@iterator"], typeof e == "function" ? e : null);
}
var Cu = { isMounted: function() {
  return !1;
}, enqueueForceUpdate: function() {
}, enqueueReplaceState: function() {
}, enqueueSetState: function() {
} }, Eu = Object.assign, Nu = {};
function xn(e, t, n) {
  this.props = e, this.context = t, this.refs = Nu, this.updater = n || Cu;
}
xn.prototype.isReactComponent = {};
xn.prototype.setState = function(e, t) {
  if (typeof e != "object" && typeof e != "function" && e != null) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
  this.updater.enqueueSetState(this, e, t, "setState");
};
xn.prototype.forceUpdate = function(e) {
  this.updater.enqueueForceUpdate(this, e, "forceUpdate");
};
function ju() {
}
ju.prototype = xn.prototype;
function as(e, t, n) {
  this.props = e, this.context = t, this.refs = Nu, this.updater = n || Cu;
}
var cs = as.prototype = new ju();
cs.constructor = as;
Eu(cs, xn.prototype);
cs.isPureReactComponent = !0;
var io = Array.isArray, _u = Object.prototype.hasOwnProperty, fs = { current: null }, Pu = { key: !0, ref: !0, __self: !0, __source: !0 };
function zu(e, t, n) {
  var r, l = {}, i = null, s = null;
  if (t != null) for (r in t.ref !== void 0 && (s = t.ref), t.key !== void 0 && (i = "" + t.key), t) _u.call(t, r) && !Pu.hasOwnProperty(r) && (l[r] = t[r]);
  var o = arguments.length - 2;
  if (o === 1) l.children = n;
  else if (1 < o) {
    for (var u = Array(o), a = 0; a < o; a++) u[a] = arguments[a + 2];
    l.children = u;
  }
  if (e && e.defaultProps) for (r in o = e.defaultProps, o) l[r] === void 0 && (l[r] = o[r]);
  return { $$typeof: fr, type: e, key: i, ref: s, props: l, _owner: fs.current };
}
function bc(e, t) {
  return { $$typeof: fr, type: e.type, key: t, ref: e.ref, props: e.props, _owner: e._owner };
}
function ds(e) {
  return typeof e == "object" && e !== null && e.$$typeof === fr;
}
function Zc(e) {
  var t = { "=": "=0", ":": "=2" };
  return "$" + e.replace(/[=:]/g, function(n) {
    return t[n];
  });
}
var so = /\/+/g;
function Bl(e, t) {
  return typeof e == "object" && e !== null && e.key != null ? Zc("" + e.key) : t.toString(36);
}
function Or(e, t, n, r, l) {
  var i = typeof e;
  (i === "undefined" || i === "boolean") && (e = null);
  var s = !1;
  if (e === null) s = !0;
  else switch (i) {
    case "string":
    case "number":
      s = !0;
      break;
    case "object":
      switch (e.$$typeof) {
        case fr:
        case $c:
          s = !0;
      }
  }
  if (s) return s = e, l = l(s), e = r === "" ? "." + Bl(s, 0) : r, io(l) ? (n = "", e != null && (n = e.replace(so, "$&/") + "/"), Or(l, t, n, "", function(a) {
    return a;
  })) : l != null && (ds(l) && (l = bc(l, n + (!l.key || s && s.key === l.key ? "" : ("" + l.key).replace(so, "$&/") + "/") + e)), t.push(l)), 1;
  if (s = 0, r = r === "" ? "." : r + ":", io(e)) for (var o = 0; o < e.length; o++) {
    i = e[o];
    var u = r + Bl(i, o);
    s += Or(i, t, n, u, l);
  }
  else if (u = Xc(e), typeof u == "function") for (e = u.call(e), o = 0; !(i = e.next()).done; ) i = i.value, u = r + Bl(i, o++), s += Or(i, t, n, u, l);
  else if (i === "object") throw t = String(e), Error("Objects are not valid as a React child (found: " + (t === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : t) + "). If you meant to render a collection of children, use an array instead.");
  return s;
}
function yr(e, t, n) {
  if (e == null) return e;
  var r = [], l = 0;
  return Or(e, r, "", "", function(i) {
    return t.call(n, i, l++);
  }), r;
}
function Jc(e) {
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
var de = { current: null }, Ir = { transition: null }, qc = { ReactCurrentDispatcher: de, ReactCurrentBatchConfig: Ir, ReactCurrentOwner: fs };
function Tu() {
  throw Error("act(...) is not supported in production builds of React.");
}
T.Children = { map: yr, forEach: function(e, t, n) {
  yr(e, function() {
    t.apply(this, arguments);
  }, n);
}, count: function(e) {
  var t = 0;
  return yr(e, function() {
    t++;
  }), t;
}, toArray: function(e) {
  return yr(e, function(t) {
    return t;
  }) || [];
}, only: function(e) {
  if (!ds(e)) throw Error("React.Children.only expected to receive a single React element child.");
  return e;
} };
T.Component = xn;
T.Fragment = Bc;
T.Profiler = Hc;
T.PureComponent = as;
T.StrictMode = Uc;
T.Suspense = Kc;
T.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = qc;
T.act = Tu;
T.cloneElement = function(e, t, n) {
  if (e == null) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + e + ".");
  var r = Eu({}, e.props), l = e.key, i = e.ref, s = e._owner;
  if (t != null) {
    if (t.ref !== void 0 && (i = t.ref, s = fs.current), t.key !== void 0 && (l = "" + t.key), e.type && e.type.defaultProps) var o = e.type.defaultProps;
    for (u in t) _u.call(t, u) && !Pu.hasOwnProperty(u) && (r[u] = t[u] === void 0 && o !== void 0 ? o[u] : t[u]);
  }
  var u = arguments.length - 2;
  if (u === 1) r.children = n;
  else if (1 < u) {
    o = Array(u);
    for (var a = 0; a < u; a++) o[a] = arguments[a + 2];
    r.children = o;
  }
  return { $$typeof: fr, type: e.type, key: l, ref: i, props: r, _owner: s };
};
T.createContext = function(e) {
  return e = { $$typeof: Wc, _currentValue: e, _currentValue2: e, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null }, e.Provider = { $$typeof: Vc, _context: e }, e.Consumer = e;
};
T.createElement = zu;
T.createFactory = function(e) {
  var t = zu.bind(null, e);
  return t.type = e, t;
};
T.createRef = function() {
  return { current: null };
};
T.forwardRef = function(e) {
  return { $$typeof: Qc, render: e };
};
T.isValidElement = ds;
T.lazy = function(e) {
  return { $$typeof: Gc, _payload: { _status: -1, _result: e }, _init: Jc };
};
T.memo = function(e, t) {
  return { $$typeof: Yc, type: e, compare: t === void 0 ? null : t };
};
T.startTransition = function(e) {
  var t = Ir.transition;
  Ir.transition = {};
  try {
    e();
  } finally {
    Ir.transition = t;
  }
};
T.unstable_act = Tu;
T.useCallback = function(e, t) {
  return de.current.useCallback(e, t);
};
T.useContext = function(e) {
  return de.current.useContext(e);
};
T.useDebugValue = function() {
};
T.useDeferredValue = function(e) {
  return de.current.useDeferredValue(e);
};
T.useEffect = function(e, t) {
  return de.current.useEffect(e, t);
};
T.useId = function() {
  return de.current.useId();
};
T.useImperativeHandle = function(e, t, n) {
  return de.current.useImperativeHandle(e, t, n);
};
T.useInsertionEffect = function(e, t) {
  return de.current.useInsertionEffect(e, t);
};
T.useLayoutEffect = function(e, t) {
  return de.current.useLayoutEffect(e, t);
};
T.useMemo = function(e, t) {
  return de.current.useMemo(e, t);
};
T.useReducer = function(e, t, n) {
  return de.current.useReducer(e, t, n);
};
T.useRef = function(e) {
  return de.current.useRef(e);
};
T.useState = function(e) {
  return de.current.useState(e);
};
T.useSyncExternalStore = function(e, t, n) {
  return de.current.useSyncExternalStore(e, t, n);
};
T.useTransition = function() {
  return de.current.useTransition();
};
T.version = "18.3.1";
Su.exports = T;
var ke = Su.exports;
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ef = ke, tf = Symbol.for("react.element"), nf = Symbol.for("react.fragment"), rf = Object.prototype.hasOwnProperty, lf = ef.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, sf = { key: !0, ref: !0, __self: !0, __source: !0 };
function Lu(e, t, n) {
  var r, l = {}, i = null, s = null;
  n !== void 0 && (i = "" + n), t.key !== void 0 && (i = "" + t.key), t.ref !== void 0 && (s = t.ref);
  for (r in t) rf.call(t, r) && !sf.hasOwnProperty(r) && (l[r] = t[r]);
  if (e && e.defaultProps) for (r in t = e.defaultProps, t) l[r] === void 0 && (l[r] = t[r]);
  return { $$typeof: tf, type: e, key: i, ref: s, props: l, _owner: lf.current };
}
xl.Fragment = nf;
xl.jsx = Lu;
xl.jsxs = Lu;
wu.exports = xl;
var c = wu.exports, Mu = { exports: {} }, Ee = {}, Ru = { exports: {} }, Du = {};
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
  function t(E, P) {
    var z = E.length;
    E.push(P);
    e: for (; 0 < z; ) {
      var W = z - 1 >>> 1, J = E[W];
      if (0 < l(J, P)) E[W] = P, E[z] = J, z = W;
      else break e;
    }
  }
  function n(E) {
    return E.length === 0 ? null : E[0];
  }
  function r(E) {
    if (E.length === 0) return null;
    var P = E[0], z = E.pop();
    if (z !== P) {
      E[0] = z;
      e: for (var W = 0, J = E.length, gr = J >>> 1; W < gr; ) {
        var _t = 2 * (W + 1) - 1, Fl = E[_t], Pt = _t + 1, vr = E[Pt];
        if (0 > l(Fl, z)) Pt < J && 0 > l(vr, Fl) ? (E[W] = vr, E[Pt] = z, W = Pt) : (E[W] = Fl, E[_t] = z, W = _t);
        else if (Pt < J && 0 > l(vr, z)) E[W] = vr, E[Pt] = z, W = Pt;
        else break e;
      }
    }
    return P;
  }
  function l(E, P) {
    var z = E.sortIndex - P.sortIndex;
    return z !== 0 ? z : E.id - P.id;
  }
  if (typeof performance == "object" && typeof performance.now == "function") {
    var i = performance;
    e.unstable_now = function() {
      return i.now();
    };
  } else {
    var s = Date, o = s.now();
    e.unstable_now = function() {
      return s.now() - o;
    };
  }
  var u = [], a = [], h = 1, m = null, g = 3, k = !1, w = !1, x = !1, R = typeof setTimeout == "function" ? setTimeout : null, d = typeof clearTimeout == "function" ? clearTimeout : null, f = typeof setImmediate < "u" ? setImmediate : null;
  typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
  function p(E) {
    for (var P = n(a); P !== null; ) {
      if (P.callback === null) r(a);
      else if (P.startTime <= E) r(a), P.sortIndex = P.expirationTime, t(u, P);
      else break;
      P = n(a);
    }
  }
  function v(E) {
    if (x = !1, p(E), !w) if (n(u) !== null) w = !0, Ol(C);
    else {
      var P = n(a);
      P !== null && Il(v, P.startTime - E);
    }
  }
  function C(E, P) {
    w = !1, x && (x = !1, d(_), _ = -1), k = !0;
    var z = g;
    try {
      for (p(P), m = n(u); m !== null && (!(m.expirationTime > P) || E && !De()); ) {
        var W = m.callback;
        if (typeof W == "function") {
          m.callback = null, g = m.priorityLevel;
          var J = W(m.expirationTime <= P);
          P = e.unstable_now(), typeof J == "function" ? m.callback = J : m === n(u) && r(u), p(P);
        } else r(u);
        m = n(u);
      }
      if (m !== null) var gr = !0;
      else {
        var _t = n(a);
        _t !== null && Il(v, _t.startTime - P), gr = !1;
      }
      return gr;
    } finally {
      m = null, g = z, k = !1;
    }
  }
  var N = !1, j = null, _ = -1, V = 5, L = -1;
  function De() {
    return !(e.unstable_now() - L < V);
  }
  function Sn() {
    if (j !== null) {
      var E = e.unstable_now();
      L = E;
      var P = !0;
      try {
        P = j(!0, E);
      } finally {
        P ? Cn() : (N = !1, j = null);
      }
    } else N = !1;
  }
  var Cn;
  if (typeof f == "function") Cn = function() {
    f(Sn);
  };
  else if (typeof MessageChannel < "u") {
    var ro = new MessageChannel(), Ac = ro.port2;
    ro.port1.onmessage = Sn, Cn = function() {
      Ac.postMessage(null);
    };
  } else Cn = function() {
    R(Sn, 0);
  };
  function Ol(E) {
    j = E, N || (N = !0, Cn());
  }
  function Il(E, P) {
    _ = R(function() {
      E(e.unstable_now());
    }, P);
  }
  e.unstable_IdlePriority = 5, e.unstable_ImmediatePriority = 1, e.unstable_LowPriority = 4, e.unstable_NormalPriority = 3, e.unstable_Profiling = null, e.unstable_UserBlockingPriority = 2, e.unstable_cancelCallback = function(E) {
    E.callback = null;
  }, e.unstable_continueExecution = function() {
    w || k || (w = !0, Ol(C));
  }, e.unstable_forceFrameRate = function(E) {
    0 > E || 125 < E ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : V = 0 < E ? Math.floor(1e3 / E) : 5;
  }, e.unstable_getCurrentPriorityLevel = function() {
    return g;
  }, e.unstable_getFirstCallbackNode = function() {
    return n(u);
  }, e.unstable_next = function(E) {
    switch (g) {
      case 1:
      case 2:
      case 3:
        var P = 3;
        break;
      default:
        P = g;
    }
    var z = g;
    g = P;
    try {
      return E();
    } finally {
      g = z;
    }
  }, e.unstable_pauseExecution = function() {
  }, e.unstable_requestPaint = function() {
  }, e.unstable_runWithPriority = function(E, P) {
    switch (E) {
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
        break;
      default:
        E = 3;
    }
    var z = g;
    g = E;
    try {
      return P();
    } finally {
      g = z;
    }
  }, e.unstable_scheduleCallback = function(E, P, z) {
    var W = e.unstable_now();
    switch (typeof z == "object" && z !== null ? (z = z.delay, z = typeof z == "number" && 0 < z ? W + z : W) : z = W, E) {
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
    return J = z + J, E = { id: h++, callback: P, priorityLevel: E, startTime: z, expirationTime: J, sortIndex: -1 }, z > W ? (E.sortIndex = z, t(a, E), n(u) === null && E === n(a) && (x ? (d(_), _ = -1) : x = !0, Il(v, z - W))) : (E.sortIndex = J, t(u, E), w || k || (w = !0, Ol(C))), E;
  }, e.unstable_shouldYield = De, e.unstable_wrapCallback = function(E) {
    var P = g;
    return function() {
      var z = g;
      g = P;
      try {
        return E.apply(this, arguments);
      } finally {
        g = z;
      }
    };
  };
})(Du);
Ru.exports = Du;
var of = Ru.exports;
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var uf = ke, Ce = of;
function y(e) {
  for (var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e, n = 1; n < arguments.length; n++) t += "&args[]=" + encodeURIComponent(arguments[n]);
  return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
}
var Ou = /* @__PURE__ */ new Set(), Gn = {};
function Ut(e, t) {
  fn(e, t), fn(e + "Capture", t);
}
function fn(e, t) {
  for (Gn[e] = t, e = 0; e < t.length; e++) Ou.add(t[e]);
}
var tt = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), gi = Object.prototype.hasOwnProperty, af = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, oo = {}, uo = {};
function cf(e) {
  return gi.call(uo, e) ? !0 : gi.call(oo, e) ? !1 : af.test(e) ? uo[e] = !0 : (oo[e] = !0, !1);
}
function ff(e, t, n, r) {
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
function df(e, t, n, r) {
  if (t === null || typeof t > "u" || ff(e, t, n, r)) return !0;
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
function pe(e, t, n, r, l, i, s) {
  this.acceptsBooleans = t === 2 || t === 3 || t === 4, this.attributeName = r, this.attributeNamespace = l, this.mustUseProperty = n, this.propertyName = e, this.type = t, this.sanitizeURL = i, this.removeEmptyString = s;
}
var ie = {};
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e) {
  ie[e] = new pe(e, 0, !1, e, null, !1, !1);
});
[["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(e) {
  var t = e[0];
  ie[t] = new pe(t, 1, !1, e[1], null, !1, !1);
});
["contentEditable", "draggable", "spellCheck", "value"].forEach(function(e) {
  ie[e] = new pe(e, 2, !1, e.toLowerCase(), null, !1, !1);
});
["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(e) {
  ie[e] = new pe(e, 2, !1, e, null, !1, !1);
});
"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e) {
  ie[e] = new pe(e, 3, !1, e.toLowerCase(), null, !1, !1);
});
["checked", "multiple", "muted", "selected"].forEach(function(e) {
  ie[e] = new pe(e, 3, !0, e, null, !1, !1);
});
["capture", "download"].forEach(function(e) {
  ie[e] = new pe(e, 4, !1, e, null, !1, !1);
});
["cols", "rows", "size", "span"].forEach(function(e) {
  ie[e] = new pe(e, 6, !1, e, null, !1, !1);
});
["rowSpan", "start"].forEach(function(e) {
  ie[e] = new pe(e, 5, !1, e.toLowerCase(), null, !1, !1);
});
var ps = /[\-:]([a-z])/g;
function hs(e) {
  return e[1].toUpperCase();
}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e) {
  var t = e.replace(
    ps,
    hs
  );
  ie[t] = new pe(t, 1, !1, e, null, !1, !1);
});
"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e) {
  var t = e.replace(ps, hs);
  ie[t] = new pe(t, 1, !1, e, "http://www.w3.org/1999/xlink", !1, !1);
});
["xml:base", "xml:lang", "xml:space"].forEach(function(e) {
  var t = e.replace(ps, hs);
  ie[t] = new pe(t, 1, !1, e, "http://www.w3.org/XML/1998/namespace", !1, !1);
});
["tabIndex", "crossOrigin"].forEach(function(e) {
  ie[e] = new pe(e, 1, !1, e.toLowerCase(), null, !1, !1);
});
ie.xlinkHref = new pe("xlinkHref", 1, !1, "xlink:href", "http://www.w3.org/1999/xlink", !0, !1);
["src", "href", "action", "formAction"].forEach(function(e) {
  ie[e] = new pe(e, 1, !1, e.toLowerCase(), null, !0, !0);
});
function ms(e, t, n, r) {
  var l = ie.hasOwnProperty(t) ? ie[t] : null;
  (l !== null ? l.type !== 0 : r || !(2 < t.length) || t[0] !== "o" && t[0] !== "O" || t[1] !== "n" && t[1] !== "N") && (df(t, n, l, r) && (n = null), r || l === null ? cf(t) && (n === null ? e.removeAttribute(t) : e.setAttribute(t, "" + n)) : l.mustUseProperty ? e[l.propertyName] = n === null ? l.type === 3 ? !1 : "" : n : (t = l.attributeName, r = l.attributeNamespace, n === null ? e.removeAttribute(t) : (l = l.type, n = l === 3 || l === 4 && n === !0 ? "" : "" + n, r ? e.setAttributeNS(r, t, n) : e.setAttribute(t, n))));
}
var it = uf.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, xr = Symbol.for("react.element"), Kt = Symbol.for("react.portal"), Yt = Symbol.for("react.fragment"), gs = Symbol.for("react.strict_mode"), vi = Symbol.for("react.profiler"), Iu = Symbol.for("react.provider"), Fu = Symbol.for("react.context"), vs = Symbol.for("react.forward_ref"), yi = Symbol.for("react.suspense"), xi = Symbol.for("react.suspense_list"), ys = Symbol.for("react.memo"), ot = Symbol.for("react.lazy"), Au = Symbol.for("react.offscreen"), ao = Symbol.iterator;
function En(e) {
  return e === null || typeof e != "object" ? null : (e = ao && e[ao] || e["@@iterator"], typeof e == "function" ? e : null);
}
var U = Object.assign, Ul;
function Rn(e) {
  if (Ul === void 0) try {
    throw Error();
  } catch (n) {
    var t = n.stack.trim().match(/\n( *(at )?)/);
    Ul = t && t[1] || "";
  }
  return `
` + Ul + e;
}
var Hl = !1;
function Vl(e, t) {
  if (!e || Hl) return "";
  Hl = !0;
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
      } catch (a) {
        var r = a;
      }
      Reflect.construct(e, [], t);
    } else {
      try {
        t.call();
      } catch (a) {
        r = a;
      }
      e.call(t.prototype);
    }
    else {
      try {
        throw Error();
      } catch (a) {
        r = a;
      }
      e();
    }
  } catch (a) {
    if (a && r && typeof a.stack == "string") {
      for (var l = a.stack.split(`
`), i = r.stack.split(`
`), s = l.length - 1, o = i.length - 1; 1 <= s && 0 <= o && l[s] !== i[o]; ) o--;
      for (; 1 <= s && 0 <= o; s--, o--) if (l[s] !== i[o]) {
        if (s !== 1 || o !== 1)
          do
            if (s--, o--, 0 > o || l[s] !== i[o]) {
              var u = `
` + l[s].replace(" at new ", " at ");
              return e.displayName && u.includes("<anonymous>") && (u = u.replace("<anonymous>", e.displayName)), u;
            }
          while (1 <= s && 0 <= o);
        break;
      }
    }
  } finally {
    Hl = !1, Error.prepareStackTrace = n;
  }
  return (e = e ? e.displayName || e.name : "") ? Rn(e) : "";
}
function pf(e) {
  switch (e.tag) {
    case 5:
      return Rn(e.type);
    case 16:
      return Rn("Lazy");
    case 13:
      return Rn("Suspense");
    case 19:
      return Rn("SuspenseList");
    case 0:
    case 2:
    case 15:
      return e = Vl(e.type, !1), e;
    case 11:
      return e = Vl(e.type.render, !1), e;
    case 1:
      return e = Vl(e.type, !0), e;
    default:
      return "";
  }
}
function ki(e) {
  if (e == null) return null;
  if (typeof e == "function") return e.displayName || e.name || null;
  if (typeof e == "string") return e;
  switch (e) {
    case Yt:
      return "Fragment";
    case Kt:
      return "Portal";
    case vi:
      return "Profiler";
    case gs:
      return "StrictMode";
    case yi:
      return "Suspense";
    case xi:
      return "SuspenseList";
  }
  if (typeof e == "object") switch (e.$$typeof) {
    case Fu:
      return (e.displayName || "Context") + ".Consumer";
    case Iu:
      return (e._context.displayName || "Context") + ".Provider";
    case vs:
      var t = e.render;
      return e = e.displayName, e || (e = t.displayName || t.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
    case ys:
      return t = e.displayName || null, t !== null ? t : ki(e.type) || "Memo";
    case ot:
      t = e._payload, e = e._init;
      try {
        return ki(e(t));
      } catch {
      }
  }
  return null;
}
function hf(e) {
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
      return ki(t);
    case 8:
      return t === gs ? "StrictMode" : "Mode";
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
function St(e) {
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
function $u(e) {
  var t = e.type;
  return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
}
function mf(e) {
  var t = $u(e) ? "checked" : "value", n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t), r = "" + e[t];
  if (!e.hasOwnProperty(t) && typeof n < "u" && typeof n.get == "function" && typeof n.set == "function") {
    var l = n.get, i = n.set;
    return Object.defineProperty(e, t, { configurable: !0, get: function() {
      return l.call(this);
    }, set: function(s) {
      r = "" + s, i.call(this, s);
    } }), Object.defineProperty(e, t, { enumerable: n.enumerable }), { getValue: function() {
      return r;
    }, setValue: function(s) {
      r = "" + s;
    }, stopTracking: function() {
      e._valueTracker = null, delete e[t];
    } };
  }
}
function kr(e) {
  e._valueTracker || (e._valueTracker = mf(e));
}
function Bu(e) {
  if (!e) return !1;
  var t = e._valueTracker;
  if (!t) return !0;
  var n = t.getValue(), r = "";
  return e && (r = $u(e) ? e.checked ? "true" : "false" : e.value), e = r, e !== n ? (t.setValue(e), !0) : !1;
}
function Yr(e) {
  if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u") return null;
  try {
    return e.activeElement || e.body;
  } catch {
    return e.body;
  }
}
function wi(e, t) {
  var n = t.checked;
  return U({}, t, { defaultChecked: void 0, defaultValue: void 0, value: void 0, checked: n ?? e._wrapperState.initialChecked });
}
function co(e, t) {
  var n = t.defaultValue == null ? "" : t.defaultValue, r = t.checked != null ? t.checked : t.defaultChecked;
  n = St(t.value != null ? t.value : n), e._wrapperState = { initialChecked: r, initialValue: n, controlled: t.type === "checkbox" || t.type === "radio" ? t.checked != null : t.value != null };
}
function Uu(e, t) {
  t = t.checked, t != null && ms(e, "checked", t, !1);
}
function Si(e, t) {
  Uu(e, t);
  var n = St(t.value), r = t.type;
  if (n != null) r === "number" ? (n === 0 && e.value === "" || e.value != n) && (e.value = "" + n) : e.value !== "" + n && (e.value = "" + n);
  else if (r === "submit" || r === "reset") {
    e.removeAttribute("value");
    return;
  }
  t.hasOwnProperty("value") ? Ci(e, t.type, n) : t.hasOwnProperty("defaultValue") && Ci(e, t.type, St(t.defaultValue)), t.checked == null && t.defaultChecked != null && (e.defaultChecked = !!t.defaultChecked);
}
function fo(e, t, n) {
  if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
    var r = t.type;
    if (!(r !== "submit" && r !== "reset" || t.value !== void 0 && t.value !== null)) return;
    t = "" + e._wrapperState.initialValue, n || t === e.value || (e.value = t), e.defaultValue = t;
  }
  n = e.name, n !== "" && (e.name = ""), e.defaultChecked = !!e._wrapperState.initialChecked, n !== "" && (e.name = n);
}
function Ci(e, t, n) {
  (t !== "number" || Yr(e.ownerDocument) !== e) && (n == null ? e.defaultValue = "" + e._wrapperState.initialValue : e.defaultValue !== "" + n && (e.defaultValue = "" + n));
}
var Dn = Array.isArray;
function ln(e, t, n, r) {
  if (e = e.options, t) {
    t = {};
    for (var l = 0; l < n.length; l++) t["$" + n[l]] = !0;
    for (n = 0; n < e.length; n++) l = t.hasOwnProperty("$" + e[n].value), e[n].selected !== l && (e[n].selected = l), l && r && (e[n].defaultSelected = !0);
  } else {
    for (n = "" + St(n), t = null, l = 0; l < e.length; l++) {
      if (e[l].value === n) {
        e[l].selected = !0, r && (e[l].defaultSelected = !0);
        return;
      }
      t !== null || e[l].disabled || (t = e[l]);
    }
    t !== null && (t.selected = !0);
  }
}
function Ei(e, t) {
  if (t.dangerouslySetInnerHTML != null) throw Error(y(91));
  return U({}, t, { value: void 0, defaultValue: void 0, children: "" + e._wrapperState.initialValue });
}
function po(e, t) {
  var n = t.value;
  if (n == null) {
    if (n = t.children, t = t.defaultValue, n != null) {
      if (t != null) throw Error(y(92));
      if (Dn(n)) {
        if (1 < n.length) throw Error(y(93));
        n = n[0];
      }
      t = n;
    }
    t == null && (t = ""), n = t;
  }
  e._wrapperState = { initialValue: St(n) };
}
function Hu(e, t) {
  var n = St(t.value), r = St(t.defaultValue);
  n != null && (n = "" + n, n !== e.value && (e.value = n), t.defaultValue == null && e.defaultValue !== n && (e.defaultValue = n)), r != null && (e.defaultValue = "" + r);
}
function ho(e) {
  var t = e.textContent;
  t === e._wrapperState.initialValue && t !== "" && t !== null && (e.value = t);
}
function Vu(e) {
  switch (e) {
    case "svg":
      return "http://www.w3.org/2000/svg";
    case "math":
      return "http://www.w3.org/1998/Math/MathML";
    default:
      return "http://www.w3.org/1999/xhtml";
  }
}
function Ni(e, t) {
  return e == null || e === "http://www.w3.org/1999/xhtml" ? Vu(t) : e === "http://www.w3.org/2000/svg" && t === "foreignObject" ? "http://www.w3.org/1999/xhtml" : e;
}
var wr, Wu = function(e) {
  return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction ? function(t, n, r, l) {
    MSApp.execUnsafeLocalFunction(function() {
      return e(t, n, r, l);
    });
  } : e;
}(function(e, t) {
  if (e.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in e) e.innerHTML = t;
  else {
    for (wr = wr || document.createElement("div"), wr.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>", t = wr.firstChild; e.firstChild; ) e.removeChild(e.firstChild);
    for (; t.firstChild; ) e.appendChild(t.firstChild);
  }
});
function Xn(e, t) {
  if (t) {
    var n = e.firstChild;
    if (n && n === e.lastChild && n.nodeType === 3) {
      n.nodeValue = t;
      return;
    }
  }
  e.textContent = t;
}
var $n = {
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
}, gf = ["Webkit", "ms", "Moz", "O"];
Object.keys($n).forEach(function(e) {
  gf.forEach(function(t) {
    t = t + e.charAt(0).toUpperCase() + e.substring(1), $n[t] = $n[e];
  });
});
function Qu(e, t, n) {
  return t == null || typeof t == "boolean" || t === "" ? "" : n || typeof t != "number" || t === 0 || $n.hasOwnProperty(e) && $n[e] ? ("" + t).trim() : t + "px";
}
function Ku(e, t) {
  e = e.style;
  for (var n in t) if (t.hasOwnProperty(n)) {
    var r = n.indexOf("--") === 0, l = Qu(n, t[n], r);
    n === "float" && (n = "cssFloat"), r ? e.setProperty(n, l) : e[n] = l;
  }
}
var vf = U({ menuitem: !0 }, { area: !0, base: !0, br: !0, col: !0, embed: !0, hr: !0, img: !0, input: !0, keygen: !0, link: !0, meta: !0, param: !0, source: !0, track: !0, wbr: !0 });
function ji(e, t) {
  if (t) {
    if (vf[e] && (t.children != null || t.dangerouslySetInnerHTML != null)) throw Error(y(137, e));
    if (t.dangerouslySetInnerHTML != null) {
      if (t.children != null) throw Error(y(60));
      if (typeof t.dangerouslySetInnerHTML != "object" || !("__html" in t.dangerouslySetInnerHTML)) throw Error(y(61));
    }
    if (t.style != null && typeof t.style != "object") throw Error(y(62));
  }
}
function _i(e, t) {
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
var Pi = null;
function xs(e) {
  return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
}
var zi = null, sn = null, on = null;
function mo(e) {
  if (e = hr(e)) {
    if (typeof zi != "function") throw Error(y(280));
    var t = e.stateNode;
    t && (t = El(t), zi(e.stateNode, e.type, t));
  }
}
function Yu(e) {
  sn ? on ? on.push(e) : on = [e] : sn = e;
}
function Gu() {
  if (sn) {
    var e = sn, t = on;
    if (on = sn = null, mo(e), t) for (e = 0; e < t.length; e++) mo(t[e]);
  }
}
function Xu(e, t) {
  return e(t);
}
function bu() {
}
var Wl = !1;
function Zu(e, t, n) {
  if (Wl) return e(t, n);
  Wl = !0;
  try {
    return Xu(e, t, n);
  } finally {
    Wl = !1, (sn !== null || on !== null) && (bu(), Gu());
  }
}
function bn(e, t) {
  var n = e.stateNode;
  if (n === null) return null;
  var r = El(n);
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
  if (n && typeof n != "function") throw Error(y(231, t, typeof n));
  return n;
}
var Ti = !1;
if (tt) try {
  var Nn = {};
  Object.defineProperty(Nn, "passive", { get: function() {
    Ti = !0;
  } }), window.addEventListener("test", Nn, Nn), window.removeEventListener("test", Nn, Nn);
} catch {
  Ti = !1;
}
function yf(e, t, n, r, l, i, s, o, u) {
  var a = Array.prototype.slice.call(arguments, 3);
  try {
    t.apply(n, a);
  } catch (h) {
    this.onError(h);
  }
}
var Bn = !1, Gr = null, Xr = !1, Li = null, xf = { onError: function(e) {
  Bn = !0, Gr = e;
} };
function kf(e, t, n, r, l, i, s, o, u) {
  Bn = !1, Gr = null, yf.apply(xf, arguments);
}
function wf(e, t, n, r, l, i, s, o, u) {
  if (kf.apply(this, arguments), Bn) {
    if (Bn) {
      var a = Gr;
      Bn = !1, Gr = null;
    } else throw Error(y(198));
    Xr || (Xr = !0, Li = a);
  }
}
function Ht(e) {
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
function Ju(e) {
  if (e.tag === 13) {
    var t = e.memoizedState;
    if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
  }
  return null;
}
function go(e) {
  if (Ht(e) !== e) throw Error(y(188));
}
function Sf(e) {
  var t = e.alternate;
  if (!t) {
    if (t = Ht(e), t === null) throw Error(y(188));
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
        if (i === n) return go(l), e;
        if (i === r) return go(l), t;
        i = i.sibling;
      }
      throw Error(y(188));
    }
    if (n.return !== r.return) n = l, r = i;
    else {
      for (var s = !1, o = l.child; o; ) {
        if (o === n) {
          s = !0, n = l, r = i;
          break;
        }
        if (o === r) {
          s = !0, r = l, n = i;
          break;
        }
        o = o.sibling;
      }
      if (!s) {
        for (o = i.child; o; ) {
          if (o === n) {
            s = !0, n = i, r = l;
            break;
          }
          if (o === r) {
            s = !0, r = i, n = l;
            break;
          }
          o = o.sibling;
        }
        if (!s) throw Error(y(189));
      }
    }
    if (n.alternate !== r) throw Error(y(190));
  }
  if (n.tag !== 3) throw Error(y(188));
  return n.stateNode.current === n ? e : t;
}
function qu(e) {
  return e = Sf(e), e !== null ? ea(e) : null;
}
function ea(e) {
  if (e.tag === 5 || e.tag === 6) return e;
  for (e = e.child; e !== null; ) {
    var t = ea(e);
    if (t !== null) return t;
    e = e.sibling;
  }
  return null;
}
var ta = Ce.unstable_scheduleCallback, vo = Ce.unstable_cancelCallback, Cf = Ce.unstable_shouldYield, Ef = Ce.unstable_requestPaint, Y = Ce.unstable_now, Nf = Ce.unstable_getCurrentPriorityLevel, ks = Ce.unstable_ImmediatePriority, na = Ce.unstable_UserBlockingPriority, br = Ce.unstable_NormalPriority, jf = Ce.unstable_LowPriority, ra = Ce.unstable_IdlePriority, kl = null, Ke = null;
function _f(e) {
  if (Ke && typeof Ke.onCommitFiberRoot == "function") try {
    Ke.onCommitFiberRoot(kl, e, void 0, (e.current.flags & 128) === 128);
  } catch {
  }
}
var $e = Math.clz32 ? Math.clz32 : Tf, Pf = Math.log, zf = Math.LN2;
function Tf(e) {
  return e >>>= 0, e === 0 ? 32 : 31 - (Pf(e) / zf | 0) | 0;
}
var Sr = 64, Cr = 4194304;
function On(e) {
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
function Zr(e, t) {
  var n = e.pendingLanes;
  if (n === 0) return 0;
  var r = 0, l = e.suspendedLanes, i = e.pingedLanes, s = n & 268435455;
  if (s !== 0) {
    var o = s & ~l;
    o !== 0 ? r = On(o) : (i &= s, i !== 0 && (r = On(i)));
  } else s = n & ~l, s !== 0 ? r = On(s) : i !== 0 && (r = On(i));
  if (r === 0) return 0;
  if (t !== 0 && t !== r && !(t & l) && (l = r & -r, i = t & -t, l >= i || l === 16 && (i & 4194240) !== 0)) return t;
  if (r & 4 && (r |= n & 16), t = e.entangledLanes, t !== 0) for (e = e.entanglements, t &= r; 0 < t; ) n = 31 - $e(t), l = 1 << n, r |= e[n], t &= ~l;
  return r;
}
function Lf(e, t) {
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
function Mf(e, t) {
  for (var n = e.suspendedLanes, r = e.pingedLanes, l = e.expirationTimes, i = e.pendingLanes; 0 < i; ) {
    var s = 31 - $e(i), o = 1 << s, u = l[s];
    u === -1 ? (!(o & n) || o & r) && (l[s] = Lf(o, t)) : u <= t && (e.expiredLanes |= o), i &= ~o;
  }
}
function Mi(e) {
  return e = e.pendingLanes & -1073741825, e !== 0 ? e : e & 1073741824 ? 1073741824 : 0;
}
function la() {
  var e = Sr;
  return Sr <<= 1, !(Sr & 4194240) && (Sr = 64), e;
}
function Ql(e) {
  for (var t = [], n = 0; 31 > n; n++) t.push(e);
  return t;
}
function dr(e, t, n) {
  e.pendingLanes |= t, t !== 536870912 && (e.suspendedLanes = 0, e.pingedLanes = 0), e = e.eventTimes, t = 31 - $e(t), e[t] = n;
}
function Rf(e, t) {
  var n = e.pendingLanes & ~t;
  e.pendingLanes = t, e.suspendedLanes = 0, e.pingedLanes = 0, e.expiredLanes &= t, e.mutableReadLanes &= t, e.entangledLanes &= t, t = e.entanglements;
  var r = e.eventTimes;
  for (e = e.expirationTimes; 0 < n; ) {
    var l = 31 - $e(n), i = 1 << l;
    t[l] = 0, r[l] = -1, e[l] = -1, n &= ~i;
  }
}
function ws(e, t) {
  var n = e.entangledLanes |= t;
  for (e = e.entanglements; n; ) {
    var r = 31 - $e(n), l = 1 << r;
    l & t | e[r] & t && (e[r] |= t), n &= ~l;
  }
}
var D = 0;
function ia(e) {
  return e &= -e, 1 < e ? 4 < e ? e & 268435455 ? 16 : 536870912 : 4 : 1;
}
var sa, Ss, oa, ua, aa, Ri = !1, Er = [], ht = null, mt = null, gt = null, Zn = /* @__PURE__ */ new Map(), Jn = /* @__PURE__ */ new Map(), ct = [], Df = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
function yo(e, t) {
  switch (e) {
    case "focusin":
    case "focusout":
      ht = null;
      break;
    case "dragenter":
    case "dragleave":
      mt = null;
      break;
    case "mouseover":
    case "mouseout":
      gt = null;
      break;
    case "pointerover":
    case "pointerout":
      Zn.delete(t.pointerId);
      break;
    case "gotpointercapture":
    case "lostpointercapture":
      Jn.delete(t.pointerId);
  }
}
function jn(e, t, n, r, l, i) {
  return e === null || e.nativeEvent !== i ? (e = { blockedOn: t, domEventName: n, eventSystemFlags: r, nativeEvent: i, targetContainers: [l] }, t !== null && (t = hr(t), t !== null && Ss(t)), e) : (e.eventSystemFlags |= r, t = e.targetContainers, l !== null && t.indexOf(l) === -1 && t.push(l), e);
}
function Of(e, t, n, r, l) {
  switch (t) {
    case "focusin":
      return ht = jn(ht, e, t, n, r, l), !0;
    case "dragenter":
      return mt = jn(mt, e, t, n, r, l), !0;
    case "mouseover":
      return gt = jn(gt, e, t, n, r, l), !0;
    case "pointerover":
      var i = l.pointerId;
      return Zn.set(i, jn(Zn.get(i) || null, e, t, n, r, l)), !0;
    case "gotpointercapture":
      return i = l.pointerId, Jn.set(i, jn(Jn.get(i) || null, e, t, n, r, l)), !0;
  }
  return !1;
}
function ca(e) {
  var t = Lt(e.target);
  if (t !== null) {
    var n = Ht(t);
    if (n !== null) {
      if (t = n.tag, t === 13) {
        if (t = Ju(n), t !== null) {
          e.blockedOn = t, aa(e.priority, function() {
            oa(n);
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
function Fr(e) {
  if (e.blockedOn !== null) return !1;
  for (var t = e.targetContainers; 0 < t.length; ) {
    var n = Di(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
    if (n === null) {
      n = e.nativeEvent;
      var r = new n.constructor(n.type, n);
      Pi = r, n.target.dispatchEvent(r), Pi = null;
    } else return t = hr(n), t !== null && Ss(t), e.blockedOn = n, !1;
    t.shift();
  }
  return !0;
}
function xo(e, t, n) {
  Fr(e) && n.delete(t);
}
function If() {
  Ri = !1, ht !== null && Fr(ht) && (ht = null), mt !== null && Fr(mt) && (mt = null), gt !== null && Fr(gt) && (gt = null), Zn.forEach(xo), Jn.forEach(xo);
}
function _n(e, t) {
  e.blockedOn === t && (e.blockedOn = null, Ri || (Ri = !0, Ce.unstable_scheduleCallback(Ce.unstable_NormalPriority, If)));
}
function qn(e) {
  function t(l) {
    return _n(l, e);
  }
  if (0 < Er.length) {
    _n(Er[0], e);
    for (var n = 1; n < Er.length; n++) {
      var r = Er[n];
      r.blockedOn === e && (r.blockedOn = null);
    }
  }
  for (ht !== null && _n(ht, e), mt !== null && _n(mt, e), gt !== null && _n(gt, e), Zn.forEach(t), Jn.forEach(t), n = 0; n < ct.length; n++) r = ct[n], r.blockedOn === e && (r.blockedOn = null);
  for (; 0 < ct.length && (n = ct[0], n.blockedOn === null); ) ca(n), n.blockedOn === null && ct.shift();
}
var un = it.ReactCurrentBatchConfig, Jr = !0;
function Ff(e, t, n, r) {
  var l = D, i = un.transition;
  un.transition = null;
  try {
    D = 1, Cs(e, t, n, r);
  } finally {
    D = l, un.transition = i;
  }
}
function Af(e, t, n, r) {
  var l = D, i = un.transition;
  un.transition = null;
  try {
    D = 4, Cs(e, t, n, r);
  } finally {
    D = l, un.transition = i;
  }
}
function Cs(e, t, n, r) {
  if (Jr) {
    var l = Di(e, t, n, r);
    if (l === null) ti(e, t, r, qr, n), yo(e, r);
    else if (Of(l, e, t, n, r)) r.stopPropagation();
    else if (yo(e, r), t & 4 && -1 < Df.indexOf(e)) {
      for (; l !== null; ) {
        var i = hr(l);
        if (i !== null && sa(i), i = Di(e, t, n, r), i === null && ti(e, t, r, qr, n), i === l) break;
        l = i;
      }
      l !== null && r.stopPropagation();
    } else ti(e, t, r, null, n);
  }
}
var qr = null;
function Di(e, t, n, r) {
  if (qr = null, e = xs(r), e = Lt(e), e !== null) if (t = Ht(e), t === null) e = null;
  else if (n = t.tag, n === 13) {
    if (e = Ju(t), e !== null) return e;
    e = null;
  } else if (n === 3) {
    if (t.stateNode.current.memoizedState.isDehydrated) return t.tag === 3 ? t.stateNode.containerInfo : null;
    e = null;
  } else t !== e && (e = null);
  return qr = e, null;
}
function fa(e) {
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
      switch (Nf()) {
        case ks:
          return 1;
        case na:
          return 4;
        case br:
        case jf:
          return 16;
        case ra:
          return 536870912;
        default:
          return 16;
      }
    default:
      return 16;
  }
}
var dt = null, Es = null, Ar = null;
function da() {
  if (Ar) return Ar;
  var e, t = Es, n = t.length, r, l = "value" in dt ? dt.value : dt.textContent, i = l.length;
  for (e = 0; e < n && t[e] === l[e]; e++) ;
  var s = n - e;
  for (r = 1; r <= s && t[n - r] === l[i - r]; r++) ;
  return Ar = l.slice(e, 1 < r ? 1 - r : void 0);
}
function $r(e) {
  var t = e.keyCode;
  return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
}
function Nr() {
  return !0;
}
function ko() {
  return !1;
}
function Ne(e) {
  function t(n, r, l, i, s) {
    this._reactName = n, this._targetInst = l, this.type = r, this.nativeEvent = i, this.target = s, this.currentTarget = null;
    for (var o in e) e.hasOwnProperty(o) && (n = e[o], this[o] = n ? n(i) : i[o]);
    return this.isDefaultPrevented = (i.defaultPrevented != null ? i.defaultPrevented : i.returnValue === !1) ? Nr : ko, this.isPropagationStopped = ko, this;
  }
  return U(t.prototype, { preventDefault: function() {
    this.defaultPrevented = !0;
    var n = this.nativeEvent;
    n && (n.preventDefault ? n.preventDefault() : typeof n.returnValue != "unknown" && (n.returnValue = !1), this.isDefaultPrevented = Nr);
  }, stopPropagation: function() {
    var n = this.nativeEvent;
    n && (n.stopPropagation ? n.stopPropagation() : typeof n.cancelBubble != "unknown" && (n.cancelBubble = !0), this.isPropagationStopped = Nr);
  }, persist: function() {
  }, isPersistent: Nr }), t;
}
var kn = { eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function(e) {
  return e.timeStamp || Date.now();
}, defaultPrevented: 0, isTrusted: 0 }, Ns = Ne(kn), pr = U({}, kn, { view: 0, detail: 0 }), $f = Ne(pr), Kl, Yl, Pn, wl = U({}, pr, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: js, button: 0, buttons: 0, relatedTarget: function(e) {
  return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
}, movementX: function(e) {
  return "movementX" in e ? e.movementX : (e !== Pn && (Pn && e.type === "mousemove" ? (Kl = e.screenX - Pn.screenX, Yl = e.screenY - Pn.screenY) : Yl = Kl = 0, Pn = e), Kl);
}, movementY: function(e) {
  return "movementY" in e ? e.movementY : Yl;
} }), wo = Ne(wl), Bf = U({}, wl, { dataTransfer: 0 }), Uf = Ne(Bf), Hf = U({}, pr, { relatedTarget: 0 }), Gl = Ne(Hf), Vf = U({}, kn, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }), Wf = Ne(Vf), Qf = U({}, kn, { clipboardData: function(e) {
  return "clipboardData" in e ? e.clipboardData : window.clipboardData;
} }), Kf = Ne(Qf), Yf = U({}, kn, { data: 0 }), So = Ne(Yf), Gf = {
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
}, Xf = {
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
}, bf = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
function Zf(e) {
  var t = this.nativeEvent;
  return t.getModifierState ? t.getModifierState(e) : (e = bf[e]) ? !!t[e] : !1;
}
function js() {
  return Zf;
}
var Jf = U({}, pr, { key: function(e) {
  if (e.key) {
    var t = Gf[e.key] || e.key;
    if (t !== "Unidentified") return t;
  }
  return e.type === "keypress" ? (e = $r(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? Xf[e.keyCode] || "Unidentified" : "";
}, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: js, charCode: function(e) {
  return e.type === "keypress" ? $r(e) : 0;
}, keyCode: function(e) {
  return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
}, which: function(e) {
  return e.type === "keypress" ? $r(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
} }), qf = Ne(Jf), ed = U({}, wl, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 }), Co = Ne(ed), td = U({}, pr, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: js }), nd = Ne(td), rd = U({}, kn, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }), ld = Ne(rd), id = U({}, wl, {
  deltaX: function(e) {
    return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
  },
  deltaY: function(e) {
    return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
  },
  deltaZ: 0,
  deltaMode: 0
}), sd = Ne(id), od = [9, 13, 27, 32], _s = tt && "CompositionEvent" in window, Un = null;
tt && "documentMode" in document && (Un = document.documentMode);
var ud = tt && "TextEvent" in window && !Un, pa = tt && (!_s || Un && 8 < Un && 11 >= Un), Eo = " ", No = !1;
function ha(e, t) {
  switch (e) {
    case "keyup":
      return od.indexOf(t.keyCode) !== -1;
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
function ma(e) {
  return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
}
var Gt = !1;
function ad(e, t) {
  switch (e) {
    case "compositionend":
      return ma(t);
    case "keypress":
      return t.which !== 32 ? null : (No = !0, Eo);
    case "textInput":
      return e = t.data, e === Eo && No ? null : e;
    default:
      return null;
  }
}
function cd(e, t) {
  if (Gt) return e === "compositionend" || !_s && ha(e, t) ? (e = da(), Ar = Es = dt = null, Gt = !1, e) : null;
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
      return pa && t.locale !== "ko" ? null : t.data;
    default:
      return null;
  }
}
var fd = { color: !0, date: !0, datetime: !0, "datetime-local": !0, email: !0, month: !0, number: !0, password: !0, range: !0, search: !0, tel: !0, text: !0, time: !0, url: !0, week: !0 };
function jo(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return t === "input" ? !!fd[e.type] : t === "textarea";
}
function ga(e, t, n, r) {
  Yu(r), t = el(t, "onChange"), 0 < t.length && (n = new Ns("onChange", "change", null, n, r), e.push({ event: n, listeners: t }));
}
var Hn = null, er = null;
function dd(e) {
  _a(e, 0);
}
function Sl(e) {
  var t = Zt(e);
  if (Bu(t)) return e;
}
function pd(e, t) {
  if (e === "change") return t;
}
var va = !1;
if (tt) {
  var Xl;
  if (tt) {
    var bl = "oninput" in document;
    if (!bl) {
      var _o = document.createElement("div");
      _o.setAttribute("oninput", "return;"), bl = typeof _o.oninput == "function";
    }
    Xl = bl;
  } else Xl = !1;
  va = Xl && (!document.documentMode || 9 < document.documentMode);
}
function Po() {
  Hn && (Hn.detachEvent("onpropertychange", ya), er = Hn = null);
}
function ya(e) {
  if (e.propertyName === "value" && Sl(er)) {
    var t = [];
    ga(t, er, e, xs(e)), Zu(dd, t);
  }
}
function hd(e, t, n) {
  e === "focusin" ? (Po(), Hn = t, er = n, Hn.attachEvent("onpropertychange", ya)) : e === "focusout" && Po();
}
function md(e) {
  if (e === "selectionchange" || e === "keyup" || e === "keydown") return Sl(er);
}
function gd(e, t) {
  if (e === "click") return Sl(t);
}
function vd(e, t) {
  if (e === "input" || e === "change") return Sl(t);
}
function yd(e, t) {
  return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
}
var Ue = typeof Object.is == "function" ? Object.is : yd;
function tr(e, t) {
  if (Ue(e, t)) return !0;
  if (typeof e != "object" || e === null || typeof t != "object" || t === null) return !1;
  var n = Object.keys(e), r = Object.keys(t);
  if (n.length !== r.length) return !1;
  for (r = 0; r < n.length; r++) {
    var l = n[r];
    if (!gi.call(t, l) || !Ue(e[l], t[l])) return !1;
  }
  return !0;
}
function zo(e) {
  for (; e && e.firstChild; ) e = e.firstChild;
  return e;
}
function To(e, t) {
  var n = zo(e);
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
    n = zo(n);
  }
}
function xa(e, t) {
  return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? xa(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
}
function ka() {
  for (var e = window, t = Yr(); t instanceof e.HTMLIFrameElement; ) {
    try {
      var n = typeof t.contentWindow.location.href == "string";
    } catch {
      n = !1;
    }
    if (n) e = t.contentWindow;
    else break;
    t = Yr(e.document);
  }
  return t;
}
function Ps(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
}
function xd(e) {
  var t = ka(), n = e.focusedElem, r = e.selectionRange;
  if (t !== n && n && n.ownerDocument && xa(n.ownerDocument.documentElement, n)) {
    if (r !== null && Ps(n)) {
      if (t = r.start, e = r.end, e === void 0 && (e = t), "selectionStart" in n) n.selectionStart = t, n.selectionEnd = Math.min(e, n.value.length);
      else if (e = (t = n.ownerDocument || document) && t.defaultView || window, e.getSelection) {
        e = e.getSelection();
        var l = n.textContent.length, i = Math.min(r.start, l);
        r = r.end === void 0 ? i : Math.min(r.end, l), !e.extend && i > r && (l = r, r = i, i = l), l = To(n, i);
        var s = To(
          n,
          r
        );
        l && s && (e.rangeCount !== 1 || e.anchorNode !== l.node || e.anchorOffset !== l.offset || e.focusNode !== s.node || e.focusOffset !== s.offset) && (t = t.createRange(), t.setStart(l.node, l.offset), e.removeAllRanges(), i > r ? (e.addRange(t), e.extend(s.node, s.offset)) : (t.setEnd(s.node, s.offset), e.addRange(t)));
      }
    }
    for (t = [], e = n; e = e.parentNode; ) e.nodeType === 1 && t.push({ element: e, left: e.scrollLeft, top: e.scrollTop });
    for (typeof n.focus == "function" && n.focus(), n = 0; n < t.length; n++) e = t[n], e.element.scrollLeft = e.left, e.element.scrollTop = e.top;
  }
}
var kd = tt && "documentMode" in document && 11 >= document.documentMode, Xt = null, Oi = null, Vn = null, Ii = !1;
function Lo(e, t, n) {
  var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
  Ii || Xt == null || Xt !== Yr(r) || (r = Xt, "selectionStart" in r && Ps(r) ? r = { start: r.selectionStart, end: r.selectionEnd } : (r = (r.ownerDocument && r.ownerDocument.defaultView || window).getSelection(), r = { anchorNode: r.anchorNode, anchorOffset: r.anchorOffset, focusNode: r.focusNode, focusOffset: r.focusOffset }), Vn && tr(Vn, r) || (Vn = r, r = el(Oi, "onSelect"), 0 < r.length && (t = new Ns("onSelect", "select", null, t, n), e.push({ event: t, listeners: r }), t.target = Xt)));
}
function jr(e, t) {
  var n = {};
  return n[e.toLowerCase()] = t.toLowerCase(), n["Webkit" + e] = "webkit" + t, n["Moz" + e] = "moz" + t, n;
}
var bt = { animationend: jr("Animation", "AnimationEnd"), animationiteration: jr("Animation", "AnimationIteration"), animationstart: jr("Animation", "AnimationStart"), transitionend: jr("Transition", "TransitionEnd") }, Zl = {}, wa = {};
tt && (wa = document.createElement("div").style, "AnimationEvent" in window || (delete bt.animationend.animation, delete bt.animationiteration.animation, delete bt.animationstart.animation), "TransitionEvent" in window || delete bt.transitionend.transition);
function Cl(e) {
  if (Zl[e]) return Zl[e];
  if (!bt[e]) return e;
  var t = bt[e], n;
  for (n in t) if (t.hasOwnProperty(n) && n in wa) return Zl[e] = t[n];
  return e;
}
var Sa = Cl("animationend"), Ca = Cl("animationiteration"), Ea = Cl("animationstart"), Na = Cl("transitionend"), ja = /* @__PURE__ */ new Map(), Mo = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
function Et(e, t) {
  ja.set(e, t), Ut(t, [e]);
}
for (var Jl = 0; Jl < Mo.length; Jl++) {
  var ql = Mo[Jl], wd = ql.toLowerCase(), Sd = ql[0].toUpperCase() + ql.slice(1);
  Et(wd, "on" + Sd);
}
Et(Sa, "onAnimationEnd");
Et(Ca, "onAnimationIteration");
Et(Ea, "onAnimationStart");
Et("dblclick", "onDoubleClick");
Et("focusin", "onFocus");
Et("focusout", "onBlur");
Et(Na, "onTransitionEnd");
fn("onMouseEnter", ["mouseout", "mouseover"]);
fn("onMouseLeave", ["mouseout", "mouseover"]);
fn("onPointerEnter", ["pointerout", "pointerover"]);
fn("onPointerLeave", ["pointerout", "pointerover"]);
Ut("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" "));
Ut("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));
Ut("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
Ut("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" "));
Ut("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" "));
Ut("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
var In = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), Cd = new Set("cancel close invalid load scroll toggle".split(" ").concat(In));
function Ro(e, t, n) {
  var r = e.type || "unknown-event";
  e.currentTarget = n, wf(r, t, void 0, e), e.currentTarget = null;
}
function _a(e, t) {
  t = (t & 4) !== 0;
  for (var n = 0; n < e.length; n++) {
    var r = e[n], l = r.event;
    r = r.listeners;
    e: {
      var i = void 0;
      if (t) for (var s = r.length - 1; 0 <= s; s--) {
        var o = r[s], u = o.instance, a = o.currentTarget;
        if (o = o.listener, u !== i && l.isPropagationStopped()) break e;
        Ro(l, o, a), i = u;
      }
      else for (s = 0; s < r.length; s++) {
        if (o = r[s], u = o.instance, a = o.currentTarget, o = o.listener, u !== i && l.isPropagationStopped()) break e;
        Ro(l, o, a), i = u;
      }
    }
  }
  if (Xr) throw e = Li, Xr = !1, Li = null, e;
}
function I(e, t) {
  var n = t[Ui];
  n === void 0 && (n = t[Ui] = /* @__PURE__ */ new Set());
  var r = e + "__bubble";
  n.has(r) || (Pa(t, e, 2, !1), n.add(r));
}
function ei(e, t, n) {
  var r = 0;
  t && (r |= 4), Pa(n, e, r, t);
}
var _r = "_reactListening" + Math.random().toString(36).slice(2);
function nr(e) {
  if (!e[_r]) {
    e[_r] = !0, Ou.forEach(function(n) {
      n !== "selectionchange" && (Cd.has(n) || ei(n, !1, e), ei(n, !0, e));
    });
    var t = e.nodeType === 9 ? e : e.ownerDocument;
    t === null || t[_r] || (t[_r] = !0, ei("selectionchange", !1, t));
  }
}
function Pa(e, t, n, r) {
  switch (fa(t)) {
    case 1:
      var l = Ff;
      break;
    case 4:
      l = Af;
      break;
    default:
      l = Cs;
  }
  n = l.bind(null, t, n, e), l = void 0, !Ti || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (l = !0), r ? l !== void 0 ? e.addEventListener(t, n, { capture: !0, passive: l }) : e.addEventListener(t, n, !0) : l !== void 0 ? e.addEventListener(t, n, { passive: l }) : e.addEventListener(t, n, !1);
}
function ti(e, t, n, r, l) {
  var i = r;
  if (!(t & 1) && !(t & 2) && r !== null) e: for (; ; ) {
    if (r === null) return;
    var s = r.tag;
    if (s === 3 || s === 4) {
      var o = r.stateNode.containerInfo;
      if (o === l || o.nodeType === 8 && o.parentNode === l) break;
      if (s === 4) for (s = r.return; s !== null; ) {
        var u = s.tag;
        if ((u === 3 || u === 4) && (u = s.stateNode.containerInfo, u === l || u.nodeType === 8 && u.parentNode === l)) return;
        s = s.return;
      }
      for (; o !== null; ) {
        if (s = Lt(o), s === null) return;
        if (u = s.tag, u === 5 || u === 6) {
          r = i = s;
          continue e;
        }
        o = o.parentNode;
      }
    }
    r = r.return;
  }
  Zu(function() {
    var a = i, h = xs(n), m = [];
    e: {
      var g = ja.get(e);
      if (g !== void 0) {
        var k = Ns, w = e;
        switch (e) {
          case "keypress":
            if ($r(n) === 0) break e;
          case "keydown":
          case "keyup":
            k = qf;
            break;
          case "focusin":
            w = "focus", k = Gl;
            break;
          case "focusout":
            w = "blur", k = Gl;
            break;
          case "beforeblur":
          case "afterblur":
            k = Gl;
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
            k = wo;
            break;
          case "drag":
          case "dragend":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "dragstart":
          case "drop":
            k = Uf;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            k = nd;
            break;
          case Sa:
          case Ca:
          case Ea:
            k = Wf;
            break;
          case Na:
            k = ld;
            break;
          case "scroll":
            k = $f;
            break;
          case "wheel":
            k = sd;
            break;
          case "copy":
          case "cut":
          case "paste":
            k = Kf;
            break;
          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
          case "pointerdown":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "pointerup":
            k = Co;
        }
        var x = (t & 4) !== 0, R = !x && e === "scroll", d = x ? g !== null ? g + "Capture" : null : g;
        x = [];
        for (var f = a, p; f !== null; ) {
          p = f;
          var v = p.stateNode;
          if (p.tag === 5 && v !== null && (p = v, d !== null && (v = bn(f, d), v != null && x.push(rr(f, v, p)))), R) break;
          f = f.return;
        }
        0 < x.length && (g = new k(g, w, null, n, h), m.push({ event: g, listeners: x }));
      }
    }
    if (!(t & 7)) {
      e: {
        if (g = e === "mouseover" || e === "pointerover", k = e === "mouseout" || e === "pointerout", g && n !== Pi && (w = n.relatedTarget || n.fromElement) && (Lt(w) || w[nt])) break e;
        if ((k || g) && (g = h.window === h ? h : (g = h.ownerDocument) ? g.defaultView || g.parentWindow : window, k ? (w = n.relatedTarget || n.toElement, k = a, w = w ? Lt(w) : null, w !== null && (R = Ht(w), w !== R || w.tag !== 5 && w.tag !== 6) && (w = null)) : (k = null, w = a), k !== w)) {
          if (x = wo, v = "onMouseLeave", d = "onMouseEnter", f = "mouse", (e === "pointerout" || e === "pointerover") && (x = Co, v = "onPointerLeave", d = "onPointerEnter", f = "pointer"), R = k == null ? g : Zt(k), p = w == null ? g : Zt(w), g = new x(v, f + "leave", k, n, h), g.target = R, g.relatedTarget = p, v = null, Lt(h) === a && (x = new x(d, f + "enter", w, n, h), x.target = p, x.relatedTarget = R, v = x), R = v, k && w) t: {
            for (x = k, d = w, f = 0, p = x; p; p = Vt(p)) f++;
            for (p = 0, v = d; v; v = Vt(v)) p++;
            for (; 0 < f - p; ) x = Vt(x), f--;
            for (; 0 < p - f; ) d = Vt(d), p--;
            for (; f--; ) {
              if (x === d || d !== null && x === d.alternate) break t;
              x = Vt(x), d = Vt(d);
            }
            x = null;
          }
          else x = null;
          k !== null && Do(m, g, k, x, !1), w !== null && R !== null && Do(m, R, w, x, !0);
        }
      }
      e: {
        if (g = a ? Zt(a) : window, k = g.nodeName && g.nodeName.toLowerCase(), k === "select" || k === "input" && g.type === "file") var C = pd;
        else if (jo(g)) if (va) C = vd;
        else {
          C = md;
          var N = hd;
        }
        else (k = g.nodeName) && k.toLowerCase() === "input" && (g.type === "checkbox" || g.type === "radio") && (C = gd);
        if (C && (C = C(e, a))) {
          ga(m, C, n, h);
          break e;
        }
        N && N(e, g, a), e === "focusout" && (N = g._wrapperState) && N.controlled && g.type === "number" && Ci(g, "number", g.value);
      }
      switch (N = a ? Zt(a) : window, e) {
        case "focusin":
          (jo(N) || N.contentEditable === "true") && (Xt = N, Oi = a, Vn = null);
          break;
        case "focusout":
          Vn = Oi = Xt = null;
          break;
        case "mousedown":
          Ii = !0;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          Ii = !1, Lo(m, n, h);
          break;
        case "selectionchange":
          if (kd) break;
        case "keydown":
        case "keyup":
          Lo(m, n, h);
      }
      var j;
      if (_s) e: {
        switch (e) {
          case "compositionstart":
            var _ = "onCompositionStart";
            break e;
          case "compositionend":
            _ = "onCompositionEnd";
            break e;
          case "compositionupdate":
            _ = "onCompositionUpdate";
            break e;
        }
        _ = void 0;
      }
      else Gt ? ha(e, n) && (_ = "onCompositionEnd") : e === "keydown" && n.keyCode === 229 && (_ = "onCompositionStart");
      _ && (pa && n.locale !== "ko" && (Gt || _ !== "onCompositionStart" ? _ === "onCompositionEnd" && Gt && (j = da()) : (dt = h, Es = "value" in dt ? dt.value : dt.textContent, Gt = !0)), N = el(a, _), 0 < N.length && (_ = new So(_, e, null, n, h), m.push({ event: _, listeners: N }), j ? _.data = j : (j = ma(n), j !== null && (_.data = j)))), (j = ud ? ad(e, n) : cd(e, n)) && (a = el(a, "onBeforeInput"), 0 < a.length && (h = new So("onBeforeInput", "beforeinput", null, n, h), m.push({ event: h, listeners: a }), h.data = j));
    }
    _a(m, t);
  });
}
function rr(e, t, n) {
  return { instance: e, listener: t, currentTarget: n };
}
function el(e, t) {
  for (var n = t + "Capture", r = []; e !== null; ) {
    var l = e, i = l.stateNode;
    l.tag === 5 && i !== null && (l = i, i = bn(e, n), i != null && r.unshift(rr(e, i, l)), i = bn(e, t), i != null && r.push(rr(e, i, l))), e = e.return;
  }
  return r;
}
function Vt(e) {
  if (e === null) return null;
  do
    e = e.return;
  while (e && e.tag !== 5);
  return e || null;
}
function Do(e, t, n, r, l) {
  for (var i = t._reactName, s = []; n !== null && n !== r; ) {
    var o = n, u = o.alternate, a = o.stateNode;
    if (u !== null && u === r) break;
    o.tag === 5 && a !== null && (o = a, l ? (u = bn(n, i), u != null && s.unshift(rr(n, u, o))) : l || (u = bn(n, i), u != null && s.push(rr(n, u, o)))), n = n.return;
  }
  s.length !== 0 && e.push({ event: t, listeners: s });
}
var Ed = /\r\n?/g, Nd = /\u0000|\uFFFD/g;
function Oo(e) {
  return (typeof e == "string" ? e : "" + e).replace(Ed, `
`).replace(Nd, "");
}
function Pr(e, t, n) {
  if (t = Oo(t), Oo(e) !== t && n) throw Error(y(425));
}
function tl() {
}
var Fi = null, Ai = null;
function $i(e, t) {
  return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
}
var Bi = typeof setTimeout == "function" ? setTimeout : void 0, jd = typeof clearTimeout == "function" ? clearTimeout : void 0, Io = typeof Promise == "function" ? Promise : void 0, _d = typeof queueMicrotask == "function" ? queueMicrotask : typeof Io < "u" ? function(e) {
  return Io.resolve(null).then(e).catch(Pd);
} : Bi;
function Pd(e) {
  setTimeout(function() {
    throw e;
  });
}
function ni(e, t) {
  var n = t, r = 0;
  do {
    var l = n.nextSibling;
    if (e.removeChild(n), l && l.nodeType === 8) if (n = l.data, n === "/$") {
      if (r === 0) {
        e.removeChild(l), qn(t);
        return;
      }
      r--;
    } else n !== "$" && n !== "$?" && n !== "$!" || r++;
    n = l;
  } while (n);
  qn(t);
}
function vt(e) {
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
function Fo(e) {
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
var wn = Math.random().toString(36).slice(2), Qe = "__reactFiber$" + wn, lr = "__reactProps$" + wn, nt = "__reactContainer$" + wn, Ui = "__reactEvents$" + wn, zd = "__reactListeners$" + wn, Td = "__reactHandles$" + wn;
function Lt(e) {
  var t = e[Qe];
  if (t) return t;
  for (var n = e.parentNode; n; ) {
    if (t = n[nt] || n[Qe]) {
      if (n = t.alternate, t.child !== null || n !== null && n.child !== null) for (e = Fo(e); e !== null; ) {
        if (n = e[Qe]) return n;
        e = Fo(e);
      }
      return t;
    }
    e = n, n = e.parentNode;
  }
  return null;
}
function hr(e) {
  return e = e[Qe] || e[nt], !e || e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3 ? null : e;
}
function Zt(e) {
  if (e.tag === 5 || e.tag === 6) return e.stateNode;
  throw Error(y(33));
}
function El(e) {
  return e[lr] || null;
}
var Hi = [], Jt = -1;
function Nt(e) {
  return { current: e };
}
function F(e) {
  0 > Jt || (e.current = Hi[Jt], Hi[Jt] = null, Jt--);
}
function O(e, t) {
  Jt++, Hi[Jt] = e.current, e.current = t;
}
var Ct = {}, ae = Nt(Ct), ge = Nt(!1), It = Ct;
function dn(e, t) {
  var n = e.type.contextTypes;
  if (!n) return Ct;
  var r = e.stateNode;
  if (r && r.__reactInternalMemoizedUnmaskedChildContext === t) return r.__reactInternalMemoizedMaskedChildContext;
  var l = {}, i;
  for (i in n) l[i] = t[i];
  return r && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = t, e.__reactInternalMemoizedMaskedChildContext = l), l;
}
function ve(e) {
  return e = e.childContextTypes, e != null;
}
function nl() {
  F(ge), F(ae);
}
function Ao(e, t, n) {
  if (ae.current !== Ct) throw Error(y(168));
  O(ae, t), O(ge, n);
}
function za(e, t, n) {
  var r = e.stateNode;
  if (t = t.childContextTypes, typeof r.getChildContext != "function") return n;
  r = r.getChildContext();
  for (var l in r) if (!(l in t)) throw Error(y(108, hf(e) || "Unknown", l));
  return U({}, n, r);
}
function rl(e) {
  return e = (e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext || Ct, It = ae.current, O(ae, e), O(ge, ge.current), !0;
}
function $o(e, t, n) {
  var r = e.stateNode;
  if (!r) throw Error(y(169));
  n ? (e = za(e, t, It), r.__reactInternalMemoizedMergedChildContext = e, F(ge), F(ae), O(ae, e)) : F(ge), O(ge, n);
}
var be = null, Nl = !1, ri = !1;
function Ta(e) {
  be === null ? be = [e] : be.push(e);
}
function Ld(e) {
  Nl = !0, Ta(e);
}
function jt() {
  if (!ri && be !== null) {
    ri = !0;
    var e = 0, t = D;
    try {
      var n = be;
      for (D = 1; e < n.length; e++) {
        var r = n[e];
        do
          r = r(!0);
        while (r !== null);
      }
      be = null, Nl = !1;
    } catch (l) {
      throw be !== null && (be = be.slice(e + 1)), ta(ks, jt), l;
    } finally {
      D = t, ri = !1;
    }
  }
  return null;
}
var qt = [], en = 0, ll = null, il = 0, Pe = [], ze = 0, Ft = null, Je = 1, qe = "";
function zt(e, t) {
  qt[en++] = il, qt[en++] = ll, ll = e, il = t;
}
function La(e, t, n) {
  Pe[ze++] = Je, Pe[ze++] = qe, Pe[ze++] = Ft, Ft = e;
  var r = Je;
  e = qe;
  var l = 32 - $e(r) - 1;
  r &= ~(1 << l), n += 1;
  var i = 32 - $e(t) + l;
  if (30 < i) {
    var s = l - l % 5;
    i = (r & (1 << s) - 1).toString(32), r >>= s, l -= s, Je = 1 << 32 - $e(t) + l | n << l | r, qe = i + e;
  } else Je = 1 << i | n << l | r, qe = e;
}
function zs(e) {
  e.return !== null && (zt(e, 1), La(e, 1, 0));
}
function Ts(e) {
  for (; e === ll; ) ll = qt[--en], qt[en] = null, il = qt[--en], qt[en] = null;
  for (; e === Ft; ) Ft = Pe[--ze], Pe[ze] = null, qe = Pe[--ze], Pe[ze] = null, Je = Pe[--ze], Pe[ze] = null;
}
var Se = null, we = null, A = !1, Ae = null;
function Ma(e, t) {
  var n = Te(5, null, null, 0);
  n.elementType = "DELETED", n.stateNode = t, n.return = e, t = e.deletions, t === null ? (e.deletions = [n], e.flags |= 16) : t.push(n);
}
function Bo(e, t) {
  switch (e.tag) {
    case 5:
      var n = e.type;
      return t = t.nodeType !== 1 || n.toLowerCase() !== t.nodeName.toLowerCase() ? null : t, t !== null ? (e.stateNode = t, Se = e, we = vt(t.firstChild), !0) : !1;
    case 6:
      return t = e.pendingProps === "" || t.nodeType !== 3 ? null : t, t !== null ? (e.stateNode = t, Se = e, we = null, !0) : !1;
    case 13:
      return t = t.nodeType !== 8 ? null : t, t !== null ? (n = Ft !== null ? { id: Je, overflow: qe } : null, e.memoizedState = { dehydrated: t, treeContext: n, retryLane: 1073741824 }, n = Te(18, null, null, 0), n.stateNode = t, n.return = e, e.child = n, Se = e, we = null, !0) : !1;
    default:
      return !1;
  }
}
function Vi(e) {
  return (e.mode & 1) !== 0 && (e.flags & 128) === 0;
}
function Wi(e) {
  if (A) {
    var t = we;
    if (t) {
      var n = t;
      if (!Bo(e, t)) {
        if (Vi(e)) throw Error(y(418));
        t = vt(n.nextSibling);
        var r = Se;
        t && Bo(e, t) ? Ma(r, n) : (e.flags = e.flags & -4097 | 2, A = !1, Se = e);
      }
    } else {
      if (Vi(e)) throw Error(y(418));
      e.flags = e.flags & -4097 | 2, A = !1, Se = e;
    }
  }
}
function Uo(e) {
  for (e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13; ) e = e.return;
  Se = e;
}
function zr(e) {
  if (e !== Se) return !1;
  if (!A) return Uo(e), A = !0, !1;
  var t;
  if ((t = e.tag !== 3) && !(t = e.tag !== 5) && (t = e.type, t = t !== "head" && t !== "body" && !$i(e.type, e.memoizedProps)), t && (t = we)) {
    if (Vi(e)) throw Ra(), Error(y(418));
    for (; t; ) Ma(e, t), t = vt(t.nextSibling);
  }
  if (Uo(e), e.tag === 13) {
    if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(y(317));
    e: {
      for (e = e.nextSibling, t = 0; e; ) {
        if (e.nodeType === 8) {
          var n = e.data;
          if (n === "/$") {
            if (t === 0) {
              we = vt(e.nextSibling);
              break e;
            }
            t--;
          } else n !== "$" && n !== "$!" && n !== "$?" || t++;
        }
        e = e.nextSibling;
      }
      we = null;
    }
  } else we = Se ? vt(e.stateNode.nextSibling) : null;
  return !0;
}
function Ra() {
  for (var e = we; e; ) e = vt(e.nextSibling);
}
function pn() {
  we = Se = null, A = !1;
}
function Ls(e) {
  Ae === null ? Ae = [e] : Ae.push(e);
}
var Md = it.ReactCurrentBatchConfig;
function zn(e, t, n) {
  if (e = n.ref, e !== null && typeof e != "function" && typeof e != "object") {
    if (n._owner) {
      if (n = n._owner, n) {
        if (n.tag !== 1) throw Error(y(309));
        var r = n.stateNode;
      }
      if (!r) throw Error(y(147, e));
      var l = r, i = "" + e;
      return t !== null && t.ref !== null && typeof t.ref == "function" && t.ref._stringRef === i ? t.ref : (t = function(s) {
        var o = l.refs;
        s === null ? delete o[i] : o[i] = s;
      }, t._stringRef = i, t);
    }
    if (typeof e != "string") throw Error(y(284));
    if (!n._owner) throw Error(y(290, e));
  }
  return e;
}
function Tr(e, t) {
  throw e = Object.prototype.toString.call(t), Error(y(31, e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e));
}
function Ho(e) {
  var t = e._init;
  return t(e._payload);
}
function Da(e) {
  function t(d, f) {
    if (e) {
      var p = d.deletions;
      p === null ? (d.deletions = [f], d.flags |= 16) : p.push(f);
    }
  }
  function n(d, f) {
    if (!e) return null;
    for (; f !== null; ) t(d, f), f = f.sibling;
    return null;
  }
  function r(d, f) {
    for (d = /* @__PURE__ */ new Map(); f !== null; ) f.key !== null ? d.set(f.key, f) : d.set(f.index, f), f = f.sibling;
    return d;
  }
  function l(d, f) {
    return d = wt(d, f), d.index = 0, d.sibling = null, d;
  }
  function i(d, f, p) {
    return d.index = p, e ? (p = d.alternate, p !== null ? (p = p.index, p < f ? (d.flags |= 2, f) : p) : (d.flags |= 2, f)) : (d.flags |= 1048576, f);
  }
  function s(d) {
    return e && d.alternate === null && (d.flags |= 2), d;
  }
  function o(d, f, p, v) {
    return f === null || f.tag !== 6 ? (f = ci(p, d.mode, v), f.return = d, f) : (f = l(f, p), f.return = d, f);
  }
  function u(d, f, p, v) {
    var C = p.type;
    return C === Yt ? h(d, f, p.props.children, v, p.key) : f !== null && (f.elementType === C || typeof C == "object" && C !== null && C.$$typeof === ot && Ho(C) === f.type) ? (v = l(f, p.props), v.ref = zn(d, f, p), v.return = d, v) : (v = Kr(p.type, p.key, p.props, null, d.mode, v), v.ref = zn(d, f, p), v.return = d, v);
  }
  function a(d, f, p, v) {
    return f === null || f.tag !== 4 || f.stateNode.containerInfo !== p.containerInfo || f.stateNode.implementation !== p.implementation ? (f = fi(p, d.mode, v), f.return = d, f) : (f = l(f, p.children || []), f.return = d, f);
  }
  function h(d, f, p, v, C) {
    return f === null || f.tag !== 7 ? (f = Ot(p, d.mode, v, C), f.return = d, f) : (f = l(f, p), f.return = d, f);
  }
  function m(d, f, p) {
    if (typeof f == "string" && f !== "" || typeof f == "number") return f = ci("" + f, d.mode, p), f.return = d, f;
    if (typeof f == "object" && f !== null) {
      switch (f.$$typeof) {
        case xr:
          return p = Kr(f.type, f.key, f.props, null, d.mode, p), p.ref = zn(d, null, f), p.return = d, p;
        case Kt:
          return f = fi(f, d.mode, p), f.return = d, f;
        case ot:
          var v = f._init;
          return m(d, v(f._payload), p);
      }
      if (Dn(f) || En(f)) return f = Ot(f, d.mode, p, null), f.return = d, f;
      Tr(d, f);
    }
    return null;
  }
  function g(d, f, p, v) {
    var C = f !== null ? f.key : null;
    if (typeof p == "string" && p !== "" || typeof p == "number") return C !== null ? null : o(d, f, "" + p, v);
    if (typeof p == "object" && p !== null) {
      switch (p.$$typeof) {
        case xr:
          return p.key === C ? u(d, f, p, v) : null;
        case Kt:
          return p.key === C ? a(d, f, p, v) : null;
        case ot:
          return C = p._init, g(
            d,
            f,
            C(p._payload),
            v
          );
      }
      if (Dn(p) || En(p)) return C !== null ? null : h(d, f, p, v, null);
      Tr(d, p);
    }
    return null;
  }
  function k(d, f, p, v, C) {
    if (typeof v == "string" && v !== "" || typeof v == "number") return d = d.get(p) || null, o(f, d, "" + v, C);
    if (typeof v == "object" && v !== null) {
      switch (v.$$typeof) {
        case xr:
          return d = d.get(v.key === null ? p : v.key) || null, u(f, d, v, C);
        case Kt:
          return d = d.get(v.key === null ? p : v.key) || null, a(f, d, v, C);
        case ot:
          var N = v._init;
          return k(d, f, p, N(v._payload), C);
      }
      if (Dn(v) || En(v)) return d = d.get(p) || null, h(f, d, v, C, null);
      Tr(f, v);
    }
    return null;
  }
  function w(d, f, p, v) {
    for (var C = null, N = null, j = f, _ = f = 0, V = null; j !== null && _ < p.length; _++) {
      j.index > _ ? (V = j, j = null) : V = j.sibling;
      var L = g(d, j, p[_], v);
      if (L === null) {
        j === null && (j = V);
        break;
      }
      e && j && L.alternate === null && t(d, j), f = i(L, f, _), N === null ? C = L : N.sibling = L, N = L, j = V;
    }
    if (_ === p.length) return n(d, j), A && zt(d, _), C;
    if (j === null) {
      for (; _ < p.length; _++) j = m(d, p[_], v), j !== null && (f = i(j, f, _), N === null ? C = j : N.sibling = j, N = j);
      return A && zt(d, _), C;
    }
    for (j = r(d, j); _ < p.length; _++) V = k(j, d, _, p[_], v), V !== null && (e && V.alternate !== null && j.delete(V.key === null ? _ : V.key), f = i(V, f, _), N === null ? C = V : N.sibling = V, N = V);
    return e && j.forEach(function(De) {
      return t(d, De);
    }), A && zt(d, _), C;
  }
  function x(d, f, p, v) {
    var C = En(p);
    if (typeof C != "function") throw Error(y(150));
    if (p = C.call(p), p == null) throw Error(y(151));
    for (var N = C = null, j = f, _ = f = 0, V = null, L = p.next(); j !== null && !L.done; _++, L = p.next()) {
      j.index > _ ? (V = j, j = null) : V = j.sibling;
      var De = g(d, j, L.value, v);
      if (De === null) {
        j === null && (j = V);
        break;
      }
      e && j && De.alternate === null && t(d, j), f = i(De, f, _), N === null ? C = De : N.sibling = De, N = De, j = V;
    }
    if (L.done) return n(
      d,
      j
    ), A && zt(d, _), C;
    if (j === null) {
      for (; !L.done; _++, L = p.next()) L = m(d, L.value, v), L !== null && (f = i(L, f, _), N === null ? C = L : N.sibling = L, N = L);
      return A && zt(d, _), C;
    }
    for (j = r(d, j); !L.done; _++, L = p.next()) L = k(j, d, _, L.value, v), L !== null && (e && L.alternate !== null && j.delete(L.key === null ? _ : L.key), f = i(L, f, _), N === null ? C = L : N.sibling = L, N = L);
    return e && j.forEach(function(Sn) {
      return t(d, Sn);
    }), A && zt(d, _), C;
  }
  function R(d, f, p, v) {
    if (typeof p == "object" && p !== null && p.type === Yt && p.key === null && (p = p.props.children), typeof p == "object" && p !== null) {
      switch (p.$$typeof) {
        case xr:
          e: {
            for (var C = p.key, N = f; N !== null; ) {
              if (N.key === C) {
                if (C = p.type, C === Yt) {
                  if (N.tag === 7) {
                    n(d, N.sibling), f = l(N, p.props.children), f.return = d, d = f;
                    break e;
                  }
                } else if (N.elementType === C || typeof C == "object" && C !== null && C.$$typeof === ot && Ho(C) === N.type) {
                  n(d, N.sibling), f = l(N, p.props), f.ref = zn(d, N, p), f.return = d, d = f;
                  break e;
                }
                n(d, N);
                break;
              } else t(d, N);
              N = N.sibling;
            }
            p.type === Yt ? (f = Ot(p.props.children, d.mode, v, p.key), f.return = d, d = f) : (v = Kr(p.type, p.key, p.props, null, d.mode, v), v.ref = zn(d, f, p), v.return = d, d = v);
          }
          return s(d);
        case Kt:
          e: {
            for (N = p.key; f !== null; ) {
              if (f.key === N) if (f.tag === 4 && f.stateNode.containerInfo === p.containerInfo && f.stateNode.implementation === p.implementation) {
                n(d, f.sibling), f = l(f, p.children || []), f.return = d, d = f;
                break e;
              } else {
                n(d, f);
                break;
              }
              else t(d, f);
              f = f.sibling;
            }
            f = fi(p, d.mode, v), f.return = d, d = f;
          }
          return s(d);
        case ot:
          return N = p._init, R(d, f, N(p._payload), v);
      }
      if (Dn(p)) return w(d, f, p, v);
      if (En(p)) return x(d, f, p, v);
      Tr(d, p);
    }
    return typeof p == "string" && p !== "" || typeof p == "number" ? (p = "" + p, f !== null && f.tag === 6 ? (n(d, f.sibling), f = l(f, p), f.return = d, d = f) : (n(d, f), f = ci(p, d.mode, v), f.return = d, d = f), s(d)) : n(d, f);
  }
  return R;
}
var hn = Da(!0), Oa = Da(!1), sl = Nt(null), ol = null, tn = null, Ms = null;
function Rs() {
  Ms = tn = ol = null;
}
function Ds(e) {
  var t = sl.current;
  F(sl), e._currentValue = t;
}
function Qi(e, t, n) {
  for (; e !== null; ) {
    var r = e.alternate;
    if ((e.childLanes & t) !== t ? (e.childLanes |= t, r !== null && (r.childLanes |= t)) : r !== null && (r.childLanes & t) !== t && (r.childLanes |= t), e === n) break;
    e = e.return;
  }
}
function an(e, t) {
  ol = e, Ms = tn = null, e = e.dependencies, e !== null && e.firstContext !== null && (e.lanes & t && (me = !0), e.firstContext = null);
}
function Me(e) {
  var t = e._currentValue;
  if (Ms !== e) if (e = { context: e, memoizedValue: t, next: null }, tn === null) {
    if (ol === null) throw Error(y(308));
    tn = e, ol.dependencies = { lanes: 0, firstContext: e };
  } else tn = tn.next = e;
  return t;
}
var Mt = null;
function Os(e) {
  Mt === null ? Mt = [e] : Mt.push(e);
}
function Ia(e, t, n, r) {
  var l = t.interleaved;
  return l === null ? (n.next = n, Os(t)) : (n.next = l.next, l.next = n), t.interleaved = n, rt(e, r);
}
function rt(e, t) {
  e.lanes |= t;
  var n = e.alternate;
  for (n !== null && (n.lanes |= t), n = e, e = e.return; e !== null; ) e.childLanes |= t, n = e.alternate, n !== null && (n.childLanes |= t), n = e, e = e.return;
  return n.tag === 3 ? n.stateNode : null;
}
var ut = !1;
function Is(e) {
  e.updateQueue = { baseState: e.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null, interleaved: null, lanes: 0 }, effects: null };
}
function Fa(e, t) {
  e = e.updateQueue, t.updateQueue === e && (t.updateQueue = { baseState: e.baseState, firstBaseUpdate: e.firstBaseUpdate, lastBaseUpdate: e.lastBaseUpdate, shared: e.shared, effects: e.effects });
}
function et(e, t) {
  return { eventTime: e, lane: t, tag: 0, payload: null, callback: null, next: null };
}
function yt(e, t, n) {
  var r = e.updateQueue;
  if (r === null) return null;
  if (r = r.shared, M & 2) {
    var l = r.pending;
    return l === null ? t.next = t : (t.next = l.next, l.next = t), r.pending = t, rt(e, n);
  }
  return l = r.interleaved, l === null ? (t.next = t, Os(r)) : (t.next = l.next, l.next = t), r.interleaved = t, rt(e, n);
}
function Br(e, t, n) {
  if (t = t.updateQueue, t !== null && (t = t.shared, (n & 4194240) !== 0)) {
    var r = t.lanes;
    r &= e.pendingLanes, n |= r, t.lanes = n, ws(e, n);
  }
}
function Vo(e, t) {
  var n = e.updateQueue, r = e.alternate;
  if (r !== null && (r = r.updateQueue, n === r)) {
    var l = null, i = null;
    if (n = n.firstBaseUpdate, n !== null) {
      do {
        var s = { eventTime: n.eventTime, lane: n.lane, tag: n.tag, payload: n.payload, callback: n.callback, next: null };
        i === null ? l = i = s : i = i.next = s, n = n.next;
      } while (n !== null);
      i === null ? l = i = t : i = i.next = t;
    } else l = i = t;
    n = { baseState: r.baseState, firstBaseUpdate: l, lastBaseUpdate: i, shared: r.shared, effects: r.effects }, e.updateQueue = n;
    return;
  }
  e = n.lastBaseUpdate, e === null ? n.firstBaseUpdate = t : e.next = t, n.lastBaseUpdate = t;
}
function ul(e, t, n, r) {
  var l = e.updateQueue;
  ut = !1;
  var i = l.firstBaseUpdate, s = l.lastBaseUpdate, o = l.shared.pending;
  if (o !== null) {
    l.shared.pending = null;
    var u = o, a = u.next;
    u.next = null, s === null ? i = a : s.next = a, s = u;
    var h = e.alternate;
    h !== null && (h = h.updateQueue, o = h.lastBaseUpdate, o !== s && (o === null ? h.firstBaseUpdate = a : o.next = a, h.lastBaseUpdate = u));
  }
  if (i !== null) {
    var m = l.baseState;
    s = 0, h = a = u = null, o = i;
    do {
      var g = o.lane, k = o.eventTime;
      if ((r & g) === g) {
        h !== null && (h = h.next = {
          eventTime: k,
          lane: 0,
          tag: o.tag,
          payload: o.payload,
          callback: o.callback,
          next: null
        });
        e: {
          var w = e, x = o;
          switch (g = t, k = n, x.tag) {
            case 1:
              if (w = x.payload, typeof w == "function") {
                m = w.call(k, m, g);
                break e;
              }
              m = w;
              break e;
            case 3:
              w.flags = w.flags & -65537 | 128;
            case 0:
              if (w = x.payload, g = typeof w == "function" ? w.call(k, m, g) : w, g == null) break e;
              m = U({}, m, g);
              break e;
            case 2:
              ut = !0;
          }
        }
        o.callback !== null && o.lane !== 0 && (e.flags |= 64, g = l.effects, g === null ? l.effects = [o] : g.push(o));
      } else k = { eventTime: k, lane: g, tag: o.tag, payload: o.payload, callback: o.callback, next: null }, h === null ? (a = h = k, u = m) : h = h.next = k, s |= g;
      if (o = o.next, o === null) {
        if (o = l.shared.pending, o === null) break;
        g = o, o = g.next, g.next = null, l.lastBaseUpdate = g, l.shared.pending = null;
      }
    } while (!0);
    if (h === null && (u = m), l.baseState = u, l.firstBaseUpdate = a, l.lastBaseUpdate = h, t = l.shared.interleaved, t !== null) {
      l = t;
      do
        s |= l.lane, l = l.next;
      while (l !== t);
    } else i === null && (l.shared.lanes = 0);
    $t |= s, e.lanes = s, e.memoizedState = m;
  }
}
function Wo(e, t, n) {
  if (e = t.effects, t.effects = null, e !== null) for (t = 0; t < e.length; t++) {
    var r = e[t], l = r.callback;
    if (l !== null) {
      if (r.callback = null, r = n, typeof l != "function") throw Error(y(191, l));
      l.call(r);
    }
  }
}
var mr = {}, Ye = Nt(mr), ir = Nt(mr), sr = Nt(mr);
function Rt(e) {
  if (e === mr) throw Error(y(174));
  return e;
}
function Fs(e, t) {
  switch (O(sr, t), O(ir, e), O(Ye, mr), e = t.nodeType, e) {
    case 9:
    case 11:
      t = (t = t.documentElement) ? t.namespaceURI : Ni(null, "");
      break;
    default:
      e = e === 8 ? t.parentNode : t, t = e.namespaceURI || null, e = e.tagName, t = Ni(t, e);
  }
  F(Ye), O(Ye, t);
}
function mn() {
  F(Ye), F(ir), F(sr);
}
function Aa(e) {
  Rt(sr.current);
  var t = Rt(Ye.current), n = Ni(t, e.type);
  t !== n && (O(ir, e), O(Ye, n));
}
function As(e) {
  ir.current === e && (F(Ye), F(ir));
}
var $ = Nt(0);
function al(e) {
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
var li = [];
function $s() {
  for (var e = 0; e < li.length; e++) li[e]._workInProgressVersionPrimary = null;
  li.length = 0;
}
var Ur = it.ReactCurrentDispatcher, ii = it.ReactCurrentBatchConfig, At = 0, B = null, b = null, te = null, cl = !1, Wn = !1, or = 0, Rd = 0;
function se() {
  throw Error(y(321));
}
function Bs(e, t) {
  if (t === null) return !1;
  for (var n = 0; n < t.length && n < e.length; n++) if (!Ue(e[n], t[n])) return !1;
  return !0;
}
function Us(e, t, n, r, l, i) {
  if (At = i, B = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, Ur.current = e === null || e.memoizedState === null ? Fd : Ad, e = n(r, l), Wn) {
    i = 0;
    do {
      if (Wn = !1, or = 0, 25 <= i) throw Error(y(301));
      i += 1, te = b = null, t.updateQueue = null, Ur.current = $d, e = n(r, l);
    } while (Wn);
  }
  if (Ur.current = fl, t = b !== null && b.next !== null, At = 0, te = b = B = null, cl = !1, t) throw Error(y(300));
  return e;
}
function Hs() {
  var e = or !== 0;
  return or = 0, e;
}
function We() {
  var e = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
  return te === null ? B.memoizedState = te = e : te = te.next = e, te;
}
function Re() {
  if (b === null) {
    var e = B.alternate;
    e = e !== null ? e.memoizedState : null;
  } else e = b.next;
  var t = te === null ? B.memoizedState : te.next;
  if (t !== null) te = t, b = e;
  else {
    if (e === null) throw Error(y(310));
    b = e, e = { memoizedState: b.memoizedState, baseState: b.baseState, baseQueue: b.baseQueue, queue: b.queue, next: null }, te === null ? B.memoizedState = te = e : te = te.next = e;
  }
  return te;
}
function ur(e, t) {
  return typeof t == "function" ? t(e) : t;
}
function si(e) {
  var t = Re(), n = t.queue;
  if (n === null) throw Error(y(311));
  n.lastRenderedReducer = e;
  var r = b, l = r.baseQueue, i = n.pending;
  if (i !== null) {
    if (l !== null) {
      var s = l.next;
      l.next = i.next, i.next = s;
    }
    r.baseQueue = l = i, n.pending = null;
  }
  if (l !== null) {
    i = l.next, r = r.baseState;
    var o = s = null, u = null, a = i;
    do {
      var h = a.lane;
      if ((At & h) === h) u !== null && (u = u.next = { lane: 0, action: a.action, hasEagerState: a.hasEagerState, eagerState: a.eagerState, next: null }), r = a.hasEagerState ? a.eagerState : e(r, a.action);
      else {
        var m = {
          lane: h,
          action: a.action,
          hasEagerState: a.hasEagerState,
          eagerState: a.eagerState,
          next: null
        };
        u === null ? (o = u = m, s = r) : u = u.next = m, B.lanes |= h, $t |= h;
      }
      a = a.next;
    } while (a !== null && a !== i);
    u === null ? s = r : u.next = o, Ue(r, t.memoizedState) || (me = !0), t.memoizedState = r, t.baseState = s, t.baseQueue = u, n.lastRenderedState = r;
  }
  if (e = n.interleaved, e !== null) {
    l = e;
    do
      i = l.lane, B.lanes |= i, $t |= i, l = l.next;
    while (l !== e);
  } else l === null && (n.lanes = 0);
  return [t.memoizedState, n.dispatch];
}
function oi(e) {
  var t = Re(), n = t.queue;
  if (n === null) throw Error(y(311));
  n.lastRenderedReducer = e;
  var r = n.dispatch, l = n.pending, i = t.memoizedState;
  if (l !== null) {
    n.pending = null;
    var s = l = l.next;
    do
      i = e(i, s.action), s = s.next;
    while (s !== l);
    Ue(i, t.memoizedState) || (me = !0), t.memoizedState = i, t.baseQueue === null && (t.baseState = i), n.lastRenderedState = i;
  }
  return [i, r];
}
function $a() {
}
function Ba(e, t) {
  var n = B, r = Re(), l = t(), i = !Ue(r.memoizedState, l);
  if (i && (r.memoizedState = l, me = !0), r = r.queue, Vs(Va.bind(null, n, r, e), [e]), r.getSnapshot !== t || i || te !== null && te.memoizedState.tag & 1) {
    if (n.flags |= 2048, ar(9, Ha.bind(null, n, r, l, t), void 0, null), ne === null) throw Error(y(349));
    At & 30 || Ua(n, t, l);
  }
  return l;
}
function Ua(e, t, n) {
  e.flags |= 16384, e = { getSnapshot: t, value: n }, t = B.updateQueue, t === null ? (t = { lastEffect: null, stores: null }, B.updateQueue = t, t.stores = [e]) : (n = t.stores, n === null ? t.stores = [e] : n.push(e));
}
function Ha(e, t, n, r) {
  t.value = n, t.getSnapshot = r, Wa(t) && Qa(e);
}
function Va(e, t, n) {
  return n(function() {
    Wa(t) && Qa(e);
  });
}
function Wa(e) {
  var t = e.getSnapshot;
  e = e.value;
  try {
    var n = t();
    return !Ue(e, n);
  } catch {
    return !0;
  }
}
function Qa(e) {
  var t = rt(e, 1);
  t !== null && Be(t, e, 1, -1);
}
function Qo(e) {
  var t = We();
  return typeof e == "function" && (e = e()), t.memoizedState = t.baseState = e, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: ur, lastRenderedState: e }, t.queue = e, e = e.dispatch = Id.bind(null, B, e), [t.memoizedState, e];
}
function ar(e, t, n, r) {
  return e = { tag: e, create: t, destroy: n, deps: r, next: null }, t = B.updateQueue, t === null ? (t = { lastEffect: null, stores: null }, B.updateQueue = t, t.lastEffect = e.next = e) : (n = t.lastEffect, n === null ? t.lastEffect = e.next = e : (r = n.next, n.next = e, e.next = r, t.lastEffect = e)), e;
}
function Ka() {
  return Re().memoizedState;
}
function Hr(e, t, n, r) {
  var l = We();
  B.flags |= e, l.memoizedState = ar(1 | t, n, void 0, r === void 0 ? null : r);
}
function jl(e, t, n, r) {
  var l = Re();
  r = r === void 0 ? null : r;
  var i = void 0;
  if (b !== null) {
    var s = b.memoizedState;
    if (i = s.destroy, r !== null && Bs(r, s.deps)) {
      l.memoizedState = ar(t, n, i, r);
      return;
    }
  }
  B.flags |= e, l.memoizedState = ar(1 | t, n, i, r);
}
function Ko(e, t) {
  return Hr(8390656, 8, e, t);
}
function Vs(e, t) {
  return jl(2048, 8, e, t);
}
function Ya(e, t) {
  return jl(4, 2, e, t);
}
function Ga(e, t) {
  return jl(4, 4, e, t);
}
function Xa(e, t) {
  if (typeof t == "function") return e = e(), t(e), function() {
    t(null);
  };
  if (t != null) return e = e(), t.current = e, function() {
    t.current = null;
  };
}
function ba(e, t, n) {
  return n = n != null ? n.concat([e]) : null, jl(4, 4, Xa.bind(null, t, e), n);
}
function Ws() {
}
function Za(e, t) {
  var n = Re();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && Bs(t, r[1]) ? r[0] : (n.memoizedState = [e, t], e);
}
function Ja(e, t) {
  var n = Re();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && Bs(t, r[1]) ? r[0] : (e = e(), n.memoizedState = [e, t], e);
}
function qa(e, t, n) {
  return At & 21 ? (Ue(n, t) || (n = la(), B.lanes |= n, $t |= n, e.baseState = !0), t) : (e.baseState && (e.baseState = !1, me = !0), e.memoizedState = n);
}
function Dd(e, t) {
  var n = D;
  D = n !== 0 && 4 > n ? n : 4, e(!0);
  var r = ii.transition;
  ii.transition = {};
  try {
    e(!1), t();
  } finally {
    D = n, ii.transition = r;
  }
}
function ec() {
  return Re().memoizedState;
}
function Od(e, t, n) {
  var r = kt(e);
  if (n = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null }, tc(e)) nc(t, n);
  else if (n = Ia(e, t, n, r), n !== null) {
    var l = fe();
    Be(n, e, r, l), rc(n, t, r);
  }
}
function Id(e, t, n) {
  var r = kt(e), l = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null };
  if (tc(e)) nc(t, l);
  else {
    var i = e.alternate;
    if (e.lanes === 0 && (i === null || i.lanes === 0) && (i = t.lastRenderedReducer, i !== null)) try {
      var s = t.lastRenderedState, o = i(s, n);
      if (l.hasEagerState = !0, l.eagerState = o, Ue(o, s)) {
        var u = t.interleaved;
        u === null ? (l.next = l, Os(t)) : (l.next = u.next, u.next = l), t.interleaved = l;
        return;
      }
    } catch {
    } finally {
    }
    n = Ia(e, t, l, r), n !== null && (l = fe(), Be(n, e, r, l), rc(n, t, r));
  }
}
function tc(e) {
  var t = e.alternate;
  return e === B || t !== null && t === B;
}
function nc(e, t) {
  Wn = cl = !0;
  var n = e.pending;
  n === null ? t.next = t : (t.next = n.next, n.next = t), e.pending = t;
}
function rc(e, t, n) {
  if (n & 4194240) {
    var r = t.lanes;
    r &= e.pendingLanes, n |= r, t.lanes = n, ws(e, n);
  }
}
var fl = { readContext: Me, useCallback: se, useContext: se, useEffect: se, useImperativeHandle: se, useInsertionEffect: se, useLayoutEffect: se, useMemo: se, useReducer: se, useRef: se, useState: se, useDebugValue: se, useDeferredValue: se, useTransition: se, useMutableSource: se, useSyncExternalStore: se, useId: se, unstable_isNewReconciler: !1 }, Fd = { readContext: Me, useCallback: function(e, t) {
  return We().memoizedState = [e, t === void 0 ? null : t], e;
}, useContext: Me, useEffect: Ko, useImperativeHandle: function(e, t, n) {
  return n = n != null ? n.concat([e]) : null, Hr(
    4194308,
    4,
    Xa.bind(null, t, e),
    n
  );
}, useLayoutEffect: function(e, t) {
  return Hr(4194308, 4, e, t);
}, useInsertionEffect: function(e, t) {
  return Hr(4, 2, e, t);
}, useMemo: function(e, t) {
  var n = We();
  return t = t === void 0 ? null : t, e = e(), n.memoizedState = [e, t], e;
}, useReducer: function(e, t, n) {
  var r = We();
  return t = n !== void 0 ? n(t) : t, r.memoizedState = r.baseState = t, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: e, lastRenderedState: t }, r.queue = e, e = e.dispatch = Od.bind(null, B, e), [r.memoizedState, e];
}, useRef: function(e) {
  var t = We();
  return e = { current: e }, t.memoizedState = e;
}, useState: Qo, useDebugValue: Ws, useDeferredValue: function(e) {
  return We().memoizedState = e;
}, useTransition: function() {
  var e = Qo(!1), t = e[0];
  return e = Dd.bind(null, e[1]), We().memoizedState = e, [t, e];
}, useMutableSource: function() {
}, useSyncExternalStore: function(e, t, n) {
  var r = B, l = We();
  if (A) {
    if (n === void 0) throw Error(y(407));
    n = n();
  } else {
    if (n = t(), ne === null) throw Error(y(349));
    At & 30 || Ua(r, t, n);
  }
  l.memoizedState = n;
  var i = { value: n, getSnapshot: t };
  return l.queue = i, Ko(Va.bind(
    null,
    r,
    i,
    e
  ), [e]), r.flags |= 2048, ar(9, Ha.bind(null, r, i, n, t), void 0, null), n;
}, useId: function() {
  var e = We(), t = ne.identifierPrefix;
  if (A) {
    var n = qe, r = Je;
    n = (r & ~(1 << 32 - $e(r) - 1)).toString(32) + n, t = ":" + t + "R" + n, n = or++, 0 < n && (t += "H" + n.toString(32)), t += ":";
  } else n = Rd++, t = ":" + t + "r" + n.toString(32) + ":";
  return e.memoizedState = t;
}, unstable_isNewReconciler: !1 }, Ad = {
  readContext: Me,
  useCallback: Za,
  useContext: Me,
  useEffect: Vs,
  useImperativeHandle: ba,
  useInsertionEffect: Ya,
  useLayoutEffect: Ga,
  useMemo: Ja,
  useReducer: si,
  useRef: Ka,
  useState: function() {
    return si(ur);
  },
  useDebugValue: Ws,
  useDeferredValue: function(e) {
    var t = Re();
    return qa(t, b.memoizedState, e);
  },
  useTransition: function() {
    var e = si(ur)[0], t = Re().memoizedState;
    return [e, t];
  },
  useMutableSource: $a,
  useSyncExternalStore: Ba,
  useId: ec,
  unstable_isNewReconciler: !1
}, $d = { readContext: Me, useCallback: Za, useContext: Me, useEffect: Vs, useImperativeHandle: ba, useInsertionEffect: Ya, useLayoutEffect: Ga, useMemo: Ja, useReducer: oi, useRef: Ka, useState: function() {
  return oi(ur);
}, useDebugValue: Ws, useDeferredValue: function(e) {
  var t = Re();
  return b === null ? t.memoizedState = e : qa(t, b.memoizedState, e);
}, useTransition: function() {
  var e = oi(ur)[0], t = Re().memoizedState;
  return [e, t];
}, useMutableSource: $a, useSyncExternalStore: Ba, useId: ec, unstable_isNewReconciler: !1 };
function Ie(e, t) {
  if (e && e.defaultProps) {
    t = U({}, t), e = e.defaultProps;
    for (var n in e) t[n] === void 0 && (t[n] = e[n]);
    return t;
  }
  return t;
}
function Ki(e, t, n, r) {
  t = e.memoizedState, n = n(r, t), n = n == null ? t : U({}, t, n), e.memoizedState = n, e.lanes === 0 && (e.updateQueue.baseState = n);
}
var _l = { isMounted: function(e) {
  return (e = e._reactInternals) ? Ht(e) === e : !1;
}, enqueueSetState: function(e, t, n) {
  e = e._reactInternals;
  var r = fe(), l = kt(e), i = et(r, l);
  i.payload = t, n != null && (i.callback = n), t = yt(e, i, l), t !== null && (Be(t, e, l, r), Br(t, e, l));
}, enqueueReplaceState: function(e, t, n) {
  e = e._reactInternals;
  var r = fe(), l = kt(e), i = et(r, l);
  i.tag = 1, i.payload = t, n != null && (i.callback = n), t = yt(e, i, l), t !== null && (Be(t, e, l, r), Br(t, e, l));
}, enqueueForceUpdate: function(e, t) {
  e = e._reactInternals;
  var n = fe(), r = kt(e), l = et(n, r);
  l.tag = 2, t != null && (l.callback = t), t = yt(e, l, r), t !== null && (Be(t, e, r, n), Br(t, e, r));
} };
function Yo(e, t, n, r, l, i, s) {
  return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(r, i, s) : t.prototype && t.prototype.isPureReactComponent ? !tr(n, r) || !tr(l, i) : !0;
}
function lc(e, t, n) {
  var r = !1, l = Ct, i = t.contextType;
  return typeof i == "object" && i !== null ? i = Me(i) : (l = ve(t) ? It : ae.current, r = t.contextTypes, i = (r = r != null) ? dn(e, l) : Ct), t = new t(n, i), e.memoizedState = t.state !== null && t.state !== void 0 ? t.state : null, t.updater = _l, e.stateNode = t, t._reactInternals = e, r && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = l, e.__reactInternalMemoizedMaskedChildContext = i), t;
}
function Go(e, t, n, r) {
  e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, r), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, r), t.state !== e && _l.enqueueReplaceState(t, t.state, null);
}
function Yi(e, t, n, r) {
  var l = e.stateNode;
  l.props = n, l.state = e.memoizedState, l.refs = {}, Is(e);
  var i = t.contextType;
  typeof i == "object" && i !== null ? l.context = Me(i) : (i = ve(t) ? It : ae.current, l.context = dn(e, i)), l.state = e.memoizedState, i = t.getDerivedStateFromProps, typeof i == "function" && (Ki(e, t, i, n), l.state = e.memoizedState), typeof t.getDerivedStateFromProps == "function" || typeof l.getSnapshotBeforeUpdate == "function" || typeof l.UNSAFE_componentWillMount != "function" && typeof l.componentWillMount != "function" || (t = l.state, typeof l.componentWillMount == "function" && l.componentWillMount(), typeof l.UNSAFE_componentWillMount == "function" && l.UNSAFE_componentWillMount(), t !== l.state && _l.enqueueReplaceState(l, l.state, null), ul(e, n, l, r), l.state = e.memoizedState), typeof l.componentDidMount == "function" && (e.flags |= 4194308);
}
function gn(e, t) {
  try {
    var n = "", r = t;
    do
      n += pf(r), r = r.return;
    while (r);
    var l = n;
  } catch (i) {
    l = `
Error generating stack: ` + i.message + `
` + i.stack;
  }
  return { value: e, source: t, stack: l, digest: null };
}
function ui(e, t, n) {
  return { value: e, source: null, stack: n ?? null, digest: t ?? null };
}
function Gi(e, t) {
  try {
    console.error(t.value);
  } catch (n) {
    setTimeout(function() {
      throw n;
    });
  }
}
var Bd = typeof WeakMap == "function" ? WeakMap : Map;
function ic(e, t, n) {
  n = et(-1, n), n.tag = 3, n.payload = { element: null };
  var r = t.value;
  return n.callback = function() {
    pl || (pl = !0, ls = r), Gi(e, t);
  }, n;
}
function sc(e, t, n) {
  n = et(-1, n), n.tag = 3;
  var r = e.type.getDerivedStateFromError;
  if (typeof r == "function") {
    var l = t.value;
    n.payload = function() {
      return r(l);
    }, n.callback = function() {
      Gi(e, t);
    };
  }
  var i = e.stateNode;
  return i !== null && typeof i.componentDidCatch == "function" && (n.callback = function() {
    Gi(e, t), typeof r != "function" && (xt === null ? xt = /* @__PURE__ */ new Set([this]) : xt.add(this));
    var s = t.stack;
    this.componentDidCatch(t.value, { componentStack: s !== null ? s : "" });
  }), n;
}
function Xo(e, t, n) {
  var r = e.pingCache;
  if (r === null) {
    r = e.pingCache = new Bd();
    var l = /* @__PURE__ */ new Set();
    r.set(t, l);
  } else l = r.get(t), l === void 0 && (l = /* @__PURE__ */ new Set(), r.set(t, l));
  l.has(n) || (l.add(n), e = ep.bind(null, e, t, n), t.then(e, e));
}
function bo(e) {
  do {
    var t;
    if ((t = e.tag === 13) && (t = e.memoizedState, t = t !== null ? t.dehydrated !== null : !0), t) return e;
    e = e.return;
  } while (e !== null);
  return null;
}
function Zo(e, t, n, r, l) {
  return e.mode & 1 ? (e.flags |= 65536, e.lanes = l, e) : (e === t ? e.flags |= 65536 : (e.flags |= 128, n.flags |= 131072, n.flags &= -52805, n.tag === 1 && (n.alternate === null ? n.tag = 17 : (t = et(-1, 1), t.tag = 2, yt(n, t, 1))), n.lanes |= 1), e);
}
var Ud = it.ReactCurrentOwner, me = !1;
function ce(e, t, n, r) {
  t.child = e === null ? Oa(t, null, n, r) : hn(t, e.child, n, r);
}
function Jo(e, t, n, r, l) {
  n = n.render;
  var i = t.ref;
  return an(t, l), r = Us(e, t, n, r, i, l), n = Hs(), e !== null && !me ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~l, lt(e, t, l)) : (A && n && zs(t), t.flags |= 1, ce(e, t, r, l), t.child);
}
function qo(e, t, n, r, l) {
  if (e === null) {
    var i = n.type;
    return typeof i == "function" && !Js(i) && i.defaultProps === void 0 && n.compare === null && n.defaultProps === void 0 ? (t.tag = 15, t.type = i, oc(e, t, i, r, l)) : (e = Kr(n.type, null, r, t, t.mode, l), e.ref = t.ref, e.return = t, t.child = e);
  }
  if (i = e.child, !(e.lanes & l)) {
    var s = i.memoizedProps;
    if (n = n.compare, n = n !== null ? n : tr, n(s, r) && e.ref === t.ref) return lt(e, t, l);
  }
  return t.flags |= 1, e = wt(i, r), e.ref = t.ref, e.return = t, t.child = e;
}
function oc(e, t, n, r, l) {
  if (e !== null) {
    var i = e.memoizedProps;
    if (tr(i, r) && e.ref === t.ref) if (me = !1, t.pendingProps = r = i, (e.lanes & l) !== 0) e.flags & 131072 && (me = !0);
    else return t.lanes = e.lanes, lt(e, t, l);
  }
  return Xi(e, t, n, r, l);
}
function uc(e, t, n) {
  var r = t.pendingProps, l = r.children, i = e !== null ? e.memoizedState : null;
  if (r.mode === "hidden") if (!(t.mode & 1)) t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, O(rn, xe), xe |= n;
  else {
    if (!(n & 1073741824)) return e = i !== null ? i.baseLanes | n : n, t.lanes = t.childLanes = 1073741824, t.memoizedState = { baseLanes: e, cachePool: null, transitions: null }, t.updateQueue = null, O(rn, xe), xe |= e, null;
    t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, r = i !== null ? i.baseLanes : n, O(rn, xe), xe |= r;
  }
  else i !== null ? (r = i.baseLanes | n, t.memoizedState = null) : r = n, O(rn, xe), xe |= r;
  return ce(e, t, l, n), t.child;
}
function ac(e, t) {
  var n = t.ref;
  (e === null && n !== null || e !== null && e.ref !== n) && (t.flags |= 512, t.flags |= 2097152);
}
function Xi(e, t, n, r, l) {
  var i = ve(n) ? It : ae.current;
  return i = dn(t, i), an(t, l), n = Us(e, t, n, r, i, l), r = Hs(), e !== null && !me ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~l, lt(e, t, l)) : (A && r && zs(t), t.flags |= 1, ce(e, t, n, l), t.child);
}
function eu(e, t, n, r, l) {
  if (ve(n)) {
    var i = !0;
    rl(t);
  } else i = !1;
  if (an(t, l), t.stateNode === null) Vr(e, t), lc(t, n, r), Yi(t, n, r, l), r = !0;
  else if (e === null) {
    var s = t.stateNode, o = t.memoizedProps;
    s.props = o;
    var u = s.context, a = n.contextType;
    typeof a == "object" && a !== null ? a = Me(a) : (a = ve(n) ? It : ae.current, a = dn(t, a));
    var h = n.getDerivedStateFromProps, m = typeof h == "function" || typeof s.getSnapshotBeforeUpdate == "function";
    m || typeof s.UNSAFE_componentWillReceiveProps != "function" && typeof s.componentWillReceiveProps != "function" || (o !== r || u !== a) && Go(t, s, r, a), ut = !1;
    var g = t.memoizedState;
    s.state = g, ul(t, r, s, l), u = t.memoizedState, o !== r || g !== u || ge.current || ut ? (typeof h == "function" && (Ki(t, n, h, r), u = t.memoizedState), (o = ut || Yo(t, n, o, r, g, u, a)) ? (m || typeof s.UNSAFE_componentWillMount != "function" && typeof s.componentWillMount != "function" || (typeof s.componentWillMount == "function" && s.componentWillMount(), typeof s.UNSAFE_componentWillMount == "function" && s.UNSAFE_componentWillMount()), typeof s.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof s.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = r, t.memoizedState = u), s.props = r, s.state = u, s.context = a, r = o) : (typeof s.componentDidMount == "function" && (t.flags |= 4194308), r = !1);
  } else {
    s = t.stateNode, Fa(e, t), o = t.memoizedProps, a = t.type === t.elementType ? o : Ie(t.type, o), s.props = a, m = t.pendingProps, g = s.context, u = n.contextType, typeof u == "object" && u !== null ? u = Me(u) : (u = ve(n) ? It : ae.current, u = dn(t, u));
    var k = n.getDerivedStateFromProps;
    (h = typeof k == "function" || typeof s.getSnapshotBeforeUpdate == "function") || typeof s.UNSAFE_componentWillReceiveProps != "function" && typeof s.componentWillReceiveProps != "function" || (o !== m || g !== u) && Go(t, s, r, u), ut = !1, g = t.memoizedState, s.state = g, ul(t, r, s, l);
    var w = t.memoizedState;
    o !== m || g !== w || ge.current || ut ? (typeof k == "function" && (Ki(t, n, k, r), w = t.memoizedState), (a = ut || Yo(t, n, a, r, g, w, u) || !1) ? (h || typeof s.UNSAFE_componentWillUpdate != "function" && typeof s.componentWillUpdate != "function" || (typeof s.componentWillUpdate == "function" && s.componentWillUpdate(r, w, u), typeof s.UNSAFE_componentWillUpdate == "function" && s.UNSAFE_componentWillUpdate(r, w, u)), typeof s.componentDidUpdate == "function" && (t.flags |= 4), typeof s.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof s.componentDidUpdate != "function" || o === e.memoizedProps && g === e.memoizedState || (t.flags |= 4), typeof s.getSnapshotBeforeUpdate != "function" || o === e.memoizedProps && g === e.memoizedState || (t.flags |= 1024), t.memoizedProps = r, t.memoizedState = w), s.props = r, s.state = w, s.context = u, r = a) : (typeof s.componentDidUpdate != "function" || o === e.memoizedProps && g === e.memoizedState || (t.flags |= 4), typeof s.getSnapshotBeforeUpdate != "function" || o === e.memoizedProps && g === e.memoizedState || (t.flags |= 1024), r = !1);
  }
  return bi(e, t, n, r, i, l);
}
function bi(e, t, n, r, l, i) {
  ac(e, t);
  var s = (t.flags & 128) !== 0;
  if (!r && !s) return l && $o(t, n, !1), lt(e, t, i);
  r = t.stateNode, Ud.current = t;
  var o = s && typeof n.getDerivedStateFromError != "function" ? null : r.render();
  return t.flags |= 1, e !== null && s ? (t.child = hn(t, e.child, null, i), t.child = hn(t, null, o, i)) : ce(e, t, o, i), t.memoizedState = r.state, l && $o(t, n, !0), t.child;
}
function cc(e) {
  var t = e.stateNode;
  t.pendingContext ? Ao(e, t.pendingContext, t.pendingContext !== t.context) : t.context && Ao(e, t.context, !1), Fs(e, t.containerInfo);
}
function tu(e, t, n, r, l) {
  return pn(), Ls(l), t.flags |= 256, ce(e, t, n, r), t.child;
}
var Zi = { dehydrated: null, treeContext: null, retryLane: 0 };
function Ji(e) {
  return { baseLanes: e, cachePool: null, transitions: null };
}
function fc(e, t, n) {
  var r = t.pendingProps, l = $.current, i = !1, s = (t.flags & 128) !== 0, o;
  if ((o = s) || (o = e !== null && e.memoizedState === null ? !1 : (l & 2) !== 0), o ? (i = !0, t.flags &= -129) : (e === null || e.memoizedState !== null) && (l |= 1), O($, l & 1), e === null)
    return Wi(t), e = t.memoizedState, e !== null && (e = e.dehydrated, e !== null) ? (t.mode & 1 ? e.data === "$!" ? t.lanes = 8 : t.lanes = 1073741824 : t.lanes = 1, null) : (s = r.children, e = r.fallback, i ? (r = t.mode, i = t.child, s = { mode: "hidden", children: s }, !(r & 1) && i !== null ? (i.childLanes = 0, i.pendingProps = s) : i = Tl(s, r, 0, null), e = Ot(e, r, n, null), i.return = t, e.return = t, i.sibling = e, t.child = i, t.child.memoizedState = Ji(n), t.memoizedState = Zi, e) : Qs(t, s));
  if (l = e.memoizedState, l !== null && (o = l.dehydrated, o !== null)) return Hd(e, t, s, r, o, l, n);
  if (i) {
    i = r.fallback, s = t.mode, l = e.child, o = l.sibling;
    var u = { mode: "hidden", children: r.children };
    return !(s & 1) && t.child !== l ? (r = t.child, r.childLanes = 0, r.pendingProps = u, t.deletions = null) : (r = wt(l, u), r.subtreeFlags = l.subtreeFlags & 14680064), o !== null ? i = wt(o, i) : (i = Ot(i, s, n, null), i.flags |= 2), i.return = t, r.return = t, r.sibling = i, t.child = r, r = i, i = t.child, s = e.child.memoizedState, s = s === null ? Ji(n) : { baseLanes: s.baseLanes | n, cachePool: null, transitions: s.transitions }, i.memoizedState = s, i.childLanes = e.childLanes & ~n, t.memoizedState = Zi, r;
  }
  return i = e.child, e = i.sibling, r = wt(i, { mode: "visible", children: r.children }), !(t.mode & 1) && (r.lanes = n), r.return = t, r.sibling = null, e !== null && (n = t.deletions, n === null ? (t.deletions = [e], t.flags |= 16) : n.push(e)), t.child = r, t.memoizedState = null, r;
}
function Qs(e, t) {
  return t = Tl({ mode: "visible", children: t }, e.mode, 0, null), t.return = e, e.child = t;
}
function Lr(e, t, n, r) {
  return r !== null && Ls(r), hn(t, e.child, null, n), e = Qs(t, t.pendingProps.children), e.flags |= 2, t.memoizedState = null, e;
}
function Hd(e, t, n, r, l, i, s) {
  if (n)
    return t.flags & 256 ? (t.flags &= -257, r = ui(Error(y(422))), Lr(e, t, s, r)) : t.memoizedState !== null ? (t.child = e.child, t.flags |= 128, null) : (i = r.fallback, l = t.mode, r = Tl({ mode: "visible", children: r.children }, l, 0, null), i = Ot(i, l, s, null), i.flags |= 2, r.return = t, i.return = t, r.sibling = i, t.child = r, t.mode & 1 && hn(t, e.child, null, s), t.child.memoizedState = Ji(s), t.memoizedState = Zi, i);
  if (!(t.mode & 1)) return Lr(e, t, s, null);
  if (l.data === "$!") {
    if (r = l.nextSibling && l.nextSibling.dataset, r) var o = r.dgst;
    return r = o, i = Error(y(419)), r = ui(i, r, void 0), Lr(e, t, s, r);
  }
  if (o = (s & e.childLanes) !== 0, me || o) {
    if (r = ne, r !== null) {
      switch (s & -s) {
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
      l = l & (r.suspendedLanes | s) ? 0 : l, l !== 0 && l !== i.retryLane && (i.retryLane = l, rt(e, l), Be(r, e, l, -1));
    }
    return Zs(), r = ui(Error(y(421))), Lr(e, t, s, r);
  }
  return l.data === "$?" ? (t.flags |= 128, t.child = e.child, t = tp.bind(null, e), l._reactRetry = t, null) : (e = i.treeContext, we = vt(l.nextSibling), Se = t, A = !0, Ae = null, e !== null && (Pe[ze++] = Je, Pe[ze++] = qe, Pe[ze++] = Ft, Je = e.id, qe = e.overflow, Ft = t), t = Qs(t, r.children), t.flags |= 4096, t);
}
function nu(e, t, n) {
  e.lanes |= t;
  var r = e.alternate;
  r !== null && (r.lanes |= t), Qi(e.return, t, n);
}
function ai(e, t, n, r, l) {
  var i = e.memoizedState;
  i === null ? e.memoizedState = { isBackwards: t, rendering: null, renderingStartTime: 0, last: r, tail: n, tailMode: l } : (i.isBackwards = t, i.rendering = null, i.renderingStartTime = 0, i.last = r, i.tail = n, i.tailMode = l);
}
function dc(e, t, n) {
  var r = t.pendingProps, l = r.revealOrder, i = r.tail;
  if (ce(e, t, r.children, n), r = $.current, r & 2) r = r & 1 | 2, t.flags |= 128;
  else {
    if (e !== null && e.flags & 128) e: for (e = t.child; e !== null; ) {
      if (e.tag === 13) e.memoizedState !== null && nu(e, n, t);
      else if (e.tag === 19) nu(e, n, t);
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
  if (O($, r), !(t.mode & 1)) t.memoizedState = null;
  else switch (l) {
    case "forwards":
      for (n = t.child, l = null; n !== null; ) e = n.alternate, e !== null && al(e) === null && (l = n), n = n.sibling;
      n = l, n === null ? (l = t.child, t.child = null) : (l = n.sibling, n.sibling = null), ai(t, !1, l, n, i);
      break;
    case "backwards":
      for (n = null, l = t.child, t.child = null; l !== null; ) {
        if (e = l.alternate, e !== null && al(e) === null) {
          t.child = l;
          break;
        }
        e = l.sibling, l.sibling = n, n = l, l = e;
      }
      ai(t, !0, n, null, i);
      break;
    case "together":
      ai(t, !1, null, null, void 0);
      break;
    default:
      t.memoizedState = null;
  }
  return t.child;
}
function Vr(e, t) {
  !(t.mode & 1) && e !== null && (e.alternate = null, t.alternate = null, t.flags |= 2);
}
function lt(e, t, n) {
  if (e !== null && (t.dependencies = e.dependencies), $t |= t.lanes, !(n & t.childLanes)) return null;
  if (e !== null && t.child !== e.child) throw Error(y(153));
  if (t.child !== null) {
    for (e = t.child, n = wt(e, e.pendingProps), t.child = n, n.return = t; e.sibling !== null; ) e = e.sibling, n = n.sibling = wt(e, e.pendingProps), n.return = t;
    n.sibling = null;
  }
  return t.child;
}
function Vd(e, t, n) {
  switch (t.tag) {
    case 3:
      cc(t), pn();
      break;
    case 5:
      Aa(t);
      break;
    case 1:
      ve(t.type) && rl(t);
      break;
    case 4:
      Fs(t, t.stateNode.containerInfo);
      break;
    case 10:
      var r = t.type._context, l = t.memoizedProps.value;
      O(sl, r._currentValue), r._currentValue = l;
      break;
    case 13:
      if (r = t.memoizedState, r !== null)
        return r.dehydrated !== null ? (O($, $.current & 1), t.flags |= 128, null) : n & t.child.childLanes ? fc(e, t, n) : (O($, $.current & 1), e = lt(e, t, n), e !== null ? e.sibling : null);
      O($, $.current & 1);
      break;
    case 19:
      if (r = (n & t.childLanes) !== 0, e.flags & 128) {
        if (r) return dc(e, t, n);
        t.flags |= 128;
      }
      if (l = t.memoizedState, l !== null && (l.rendering = null, l.tail = null, l.lastEffect = null), O($, $.current), r) break;
      return null;
    case 22:
    case 23:
      return t.lanes = 0, uc(e, t, n);
  }
  return lt(e, t, n);
}
var pc, qi, hc, mc;
pc = function(e, t) {
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
qi = function() {
};
hc = function(e, t, n, r) {
  var l = e.memoizedProps;
  if (l !== r) {
    e = t.stateNode, Rt(Ye.current);
    var i = null;
    switch (n) {
      case "input":
        l = wi(e, l), r = wi(e, r), i = [];
        break;
      case "select":
        l = U({}, l, { value: void 0 }), r = U({}, r, { value: void 0 }), i = [];
        break;
      case "textarea":
        l = Ei(e, l), r = Ei(e, r), i = [];
        break;
      default:
        typeof l.onClick != "function" && typeof r.onClick == "function" && (e.onclick = tl);
    }
    ji(n, r);
    var s;
    n = null;
    for (a in l) if (!r.hasOwnProperty(a) && l.hasOwnProperty(a) && l[a] != null) if (a === "style") {
      var o = l[a];
      for (s in o) o.hasOwnProperty(s) && (n || (n = {}), n[s] = "");
    } else a !== "dangerouslySetInnerHTML" && a !== "children" && a !== "suppressContentEditableWarning" && a !== "suppressHydrationWarning" && a !== "autoFocus" && (Gn.hasOwnProperty(a) ? i || (i = []) : (i = i || []).push(a, null));
    for (a in r) {
      var u = r[a];
      if (o = l?.[a], r.hasOwnProperty(a) && u !== o && (u != null || o != null)) if (a === "style") if (o) {
        for (s in o) !o.hasOwnProperty(s) || u && u.hasOwnProperty(s) || (n || (n = {}), n[s] = "");
        for (s in u) u.hasOwnProperty(s) && o[s] !== u[s] && (n || (n = {}), n[s] = u[s]);
      } else n || (i || (i = []), i.push(
        a,
        n
      )), n = u;
      else a === "dangerouslySetInnerHTML" ? (u = u ? u.__html : void 0, o = o ? o.__html : void 0, u != null && o !== u && (i = i || []).push(a, u)) : a === "children" ? typeof u != "string" && typeof u != "number" || (i = i || []).push(a, "" + u) : a !== "suppressContentEditableWarning" && a !== "suppressHydrationWarning" && (Gn.hasOwnProperty(a) ? (u != null && a === "onScroll" && I("scroll", e), i || o === u || (i = [])) : (i = i || []).push(a, u));
    }
    n && (i = i || []).push("style", n);
    var a = i;
    (t.updateQueue = a) && (t.flags |= 4);
  }
};
mc = function(e, t, n, r) {
  n !== r && (t.flags |= 4);
};
function Tn(e, t) {
  if (!A) switch (e.tailMode) {
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
function Wd(e, t, n) {
  var r = t.pendingProps;
  switch (Ts(t), t.tag) {
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
      return ve(t.type) && nl(), oe(t), null;
    case 3:
      return r = t.stateNode, mn(), F(ge), F(ae), $s(), r.pendingContext && (r.context = r.pendingContext, r.pendingContext = null), (e === null || e.child === null) && (zr(t) ? t.flags |= 4 : e === null || e.memoizedState.isDehydrated && !(t.flags & 256) || (t.flags |= 1024, Ae !== null && (os(Ae), Ae = null))), qi(e, t), oe(t), null;
    case 5:
      As(t);
      var l = Rt(sr.current);
      if (n = t.type, e !== null && t.stateNode != null) hc(e, t, n, r, l), e.ref !== t.ref && (t.flags |= 512, t.flags |= 2097152);
      else {
        if (!r) {
          if (t.stateNode === null) throw Error(y(166));
          return oe(t), null;
        }
        if (e = Rt(Ye.current), zr(t)) {
          r = t.stateNode, n = t.type;
          var i = t.memoizedProps;
          switch (r[Qe] = t, r[lr] = i, e = (t.mode & 1) !== 0, n) {
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
              for (l = 0; l < In.length; l++) I(In[l], r);
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
              co(r, i), I("invalid", r);
              break;
            case "select":
              r._wrapperState = { wasMultiple: !!i.multiple }, I("invalid", r);
              break;
            case "textarea":
              po(r, i), I("invalid", r);
          }
          ji(n, i), l = null;
          for (var s in i) if (i.hasOwnProperty(s)) {
            var o = i[s];
            s === "children" ? typeof o == "string" ? r.textContent !== o && (i.suppressHydrationWarning !== !0 && Pr(r.textContent, o, e), l = ["children", o]) : typeof o == "number" && r.textContent !== "" + o && (i.suppressHydrationWarning !== !0 && Pr(
              r.textContent,
              o,
              e
            ), l = ["children", "" + o]) : Gn.hasOwnProperty(s) && o != null && s === "onScroll" && I("scroll", r);
          }
          switch (n) {
            case "input":
              kr(r), fo(r, i, !0);
              break;
            case "textarea":
              kr(r), ho(r);
              break;
            case "select":
            case "option":
              break;
            default:
              typeof i.onClick == "function" && (r.onclick = tl);
          }
          r = l, t.updateQueue = r, r !== null && (t.flags |= 4);
        } else {
          s = l.nodeType === 9 ? l : l.ownerDocument, e === "http://www.w3.org/1999/xhtml" && (e = Vu(n)), e === "http://www.w3.org/1999/xhtml" ? n === "script" ? (e = s.createElement("div"), e.innerHTML = "<script><\/script>", e = e.removeChild(e.firstChild)) : typeof r.is == "string" ? e = s.createElement(n, { is: r.is }) : (e = s.createElement(n), n === "select" && (s = e, r.multiple ? s.multiple = !0 : r.size && (s.size = r.size))) : e = s.createElementNS(e, n), e[Qe] = t, e[lr] = r, pc(e, t, !1, !1), t.stateNode = e;
          e: {
            switch (s = _i(n, r), n) {
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
                for (l = 0; l < In.length; l++) I(In[l], e);
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
                co(e, r), l = wi(e, r), I("invalid", e);
                break;
              case "option":
                l = r;
                break;
              case "select":
                e._wrapperState = { wasMultiple: !!r.multiple }, l = U({}, r, { value: void 0 }), I("invalid", e);
                break;
              case "textarea":
                po(e, r), l = Ei(e, r), I("invalid", e);
                break;
              default:
                l = r;
            }
            ji(n, l), o = l;
            for (i in o) if (o.hasOwnProperty(i)) {
              var u = o[i];
              i === "style" ? Ku(e, u) : i === "dangerouslySetInnerHTML" ? (u = u ? u.__html : void 0, u != null && Wu(e, u)) : i === "children" ? typeof u == "string" ? (n !== "textarea" || u !== "") && Xn(e, u) : typeof u == "number" && Xn(e, "" + u) : i !== "suppressContentEditableWarning" && i !== "suppressHydrationWarning" && i !== "autoFocus" && (Gn.hasOwnProperty(i) ? u != null && i === "onScroll" && I("scroll", e) : u != null && ms(e, i, u, s));
            }
            switch (n) {
              case "input":
                kr(e), fo(e, r, !1);
                break;
              case "textarea":
                kr(e), ho(e);
                break;
              case "option":
                r.value != null && e.setAttribute("value", "" + St(r.value));
                break;
              case "select":
                e.multiple = !!r.multiple, i = r.value, i != null ? ln(e, !!r.multiple, i, !1) : r.defaultValue != null && ln(
                  e,
                  !!r.multiple,
                  r.defaultValue,
                  !0
                );
                break;
              default:
                typeof l.onClick == "function" && (e.onclick = tl);
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
      if (e && t.stateNode != null) mc(e, t, e.memoizedProps, r);
      else {
        if (typeof r != "string" && t.stateNode === null) throw Error(y(166));
        if (n = Rt(sr.current), Rt(Ye.current), zr(t)) {
          if (r = t.stateNode, n = t.memoizedProps, r[Qe] = t, (i = r.nodeValue !== n) && (e = Se, e !== null)) switch (e.tag) {
            case 3:
              Pr(r.nodeValue, n, (e.mode & 1) !== 0);
              break;
            case 5:
              e.memoizedProps.suppressHydrationWarning !== !0 && Pr(r.nodeValue, n, (e.mode & 1) !== 0);
          }
          i && (t.flags |= 4);
        } else r = (n.nodeType === 9 ? n : n.ownerDocument).createTextNode(r), r[Qe] = t, t.stateNode = r;
      }
      return oe(t), null;
    case 13:
      if (F($), r = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
        if (A && we !== null && t.mode & 1 && !(t.flags & 128)) Ra(), pn(), t.flags |= 98560, i = !1;
        else if (i = zr(t), r !== null && r.dehydrated !== null) {
          if (e === null) {
            if (!i) throw Error(y(318));
            if (i = t.memoizedState, i = i !== null ? i.dehydrated : null, !i) throw Error(y(317));
            i[Qe] = t;
          } else pn(), !(t.flags & 128) && (t.memoizedState = null), t.flags |= 4;
          oe(t), i = !1;
        } else Ae !== null && (os(Ae), Ae = null), i = !0;
        if (!i) return t.flags & 65536 ? t : null;
      }
      return t.flags & 128 ? (t.lanes = n, t) : (r = r !== null, r !== (e !== null && e.memoizedState !== null) && r && (t.child.flags |= 8192, t.mode & 1 && (e === null || $.current & 1 ? Z === 0 && (Z = 3) : Zs())), t.updateQueue !== null && (t.flags |= 4), oe(t), null);
    case 4:
      return mn(), qi(e, t), e === null && nr(t.stateNode.containerInfo), oe(t), null;
    case 10:
      return Ds(t.type._context), oe(t), null;
    case 17:
      return ve(t.type) && nl(), oe(t), null;
    case 19:
      if (F($), i = t.memoizedState, i === null) return oe(t), null;
      if (r = (t.flags & 128) !== 0, s = i.rendering, s === null) if (r) Tn(i, !1);
      else {
        if (Z !== 0 || e !== null && e.flags & 128) for (e = t.child; e !== null; ) {
          if (s = al(e), s !== null) {
            for (t.flags |= 128, Tn(i, !1), r = s.updateQueue, r !== null && (t.updateQueue = r, t.flags |= 4), t.subtreeFlags = 0, r = n, n = t.child; n !== null; ) i = n, e = r, i.flags &= 14680066, s = i.alternate, s === null ? (i.childLanes = 0, i.lanes = e, i.child = null, i.subtreeFlags = 0, i.memoizedProps = null, i.memoizedState = null, i.updateQueue = null, i.dependencies = null, i.stateNode = null) : (i.childLanes = s.childLanes, i.lanes = s.lanes, i.child = s.child, i.subtreeFlags = 0, i.deletions = null, i.memoizedProps = s.memoizedProps, i.memoizedState = s.memoizedState, i.updateQueue = s.updateQueue, i.type = s.type, e = s.dependencies, i.dependencies = e === null ? null : { lanes: e.lanes, firstContext: e.firstContext }), n = n.sibling;
            return O($, $.current & 1 | 2), t.child;
          }
          e = e.sibling;
        }
        i.tail !== null && Y() > vn && (t.flags |= 128, r = !0, Tn(i, !1), t.lanes = 4194304);
      }
      else {
        if (!r) if (e = al(s), e !== null) {
          if (t.flags |= 128, r = !0, n = e.updateQueue, n !== null && (t.updateQueue = n, t.flags |= 4), Tn(i, !0), i.tail === null && i.tailMode === "hidden" && !s.alternate && !A) return oe(t), null;
        } else 2 * Y() - i.renderingStartTime > vn && n !== 1073741824 && (t.flags |= 128, r = !0, Tn(i, !1), t.lanes = 4194304);
        i.isBackwards ? (s.sibling = t.child, t.child = s) : (n = i.last, n !== null ? n.sibling = s : t.child = s, i.last = s);
      }
      return i.tail !== null ? (t = i.tail, i.rendering = t, i.tail = t.sibling, i.renderingStartTime = Y(), t.sibling = null, n = $.current, O($, r ? n & 1 | 2 : n & 1), t) : (oe(t), null);
    case 22:
    case 23:
      return bs(), r = t.memoizedState !== null, e !== null && e.memoizedState !== null !== r && (t.flags |= 8192), r && t.mode & 1 ? xe & 1073741824 && (oe(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : oe(t), null;
    case 24:
      return null;
    case 25:
      return null;
  }
  throw Error(y(156, t.tag));
}
function Qd(e, t) {
  switch (Ts(t), t.tag) {
    case 1:
      return ve(t.type) && nl(), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
    case 3:
      return mn(), F(ge), F(ae), $s(), e = t.flags, e & 65536 && !(e & 128) ? (t.flags = e & -65537 | 128, t) : null;
    case 5:
      return As(t), null;
    case 13:
      if (F($), e = t.memoizedState, e !== null && e.dehydrated !== null) {
        if (t.alternate === null) throw Error(y(340));
        pn();
      }
      return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
    case 19:
      return F($), null;
    case 4:
      return mn(), null;
    case 10:
      return Ds(t.type._context), null;
    case 22:
    case 23:
      return bs(), null;
    case 24:
      return null;
    default:
      return null;
  }
}
var Mr = !1, ue = !1, Kd = typeof WeakSet == "function" ? WeakSet : Set, S = null;
function nn(e, t) {
  var n = e.ref;
  if (n !== null) if (typeof n == "function") try {
    n(null);
  } catch (r) {
    H(e, t, r);
  }
  else n.current = null;
}
function es(e, t, n) {
  try {
    n();
  } catch (r) {
    H(e, t, r);
  }
}
var ru = !1;
function Yd(e, t) {
  if (Fi = Jr, e = ka(), Ps(e)) {
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
        var s = 0, o = -1, u = -1, a = 0, h = 0, m = e, g = null;
        t: for (; ; ) {
          for (var k; m !== n || l !== 0 && m.nodeType !== 3 || (o = s + l), m !== i || r !== 0 && m.nodeType !== 3 || (u = s + r), m.nodeType === 3 && (s += m.nodeValue.length), (k = m.firstChild) !== null; )
            g = m, m = k;
          for (; ; ) {
            if (m === e) break t;
            if (g === n && ++a === l && (o = s), g === i && ++h === r && (u = s), (k = m.nextSibling) !== null) break;
            m = g, g = m.parentNode;
          }
          m = k;
        }
        n = o === -1 || u === -1 ? null : { start: o, end: u };
      } else n = null;
    }
    n = n || { start: 0, end: 0 };
  } else n = null;
  for (Ai = { focusedElem: e, selectionRange: n }, Jr = !1, S = t; S !== null; ) if (t = S, e = t.child, (t.subtreeFlags & 1028) !== 0 && e !== null) e.return = t, S = e;
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
            var x = w.memoizedProps, R = w.memoizedState, d = t.stateNode, f = d.getSnapshotBeforeUpdate(t.elementType === t.type ? x : Ie(t.type, x), R);
            d.__reactInternalSnapshotBeforeUpdate = f;
          }
          break;
        case 3:
          var p = t.stateNode.containerInfo;
          p.nodeType === 1 ? p.textContent = "" : p.nodeType === 9 && p.documentElement && p.removeChild(p.documentElement);
          break;
        case 5:
        case 6:
        case 4:
        case 17:
          break;
        default:
          throw Error(y(163));
      }
    } catch (v) {
      H(t, t.return, v);
    }
    if (e = t.sibling, e !== null) {
      e.return = t.return, S = e;
      break;
    }
    S = t.return;
  }
  return w = ru, ru = !1, w;
}
function Qn(e, t, n) {
  var r = t.updateQueue;
  if (r = r !== null ? r.lastEffect : null, r !== null) {
    var l = r = r.next;
    do {
      if ((l.tag & e) === e) {
        var i = l.destroy;
        l.destroy = void 0, i !== void 0 && es(t, n, i);
      }
      l = l.next;
    } while (l !== r);
  }
}
function Pl(e, t) {
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
function ts(e) {
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
function gc(e) {
  var t = e.alternate;
  t !== null && (e.alternate = null, gc(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && (delete t[Qe], delete t[lr], delete t[Ui], delete t[zd], delete t[Td])), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
}
function vc(e) {
  return e.tag === 5 || e.tag === 3 || e.tag === 4;
}
function lu(e) {
  e: for (; ; ) {
    for (; e.sibling === null; ) {
      if (e.return === null || vc(e.return)) return null;
      e = e.return;
    }
    for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
      if (e.flags & 2 || e.child === null || e.tag === 4) continue e;
      e.child.return = e, e = e.child;
    }
    if (!(e.flags & 2)) return e.stateNode;
  }
}
function ns(e, t, n) {
  var r = e.tag;
  if (r === 5 || r === 6) e = e.stateNode, t ? n.nodeType === 8 ? n.parentNode.insertBefore(e, t) : n.insertBefore(e, t) : (n.nodeType === 8 ? (t = n.parentNode, t.insertBefore(e, n)) : (t = n, t.appendChild(e)), n = n._reactRootContainer, n != null || t.onclick !== null || (t.onclick = tl));
  else if (r !== 4 && (e = e.child, e !== null)) for (ns(e, t, n), e = e.sibling; e !== null; ) ns(e, t, n), e = e.sibling;
}
function rs(e, t, n) {
  var r = e.tag;
  if (r === 5 || r === 6) e = e.stateNode, t ? n.insertBefore(e, t) : n.appendChild(e);
  else if (r !== 4 && (e = e.child, e !== null)) for (rs(e, t, n), e = e.sibling; e !== null; ) rs(e, t, n), e = e.sibling;
}
var re = null, Fe = !1;
function st(e, t, n) {
  for (n = n.child; n !== null; ) yc(e, t, n), n = n.sibling;
}
function yc(e, t, n) {
  if (Ke && typeof Ke.onCommitFiberUnmount == "function") try {
    Ke.onCommitFiberUnmount(kl, n);
  } catch {
  }
  switch (n.tag) {
    case 5:
      ue || nn(n, t);
    case 6:
      var r = re, l = Fe;
      re = null, st(e, t, n), re = r, Fe = l, re !== null && (Fe ? (e = re, n = n.stateNode, e.nodeType === 8 ? e.parentNode.removeChild(n) : e.removeChild(n)) : re.removeChild(n.stateNode));
      break;
    case 18:
      re !== null && (Fe ? (e = re, n = n.stateNode, e.nodeType === 8 ? ni(e.parentNode, n) : e.nodeType === 1 && ni(e, n), qn(e)) : ni(re, n.stateNode));
      break;
    case 4:
      r = re, l = Fe, re = n.stateNode.containerInfo, Fe = !0, st(e, t, n), re = r, Fe = l;
      break;
    case 0:
    case 11:
    case 14:
    case 15:
      if (!ue && (r = n.updateQueue, r !== null && (r = r.lastEffect, r !== null))) {
        l = r = r.next;
        do {
          var i = l, s = i.destroy;
          i = i.tag, s !== void 0 && (i & 2 || i & 4) && es(n, t, s), l = l.next;
        } while (l !== r);
      }
      st(e, t, n);
      break;
    case 1:
      if (!ue && (nn(n, t), r = n.stateNode, typeof r.componentWillUnmount == "function")) try {
        r.props = n.memoizedProps, r.state = n.memoizedState, r.componentWillUnmount();
      } catch (o) {
        H(n, t, o);
      }
      st(e, t, n);
      break;
    case 21:
      st(e, t, n);
      break;
    case 22:
      n.mode & 1 ? (ue = (r = ue) || n.memoizedState !== null, st(e, t, n), ue = r) : st(e, t, n);
      break;
    default:
      st(e, t, n);
  }
}
function iu(e) {
  var t = e.updateQueue;
  if (t !== null) {
    e.updateQueue = null;
    var n = e.stateNode;
    n === null && (n = e.stateNode = new Kd()), t.forEach(function(r) {
      var l = np.bind(null, e, r);
      n.has(r) || (n.add(r), r.then(l, l));
    });
  }
}
function Oe(e, t) {
  var n = t.deletions;
  if (n !== null) for (var r = 0; r < n.length; r++) {
    var l = n[r];
    try {
      var i = e, s = t, o = s;
      e: for (; o !== null; ) {
        switch (o.tag) {
          case 5:
            re = o.stateNode, Fe = !1;
            break e;
          case 3:
            re = o.stateNode.containerInfo, Fe = !0;
            break e;
          case 4:
            re = o.stateNode.containerInfo, Fe = !0;
            break e;
        }
        o = o.return;
      }
      if (re === null) throw Error(y(160));
      yc(i, s, l), re = null, Fe = !1;
      var u = l.alternate;
      u !== null && (u.return = null), l.return = null;
    } catch (a) {
      H(l, t, a);
    }
  }
  if (t.subtreeFlags & 12854) for (t = t.child; t !== null; ) xc(t, e), t = t.sibling;
}
function xc(e, t) {
  var n = e.alternate, r = e.flags;
  switch (e.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
      if (Oe(t, e), He(e), r & 4) {
        try {
          Qn(3, e, e.return), Pl(3, e);
        } catch (x) {
          H(e, e.return, x);
        }
        try {
          Qn(5, e, e.return);
        } catch (x) {
          H(e, e.return, x);
        }
      }
      break;
    case 1:
      Oe(t, e), He(e), r & 512 && n !== null && nn(n, n.return);
      break;
    case 5:
      if (Oe(t, e), He(e), r & 512 && n !== null && nn(n, n.return), e.flags & 32) {
        var l = e.stateNode;
        try {
          Xn(l, "");
        } catch (x) {
          H(e, e.return, x);
        }
      }
      if (r & 4 && (l = e.stateNode, l != null)) {
        var i = e.memoizedProps, s = n !== null ? n.memoizedProps : i, o = e.type, u = e.updateQueue;
        if (e.updateQueue = null, u !== null) try {
          o === "input" && i.type === "radio" && i.name != null && Uu(l, i), _i(o, s);
          var a = _i(o, i);
          for (s = 0; s < u.length; s += 2) {
            var h = u[s], m = u[s + 1];
            h === "style" ? Ku(l, m) : h === "dangerouslySetInnerHTML" ? Wu(l, m) : h === "children" ? Xn(l, m) : ms(l, h, m, a);
          }
          switch (o) {
            case "input":
              Si(l, i);
              break;
            case "textarea":
              Hu(l, i);
              break;
            case "select":
              var g = l._wrapperState.wasMultiple;
              l._wrapperState.wasMultiple = !!i.multiple;
              var k = i.value;
              k != null ? ln(l, !!i.multiple, k, !1) : g !== !!i.multiple && (i.defaultValue != null ? ln(
                l,
                !!i.multiple,
                i.defaultValue,
                !0
              ) : ln(l, !!i.multiple, i.multiple ? [] : "", !1));
          }
          l[lr] = i;
        } catch (x) {
          H(e, e.return, x);
        }
      }
      break;
    case 6:
      if (Oe(t, e), He(e), r & 4) {
        if (e.stateNode === null) throw Error(y(162));
        l = e.stateNode, i = e.memoizedProps;
        try {
          l.nodeValue = i;
        } catch (x) {
          H(e, e.return, x);
        }
      }
      break;
    case 3:
      if (Oe(t, e), He(e), r & 4 && n !== null && n.memoizedState.isDehydrated) try {
        qn(t.containerInfo);
      } catch (x) {
        H(e, e.return, x);
      }
      break;
    case 4:
      Oe(t, e), He(e);
      break;
    case 13:
      Oe(t, e), He(e), l = e.child, l.flags & 8192 && (i = l.memoizedState !== null, l.stateNode.isHidden = i, !i || l.alternate !== null && l.alternate.memoizedState !== null || (Gs = Y())), r & 4 && iu(e);
      break;
    case 22:
      if (h = n !== null && n.memoizedState !== null, e.mode & 1 ? (ue = (a = ue) || h, Oe(t, e), ue = a) : Oe(t, e), He(e), r & 8192) {
        if (a = e.memoizedState !== null, (e.stateNode.isHidden = a) && !h && e.mode & 1) for (S = e, h = e.child; h !== null; ) {
          for (m = S = h; S !== null; ) {
            switch (g = S, k = g.child, g.tag) {
              case 0:
              case 11:
              case 14:
              case 15:
                Qn(4, g, g.return);
                break;
              case 1:
                nn(g, g.return);
                var w = g.stateNode;
                if (typeof w.componentWillUnmount == "function") {
                  r = g, n = g.return;
                  try {
                    t = r, w.props = t.memoizedProps, w.state = t.memoizedState, w.componentWillUnmount();
                  } catch (x) {
                    H(r, n, x);
                  }
                }
                break;
              case 5:
                nn(g, g.return);
                break;
              case 22:
                if (g.memoizedState !== null) {
                  ou(m);
                  continue;
                }
            }
            k !== null ? (k.return = g, S = k) : ou(m);
          }
          h = h.sibling;
        }
        e: for (h = null, m = e; ; ) {
          if (m.tag === 5) {
            if (h === null) {
              h = m;
              try {
                l = m.stateNode, a ? (i = l.style, typeof i.setProperty == "function" ? i.setProperty("display", "none", "important") : i.display = "none") : (o = m.stateNode, u = m.memoizedProps.style, s = u != null && u.hasOwnProperty("display") ? u.display : null, o.style.display = Qu("display", s));
              } catch (x) {
                H(e, e.return, x);
              }
            }
          } else if (m.tag === 6) {
            if (h === null) try {
              m.stateNode.nodeValue = a ? "" : m.memoizedProps;
            } catch (x) {
              H(e, e.return, x);
            }
          } else if ((m.tag !== 22 && m.tag !== 23 || m.memoizedState === null || m === e) && m.child !== null) {
            m.child.return = m, m = m.child;
            continue;
          }
          if (m === e) break e;
          for (; m.sibling === null; ) {
            if (m.return === null || m.return === e) break e;
            h === m && (h = null), m = m.return;
          }
          h === m && (h = null), m.sibling.return = m.return, m = m.sibling;
        }
      }
      break;
    case 19:
      Oe(t, e), He(e), r & 4 && iu(e);
      break;
    case 21:
      break;
    default:
      Oe(
        t,
        e
      ), He(e);
  }
}
function He(e) {
  var t = e.flags;
  if (t & 2) {
    try {
      e: {
        for (var n = e.return; n !== null; ) {
          if (vc(n)) {
            var r = n;
            break e;
          }
          n = n.return;
        }
        throw Error(y(160));
      }
      switch (r.tag) {
        case 5:
          var l = r.stateNode;
          r.flags & 32 && (Xn(l, ""), r.flags &= -33);
          var i = lu(e);
          rs(e, i, l);
          break;
        case 3:
        case 4:
          var s = r.stateNode.containerInfo, o = lu(e);
          ns(e, o, s);
          break;
        default:
          throw Error(y(161));
      }
    } catch (u) {
      H(e, e.return, u);
    }
    e.flags &= -3;
  }
  t & 4096 && (e.flags &= -4097);
}
function Gd(e, t, n) {
  S = e, kc(e);
}
function kc(e, t, n) {
  for (var r = (e.mode & 1) !== 0; S !== null; ) {
    var l = S, i = l.child;
    if (l.tag === 22 && r) {
      var s = l.memoizedState !== null || Mr;
      if (!s) {
        var o = l.alternate, u = o !== null && o.memoizedState !== null || ue;
        o = Mr;
        var a = ue;
        if (Mr = s, (ue = u) && !a) for (S = l; S !== null; ) s = S, u = s.child, s.tag === 22 && s.memoizedState !== null ? uu(l) : u !== null ? (u.return = s, S = u) : uu(l);
        for (; i !== null; ) S = i, kc(i), i = i.sibling;
        S = l, Mr = o, ue = a;
      }
      su(e);
    } else l.subtreeFlags & 8772 && i !== null ? (i.return = l, S = i) : su(e);
  }
}
function su(e) {
  for (; S !== null; ) {
    var t = S;
    if (t.flags & 8772) {
      var n = t.alternate;
      try {
        if (t.flags & 8772) switch (t.tag) {
          case 0:
          case 11:
          case 15:
            ue || Pl(5, t);
            break;
          case 1:
            var r = t.stateNode;
            if (t.flags & 4 && !ue) if (n === null) r.componentDidMount();
            else {
              var l = t.elementType === t.type ? n.memoizedProps : Ie(t.type, n.memoizedProps);
              r.componentDidUpdate(l, n.memoizedState, r.__reactInternalSnapshotBeforeUpdate);
            }
            var i = t.updateQueue;
            i !== null && Wo(t, i, r);
            break;
          case 3:
            var s = t.updateQueue;
            if (s !== null) {
              if (n = null, t.child !== null) switch (t.child.tag) {
                case 5:
                  n = t.child.stateNode;
                  break;
                case 1:
                  n = t.child.stateNode;
              }
              Wo(t, s, n);
            }
            break;
          case 5:
            var o = t.stateNode;
            if (n === null && t.flags & 4) {
              n = o;
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
              var a = t.alternate;
              if (a !== null) {
                var h = a.memoizedState;
                if (h !== null) {
                  var m = h.dehydrated;
                  m !== null && qn(m);
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
            throw Error(y(163));
        }
        ue || t.flags & 512 && ts(t);
      } catch (g) {
        H(t, t.return, g);
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
function ou(e) {
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
function uu(e) {
  for (; S !== null; ) {
    var t = S;
    try {
      switch (t.tag) {
        case 0:
        case 11:
        case 15:
          var n = t.return;
          try {
            Pl(4, t);
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
            ts(t);
          } catch (u) {
            H(t, i, u);
          }
          break;
        case 5:
          var s = t.return;
          try {
            ts(t);
          } catch (u) {
            H(t, s, u);
          }
      }
    } catch (u) {
      H(t, t.return, u);
    }
    if (t === e) {
      S = null;
      break;
    }
    var o = t.sibling;
    if (o !== null) {
      o.return = t.return, S = o;
      break;
    }
    S = t.return;
  }
}
var Xd = Math.ceil, dl = it.ReactCurrentDispatcher, Ks = it.ReactCurrentOwner, Le = it.ReactCurrentBatchConfig, M = 0, ne = null, G = null, le = 0, xe = 0, rn = Nt(0), Z = 0, cr = null, $t = 0, zl = 0, Ys = 0, Kn = null, he = null, Gs = 0, vn = 1 / 0, Xe = null, pl = !1, ls = null, xt = null, Rr = !1, pt = null, hl = 0, Yn = 0, is = null, Wr = -1, Qr = 0;
function fe() {
  return M & 6 ? Y() : Wr !== -1 ? Wr : Wr = Y();
}
function kt(e) {
  return e.mode & 1 ? M & 2 && le !== 0 ? le & -le : Md.transition !== null ? (Qr === 0 && (Qr = la()), Qr) : (e = D, e !== 0 || (e = window.event, e = e === void 0 ? 16 : fa(e.type)), e) : 1;
}
function Be(e, t, n, r) {
  if (50 < Yn) throw Yn = 0, is = null, Error(y(185));
  dr(e, n, r), (!(M & 2) || e !== ne) && (e === ne && (!(M & 2) && (zl |= n), Z === 4 && ft(e, le)), ye(e, r), n === 1 && M === 0 && !(t.mode & 1) && (vn = Y() + 500, Nl && jt()));
}
function ye(e, t) {
  var n = e.callbackNode;
  Mf(e, t);
  var r = Zr(e, e === ne ? le : 0);
  if (r === 0) n !== null && vo(n), e.callbackNode = null, e.callbackPriority = 0;
  else if (t = r & -r, e.callbackPriority !== t) {
    if (n != null && vo(n), t === 1) e.tag === 0 ? Ld(au.bind(null, e)) : Ta(au.bind(null, e)), _d(function() {
      !(M & 6) && jt();
    }), n = null;
    else {
      switch (ia(r)) {
        case 1:
          n = ks;
          break;
        case 4:
          n = na;
          break;
        case 16:
          n = br;
          break;
        case 536870912:
          n = ra;
          break;
        default:
          n = br;
      }
      n = Pc(n, wc.bind(null, e));
    }
    e.callbackPriority = t, e.callbackNode = n;
  }
}
function wc(e, t) {
  if (Wr = -1, Qr = 0, M & 6) throw Error(y(327));
  var n = e.callbackNode;
  if (cn() && e.callbackNode !== n) return null;
  var r = Zr(e, e === ne ? le : 0);
  if (r === 0) return null;
  if (r & 30 || r & e.expiredLanes || t) t = ml(e, r);
  else {
    t = r;
    var l = M;
    M |= 2;
    var i = Cc();
    (ne !== e || le !== t) && (Xe = null, vn = Y() + 500, Dt(e, t));
    do
      try {
        Jd();
        break;
      } catch (o) {
        Sc(e, o);
      }
    while (!0);
    Rs(), dl.current = i, M = l, G !== null ? t = 0 : (ne = null, le = 0, t = Z);
  }
  if (t !== 0) {
    if (t === 2 && (l = Mi(e), l !== 0 && (r = l, t = ss(e, l))), t === 1) throw n = cr, Dt(e, 0), ft(e, r), ye(e, Y()), n;
    if (t === 6) ft(e, r);
    else {
      if (l = e.current.alternate, !(r & 30) && !bd(l) && (t = ml(e, r), t === 2 && (i = Mi(e), i !== 0 && (r = i, t = ss(e, i))), t === 1)) throw n = cr, Dt(e, 0), ft(e, r), ye(e, Y()), n;
      switch (e.finishedWork = l, e.finishedLanes = r, t) {
        case 0:
        case 1:
          throw Error(y(345));
        case 2:
          Tt(e, he, Xe);
          break;
        case 3:
          if (ft(e, r), (r & 130023424) === r && (t = Gs + 500 - Y(), 10 < t)) {
            if (Zr(e, 0) !== 0) break;
            if (l = e.suspendedLanes, (l & r) !== r) {
              fe(), e.pingedLanes |= e.suspendedLanes & l;
              break;
            }
            e.timeoutHandle = Bi(Tt.bind(null, e, he, Xe), t);
            break;
          }
          Tt(e, he, Xe);
          break;
        case 4:
          if (ft(e, r), (r & 4194240) === r) break;
          for (t = e.eventTimes, l = -1; 0 < r; ) {
            var s = 31 - $e(r);
            i = 1 << s, s = t[s], s > l && (l = s), r &= ~i;
          }
          if (r = l, r = Y() - r, r = (120 > r ? 120 : 480 > r ? 480 : 1080 > r ? 1080 : 1920 > r ? 1920 : 3e3 > r ? 3e3 : 4320 > r ? 4320 : 1960 * Xd(r / 1960)) - r, 10 < r) {
            e.timeoutHandle = Bi(Tt.bind(null, e, he, Xe), r);
            break;
          }
          Tt(e, he, Xe);
          break;
        case 5:
          Tt(e, he, Xe);
          break;
        default:
          throw Error(y(329));
      }
    }
  }
  return ye(e, Y()), e.callbackNode === n ? wc.bind(null, e) : null;
}
function ss(e, t) {
  var n = Kn;
  return e.current.memoizedState.isDehydrated && (Dt(e, t).flags |= 256), e = ml(e, t), e !== 2 && (t = he, he = n, t !== null && os(t)), e;
}
function os(e) {
  he === null ? he = e : he.push.apply(he, e);
}
function bd(e) {
  for (var t = e; ; ) {
    if (t.flags & 16384) {
      var n = t.updateQueue;
      if (n !== null && (n = n.stores, n !== null)) for (var r = 0; r < n.length; r++) {
        var l = n[r], i = l.getSnapshot;
        l = l.value;
        try {
          if (!Ue(i(), l)) return !1;
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
function ft(e, t) {
  for (t &= ~Ys, t &= ~zl, e.suspendedLanes |= t, e.pingedLanes &= ~t, e = e.expirationTimes; 0 < t; ) {
    var n = 31 - $e(t), r = 1 << n;
    e[n] = -1, t &= ~r;
  }
}
function au(e) {
  if (M & 6) throw Error(y(327));
  cn();
  var t = Zr(e, 0);
  if (!(t & 1)) return ye(e, Y()), null;
  var n = ml(e, t);
  if (e.tag !== 0 && n === 2) {
    var r = Mi(e);
    r !== 0 && (t = r, n = ss(e, r));
  }
  if (n === 1) throw n = cr, Dt(e, 0), ft(e, t), ye(e, Y()), n;
  if (n === 6) throw Error(y(345));
  return e.finishedWork = e.current.alternate, e.finishedLanes = t, Tt(e, he, Xe), ye(e, Y()), null;
}
function Xs(e, t) {
  var n = M;
  M |= 1;
  try {
    return e(t);
  } finally {
    M = n, M === 0 && (vn = Y() + 500, Nl && jt());
  }
}
function Bt(e) {
  pt !== null && pt.tag === 0 && !(M & 6) && cn();
  var t = M;
  M |= 1;
  var n = Le.transition, r = D;
  try {
    if (Le.transition = null, D = 1, e) return e();
  } finally {
    D = r, Le.transition = n, M = t, !(M & 6) && jt();
  }
}
function bs() {
  xe = rn.current, F(rn);
}
function Dt(e, t) {
  e.finishedWork = null, e.finishedLanes = 0;
  var n = e.timeoutHandle;
  if (n !== -1 && (e.timeoutHandle = -1, jd(n)), G !== null) for (n = G.return; n !== null; ) {
    var r = n;
    switch (Ts(r), r.tag) {
      case 1:
        r = r.type.childContextTypes, r != null && nl();
        break;
      case 3:
        mn(), F(ge), F(ae), $s();
        break;
      case 5:
        As(r);
        break;
      case 4:
        mn();
        break;
      case 13:
        F($);
        break;
      case 19:
        F($);
        break;
      case 10:
        Ds(r.type._context);
        break;
      case 22:
      case 23:
        bs();
    }
    n = n.return;
  }
  if (ne = e, G = e = wt(e.current, null), le = xe = t, Z = 0, cr = null, Ys = zl = $t = 0, he = Kn = null, Mt !== null) {
    for (t = 0; t < Mt.length; t++) if (n = Mt[t], r = n.interleaved, r !== null) {
      n.interleaved = null;
      var l = r.next, i = n.pending;
      if (i !== null) {
        var s = i.next;
        i.next = l, r.next = s;
      }
      n.pending = r;
    }
    Mt = null;
  }
  return e;
}
function Sc(e, t) {
  do {
    var n = G;
    try {
      if (Rs(), Ur.current = fl, cl) {
        for (var r = B.memoizedState; r !== null; ) {
          var l = r.queue;
          l !== null && (l.pending = null), r = r.next;
        }
        cl = !1;
      }
      if (At = 0, te = b = B = null, Wn = !1, or = 0, Ks.current = null, n === null || n.return === null) {
        Z = 1, cr = t, G = null;
        break;
      }
      e: {
        var i = e, s = n.return, o = n, u = t;
        if (t = le, o.flags |= 32768, u !== null && typeof u == "object" && typeof u.then == "function") {
          var a = u, h = o, m = h.tag;
          if (!(h.mode & 1) && (m === 0 || m === 11 || m === 15)) {
            var g = h.alternate;
            g ? (h.updateQueue = g.updateQueue, h.memoizedState = g.memoizedState, h.lanes = g.lanes) : (h.updateQueue = null, h.memoizedState = null);
          }
          var k = bo(s);
          if (k !== null) {
            k.flags &= -257, Zo(k, s, o, i, t), k.mode & 1 && Xo(i, a, t), t = k, u = a;
            var w = t.updateQueue;
            if (w === null) {
              var x = /* @__PURE__ */ new Set();
              x.add(u), t.updateQueue = x;
            } else w.add(u);
            break e;
          } else {
            if (!(t & 1)) {
              Xo(i, a, t), Zs();
              break e;
            }
            u = Error(y(426));
          }
        } else if (A && o.mode & 1) {
          var R = bo(s);
          if (R !== null) {
            !(R.flags & 65536) && (R.flags |= 256), Zo(R, s, o, i, t), Ls(gn(u, o));
            break e;
          }
        }
        i = u = gn(u, o), Z !== 4 && (Z = 2), Kn === null ? Kn = [i] : Kn.push(i), i = s;
        do {
          switch (i.tag) {
            case 3:
              i.flags |= 65536, t &= -t, i.lanes |= t;
              var d = ic(i, u, t);
              Vo(i, d);
              break e;
            case 1:
              o = u;
              var f = i.type, p = i.stateNode;
              if (!(i.flags & 128) && (typeof f.getDerivedStateFromError == "function" || p !== null && typeof p.componentDidCatch == "function" && (xt === null || !xt.has(p)))) {
                i.flags |= 65536, t &= -t, i.lanes |= t;
                var v = sc(i, o, t);
                Vo(i, v);
                break e;
              }
          }
          i = i.return;
        } while (i !== null);
      }
      Nc(n);
    } catch (C) {
      t = C, G === n && n !== null && (G = n = n.return);
      continue;
    }
    break;
  } while (!0);
}
function Cc() {
  var e = dl.current;
  return dl.current = fl, e === null ? fl : e;
}
function Zs() {
  (Z === 0 || Z === 3 || Z === 2) && (Z = 4), ne === null || !($t & 268435455) && !(zl & 268435455) || ft(ne, le);
}
function ml(e, t) {
  var n = M;
  M |= 2;
  var r = Cc();
  (ne !== e || le !== t) && (Xe = null, Dt(e, t));
  do
    try {
      Zd();
      break;
    } catch (l) {
      Sc(e, l);
    }
  while (!0);
  if (Rs(), M = n, dl.current = r, G !== null) throw Error(y(261));
  return ne = null, le = 0, Z;
}
function Zd() {
  for (; G !== null; ) Ec(G);
}
function Jd() {
  for (; G !== null && !Cf(); ) Ec(G);
}
function Ec(e) {
  var t = _c(e.alternate, e, xe);
  e.memoizedProps = e.pendingProps, t === null ? Nc(e) : G = t, Ks.current = null;
}
function Nc(e) {
  var t = e;
  do {
    var n = t.alternate;
    if (e = t.return, t.flags & 32768) {
      if (n = Qd(n, t), n !== null) {
        n.flags &= 32767, G = n;
        return;
      }
      if (e !== null) e.flags |= 32768, e.subtreeFlags = 0, e.deletions = null;
      else {
        Z = 6, G = null;
        return;
      }
    } else if (n = Wd(n, t, xe), n !== null) {
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
function Tt(e, t, n) {
  var r = D, l = Le.transition;
  try {
    Le.transition = null, D = 1, qd(e, t, n, r);
  } finally {
    Le.transition = l, D = r;
  }
  return null;
}
function qd(e, t, n, r) {
  do
    cn();
  while (pt !== null);
  if (M & 6) throw Error(y(327));
  n = e.finishedWork;
  var l = e.finishedLanes;
  if (n === null) return null;
  if (e.finishedWork = null, e.finishedLanes = 0, n === e.current) throw Error(y(177));
  e.callbackNode = null, e.callbackPriority = 0;
  var i = n.lanes | n.childLanes;
  if (Rf(e, i), e === ne && (G = ne = null, le = 0), !(n.subtreeFlags & 2064) && !(n.flags & 2064) || Rr || (Rr = !0, Pc(br, function() {
    return cn(), null;
  })), i = (n.flags & 15990) !== 0, n.subtreeFlags & 15990 || i) {
    i = Le.transition, Le.transition = null;
    var s = D;
    D = 1;
    var o = M;
    M |= 4, Ks.current = null, Yd(e, n), xc(n, e), xd(Ai), Jr = !!Fi, Ai = Fi = null, e.current = n, Gd(n), Ef(), M = o, D = s, Le.transition = i;
  } else e.current = n;
  if (Rr && (Rr = !1, pt = e, hl = l), i = e.pendingLanes, i === 0 && (xt = null), _f(n.stateNode), ye(e, Y()), t !== null) for (r = e.onRecoverableError, n = 0; n < t.length; n++) l = t[n], r(l.value, { componentStack: l.stack, digest: l.digest });
  if (pl) throw pl = !1, e = ls, ls = null, e;
  return hl & 1 && e.tag !== 0 && cn(), i = e.pendingLanes, i & 1 ? e === is ? Yn++ : (Yn = 0, is = e) : Yn = 0, jt(), null;
}
function cn() {
  if (pt !== null) {
    var e = ia(hl), t = Le.transition, n = D;
    try {
      if (Le.transition = null, D = 16 > e ? 16 : e, pt === null) var r = !1;
      else {
        if (e = pt, pt = null, hl = 0, M & 6) throw Error(y(331));
        var l = M;
        for (M |= 4, S = e.current; S !== null; ) {
          var i = S, s = i.child;
          if (S.flags & 16) {
            var o = i.deletions;
            if (o !== null) {
              for (var u = 0; u < o.length; u++) {
                var a = o[u];
                for (S = a; S !== null; ) {
                  var h = S;
                  switch (h.tag) {
                    case 0:
                    case 11:
                    case 15:
                      Qn(8, h, i);
                  }
                  var m = h.child;
                  if (m !== null) m.return = h, S = m;
                  else for (; S !== null; ) {
                    h = S;
                    var g = h.sibling, k = h.return;
                    if (gc(h), h === a) {
                      S = null;
                      break;
                    }
                    if (g !== null) {
                      g.return = k, S = g;
                      break;
                    }
                    S = k;
                  }
                }
              }
              var w = i.alternate;
              if (w !== null) {
                var x = w.child;
                if (x !== null) {
                  w.child = null;
                  do {
                    var R = x.sibling;
                    x.sibling = null, x = R;
                  } while (x !== null);
                }
              }
              S = i;
            }
          }
          if (i.subtreeFlags & 2064 && s !== null) s.return = i, S = s;
          else e: for (; S !== null; ) {
            if (i = S, i.flags & 2048) switch (i.tag) {
              case 0:
              case 11:
              case 15:
                Qn(9, i, i.return);
            }
            var d = i.sibling;
            if (d !== null) {
              d.return = i.return, S = d;
              break e;
            }
            S = i.return;
          }
        }
        var f = e.current;
        for (S = f; S !== null; ) {
          s = S;
          var p = s.child;
          if (s.subtreeFlags & 2064 && p !== null) p.return = s, S = p;
          else e: for (s = f; S !== null; ) {
            if (o = S, o.flags & 2048) try {
              switch (o.tag) {
                case 0:
                case 11:
                case 15:
                  Pl(9, o);
              }
            } catch (C) {
              H(o, o.return, C);
            }
            if (o === s) {
              S = null;
              break e;
            }
            var v = o.sibling;
            if (v !== null) {
              v.return = o.return, S = v;
              break e;
            }
            S = o.return;
          }
        }
        if (M = l, jt(), Ke && typeof Ke.onPostCommitFiberRoot == "function") try {
          Ke.onPostCommitFiberRoot(kl, e);
        } catch {
        }
        r = !0;
      }
      return r;
    } finally {
      D = n, Le.transition = t;
    }
  }
  return !1;
}
function cu(e, t, n) {
  t = gn(n, t), t = ic(e, t, 1), e = yt(e, t, 1), t = fe(), e !== null && (dr(e, 1, t), ye(e, t));
}
function H(e, t, n) {
  if (e.tag === 3) cu(e, e, n);
  else for (; t !== null; ) {
    if (t.tag === 3) {
      cu(t, e, n);
      break;
    } else if (t.tag === 1) {
      var r = t.stateNode;
      if (typeof t.type.getDerivedStateFromError == "function" || typeof r.componentDidCatch == "function" && (xt === null || !xt.has(r))) {
        e = gn(n, e), e = sc(t, e, 1), t = yt(t, e, 1), e = fe(), t !== null && (dr(t, 1, e), ye(t, e));
        break;
      }
    }
    t = t.return;
  }
}
function ep(e, t, n) {
  var r = e.pingCache;
  r !== null && r.delete(t), t = fe(), e.pingedLanes |= e.suspendedLanes & n, ne === e && (le & n) === n && (Z === 4 || Z === 3 && (le & 130023424) === le && 500 > Y() - Gs ? Dt(e, 0) : Ys |= n), ye(e, t);
}
function jc(e, t) {
  t === 0 && (e.mode & 1 ? (t = Cr, Cr <<= 1, !(Cr & 130023424) && (Cr = 4194304)) : t = 1);
  var n = fe();
  e = rt(e, t), e !== null && (dr(e, t, n), ye(e, n));
}
function tp(e) {
  var t = e.memoizedState, n = 0;
  t !== null && (n = t.retryLane), jc(e, n);
}
function np(e, t) {
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
      throw Error(y(314));
  }
  r !== null && r.delete(t), jc(e, n);
}
var _c;
_c = function(e, t, n) {
  if (e !== null) if (e.memoizedProps !== t.pendingProps || ge.current) me = !0;
  else {
    if (!(e.lanes & n) && !(t.flags & 128)) return me = !1, Vd(e, t, n);
    me = !!(e.flags & 131072);
  }
  else me = !1, A && t.flags & 1048576 && La(t, il, t.index);
  switch (t.lanes = 0, t.tag) {
    case 2:
      var r = t.type;
      Vr(e, t), e = t.pendingProps;
      var l = dn(t, ae.current);
      an(t, n), l = Us(null, t, r, e, l, n);
      var i = Hs();
      return t.flags |= 1, typeof l == "object" && l !== null && typeof l.render == "function" && l.$$typeof === void 0 ? (t.tag = 1, t.memoizedState = null, t.updateQueue = null, ve(r) ? (i = !0, rl(t)) : i = !1, t.memoizedState = l.state !== null && l.state !== void 0 ? l.state : null, Is(t), l.updater = _l, t.stateNode = l, l._reactInternals = t, Yi(t, r, e, n), t = bi(null, t, r, !0, i, n)) : (t.tag = 0, A && i && zs(t), ce(null, t, l, n), t = t.child), t;
    case 16:
      r = t.elementType;
      e: {
        switch (Vr(e, t), e = t.pendingProps, l = r._init, r = l(r._payload), t.type = r, l = t.tag = lp(r), e = Ie(r, e), l) {
          case 0:
            t = Xi(null, t, r, e, n);
            break e;
          case 1:
            t = eu(null, t, r, e, n);
            break e;
          case 11:
            t = Jo(null, t, r, e, n);
            break e;
          case 14:
            t = qo(null, t, r, Ie(r.type, e), n);
            break e;
        }
        throw Error(y(
          306,
          r,
          ""
        ));
      }
      return t;
    case 0:
      return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : Ie(r, l), Xi(e, t, r, l, n);
    case 1:
      return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : Ie(r, l), eu(e, t, r, l, n);
    case 3:
      e: {
        if (cc(t), e === null) throw Error(y(387));
        r = t.pendingProps, i = t.memoizedState, l = i.element, Fa(e, t), ul(t, r, null, n);
        var s = t.memoizedState;
        if (r = s.element, i.isDehydrated) if (i = { element: r, isDehydrated: !1, cache: s.cache, pendingSuspenseBoundaries: s.pendingSuspenseBoundaries, transitions: s.transitions }, t.updateQueue.baseState = i, t.memoizedState = i, t.flags & 256) {
          l = gn(Error(y(423)), t), t = tu(e, t, r, n, l);
          break e;
        } else if (r !== l) {
          l = gn(Error(y(424)), t), t = tu(e, t, r, n, l);
          break e;
        } else for (we = vt(t.stateNode.containerInfo.firstChild), Se = t, A = !0, Ae = null, n = Oa(t, null, r, n), t.child = n; n; ) n.flags = n.flags & -3 | 4096, n = n.sibling;
        else {
          if (pn(), r === l) {
            t = lt(e, t, n);
            break e;
          }
          ce(e, t, r, n);
        }
        t = t.child;
      }
      return t;
    case 5:
      return Aa(t), e === null && Wi(t), r = t.type, l = t.pendingProps, i = e !== null ? e.memoizedProps : null, s = l.children, $i(r, l) ? s = null : i !== null && $i(r, i) && (t.flags |= 32), ac(e, t), ce(e, t, s, n), t.child;
    case 6:
      return e === null && Wi(t), null;
    case 13:
      return fc(e, t, n);
    case 4:
      return Fs(t, t.stateNode.containerInfo), r = t.pendingProps, e === null ? t.child = hn(t, null, r, n) : ce(e, t, r, n), t.child;
    case 11:
      return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : Ie(r, l), Jo(e, t, r, l, n);
    case 7:
      return ce(e, t, t.pendingProps, n), t.child;
    case 8:
      return ce(e, t, t.pendingProps.children, n), t.child;
    case 12:
      return ce(e, t, t.pendingProps.children, n), t.child;
    case 10:
      e: {
        if (r = t.type._context, l = t.pendingProps, i = t.memoizedProps, s = l.value, O(sl, r._currentValue), r._currentValue = s, i !== null) if (Ue(i.value, s)) {
          if (i.children === l.children && !ge.current) {
            t = lt(e, t, n);
            break e;
          }
        } else for (i = t.child, i !== null && (i.return = t); i !== null; ) {
          var o = i.dependencies;
          if (o !== null) {
            s = i.child;
            for (var u = o.firstContext; u !== null; ) {
              if (u.context === r) {
                if (i.tag === 1) {
                  u = et(-1, n & -n), u.tag = 2;
                  var a = i.updateQueue;
                  if (a !== null) {
                    a = a.shared;
                    var h = a.pending;
                    h === null ? u.next = u : (u.next = h.next, h.next = u), a.pending = u;
                  }
                }
                i.lanes |= n, u = i.alternate, u !== null && (u.lanes |= n), Qi(
                  i.return,
                  n,
                  t
                ), o.lanes |= n;
                break;
              }
              u = u.next;
            }
          } else if (i.tag === 10) s = i.type === t.type ? null : i.child;
          else if (i.tag === 18) {
            if (s = i.return, s === null) throw Error(y(341));
            s.lanes |= n, o = s.alternate, o !== null && (o.lanes |= n), Qi(s, n, t), s = i.sibling;
          } else s = i.child;
          if (s !== null) s.return = i;
          else for (s = i; s !== null; ) {
            if (s === t) {
              s = null;
              break;
            }
            if (i = s.sibling, i !== null) {
              i.return = s.return, s = i;
              break;
            }
            s = s.return;
          }
          i = s;
        }
        ce(e, t, l.children, n), t = t.child;
      }
      return t;
    case 9:
      return l = t.type, r = t.pendingProps.children, an(t, n), l = Me(l), r = r(l), t.flags |= 1, ce(e, t, r, n), t.child;
    case 14:
      return r = t.type, l = Ie(r, t.pendingProps), l = Ie(r.type, l), qo(e, t, r, l, n);
    case 15:
      return oc(e, t, t.type, t.pendingProps, n);
    case 17:
      return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : Ie(r, l), Vr(e, t), t.tag = 1, ve(r) ? (e = !0, rl(t)) : e = !1, an(t, n), lc(t, r, l), Yi(t, r, l, n), bi(null, t, r, !0, e, n);
    case 19:
      return dc(e, t, n);
    case 22:
      return uc(e, t, n);
  }
  throw Error(y(156, t.tag));
};
function Pc(e, t) {
  return ta(e, t);
}
function rp(e, t, n, r) {
  this.tag = e, this.key = n, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = r, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
}
function Te(e, t, n, r) {
  return new rp(e, t, n, r);
}
function Js(e) {
  return e = e.prototype, !(!e || !e.isReactComponent);
}
function lp(e) {
  if (typeof e == "function") return Js(e) ? 1 : 0;
  if (e != null) {
    if (e = e.$$typeof, e === vs) return 11;
    if (e === ys) return 14;
  }
  return 2;
}
function wt(e, t) {
  var n = e.alternate;
  return n === null ? (n = Te(e.tag, t, e.key, e.mode), n.elementType = e.elementType, n.type = e.type, n.stateNode = e.stateNode, n.alternate = e, e.alternate = n) : (n.pendingProps = t, n.type = e.type, n.flags = 0, n.subtreeFlags = 0, n.deletions = null), n.flags = e.flags & 14680064, n.childLanes = e.childLanes, n.lanes = e.lanes, n.child = e.child, n.memoizedProps = e.memoizedProps, n.memoizedState = e.memoizedState, n.updateQueue = e.updateQueue, t = e.dependencies, n.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }, n.sibling = e.sibling, n.index = e.index, n.ref = e.ref, n;
}
function Kr(e, t, n, r, l, i) {
  var s = 2;
  if (r = e, typeof e == "function") Js(e) && (s = 1);
  else if (typeof e == "string") s = 5;
  else e: switch (e) {
    case Yt:
      return Ot(n.children, l, i, t);
    case gs:
      s = 8, l |= 8;
      break;
    case vi:
      return e = Te(12, n, t, l | 2), e.elementType = vi, e.lanes = i, e;
    case yi:
      return e = Te(13, n, t, l), e.elementType = yi, e.lanes = i, e;
    case xi:
      return e = Te(19, n, t, l), e.elementType = xi, e.lanes = i, e;
    case Au:
      return Tl(n, l, i, t);
    default:
      if (typeof e == "object" && e !== null) switch (e.$$typeof) {
        case Iu:
          s = 10;
          break e;
        case Fu:
          s = 9;
          break e;
        case vs:
          s = 11;
          break e;
        case ys:
          s = 14;
          break e;
        case ot:
          s = 16, r = null;
          break e;
      }
      throw Error(y(130, e == null ? e : typeof e, ""));
  }
  return t = Te(s, n, t, l), t.elementType = e, t.type = r, t.lanes = i, t;
}
function Ot(e, t, n, r) {
  return e = Te(7, e, r, t), e.lanes = n, e;
}
function Tl(e, t, n, r) {
  return e = Te(22, e, r, t), e.elementType = Au, e.lanes = n, e.stateNode = { isHidden: !1 }, e;
}
function ci(e, t, n) {
  return e = Te(6, e, null, t), e.lanes = n, e;
}
function fi(e, t, n) {
  return t = Te(4, e.children !== null ? e.children : [], e.key, t), t.lanes = n, t.stateNode = { containerInfo: e.containerInfo, pendingChildren: null, implementation: e.implementation }, t;
}
function ip(e, t, n, r, l) {
  this.tag = t, this.containerInfo = e, this.finishedWork = this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.pendingContext = this.context = null, this.callbackPriority = 0, this.eventTimes = Ql(0), this.expirationTimes = Ql(-1), this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Ql(0), this.identifierPrefix = r, this.onRecoverableError = l, this.mutableSourceEagerHydrationData = null;
}
function qs(e, t, n, r, l, i, s, o, u) {
  return e = new ip(e, t, n, o, u), t === 1 ? (t = 1, i === !0 && (t |= 8)) : t = 0, i = Te(3, null, null, t), e.current = i, i.stateNode = e, i.memoizedState = { element: r, isDehydrated: n, cache: null, transitions: null, pendingSuspenseBoundaries: null }, Is(i), e;
}
function sp(e, t, n) {
  var r = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
  return { $$typeof: Kt, key: r == null ? null : "" + r, children: e, containerInfo: t, implementation: n };
}
function zc(e) {
  if (!e) return Ct;
  e = e._reactInternals;
  e: {
    if (Ht(e) !== e || e.tag !== 1) throw Error(y(170));
    var t = e;
    do {
      switch (t.tag) {
        case 3:
          t = t.stateNode.context;
          break e;
        case 1:
          if (ve(t.type)) {
            t = t.stateNode.__reactInternalMemoizedMergedChildContext;
            break e;
          }
      }
      t = t.return;
    } while (t !== null);
    throw Error(y(171));
  }
  if (e.tag === 1) {
    var n = e.type;
    if (ve(n)) return za(e, n, t);
  }
  return t;
}
function Tc(e, t, n, r, l, i, s, o, u) {
  return e = qs(n, r, !0, e, l, i, s, o, u), e.context = zc(null), n = e.current, r = fe(), l = kt(n), i = et(r, l), i.callback = t ?? null, yt(n, i, l), e.current.lanes = l, dr(e, l, r), ye(e, r), e;
}
function Ll(e, t, n, r) {
  var l = t.current, i = fe(), s = kt(l);
  return n = zc(n), t.context === null ? t.context = n : t.pendingContext = n, t = et(i, s), t.payload = { element: e }, r = r === void 0 ? null : r, r !== null && (t.callback = r), e = yt(l, t, s), e !== null && (Be(e, l, s, i), Br(e, l, s)), s;
}
function gl(e) {
  if (e = e.current, !e.child) return null;
  switch (e.child.tag) {
    case 5:
      return e.child.stateNode;
    default:
      return e.child.stateNode;
  }
}
function fu(e, t) {
  if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
    var n = e.retryLane;
    e.retryLane = n !== 0 && n < t ? n : t;
  }
}
function eo(e, t) {
  fu(e, t), (e = e.alternate) && fu(e, t);
}
function op() {
  return null;
}
var Lc = typeof reportError == "function" ? reportError : function(e) {
  console.error(e);
};
function to(e) {
  this._internalRoot = e;
}
Ml.prototype.render = to.prototype.render = function(e) {
  var t = this._internalRoot;
  if (t === null) throw Error(y(409));
  Ll(e, t, null, null);
};
Ml.prototype.unmount = to.prototype.unmount = function() {
  var e = this._internalRoot;
  if (e !== null) {
    this._internalRoot = null;
    var t = e.containerInfo;
    Bt(function() {
      Ll(null, e, null, null);
    }), t[nt] = null;
  }
};
function Ml(e) {
  this._internalRoot = e;
}
Ml.prototype.unstable_scheduleHydration = function(e) {
  if (e) {
    var t = ua();
    e = { blockedOn: null, target: e, priority: t };
    for (var n = 0; n < ct.length && t !== 0 && t < ct[n].priority; n++) ;
    ct.splice(n, 0, e), n === 0 && ca(e);
  }
};
function no(e) {
  return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11);
}
function Rl(e) {
  return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11 && (e.nodeType !== 8 || e.nodeValue !== " react-mount-point-unstable "));
}
function du() {
}
function up(e, t, n, r, l) {
  if (l) {
    if (typeof r == "function") {
      var i = r;
      r = function() {
        var a = gl(s);
        i.call(a);
      };
    }
    var s = Tc(t, r, e, 0, null, !1, !1, "", du);
    return e._reactRootContainer = s, e[nt] = s.current, nr(e.nodeType === 8 ? e.parentNode : e), Bt(), s;
  }
  for (; l = e.lastChild; ) e.removeChild(l);
  if (typeof r == "function") {
    var o = r;
    r = function() {
      var a = gl(u);
      o.call(a);
    };
  }
  var u = qs(e, 0, !1, null, null, !1, !1, "", du);
  return e._reactRootContainer = u, e[nt] = u.current, nr(e.nodeType === 8 ? e.parentNode : e), Bt(function() {
    Ll(t, u, n, r);
  }), u;
}
function Dl(e, t, n, r, l) {
  var i = n._reactRootContainer;
  if (i) {
    var s = i;
    if (typeof l == "function") {
      var o = l;
      l = function() {
        var u = gl(s);
        o.call(u);
      };
    }
    Ll(t, s, e, l);
  } else s = up(n, t, e, l, r);
  return gl(s);
}
sa = function(e) {
  switch (e.tag) {
    case 3:
      var t = e.stateNode;
      if (t.current.memoizedState.isDehydrated) {
        var n = On(t.pendingLanes);
        n !== 0 && (ws(t, n | 1), ye(t, Y()), !(M & 6) && (vn = Y() + 500, jt()));
      }
      break;
    case 13:
      Bt(function() {
        var r = rt(e, 1);
        if (r !== null) {
          var l = fe();
          Be(r, e, 1, l);
        }
      }), eo(e, 1);
  }
};
Ss = function(e) {
  if (e.tag === 13) {
    var t = rt(e, 134217728);
    if (t !== null) {
      var n = fe();
      Be(t, e, 134217728, n);
    }
    eo(e, 134217728);
  }
};
oa = function(e) {
  if (e.tag === 13) {
    var t = kt(e), n = rt(e, t);
    if (n !== null) {
      var r = fe();
      Be(n, e, t, r);
    }
    eo(e, t);
  }
};
ua = function() {
  return D;
};
aa = function(e, t) {
  var n = D;
  try {
    return D = e, t();
  } finally {
    D = n;
  }
};
zi = function(e, t, n) {
  switch (t) {
    case "input":
      if (Si(e, n), t = n.name, n.type === "radio" && t != null) {
        for (n = e; n.parentNode; ) n = n.parentNode;
        for (n = n.querySelectorAll("input[name=" + JSON.stringify("" + t) + '][type="radio"]'), t = 0; t < n.length; t++) {
          var r = n[t];
          if (r !== e && r.form === e.form) {
            var l = El(r);
            if (!l) throw Error(y(90));
            Bu(r), Si(r, l);
          }
        }
      }
      break;
    case "textarea":
      Hu(e, n);
      break;
    case "select":
      t = n.value, t != null && ln(e, !!n.multiple, t, !1);
  }
};
Xu = Xs;
bu = Bt;
var ap = { usingClientEntryPoint: !1, Events: [hr, Zt, El, Yu, Gu, Xs] }, Ln = { findFiberByHostInstance: Lt, bundleType: 0, version: "18.3.1", rendererPackageName: "react-dom" }, cp = { bundleType: Ln.bundleType, version: Ln.version, rendererPackageName: Ln.rendererPackageName, rendererConfig: Ln.rendererConfig, overrideHookState: null, overrideHookStateDeletePath: null, overrideHookStateRenamePath: null, overrideProps: null, overridePropsDeletePath: null, overridePropsRenamePath: null, setErrorHandler: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: it.ReactCurrentDispatcher, findHostInstanceByFiber: function(e) {
  return e = qu(e), e === null ? null : e.stateNode;
}, findFiberByHostInstance: Ln.findFiberByHostInstance || op, findHostInstancesForRefresh: null, scheduleRefresh: null, scheduleRoot: null, setRefreshHandler: null, getCurrentFiber: null, reconcilerVersion: "18.3.1-next-f1338f8080-20240426" };
if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
  var Dr = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (!Dr.isDisabled && Dr.supportsFiber) try {
    kl = Dr.inject(cp), Ke = Dr;
  } catch {
  }
}
Ee.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = ap;
Ee.createPortal = function(e, t) {
  var n = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
  if (!no(t)) throw Error(y(200));
  return sp(e, t, null, n);
};
Ee.createRoot = function(e, t) {
  if (!no(e)) throw Error(y(299));
  var n = !1, r = "", l = Lc;
  return t != null && (t.unstable_strictMode === !0 && (n = !0), t.identifierPrefix !== void 0 && (r = t.identifierPrefix), t.onRecoverableError !== void 0 && (l = t.onRecoverableError)), t = qs(e, 1, !1, null, null, n, !1, r, l), e[nt] = t.current, nr(e.nodeType === 8 ? e.parentNode : e), new to(t);
};
Ee.findDOMNode = function(e) {
  if (e == null) return null;
  if (e.nodeType === 1) return e;
  var t = e._reactInternals;
  if (t === void 0)
    throw typeof e.render == "function" ? Error(y(188)) : (e = Object.keys(e).join(","), Error(y(268, e)));
  return e = qu(t), e = e === null ? null : e.stateNode, e;
};
Ee.flushSync = function(e) {
  return Bt(e);
};
Ee.hydrate = function(e, t, n) {
  if (!Rl(t)) throw Error(y(200));
  return Dl(null, e, t, !0, n);
};
Ee.hydrateRoot = function(e, t, n) {
  if (!no(e)) throw Error(y(405));
  var r = n != null && n.hydratedSources || null, l = !1, i = "", s = Lc;
  if (n != null && (n.unstable_strictMode === !0 && (l = !0), n.identifierPrefix !== void 0 && (i = n.identifierPrefix), n.onRecoverableError !== void 0 && (s = n.onRecoverableError)), t = Tc(t, null, e, 1, n ?? null, l, !1, i, s), e[nt] = t.current, nr(e), r) for (e = 0; e < r.length; e++) n = r[e], l = n._getVersion, l = l(n._source), t.mutableSourceEagerHydrationData == null ? t.mutableSourceEagerHydrationData = [n, l] : t.mutableSourceEagerHydrationData.push(
    n,
    l
  );
  return new Ml(t);
};
Ee.render = function(e, t, n) {
  if (!Rl(t)) throw Error(y(200));
  return Dl(null, e, t, !1, n);
};
Ee.unmountComponentAtNode = function(e) {
  if (!Rl(e)) throw Error(y(40));
  return e._reactRootContainer ? (Bt(function() {
    Dl(null, null, e, !1, function() {
      e._reactRootContainer = null, e[nt] = null;
    });
  }), !0) : !1;
};
Ee.unstable_batchedUpdates = Xs;
Ee.unstable_renderSubtreeIntoContainer = function(e, t, n, r) {
  if (!Rl(n)) throw Error(y(200));
  if (e == null || e._reactInternals === void 0) throw Error(y(38));
  return Dl(e, t, n, !1, r);
};
Ee.version = "18.3.1-next-f1338f8080-20240426";
function Mc() {
  if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
    try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(Mc);
    } catch (e) {
      console.error(e);
    }
}
Mc(), Mu.exports = Ee;
var fp = Mu.exports, Rc, pu = fp;
Rc = pu.createRoot, pu.hydrateRoot;
const dp = "#c62a3f", pp = "#20232b";
function Dc(e) {
  return e === "H" || e === "D" ? dp : pp;
}
const hp = {
  H: "M50 87 C50 87 11 59 11 33 C11 19 21 11 32 11 C41 11 47 16 50 24 C53 16 59 11 68 11 C79 11 89 19 89 33 C89 59 50 87 50 87 Z",
  D: "M50 7 L87 50 L50 93 L13 50 Z",
  S: "M50 8 C50 8 13 41 13 61 C13 73 21 79 30 79 C35 79 39 77 42 73 C41 83 37 89 29 93 L71 93 C63 89 59 83 58 73 C61 77 65 79 70 79 C79 79 87 73 87 61 C87 41 50 8 50 8 Z",
  C: "M50 8 C41 8 34 15 34 24 C34 29 36 33 40 36 C33 32 23 33 17 39 C10 46 10 57 17 64 C23 70 33 71 40 67 C37 75 32 81 25 85 L75 85 C68 81 63 75 60 67 C67 71 77 70 83 64 C90 57 90 46 83 39 C77 33 67 32 60 36 C64 33 66 29 66 24 C66 15 59 8 50 8 Z"
};
function yn({
  suit: e,
  cx: t,
  cy: n,
  size: r,
  flip: l = !1,
  color: i
}) {
  const s = r / 100;
  return /* @__PURE__ */ c.jsx(
    "g",
    {
      transform: `translate(${t} ${n}) rotate(${l ? 180 : 0}) scale(${s}) translate(-50 -50)`,
      fill: i ?? Dc(e),
      children: /* @__PURE__ */ c.jsx("path", { d: hp[e] })
    }
  );
}
function Oc({ className: e, style: t }) {
  return /* @__PURE__ */ c.jsxs("svg", { viewBox: "0 0 100 140", className: e, style: t, children: [
    /* @__PURE__ */ c.jsx("rect", { x: "0.5", y: "0.5", width: "99", height: "139", rx: "9", fill: "#a11228", stroke: "rgba(0,0,0,0.2)" }),
    /* @__PURE__ */ c.jsx("rect", { x: "9", y: "9", width: "82", height: "122", rx: "5", fill: "#8d0f22" }),
    /* @__PURE__ */ c.jsx(
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
    /* @__PURE__ */ c.jsx(
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
    /* @__PURE__ */ c.jsx("circle", { cx: "50", cy: "70", r: "17", fill: "#a11228", stroke: "#f6dade", strokeOpacity: "0.5", strokeWidth: "1.2" }),
    /* @__PURE__ */ c.jsx(yn, { suit: "S", cx: 50, cy: 70, size: 20, color: "#f6dade" })
  ] });
}
const Q = 32, je = 50, K = 68, q = 40, ee = 100, _e = 70, Fn = 58, An = 82, hu = (q + _e) / 2, mp = (_e + ee) / 2, gp = (q + Fn) / 2, vp = (An + ee) / 2, yp = {
  2: [{ x: je, y: q }, { x: je, y: ee }],
  3: [{ x: je, y: q }, { x: je, y: _e }, { x: je, y: ee }],
  4: [{ x: Q, y: q }, { x: K, y: q }, { x: Q, y: ee }, { x: K, y: ee }],
  5: [{ x: Q, y: q }, { x: K, y: q }, { x: je, y: _e }, { x: Q, y: ee }, { x: K, y: ee }],
  6: [{ x: Q, y: q }, { x: K, y: q }, { x: Q, y: _e }, { x: K, y: _e }, { x: Q, y: ee }, { x: K, y: ee }],
  7: [
    { x: Q, y: q },
    { x: K, y: q },
    { x: je, y: hu },
    { x: Q, y: _e },
    { x: K, y: _e },
    { x: Q, y: ee },
    { x: K, y: ee }
  ],
  8: [
    { x: Q, y: q },
    { x: K, y: q },
    { x: je, y: hu },
    { x: Q, y: _e },
    { x: K, y: _e },
    { x: je, y: mp },
    { x: Q, y: ee },
    { x: K, y: ee }
  ],
  9: [
    { x: Q, y: q },
    { x: K, y: q },
    { x: Q, y: Fn },
    { x: K, y: Fn },
    { x: je, y: _e },
    { x: Q, y: An },
    { x: K, y: An },
    { x: Q, y: ee },
    { x: K, y: ee }
  ],
  10: [
    { x: Q, y: q },
    { x: K, y: q },
    { x: je, y: gp },
    { x: Q, y: Fn },
    { x: K, y: Fn },
    { x: Q, y: An },
    { x: K, y: An },
    { x: je, y: vp },
    { x: Q, y: ee },
    { x: K, y: ee }
  ]
}, xp = _e, Ic = "Georgia, 'Times New Roman', 'Playfair Display', serif";
function mu({ rank: e, suit: t, color: n }) {
  const r = e === "10";
  return /* @__PURE__ */ c.jsxs("g", { fill: n, children: [
    /* @__PURE__ */ c.jsx(
      "text",
      {
        x: r ? 11 : 10,
        y: "20",
        fontSize: r ? 13 : 16,
        fontWeight: 800,
        fontFamily: Ic,
        textAnchor: "middle",
        children: e
      }
    ),
    /* @__PURE__ */ c.jsx(yn, { suit: t, cx: 10, cy: 32, size: 12, color: n })
  ] });
}
function kp({ rank: e, suit: t, color: n }) {
  return /* @__PURE__ */ c.jsxs("g", { children: [
    /* @__PURE__ */ c.jsx("rect", { x: "16", y: "24", width: "68", height: "92", rx: "6", fill: n, fillOpacity: "0.045" }),
    /* @__PURE__ */ c.jsx(
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
    /* @__PURE__ */ c.jsx(yn, { suit: t, cx: 50, cy: 41, size: 20, color: n }),
    /* @__PURE__ */ c.jsx(
      "text",
      {
        x: "50",
        y: "86",
        fontSize: "42",
        fontWeight: 800,
        fontFamily: Ic,
        textAnchor: "middle",
        fill: n,
        children: e
      }
    ),
    /* @__PURE__ */ c.jsx(yn, { suit: t, cx: 50, cy: 104, size: 17, flip: !0, color: n })
  ] });
}
function vl({ rank: e, suit: t, faceDown: n, className: r, style: l }) {
  if (n) return /* @__PURE__ */ c.jsx(Oc, { className: r, style: l });
  const i = Dc(t), s = e === "J" || e === "Q" || e === "K", o = yp[e];
  return /* @__PURE__ */ c.jsxs("svg", { viewBox: "0 0 100 140", className: r, style: l, children: [
    /* @__PURE__ */ c.jsx("rect", { x: "0.5", y: "0.5", width: "99", height: "139", rx: "9", fill: "#fdfdfb", stroke: "rgba(20,20,30,0.14)" }),
    /* @__PURE__ */ c.jsx(mu, { rank: e, suit: t, color: i }),
    /* @__PURE__ */ c.jsx("g", { transform: "rotate(180 50 70)", children: /* @__PURE__ */ c.jsx(mu, { rank: e, suit: t, color: i }) }),
    e === "A" ? /* @__PURE__ */ c.jsx(yn, { suit: t, cx: 50, cy: 70, size: 46, color: i }) : s ? /* @__PURE__ */ c.jsx(kp, { rank: e, suit: t, color: i }) : o?.map((u, a) => /* @__PURE__ */ c.jsx(yn, { suit: t, cx: u.x, cy: u.y, size: 20, flip: u.y > xp, color: i }, a))
  ] });
}
const wp = [1, 5, 25, 100, 500], Sp = {
  1: { base: "#eef1f5", edge: "#c3cbd6", text: "#2a2f3a" },
  5: { base: "#d6363b", edge: "#f4b8ba", text: "#ffffff" },
  25: { base: "#2f9e57", edge: "#bce7cd", text: "#ffffff" },
  100: { base: "#2b2f38", edge: "#8791a0", text: "#ffffff" },
  500: { base: "#7b3fb2", edge: "#d6bcee", text: "#ffffff" }
};
function Fc({ value: e, size: t = 58 }) {
  const n = Sp[e];
  return /* @__PURE__ */ c.jsxs("svg", { viewBox: "0 0 100 100", width: t, height: t, "aria-label": `$${e} chip`, children: [
    /* @__PURE__ */ c.jsx("circle", { cx: "50", cy: "50", r: "48", fill: n.edge }),
    /* @__PURE__ */ c.jsx("circle", { cx: "50", cy: "50", r: "43", fill: "none", stroke: n.base, strokeWidth: "11", strokeDasharray: "25 20" }),
    /* @__PURE__ */ c.jsx("circle", { cx: "50", cy: "50", r: "37", fill: n.base }),
    /* @__PURE__ */ c.jsx("circle", { cx: "50", cy: "50", r: "31", fill: "none", stroke: n.edge, strokeWidth: "2", strokeDasharray: "3 5" }),
    /* @__PURE__ */ c.jsx(
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
function Cp() {
  return /* @__PURE__ */ c.jsxs("svg", { className: "mg-felt", viewBox: "0 0 520 620", preserveAspectRatio: "xMidYMid slice", "aria-hidden": "true", children: [
    /* @__PURE__ */ c.jsxs("defs", { children: [
      /* @__PURE__ */ c.jsxs("radialGradient", { id: "mg-felt-grad", cx: "50%", cy: "34%", r: "80%", children: [
        /* @__PURE__ */ c.jsx("stop", { offset: "0%", stopColor: "#1f8551" }),
        /* @__PURE__ */ c.jsx("stop", { offset: "62%", stopColor: "#136a41" }),
        /* @__PURE__ */ c.jsx("stop", { offset: "100%", stopColor: "#0c4b2d" })
      ] }),
      /* @__PURE__ */ c.jsxs("linearGradient", { id: "mg-rail", x1: "0", y1: "0", x2: "0", y2: "1", children: [
        /* @__PURE__ */ c.jsx("stop", { offset: "0%", stopColor: "#3a2418" }),
        /* @__PURE__ */ c.jsx("stop", { offset: "100%", stopColor: "#241209" })
      ] }),
      /* @__PURE__ */ c.jsx("path", { id: "mg-arc", d: "M70 300 A 190 190 0 0 1 450 300", fill: "none" })
    ] }),
    /* @__PURE__ */ c.jsx("rect", { x: "0", y: "0", width: "520", height: "620", rx: "34", fill: "url(#mg-rail)" }),
    /* @__PURE__ */ c.jsx("rect", { x: "14", y: "14", width: "492", height: "592", rx: "24", fill: "url(#mg-felt-grad)" }),
    /* @__PURE__ */ c.jsx(
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
    /* @__PURE__ */ c.jsx("rect", { x: "14", y: "14", width: "492", height: "592", rx: "24", fill: "#000000", fillOpacity: "0.10", style: { mixBlendMode: "multiply" } }),
    /* @__PURE__ */ c.jsx(
      "text",
      {
        fill: "#f0e2b6",
        fillOpacity: "0.92",
        fontSize: "23",
        fontWeight: 700,
        letterSpacing: "4",
        fontFamily: "Georgia, serif",
        children: /* @__PURE__ */ c.jsx("textPath", { href: "#mg-arc", startOffset: "50%", textAnchor: "middle", children: "BLACKJACK PAYS 3 TO 2" })
      }
    ),
    /* @__PURE__ */ c.jsx(
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
    /* @__PURE__ */ c.jsx(
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
    /* @__PURE__ */ c.jsx("ellipse", { cx: "260", cy: "474", rx: "58", ry: "30", fill: "none", stroke: "#f0e2b6", strokeOpacity: "0.5", strokeWidth: "2", strokeDasharray: "2 6" })
  ] });
}
const Wt = {
  bankroll: "bj.bankroll",
  stats: "bj.stats",
  settings: "bj.settings"
}, Ep = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"], Np = ["S", "H", "D", "C"];
let jp = 0;
function Mn(e) {
  const t = [];
  for (let n = 0; n < e; n++)
    for (const r of Np)
      for (const l of Ep) t.push({ rank: l, suit: r, id: `c${jp++}` });
  for (let n = t.length - 1; n > 0; n--) {
    const r = Math.floor(Math.random() * (n + 1)), l = t[n];
    t[n] = t[r], t[r] = l;
  }
  return t;
}
function Ze(e) {
  let t = 0, n = 0;
  for (const r of e)
    r.rank === "A" ? (n += 1, t += 11) : r.rank === "K" || r.rank === "Q" || r.rank === "J" || r.rank === "10" ? t += 10 : t += Number(r.rank);
  for (; t > 21 && n > 0; )
    t -= 10, n -= 1;
  return { total: t, soft: n > 0 && t <= 21 };
}
function di(e) {
  return e.length === 2 && Ze(e).total === 21;
}
function gu(e) {
  return e === "A" ? 11 : e === "K" || e === "Q" || e === "J" || e === "10" ? 10 : Number(e);
}
const pi = { decks: 6, hitSoft17: !1, startingBankroll: 500 }, vu = { hands: 0, wins: 0, losses: 0, pushes: 0, blackjacks: 0 }, hi = 260, mi = 520;
class _p {
  constructor(t, n, r) {
    this.api = t, this.onChange = n, this.sfx = r, this.shoe = Mn(this.settings.decks), this.loadPrefs();
  }
  shoe = [];
  phase = "betting";
  bankroll = pi.startingBankroll;
  bet = 0;
  hands = [];
  active = 0;
  dealer = [];
  holeHidden = !0;
  insuranceBet = 0;
  message = "";
  lastNet = 0;
  stats = { ...vu };
  settings = { ...pi };
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
    this.phase !== "betting" || this.bet <= 0 || this.bet > this.bankroll || (this.reshuffleIfLow(), this.bankroll -= this.bet, this.hands = [this.freshHand(this.bet)], this.dealer = [], this.active = 0, this.insuranceBet = 0, this.holeHidden = !0, this.message = "", this.lastNet = 0, this.phase = "playing", this.sfx.deal(), this.draw(this.hands[0]), this.schedule(hi, () => {
      this.dealer.push(this.pop()), this.sfx.deal(), this.emit();
    }), this.schedule(hi * 2, () => {
      this.draw(this.hands[0]), this.sfx.deal(), this.emit();
    }), this.schedule(hi * 3, () => {
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
    const t = di(this.dealer), n = di(this.hands[0].cards);
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
    !t || t.done || (this.draw(t), this.sfx.deal(), Ze(t.cards).total > 21 ? (t.outcome = "bust", t.done = !0, this.sfx.lose(), this.advance()) : this.emit());
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
    this.bankroll -= t.bet, t.bet *= 2, t.doubled = !0, this.draw(t), this.sfx.deal(), Ze(t.cards).total > 21 && (t.outcome = "bust", this.sfx.lose()), t.done = !0, this.advance();
  }
  canSplit() {
    const t = this.cur();
    return this.phase === "playing" && !!t && !t.done && t.cards.length === 2 && gu(t.cards[0].rank) === gu(t.cards[1].rank) && this.hands.length < 4 && this.bankroll >= t.bet;
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
      this.schedule(mi, () => this.settle());
      return;
    }
    const n = (r) => {
      this.schedule(r, () => {
        const { total: l, soft: i } = Ze(this.dealer), s = i && l === 17 && this.settings.hitSoft17;
        l < 17 || s ? (this.dealer.push(this.pop()), this.sfx.deal(), this.emit(), n(mi)) : this.settle();
      });
    };
    n(mi);
  }
  settle() {
    const t = Ze(this.dealer), n = t.total > 21;
    let r = 0, l = !1;
    for (const i of this.hands) {
      const s = Ze(i.cards);
      i.outcome === null && (s.total > 21 ? i.outcome = "bust" : n || s.total > t.total ? i.outcome = "win" : s.total < t.total ? i.outcome = "lose" : i.outcome = "push"), i.outcome === "blackjack" ? (this.bankroll += Math.round(i.bet * 2.5), r += Math.round(i.bet * 1.5), this.stats.blackjacks += 1, this.stats.wins += 1, l = !0) : i.outcome === "win" ? (this.bankroll += i.bet * 2, r += i.bet, this.stats.wins += 1, l = !0) : i.outcome === "push" ? (this.bankroll += i.bet, this.stats.pushes += 1) : (r -= i.bet, this.stats.losses += 1), this.stats.hands += 1;
    }
    this.insuranceBet > 0 && !di(this.dealer) && (r -= this.insuranceBet), this.lastNet = r, this.phase = "settle", this.message = this.settleMessage(r, l), r > 0 ? (this.hands.some((i) => i.outcome === "blackjack") ? this.sfx.blackjack : this.sfx.win)() : r < 0 ? this.sfx.lose() : this.sfx.push(), this.savePrefs(), this.emit();
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
    this.phase === "betting" && (this.settings.decks = Math.max(1, Math.min(8, t)), this.shoe = Mn(this.settings.decks), this.savePrefs(), this.emit());
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
    return this.shoe.length === 0 && (this.shoe = Mn(this.settings.decks)), this.shoe.pop();
  }
  reshuffleIfLow() {
    this.shoe.length < this.settings.decks * 52 * 0.25 && (this.shoe = Mn(this.settings.decks));
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
        this.api.storage.get(Wt.bankroll),
        this.api.storage.get(Wt.stats),
        this.api.storage.get(Wt.settings)
      ]);
      r && typeof r.decks == "number" && (this.settings = { ...pi, ...r }, this.shoe = Mn(this.settings.decks)), typeof t == "number" && t > 0 ? this.bankroll = t : this.bankroll = this.settings.startingBankroll, n && typeof n.hands == "number" && (this.stats = { ...vu, ...n }), this.emit();
    } catch {
    }
  }
  async savePrefs() {
    try {
      await Promise.all([
        this.api.storage.set(Wt.bankroll, this.bankroll),
        this.api.storage.set(Wt.stats, this.stats),
        this.api.storage.set(Wt.settings, this.settings)
      ]);
    } catch {
    }
  }
}
function Pp(e, t) {
  const [n, r] = ke.useState(null), l = ke.useRef(null);
  return ke.useEffect(() => {
    const i = new _p(e, r, {
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
function zp(e, t) {
  if (e.length === 0) return "";
  if (t) return String(Ze([e[0]]).total);
  const { total: n, soft: r } = Ze(e);
  return r && n !== 21 ? `${n - 10}/${n}` : String(n);
}
function Tp(e) {
  const { total: t, soft: n } = Ze(e);
  return t > 21 ? `${t}` : n && t !== 21 ? `${t - 10}/${t}` : String(t);
}
function Lp(e) {
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
function Mp({ card: e, revealed: t }) {
  return /* @__PURE__ */ c.jsx("span", { className: "mg-card-wrap", children: /* @__PURE__ */ c.jsxs("span", { className: `mg-flip${t ? " revealed" : ""}`, children: [
    /* @__PURE__ */ c.jsx("span", { className: "mg-flip-face mg-flip-back", children: /* @__PURE__ */ c.jsx(Oc, { className: "mg-card" }) }),
    /* @__PURE__ */ c.jsx("span", { className: "mg-flip-face mg-flip-front", children: /* @__PURE__ */ c.jsx(vl, { rank: e.rank, suit: e.suit, className: "mg-card" }) })
  ] }) });
}
function yu({
  cards: e,
  flipHole: t = !1,
  holeHidden: n = !1
}) {
  return /* @__PURE__ */ c.jsx("div", { className: "mg-cards", children: e.map(
    (r, l) => t && l === 1 ? /* @__PURE__ */ c.jsx(Mp, { card: r, revealed: !n }, r.id) : /* @__PURE__ */ c.jsx("span", { className: "mg-card-wrap", style: { "--i": l }, children: /* @__PURE__ */ c.jsx(vl, { rank: r.rank, suit: r.suit, className: "mg-card" }) }, r.id)
  ) });
}
function Rp(e) {
  const t = [500, 100, 25, 5, 1], n = [];
  let r = e;
  for (const l of t)
    for (; r >= l && n.length < 9; )
      n.push(l), r -= l;
  return n.reverse();
}
function Dp({ amount: e }) {
  const t = Rp(e);
  return /* @__PURE__ */ c.jsxs("div", { className: "mg-betstack", title: `$${e}`, children: [
    t.map((n, r) => /* @__PURE__ */ c.jsx("span", { className: "mg-betchip", style: { "--n": r }, children: /* @__PURE__ */ c.jsx(Fc, { value: n, size: 46 }) }, r)),
    /* @__PURE__ */ c.jsxs("span", { className: "mg-betstack-amt", children: [
      "$",
      e
    ] })
  ] });
}
function Op({ blackjack: e }) {
  const t = e ? 26 : 16;
  return /* @__PURE__ */ c.jsx("div", { className: "mg-celebrate", "aria-hidden": "true", children: Array.from({ length: t }).map((n, r) => /* @__PURE__ */ c.jsx(
    "span",
    {
      className: `mg-coin${e ? " bj" : ""}`,
      style: { "--i": r, left: `${r * 61 % 100}%` }
    },
    r
  )) });
}
function Ip({
  api: e,
  audio: t,
  onExit: n
}) {
  const { state: r, game: l } = Pp(e, t), [i, s] = ke.useState(t.isMuted), [o, u] = ke.useState(!1), a = (x) => {
    x && (t.unlock(), x());
  };
  if (ke.useEffect(() => {
    const x = (R) => {
      if (!l || !r) return;
      const d = R.key.toLowerCase();
      r.phase === "betting" && (d === "enter" || d === " ") ? a(() => l.deal()) : r.phase === "playing" ? d === "h" ? a(() => l.hit()) : d === "s" ? a(() => l.stand()) : d === "d" && l.canDouble() ? a(() => l.double()) : d === "p" && l.canSplit() && a(() => l.split()) : r.phase === "settle" && (d === "enter" || d === " ") ? a(() => l.newRound()) : r.phase === "insurance" && (d === "y" ? a(() => l.takeInsurance()) : d === "n" && a(() => l.declineInsurance())), ["arrowup", "arrowdown", "arrowleft", "arrowright", " "].includes(d) && R.preventDefault();
    };
    return window.addEventListener("keydown", x), () => window.removeEventListener("keydown", x);
  }), !r || !l) return /* @__PURE__ */ c.jsx("div", { className: "mg-loading", children: "Shuffling the shoe…" });
  const h = () => {
    const x = !i;
    s(x), t.setMuted(x);
  }, m = r.lastNet, g = r.phase === "settle" ? m > 0 ? "good" : m < 0 ? "bad" : "neutral" : "", k = r.phase === "settle" && m > 0, w = r.playerHands.some((x) => x.outcome === "blackjack");
  return /* @__PURE__ */ c.jsxs("div", { className: "mg-bj", children: [
    /* @__PURE__ */ c.jsxs("div", { className: "mg-topbar", children: [
      /* @__PURE__ */ c.jsx("button", { className: "mg-icon-btn", onClick: n, title: "Back to games", children: "‹ Games" }),
      /* @__PURE__ */ c.jsxs("div", { className: "mg-bankroll", children: [
        /* @__PURE__ */ c.jsx("span", { className: "mg-bankroll-chip" }),
        " $",
        r.bankroll
      ] }),
      /* @__PURE__ */ c.jsxs("div", { className: "mg-topbar-right", children: [
        /* @__PURE__ */ c.jsxs("span", { className: "mg-stat-sm", title: "Wins / Blackjacks / Hands", children: [
          r.stats.wins,
          "W · ",
          r.stats.blackjacks,
          "BJ · ",
          r.stats.hands
        ] }),
        /* @__PURE__ */ c.jsx("button", { className: "mg-icon-btn", onClick: h, title: "Sound", children: i ? "🔇" : "♪" }),
        /* @__PURE__ */ c.jsx(
          "button",
          {
            className: `mg-icon-btn${o ? " on" : ""}`,
            onClick: () => u((x) => !x),
            title: "Settings",
            children: "⚙"
          }
        )
      ] })
    ] }),
    o ? /* @__PURE__ */ c.jsxs("div", { className: "mg-settings", children: [
      /* @__PURE__ */ c.jsxs("div", { className: "mg-set-row", children: [
        /* @__PURE__ */ c.jsx("span", { className: "mg-set-label", children: "Decks" }),
        /* @__PURE__ */ c.jsx("div", { className: "mg-seg", children: [1, 2, 4, 6, 8].map((x) => /* @__PURE__ */ c.jsx(
          "button",
          {
            className: `mg-seg-btn${r.settings.decks === x ? " active" : ""}`,
            disabled: r.phase !== "betting",
            onClick: () => l.setDecks(x),
            children: x
          },
          x
        )) })
      ] }),
      /* @__PURE__ */ c.jsxs("div", { className: "mg-set-row", children: [
        /* @__PURE__ */ c.jsx("span", { className: "mg-set-label", children: "Dealer hits soft 17" }),
        /* @__PURE__ */ c.jsx(
          "button",
          {
            className: `mg-toggle${r.settings.hitSoft17 ? " on" : ""}`,
            disabled: r.phase !== "betting",
            onClick: () => l.setHitSoft17(!r.settings.hitSoft17),
            children: /* @__PURE__ */ c.jsx("span", { className: "mg-toggle-dot" })
          }
        )
      ] }),
      /* @__PURE__ */ c.jsxs("div", { className: "mg-set-hint", children: [
        "Shoe: ",
        r.shoeRemaining,
        " cards left"
      ] })
    ] }) : null,
    /* @__PURE__ */ c.jsx("div", { className: "mg-table-3d", children: /* @__PURE__ */ c.jsxs("div", { className: "mg-table", children: [
      /* @__PURE__ */ c.jsx(Cp, {}),
      k ? /* @__PURE__ */ c.jsx(Op, { blackjack: w }) : null,
      /* @__PURE__ */ c.jsxs("div", { className: "mg-dealer", children: [
        /* @__PURE__ */ c.jsx(yu, { cards: r.dealer, flipHole: !0, holeHidden: r.holeHidden }),
        r.dealer.length > 0 ? /* @__PURE__ */ c.jsx("div", { className: "mg-badge", children: zp(r.dealer, r.holeHidden) }) : null
      ] }),
      r.phase === "settle" ? /* @__PURE__ */ c.jsx("div", { className: `mg-banner ${g}`, children: /* @__PURE__ */ c.jsx("div", { className: "mg-banner-text", children: r.message }) }) : null,
      r.phase === "insurance" ? /* @__PURE__ */ c.jsx("div", { className: "mg-banner neutral", children: /* @__PURE__ */ c.jsx("div", { className: "mg-banner-text", children: "Insurance?" }) }) : null,
      /* @__PURE__ */ c.jsxs("div", { className: "mg-players", children: [
        r.playerHands.map((x, R) => {
          const d = Lp(x.outcome), f = r.phase === "playing" && R === r.activeHand;
          return /* @__PURE__ */ c.jsxs("div", { className: `mg-player-hand${f ? " active" : ""}`, children: [
            /* @__PURE__ */ c.jsx(yu, { cards: x.cards }),
            /* @__PURE__ */ c.jsxs("div", { className: "mg-hand-foot", children: [
              x.cards.length > 0 ? /* @__PURE__ */ c.jsx("span", { className: "mg-badge sm", children: Tp(x.cards) }) : null,
              d ? /* @__PURE__ */ c.jsx("span", { className: `mg-outcome ${d.kind}`, children: d.text }) : null
            ] })
          ] }, R);
        }),
        r.playerHands.length === 0 && r.bet > 0 ? /* @__PURE__ */ c.jsx(Dp, { amount: r.bet }) : null,
        r.playerHands.length === 0 && r.bet <= 0 ? /* @__PURE__ */ c.jsx("div", { className: "mg-betspot", children: "Place your bet" }) : null
      ] })
    ] }) }),
    /* @__PURE__ */ c.jsx("div", { className: "mg-actions", children: Fp(r, l, a) })
  ] });
}
function Fp(e, t, n) {
  return e.phase === "betting" ? e.bankroll <= 0 && e.bet <= 0 ? /* @__PURE__ */ c.jsxs("div", { className: "mg-broke", children: [
    /* @__PURE__ */ c.jsx("span", { children: "Out of chips." }),
    /* @__PURE__ */ c.jsxs("button", { className: "mg-btn primary", onClick: () => n(() => t.rebuy()), children: [
      "Buy in $",
      e.settings.startingBankroll
    ] })
  ] }) : /* @__PURE__ */ c.jsxs("div", { className: "mg-bet", children: [
    /* @__PURE__ */ c.jsx("div", { className: "mg-chiprack", children: wp.map((l) => /* @__PURE__ */ c.jsx(
      "button",
      {
        className: "mg-chip-btn",
        disabled: e.bet + l > e.bankroll,
        onClick: () => n(() => t.addChip(l)),
        title: `Bet $${l}`,
        children: /* @__PURE__ */ c.jsx(Fc, { value: l, size: 56 })
      },
      l
    )) }),
    /* @__PURE__ */ c.jsxs("div", { className: "mg-bet-right", children: [
      /* @__PURE__ */ c.jsx("button", { className: "mg-btn ghost", disabled: e.bet <= 0, onClick: () => n(() => t.clearBet()), children: "Clear" }),
      /* @__PURE__ */ c.jsxs("button", { className: "mg-btn primary", disabled: e.bet <= 0, onClick: () => n(() => t.deal()), children: [
        "Deal $",
        e.bet || ""
      ] })
    ] })
  ] }) : e.phase === "insurance" ? /* @__PURE__ */ c.jsxs("div", { className: "mg-row", children: [
    /* @__PURE__ */ c.jsx("button", { className: "mg-btn", onClick: () => n(() => t.takeInsurance()), children: "Insurance (Y)" }),
    /* @__PURE__ */ c.jsx("button", { className: "mg-btn ghost", onClick: () => n(() => t.declineInsurance()), children: "No (N)" })
  ] }) : e.phase === "playing" ? /* @__PURE__ */ c.jsxs("div", { className: "mg-row", children: [
    /* @__PURE__ */ c.jsx("button", { className: "mg-btn primary", onClick: () => n(() => t.hit()), children: "Hit" }),
    /* @__PURE__ */ c.jsx("button", { className: "mg-btn", onClick: () => n(() => t.stand()), children: "Stand" }),
    /* @__PURE__ */ c.jsx("button", { className: "mg-btn", disabled: !t.canDouble(), onClick: () => n(() => t.double()), children: "Double" }),
    /* @__PURE__ */ c.jsx("button", { className: "mg-btn", disabled: !t.canSplit(), onClick: () => n(() => t.split()), children: "Split" })
  ] }) : e.phase === "dealer" ? /* @__PURE__ */ c.jsx("div", { className: "mg-row muted", children: "Dealer plays…" }) : /* @__PURE__ */ c.jsx("div", { className: "mg-row", children: /* @__PURE__ */ c.jsx("button", { className: "mg-btn primary", onClick: () => n(() => t.newRound()), children: "Deal again" }) });
}
class Ap {
  ctx = null;
  muted = !1;
  /** Lazily create + resume the context. Call from a keydown handler. */
  unlock() {
    if (!this.muted) {
      if (!this.ctx)
        try {
          const t = window.AudioContext ?? window.webkitAudioContext;
          this.ctx = t ? new t() : null;
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
  /** One enveloped tone. gain is peak; the fast attack + exponential decay is what
   *  makes it read as a "blip" rather than a click or a drone. */
  tone(t, n, r, l, i = 0) {
    const s = this.ctx;
    if (!s || this.muted) return;
    const o = s.currentTime + i, u = s.createOscillator(), a = s.createGain();
    u.type = r, u.frequency.setValueAtTime(t, o), a.gain.setValueAtTime(1e-4, o), a.gain.linearRampToValueAtTime(l, o + 6e-3), a.gain.exponentialRampToValueAtTime(1e-4, o + n), u.connect(a), a.connect(s.destination), u.start(o), u.stop(o + n + 0.02);
  }
  /** A pitch glide — used for the game-over "fall". */
  glide(t, n, r, l, i) {
    const s = this.ctx;
    if (!s || this.muted) return;
    const o = s.currentTime, u = s.createOscillator(), a = s.createGain();
    u.type = l, u.frequency.setValueAtTime(t, o), u.frequency.exponentialRampToValueAtTime(Math.max(1, n), o + r), a.gain.setValueAtTime(i, o), a.gain.exponentialRampToValueAtTime(1e-4, o + r), u.connect(a), a.connect(s.destination), u.start(o), u.stop(o + r + 0.02);
  }
  /** Eat — a bright two-note pop, pitched up a touch with the score so a long run
   *  feels like it's climbing. This is the sound the whole game is tuned around. */
  eat(t) {
    const n = 540 + Math.min(t, 45) * 7;
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
const Ge = 20, X = 24, Ve = Ge * X, $p = 92, yl = 1, us = 5, Qt = [
  { name: "Neon", bg: "#0a0b12", grid: "rgba(90,220,255,0.07)", snake: "#38f0ff", food: "#ff2d78", glow: !0, shape: "rounded" },
  { name: "Classic", bg: "#9bbc0f", grid: "rgba(15,56,15,0.14)", snake: "#0f380f", food: "#215021", glow: !1, shape: "square" },
  { name: "Midnight", bg: "#0b1026", grid: "rgba(160,180,255,0.06)", snake: "#8aa2ff", food: "#ffd166", glow: !0, shape: "rounded" },
  { name: "Candy", bg: "#fff0f6", grid: "rgba(255,120,170,0.16)", snake: "#ff5fa2", food: "#7c5cff", glow: !1, shape: "rounded" },
  { name: "Ember", bg: "#160f0c", grid: "rgba(255,140,60,0.08)", snake: "#ff8a3d", food: "#ffe14d", glow: !0, shape: "rounded" }
];
class Bp {
  constructor(t, n, r) {
    this.api = n, this.onChange = r;
    const l = t.getContext("2d");
    if (!l) throw new Error("Snake: no 2D canvas context");
    this.g = l;
    const i = Math.max(1, Math.min(3, window.devicePixelRatio || 1));
    t.width = Ve * i, t.height = Ve * i, t.style.width = `${Ve}px`, t.style.height = `${Ve}px`, this.g.scale(i, i), this.loadPrefs(), this.reset(), this.loop = this.loop.bind(this), this.rafId = requestAnimationFrame(this.loop);
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
  audio = new Ap();
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
  setFruitCount(t) {
    const n = Math.max(yl, Math.min(us, Math.round(t)));
    n !== this.fruitCount && (this.fruitCount = n, this.api.storage.set("snake.fruitCount", n).catch(() => {
    }), this.syncFruits(), this.emit());
  }
  setSkin(t) {
    const n = (t % Qt.length + Qt.length) % Qt.length;
    n !== this.skin && (this.skin = n, this.api.storage.set("snake.skin", n).catch(() => {
    }), this.emit());
  }
  dispose() {
    this.disposed = !0, this.rafId !== null && cancelAnimationFrame(this.rafId), this.rafId = null, this.audio.dispose();
  }
  /** Returns true if the key was handled (so the view can preventDefault). */
  handleKey(t) {
    this.audio.unlock();
    const n = t.toLowerCase(), r = n === "arrowup" || n === "w" ? { x: 0, y: -1 } : n === "arrowdown" || n === "s" ? { x: 0, y: 1 } : n === "arrowleft" || n === "a" ? { x: -1, y: 0 } : n === "arrowright" || n === "d" ? { x: 1, y: 0 } : null;
    return r ? (this.status === "ready" && (this.status = "playing", this.lastStep = performance.now(), this.audio.start()), this.status !== "playing" || r.x === -this.dir.x && r.y === -this.dir.y || ((r.x !== this.nextDir.x || r.y !== this.nextDir.y) && this.audio.turn(), this.nextDir = r), !0) : n === " " || n === "spacebar" ? (this.togglePause(), !0) : n === "enter" ? ((this.status === "gameover" || this.status === "ready") && this.newGame(), !0) : n === "m" ? (this.toggleMute(), !0) : !1;
  }
  // --- internals --------------------------------------------------------------
  async loadPrefs() {
    try {
      const [t, n, r] = await Promise.all([
        this.api.storage.get("snake.highScore"),
        this.api.storage.get("snake.fruitCount"),
        this.api.storage.get("snake.skin")
      ]);
      typeof t == "number" && t > this.high && (this.high = t), typeof n == "number" && (this.fruitCount = Math.max(yl, Math.min(us, n))), typeof r == "number" && r >= 0 && r < Qt.length && (this.skin = r), this.syncFruits(), this.emit();
    } catch {
    }
  }
  reset() {
    const t = Math.floor(Ge / 2);
    this.snake = [
      { x: t, y: t },
      { x: t - 1, y: t },
      { x: t - 2, y: t }
    ], this.dir = { x: 1, y: 0 }, this.nextDir = { x: 1, y: 0 }, this.score = 0, this.fruits = [], this.syncFruits(), this.status = "ready", this.emit();
  }
  /** Keep exactly `fruitCount` fruits on the board — top up after eating or after
   *  the count is raised; trim if it was lowered. */
  syncFruits() {
    for (; this.fruits.length > this.fruitCount; ) this.fruits.pop();
    for (; this.fruits.length < this.fruitCount; ) {
      const t = this.freeCell();
      if (!t) break;
      this.fruits.push(t);
    }
  }
  freeCell() {
    const t = /* @__PURE__ */ new Set();
    for (const n of this.snake) t.add(`${n.x},${n.y}`);
    for (const n of this.fruits) t.add(`${n.x},${n.y}`);
    if (t.size >= Ge * Ge) return null;
    for (; ; ) {
      const n = { x: Math.floor(Math.random() * Ge), y: Math.floor(Math.random() * Ge) };
      if (!t.has(`${n.x},${n.y}`)) return n;
    }
  }
  step() {
    this.dir = this.nextDir;
    const t = this.snake[0], n = t.x + this.dir.x, r = t.y + this.dir.y, l = n < 0 || r < 0 || n >= Ge || r >= Ge, i = this.snake.some(
      (o, u) => u < this.snake.length - 1 && o.x === n && o.y === r
    );
    if (l || i) {
      this.gameOver();
      return;
    }
    this.snake.unshift({ x: n, y: r });
    const s = this.fruits.findIndex((o) => o.x === n && o.y === r);
    s >= 0 ? (this.fruits.splice(s, 1), this.score += 1, this.audio.eat(this.score), this.syncFruits()) : this.snake.pop(), this.emit();
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
  loop(t) {
    this.disposed || (this.status === "playing" && t - this.lastStep >= $p && (this.lastStep = t, this.step()), this.render(t), this.rafId = requestAnimationFrame(this.loop));
  }
  // --- rendering --------------------------------------------------------------
  roundRect(t, n, r, l, i) {
    const s = this.g;
    s.beginPath(), s.moveTo(t + i, n), s.arcTo(t + r, n, t + r, n + l, i), s.arcTo(t + r, n + l, t, n + l, i), s.arcTo(t, n + l, t, n, i), s.arcTo(t, n, t + r, n, i), s.closePath();
  }
  render(t) {
    const n = this.g, r = Qt[this.skin];
    n.clearRect(0, 0, Ve, Ve), n.fillStyle = r.bg, n.fillRect(0, 0, Ve, Ve), n.strokeStyle = r.grid, n.lineWidth = 1, n.beginPath();
    for (let s = 1; s < Ge; s++)
      n.moveTo(s * X + 0.5, 0), n.lineTo(s * X + 0.5, Ve), n.moveTo(0, s * X + 0.5), n.lineTo(Ve, s * X + 0.5);
    n.stroke();
    const l = 0.5 + 0.5 * Math.sin(t / 280);
    for (const s of this.fruits) {
      const o = s.x * X + X / 2, u = s.y * X + X / 2;
      if (n.save(), r.glow && (n.shadowColor = r.food, n.shadowBlur = 8 + l * 9), n.fillStyle = r.food, r.shape === "square") {
        const a = X * 0.6;
        n.fillRect(o - a / 2, u - a / 2, a, a);
      } else
        n.beginPath(), n.arc(o, u, X * 0.3 + l * 1.8, 0, Math.PI * 2), n.fill();
      n.restore();
    }
    const i = this.snake.length;
    n.fillStyle = r.snake, r.glow && (n.save(), n.shadowColor = r.snake, n.shadowBlur = 6);
    for (let s = i - 1; s >= 0; s--) {
      const o = this.snake[s], u = 1 - s / Math.max(1, i);
      n.globalAlpha = 0.5 + 0.5 * u;
      const a = r.shape === "square" ? 1 : s === 0 ? 1.5 : 2.4, h = r.shape === "square" ? 0 : 6;
      this.roundRect(o.x * X + a, o.y * X + a, X - 2 * a, X - 2 * a, h), n.fill();
    }
    if (n.globalAlpha = 1, r.glow && n.restore(), r.shape === "rounded") {
      const s = this.snake[0], o = s.x * X, u = s.y * X, a = this.dir, h = { x: a.y, y: a.x }, m = o + X / 2 + a.x * 4, g = u + X / 2 + a.y * 4;
      n.fillStyle = r.bg;
      for (const k of [1, -1])
        n.beginPath(), n.arc(m + h.x * 4 * k, g + h.y * 4 * k, 2.4, 0, Math.PI * 2), n.fill();
    }
  }
}
function Up({ state: e }) {
  if (e.status === "ready")
    return /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
      /* @__PURE__ */ c.jsx("div", { className: "mg-ov-title", children: "Snake" }),
      /* @__PURE__ */ c.jsxs("div", { className: "mg-ov-sub", children: [
        "Press an ",
        /* @__PURE__ */ c.jsx("kbd", { children: "arrow" }),
        " or ",
        /* @__PURE__ */ c.jsx("kbd", { children: "WASD" }),
        " to start"
      ] })
    ] });
  if (e.status === "paused")
    return /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
      /* @__PURE__ */ c.jsx("div", { className: "mg-ov-title", children: "Paused" }),
      /* @__PURE__ */ c.jsxs("div", { className: "mg-ov-sub", children: [
        "Press ",
        /* @__PURE__ */ c.jsx("kbd", { children: "Space" }),
        " to resume"
      ] })
    ] });
  const t = e.score >= e.high && e.score > 0 ? " · new best!" : "";
  return /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
    /* @__PURE__ */ c.jsx("div", { className: "mg-ov-title", children: "Game Over" }),
    /* @__PURE__ */ c.jsx("div", { className: "mg-ov-big", children: e.score }),
    /* @__PURE__ */ c.jsxs("div", { className: "mg-ov-sub", children: [
      "Best ",
      e.high,
      t
    ] }),
    /* @__PURE__ */ c.jsxs("div", { className: "mg-ov-sub", children: [
      "Press ",
      /* @__PURE__ */ c.jsx("kbd", { children: "Enter" }),
      " to play again"
    ] })
  ] });
}
function Hp({ api: e, onExit: t }) {
  const n = ke.useRef(null), r = ke.useRef(null), [l, i] = ke.useState(null);
  ke.useEffect(() => {
    const a = new Bp(n.current, e, i);
    r.current = a;
    const h = (m) => {
      a.handleKey(m.key) && (m.preventDefault(), m.stopPropagation());
    };
    return window.addEventListener("keydown", h), () => {
      window.removeEventListener("keydown", h), a.dispose(), r.current = null;
    };
  }, []);
  const s = r.current, o = l?.fruitCount ?? 1, u = l?.skin ?? 0;
  return /* @__PURE__ */ c.jsxs("div", { className: "mg-snake", children: [
    /* @__PURE__ */ c.jsxs("div", { className: "mg-topbar", children: [
      /* @__PURE__ */ c.jsx("button", { className: "mg-icon-btn", onClick: t, title: "Back to games", children: "‹ Games" }),
      /* @__PURE__ */ c.jsxs("div", { className: "mg-snake-stats", children: [
        /* @__PURE__ */ c.jsxs("span", { className: "mg-stat-pill", children: [
          "Score ",
          /* @__PURE__ */ c.jsx("b", { children: l?.score ?? 0 })
        ] }),
        /* @__PURE__ */ c.jsxs("span", { className: "mg-stat-pill", children: [
          "Best ",
          /* @__PURE__ */ c.jsx("b", { children: l?.high ?? 0 })
        ] })
      ] }),
      /* @__PURE__ */ c.jsx("div", { className: "mg-topbar-right", children: /* @__PURE__ */ c.jsx("button", { className: "mg-icon-btn", onClick: () => s?.toggleMute(), title: "Mute (M)", children: l?.muted ? "🔇" : "♪" }) })
    ] }),
    /* @__PURE__ */ c.jsxs("div", { className: "mg-snake-board", children: [
      /* @__PURE__ */ c.jsx("canvas", { ref: n, className: "mg-snake-canvas" }),
      l && l.status !== "playing" ? /* @__PURE__ */ c.jsx("div", { className: "mg-snake-overlay", children: /* @__PURE__ */ c.jsx(Up, { state: l }) }) : null
    ] }),
    /* @__PURE__ */ c.jsxs("div", { className: "mg-snake-settings", children: [
      /* @__PURE__ */ c.jsxs("div", { className: "mg-control", children: [
        /* @__PURE__ */ c.jsx("span", { className: "mg-set-label", children: "Apples" }),
        /* @__PURE__ */ c.jsx("div", { className: "mg-seg", children: Array.from({ length: us - yl + 1 }, (a, h) => yl + h).map((a) => /* @__PURE__ */ c.jsx(
          "button",
          {
            className: `mg-seg-btn${o === a ? " active" : ""}`,
            onClick: () => s?.setFruitCount(a),
            children: a
          },
          a
        )) })
      ] }),
      /* @__PURE__ */ c.jsxs("div", { className: "mg-control", children: [
        /* @__PURE__ */ c.jsx("span", { className: "mg-set-label", children: "Style" }),
        /* @__PURE__ */ c.jsx("div", { className: "mg-swatches", children: Qt.map((a, h) => /* @__PURE__ */ c.jsxs(
          "button",
          {
            className: `mg-swatch${u === h ? " active" : ""}`,
            title: a.name,
            style: { background: a.bg },
            onClick: () => s?.setSkin(h),
            children: [
              /* @__PURE__ */ c.jsx("span", { className: "mg-sw-snake", style: { background: a.snake } }),
              /* @__PURE__ */ c.jsx("span", { className: "mg-sw-food", style: { background: a.food } })
            ]
          },
          a.name
        )) })
      ] })
    ] }),
    /* @__PURE__ */ c.jsx("div", { className: "mg-snake-hint", children: "Arrows / WASD move · Space pause · Enter restart · M mute" })
  ] });
}
function Vp() {
  return /* @__PURE__ */ c.jsxs("div", { className: "mg-tile-art bj", children: [
    /* @__PURE__ */ c.jsx("span", { className: "mg-tile-card c1", children: /* @__PURE__ */ c.jsx(vl, { rank: "A", suit: "S" }) }),
    /* @__PURE__ */ c.jsx("span", { className: "mg-tile-card c2", children: /* @__PURE__ */ c.jsx(vl, { rank: "K", suit: "H" }) })
  ] });
}
function Wp() {
  return /* @__PURE__ */ c.jsx("div", { className: "mg-tile-art snake", children: /* @__PURE__ */ c.jsxs("svg", { viewBox: "0 0 140 96", width: "140", height: "96", "aria-hidden": "true", children: [
    /* @__PURE__ */ c.jsxs("g", { fill: "#38f0ff", children: [
      /* @__PURE__ */ c.jsx("rect", { x: "22", y: "58", width: "18", height: "18", rx: "5" }),
      /* @__PURE__ */ c.jsx("rect", { x: "40", y: "58", width: "18", height: "18", rx: "5" }),
      /* @__PURE__ */ c.jsx("rect", { x: "58", y: "58", width: "18", height: "18", rx: "5" }),
      /* @__PURE__ */ c.jsx("rect", { x: "58", y: "40", width: "18", height: "18", rx: "5" }),
      /* @__PURE__ */ c.jsx("rect", { x: "58", y: "22", width: "18", height: "18", rx: "5", opacity: "0.95" }),
      /* @__PURE__ */ c.jsx("rect", { x: "76", y: "22", width: "18", height: "18", rx: "5", opacity: "0.95" }),
      /* @__PURE__ */ c.jsx("circle", { cx: "87", cy: "27", r: "1.8", fill: "#0a0b12" }),
      /* @__PURE__ */ c.jsx("circle", { cx: "87", cy: "35", r: "1.8", fill: "#0a0b12" })
    ] }),
    /* @__PURE__ */ c.jsx("circle", { cx: "112", cy: "66", r: "7", fill: "#ff2d78" })
  ] }) });
}
function xu({
  onClick: e,
  art: t,
  name: n,
  desc: r
}) {
  return /* @__PURE__ */ c.jsxs("button", { className: "mg-tile", onClick: e, children: [
    t,
    /* @__PURE__ */ c.jsxs("div", { className: "mg-tile-body", children: [
      /* @__PURE__ */ c.jsx("div", { className: "mg-tile-name", children: n }),
      /* @__PURE__ */ c.jsx("div", { className: "mg-tile-desc", children: r })
    ] })
  ] });
}
function Qp({ onPlay: e }) {
  return /* @__PURE__ */ c.jsxs("div", { className: "mg-launcher", children: [
    /* @__PURE__ */ c.jsxs("header", { className: "mg-launcher-head", children: [
      /* @__PURE__ */ c.jsx("div", { className: "mg-launcher-title", children: "Mini Games" }),
      /* @__PURE__ */ c.jsx("div", { className: "mg-launcher-sub", children: "A little arcade inside Agent Code" })
    ] }),
    /* @__PURE__ */ c.jsxs("div", { className: "mg-grid", children: [
      /* @__PURE__ */ c.jsx(xu, { onClick: () => e("blackjack"), art: /* @__PURE__ */ c.jsx(Vp, {}), name: "Blackjack", desc: "Beat the dealer to 21" }),
      /* @__PURE__ */ c.jsx(xu, { onClick: () => e("snake"), art: /* @__PURE__ */ c.jsx(Wp, {}), name: "Snake", desc: "Eat, grow, don't crash" })
    ] })
  ] });
}
function Kp({ api: e, audio: t }) {
  const n = ke.useSyncExternalStore(at.subscribe, at.get);
  return /* @__PURE__ */ c.jsx("div", { className: "mg-root", children: n === "blackjack" ? /* @__PURE__ */ c.jsx(Ip, { api: e, audio: t, onExit: () => at.show("launcher") }) : n === "snake" ? /* @__PURE__ */ c.jsx(Hp, { api: e, onExit: () => at.show("launcher") }) : /* @__PURE__ */ c.jsx(Qp, { onPlay: (r) => at.show(r) }) });
}
class Yp {
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
  tone(t, n, r, l, i = 0, s) {
    const o = this.ctx;
    if (!o || this.muted) return;
    const u = o.currentTime + i, a = o.createOscillator(), h = o.createGain();
    a.type = r, a.frequency.setValueAtTime(t, u), s !== void 0 && a.frequency.exponentialRampToValueAtTime(Math.max(1, s), u + n), h.gain.setValueAtTime(1e-4, u), h.gain.linearRampToValueAtTime(l, u + 6e-3), h.gain.exponentialRampToValueAtTime(1e-4, u + n), a.connect(h), h.connect(o.destination), a.start(u), a.stop(u + n + 0.02);
  }
  noise(t, n, r, l, i, s = 0) {
    const o = this.ctx;
    if (!o || this.muted || !this.noiseBuf) return;
    const u = o.currentTime + s, a = o.createBufferSource();
    a.buffer = this.noiseBuf;
    const h = o.createBiquadFilter();
    h.type = r, h.frequency.value = l, i && (h.Q.value = i);
    const m = o.createGain();
    m.gain.setValueAtTime(1e-4, u), m.gain.linearRampToValueAtTime(n, u + 3e-3), m.gain.exponentialRampToValueAtTime(1e-4, u + t), a.connect(h), h.connect(m), m.connect(o.destination), a.start(u), a.stop(u + t + 0.02);
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
const Gp = '.mg-root{--bg: #0f1613;--s1: #18211d;--s2: #202b26;--border: rgba(255, 255, 255, .09);--border-hi: rgba(227, 197, 111, .6);--ink: #edf1ec;--muted: #9fb0a5;--faint: #6f7f76;--gold: #e3c56f;--gold-soft: #f0e2b6;--gold-ink: #241b06;--felt-a: #1c7a4d;--felt-b: #0d4a2c;font-family:var(--theme-app-font, ui-sans-serif, system-ui, -apple-system, sans-serif);color:var(--ink);width:520px;max-width:92vw;margin:-1px;border-radius:inherit;background:var(--bg);padding:16px;user-select:none;-webkit-user-select:none}.mg-root *{box-sizing:border-box}.mg-loading{padding:96px 0;text-align:center;color:var(--muted);font-size:14px}.mg-launcher-head{text-align:center;padding:16px 0 24px}.mg-launcher-title{font-family:Georgia,Times New Roman,serif;font-size:30px;font-weight:800;letter-spacing:.3px;color:var(--gold-soft)}.mg-launcher-sub{margin-top:6px;color:var(--muted);font-size:13px}.mg-grid{display:grid;grid-template-columns:1fr 1fr;gap:16px}.mg-tile{display:flex;flex-direction:column;text-align:left;padding:0;border:1px solid var(--border);border-radius:14px;overflow:hidden;background:var(--s1);cursor:pointer;transition:transform .16s ease,border-color .16s ease,background .16s ease}.mg-tile:hover{transform:translateY(-3px);border-color:var(--border-hi);background:var(--s2)}.mg-tile-art{height:128px;display:flex;align-items:center;justify-content:center;position:relative;border-bottom:1px solid var(--border)}.mg-tile-art.bj{background:radial-gradient(100% 120% at 50% 12%,var(--felt-a),var(--felt-b))}.mg-tile-art.bj .mg-tile-card{position:absolute;width:64px;filter:drop-shadow(0 6px 12px rgba(0,0,0,.45))}.mg-tile-art.bj .c1{transform:rotate(-12deg) translate(-16px,4px)}.mg-tile-art.bj .c2{transform:rotate(10deg) translate(16px,-2px)}.mg-tile-art.snake{background:#0a0b12}.mg-tile-body{padding:12px 14px 14px;background:var(--s1)}.mg-tile:hover .mg-tile-body{background:var(--s2)}.mg-tile-name{font-weight:700;font-size:16px;color:var(--ink)}.mg-tile-desc{margin-top:3px;font-size:12.5px;color:var(--muted)}.mg-topbar{display:flex;align-items:center;gap:10px;margin-bottom:12px}.mg-icon-btn{height:30px;min-width:30px;padding:0 10px;display:inline-flex;align-items:center;justify-content:center;font-size:13px;color:var(--muted);background:var(--s1);border:1px solid var(--border);border-radius:9px;cursor:pointer;transition:color .14s,border-color .14s,background .14s}.mg-icon-btn:hover,.mg-icon-btn.on{color:var(--ink);border-color:var(--border-hi);background:var(--s2)}.mg-topbar-right{margin-left:auto;display:flex;align-items:center;gap:8px}.mg-bankroll{display:flex;align-items:center;gap:8px;font-weight:800;font-size:17px;font-variant-numeric:tabular-nums;color:var(--gold-soft)}.mg-bankroll-chip{width:15px;height:15px;border-radius:50%;background:radial-gradient(circle at 40% 35%,#f6d67a,#d4af5a);border:2px solid #b9922f}.mg-stat-sm{font-size:11px;color:var(--muted);font-variant-numeric:tabular-nums}.mg-stat-pill{font-size:12px;color:var(--muted)}.mg-stat-pill b{color:var(--ink);margin-left:4px;font-variant-numeric:tabular-nums}.mg-snake-stats{display:flex;gap:16px;margin-left:4px}.mg-seg{display:inline-flex;border:1px solid var(--border);border-radius:9px;overflow:hidden}.mg-seg-btn{width:30px;height:27px;border:none;border-left:1px solid var(--border);background:transparent;color:var(--muted);cursor:pointer;font-size:12px;font-variant-numeric:tabular-nums;transition:background .12s,color .12s}.mg-seg-btn:first-child{border-left:none}.mg-seg-btn:hover:not(:disabled){color:var(--ink)}.mg-seg-btn.active{background:var(--gold);color:var(--gold-ink);font-weight:700}.mg-seg-btn:disabled{opacity:.5;cursor:default}.mg-swatches{display:inline-flex;gap:7px}.mg-swatch{position:relative;width:28px;height:28px;border-radius:8px;cursor:pointer;padding:0;border:2px solid transparent;outline:1px solid var(--border);outline-offset:-1px;overflow:hidden;transition:transform .12s,border-color .12s}.mg-swatch:hover{transform:translateY(-1px)}.mg-swatch.active{border-color:var(--gold);outline-color:transparent}.mg-sw-snake{position:absolute;left:5px;top:6px;width:12px;height:5px;border-radius:3px}.mg-sw-food{position:absolute;right:5px;bottom:5px;width:7px;height:7px;border-radius:50%}.mg-toggle{width:40px;height:22px;border-radius:12px;border:1px solid var(--border);background:#ffffff14;position:relative;cursor:pointer;transition:background .15s}.mg-toggle.on{background:var(--gold)}.mg-toggle-dot{position:absolute;top:2px;left:2px;width:16px;height:16px;border-radius:50%;background:#fff;transition:transform .15s}.mg-toggle.on .mg-toggle-dot{transform:translate(18px)}.mg-control{display:flex;align-items:center;gap:10px}.mg-set-label{font-size:11px;letter-spacing:.04em;text-transform:uppercase;color:var(--muted)}.mg-settings{margin-bottom:12px;padding:12px 14px;border:1px solid var(--border);border-radius:12px;background:var(--s1);display:flex;flex-direction:column;gap:12px}.mg-set-row{display:flex;align-items:center;justify-content:space-between;gap:12px}.mg-set-hint{font-size:11px;color:var(--faint)}.mg-table{position:relative;width:100%;height:460px;border-radius:24px;overflow:hidden}.mg-felt{position:absolute;inset:0;width:100%;height:100%}.mg-dealer{position:absolute;top:22px;left:0;right:0;display:flex;flex-direction:column;align-items:center;gap:8px}.mg-players{position:absolute;bottom:18px;left:0;right:0;display:flex;justify-content:center;align-items:flex-start;gap:18px;flex-wrap:wrap}.mg-player-hand{display:flex;flex-direction:column;align-items:center;gap:6px;padding:6px;border-radius:12px;transition:box-shadow .2s,background .2s}.mg-player-hand.active{background:#e3c56f14;box-shadow:0 0 0 2px #e3c56f80,0 0 22px #e3c56f38}.mg-hand-foot{display:flex;align-items:center;gap:8px}.mg-hand-bet{font-size:11px;color:var(--gold-soft);font-variant-numeric:tabular-nums}.mg-betspot{color:var(--gold-soft);opacity:.85;font-size:13px;font-variant-numeric:tabular-nums;padding:22px 0}.mg-cards{display:flex;align-items:flex-start}.mg-card-wrap{animation:mg-deal-in .34s cubic-bezier(.2,.9,.3,1.3) both;animation-delay:calc(var(--i) * 40ms)}.mg-card-wrap:not(:first-child){margin-left:-34px}.mg-card{display:block;width:64px;height:auto;filter:drop-shadow(0 4px 7px rgba(0,0,0,.4))}@keyframes mg-deal-in{0%{opacity:0;transform:translate(34px,-46px) rotate(-12deg) scale(.9)}to{opacity:1;transform:none}}.mg-badge{min-width:30px;padding:2px 9px;border-radius:999px;background:#040806b8;border:1px solid rgba(255,255,255,.2);color:#fff;font-size:13px;font-weight:700;text-align:center;font-variant-numeric:tabular-nums}.mg-badge.sm{font-size:12px;padding:1px 8px}.mg-outcome{font-size:11px;font-weight:700;padding:2px 8px;border-radius:999px}.mg-outcome.good{background:#4cbd7638;color:#86e9ab}.mg-outcome.bad{background:#d63c4638;color:#ffa4aa}.mg-outcome.neutral{background:#ffffff1f;color:#dbe0dc}.mg-banner{position:absolute;top:47%;left:50%;transform:translate(-50%,-50%);padding:10px 26px;border-radius:14px;background:#040806cc;border:1px solid var(--border);animation:mg-pop .3s cubic-bezier(.2,.9,.3,1.4) both;z-index:3}.mg-banner-text{font-family:Georgia,serif;font-size:22px;font-weight:800}.mg-banner.good{border-color:var(--gold);box-shadow:0 0 30px #e3c56f52}.mg-banner.good .mg-banner-text{color:var(--gold-soft)}.mg-banner.bad{border-color:#d63c468c}.mg-banner.bad .mg-banner-text{color:#ffa4aa}@keyframes mg-pop{0%{opacity:0;transform:translate(-50%,-50%) scale(.7)}to{opacity:1;transform:translate(-50%,-50%) scale(1)}}.mg-actions{min-height:88px;padding-top:14px;display:flex;align-items:center;justify-content:center}.mg-row{display:flex;gap:10px;justify-content:center;align-items:center;flex-wrap:wrap}.mg-row.muted{color:var(--muted);font-size:14px}.mg-btn{padding:10px 20px;border-radius:11px;font-weight:650;font-size:14px;border:1px solid var(--border);background:var(--s1);color:var(--ink);cursor:pointer;transition:transform .12s,background .14s,filter .14s}.mg-btn:hover:not(:disabled){background:var(--s2);transform:translateY(-1px)}.mg-btn.ghost{background:transparent}.mg-btn.primary{background:var(--gold);color:var(--gold-ink);border-color:var(--gold)}.mg-btn.primary:hover:not(:disabled){filter:brightness(1.07)}.mg-btn:disabled{opacity:.4;cursor:default}.mg-bet{display:flex;align-items:center;justify-content:space-between;width:100%;gap:14px}.mg-chiprack{display:flex;gap:8px;align-items:center}.mg-chip-btn{padding:0;border:none;background:none;cursor:pointer;line-height:0;filter:drop-shadow(0 3px 5px rgba(0,0,0,.45));transition:transform .12s}.mg-chip-btn:hover:not(:disabled){transform:translateY(-6px)}.mg-chip-btn:disabled{opacity:.35;cursor:default}.mg-bet-right{display:flex;gap:8px;align-items:center}.mg-broke{display:flex;align-items:center;gap:14px;color:var(--muted);font-size:14px}.mg-snake{display:flex;flex-direction:column;align-items:center}.mg-snake .mg-topbar{width:100%}.mg-snake-board{position:relative;border-radius:14px;overflow:hidden;box-shadow:0 10px 34px #00000073}.mg-snake-canvas{display:block;border-radius:14px}.mg-snake-overlay{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px;text-align:center;background:#04060899;backdrop-filter:blur(2px);-webkit-backdrop-filter:blur(2px)}.mg-ov-title{font-size:22px;font-weight:700}.mg-ov-big{font-size:46px;font-weight:800;line-height:1;color:var(--gold-soft);font-variant-numeric:tabular-nums}.mg-ov-sub{font-size:12px;color:var(--muted)}.mg-ov-sub kbd,.mg-snake-hint kbd{font-family:var(--theme-font-code, ui-monospace, monospace);font-size:11px;padding:1px 5px;border:1px solid var(--border);border-radius:4px;color:var(--ink)}.mg-snake-settings{display:flex;align-items:center;gap:24px;margin-top:14px}.mg-snake-hint{margin-top:10px;font-size:11px;color:var(--faint)}.mg-root{width:fit-content}.mg-launcher,.mg-snake{width:480px}.mg-bj{width:860px}.mg-card{width:84px}.mg-card-wrap:not(:first-child){margin-left:-46px}.mg-table-3d{perspective:1700px}.mg-table{height:560px;background:#0b3a23}.mg-felt{transform:rotateX(9deg) scale(1.09);transform-origin:center 46%}.mg-dealer{top:30px}.mg-players{bottom:26px}.mg-banner-text{font-size:27px}.mg-banner.good{overflow:hidden}.mg-banner.good:after{content:"";position:absolute;inset:0;background:linear-gradient(115deg,transparent 35%,rgba(255,245,210,.35) 50%,transparent 65%);transform:translate(-120%);animation:mg-shine 1.4s ease-out .15s}@keyframes mg-shine{to{transform:translate(120%)}}.mg-flip{position:relative;width:84px;height:118px;transform-style:preserve-3d;transition:transform .6s cubic-bezier(.3,.85,.25,1.05)}.mg-flip.revealed{transform:rotateY(180deg)}.mg-flip-face{position:absolute;inset:0;backface-visibility:hidden;-webkit-backface-visibility:hidden}.mg-flip-face .mg-card{filter:drop-shadow(0 4px 7px rgba(0,0,0,.4))}.mg-flip-front{transform:rotateY(180deg)}.mg-betstack{position:relative;width:56px;height:66px;margin:8px auto 22px}.mg-betchip{position:absolute;left:4px;bottom:calc(var(--n) * 6px);filter:drop-shadow(0 2px 3px rgba(0,0,0,.5));animation:mg-toss .32s cubic-bezier(.2,.9,.3,1.35) both;animation-delay:calc(var(--n) * 45ms)}.mg-betstack-amt{position:absolute;left:-12px;right:-12px;bottom:-20px;text-align:center;font-size:12px;font-weight:700;color:var(--gold-soft);font-variant-numeric:tabular-nums}@keyframes mg-toss{0%{transform:translateY(-42px) rotate(-22deg);opacity:0}to{transform:none;opacity:1}}.mg-celebrate{position:absolute;inset:0;overflow:hidden;pointer-events:none;z-index:4}.mg-coin{position:absolute;top:-24px;width:13px;height:13px;border-radius:50%;background:linear-gradient(135deg,#ffe9a8,#d6a437);box-shadow:0 0 6px #e6be5a8c;animation:mg-fall 1.5s cubic-bezier(.35,.1,.7,1) forwards;animation-delay:calc(var(--i) * 42ms)}.mg-coin.bj{width:16px;height:16px}@keyframes mg-fall{0%{transform:translateY(0) rotate(0);opacity:1}to{transform:translateY(600px) rotate(560deg);opacity:0}}.mg-player-hand.active{animation:mg-breathe 1.7s ease-in-out infinite}@keyframes mg-breathe{0%,to{box-shadow:0 0 0 2px #e3c56f73,0 0 18px #e3c56f2e}50%{box-shadow:0 0 0 2px #e3c56fb3,0 0 30px #e3c56f57}}.mg-bj .mg-btn{padding:11px 24px;font-size:15px}.mg-bj .mg-btn:active:not(:disabled){transform:translateY(1px)}.mg-chip-btn:active:not(:disabled){transform:translateY(-2px) scale(.96)}', ku = "agent-code-mini-games-styles";
function Xp() {
  if (document.getElementById(ku)) return;
  const e = document.createElement("style");
  e.id = ku, e.textContent = Gp, document.head.append(e);
}
function bp(e) {
  return (t) => {
    Xp();
    const n = new Yp(), r = () => n.unlock();
    window.addEventListener("keydown", r), window.addEventListener("pointerdown", r);
    const l = Rc(t);
    return l.render(/* @__PURE__ */ c.jsx(Kp, { api: e, audio: n })), () => {
      window.removeEventListener("keydown", r), window.removeEventListener("pointerdown", r), n.dispose(), queueMicrotask(() => l.unmount());
    };
  };
}
const { activate: Zp, deactivate: Jp } = {
  async activate(e) {
    e.subscriptions.push(
      e.registerView("mini-games.main", bp(e.api)),
      e.registerCommand("mini-games.blackjack", () => at.show("blackjack")),
      e.registerCommand("mini-games.snake", () => at.show("snake"))
    );
  },
  deactivate() {
    at.show("launcher");
  }
};
export {
  Zp as activate,
  Jp as deactivate
};
