function u4(p) {
  return Object.keys(p).reduce((o, l) => {
    const c = p[l];
    return o[l] = Object.assign({}, c), ju(c.value) && !m4(c.value) && !Array.isArray(c.value) && (o[l].value = Object.assign({}, c.value)), Array.isArray(c.value) && (o[l].value = c.value.slice(0)), o;
  }, {});
}
function l4(p) {
  return p ? Object.keys(p).reduce((o, l) => {
    const c = p[l];
    return o[l] = ju(c) && "value" in c ? c : {
      value: c
    }, o[l].attribute || (o[l].attribute = d4(l)), o[l].parse = "parse" in o[l] ? o[l].parse : typeof o[l].value != "string", o;
  }, {}) : {};
}
function f4(p) {
  return Object.keys(p).reduce((o, l) => (o[l] = p[l].value, o), {});
}
function c4(p, a) {
  const o = u4(a);
  return Object.keys(a).forEach((c) => {
    const h = o[c], b = p.getAttribute(h.attribute), A = p[c];
    b && (h.value = h.parse ? Iu(b) : b), A != null && (h.value = Array.isArray(A) ? A.slice(0) : A), h.reflect && Cu(p, h.attribute, h.value), Object.defineProperty(p, c, {
      get() {
        return h.value;
      },
      set(f) {
        const N = h.value;
        h.value = f, h.reflect && Cu(this, h.attribute, h.value);
        for (let j = 0, F = this.__propertyChangedCallbacks.length; j < F; j++)
          this.__propertyChangedCallbacks[j](c, f, N);
      },
      enumerable: !0,
      configurable: !0
    });
  }), o;
}
function Iu(p) {
  if (p)
    try {
      return JSON.parse(p);
    } catch {
      return p;
    }
}
function Cu(p, a, o) {
  if (o == null || o === !1)
    return p.removeAttribute(a);
  let l = JSON.stringify(o);
  p.__updating[a] = !0, l === "true" && (l = ""), p.setAttribute(a, l), Promise.resolve().then(() => delete p.__updating[a]);
}
function d4(p) {
  return p.replace(/\.?([A-Z]+)/g, (a, o) => "-" + o.toLowerCase()).replace("_", "-").replace(/^-/, "");
}
function ju(p) {
  return p != null && (typeof p == "object" || typeof p == "function");
}
function m4(p) {
  return Object.prototype.toString.call(p) === "[object Function]";
}
function h4(p) {
  return typeof p == "function" && p.toString().indexOf("class") === 0;
}
let ei;
function y4(p, a) {
  const o = Object.keys(a);
  return class extends p {
    static get observedAttributes() {
      return o.map((c) => a[c].attribute);
    }
    constructor() {
      super(), this.__initialized = !1, this.__released = !1, this.__releaseCallbacks = [], this.__propertyChangedCallbacks = [], this.__updating = {}, this.props = {};
    }
    connectedCallback() {
      if (this.__initialized)
        return;
      this.__releaseCallbacks = [], this.__propertyChangedCallbacks = [], this.__updating = {}, this.props = c4(this, a);
      const c = f4(this.props), h = this.Component, b = ei;
      try {
        ei = this, this.__initialized = !0, h4(h) ? new h(c, {
          element: this
        }) : h(c, {
          element: this
        });
      } finally {
        ei = b;
      }
    }
    async disconnectedCallback() {
      if (await Promise.resolve(), this.isConnected)
        return;
      this.__propertyChangedCallbacks.length = 0;
      let c = null;
      for (; c = this.__releaseCallbacks.pop(); )
        c(this);
      delete this.__initialized, this.__released = !0;
    }
    attributeChangedCallback(c, h, b) {
      if (this.__initialized && !this.__updating[c] && (c = this.lookupProp(c), c in a)) {
        if (b == null && !this[c])
          return;
        this[c] = a[c].parse ? Iu(b) : b;
      }
    }
    lookupProp(c) {
      if (a)
        return o.find((h) => c === h || c === a[h].attribute);
    }
    get renderRoot() {
      return this.shadowRoot || this.attachShadow({
        mode: "open"
      });
    }
    addReleaseCallback(c) {
      this.__releaseCallbacks.push(c);
    }
    addPropertyChangedCallback(c) {
      this.__propertyChangedCallbacks.push(c);
    }
  };
}
function E4(p, a = {}, o = {}) {
  const {
    BaseElement: l = HTMLElement,
    extension: c
  } = o;
  return (h) => {
    if (!p)
      throw new Error("tag is required to register a Component");
    let b = customElements.get(p);
    return b ? (b.prototype.Component = h, b) : (b = y4(l, l4(a)), b.prototype.Component = h, b.prototype.registeredTag = p, customElements.define(p, b, c), b);
  };
}
const g4 = (p, a) => p === a, gr = {
  equals: g4
};
let Fu = Gu;
const qe = 1, Rr = 2, qu = {
  owned: null,
  cleanups: null,
  context: null,
  owner: null
};
var ne = null;
let ti = null, R4 = null, J = null, se = null, Pe = null, wr = 0;
function b4(p, a) {
  const o = J, l = ne, c = p.length === 0, h = a === void 0 ? l : a, b = c ? qu : {
    owned: null,
    cleanups: null,
    context: h ? h.context : null,
    owner: h
  }, A = c ? p : () => p(() => Lr(() => Cr(b)));
  ne = b, J = null;
  try {
    return Pt(A, !0);
  } finally {
    J = o, ne = l;
  }
}
function ni(p, a) {
  a = a ? Object.assign({}, gr, a) : gr;
  const o = {
    value: p,
    observers: null,
    observerSlots: null,
    comparator: a.equals || void 0
  }, l = (c) => (typeof c == "function" && (c = c(o.value)), $u(o, c));
  return [Mu.bind(o), l];
}
function et(p, a, o) {
  const l = oi(p, a, !1, qe);
  Nt(l);
}
function A4(p, a, o) {
  Fu = L4;
  const l = oi(p, a, !1, qe);
  (!o || !o.render) && (l.user = !0), Pe ? Pe.push(l) : Nt(l);
}
function hr(p, a, o) {
  o = o ? Object.assign({}, gr, o) : gr;
  const l = oi(p, a, !0, 0);
  return l.observers = null, l.observerSlots = null, l.comparator = o.equals || void 0, Nt(l), Mu.bind(l);
}
function Lr(p) {
  if (J === null)
    return p();
  const a = J;
  J = null;
  try {
    return p();
  } finally {
    J = a;
  }
}
function T4() {
  return ne;
}
function Mu() {
  if (this.sources && this.state)
    if (this.state === qe)
      Nt(this);
    else {
      const p = se;
      se = null, Pt(() => Ar(this), !1), se = p;
    }
  if (J) {
    const p = this.observers ? this.observers.length : 0;
    J.sources ? (J.sources.push(this), J.sourceSlots.push(p)) : (J.sources = [this], J.sourceSlots = [p]), this.observers ? (this.observers.push(J), this.observerSlots.push(J.sources.length - 1)) : (this.observers = [J], this.observerSlots = [J.sources.length - 1]);
  }
  return this.value;
}
function $u(p, a, o) {
  let l = p.value;
  return (!p.comparator || !p.comparator(l, a)) && (p.value = a, p.observers && p.observers.length && Pt(() => {
    for (let c = 0; c < p.observers.length; c += 1) {
      const h = p.observers[c], b = ti && ti.running;
      b && ti.disposed.has(h), (b ? !h.tState : !h.state) && (h.pure ? se.push(h) : Pe.push(h), h.observers && Ou(h)), b || (h.state = qe);
    }
    if (se.length > 1e6)
      throw se = [], new Error();
  }, !1)), a;
}
function Nt(p) {
  if (!p.fn)
    return;
  Cr(p);
  const a = wr;
  v4(
    p,
    p.value,
    a
  );
}
function v4(p, a, o) {
  let l;
  const c = ne, h = J;
  J = ne = p;
  try {
    l = p.fn(a);
  } catch (b) {
    return p.pure && (p.state = qe, p.owned && p.owned.forEach(Cr), p.owned = null), p.updatedAt = o + 1, Xu(b);
  } finally {
    J = h, ne = c;
  }
  (!p.updatedAt || p.updatedAt <= o) && (p.updatedAt != null && "observers" in p ? $u(p, l) : p.value = l, p.updatedAt = o);
}
function oi(p, a, o, l = qe, c) {
  const h = {
    fn: p,
    state: l,
    updatedAt: null,
    owned: null,
    sources: null,
    sourceSlots: null,
    cleanups: null,
    value: a,
    owner: ne,
    context: ne ? ne.context : null,
    pure: o
  };
  return ne === null || ne !== qu && (ne.owned ? ne.owned.push(h) : ne.owned = [h]), h;
}
function br(p) {
  if (p.state === 0)
    return;
  if (p.state === Rr)
    return Ar(p);
  if (p.suspense && Lr(p.suspense.inFallback))
    return p.suspense.effects.push(p);
  const a = [p];
  for (; (p = p.owner) && (!p.updatedAt || p.updatedAt < wr); )
    p.state && a.push(p);
  for (let o = a.length - 1; o >= 0; o--)
    if (p = a[o], p.state === qe)
      Nt(p);
    else if (p.state === Rr) {
      const l = se;
      se = null, Pt(() => Ar(p, a[0]), !1), se = l;
    }
}
function Pt(p, a) {
  if (se)
    return p();
  let o = !1;
  a || (se = []), Pe ? o = !0 : Pe = [], wr++;
  try {
    const l = p();
    return w4(o), l;
  } catch (l) {
    o || (Pe = null), se = null, Xu(l);
  }
}
function w4(p) {
  if (se && (Gu(se), se = null), p)
    return;
  const a = Pe;
  Pe = null, a.length && Pt(() => Fu(a), !1);
}
function Gu(p) {
  for (let a = 0; a < p.length; a++)
    br(p[a]);
}
function L4(p) {
  let a, o = 0;
  for (a = 0; a < p.length; a++) {
    const l = p[a];
    l.user ? p[o++] = l : br(l);
  }
  for (a = 0; a < o; a++)
    br(p[a]);
}
function Ar(p, a) {
  p.state = 0;
  for (let o = 0; o < p.sources.length; o += 1) {
    const l = p.sources[o];
    if (l.sources) {
      const c = l.state;
      c === qe ? l !== a && (!l.updatedAt || l.updatedAt < wr) && br(l) : c === Rr && Ar(l, a);
    }
  }
}
function Ou(p) {
  for (let a = 0; a < p.observers.length; a += 1) {
    const o = p.observers[a];
    o.state || (o.state = Rr, o.pure ? se.push(o) : Pe.push(o), o.observers && Ou(o));
  }
}
function Cr(p) {
  let a;
  if (p.sources)
    for (; p.sources.length; ) {
      const o = p.sources.pop(), l = p.sourceSlots.pop(), c = o.observers;
      if (c && c.length) {
        const h = c.pop(), b = o.observerSlots.pop();
        l < c.length && (h.sourceSlots[b] = l, c[l] = h, o.observerSlots[l] = b);
      }
    }
  if (p.owned) {
    for (a = p.owned.length - 1; a >= 0; a--)
      Cr(p.owned[a]);
    p.owned = null;
  }
  if (p.cleanups) {
    for (a = p.cleanups.length - 1; a >= 0; a--)
      p.cleanups[a]();
    p.cleanups = null;
  }
  p.state = 0;
}
function C4(p) {
  return p instanceof Error ? p : new Error(typeof p == "string" ? p : "Unknown error", {
    cause: p
  });
}
function Xu(p, a = ne) {
  throw C4(p);
}
function _4(p, a, o) {
  let l = o.length, c = a.length, h = l, b = 0, A = 0, f = a[c - 1].nextSibling, N = null;
  for (; b < c || A < h; ) {
    if (a[b] === o[A]) {
      b++, A++;
      continue;
    }
    for (; a[c - 1] === o[h - 1]; )
      c--, h--;
    if (c === b) {
      const j = h < l ? A ? o[A - 1].nextSibling : o[h - A] : f;
      for (; A < h; )
        p.insertBefore(o[A++], j);
    } else if (h === A)
      for (; b < c; )
        (!N || !N.has(a[b])) && a[b].remove(), b++;
    else if (a[b] === o[h - 1] && o[A] === a[c - 1]) {
      const j = a[--c].nextSibling;
      p.insertBefore(o[A++], a[b++].nextSibling), p.insertBefore(o[--h], j), a[c] = o[h];
    } else {
      if (!N) {
        N = /* @__PURE__ */ new Map();
        let F = A;
        for (; F < h; )
          N.set(o[F], F++);
      }
      const j = N.get(a[b]);
      if (j != null)
        if (A < j && j < h) {
          let F = b, M = 1, me;
          for (; ++F < c && F < h && !((me = N.get(a[F])) == null || me !== j + M); )
            M++;
          if (M > j - A) {
            const ce = a[b];
            for (; A < j; )
              p.insertBefore(o[A++], ce);
          } else
            p.replaceChild(o[A++], a[b++]);
        } else
          b++;
      else
        a[b++].remove();
    }
  }
}
const _u = "_$DX_DELEGATE";
function Ie(p, a, o) {
  let l;
  const c = () => {
    const b = document.createElement("template");
    return b.innerHTML = p, o ? b.content.firstChild.firstChild : b.content.firstChild;
  }, h = a ? () => Lr(() => document.importNode(l || (l = c()), !0)) : () => (l || (l = c())).cloneNode(!0);
  return h.cloneNode = h, h;
}
function S4(p, a = window.document) {
  const o = a[_u] || (a[_u] = /* @__PURE__ */ new Set());
  for (let l = 0, c = p.length; l < c; l++) {
    const h = p[l];
    o.has(h) || (o.add(h), a.addEventListener(h, x4));
  }
}
function yr(p, a, o) {
  o == null ? p.removeAttribute(a) : p.setAttribute(a, o);
}
function Su(p, a) {
  a == null ? p.removeAttribute("class") : p.className = a;
}
function xu(p, a, o) {
  return Lr(() => p(a, o));
}
function he(p, a, o, l) {
  if (o !== void 0 && !l && (l = []), typeof a != "function")
    return Tr(p, a, l, o);
  et((c) => Tr(p, a(), c, o), l);
}
function x4(p) {
  const a = `$$${p.type}`;
  let o = p.composedPath && p.composedPath()[0] || p.target;
  for (p.target !== o && Object.defineProperty(p, "target", {
    configurable: !0,
    value: o
  }), Object.defineProperty(p, "currentTarget", {
    configurable: !0,
    get() {
      return o || document;
    }
  }); o; ) {
    const l = o[a];
    if (l && !o.disabled) {
      const c = o[`${a}Data`];
      if (c !== void 0 ? l.call(o, c, p) : l.call(o, p), p.cancelBubble)
        return;
    }
    o = o._$host || o.parentNode || o.host;
  }
}
function Tr(p, a, o, l, c) {
  for (; typeof o == "function"; )
    o = o();
  if (a === o)
    return o;
  const h = typeof a, b = l !== void 0;
  if (p = b && o[0] && o[0].parentNode || p, h === "string" || h === "number")
    if (h === "number" && (a = a.toString()), b) {
      let A = o[0];
      A && A.nodeType === 3 ? A.data !== a && (A.data = a) : A = document.createTextNode(a), o = lt(p, o, l, A);
    } else
      o !== "" && typeof o == "string" ? o = p.firstChild.data = a : o = p.textContent = a;
  else if (a == null || h === "boolean")
    o = lt(p, o, l);
  else {
    if (h === "function")
      return et(() => {
        let A = a();
        for (; typeof A == "function"; )
          A = A();
        o = Tr(p, A, o, l);
      }), () => o;
    if (Array.isArray(a)) {
      const A = [], f = o && Array.isArray(o);
      if (si(A, a, o, c))
        return et(() => o = Tr(p, A, o, l, !0)), () => o;
      if (A.length === 0) {
        if (o = lt(p, o, l), b)
          return o;
      } else
        f ? o.length === 0 ? Bu(p, A, l) : _4(p, o, A) : (o && lt(p), Bu(p, A));
      o = A;
    } else if (a.nodeType) {
      if (Array.isArray(o)) {
        if (b)
          return o = lt(p, o, l, a);
        lt(p, o, null, a);
      } else
        o == null || o === "" || !p.firstChild ? p.appendChild(a) : p.replaceChild(a, p.firstChild);
      o = a;
    }
  }
  return o;
}
function si(p, a, o, l) {
  let c = !1;
  for (let h = 0, b = a.length; h < b; h++) {
    let A = a[h], f = o && o[p.length], N;
    if (!(A == null || A === !0 || A === !1))
      if ((N = typeof A) == "object" && A.nodeType)
        p.push(A);
      else if (Array.isArray(A))
        c = si(p, A, f) || c;
      else if (N === "function")
        if (l) {
          for (; typeof A == "function"; )
            A = A();
          c = si(
            p,
            Array.isArray(A) ? A : [A],
            Array.isArray(f) ? f : [f]
          ) || c;
        } else
          p.push(A), c = !0;
      else {
        const j = String(A);
        f && f.nodeType === 3 && f.data === j ? p.push(f) : p.push(document.createTextNode(j));
      }
  }
  return c;
}
function Bu(p, a, o = null) {
  for (let l = 0, c = a.length; l < c; l++)
    p.insertBefore(a[l], o);
}
function lt(p, a, o, l) {
  if (o === void 0)
    return p.textContent = "";
  const c = l || document.createTextNode("");
  if (a.length) {
    let h = !1;
    for (let b = a.length - 1; b >= 0; b--) {
      const A = a[b];
      if (c !== A) {
        const f = A.parentNode === p;
        !h && !b ? f ? p.replaceChild(c, A) : p.insertBefore(c, o) : f && A.remove();
      } else
        h = !0;
    }
  } else
    p.insertBefore(c, o);
  return [c];
}
function B4(p) {
  const a = Object.keys(p), o = {};
  for (let l = 0; l < a.length; l++) {
    const [c, h] = ni(p[a[l]]);
    Object.defineProperty(o, a[l], {
      get: c,
      set(b) {
        h(() => b);
      }
    });
  }
  return o;
}
function k4(p) {
  if (p.assignedSlot && p.assignedSlot._$owner)
    return p.assignedSlot._$owner;
  let a = p.parentNode;
  for (; a && !a._$owner && !(a.assignedSlot && a.assignedSlot._$owner); )
    a = a.parentNode;
  return a && a.assignedSlot ? a.assignedSlot._$owner : p._$owner;
}
function K4(p) {
  return (a, o) => {
    const { element: l } = o;
    return b4((c) => {
      const h = B4(a);
      l.addPropertyChangedCallback((A, f) => h[A] = f), l.addReleaseCallback(() => {
        l.renderRoot.textContent = "", c();
      });
      const b = p(h, o);
      return he(l.renderRoot, b);
    }, k4(l));
  };
}
function U4(p, a, o) {
  return arguments.length === 2 && (o = a, a = {}), E4(p, a)(K4(o));
}
var V4 = function(p, a, o, l, c) {
  if (l === "m")
    throw new TypeError("Private method is not writable");
  if (l === "a" && !c)
    throw new TypeError("Private accessor was defined without a setter");
  if (typeof a == "function" ? p !== a || !c : !a.has(p))
    throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return l === "a" ? c.call(p, o) : c ? c.value = o : a.set(p, o), o;
}, ku = function(p, a, o, l) {
  if (o === "a" && !l)
    throw new TypeError("Private accessor was defined without a getter");
  if (typeof a == "function" ? p !== a || !l : !a.has(p))
    throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return o === "m" ? l : o === "a" ? l.call(p) : l ? l.value : a.get(p);
}, Ut;
class D4 {
  formatToParts(a) {
    const o = [];
    for (const l of a)
      o.push({ type: "element", value: l }), o.push({ type: "literal", value: ", " });
    return o.slice(0, -1);
  }
}
const N4 = typeof Intl < "u" && Intl.ListFormat || D4, P4 = [
  ["years", "year"],
  ["months", "month"],
  ["weeks", "week"],
  ["days", "day"],
  ["hours", "hour"],
  ["minutes", "minute"],
  ["seconds", "second"],
  ["milliseconds", "millisecond"]
], I4 = { minimumIntegerDigits: 2 };
class j4 {
  constructor(a, o = {}) {
    Ut.set(this, void 0);
    let l = String(o.style || "short");
    l !== "long" && l !== "short" && l !== "narrow" && l !== "digital" && (l = "short");
    let c = l === "digital" ? "numeric" : l;
    const h = o.hours || c;
    c = h === "2-digit" ? "numeric" : h;
    const b = o.minutes || c;
    c = b === "2-digit" ? "numeric" : b;
    const A = o.seconds || c;
    c = A === "2-digit" ? "numeric" : A;
    const f = o.milliseconds || c;
    V4(this, Ut, {
      locale: a,
      style: l,
      years: o.years || l === "digital" ? "short" : l,
      yearsDisplay: o.yearsDisplay === "always" ? "always" : "auto",
      months: o.months || l === "digital" ? "short" : l,
      monthsDisplay: o.monthsDisplay === "always" ? "always" : "auto",
      weeks: o.weeks || l === "digital" ? "short" : l,
      weeksDisplay: o.weeksDisplay === "always" ? "always" : "auto",
      days: o.days || l === "digital" ? "short" : l,
      daysDisplay: o.daysDisplay === "always" ? "always" : "auto",
      hours: h,
      hoursDisplay: o.hoursDisplay === "always" || l === "digital" ? "always" : "auto",
      minutes: b,
      minutesDisplay: o.minutesDisplay === "always" || l === "digital" ? "always" : "auto",
      seconds: A,
      secondsDisplay: o.secondsDisplay === "always" || l === "digital" ? "always" : "auto",
      milliseconds: f,
      millisecondsDisplay: o.millisecondsDisplay === "always" ? "always" : "auto"
    }, "f");
  }
  resolvedOptions() {
    return ku(this, Ut, "f");
  }
  formatToParts(a) {
    const o = [], l = ku(this, Ut, "f"), c = l.style, h = l.locale;
    for (const [b, A] of P4) {
      const f = a[b];
      if (l[`${b}Display`] === "auto" && !f)
        continue;
      const N = l[b], j = N === "2-digit" ? I4 : N === "numeric" ? {} : { style: "unit", unit: A, unitDisplay: N };
      o.push(new Intl.NumberFormat(h, j).format(f));
    }
    return new N4(h, {
      type: "unit",
      style: c === "digital" ? "short" : c
    }).formatToParts(o);
  }
  format(a) {
    return this.formatToParts(a).map((o) => o.value).join("");
  }
}
Ut = /* @__PURE__ */ new WeakMap();
const zu = /^[-+]?P(?:(\d+)Y)?(?:(\d+)M)?(?:(\d+)W)?(?:(\d+)D)?(?:T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?)?$/, vr = ["year", "month", "week", "day", "hour", "minute", "second", "millisecond"], F4 = (p) => zu.test(p);
class de {
  constructor(a = 0, o = 0, l = 0, c = 0, h = 0, b = 0, A = 0, f = 0) {
    this.years = a, this.months = o, this.weeks = l, this.days = c, this.hours = h, this.minutes = b, this.seconds = A, this.milliseconds = f, this.years || (this.years = 0), this.sign || (this.sign = Math.sign(this.years)), this.months || (this.months = 0), this.sign || (this.sign = Math.sign(this.months)), this.weeks || (this.weeks = 0), this.sign || (this.sign = Math.sign(this.weeks)), this.days || (this.days = 0), this.sign || (this.sign = Math.sign(this.days)), this.hours || (this.hours = 0), this.sign || (this.sign = Math.sign(this.hours)), this.minutes || (this.minutes = 0), this.sign || (this.sign = Math.sign(this.minutes)), this.seconds || (this.seconds = 0), this.sign || (this.sign = Math.sign(this.seconds)), this.milliseconds || (this.milliseconds = 0), this.sign || (this.sign = Math.sign(this.milliseconds)), this.blank = this.sign === 0;
  }
  abs() {
    return new de(Math.abs(this.years), Math.abs(this.months), Math.abs(this.weeks), Math.abs(this.days), Math.abs(this.hours), Math.abs(this.minutes), Math.abs(this.seconds), Math.abs(this.milliseconds));
  }
  static from(a) {
    var o;
    if (typeof a == "string") {
      const l = String(a).trim(), c = l.startsWith("-") ? -1 : 1, h = (o = l.match(zu)) === null || o === void 0 ? void 0 : o.slice(1).map((b) => (Number(b) || 0) * c);
      return h ? new de(...h) : new de();
    } else if (typeof a == "object") {
      const { years: l, months: c, weeks: h, days: b, hours: A, minutes: f, seconds: N, milliseconds: j } = a;
      return new de(l, c, h, b, A, f, N, j);
    }
    throw new RangeError("invalid duration");
  }
  static compare(a, o) {
    const l = Date.now(), c = Math.abs(Ku(l, de.from(a)).getTime() - l), h = Math.abs(Ku(l, de.from(o)).getTime() - l);
    return c > h ? -1 : c < h ? 1 : 0;
  }
  toLocaleString(a, o) {
    return new j4(a, o).format(this);
  }
}
function Ku(p, a) {
  const o = new Date(p);
  return o.setFullYear(o.getFullYear() + a.years), o.setMonth(o.getMonth() + a.months), o.setDate(o.getDate() + a.weeks * 7 + a.days), o.setHours(o.getHours() + a.hours), o.setMinutes(o.getMinutes() + a.minutes), o.setSeconds(o.getSeconds() + a.seconds), o;
}
function q4(p, a = "second", o = Date.now()) {
  const l = p.getTime() - o;
  if (l === 0)
    return new de();
  const c = Math.sign(l), h = Math.abs(l), b = Math.floor(h / 1e3), A = Math.floor(b / 60), f = Math.floor(A / 60), N = Math.floor(f / 24), j = Math.floor(N / 30), F = Math.floor(j / 12), M = vr.indexOf(a) || vr.length;
  return new de(M >= 0 ? F * c : 0, M >= 1 ? (j - F * 12) * c : 0, 0, M >= 3 ? (N - j * 30) * c : 0, M >= 4 ? (f - N * 24) * c : 0, M >= 5 ? (A - f * 60) * c : 0, M >= 6 ? (b - A * 60) * c : 0, M >= 7 ? (h - b * 1e3) * c : 0);
}
function Hu(p, { relativeTo: a = Date.now() } = {}) {
  if (a = new Date(a), p.blank)
    return p;
  const o = p.sign;
  let l = Math.abs(p.years), c = Math.abs(p.months), h = Math.abs(p.weeks), b = Math.abs(p.days), A = Math.abs(p.hours), f = Math.abs(p.minutes), N = Math.abs(p.seconds), j = Math.abs(p.milliseconds);
  j >= 900 && (N += Math.round(j / 1e3)), (N || f || A || b || h || c || l) && (j = 0), N >= 55 && (f += Math.round(N / 60)), (f || A || b || h || c || l) && (N = 0), f >= 55 && (A += Math.round(f / 60)), (A || b || h || c || l) && (f = 0), b && A >= 12 && (b += Math.round(A / 24)), !b && A >= 21 && (b += Math.round(A / 24)), (b || h || c || l) && (A = 0);
  const F = a.getFullYear();
  let M = a.getMonth();
  const me = a.getDate();
  if (b >= 27 || l + c + b) {
    const ce = new Date(a);
    ce.setFullYear(F + l * o), ce.setMonth(M + c * o), ce.setDate(me + b * o);
    const Me = ce.getFullYear() - a.getFullYear(), tt = ce.getMonth() - a.getMonth(), je = Math.abs(Math.round((Number(ce) - Number(a)) / 864e5)), Y = Math.abs(Me * 12 + tt);
    je < 27 ? (b >= 6 ? (h += Math.round(b / 7), b = 0) : b = je, c = l = 0) : Y < 11 ? (c = Y, l = 0) : (c = 0, l = Me * o), (c || l) && (b = 0), M = a.getMonth();
  }
  return l && (c = 0), h >= 4 && (c += Math.round(h / 4)), (c || l) && (h = 0), b && h && !c && !l && (h += Math.round(b / 7), b = 0), new de(l * o, c * o, h * o, b * o, A * o, f * o, N * o, j * o);
}
function M4(p, a) {
  const o = Hu(p, a);
  if (o.blank)
    return [0, "second"];
  for (const l of vr) {
    if (l === "millisecond")
      continue;
    const c = o[`${l}s`];
    if (c)
      return [c, l];
  }
  return [0, "second"];
}
var W = function(p, a, o, l) {
  if (o === "a" && !l)
    throw new TypeError("Private accessor was defined without a getter");
  if (typeof a == "function" ? p !== a || !l : !a.has(p))
    throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return o === "m" ? l : o === "a" ? l.call(p) : l ? l.value : a.get(p);
}, Er = function(p, a, o, l, c) {
  if (l === "m")
    throw new TypeError("Private method is not writable");
  if (l === "a" && !c)
    throw new TypeError("Private accessor was defined without a setter");
  if (typeof a == "function" ? p !== a || !c : !a.has(p))
    throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return l === "a" ? c.call(p, o) : c ? c.value = o : a.set(p, o), o;
}, ye, Vt, Dt, Kt, Ye, ai, Zu, Wu, Ju, Qu, ft;
const $4 = globalThis.HTMLElement || null, ri = new de(), Uu = new de(0, 0, 0, 0, 0, 1);
class G4 extends Event {
  constructor(a, o, l, c) {
    super("relative-time-updated", { bubbles: !0, composed: !0 }), this.oldText = a, this.newText = o, this.oldTitle = l, this.newTitle = c;
  }
}
function Vu(p) {
  if (!p.date)
    return 1 / 0;
  if (p.format === "duration" || p.format === "elapsed") {
    const o = p.precision;
    if (o === "second")
      return 1e3;
    if (o === "minute")
      return 60 * 1e3;
  }
  const a = Math.abs(Date.now() - p.date.getTime());
  return a < 60 * 1e3 ? 1e3 : a < 60 * 60 * 1e3 ? 60 * 1e3 : 60 * 60 * 1e3;
}
const ii = new class {
  constructor() {
    this.elements = /* @__PURE__ */ new Set(), this.time = 1 / 0, this.timer = -1;
  }
  observe(p) {
    if (this.elements.has(p))
      return;
    this.elements.add(p);
    const a = p.date;
    if (a && a.getTime()) {
      const o = Vu(p), l = Date.now() + o;
      l < this.time && (clearTimeout(this.timer), this.timer = setTimeout(() => this.update(), o), this.time = l);
    }
  }
  unobserve(p) {
    this.elements.has(p) && this.elements.delete(p);
  }
  update() {
    if (clearTimeout(this.timer), !this.elements.size)
      return;
    let p = 1 / 0;
    for (const a of this.elements)
      p = Math.min(p, Vu(a)), a.update();
    this.time = Math.min(60 * 60 * 1e3, p), this.timer = setTimeout(() => this.update(), this.time), this.time += Date.now();
  }
}();
class O4 extends $4 {
  constructor() {
    super(...arguments), ye.add(this), Vt.set(this, !1), Dt.set(this, !1), Ye.set(this, this.shadowRoot ? this.shadowRoot : this.attachShadow ? this.attachShadow({ mode: "open" }) : this), ft.set(this, null);
  }
  static define(a = "relative-time", o = customElements) {
    return o.define(a, this), this;
  }
  static get observedAttributes() {
    return [
      "second",
      "minute",
      "hour",
      "weekday",
      "day",
      "month",
      "year",
      "time-zone-name",
      "prefix",
      "threshold",
      "tense",
      "precision",
      "format",
      "format-style",
      "datetime",
      "lang",
      "title"
    ];
  }
  get onRelativeTimeUpdated() {
    return W(this, ft, "f");
  }
  set onRelativeTimeUpdated(a) {
    W(this, ft, "f") && this.removeEventListener("relative-time-updated", W(this, ft, "f")), Er(this, ft, typeof a == "object" || typeof a == "function" ? a : null, "f"), typeof a == "function" && this.addEventListener("relative-time-updated", a);
  }
  get second() {
    const a = this.getAttribute("second");
    if (a === "numeric" || a === "2-digit")
      return a;
  }
  set second(a) {
    this.setAttribute("second", a || "");
  }
  get minute() {
    const a = this.getAttribute("minute");
    if (a === "numeric" || a === "2-digit")
      return a;
  }
  set minute(a) {
    this.setAttribute("minute", a || "");
  }
  get hour() {
    const a = this.getAttribute("hour");
    if (a === "numeric" || a === "2-digit")
      return a;
  }
  set hour(a) {
    this.setAttribute("hour", a || "");
  }
  get weekday() {
    const a = this.getAttribute("weekday");
    if (a === "long" || a === "short" || a === "narrow")
      return a;
    if (this.format === "datetime" && a !== "")
      return this.formatStyle;
  }
  set weekday(a) {
    this.setAttribute("weekday", a || "");
  }
  get day() {
    var a;
    const o = (a = this.getAttribute("day")) !== null && a !== void 0 ? a : "numeric";
    if (o === "numeric" || o === "2-digit")
      return o;
  }
  set day(a) {
    this.setAttribute("day", a || "");
  }
  get month() {
    const a = this.format;
    let o = this.getAttribute("month");
    if (o !== "" && (o ?? (o = a === "datetime" ? this.formatStyle : "short"), o === "numeric" || o === "2-digit" || o === "short" || o === "long" || o === "narrow"))
      return o;
  }
  set month(a) {
    this.setAttribute("month", a || "");
  }
  get year() {
    var a;
    const o = this.getAttribute("year");
    if (o === "numeric" || o === "2-digit")
      return o;
    if (!this.hasAttribute("year") && (/* @__PURE__ */ new Date()).getUTCFullYear() !== ((a = this.date) === null || a === void 0 ? void 0 : a.getUTCFullYear()))
      return "numeric";
  }
  set year(a) {
    this.setAttribute("year", a || "");
  }
  get timeZoneName() {
    const a = this.getAttribute("time-zone-name");
    if (a === "long" || a === "short" || a === "shortOffset" || a === "longOffset" || a === "shortGeneric" || a === "longGeneric")
      return a;
  }
  set timeZoneName(a) {
    this.setAttribute("time-zone-name", a || "");
  }
  get prefix() {
    var a;
    return (a = this.getAttribute("prefix")) !== null && a !== void 0 ? a : this.format === "datetime" ? "" : "on";
  }
  set prefix(a) {
    this.setAttribute("prefix", a);
  }
  get threshold() {
    const a = this.getAttribute("threshold");
    return a && F4(a) ? a : "P30D";
  }
  set threshold(a) {
    this.setAttribute("threshold", a);
  }
  get tense() {
    const a = this.getAttribute("tense");
    return a === "past" ? "past" : a === "future" ? "future" : "auto";
  }
  set tense(a) {
    this.setAttribute("tense", a);
  }
  get precision() {
    const a = this.getAttribute("precision");
    return vr.includes(a) ? a : this.format === "micro" ? "minute" : "second";
  }
  set precision(a) {
    this.setAttribute("precision", a);
  }
  get format() {
    const a = this.getAttribute("format");
    return a === "datetime" ? "datetime" : a === "relative" ? "relative" : a === "duration" ? "duration" : a === "micro" ? "micro" : a === "elapsed" ? "elapsed" : "auto";
  }
  set format(a) {
    this.setAttribute("format", a);
  }
  get formatStyle() {
    const a = this.getAttribute("format-style");
    if (a === "long")
      return "long";
    if (a === "short")
      return "short";
    if (a === "narrow")
      return "narrow";
    const o = this.format;
    return o === "elapsed" || o === "micro" ? "narrow" : o === "datetime" ? "short" : "long";
  }
  set formatStyle(a) {
    this.setAttribute("format-style", a);
  }
  get datetime() {
    return this.getAttribute("datetime") || "";
  }
  set datetime(a) {
    this.setAttribute("datetime", a);
  }
  get date() {
    const a = Date.parse(this.datetime);
    return Number.isNaN(a) ? null : new Date(a);
  }
  set date(a) {
    this.datetime = a?.toISOString() || "";
  }
  connectedCallback() {
    this.update();
  }
  disconnectedCallback() {
    ii.unobserve(this);
  }
  attributeChangedCallback(a, o, l) {
    o !== l && (a === "title" && Er(this, Vt, l !== null && (this.date && W(this, ye, "m", ai).call(this, this.date)) !== l, "f"), !W(this, Dt, "f") && !(a === "title" && W(this, Vt, "f")) && Er(this, Dt, (async () => {
      await Promise.resolve(), this.update();
    })(), "f"));
  }
  update() {
    const a = W(this, Ye, "f").textContent || this.textContent || "", o = this.getAttribute("title") || "";
    let l = o;
    const c = this.date;
    if (typeof Intl > "u" || !Intl.DateTimeFormat || !c) {
      W(this, Ye, "f").textContent = a;
      return;
    }
    const h = Date.now();
    W(this, Vt, "f") || (l = W(this, ye, "m", ai).call(this, c) || "", l && this.setAttribute("title", l));
    const b = q4(c, this.precision, h), A = W(this, ye, "m", Zu).call(this, b);
    let f = a;
    A === "duration" ? f = W(this, ye, "m", Wu).call(this, b) : A === "relative" ? f = W(this, ye, "m", Ju).call(this, b) : f = W(this, ye, "m", Qu).call(this, c), f ? W(this, Ye, "f").textContent = f : this.shadowRoot === W(this, Ye, "f") && this.textContent && (W(this, Ye, "f").textContent = this.textContent), (f !== a || l !== o) && this.dispatchEvent(new G4(a, f, o, l)), A === "relative" || A === "duration" ? ii.observe(this) : ii.unobserve(this), Er(this, Dt, !1, "f");
  }
}
Vt = /* @__PURE__ */ new WeakMap(), Dt = /* @__PURE__ */ new WeakMap(), Ye = /* @__PURE__ */ new WeakMap(), ft = /* @__PURE__ */ new WeakMap(), ye = /* @__PURE__ */ new WeakSet(), Kt = function() {
  var a;
  return ((a = this.closest("[lang]")) === null || a === void 0 ? void 0 : a.getAttribute("lang")) || this.ownerDocument.documentElement.getAttribute("lang") || "default";
}, ai = function(a) {
  return new Intl.DateTimeFormat(W(this, ye, "a", Kt), {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZoneName: "short"
  }).format(a);
}, Zu = function(a) {
  const o = this.format;
  if (o === "datetime")
    return "datetime";
  if (o === "duration" || o === "elapsed" || o === "micro")
    return "duration";
  if ((o === "auto" || o === "relative") && typeof Intl < "u" && Intl.RelativeTimeFormat) {
    const l = this.tense;
    if (l === "past" || l === "future" || de.compare(a, this.threshold) === 1)
      return "relative";
  }
  return "datetime";
}, Wu = function(a) {
  const o = W(this, ye, "a", Kt), l = this.format, c = this.formatStyle, h = this.tense;
  let b = ri;
  l === "micro" ? (a = Hu(a), b = Uu, (this.tense === "past" && a.sign !== -1 || this.tense === "future" && a.sign !== 1) && (a = Uu)) : (h === "past" && a.sign !== -1 || h === "future" && a.sign !== 1) && (a = b);
  const A = `${this.precision}sDisplay`;
  return a.blank ? b.toLocaleString(o, { style: c, [A]: "always" }) : a.abs().toLocaleString(o, { style: c });
}, Ju = function(a) {
  const o = new Intl.RelativeTimeFormat(W(this, ye, "a", Kt), {
    numeric: "auto",
    style: this.formatStyle
  }), l = this.tense;
  l === "future" && a.sign !== 1 && (a = ri), l === "past" && a.sign !== -1 && (a = ri);
  const [c, h] = M4(a);
  return h === "second" && c < 10 ? o.format(0, "second") : o.format(c, h);
}, Qu = function(a) {
  const o = new Intl.DateTimeFormat(W(this, ye, "a", Kt), {
    second: this.second,
    minute: this.minute,
    hour: this.hour,
    weekday: this.weekday,
    day: this.day,
    month: this.month,
    year: this.year,
    timeZoneName: this.timeZoneName
  });
  return `${this.prefix} ${o.format(a)}`.trim();
};
const Du = typeof globalThis < "u" ? globalThis : window;
try {
  Du.RelativeTimeElement = O4.define();
} catch (p) {
  if (!(Du.DOMException && p instanceof DOMException && p.name === "NotSupportedError") && !(p instanceof ReferenceError))
    throw p;
}
const X4 = '*,:before,:after{box-sizing:border-box;border-width:0;border-style:solid;border-color:#e5e7eb}:before,:after{--tw-content: ""}html,:host{line-height:1.5;-webkit-text-size-adjust:100%;-moz-tab-size:4;-o-tab-size:4;tab-size:4;font-family:ui-sans-serif,system-ui,sans-serif,"Apple Color Emoji","Segoe UI Emoji",Segoe UI Symbol,"Noto Color Emoji";font-feature-settings:normal;font-variation-settings:normal;-webkit-tap-highlight-color:transparent}body{margin:0;line-height:inherit}hr{height:0;color:inherit;border-top-width:1px}abbr:where([title]){-webkit-text-decoration:underline dotted;text-decoration:underline dotted}h1,h2,h3,h4,h5,h6{font-size:inherit;font-weight:inherit}a{color:inherit;text-decoration:inherit}b,strong{font-weight:bolder}code,kbd,samp,pre{font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,Liberation Mono,Courier New,monospace;font-feature-settings:normal;font-variation-settings:normal;font-size:1em}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-.25em}sup{top:-.5em}table{text-indent:0;border-color:inherit;border-collapse:collapse}button,input,optgroup,select,textarea{font-family:inherit;font-feature-settings:inherit;font-variation-settings:inherit;font-size:100%;font-weight:inherit;line-height:inherit;color:inherit;margin:0;padding:0}button,select{text-transform:none}button,[type=button],[type=reset],[type=submit]{-webkit-appearance:button;background-color:transparent;background-image:none}:-moz-focusring{outline:auto}:-moz-ui-invalid{box-shadow:none}progress{vertical-align:baseline}::-webkit-inner-spin-button,::-webkit-outer-spin-button{height:auto}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}summary{display:list-item}blockquote,dl,dd,h1,h2,h3,h4,h5,h6,hr,figure,p,pre{margin:0}fieldset{margin:0;padding:0}legend{padding:0}ol,ul,menu{list-style:none;margin:0;padding:0}dialog{padding:0}textarea{resize:vertical}input::-moz-placeholder,textarea::-moz-placeholder{opacity:1;color:#9ca3af}input::placeholder,textarea::placeholder{opacity:1;color:#9ca3af}button,[role=button]{cursor:pointer}:disabled{cursor:default}img,svg,video,canvas,audio,iframe,embed,object{display:block;vertical-align:middle}img,video{max-width:100%;height:auto}[hidden]{display:none}*,:before,:after{--tw-border-spacing-x: 0;--tw-border-spacing-y: 0;--tw-translate-x: 0;--tw-translate-y: 0;--tw-rotate: 0;--tw-skew-x: 0;--tw-skew-y: 0;--tw-scale-x: 1;--tw-scale-y: 1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness: proximity;--tw-gradient-from-position: ;--tw-gradient-via-position: ;--tw-gradient-to-position: ;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width: 0px;--tw-ring-offset-color: #fff;--tw-ring-color: rgb(59 130 246 / .5);--tw-ring-offset-shadow: 0 0 #0000;--tw-ring-shadow: 0 0 #0000;--tw-shadow: 0 0 #0000;--tw-shadow-colored: 0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: }::backdrop{--tw-border-spacing-x: 0;--tw-border-spacing-y: 0;--tw-translate-x: 0;--tw-translate-y: 0;--tw-rotate: 0;--tw-skew-x: 0;--tw-skew-y: 0;--tw-scale-x: 1;--tw-scale-y: 1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness: proximity;--tw-gradient-from-position: ;--tw-gradient-via-position: ;--tw-gradient-to-position: ;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width: 0px;--tw-ring-offset-color: #fff;--tw-ring-color: rgb(59 130 246 / .5);--tw-ring-offset-shadow: 0 0 #0000;--tw-ring-shadow: 0 0 #0000;--tw-shadow: 0 0 #0000;--tw-shadow-colored: 0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: }.fixed{position:fixed}.right-5{right:1.25rem}.top-5{top:1.25rem}.col-span-2{grid-column:span 2 / span 2}.mx-1{margin-left:.25rem;margin-right:.25rem}.mx-auto{margin-left:auto;margin-right:auto}.ml-10{margin-left:2.5rem}.mr-1{margin-right:.25rem}.mr-2{margin-right:.5rem}.mt-4{margin-top:1rem}.inline{display:inline}.flex{display:flex}.grid{display:grid}.h-10{height:2.5rem}.h-12{height:3rem}.h-2{height:.5rem}.max-h-\\[90vh\\]{max-height:90vh}.w-10{width:2.5rem}.w-12{width:3rem}.max-w-\\[calc\\(100vw-96px\\)\\]{max-width:calc(100vw - 96px)}.max-w-screen-sm{max-width:640px}.flex-1{flex:1 1 0%}@keyframes pulse{50%{opacity:.5}}.animate-pulse{animation:pulse 2s cubic-bezier(.4,0,.6,1) infinite}.grid-cols-2{grid-template-columns:repeat(2,minmax(0,1fr))}.grid-cols-4{grid-template-columns:repeat(4,minmax(0,1fr))}.items-center{align-items:center}.justify-center{justify-content:center}.gap-1{gap:.25rem}.gap-2{gap:.5rem}.gap-4{gap:1rem}.space-y-2>:not([hidden])~:not([hidden]){--tw-space-y-reverse: 0;margin-top:calc(.5rem * calc(1 - var(--tw-space-y-reverse)));margin-bottom:calc(.5rem * var(--tw-space-y-reverse))}.space-y-6>:not([hidden])~:not([hidden]){--tw-space-y-reverse: 0;margin-top:calc(1.5rem * calc(1 - var(--tw-space-y-reverse)));margin-bottom:calc(1.5rem * var(--tw-space-y-reverse))}.overflow-hidden{overflow:hidden}.text-ellipsis{text-overflow:ellipsis}.whitespace-nowrap{white-space:nowrap}.whitespace-pre-line{white-space:pre-line}.rounded{border-radius:.25rem}.rounded-full{border-radius:9999px}.rounded-lg{border-radius:.5rem}.rounded-md{border-radius:.375rem}.border{border-width:1px}.border-gray-200{--tw-border-opacity: 1;border-color:rgb(229 231 235 / var(--tw-border-opacity))}.bg-gray-900{--tw-bg-opacity: 1;background-color:rgb(17 24 39 / var(--tw-bg-opacity))}.bg-slate-100{--tw-bg-opacity: 1;background-color:rgb(241 245 249 / var(--tw-bg-opacity))}.bg-slate-300{--tw-bg-opacity: 1;background-color:rgb(203 213 225 / var(--tw-bg-opacity))}.bg-slate-900{--tw-bg-opacity: 1;background-color:rgb(15 23 42 / var(--tw-bg-opacity))}.bg-zinc-50{--tw-bg-opacity: 1;background-color:rgb(250 250 250 / var(--tw-bg-opacity))}.px-10{padding-left:2.5rem;padding-right:2.5rem}.py-1{padding-top:.25rem;padding-bottom:.25rem}.py-6{padding-top:1.5rem;padding-bottom:1.5rem}.text-base\\/snug{font-size:1rem;line-height:1.375}.text-sm{font-size:.875rem;line-height:1.25rem}.font-bold{font-weight:700}.font-semibold{font-weight:600}.text-blue-500{--tw-text-opacity: 1;color:rgb(59 130 246 / var(--tw-text-opacity))}.text-gray-700{--tw-text-opacity: 1;color:rgb(55 65 81 / var(--tw-text-opacity))}.text-slate-500{--tw-text-opacity: 1;color:rgb(100 116 139 / var(--tw-text-opacity))}.text-slate-600{--tw-text-opacity: 1;color:rgb(71 85 105 / var(--tw-text-opacity))}.text-white{--tw-text-opacity: 1;color:rgb(255 255 255 / var(--tw-text-opacity))}.underline{text-decoration-line:underline}.drop-shadow-sm{--tw-drop-shadow: drop-shadow(0 1px 1px rgb(0 0 0 / .05));filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)}.filter{filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)}.backdrop\\:bg-gray-800::backdrop{--tw-bg-opacity: 1;background-color:rgb(31 41 55 / var(--tw-bg-opacity))}.backdrop\\:opacity-90::backdrop{opacity:.9}.hover\\:underline:hover{text-decoration-line:underline}.dark\\:bg-slate-800:where(.dark,.dark *){--tw-bg-opacity: 1;background-color:rgb(30 41 59 / var(--tw-bg-opacity))}.dark\\:text-slate-400:where(.dark,.dark *){--tw-text-opacity: 1;color:rgb(148 163 184 / var(--tw-text-opacity))}.dark\\:text-white:where(.dark,.dark *){--tw-text-opacity: 1;color:rgb(255 255 255 / var(--tw-text-opacity))}';
var Yu = { exports: {} };
(function(p) {
  var a = Object.create, o = Object.defineProperty, l = Object.getOwnPropertyDescriptor, c = Object.getOwnPropertyNames, h = Object.getPrototypeOf, b = Object.prototype.hasOwnProperty, A = (t, i) => function() {
    return i || (0, t[c(t)[0]])((i = { exports: {} }).exports, i), i.exports;
  }, f = (t, i) => {
    for (var r in i)
      o(t, r, { get: i[r], enumerable: !0 });
  }, N = (t, i, r, n) => {
    if (i && typeof i == "object" || typeof i == "function")
      for (let s of c(i))
        !b.call(t, s) && s !== r && o(t, s, { get: () => i[s], enumerable: !(n = l(i, s)) || n.enumerable });
    return t;
  }, j = (t, i, r) => (r = t != null ? a(h(t)) : {}, N(i || !t || !t.__esModule ? o(r, "default", { value: t, enumerable: !0 }) : r, t)), F = (t) => N(o({}, "__esModule", { value: !0 }), t), M = A({
    "../../node_modules/.pnpm/graphemer@1.4.0/node_modules/graphemer/lib/boundaries.js"(t) {
      Object.defineProperty(t, "__esModule", { value: !0 }), t.EXTENDED_PICTOGRAPHIC = t.CLUSTER_BREAK = void 0, function(i) {
        i[i.CR = 0] = "CR", i[i.LF = 1] = "LF", i[i.CONTROL = 2] = "CONTROL", i[i.EXTEND = 3] = "EXTEND", i[i.REGIONAL_INDICATOR = 4] = "REGIONAL_INDICATOR", i[i.SPACINGMARK = 5] = "SPACINGMARK", i[i.L = 6] = "L", i[i.V = 7] = "V", i[i.T = 8] = "T", i[i.LV = 9] = "LV", i[i.LVT = 10] = "LVT", i[i.OTHER = 11] = "OTHER", i[i.PREPEND = 12] = "PREPEND", i[i.E_BASE = 13] = "E_BASE", i[i.E_MODIFIER = 14] = "E_MODIFIER", i[i.ZWJ = 15] = "ZWJ", i[i.GLUE_AFTER_ZWJ = 16] = "GLUE_AFTER_ZWJ", i[i.E_BASE_GAZ = 17] = "E_BASE_GAZ";
      }(t.CLUSTER_BREAK || (t.CLUSTER_BREAK = {})), t.EXTENDED_PICTOGRAPHIC = 101;
    }
  }), me = A({
    "../../node_modules/.pnpm/graphemer@1.4.0/node_modules/graphemer/lib/GraphemerHelper.js"(t) {
      Object.defineProperty(t, "__esModule", { value: !0 });
      var i = M(), r = 0, n = 1, s = 2, u = 3, e = 4, d = class {
        static isSurrogate(y, T) {
          return 55296 <= y.charCodeAt(T) && y.charCodeAt(T) <= 56319 && 56320 <= y.charCodeAt(T + 1) && y.charCodeAt(T + 1) <= 57343;
        }
        static codePointAt(y, T) {
          T === void 0 && (T = 0);
          const C = y.charCodeAt(T);
          if (55296 <= C && C <= 56319 && T < y.length - 1) {
            const S = C, O = y.charCodeAt(T + 1);
            return 56320 <= O && O <= 57343 ? (S - 55296) * 1024 + (O - 56320) + 65536 : S;
          }
          if (56320 <= C && C <= 57343 && T >= 1) {
            const S = y.charCodeAt(T - 1), O = C;
            return 55296 <= S && S <= 56319 ? (S - 55296) * 1024 + (O - 56320) + 65536 : O;
          }
          return C;
        }
        static shouldBreak(y, T, C, S, O, Q) {
          const I = [y].concat(T).concat([C]), z = [S].concat(O).concat([Q]), X = I[I.length - 2], G = C, fe = Q, pe = I.lastIndexOf(i.CLUSTER_BREAK.REGIONAL_INDICATOR);
          if (pe > 0 && I.slice(1, pe).every(function(ie) {
            return ie === i.CLUSTER_BREAK.REGIONAL_INDICATOR;
          }) && [i.CLUSTER_BREAK.PREPEND, i.CLUSTER_BREAK.REGIONAL_INDICATOR].indexOf(X) === -1)
            return I.filter(function(ie) {
              return ie === i.CLUSTER_BREAK.REGIONAL_INDICATOR;
            }).length % 2 === 1 ? u : e;
          if (X === i.CLUSTER_BREAK.CR && G === i.CLUSTER_BREAK.LF)
            return r;
          if (X === i.CLUSTER_BREAK.CONTROL || X === i.CLUSTER_BREAK.CR || X === i.CLUSTER_BREAK.LF)
            return n;
          if (G === i.CLUSTER_BREAK.CONTROL || G === i.CLUSTER_BREAK.CR || G === i.CLUSTER_BREAK.LF)
            return n;
          if (X === i.CLUSTER_BREAK.L && (G === i.CLUSTER_BREAK.L || G === i.CLUSTER_BREAK.V || G === i.CLUSTER_BREAK.LV || G === i.CLUSTER_BREAK.LVT))
            return r;
          if ((X === i.CLUSTER_BREAK.LV || X === i.CLUSTER_BREAK.V) && (G === i.CLUSTER_BREAK.V || G === i.CLUSTER_BREAK.T))
            return r;
          if ((X === i.CLUSTER_BREAK.LVT || X === i.CLUSTER_BREAK.T) && G === i.CLUSTER_BREAK.T)
            return r;
          if (G === i.CLUSTER_BREAK.EXTEND || G === i.CLUSTER_BREAK.ZWJ)
            return r;
          if (G === i.CLUSTER_BREAK.SPACINGMARK)
            return r;
          if (X === i.CLUSTER_BREAK.PREPEND)
            return r;
          const q = z.slice(0, -1).lastIndexOf(i.EXTENDED_PICTOGRAPHIC);
          return q !== -1 && z[q] === i.EXTENDED_PICTOGRAPHIC && I.slice(q + 1, -2).every(function(ie) {
            return ie === i.CLUSTER_BREAK.EXTEND;
          }) && X === i.CLUSTER_BREAK.ZWJ && fe === i.EXTENDED_PICTOGRAPHIC ? r : T.indexOf(i.CLUSTER_BREAK.REGIONAL_INDICATOR) !== -1 ? s : X === i.CLUSTER_BREAK.REGIONAL_INDICATOR && G === i.CLUSTER_BREAK.REGIONAL_INDICATOR ? r : n;
        }
      };
      t.default = d;
    }
  }), ce = A({
    "../../node_modules/.pnpm/graphemer@1.4.0/node_modules/graphemer/lib/GraphemerIterator.js"(t) {
      Object.defineProperty(t, "__esModule", { value: !0 });
      var i = class {
        constructor(r, n) {
          this._index = 0, this._str = r, this._nextBreak = n;
        }
        [Symbol.iterator]() {
          return this;
        }
        next() {
          let r;
          if ((r = this._nextBreak(this._str, this._index)) < this._str.length) {
            const n = this._str.slice(this._index, r);
            return this._index = r, { value: n, done: !1 };
          }
          if (this._index < this._str.length) {
            const n = this._str.slice(this._index);
            return this._index = this._str.length, { value: n, done: !1 };
          }
          return { value: void 0, done: !0 };
        }
      };
      t.default = i;
    }
  }), Me = A({
    "../../node_modules/.pnpm/graphemer@1.4.0/node_modules/graphemer/lib/Graphemer.js"(t) {
      var i = t && t.__importDefault || function(e) {
        return e && e.__esModule ? e : { default: e };
      };
      Object.defineProperty(t, "__esModule", { value: !0 });
      var r = M(), n = i(me()), s = i(ce()), u = class {
        static nextBreak(e, d) {
          if (d === void 0 && (d = 0), d < 0)
            return 0;
          if (d >= e.length - 1)
            return e.length;
          const y = n.default.codePointAt(e, d), T = u.getGraphemeBreakProperty(y), C = u.getEmojiProperty(y), S = [], O = [];
          for (let Q = d + 1; Q < e.length; Q++) {
            if (n.default.isSurrogate(e, Q - 1))
              continue;
            const I = n.default.codePointAt(e, Q), z = u.getGraphemeBreakProperty(I), X = u.getEmojiProperty(I);
            if (n.default.shouldBreak(T, S, z, C, O, X))
              return Q;
            S.push(z), O.push(X);
          }
          return e.length;
        }
        splitGraphemes(e) {
          const d = [];
          let y = 0, T;
          for (; (T = u.nextBreak(e, y)) < e.length; )
            d.push(e.slice(y, T)), y = T;
          return y < e.length && d.push(e.slice(y)), d;
        }
        iterateGraphemes(e) {
          return new s.default(e, u.nextBreak);
        }
        countGraphemes(e) {
          let d = 0, y = 0, T;
          for (; (T = u.nextBreak(e, y)) < e.length; )
            y = T, d++;
          return y < e.length && d++, d;
        }
        static getGraphemeBreakProperty(e) {
          if (e < 48905) {
            if (e < 44116) {
              if (e < 4141) {
                if (e < 2818) {
                  if (e < 2363)
                    if (e < 1759) {
                      if (e < 1471) {
                        if (e < 127) {
                          if (e < 11) {
                            if (e < 10) {
                              if (0 <= e && e <= 9)
                                return r.CLUSTER_BREAK.CONTROL;
                            } else if (e === 10)
                              return r.CLUSTER_BREAK.LF;
                          } else if (e < 13) {
                            if (11 <= e && e <= 12)
                              return r.CLUSTER_BREAK.CONTROL;
                          } else if (e < 14) {
                            if (e === 13)
                              return r.CLUSTER_BREAK.CR;
                          } else if (14 <= e && e <= 31)
                            return r.CLUSTER_BREAK.CONTROL;
                        } else if (e < 768) {
                          if (e < 173) {
                            if (127 <= e && e <= 159)
                              return r.CLUSTER_BREAK.CONTROL;
                          } else if (e === 173)
                            return r.CLUSTER_BREAK.CONTROL;
                        } else if (e < 1155) {
                          if (768 <= e && e <= 879)
                            return r.CLUSTER_BREAK.EXTEND;
                        } else if (e < 1425) {
                          if (1155 <= e && e <= 1161)
                            return r.CLUSTER_BREAK.EXTEND;
                        } else if (1425 <= e && e <= 1469)
                          return r.CLUSTER_BREAK.EXTEND;
                      } else if (e < 1552) {
                        if (e < 1476) {
                          if (e < 1473) {
                            if (e === 1471)
                              return r.CLUSTER_BREAK.EXTEND;
                          } else if (1473 <= e && e <= 1474)
                            return r.CLUSTER_BREAK.EXTEND;
                        } else if (e < 1479) {
                          if (1476 <= e && e <= 1477)
                            return r.CLUSTER_BREAK.EXTEND;
                        } else if (e < 1536) {
                          if (e === 1479)
                            return r.CLUSTER_BREAK.EXTEND;
                        } else if (1536 <= e && e <= 1541)
                          return r.CLUSTER_BREAK.PREPEND;
                      } else if (e < 1648) {
                        if (e < 1564) {
                          if (1552 <= e && e <= 1562)
                            return r.CLUSTER_BREAK.EXTEND;
                        } else if (e < 1611) {
                          if (e === 1564)
                            return r.CLUSTER_BREAK.CONTROL;
                        } else if (1611 <= e && e <= 1631)
                          return r.CLUSTER_BREAK.EXTEND;
                      } else if (e < 1750) {
                        if (e === 1648)
                          return r.CLUSTER_BREAK.EXTEND;
                      } else if (e < 1757) {
                        if (1750 <= e && e <= 1756)
                          return r.CLUSTER_BREAK.EXTEND;
                      } else if (e === 1757)
                        return r.CLUSTER_BREAK.PREPEND;
                    } else if (e < 2075) {
                      if (e < 1840)
                        if (e < 1770) {
                          if (e < 1767) {
                            if (1759 <= e && e <= 1764)
                              return r.CLUSTER_BREAK.EXTEND;
                          } else if (1767 <= e && e <= 1768)
                            return r.CLUSTER_BREAK.EXTEND;
                        } else if (e < 1807) {
                          if (1770 <= e && e <= 1773)
                            return r.CLUSTER_BREAK.EXTEND;
                        } else {
                          if (e === 1807)
                            return r.CLUSTER_BREAK.PREPEND;
                          if (e === 1809)
                            return r.CLUSTER_BREAK.EXTEND;
                        }
                      else if (e < 2027) {
                        if (e < 1958) {
                          if (1840 <= e && e <= 1866)
                            return r.CLUSTER_BREAK.EXTEND;
                        } else if (1958 <= e && e <= 1968)
                          return r.CLUSTER_BREAK.EXTEND;
                      } else if (e < 2045) {
                        if (2027 <= e && e <= 2035)
                          return r.CLUSTER_BREAK.EXTEND;
                      } else if (e < 2070) {
                        if (e === 2045)
                          return r.CLUSTER_BREAK.EXTEND;
                      } else if (2070 <= e && e <= 2073)
                        return r.CLUSTER_BREAK.EXTEND;
                    } else if (e < 2200) {
                      if (e < 2089) {
                        if (e < 2085) {
                          if (2075 <= e && e <= 2083)
                            return r.CLUSTER_BREAK.EXTEND;
                        } else if (2085 <= e && e <= 2087)
                          return r.CLUSTER_BREAK.EXTEND;
                      } else if (e < 2137) {
                        if (2089 <= e && e <= 2093)
                          return r.CLUSTER_BREAK.EXTEND;
                      } else if (e < 2192) {
                        if (2137 <= e && e <= 2139)
                          return r.CLUSTER_BREAK.EXTEND;
                      } else if (2192 <= e && e <= 2193)
                        return r.CLUSTER_BREAK.PREPEND;
                    } else if (e < 2275) {
                      if (e < 2250) {
                        if (2200 <= e && e <= 2207)
                          return r.CLUSTER_BREAK.EXTEND;
                      } else if (e < 2274) {
                        if (2250 <= e && e <= 2273)
                          return r.CLUSTER_BREAK.EXTEND;
                      } else if (e === 2274)
                        return r.CLUSTER_BREAK.PREPEND;
                    } else if (e < 2307) {
                      if (2275 <= e && e <= 2306)
                        return r.CLUSTER_BREAK.EXTEND;
                    } else {
                      if (e === 2307)
                        return r.CLUSTER_BREAK.SPACINGMARK;
                      if (e === 2362)
                        return r.CLUSTER_BREAK.EXTEND;
                    }
                  else if (e < 2561) {
                    if (e < 2434) {
                      if (e < 2381) {
                        if (e < 2366) {
                          if (e === 2363)
                            return r.CLUSTER_BREAK.SPACINGMARK;
                          if (e === 2364)
                            return r.CLUSTER_BREAK.EXTEND;
                        } else if (e < 2369) {
                          if (2366 <= e && e <= 2368)
                            return r.CLUSTER_BREAK.SPACINGMARK;
                        } else if (e < 2377) {
                          if (2369 <= e && e <= 2376)
                            return r.CLUSTER_BREAK.EXTEND;
                        } else if (2377 <= e && e <= 2380)
                          return r.CLUSTER_BREAK.SPACINGMARK;
                      } else if (e < 2385) {
                        if (e < 2382) {
                          if (e === 2381)
                            return r.CLUSTER_BREAK.EXTEND;
                        } else if (2382 <= e && e <= 2383)
                          return r.CLUSTER_BREAK.SPACINGMARK;
                      } else if (e < 2402) {
                        if (2385 <= e && e <= 2391)
                          return r.CLUSTER_BREAK.EXTEND;
                      } else if (e < 2433) {
                        if (2402 <= e && e <= 2403)
                          return r.CLUSTER_BREAK.EXTEND;
                      } else if (e === 2433)
                        return r.CLUSTER_BREAK.EXTEND;
                    } else if (e < 2503) {
                      if (e < 2494) {
                        if (e < 2492) {
                          if (2434 <= e && e <= 2435)
                            return r.CLUSTER_BREAK.SPACINGMARK;
                        } else if (e === 2492)
                          return r.CLUSTER_BREAK.EXTEND;
                      } else if (e < 2495) {
                        if (e === 2494)
                          return r.CLUSTER_BREAK.EXTEND;
                      } else if (e < 2497) {
                        if (2495 <= e && e <= 2496)
                          return r.CLUSTER_BREAK.SPACINGMARK;
                      } else if (2497 <= e && e <= 2500)
                        return r.CLUSTER_BREAK.EXTEND;
                    } else if (e < 2519) {
                      if (e < 2507) {
                        if (2503 <= e && e <= 2504)
                          return r.CLUSTER_BREAK.SPACINGMARK;
                      } else if (e < 2509) {
                        if (2507 <= e && e <= 2508)
                          return r.CLUSTER_BREAK.SPACINGMARK;
                      } else if (e === 2509)
                        return r.CLUSTER_BREAK.EXTEND;
                    } else if (e < 2530) {
                      if (e === 2519)
                        return r.CLUSTER_BREAK.EXTEND;
                    } else if (e < 2558) {
                      if (2530 <= e && e <= 2531)
                        return r.CLUSTER_BREAK.EXTEND;
                    } else if (e === 2558)
                      return r.CLUSTER_BREAK.EXTEND;
                  } else if (e < 2691) {
                    if (e < 2631) {
                      if (e < 2620) {
                        if (e < 2563) {
                          if (2561 <= e && e <= 2562)
                            return r.CLUSTER_BREAK.EXTEND;
                        } else if (e === 2563)
                          return r.CLUSTER_BREAK.SPACINGMARK;
                      } else if (e < 2622) {
                        if (e === 2620)
                          return r.CLUSTER_BREAK.EXTEND;
                      } else if (e < 2625) {
                        if (2622 <= e && e <= 2624)
                          return r.CLUSTER_BREAK.SPACINGMARK;
                      } else if (2625 <= e && e <= 2626)
                        return r.CLUSTER_BREAK.EXTEND;
                    } else if (e < 2672) {
                      if (e < 2635) {
                        if (2631 <= e && e <= 2632)
                          return r.CLUSTER_BREAK.EXTEND;
                      } else if (e < 2641) {
                        if (2635 <= e && e <= 2637)
                          return r.CLUSTER_BREAK.EXTEND;
                      } else if (e === 2641)
                        return r.CLUSTER_BREAK.EXTEND;
                    } else if (e < 2677) {
                      if (2672 <= e && e <= 2673)
                        return r.CLUSTER_BREAK.EXTEND;
                    } else if (e < 2689) {
                      if (e === 2677)
                        return r.CLUSTER_BREAK.EXTEND;
                    } else if (2689 <= e && e <= 2690)
                      return r.CLUSTER_BREAK.EXTEND;
                  } else if (e < 2761) {
                    if (e < 2750) {
                      if (e === 2691)
                        return r.CLUSTER_BREAK.SPACINGMARK;
                      if (e === 2748)
                        return r.CLUSTER_BREAK.EXTEND;
                    } else if (e < 2753) {
                      if (2750 <= e && e <= 2752)
                        return r.CLUSTER_BREAK.SPACINGMARK;
                    } else if (e < 2759) {
                      if (2753 <= e && e <= 2757)
                        return r.CLUSTER_BREAK.EXTEND;
                    } else if (2759 <= e && e <= 2760)
                      return r.CLUSTER_BREAK.EXTEND;
                  } else if (e < 2786) {
                    if (e < 2763) {
                      if (e === 2761)
                        return r.CLUSTER_BREAK.SPACINGMARK;
                    } else if (e < 2765) {
                      if (2763 <= e && e <= 2764)
                        return r.CLUSTER_BREAK.SPACINGMARK;
                    } else if (e === 2765)
                      return r.CLUSTER_BREAK.EXTEND;
                  } else if (e < 2810) {
                    if (2786 <= e && e <= 2787)
                      return r.CLUSTER_BREAK.EXTEND;
                  } else if (e < 2817) {
                    if (2810 <= e && e <= 2815)
                      return r.CLUSTER_BREAK.EXTEND;
                  } else if (e === 2817)
                    return r.CLUSTER_BREAK.EXTEND;
                } else if (e < 3315) {
                  if (e < 3076) {
                    if (e < 2946) {
                      if (e < 2887) {
                        if (e < 2878) {
                          if (e < 2876) {
                            if (2818 <= e && e <= 2819)
                              return r.CLUSTER_BREAK.SPACINGMARK;
                          } else if (e === 2876)
                            return r.CLUSTER_BREAK.EXTEND;
                        } else if (e < 2880) {
                          if (2878 <= e && e <= 2879)
                            return r.CLUSTER_BREAK.EXTEND;
                        } else if (e < 2881) {
                          if (e === 2880)
                            return r.CLUSTER_BREAK.SPACINGMARK;
                        } else if (2881 <= e && e <= 2884)
                          return r.CLUSTER_BREAK.EXTEND;
                      } else if (e < 2893) {
                        if (e < 2891) {
                          if (2887 <= e && e <= 2888)
                            return r.CLUSTER_BREAK.SPACINGMARK;
                        } else if (2891 <= e && e <= 2892)
                          return r.CLUSTER_BREAK.SPACINGMARK;
                      } else if (e < 2901) {
                        if (e === 2893)
                          return r.CLUSTER_BREAK.EXTEND;
                      } else if (e < 2914) {
                        if (2901 <= e && e <= 2903)
                          return r.CLUSTER_BREAK.EXTEND;
                      } else if (2914 <= e && e <= 2915)
                        return r.CLUSTER_BREAK.EXTEND;
                    } else if (e < 3014) {
                      if (e < 3007) {
                        if (e === 2946 || e === 3006)
                          return r.CLUSTER_BREAK.EXTEND;
                      } else if (e < 3008) {
                        if (e === 3007)
                          return r.CLUSTER_BREAK.SPACINGMARK;
                      } else if (e < 3009) {
                        if (e === 3008)
                          return r.CLUSTER_BREAK.EXTEND;
                      } else if (3009 <= e && e <= 3010)
                        return r.CLUSTER_BREAK.SPACINGMARK;
                    } else if (e < 3031) {
                      if (e < 3018) {
                        if (3014 <= e && e <= 3016)
                          return r.CLUSTER_BREAK.SPACINGMARK;
                      } else if (e < 3021) {
                        if (3018 <= e && e <= 3020)
                          return r.CLUSTER_BREAK.SPACINGMARK;
                      } else if (e === 3021)
                        return r.CLUSTER_BREAK.EXTEND;
                    } else if (e < 3072) {
                      if (e === 3031)
                        return r.CLUSTER_BREAK.EXTEND;
                    } else if (e < 3073) {
                      if (e === 3072)
                        return r.CLUSTER_BREAK.EXTEND;
                    } else if (3073 <= e && e <= 3075)
                      return r.CLUSTER_BREAK.SPACINGMARK;
                  } else if (e < 3262) {
                    if (e < 3146) {
                      if (e < 3134) {
                        if (e === 3076 || e === 3132)
                          return r.CLUSTER_BREAK.EXTEND;
                      } else if (e < 3137) {
                        if (3134 <= e && e <= 3136)
                          return r.CLUSTER_BREAK.EXTEND;
                      } else if (e < 3142) {
                        if (3137 <= e && e <= 3140)
                          return r.CLUSTER_BREAK.SPACINGMARK;
                      } else if (3142 <= e && e <= 3144)
                        return r.CLUSTER_BREAK.EXTEND;
                    } else if (e < 3201) {
                      if (e < 3157) {
                        if (3146 <= e && e <= 3149)
                          return r.CLUSTER_BREAK.EXTEND;
                      } else if (e < 3170) {
                        if (3157 <= e && e <= 3158)
                          return r.CLUSTER_BREAK.EXTEND;
                      } else if (3170 <= e && e <= 3171)
                        return r.CLUSTER_BREAK.EXTEND;
                    } else if (e < 3202) {
                      if (e === 3201)
                        return r.CLUSTER_BREAK.EXTEND;
                    } else if (e < 3260) {
                      if (3202 <= e && e <= 3203)
                        return r.CLUSTER_BREAK.SPACINGMARK;
                    } else if (e === 3260)
                      return r.CLUSTER_BREAK.EXTEND;
                  } else if (e < 3270) {
                    if (e < 3264) {
                      if (e === 3262)
                        return r.CLUSTER_BREAK.SPACINGMARK;
                      if (e === 3263)
                        return r.CLUSTER_BREAK.EXTEND;
                    } else if (e < 3266) {
                      if (3264 <= e && e <= 3265)
                        return r.CLUSTER_BREAK.SPACINGMARK;
                    } else if (e < 3267) {
                      if (e === 3266)
                        return r.CLUSTER_BREAK.EXTEND;
                    } else if (3267 <= e && e <= 3268)
                      return r.CLUSTER_BREAK.SPACINGMARK;
                  } else if (e < 3276) {
                    if (e < 3271) {
                      if (e === 3270)
                        return r.CLUSTER_BREAK.EXTEND;
                    } else if (e < 3274) {
                      if (3271 <= e && e <= 3272)
                        return r.CLUSTER_BREAK.SPACINGMARK;
                    } else if (3274 <= e && e <= 3275)
                      return r.CLUSTER_BREAK.SPACINGMARK;
                  } else if (e < 3285) {
                    if (3276 <= e && e <= 3277)
                      return r.CLUSTER_BREAK.EXTEND;
                  } else if (e < 3298) {
                    if (3285 <= e && e <= 3286)
                      return r.CLUSTER_BREAK.EXTEND;
                  } else if (3298 <= e && e <= 3299)
                    return r.CLUSTER_BREAK.EXTEND;
                } else if (e < 3551) {
                  if (e < 3406) {
                    if (e < 3391) {
                      if (e < 3330) {
                        if (e < 3328) {
                          if (e === 3315)
                            return r.CLUSTER_BREAK.SPACINGMARK;
                        } else if (3328 <= e && e <= 3329)
                          return r.CLUSTER_BREAK.EXTEND;
                      } else if (e < 3387) {
                        if (3330 <= e && e <= 3331)
                          return r.CLUSTER_BREAK.SPACINGMARK;
                      } else if (e < 3390) {
                        if (3387 <= e && e <= 3388)
                          return r.CLUSTER_BREAK.EXTEND;
                      } else if (e === 3390)
                        return r.CLUSTER_BREAK.EXTEND;
                    } else if (e < 3398) {
                      if (e < 3393) {
                        if (3391 <= e && e <= 3392)
                          return r.CLUSTER_BREAK.SPACINGMARK;
                      } else if (3393 <= e && e <= 3396)
                        return r.CLUSTER_BREAK.EXTEND;
                    } else if (e < 3402) {
                      if (3398 <= e && e <= 3400)
                        return r.CLUSTER_BREAK.SPACINGMARK;
                    } else if (e < 3405) {
                      if (3402 <= e && e <= 3404)
                        return r.CLUSTER_BREAK.SPACINGMARK;
                    } else if (e === 3405)
                      return r.CLUSTER_BREAK.EXTEND;
                  } else if (e < 3530) {
                    if (e < 3426) {
                      if (e === 3406)
                        return r.CLUSTER_BREAK.PREPEND;
                      if (e === 3415)
                        return r.CLUSTER_BREAK.EXTEND;
                    } else if (e < 3457) {
                      if (3426 <= e && e <= 3427)
                        return r.CLUSTER_BREAK.EXTEND;
                    } else if (e < 3458) {
                      if (e === 3457)
                        return r.CLUSTER_BREAK.EXTEND;
                    } else if (3458 <= e && e <= 3459)
                      return r.CLUSTER_BREAK.SPACINGMARK;
                  } else if (e < 3538) {
                    if (e < 3535) {
                      if (e === 3530)
                        return r.CLUSTER_BREAK.EXTEND;
                    } else if (e < 3536) {
                      if (e === 3535)
                        return r.CLUSTER_BREAK.EXTEND;
                    } else if (3536 <= e && e <= 3537)
                      return r.CLUSTER_BREAK.SPACINGMARK;
                  } else if (e < 3542) {
                    if (3538 <= e && e <= 3540)
                      return r.CLUSTER_BREAK.EXTEND;
                  } else if (e < 3544) {
                    if (e === 3542)
                      return r.CLUSTER_BREAK.EXTEND;
                  } else if (3544 <= e && e <= 3550)
                    return r.CLUSTER_BREAK.SPACINGMARK;
                } else if (e < 3893) {
                  if (e < 3655) {
                    if (e < 3633) {
                      if (e < 3570) {
                        if (e === 3551)
                          return r.CLUSTER_BREAK.EXTEND;
                      } else if (3570 <= e && e <= 3571)
                        return r.CLUSTER_BREAK.SPACINGMARK;
                    } else if (e < 3635) {
                      if (e === 3633)
                        return r.CLUSTER_BREAK.EXTEND;
                    } else if (e < 3636) {
                      if (e === 3635)
                        return r.CLUSTER_BREAK.SPACINGMARK;
                    } else if (3636 <= e && e <= 3642)
                      return r.CLUSTER_BREAK.EXTEND;
                  } else if (e < 3764)
                    if (e < 3761) {
                      if (3655 <= e && e <= 3662)
                        return r.CLUSTER_BREAK.EXTEND;
                    } else {
                      if (e === 3761)
                        return r.CLUSTER_BREAK.EXTEND;
                      if (e === 3763)
                        return r.CLUSTER_BREAK.SPACINGMARK;
                    }
                  else if (e < 3784) {
                    if (3764 <= e && e <= 3772)
                      return r.CLUSTER_BREAK.EXTEND;
                  } else if (e < 3864) {
                    if (3784 <= e && e <= 3790)
                      return r.CLUSTER_BREAK.EXTEND;
                  } else if (3864 <= e && e <= 3865)
                    return r.CLUSTER_BREAK.EXTEND;
                } else if (e < 3967) {
                  if (e < 3897) {
                    if (e === 3893 || e === 3895)
                      return r.CLUSTER_BREAK.EXTEND;
                  } else if (e < 3902) {
                    if (e === 3897)
                      return r.CLUSTER_BREAK.EXTEND;
                  } else if (e < 3953) {
                    if (3902 <= e && e <= 3903)
                      return r.CLUSTER_BREAK.SPACINGMARK;
                  } else if (3953 <= e && e <= 3966)
                    return r.CLUSTER_BREAK.EXTEND;
                } else if (e < 3981) {
                  if (e < 3968) {
                    if (e === 3967)
                      return r.CLUSTER_BREAK.SPACINGMARK;
                  } else if (e < 3974) {
                    if (3968 <= e && e <= 3972)
                      return r.CLUSTER_BREAK.EXTEND;
                  } else if (3974 <= e && e <= 3975)
                    return r.CLUSTER_BREAK.EXTEND;
                } else if (e < 3993) {
                  if (3981 <= e && e <= 3991)
                    return r.CLUSTER_BREAK.EXTEND;
                } else if (e < 4038) {
                  if (3993 <= e && e <= 4028)
                    return r.CLUSTER_BREAK.EXTEND;
                } else if (e === 4038)
                  return r.CLUSTER_BREAK.EXTEND;
              } else if (e < 7204) {
                if (e < 6448) {
                  if (e < 5938) {
                    if (e < 4226) {
                      if (e < 4157) {
                        if (e < 4146) {
                          if (e < 4145) {
                            if (4141 <= e && e <= 4144)
                              return r.CLUSTER_BREAK.EXTEND;
                          } else if (e === 4145)
                            return r.CLUSTER_BREAK.SPACINGMARK;
                        } else if (e < 4153) {
                          if (4146 <= e && e <= 4151)
                            return r.CLUSTER_BREAK.EXTEND;
                        } else if (e < 4155) {
                          if (4153 <= e && e <= 4154)
                            return r.CLUSTER_BREAK.EXTEND;
                        } else if (4155 <= e && e <= 4156)
                          return r.CLUSTER_BREAK.SPACINGMARK;
                      } else if (e < 4184) {
                        if (e < 4182) {
                          if (4157 <= e && e <= 4158)
                            return r.CLUSTER_BREAK.EXTEND;
                        } else if (4182 <= e && e <= 4183)
                          return r.CLUSTER_BREAK.SPACINGMARK;
                      } else if (e < 4190) {
                        if (4184 <= e && e <= 4185)
                          return r.CLUSTER_BREAK.EXTEND;
                      } else if (e < 4209) {
                        if (4190 <= e && e <= 4192)
                          return r.CLUSTER_BREAK.EXTEND;
                      } else if (4209 <= e && e <= 4212)
                        return r.CLUSTER_BREAK.EXTEND;
                    } else if (e < 4352) {
                      if (e < 4229) {
                        if (e === 4226)
                          return r.CLUSTER_BREAK.EXTEND;
                        if (e === 4228)
                          return r.CLUSTER_BREAK.SPACINGMARK;
                      } else if (e < 4237) {
                        if (4229 <= e && e <= 4230)
                          return r.CLUSTER_BREAK.EXTEND;
                      } else if (e === 4237 || e === 4253)
                        return r.CLUSTER_BREAK.EXTEND;
                    } else if (e < 4957) {
                      if (e < 4448) {
                        if (4352 <= e && e <= 4447)
                          return r.CLUSTER_BREAK.L;
                      } else if (e < 4520) {
                        if (4448 <= e && e <= 4519)
                          return r.CLUSTER_BREAK.V;
                      } else if (4520 <= e && e <= 4607)
                        return r.CLUSTER_BREAK.T;
                    } else if (e < 5906) {
                      if (4957 <= e && e <= 4959)
                        return r.CLUSTER_BREAK.EXTEND;
                    } else if (e < 5909) {
                      if (5906 <= e && e <= 5908)
                        return r.CLUSTER_BREAK.EXTEND;
                    } else if (e === 5909)
                      return r.CLUSTER_BREAK.SPACINGMARK;
                  } else if (e < 6089) {
                    if (e < 6070) {
                      if (e < 5970) {
                        if (e < 5940) {
                          if (5938 <= e && e <= 5939)
                            return r.CLUSTER_BREAK.EXTEND;
                        } else if (e === 5940)
                          return r.CLUSTER_BREAK.SPACINGMARK;
                      } else if (e < 6002) {
                        if (5970 <= e && e <= 5971)
                          return r.CLUSTER_BREAK.EXTEND;
                      } else if (e < 6068) {
                        if (6002 <= e && e <= 6003)
                          return r.CLUSTER_BREAK.EXTEND;
                      } else if (6068 <= e && e <= 6069)
                        return r.CLUSTER_BREAK.EXTEND;
                    } else if (e < 6078) {
                      if (e < 6071) {
                        if (e === 6070)
                          return r.CLUSTER_BREAK.SPACINGMARK;
                      } else if (6071 <= e && e <= 6077)
                        return r.CLUSTER_BREAK.EXTEND;
                    } else if (e < 6086) {
                      if (6078 <= e && e <= 6085)
                        return r.CLUSTER_BREAK.SPACINGMARK;
                    } else if (e < 6087) {
                      if (e === 6086)
                        return r.CLUSTER_BREAK.EXTEND;
                    } else if (6087 <= e && e <= 6088)
                      return r.CLUSTER_BREAK.SPACINGMARK;
                  } else if (e < 6277)
                    if (e < 6155) {
                      if (e < 6109) {
                        if (6089 <= e && e <= 6099)
                          return r.CLUSTER_BREAK.EXTEND;
                      } else if (e === 6109)
                        return r.CLUSTER_BREAK.EXTEND;
                    } else if (e < 6158) {
                      if (6155 <= e && e <= 6157)
                        return r.CLUSTER_BREAK.EXTEND;
                    } else {
                      if (e === 6158)
                        return r.CLUSTER_BREAK.CONTROL;
                      if (e === 6159)
                        return r.CLUSTER_BREAK.EXTEND;
                    }
                  else if (e < 6435) {
                    if (e < 6313) {
                      if (6277 <= e && e <= 6278)
                        return r.CLUSTER_BREAK.EXTEND;
                    } else if (e < 6432) {
                      if (e === 6313)
                        return r.CLUSTER_BREAK.EXTEND;
                    } else if (6432 <= e && e <= 6434)
                      return r.CLUSTER_BREAK.EXTEND;
                  } else if (e < 6439) {
                    if (6435 <= e && e <= 6438)
                      return r.CLUSTER_BREAK.SPACINGMARK;
                  } else if (e < 6441) {
                    if (6439 <= e && e <= 6440)
                      return r.CLUSTER_BREAK.EXTEND;
                  } else if (6441 <= e && e <= 6443)
                    return r.CLUSTER_BREAK.SPACINGMARK;
                } else if (e < 6971) {
                  if (e < 6744)
                    if (e < 6681) {
                      if (e < 6451) {
                        if (e < 6450) {
                          if (6448 <= e && e <= 6449)
                            return r.CLUSTER_BREAK.SPACINGMARK;
                        } else if (e === 6450)
                          return r.CLUSTER_BREAK.EXTEND;
                      } else if (e < 6457) {
                        if (6451 <= e && e <= 6456)
                          return r.CLUSTER_BREAK.SPACINGMARK;
                      } else if (e < 6679) {
                        if (6457 <= e && e <= 6459)
                          return r.CLUSTER_BREAK.EXTEND;
                      } else if (6679 <= e && e <= 6680)
                        return r.CLUSTER_BREAK.EXTEND;
                    } else if (e < 6741) {
                      if (e < 6683) {
                        if (6681 <= e && e <= 6682)
                          return r.CLUSTER_BREAK.SPACINGMARK;
                      } else if (e === 6683)
                        return r.CLUSTER_BREAK.EXTEND;
                    } else if (e < 6742) {
                      if (e === 6741)
                        return r.CLUSTER_BREAK.SPACINGMARK;
                    } else {
                      if (e === 6742)
                        return r.CLUSTER_BREAK.EXTEND;
                      if (e === 6743)
                        return r.CLUSTER_BREAK.SPACINGMARK;
                    }
                  else if (e < 6771) {
                    if (e < 6754) {
                      if (e < 6752) {
                        if (6744 <= e && e <= 6750)
                          return r.CLUSTER_BREAK.EXTEND;
                      } else if (e === 6752)
                        return r.CLUSTER_BREAK.EXTEND;
                    } else if (e < 6757) {
                      if (e === 6754)
                        return r.CLUSTER_BREAK.EXTEND;
                    } else if (e < 6765) {
                      if (6757 <= e && e <= 6764)
                        return r.CLUSTER_BREAK.EXTEND;
                    } else if (6765 <= e && e <= 6770)
                      return r.CLUSTER_BREAK.SPACINGMARK;
                  } else if (e < 6912) {
                    if (e < 6783) {
                      if (6771 <= e && e <= 6780)
                        return r.CLUSTER_BREAK.EXTEND;
                    } else if (e < 6832) {
                      if (e === 6783)
                        return r.CLUSTER_BREAK.EXTEND;
                    } else if (6832 <= e && e <= 6862)
                      return r.CLUSTER_BREAK.EXTEND;
                  } else if (e < 6916) {
                    if (6912 <= e && e <= 6915)
                      return r.CLUSTER_BREAK.EXTEND;
                  } else if (e < 6964) {
                    if (e === 6916)
                      return r.CLUSTER_BREAK.SPACINGMARK;
                  } else if (6964 <= e && e <= 6970)
                    return r.CLUSTER_BREAK.EXTEND;
                } else if (e < 7080) {
                  if (e < 7019) {
                    if (e < 6973) {
                      if (e === 6971)
                        return r.CLUSTER_BREAK.SPACINGMARK;
                      if (e === 6972)
                        return r.CLUSTER_BREAK.EXTEND;
                    } else if (e < 6978) {
                      if (6973 <= e && e <= 6977)
                        return r.CLUSTER_BREAK.SPACINGMARK;
                    } else if (e < 6979) {
                      if (e === 6978)
                        return r.CLUSTER_BREAK.EXTEND;
                    } else if (6979 <= e && e <= 6980)
                      return r.CLUSTER_BREAK.SPACINGMARK;
                  } else if (e < 7073) {
                    if (e < 7040) {
                      if (7019 <= e && e <= 7027)
                        return r.CLUSTER_BREAK.EXTEND;
                    } else if (e < 7042) {
                      if (7040 <= e && e <= 7041)
                        return r.CLUSTER_BREAK.EXTEND;
                    } else if (e === 7042)
                      return r.CLUSTER_BREAK.SPACINGMARK;
                  } else if (e < 7074) {
                    if (e === 7073)
                      return r.CLUSTER_BREAK.SPACINGMARK;
                  } else if (e < 7078) {
                    if (7074 <= e && e <= 7077)
                      return r.CLUSTER_BREAK.EXTEND;
                  } else if (7078 <= e && e <= 7079)
                    return r.CLUSTER_BREAK.SPACINGMARK;
                } else if (e < 7144)
                  if (e < 7083) {
                    if (e < 7082) {
                      if (7080 <= e && e <= 7081)
                        return r.CLUSTER_BREAK.EXTEND;
                    } else if (e === 7082)
                      return r.CLUSTER_BREAK.SPACINGMARK;
                  } else if (e < 7142) {
                    if (7083 <= e && e <= 7085)
                      return r.CLUSTER_BREAK.EXTEND;
                  } else {
                    if (e === 7142)
                      return r.CLUSTER_BREAK.EXTEND;
                    if (e === 7143)
                      return r.CLUSTER_BREAK.SPACINGMARK;
                  }
                else if (e < 7150) {
                  if (e < 7146) {
                    if (7144 <= e && e <= 7145)
                      return r.CLUSTER_BREAK.EXTEND;
                  } else if (e < 7149) {
                    if (7146 <= e && e <= 7148)
                      return r.CLUSTER_BREAK.SPACINGMARK;
                  } else if (e === 7149)
                    return r.CLUSTER_BREAK.EXTEND;
                } else if (e < 7151) {
                  if (e === 7150)
                    return r.CLUSTER_BREAK.SPACINGMARK;
                } else if (e < 7154) {
                  if (7151 <= e && e <= 7153)
                    return r.CLUSTER_BREAK.EXTEND;
                } else if (7154 <= e && e <= 7155)
                  return r.CLUSTER_BREAK.SPACINGMARK;
              } else if (e < 43346) {
                if (e < 11647) {
                  if (e < 7415) {
                    if (e < 7380) {
                      if (e < 7220) {
                        if (e < 7212) {
                          if (7204 <= e && e <= 7211)
                            return r.CLUSTER_BREAK.SPACINGMARK;
                        } else if (7212 <= e && e <= 7219)
                          return r.CLUSTER_BREAK.EXTEND;
                      } else if (e < 7222) {
                        if (7220 <= e && e <= 7221)
                          return r.CLUSTER_BREAK.SPACINGMARK;
                      } else if (e < 7376) {
                        if (7222 <= e && e <= 7223)
                          return r.CLUSTER_BREAK.EXTEND;
                      } else if (7376 <= e && e <= 7378)
                        return r.CLUSTER_BREAK.EXTEND;
                    } else if (e < 7394) {
                      if (e < 7393) {
                        if (7380 <= e && e <= 7392)
                          return r.CLUSTER_BREAK.EXTEND;
                      } else if (e === 7393)
                        return r.CLUSTER_BREAK.SPACINGMARK;
                    } else if (e < 7405) {
                      if (7394 <= e && e <= 7400)
                        return r.CLUSTER_BREAK.EXTEND;
                    } else if (e === 7405 || e === 7412)
                      return r.CLUSTER_BREAK.EXTEND;
                  } else if (e < 8205)
                    if (e < 7616) {
                      if (e < 7416) {
                        if (e === 7415)
                          return r.CLUSTER_BREAK.SPACINGMARK;
                      } else if (7416 <= e && e <= 7417)
                        return r.CLUSTER_BREAK.EXTEND;
                    } else if (e < 8203) {
                      if (7616 <= e && e <= 7679)
                        return r.CLUSTER_BREAK.EXTEND;
                    } else {
                      if (e === 8203)
                        return r.CLUSTER_BREAK.CONTROL;
                      if (e === 8204)
                        return r.CLUSTER_BREAK.EXTEND;
                    }
                  else if (e < 8288) {
                    if (e < 8206) {
                      if (e === 8205)
                        return r.CLUSTER_BREAK.ZWJ;
                    } else if (e < 8232) {
                      if (8206 <= e && e <= 8207)
                        return r.CLUSTER_BREAK.CONTROL;
                    } else if (8232 <= e && e <= 8238)
                      return r.CLUSTER_BREAK.CONTROL;
                  } else if (e < 8400) {
                    if (8288 <= e && e <= 8303)
                      return r.CLUSTER_BREAK.CONTROL;
                  } else if (e < 11503) {
                    if (8400 <= e && e <= 8432)
                      return r.CLUSTER_BREAK.EXTEND;
                  } else if (11503 <= e && e <= 11505)
                    return r.CLUSTER_BREAK.EXTEND;
                } else if (e < 43043) {
                  if (e < 42612) {
                    if (e < 12330) {
                      if (e < 11744) {
                        if (e === 11647)
                          return r.CLUSTER_BREAK.EXTEND;
                      } else if (11744 <= e && e <= 11775)
                        return r.CLUSTER_BREAK.EXTEND;
                    } else if (e < 12441) {
                      if (12330 <= e && e <= 12335)
                        return r.CLUSTER_BREAK.EXTEND;
                    } else if (e < 42607) {
                      if (12441 <= e && e <= 12442)
                        return r.CLUSTER_BREAK.EXTEND;
                    } else if (42607 <= e && e <= 42610)
                      return r.CLUSTER_BREAK.EXTEND;
                  } else if (e < 43010) {
                    if (e < 42654) {
                      if (42612 <= e && e <= 42621)
                        return r.CLUSTER_BREAK.EXTEND;
                    } else if (e < 42736) {
                      if (42654 <= e && e <= 42655)
                        return r.CLUSTER_BREAK.EXTEND;
                    } else if (42736 <= e && e <= 42737)
                      return r.CLUSTER_BREAK.EXTEND;
                  } else if (e < 43014) {
                    if (e === 43010)
                      return r.CLUSTER_BREAK.EXTEND;
                  } else if (e === 43014 || e === 43019)
                    return r.CLUSTER_BREAK.EXTEND;
                } else if (e < 43188) {
                  if (e < 43047) {
                    if (e < 43045) {
                      if (43043 <= e && e <= 43044)
                        return r.CLUSTER_BREAK.SPACINGMARK;
                    } else if (43045 <= e && e <= 43046)
                      return r.CLUSTER_BREAK.EXTEND;
                  } else if (e < 43052) {
                    if (e === 43047)
                      return r.CLUSTER_BREAK.SPACINGMARK;
                  } else if (e < 43136) {
                    if (e === 43052)
                      return r.CLUSTER_BREAK.EXTEND;
                  } else if (43136 <= e && e <= 43137)
                    return r.CLUSTER_BREAK.SPACINGMARK;
                } else if (e < 43263) {
                  if (e < 43204) {
                    if (43188 <= e && e <= 43203)
                      return r.CLUSTER_BREAK.SPACINGMARK;
                  } else if (e < 43232) {
                    if (43204 <= e && e <= 43205)
                      return r.CLUSTER_BREAK.EXTEND;
                  } else if (43232 <= e && e <= 43249)
                    return r.CLUSTER_BREAK.EXTEND;
                } else if (e < 43302) {
                  if (e === 43263)
                    return r.CLUSTER_BREAK.EXTEND;
                } else if (e < 43335) {
                  if (43302 <= e && e <= 43309)
                    return r.CLUSTER_BREAK.EXTEND;
                } else if (43335 <= e && e <= 43345)
                  return r.CLUSTER_BREAK.EXTEND;
              } else if (e < 43698) {
                if (e < 43493) {
                  if (e < 43444)
                    if (e < 43392) {
                      if (e < 43360) {
                        if (43346 <= e && e <= 43347)
                          return r.CLUSTER_BREAK.SPACINGMARK;
                      } else if (43360 <= e && e <= 43388)
                        return r.CLUSTER_BREAK.L;
                    } else if (e < 43395) {
                      if (43392 <= e && e <= 43394)
                        return r.CLUSTER_BREAK.EXTEND;
                    } else {
                      if (e === 43395)
                        return r.CLUSTER_BREAK.SPACINGMARK;
                      if (e === 43443)
                        return r.CLUSTER_BREAK.EXTEND;
                    }
                  else if (e < 43450) {
                    if (e < 43446) {
                      if (43444 <= e && e <= 43445)
                        return r.CLUSTER_BREAK.SPACINGMARK;
                    } else if (43446 <= e && e <= 43449)
                      return r.CLUSTER_BREAK.EXTEND;
                  } else if (e < 43452) {
                    if (43450 <= e && e <= 43451)
                      return r.CLUSTER_BREAK.SPACINGMARK;
                  } else if (e < 43454) {
                    if (43452 <= e && e <= 43453)
                      return r.CLUSTER_BREAK.EXTEND;
                  } else if (43454 <= e && e <= 43456)
                    return r.CLUSTER_BREAK.SPACINGMARK;
                } else if (e < 43573) {
                  if (e < 43567) {
                    if (e < 43561) {
                      if (e === 43493)
                        return r.CLUSTER_BREAK.EXTEND;
                    } else if (43561 <= e && e <= 43566)
                      return r.CLUSTER_BREAK.EXTEND;
                  } else if (e < 43569) {
                    if (43567 <= e && e <= 43568)
                      return r.CLUSTER_BREAK.SPACINGMARK;
                  } else if (e < 43571) {
                    if (43569 <= e && e <= 43570)
                      return r.CLUSTER_BREAK.EXTEND;
                  } else if (43571 <= e && e <= 43572)
                    return r.CLUSTER_BREAK.SPACINGMARK;
                } else if (e < 43597) {
                  if (e < 43587) {
                    if (43573 <= e && e <= 43574)
                      return r.CLUSTER_BREAK.EXTEND;
                  } else if (e === 43587 || e === 43596)
                    return r.CLUSTER_BREAK.EXTEND;
                } else if (e < 43644) {
                  if (e === 43597)
                    return r.CLUSTER_BREAK.SPACINGMARK;
                } else if (e === 43644 || e === 43696)
                  return r.CLUSTER_BREAK.EXTEND;
              } else if (e < 44006) {
                if (e < 43756)
                  if (e < 43710) {
                    if (e < 43703) {
                      if (43698 <= e && e <= 43700)
                        return r.CLUSTER_BREAK.EXTEND;
                    } else if (43703 <= e && e <= 43704)
                      return r.CLUSTER_BREAK.EXTEND;
                  } else if (e < 43713) {
                    if (43710 <= e && e <= 43711)
                      return r.CLUSTER_BREAK.EXTEND;
                  } else {
                    if (e === 43713)
                      return r.CLUSTER_BREAK.EXTEND;
                    if (e === 43755)
                      return r.CLUSTER_BREAK.SPACINGMARK;
                  }
                else if (e < 43766) {
                  if (e < 43758) {
                    if (43756 <= e && e <= 43757)
                      return r.CLUSTER_BREAK.EXTEND;
                  } else if (e < 43765) {
                    if (43758 <= e && e <= 43759)
                      return r.CLUSTER_BREAK.SPACINGMARK;
                  } else if (e === 43765)
                    return r.CLUSTER_BREAK.SPACINGMARK;
                } else if (e < 44003) {
                  if (e === 43766)
                    return r.CLUSTER_BREAK.EXTEND;
                } else if (e < 44005) {
                  if (44003 <= e && e <= 44004)
                    return r.CLUSTER_BREAK.SPACINGMARK;
                } else if (e === 44005)
                  return r.CLUSTER_BREAK.EXTEND;
              } else if (e < 44032)
                if (e < 44009) {
                  if (e < 44008) {
                    if (44006 <= e && e <= 44007)
                      return r.CLUSTER_BREAK.SPACINGMARK;
                  } else if (e === 44008)
                    return r.CLUSTER_BREAK.EXTEND;
                } else if (e < 44012) {
                  if (44009 <= e && e <= 44010)
                    return r.CLUSTER_BREAK.SPACINGMARK;
                } else {
                  if (e === 44012)
                    return r.CLUSTER_BREAK.SPACINGMARK;
                  if (e === 44013)
                    return r.CLUSTER_BREAK.EXTEND;
                }
              else if (e < 44061) {
                if (e < 44033) {
                  if (e === 44032)
                    return r.CLUSTER_BREAK.LV;
                } else if (e < 44060) {
                  if (44033 <= e && e <= 44059)
                    return r.CLUSTER_BREAK.LVT;
                } else if (e === 44060)
                  return r.CLUSTER_BREAK.LV;
              } else if (e < 44088) {
                if (44061 <= e && e <= 44087)
                  return r.CLUSTER_BREAK.LVT;
              } else if (e < 44089) {
                if (e === 44088)
                  return r.CLUSTER_BREAK.LV;
              } else if (44089 <= e && e <= 44115)
                return r.CLUSTER_BREAK.LVT;
            } else if (e < 46497) {
              if (e < 45293) {
                if (e < 44704) {
                  if (e < 44397) {
                    if (e < 44256) {
                      if (e < 44173) {
                        if (e < 44144) {
                          if (e < 44117) {
                            if (e === 44116)
                              return r.CLUSTER_BREAK.LV;
                          } else if (44117 <= e && e <= 44143)
                            return r.CLUSTER_BREAK.LVT;
                        } else if (e < 44145) {
                          if (e === 44144)
                            return r.CLUSTER_BREAK.LV;
                        } else if (e < 44172) {
                          if (44145 <= e && e <= 44171)
                            return r.CLUSTER_BREAK.LVT;
                        } else if (e === 44172)
                          return r.CLUSTER_BREAK.LV;
                      } else if (e < 44201) {
                        if (e < 44200) {
                          if (44173 <= e && e <= 44199)
                            return r.CLUSTER_BREAK.LVT;
                        } else if (e === 44200)
                          return r.CLUSTER_BREAK.LV;
                      } else if (e < 44228) {
                        if (44201 <= e && e <= 44227)
                          return r.CLUSTER_BREAK.LVT;
                      } else if (e < 44229) {
                        if (e === 44228)
                          return r.CLUSTER_BREAK.LV;
                      } else if (44229 <= e && e <= 44255)
                        return r.CLUSTER_BREAK.LVT;
                    } else if (e < 44313) {
                      if (e < 44284) {
                        if (e < 44257) {
                          if (e === 44256)
                            return r.CLUSTER_BREAK.LV;
                        } else if (44257 <= e && e <= 44283)
                          return r.CLUSTER_BREAK.LVT;
                      } else if (e < 44285) {
                        if (e === 44284)
                          return r.CLUSTER_BREAK.LV;
                      } else if (e < 44312) {
                        if (44285 <= e && e <= 44311)
                          return r.CLUSTER_BREAK.LVT;
                      } else if (e === 44312)
                        return r.CLUSTER_BREAK.LV;
                    } else if (e < 44368) {
                      if (e < 44340) {
                        if (44313 <= e && e <= 44339)
                          return r.CLUSTER_BREAK.LVT;
                      } else if (e < 44341) {
                        if (e === 44340)
                          return r.CLUSTER_BREAK.LV;
                      } else if (44341 <= e && e <= 44367)
                        return r.CLUSTER_BREAK.LVT;
                    } else if (e < 44369) {
                      if (e === 44368)
                        return r.CLUSTER_BREAK.LV;
                    } else if (e < 44396) {
                      if (44369 <= e && e <= 44395)
                        return r.CLUSTER_BREAK.LVT;
                    } else if (e === 44396)
                      return r.CLUSTER_BREAK.LV;
                  } else if (e < 44537) {
                    if (e < 44480) {
                      if (e < 44425) {
                        if (e < 44424) {
                          if (44397 <= e && e <= 44423)
                            return r.CLUSTER_BREAK.LVT;
                        } else if (e === 44424)
                          return r.CLUSTER_BREAK.LV;
                      } else if (e < 44452) {
                        if (44425 <= e && e <= 44451)
                          return r.CLUSTER_BREAK.LVT;
                      } else if (e < 44453) {
                        if (e === 44452)
                          return r.CLUSTER_BREAK.LV;
                      } else if (44453 <= e && e <= 44479)
                        return r.CLUSTER_BREAK.LVT;
                    } else if (e < 44508) {
                      if (e < 44481) {
                        if (e === 44480)
                          return r.CLUSTER_BREAK.LV;
                      } else if (44481 <= e && e <= 44507)
                        return r.CLUSTER_BREAK.LVT;
                    } else if (e < 44509) {
                      if (e === 44508)
                        return r.CLUSTER_BREAK.LV;
                    } else if (e < 44536) {
                      if (44509 <= e && e <= 44535)
                        return r.CLUSTER_BREAK.LVT;
                    } else if (e === 44536)
                      return r.CLUSTER_BREAK.LV;
                  } else if (e < 44620) {
                    if (e < 44565) {
                      if (e < 44564) {
                        if (44537 <= e && e <= 44563)
                          return r.CLUSTER_BREAK.LVT;
                      } else if (e === 44564)
                        return r.CLUSTER_BREAK.LV;
                    } else if (e < 44592) {
                      if (44565 <= e && e <= 44591)
                        return r.CLUSTER_BREAK.LVT;
                    } else if (e < 44593) {
                      if (e === 44592)
                        return r.CLUSTER_BREAK.LV;
                    } else if (44593 <= e && e <= 44619)
                      return r.CLUSTER_BREAK.LVT;
                  } else if (e < 44649) {
                    if (e < 44621) {
                      if (e === 44620)
                        return r.CLUSTER_BREAK.LV;
                    } else if (e < 44648) {
                      if (44621 <= e && e <= 44647)
                        return r.CLUSTER_BREAK.LVT;
                    } else if (e === 44648)
                      return r.CLUSTER_BREAK.LV;
                  } else if (e < 44676) {
                    if (44649 <= e && e <= 44675)
                      return r.CLUSTER_BREAK.LVT;
                  } else if (e < 44677) {
                    if (e === 44676)
                      return r.CLUSTER_BREAK.LV;
                  } else if (44677 <= e && e <= 44703)
                    return r.CLUSTER_BREAK.LVT;
                } else if (e < 44985) {
                  if (e < 44844) {
                    if (e < 44761) {
                      if (e < 44732) {
                        if (e < 44705) {
                          if (e === 44704)
                            return r.CLUSTER_BREAK.LV;
                        } else if (44705 <= e && e <= 44731)
                          return r.CLUSTER_BREAK.LVT;
                      } else if (e < 44733) {
                        if (e === 44732)
                          return r.CLUSTER_BREAK.LV;
                      } else if (e < 44760) {
                        if (44733 <= e && e <= 44759)
                          return r.CLUSTER_BREAK.LVT;
                      } else if (e === 44760)
                        return r.CLUSTER_BREAK.LV;
                    } else if (e < 44789) {
                      if (e < 44788) {
                        if (44761 <= e && e <= 44787)
                          return r.CLUSTER_BREAK.LVT;
                      } else if (e === 44788)
                        return r.CLUSTER_BREAK.LV;
                    } else if (e < 44816) {
                      if (44789 <= e && e <= 44815)
                        return r.CLUSTER_BREAK.LVT;
                    } else if (e < 44817) {
                      if (e === 44816)
                        return r.CLUSTER_BREAK.LV;
                    } else if (44817 <= e && e <= 44843)
                      return r.CLUSTER_BREAK.LVT;
                  } else if (e < 44901) {
                    if (e < 44872) {
                      if (e < 44845) {
                        if (e === 44844)
                          return r.CLUSTER_BREAK.LV;
                      } else if (44845 <= e && e <= 44871)
                        return r.CLUSTER_BREAK.LVT;
                    } else if (e < 44873) {
                      if (e === 44872)
                        return r.CLUSTER_BREAK.LV;
                    } else if (e < 44900) {
                      if (44873 <= e && e <= 44899)
                        return r.CLUSTER_BREAK.LVT;
                    } else if (e === 44900)
                      return r.CLUSTER_BREAK.LV;
                  } else if (e < 44956) {
                    if (e < 44928) {
                      if (44901 <= e && e <= 44927)
                        return r.CLUSTER_BREAK.LVT;
                    } else if (e < 44929) {
                      if (e === 44928)
                        return r.CLUSTER_BREAK.LV;
                    } else if (44929 <= e && e <= 44955)
                      return r.CLUSTER_BREAK.LVT;
                  } else if (e < 44957) {
                    if (e === 44956)
                      return r.CLUSTER_BREAK.LV;
                  } else if (e < 44984) {
                    if (44957 <= e && e <= 44983)
                      return r.CLUSTER_BREAK.LVT;
                  } else if (e === 44984)
                    return r.CLUSTER_BREAK.LV;
                } else if (e < 45152) {
                  if (e < 45068) {
                    if (e < 45013) {
                      if (e < 45012) {
                        if (44985 <= e && e <= 45011)
                          return r.CLUSTER_BREAK.LVT;
                      } else if (e === 45012)
                        return r.CLUSTER_BREAK.LV;
                    } else if (e < 45040) {
                      if (45013 <= e && e <= 45039)
                        return r.CLUSTER_BREAK.LVT;
                    } else if (e < 45041) {
                      if (e === 45040)
                        return r.CLUSTER_BREAK.LV;
                    } else if (45041 <= e && e <= 45067)
                      return r.CLUSTER_BREAK.LVT;
                  } else if (e < 45097) {
                    if (e < 45069) {
                      if (e === 45068)
                        return r.CLUSTER_BREAK.LV;
                    } else if (e < 45096) {
                      if (45069 <= e && e <= 45095)
                        return r.CLUSTER_BREAK.LVT;
                    } else if (e === 45096)
                      return r.CLUSTER_BREAK.LV;
                  } else if (e < 45124) {
                    if (45097 <= e && e <= 45123)
                      return r.CLUSTER_BREAK.LVT;
                  } else if (e < 45125) {
                    if (e === 45124)
                      return r.CLUSTER_BREAK.LV;
                  } else if (45125 <= e && e <= 45151)
                    return r.CLUSTER_BREAK.LVT;
                } else if (e < 45209) {
                  if (e < 45180) {
                    if (e < 45153) {
                      if (e === 45152)
                        return r.CLUSTER_BREAK.LV;
                    } else if (45153 <= e && e <= 45179)
                      return r.CLUSTER_BREAK.LVT;
                  } else if (e < 45181) {
                    if (e === 45180)
                      return r.CLUSTER_BREAK.LV;
                  } else if (e < 45208) {
                    if (45181 <= e && e <= 45207)
                      return r.CLUSTER_BREAK.LVT;
                  } else if (e === 45208)
                    return r.CLUSTER_BREAK.LV;
                } else if (e < 45264) {
                  if (e < 45236) {
                    if (45209 <= e && e <= 45235)
                      return r.CLUSTER_BREAK.LVT;
                  } else if (e < 45237) {
                    if (e === 45236)
                      return r.CLUSTER_BREAK.LV;
                  } else if (45237 <= e && e <= 45263)
                    return r.CLUSTER_BREAK.LVT;
                } else if (e < 45265) {
                  if (e === 45264)
                    return r.CLUSTER_BREAK.LV;
                } else if (e < 45292) {
                  if (45265 <= e && e <= 45291)
                    return r.CLUSTER_BREAK.LVT;
                } else if (e === 45292)
                  return r.CLUSTER_BREAK.LV;
              } else if (e < 45908) {
                if (e < 45600) {
                  if (e < 45433) {
                    if (e < 45376) {
                      if (e < 45321) {
                        if (e < 45320) {
                          if (45293 <= e && e <= 45319)
                            return r.CLUSTER_BREAK.LVT;
                        } else if (e === 45320)
                          return r.CLUSTER_BREAK.LV;
                      } else if (e < 45348) {
                        if (45321 <= e && e <= 45347)
                          return r.CLUSTER_BREAK.LVT;
                      } else if (e < 45349) {
                        if (e === 45348)
                          return r.CLUSTER_BREAK.LV;
                      } else if (45349 <= e && e <= 45375)
                        return r.CLUSTER_BREAK.LVT;
                    } else if (e < 45404) {
                      if (e < 45377) {
                        if (e === 45376)
                          return r.CLUSTER_BREAK.LV;
                      } else if (45377 <= e && e <= 45403)
                        return r.CLUSTER_BREAK.LVT;
                    } else if (e < 45405) {
                      if (e === 45404)
                        return r.CLUSTER_BREAK.LV;
                    } else if (e < 45432) {
                      if (45405 <= e && e <= 45431)
                        return r.CLUSTER_BREAK.LVT;
                    } else if (e === 45432)
                      return r.CLUSTER_BREAK.LV;
                  } else if (e < 45516) {
                    if (e < 45461) {
                      if (e < 45460) {
                        if (45433 <= e && e <= 45459)
                          return r.CLUSTER_BREAK.LVT;
                      } else if (e === 45460)
                        return r.CLUSTER_BREAK.LV;
                    } else if (e < 45488) {
                      if (45461 <= e && e <= 45487)
                        return r.CLUSTER_BREAK.LVT;
                    } else if (e < 45489) {
                      if (e === 45488)
                        return r.CLUSTER_BREAK.LV;
                    } else if (45489 <= e && e <= 45515)
                      return r.CLUSTER_BREAK.LVT;
                  } else if (e < 45545) {
                    if (e < 45517) {
                      if (e === 45516)
                        return r.CLUSTER_BREAK.LV;
                    } else if (e < 45544) {
                      if (45517 <= e && e <= 45543)
                        return r.CLUSTER_BREAK.LVT;
                    } else if (e === 45544)
                      return r.CLUSTER_BREAK.LV;
                  } else if (e < 45572) {
                    if (45545 <= e && e <= 45571)
                      return r.CLUSTER_BREAK.LVT;
                  } else if (e < 45573) {
                    if (e === 45572)
                      return r.CLUSTER_BREAK.LV;
                  } else if (45573 <= e && e <= 45599)
                    return r.CLUSTER_BREAK.LVT;
                } else if (e < 45741) {
                  if (e < 45657) {
                    if (e < 45628) {
                      if (e < 45601) {
                        if (e === 45600)
                          return r.CLUSTER_BREAK.LV;
                      } else if (45601 <= e && e <= 45627)
                        return r.CLUSTER_BREAK.LVT;
                    } else if (e < 45629) {
                      if (e === 45628)
                        return r.CLUSTER_BREAK.LV;
                    } else if (e < 45656) {
                      if (45629 <= e && e <= 45655)
                        return r.CLUSTER_BREAK.LVT;
                    } else if (e === 45656)
                      return r.CLUSTER_BREAK.LV;
                  } else if (e < 45712) {
                    if (e < 45684) {
                      if (45657 <= e && e <= 45683)
                        return r.CLUSTER_BREAK.LVT;
                    } else if (e < 45685) {
                      if (e === 45684)
                        return r.CLUSTER_BREAK.LV;
                    } else if (45685 <= e && e <= 45711)
                      return r.CLUSTER_BREAK.LVT;
                  } else if (e < 45713) {
                    if (e === 45712)
                      return r.CLUSTER_BREAK.LV;
                  } else if (e < 45740) {
                    if (45713 <= e && e <= 45739)
                      return r.CLUSTER_BREAK.LVT;
                  } else if (e === 45740)
                    return r.CLUSTER_BREAK.LV;
                } else if (e < 45824) {
                  if (e < 45769) {
                    if (e < 45768) {
                      if (45741 <= e && e <= 45767)
                        return r.CLUSTER_BREAK.LVT;
                    } else if (e === 45768)
                      return r.CLUSTER_BREAK.LV;
                  } else if (e < 45796) {
                    if (45769 <= e && e <= 45795)
                      return r.CLUSTER_BREAK.LVT;
                  } else if (e < 45797) {
                    if (e === 45796)
                      return r.CLUSTER_BREAK.LV;
                  } else if (45797 <= e && e <= 45823)
                    return r.CLUSTER_BREAK.LVT;
                } else if (e < 45853) {
                  if (e < 45825) {
                    if (e === 45824)
                      return r.CLUSTER_BREAK.LV;
                  } else if (e < 45852) {
                    if (45825 <= e && e <= 45851)
                      return r.CLUSTER_BREAK.LVT;
                  } else if (e === 45852)
                    return r.CLUSTER_BREAK.LV;
                } else if (e < 45880) {
                  if (45853 <= e && e <= 45879)
                    return r.CLUSTER_BREAK.LVT;
                } else if (e < 45881) {
                  if (e === 45880)
                    return r.CLUSTER_BREAK.LV;
                } else if (45881 <= e && e <= 45907)
                  return r.CLUSTER_BREAK.LVT;
              } else if (e < 46189) {
                if (e < 46048) {
                  if (e < 45965) {
                    if (e < 45936) {
                      if (e < 45909) {
                        if (e === 45908)
                          return r.CLUSTER_BREAK.LV;
                      } else if (45909 <= e && e <= 45935)
                        return r.CLUSTER_BREAK.LVT;
                    } else if (e < 45937) {
                      if (e === 45936)
                        return r.CLUSTER_BREAK.LV;
                    } else if (e < 45964) {
                      if (45937 <= e && e <= 45963)
                        return r.CLUSTER_BREAK.LVT;
                    } else if (e === 45964)
                      return r.CLUSTER_BREAK.LV;
                  } else if (e < 45993) {
                    if (e < 45992) {
                      if (45965 <= e && e <= 45991)
                        return r.CLUSTER_BREAK.LVT;
                    } else if (e === 45992)
                      return r.CLUSTER_BREAK.LV;
                  } else if (e < 46020) {
                    if (45993 <= e && e <= 46019)
                      return r.CLUSTER_BREAK.LVT;
                  } else if (e < 46021) {
                    if (e === 46020)
                      return r.CLUSTER_BREAK.LV;
                  } else if (46021 <= e && e <= 46047)
                    return r.CLUSTER_BREAK.LVT;
                } else if (e < 46105) {
                  if (e < 46076) {
                    if (e < 46049) {
                      if (e === 46048)
                        return r.CLUSTER_BREAK.LV;
                    } else if (46049 <= e && e <= 46075)
                      return r.CLUSTER_BREAK.LVT;
                  } else if (e < 46077) {
                    if (e === 46076)
                      return r.CLUSTER_BREAK.LV;
                  } else if (e < 46104) {
                    if (46077 <= e && e <= 46103)
                      return r.CLUSTER_BREAK.LVT;
                  } else if (e === 46104)
                    return r.CLUSTER_BREAK.LV;
                } else if (e < 46160) {
                  if (e < 46132) {
                    if (46105 <= e && e <= 46131)
                      return r.CLUSTER_BREAK.LVT;
                  } else if (e < 46133) {
                    if (e === 46132)
                      return r.CLUSTER_BREAK.LV;
                  } else if (46133 <= e && e <= 46159)
                    return r.CLUSTER_BREAK.LVT;
                } else if (e < 46161) {
                  if (e === 46160)
                    return r.CLUSTER_BREAK.LV;
                } else if (e < 46188) {
                  if (46161 <= e && e <= 46187)
                    return r.CLUSTER_BREAK.LVT;
                } else if (e === 46188)
                  return r.CLUSTER_BREAK.LV;
              } else if (e < 46356) {
                if (e < 46272) {
                  if (e < 46217) {
                    if (e < 46216) {
                      if (46189 <= e && e <= 46215)
                        return r.CLUSTER_BREAK.LVT;
                    } else if (e === 46216)
                      return r.CLUSTER_BREAK.LV;
                  } else if (e < 46244) {
                    if (46217 <= e && e <= 46243)
                      return r.CLUSTER_BREAK.LVT;
                  } else if (e < 46245) {
                    if (e === 46244)
                      return r.CLUSTER_BREAK.LV;
                  } else if (46245 <= e && e <= 46271)
                    return r.CLUSTER_BREAK.LVT;
                } else if (e < 46301) {
                  if (e < 46273) {
                    if (e === 46272)
                      return r.CLUSTER_BREAK.LV;
                  } else if (e < 46300) {
                    if (46273 <= e && e <= 46299)
                      return r.CLUSTER_BREAK.LVT;
                  } else if (e === 46300)
                    return r.CLUSTER_BREAK.LV;
                } else if (e < 46328) {
                  if (46301 <= e && e <= 46327)
                    return r.CLUSTER_BREAK.LVT;
                } else if (e < 46329) {
                  if (e === 46328)
                    return r.CLUSTER_BREAK.LV;
                } else if (46329 <= e && e <= 46355)
                  return r.CLUSTER_BREAK.LVT;
              } else if (e < 46413) {
                if (e < 46384) {
                  if (e < 46357) {
                    if (e === 46356)
                      return r.CLUSTER_BREAK.LV;
                  } else if (46357 <= e && e <= 46383)
                    return r.CLUSTER_BREAK.LVT;
                } else if (e < 46385) {
                  if (e === 46384)
                    return r.CLUSTER_BREAK.LV;
                } else if (e < 46412) {
                  if (46385 <= e && e <= 46411)
                    return r.CLUSTER_BREAK.LVT;
                } else if (e === 46412)
                  return r.CLUSTER_BREAK.LV;
              } else if (e < 46468) {
                if (e < 46440) {
                  if (46413 <= e && e <= 46439)
                    return r.CLUSTER_BREAK.LVT;
                } else if (e < 46441) {
                  if (e === 46440)
                    return r.CLUSTER_BREAK.LV;
                } else if (46441 <= e && e <= 46467)
                  return r.CLUSTER_BREAK.LVT;
              } else if (e < 46469) {
                if (e === 46468)
                  return r.CLUSTER_BREAK.LV;
              } else if (e < 46496) {
                if (46469 <= e && e <= 46495)
                  return r.CLUSTER_BREAK.LVT;
              } else if (e === 46496)
                return r.CLUSTER_BREAK.LV;
            } else if (e < 47701) {
              if (e < 47112) {
                if (e < 46804) {
                  if (e < 46637) {
                    if (e < 46580) {
                      if (e < 46525) {
                        if (e < 46524) {
                          if (46497 <= e && e <= 46523)
                            return r.CLUSTER_BREAK.LVT;
                        } else if (e === 46524)
                          return r.CLUSTER_BREAK.LV;
                      } else if (e < 46552) {
                        if (46525 <= e && e <= 46551)
                          return r.CLUSTER_BREAK.LVT;
                      } else if (e < 46553) {
                        if (e === 46552)
                          return r.CLUSTER_BREAK.LV;
                      } else if (46553 <= e && e <= 46579)
                        return r.CLUSTER_BREAK.LVT;
                    } else if (e < 46608) {
                      if (e < 46581) {
                        if (e === 46580)
                          return r.CLUSTER_BREAK.LV;
                      } else if (46581 <= e && e <= 46607)
                        return r.CLUSTER_BREAK.LVT;
                    } else if (e < 46609) {
                      if (e === 46608)
                        return r.CLUSTER_BREAK.LV;
                    } else if (e < 46636) {
                      if (46609 <= e && e <= 46635)
                        return r.CLUSTER_BREAK.LVT;
                    } else if (e === 46636)
                      return r.CLUSTER_BREAK.LV;
                  } else if (e < 46720) {
                    if (e < 46665) {
                      if (e < 46664) {
                        if (46637 <= e && e <= 46663)
                          return r.CLUSTER_BREAK.LVT;
                      } else if (e === 46664)
                        return r.CLUSTER_BREAK.LV;
                    } else if (e < 46692) {
                      if (46665 <= e && e <= 46691)
                        return r.CLUSTER_BREAK.LVT;
                    } else if (e < 46693) {
                      if (e === 46692)
                        return r.CLUSTER_BREAK.LV;
                    } else if (46693 <= e && e <= 46719)
                      return r.CLUSTER_BREAK.LVT;
                  } else if (e < 46749) {
                    if (e < 46721) {
                      if (e === 46720)
                        return r.CLUSTER_BREAK.LV;
                    } else if (e < 46748) {
                      if (46721 <= e && e <= 46747)
                        return r.CLUSTER_BREAK.LVT;
                    } else if (e === 46748)
                      return r.CLUSTER_BREAK.LV;
                  } else if (e < 46776) {
                    if (46749 <= e && e <= 46775)
                      return r.CLUSTER_BREAK.LVT;
                  } else if (e < 46777) {
                    if (e === 46776)
                      return r.CLUSTER_BREAK.LV;
                  } else if (46777 <= e && e <= 46803)
                    return r.CLUSTER_BREAK.LVT;
                } else if (e < 46945) {
                  if (e < 46861) {
                    if (e < 46832) {
                      if (e < 46805) {
                        if (e === 46804)
                          return r.CLUSTER_BREAK.LV;
                      } else if (46805 <= e && e <= 46831)
                        return r.CLUSTER_BREAK.LVT;
                    } else if (e < 46833) {
                      if (e === 46832)
                        return r.CLUSTER_BREAK.LV;
                    } else if (e < 46860) {
                      if (46833 <= e && e <= 46859)
                        return r.CLUSTER_BREAK.LVT;
                    } else if (e === 46860)
                      return r.CLUSTER_BREAK.LV;
                  } else if (e < 46916) {
                    if (e < 46888) {
                      if (46861 <= e && e <= 46887)
                        return r.CLUSTER_BREAK.LVT;
                    } else if (e < 46889) {
                      if (e === 46888)
                        return r.CLUSTER_BREAK.LV;
                    } else if (46889 <= e && e <= 46915)
                      return r.CLUSTER_BREAK.LVT;
                  } else if (e < 46917) {
                    if (e === 46916)
                      return r.CLUSTER_BREAK.LV;
                  } else if (e < 46944) {
                    if (46917 <= e && e <= 46943)
                      return r.CLUSTER_BREAK.LVT;
                  } else if (e === 46944)
                    return r.CLUSTER_BREAK.LV;
                } else if (e < 47028) {
                  if (e < 46973) {
                    if (e < 46972) {
                      if (46945 <= e && e <= 46971)
                        return r.CLUSTER_BREAK.LVT;
                    } else if (e === 46972)
                      return r.CLUSTER_BREAK.LV;
                  } else if (e < 47e3) {
                    if (46973 <= e && e <= 46999)
                      return r.CLUSTER_BREAK.LVT;
                  } else if (e < 47001) {
                    if (e === 47e3)
                      return r.CLUSTER_BREAK.LV;
                  } else if (47001 <= e && e <= 47027)
                    return r.CLUSTER_BREAK.LVT;
                } else if (e < 47057) {
                  if (e < 47029) {
                    if (e === 47028)
                      return r.CLUSTER_BREAK.LV;
                  } else if (e < 47056) {
                    if (47029 <= e && e <= 47055)
                      return r.CLUSTER_BREAK.LVT;
                  } else if (e === 47056)
                    return r.CLUSTER_BREAK.LV;
                } else if (e < 47084) {
                  if (47057 <= e && e <= 47083)
                    return r.CLUSTER_BREAK.LVT;
                } else if (e < 47085) {
                  if (e === 47084)
                    return r.CLUSTER_BREAK.LV;
                } else if (47085 <= e && e <= 47111)
                  return r.CLUSTER_BREAK.LVT;
              } else if (e < 47393) {
                if (e < 47252) {
                  if (e < 47169) {
                    if (e < 47140) {
                      if (e < 47113) {
                        if (e === 47112)
                          return r.CLUSTER_BREAK.LV;
                      } else if (47113 <= e && e <= 47139)
                        return r.CLUSTER_BREAK.LVT;
                    } else if (e < 47141) {
                      if (e === 47140)
                        return r.CLUSTER_BREAK.LV;
                    } else if (e < 47168) {
                      if (47141 <= e && e <= 47167)
                        return r.CLUSTER_BREAK.LVT;
                    } else if (e === 47168)
                      return r.CLUSTER_BREAK.LV;
                  } else if (e < 47197) {
                    if (e < 47196) {
                      if (47169 <= e && e <= 47195)
                        return r.CLUSTER_BREAK.LVT;
                    } else if (e === 47196)
                      return r.CLUSTER_BREAK.LV;
                  } else if (e < 47224) {
                    if (47197 <= e && e <= 47223)
                      return r.CLUSTER_BREAK.LVT;
                  } else if (e < 47225) {
                    if (e === 47224)
                      return r.CLUSTER_BREAK.LV;
                  } else if (47225 <= e && e <= 47251)
                    return r.CLUSTER_BREAK.LVT;
                } else if (e < 47309) {
                  if (e < 47280) {
                    if (e < 47253) {
                      if (e === 47252)
                        return r.CLUSTER_BREAK.LV;
                    } else if (47253 <= e && e <= 47279)
                      return r.CLUSTER_BREAK.LVT;
                  } else if (e < 47281) {
                    if (e === 47280)
                      return r.CLUSTER_BREAK.LV;
                  } else if (e < 47308) {
                    if (47281 <= e && e <= 47307)
                      return r.CLUSTER_BREAK.LVT;
                  } else if (e === 47308)
                    return r.CLUSTER_BREAK.LV;
                } else if (e < 47364) {
                  if (e < 47336) {
                    if (47309 <= e && e <= 47335)
                      return r.CLUSTER_BREAK.LVT;
                  } else if (e < 47337) {
                    if (e === 47336)
                      return r.CLUSTER_BREAK.LV;
                  } else if (47337 <= e && e <= 47363)
                    return r.CLUSTER_BREAK.LVT;
                } else if (e < 47365) {
                  if (e === 47364)
                    return r.CLUSTER_BREAK.LV;
                } else if (e < 47392) {
                  if (47365 <= e && e <= 47391)
                    return r.CLUSTER_BREAK.LVT;
                } else if (e === 47392)
                  return r.CLUSTER_BREAK.LV;
              } else if (e < 47560) {
                if (e < 47476) {
                  if (e < 47421) {
                    if (e < 47420) {
                      if (47393 <= e && e <= 47419)
                        return r.CLUSTER_BREAK.LVT;
                    } else if (e === 47420)
                      return r.CLUSTER_BREAK.LV;
                  } else if (e < 47448) {
                    if (47421 <= e && e <= 47447)
                      return r.CLUSTER_BREAK.LVT;
                  } else if (e < 47449) {
                    if (e === 47448)
                      return r.CLUSTER_BREAK.LV;
                  } else if (47449 <= e && e <= 47475)
                    return r.CLUSTER_BREAK.LVT;
                } else if (e < 47505) {
                  if (e < 47477) {
                    if (e === 47476)
                      return r.CLUSTER_BREAK.LV;
                  } else if (e < 47504) {
                    if (47477 <= e && e <= 47503)
                      return r.CLUSTER_BREAK.LVT;
                  } else if (e === 47504)
                    return r.CLUSTER_BREAK.LV;
                } else if (e < 47532) {
                  if (47505 <= e && e <= 47531)
                    return r.CLUSTER_BREAK.LVT;
                } else if (e < 47533) {
                  if (e === 47532)
                    return r.CLUSTER_BREAK.LV;
                } else if (47533 <= e && e <= 47559)
                  return r.CLUSTER_BREAK.LVT;
              } else if (e < 47617) {
                if (e < 47588) {
                  if (e < 47561) {
                    if (e === 47560)
                      return r.CLUSTER_BREAK.LV;
                  } else if (47561 <= e && e <= 47587)
                    return r.CLUSTER_BREAK.LVT;
                } else if (e < 47589) {
                  if (e === 47588)
                    return r.CLUSTER_BREAK.LV;
                } else if (e < 47616) {
                  if (47589 <= e && e <= 47615)
                    return r.CLUSTER_BREAK.LVT;
                } else if (e === 47616)
                  return r.CLUSTER_BREAK.LV;
              } else if (e < 47672) {
                if (e < 47644) {
                  if (47617 <= e && e <= 47643)
                    return r.CLUSTER_BREAK.LVT;
                } else if (e < 47645) {
                  if (e === 47644)
                    return r.CLUSTER_BREAK.LV;
                } else if (47645 <= e && e <= 47671)
                  return r.CLUSTER_BREAK.LVT;
              } else if (e < 47673) {
                if (e === 47672)
                  return r.CLUSTER_BREAK.LV;
              } else if (e < 47700) {
                if (47673 <= e && e <= 47699)
                  return r.CLUSTER_BREAK.LVT;
              } else if (e === 47700)
                return r.CLUSTER_BREAK.LV;
            } else if (e < 48316) {
              if (e < 48008) {
                if (e < 47841) {
                  if (e < 47784) {
                    if (e < 47729) {
                      if (e < 47728) {
                        if (47701 <= e && e <= 47727)
                          return r.CLUSTER_BREAK.LVT;
                      } else if (e === 47728)
                        return r.CLUSTER_BREAK.LV;
                    } else if (e < 47756) {
                      if (47729 <= e && e <= 47755)
                        return r.CLUSTER_BREAK.LVT;
                    } else if (e < 47757) {
                      if (e === 47756)
                        return r.CLUSTER_BREAK.LV;
                    } else if (47757 <= e && e <= 47783)
                      return r.CLUSTER_BREAK.LVT;
                  } else if (e < 47812) {
                    if (e < 47785) {
                      if (e === 47784)
                        return r.CLUSTER_BREAK.LV;
                    } else if (47785 <= e && e <= 47811)
                      return r.CLUSTER_BREAK.LVT;
                  } else if (e < 47813) {
                    if (e === 47812)
                      return r.CLUSTER_BREAK.LV;
                  } else if (e < 47840) {
                    if (47813 <= e && e <= 47839)
                      return r.CLUSTER_BREAK.LVT;
                  } else if (e === 47840)
                    return r.CLUSTER_BREAK.LV;
                } else if (e < 47924) {
                  if (e < 47869) {
                    if (e < 47868) {
                      if (47841 <= e && e <= 47867)
                        return r.CLUSTER_BREAK.LVT;
                    } else if (e === 47868)
                      return r.CLUSTER_BREAK.LV;
                  } else if (e < 47896) {
                    if (47869 <= e && e <= 47895)
                      return r.CLUSTER_BREAK.LVT;
                  } else if (e < 47897) {
                    if (e === 47896)
                      return r.CLUSTER_BREAK.LV;
                  } else if (47897 <= e && e <= 47923)
                    return r.CLUSTER_BREAK.LVT;
                } else if (e < 47953) {
                  if (e < 47925) {
                    if (e === 47924)
                      return r.CLUSTER_BREAK.LV;
                  } else if (e < 47952) {
                    if (47925 <= e && e <= 47951)
                      return r.CLUSTER_BREAK.LVT;
                  } else if (e === 47952)
                    return r.CLUSTER_BREAK.LV;
                } else if (e < 47980) {
                  if (47953 <= e && e <= 47979)
                    return r.CLUSTER_BREAK.LVT;
                } else if (e < 47981) {
                  if (e === 47980)
                    return r.CLUSTER_BREAK.LV;
                } else if (47981 <= e && e <= 48007)
                  return r.CLUSTER_BREAK.LVT;
              } else if (e < 48149) {
                if (e < 48065) {
                  if (e < 48036) {
                    if (e < 48009) {
                      if (e === 48008)
                        return r.CLUSTER_BREAK.LV;
                    } else if (48009 <= e && e <= 48035)
                      return r.CLUSTER_BREAK.LVT;
                  } else if (e < 48037) {
                    if (e === 48036)
                      return r.CLUSTER_BREAK.LV;
                  } else if (e < 48064) {
                    if (48037 <= e && e <= 48063)
                      return r.CLUSTER_BREAK.LVT;
                  } else if (e === 48064)
                    return r.CLUSTER_BREAK.LV;
                } else if (e < 48120) {
                  if (e < 48092) {
                    if (48065 <= e && e <= 48091)
                      return r.CLUSTER_BREAK.LVT;
                  } else if (e < 48093) {
                    if (e === 48092)
                      return r.CLUSTER_BREAK.LV;
                  } else if (48093 <= e && e <= 48119)
                    return r.CLUSTER_BREAK.LVT;
                } else if (e < 48121) {
                  if (e === 48120)
                    return r.CLUSTER_BREAK.LV;
                } else if (e < 48148) {
                  if (48121 <= e && e <= 48147)
                    return r.CLUSTER_BREAK.LVT;
                } else if (e === 48148)
                  return r.CLUSTER_BREAK.LV;
              } else if (e < 48232) {
                if (e < 48177) {
                  if (e < 48176) {
                    if (48149 <= e && e <= 48175)
                      return r.CLUSTER_BREAK.LVT;
                  } else if (e === 48176)
                    return r.CLUSTER_BREAK.LV;
                } else if (e < 48204) {
                  if (48177 <= e && e <= 48203)
                    return r.CLUSTER_BREAK.LVT;
                } else if (e < 48205) {
                  if (e === 48204)
                    return r.CLUSTER_BREAK.LV;
                } else if (48205 <= e && e <= 48231)
                  return r.CLUSTER_BREAK.LVT;
              } else if (e < 48261) {
                if (e < 48233) {
                  if (e === 48232)
                    return r.CLUSTER_BREAK.LV;
                } else if (e < 48260) {
                  if (48233 <= e && e <= 48259)
                    return r.CLUSTER_BREAK.LVT;
                } else if (e === 48260)
                  return r.CLUSTER_BREAK.LV;
              } else if (e < 48288) {
                if (48261 <= e && e <= 48287)
                  return r.CLUSTER_BREAK.LVT;
              } else if (e < 48289) {
                if (e === 48288)
                  return r.CLUSTER_BREAK.LV;
              } else if (48289 <= e && e <= 48315)
                return r.CLUSTER_BREAK.LVT;
            } else if (e < 48597) {
              if (e < 48456) {
                if (e < 48373) {
                  if (e < 48344) {
                    if (e < 48317) {
                      if (e === 48316)
                        return r.CLUSTER_BREAK.LV;
                    } else if (48317 <= e && e <= 48343)
                      return r.CLUSTER_BREAK.LVT;
                  } else if (e < 48345) {
                    if (e === 48344)
                      return r.CLUSTER_BREAK.LV;
                  } else if (e < 48372) {
                    if (48345 <= e && e <= 48371)
                      return r.CLUSTER_BREAK.LVT;
                  } else if (e === 48372)
                    return r.CLUSTER_BREAK.LV;
                } else if (e < 48401) {
                  if (e < 48400) {
                    if (48373 <= e && e <= 48399)
                      return r.CLUSTER_BREAK.LVT;
                  } else if (e === 48400)
                    return r.CLUSTER_BREAK.LV;
                } else if (e < 48428) {
                  if (48401 <= e && e <= 48427)
                    return r.CLUSTER_BREAK.LVT;
                } else if (e < 48429) {
                  if (e === 48428)
                    return r.CLUSTER_BREAK.LV;
                } else if (48429 <= e && e <= 48455)
                  return r.CLUSTER_BREAK.LVT;
              } else if (e < 48513) {
                if (e < 48484) {
                  if (e < 48457) {
                    if (e === 48456)
                      return r.CLUSTER_BREAK.LV;
                  } else if (48457 <= e && e <= 48483)
                    return r.CLUSTER_BREAK.LVT;
                } else if (e < 48485) {
                  if (e === 48484)
                    return r.CLUSTER_BREAK.LV;
                } else if (e < 48512) {
                  if (48485 <= e && e <= 48511)
                    return r.CLUSTER_BREAK.LVT;
                } else if (e === 48512)
                  return r.CLUSTER_BREAK.LV;
              } else if (e < 48568) {
                if (e < 48540) {
                  if (48513 <= e && e <= 48539)
                    return r.CLUSTER_BREAK.LVT;
                } else if (e < 48541) {
                  if (e === 48540)
                    return r.CLUSTER_BREAK.LV;
                } else if (48541 <= e && e <= 48567)
                  return r.CLUSTER_BREAK.LVT;
              } else if (e < 48569) {
                if (e === 48568)
                  return r.CLUSTER_BREAK.LV;
              } else if (e < 48596) {
                if (48569 <= e && e <= 48595)
                  return r.CLUSTER_BREAK.LVT;
              } else if (e === 48596)
                return r.CLUSTER_BREAK.LV;
            } else if (e < 48764) {
              if (e < 48680) {
                if (e < 48625) {
                  if (e < 48624) {
                    if (48597 <= e && e <= 48623)
                      return r.CLUSTER_BREAK.LVT;
                  } else if (e === 48624)
                    return r.CLUSTER_BREAK.LV;
                } else if (e < 48652) {
                  if (48625 <= e && e <= 48651)
                    return r.CLUSTER_BREAK.LVT;
                } else if (e < 48653) {
                  if (e === 48652)
                    return r.CLUSTER_BREAK.LV;
                } else if (48653 <= e && e <= 48679)
                  return r.CLUSTER_BREAK.LVT;
              } else if (e < 48709) {
                if (e < 48681) {
                  if (e === 48680)
                    return r.CLUSTER_BREAK.LV;
                } else if (e < 48708) {
                  if (48681 <= e && e <= 48707)
                    return r.CLUSTER_BREAK.LVT;
                } else if (e === 48708)
                  return r.CLUSTER_BREAK.LV;
              } else if (e < 48736) {
                if (48709 <= e && e <= 48735)
                  return r.CLUSTER_BREAK.LVT;
              } else if (e < 48737) {
                if (e === 48736)
                  return r.CLUSTER_BREAK.LV;
              } else if (48737 <= e && e <= 48763)
                return r.CLUSTER_BREAK.LVT;
            } else if (e < 48821) {
              if (e < 48792) {
                if (e < 48765) {
                  if (e === 48764)
                    return r.CLUSTER_BREAK.LV;
                } else if (48765 <= e && e <= 48791)
                  return r.CLUSTER_BREAK.LVT;
              } else if (e < 48793) {
                if (e === 48792)
                  return r.CLUSTER_BREAK.LV;
              } else if (e < 48820) {
                if (48793 <= e && e <= 48819)
                  return r.CLUSTER_BREAK.LVT;
              } else if (e === 48820)
                return r.CLUSTER_BREAK.LV;
            } else if (e < 48876) {
              if (e < 48848) {
                if (48821 <= e && e <= 48847)
                  return r.CLUSTER_BREAK.LVT;
              } else if (e < 48849) {
                if (e === 48848)
                  return r.CLUSTER_BREAK.LV;
              } else if (48849 <= e && e <= 48875)
                return r.CLUSTER_BREAK.LVT;
            } else if (e < 48877) {
              if (e === 48876)
                return r.CLUSTER_BREAK.LV;
            } else if (e < 48904) {
              if (48877 <= e && e <= 48903)
                return r.CLUSTER_BREAK.LVT;
            } else if (e === 48904)
              return r.CLUSTER_BREAK.LV;
          } else if (e < 53720) {
            if (e < 51312) {
              if (e < 50108) {
                if (e < 49493) {
                  if (e < 49212) {
                    if (e < 49045) {
                      if (e < 48988) {
                        if (e < 48933) {
                          if (e < 48932) {
                            if (48905 <= e && e <= 48931)
                              return r.CLUSTER_BREAK.LVT;
                          } else if (e === 48932)
                            return r.CLUSTER_BREAK.LV;
                        } else if (e < 48960) {
                          if (48933 <= e && e <= 48959)
                            return r.CLUSTER_BREAK.LVT;
                        } else if (e < 48961) {
                          if (e === 48960)
                            return r.CLUSTER_BREAK.LV;
                        } else if (48961 <= e && e <= 48987)
                          return r.CLUSTER_BREAK.LVT;
                      } else if (e < 49016) {
                        if (e < 48989) {
                          if (e === 48988)
                            return r.CLUSTER_BREAK.LV;
                        } else if (48989 <= e && e <= 49015)
                          return r.CLUSTER_BREAK.LVT;
                      } else if (e < 49017) {
                        if (e === 49016)
                          return r.CLUSTER_BREAK.LV;
                      } else if (e < 49044) {
                        if (49017 <= e && e <= 49043)
                          return r.CLUSTER_BREAK.LVT;
                      } else if (e === 49044)
                        return r.CLUSTER_BREAK.LV;
                    } else if (e < 49128) {
                      if (e < 49073) {
                        if (e < 49072) {
                          if (49045 <= e && e <= 49071)
                            return r.CLUSTER_BREAK.LVT;
                        } else if (e === 49072)
                          return r.CLUSTER_BREAK.LV;
                      } else if (e < 49100) {
                        if (49073 <= e && e <= 49099)
                          return r.CLUSTER_BREAK.LVT;
                      } else if (e < 49101) {
                        if (e === 49100)
                          return r.CLUSTER_BREAK.LV;
                      } else if (49101 <= e && e <= 49127)
                        return r.CLUSTER_BREAK.LVT;
                    } else if (e < 49157) {
                      if (e < 49129) {
                        if (e === 49128)
                          return r.CLUSTER_BREAK.LV;
                      } else if (e < 49156) {
                        if (49129 <= e && e <= 49155)
                          return r.CLUSTER_BREAK.LVT;
                      } else if (e === 49156)
                        return r.CLUSTER_BREAK.LV;
                    } else if (e < 49184) {
                      if (49157 <= e && e <= 49183)
                        return r.CLUSTER_BREAK.LVT;
                    } else if (e < 49185) {
                      if (e === 49184)
                        return r.CLUSTER_BREAK.LV;
                    } else if (49185 <= e && e <= 49211)
                      return r.CLUSTER_BREAK.LVT;
                  } else if (e < 49352) {
                    if (e < 49269) {
                      if (e < 49240) {
                        if (e < 49213) {
                          if (e === 49212)
                            return r.CLUSTER_BREAK.LV;
                        } else if (49213 <= e && e <= 49239)
                          return r.CLUSTER_BREAK.LVT;
                      } else if (e < 49241) {
                        if (e === 49240)
                          return r.CLUSTER_BREAK.LV;
                      } else if (e < 49268) {
                        if (49241 <= e && e <= 49267)
                          return r.CLUSTER_BREAK.LVT;
                      } else if (e === 49268)
                        return r.CLUSTER_BREAK.LV;
                    } else if (e < 49297) {
                      if (e < 49296) {
                        if (49269 <= e && e <= 49295)
                          return r.CLUSTER_BREAK.LVT;
                      } else if (e === 49296)
                        return r.CLUSTER_BREAK.LV;
                    } else if (e < 49324) {
                      if (49297 <= e && e <= 49323)
                        return r.CLUSTER_BREAK.LVT;
                    } else if (e < 49325) {
                      if (e === 49324)
                        return r.CLUSTER_BREAK.LV;
                    } else if (49325 <= e && e <= 49351)
                      return r.CLUSTER_BREAK.LVT;
                  } else if (e < 49409) {
                    if (e < 49380) {
                      if (e < 49353) {
                        if (e === 49352)
                          return r.CLUSTER_BREAK.LV;
                      } else if (49353 <= e && e <= 49379)
                        return r.CLUSTER_BREAK.LVT;
                    } else if (e < 49381) {
                      if (e === 49380)
                        return r.CLUSTER_BREAK.LV;
                    } else if (e < 49408) {
                      if (49381 <= e && e <= 49407)
                        return r.CLUSTER_BREAK.LVT;
                    } else if (e === 49408)
                      return r.CLUSTER_BREAK.LV;
                  } else if (e < 49464) {
                    if (e < 49436) {
                      if (49409 <= e && e <= 49435)
                        return r.CLUSTER_BREAK.LVT;
                    } else if (e < 49437) {
                      if (e === 49436)
                        return r.CLUSTER_BREAK.LV;
                    } else if (49437 <= e && e <= 49463)
                      return r.CLUSTER_BREAK.LVT;
                  } else if (e < 49465) {
                    if (e === 49464)
                      return r.CLUSTER_BREAK.LV;
                  } else if (e < 49492) {
                    if (49465 <= e && e <= 49491)
                      return r.CLUSTER_BREAK.LVT;
                  } else if (e === 49492)
                    return r.CLUSTER_BREAK.LV;
                } else if (e < 49800) {
                  if (e < 49633) {
                    if (e < 49576) {
                      if (e < 49521) {
                        if (e < 49520) {
                          if (49493 <= e && e <= 49519)
                            return r.CLUSTER_BREAK.LVT;
                        } else if (e === 49520)
                          return r.CLUSTER_BREAK.LV;
                      } else if (e < 49548) {
                        if (49521 <= e && e <= 49547)
                          return r.CLUSTER_BREAK.LVT;
                      } else if (e < 49549) {
                        if (e === 49548)
                          return r.CLUSTER_BREAK.LV;
                      } else if (49549 <= e && e <= 49575)
                        return r.CLUSTER_BREAK.LVT;
                    } else if (e < 49604) {
                      if (e < 49577) {
                        if (e === 49576)
                          return r.CLUSTER_BREAK.LV;
                      } else if (49577 <= e && e <= 49603)
                        return r.CLUSTER_BREAK.LVT;
                    } else if (e < 49605) {
                      if (e === 49604)
                        return r.CLUSTER_BREAK.LV;
                    } else if (e < 49632) {
                      if (49605 <= e && e <= 49631)
                        return r.CLUSTER_BREAK.LVT;
                    } else if (e === 49632)
                      return r.CLUSTER_BREAK.LV;
                  } else if (e < 49716) {
                    if (e < 49661) {
                      if (e < 49660) {
                        if (49633 <= e && e <= 49659)
                          return r.CLUSTER_BREAK.LVT;
                      } else if (e === 49660)
                        return r.CLUSTER_BREAK.LV;
                    } else if (e < 49688) {
                      if (49661 <= e && e <= 49687)
                        return r.CLUSTER_BREAK.LVT;
                    } else if (e < 49689) {
                      if (e === 49688)
                        return r.CLUSTER_BREAK.LV;
                    } else if (49689 <= e && e <= 49715)
                      return r.CLUSTER_BREAK.LVT;
                  } else if (e < 49745) {
                    if (e < 49717) {
                      if (e === 49716)
                        return r.CLUSTER_BREAK.LV;
                    } else if (e < 49744) {
                      if (49717 <= e && e <= 49743)
                        return r.CLUSTER_BREAK.LVT;
                    } else if (e === 49744)
                      return r.CLUSTER_BREAK.LV;
                  } else if (e < 49772) {
                    if (49745 <= e && e <= 49771)
                      return r.CLUSTER_BREAK.LVT;
                  } else if (e < 49773) {
                    if (e === 49772)
                      return r.CLUSTER_BREAK.LV;
                  } else if (49773 <= e && e <= 49799)
                    return r.CLUSTER_BREAK.LVT;
                } else if (e < 49941) {
                  if (e < 49857) {
                    if (e < 49828) {
                      if (e < 49801) {
                        if (e === 49800)
                          return r.CLUSTER_BREAK.LV;
                      } else if (49801 <= e && e <= 49827)
                        return r.CLUSTER_BREAK.LVT;
                    } else if (e < 49829) {
                      if (e === 49828)
                        return r.CLUSTER_BREAK.LV;
                    } else if (e < 49856) {
                      if (49829 <= e && e <= 49855)
                        return r.CLUSTER_BREAK.LVT;
                    } else if (e === 49856)
                      return r.CLUSTER_BREAK.LV;
                  } else if (e < 49912) {
                    if (e < 49884) {
                      if (49857 <= e && e <= 49883)
                        return r.CLUSTER_BREAK.LVT;
                    } else if (e < 49885) {
                      if (e === 49884)
                        return r.CLUSTER_BREAK.LV;
                    } else if (49885 <= e && e <= 49911)
                      return r.CLUSTER_BREAK.LVT;
                  } else if (e < 49913) {
                    if (e === 49912)
                      return r.CLUSTER_BREAK.LV;
                  } else if (e < 49940) {
                    if (49913 <= e && e <= 49939)
                      return r.CLUSTER_BREAK.LVT;
                  } else if (e === 49940)
                    return r.CLUSTER_BREAK.LV;
                } else if (e < 50024) {
                  if (e < 49969) {
                    if (e < 49968) {
                      if (49941 <= e && e <= 49967)
                        return r.CLUSTER_BREAK.LVT;
                    } else if (e === 49968)
                      return r.CLUSTER_BREAK.LV;
                  } else if (e < 49996) {
                    if (49969 <= e && e <= 49995)
                      return r.CLUSTER_BREAK.LVT;
                  } else if (e < 49997) {
                    if (e === 49996)
                      return r.CLUSTER_BREAK.LV;
                  } else if (49997 <= e && e <= 50023)
                    return r.CLUSTER_BREAK.LVT;
                } else if (e < 50053) {
                  if (e < 50025) {
                    if (e === 50024)
                      return r.CLUSTER_BREAK.LV;
                  } else if (e < 50052) {
                    if (50025 <= e && e <= 50051)
                      return r.CLUSTER_BREAK.LVT;
                  } else if (e === 50052)
                    return r.CLUSTER_BREAK.LV;
                } else if (e < 50080) {
                  if (50053 <= e && e <= 50079)
                    return r.CLUSTER_BREAK.LVT;
                } else if (e < 50081) {
                  if (e === 50080)
                    return r.CLUSTER_BREAK.LV;
                } else if (50081 <= e && e <= 50107)
                  return r.CLUSTER_BREAK.LVT;
              } else if (e < 50697) {
                if (e < 50389) {
                  if (e < 50248) {
                    if (e < 50165) {
                      if (e < 50136) {
                        if (e < 50109) {
                          if (e === 50108)
                            return r.CLUSTER_BREAK.LV;
                        } else if (50109 <= e && e <= 50135)
                          return r.CLUSTER_BREAK.LVT;
                      } else if (e < 50137) {
                        if (e === 50136)
                          return r.CLUSTER_BREAK.LV;
                      } else if (e < 50164) {
                        if (50137 <= e && e <= 50163)
                          return r.CLUSTER_BREAK.LVT;
                      } else if (e === 50164)
                        return r.CLUSTER_BREAK.LV;
                    } else if (e < 50193) {
                      if (e < 50192) {
                        if (50165 <= e && e <= 50191)
                          return r.CLUSTER_BREAK.LVT;
                      } else if (e === 50192)
                        return r.CLUSTER_BREAK.LV;
                    } else if (e < 50220) {
                      if (50193 <= e && e <= 50219)
                        return r.CLUSTER_BREAK.LVT;
                    } else if (e < 50221) {
                      if (e === 50220)
                        return r.CLUSTER_BREAK.LV;
                    } else if (50221 <= e && e <= 50247)
                      return r.CLUSTER_BREAK.LVT;
                  } else if (e < 50305) {
                    if (e < 50276) {
                      if (e < 50249) {
                        if (e === 50248)
                          return r.CLUSTER_BREAK.LV;
                      } else if (50249 <= e && e <= 50275)
                        return r.CLUSTER_BREAK.LVT;
                    } else if (e < 50277) {
                      if (e === 50276)
                        return r.CLUSTER_BREAK.LV;
                    } else if (e < 50304) {
                      if (50277 <= e && e <= 50303)
                        return r.CLUSTER_BREAK.LVT;
                    } else if (e === 50304)
                      return r.CLUSTER_BREAK.LV;
                  } else if (e < 50360) {
                    if (e < 50332) {
                      if (50305 <= e && e <= 50331)
                        return r.CLUSTER_BREAK.LVT;
                    } else if (e < 50333) {
                      if (e === 50332)
                        return r.CLUSTER_BREAK.LV;
                    } else if (50333 <= e && e <= 50359)
                      return r.CLUSTER_BREAK.LVT;
                  } else if (e < 50361) {
                    if (e === 50360)
                      return r.CLUSTER_BREAK.LV;
                  } else if (e < 50388) {
                    if (50361 <= e && e <= 50387)
                      return r.CLUSTER_BREAK.LVT;
                  } else if (e === 50388)
                    return r.CLUSTER_BREAK.LV;
                } else if (e < 50556) {
                  if (e < 50472) {
                    if (e < 50417) {
                      if (e < 50416) {
                        if (50389 <= e && e <= 50415)
                          return r.CLUSTER_BREAK.LVT;
                      } else if (e === 50416)
                        return r.CLUSTER_BREAK.LV;
                    } else if (e < 50444) {
                      if (50417 <= e && e <= 50443)
                        return r.CLUSTER_BREAK.LVT;
                    } else if (e < 50445) {
                      if (e === 50444)
                        return r.CLUSTER_BREAK.LV;
                    } else if (50445 <= e && e <= 50471)
                      return r.CLUSTER_BREAK.LVT;
                  } else if (e < 50501) {
                    if (e < 50473) {
                      if (e === 50472)
                        return r.CLUSTER_BREAK.LV;
                    } else if (e < 50500) {
                      if (50473 <= e && e <= 50499)
                        return r.CLUSTER_BREAK.LVT;
                    } else if (e === 50500)
                      return r.CLUSTER_BREAK.LV;
                  } else if (e < 50528) {
                    if (50501 <= e && e <= 50527)
                      return r.CLUSTER_BREAK.LVT;
                  } else if (e < 50529) {
                    if (e === 50528)
                      return r.CLUSTER_BREAK.LV;
                  } else if (50529 <= e && e <= 50555)
                    return r.CLUSTER_BREAK.LVT;
                } else if (e < 50613) {
                  if (e < 50584) {
                    if (e < 50557) {
                      if (e === 50556)
                        return r.CLUSTER_BREAK.LV;
                    } else if (50557 <= e && e <= 50583)
                      return r.CLUSTER_BREAK.LVT;
                  } else if (e < 50585) {
                    if (e === 50584)
                      return r.CLUSTER_BREAK.LV;
                  } else if (e < 50612) {
                    if (50585 <= e && e <= 50611)
                      return r.CLUSTER_BREAK.LVT;
                  } else if (e === 50612)
                    return r.CLUSTER_BREAK.LV;
                } else if (e < 50668) {
                  if (e < 50640) {
                    if (50613 <= e && e <= 50639)
                      return r.CLUSTER_BREAK.LVT;
                  } else if (e < 50641) {
                    if (e === 50640)
                      return r.CLUSTER_BREAK.LV;
                  } else if (50641 <= e && e <= 50667)
                    return r.CLUSTER_BREAK.LVT;
                } else if (e < 50669) {
                  if (e === 50668)
                    return r.CLUSTER_BREAK.LV;
                } else if (e < 50696) {
                  if (50669 <= e && e <= 50695)
                    return r.CLUSTER_BREAK.LVT;
                } else if (e === 50696)
                  return r.CLUSTER_BREAK.LV;
              } else if (e < 51004) {
                if (e < 50837) {
                  if (e < 50780) {
                    if (e < 50725) {
                      if (e < 50724) {
                        if (50697 <= e && e <= 50723)
                          return r.CLUSTER_BREAK.LVT;
                      } else if (e === 50724)
                        return r.CLUSTER_BREAK.LV;
                    } else if (e < 50752) {
                      if (50725 <= e && e <= 50751)
                        return r.CLUSTER_BREAK.LVT;
                    } else if (e < 50753) {
                      if (e === 50752)
                        return r.CLUSTER_BREAK.LV;
                    } else if (50753 <= e && e <= 50779)
                      return r.CLUSTER_BREAK.LVT;
                  } else if (e < 50808) {
                    if (e < 50781) {
                      if (e === 50780)
                        return r.CLUSTER_BREAK.LV;
                    } else if (50781 <= e && e <= 50807)
                      return r.CLUSTER_BREAK.LVT;
                  } else if (e < 50809) {
                    if (e === 50808)
                      return r.CLUSTER_BREAK.LV;
                  } else if (e < 50836) {
                    if (50809 <= e && e <= 50835)
                      return r.CLUSTER_BREAK.LVT;
                  } else if (e === 50836)
                    return r.CLUSTER_BREAK.LV;
                } else if (e < 50920) {
                  if (e < 50865) {
                    if (e < 50864) {
                      if (50837 <= e && e <= 50863)
                        return r.CLUSTER_BREAK.LVT;
                    } else if (e === 50864)
                      return r.CLUSTER_BREAK.LV;
                  } else if (e < 50892) {
                    if (50865 <= e && e <= 50891)
                      return r.CLUSTER_BREAK.LVT;
                  } else if (e < 50893) {
                    if (e === 50892)
                      return r.CLUSTER_BREAK.LV;
                  } else if (50893 <= e && e <= 50919)
                    return r.CLUSTER_BREAK.LVT;
                } else if (e < 50949) {
                  if (e < 50921) {
                    if (e === 50920)
                      return r.CLUSTER_BREAK.LV;
                  } else if (e < 50948) {
                    if (50921 <= e && e <= 50947)
                      return r.CLUSTER_BREAK.LVT;
                  } else if (e === 50948)
                    return r.CLUSTER_BREAK.LV;
                } else if (e < 50976) {
                  if (50949 <= e && e <= 50975)
                    return r.CLUSTER_BREAK.LVT;
                } else if (e < 50977) {
                  if (e === 50976)
                    return r.CLUSTER_BREAK.LV;
                } else if (50977 <= e && e <= 51003)
                  return r.CLUSTER_BREAK.LVT;
              } else if (e < 51145) {
                if (e < 51061) {
                  if (e < 51032) {
                    if (e < 51005) {
                      if (e === 51004)
                        return r.CLUSTER_BREAK.LV;
                    } else if (51005 <= e && e <= 51031)
                      return r.CLUSTER_BREAK.LVT;
                  } else if (e < 51033) {
                    if (e === 51032)
                      return r.CLUSTER_BREAK.LV;
                  } else if (e < 51060) {
                    if (51033 <= e && e <= 51059)
                      return r.CLUSTER_BREAK.LVT;
                  } else if (e === 51060)
                    return r.CLUSTER_BREAK.LV;
                } else if (e < 51116) {
                  if (e < 51088) {
                    if (51061 <= e && e <= 51087)
                      return r.CLUSTER_BREAK.LVT;
                  } else if (e < 51089) {
                    if (e === 51088)
                      return r.CLUSTER_BREAK.LV;
                  } else if (51089 <= e && e <= 51115)
                    return r.CLUSTER_BREAK.LVT;
                } else if (e < 51117) {
                  if (e === 51116)
                    return r.CLUSTER_BREAK.LV;
                } else if (e < 51144) {
                  if (51117 <= e && e <= 51143)
                    return r.CLUSTER_BREAK.LVT;
                } else if (e === 51144)
                  return r.CLUSTER_BREAK.LV;
              } else if (e < 51228) {
                if (e < 51173) {
                  if (e < 51172) {
                    if (51145 <= e && e <= 51171)
                      return r.CLUSTER_BREAK.LVT;
                  } else if (e === 51172)
                    return r.CLUSTER_BREAK.LV;
                } else if (e < 51200) {
                  if (51173 <= e && e <= 51199)
                    return r.CLUSTER_BREAK.LVT;
                } else if (e < 51201) {
                  if (e === 51200)
                    return r.CLUSTER_BREAK.LV;
                } else if (51201 <= e && e <= 51227)
                  return r.CLUSTER_BREAK.LVT;
              } else if (e < 51257) {
                if (e < 51229) {
                  if (e === 51228)
                    return r.CLUSTER_BREAK.LV;
                } else if (e < 51256) {
                  if (51229 <= e && e <= 51255)
                    return r.CLUSTER_BREAK.LVT;
                } else if (e === 51256)
                  return r.CLUSTER_BREAK.LV;
              } else if (e < 51284) {
                if (51257 <= e && e <= 51283)
                  return r.CLUSTER_BREAK.LVT;
              } else if (e < 51285) {
                if (e === 51284)
                  return r.CLUSTER_BREAK.LV;
              } else if (51285 <= e && e <= 51311)
                return r.CLUSTER_BREAK.LVT;
            } else if (e < 52516) {
              if (e < 51901) {
                if (e < 51593) {
                  if (e < 51452) {
                    if (e < 51369) {
                      if (e < 51340) {
                        if (e < 51313) {
                          if (e === 51312)
                            return r.CLUSTER_BREAK.LV;
                        } else if (51313 <= e && e <= 51339)
                          return r.CLUSTER_BREAK.LVT;
                      } else if (e < 51341) {
                        if (e === 51340)
                          return r.CLUSTER_BREAK.LV;
                      } else if (e < 51368) {
                        if (51341 <= e && e <= 51367)
                          return r.CLUSTER_BREAK.LVT;
                      } else if (e === 51368)
                        return r.CLUSTER_BREAK.LV;
                    } else if (e < 51397) {
                      if (e < 51396) {
                        if (51369 <= e && e <= 51395)
                          return r.CLUSTER_BREAK.LVT;
                      } else if (e === 51396)
                        return r.CLUSTER_BREAK.LV;
                    } else if (e < 51424) {
                      if (51397 <= e && e <= 51423)
                        return r.CLUSTER_BREAK.LVT;
                    } else if (e < 51425) {
                      if (e === 51424)
                        return r.CLUSTER_BREAK.LV;
                    } else if (51425 <= e && e <= 51451)
                      return r.CLUSTER_BREAK.LVT;
                  } else if (e < 51509) {
                    if (e < 51480) {
                      if (e < 51453) {
                        if (e === 51452)
                          return r.CLUSTER_BREAK.LV;
                      } else if (51453 <= e && e <= 51479)
                        return r.CLUSTER_BREAK.LVT;
                    } else if (e < 51481) {
                      if (e === 51480)
                        return r.CLUSTER_BREAK.LV;
                    } else if (e < 51508) {
                      if (51481 <= e && e <= 51507)
                        return r.CLUSTER_BREAK.LVT;
                    } else if (e === 51508)
                      return r.CLUSTER_BREAK.LV;
                  } else if (e < 51564) {
                    if (e < 51536) {
                      if (51509 <= e && e <= 51535)
                        return r.CLUSTER_BREAK.LVT;
                    } else if (e < 51537) {
                      if (e === 51536)
                        return r.CLUSTER_BREAK.LV;
                    } else if (51537 <= e && e <= 51563)
                      return r.CLUSTER_BREAK.LVT;
                  } else if (e < 51565) {
                    if (e === 51564)
                      return r.CLUSTER_BREAK.LV;
                  } else if (e < 51592) {
                    if (51565 <= e && e <= 51591)
                      return r.CLUSTER_BREAK.LVT;
                  } else if (e === 51592)
                    return r.CLUSTER_BREAK.LV;
                } else if (e < 51760) {
                  if (e < 51676) {
                    if (e < 51621) {
                      if (e < 51620) {
                        if (51593 <= e && e <= 51619)
                          return r.CLUSTER_BREAK.LVT;
                      } else if (e === 51620)
                        return r.CLUSTER_BREAK.LV;
                    } else if (e < 51648) {
                      if (51621 <= e && e <= 51647)
                        return r.CLUSTER_BREAK.LVT;
                    } else if (e < 51649) {
                      if (e === 51648)
                        return r.CLUSTER_BREAK.LV;
                    } else if (51649 <= e && e <= 51675)
                      return r.CLUSTER_BREAK.LVT;
                  } else if (e < 51705) {
                    if (e < 51677) {
                      if (e === 51676)
                        return r.CLUSTER_BREAK.LV;
                    } else if (e < 51704) {
                      if (51677 <= e && e <= 51703)
                        return r.CLUSTER_BREAK.LVT;
                    } else if (e === 51704)
                      return r.CLUSTER_BREAK.LV;
                  } else if (e < 51732) {
                    if (51705 <= e && e <= 51731)
                      return r.CLUSTER_BREAK.LVT;
                  } else if (e < 51733) {
                    if (e === 51732)
                      return r.CLUSTER_BREAK.LV;
                  } else if (51733 <= e && e <= 51759)
                    return r.CLUSTER_BREAK.LVT;
                } else if (e < 51817) {
                  if (e < 51788) {
                    if (e < 51761) {
                      if (e === 51760)
                        return r.CLUSTER_BREAK.LV;
                    } else if (51761 <= e && e <= 51787)
                      return r.CLUSTER_BREAK.LVT;
                  } else if (e < 51789) {
                    if (e === 51788)
                      return r.CLUSTER_BREAK.LV;
                  } else if (e < 51816) {
                    if (51789 <= e && e <= 51815)
                      return r.CLUSTER_BREAK.LVT;
                  } else if (e === 51816)
                    return r.CLUSTER_BREAK.LV;
                } else if (e < 51872) {
                  if (e < 51844) {
                    if (51817 <= e && e <= 51843)
                      return r.CLUSTER_BREAK.LVT;
                  } else if (e < 51845) {
                    if (e === 51844)
                      return r.CLUSTER_BREAK.LV;
                  } else if (51845 <= e && e <= 51871)
                    return r.CLUSTER_BREAK.LVT;
                } else if (e < 51873) {
                  if (e === 51872)
                    return r.CLUSTER_BREAK.LV;
                } else if (e < 51900) {
                  if (51873 <= e && e <= 51899)
                    return r.CLUSTER_BREAK.LVT;
                } else if (e === 51900)
                  return r.CLUSTER_BREAK.LV;
              } else if (e < 52208) {
                if (e < 52041) {
                  if (e < 51984) {
                    if (e < 51929) {
                      if (e < 51928) {
                        if (51901 <= e && e <= 51927)
                          return r.CLUSTER_BREAK.LVT;
                      } else if (e === 51928)
                        return r.CLUSTER_BREAK.LV;
                    } else if (e < 51956) {
                      if (51929 <= e && e <= 51955)
                        return r.CLUSTER_BREAK.LVT;
                    } else if (e < 51957) {
                      if (e === 51956)
                        return r.CLUSTER_BREAK.LV;
                    } else if (51957 <= e && e <= 51983)
                      return r.CLUSTER_BREAK.LVT;
                  } else if (e < 52012) {
                    if (e < 51985) {
                      if (e === 51984)
                        return r.CLUSTER_BREAK.LV;
                    } else if (51985 <= e && e <= 52011)
                      return r.CLUSTER_BREAK.LVT;
                  } else if (e < 52013) {
                    if (e === 52012)
                      return r.CLUSTER_BREAK.LV;
                  } else if (e < 52040) {
                    if (52013 <= e && e <= 52039)
                      return r.CLUSTER_BREAK.LVT;
                  } else if (e === 52040)
                    return r.CLUSTER_BREAK.LV;
                } else if (e < 52124) {
                  if (e < 52069) {
                    if (e < 52068) {
                      if (52041 <= e && e <= 52067)
                        return r.CLUSTER_BREAK.LVT;
                    } else if (e === 52068)
                      return r.CLUSTER_BREAK.LV;
                  } else if (e < 52096) {
                    if (52069 <= e && e <= 52095)
                      return r.CLUSTER_BREAK.LVT;
                  } else if (e < 52097) {
                    if (e === 52096)
                      return r.CLUSTER_BREAK.LV;
                  } else if (52097 <= e && e <= 52123)
                    return r.CLUSTER_BREAK.LVT;
                } else if (e < 52153) {
                  if (e < 52125) {
                    if (e === 52124)
                      return r.CLUSTER_BREAK.LV;
                  } else if (e < 52152) {
                    if (52125 <= e && e <= 52151)
                      return r.CLUSTER_BREAK.LVT;
                  } else if (e === 52152)
                    return r.CLUSTER_BREAK.LV;
                } else if (e < 52180) {
                  if (52153 <= e && e <= 52179)
                    return r.CLUSTER_BREAK.LVT;
                } else if (e < 52181) {
                  if (e === 52180)
                    return r.CLUSTER_BREAK.LV;
                } else if (52181 <= e && e <= 52207)
                  return r.CLUSTER_BREAK.LVT;
              } else if (e < 52349) {
                if (e < 52265) {
                  if (e < 52236) {
                    if (e < 52209) {
                      if (e === 52208)
                        return r.CLUSTER_BREAK.LV;
                    } else if (52209 <= e && e <= 52235)
                      return r.CLUSTER_BREAK.LVT;
                  } else if (e < 52237) {
                    if (e === 52236)
                      return r.CLUSTER_BREAK.LV;
                  } else if (e < 52264) {
                    if (52237 <= e && e <= 52263)
                      return r.CLUSTER_BREAK.LVT;
                  } else if (e === 52264)
                    return r.CLUSTER_BREAK.LV;
                } else if (e < 52320) {
                  if (e < 52292) {
                    if (52265 <= e && e <= 52291)
                      return r.CLUSTER_BREAK.LVT;
                  } else if (e < 52293) {
                    if (e === 52292)
                      return r.CLUSTER_BREAK.LV;
                  } else if (52293 <= e && e <= 52319)
                    return r.CLUSTER_BREAK.LVT;
                } else if (e < 52321) {
                  if (e === 52320)
                    return r.CLUSTER_BREAK.LV;
                } else if (e < 52348) {
                  if (52321 <= e && e <= 52347)
                    return r.CLUSTER_BREAK.LVT;
                } else if (e === 52348)
                  return r.CLUSTER_BREAK.LV;
              } else if (e < 52432) {
                if (e < 52377) {
                  if (e < 52376) {
                    if (52349 <= e && e <= 52375)
                      return r.CLUSTER_BREAK.LVT;
                  } else if (e === 52376)
                    return r.CLUSTER_BREAK.LV;
                } else if (e < 52404) {
                  if (52377 <= e && e <= 52403)
                    return r.CLUSTER_BREAK.LVT;
                } else if (e < 52405) {
                  if (e === 52404)
                    return r.CLUSTER_BREAK.LV;
                } else if (52405 <= e && e <= 52431)
                  return r.CLUSTER_BREAK.LVT;
              } else if (e < 52461) {
                if (e < 52433) {
                  if (e === 52432)
                    return r.CLUSTER_BREAK.LV;
                } else if (e < 52460) {
                  if (52433 <= e && e <= 52459)
                    return r.CLUSTER_BREAK.LVT;
                } else if (e === 52460)
                  return r.CLUSTER_BREAK.LV;
              } else if (e < 52488) {
                if (52461 <= e && e <= 52487)
                  return r.CLUSTER_BREAK.LVT;
              } else if (e < 52489) {
                if (e === 52488)
                  return r.CLUSTER_BREAK.LV;
              } else if (52489 <= e && e <= 52515)
                return r.CLUSTER_BREAK.LVT;
            } else if (e < 53105) {
              if (e < 52797) {
                if (e < 52656) {
                  if (e < 52573) {
                    if (e < 52544) {
                      if (e < 52517) {
                        if (e === 52516)
                          return r.CLUSTER_BREAK.LV;
                      } else if (52517 <= e && e <= 52543)
                        return r.CLUSTER_BREAK.LVT;
                    } else if (e < 52545) {
                      if (e === 52544)
                        return r.CLUSTER_BREAK.LV;
                    } else if (e < 52572) {
                      if (52545 <= e && e <= 52571)
                        return r.CLUSTER_BREAK.LVT;
                    } else if (e === 52572)
                      return r.CLUSTER_BREAK.LV;
                  } else if (e < 52601) {
                    if (e < 52600) {
                      if (52573 <= e && e <= 52599)
                        return r.CLUSTER_BREAK.LVT;
                    } else if (e === 52600)
                      return r.CLUSTER_BREAK.LV;
                  } else if (e < 52628) {
                    if (52601 <= e && e <= 52627)
                      return r.CLUSTER_BREAK.LVT;
                  } else if (e < 52629) {
                    if (e === 52628)
                      return r.CLUSTER_BREAK.LV;
                  } else if (52629 <= e && e <= 52655)
                    return r.CLUSTER_BREAK.LVT;
                } else if (e < 52713) {
                  if (e < 52684) {
                    if (e < 52657) {
                      if (e === 52656)
                        return r.CLUSTER_BREAK.LV;
                    } else if (52657 <= e && e <= 52683)
                      return r.CLUSTER_BREAK.LVT;
                  } else if (e < 52685) {
                    if (e === 52684)
                      return r.CLUSTER_BREAK.LV;
                  } else if (e < 52712) {
                    if (52685 <= e && e <= 52711)
                      return r.CLUSTER_BREAK.LVT;
                  } else if (e === 52712)
                    return r.CLUSTER_BREAK.LV;
                } else if (e < 52768) {
                  if (e < 52740) {
                    if (52713 <= e && e <= 52739)
                      return r.CLUSTER_BREAK.LVT;
                  } else if (e < 52741) {
                    if (e === 52740)
                      return r.CLUSTER_BREAK.LV;
                  } else if (52741 <= e && e <= 52767)
                    return r.CLUSTER_BREAK.LVT;
                } else if (e < 52769) {
                  if (e === 52768)
                    return r.CLUSTER_BREAK.LV;
                } else if (e < 52796) {
                  if (52769 <= e && e <= 52795)
                    return r.CLUSTER_BREAK.LVT;
                } else if (e === 52796)
                  return r.CLUSTER_BREAK.LV;
              } else if (e < 52964) {
                if (e < 52880) {
                  if (e < 52825) {
                    if (e < 52824) {
                      if (52797 <= e && e <= 52823)
                        return r.CLUSTER_BREAK.LVT;
                    } else if (e === 52824)
                      return r.CLUSTER_BREAK.LV;
                  } else if (e < 52852) {
                    if (52825 <= e && e <= 52851)
                      return r.CLUSTER_BREAK.LVT;
                  } else if (e < 52853) {
                    if (e === 52852)
                      return r.CLUSTER_BREAK.LV;
                  } else if (52853 <= e && e <= 52879)
                    return r.CLUSTER_BREAK.LVT;
                } else if (e < 52909) {
                  if (e < 52881) {
                    if (e === 52880)
                      return r.CLUSTER_BREAK.LV;
                  } else if (e < 52908) {
                    if (52881 <= e && e <= 52907)
                      return r.CLUSTER_BREAK.LVT;
                  } else if (e === 52908)
                    return r.CLUSTER_BREAK.LV;
                } else if (e < 52936) {
                  if (52909 <= e && e <= 52935)
                    return r.CLUSTER_BREAK.LVT;
                } else if (e < 52937) {
                  if (e === 52936)
                    return r.CLUSTER_BREAK.LV;
                } else if (52937 <= e && e <= 52963)
                  return r.CLUSTER_BREAK.LVT;
              } else if (e < 53021) {
                if (e < 52992) {
                  if (e < 52965) {
                    if (e === 52964)
                      return r.CLUSTER_BREAK.LV;
                  } else if (52965 <= e && e <= 52991)
                    return r.CLUSTER_BREAK.LVT;
                } else if (e < 52993) {
                  if (e === 52992)
                    return r.CLUSTER_BREAK.LV;
                } else if (e < 53020) {
                  if (52993 <= e && e <= 53019)
                    return r.CLUSTER_BREAK.LVT;
                } else if (e === 53020)
                  return r.CLUSTER_BREAK.LV;
              } else if (e < 53076) {
                if (e < 53048) {
                  if (53021 <= e && e <= 53047)
                    return r.CLUSTER_BREAK.LVT;
                } else if (e < 53049) {
                  if (e === 53048)
                    return r.CLUSTER_BREAK.LV;
                } else if (53049 <= e && e <= 53075)
                  return r.CLUSTER_BREAK.LVT;
              } else if (e < 53077) {
                if (e === 53076)
                  return r.CLUSTER_BREAK.LV;
              } else if (e < 53104) {
                if (53077 <= e && e <= 53103)
                  return r.CLUSTER_BREAK.LVT;
              } else if (e === 53104)
                return r.CLUSTER_BREAK.LV;
            } else if (e < 53412) {
              if (e < 53245) {
                if (e < 53188) {
                  if (e < 53133) {
                    if (e < 53132) {
                      if (53105 <= e && e <= 53131)
                        return r.CLUSTER_BREAK.LVT;
                    } else if (e === 53132)
                      return r.CLUSTER_BREAK.LV;
                  } else if (e < 53160) {
                    if (53133 <= e && e <= 53159)
                      return r.CLUSTER_BREAK.LVT;
                  } else if (e < 53161) {
                    if (e === 53160)
                      return r.CLUSTER_BREAK.LV;
                  } else if (53161 <= e && e <= 53187)
                    return r.CLUSTER_BREAK.LVT;
                } else if (e < 53216) {
                  if (e < 53189) {
                    if (e === 53188)
                      return r.CLUSTER_BREAK.LV;
                  } else if (53189 <= e && e <= 53215)
                    return r.CLUSTER_BREAK.LVT;
                } else if (e < 53217) {
                  if (e === 53216)
                    return r.CLUSTER_BREAK.LV;
                } else if (e < 53244) {
                  if (53217 <= e && e <= 53243)
                    return r.CLUSTER_BREAK.LVT;
                } else if (e === 53244)
                  return r.CLUSTER_BREAK.LV;
              } else if (e < 53328) {
                if (e < 53273) {
                  if (e < 53272) {
                    if (53245 <= e && e <= 53271)
                      return r.CLUSTER_BREAK.LVT;
                  } else if (e === 53272)
                    return r.CLUSTER_BREAK.LV;
                } else if (e < 53300) {
                  if (53273 <= e && e <= 53299)
                    return r.CLUSTER_BREAK.LVT;
                } else if (e < 53301) {
                  if (e === 53300)
                    return r.CLUSTER_BREAK.LV;
                } else if (53301 <= e && e <= 53327)
                  return r.CLUSTER_BREAK.LVT;
              } else if (e < 53357) {
                if (e < 53329) {
                  if (e === 53328)
                    return r.CLUSTER_BREAK.LV;
                } else if (e < 53356) {
                  if (53329 <= e && e <= 53355)
                    return r.CLUSTER_BREAK.LVT;
                } else if (e === 53356)
                  return r.CLUSTER_BREAK.LV;
              } else if (e < 53384) {
                if (53357 <= e && e <= 53383)
                  return r.CLUSTER_BREAK.LVT;
              } else if (e < 53385) {
                if (e === 53384)
                  return r.CLUSTER_BREAK.LV;
              } else if (53385 <= e && e <= 53411)
                return r.CLUSTER_BREAK.LVT;
            } else if (e < 53553) {
              if (e < 53469) {
                if (e < 53440) {
                  if (e < 53413) {
                    if (e === 53412)
                      return r.CLUSTER_BREAK.LV;
                  } else if (53413 <= e && e <= 53439)
                    return r.CLUSTER_BREAK.LVT;
                } else if (e < 53441) {
                  if (e === 53440)
                    return r.CLUSTER_BREAK.LV;
                } else if (e < 53468) {
                  if (53441 <= e && e <= 53467)
                    return r.CLUSTER_BREAK.LVT;
                } else if (e === 53468)
                  return r.CLUSTER_BREAK.LV;
              } else if (e < 53524) {
                if (e < 53496) {
                  if (53469 <= e && e <= 53495)
                    return r.CLUSTER_BREAK.LVT;
                } else if (e < 53497) {
                  if (e === 53496)
                    return r.CLUSTER_BREAK.LV;
                } else if (53497 <= e && e <= 53523)
                  return r.CLUSTER_BREAK.LVT;
              } else if (e < 53525) {
                if (e === 53524)
                  return r.CLUSTER_BREAK.LV;
              } else if (e < 53552) {
                if (53525 <= e && e <= 53551)
                  return r.CLUSTER_BREAK.LVT;
              } else if (e === 53552)
                return r.CLUSTER_BREAK.LV;
            } else if (e < 53636) {
              if (e < 53581) {
                if (e < 53580) {
                  if (53553 <= e && e <= 53579)
                    return r.CLUSTER_BREAK.LVT;
                } else if (e === 53580)
                  return r.CLUSTER_BREAK.LV;
              } else if (e < 53608) {
                if (53581 <= e && e <= 53607)
                  return r.CLUSTER_BREAK.LVT;
              } else if (e < 53609) {
                if (e === 53608)
                  return r.CLUSTER_BREAK.LV;
              } else if (53609 <= e && e <= 53635)
                return r.CLUSTER_BREAK.LVT;
            } else if (e < 53665) {
              if (e < 53637) {
                if (e === 53636)
                  return r.CLUSTER_BREAK.LV;
              } else if (e < 53664) {
                if (53637 <= e && e <= 53663)
                  return r.CLUSTER_BREAK.LVT;
              } else if (e === 53664)
                return r.CLUSTER_BREAK.LV;
            } else if (e < 53692) {
              if (53665 <= e && e <= 53691)
                return r.CLUSTER_BREAK.LVT;
            } else if (e < 53693) {
              if (e === 53692)
                return r.CLUSTER_BREAK.LV;
            } else if (53693 <= e && e <= 53719)
              return r.CLUSTER_BREAK.LVT;
          } else if (e < 70459) {
            if (e < 54897) {
              if (e < 54308) {
                if (e < 54001) {
                  if (e < 53860) {
                    if (e < 53777) {
                      if (e < 53748) {
                        if (e < 53721) {
                          if (e === 53720)
                            return r.CLUSTER_BREAK.LV;
                        } else if (53721 <= e && e <= 53747)
                          return r.CLUSTER_BREAK.LVT;
                      } else if (e < 53749) {
                        if (e === 53748)
                          return r.CLUSTER_BREAK.LV;
                      } else if (e < 53776) {
                        if (53749 <= e && e <= 53775)
                          return r.CLUSTER_BREAK.LVT;
                      } else if (e === 53776)
                        return r.CLUSTER_BREAK.LV;
                    } else if (e < 53805) {
                      if (e < 53804) {
                        if (53777 <= e && e <= 53803)
                          return r.CLUSTER_BREAK.LVT;
                      } else if (e === 53804)
                        return r.CLUSTER_BREAK.LV;
                    } else if (e < 53832) {
                      if (53805 <= e && e <= 53831)
                        return r.CLUSTER_BREAK.LVT;
                    } else if (e < 53833) {
                      if (e === 53832)
                        return r.CLUSTER_BREAK.LV;
                    } else if (53833 <= e && e <= 53859)
                      return r.CLUSTER_BREAK.LVT;
                  } else if (e < 53917) {
                    if (e < 53888) {
                      if (e < 53861) {
                        if (e === 53860)
                          return r.CLUSTER_BREAK.LV;
                      } else if (53861 <= e && e <= 53887)
                        return r.CLUSTER_BREAK.LVT;
                    } else if (e < 53889) {
                      if (e === 53888)
                        return r.CLUSTER_BREAK.LV;
                    } else if (e < 53916) {
                      if (53889 <= e && e <= 53915)
                        return r.CLUSTER_BREAK.LVT;
                    } else if (e === 53916)
                      return r.CLUSTER_BREAK.LV;
                  } else if (e < 53972) {
                    if (e < 53944) {
                      if (53917 <= e && e <= 53943)
                        return r.CLUSTER_BREAK.LVT;
                    } else if (e < 53945) {
                      if (e === 53944)
                        return r.CLUSTER_BREAK.LV;
                    } else if (53945 <= e && e <= 53971)
                      return r.CLUSTER_BREAK.LVT;
                  } else if (e < 53973) {
                    if (e === 53972)
                      return r.CLUSTER_BREAK.LV;
                  } else if (e < 54e3) {
                    if (53973 <= e && e <= 53999)
                      return r.CLUSTER_BREAK.LVT;
                  } else if (e === 54e3)
                    return r.CLUSTER_BREAK.LV;
                } else if (e < 54141) {
                  if (e < 54084) {
                    if (e < 54029) {
                      if (e < 54028) {
                        if (54001 <= e && e <= 54027)
                          return r.CLUSTER_BREAK.LVT;
                      } else if (e === 54028)
                        return r.CLUSTER_BREAK.LV;
                    } else if (e < 54056) {
                      if (54029 <= e && e <= 54055)
                        return r.CLUSTER_BREAK.LVT;
                    } else if (e < 54057) {
                      if (e === 54056)
                        return r.CLUSTER_BREAK.LV;
                    } else if (54057 <= e && e <= 54083)
                      return r.CLUSTER_BREAK.LVT;
                  } else if (e < 54112) {
                    if (e < 54085) {
                      if (e === 54084)
                        return r.CLUSTER_BREAK.LV;
                    } else if (54085 <= e && e <= 54111)
                      return r.CLUSTER_BREAK.LVT;
                  } else if (e < 54113) {
                    if (e === 54112)
                      return r.CLUSTER_BREAK.LV;
                  } else if (e < 54140) {
                    if (54113 <= e && e <= 54139)
                      return r.CLUSTER_BREAK.LVT;
                  } else if (e === 54140)
                    return r.CLUSTER_BREAK.LV;
                } else if (e < 54224) {
                  if (e < 54169) {
                    if (e < 54168) {
                      if (54141 <= e && e <= 54167)
                        return r.CLUSTER_BREAK.LVT;
                    } else if (e === 54168)
                      return r.CLUSTER_BREAK.LV;
                  } else if (e < 54196) {
                    if (54169 <= e && e <= 54195)
                      return r.CLUSTER_BREAK.LVT;
                  } else if (e < 54197) {
                    if (e === 54196)
                      return r.CLUSTER_BREAK.LV;
                  } else if (54197 <= e && e <= 54223)
                    return r.CLUSTER_BREAK.LVT;
                } else if (e < 54253) {
                  if (e < 54225) {
                    if (e === 54224)
                      return r.CLUSTER_BREAK.LV;
                  } else if (e < 54252) {
                    if (54225 <= e && e <= 54251)
                      return r.CLUSTER_BREAK.LVT;
                  } else if (e === 54252)
                    return r.CLUSTER_BREAK.LV;
                } else if (e < 54280) {
                  if (54253 <= e && e <= 54279)
                    return r.CLUSTER_BREAK.LVT;
                } else if (e < 54281) {
                  if (e === 54280)
                    return r.CLUSTER_BREAK.LV;
                } else if (54281 <= e && e <= 54307)
                  return r.CLUSTER_BREAK.LVT;
              } else if (e < 54589) {
                if (e < 54448) {
                  if (e < 54365) {
                    if (e < 54336) {
                      if (e < 54309) {
                        if (e === 54308)
                          return r.CLUSTER_BREAK.LV;
                      } else if (54309 <= e && e <= 54335)
                        return r.CLUSTER_BREAK.LVT;
                    } else if (e < 54337) {
                      if (e === 54336)
                        return r.CLUSTER_BREAK.LV;
                    } else if (e < 54364) {
                      if (54337 <= e && e <= 54363)
                        return r.CLUSTER_BREAK.LVT;
                    } else if (e === 54364)
                      return r.CLUSTER_BREAK.LV;
                  } else if (e < 54393) {
                    if (e < 54392) {
                      if (54365 <= e && e <= 54391)
                        return r.CLUSTER_BREAK.LVT;
                    } else if (e === 54392)
                      return r.CLUSTER_BREAK.LV;
                  } else if (e < 54420) {
                    if (54393 <= e && e <= 54419)
                      return r.CLUSTER_BREAK.LVT;
                  } else if (e < 54421) {
                    if (e === 54420)
                      return r.CLUSTER_BREAK.LV;
                  } else if (54421 <= e && e <= 54447)
                    return r.CLUSTER_BREAK.LVT;
                } else if (e < 54505) {
                  if (e < 54476) {
                    if (e < 54449) {
                      if (e === 54448)
                        return r.CLUSTER_BREAK.LV;
                    } else if (54449 <= e && e <= 54475)
                      return r.CLUSTER_BREAK.LVT;
                  } else if (e < 54477) {
                    if (e === 54476)
                      return r.CLUSTER_BREAK.LV;
                  } else if (e < 54504) {
                    if (54477 <= e && e <= 54503)
                      return r.CLUSTER_BREAK.LVT;
                  } else if (e === 54504)
                    return r.CLUSTER_BREAK.LV;
                } else if (e < 54560) {
                  if (e < 54532) {
                    if (54505 <= e && e <= 54531)
                      return r.CLUSTER_BREAK.LVT;
                  } else if (e < 54533) {
                    if (e === 54532)
                      return r.CLUSTER_BREAK.LV;
                  } else if (54533 <= e && e <= 54559)
                    return r.CLUSTER_BREAK.LVT;
                } else if (e < 54561) {
                  if (e === 54560)
                    return r.CLUSTER_BREAK.LV;
                } else if (e < 54588) {
                  if (54561 <= e && e <= 54587)
                    return r.CLUSTER_BREAK.LVT;
                } else if (e === 54588)
                  return r.CLUSTER_BREAK.LV;
              } else if (e < 54756) {
                if (e < 54672) {
                  if (e < 54617) {
                    if (e < 54616) {
                      if (54589 <= e && e <= 54615)
                        return r.CLUSTER_BREAK.LVT;
                    } else if (e === 54616)
                      return r.CLUSTER_BREAK.LV;
                  } else if (e < 54644) {
                    if (54617 <= e && e <= 54643)
                      return r.CLUSTER_BREAK.LVT;
                  } else if (e < 54645) {
                    if (e === 54644)
                      return r.CLUSTER_BREAK.LV;
                  } else if (54645 <= e && e <= 54671)
                    return r.CLUSTER_BREAK.LVT;
                } else if (e < 54701) {
                  if (e < 54673) {
                    if (e === 54672)
                      return r.CLUSTER_BREAK.LV;
                  } else if (e < 54700) {
                    if (54673 <= e && e <= 54699)
                      return r.CLUSTER_BREAK.LVT;
                  } else if (e === 54700)
                    return r.CLUSTER_BREAK.LV;
                } else if (e < 54728) {
                  if (54701 <= e && e <= 54727)
                    return r.CLUSTER_BREAK.LVT;
                } else if (e < 54729) {
                  if (e === 54728)
                    return r.CLUSTER_BREAK.LV;
                } else if (54729 <= e && e <= 54755)
                  return r.CLUSTER_BREAK.LVT;
              } else if (e < 54813) {
                if (e < 54784) {
                  if (e < 54757) {
                    if (e === 54756)
                      return r.CLUSTER_BREAK.LV;
                  } else if (54757 <= e && e <= 54783)
                    return r.CLUSTER_BREAK.LVT;
                } else if (e < 54785) {
                  if (e === 54784)
                    return r.CLUSTER_BREAK.LV;
                } else if (e < 54812) {
                  if (54785 <= e && e <= 54811)
                    return r.CLUSTER_BREAK.LVT;
                } else if (e === 54812)
                  return r.CLUSTER_BREAK.LV;
              } else if (e < 54868) {
                if (e < 54840) {
                  if (54813 <= e && e <= 54839)
                    return r.CLUSTER_BREAK.LVT;
                } else if (e < 54841) {
                  if (e === 54840)
                    return r.CLUSTER_BREAK.LV;
                } else if (54841 <= e && e <= 54867)
                  return r.CLUSTER_BREAK.LVT;
              } else if (e < 54869) {
                if (e === 54868)
                  return r.CLUSTER_BREAK.LV;
              } else if (e < 54896) {
                if (54869 <= e && e <= 54895)
                  return r.CLUSTER_BREAK.LVT;
              } else if (e === 54896)
                return r.CLUSTER_BREAK.LV;
            } else if (e < 69632) {
              if (e < 55216) {
                if (e < 55037) {
                  if (e < 54980) {
                    if (e < 54925) {
                      if (e < 54924) {
                        if (54897 <= e && e <= 54923)
                          return r.CLUSTER_BREAK.LVT;
                      } else if (e === 54924)
                        return r.CLUSTER_BREAK.LV;
                    } else if (e < 54952) {
                      if (54925 <= e && e <= 54951)
                        return r.CLUSTER_BREAK.LVT;
                    } else if (e < 54953) {
                      if (e === 54952)
                        return r.CLUSTER_BREAK.LV;
                    } else if (54953 <= e && e <= 54979)
                      return r.CLUSTER_BREAK.LVT;
                  } else if (e < 55008) {
                    if (e < 54981) {
                      if (e === 54980)
                        return r.CLUSTER_BREAK.LV;
                    } else if (54981 <= e && e <= 55007)
                      return r.CLUSTER_BREAK.LVT;
                  } else if (e < 55009) {
                    if (e === 55008)
                      return r.CLUSTER_BREAK.LV;
                  } else if (e < 55036) {
                    if (55009 <= e && e <= 55035)
                      return r.CLUSTER_BREAK.LVT;
                  } else if (e === 55036)
                    return r.CLUSTER_BREAK.LV;
                } else if (e < 55120) {
                  if (e < 55065) {
                    if (e < 55064) {
                      if (55037 <= e && e <= 55063)
                        return r.CLUSTER_BREAK.LVT;
                    } else if (e === 55064)
                      return r.CLUSTER_BREAK.LV;
                  } else if (e < 55092) {
                    if (55065 <= e && e <= 55091)
                      return r.CLUSTER_BREAK.LVT;
                  } else if (e < 55093) {
                    if (e === 55092)
                      return r.CLUSTER_BREAK.LV;
                  } else if (55093 <= e && e <= 55119)
                    return r.CLUSTER_BREAK.LVT;
                } else if (e < 55149) {
                  if (e < 55121) {
                    if (e === 55120)
                      return r.CLUSTER_BREAK.LV;
                  } else if (e < 55148) {
                    if (55121 <= e && e <= 55147)
                      return r.CLUSTER_BREAK.LVT;
                  } else if (e === 55148)
                    return r.CLUSTER_BREAK.LV;
                } else if (e < 55176) {
                  if (55149 <= e && e <= 55175)
                    return r.CLUSTER_BREAK.LVT;
                } else if (e < 55177) {
                  if (e === 55176)
                    return r.CLUSTER_BREAK.LV;
                } else if (55177 <= e && e <= 55203)
                  return r.CLUSTER_BREAK.LVT;
              } else if (e < 68097) {
                if (e < 65279) {
                  if (e < 64286) {
                    if (e < 55243) {
                      if (55216 <= e && e <= 55238)
                        return r.CLUSTER_BREAK.V;
                    } else if (55243 <= e && e <= 55291)
                      return r.CLUSTER_BREAK.T;
                  } else if (e < 65024) {
                    if (e === 64286)
                      return r.CLUSTER_BREAK.EXTEND;
                  } else if (e < 65056) {
                    if (65024 <= e && e <= 65039)
                      return r.CLUSTER_BREAK.EXTEND;
                  } else if (65056 <= e && e <= 65071)
                    return r.CLUSTER_BREAK.EXTEND;
                } else if (e < 66045) {
                  if (e < 65438) {
                    if (e === 65279)
                      return r.CLUSTER_BREAK.CONTROL;
                  } else if (e < 65520) {
                    if (65438 <= e && e <= 65439)
                      return r.CLUSTER_BREAK.EXTEND;
                  } else if (65520 <= e && e <= 65531)
                    return r.CLUSTER_BREAK.CONTROL;
                } else if (e < 66272) {
                  if (e === 66045)
                    return r.CLUSTER_BREAK.EXTEND;
                } else if (e < 66422) {
                  if (e === 66272)
                    return r.CLUSTER_BREAK.EXTEND;
                } else if (66422 <= e && e <= 66426)
                  return r.CLUSTER_BREAK.EXTEND;
              } else if (e < 68325) {
                if (e < 68108) {
                  if (e < 68101) {
                    if (68097 <= e && e <= 68099)
                      return r.CLUSTER_BREAK.EXTEND;
                  } else if (68101 <= e && e <= 68102)
                    return r.CLUSTER_BREAK.EXTEND;
                } else if (e < 68152) {
                  if (68108 <= e && e <= 68111)
                    return r.CLUSTER_BREAK.EXTEND;
                } else if (e < 68159) {
                  if (68152 <= e && e <= 68154)
                    return r.CLUSTER_BREAK.EXTEND;
                } else if (e === 68159)
                  return r.CLUSTER_BREAK.EXTEND;
              } else if (e < 69373) {
                if (e < 68900) {
                  if (68325 <= e && e <= 68326)
                    return r.CLUSTER_BREAK.EXTEND;
                } else if (e < 69291) {
                  if (68900 <= e && e <= 68903)
                    return r.CLUSTER_BREAK.EXTEND;
                } else if (69291 <= e && e <= 69292)
                  return r.CLUSTER_BREAK.EXTEND;
              } else if (e < 69446) {
                if (69373 <= e && e <= 69375)
                  return r.CLUSTER_BREAK.EXTEND;
              } else if (e < 69506) {
                if (69446 <= e && e <= 69456)
                  return r.CLUSTER_BREAK.EXTEND;
              } else if (69506 <= e && e <= 69509)
                return r.CLUSTER_BREAK.EXTEND;
            } else if (e < 70016) {
              if (e < 69815) {
                if (e < 69747) {
                  if (e < 69634) {
                    if (e === 69632)
                      return r.CLUSTER_BREAK.SPACINGMARK;
                    if (e === 69633)
                      return r.CLUSTER_BREAK.EXTEND;
                  } else if (e < 69688) {
                    if (e === 69634)
                      return r.CLUSTER_BREAK.SPACINGMARK;
                  } else if (e < 69744) {
                    if (69688 <= e && e <= 69702)
                      return r.CLUSTER_BREAK.EXTEND;
                  } else if (e === 69744)
                    return r.CLUSTER_BREAK.EXTEND;
                } else if (e < 69762) {
                  if (e < 69759) {
                    if (69747 <= e && e <= 69748)
                      return r.CLUSTER_BREAK.EXTEND;
                  } else if (69759 <= e && e <= 69761)
                    return r.CLUSTER_BREAK.EXTEND;
                } else if (e < 69808) {
                  if (e === 69762)
                    return r.CLUSTER_BREAK.SPACINGMARK;
                } else if (e < 69811) {
                  if (69808 <= e && e <= 69810)
                    return r.CLUSTER_BREAK.SPACINGMARK;
                } else if (69811 <= e && e <= 69814)
                  return r.CLUSTER_BREAK.EXTEND;
              } else if (e < 69888)
                if (e < 69821) {
                  if (e < 69817) {
                    if (69815 <= e && e <= 69816)
                      return r.CLUSTER_BREAK.SPACINGMARK;
                  } else if (69817 <= e && e <= 69818)
                    return r.CLUSTER_BREAK.EXTEND;
                } else if (e < 69826) {
                  if (e === 69821)
                    return r.CLUSTER_BREAK.PREPEND;
                } else {
                  if (e === 69826)
                    return r.CLUSTER_BREAK.EXTEND;
                  if (e === 69837)
                    return r.CLUSTER_BREAK.PREPEND;
                }
              else if (e < 69933) {
                if (e < 69927) {
                  if (69888 <= e && e <= 69890)
                    return r.CLUSTER_BREAK.EXTEND;
                } else if (e < 69932) {
                  if (69927 <= e && e <= 69931)
                    return r.CLUSTER_BREAK.EXTEND;
                } else if (e === 69932)
                  return r.CLUSTER_BREAK.SPACINGMARK;
              } else if (e < 69957) {
                if (69933 <= e && e <= 69940)
                  return r.CLUSTER_BREAK.EXTEND;
              } else if (e < 70003) {
                if (69957 <= e && e <= 69958)
                  return r.CLUSTER_BREAK.SPACINGMARK;
              } else if (e === 70003)
                return r.CLUSTER_BREAK.EXTEND;
            } else if (e < 70194) {
              if (e < 70082) {
                if (e < 70067) {
                  if (e < 70018) {
                    if (70016 <= e && e <= 70017)
                      return r.CLUSTER_BREAK.EXTEND;
                  } else if (e === 70018)
                    return r.CLUSTER_BREAK.SPACINGMARK;
                } else if (e < 70070) {
                  if (70067 <= e && e <= 70069)
                    return r.CLUSTER_BREAK.SPACINGMARK;
                } else if (e < 70079) {
                  if (70070 <= e && e <= 70078)
                    return r.CLUSTER_BREAK.EXTEND;
                } else if (70079 <= e && e <= 70080)
                  return r.CLUSTER_BREAK.SPACINGMARK;
              } else if (e < 70095) {
                if (e < 70089) {
                  if (70082 <= e && e <= 70083)
                    return r.CLUSTER_BREAK.PREPEND;
                } else if (e < 70094) {
                  if (70089 <= e && e <= 70092)
                    return r.CLUSTER_BREAK.EXTEND;
                } else if (e === 70094)
                  return r.CLUSTER_BREAK.SPACINGMARK;
              } else if (e < 70188) {
                if (e === 70095)
                  return r.CLUSTER_BREAK.EXTEND;
              } else if (e < 70191) {
                if (70188 <= e && e <= 70190)
                  return r.CLUSTER_BREAK.SPACINGMARK;
              } else if (70191 <= e && e <= 70193)
                return r.CLUSTER_BREAK.EXTEND;
            } else if (e < 70209) {
              if (e < 70197) {
                if (e < 70196) {
                  if (70194 <= e && e <= 70195)
                    return r.CLUSTER_BREAK.SPACINGMARK;
                } else if (e === 70196)
                  return r.CLUSTER_BREAK.EXTEND;
              } else if (e < 70198) {
                if (e === 70197)
                  return r.CLUSTER_BREAK.SPACINGMARK;
              } else if (e < 70206) {
                if (70198 <= e && e <= 70199)
                  return r.CLUSTER_BREAK.EXTEND;
              } else if (e === 70206)
                return r.CLUSTER_BREAK.EXTEND;
            } else if (e < 70371) {
              if (e < 70367) {
                if (e === 70209)
                  return r.CLUSTER_BREAK.EXTEND;
              } else if (e < 70368) {
                if (e === 70367)
                  return r.CLUSTER_BREAK.EXTEND;
              } else if (70368 <= e && e <= 70370)
                return r.CLUSTER_BREAK.SPACINGMARK;
            } else if (e < 70400) {
              if (70371 <= e && e <= 70378)
                return r.CLUSTER_BREAK.EXTEND;
            } else if (e < 70402) {
              if (70400 <= e && e <= 70401)
                return r.CLUSTER_BREAK.EXTEND;
            } else if (70402 <= e && e <= 70403)
              return r.CLUSTER_BREAK.SPACINGMARK;
          } else if (e < 72343) {
            if (e < 71339) {
              if (e < 70841) {
                if (e < 70512) {
                  if (e < 70471) {
                    if (e < 70463) {
                      if (e < 70462) {
                        if (70459 <= e && e <= 70460)
                          return r.CLUSTER_BREAK.EXTEND;
                      } else if (e === 70462)
                        return r.CLUSTER_BREAK.EXTEND;
                    } else if (e < 70464) {
                      if (e === 70463)
                        return r.CLUSTER_BREAK.SPACINGMARK;
                    } else if (e < 70465) {
                      if (e === 70464)
                        return r.CLUSTER_BREAK.EXTEND;
                    } else if (70465 <= e && e <= 70468)
                      return r.CLUSTER_BREAK.SPACINGMARK;
                  } else if (e < 70487) {
                    if (e < 70475) {
                      if (70471 <= e && e <= 70472)
                        return r.CLUSTER_BREAK.SPACINGMARK;
                    } else if (70475 <= e && e <= 70477)
                      return r.CLUSTER_BREAK.SPACINGMARK;
                  } else if (e < 70498) {
                    if (e === 70487)
                      return r.CLUSTER_BREAK.EXTEND;
                  } else if (e < 70502) {
                    if (70498 <= e && e <= 70499)
                      return r.CLUSTER_BREAK.SPACINGMARK;
                  } else if (70502 <= e && e <= 70508)
                    return r.CLUSTER_BREAK.EXTEND;
                } else if (e < 70725) {
                  if (e < 70712) {
                    if (e < 70709) {
                      if (70512 <= e && e <= 70516)
                        return r.CLUSTER_BREAK.EXTEND;
                    } else if (70709 <= e && e <= 70711)
                      return r.CLUSTER_BREAK.SPACINGMARK;
                  } else if (e < 70720) {
                    if (70712 <= e && e <= 70719)
                      return r.CLUSTER_BREAK.EXTEND;
                  } else if (e < 70722) {
                    if (70720 <= e && e <= 70721)
                      return r.CLUSTER_BREAK.SPACINGMARK;
                  } else if (70722 <= e && e <= 70724)
                    return r.CLUSTER_BREAK.EXTEND;
                } else if (e < 70832) {
                  if (e < 70726) {
                    if (e === 70725)
                      return r.CLUSTER_BREAK.SPACINGMARK;
                  } else if (e === 70726 || e === 70750)
                    return r.CLUSTER_BREAK.EXTEND;
                } else if (e < 70833) {
                  if (e === 70832)
                    return r.CLUSTER_BREAK.EXTEND;
                } else if (e < 70835) {
                  if (70833 <= e && e <= 70834)
                    return r.CLUSTER_BREAK.SPACINGMARK;
                } else if (70835 <= e && e <= 70840)
                  return r.CLUSTER_BREAK.EXTEND;
              } else if (e < 71096) {
                if (e < 70847)
                  if (e < 70843) {
                    if (e === 70841)
                      return r.CLUSTER_BREAK.SPACINGMARK;
                    if (e === 70842)
                      return r.CLUSTER_BREAK.EXTEND;
                  } else if (e < 70845) {
                    if (70843 <= e && e <= 70844)
                      return r.CLUSTER_BREAK.SPACINGMARK;
                  } else {
                    if (e === 70845)
                      return r.CLUSTER_BREAK.EXTEND;
                    if (e === 70846)
                      return r.CLUSTER_BREAK.SPACINGMARK;
                  }
                else if (e < 71087) {
                  if (e < 70849) {
                    if (70847 <= e && e <= 70848)
                      return r.CLUSTER_BREAK.EXTEND;
                  } else if (e < 70850) {
                    if (e === 70849)
                      return r.CLUSTER_BREAK.SPACINGMARK;
                  } else if (70850 <= e && e <= 70851)
                    return r.CLUSTER_BREAK.EXTEND;
                } else if (e < 71088) {
                  if (e === 71087)
                    return r.CLUSTER_BREAK.EXTEND;
                } else if (e < 71090) {
                  if (71088 <= e && e <= 71089)
                    return r.CLUSTER_BREAK.SPACINGMARK;
                } else if (71090 <= e && e <= 71093)
                  return r.CLUSTER_BREAK.EXTEND;
              } else if (e < 71216) {
                if (e < 71102) {
                  if (e < 71100) {
                    if (71096 <= e && e <= 71099)
                      return r.CLUSTER_BREAK.SPACINGMARK;
                  } else if (71100 <= e && e <= 71101)
                    return r.CLUSTER_BREAK.EXTEND;
                } else if (e < 71103) {
                  if (e === 71102)
                    return r.CLUSTER_BREAK.SPACINGMARK;
                } else if (e < 71132) {
                  if (71103 <= e && e <= 71104)
                    return r.CLUSTER_BREAK.EXTEND;
                } else if (71132 <= e && e <= 71133)
                  return r.CLUSTER_BREAK.EXTEND;
              } else if (e < 71229) {
                if (e < 71219) {
                  if (71216 <= e && e <= 71218)
                    return r.CLUSTER_BREAK.SPACINGMARK;
                } else if (e < 71227) {
                  if (71219 <= e && e <= 71226)
                    return r.CLUSTER_BREAK.EXTEND;
                } else if (71227 <= e && e <= 71228)
                  return r.CLUSTER_BREAK.SPACINGMARK;
              } else if (e < 71230) {
                if (e === 71229)
                  return r.CLUSTER_BREAK.EXTEND;
              } else if (e < 71231) {
                if (e === 71230)
                  return r.CLUSTER_BREAK.SPACINGMARK;
              } else if (71231 <= e && e <= 71232)
                return r.CLUSTER_BREAK.EXTEND;
            } else if (e < 71999)
              if (e < 71463) {
                if (e < 71350) {
                  if (e < 71341) {
                    if (e === 71339)
                      return r.CLUSTER_BREAK.EXTEND;
                    if (e === 71340)
                      return r.CLUSTER_BREAK.SPACINGMARK;
                  } else if (e < 71342) {
                    if (e === 71341)
                      return r.CLUSTER_BREAK.EXTEND;
                  } else if (e < 71344) {
                    if (71342 <= e && e <= 71343)
                      return r.CLUSTER_BREAK.SPACINGMARK;
                  } else if (71344 <= e && e <= 71349)
                    return r.CLUSTER_BREAK.EXTEND;
                } else if (e < 71453) {
                  if (e === 71350)
                    return r.CLUSTER_BREAK.SPACINGMARK;
                  if (e === 71351)
                    return r.CLUSTER_BREAK.EXTEND;
                } else if (e < 71458) {
                  if (71453 <= e && e <= 71455)
                    return r.CLUSTER_BREAK.EXTEND;
                } else if (e < 71462) {
                  if (71458 <= e && e <= 71461)
                    return r.CLUSTER_BREAK.EXTEND;
                } else if (e === 71462)
                  return r.CLUSTER_BREAK.SPACINGMARK;
              } else if (e < 71984) {
                if (e < 71727) {
                  if (e < 71724) {
                    if (71463 <= e && e <= 71467)
                      return r.CLUSTER_BREAK.EXTEND;
                  } else if (71724 <= e && e <= 71726)
                    return r.CLUSTER_BREAK.SPACINGMARK;
                } else if (e < 71736) {
                  if (71727 <= e && e <= 71735)
                    return r.CLUSTER_BREAK.EXTEND;
                } else if (e < 71737) {
                  if (e === 71736)
                    return r.CLUSTER_BREAK.SPACINGMARK;
                } else if (71737 <= e && e <= 71738)
                  return r.CLUSTER_BREAK.EXTEND;
              } else if (e < 71995) {
                if (e < 71985) {
                  if (e === 71984)
                    return r.CLUSTER_BREAK.EXTEND;
                } else if (e < 71991) {
                  if (71985 <= e && e <= 71989)
                    return r.CLUSTER_BREAK.SPACINGMARK;
                } else if (71991 <= e && e <= 71992)
                  return r.CLUSTER_BREAK.SPACINGMARK;
              } else if (e < 71997) {
                if (71995 <= e && e <= 71996)
                  return r.CLUSTER_BREAK.EXTEND;
              } else {
                if (e === 71997)
                  return r.CLUSTER_BREAK.SPACINGMARK;
                if (e === 71998)
                  return r.CLUSTER_BREAK.EXTEND;
              }
            else if (e < 72193)
              if (e < 72145)
                if (e < 72001) {
                  if (e === 71999)
                    return r.CLUSTER_BREAK.PREPEND;
                  if (e === 72e3)
                    return r.CLUSTER_BREAK.SPACINGMARK;
                } else if (e < 72002) {
                  if (e === 72001)
                    return r.CLUSTER_BREAK.PREPEND;
                } else {
                  if (e === 72002)
                    return r.CLUSTER_BREAK.SPACINGMARK;
                  if (e === 72003)
                    return r.CLUSTER_BREAK.EXTEND;
                }
              else if (e < 72156) {
                if (e < 72148) {
                  if (72145 <= e && e <= 72147)
                    return r.CLUSTER_BREAK.SPACINGMARK;
                } else if (e < 72154) {
                  if (72148 <= e && e <= 72151)
                    return r.CLUSTER_BREAK.EXTEND;
                } else if (72154 <= e && e <= 72155)
                  return r.CLUSTER_BREAK.EXTEND;
              } else if (e < 72160) {
                if (72156 <= e && e <= 72159)
                  return r.CLUSTER_BREAK.SPACINGMARK;
              } else {
                if (e === 72160)
                  return r.CLUSTER_BREAK.EXTEND;
                if (e === 72164)
                  return r.CLUSTER_BREAK.SPACINGMARK;
              }
            else if (e < 72263) {
              if (e < 72249) {
                if (e < 72243) {
                  if (72193 <= e && e <= 72202)
                    return r.CLUSTER_BREAK.EXTEND;
                } else if (72243 <= e && e <= 72248)
                  return r.CLUSTER_BREAK.EXTEND;
              } else if (e < 72250) {
                if (e === 72249)
                  return r.CLUSTER_BREAK.SPACINGMARK;
              } else if (e < 72251) {
                if (e === 72250)
                  return r.CLUSTER_BREAK.PREPEND;
              } else if (72251 <= e && e <= 72254)
                return r.CLUSTER_BREAK.EXTEND;
            } else if (e < 72281) {
              if (e < 72273) {
                if (e === 72263)
                  return r.CLUSTER_BREAK.EXTEND;
              } else if (e < 72279) {
                if (72273 <= e && e <= 72278)
                  return r.CLUSTER_BREAK.EXTEND;
              } else if (72279 <= e && e <= 72280)
                return r.CLUSTER_BREAK.SPACINGMARK;
            } else if (e < 72324) {
              if (72281 <= e && e <= 72283)
                return r.CLUSTER_BREAK.EXTEND;
            } else if (e < 72330) {
              if (72324 <= e && e <= 72329)
                return r.CLUSTER_BREAK.PREPEND;
            } else if (72330 <= e && e <= 72342)
              return r.CLUSTER_BREAK.EXTEND;
          } else if (e < 94033) {
            if (e < 73104) {
              if (e < 72881) {
                if (e < 72766) {
                  if (e < 72751) {
                    if (e < 72344) {
                      if (e === 72343)
                        return r.CLUSTER_BREAK.SPACINGMARK;
                    } else if (72344 <= e && e <= 72345)
                      return r.CLUSTER_BREAK.EXTEND;
                  } else if (e < 72752) {
                    if (e === 72751)
                      return r.CLUSTER_BREAK.SPACINGMARK;
                  } else if (e < 72760) {
                    if (72752 <= e && e <= 72758)
                      return r.CLUSTER_BREAK.EXTEND;
                  } else if (72760 <= e && e <= 72765)
                    return r.CLUSTER_BREAK.EXTEND;
                } else if (e < 72850) {
                  if (e === 72766)
                    return r.CLUSTER_BREAK.SPACINGMARK;
                  if (e === 72767)
                    return r.CLUSTER_BREAK.EXTEND;
                } else if (e < 72873) {
                  if (72850 <= e && e <= 72871)
                    return r.CLUSTER_BREAK.EXTEND;
                } else if (e < 72874) {
                  if (e === 72873)
                    return r.CLUSTER_BREAK.SPACINGMARK;
                } else if (72874 <= e && e <= 72880)
                  return r.CLUSTER_BREAK.EXTEND;
              } else if (e < 73018) {
                if (e < 72884) {
                  if (e < 72882) {
                    if (e === 72881)
                      return r.CLUSTER_BREAK.SPACINGMARK;
                  } else if (72882 <= e && e <= 72883)
                    return r.CLUSTER_BREAK.EXTEND;
                } else if (e < 72885) {
                  if (e === 72884)
                    return r.CLUSTER_BREAK.SPACINGMARK;
                } else if (e < 73009) {
                  if (72885 <= e && e <= 72886)
                    return r.CLUSTER_BREAK.EXTEND;
                } else if (73009 <= e && e <= 73014)
                  return r.CLUSTER_BREAK.EXTEND;
              } else if (e < 73030) {
                if (e < 73020) {
                  if (e === 73018)
                    return r.CLUSTER_BREAK.EXTEND;
                } else if (e < 73023) {
                  if (73020 <= e && e <= 73021)
                    return r.CLUSTER_BREAK.EXTEND;
                } else if (73023 <= e && e <= 73029)
                  return r.CLUSTER_BREAK.EXTEND;
              } else if (e < 73031) {
                if (e === 73030)
                  return r.CLUSTER_BREAK.PREPEND;
              } else if (e < 73098) {
                if (e === 73031)
                  return r.CLUSTER_BREAK.EXTEND;
              } else if (73098 <= e && e <= 73102)
                return r.CLUSTER_BREAK.SPACINGMARK;
            } else if (e < 73526) {
              if (e < 73459)
                if (e < 73109) {
                  if (e < 73107) {
                    if (73104 <= e && e <= 73105)
                      return r.CLUSTER_BREAK.EXTEND;
                  } else if (73107 <= e && e <= 73108)
                    return r.CLUSTER_BREAK.SPACINGMARK;
                } else if (e < 73110) {
                  if (e === 73109)
                    return r.CLUSTER_BREAK.EXTEND;
                } else {
                  if (e === 73110)
                    return r.CLUSTER_BREAK.SPACINGMARK;
                  if (e === 73111)
                    return r.CLUSTER_BREAK.EXTEND;
                }
              else if (e < 73474) {
                if (e < 73461) {
                  if (73459 <= e && e <= 73460)
                    return r.CLUSTER_BREAK.EXTEND;
                } else if (e < 73472) {
                  if (73461 <= e && e <= 73462)
                    return r.CLUSTER_BREAK.SPACINGMARK;
                } else if (73472 <= e && e <= 73473)
                  return r.CLUSTER_BREAK.EXTEND;
              } else if (e < 73475) {
                if (e === 73474)
                  return r.CLUSTER_BREAK.PREPEND;
              } else if (e < 73524) {
                if (e === 73475)
                  return r.CLUSTER_BREAK.SPACINGMARK;
              } else if (73524 <= e && e <= 73525)
                return r.CLUSTER_BREAK.SPACINGMARK;
            } else if (e < 78896)
              if (e < 73536) {
                if (e < 73534) {
                  if (73526 <= e && e <= 73530)
                    return r.CLUSTER_BREAK.EXTEND;
                } else if (73534 <= e && e <= 73535)
                  return r.CLUSTER_BREAK.SPACINGMARK;
              } else if (e < 73537) {
                if (e === 73536)
                  return r.CLUSTER_BREAK.EXTEND;
              } else {
                if (e === 73537)
                  return r.CLUSTER_BREAK.SPACINGMARK;
                if (e === 73538)
                  return r.CLUSTER_BREAK.EXTEND;
              }
            else if (e < 92912) {
              if (e < 78912) {
                if (78896 <= e && e <= 78911)
                  return r.CLUSTER_BREAK.CONTROL;
              } else if (e < 78919) {
                if (e === 78912)
                  return r.CLUSTER_BREAK.EXTEND;
              } else if (78919 <= e && e <= 78933)
                return r.CLUSTER_BREAK.EXTEND;
            } else if (e < 92976) {
              if (92912 <= e && e <= 92916)
                return r.CLUSTER_BREAK.EXTEND;
            } else if (e < 94031) {
              if (92976 <= e && e <= 92982)
                return r.CLUSTER_BREAK.EXTEND;
            } else if (e === 94031)
              return r.CLUSTER_BREAK.EXTEND;
          } else if (e < 121476) {
            if (e < 119143)
              if (e < 113824) {
                if (e < 94180) {
                  if (e < 94095) {
                    if (94033 <= e && e <= 94087)
                      return r.CLUSTER_BREAK.SPACINGMARK;
                  } else if (94095 <= e && e <= 94098)
                    return r.CLUSTER_BREAK.EXTEND;
                } else if (e < 94192) {
                  if (e === 94180)
                    return r.CLUSTER_BREAK.EXTEND;
                } else if (e < 113821) {
                  if (94192 <= e && e <= 94193)
                    return r.CLUSTER_BREAK.SPACINGMARK;
                } else if (113821 <= e && e <= 113822)
                  return r.CLUSTER_BREAK.EXTEND;
              } else if (e < 118576) {
                if (e < 118528) {
                  if (113824 <= e && e <= 113827)
                    return r.CLUSTER_BREAK.CONTROL;
                } else if (118528 <= e && e <= 118573)
                  return r.CLUSTER_BREAK.EXTEND;
              } else if (e < 119141) {
                if (118576 <= e && e <= 118598)
                  return r.CLUSTER_BREAK.EXTEND;
              } else {
                if (e === 119141)
                  return r.CLUSTER_BREAK.EXTEND;
                if (e === 119142)
                  return r.CLUSTER_BREAK.SPACINGMARK;
              }
            else if (e < 119173) {
              if (e < 119150) {
                if (e < 119149) {
                  if (119143 <= e && e <= 119145)
                    return r.CLUSTER_BREAK.EXTEND;
                } else if (e === 119149)
                  return r.CLUSTER_BREAK.SPACINGMARK;
              } else if (e < 119155) {
                if (119150 <= e && e <= 119154)
                  return r.CLUSTER_BREAK.EXTEND;
              } else if (e < 119163) {
                if (119155 <= e && e <= 119162)
                  return r.CLUSTER_BREAK.CONTROL;
              } else if (119163 <= e && e <= 119170)
                return r.CLUSTER_BREAK.EXTEND;
            } else if (e < 121344) {
              if (e < 119210) {
                if (119173 <= e && e <= 119179)
                  return r.CLUSTER_BREAK.EXTEND;
              } else if (e < 119362) {
                if (119210 <= e && e <= 119213)
                  return r.CLUSTER_BREAK.EXTEND;
              } else if (119362 <= e && e <= 119364)
                return r.CLUSTER_BREAK.EXTEND;
            } else if (e < 121403) {
              if (121344 <= e && e <= 121398)
                return r.CLUSTER_BREAK.EXTEND;
            } else if (e < 121461) {
              if (121403 <= e && e <= 121452)
                return r.CLUSTER_BREAK.EXTEND;
            } else if (e === 121461)
              return r.CLUSTER_BREAK.EXTEND;
          } else if (e < 123628) {
            if (e < 122907) {
              if (e < 121505) {
                if (e < 121499) {
                  if (e === 121476)
                    return r.CLUSTER_BREAK.EXTEND;
                } else if (121499 <= e && e <= 121503)
                  return r.CLUSTER_BREAK.EXTEND;
              } else if (e < 122880) {
                if (121505 <= e && e <= 121519)
                  return r.CLUSTER_BREAK.EXTEND;
              } else if (e < 122888) {
                if (122880 <= e && e <= 122886)
                  return r.CLUSTER_BREAK.EXTEND;
              } else if (122888 <= e && e <= 122904)
                return r.CLUSTER_BREAK.EXTEND;
            } else if (e < 123023) {
              if (e < 122915) {
                if (122907 <= e && e <= 122913)
                  return r.CLUSTER_BREAK.EXTEND;
              } else if (e < 122918) {
                if (122915 <= e && e <= 122916)
                  return r.CLUSTER_BREAK.EXTEND;
              } else if (122918 <= e && e <= 122922)
                return r.CLUSTER_BREAK.EXTEND;
            } else if (e < 123184) {
              if (e === 123023)
                return r.CLUSTER_BREAK.EXTEND;
            } else if (e < 123566) {
              if (123184 <= e && e <= 123190)
                return r.CLUSTER_BREAK.EXTEND;
            } else if (e === 123566)
              return r.CLUSTER_BREAK.EXTEND;
          } else if (e < 127995) {
            if (e < 125136) {
              if (e < 124140) {
                if (123628 <= e && e <= 123631)
                  return r.CLUSTER_BREAK.EXTEND;
              } else if (124140 <= e && e <= 124143)
                return r.CLUSTER_BREAK.EXTEND;
            } else if (e < 125252) {
              if (125136 <= e && e <= 125142)
                return r.CLUSTER_BREAK.EXTEND;
            } else if (e < 127462) {
              if (125252 <= e && e <= 125258)
                return r.CLUSTER_BREAK.EXTEND;
            } else if (127462 <= e && e <= 127487)
              return r.CLUSTER_BREAK.REGIONAL_INDICATOR;
          } else if (e < 917632) {
            if (e < 917504) {
              if (127995 <= e && e <= 127999)
                return r.CLUSTER_BREAK.EXTEND;
            } else if (e < 917536) {
              if (917504 <= e && e <= 917535)
                return r.CLUSTER_BREAK.CONTROL;
            } else if (917536 <= e && e <= 917631)
              return r.CLUSTER_BREAK.EXTEND;
          } else if (e < 917760) {
            if (917632 <= e && e <= 917759)
              return r.CLUSTER_BREAK.CONTROL;
          } else if (e < 918e3) {
            if (917760 <= e && e <= 917999)
              return r.CLUSTER_BREAK.EXTEND;
          } else if (918e3 <= e && e <= 921599)
            return r.CLUSTER_BREAK.CONTROL;
          return r.CLUSTER_BREAK.OTHER;
        }
        static getEmojiProperty(e) {
          if (e < 10160) {
            if (e < 9728) {
              if (e < 9e3) {
                if (e < 8482) {
                  if (e < 8252) {
                    if (e === 169 || e === 174)
                      return r.EXTENDED_PICTOGRAPHIC;
                  } else if (e === 8252 || e === 8265)
                    return r.EXTENDED_PICTOGRAPHIC;
                } else if (e < 8596) {
                  if (e === 8482 || e === 8505)
                    return r.EXTENDED_PICTOGRAPHIC;
                } else if (e < 8617) {
                  if (8596 <= e && e <= 8601)
                    return r.EXTENDED_PICTOGRAPHIC;
                } else if (e < 8986) {
                  if (8617 <= e && e <= 8618)
                    return r.EXTENDED_PICTOGRAPHIC;
                } else if (8986 <= e && e <= 8987)
                  return r.EXTENDED_PICTOGRAPHIC;
              } else if (e < 9410) {
                if (e < 9167) {
                  if (e === 9e3 || e === 9096)
                    return r.EXTENDED_PICTOGRAPHIC;
                } else if (e < 9193) {
                  if (e === 9167)
                    return r.EXTENDED_PICTOGRAPHIC;
                } else if (e < 9208) {
                  if (9193 <= e && e <= 9203)
                    return r.EXTENDED_PICTOGRAPHIC;
                } else if (9208 <= e && e <= 9210)
                  return r.EXTENDED_PICTOGRAPHIC;
              } else if (e < 9654) {
                if (e < 9642) {
                  if (e === 9410)
                    return r.EXTENDED_PICTOGRAPHIC;
                } else if (9642 <= e && e <= 9643)
                  return r.EXTENDED_PICTOGRAPHIC;
              } else if (e < 9664) {
                if (e === 9654)
                  return r.EXTENDED_PICTOGRAPHIC;
              } else if (e < 9723) {
                if (e === 9664)
                  return r.EXTENDED_PICTOGRAPHIC;
              } else if (9723 <= e && e <= 9726)
                return r.EXTENDED_PICTOGRAPHIC;
            } else if (e < 10035) {
              if (e < 10004) {
                if (e < 9748) {
                  if (e < 9735) {
                    if (9728 <= e && e <= 9733)
                      return r.EXTENDED_PICTOGRAPHIC;
                  } else if (9735 <= e && e <= 9746)
                    return r.EXTENDED_PICTOGRAPHIC;
                } else if (e < 9872) {
                  if (9748 <= e && e <= 9861)
                    return r.EXTENDED_PICTOGRAPHIC;
                } else if (e < 9992) {
                  if (9872 <= e && e <= 9989)
                    return r.EXTENDED_PICTOGRAPHIC;
                } else if (9992 <= e && e <= 10002)
                  return r.EXTENDED_PICTOGRAPHIC;
              } else if (e < 10013) {
                if (e === 10004 || e === 10006)
                  return r.EXTENDED_PICTOGRAPHIC;
              } else if (e < 10017) {
                if (e === 10013)
                  return r.EXTENDED_PICTOGRAPHIC;
              } else if (e === 10017 || e === 10024)
                return r.EXTENDED_PICTOGRAPHIC;
            } else if (e < 10067) {
              if (e < 10055) {
                if (e < 10052) {
                  if (10035 <= e && e <= 10036)
                    return r.EXTENDED_PICTOGRAPHIC;
                } else if (e === 10052)
                  return r.EXTENDED_PICTOGRAPHIC;
              } else if (e < 10060) {
                if (e === 10055)
                  return r.EXTENDED_PICTOGRAPHIC;
              } else if (e === 10060 || e === 10062)
                return r.EXTENDED_PICTOGRAPHIC;
            } else if (e < 10083) {
              if (e < 10071) {
                if (10067 <= e && e <= 10069)
                  return r.EXTENDED_PICTOGRAPHIC;
              } else if (e === 10071)
                return r.EXTENDED_PICTOGRAPHIC;
            } else if (e < 10133) {
              if (10083 <= e && e <= 10087)
                return r.EXTENDED_PICTOGRAPHIC;
            } else if (e < 10145) {
              if (10133 <= e && e <= 10135)
                return r.EXTENDED_PICTOGRAPHIC;
            } else if (e === 10145)
              return r.EXTENDED_PICTOGRAPHIC;
          } else if (e < 127489) {
            if (e < 12951) {
              if (e < 11035) {
                if (e < 10548) {
                  if (e === 10160 || e === 10175)
                    return r.EXTENDED_PICTOGRAPHIC;
                } else if (e < 11013) {
                  if (10548 <= e && e <= 10549)
                    return r.EXTENDED_PICTOGRAPHIC;
                } else if (11013 <= e && e <= 11015)
                  return r.EXTENDED_PICTOGRAPHIC;
              } else if (e < 11093) {
                if (e < 11088) {
                  if (11035 <= e && e <= 11036)
                    return r.EXTENDED_PICTOGRAPHIC;
                } else if (e === 11088)
                  return r.EXTENDED_PICTOGRAPHIC;
              } else if (e < 12336) {
                if (e === 11093)
                  return r.EXTENDED_PICTOGRAPHIC;
              } else if (e === 12336 || e === 12349)
                return r.EXTENDED_PICTOGRAPHIC;
            } else if (e < 127340) {
              if (e < 126976) {
                if (e === 12951 || e === 12953)
                  return r.EXTENDED_PICTOGRAPHIC;
              } else if (e < 127245) {
                if (126976 <= e && e <= 127231)
                  return r.EXTENDED_PICTOGRAPHIC;
              } else if (e < 127279) {
                if (127245 <= e && e <= 127247)
                  return r.EXTENDED_PICTOGRAPHIC;
              } else if (e === 127279)
                return r.EXTENDED_PICTOGRAPHIC;
            } else if (e < 127374) {
              if (e < 127358) {
                if (127340 <= e && e <= 127345)
                  return r.EXTENDED_PICTOGRAPHIC;
              } else if (127358 <= e && e <= 127359)
                return r.EXTENDED_PICTOGRAPHIC;
            } else if (e < 127377) {
              if (e === 127374)
                return r.EXTENDED_PICTOGRAPHIC;
            } else if (e < 127405) {
              if (127377 <= e && e <= 127386)
                return r.EXTENDED_PICTOGRAPHIC;
            } else if (127405 <= e && e <= 127461)
              return r.EXTENDED_PICTOGRAPHIC;
          } else if (e < 128981) {
            if (e < 127561) {
              if (e < 127535) {
                if (e < 127514) {
                  if (127489 <= e && e <= 127503)
                    return r.EXTENDED_PICTOGRAPHIC;
                } else if (e === 127514)
                  return r.EXTENDED_PICTOGRAPHIC;
              } else if (e < 127538) {
                if (e === 127535)
                  return r.EXTENDED_PICTOGRAPHIC;
              } else if (e < 127548) {
                if (127538 <= e && e <= 127546)
                  return r.EXTENDED_PICTOGRAPHIC;
              } else if (127548 <= e && e <= 127551)
                return r.EXTENDED_PICTOGRAPHIC;
            } else if (e < 128326) {
              if (e < 128e3) {
                if (127561 <= e && e <= 127994)
                  return r.EXTENDED_PICTOGRAPHIC;
              } else if (128e3 <= e && e <= 128317)
                return r.EXTENDED_PICTOGRAPHIC;
            } else if (e < 128640) {
              if (128326 <= e && e <= 128591)
                return r.EXTENDED_PICTOGRAPHIC;
            } else if (e < 128884) {
              if (128640 <= e && e <= 128767)
                return r.EXTENDED_PICTOGRAPHIC;
            } else if (128884 <= e && e <= 128895)
              return r.EXTENDED_PICTOGRAPHIC;
          } else if (e < 129198) {
            if (e < 129096) {
              if (e < 129036) {
                if (128981 <= e && e <= 129023)
                  return r.EXTENDED_PICTOGRAPHIC;
              } else if (129036 <= e && e <= 129039)
                return r.EXTENDED_PICTOGRAPHIC;
            } else if (e < 129114) {
              if (129096 <= e && e <= 129103)
                return r.EXTENDED_PICTOGRAPHIC;
            } else if (e < 129160) {
              if (129114 <= e && e <= 129119)
                return r.EXTENDED_PICTOGRAPHIC;
            } else if (129160 <= e && e <= 129167)
              return r.EXTENDED_PICTOGRAPHIC;
          } else if (e < 129340) {
            if (e < 129292) {
              if (129198 <= e && e <= 129279)
                return r.EXTENDED_PICTOGRAPHIC;
            } else if (129292 <= e && e <= 129338)
              return r.EXTENDED_PICTOGRAPHIC;
          } else if (e < 129351) {
            if (129340 <= e && e <= 129349)
              return r.EXTENDED_PICTOGRAPHIC;
          } else if (e < 130048) {
            if (129351 <= e && e <= 129791)
              return r.EXTENDED_PICTOGRAPHIC;
          } else if (130048 <= e && e <= 131069)
            return r.EXTENDED_PICTOGRAPHIC;
          return r.CLUSTER_BREAK.OTHER;
        }
      };
      t.default = u;
    }
  }), tt = A({
    "../../node_modules/.pnpm/graphemer@1.4.0/node_modules/graphemer/lib/index.js"(t) {
      var i = t && t.__importDefault || function(n) {
        return n && n.__esModule ? n : { default: n };
      };
      Object.defineProperty(t, "__esModule", { value: !0 });
      var r = i(Me());
      t.default = r.default;
    }
  }), je = A({
    "../../node_modules/.pnpm/iso-datestring-validator@2.2.2/node_modules/iso-datestring-validator/dist/index.js"(t) {
      (() => {
        var i = { d: (C, S) => {
          for (var O in S)
            i.o(S, O) && !i.o(C, O) && Object.defineProperty(C, O, { enumerable: !0, get: S[O] });
        }, o: (C, S) => Object.prototype.hasOwnProperty.call(C, S), r: (C) => {
          typeof Symbol < "u" && Symbol.toStringTag && Object.defineProperty(C, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(C, "__esModule", { value: !0 });
        } }, r = {};
        function n(C, S) {
          return S === void 0 && (S = "-"), new RegExp("^(?!0{4}" + S + "0{2}" + S + "0{2})((?=[0-9]{4}" + S + "(((0[^2])|1[0-2])|02(?=" + S + "(([0-1][0-9])|2[0-8])))" + S + "[0-9]{2})|(?=((([13579][26])|([2468][048])|(0[48]))0{2})|([0-9]{2}((((0|[2468])[48])|[2468][048])|([13579][26])))" + S + "02" + S + "29))([0-9]{4})" + S + "(?!((0[469])|11)" + S + "31)((0[1,3-9]|1[0-2])|(02(?!" + S + "3)))" + S + "(0[1-9]|[1-2][0-9]|3[0-1])$").test(C);
        }
        function s(C) {
          var S = /\D/.exec(C);
          return S ? S[0] : "";
        }
        function u(C, S, O) {
          S === void 0 && (S = ":"), O === void 0 && (O = !1);
          var Q = new RegExp("^([0-1]|2(?=([0-3])|4" + S + "00))[0-9]" + S + "[0-5][0-9](" + S + "([0-5]|6(?=0))[0-9])?(.[0-9]{1,9})?$");
          if (!O || !/[Z+\-]/.test(C))
            return Q.test(C);
          if (/Z$/.test(C))
            return Q.test(C.replace("Z", ""));
          var I = C.includes("+"), z = C.split(/[+-]/), X = z[0], G = z[1];
          return Q.test(X) && function(fe, pe, q) {
            return q === void 0 && (q = ":"), new RegExp(pe ? "^(0(?!(2" + q + "4)|0" + q + "3)|1(?=([0-1]|2(?=" + q + "[04])|[34](?=" + q + "0))))([03469](?=" + q + "[03])|[17](?=" + q + "0)|2(?=" + q + "[04])|5(?=" + q + "[034])|8(?=" + q + "[04]))" + q + "([03](?=0)|4(?=5))[05]$" : "^(0(?=[^0])|1(?=[0-2]))([39](?=" + q + "[03])|[0-24-8](?=" + q + "00))" + q + "[03]0$").test(fe);
          }(G, I, s(G));
        }
        function e(C) {
          var S = C.split("T"), O = S[0], Q = S[1], I = n(O, s(O));
          if (!Q)
            return !1;
          var z, X = (z = Q.match(/([^Z+\-\d])(?=\d+\1)/), Array.isArray(z) ? z[0] : "");
          return I && u(Q, X, !0);
        }
        function d(C, S) {
          return S === void 0 && (S = "-"), new RegExp("^[0-9]{4}" + S + "(0(?=[^0])|1(?=[0-2]))[0-9]$").test(C);
        }
        i.r(r), i.d(r, { isValidDate: () => n, isValidISODateString: () => e, isValidTime: () => u, isValidYearMonth: () => d });
        var y = t;
        for (var T in r)
          y[T] = r[T];
        r.__esModule && Object.defineProperty(y, "__esModule", { value: !0 });
      })();
    }
  }), Y = {};
  f(Y, {
    APP_BSKY_GRAPH: () => Db,
    AppBskyActorDefs: () => x,
    AppBskyActorGetPreferences: () => Qa,
    AppBskyActorGetProfile: () => Ya,
    AppBskyActorGetProfiles: () => eo,
    AppBskyActorGetSuggestions: () => to,
    AppBskyActorNS: () => Hp,
    AppBskyActorProfile: () => Jr,
    AppBskyActorPutPreferences: () => ro,
    AppBskyActorSearchActors: () => io,
    AppBskyActorSearchActorsTypeahead: () => no,
    AppBskyEmbedExternal: () => Rp,
    AppBskyEmbedImages: () => bp,
    AppBskyEmbedNS: () => Wp,
    AppBskyEmbedRecord: () => Ue,
    AppBskyEmbedRecordWithMedia: () => Qr,
    AppBskyFeedDefs: () => Ap,
    AppBskyFeedDescribeFeedGenerator: () => so,
    AppBskyFeedGenerator: () => Tp,
    AppBskyFeedGetActorFeeds: () => ao,
    AppBskyFeedGetActorLikes: () => oo,
    AppBskyFeedGetAuthorFeed: () => fo,
    AppBskyFeedGetFeed: () => yo,
    AppBskyFeedGetFeedGenerator: () => Ro,
    AppBskyFeedGetFeedGenerators: () => bo,
    AppBskyFeedGetFeedSkeleton: () => Ao,
    AppBskyFeedGetLikes: () => wo,
    AppBskyFeedGetListFeed: () => Lo,
    AppBskyFeedGetPostThread: () => So,
    AppBskyFeedGetPosts: () => ko,
    AppBskyFeedGetRepostedBy: () => Ko,
    AppBskyFeedGetSuggestedFeeds: () => Uo,
    AppBskyFeedGetTimeline: () => Vo,
    AppBskyFeedLike: () => vp,
    AppBskyFeedNS: () => Jp,
    AppBskyFeedPost: () => wp,
    AppBskyFeedRepost: () => Lp,
    AppBskyFeedSearchPosts: () => Do,
    AppBskyFeedThreadgate: () => Cp,
    AppBskyGraphBlock: () => _p,
    AppBskyGraphDefs: () => Sp,
    AppBskyGraphFollow: () => xp,
    AppBskyGraphGetBlocks: () => Io,
    AppBskyGraphGetFollowers: () => jo,
    AppBskyGraphGetFollows: () => Fo,
    AppBskyGraphGetList: () => qo,
    AppBskyGraphGetListBlocks: () => Mo,
    AppBskyGraphGetListMutes: () => $o,
    AppBskyGraphGetLists: () => Go,
    AppBskyGraphGetMutes: () => Oo,
    AppBskyGraphGetRelationships: () => Xo,
    AppBskyGraphGetSuggestedFollowsByActor: () => Zo,
    AppBskyGraphList: () => Bp,
    AppBskyGraphListblock: () => kp,
    AppBskyGraphListitem: () => Kp,
    AppBskyGraphMuteActor: () => Wo,
    AppBskyGraphMuteActorList: () => Jo,
    AppBskyGraphNS: () => iu,
    AppBskyGraphUnmuteActor: () => Qo,
    AppBskyGraphUnmuteActorList: () => Yo,
    AppBskyNS: () => zp,
    AppBskyNotificationGetUnreadCount: () => ep,
    AppBskyNotificationListNotifications: () => tp,
    AppBskyNotificationNS: () => uu,
    AppBskyNotificationRegisterPush: () => rp,
    AppBskyNotificationUpdateSeen: () => ip,
    AppBskyRichtextFacet: () => Ve,
    AppBskyRichtextNS: () => lu,
    AppBskyUnspeccedDefs: () => Up,
    AppBskyUnspeccedGetPopularFeedGenerators: () => np,
    AppBskyUnspeccedGetTaggedSuggestions: () => sp,
    AppBskyUnspeccedNS: () => fu,
    AppBskyUnspeccedSearchActorsSkeleton: () => ap,
    AppBskyUnspeccedSearchPostsSkeleton: () => up,
    AppNS: () => Xp,
    AtUri: () => ve,
    AtpAgent: () => cr,
    AtpBaseClient: () => Vp,
    AtpServiceClient: () => Dp,
    BlobRef: () => We,
    BlockRecord: () => nu,
    BskyAgent: () => p4,
    COM_ATPROTO_ADMIN: () => Ub,
    COM_ATPROTO_MODERATION: () => Vb,
    ComAtprotoAdminCreateCommunicationTemplate: () => xn,
    ComAtprotoAdminDefs: () => cp,
    ComAtprotoAdminDeleteAccount: () => Bn,
    ComAtprotoAdminDeleteCommunicationTemplate: () => kn,
    ComAtprotoAdminDisableAccountInvites: () => Kn,
    ComAtprotoAdminDisableInviteCodes: () => Un,
    ComAtprotoAdminEmitModerationEvent: () => Vn,
    ComAtprotoAdminEnableAccountInvites: () => Pn,
    ComAtprotoAdminGetAccountInfo: () => In,
    ComAtprotoAdminGetAccountInfos: () => jn,
    ComAtprotoAdminGetInviteCodes: () => Fn,
    ComAtprotoAdminGetModerationEvent: () => qn,
    ComAtprotoAdminGetRecord: () => Mn,
    ComAtprotoAdminGetRepo: () => On,
    ComAtprotoAdminGetSubjectStatus: () => Hn,
    ComAtprotoAdminListCommunicationTemplates: () => Zn,
    ComAtprotoAdminNS: () => Ip,
    ComAtprotoAdminQueryModerationEvents: () => Wn,
    ComAtprotoAdminQueryModerationStatuses: () => Jn,
    ComAtprotoAdminSearchRepos: () => Qn,
    ComAtprotoAdminSendEmail: () => Yn,
    ComAtprotoAdminUpdateAccountEmail: () => es,
    ComAtprotoAdminUpdateAccountHandle: () => ts,
    ComAtprotoAdminUpdateAccountPassword: () => rs,
    ComAtprotoAdminUpdateCommunicationTemplate: () => is,
    ComAtprotoAdminUpdateSubjectStatus: () => ns,
    ComAtprotoIdentityGetRecommendedDidCredentials: () => ss,
    ComAtprotoIdentityNS: () => jp,
    ComAtprotoIdentityRequestPlcOperationSignature: () => as,
    ComAtprotoIdentityResolveHandle: () => os,
    ComAtprotoIdentitySignPlcOperation: () => ps,
    ComAtprotoIdentitySubmitPlcOperation: () => us,
    ComAtprotoIdentityUpdateHandle: () => ls,
    ComAtprotoLabelDefs: () => dp,
    ComAtprotoLabelNS: () => Fp,
    ComAtprotoLabelQueryLabels: () => fs,
    ComAtprotoLabelSubscribeLabels: () => mp,
    ComAtprotoModerationCreateReport: () => cs,
    ComAtprotoModerationDefs: () => hp,
    ComAtprotoModerationNS: () => qp,
    ComAtprotoNS: () => Pp,
    ComAtprotoRepoApplyWrites: () => ds,
    ComAtprotoRepoCreateRecord: () => ys,
    ComAtprotoRepoDeleteRecord: () => Rs,
    ComAtprotoRepoDescribeRepo: () => Ts,
    ComAtprotoRepoGetRecord: () => vs,
    ComAtprotoRepoImportRepo: () => ws,
    ComAtprotoRepoListMissingBlobs: () => Ls,
    ComAtprotoRepoListRecords: () => Cs,
    ComAtprotoRepoNS: () => Mp,
    ComAtprotoRepoPutRecord: () => Wr,
    ComAtprotoRepoStrongRef: () => yp,
    ComAtprotoRepoUploadBlob: () => xs,
    ComAtprotoServerActivateAccount: () => Bs,
    ComAtprotoServerCheckAccountStatus: () => ks,
    ComAtprotoServerConfirmEmail: () => Ks,
    ComAtprotoServerCreateAccount: () => Is,
    ComAtprotoServerCreateAppPassword: () => zs,
    ComAtprotoServerCreateInviteCode: () => Ws,
    ComAtprotoServerCreateInviteCodes: () => Js,
    ComAtprotoServerCreateSession: () => Qs,
    ComAtprotoServerDeactivateAccount: () => ta,
    ComAtprotoServerDefs: () => Ep,
    ComAtprotoServerDeleteAccount: () => ra,
    ComAtprotoServerDeleteSession: () => aa,
    ComAtprotoServerDescribeServer: () => oa,
    ComAtprotoServerGetAccountInviteCodes: () => pa,
    ComAtprotoServerGetServiceAuth: () => fa,
    ComAtprotoServerGetSession: () => ca,
    ComAtprotoServerListAppPasswords: () => da,
    ComAtprotoServerNS: () => $p,
    ComAtprotoServerRefreshSession: () => ya,
    ComAtprotoServerRequestAccountDelete: () => Ra,
    ComAtprotoServerRequestEmailConfirmation: () => ba,
    ComAtprotoServerRequestEmailUpdate: () => Aa,
    ComAtprotoServerRequestPasswordReset: () => Ta,
    ComAtprotoServerReserveSigningKey: () => va,
    ComAtprotoServerResetPassword: () => wa,
    ComAtprotoServerRevokeAppPassword: () => Sa,
    ComAtprotoServerUpdateEmail: () => xa,
    ComAtprotoSyncGetBlob: () => Va,
    ComAtprotoSyncGetBlocks: () => Da,
    ComAtprotoSyncGetCheckout: () => Na,
    ComAtprotoSyncGetHead: () => Pa,
    ComAtprotoSyncGetLatestCommit: () => Fa,
    ComAtprotoSyncGetRecord: () => $a,
    ComAtprotoSyncGetRepo: () => Ga,
    ComAtprotoSyncListBlobs: () => Oa,
    ComAtprotoSyncListRepos: () => Xa,
    ComAtprotoSyncNS: () => Gp,
    ComAtprotoSyncNotifyOfUpdate: () => za,
    ComAtprotoSyncRequestCrawl: () => Ha,
    ComAtprotoSyncSubscribeRepos: () => gp,
    ComAtprotoTempCheckSignupQueue: () => Za,
    ComAtprotoTempFetchLabels: () => Wa,
    ComAtprotoTempNS: () => Op,
    ComAtprotoTempRequestPhoneVerification: () => Ja,
    ComNS: () => Np,
    FollowRecord: () => su,
    GeneratorRecord: () => Qp,
    LABELS: () => $,
    LABEL_GROUPS: () => a4,
    LikeRecord: () => Yp,
    ListRecord: () => au,
    ListblockRecord: () => ou,
    ListitemRecord: () => pu,
    MENTION_REGEX: () => hu,
    ModerationDecision: () => _e,
    PostRecord: () => eu,
    ProfileRecord: () => Zp,
    RepostRecord: () => tu,
    RichText: () => Au,
    RichTextSegment: () => pt,
    TAG_REGEX: () => gu,
    TRAILING_PUNCTUATION_REGEX: () => Eu,
    ThreadgateRecord: () => ru,
    URL_REGEX: () => yu,
    UnicodeString: () => St,
    default: () => cr,
    jsonStringToLex: () => An,
    jsonToLex: () => bn,
    lexToJson: () => gn,
    moderateFeedGenerator: () => n4,
    moderatePost: () => i4,
    moderateProfile: () => r4,
    moderateUserList: () => s4,
    parseLanguage: () => Lc,
    sanitizeMutedWordValue: () => Zr,
    sanitizeRichText: () => mu,
    stringifyLex: () => Rn
  }), p.exports = F(Y);
  var rt = (t) => {
    if (!/^[a-zA-Z0-9.-]*$/.test(t))
      throw new Te("Disallowed characters in handle (ASCII letters, digits, dashes, periods only)");
    if (t.length > 253)
      throw new Te("Handle is too long (253 chars max)");
    const i = t.split(".");
    if (i.length < 2)
      throw new Te("Handle domain needs at least two parts");
    for (let r = 0; r < i.length; r++) {
      const n = i[r];
      if (n.length < 1)
        throw new Te("Handle parts can not be empty");
      if (n.length > 63)
        throw new Te("Handle part too long (max 63 chars)");
      if (n.endsWith("-") || n.startsWith("-"))
        throw new Te("Handle parts can not start or end with hyphens");
      if (r + 1 == i.length && !/^[a-zA-Z]/.test(n))
        throw new Te("Handle final component (TLD) must start with ASCII letter");
    }
  }, Te = class extends Error {
  }, ct = (t) => {
    if (!/^[a-zA-Z0-9._:%-]*$/.test(t))
      throw new Se("Disallowed characters in DID (ASCII letters, digits, and a couple other characters only)");
    const i = t.split(":");
    if (i.length < 3)
      throw new Se("DID requires prefix, method, and method-specific content");
    if (i[0] != "did")
      throw new Se('DID requires "did:" prefix');
    if (!/^[a-z]+$/.test(i[1]))
      throw new Se("DID method must be lower-case letters");
    if (t.endsWith(":") || t.endsWith("%"))
      throw new Se('DID can not end with ":" or "%"');
    if (t.length > 2 * 1024)
      throw new Se("DID is too long (2048 chars max)");
  }, Se = class extends Error {
  }, $e = class {
    constructor(t) {
      this.segments = [], Ge(t), this.segments = t.split(".");
    }
    static parse(t) {
      return new $e(t);
    }
    static create(t, i) {
      const r = [...t.split(".").reverse(), i].join(".");
      return new $e(r);
    }
    static isValid(t) {
      try {
        return $e.parse(t), !0;
      } catch {
        return !1;
      }
    }
    get authority() {
      return this.segments.slice(0, this.segments.length - 1).reverse().join(".");
    }
    get name() {
      return this.segments.at(this.segments.length - 1);
    }
    toString() {
      return this.segments.join(".");
    }
  }, Ge = (t) => {
    const i = t;
    if (!/^[a-zA-Z0-9.-]*$/.test(i))
      throw new Ee("Disallowed characters in NSID (ASCII letters, digits, dashes, periods only)");
    if (i.length > 317)
      throw new Ee("NSID is too long (317 chars max)");
    const r = i.split(".");
    if (r.length < 3)
      throw new Ee("NSID needs at least three parts");
    for (let n = 0; n < r.length; n++) {
      const s = r[n];
      if (s.length < 1)
        throw new Ee("NSID parts can not be empty");
      if (s.length > 63)
        throw new Ee("NSID part too long (max 63 chars)");
      if (s.endsWith("-") || s.startsWith("-"))
        throw new Ee("NSID parts can not start or end with hyphen");
      if (/^[0-9]/.test(s) && n == 0)
        throw new Ee("NSID first part may not start with a digit");
      if (!/^[a-zA-Z]+$/.test(s) && n + 1 == r.length)
        throw new Ee("NSID name part must be only letters");
    }
  }, Ee = class extends Error {
  }, It = (t) => {
    const i = t.split("#");
    if (i.length > 2)
      throw new Error('ATURI can have at most one "#", separating fragment out');
    const r = i[1] || null;
    if (t = i[0], !/^[a-zA-Z0-9._~:@!$&')(*+,;=%/-]*$/.test(t))
      throw new Error("Disallowed characters in ATURI (ASCII)");
    const n = t.split("/");
    if (n.length >= 3 && (n[0] != "at:" || n[1].length != 0))
      throw new Error('ATURI must start with "at://"');
    if (n.length < 3)
      throw new Error("ATURI requires at least method and authority sections");
    try {
      n[2].startsWith("did:") ? ct(n[2]) : rt(n[2]);
    } catch {
      throw new Error("ATURI authority must be a valid handle or DID");
    }
    if (n.length >= 4) {
      if (n[3].length == 0)
        throw new Error("ATURI can not have a slash after authority without a path segment");
      try {
        Ge(n[3]);
      } catch {
        throw new Error("ATURI requires first path segment (if supplied) to be valid NSID");
      }
    }
    if (n.length >= 5 && n[4].length == 0)
      throw new Error("ATURI can not have a slash after collection, unless record key is provided");
    if (n.length >= 6)
      throw new Error("ATURI path can have at most two parts, and no trailing slash");
    if (i.length >= 2 && r == null)
      throw new Error("ATURI fragment must be non-empty and start with slash");
    if (r != null) {
      if (r.length == 0 || r[0] != "/")
        throw new Error("ATURI fragment must be non-empty and start with slash");
      if (!/^\/[a-zA-Z0-9._~:@!$&')(*+,;=%[\]/-]*$/.test(r))
        throw new Error("Disallowed characters in ATURI fragment (ASCII)");
    }
    if (t.length > 8 * 1024)
      throw new Error("ATURI is far too long");
  }, _r = /^(at:\/\/)?((?:did:[a-z0-9:%-]+)|(?:[a-z0-9][a-z0-9.:-]*))(\/[^?#\s]*)?(\?[^#\s]+)?(#[^\s]+)?$/i, Sr = /^(\/[^?#\s]*)?(\?[^#\s]+)?(#[^\s]+)?$/i, ve = class {
    constructor(t, i) {
      let r;
      if (i) {
        if (r = jt(i), !r)
          throw new Error(`Invalid at uri: ${i}`);
        const n = ee(t);
        if (!n)
          throw new Error(`Invalid path: ${t}`);
        Object.assign(r, n);
      } else if (r = jt(t), !r)
        throw new Error(`Invalid at uri: ${t}`);
      this.hash = r.hash, this.host = r.host, this.pathname = r.pathname, this.searchParams = r.searchParams;
    }
    static make(t, i, r) {
      let n = t;
      return i && (n += "/" + i), r && (n += "/" + r), new ve(n);
    }
    get protocol() {
      return "at:";
    }
    get origin() {
      return `at://${this.host}`;
    }
    get hostname() {
      return this.host;
    }
    set hostname(t) {
      this.host = t;
    }
    get search() {
      return this.searchParams.toString();
    }
    set search(t) {
      this.searchParams = new URLSearchParams(t);
    }
    get collection() {
      return this.pathname.split("/").filter(Boolean)[0] || "";
    }
    set collection(t) {
      const i = this.pathname.split("/").filter(Boolean);
      i[0] = t, this.pathname = i.join("/");
    }
    get rkey() {
      return this.pathname.split("/").filter(Boolean)[1] || "";
    }
    set rkey(t) {
      const i = this.pathname.split("/").filter(Boolean);
      i[0] || (i[0] = "undefined"), i[1] = t, this.pathname = i.join("/");
    }
    get href() {
      return this.toString();
    }
    toString() {
      let t = this.pathname || "/";
      t.startsWith("/") || (t = `/${t}`);
      let i = this.searchParams.toString();
      i && !i.startsWith("?") && (i = `?${i}`);
      let r = this.hash;
      return r && !r.startsWith("#") && (r = `#${r}`), `at://${this.host}${t}${i}${r}`;
    }
  };
  function jt(t) {
    const i = _r.exec(t);
    if (i)
      return {
        hash: i[5] || "",
        host: i[2] || "",
        pathname: i[3] || "",
        searchParams: new URLSearchParams(i[4] || "")
      };
  }
  function ee(t) {
    const i = Sr.exec(t);
    if (i)
      return {
        hash: i[3] || "",
        pathname: i[1] || "",
        searchParams: new URLSearchParams(i[2] || "")
      };
  }
  var k;
  (function(t) {
    t.assertEqual = (s) => s;
    function i(s) {
    }
    t.assertIs = i;
    function r(s) {
      throw new Error();
    }
    t.assertNever = r, t.arrayToEnum = (s) => {
      const u = {};
      for (const e of s)
        u[e] = e;
      return u;
    }, t.getValidEnumValues = (s) => {
      const u = t.objectKeys(s).filter((d) => typeof s[s[d]] != "number"), e = {};
      for (const d of u)
        e[d] = s[d];
      return t.objectValues(e);
    }, t.objectValues = (s) => t.objectKeys(s).map(function(u) {
      return s[u];
    }), t.objectKeys = typeof Object.keys == "function" ? (s) => Object.keys(s) : (s) => {
      const u = [];
      for (const e in s)
        Object.prototype.hasOwnProperty.call(s, e) && u.push(e);
      return u;
    }, t.find = (s, u) => {
      for (const e of s)
        if (u(e))
          return e;
    }, t.isInteger = typeof Number.isInteger == "function" ? (s) => Number.isInteger(s) : (s) => typeof s == "number" && isFinite(s) && Math.floor(s) === s;
    function n(s, u = " | ") {
      return s.map((e) => typeof e == "string" ? `'${e}'` : e).join(u);
    }
    t.joinValues = n, t.jsonStringifyReplacer = (s, u) => typeof u == "bigint" ? u.toString() : u;
  })(k || (k = {}));
  var ue;
  (function(t) {
    t.mergeShapes = (i, r) => ({
      ...i,
      ...r
    });
  })(ue || (ue = {}));
  var L = k.arrayToEnum([
    "string",
    "nan",
    "number",
    "integer",
    "float",
    "boolean",
    "date",
    "bigint",
    "symbol",
    "function",
    "undefined",
    "null",
    "array",
    "object",
    "unknown",
    "promise",
    "void",
    "never",
    "map",
    "set"
  ]), ge = (t) => {
    switch (typeof t) {
      case "undefined":
        return L.undefined;
      case "string":
        return L.string;
      case "number":
        return isNaN(t) ? L.nan : L.number;
      case "boolean":
        return L.boolean;
      case "function":
        return L.function;
      case "bigint":
        return L.bigint;
      case "symbol":
        return L.symbol;
      case "object":
        return Array.isArray(t) ? L.array : t === null ? L.null : t.then && typeof t.then == "function" && t.catch && typeof t.catch == "function" ? L.promise : typeof Map < "u" && t instanceof Map ? L.map : typeof Set < "u" && t instanceof Set ? L.set : typeof Date < "u" && t instanceof Date ? L.date : L.object;
      default:
        return L.unknown;
    }
  }, v = k.arrayToEnum([
    "invalid_type",
    "invalid_literal",
    "custom",
    "invalid_union",
    "invalid_union_discriminator",
    "invalid_enum_value",
    "unrecognized_keys",
    "invalid_arguments",
    "invalid_return_type",
    "invalid_date",
    "invalid_string",
    "too_small",
    "too_big",
    "invalid_intersection_types",
    "not_multiple_of",
    "not_finite"
  ]), Ft = (t) => JSON.stringify(t, null, 2).replace(/"([^"]+)":/g, "$1:"), le = class extends Error {
    constructor(t) {
      super(), this.issues = [], this.addIssue = (r) => {
        this.issues = [...this.issues, r];
      }, this.addIssues = (r = []) => {
        this.issues = [...this.issues, ...r];
      };
      const i = new.target.prototype;
      Object.setPrototypeOf ? Object.setPrototypeOf(this, i) : this.__proto__ = i, this.name = "ZodError", this.issues = t;
    }
    get errors() {
      return this.issues;
    }
    format(t) {
      const i = t || function(s) {
        return s.message;
      }, r = { _errors: [] }, n = (s) => {
        for (const u of s.issues)
          if (u.code === "invalid_union")
            u.unionErrors.map(n);
          else if (u.code === "invalid_return_type")
            n(u.returnTypeError);
          else if (u.code === "invalid_arguments")
            n(u.argumentsError);
          else if (u.path.length === 0)
            r._errors.push(i(u));
          else {
            let e = r, d = 0;
            for (; d < u.path.length; ) {
              const y = u.path[d];
              d === u.path.length - 1 ? (e[y] = e[y] || { _errors: [] }, e[y]._errors.push(i(u))) : e[y] = e[y] || { _errors: [] }, e = e[y], d++;
            }
          }
      };
      return n(this), r;
    }
    toString() {
      return this.message;
    }
    get message() {
      return JSON.stringify(this.issues, k.jsonStringifyReplacer, 2);
    }
    get isEmpty() {
      return this.issues.length === 0;
    }
    flatten(t = (i) => i.message) {
      const i = {}, r = [];
      for (const n of this.issues)
        n.path.length > 0 ? (i[n.path[0]] = i[n.path[0]] || [], i[n.path[0]].push(t(n))) : r.push(t(n));
      return { formErrors: r, fieldErrors: i };
    }
    get formErrors() {
      return this.flatten();
    }
  };
  le.create = (t) => new le(t);
  var dt = (t, i) => {
    let r;
    switch (t.code) {
      case v.invalid_type:
        t.received === L.undefined ? r = "Required" : r = `Expected ${t.expected}, received ${t.received}`;
        break;
      case v.invalid_literal:
        r = `Invalid literal value, expected ${JSON.stringify(t.expected, k.jsonStringifyReplacer)}`;
        break;
      case v.unrecognized_keys:
        r = `Unrecognized key(s) in object: ${k.joinValues(t.keys, ", ")}`;
        break;
      case v.invalid_union:
        r = "Invalid input";
        break;
      case v.invalid_union_discriminator:
        r = `Invalid discriminator value. Expected ${k.joinValues(t.options)}`;
        break;
      case v.invalid_enum_value:
        r = `Invalid enum value. Expected ${k.joinValues(t.options)}, received '${t.received}'`;
        break;
      case v.invalid_arguments:
        r = "Invalid function arguments";
        break;
      case v.invalid_return_type:
        r = "Invalid function return type";
        break;
      case v.invalid_date:
        r = "Invalid date";
        break;
      case v.invalid_string:
        typeof t.validation == "object" ? "includes" in t.validation ? (r = `Invalid input: must include "${t.validation.includes}"`, typeof t.validation.position == "number" && (r = `${r} at one or more positions greater than or equal to ${t.validation.position}`)) : "startsWith" in t.validation ? r = `Invalid input: must start with "${t.validation.startsWith}"` : "endsWith" in t.validation ? r = `Invalid input: must end with "${t.validation.endsWith}"` : k.assertNever(t.validation) : t.validation !== "regex" ? r = `Invalid ${t.validation}` : r = "Invalid";
        break;
      case v.too_small:
        t.type === "array" ? r = `Array must contain ${t.exact ? "exactly" : t.inclusive ? "at least" : "more than"} ${t.minimum} element(s)` : t.type === "string" ? r = `String must contain ${t.exact ? "exactly" : t.inclusive ? "at least" : "over"} ${t.minimum} character(s)` : t.type === "number" ? r = `Number must be ${t.exact ? "exactly equal to " : t.inclusive ? "greater than or equal to " : "greater than "}${t.minimum}` : t.type === "date" ? r = `Date must be ${t.exact ? "exactly equal to " : t.inclusive ? "greater than or equal to " : "greater than "}${new Date(Number(t.minimum))}` : r = "Invalid input";
        break;
      case v.too_big:
        t.type === "array" ? r = `Array must contain ${t.exact ? "exactly" : t.inclusive ? "at most" : "less than"} ${t.maximum} element(s)` : t.type === "string" ? r = `String must contain ${t.exact ? "exactly" : t.inclusive ? "at most" : "under"} ${t.maximum} character(s)` : t.type === "number" ? r = `Number must be ${t.exact ? "exactly" : t.inclusive ? "less than or equal to" : "less than"} ${t.maximum}` : t.type === "bigint" ? r = `BigInt must be ${t.exact ? "exactly" : t.inclusive ? "less than or equal to" : "less than"} ${t.maximum}` : t.type === "date" ? r = `Date must be ${t.exact ? "exactly" : t.inclusive ? "smaller than or equal to" : "smaller than"} ${new Date(Number(t.maximum))}` : r = "Invalid input";
        break;
      case v.custom:
        r = "Invalid input";
        break;
      case v.invalid_intersection_types:
        r = "Intersection results could not be merged";
        break;
      case v.not_multiple_of:
        r = `Number must be a multiple of ${t.multipleOf}`;
        break;
      case v.not_finite:
        r = "Number must be finite";
        break;
      default:
        r = i.defaultError, k.assertNever(t);
    }
    return { message: r };
  }, pi = dt;
  function el(t) {
    pi = t;
  }
  function qt() {
    return pi;
  }
  var Mt = (t) => {
    const { data: i, path: r, errorMaps: n, issueData: s } = t, u = [...r, ...s.path || []], e = {
      ...s,
      path: u
    };
    let d = "";
    const y = n.filter((T) => !!T).slice().reverse();
    for (const T of y)
      d = T(e, { data: i, defaultError: d }).message;
    return {
      ...s,
      path: u,
      message: s.message || d
    };
  }, tl = [];
  function _(t, i) {
    const r = Mt({
      issueData: i,
      data: t.data,
      path: t.path,
      errorMaps: [
        t.common.contextualErrorMap,
        t.schemaErrorMap,
        qt(),
        dt
      ].filter((n) => !!n)
    });
    t.common.issues.push(r);
  }
  var ae = class {
    constructor() {
      this.value = "valid";
    }
    dirty() {
      this.value === "valid" && (this.value = "dirty");
    }
    abort() {
      this.value !== "aborted" && (this.value = "aborted");
    }
    static mergeArray(t, i) {
      const r = [];
      for (const n of i) {
        if (n.status === "aborted")
          return V;
        n.status === "dirty" && t.dirty(), r.push(n.value);
      }
      return { status: t.value, value: r };
    }
    static async mergeObjectAsync(t, i) {
      const r = [];
      for (const n of i)
        r.push({
          key: await n.key,
          value: await n.value
        });
      return ae.mergeObjectSync(t, r);
    }
    static mergeObjectSync(t, i) {
      const r = {};
      for (const n of i) {
        const { key: s, value: u } = n;
        if (s.status === "aborted" || u.status === "aborted")
          return V;
        s.status === "dirty" && t.dirty(), u.status === "dirty" && t.dirty(), (typeof u.value < "u" || n.alwaysSet) && (r[s.value] = u.value);
      }
      return { status: t.value, value: r };
    }
  }, V = Object.freeze({
    status: "aborted"
  }), ui = (t) => ({ status: "dirty", value: t }), oe = (t) => ({ status: "valid", value: t }), xr = (t) => t.status === "aborted", Br = (t) => t.status === "dirty", $t = (t) => t.status === "valid", Gt = (t) => typeof Promise < "u" && t instanceof Promise, B;
  (function(t) {
    t.errToObj = (i) => typeof i == "string" ? { message: i } : i || {}, t.toString = (i) => typeof i == "string" ? i : i?.message;
  })(B || (B = {}));
  var we = class {
    constructor(t, i, r, n) {
      this._cachedPath = [], this.parent = t, this.data = i, this._path = r, this._key = n;
    }
    get path() {
      return this._cachedPath.length || (this._key instanceof Array ? this._cachedPath.push(...this._path, ...this._key) : this._cachedPath.push(...this._path, this._key)), this._cachedPath;
    }
  }, li = (t, i) => {
    if ($t(i))
      return { success: !0, data: i.value };
    if (!t.common.issues.length)
      throw new Error("Validation failed but no issues detected.");
    return {
      success: !1,
      get error() {
        if (this._error)
          return this._error;
        const r = new le(t.common.issues);
        return this._error = r, this._error;
      }
    };
  };
  function D(t) {
    if (!t)
      return {};
    const { errorMap: i, invalid_type_error: r, required_error: n, description: s } = t;
    if (i && (r || n))
      throw new Error(`Can't use "invalid_type_error" or "required_error" in conjunction with custom error map.`);
    return i ? { errorMap: i, description: s } : { errorMap: (e, d) => e.code !== "invalid_type" ? { message: d.defaultError } : typeof d.data > "u" ? { message: n ?? d.defaultError } : { message: r ?? d.defaultError }, description: s };
  }
  var P = class {
    constructor(t) {
      this.spa = this.safeParseAsync, this._def = t, this.parse = this.parse.bind(this), this.safeParse = this.safeParse.bind(this), this.parseAsync = this.parseAsync.bind(this), this.safeParseAsync = this.safeParseAsync.bind(this), this.spa = this.spa.bind(this), this.refine = this.refine.bind(this), this.refinement = this.refinement.bind(this), this.superRefine = this.superRefine.bind(this), this.optional = this.optional.bind(this), this.nullable = this.nullable.bind(this), this.nullish = this.nullish.bind(this), this.array = this.array.bind(this), this.promise = this.promise.bind(this), this.or = this.or.bind(this), this.and = this.and.bind(this), this.transform = this.transform.bind(this), this.brand = this.brand.bind(this), this.default = this.default.bind(this), this.catch = this.catch.bind(this), this.describe = this.describe.bind(this), this.pipe = this.pipe.bind(this), this.isNullable = this.isNullable.bind(this), this.isOptional = this.isOptional.bind(this);
    }
    get description() {
      return this._def.description;
    }
    _getType(t) {
      return ge(t.data);
    }
    _getOrReturnCtx(t, i) {
      return i || {
        common: t.parent.common,
        data: t.data,
        parsedType: ge(t.data),
        schemaErrorMap: this._def.errorMap,
        path: t.path,
        parent: t.parent
      };
    }
    _processInputParams(t) {
      return {
        status: new ae(),
        ctx: {
          common: t.parent.common,
          data: t.data,
          parsedType: ge(t.data),
          schemaErrorMap: this._def.errorMap,
          path: t.path,
          parent: t.parent
        }
      };
    }
    _parseSync(t) {
      const i = this._parse(t);
      if (Gt(i))
        throw new Error("Synchronous parse encountered promise.");
      return i;
    }
    _parseAsync(t) {
      const i = this._parse(t);
      return Promise.resolve(i);
    }
    parse(t, i) {
      const r = this.safeParse(t, i);
      if (r.success)
        return r.data;
      throw r.error;
    }
    safeParse(t, i) {
      var r;
      const n = {
        common: {
          issues: [],
          async: (r = i?.async) !== null && r !== void 0 ? r : !1,
          contextualErrorMap: i?.errorMap
        },
        path: i?.path || [],
        schemaErrorMap: this._def.errorMap,
        parent: null,
        data: t,
        parsedType: ge(t)
      }, s = this._parseSync({ data: t, path: n.path, parent: n });
      return li(n, s);
    }
    async parseAsync(t, i) {
      const r = await this.safeParseAsync(t, i);
      if (r.success)
        return r.data;
      throw r.error;
    }
    async safeParseAsync(t, i) {
      const r = {
        common: {
          issues: [],
          contextualErrorMap: i?.errorMap,
          async: !0
        },
        path: i?.path || [],
        schemaErrorMap: this._def.errorMap,
        parent: null,
        data: t,
        parsedType: ge(t)
      }, n = this._parse({ data: t, path: r.path, parent: r }), s = await (Gt(n) ? n : Promise.resolve(n));
      return li(r, s);
    }
    refine(t, i) {
      const r = (n) => typeof i == "string" || typeof i > "u" ? { message: i } : typeof i == "function" ? i(n) : i;
      return this._refinement((n, s) => {
        const u = t(n), e = () => s.addIssue({
          code: v.custom,
          ...r(n)
        });
        return typeof Promise < "u" && u instanceof Promise ? u.then((d) => d ? !0 : (e(), !1)) : u ? !0 : (e(), !1);
      });
    }
    refinement(t, i) {
      return this._refinement((r, n) => t(r) ? !0 : (n.addIssue(typeof i == "function" ? i(r, n) : i), !1));
    }
    _refinement(t) {
      return new Re({
        schema: this,
        typeName: K.ZodEffects,
        effect: { type: "refinement", refinement: t }
      });
    }
    superRefine(t) {
      return this._refinement(t);
    }
    optional() {
      return ke.create(this, this._def);
    }
    nullable() {
      return Ze.create(this, this._def);
    }
    nullish() {
      return this.nullable().optional();
    }
    array() {
      return Ce.create(this, this._def);
    }
    promise() {
      return ot.create(this, this._def);
    }
    or(t) {
      return Et.create([this, t], this._def);
    }
    and(t) {
      return gt.create(this, t, this._def);
    }
    transform(t) {
      return new Re({
        ...D(this._def),
        schema: this,
        typeName: K.ZodEffects,
        effect: { type: "transform", transform: t }
      });
    }
    default(t) {
      const i = typeof t == "function" ? t : () => t;
      return new vt({
        ...D(this._def),
        innerType: this,
        defaultValue: i,
        typeName: K.ZodDefault
      });
    }
    brand() {
      return new ci({
        typeName: K.ZodBranded,
        type: this,
        ...D(this._def)
      });
    }
    catch(t) {
      const i = typeof t == "function" ? t : () => t;
      return new Wt({
        ...D(this._def),
        innerType: this,
        catchValue: i,
        typeName: K.ZodCatch
      });
    }
    describe(t) {
      const i = this.constructor;
      return new i({
        ...this._def,
        description: t
      });
    }
    pipe(t) {
      return Qt.create(this, t);
    }
    isOptional() {
      return this.safeParse(void 0).success;
    }
    isNullable() {
      return this.safeParse(null).success;
    }
  }, rl = /^c[^\s-]{8,}$/i, il = /^[a-z][a-z0-9]*$/, nl = /[0-9A-HJKMNP-TV-Z]{26}/, sl = /^([a-f0-9]{8}-[a-f0-9]{4}-[1-5][a-f0-9]{3}-[a-f0-9]{4}-[a-f0-9]{12}|00000000-0000-0000-0000-000000000000)$/i, al = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\])|(\[IPv6:(([a-f0-9]{1,4}:){7}|::([a-f0-9]{1,4}:){0,6}|([a-f0-9]{1,4}:){1}:([a-f0-9]{1,4}:){0,5}|([a-f0-9]{1,4}:){2}:([a-f0-9]{1,4}:){0,4}|([a-f0-9]{1,4}:){3}:([a-f0-9]{1,4}:){0,3}|([a-f0-9]{1,4}:){4}:([a-f0-9]{1,4}:){0,2}|([a-f0-9]{1,4}:){5}:([a-f0-9]{1,4}:){0,1})([a-f0-9]{1,4}|(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2})))\])|([A-Za-z0-9]([A-Za-z0-9-]*[A-Za-z0-9])*(\.[A-Za-z]{2,})+))$/, ol = /^(\p{Extended_Pictographic}|\p{Emoji_Component})+$/u, pl = /^(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))$/, ul = /^(([a-f0-9]{1,4}:){7}|::([a-f0-9]{1,4}:){0,6}|([a-f0-9]{1,4}:){1}:([a-f0-9]{1,4}:){0,5}|([a-f0-9]{1,4}:){2}:([a-f0-9]{1,4}:){0,4}|([a-f0-9]{1,4}:){3}:([a-f0-9]{1,4}:){0,3}|([a-f0-9]{1,4}:){4}:([a-f0-9]{1,4}:){0,2}|([a-f0-9]{1,4}:){5}:([a-f0-9]{1,4}:){0,1})([a-f0-9]{1,4}|(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2})))$/, ll = (t) => t.precision ? t.offset ? new RegExp(`^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}\\.\\d{${t.precision}}(([+-]\\d{2}(:?\\d{2})?)|Z)$`) : new RegExp(`^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}\\.\\d{${t.precision}}Z$`) : t.precision === 0 ? t.offset ? new RegExp("^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}(([+-]\\d{2}(:?\\d{2})?)|Z)$") : new RegExp("^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}Z$") : t.offset ? new RegExp("^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}(\\.\\d+)?(([+-]\\d{2}(:?\\d{2})?)|Z)$") : new RegExp("^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}(\\.\\d+)?Z$");
  function fl(t, i) {
    return !!((i === "v4" || !i) && pl.test(t) || (i === "v6" || !i) && ul.test(t));
  }
  var Le = class extends P {
    constructor() {
      super(...arguments), this._regex = (t, i, r) => this.refinement((n) => t.test(n), {
        validation: i,
        code: v.invalid_string,
        ...B.errToObj(r)
      }), this.nonempty = (t) => this.min(1, B.errToObj(t)), this.trim = () => new Le({
        ...this._def,
        checks: [...this._def.checks, { kind: "trim" }]
      }), this.toLowerCase = () => new Le({
        ...this._def,
        checks: [...this._def.checks, { kind: "toLowerCase" }]
      }), this.toUpperCase = () => new Le({
        ...this._def,
        checks: [...this._def.checks, { kind: "toUpperCase" }]
      });
    }
    _parse(t) {
      if (this._def.coerce && (t.data = String(t.data)), this._getType(t) !== L.string) {
        const s = this._getOrReturnCtx(t);
        return _(s, {
          code: v.invalid_type,
          expected: L.string,
          received: s.parsedType
        }), V;
      }
      const r = new ae();
      let n;
      for (const s of this._def.checks)
        if (s.kind === "min")
          t.data.length < s.value && (n = this._getOrReturnCtx(t, n), _(n, {
            code: v.too_small,
            minimum: s.value,
            type: "string",
            inclusive: !0,
            exact: !1,
            message: s.message
          }), r.dirty());
        else if (s.kind === "max")
          t.data.length > s.value && (n = this._getOrReturnCtx(t, n), _(n, {
            code: v.too_big,
            maximum: s.value,
            type: "string",
            inclusive: !0,
            exact: !1,
            message: s.message
          }), r.dirty());
        else if (s.kind === "length") {
          const u = t.data.length > s.value, e = t.data.length < s.value;
          (u || e) && (n = this._getOrReturnCtx(t, n), u ? _(n, {
            code: v.too_big,
            maximum: s.value,
            type: "string",
            inclusive: !0,
            exact: !0,
            message: s.message
          }) : e && _(n, {
            code: v.too_small,
            minimum: s.value,
            type: "string",
            inclusive: !0,
            exact: !0,
            message: s.message
          }), r.dirty());
        } else if (s.kind === "email")
          al.test(t.data) || (n = this._getOrReturnCtx(t, n), _(n, {
            validation: "email",
            code: v.invalid_string,
            message: s.message
          }), r.dirty());
        else if (s.kind === "emoji")
          ol.test(t.data) || (n = this._getOrReturnCtx(t, n), _(n, {
            validation: "emoji",
            code: v.invalid_string,
            message: s.message
          }), r.dirty());
        else if (s.kind === "uuid")
          sl.test(t.data) || (n = this._getOrReturnCtx(t, n), _(n, {
            validation: "uuid",
            code: v.invalid_string,
            message: s.message
          }), r.dirty());
        else if (s.kind === "cuid")
          rl.test(t.data) || (n = this._getOrReturnCtx(t, n), _(n, {
            validation: "cuid",
            code: v.invalid_string,
            message: s.message
          }), r.dirty());
        else if (s.kind === "cuid2")
          il.test(t.data) || (n = this._getOrReturnCtx(t, n), _(n, {
            validation: "cuid2",
            code: v.invalid_string,
            message: s.message
          }), r.dirty());
        else if (s.kind === "ulid")
          nl.test(t.data) || (n = this._getOrReturnCtx(t, n), _(n, {
            validation: "ulid",
            code: v.invalid_string,
            message: s.message
          }), r.dirty());
        else if (s.kind === "url")
          try {
            new URL(t.data);
          } catch {
            n = this._getOrReturnCtx(t, n), _(n, {
              validation: "url",
              code: v.invalid_string,
              message: s.message
            }), r.dirty();
          }
        else
          s.kind === "regex" ? (s.regex.lastIndex = 0, s.regex.test(t.data) || (n = this._getOrReturnCtx(t, n), _(n, {
            validation: "regex",
            code: v.invalid_string,
            message: s.message
          }), r.dirty())) : s.kind === "trim" ? t.data = t.data.trim() : s.kind === "includes" ? t.data.includes(s.value, s.position) || (n = this._getOrReturnCtx(t, n), _(n, {
            code: v.invalid_string,
            validation: { includes: s.value, position: s.position },
            message: s.message
          }), r.dirty()) : s.kind === "toLowerCase" ? t.data = t.data.toLowerCase() : s.kind === "toUpperCase" ? t.data = t.data.toUpperCase() : s.kind === "startsWith" ? t.data.startsWith(s.value) || (n = this._getOrReturnCtx(t, n), _(n, {
            code: v.invalid_string,
            validation: { startsWith: s.value },
            message: s.message
          }), r.dirty()) : s.kind === "endsWith" ? t.data.endsWith(s.value) || (n = this._getOrReturnCtx(t, n), _(n, {
            code: v.invalid_string,
            validation: { endsWith: s.value },
            message: s.message
          }), r.dirty()) : s.kind === "datetime" ? ll(s).test(t.data) || (n = this._getOrReturnCtx(t, n), _(n, {
            code: v.invalid_string,
            validation: "datetime",
            message: s.message
          }), r.dirty()) : s.kind === "ip" ? fl(t.data, s.version) || (n = this._getOrReturnCtx(t, n), _(n, {
            validation: "ip",
            code: v.invalid_string,
            message: s.message
          }), r.dirty()) : k.assertNever(s);
      return { status: r.value, value: t.data };
    }
    _addCheck(t) {
      return new Le({
        ...this._def,
        checks: [...this._def.checks, t]
      });
    }
    email(t) {
      return this._addCheck({ kind: "email", ...B.errToObj(t) });
    }
    url(t) {
      return this._addCheck({ kind: "url", ...B.errToObj(t) });
    }
    emoji(t) {
      return this._addCheck({ kind: "emoji", ...B.errToObj(t) });
    }
    uuid(t) {
      return this._addCheck({ kind: "uuid", ...B.errToObj(t) });
    }
    cuid(t) {
      return this._addCheck({ kind: "cuid", ...B.errToObj(t) });
    }
    cuid2(t) {
      return this._addCheck({ kind: "cuid2", ...B.errToObj(t) });
    }
    ulid(t) {
      return this._addCheck({ kind: "ulid", ...B.errToObj(t) });
    }
    ip(t) {
      return this._addCheck({ kind: "ip", ...B.errToObj(t) });
    }
    datetime(t) {
      var i;
      return typeof t == "string" ? this._addCheck({
        kind: "datetime",
        precision: null,
        offset: !1,
        message: t
      }) : this._addCheck({
        kind: "datetime",
        precision: typeof t?.precision > "u" ? null : t?.precision,
        offset: (i = t?.offset) !== null && i !== void 0 ? i : !1,
        ...B.errToObj(t?.message)
      });
    }
    regex(t, i) {
      return this._addCheck({
        kind: "regex",
        regex: t,
        ...B.errToObj(i)
      });
    }
    includes(t, i) {
      return this._addCheck({
        kind: "includes",
        value: t,
        position: i?.position,
        ...B.errToObj(i?.message)
      });
    }
    startsWith(t, i) {
      return this._addCheck({
        kind: "startsWith",
        value: t,
        ...B.errToObj(i)
      });
    }
    endsWith(t, i) {
      return this._addCheck({
        kind: "endsWith",
        value: t,
        ...B.errToObj(i)
      });
    }
    min(t, i) {
      return this._addCheck({
        kind: "min",
        value: t,
        ...B.errToObj(i)
      });
    }
    max(t, i) {
      return this._addCheck({
        kind: "max",
        value: t,
        ...B.errToObj(i)
      });
    }
    length(t, i) {
      return this._addCheck({
        kind: "length",
        value: t,
        ...B.errToObj(i)
      });
    }
    get isDatetime() {
      return !!this._def.checks.find((t) => t.kind === "datetime");
    }
    get isEmail() {
      return !!this._def.checks.find((t) => t.kind === "email");
    }
    get isURL() {
      return !!this._def.checks.find((t) => t.kind === "url");
    }
    get isEmoji() {
      return !!this._def.checks.find((t) => t.kind === "emoji");
    }
    get isUUID() {
      return !!this._def.checks.find((t) => t.kind === "uuid");
    }
    get isCUID() {
      return !!this._def.checks.find((t) => t.kind === "cuid");
    }
    get isCUID2() {
      return !!this._def.checks.find((t) => t.kind === "cuid2");
    }
    get isULID() {
      return !!this._def.checks.find((t) => t.kind === "ulid");
    }
    get isIP() {
      return !!this._def.checks.find((t) => t.kind === "ip");
    }
    get minLength() {
      let t = null;
      for (const i of this._def.checks)
        i.kind === "min" && (t === null || i.value > t) && (t = i.value);
      return t;
    }
    get maxLength() {
      let t = null;
      for (const i of this._def.checks)
        i.kind === "max" && (t === null || i.value < t) && (t = i.value);
      return t;
    }
  };
  Le.create = (t) => {
    var i;
    return new Le({
      checks: [],
      typeName: K.ZodString,
      coerce: (i = t?.coerce) !== null && i !== void 0 ? i : !1,
      ...D(t)
    });
  };
  function cl(t, i) {
    const r = (t.toString().split(".")[1] || "").length, n = (i.toString().split(".")[1] || "").length, s = r > n ? r : n, u = parseInt(t.toFixed(s).replace(".", "")), e = parseInt(i.toFixed(s).replace(".", ""));
    return u % e / Math.pow(10, s);
  }
  var Oe = class extends P {
    constructor() {
      super(...arguments), this.min = this.gte, this.max = this.lte, this.step = this.multipleOf;
    }
    _parse(t) {
      if (this._def.coerce && (t.data = Number(t.data)), this._getType(t) !== L.number) {
        const s = this._getOrReturnCtx(t);
        return _(s, {
          code: v.invalid_type,
          expected: L.number,
          received: s.parsedType
        }), V;
      }
      let r;
      const n = new ae();
      for (const s of this._def.checks)
        s.kind === "int" ? k.isInteger(t.data) || (r = this._getOrReturnCtx(t, r), _(r, {
          code: v.invalid_type,
          expected: "integer",
          received: "float",
          message: s.message
        }), n.dirty()) : s.kind === "min" ? (s.inclusive ? t.data < s.value : t.data <= s.value) && (r = this._getOrReturnCtx(t, r), _(r, {
          code: v.too_small,
          minimum: s.value,
          type: "number",
          inclusive: s.inclusive,
          exact: !1,
          message: s.message
        }), n.dirty()) : s.kind === "max" ? (s.inclusive ? t.data > s.value : t.data >= s.value) && (r = this._getOrReturnCtx(t, r), _(r, {
          code: v.too_big,
          maximum: s.value,
          type: "number",
          inclusive: s.inclusive,
          exact: !1,
          message: s.message
        }), n.dirty()) : s.kind === "multipleOf" ? cl(t.data, s.value) !== 0 && (r = this._getOrReturnCtx(t, r), _(r, {
          code: v.not_multiple_of,
          multipleOf: s.value,
          message: s.message
        }), n.dirty()) : s.kind === "finite" ? Number.isFinite(t.data) || (r = this._getOrReturnCtx(t, r), _(r, {
          code: v.not_finite,
          message: s.message
        }), n.dirty()) : k.assertNever(s);
      return { status: n.value, value: t.data };
    }
    gte(t, i) {
      return this.setLimit("min", t, !0, B.toString(i));
    }
    gt(t, i) {
      return this.setLimit("min", t, !1, B.toString(i));
    }
    lte(t, i) {
      return this.setLimit("max", t, !0, B.toString(i));
    }
    lt(t, i) {
      return this.setLimit("max", t, !1, B.toString(i));
    }
    setLimit(t, i, r, n) {
      return new Oe({
        ...this._def,
        checks: [
          ...this._def.checks,
          {
            kind: t,
            value: i,
            inclusive: r,
            message: B.toString(n)
          }
        ]
      });
    }
    _addCheck(t) {
      return new Oe({
        ...this._def,
        checks: [...this._def.checks, t]
      });
    }
    int(t) {
      return this._addCheck({
        kind: "int",
        message: B.toString(t)
      });
    }
    positive(t) {
      return this._addCheck({
        kind: "min",
        value: 0,
        inclusive: !1,
        message: B.toString(t)
      });
    }
    negative(t) {
      return this._addCheck({
        kind: "max",
        value: 0,
        inclusive: !1,
        message: B.toString(t)
      });
    }
    nonpositive(t) {
      return this._addCheck({
        kind: "max",
        value: 0,
        inclusive: !0,
        message: B.toString(t)
      });
    }
    nonnegative(t) {
      return this._addCheck({
        kind: "min",
        value: 0,
        inclusive: !0,
        message: B.toString(t)
      });
    }
    multipleOf(t, i) {
      return this._addCheck({
        kind: "multipleOf",
        value: t,
        message: B.toString(i)
      });
    }
    finite(t) {
      return this._addCheck({
        kind: "finite",
        message: B.toString(t)
      });
    }
    safe(t) {
      return this._addCheck({
        kind: "min",
        inclusive: !0,
        value: Number.MIN_SAFE_INTEGER,
        message: B.toString(t)
      })._addCheck({
        kind: "max",
        inclusive: !0,
        value: Number.MAX_SAFE_INTEGER,
        message: B.toString(t)
      });
    }
    get minValue() {
      let t = null;
      for (const i of this._def.checks)
        i.kind === "min" && (t === null || i.value > t) && (t = i.value);
      return t;
    }
    get maxValue() {
      let t = null;
      for (const i of this._def.checks)
        i.kind === "max" && (t === null || i.value < t) && (t = i.value);
      return t;
    }
    get isInt() {
      return !!this._def.checks.find((t) => t.kind === "int" || t.kind === "multipleOf" && k.isInteger(t.value));
    }
    get isFinite() {
      let t = null, i = null;
      for (const r of this._def.checks) {
        if (r.kind === "finite" || r.kind === "int" || r.kind === "multipleOf")
          return !0;
        r.kind === "min" ? (i === null || r.value > i) && (i = r.value) : r.kind === "max" && (t === null || r.value < t) && (t = r.value);
      }
      return Number.isFinite(i) && Number.isFinite(t);
    }
  };
  Oe.create = (t) => new Oe({
    checks: [],
    typeName: K.ZodNumber,
    coerce: t?.coerce || !1,
    ...D(t)
  });
  var Xe = class extends P {
    constructor() {
      super(...arguments), this.min = this.gte, this.max = this.lte;
    }
    _parse(t) {
      if (this._def.coerce && (t.data = BigInt(t.data)), this._getType(t) !== L.bigint) {
        const s = this._getOrReturnCtx(t);
        return _(s, {
          code: v.invalid_type,
          expected: L.bigint,
          received: s.parsedType
        }), V;
      }
      let r;
      const n = new ae();
      for (const s of this._def.checks)
        s.kind === "min" ? (s.inclusive ? t.data < s.value : t.data <= s.value) && (r = this._getOrReturnCtx(t, r), _(r, {
          code: v.too_small,
          type: "bigint",
          minimum: s.value,
          inclusive: s.inclusive,
          message: s.message
        }), n.dirty()) : s.kind === "max" ? (s.inclusive ? t.data > s.value : t.data >= s.value) && (r = this._getOrReturnCtx(t, r), _(r, {
          code: v.too_big,
          type: "bigint",
          maximum: s.value,
          inclusive: s.inclusive,
          message: s.message
        }), n.dirty()) : s.kind === "multipleOf" ? t.data % s.value !== BigInt(0) && (r = this._getOrReturnCtx(t, r), _(r, {
          code: v.not_multiple_of,
          multipleOf: s.value,
          message: s.message
        }), n.dirty()) : k.assertNever(s);
      return { status: n.value, value: t.data };
    }
    gte(t, i) {
      return this.setLimit("min", t, !0, B.toString(i));
    }
    gt(t, i) {
      return this.setLimit("min", t, !1, B.toString(i));
    }
    lte(t, i) {
      return this.setLimit("max", t, !0, B.toString(i));
    }
    lt(t, i) {
      return this.setLimit("max", t, !1, B.toString(i));
    }
    setLimit(t, i, r, n) {
      return new Xe({
        ...this._def,
        checks: [
          ...this._def.checks,
          {
            kind: t,
            value: i,
            inclusive: r,
            message: B.toString(n)
          }
        ]
      });
    }
    _addCheck(t) {
      return new Xe({
        ...this._def,
        checks: [...this._def.checks, t]
      });
    }
    positive(t) {
      return this._addCheck({
        kind: "min",
        value: BigInt(0),
        inclusive: !1,
        message: B.toString(t)
      });
    }
    negative(t) {
      return this._addCheck({
        kind: "max",
        value: BigInt(0),
        inclusive: !1,
        message: B.toString(t)
      });
    }
    nonpositive(t) {
      return this._addCheck({
        kind: "max",
        value: BigInt(0),
        inclusive: !0,
        message: B.toString(t)
      });
    }
    nonnegative(t) {
      return this._addCheck({
        kind: "min",
        value: BigInt(0),
        inclusive: !0,
        message: B.toString(t)
      });
    }
    multipleOf(t, i) {
      return this._addCheck({
        kind: "multipleOf",
        value: t,
        message: B.toString(i)
      });
    }
    get minValue() {
      let t = null;
      for (const i of this._def.checks)
        i.kind === "min" && (t === null || i.value > t) && (t = i.value);
      return t;
    }
    get maxValue() {
      let t = null;
      for (const i of this._def.checks)
        i.kind === "max" && (t === null || i.value < t) && (t = i.value);
      return t;
    }
  };
  Xe.create = (t) => {
    var i;
    return new Xe({
      checks: [],
      typeName: K.ZodBigInt,
      coerce: (i = t?.coerce) !== null && i !== void 0 ? i : !1,
      ...D(t)
    });
  };
  var mt = class extends P {
    _parse(t) {
      if (this._def.coerce && (t.data = !!t.data), this._getType(t) !== L.boolean) {
        const r = this._getOrReturnCtx(t);
        return _(r, {
          code: v.invalid_type,
          expected: L.boolean,
          received: r.parsedType
        }), V;
      }
      return oe(t.data);
    }
  };
  mt.create = (t) => new mt({
    typeName: K.ZodBoolean,
    coerce: t?.coerce || !1,
    ...D(t)
  });
  var it = class extends P {
    _parse(t) {
      if (this._def.coerce && (t.data = new Date(t.data)), this._getType(t) !== L.date) {
        const s = this._getOrReturnCtx(t);
        return _(s, {
          code: v.invalid_type,
          expected: L.date,
          received: s.parsedType
        }), V;
      }
      if (isNaN(t.data.getTime())) {
        const s = this._getOrReturnCtx(t);
        return _(s, {
          code: v.invalid_date
        }), V;
      }
      const r = new ae();
      let n;
      for (const s of this._def.checks)
        s.kind === "min" ? t.data.getTime() < s.value && (n = this._getOrReturnCtx(t, n), _(n, {
          code: v.too_small,
          message: s.message,
          inclusive: !0,
          exact: !1,
          minimum: s.value,
          type: "date"
        }), r.dirty()) : s.kind === "max" ? t.data.getTime() > s.value && (n = this._getOrReturnCtx(t, n), _(n, {
          code: v.too_big,
          message: s.message,
          inclusive: !0,
          exact: !1,
          maximum: s.value,
          type: "date"
        }), r.dirty()) : k.assertNever(s);
      return {
        status: r.value,
        value: new Date(t.data.getTime())
      };
    }
    _addCheck(t) {
      return new it({
        ...this._def,
        checks: [...this._def.checks, t]
      });
    }
    min(t, i) {
      return this._addCheck({
        kind: "min",
        value: t.getTime(),
        message: B.toString(i)
      });
    }
    max(t, i) {
      return this._addCheck({
        kind: "max",
        value: t.getTime(),
        message: B.toString(i)
      });
    }
    get minDate() {
      let t = null;
      for (const i of this._def.checks)
        i.kind === "min" && (t === null || i.value > t) && (t = i.value);
      return t != null ? new Date(t) : null;
    }
    get maxDate() {
      let t = null;
      for (const i of this._def.checks)
        i.kind === "max" && (t === null || i.value < t) && (t = i.value);
      return t != null ? new Date(t) : null;
    }
  };
  it.create = (t) => new it({
    checks: [],
    coerce: t?.coerce || !1,
    typeName: K.ZodDate,
    ...D(t)
  });
  var Ot = class extends P {
    _parse(t) {
      if (this._getType(t) !== L.symbol) {
        const r = this._getOrReturnCtx(t);
        return _(r, {
          code: v.invalid_type,
          expected: L.symbol,
          received: r.parsedType
        }), V;
      }
      return oe(t.data);
    }
  };
  Ot.create = (t) => new Ot({
    typeName: K.ZodSymbol,
    ...D(t)
  });
  var ht = class extends P {
    _parse(t) {
      if (this._getType(t) !== L.undefined) {
        const r = this._getOrReturnCtx(t);
        return _(r, {
          code: v.invalid_type,
          expected: L.undefined,
          received: r.parsedType
        }), V;
      }
      return oe(t.data);
    }
  };
  ht.create = (t) => new ht({
    typeName: K.ZodUndefined,
    ...D(t)
  });
  var yt = class extends P {
    _parse(t) {
      if (this._getType(t) !== L.null) {
        const r = this._getOrReturnCtx(t);
        return _(r, {
          code: v.invalid_type,
          expected: L.null,
          received: r.parsedType
        }), V;
      }
      return oe(t.data);
    }
  };
  yt.create = (t) => new yt({
    typeName: K.ZodNull,
    ...D(t)
  });
  var nt = class extends P {
    constructor() {
      super(...arguments), this._any = !0;
    }
    _parse(t) {
      return oe(t.data);
    }
  };
  nt.create = (t) => new nt({
    typeName: K.ZodAny,
    ...D(t)
  });
  var ze = class extends P {
    constructor() {
      super(...arguments), this._unknown = !0;
    }
    _parse(t) {
      return oe(t.data);
    }
  };
  ze.create = (t) => new ze({
    typeName: K.ZodUnknown,
    ...D(t)
  });
  var xe = class extends P {
    _parse(t) {
      const i = this._getOrReturnCtx(t);
      return _(i, {
        code: v.invalid_type,
        expected: L.never,
        received: i.parsedType
      }), V;
    }
  };
  xe.create = (t) => new xe({
    typeName: K.ZodNever,
    ...D(t)
  });
  var Xt = class extends P {
    _parse(t) {
      if (this._getType(t) !== L.undefined) {
        const r = this._getOrReturnCtx(t);
        return _(r, {
          code: v.invalid_type,
          expected: L.void,
          received: r.parsedType
        }), V;
      }
      return oe(t.data);
    }
  };
  Xt.create = (t) => new Xt({
    typeName: K.ZodVoid,
    ...D(t)
  });
  var Ce = class extends P {
    _parse(t) {
      const { ctx: i, status: r } = this._processInputParams(t), n = this._def;
      if (i.parsedType !== L.array)
        return _(i, {
          code: v.invalid_type,
          expected: L.array,
          received: i.parsedType
        }), V;
      if (n.exactLength !== null) {
        const u = i.data.length > n.exactLength.value, e = i.data.length < n.exactLength.value;
        (u || e) && (_(i, {
          code: u ? v.too_big : v.too_small,
          minimum: e ? n.exactLength.value : void 0,
          maximum: u ? n.exactLength.value : void 0,
          type: "array",
          inclusive: !0,
          exact: !0,
          message: n.exactLength.message
        }), r.dirty());
      }
      if (n.minLength !== null && i.data.length < n.minLength.value && (_(i, {
        code: v.too_small,
        minimum: n.minLength.value,
        type: "array",
        inclusive: !0,
        exact: !1,
        message: n.minLength.message
      }), r.dirty()), n.maxLength !== null && i.data.length > n.maxLength.value && (_(i, {
        code: v.too_big,
        maximum: n.maxLength.value,
        type: "array",
        inclusive: !0,
        exact: !1,
        message: n.maxLength.message
      }), r.dirty()), i.common.async)
        return Promise.all([...i.data].map((u, e) => n.type._parseAsync(new we(i, u, i.path, e)))).then((u) => ae.mergeArray(r, u));
      const s = [...i.data].map((u, e) => n.type._parseSync(new we(i, u, i.path, e)));
      return ae.mergeArray(r, s);
    }
    get element() {
      return this._def.type;
    }
    min(t, i) {
      return new Ce({
        ...this._def,
        minLength: { value: t, message: B.toString(i) }
      });
    }
    max(t, i) {
      return new Ce({
        ...this._def,
        maxLength: { value: t, message: B.toString(i) }
      });
    }
    length(t, i) {
      return new Ce({
        ...this._def,
        exactLength: { value: t, message: B.toString(i) }
      });
    }
    nonempty(t) {
      return this.min(1, t);
    }
  };
  Ce.create = (t, i) => new Ce({
    type: t,
    minLength: null,
    maxLength: null,
    exactLength: null,
    typeName: K.ZodArray,
    ...D(i)
  });
  function st(t) {
    if (t instanceof Z) {
      const i = {};
      for (const r in t.shape) {
        const n = t.shape[r];
        i[r] = ke.create(st(n));
      }
      return new Z({
        ...t._def,
        shape: () => i
      });
    } else
      return t instanceof Ce ? new Ce({
        ...t._def,
        type: st(t.element)
      }) : t instanceof ke ? ke.create(st(t.unwrap())) : t instanceof Ze ? Ze.create(st(t.unwrap())) : t instanceof Be ? Be.create(t.items.map((i) => st(i))) : t;
  }
  var Z = class extends P {
    constructor() {
      super(...arguments), this._cached = null, this.nonstrict = this.passthrough, this.augment = this.extend;
    }
    _getCached() {
      if (this._cached !== null)
        return this._cached;
      const t = this._def.shape(), i = k.objectKeys(t);
      return this._cached = { shape: t, keys: i };
    }
    _parse(t) {
      if (this._getType(t) !== L.object) {
        const y = this._getOrReturnCtx(t);
        return _(y, {
          code: v.invalid_type,
          expected: L.object,
          received: y.parsedType
        }), V;
      }
      const { status: r, ctx: n } = this._processInputParams(t), { shape: s, keys: u } = this._getCached(), e = [];
      if (!(this._def.catchall instanceof xe && this._def.unknownKeys === "strip"))
        for (const y in n.data)
          u.includes(y) || e.push(y);
      const d = [];
      for (const y of u) {
        const T = s[y], C = n.data[y];
        d.push({
          key: { status: "valid", value: y },
          value: T._parse(new we(n, C, n.path, y)),
          alwaysSet: y in n.data
        });
      }
      if (this._def.catchall instanceof xe) {
        const y = this._def.unknownKeys;
        if (y === "passthrough")
          for (const T of e)
            d.push({
              key: { status: "valid", value: T },
              value: { status: "valid", value: n.data[T] }
            });
        else if (y === "strict")
          e.length > 0 && (_(n, {
            code: v.unrecognized_keys,
            keys: e
          }), r.dirty());
        else if (y !== "strip")
          throw new Error("Internal ZodObject error: invalid unknownKeys value.");
      } else {
        const y = this._def.catchall;
        for (const T of e) {
          const C = n.data[T];
          d.push({
            key: { status: "valid", value: T },
            value: y._parse(new we(n, C, n.path, T)),
            alwaysSet: T in n.data
          });
        }
      }
      return n.common.async ? Promise.resolve().then(async () => {
        const y = [];
        for (const T of d) {
          const C = await T.key;
          y.push({
            key: C,
            value: await T.value,
            alwaysSet: T.alwaysSet
          });
        }
        return y;
      }).then((y) => ae.mergeObjectSync(r, y)) : ae.mergeObjectSync(r, d);
    }
    get shape() {
      return this._def.shape();
    }
    strict(t) {
      return B.errToObj, new Z({
        ...this._def,
        unknownKeys: "strict",
        ...t !== void 0 ? {
          errorMap: (i, r) => {
            var n, s, u, e;
            const d = (u = (s = (n = this._def).errorMap) === null || s === void 0 ? void 0 : s.call(n, i, r).message) !== null && u !== void 0 ? u : r.defaultError;
            return i.code === "unrecognized_keys" ? {
              message: (e = B.errToObj(t).message) !== null && e !== void 0 ? e : d
            } : {
              message: d
            };
          }
        } : {}
      });
    }
    strip() {
      return new Z({
        ...this._def,
        unknownKeys: "strip"
      });
    }
    passthrough() {
      return new Z({
        ...this._def,
        unknownKeys: "passthrough"
      });
    }
    extend(t) {
      return new Z({
        ...this._def,
        shape: () => ({
          ...this._def.shape(),
          ...t
        })
      });
    }
    merge(t) {
      return new Z({
        unknownKeys: t._def.unknownKeys,
        catchall: t._def.catchall,
        shape: () => ({
          ...this._def.shape(),
          ...t._def.shape()
        }),
        typeName: K.ZodObject
      });
    }
    setKey(t, i) {
      return this.augment({ [t]: i });
    }
    catchall(t) {
      return new Z({
        ...this._def,
        catchall: t
      });
    }
    pick(t) {
      const i = {};
      return k.objectKeys(t).forEach((r) => {
        t[r] && this.shape[r] && (i[r] = this.shape[r]);
      }), new Z({
        ...this._def,
        shape: () => i
      });
    }
    omit(t) {
      const i = {};
      return k.objectKeys(this.shape).forEach((r) => {
        t[r] || (i[r] = this.shape[r]);
      }), new Z({
        ...this._def,
        shape: () => i
      });
    }
    deepPartial() {
      return st(this);
    }
    partial(t) {
      const i = {};
      return k.objectKeys(this.shape).forEach((r) => {
        const n = this.shape[r];
        t && !t[r] ? i[r] = n : i[r] = n.optional();
      }), new Z({
        ...this._def,
        shape: () => i
      });
    }
    required(t) {
      const i = {};
      return k.objectKeys(this.shape).forEach((r) => {
        if (t && !t[r])
          i[r] = this.shape[r];
        else {
          let s = this.shape[r];
          for (; s instanceof ke; )
            s = s._def.innerType;
          i[r] = s;
        }
      }), new Z({
        ...this._def,
        shape: () => i
      });
    }
    keyof() {
      return fi(k.objectKeys(this.shape));
    }
  };
  Z.create = (t, i) => new Z({
    shape: () => t,
    unknownKeys: "strip",
    catchall: xe.create(),
    typeName: K.ZodObject,
    ...D(i)
  }), Z.strictCreate = (t, i) => new Z({
    shape: () => t,
    unknownKeys: "strict",
    catchall: xe.create(),
    typeName: K.ZodObject,
    ...D(i)
  }), Z.lazycreate = (t, i) => new Z({
    shape: t,
    unknownKeys: "strip",
    catchall: xe.create(),
    typeName: K.ZodObject,
    ...D(i)
  });
  var Et = class extends P {
    _parse(t) {
      const { ctx: i } = this._processInputParams(t), r = this._def.options;
      function n(s) {
        for (const e of s)
          if (e.result.status === "valid")
            return e.result;
        for (const e of s)
          if (e.result.status === "dirty")
            return i.common.issues.push(...e.ctx.common.issues), e.result;
        const u = s.map((e) => new le(e.ctx.common.issues));
        return _(i, {
          code: v.invalid_union,
          unionErrors: u
        }), V;
      }
      if (i.common.async)
        return Promise.all(r.map(async (s) => {
          const u = {
            ...i,
            common: {
              ...i.common,
              issues: []
            },
            parent: null
          };
          return {
            result: await s._parseAsync({
              data: i.data,
              path: i.path,
              parent: u
            }),
            ctx: u
          };
        })).then(n);
      {
        let s;
        const u = [];
        for (const d of r) {
          const y = {
            ...i,
            common: {
              ...i.common,
              issues: []
            },
            parent: null
          }, T = d._parseSync({
            data: i.data,
            path: i.path,
            parent: y
          });
          if (T.status === "valid")
            return T;
          T.status === "dirty" && !s && (s = { result: T, ctx: y }), y.common.issues.length && u.push(y.common.issues);
        }
        if (s)
          return i.common.issues.push(...s.ctx.common.issues), s.result;
        const e = u.map((d) => new le(d));
        return _(i, {
          code: v.invalid_union,
          unionErrors: e
        }), V;
      }
    }
    get options() {
      return this._def.options;
    }
  };
  Et.create = (t, i) => new Et({
    options: t,
    typeName: K.ZodUnion,
    ...D(i)
  });
  var zt = (t) => t instanceof bt ? zt(t.schema) : t instanceof Re ? zt(t.innerType()) : t instanceof At ? [t.value] : t instanceof He ? t.options : t instanceof Tt ? Object.keys(t.enum) : t instanceof vt ? zt(t._def.innerType) : t instanceof ht ? [void 0] : t instanceof yt ? [null] : null, kr = class extends P {
    _parse(t) {
      const { ctx: i } = this._processInputParams(t);
      if (i.parsedType !== L.object)
        return _(i, {
          code: v.invalid_type,
          expected: L.object,
          received: i.parsedType
        }), V;
      const r = this.discriminator, n = i.data[r], s = this.optionsMap.get(n);
      return s ? i.common.async ? s._parseAsync({
        data: i.data,
        path: i.path,
        parent: i
      }) : s._parseSync({
        data: i.data,
        path: i.path,
        parent: i
      }) : (_(i, {
        code: v.invalid_union_discriminator,
        options: Array.from(this.optionsMap.keys()),
        path: [r]
      }), V);
    }
    get discriminator() {
      return this._def.discriminator;
    }
    get options() {
      return this._def.options;
    }
    get optionsMap() {
      return this._def.optionsMap;
    }
    static create(t, i, r) {
      const n = /* @__PURE__ */ new Map();
      for (const s of i) {
        const u = zt(s.shape[t]);
        if (!u)
          throw new Error(`A discriminator value for key \`${t}\` could not be extracted from all schema options`);
        for (const e of u) {
          if (n.has(e))
            throw new Error(`Discriminator property ${String(t)} has duplicate value ${String(e)}`);
          n.set(e, s);
        }
      }
      return new kr({
        typeName: K.ZodDiscriminatedUnion,
        discriminator: t,
        options: i,
        optionsMap: n,
        ...D(r)
      });
    }
  };
  function Kr(t, i) {
    const r = ge(t), n = ge(i);
    if (t === i)
      return { valid: !0, data: t };
    if (r === L.object && n === L.object) {
      const s = k.objectKeys(i), u = k.objectKeys(t).filter((d) => s.indexOf(d) !== -1), e = { ...t, ...i };
      for (const d of u) {
        const y = Kr(t[d], i[d]);
        if (!y.valid)
          return { valid: !1 };
        e[d] = y.data;
      }
      return { valid: !0, data: e };
    } else if (r === L.array && n === L.array) {
      if (t.length !== i.length)
        return { valid: !1 };
      const s = [];
      for (let u = 0; u < t.length; u++) {
        const e = t[u], d = i[u], y = Kr(e, d);
        if (!y.valid)
          return { valid: !1 };
        s.push(y.data);
      }
      return { valid: !0, data: s };
    } else
      return r === L.date && n === L.date && +t == +i ? { valid: !0, data: t } : { valid: !1 };
  }
  var gt = class extends P {
    _parse(t) {
      const { status: i, ctx: r } = this._processInputParams(t), n = (s, u) => {
        if (xr(s) || xr(u))
          return V;
        const e = Kr(s.value, u.value);
        return e.valid ? ((Br(s) || Br(u)) && i.dirty(), { status: i.value, value: e.data }) : (_(r, {
          code: v.invalid_intersection_types
        }), V);
      };
      return r.common.async ? Promise.all([
        this._def.left._parseAsync({
          data: r.data,
          path: r.path,
          parent: r
        }),
        this._def.right._parseAsync({
          data: r.data,
          path: r.path,
          parent: r
        })
      ]).then(([s, u]) => n(s, u)) : n(this._def.left._parseSync({
        data: r.data,
        path: r.path,
        parent: r
      }), this._def.right._parseSync({
        data: r.data,
        path: r.path,
        parent: r
      }));
    }
  };
  gt.create = (t, i, r) => new gt({
    left: t,
    right: i,
    typeName: K.ZodIntersection,
    ...D(r)
  });
  var Be = class extends P {
    _parse(t) {
      const { status: i, ctx: r } = this._processInputParams(t);
      if (r.parsedType !== L.array)
        return _(r, {
          code: v.invalid_type,
          expected: L.array,
          received: r.parsedType
        }), V;
      if (r.data.length < this._def.items.length)
        return _(r, {
          code: v.too_small,
          minimum: this._def.items.length,
          inclusive: !0,
          exact: !1,
          type: "array"
        }), V;
      !this._def.rest && r.data.length > this._def.items.length && (_(r, {
        code: v.too_big,
        maximum: this._def.items.length,
        inclusive: !0,
        exact: !1,
        type: "array"
      }), i.dirty());
      const s = [...r.data].map((u, e) => {
        const d = this._def.items[e] || this._def.rest;
        return d ? d._parse(new we(r, u, r.path, e)) : null;
      }).filter((u) => !!u);
      return r.common.async ? Promise.all(s).then((u) => ae.mergeArray(i, u)) : ae.mergeArray(i, s);
    }
    get items() {
      return this._def.items;
    }
    rest(t) {
      return new Be({
        ...this._def,
        rest: t
      });
    }
  };
  Be.create = (t, i) => {
    if (!Array.isArray(t))
      throw new Error("You must pass an array of schemas to z.tuple([ ... ])");
    return new Be({
      items: t,
      typeName: K.ZodTuple,
      rest: null,
      ...D(i)
    });
  };
  var Ht = class extends P {
    get keySchema() {
      return this._def.keyType;
    }
    get valueSchema() {
      return this._def.valueType;
    }
    _parse(t) {
      const { status: i, ctx: r } = this._processInputParams(t);
      if (r.parsedType !== L.object)
        return _(r, {
          code: v.invalid_type,
          expected: L.object,
          received: r.parsedType
        }), V;
      const n = [], s = this._def.keyType, u = this._def.valueType;
      for (const e in r.data)
        n.push({
          key: s._parse(new we(r, e, r.path, e)),
          value: u._parse(new we(r, r.data[e], r.path, e))
        });
      return r.common.async ? ae.mergeObjectAsync(i, n) : ae.mergeObjectSync(i, n);
    }
    get element() {
      return this._def.valueType;
    }
    static create(t, i, r) {
      return i instanceof P ? new Ht({
        keyType: t,
        valueType: i,
        typeName: K.ZodRecord,
        ...D(r)
      }) : new Ht({
        keyType: Le.create(),
        valueType: t,
        typeName: K.ZodRecord,
        ...D(i)
      });
    }
  }, Zt = class extends P {
    _parse(t) {
      const { status: i, ctx: r } = this._processInputParams(t);
      if (r.parsedType !== L.map)
        return _(r, {
          code: v.invalid_type,
          expected: L.map,
          received: r.parsedType
        }), V;
      const n = this._def.keyType, s = this._def.valueType, u = [...r.data.entries()].map(([e, d], y) => ({
        key: n._parse(new we(r, e, r.path, [y, "key"])),
        value: s._parse(new we(r, d, r.path, [y, "value"]))
      }));
      if (r.common.async) {
        const e = /* @__PURE__ */ new Map();
        return Promise.resolve().then(async () => {
          for (const d of u) {
            const y = await d.key, T = await d.value;
            if (y.status === "aborted" || T.status === "aborted")
              return V;
            (y.status === "dirty" || T.status === "dirty") && i.dirty(), e.set(y.value, T.value);
          }
          return { status: i.value, value: e };
        });
      } else {
        const e = /* @__PURE__ */ new Map();
        for (const d of u) {
          const y = d.key, T = d.value;
          if (y.status === "aborted" || T.status === "aborted")
            return V;
          (y.status === "dirty" || T.status === "dirty") && i.dirty(), e.set(y.value, T.value);
        }
        return { status: i.value, value: e };
      }
    }
  };
  Zt.create = (t, i, r) => new Zt({
    valueType: i,
    keyType: t,
    typeName: K.ZodMap,
    ...D(r)
  });
  var at = class extends P {
    _parse(t) {
      const { status: i, ctx: r } = this._processInputParams(t);
      if (r.parsedType !== L.set)
        return _(r, {
          code: v.invalid_type,
          expected: L.set,
          received: r.parsedType
        }), V;
      const n = this._def;
      n.minSize !== null && r.data.size < n.minSize.value && (_(r, {
        code: v.too_small,
        minimum: n.minSize.value,
        type: "set",
        inclusive: !0,
        exact: !1,
        message: n.minSize.message
      }), i.dirty()), n.maxSize !== null && r.data.size > n.maxSize.value && (_(r, {
        code: v.too_big,
        maximum: n.maxSize.value,
        type: "set",
        inclusive: !0,
        exact: !1,
        message: n.maxSize.message
      }), i.dirty());
      const s = this._def.valueType;
      function u(d) {
        const y = /* @__PURE__ */ new Set();
        for (const T of d) {
          if (T.status === "aborted")
            return V;
          T.status === "dirty" && i.dirty(), y.add(T.value);
        }
        return { status: i.value, value: y };
      }
      const e = [...r.data.values()].map((d, y) => s._parse(new we(r, d, r.path, y)));
      return r.common.async ? Promise.all(e).then((d) => u(d)) : u(e);
    }
    min(t, i) {
      return new at({
        ...this._def,
        minSize: { value: t, message: B.toString(i) }
      });
    }
    max(t, i) {
      return new at({
        ...this._def,
        maxSize: { value: t, message: B.toString(i) }
      });
    }
    size(t, i) {
      return this.min(t, i).max(t, i);
    }
    nonempty(t) {
      return this.min(1, t);
    }
  };
  at.create = (t, i) => new at({
    valueType: t,
    minSize: null,
    maxSize: null,
    typeName: K.ZodSet,
    ...D(i)
  });
  var Rt = class extends P {
    constructor() {
      super(...arguments), this.validate = this.implement;
    }
    _parse(t) {
      const { ctx: i } = this._processInputParams(t);
      if (i.parsedType !== L.function)
        return _(i, {
          code: v.invalid_type,
          expected: L.function,
          received: i.parsedType
        }), V;
      function r(e, d) {
        return Mt({
          data: e,
          path: i.path,
          errorMaps: [
            i.common.contextualErrorMap,
            i.schemaErrorMap,
            qt(),
            dt
          ].filter((y) => !!y),
          issueData: {
            code: v.invalid_arguments,
            argumentsError: d
          }
        });
      }
      function n(e, d) {
        return Mt({
          data: e,
          path: i.path,
          errorMaps: [
            i.common.contextualErrorMap,
            i.schemaErrorMap,
            qt(),
            dt
          ].filter((y) => !!y),
          issueData: {
            code: v.invalid_return_type,
            returnTypeError: d
          }
        });
      }
      const s = { errorMap: i.common.contextualErrorMap }, u = i.data;
      return this._def.returns instanceof ot ? oe(async (...e) => {
        const d = new le([]), y = await this._def.args.parseAsync(e, s).catch((S) => {
          throw d.addIssue(r(e, S)), d;
        }), T = await u(...y);
        return await this._def.returns._def.type.parseAsync(T, s).catch((S) => {
          throw d.addIssue(n(T, S)), d;
        });
      }) : oe((...e) => {
        const d = this._def.args.safeParse(e, s);
        if (!d.success)
          throw new le([r(e, d.error)]);
        const y = u(...d.data), T = this._def.returns.safeParse(y, s);
        if (!T.success)
          throw new le([n(y, T.error)]);
        return T.data;
      });
    }
    parameters() {
      return this._def.args;
    }
    returnType() {
      return this._def.returns;
    }
    args(...t) {
      return new Rt({
        ...this._def,
        args: Be.create(t).rest(ze.create())
      });
    }
    returns(t) {
      return new Rt({
        ...this._def,
        returns: t
      });
    }
    implement(t) {
      return this.parse(t);
    }
    strictImplement(t) {
      return this.parse(t);
    }
    static create(t, i, r) {
      return new Rt({
        args: t || Be.create([]).rest(ze.create()),
        returns: i || ze.create(),
        typeName: K.ZodFunction,
        ...D(r)
      });
    }
  }, bt = class extends P {
    get schema() {
      return this._def.getter();
    }
    _parse(t) {
      const { ctx: i } = this._processInputParams(t);
      return this._def.getter()._parse({ data: i.data, path: i.path, parent: i });
    }
  };
  bt.create = (t, i) => new bt({
    getter: t,
    typeName: K.ZodLazy,
    ...D(i)
  });
  var At = class extends P {
    _parse(t) {
      if (t.data !== this._def.value) {
        const i = this._getOrReturnCtx(t);
        return _(i, {
          received: i.data,
          code: v.invalid_literal,
          expected: this._def.value
        }), V;
      }
      return { status: "valid", value: t.data };
    }
    get value() {
      return this._def.value;
    }
  };
  At.create = (t, i) => new At({
    value: t,
    typeName: K.ZodLiteral,
    ...D(i)
  });
  function fi(t, i) {
    return new He({
      values: t,
      typeName: K.ZodEnum,
      ...D(i)
    });
  }
  var He = class extends P {
    _parse(t) {
      if (typeof t.data != "string") {
        const i = this._getOrReturnCtx(t), r = this._def.values;
        return _(i, {
          expected: k.joinValues(r),
          received: i.parsedType,
          code: v.invalid_type
        }), V;
      }
      if (this._def.values.indexOf(t.data) === -1) {
        const i = this._getOrReturnCtx(t), r = this._def.values;
        return _(i, {
          received: i.data,
          code: v.invalid_enum_value,
          options: r
        }), V;
      }
      return oe(t.data);
    }
    get options() {
      return this._def.values;
    }
    get enum() {
      const t = {};
      for (const i of this._def.values)
        t[i] = i;
      return t;
    }
    get Values() {
      const t = {};
      for (const i of this._def.values)
        t[i] = i;
      return t;
    }
    get Enum() {
      const t = {};
      for (const i of this._def.values)
        t[i] = i;
      return t;
    }
    extract(t) {
      return He.create(t);
    }
    exclude(t) {
      return He.create(this.options.filter((i) => !t.includes(i)));
    }
  };
  He.create = fi;
  var Tt = class extends P {
    _parse(t) {
      const i = k.getValidEnumValues(this._def.values), r = this._getOrReturnCtx(t);
      if (r.parsedType !== L.string && r.parsedType !== L.number) {
        const n = k.objectValues(i);
        return _(r, {
          expected: k.joinValues(n),
          received: r.parsedType,
          code: v.invalid_type
        }), V;
      }
      if (i.indexOf(t.data) === -1) {
        const n = k.objectValues(i);
        return _(r, {
          received: r.data,
          code: v.invalid_enum_value,
          options: n
        }), V;
      }
      return oe(t.data);
    }
    get enum() {
      return this._def.values;
    }
  };
  Tt.create = (t, i) => new Tt({
    values: t,
    typeName: K.ZodNativeEnum,
    ...D(i)
  });
  var ot = class extends P {
    unwrap() {
      return this._def.type;
    }
    _parse(t) {
      const { ctx: i } = this._processInputParams(t);
      if (i.parsedType !== L.promise && i.common.async === !1)
        return _(i, {
          code: v.invalid_type,
          expected: L.promise,
          received: i.parsedType
        }), V;
      const r = i.parsedType === L.promise ? i.data : Promise.resolve(i.data);
      return oe(r.then((n) => this._def.type.parseAsync(n, {
        path: i.path,
        errorMap: i.common.contextualErrorMap
      })));
    }
  };
  ot.create = (t, i) => new ot({
    type: t,
    typeName: K.ZodPromise,
    ...D(i)
  });
  var Re = class extends P {
    innerType() {
      return this._def.schema;
    }
    sourceType() {
      return this._def.schema._def.typeName === K.ZodEffects ? this._def.schema.sourceType() : this._def.schema;
    }
    _parse(t) {
      const { status: i, ctx: r } = this._processInputParams(t), n = this._def.effect || null;
      if (n.type === "preprocess") {
        const u = n.transform(r.data);
        return r.common.async ? Promise.resolve(u).then((e) => this._def.schema._parseAsync({
          data: e,
          path: r.path,
          parent: r
        })) : this._def.schema._parseSync({
          data: u,
          path: r.path,
          parent: r
        });
      }
      const s = {
        addIssue: (u) => {
          _(r, u), u.fatal ? i.abort() : i.dirty();
        },
        get path() {
          return r.path;
        }
      };
      if (s.addIssue = s.addIssue.bind(s), n.type === "refinement") {
        const u = (e) => {
          const d = n.refinement(e, s);
          if (r.common.async)
            return Promise.resolve(d);
          if (d instanceof Promise)
            throw new Error("Async refinement encountered during synchronous parse operation. Use .parseAsync instead.");
          return e;
        };
        if (r.common.async === !1) {
          const e = this._def.schema._parseSync({
            data: r.data,
            path: r.path,
            parent: r
          });
          return e.status === "aborted" ? V : (e.status === "dirty" && i.dirty(), u(e.value), { status: i.value, value: e.value });
        } else
          return this._def.schema._parseAsync({ data: r.data, path: r.path, parent: r }).then((e) => e.status === "aborted" ? V : (e.status === "dirty" && i.dirty(), u(e.value).then(() => ({ status: i.value, value: e.value }))));
      }
      if (n.type === "transform")
        if (r.common.async === !1) {
          const u = this._def.schema._parseSync({
            data: r.data,
            path: r.path,
            parent: r
          });
          if (!$t(u))
            return u;
          const e = n.transform(u.value, s);
          if (e instanceof Promise)
            throw new Error("Asynchronous transform encountered during synchronous parse operation. Use .parseAsync instead.");
          return { status: i.value, value: e };
        } else
          return this._def.schema._parseAsync({ data: r.data, path: r.path, parent: r }).then((u) => $t(u) ? Promise.resolve(n.transform(u.value, s)).then((e) => ({ status: i.value, value: e })) : u);
      k.assertNever(n);
    }
  };
  Re.create = (t, i, r) => new Re({
    schema: t,
    typeName: K.ZodEffects,
    effect: i,
    ...D(r)
  }), Re.createWithPreprocess = (t, i, r) => new Re({
    schema: i,
    effect: { type: "preprocess", transform: t },
    typeName: K.ZodEffects,
    ...D(r)
  });
  var ke = class extends P {
    _parse(t) {
      return this._getType(t) === L.undefined ? oe(void 0) : this._def.innerType._parse(t);
    }
    unwrap() {
      return this._def.innerType;
    }
  };
  ke.create = (t, i) => new ke({
    innerType: t,
    typeName: K.ZodOptional,
    ...D(i)
  });
  var Ze = class extends P {
    _parse(t) {
      return this._getType(t) === L.null ? oe(null) : this._def.innerType._parse(t);
    }
    unwrap() {
      return this._def.innerType;
    }
  };
  Ze.create = (t, i) => new Ze({
    innerType: t,
    typeName: K.ZodNullable,
    ...D(i)
  });
  var vt = class extends P {
    _parse(t) {
      const { ctx: i } = this._processInputParams(t);
      let r = i.data;
      return i.parsedType === L.undefined && (r = this._def.defaultValue()), this._def.innerType._parse({
        data: r,
        path: i.path,
        parent: i
      });
    }
    removeDefault() {
      return this._def.innerType;
    }
  };
  vt.create = (t, i) => new vt({
    innerType: t,
    typeName: K.ZodDefault,
    defaultValue: typeof i.default == "function" ? i.default : () => i.default,
    ...D(i)
  });
  var Wt = class extends P {
    _parse(t) {
      const { ctx: i } = this._processInputParams(t), r = {
        ...i,
        common: {
          ...i.common,
          issues: []
        }
      }, n = this._def.innerType._parse({
        data: r.data,
        path: r.path,
        parent: {
          ...r
        }
      });
      return Gt(n) ? n.then((s) => ({
        status: "valid",
        value: s.status === "valid" ? s.value : this._def.catchValue({
          get error() {
            return new le(r.common.issues);
          },
          input: r.data
        })
      })) : {
        status: "valid",
        value: n.status === "valid" ? n.value : this._def.catchValue({
          get error() {
            return new le(r.common.issues);
          },
          input: r.data
        })
      };
    }
    removeCatch() {
      return this._def.innerType;
    }
  };
  Wt.create = (t, i) => new Wt({
    innerType: t,
    typeName: K.ZodCatch,
    catchValue: typeof i.catch == "function" ? i.catch : () => i.catch,
    ...D(i)
  });
  var Jt = class extends P {
    _parse(t) {
      if (this._getType(t) !== L.nan) {
        const r = this._getOrReturnCtx(t);
        return _(r, {
          code: v.invalid_type,
          expected: L.nan,
          received: r.parsedType
        }), V;
      }
      return { status: "valid", value: t.data };
    }
  };
  Jt.create = (t) => new Jt({
    typeName: K.ZodNaN,
    ...D(t)
  });
  var dl = Symbol("zod_brand"), ci = class extends P {
    _parse(t) {
      const { ctx: i } = this._processInputParams(t), r = i.data;
      return this._def.type._parse({
        data: r,
        path: i.path,
        parent: i
      });
    }
    unwrap() {
      return this._def.type;
    }
  }, Qt = class extends P {
    _parse(t) {
      const { status: i, ctx: r } = this._processInputParams(t);
      if (r.common.async)
        return (async () => {
          const s = await this._def.in._parseAsync({
            data: r.data,
            path: r.path,
            parent: r
          });
          return s.status === "aborted" ? V : s.status === "dirty" ? (i.dirty(), ui(s.value)) : this._def.out._parseAsync({
            data: s.value,
            path: r.path,
            parent: r
          });
        })();
      {
        const n = this._def.in._parseSync({
          data: r.data,
          path: r.path,
          parent: r
        });
        return n.status === "aborted" ? V : n.status === "dirty" ? (i.dirty(), {
          status: "dirty",
          value: n.value
        }) : this._def.out._parseSync({
          data: n.value,
          path: r.path,
          parent: r
        });
      }
    }
    static create(t, i) {
      return new Qt({
        in: t,
        out: i,
        typeName: K.ZodPipeline
      });
    }
  }, di = (t, i = {}, r) => t ? nt.create().superRefine((n, s) => {
    var u, e;
    if (!t(n)) {
      const d = typeof i == "function" ? i(n) : typeof i == "string" ? { message: i } : i, y = (e = (u = d.fatal) !== null && u !== void 0 ? u : r) !== null && e !== void 0 ? e : !0, T = typeof d == "string" ? { message: d } : d;
      s.addIssue({ code: "custom", ...T, fatal: y });
    }
  }) : nt.create(), ml = {
    object: Z.lazycreate
  }, K;
  (function(t) {
    t.ZodString = "ZodString", t.ZodNumber = "ZodNumber", t.ZodNaN = "ZodNaN", t.ZodBigInt = "ZodBigInt", t.ZodBoolean = "ZodBoolean", t.ZodDate = "ZodDate", t.ZodSymbol = "ZodSymbol", t.ZodUndefined = "ZodUndefined", t.ZodNull = "ZodNull", t.ZodAny = "ZodAny", t.ZodUnknown = "ZodUnknown", t.ZodNever = "ZodNever", t.ZodVoid = "ZodVoid", t.ZodArray = "ZodArray", t.ZodObject = "ZodObject", t.ZodUnion = "ZodUnion", t.ZodDiscriminatedUnion = "ZodDiscriminatedUnion", t.ZodIntersection = "ZodIntersection", t.ZodTuple = "ZodTuple", t.ZodRecord = "ZodRecord", t.ZodMap = "ZodMap", t.ZodSet = "ZodSet", t.ZodFunction = "ZodFunction", t.ZodLazy = "ZodLazy", t.ZodLiteral = "ZodLiteral", t.ZodEnum = "ZodEnum", t.ZodEffects = "ZodEffects", t.ZodNativeEnum = "ZodNativeEnum", t.ZodOptional = "ZodOptional", t.ZodNullable = "ZodNullable", t.ZodDefault = "ZodDefault", t.ZodCatch = "ZodCatch", t.ZodPromise = "ZodPromise", t.ZodBranded = "ZodBranded", t.ZodPipeline = "ZodPipeline";
  })(K || (K = {}));
  var hl = (t, i = {
    message: `Input not instance of ${t.name}`
  }) => di((r) => r instanceof t, i), mi = Le.create, hi = Oe.create, yl = Jt.create, El = Xe.create, yi = mt.create, gl = it.create, Rl = Ot.create, bl = ht.create, Al = yt.create, Tl = nt.create, vl = ze.create, wl = xe.create, Ll = Xt.create, Cl = Ce.create, _l = Z.create, Sl = Z.strictCreate, xl = Et.create, Bl = kr.create, kl = gt.create, Kl = Be.create, Ul = Ht.create, Vl = Zt.create, Dl = at.create, Nl = Rt.create, Pl = bt.create, Il = At.create, jl = He.create, Fl = Tt.create, ql = ot.create, Ei = Re.create, Ml = ke.create, $l = Ze.create, Gl = Re.createWithPreprocess, Ol = Qt.create, Xl = () => mi().optional(), zl = () => hi().optional(), Hl = () => yi().optional(), Zl = {
    string: (t) => Le.create({ ...t, coerce: !0 }),
    number: (t) => Oe.create({ ...t, coerce: !0 }),
    boolean: (t) => mt.create({
      ...t,
      coerce: !0
    }),
    bigint: (t) => Xe.create({ ...t, coerce: !0 }),
    date: (t) => it.create({ ...t, coerce: !0 })
  }, Wl = V, m = /* @__PURE__ */ Object.freeze({
    __proto__: null,
    defaultErrorMap: dt,
    setErrorMap: el,
    getErrorMap: qt,
    makeIssue: Mt,
    EMPTY_PATH: tl,
    addIssueToContext: _,
    ParseStatus: ae,
    INVALID: V,
    DIRTY: ui,
    OK: oe,
    isAborted: xr,
    isDirty: Br,
    isValid: $t,
    isAsync: Gt,
    get util() {
      return k;
    },
    get objectUtil() {
      return ue;
    },
    ZodParsedType: L,
    getParsedType: ge,
    ZodType: P,
    ZodString: Le,
    ZodNumber: Oe,
    ZodBigInt: Xe,
    ZodBoolean: mt,
    ZodDate: it,
    ZodSymbol: Ot,
    ZodUndefined: ht,
    ZodNull: yt,
    ZodAny: nt,
    ZodUnknown: ze,
    ZodNever: xe,
    ZodVoid: Xt,
    ZodArray: Ce,
    ZodObject: Z,
    ZodUnion: Et,
    ZodDiscriminatedUnion: kr,
    ZodIntersection: gt,
    ZodTuple: Be,
    ZodRecord: Ht,
    ZodMap: Zt,
    ZodSet: at,
    ZodFunction: Rt,
    ZodLazy: bt,
    ZodLiteral: At,
    ZodEnum: He,
    ZodNativeEnum: Tt,
    ZodPromise: ot,
    ZodEffects: Re,
    ZodTransformer: Re,
    ZodOptional: ke,
    ZodNullable: Ze,
    ZodDefault: vt,
    ZodCatch: Wt,
    ZodNaN: Jt,
    BRAND: dl,
    ZodBranded: ci,
    ZodPipeline: Qt,
    custom: di,
    Schema: P,
    ZodSchema: P,
    late: ml,
    get ZodFirstPartyTypeKind() {
      return K;
    },
    coerce: Zl,
    any: Tl,
    array: Cl,
    bigint: El,
    boolean: yi,
    date: gl,
    discriminatedUnion: Bl,
    effect: Ei,
    enum: jl,
    function: Nl,
    instanceof: hl,
    intersection: kl,
    lazy: Pl,
    literal: Il,
    map: Vl,
    nan: yl,
    nativeEnum: Fl,
    never: wl,
    null: Al,
    nullable: $l,
    number: hi,
    object: _l,
    oboolean: Hl,
    onumber: zl,
    optional: Ml,
    ostring: Xl,
    pipeline: Ol,
    preprocess: Gl,
    promise: ql,
    record: Ul,
    set: Dl,
    strictObject: Sl,
    string: mi,
    symbol: Rl,
    transformer: Ei,
    tuple: Kl,
    undefined: bl,
    union: xl,
    unknown: vl,
    void: Ll,
    NEVER: Wl,
    ZodIssueCode: v,
    quotelessJson: Ft,
    ZodError: le
  }), Yt = {};
  f(Yt, {
    assure: () => Ql,
    is: () => Jl,
    isObject: () => Yl
  });
  var Jl = (t, i) => i.safeParse(t).success, Ql = (t, i) => t.parse(i), Yl = (t) => typeof t == "object" && t !== null, ef = Ri, gi = 128, tf = 127, rf = ~tf, nf = Math.pow(2, 31);
  function Ri(t, i, r) {
    i = i || [], r = r || 0;
    for (var n = r; t >= nf; )
      i[r++] = t & 255 | gi, t /= 128;
    for (; t & rf; )
      i[r++] = t & 255 | gi, t >>>= 7;
    return i[r] = t | 0, Ri.bytes = r - n + 1, i;
  }
  var sf = Ur, af = 128, bi = 127;
  function Ur(t, n) {
    var r = 0, n = n || 0, s = 0, u = n, e, d = t.length;
    do {
      if (u >= d)
        throw Ur.bytes = 0, new RangeError("Could not decode varint");
      e = t[u++], r += s < 28 ? (e & bi) << s : (e & bi) * Math.pow(2, s), s += 7;
    } while (e >= af);
    return Ur.bytes = u - n, r;
  }
  var of = Math.pow(2, 7), pf = Math.pow(2, 14), uf = Math.pow(2, 21), lf = Math.pow(2, 28), ff = Math.pow(2, 35), cf = Math.pow(2, 42), df = Math.pow(2, 49), mf = Math.pow(2, 56), hf = Math.pow(2, 63), yf = function(t) {
    return t < of ? 1 : t < pf ? 2 : t < uf ? 3 : t < lf ? 4 : t < ff ? 5 : t < cf ? 6 : t < df ? 7 : t < mf ? 8 : t < hf ? 9 : 10;
  }, Ef = {
    encode: ef,
    decode: sf,
    encodingLength: yf
  }, gf = Ef, er = gf, Vr = (t, i = 0) => [
    er.decode(t, i),
    er.decode.bytes
  ], tr = (t, i, r = 0) => (er.encode(t, i, r), i), rr = (t) => er.encodingLength(t), Rf = (t, i) => {
    if (t === i)
      return !0;
    if (t.byteLength !== i.byteLength)
      return !1;
    for (let r = 0; r < t.byteLength; r++)
      if (t[r] !== i[r])
        return !1;
    return !0;
  }, ir = (t) => {
    if (t instanceof Uint8Array && t.constructor.name === "Uint8Array")
      return t;
    if (t instanceof ArrayBuffer)
      return new Uint8Array(t);
    if (ArrayBuffer.isView(t))
      return new Uint8Array(t.buffer, t.byteOffset, t.byteLength);
    throw new Error("Unknown type, must be binary type");
  }, bf = (t) => new TextEncoder().encode(t), Af = (t) => new TextDecoder().decode(t), nr = (t, i) => {
    const r = i.byteLength, n = rr(t), s = n + rr(r), u = new Uint8Array(s + r);
    return tr(t, u, 0), tr(r, u, n), u.set(i, s), new Dr(t, r, i, u);
  }, Tf = (t) => {
    const i = ir(t), [r, n] = Vr(i), [s, u] = Vr(i.subarray(n)), e = i.subarray(n + u);
    if (e.byteLength !== s)
      throw new Error("Incorrect length");
    return new Dr(r, s, e, i);
  }, vf = (t, i) => t === i ? !0 : t.code === i.code && t.size === i.size && Rf(t.bytes, i.bytes), Dr = class {
    constructor(t, i, r, n) {
      this.code = t, this.size = i, this.digest = r, this.bytes = n;
    }
  }, Ai = {};
  f(Ai, {
    base58btc: () => Ke,
    base58flickr: () => Vf
  });
  function wf(t, i) {
    if (t.length >= 255)
      throw new TypeError("Alphabet too long");
    for (var r = new Uint8Array(256), n = 0; n < r.length; n++)
      r[n] = 255;
    for (var s = 0; s < t.length; s++) {
      var u = t.charAt(s), e = u.charCodeAt(0);
      if (r[e] !== 255)
        throw new TypeError(u + " is ambiguous");
      r[e] = s;
    }
    var d = t.length, y = t.charAt(0), T = Math.log(d) / Math.log(256), C = Math.log(256) / Math.log(d);
    function S(I) {
      if (I instanceof Uint8Array || (ArrayBuffer.isView(I) ? I = new Uint8Array(I.buffer, I.byteOffset, I.byteLength) : Array.isArray(I) && (I = Uint8Array.from(I))), !(I instanceof Uint8Array))
        throw new TypeError("Expected Uint8Array");
      if (I.length === 0)
        return "";
      for (var z = 0, X = 0, G = 0, fe = I.length; G !== fe && I[G] === 0; )
        G++, z++;
      for (var pe = (fe - G) * C + 1 >>> 0, q = new Uint8Array(pe); G !== fe; ) {
        for (var ie = I[G], Fe = 0, Ae = pe - 1; (ie !== 0 || Fe < X) && Ae !== -1; Ae--, Fe++)
          ie += 256 * q[Ae] >>> 0, q[Ae] = ie % d >>> 0, ie = ie / d >>> 0;
        if (ie !== 0)
          throw new Error("Non-zero carry");
        X = Fe, G++;
      }
      for (var Ne = pe - X; Ne !== pe && q[Ne] === 0; )
        Ne++;
      for (var mr = y.repeat(z); Ne < pe; ++Ne)
        mr += t.charAt(q[Ne]);
      return mr;
    }
    function O(I) {
      if (typeof I != "string")
        throw new TypeError("Expected String");
      if (I.length === 0)
        return new Uint8Array();
      var z = 0;
      if (I[z] !== " ") {
        for (var X = 0, G = 0; I[z] === y; )
          X++, z++;
        for (var fe = (I.length - z) * T + 1 >>> 0, pe = new Uint8Array(fe); I[z]; ) {
          var q = r[I.charCodeAt(z)];
          if (q === 255)
            return;
          for (var ie = 0, Fe = fe - 1; (q !== 0 || ie < G) && Fe !== -1; Fe--, ie++)
            q += d * pe[Fe] >>> 0, pe[Fe] = q % 256 >>> 0, q = q / 256 >>> 0;
          if (q !== 0)
            throw new Error("Non-zero carry");
          G = ie, z++;
        }
        if (I[z] !== " ") {
          for (var Ae = fe - G; Ae !== fe && pe[Ae] === 0; )
            Ae++;
          for (var Ne = new Uint8Array(X + (fe - Ae)), mr = X; Ae !== fe; )
            Ne[mr++] = pe[Ae++];
          return Ne;
        }
      }
    }
    function Q(I) {
      var z = O(I);
      if (z)
        return z;
      throw new Error(`Non-${i} character`);
    }
    return {
      encode: S,
      decodeUnsafe: O,
      decode: Q
    };
  }
  var Lf = wf, Cf = Lf, _f = Cf, Sf = class {
    constructor(t, i, r) {
      this.name = t, this.prefix = i, this.baseEncode = r;
    }
    encode(t) {
      if (t instanceof Uint8Array)
        return `${this.prefix}${this.baseEncode(t)}`;
      throw Error("Unknown type, must be binary type");
    }
  }, xf = class {
    constructor(t, i, r) {
      if (this.name = t, this.prefix = i, i.codePointAt(0) === void 0)
        throw new Error("Invalid prefix character");
      this.prefixCodePoint = i.codePointAt(0), this.baseDecode = r;
    }
    decode(t) {
      if (typeof t == "string") {
        if (t.codePointAt(0) !== this.prefixCodePoint)
          throw Error(`Unable to decode multibase string ${JSON.stringify(t)}, ${this.name} decoder only supports inputs prefixed with ${this.prefix}`);
        return this.baseDecode(t.slice(this.prefix.length));
      } else
        throw Error("Can only multibase decode strings");
    }
    or(t) {
      return Ti(this, t);
    }
  }, Bf = class {
    constructor(t) {
      this.decoders = t;
    }
    or(t) {
      return Ti(this, t);
    }
    decode(t) {
      const i = t[0], r = this.decoders[i];
      if (r)
        return r.decode(t);
      throw RangeError(`Unable to decode multibase string ${JSON.stringify(t)}, only inputs prefixed with ${Object.keys(this.decoders)} are supported`);
    }
  }, Ti = (t, i) => new Bf({
    ...t.decoders || { [t.prefix]: t },
    ...i.decoders || { [i.prefix]: i }
  }), kf = class {
    constructor(t, i, r, n) {
      this.name = t, this.prefix = i, this.baseEncode = r, this.baseDecode = n, this.encoder = new Sf(t, i, r), this.decoder = new xf(t, i, n);
    }
    encode(t) {
      return this.encoder.encode(t);
    }
    decode(t) {
      return this.decoder.decode(t);
    }
  }, sr = ({ name: t, prefix: i, encode: r, decode: n }) => new kf(t, i, r, n), wt = ({ prefix: t, name: i, alphabet: r }) => {
    const { encode: n, decode: s } = _f(r, i);
    return sr({
      prefix: t,
      name: i,
      encode: n,
      decode: (u) => ir(s(u))
    });
  }, Kf = (t, i, r, n) => {
    const s = {};
    for (let C = 0; C < i.length; ++C)
      s[i[C]] = C;
    let u = t.length;
    for (; t[u - 1] === "="; )
      --u;
    const e = new Uint8Array(u * r / 8 | 0);
    let d = 0, y = 0, T = 0;
    for (let C = 0; C < u; ++C) {
      const S = s[t[C]];
      if (S === void 0)
        throw new SyntaxError(`Non-${n} character`);
      y = y << r | S, d += r, d >= 8 && (d -= 8, e[T++] = 255 & y >> d);
    }
    if (d >= r || 255 & y << 8 - d)
      throw new SyntaxError("Unexpected end of data");
    return e;
  }, Uf = (t, i, r) => {
    const n = i[i.length - 1] === "=", s = (1 << r) - 1;
    let u = "", e = 0, d = 0;
    for (let y = 0; y < t.length; ++y)
      for (d = d << 8 | t[y], e += 8; e > r; )
        e -= r, u += i[s & d >> e];
    if (e && (u += i[s & d << r - e]), n)
      for (; u.length * r & 7; )
        u += "=";
    return u;
  }, te = ({ name: t, prefix: i, bitsPerChar: r, alphabet: n }) => sr({
    prefix: i,
    name: t,
    encode(s) {
      return Uf(s, n, r);
    },
    decode(s) {
      return Kf(s, n, r, t);
    }
  }), Ke = wt({
    name: "base58btc",
    prefix: "z",
    alphabet: "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz"
  }), Vf = wt({
    name: "base58flickr",
    prefix: "Z",
    alphabet: "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ"
  }), vi = {};
  f(vi, {
    base32: () => Lt,
    base32hex: () => If,
    base32hexpad: () => Ff,
    base32hexpadupper: () => qf,
    base32hexupper: () => jf,
    base32pad: () => Nf,
    base32padupper: () => Pf,
    base32upper: () => Df,
    base32z: () => Mf
  });
  var Lt = te({
    prefix: "b",
    name: "base32",
    alphabet: "abcdefghijklmnopqrstuvwxyz234567",
    bitsPerChar: 5
  }), Df = te({
    prefix: "B",
    name: "base32upper",
    alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567",
    bitsPerChar: 5
  }), Nf = te({
    prefix: "c",
    name: "base32pad",
    alphabet: "abcdefghijklmnopqrstuvwxyz234567=",
    bitsPerChar: 5
  }), Pf = te({
    prefix: "C",
    name: "base32padupper",
    alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567=",
    bitsPerChar: 5
  }), If = te({
    prefix: "v",
    name: "base32hex",
    alphabet: "0123456789abcdefghijklmnopqrstuv",
    bitsPerChar: 5
  }), jf = te({
    prefix: "V",
    name: "base32hexupper",
    alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUV",
    bitsPerChar: 5
  }), Ff = te({
    prefix: "t",
    name: "base32hexpad",
    alphabet: "0123456789abcdefghijklmnopqrstuv=",
    bitsPerChar: 5
  }), qf = te({
    prefix: "T",
    name: "base32hexpadupper",
    alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUV=",
    bitsPerChar: 5
  }), Mf = te({
    prefix: "h",
    name: "base32z",
    alphabet: "ybndrfg8ejkmcpqxot1uwisza345h769",
    bitsPerChar: 5
  }), H = class {
    constructor(t, i, r, n) {
      this.code = i, this.version = t, this.multihash = r, this.bytes = n, this.byteOffset = n.byteOffset, this.byteLength = n.byteLength, this.asCID = this, this._baseCache = /* @__PURE__ */ new Map(), Object.defineProperties(this, {
        byteOffset: or,
        byteLength: or,
        code: ar,
        version: ar,
        multihash: ar,
        bytes: ar,
        _baseCache: or,
        asCID: or
      });
    }
    toV0() {
      switch (this.version) {
        case 0:
          return this;
        default: {
          const { code: t, multihash: i } = this;
          if (t !== Ct)
            throw new Error("Cannot convert a non dag-pb CID to CIDv0");
          if (i.code !== Xf)
            throw new Error("Cannot convert non sha2-256 multihash CID to CIDv0");
          return H.createV0(i);
        }
      }
    }
    toV1() {
      switch (this.version) {
        case 0: {
          const { code: t, digest: i } = this.multihash, r = nr(t, i);
          return H.createV1(this.code, r);
        }
        case 1:
          return this;
        default:
          throw Error(`Can not convert CID version ${this.version} to version 0. This is a bug please report`);
      }
    }
    equals(t) {
      return t && this.code === t.code && this.version === t.version && vf(this.multihash, t.multihash);
    }
    toString(t) {
      const { bytes: i, version: r, _baseCache: n } = this;
      switch (r) {
        case 0:
          return Gf(i, n, t || Ke.encoder);
        default:
          return Of(i, n, t || Lt.encoder);
      }
    }
    toJSON() {
      return {
        code: this.code,
        version: this.version,
        hash: this.multihash.bytes
      };
    }
    get [Symbol.toStringTag]() {
      return "CID";
    }
    [Symbol.for("nodejs.util.inspect.custom")]() {
      return "CID(" + this.toString() + ")";
    }
    static isCID(t) {
      return Hf(/^0\.0/, Zf), !!(t && (t[Li] || t.asCID === t));
    }
    get toBaseEncodedString() {
      throw new Error("Deprecated, use .toString()");
    }
    get codec() {
      throw new Error('"codec" property is deprecated, use integer "code" property instead');
    }
    get buffer() {
      throw new Error("Deprecated .buffer property, use .bytes to get Uint8Array instead");
    }
    get multibaseName() {
      throw new Error('"multibaseName" property is deprecated');
    }
    get prefix() {
      throw new Error('"prefix" property is deprecated');
    }
    static asCID(t) {
      if (t instanceof H)
        return t;
      if (t != null && t.asCID === t) {
        const { version: i, code: r, multihash: n, bytes: s } = t;
        return new H(i, r, n, s || wi(i, r, n.bytes));
      } else if (t != null && t[Li] === !0) {
        const { version: i, multihash: r, code: n } = t, s = Tf(r);
        return H.create(i, n, s);
      } else
        return null;
    }
    static create(t, i, r) {
      if (typeof i != "number")
        throw new Error("String codecs are no longer supported");
      switch (t) {
        case 0: {
          if (i !== Ct)
            throw new Error(`Version 0 CID must use dag-pb (code: ${Ct}) block encoding`);
          return new H(t, i, r, r.bytes);
        }
        case 1: {
          const n = wi(t, i, r.bytes);
          return new H(t, i, r, n);
        }
        default:
          throw new Error("Invalid version");
      }
    }
    static createV0(t) {
      return H.create(0, Ct, t);
    }
    static createV1(t, i) {
      return H.create(1, t, i);
    }
    static decode(t) {
      const [i, r] = H.decodeFirst(t);
      if (r.length)
        throw new Error("Incorrect length");
      return i;
    }
    static decodeFirst(t) {
      const i = H.inspectBytes(t), r = i.size - i.multihashSize, n = ir(t.subarray(r, r + i.multihashSize));
      if (n.byteLength !== i.multihashSize)
        throw new Error("Incorrect length");
      const s = n.subarray(i.multihashSize - i.digestSize), u = new Dr(i.multihashCode, i.digestSize, s, n);
      return [
        i.version === 0 ? H.createV0(u) : H.createV1(i.codec, u),
        t.subarray(i.size)
      ];
    }
    static inspectBytes(t) {
      let i = 0;
      const r = () => {
        const [C, S] = Vr(t.subarray(i));
        return i += S, C;
      };
      let n = r(), s = Ct;
      if (n === 18 ? (n = 0, i = 0) : n === 1 && (s = r()), n !== 0 && n !== 1)
        throw new RangeError(`Invalid CID version ${n}`);
      const u = i, e = r(), d = r(), y = i + d, T = y - u;
      return {
        version: n,
        codec: s,
        multihashCode: e,
        digestSize: d,
        multihashSize: T,
        size: y
      };
    }
    static parse(t, i) {
      const [r, n] = $f(t, i), s = H.decode(n);
      return s._baseCache.set(r, t), s;
    }
  }, $f = (t, i) => {
    switch (t[0]) {
      case "Q": {
        const r = i || Ke;
        return [
          Ke.prefix,
          r.decode(`${Ke.prefix}${t}`)
        ];
      }
      case Ke.prefix: {
        const r = i || Ke;
        return [
          Ke.prefix,
          r.decode(t)
        ];
      }
      case Lt.prefix: {
        const r = i || Lt;
        return [
          Lt.prefix,
          r.decode(t)
        ];
      }
      default: {
        if (i == null)
          throw Error("To parse non base32 or base58btc encoded CID multibase decoder must be provided");
        return [
          t[0],
          i.decode(t)
        ];
      }
    }
  }, Gf = (t, i, r) => {
    const { prefix: n } = r;
    if (n !== Ke.prefix)
      throw Error(`Cannot string encode V0 in ${r.name} encoding`);
    const s = i.get(n);
    if (s == null) {
      const u = r.encode(t).slice(1);
      return i.set(n, u), u;
    } else
      return s;
  }, Of = (t, i, r) => {
    const { prefix: n } = r, s = i.get(n);
    if (s == null) {
      const u = r.encode(t);
      return i.set(n, u), u;
    } else
      return s;
  }, Ct = 112, Xf = 18, wi = (t, i, r) => {
    const n = rr(t), s = n + rr(i), u = new Uint8Array(s + r.byteLength);
    return tr(t, u, 0), tr(i, u, n), u.set(r, s), u;
  }, Li = Symbol.for("@ipld/js-cid/CID"), ar = {
    writable: !1,
    configurable: !1,
    enumerable: !0
  }, or = {
    writable: !1,
    enumerable: !1,
    configurable: !1
  }, zf = "0.0.0-dev", Hf = (t, i) => {
    if (t.test(zf))
      console.warn(i);
    else
      throw new Error(i);
  }, Zf = `CID.isCID(v) is deprecated and will be removed in the next major release.
Following code pattern:

if (CID.isCID(value)) {
  doSomethingWithCID(value)
}

Is replaced with:

const cid = CID.asCID(value)
if (cid) {
  // Make sure to use cid instead of value
  doSomethingWithCID(cid)
}
`, Ci = {};
  f(Ci, {
    identity: () => Wf
  });
  var Wf = sr({
    prefix: "\0",
    name: "identity",
    encode: (t) => Af(t),
    decode: (t) => bf(t)
  }), _i = {};
  f(_i, {
    base2: () => Jf
  });
  var Jf = te({
    prefix: "0",
    name: "base2",
    alphabet: "01",
    bitsPerChar: 1
  }), Si = {};
  f(Si, {
    base8: () => Qf
  });
  var Qf = te({
    prefix: "7",
    name: "base8",
    alphabet: "01234567",
    bitsPerChar: 3
  }), xi = {};
  f(xi, {
    base10: () => Yf
  });
  var Yf = wt({
    prefix: "9",
    name: "base10",
    alphabet: "0123456789"
  }), Bi = {};
  f(Bi, {
    base16: () => ec,
    base16upper: () => tc
  });
  var ec = te({
    prefix: "f",
    name: "base16",
    alphabet: "0123456789abcdef",
    bitsPerChar: 4
  }), tc = te({
    prefix: "F",
    name: "base16upper",
    alphabet: "0123456789ABCDEF",
    bitsPerChar: 4
  }), ki = {};
  f(ki, {
    base36: () => rc,
    base36upper: () => ic
  });
  var rc = wt({
    prefix: "k",
    name: "base36",
    alphabet: "0123456789abcdefghijklmnopqrstuvwxyz"
  }), ic = wt({
    prefix: "K",
    name: "base36upper",
    alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"
  }), Ki = {};
  f(Ki, {
    base64: () => nc,
    base64pad: () => sc,
    base64url: () => ac,
    base64urlpad: () => oc
  });
  var nc = te({
    prefix: "m",
    name: "base64",
    alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
    bitsPerChar: 6
  }), sc = te({
    prefix: "M",
    name: "base64pad",
    alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
    bitsPerChar: 6
  }), ac = te({
    prefix: "u",
    name: "base64url",
    alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_",
    bitsPerChar: 6
  }), oc = te({
    prefix: "U",
    name: "base64urlpad",
    alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_=",
    bitsPerChar: 6
  }), Ui = {};
  f(Ui, {
    base256emoji: () => cc
  });
  var Vi = Array.from("🚀🪐☄🛰🌌🌑🌒🌓🌔🌕🌖🌗🌘🌍🌏🌎🐉☀💻🖥💾💿😂❤😍🤣😊🙏💕😭😘👍😅👏😁🔥🥰💔💖💙😢🤔😆🙄💪😉☺👌🤗💜😔😎😇🌹🤦🎉💞✌✨🤷😱😌🌸🙌😋💗💚😏💛🙂💓🤩😄😀🖤😃💯🙈👇🎶😒🤭❣😜💋👀😪😑💥🙋😞😩😡🤪👊🥳😥🤤👉💃😳✋😚😝😴🌟😬🙃🍀🌷😻😓⭐✅🥺🌈😈🤘💦✔😣🏃💐☹🎊💘😠☝😕🌺🎂🌻😐🖕💝🙊😹🗣💫💀👑🎵🤞😛🔴😤🌼😫⚽🤙☕🏆🤫👈😮🙆🍻🍃🐶💁😲🌿🧡🎁⚡🌞🎈❌✊👋😰🤨😶🤝🚶💰🍓💢🤟🙁🚨💨🤬✈🎀🍺🤓😙💟🌱😖👶🥴▶➡❓💎💸⬇😨🌚🦋😷🕺⚠🙅😟😵👎🤲🤠🤧📌🔵💅🧐🐾🍒😗🤑🌊🤯🐷☎💧😯💆👆🎤🙇🍑❄🌴💣🐸💌📍🥀🤢👅💡💩👐📸👻🤐🤮🎼🥵🚩🍎🍊👼💍📣🥂"), pc = Vi.reduce((t, i, r) => (t[r] = i, t), []), uc = Vi.reduce((t, i, r) => (t[i.codePointAt(0)] = r, t), []);
  function lc(t) {
    return t.reduce((i, r) => (i += pc[r], i), "");
  }
  function fc(t) {
    const i = [];
    for (const r of t) {
      const n = uc[r.codePointAt(0)];
      if (n === void 0)
        throw new Error(`Non-base256emoji character: ${r}`);
      i.push(n);
    }
    return new Uint8Array(i);
  }
  var cc = sr({
    prefix: "🚀",
    name: "base256emoji",
    encode: lc,
    decode: fc
  }), Di = {};
  f(Di, {
    sha256: () => mc,
    sha512: () => hc
  });
  var Ni = ({ name: t, code: i, encode: r }) => new dc(t, i, r), dc = class {
    constructor(t, i, r) {
      this.name = t, this.code = i, this.encode = r;
    }
    digest(t) {
      if (t instanceof Uint8Array) {
        const i = this.encode(t);
        return i instanceof Uint8Array ? nr(this.code, i) : i.then((r) => nr(this.code, r));
      } else
        throw Error("Unknown type, must be binary type");
    }
  }, Pi = (t) => async (i) => new Uint8Array(await crypto.subtle.digest(t, i)), mc = Ni({
    name: "sha2-256",
    code: 18,
    encode: Pi("SHA-256")
  }), hc = Ni({
    name: "sha2-512",
    code: 19,
    encode: Pi("SHA-512")
  }), Ii = {};
  f(Ii, {
    identity: () => gc
  });
  var ji = 0, yc = "identity", Fi = ir, Ec = (t) => nr(ji, Fi(t)), gc = {
    code: ji,
    name: yc,
    encode: Fi,
    digest: Ec
  };
  new TextEncoder(), new TextDecoder();
  var qi = {
    ...Ci,
    ..._i,
    ...Si,
    ...xi,
    ...Bi,
    ...vi,
    ...ki,
    ...Ai,
    ...Ki,
    ...Ui
  };
  ({
    ...Di,
    ...Ii
  });
  function Mi(t, i, r, n) {
    return {
      name: t,
      prefix: i,
      encoder: {
        name: t,
        prefix: i,
        encode: r
      },
      decoder: { decode: n }
    };
  }
  var $i = Mi("utf8", "u", (t) => "u" + new TextDecoder("utf8").decode(t), (t) => new TextEncoder().encode(t.substring(1))), Nr = Mi("ascii", "a", (t) => {
    let i = "a";
    for (let r = 0; r < t.length; r++)
      i += String.fromCharCode(t[r]);
    return i;
  }, (t) => {
    t = t.substring(1);
    const i = new Uint8Array(t.length);
    for (let r = 0; r < t.length; r++)
      i[r] = t.charCodeAt(r);
    return i;
  }), Rc = {
    utf8: $i,
    "utf-8": $i,
    hex: qi.base16,
    latin1: Nr,
    ascii: Nr,
    binary: Nr,
    ...qi
  }, Gi = Rc;
  function bc(t, i = "utf8") {
    const r = Gi[i];
    if (!r)
      throw new Error(`Unsupported encoding "${i}"`);
    return r.decoder.decode(`${r.prefix}${t}`);
  }
  function Ac(t, i = "utf8") {
    const r = Gi[i];
    if (!r)
      throw new Error(`Unsupported encoding "${i}"`);
    return r.encoder.encode(t).substring(1);
  }
  var Pr = (t) => {
    if (Array.isArray(t))
      return t.map((i) => Pr(i));
    if (t && typeof t == "object") {
      if (typeof t.$link == "string" && Object.keys(t).length === 1)
        return H.parse(t.$link);
      if (typeof t.$bytes == "string" && Object.keys(t).length === 1)
        return bc(t.$bytes, "base64");
      const i = {};
      for (const r of Object.keys(t))
        i[r] = Pr(t[r]);
      return i;
    }
    return t;
  }, pr = (t) => {
    if (Array.isArray(t))
      return t.map((i) => pr(i));
    if (t && typeof t == "object") {
      if (t instanceof Uint8Array)
        return {
          $bytes: Ac(t, "base64")
        };
      if (H.asCID(t))
        return {
          $link: t.toString()
        };
      const i = {};
      for (const r of Object.keys(t))
        i[r] = pr(t[r]);
      return i;
    }
    return t;
  }, Tc = m.any().refine((t) => H.asCID(t) !== null, {
    message: "Not a CID"
  }).transform((t) => H.asCID(t)), vc = {
    cid: Tc,
    bytes: m.instanceof(Uint8Array),
    string: m.string(),
    array: m.array(m.unknown()),
    map: m.record(m.string(), m.unknown()),
    unknown: m.unknown()
  }, wc = j(tt()), Oi = (t) => new TextEncoder().encode(t).byteLength, Ir = (t) => new wc.default().countGraphemes(t), Lc = (t) => {
    const i = t.match(Xi);
    if (!i?.groups)
      return null;
    const r = i.groups;
    return {
      grandfathered: r.grandfathered,
      language: r.language,
      extlang: r.extlang,
      script: r.script,
      region: r.region,
      variant: r.variant,
      extension: r.extension,
      privateUse: r.privateUseA || r.privateUseB
    };
  }, Cc = (t) => Xi.test(t), Xi = /^((?<grandfathered>(en-GB-oed|i-ami|i-bnn|i-default|i-enochian|i-hak|i-klingon|i-lux|i-mingo|i-navajo|i-pwn|i-tao|i-tay|i-tsu|sgn-BE-FR|sgn-BE-NL|sgn-CH-DE)|(art-lojban|cel-gaulish|no-bok|no-nyn|zh-guoyu|zh-hakka|zh-min|zh-min-nan|zh-xiang))|((?<language>([A-Za-z]{2,3}(-(?<extlang>[A-Za-z]{3}(-[A-Za-z]{3}){0,2}))?)|[A-Za-z]{4}|[A-Za-z]{5,8})(-(?<script>[A-Za-z]{4}))?(-(?<region>[A-Za-z]{2}|[0-9]{3}))?(-(?<variant>[A-Za-z0-9]{5,8}|[0-9][A-Za-z0-9]{3}))*(-(?<extension>[0-9A-WY-Za-wy-z](-[A-Za-z0-9]{2,8})+))*(-(?<privateUseA>x(-[A-Za-z0-9]{1,8})+))?)|(?<privateUseB>x(-[A-Za-z0-9]{1,8})+))$/, _c = (t) => Vc.safeParse(t).success, Sc = (t) => {
    const i = t.id;
    if (typeof i != "string")
      throw new Error("No `id` on document");
    return i;
  }, xc = (t) => Bc(t, {
    id: "#atproto_pds",
    type: "AtprotoPersonalDataServer"
  }), Bc = (t, i) => {
    const r = Sc(t);
    let n = t.service;
    if (!n || typeof n != "object")
      return;
    Array.isArray(n) || (n = [n]);
    const s = n.find((u) => u.id === i.id || u.id === `${r}${i.id}`);
    if (s && s.type === i.type && typeof s.serviceEndpoint == "string")
      return kc(s.serviceEndpoint);
  }, kc = (t) => {
    let i;
    try {
      i = new URL(t);
    } catch {
      return;
    }
    if (["http:", "https:"].includes(i.protocol))
      return i.hostname ? t : void 0;
  }, Kc = m.object({
    id: m.string(),
    type: m.string(),
    controller: m.string(),
    publicKeyMultibase: m.string().optional()
  }), Uc = m.object({
    id: m.string(),
    type: m.string(),
    serviceEndpoint: m.union([m.string(), m.record(m.unknown())])
  }), Vc = m.object({
    id: m.string(),
    alsoKnownAs: m.array(m.string()).optional(),
    verificationMethod: m.array(Kc).optional(),
    service: m.array(Uc).optional()
  }), Dc = j(je());
  function Nc(t, i) {
    try {
      if (!(0, Dc.isValidISODateString)(i))
        throw new Error();
    } catch {
      return {
        success: !1,
        error: new U(`${t} must be an valid atproto datetime (both RFC-3339 and ISO-8601)`)
      };
    }
    return { success: !0, value: i };
  }
  function Pc(t, i) {
    return i.match(/^\w+:(?:\/\/)?[^\s/][^\s]*$/) !== null ? { success: !0, value: i } : {
      success: !1,
      error: new U(`${t} must be a uri`)
    };
  }
  function Ic(t, i) {
    try {
      It(i);
    } catch {
      return {
        success: !1,
        error: new U(`${t} must be a valid at-uri`)
      };
    }
    return { success: !0, value: i };
  }
  function zi(t, i) {
    try {
      ct(i);
    } catch {
      return {
        success: !1,
        error: new U(`${t} must be a valid did`)
      };
    }
    return { success: !0, value: i };
  }
  function Hi(t, i) {
    try {
      rt(i);
    } catch {
      return {
        success: !1,
        error: new U(`${t} must be a valid handle`)
      };
    }
    return { success: !0, value: i };
  }
  function jc(t, i) {
    return !zi(t, i).success && !Hi(t, i).success ? {
      success: !1,
      error: new U(`${t} must be a valid did or a handle`)
    } : { success: !0, value: i };
  }
  function Fc(t, i) {
    try {
      Ge(i);
    } catch {
      return {
        success: !1,
        error: new U(`${t} must be a valid nsid`)
      };
    }
    return { success: !0, value: i };
  }
  function qc(t, i) {
    try {
      H.parse(i);
    } catch {
      return {
        success: !1,
        error: new U(`${t} must be a cid string`)
      };
    }
    return { success: !0, value: i };
  }
  function Mc(t, i) {
    return Cc(i) ? { success: !0, value: i } : {
      success: !1,
      error: new U(`${t} must be a well-formed BCP 47 language tag`)
    };
  }
  function $c(t, i, r, n) {
    switch (r.type) {
      case "boolean":
        return Zi(t, i, r, n);
      case "integer":
        return Wi(t, i, r, n);
      case "string":
        return Ji(t, i, r, n);
      case "bytes":
        return Qi(t, i, r, n);
      case "cid-link":
        return Yi(t, i, r, n);
      case "unknown":
        return en(t, i, r, n);
      default:
        return {
          success: !1,
          error: new U(`Unexpected lexicon type: ${r.type}`)
        };
    }
  }
  function Zi(t, i, r, n) {
    r = r;
    const s = typeof n;
    return s === "undefined" ? typeof r.default == "boolean" ? { success: !0, value: r.default } : {
      success: !1,
      error: new U(`${i} must be a boolean`)
    } : s !== "boolean" ? {
      success: !1,
      error: new U(`${i} must be a boolean`)
    } : typeof r.const == "boolean" && n !== r.const ? {
      success: !1,
      error: new U(`${i} must be ${r.const}`)
    } : { success: !0, value: n };
  }
  function Wi(t, i, r, n) {
    return r = r, typeof n === "undefined" ? typeof r.default == "number" ? { success: !0, value: r.default } : {
      success: !1,
      error: new U(`${i} must be an integer`)
    } : Number.isInteger(n) ? typeof r.const == "number" && n !== r.const ? {
      success: !1,
      error: new U(`${i} must be ${r.const}`)
    } : Array.isArray(r.enum) && !r.enum.includes(n) ? {
      success: !1,
      error: new U(`${i} must be one of (${r.enum.join("|")})`)
    } : typeof r.maximum == "number" && n > r.maximum ? {
      success: !1,
      error: new U(`${i} can not be greater than ${r.maximum}`)
    } : typeof r.minimum == "number" && n < r.minimum ? {
      success: !1,
      error: new U(`${i} can not be less than ${r.minimum}`)
    } : { success: !0, value: n } : {
      success: !1,
      error: new U(`${i} must be an integer`)
    };
  }
  function Ji(t, i, r, n) {
    if (r = r, typeof n > "u")
      return typeof r.default == "string" ? { success: !0, value: r.default } : {
        success: !1,
        error: new U(`${i} must be a string`)
      };
    if (typeof n != "string")
      return {
        success: !1,
        error: new U(`${i} must be a string`)
      };
    if (typeof r.const == "string" && n !== r.const)
      return {
        success: !1,
        error: new U(`${i} must be ${r.const}`)
      };
    if (Array.isArray(r.enum) && !r.enum.includes(n))
      return {
        success: !1,
        error: new U(`${i} must be one of (${r.enum.join("|")})`)
      };
    if (typeof r.maxLength == "number" && Oi(n) > r.maxLength)
      return {
        success: !1,
        error: new U(`${i} must not be longer than ${r.maxLength} characters`)
      };
    if (typeof r.minLength == "number" && Oi(n) < r.minLength)
      return {
        success: !1,
        error: new U(`${i} must not be shorter than ${r.minLength} characters`)
      };
    if (typeof r.maxGraphemes == "number" && Ir(n) > r.maxGraphemes)
      return {
        success: !1,
        error: new U(`${i} must not be longer than ${r.maxGraphemes} graphemes`)
      };
    if (typeof r.minGraphemes == "number" && Ir(n) < r.minGraphemes)
      return {
        success: !1,
        error: new U(`${i} must not be shorter than ${r.minGraphemes} graphemes`)
      };
    if (typeof r.format == "string")
      switch (r.format) {
        case "datetime":
          return Nc(i, n);
        case "uri":
          return Pc(i, n);
        case "at-uri":
          return Ic(i, n);
        case "did":
          return zi(i, n);
        case "handle":
          return Hi(i, n);
        case "at-identifier":
          return jc(i, n);
        case "nsid":
          return Fc(i, n);
        case "cid":
          return qc(i, n);
        case "language":
          return Mc(i, n);
      }
    return { success: !0, value: n };
  }
  function Qi(t, i, r, n) {
    return r = r, !n || !(n instanceof Uint8Array) ? {
      success: !1,
      error: new U(`${i} must be a byte array`)
    } : typeof r.maxLength == "number" && n.byteLength > r.maxLength ? {
      success: !1,
      error: new U(`${i} must not be larger than ${r.maxLength} bytes`)
    } : typeof r.minLength == "number" && n.byteLength < r.minLength ? {
      success: !1,
      error: new U(`${i} must not be smaller than ${r.minLength} bytes`)
    } : { success: !0, value: n };
  }
  function Yi(t, i, r, n) {
    return H.asCID(n) === null ? {
      success: !1,
      error: new U(`${i} must be a CID`)
    } : { success: !0, value: n };
  }
  function en(t, i, r, n) {
    return !n || typeof n != "object" ? {
      success: !1,
      error: new U(`${i} must be an object`)
    } : { success: !0, value: n };
  }
  var tn = m.object({
    $type: m.literal("blob"),
    ref: vc.cid,
    mimeType: m.string(),
    size: m.number()
  }).strict(), Gc = m.object({
    cid: m.string(),
    mimeType: m.string()
  }).strict(), rn = m.union([tn, Gc]), We = class {
    constructor(t, i, r, n) {
      this.ref = t, this.mimeType = i, this.size = r, this.original = n ?? {
        $type: "blob",
        ref: t,
        mimeType: i,
        size: r
      };
    }
    static asBlobRef(t) {
      return Yt.is(t, rn) ? We.fromJsonRef(t) : null;
    }
    static fromJsonRef(t) {
      return Yt.is(t, tn) ? new We(t.ref, t.mimeType, t.size) : new We(H.parse(t.cid), t.mimeType, -1, t);
    }
    ipld() {
      return {
        $type: "blob",
        ref: this.ref,
        mimeType: this.mimeType,
        size: this.size
      };
    }
    toJSON() {
      return pr(this.ipld());
    }
  };
  function Oc(t, i, r, n) {
    return !n || !(n instanceof We) ? {
      success: !1,
      error: new U(`${i} should be a blob ref`)
    } : { success: !0, value: n };
  }
  function Xc(t, i, r, n) {
    switch (r.type) {
      case "boolean":
        return Zi(t, i, r, n);
      case "integer":
        return Wi(t, i, r, n);
      case "string":
        return Ji(t, i, r, n);
      case "bytes":
        return Qi(t, i, r, n);
      case "cid-link":
        return Yi(t, i, r, n);
      case "unknown":
        return en(t, i, r, n);
      case "object":
        return _t(t, i, r, n);
      case "array":
        return nn(t, i, r, n);
      case "blob":
        return Oc(t, i, r, n);
      default:
        return {
          success: !1,
          error: new U(`Unexpected lexicon type: ${r.type}`)
        };
    }
  }
  function nn(t, i, r, n) {
    if (!Array.isArray(n))
      return {
        success: !1,
        error: new U(`${i} must be an array`)
      };
    if (typeof r.maxLength == "number" && n.length > r.maxLength)
      return {
        success: !1,
        error: new U(`${i} must not have more than ${r.maxLength} elements`)
      };
    if (typeof r.minLength == "number" && n.length < r.minLength)
      return {
        success: !1,
        error: new U(`${i} must not have fewer than ${r.minLength} elements`)
      };
    const s = r.items;
    for (let u = 0; u < n.length; u++) {
      const e = n[u], d = `${i}/${u}`, y = jr(t, d, s, e);
      if (!y.success)
        return y;
    }
    return { success: !0, value: n };
  }
  function _t(t, i, r, n) {
    if (r = r, !n || typeof n != "object")
      return {
        success: !1,
        error: new U(`${i} must be an object`)
      };
    const s = new Set(r.required), u = new Set(r.nullable);
    let e = n;
    if (typeof r.properties == "object")
      for (const d in r.properties) {
        if (n[d] === null && u.has(d))
          continue;
        const y = r.properties[d], T = `${i}/${d}`, C = jr(t, T, y, n[d]), S = C.success ? C.value : n[d], O = typeof S > "u";
        if (O && s.has(d))
          return {
            success: !1,
            error: new U(`${i} must have the property "${d}"`)
          };
        if (!O && !C.success)
          return C;
        S !== n[d] && (e === n && (e = { ...n }), e[d] = S);
      }
    return { success: !0, value: e };
  }
  function re(t, i) {
    if (t.split("#").length > 2)
      throw new Error("Uri can only have one hash segment");
    if (t.startsWith("lex:"))
      return t;
    if (t.startsWith("#")) {
      if (!i)
        throw new Error(`Unable to resolve uri without anchor: ${t}`);
      return `${i}${t}`;
    }
    return `lex:${t}`;
  }
  function jr(t, i, r, n, s = !1) {
    let u, e;
    if (r.type === "union") {
      if (!od(n))
        return {
          success: !1,
          error: new U(`${i} must be an object which includes the "$type" property`)
        };
      if (zc(r.refs, n.$type))
        e = sn(t, {
          type: "ref",
          ref: n.$type
        });
      else
        return r.closed ? {
          success: !1,
          error: new U(`${i} $type must be one of ${r.refs.join(", ")}`)
        } : { success: !0, value: n };
    } else
      e = sn(t, r);
    for (const d of e) {
      const y = s ? _t(t, i, d, n) : Xc(t, i, d, n);
      if (y.success)
        return y;
      u ?? (u = y.error);
    }
    return e.length > 1 ? {
      success: !1,
      error: new U(`${i} did not match any of the expected definitions`)
    } : { success: !1, error: u };
  }
  function Fr(t, i, r, n, s = !1) {
    const u = jr(t, i, r, n, s);
    if (!u.success)
      throw u.error;
    return u.value;
  }
  function sn(t, i) {
    return i.type === "ref" ? [t.getDefOrThrow(i.ref)] : i.type === "union" ? i.refs.map((r) => t.getDefOrThrow(r)).flat() : [i];
  }
  function an(t, i) {
    if (t.required !== void 0) {
      if (!Array.isArray(t.required)) {
        i.addIssue({
          code: m.ZodIssueCode.invalid_type,
          received: typeof t.required,
          expected: "array"
        });
        return;
      }
      if (t.properties === void 0) {
        t.required.length > 0 && i.addIssue({
          code: m.ZodIssueCode.custom,
          message: "Required fields defined but no properties defined"
        });
        return;
      }
      for (const r of t.required)
        t.properties[r] === void 0 && i.addIssue({
          code: m.ZodIssueCode.custom,
          message: `Required field "${r}" not defined`
        });
    }
  }
  var zc = (t, i) => {
    const r = re(i);
    return t.includes(r) ? !0 : r.endsWith("#main") ? t.includes(r.replace("#main", "")) : t.includes(r + "#main");
  }, on = m.object({
    type: m.literal("boolean"),
    description: m.string().optional(),
    default: m.boolean().optional(),
    const: m.boolean().optional()
  }).strict(), pn = m.object({
    type: m.literal("integer"),
    description: m.string().optional(),
    default: m.number().int().optional(),
    minimum: m.number().int().optional(),
    maximum: m.number().int().optional(),
    enum: m.number().int().array().optional(),
    const: m.number().int().optional()
  }).strict(), Hc = m.enum([
    "datetime",
    "uri",
    "at-uri",
    "did",
    "handle",
    "at-identifier",
    "nsid",
    "cid",
    "language"
  ]), un = m.object({
    type: m.literal("string"),
    format: Hc.optional(),
    description: m.string().optional(),
    default: m.string().optional(),
    minLength: m.number().int().optional(),
    maxLength: m.number().int().optional(),
    minGraphemes: m.number().int().optional(),
    maxGraphemes: m.number().int().optional(),
    enum: m.string().array().optional(),
    const: m.string().optional(),
    knownValues: m.string().array().optional()
  }).strict(), ln = m.object({
    type: m.literal("unknown"),
    description: m.string().optional()
  }).strict(), ur = m.discriminatedUnion("type", [
    on,
    pn,
    un,
    ln
  ]), fn = m.object({
    type: m.literal("bytes"),
    description: m.string().optional(),
    maxLength: m.number().optional(),
    minLength: m.number().optional()
  }).strict(), cn = m.object({
    type: m.literal("cid-link"),
    description: m.string().optional()
  }).strict(), dn = m.discriminatedUnion("type", [fn, cn]), Zc = m.object({
    type: m.literal("ref"),
    description: m.string().optional(),
    ref: m.string()
  }).strict(), Wc = m.object({
    type: m.literal("union"),
    description: m.string().optional(),
    refs: m.string().array(),
    closed: m.boolean().optional()
  }).strict(), lr = m.discriminatedUnion("type", [Zc, Wc]), qr = m.object({
    type: m.literal("blob"),
    description: m.string().optional(),
    accept: m.string().array().optional(),
    maxSize: m.number().optional()
  }).strict(), Mr = m.object({
    type: m.literal("array"),
    description: m.string().optional(),
    items: m.union([ur, dn, qr, lr]),
    minLength: m.number().int().optional(),
    maxLength: m.number().int().optional()
  }).strict(), Jc = Mr.merge(m.object({
    items: ur
  }).strict()), Qc = m.object({
    type: m.literal("token"),
    description: m.string().optional()
  }).strict(), fr = m.object({
    type: m.literal("object"),
    description: m.string().optional(),
    required: m.string().array().optional(),
    nullable: m.string().array().optional(),
    properties: m.record(m.union([lr, dn, Mr, qr, ur]))
  }).strict().superRefine(an), $r = m.object({
    type: m.literal("params"),
    description: m.string().optional(),
    required: m.string().array().optional(),
    properties: m.record(m.union([ur, Jc]))
  }).strict().superRefine(an), Gr = m.object({
    description: m.string().optional(),
    encoding: m.string(),
    schema: m.union([lr, fr]).optional()
  }).strict(), Yc = m.object({
    description: m.string().optional(),
    schema: m.union([lr, fr]).optional()
  }).strict(), Or = m.object({
    name: m.string(),
    description: m.string().optional()
  }).strict(), ed = m.object({
    type: m.literal("query"),
    description: m.string().optional(),
    parameters: $r.optional(),
    output: Gr.optional(),
    errors: Or.array().optional()
  }).strict(), td = m.object({
    type: m.literal("procedure"),
    description: m.string().optional(),
    parameters: $r.optional(),
    input: Gr.optional(),
    output: Gr.optional(),
    errors: Or.array().optional()
  }).strict(), rd = m.object({
    type: m.literal("subscription"),
    description: m.string().optional(),
    parameters: $r.optional(),
    message: Yc.optional(),
    errors: Or.array().optional()
  }).strict(), id = m.object({
    type: m.literal("record"),
    description: m.string().optional(),
    key: m.string().optional(),
    record: fr
  }).strict(), nd = m.custom((t) => {
    if (!(!t || typeof t != "object") && t.type !== void 0)
      switch (t.type) {
        case "record":
          return id.parse(t);
        case "query":
          return ed.parse(t);
        case "procedure":
          return td.parse(t);
        case "subscription":
          return rd.parse(t);
        case "blob":
          return qr.parse(t);
        case "array":
          return Mr.parse(t);
        case "token":
          return Qc.parse(t);
        case "object":
          return fr.parse(t);
        case "boolean":
          return on.parse(t);
        case "integer":
          return pn.parse(t);
        case "string":
          return un.parse(t);
        case "bytes":
          return fn.parse(t);
        case "cid-link":
          return cn.parse(t);
        case "unknown":
          return ln.parse(t);
      }
  }, (t) => !t || typeof t != "object" ? {
    message: "Must be an object",
    fatal: !0
  } : t.type === void 0 ? {
    message: "Must have a type",
    fatal: !0
  } : {
    message: `Invalid type: ${t.type} must be one of: record, query, procedure, subscription, blob, array, token, object, boolean, integer, string, bytes, cid-link, unknown`,
    fatal: !0
  });
  m.object({
    lexicon: m.literal(1),
    id: m.string().refine((t) => $e.isValid(t), {
      message: "Must be a valid NSID"
    }),
    revision: m.number().optional(),
    description: m.string().optional(),
    defs: m.record(nd)
  }).strict().superRefine((t, i) => {
    for (const r in t.defs) {
      const n = t.defs[r];
      r !== "main" && (n.type === "record" || n.type === "procedure" || n.type === "query" || n.type === "subscription") && i.addIssue({
        code: m.ZodIssueCode.custom,
        message: "Records, procedures, queries, and subscriptions must be the main definition."
      });
    }
  });
  function mn(t) {
    return t !== null && typeof t == "object";
  }
  function sd(t, i) {
    return i in t;
  }
  var ad = m.object({ $type: m.string() });
  function od(t) {
    return ad.safeParse(t).success;
  }
  var U = class extends Error {
  }, hn = class extends Error {
  }, pd = class extends Error {
  };
  function ud(t, i, r, n) {
    const s = n && typeof n == "object" ? n : {}, u = new Set(r.required ?? []);
    let e = s;
    if (typeof r.properties == "object")
      for (const d in r.properties) {
        const y = r.properties[d], T = y.type === "array" ? nn(t, d, y, s[d]) : $c(t, d, y, s[d]), C = T.success ? T.value : s[d], S = typeof C > "u";
        if (S && u.has(d))
          return {
            success: !1,
            error: new U(`${i} must have the property "${d}"`)
          };
        if (!S && !T.success)
          return T;
        C !== s[d] && (e === s && (e = { ...s }), e[d] = C);
      }
    return { success: !0, value: e };
  }
  function ld(t, i, r) {
    const n = _t(t, "Record", i.record, r);
    if (!n.success)
      throw n.error;
    return n.value;
  }
  function fd(t, i, r) {
    if (i.parameters) {
      const n = ud(t, "Params", i.parameters, r);
      if (!n.success)
        throw n.error;
      return n.value;
    }
  }
  function cd(t, i, r) {
    if (i.input?.schema)
      return Fr(t, "Input", i.input.schema, r, !0);
  }
  function dd(t, i, r) {
    if (i.output?.schema)
      return Fr(t, "Output", i.output.schema, r, !0);
  }
  function md(t, i, r) {
    if (i.message?.schema)
      return Fr(t, "Message", i.message.schema, r, !0);
  }
  var yn = class {
    constructor(t) {
      if (this.docs = /* @__PURE__ */ new Map(), this.defs = /* @__PURE__ */ new Map(), t?.length)
        for (const i of t)
          this.add(i);
    }
    add(t) {
      const i = re(t.id);
      if (this.docs.has(i))
        throw new Error(`${i} has already been registered`);
      Xr(t, i), this.docs.set(i, t);
      for (const [r, n] of En(t))
        this.defs.set(r, n);
    }
    remove(t) {
      t = re(t);
      const i = this.docs.get(t);
      if (!i)
        throw new Error(`Unable to remove "${t}": does not exist`);
      for (const [r, n] of En(i))
        this.defs.delete(r);
      this.docs.delete(t);
    }
    get(t) {
      return t = re(t), this.docs.get(t);
    }
    getDef(t) {
      return t = re(t), this.defs.get(t);
    }
    getDefOrThrow(t, i) {
      const r = this.getDef(t);
      if (!r)
        throw new pd(`Lexicon not found: ${t}`);
      if (i && !i.includes(r.type))
        throw new hn(`Not a ${i.join(" or ")} lexicon: ${t}`);
      return r;
    }
    validate(t, i) {
      t = re(t);
      const r = this.getDefOrThrow(t, ["record", "object"]);
      if (!mn(i))
        throw new U("Value must be an object");
      if (r.type === "record")
        return _t(this, "Record", r.record, i);
      if (r.type === "object")
        return _t(this, "Object", r, i);
      throw new hn("Definition must be a record or object");
    }
    assertValidRecord(t, i) {
      t = re(t);
      const r = this.getDefOrThrow(t, ["record"]);
      if (!mn(i))
        throw new U("Record must be an object");
      if (!sd(i, "$type") || typeof i.$type != "string")
        throw new U("Record/$type must be a string");
      const n = i.$type || "";
      if (re(n) !== t)
        throw new U(`Invalid $type: must be ${t}, got ${n}`);
      return ld(this, r, i);
    }
    assertValidXrpcParams(t, i) {
      t = re(t);
      const r = this.getDefOrThrow(t, [
        "query",
        "procedure",
        "subscription"
      ]);
      return fd(this, r, i);
    }
    assertValidXrpcInput(t, i) {
      t = re(t);
      const r = this.getDefOrThrow(t, ["procedure"]);
      return cd(this, r, i);
    }
    assertValidXrpcOutput(t, i) {
      t = re(t);
      const r = this.getDefOrThrow(t, ["query", "procedure"]);
      return dd(this, r, i);
    }
    assertValidXrpcMessage(t, i) {
      t = re(t);
      const r = this.getDefOrThrow(t, ["subscription"]);
      return md(this, r, i);
    }
    resolveLexUri(t, i) {
      return t = re(t), re(i, t);
    }
  };
  function* En(t) {
    for (const i in t.defs)
      yield [`lex:${t.id}#${i}`, t.defs[i]], i === "main" && (yield [`lex:${t.id}`, t.defs[i]]);
  }
  function Xr(t, i) {
    for (const r in t)
      t.type === "ref" ? t.ref = re(t.ref, i) : t.type === "union" ? t.refs = t.refs.map((n) => re(n, i)) : Array.isArray(t[r]) ? t[r] = t[r].map((n) => typeof n == "string" ? n.startsWith("#") ? re(n, i) : n : n && typeof n == "object" ? Xr(n, i) : n) : t[r] && typeof t[r] == "object" && (t[r] = Xr(t[r], i));
    return t;
  }
  var zr = (t) => {
    if (Array.isArray(t))
      return t.map((i) => zr(i));
    if (t && typeof t == "object") {
      if (t instanceof We)
        return t.original;
      if (H.asCID(t) || t instanceof Uint8Array)
        return t;
      const i = {};
      for (const r of Object.keys(t))
        i[r] = zr(t[r]);
      return i;
    }
    return t;
  }, Hr = (t) => {
    if (Array.isArray(t))
      return t.map((i) => Hr(i));
    if (t && typeof t == "object") {
      if ((t.$type === "blob" || typeof t.cid == "string" && typeof t.mimeType == "string") && Yt.is(t, rn))
        return We.fromJsonRef(t);
      if (H.asCID(t) || t instanceof Uint8Array)
        return t;
      const i = {};
      for (const r of Object.keys(t))
        i[r] = Hr(t[r]);
      return i;
    }
    return t;
  }, gn = (t) => pr(zr(t)), Rn = (t) => JSON.stringify(gn(t)), bn = (t) => Hr(Pr(t)), An = (t) => bn(JSON.parse(t));
  function Zr(t) {
    return t.trim().replace(/^#(?!\ufe0f)/, "").replace(/[\r\n\u00AD\u2060\u200D\u200C\u200B]+/, "");
  }
  var Tn = m.object({
    error: m.string().optional(),
    message: m.string().optional()
  }), vn = /* @__PURE__ */ ((t) => (t[t.Unknown = 1] = "Unknown", t[t.InvalidResponse = 2] = "InvalidResponse", t[t.Success = 200] = "Success", t[t.InvalidRequest = 400] = "InvalidRequest", t[t.AuthRequired = 401] = "AuthRequired", t[t.Forbidden = 403] = "Forbidden", t[t.XRPCNotSupported = 404] = "XRPCNotSupported", t[t.PayloadTooLarge = 413] = "PayloadTooLarge", t[t.RateLimitExceeded = 429] = "RateLimitExceeded", t[t.InternalServerError = 500] = "InternalServerError", t[t.MethodNotImplemented = 501] = "MethodNotImplemented", t[t.UpstreamFailure = 502] = "UpstreamFailure", t[t.NotEnoughResources = 503] = "NotEnoughResources", t[t.UpstreamTimeout = 504] = "UpstreamTimeout", t))(vn || {}), hd = {
    2: "InvalidResponse",
    200: "Success",
    400: "InvalidRequest",
    401: "AuthenticationRequired",
    403: "Forbidden",
    404: "XRPCNotSupported",
    413: "PayloadTooLarge",
    429: "RateLimitExceeded",
    500: "InternalServerError",
    501: "MethodNotImplemented",
    502: "UpstreamFailure",
    503: "NotEnoughResources",
    504: "UpstreamTimeout"
  }, wn = {
    2: "Invalid Response",
    200: "Success",
    400: "Invalid Request",
    401: "Authentication Required",
    403: "Forbidden",
    404: "XRPC Not Supported",
    413: "Payload Too Large",
    429: "Rate Limit Exceeded",
    500: "Internal Server Error",
    501: "Method Not Implemented",
    502: "Upstream Failure",
    503: "Not Enough Resources",
    504: "Upstream Timeout"
  }, yd = class {
    constructor(t, i) {
      this.data = t, this.headers = i, this.success = !0;
    }
  }, w = class extends Error {
    constructor(t, i, r, n) {
      super(r || i || wn[t]), this.status = t, this.error = i, this.success = !1, this.error || (this.error = hd[t]), this.headers = n;
    }
  }, Ed = class extends w {
    constructor(t, i, r) {
      super(2, wn[
        2
        /* InvalidResponse */
      ], "The server gave an invalid response and may be out of date."), this.lexiconNsid = t, this.validationError = i, this.responseBody = r;
    }
  };
  function gd(t) {
    return t.type === "procedure" ? "post" : "get";
  }
  function Rd(t, i, r, n) {
    const s = new URL(r);
    if (s.pathname = `/xrpc/${t}`, n)
      for (const [u, e] of Object.entries(n)) {
        const d = i.parameters?.properties?.[u];
        if (!d)
          throw new Error(`Invalid query parameter: ${u}`);
        e !== void 0 && (d.type === "array" ? [].concat(e).forEach((T) => {
          s.searchParams.append(u, Ln(d.items.type, T));
        }) : s.searchParams.set(u, Ln(d.type, e)));
      }
    return s.toString();
  }
  function Ln(t, i) {
    if (t === "string" || t === "unknown")
      return String(i);
    if (t === "float")
      return String(Number(i));
    if (t === "integer")
      return String(Number(i) | 0);
    if (t === "boolean")
      return i ? "true" : "false";
    if (t === "datetime")
      return i instanceof Date ? i.toISOString() : String(i);
    throw new Error(`Unsupported query param type: ${t}`);
  }
  function bd(t) {
    const i = {};
    for (const [r, n] of Object.entries(t))
      i[r.toLowerCase()] = n;
    return i;
  }
  function Ad(t, i, r) {
    const n = r?.headers || {};
    return t.type === "procedure" && (r?.encoding && (n["Content-Type"] = r.encoding), i && typeof i == "object" && (n["Content-Type"] || (n["Content-Type"] = "application/json"))), n;
  }
  function Td(t, i) {
    if (!(!t["content-type"] || typeof i > "u"))
      return i instanceof ArrayBuffer ? i : t["content-type"].startsWith("text/") ? new TextEncoder().encode(i.toString()) : t["content-type"].startsWith("application/json") ? new TextEncoder().encode(Rn(i)) : i;
  }
  function vd(t) {
    let i;
    return t in vn ? i = t : t >= 100 && t < 200 ? i = 404 : t >= 200 && t < 300 ? i = 200 : t >= 300 && t < 400 ? i = 404 : t >= 400 && t < 500 ? i = 400 : i = 500, i;
  }
  function wd(t, i) {
    if (t) {
      if (t.includes("application/json") && i?.byteLength)
        try {
          const r = new TextDecoder().decode(i);
          return An(r);
        } catch (r) {
          throw new w(2, `Failed to parse response body: ${String(r)}`);
        }
      if (t.startsWith("text/") && i?.byteLength)
        try {
          return new TextDecoder().decode(i);
        } catch (r) {
          throw new w(2, `Failed to parse response body: ${String(r)}`);
        }
    }
    return i instanceof ArrayBuffer ? new Uint8Array(i) : i;
  }
  var Cn = class {
    constructor() {
      this.fetch = _n, this.lex = new yn();
    }
    async call(t, i, r, n, s) {
      return this.service(t).call(i, r, n, s);
    }
    service(t) {
      return new Ld(this, t);
    }
    addLexicon(t) {
      this.lex.add(t);
    }
    addLexicons(t) {
      for (const i of t)
        this.addLexicon(i);
    }
    removeLexicon(t) {
      this.lex.remove(t);
    }
  }, Ld = class {
    constructor(t, i) {
      this.headers = {}, this.baseClient = t, this.uri = typeof i == "string" ? new URL(i) : i;
    }
    setHeader(t, i) {
      this.headers[t] = i;
    }
    unsetHeader(t) {
      delete this.headers[t];
    }
    async call(t, i, r, n) {
      const s = this.baseClient.lex.getDefOrThrow(t);
      if (!s || s.type !== "query" && s.type !== "procedure")
        throw new Error(`Invalid lexicon: ${t}. Must be a query or procedure.`);
      const u = gd(s), e = Rd(t, s, this.uri, i), d = Ad(s, r, {
        headers: {
          ...this.headers,
          ...n?.headers
        },
        encoding: n?.encoding
      }), y = await this.baseClient.fetch(e, u, d, r), T = vd(y.status);
      if (T === 200) {
        try {
          this.baseClient.lex.assertValidXrpcOutput(t, y.body);
        } catch (C) {
          throw C instanceof U ? new Ed(t, C, y.body) : C;
        }
        return new yd(y.body, y.headers);
      } else
        throw y.body && Cd(y.body) ? new w(T, y.body.error, y.body.message, y.headers) : new w(T);
    }
  };
  async function _n(t, i, r, n) {
    try {
      const s = bd(r), u = {
        method: i,
        headers: s,
        body: Td(s, n),
        duplex: "half"
      }, e = await fetch(t, u), d = await e.arrayBuffer();
      return {
        status: e.status,
        headers: Object.fromEntries(e.headers.entries()),
        body: wd(e.headers.get("content-type"), d)
      };
    } catch (s) {
      throw new w(1, String(s));
    }
  }
  function Cd(t) {
    return Tn.safeParse(t).success;
  }
  new Cn();
  var _d = {
    ComAtprotoAdminCreateCommunicationTemplate: {
      lexicon: 1,
      id: "com.atproto.admin.createCommunicationTemplate",
      defs: {
        main: {
          type: "procedure",
          description: "Administrative action to create a new, re-usable communication (email for now) template.",
          input: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["subject", "contentMarkdown", "name"],
              properties: {
                name: {
                  type: "string",
                  description: "Name of the template."
                },
                contentMarkdown: {
                  type: "string",
                  description: "Content of the template, markdown supported, can contain variable placeholders."
                },
                subject: {
                  type: "string",
                  description: "Subject of the message, used in emails."
                },
                createdBy: {
                  type: "string",
                  format: "did",
                  description: "DID of the user who is creating the template."
                }
              }
            }
          },
          output: {
            encoding: "application/json",
            schema: {
              type: "ref",
              ref: "lex:com.atproto.admin.defs#communicationTemplateView"
            }
          }
        }
      }
    },
    ComAtprotoAdminDefs: {
      lexicon: 1,
      id: "com.atproto.admin.defs",
      defs: {
        statusAttr: {
          type: "object",
          required: ["applied"],
          properties: {
            applied: {
              type: "boolean"
            },
            ref: {
              type: "string"
            }
          }
        },
        modEventView: {
          type: "object",
          required: [
            "id",
            "event",
            "subject",
            "subjectBlobCids",
            "createdBy",
            "createdAt"
          ],
          properties: {
            id: {
              type: "integer"
            },
            event: {
              type: "union",
              refs: [
                "lex:com.atproto.admin.defs#modEventTakedown",
                "lex:com.atproto.admin.defs#modEventReverseTakedown",
                "lex:com.atproto.admin.defs#modEventComment",
                "lex:com.atproto.admin.defs#modEventReport",
                "lex:com.atproto.admin.defs#modEventLabel",
                "lex:com.atproto.admin.defs#modEventAcknowledge",
                "lex:com.atproto.admin.defs#modEventEscalate",
                "lex:com.atproto.admin.defs#modEventMute",
                "lex:com.atproto.admin.defs#modEventEmail",
                "lex:com.atproto.admin.defs#modEventResolveAppeal"
              ]
            },
            subject: {
              type: "union",
              refs: [
                "lex:com.atproto.admin.defs#repoRef",
                "lex:com.atproto.repo.strongRef"
              ]
            },
            subjectBlobCids: {
              type: "array",
              items: {
                type: "string"
              }
            },
            createdBy: {
              type: "string",
              format: "did"
            },
            createdAt: {
              type: "string",
              format: "datetime"
            },
            creatorHandle: {
              type: "string"
            },
            subjectHandle: {
              type: "string"
            }
          }
        },
        modEventViewDetail: {
          type: "object",
          required: [
            "id",
            "event",
            "subject",
            "subjectBlobs",
            "createdBy",
            "createdAt"
          ],
          properties: {
            id: {
              type: "integer"
            },
            event: {
              type: "union",
              refs: [
                "lex:com.atproto.admin.defs#modEventTakedown",
                "lex:com.atproto.admin.defs#modEventReverseTakedown",
                "lex:com.atproto.admin.defs#modEventComment",
                "lex:com.atproto.admin.defs#modEventReport",
                "lex:com.atproto.admin.defs#modEventLabel",
                "lex:com.atproto.admin.defs#modEventAcknowledge",
                "lex:com.atproto.admin.defs#modEventEscalate",
                "lex:com.atproto.admin.defs#modEventMute",
                "lex:com.atproto.admin.defs#modEventEmail",
                "lex:com.atproto.admin.defs#modEventResolveAppeal"
              ]
            },
            subject: {
              type: "union",
              refs: [
                "lex:com.atproto.admin.defs#repoView",
                "lex:com.atproto.admin.defs#repoViewNotFound",
                "lex:com.atproto.admin.defs#recordView",
                "lex:com.atproto.admin.defs#recordViewNotFound"
              ]
            },
            subjectBlobs: {
              type: "array",
              items: {
                type: "ref",
                ref: "lex:com.atproto.admin.defs#blobView"
              }
            },
            createdBy: {
              type: "string",
              format: "did"
            },
            createdAt: {
              type: "string",
              format: "datetime"
            }
          }
        },
        reportView: {
          type: "object",
          required: [
            "id",
            "reasonType",
            "subject",
            "reportedBy",
            "createdAt",
            "resolvedByActionIds"
          ],
          properties: {
            id: {
              type: "integer"
            },
            reasonType: {
              type: "ref",
              ref: "lex:com.atproto.moderation.defs#reasonType"
            },
            comment: {
              type: "string"
            },
            subjectRepoHandle: {
              type: "string"
            },
            subject: {
              type: "union",
              refs: [
                "lex:com.atproto.admin.defs#repoRef",
                "lex:com.atproto.repo.strongRef"
              ]
            },
            reportedBy: {
              type: "string",
              format: "did"
            },
            createdAt: {
              type: "string",
              format: "datetime"
            },
            resolvedByActionIds: {
              type: "array",
              items: {
                type: "integer"
              }
            }
          }
        },
        subjectStatusView: {
          type: "object",
          required: ["id", "subject", "createdAt", "updatedAt", "reviewState"],
          properties: {
            id: {
              type: "integer"
            },
            subject: {
              type: "union",
              refs: [
                "lex:com.atproto.admin.defs#repoRef",
                "lex:com.atproto.repo.strongRef"
              ]
            },
            subjectBlobCids: {
              type: "array",
              items: {
                type: "string",
                format: "cid"
              }
            },
            subjectRepoHandle: {
              type: "string"
            },
            updatedAt: {
              type: "string",
              format: "datetime",
              description: "Timestamp referencing when the last update was made to the moderation status of the subject"
            },
            createdAt: {
              type: "string",
              format: "datetime",
              description: "Timestamp referencing the first moderation status impacting event was emitted on the subject"
            },
            reviewState: {
              type: "ref",
              ref: "lex:com.atproto.admin.defs#subjectReviewState"
            },
            comment: {
              type: "string",
              description: "Sticky comment on the subject."
            },
            muteUntil: {
              type: "string",
              format: "datetime"
            },
            lastReviewedBy: {
              type: "string",
              format: "did"
            },
            lastReviewedAt: {
              type: "string",
              format: "datetime"
            },
            lastReportedAt: {
              type: "string",
              format: "datetime"
            },
            lastAppealedAt: {
              type: "string",
              format: "datetime",
              description: "Timestamp referencing when the author of the subject appealed a moderation action"
            },
            takendown: {
              type: "boolean"
            },
            appealed: {
              type: "boolean",
              description: "True indicates that the a previously taken moderator action was appealed against, by the author of the content. False indicates last appeal was resolved by moderators."
            },
            suspendUntil: {
              type: "string",
              format: "datetime"
            },
            tags: {
              type: "array",
              items: {
                type: "string"
              }
            }
          }
        },
        reportViewDetail: {
          type: "object",
          required: [
            "id",
            "reasonType",
            "subject",
            "reportedBy",
            "createdAt",
            "resolvedByActions"
          ],
          properties: {
            id: {
              type: "integer"
            },
            reasonType: {
              type: "ref",
              ref: "lex:com.atproto.moderation.defs#reasonType"
            },
            comment: {
              type: "string"
            },
            subject: {
              type: "union",
              refs: [
                "lex:com.atproto.admin.defs#repoView",
                "lex:com.atproto.admin.defs#repoViewNotFound",
                "lex:com.atproto.admin.defs#recordView",
                "lex:com.atproto.admin.defs#recordViewNotFound"
              ]
            },
            subjectStatus: {
              type: "ref",
              ref: "lex:com.atproto.admin.defs#subjectStatusView"
            },
            reportedBy: {
              type: "string",
              format: "did"
            },
            createdAt: {
              type: "string",
              format: "datetime"
            },
            resolvedByActions: {
              type: "array",
              items: {
                type: "ref",
                ref: "lex:com.atproto.admin.defs#modEventView"
              }
            }
          }
        },
        repoView: {
          type: "object",
          required: [
            "did",
            "handle",
            "relatedRecords",
            "indexedAt",
            "moderation"
          ],
          properties: {
            did: {
              type: "string",
              format: "did"
            },
            handle: {
              type: "string",
              format: "handle"
            },
            email: {
              type: "string"
            },
            relatedRecords: {
              type: "array",
              items: {
                type: "unknown"
              }
            },
            indexedAt: {
              type: "string",
              format: "datetime"
            },
            moderation: {
              type: "ref",
              ref: "lex:com.atproto.admin.defs#moderation"
            },
            invitedBy: {
              type: "ref",
              ref: "lex:com.atproto.server.defs#inviteCode"
            },
            invitesDisabled: {
              type: "boolean"
            },
            inviteNote: {
              type: "string"
            }
          }
        },
        repoViewDetail: {
          type: "object",
          required: [
            "did",
            "handle",
            "relatedRecords",
            "indexedAt",
            "moderation"
          ],
          properties: {
            did: {
              type: "string",
              format: "did"
            },
            handle: {
              type: "string",
              format: "handle"
            },
            email: {
              type: "string"
            },
            relatedRecords: {
              type: "array",
              items: {
                type: "unknown"
              }
            },
            indexedAt: {
              type: "string",
              format: "datetime"
            },
            moderation: {
              type: "ref",
              ref: "lex:com.atproto.admin.defs#moderationDetail"
            },
            labels: {
              type: "array",
              items: {
                type: "ref",
                ref: "lex:com.atproto.label.defs#label"
              }
            },
            invitedBy: {
              type: "ref",
              ref: "lex:com.atproto.server.defs#inviteCode"
            },
            invites: {
              type: "array",
              items: {
                type: "ref",
                ref: "lex:com.atproto.server.defs#inviteCode"
              }
            },
            invitesDisabled: {
              type: "boolean"
            },
            inviteNote: {
              type: "string"
            },
            emailConfirmedAt: {
              type: "string",
              format: "datetime"
            }
          }
        },
        accountView: {
          type: "object",
          required: ["did", "handle", "indexedAt"],
          properties: {
            did: {
              type: "string",
              format: "did"
            },
            handle: {
              type: "string",
              format: "handle"
            },
            email: {
              type: "string"
            },
            relatedRecords: {
              type: "array",
              items: {
                type: "unknown"
              }
            },
            indexedAt: {
              type: "string",
              format: "datetime"
            },
            invitedBy: {
              type: "ref",
              ref: "lex:com.atproto.server.defs#inviteCode"
            },
            invites: {
              type: "array",
              items: {
                type: "ref",
                ref: "lex:com.atproto.server.defs#inviteCode"
              }
            },
            invitesDisabled: {
              type: "boolean"
            },
            emailConfirmedAt: {
              type: "string",
              format: "datetime"
            },
            inviteNote: {
              type: "string"
            }
          }
        },
        repoViewNotFound: {
          type: "object",
          required: ["did"],
          properties: {
            did: {
              type: "string",
              format: "did"
            }
          }
        },
        repoRef: {
          type: "object",
          required: ["did"],
          properties: {
            did: {
              type: "string",
              format: "did"
            }
          }
        },
        repoBlobRef: {
          type: "object",
          required: ["did", "cid"],
          properties: {
            did: {
              type: "string",
              format: "did"
            },
            cid: {
              type: "string",
              format: "cid"
            },
            recordUri: {
              type: "string",
              format: "at-uri"
            }
          }
        },
        recordView: {
          type: "object",
          required: [
            "uri",
            "cid",
            "value",
            "blobCids",
            "indexedAt",
            "moderation",
            "repo"
          ],
          properties: {
            uri: {
              type: "string",
              format: "at-uri"
            },
            cid: {
              type: "string",
              format: "cid"
            },
            value: {
              type: "unknown"
            },
            blobCids: {
              type: "array",
              items: {
                type: "string",
                format: "cid"
              }
            },
            indexedAt: {
              type: "string",
              format: "datetime"
            },
            moderation: {
              type: "ref",
              ref: "lex:com.atproto.admin.defs#moderation"
            },
            repo: {
              type: "ref",
              ref: "lex:com.atproto.admin.defs#repoView"
            }
          }
        },
        recordViewDetail: {
          type: "object",
          required: [
            "uri",
            "cid",
            "value",
            "blobs",
            "indexedAt",
            "moderation",
            "repo"
          ],
          properties: {
            uri: {
              type: "string",
              format: "at-uri"
            },
            cid: {
              type: "string",
              format: "cid"
            },
            value: {
              type: "unknown"
            },
            blobs: {
              type: "array",
              items: {
                type: "ref",
                ref: "lex:com.atproto.admin.defs#blobView"
              }
            },
            labels: {
              type: "array",
              items: {
                type: "ref",
                ref: "lex:com.atproto.label.defs#label"
              }
            },
            indexedAt: {
              type: "string",
              format: "datetime"
            },
            moderation: {
              type: "ref",
              ref: "lex:com.atproto.admin.defs#moderationDetail"
            },
            repo: {
              type: "ref",
              ref: "lex:com.atproto.admin.defs#repoView"
            }
          }
        },
        recordViewNotFound: {
          type: "object",
          required: ["uri"],
          properties: {
            uri: {
              type: "string",
              format: "at-uri"
            }
          }
        },
        moderation: {
          type: "object",
          properties: {
            subjectStatus: {
              type: "ref",
              ref: "lex:com.atproto.admin.defs#subjectStatusView"
            }
          }
        },
        moderationDetail: {
          type: "object",
          properties: {
            subjectStatus: {
              type: "ref",
              ref: "lex:com.atproto.admin.defs#subjectStatusView"
            }
          }
        },
        blobView: {
          type: "object",
          required: ["cid", "mimeType", "size", "createdAt"],
          properties: {
            cid: {
              type: "string",
              format: "cid"
            },
            mimeType: {
              type: "string"
            },
            size: {
              type: "integer"
            },
            createdAt: {
              type: "string",
              format: "datetime"
            },
            details: {
              type: "union",
              refs: [
                "lex:com.atproto.admin.defs#imageDetails",
                "lex:com.atproto.admin.defs#videoDetails"
              ]
            },
            moderation: {
              type: "ref",
              ref: "lex:com.atproto.admin.defs#moderation"
            }
          }
        },
        imageDetails: {
          type: "object",
          required: ["width", "height"],
          properties: {
            width: {
              type: "integer"
            },
            height: {
              type: "integer"
            }
          }
        },
        videoDetails: {
          type: "object",
          required: ["width", "height", "length"],
          properties: {
            width: {
              type: "integer"
            },
            height: {
              type: "integer"
            },
            length: {
              type: "integer"
            }
          }
        },
        subjectReviewState: {
          type: "string",
          knownValues: [
            "lex:com.atproto.admin.defs#reviewOpen",
            "lex:com.atproto.admin.defs#reviewEscalated",
            "lex:com.atproto.admin.defs#reviewClosed"
          ]
        },
        reviewOpen: {
          type: "token",
          description: "Moderator review status of a subject: Open. Indicates that the subject needs to be reviewed by a moderator"
        },
        reviewEscalated: {
          type: "token",
          description: "Moderator review status of a subject: Escalated. Indicates that the subject was escalated for review by a moderator"
        },
        reviewClosed: {
          type: "token",
          description: "Moderator review status of a subject: Closed. Indicates that the subject was already reviewed and resolved by a moderator"
        },
        modEventTakedown: {
          type: "object",
          description: "Take down a subject permanently or temporarily",
          properties: {
            comment: {
              type: "string"
            },
            durationInHours: {
              type: "integer",
              description: "Indicates how long the takedown should be in effect before automatically expiring."
            }
          }
        },
        modEventReverseTakedown: {
          type: "object",
          description: "Revert take down action on a subject",
          properties: {
            comment: {
              type: "string",
              description: "Describe reasoning behind the reversal."
            }
          }
        },
        modEventResolveAppeal: {
          type: "object",
          description: "Resolve appeal on a subject",
          properties: {
            comment: {
              type: "string",
              description: "Describe resolution."
            }
          }
        },
        modEventComment: {
          type: "object",
          description: "Add a comment to a subject",
          required: ["comment"],
          properties: {
            comment: {
              type: "string"
            },
            sticky: {
              type: "boolean",
              description: "Make the comment persistent on the subject"
            }
          }
        },
        modEventReport: {
          type: "object",
          description: "Report a subject",
          required: ["reportType"],
          properties: {
            comment: {
              type: "string"
            },
            reportType: {
              type: "ref",
              ref: "lex:com.atproto.moderation.defs#reasonType"
            }
          }
        },
        modEventLabel: {
          type: "object",
          description: "Apply/Negate labels on a subject",
          required: ["createLabelVals", "negateLabelVals"],
          properties: {
            comment: {
              type: "string"
            },
            createLabelVals: {
              type: "array",
              items: {
                type: "string"
              }
            },
            negateLabelVals: {
              type: "array",
              items: {
                type: "string"
              }
            }
          }
        },
        modEventAcknowledge: {
          type: "object",
          properties: {
            comment: {
              type: "string"
            }
          }
        },
        modEventEscalate: {
          type: "object",
          properties: {
            comment: {
              type: "string"
            }
          }
        },
        modEventMute: {
          type: "object",
          description: "Mute incoming reports on a subject",
          required: ["durationInHours"],
          properties: {
            comment: {
              type: "string"
            },
            durationInHours: {
              type: "integer",
              description: "Indicates how long the subject should remain muted."
            }
          }
        },
        modEventUnmute: {
          type: "object",
          description: "Unmute action on a subject",
          properties: {
            comment: {
              type: "string",
              description: "Describe reasoning behind the reversal."
            }
          }
        },
        modEventEmail: {
          type: "object",
          description: "Keep a log of outgoing email to a user",
          required: ["subjectLine"],
          properties: {
            subjectLine: {
              type: "string",
              description: "The subject line of the email sent to the user."
            },
            comment: {
              type: "string",
              description: "Additional comment about the outgoing comm."
            }
          }
        },
        modEventTag: {
          type: "object",
          description: "Add/Remove a tag on a subject",
          required: ["add", "remove"],
          properties: {
            add: {
              type: "array",
              items: {
                type: "string"
              },
              description: "Tags to be added to the subject. If already exists, won't be duplicated."
            },
            remove: {
              type: "array",
              items: {
                type: "string"
              },
              description: "Tags to be removed to the subject. Ignores a tag If it doesn't exist, won't be duplicated."
            },
            comment: {
              type: "string",
              description: "Additional comment about added/removed tags."
            }
          }
        },
        communicationTemplateView: {
          type: "object",
          required: [
            "id",
            "name",
            "contentMarkdown",
            "disabled",
            "lastUpdatedBy",
            "createdAt",
            "updatedAt"
          ],
          properties: {
            id: {
              type: "string"
            },
            name: {
              type: "string",
              description: "Name of the template."
            },
            subject: {
              type: "string",
              description: "Content of the template, can contain markdown and variable placeholders."
            },
            contentMarkdown: {
              type: "string",
              description: "Subject of the message, used in emails."
            },
            disabled: {
              type: "boolean"
            },
            lastUpdatedBy: {
              type: "string",
              format: "did",
              description: "DID of the user who last updated the template."
            },
            createdAt: {
              type: "string",
              format: "datetime"
            },
            updatedAt: {
              type: "string",
              format: "datetime"
            }
          }
        }
      }
    },
    ComAtprotoAdminDeleteAccount: {
      lexicon: 1,
      id: "com.atproto.admin.deleteAccount",
      defs: {
        main: {
          type: "procedure",
          description: "Delete a user account as an administrator.",
          input: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["did"],
              properties: {
                did: {
                  type: "string",
                  format: "did"
                }
              }
            }
          }
        }
      }
    },
    ComAtprotoAdminDeleteCommunicationTemplate: {
      lexicon: 1,
      id: "com.atproto.admin.deleteCommunicationTemplate",
      defs: {
        main: {
          type: "procedure",
          description: "Delete a communication template.",
          input: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["id"],
              properties: {
                id: {
                  type: "string"
                }
              }
            }
          }
        }
      }
    },
    ComAtprotoAdminDisableAccountInvites: {
      lexicon: 1,
      id: "com.atproto.admin.disableAccountInvites",
      defs: {
        main: {
          type: "procedure",
          description: "Disable an account from receiving new invite codes, but does not invalidate existing codes.",
          input: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["account"],
              properties: {
                account: {
                  type: "string",
                  format: "did"
                },
                note: {
                  type: "string",
                  description: "Optional reason for disabled invites."
                }
              }
            }
          }
        }
      }
    },
    ComAtprotoAdminDisableInviteCodes: {
      lexicon: 1,
      id: "com.atproto.admin.disableInviteCodes",
      defs: {
        main: {
          type: "procedure",
          description: "Disable some set of codes and/or all codes associated with a set of users.",
          input: {
            encoding: "application/json",
            schema: {
              type: "object",
              properties: {
                codes: {
                  type: "array",
                  items: {
                    type: "string"
                  }
                },
                accounts: {
                  type: "array",
                  items: {
                    type: "string"
                  }
                }
              }
            }
          }
        }
      }
    },
    ComAtprotoAdminEmitModerationEvent: {
      lexicon: 1,
      id: "com.atproto.admin.emitModerationEvent",
      defs: {
        main: {
          type: "procedure",
          description: "Take a moderation action on an actor.",
          input: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["event", "subject", "createdBy"],
              properties: {
                event: {
                  type: "union",
                  refs: [
                    "lex:com.atproto.admin.defs#modEventTakedown",
                    "lex:com.atproto.admin.defs#modEventAcknowledge",
                    "lex:com.atproto.admin.defs#modEventEscalate",
                    "lex:com.atproto.admin.defs#modEventComment",
                    "lex:com.atproto.admin.defs#modEventLabel",
                    "lex:com.atproto.admin.defs#modEventReport",
                    "lex:com.atproto.admin.defs#modEventMute",
                    "lex:com.atproto.admin.defs#modEventReverseTakedown",
                    "lex:com.atproto.admin.defs#modEventUnmute",
                    "lex:com.atproto.admin.defs#modEventEmail",
                    "lex:com.atproto.admin.defs#modEventTag"
                  ]
                },
                subject: {
                  type: "union",
                  refs: [
                    "lex:com.atproto.admin.defs#repoRef",
                    "lex:com.atproto.repo.strongRef"
                  ]
                },
                subjectBlobCids: {
                  type: "array",
                  items: {
                    type: "string",
                    format: "cid"
                  }
                },
                createdBy: {
                  type: "string",
                  format: "did"
                }
              }
            }
          },
          output: {
            encoding: "application/json",
            schema: {
              type: "ref",
              ref: "lex:com.atproto.admin.defs#modEventView"
            }
          },
          errors: [
            {
              name: "SubjectHasAction"
            }
          ]
        }
      }
    },
    ComAtprotoAdminEnableAccountInvites: {
      lexicon: 1,
      id: "com.atproto.admin.enableAccountInvites",
      defs: {
        main: {
          type: "procedure",
          description: "Re-enable an account's ability to receive invite codes.",
          input: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["account"],
              properties: {
                account: {
                  type: "string",
                  format: "did"
                },
                note: {
                  type: "string",
                  description: "Optional reason for enabled invites."
                }
              }
            }
          }
        }
      }
    },
    ComAtprotoAdminGetAccountInfo: {
      lexicon: 1,
      id: "com.atproto.admin.getAccountInfo",
      defs: {
        main: {
          type: "query",
          description: "Get details about an account.",
          parameters: {
            type: "params",
            required: ["did"],
            properties: {
              did: {
                type: "string",
                format: "did"
              }
            }
          },
          output: {
            encoding: "application/json",
            schema: {
              type: "ref",
              ref: "lex:com.atproto.admin.defs#accountView"
            }
          }
        }
      }
    },
    ComAtprotoAdminGetAccountInfos: {
      lexicon: 1,
      id: "com.atproto.admin.getAccountInfos",
      defs: {
        main: {
          type: "query",
          description: "Get details about some accounts.",
          parameters: {
            type: "params",
            required: ["dids"],
            properties: {
              dids: {
                type: "array",
                items: {
                  type: "string",
                  format: "did"
                }
              }
            }
          },
          output: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["infos"],
              properties: {
                infos: {
                  type: "array",
                  items: {
                    type: "ref",
                    ref: "lex:com.atproto.admin.defs#accountView"
                  }
                }
              }
            }
          }
        }
      }
    },
    ComAtprotoAdminGetInviteCodes: {
      lexicon: 1,
      id: "com.atproto.admin.getInviteCodes",
      defs: {
        main: {
          type: "query",
          description: "Get an admin view of invite codes.",
          parameters: {
            type: "params",
            properties: {
              sort: {
                type: "string",
                knownValues: ["recent", "usage"],
                default: "recent"
              },
              limit: {
                type: "integer",
                minimum: 1,
                maximum: 500,
                default: 100
              },
              cursor: {
                type: "string"
              }
            }
          },
          output: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["codes"],
              properties: {
                cursor: {
                  type: "string"
                },
                codes: {
                  type: "array",
                  items: {
                    type: "ref",
                    ref: "lex:com.atproto.server.defs#inviteCode"
                  }
                }
              }
            }
          }
        }
      }
    },
    ComAtprotoAdminGetModerationEvent: {
      lexicon: 1,
      id: "com.atproto.admin.getModerationEvent",
      defs: {
        main: {
          type: "query",
          description: "Get details about a moderation event.",
          parameters: {
            type: "params",
            required: ["id"],
            properties: {
              id: {
                type: "integer"
              }
            }
          },
          output: {
            encoding: "application/json",
            schema: {
              type: "ref",
              ref: "lex:com.atproto.admin.defs#modEventViewDetail"
            }
          }
        }
      }
    },
    ComAtprotoAdminGetRecord: {
      lexicon: 1,
      id: "com.atproto.admin.getRecord",
      defs: {
        main: {
          type: "query",
          description: "Get details about a record.",
          parameters: {
            type: "params",
            required: ["uri"],
            properties: {
              uri: {
                type: "string",
                format: "at-uri"
              },
              cid: {
                type: "string",
                format: "cid"
              }
            }
          },
          output: {
            encoding: "application/json",
            schema: {
              type: "ref",
              ref: "lex:com.atproto.admin.defs#recordViewDetail"
            }
          },
          errors: [
            {
              name: "RecordNotFound"
            }
          ]
        }
      }
    },
    ComAtprotoAdminGetRepo: {
      lexicon: 1,
      id: "com.atproto.admin.getRepo",
      defs: {
        main: {
          type: "query",
          description: "Get details about a repository.",
          parameters: {
            type: "params",
            required: ["did"],
            properties: {
              did: {
                type: "string",
                format: "did"
              }
            }
          },
          output: {
            encoding: "application/json",
            schema: {
              type: "ref",
              ref: "lex:com.atproto.admin.defs#repoViewDetail"
            }
          },
          errors: [
            {
              name: "RepoNotFound"
            }
          ]
        }
      }
    },
    ComAtprotoAdminGetSubjectStatus: {
      lexicon: 1,
      id: "com.atproto.admin.getSubjectStatus",
      defs: {
        main: {
          type: "query",
          description: "Get the service-specific admin status of a subject (account, record, or blob).",
          parameters: {
            type: "params",
            properties: {
              did: {
                type: "string",
                format: "did"
              },
              uri: {
                type: "string",
                format: "at-uri"
              },
              blob: {
                type: "string",
                format: "cid"
              }
            }
          },
          output: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["subject"],
              properties: {
                subject: {
                  type: "union",
                  refs: [
                    "lex:com.atproto.admin.defs#repoRef",
                    "lex:com.atproto.repo.strongRef",
                    "lex:com.atproto.admin.defs#repoBlobRef"
                  ]
                },
                takedown: {
                  type: "ref",
                  ref: "lex:com.atproto.admin.defs#statusAttr"
                }
              }
            }
          }
        }
      }
    },
    ComAtprotoAdminListCommunicationTemplates: {
      lexicon: 1,
      id: "com.atproto.admin.listCommunicationTemplates",
      defs: {
        main: {
          type: "query",
          description: "Get list of all communication templates.",
          output: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["communicationTemplates"],
              properties: {
                communicationTemplates: {
                  type: "array",
                  items: {
                    type: "ref",
                    ref: "lex:com.atproto.admin.defs#communicationTemplateView"
                  }
                }
              }
            }
          }
        }
      }
    },
    ComAtprotoAdminQueryModerationEvents: {
      lexicon: 1,
      id: "com.atproto.admin.queryModerationEvents",
      defs: {
        main: {
          type: "query",
          description: "List moderation events related to a subject.",
          parameters: {
            type: "params",
            properties: {
              types: {
                type: "array",
                items: {
                  type: "string"
                },
                description: "The types of events (fully qualified string in the format of com.atproto.admin#modEvent<name>) to filter by. If not specified, all events are returned."
              },
              createdBy: {
                type: "string",
                format: "did"
              },
              sortDirection: {
                type: "string",
                default: "desc",
                enum: ["asc", "desc"],
                description: "Sort direction for the events. Defaults to descending order of created at timestamp."
              },
              createdAfter: {
                type: "string",
                format: "datetime",
                description: "Retrieve events created after a given timestamp"
              },
              createdBefore: {
                type: "string",
                format: "datetime",
                description: "Retrieve events created before a given timestamp"
              },
              subject: {
                type: "string",
                format: "uri"
              },
              includeAllUserRecords: {
                type: "boolean",
                default: !1,
                description: "If true, events on all record types (posts, lists, profile etc.) owned by the did are returned"
              },
              limit: {
                type: "integer",
                minimum: 1,
                maximum: 100,
                default: 50
              },
              hasComment: {
                type: "boolean",
                description: "If true, only events with comments are returned"
              },
              comment: {
                type: "string",
                description: "If specified, only events with comments containing the keyword are returned"
              },
              addedLabels: {
                type: "array",
                items: {
                  type: "string"
                },
                description: "If specified, only events where all of these labels were added are returned"
              },
              removedLabels: {
                type: "array",
                items: {
                  type: "string"
                },
                description: "If specified, only events where all of these labels were removed are returned"
              },
              addedTags: {
                type: "array",
                items: {
                  type: "string"
                },
                description: "If specified, only events where all of these tags were added are returned"
              },
              removedTags: {
                type: "array",
                items: {
                  type: "string"
                },
                description: "If specified, only events where all of these tags were removed are returned"
              },
              reportTypes: {
                type: "array",
                items: {
                  type: "string"
                }
              },
              cursor: {
                type: "string"
              }
            }
          },
          output: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["events"],
              properties: {
                cursor: {
                  type: "string"
                },
                events: {
                  type: "array",
                  items: {
                    type: "ref",
                    ref: "lex:com.atproto.admin.defs#modEventView"
                  }
                }
              }
            }
          }
        }
      }
    },
    ComAtprotoAdminQueryModerationStatuses: {
      lexicon: 1,
      id: "com.atproto.admin.queryModerationStatuses",
      defs: {
        main: {
          type: "query",
          description: "View moderation statuses of subjects (record or repo).",
          parameters: {
            type: "params",
            properties: {
              subject: {
                type: "string",
                format: "uri"
              },
              comment: {
                type: "string",
                description: "Search subjects by keyword from comments"
              },
              reportedAfter: {
                type: "string",
                format: "datetime",
                description: "Search subjects reported after a given timestamp"
              },
              reportedBefore: {
                type: "string",
                format: "datetime",
                description: "Search subjects reported before a given timestamp"
              },
              reviewedAfter: {
                type: "string",
                format: "datetime",
                description: "Search subjects reviewed after a given timestamp"
              },
              reviewedBefore: {
                type: "string",
                format: "datetime",
                description: "Search subjects reviewed before a given timestamp"
              },
              includeMuted: {
                type: "boolean",
                description: "By default, we don't include muted subjects in the results. Set this to true to include them."
              },
              reviewState: {
                type: "string",
                description: "Specify when fetching subjects in a certain state"
              },
              ignoreSubjects: {
                type: "array",
                items: {
                  type: "string",
                  format: "uri"
                }
              },
              lastReviewedBy: {
                type: "string",
                format: "did",
                description: "Get all subject statuses that were reviewed by a specific moderator"
              },
              sortField: {
                type: "string",
                default: "lastReportedAt",
                enum: ["lastReviewedAt", "lastReportedAt"]
              },
              sortDirection: {
                type: "string",
                default: "desc",
                enum: ["asc", "desc"]
              },
              takendown: {
                type: "boolean",
                description: "Get subjects that were taken down"
              },
              appealed: {
                type: "boolean",
                description: "Get subjects in unresolved appealed status"
              },
              limit: {
                type: "integer",
                minimum: 1,
                maximum: 100,
                default: 50
              },
              tags: {
                type: "array",
                items: {
                  type: "string"
                }
              },
              excludeTags: {
                type: "array",
                items: {
                  type: "string"
                }
              },
              cursor: {
                type: "string"
              }
            }
          },
          output: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["subjectStatuses"],
              properties: {
                cursor: {
                  type: "string"
                },
                subjectStatuses: {
                  type: "array",
                  items: {
                    type: "ref",
                    ref: "lex:com.atproto.admin.defs#subjectStatusView"
                  }
                }
              }
            }
          }
        }
      }
    },
    ComAtprotoAdminSearchRepos: {
      lexicon: 1,
      id: "com.atproto.admin.searchRepos",
      defs: {
        main: {
          type: "query",
          description: "Find repositories based on a search term.",
          parameters: {
            type: "params",
            properties: {
              term: {
                type: "string",
                description: "DEPRECATED: use 'q' instead"
              },
              q: {
                type: "string"
              },
              limit: {
                type: "integer",
                minimum: 1,
                maximum: 100,
                default: 50
              },
              cursor: {
                type: "string"
              }
            }
          },
          output: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["repos"],
              properties: {
                cursor: {
                  type: "string"
                },
                repos: {
                  type: "array",
                  items: {
                    type: "ref",
                    ref: "lex:com.atproto.admin.defs#repoView"
                  }
                }
              }
            }
          }
        }
      }
    },
    ComAtprotoAdminSendEmail: {
      lexicon: 1,
      id: "com.atproto.admin.sendEmail",
      defs: {
        main: {
          type: "procedure",
          description: "Send email to a user's account email address.",
          input: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["recipientDid", "content", "senderDid"],
              properties: {
                recipientDid: {
                  type: "string",
                  format: "did"
                },
                content: {
                  type: "string"
                },
                subject: {
                  type: "string"
                },
                senderDid: {
                  type: "string",
                  format: "did"
                },
                comment: {
                  type: "string",
                  description: "Additional comment by the sender that won't be used in the email itself but helpful to provide more context for moderators/reviewers"
                }
              }
            }
          },
          output: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["sent"],
              properties: {
                sent: {
                  type: "boolean"
                }
              }
            }
          }
        }
      }
    },
    ComAtprotoAdminUpdateAccountEmail: {
      lexicon: 1,
      id: "com.atproto.admin.updateAccountEmail",
      defs: {
        main: {
          type: "procedure",
          description: "Administrative action to update an account's email.",
          input: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["account", "email"],
              properties: {
                account: {
                  type: "string",
                  format: "at-identifier",
                  description: "The handle or DID of the repo."
                },
                email: {
                  type: "string"
                }
              }
            }
          }
        }
      }
    },
    ComAtprotoAdminUpdateAccountHandle: {
      lexicon: 1,
      id: "com.atproto.admin.updateAccountHandle",
      defs: {
        main: {
          type: "procedure",
          description: "Administrative action to update an account's handle.",
          input: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["did", "handle"],
              properties: {
                did: {
                  type: "string",
                  format: "did"
                },
                handle: {
                  type: "string",
                  format: "handle"
                }
              }
            }
          }
        }
      }
    },
    ComAtprotoAdminUpdateAccountPassword: {
      lexicon: 1,
      id: "com.atproto.admin.updateAccountPassword",
      defs: {
        main: {
          type: "procedure",
          description: "Update the password for a user account as an administrator.",
          input: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["did", "password"],
              properties: {
                did: {
                  type: "string",
                  format: "did"
                },
                password: {
                  type: "string"
                }
              }
            }
          }
        }
      }
    },
    ComAtprotoAdminUpdateCommunicationTemplate: {
      lexicon: 1,
      id: "com.atproto.admin.updateCommunicationTemplate",
      defs: {
        main: {
          type: "procedure",
          description: "Administrative action to update an existing communication template. Allows passing partial fields to patch specific fields only.",
          input: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["id"],
              properties: {
                id: {
                  type: "string",
                  description: "ID of the template to be updated."
                },
                name: {
                  type: "string",
                  description: "Name of the template."
                },
                contentMarkdown: {
                  type: "string",
                  description: "Content of the template, markdown supported, can contain variable placeholders."
                },
                subject: {
                  type: "string",
                  description: "Subject of the message, used in emails."
                },
                updatedBy: {
                  type: "string",
                  format: "did",
                  description: "DID of the user who is updating the template."
                },
                disabled: {
                  type: "boolean"
                }
              }
            }
          },
          output: {
            encoding: "application/json",
            schema: {
              type: "ref",
              ref: "lex:com.atproto.admin.defs#communicationTemplateView"
            }
          }
        }
      }
    },
    ComAtprotoAdminUpdateSubjectStatus: {
      lexicon: 1,
      id: "com.atproto.admin.updateSubjectStatus",
      defs: {
        main: {
          type: "procedure",
          description: "Update the service-specific admin status of a subject (account, record, or blob).",
          input: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["subject"],
              properties: {
                subject: {
                  type: "union",
                  refs: [
                    "lex:com.atproto.admin.defs#repoRef",
                    "lex:com.atproto.repo.strongRef",
                    "lex:com.atproto.admin.defs#repoBlobRef"
                  ]
                },
                takedown: {
                  type: "ref",
                  ref: "lex:com.atproto.admin.defs#statusAttr"
                }
              }
            }
          },
          output: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["subject"],
              properties: {
                subject: {
                  type: "union",
                  refs: [
                    "lex:com.atproto.admin.defs#repoRef",
                    "lex:com.atproto.repo.strongRef",
                    "lex:com.atproto.admin.defs#repoBlobRef"
                  ]
                },
                takedown: {
                  type: "ref",
                  ref: "lex:com.atproto.admin.defs#statusAttr"
                }
              }
            }
          }
        }
      }
    },
    ComAtprotoIdentityGetRecommendedDidCredentials: {
      lexicon: 1,
      id: "com.atproto.identity.getRecommendedDidCredentials",
      defs: {
        main: {
          type: "query",
          description: "Describe the credentials that should be included in the DID doc of an account that is migrating to this service.",
          output: {
            encoding: "application/json",
            schema: {
              type: "object",
              properties: {
                rotationKeys: {
                  description: "Recommended rotation keys for PLC dids. Should be undefined (or ignored) for did:webs.",
                  type: "array",
                  items: {
                    type: "string"
                  }
                },
                alsoKnownAs: {
                  type: "array",
                  items: {
                    type: "string"
                  }
                },
                verificationMethods: {
                  type: "unknown"
                },
                services: {
                  type: "unknown"
                }
              }
            }
          }
        }
      }
    },
    ComAtprotoIdentityRequestPlcOperationSignature: {
      lexicon: 1,
      id: "com.atproto.identity.requestPlcOperationSignature",
      defs: {
        main: {
          type: "procedure",
          description: "Request an email with a code to in order to request a signed PLC operation. Requires Auth."
        }
      }
    },
    ComAtprotoIdentityResolveHandle: {
      lexicon: 1,
      id: "com.atproto.identity.resolveHandle",
      defs: {
        main: {
          type: "query",
          description: "Resolves a handle (domain name) to a DID.",
          parameters: {
            type: "params",
            required: ["handle"],
            properties: {
              handle: {
                type: "string",
                format: "handle",
                description: "The handle to resolve."
              }
            }
          },
          output: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["did"],
              properties: {
                did: {
                  type: "string",
                  format: "did"
                }
              }
            }
          }
        }
      }
    },
    ComAtprotoIdentitySignPlcOperation: {
      lexicon: 1,
      id: "com.atproto.identity.signPlcOperation",
      defs: {
        main: {
          type: "procedure",
          description: "Signs a PLC operation to update some value(s) in the requesting DID's document.",
          input: {
            encoding: "application/json",
            schema: {
              type: "object",
              properties: {
                token: {
                  description: "A token received through com.atproto.identity.requestPlcOperationSignature",
                  type: "string"
                },
                rotationKeys: {
                  type: "array",
                  items: {
                    type: "string"
                  }
                },
                alsoKnownAs: {
                  type: "array",
                  items: {
                    type: "string"
                  }
                },
                verificationMethods: {
                  type: "unknown"
                },
                services: {
                  type: "unknown"
                }
              }
            }
          },
          output: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["operation"],
              properties: {
                operation: {
                  type: "unknown",
                  description: "A signed DID PLC operation."
                }
              }
            }
          }
        }
      }
    },
    ComAtprotoIdentitySubmitPlcOperation: {
      lexicon: 1,
      id: "com.atproto.identity.submitPlcOperation",
      defs: {
        main: {
          type: "procedure",
          description: "Validates a PLC operation to ensure that it doesn't violate a service's constraints or get the identity into a bad state, then submits it to the PLC registry",
          input: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["operation"],
              properties: {
                operation: {
                  type: "unknown"
                }
              }
            }
          }
        }
      }
    },
    ComAtprotoIdentityUpdateHandle: {
      lexicon: 1,
      id: "com.atproto.identity.updateHandle",
      defs: {
        main: {
          type: "procedure",
          description: "Updates the current account's handle. Verifies handle validity, and updates did:plc document if necessary. Implemented by PDS, and requires auth.",
          input: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["handle"],
              properties: {
                handle: {
                  type: "string",
                  format: "handle",
                  description: "The new handle."
                }
              }
            }
          }
        }
      }
    },
    ComAtprotoLabelDefs: {
      lexicon: 1,
      id: "com.atproto.label.defs",
      defs: {
        label: {
          type: "object",
          description: "Metadata tag on an atproto resource (eg, repo or record).",
          required: ["src", "uri", "val", "cts"],
          properties: {
            src: {
              type: "string",
              format: "did",
              description: "DID of the actor who created this label."
            },
            uri: {
              type: "string",
              format: "uri",
              description: "AT URI of the record, repository (account), or other resource that this label applies to."
            },
            cid: {
              type: "string",
              format: "cid",
              description: "Optionally, CID specifying the specific version of 'uri' resource this label applies to."
            },
            val: {
              type: "string",
              maxLength: 128,
              description: "The short string name of the value or type of this label."
            },
            neg: {
              type: "boolean",
              description: "If true, this is a negation label, overwriting a previous label."
            },
            cts: {
              type: "string",
              format: "datetime",
              description: "Timestamp when this label was created."
            }
          }
        },
        selfLabels: {
          type: "object",
          description: "Metadata tags on an atproto record, published by the author within the record.",
          required: ["values"],
          properties: {
            values: {
              type: "array",
              items: {
                type: "ref",
                ref: "lex:com.atproto.label.defs#selfLabel"
              },
              maxLength: 10
            }
          }
        },
        selfLabel: {
          type: "object",
          description: "Metadata tag on an atproto record, published by the author within the record. Note that schemas should use #selfLabels, not #selfLabel.",
          required: ["val"],
          properties: {
            val: {
              type: "string",
              maxLength: 128,
              description: "The short string name of the value or type of this label."
            }
          }
        }
      }
    },
    ComAtprotoLabelQueryLabels: {
      lexicon: 1,
      id: "com.atproto.label.queryLabels",
      defs: {
        main: {
          type: "query",
          description: "Find labels relevant to the provided AT-URI patterns. Public endpoint for moderation services, though may return different or additional results with auth.",
          parameters: {
            type: "params",
            required: ["uriPatterns"],
            properties: {
              uriPatterns: {
                type: "array",
                items: {
                  type: "string"
                },
                description: "List of AT URI patterns to match (boolean 'OR'). Each may be a prefix (ending with '*'; will match inclusive of the string leading to '*'), or a full URI."
              },
              sources: {
                type: "array",
                items: {
                  type: "string",
                  format: "did"
                },
                description: "Optional list of label sources (DIDs) to filter on."
              },
              limit: {
                type: "integer",
                minimum: 1,
                maximum: 250,
                default: 50
              },
              cursor: {
                type: "string"
              }
            }
          },
          output: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["labels"],
              properties: {
                cursor: {
                  type: "string"
                },
                labels: {
                  type: "array",
                  items: {
                    type: "ref",
                    ref: "lex:com.atproto.label.defs#label"
                  }
                }
              }
            }
          }
        }
      }
    },
    ComAtprotoLabelSubscribeLabels: {
      lexicon: 1,
      id: "com.atproto.label.subscribeLabels",
      defs: {
        main: {
          type: "subscription",
          description: "Subscribe to stream of labels (and negations). Public endpoint implemented by mod services. Uses same sequencing scheme as repo event stream.",
          parameters: {
            type: "params",
            properties: {
              cursor: {
                type: "integer",
                description: "The last known event seq number to backfill from."
              }
            }
          },
          message: {
            schema: {
              type: "union",
              refs: [
                "lex:com.atproto.label.subscribeLabels#labels",
                "lex:com.atproto.label.subscribeLabels#info"
              ]
            }
          },
          errors: [
            {
              name: "FutureCursor"
            }
          ]
        },
        labels: {
          type: "object",
          required: ["seq", "labels"],
          properties: {
            seq: {
              type: "integer"
            },
            labels: {
              type: "array",
              items: {
                type: "ref",
                ref: "lex:com.atproto.label.defs#label"
              }
            }
          }
        },
        info: {
          type: "object",
          required: ["name"],
          properties: {
            name: {
              type: "string",
              knownValues: ["OutdatedCursor"]
            },
            message: {
              type: "string"
            }
          }
        }
      }
    },
    ComAtprotoModerationCreateReport: {
      lexicon: 1,
      id: "com.atproto.moderation.createReport",
      defs: {
        main: {
          type: "procedure",
          description: "Submit a moderation report regarding an atproto account or record. Implemented by moderation services (with PDS proxying), and requires auth.",
          input: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["reasonType", "subject"],
              properties: {
                reasonType: {
                  type: "ref",
                  description: "Indicates the broad category of violation the report is for.",
                  ref: "lex:com.atproto.moderation.defs#reasonType"
                },
                reason: {
                  type: "string",
                  description: "Additional context about the content and violation."
                },
                subject: {
                  type: "union",
                  refs: [
                    "lex:com.atproto.admin.defs#repoRef",
                    "lex:com.atproto.repo.strongRef"
                  ]
                }
              }
            }
          },
          output: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: [
                "id",
                "reasonType",
                "subject",
                "reportedBy",
                "createdAt"
              ],
              properties: {
                id: {
                  type: "integer"
                },
                reasonType: {
                  type: "ref",
                  ref: "lex:com.atproto.moderation.defs#reasonType"
                },
                reason: {
                  type: "string",
                  maxGraphemes: 2e3,
                  maxLength: 2e4
                },
                subject: {
                  type: "union",
                  refs: [
                    "lex:com.atproto.admin.defs#repoRef",
                    "lex:com.atproto.repo.strongRef"
                  ]
                },
                reportedBy: {
                  type: "string",
                  format: "did"
                },
                createdAt: {
                  type: "string",
                  format: "datetime"
                }
              }
            }
          }
        }
      }
    },
    ComAtprotoModerationDefs: {
      lexicon: 1,
      id: "com.atproto.moderation.defs",
      defs: {
        reasonType: {
          type: "string",
          knownValues: [
            "com.atproto.moderation.defs#reasonSpam",
            "com.atproto.moderation.defs#reasonViolation",
            "com.atproto.moderation.defs#reasonMisleading",
            "com.atproto.moderation.defs#reasonSexual",
            "com.atproto.moderation.defs#reasonRude",
            "com.atproto.moderation.defs#reasonOther",
            "com.atproto.moderation.defs#reasonAppeal"
          ]
        },
        reasonSpam: {
          type: "token",
          description: "Spam: frequent unwanted promotion, replies, mentions"
        },
        reasonViolation: {
          type: "token",
          description: "Direct violation of server rules, laws, terms of service"
        },
        reasonMisleading: {
          type: "token",
          description: "Misleading identity, affiliation, or content"
        },
        reasonSexual: {
          type: "token",
          description: "Unwanted or mislabeled sexual content"
        },
        reasonRude: {
          type: "token",
          description: "Rude, harassing, explicit, or otherwise unwelcoming behavior"
        },
        reasonOther: {
          type: "token",
          description: "Other: reports not falling under another report category"
        },
        reasonAppeal: {
          type: "token",
          description: "Appeal: appeal a previously taken moderation action"
        }
      }
    },
    ComAtprotoRepoApplyWrites: {
      lexicon: 1,
      id: "com.atproto.repo.applyWrites",
      defs: {
        main: {
          type: "procedure",
          description: "Apply a batch transaction of repository creates, updates, and deletes. Requires auth, implemented by PDS.",
          input: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["repo", "writes"],
              properties: {
                repo: {
                  type: "string",
                  format: "at-identifier",
                  description: "The handle or DID of the repo (aka, current account)."
                },
                validate: {
                  type: "boolean",
                  default: !0,
                  description: "Can be set to 'false' to skip Lexicon schema validation of record data, for all operations."
                },
                writes: {
                  type: "array",
                  items: {
                    type: "union",
                    refs: [
                      "lex:com.atproto.repo.applyWrites#create",
                      "lex:com.atproto.repo.applyWrites#update",
                      "lex:com.atproto.repo.applyWrites#delete"
                    ],
                    closed: !0
                  }
                },
                swapCommit: {
                  type: "string",
                  description: "If provided, the entire operation will fail if the current repo commit CID does not match this value. Used to prevent conflicting repo mutations.",
                  format: "cid"
                }
              }
            }
          },
          errors: [
            {
              name: "InvalidSwap",
              description: "Indicates that the 'swapCommit' parameter did not match current commit."
            }
          ]
        },
        create: {
          type: "object",
          description: "Operation which creates a new record.",
          required: ["collection", "value"],
          properties: {
            collection: {
              type: "string",
              format: "nsid"
            },
            rkey: {
              type: "string",
              maxLength: 15
            },
            value: {
              type: "unknown"
            }
          }
        },
        update: {
          type: "object",
          description: "Operation which updates an existing record.",
          required: ["collection", "rkey", "value"],
          properties: {
            collection: {
              type: "string",
              format: "nsid"
            },
            rkey: {
              type: "string"
            },
            value: {
              type: "unknown"
            }
          }
        },
        delete: {
          type: "object",
          description: "Operation which deletes an existing record.",
          required: ["collection", "rkey"],
          properties: {
            collection: {
              type: "string",
              format: "nsid"
            },
            rkey: {
              type: "string"
            }
          }
        }
      }
    },
    ComAtprotoRepoCreateRecord: {
      lexicon: 1,
      id: "com.atproto.repo.createRecord",
      defs: {
        main: {
          type: "procedure",
          description: "Create a single new repository record. Requires auth, implemented by PDS.",
          input: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["repo", "collection", "record"],
              properties: {
                repo: {
                  type: "string",
                  format: "at-identifier",
                  description: "The handle or DID of the repo (aka, current account)."
                },
                collection: {
                  type: "string",
                  format: "nsid",
                  description: "The NSID of the record collection."
                },
                rkey: {
                  type: "string",
                  description: "The Record Key.",
                  maxLength: 15
                },
                validate: {
                  type: "boolean",
                  default: !0,
                  description: "Can be set to 'false' to skip Lexicon schema validation of record data."
                },
                record: {
                  type: "unknown",
                  description: "The record itself. Must contain a $type field."
                },
                swapCommit: {
                  type: "string",
                  format: "cid",
                  description: "Compare and swap with the previous commit by CID."
                }
              }
            }
          },
          output: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["uri", "cid"],
              properties: {
                uri: {
                  type: "string",
                  format: "at-uri"
                },
                cid: {
                  type: "string",
                  format: "cid"
                }
              }
            }
          },
          errors: [
            {
              name: "InvalidSwap",
              description: "Indicates that 'swapCommit' didn't match current repo commit."
            }
          ]
        }
      }
    },
    ComAtprotoRepoDeleteRecord: {
      lexicon: 1,
      id: "com.atproto.repo.deleteRecord",
      defs: {
        main: {
          type: "procedure",
          description: "Delete a repository record, or ensure it doesn't exist. Requires auth, implemented by PDS.",
          input: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["repo", "collection", "rkey"],
              properties: {
                repo: {
                  type: "string",
                  format: "at-identifier",
                  description: "The handle or DID of the repo (aka, current account)."
                },
                collection: {
                  type: "string",
                  format: "nsid",
                  description: "The NSID of the record collection."
                },
                rkey: {
                  type: "string",
                  description: "The Record Key."
                },
                swapRecord: {
                  type: "string",
                  format: "cid",
                  description: "Compare and swap with the previous record by CID."
                },
                swapCommit: {
                  type: "string",
                  format: "cid",
                  description: "Compare and swap with the previous commit by CID."
                }
              }
            }
          },
          errors: [
            {
              name: "InvalidSwap"
            }
          ]
        }
      }
    },
    ComAtprotoRepoDescribeRepo: {
      lexicon: 1,
      id: "com.atproto.repo.describeRepo",
      defs: {
        main: {
          type: "query",
          description: "Get information about an account and repository, including the list of collections. Does not require auth.",
          parameters: {
            type: "params",
            required: ["repo"],
            properties: {
              repo: {
                type: "string",
                format: "at-identifier",
                description: "The handle or DID of the repo."
              }
            }
          },
          output: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: [
                "handle",
                "did",
                "didDoc",
                "collections",
                "handleIsCorrect"
              ],
              properties: {
                handle: {
                  type: "string",
                  format: "handle"
                },
                did: {
                  type: "string",
                  format: "did"
                },
                didDoc: {
                  type: "unknown",
                  description: "The complete DID document for this account."
                },
                collections: {
                  type: "array",
                  description: "List of all the collections (NSIDs) for which this repo contains at least one record.",
                  items: {
                    type: "string",
                    format: "nsid"
                  }
                },
                handleIsCorrect: {
                  type: "boolean",
                  description: "Indicates if handle is currently valid (resolves bi-directionally)"
                }
              }
            }
          }
        }
      }
    },
    ComAtprotoRepoGetRecord: {
      lexicon: 1,
      id: "com.atproto.repo.getRecord",
      defs: {
        main: {
          type: "query",
          description: "Get a single record from a repository. Does not require auth.",
          parameters: {
            type: "params",
            required: ["repo", "collection", "rkey"],
            properties: {
              repo: {
                type: "string",
                format: "at-identifier",
                description: "The handle or DID of the repo."
              },
              collection: {
                type: "string",
                format: "nsid",
                description: "The NSID of the record collection."
              },
              rkey: {
                type: "string",
                description: "The Record Key."
              },
              cid: {
                type: "string",
                format: "cid",
                description: "The CID of the version of the record. If not specified, then return the most recent version."
              }
            }
          },
          output: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["uri", "value"],
              properties: {
                uri: {
                  type: "string",
                  format: "at-uri"
                },
                cid: {
                  type: "string",
                  format: "cid"
                },
                value: {
                  type: "unknown"
                }
              }
            }
          }
        }
      }
    },
    ComAtprotoRepoImportRepo: {
      lexicon: 1,
      id: "com.atproto.repo.importRepo",
      defs: {
        main: {
          type: "procedure",
          description: "Import a repo in the form of a CAR file. Requires Content-Length HTTP header to be set.",
          input: {
            encoding: "application/vnd.ipld.car"
          }
        }
      }
    },
    ComAtprotoRepoListMissingBlobs: {
      lexicon: 1,
      id: "com.atproto.repo.listMissingBlobs",
      defs: {
        main: {
          type: "query",
          description: "Returns a list of missing blobs for the requesting account. Intended to be used in the account migration flow.",
          parameters: {
            type: "params",
            properties: {
              limit: {
                type: "integer",
                minimum: 1,
                maximum: 1e3,
                default: 500
              },
              cursor: {
                type: "string"
              }
            }
          },
          output: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["blobs"],
              properties: {
                cursor: {
                  type: "string"
                },
                blobs: {
                  type: "array",
                  items: {
                    type: "ref",
                    ref: "lex:com.atproto.repo.listMissingBlobs#recordBlob"
                  }
                }
              }
            }
          }
        },
        recordBlob: {
          type: "object",
          required: ["cid", "recordUri"],
          properties: {
            cid: {
              type: "string",
              format: "cid"
            },
            recordUri: {
              type: "string",
              format: "at-uri"
            }
          }
        }
      }
    },
    ComAtprotoRepoListRecords: {
      lexicon: 1,
      id: "com.atproto.repo.listRecords",
      defs: {
        main: {
          type: "query",
          description: "List a range of records in a repository, matching a specific collection. Does not require auth.",
          parameters: {
            type: "params",
            required: ["repo", "collection"],
            properties: {
              repo: {
                type: "string",
                format: "at-identifier",
                description: "The handle or DID of the repo."
              },
              collection: {
                type: "string",
                format: "nsid",
                description: "The NSID of the record type."
              },
              limit: {
                type: "integer",
                minimum: 1,
                maximum: 100,
                default: 50,
                description: "The number of records to return."
              },
              cursor: {
                type: "string"
              },
              rkeyStart: {
                type: "string",
                description: "DEPRECATED: The lowest sort-ordered rkey to start from (exclusive)"
              },
              rkeyEnd: {
                type: "string",
                description: "DEPRECATED: The highest sort-ordered rkey to stop at (exclusive)"
              },
              reverse: {
                type: "boolean",
                description: "Flag to reverse the order of the returned records."
              }
            }
          },
          output: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["records"],
              properties: {
                cursor: {
                  type: "string"
                },
                records: {
                  type: "array",
                  items: {
                    type: "ref",
                    ref: "lex:com.atproto.repo.listRecords#record"
                  }
                }
              }
            }
          }
        },
        record: {
          type: "object",
          required: ["uri", "cid", "value"],
          properties: {
            uri: {
              type: "string",
              format: "at-uri"
            },
            cid: {
              type: "string",
              format: "cid"
            },
            value: {
              type: "unknown"
            }
          }
        }
      }
    },
    ComAtprotoRepoPutRecord: {
      lexicon: 1,
      id: "com.atproto.repo.putRecord",
      defs: {
        main: {
          type: "procedure",
          description: "Write a repository record, creating or updating it as needed. Requires auth, implemented by PDS.",
          input: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["repo", "collection", "rkey", "record"],
              nullable: ["swapRecord"],
              properties: {
                repo: {
                  type: "string",
                  format: "at-identifier",
                  description: "The handle or DID of the repo (aka, current account)."
                },
                collection: {
                  type: "string",
                  format: "nsid",
                  description: "The NSID of the record collection."
                },
                rkey: {
                  type: "string",
                  description: "The Record Key.",
                  maxLength: 15
                },
                validate: {
                  type: "boolean",
                  default: !0,
                  description: "Can be set to 'false' to skip Lexicon schema validation of record data."
                },
                record: {
                  type: "unknown",
                  description: "The record to write."
                },
                swapRecord: {
                  type: "string",
                  format: "cid",
                  description: "Compare and swap with the previous record by CID. WARNING: nullable and optional field; may cause problems with golang implementation"
                },
                swapCommit: {
                  type: "string",
                  format: "cid",
                  description: "Compare and swap with the previous commit by CID."
                }
              }
            }
          },
          output: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["uri", "cid"],
              properties: {
                uri: {
                  type: "string",
                  format: "at-uri"
                },
                cid: {
                  type: "string",
                  format: "cid"
                }
              }
            }
          },
          errors: [
            {
              name: "InvalidSwap"
            }
          ]
        }
      }
    },
    ComAtprotoRepoStrongRef: {
      lexicon: 1,
      id: "com.atproto.repo.strongRef",
      description: "A URI with a content-hash fingerprint.",
      defs: {
        main: {
          type: "object",
          required: ["uri", "cid"],
          properties: {
            uri: {
              type: "string",
              format: "at-uri"
            },
            cid: {
              type: "string",
              format: "cid"
            }
          }
        }
      }
    },
    ComAtprotoRepoUploadBlob: {
      lexicon: 1,
      id: "com.atproto.repo.uploadBlob",
      defs: {
        main: {
          type: "procedure",
          description: "Upload a new blob, to be referenced from a repository record. The blob will be deleted if it is not referenced within a time window (eg, minutes). Blob restrictions (mimetype, size, etc) are enforced when the reference is created. Requires auth, implemented by PDS.",
          input: {
            encoding: "*/*"
          },
          output: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["blob"],
              properties: {
                blob: {
                  type: "blob"
                }
              }
            }
          }
        }
      }
    },
    ComAtprotoServerActivateAccount: {
      lexicon: 1,
      id: "com.atproto.server.activateAccount",
      defs: {
        main: {
          type: "procedure",
          description: "Activates a currently deactivated account. Used to finalize account migration after the account's repo is imported and identity is setup."
        }
      }
    },
    ComAtprotoServerCheckAccountStatus: {
      lexicon: 1,
      id: "com.atproto.server.checkAccountStatus",
      defs: {
        main: {
          type: "query",
          description: "Returns the status of an account, especially as pertaining to import or recovery. Can be called many times over the course of an account migration. Requires auth and can only be called pertaining to oneself.",
          output: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: [
                "activated",
                "validDid",
                "repoCommit",
                "repoRev",
                "repoBlocks",
                "indexedRecords",
                "privateStateValues",
                "expectedBlobs",
                "importedBlobs"
              ],
              properties: {
                activated: {
                  type: "boolean"
                },
                validDid: {
                  type: "boolean"
                },
                repoCommit: {
                  type: "string",
                  format: "cid"
                },
                repoRev: {
                  type: "string"
                },
                repoBlocks: {
                  type: "integer"
                },
                indexedRecords: {
                  type: "integer"
                },
                privateStateValues: {
                  type: "integer"
                },
                expectedBlobs: {
                  type: "integer"
                },
                importedBlobs: {
                  type: "integer"
                }
              }
            }
          }
        }
      }
    },
    ComAtprotoServerConfirmEmail: {
      lexicon: 1,
      id: "com.atproto.server.confirmEmail",
      defs: {
        main: {
          type: "procedure",
          description: "Confirm an email using a token from com.atproto.server.requestEmailConfirmation.",
          input: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["email", "token"],
              properties: {
                email: {
                  type: "string"
                },
                token: {
                  type: "string"
                }
              }
            }
          },
          errors: [
            {
              name: "AccountNotFound"
            },
            {
              name: "ExpiredToken"
            },
            {
              name: "InvalidToken"
            },
            {
              name: "InvalidEmail"
            }
          ]
        }
      }
    },
    ComAtprotoServerCreateAccount: {
      lexicon: 1,
      id: "com.atproto.server.createAccount",
      defs: {
        main: {
          type: "procedure",
          description: "Create an account. Implemented by PDS.",
          input: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["handle"],
              properties: {
                email: {
                  type: "string"
                },
                handle: {
                  type: "string",
                  format: "handle",
                  description: "Requested handle for the account."
                },
                did: {
                  type: "string",
                  format: "did",
                  description: "Pre-existing atproto DID, being imported to a new account."
                },
                inviteCode: {
                  type: "string"
                },
                verificationCode: {
                  type: "string"
                },
                verificationPhone: {
                  type: "string"
                },
                password: {
                  type: "string",
                  description: "Initial account password. May need to meet instance-specific password strength requirements."
                },
                recoveryKey: {
                  type: "string",
                  description: "DID PLC rotation key (aka, recovery key) to be included in PLC creation operation."
                },
                plcOp: {
                  type: "unknown",
                  description: "A signed DID PLC operation to be submitted as part of importing an existing account to this instance. NOTE: this optional field may be updated when full account migration is implemented."
                }
              }
            }
          },
          output: {
            encoding: "application/json",
            schema: {
              type: "object",
              description: "Account login session returned on successful account creation.",
              required: ["accessJwt", "refreshJwt", "handle", "did"],
              properties: {
                accessJwt: {
                  type: "string"
                },
                refreshJwt: {
                  type: "string"
                },
                handle: {
                  type: "string",
                  format: "handle"
                },
                did: {
                  type: "string",
                  format: "did",
                  description: "The DID of the new account."
                },
                didDoc: {
                  type: "unknown",
                  description: "Complete DID document."
                }
              }
            }
          },
          errors: [
            {
              name: "InvalidHandle"
            },
            {
              name: "InvalidPassword"
            },
            {
              name: "InvalidInviteCode"
            },
            {
              name: "HandleNotAvailable"
            },
            {
              name: "UnsupportedDomain"
            },
            {
              name: "UnresolvableDid"
            },
            {
              name: "IncompatibleDidDoc"
            }
          ]
        }
      }
    },
    ComAtprotoServerCreateAppPassword: {
      lexicon: 1,
      id: "com.atproto.server.createAppPassword",
      defs: {
        main: {
          type: "procedure",
          description: "Create an App Password.",
          input: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["name"],
              properties: {
                name: {
                  type: "string",
                  description: "A short name for the App Password, to help distinguish them."
                }
              }
            }
          },
          output: {
            encoding: "application/json",
            schema: {
              type: "ref",
              ref: "lex:com.atproto.server.createAppPassword#appPassword"
            }
          },
          errors: [
            {
              name: "AccountTakedown"
            }
          ]
        },
        appPassword: {
          type: "object",
          required: ["name", "password", "createdAt"],
          properties: {
            name: {
              type: "string"
            },
            password: {
              type: "string"
            },
            createdAt: {
              type: "string",
              format: "datetime"
            }
          }
        }
      }
    },
    ComAtprotoServerCreateInviteCode: {
      lexicon: 1,
      id: "com.atproto.server.createInviteCode",
      defs: {
        main: {
          type: "procedure",
          description: "Create an invite code.",
          input: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["useCount"],
              properties: {
                useCount: {
                  type: "integer"
                },
                forAccount: {
                  type: "string",
                  format: "did"
                }
              }
            }
          },
          output: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["code"],
              properties: {
                code: {
                  type: "string"
                }
              }
            }
          }
        }
      }
    },
    ComAtprotoServerCreateInviteCodes: {
      lexicon: 1,
      id: "com.atproto.server.createInviteCodes",
      defs: {
        main: {
          type: "procedure",
          description: "Create invite codes.",
          input: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["codeCount", "useCount"],
              properties: {
                codeCount: {
                  type: "integer",
                  default: 1
                },
                useCount: {
                  type: "integer"
                },
                forAccounts: {
                  type: "array",
                  items: {
                    type: "string",
                    format: "did"
                  }
                }
              }
            }
          },
          output: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["codes"],
              properties: {
                codes: {
                  type: "array",
                  items: {
                    type: "ref",
                    ref: "lex:com.atproto.server.createInviteCodes#accountCodes"
                  }
                }
              }
            }
          }
        },
        accountCodes: {
          type: "object",
          required: ["account", "codes"],
          properties: {
            account: {
              type: "string"
            },
            codes: {
              type: "array",
              items: {
                type: "string"
              }
            }
          }
        }
      }
    },
    ComAtprotoServerCreateSession: {
      lexicon: 1,
      id: "com.atproto.server.createSession",
      defs: {
        main: {
          type: "procedure",
          description: "Create an authentication session.",
          input: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["identifier", "password"],
              properties: {
                identifier: {
                  type: "string",
                  description: "Handle or other identifier supported by the server for the authenticating user."
                },
                password: {
                  type: "string"
                }
              }
            }
          },
          output: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["accessJwt", "refreshJwt", "handle", "did"],
              properties: {
                accessJwt: {
                  type: "string"
                },
                refreshJwt: {
                  type: "string"
                },
                handle: {
                  type: "string",
                  format: "handle"
                },
                did: {
                  type: "string",
                  format: "did"
                },
                didDoc: {
                  type: "unknown"
                },
                email: {
                  type: "string"
                },
                emailConfirmed: {
                  type: "boolean"
                }
              }
            }
          },
          errors: [
            {
              name: "AccountTakedown"
            }
          ]
        }
      }
    },
    ComAtprotoServerDeactivateAccount: {
      lexicon: 1,
      id: "com.atproto.server.deactivateAccount",
      defs: {
        main: {
          type: "procedure",
          description: "Deactivates a currently active account. Stops serving of repo, and future writes to repo until reactivated. Used to finalize account migration with the old host after the account has been activated on the new host.",
          input: {
            encoding: "application/json",
            schema: {
              type: "object",
              properties: {
                deleteAfter: {
                  type: "string",
                  format: "datetime",
                  description: "A recommendation to server as to how long they should hold onto the deactivated account before deleting."
                }
              }
            }
          }
        }
      }
    },
    ComAtprotoServerDefs: {
      lexicon: 1,
      id: "com.atproto.server.defs",
      defs: {
        inviteCode: {
          type: "object",
          required: [
            "code",
            "available",
            "disabled",
            "forAccount",
            "createdBy",
            "createdAt",
            "uses"
          ],
          properties: {
            code: {
              type: "string"
            },
            available: {
              type: "integer"
            },
            disabled: {
              type: "boolean"
            },
            forAccount: {
              type: "string"
            },
            createdBy: {
              type: "string"
            },
            createdAt: {
              type: "string",
              format: "datetime"
            },
            uses: {
              type: "array",
              items: {
                type: "ref",
                ref: "lex:com.atproto.server.defs#inviteCodeUse"
              }
            }
          }
        },
        inviteCodeUse: {
          type: "object",
          required: ["usedBy", "usedAt"],
          properties: {
            usedBy: {
              type: "string",
              format: "did"
            },
            usedAt: {
              type: "string",
              format: "datetime"
            }
          }
        }
      }
    },
    ComAtprotoServerDeleteAccount: {
      lexicon: 1,
      id: "com.atproto.server.deleteAccount",
      defs: {
        main: {
          type: "procedure",
          description: "Delete an actor's account with a token and password. Can only be called after requesting a deletion token. Requires auth.",
          input: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["did", "password", "token"],
              properties: {
                did: {
                  type: "string",
                  format: "did"
                },
                password: {
                  type: "string"
                },
                token: {
                  type: "string"
                }
              }
            }
          },
          errors: [
            {
              name: "ExpiredToken"
            },
            {
              name: "InvalidToken"
            }
          ]
        }
      }
    },
    ComAtprotoServerDeleteSession: {
      lexicon: 1,
      id: "com.atproto.server.deleteSession",
      defs: {
        main: {
          type: "procedure",
          description: "Delete the current session. Requires auth."
        }
      }
    },
    ComAtprotoServerDescribeServer: {
      lexicon: 1,
      id: "com.atproto.server.describeServer",
      defs: {
        main: {
          type: "query",
          description: "Describes the server's account creation requirements and capabilities. Implemented by PDS.",
          output: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["did", "availableUserDomains"],
              properties: {
                inviteCodeRequired: {
                  type: "boolean",
                  description: "If true, an invite code must be supplied to create an account on this instance."
                },
                phoneVerificationRequired: {
                  type: "boolean",
                  description: "If true, a phone verification token must be supplied to create an account on this instance."
                },
                availableUserDomains: {
                  type: "array",
                  description: "List of domain suffixes that can be used in account handles.",
                  items: {
                    type: "string"
                  }
                },
                links: {
                  type: "ref",
                  description: "URLs of service policy documents.",
                  ref: "lex:com.atproto.server.describeServer#links"
                },
                did: {
                  type: "string",
                  format: "did"
                }
              }
            }
          }
        },
        links: {
          type: "object",
          properties: {
            privacyPolicy: {
              type: "string"
            },
            termsOfService: {
              type: "string"
            }
          }
        }
      }
    },
    ComAtprotoServerGetAccountInviteCodes: {
      lexicon: 1,
      id: "com.atproto.server.getAccountInviteCodes",
      defs: {
        main: {
          type: "query",
          description: "Get all invite codes for the current account. Requires auth.",
          parameters: {
            type: "params",
            properties: {
              includeUsed: {
                type: "boolean",
                default: !0
              },
              createAvailable: {
                type: "boolean",
                default: !0,
                description: "Controls whether any new 'earned' but not 'created' invites should be created."
              }
            }
          },
          output: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["codes"],
              properties: {
                codes: {
                  type: "array",
                  items: {
                    type: "ref",
                    ref: "lex:com.atproto.server.defs#inviteCode"
                  }
                }
              }
            }
          },
          errors: [
            {
              name: "DuplicateCreate"
            }
          ]
        }
      }
    },
    ComAtprotoServerGetServiceAuth: {
      lexicon: 1,
      id: "com.atproto.server.getServiceAuth",
      defs: {
        main: {
          type: "query",
          description: "Get a signed token on behalf of the requesting DID for the requested service.",
          parameters: {
            type: "params",
            required: ["aud"],
            properties: {
              aud: {
                type: "string",
                format: "did",
                description: "The DID of the service that the token will be used to authenticate with"
              }
            }
          },
          output: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["token"],
              properties: {
                token: {
                  type: "string"
                }
              }
            }
          }
        }
      }
    },
    ComAtprotoServerGetSession: {
      lexicon: 1,
      id: "com.atproto.server.getSession",
      defs: {
        main: {
          type: "query",
          description: "Get information about the current auth session. Requires auth.",
          output: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["handle", "did"],
              properties: {
                handle: {
                  type: "string",
                  format: "handle"
                },
                did: {
                  type: "string",
                  format: "did"
                },
                email: {
                  type: "string"
                },
                emailConfirmed: {
                  type: "boolean"
                },
                didDoc: {
                  type: "unknown"
                }
              }
            }
          }
        }
      }
    },
    ComAtprotoServerListAppPasswords: {
      lexicon: 1,
      id: "com.atproto.server.listAppPasswords",
      defs: {
        main: {
          type: "query",
          description: "List all App Passwords.",
          output: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["passwords"],
              properties: {
                passwords: {
                  type: "array",
                  items: {
                    type: "ref",
                    ref: "lex:com.atproto.server.listAppPasswords#appPassword"
                  }
                }
              }
            }
          },
          errors: [
            {
              name: "AccountTakedown"
            }
          ]
        },
        appPassword: {
          type: "object",
          required: ["name", "createdAt"],
          properties: {
            name: {
              type: "string"
            },
            createdAt: {
              type: "string",
              format: "datetime"
            }
          }
        }
      }
    },
    ComAtprotoServerRefreshSession: {
      lexicon: 1,
      id: "com.atproto.server.refreshSession",
      defs: {
        main: {
          type: "procedure",
          description: "Refresh an authentication session. Requires auth using the 'refreshJwt' (not the 'accessJwt').",
          output: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["accessJwt", "refreshJwt", "handle", "did"],
              properties: {
                accessJwt: {
                  type: "string"
                },
                refreshJwt: {
                  type: "string"
                },
                handle: {
                  type: "string",
                  format: "handle"
                },
                did: {
                  type: "string",
                  format: "did"
                },
                didDoc: {
                  type: "unknown"
                }
              }
            }
          },
          errors: [
            {
              name: "AccountTakedown"
            }
          ]
        }
      }
    },
    ComAtprotoServerRequestAccountDelete: {
      lexicon: 1,
      id: "com.atproto.server.requestAccountDelete",
      defs: {
        main: {
          type: "procedure",
          description: "Initiate a user account deletion via email."
        }
      }
    },
    ComAtprotoServerRequestEmailConfirmation: {
      lexicon: 1,
      id: "com.atproto.server.requestEmailConfirmation",
      defs: {
        main: {
          type: "procedure",
          description: "Request an email with a code to confirm ownership of email."
        }
      }
    },
    ComAtprotoServerRequestEmailUpdate: {
      lexicon: 1,
      id: "com.atproto.server.requestEmailUpdate",
      defs: {
        main: {
          type: "procedure",
          description: "Request a token in order to update email.",
          output: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["tokenRequired"],
              properties: {
                tokenRequired: {
                  type: "boolean"
                }
              }
            }
          }
        }
      }
    },
    ComAtprotoServerRequestPasswordReset: {
      lexicon: 1,
      id: "com.atproto.server.requestPasswordReset",
      defs: {
        main: {
          type: "procedure",
          description: "Initiate a user account password reset via email.",
          input: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["email"],
              properties: {
                email: {
                  type: "string"
                }
              }
            }
          }
        }
      }
    },
    ComAtprotoServerReserveSigningKey: {
      lexicon: 1,
      id: "com.atproto.server.reserveSigningKey",
      defs: {
        main: {
          type: "procedure",
          description: "Reserve a repo signing key, for use with account creation. Necessary so that a DID PLC update operation can be constructed during an account migraiton. Public and does not require auth; implemented by PDS. NOTE: this endpoint may change when full account migration is implemented.",
          input: {
            encoding: "application/json",
            schema: {
              type: "object",
              properties: {
                did: {
                  type: "string",
                  format: "did",
                  description: "The DID to reserve a key for."
                }
              }
            }
          },
          output: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["signingKey"],
              properties: {
                signingKey: {
                  type: "string",
                  description: "The public key for the reserved signing key, in did:key serialization."
                }
              }
            }
          }
        }
      }
    },
    ComAtprotoServerResetPassword: {
      lexicon: 1,
      id: "com.atproto.server.resetPassword",
      defs: {
        main: {
          type: "procedure",
          description: "Reset a user account password using a token.",
          input: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["token", "password"],
              properties: {
                token: {
                  type: "string"
                },
                password: {
                  type: "string"
                }
              }
            }
          },
          errors: [
            {
              name: "ExpiredToken"
            },
            {
              name: "InvalidToken"
            }
          ]
        }
      }
    },
    ComAtprotoServerRevokeAppPassword: {
      lexicon: 1,
      id: "com.atproto.server.revokeAppPassword",
      defs: {
        main: {
          type: "procedure",
          description: "Revoke an App Password by name.",
          input: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["name"],
              properties: {
                name: {
                  type: "string"
                }
              }
            }
          }
        }
      }
    },
    ComAtprotoServerUpdateEmail: {
      lexicon: 1,
      id: "com.atproto.server.updateEmail",
      defs: {
        main: {
          type: "procedure",
          description: "Update an account's email.",
          input: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["email"],
              properties: {
                email: {
                  type: "string"
                },
                token: {
                  type: "string",
                  description: "Requires a token from com.atproto.sever.requestEmailUpdate if the account's email has been confirmed."
                }
              }
            }
          },
          errors: [
            {
              name: "ExpiredToken"
            },
            {
              name: "InvalidToken"
            },
            {
              name: "TokenRequired"
            }
          ]
        }
      }
    },
    ComAtprotoSyncGetBlob: {
      lexicon: 1,
      id: "com.atproto.sync.getBlob",
      defs: {
        main: {
          type: "query",
          description: "Get a blob associated with a given account. Returns the full blob as originally uploaded. Does not require auth; implemented by PDS.",
          parameters: {
            type: "params",
            required: ["did", "cid"],
            properties: {
              did: {
                type: "string",
                format: "did",
                description: "The DID of the account."
              },
              cid: {
                type: "string",
                format: "cid",
                description: "The CID of the blob to fetch"
              }
            }
          },
          output: {
            encoding: "*/*"
          }
        }
      }
    },
    ComAtprotoSyncGetBlocks: {
      lexicon: 1,
      id: "com.atproto.sync.getBlocks",
      defs: {
        main: {
          type: "query",
          description: "Get data blocks from a given repo, by CID. For example, intermediate MST nodes, or records. Does not require auth; implemented by PDS.",
          parameters: {
            type: "params",
            required: ["did", "cids"],
            properties: {
              did: {
                type: "string",
                format: "did",
                description: "The DID of the repo."
              },
              cids: {
                type: "array",
                items: {
                  type: "string",
                  format: "cid"
                }
              }
            }
          },
          output: {
            encoding: "application/vnd.ipld.car"
          }
        }
      }
    },
    ComAtprotoSyncGetCheckout: {
      lexicon: 1,
      id: "com.atproto.sync.getCheckout",
      defs: {
        main: {
          type: "query",
          description: "DEPRECATED - please use com.atproto.sync.getRepo instead",
          parameters: {
            type: "params",
            required: ["did"],
            properties: {
              did: {
                type: "string",
                format: "did",
                description: "The DID of the repo."
              }
            }
          },
          output: {
            encoding: "application/vnd.ipld.car"
          }
        }
      }
    },
    ComAtprotoSyncGetHead: {
      lexicon: 1,
      id: "com.atproto.sync.getHead",
      defs: {
        main: {
          type: "query",
          description: "DEPRECATED - please use com.atproto.sync.getLatestCommit instead",
          parameters: {
            type: "params",
            required: ["did"],
            properties: {
              did: {
                type: "string",
                format: "did",
                description: "The DID of the repo."
              }
            }
          },
          output: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["root"],
              properties: {
                root: {
                  type: "string",
                  format: "cid"
                }
              }
            }
          },
          errors: [
            {
              name: "HeadNotFound"
            }
          ]
        }
      }
    },
    ComAtprotoSyncGetLatestCommit: {
      lexicon: 1,
      id: "com.atproto.sync.getLatestCommit",
      defs: {
        main: {
          type: "query",
          description: "Get the current commit CID & revision of the specified repo. Does not require auth.",
          parameters: {
            type: "params",
            required: ["did"],
            properties: {
              did: {
                type: "string",
                format: "did",
                description: "The DID of the repo."
              }
            }
          },
          output: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["cid", "rev"],
              properties: {
                cid: {
                  type: "string",
                  format: "cid"
                },
                rev: {
                  type: "string"
                }
              }
            }
          },
          errors: [
            {
              name: "RepoNotFound"
            }
          ]
        }
      }
    },
    ComAtprotoSyncGetRecord: {
      lexicon: 1,
      id: "com.atproto.sync.getRecord",
      defs: {
        main: {
          type: "query",
          description: "Get data blocks needed to prove the existence or non-existence of record in the current version of repo. Does not require auth.",
          parameters: {
            type: "params",
            required: ["did", "collection", "rkey"],
            properties: {
              did: {
                type: "string",
                format: "did",
                description: "The DID of the repo."
              },
              collection: {
                type: "string",
                format: "nsid"
              },
              rkey: {
                type: "string",
                description: "Record Key"
              },
              commit: {
                type: "string",
                format: "cid",
                description: "An optional past commit CID."
              }
            }
          },
          output: {
            encoding: "application/vnd.ipld.car"
          }
        }
      }
    },
    ComAtprotoSyncGetRepo: {
      lexicon: 1,
      id: "com.atproto.sync.getRepo",
      defs: {
        main: {
          type: "query",
          description: "Download a repository export as CAR file. Optionally only a 'diff' since a previous revision. Does not require auth; implemented by PDS.",
          parameters: {
            type: "params",
            required: ["did"],
            properties: {
              did: {
                type: "string",
                format: "did",
                description: "The DID of the repo."
              },
              since: {
                type: "string",
                description: "The revision ('rev') of the repo to create a diff from."
              }
            }
          },
          output: {
            encoding: "application/vnd.ipld.car"
          }
        }
      }
    },
    ComAtprotoSyncListBlobs: {
      lexicon: 1,
      id: "com.atproto.sync.listBlobs",
      defs: {
        main: {
          type: "query",
          description: "List blob CIDso for an account, since some repo revision. Does not require auth; implemented by PDS.",
          parameters: {
            type: "params",
            required: ["did"],
            properties: {
              did: {
                type: "string",
                format: "did",
                description: "The DID of the repo."
              },
              since: {
                type: "string",
                description: "Optional revision of the repo to list blobs since."
              },
              limit: {
                type: "integer",
                minimum: 1,
                maximum: 1e3,
                default: 500
              },
              cursor: {
                type: "string"
              }
            }
          },
          output: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["cids"],
              properties: {
                cursor: {
                  type: "string"
                },
                cids: {
                  type: "array",
                  items: {
                    type: "string",
                    format: "cid"
                  }
                }
              }
            }
          }
        }
      }
    },
    ComAtprotoSyncListRepos: {
      lexicon: 1,
      id: "com.atproto.sync.listRepos",
      defs: {
        main: {
          type: "query",
          description: "Enumerates all the DID, rev, and commit CID for all repos hosted by this service. Does not require auth; implemented by PDS and Relay.",
          parameters: {
            type: "params",
            properties: {
              limit: {
                type: "integer",
                minimum: 1,
                maximum: 1e3,
                default: 500
              },
              cursor: {
                type: "string"
              }
            }
          },
          output: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["repos"],
              properties: {
                cursor: {
                  type: "string"
                },
                repos: {
                  type: "array",
                  items: {
                    type: "ref",
                    ref: "lex:com.atproto.sync.listRepos#repo"
                  }
                }
              }
            }
          }
        },
        repo: {
          type: "object",
          required: ["did", "head", "rev"],
          properties: {
            did: {
              type: "string",
              format: "did"
            },
            head: {
              type: "string",
              format: "cid",
              description: "Current repo commit CID"
            },
            rev: {
              type: "string"
            }
          }
        }
      }
    },
    ComAtprotoSyncNotifyOfUpdate: {
      lexicon: 1,
      id: "com.atproto.sync.notifyOfUpdate",
      defs: {
        main: {
          type: "procedure",
          description: "Notify a crawling service of a recent update, and that crawling should resume. Intended use is after a gap between repo stream events caused the crawling service to disconnect. Does not require auth; implemented by Relay.",
          input: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["hostname"],
              properties: {
                hostname: {
                  type: "string",
                  description: "Hostname of the current service (usually a PDS) that is notifying of update."
                }
              }
            }
          }
        }
      }
    },
    ComAtprotoSyncRequestCrawl: {
      lexicon: 1,
      id: "com.atproto.sync.requestCrawl",
      defs: {
        main: {
          type: "procedure",
          description: "Request a service to persistently crawl hosted repos. Expected use is new PDS instances declaring their existence to Relays. Does not require auth.",
          input: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["hostname"],
              properties: {
                hostname: {
                  type: "string",
                  description: "Hostname of the current service (eg, PDS) that is requesting to be crawled."
                }
              }
            }
          }
        }
      }
    },
    ComAtprotoSyncSubscribeRepos: {
      lexicon: 1,
      id: "com.atproto.sync.subscribeRepos",
      defs: {
        main: {
          type: "subscription",
          description: "Repository event stream, aka Firehose endpoint. Outputs repo commits with diff data, and identity update events, for all repositories on the current server. See the atproto specifications for details around stream sequencing, repo versioning, CAR diff format, and more. Public and does not require auth; implemented by PDS and Relay.",
          parameters: {
            type: "params",
            properties: {
              cursor: {
                type: "integer",
                description: "The last known event seq number to backfill from."
              }
            }
          },
          message: {
            schema: {
              type: "union",
              refs: [
                "lex:com.atproto.sync.subscribeRepos#commit",
                "lex:com.atproto.sync.subscribeRepos#identity",
                "lex:com.atproto.sync.subscribeRepos#handle",
                "lex:com.atproto.sync.subscribeRepos#migrate",
                "lex:com.atproto.sync.subscribeRepos#tombstone",
                "lex:com.atproto.sync.subscribeRepos#info"
              ]
            }
          },
          errors: [
            {
              name: "FutureCursor"
            },
            {
              name: "ConsumerTooSlow",
              description: "If the consumer of the stream can not keep up with events, and a backlog gets too large, the server will drop the connection."
            }
          ]
        },
        commit: {
          type: "object",
          description: "Represents an update of repository state. Note that empty commits are allowed, which include no repo data changes, but an update to rev and signature.",
          required: [
            "seq",
            "rebase",
            "tooBig",
            "repo",
            "commit",
            "rev",
            "since",
            "blocks",
            "ops",
            "blobs",
            "time"
          ],
          nullable: ["prev", "since"],
          properties: {
            seq: {
              type: "integer",
              description: "The stream sequence number of this message."
            },
            rebase: {
              type: "boolean",
              description: "DEPRECATED -- unused"
            },
            tooBig: {
              type: "boolean",
              description: "Indicates that this commit contained too many ops, or data size was too large. Consumers will need to make a separate request to get missing data."
            },
            repo: {
              type: "string",
              format: "did",
              description: "The repo this event comes from."
            },
            commit: {
              type: "cid-link",
              description: "Repo commit object CID."
            },
            prev: {
              type: "cid-link",
              description: "DEPRECATED -- unused. WARNING -- nullable and optional; stick with optional to ensure golang interoperability."
            },
            rev: {
              type: "string",
              description: "The rev of the emitted commit. Note that this information is also in the commit object included in blocks, unless this is a tooBig event."
            },
            since: {
              type: "string",
              description: "The rev of the last emitted commit from this repo (if any)."
            },
            blocks: {
              type: "bytes",
              description: "CAR file containing relevant blocks, as a diff since the previous repo state.",
              maxLength: 1e6
            },
            ops: {
              type: "array",
              items: {
                type: "ref",
                ref: "lex:com.atproto.sync.subscribeRepos#repoOp",
                description: "List of repo mutation operations in this commit (eg, records created, updated, or deleted)."
              },
              maxLength: 200
            },
            blobs: {
              type: "array",
              items: {
                type: "cid-link",
                description: "List of new blobs (by CID) referenced by records in this commit."
              }
            },
            time: {
              type: "string",
              format: "datetime",
              description: "Timestamp of when this message was originally broadcast."
            }
          }
        },
        identity: {
          type: "object",
          description: "Represents a change to an account's identity. Could be an updated handle, signing key, or pds hosting endpoint. Serves as a prod to all downstream services to refresh their identity cache.",
          required: ["seq", "did", "time"],
          properties: {
            seq: {
              type: "integer"
            },
            did: {
              type: "string",
              format: "did"
            },
            time: {
              type: "string",
              format: "datetime"
            }
          }
        },
        handle: {
          type: "object",
          description: "Represents an update of the account's handle, or transition to/from invalid state. NOTE: Will be deprecated in favor of #identity.",
          required: ["seq", "did", "handle", "time"],
          properties: {
            seq: {
              type: "integer"
            },
            did: {
              type: "string",
              format: "did"
            },
            handle: {
              type: "string",
              format: "handle"
            },
            time: {
              type: "string",
              format: "datetime"
            }
          }
        },
        migrate: {
          type: "object",
          description: "Represents an account moving from one PDS instance to another. NOTE: not implemented; account migration uses #identity instead",
          required: ["seq", "did", "migrateTo", "time"],
          nullable: ["migrateTo"],
          properties: {
            seq: {
              type: "integer"
            },
            did: {
              type: "string",
              format: "did"
            },
            migrateTo: {
              type: "string"
            },
            time: {
              type: "string",
              format: "datetime"
            }
          }
        },
        tombstone: {
          type: "object",
          description: "Indicates that an account has been deleted. NOTE: may be deprecated in favor of #identity or a future #account event",
          required: ["seq", "did", "time"],
          properties: {
            seq: {
              type: "integer"
            },
            did: {
              type: "string",
              format: "did"
            },
            time: {
              type: "string",
              format: "datetime"
            }
          }
        },
        info: {
          type: "object",
          required: ["name"],
          properties: {
            name: {
              type: "string",
              knownValues: ["OutdatedCursor"]
            },
            message: {
              type: "string"
            }
          }
        },
        repoOp: {
          type: "object",
          description: "A repo operation, ie a mutation of a single record.",
          required: ["action", "path", "cid"],
          nullable: ["cid"],
          properties: {
            action: {
              type: "string",
              knownValues: ["create", "update", "delete"]
            },
            path: {
              type: "string"
            },
            cid: {
              type: "cid-link",
              description: "For creates and updates, the new record CID. For deletions, null."
            }
          }
        }
      }
    },
    ComAtprotoTempCheckSignupQueue: {
      lexicon: 1,
      id: "com.atproto.temp.checkSignupQueue",
      defs: {
        main: {
          type: "query",
          description: "Check accounts location in signup queue.",
          output: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["activated"],
              properties: {
                activated: {
                  type: "boolean"
                },
                placeInQueue: {
                  type: "integer"
                },
                estimatedTimeMs: {
                  type: "integer"
                }
              }
            }
          }
        }
      }
    },
    ComAtprotoTempFetchLabels: {
      lexicon: 1,
      id: "com.atproto.temp.fetchLabels",
      defs: {
        main: {
          type: "query",
          description: "DEPRECATED: use queryLabels or subscribeLabels instead -- Fetch all labels from a labeler created after a certain date.",
          parameters: {
            type: "params",
            properties: {
              since: {
                type: "integer"
              },
              limit: {
                type: "integer",
                minimum: 1,
                maximum: 250,
                default: 50
              }
            }
          },
          output: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["labels"],
              properties: {
                labels: {
                  type: "array",
                  items: {
                    type: "ref",
                    ref: "lex:com.atproto.label.defs#label"
                  }
                }
              }
            }
          }
        }
      }
    },
    ComAtprotoTempRequestPhoneVerification: {
      lexicon: 1,
      id: "com.atproto.temp.requestPhoneVerification",
      defs: {
        main: {
          type: "procedure",
          description: "Request a verification code to be sent to the supplied phone number",
          input: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["phoneNumber"],
              properties: {
                phoneNumber: {
                  type: "string"
                }
              }
            }
          }
        }
      }
    },
    AppBskyActorDefs: {
      lexicon: 1,
      id: "app.bsky.actor.defs",
      defs: {
        profileViewBasic: {
          type: "object",
          required: ["did", "handle"],
          properties: {
            did: {
              type: "string",
              format: "did"
            },
            handle: {
              type: "string",
              format: "handle"
            },
            displayName: {
              type: "string",
              maxGraphemes: 64,
              maxLength: 640
            },
            avatar: {
              type: "string"
            },
            viewer: {
              type: "ref",
              ref: "lex:app.bsky.actor.defs#viewerState"
            },
            labels: {
              type: "array",
              items: {
                type: "ref",
                ref: "lex:com.atproto.label.defs#label"
              }
            }
          }
        },
        profileView: {
          type: "object",
          required: ["did", "handle"],
          properties: {
            did: {
              type: "string",
              format: "did"
            },
            handle: {
              type: "string",
              format: "handle"
            },
            displayName: {
              type: "string",
              maxGraphemes: 64,
              maxLength: 640
            },
            description: {
              type: "string",
              maxGraphemes: 256,
              maxLength: 2560
            },
            avatar: {
              type: "string"
            },
            indexedAt: {
              type: "string",
              format: "datetime"
            },
            viewer: {
              type: "ref",
              ref: "lex:app.bsky.actor.defs#viewerState"
            },
            labels: {
              type: "array",
              items: {
                type: "ref",
                ref: "lex:com.atproto.label.defs#label"
              }
            }
          }
        },
        profileViewDetailed: {
          type: "object",
          required: ["did", "handle"],
          properties: {
            did: {
              type: "string",
              format: "did"
            },
            handle: {
              type: "string",
              format: "handle"
            },
            displayName: {
              type: "string",
              maxGraphemes: 64,
              maxLength: 640
            },
            description: {
              type: "string",
              maxGraphemes: 256,
              maxLength: 2560
            },
            avatar: {
              type: "string"
            },
            banner: {
              type: "string"
            },
            followersCount: {
              type: "integer"
            },
            followsCount: {
              type: "integer"
            },
            postsCount: {
              type: "integer"
            },
            indexedAt: {
              type: "string",
              format: "datetime"
            },
            viewer: {
              type: "ref",
              ref: "lex:app.bsky.actor.defs#viewerState"
            },
            labels: {
              type: "array",
              items: {
                type: "ref",
                ref: "lex:com.atproto.label.defs#label"
              }
            }
          }
        },
        viewerState: {
          type: "object",
          description: "Metadata about the requesting account's relationship with the subject account. Only has meaningful content for authed requests.",
          properties: {
            muted: {
              type: "boolean"
            },
            mutedByList: {
              type: "ref",
              ref: "lex:app.bsky.graph.defs#listViewBasic"
            },
            blockedBy: {
              type: "boolean"
            },
            blocking: {
              type: "string",
              format: "at-uri"
            },
            blockingByList: {
              type: "ref",
              ref: "lex:app.bsky.graph.defs#listViewBasic"
            },
            following: {
              type: "string",
              format: "at-uri"
            },
            followedBy: {
              type: "string",
              format: "at-uri"
            }
          }
        },
        preferences: {
          type: "array",
          items: {
            type: "union",
            refs: [
              "lex:app.bsky.actor.defs#adultContentPref",
              "lex:app.bsky.actor.defs#contentLabelPref",
              "lex:app.bsky.actor.defs#savedFeedsPref",
              "lex:app.bsky.actor.defs#personalDetailsPref",
              "lex:app.bsky.actor.defs#feedViewPref",
              "lex:app.bsky.actor.defs#threadViewPref",
              "lex:app.bsky.actor.defs#interestsPref",
              "lex:app.bsky.actor.defs#mutedWordsPref",
              "lex:app.bsky.actor.defs#hiddenPostsPref"
            ]
          }
        },
        adultContentPref: {
          type: "object",
          required: ["enabled"],
          properties: {
            enabled: {
              type: "boolean",
              default: !1
            }
          }
        },
        contentLabelPref: {
          type: "object",
          required: ["label", "visibility"],
          properties: {
            label: {
              type: "string"
            },
            visibility: {
              type: "string",
              knownValues: ["show", "warn", "hide"]
            }
          }
        },
        savedFeedsPref: {
          type: "object",
          required: ["pinned", "saved"],
          properties: {
            pinned: {
              type: "array",
              items: {
                type: "string",
                format: "at-uri"
              }
            },
            saved: {
              type: "array",
              items: {
                type: "string",
                format: "at-uri"
              }
            },
            timelineIndex: {
              type: "integer"
            }
          }
        },
        personalDetailsPref: {
          type: "object",
          properties: {
            birthDate: {
              type: "string",
              format: "datetime",
              description: "The birth date of account owner."
            }
          }
        },
        feedViewPref: {
          type: "object",
          required: ["feed"],
          properties: {
            feed: {
              type: "string",
              description: "The URI of the feed, or an identifier which describes the feed."
            },
            hideReplies: {
              type: "boolean",
              description: "Hide replies in the feed."
            },
            hideRepliesByUnfollowed: {
              type: "boolean",
              description: "Hide replies in the feed if they are not by followed users."
            },
            hideRepliesByLikeCount: {
              type: "integer",
              description: "Hide replies in the feed if they do not have this number of likes."
            },
            hideReposts: {
              type: "boolean",
              description: "Hide reposts in the feed."
            },
            hideQuotePosts: {
              type: "boolean",
              description: "Hide quote posts in the feed."
            }
          }
        },
        threadViewPref: {
          type: "object",
          properties: {
            sort: {
              type: "string",
              description: "Sorting mode for threads.",
              knownValues: ["oldest", "newest", "most-likes", "random"]
            },
            prioritizeFollowedUsers: {
              type: "boolean",
              description: "Show followed users at the top of all replies."
            }
          }
        },
        interestsPref: {
          type: "object",
          required: ["tags"],
          properties: {
            tags: {
              type: "array",
              maxLength: 100,
              items: {
                type: "string",
                maxLength: 640,
                maxGraphemes: 64
              },
              description: "A list of tags which describe the account owner's interests gathered during onboarding."
            }
          }
        },
        mutedWordTarget: {
          type: "string",
          knownValues: ["content", "tag"],
          maxLength: 640,
          maxGraphemes: 64
        },
        mutedWord: {
          type: "object",
          description: "A word that the account owner has muted.",
          required: ["value", "targets"],
          properties: {
            value: {
              type: "string",
              description: "The muted word itself.",
              maxLength: 1e4,
              maxGraphemes: 1e3
            },
            targets: {
              type: "array",
              description: "The intended targets of the muted word.",
              items: {
                type: "ref",
                ref: "lex:app.bsky.actor.defs#mutedWordTarget"
              }
            }
          }
        },
        mutedWordsPref: {
          type: "object",
          required: ["items"],
          properties: {
            items: {
              type: "array",
              items: {
                type: "ref",
                ref: "lex:app.bsky.actor.defs#mutedWord"
              },
              description: "A list of words the account owner has muted."
            }
          }
        },
        hiddenPostsPref: {
          type: "object",
          required: ["items"],
          properties: {
            items: {
              type: "array",
              items: {
                type: "string",
                format: "at-uri"
              },
              description: "A list of URIs of posts the account owner has hidden."
            }
          }
        }
      }
    },
    AppBskyActorGetPreferences: {
      lexicon: 1,
      id: "app.bsky.actor.getPreferences",
      defs: {
        main: {
          type: "query",
          description: "Get private preferences attached to the current account. Expected use is synchronization between multiple devices, and import/export during account migration. Requires auth.",
          parameters: {
            type: "params",
            properties: {}
          },
          output: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["preferences"],
              properties: {
                preferences: {
                  type: "ref",
                  ref: "lex:app.bsky.actor.defs#preferences"
                }
              }
            }
          }
        }
      }
    },
    AppBskyActorGetProfile: {
      lexicon: 1,
      id: "app.bsky.actor.getProfile",
      defs: {
        main: {
          type: "query",
          description: "Get detailed profile view of an actor. Does not require auth, but contains relevant metadata with auth.",
          parameters: {
            type: "params",
            required: ["actor"],
            properties: {
              actor: {
                type: "string",
                format: "at-identifier",
                description: "Handle or DID of account to fetch profile of."
              }
            }
          },
          output: {
            encoding: "application/json",
            schema: {
              type: "ref",
              ref: "lex:app.bsky.actor.defs#profileViewDetailed"
            }
          }
        }
      }
    },
    AppBskyActorGetProfiles: {
      lexicon: 1,
      id: "app.bsky.actor.getProfiles",
      defs: {
        main: {
          type: "query",
          description: "Get detailed profile views of multiple actors.",
          parameters: {
            type: "params",
            required: ["actors"],
            properties: {
              actors: {
                type: "array",
                items: {
                  type: "string",
                  format: "at-identifier"
                },
                maxLength: 25
              }
            }
          },
          output: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["profiles"],
              properties: {
                profiles: {
                  type: "array",
                  items: {
                    type: "ref",
                    ref: "lex:app.bsky.actor.defs#profileViewDetailed"
                  }
                }
              }
            }
          }
        }
      }
    },
    AppBskyActorGetSuggestions: {
      lexicon: 1,
      id: "app.bsky.actor.getSuggestions",
      defs: {
        main: {
          type: "query",
          description: "Get a list of suggested actors. Expected use is discovery of accounts to follow during new account onboarding.",
          parameters: {
            type: "params",
            properties: {
              limit: {
                type: "integer",
                minimum: 1,
                maximum: 100,
                default: 50
              },
              cursor: {
                type: "string"
              }
            }
          },
          output: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["actors"],
              properties: {
                cursor: {
                  type: "string"
                },
                actors: {
                  type: "array",
                  items: {
                    type: "ref",
                    ref: "lex:app.bsky.actor.defs#profileView"
                  }
                }
              }
            }
          }
        }
      }
    },
    AppBskyActorProfile: {
      lexicon: 1,
      id: "app.bsky.actor.profile",
      defs: {
        main: {
          type: "record",
          description: "A declaration of a Bluesky account profile.",
          key: "literal:self",
          record: {
            type: "object",
            properties: {
              displayName: {
                type: "string",
                maxGraphemes: 64,
                maxLength: 640
              },
              description: {
                type: "string",
                description: "Free-form profile description text.",
                maxGraphemes: 256,
                maxLength: 2560
              },
              avatar: {
                type: "blob",
                description: "Small image to be displayed next to posts from account. AKA, 'profile picture'",
                accept: ["image/png", "image/jpeg"],
                maxSize: 1e6
              },
              banner: {
                type: "blob",
                description: "Larger horizontal image to display behind profile view.",
                accept: ["image/png", "image/jpeg"],
                maxSize: 1e6
              },
              labels: {
                type: "union",
                description: "Self-label values, specific to the Bluesky application, on the overall account.",
                refs: ["lex:com.atproto.label.defs#selfLabels"]
              }
            }
          }
        }
      }
    },
    AppBskyActorPutPreferences: {
      lexicon: 1,
      id: "app.bsky.actor.putPreferences",
      defs: {
        main: {
          type: "procedure",
          description: "Set the private preferences attached to the account.",
          input: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["preferences"],
              properties: {
                preferences: {
                  type: "ref",
                  ref: "lex:app.bsky.actor.defs#preferences"
                }
              }
            }
          }
        }
      }
    },
    AppBskyActorSearchActors: {
      lexicon: 1,
      id: "app.bsky.actor.searchActors",
      defs: {
        main: {
          type: "query",
          description: "Find actors (profiles) matching search criteria. Does not require auth.",
          parameters: {
            type: "params",
            properties: {
              term: {
                type: "string",
                description: "DEPRECATED: use 'q' instead."
              },
              q: {
                type: "string",
                description: "Search query string. Syntax, phrase, boolean, and faceting is unspecified, but Lucene query syntax is recommended."
              },
              limit: {
                type: "integer",
                minimum: 1,
                maximum: 100,
                default: 25
              },
              cursor: {
                type: "string"
              }
            }
          },
          output: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["actors"],
              properties: {
                cursor: {
                  type: "string"
                },
                actors: {
                  type: "array",
                  items: {
                    type: "ref",
                    ref: "lex:app.bsky.actor.defs#profileView"
                  }
                }
              }
            }
          }
        }
      }
    },
    AppBskyActorSearchActorsTypeahead: {
      lexicon: 1,
      id: "app.bsky.actor.searchActorsTypeahead",
      defs: {
        main: {
          type: "query",
          description: "Find actor suggestions for a prefix search term. Expected use is for auto-completion during text field entry. Does not require auth.",
          parameters: {
            type: "params",
            properties: {
              term: {
                type: "string",
                description: "DEPRECATED: use 'q' instead."
              },
              q: {
                type: "string",
                description: "Search query prefix; not a full query string."
              },
              limit: {
                type: "integer",
                minimum: 1,
                maximum: 100,
                default: 10
              }
            }
          },
          output: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["actors"],
              properties: {
                actors: {
                  type: "array",
                  items: {
                    type: "ref",
                    ref: "lex:app.bsky.actor.defs#profileViewBasic"
                  }
                }
              }
            }
          }
        }
      }
    },
    AppBskyEmbedExternal: {
      lexicon: 1,
      id: "app.bsky.embed.external",
      defs: {
        main: {
          type: "object",
          description: "A representation of some externally linked content (eg, a URL and 'card'), embedded in a Bluesky record (eg, a post).",
          required: ["external"],
          properties: {
            external: {
              type: "ref",
              ref: "lex:app.bsky.embed.external#external"
            }
          }
        },
        external: {
          type: "object",
          required: ["uri", "title", "description"],
          properties: {
            uri: {
              type: "string",
              format: "uri"
            },
            title: {
              type: "string"
            },
            description: {
              type: "string"
            },
            thumb: {
              type: "blob",
              accept: ["image/*"],
              maxSize: 1e6
            }
          }
        },
        view: {
          type: "object",
          required: ["external"],
          properties: {
            external: {
              type: "ref",
              ref: "lex:app.bsky.embed.external#viewExternal"
            }
          }
        },
        viewExternal: {
          type: "object",
          required: ["uri", "title", "description"],
          properties: {
            uri: {
              type: "string",
              format: "uri"
            },
            title: {
              type: "string"
            },
            description: {
              type: "string"
            },
            thumb: {
              type: "string"
            }
          }
        }
      }
    },
    AppBskyEmbedImages: {
      lexicon: 1,
      id: "app.bsky.embed.images",
      description: "A set of images embedded in a Bluesky record (eg, a post).",
      defs: {
        main: {
          type: "object",
          required: ["images"],
          properties: {
            images: {
              type: "array",
              items: {
                type: "ref",
                ref: "lex:app.bsky.embed.images#image"
              },
              maxLength: 4
            }
          }
        },
        image: {
          type: "object",
          required: ["image", "alt"],
          properties: {
            image: {
              type: "blob",
              accept: ["image/*"],
              maxSize: 1e6
            },
            alt: {
              type: "string",
              description: "Alt text description of the image, for accessibility."
            },
            aspectRatio: {
              type: "ref",
              ref: "lex:app.bsky.embed.images#aspectRatio"
            }
          }
        },
        aspectRatio: {
          type: "object",
          description: "width:height represents an aspect ratio. It may be approximate, and may not correspond to absolute dimensions in any given unit.",
          required: ["width", "height"],
          properties: {
            width: {
              type: "integer",
              minimum: 1
            },
            height: {
              type: "integer",
              minimum: 1
            }
          }
        },
        view: {
          type: "object",
          required: ["images"],
          properties: {
            images: {
              type: "array",
              items: {
                type: "ref",
                ref: "lex:app.bsky.embed.images#viewImage"
              },
              maxLength: 4
            }
          }
        },
        viewImage: {
          type: "object",
          required: ["thumb", "fullsize", "alt"],
          properties: {
            thumb: {
              type: "string",
              description: "Fully-qualified URL where a thumbnail of the image can be fetched. For example, CDN location provided by the App View."
            },
            fullsize: {
              type: "string",
              description: "Fully-qualified URL where a large version of the image can be fetched. May or may not be the exact original blob. For example, CDN location provided by the App View."
            },
            alt: {
              type: "string",
              description: "Alt text description of the image, for accessibility."
            },
            aspectRatio: {
              type: "ref",
              ref: "lex:app.bsky.embed.images#aspectRatio"
            }
          }
        }
      }
    },
    AppBskyEmbedRecord: {
      lexicon: 1,
      id: "app.bsky.embed.record",
      description: "A representation of a record embedded in a Bluesky record (eg, a post). For example, a quote-post, or sharing a feed generator record.",
      defs: {
        main: {
          type: "object",
          required: ["record"],
          properties: {
            record: {
              type: "ref",
              ref: "lex:com.atproto.repo.strongRef"
            }
          }
        },
        view: {
          type: "object",
          required: ["record"],
          properties: {
            record: {
              type: "union",
              refs: [
                "lex:app.bsky.embed.record#viewRecord",
                "lex:app.bsky.embed.record#viewNotFound",
                "lex:app.bsky.embed.record#viewBlocked",
                "lex:app.bsky.feed.defs#generatorView",
                "lex:app.bsky.graph.defs#listView"
              ]
            }
          }
        },
        viewRecord: {
          type: "object",
          required: ["uri", "cid", "author", "value", "indexedAt"],
          properties: {
            uri: {
              type: "string",
              format: "at-uri"
            },
            cid: {
              type: "string",
              format: "cid"
            },
            author: {
              type: "ref",
              ref: "lex:app.bsky.actor.defs#profileViewBasic"
            },
            value: {
              type: "unknown",
              description: "The record data itself."
            },
            labels: {
              type: "array",
              items: {
                type: "ref",
                ref: "lex:com.atproto.label.defs#label"
              }
            },
            embeds: {
              type: "array",
              items: {
                type: "union",
                refs: [
                  "lex:app.bsky.embed.images#view",
                  "lex:app.bsky.embed.external#view",
                  "lex:app.bsky.embed.record#view",
                  "lex:app.bsky.embed.recordWithMedia#view"
                ]
              }
            },
            indexedAt: {
              type: "string",
              format: "datetime"
            }
          }
        },
        viewNotFound: {
          type: "object",
          required: ["uri", "notFound"],
          properties: {
            uri: {
              type: "string",
              format: "at-uri"
            },
            notFound: {
              type: "boolean",
              const: !0
            }
          }
        },
        viewBlocked: {
          type: "object",
          required: ["uri", "blocked", "author"],
          properties: {
            uri: {
              type: "string",
              format: "at-uri"
            },
            blocked: {
              type: "boolean",
              const: !0
            },
            author: {
              type: "ref",
              ref: "lex:app.bsky.feed.defs#blockedAuthor"
            }
          }
        }
      }
    },
    AppBskyEmbedRecordWithMedia: {
      lexicon: 1,
      id: "app.bsky.embed.recordWithMedia",
      description: "A representation of a record embedded in a Bluesky record (eg, a post), alongside other compatible embeds. For example, a quote post and image, or a quote post and external URL card.",
      defs: {
        main: {
          type: "object",
          required: ["record", "media"],
          properties: {
            record: {
              type: "ref",
              ref: "lex:app.bsky.embed.record"
            },
            media: {
              type: "union",
              refs: ["lex:app.bsky.embed.images", "lex:app.bsky.embed.external"]
            }
          }
        },
        view: {
          type: "object",
          required: ["record", "media"],
          properties: {
            record: {
              type: "ref",
              ref: "lex:app.bsky.embed.record#view"
            },
            media: {
              type: "union",
              refs: [
                "lex:app.bsky.embed.images#view",
                "lex:app.bsky.embed.external#view"
              ]
            }
          }
        }
      }
    },
    AppBskyFeedDefs: {
      lexicon: 1,
      id: "app.bsky.feed.defs",
      defs: {
        postView: {
          type: "object",
          required: ["uri", "cid", "author", "record", "indexedAt"],
          properties: {
            uri: {
              type: "string",
              format: "at-uri"
            },
            cid: {
              type: "string",
              format: "cid"
            },
            author: {
              type: "ref",
              ref: "lex:app.bsky.actor.defs#profileViewBasic"
            },
            record: {
              type: "unknown"
            },
            embed: {
              type: "union",
              refs: [
                "lex:app.bsky.embed.images#view",
                "lex:app.bsky.embed.external#view",
                "lex:app.bsky.embed.record#view",
                "lex:app.bsky.embed.recordWithMedia#view"
              ]
            },
            replyCount: {
              type: "integer"
            },
            repostCount: {
              type: "integer"
            },
            likeCount: {
              type: "integer"
            },
            indexedAt: {
              type: "string",
              format: "datetime"
            },
            viewer: {
              type: "ref",
              ref: "lex:app.bsky.feed.defs#viewerState"
            },
            labels: {
              type: "array",
              items: {
                type: "ref",
                ref: "lex:com.atproto.label.defs#label"
              }
            },
            threadgate: {
              type: "ref",
              ref: "lex:app.bsky.feed.defs#threadgateView"
            }
          }
        },
        viewerState: {
          type: "object",
          description: "Metadata about the requesting account's relationship with the subject content. Only has meaningful content for authed requests.",
          properties: {
            repost: {
              type: "string",
              format: "at-uri"
            },
            like: {
              type: "string",
              format: "at-uri"
            },
            replyDisabled: {
              type: "boolean"
            }
          }
        },
        feedViewPost: {
          type: "object",
          required: ["post"],
          properties: {
            post: {
              type: "ref",
              ref: "lex:app.bsky.feed.defs#postView"
            },
            reply: {
              type: "ref",
              ref: "lex:app.bsky.feed.defs#replyRef"
            },
            reason: {
              type: "union",
              refs: ["lex:app.bsky.feed.defs#reasonRepost"]
            }
          }
        },
        replyRef: {
          type: "object",
          required: ["root", "parent"],
          properties: {
            root: {
              type: "union",
              refs: [
                "lex:app.bsky.feed.defs#postView",
                "lex:app.bsky.feed.defs#notFoundPost",
                "lex:app.bsky.feed.defs#blockedPost"
              ]
            },
            parent: {
              type: "union",
              refs: [
                "lex:app.bsky.feed.defs#postView",
                "lex:app.bsky.feed.defs#notFoundPost",
                "lex:app.bsky.feed.defs#blockedPost"
              ]
            }
          }
        },
        reasonRepost: {
          type: "object",
          required: ["by", "indexedAt"],
          properties: {
            by: {
              type: "ref",
              ref: "lex:app.bsky.actor.defs#profileViewBasic"
            },
            indexedAt: {
              type: "string",
              format: "datetime"
            }
          }
        },
        threadViewPost: {
          type: "object",
          required: ["post"],
          properties: {
            post: {
              type: "ref",
              ref: "lex:app.bsky.feed.defs#postView"
            },
            parent: {
              type: "union",
              refs: [
                "lex:app.bsky.feed.defs#threadViewPost",
                "lex:app.bsky.feed.defs#notFoundPost",
                "lex:app.bsky.feed.defs#blockedPost"
              ]
            },
            replies: {
              type: "array",
              items: {
                type: "union",
                refs: [
                  "lex:app.bsky.feed.defs#threadViewPost",
                  "lex:app.bsky.feed.defs#notFoundPost",
                  "lex:app.bsky.feed.defs#blockedPost"
                ]
              }
            }
          }
        },
        notFoundPost: {
          type: "object",
          required: ["uri", "notFound"],
          properties: {
            uri: {
              type: "string",
              format: "at-uri"
            },
            notFound: {
              type: "boolean",
              const: !0
            }
          }
        },
        blockedPost: {
          type: "object",
          required: ["uri", "blocked", "author"],
          properties: {
            uri: {
              type: "string",
              format: "at-uri"
            },
            blocked: {
              type: "boolean",
              const: !0
            },
            author: {
              type: "ref",
              ref: "lex:app.bsky.feed.defs#blockedAuthor"
            }
          }
        },
        blockedAuthor: {
          type: "object",
          required: ["did"],
          properties: {
            did: {
              type: "string",
              format: "did"
            },
            viewer: {
              type: "ref",
              ref: "lex:app.bsky.actor.defs#viewerState"
            }
          }
        },
        generatorView: {
          type: "object",
          required: ["uri", "cid", "did", "creator", "displayName", "indexedAt"],
          properties: {
            uri: {
              type: "string",
              format: "at-uri"
            },
            cid: {
              type: "string",
              format: "cid"
            },
            did: {
              type: "string",
              format: "did"
            },
            creator: {
              type: "ref",
              ref: "lex:app.bsky.actor.defs#profileView"
            },
            displayName: {
              type: "string"
            },
            description: {
              type: "string",
              maxGraphemes: 300,
              maxLength: 3e3
            },
            descriptionFacets: {
              type: "array",
              items: {
                type: "ref",
                ref: "lex:app.bsky.richtext.facet"
              }
            },
            avatar: {
              type: "string"
            },
            likeCount: {
              type: "integer",
              minimum: 0
            },
            viewer: {
              type: "ref",
              ref: "lex:app.bsky.feed.defs#generatorViewerState"
            },
            indexedAt: {
              type: "string",
              format: "datetime"
            }
          }
        },
        generatorViewerState: {
          type: "object",
          properties: {
            like: {
              type: "string",
              format: "at-uri"
            }
          }
        },
        skeletonFeedPost: {
          type: "object",
          required: ["post"],
          properties: {
            post: {
              type: "string",
              format: "at-uri"
            },
            reason: {
              type: "union",
              refs: ["lex:app.bsky.feed.defs#skeletonReasonRepost"]
            }
          }
        },
        skeletonReasonRepost: {
          type: "object",
          required: ["repost"],
          properties: {
            repost: {
              type: "string",
              format: "at-uri"
            }
          }
        },
        threadgateView: {
          type: "object",
          properties: {
            uri: {
              type: "string",
              format: "at-uri"
            },
            cid: {
              type: "string",
              format: "cid"
            },
            record: {
              type: "unknown"
            },
            lists: {
              type: "array",
              items: {
                type: "ref",
                ref: "lex:app.bsky.graph.defs#listViewBasic"
              }
            }
          }
        }
      }
    },
    AppBskyFeedDescribeFeedGenerator: {
      lexicon: 1,
      id: "app.bsky.feed.describeFeedGenerator",
      defs: {
        main: {
          type: "query",
          description: "Get information about a feed generator, including policies and offered feed URIs. Does not require auth; implemented by Feed Generator services (not App View).",
          output: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["did", "feeds"],
              properties: {
                did: {
                  type: "string",
                  format: "did"
                },
                feeds: {
                  type: "array",
                  items: {
                    type: "ref",
                    ref: "lex:app.bsky.feed.describeFeedGenerator#feed"
                  }
                },
                links: {
                  type: "ref",
                  ref: "lex:app.bsky.feed.describeFeedGenerator#links"
                }
              }
            }
          }
        },
        feed: {
          type: "object",
          required: ["uri"],
          properties: {
            uri: {
              type: "string",
              format: "at-uri"
            }
          }
        },
        links: {
          type: "object",
          properties: {
            privacyPolicy: {
              type: "string"
            },
            termsOfService: {
              type: "string"
            }
          }
        }
      }
    },
    AppBskyFeedGenerator: {
      lexicon: 1,
      id: "app.bsky.feed.generator",
      defs: {
        main: {
          type: "record",
          description: "Record declaring of the existence of a feed generator, and containing metadata about it. The record can exist in any repository.",
          key: "any",
          record: {
            type: "object",
            required: ["did", "displayName", "createdAt"],
            properties: {
              did: {
                type: "string",
                format: "did"
              },
              displayName: {
                type: "string",
                maxGraphemes: 24,
                maxLength: 240
              },
              description: {
                type: "string",
                maxGraphemes: 300,
                maxLength: 3e3
              },
              descriptionFacets: {
                type: "array",
                items: {
                  type: "ref",
                  ref: "lex:app.bsky.richtext.facet"
                }
              },
              avatar: {
                type: "blob",
                accept: ["image/png", "image/jpeg"],
                maxSize: 1e6
              },
              labels: {
                type: "union",
                description: "Self-label values",
                refs: ["lex:com.atproto.label.defs#selfLabels"]
              },
              createdAt: {
                type: "string",
                format: "datetime"
              }
            }
          }
        }
      }
    },
    AppBskyFeedGetActorFeeds: {
      lexicon: 1,
      id: "app.bsky.feed.getActorFeeds",
      defs: {
        main: {
          type: "query",
          description: "Get a list of feeds (feed generator records) created by the actor (in the actor's repo).",
          parameters: {
            type: "params",
            required: ["actor"],
            properties: {
              actor: {
                type: "string",
                format: "at-identifier"
              },
              limit: {
                type: "integer",
                minimum: 1,
                maximum: 100,
                default: 50
              },
              cursor: {
                type: "string"
              }
            }
          },
          output: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["feeds"],
              properties: {
                cursor: {
                  type: "string"
                },
                feeds: {
                  type: "array",
                  items: {
                    type: "ref",
                    ref: "lex:app.bsky.feed.defs#generatorView"
                  }
                }
              }
            }
          }
        }
      }
    },
    AppBskyFeedGetActorLikes: {
      lexicon: 1,
      id: "app.bsky.feed.getActorLikes",
      defs: {
        main: {
          type: "query",
          description: "Get a list of posts liked by an actor. Does not require auth.",
          parameters: {
            type: "params",
            required: ["actor"],
            properties: {
              actor: {
                type: "string",
                format: "at-identifier"
              },
              limit: {
                type: "integer",
                minimum: 1,
                maximum: 100,
                default: 50
              },
              cursor: {
                type: "string"
              }
            }
          },
          output: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["feed"],
              properties: {
                cursor: {
                  type: "string"
                },
                feed: {
                  type: "array",
                  items: {
                    type: "ref",
                    ref: "lex:app.bsky.feed.defs#feedViewPost"
                  }
                }
              }
            }
          },
          errors: [
            {
              name: "BlockedActor"
            },
            {
              name: "BlockedByActor"
            }
          ]
        }
      }
    },
    AppBskyFeedGetAuthorFeed: {
      lexicon: 1,
      id: "app.bsky.feed.getAuthorFeed",
      defs: {
        main: {
          type: "query",
          description: "Get a view of an actor's 'author feed' (post and reposts by the author). Does not require auth.",
          parameters: {
            type: "params",
            required: ["actor"],
            properties: {
              actor: {
                type: "string",
                format: "at-identifier"
              },
              limit: {
                type: "integer",
                minimum: 1,
                maximum: 100,
                default: 50
              },
              cursor: {
                type: "string"
              },
              filter: {
                type: "string",
                description: "Combinations of post/repost types to include in response.",
                knownValues: [
                  "posts_with_replies",
                  "posts_no_replies",
                  "posts_with_media",
                  "posts_and_author_threads"
                ],
                default: "posts_with_replies"
              }
            }
          },
          output: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["feed"],
              properties: {
                cursor: {
                  type: "string"
                },
                feed: {
                  type: "array",
                  items: {
                    type: "ref",
                    ref: "lex:app.bsky.feed.defs#feedViewPost"
                  }
                }
              }
            }
          },
          errors: [
            {
              name: "BlockedActor"
            },
            {
              name: "BlockedByActor"
            }
          ]
        }
      }
    },
    AppBskyFeedGetFeed: {
      lexicon: 1,
      id: "app.bsky.feed.getFeed",
      defs: {
        main: {
          type: "query",
          description: "Get a hydrated feed from an actor's selected feed generator. Implemented by App View.",
          parameters: {
            type: "params",
            required: ["feed"],
            properties: {
              feed: {
                type: "string",
                format: "at-uri"
              },
              limit: {
                type: "integer",
                minimum: 1,
                maximum: 100,
                default: 50
              },
              cursor: {
                type: "string"
              }
            }
          },
          output: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["feed"],
              properties: {
                cursor: {
                  type: "string"
                },
                feed: {
                  type: "array",
                  items: {
                    type: "ref",
                    ref: "lex:app.bsky.feed.defs#feedViewPost"
                  }
                }
              }
            }
          },
          errors: [
            {
              name: "UnknownFeed"
            }
          ]
        }
      }
    },
    AppBskyFeedGetFeedGenerator: {
      lexicon: 1,
      id: "app.bsky.feed.getFeedGenerator",
      defs: {
        main: {
          type: "query",
          description: "Get information about a feed generator. Implemented by AppView.",
          parameters: {
            type: "params",
            required: ["feed"],
            properties: {
              feed: {
                type: "string",
                format: "at-uri",
                description: "AT-URI of the feed generator record."
              }
            }
          },
          output: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["view", "isOnline", "isValid"],
              properties: {
                view: {
                  type: "ref",
                  ref: "lex:app.bsky.feed.defs#generatorView"
                },
                isOnline: {
                  type: "boolean",
                  description: "Indicates whether the feed generator service has been online recently, or else seems to be inactive."
                },
                isValid: {
                  type: "boolean",
                  description: "Indicates whether the feed generator service is compatible with the record declaration."
                }
              }
            }
          }
        }
      }
    },
    AppBskyFeedGetFeedGenerators: {
      lexicon: 1,
      id: "app.bsky.feed.getFeedGenerators",
      defs: {
        main: {
          type: "query",
          description: "Get information about a list of feed generators.",
          parameters: {
            type: "params",
            required: ["feeds"],
            properties: {
              feeds: {
                type: "array",
                items: {
                  type: "string",
                  format: "at-uri"
                }
              }
            }
          },
          output: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["feeds"],
              properties: {
                feeds: {
                  type: "array",
                  items: {
                    type: "ref",
                    ref: "lex:app.bsky.feed.defs#generatorView"
                  }
                }
              }
            }
          }
        }
      }
    },
    AppBskyFeedGetFeedSkeleton: {
      lexicon: 1,
      id: "app.bsky.feed.getFeedSkeleton",
      defs: {
        main: {
          type: "query",
          description: "Get a skeleton of a feed provided by a feed generator. Auth is optional, depending on provider requirements, and provides the DID of the requester. Implemented by Feed Generator Service.",
          parameters: {
            type: "params",
            required: ["feed"],
            properties: {
              feed: {
                type: "string",
                format: "at-uri",
                description: "Reference to feed generator record describing the specific feed being requested."
              },
              limit: {
                type: "integer",
                minimum: 1,
                maximum: 100,
                default: 50
              },
              cursor: {
                type: "string"
              }
            }
          },
          output: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["feed"],
              properties: {
                cursor: {
                  type: "string"
                },
                feed: {
                  type: "array",
                  items: {
                    type: "ref",
                    ref: "lex:app.bsky.feed.defs#skeletonFeedPost"
                  }
                }
              }
            }
          },
          errors: [
            {
              name: "UnknownFeed"
            }
          ]
        }
      }
    },
    AppBskyFeedGetLikes: {
      lexicon: 1,
      id: "app.bsky.feed.getLikes",
      defs: {
        main: {
          type: "query",
          description: "Get like records which reference a subject (by AT-URI and CID).",
          parameters: {
            type: "params",
            required: ["uri"],
            properties: {
              uri: {
                type: "string",
                format: "at-uri",
                description: "AT-URI of the subject (eg, a post record)."
              },
              cid: {
                type: "string",
                format: "cid",
                description: "CID of the subject record (aka, specific version of record), to filter likes."
              },
              limit: {
                type: "integer",
                minimum: 1,
                maximum: 100,
                default: 50
              },
              cursor: {
                type: "string"
              }
            }
          },
          output: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["uri", "likes"],
              properties: {
                uri: {
                  type: "string",
                  format: "at-uri"
                },
                cid: {
                  type: "string",
                  format: "cid"
                },
                cursor: {
                  type: "string"
                },
                likes: {
                  type: "array",
                  items: {
                    type: "ref",
                    ref: "lex:app.bsky.feed.getLikes#like"
                  }
                }
              }
            }
          }
        },
        like: {
          type: "object",
          required: ["indexedAt", "createdAt", "actor"],
          properties: {
            indexedAt: {
              type: "string",
              format: "datetime"
            },
            createdAt: {
              type: "string",
              format: "datetime"
            },
            actor: {
              type: "ref",
              ref: "lex:app.bsky.actor.defs#profileView"
            }
          }
        }
      }
    },
    AppBskyFeedGetListFeed: {
      lexicon: 1,
      id: "app.bsky.feed.getListFeed",
      defs: {
        main: {
          type: "query",
          description: "Get a feed of recent posts from a list (posts and reposts from any actors on the list). Does not require auth.",
          parameters: {
            type: "params",
            required: ["list"],
            properties: {
              list: {
                type: "string",
                format: "at-uri",
                description: "Reference (AT-URI) to the list record."
              },
              limit: {
                type: "integer",
                minimum: 1,
                maximum: 100,
                default: 50
              },
              cursor: {
                type: "string"
              }
            }
          },
          output: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["feed"],
              properties: {
                cursor: {
                  type: "string"
                },
                feed: {
                  type: "array",
                  items: {
                    type: "ref",
                    ref: "lex:app.bsky.feed.defs#feedViewPost"
                  }
                }
              }
            }
          },
          errors: [
            {
              name: "UnknownList"
            }
          ]
        }
      }
    },
    AppBskyFeedGetPostThread: {
      lexicon: 1,
      id: "app.bsky.feed.getPostThread",
      defs: {
        main: {
          type: "query",
          description: "Get posts in a thread. Does not require auth, but additional metadata and filtering will be applied for authed requests.",
          parameters: {
            type: "params",
            required: ["uri"],
            properties: {
              uri: {
                type: "string",
                format: "at-uri",
                description: "Reference (AT-URI) to post record."
              },
              depth: {
                type: "integer",
                description: "How many levels of reply depth should be included in response.",
                default: 6,
                minimum: 0,
                maximum: 1e3
              },
              parentHeight: {
                type: "integer",
                description: "How many levels of parent (and grandparent, etc) post to include.",
                default: 80,
                minimum: 0,
                maximum: 1e3
              }
            }
          },
          output: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["thread"],
              properties: {
                thread: {
                  type: "union",
                  refs: [
                    "lex:app.bsky.feed.defs#threadViewPost",
                    "lex:app.bsky.feed.defs#notFoundPost",
                    "lex:app.bsky.feed.defs#blockedPost"
                  ]
                }
              }
            }
          },
          errors: [
            {
              name: "NotFound"
            }
          ]
        }
      }
    },
    AppBskyFeedGetPosts: {
      lexicon: 1,
      id: "app.bsky.feed.getPosts",
      defs: {
        main: {
          type: "query",
          description: "Gets post views for a specified list of posts (by AT-URI). This is sometimes referred to as 'hydrating' a 'feed skeleton'.",
          parameters: {
            type: "params",
            required: ["uris"],
            properties: {
              uris: {
                type: "array",
                description: "List of post AT-URIs to return hydrated views for.",
                items: {
                  type: "string",
                  format: "at-uri"
                },
                maxLength: 25
              }
            }
          },
          output: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["posts"],
              properties: {
                posts: {
                  type: "array",
                  items: {
                    type: "ref",
                    ref: "lex:app.bsky.feed.defs#postView"
                  }
                }
              }
            }
          }
        }
      }
    },
    AppBskyFeedGetRepostedBy: {
      lexicon: 1,
      id: "app.bsky.feed.getRepostedBy",
      defs: {
        main: {
          type: "query",
          description: "Get a list of reposts for a given post.",
          parameters: {
            type: "params",
            required: ["uri"],
            properties: {
              uri: {
                type: "string",
                format: "at-uri",
                description: "Reference (AT-URI) of post record"
              },
              cid: {
                type: "string",
                format: "cid",
                description: "If supplied, filters to reposts of specific version (by CID) of the post record."
              },
              limit: {
                type: "integer",
                minimum: 1,
                maximum: 100,
                default: 50
              },
              cursor: {
                type: "string"
              }
            }
          },
          output: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["uri", "repostedBy"],
              properties: {
                uri: {
                  type: "string",
                  format: "at-uri"
                },
                cid: {
                  type: "string",
                  format: "cid"
                },
                cursor: {
                  type: "string"
                },
                repostedBy: {
                  type: "array",
                  items: {
                    type: "ref",
                    ref: "lex:app.bsky.actor.defs#profileView"
                  }
                }
              }
            }
          }
        }
      }
    },
    AppBskyFeedGetSuggestedFeeds: {
      lexicon: 1,
      id: "app.bsky.feed.getSuggestedFeeds",
      defs: {
        main: {
          type: "query",
          description: "Get a list of suggested feeds (feed generators) for the requesting account.",
          parameters: {
            type: "params",
            properties: {
              limit: {
                type: "integer",
                minimum: 1,
                maximum: 100,
                default: 50
              },
              cursor: {
                type: "string"
              }
            }
          },
          output: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["feeds"],
              properties: {
                cursor: {
                  type: "string"
                },
                feeds: {
                  type: "array",
                  items: {
                    type: "ref",
                    ref: "lex:app.bsky.feed.defs#generatorView"
                  }
                }
              }
            }
          }
        }
      }
    },
    AppBskyFeedGetTimeline: {
      lexicon: 1,
      id: "app.bsky.feed.getTimeline",
      defs: {
        main: {
          type: "query",
          description: "Get a view of the requesting account's home timeline. This is expected to be some form of reverse-chronological feed.",
          parameters: {
            type: "params",
            properties: {
              algorithm: {
                type: "string",
                description: "Variant 'algorithm' for timeline. Implementation-specific. NOTE: most feed flexibility has been moved to feed generator mechanism."
              },
              limit: {
                type: "integer",
                minimum: 1,
                maximum: 100,
                default: 50
              },
              cursor: {
                type: "string"
              }
            }
          },
          output: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["feed"],
              properties: {
                cursor: {
                  type: "string"
                },
                feed: {
                  type: "array",
                  items: {
                    type: "ref",
                    ref: "lex:app.bsky.feed.defs#feedViewPost"
                  }
                }
              }
            }
          }
        }
      }
    },
    AppBskyFeedLike: {
      lexicon: 1,
      id: "app.bsky.feed.like",
      defs: {
        main: {
          type: "record",
          description: "Record declaring a 'like' of a piece of subject content.",
          key: "tid",
          record: {
            type: "object",
            required: ["subject", "createdAt"],
            properties: {
              subject: {
                type: "ref",
                ref: "lex:com.atproto.repo.strongRef"
              },
              createdAt: {
                type: "string",
                format: "datetime"
              }
            }
          }
        }
      }
    },
    AppBskyFeedPost: {
      lexicon: 1,
      id: "app.bsky.feed.post",
      defs: {
        main: {
          type: "record",
          description: "Record containing a Bluesky post.",
          key: "tid",
          record: {
            type: "object",
            required: ["text", "createdAt"],
            properties: {
              text: {
                type: "string",
                maxLength: 3e3,
                maxGraphemes: 300,
                description: "The primary post content. May be an empty string, if there are embeds."
              },
              entities: {
                type: "array",
                description: "DEPRECATED: replaced by app.bsky.richtext.facet.",
                items: {
                  type: "ref",
                  ref: "lex:app.bsky.feed.post#entity"
                }
              },
              facets: {
                type: "array",
                description: "Annotations of text (mentions, URLs, hashtags, etc)",
                items: {
                  type: "ref",
                  ref: "lex:app.bsky.richtext.facet"
                }
              },
              reply: {
                type: "ref",
                ref: "lex:app.bsky.feed.post#replyRef"
              },
              embed: {
                type: "union",
                refs: [
                  "lex:app.bsky.embed.images",
                  "lex:app.bsky.embed.external",
                  "lex:app.bsky.embed.record",
                  "lex:app.bsky.embed.recordWithMedia"
                ]
              },
              langs: {
                type: "array",
                description: "Indicates human language of post primary text content.",
                maxLength: 3,
                items: {
                  type: "string",
                  format: "language"
                }
              },
              labels: {
                type: "union",
                description: "Self-label values for this post. Effectively content warnings.",
                refs: ["lex:com.atproto.label.defs#selfLabels"]
              },
              tags: {
                type: "array",
                description: "Additional hashtags, in addition to any included in post text and facets.",
                maxLength: 8,
                items: {
                  type: "string",
                  maxLength: 640,
                  maxGraphemes: 64
                }
              },
              createdAt: {
                type: "string",
                format: "datetime",
                description: "Client-declared timestamp when this post was originally created."
              }
            }
          }
        },
        replyRef: {
          type: "object",
          required: ["root", "parent"],
          properties: {
            root: {
              type: "ref",
              ref: "lex:com.atproto.repo.strongRef"
            },
            parent: {
              type: "ref",
              ref: "lex:com.atproto.repo.strongRef"
            }
          }
        },
        entity: {
          type: "object",
          description: "Deprecated: use facets instead.",
          required: ["index", "type", "value"],
          properties: {
            index: {
              type: "ref",
              ref: "lex:app.bsky.feed.post#textSlice"
            },
            type: {
              type: "string",
              description: "Expected values are 'mention' and 'link'."
            },
            value: {
              type: "string"
            }
          }
        },
        textSlice: {
          type: "object",
          description: "Deprecated. Use app.bsky.richtext instead -- A text segment. Start is inclusive, end is exclusive. Indices are for utf16-encoded strings.",
          required: ["start", "end"],
          properties: {
            start: {
              type: "integer",
              minimum: 0
            },
            end: {
              type: "integer",
              minimum: 0
            }
          }
        }
      }
    },
    AppBskyFeedRepost: {
      lexicon: 1,
      id: "app.bsky.feed.repost",
      defs: {
        main: {
          description: "Record representing a 'repost' of an existing Bluesky post.",
          type: "record",
          key: "tid",
          record: {
            type: "object",
            required: ["subject", "createdAt"],
            properties: {
              subject: {
                type: "ref",
                ref: "lex:com.atproto.repo.strongRef"
              },
              createdAt: {
                type: "string",
                format: "datetime"
              }
            }
          }
        }
      }
    },
    AppBskyFeedSearchPosts: {
      lexicon: 1,
      id: "app.bsky.feed.searchPosts",
      defs: {
        main: {
          type: "query",
          description: "Find posts matching search criteria, returning views of those posts.",
          parameters: {
            type: "params",
            required: ["q"],
            properties: {
              q: {
                type: "string",
                description: "Search query string; syntax, phrase, boolean, and faceting is unspecified, but Lucene query syntax is recommended."
              },
              limit: {
                type: "integer",
                minimum: 1,
                maximum: 100,
                default: 25
              },
              cursor: {
                type: "string",
                description: "Optional pagination mechanism; may not necessarily allow scrolling through entire result set."
              }
            }
          },
          output: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["posts"],
              properties: {
                cursor: {
                  type: "string"
                },
                hitsTotal: {
                  type: "integer",
                  description: "Count of search hits. Optional, may be rounded/truncated, and may not be possible to paginate through all hits."
                },
                posts: {
                  type: "array",
                  items: {
                    type: "ref",
                    ref: "lex:app.bsky.feed.defs#postView"
                  }
                }
              }
            }
          },
          errors: [
            {
              name: "BadQueryString"
            }
          ]
        }
      }
    },
    AppBskyFeedThreadgate: {
      lexicon: 1,
      id: "app.bsky.feed.threadgate",
      defs: {
        main: {
          type: "record",
          key: "tid",
          description: "Record defining interaction gating rules for a thread (aka, reply controls). The record key (rkey) of the threadgate record must match the record key of the thread's root post, and that record must be in the same repository..",
          record: {
            type: "object",
            required: ["post", "createdAt"],
            properties: {
              post: {
                type: "string",
                format: "at-uri",
                description: "Reference (AT-URI) to the post record."
              },
              allow: {
                type: "array",
                maxLength: 5,
                items: {
                  type: "union",
                  refs: [
                    "lex:app.bsky.feed.threadgate#mentionRule",
                    "lex:app.bsky.feed.threadgate#followingRule",
                    "lex:app.bsky.feed.threadgate#listRule"
                  ]
                }
              },
              createdAt: {
                type: "string",
                format: "datetime"
              }
            }
          }
        },
        mentionRule: {
          type: "object",
          description: "Allow replies from actors mentioned in your post.",
          properties: {}
        },
        followingRule: {
          type: "object",
          description: "Allow replies from actors you follow.",
          properties: {}
        },
        listRule: {
          type: "object",
          description: "Allow replies from actors on a list.",
          required: ["list"],
          properties: {
            list: {
              type: "string",
              format: "at-uri"
            }
          }
        }
      }
    },
    AppBskyGraphBlock: {
      lexicon: 1,
      id: "app.bsky.graph.block",
      defs: {
        main: {
          type: "record",
          description: "Record declaring a 'block' relationship against another account. NOTE: blocks are public in Bluesky; see blog posts for details.",
          key: "tid",
          record: {
            type: "object",
            required: ["subject", "createdAt"],
            properties: {
              subject: {
                type: "string",
                format: "did",
                description: "DID of the account to be blocked."
              },
              createdAt: {
                type: "string",
                format: "datetime"
              }
            }
          }
        }
      }
    },
    AppBskyGraphDefs: {
      lexicon: 1,
      id: "app.bsky.graph.defs",
      defs: {
        listViewBasic: {
          type: "object",
          required: ["uri", "cid", "name", "purpose"],
          properties: {
            uri: {
              type: "string",
              format: "at-uri"
            },
            cid: {
              type: "string",
              format: "cid"
            },
            name: {
              type: "string",
              maxLength: 64,
              minLength: 1
            },
            purpose: {
              type: "ref",
              ref: "lex:app.bsky.graph.defs#listPurpose"
            },
            avatar: {
              type: "string"
            },
            viewer: {
              type: "ref",
              ref: "lex:app.bsky.graph.defs#listViewerState"
            },
            indexedAt: {
              type: "string",
              format: "datetime"
            }
          }
        },
        listView: {
          type: "object",
          required: ["uri", "cid", "creator", "name", "purpose", "indexedAt"],
          properties: {
            uri: {
              type: "string",
              format: "at-uri"
            },
            cid: {
              type: "string",
              format: "cid"
            },
            creator: {
              type: "ref",
              ref: "lex:app.bsky.actor.defs#profileView"
            },
            name: {
              type: "string",
              maxLength: 64,
              minLength: 1
            },
            purpose: {
              type: "ref",
              ref: "lex:app.bsky.graph.defs#listPurpose"
            },
            description: {
              type: "string",
              maxGraphemes: 300,
              maxLength: 3e3
            },
            descriptionFacets: {
              type: "array",
              items: {
                type: "ref",
                ref: "lex:app.bsky.richtext.facet"
              }
            },
            avatar: {
              type: "string"
            },
            viewer: {
              type: "ref",
              ref: "lex:app.bsky.graph.defs#listViewerState"
            },
            indexedAt: {
              type: "string",
              format: "datetime"
            }
          }
        },
        listItemView: {
          type: "object",
          required: ["uri", "subject"],
          properties: {
            uri: {
              type: "string",
              format: "at-uri"
            },
            subject: {
              type: "ref",
              ref: "lex:app.bsky.actor.defs#profileView"
            }
          }
        },
        listPurpose: {
          type: "string",
          knownValues: [
            "app.bsky.graph.defs#modlist",
            "app.bsky.graph.defs#curatelist"
          ]
        },
        modlist: {
          type: "token",
          description: "A list of actors to apply an aggregate moderation action (mute/block) on."
        },
        curatelist: {
          type: "token",
          description: "A list of actors used for curation purposes such as list feeds or interaction gating."
        },
        listViewerState: {
          type: "object",
          properties: {
            muted: {
              type: "boolean"
            },
            blocked: {
              type: "string",
              format: "at-uri"
            }
          }
        },
        notFoundActor: {
          type: "object",
          description: "indicates that a handle or DID could not be resolved",
          required: ["actor", "notFound"],
          properties: {
            actor: {
              type: "string",
              format: "at-identifier"
            },
            notFound: {
              type: "boolean",
              const: !0
            }
          }
        },
        relationship: {
          type: "object",
          description: "lists the bi-directional graph relationships between one actor (not indicated in the object), and the target actors (the DID included in the object)",
          required: ["did"],
          properties: {
            did: {
              type: "string",
              format: "did"
            },
            following: {
              type: "string",
              format: "at-uri",
              description: "if the actor follows this DID, this is the AT-URI of the follow record"
            },
            followedBy: {
              type: "string",
              format: "at-uri",
              description: "if the actor is followed by this DID, contains the AT-URI of the follow record"
            }
          }
        }
      }
    },
    AppBskyGraphFollow: {
      lexicon: 1,
      id: "app.bsky.graph.follow",
      defs: {
        main: {
          type: "record",
          description: "Record declaring a social 'follow' relationship of another account. Duplicate follows will be ignored by the AppView.",
          key: "tid",
          record: {
            type: "object",
            required: ["subject", "createdAt"],
            properties: {
              subject: {
                type: "string",
                format: "did"
              },
              createdAt: {
                type: "string",
                format: "datetime"
              }
            }
          }
        }
      }
    },
    AppBskyGraphGetBlocks: {
      lexicon: 1,
      id: "app.bsky.graph.getBlocks",
      defs: {
        main: {
          type: "query",
          description: "Enumerates which accounts the requesting account is currently blocking. Requires auth.",
          parameters: {
            type: "params",
            properties: {
              limit: {
                type: "integer",
                minimum: 1,
                maximum: 100,
                default: 50
              },
              cursor: {
                type: "string"
              }
            }
          },
          output: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["blocks"],
              properties: {
                cursor: {
                  type: "string"
                },
                blocks: {
                  type: "array",
                  items: {
                    type: "ref",
                    ref: "lex:app.bsky.actor.defs#profileView"
                  }
                }
              }
            }
          }
        }
      }
    },
    AppBskyGraphGetFollowers: {
      lexicon: 1,
      id: "app.bsky.graph.getFollowers",
      defs: {
        main: {
          type: "query",
          description: "Enumerates accounts which follow a specified account (actor).",
          parameters: {
            type: "params",
            required: ["actor"],
            properties: {
              actor: {
                type: "string",
                format: "at-identifier"
              },
              limit: {
                type: "integer",
                minimum: 1,
                maximum: 100,
                default: 50
              },
              cursor: {
                type: "string"
              }
            }
          },
          output: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["subject", "followers"],
              properties: {
                subject: {
                  type: "ref",
                  ref: "lex:app.bsky.actor.defs#profileView"
                },
                cursor: {
                  type: "string"
                },
                followers: {
                  type: "array",
                  items: {
                    type: "ref",
                    ref: "lex:app.bsky.actor.defs#profileView"
                  }
                }
              }
            }
          }
        }
      }
    },
    AppBskyGraphGetFollows: {
      lexicon: 1,
      id: "app.bsky.graph.getFollows",
      defs: {
        main: {
          type: "query",
          description: "Enumerates accounts which a specified account (actor) follows.",
          parameters: {
            type: "params",
            required: ["actor"],
            properties: {
              actor: {
                type: "string",
                format: "at-identifier"
              },
              limit: {
                type: "integer",
                minimum: 1,
                maximum: 100,
                default: 50
              },
              cursor: {
                type: "string"
              }
            }
          },
          output: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["subject", "follows"],
              properties: {
                subject: {
                  type: "ref",
                  ref: "lex:app.bsky.actor.defs#profileView"
                },
                cursor: {
                  type: "string"
                },
                follows: {
                  type: "array",
                  items: {
                    type: "ref",
                    ref: "lex:app.bsky.actor.defs#profileView"
                  }
                }
              }
            }
          }
        }
      }
    },
    AppBskyGraphGetList: {
      lexicon: 1,
      id: "app.bsky.graph.getList",
      defs: {
        main: {
          type: "query",
          description: "Gets a 'view' (with additional context) of a specified list.",
          parameters: {
            type: "params",
            required: ["list"],
            properties: {
              list: {
                type: "string",
                format: "at-uri",
                description: "Reference (AT-URI) of the list record to hydrate."
              },
              limit: {
                type: "integer",
                minimum: 1,
                maximum: 100,
                default: 50
              },
              cursor: {
                type: "string"
              }
            }
          },
          output: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["list", "items"],
              properties: {
                cursor: {
                  type: "string"
                },
                list: {
                  type: "ref",
                  ref: "lex:app.bsky.graph.defs#listView"
                },
                items: {
                  type: "array",
                  items: {
                    type: "ref",
                    ref: "lex:app.bsky.graph.defs#listItemView"
                  }
                }
              }
            }
          }
        }
      }
    },
    AppBskyGraphGetListBlocks: {
      lexicon: 1,
      id: "app.bsky.graph.getListBlocks",
      defs: {
        main: {
          type: "query",
          description: "Get mod lists that the requesting account (actor) is blocking. Requires auth.",
          parameters: {
            type: "params",
            properties: {
              limit: {
                type: "integer",
                minimum: 1,
                maximum: 100,
                default: 50
              },
              cursor: {
                type: "string"
              }
            }
          },
          output: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["lists"],
              properties: {
                cursor: {
                  type: "string"
                },
                lists: {
                  type: "array",
                  items: {
                    type: "ref",
                    ref: "lex:app.bsky.graph.defs#listView"
                  }
                }
              }
            }
          }
        }
      }
    },
    AppBskyGraphGetListMutes: {
      lexicon: 1,
      id: "app.bsky.graph.getListMutes",
      defs: {
        main: {
          type: "query",
          description: "Enumerates mod lists that the requesting account (actor) currently has muted. Requires auth.",
          parameters: {
            type: "params",
            properties: {
              limit: {
                type: "integer",
                minimum: 1,
                maximum: 100,
                default: 50
              },
              cursor: {
                type: "string"
              }
            }
          },
          output: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["lists"],
              properties: {
                cursor: {
                  type: "string"
                },
                lists: {
                  type: "array",
                  items: {
                    type: "ref",
                    ref: "lex:app.bsky.graph.defs#listView"
                  }
                }
              }
            }
          }
        }
      }
    },
    AppBskyGraphGetLists: {
      lexicon: 1,
      id: "app.bsky.graph.getLists",
      defs: {
        main: {
          type: "query",
          description: "Enumerates the lists created by a specified account (actor).",
          parameters: {
            type: "params",
            required: ["actor"],
            properties: {
              actor: {
                type: "string",
                format: "at-identifier",
                description: "The account (actor) to enumerate lists from."
              },
              limit: {
                type: "integer",
                minimum: 1,
                maximum: 100,
                default: 50
              },
              cursor: {
                type: "string"
              }
            }
          },
          output: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["lists"],
              properties: {
                cursor: {
                  type: "string"
                },
                lists: {
                  type: "array",
                  items: {
                    type: "ref",
                    ref: "lex:app.bsky.graph.defs#listView"
                  }
                }
              }
            }
          }
        }
      }
    },
    AppBskyGraphGetMutes: {
      lexicon: 1,
      id: "app.bsky.graph.getMutes",
      defs: {
        main: {
          type: "query",
          description: "Enumerates accounts that the requesting account (actor) currently has muted. Requires auth.",
          parameters: {
            type: "params",
            properties: {
              limit: {
                type: "integer",
                minimum: 1,
                maximum: 100,
                default: 50
              },
              cursor: {
                type: "string"
              }
            }
          },
          output: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["mutes"],
              properties: {
                cursor: {
                  type: "string"
                },
                mutes: {
                  type: "array",
                  items: {
                    type: "ref",
                    ref: "lex:app.bsky.actor.defs#profileView"
                  }
                }
              }
            }
          }
        }
      }
    },
    AppBskyGraphGetRelationships: {
      lexicon: 1,
      id: "app.bsky.graph.getRelationships",
      defs: {
        main: {
          type: "query",
          description: "Enumerates public relationships between one account, and a list of other accounts. Does not require auth.",
          parameters: {
            type: "params",
            required: ["actor"],
            properties: {
              actor: {
                type: "string",
                format: "at-identifier",
                description: "Primary account requesting relationships for."
              },
              others: {
                type: "array",
                description: "List of 'other' accounts to be related back to the primary.",
                maxLength: 30,
                items: {
                  type: "string",
                  format: "at-identifier"
                }
              }
            }
          },
          output: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["relationships"],
              properties: {
                actor: {
                  type: "string",
                  format: "did"
                },
                relationships: {
                  type: "array",
                  items: {
                    type: "union",
                    refs: [
                      "lex:app.bsky.graph.defs#relationship",
                      "lex:app.bsky.graph.defs#notFoundActor"
                    ]
                  }
                }
              }
            }
          },
          errors: [
            {
              name: "ActorNotFound",
              description: "the primary actor at-identifier could not be resolved"
            }
          ]
        }
      }
    },
    AppBskyGraphGetSuggestedFollowsByActor: {
      lexicon: 1,
      id: "app.bsky.graph.getSuggestedFollowsByActor",
      defs: {
        main: {
          type: "query",
          description: "Enumerates follows similar to a given account (actor). Expected use is to recommend additional accounts immediately after following one account.",
          parameters: {
            type: "params",
            required: ["actor"],
            properties: {
              actor: {
                type: "string",
                format: "at-identifier"
              }
            }
          },
          output: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["suggestions"],
              properties: {
                suggestions: {
                  type: "array",
                  items: {
                    type: "ref",
                    ref: "lex:app.bsky.actor.defs#profileView"
                  }
                }
              }
            }
          }
        }
      }
    },
    AppBskyGraphList: {
      lexicon: 1,
      id: "app.bsky.graph.list",
      defs: {
        main: {
          type: "record",
          description: "Record representing a list of accounts (actors). Scope includes both moderation-oriented lists and curration-oriented lists.",
          key: "tid",
          record: {
            type: "object",
            required: ["name", "purpose", "createdAt"],
            properties: {
              purpose: {
                type: "ref",
                description: "Defines the purpose of the list (aka, moderation-oriented or curration-oriented)",
                ref: "lex:app.bsky.graph.defs#listPurpose"
              },
              name: {
                type: "string",
                maxLength: 64,
                minLength: 1,
                description: "Display name for list; can not be empty."
              },
              description: {
                type: "string",
                maxGraphemes: 300,
                maxLength: 3e3
              },
              descriptionFacets: {
                type: "array",
                items: {
                  type: "ref",
                  ref: "lex:app.bsky.richtext.facet"
                }
              },
              avatar: {
                type: "blob",
                accept: ["image/png", "image/jpeg"],
                maxSize: 1e6
              },
              labels: {
                type: "union",
                refs: ["lex:com.atproto.label.defs#selfLabels"]
              },
              createdAt: {
                type: "string",
                format: "datetime"
              }
            }
          }
        }
      }
    },
    AppBskyGraphListblock: {
      lexicon: 1,
      id: "app.bsky.graph.listblock",
      defs: {
        main: {
          type: "record",
          description: "Record representing a block relationship against an entire an entire list of accounts (actors).",
          key: "tid",
          record: {
            type: "object",
            required: ["subject", "createdAt"],
            properties: {
              subject: {
                type: "string",
                format: "at-uri",
                description: "Reference (AT-URI) to the mod list record."
              },
              createdAt: {
                type: "string",
                format: "datetime"
              }
            }
          }
        }
      }
    },
    AppBskyGraphListitem: {
      lexicon: 1,
      id: "app.bsky.graph.listitem",
      defs: {
        main: {
          type: "record",
          description: "Record representing an account's inclusion on a specific list. The AppView will ignore duplicate listitem records.",
          key: "tid",
          record: {
            type: "object",
            required: ["subject", "list", "createdAt"],
            properties: {
              subject: {
                type: "string",
                format: "did",
                description: "The account which is included on the list."
              },
              list: {
                type: "string",
                format: "at-uri",
                description: "Reference (AT-URI) to the list record (app.bsky.graph.list)."
              },
              createdAt: {
                type: "string",
                format: "datetime"
              }
            }
          }
        }
      }
    },
    AppBskyGraphMuteActor: {
      lexicon: 1,
      id: "app.bsky.graph.muteActor",
      defs: {
        main: {
          type: "procedure",
          description: "Creates a mute relationship for the specified account. Mutes are private in Bluesky. Requires auth.",
          input: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["actor"],
              properties: {
                actor: {
                  type: "string",
                  format: "at-identifier"
                }
              }
            }
          }
        }
      }
    },
    AppBskyGraphMuteActorList: {
      lexicon: 1,
      id: "app.bsky.graph.muteActorList",
      defs: {
        main: {
          type: "procedure",
          description: "Creates a mute relationship for the specified list of accounts. Mutes are private in Bluesky. Requires auth.",
          input: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["list"],
              properties: {
                list: {
                  type: "string",
                  format: "at-uri"
                }
              }
            }
          }
        }
      }
    },
    AppBskyGraphUnmuteActor: {
      lexicon: 1,
      id: "app.bsky.graph.unmuteActor",
      defs: {
        main: {
          type: "procedure",
          description: "Unmutes the specified account. Requires auth.",
          input: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["actor"],
              properties: {
                actor: {
                  type: "string",
                  format: "at-identifier"
                }
              }
            }
          }
        }
      }
    },
    AppBskyGraphUnmuteActorList: {
      lexicon: 1,
      id: "app.bsky.graph.unmuteActorList",
      defs: {
        main: {
          type: "procedure",
          description: "Unmutes the specified list of accounts. Requires auth.",
          input: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["list"],
              properties: {
                list: {
                  type: "string",
                  format: "at-uri"
                }
              }
            }
          }
        }
      }
    },
    AppBskyNotificationGetUnreadCount: {
      lexicon: 1,
      id: "app.bsky.notification.getUnreadCount",
      defs: {
        main: {
          type: "query",
          description: "Count the number of unread notifications for the requesting account. Requires auth.",
          parameters: {
            type: "params",
            properties: {
              seenAt: {
                type: "string",
                format: "datetime"
              }
            }
          },
          output: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["count"],
              properties: {
                count: {
                  type: "integer"
                }
              }
            }
          }
        }
      }
    },
    AppBskyNotificationListNotifications: {
      lexicon: 1,
      id: "app.bsky.notification.listNotifications",
      defs: {
        main: {
          type: "query",
          description: "Enumerate notifications for the requesting account. Requires auth.",
          parameters: {
            type: "params",
            properties: {
              limit: {
                type: "integer",
                minimum: 1,
                maximum: 100,
                default: 50
              },
              cursor: {
                type: "string"
              },
              seenAt: {
                type: "string",
                format: "datetime"
              }
            }
          },
          output: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["notifications"],
              properties: {
                cursor: {
                  type: "string"
                },
                notifications: {
                  type: "array",
                  items: {
                    type: "ref",
                    ref: "lex:app.bsky.notification.listNotifications#notification"
                  }
                },
                seenAt: {
                  type: "string",
                  format: "datetime"
                }
              }
            }
          }
        },
        notification: {
          type: "object",
          required: [
            "uri",
            "cid",
            "author",
            "reason",
            "record",
            "isRead",
            "indexedAt"
          ],
          properties: {
            uri: {
              type: "string",
              format: "at-uri"
            },
            cid: {
              type: "string",
              format: "cid"
            },
            author: {
              type: "ref",
              ref: "lex:app.bsky.actor.defs#profileView"
            },
            reason: {
              type: "string",
              description: "Expected values are 'like', 'repost', 'follow', 'mention', 'reply', and 'quote'.",
              knownValues: [
                "like",
                "repost",
                "follow",
                "mention",
                "reply",
                "quote"
              ]
            },
            reasonSubject: {
              type: "string",
              format: "at-uri"
            },
            record: {
              type: "unknown"
            },
            isRead: {
              type: "boolean"
            },
            indexedAt: {
              type: "string",
              format: "datetime"
            },
            labels: {
              type: "array",
              items: {
                type: "ref",
                ref: "lex:com.atproto.label.defs#label"
              }
            }
          }
        }
      }
    },
    AppBskyNotificationRegisterPush: {
      lexicon: 1,
      id: "app.bsky.notification.registerPush",
      defs: {
        main: {
          type: "procedure",
          description: "Register to receive push notifications, via a specified service, for the requesting account. Requires auth.",
          input: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["serviceDid", "token", "platform", "appId"],
              properties: {
                serviceDid: {
                  type: "string",
                  format: "did"
                },
                token: {
                  type: "string"
                },
                platform: {
                  type: "string",
                  knownValues: ["ios", "android", "web"]
                },
                appId: {
                  type: "string"
                }
              }
            }
          }
        }
      }
    },
    AppBskyNotificationUpdateSeen: {
      lexicon: 1,
      id: "app.bsky.notification.updateSeen",
      defs: {
        main: {
          type: "procedure",
          description: "Notify server that the requesting account has seen notifications. Requires auth.",
          input: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["seenAt"],
              properties: {
                seenAt: {
                  type: "string",
                  format: "datetime"
                }
              }
            }
          }
        }
      }
    },
    AppBskyRichtextFacet: {
      lexicon: 1,
      id: "app.bsky.richtext.facet",
      defs: {
        main: {
          type: "object",
          description: "Annotation of a sub-string within rich text.",
          required: ["index", "features"],
          properties: {
            index: {
              type: "ref",
              ref: "lex:app.bsky.richtext.facet#byteSlice"
            },
            features: {
              type: "array",
              items: {
                type: "union",
                refs: [
                  "lex:app.bsky.richtext.facet#mention",
                  "lex:app.bsky.richtext.facet#link",
                  "lex:app.bsky.richtext.facet#tag"
                ]
              }
            }
          }
        },
        mention: {
          type: "object",
          description: "Facet feature for mention of another account. The text is usually a handle, including a '@' prefix, but the facet reference is a DID.",
          required: ["did"],
          properties: {
            did: {
              type: "string",
              format: "did"
            }
          }
        },
        link: {
          type: "object",
          description: "Facet feature for a URL. The text URL may have been simplified or truncated, but the facet reference should be a complete URL.",
          required: ["uri"],
          properties: {
            uri: {
              type: "string",
              format: "uri"
            }
          }
        },
        tag: {
          type: "object",
          description: "Facet feature for a hashtag. The text usually includes a '#' prefix, but the facet reference should not (except in the case of 'double hash tags').",
          required: ["tag"],
          properties: {
            tag: {
              type: "string",
              maxLength: 640,
              maxGraphemes: 64
            }
          }
        },
        byteSlice: {
          type: "object",
          description: "Specifies the sub-string range a facet feature applies to. Start index is inclusive, end index is exclusive. Indices are zero-indexed, counting bytes of the UTF-8 encoded text. NOTE: some languages, like Javascript, use UTF-16 or Unicode codepoints for string slice indexing; in these languages, convert to byte arrays before working with facets.",
          required: ["byteStart", "byteEnd"],
          properties: {
            byteStart: {
              type: "integer",
              minimum: 0
            },
            byteEnd: {
              type: "integer",
              minimum: 0
            }
          }
        }
      }
    },
    AppBskyUnspeccedDefs: {
      lexicon: 1,
      id: "app.bsky.unspecced.defs",
      defs: {
        skeletonSearchPost: {
          type: "object",
          required: ["uri"],
          properties: {
            uri: {
              type: "string",
              format: "at-uri"
            }
          }
        },
        skeletonSearchActor: {
          type: "object",
          required: ["did"],
          properties: {
            did: {
              type: "string",
              format: "did"
            }
          }
        }
      }
    },
    AppBskyUnspeccedGetPopularFeedGenerators: {
      lexicon: 1,
      id: "app.bsky.unspecced.getPopularFeedGenerators",
      defs: {
        main: {
          type: "query",
          description: "An unspecced view of globally popular feed generators.",
          parameters: {
            type: "params",
            properties: {
              limit: {
                type: "integer",
                minimum: 1,
                maximum: 100,
                default: 50
              },
              cursor: {
                type: "string"
              },
              query: {
                type: "string"
              }
            }
          },
          output: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["feeds"],
              properties: {
                cursor: {
                  type: "string"
                },
                feeds: {
                  type: "array",
                  items: {
                    type: "ref",
                    ref: "lex:app.bsky.feed.defs#generatorView"
                  }
                }
              }
            }
          }
        }
      }
    },
    AppBskyUnspeccedGetTaggedSuggestions: {
      lexicon: 1,
      id: "app.bsky.unspecced.getTaggedSuggestions",
      defs: {
        main: {
          type: "query",
          description: "Get a list of suggestions (feeds and users) tagged with categories",
          parameters: {
            type: "params",
            properties: {}
          },
          output: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["suggestions"],
              properties: {
                suggestions: {
                  type: "array",
                  items: {
                    type: "ref",
                    ref: "lex:app.bsky.unspecced.getTaggedSuggestions#suggestion"
                  }
                }
              }
            }
          }
        },
        suggestion: {
          type: "object",
          required: ["tag", "subjectType", "subject"],
          properties: {
            tag: {
              type: "string"
            },
            subjectType: {
              type: "string",
              knownValues: ["actor", "feed"]
            },
            subject: {
              type: "string",
              format: "uri"
            }
          }
        }
      }
    },
    AppBskyUnspeccedSearchActorsSkeleton: {
      lexicon: 1,
      id: "app.bsky.unspecced.searchActorsSkeleton",
      defs: {
        main: {
          type: "query",
          description: "Backend Actors (profile) search, returns only skeleton.",
          parameters: {
            type: "params",
            required: ["q"],
            properties: {
              q: {
                type: "string",
                description: "Search query string; syntax, phrase, boolean, and faceting is unspecified, but Lucene query syntax is recommended. For typeahead search, only simple term match is supported, not full syntax."
              },
              typeahead: {
                type: "boolean",
                description: "If true, acts as fast/simple 'typeahead' query."
              },
              limit: {
                type: "integer",
                minimum: 1,
                maximum: 100,
                default: 25
              },
              cursor: {
                type: "string",
                description: "Optional pagination mechanism; may not necessarily allow scrolling through entire result set."
              }
            }
          },
          output: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["actors"],
              properties: {
                cursor: {
                  type: "string"
                },
                hitsTotal: {
                  type: "integer",
                  description: "Count of search hits. Optional, may be rounded/truncated, and may not be possible to paginate through all hits."
                },
                actors: {
                  type: "array",
                  items: {
                    type: "ref",
                    ref: "lex:app.bsky.unspecced.defs#skeletonSearchActor"
                  }
                }
              }
            }
          },
          errors: [
            {
              name: "BadQueryString"
            }
          ]
        }
      }
    },
    AppBskyUnspeccedSearchPostsSkeleton: {
      lexicon: 1,
      id: "app.bsky.unspecced.searchPostsSkeleton",
      defs: {
        main: {
          type: "query",
          description: "Backend Posts search, returns only skeleton",
          parameters: {
            type: "params",
            required: ["q"],
            properties: {
              q: {
                type: "string",
                description: "Search query string; syntax, phrase, boolean, and faceting is unspecified, but Lucene query syntax is recommended."
              },
              limit: {
                type: "integer",
                minimum: 1,
                maximum: 100,
                default: 25
              },
              cursor: {
                type: "string",
                description: "Optional pagination mechanism; may not necessarily allow scrolling through entire result set."
              }
            }
          },
          output: {
            encoding: "application/json",
            schema: {
              type: "object",
              required: ["posts"],
              properties: {
                cursor: {
                  type: "string"
                },
                hitsTotal: {
                  type: "integer",
                  description: "Count of search hits. Optional, may be rounded/truncated, and may not be possible to paginate through all hits."
                },
                posts: {
                  type: "array",
                  items: {
                    type: "ref",
                    ref: "lex:app.bsky.unspecced.defs#skeletonSearchPost"
                  }
                }
              }
            }
          },
          errors: [
            {
              name: "BadQueryString"
            }
          ]
        }
      }
    }
  }, Sn = Object.values(_d), E = new yn(Sn), xn = {};
  f(xn, {
    toKnownErr: () => Sd
  });
  function Sd(t) {
    return t;
  }
  var Bn = {};
  f(Bn, {
    toKnownErr: () => xd
  });
  function xd(t) {
    return t;
  }
  var kn = {};
  f(kn, {
    toKnownErr: () => Bd
  });
  function Bd(t) {
    return t;
  }
  var Kn = {};
  f(Kn, {
    toKnownErr: () => kd
  });
  function kd(t) {
    return t;
  }
  var Un = {};
  f(Un, {
    toKnownErr: () => Kd
  });
  function Kd(t) {
    return t;
  }
  var Vn = {};
  f(Vn, {
    SubjectHasActionError: () => Dn,
    toKnownErr: () => Nn
  });
  var Dn = class extends w {
    constructor(t) {
      super(t.status, t.error, t.message, t.headers);
    }
  };
  function Nn(t) {
    return t instanceof w && t.error === "SubjectHasAction" ? new Dn(t) : t;
  }
  var Pn = {};
  f(Pn, {
    toKnownErr: () => Ud
  });
  function Ud(t) {
    return t;
  }
  var In = {};
  f(In, {
    toKnownErr: () => Vd
  });
  function Vd(t) {
    return t;
  }
  var jn = {};
  f(jn, {
    toKnownErr: () => Dd
  });
  function Dd(t) {
    return t;
  }
  var Fn = {};
  f(Fn, {
    toKnownErr: () => Nd
  });
  function Nd(t) {
    return t;
  }
  var qn = {};
  f(qn, {
    toKnownErr: () => Pd
  });
  function Pd(t) {
    return t;
  }
  var Mn = {};
  f(Mn, {
    RecordNotFoundError: () => $n,
    toKnownErr: () => Gn
  });
  var $n = class extends w {
    constructor(t) {
      super(t.status, t.error, t.message, t.headers);
    }
  };
  function Gn(t) {
    return t instanceof w && t.error === "RecordNotFound" ? new $n(t) : t;
  }
  var On = {};
  f(On, {
    RepoNotFoundError: () => Xn,
    toKnownErr: () => zn
  });
  var Xn = class extends w {
    constructor(t) {
      super(t.status, t.error, t.message, t.headers);
    }
  };
  function zn(t) {
    return t instanceof w && t.error === "RepoNotFound" ? new Xn(t) : t;
  }
  var Hn = {};
  f(Hn, {
    toKnownErr: () => Id
  });
  function Id(t) {
    return t;
  }
  var Zn = {};
  f(Zn, {
    toKnownErr: () => jd
  });
  function jd(t) {
    return t;
  }
  var Wn = {};
  f(Wn, {
    toKnownErr: () => Fd
  });
  function Fd(t) {
    return t;
  }
  var Jn = {};
  f(Jn, {
    toKnownErr: () => qd
  });
  function qd(t) {
    return t;
  }
  var Qn = {};
  f(Qn, {
    toKnownErr: () => Md
  });
  function Md(t) {
    return t;
  }
  var Yn = {};
  f(Yn, {
    toKnownErr: () => $d
  });
  function $d(t) {
    return t;
  }
  var es = {};
  f(es, {
    toKnownErr: () => Gd
  });
  function Gd(t) {
    return t;
  }
  var ts = {};
  f(ts, {
    toKnownErr: () => Od
  });
  function Od(t) {
    return t;
  }
  var rs = {};
  f(rs, {
    toKnownErr: () => Xd
  });
  function Xd(t) {
    return t;
  }
  var is = {};
  f(is, {
    toKnownErr: () => zd
  });
  function zd(t) {
    return t;
  }
  var ns = {};
  f(ns, {
    toKnownErr: () => Hd
  });
  function Hd(t) {
    return t;
  }
  var ss = {};
  f(ss, {
    toKnownErr: () => Zd
  });
  function Zd(t) {
    return t;
  }
  var as = {};
  f(as, {
    toKnownErr: () => Wd
  });
  function Wd(t) {
    return t;
  }
  var os = {};
  f(os, {
    toKnownErr: () => Jd
  });
  function Jd(t) {
    return t;
  }
  var ps = {};
  f(ps, {
    toKnownErr: () => Qd
  });
  function Qd(t) {
    return t;
  }
  var us = {};
  f(us, {
    toKnownErr: () => Yd
  });
  function Yd(t) {
    return t;
  }
  var ls = {};
  f(ls, {
    toKnownErr: () => em
  });
  function em(t) {
    return t;
  }
  var fs = {};
  f(fs, {
    toKnownErr: () => tm
  });
  function tm(t) {
    return t;
  }
  var cs = {};
  f(cs, {
    toKnownErr: () => rm
  });
  function rm(t) {
    return t;
  }
  var ds = {};
  f(ds, {
    InvalidSwapError: () => ms,
    isCreate: () => im,
    isDelete: () => om,
    isUpdate: () => sm,
    toKnownErr: () => hs,
    validateCreate: () => nm,
    validateDelete: () => pm,
    validateUpdate: () => am
  });
  function g(t) {
    return typeof t == "object" && t !== null;
  }
  function R(t, i) {
    return i in t;
  }
  var ms = class extends w {
    constructor(t) {
      super(t.status, t.error, t.message, t.headers);
    }
  };
  function hs(t) {
    return t instanceof w && t.error === "InvalidSwap" ? new ms(t) : t;
  }
  function im(t) {
    return g(t) && R(t, "$type") && t.$type === "com.atproto.repo.applyWrites#create";
  }
  function nm(t) {
    return E.validate("com.atproto.repo.applyWrites#create", t);
  }
  function sm(t) {
    return g(t) && R(t, "$type") && t.$type === "com.atproto.repo.applyWrites#update";
  }
  function am(t) {
    return E.validate("com.atproto.repo.applyWrites#update", t);
  }
  function om(t) {
    return g(t) && R(t, "$type") && t.$type === "com.atproto.repo.applyWrites#delete";
  }
  function pm(t) {
    return E.validate("com.atproto.repo.applyWrites#delete", t);
  }
  var ys = {};
  f(ys, {
    InvalidSwapError: () => Es,
    toKnownErr: () => gs
  });
  var Es = class extends w {
    constructor(t) {
      super(t.status, t.error, t.message, t.headers);
    }
  };
  function gs(t) {
    return t instanceof w && t.error === "InvalidSwap" ? new Es(t) : t;
  }
  var Rs = {};
  f(Rs, {
    InvalidSwapError: () => bs,
    toKnownErr: () => As
  });
  var bs = class extends w {
    constructor(t) {
      super(t.status, t.error, t.message, t.headers);
    }
  };
  function As(t) {
    return t instanceof w && t.error === "InvalidSwap" ? new bs(t) : t;
  }
  var Ts = {};
  f(Ts, {
    toKnownErr: () => um
  });
  function um(t) {
    return t;
  }
  var vs = {};
  f(vs, {
    toKnownErr: () => lm
  });
  function lm(t) {
    return t;
  }
  var ws = {};
  f(ws, {
    toKnownErr: () => fm
  });
  function fm(t) {
    return t;
  }
  var Ls = {};
  f(Ls, {
    isRecordBlob: () => dm,
    toKnownErr: () => cm,
    validateRecordBlob: () => mm
  });
  function cm(t) {
    return t;
  }
  function dm(t) {
    return g(t) && R(t, "$type") && t.$type === "com.atproto.repo.listMissingBlobs#recordBlob";
  }
  function mm(t) {
    return E.validate("com.atproto.repo.listMissingBlobs#recordBlob", t);
  }
  var Cs = {};
  f(Cs, {
    isRecord: () => ym,
    toKnownErr: () => hm,
    validateRecord: () => Em
  });
  function hm(t) {
    return t;
  }
  function ym(t) {
    return g(t) && R(t, "$type") && t.$type === "com.atproto.repo.listRecords#record";
  }
  function Em(t) {
    return E.validate("com.atproto.repo.listRecords#record", t);
  }
  var Wr = {};
  f(Wr, {
    InvalidSwapError: () => _s,
    toKnownErr: () => Ss
  });
  var _s = class extends w {
    constructor(t) {
      super(t.status, t.error, t.message, t.headers);
    }
  };
  function Ss(t) {
    return t instanceof w && t.error === "InvalidSwap" ? new _s(t) : t;
  }
  var xs = {};
  f(xs, {
    toKnownErr: () => gm
  });
  function gm(t) {
    return t;
  }
  var Bs = {};
  f(Bs, {
    toKnownErr: () => Rm
  });
  function Rm(t) {
    return t;
  }
  var ks = {};
  f(ks, {
    toKnownErr: () => bm
  });
  function bm(t) {
    return t;
  }
  var Ks = {};
  f(Ks, {
    AccountNotFoundError: () => Us,
    ExpiredTokenError: () => Vs,
    InvalidEmailError: () => Ns,
    InvalidTokenError: () => Ds,
    toKnownErr: () => Ps
  });
  var Us = class extends w {
    constructor(t) {
      super(t.status, t.error, t.message, t.headers);
    }
  }, Vs = class extends w {
    constructor(t) {
      super(t.status, t.error, t.message, t.headers);
    }
  }, Ds = class extends w {
    constructor(t) {
      super(t.status, t.error, t.message, t.headers);
    }
  }, Ns = class extends w {
    constructor(t) {
      super(t.status, t.error, t.message, t.headers);
    }
  };
  function Ps(t) {
    if (t instanceof w) {
      if (t.error === "AccountNotFound")
        return new Us(t);
      if (t.error === "ExpiredToken")
        return new Vs(t);
      if (t.error === "InvalidToken")
        return new Ds(t);
      if (t.error === "InvalidEmail")
        return new Ns(t);
    }
    return t;
  }
  var Is = {};
  f(Is, {
    HandleNotAvailableError: () => Ms,
    IncompatibleDidDocError: () => Os,
    InvalidHandleError: () => js,
    InvalidInviteCodeError: () => qs,
    InvalidPasswordError: () => Fs,
    UnresolvableDidError: () => Gs,
    UnsupportedDomainError: () => $s,
    toKnownErr: () => Xs
  });
  var js = class extends w {
    constructor(t) {
      super(t.status, t.error, t.message, t.headers);
    }
  }, Fs = class extends w {
    constructor(t) {
      super(t.status, t.error, t.message, t.headers);
    }
  }, qs = class extends w {
    constructor(t) {
      super(t.status, t.error, t.message, t.headers);
    }
  }, Ms = class extends w {
    constructor(t) {
      super(t.status, t.error, t.message, t.headers);
    }
  }, $s = class extends w {
    constructor(t) {
      super(t.status, t.error, t.message, t.headers);
    }
  }, Gs = class extends w {
    constructor(t) {
      super(t.status, t.error, t.message, t.headers);
    }
  }, Os = class extends w {
    constructor(t) {
      super(t.status, t.error, t.message, t.headers);
    }
  };
  function Xs(t) {
    if (t instanceof w) {
      if (t.error === "InvalidHandle")
        return new js(t);
      if (t.error === "InvalidPassword")
        return new Fs(t);
      if (t.error === "InvalidInviteCode")
        return new qs(t);
      if (t.error === "HandleNotAvailable")
        return new Ms(t);
      if (t.error === "UnsupportedDomain")
        return new $s(t);
      if (t.error === "UnresolvableDid")
        return new Gs(t);
      if (t.error === "IncompatibleDidDoc")
        return new Os(t);
    }
    return t;
  }
  var zs = {};
  f(zs, {
    AccountTakedownError: () => Hs,
    isAppPassword: () => Am,
    toKnownErr: () => Zs,
    validateAppPassword: () => Tm
  });
  var Hs = class extends w {
    constructor(t) {
      super(t.status, t.error, t.message, t.headers);
    }
  };
  function Zs(t) {
    return t instanceof w && t.error === "AccountTakedown" ? new Hs(t) : t;
  }
  function Am(t) {
    return g(t) && R(t, "$type") && t.$type === "com.atproto.server.createAppPassword#appPassword";
  }
  function Tm(t) {
    return E.validate("com.atproto.server.createAppPassword#appPassword", t);
  }
  var Ws = {};
  f(Ws, {
    toKnownErr: () => vm
  });
  function vm(t) {
    return t;
  }
  var Js = {};
  f(Js, {
    isAccountCodes: () => Lm,
    toKnownErr: () => wm,
    validateAccountCodes: () => Cm
  });
  function wm(t) {
    return t;
  }
  function Lm(t) {
    return g(t) && R(t, "$type") && t.$type === "com.atproto.server.createInviteCodes#accountCodes";
  }
  function Cm(t) {
    return E.validate("com.atproto.server.createInviteCodes#accountCodes", t);
  }
  var Qs = {};
  f(Qs, {
    AccountTakedownError: () => Ys,
    toKnownErr: () => ea
  });
  var Ys = class extends w {
    constructor(t) {
      super(t.status, t.error, t.message, t.headers);
    }
  };
  function ea(t) {
    return t instanceof w && t.error === "AccountTakedown" ? new Ys(t) : t;
  }
  var ta = {};
  f(ta, {
    toKnownErr: () => _m
  });
  function _m(t) {
    return t;
  }
  var ra = {};
  f(ra, {
    ExpiredTokenError: () => ia,
    InvalidTokenError: () => na,
    toKnownErr: () => sa
  });
  var ia = class extends w {
    constructor(t) {
      super(t.status, t.error, t.message, t.headers);
    }
  }, na = class extends w {
    constructor(t) {
      super(t.status, t.error, t.message, t.headers);
    }
  };
  function sa(t) {
    if (t instanceof w) {
      if (t.error === "ExpiredToken")
        return new ia(t);
      if (t.error === "InvalidToken")
        return new na(t);
    }
    return t;
  }
  var aa = {};
  f(aa, {
    toKnownErr: () => Sm
  });
  function Sm(t) {
    return t;
  }
  var oa = {};
  f(oa, {
    isLinks: () => Bm,
    toKnownErr: () => xm,
    validateLinks: () => km
  });
  function xm(t) {
    return t;
  }
  function Bm(t) {
    return g(t) && R(t, "$type") && t.$type === "com.atproto.server.describeServer#links";
  }
  function km(t) {
    return E.validate("com.atproto.server.describeServer#links", t);
  }
  var pa = {};
  f(pa, {
    DuplicateCreateError: () => ua,
    toKnownErr: () => la
  });
  var ua = class extends w {
    constructor(t) {
      super(t.status, t.error, t.message, t.headers);
    }
  };
  function la(t) {
    return t instanceof w && t.error === "DuplicateCreate" ? new ua(t) : t;
  }
  var fa = {};
  f(fa, {
    toKnownErr: () => Km
  });
  function Km(t) {
    return t;
  }
  var ca = {};
  f(ca, {
    toKnownErr: () => Um
  });
  function Um(t) {
    return t;
  }
  var da = {};
  f(da, {
    AccountTakedownError: () => ma,
    isAppPassword: () => Vm,
    toKnownErr: () => ha,
    validateAppPassword: () => Dm
  });
  var ma = class extends w {
    constructor(t) {
      super(t.status, t.error, t.message, t.headers);
    }
  };
  function ha(t) {
    return t instanceof w && t.error === "AccountTakedown" ? new ma(t) : t;
  }
  function Vm(t) {
    return g(t) && R(t, "$type") && t.$type === "com.atproto.server.listAppPasswords#appPassword";
  }
  function Dm(t) {
    return E.validate("com.atproto.server.listAppPasswords#appPassword", t);
  }
  var ya = {};
  f(ya, {
    AccountTakedownError: () => Ea,
    toKnownErr: () => ga
  });
  var Ea = class extends w {
    constructor(t) {
      super(t.status, t.error, t.message, t.headers);
    }
  };
  function ga(t) {
    return t instanceof w && t.error === "AccountTakedown" ? new Ea(t) : t;
  }
  var Ra = {};
  f(Ra, {
    toKnownErr: () => Nm
  });
  function Nm(t) {
    return t;
  }
  var ba = {};
  f(ba, {
    toKnownErr: () => Pm
  });
  function Pm(t) {
    return t;
  }
  var Aa = {};
  f(Aa, {
    toKnownErr: () => Im
  });
  function Im(t) {
    return t;
  }
  var Ta = {};
  f(Ta, {
    toKnownErr: () => jm
  });
  function jm(t) {
    return t;
  }
  var va = {};
  f(va, {
    toKnownErr: () => Fm
  });
  function Fm(t) {
    return t;
  }
  var wa = {};
  f(wa, {
    ExpiredTokenError: () => La,
    InvalidTokenError: () => Ca,
    toKnownErr: () => _a
  });
  var La = class extends w {
    constructor(t) {
      super(t.status, t.error, t.message, t.headers);
    }
  }, Ca = class extends w {
    constructor(t) {
      super(t.status, t.error, t.message, t.headers);
    }
  };
  function _a(t) {
    if (t instanceof w) {
      if (t.error === "ExpiredToken")
        return new La(t);
      if (t.error === "InvalidToken")
        return new Ca(t);
    }
    return t;
  }
  var Sa = {};
  f(Sa, {
    toKnownErr: () => qm
  });
  function qm(t) {
    return t;
  }
  var xa = {};
  f(xa, {
    ExpiredTokenError: () => Ba,
    InvalidTokenError: () => ka,
    TokenRequiredError: () => Ka,
    toKnownErr: () => Ua
  });
  var Ba = class extends w {
    constructor(t) {
      super(t.status, t.error, t.message, t.headers);
    }
  }, ka = class extends w {
    constructor(t) {
      super(t.status, t.error, t.message, t.headers);
    }
  }, Ka = class extends w {
    constructor(t) {
      super(t.status, t.error, t.message, t.headers);
    }
  };
  function Ua(t) {
    if (t instanceof w) {
      if (t.error === "ExpiredToken")
        return new Ba(t);
      if (t.error === "InvalidToken")
        return new ka(t);
      if (t.error === "TokenRequired")
        return new Ka(t);
    }
    return t;
  }
  var Va = {};
  f(Va, {
    toKnownErr: () => Mm
  });
  function Mm(t) {
    return t;
  }
  var Da = {};
  f(Da, {
    toKnownErr: () => $m
  });
  function $m(t) {
    return t;
  }
  var Na = {};
  f(Na, {
    toKnownErr: () => Gm
  });
  function Gm(t) {
    return t;
  }
  var Pa = {};
  f(Pa, {
    HeadNotFoundError: () => Ia,
    toKnownErr: () => ja
  });
  var Ia = class extends w {
    constructor(t) {
      super(t.status, t.error, t.message, t.headers);
    }
  };
  function ja(t) {
    return t instanceof w && t.error === "HeadNotFound" ? new Ia(t) : t;
  }
  var Fa = {};
  f(Fa, {
    RepoNotFoundError: () => qa,
    toKnownErr: () => Ma
  });
  var qa = class extends w {
    constructor(t) {
      super(t.status, t.error, t.message, t.headers);
    }
  };
  function Ma(t) {
    return t instanceof w && t.error === "RepoNotFound" ? new qa(t) : t;
  }
  var $a = {};
  f($a, {
    toKnownErr: () => Om
  });
  function Om(t) {
    return t;
  }
  var Ga = {};
  f(Ga, {
    toKnownErr: () => Xm
  });
  function Xm(t) {
    return t;
  }
  var Oa = {};
  f(Oa, {
    toKnownErr: () => zm
  });
  function zm(t) {
    return t;
  }
  var Xa = {};
  f(Xa, {
    isRepo: () => Zm,
    toKnownErr: () => Hm,
    validateRepo: () => Wm
  });
  function Hm(t) {
    return t;
  }
  function Zm(t) {
    return g(t) && R(t, "$type") && t.$type === "com.atproto.sync.listRepos#repo";
  }
  function Wm(t) {
    return E.validate("com.atproto.sync.listRepos#repo", t);
  }
  var za = {};
  f(za, {
    toKnownErr: () => Jm
  });
  function Jm(t) {
    return t;
  }
  var Ha = {};
  f(Ha, {
    toKnownErr: () => Qm
  });
  function Qm(t) {
    return t;
  }
  var Za = {};
  f(Za, {
    toKnownErr: () => Ym
  });
  function Ym(t) {
    return t;
  }
  var Wa = {};
  f(Wa, {
    toKnownErr: () => eh
  });
  function eh(t) {
    return t;
  }
  var Ja = {};
  f(Ja, {
    toKnownErr: () => th
  });
  function th(t) {
    return t;
  }
  var Qa = {};
  f(Qa, {
    toKnownErr: () => rh
  });
  function rh(t) {
    return t;
  }
  var Ya = {};
  f(Ya, {
    toKnownErr: () => ih
  });
  function ih(t) {
    return t;
  }
  var eo = {};
  f(eo, {
    toKnownErr: () => nh
  });
  function nh(t) {
    return t;
  }
  var to = {};
  f(to, {
    toKnownErr: () => sh
  });
  function sh(t) {
    return t;
  }
  var ro = {};
  f(ro, {
    toKnownErr: () => ah
  });
  function ah(t) {
    return t;
  }
  var io = {};
  f(io, {
    toKnownErr: () => oh
  });
  function oh(t) {
    return t;
  }
  var no = {};
  f(no, {
    toKnownErr: () => ph
  });
  function ph(t) {
    return t;
  }
  var so = {};
  f(so, {
    isFeed: () => lh,
    isLinks: () => ch,
    toKnownErr: () => uh,
    validateFeed: () => fh,
    validateLinks: () => dh
  });
  function uh(t) {
    return t;
  }
  function lh(t) {
    return g(t) && R(t, "$type") && t.$type === "app.bsky.feed.describeFeedGenerator#feed";
  }
  function fh(t) {
    return E.validate("app.bsky.feed.describeFeedGenerator#feed", t);
  }
  function ch(t) {
    return g(t) && R(t, "$type") && t.$type === "app.bsky.feed.describeFeedGenerator#links";
  }
  function dh(t) {
    return E.validate("app.bsky.feed.describeFeedGenerator#links", t);
  }
  var ao = {};
  f(ao, {
    toKnownErr: () => mh
  });
  function mh(t) {
    return t;
  }
  var oo = {};
  f(oo, {
    BlockedActorError: () => po,
    BlockedByActorError: () => uo,
    toKnownErr: () => lo
  });
  var po = class extends w {
    constructor(t) {
      super(t.status, t.error, t.message, t.headers);
    }
  }, uo = class extends w {
    constructor(t) {
      super(t.status, t.error, t.message, t.headers);
    }
  };
  function lo(t) {
    if (t instanceof w) {
      if (t.error === "BlockedActor")
        return new po(t);
      if (t.error === "BlockedByActor")
        return new uo(t);
    }
    return t;
  }
  var fo = {};
  f(fo, {
    BlockedActorError: () => co,
    BlockedByActorError: () => mo,
    toKnownErr: () => ho
  });
  var co = class extends w {
    constructor(t) {
      super(t.status, t.error, t.message, t.headers);
    }
  }, mo = class extends w {
    constructor(t) {
      super(t.status, t.error, t.message, t.headers);
    }
  };
  function ho(t) {
    if (t instanceof w) {
      if (t.error === "BlockedActor")
        return new co(t);
      if (t.error === "BlockedByActor")
        return new mo(t);
    }
    return t;
  }
  var yo = {};
  f(yo, {
    UnknownFeedError: () => Eo,
    toKnownErr: () => go
  });
  var Eo = class extends w {
    constructor(t) {
      super(t.status, t.error, t.message, t.headers);
    }
  };
  function go(t) {
    return t instanceof w && t.error === "UnknownFeed" ? new Eo(t) : t;
  }
  var Ro = {};
  f(Ro, {
    toKnownErr: () => hh
  });
  function hh(t) {
    return t;
  }
  var bo = {};
  f(bo, {
    toKnownErr: () => yh
  });
  function yh(t) {
    return t;
  }
  var Ao = {};
  f(Ao, {
    UnknownFeedError: () => To,
    toKnownErr: () => vo
  });
  var To = class extends w {
    constructor(t) {
      super(t.status, t.error, t.message, t.headers);
    }
  };
  function vo(t) {
    return t instanceof w && t.error === "UnknownFeed" ? new To(t) : t;
  }
  var wo = {};
  f(wo, {
    isLike: () => gh,
    toKnownErr: () => Eh,
    validateLike: () => Rh
  });
  function Eh(t) {
    return t;
  }
  function gh(t) {
    return g(t) && R(t, "$type") && t.$type === "app.bsky.feed.getLikes#like";
  }
  function Rh(t) {
    return E.validate("app.bsky.feed.getLikes#like", t);
  }
  var Lo = {};
  f(Lo, {
    UnknownListError: () => Co,
    toKnownErr: () => _o
  });
  var Co = class extends w {
    constructor(t) {
      super(t.status, t.error, t.message, t.headers);
    }
  };
  function _o(t) {
    return t instanceof w && t.error === "UnknownList" ? new Co(t) : t;
  }
  var So = {};
  f(So, {
    NotFoundError: () => xo,
    toKnownErr: () => Bo
  });
  var xo = class extends w {
    constructor(t) {
      super(t.status, t.error, t.message, t.headers);
    }
  };
  function Bo(t) {
    return t instanceof w && t.error === "NotFound" ? new xo(t) : t;
  }
  var ko = {};
  f(ko, {
    toKnownErr: () => bh
  });
  function bh(t) {
    return t;
  }
  var Ko = {};
  f(Ko, {
    toKnownErr: () => Ah
  });
  function Ah(t) {
    return t;
  }
  var Uo = {};
  f(Uo, {
    toKnownErr: () => Th
  });
  function Th(t) {
    return t;
  }
  var Vo = {};
  f(Vo, {
    toKnownErr: () => vh
  });
  function vh(t) {
    return t;
  }
  var Do = {};
  f(Do, {
    BadQueryStringError: () => No,
    toKnownErr: () => Po
  });
  var No = class extends w {
    constructor(t) {
      super(t.status, t.error, t.message, t.headers);
    }
  };
  function Po(t) {
    return t instanceof w && t.error === "BadQueryString" ? new No(t) : t;
  }
  var Io = {};
  f(Io, {
    toKnownErr: () => wh
  });
  function wh(t) {
    return t;
  }
  var jo = {};
  f(jo, {
    toKnownErr: () => Lh
  });
  function Lh(t) {
    return t;
  }
  var Fo = {};
  f(Fo, {
    toKnownErr: () => Ch
  });
  function Ch(t) {
    return t;
  }
  var qo = {};
  f(qo, {
    toKnownErr: () => _h
  });
  function _h(t) {
    return t;
  }
  var Mo = {};
  f(Mo, {
    toKnownErr: () => Sh
  });
  function Sh(t) {
    return t;
  }
  var $o = {};
  f($o, {
    toKnownErr: () => xh
  });
  function xh(t) {
    return t;
  }
  var Go = {};
  f(Go, {
    toKnownErr: () => Bh
  });
  function Bh(t) {
    return t;
  }
  var Oo = {};
  f(Oo, {
    toKnownErr: () => kh
  });
  function kh(t) {
    return t;
  }
  var Xo = {};
  f(Xo, {
    ActorNotFoundError: () => zo,
    toKnownErr: () => Ho
  });
  var zo = class extends w {
    constructor(t) {
      super(t.status, t.error, t.message, t.headers);
    }
  };
  function Ho(t) {
    return t instanceof w && t.error === "ActorNotFound" ? new zo(t) : t;
  }
  var Zo = {};
  f(Zo, {
    toKnownErr: () => Kh
  });
  function Kh(t) {
    return t;
  }
  var Wo = {};
  f(Wo, {
    toKnownErr: () => Uh
  });
  function Uh(t) {
    return t;
  }
  var Jo = {};
  f(Jo, {
    toKnownErr: () => Vh
  });
  function Vh(t) {
    return t;
  }
  var Qo = {};
  f(Qo, {
    toKnownErr: () => Dh
  });
  function Dh(t) {
    return t;
  }
  var Yo = {};
  f(Yo, {
    toKnownErr: () => Nh
  });
  function Nh(t) {
    return t;
  }
  var ep = {};
  f(ep, {
    toKnownErr: () => Ph
  });
  function Ph(t) {
    return t;
  }
  var tp = {};
  f(tp, {
    isNotification: () => jh,
    toKnownErr: () => Ih,
    validateNotification: () => Fh
  });
  function Ih(t) {
    return t;
  }
  function jh(t) {
    return g(t) && R(t, "$type") && t.$type === "app.bsky.notification.listNotifications#notification";
  }
  function Fh(t) {
    return E.validate("app.bsky.notification.listNotifications#notification", t);
  }
  var rp = {};
  f(rp, {
    toKnownErr: () => qh
  });
  function qh(t) {
    return t;
  }
  var ip = {};
  f(ip, {
    toKnownErr: () => Mh
  });
  function Mh(t) {
    return t;
  }
  var np = {};
  f(np, {
    toKnownErr: () => $h
  });
  function $h(t) {
    return t;
  }
  var sp = {};
  f(sp, {
    isSuggestion: () => Oh,
    toKnownErr: () => Gh,
    validateSuggestion: () => Xh
  });
  function Gh(t) {
    return t;
  }
  function Oh(t) {
    return g(t) && R(t, "$type") && t.$type === "app.bsky.unspecced.getTaggedSuggestions#suggestion";
  }
  function Xh(t) {
    return E.validate("app.bsky.unspecced.getTaggedSuggestions#suggestion", t);
  }
  var ap = {};
  f(ap, {
    BadQueryStringError: () => op,
    toKnownErr: () => pp
  });
  var op = class extends w {
    constructor(t) {
      super(t.status, t.error, t.message, t.headers);
    }
  };
  function pp(t) {
    return t instanceof w && t.error === "BadQueryString" ? new op(t) : t;
  }
  var up = {};
  f(up, {
    BadQueryStringError: () => lp,
    toKnownErr: () => fp
  });
  var lp = class extends w {
    constructor(t) {
      super(t.status, t.error, t.message, t.headers);
    }
  };
  function fp(t) {
    return t instanceof w && t.error === "BadQueryString" ? new lp(t) : t;
  }
  var cp = {};
  f(cp, {
    REVIEWCLOSED: () => Dy,
    REVIEWESCALATED: () => Vy,
    REVIEWOPEN: () => Uy,
    isAccountView: () => uy,
    isBlobView: () => _y,
    isCommunicationTemplateView: () => aE,
    isImageDetails: () => xy,
    isModEventAcknowledge: () => Hy,
    isModEventComment: () => My,
    isModEventEmail: () => rE,
    isModEventEscalate: () => Wy,
    isModEventLabel: () => Xy,
    isModEventMute: () => Qy,
    isModEventReport: () => Gy,
    isModEventResolveAppeal: () => Fy,
    isModEventReverseTakedown: () => Iy,
    isModEventTag: () => nE,
    isModEventTakedown: () => Ny,
    isModEventUnmute: () => eE,
    isModEventView: () => Zh,
    isModEventViewDetail: () => Jh,
    isModeration: () => vy,
    isModerationDetail: () => Ly,
    isRecordView: () => Ey,
    isRecordViewDetail: () => Ry,
    isRecordViewNotFound: () => Ay,
    isRepoBlobRef: () => hy,
    isRepoRef: () => dy,
    isRepoView: () => sy,
    isRepoViewDetail: () => oy,
    isRepoViewNotFound: () => fy,
    isReportView: () => Yh,
    isReportViewDetail: () => iy,
    isStatusAttr: () => zh,
    isSubjectStatusView: () => ty,
    isVideoDetails: () => ky,
    validateAccountView: () => ly,
    validateBlobView: () => Sy,
    validateCommunicationTemplateView: () => oE,
    validateImageDetails: () => By,
    validateModEventAcknowledge: () => Zy,
    validateModEventComment: () => $y,
    validateModEventEmail: () => iE,
    validateModEventEscalate: () => Jy,
    validateModEventLabel: () => zy,
    validateModEventMute: () => Yy,
    validateModEventReport: () => Oy,
    validateModEventResolveAppeal: () => qy,
    validateModEventReverseTakedown: () => jy,
    validateModEventTag: () => sE,
    validateModEventTakedown: () => Py,
    validateModEventUnmute: () => tE,
    validateModEventView: () => Wh,
    validateModEventViewDetail: () => Qh,
    validateModeration: () => wy,
    validateModerationDetail: () => Cy,
    validateRecordView: () => gy,
    validateRecordViewDetail: () => by,
    validateRecordViewNotFound: () => Ty,
    validateRepoBlobRef: () => yy,
    validateRepoRef: () => my,
    validateRepoView: () => ay,
    validateRepoViewDetail: () => py,
    validateRepoViewNotFound: () => cy,
    validateReportView: () => ey,
    validateReportViewDetail: () => ny,
    validateStatusAttr: () => Hh,
    validateSubjectStatusView: () => ry,
    validateVideoDetails: () => Ky
  });
  function zh(t) {
    return g(t) && R(t, "$type") && t.$type === "com.atproto.admin.defs#statusAttr";
  }
  function Hh(t) {
    return E.validate("com.atproto.admin.defs#statusAttr", t);
  }
  function Zh(t) {
    return g(t) && R(t, "$type") && t.$type === "com.atproto.admin.defs#modEventView";
  }
  function Wh(t) {
    return E.validate("com.atproto.admin.defs#modEventView", t);
  }
  function Jh(t) {
    return g(t) && R(t, "$type") && t.$type === "com.atproto.admin.defs#modEventViewDetail";
  }
  function Qh(t) {
    return E.validate("com.atproto.admin.defs#modEventViewDetail", t);
  }
  function Yh(t) {
    return g(t) && R(t, "$type") && t.$type === "com.atproto.admin.defs#reportView";
  }
  function ey(t) {
    return E.validate("com.atproto.admin.defs#reportView", t);
  }
  function ty(t) {
    return g(t) && R(t, "$type") && t.$type === "com.atproto.admin.defs#subjectStatusView";
  }
  function ry(t) {
    return E.validate("com.atproto.admin.defs#subjectStatusView", t);
  }
  function iy(t) {
    return g(t) && R(t, "$type") && t.$type === "com.atproto.admin.defs#reportViewDetail";
  }
  function ny(t) {
    return E.validate("com.atproto.admin.defs#reportViewDetail", t);
  }
  function sy(t) {
    return g(t) && R(t, "$type") && t.$type === "com.atproto.admin.defs#repoView";
  }
  function ay(t) {
    return E.validate("com.atproto.admin.defs#repoView", t);
  }
  function oy(t) {
    return g(t) && R(t, "$type") && t.$type === "com.atproto.admin.defs#repoViewDetail";
  }
  function py(t) {
    return E.validate("com.atproto.admin.defs#repoViewDetail", t);
  }
  function uy(t) {
    return g(t) && R(t, "$type") && t.$type === "com.atproto.admin.defs#accountView";
  }
  function ly(t) {
    return E.validate("com.atproto.admin.defs#accountView", t);
  }
  function fy(t) {
    return g(t) && R(t, "$type") && t.$type === "com.atproto.admin.defs#repoViewNotFound";
  }
  function cy(t) {
    return E.validate("com.atproto.admin.defs#repoViewNotFound", t);
  }
  function dy(t) {
    return g(t) && R(t, "$type") && t.$type === "com.atproto.admin.defs#repoRef";
  }
  function my(t) {
    return E.validate("com.atproto.admin.defs#repoRef", t);
  }
  function hy(t) {
    return g(t) && R(t, "$type") && t.$type === "com.atproto.admin.defs#repoBlobRef";
  }
  function yy(t) {
    return E.validate("com.atproto.admin.defs#repoBlobRef", t);
  }
  function Ey(t) {
    return g(t) && R(t, "$type") && t.$type === "com.atproto.admin.defs#recordView";
  }
  function gy(t) {
    return E.validate("com.atproto.admin.defs#recordView", t);
  }
  function Ry(t) {
    return g(t) && R(t, "$type") && t.$type === "com.atproto.admin.defs#recordViewDetail";
  }
  function by(t) {
    return E.validate("com.atproto.admin.defs#recordViewDetail", t);
  }
  function Ay(t) {
    return g(t) && R(t, "$type") && t.$type === "com.atproto.admin.defs#recordViewNotFound";
  }
  function Ty(t) {
    return E.validate("com.atproto.admin.defs#recordViewNotFound", t);
  }
  function vy(t) {
    return g(t) && R(t, "$type") && t.$type === "com.atproto.admin.defs#moderation";
  }
  function wy(t) {
    return E.validate("com.atproto.admin.defs#moderation", t);
  }
  function Ly(t) {
    return g(t) && R(t, "$type") && t.$type === "com.atproto.admin.defs#moderationDetail";
  }
  function Cy(t) {
    return E.validate("com.atproto.admin.defs#moderationDetail", t);
  }
  function _y(t) {
    return g(t) && R(t, "$type") && t.$type === "com.atproto.admin.defs#blobView";
  }
  function Sy(t) {
    return E.validate("com.atproto.admin.defs#blobView", t);
  }
  function xy(t) {
    return g(t) && R(t, "$type") && t.$type === "com.atproto.admin.defs#imageDetails";
  }
  function By(t) {
    return E.validate("com.atproto.admin.defs#imageDetails", t);
  }
  function ky(t) {
    return g(t) && R(t, "$type") && t.$type === "com.atproto.admin.defs#videoDetails";
  }
  function Ky(t) {
    return E.validate("com.atproto.admin.defs#videoDetails", t);
  }
  var Uy = "com.atproto.admin.defs#reviewOpen", Vy = "com.atproto.admin.defs#reviewEscalated", Dy = "com.atproto.admin.defs#reviewClosed";
  function Ny(t) {
    return g(t) && R(t, "$type") && t.$type === "com.atproto.admin.defs#modEventTakedown";
  }
  function Py(t) {
    return E.validate("com.atproto.admin.defs#modEventTakedown", t);
  }
  function Iy(t) {
    return g(t) && R(t, "$type") && t.$type === "com.atproto.admin.defs#modEventReverseTakedown";
  }
  function jy(t) {
    return E.validate("com.atproto.admin.defs#modEventReverseTakedown", t);
  }
  function Fy(t) {
    return g(t) && R(t, "$type") && t.$type === "com.atproto.admin.defs#modEventResolveAppeal";
  }
  function qy(t) {
    return E.validate("com.atproto.admin.defs#modEventResolveAppeal", t);
  }
  function My(t) {
    return g(t) && R(t, "$type") && t.$type === "com.atproto.admin.defs#modEventComment";
  }
  function $y(t) {
    return E.validate("com.atproto.admin.defs#modEventComment", t);
  }
  function Gy(t) {
    return g(t) && R(t, "$type") && t.$type === "com.atproto.admin.defs#modEventReport";
  }
  function Oy(t) {
    return E.validate("com.atproto.admin.defs#modEventReport", t);
  }
  function Xy(t) {
    return g(t) && R(t, "$type") && t.$type === "com.atproto.admin.defs#modEventLabel";
  }
  function zy(t) {
    return E.validate("com.atproto.admin.defs#modEventLabel", t);
  }
  function Hy(t) {
    return g(t) && R(t, "$type") && t.$type === "com.atproto.admin.defs#modEventAcknowledge";
  }
  function Zy(t) {
    return E.validate("com.atproto.admin.defs#modEventAcknowledge", t);
  }
  function Wy(t) {
    return g(t) && R(t, "$type") && t.$type === "com.atproto.admin.defs#modEventEscalate";
  }
  function Jy(t) {
    return E.validate("com.atproto.admin.defs#modEventEscalate", t);
  }
  function Qy(t) {
    return g(t) && R(t, "$type") && t.$type === "com.atproto.admin.defs#modEventMute";
  }
  function Yy(t) {
    return E.validate("com.atproto.admin.defs#modEventMute", t);
  }
  function eE(t) {
    return g(t) && R(t, "$type") && t.$type === "com.atproto.admin.defs#modEventUnmute";
  }
  function tE(t) {
    return E.validate("com.atproto.admin.defs#modEventUnmute", t);
  }
  function rE(t) {
    return g(t) && R(t, "$type") && t.$type === "com.atproto.admin.defs#modEventEmail";
  }
  function iE(t) {
    return E.validate("com.atproto.admin.defs#modEventEmail", t);
  }
  function nE(t) {
    return g(t) && R(t, "$type") && t.$type === "com.atproto.admin.defs#modEventTag";
  }
  function sE(t) {
    return E.validate("com.atproto.admin.defs#modEventTag", t);
  }
  function aE(t) {
    return g(t) && R(t, "$type") && t.$type === "com.atproto.admin.defs#communicationTemplateView";
  }
  function oE(t) {
    return E.validate("com.atproto.admin.defs#communicationTemplateView", t);
  }
  var dp = {};
  f(dp, {
    isLabel: () => pE,
    isSelfLabel: () => cE,
    isSelfLabels: () => lE,
    validateLabel: () => uE,
    validateSelfLabel: () => dE,
    validateSelfLabels: () => fE
  });
  function pE(t) {
    return g(t) && R(t, "$type") && t.$type === "com.atproto.label.defs#label";
  }
  function uE(t) {
    return E.validate("com.atproto.label.defs#label", t);
  }
  function lE(t) {
    return g(t) && R(t, "$type") && t.$type === "com.atproto.label.defs#selfLabels";
  }
  function fE(t) {
    return E.validate("com.atproto.label.defs#selfLabels", t);
  }
  function cE(t) {
    return g(t) && R(t, "$type") && t.$type === "com.atproto.label.defs#selfLabel";
  }
  function dE(t) {
    return E.validate("com.atproto.label.defs#selfLabel", t);
  }
  var mp = {};
  f(mp, {
    isInfo: () => yE,
    isLabels: () => mE,
    validateInfo: () => EE,
    validateLabels: () => hE
  });
  function mE(t) {
    return g(t) && R(t, "$type") && t.$type === "com.atproto.label.subscribeLabels#labels";
  }
  function hE(t) {
    return E.validate("com.atproto.label.subscribeLabels#labels", t);
  }
  function yE(t) {
    return g(t) && R(t, "$type") && t.$type === "com.atproto.label.subscribeLabels#info";
  }
  function EE(t) {
    return E.validate("com.atproto.label.subscribeLabels#info", t);
  }
  var hp = {};
  f(hp, {
    REASONAPPEAL: () => wE,
    REASONMISLEADING: () => bE,
    REASONOTHER: () => vE,
    REASONRUDE: () => TE,
    REASONSEXUAL: () => AE,
    REASONSPAM: () => gE,
    REASONVIOLATION: () => RE
  });
  var gE = "com.atproto.moderation.defs#reasonSpam", RE = "com.atproto.moderation.defs#reasonViolation", bE = "com.atproto.moderation.defs#reasonMisleading", AE = "com.atproto.moderation.defs#reasonSexual", TE = "com.atproto.moderation.defs#reasonRude", vE = "com.atproto.moderation.defs#reasonOther", wE = "com.atproto.moderation.defs#reasonAppeal", yp = {};
  f(yp, {
    isMain: () => LE,
    validateMain: () => CE
  });
  function LE(t) {
    return g(t) && R(t, "$type") && (t.$type === "com.atproto.repo.strongRef#main" || t.$type === "com.atproto.repo.strongRef");
  }
  function CE(t) {
    return E.validate("com.atproto.repo.strongRef#main", t);
  }
  var Ep = {};
  f(Ep, {
    isInviteCode: () => _E,
    isInviteCodeUse: () => xE,
    validateInviteCode: () => SE,
    validateInviteCodeUse: () => BE
  });
  function _E(t) {
    return g(t) && R(t, "$type") && t.$type === "com.atproto.server.defs#inviteCode";
  }
  function SE(t) {
    return E.validate("com.atproto.server.defs#inviteCode", t);
  }
  function xE(t) {
    return g(t) && R(t, "$type") && t.$type === "com.atproto.server.defs#inviteCodeUse";
  }
  function BE(t) {
    return E.validate("com.atproto.server.defs#inviteCodeUse", t);
  }
  var gp = {};
  f(gp, {
    isCommit: () => kE,
    isHandle: () => DE,
    isIdentity: () => UE,
    isInfo: () => qE,
    isMigrate: () => PE,
    isRepoOp: () => $E,
    isTombstone: () => jE,
    validateCommit: () => KE,
    validateHandle: () => NE,
    validateIdentity: () => VE,
    validateInfo: () => ME,
    validateMigrate: () => IE,
    validateRepoOp: () => GE,
    validateTombstone: () => FE
  });
  function kE(t) {
    return g(t) && R(t, "$type") && t.$type === "com.atproto.sync.subscribeRepos#commit";
  }
  function KE(t) {
    return E.validate("com.atproto.sync.subscribeRepos#commit", t);
  }
  function UE(t) {
    return g(t) && R(t, "$type") && t.$type === "com.atproto.sync.subscribeRepos#identity";
  }
  function VE(t) {
    return E.validate("com.atproto.sync.subscribeRepos#identity", t);
  }
  function DE(t) {
    return g(t) && R(t, "$type") && t.$type === "com.atproto.sync.subscribeRepos#handle";
  }
  function NE(t) {
    return E.validate("com.atproto.sync.subscribeRepos#handle", t);
  }
  function PE(t) {
    return g(t) && R(t, "$type") && t.$type === "com.atproto.sync.subscribeRepos#migrate";
  }
  function IE(t) {
    return E.validate("com.atproto.sync.subscribeRepos#migrate", t);
  }
  function jE(t) {
    return g(t) && R(t, "$type") && t.$type === "com.atproto.sync.subscribeRepos#tombstone";
  }
  function FE(t) {
    return E.validate("com.atproto.sync.subscribeRepos#tombstone", t);
  }
  function qE(t) {
    return g(t) && R(t, "$type") && t.$type === "com.atproto.sync.subscribeRepos#info";
  }
  function ME(t) {
    return E.validate("com.atproto.sync.subscribeRepos#info", t);
  }
  function $E(t) {
    return g(t) && R(t, "$type") && t.$type === "com.atproto.sync.subscribeRepos#repoOp";
  }
  function GE(t) {
    return E.validate("com.atproto.sync.subscribeRepos#repoOp", t);
  }
  var x = {};
  f(x, {
    isAdultContentPref: () => YE,
    isContentLabelPref: () => tg,
    isFeedViewPref: () => og,
    isHiddenPostsPref: () => Eg,
    isInterestsPref: () => fg,
    isMutedWord: () => dg,
    isMutedWordsPref: () => hg,
    isPersonalDetailsPref: () => sg,
    isProfileView: () => zE,
    isProfileViewBasic: () => OE,
    isProfileViewDetailed: () => ZE,
    isSavedFeedsPref: () => ig,
    isThreadViewPref: () => ug,
    isViewerState: () => JE,
    validateAdultContentPref: () => eg,
    validateContentLabelPref: () => rg,
    validateFeedViewPref: () => pg,
    validateHiddenPostsPref: () => gg,
    validateInterestsPref: () => cg,
    validateMutedWord: () => mg,
    validateMutedWordsPref: () => yg,
    validatePersonalDetailsPref: () => ag,
    validateProfileView: () => HE,
    validateProfileViewBasic: () => XE,
    validateProfileViewDetailed: () => WE,
    validateSavedFeedsPref: () => ng,
    validateThreadViewPref: () => lg,
    validateViewerState: () => QE
  });
  function OE(t) {
    return g(t) && R(t, "$type") && t.$type === "app.bsky.actor.defs#profileViewBasic";
  }
  function XE(t) {
    return E.validate("app.bsky.actor.defs#profileViewBasic", t);
  }
  function zE(t) {
    return g(t) && R(t, "$type") && t.$type === "app.bsky.actor.defs#profileView";
  }
  function HE(t) {
    return E.validate("app.bsky.actor.defs#profileView", t);
  }
  function ZE(t) {
    return g(t) && R(t, "$type") && t.$type === "app.bsky.actor.defs#profileViewDetailed";
  }
  function WE(t) {
    return E.validate("app.bsky.actor.defs#profileViewDetailed", t);
  }
  function JE(t) {
    return g(t) && R(t, "$type") && t.$type === "app.bsky.actor.defs#viewerState";
  }
  function QE(t) {
    return E.validate("app.bsky.actor.defs#viewerState", t);
  }
  function YE(t) {
    return g(t) && R(t, "$type") && t.$type === "app.bsky.actor.defs#adultContentPref";
  }
  function eg(t) {
    return E.validate("app.bsky.actor.defs#adultContentPref", t);
  }
  function tg(t) {
    return g(t) && R(t, "$type") && t.$type === "app.bsky.actor.defs#contentLabelPref";
  }
  function rg(t) {
    return E.validate("app.bsky.actor.defs#contentLabelPref", t);
  }
  function ig(t) {
    return g(t) && R(t, "$type") && t.$type === "app.bsky.actor.defs#savedFeedsPref";
  }
  function ng(t) {
    return E.validate("app.bsky.actor.defs#savedFeedsPref", t);
  }
  function sg(t) {
    return g(t) && R(t, "$type") && t.$type === "app.bsky.actor.defs#personalDetailsPref";
  }
  function ag(t) {
    return E.validate("app.bsky.actor.defs#personalDetailsPref", t);
  }
  function og(t) {
    return g(t) && R(t, "$type") && t.$type === "app.bsky.actor.defs#feedViewPref";
  }
  function pg(t) {
    return E.validate("app.bsky.actor.defs#feedViewPref", t);
  }
  function ug(t) {
    return g(t) && R(t, "$type") && t.$type === "app.bsky.actor.defs#threadViewPref";
  }
  function lg(t) {
    return E.validate("app.bsky.actor.defs#threadViewPref", t);
  }
  function fg(t) {
    return g(t) && R(t, "$type") && t.$type === "app.bsky.actor.defs#interestsPref";
  }
  function cg(t) {
    return E.validate("app.bsky.actor.defs#interestsPref", t);
  }
  function dg(t) {
    return g(t) && R(t, "$type") && t.$type === "app.bsky.actor.defs#mutedWord";
  }
  function mg(t) {
    return E.validate("app.bsky.actor.defs#mutedWord", t);
  }
  function hg(t) {
    return g(t) && R(t, "$type") && t.$type === "app.bsky.actor.defs#mutedWordsPref";
  }
  function yg(t) {
    return E.validate("app.bsky.actor.defs#mutedWordsPref", t);
  }
  function Eg(t) {
    return g(t) && R(t, "$type") && t.$type === "app.bsky.actor.defs#hiddenPostsPref";
  }
  function gg(t) {
    return E.validate("app.bsky.actor.defs#hiddenPostsPref", t);
  }
  var Jr = {};
  f(Jr, {
    isRecord: () => Rg,
    validateRecord: () => bg
  });
  function Rg(t) {
    return g(t) && R(t, "$type") && (t.$type === "app.bsky.actor.profile#main" || t.$type === "app.bsky.actor.profile");
  }
  function bg(t) {
    return E.validate("app.bsky.actor.profile#main", t);
  }
  var Rp = {};
  f(Rp, {
    isExternal: () => vg,
    isMain: () => Ag,
    isView: () => Lg,
    isViewExternal: () => _g,
    validateExternal: () => wg,
    validateMain: () => Tg,
    validateView: () => Cg,
    validateViewExternal: () => Sg
  });
  function Ag(t) {
    return g(t) && R(t, "$type") && (t.$type === "app.bsky.embed.external#main" || t.$type === "app.bsky.embed.external");
  }
  function Tg(t) {
    return E.validate("app.bsky.embed.external#main", t);
  }
  function vg(t) {
    return g(t) && R(t, "$type") && t.$type === "app.bsky.embed.external#external";
  }
  function wg(t) {
    return E.validate("app.bsky.embed.external#external", t);
  }
  function Lg(t) {
    return g(t) && R(t, "$type") && t.$type === "app.bsky.embed.external#view";
  }
  function Cg(t) {
    return E.validate("app.bsky.embed.external#view", t);
  }
  function _g(t) {
    return g(t) && R(t, "$type") && t.$type === "app.bsky.embed.external#viewExternal";
  }
  function Sg(t) {
    return E.validate("app.bsky.embed.external#viewExternal", t);
  }
  var bp = {};
  f(bp, {
    isAspectRatio: () => Ug,
    isImage: () => kg,
    isMain: () => xg,
    isView: () => Dg,
    isViewImage: () => Pg,
    validateAspectRatio: () => Vg,
    validateImage: () => Kg,
    validateMain: () => Bg,
    validateView: () => Ng,
    validateViewImage: () => Ig
  });
  function xg(t) {
    return g(t) && R(t, "$type") && (t.$type === "app.bsky.embed.images#main" || t.$type === "app.bsky.embed.images");
  }
  function Bg(t) {
    return E.validate("app.bsky.embed.images#main", t);
  }
  function kg(t) {
    return g(t) && R(t, "$type") && t.$type === "app.bsky.embed.images#image";
  }
  function Kg(t) {
    return E.validate("app.bsky.embed.images#image", t);
  }
  function Ug(t) {
    return g(t) && R(t, "$type") && t.$type === "app.bsky.embed.images#aspectRatio";
  }
  function Vg(t) {
    return E.validate("app.bsky.embed.images#aspectRatio", t);
  }
  function Dg(t) {
    return g(t) && R(t, "$type") && t.$type === "app.bsky.embed.images#view";
  }
  function Ng(t) {
    return E.validate("app.bsky.embed.images#view", t);
  }
  function Pg(t) {
    return g(t) && R(t, "$type") && t.$type === "app.bsky.embed.images#viewImage";
  }
  function Ig(t) {
    return E.validate("app.bsky.embed.images#viewImage", t);
  }
  var Ue = {};
  f(Ue, {
    isMain: () => jg,
    isView: () => qg,
    isViewBlocked: () => zg,
    isViewNotFound: () => Og,
    isViewRecord: () => $g,
    validateMain: () => Fg,
    validateView: () => Mg,
    validateViewBlocked: () => Hg,
    validateViewNotFound: () => Xg,
    validateViewRecord: () => Gg
  });
  function jg(t) {
    return g(t) && R(t, "$type") && (t.$type === "app.bsky.embed.record#main" || t.$type === "app.bsky.embed.record");
  }
  function Fg(t) {
    return E.validate("app.bsky.embed.record#main", t);
  }
  function qg(t) {
    return g(t) && R(t, "$type") && t.$type === "app.bsky.embed.record#view";
  }
  function Mg(t) {
    return E.validate("app.bsky.embed.record#view", t);
  }
  function $g(t) {
    return g(t) && R(t, "$type") && t.$type === "app.bsky.embed.record#viewRecord";
  }
  function Gg(t) {
    return E.validate("app.bsky.embed.record#viewRecord", t);
  }
  function Og(t) {
    return g(t) && R(t, "$type") && t.$type === "app.bsky.embed.record#viewNotFound";
  }
  function Xg(t) {
    return E.validate("app.bsky.embed.record#viewNotFound", t);
  }
  function zg(t) {
    return g(t) && R(t, "$type") && t.$type === "app.bsky.embed.record#viewBlocked";
  }
  function Hg(t) {
    return E.validate("app.bsky.embed.record#viewBlocked", t);
  }
  var Qr = {};
  f(Qr, {
    isMain: () => Zg,
    isView: () => Jg,
    validateMain: () => Wg,
    validateView: () => Qg
  });
  function Zg(t) {
    return g(t) && R(t, "$type") && (t.$type === "app.bsky.embed.recordWithMedia#main" || t.$type === "app.bsky.embed.recordWithMedia");
  }
  function Wg(t) {
    return E.validate("app.bsky.embed.recordWithMedia#main", t);
  }
  function Jg(t) {
    return g(t) && R(t, "$type") && t.$type === "app.bsky.embed.recordWithMedia#view";
  }
  function Qg(t) {
    return E.validate("app.bsky.embed.recordWithMedia#view", t);
  }
  var Ap = {};
  f(Ap, {
    isBlockedAuthor: () => hR,
    isBlockedPost: () => dR,
    isFeedViewPost: () => iR,
    isGeneratorView: () => ER,
    isGeneratorViewerState: () => RR,
    isNotFoundPost: () => fR,
    isPostView: () => Yg,
    isReasonRepost: () => oR,
    isReplyRef: () => sR,
    isSkeletonFeedPost: () => AR,
    isSkeletonReasonRepost: () => vR,
    isThreadViewPost: () => uR,
    isThreadgateView: () => LR,
    isViewerState: () => tR,
    validateBlockedAuthor: () => yR,
    validateBlockedPost: () => mR,
    validateFeedViewPost: () => nR,
    validateGeneratorView: () => gR,
    validateGeneratorViewerState: () => bR,
    validateNotFoundPost: () => cR,
    validatePostView: () => eR,
    validateReasonRepost: () => pR,
    validateReplyRef: () => aR,
    validateSkeletonFeedPost: () => TR,
    validateSkeletonReasonRepost: () => wR,
    validateThreadViewPost: () => lR,
    validateThreadgateView: () => CR,
    validateViewerState: () => rR
  });
  function Yg(t) {
    return g(t) && R(t, "$type") && t.$type === "app.bsky.feed.defs#postView";
  }
  function eR(t) {
    return E.validate("app.bsky.feed.defs#postView", t);
  }
  function tR(t) {
    return g(t) && R(t, "$type") && t.$type === "app.bsky.feed.defs#viewerState";
  }
  function rR(t) {
    return E.validate("app.bsky.feed.defs#viewerState", t);
  }
  function iR(t) {
    return g(t) && R(t, "$type") && t.$type === "app.bsky.feed.defs#feedViewPost";
  }
  function nR(t) {
    return E.validate("app.bsky.feed.defs#feedViewPost", t);
  }
  function sR(t) {
    return g(t) && R(t, "$type") && t.$type === "app.bsky.feed.defs#replyRef";
  }
  function aR(t) {
    return E.validate("app.bsky.feed.defs#replyRef", t);
  }
  function oR(t) {
    return g(t) && R(t, "$type") && t.$type === "app.bsky.feed.defs#reasonRepost";
  }
  function pR(t) {
    return E.validate("app.bsky.feed.defs#reasonRepost", t);
  }
  function uR(t) {
    return g(t) && R(t, "$type") && t.$type === "app.bsky.feed.defs#threadViewPost";
  }
  function lR(t) {
    return E.validate("app.bsky.feed.defs#threadViewPost", t);
  }
  function fR(t) {
    return g(t) && R(t, "$type") && t.$type === "app.bsky.feed.defs#notFoundPost";
  }
  function cR(t) {
    return E.validate("app.bsky.feed.defs#notFoundPost", t);
  }
  function dR(t) {
    return g(t) && R(t, "$type") && t.$type === "app.bsky.feed.defs#blockedPost";
  }
  function mR(t) {
    return E.validate("app.bsky.feed.defs#blockedPost", t);
  }
  function hR(t) {
    return g(t) && R(t, "$type") && t.$type === "app.bsky.feed.defs#blockedAuthor";
  }
  function yR(t) {
    return E.validate("app.bsky.feed.defs#blockedAuthor", t);
  }
  function ER(t) {
    return g(t) && R(t, "$type") && t.$type === "app.bsky.feed.defs#generatorView";
  }
  function gR(t) {
    return E.validate("app.bsky.feed.defs#generatorView", t);
  }
  function RR(t) {
    return g(t) && R(t, "$type") && t.$type === "app.bsky.feed.defs#generatorViewerState";
  }
  function bR(t) {
    return E.validate("app.bsky.feed.defs#generatorViewerState", t);
  }
  function AR(t) {
    return g(t) && R(t, "$type") && t.$type === "app.bsky.feed.defs#skeletonFeedPost";
  }
  function TR(t) {
    return E.validate("app.bsky.feed.defs#skeletonFeedPost", t);
  }
  function vR(t) {
    return g(t) && R(t, "$type") && t.$type === "app.bsky.feed.defs#skeletonReasonRepost";
  }
  function wR(t) {
    return E.validate("app.bsky.feed.defs#skeletonReasonRepost", t);
  }
  function LR(t) {
    return g(t) && R(t, "$type") && t.$type === "app.bsky.feed.defs#threadgateView";
  }
  function CR(t) {
    return E.validate("app.bsky.feed.defs#threadgateView", t);
  }
  var Tp = {};
  f(Tp, {
    isRecord: () => _R,
    validateRecord: () => SR
  });
  function _R(t) {
    return g(t) && R(t, "$type") && (t.$type === "app.bsky.feed.generator#main" || t.$type === "app.bsky.feed.generator");
  }
  function SR(t) {
    return E.validate("app.bsky.feed.generator#main", t);
  }
  var vp = {};
  f(vp, {
    isRecord: () => xR,
    validateRecord: () => BR
  });
  function xR(t) {
    return g(t) && R(t, "$type") && (t.$type === "app.bsky.feed.like#main" || t.$type === "app.bsky.feed.like");
  }
  function BR(t) {
    return E.validate("app.bsky.feed.like#main", t);
  }
  var wp = {};
  f(wp, {
    isEntity: () => DR,
    isRecord: () => kR,
    isReplyRef: () => UR,
    isTextSlice: () => PR,
    validateEntity: () => NR,
    validateRecord: () => KR,
    validateReplyRef: () => VR,
    validateTextSlice: () => IR
  });
  function kR(t) {
    return g(t) && R(t, "$type") && (t.$type === "app.bsky.feed.post#main" || t.$type === "app.bsky.feed.post");
  }
  function KR(t) {
    return E.validate("app.bsky.feed.post#main", t);
  }
  function UR(t) {
    return g(t) && R(t, "$type") && t.$type === "app.bsky.feed.post#replyRef";
  }
  function VR(t) {
    return E.validate("app.bsky.feed.post#replyRef", t);
  }
  function DR(t) {
    return g(t) && R(t, "$type") && t.$type === "app.bsky.feed.post#entity";
  }
  function NR(t) {
    return E.validate("app.bsky.feed.post#entity", t);
  }
  function PR(t) {
    return g(t) && R(t, "$type") && t.$type === "app.bsky.feed.post#textSlice";
  }
  function IR(t) {
    return E.validate("app.bsky.feed.post#textSlice", t);
  }
  var Lp = {};
  f(Lp, {
    isRecord: () => jR,
    validateRecord: () => FR
  });
  function jR(t) {
    return g(t) && R(t, "$type") && (t.$type === "app.bsky.feed.repost#main" || t.$type === "app.bsky.feed.repost");
  }
  function FR(t) {
    return E.validate("app.bsky.feed.repost#main", t);
  }
  var Cp = {};
  f(Cp, {
    isFollowingRule: () => OR,
    isListRule: () => zR,
    isMentionRule: () => $R,
    isRecord: () => qR,
    validateFollowingRule: () => XR,
    validateListRule: () => HR,
    validateMentionRule: () => GR,
    validateRecord: () => MR
  });
  function qR(t) {
    return g(t) && R(t, "$type") && (t.$type === "app.bsky.feed.threadgate#main" || t.$type === "app.bsky.feed.threadgate");
  }
  function MR(t) {
    return E.validate("app.bsky.feed.threadgate#main", t);
  }
  function $R(t) {
    return g(t) && R(t, "$type") && t.$type === "app.bsky.feed.threadgate#mentionRule";
  }
  function GR(t) {
    return E.validate("app.bsky.feed.threadgate#mentionRule", t);
  }
  function OR(t) {
    return g(t) && R(t, "$type") && t.$type === "app.bsky.feed.threadgate#followingRule";
  }
  function XR(t) {
    return E.validate("app.bsky.feed.threadgate#followingRule", t);
  }
  function zR(t) {
    return g(t) && R(t, "$type") && t.$type === "app.bsky.feed.threadgate#listRule";
  }
  function HR(t) {
    return E.validate("app.bsky.feed.threadgate#listRule", t);
  }
  var _p = {};
  f(_p, {
    isRecord: () => ZR,
    validateRecord: () => WR
  });
  function ZR(t) {
    return g(t) && R(t, "$type") && (t.$type === "app.bsky.graph.block#main" || t.$type === "app.bsky.graph.block");
  }
  function WR(t) {
    return E.validate("app.bsky.graph.block#main", t);
  }
  var Sp = {};
  f(Sp, {
    CURATELIST: () => nb,
    MODLIST: () => ib,
    isListItemView: () => tb,
    isListView: () => YR,
    isListViewBasic: () => JR,
    isListViewerState: () => sb,
    isNotFoundActor: () => ob,
    isRelationship: () => ub,
    validateListItemView: () => rb,
    validateListView: () => eb,
    validateListViewBasic: () => QR,
    validateListViewerState: () => ab,
    validateNotFoundActor: () => pb,
    validateRelationship: () => lb
  });
  function JR(t) {
    return g(t) && R(t, "$type") && t.$type === "app.bsky.graph.defs#listViewBasic";
  }
  function QR(t) {
    return E.validate("app.bsky.graph.defs#listViewBasic", t);
  }
  function YR(t) {
    return g(t) && R(t, "$type") && t.$type === "app.bsky.graph.defs#listView";
  }
  function eb(t) {
    return E.validate("app.bsky.graph.defs#listView", t);
  }
  function tb(t) {
    return g(t) && R(t, "$type") && t.$type === "app.bsky.graph.defs#listItemView";
  }
  function rb(t) {
    return E.validate("app.bsky.graph.defs#listItemView", t);
  }
  var ib = "app.bsky.graph.defs#modlist", nb = "app.bsky.graph.defs#curatelist";
  function sb(t) {
    return g(t) && R(t, "$type") && t.$type === "app.bsky.graph.defs#listViewerState";
  }
  function ab(t) {
    return E.validate("app.bsky.graph.defs#listViewerState", t);
  }
  function ob(t) {
    return g(t) && R(t, "$type") && t.$type === "app.bsky.graph.defs#notFoundActor";
  }
  function pb(t) {
    return E.validate("app.bsky.graph.defs#notFoundActor", t);
  }
  function ub(t) {
    return g(t) && R(t, "$type") && t.$type === "app.bsky.graph.defs#relationship";
  }
  function lb(t) {
    return E.validate("app.bsky.graph.defs#relationship", t);
  }
  var xp = {};
  f(xp, {
    isRecord: () => fb,
    validateRecord: () => cb
  });
  function fb(t) {
    return g(t) && R(t, "$type") && (t.$type === "app.bsky.graph.follow#main" || t.$type === "app.bsky.graph.follow");
  }
  function cb(t) {
    return E.validate("app.bsky.graph.follow#main", t);
  }
  var Bp = {};
  f(Bp, {
    isRecord: () => db,
    validateRecord: () => mb
  });
  function db(t) {
    return g(t) && R(t, "$type") && (t.$type === "app.bsky.graph.list#main" || t.$type === "app.bsky.graph.list");
  }
  function mb(t) {
    return E.validate("app.bsky.graph.list#main", t);
  }
  var kp = {};
  f(kp, {
    isRecord: () => hb,
    validateRecord: () => yb
  });
  function hb(t) {
    return g(t) && R(t, "$type") && (t.$type === "app.bsky.graph.listblock#main" || t.$type === "app.bsky.graph.listblock");
  }
  function yb(t) {
    return E.validate("app.bsky.graph.listblock#main", t);
  }
  var Kp = {};
  f(Kp, {
    isRecord: () => Eb,
    validateRecord: () => gb
  });
  function Eb(t) {
    return g(t) && R(t, "$type") && (t.$type === "app.bsky.graph.listitem#main" || t.$type === "app.bsky.graph.listitem");
  }
  function gb(t) {
    return E.validate("app.bsky.graph.listitem#main", t);
  }
  var Ve = {};
  f(Ve, {
    isByteSlice: () => _b,
    isLink: () => vb,
    isMain: () => Rb,
    isMention: () => Ab,
    isTag: () => Lb,
    validateByteSlice: () => Sb,
    validateLink: () => wb,
    validateMain: () => bb,
    validateMention: () => Tb,
    validateTag: () => Cb
  });
  function Rb(t) {
    return g(t) && R(t, "$type") && (t.$type === "app.bsky.richtext.facet#main" || t.$type === "app.bsky.richtext.facet");
  }
  function bb(t) {
    return E.validate("app.bsky.richtext.facet#main", t);
  }
  function Ab(t) {
    return g(t) && R(t, "$type") && t.$type === "app.bsky.richtext.facet#mention";
  }
  function Tb(t) {
    return E.validate("app.bsky.richtext.facet#mention", t);
  }
  function vb(t) {
    return g(t) && R(t, "$type") && t.$type === "app.bsky.richtext.facet#link";
  }
  function wb(t) {
    return E.validate("app.bsky.richtext.facet#link", t);
  }
  function Lb(t) {
    return g(t) && R(t, "$type") && t.$type === "app.bsky.richtext.facet#tag";
  }
  function Cb(t) {
    return E.validate("app.bsky.richtext.facet#tag", t);
  }
  function _b(t) {
    return g(t) && R(t, "$type") && t.$type === "app.bsky.richtext.facet#byteSlice";
  }
  function Sb(t) {
    return E.validate("app.bsky.richtext.facet#byteSlice", t);
  }
  var Up = {};
  f(Up, {
    isSkeletonSearchActor: () => kb,
    isSkeletonSearchPost: () => xb,
    validateSkeletonSearchActor: () => Kb,
    validateSkeletonSearchPost: () => Bb
  });
  function xb(t) {
    return g(t) && R(t, "$type") && t.$type === "app.bsky.unspecced.defs#skeletonSearchPost";
  }
  function Bb(t) {
    return E.validate("app.bsky.unspecced.defs#skeletonSearchPost", t);
  }
  function kb(t) {
    return g(t) && R(t, "$type") && t.$type === "app.bsky.unspecced.defs#skeletonSearchActor";
  }
  function Kb(t) {
    return E.validate("app.bsky.unspecced.defs#skeletonSearchActor", t);
  }
  var Ub = {
    DefsReviewOpen: "com.atproto.admin.defs#reviewOpen",
    DefsReviewEscalated: "com.atproto.admin.defs#reviewEscalated",
    DefsReviewClosed: "com.atproto.admin.defs#reviewClosed"
  }, Vb = {
    DefsReasonSpam: "com.atproto.moderation.defs#reasonSpam",
    DefsReasonViolation: "com.atproto.moderation.defs#reasonViolation",
    DefsReasonMisleading: "com.atproto.moderation.defs#reasonMisleading",
    DefsReasonSexual: "com.atproto.moderation.defs#reasonSexual",
    DefsReasonRude: "com.atproto.moderation.defs#reasonRude",
    DefsReasonOther: "com.atproto.moderation.defs#reasonOther",
    DefsReasonAppeal: "com.atproto.moderation.defs#reasonAppeal"
  }, Db = {
    DefsModlist: "app.bsky.graph.defs#modlist",
    DefsCuratelist: "app.bsky.graph.defs#curatelist"
  }, Vp = class {
    constructor() {
      this.xrpc = new Cn(), this.xrpc.addLexicons(Sn);
    }
    service(t) {
      return new Dp(this, this.xrpc.service(t));
    }
  }, Dp = class {
    constructor(t, i) {
      this._baseClient = t, this.xrpc = i, this.com = new Np(this), this.app = new Xp(this);
    }
    setHeader(t, i) {
      this.xrpc.setHeader(t, i);
    }
  }, Np = class {
    constructor(t) {
      this._service = t, this.atproto = new Pp(t);
    }
  }, Pp = class {
    constructor(t) {
      this._service = t, this.admin = new Ip(t), this.identity = new jp(t), this.label = new Fp(t), this.moderation = new qp(t), this.repo = new Mp(t), this.server = new $p(t), this.sync = new Gp(t), this.temp = new Op(t);
    }
  }, Ip = class {
    constructor(t) {
      this._service = t;
    }
    createCommunicationTemplate(t, i) {
      return this._service.xrpc.call("com.atproto.admin.createCommunicationTemplate", i?.qp, t, i).catch((r) => {
        throw r;
      });
    }
    deleteAccount(t, i) {
      return this._service.xrpc.call("com.atproto.admin.deleteAccount", i?.qp, t, i).catch((r) => {
        throw r;
      });
    }
    deleteCommunicationTemplate(t, i) {
      return this._service.xrpc.call("com.atproto.admin.deleteCommunicationTemplate", i?.qp, t, i).catch((r) => {
        throw r;
      });
    }
    disableAccountInvites(t, i) {
      return this._service.xrpc.call("com.atproto.admin.disableAccountInvites", i?.qp, t, i).catch((r) => {
        throw r;
      });
    }
    disableInviteCodes(t, i) {
      return this._service.xrpc.call("com.atproto.admin.disableInviteCodes", i?.qp, t, i).catch((r) => {
        throw r;
      });
    }
    emitModerationEvent(t, i) {
      return this._service.xrpc.call("com.atproto.admin.emitModerationEvent", i?.qp, t, i).catch((r) => {
        throw Nn(r);
      });
    }
    enableAccountInvites(t, i) {
      return this._service.xrpc.call("com.atproto.admin.enableAccountInvites", i?.qp, t, i).catch((r) => {
        throw r;
      });
    }
    getAccountInfo(t, i) {
      return this._service.xrpc.call("com.atproto.admin.getAccountInfo", t, void 0, i).catch((r) => {
        throw r;
      });
    }
    getAccountInfos(t, i) {
      return this._service.xrpc.call("com.atproto.admin.getAccountInfos", t, void 0, i).catch((r) => {
        throw r;
      });
    }
    getInviteCodes(t, i) {
      return this._service.xrpc.call("com.atproto.admin.getInviteCodes", t, void 0, i).catch((r) => {
        throw r;
      });
    }
    getModerationEvent(t, i) {
      return this._service.xrpc.call("com.atproto.admin.getModerationEvent", t, void 0, i).catch((r) => {
        throw r;
      });
    }
    getRecord(t, i) {
      return this._service.xrpc.call("com.atproto.admin.getRecord", t, void 0, i).catch((r) => {
        throw Gn(r);
      });
    }
    getRepo(t, i) {
      return this._service.xrpc.call("com.atproto.admin.getRepo", t, void 0, i).catch((r) => {
        throw zn(r);
      });
    }
    getSubjectStatus(t, i) {
      return this._service.xrpc.call("com.atproto.admin.getSubjectStatus", t, void 0, i).catch((r) => {
        throw r;
      });
    }
    listCommunicationTemplates(t, i) {
      return this._service.xrpc.call("com.atproto.admin.listCommunicationTemplates", t, void 0, i).catch((r) => {
        throw r;
      });
    }
    queryModerationEvents(t, i) {
      return this._service.xrpc.call("com.atproto.admin.queryModerationEvents", t, void 0, i).catch((r) => {
        throw r;
      });
    }
    queryModerationStatuses(t, i) {
      return this._service.xrpc.call("com.atproto.admin.queryModerationStatuses", t, void 0, i).catch((r) => {
        throw r;
      });
    }
    searchRepos(t, i) {
      return this._service.xrpc.call("com.atproto.admin.searchRepos", t, void 0, i).catch((r) => {
        throw r;
      });
    }
    sendEmail(t, i) {
      return this._service.xrpc.call("com.atproto.admin.sendEmail", i?.qp, t, i).catch((r) => {
        throw r;
      });
    }
    updateAccountEmail(t, i) {
      return this._service.xrpc.call("com.atproto.admin.updateAccountEmail", i?.qp, t, i).catch((r) => {
        throw r;
      });
    }
    updateAccountHandle(t, i) {
      return this._service.xrpc.call("com.atproto.admin.updateAccountHandle", i?.qp, t, i).catch((r) => {
        throw r;
      });
    }
    updateAccountPassword(t, i) {
      return this._service.xrpc.call("com.atproto.admin.updateAccountPassword", i?.qp, t, i).catch((r) => {
        throw r;
      });
    }
    updateCommunicationTemplate(t, i) {
      return this._service.xrpc.call("com.atproto.admin.updateCommunicationTemplate", i?.qp, t, i).catch((r) => {
        throw r;
      });
    }
    updateSubjectStatus(t, i) {
      return this._service.xrpc.call("com.atproto.admin.updateSubjectStatus", i?.qp, t, i).catch((r) => {
        throw r;
      });
    }
  }, jp = class {
    constructor(t) {
      this._service = t;
    }
    getRecommendedDidCredentials(t, i) {
      return this._service.xrpc.call("com.atproto.identity.getRecommendedDidCredentials", t, void 0, i).catch((r) => {
        throw r;
      });
    }
    requestPlcOperationSignature(t, i) {
      return this._service.xrpc.call("com.atproto.identity.requestPlcOperationSignature", i?.qp, t, i).catch((r) => {
        throw r;
      });
    }
    resolveHandle(t, i) {
      return this._service.xrpc.call("com.atproto.identity.resolveHandle", t, void 0, i).catch((r) => {
        throw r;
      });
    }
    signPlcOperation(t, i) {
      return this._service.xrpc.call("com.atproto.identity.signPlcOperation", i?.qp, t, i).catch((r) => {
        throw r;
      });
    }
    submitPlcOperation(t, i) {
      return this._service.xrpc.call("com.atproto.identity.submitPlcOperation", i?.qp, t, i).catch((r) => {
        throw r;
      });
    }
    updateHandle(t, i) {
      return this._service.xrpc.call("com.atproto.identity.updateHandle", i?.qp, t, i).catch((r) => {
        throw r;
      });
    }
  }, Fp = class {
    constructor(t) {
      this._service = t;
    }
    queryLabels(t, i) {
      return this._service.xrpc.call("com.atproto.label.queryLabels", t, void 0, i).catch((r) => {
        throw r;
      });
    }
  }, qp = class {
    constructor(t) {
      this._service = t;
    }
    createReport(t, i) {
      return this._service.xrpc.call("com.atproto.moderation.createReport", i?.qp, t, i).catch((r) => {
        throw r;
      });
    }
  }, Mp = class {
    constructor(t) {
      this._service = t;
    }
    applyWrites(t, i) {
      return this._service.xrpc.call("com.atproto.repo.applyWrites", i?.qp, t, i).catch((r) => {
        throw hs(r);
      });
    }
    createRecord(t, i) {
      return this._service.xrpc.call("com.atproto.repo.createRecord", i?.qp, t, i).catch((r) => {
        throw gs(r);
      });
    }
    deleteRecord(t, i) {
      return this._service.xrpc.call("com.atproto.repo.deleteRecord", i?.qp, t, i).catch((r) => {
        throw As(r);
      });
    }
    describeRepo(t, i) {
      return this._service.xrpc.call("com.atproto.repo.describeRepo", t, void 0, i).catch((r) => {
        throw r;
      });
    }
    getRecord(t, i) {
      return this._service.xrpc.call("com.atproto.repo.getRecord", t, void 0, i).catch((r) => {
        throw r;
      });
    }
    importRepo(t, i) {
      return this._service.xrpc.call("com.atproto.repo.importRepo", i?.qp, t, i).catch((r) => {
        throw r;
      });
    }
    listMissingBlobs(t, i) {
      return this._service.xrpc.call("com.atproto.repo.listMissingBlobs", t, void 0, i).catch((r) => {
        throw r;
      });
    }
    listRecords(t, i) {
      return this._service.xrpc.call("com.atproto.repo.listRecords", t, void 0, i).catch((r) => {
        throw r;
      });
    }
    putRecord(t, i) {
      return this._service.xrpc.call("com.atproto.repo.putRecord", i?.qp, t, i).catch((r) => {
        throw Ss(r);
      });
    }
    uploadBlob(t, i) {
      return this._service.xrpc.call("com.atproto.repo.uploadBlob", i?.qp, t, i).catch((r) => {
        throw r;
      });
    }
  }, $p = class {
    constructor(t) {
      this._service = t;
    }
    activateAccount(t, i) {
      return this._service.xrpc.call("com.atproto.server.activateAccount", i?.qp, t, i).catch((r) => {
        throw r;
      });
    }
    checkAccountStatus(t, i) {
      return this._service.xrpc.call("com.atproto.server.checkAccountStatus", t, void 0, i).catch((r) => {
        throw r;
      });
    }
    confirmEmail(t, i) {
      return this._service.xrpc.call("com.atproto.server.confirmEmail", i?.qp, t, i).catch((r) => {
        throw Ps(r);
      });
    }
    createAccount(t, i) {
      return this._service.xrpc.call("com.atproto.server.createAccount", i?.qp, t, i).catch((r) => {
        throw Xs(r);
      });
    }
    createAppPassword(t, i) {
      return this._service.xrpc.call("com.atproto.server.createAppPassword", i?.qp, t, i).catch((r) => {
        throw Zs(r);
      });
    }
    createInviteCode(t, i) {
      return this._service.xrpc.call("com.atproto.server.createInviteCode", i?.qp, t, i).catch((r) => {
        throw r;
      });
    }
    createInviteCodes(t, i) {
      return this._service.xrpc.call("com.atproto.server.createInviteCodes", i?.qp, t, i).catch((r) => {
        throw r;
      });
    }
    createSession(t, i) {
      return this._service.xrpc.call("com.atproto.server.createSession", i?.qp, t, i).catch((r) => {
        throw ea(r);
      });
    }
    deactivateAccount(t, i) {
      return this._service.xrpc.call("com.atproto.server.deactivateAccount", i?.qp, t, i).catch((r) => {
        throw r;
      });
    }
    deleteAccount(t, i) {
      return this._service.xrpc.call("com.atproto.server.deleteAccount", i?.qp, t, i).catch((r) => {
        throw sa(r);
      });
    }
    deleteSession(t, i) {
      return this._service.xrpc.call("com.atproto.server.deleteSession", i?.qp, t, i).catch((r) => {
        throw r;
      });
    }
    describeServer(t, i) {
      return this._service.xrpc.call("com.atproto.server.describeServer", t, void 0, i).catch((r) => {
        throw r;
      });
    }
    getAccountInviteCodes(t, i) {
      return this._service.xrpc.call("com.atproto.server.getAccountInviteCodes", t, void 0, i).catch((r) => {
        throw la(r);
      });
    }
    getServiceAuth(t, i) {
      return this._service.xrpc.call("com.atproto.server.getServiceAuth", t, void 0, i).catch((r) => {
        throw r;
      });
    }
    getSession(t, i) {
      return this._service.xrpc.call("com.atproto.server.getSession", t, void 0, i).catch((r) => {
        throw r;
      });
    }
    listAppPasswords(t, i) {
      return this._service.xrpc.call("com.atproto.server.listAppPasswords", t, void 0, i).catch((r) => {
        throw ha(r);
      });
    }
    refreshSession(t, i) {
      return this._service.xrpc.call("com.atproto.server.refreshSession", i?.qp, t, i).catch((r) => {
        throw ga(r);
      });
    }
    requestAccountDelete(t, i) {
      return this._service.xrpc.call("com.atproto.server.requestAccountDelete", i?.qp, t, i).catch((r) => {
        throw r;
      });
    }
    requestEmailConfirmation(t, i) {
      return this._service.xrpc.call("com.atproto.server.requestEmailConfirmation", i?.qp, t, i).catch((r) => {
        throw r;
      });
    }
    requestEmailUpdate(t, i) {
      return this._service.xrpc.call("com.atproto.server.requestEmailUpdate", i?.qp, t, i).catch((r) => {
        throw r;
      });
    }
    requestPasswordReset(t, i) {
      return this._service.xrpc.call("com.atproto.server.requestPasswordReset", i?.qp, t, i).catch((r) => {
        throw r;
      });
    }
    reserveSigningKey(t, i) {
      return this._service.xrpc.call("com.atproto.server.reserveSigningKey", i?.qp, t, i).catch((r) => {
        throw r;
      });
    }
    resetPassword(t, i) {
      return this._service.xrpc.call("com.atproto.server.resetPassword", i?.qp, t, i).catch((r) => {
        throw _a(r);
      });
    }
    revokeAppPassword(t, i) {
      return this._service.xrpc.call("com.atproto.server.revokeAppPassword", i?.qp, t, i).catch((r) => {
        throw r;
      });
    }
    updateEmail(t, i) {
      return this._service.xrpc.call("com.atproto.server.updateEmail", i?.qp, t, i).catch((r) => {
        throw Ua(r);
      });
    }
  }, Gp = class {
    constructor(t) {
      this._service = t;
    }
    getBlob(t, i) {
      return this._service.xrpc.call("com.atproto.sync.getBlob", t, void 0, i).catch((r) => {
        throw r;
      });
    }
    getBlocks(t, i) {
      return this._service.xrpc.call("com.atproto.sync.getBlocks", t, void 0, i).catch((r) => {
        throw r;
      });
    }
    getCheckout(t, i) {
      return this._service.xrpc.call("com.atproto.sync.getCheckout", t, void 0, i).catch((r) => {
        throw r;
      });
    }
    getHead(t, i) {
      return this._service.xrpc.call("com.atproto.sync.getHead", t, void 0, i).catch((r) => {
        throw ja(r);
      });
    }
    getLatestCommit(t, i) {
      return this._service.xrpc.call("com.atproto.sync.getLatestCommit", t, void 0, i).catch((r) => {
        throw Ma(r);
      });
    }
    getRecord(t, i) {
      return this._service.xrpc.call("com.atproto.sync.getRecord", t, void 0, i).catch((r) => {
        throw r;
      });
    }
    getRepo(t, i) {
      return this._service.xrpc.call("com.atproto.sync.getRepo", t, void 0, i).catch((r) => {
        throw r;
      });
    }
    listBlobs(t, i) {
      return this._service.xrpc.call("com.atproto.sync.listBlobs", t, void 0, i).catch((r) => {
        throw r;
      });
    }
    listRepos(t, i) {
      return this._service.xrpc.call("com.atproto.sync.listRepos", t, void 0, i).catch((r) => {
        throw r;
      });
    }
    notifyOfUpdate(t, i) {
      return this._service.xrpc.call("com.atproto.sync.notifyOfUpdate", i?.qp, t, i).catch((r) => {
        throw r;
      });
    }
    requestCrawl(t, i) {
      return this._service.xrpc.call("com.atproto.sync.requestCrawl", i?.qp, t, i).catch((r) => {
        throw r;
      });
    }
  }, Op = class {
    constructor(t) {
      this._service = t;
    }
    checkSignupQueue(t, i) {
      return this._service.xrpc.call("com.atproto.temp.checkSignupQueue", t, void 0, i).catch((r) => {
        throw r;
      });
    }
    fetchLabels(t, i) {
      return this._service.xrpc.call("com.atproto.temp.fetchLabels", t, void 0, i).catch((r) => {
        throw r;
      });
    }
    requestPhoneVerification(t, i) {
      return this._service.xrpc.call("com.atproto.temp.requestPhoneVerification", i?.qp, t, i).catch((r) => {
        throw r;
      });
    }
  }, Xp = class {
    constructor(t) {
      this._service = t, this.bsky = new zp(t);
    }
  }, zp = class {
    constructor(t) {
      this._service = t, this.actor = new Hp(t), this.embed = new Wp(t), this.feed = new Jp(t), this.graph = new iu(t), this.notification = new uu(t), this.richtext = new lu(t), this.unspecced = new fu(t);
    }
  }, Hp = class {
    constructor(t) {
      this._service = t, this.profile = new Zp(t);
    }
    getPreferences(t, i) {
      return this._service.xrpc.call("app.bsky.actor.getPreferences", t, void 0, i).catch((r) => {
        throw r;
      });
    }
    getProfile(t, i) {
      return this._service.xrpc.call("app.bsky.actor.getProfile", t, void 0, i).catch((r) => {
        throw r;
      });
    }
    getProfiles(t, i) {
      return this._service.xrpc.call("app.bsky.actor.getProfiles", t, void 0, i).catch((r) => {
        throw r;
      });
    }
    getSuggestions(t, i) {
      return this._service.xrpc.call("app.bsky.actor.getSuggestions", t, void 0, i).catch((r) => {
        throw r;
      });
    }
    putPreferences(t, i) {
      return this._service.xrpc.call("app.bsky.actor.putPreferences", i?.qp, t, i).catch((r) => {
        throw r;
      });
    }
    searchActors(t, i) {
      return this._service.xrpc.call("app.bsky.actor.searchActors", t, void 0, i).catch((r) => {
        throw r;
      });
    }
    searchActorsTypeahead(t, i) {
      return this._service.xrpc.call("app.bsky.actor.searchActorsTypeahead", t, void 0, i).catch((r) => {
        throw r;
      });
    }
  }, Zp = class {
    constructor(t) {
      this._service = t;
    }
    async list(t) {
      return (await this._service.xrpc.call("com.atproto.repo.listRecords", {
        collection: "app.bsky.actor.profile",
        ...t
      })).data;
    }
    async get(t) {
      return (await this._service.xrpc.call("com.atproto.repo.getRecord", {
        collection: "app.bsky.actor.profile",
        ...t
      })).data;
    }
    async create(t, i, r) {
      return i.$type = "app.bsky.actor.profile", (await this._service.xrpc.call("com.atproto.repo.createRecord", void 0, { collection: "app.bsky.actor.profile", rkey: "self", ...t, record: i }, { encoding: "application/json", headers: r })).data;
    }
    async delete(t, i) {
      await this._service.xrpc.call("com.atproto.repo.deleteRecord", void 0, { collection: "app.bsky.actor.profile", ...t }, { headers: i });
    }
  }, Wp = class {
    constructor(t) {
      this._service = t;
    }
  }, Jp = class {
    constructor(t) {
      this._service = t, this.generator = new Qp(t), this.like = new Yp(t), this.post = new eu(t), this.repost = new tu(t), this.threadgate = new ru(t);
    }
    describeFeedGenerator(t, i) {
      return this._service.xrpc.call("app.bsky.feed.describeFeedGenerator", t, void 0, i).catch((r) => {
        throw r;
      });
    }
    getActorFeeds(t, i) {
      return this._service.xrpc.call("app.bsky.feed.getActorFeeds", t, void 0, i).catch((r) => {
        throw r;
      });
    }
    getActorLikes(t, i) {
      return this._service.xrpc.call("app.bsky.feed.getActorLikes", t, void 0, i).catch((r) => {
        throw lo(r);
      });
    }
    getAuthorFeed(t, i) {
      return this._service.xrpc.call("app.bsky.feed.getAuthorFeed", t, void 0, i).catch((r) => {
        throw ho(r);
      });
    }
    getFeed(t, i) {
      return this._service.xrpc.call("app.bsky.feed.getFeed", t, void 0, i).catch((r) => {
        throw go(r);
      });
    }
    getFeedGenerator(t, i) {
      return this._service.xrpc.call("app.bsky.feed.getFeedGenerator", t, void 0, i).catch((r) => {
        throw r;
      });
    }
    getFeedGenerators(t, i) {
      return this._service.xrpc.call("app.bsky.feed.getFeedGenerators", t, void 0, i).catch((r) => {
        throw r;
      });
    }
    getFeedSkeleton(t, i) {
      return this._service.xrpc.call("app.bsky.feed.getFeedSkeleton", t, void 0, i).catch((r) => {
        throw vo(r);
      });
    }
    getLikes(t, i) {
      return this._service.xrpc.call("app.bsky.feed.getLikes", t, void 0, i).catch((r) => {
        throw r;
      });
    }
    getListFeed(t, i) {
      return this._service.xrpc.call("app.bsky.feed.getListFeed", t, void 0, i).catch((r) => {
        throw _o(r);
      });
    }
    getPostThread(t, i) {
      return this._service.xrpc.call("app.bsky.feed.getPostThread", t, void 0, i).catch((r) => {
        throw Bo(r);
      });
    }
    getPosts(t, i) {
      return this._service.xrpc.call("app.bsky.feed.getPosts", t, void 0, i).catch((r) => {
        throw r;
      });
    }
    getRepostedBy(t, i) {
      return this._service.xrpc.call("app.bsky.feed.getRepostedBy", t, void 0, i).catch((r) => {
        throw r;
      });
    }
    getSuggestedFeeds(t, i) {
      return this._service.xrpc.call("app.bsky.feed.getSuggestedFeeds", t, void 0, i).catch((r) => {
        throw r;
      });
    }
    getTimeline(t, i) {
      return this._service.xrpc.call("app.bsky.feed.getTimeline", t, void 0, i).catch((r) => {
        throw r;
      });
    }
    searchPosts(t, i) {
      return this._service.xrpc.call("app.bsky.feed.searchPosts", t, void 0, i).catch((r) => {
        throw Po(r);
      });
    }
  }, Qp = class {
    constructor(t) {
      this._service = t;
    }
    async list(t) {
      return (await this._service.xrpc.call("com.atproto.repo.listRecords", {
        collection: "app.bsky.feed.generator",
        ...t
      })).data;
    }
    async get(t) {
      return (await this._service.xrpc.call("com.atproto.repo.getRecord", {
        collection: "app.bsky.feed.generator",
        ...t
      })).data;
    }
    async create(t, i, r) {
      return i.$type = "app.bsky.feed.generator", (await this._service.xrpc.call("com.atproto.repo.createRecord", void 0, { collection: "app.bsky.feed.generator", ...t, record: i }, { encoding: "application/json", headers: r })).data;
    }
    async delete(t, i) {
      await this._service.xrpc.call("com.atproto.repo.deleteRecord", void 0, { collection: "app.bsky.feed.generator", ...t }, { headers: i });
    }
  }, Yp = class {
    constructor(t) {
      this._service = t;
    }
    async list(t) {
      return (await this._service.xrpc.call("com.atproto.repo.listRecords", {
        collection: "app.bsky.feed.like",
        ...t
      })).data;
    }
    async get(t) {
      return (await this._service.xrpc.call("com.atproto.repo.getRecord", {
        collection: "app.bsky.feed.like",
        ...t
      })).data;
    }
    async create(t, i, r) {
      return i.$type = "app.bsky.feed.like", (await this._service.xrpc.call("com.atproto.repo.createRecord", void 0, { collection: "app.bsky.feed.like", ...t, record: i }, { encoding: "application/json", headers: r })).data;
    }
    async delete(t, i) {
      await this._service.xrpc.call("com.atproto.repo.deleteRecord", void 0, { collection: "app.bsky.feed.like", ...t }, { headers: i });
    }
  }, eu = class {
    constructor(t) {
      this._service = t;
    }
    async list(t) {
      return (await this._service.xrpc.call("com.atproto.repo.listRecords", {
        collection: "app.bsky.feed.post",
        ...t
      })).data;
    }
    async get(t) {
      return (await this._service.xrpc.call("com.atproto.repo.getRecord", {
        collection: "app.bsky.feed.post",
        ...t
      })).data;
    }
    async create(t, i, r) {
      return i.$type = "app.bsky.feed.post", (await this._service.xrpc.call("com.atproto.repo.createRecord", void 0, { collection: "app.bsky.feed.post", ...t, record: i }, { encoding: "application/json", headers: r })).data;
    }
    async delete(t, i) {
      await this._service.xrpc.call("com.atproto.repo.deleteRecord", void 0, { collection: "app.bsky.feed.post", ...t }, { headers: i });
    }
  }, tu = class {
    constructor(t) {
      this._service = t;
    }
    async list(t) {
      return (await this._service.xrpc.call("com.atproto.repo.listRecords", {
        collection: "app.bsky.feed.repost",
        ...t
      })).data;
    }
    async get(t) {
      return (await this._service.xrpc.call("com.atproto.repo.getRecord", {
        collection: "app.bsky.feed.repost",
        ...t
      })).data;
    }
    async create(t, i, r) {
      return i.$type = "app.bsky.feed.repost", (await this._service.xrpc.call("com.atproto.repo.createRecord", void 0, { collection: "app.bsky.feed.repost", ...t, record: i }, { encoding: "application/json", headers: r })).data;
    }
    async delete(t, i) {
      await this._service.xrpc.call("com.atproto.repo.deleteRecord", void 0, { collection: "app.bsky.feed.repost", ...t }, { headers: i });
    }
  }, ru = class {
    constructor(t) {
      this._service = t;
    }
    async list(t) {
      return (await this._service.xrpc.call("com.atproto.repo.listRecords", {
        collection: "app.bsky.feed.threadgate",
        ...t
      })).data;
    }
    async get(t) {
      return (await this._service.xrpc.call("com.atproto.repo.getRecord", {
        collection: "app.bsky.feed.threadgate",
        ...t
      })).data;
    }
    async create(t, i, r) {
      return i.$type = "app.bsky.feed.threadgate", (await this._service.xrpc.call("com.atproto.repo.createRecord", void 0, { collection: "app.bsky.feed.threadgate", ...t, record: i }, { encoding: "application/json", headers: r })).data;
    }
    async delete(t, i) {
      await this._service.xrpc.call("com.atproto.repo.deleteRecord", void 0, { collection: "app.bsky.feed.threadgate", ...t }, { headers: i });
    }
  }, iu = class {
    constructor(t) {
      this._service = t, this.block = new nu(t), this.follow = new su(t), this.list = new au(t), this.listblock = new ou(t), this.listitem = new pu(t);
    }
    getBlocks(t, i) {
      return this._service.xrpc.call("app.bsky.graph.getBlocks", t, void 0, i).catch((r) => {
        throw r;
      });
    }
    getFollowers(t, i) {
      return this._service.xrpc.call("app.bsky.graph.getFollowers", t, void 0, i).catch((r) => {
        throw r;
      });
    }
    getFollows(t, i) {
      return this._service.xrpc.call("app.bsky.graph.getFollows", t, void 0, i).catch((r) => {
        throw r;
      });
    }
    getList(t, i) {
      return this._service.xrpc.call("app.bsky.graph.getList", t, void 0, i).catch((r) => {
        throw r;
      });
    }
    getListBlocks(t, i) {
      return this._service.xrpc.call("app.bsky.graph.getListBlocks", t, void 0, i).catch((r) => {
        throw r;
      });
    }
    getListMutes(t, i) {
      return this._service.xrpc.call("app.bsky.graph.getListMutes", t, void 0, i).catch((r) => {
        throw r;
      });
    }
    getLists(t, i) {
      return this._service.xrpc.call("app.bsky.graph.getLists", t, void 0, i).catch((r) => {
        throw r;
      });
    }
    getMutes(t, i) {
      return this._service.xrpc.call("app.bsky.graph.getMutes", t, void 0, i).catch((r) => {
        throw r;
      });
    }
    getRelationships(t, i) {
      return this._service.xrpc.call("app.bsky.graph.getRelationships", t, void 0, i).catch((r) => {
        throw Ho(r);
      });
    }
    getSuggestedFollowsByActor(t, i) {
      return this._service.xrpc.call("app.bsky.graph.getSuggestedFollowsByActor", t, void 0, i).catch((r) => {
        throw r;
      });
    }
    muteActor(t, i) {
      return this._service.xrpc.call("app.bsky.graph.muteActor", i?.qp, t, i).catch((r) => {
        throw r;
      });
    }
    muteActorList(t, i) {
      return this._service.xrpc.call("app.bsky.graph.muteActorList", i?.qp, t, i).catch((r) => {
        throw r;
      });
    }
    unmuteActor(t, i) {
      return this._service.xrpc.call("app.bsky.graph.unmuteActor", i?.qp, t, i).catch((r) => {
        throw r;
      });
    }
    unmuteActorList(t, i) {
      return this._service.xrpc.call("app.bsky.graph.unmuteActorList", i?.qp, t, i).catch((r) => {
        throw r;
      });
    }
  }, nu = class {
    constructor(t) {
      this._service = t;
    }
    async list(t) {
      return (await this._service.xrpc.call("com.atproto.repo.listRecords", {
        collection: "app.bsky.graph.block",
        ...t
      })).data;
    }
    async get(t) {
      return (await this._service.xrpc.call("com.atproto.repo.getRecord", {
        collection: "app.bsky.graph.block",
        ...t
      })).data;
    }
    async create(t, i, r) {
      return i.$type = "app.bsky.graph.block", (await this._service.xrpc.call("com.atproto.repo.createRecord", void 0, { collection: "app.bsky.graph.block", ...t, record: i }, { encoding: "application/json", headers: r })).data;
    }
    async delete(t, i) {
      await this._service.xrpc.call("com.atproto.repo.deleteRecord", void 0, { collection: "app.bsky.graph.block", ...t }, { headers: i });
    }
  }, su = class {
    constructor(t) {
      this._service = t;
    }
    async list(t) {
      return (await this._service.xrpc.call("com.atproto.repo.listRecords", {
        collection: "app.bsky.graph.follow",
        ...t
      })).data;
    }
    async get(t) {
      return (await this._service.xrpc.call("com.atproto.repo.getRecord", {
        collection: "app.bsky.graph.follow",
        ...t
      })).data;
    }
    async create(t, i, r) {
      return i.$type = "app.bsky.graph.follow", (await this._service.xrpc.call("com.atproto.repo.createRecord", void 0, { collection: "app.bsky.graph.follow", ...t, record: i }, { encoding: "application/json", headers: r })).data;
    }
    async delete(t, i) {
      await this._service.xrpc.call("com.atproto.repo.deleteRecord", void 0, { collection: "app.bsky.graph.follow", ...t }, { headers: i });
    }
  }, au = class {
    constructor(t) {
      this._service = t;
    }
    async list(t) {
      return (await this._service.xrpc.call("com.atproto.repo.listRecords", {
        collection: "app.bsky.graph.list",
        ...t
      })).data;
    }
    async get(t) {
      return (await this._service.xrpc.call("com.atproto.repo.getRecord", {
        collection: "app.bsky.graph.list",
        ...t
      })).data;
    }
    async create(t, i, r) {
      return i.$type = "app.bsky.graph.list", (await this._service.xrpc.call("com.atproto.repo.createRecord", void 0, { collection: "app.bsky.graph.list", ...t, record: i }, { encoding: "application/json", headers: r })).data;
    }
    async delete(t, i) {
      await this._service.xrpc.call("com.atproto.repo.deleteRecord", void 0, { collection: "app.bsky.graph.list", ...t }, { headers: i });
    }
  }, ou = class {
    constructor(t) {
      this._service = t;
    }
    async list(t) {
      return (await this._service.xrpc.call("com.atproto.repo.listRecords", {
        collection: "app.bsky.graph.listblock",
        ...t
      })).data;
    }
    async get(t) {
      return (await this._service.xrpc.call("com.atproto.repo.getRecord", {
        collection: "app.bsky.graph.listblock",
        ...t
      })).data;
    }
    async create(t, i, r) {
      return i.$type = "app.bsky.graph.listblock", (await this._service.xrpc.call("com.atproto.repo.createRecord", void 0, { collection: "app.bsky.graph.listblock", ...t, record: i }, { encoding: "application/json", headers: r })).data;
    }
    async delete(t, i) {
      await this._service.xrpc.call("com.atproto.repo.deleteRecord", void 0, { collection: "app.bsky.graph.listblock", ...t }, { headers: i });
    }
  }, pu = class {
    constructor(t) {
      this._service = t;
    }
    async list(t) {
      return (await this._service.xrpc.call("com.atproto.repo.listRecords", {
        collection: "app.bsky.graph.listitem",
        ...t
      })).data;
    }
    async get(t) {
      return (await this._service.xrpc.call("com.atproto.repo.getRecord", {
        collection: "app.bsky.graph.listitem",
        ...t
      })).data;
    }
    async create(t, i, r) {
      return i.$type = "app.bsky.graph.listitem", (await this._service.xrpc.call("com.atproto.repo.createRecord", void 0, { collection: "app.bsky.graph.listitem", ...t, record: i }, { encoding: "application/json", headers: r })).data;
    }
    async delete(t, i) {
      await this._service.xrpc.call("com.atproto.repo.deleteRecord", void 0, { collection: "app.bsky.graph.listitem", ...t }, { headers: i });
    }
  }, uu = class {
    constructor(t) {
      this._service = t;
    }
    getUnreadCount(t, i) {
      return this._service.xrpc.call("app.bsky.notification.getUnreadCount", t, void 0, i).catch((r) => {
        throw r;
      });
    }
    listNotifications(t, i) {
      return this._service.xrpc.call("app.bsky.notification.listNotifications", t, void 0, i).catch((r) => {
        throw r;
      });
    }
    registerPush(t, i) {
      return this._service.xrpc.call("app.bsky.notification.registerPush", i?.qp, t, i).catch((r) => {
        throw r;
      });
    }
    updateSeen(t, i) {
      return this._service.xrpc.call("app.bsky.notification.updateSeen", i?.qp, t, i).catch((r) => {
        throw r;
      });
    }
  }, lu = class {
    constructor(t) {
      this._service = t;
    }
  }, fu = class {
    constructor(t) {
      this._service = t;
    }
    getPopularFeedGenerators(t, i) {
      return this._service.xrpc.call("app.bsky.unspecced.getPopularFeedGenerators", t, void 0, i).catch((r) => {
        throw r;
      });
    }
    getTaggedSuggestions(t, i) {
      return this._service.xrpc.call("app.bsky.unspecced.getTaggedSuggestions", t, void 0, i).catch((r) => {
        throw r;
      });
    }
    searchActorsSkeleton(t, i) {
      return this._service.xrpc.call("app.bsky.unspecced.searchActorsSkeleton", t, void 0, i).catch((r) => {
        throw pp(r);
      });
    }
    searchPostsSkeleton(t, i) {
      return this._service.xrpc.call("app.bsky.unspecced.searchPostsSkeleton", t, void 0, i).catch((r) => {
        throw fp(r);
      });
    }
  }, Nb = "com.atproto.server.refreshSession", Je = class {
    constructor(t) {
      this.uploadBlob = (i, r) => this.api.com.atproto.repo.uploadBlob(i, r), this.resolveHandle = (i, r) => this.api.com.atproto.identity.resolveHandle(i, r), this.updateHandle = (i, r) => this.api.com.atproto.identity.updateHandle(i, r), this.createModerationReport = (i, r) => this.api.com.atproto.moderation.createReport(i, r), this.service = t.service instanceof URL ? t.service : new URL(t.service), this._persistSession = t.persistSession, this._baseClient = new Vp(), this._baseClient.xrpc.fetch = this._fetch.bind(this), this.api = this._baseClient.service(t.service);
    }
    get com() {
      return this.api.com;
    }
    static configure(t) {
      Je.fetch = t.fetch;
    }
    get hasSession() {
      return !!this.session;
    }
    setPersistSessionHandler(t) {
      this._persistSession = t;
    }
    async createAccount(t) {
      try {
        const i = await this.api.com.atproto.server.createAccount(t);
        return this.session = {
          accessJwt: i.data.accessJwt,
          refreshJwt: i.data.refreshJwt,
          handle: i.data.handle,
          did: i.data.did,
          email: t.email,
          emailConfirmed: !1
        }, this._updateApiEndpoint(i.data.didDoc), i;
      } catch (i) {
        throw this.session = void 0, i;
      } finally {
        this.session ? this._persistSession?.("create", this.session) : this._persistSession?.("create-failed", void 0);
      }
    }
    async login(t) {
      try {
        const i = await this.api.com.atproto.server.createSession({
          identifier: t.identifier,
          password: t.password
        });
        return this.session = {
          accessJwt: i.data.accessJwt,
          refreshJwt: i.data.refreshJwt,
          handle: i.data.handle,
          did: i.data.did,
          email: i.data.email,
          emailConfirmed: i.data.emailConfirmed
        }, this._updateApiEndpoint(i.data.didDoc), i;
      } catch (i) {
        throw this.session = void 0, i;
      } finally {
        this.session ? this._persistSession?.("create", this.session) : this._persistSession?.("create-failed", void 0);
      }
    }
    async resumeSession(t) {
      try {
        this.session = t;
        const i = await this.api.com.atproto.server.getSession();
        if (i.data.did !== this.session.did)
          throw new w(400, "Invalid session", "InvalidDID");
        return this.session.email = i.data.email, this.session.handle = i.data.handle, this.session.emailConfirmed = i.data.emailConfirmed, this._updateApiEndpoint(i.data.didDoc), this._persistSession?.("update", this.session), i;
      } catch (i) {
        throw this.session = void 0, i instanceof w ? [1, 408, 425, 429, 500, 502, 503, 504, 522, 524].includes(i.status) ? this._persistSession?.("network-error", void 0) : this._persistSession?.("expired", void 0) : this._persistSession?.("network-error", void 0), i;
      }
    }
    _addAuthHeader(t) {
      return !t.authorization && this.session?.accessJwt ? {
        ...t,
        authorization: `Bearer ${this.session.accessJwt}`
      } : t;
    }
    async _fetch(t, i, r, n) {
      if (!Je.fetch)
        throw new Error("AtpAgent fetch() method not configured");
      await this._refreshSessionPromise;
      let s = await Je.fetch(t, i, this._addAuthHeader(r), n);
      return cu(s, ["ExpiredToken"]) && this.session?.refreshJwt && (await this.refreshSession(), s = await Je.fetch(t, i, this._addAuthHeader(r), n)), s;
    }
    async refreshSession() {
      if (this._refreshSessionPromise)
        return this._refreshSessionPromise;
      this._refreshSessionPromise = this._refreshSessionInner();
      try {
        await this._refreshSessionPromise;
      } finally {
        this._refreshSessionPromise = void 0;
      }
    }
    async _refreshSessionInner() {
      if (!Je.fetch)
        throw new Error("AtpAgent fetch() method not configured");
      if (!this.session?.refreshJwt)
        return;
      const t = new URL((this.pdsUrl || this.service).origin);
      t.pathname = `/xrpc/${Nb}`;
      const i = await Je.fetch(t.toString(), "POST", {
        authorization: `Bearer ${this.session.refreshJwt}`
      }, void 0);
      cu(i, ["ExpiredToken", "InvalidToken"]) ? (this.session = void 0, this._persistSession?.("expired", void 0)) : Ib(this._baseClient, i.body) && (this.session = {
        ...this.session || {},
        accessJwt: i.body.accessJwt,
        refreshJwt: i.body.refreshJwt,
        handle: i.body.handle,
        did: i.body.did
      }, this._updateApiEndpoint(i.body.didDoc), this._persistSession?.("update", this.session));
    }
    _updateApiEndpoint(t) {
      if (_c(t)) {
        const i = xc(t);
        this.pdsUrl = i ? new URL(i) : void 0;
      }
      this.api.xrpc.uri = this.pdsUrl || this.service;
    }
  }, cr = Je;
  cr.fetch = _n;
  function Pb(t) {
    return Tn.safeParse(t).success;
  }
  function cu(t, i) {
    return t.status !== 400 || !Pb(t.body) ? !1 : typeof t.body.error == "string" && i.includes(t.body.error);
  }
  function Ib(t, i) {
    try {
      return t.xrpc.lex.assertValidXrpcOutput("com.atproto.server.refreshSession", i), !0;
    } catch {
      return !1;
    }
  }
  var du = new TextEncoder(), jb = new TextDecoder(), St = class {
    constructor(t) {
      this.utf16 = t, this.utf8 = du.encode(t);
    }
    get length() {
      return this.utf8.byteLength;
    }
    get graphemeLength() {
      return this._graphemeLen || (this._graphemeLen = Ir(this.utf16)), this._graphemeLen;
    }
    slice(t, i) {
      return jb.decode(this.utf8.slice(t, i));
    }
    utf16IndexToUtf8Index(t) {
      return du.encode(this.utf16.slice(0, t)).byteLength;
    }
    toString() {
      return this.utf16;
    }
  }, Fb = /[\r\n]([\u00AD\u2060\u200D\u200C\u200B\s]*[\r\n]){2,}/, qb = `

`;
  function mu(t, i) {
    return i.cleanNewlines && (t = Mb(t, Fb, qb)), t;
  }
  function Mb(t, i, r) {
    t = t.clone();
    let n = t.unicodeText.utf16.match(i);
    for (; n && typeof n.index < "u"; ) {
      const s = t.unicodeText, u = t.unicodeText.utf16IndexToUtf8Index(n.index), e = u + new St(n[0]).length;
      if (t.delete(u, e), t.unicodeText.utf16 === s.utf16)
        break;
      t.insert(u, r), n = t.unicodeText.utf16.match(i);
    }
    return t;
  }
  var $b = [
    "aaa",
    "aarp",
    "abarth",
    "abb",
    "abbott",
    "abbvie",
    "abc",
    "able",
    "abogado",
    "abudhabi",
    "ac",
    "academy",
    "accenture",
    "accountant",
    "accountants",
    "aco",
    "actor",
    "ad",
    "ads",
    "adult",
    "ae",
    "aeg",
    "aero",
    "aetna",
    "af",
    "afl",
    "africa",
    "ag",
    "agakhan",
    "agency",
    "ai",
    "aig",
    "airbus",
    "airforce",
    "airtel",
    "akdn",
    "al",
    "alfaromeo",
    "alibaba",
    "alipay",
    "allfinanz",
    "allstate",
    "ally",
    "alsace",
    "alstom",
    "am",
    "amazon",
    "americanexpress",
    "americanfamily",
    "amex",
    "amfam",
    "amica",
    "amsterdam",
    "analytics",
    "android",
    "anquan",
    "anz",
    "ao",
    "aol",
    "apartments",
    "app",
    "apple",
    "aq",
    "aquarelle",
    "ar",
    "arab",
    "aramco",
    "archi",
    "army",
    "arpa",
    "art",
    "arte",
    "as",
    "asda",
    "asia",
    "associates",
    "at",
    "athleta",
    "attorney",
    "au",
    "auction",
    "audi",
    "audible",
    "audio",
    "auspost",
    "author",
    "auto",
    "autos",
    "avianca",
    "aw",
    "aws",
    "ax",
    "axa",
    "az",
    "azure",
    "ba",
    "baby",
    "baidu",
    "banamex",
    "bananarepublic",
    "band",
    "bank",
    "bar",
    "barcelona",
    "barclaycard",
    "barclays",
    "barefoot",
    "bargains",
    "baseball",
    "basketball",
    "bauhaus",
    "bayern",
    "bb",
    "bbc",
    "bbt",
    "bbva",
    "bcg",
    "bcn",
    "bd",
    "be",
    "beats",
    "beauty",
    "beer",
    "bentley",
    "berlin",
    "best",
    "bestbuy",
    "bet",
    "bf",
    "bg",
    "bh",
    "bharti",
    "bi",
    "bible",
    "bid",
    "bike",
    "bing",
    "bingo",
    "bio",
    "biz",
    "bj",
    "black",
    "blackfriday",
    "blockbuster",
    "blog",
    "bloomberg",
    "blue",
    "bm",
    "bms",
    "bmw",
    "bn",
    "bnpparibas",
    "bo",
    "boats",
    "boehringer",
    "bofa",
    "bom",
    "bond",
    "boo",
    "book",
    "booking",
    "bosch",
    "bostik",
    "boston",
    "bot",
    "boutique",
    "box",
    "br",
    "bradesco",
    "bridgestone",
    "broadway",
    "broker",
    "brother",
    "brussels",
    "bs",
    "bt",
    "build",
    "builders",
    "business",
    "buy",
    "buzz",
    "bv",
    "bw",
    "by",
    "bz",
    "bzh",
    "ca",
    "cab",
    "cafe",
    "cal",
    "call",
    "calvinklein",
    "cam",
    "camera",
    "camp",
    "canon",
    "capetown",
    "capital",
    "capitalone",
    "car",
    "caravan",
    "cards",
    "care",
    "career",
    "careers",
    "cars",
    "casa",
    "case",
    "cash",
    "casino",
    "cat",
    "catering",
    "catholic",
    "cba",
    "cbn",
    "cbre",
    "cbs",
    "cc",
    "cd",
    "center",
    "ceo",
    "cern",
    "cf",
    "cfa",
    "cfd",
    "cg",
    "ch",
    "chanel",
    "channel",
    "charity",
    "chase",
    "chat",
    "cheap",
    "chintai",
    "christmas",
    "chrome",
    "church",
    "ci",
    "cipriani",
    "circle",
    "cisco",
    "citadel",
    "citi",
    "citic",
    "city",
    "cityeats",
    "ck",
    "cl",
    "claims",
    "cleaning",
    "click",
    "clinic",
    "clinique",
    "clothing",
    "cloud",
    "club",
    "clubmed",
    "cm",
    "cn",
    "co",
    "coach",
    "codes",
    "coffee",
    "college",
    "cologne",
    "com",
    "comcast",
    "commbank",
    "community",
    "company",
    "compare",
    "computer",
    "comsec",
    "condos",
    "construction",
    "consulting",
    "contact",
    "contractors",
    "cooking",
    "cookingchannel",
    "cool",
    "coop",
    "corsica",
    "country",
    "coupon",
    "coupons",
    "courses",
    "cpa",
    "cr",
    "credit",
    "creditcard",
    "creditunion",
    "cricket",
    "crown",
    "crs",
    "cruise",
    "cruises",
    "cu",
    "cuisinella",
    "cv",
    "cw",
    "cx",
    "cy",
    "cymru",
    "cyou",
    "cz",
    "dabur",
    "dad",
    "dance",
    "data",
    "date",
    "dating",
    "datsun",
    "day",
    "dclk",
    "dds",
    "de",
    "deal",
    "dealer",
    "deals",
    "degree",
    "delivery",
    "dell",
    "deloitte",
    "delta",
    "democrat",
    "dental",
    "dentist",
    "desi",
    "design",
    "dev",
    "dhl",
    "diamonds",
    "diet",
    "digital",
    "direct",
    "directory",
    "discount",
    "discover",
    "dish",
    "diy",
    "dj",
    "dk",
    "dm",
    "dnp",
    "do",
    "docs",
    "doctor",
    "dog",
    "domains",
    "dot",
    "download",
    "drive",
    "dtv",
    "dubai",
    "dunlop",
    "dupont",
    "durban",
    "dvag",
    "dvr",
    "dz",
    "earth",
    "eat",
    "ec",
    "eco",
    "edeka",
    "edu",
    "education",
    "ee",
    "eg",
    "email",
    "emerck",
    "energy",
    "engineer",
    "engineering",
    "enterprises",
    "epson",
    "equipment",
    "er",
    "ericsson",
    "erni",
    "es",
    "esq",
    "estate",
    "et",
    "etisalat",
    "eu",
    "eurovision",
    "eus",
    "events",
    "exchange",
    "expert",
    "exposed",
    "express",
    "extraspace",
    "fage",
    "fail",
    "fairwinds",
    "faith",
    "family",
    "fan",
    "fans",
    "farm",
    "farmers",
    "fashion",
    "fast",
    "fedex",
    "feedback",
    "ferrari",
    "ferrero",
    "fi",
    "fiat",
    "fidelity",
    "fido",
    "film",
    "final",
    "finance",
    "financial",
    "fire",
    "firestone",
    "firmdale",
    "fish",
    "fishing",
    "fit",
    "fitness",
    "fj",
    "fk",
    "flickr",
    "flights",
    "flir",
    "florist",
    "flowers",
    "fly",
    "fm",
    "fo",
    "foo",
    "food",
    "foodnetwork",
    "football",
    "ford",
    "forex",
    "forsale",
    "forum",
    "foundation",
    "fox",
    "fr",
    "free",
    "fresenius",
    "frl",
    "frogans",
    "frontdoor",
    "frontier",
    "ftr",
    "fujitsu",
    "fun",
    "fund",
    "furniture",
    "futbol",
    "fyi",
    "ga",
    "gal",
    "gallery",
    "gallo",
    "gallup",
    "game",
    "games",
    "gap",
    "garden",
    "gay",
    "gb",
    "gbiz",
    "gd",
    "gdn",
    "ge",
    "gea",
    "gent",
    "genting",
    "george",
    "gf",
    "gg",
    "ggee",
    "gh",
    "gi",
    "gift",
    "gifts",
    "gives",
    "giving",
    "gl",
    "glass",
    "gle",
    "global",
    "globo",
    "gm",
    "gmail",
    "gmbh",
    "gmo",
    "gmx",
    "gn",
    "godaddy",
    "gold",
    "goldpoint",
    "golf",
    "goo",
    "goodyear",
    "goog",
    "google",
    "gop",
    "got",
    "gov",
    "gp",
    "gq",
    "gr",
    "grainger",
    "graphics",
    "gratis",
    "green",
    "gripe",
    "grocery",
    "group",
    "gs",
    "gt",
    "gu",
    "guardian",
    "gucci",
    "guge",
    "guide",
    "guitars",
    "guru",
    "gw",
    "gy",
    "hair",
    "hamburg",
    "hangout",
    "haus",
    "hbo",
    "hdfc",
    "hdfcbank",
    "health",
    "healthcare",
    "help",
    "helsinki",
    "here",
    "hermes",
    "hgtv",
    "hiphop",
    "hisamitsu",
    "hitachi",
    "hiv",
    "hk",
    "hkt",
    "hm",
    "hn",
    "hockey",
    "holdings",
    "holiday",
    "homedepot",
    "homegoods",
    "homes",
    "homesense",
    "honda",
    "horse",
    "hospital",
    "host",
    "hosting",
    "hot",
    "hoteles",
    "hotels",
    "hotmail",
    "house",
    "how",
    "hr",
    "hsbc",
    "ht",
    "hu",
    "hughes",
    "hyatt",
    "hyundai",
    "ibm",
    "icbc",
    "ice",
    "icu",
    "id",
    "ie",
    "ieee",
    "ifm",
    "ikano",
    "il",
    "im",
    "imamat",
    "imdb",
    "immo",
    "immobilien",
    "in",
    "inc",
    "industries",
    "infiniti",
    "info",
    "ing",
    "ink",
    "institute",
    "insurance",
    "insure",
    "int",
    "international",
    "intuit",
    "investments",
    "io",
    "ipiranga",
    "iq",
    "ir",
    "irish",
    "is",
    "ismaili",
    "ist",
    "istanbul",
    "it",
    "itau",
    "itv",
    "jaguar",
    "java",
    "jcb",
    "je",
    "jeep",
    "jetzt",
    "jewelry",
    "jio",
    "jll",
    "jm",
    "jmp",
    "jnj",
    "jo",
    "jobs",
    "joburg",
    "jot",
    "joy",
    "jp",
    "jpmorgan",
    "jprs",
    "juegos",
    "juniper",
    "kaufen",
    "kddi",
    "ke",
    "kerryhotels",
    "kerrylogistics",
    "kerryproperties",
    "kfh",
    "kg",
    "kh",
    "ki",
    "kia",
    "kids",
    "kim",
    "kinder",
    "kindle",
    "kitchen",
    "kiwi",
    "km",
    "kn",
    "koeln",
    "komatsu",
    "kosher",
    "kp",
    "kpmg",
    "kpn",
    "kr",
    "krd",
    "kred",
    "kuokgroup",
    "kw",
    "ky",
    "kyoto",
    "kz",
    "la",
    "lacaixa",
    "lamborghini",
    "lamer",
    "lancaster",
    "lancia",
    "land",
    "landrover",
    "lanxess",
    "lasalle",
    "lat",
    "latino",
    "latrobe",
    "law",
    "lawyer",
    "lb",
    "lc",
    "lds",
    "lease",
    "leclerc",
    "lefrak",
    "legal",
    "lego",
    "lexus",
    "lgbt",
    "li",
    "lidl",
    "life",
    "lifeinsurance",
    "lifestyle",
    "lighting",
    "like",
    "lilly",
    "limited",
    "limo",
    "lincoln",
    "linde",
    "link",
    "lipsy",
    "live",
    "living",
    "lk",
    "llc",
    "llp",
    "loan",
    "loans",
    "locker",
    "locus",
    "loft",
    "lol",
    "london",
    "lotte",
    "lotto",
    "love",
    "lpl",
    "lplfinancial",
    "lr",
    "ls",
    "lt",
    "ltd",
    "ltda",
    "lu",
    "lundbeck",
    "luxe",
    "luxury",
    "lv",
    "ly",
    "ma",
    "macys",
    "madrid",
    "maif",
    "maison",
    "makeup",
    "man",
    "management",
    "mango",
    "map",
    "market",
    "marketing",
    "markets",
    "marriott",
    "marshalls",
    "maserati",
    "mattel",
    "mba",
    "mc",
    "mckinsey",
    "md",
    "me",
    "med",
    "media",
    "meet",
    "melbourne",
    "meme",
    "memorial",
    "men",
    "menu",
    "merckmsd",
    "mg",
    "mh",
    "miami",
    "microsoft",
    "mil",
    "mini",
    "mint",
    "mit",
    "mitsubishi",
    "mk",
    "ml",
    "mlb",
    "mls",
    "mm",
    "mma",
    "mn",
    "mo",
    "mobi",
    "mobile",
    "moda",
    "moe",
    "moi",
    "mom",
    "monash",
    "money",
    "monster",
    "mormon",
    "mortgage",
    "moscow",
    "moto",
    "motorcycles",
    "mov",
    "movie",
    "mp",
    "mq",
    "mr",
    "ms",
    "msd",
    "mt",
    "mtn",
    "mtr",
    "mu",
    "museum",
    "music",
    "mutual",
    "mv",
    "mw",
    "mx",
    "my",
    "mz",
    "na",
    "nab",
    "nagoya",
    "name",
    "natura",
    "navy",
    "nba",
    "nc",
    "ne",
    "nec",
    "net",
    "netbank",
    "netflix",
    "network",
    "neustar",
    "new",
    "news",
    "next",
    "nextdirect",
    "nexus",
    "nf",
    "nfl",
    "ng",
    "ngo",
    "nhk",
    "ni",
    "nico",
    "nike",
    "nikon",
    "ninja",
    "nissan",
    "nissay",
    "nl",
    "no",
    "nokia",
    "northwesternmutual",
    "norton",
    "now",
    "nowruz",
    "nowtv",
    "np",
    "nr",
    "nra",
    "nrw",
    "ntt",
    "nu",
    "nyc",
    "nz",
    "obi",
    "observer",
    "office",
    "okinawa",
    "olayan",
    "olayangroup",
    "oldnavy",
    "ollo",
    "om",
    "omega",
    "one",
    "ong",
    "onl",
    "online",
    "ooo",
    "open",
    "oracle",
    "orange",
    "org",
    "organic",
    "origins",
    "osaka",
    "otsuka",
    "ott",
    "ovh",
    "pa",
    "page",
    "panasonic",
    "paris",
    "pars",
    "partners",
    "parts",
    "party",
    "passagens",
    "pay",
    "pccw",
    "pe",
    "pet",
    "pf",
    "pfizer",
    "pg",
    "ph",
    "pharmacy",
    "phd",
    "philips",
    "phone",
    "photo",
    "photography",
    "photos",
    "physio",
    "pics",
    "pictet",
    "pictures",
    "pid",
    "pin",
    "ping",
    "pink",
    "pioneer",
    "pizza",
    "pk",
    "pl",
    "place",
    "play",
    "playstation",
    "plumbing",
    "plus",
    "pm",
    "pn",
    "pnc",
    "pohl",
    "poker",
    "politie",
    "porn",
    "post",
    "pr",
    "pramerica",
    "praxi",
    "press",
    "prime",
    "pro",
    "prod",
    "productions",
    "prof",
    "progressive",
    "promo",
    "properties",
    "property",
    "protection",
    "pru",
    "prudential",
    "ps",
    "pt",
    "pub",
    "pw",
    "pwc",
    "py",
    "qa",
    "qpon",
    "quebec",
    "quest",
    "racing",
    "radio",
    "re",
    "read",
    "realestate",
    "realtor",
    "realty",
    "recipes",
    "red",
    "redstone",
    "redumbrella",
    "rehab",
    "reise",
    "reisen",
    "reit",
    "reliance",
    "ren",
    "rent",
    "rentals",
    "repair",
    "report",
    "republican",
    "rest",
    "restaurant",
    "review",
    "reviews",
    "rexroth",
    "rich",
    "richardli",
    "ricoh",
    "ril",
    "rio",
    "rip",
    "ro",
    "rocher",
    "rocks",
    "rodeo",
    "rogers",
    "room",
    "rs",
    "rsvp",
    "ru",
    "rugby",
    "ruhr",
    "run",
    "rw",
    "rwe",
    "ryukyu",
    "sa",
    "saarland",
    "safe",
    "safety",
    "sakura",
    "sale",
    "salon",
    "samsclub",
    "samsung",
    "sandvik",
    "sandvikcoromant",
    "sanofi",
    "sap",
    "sarl",
    "sas",
    "save",
    "saxo",
    "sb",
    "sbi",
    "sbs",
    "sc",
    "sca",
    "scb",
    "schaeffler",
    "schmidt",
    "scholarships",
    "school",
    "schule",
    "schwarz",
    "science",
    "scot",
    "sd",
    "se",
    "search",
    "seat",
    "secure",
    "security",
    "seek",
    "select",
    "sener",
    "services",
    "ses",
    "seven",
    "sew",
    "sex",
    "sexy",
    "sfr",
    "sg",
    "sh",
    "shangrila",
    "sharp",
    "shaw",
    "shell",
    "shia",
    "shiksha",
    "shoes",
    "shop",
    "shopping",
    "shouji",
    "show",
    "showtime",
    "si",
    "silk",
    "sina",
    "singles",
    "site",
    "sj",
    "sk",
    "ski",
    "skin",
    "sky",
    "skype",
    "sl",
    "sling",
    "sm",
    "smart",
    "smile",
    "sn",
    "sncf",
    "so",
    "soccer",
    "social",
    "softbank",
    "software",
    "sohu",
    "solar",
    "solutions",
    "song",
    "sony",
    "soy",
    "spa",
    "space",
    "sport",
    "spot",
    "sr",
    "srl",
    "ss",
    "st",
    "stada",
    "staples",
    "star",
    "statebank",
    "statefarm",
    "stc",
    "stcgroup",
    "stockholm",
    "storage",
    "store",
    "stream",
    "studio",
    "study",
    "style",
    "su",
    "sucks",
    "supplies",
    "supply",
    "support",
    "surf",
    "surgery",
    "suzuki",
    "sv",
    "swatch",
    "swiss",
    "sx",
    "sy",
    "sydney",
    "systems",
    "sz",
    "tab",
    "taipei",
    "talk",
    "taobao",
    "target",
    "tatamotors",
    "tatar",
    "tattoo",
    "tax",
    "taxi",
    "tc",
    "tci",
    "td",
    "tdk",
    "team",
    "tech",
    "technology",
    "tel",
    "temasek",
    "tennis",
    "teva",
    "tf",
    "tg",
    "th",
    "thd",
    "theater",
    "theatre",
    "tiaa",
    "tickets",
    "tienda",
    "tiffany",
    "tips",
    "tires",
    "tirol",
    "tj",
    "tjmaxx",
    "tjx",
    "tk",
    "tkmaxx",
    "tl",
    "tm",
    "tmall",
    "tn",
    "to",
    "today",
    "tokyo",
    "tools",
    "top",
    "toray",
    "toshiba",
    "total",
    "tours",
    "town",
    "toyota",
    "toys",
    "tr",
    "trade",
    "trading",
    "training",
    "travel",
    "travelchannel",
    "travelers",
    "travelersinsurance",
    "trust",
    "trv",
    "tt",
    "tube",
    "tui",
    "tunes",
    "tushu",
    "tv",
    "tvs",
    "tw",
    "tz",
    "ua",
    "ubank",
    "ubs",
    "ug",
    "uk",
    "unicom",
    "university",
    "uno",
    "uol",
    "ups",
    "us",
    "uy",
    "uz",
    "va",
    "vacations",
    "vana",
    "vanguard",
    "vc",
    "ve",
    "vegas",
    "ventures",
    "verisign",
    "vermögensberater",
    "vermögensberatung",
    "versicherung",
    "vet",
    "vg",
    "vi",
    "viajes",
    "video",
    "vig",
    "viking",
    "villas",
    "vin",
    "vip",
    "virgin",
    "visa",
    "vision",
    "viva",
    "vivo",
    "vlaanderen",
    "vn",
    "vodka",
    "volkswagen",
    "volvo",
    "vote",
    "voting",
    "voto",
    "voyage",
    "vu",
    "vuelos",
    "wales",
    "walmart",
    "walter",
    "wang",
    "wanggou",
    "watch",
    "watches",
    "weather",
    "weatherchannel",
    "webcam",
    "weber",
    "website",
    "wed",
    "wedding",
    "weibo",
    "weir",
    "wf",
    "whoswho",
    "wien",
    "wiki",
    "williamhill",
    "win",
    "windows",
    "wine",
    "winners",
    "wme",
    "wolterskluwer",
    "woodside",
    "work",
    "works",
    "world",
    "wow",
    "ws",
    "wtc",
    "wtf",
    "xbox",
    "xerox",
    "xfinity",
    "xihuan",
    "xin",
    "xxx",
    "xyz",
    "yachts",
    "yahoo",
    "yamaxun",
    "yandex",
    "ye",
    "yodobashi",
    "yoga",
    "yokohama",
    "you",
    "youtube",
    "yt",
    "yun",
    "za",
    "zappos",
    "zara",
    "zero",
    "zip",
    "zm",
    "zone",
    "zuerich",
    "zw",
    "ελ",
    "ευ",
    "бг",
    "бел",
    "дети",
    "ею",
    "католик",
    "ком",
    "мкд",
    "мон",
    "москва",
    "онлайн",
    "орг",
    "рус",
    "рф",
    "сайт",
    "срб",
    "укр",
    "қаз",
    "հայ",
    "ישראל",
    "קום",
    "ابوظبي",
    "اتصالات",
    "ارامكو",
    "الاردن",
    "البحرين",
    "الجزائر",
    "السعودية",
    "العليان",
    "المغرب",
    "امارات",
    "ایران",
    "بارت",
    "بازار",
    "بيتك",
    "بھارت",
    "تونس",
    "سودان",
    "سورية",
    "شبكة",
    "عراق",
    "عرب",
    "عمان",
    "فلسطين",
    "قطر",
    "كاثوليك",
    "كوم",
    "مصر",
    "مليسيا",
    "موريتانيا",
    "موقع",
    "همراه",
    "پاکستان",
    "ڀارت",
    "कॉम",
    "नेट",
    "भारत",
    "भारतम्",
    "भारोत",
    "संगठन",
    "বাংলা",
    "ভারত",
    "ভাৰত",
    "ਭਾਰਤ",
    "ભારત",
    "ଭାରତ",
    "இந்தியா",
    "இலங்கை",
    "சிங்கப்பூர்",
    "భారత్",
    "ಭಾರತ",
    "ഭാരതം",
    "ලංකා",
    "คอม",
    "ไทย",
    "ລາວ",
    "გე",
    "みんな",
    "アマゾン",
    "クラウド",
    "グーグル",
    "コム",
    "ストア",
    "セール",
    "ファッション",
    "ポイント",
    "世界",
    "中信",
    "中国",
    "中國",
    "中文网",
    "亚马逊",
    "企业",
    "佛山",
    "信息",
    "健康",
    "八卦",
    "公司",
    "公益",
    "台湾",
    "台灣",
    "商城",
    "商店",
    "商标",
    "嘉里",
    "嘉里大酒店",
    "在线",
    "大拿",
    "天主教",
    "娱乐",
    "家電",
    "广东",
    "微博",
    "慈善",
    "我爱你",
    "手机",
    "招聘",
    "政务",
    "政府",
    "新加坡",
    "新闻",
    "时尚",
    "書籍",
    "机构",
    "淡马锡",
    "游戏",
    "澳門",
    "点看",
    "移动",
    "组织机构",
    "网址",
    "网店",
    "网站",
    "网络",
    "联通",
    "诺基亚",
    "谷歌",
    "购物",
    "通販",
    "集团",
    "電訊盈科",
    "飞利浦",
    "食品",
    "餐厅",
    "香格里拉",
    "香港",
    "닷넷",
    "닷컴",
    "삼성",
    "한국"
  ], hu = /(^|\s|\()(@)([a-zA-Z0-9.-]+)(\b)/g, yu = /(^|\s|\()((https?:\/\/[\S]+)|((?<domain>[a-z][a-z0-9]*(\.[a-z0-9]+)+)[\S]*))/gim, Eu = /\p{P}+$/gu, gu = /(^|\s)[#＃]((?!\ufe0f)[^\s\u00AD\u2060\u200A\u200B\u200C\u200D\u20e2]*[^\d\s\p{P}\u00AD\u2060\u200A\u200B\u200C\u200D\u20e2]+[^\s\u00AD\u2060\u200A\u200B\u200C\u200D\u20e2]*)?/gu;
  function Ru(t) {
    let i;
    const r = [];
    {
      const n = hu;
      for (; i = n.exec(t.utf16); ) {
        if (!bu(i[3]) && !i[3].endsWith(".test"))
          continue;
        const s = t.utf16.indexOf(i[3], i.index) - 1;
        r.push({
          $type: "app.bsky.richtext.facet",
          index: {
            byteStart: t.utf16IndexToUtf8Index(s),
            byteEnd: t.utf16IndexToUtf8Index(s + i[3].length + 1)
          },
          features: [
            {
              $type: "app.bsky.richtext.facet#mention",
              did: i[3]
            }
          ]
        });
      }
    }
    {
      const n = yu;
      for (; i = n.exec(t.utf16); ) {
        let s = i[2];
        if (!s.startsWith("http")) {
          const d = i.groups?.domain;
          if (!d || !bu(d))
            continue;
          s = `https://${s}`;
        }
        const u = t.utf16.indexOf(i[2], i.index), e = { start: u, end: u + i[2].length };
        /[.,;:!?]$/.test(s) && (s = s.slice(0, -1), e.end--), /[)]$/.test(s) && !s.includes("(") && (s = s.slice(0, -1), e.end--), r.push({
          index: {
            byteStart: t.utf16IndexToUtf8Index(e.start),
            byteEnd: t.utf16IndexToUtf8Index(e.end)
          },
          features: [
            {
              $type: "app.bsky.richtext.facet#link",
              uri: s
            }
          ]
        });
      }
    }
    {
      const n = gu;
      for (; i = n.exec(t.utf16); ) {
        let [, s, u] = i;
        if (!u || (u = u.trim().replace(Eu, ""), u.length === 0 || u.length > 64))
          continue;
        const e = i.index + s.length;
        r.push({
          index: {
            byteStart: t.utf16IndexToUtf8Index(e),
            byteEnd: t.utf16IndexToUtf8Index(e + 1 + u.length)
          },
          features: [
            {
              $type: "app.bsky.richtext.facet#tag",
              tag: u
            }
          ]
        });
      }
    }
    return r.length > 0 ? r : void 0;
  }
  function bu(t) {
    return !!$b.find((i) => {
      const r = t.lastIndexOf(i);
      return r === -1 ? !1 : t.charAt(r - 1) === "." && r === t.length - i.length;
    });
  }
  var pt = class {
    constructor(t, i) {
      this.text = t, this.facet = i;
    }
    get link() {
      const t = this.facet?.features.find(Ve.isLink);
      if (Ve.isLink(t))
        return t;
    }
    isLink() {
      return !!this.link;
    }
    get mention() {
      const t = this.facet?.features.find(Ve.isMention);
      if (Ve.isMention(t))
        return t;
    }
    isMention() {
      return !!this.mention;
    }
    get tag() {
      const t = this.facet?.features.find(Ve.isTag);
      if (Ve.isTag(t))
        return t;
    }
    isTag() {
      return !!this.tag;
    }
  }, Au = class {
    constructor(t, i) {
      this.unicodeText = new St(t.text), this.facets = t.facets, !this.facets?.length && t.entities?.length && (this.facets = Gb(this.unicodeText, t.entities)), this.facets && this.facets.sort(Yr), i?.cleanNewlines && mu(this, { cleanNewlines: !0 }).copyInto(this);
    }
    get text() {
      return this.unicodeText.toString();
    }
    get length() {
      return this.unicodeText.length;
    }
    get graphemeLength() {
      return this.unicodeText.graphemeLength;
    }
    clone() {
      return new Au({
        text: this.unicodeText.utf16,
        facets: Tu(this.facets)
      });
    }
    copyInto(t) {
      t.unicodeText = this.unicodeText, t.facets = Tu(this.facets);
    }
    *segments() {
      const t = this.facets || [];
      if (!t.length) {
        yield new pt(this.unicodeText.utf16);
        return;
      }
      let i = 0, r = 0;
      do {
        const n = t[r];
        if (i < n.index.byteStart)
          yield new pt(this.unicodeText.slice(i, n.index.byteStart));
        else if (i > n.index.byteStart) {
          r++;
          continue;
        }
        if (n.index.byteStart < n.index.byteEnd) {
          const s = this.unicodeText.slice(n.index.byteStart, n.index.byteEnd);
          s.trim() ? yield new pt(s, n) : yield new pt(s);
        }
        i = n.index.byteEnd, r++;
      } while (r < t.length);
      i < this.unicodeText.length && (yield new pt(this.unicodeText.slice(i, this.unicodeText.length)));
    }
    insert(t, i) {
      if (this.unicodeText = new St(this.unicodeText.slice(0, t) + i + this.unicodeText.slice(t)), !this.facets?.length)
        return this;
      const r = i.length;
      for (const n of this.facets)
        t <= n.index.byteStart ? (n.index.byteStart += r, n.index.byteEnd += r) : t >= n.index.byteStart && t < n.index.byteEnd && (n.index.byteEnd += r);
      return this;
    }
    delete(t, i) {
      if (this.unicodeText = new St(this.unicodeText.slice(0, t) + this.unicodeText.slice(i)), !this.facets?.length)
        return this;
      const r = i - t;
      for (const n of this.facets)
        t <= n.index.byteStart && i >= n.index.byteEnd ? (n.index.byteStart = 0, n.index.byteEnd = 0) : t > n.index.byteEnd || (t > n.index.byteStart && t <= n.index.byteEnd && i > n.index.byteEnd ? n.index.byteEnd = t : t >= n.index.byteStart && i <= n.index.byteEnd ? n.index.byteEnd -= r : t < n.index.byteStart && i >= n.index.byteStart && i <= n.index.byteEnd ? (n.index.byteStart = t, n.index.byteEnd -= r) : i < n.index.byteStart && (n.index.byteStart -= r, n.index.byteEnd -= r));
      return this.facets = this.facets.filter((n) => n.index.byteStart < n.index.byteEnd), this;
    }
    async detectFacets(t) {
      if (this.facets = Ru(this.unicodeText), this.facets) {
        for (const i of this.facets)
          for (const r of i.features)
            if (Ve.isMention(r)) {
              const n = await t.resolveHandle({ handle: r.did }).catch((s) => {
              }).then((s) => s?.data.did);
              r.did = n || "";
            }
        this.facets.sort(Yr);
      }
    }
    detectFacetsWithoutResolution() {
      this.facets = Ru(this.unicodeText), this.facets && this.facets.sort(Yr);
    }
  }, Yr = (t, i) => t.index.byteStart - i.index.byteStart;
  function Gb(t, i) {
    const r = [];
    for (const n of i)
      n.type === "link" ? r.push({
        $type: "app.bsky.richtext.facet",
        index: {
          byteStart: t.utf16IndexToUtf8Index(n.index.start),
          byteEnd: t.utf16IndexToUtf8Index(n.index.end)
        },
        features: [{ $type: "app.bsky.richtext.facet#link", uri: n.value }]
      }) : n.type === "mention" && r.push({
        $type: "app.bsky.richtext.facet",
        index: {
          byteStart: t.utf16IndexToUtf8Index(n.index.start),
          byteEnd: t.utf16IndexToUtf8Index(n.index.end)
        },
        features: [
          { $type: "app.bsky.richtext.facet#mention", did: n.value }
        ]
      });
    return r;
  }
  function Tu(t) {
    return typeof t > "u" ? t : JSON.parse(JSON.stringify(t));
  }
  var _e = class {
    constructor(t = void 0, i = !1, r = !1, n = !1, s = !1, u = !1, e = [], d = "") {
      this.cause = t, this.alert = i, this.blur = r, this.blurMedia = n, this.filter = s, this.noOverride = u, this.additionalCauses = e, this.did = d;
    }
    static noop() {
      return new _e();
    }
  }, $ = {
    "!hide": {
      id: "!hide",
      preferences: ["hide"],
      flags: ["no-override"],
      onwarn: "blur",
      groupId: "system",
      configurable: !1,
      strings: {
        settings: {
          en: {
            name: "Moderator Hide",
            description: "Moderator has chosen to hide the content."
          }
        },
        account: {
          en: {
            name: "Content Blocked",
            description: "This account has been hidden by the moderators."
          }
        },
        content: {
          en: {
            name: "Content Blocked",
            description: "This content has been hidden by the moderators."
          }
        }
      }
    },
    "!no-promote": {
      id: "!no-promote",
      preferences: ["hide"],
      flags: [],
      onwarn: null,
      groupId: "system",
      configurable: !1,
      strings: {
        settings: {
          en: {
            name: "Moderator Filter",
            description: "Moderator has chosen to filter the content from feeds."
          }
        },
        account: {
          en: {
            name: "N/A",
            description: "N/A"
          }
        },
        content: {
          en: {
            name: "N/A",
            description: "N/A"
          }
        }
      }
    },
    "!warn": {
      id: "!warn",
      preferences: ["warn"],
      flags: [],
      onwarn: "blur",
      groupId: "system",
      configurable: !1,
      strings: {
        settings: {
          en: {
            name: "Moderator Warn",
            description: "Moderator has chosen to set a general warning on the content."
          }
        },
        account: {
          en: {
            name: "Content Warning",
            description: "This account has received a general warning from moderators."
          }
        },
        content: {
          en: {
            name: "Content Warning",
            description: "This content has received a general warning from moderators."
          }
        }
      }
    },
    "!no-unauthenticated": {
      id: "!no-unauthenticated",
      preferences: ["hide"],
      flags: ["no-override", "unauthed"],
      onwarn: "blur",
      groupId: "system",
      configurable: !1,
      strings: {
        settings: {
          en: {
            name: "Sign-in Required",
            description: "This user has requested that their account only be shown to signed-in users."
          }
        },
        account: {
          en: {
            name: "Sign-in Required",
            description: "This user has requested that their account only be shown to signed-in users."
          }
        },
        content: {
          en: {
            name: "Sign-in Required",
            description: "This user has requested that their content only be shown to signed-in users."
          }
        }
      }
    },
    "dmca-violation": {
      id: "dmca-violation",
      preferences: ["hide"],
      flags: ["no-override"],
      onwarn: "blur",
      groupId: "legal",
      configurable: !1,
      strings: {
        settings: {
          en: {
            name: "Copyright Violation",
            description: "The content has received a DMCA takedown request."
          }
        },
        account: {
          en: {
            name: "Copyright Violation",
            description: "This account has received a DMCA takedown request. It will be restored if the concerns can be resolved."
          }
        },
        content: {
          en: {
            name: "Copyright Violation",
            description: "This content has received a DMCA takedown request. It will be restored if the concerns can be resolved."
          }
        }
      }
    },
    doxxing: {
      id: "doxxing",
      preferences: ["hide"],
      flags: ["no-override"],
      onwarn: "blur",
      groupId: "legal",
      configurable: !1,
      strings: {
        settings: {
          en: {
            name: "Doxxing",
            description: "Information that reveals private information about someone which has been shared without the consent of the subject."
          }
        },
        account: {
          en: {
            name: "Doxxing",
            description: "This account has been reported to publish private information about someone without their consent. This report is currently under review."
          }
        },
        content: {
          en: {
            name: "Doxxing",
            description: "This content has been reported to include private information about someone without their consent."
          }
        }
      }
    },
    porn: {
      id: "porn",
      preferences: ["ignore", "warn", "hide"],
      flags: ["adult"],
      onwarn: "blur-media",
      groupId: "sexual",
      configurable: !0,
      strings: {
        settings: {
          en: {
            name: "Pornography",
            description: "Images of full-frontal nudity (genitalia) in any sexualized context, or explicit sexual activity (meaning contact with genitalia or breasts) even if partially covered. Includes graphic sexual cartoons (often jokes/memes)."
          }
        },
        account: {
          en: {
            name: "Adult Content",
            description: "This account contains imagery of full-frontal nudity or explicit sexual activity."
          }
        },
        content: {
          en: {
            name: "Adult Content",
            description: "This content contains imagery of full-frontal nudity or explicit sexual activity."
          }
        }
      }
    },
    sexual: {
      id: "sexual",
      preferences: ["ignore", "warn", "hide"],
      flags: ["adult"],
      onwarn: "blur-media",
      groupId: "sexual",
      configurable: !0,
      strings: {
        settings: {
          en: {
            name: "Sexually Suggestive",
            description: 'Content that does not meet the level of "pornography", but is still sexual. Some common examples have been selfies and "hornyposting" with underwear on, or partially naked (naked but covered, eg with hands or from side perspective). Sheer/see-through nipples may end up in this category.'
          }
        },
        account: {
          en: {
            name: "Suggestive Content",
            description: "This account contains imagery which is sexually suggestive. Common examples include selfies in underwear or in partial undress."
          }
        },
        content: {
          en: {
            name: "Suggestive Content",
            description: "This content contains imagery which is sexually suggestive. Common examples include selfies in underwear or in partial undress."
          }
        }
      }
    },
    nudity: {
      id: "nudity",
      preferences: ["ignore", "warn", "hide"],
      flags: ["adult"],
      onwarn: "blur-media",
      groupId: "sexual",
      configurable: !0,
      strings: {
        settings: {
          en: {
            name: "Nudity",
            description: 'Nudity which is not sexual, or that is primarily "artistic" in nature. For example: breastfeeding; classic art paintings and sculptures; newspaper images with some nudity; fashion modeling. "Erotic photography" is likely to end up in sexual or porn.'
          }
        },
        account: {
          en: {
            name: "Adult Content",
            description: "This account contains imagery which portrays nudity in a non-sexual or artistic setting."
          }
        },
        content: {
          en: {
            name: "Adult Content",
            description: "This content contains imagery which portrays nudity in a non-sexual or artistic setting."
          }
        }
      }
    },
    nsfl: {
      id: "nsfl",
      preferences: ["ignore", "warn", "hide"],
      flags: ["adult"],
      onwarn: "blur-media",
      groupId: "violence",
      configurable: !0,
      strings: {
        settings: {
          en: {
            name: "NSFL",
            description: `"Not Suitable For Life." This includes graphic images like the infamous "goatse" (don't look it up).`
          }
        },
        account: {
          en: {
            name: "Graphic Imagery (NSFL)",
            description: 'This account contains graphic images which are often referred to as "Not Suitable For Life."'
          }
        },
        content: {
          en: {
            name: "Graphic Imagery (NSFL)",
            description: 'This content contains graphic images which are often referred to as "Not Suitable For Life."'
          }
        }
      }
    },
    corpse: {
      id: "corpse",
      preferences: ["ignore", "warn", "hide"],
      flags: ["adult"],
      onwarn: "blur-media",
      groupId: "violence",
      configurable: !0,
      strings: {
        settings: {
          en: {
            name: "Corpse",
            description: "Visual image of a dead human body in any context. Includes war images, hanging, funeral caskets. Does not include all figurative cases (cartoons), but can include realistic figurative images or renderings."
          }
        },
        account: {
          en: {
            name: "Graphic Imagery (Corpse)",
            description: "This account contains images of a dead human body in any context. Includes war images, hanging, funeral caskets."
          }
        },
        content: {
          en: {
            name: "Graphic Imagery (Corpse)",
            description: "This content contains images of a dead human body in any context. Includes war images, hanging, funeral caskets."
          }
        }
      }
    },
    gore: {
      id: "gore",
      preferences: ["ignore", "warn", "hide"],
      flags: ["adult"],
      onwarn: "blur-media",
      groupId: "violence",
      configurable: !0,
      strings: {
        settings: {
          en: {
            name: "Gore",
            description: "Intended for shocking images, typically involving blood or visible wounds."
          }
        },
        account: {
          en: {
            name: "Graphic Imagery (Gore)",
            description: "This account contains shocking images involving blood or visible wounds."
          }
        },
        content: {
          en: {
            name: "Graphic Imagery (Gore)",
            description: "This content contains shocking images involving blood or visible wounds."
          }
        }
      }
    },
    torture: {
      id: "torture",
      preferences: ["ignore", "warn", "hide"],
      flags: ["adult"],
      onwarn: "blur",
      groupId: "violence",
      configurable: !0,
      strings: {
        settings: {
          en: {
            name: "Torture",
            description: "Depictions of torture of a human or animal (animal cruelty)."
          }
        },
        account: {
          en: {
            name: "Graphic Imagery (Torture)",
            description: "This account contains depictions of torture of a human or animal."
          }
        },
        content: {
          en: {
            name: "Graphic Imagery (Torture)",
            description: "This content contains depictions of torture of a human or animal."
          }
        }
      }
    },
    "self-harm": {
      id: "self-harm",
      preferences: ["ignore", "warn", "hide"],
      flags: ["adult"],
      onwarn: "blur-media",
      groupId: "violence",
      configurable: !0,
      strings: {
        settings: {
          en: {
            name: "Self-Harm",
            description: "A visual depiction (photo or figurative) of cutting, suicide, or similar."
          }
        },
        account: {
          en: {
            name: "Graphic Imagery (Self-Harm)",
            description: "This account includes depictions of cutting, suicide, or other forms of self-harm."
          }
        },
        content: {
          en: {
            name: "Graphic Imagery (Self-Harm)",
            description: "This content includes depictions of cutting, suicide, or other forms of self-harm."
          }
        }
      }
    },
    "intolerant-race": {
      id: "intolerant-race",
      preferences: ["ignore", "warn", "hide"],
      flags: [],
      onwarn: "blur",
      groupId: "intolerance",
      configurable: !0,
      strings: {
        settings: {
          en: {
            name: "Racial Intolerance",
            description: "Hateful or intolerant content related to race."
          }
        },
        account: {
          en: {
            name: "Intolerance (Racial)",
            description: "This account includes hateful or intolerant content related to race."
          }
        },
        content: {
          en: {
            name: "Intolerance (Racial)",
            description: "This content includes hateful or intolerant views related to race."
          }
        }
      }
    },
    "intolerant-gender": {
      id: "intolerant-gender",
      preferences: ["ignore", "warn", "hide"],
      flags: [],
      onwarn: "blur",
      groupId: "intolerance",
      configurable: !0,
      strings: {
        settings: {
          en: {
            name: "Gender Intolerance",
            description: "Hateful or intolerant content related to gender or gender identity."
          }
        },
        account: {
          en: {
            name: "Intolerance (Gender)",
            description: "This account includes hateful or intolerant content related to gender or gender identity."
          }
        },
        content: {
          en: {
            name: "Intolerance (Gender)",
            description: "This content includes hateful or intolerant views related to gender or gender identity."
          }
        }
      }
    },
    "intolerant-sexual-orientation": {
      id: "intolerant-sexual-orientation",
      preferences: ["ignore", "warn", "hide"],
      flags: [],
      onwarn: "blur",
      groupId: "intolerance",
      configurable: !0,
      strings: {
        settings: {
          en: {
            name: "Sexual Orientation Intolerance",
            description: "Hateful or intolerant content related to sexual preferences."
          }
        },
        account: {
          en: {
            name: "Intolerance (Orientation)",
            description: "This account includes hateful or intolerant content related to sexual preferences."
          }
        },
        content: {
          en: {
            name: "Intolerance (Orientation)",
            description: "This content includes hateful or intolerant views related to sexual preferences."
          }
        }
      }
    },
    "intolerant-religion": {
      id: "intolerant-religion",
      preferences: ["ignore", "warn", "hide"],
      flags: [],
      onwarn: "blur",
      groupId: "intolerance",
      configurable: !0,
      strings: {
        settings: {
          en: {
            name: "Religious Intolerance",
            description: "Hateful or intolerant content related to religious views or practices."
          }
        },
        account: {
          en: {
            name: "Intolerance (Religious)",
            description: "This account includes hateful or intolerant content related to religious views or practices."
          }
        },
        content: {
          en: {
            name: "Intolerance (Religious)",
            description: "This content includes hateful or intolerant views related to religious views or practices."
          }
        }
      }
    },
    intolerant: {
      id: "intolerant",
      preferences: ["ignore", "warn", "hide"],
      flags: [],
      onwarn: "blur",
      groupId: "intolerance",
      configurable: !0,
      strings: {
        settings: {
          en: {
            name: "Intolerance",
            description: "A catchall for hateful or intolerant content which is not covered elsewhere."
          }
        },
        account: {
          en: {
            name: "Intolerance",
            description: "This account includes hateful or intolerant content."
          }
        },
        content: {
          en: {
            name: "Intolerance",
            description: "This content includes hateful or intolerant views."
          }
        }
      }
    },
    "icon-intolerant": {
      id: "icon-intolerant",
      preferences: ["ignore", "warn", "hide"],
      flags: [],
      onwarn: "blur-media",
      groupId: "intolerance",
      configurable: !0,
      strings: {
        settings: {
          en: {
            name: "Intolerant Iconography",
            description: "Visual imagery associated with a hate group, such as the KKK or Nazi, in any context (supportive, critical, documentary, etc)."
          }
        },
        account: {
          en: {
            name: "Intolerant Iconography",
            description: "This account includes imagery associated with a hate group such as the KKK or Nazis. This warning may apply to content any context, including critical or documentary purposes."
          }
        },
        content: {
          en: {
            name: "Intolerant Iconography",
            description: "This content includes imagery associated with a hate group such as the KKK or Nazis. This warning may apply to content any context, including critical or documentary purposes."
          }
        }
      }
    },
    threat: {
      id: "threat",
      preferences: ["ignore", "warn", "hide"],
      flags: [],
      onwarn: "blur",
      groupId: "rude",
      configurable: !0,
      strings: {
        settings: {
          en: {
            name: "Threats",
            description: "Statements or imagery published with the intent to threaten, intimidate, or harm."
          }
        },
        account: {
          en: {
            name: "Threats",
            description: "The moderators believe this account has published statements or imagery with the intent to threaten, intimidate, or harm others."
          }
        },
        content: {
          en: {
            name: "Threats",
            description: "The moderators believe this content was published with the intent to threaten, intimidate, or harm others."
          }
        }
      }
    },
    spoiler: {
      id: "spoiler",
      preferences: ["ignore", "warn", "hide"],
      flags: [],
      onwarn: "blur",
      groupId: "curation",
      configurable: !0,
      strings: {
        settings: {
          en: {
            name: "Spoiler",
            description: "Discussion about film, TV, etc which gives away plot points."
          }
        },
        account: {
          en: {
            name: "Spoiler Warning",
            description: "This account contains discussion about film, TV, etc which gives away plot points."
          }
        },
        content: {
          en: {
            name: "Spoiler Warning",
            description: "This content contains discussion about film, TV, etc which gives away plot points."
          }
        }
      }
    },
    spam: {
      id: "spam",
      preferences: ["ignore", "warn", "hide"],
      flags: [],
      onwarn: "blur",
      groupId: "spam",
      configurable: !0,
      strings: {
        settings: {
          en: {
            name: "Spam",
            description: "Repeat, low-quality messages which are clearly not designed to add to a conversation or space."
          }
        },
        account: {
          en: {
            name: "Spam",
            description: "This account publishes repeat, low-quality messages which are clearly not designed to add to a conversation or space."
          }
        },
        content: {
          en: {
            name: "Spam",
            description: "This content is a part of repeat, low-quality messages which are clearly not designed to add to a conversation or space."
          }
        }
      }
    },
    "account-security": {
      id: "account-security",
      preferences: ["ignore", "warn", "hide"],
      flags: [],
      onwarn: "blur",
      groupId: "misinfo",
      configurable: !0,
      strings: {
        settings: {
          en: {
            name: "Security Concerns",
            description: "Content designed to hijack user accounts such as a phishing attack."
          }
        },
        account: {
          en: {
            name: "Security Warning",
            description: "This account has published content designed to hijack user accounts such as a phishing attack."
          }
        },
        content: {
          en: {
            name: "Security Warning",
            description: "This content is designed to hijack user accounts such as a phishing attack."
          }
        }
      }
    },
    "net-abuse": {
      id: "net-abuse",
      preferences: ["ignore", "warn", "hide"],
      flags: [],
      onwarn: "blur",
      groupId: "misinfo",
      configurable: !0,
      strings: {
        settings: {
          en: {
            name: "Network Attacks",
            description: "Content designed to attack network systems such as denial-of-service attacks."
          }
        },
        account: {
          en: {
            name: "Network Attack Warning",
            description: "This account has published content designed to attack network systems such as denial-of-service attacks."
          }
        },
        content: {
          en: {
            name: "Network Attack Warning",
            description: "This content is designed to attack network systems such as denial-of-service attacks."
          }
        }
      }
    },
    impersonation: {
      id: "impersonation",
      preferences: ["ignore", "warn", "hide"],
      flags: [],
      onwarn: "alert",
      groupId: "misinfo",
      configurable: !0,
      strings: {
        settings: {
          en: {
            name: "Impersonation",
            description: "Accounts which falsely assert some identity."
          }
        },
        account: {
          en: {
            name: "Impersonation Warning",
            description: "The moderators believe this account is lying about their identity."
          }
        },
        content: {
          en: {
            name: "Impersonation Warning",
            description: "The moderators believe this account is lying about their identity."
          }
        }
      }
    },
    scam: {
      id: "scam",
      preferences: ["ignore", "warn", "hide"],
      flags: [],
      onwarn: "alert",
      groupId: "misinfo",
      configurable: !0,
      strings: {
        settings: {
          en: {
            name: "Scam",
            description: "Fraudulent content."
          }
        },
        account: {
          en: {
            name: "Scam Warning",
            description: "The moderators believe this account publishes fraudulent content."
          }
        },
        content: {
          en: {
            name: "Scam Warning",
            description: "The moderators believe this is fraudulent content."
          }
        }
      }
    },
    misleading: {
      id: "misleading",
      preferences: ["ignore", "warn", "hide"],
      flags: [],
      onwarn: "alert",
      groupId: "misinfo",
      configurable: !0,
      strings: {
        settings: {
          en: {
            name: "Misleading",
            description: "Accounts which share misleading information."
          }
        },
        account: {
          en: {
            name: "Misleading",
            description: "The moderators believe this account is spreading misleading information."
          }
        },
        content: {
          en: {
            name: "Misleading",
            description: "The moderators believe this account is spreading misleading information."
          }
        }
      }
    }
  }, xt = class {
    constructor() {
      this.did = "", this.causes = [];
    }
    setDid(t) {
      this.did = t;
    }
    addBlocking(t) {
      t && this.causes.push({
        type: "blocking",
        source: { type: "user" },
        priority: 3
      });
    }
    addBlockingByList(t) {
      t && this.causes.push({
        type: "blocking",
        source: { type: "list", list: t },
        priority: 3
      });
    }
    addBlockedBy(t) {
      t && this.causes.push({
        type: "blocked-by",
        source: { type: "user" },
        priority: 4
      });
    }
    addBlockOther(t) {
      t && this.causes.push({
        type: "block-other",
        source: { type: "user" },
        priority: 4
      });
    }
    addLabel(t, i) {
      const r = $[t.val];
      if (!r)
        return;
      const n = t.src === this.did, s = n ? void 0 : i.labelers.find((d) => d.labeler.did === t.src);
      let u = "ignore";
      if (r.configurable ? r.flags.includes("adult") && !i.adultContentEnabled ? u = "hide" : s?.labels[t.val] ? u = s.labels[t.val] : i.labels[t.val] && (u = i.labels[t.val]) : u = r.preferences[0], u === "ignore" || r.flags.includes("unauthed") && i.userDid)
        return;
      let e;
      r.flags.includes("no-override") ? e = 1 : u === "hide" ? e = 2 : r.onwarn === "blur" ? e = 5 : r.onwarn === "blur-media" ? e = 7 : e = 8, this.causes.push({
        type: "label",
        source: n || !s ? { type: "user" } : { type: "labeler", labeler: s.labeler },
        label: t,
        labelDef: r,
        setting: u,
        priority: e
      });
    }
    addMuted(t) {
      t && this.causes.push({
        type: "muted",
        source: { type: "user" },
        priority: 6
      });
    }
    addMutedByList(t) {
      t && this.causes.push({
        type: "muted",
        source: { type: "list", list: t },
        priority: 6
      });
    }
    finalizeDecision(t) {
      const i = new _e();
      if (i.did = this.did, !this.causes.length)
        return i;
      if (this.causes.sort((r, n) => r.priority - n.priority), i.cause = this.causes[0], i.additionalCauses = this.causes.slice(1), i.cause.type === "blocking" || i.cause.type === "blocked-by" || i.cause.type === "block-other")
        i.filter = !0, i.blur = !0, i.noOverride = !0;
      else if (i.cause.type === "muted")
        i.filter = !0, i.blur = !0;
      else if (i.cause.type === "label") {
        switch (i.cause.setting === "hide" && (i.filter = !0), i.cause.labelDef.onwarn) {
          case "alert":
            i.alert = !0;
            break;
          case "blur":
            i.blur = !0;
            break;
          case "blur-media":
            i.blurMedia = !0;
            break;
        }
        (i.cause.labelDef.flags.includes("no-override") || i.cause.labelDef.flags.includes("adult") && !t.adultContentEnabled) && (i.noOverride = !0);
      }
      return i;
    }
  };
  function ut(t, i) {
    const r = new xt();
    r.setDid(t.did), t.viewer?.muted && (t.viewer?.mutedByList ? r.addMutedByList(t.viewer?.mutedByList) : r.addMuted(t.viewer?.muted)), t.viewer?.blocking && (t.viewer?.blockingByList ? r.addBlockingByList(t.viewer?.blockingByList) : r.addBlocking(t.viewer?.blocking)), r.addBlockedBy(t.viewer?.blockedBy);
    for (const n of Ob(t.labels))
      r.addLabel(n, i);
    return r.finalizeDecision(i);
  }
  function Ob(t) {
    return t ? t.filter((i) => !i.uri.endsWith("/app.bsky.actor.profile/self") || i.val === "!no-unauthenticated") : [];
  }
  function dr(t, i) {
    const r = new xt();
    r.setDid(t.did);
    for (const n of Xb(t.labels))
      r.addLabel(n, i);
    return r.finalizeDecision(i);
  }
  function Xb(t) {
    return t ? t.filter((i) => i.uri.endsWith("/app.bsky.actor.profile/self")) : [];
  }
  function zb(t, i) {
    const r = new xt();
    if (r.setDid(t.author.did), t.labels?.length)
      for (const n of t.labels)
        r.addLabel(n, i);
    return r.finalizeDecision(i);
  }
  function Hb(t, i) {
    const r = new xt();
    if (Ue.isViewRecord(t.record)) {
      if (r.setDid(t.record.author.did), t.record.labels?.length)
        for (const n of t.record.labels)
          r.addLabel(n, i);
    } else
      Ue.isViewBlocked(t.record) && (r.setDid(t.record.author.did), t.record.author.viewer?.blocking ? r.addBlocking(t.record.author.viewer?.blocking) : t.record.author.viewer?.blockedBy ? r.addBlockedBy(t.record.author.viewer?.blockedBy) : r.addBlockOther(!0));
    return r.finalizeDecision(i);
  }
  function Zb(t, i) {
    return Ue.isViewRecord(t.record) ? ut(t.record.author, i) : _e.noop();
  }
  function Wb(t, i) {
    const r = new xt();
    if (Ue.isViewRecord(t.record.record)) {
      if (r.setDid(t.record.record.author.did), t.record.record.labels?.length)
        for (const n of t.record.record.labels)
          r.addLabel(n, i);
    } else
      Ue.isViewBlocked(t.record.record) && (r.setDid(t.record.record.author.did), t.record.record.author.viewer?.blocking ? r.addBlocking(t.record.record.author.viewer?.blocking) : t.record.record.author.viewer?.blockedBy ? r.addBlockedBy(t.record.record.author.viewer?.blockedBy) : r.addBlockOther(!0));
    return r.finalizeDecision(i);
  }
  function Jb(t, i) {
    return Ue.isViewRecord(t.record.record) ? ut(t.record.record.author, i) : _e.noop();
  }
  function Qb(t, i) {
    return _e.noop();
  }
  function Yb(t, i) {
    return _e.noop();
  }
  function Bt(...t) {
    const i = t.filter((r) => !!r);
    return i.length === 0 ? _e.noop() : (i.sort((r, n) => r.cause && n.cause ? r.cause.priority - n.cause.priority : r.cause ? -1 : n.cause ? 1 : 0), i[0]);
  }
  function Qe(t, i) {
    t.filter = !1, t.noOverride = !1, i === "noop" ? (t.blur = !1, t.blurMedia = !1, t.alert = !1, delete t.cause) : i === "alert" && (t.blur = !1, t.blurMedia = !1, t.alert = !0);
  }
  function De(t, { ignoreFilter: i } = { ignoreFilter: !1 }) {
    return t ? !(t.alert || t.blur || t.filter && !i) : !0;
  }
  function e4(t) {
    return !!(t && Ue.isView(t));
  }
  function t4(t) {
    return !!(t && Qr.isView(t));
  }
  function vu(t) {
    return {
      cause: t.cause,
      filter: t.filter,
      blur: t.blur,
      alert: t.alert,
      noOverride: t.noOverride
    };
  }
  function r4(t, i) {
    const r = ut(t, i), n = dr(t, i);
    r.blurMedia && (r.blur = !0), n.filter = !1, !De(r) && r.did === i.userDid && Qe(r, "alert"), !De(n) && n.did === i.userDid && Qe(n, "alert");
    let s = !1, u = !1;
    return ((r.blur || r.blurMedia) && r.cause?.type !== "muted" || n.blur || n.blurMedia) && (s = !0, u = r.noOverride || n.noOverride), (r.cause?.type === "blocking" || r.cause?.type === "blocked-by" || r.cause?.type === "muted") && (r.blur = !1, r.noOverride = !1), {
      decisions: { account: r, profile: n },
      account: r.filter || r.blur || r.alert ? vu(r) : {},
      profile: n.filter || n.blur || n.alert ? vu(n) : {},
      avatar: {
        blur: s,
        alert: r.alert || n.alert,
        noOverride: u
      }
    };
  }
  function i4(t, i) {
    const r = zb(t, i), n = ut(t.author, i), s = dr(t.author, i);
    let u, e;
    e4(t.embed) ? (u = Hb(t.embed, i), e = Zb(t.embed, i)) : t4(t.embed) && (u = Wb(t.embed, i), e = Jb(t.embed, i)), u?.blurMedia && (u.blur = !0), !De(r) && r.did === i.userDid && Qe(r, "blur"), n.cause && n.did === i.userDid && Qe(n, "noop"), s.cause && s.did === i.userDid && Qe(s, "noop"), u && !De(u) && u.did === i.userDid && Qe(u, "blur"), e && !De(e) && e.did === i.userDid && Qe(e, "noop");
    const d = Bt(r, n, u, e), y = Bt(r, n), T = Bt(u, e);
    let C = !1;
    return ((n.blur || n.blurMedia) && n.cause?.type !== "muted" || (s.blur || s.blurMedia) && s.cause?.type !== "muted") && (C = !0), {
      decisions: { post: r, account: n, profile: s, quote: u, quotedAccount: e },
      content: {
        cause: De(y) ? d.filter ? d.cause : void 0 : y.cause,
        filter: d.filter,
        blur: y.blur,
        alert: y.alert,
        noOverride: y.noOverride
      },
      avatar: {
        blur: C,
        alert: n.alert || s.alert,
        noOverride: n.noOverride || s.noOverride
      },
      embed: De(T, { ignoreFilter: !0 }) ? n.blurMedia ? {
        cause: n.cause,
        blur: !0,
        noOverride: n.noOverride
      } : r.blurMedia ? {
        cause: r.cause,
        blur: !0,
        noOverride: r.noOverride
      } : {} : {
        cause: T.cause,
        blur: T.blur,
        alert: T.alert,
        noOverride: T.noOverride
      }
    };
  }
  function n4(t, i) {
    const r = Qb(), n = ut(t.creator, i), s = dr(t.creator, i), u = Bt(r, n);
    return {
      decisions: { feedGenerator: r, account: n, profile: s },
      content: {
        cause: De(u) ? void 0 : u.cause,
        filter: u.filter,
        blur: u.blur,
        alert: u.alert,
        noOverride: u.noOverride
      },
      avatar: {
        blur: n.blurMedia || s.blurMedia,
        alert: n.alert,
        noOverride: n.noOverride || s.noOverride
      }
    };
  }
  function s4(t, i) {
    const r = Yb(), n = x.isProfileViewBasic(t.creator) ? ut(t.creator, i) : _e.noop(), s = x.isProfileViewBasic(t.creator) ? dr(t.creator, i) : _e.noop(), u = Bt(r, n);
    return {
      decisions: { userList: r, account: n, profile: s },
      content: {
        cause: De(u) ? void 0 : u.cause,
        filter: u.filter,
        blur: u.blur,
        alert: u.alert,
        noOverride: u.noOverride
      },
      avatar: {
        blur: n.blurMedia || s.blurMedia,
        alert: n.alert,
        noOverride: n.noOverride || s.noOverride
      }
    };
  }
  var a4 = {
    system: {
      id: "system",
      configurable: !1,
      labels: [
        $["!hide"],
        $["!no-promote"],
        $["!warn"],
        $["!no-unauthenticated"]
      ],
      strings: {
        settings: {
          en: {
            name: "System",
            description: "Moderator overrides for special cases."
          }
        }
      }
    },
    legal: {
      id: "legal",
      configurable: !1,
      labels: [$["dmca-violation"], $.doxxing],
      strings: {
        settings: {
          en: {
            name: "Legal",
            description: "Content removed for legal reasons."
          }
        }
      }
    },
    sexual: {
      id: "sexual",
      configurable: !0,
      labels: [$.porn, $.sexual, $.nudity],
      strings: {
        settings: {
          en: {
            name: "Adult Content",
            description: "Content which is sexual in nature."
          }
        }
      }
    },
    violence: {
      id: "violence",
      configurable: !0,
      labels: [
        $.nsfl,
        $.corpse,
        $.gore,
        $.torture,
        $["self-harm"]
      ],
      strings: {
        settings: {
          en: {
            name: "Violence",
            description: "Content which is violent or deeply disturbing."
          }
        }
      }
    },
    intolerance: {
      id: "intolerance",
      configurable: !0,
      labels: [
        $["intolerant-race"],
        $["intolerant-gender"],
        $["intolerant-sexual-orientation"],
        $["intolerant-religion"],
        $.intolerant,
        $["icon-intolerant"]
      ],
      strings: {
        settings: {
          en: {
            name: "Intolerance",
            description: "Content or behavior which is hateful or intolerant toward a group of people."
          }
        }
      }
    },
    rude: {
      id: "rude",
      configurable: !0,
      labels: [$.threat],
      strings: {
        settings: {
          en: {
            name: "Rude",
            description: "Behavior which is rude toward other users."
          }
        }
      }
    },
    curation: {
      id: "curation",
      configurable: !0,
      labels: [$.spoiler],
      strings: {
        settings: {
          en: {
            name: "Curational",
            description: "Subjective moderation geared towards curating a more positive environment."
          }
        }
      }
    },
    spam: {
      id: "spam",
      configurable: !0,
      labels: [$.spam],
      strings: {
        settings: {
          en: {
            name: "Spam",
            description: "Content which doesn't add to the conversation."
          }
        }
      }
    },
    misinfo: {
      id: "misinfo",
      configurable: !0,
      labels: [
        $["account-security"],
        $["net-abuse"],
        $.impersonation,
        $.scam,
        $.misleading
      ],
      strings: {
        settings: {
          en: {
            name: "Misinformation",
            description: "Content which misleads or defrauds users."
          }
        }
      }
    }
  }, wu = {
    hideReplies: !1,
    hideRepliesByUnfollowed: !1,
    hideRepliesByLikeCount: 0,
    hideReposts: !1,
    hideQuotePosts: !1
  }, o4 = {
    sort: "oldest",
    prioritizeFollowedUsers: !0
  }, p4 = class extends cr {
    constructor() {
      super(...arguments), this.getTimeline = (t, i) => this.api.app.bsky.feed.getTimeline(t, i), this.getAuthorFeed = (t, i) => this.api.app.bsky.feed.getAuthorFeed(t, i), this.getActorLikes = (t, i) => this.api.app.bsky.feed.getActorLikes(t, i), this.getPostThread = (t, i) => this.api.app.bsky.feed.getPostThread(t, i), this.getPost = (t) => this.api.app.bsky.feed.post.get(t), this.getPosts = (t, i) => this.api.app.bsky.feed.getPosts(t, i), this.getLikes = (t, i) => this.api.app.bsky.feed.getLikes(t, i), this.getRepostedBy = (t, i) => this.api.app.bsky.feed.getRepostedBy(t, i), this.getFollows = (t, i) => this.api.app.bsky.graph.getFollows(t, i), this.getFollowers = (t, i) => this.api.app.bsky.graph.getFollowers(t, i), this.getProfile = (t, i) => this.api.app.bsky.actor.getProfile(t, i), this.getProfiles = (t, i) => this.api.app.bsky.actor.getProfiles(t, i), this.getSuggestions = (t, i) => this.api.app.bsky.actor.getSuggestions(t, i), this.searchActors = (t, i) => this.api.app.bsky.actor.searchActors(t, i), this.searchActorsTypeahead = (t, i) => this.api.app.bsky.actor.searchActorsTypeahead(t, i), this.listNotifications = (t, i) => this.api.app.bsky.notification.listNotifications(t, i), this.countUnreadNotifications = (t, i) => this.api.app.bsky.notification.getUnreadCount(t, i);
    }
    get app() {
      return this.api.app;
    }
    async post(t) {
      if (!this.session)
        throw new Error("Not logged in");
      return t.createdAt = t.createdAt || (/* @__PURE__ */ new Date()).toISOString(), this.api.app.bsky.feed.post.create({ repo: this.session.did }, t);
    }
    async deletePost(t) {
      if (!this.session)
        throw new Error("Not logged in");
      const i = new ve(t);
      return await this.api.app.bsky.feed.post.delete({
        repo: i.hostname,
        rkey: i.rkey
      });
    }
    async like(t, i) {
      if (!this.session)
        throw new Error("Not logged in");
      return await this.api.app.bsky.feed.like.create({ repo: this.session.did }, {
        subject: { uri: t, cid: i },
        createdAt: (/* @__PURE__ */ new Date()).toISOString()
      });
    }
    async deleteLike(t) {
      if (!this.session)
        throw new Error("Not logged in");
      const i = new ve(t);
      return await this.api.app.bsky.feed.like.delete({
        repo: i.hostname,
        rkey: i.rkey
      });
    }
    async repost(t, i) {
      if (!this.session)
        throw new Error("Not logged in");
      return await this.api.app.bsky.feed.repost.create({ repo: this.session.did }, {
        subject: { uri: t, cid: i },
        createdAt: (/* @__PURE__ */ new Date()).toISOString()
      });
    }
    async deleteRepost(t) {
      if (!this.session)
        throw new Error("Not logged in");
      const i = new ve(t);
      return await this.api.app.bsky.feed.repost.delete({
        repo: i.hostname,
        rkey: i.rkey
      });
    }
    async follow(t) {
      if (!this.session)
        throw new Error("Not logged in");
      return await this.api.app.bsky.graph.follow.create({ repo: this.session.did }, {
        subject: t,
        createdAt: (/* @__PURE__ */ new Date()).toISOString()
      });
    }
    async deleteFollow(t) {
      if (!this.session)
        throw new Error("Not logged in");
      const i = new ve(t);
      return await this.api.app.bsky.graph.follow.delete({
        repo: i.hostname,
        rkey: i.rkey
      });
    }
    async upsertProfile(t) {
      if (!this.session)
        throw new Error("Not logged in");
      let i = 5;
      for (; i >= 0; ) {
        const r = await this.com.atproto.repo.getRecord({
          repo: this.session.did,
          collection: "app.bsky.actor.profile",
          rkey: "self"
        }).catch((u) => {
        }), n = await t(r?.data.value);
        n && (n.$type = "app.bsky.actor.profile");
        const s = Jr.validateRecord(n);
        if (!s.success)
          throw s.error;
        try {
          await this.com.atproto.repo.putRecord({
            repo: this.session.did,
            collection: "app.bsky.actor.profile",
            rkey: "self",
            record: n,
            swapRecord: r?.data.cid || null
          });
        } catch (u) {
          if (i > 0 && u instanceof Wr.InvalidSwapError) {
            i--;
            continue;
          } else
            throw u;
        }
        break;
      }
    }
    async mute(t) {
      return this.api.app.bsky.graph.muteActor({ actor: t });
    }
    async unmute(t) {
      return this.api.app.bsky.graph.unmuteActor({ actor: t });
    }
    async muteModList(t) {
      return this.api.app.bsky.graph.muteActorList({
        list: t
      });
    }
    async unmuteModList(t) {
      return this.api.app.bsky.graph.unmuteActorList({
        list: t
      });
    }
    async blockModList(t) {
      if (!this.session)
        throw new Error("Not logged in");
      return await this.api.app.bsky.graph.listblock.create({ repo: this.session.did }, {
        subject: t,
        createdAt: (/* @__PURE__ */ new Date()).toISOString()
      });
    }
    async unblockModList(t) {
      if (!this.session)
        throw new Error("Not logged in");
      const i = await this.api.app.bsky.graph.getList({
        list: t,
        limit: 1
      });
      if (!i.data.list.viewer?.blocked)
        return;
      const { rkey: r } = new ve(i.data.list.viewer.blocked);
      return await this.api.app.bsky.graph.listblock.delete({
        repo: this.session.did,
        rkey: r
      });
    }
    async updateSeenNotifications(t) {
      return t = t || (/* @__PURE__ */ new Date()).toISOString(), this.api.app.bsky.notification.updateSeen({
        seenAt: t
      });
    }
    async getPreferences() {
      const t = {
        feeds: {
          saved: void 0,
          pinned: void 0
        },
        feedViewPrefs: {
          home: {
            ...wu
          }
        },
        threadViewPrefs: { ...o4 },
        adultContentEnabled: !1,
        contentLabels: {},
        birthDate: void 0,
        interests: {
          tags: []
        },
        mutedWords: [],
        hiddenPosts: []
      }, i = await this.app.bsky.actor.getPreferences({});
      for (const r of i.data.preferences)
        if (x.isAdultContentPref(r) && x.validateAdultContentPref(r).success)
          t.adultContentEnabled = r.enabled;
        else if (x.isContentLabelPref(r) && x.validateAdultContentPref(r).success) {
          let n = r.visibility;
          n === "show" && (n = "ignore"), (n === "ignore" || n === "warn" || n === "hide") && (t.contentLabels[r.label] = n);
        } else if (x.isSavedFeedsPref(r) && x.validateSavedFeedsPref(r).success)
          t.feeds.saved = r.saved, t.feeds.pinned = r.pinned;
        else if (x.isPersonalDetailsPref(r) && x.validatePersonalDetailsPref(r).success)
          r.birthDate && (t.birthDate = new Date(r.birthDate));
        else if (x.isFeedViewPref(r) && x.validateFeedViewPref(r).success) {
          const { $type: n, feed: s, ...u } = r;
          t.feedViewPrefs[r.feed] = { ...wu, ...u };
        } else if (x.isThreadViewPref(r) && x.validateThreadViewPref(r).success) {
          const { $type: n, ...s } = r;
          t.threadViewPrefs = { ...t.threadViewPrefs, ...s };
        } else if (x.isInterestsPref(r) && x.validateInterestsPref(r).success) {
          const { $type: n, ...s } = r;
          t.interests = { ...t.interests, ...s };
        } else if (x.isMutedWordsPref(r) && x.validateMutedWordsPref(r).success) {
          const { $type: n, ...s } = r;
          t.mutedWords = s.items;
        } else if (x.isHiddenPostsPref(r) && x.validateHiddenPostsPref(r).success) {
          const { $type: n, ...s } = r;
          t.hiddenPosts = s.items;
        }
      return t;
    }
    async setSavedFeeds(t, i) {
      return kt(this, () => ({
        saved: t,
        pinned: i
      }));
    }
    async addSavedFeed(t) {
      return kt(this, (i, r) => ({
        saved: [...i.filter((n) => n !== t), t],
        pinned: r
      }));
    }
    async removeSavedFeed(t) {
      return kt(this, (i, r) => ({
        saved: i.filter((n) => n !== t),
        pinned: r.filter((n) => n !== t)
      }));
    }
    async addPinnedFeed(t) {
      return kt(this, (i, r) => ({
        saved: [...i.filter((n) => n !== t), t],
        pinned: [...r.filter((n) => n !== t), t]
      }));
    }
    async removePinnedFeed(t) {
      return kt(this, (i, r) => ({
        saved: i,
        pinned: r.filter((n) => n !== t)
      }));
    }
    async setAdultContentEnabled(t) {
      await be(this, (i) => {
        let r = i.findLast((n) => x.isAdultContentPref(n) && x.validateAdultContentPref(n).success);
        return r ? r.enabled = t : r = {
          $type: "app.bsky.actor.defs#adultContentPref",
          enabled: t
        }, i.filter((n) => !x.isAdultContentPref(n)).concat([r]);
      });
    }
    async setContentLabelPref(t, i) {
      i === "show" && (i = "ignore"), await be(this, (r) => {
        let n = r.findLast((s) => x.isContentLabelPref(s) && x.validateAdultContentPref(s).success && s.label === t);
        return n ? n.visibility = i : n = {
          $type: "app.bsky.actor.defs#contentLabelPref",
          label: t,
          visibility: i
        }, r.filter((s) => !x.isContentLabelPref(s) || s.label !== t).concat([n]);
      });
    }
    async setPersonalDetails({
      birthDate: t
    }) {
      t = t instanceof Date ? t.toISOString() : t, await be(this, (i) => {
        let r = i.findLast((n) => x.isPersonalDetailsPref(n) && x.validatePersonalDetailsPref(n).success);
        return r ? r.birthDate = t : r = {
          $type: "app.bsky.actor.defs#personalDetailsPref",
          birthDate: t
        }, i.filter((n) => !x.isPersonalDetailsPref(n)).concat([r]);
      });
    }
    async setFeedViewPrefs(t, i) {
      await be(this, (r) => {
        const n = r.findLast((s) => x.isFeedViewPref(s) && x.validateFeedViewPref(s).success && s.feed === t);
        return n && (i = { ...n, ...i }), r.filter((s) => !x.isFeedViewPref(i) || s.feed !== t).concat([{ ...i, $type: "app.bsky.actor.defs#feedViewPref", feed: t }]);
      });
    }
    async setThreadViewPrefs(t) {
      await be(this, (i) => {
        const r = i.findLast((n) => x.isThreadViewPref(n) && x.validateThreadViewPref(n).success);
        return r && (t = { ...r, ...t }), i.filter((n) => !x.isThreadViewPref(n)).concat([{ ...t, $type: "app.bsky.actor.defs#threadViewPref" }]);
      });
    }
    async setInterestsPref(t) {
      await be(this, (i) => {
        const r = i.findLast((n) => x.isInterestsPref(n) && x.validateInterestsPref(n).success);
        return r && (t = { ...r, ...t }), i.filter((n) => !x.isInterestsPref(n)).concat([{ ...t, $type: "app.bsky.actor.defs#interestsPref" }]);
      });
    }
    async upsertMutedWords(t) {
      await be(this, (i) => {
        let r = i.findLast((n) => x.isMutedWordsPref(n) && x.validateMutedWordsPref(n).success);
        if (r && x.isMutedWordsPref(r))
          for (const n of t) {
            let s = !1;
            const u = Zr(n.value);
            if (u) {
              for (const e of r.items)
                if (e.value === u) {
                  e.targets = Array.from(/* @__PURE__ */ new Set([...e.targets, ...n.targets])), s = !0;
                  break;
                }
              s || r.items.push({
                ...n,
                value: u
              });
            }
          }
        else
          r = {
            items: t.map((n) => ({
              ...n,
              value: Zr(n.value)
            }))
          };
        return i.filter((n) => !x.isMutedWordsPref(n)).concat([
          { ...r, $type: "app.bsky.actor.defs#mutedWordsPref" }
        ]);
      });
    }
    async updateMutedWord(t) {
      await be(this, (i) => {
        let r = i.findLast((n) => x.isMutedWordsPref(n) && x.validateMutedWordsPref(n).success);
        if (r && x.isMutedWordsPref(r)) {
          for (const n of r.items)
            if (n.value === t.value) {
              n.targets = t.targets;
              break;
            }
        }
        return i.filter((n) => !x.isMutedWordsPref(n)).concat([
          { ...r, $type: "app.bsky.actor.defs#mutedWordsPref" }
        ]);
      });
    }
    async removeMutedWord(t) {
      await be(this, (i) => {
        let r = i.findLast((n) => x.isMutedWordsPref(n) && x.validateMutedWordsPref(n).success);
        if (r && x.isMutedWordsPref(r)) {
          for (let n = 0; n < r.items.length; n++)
            if (r.items[n].value === t.value) {
              r.items.splice(n, 1);
              break;
            }
        }
        return i.filter((n) => !x.isMutedWordsPref(n)).concat([
          { ...r, $type: "app.bsky.actor.defs#mutedWordsPref" }
        ]);
      });
    }
    async hidePost(t) {
      await Lu(this, t, "hide");
    }
    async unhidePost(t) {
      await Lu(this, t, "unhide");
    }
  };
  async function be(t, i) {
    const r = await t.app.bsky.actor.getPreferences({}), n = i(r.data.preferences);
    n !== !1 && await t.app.bsky.actor.putPreferences({
      preferences: n
    });
  }
  async function kt(t, i) {
    let r;
    return await be(t, (n) => {
      let s = n.findLast((u) => x.isSavedFeedsPref(u) && x.validateSavedFeedsPref(u).success);
      return s ? (r = i(s.saved, s.pinned), s.saved = r.saved, s.pinned = r.pinned) : (r = i([], []), s = {
        $type: "app.bsky.actor.defs#savedFeedsPref",
        saved: r.saved,
        pinned: r.pinned
      }), n.filter((u) => !x.isSavedFeedsPref(u)).concat([s]);
    }), r;
  }
  async function Lu(t, i, r) {
    await be(t, (n) => {
      let s = n.findLast((u) => x.isHiddenPostsPref(u) && x.validateHiddenPostsPref(u).success);
      return s && x.isHiddenPostsPref(s) ? s.items = r === "hide" ? Array.from(/* @__PURE__ */ new Set([...s.items, i])) : s.items.filter((u) => u !== i) : r === "hide" && (s = {
        $type: "app.bsky.actor.defs#hiddenPostsPref",
        items: [i]
      }), n.filter((u) => !x.isInterestsPref(u)).concat([{ ...s, $type: "app.bsky.actor.defs#hiddenPostsPref" }]);
    });
  }
})(Yu);
var z4 = Yu.exports;
const Nu = new z4.BskyAgent({
  service: "https://api.bsky.app"
}), H4 = (p, a, o) => {
  let l = 0, c = 0, h = p.length;
  for (let b = 0; b < p.length; b++) {
    let A = p.charCodeAt(b);
    if (l += A > 255 ? 2 : 1, l > a) {
      c = b;
      break;
    }
  }
  l = 0;
  for (let b = c; b < p.length; b++) {
    let A = p.charCodeAt(b);
    if (l += A > 255 ? 2 : 1, l > o) {
      h = b;
      break;
    }
  }
  return p.substring(c, h);
}, Z4 = (p, a) => {
  let o = [], l = 0;
  for (let c of a) {
    let h = p.indexOf(c);
    h !== -1 && (o.push(p.substring(l, h)), o.push(c), l = h + c.length);
  }
  return l < p.length && o.push(p.substring(l)), o;
}, Pu = (p) => (p.feed || []).map(({
  post: a,
  reason: o
}) => {
  const l = a.record.facets || [], c = a.record.text, h = l.map((A) => {
    const f = H4(c, A.index.byteStart, A.index.byteEnd - A.index.byteStart), N = A.features[0].$type, F = {
      "app.bsky.richtext.facet#link": A.features[0].uri,
      "app.bsky.richtext.facet#mention": `https://bsky.app/profile/${A.features[0].did}`
      // "app.bsky.richtext.facet#tag": `not existing yet`,
    }[N];
    return {
      from: f,
      to: F ? `<a href="${F}" target="_blank" rel="noopener" class="text-blue-500 underline">${f}</a>` : f
    };
  }), b = Z4(c, h.map((A) => A.from)).map((A) => {
    const f = h.find((N) => N.from === A);
    return {
      val: f?.to || A,
      setInnerHtml: !!f
    };
  });
  return console.log(c, b), {
    username: a.author.displayName,
    handle: a.author.handle,
    avatar: a.author.avatar,
    // todo fallback
    text: b,
    createdAt: a.record.createdAt,
    uri: a.uri,
    images: a.embed?.images || [],
    isRepost: o?.$type === "app.bsky.feed.defs#reasonRepost",
    repostBy: o?.by?.displayName
  };
});
var W4 = /* @__PURE__ */ Ie("<style>"), J4 = /* @__PURE__ */ Ie('<section><dialog class="backdrop:bg-gray-800 backdrop:opacity-90"><form class="fixed top-5 right-5"><button type=submit aria-label=close formmethod=dialog formnovalidate class="bg-gray-900 rounded-full w-10 h-10 text-white flex items-center justify-center">X</button></form><img src=""alt=""class=max-h-[90vh]>'), Q4 = /* @__PURE__ */ Ie('<article class="flex gap-2 px-10 py-6 bg-zinc-50 rounded-lg drop-shadow-sm border border-gray-200 animate-pulse"><div class="bg-slate-300 w-12 h-12 rounded-full dark:bg-slate-800"></div><div class="flex-1 space-y-2 py-1"><div class="grid grid-cols-4 gap-4"><div class="h-2 bg-slate-300 rounded col-span-2 dark:bg-slate-800"></div></div><div class="h-2 bg-slate-300 rounded dark:bg-slate-800"></div><div class="h-2 bg-slate-300 rounded dark:bg-slate-800"></div><div class="h-2 bg-slate-300 rounded dark:bg-slate-800">'), Y4 = /* @__PURE__ */ Ie('<article class="px-10 py-6 mx-auto bg-zinc-50 rounded-lg drop-shadow-sm border border-gray-200"><div class="flex gap-2"><img alt="profile picture"class="w-12 h-12 rounded-full border border-gray-200 drop-shadow-sm"><div><div class="flex max-w-[calc(100vw-96px)] items-center"><a class="text-ellipsis overflow-hidden whitespace-nowrap hover:underline dark:text-white"><span class="font-bold mr-2 text-gray-700 dark:text-white"></span><span class="text-slate-500 dark:text-slate-400 text-sm">@</span></a><span class="text-slate-500 dark:text-slate-400 text-sm"><span class=mx-1>·</span><relative-time format=micro threshold=P30D></relative-time></span></div><p class="text-base/snug whitespace-pre-line dark:text-white">', !0, !1), e0 = /* @__PURE__ */ Ie('<p class="flex gap-1 items-center ml-10 text-slate-600 dark:text-slate-400"><svg viewBox="0 0 576 512"height=16 width=16 tabindex=-1 class=mr-1><path fill=currentColor d="M272 416c17.7 0 32-14.3 32-32s-14.3-32-32-32H160c-17.7 0-32-14.3-32-32V192h32c12.9 0 24.6-7.8 29.6-19.8s2.2-25.7-6.9-34.9l-64-64c-12.5-12.5-32.8-12.5-45.3 0l-64 64c-9.2 9.2-11.9 22.9-6.9 34.9s16.6 19.8 29.6 19.8l32 0 0 128c0 53 43 96 96 96H272zM304 96c-17.7 0-32 14.3-32 32s14.3 32 32 32l112 0c17.7 0 32 14.3 32 32l0 128H416c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l64 64c12.5 12.5 32.8 12.5 45.3 0l64-64c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8l-32 0V192c0-53-43-96-96-96L304 96z"></path></svg><span class="text-sm text-slate-500 font-semibold">Reposted by '), t0 = /* @__PURE__ */ Ie("<span>"), r0 = /* @__PURE__ */ Ie("<span> "), i0 = /* @__PURE__ */ Ie("<div>"), n0 = /* @__PURE__ */ Ie("<a href=#open-modal><img class=rounded-md>");
const s0 = ({
  username: p,
  feed: a,
  limit: o = 10,
  mode: l = ""
}) => {
  let c, h;
  const [b, A] = ni(!1), [f, N] = ni([]);
  A4(() => {
    A(!0), p ? Nu.app.bsky.feed.getAuthorFeed({
      limit: o,
      actor: p,
      filter: "posts_no_replies"
    }).then(({
      success: F,
      data: M
    }) => {
      if (F) {
        const me = Pu(M);
        N(me), A(!1);
      }
    }) : a && Nu.app.bsky.feed.getFeed({
      limit: o,
      feed: a
    }).then(({
      success: F,
      data: M
    }) => {
      if (F) {
        const me = Pu(M);
        N(me), A(!1);
      }
    });
  });
  const j = (F, M) => {
    F.preventDefault(), h.src = M.fullsize, h.alt = M.alt, c.showModal();
  };
  return [(() => {
    var F = W4();
    return he(F, X4), F;
  })(), (() => {
    var F = J4(), M = F.firstChild, me = M.firstChild, ce = me.nextSibling;
    Su(F, `${l} max-w-screen-sm mx-auto space-y-6`), he(F, (() => {
      var je = hr(() => !!b());
      return () => je() && Array.from(Array(o)).map(() => Q4());
    })(), M), he(F, (() => {
      var je = hr(() => !b());
      return () => je() && f().map((Y) => (() => {
        var rt = Y4(), Te = rt.firstChild, ct = Te.firstChild, Se = ct.nextSibling, $e = Se.firstChild, Ge = $e.firstChild, Ee = Ge.firstChild, It = Ee.nextSibling;
        It.firstChild;
        var _r = Ge.nextSibling, Sr = _r.firstChild, ve = Sr.nextSibling, jt = $e.nextSibling;
        return he(rt, (() => {
          var ee = hr(() => !!Y.isRepost);
          return () => ee() && (() => {
            var k = e0(), ue = k.firstChild, L = ue.nextSibling;
            return L.firstChild, he(L, () => Y.repostBy, null), k;
          })();
        })(), Te), he(Ee, () => Y.username), he(It, () => Y.handle, null), ve._$owner = T4(), he(jt, () => Y.text.map((ee) => ee.setInnerHtml ? (() => {
          var k = t0();
          return et(() => k.innerHTML = ee.val), k;
        })() : (() => {
          var k = r0(), ue = k.firstChild;
          return he(k, () => ee.val, ue), k;
        })())), he(Se, (() => {
          var ee = hr(() => Y.images.length > 0);
          return () => ee() && (() => {
            var k = i0();
            return he(k, () => Y.images.map((ue) => (() => {
              var L = n0(), ge = L.firstChild;
              return L.$$click = (v) => j(v, ue), et((v) => {
                var Ft = ue.thumb, le = ue.alt;
                return Ft !== v.e && yr(ge, "src", v.e = Ft), le !== v.t && yr(ge, "alt", v.t = le), v;
              }, {
                e: void 0,
                t: void 0
              }), L;
            })())), et(() => Su(k, Y.images.length > 1 ? "mt-4 grid grid-cols-2 gap-2" : "mt-4")), k;
          })();
        })(), null), et((ee) => {
          var k = Y.avatar, ue = `https://bsky.app/profile/${Y.handle}`, L = Y.createdAt;
          return k !== ee.e && yr(ct, "src", ee.e = k), ue !== ee.t && yr(Ge, "href", ee.t = ue), L !== ee.a && (ve.datetime = ee.a = L), ee;
        }, {
          e: void 0,
          t: void 0,
          a: void 0
        }), rt;
      })());
    })(), M);
    var Me = c;
    typeof Me == "function" ? xu(Me, M) : c = M;
    var tt = h;
    return typeof tt == "function" ? xu(tt, ce) : h = ce, F;
  })()];
};
S4(["click"]);
U4("bsky-embed", {
  username: "",
  feed: "",
  limit: 10,
  mode: ""
}, s0);
